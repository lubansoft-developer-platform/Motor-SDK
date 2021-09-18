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

define(['exports', './when-45f3d25d', './Check-34538dad', './Cartesian3-e69091b9'], function (exports, when, Check, Cartesian3) { 'use strict';

    var scaleToGeodeticSurfaceIntersection = new Cartesian3.Cartesian3();
        var scaleToGeodeticSurfaceGradient = new Cartesian3.Cartesian3();

        /**
         * Scales the provided Cartesian position along the geodetic surface normal
         * so that it is on the surface of this ellipsoid.  If the position is
         * at the center of the ellipsoid, this function returns undefined.
         *
         * @param {Cartesian3} cartesian The Cartesian position to scale.
         * @param {Cartesian3} oneOverRadii One over radii of the ellipsoid.
         * @param {Cartesian3} oneOverRadiiSquared One over radii squared of the ellipsoid.
         * @param {Number} centerToleranceSquared Tolerance for closeness to the center.
         * @param {Cartesian3} [result] The object onto which to store the result.
         * @returns {Cartesian3} The modified result parameter, a new Cartesian3 instance if none was provided, or undefined if the position is at the center.
         *
         * @function scaleToGeodeticSurface
         *
         * @private
         */
        function scaleToGeodeticSurface(cartesian, oneOverRadii, oneOverRadiiSquared, centerToleranceSquared, result) {
            //>>includeStart('debug', pragmas.debug);
            if (!when.defined(cartesian)) {
                throw new Check.DeveloperError('cartesian is required.');
            }
            if (!when.defined(oneOverRadii)) {
                throw new Check.DeveloperError('oneOverRadii is required.');
            }
            if (!when.defined(oneOverRadiiSquared)) {
                throw new Check.DeveloperError('oneOverRadiiSquared is required.');
            }
            if (!when.defined(centerToleranceSquared)) {
                throw new Check.DeveloperError('centerToleranceSquared is required.');
            }
            //>>includeEnd('debug');

            var positionX = cartesian.x;
            var positionY = cartesian.y;
            var positionZ = cartesian.z;

            var oneOverRadiiX = oneOverRadii.x;
            var oneOverRadiiY = oneOverRadii.y;
            var oneOverRadiiZ = oneOverRadii.z;

            var x2 = positionX * positionX * oneOverRadiiX * oneOverRadiiX;
            var y2 = positionY * positionY * oneOverRadiiY * oneOverRadiiY;
            var z2 = positionZ * positionZ * oneOverRadiiZ * oneOverRadiiZ;

            // Compute the squared ellipsoid norm.
            var squaredNorm = x2 + y2 + z2;
            var ratio = Math.sqrt(1.0 / squaredNorm);

            // As an initial approximation, assume that the radial intersection is the projection point.
            var intersection = Cartesian3.Cartesian3.multiplyByScalar(cartesian, ratio, scaleToGeodeticSurfaceIntersection);

            // If the position is near the center, the iteration will not converge.
            if (squaredNorm < centerToleranceSquared) {
                return !isFinite(ratio) ? undefined : Cartesian3.Cartesian3.clone(intersection, result);
            }

            var oneOverRadiiSquaredX = oneOverRadiiSquared.x;
            var oneOverRadiiSquaredY = oneOverRadiiSquared.y;
            var oneOverRadiiSquaredZ = oneOverRadiiSquared.z;

            // Use the gradient at the intersection point in place of the true unit normal.
            // The difference in magnitude will be absorbed in the multiplier.
            var gradient = scaleToGeodeticSurfaceGradient;
            gradient.x = intersection.x * oneOverRadiiSquaredX * 2.0;
            gradient.y = intersection.y * oneOverRadiiSquaredY * 2.0;
            gradient.z = intersection.z * oneOverRadiiSquaredZ * 2.0;

            // Compute the initial guess at the normal vector multiplier, lambda.
            var lambda = (1.0 - ratio) * Cartesian3.Cartesian3.magnitude(cartesian) / (0.5 * Cartesian3.Cartesian3.magnitude(gradient));
            var correction = 0.0;

            var func;
            var denominator;
            var xMultiplier;
            var yMultiplier;
            var zMultiplier;
            var xMultiplier2;
            var yMultiplier2;
            var zMultiplier2;
            var xMultiplier3;
            var yMultiplier3;
            var zMultiplier3;

            do {
                lambda -= correction;

                xMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredX);
                yMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredY);
                zMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredZ);

                xMultiplier2 = xMultiplier * xMultiplier;
                yMultiplier2 = yMultiplier * yMultiplier;
                zMultiplier2 = zMultiplier * zMultiplier;

                xMultiplier3 = xMultiplier2 * xMultiplier;
                yMultiplier3 = yMultiplier2 * yMultiplier;
                zMultiplier3 = zMultiplier2 * zMultiplier;

                func = x2 * xMultiplier2 + y2 * yMultiplier2 + z2 * zMultiplier2 - 1.0;

                // "denominator" here refers to the use of this expression in the velocity and acceleration
                // computations in the sections to follow.
                denominator = x2 * xMultiplier3 * oneOverRadiiSquaredX + y2 * yMultiplier3 * oneOverRadiiSquaredY + z2 * zMultiplier3 * oneOverRadiiSquaredZ;

                var derivative = -2.0 * denominator;

                correction = func / derivative;
            } while (Math.abs(func) > Cartesian3.CesiumMath.EPSILON12);

            if (!when.defined(result)) {
                return new Cartesian3.Cartesian3(positionX * xMultiplier, positionY * yMultiplier, positionZ * zMultiplier);
            }
            result.x = positionX * xMultiplier;
            result.y = positionY * yMultiplier;
            result.z = positionZ * zMultiplier;
            return result;
        }

    /**
         * A position defined by longitude, latitude, and height.
         * @alias Cartographic
         * @constructor
         *
         * @param {Number} [longitude=0.0] The longitude, in radians.
         * @param {Number} [latitude=0.0] The latitude, in radians.
         * @param {Number} [height=0.0] The height, in meters, above the ellipsoid.
         *
         * @see Ellipsoid
         */
        function Cartographic(longitude, latitude, height) {
            /**
             * The longitude, in radians.
             * @type {Number}
             * @default 0.0
             */
            this.longitude = when.defaultValue(longitude, 0.0);

            /**
             * The latitude, in radians.
             * @type {Number}
             * @default 0.0
             */
            this.latitude = when.defaultValue(latitude, 0.0);

            /**
             * The height, in meters, above the ellipsoid.
             * @type {Number}
             * @default 0.0
             */
            this.height = when.defaultValue(height, 0.0);
        }

        /**
         * Creates a new Cartographic instance from longitude and latitude
         * specified in radians.
         *
         * @param {Number} longitude The longitude, in radians.
         * @param {Number} latitude The latitude, in radians.
         * @param {Number} [height=0.0] The height, in meters, above the ellipsoid.
         * @param {Cartographic} [result] The object onto which to store the result.
         * @returns {Cartographic} The modified result parameter or a new Cartographic instance if one was not provided.
         */
        Cartographic.fromRadians = function(longitude, latitude, height, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.number('longitude', longitude);
            Check.Check.typeOf.number('latitude', latitude);
            //>>includeEnd('debug');

            height = when.defaultValue(height, 0.0);

            if (!when.defined(result)) {
                return new Cartographic(longitude, latitude, height);
            }

            result.longitude = longitude;
            result.latitude = latitude;
            result.height = height;
            return result;
        };

        /**
         * Creates a new Cartographic instance from longitude and latitude
         * specified in degrees.  The values in the resulting object will
         * be in radians.
         *
         * @param {Number} longitude The longitude, in degrees.
         * @param {Number} latitude The latitude, in degrees.
         * @param {Number} [height=0.0] The height, in meters, above the ellipsoid.
         * @param {Cartographic} [result] The object onto which to store the result.
         * @returns {Cartographic} The modified result parameter or a new Cartographic instance if one was not provided.
         */
        Cartographic.fromDegrees = function(longitude, latitude, height, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.number('longitude', longitude);
            Check.Check.typeOf.number('latitude', latitude);
            //>>includeEnd('debug');
            longitude = Cartesian3.CesiumMath.toRadians(longitude);
            latitude = Cartesian3.CesiumMath.toRadians(latitude);

            return Cartographic.fromRadians(longitude, latitude, height, result);
        };

        var cartesianToCartographicN = new Cartesian3.Cartesian3();
        var cartesianToCartographicP = new Cartesian3.Cartesian3();
        var cartesianToCartographicH = new Cartesian3.Cartesian3();
        var wgs84OneOverRadii = new Cartesian3.Cartesian3(1.0 / 6378137.0, 1.0 / 6378137.0, 1.0 / 6356752.3142451793);
        var wgs84OneOverRadiiSquared = new Cartesian3.Cartesian3(1.0 / (6378137.0 * 6378137.0), 1.0 / (6378137.0 * 6378137.0), 1.0 / (6356752.3142451793 * 6356752.3142451793));
        var wgs84CenterToleranceSquared = Cartesian3.CesiumMath.EPSILON1;

        /**
         * Creates a new Cartographic instance from a Cartesian position. The values in the
         * resulting object will be in radians.
         *
         * @param {Cartesian3} cartesian The Cartesian position to convert to cartographic representation.
         * @param {Ellipsoid} [ellipsoid=Ellipsoid.WGS84] The ellipsoid on which the position lies.
         * @param {Cartographic} [result] The object onto which to store the result.
         * @returns {Cartographic} The modified result parameter, new Cartographic instance if none was provided, or undefined if the cartesian is at the center of the ellipsoid.
         */
        Cartographic.fromCartesian = function(cartesian, ellipsoid, result) {
            var oneOverRadii = when.defined(ellipsoid) ? ellipsoid.oneOverRadii : wgs84OneOverRadii;
            var oneOverRadiiSquared = when.defined(ellipsoid) ? ellipsoid.oneOverRadiiSquared : wgs84OneOverRadiiSquared;
            var centerToleranceSquared = when.defined(ellipsoid) ? ellipsoid._centerToleranceSquared : wgs84CenterToleranceSquared;

            //`cartesian is required.` is thrown from scaleToGeodeticSurface
            var p = scaleToGeodeticSurface(cartesian, oneOverRadii, oneOverRadiiSquared, centerToleranceSquared, cartesianToCartographicP);

            if (!when.defined(p)) {
                return undefined;
            }

            var n = Cartesian3.Cartesian3.multiplyComponents(p, oneOverRadiiSquared, cartesianToCartographicN);
            n = Cartesian3.Cartesian3.normalize(n, n);

            var h = Cartesian3.Cartesian3.subtract(cartesian, p, cartesianToCartographicH);

            var longitude = Math.atan2(n.y, n.x);
            var latitude = Math.asin(n.z);
            var height = Cartesian3.CesiumMath.sign(Cartesian3.Cartesian3.dot(h, cartesian)) * Cartesian3.Cartesian3.magnitude(h);

            if (!when.defined(result)) {
                return new Cartographic(longitude, latitude, height);
            }
            result.longitude = longitude;
            result.latitude = latitude;
            result.height = height;
            return result;
        };

        /**
         * Creates a new Cartesian3 instance from a Cartographic input. The values in the inputted
         * object should be in radians.
         *
         * @param {Cartographic} cartographic Input to be converted into a Cartesian3 output.
         * @param {Ellipsoid} [ellipsoid=Ellipsoid.WGS84] The ellipsoid on which the position lies.
         * @param {Cartesian3} [result] The object onto which to store the result.
         * @returns {Cartesian3} The position
         */
        Cartographic.toCartesian = function(cartographic, ellipsoid, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('cartographic', cartographic);
            //>>includeEnd('debug');

            return Cartesian3.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height, ellipsoid, result);
        };

        /**
         * Duplicates a Cartographic instance.
         *
         * @param {Cartographic} cartographic The cartographic to duplicate.
         * @param {Cartographic} [result] The object onto which to store the result.
         * @returns {Cartographic} The modified result parameter or a new Cartographic instance if one was not provided. (Returns undefined if cartographic is undefined)
         */
        Cartographic.clone = function(cartographic, result) {
            if (!when.defined(cartographic)) {
                return undefined;
            }
            if (!when.defined(result)) {
                return new Cartographic(cartographic.longitude, cartographic.latitude, cartographic.height);
            }
            result.longitude = cartographic.longitude;
            result.latitude = cartographic.latitude;
            result.height = cartographic.height;
            return result;
        };

        /**
         * Compares the provided cartographics componentwise and returns
         * <code>true</code> if they are equal, <code>false</code> otherwise.
         *
         * @param {Cartographic} [left] The first cartographic.
         * @param {Cartographic} [right] The second cartographic.
         * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
         */
        Cartographic.equals = function(left, right) {
            return (left === right) ||
                    ((when.defined(left)) &&
                     (when.defined(right)) &&
                     (left.longitude === right.longitude) &&
                     (left.latitude === right.latitude) &&
                     (left.height === right.height));
        };

        /**
         * Compares the provided cartographics componentwise and returns
         * <code>true</code> if they are within the provided epsilon,
         * <code>false</code> otherwise.
         *
         * @param {Cartographic} [left] The first cartographic.
         * @param {Cartographic} [right] The second cartographic.
         * @param {Number} [epsilon = 0] The epsilon to use for equality testing.
         * @returns {Boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
         */
        Cartographic.equalsEpsilon = function(left, right, epsilon) {
            epsilon = when.defaultValue(epsilon, 0);

            return (left === right) ||
                   ((when.defined(left)) &&
                    (when.defined(right)) &&
                    (Math.abs(left.longitude - right.longitude) <= epsilon) &&
                    (Math.abs(left.latitude - right.latitude) <= epsilon) &&
                    (Math.abs(left.height - right.height) <= epsilon));
        };

        /**
         * An immutable Cartographic instance initialized to (0.0, 0.0, 0.0).
         *
         * @type {Cartographic}
         * @constant
         */
        Cartographic.ZERO = Object.freeze(new Cartographic(0.0, 0.0, 0.0));

        /**
         * Duplicates this instance.
         *
         * @param {Cartographic} [result] The object onto which to store the result.
         * @returns {Cartographic} The modified result parameter or a new Cartographic instance if one was not provided.
         */
        Cartographic.prototype.clone = function(result) {
            return Cartographic.clone(this, result);
        };

        /**
         * Compares the provided against this cartographic componentwise and returns
         * <code>true</code> if they are equal, <code>false</code> otherwise.
         *
         * @param {Cartographic} [right] The second cartographic.
         * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
         */
        Cartographic.prototype.equals = function(right) {
            return Cartographic.equals(this, right);
        };

        /**
         * Compares the provided against this cartographic componentwise and returns
         * <code>true</code> if they are within the provided epsilon,
         * <code>false</code> otherwise.
         *
         * @param {Cartographic} [right] The second cartographic.
         * @param {Number} [epsilon = 0] The epsilon to use for equality testing.
         * @returns {Boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
         */
        Cartographic.prototype.equalsEpsilon = function(right, epsilon) {
            return Cartographic.equalsEpsilon(this, right, epsilon);
        };

        /**
         * Creates a string representing this cartographic in the format '(longitude, latitude, height)'.
         *
         * @returns {String} A string representing the provided cartographic in the format '(longitude, latitude, height)'.
         */
        Cartographic.prototype.toString = function() {
            return '(' + this.longitude + ', ' + this.latitude + ', ' + this.height + ')';
        };

    function initialize(ellipsoid, x, y, z) {
            x = when.defaultValue(x, 0.0);
            y = when.defaultValue(y, 0.0);
            z = when.defaultValue(z, 0.0);

            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.number.greaterThanOrEquals('x', x, 0.0);
            Check.Check.typeOf.number.greaterThanOrEquals('y', y, 0.0);
            Check.Check.typeOf.number.greaterThanOrEquals('z', z, 0.0);
            //>>includeEnd('debug');

            ellipsoid._radii = new Cartesian3.Cartesian3(x, y, z);

            ellipsoid._radiiSquared = new Cartesian3.Cartesian3(x * x,
                                                y * y,
                                                z * z);

            ellipsoid._radiiToTheFourth = new Cartesian3.Cartesian3(x * x * x * x,
                                                    y * y * y * y,
                                                    z * z * z * z);

            ellipsoid._oneOverRadii = new Cartesian3.Cartesian3(x === 0.0 ? 0.0 : 1.0 / x,
                                                y === 0.0 ? 0.0 : 1.0 / y,
                                                z === 0.0 ? 0.0 : 1.0 / z);

            ellipsoid._oneOverRadiiSquared = new Cartesian3.Cartesian3(x === 0.0 ? 0.0 : 1.0 / (x * x),
                                                       y === 0.0 ? 0.0 : 1.0 / (y * y),
                                                       z === 0.0 ? 0.0 : 1.0 / (z * z));

            ellipsoid._minimumRadius = Math.min(x, y, z);

            ellipsoid._maximumRadius = Math.max(x, y, z);

            ellipsoid._centerToleranceSquared = Cartesian3.CesiumMath.EPSILON1;

            if (ellipsoid._radiiSquared.z !== 0) {
                ellipsoid._squaredXOverSquaredZ = ellipsoid._radiiSquared.x / ellipsoid._radiiSquared.z;
            }
        }

        /**
         * A quadratic surface defined in Cartesian coordinates by the equation
         * <code>(x / a)^2 + (y / b)^2 + (z / c)^2 = 1</code>.  Primarily used
         * by Cesium to represent the shape of planetary bodies.
         *
         * Rather than constructing this object directly, one of the provided
         * constants is normally used.
         * @alias Ellipsoid
         * @constructor
         *
         * @param {Number} [x=0] The radius in the x direction.
         * @param {Number} [y=0] The radius in the y direction.
         * @param {Number} [z=0] The radius in the z direction.
         *
         * @exception {DeveloperError} All radii components must be greater than or equal to zero.
         *
         * @see Ellipsoid.fromCartesian3
         * @see Ellipsoid.WGS84
         * @see Ellipsoid.UNIT_SPHERE
         */
        function Ellipsoid(x, y, z) {
            this._radii = undefined;
            this._radiiSquared = undefined;
            this._radiiToTheFourth = undefined;
            this._oneOverRadii = undefined;
            this._oneOverRadiiSquared = undefined;
            this._minimumRadius = undefined;
            this._maximumRadius = undefined;
            this._centerToleranceSquared = undefined;
            this._squaredXOverSquaredZ = undefined;

            initialize(this, x, y, z);
        }

        Object.defineProperties(Ellipsoid.prototype, {
            /**
             * Gets the radii of the ellipsoid.
             * @memberof Ellipsoid.prototype
             * @type {Cartesian3}
             * @readonly
             */
            radii : {
                get: function() {
                    return this._radii;
                }
            },
            /**
             * Gets the squared radii of the ellipsoid.
             * @memberof Ellipsoid.prototype
             * @type {Cartesian3}
             * @readonly
             */
            radiiSquared : {
                get : function() {
                    return this._radiiSquared;
                }
            },
            /**
             * Gets the radii of the ellipsoid raise to the fourth power.
             * @memberof Ellipsoid.prototype
             * @type {Cartesian3}
             * @readonly
             */
            radiiToTheFourth : {
                get : function() {
                    return this._radiiToTheFourth;
                }
            },
            /**
             * Gets one over the radii of the ellipsoid.
             * @memberof Ellipsoid.prototype
             * @type {Cartesian3}
             * @readonly
             */
            oneOverRadii : {
                get : function() {
                    return this._oneOverRadii;
                }
            },
            /**
             * Gets one over the squared radii of the ellipsoid.
             * @memberof Ellipsoid.prototype
             * @type {Cartesian3}
             * @readonly
             */
            oneOverRadiiSquared : {
                get : function() {
                    return this._oneOverRadiiSquared;
                }
            },
            /**
             * Gets the minimum radius of the ellipsoid.
             * @memberof Ellipsoid.prototype
             * @type {Number}
             * @readonly
             */
            minimumRadius : {
                get : function() {
                    return this._minimumRadius;
                }
            },
            /**
             * Gets the maximum radius of the ellipsoid.
             * @memberof Ellipsoid.prototype
             * @type {Number}
             * @readonly
             */
            maximumRadius : {
                get : function() {
                    return this._maximumRadius;
                }
            }
        });

        /**
         * Duplicates an Ellipsoid instance.
         *
         * @param {Ellipsoid} ellipsoid The ellipsoid to duplicate.
         * @param {Ellipsoid} [result] The object onto which to store the result, or undefined if a new
         *                    instance should be created.
         * @returns {Ellipsoid} The cloned Ellipsoid. (Returns undefined if ellipsoid is undefined)
         */
        Ellipsoid.clone = function(ellipsoid, result) {
            if (!when.defined(ellipsoid)) {
                return undefined;
            }
            var radii = ellipsoid._radii;

            if (!when.defined(result)) {
                return new Ellipsoid(radii.x, radii.y, radii.z);
            }

            Cartesian3.Cartesian3.clone(radii, result._radii);
            Cartesian3.Cartesian3.clone(ellipsoid._radiiSquared, result._radiiSquared);
            Cartesian3.Cartesian3.clone(ellipsoid._radiiToTheFourth, result._radiiToTheFourth);
            Cartesian3.Cartesian3.clone(ellipsoid._oneOverRadii, result._oneOverRadii);
            Cartesian3.Cartesian3.clone(ellipsoid._oneOverRadiiSquared, result._oneOverRadiiSquared);
            result._minimumRadius = ellipsoid._minimumRadius;
            result._maximumRadius = ellipsoid._maximumRadius;
            result._centerToleranceSquared = ellipsoid._centerToleranceSquared;

            return result;
        };

        /**
         * Computes an Ellipsoid from a Cartesian specifying the radii in x, y, and z directions.
         *
         * @param {Cartesian3} [cartesian=Cartesian3.ZERO] The ellipsoid's radius in the x, y, and z directions.
         * @param {Ellipsoid} [result] The object onto which to store the result, or undefined if a new
         *                    instance should be created.
         * @returns {Ellipsoid} A new Ellipsoid instance.
         *
         * @exception {DeveloperError} All radii components must be greater than or equal to zero.
         *
         * @see Ellipsoid.WGS84
         * @see Ellipsoid.UNIT_SPHERE
         */
        Ellipsoid.fromCartesian3 = function(cartesian, result) {
            if (!when.defined(result)) {
                result = new Ellipsoid();
            }

            if (!when.defined(cartesian)) {
                return result;
            }

            initialize(result, cartesian.x, cartesian.y, cartesian.z);
            return result;
        };

        /**
         * An Ellipsoid instance initialized to the WGS84 standard.
         *
         * @type {Ellipsoid}
         * @constant
         */
        Ellipsoid.WGS84 = Object.freeze(new Ellipsoid(6378137.0, 6378137.0, 6356752.3142451793));

        /**
         * An Ellipsoid instance initialized to radii of (1.0, 1.0, 1.0).
         *
         * @type {Ellipsoid}
         * @constant
         */
        Ellipsoid.UNIT_SPHERE = Object.freeze(new Ellipsoid(1.0, 1.0, 1.0));

        /**
         * An Ellipsoid instance initialized to a sphere with the lunar radius.
         *
         * @type {Ellipsoid}
         * @constant
         */
        Ellipsoid.MOON = Object.freeze(new Ellipsoid(Cartesian3.CesiumMath.LUNAR_RADIUS, Cartesian3.CesiumMath.LUNAR_RADIUS, Cartesian3.CesiumMath.LUNAR_RADIUS));

        /**
         * Duplicates an Ellipsoid instance.
         *
         * @param {Ellipsoid} [result] The object onto which to store the result, or undefined if a new
         *                    instance should be created.
         * @returns {Ellipsoid} The cloned Ellipsoid.
         */
        Ellipsoid.prototype.clone = function(result) {
            return Ellipsoid.clone(this, result);
        };

        /**
         * The number of elements used to pack the object into an array.
         * @type {Number}
         */
        Ellipsoid.packedLength = Cartesian3.Cartesian3.packedLength;

        /**
         * Stores the provided instance into the provided array.
         *
         * @param {Ellipsoid} value The value to pack.
         * @param {Number[]} array The array to pack into.
         * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
         *
         * @returns {Number[]} The array that was packed into
         */
        Ellipsoid.pack = function(value, array, startingIndex) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('value', value);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            startingIndex = when.defaultValue(startingIndex, 0);

            Cartesian3.Cartesian3.pack(value._radii, array, startingIndex);

            return array;
        };

        /**
         * Retrieves an instance from a packed array.
         *
         * @param {Number[]} array The packed array.
         * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
         * @param {Ellipsoid} [result] The object into which to store the result.
         * @returns {Ellipsoid} The modified result parameter or a new Ellipsoid instance if one was not provided.
         */
        Ellipsoid.unpack = function(array, startingIndex, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            startingIndex = when.defaultValue(startingIndex, 0);

            var radii = Cartesian3.Cartesian3.unpack(array, startingIndex);
            return Ellipsoid.fromCartesian3(radii, result);
        };

        /**
         * Computes the unit vector directed from the center of this ellipsoid toward the provided Cartesian position.
         * @function
         *
         * @param {Cartesian3} cartesian The Cartesian for which to to determine the geocentric normal.
         * @param {Cartesian3} [result] The object onto which to store the result.
         * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if none was provided.
         */
        Ellipsoid.prototype.geocentricSurfaceNormal = Cartesian3.Cartesian3.normalize;

        /**
         * Computes the normal of the plane tangent to the surface of the ellipsoid at the provided position.
         *
         * @param {Cartographic} cartographic The cartographic position for which to to determine the geodetic normal.
         * @param {Cartesian3} [result] The object onto which to store the result.
         * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if none was provided.
         */
        Ellipsoid.prototype.geodeticSurfaceNormalCartographic = function(cartographic, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartographic', cartographic);
            //>>includeEnd('debug');

            var longitude = cartographic.longitude;
            var latitude = cartographic.latitude;
            var cosLatitude = Math.cos(latitude);

            var x = cosLatitude * Math.cos(longitude);
            var y = cosLatitude * Math.sin(longitude);
            var z = Math.sin(latitude);

            if (!when.defined(result)) {
                result = new Cartesian3.Cartesian3();
            }
            result.x = x;
            result.y = y;
            result.z = z;
            return Cartesian3.Cartesian3.normalize(result, result);
        };

        /**
         * Computes the normal of the plane tangent to the surface of the ellipsoid at the provided position.
         *
         * @param {Cartesian3} cartesian The Cartesian position for which to to determine the surface normal.
         * @param {Cartesian3} [result] The object onto which to store the result.
         * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if none was provided.
         */
        Ellipsoid.prototype.geodeticSurfaceNormal = function(cartesian, result) {
            if (!when.defined(result)) {
                result = new Cartesian3.Cartesian3();
            }
            result = Cartesian3.Cartesian3.multiplyComponents(cartesian, this._oneOverRadiiSquared, result);
            return Cartesian3.Cartesian3.normalize(result, result);
        };

        var cartographicToCartesianNormal = new Cartesian3.Cartesian3();
        var cartographicToCartesianK = new Cartesian3.Cartesian3();

        /**
         * Converts the provided cartographic to Cartesian representation.
         *
         * @param {Cartographic} cartographic The cartographic position.
         * @param {Cartesian3} [result] The object onto which to store the result.
         * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if none was provided.
         *
         * @example
         * //Create a Cartographic and determine it's Cartesian representation on a WGS84 ellipsoid.
         * var position = new Cesium.Cartographic(Cesium.Math.toRadians(21), Cesium.Math.toRadians(78), 5000);
         * var cartesianPosition = Cesium.Ellipsoid.WGS84.cartographicToCartesian(position);
         */
        Ellipsoid.prototype.cartographicToCartesian = function(cartographic, result) {
            //`cartographic is required` is thrown from geodeticSurfaceNormalCartographic.
            var n = cartographicToCartesianNormal;
            var k = cartographicToCartesianK;
            this.geodeticSurfaceNormalCartographic(cartographic, n);
            Cartesian3.Cartesian3.multiplyComponents(this._radiiSquared, n, k);
            var gamma = Math.sqrt(Cartesian3.Cartesian3.dot(n, k));
            Cartesian3.Cartesian3.divideByScalar(k, gamma, k);
            Cartesian3.Cartesian3.multiplyByScalar(n, cartographic.height, n);

            if (!when.defined(result)) {
                result = new Cartesian3.Cartesian3();
            }
            return Cartesian3.Cartesian3.add(k, n, result);
        };

        /**
         * Converts the provided array of cartographics to an array of Cartesians.
         *
         * @param {Cartographic[]} cartographics An array of cartographic positions.
         * @param {Cartesian3[]} [result] The object onto which to store the result.
         * @returns {Cartesian3[]} The modified result parameter or a new Array instance if none was provided.
         *
         * @example
         * //Convert an array of Cartographics and determine their Cartesian representation on a WGS84 ellipsoid.
         * var positions = [new Cesium.Cartographic(Cesium.Math.toRadians(21), Cesium.Math.toRadians(78), 0),
         *                  new Cesium.Cartographic(Cesium.Math.toRadians(21.321), Cesium.Math.toRadians(78.123), 100),
         *                  new Cesium.Cartographic(Cesium.Math.toRadians(21.645), Cesium.Math.toRadians(78.456), 250)];
         * var cartesianPositions = Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(positions);
         */
        Ellipsoid.prototype.cartographicArrayToCartesianArray = function(cartographics, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('cartographics', cartographics);
            //>>includeEnd('debug')

            var length = cartographics.length;
            if (!when.defined(result)) {
                result = new Array(length);
            } else {
                result.length = length;
            }
            for ( var i = 0; i < length; i++) {
                result[i] = this.cartographicToCartesian(cartographics[i], result[i]);
            }
            return result;
        };

        var cartesianToCartographicN$1 = new Cartesian3.Cartesian3();
        var cartesianToCartographicP$1 = new Cartesian3.Cartesian3();
        var cartesianToCartographicH$1 = new Cartesian3.Cartesian3();

        /**
         * Converts the provided cartesian to cartographic representation.
         * The cartesian is undefined at the center of the ellipsoid.
         *
         * @param {Cartesian3} cartesian The Cartesian position to convert to cartographic representation.
         * @param {Cartographic} [result] The object onto which to store the result.
         * @returns {Cartographic} The modified result parameter, new Cartographic instance if none was provided, or undefined if the cartesian is at the center of the ellipsoid.
         *
         * @example
         * //Create a Cartesian and determine it's Cartographic representation on a WGS84 ellipsoid.
         * var position = new Cesium.Cartesian3(17832.12, 83234.52, 952313.73);
         * var cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
         */
        Ellipsoid.prototype.cartesianToCartographic = function(cartesian, result) {
            //`cartesian is required.` is thrown from scaleToGeodeticSurface
            var p = this.scaleToGeodeticSurface(cartesian, cartesianToCartographicP$1);

            if (!when.defined(p)) {
                return undefined;
            }

            var n = this.geodeticSurfaceNormal(p, cartesianToCartographicN$1);
            var h = Cartesian3.Cartesian3.subtract(cartesian, p, cartesianToCartographicH$1);

            var longitude = Math.atan2(n.y, n.x);
            var latitude = Math.asin(n.z);
            var height = Cartesian3.CesiumMath.sign(Cartesian3.Cartesian3.dot(h, cartesian)) * Cartesian3.Cartesian3.magnitude(h);

            if (!when.defined(result)) {
                return new Cartographic(longitude, latitude, height);
            }
            result.longitude = longitude;
            result.latitude = latitude;
            result.height = height;
            return result;
        };

        /**
         * Converts the provided array of cartesians to an array of cartographics.
         *
         * @param {Cartesian3[]} cartesians An array of Cartesian positions.
         * @param {Cartographic[]} [result] The object onto which to store the result.
         * @returns {Cartographic[]} The modified result parameter or a new Array instance if none was provided.
         *
         * @example
         * //Create an array of Cartesians and determine their Cartographic representation on a WGS84 ellipsoid.
         * var positions = [new Cesium.Cartesian3(17832.12, 83234.52, 952313.73),
         *                  new Cesium.Cartesian3(17832.13, 83234.53, 952313.73),
         *                  new Cesium.Cartesian3(17832.14, 83234.54, 952313.73)]
         * var cartographicPositions = Cesium.Ellipsoid.WGS84.cartesianArrayToCartographicArray(positions);
         */
        Ellipsoid.prototype.cartesianArrayToCartographicArray = function(cartesians, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('cartesians', cartesians);
            //>>includeEnd('debug');

            var length = cartesians.length;
            if (!when.defined(result)) {
                result = new Array(length);
            } else {
                result.length = length;
            }
            for ( var i = 0; i < length; ++i) {
                result[i] = this.cartesianToCartographic(cartesians[i], result[i]);
            }
            return result;
        };

        /**
         * Scales the provided Cartesian position along the geodetic surface normal
         * so that it is on the surface of this ellipsoid.  If the position is
         * at the center of the ellipsoid, this function returns undefined.
         *
         * @param {Cartesian3} cartesian The Cartesian position to scale.
         * @param {Cartesian3} [result] The object onto which to store the result.
         * @returns {Cartesian3} The modified result parameter, a new Cartesian3 instance if none was provided, or undefined if the position is at the center.
         */
        Ellipsoid.prototype.scaleToGeodeticSurface = function(cartesian, result) {
            return scaleToGeodeticSurface(cartesian, this._oneOverRadii, this._oneOverRadiiSquared, this._centerToleranceSquared, result);
        };

        /**
         * Scales the provided Cartesian position along the geocentric surface normal
         * so that it is on the surface of this ellipsoid.
         *
         * @param {Cartesian3} cartesian The Cartesian position to scale.
         * @param {Cartesian3} [result] The object onto which to store the result.
         * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if none was provided.
         */
        Ellipsoid.prototype.scaleToGeocentricSurface = function(cartesian, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            //>>includeEnd('debug');

            if (!when.defined(result)) {
                result = new Cartesian3.Cartesian3();
            }

            var positionX = cartesian.x;
            var positionY = cartesian.y;
            var positionZ = cartesian.z;
            var oneOverRadiiSquared = this._oneOverRadiiSquared;

            var beta = 1.0 / Math.sqrt((positionX * positionX) * oneOverRadiiSquared.x +
                                       (positionY * positionY) * oneOverRadiiSquared.y +
                                       (positionZ * positionZ) * oneOverRadiiSquared.z);

            return Cartesian3.Cartesian3.multiplyByScalar(cartesian, beta, result);
        };

        /**
         * Transforms a Cartesian X, Y, Z position to the ellipsoid-scaled space by multiplying
         * its components by the result of {@link Ellipsoid#oneOverRadii}.
         *
         * @param {Cartesian3} position The position to transform.
         * @param {Cartesian3} [result] The position to which to copy the result, or undefined to create and
         *        return a new instance.
         * @returns {Cartesian3} The position expressed in the scaled space.  The returned instance is the
         *          one passed as the result parameter if it is not undefined, or a new instance of it is.
         */
        Ellipsoid.prototype.transformPositionToScaledSpace = function(position, result) {
            if (!when.defined(result)) {
                result = new Cartesian3.Cartesian3();
            }

            return Cartesian3.Cartesian3.multiplyComponents(position, this._oneOverRadii, result);
        };

        /**
         * Transforms a Cartesian X, Y, Z position from the ellipsoid-scaled space by multiplying
         * its components by the result of {@link Ellipsoid#radii}.
         *
         * @param {Cartesian3} position The position to transform.
         * @param {Cartesian3} [result] The position to which to copy the result, or undefined to create and
         *        return a new instance.
         * @returns {Cartesian3} The position expressed in the unscaled space.  The returned instance is the
         *          one passed as the result parameter if it is not undefined, or a new instance of it is.
         */
        Ellipsoid.prototype.transformPositionFromScaledSpace = function(position, result) {
            if (!when.defined(result)) {
                result = new Cartesian3.Cartesian3();
            }

            return Cartesian3.Cartesian3.multiplyComponents(position, this._radii, result);
        };

        /**
         * Compares this Ellipsoid against the provided Ellipsoid componentwise and returns
         * <code>true</code> if they are equal, <code>false</code> otherwise.
         *
         * @param {Ellipsoid} [right] The other Ellipsoid.
         * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
         */
        Ellipsoid.prototype.equals = function(right) {
            return (this === right) ||
                   (when.defined(right) &&
                    Cartesian3.Cartesian3.equals(this._radii, right._radii));
        };

        /**
         * Creates a string representing this Ellipsoid in the format '(radii.x, radii.y, radii.z)'.
         *
         * @returns {String} A string representing this ellipsoid in the format '(radii.x, radii.y, radii.z)'.
         */
        Ellipsoid.prototype.toString = function() {
            return this._radii.toString();
        };

        /**
         * Computes a point which is the intersection of the surface normal with the z-axis.
         *
         * @param {Cartesian3} position the position. must be on the surface of the ellipsoid.
         * @param {Number} [buffer = 0.0] A buffer to subtract from the ellipsoid size when checking if the point is inside the ellipsoid.
         *                                In earth case, with common earth datums, there is no need for this buffer since the intersection point is always (relatively) very close to the center.
         *                                In WGS84 datum, intersection point is at max z = +-42841.31151331382 (0.673% of z-axis).
         *                                Intersection point could be outside the ellipsoid if the ratio of MajorAxis / AxisOfRotation is bigger than the square root of 2
         * @param {Cartesian3} [result] The cartesian to which to copy the result, or undefined to create and
         *        return a new instance.
         * @returns {Cartesian3 | undefined} the intersection point if it's inside the ellipsoid, undefined otherwise
         *
         * @exception {DeveloperError} position is required.
         * @exception {DeveloperError} Ellipsoid must be an ellipsoid of revolution (radii.x == radii.y).
         * @exception {DeveloperError} Ellipsoid.radii.z must be greater than 0.
         */
        Ellipsoid.prototype.getSurfaceNormalIntersectionWithZAxis = function(position, buffer, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('position', position);

            if (!Cartesian3.CesiumMath.equalsEpsilon(this._radii.x, this._radii.y, Cartesian3.CesiumMath.EPSILON15)) {
                throw new Check.DeveloperError('Ellipsoid must be an ellipsoid of revolution (radii.x == radii.y)');
            }

            Check.Check.typeOf.number.greaterThan('Ellipsoid.radii.z', this._radii.z, 0);
            //>>includeEnd('debug');

            buffer = when.defaultValue(buffer, 0.0);

            var squaredXOverSquaredZ = this._squaredXOverSquaredZ;

            if (!when.defined(result)) {
                result = new Cartesian3.Cartesian3();
            }

            result.x = 0.0;
            result.y = 0.0;
            result.z = position.z * (1 - squaredXOverSquaredZ);

            if (Math.abs(result.z) >= this._radii.z - buffer) {
                return undefined;
            }

            return result;
        };

    /**
         * A 2D Cartesian point.
         * @alias Cartesian2
         * @constructor
         *
         * @param {Number} [x=0.0] The X component.
         * @param {Number} [y=0.0] The Y component.
         *
         * @see Cartesian3
         * @see Cartesian4
         * @see Packable
         */
        function Cartesian2(x, y) {
            /**
             * The X component.
             * @type {Number}
             * @default 0.0
             */
            this.x = when.defaultValue(x, 0.0);

            /**
             * The Y component.
             * @type {Number}
             * @default 0.0
             */
            this.y = when.defaultValue(y, 0.0);
        }

        /**
         * Creates a Cartesian2 instance from x and y coordinates.
         *
         * @param {Number} x The x coordinate.
         * @param {Number} y The y coordinate.
         * @param {Cartesian2} [result] The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
         */
        Cartesian2.fromElements = function(x, y, result) {
            if (!when.defined(result)) {
                return new Cartesian2(x, y);
            }

            result.x = x;
            result.y = y;
            return result;
        };

        /**
         * Duplicates a Cartesian2 instance.
         *
         * @param {Cartesian2} cartesian The Cartesian to duplicate.
         * @param {Cartesian2} [result] The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided. (Returns undefined if cartesian is undefined)
         */
        Cartesian2.clone = function(cartesian, result) {
            if (!when.defined(cartesian)) {
                return undefined;
            }
            if (!when.defined(result)) {
                return new Cartesian2(cartesian.x, cartesian.y);
            }

            result.x = cartesian.x;
            result.y = cartesian.y;
            return result;
        };

        /**
         * Creates a Cartesian2 instance from an existing Cartesian3.  This simply takes the
         * x and y properties of the Cartesian3 and drops z.
         * @function
         *
         * @param {Cartesian3} cartesian The Cartesian3 instance to create a Cartesian2 instance from.
         * @param {Cartesian2} [result] The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
         */
        Cartesian2.fromCartesian3 = Cartesian2.clone;

        /**
         * Creates a Cartesian2 instance from an existing Cartesian4.  This simply takes the
         * x and y properties of the Cartesian4 and drops z and w.
         * @function
         *
         * @param {Cartesian4} cartesian The Cartesian4 instance to create a Cartesian2 instance from.
         * @param {Cartesian2} [result] The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
         */
        Cartesian2.fromCartesian4 = Cartesian2.clone;

        /**
         * The number of elements used to pack the object into an array.
         * @type {Number}
         */
        Cartesian2.packedLength = 2;

        /**
         * Stores the provided instance into the provided array.
         *
         * @param {Cartesian2} value The value to pack.
         * @param {Number[]} array The array to pack into.
         * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
         *
         * @returns {Number[]} The array that was packed into
         */
        Cartesian2.pack = function(value, array, startingIndex) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('value', value);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            startingIndex = when.defaultValue(startingIndex, 0);

            array[startingIndex++] = value.x;
            array[startingIndex] = value.y;

            return array;
        };

        /**
         * Retrieves an instance from a packed array.
         *
         * @param {Number[]} array The packed array.
         * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
         * @param {Cartesian2} [result] The object into which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
         */
        Cartesian2.unpack = function(array, startingIndex, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            startingIndex = when.defaultValue(startingIndex, 0);

            if (!when.defined(result)) {
                result = new Cartesian2();
            }
            result.x = array[startingIndex++];
            result.y = array[startingIndex];
            return result;
        };

        /**
         * Flattens an array of Cartesian2s into and array of components.
         *
         * @param {Cartesian2[]} array The array of cartesians to pack.
         * @param {Number[]} [result] The array onto which to store the result. If this is a typed array, it must have array.length * 2 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 2) elements.

         * @returns {Number[]} The packed array.
         */
        Cartesian2.packArray = function(array, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            var length = array.length;
            var resultLength = length * 2;
            if (!when.defined(result)) {
                result = new Array(resultLength);
            } else if (!Array.isArray(result) && result.length !== resultLength) {
                throw new Check.DeveloperError('If result is a typed array, it must have exactly array.length * 2 elements');
            } else if (result.length !== resultLength) {
                result.length = resultLength;
            }

            for (var i = 0; i < length; ++i) {
                Cartesian2.pack(array[i], result, i * 2);
            }
            return result;
        };

        /**
         * Unpacks an array of cartesian components into and array of Cartesian2s.
         *
         * @param {Number[]} array The array of components to unpack.
         * @param {Cartesian2[]} [result] The array onto which to store the result.
         * @returns {Cartesian2[]} The unpacked array.
         */
        Cartesian2.unpackArray = function(array, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('array', array);
            Check.Check.typeOf.number.greaterThanOrEquals('array.length', array.length, 2);
            if (array.length % 2 !== 0) {
                throw new Check.DeveloperError('array length must be a multiple of 2.');
            }
            //>>includeEnd('debug');

            var length = array.length;
            if (!when.defined(result)) {
                result = new Array(length / 2);
            } else {
                result.length = length / 2;
            }

            for (var i = 0; i < length; i += 2) {
                var index = i / 2;
                result[index] = Cartesian2.unpack(array, i, result[index]);
            }
            return result;
        };

        /**
         * Creates a Cartesian2 from two consecutive elements in an array.
         * @function
         *
         * @param {Number[]} array The array whose two consecutive elements correspond to the x and y components, respectively.
         * @param {Number} [startingIndex=0] The offset into the array of the first element, which corresponds to the x component.
         * @param {Cartesian2} [result] The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
         *
         * @example
         * // Create a Cartesian2 with (1.0, 2.0)
         * var v = [1.0, 2.0];
         * var p = Cesium.Cartesian2.fromArray(v);
         *
         * // Create a Cartesian2 with (1.0, 2.0) using an offset into an array
         * var v2 = [0.0, 0.0, 1.0, 2.0];
         * var p2 = Cesium.Cartesian2.fromArray(v2, 2);
         */
        Cartesian2.fromArray = Cartesian2.unpack;

        /**
         * Computes the value of the maximum component for the supplied Cartesian.
         *
         * @param {Cartesian2} cartesian The cartesian to use.
         * @returns {Number} The value of the maximum component.
         */
        Cartesian2.maximumComponent = function(cartesian) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            //>>includeEnd('debug');

            return Math.max(cartesian.x, cartesian.y);
        };

        /**
         * Computes the value of the minimum component for the supplied Cartesian.
         *
         * @param {Cartesian2} cartesian The cartesian to use.
         * @returns {Number} The value of the minimum component.
         */
        Cartesian2.minimumComponent = function(cartesian) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            //>>includeEnd('debug');

            return Math.min(cartesian.x, cartesian.y);
        };

        /**
         * Compares two Cartesians and computes a Cartesian which contains the minimum components of the supplied Cartesians.
         *
         * @param {Cartesian2} first A cartesian to compare.
         * @param {Cartesian2} second A cartesian to compare.
         * @param {Cartesian2} result The object into which to store the result.
         * @returns {Cartesian2} A cartesian with the minimum components.
         */
        Cartesian2.minimumByComponent = function(first, second, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('first', first);
            Check.Check.typeOf.object('second', second);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = Math.min(first.x, second.x);
            result.y = Math.min(first.y, second.y);

            return result;
        };

        /**
         * Compares two Cartesians and computes a Cartesian which contains the maximum components of the supplied Cartesians.
         *
         * @param {Cartesian2} first A cartesian to compare.
         * @param {Cartesian2} second A cartesian to compare.
         * @param {Cartesian2} result The object into which to store the result.
         * @returns {Cartesian2} A cartesian with the maximum components.
         */
        Cartesian2.maximumByComponent = function(first, second, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('first', first);
            Check.Check.typeOf.object('second', second);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = Math.max(first.x, second.x);
            result.y = Math.max(first.y, second.y);
            return result;
        };

        /**
         * Computes the provided Cartesian's squared magnitude.
         *
         * @param {Cartesian2} cartesian The Cartesian instance whose squared magnitude is to be computed.
         * @returns {Number} The squared magnitude.
         */
        Cartesian2.magnitudeSquared = function(cartesian) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            //>>includeEnd('debug');

            return cartesian.x * cartesian.x + cartesian.y * cartesian.y;
        };

        /**
         * Computes the Cartesian's magnitude (length).
         *
         * @param {Cartesian2} cartesian The Cartesian instance whose magnitude is to be computed.
         * @returns {Number} The magnitude.
         */
        Cartesian2.magnitude = function(cartesian) {
            return Math.sqrt(Cartesian2.magnitudeSquared(cartesian));
        };

        var distanceScratch = new Cartesian2();

        /**
         * Computes the distance between two points.
         *
         * @param {Cartesian2} left The first point to compute the distance from.
         * @param {Cartesian2} right The second point to compute the distance to.
         * @returns {Number} The distance between two points.
         *
         * @example
         * // Returns 1.0
         * var d = Cesium.Cartesian2.distance(new Cesium.Cartesian2(1.0, 0.0), new Cesium.Cartesian2(2.0, 0.0));
         */
        Cartesian2.distance = function(left, right) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            //>>includeEnd('debug');

            Cartesian2.subtract(left, right, distanceScratch);
            return Cartesian2.magnitude(distanceScratch);
        };

        /**
         * Computes the squared distance between two points.  Comparing squared distances
         * using this function is more efficient than comparing distances using {@link Cartesian2#distance}.
         *
         * @param {Cartesian2} left The first point to compute the distance from.
         * @param {Cartesian2} right The second point to compute the distance to.
         * @returns {Number} The distance between two points.
         *
         * @example
         * // Returns 4.0, not 2.0
         * var d = Cesium.Cartesian2.distance(new Cesium.Cartesian2(1.0, 0.0), new Cesium.Cartesian2(3.0, 0.0));
         */
        Cartesian2.distanceSquared = function(left, right) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            //>>includeEnd('debug');

            Cartesian2.subtract(left, right, distanceScratch);
            return Cartesian2.magnitudeSquared(distanceScratch);
        };

        /**
         * Computes the normalized form of the supplied Cartesian.
         *
         * @param {Cartesian2} cartesian The Cartesian to be normalized.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.normalize = function(cartesian, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            var magnitude = Cartesian2.magnitude(cartesian);

            result.x = cartesian.x / magnitude;
            result.y = cartesian.y / magnitude;

            //>>includeStart('debug', pragmas.debug);
            if (isNaN(result.x) || isNaN(result.y)) {
                throw new Check.DeveloperError('normalized result is not a number');
            }
            //>>includeEnd('debug');

            return result;
        };

        /**
         * Computes the dot (scalar) product of two Cartesians.
         *
         * @param {Cartesian2} left The first Cartesian.
         * @param {Cartesian2} right The second Cartesian.
         * @returns {Number} The dot product.
         */
        Cartesian2.dot = function(left, right) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            //>>includeEnd('debug');

            return left.x * right.x + left.y * right.y;
        };

        /**
         * Computes the componentwise product of two Cartesians.
         *
         * @param {Cartesian2} left The first Cartesian.
         * @param {Cartesian2} right The second Cartesian.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.multiplyComponents = function(left, right, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = left.x * right.x;
            result.y = left.y * right.y;
            return result;
        };

        /**
         * Computes the componentwise quotient of two Cartesians.
         *
         * @param {Cartesian2} left The first Cartesian.
         * @param {Cartesian2} right The second Cartesian.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.divideComponents = function(left, right, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = left.x / right.x;
            result.y = left.y / right.y;
            return result;
        };

        /**
         * Computes the componentwise sum of two Cartesians.
         *
         * @param {Cartesian2} left The first Cartesian.
         * @param {Cartesian2} right The second Cartesian.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.add = function(left, right, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = left.x + right.x;
            result.y = left.y + right.y;
            return result;
        };

        /**
         * Computes the componentwise difference of two Cartesians.
         *
         * @param {Cartesian2} left The first Cartesian.
         * @param {Cartesian2} right The second Cartesian.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.subtract = function(left, right, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = left.x - right.x;
            result.y = left.y - right.y;
            return result;
        };

        /**
         * Multiplies the provided Cartesian componentwise by the provided scalar.
         *
         * @param {Cartesian2} cartesian The Cartesian to be scaled.
         * @param {Number} scalar The scalar to multiply with.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.multiplyByScalar = function(cartesian, scalar, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            Check.Check.typeOf.number('scalar', scalar);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = cartesian.x * scalar;
            result.y = cartesian.y * scalar;
            return result;
        };

        /**
         * Divides the provided Cartesian componentwise by the provided scalar.
         *
         * @param {Cartesian2} cartesian The Cartesian to be divided.
         * @param {Number} scalar The scalar to divide by.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.divideByScalar = function(cartesian, scalar, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            Check.Check.typeOf.number('scalar', scalar);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = cartesian.x / scalar;
            result.y = cartesian.y / scalar;
            return result;
        };

        /**
         * Negates the provided Cartesian.
         *
         * @param {Cartesian2} cartesian The Cartesian to be negated.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.negate = function(cartesian, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = -cartesian.x;
            result.y = -cartesian.y;
            return result;
        };

        /**
         * Computes the absolute value of the provided Cartesian.
         *
         * @param {Cartesian2} cartesian The Cartesian whose absolute value is to be computed.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.abs = function(cartesian, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = Math.abs(cartesian.x);
            result.y = Math.abs(cartesian.y);
            return result;
        };

        var lerpScratch = new Cartesian2();
        /**
         * Computes the linear interpolation or extrapolation at t using the provided cartesians.
         *
         * @param {Cartesian2} start The value corresponding to t at 0.0.
         * @param {Cartesian2} end The value corresponding to t at 1.0.
         * @param {Number} t The point along t at which to interpolate.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.lerp = function(start, end, t, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('start', start);
            Check.Check.typeOf.object('end', end);
            Check.Check.typeOf.number('t', t);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            Cartesian2.multiplyByScalar(end, t, lerpScratch);
            result = Cartesian2.multiplyByScalar(start, 1.0 - t, result);
            return Cartesian2.add(lerpScratch, result, result);
        };

        var angleBetweenScratch = new Cartesian2();
        var angleBetweenScratch2 = new Cartesian2();
        /**
         * Returns the angle, in radians, between the provided Cartesians.
         *
         * @param {Cartesian2} left The first Cartesian.
         * @param {Cartesian2} right The second Cartesian.
         * @returns {Number} The angle between the Cartesians.
         */
        Cartesian2.angleBetween = function(left, right) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            //>>includeEnd('debug');

            Cartesian2.normalize(left, angleBetweenScratch);
            Cartesian2.normalize(right, angleBetweenScratch2);
            return Cartesian3.CesiumMath.acosClamped(Cartesian2.dot(angleBetweenScratch, angleBetweenScratch2));
        };

        var mostOrthogonalAxisScratch = new Cartesian2();
        /**
         * Returns the axis that is most orthogonal to the provided Cartesian.
         *
         * @param {Cartesian2} cartesian The Cartesian on which to find the most orthogonal axis.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The most orthogonal axis.
         */
        Cartesian2.mostOrthogonalAxis = function(cartesian, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            var f = Cartesian2.normalize(cartesian, mostOrthogonalAxisScratch);
            Cartesian2.abs(f, f);

            if (f.x <= f.y) {
                result = Cartesian2.clone(Cartesian2.UNIT_X, result);
            } else {
                result = Cartesian2.clone(Cartesian2.UNIT_Y, result);
            }

            return result;
        };

        /**
         * Compares the provided Cartesians componentwise and returns
         * <code>true</code> if they are equal, <code>false</code> otherwise.
         *
         * @param {Cartesian2} [left] The first Cartesian.
         * @param {Cartesian2} [right] The second Cartesian.
         * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
         */
        Cartesian2.equals = function(left, right) {
            return (left === right) ||
                   ((when.defined(left)) &&
                    (when.defined(right)) &&
                    (left.x === right.x) &&
                    (left.y === right.y));
        };

        /**
         * @private
         */
        Cartesian2.equalsArray = function(cartesian, array, offset) {
            return cartesian.x === array[offset] &&
                   cartesian.y === array[offset + 1];
        };

        /**
         * Compares the provided Cartesians componentwise and returns
         * <code>true</code> if they pass an absolute or relative tolerance test,
         * <code>false</code> otherwise.
         *
         * @param {Cartesian2} [left] The first Cartesian.
         * @param {Cartesian2} [right] The second Cartesian.
         * @param {Number} [relativeEpsilon = 0] The relative epsilon tolerance to use for equality testing.
         * @param {Number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
         * @returns {Boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
         */
        Cartesian2.equalsEpsilon = function(left, right, relativeEpsilon, absoluteEpsilon) {
            return (left === right) ||
                   (when.defined(left) &&
                    when.defined(right) &&
                    Cartesian3.CesiumMath.equalsEpsilon(left.x, right.x, relativeEpsilon, absoluteEpsilon) &&
                    Cartesian3.CesiumMath.equalsEpsilon(left.y, right.y, relativeEpsilon, absoluteEpsilon));
        };

        /**
         * An immutable Cartesian2 instance initialized to (0.0, 0.0).
         *
         * @type {Cartesian2}
         * @constant
         */
        Cartesian2.ZERO = Object.freeze(new Cartesian2(0.0, 0.0));

        /**
         * An immutable Cartesian2 instance initialized to (1.0, 0.0).
         *
         * @type {Cartesian2}
         * @constant
         */
        Cartesian2.UNIT_X = Object.freeze(new Cartesian2(1.0, 0.0));

        /**
         * An immutable Cartesian2 instance initialized to (0.0, 1.0).
         *
         * @type {Cartesian2}
         * @constant
         */
        Cartesian2.UNIT_Y = Object.freeze(new Cartesian2(0.0, 1.0));

        /**
         * Duplicates this Cartesian2 instance.
         *
         * @param {Cartesian2} [result] The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
         */
        Cartesian2.prototype.clone = function(result) {
            return Cartesian2.clone(this, result);
        };

        /**
         * Compares this Cartesian against the provided Cartesian componentwise and returns
         * <code>true</code> if they are equal, <code>false</code> otherwise.
         *
         * @param {Cartesian2} [right] The right hand side Cartesian.
         * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
         */
        Cartesian2.prototype.equals = function(right) {
            return Cartesian2.equals(this, right);
        };

        /**
         * Compares this Cartesian against the provided Cartesian componentwise and returns
         * <code>true</code> if they pass an absolute or relative tolerance test,
         * <code>false</code> otherwise.
         *
         * @param {Cartesian2} [right] The right hand side Cartesian.
         * @param {Number} [relativeEpsilon = 0] The relative epsilon tolerance to use for equality testing.
         * @param {Number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
         * @returns {Boolean} <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
         */
        Cartesian2.prototype.equalsEpsilon = function(right, relativeEpsilon, absoluteEpsilon) {
            return Cartesian2.equalsEpsilon(this, right, relativeEpsilon, absoluteEpsilon);
        };

        /**
         * Creates a string representing this Cartesian in the format '(x, y)'.
         *
         * @returns {String} A string representing the provided Cartesian in the format '(x, y)'.
         */
        Cartesian2.prototype.toString = function() {
            return '(' + this.x + ', ' + this.y + ')';
        };

    exports.Cartesian2 = Cartesian2;
    exports.Cartographic = Cartographic;
    exports.Ellipsoid = Ellipsoid;

});
//# sourceMappingURL=Cartesian2-7a44370a.js.map
