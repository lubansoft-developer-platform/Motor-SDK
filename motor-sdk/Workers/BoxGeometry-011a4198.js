define(["exports","./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./BoundingSphere-f8921934","./ComponentDatatype-86703c58","./GeometryAttribute-19962690","./PrimitiveType-30fa6f85","./GeometryAttributes-9d45f9e2","./GeometryOffsetAttribute-f755a5cb","./VertexFormat-a00562ee"],(function(e,t,a,n,r,i,o,m,u,s,y){"use strict";var f=new n.Cartesian3;function p(e){e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT);var r=e.minimum,i=e.maximum;if(a.Check.typeOf.object("min",r),a.Check.typeOf.object("max",i),t.defined(e.offsetAttribute)&&e.offsetAttribute===s.GeometryOffsetAttribute.TOP)throw new a.DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");var o=t.defaultValue(e.vertexFormat,y.VertexFormat.DEFAULT);this._minimum=n.Cartesian3.clone(r),this._maximum=n.Cartesian3.clone(i),this._vertexFormat=o,this._offsetAttribute=e.offsetAttribute,this._workerName="createBoxGeometry"}p.fromDimensions=function(e){e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT);var r=e.dimensions;a.Check.typeOf.object("dimensions",r),a.Check.typeOf.number.greaterThanOrEquals("dimensions.x",r.x,0),a.Check.typeOf.number.greaterThanOrEquals("dimensions.y",r.y,0),a.Check.typeOf.number.greaterThanOrEquals("dimensions.z",r.z,0);var i=n.Cartesian3.multiplyByScalar(r,.5,new n.Cartesian3);return new p({minimum:n.Cartesian3.negate(i,new n.Cartesian3),maximum:i,vertexFormat:e.vertexFormat,offsetAttribute:e.offsetAttribute})},p.fromAxisAlignedBoundingBox=function(e){return a.Check.typeOf.object("boundingBox",e),new p({minimum:e.minimum,maximum:e.maximum})},p.packedLength=2*n.Cartesian3.packedLength+y.VertexFormat.packedLength+1,p.pack=function(e,r,i){return a.Check.typeOf.object("value",e),a.Check.defined("array",r),i=t.defaultValue(i,0),n.Cartesian3.pack(e._minimum,r,i),n.Cartesian3.pack(e._maximum,r,i+n.Cartesian3.packedLength),y.VertexFormat.pack(e._vertexFormat,r,i+2*n.Cartesian3.packedLength),r[i+2*n.Cartesian3.packedLength+y.VertexFormat.packedLength]=t.defaultValue(e._offsetAttribute,-1),r};var c,x=new n.Cartesian3,d=new n.Cartesian3,b=new y.VertexFormat,A={minimum:x,maximum:d,vertexFormat:b,offsetAttribute:void 0};p.unpack=function(e,r,i){a.Check.defined("array",e),r=t.defaultValue(r,0);var o=n.Cartesian3.unpack(e,r,x),m=n.Cartesian3.unpack(e,r+n.Cartesian3.packedLength,d),u=y.VertexFormat.unpack(e,r+2*n.Cartesian3.packedLength,b),s=e[r+2*n.Cartesian3.packedLength+y.VertexFormat.packedLength];return t.defined(i)?(i._minimum=n.Cartesian3.clone(o,i._minimum),i._maximum=n.Cartesian3.clone(m,i._maximum),i._vertexFormat=y.VertexFormat.clone(u,i._vertexFormat),i._offsetAttribute=-1===s?void 0:s,i):(A.offsetAttribute=-1===s?void 0:s,new p(A))},p.createGeometry=function(e){var a=e._minimum,y=e._maximum,p=e._vertexFormat;if(!n.Cartesian3.equals(a,y)){var c,x,d=new u.GeometryAttributes;if(p.position&&(p.st||p.normal||p.tangent||p.bitangent)){if(p.position&&(x=new Float64Array(72),x[0]=a.x,x[1]=a.y,x[2]=y.z,x[3]=y.x,x[4]=a.y,x[5]=y.z,x[6]=y.x,x[7]=y.y,x[8]=y.z,x[9]=a.x,x[10]=y.y,x[11]=y.z,x[12]=a.x,x[13]=a.y,x[14]=a.z,x[15]=y.x,x[16]=a.y,x[17]=a.z,x[18]=y.x,x[19]=y.y,x[20]=a.z,x[21]=a.x,x[22]=y.y,x[23]=a.z,x[24]=y.x,x[25]=a.y,x[26]=a.z,x[27]=y.x,x[28]=y.y,x[29]=a.z,x[30]=y.x,x[31]=y.y,x[32]=y.z,x[33]=y.x,x[34]=a.y,x[35]=y.z,x[36]=a.x,x[37]=a.y,x[38]=a.z,x[39]=a.x,x[40]=y.y,x[41]=a.z,x[42]=a.x,x[43]=y.y,x[44]=y.z,x[45]=a.x,x[46]=a.y,x[47]=y.z,x[48]=a.x,x[49]=y.y,x[50]=a.z,x[51]=y.x,x[52]=y.y,x[53]=a.z,x[54]=y.x,x[55]=y.y,x[56]=y.z,x[57]=a.x,x[58]=y.y,x[59]=y.z,x[60]=a.x,x[61]=a.y,x[62]=a.z,x[63]=y.x,x[64]=a.y,x[65]=a.z,x[66]=y.x,x[67]=a.y,x[68]=y.z,x[69]=a.x,x[70]=a.y,x[71]=y.z,d.position=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:x})),p.normal){var b=new Float32Array(72);b[0]=0,b[1]=0,b[2]=1,b[3]=0,b[4]=0,b[5]=1,b[6]=0,b[7]=0,b[8]=1,b[9]=0,b[10]=0,b[11]=1,b[12]=0,b[13]=0,b[14]=-1,b[15]=0,b[16]=0,b[17]=-1,b[18]=0,b[19]=0,b[20]=-1,b[21]=0,b[22]=0,b[23]=-1,b[24]=1,b[25]=0,b[26]=0,b[27]=1,b[28]=0,b[29]=0,b[30]=1,b[31]=0,b[32]=0,b[33]=1,b[34]=0,b[35]=0,b[36]=-1,b[37]=0,b[38]=0,b[39]=-1,b[40]=0,b[41]=0,b[42]=-1,b[43]=0,b[44]=0,b[45]=-1,b[46]=0,b[47]=0,b[48]=0,b[49]=1,b[50]=0,b[51]=0,b[52]=1,b[53]=0,b[54]=0,b[55]=1,b[56]=0,b[57]=0,b[58]=1,b[59]=0,b[60]=0,b[61]=-1,b[62]=0,b[63]=0,b[64]=-1,b[65]=0,b[66]=0,b[67]=-1,b[68]=0,b[69]=0,b[70]=-1,b[71]=0,d.normal=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:b})}if(p.st){var A=new Float32Array(48);A[0]=0,A[1]=0,A[2]=1,A[3]=0,A[4]=1,A[5]=1,A[6]=0,A[7]=1,A[8]=1,A[9]=0,A[10]=0,A[11]=0,A[12]=0,A[13]=1,A[14]=1,A[15]=1,A[16]=0,A[17]=0,A[18]=1,A[19]=0,A[20]=1,A[21]=1,A[22]=0,A[23]=1,A[24]=1,A[25]=0,A[26]=0,A[27]=0,A[28]=0,A[29]=1,A[30]=1,A[31]=1,A[32]=1,A[33]=0,A[34]=0,A[35]=0,A[36]=0,A[37]=1,A[38]=1,A[39]=1,A[40]=0,A[41]=0,A[42]=1,A[43]=0,A[44]=1,A[45]=1,A[46]=0,A[47]=1,d.st=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:A})}if(p.tangent){var l=new Float32Array(72);l[0]=1,l[1]=0,l[2]=0,l[3]=1,l[4]=0,l[5]=0,l[6]=1,l[7]=0,l[8]=0,l[9]=1,l[10]=0,l[11]=0,l[12]=-1,l[13]=0,l[14]=0,l[15]=-1,l[16]=0,l[17]=0,l[18]=-1,l[19]=0,l[20]=0,l[21]=-1,l[22]=0,l[23]=0,l[24]=0,l[25]=1,l[26]=0,l[27]=0,l[28]=1,l[29]=0,l[30]=0,l[31]=1,l[32]=0,l[33]=0,l[34]=1,l[35]=0,l[36]=0,l[37]=-1,l[38]=0,l[39]=0,l[40]=-1,l[41]=0,l[42]=0,l[43]=-1,l[44]=0,l[45]=0,l[46]=-1,l[47]=0,l[48]=-1,l[49]=0,l[50]=0,l[51]=-1,l[52]=0,l[53]=0,l[54]=-1,l[55]=0,l[56]=0,l[57]=-1,l[58]=0,l[59]=0,l[60]=1,l[61]=0,l[62]=0,l[63]=1,l[64]=0,l[65]=0,l[66]=1,l[67]=0,l[68]=0,l[69]=1,l[70]=0,l[71]=0,d.tangent=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:l})}if(p.bitangent){var C=new Float32Array(72);C[0]=0,C[1]=1,C[2]=0,C[3]=0,C[4]=1,C[5]=0,C[6]=0,C[7]=1,C[8]=0,C[9]=0,C[10]=1,C[11]=0,C[12]=0,C[13]=1,C[14]=0,C[15]=0,C[16]=1,C[17]=0,C[18]=0,C[19]=1,C[20]=0,C[21]=0,C[22]=1,C[23]=0,C[24]=0,C[25]=0,C[26]=1,C[27]=0,C[28]=0,C[29]=1,C[30]=0,C[31]=0,C[32]=1,C[33]=0,C[34]=0,C[35]=1,C[36]=0,C[37]=0,C[38]=1,C[39]=0,C[40]=0,C[41]=1,C[42]=0,C[43]=0,C[44]=1,C[45]=0,C[46]=0,C[47]=1,C[48]=0,C[49]=0,C[50]=1,C[51]=0,C[52]=0,C[53]=1,C[54]=0,C[55]=0,C[56]=1,C[57]=0,C[58]=0,C[59]=1,C[60]=0,C[61]=0,C[62]=1,C[63]=0,C[64]=0,C[65]=1,C[66]=0,C[67]=0,C[68]=1,C[69]=0,C[70]=0,C[71]=1,d.bitangent=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:C})}c=new Uint16Array(36),c[0]=0,c[1]=1,c[2]=2,c[3]=0,c[4]=2,c[5]=3,c[6]=6,c[7]=5,c[8]=4,c[9]=7,c[10]=6,c[11]=4,c[12]=8,c[13]=9,c[14]=10,c[15]=8,c[16]=10,c[17]=11,c[18]=14,c[19]=13,c[20]=12,c[21]=15,c[22]=14,c[23]=12,c[24]=18,c[25]=17,c[26]=16,c[27]=19,c[28]=18,c[29]=16,c[30]=20,c[31]=21,c[32]=22,c[33]=20,c[34]=22,c[35]=23}else x=new Float64Array(24),x[0]=a.x,x[1]=a.y,x[2]=a.z,x[3]=y.x,x[4]=a.y,x[5]=a.z,x[6]=y.x,x[7]=y.y,x[8]=a.z,x[9]=a.x,x[10]=y.y,x[11]=a.z,x[12]=a.x,x[13]=a.y,x[14]=y.z,x[15]=y.x,x[16]=a.y,x[17]=y.z,x[18]=y.x,x[19]=y.y,x[20]=y.z,x[21]=a.x,x[22]=y.y,x[23]=y.z,d.position=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:x}),c=new Uint16Array(36),c[0]=4,c[1]=5,c[2]=6,c[3]=4,c[4]=6,c[5]=7,c[6]=1,c[7]=0,c[8]=3,c[9]=1,c[10]=3,c[11]=2,c[12]=1,c[13]=6,c[14]=5,c[15]=1,c[16]=2,c[17]=6,c[18]=2,c[19]=3,c[20]=7,c[21]=2,c[22]=7,c[23]=6,c[24]=3,c[25]=0,c[26]=4,c[27]=3,c[28]=4,c[29]=7,c[30]=0,c[31]=1,c[32]=5,c[33]=0,c[34]=5,c[35]=4;var v=n.Cartesian3.subtract(y,a,f),h=.5*n.Cartesian3.magnitude(v);if(t.defined(e._offsetAttribute)){var z=x.length,w=new Uint8Array(z/3),F=e._offsetAttribute===s.GeometryOffsetAttribute.NONE?0:1;s.arrayFill(w,F),d.applyOffset=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:w})}return new o.Geometry({attributes:d,indices:c,primitiveType:m.PrimitiveType.TRIANGLES,boundingSphere:new r.BoundingSphere(n.Cartesian3.ZERO,h),offsetAttribute:e._offsetAttribute})}},p.getUnitBox=function(){return t.defined(c)||(c=p.createGeometry(p.fromDimensions({dimensions:new n.Cartesian3(1,1,1),vertexFormat:y.VertexFormat.POSITION_ONLY}))),c},e.BoxGeometry=p}));