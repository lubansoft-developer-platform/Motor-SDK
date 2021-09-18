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

define(['./when-45f3d25d', './Check-34538dad', './Cartesian3-e69091b9', './Cartesian2-7a44370a', './BoundingSphere-bacc5cb6', './Matrix4-c65e6a1b', './RuntimeError-86da6af2', './Rectangle-c7d55cfa', './WebGLConstants-3660bc8f', './ComponentDatatype-86703c58', './GeometryAttribute-70b679fd', './PrimitiveType-30fa6f85', './Transforms-7d49a8ab', './AttributeCompression-1e177d5e', './IndexDatatype-e52361bd', './IntersectionTests-8855da40', './Plane-1875afb4', './WebMercatorProjection-c32b7757', './createTaskProcessorWorker', './EllipsoidTangentPlane-3e14dd4d', './OrientedBoundingBox-c5c382aa', './EllipsoidRhumbLine-4bc7760a', './PolygonPipeline-d22f3330', './CreatePhysicalArray-d462d0a0', './materem-f017d2c3', './EmWrapperManager-a482472d', './TerrainEncoding-eef38e10', './TerrainProvider-00be0263', './EmLBDeal-8c054e74'], function (when, Check, Cartesian3, Cartesian2, BoundingSphere, Matrix4, RuntimeError, Rectangle, WebGLConstants, ComponentDatatype, GeometryAttribute, PrimitiveType, Transforms, AttributeCompression, IndexDatatype, IntersectionTests, Plane, WebMercatorProjection, createTaskProcessorWorker, EllipsoidTangentPlane, OrientedBoundingBox, EllipsoidRhumbLine, PolygonPipeline, CreatePhysicalArray, materem, EmWrapperManager, TerrainEncoding, TerrainProvider, EmLBDeal) { 'use strict';

    class BorderInfo {
        /**
         * create a BorderInfo
         */
        constructor() {
            this._modelMatrix = Matrix4.Matrix4.IDENTITY.clone();
            this._pt2DAry = [];
            this._under = 0;
            this._height = 0;
        }

        static clone(borderInfo) {
            const modelMatrix = Matrix4.Matrix4.fromArray(borderInfo._modelMatrix);
            const under = borderInfo._under;
            const height = borderInfo._height;

            const pt2DAry = [];
            borderInfo._pt2DAry.forEach((pt2D) => {
                pt2DAry.push(new Cartesian2.Cartesian2(pt2D.x, pt2D.y));
            });

            const retBorderInfo = new BorderInfo();
            retBorderInfo._under = under;
            retBorderInfo._height = height;
            retBorderInfo._pt2DAry = pt2DAry;
            retBorderInfo._modelMatrix = modelMatrix;
            return retBorderInfo;
        }

        /**
         * get abb box
         * @returns {AxisAlignedBoundingBox}
         */
        getBoundingbox() {
            const cornAry = [];
            this.getPtAry(true, cornAry);
            this.getPtAry(false, cornAry);
            return EllipsoidTangentPlane.AxisAlignedBoundingBox.fromPoints(cornAry);
        }

        /**
         * get triangles
         * @param {Cartesian3[]} ptAry pt out Ary
         * @param {Number[]} indexAry indice out Ary
         */
        createTriangle(ptAry, indexAry) {
            let startIndex = ptAry.length;
            this.getPtAry(true, ptAry);
            let colLen = ptAry.length - startIndex;
            this.getPtAry(false, ptAry);

            let nextIndex = 0;
            for (let index = 0; index < colLen; index++) {
                if (index === colLen - 1) {
                    nextIndex = 0;
                } else {
                    nextIndex = index + 1;
                }

                indexAry.push(startIndex + index);
                indexAry.push(startIndex + nextIndex);
                indexAry.push(startIndex + colLen + nextIndex);

                indexAry.push(startIndex + index);
                indexAry.push(startIndex + colLen + nextIndex);
                indexAry.push(startIndex + colLen + index);
            }

            const orIndexAry = PolygonPipeline.PolygonPipeline.triangulate(this._pt2DAry);
            indexAry.push(...orIndexAry.map((index) => { return startIndex + colLen + index; }));
            indexAry.push(...orIndexAry.reverse().map((index) => { return startIndex + index; }));
        }

        /**
         * @type {Matrix4}
         */
        set modelMatrix(value) {
            this._modelMatrix = value.clone();
        }

        get modelMatrix() {
            return this._modelMatrix;
        }

        /**
         * @type {Cartesian2[]}
         */
        set pt2DAry(value) {
            this._pt2DAry = when.defaultValue(value, []);
            if (this._pt2DAry.length > 2) {
                if (PolygonPipeline.PolygonPipeline.computeWindingOrder2D(this._pt2DAry) === PolygonPipeline.WindingOrder.CLOCKWISE) {
                    this._pt2DAry.reverse();
                }
            }
        }

        get pt2DAry() {
            return this._pt2DAry;
        }

        /**
         * @type {Number}
         */
        set under(value) {
            this._under = value;
        }

        get under() {
            return this._under;
        }

        /**
         * @type {Number}
         */
        set height(value) {
            this._height = value;
        }

        get height() {
            return this._height;
        }

        /**
         * get pt ary for 3d
         * @param {Boolean} bUnder is under pt
         * @param {Cartesian3[]} ptAry pt out Ary
         */
        getPtAry(bUnder, ptAry) {
            this._pt2DAry.forEach(pt2D => {
                let pt3D = new Cartesian3.Cartesian3(pt2D.x, pt2D.y, this._under);
                if (!bUnder) {
                    pt3D.z += this._height;
                }

                Matrix4.Matrix4.multiplyByPoint(this._modelMatrix, pt3D, pt3D);
                ptAry.push(pt3D);
            });
        }
    }

    var maxShort = 32767;

    var cartesian3Scratch = new Cartesian3.Cartesian3();
    var scratchMinimum = new Cartesian3.Cartesian3();
    var scratchMaximum = new Cartesian3.Cartesian3();
    var cartographicScratch = new Cartesian2.Cartographic();
    var toPack = new Cartesian2.Cartesian2();
    var scratchNormal = new Cartesian3.Cartesian3();
    var scratchToENU = new Matrix4.Matrix4();
    var scratchFromENU = new Matrix4.Matrix4();
    var lbSpaMgr;

    function createVertices(parameters, transferableObjects) {
        var quantizedVertices = parameters.quantizedVertices;
        var quantizedVertexCount = quantizedVertices.length / 3;
        if (quantizedVertexCount < 3) {
            return {
                holeAllData: true,
            }
        }

        var octEncodedNormals = parameters.octEncodedNormals;
        var edgeVertexCount = parameters.westIndices.length + parameters.eastIndices.length +
                              parameters.southIndices.length + parameters.northIndices.length;
        var includeWebMercatorT = parameters.includeWebMercatorT;
        var holeAry = parameters.holeAry;
        var hasHole = when.defined(holeAry) && holeAry.length > 0;
        var tileInfo = parameters.tileInfo;

        var rectangle = Rectangle.Rectangle.clone(parameters.rectangle);
        var west = rectangle.west;
        var south = rectangle.south;
        var east = rectangle.east;
        var north = rectangle.north;

        var ellipsoid = Cartesian2.Ellipsoid.clone(parameters.ellipsoid);

        var exaggeration = parameters.exaggeration;
        var minimumHeight = parameters.minimumHeight * exaggeration;
        var maximumHeight = parameters.maximumHeight * exaggeration;

        var center = parameters.relativeToCenter;
        var fromENU;
        if (parameters.isPlaneMode) {
            fromENU = Matrix4.Matrix4.fromTranslation(center);
        } else {
            fromENU = Transforms.Transforms.eastNorthUpToFixedFrame(center, ellipsoid);
        }
        var toENU = Matrix4.Matrix4.inverseTransformation(fromENU, new Matrix4.Matrix4());

        var southMercatorY;
        var oneOverMercatorHeight;
        if (includeWebMercatorT) {
            southMercatorY = WebMercatorProjection.WebMercatorProjection.geodeticLatitudeToMercatorAngle(south);
            oneOverMercatorHeight = 1.0 / (WebMercatorProjection.WebMercatorProjection.geodeticLatitudeToMercatorAngle(north) - southMercatorY);
        }

        var uBuffer = quantizedVertices.subarray(0, quantizedVertexCount);
        var vBuffer = quantizedVertices.subarray(quantizedVertexCount, 2 * quantizedVertexCount);
        var heightBuffer = quantizedVertices.subarray(quantizedVertexCount * 2, 3 * quantizedVertexCount);
        var hasVertexNormals = when.defined(octEncodedNormals);

        var uvs = new Array(quantizedVertexCount);
        var heights = new Array(quantizedVertexCount);
        var positions = new Array(quantizedVertexCount);
        var webMercatorTs = includeWebMercatorT ? new Array(quantizedVertexCount) : [];
        var normals;
        if (hasVertexNormals) {
            normals = [...octEncodedNormals];
        }
        var indexes = [...parameters.indices];

        var minimum = scratchMinimum;
        minimum.x = Number.POSITIVE_INFINITY;
        minimum.y = Number.POSITIVE_INFINITY;
        minimum.z = Number.POSITIVE_INFINITY;

        var maximum = scratchMaximum;
        maximum.x = Number.NEGATIVE_INFINITY;
        maximum.y = Number.NEGATIVE_INFINITY;
        maximum.z = Number.NEGATIVE_INFINITY;

        var minLongitude = Number.POSITIVE_INFINITY;
        var maxLongitude = Number.NEGATIVE_INFINITY;
        var minLatitude = Number.POSITIVE_INFINITY;
        var maxLatitude = Number.NEGATIVE_INFINITY;

        var emLBDeal;
        if (parameters.isPlaneMode) {
            var projectionString = parameters.projectionString;
            var dCenX = parameters.dCenX;
            var dCenY = parameters.dCenY;
            var dCenZ = parameters.dCenZ;

            emLBDeal = new EmLBDeal.EmLBDeal();
            var isInit = emLBDeal.init(projectionString, new Cartesian3.Cartesian3(dCenX, dCenY, dCenZ));
            if (!isInit) {
                emLBDeal.destroy();
                emLBDeal = undefined;
            }
        }

        for (var i = 0; i < quantizedVertexCount; ++i) {
            var rawU = uBuffer[i];
            var rawV = vBuffer[i];

            var u = rawU / maxShort;
            var v = rawV / maxShort;
            var height = Cartesian3.CesiumMath.lerp(minimumHeight, maximumHeight, heightBuffer[i] / maxShort);

            cartographicScratch.longitude = Cartesian3.CesiumMath.lerp(west, east, u);
            cartographicScratch.latitude = Cartesian3.CesiumMath.lerp(south, north, v);
            cartographicScratch.height = height;

            minLongitude = Math.min(cartographicScratch.longitude, minLongitude);
            maxLongitude = Math.max(cartographicScratch.longitude, maxLongitude);
            minLatitude = Math.min(cartographicScratch.latitude, minLatitude);
            maxLatitude = Math.max(cartographicScratch.latitude, maxLatitude);

            var position = ellipsoid.cartographicToCartesian(cartographicScratch);

            if (when.defined(emLBDeal)) {
                position = emLBDeal.computeCartesianToProj(position);
            }

            uvs[i] = new Cartesian2.Cartesian2(u, v);
            heights[i] = height;
            positions[i] = position;

            if (includeWebMercatorT) {
                webMercatorTs[i] = (WebMercatorProjection.WebMercatorProjection.geodeticLatitudeToMercatorAngle(cartographicScratch.latitude) - southMercatorY) * oneOverMercatorHeight;
            }

            Matrix4.Matrix4.multiplyByPoint(toENU, position, cartesian3Scratch);

            Cartesian3.Cartesian3.minimumByComponent(cartesian3Scratch, minimum, minimum);
            Cartesian3.Cartesian3.maximumByComponent(cartesian3Scratch, maximum, maximum);
        }

        var westIndicesSouthToNorth = copyAndSort(parameters.westIndices, function (a, b) {
            return uvs[a].y - uvs[b].y;
        });
        var eastIndicesNorthToSouth = copyAndSort(parameters.eastIndices, function (a, b) {
            return uvs[b].y - uvs[a].y;
        });
        var southIndicesEastToWest = copyAndSort(parameters.southIndices, function (a, b) {
            return uvs[b].x - uvs[a].x;
        });
        var northIndicesWestToEast = copyAndSort(parameters.northIndices, function (a, b) {
            return uvs[a].x - uvs[b].x;
        });

        var percentage = 0.0001;
        var lonOffset = (maxLongitude - minLongitude) * percentage;
        var latOffset = (maxLatitude - minLatitude) * percentage;
        var westLongitudeOffset = -lonOffset;
        var westLatitudeOffset = 0.0;
        var eastLongitudeOffset = lonOffset;
        var eastLatitudeOffset = 0.0;
        var northLongitudeOffset = 0.0;
        var northLatitudeOffset = latOffset;
        var southLongitudeOffset = 0.0;
        var southLatitudeOffset = -latOffset;

        // Add skirts pt
        var vertexCountWithoutSkirts = positions.length;
        var hMin = minimumHeight;
        hMin = Math.min(hMin, addSkirt(westIndicesSouthToNorth, positions, heights, uvs, normals, webMercatorTs, ellipsoid, rectangle, parameters.westSkirtHeight, westLongitudeOffset, westLatitudeOffset, emLBDeal));
        hMin = Math.min(hMin, addSkirt(southIndicesEastToWest, positions, heights, uvs, normals, webMercatorTs, ellipsoid, rectangle, parameters.southSkirtHeight, southLongitudeOffset, southLatitudeOffset, emLBDeal));
        hMin = Math.min(hMin, addSkirt(eastIndicesNorthToSouth, positions, heights, uvs, normals, webMercatorTs, ellipsoid, rectangle, parameters.eastSkirtHeight, eastLongitudeOffset, eastLatitudeOffset, emLBDeal));
        hMin = Math.min(hMin, addSkirt(northIndicesWestToEast, positions, heights, uvs, normals, webMercatorTs, ellipsoid, rectangle, parameters.northSkirtHeight, northLongitudeOffset, northLatitudeOffset, emLBDeal));

        // Add skirts indexes
        var indexCountWithoutSkirts = indexes.length;
        var edgeTriangleIndexLength = Math.max(0, (edgeVertexCount - 4) * 2) * 3;
        for (var index = 0; index < edgeTriangleIndexLength; index++) {
            indexes.push(0);
        }
        TerrainProvider.TerrainProvider.addSkirtIndices(westIndicesSouthToNorth, southIndicesEastToWest, eastIndicesNorthToSouth, northIndicesWestToEast, quantizedVertexCount, indexes, indexCountWithoutSkirts);

        var orientedBoundingBox;
        var boundingSphere;
        if (exaggeration !== 1.0) {
            // Bounding volumes need to be recomputed since the tile payload assumes no exaggeration.
            boundingSphere = BoundingSphere.BoundingSphere.fromPoints(positions);
            orientedBoundingBox = OrientedBoundingBox.OrientedBoundingBox.fromRectangle(rectangle, minimumHeight, maximumHeight, ellipsoid);
        }

        var occludeePointInScaledSpace;
        if (exaggeration !== 1.0 || minimumHeight < 0.0) {
            // Horizon culling point needs to be recomputed since the tile payload assumes no exaggeration.
            var occluder = new TerrainEncoding.EllipsoidalOccluder(ellipsoid);
            occludeePointInScaledSpace = occluder.computeHorizonCullingPointPossiblyUnderEllipsoid(center, positions, minimumHeight);
        }

        const downloadAry = [];

        //deal hole
        var createBodyFunc = (ptAry, indexAry, inIndexSectIndex) => {
            let indexSectIndex = when.defaultValue(inIndexSectIndex, 0);

            let triangle = new EmWrapperManager.emMod.LBSpaTriangle();
            triangle.SetPtNum(ptAry.length, false, false);
            for (let index = 0; index < ptAry.length; index++) {
                const pt = ptAry[index];
                triangle.SetPtVal(index, pt.x, pt.y, pt.z);
            }
            triangle.SetIndexNum(indexAry.length);
            for (let index = 0; index < indexAry.length; index++) {
                triangle.SetIndexVal(index, indexAry[index]);
            }

            // if (tileInfo.x === 54358 && tileInfo.y === 10815 && tileInfo.level === 15) {
            //     if (indexSectIndex > 0) {
            //         downloadTriangleByBlobFunc("ter2.tri", triangle);
            //     } else {
            //         downloadTriangleByBlobFunc("hole2.tri", triangle);
            //     }
            // }

            let pBody = new EmWrapperManager.emMod.LBSpaBody();
            pBody.Init(triangle, indexSectIndex);
            EmWrapperManager.emMod.destroy(triangle);
            return pBody;
        };

        var getBodyTriangle = (pBody) => {
            positions.length = 0;
            indexes.length = 0;
            uvs.length = 0;
            heights.length = 0;
            if (includeWebMercatorT) {
                webMercatorTs.length = 0;
            }
            if (hasVertexNormals) {
                normals.length = 0;
                hasVertexNormals = false;//force
            }

            let triangle = new EmWrapperManager.emMod.LBSpaTriangle();
            let skirtInfo = new EmWrapperManager.emMod.LBSpaSkirtInfo();
            pBody.GetTriangle(triangle, skirtInfo);

            let iPtNum = triangle.GetPtNum();
            let iIndexNum = triangle.GetIndexNum();
            if (iPtNum < 3 || iIndexNum < 3) {
                EmWrapperManager.emMod.destroy(triangle);
                EmWrapperManager.emMod.destroy(skirtInfo);
                return;
            }

            vertexCountWithoutSkirts = skirtInfo.iPtSectIndex;
            indexCountWithoutSkirts = skirtInfo.iIndexSectIndex;

            for (let index = 0; index < iPtNum; index++)
            {
                let cPt = triangle.GetPt(index);
                let pos = new Cartesian3.Cartesian3(cPt.x, cPt.y, cPt.z);
                positions.push(pos);

                if (when.defined(emLBDeal)) {
                    emLBDeal.computeProjToDegree(pos, true, cartesian3Scratch);
                    Cartesian2.Cartographic.fromDegrees(cartesian3Scratch.x, cartesian3Scratch.y, cartesian3Scratch.z, cartographicScratch);
                } else {
                    ellipsoid.cartesianToCartographic(pos, cartographicScratch);
                }

                let uv = new Cartesian2.Cartesian2((cartographicScratch.longitude - west)/(east - west), (cartographicScratch.latitude - south)/(north - south));
                uvs.push(uv);

                heights.push(cartographicScratch.height);
                if (includeWebMercatorT) {
                    webMercatorTs.push((WebMercatorProjection.WebMercatorProjection.geodeticLatitudeToMercatorAngle(cartographicScratch.latitude) - southMercatorY) * oneOverMercatorHeight);
                }
            }

            for (let index = 0; index < iIndexNum; index++) {
                indexes.push(triangle.GetIndex(index));
            }

            EmWrapperManager.emMod.destroy(triangle);
            EmWrapperManager.emMod.destroy(skirtInfo);
        };

        var substractHoleAryFunc = () => {
            let terBody;
            let haveDiff = false;
            const terBox = EllipsoidTangentPlane.AxisAlignedBoundingBox.fromPoints(positions);
            for (let index = 0; index < holeAry.length; index++) {
                const borderInfo = BorderInfo.clone(holeAry[index]);

                let ptAry = [];
                let indexAry = [];
                borderInfo.createTriangle(ptAry, indexAry);
                const borderBox = EllipsoidTangentPlane.AxisAlignedBoundingBox.fromPoints(ptAry);
                if (!terBox.isOverlap(borderBox)) {
                    continue;
                }

                if (terBody === undefined) {
                    terBody = createBodyFunc(positions, indexes, indexCountWithoutSkirts);
                }
                let holeBody = createBodyFunc(ptAry, indexAry);
                if (!terBody.CheckReference(holeBody)) {
                    EmWrapperManager.emMod.destroy(holeBody);
                    continue;
                }

                if (!terBody.ComputeDifference(holeBody)) {
                    EmWrapperManager.emMod.destroy(holeBody);
                    continue;
                }

                EmWrapperManager.emMod.destroy(holeBody);
                haveDiff = true;
            }

            if (haveDiff) {
                getBodyTriangle(terBody);
            }
            if (terBody !== undefined) {
                EmWrapperManager.emMod.destroy(terBody);
            }
        };

        if (hasHole) {
            substractHoleAryFunc();

            if (positions.length < 3) {
                return {
                    holeAllData: true,
                }
            }
        }

        var aaBox = new EllipsoidTangentPlane.AxisAlignedBoundingBox(minimum, maximum, center);
        var encoding = new TerrainEncoding.TerrainEncoding(aaBox, hMin, maximumHeight, fromENU, hasVertexNormals, includeWebMercatorT);
        var vertexStride = encoding.getStride();
        var size = positions.length * vertexStride;
        var vertexBuffer = new Float32Array(size);
        var bufferIndex = 0;
        for (var j = 0; j < positions.length; ++j) {
            if (hasVertexNormals) {
                var n = j * 2.0;
                toPack.x = normals[n];
                toPack.y = normals[n + 1];

                if (exaggeration !== 1.0) {
                    var normal = AttributeCompression.AttributeCompression.octDecode(toPack.x, toPack.y, scratchNormal);
                    var fromENUNormal = Transforms.Transforms.eastNorthUpToFixedFrame(positions[j], ellipsoid, scratchFromENU);
                    var toENUNormal = Matrix4.Matrix4.inverseTransformation(fromENUNormal, scratchToENU);

                    Matrix4.Matrix4.multiplyByPointAsVector(toENUNormal, normal, normal);
                    normal.z *= exaggeration;
                    Cartesian3.Cartesian3.normalize(normal, normal);

                    Matrix4.Matrix4.multiplyByPointAsVector(fromENUNormal, normal, normal);
                    Cartesian3.Cartesian3.normalize(normal, normal);

                    AttributeCompression.AttributeCompression.octEncode(normal, toPack);
                }
            }

            bufferIndex = encoding.encode(vertexBuffer, bufferIndex, positions[j], uvs[j], heights[j], toPack, webMercatorTs[j]);
        }

        var indexBuffer = IndexDatatype.IndexDatatype.createTypedArray(positions.length, indexes.length);
        indexBuffer.set(indexes, 0);

        var physicalArray = CreatePhysicalArray.CreatePhysicalArray.createPhysicalArrayFromTerrain(EmWrapperManager.emMod, lbSpaMgr, parameters.relativeToCenter, positions, indexes);
        transferableObjects.push(vertexBuffer.buffer, indexBuffer.buffer, physicalArray.buffer);

        if (when.defined(emLBDeal)) {
            emLBDeal.destroy();
        }

        return {
            vertices: vertexBuffer.buffer,
            indices: indexBuffer.buffer,
            vertexStride: vertexStride,
            center: center,
            minimumHeight: minimumHeight,
            maximumHeight: maximumHeight,
            boundingSphere: boundingSphere,
            orientedBoundingBox: orientedBoundingBox,
            occludeePointInScaledSpace: occludeePointInScaledSpace,
            encoding: encoding,
            indexCountWithoutSkirts: indexCountWithoutSkirts,
            vertexCountWithoutSkirts: vertexCountWithoutSkirts,
            vertexCount: positions.length,
            physicalArray: physicalArray,
            downloadAry: downloadAry,
        };
    }

    function addSkirt(edgeVertices, positions, heights, uvs, normals, webMercatorTs, ellipsoid, rectangle, skirtLength, longitudeOffset, latitudeOffset, emLBDeal) {
        var hasVertexNormals = when.defined(normals);
        var hasWebMercatorT = webMercatorTs.length > 0;
        var hMin = Number.POSITIVE_INFINITY;

        var north = rectangle.north;
        var south = rectangle.south;
        var east = rectangle.east;
        var west = rectangle.west;

        if (east < west) {
            east += Cartesian3.CesiumMath.TWO_PI;
        }

        var length = edgeVertices.length;
        for (var i = 0; i < length; ++i) {
            var index = edgeVertices[i];
            var h = heights[index];
            var uv = uvs[index];

            cartographicScratch.longitude = Cartesian3.CesiumMath.lerp(west, east, uv.x) + longitudeOffset;
            cartographicScratch.latitude = Cartesian3.CesiumMath.lerp(south, north, uv.y) + latitudeOffset;
            cartographicScratch.height = h - skirtLength;

            var position = ellipsoid.cartographicToCartesian(cartographicScratch, cartesian3Scratch);
            if (when.defined(emLBDeal)) {
                position = emLBDeal.computeCartesianToProj(position);
            }

            positions.push(position);
            uvs.push(uv);
            heights.push(cartographicScratch.height);
            if (hasVertexNormals) {
                var n = index * 2.0;
                normals.push(normals[n]);
                normals.push(normals[n + 1]);
            }

            if (hasWebMercatorT) {
                var webMercatorT = webMercatorTs[index];
                webMercatorTs.push(webMercatorT);
            }

            hMin = Math.min(hMin, cartographicScratch.height);
        }

        return hMin;
    }

    function copyAndSort(typedArray, comparator) {
        var copy;
        if (typeof typedArray.slice === 'function') {
            copy = typedArray.slice();
            if (typeof copy.sort !== 'function') {
                // Sliced typed array isn't sortable, so we can't use it.
                copy = undefined;
            }
        }

        if (!when.defined(copy)) {
            copy = Array.prototype.slice.call(typedArray);
        }

        copy.sort(comparator);

        return copy;
    }

    function createVerticesFromQuantizedTerrainMesh(event) {
        var data = event.data;
        var wasmConfig = data.webAssemblyConfig;
        if (when.defined(wasmConfig)) {
            EmWrapperManager.EmWrapperManager.initWebAssembly(wasmConfig.wasmBinaryFileES6).then(function () {
                lbSpaMgr = new EmWrapperManager.emMod.LBSpaMgr();
                self.onmessage = createTaskProcessorWorker(createVertices);
                self.postMessage(true);
            });
        }
    }

    return createVerticesFromQuantizedTerrainMesh;

});
//# sourceMappingURL=createVerticesFromQuantizedTerrainMesh.js.map
