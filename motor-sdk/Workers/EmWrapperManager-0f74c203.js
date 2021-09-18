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

define(['exports', './when-45f3d25d', './materem-a89e2ea8'], function (exports, when, materem) { 'use strict';

    /**
     * mater em mgr
     */
    class EmWrapperManager {
        /**
         *
         * @param {string} wasmpath
         * @returns {Promise<Boolean>}
         */
        static initWebAssembly(wasmpath) {
            return initWebAssembly(wasmpath);
        }
    }

    function initWebAssembly(wasmpath) {
        let readyPromise = when.when.defer();
        if (!when.defined(exports.emMod)) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", wasmpath, true);
            xhr.responseType = "arraybuffer";
            xhr.send();

            xhr.onload = function () {
                var WebAssemblyType = {};
                WebAssemblyType["wasmBinary"] = xhr.response;
                WebAssemblyType["onModuleLoaded"] = function (inmod) {
                    exports.emMod = inmod;
                    readyPromise.resolve(true);
                };
                //全局模块
                materem.materem(WebAssemblyType);
            };
        } else {
            readyPromise.resolve(true);
        }
        return readyPromise.promise;
    }

    exports.EmWrapperManager = EmWrapperManager;

});
//# sourceMappingURL=EmWrapperManager-0f74c203.js.map
