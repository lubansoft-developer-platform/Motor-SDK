/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */

define(['exports', './when-45f3d25d', './Cartesian3-e69091b9', './Matrix4-c65e6a1b', './PrimitiveType-30fa6f85'], function (exports, when, Cartesian3, Matrix4, PrimitiveType) { 'use strict';

    class CreatePhysicalArray {}

    var negateRelativeToCenter = new Cartesian3.Cartesian3();
    var negateRelativeToCenterMatrix = new Matrix4.Matrix4();
    var relativePosition = new Cartesian3.Cartesian3();

    CreatePhysicalArray.createPhysicalArrayFromTerrain = function (
        physical,
        lbSpaMgr,
        relativeToCenter,
        positions,
        indices
    ) {
        var hasRelativeToCenter = when.defined(relativeToCenter);
        relativeToCenter = hasRelativeToCenter ? relativeToCenter : Cartesian3.Cartesian3.ZERO;
        Cartesian3.Cartesian3.negate(relativeToCenter, negateRelativeToCenter);
        Matrix4.Matrix4.fromTranslation(
            negateRelativeToCenter,
            negateRelativeToCenterMatrix
        );

        var physicalVertices = new Float32Array(positions.length * 3.0);
        var indexVertices = 0;
        for (var index = 0; index < positions.length; ++index) {
            var position = positions[index];
            Matrix4.Matrix4.multiplyByPoint(
                negateRelativeToCenterMatrix,
                position,
                relativePosition
            );

            physicalVertices[indexVertices++] = relativePosition.x;
            physicalVertices[indexVertices++] = relativePosition.y;
            physicalVertices[indexVertices++] = relativePosition.z;
        }

        var pPrimitive = new physical.LBSpaPrimitive();
        initSpaPrimitive(
            pPrimitive,
            physicalVertices,
            undefined,
            indices,
            undefined
        );
        var pPrimitiveSpatial = lbSpaMgr.CreateTriangleSpatial(pPrimitive);

        //serial write
        var pSerialWrite = new physical.LBSpaSerial();
        pSerialWrite.WriteSpatial(pPrimitiveSpatial);
        var physicalArray = new Uint8Array(pSerialWrite.GetBufferSize());
        for (var i = 0; i < physicalArray.length; ++i) {
            physicalArray[i] = pSerialWrite.GetBufferVal(i);
        }
        physical.destroy(pSerialWrite);
        physical.destroy(pPrimitiveSpatial);

        return physicalArray;
    };

    CreatePhysicalArray.createPhysicalArrayFromModel = function (
        physical,
        lbSpaMgr,
        primitiveMode,
        pPtAry,
        pBatchIdAry,
        pIndexAry,
        pEdgeCheckAry
    ) {
        var pPrimitive = new physical.LBSpaPrimitive();
        initSpaPrimitive(pPrimitive, pPtAry, pBatchIdAry, pIndexAry, pEdgeCheckAry);

        var pPrimitiveSpatial;
        if (PrimitiveType.PrimitiveType.LINES === primitiveMode) {
            pPrimitiveSpatial = lbSpaMgr.CreateStepLineSpatial(pPrimitive);
        } else {
            pPrimitiveSpatial = lbSpaMgr.CreateTriangleSpatial(pPrimitive);
        }

        //serial write
        var pSerialWrite = new physical.LBSpaSerial();
        pSerialWrite.WriteSpatial(pPrimitiveSpatial);
        var physicalArray = new Uint8Array(pSerialWrite.GetBufferSize());
        for (var index = 0; index < physicalArray.length; ++index) {
            physicalArray[index] = pSerialWrite.GetBufferVal(index);
        }

        physical.destroy(pSerialWrite);
        physical.destroy(pPrimitiveSpatial);
        return physicalArray;
    };

    function initSpaPrimitive(
        pPrimitive,
        pPtAry,
        pBatchIdAry,
        pIndexAry,
        pEdgeCheckAry
    ) {
        var bBatchId = when.defined(pBatchIdAry) && pBatchIdAry.length > 0;
        pPrimitive.SetPtValNum(pPtAry.length, bBatchId); //true desc have batch
        var i;
        for (i = 0; i < pPtAry.length; ++i) {
            pPrimitive.SetPtValVal(i, pPtAry[i]);
        }
        if (bBatchId) {
            for (i = 0; i < pBatchIdAry.length; ++i) {
                pPrimitive.SetBatchIdVal(i, pBatchIdAry[i]);
            }
        }
        if (when.defined(pIndexAry) && pIndexAry.length > 0) {
            var bEdgeCheck = when.defined(pEdgeCheckAry) && pEdgeCheckAry.length > 0;
            pPrimitive.SetIndexNum(pIndexAry.length, bEdgeCheck); //need edge
            for (i = 0; i < pIndexAry.length; ++i) {
                pPrimitive.SetIndexVal(i, pIndexAry[i]);
            }
            if (bEdgeCheck) {
                for (i = 0; i < pEdgeCheckAry.length; ++i) {
                    pPrimitive.SetEdgeCheckVal(i, pEdgeCheckAry[i]);
                }
            }
        } else {
            pPrimitive.InitIndexByPt();
        }
    }

    exports.CreatePhysicalArray = CreatePhysicalArray;

});
//# sourceMappingURL=CreatePhysicalArray-d462d0a0.js.map
