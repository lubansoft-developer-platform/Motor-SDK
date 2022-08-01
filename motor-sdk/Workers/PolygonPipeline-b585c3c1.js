define(["exports","./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./Transforms-6b57162d","./Matrix4-ed224189","./WebGLConstants-3660bc8f","./ComponentDatatype-86703c58","./GeometryAttribute-b1ed7c2e","./PrimitiveType-30fa6f85","./EllipsoidRhumbLine-de5cdc57"],(function(e,t,n,r,a,i,u,s,x,o,h,l){"use strict";function p(e,t,n){n=n||2;var r,a,i,u,s,x,o,h=t&&t.length,l=h?t[0]*n:e.length,p=y(e,0,l,n,!0),f=[];if(!p||p.next===p.prev)return f;if(h&&(p=g(e,t,p,n)),e.length>80*n){r=i=e[0],a=u=e[1];for(var v=n;v<l;v+=n)s=e[v],x=e[v+1],s<r&&(r=s),x<a&&(a=x),s>i&&(i=s),x>u&&(u=x);o=Math.max(i-r,u-a),o=0!==o?1/o:0}return c(p,f,n,r,a,o),f}function y(e,t,n,r,a){var i,u;if(a===_(e,t,n,r)>0)for(i=t;i<n;i+=r)u=N(i,e[i],e[i+1],u);else for(i=n-r;i>=t;i-=r)u=N(i,e[i],e[i+1],u);return u&&R(u,u.next)&&(U(u),u=u.next),u}function f(e,t){if(!e)return e;t||(t=e);var n,r=e;do{if(n=!1,r.steiner||!R(r,r.next)&&0!==k(r.prev,r,r.next))r=r.next;else{if(U(r),r=t=r.prev,r===r.next)break;n=!0}}while(n||r!==t);return t}function c(e,t,n,r,a,i,u){if(e){!u&&i&&A(e,r,a,i);var s,x,o=e;while(e.prev!==e.next)if(s=e.prev,x=e.next,i?d(e,r,a,i):v(e))t.push(s.i/n),t.push(e.i/n),t.push(x.i/n),U(e),e=x.next,o=x.next;else if(e=x,e===o){u?1===u?(e=C(f(e),t,n),c(e,t,n,r,a,i,2)):2===u&&m(e,t,n,r,a,i):c(f(e),t,n,r,a,i,1);break}}}function v(e){var t=e.prev,n=e,r=e.next;if(k(t,n,r)>=0)return!1;var a=e.next.next;while(a!==e.prev){if(z(t.x,t.y,n.x,n.y,r.x,r.y,a.x,a.y)&&k(a.prev,a,a.next)>=0)return!1;a=a.next}return!0}function d(e,t,n,r){var a=e.prev,i=e,u=e.next;if(k(a,i,u)>=0)return!1;var s=a.x<i.x?a.x<u.x?a.x:u.x:i.x<u.x?i.x:u.x,x=a.y<i.y?a.y<u.y?a.y:u.y:i.y<u.y?i.y:u.y,o=a.x>i.x?a.x>u.x?a.x:u.x:i.x>u.x?i.x:u.x,h=a.y>i.y?a.y>u.y?a.y:u.y:i.y>u.y?i.y:u.y,l=O(s,x,t,n,r),p=O(o,h,t,n,r),y=e.prevZ,f=e.nextZ;while(y&&y.z>=l&&f&&f.z<=p){if(y!==e.prev&&y!==e.next&&z(a.x,a.y,i.x,i.y,u.x,u.y,y.x,y.y)&&k(y.prev,y,y.next)>=0)return!1;if(y=y.prevZ,f!==e.prev&&f!==e.next&&z(a.x,a.y,i.x,i.y,u.x,u.y,f.x,f.y)&&k(f.prev,f,f.next)>=0)return!1;f=f.nextZ}while(y&&y.z>=l){if(y!==e.prev&&y!==e.next&&z(a.x,a.y,i.x,i.y,u.x,u.y,y.x,y.y)&&k(y.prev,y,y.next)>=0)return!1;y=y.prevZ}while(f&&f.z<=p){if(f!==e.prev&&f!==e.next&&z(a.x,a.y,i.x,i.y,u.x,u.y,f.x,f.y)&&k(f.prev,f,f.next)>=0)return!1;f=f.nextZ}return!0}function C(e,t,n){var r=e;do{var a=r.prev,i=r.next.next;!R(a,i)&&L(a,r,r.next,i)&&W(a,i)&&W(i,a)&&(t.push(a.i/n),t.push(r.i/n),t.push(i.i/n),U(r),U(r.next),r=e=i),r=r.next}while(r!==e);return f(r)}function m(e,t,n,r,a,i){var u=e;do{var s=u.next.next;while(s!==u.prev){if(u.i!==s.i&&T(u,s)){var x=B(u,s);return u=f(u,u.next),x=f(x,x.next),c(u,t,n,r,a,i),void c(x,t,n,r,a,i)}s=s.next}u=u.next}while(u!==e)}function g(e,t,n,r){var a,i,u,s,x,o=[];for(a=0,i=t.length;a<i;a++)u=t[a]*r,s=a<i-1?t[a+1]*r:e.length,x=y(e,u,s,r,!1),x===x.next&&(x.steiner=!0),o.push(S(x));for(o.sort(w),a=0;a<o.length;a++)b(o[a],n),n=f(n,n.next);return n}function w(e,t){return e.x-t.x}function b(e,t){if(t=M(e,t),t){var n=B(t,e);f(n,n.next)}}function M(e,t){var n,r=t,a=e.x,i=e.y,u=-1/0;do{if(i<=r.y&&i>=r.next.y&&r.next.y!==r.y){var s=r.x+(i-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(s<=a&&s>u){if(u=s,s===a){if(i===r.y)return r;if(i===r.next.y)return r.next}n=r.x<r.next.x?r:r.next}}r=r.next}while(r!==t);if(!n)return null;if(a===u)return n;var x,o=n,h=n.x,l=n.y,p=1/0;r=n;do{a>=r.x&&r.x>=h&&a!==r.x&&z(i<l?a:u,i,h,l,i<l?u:a,i,r.x,r.y)&&(x=Math.abs(i-r.y)/(a-r.x),W(r,e)&&(x<p||x===p&&(r.x>n.x||r.x===n.x&&E(n,r)))&&(n=r,p=x)),r=r.next}while(r!==o);return n}function E(e,t){return k(e.prev,e,t.prev)<0&&k(t.next,e,e.next)<0}function A(e,t,n,r){var a=e;do{null===a.z&&(a.z=O(a.x,a.y,t,n,r)),a.prevZ=a.prev,a.nextZ=a.next,a=a.next}while(a!==e);a.prevZ.nextZ=null,a.prevZ=null,Z(a)}function Z(e){var t,n,r,a,i,u,s,x,o=1;do{n=e,e=null,i=null,u=0;while(n){for(u++,r=n,s=0,t=0;t<o;t++)if(s++,r=r.nextZ,!r)break;x=o;while(s>0||x>0&&r)0!==s&&(0===x||!r||n.z<=r.z)?(a=n,n=n.nextZ,s--):(a=r,r=r.nextZ,x--),i?i.nextZ=a:e=a,a.prevZ=i,i=a;n=r}i.nextZ=null,o*=2}while(u>1);return e}function O(e,t,n,r,a){return e=32767*(e-n)*a,t=32767*(t-r)*a,e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),t=16711935&(t|t<<8),t=252645135&(t|t<<4),t=858993459&(t|t<<2),t=1431655765&(t|t<<1),e|t<<1}function S(e){var t=e,n=e;do{(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next}while(t!==e);return n}function z(e,t,n,r,a,i,u,s){return(a-u)*(t-s)-(e-u)*(i-s)>=0&&(e-u)*(r-s)-(n-u)*(t-s)>=0&&(n-u)*(i-s)-(a-u)*(r-s)>=0}function T(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!G(e,t)&&(W(e,t)&&W(t,e)&&I(e,t)&&(k(e.prev,e,t.prev)||k(e,t.prev,t))||R(e,t)&&k(e.prev,e,e.next)>0&&k(t.prev,t,t.next)>0)}function k(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function R(e,t){return e.x===t.x&&e.y===t.y}function L(e,t,n,r){var a=P(k(e,t,n)),i=P(k(e,t,r)),u=P(k(n,r,e)),s=P(k(n,r,t));return a!==i&&u!==s||(!(0!==a||!D(e,n,t))||(!(0!==i||!D(e,r,t))||(!(0!==u||!D(n,e,r))||!(0!==s||!D(n,t,r)))))}function D(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function P(e){return e>0?1:e<0?-1:0}function G(e,t){var n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&L(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function W(e,t){return k(e.prev,e,e.next)<0?k(e,t,e.next)>=0&&k(e,e.prev,t)>=0:k(e,t,e.prev)<0||k(e,e.next,t)<0}function I(e,t){var n=e,r=!1,a=(e.x+t.x)/2,i=(e.y+t.y)/2;do{n.y>i!==n.next.y>i&&n.next.y!==n.y&&a<(n.next.x-n.x)*(i-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next}while(n!==e);return r}function B(e,t){var n=new q(e.i,e.x,e.y),r=new q(t.i,t.x,t.y),a=e.next,i=t.prev;return e.next=t,t.prev=e,n.next=a,a.prev=n,r.next=n,n.prev=r,i.next=r,r.prev=i,r}function N(e,t,n,r){var a=new q(e,t,n);return r?(a.next=r.next,a.prev=r,r.next.prev=a,r.next=a):(a.prev=a,a.next=a),a}function U(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function q(e,t,n){this.i=e,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function _(e,t,n,r){for(var a=0,i=t,u=n-r;i<n;i+=r)a+=(e[u]-e[i])*(e[i+1]+e[u+1]),u=i;return a}p.deviation=function(e,t,n,r){var a=t&&t.length,i=a?t[0]*n:e.length,u=Math.abs(_(e,0,i,n));if(a)for(var s=0,x=t.length;s<x;s++){var o=t[s]*n,h=s<x-1?t[s+1]*n:e.length;u-=Math.abs(_(e,o,h,n))}var l=0;for(s=0;s<r.length;s+=3){var p=r[s]*n,y=r[s+1]*n,f=r[s+2]*n;l+=Math.abs((e[p]-e[f])*(e[y+1]-e[p+1])-(e[p]-e[y])*(e[f+1]-e[p+1]))}return 0===u&&0===l?0:Math.abs((l-u)/u)},p.flatten=function(e){for(var t=e[0][0].length,n={vertices:[],holes:[],dimensions:t},r=0,a=0;a<e.length;a++){for(var i=0;i<e[a].length;i++)for(var u=0;u<t;u++)n.vertices.push(e[a][i][u]);a>0&&(r+=e[a-1].length,n.holes.push(r))}return n};var V={CLOCKWISE:s.WebGLConstants.CW,COUNTER_CLOCKWISE:s.WebGLConstants.CCW,validate:function(e){return e===V.CLOCKWISE||e===V.COUNTER_CLOCKWISE}},K=Object.freeze(V),j=new r.Cartesian3,F=new r.Cartesian3,Q={computeArea2D:function(e){n.Check.defined("positions",e),n.Check.typeOf.number.greaterThanOrEquals("positions.length",e.length,3);for(var t=e.length,r=0,a=t-1,i=0;i<t;a=i++){var u=e[a],s=e[i];r+=u.x*s.y-s.x*u.y}return.5*r},computeWindingOrder2D:function(e){var t=Q.computeArea2D(e);return t>0?K.COUNTER_CLOCKWISE:K.CLOCKWISE},triangulate:function(e,t){n.Check.defined("positions",e);var r=a.Cartesian2.packArray(e);return p(r,t,2)}},H=new r.Cartesian3,J=new r.Cartesian3,X=new r.Cartesian3,Y=new r.Cartesian3,$=new r.Cartesian3,ee=new r.Cartesian3,te=new r.Cartesian3;Q.computeSubdivision=function(e,a,i,u){u=t.defaultValue(u,r.CesiumMath.RADIANS_PER_DEGREE),n.Check.typeOf.object("ellipsoid",e),n.Check.defined("positions",a),n.Check.defined("indices",i),n.Check.typeOf.number.greaterThanOrEquals("indices.length",i.length,3),n.Check.typeOf.number.equals("indices.length % 3","0",i.length%3,0),n.Check.typeOf.number.greaterThan("granularity",u,0);var s,l=i.slice(0),p=a.length,y=new Array(3*p),f=0;for(s=0;s<p;s++){var c=a[s];y[f++]=c.x,y[f++]=c.y,y[f++]=c.z}var v=[],d={},C=e.maximumRadius,m=r.CesiumMath.chordLength(u,C),g=m*m;while(l.length>0){var w,b,M=l.pop(),E=l.pop(),A=l.pop(),Z=r.Cartesian3.fromArray(y,3*A,H),O=r.Cartesian3.fromArray(y,3*E,J),S=r.Cartesian3.fromArray(y,3*M,X),z=r.Cartesian3.multiplyByScalar(r.Cartesian3.normalize(Z,Y),C,Y),T=r.Cartesian3.multiplyByScalar(r.Cartesian3.normalize(O,$),C,$),k=r.Cartesian3.multiplyByScalar(r.Cartesian3.normalize(S,ee),C,ee),R=r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(z,T,te)),L=r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(T,k,te)),D=r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(k,z,te)),P=Math.max(R,L,D);P>g?R===P?(w=Math.min(A,E)+" "+Math.max(A,E),s=d[w],t.defined(s)||(b=r.Cartesian3.add(Z,O,te),r.Cartesian3.multiplyByScalar(b,.5,b),y.push(b.x,b.y,b.z),s=y.length/3-1,d[w]=s),l.push(A,s,M),l.push(s,E,M)):L===P?(w=Math.min(E,M)+" "+Math.max(E,M),s=d[w],t.defined(s)||(b=r.Cartesian3.add(O,S,te),r.Cartesian3.multiplyByScalar(b,.5,b),y.push(b.x,b.y,b.z),s=y.length/3-1,d[w]=s),l.push(E,s,A),l.push(s,M,A)):D===P&&(w=Math.min(M,A)+" "+Math.max(M,A),s=d[w],t.defined(s)||(b=r.Cartesian3.add(S,Z,te),r.Cartesian3.multiplyByScalar(b,.5,b),y.push(b.x,b.y,b.z),s=y.length/3-1,d[w]=s),l.push(M,s,E),l.push(s,A,E)):(v.push(A),v.push(E),v.push(M))}return new o.Geometry({attributes:{position:new o.GeometryAttribute({componentDatatype:x.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:y})},indices:v,primitiveType:h.PrimitiveType.TRIANGLES})};var ne=new a.Cartographic,re=new a.Cartographic,ae=new a.Cartographic,ie=new a.Cartographic;Q.computeRhumbLineSubdivision=function(e,a,i,u){u=t.defaultValue(u,r.CesiumMath.RADIANS_PER_DEGREE),n.Check.typeOf.object("ellipsoid",e),n.Check.defined("positions",a),n.Check.defined("indices",i),n.Check.typeOf.number.greaterThanOrEquals("indices.length",i.length,3),n.Check.typeOf.number.equals("indices.length % 3","0",i.length%3,0),n.Check.typeOf.number.greaterThan("granularity",u,0);var s,p=i.slice(0),y=a.length,f=new Array(3*y),c=0;for(s=0;s<y;s++){var v=a[s];f[c++]=v.x,f[c++]=v.y,f[c++]=v.z}var d=[],C={},m=e.maximumRadius,g=r.CesiumMath.chordLength(u,m),w=new l.EllipsoidRhumbLine(void 0,void 0,e),b=new l.EllipsoidRhumbLine(void 0,void 0,e),M=new l.EllipsoidRhumbLine(void 0,void 0,e);while(p.length>0){var E=p.pop(),A=p.pop(),Z=p.pop(),O=r.Cartesian3.fromArray(f,3*Z,H),S=r.Cartesian3.fromArray(f,3*A,J),z=r.Cartesian3.fromArray(f,3*E,X),T=e.cartesianToCartographic(O,ne),k=e.cartesianToCartographic(S,re),R=e.cartesianToCartographic(z,ae);w.setEndPoints(T,k);var L=w.surfaceDistance;b.setEndPoints(k,R);var D=b.surfaceDistance;M.setEndPoints(R,T);var P,G,W,I,B=M.surfaceDistance,N=Math.max(L,D,B);N>g?L===N?(P=Math.min(Z,A)+" "+Math.max(Z,A),s=C[P],t.defined(s)||(G=w.interpolateUsingFraction(.5,ie),W=.5*(T.height+k.height),I=r.Cartesian3.fromRadians(G.longitude,G.latitude,W,e,te),f.push(I.x,I.y,I.z),s=f.length/3-1,C[P]=s),p.push(Z,s,E),p.push(s,A,E)):D===N?(P=Math.min(A,E)+" "+Math.max(A,E),s=C[P],t.defined(s)||(G=b.interpolateUsingFraction(.5,ie),W=.5*(k.height+R.height),I=r.Cartesian3.fromRadians(G.longitude,G.latitude,W,e,te),f.push(I.x,I.y,I.z),s=f.length/3-1,C[P]=s),p.push(A,s,Z),p.push(s,E,Z)):B===N&&(P=Math.min(E,Z)+" "+Math.max(E,Z),s=C[P],t.defined(s)||(G=M.interpolateUsingFraction(.5,ie),W=.5*(R.height+T.height),I=r.Cartesian3.fromRadians(G.longitude,G.latitude,W,e,te),f.push(I.x,I.y,I.z),s=f.length/3-1,C[P]=s),p.push(E,s,A),p.push(s,Z,A)):(d.push(Z),d.push(A),d.push(E))}return new o.Geometry({attributes:{position:new o.GeometryAttribute({componentDatatype:x.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f})},indices:d,primitiveType:h.PrimitiveType.TRIANGLES})},Q.scaleToGeodeticHeight=function(e,n,i,u,s){i=t.defaultValue(i,a.Ellipsoid.WGS84);var x=j,o=F;if(n=t.defaultValue(n,0),u=t.defaultValue(u,!0),t.defined(e))for(var h=e.length,l=0;l<h;l+=3)r.Cartesian3.fromArray(e,l,o),u&&!s&&(o=i.scaleToGeodeticSurface(o,o)),0!==n&&(s?r.Cartesian3.clone(r.Cartesian3.UNIT_Z,x):x=i.geodeticSurfaceNormal(o,x),r.Cartesian3.multiplyByScalar(x,n,x),r.Cartesian3.add(o,x,o)),e[l]=o.x,e[l+1]=o.y,e[l+2]=o.z;return e},Q.computeAreaWidthProjectPlane=function(e){if(e.length<3)throw new Error("\u81f3\u5c11\u4f20\u5165\u4e09\u4e2a\u70b9");let t=u.Matrix4.fromPositions(e),n=new r.Cartesian3,i=e.map((e=>(u.Matrix4.multiplyByPointAsVector(t,e,n),new a.Cartesian2(n.x,n.y)))),s=p(a.Cartesian2.packArray(i,[])),x=0,o=new a.Cartesian2,h=new a.Cartesian2;for(let r=0;r<s.length;r+=3){let e=i[s[r]],t=i[s[r+1]],n=i[s[r+2]];a.Cartesian2.subtract(e,t,o),a.Cartesian2.subtract(e,n,h);let u=a.Cartesian2.magnitude(o);a.Cartesian2.normalize(o,o),a.Cartesian2.fromElements(-o.y,o.x,o);let l=a.Cartesian2.dot(o,h);x+=.5*Math.abs(l*u)}return x},Q.computeAreaFromEachTriangle=function(e){if(e.length<3)throw new Error("\u81f3\u5c11\u4f20\u5165\u4e09\u4e2a\u70b9");let t=e.map((e=>new a.Cartesian2(e.x,e.y))),n=p(a.Cartesian2.packArray(t,[])),s=0,x=new r.Cartesian3,o=new r.Cartesian3,h=new r.Cartesian3,l=new i.Quaternion,y=new u.Matrix3;for(let a=0;a<n.length;a+=3){let t=e[n[a]],p=e[n[a+1]],f=e[n[a+2]];r.Cartesian3.subtract(t,p,x),r.Cartesian3.subtract(t,f,o),r.Cartesian3.cross(x,o,h);let c=r.Cartesian3.magnitude(x);i.Quaternion.fromAxisAngle(h,Math.PI/2,l),u.Matrix3.fromQuaternion(l,y),u.Matrix3.multiplyByVector(y,x,x),r.Cartesian3.normalize(x,x);let v=r.Cartesian3.dot(x,o);s+=.5*Math.abs(v*c)}return s},e.PolygonPipeline=Q,e.WindingOrder=K,e.earcut=p}));