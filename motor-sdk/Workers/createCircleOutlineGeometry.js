define(["./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./BoundingSphere-37359cf8","./Transforms-6b57162d","./Matrix4-ed224189","./RuntimeError-86da6af2","./WebGLConstants-3660bc8f","./ComponentDatatype-86703c58","./GeometryAttribute-b1ed7c2e","./PrimitiveType-30fa6f85","./GeometryAttributes-9d45f9e2","./IndexDatatype-cb635cbc","./GeometryOffsetAttribute-f755a5cb","./EllipseGeometryLibrary-bc7d58c4","./EllipseOutlineGeometry-ceb0f069"],(function(e,i,t,r,n,l,s,o,a,c,d,u,m,p,y,f,G){"use strict";function h(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);var r=t.radius;i.Check.typeOf.number("radius",r);var n={center:t.center,semiMajorAxis:r,semiMinorAxis:r,ellipsoid:t.ellipsoid,height:t.height,extrudedHeight:t.extrudedHeight,granularity:t.granularity,numberOfVerticalLines:t.numberOfVerticalLines};this._ellipseGeometry=new G.EllipseOutlineGeometry(n),this._workerName="createCircleOutlineGeometry"}h.packedLength=G.EllipseOutlineGeometry.packedLength,h.pack=function(e,t,r){return i.Check.typeOf.object("value",e),G.EllipseOutlineGeometry.pack(e._ellipseGeometry,t,r)};var _=new G.EllipseOutlineGeometry({center:new t.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),b={center:new t.Cartesian3,radius:void 0,ellipsoid:r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};function g(i,n){return e.defined(n)&&(i=h.unpack(i,n)),i._ellipseGeometry._center=t.Cartesian3.clone(i._ellipseGeometry._center),i._ellipseGeometry._ellipsoid=r.Ellipsoid.clone(i._ellipseGeometry._ellipsoid),h.createGeometry(i)}return h.unpack=function(i,n,l){var s=G.EllipseOutlineGeometry.unpack(i,n,_);return b.center=t.Cartesian3.clone(s._center,b.center),b.ellipsoid=r.Ellipsoid.clone(s._ellipsoid,b.ellipsoid),b.height=s._height,b.extrudedHeight=s._extrudedHeight,b.granularity=s._granularity,b.numberOfVerticalLines=s._numberOfVerticalLines,e.defined(l)?(b.semiMajorAxis=s._semiMajorAxis,b.semiMinorAxis=s._semiMinorAxis,l._ellipseGeometry=new G.EllipseOutlineGeometry(b),l):(b.radius=s._semiMajorAxis,new h(b))},h.createGeometry=function(e){return G.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)},g}));