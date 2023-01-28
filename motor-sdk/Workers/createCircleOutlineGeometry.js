define(["./when-52cea266","./Check-ee5dd8a8","./Cartesian2-7c55a82d","./Rectangle-88e14f21","./BoundingSphere-f5553fb7","./Transforms-d0762529","./Matrix4-da50dd55","./RuntimeError-02840484","./WebGLConstants-52779751","./ComponentDatatype-fc6a16e1","./GeometryAttribute-60495dd3","./PrimitiveType-875d1f73","./GeometryAttributes-769ca2c2","./IndexDatatype-f9231b69","./GeometryOffsetAttribute-85385f9c","./EllipseGeometryLibrary-43cfd296","./EllipseOutlineGeometry-51409f1b"],(function(e,i,t,r,n,l,s,o,a,d,u,c,m,p,y,f,G){"use strict";function h(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);var r=t.radius;i.Check.typeOf.number("radius",r);var n={center:t.center,semiMajorAxis:r,semiMinorAxis:r,ellipsoid:t.ellipsoid,height:t.height,extrudedHeight:t.extrudedHeight,granularity:t.granularity,numberOfVerticalLines:t.numberOfVerticalLines};this._ellipseGeometry=new G.EllipseOutlineGeometry(n),this._workerName="createCircleOutlineGeometry"}h.packedLength=G.EllipseOutlineGeometry.packedLength,h.pack=function(e,t,r){return i.Check.typeOf.object("value",e),G.EllipseOutlineGeometry.pack(e._ellipseGeometry,t,r)};var _=new G.EllipseOutlineGeometry({center:new t.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),g={center:new t.Cartesian3,radius:void 0,ellipsoid:r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};function x(i,n){return e.defined(n)&&(i=h.unpack(i,n)),i._ellipseGeometry._center=t.Cartesian3.clone(i._ellipseGeometry._center),i._ellipseGeometry._ellipsoid=r.Ellipsoid.clone(i._ellipseGeometry._ellipsoid),h.createGeometry(i)}return h.unpack=function(i,n,l){var s=G.EllipseOutlineGeometry.unpack(i,n,_);return g.center=t.Cartesian3.clone(s._center,g.center),g.ellipsoid=r.Ellipsoid.clone(s._ellipsoid,g.ellipsoid),g.height=s._height,g.extrudedHeight=s._extrudedHeight,g.granularity=s._granularity,g.numberOfVerticalLines=s._numberOfVerticalLines,e.defined(l)?(g.semiMajorAxis=s._semiMajorAxis,g.semiMinorAxis=s._semiMinorAxis,l._ellipseGeometry=new G.EllipseOutlineGeometry(g),l):(g.radius=s._semiMajorAxis,new h(g))},h.createGeometry=function(e){return G.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)},x}));