define(["./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./BoundingSphere-9db3442e","./Transforms-3e7152f2","./Matrix4-22b96d31","./RuntimeError-86da6af2","./WebGLConstants-3660bc8f","./ComponentDatatype-86703c58","./GeometryAttribute-98a8cf59","./PrimitiveType-30fa6f85","./GeometryAttributes-9d45f9e2"],(function(e,t,n,r,a,i,o,u,c,d,f,y,s){"use strict";function p(){this._workerName="createPlaneOutlineGeometry"}p.packedLength=0,p.pack=function(e,n){return t.Check.defined("value",e),t.Check.defined("array",n),n},p.unpack=function(n,r,a){return t.Check.defined("array",n),e.defined(a)?a:new p};var m=new n.Cartesian3(-.5,-.5,0),b=new n.Cartesian3(.5,.5,0);function C(t,n){return e.defined(n)&&(t=p.unpack(t,n)),p.createGeometry(t)}return p.createGeometry=function(){var e=new s.GeometryAttributes,t=new Uint16Array(8),r=new Float64Array(12);return r[0]=m.x,r[1]=m.y,r[2]=m.z,r[3]=b.x,r[4]=m.y,r[5]=m.z,r[6]=b.x,r[7]=b.y,r[8]=m.z,r[9]=m.x,r[10]=b.y,r[11]=m.z,e.position=new f.GeometryAttribute({componentDatatype:d.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:r}),t[0]=0,t[1]=1,t[2]=1,t[3]=2,t[4]=2,t[5]=3,t[6]=3,t[7]=0,new f.Geometry({attributes:e,indices:t,primitiveType:y.PrimitiveType.LINES,boundingSphere:new a.BoundingSphere(n.Cartesian3.ZERO,Math.sqrt(2))})},C}));