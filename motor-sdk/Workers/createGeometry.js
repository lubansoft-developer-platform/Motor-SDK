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

define(['./when-45f3d25d', './Check-34538dad', './Cartesian3-e69091b9', './Cartesian2-7a44370a', './BoundingSphere-bacc5cb6', './Matrix4-c65e6a1b', './RuntimeError-86da6af2', './Rectangle-c7d55cfa', './WebGLConstants-3660bc8f', './ComponentDatatype-86703c58', './GeometryAttribute-70b679fd', './PrimitiveType-30fa6f85', './Transforms-7d49a8ab', './GeometryAttributes-9d45f9e2', './AttributeCompression-1e177d5e', './GeometryPipeline-57d51dc8', './EncodedCartesian3-7b803d4a', './IndexDatatype-e52361bd', './IntersectionTests-8855da40', './Plane-1875afb4', './PrimitivePipeline-185efa6e', './WebMercatorProjection-c32b7757', './createTaskProcessorWorker'], function (when, Check, Cartesian3, Cartesian2, BoundingSphere, Matrix4, RuntimeError, Rectangle, WebGLConstants, ComponentDatatype, GeometryAttribute, PrimitiveType, Transforms, GeometryAttributes, AttributeCompression, GeometryPipeline, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, PrimitivePipeline, WebMercatorProjection, createTaskProcessorWorker) { 'use strict';

    /* global require */

        var moduleCache = {};

        function getModule(moduleName) {
            var module = moduleCache[moduleName];
            if (!when.defined(module)) {
                if (typeof exports === 'object') {
                    // Use CommonJS-style require.
                    moduleCache[module] = module = require('Workers/' + moduleName);
                } else {
                    // Use AMD-style require.
                    // in web workers, require is synchronous
                    require(['Workers/' + moduleName], function(f) {
                        module = f;
                        moduleCache[module] = f;
                    });
                }
            }
            return module;
        }

        function createGeometry(parameters, transferableObjects) {
            var subTasks = parameters.subTasks;
            var length = subTasks.length;
            var resultsOrPromises = new Array(length);

            for (var i = 0; i < length; i++) {
                var task = subTasks[i];
                var geometry = task.geometry;
                var moduleName = task.moduleName;

                if (when.defined(moduleName)) {
                    var createFunction = getModule(moduleName);
                    resultsOrPromises[i] = createFunction(geometry, task.offset);
                } else {
                    //Already created geometry
                    resultsOrPromises[i] = geometry;
                }
            }

            return when.when.all(resultsOrPromises, function(results) {
                return PrimitivePipeline.PrimitivePipeline.packCreateGeometryResults(results, transferableObjects);
            });
        }
    var createGeometry$1 = createTaskProcessorWorker(createGeometry);

    return createGeometry$1;

});
//# sourceMappingURL=createGeometry.js.map
