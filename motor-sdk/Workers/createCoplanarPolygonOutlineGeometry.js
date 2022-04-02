define(["./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./BoundingSphere-9db3442e","./Transforms-3e7152f2","./Matrix4-22b96d31","./RuntimeError-86da6af2","./WebGLConstants-3660bc8f","./ComponentDatatype-86703c58","./GeometryAttribute-98a8cf59","./PrimitiveType-30fa6f85","./GeometryAttributes-9d45f9e2","./AttributeCompression-6e02a904","./GeometryPipeline-f896c235","./EncodedCartesian3-ceea15a0","./IndexDatatype-cb635cbc","./IntersectionTests-4fa5e272","./Plane-99a0ae01","./GeometryInstance-9936ce9d","./arrayRemoveDuplicates-8b568181","./AxisAlignedBoundingBox-1aaa0e65","./EllipsoidTangentPlane-a1163ec8","./OrientedBoundingBox-b28ad40e","./CoplanarPolygonGeometryLibrary-77d7922a","./ArcType-39be7a32","./EllipsoidRhumbLine-de5cdc57","./PolygonPipeline-05839d65","./PolygonGeometryLibrary-3b97810b"],(function(e,r,t,n,o,a,i,y,c,l,p,s,d,u,f,m,g,h,b,v,P,G,C,k,L,T,E,H,A){"use strict";function w(e){for(var r=e.length,t=new Float64Array(3*r),n=g.IndexDatatype.createTypedArray(r,2*r),o=0,a=0,i=0;i<r;i++){var y=e[i];t[o++]=y.x,t[o++]=y.y,t[o++]=y.z,n[a++]=i,n[a++]=(i+1)%r}var c=new d.GeometryAttributes({position:new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:t})});return new p.Geometry({attributes:c,indices:n,primitiveType:s.PrimitiveType.LINES})}function x(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);var n=t.polygonHierarchy;r.Check.defined("options.polygonHierarchy",n),this._polygonHierarchy=n,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=A.PolygonGeometryLibrary.computeHierarchyPackedLength(n)+1}x.fromPositions=function(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT),r.Check.defined("options.positions",t.positions);var n={polygonHierarchy:{positions:t.positions}};return new x(n)},x.pack=function(t,n,o){return r.Check.typeOf.object("value",t),r.Check.defined("array",n),o=e.defaultValue(o,0),o=A.PolygonGeometryLibrary.packPolygonHierarchy(t._polygonHierarchy,n,o),n[o]=t.packedLength,n};var B={polygonHierarchy:{}};function I(r,t){return e.defined(t)&&(r=x.unpack(r,t)),r._ellipsoid=n.Ellipsoid.clone(r._ellipsoid),x.createGeometry(r)}return x.unpack=function(t,n,o){r.Check.defined("array",t),n=e.defaultValue(n,0);var a=A.PolygonGeometryLibrary.unpackPolygonHierarchy(t,n);n=a.startingIndex,delete a.startingIndex;var i=t[n];return e.defined(o)||(o=new x(B)),o._polygonHierarchy=a,o.packedLength=i,o},x.createGeometry=function(e){var r=e._polygonHierarchy,n=r.positions;if(n=P.arrayRemoveDuplicates(n,t.Cartesian3.equalsEpsilon,!0),!(n.length<3)){var a=L.CoplanarPolygonGeometryLibrary.validOutline(n);if(a){var i=A.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(r,!1);if(0!==i.length){for(var y=[],c=0;c<i.length;c++){var l=new v.GeometryInstance({geometry:w(i[c])});y.push(l)}var s=f.GeometryPipeline.combineInstances(y)[0],d=o.BoundingSphere.fromPoints(r.positions);return new p.Geometry({attributes:s.attributes,indices:s.indices,primitiveType:s.primitiveType,boundingSphere:d})}}}},I}));