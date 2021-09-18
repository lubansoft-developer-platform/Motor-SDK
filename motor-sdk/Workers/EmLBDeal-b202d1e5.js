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

define(['exports', './when-45f3d25d', './Check-34538dad', './Cartesian3-e69091b9', './Matrix4-c65e6a1b', './Transforms-7d49a8ab', './EmWrapperManager-0f74c203'], function (exports, when, Check, Cartesian3, Matrix4, Transforms, EmWrapperManager) { 'use strict';

    const ptTransScratch = new Cartesian3.Cartesian3();
    const ptScaleScratch = new Cartesian3.Cartesian3();
    const ptMat3Scratch = new Matrix4.Matrix3();
    const ptRotateScratch = new Matrix4.Matrix3();
    const ptMat4Scratch = new Matrix4.Matrix4();

    class EmLBDeal {
        /**
         * @constructor
         */
        constructor() {
        }

        /**
         * init EmLBDeal
         * @param {string} proj4Str 投影坐标系描述字符串
         * @param {Cartesian3} centerMapPt 中心点经纬度坐标
         * @returns {boolean}
         */
         init(proj4Str, centerMapPt) {
            if (!when.defined(EmWrapperManager.emMod)) {
                throw new Check.DeveloperError("initWebAssembly初始化尚未完成");
            }
            this._LBDeal = new EmWrapperManager.emMod.LBDeal();
            if (!this._LBDeal.Init(proj4Str, centerMapPt.x, centerMapPt.y, centerMapPt.z)) {
                EmWrapperManager.emMod.destroy(this._LBDeal);
                this._LBDeal = undefined;
                return false;
            }

            this._centerENMatrix = Transforms.Transforms.eastNorthUpToFixedFrame(Cartesian3.Cartesian3.fromDegrees(centerMapPt.x, centerMapPt.y, centerMapPt.z));

            this._matrixArray = new Float64Array(Matrix4.Matrix4.toArray(Matrix4.Matrix4.IDENTITY));
            this._pMatrixAry = EmWrapperManager.emMod._malloc(this._matrixArray.byteLength);

            this._oneTyped32Array = new Float32Array([0, 0, 0]);
            this._pOnePt32Ary = EmWrapperManager.emMod._malloc(this._oneTyped32Array.byteLength);

            this._oneTyped64Array = new Float64Array([0, 0, 0]);
            this._pOnePt64Ary = EmWrapperManager.emMod._malloc(this._oneTyped64Array.byteLength);
            return true;
        }

        /**
         * destory EmLBDeal
         */
        destroy() {
            if (when.defined(this._LBDeal)) {
                EmWrapperManager.emMod.destroy(this._LBDeal);
                this._LBDeal = undefined;

                EmWrapperManager.emMod._free(this._pMatrixAry);
                EmWrapperManager.emMod._free(this._pOnePt32Ary);
                EmWrapperManager.emMod._free(this._pOnePt64Ary);
            }
        }

        /**
         * rel center proj pt ary to rel map center cartesian pt ary
         * @param {Number[]} points
         * @param {boolean} bYup true is Y up  false is Z up
         * @param {Matrix4} [matrix]
         */
         computeProjToCartesianAry(points, bYup, matrix) {
            this.computeProjToCartesianAryImp(matrix, points, bYup, false, this._LBDeal, false);
        }

        /**
         * cartesian pt ary to rel center proj pt ary
         * @param {Number[]} points
         * @param {boolean} bYup true is Y up  false is Z up
         * @param {Matrix4} [matrix]
         */
        computeCartesianToProjAry(points, bYup, matrix) {
            this.computeProjToCartesianAryImp(matrix, points, bYup, true, this._LBDeal, false);
        }

        /**
         * rel center proj pt ary to rel map center cartesian pt
         * @param {Cartesian3} cartesian
         * @param {Matrix4} [matrix]
         * @param {Cartesian3} [result]
         * @returns {Cartesian3}
         */
        computeProjToCartesian(cartesian, matrix, result) {
            let points = [cartesian.x, cartesian.y, cartesian.z];
            this.computeProjToCartesianAryImp(matrix, points, false, false, this._LBDeal, true);
            if (!when.defined(result)) {
                return new Cartesian3.Cartesian3(points[0], points[1], points[2]);
            }
            result.x = points[0];
            result.y = points[1];
            result.z = points[2];
            return result;
        }

        /**
         * cartesian pt to rel center proj pt
         * @param {Cartesian3} cartesian
         * @param {Matrix4} [matrix]
         * @param {Cartesian3} [result]
         * @returns {Cartesian3}
         */
        computeCartesianToProj(cartesian, matrix, result) {
            let points = [cartesian.x, cartesian.y, cartesian.z];
            this.computeProjToCartesianAryImp(matrix, points, false, true, this._LBDeal, true);
            if (!when.defined(result)) {
                return new Cartesian3.Cartesian3(points[0], points[1], points[2]);
            }
            result.x = points[0];
            result.y = points[1];
            result.z = points[2];
            return result;
        }

        /**
         * map degree ary to proj
         * @param {Number[]} points
         * @param {boolean} bSubstratProjCenter
         */
        computeDegreeToProjAry(points, bSubstratProjCenter) {
            this.computeDegreeToProjImp(points, bSubstratProjCenter, false, this._LBDeal, false);
        }

        /**
         * proj pt ary to map degree
         * @param {Number[]} points
         * @param {boolean} bInputRelProjCenter
         */
        computeProjToDegreeAry(points, bInputRelProjCenter) {
            this.computeDegreeToProjImp(points, bInputRelProjCenter, true, this._LBDeal, false);
        }

        /**
         * map degree to proj
         * @param {Cartesian3} cartesian
         * @param {boolean} bSubstratProjCenter
         * @param {Cartesian3} [result]
         * @returns {Cartesian3}
         */
         computeDegreeToProj(cartesian, bSubstratProjCenter, result) {
            let points = [cartesian.x, cartesian.y, cartesian.z];
            this.computeDegreeToProjImp(points, bSubstratProjCenter, false, this._LBDeal, true);
            if (!when.defined(result)) {
                return new Cartesian3.Cartesian3(points[0], points[1], points[2]);
            }
            result.x = points[0];
            result.y = points[1];
            result.z = points[2];
            return result;
        }

        /**
         * proj pt to map degree
         * @param {Cartesian3} cartesian
         * @param {boolean} bInputRelProjCenter
         * @param {Cartesian3} [result]
         * @returns {Cartesian3}
         */
        computeProjToDegree(cartesian, bInputRelProjCenter, result) {
            let points = [cartesian.x, cartesian.y, cartesian.z];
            this.computeDegreeToProjImp(points, bInputRelProjCenter, true, this._LBDeal, true);
            if (!when.defined(result)) {
                return new Cartesian3.Cartesian3(points[0], points[1], points[2]);
            }
            result.x = points[0];
            result.y = points[1];
            result.z = points[2];
            return result;
        }

        /**
         * cvt rel proj matrix to cartesian matrix
         * @param {Matrix4} matrix
         * @param {Matrix4} [result]
         * @returns {Matrix4}
         */
        cvtRelProjMatrixToCartesianMatrix(matrix, result) {
            if (!when.defined(result)) {
                result = new Matrix4.Matrix4();
            }

            Matrix4.Matrix4.getTranslation(matrix, ptTransScratch);
            Matrix4.Matrix4.getScale(matrix, ptScaleScratch);
            Matrix4.Matrix4.getMatrix3(matrix, ptMat3Scratch);
            Matrix4.Matrix3.getRotation(ptMat3Scratch, ptRotateScratch);

            Matrix4.Matrix4.fromScale(ptScaleScratch, result);
            Matrix4.Matrix4.multiplyByMatrix3(result, ptRotateScratch, result);

            this.computeProjToCartesian(ptTransScratch, undefined, ptTransScratch);
            Matrix4.Matrix4.multiplyByPoint(this._centerENMatrix, ptTransScratch, ptTransScratch);
            Transforms.Transforms.eastNorthUpToFixedFrame(ptTransScratch, undefined, ptMat4Scratch);

            Matrix4.Matrix4.multiply(ptMat4Scratch, result, result);
            return result;
        }

        computeProjToCartesianAryImp(matrix, points, bYup, reverse, cDeal, isOne) {
            if (!when.defined(cDeal)) {
                throw new Check.DeveloperError("请先执行 init进行初始化");
            }

            let typedArray;
            let pPtAry;
            if (!isOne) {
                typedArray = new Float32Array(points);
                pPtAry = EmWrapperManager.emMod._malloc(typedArray.byteLength);
            } else {
                typedArray = this._oneTyped32Array;
                typedArray.set(points);
                pPtAry = this._pOnePt32Ary;
            }
            EmWrapperManager.emMod.HEAPF32.set(typedArray, pPtAry / 4);

            matrix = when.defaultValue(matrix, Matrix4.Matrix4.IDENTITY);
            this._matrixArray.set(Matrix4.Matrix4.toArray(matrix));
            EmWrapperManager.emMod.HEAPF64.set(this._matrixArray, this._pMatrixAry / 8);

            if (reverse) {
                cDeal.ComputeCartesianToProj(
                    pPtAry,
                    typedArray.length,
                    this._pMatrixAry,
                    bYup
                );
            } else {
                cDeal.ComputeProjToCartesian(
                    pPtAry,
                    typedArray.length,
                    this._pMatrixAry,
                    bYup
                );
            }

            for (let index = 0; index < points.length; ++index) {
                points[index] = EmWrapperManager.emMod.HEAPF32[(pPtAry >> 2) + index];
            }

            if (!isOne) {
                EmWrapperManager.emMod._free(pPtAry);
            }
        }

        computeDegreeToProjImp(points, bRel, reverse, cDeal, isOne) {
            if (!when.defined(cDeal)) {
                throw new Check.DeveloperError("请先执行 init进行初始化");
            }

            let typedArray;
            let pPtAry;
            if (!isOne) {
                typedArray = new Float64Array(points);
                pPtAry = EmWrapperManager.emMod._malloc(typedArray.byteLength);
            } else {
                typedArray = this._oneTyped64Array;
                typedArray.set(points);
                pPtAry = this._pOnePt64Ary;
            }
            EmWrapperManager.emMod.HEAPF64.set(typedArray, pPtAry / 8);

            if (reverse) {
                cDeal.TranformProjToDegree(pPtAry, typedArray.length, bRel);
            } else {
                cDeal.TranformDegreeToProj(pPtAry, typedArray.length, bRel);
            }

            for (let index = 0; index < points.length; ++index) {
                points[index] = EmWrapperManager.emMod.HEAPF64[(pPtAry >> 3) + index];
            }

            if (!isOne) {
                EmWrapperManager.emMod._free(pPtAry);
            }
        }
    }

    exports.EmLBDeal = EmLBDeal;

});
//# sourceMappingURL=EmLBDeal-b202d1e5.js.map
