define(["./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./BoundingSphere-37359cf8","./Transforms-6b57162d","./Matrix4-ed224189","./RuntimeError-86da6af2","./WebGLConstants-3660bc8f","./ComponentDatatype-86703c58","./GeometryAttribute-b1ed7c2e","./PrimitiveType-30fa6f85","./EncodedCartesian3-ceea15a0","./IntersectionTests-a310845d","./Plane-87957166","./WebMercatorProjection-2349e1e4","./arrayRemoveDuplicates-8b568181","./ArcType-39be7a32","./EllipsoidRhumbLine-de5cdc57","./EllipsoidGeodesic-96429ebd"],(function(e,a,t,r,n,i,s,o,l,u,c,C,p,d,h,g,f,m,w,y){"use strict";function v(a){a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT),this._ellipsoid=e.defaultValue(a.ellipsoid,r.Ellipsoid.WGS84),this._rectangle=e.defaultValue(a.rectangle,r.Rectangle.MAX_VALUE),this._projection=new n.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=e.defaultValue(a.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=e.defaultValue(a.numberOfLevelZeroTilesY,1)}Object.defineProperties(v.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}}}),v.prototype.getNumberOfXTilesAtLevel=function(e){return this._numberOfLevelZeroTilesX<<e},v.prototype.getNumberOfYTilesAtLevel=function(e){return this._numberOfLevelZeroTilesY<<e},v.prototype.rectangleToNativeRectangle=function(n,i){a.Check.defined("rectangle",n);var s=t.CesiumMath.toDegrees(n.west),o=t.CesiumMath.toDegrees(n.south),l=t.CesiumMath.toDegrees(n.east),u=t.CesiumMath.toDegrees(n.north);return e.defined(i)?(i.west=s,i.south=o,i.east=l,i.north=u,i):new r.Rectangle(s,o,l,u)},v.prototype.tileXYToNativeRectangle=function(e,a,r,n){var i=this.tileXYToRectangle(e,a,r,n);return i.west=t.CesiumMath.toDegrees(i.west),i.south=t.CesiumMath.toDegrees(i.south),i.east=t.CesiumMath.toDegrees(i.east),i.north=t.CesiumMath.toDegrees(i.north),i},v.prototype.tileXYToRectangle=function(a,t,n,i){var s=this._rectangle,o=this.getNumberOfXTilesAtLevel(n),l=this.getNumberOfYTilesAtLevel(n),u=s.width/o,c=a*u+s.west,C=(a+1)*u+s.west,p=s.height/l,d=s.north-t*p,h=s.north-(t+1)*p;return e.defined(i)||(i=new r.Rectangle(c,h,C,d)),i.west=c,i.south=h,i.east=C,i.north=d,i},v.prototype.positionToTileXY=function(a,n,i){var s=this._rectangle;if(r.Rectangle.contains(s,a)){var o=this.getNumberOfXTilesAtLevel(n),l=this.getNumberOfYTilesAtLevel(n),u=s.width/o,c=s.height/l,C=a.longitude;s.east<s.west&&(C+=t.CesiumMath.TWO_PI);var p=(C-s.west)/u|0;p>=o&&(p=o-1);var d=(s.north-a.latitude)/c|0;return d>=l&&(d=l-1),e.defined(i)?(i.x=p,i.y=d,i):new r.Cartesian2(p,d)}};var T=new t.Cartesian3,E=new t.Cartesian3,M=new r.Cartographic,A=new t.Cartesian3,_=new t.Cartesian3,O=new n.BoundingSphere,b=new v,k=[new r.Cartographic,new r.Cartographic,new r.Cartographic,new r.Cartographic],P=new r.Cartesian2,D={};function L(e){r.Cartographic.fromRadians(e.east,e.north,0,k[0]),r.Cartographic.fromRadians(e.west,e.north,0,k[1]),r.Cartographic.fromRadians(e.east,e.south,0,k[2]),r.Cartographic.fromRadians(e.west,e.south,0,k[3]);var a,t=0,n=0,i=0,s=0,o=D._terrainHeightsMaxLevel;for(a=0;a<=o;++a){for(var l=!1,u=0;u<4;++u){var c=k[u];if(b.positionToTileXY(c,a,P),0===u)i=P.x,s=P.y;else if(i!==P.x||s!==P.y){l=!0;break}}if(l)break;t=i,n=s}if(0!==a)return{x:t,y:n,level:a>o?o:a-1}}D.initialize=function(){var a=D._initPromise;return e.defined(a)||(a=i.Resource.fetchJson(i.buildModuleUrl("Assets/approximateTerrainHeights.json")).then((function(e){D._terrainHeights=e})),D._initPromise=a),a},D.getMinimumMaximumHeights=function(n,i){if(a.Check.defined("rectangle",n),!e.defined(D._terrainHeights))throw new a.DeveloperError("You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function");i=e.defaultValue(i,r.Ellipsoid.WGS84);var s=L(n),o=D._defaultMinTerrainHeight,l=D._defaultMaxTerrainHeight;if(e.defined(s)){var u=s.level+"-"+s.x+"-"+s.y,c=D._terrainHeights[u];e.defined(c)&&(o=c[0],l=c[1]),i.cartographicToCartesian(r.Rectangle.northeast(n,M),T),i.cartographicToCartesian(r.Rectangle.southwest(n,M),E),t.Cartesian3.midpoint(E,T,A);var C=i.scaleToGeodeticSurface(A,_);if(e.defined(C)){var p=t.Cartesian3.distance(A,C);o=Math.min(o,-p)}else o=D._defaultMinTerrainHeight}return o=Math.max(D._defaultMinTerrainHeight,o),{minimumTerrainHeight:o,maximumTerrainHeight:l}},D.getBoundingSphere=function(t,i){if(a.Check.defined("rectangle",t),!e.defined(D._terrainHeights))throw new a.DeveloperError("You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function");i=e.defaultValue(i,r.Ellipsoid.WGS84);var s=L(t),o=D._defaultMaxTerrainHeight;if(e.defined(s)){var l=s.level+"-"+s.x+"-"+s.y,u=D._terrainHeights[l];e.defined(u)&&(o=u[1])}var c=n.BoundingSphere.fromRectangle3D(t,i,0);return n.BoundingSphere.fromRectangle3D(t,i,o,O),n.BoundingSphere.union(c,O,c)},D._terrainHeightsMaxLevel=6,D._defaultMaxTerrainHeight=9e3,D._defaultMinTerrainHeight=-1e5,D._terrainHeights=void 0,D._initPromise=void 0,Object.defineProperties(D,{initialized:{get:function(){return e.defined(D._terrainHeights)}}});var S=[n.GeographicProjection,g.WebMercatorProjection],I=S.length,R=Math.cos(t.CesiumMath.toRadians(30)),x=Math.cos(t.CesiumMath.toRadians(150)),N=0,G=1e3;function H(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);var n=t.positions;if(!e.defined(n)||n.length<2)throw new a.DeveloperError("At least two positions are required.");if(e.defined(t.arcType)&&t.arcType!==m.ArcType.GEODESIC&&t.arcType!==m.ArcType.RHUMB)throw new a.DeveloperError("Valid options for arcType are ArcType.GEODESIC and ArcType.RHUMB.");this.width=e.defaultValue(t.width,1),this._positions=n,this.granularity=e.defaultValue(t.granularity,9999),this.loop=e.defaultValue(t.loop,!1),this.arcType=e.defaultValue(t.arcType,m.ArcType.GEODESIC),this._ellipsoid=r.Ellipsoid.WGS84,this._projectionIndex=0,this._planeMode=e.defaultValue(t.isPlaneMode,!1),this._workerName="createGroundPolylineGeometry",this._scene3DOnly=!1}Object.defineProperties(H.prototype,{packedLength:{get:function(){return 1+3*this._positions.length+1+1+1+r.Ellipsoid.packedLength+1+1}}}),H.setProjectionAndEllipsoid=function(e,a){for(var t=0,r=0;r<I;r++)if(a instanceof S[r]){t=r;break}e._projectionIndex=t,e._ellipsoid=a.ellipsoid};var z=new t.Cartesian3,B=new t.Cartesian3,V=new t.Cartesian3;function j(e,a,r,n,i){var s=Z(n,e,0,z),o=Z(n,e,r,B),l=Z(n,a,0,V),u=J(o,s,B),c=J(l,s,V);return t.Cartesian3.cross(c,u,i),t.Cartesian3.normalize(i,i)}var F=new r.Cartographic,Y=new t.Cartesian3,U=new t.Cartesian3,q=new t.Cartesian3;function W(e,a,r,n,i,s,o,l,u,c,C){if(0!==i){var p;s===m.ArcType.GEODESIC?p=new y.EllipsoidGeodesic(e,a,o):s===m.ArcType.RHUMB&&(p=new w.EllipsoidRhumbLine(e,a,o));var d=p.surfaceDistance;if(!(d<i))for(var h=j(e,a,n,o,q),g=Math.ceil(d/i),f=d/g,v=f,T=g-1,E=l.length,M=0;M<T;M++){var A=p.interpolateUsingSurfaceDistance(v,F),_=Z(o,A,r,Y),O=Z(o,A,n,U);t.Cartesian3.pack(h,l,E),t.Cartesian3.pack(_,u,E),t.Cartesian3.pack(O,c,E),C.push(A.latitude),C.push(A.longitude),E+=3,v+=f}}}var X=new r.Cartographic;function Z(e,a,t,n){return r.Cartographic.clone(a,X),X.height=t,r.Cartographic.toCartesian(X,e,n)}function J(e,a,r){return t.Cartesian3.subtract(e,a,r),t.Cartesian3.normalize(r,r),r}function Q(e,a,r,n){return n=J(e,a,n),n=t.Cartesian3.cross(n,r,n),n=t.Cartesian3.normalize(n,n),n=t.Cartesian3.cross(r,n,n),n}H.pack=function(n,i,s){a.Check.typeOf.object("value",n),a.Check.defined("array",i);var o=e.defaultValue(s,0),l=n._positions,u=l.length;i[o++]=u;for(var c=0;c<u;++c){var C=l[c];t.Cartesian3.pack(C,i,o),o+=3}return i[o++]=n.granularity,i[o++]=n.loop?1:0,i[o++]=n.arcType,r.Ellipsoid.pack(n._ellipsoid,i,o),n._isPlaneMode?(i[o++]=0,i[o++]=0,i[o++]=0):o+=r.Ellipsoid.packedLength,i[o++]=n._projectionIndex,i[o++]=n._scene3DOnly?1:0,i},H.unpack=function(n,i,s){a.Check.defined("array",n);for(var o=e.defaultValue(i,0),l=n[o++],u=new Array(l),c=0;c<l;c++)u[c]=t.Cartesian3.unpack(n,o),o+=3;var C=n[o++],p=1===n[o++],d=n[o++],h=r.Ellipsoid.unpack(n,o);o+=r.Ellipsoid.packedLength;var g=n[o++],f=1===n[o++];return e.defined(s)||(s=new H({positions:u})),t.Cartesian3.equals(h._radii,t.Cartesian3.ZERO)&&(s._planeMode=!0),s._positions=u,s.granularity=C,s.loop=p,s.arcType=d,s._ellipsoid=h,s._projectionIndex=g,s._scene3DOnly=f,s};var K=new t.Cartesian3,$=new t.Cartesian3,ee=new t.Cartesian3,ae=new t.Cartesian3,te=0,re=-1;function ne(e,a,r,n,i){var s=J(r,a,ae),o=Q(e,a,s,K),l=Q(n,a,s,$);if(t.CesiumMath.equalsEpsilon(t.Cartesian3.dot(o,l),re,t.CesiumMath.EPSILON5))return i=t.Cartesian3.cross(s,o,i),i=t.Cartesian3.normalize(i,i),i;i=t.Cartesian3.add(l,o,i),i=t.Cartesian3.normalize(i,i);var u=t.Cartesian3.cross(s,i,ee);return t.Cartesian3.dot(l,u)<te&&(i=t.Cartesian3.negate(i,i)),i}var ie=h.Plane.fromPointNormal(t.Cartesian3.ZERO,t.Cartesian3.UNIT_Y),se=new t.Cartesian3,oe=new t.Cartesian3,le=new t.Cartesian3,ue=new t.Cartesian3,ce=new t.Cartesian3,Ce=new t.Cartesian3,pe=new r.Cartographic,de=new r.Cartographic,he=new r.Cartographic;H.createGeometry=function(a){if(a._isPlaneMode)return H.createPlaneModeGeometry(a);var n,i,s,o,l,u,c=!a._scene3DOnly,C=a.loop,p=a._ellipsoid,h=a.granularity,g=a.arcType,y=new S[a._projectionIndex](p),v=N,T=G,E=a._positions,M=E.length;2===M&&(C=!1);var A,_,O,b=new w.EllipsoidRhumbLine(void 0,void 0,p),k=[E[0]];for(i=0;i<M-1;i++)s=E[i],o=E[i+1],A=d.IntersectionTests.lineSegmentPlane(s,o,ie,Ce),!e.defined(A)||t.Cartesian3.equalsEpsilon(A,s,t.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(A,o,t.CesiumMath.EPSILON7)||(a.arcType===m.ArcType.GEODESIC?k.push(t.Cartesian3.clone(A)):a.arcType===m.ArcType.RHUMB&&(O=p.cartesianToCartographic(A,pe).longitude,l=p.cartesianToCartographic(s,pe),u=p.cartesianToCartographic(o,de),b.setEndPoints(l,u),_=b.findIntersectionWithLongitude(O,he),A=p.cartographicToCartesian(_,Ce),!e.defined(A)||t.Cartesian3.equalsEpsilon(A,s,t.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(A,o,t.CesiumMath.EPSILON7)||k.push(t.Cartesian3.clone(A)))),k.push(o);C&&(s=E[M-1],o=E[0],A=d.IntersectionTests.lineSegmentPlane(s,o,ie,Ce),!e.defined(A)||t.Cartesian3.equalsEpsilon(A,s,t.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(A,o,t.CesiumMath.EPSILON7)||(a.arcType===m.ArcType.GEODESIC?k.push(t.Cartesian3.clone(A)):a.arcType===m.ArcType.RHUMB&&(O=p.cartesianToCartographic(A,pe).longitude,l=p.cartesianToCartographic(s,pe),u=p.cartesianToCartographic(o,de),b.setEndPoints(l,u),_=b.findIntersectionWithLongitude(O,he),A=p.cartographicToCartesian(_,Ce),!e.defined(A)||t.Cartesian3.equalsEpsilon(A,s,t.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(A,o,t.CesiumMath.EPSILON7)||k.push(t.Cartesian3.clone(A)))));var P=k.length,D=new Array(P);for(i=0;i<P;i++){var L=r.Cartographic.fromCartesian(k[i],p);L.height=0,D[i]=L}if(D=f.arrayRemoveDuplicates(D,r.Cartographic.equalsEpsilon),P=D.length,!(P<2)){var I=[],R=[],x=[],z=[],B=se,V=oe,F=le,Y=ue,U=ce,q=D[0],X=D[1],J=D[P-1];for(B=Z(p,J,v,B),Y=Z(p,X,v,Y),V=Z(p,q,v,V),F=Z(p,q,T,F),U=C?ne(B,V,F,Y,U):j(q,X,T,p,U),t.Cartesian3.pack(U,R,0),t.Cartesian3.pack(V,x,0),t.Cartesian3.pack(F,z,0),I.push(q.latitude),I.push(q.longitude),W(q,X,v,T,h,g,p,R,x,z,I),i=1;i<P-1;++i){B=t.Cartesian3.clone(V,B),V=t.Cartesian3.clone(Y,V);var Q=D[i];Z(p,Q,T,F),Z(p,D[i+1],v,Y),ne(B,V,F,Y,U),n=R.length,t.Cartesian3.pack(U,R,n),t.Cartesian3.pack(V,x,n),t.Cartesian3.pack(F,z,n),I.push(Q.latitude),I.push(Q.longitude),W(D[i],D[i+1],v,T,h,g,p,R,x,z,I)}var K=D[P-1],$=D[P-2];if(V=Z(p,K,v,V),F=Z(p,K,T,F),C){var ee=D[0];B=Z(p,$,v,B),Y=Z(p,ee,v,Y),U=ne(B,V,F,Y,U)}else U=j($,K,T,p,U);if(n=R.length,t.Cartesian3.pack(U,R,n),t.Cartesian3.pack(V,x,n),t.Cartesian3.pack(F,z,n),I.push(K.latitude),I.push(K.longitude),C){for(W(K,q,v,T,h,g,p,R,x,z,I),n=R.length,i=0;i<3;++i)R[n+i]=R[i],x[n+i]=x[i],z[n+i]=z[i];I.push(q.latitude),I.push(q.longitude)}return ca(C,y,x,z,R,I,c)}};let ge=[2,3,6,7],fe=new t.Cartesian3,me=new t.Cartesian3,we=new t.Cartesian3;H.createPlaneModeGeometry=function(e){let a=e._positions,r=e.width,n=a[0],i=a[1],s=t.Cartesian3.UNIT_Z,o=t.Cartesian3.subtract(i,n,ee),l=t.Cartesian3.cross(o,s,fe);t.Cartesian3.normalize(l,l);let p=t.Cartesian3.add(n,t.Cartesian3.ZERO,me),d=t.Cartesian3.add(i,t.Cartesian3.ZERO,we),h=new Float32Array(24),g=new Float32Array(24),f=new Float32Array(24),m=new Float32Array(32),w=new Float32Array(16);t.Cartesian3.pack(n,h,0),t.Cartesian3.pack(i,h,3),t.Cartesian3.pack(d,h,6),t.Cartesian3.pack(p,h,9),t.Cartesian3.pack(n,h,12),t.Cartesian3.pack(i,h,15),t.Cartesian3.pack(d,h,18),t.Cartesian3.pack(p,h,21);let y=[0,1,2,0,2,3,4,7,6,4,6,5,4,0,3,4,3,7,5,6,2,5,2,1,7,3,2,7,2,6,4,5,1,4,1,0];for(let u=0;u<8;u++)t.Cartesian3.pack(n,g,3*u),t.Cartesian3.pack(i,f,3*u),t.Cartesian3.pack(l,m,4*u),m[4*u+3]=r,w[2*u]=ge.includes(u)?1:-1,w[2*u+1]=u<4?1:-1;let v=new c.Geometry({attributes:{position:new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:h}),startPosition:new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:g}),endPosition:new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f}),rightDirectionAndWidth:new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:4,values:m}),isTopRight:new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:w})},indices:new Uint16Array(y),primitiveType:C.PrimitiveType.TRIANGLES});return v};var ye=new t.Cartesian3,ve=new s.Matrix3,Te=new i.Quaternion;function Ee(e,a,r,n){var o=J(r,a,ye),l=t.Cartesian3.dot(o,e);if(l>R||l<x){var u=J(n,r,ae),c=l<x?t.CesiumMath.PI_OVER_TWO:-t.CesiumMath.PI_OVER_TWO,C=i.Quaternion.fromAxisAngle(u,c,Te),p=s.Matrix3.fromQuaternion(C,ve);return s.Matrix3.multiplyByVector(p,e,e),!0}return!1}var Me=new r.Cartographic,Ae=new t.Cartesian3,_e=new t.Cartesian3;function Oe(e,a,n,i,s){var o=r.Cartographic.toCartesian(a,e._ellipsoid,Ae),l=t.Cartesian3.add(o,n,_e),u=!1,c=e._ellipsoid,C=c.cartesianToCartographic(l,Me);Math.abs(a.longitude-C.longitude)>t.CesiumMath.PI_OVER_TWO&&(u=!0,l=t.Cartesian3.subtract(o,n,_e),C=c.cartesianToCartographic(l,Me)),C.height=0;var p=e.project(C,s);return s=t.Cartesian3.subtract(p,i,s),s.z=0,s=t.Cartesian3.normalize(s,s),u&&t.Cartesian3.negate(s,s),s}var be=new t.Cartesian3,ke=new t.Cartesian3;function Pe(e,a,r,n,i,s){var o=t.Cartesian3.subtract(a,e,be);t.Cartesian3.normalize(o,o);var l=r-N,u=t.Cartesian3.multiplyByScalar(o,l,ke);t.Cartesian3.add(e,u,i);var c=n-G;u=t.Cartesian3.multiplyByScalar(o,c,ke),t.Cartesian3.add(a,u,s)}var De=new t.Cartesian3;function Le(e,a){var r=h.Plane.getPointDistance(ie,e),n=h.Plane.getPointDistance(ie,a),i=De;t.CesiumMath.equalsEpsilon(r,0,t.CesiumMath.EPSILON2)?(i=J(a,e,i),t.Cartesian3.multiplyByScalar(i,t.CesiumMath.EPSILON2,i),t.Cartesian3.add(e,i,e)):t.CesiumMath.equalsEpsilon(n,0,t.CesiumMath.EPSILON2)&&(i=J(e,a,i),t.Cartesian3.multiplyByScalar(i,t.CesiumMath.EPSILON2,i),t.Cartesian3.add(a,i,a))}function Se(e,a){var r=Math.abs(e.longitude),n=Math.abs(a.longitude);if(t.CesiumMath.equalsEpsilon(r,t.CesiumMath.PI,t.CesiumMath.EPSILON11)){var i=t.CesiumMath.sign(a.longitude);return e.longitude=i*(r-t.CesiumMath.EPSILON11),1}if(t.CesiumMath.equalsEpsilon(n,t.CesiumMath.PI,t.CesiumMath.EPSILON11)){var s=t.CesiumMath.sign(e.longitude);return a.longitude=s*(n-t.CesiumMath.EPSILON11),2}return 0}var Ie=new r.Cartographic,Re=new r.Cartographic,xe=new t.Cartesian3,Ne=new t.Cartesian3,Ge=new t.Cartesian3,He=new t.Cartesian3,ze=new t.Cartesian3,Be=new t.Cartesian3,Ve=[Ie,Re],je=new r.Rectangle,Fe=new t.Cartesian3,Ye=new t.Cartesian3,Ue=new t.Cartesian3,qe=new t.Cartesian3,We=new t.Cartesian3,Xe=new t.Cartesian3,Ze=new t.Cartesian3,Je=new t.Cartesian3,Qe=new t.Cartesian3,Ke=new t.Cartesian3,$e=new t.Cartesian3,ea=new t.Cartesian3,aa=new t.Cartesian3,ta=new p.EncodedCartesian3,ra=new p.EncodedCartesian3,na=new t.Cartesian3,ia=new t.Cartesian3,sa=new t.Cartesian3,oa=[new n.BoundingSphere,new n.BoundingSphere],la=[0,2,1,0,3,2,0,7,3,0,4,7,0,5,4,0,1,5,5,7,4,5,6,7,5,2,6,5,1,2,3,6,2,3,7,6],ua=la.length;function ca(e,a,i,s,o,l,C){var d,h,g,f,m,w,y=a._ellipsoid,v=i.length/3-1,T=8*v,E=4*T,M=36*v,A=T>65535?new Uint32Array(M):new Uint16Array(M),_=new Float64Array(3*T),O=new Float32Array(E),b=new Float32Array(E),k=new Float32Array(E),P=new Float32Array(E),L=new Float32Array(E);C&&(g=new Float32Array(E),f=new Float32Array(E),m=new Float32Array(E),w=new Float32Array(2*T));var S=l.length/2,I=0,x=Ie;x.height=0;var N=Re;N.height=0;var G=xe,H=Ne;if(C)for(h=0,d=1;d<S;d++)x.latitude=l[h],x.longitude=l[h+1],N.latitude=l[h+2],N.longitude=l[h+3],G=a.project(x,G),H=a.project(N,H),I+=t.Cartesian3.distance(G,H),h+=2;var z=s.length/3;H=t.Cartesian3.unpack(s,0,H);var B,V=0;for(h=3,d=1;d<z;d++)G=t.Cartesian3.clone(H,G),H=t.Cartesian3.unpack(s,h,H),V+=t.Cartesian3.distance(G,H),h+=3;h=3;var j=0,F=0,Y=0,U=0,q=!1,W=t.Cartesian3.unpack(i,0,He),X=t.Cartesian3.unpack(s,0,Ne),Z=t.Cartesian3.unpack(o,0,Be);if(e){var Q=t.Cartesian3.unpack(i,i.length-6,Ge);Ee(Z,Q,W,X)&&(Z=t.Cartesian3.negate(Z,Z))}var K=0,$=0,ee=0;for(d=0;d<v;d++){var ae,te,re,ne,ie=t.Cartesian3.clone(W,Ge),se=t.Cartesian3.clone(X,xe),oe=t.Cartesian3.clone(Z,ze);if(q&&(oe=t.Cartesian3.negate(oe,oe)),W=t.Cartesian3.unpack(i,h,He),X=t.Cartesian3.unpack(s,h,Ne),Z=t.Cartesian3.unpack(o,h,Be),q=Ee(Z,ie,W,X),x.latitude=l[j],x.longitude=l[j+1],N.latitude=l[j+2],N.longitude=l[j+3],C){var le=Se(x,N);ae=a.project(x,We),te=a.project(N,Xe);var ue=J(te,ae,na);ue.y=Math.abs(ue.y),re=Ze,ne=Je,0===le||t.Cartesian3.dot(ue,t.Cartesian3.UNIT_Y)>R?(re=Oe(a,x,oe,ae,Ze),ne=Oe(a,N,Z,te,Je)):1===le?(ne=Oe(a,N,Z,te,Je),re.x=0,re.y=t.CesiumMath.sign(x.longitude-Math.abs(N.longitude)),re.z=0):(re=Oe(a,x,oe,ae,Ze),ne.x=0,ne.y=t.CesiumMath.sign(x.longitude-N.longitude),ne.z=0)}var ce=t.Cartesian3.distance(se,X),Ce=p.EncodedCartesian3.fromCartesian(ie,ta),pe=t.Cartesian3.subtract(W,ie,Qe),de=t.Cartesian3.normalize(pe,fe),he=t.Cartesian3.subtract(se,ie,Ke);he=t.Cartesian3.normalize(he,he);var ge=t.Cartesian3.cross(de,he,fe);ge=t.Cartesian3.normalize(ge,ge);var me=t.Cartesian3.cross(he,oe,ea);me=t.Cartesian3.normalize(me,me);var we=t.Cartesian3.subtract(X,W,$e);we=t.Cartesian3.normalize(we,we);var ye=t.Cartesian3.cross(Z,we,aa);ye=t.Cartesian3.normalize(ye,ye);var ve,Te,Me,Ae=ce/V,_e=K/V,be=0,ke=0,De=0;if(C){be=t.Cartesian3.distance(ae,te),ve=p.EncodedCartesian3.fromCartesian(ae,ra),Te=t.Cartesian3.subtract(te,ae,na),Me=t.Cartesian3.normalize(Te,ia);var ca=Me.x;Me.x=Me.y,Me.y=-ca,ke=be/I,De=$/I}for(B=0;B<8;B++){var pa=U+4*B,da=F+2*B,ha=pa+3,ga=B<4?1:-1,fa=2===B||3===B||6===B||7===B?1:-1;t.Cartesian3.pack(Ce.high,O,pa),O[ha]=pe.x,t.Cartesian3.pack(Ce.low,b,pa),b[ha]=pe.y,t.Cartesian3.pack(me,k,pa),k[ha]=pe.z,t.Cartesian3.pack(ye,P,pa),P[ha]=Ae*ga,t.Cartesian3.pack(ge,L,pa);var ma=_e*fa;0===ma&&fa<0&&(ma=9),L[ha]=ma,C&&(g[pa]=ve.high.x,g[pa+1]=ve.high.y,g[pa+2]=ve.low.x,g[pa+3]=ve.low.y,m[pa]=-re.y,m[pa+1]=re.x,m[pa+2]=ne.y,m[pa+3]=-ne.x,f[pa]=Te.x,f[pa+1]=Te.y,f[pa+2]=Me.x,f[pa+3]=Me.y,w[da]=ke*ga,ma=De*fa,0===ma&&fa<0&&(ma=9),w[da+1]=ma)}var wa=Ue,ya=qe,va=Fe,Ta=Ye,Ea=r.Rectangle.fromCartographicArray(Ve,je),Ma=D.getMinimumMaximumHeights(Ea,y),Aa=Ma.minimumTerrainHeight,_a=Ma.maximumTerrainHeight;ee+=Aa,ee+=_a,Pe(ie,se,Aa,_a,wa,va),Pe(W,X,Aa,_a,ya,Ta);var Oa=t.Cartesian3.multiplyByScalar(ge,t.CesiumMath.EPSILON5,sa);t.Cartesian3.add(wa,Oa,wa),t.Cartesian3.add(ya,Oa,ya),t.Cartesian3.add(va,Oa,va),t.Cartesian3.add(Ta,Oa,Ta),Le(wa,ya),Le(va,Ta),t.Cartesian3.pack(wa,_,Y),t.Cartesian3.pack(ya,_,Y+3),t.Cartesian3.pack(Ta,_,Y+6),t.Cartesian3.pack(va,_,Y+9),Oa=t.Cartesian3.multiplyByScalar(ge,-2*t.CesiumMath.EPSILON5,sa),t.Cartesian3.add(wa,Oa,wa),t.Cartesian3.add(ya,Oa,ya),t.Cartesian3.add(va,Oa,va),t.Cartesian3.add(Ta,Oa,Ta),Le(wa,ya),Le(va,Ta),t.Cartesian3.pack(wa,_,Y+12),t.Cartesian3.pack(ya,_,Y+15),t.Cartesian3.pack(Ta,_,Y+18),t.Cartesian3.pack(va,_,Y+21),j+=2,h+=3,F+=16,Y+=24,U+=32,K+=ce,$+=be}h=0;var ba=0;for(d=0;d<v;d++){for(B=0;B<ua;B++)A[h+B]=la[B]+ba;ba+=8,h+=ua}var ka=oa;n.BoundingSphere.fromVertices(i,t.Cartesian3.ZERO,3,ka[0]),n.BoundingSphere.fromVertices(s,t.Cartesian3.ZERO,3,ka[1]);var Pa=n.BoundingSphere.fromBoundingSpheres(ka);Pa.radius+=ee/(2*v);var Da={position:new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.DOUBLE,componentsPerAttribute:3,normalize:!1,values:_}),startHiAndForwardOffsetX:Ca(O),startLoAndForwardOffsetY:Ca(b),startNormalAndForwardOffsetZ:Ca(k),endNormalAndTextureCoordinateNormalizationX:Ca(P),rightNormalAndTextureCoordinateNormalizationY:Ca(L)};return C&&(Da.startHiLo2D=Ca(g),Da.offsetAndRight2D=Ca(f),Da.startEndNormals2D=Ca(m),Da.texcoordNormalization2D=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:2,normalize:!1,values:w})),new c.Geometry({attributes:Da,indices:A,boundingSphere:Pa})}function Ca(e){return new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:4,normalize:!1,values:e})}function pa(a,t){return D.initialize().then((function(){return e.defined(t)&&(a=H.unpack(a,t)),H.createGeometry(a)}))}return H._projectNormal=Oe,pa}));