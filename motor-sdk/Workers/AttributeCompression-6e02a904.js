define(["exports","./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1"],(function(e,t,n,o,r){"use strict";var a=1/256,c=256,d={octEncodeInRange:function(e,t,r){n.Check.defined("vector",e),n.Check.defined("result",r);var a=o.Cartesian3.magnitudeSquared(e);if(Math.abs(a-1)>o.CesiumMath.EPSILON6)throw new n.DeveloperError("vector must be normalized.");if(r.x=e.x/(Math.abs(e.x)+Math.abs(e.y)+Math.abs(e.z)),r.y=e.y/(Math.abs(e.x)+Math.abs(e.y)+Math.abs(e.z)),e.z<0){var c=r.x,d=r.y;r.x=(1-Math.abs(d))*o.CesiumMath.signNotZero(c),r.y=(1-Math.abs(c))*o.CesiumMath.signNotZero(d)}return r.x=o.CesiumMath.toSNorm(r.x,t),r.y=o.CesiumMath.toSNorm(r.y,t),r},octEncode:function(e,t){return d.octEncodeInRange(e,255,t)}},i=new r.Cartesian2,u=new Uint8Array(1);function f(e){return u[0]=e,u[0]}d.octEncodeToCartesian4=function(e,t){return d.octEncodeInRange(e,65535,i),t.x=f(i.x*a),t.y=f(i.x),t.z=f(i.y*a),t.w=f(i.y),t},d.octDecodeInRange=function(e,t,r,a){if(n.Check.defined("result",a),e<0||e>r||t<0||t>r)throw new n.DeveloperError("x and y must be unsigned normalized integers between 0 and "+r);if(a.x=o.CesiumMath.fromSNorm(e,r),a.y=o.CesiumMath.fromSNorm(t,r),a.z=1-(Math.abs(a.x)+Math.abs(a.y)),a.z<0){var c=a.x;a.x=(1-Math.abs(a.y))*o.CesiumMath.signNotZero(c),a.y=(1-Math.abs(c))*o.CesiumMath.signNotZero(a.y)}return o.Cartesian3.normalize(a,a)},d.octDecode=function(e,t,n){return d.octDecodeInRange(e,t,255,n)},d.octDecodeFromCartesian4=function(e,t){n.Check.typeOf.object("encoded",e),n.Check.typeOf.object("result",t);var o=e.x,r=e.y,a=e.z,i=e.w;if(o<0||o>255||r<0||r>255||a<0||a>255||i<0||i>255)throw new n.DeveloperError("x, y, z, and w must be unsigned normalized integers between 0 and 255");var u=o*c+r,f=a*c+i;return d.octDecodeInRange(u,f,65535,t)},d.octPackFloat=function(e){return n.Check.defined("encoded",e),256*e.x+e.y};var h=new r.Cartesian2;function s(e){return e>>1^-(1&e)}d.octEncodeFloat=function(e){return d.octEncode(e,h),d.octPackFloat(h)},d.octDecodeFloat=function(e,t){n.Check.defined("value",e);var o=e/256,r=Math.floor(o),a=256*(o-r);return d.octDecode(r,a,t)},d.octPack=function(e,t,o,r){n.Check.defined("v1",e),n.Check.defined("v2",t),n.Check.defined("v3",o),n.Check.defined("result",r);var a=d.octEncodeFloat(e),c=d.octEncodeFloat(t),i=d.octEncode(o,h);return r.x=65536*i.x+a,r.y=65536*i.y+c,r},d.octUnpack=function(e,t,o,r){n.Check.defined("packed",e),n.Check.defined("v1",t),n.Check.defined("v2",o),n.Check.defined("v3",r);var a=e.x/65536,c=Math.floor(a),i=65536*(a-c);a=e.y/65536;var u=Math.floor(a),f=65536*(a-u);d.octDecodeFloat(i,t),d.octDecodeFloat(f,o),d.octDecode(c,u,r)},d.compressTextureCoordinates=function(e){n.Check.defined("textureCoordinates",e);var t=4095*e.x|0,o=4095*e.y|0;return 4096*t+o},d.decompressTextureCoordinates=function(e,t){n.Check.defined("compressed",e),n.Check.defined("result",t);var o=e/4096,r=Math.floor(o);return t.x=r/4095,t.y=(e-4096*r)/4095,t},d.zigZagDeltaDecode=function(e,o,r){n.Check.defined("uBuffer",e),n.Check.defined("vBuffer",o),n.Check.typeOf.number.equals("uBuffer.length","vBuffer.length",e.length,o.length),t.defined(r)&&n.Check.typeOf.number.equals("uBuffer.length","heightBuffer.length",e.length,r.length);for(var a=e.length,c=0,d=0,i=0,u=0;u<a;++u)c+=s(e[u]),d+=s(o[u]),e[u]=c,o[u]=d,t.defined(r)&&(i+=s(r[u]),r[u]=i)},e.AttributeCompression=d}));