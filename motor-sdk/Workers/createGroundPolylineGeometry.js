define(["./when-52cea266","./Check-ee5dd8a8","./Cartesian2-7c55a82d","./Rectangle-88e14f21","./BoundingSphere-f5553fb7","./Transforms-d0762529","./Matrix4-da50dd55","./RuntimeError-02840484","./WebGLConstants-52779751","./ComponentDatatype-fc6a16e1","./GeometryAttribute-60495dd3","./PrimitiveType-875d1f73","./EncodedCartesian3-237542cd","./IntersectionTests-ca78fc8a","./Plane-fdd70b9e","./WebMercatorProjection-3616e27a","./arrayRemoveDuplicates-64b1d558","./ArcType-97079e95","./EllipsoidRhumbLine-90d09904","./EllipsoidGeodesic-69201d63"],(function(e,a,t,n,r,i,s,o,l,u,c,p,C,d,h,g,f,m,w,y){"use strict";function v(a){a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT),this._ellipsoid=e.defaultValue(a.ellipsoid,n.Ellipsoid.WGS84),this._rectangle=e.defaultValue(a.rectangle,n.Rectangle.MAX_VALUE),this._projection=new r.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=e.defaultValue(a.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=e.defaultValue(a.numberOfLevelZeroTilesY,1)}Object.defineProperties(v.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}}}),v.prototype.getNumberOfXTilesAtLevel=function(e){return this._numberOfLevelZeroTilesX<<e},v.prototype.getNumberOfYTilesAtLevel=function(e){return this._numberOfLevelZeroTilesY<<e},v.prototype.rectangleToNativeRectangle=function(r,i){a.Check.defined("rectangle",r);var s=t.CesiumMath.toDegrees(r.west),o=t.CesiumMath.toDegrees(r.south),l=t.CesiumMath.toDegrees(r.east),u=t.CesiumMath.toDegrees(r.north);return e.defined(i)?(i.west=s,i.south=o,i.east=l,i.north=u,i):new n.Rectangle(s,o,l,u)},v.prototype.tileXYToNativeRectangle=function(e,a,n,r){var i=this.tileXYToRectangle(e,a,n,r);return i.west=t.CesiumMath.toDegrees(i.west),i.south=t.CesiumMath.toDegrees(i.south),i.east=t.CesiumMath.toDegrees(i.east),i.north=t.CesiumMath.toDegrees(i.north),i},v.prototype.tileXYToRectangle=function(a,t,r,i){var s=this._rectangle,o=this.getNumberOfXTilesAtLevel(r),l=this.getNumberOfYTilesAtLevel(r),u=s.width/o,c=a*u+s.west,p=(a+1)*u+s.west,C=s.height/l,d=s.north-t*C,h=s.north-(t+1)*C;return e.defined(i)||(i=new n.Rectangle(c,h,p,d)),i.west=c,i.south=h,i.east=p,i.north=d,i},v.prototype.positionToTileXY=function(a,r,i){var s=this._rectangle;if(n.Rectangle.contains(s,a)){var o=this.getNumberOfXTilesAtLevel(r),l=this.getNumberOfYTilesAtLevel(r),u=s.width/o,c=s.height/l,p=a.longitude;s.east<s.west&&(p+=t.CesiumMath.TWO_PI);var C=(p-s.west)/u|0;C>=o&&(C=o-1);var d=(s.north-a.latitude)/c|0;return d>=l&&(d=l-1),e.defined(i)?(i.x=C,i.y=d,i):new t.Cartesian2(C,d)}};var T=new t.Cartesian3,E=new t.Cartesian3,M=new n.Cartographic,A=new t.Cartesian3,_=new t.Cartesian3,O=new r.BoundingSphere,k=new v,P=[new n.Cartographic,new n.Cartographic,new n.Cartographic,new n.Cartographic],b=new t.Cartesian2,D={};function L(e){n.Cartographic.fromRadians(e.east,e.north,0,P[0]),n.Cartographic.fromRadians(e.west,e.north,0,P[1]),n.Cartographic.fromRadians(e.east,e.south,0,P[2]),n.Cartographic.fromRadians(e.west,e.south,0,P[3]);var a,t=0,r=0,i=0,s=0,o=D._terrainHeightsMaxLevel;for(a=0;a<=o;++a){for(var l=!1,u=0;u<4;++u){var c=P[u];if(k.positionToTileXY(c,a,b),0===u)i=b.x,s=b.y;else if(i!==b.x||s!==b.y){l=!0;break}}if(l)break;t=i,r=s}if(0!==a)return{x:t,y:r,level:a>o?o:a-1}}D.initialize=function(){var a=D._initPromise;return e.defined(a)||(a=i.Resource.fetchJson(i.buildModuleUrl("Assets/approximateTerrainHeights.json")).then((function(e){D._terrainHeights=e})),D._initPromise=a),a},D.getMinimumMaximumHeights=function(r,i){if(a.Check.defined("rectangle",r),!e.defined(D._terrainHeights))throw new a.DeveloperError("You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function");i=e.defaultValue(i,n.Ellipsoid.WGS84);var s=L(r),o=D._defaultMinTerrainHeight,l=D._defaultMaxTerrainHeight;if(e.defined(s)){var u=s.level+"-"+s.x+"-"+s.y,c=D._terrainHeights[u];e.defined(c)&&(o=c[0],l=c[1]),i.cartographicToCartesian(n.Rectangle.northeast(r,M),T),i.cartographicToCartesian(n.Rectangle.southwest(r,M),E),t.Cartesian3.midpoint(E,T,A);var p=i.scaleToGeodeticSurface(A,_);if(e.defined(p)){var C=t.Cartesian3.distance(A,p);o=Math.min(o,-C)}else o=D._defaultMinTerrainHeight}return o=Math.max(D._defaultMinTerrainHeight,o),{minimumTerrainHeight:o,maximumTerrainHeight:l}},D.getBoundingSphere=function(t,i){if(a.Check.defined("rectangle",t),!e.defined(D._terrainHeights))throw new a.DeveloperError("You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function");i=e.defaultValue(i,n.Ellipsoid.WGS84);var s=L(t),o=D._defaultMaxTerrainHeight;if(e.defined(s)){var l=s.level+"-"+s.x+"-"+s.y,u=D._terrainHeights[l];e.defined(u)&&(o=u[1])}var c=r.BoundingSphere.fromRectangle3D(t,i,0);return r.BoundingSphere.fromRectangle3D(t,i,o,O),r.BoundingSphere.union(c,O,c)},D._terrainHeightsMaxLevel=6,D._defaultMaxTerrainHeight=9e3,D._defaultMinTerrainHeight=-1e5,D._terrainHeights=void 0,D._initPromise=void 0,Object.defineProperties(D,{initialized:{get:function(){return e.defined(D._terrainHeights)}}});var S=[r.GeographicProjection,g.WebMercatorProjection],I=S.length,R=Math.cos(t.CesiumMath.toRadians(30)),x=Math.cos(t.CesiumMath.toRadians(150)),N=0,G=1e3;function H(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);var r=t.positions;if(!e.defined(r)||r.length<2)throw new a.DeveloperError("At least two positions are required.");if(e.defined(t.arcType)&&t.arcType!==m.ArcType.GEODESIC&&t.arcType!==m.ArcType.RHUMB)throw new a.DeveloperError("Valid options for arcType are ArcType.GEODESIC and ArcType.RHUMB.");this.width=e.defaultValue(t.width,1),this._positions=r,this.granularity=e.defaultValue(t.granularity,9999),this.loop=e.defaultValue(t.loop,!1),this.arcType=e.defaultValue(t.arcType,m.ArcType.GEODESIC),this._ellipsoid=n.Ellipsoid.WGS84,this._projectionIndex=0,this._planeMode=e.defaultValue(t.isPlaneMode,!1),this._workerName="createGroundPolylineGeometry",this._scene3DOnly=!1}Object.defineProperties(H.prototype,{packedLength:{get:function(){return 1+3*this._positions.length+1+1+1+n.Ellipsoid.packedLength+1+1}}}),H.setProjectionAndEllipsoid=function(e,a){for(var t=0,n=0;n<I;n++)if(a instanceof S[n]){t=n;break}e._projectionIndex=t,e._ellipsoid=a.ellipsoid};var z=new t.Cartesian3,B=new t.Cartesian3,V=new t.Cartesian3;function j(e,a,n,r,i){var s=Z(r,e,0,z),o=Z(r,e,n,B),l=Z(r,a,0,V),u=J(o,s,B),c=J(l,s,V);return t.Cartesian3.cross(c,u,i),t.Cartesian3.normalize(i,i)}var F=new n.Cartographic,Y=new t.Cartesian3,U=new t.Cartesian3,q=new t.Cartesian3;function W(e,a,n,r,i,s,o,l,u,c,p){if(0!==i){var C;s===m.ArcType.GEODESIC?C=new y.EllipsoidGeodesic(e,a,o):s===m.ArcType.RHUMB&&(C=new w.EllipsoidRhumbLine(e,a,o));var d=C.surfaceDistance;if(!(d<i))for(var h=j(e,a,r,o,q),g=Math.ceil(d/i),f=d/g,v=f,T=g-1,E=l.length,M=0;M<T;M++){var A=C.interpolateUsingSurfaceDistance(v,F),_=Z(o,A,n,Y),O=Z(o,A,r,U);t.Cartesian3.pack(h,l,E),t.Cartesian3.pack(_,u,E),t.Cartesian3.pack(O,c,E),p.push(A.latitude),p.push(A.longitude),E+=3,v+=f}}}var X=new n.Cartographic;function Z(e,a,t,r){return n.Cartographic.clone(a,X),X.height=t,n.Cartographic.toCartesian(X,e,r)}function J(e,a,n){return t.Cartesian3.subtract(e,a,n),t.Cartesian3.normalize(n,n),n}function Q(e,a,n,r){return r=J(e,a,r),r=t.Cartesian3.cross(r,n,r),r=t.Cartesian3.normalize(r,r),r=t.Cartesian3.cross(n,r,r),r}H.pack=function(r,i,s){a.Check.typeOf.object("value",r),a.Check.defined("array",i);var o=e.defaultValue(s,0),l=r._positions,u=l.length;i[o++]=u;for(var c=0;c<u;++c){var p=l[c];t.Cartesian3.pack(p,i,o),o+=3}return i[o++]=r.granularity,i[o++]=r.loop?1:0,i[o++]=r.arcType,n.Ellipsoid.pack(r._ellipsoid,i,o),r._isPlaneMode?(i[o++]=0,i[o++]=0,i[o++]=0):o+=n.Ellipsoid.packedLength,i[o++]=r._projectionIndex,i[o++]=r._scene3DOnly?1:0,i},H.unpack=function(r,i,s){a.Check.defined("array",r);for(var o=e.defaultValue(i,0),l=r[o++],u=new Array(l),c=0;c<l;c++)u[c]=t.Cartesian3.unpack(r,o),o+=3;var p=r[o++],C=1===r[o++],d=r[o++],h=n.Ellipsoid.unpack(r,o);o+=n.Ellipsoid.packedLength;var g=r[o++],f=1===r[o++];return e.defined(s)||(s=new H({positions:u})),t.Cartesian3.equals(h._radii,t.Cartesian3.ZERO)&&(s._planeMode=!0),s._positions=u,s.granularity=p,s.loop=C,s.arcType=d,s._ellipsoid=h,s._projectionIndex=g,s._scene3DOnly=f,s};var K=new t.Cartesian3,$=new t.Cartesian3,ee=new t.Cartesian3,ae=new t.Cartesian3,te=0,ne=-1;function re(e,a,n,r,i){var s=J(n,a,ae),o=Q(e,a,s,K),l=Q(r,a,s,$);if(t.CesiumMath.equalsEpsilon(t.Cartesian3.dot(o,l),ne,t.CesiumMath.EPSILON5))return i=t.Cartesian3.cross(s,o,i),i=t.Cartesian3.normalize(i,i),i;i=t.Cartesian3.add(l,o,i),i=t.Cartesian3.normalize(i,i);var u=t.Cartesian3.cross(s,i,ee);return t.Cartesian3.dot(l,u)<te&&(i=t.Cartesian3.negate(i,i)),i}var ie=h.Plane.fromPointNormal(t.Cartesian3.ZERO,t.Cartesian3.UNIT_Y),se=new t.Cartesian3,oe=new t.Cartesian3,le=new t.Cartesian3,ue=new t.Cartesian3,ce=new t.Cartesian3,pe=new t.Cartesian3,Ce=new n.Cartographic,de=new n.Cartographic,he=new n.Cartographic;H.createGeometry=function(a){if(a._isPlaneMode)return H.createPlaneModeGeometry(a);var r,i,s,o,l,u,c=!a._scene3DOnly,p=a.loop,C=a._ellipsoid,h=a.granularity,g=a.arcType,y=new S[a._projectionIndex](C),v=N,T=G,E=a._positions,M=E.length;2===M&&(p=!1);var A,_,O,k=new w.EllipsoidRhumbLine(void 0,void 0,C),P=[E[0]];for(i=0;i<M-1;i++)s=E[i],o=E[i+1],A=d.IntersectionTests.lineSegmentPlane(s,o,ie,pe),!e.defined(A)||t.Cartesian3.equalsEpsilon(A,s,t.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(A,o,t.CesiumMath.EPSILON7)||(a.arcType===m.ArcType.GEODESIC?P.push(t.Cartesian3.clone(A)):a.arcType===m.ArcType.RHUMB&&(O=C.cartesianToCartographic(A,Ce).longitude,l=C.cartesianToCartographic(s,Ce),u=C.cartesianToCartographic(o,de),k.setEndPoints(l,u),_=k.findIntersectionWithLongitude(O,he),A=C.cartographicToCartesian(_,pe),!e.defined(A)||t.Cartesian3.equalsEpsilon(A,s,t.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(A,o,t.CesiumMath.EPSILON7)||P.push(t.Cartesian3.clone(A)))),P.push(o);p&&(s=E[M-1],o=E[0],A=d.IntersectionTests.lineSegmentPlane(s,o,ie,pe),!e.defined(A)||t.Cartesian3.equalsEpsilon(A,s,t.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(A,o,t.CesiumMath.EPSILON7)||(a.arcType===m.ArcType.GEODESIC?P.push(t.Cartesian3.clone(A)):a.arcType===m.ArcType.RHUMB&&(O=C.cartesianToCartographic(A,Ce).longitude,l=C.cartesianToCartographic(s,Ce),u=C.cartesianToCartographic(o,de),k.setEndPoints(l,u),_=k.findIntersectionWithLongitude(O,he),A=C.cartographicToCartesian(_,pe),!e.defined(A)||t.Cartesian3.equalsEpsilon(A,s,t.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(A,o,t.CesiumMath.EPSILON7)||P.push(t.Cartesian3.clone(A)))));var b=P.length,D=new Array(b);for(i=0;i<b;i++){var L=n.Cartographic.fromCartesian(P[i],C);L.height=0,D[i]=L}if(D=f.arrayRemoveDuplicates(D,n.Cartographic.equalsEpsilon),b=D.length,!(b<2)){var I=[],R=[],x=[],z=[],B=se,V=oe,F=le,Y=ue,U=ce,q=D[0],X=D[1],J=D[b-1];for(B=Z(C,J,v,B),Y=Z(C,X,v,Y),V=Z(C,q,v,V),F=Z(C,q,T,F),U=p?re(B,V,F,Y,U):j(q,X,T,C,U),t.Cartesian3.pack(U,R,0),t.Cartesian3.pack(V,x,0),t.Cartesian3.pack(F,z,0),I.push(q.latitude),I.push(q.longitude),W(q,X,v,T,h,g,C,R,x,z,I),i=1;i<b-1;++i){B=t.Cartesian3.clone(V,B),V=t.Cartesian3.clone(Y,V);var Q=D[i];Z(C,Q,T,F),Z(C,D[i+1],v,Y),re(B,V,F,Y,U),r=R.length,t.Cartesian3.pack(U,R,r),t.Cartesian3.pack(V,x,r),t.Cartesian3.pack(F,z,r),I.push(Q.latitude),I.push(Q.longitude),W(D[i],D[i+1],v,T,h,g,C,R,x,z,I)}var K=D[b-1],$=D[b-2];if(V=Z(C,K,v,V),F=Z(C,K,T,F),p){var ee=D[0];B=Z(C,$,v,B),Y=Z(C,ee,v,Y),U=re(B,V,F,Y,U)}else U=j($,K,T,C,U);if(r=R.length,t.Cartesian3.pack(U,R,r),t.Cartesian3.pack(V,x,r),t.Cartesian3.pack(F,z,r),I.push(K.latitude),I.push(K.longitude),p){for(W(K,q,v,T,h,g,C,R,x,z,I),r=R.length,i=0;i<3;++i)R[r+i]=R[i],x[r+i]=x[i],z[r+i]=z[i];I.push(q.latitude),I.push(q.longitude)}return ca(p,y,x,z,R,I,c)}};let ge=[2,3,6,7],fe=new t.Cartesian3,me=new t.Cartesian3,we=new t.Cartesian3;H.createPlaneModeGeometry=function(e){let a=e._positions,n=e.width,r=a[0],i=a[1],s=t.Cartesian3.UNIT_Z,o=t.Cartesian3.subtract(i,r,ee),l=t.Cartesian3.cross(o,s,fe);t.Cartesian3.normalize(l,l);let C=t.Cartesian3.add(r,t.Cartesian3.ZERO,me),d=t.Cartesian3.add(i,t.Cartesian3.ZERO,we),h=new Float32Array(24),g=new Float32Array(24),f=new Float32Array(24),m=new Float32Array(32),w=new Float32Array(16);t.Cartesian3.pack(r,h,0),t.Cartesian3.pack(i,h,3),t.Cartesian3.pack(d,h,6),t.Cartesian3.pack(C,h,9),t.Cartesian3.pack(r,h,12),t.Cartesian3.pack(i,h,15),t.Cartesian3.pack(d,h,18),t.Cartesian3.pack(C,h,21);let y=[0,1,2,0,2,3,4,7,6,4,6,5,4,0,3,4,3,7,5,6,2,5,2,1,7,3,2,7,2,6,4,5,1,4,1,0];for(let u=0;u<8;u++)t.Cartesian3.pack(r,g,3*u),t.Cartesian3.pack(i,f,3*u),t.Cartesian3.pack(l,m,4*u),m[4*u+3]=n,w[2*u]=ge.includes(u)?1:-1,w[2*u+1]=u<4?1:-1;let v=new c.Geometry({attributes:{position:new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:h}),startPosition:new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:g}),endPosition:new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f}),rightDirectionAndWidth:new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:4,values:m}),isTopRight:new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:w})},indices:new Uint16Array(y),primitiveType:p.PrimitiveType.TRIANGLES});return v};var ye=new t.Cartesian3,ve=new s.Matrix3,Te=new i.Quaternion;function Ee(e,a,n,r){var o=J(n,a,ye),l=t.Cartesian3.dot(o,e);if(l>R||l<x){var u=J(r,n,ae),c=l<x?t.CesiumMath.PI_OVER_TWO:-t.CesiumMath.PI_OVER_TWO,p=i.Quaternion.fromAxisAngle(u,c,Te),C=s.Matrix3.fromQuaternion(p,ve);return s.Matrix3.multiplyByVector(C,e,e),!0}return!1}var Me=new n.Cartographic,Ae=new t.Cartesian3,_e=new t.Cartesian3;function Oe(e,a,r,i,s){var o=n.Cartographic.toCartesian(a,e._ellipsoid,Ae),l=t.Cartesian3.add(o,r,_e),u=!1,c=e._ellipsoid,p=c.cartesianToCartographic(l,Me);Math.abs(a.longitude-p.longitude)>t.CesiumMath.PI_OVER_TWO&&(u=!0,l=t.Cartesian3.subtract(o,r,_e),p=c.cartesianToCartographic(l,Me)),p.height=0;var C=e.project(p,s);return s=t.Cartesian3.subtract(C,i,s),s.z=0,s=t.Cartesian3.normalize(s,s),u&&t.Cartesian3.negate(s,s),s}var ke=new t.Cartesian3,Pe=new t.Cartesian3;function be(e,a,n,r,i,s){var o=t.Cartesian3.subtract(a,e,ke);t.Cartesian3.normalize(o,o);var l=n-N,u=t.Cartesian3.multiplyByScalar(o,l,Pe);t.Cartesian3.add(e,u,i);var c=r-G;u=t.Cartesian3.multiplyByScalar(o,c,Pe),t.Cartesian3.add(a,u,s)}var De=new t.Cartesian3;function Le(e,a){var n=h.Plane.getPointDistance(ie,e),r=h.Plane.getPointDistance(ie,a),i=De;t.CesiumMath.equalsEpsilon(n,0,t.CesiumMath.EPSILON2)?(i=J(a,e,i),t.Cartesian3.multiplyByScalar(i,t.CesiumMath.EPSILON2,i),t.Cartesian3.add(e,i,e)):t.CesiumMath.equalsEpsilon(r,0,t.CesiumMath.EPSILON2)&&(i=J(e,a,i),t.Cartesian3.multiplyByScalar(i,t.CesiumMath.EPSILON2,i),t.Cartesian3.add(a,i,a))}function Se(e,a){var n=Math.abs(e.longitude),r=Math.abs(a.longitude);if(t.CesiumMath.equalsEpsilon(n,t.CesiumMath.PI,t.CesiumMath.EPSILON11)){var i=t.CesiumMath.sign(a.longitude);return e.longitude=i*(n-t.CesiumMath.EPSILON11),1}if(t.CesiumMath.equalsEpsilon(r,t.CesiumMath.PI,t.CesiumMath.EPSILON11)){var s=t.CesiumMath.sign(e.longitude);return a.longitude=s*(r-t.CesiumMath.EPSILON11),2}return 0}var Ie=new n.Cartographic,Re=new n.Cartographic,xe=new t.Cartesian3,Ne=new t.Cartesian3,Ge=new t.Cartesian3,He=new t.Cartesian3,ze=new t.Cartesian3,Be=new t.Cartesian3,Ve=[Ie,Re],je=new n.Rectangle,Fe=new t.Cartesian3,Ye=new t.Cartesian3,Ue=new t.Cartesian3,qe=new t.Cartesian3,We=new t.Cartesian3,Xe=new t.Cartesian3,Ze=new t.Cartesian3,Je=new t.Cartesian3,Qe=new t.Cartesian3,Ke=new t.Cartesian3,$e=new t.Cartesian3,ea=new t.Cartesian3,aa=new t.Cartesian3,ta=new C.EncodedCartesian3,na=new C.EncodedCartesian3,ra=new t.Cartesian3,ia=new t.Cartesian3,sa=new t.Cartesian3,oa=[new r.BoundingSphere,new r.BoundingSphere],la=[0,2,1,0,3,2,0,7,3,0,4,7,0,5,4,0,1,5,5,7,4,5,6,7,5,2,6,5,1,2,3,6,2,3,7,6],ua=la.length;function ca(e,a,i,s,o,l,p){var d,h,g,f,m,w,y=a._ellipsoid,v=i.length/3-1,T=8*v,E=4*T,M=36*v,A=T>65535?new Uint32Array(M):new Uint16Array(M),_=new Float64Array(3*T),O=new Float32Array(E),k=new Float32Array(E),P=new Float32Array(E),b=new Float32Array(E),L=new Float32Array(E);p&&(g=new Float32Array(E),f=new Float32Array(E),m=new Float32Array(E),w=new Float32Array(2*T));var S=l.length/2,I=0,x=Ie;x.height=0;var N=Re;N.height=0;var G=xe,H=Ne;if(p)for(h=0,d=1;d<S;d++)x.latitude=l[h],x.longitude=l[h+1],N.latitude=l[h+2],N.longitude=l[h+3],G=a.project(x,G),H=a.project(N,H),I+=t.Cartesian3.distance(G,H),h+=2;var z=s.length/3;H=t.Cartesian3.unpack(s,0,H);var B,V=0;for(h=3,d=1;d<z;d++)G=t.Cartesian3.clone(H,G),H=t.Cartesian3.unpack(s,h,H),V+=t.Cartesian3.distance(G,H),h+=3;h=3;var j=0,F=0,Y=0,U=0,q=!1,W=t.Cartesian3.unpack(i,0,He),X=t.Cartesian3.unpack(s,0,Ne),Z=t.Cartesian3.unpack(o,0,Be);if(e){var Q=t.Cartesian3.unpack(i,i.length-6,Ge);Ee(Z,Q,W,X)&&(Z=t.Cartesian3.negate(Z,Z))}var K=0,$=0,ee=0;for(d=0;d<v;d++){var ae,te,ne,re,ie=t.Cartesian3.clone(W,Ge),se=t.Cartesian3.clone(X,xe),oe=t.Cartesian3.clone(Z,ze);if(q&&(oe=t.Cartesian3.negate(oe,oe)),W=t.Cartesian3.unpack(i,h,He),X=t.Cartesian3.unpack(s,h,Ne),Z=t.Cartesian3.unpack(o,h,Be),q=Ee(Z,ie,W,X),x.latitude=l[j],x.longitude=l[j+1],N.latitude=l[j+2],N.longitude=l[j+3],p){var le=Se(x,N);ae=a.project(x,We),te=a.project(N,Xe);var ue=J(te,ae,ra);ue.y=Math.abs(ue.y),ne=Ze,re=Je,0===le||t.Cartesian3.dot(ue,t.Cartesian3.UNIT_Y)>R?(ne=Oe(a,x,oe,ae,Ze),re=Oe(a,N,Z,te,Je)):1===le?(re=Oe(a,N,Z,te,Je),ne.x=0,ne.y=t.CesiumMath.sign(x.longitude-Math.abs(N.longitude)),ne.z=0):(ne=Oe(a,x,oe,ae,Ze),re.x=0,re.y=t.CesiumMath.sign(x.longitude-N.longitude),re.z=0)}var ce=t.Cartesian3.distance(se,X),pe=C.EncodedCartesian3.fromCartesian(ie,ta),Ce=t.Cartesian3.subtract(W,ie,Qe),de=t.Cartesian3.normalize(Ce,fe),he=t.Cartesian3.subtract(se,ie,Ke);he=t.Cartesian3.normalize(he,he);var ge=t.Cartesian3.cross(de,he,fe);ge=t.Cartesian3.normalize(ge,ge);var me=t.Cartesian3.cross(he,oe,ea);me=t.Cartesian3.normalize(me,me);var we=t.Cartesian3.subtract(X,W,$e);we=t.Cartesian3.normalize(we,we);var ye=t.Cartesian3.cross(Z,we,aa);ye=t.Cartesian3.normalize(ye,ye);var ve,Te,Me,Ae=ce/V,_e=K/V,ke=0,Pe=0,De=0;if(p){ke=t.Cartesian3.distance(ae,te),ve=C.EncodedCartesian3.fromCartesian(ae,na),Te=t.Cartesian3.subtract(te,ae,ra),Me=t.Cartesian3.normalize(Te,ia);var ca=Me.x;Me.x=Me.y,Me.y=-ca,Pe=ke/I,De=$/I}for(B=0;B<8;B++){var Ca=U+4*B,da=F+2*B,ha=Ca+3,ga=B<4?1:-1,fa=2===B||3===B||6===B||7===B?1:-1;t.Cartesian3.pack(pe.high,O,Ca),O[ha]=Ce.x,t.Cartesian3.pack(pe.low,k,Ca),k[ha]=Ce.y,t.Cartesian3.pack(me,P,Ca),P[ha]=Ce.z,t.Cartesian3.pack(ye,b,Ca),b[ha]=Ae*ga,t.Cartesian3.pack(ge,L,Ca);var ma=_e*fa;0===ma&&fa<0&&(ma=9),L[ha]=ma,p&&(g[Ca]=ve.high.x,g[Ca+1]=ve.high.y,g[Ca+2]=ve.low.x,g[Ca+3]=ve.low.y,m[Ca]=-ne.y,m[Ca+1]=ne.x,m[Ca+2]=re.y,m[Ca+3]=-re.x,f[Ca]=Te.x,f[Ca+1]=Te.y,f[Ca+2]=Me.x,f[Ca+3]=Me.y,w[da]=Pe*ga,ma=De*fa,0===ma&&fa<0&&(ma=9),w[da+1]=ma)}var wa=Ue,ya=qe,va=Fe,Ta=Ye,Ea=n.Rectangle.fromCartographicArray(Ve,je),Ma=D.getMinimumMaximumHeights(Ea,y),Aa=Ma.minimumTerrainHeight,_a=Ma.maximumTerrainHeight;ee+=Aa,ee+=_a,be(ie,se,Aa,_a,wa,va),be(W,X,Aa,_a,ya,Ta);var Oa=t.Cartesian3.multiplyByScalar(ge,t.CesiumMath.EPSILON5,sa);t.Cartesian3.add(wa,Oa,wa),t.Cartesian3.add(ya,Oa,ya),t.Cartesian3.add(va,Oa,va),t.Cartesian3.add(Ta,Oa,Ta),Le(wa,ya),Le(va,Ta),t.Cartesian3.pack(wa,_,Y),t.Cartesian3.pack(ya,_,Y+3),t.Cartesian3.pack(Ta,_,Y+6),t.Cartesian3.pack(va,_,Y+9),Oa=t.Cartesian3.multiplyByScalar(ge,-2*t.CesiumMath.EPSILON5,sa),t.Cartesian3.add(wa,Oa,wa),t.Cartesian3.add(ya,Oa,ya),t.Cartesian3.add(va,Oa,va),t.Cartesian3.add(Ta,Oa,Ta),Le(wa,ya),Le(va,Ta),t.Cartesian3.pack(wa,_,Y+12),t.Cartesian3.pack(ya,_,Y+15),t.Cartesian3.pack(Ta,_,Y+18),t.Cartesian3.pack(va,_,Y+21),j+=2,h+=3,F+=16,Y+=24,U+=32,K+=ce,$+=ke}h=0;var ka=0;for(d=0;d<v;d++){for(B=0;B<ua;B++)A[h+B]=la[B]+ka;ka+=8,h+=ua}var Pa=oa;r.BoundingSphere.fromVertices(i,t.Cartesian3.ZERO,3,Pa[0]),r.BoundingSphere.fromVertices(s,t.Cartesian3.ZERO,3,Pa[1]);var ba=r.BoundingSphere.fromBoundingSpheres(Pa);ba.radius+=ee/(2*v);var Da={position:new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.DOUBLE,componentsPerAttribute:3,normalize:!1,values:_}),startHiAndForwardOffsetX:pa(O),startLoAndForwardOffsetY:pa(k),startNormalAndForwardOffsetZ:pa(P),endNormalAndTextureCoordinateNormalizationX:pa(b),rightNormalAndTextureCoordinateNormalizationY:pa(L)};return p&&(Da.startHiLo2D=pa(g),Da.offsetAndRight2D=pa(f),Da.startEndNormals2D=pa(m),Da.texcoordNormalization2D=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:2,normalize:!1,values:w})),new c.Geometry({attributes:Da,indices:A,boundingSphere:ba})}function pa(e){return new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:4,normalize:!1,values:e})}function Ca(a,t){return D.initialize().then((function(){return e.defined(t)&&(a=H.unpack(a,t)),H.createGeometry(a)}))}return H._projectNormal=Oe,Ca}));