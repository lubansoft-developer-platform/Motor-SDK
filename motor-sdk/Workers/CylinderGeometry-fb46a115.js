define(["exports","./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./BoundingSphere-f4be5efa","./ComponentDatatype-86703c58","./GeometryAttribute-f2192ebb","./PrimitiveType-30fa6f85","./GeometryAttributes-9d45f9e2","./IndexDatatype-cb635cbc","./GeometryOffsetAttribute-f755a5cb","./VertexFormat-a00562ee","./CylinderGeometryLibrary-24985329"],(function(e,t,r,a,o,n,i,s,u,f,m,d,p,l){"use strict";var y=new o.Cartesian2,b=new a.Cartesian3,c=new a.Cartesian3,v=new a.Cartesian3,A=new a.Cartesian3;function h(e){e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT);var a=e.length,o=e.topRadius,n=e.bottomRadius,i=t.defaultValue(e.vertexFormat,p.VertexFormat.DEFAULT),s=t.defaultValue(e.slices,128);if(!t.defined(a))throw new r.DeveloperError("options.length must be defined.");if(!t.defined(o))throw new r.DeveloperError("options.topRadius must be defined.");if(!t.defined(n))throw new r.DeveloperError("options.bottomRadius must be defined.");if(s<3)throw new r.DeveloperError("options.slices must be greater than or equal to 3.");if(t.defined(e.offsetAttribute)&&e.offsetAttribute===d.GeometryOffsetAttribute.TOP)throw new r.DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._length=a,this._topRadius=o,this._bottomRadius=n,this._vertexFormat=p.VertexFormat.clone(i),this._slices=s,this._offsetAttribute=e.offsetAttribute,this._workerName="createCylinderGeometry"}h.packedLength=p.VertexFormat.packedLength+5,h.pack=function(e,a,o){if(!t.defined(e))throw new r.DeveloperError("value is required");if(!t.defined(a))throw new r.DeveloperError("array is required");return o=t.defaultValue(o,0),p.VertexFormat.pack(e._vertexFormat,a,o),o+=p.VertexFormat.packedLength,a[o++]=e._length,a[o++]=e._topRadius,a[o++]=e._bottomRadius,a[o++]=e._slices,a[o]=t.defaultValue(e._offsetAttribute,-1),a};var w,g=new p.VertexFormat,x={vertexFormat:g,length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,offsetAttribute:void 0};h.unpack=function(e,a,o){if(!t.defined(e))throw new r.DeveloperError("array is required");a=t.defaultValue(a,0);var n=p.VertexFormat.unpack(e,a,g);a+=p.VertexFormat.packedLength;var i=e[a++],s=e[a++],u=e[a++],f=e[a++],m=e[a];return t.defined(o)?(o._vertexFormat=p.VertexFormat.clone(n,o._vertexFormat),o._length=i,o._topRadius=s,o._bottomRadius=u,o._slices=f,o._offsetAttribute=-1===m?void 0:m,o):(x.length=i,x.topRadius=s,x.bottomRadius=u,x.slices=f,x.offsetAttribute=-1===m?void 0:m,new h(x))},h.createGeometry=function(e){var r=e._length,p=e._topRadius,h=e._bottomRadius,w=e._vertexFormat,g=e._slices;if(!(r<=0||p<0||h<0||0===p&&0===h)){var x,_=g+g,C=g+_,F=_+_,D=l.CylinderGeometryLibrary.computePositions(r,p,h,g,!0),G=w.st?new Float32Array(2*F):void 0,R=w.normal?new Float32Array(3*F):void 0,O=w.tangent?new Float32Array(3*F):void 0,T=w.bitangent?new Float32Array(3*F):void 0,V=w.normal||w.tangent||w.bitangent;if(V){var E=w.tangent||w.bitangent,L=0,P=0,k=0,z=Math.atan2(h-p,r),M=b;M.z=Math.sin(z);var N=Math.cos(z),I=v,S=c;for(x=0;x<g;x++){var U=x/g*a.CesiumMath.TWO_PI,B=N*Math.cos(U),q=N*Math.sin(U);V&&(M.x=B,M.y=q,E&&(I=a.Cartesian3.normalize(a.Cartesian3.cross(a.Cartesian3.UNIT_Z,M,I),I)),w.normal&&(R[L++]=M.x,R[L++]=M.y,R[L++]=M.z,R[L++]=M.x,R[L++]=M.y,R[L++]=M.z),w.tangent&&(O[P++]=I.x,O[P++]=I.y,O[P++]=I.z,O[P++]=I.x,O[P++]=I.y,O[P++]=I.z),w.bitangent&&(S=a.Cartesian3.normalize(a.Cartesian3.cross(M,I,S),S),T[k++]=S.x,T[k++]=S.y,T[k++]=S.z,T[k++]=S.x,T[k++]=S.y,T[k++]=S.z))}for(x=0;x<g;x++)w.normal&&(R[L++]=0,R[L++]=0,R[L++]=-1),w.tangent&&(O[P++]=1,O[P++]=0,O[P++]=0),w.bitangent&&(T[k++]=0,T[k++]=-1,T[k++]=0);for(x=0;x<g;x++)w.normal&&(R[L++]=0,R[L++]=0,R[L++]=1),w.tangent&&(O[P++]=1,O[P++]=0,O[P++]=0),w.bitangent&&(T[k++]=0,T[k++]=1,T[k++]=0)}var Y=12*g-12,Z=m.IndexDatatype.createTypedArray(F,Y),J=0,W=0;for(x=0;x<g-1;x++)Z[J++]=W,Z[J++]=W+2,Z[J++]=W+3,Z[J++]=W,Z[J++]=W+3,Z[J++]=W+1,W+=2;for(Z[J++]=_-2,Z[J++]=0,Z[J++]=1,Z[J++]=_-2,Z[J++]=1,Z[J++]=_-1,x=1;x<g-1;x++)Z[J++]=_+x+1,Z[J++]=_+x,Z[J++]=_;for(x=1;x<g-1;x++)Z[J++]=C,Z[J++]=C+x,Z[J++]=C+x+1;var j=0;if(w.st){var H=Math.max(p,h);for(x=0;x<F;x++){var K=a.Cartesian3.fromArray(D,3*x,A);G[j++]=(K.x+H)/(2*H),G[j++]=(K.y+H)/(2*H)}}var Q=new f.GeometryAttributes;w.position&&(Q.position=new s.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:D})),w.normal&&(Q.normal=new s.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:R})),w.tangent&&(Q.tangent=new s.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:O})),w.bitangent&&(Q.bitangent=new s.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:T})),w.st&&(Q.st=new s.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:G})),y.x=.5*r,y.y=Math.max(h,p);var X=new n.BoundingSphere(a.Cartesian3.ZERO,o.Cartesian2.magnitude(y));if(t.defined(e._offsetAttribute)){r=D.length;var $=new Uint8Array(r/3),ee=e._offsetAttribute===d.GeometryOffsetAttribute.NONE?0:1;d.arrayFill($,ee),Q.applyOffset=new s.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:$})}return new s.Geometry({attributes:Q,indices:Z,primitiveType:u.PrimitiveType.TRIANGLES,boundingSphere:X,offsetAttribute:e._offsetAttribute})}},h.getUnitCylinder=function(){return t.defined(w)||(w=h.createGeometry(new h({topRadius:1,bottomRadius:1,length:1,vertexFormat:p.VertexFormat.POSITION_ONLY}))),w},e.CylinderGeometry=h}));