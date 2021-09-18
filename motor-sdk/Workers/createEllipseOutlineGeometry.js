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

define(['./when-45f3d25d', './Check-34538dad', './Cartesian3-e69091b9', './Cartesian2-7a44370a', './BoundingSphere-bacc5cb6', './Matrix4-c65e6a1b', './RuntimeError-86da6af2', './Rectangle-c7d55cfa', './WebGLConstants-3660bc8f', './ComponentDatatype-86703c58', './GeometryAttribute-70b679fd', './PrimitiveType-30fa6f85', './Transforms-7d49a8ab', './GeometryAttributes-9d45f9e2', './IndexDatatype-e52361bd', './GeometryOffsetAttribute-f755a5cb', './EllipseGeometryLibrary-60c39a5b', './EllipseOutlineGeometry-597856a5'], function (when, Check, Cartesian3, Cartesian2, BoundingSphere, Matrix4, RuntimeError, Rectangle, WebGLConstants, ComponentDatatype, GeometryAttribute, PrimitiveType, Transforms, GeometryAttributes, IndexDatatype, GeometryOffsetAttribute, EllipseGeometryLibrary, EllipseOutlineGeometry) { 'use strict';

    function createEllipseOutlineGeometry(ellipseGeometry, offset) {
            if (when.defined(offset)) {
                ellipseGeometry = EllipseOutlineGeometry.EllipseOutlineGeometry.unpack(ellipseGeometry, offset);
            }
            ellipseGeometry._center = Cartesian3.Cartesian3.clone(ellipseGeometry._center);
            ellipseGeometry._ellipsoid = Cartesian2.Ellipsoid.clone(ellipseGeometry._ellipsoid);
            return EllipseOutlineGeometry.EllipseOutlineGeometry.createGeometry(ellipseGeometry);
        }

    return createEllipseOutlineGeometry;

});
//# sourceMappingURL=createEllipseOutlineGeometry.js.map
