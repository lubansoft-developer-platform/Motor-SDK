define(["./when-52cea266","./Check-ee5dd8a8","./Cartesian2-7c55a82d","./Rectangle-88e14f21","./BoundingSphere-f5553fb7","./Transforms-d0762529","./Matrix4-da50dd55","./RuntimeError-02840484","./WebGLConstants-52779751","./ComponentDatatype-fc6a16e1","./GeometryAttribute-60495dd3","./PrimitiveType-875d1f73","./GeometryAttributes-769ca2c2","./GeometryOffsetAttribute-85385f9c"],(function(e,t,n,a,r,i,o,u,s,f,m,c,d,y){"use strict";var p=new n.Cartesian3;function C(a){a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT);var r=a.minimum,i=a.maximum;if(t.Check.typeOf.object("min",r),t.Check.typeOf.object("max",i),e.defined(a.offsetAttribute)&&a.offsetAttribute===y.GeometryOffsetAttribute.TOP)throw new t.DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._min=n.Cartesian3.clone(r),this._max=n.Cartesian3.clone(i),this._offsetAttribute=a.offsetAttribute,this._workerName="createBoxOutlineGeometry"}C.fromDimensions=function(a){a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT);var r=a.dimensions;t.Check.typeOf.object("dimensions",r),t.Check.typeOf.number.greaterThanOrEquals("dimensions.x",r.x,0),t.Check.typeOf.number.greaterThanOrEquals("dimensions.y",r.y,0),t.Check.typeOf.number.greaterThanOrEquals("dimensions.z",r.z,0);var i=n.Cartesian3.multiplyByScalar(r,.5,new n.Cartesian3);return new C({minimum:n.Cartesian3.negate(i,new n.Cartesian3),maximum:i,offsetAttribute:a.offsetAttribute})},C.fromAxisAlignedBoundingBox=function(e){return t.Check.typeOf.object("boundindBox",e),new C({minimum:e.minimum,maximum:e.maximum})},C.packedLength=2*n.Cartesian3.packedLength+1,C.pack=function(a,r,i){return t.Check.typeOf.object("value",a),t.Check.defined("array",r),i=e.defaultValue(i,0),n.Cartesian3.pack(a._min,r,i),n.Cartesian3.pack(a._max,r,i+n.Cartesian3.packedLength),r[i+2*n.Cartesian3.packedLength]=e.defaultValue(a._offsetAttribute,-1),r};var b=new n.Cartesian3,l=new n.Cartesian3,h={minimum:b,maximum:l,offsetAttribute:void 0};function A(t,n){return e.defined(n)&&(t=C.unpack(t,n)),C.createGeometry(t)}return C.unpack=function(a,r,i){t.Check.defined("array",a),r=e.defaultValue(r,0);var o=n.Cartesian3.unpack(a,r,b),u=n.Cartesian3.unpack(a,r+n.Cartesian3.packedLength,l),s=a[r+2*n.Cartesian3.packedLength];return e.defined(i)?(i._min=n.Cartesian3.clone(o,i._min),i._max=n.Cartesian3.clone(u,i._max),i._offsetAttribute=-1===s?void 0:s,i):(h.offsetAttribute=-1===s?void 0:s,new C(h))},C.createGeometry=function(t){var a=t._min,i=t._max;if(!n.Cartesian3.equals(a,i)){var o=new d.GeometryAttributes,u=new Uint16Array(24),s=new Float64Array(24);s[0]=a.x,s[1]=a.y,s[2]=a.z,s[3]=i.x,s[4]=a.y,s[5]=a.z,s[6]=i.x,s[7]=i.y,s[8]=a.z,s[9]=a.x,s[10]=i.y,s[11]=a.z,s[12]=a.x,s[13]=a.y,s[14]=i.z,s[15]=i.x,s[16]=a.y,s[17]=i.z,s[18]=i.x,s[19]=i.y,s[20]=i.z,s[21]=a.x,s[22]=i.y,s[23]=i.z,o.position=new m.GeometryAttribute({componentDatatype:f.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:s}),u[0]=4,u[1]=5,u[2]=5,u[3]=6,u[4]=6,u[5]=7,u[6]=7,u[7]=4,u[8]=0,u[9]=1,u[10]=1,u[11]=2,u[12]=2,u[13]=3,u[14]=3,u[15]=0,u[16]=0,u[17]=4,u[18]=1,u[19]=5,u[20]=2,u[21]=6,u[22]=3,u[23]=7;var C=n.Cartesian3.subtract(i,a,p),b=.5*n.Cartesian3.magnitude(C);if(e.defined(t._offsetAttribute)){var l=s.length,h=new Uint8Array(l/3),A=t._offsetAttribute===y.GeometryOffsetAttribute.NONE?0:1;y.arrayFill(h,A),o.applyOffset=new m.GeometryAttribute({componentDatatype:f.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:h})}return new m.Geometry({attributes:o,indices:u,primitiveType:c.PrimitiveType.LINES,boundingSphere:new r.BoundingSphere(n.Cartesian3.ZERO,b),offsetAttribute:t._offsetAttribute})}},A}));