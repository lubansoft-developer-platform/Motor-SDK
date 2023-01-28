define(["./when-52cea266","./Check-ee5dd8a8","./Cartesian2-7c55a82d","./Rectangle-88e14f21","./BoundingSphere-f5553fb7","./Transforms-d0762529","./Matrix4-da50dd55","./RuntimeError-02840484","./WebGLConstants-52779751","./ComponentDatatype-fc6a16e1","./GeometryAttribute-60495dd3","./PrimitiveType-875d1f73","./GeometryAttributes-769ca2c2","./AttributeCompression-7f134dfc","./GeometryPipeline-6ea6731e","./EncodedCartesian3-237542cd","./IndexDatatype-f9231b69","./IntersectionTests-ca78fc8a","./Plane-fdd70b9e","./VertexFormat-2c3e8a0a","./GeometryInstance-ed1361fd","./arrayRemoveDuplicates-64b1d558","./BoundingRectangle-c47690af","./AxisAlignedBoundingBox-08b0db17","./EllipsoidTangentPlane-64b84590","./OrientedBoundingBox-c329d289","./CoplanarPolygonGeometryLibrary-ca2a9c13","./ArcType-97079e95","./EllipsoidRhumbLine-90d09904","./PolygonPipeline-fe89e8c5","./PolygonGeometryLibrary-bf5cd66c"],(function(e,t,a,n,r,o,i,s,l,p,c,y,d,u,m,g,h,v,f,b,C,x,P,A,w,F,G,L,E,T,k){"use strict";var D=new a.Cartesian3,_=new P.BoundingRectangle,V=new a.Cartesian2,R=new a.Cartesian2,B=new a.Cartesian3,I=new a.Cartesian3,M=new a.Cartesian3,H=new a.Cartesian3,O=new a.Cartesian3,S=new a.Cartesian3,z=new o.Quaternion,N=new i.Matrix3,Q=new i.Matrix3,j=new a.Cartesian3;function U(e,t,n,r,s,l,u,m){var g=e.positions,v=T.PolygonPipeline.triangulate(e.positions2D,e.holes);v.length<3&&(v=[0,1,2]);var f=h.IndexDatatype.createTypedArray(g.length,v.length);f.set(v);var b=N;if(0!==r){var C=o.Quaternion.fromAxisAngle(l,r,z);if(b=i.Matrix3.fromQuaternion(C,b),t.tangent||t.bitangent){C=o.Quaternion.fromAxisAngle(l,-r,z);var x=i.Matrix3.fromQuaternion(C,Q);u=a.Cartesian3.normalize(i.Matrix3.multiplyByVector(x,u,u),u),t.bitangent&&(m=a.Cartesian3.normalize(a.Cartesian3.cross(l,u,m),m))}}else b=i.Matrix3.clone(i.Matrix3.IDENTITY,b);var P=R;t.st&&(P.x=n.x,P.y=n.y);for(var A=g.length,w=3*A,F=new Float64Array(w),G=t.normal?new Float32Array(w):void 0,L=t.tangent?new Float32Array(w):void 0,E=t.bitangent?new Float32Array(w):void 0,k=t.st?new Float32Array(2*A):void 0,_=0,B=0,I=0,M=0,H=0,O=0;O<A;O++){var S=g[O];if(F[_++]=S.x,F[_++]=S.y,F[_++]=S.z,t.st){var j=i.Matrix3.multiplyByVector(b,S,D),U=s(j,V);a.Cartesian2.subtract(U,P,U);var Y=a.CesiumMath.clamp(U.x/n.width,0,1),q=a.CesiumMath.clamp(U.y/n.height,0,1);k[H++]=Y,k[H++]=q}t.normal&&(G[B++]=l.x,G[B++]=l.y,G[B++]=l.z),t.tangent&&(L[M++]=u.x,L[M++]=u.y,L[M++]=u.z),t.bitangent&&(E[I++]=m.x,E[I++]=m.y,E[I++]=m.z)}var J=new d.GeometryAttributes;return t.position&&(J.position=new c.GeometryAttribute({componentDatatype:p.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:F})),t.normal&&(J.normal=new c.GeometryAttribute({componentDatatype:p.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:G})),t.tangent&&(J.tangent=new c.GeometryAttribute({componentDatatype:p.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:L})),t.bitangent&&(J.bitangent=new c.GeometryAttribute({componentDatatype:p.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:E})),t.st&&(J.st=new c.GeometryAttribute({componentDatatype:p.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:k})),new c.Geometry({attributes:J,indices:f,primitiveType:y.PrimitiveType.TRIANGLES})}function Y(a){a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT);var r=a.polygonHierarchy;t.Check.defined("options.polygonHierarchy",r);var o=e.defaultValue(a.vertexFormat,b.VertexFormat.DEFAULT);this._vertexFormat=b.VertexFormat.clone(o),this._polygonHierarchy=r,this._stRotation=e.defaultValue(a.stRotation,0),this._ellipsoid=n.Ellipsoid.clone(e.defaultValue(a.ellipsoid,n.Ellipsoid.WGS84)),this._workerName="createCoplanarPolygonGeometry",this.packedLength=k.PolygonGeometryLibrary.computeHierarchyPackedLength(r)+b.VertexFormat.packedLength+n.Ellipsoid.packedLength+2}Y.fromPositions=function(a){a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT),t.Check.defined("options.positions",a.positions);var n={polygonHierarchy:{positions:a.positions},vertexFormat:a.vertexFormat,stRotation:a.stRotation,ellipsoid:a.ellipsoid};return new Y(n)},Y.pack=function(a,r,o){return t.Check.typeOf.object("value",a),t.Check.defined("array",r),o=e.defaultValue(o,0),o=k.PolygonGeometryLibrary.packPolygonHierarchy(a._polygonHierarchy,r,o),n.Ellipsoid.pack(a._ellipsoid,r,o),o+=n.Ellipsoid.packedLength,b.VertexFormat.pack(a._vertexFormat,r,o),o+=b.VertexFormat.packedLength,r[o++]=a._stRotation,r[o]=a.packedLength,r};var q=n.Ellipsoid.clone(n.Ellipsoid.UNIT_SPHERE),J=new b.VertexFormat,W={polygonHierarchy:{}};function Z(t,a){return e.defined(a)&&(t=Y.unpack(t,a)),Y.createGeometry(t)}return Y.unpack=function(a,r,o){t.Check.defined("array",a),r=e.defaultValue(r,0);var i=k.PolygonGeometryLibrary.unpackPolygonHierarchy(a,r);r=i.startingIndex,delete i.startingIndex;var s=n.Ellipsoid.unpack(a,r,q);r+=n.Ellipsoid.packedLength;var l=b.VertexFormat.unpack(a,r,J);r+=b.VertexFormat.packedLength;var p=a[r++],c=a[r];return e.defined(o)||(o=new Y(W)),o._polygonHierarchy=i,o._ellipsoid=n.Ellipsoid.clone(s,o._ellipsoid),o._vertexFormat=b.VertexFormat.clone(l,o._vertexFormat),o._stRotation=p,o.packedLength=c,o},Y.createGeometry=function(e){var t=e._vertexFormat,n=e._polygonHierarchy,o=e._stRotation,i=n.positions;if(i=x.arrayRemoveDuplicates(i,a.Cartesian3.equalsEpsilon,!0),!(i.length<3)){var s=B,l=I,p=M,y=O,d=S,u=G.CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments(i,H,y,d);if(u){if(s=a.Cartesian3.cross(y,d,s),s=a.Cartesian3.normalize(s,s),!a.Cartesian3.equalsEpsilon(H,a.Cartesian3.ZERO,a.CesiumMath.EPSILON6)){var g=e._ellipsoid.geodeticSurfaceNormal(H,j);a.Cartesian3.dot(s,g)<0&&(s=a.Cartesian3.negate(s,s),y=a.Cartesian3.negate(y,y))}var v=G.CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction(H,y,d),f=G.CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction(H,y,d);t.tangent&&(l=a.Cartesian3.clone(y,l)),t.bitangent&&(p=a.Cartesian3.clone(d,p));var b=k.PolygonGeometryLibrary.polygonsFromHierarchy(n,v,!1),P=b.hierarchy,A=b.polygons;if(0!==P.length){i=P[0].outerRing;for(var w=r.BoundingSphere.fromPoints(i),F=k.PolygonGeometryLibrary.computeBoundingRectangle(s,f,i,o,_),L=[],E=0;E<A.length;E++){var T=new C.GeometryInstance({geometry:U(A[E],t,F,o,f,s,l,p)});L.push(T)}var D=m.GeometryPipeline.combineInstances(L)[0];D.attributes.position.values=new Float64Array(D.attributes.position.values),D.indices=h.IndexDatatype.createTypedArray(D.attributes.position.values.length/3,D.indices);var V=D.attributes;return t.position||delete V.position,new c.Geometry({attributes:V,indices:D.indices,primitiveType:D.primitiveType,boundingSphere:w})}}}},Z}));