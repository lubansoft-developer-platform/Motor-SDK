define(["./when-45f3d25d","./Check-34538dad","./Cartesian3-e69091b9","./Cartesian2-7a44370a","./BoundingSphere-bacc5cb6","./Matrix4-c65e6a1b","./RuntimeError-86da6af2","./Rectangle-c7d55cfa","./WebGLConstants-3660bc8f","./ComponentDatatype-86703c58","./GeometryAttribute-4777d9f4","./PrimitiveType-30fa6f85","./Transforms-68229cf3","./GeometryAttributes-9d45f9e2","./AttributeCompression-1e177d5e","./GeometryPipeline-fd2a775d","./EncodedCartesian3-7b803d4a","./IndexDatatype-e52361bd","./IntersectionTests-e782669d","./Plane-18e7e6e4","./GeometryInstance-734856d8","./arrayRemoveDuplicates-24a803e7","./EllipsoidTangentPlane-c9b5e9c5","./OrientedBoundingBox-1e79d8b2","./CoplanarPolygonGeometryLibrary-53dfda51","./ArcType-39be7a32","./EllipsoidRhumbLine-4bc7760a","./PolygonPipeline-d8c5b0db","./PolygonGeometryLibrary-a240210e"],(function(e,r,t,n,o,a,i,y,c,l,p,d,s,u,m,f,g,h,b,v,P,G,C,k,L,T,E,H,w){"use strict";function A(e){for(var r=e.length,t=new Float64Array(3*r),n=h.IndexDatatype.createTypedArray(r,2*r),o=0,a=0,i=0;i<r;i++){var y=e[i];t[o++]=y.x,t[o++]=y.y,t[o++]=y.z,n[a++]=i,n[a++]=(i+1)%r}var c=new u.GeometryAttributes({position:new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:t})});return new p.Geometry({attributes:c,indices:n,primitiveType:d.PrimitiveType.LINES})}function I(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);var n=t.polygonHierarchy;r.Check.defined("options.polygonHierarchy",n),this._polygonHierarchy=n,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=w.PolygonGeometryLibrary.computeHierarchyPackedLength(n)+1}I.fromPositions=function(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT),r.Check.defined("options.positions",t.positions);var n={polygonHierarchy:{positions:t.positions}};return new I(n)},I.pack=function(t,n,o){return r.Check.typeOf.object("value",t),r.Check.defined("array",n),o=e.defaultValue(o,0),o=w.PolygonGeometryLibrary.packPolygonHierarchy(t._polygonHierarchy,n,o),n[o]=t.packedLength,n};var _={polygonHierarchy:{}};function D(r,t){return e.defined(t)&&(r=I.unpack(r,t)),r._ellipsoid=n.Ellipsoid.clone(r._ellipsoid),I.createGeometry(r)}return I.unpack=function(t,n,o){r.Check.defined("array",t),n=e.defaultValue(n,0);var a=w.PolygonGeometryLibrary.unpackPolygonHierarchy(t,n);n=a.startingIndex,delete a.startingIndex;var i=t[n];return e.defined(o)||(o=new I(_)),o._polygonHierarchy=a,o.packedLength=i,o},I.createGeometry=function(e){var r=e._polygonHierarchy,n=r.positions;if(n=G.arrayRemoveDuplicates(n,t.Cartesian3.equalsEpsilon,!0),!(n.length<3)){var a=L.CoplanarPolygonGeometryLibrary.validOutline(n);if(a){var i=w.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(r,!1);if(0!==i.length){for(var y=[],c=0;c<i.length;c++){var l=new P.GeometryInstance({geometry:A(i[c])});y.push(l)}var d=f.GeometryPipeline.combineInstances(y)[0],s=o.BoundingSphere.fromPoints(r.positions);return new p.Geometry({attributes:d.attributes,indices:d.indices,primitiveType:d.primitiveType,boundingSphere:s})}}}},D}));