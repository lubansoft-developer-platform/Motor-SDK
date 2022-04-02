define(["./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./BoundingSphere-9db3442e","./Transforms-3e7152f2","./Matrix4-22b96d31","./RuntimeError-86da6af2","./WebGLConstants-3660bc8f","./ComponentDatatype-86703c58","./GeometryAttribute-98a8cf59","./PrimitiveType-30fa6f85","./GeometryAttributes-9d45f9e2","./AttributeCompression-6e02a904","./GeometryPipeline-f896c235","./EncodedCartesian3-ceea15a0","./IndexDatatype-cb635cbc","./IntersectionTests-4fa5e272","./Plane-99a0ae01","./GeometryOffsetAttribute-f755a5cb","./VertexFormat-a00562ee","./GeometryInstance-9936ce9d","./arrayRemoveDuplicates-8b568181","./BoundingRectangle-a7c9e6fd","./AxisAlignedBoundingBox-1aaa0e65","./EllipsoidTangentPlane-a1163ec8","./ArcType-39be7a32","./EllipsoidRhumbLine-de5cdc57","./PolygonPipeline-05839d65","./PolygonGeometryLibrary-3b97810b","./EllipsoidGeodesic-96429ebd"],(function(e,t,r,a,o,i,n,s,l,p,u,c,y,m,d,h,g,f,v,b,P,C,_,w,T,A,x,E,I,G,O){"use strict";var D=new a.Cartographic,N=new a.Cartographic;function H(e,t,r,a){var o=a.cartesianToCartographic(e,D),i=o.height,n=a.cartesianToCartographic(t,N);n.height=i,a.cartographicToCartesian(n,t);var s=a.cartesianToCartographic(r,N);s.height=i-100,a.cartographicToCartesian(s,r)}var L=new w.BoundingRectangle,V=new r.Cartesian3,F=new r.Cartesian3,M=new r.Cartesian3,R=new r.Cartesian3,S=new r.Cartesian3,B=new r.Cartesian3,k=new r.Cartesian3,z=new r.Cartesian3,U=new r.Cartesian3,W=new a.Cartesian2,Y=new a.Cartesian2,j=new r.Cartesian3,Z=new i.Quaternion,Q=new n.Matrix3,q=new n.Matrix3;function K(t){var o=t.vertexFormat,s=t.geometry,l=t.shadowVolume,c=s.attributes.position.values,y=c.length,m=t.wall,d=t.top||m,h=t.bottom||m;let g=t.isPlaneMode;if(o.st||o.normal||o.tangent||o.bitangent||l){var f=t.boundingRectangle,v=t.tangentPlane,P=t.ellipsoid,C=t.stRotation,_=t.perPositionHeight,w=W;w.x=f.x,w.y=f.y;var T,A=o.st?new Float32Array(y/3*2):void 0;o.normal&&(T=_&&d&&!m?s.attributes.normal.values:new Float32Array(y));var x=o.tangent?new Float32Array(y):void 0,E=o.bitangent?new Float32Array(y):void 0,I=l?new Float32Array(y):void 0,G=0,O=0,D=F,N=M,L=R,K=!0,J=Q,X=q;if(0!==C){var $=i.Quaternion.fromAxisAngle(v._plane.normal,C,Z);J=n.Matrix3.fromQuaternion($,J),$=i.Quaternion.fromAxisAngle(v._plane.normal,-C,Z),X=n.Matrix3.fromQuaternion($,X)}else J=n.Matrix3.clone(n.Matrix3.IDENTITY,J),X=n.Matrix3.clone(n.Matrix3.IDENTITY,X);var ee=0,te=0;d&&h&&(ee=y/2,te=y/3,y/=2);for(var re=0;re<y;re+=3){var ae=r.Cartesian3.fromArray(c,re,j);if(o.st){var oe=n.Matrix3.multiplyByVector(J,ae,V);oe=P.scaleToGeodeticSurface(oe,oe);var ie=v.projectPointOntoPlane(oe,Y);a.Cartesian2.subtract(ie,w,ie);var ne=r.CesiumMath.clamp(ie.x/f.width,0,1),se=r.CesiumMath.clamp(ie.y/f.height,0,1);h&&(A[G+te]=ne,A[G+1+te]=se),d&&(A[G]=ne,A[G+1]=se),G+=2}if(o.normal||o.tangent||o.bitangent||l){var le=O+1,pe=O+2;if(m){if(re+3<y){var ue=r.Cartesian3.fromArray(c,re+3,S);if(K){var ce=r.Cartesian3.fromArray(c,re+y,B);_&&!g?H(ae,ue,ce,P):g&&(ue.z=ae.z,ce.z=ue.z-100),r.Cartesian3.subtract(ue,ae,ue),r.Cartesian3.subtract(ce,ae,ce),D=r.Cartesian3.normalize(r.Cartesian3.cross(ce,ue,D),D),K=!1}r.Cartesian3.equalsEpsilon(ue,ae,r.CesiumMath.EPSILON10)&&(K=!0)}(o.tangent||o.bitangent)&&(L=P.geodeticSurfaceNormal(ae,L),o.tangent&&(N=r.Cartesian3.normalize(r.Cartesian3.cross(L,D,N),N)))}else D=g?r.Cartesian3.UNIT_Z:P.geodeticSurfaceNormal(ae,D),(o.tangent||o.bitangent)&&(_&&(k=r.Cartesian3.fromArray(T,O,k),z=r.Cartesian3.cross(r.Cartesian3.UNIT_Z,k,z),z=r.Cartesian3.normalize(n.Matrix3.multiplyByVector(X,z,z),z),o.bitangent&&(U=r.Cartesian3.normalize(r.Cartesian3.cross(k,z,U),U))),N=r.Cartesian3.cross(r.Cartesian3.UNIT_Z,D,N),N=r.Cartesian3.normalize(n.Matrix3.multiplyByVector(X,N,N),N),o.bitangent&&(L=r.Cartesian3.normalize(r.Cartesian3.cross(D,N,L),L)));o.normal&&(t.wall?(T[O+ee]=D.x,T[le+ee]=D.y,T[pe+ee]=D.z):h&&(T[O+ee]=-D.x,T[le+ee]=-D.y,T[pe+ee]=-D.z),(d&&!_||m)&&(T[O]=D.x,T[le]=D.y,T[pe]=D.z)),l&&(m&&(D=P.geodeticSurfaceNormal(ae,D)),I[O+ee]=-D.x,I[le+ee]=-D.y,I[pe+ee]=-D.z),o.tangent&&(t.wall?(x[O+ee]=N.x,x[le+ee]=N.y,x[pe+ee]=N.z):h&&(x[O+ee]=-N.x,x[le+ee]=-N.y,x[pe+ee]=-N.z),d&&(_?(x[O]=z.x,x[le]=z.y,x[pe]=z.z):(x[O]=N.x,x[le]=N.y,x[pe]=N.z))),o.bitangent&&(h&&(E[O+ee]=L.x,E[le+ee]=L.y,E[pe+ee]=L.z),d&&(_?(E[O]=U.x,E[le]=U.y,E[pe]=U.z):(E[O]=L.x,E[le]=L.y,E[pe]=L.z))),O+=3}}o.st&&(s.attributes.st=new u.GeometryAttribute({componentDatatype:p.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:A})),o.normal&&(s.attributes.normal=new u.GeometryAttribute({componentDatatype:p.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:T})),o.tangent&&(s.attributes.tangent=new u.GeometryAttribute({componentDatatype:p.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:x})),o.bitangent&&(s.attributes.bitangent=new u.GeometryAttribute({componentDatatype:p.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:E})),l&&(s.attributes.extrudeDirection=new u.GeometryAttribute({componentDatatype:p.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:I}))}if(t.extrude&&e.defined(t.offsetAttribute)){var ye=c.length/3,me=new Uint8Array(ye);if(t.offsetAttribute===b.GeometryOffsetAttribute.TOP)d&&h||m?me=b.arrayFill(me,1,0,ye/2):d&&(me=b.arrayFill(me,1));else{var de=t.offsetAttribute===b.GeometryOffsetAttribute.NONE?0:1;me=b.arrayFill(me,de)}s.attributes.applyOffset=new u.GeometryAttribute({componentDatatype:p.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:me})}return s}var J=new a.Cartographic,X=new a.Cartographic,$={westOverIDL:0,eastOverIDL:0},ee=new O.EllipsoidGeodesic;function te(t,o,i,n,s){if(s=e.defaultValue(s,new a.Rectangle),!e.defined(t)||t.length<3)return s.west=0,s.north=0,s.south=0,s.east=0,s;if(i===x.ArcType.RHUMB)return a.Rectangle.fromCartesianArray(t,o,s);ee.ellipsoid.equals(o)||(ee=new O.EllipsoidGeodesic(void 0,void 0,o)),s.west=Number.POSITIVE_INFINITY,s.east=Number.NEGATIVE_INFINITY,s.south=Number.POSITIVE_INFINITY,s.north=Number.NEGATIVE_INFINITY,$.westOverIDL=Number.POSITIVE_INFINITY,$.eastOverIDL=Number.NEGATIVE_INFINITY;for(var l,p=1/r.CesiumMath.chordLength(n,o.maximumRadius),u=t.length,c=o.cartesianToCartographic(t[0],X),y=J,m=1;m<u;m++)l=y,y=c,c=o.cartesianToCartographic(t[m],l),ee.setEndPoints(y,c),ae(ee,p,s,$);return l=y,y=c,c=o.cartesianToCartographic(t[0],l),ee.setEndPoints(y,c),ae(ee,p,s,$),s.east-s.west>$.eastOverIDL-$.westOverIDL&&(s.west=$.westOverIDL,s.east=$.eastOverIDL,s.east>r.CesiumMath.PI&&(s.east=s.east-r.CesiumMath.TWO_PI),s.west>r.CesiumMath.PI&&(s.west=s.west-r.CesiumMath.TWO_PI)),s}var re=new a.Cartographic;function ae(e,t,a,o){for(var i=e.surfaceDistance,n=Math.ceil(i*t),s=n>0?i/(n-1):Number.POSITIVE_INFINITY,l=0,p=0;p<n;p++){var u=e.interpolateUsingSurfaceDistance(l,re);l+=s;var c=u.longitude,y=u.latitude;a.west=Math.min(a.west,c),a.east=Math.max(a.east,c),a.south=Math.min(a.south,y),a.north=Math.max(a.north,y);var m=c>=0?c:c+r.CesiumMath.TWO_PI;o.westOverIDL=Math.min(o.westOverIDL,m),o.eastOverIDL=Math.max(o.eastOverIDL,m)}}var oe=[];function ie(e,t,a,o,i,n,s,l,p,u){var c,y={walls:[]};if(n||s){var m,d,h=G.PolygonGeometryLibrary.createGeometryFromPositions(e,t,a,i,l,p,u),f=h.attributes.position.values,b=h.indices;if(n&&s){var P=f.concat(f);m=P.length/3,d=g.IndexDatatype.createTypedArray(m,2*b.length),d.set(b);var _=b.length,w=m/2;for(c=0;c<_;c+=3){var T=d[c]+w,x=d[c+1]+w,E=d[c+2]+w;d[c+_]=E,d[c+1+_]=x,d[c+2+_]=T}if(h.attributes.position.values=P,i&&l.normal){var O=h.attributes.normal.values;h.attributes.normal.values=new Float32Array(P.length),h.attributes.normal.values.set(O)}h.indices=d}else if(s){for(m=f.length/3,d=g.IndexDatatype.createTypedArray(m,b.length),c=0;c<b.length;c+=3)d[c]=b[c+2],d[c+1]=b[c+1],d[c+2]=b[c];h.indices=d}y.topAndBottom=new C.GeometryInstance({geometry:h})}var D,N=o.outerRing;D=u?v.Plane.fromPointNormal(N[0],r.Cartesian3.UNIT_Z):A.EllipsoidTangentPlane.fromPoints(N,e);var H=D.projectPointsOntoPlane(N,oe),L=I.PolygonPipeline.computeWindingOrder2D(H);L===I.WindingOrder.CLOCKWISE&&(N=N.slice().reverse());var V=G.PolygonGeometryLibrary.computeWallGeometry(N,e,a,i,p,u);y.walls.push(new C.GeometryInstance({geometry:V}));var F=o.holes;for(c=0;c<F.length;c++){var M=F[c];D=u?v.Plane.fromPointNormal(M[0],r.Cartesian3.UNIT_Z):A.EllipsoidTangentPlane.fromPoints(M,e),H=D.projectPointsOntoPlane(M,oe),L=I.PolygonPipeline.computeWindingOrder2D(H),L===I.WindingOrder.COUNTER_CLOCKWISE&&(M=M.slice().reverse()),V=G.PolygonGeometryLibrary.computeWallGeometry(M,e,a,i,p,u),y.walls.push(new C.GeometryInstance({geometry:V}))}return y}function ne(o){if(t.Check.typeOf.object("options",o),t.Check.typeOf.object("options.polygonHierarchy",o.polygonHierarchy),e.defined(o.perPositionHeight)&&o.perPositionHeight&&e.defined(o.height))throw new t.DeveloperError("Cannot use both options.perPositionHeight and options.height");if(e.defined(o.arcType)&&o.arcType!==x.ArcType.GEODESIC&&o.arcType!==x.ArcType.RHUMB)throw new t.DeveloperError("Invalid arcType. Valid options are ArcType.GEODESIC and ArcType.RHUMB.");var i=o.polygonHierarchy,n=e.defaultValue(o.vertexFormat,P.VertexFormat.DEFAULT),s=e.defaultValue(o.ellipsoid,a.Ellipsoid.WGS84),l=e.defaultValue(o.granularity,r.CesiumMath.RADIANS_PER_DEGREE),p=e.defaultValue(o.stRotation,0),u=e.defaultValue(o.perPositionHeight,!1),c=u&&e.defined(o.extrudedHeight),y=e.defaultValue(o.height,0),m=e.defaultValue(o.extrudedHeight,y);if(!c){var d=Math.max(y,m);m=Math.min(y,m),y=d}this._vertexFormat=P.VertexFormat.clone(n),this._ellipsoid=a.Ellipsoid.clone(s),this._granularity=l,this._stRotation=p,this._height=y,this._extrudedHeight=m,this._closeTop=e.defaultValue(o.closeTop,!0),this._closeBottom=e.defaultValue(o.closeBottom,!0),this._polygonHierarchy=i,this._perPositionHeight=u,this._perPositionHeightExtrude=c,this._shadowVolume=e.defaultValue(o.shadowVolume,!1),this._workerName="createPolygonGeometry",this._offsetAttribute=o.offsetAttribute,this._arcType=e.defaultValue(o.arcType,x.ArcType.GEODESIC),this._rectangle=void 0,this._textureCoordinateRotationPoints=void 0,this.packedLength=G.PolygonGeometryLibrary.computeHierarchyPackedLength(i)+a.Ellipsoid.packedLength+P.VertexFormat.packedLength+12}ne.fromPositions=function(r){r=e.defaultValue(r,e.defaultValue.EMPTY_OBJECT),t.Check.defined("options.positions",r.positions);var a={polygonHierarchy:{positions:r.positions},height:r.height,extrudedHeight:r.extrudedHeight,vertexFormat:r.vertexFormat,stRotation:r.stRotation,ellipsoid:r.ellipsoid,granularity:r.granularity,perPositionHeight:r.perPositionHeight,closeTop:r.closeTop,closeBottom:r.closeBottom,offsetAttribute:r.offsetAttribute,arcType:r.arcType};return new ne(a)},ne.createBorderLine=function(e){let t,a,i=e.positions,n=e.height;if(!0===e.compressPlane){let e=1/0;i.forEach((t=>{e=Math.min(e,t.z)})),t=i.map((t=>new r.Cartesian3(t.x,t.y,e+n))),a=i.map((t=>new r.Cartesian3(t.x,t.y,e)))}else t=i.map((e=>new r.Cartesian3(e.x,e.y,e.z+n))),a=i.map((e=>new r.Cartesian3(e.x,e.y,e.z)));let s=[...a,...t],l=[];s.forEach((e=>{l.push(e.x,e.y,e.z)}));let m=[];t.pop(),t.forEach(((e,t)=>{m.push(t,t+1)})),m.push(t.length,0);let d=a.length,h=m.map((e=>e+d));m.push(...h),h.forEach((e=>{m.push(e-d,e)}));let g=o.BoundingSphere.fromPoints(i),f=new u.Geometry({attributes:new y.GeometryAttributes({position:new u.GeometryAttribute({values:new Float64Array(l),componentsPerAttribute:3,componentDatatype:p.ComponentDatatype.DOUBLE})}),indices:new Uint16Array(m),primitiveType:c.PrimitiveType.LINES,boundingSphere:g});return f},ne.fromPositionsPlaneMode=function(e){let t,a,i=e.positions,n=e.height,s=new Array(2*i.length);i.forEach(((e,t)=>{s[2*t]=e.x,s[2*t+1]=e.y}));let l=I.earcut(s);if(!0===e.compressPlane){let e=1/0;i.forEach((t=>{e=Math.min(e,t.z)})),t=i.map((t=>new r.Cartesian3(t.x,t.y,e+n))),a=i.map((t=>new r.Cartesian3(t.x,t.y,e)))}else t=i.map((e=>new r.Cartesian3(e.x,e.y,e.z+n))),a=i.map((e=>new r.Cartesian3(e.x,e.y,e.z)));let m=[...a],d=[...l.slice().reverse()];if(e.height){let e=a.length;a.forEach(((t,r)=>{r+1===e?d.push(r,0,e,r,e,r+e):d.push(r,r+1,r+e+1,r,r+e+1,r+e)})),m.push(...t);let r=l.map((t=>t+e));d.push(...r)}let h=new Array(3*m.length);m.forEach(((e,t)=>{h[3*t]=e.x,h[3*t+1]=e.y,h[3*t+2]=e.z}));let g=o.BoundingSphere.fromPoints(i);o.BoundingSphere.expandDistance(g,n/2,r.Cartesian3.UNIT_Z,g);let f=new u.Geometry({attributes:new y.GeometryAttributes({position:new u.GeometryAttribute({values:new Float64Array(h),componentsPerAttribute:3,componentDatatype:p.ComponentDatatype.DOUBLE})}),indices:new Uint16Array(d),primitiveType:c.PrimitiveType.TRIANGLES,boundingSphere:g});return f},ne.pack=function(r,o,i){return t.Check.typeOf.object("value",r),t.Check.defined("array",o),i=e.defaultValue(i,0),i=G.PolygonGeometryLibrary.packPolygonHierarchy(r._polygonHierarchy,o,i),a.Ellipsoid.pack(r._ellipsoid,o,i),ne.isPlaneMode?(o[i++]=0,o[i++]=0,o[i++]=1):i+=a.Ellipsoid.packedLength,P.VertexFormat.pack(r._vertexFormat,o,i),i+=P.VertexFormat.packedLength,o[i++]=r._height,o[i++]=r._extrudedHeight,o[i++]=r._granularity,o[i++]=r._stRotation,o[i++]=r._perPositionHeightExtrude?1:0,o[i++]=r._perPositionHeight?1:0,o[i++]=r._closeTop?1:0,o[i++]=r._closeBottom?1:0,o[i++]=r._shadowVolume?1:0,o[i++]=e.defaultValue(r._offsetAttribute,-1),o[i++]=r._arcType,o[i]=r.packedLength,o};var se=a.Ellipsoid.clone(a.Ellipsoid.UNIT_SPHERE),le=new P.VertexFormat,pe={polygonHierarchy:{}};function ue(e){var t=-e._stRotation;if(0===t)return[0,0,0,1,1,0];var r=e._ellipsoid,a=e._polygonHierarchy.positions,o=e.rectangle;return u.Geometry._textureCoordinateRotationPoints(a,t,r,o)}function ce(t,r){return e.defined(r)&&(t=ne.unpack(t,r)),t._ellipsoid=a.Ellipsoid.clone(t._ellipsoid),ne.createGeometry(t)}return ne.unpack=function(r,o,i){t.Check.defined("array",r),o=e.defaultValue(o,0);var n=G.PolygonGeometryLibrary.unpackPolygonHierarchy(r,o);o=n.startingIndex,delete n.startingIndex;let s=0===r[o+1];var l=a.Ellipsoid.unpack(r,o,se);o+=a.Ellipsoid.packedLength;var p=P.VertexFormat.unpack(r,o,le);o+=P.VertexFormat.packedLength;var u=r[o++],c=r[o++],y=r[o++],m=r[o++],d=1===r[o++],h=1===r[o++],g=1===r[o++],f=1===r[o++],v=1===r[o++],b=r[o++],C=r[o++],_=r[o];return e.defined(i)||(i=new ne(pe)),i._polygonHierarchy=n,i._ellipsoid=a.Ellipsoid.clone(l,i._ellipsoid),i._vertexFormat=P.VertexFormat.clone(p,i._vertexFormat),i._height=u,i._extrudedHeight=c,i._granularity=y,i._stRotation=m,i._perPositionHeightExtrude=d,i._perPositionHeight=h,i._closeTop=g,i._closeBottom=f,i._shadowVolume=v,i._isPlaneMode=s,i._offsetAttribute=-1===b?void 0:b,i._arcType=C,i.packedLength=_,i},ne.computeRectangle=function(o,i){t.Check.typeOf.object("options",o),t.Check.typeOf.object("options.polygonHierarchy",o.polygonHierarchy);var n=e.defaultValue(o.granularity,r.CesiumMath.RADIANS_PER_DEGREE),s=e.defaultValue(o.arcType,x.ArcType.GEODESIC);if(s!==x.ArcType.GEODESIC&&s!==x.ArcType.RHUMB)throw new t.DeveloperError("Invalid arcType. Valid options are ArcType.GEODESIC and ArcType.RHUMB.");var l=o.polygonHierarchy,p=e.defaultValue(o.ellipsoid,a.Ellipsoid.WGS84);return te(l.positions,p,s,n,i)},ne.createGeometry=function(t){var a=t._vertexFormat,i=t._ellipsoid,n=t._granularity,s=t._stRotation,l=t._polygonHierarchy,c=t._perPositionHeight,y=t._closeTop,m=t._closeBottom,h=t._arcType;let f=t._isPlaneMode;var P=l.positions;if(!(P.length<3)){var _;_=f?v.Plane.fromPointNormal(P[0],r.Cartesian3.UNIT_Z):A.EllipsoidTangentPlane.fromPoints(P,i);var w=G.PolygonGeometryLibrary.polygonsFromHierarchy(l,f?void 0:_.projectPointsOntoPlane.bind(_),!c,i),T=w.hierarchy,x=w.polygons;if(0!==T.length){var E;P=T[0].outerRing,E=f?G.PolygonGeometryLibrary.computeBoundingRectanglePlaneMode(P,L):G.PolygonGeometryLibrary.computeBoundingRectangle(_.plane.normal,_.projectPointOntoPlane.bind(_),P,s,L);var O,D=[],N=t._height,H=t._extrudedHeight,V=t._perPositionHeightExtrude||!r.CesiumMath.equalsEpsilon(N,H,0,r.CesiumMath.EPSILON2),F={perPositionHeight:c,vertexFormat:a,geometry:void 0,tangentPlane:_,boundingRectangle:E,ellipsoid:i,stRotation:s,bottom:!1,top:!0,wall:!1,extrude:!1,arcType:h,isPlaneMode:f};if(V)for(F.extrude=!0,F.top=y,F.bottom=m,F.shadowVolume=t._shadowVolume,F.offsetAttribute=t._offsetAttribute,O=0;O<x.length;O++){var M,R=ie(i,x[O],n,T[O],c,y,m,a,h,f);y&&m?(M=R.topAndBottom,F.geometry=G.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(M.geometry,N,H,i,c,f)):y?(M=R.topAndBottom,M.geometry.attributes.position.values=I.PolygonPipeline.scaleToGeodeticHeight(M.geometry.attributes.position.values,N,i,!c,f),F.geometry=M.geometry):m&&(M=R.topAndBottom,M.geometry.attributes.position.values=I.PolygonPipeline.scaleToGeodeticHeight(M.geometry.attributes.position.values,H,i,!0,f),F.geometry=M.geometry),(y||m)&&(F.wall=!1,M.geometry=K(F),D.push(M));var S=R.walls;F.wall=!0;for(var B=0;B<S.length;B++){var k=S[B];F.geometry=G.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(k.geometry,N,H,i,c,f),k.geometry=K(F),D.push(k)}}else for(O=0;O<x.length;O++){var z=new C.GeometryInstance({geometry:G.PolygonGeometryLibrary.createGeometryFromPositions(i,x[O],n,c,a,h,f)});if(z.geometry.attributes.position.values=I.PolygonPipeline.scaleToGeodeticHeight(z.geometry.attributes.position.values,N,i,!c,f),F.geometry=z.geometry,z.geometry=K(F),e.defined(t._offsetAttribute)){var U=z.geometry.attributes.position.values.length,W=new Uint8Array(U/3),Y=t._offsetAttribute===b.GeometryOffsetAttribute.NONE?0:1;b.arrayFill(W,Y),z.geometry.attributes.applyOffset=new u.GeometryAttribute({componentDatatype:p.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:W})}D.push(z)}var j=d.GeometryPipeline.combineInstances(D)[0];j.attributes.position.values=new Float64Array(j.attributes.position.values),j.indices=g.IndexDatatype.createTypedArray(j.attributes.position.values.length/3,j.indices);var Z=j.attributes,Q=o.BoundingSphere.fromVertices(Z.position.values);return a.position||delete Z.position,new u.Geometry({attributes:Z,indices:j.indices,primitiveType:j.primitiveType,boundingSphere:Q,offsetAttribute:t._offsetAttribute})}}},ne.createShadowVolume=function(e,t,r){var a=e._granularity,o=e._ellipsoid,i=t(a,o),n=r(a,o);return new ne({polygonHierarchy:e._polygonHierarchy,ellipsoid:o,stRotation:e._stRotation,granularity:a,perPositionHeight:!1,extrudedHeight:i,height:n,vertexFormat:P.VertexFormat.POSITION_ONLY,shadowVolume:!0,arcType:e._arcType})},Object.defineProperties(ne.prototype,{rectangle:{get:function(){if(!e.defined(this._rectangle)){var t=this._polygonHierarchy.positions;this._rectangle=te(t,this._ellipsoid,this._arcType,this._granularity)}return this._rectangle}},textureCoordinateRotationPoints:{get:function(){return e.defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=ue(this)),this._textureCoordinateRotationPoints}}}),ce}));