define(["./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./BoundingSphere-9db3442e","./Transforms-3e7152f2","./Matrix4-22b96d31","./RuntimeError-86da6af2","./WebGLConstants-3660bc8f","./ComponentDatatype-86703c58","./GeometryAttribute-98a8cf59","./PrimitiveType-30fa6f85","./GeometryAttributes-9d45f9e2","./IndexDatatype-cb635cbc","./GeometryOffsetAttribute-f755a5cb","./EllipsoidOutlineGeometry-dd2de5b7"],(function(e,i,t,r,n,a,o,s,d,l,c,u,p,f,m,y){"use strict";function G(i){var r=e.defaultValue(i.radius,1),n=new t.Cartesian3(r,r,r),a={radii:n,stackPartitions:i.stackPartitions,slicePartitions:i.slicePartitions,subdivisions:i.subdivisions};this._ellipsoidGeometry=new y.EllipsoidOutlineGeometry(a),this._workerName="createSphereOutlineGeometry"}G.packedLength=y.EllipsoidOutlineGeometry.packedLength,G.pack=function(e,t,r){return i.Check.typeOf.object("value",e),y.EllipsoidOutlineGeometry.pack(e._ellipsoidGeometry,t,r)};var b=new y.EllipsoidOutlineGeometry,k={radius:void 0,radii:new t.Cartesian3,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0};function v(i,t){return e.defined(t)&&(i=G.unpack(i,t)),G.createGeometry(i)}return G.unpack=function(i,r,n){var a=y.EllipsoidOutlineGeometry.unpack(i,r,b);return k.stackPartitions=a._stackPartitions,k.slicePartitions=a._slicePartitions,k.subdivisions=a._subdivisions,e.defined(n)?(t.Cartesian3.clone(a._radii,k.radii),n._ellipsoidGeometry=new y.EllipsoidOutlineGeometry(k),n):(k.radius=a._radii.x,new G(k))},G.createGeometry=function(e){return y.EllipsoidOutlineGeometry.createGeometry(e._ellipsoidGeometry)},v}));