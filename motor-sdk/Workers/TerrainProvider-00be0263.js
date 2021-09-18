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

define(['exports', './when-45f3d25d', './Check-34538dad', './Cartesian3-e69091b9', './IndexDatatype-e52361bd'], function (exports, when, Check, Cartesian3, IndexDatatype) { 'use strict';

    /**
         * Provides terrain or other geometry for the surface of an ellipsoid.  The surface geometry is
         * organized into a pyramid of tiles according to a {@link TilingScheme}.  This type describes an
         * interface and is not intended to be instantiated directly.
         *
         * @alias TerrainProvider
         * @constructor
         *
         * @see EllipsoidTerrainProvider
         * @see CesiumTerrainProvider
         * @see VRTheWorldTerrainProvider
         * @see GoogleEarthEnterpriseTerrainProvider
         */
        function TerrainProvider() {
            Check.DeveloperError.throwInstantiationError();
        }

        Object.defineProperties(TerrainProvider.prototype, {
            /**
             * Gets an event that is raised when the terrain provider encounters an asynchronous error..  By subscribing
             * to the event, you will be notified of the error and can potentially recover from it.  Event listeners
             * are passed an instance of {@link TileProviderError}.
             * @memberof TerrainProvider.prototype
             * @type {Event}
             */
            errorEvent : {
                get : Check.DeveloperError.throwInstantiationError
            },

            /**
             * Gets the credit to display when this terrain provider is active.  Typically this is used to credit
             * the source of the terrain. This function should
             * not be called before {@link TerrainProvider#ready} returns true.
             * @memberof TerrainProvider.prototype
             * @type {Credit}
             */
            credit : {
                get : Check.DeveloperError.throwInstantiationError
            },

            /**
             * Gets the tiling scheme used by the provider.  This function should
             * not be called before {@link TerrainProvider#ready} returns true.
             * @memberof TerrainProvider.prototype
             * @type {TilingScheme}
             */
            tilingScheme : {
                get : Check.DeveloperError.throwInstantiationError
            },

            /**
             * Gets a value indicating whether or not the provider is ready for use.
             * @memberof TerrainProvider.prototype
             * @type {Boolean}
             */
            ready : {
                get : Check.DeveloperError.throwInstantiationError
            },

            /**
             * Gets a promise that resolves to true when the provider is ready for use.
             * @memberof TerrainProvider.prototype
             * @type {Promise.<Boolean>}
             * @readonly
             */
            readyPromise : {
                get : Check.DeveloperError.throwInstantiationError
            },

            /**
             * Gets a value indicating whether or not the provider includes a water mask.  The water mask
             * indicates which areas of the globe are water rather than land, so they can be rendered
             * as a reflective surface with animated waves.  This function should not be
             * called before {@link TerrainProvider#ready} returns true.
             * @memberof TerrainProvider.prototype
             * @type {Boolean}
             */
            hasWaterMask : {
                get : Check.DeveloperError.throwInstantiationError
            },

            /**
             * Gets a value indicating whether or not the requested tiles include vertex normals.
             * This function should not be called before {@link TerrainProvider#ready} returns true.
             * @memberof TerrainProvider.prototype
             * @type {Boolean}
             */
            hasVertexNormals : {
                get : Check.DeveloperError.throwInstantiationError
            },

            /**
             * Gets an object that can be used to determine availability of terrain from this provider, such as
             * at points and in rectangles.  This function should not be called before
             * {@link TerrainProvider#ready} returns true.  This property may be undefined if availability
             * information is not available.
             * @memberof TerrainProvider.prototype
             * @type {TileAvailability}
             */
            availability : {
                get : Check.DeveloperError.throwInstantiationError
            }
        });

        var regularGridIndicesCache = [];

        /**
         * Gets a list of indices for a triangle mesh representing a regular grid.  Calling
         * this function multiple times with the same grid width and height returns the
         * same list of indices.  The total number of vertices must be less than or equal
         * to 65536.
         *
         * @param {Number} width The number of vertices in the regular grid in the horizontal direction.
         * @param {Number} height The number of vertices in the regular grid in the vertical direction.
         * @returns {Uint16Array|Uint32Array} The list of indices. Uint16Array gets returned for 64KB or less and Uint32Array for 4GB or less.
         */
        TerrainProvider.getRegularGridIndices = function(width, height) {
            //>>includeStart('debug', pragmas.debug);
            if (width * height >= Cartesian3.CesiumMath.FOUR_GIGABYTES) {
                throw new Check.DeveloperError('The total number of vertices (width * height) must be less than 4,294,967,296.');
            }
            //>>includeEnd('debug');

            var byWidth = regularGridIndicesCache[width];
            if (!when.defined(byWidth)) {
                regularGridIndicesCache[width] = byWidth = [];
            }

            var indices = byWidth[height];
            if (!when.defined(indices)) {
                if (width * height < Cartesian3.CesiumMath.SIXTY_FOUR_KILOBYTES) {
                    indices = byWidth[height] = new Uint16Array((width - 1) * (height - 1) * 6);
                } else {
                    indices = byWidth[height] = new Uint32Array((width - 1) * (height - 1) * 6);
                }
                addRegularGridIndices(width, height, indices, 0);
            }

            return indices;
        };

        var regularGridAndEdgeIndicesCache = [];

        /**
         * @private
         */
        TerrainProvider.getRegularGridIndicesAndEdgeIndices = function(width, height) {
            //>>includeStart('debug', pragmas.debug);
            if (width * height >= Cartesian3.CesiumMath.FOUR_GIGABYTES) {
                throw new Check.DeveloperError('The total number of vertices (width * height) must be less than 4,294,967,296.');
            }
            //>>includeEnd('debug');

            var byWidth = regularGridAndEdgeIndicesCache[width];
            if (!when.defined(byWidth)) {
                regularGridAndEdgeIndicesCache[width] = byWidth = [];
            }

            var indicesAndEdges = byWidth[height];
            if (!when.defined(indicesAndEdges)) {
                var indices = TerrainProvider.getRegularGridIndices(width, height);

                var edgeIndices = getEdgeIndices(width, height);
                var westIndicesSouthToNorth = edgeIndices.westIndicesSouthToNorth;
                var southIndicesEastToWest = edgeIndices.southIndicesEastToWest;
                var eastIndicesNorthToSouth = edgeIndices.eastIndicesNorthToSouth;
                var northIndicesWestToEast = edgeIndices.northIndicesWestToEast;

                indicesAndEdges = byWidth[height] = {
                    indices : indices,
                    westIndicesSouthToNorth : westIndicesSouthToNorth,
                    southIndicesEastToWest : southIndicesEastToWest,
                    eastIndicesNorthToSouth : eastIndicesNorthToSouth,
                    northIndicesWestToEast : northIndicesWestToEast
                };
            }

            return indicesAndEdges;
        };

        var regularGridAndSkirtAndEdgeIndicesCache = [];

        /**
         * @private
         */
        TerrainProvider.getRegularGridAndSkirtIndicesAndEdgeIndices = function(width, height) {
            //>>includeStart('debug', pragmas.debug);
            if (width * height >= Cartesian3.CesiumMath.FOUR_GIGABYTES) {
                throw new Check.DeveloperError('The total number of vertices (width * height) must be less than 4,294,967,296.');
            }
            //>>includeEnd('debug');

            var byWidth = regularGridAndSkirtAndEdgeIndicesCache[width];
            if (!when.defined(byWidth)) {
                regularGridAndSkirtAndEdgeIndicesCache[width] = byWidth = [];
            }

            var indicesAndEdges = byWidth[height];
            if (!when.defined(indicesAndEdges)) {
                var gridVertexCount = width * height;
                var gridIndexCount = (width - 1) * (height - 1) * 6;
                var edgeVertexCount = width * 2 + height * 2;
                var edgeIndexCount = Math.max(0, edgeVertexCount - 4) * 6;
                var vertexCount = gridVertexCount + edgeVertexCount;
                var indexCount = gridIndexCount + edgeIndexCount;

                var edgeIndices = getEdgeIndices(width, height);
                var westIndicesSouthToNorth = edgeIndices.westIndicesSouthToNorth;
                var southIndicesEastToWest = edgeIndices.southIndicesEastToWest;
                var eastIndicesNorthToSouth = edgeIndices.eastIndicesNorthToSouth;
                var northIndicesWestToEast = edgeIndices.northIndicesWestToEast;

                var indices = IndexDatatype.IndexDatatype.createTypedArray(vertexCount, indexCount);
                addRegularGridIndices(width, height, indices, 0);
                TerrainProvider.addSkirtIndices(westIndicesSouthToNorth, southIndicesEastToWest, eastIndicesNorthToSouth, northIndicesWestToEast, gridVertexCount, indices, gridIndexCount);

                indicesAndEdges = byWidth[height] = {
                    indices : indices,
                    westIndicesSouthToNorth : westIndicesSouthToNorth,
                    southIndicesEastToWest : southIndicesEastToWest,
                    eastIndicesNorthToSouth : eastIndicesNorthToSouth,
                    northIndicesWestToEast : northIndicesWestToEast,
                    indexCountWithoutSkirts : gridIndexCount
                };
            }

            return indicesAndEdges;
        };

        /**
         * @private
         */
        TerrainProvider.addSkirtIndices = function(westIndicesSouthToNorth, southIndicesEastToWest, eastIndicesNorthToSouth, northIndicesWestToEast, vertexCount, indices, offset) {
            var vertexIndex = vertexCount;
            offset = addSkirtIndices(westIndicesSouthToNorth, vertexIndex, indices, offset);
            vertexIndex += westIndicesSouthToNorth.length;
            offset = addSkirtIndices(southIndicesEastToWest, vertexIndex, indices, offset);
            vertexIndex += southIndicesEastToWest.length;
            offset = addSkirtIndices(eastIndicesNorthToSouth, vertexIndex, indices, offset);
            vertexIndex += eastIndicesNorthToSouth.length;
            addSkirtIndices(northIndicesWestToEast, vertexIndex, indices, offset);
        };

        function getEdgeIndices(width, height) {
            var westIndicesSouthToNorth = new Array(height);
            var southIndicesEastToWest = new Array(width);
            var eastIndicesNorthToSouth = new Array(height);
            var northIndicesWestToEast = new Array(width);

            var i;
            for (i = 0; i < width; ++i) {
                northIndicesWestToEast[i] = i;
                southIndicesEastToWest[i] = width * height - 1 - i;
            }

            for (i = 0; i < height; ++i) {
                eastIndicesNorthToSouth[i] = (i + 1) * width - 1;
                westIndicesSouthToNorth[i] = (height - i - 1) * width;
            }

            return {
                westIndicesSouthToNorth : westIndicesSouthToNorth,
                southIndicesEastToWest : southIndicesEastToWest,
                eastIndicesNorthToSouth : eastIndicesNorthToSouth,
                northIndicesWestToEast : northIndicesWestToEast
            };
        }

        function addRegularGridIndices(width, height, indices, offset) {
            var index = 0;
            for (var j = 0; j < height - 1; ++j) {
                for (var i = 0; i < width - 1; ++i) {
                    var upperLeft = index;
                    var lowerLeft = upperLeft + width;
                    var lowerRight = lowerLeft + 1;
                    var upperRight = upperLeft + 1;

                    indices[offset++] = upperLeft;
                    indices[offset++] = lowerLeft;
                    indices[offset++] = upperRight;
                    indices[offset++] = upperRight;
                    indices[offset++] = lowerLeft;
                    indices[offset++] = lowerRight;

                    ++index;
                }
                ++index;
            }
        }

        function addSkirtIndices(edgeIndices, vertexIndex, indices, offset) {
            var previousIndex = edgeIndices[0];

            var length = edgeIndices.length;
            for (var i = 1; i < length; ++i) {
                var index = edgeIndices[i];

                indices[offset++] = previousIndex;
                indices[offset++] = index;
                indices[offset++] = vertexIndex;

                indices[offset++] = vertexIndex;
                indices[offset++] = index;
                indices[offset++] = vertexIndex + 1;

                previousIndex = index;
                ++vertexIndex;
            }

            return offset;
        }

        /**
         * Specifies the quality of terrain created from heightmaps.  A value of 1.0 will
         * ensure that adjacent heightmap vertices are separated by no more than
         * {@link Globe.maximumScreenSpaceError} screen pixels and will probably go very slowly.
         * A value of 0.5 will cut the estimated level zero geometric error in half, allowing twice the
         * screen pixels between adjacent heightmap vertices and thus rendering more quickly.
         * @type {Number}
         */
        TerrainProvider.heightmapTerrainQuality = 0.25;

        /**
         * Determines an appropriate geometric error estimate when the geometry comes from a heightmap.
         *
         * @param {Ellipsoid} ellipsoid The ellipsoid to which the terrain is attached.
         * @param {Number} tileImageWidth The width, in pixels, of the heightmap associated with a single tile.
         * @param {Number} numberOfTilesAtLevelZero The number of tiles in the horizontal direction at tile level zero.
         * @returns {Number} An estimated geometric error.
         */
        TerrainProvider.getEstimatedLevelZeroGeometricErrorForAHeightmap = function(ellipsoid, tileImageWidth, numberOfTilesAtLevelZero) {
            return ellipsoid.maximumRadius * 2 * Math.PI * TerrainProvider.heightmapTerrainQuality / (tileImageWidth * numberOfTilesAtLevelZero);
        };

        /**
         * Requests the geometry for a given tile.  This function should not be called before
         * {@link TerrainProvider#ready} returns true.  The result must include terrain data and
         * may optionally include a water mask and an indication of which child tiles are available.
         * @function
         *
         * @param {Number} x The X coordinate of the tile for which to request geometry.
         * @param {Number} y The Y coordinate of the tile for which to request geometry.
         * @param {Number} level The level of the tile for which to request geometry.
         * @param {Request} [request] The request object. Intended for internal use only.
         *
         * @returns {Promise.<TerrainData>|undefined} A promise for the requested geometry.  If this method
         *          returns undefined instead of a promise, it is an indication that too many requests are already
         *          pending and the request will be retried later.
         */
        TerrainProvider.prototype.requestTileGeometry = Check.DeveloperError.throwInstantiationError;

        /**
         * Gets the maximum geometric error allowed in a tile at a given level.  This function should not be
         * called before {@link TerrainProvider#ready} returns true.
         * @function
         *
         * @param {Number} level The tile level for which to get the maximum geometric error.
         * @returns {Number} The maximum geometric error.
         */
        TerrainProvider.prototype.getLevelMaximumGeometricError = Check.DeveloperError.throwInstantiationError;

        /**
         * Determines whether data for a tile is available to be loaded.
         * @function
         *
         * @param {Number} x The X coordinate of the tile for which to request geometry.
         * @param {Number} y The Y coordinate of the tile for which to request geometry.
         * @param {Number} level The level of the tile for which to request geometry.
         * @returns {Boolean} Undefined if not supported by the terrain provider, otherwise true or false.
         */
        TerrainProvider.prototype.getTileDataAvailable = Check.DeveloperError.throwInstantiationError;

        /**
         * Makes sure we load availability data for a tile
         * @function
         *
         * @param {Number} x The X coordinate of the tile for which to request geometry.
         * @param {Number} y The Y coordinate of the tile for which to request geometry.
         * @param {Number} level The level of the tile for which to request geometry.
         * @returns {undefined|Promise<void>} Undefined if nothing need to be loaded or a Promise that resolves when all required tiles are loaded
         */
        TerrainProvider.prototype.loadTileDataAvailability = Check.DeveloperError.throwInstantiationError;

    exports.TerrainProvider = TerrainProvider;

});
//# sourceMappingURL=TerrainProvider-00be0263.js.map
