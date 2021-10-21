define(["./when-45f3d25d","./Check-34538dad","./Cartesian3-e69091b9","./Cartesian2-7a44370a","./BoundingSphere-bacc5cb6","./Matrix4-c65e6a1b","./RuntimeError-86da6af2","./Rectangle-c7d55cfa","./WebGLConstants-3660bc8f","./ComponentDatatype-86703c58","./GeometryAttribute-70b679fd","./PrimitiveType-30fa6f85","./Transforms-7d49a8ab","./EncodedCartesian3-7b803d4a","./IntersectionTests-8855da40","./Plane-1875afb4","./WebMercatorProjection-c32b7757","./arrayRemoveDuplicates-24a803e7","./ArcType-39be7a32","./EllipsoidRhumbLine-4bc7760a","./EllipsoidGeodesic-1d7258d7"],(function(e,a,t,r,i,n,s,o,l,u,c,C,d,p,h,g,f,m,w,v,y){"use strict";function T(a){a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT),this._ellipsoid=e.defaultValue(a.ellipsoid,r.Ellipsoid.WGS84),this._rectangle=e.defaultValue(a.rectangle,o.Rectangle.MAX_VALUE),this._projection=new i.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=e.defaultValue(a.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=e.defaultValue(a.numberOfLevelZeroTilesY,1)}Object.defineProperties(T.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}}}),T.prototype.getNumberOfXTilesAtLevel=function(e){return this._numberOfLevelZeroTilesX<<e},T.prototype.getNumberOfYTilesAtLevel=function(e){return this._numberOfLevelZeroTilesY<<e},T.prototype.rectangleToNativeRectangle=function(r,i){a.Check.defined("rectangle",r);var n=t.CesiumMath.toDegrees(r.west),s=t.CesiumMath.toDegrees(r.south),l=t.CesiumMath.toDegrees(r.east),u=t.CesiumMath.toDegrees(r.north);return e.defined(i)?(i.west=n,i.south=s,i.east=l,i.north=u,i):new o.Rectangle(n,s,l,u)},T.prototype.tileXYToNativeRectangle=function(e,a,r,i){var n=this.tileXYToRectangle(e,a,r,i);return n.west=t.CesiumMath.toDegrees(n.west),n.south=t.CesiumMath.toDegrees(n.south),n.east=t.CesiumMath.toDegrees(n.east),n.north=t.CesiumMath.toDegrees(n.north),n},T.prototype.tileXYToRectangle=function(a,t,r,i){var n=this._rectangle,s=this.getNumberOfXTilesAtLevel(r),l=this.getNumberOfYTilesAtLevel(r),u=n.width/s,c=a*u+n.west,C=(a+1)*u+n.west,d=n.height/l,p=n.north-t*d,h=n.north-(t+1)*d;return e.defined(i)||(i=new o.Rectangle(c,h,C,p)),i.west=c,i.south=h,i.east=C,i.north=p,i},T.prototype.positionToTileXY=function(a,i,n){var s=this._rectangle;if(o.Rectangle.contains(s,a)){var l=this.getNumberOfXTilesAtLevel(i),u=this.getNumberOfYTilesAtLevel(i),c=s.width/l,C=s.height/u,d=a.longitude;s.east<s.west&&(d+=t.CesiumMath.TWO_PI);var p=(d-s.west)/c|0;p>=l&&(p=l-1);var h=(s.north-a.latitude)/C|0;return h>=u&&(h=u-1),e.defined(n)?(n.x=p,n.y=h,n):new r.Cartesian2(p,h)}};var E=new t.Cartesian3,M=new t.Cartesian3,_=new r.Cartographic,O=new t.Cartesian3,b=new t.Cartesian3,A=new i.BoundingSphere,k=new T,P=[new r.Cartographic,new r.Cartographic,new r.Cartographic,new r.Cartographic],S=new r.Cartesian2,L={};function x(e){r.Cartographic.fromRadians(e.east,e.north,0,P[0]),r.Cartographic.fromRadians(e.west,e.north,0,P[1]),r.Cartographic.fromRadians(e.east,e.south,0,P[2]),r.Cartographic.fromRadians(e.west,e.south,0,P[3]);var a,t=0,i=0,n=0,s=0,o=L._terrainHeightsMaxLevel;for(a=0;a<=o;++a){for(var l=!1,u=0;u<4;++u){var c=P[u];if(k.positionToTileXY(c,a,S),0===u)n=S.x,s=S.y;else if(n!==S.x||s!==S.y){l=!0;break}}if(l)break;t=n,i=s}if(0!==a)return{x:t,y:i,level:a>o?o:a-1}}L.initialize=function(){var a=L._initPromise;return e.defined(a)||(a=d.Resource.fetchJson(d.buildModuleUrl("Assets/approximateTerrainHeights.json")).then((function(e){L._terrainHeights=e})),L._initPromise=a),a},L.getMinimumMaximumHeights=function(i,n){if(a.Check.defined("rectangle",i),!e.defined(L._terrainHeights))throw new a.DeveloperError("You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function");n=e.defaultValue(n,r.Ellipsoid.WGS84);var s=x(i),l=L._defaultMinTerrainHeight,u=L._defaultMaxTerrainHeight;if(e.defined(s)){var c=s.level+"-"+s.x+"-"+s.y,C=L._terrainHeights[c];e.defined(C)&&(l=C[0],u=C[1]),n.cartographicToCartesian(o.Rectangle.northeast(i,_),E),n.cartographicToCartesian(o.Rectangle.southwest(i,_),M),t.Cartesian3.midpoint(M,E,O);var d=n.scaleToGeodeticSurface(O,b);if(e.defined(d)){var p=t.Cartesian3.distance(O,d);l=Math.min(l,-p)}else l=L._defaultMinTerrainHeight}return l=Math.max(L._defaultMinTerrainHeight,l),{minimumTerrainHeight:l,maximumTerrainHeight:u}},L.getBoundingSphere=function(t,n){if(a.Check.defined("rectangle",t),!e.defined(L._terrainHeights))throw new a.DeveloperError("You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function");n=e.defaultValue(n,r.Ellipsoid.WGS84);var s=x(t),o=L._defaultMaxTerrainHeight;if(e.defined(s)){var l=s.level+"-"+s.x+"-"+s.y,u=L._terrainHeights[l];e.defined(u)&&(o=u[1])}var c=i.BoundingSphere.fromRectangle3D(t,n,0);return i.BoundingSphere.fromRectangle3D(t,n,o,A),i.BoundingSphere.union(c,A,c)},L._terrainHeightsMaxLevel=6,L._defaultMaxTerrainHeight=9e3,L._defaultMinTerrainHeight=-1e5,L._terrainHeights=void 0,L._initPromise=void 0,Object.defineProperties(L,{initialized:{get:function(){return e.defined(L._terrainHeights)}}});var I=[i.GeographicProjection,f.WebMercatorProjection],D=I.length,R=Math.cos(t.CesiumMath.toRadians(30)),N=Math.cos(t.CesiumMath.toRadians(150)),H=0,z=1e3;function B(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);var i=t.positions;if(!e.defined(i)||i.length<2)throw new a.DeveloperError("At least two positions are required.");if(e.defined(t.arcType)&&t.arcType!==w.ArcType.GEODESIC&&t.arcType!==w.ArcType.RHUMB)throw new a.DeveloperError("Valid options for arcType are ArcType.GEODESIC and ArcType.RHUMB.");this.width=e.defaultValue(t.width,1),this._positions=i,this.granularity=e.defaultValue(t.granularity,9999),this.loop=e.defaultValue(t.loop,!1),this.arcType=e.defaultValue(t.arcType,w.ArcType.GEODESIC),this._ellipsoid=r.Ellipsoid.WGS84,this._projectionIndex=0,this._workerName="createGroundPolylineGeometry",this._scene3DOnly=!1}Object.defineProperties(B.prototype,{packedLength:{get:function(){return 1+3*this._positions.length+1+1+1+r.Ellipsoid.packedLength+1+1}}}),B.setProjectionAndEllipsoid=function(e,a){for(var t=0,r=0;r<D;r++)if(a instanceof I[r]){t=r;break}e._projectionIndex=t,e._ellipsoid=a.ellipsoid};var G=new t.Cartesian3,j=new t.Cartesian3,V=new t.Cartesian3;function Y(e,a,r,i,n){var s=J(i,e,0,G),o=J(i,e,r,j),l=J(i,a,0,V),u=Q(o,s,j),c=Q(l,s,V);return t.Cartesian3.cross(c,u,n),t.Cartesian3.normalize(n,n)}var q=new r.Cartographic,F=new t.Cartesian3,X=new t.Cartesian3,U=new t.Cartesian3;function W(e,a,r,i,n,s,o,l,u,c,C){if(0!==n){var d;s===w.ArcType.GEODESIC?d=new y.EllipsoidGeodesic(e,a,o):s===w.ArcType.RHUMB&&(d=new v.EllipsoidRhumbLine(e,a,o));var p=d.surfaceDistance;if(!(p<n))for(var h=Y(e,a,i,o,U),g=Math.ceil(p/n),f=p/g,m=f,T=g-1,E=l.length,M=0;M<T;M++){var _=d.interpolateUsingSurfaceDistance(m,q),O=J(o,_,r,F),b=J(o,_,i,X);t.Cartesian3.pack(h,l,E),t.Cartesian3.pack(O,u,E),t.Cartesian3.pack(b,c,E),C.push(_.latitude),C.push(_.longitude),E+=3,m+=f}}}var Z=new r.Cartographic;function J(e,a,t,i){return r.Cartographic.clone(a,Z),Z.height=t,r.Cartographic.toCartesian(Z,e,i)}function Q(e,a,r){return t.Cartesian3.subtract(e,a,r),t.Cartesian3.normalize(r,r),r}function K(e,a,r,i){return i=Q(e,a,i),i=t.Cartesian3.cross(i,r,i),i=t.Cartesian3.normalize(i,i),i=t.Cartesian3.cross(r,i,i),i}B.pack=function(i,n,s){a.Check.typeOf.object("value",i),a.Check.defined("array",n);var o=e.defaultValue(s,0),l=i._positions,u=l.length;n[o++]=u;for(var c=0;c<u;++c){var C=l[c];t.Cartesian3.pack(C,n,o),o+=3}return n[o++]=i.granularity,n[o++]=i.loop?1:0,n[o++]=i.arcType,r.Ellipsoid.pack(i._ellipsoid,n,o),o+=r.Ellipsoid.packedLength,n[o++]=i._projectionIndex,n[o++]=i._scene3DOnly?1:0,n},B.unpack=function(i,n,s){a.Check.defined("array",i);for(var o=e.defaultValue(n,0),l=i[o++],u=new Array(l),c=0;c<l;c++)u[c]=t.Cartesian3.unpack(i,o),o+=3;var C=i[o++],d=1===i[o++],p=i[o++],h=r.Ellipsoid.unpack(i,o);o+=r.Ellipsoid.packedLength;var g=i[o++],f=1===i[o++];return e.defined(s)||(s=new B({positions:u})),s._positions=u,s.granularity=C,s.loop=d,s.arcType=p,s._ellipsoid=h,s._projectionIndex=g,s._scene3DOnly=f,s};var $=new t.Cartesian3,ee=new t.Cartesian3,ae=new t.Cartesian3,te=new t.Cartesian3,re=0,ie=-1;function ne(e,a,r,i,n){var s=Q(r,a,te),o=K(e,a,s,$),l=K(i,a,s,ee);if(t.CesiumMath.equalsEpsilon(t.Cartesian3.dot(o,l),ie,t.CesiumMath.EPSILON5))return n=t.Cartesian3.cross(s,o,n),n=t.Cartesian3.normalize(n,n),n;n=t.Cartesian3.add(l,o,n),n=t.Cartesian3.normalize(n,n);var u=t.Cartesian3.cross(s,n,ae);return t.Cartesian3.dot(l,u)<re&&(n=t.Cartesian3.negate(n,n)),n}var se=g.Plane.fromPointNormal(t.Cartesian3.ZERO,t.Cartesian3.UNIT_Y),oe=new t.Cartesian3,le=new t.Cartesian3,ue=new t.Cartesian3,ce=new t.Cartesian3,Ce=new t.Cartesian3,de=new t.Cartesian3,pe=new r.Cartographic,he=new r.Cartographic,ge=new r.Cartographic;B.createGeometry=function(a){var i,n,s,o,l,u,c=!a._scene3DOnly,C=a.loop,d=a._ellipsoid,p=a.granularity,g=a.arcType,f=new I[a._projectionIndex](d),y=H,T=z,E=a._positions,M=E.length;2===M&&(C=!1);var _,O,b,A=new v.EllipsoidRhumbLine(void 0,void 0,d),k=[E[0]];for(n=0;n<M-1;n++)s=E[n],o=E[n+1],_=h.IntersectionTests.lineSegmentPlane(s,o,se,de),!e.defined(_)||t.Cartesian3.equalsEpsilon(_,s,t.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(_,o,t.CesiumMath.EPSILON7)||(a.arcType===w.ArcType.GEODESIC?k.push(t.Cartesian3.clone(_)):a.arcType===w.ArcType.RHUMB&&(b=d.cartesianToCartographic(_,pe).longitude,l=d.cartesianToCartographic(s,pe),u=d.cartesianToCartographic(o,he),A.setEndPoints(l,u),O=A.findIntersectionWithLongitude(b,ge),_=d.cartographicToCartesian(O,de),!e.defined(_)||t.Cartesian3.equalsEpsilon(_,s,t.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(_,o,t.CesiumMath.EPSILON7)||k.push(t.Cartesian3.clone(_)))),k.push(o);C&&(s=E[M-1],o=E[0],_=h.IntersectionTests.lineSegmentPlane(s,o,se,de),!e.defined(_)||t.Cartesian3.equalsEpsilon(_,s,t.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(_,o,t.CesiumMath.EPSILON7)||(a.arcType===w.ArcType.GEODESIC?k.push(t.Cartesian3.clone(_)):a.arcType===w.ArcType.RHUMB&&(b=d.cartesianToCartographic(_,pe).longitude,l=d.cartesianToCartographic(s,pe),u=d.cartesianToCartographic(o,he),A.setEndPoints(l,u),O=A.findIntersectionWithLongitude(b,ge),_=d.cartographicToCartesian(O,de),!e.defined(_)||t.Cartesian3.equalsEpsilon(_,s,t.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(_,o,t.CesiumMath.EPSILON7)||k.push(t.Cartesian3.clone(_)))));var P=k.length,S=new Array(P);for(n=0;n<P;n++){var L=r.Cartographic.fromCartesian(k[n],d);L.height=0,S[n]=L}if(S=m.arrayRemoveDuplicates(S,r.Cartographic.equalsEpsilon),P=S.length,!(P<2)){var x=[],D=[],R=[],N=[],B=oe,G=le,j=ue,V=ce,q=Ce,F=S[0],X=S[1],U=S[P-1];for(B=J(d,U,y,B),V=J(d,X,y,V),G=J(d,F,y,G),j=J(d,F,T,j),q=C?ne(B,G,j,V,q):Y(F,X,T,d,q),t.Cartesian3.pack(q,D,0),t.Cartesian3.pack(G,R,0),t.Cartesian3.pack(j,N,0),x.push(F.latitude),x.push(F.longitude),W(F,X,y,T,p,g,d,D,R,N,x),n=1;n<P-1;++n){B=t.Cartesian3.clone(G,B),G=t.Cartesian3.clone(V,G);var Z=S[n];J(d,Z,T,j),J(d,S[n+1],y,V),ne(B,G,j,V,q),i=D.length,t.Cartesian3.pack(q,D,i),t.Cartesian3.pack(G,R,i),t.Cartesian3.pack(j,N,i),x.push(Z.latitude),x.push(Z.longitude),W(S[n],S[n+1],y,T,p,g,d,D,R,N,x)}var Q=S[P-1],K=S[P-2];if(G=J(d,Q,y,G),j=J(d,Q,T,j),C){var $=S[0];B=J(d,K,y,B),V=J(d,$,y,V),q=ne(B,G,j,V,q)}else q=Y(K,Q,T,d,q);if(i=D.length,t.Cartesian3.pack(q,D,i),t.Cartesian3.pack(G,R,i),t.Cartesian3.pack(j,N,i),x.push(Q.latitude),x.push(Q.longitude),C){for(W(Q,F,y,T,p,g,d,D,R,N,x),i=D.length,n=0;n<3;++n)D[i+n]=D[n],R[i+n]=R[n],N[i+n]=N[n];x.push(F.latitude),x.push(F.longitude)}return la(C,f,R,N,D,x,c)}};var fe=new t.Cartesian3,me=new n.Matrix3,we=new d.Quaternion;function ve(e,a,r,i){var s=Q(r,a,fe),o=t.Cartesian3.dot(s,e);if(o>R||o<N){var l=Q(i,r,te),u=o<N?t.CesiumMath.PI_OVER_TWO:-t.CesiumMath.PI_OVER_TWO,c=d.Quaternion.fromAxisAngle(l,u,we),C=n.Matrix3.fromQuaternion(c,me);return n.Matrix3.multiplyByVector(C,e,e),!0}return!1}var ye=new r.Cartographic,Te=new t.Cartesian3,Ee=new t.Cartesian3;function Me(e,a,i,n,s){var o=r.Cartographic.toCartesian(a,e._ellipsoid,Te),l=t.Cartesian3.add(o,i,Ee),u=!1,c=e._ellipsoid,C=c.cartesianToCartographic(l,ye);Math.abs(a.longitude-C.longitude)>t.CesiumMath.PI_OVER_TWO&&(u=!0,l=t.Cartesian3.subtract(o,i,Ee),C=c.cartesianToCartographic(l,ye)),C.height=0;var d=e.project(C,s);return s=t.Cartesian3.subtract(d,n,s),s.z=0,s=t.Cartesian3.normalize(s,s),u&&t.Cartesian3.negate(s,s),s}var _e=new t.Cartesian3,Oe=new t.Cartesian3;function be(e,a,r,i,n,s){var o=t.Cartesian3.subtract(a,e,_e);t.Cartesian3.normalize(o,o);var l=r-H,u=t.Cartesian3.multiplyByScalar(o,l,Oe);t.Cartesian3.add(e,u,n);var c=i-z;u=t.Cartesian3.multiplyByScalar(o,c,Oe),t.Cartesian3.add(a,u,s)}var Ae=new t.Cartesian3;function ke(e,a){var r=g.Plane.getPointDistance(se,e),i=g.Plane.getPointDistance(se,a),n=Ae;t.CesiumMath.equalsEpsilon(r,0,t.CesiumMath.EPSILON2)?(n=Q(a,e,n),t.Cartesian3.multiplyByScalar(n,t.CesiumMath.EPSILON2,n),t.Cartesian3.add(e,n,e)):t.CesiumMath.equalsEpsilon(i,0,t.CesiumMath.EPSILON2)&&(n=Q(e,a,n),t.Cartesian3.multiplyByScalar(n,t.CesiumMath.EPSILON2,n),t.Cartesian3.add(a,n,a))}function Pe(e,a){var r=Math.abs(e.longitude),i=Math.abs(a.longitude);if(t.CesiumMath.equalsEpsilon(r,t.CesiumMath.PI,t.CesiumMath.EPSILON11)){var n=t.CesiumMath.sign(a.longitude);return e.longitude=n*(r-t.CesiumMath.EPSILON11),1}if(t.CesiumMath.equalsEpsilon(i,t.CesiumMath.PI,t.CesiumMath.EPSILON11)){var s=t.CesiumMath.sign(e.longitude);return a.longitude=s*(i-t.CesiumMath.EPSILON11),2}return 0}var Se=new r.Cartographic,Le=new r.Cartographic,xe=new t.Cartesian3,Ie=new t.Cartesian3,De=new t.Cartesian3,Re=new t.Cartesian3,Ne=new t.Cartesian3,He=new t.Cartesian3,ze=[Se,Le],Be=new o.Rectangle,Ge=new t.Cartesian3,je=new t.Cartesian3,Ve=new t.Cartesian3,Ye=new t.Cartesian3,qe=new t.Cartesian3,Fe=new t.Cartesian3,Xe=new t.Cartesian3,Ue=new t.Cartesian3,We=new t.Cartesian3,Ze=new t.Cartesian3,Je=new t.Cartesian3,Qe=new t.Cartesian3,Ke=new t.Cartesian3,$e=new t.Cartesian3,ea=new p.EncodedCartesian3,aa=new p.EncodedCartesian3,ta=new t.Cartesian3,ra=new t.Cartesian3,ia=new t.Cartesian3,na=[new i.BoundingSphere,new i.BoundingSphere],sa=[0,2,1,0,3,2,0,7,3,0,4,7,0,5,4,0,1,5,5,7,4,5,6,7,5,2,6,5,1,2,3,6,2,3,7,6],oa=sa.length;function la(e,a,r,n,s,l,C){var d,h,g,f,m,w,v=a._ellipsoid,y=r.length/3-1,T=8*y,E=4*T,M=36*y,_=T>65535?new Uint32Array(M):new Uint16Array(M),O=new Float64Array(3*T),b=new Float32Array(E),A=new Float32Array(E),k=new Float32Array(E),P=new Float32Array(E),S=new Float32Array(E);C&&(g=new Float32Array(E),f=new Float32Array(E),m=new Float32Array(E),w=new Float32Array(2*T));var x=l.length/2,I=0,D=Se;D.height=0;var N=Le;N.height=0;var H=xe,z=Ie;if(C)for(h=0,d=1;d<x;d++)D.latitude=l[h],D.longitude=l[h+1],N.latitude=l[h+2],N.longitude=l[h+3],H=a.project(D,H),z=a.project(N,z),I+=t.Cartesian3.distance(H,z),h+=2;var B=n.length/3;z=t.Cartesian3.unpack(n,0,z);var G,j=0;for(h=3,d=1;d<B;d++)H=t.Cartesian3.clone(z,H),z=t.Cartesian3.unpack(n,h,z),j+=t.Cartesian3.distance(H,z),h+=3;h=3;var V=0,Y=0,q=0,F=0,X=!1,U=t.Cartesian3.unpack(r,0,Re),W=t.Cartesian3.unpack(n,0,Ie),Z=t.Cartesian3.unpack(s,0,He);if(e){var J=t.Cartesian3.unpack(r,r.length-6,De);ve(Z,J,U,W)&&(Z=t.Cartesian3.negate(Z,Z))}var K=0,$=0,ee=0;for(d=0;d<y;d++){var ae,te,re,ie,ne=t.Cartesian3.clone(U,De),se=t.Cartesian3.clone(W,xe),oe=t.Cartesian3.clone(Z,Ne);if(X&&(oe=t.Cartesian3.negate(oe,oe)),U=t.Cartesian3.unpack(r,h,Re),W=t.Cartesian3.unpack(n,h,Ie),Z=t.Cartesian3.unpack(s,h,He),X=ve(Z,ne,U,W),D.latitude=l[V],D.longitude=l[V+1],N.latitude=l[V+2],N.longitude=l[V+3],C){var le=Pe(D,N);ae=a.project(D,qe),te=a.project(N,Fe);var ue=Q(te,ae,ta);ue.y=Math.abs(ue.y),re=Xe,ie=Ue,0===le||t.Cartesian3.dot(ue,t.Cartesian3.UNIT_Y)>R?(re=Me(a,D,oe,ae,Xe),ie=Me(a,N,Z,te,Ue)):1===le?(ie=Me(a,N,Z,te,Ue),re.x=0,re.y=t.CesiumMath.sign(D.longitude-Math.abs(N.longitude)),re.z=0):(re=Me(a,D,oe,ae,Xe),ie.x=0,ie.y=t.CesiumMath.sign(D.longitude-N.longitude),ie.z=0)}var ce=t.Cartesian3.distance(se,W),Ce=p.EncodedCartesian3.fromCartesian(ne,ea),de=t.Cartesian3.subtract(U,ne,We),pe=t.Cartesian3.normalize(de,Qe),he=t.Cartesian3.subtract(se,ne,Ze);he=t.Cartesian3.normalize(he,he);var ge=t.Cartesian3.cross(pe,he,Qe);ge=t.Cartesian3.normalize(ge,ge);var fe=t.Cartesian3.cross(he,oe,Ke);fe=t.Cartesian3.normalize(fe,fe);var me=t.Cartesian3.subtract(W,U,Je);me=t.Cartesian3.normalize(me,me);var we=t.Cartesian3.cross(Z,me,$e);we=t.Cartesian3.normalize(we,we);var ye,Te,Ee,_e=ce/j,Oe=K/j,Ae=0,la=0,ca=0;if(C){Ae=t.Cartesian3.distance(ae,te),ye=p.EncodedCartesian3.fromCartesian(ae,aa),Te=t.Cartesian3.subtract(te,ae,ta),Ee=t.Cartesian3.normalize(Te,ra);var Ca=Ee.x;Ee.x=Ee.y,Ee.y=-Ca,la=Ae/I,ca=$/I}for(G=0;G<8;G++){var da=F+4*G,pa=Y+2*G,ha=da+3,ga=G<4?1:-1,fa=2===G||3===G||6===G||7===G?1:-1;t.Cartesian3.pack(Ce.high,b,da),b[ha]=de.x,t.Cartesian3.pack(Ce.low,A,da),A[ha]=de.y,t.Cartesian3.pack(fe,k,da),k[ha]=de.z,t.Cartesian3.pack(we,P,da),P[ha]=_e*ga,t.Cartesian3.pack(ge,S,da);var ma=Oe*fa;0===ma&&fa<0&&(ma=9),S[ha]=ma,C&&(g[da]=ye.high.x,g[da+1]=ye.high.y,g[da+2]=ye.low.x,g[da+3]=ye.low.y,m[da]=-re.y,m[da+1]=re.x,m[da+2]=ie.y,m[da+3]=-ie.x,f[da]=Te.x,f[da+1]=Te.y,f[da+2]=Ee.x,f[da+3]=Ee.y,w[pa]=la*ga,ma=ca*fa,0===ma&&fa<0&&(ma=9),w[pa+1]=ma)}var wa=Ve,va=Ye,ya=Ge,Ta=je,Ea=o.Rectangle.fromCartographicArray(ze,Be),Ma=L.getMinimumMaximumHeights(Ea,v),_a=Ma.minimumTerrainHeight,Oa=Ma.maximumTerrainHeight;ee+=_a,ee+=Oa,be(ne,se,_a,Oa,wa,ya),be(U,W,_a,Oa,va,Ta);var ba=t.Cartesian3.multiplyByScalar(ge,t.CesiumMath.EPSILON5,ia);t.Cartesian3.add(wa,ba,wa),t.Cartesian3.add(va,ba,va),t.Cartesian3.add(ya,ba,ya),t.Cartesian3.add(Ta,ba,Ta),ke(wa,va),ke(ya,Ta),t.Cartesian3.pack(wa,O,q),t.Cartesian3.pack(va,O,q+3),t.Cartesian3.pack(Ta,O,q+6),t.Cartesian3.pack(ya,O,q+9),ba=t.Cartesian3.multiplyByScalar(ge,-2*t.CesiumMath.EPSILON5,ia),t.Cartesian3.add(wa,ba,wa),t.Cartesian3.add(va,ba,va),t.Cartesian3.add(ya,ba,ya),t.Cartesian3.add(Ta,ba,Ta),ke(wa,va),ke(ya,Ta),t.Cartesian3.pack(wa,O,q+12),t.Cartesian3.pack(va,O,q+15),t.Cartesian3.pack(Ta,O,q+18),t.Cartesian3.pack(ya,O,q+21),V+=2,h+=3,Y+=16,q+=24,F+=32,K+=ce,$+=Ae}h=0;var Aa=0;for(d=0;d<y;d++){for(G=0;G<oa;G++)_[h+G]=sa[G]+Aa;Aa+=8,h+=oa}var ka=na;i.BoundingSphere.fromVertices(r,t.Cartesian3.ZERO,3,ka[0]),i.BoundingSphere.fromVertices(n,t.Cartesian3.ZERO,3,ka[1]);var Pa=i.BoundingSphere.fromBoundingSpheres(ka);Pa.radius+=ee/(2*y);var Sa={position:new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.DOUBLE,componentsPerAttribute:3,normalize:!1,values:O}),startHiAndForwardOffsetX:ua(b),startLoAndForwardOffsetY:ua(A),startNormalAndForwardOffsetZ:ua(k),endNormalAndTextureCoordinateNormalizationX:ua(P),rightNormalAndTextureCoordinateNormalizationY:ua(S)};return C&&(Sa.startHiLo2D=ua(g),Sa.offsetAndRight2D=ua(f),Sa.startEndNormals2D=ua(m),Sa.texcoordNormalization2D=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:2,normalize:!1,values:w})),new c.Geometry({attributes:Sa,indices:_,boundingSphere:Pa})}function ua(e){return new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:4,normalize:!1,values:e})}function ca(a,t){return L.initialize().then((function(){return e.defined(t)&&(a=B.unpack(a,t)),B.createGeometry(a)}))}return B._projectNormal=Me,ca}));