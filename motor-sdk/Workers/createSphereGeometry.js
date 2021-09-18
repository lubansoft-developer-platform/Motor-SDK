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

define(['./when-45f3d25d', './Check-34538dad', './Cartesian3-e69091b9', './Cartesian2-7a44370a', './BoundingSphere-bacc5cb6', './Matrix4-c65e6a1b', './RuntimeError-86da6af2', './Rectangle-c7d55cfa', './WebGLConstants-3660bc8f', './ComponentDatatype-86703c58', './GeometryAttribute-70b679fd', './PrimitiveType-30fa6f85', './Transforms-7d49a8ab', './GeometryAttributes-9d45f9e2', './IndexDatatype-e52361bd', './GeometryOffsetAttribute-f755a5cb', './VertexFormat-a00562ee', './EllipsoidGeometry-13e9bdb4'], function (when, Check, Cartesian3, Cartesian2, BoundingSphere, Matrix4, RuntimeError, Rectangle, WebGLConstants, ComponentDatatype, GeometryAttribute, PrimitiveType, Transforms, GeometryAttributes, IndexDatatype, GeometryOffsetAttribute, VertexFormat, EllipsoidGeometry) { 'use strict';

    /**
         * A description of a sphere centered at the origin.
         *
         * @alias SphereGeometry
         * @constructor
         *
         * @param {Object} [options] Object with the following properties:
         * @param {Number} [options.radius=1.0] The radius of the sphere.
         * @param {Number} [options.stackPartitions=64] The number of times to partition the ellipsoid into stacks.
         * @param {Number} [options.slicePartitions=64] The number of times to partition the ellipsoid into radial slices.
         * @param {VertexFormat} [options.vertexFormat=VertexFormat.DEFAULT] The vertex attributes to be computed.
         *
         * @exception {DeveloperError} options.slicePartitions cannot be less than three.
         * @exception {DeveloperError} options.stackPartitions cannot be less than three.
         *
         * @see SphereGeometry#createGeometry
         *
         * @example
         * var sphere = new Cesium.SphereGeometry({
         *   radius : 100.0,
         *   vertexFormat : Cesium.VertexFormat.POSITION_ONLY
         * });
         * var geometry = Cesium.SphereGeometry.createGeometry(sphere);
         */
        function SphereGeometry(options) {
            var radius = when.defaultValue(options.radius, 1.0);
            var radii = new Cartesian3.Cartesian3(radius, radius, radius);
            var ellipsoidOptions = {
                    radii: radii,
                    stackPartitions: options.stackPartitions,
                    slicePartitions: options.slicePartitions,
                    vertexFormat: options.vertexFormat
            };

            this._ellipsoidGeometry = new EllipsoidGeometry.EllipsoidGeometry(ellipsoidOptions);
            this._workerName = 'createSphereGeometry';
        }

        /**
         * The number of elements used to pack the object into an array.
         * @type {Number}
         */
        SphereGeometry.packedLength = EllipsoidGeometry.EllipsoidGeometry.packedLength;

        /**
         * Stores the provided instance into the provided array.
         *
         * @param {SphereGeometry} value The value to pack.
         * @param {Number[]} array The array to pack into.
         * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
         *
         * @returns {Number[]} The array that was packed into
         */
        SphereGeometry.pack = function(value, array, startingIndex) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('value', value);
            //>>includeEnd('debug');

            return EllipsoidGeometry.EllipsoidGeometry.pack(value._ellipsoidGeometry, array, startingIndex);
        };

        var scratchEllipsoidGeometry = new EllipsoidGeometry.EllipsoidGeometry();
        var scratchOptions = {
            radius : undefined,
            radii : new Cartesian3.Cartesian3(),
            vertexFormat : new VertexFormat.VertexFormat(),
            stackPartitions : undefined,
            slicePartitions : undefined
        };

        /**
         * Retrieves an instance from a packed array.
         *
         * @param {Number[]} array The packed array.
         * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
         * @param {SphereGeometry} [result] The object into which to store the result.
         * @returns {SphereGeometry} The modified result parameter or a new SphereGeometry instance if one was not provided.
         */
        SphereGeometry.unpack = function(array, startingIndex, result) {
            var ellipsoidGeometry = EllipsoidGeometry.EllipsoidGeometry.unpack(array, startingIndex, scratchEllipsoidGeometry);
            scratchOptions.vertexFormat = VertexFormat.VertexFormat.clone(ellipsoidGeometry._vertexFormat, scratchOptions.vertexFormat);
            scratchOptions.stackPartitions = ellipsoidGeometry._stackPartitions;
            scratchOptions.slicePartitions = ellipsoidGeometry._slicePartitions;

            if (!when.defined(result)) {
                scratchOptions.radius = ellipsoidGeometry._radii.x;
                return new SphereGeometry(scratchOptions);
            }

            Cartesian3.Cartesian3.clone(ellipsoidGeometry._radii, scratchOptions.radii);
            result._ellipsoidGeometry = new EllipsoidGeometry.EllipsoidGeometry(scratchOptions);
            return result;
        };

        /**
         * Computes the geometric representation of a sphere, including its vertices, indices, and a bounding sphere.
         *
         * @param {SphereGeometry} sphereGeometry A description of the sphere.
         * @returns {Geometry} The computed vertices and indices.
         */
        SphereGeometry.createGeometry = function(sphereGeometry) {
            return EllipsoidGeometry.EllipsoidGeometry.createGeometry(sphereGeometry._ellipsoidGeometry);
        };

    function createSphereGeometry(sphereGeometry, offset) {
            if (when.defined(offset)) {
                sphereGeometry = SphereGeometry.unpack(sphereGeometry, offset);
            }
            return SphereGeometry.createGeometry(sphereGeometry);
        }

    return createSphereGeometry;

});
//# sourceMappingURL=createSphereGeometry.js.map
