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

define(['./when-45f3d25d', './Check-34538dad', './Cartesian3-e69091b9', './Matrix4-c65e6a1b', './RuntimeError-86da6af2', './WebGLConstants-3660bc8f', './PrimitiveType-30fa6f85', './createTaskProcessorWorker', './CreatePhysicalArray-d462d0a0', './materem-f017d2c3', './EmWrapperManager-a482472d'], function (when, Check, Cartesian3, Matrix4, RuntimeError, WebGLConstants, PrimitiveType, createTaskProcessorWorker, CreatePhysicalArray, materem, EmWrapperManager) { 'use strict';

    /**
     * @private
     */
    var PhysicalLogicType = {
        ADD_PRIMITIVE: 0,
        UPDATE: 1,
        PICK_FROM_RAY: 2, //射线PICK
        UPDATE_INSTANCE_MATRIX: 3, //更新lod树的matrix
        UPDATE_PRIMITIVE_MATRIX: 4, //更新PRIMITIVE的matrix
    };
    var PhysicalLogicType$1 = Object.freeze(PhysicalLogicType);

    /**
     * An enum describing the x, y, and z axes and helper conversion functions.
     *
     * @enum {Number}
     */
    var Axis = {
        /**
         * Denotes the x-axis.
         *
         * @type {Number}
         * @constant
         */
        X: 0,

        /**
         * Denotes the y-axis.
         *
         * @type {Number}
         * @constant
         */
        Y: 1,

        /**
         * Denotes the z-axis.
         *
         * @type {Number}
         * @constant
         */
        Z: 2,

        /**
         * Matrix used to convert from y-up to z-up
         *
         * @type {Matrix4}
         * @constant
         */
        Y_UP_TO_Z_UP: Matrix4.Matrix4.fromRotationTranslation(
            Matrix4.Matrix3.fromRotationX(Cartesian3.CesiumMath.PI_OVER_TWO)
        ),

        /**
         * Matrix used to convert from z-up to y-up
         *
         * @type {Matrix4}
         * @constant
         */
        Z_UP_TO_Y_UP: Matrix4.Matrix4.fromRotationTranslation(
            Matrix4.Matrix3.fromRotationX(-Cartesian3.CesiumMath.PI_OVER_TWO)
        ),

        /**
         * Matrix used to convert from x-up to z-up
         *
         * @type {Matrix4}
         * @constant
         */
        X_UP_TO_Z_UP: Matrix4.Matrix4.fromRotationTranslation(
            Matrix4.Matrix3.fromRotationY(-Cartesian3.CesiumMath.PI_OVER_TWO)
        ),

        /**
         * Matrix used to convert from z-up to x-up
         *
         * @type {Matrix4}
         * @constant
         */
        Z_UP_TO_X_UP: Matrix4.Matrix4.fromRotationTranslation(
            Matrix4.Matrix3.fromRotationY(Cartesian3.CesiumMath.PI_OVER_TWO)
        ),

        /**
         * Matrix used to convert from x-up to y-up
         *
         * @type {Matrix4}
         * @constant
         */
        X_UP_TO_Y_UP: Matrix4.Matrix4.fromRotationTranslation(
            Matrix4.Matrix3.fromRotationZ(Cartesian3.CesiumMath.PI_OVER_TWO)
        ),

        /**
         * Matrix used to convert from y-up to x-up
         *
         * @type {Matrix4}
         * @constant
         */
        Y_UP_TO_X_UP: Matrix4.Matrix4.fromRotationTranslation(
            Matrix4.Matrix3.fromRotationZ(-Cartesian3.CesiumMath.PI_OVER_TWO)
        ),

        // /**
        //  * Gets the axis by name
        //  *
        //  * @param {String} name The name of the axis.
        //  * @returns {Number} The axis enum.
        //  */
        // fromName : function(name) {
        //     //>>includeStart('debug', pragmas.debug);
        //     Check.typeOf.string('name', name);
        //     //>>includeEnd('debug');

        //     return Axis[name];
        // }
    };
    /**
     * Gets the axis by name
     *
     * @param {String} name The name of the axis.
     * @returns {Number} The axis enum.
     */
    Axis.fromName = function (name) {
        //>>includeStart('debug', pragmas.debug);
        Check.Check.typeOf.string("name", name);
        //>>includeEnd('debug');

        return Axis[name];
    };
    var Axis$1 = Object.freeze(Axis);

    /* global require */

    var physicalModule;
    var lbSpaMgr;
    var keyCollection;
    var primitiveCollection;
    var pMat;
    var cSpaSelectCondition;
    var cSpaSelectResult;


    var defautlNodeMatrixArray = Matrix4.Matrix4.toArray(Axis$1.Y_UP_TO_Z_UP);
    var projectCenterMatrix = new Matrix4.Matrix4();
    var nodeMatrix = new Matrix4.Matrix4();
    var instanceMatrix = new Matrix4.Matrix4();


    function taskDispatcher(parameters) {
        switch (parameters.logicType) {
            case PhysicalLogicType$1.UPDATE_INSTANCE_MATRIX: {
                updateLodInstanceMatrix(parameters);
                break;
            }
            case PhysicalLogicType$1.ADD_PRIMITIVE: {
                addPrimitives(parameters);
                break;
            }
            case PhysicalLogicType$1.UPDATE_PRIMITIVE_MATRIX: {
                updatePrimitivesMatrix(parameters);
                break;
            }
            case PhysicalLogicType$1.UPDATE: {
                lbSpaMgr.EnableAllPrimitiveSelected(false);
                selectPrimitive(parameters.selectedModelIdArray);
                selectIndexesPrimitive(parameters.selectedModelIdIndexArray);
                removePrimitive(parameters.removedModelIdArray);
                break;
            }
            case PhysicalLogicType$1.PICK_FROM_RAY: {
                return getSearchResult(parameters);
            }
            default:
                throw new Check.DeveloperError('physicalLogicType is not a valid value.');
        }
        return true;
    }

    function selectPrimitive(modelIdArray) {
        if (when.defined(modelIdArray) && modelIdArray.length > 0) {
            for (var index = 0; index < modelIdArray.length; ++index) {
                var modelId = modelIdArray[index];
                if (keyCollection.has(modelId)) {
                    var array = keyCollection.get(modelId);
                    for (var pointer of array) {
                        lbSpaMgr.EnablePrimitiveSelected(pointer, true);
                    }
                }
            }
        }
    }

    function selectIndexesPrimitive(modelIdIndexArray) {
        if (when.defined(modelIdIndexArray) && modelIdIndexArray.length > 0) {
            for (var index = 0; index < modelIdIndexArray.length; ++index) {
                var modelId = modelIdIndexArray[index].modelId;
                var unSelectedIndexArray = modelIdIndexArray[index].unSelectedIndexArray;
                if (keyCollection.has(modelId)) {
                    var array = keyCollection.get(modelId);
                    for (var pointer of array) {
                        lbSpaMgr.EnablePrimitiveSelected(pointer, true);
                        var primitiveCluster = lbSpaMgr.GetPrimitiveCluster(pointer);
                        if (primitiveCluster.ptr !== 0) {
                            primitiveCluster.EnableAllIndexSelected(true);
                            for (let i = 0; i < unSelectedIndexArray.length; i++) {
                                primitiveCluster.EnableIndexSelected(unSelectedIndexArray[i], false);
                            }
                        }
                    }
                }
            }
        }
    }

    function addPrimitives(parameters) {
        var primitives = parameters.primitives;
        var modelId = parameters.modelId;
        if (primitives.length > 0 && when.defined(modelId)) {
            for (var primitive of primitives) {
                addPrimitive(modelId, primitive);
            }
        }
    }

    function updatePrimitivesMatrix(parameters) {
        var primitiveMatrixArray = parameters.primitiveMatrixArray;
        if (primitiveMatrixArray.length > 0) {
            for (var primitiveMatrix of primitiveMatrixArray) {
                var modelId = primitiveMatrix.modelId;
                var primitiveMatrixTypeArray = primitiveMatrix.primitiveMatrixTypeArray;
                if (keyCollection.has(modelId)) {
                    var modelArray = keyCollection.get(modelId);
                    for (var index = 0; index < modelArray.length; ++index) {
                        var pointer = modelArray[index];
                        setSpatialMatrix(pointer, primitiveMatrixTypeArray);
                    }
                }
            }
        }
    }

    function addPrimitive(modelId, primitive) {
        var physicalArray = primitive.physicalArray;
        var physicalArrayOptions = primitive.physicalArrayOptions;
        var projectCenterMatrixArray = primitive.projectCenterMatrixArray;
        var pointer;

        var pPrimitiveSpatial;
        if(when.defined(physicalArray)){
            //serial read
            var pSerialRead = new physicalModule.LBSpaSerial();
            var pBufferAry = physicalModule._malloc(physicalArray.byteLength);
            physicalModule.HEAPU8.set(physicalArray, pBufferAry);
            pPrimitiveSpatial = pSerialRead.ReadSpatial(pBufferAry, physicalArray.byteLength);
            physicalModule._free(pBufferAry);
            physicalModule.destroy(pSerialRead);
        }
        if(when.defined(physicalArrayOptions)){
            var pPtAry = physicalArrayOptions.pPtAry;
            var pBatchIdAry = physicalArrayOptions.pBatchIdAry;
            var pIndexAry = physicalArrayOptions.pIndexAry;
            var pEdgeCheckAry = physicalArrayOptions.pEdgeCheckAry;
            var primitiveMode = physicalArrayOptions.primitiveMode;
            pPrimitiveSpatial = CreatePhysicalArray.CreatePhysicalArray.createSpaPrimitive(physicalModule, lbSpaMgr, primitiveMode, pPtAry, pBatchIdAry, pIndexAry, pEdgeCheckAry);
        }

        if (when.defined(primitive.instanceMatrixTypeArray) || when.defined(primitive.lodInstanceMatrixTypeArray)) {
            var pPrimitiveCluster = lbSpaMgr.CreatePrimitiveCluster(pPrimitiveSpatial);
            pointer = lbSpaMgr.AddPrimitiveSpatial(pPrimitiveCluster);

            var isLodInstance = when.defined(primitive.lodInstanceMatrixTypeArray);
            var nodeMatrixArray = isLodInstance ? defautlNodeMatrixArray : undefined;
            var instanceArray = isLodInstance ? primitive.lodInstanceMatrixTypeArray : primitive.instanceMatrixTypeArray;
            setInstanceMatrix(pPrimitiveCluster, projectCenterMatrixArray, nodeMatrixArray, instanceArray, isLodInstance);
        } else {
            pointer = lbSpaMgr.AddPrimitiveSpatial(pPrimitiveSpatial);
            setSpatialMatrix(pointer, projectCenterMatrixArray);
        }
        addToKeyCollection(modelId, pointer);

        return pointer;
    }

    function setSpatialMatrix(pointer, projectCenterMatrixArray) {
        if (when.defined(projectCenterMatrixArray)) {
            cvtMatrixAryToMat(projectCenterMatrixArray, pMat);
            lbSpaMgr.SetPrimitiveSpatialMat(pointer, pMat);
        }
    }

    function setInstanceMatrix(primitiveCluster, projectCenterMatrixArray, nodeMatrixArray, instanceMatrixTypeArray, isLodInstance) {
        when.defined(projectCenterMatrixArray) && Matrix4.Matrix4.fromArray(projectCenterMatrixArray, 0, projectCenterMatrix);
        when.defined(nodeMatrixArray) && Matrix4.Matrix4.fromArray(nodeMatrixArray, 0, nodeMatrix);
        for (var index = 0; index < instanceMatrixTypeArray.length; index += 16) {
            Matrix4.Matrix4.fromArray(instanceMatrixTypeArray, index, instanceMatrix);
            if (when.defined(nodeMatrixArray)) {
                Matrix4.Matrix4.multiply(instanceMatrix, nodeMatrix, instanceMatrix);
            }
            if (!isLodInstance && when.defined(projectCenterMatrixArray)) {
                //静态模型Instance
                Matrix4.Matrix4.multiply(projectCenterMatrix, instanceMatrix, instanceMatrix);
            }
            cvtMatrixAryToMat(instanceMatrix, pMat);
            primitiveCluster.SetIndexMatrix(index / 16, pMat);
        }
    }

    function updateLodInstanceMatrix(parameters) {
        var instanceMatrixArray = parameters.instanceMatrixArray;
        for (var instance of instanceMatrixArray) {
            var modelId = instance.modelId;
            var instanceMatrixTypeArray = instance.instanceMatrixTypeArray;
            if (keyCollection.has(modelId)) {
                var modelArray = keyCollection.get(modelId);
                for (var index = 0; index < modelArray.length; ++index) {
                    var pointer = modelArray[index];
                    var primitiveCluster = lbSpaMgr.GetPrimitiveCluster(pointer);
                    if (primitiveCluster.ptr !== 0) {
                        primitiveCluster.RemoveAllMatrix();
                        setInstanceMatrix(primitiveCluster, undefined, defautlNodeMatrixArray, instanceMatrixTypeArray, true);
                    }
                }
            }
        }
    }

    function cvtMatrixAryToMat(pMatrixAry, pMat) {
        for (var i = 0; i < 4; ++i) {
            var cCol = pMat.At(i);
            cCol.x = pMatrixAry[i * 4];
            cCol.y = pMatrixAry[i * 4 + 1];
            cCol.z = pMatrixAry[i * 4 + 2];
            cCol.w = pMatrixAry[i * 4 + 3];
        }
    }

    function addToKeyCollection(modelId, pointer) {
        var modelArray;
        if (keyCollection.has(modelId)) {
            modelArray = keyCollection.get(modelId);
            modelArray.push(pointer);
        } else {
            modelArray = [];
            modelArray.push(pointer);
            keyCollection.set(modelId, modelArray);
        }
        primitiveCollection.set(pointer, modelId);
    }

    function removePrimitive(modelIdArray) {
        if (when.defined(modelIdArray) && modelIdArray.length > 0) {
            for (var index = 0; index < modelIdArray.length; ++index) {
                var modelId = modelIdArray[index];
                if (keyCollection.has(modelId)) {
                    var array = keyCollection.get(modelId);
                    for (var pointer of array) {
                        lbSpaMgr.RemovePrimitiveSpatial(pointer);
                        primitiveCollection.delete(pointer);
                    }
                    keyCollection.delete(modelId);
                }
            }
        }
    }

    function getSearchResult(parameters) {
        var result = {};
        var rayArray = parameters.ray;
        var triangleMode = parameters.triangleMode;
        var lineMode = parameters.lineMode;
        var maxDist = when.defined(parameters.maxDist) ? parameters.maxDist : 0.1;

        cSpaSelectCondition.SetRay(rayArray[0], rayArray[1], rayArray[2], rayArray[3], rayArray[4], rayArray[5], maxDist, triangleMode, lineMode);
        if (lbSpaMgr.Select(cSpaSelectCondition, cSpaSelectResult)) {
            if (triangleMode) {
                result.triPrimitives = [];
                for (let index = 0; index < cSpaSelectResult.GetTriResultElemSize(); ++index) {
                    const triPrimitive = {};
                    getSpaTriSelElem(cSpaSelectResult.GetTriResultElem(index), triPrimitive);
                    result.triPrimitives.push(triPrimitive);
                }
            }

            if (lineMode) {
                result.segPrimitives = [];
                for (let index = 0; index < cSpaSelectResult.GetSegResultElemSize(); ++index) {
                    const segPrimitive = {};
                    getSpaSegSelElem(cSpaSelectResult.GetSegResultElem(index), segPrimitive);
                    result.segPrimitives.push(segPrimitive);
                }
            }
        }
        cSpaSelectResult.ClearAll();
        return result;
    }

    function getSpaTriSelElem(triResultItem, result) {
        result.modelId = primitiveCollection.get(triResultItem.GetResultId().iPrimitiveId);
        result.isCluster = triResultItem.GetResultId().bCluster;
        result.batchId = triResultItem.GetResultId().iBatchId;
        result.vertices = [{x: triResultItem.GetPt0().x, y: triResultItem.GetPt0().y, z: triResultItem.GetPt0().z},
                           {x: triResultItem.GetPt1().x, y: triResultItem.GetPt1().y, z: triResultItem.GetPt1().z},
                           {x: triResultItem.GetPt2().x, y: triResultItem.GetPt2().y, z: triResultItem.GetPt2().z}];
        result.pickPt = {x: triResultItem.GetPickPt().x, y: triResultItem.GetPickPt().y, z: triResultItem.GetPickPt().z};
        result.pickDist = triResultItem.GetPickDist();
    }

    function getSpaSegSelElem(segResultItem, result) {
        result.modelId = primitiveCollection.get(segResultItem.GetResultId().iPrimitiveId);
        result.isCluster = segResultItem.GetResultId().bCluster;
        result.batchId = segResultItem.GetResultId().iBatchId;
        result.vertices = [{x: segResultItem.GetPt0().x, y: segResultItem.GetPt0().y, z: segResultItem.GetPt0().z},
                           {x: segResultItem.GetPt1().x, y: segResultItem.GetPt1().y, z: segResultItem.GetPt1().z}];
        result.segPt = {x: segResultItem.GetSegPt().x, y: segResultItem.GetSegPt().y, z: segResultItem.GetSegPt().z};
        result.pickPt = {x: segResultItem.GetPickPt().x, y: segResultItem.GetPickPt().y, z: segResultItem.GetPickPt().z};
        result.pickDist = segResultItem.GetPickDist();
    }

    function initPyMod() {
        lbSpaMgr = new physicalModule.LBSpaMgr();
        keyCollection = new Map();
        primitiveCollection = new Map();
        pMat = new physicalModule.LBSpaMat();
        cSpaSelectCondition = new physicalModule.LBSpaSelectCondition();
        cSpaSelectResult = new physicalModule.LBSpaSelectResult();
    }

    function createPhysicalEngine(event) {
        var data = event.data;
        var wasmConfig = data.webAssemblyConfig;
        if (when.defined(wasmConfig)) {
            if(when.defined(wasmConfig.debug)){
                return require([wasmConfig.debug], function (currentModule) {
                    physicalModule = currentModule();
                    initPyMod();
                    self.onmessage = createTaskProcessorWorker(taskDispatcher);
                    self.postMessage(true);
                });
            }
            EmWrapperManager.EmWrapperManager.initWebAssembly(wasmConfig.wasmBinaryFileES6).then(function () {
                physicalModule = EmWrapperManager.emMod;
                initPyMod();
                self.onmessage = createTaskProcessorWorker(taskDispatcher);
                self.postMessage(true);
            });
        }
    }

    return createPhysicalEngine;

});
//# sourceMappingURL=createPhysicalEngine.js.map
