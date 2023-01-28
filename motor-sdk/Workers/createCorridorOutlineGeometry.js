define(["./when-52cea266","./Check-ee5dd8a8","./Cartesian2-7c55a82d","./Rectangle-88e14f21","./BoundingSphere-f5553fb7","./Transforms-d0762529","./Matrix4-da50dd55","./RuntimeError-02840484","./WebGLConstants-52779751","./ComponentDatatype-fc6a16e1","./GeometryAttribute-60495dd3","./PrimitiveType-875d1f73","./GeometryAttributes-769ca2c2","./IndexDatatype-f9231b69","./IntersectionTests-ca78fc8a","./Plane-fdd70b9e","./GeometryOffsetAttribute-85385f9c","./arrayRemoveDuplicates-64b1d558","./AxisAlignedBoundingBox-08b0db17","./EllipsoidTangentPlane-64b84590","./EllipsoidRhumbLine-90d09904","./PolygonPipeline-fe89e8c5","./PolylineVolumeGeometryLibrary-758b4391","./EllipsoidGeodesic-69201d63","./PolylinePipeline-6fde5179","./CorridorGeometryLibrary-00edd1c0"],(function(e,t,i,r,o,a,n,s,l,d,u,p,f,h,y,c,g,b,v,m,A,_,C,E,G,T){"use strict";var P=new i.Cartesian3,w=new i.Cartesian3,L=new i.Cartesian3;function k(e,t){for(var i=0;i<e.length;i++)e[i]=t.scaleToGeodeticSurface(e[i],e[i]);return e}function D(t,r){var o,a,n,s=[],l=t.positions,p=t.corners,y=t.endPositions,c=new f.GeometryAttributes,g=0,b=0,v=0;for(a=0;a<l.length;a+=2)n=l[a].length-3,g+=n,v+=n/3*4,b+=l[a+1].length-3;for(g+=3,b+=3,a=0;a<p.length;a++){o=p[a];var m=p[a].leftPositions;e.defined(m)?(n=m.length,g+=n,v+=n/3*2):(n=p[a].rightPositions.length,b+=n,v+=n/3*2)}var A,_=e.defined(y);_&&(A=y[0].length-3,g+=A,b+=A,A/=3,v+=4*A);var E,G,k,D,O,x,N=g+b,V=new Float64Array(N),H=0,I=N-1,S=A/2,B=h.IndexDatatype.createTypedArray(N/3,v+4),R=0;if(B[R++]=H/3,B[R++]=(I-2)/3,_){s.push(H/3),x=P,O=w;var M=y[0];for(a=0;a<S;a++)x=i.Cartesian3.fromArray(M,3*(S-1-a),x),O=i.Cartesian3.fromArray(M,3*(S+a),O),T.CorridorGeometryLibrary.addAttribute(V,O,H),T.CorridorGeometryLibrary.addAttribute(V,x,void 0,I),G=H/3,D=G+1,E=(I-2)/3,k=E-1,B[R++]=E,B[R++]=k,B[R++]=G,B[R++]=D,H+=3,I-=3}var U=0,F=l[U++],j=l[U++];for(V.set(F,H),V.set(j,I-j.length+1),n=j.length-3,s.push(H/3,(I-2)/3),a=0;a<n;a+=3)G=H/3,D=G+1,E=(I-2)/3,k=E-1,B[R++]=E,B[R++]=k,B[R++]=G,B[R++]=D,H+=3,I-=3;for(a=0;a<p.length;a++){var Y;o=p[a];var q,W=o.leftPositions,J=o.rightPositions,z=L;if(e.defined(W)){for(I-=3,q=k,s.push(D),Y=0;Y<W.length/3;Y++)z=i.Cartesian3.fromArray(W,3*Y,z),B[R++]=q-Y-1,B[R++]=q-Y,T.CorridorGeometryLibrary.addAttribute(V,z,void 0,I),I-=3;s.push(q-Math.floor(W.length/6)),r===C.CornerType.BEVELED&&s.push((I-2)/3+1),H+=3}else{for(H+=3,q=D,s.push(k),Y=0;Y<J.length/3;Y++)z=i.Cartesian3.fromArray(J,3*Y,z),B[R++]=q+Y,B[R++]=q+Y+1,T.CorridorGeometryLibrary.addAttribute(V,z,H),H+=3;s.push(q+Math.floor(J.length/6)),r===C.CornerType.BEVELED&&s.push(H/3-1),I-=3}for(F=l[U++],j=l[U++],F.splice(0,3),j.splice(j.length-3,3),V.set(F,H),V.set(j,I-j.length+1),n=j.length-3,Y=0;Y<j.length;Y+=3)D=H/3,G=D-1,k=(I-2)/3,E=k+1,B[R++]=E,B[R++]=k,B[R++]=G,B[R++]=D,H+=3,I-=3;H-=3,I+=3,s.push(H/3,(I-2)/3)}if(_){H+=3,I-=3,x=P,O=w;var K=y[1];for(a=0;a<S;a++)x=i.Cartesian3.fromArray(K,3*(A-a-1),x),O=i.Cartesian3.fromArray(K,3*a,O),T.CorridorGeometryLibrary.addAttribute(V,x,void 0,I),T.CorridorGeometryLibrary.addAttribute(V,O,H),D=H/3,G=D-1,k=(I-2)/3,E=k+1,B[R++]=E,B[R++]=k,B[R++]=G,B[R++]=D,H+=3,I-=3;s.push(H/3)}else s.push(H/3,(I-2)/3);return B[R++]=H/3,B[R++]=(I-2)/3,c.position=new u.GeometryAttribute({componentDatatype:d.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:V}),{attributes:c,indices:B,wallIndices:s}}function O(t){var i=t.ellipsoid,r=T.CorridorGeometryLibrary.computePositions(t),o=D(r,t.cornerType),a=o.wallIndices,n=t.height,s=t.extrudedHeight,l=o.attributes,p=o.indices,f=l.position.values,y=f.length,c=new Float64Array(y);c.set(f);var b,v=new Float64Array(2*y);if(f=_.PolygonPipeline.scaleToGeodeticHeight(f,n,i),c=_.PolygonPipeline.scaleToGeodeticHeight(c,s,i),v.set(f),v.set(c,y),l.position.values=v,y/=3,e.defined(t.offsetAttribute)){var m=new Uint8Array(2*y);if(t.offsetAttribute===g.GeometryOffsetAttribute.TOP)m=g.arrayFill(m,1,0,y);else{var A=t.offsetAttribute===g.GeometryOffsetAttribute.NONE?0:1;m=g.arrayFill(m,A)}l.applyOffset=new u.GeometryAttribute({componentDatatype:d.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:m})}var C=p.length,E=h.IndexDatatype.createTypedArray(v.length/3,2*(C+a.length));E.set(p);var G,P,w=C;for(b=0;b<C;b+=2){var L=p[b],k=p[b+1];E[w++]=L+y,E[w++]=k+y}for(b=0;b<a.length;b++)G=a[b],P=G+y,E[w++]=G,E[w++]=P;return{attributes:l,indices:E}}function x(o){o=e.defaultValue(o,e.defaultValue.EMPTY_OBJECT);var a=o.positions,n=o.width;t.Check.typeOf.object("options.positions",a),t.Check.typeOf.number("options.width",n);var s=e.defaultValue(o.height,0),l=e.defaultValue(o.extrudedHeight,s);this._positions=a,this._ellipsoid=r.Ellipsoid.clone(e.defaultValue(o.ellipsoid,r.Ellipsoid.WGS84)),this._width=n,this._height=Math.max(s,l),this._extrudedHeight=Math.min(s,l),this._cornerType=e.defaultValue(o.cornerType,C.CornerType.ROUNDED),this._granularity=e.defaultValue(o.granularity,i.CesiumMath.RADIANS_PER_DEGREE),this._offsetAttribute=o.offsetAttribute,this._workerName="createCorridorOutlineGeometry",this.packedLength=1+a.length*i.Cartesian3.packedLength+r.Ellipsoid.packedLength+6}x.pack=function(o,a,n){t.Check.typeOf.object("value",o),t.Check.typeOf.object("array",a),n=e.defaultValue(n,0);var s=o._positions,l=s.length;a[n++]=l;for(var d=0;d<l;++d,n+=i.Cartesian3.packedLength)i.Cartesian3.pack(s[d],a,n);return r.Ellipsoid.pack(o._ellipsoid,a,n),n+=r.Ellipsoid.packedLength,a[n++]=o._width,a[n++]=o._height,a[n++]=o._extrudedHeight,a[n++]=o._cornerType,a[n++]=o._granularity,a[n]=e.defaultValue(o._offsetAttribute,-1),a};var N=r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),V={positions:void 0,ellipsoid:N,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,offsetAttribute:void 0};function H(t,i){return e.defined(i)&&(t=x.unpack(t,i)),t._ellipsoid=r.Ellipsoid.clone(t._ellipsoid),x.createGeometry(t)}return x.unpack=function(o,a,n){t.Check.typeOf.object("array",o),a=e.defaultValue(a,0);for(var s=o[a++],l=new Array(s),d=0;d<s;++d,a+=i.Cartesian3.packedLength)l[d]=i.Cartesian3.unpack(o,a);var u=r.Ellipsoid.unpack(o,a,N);a+=r.Ellipsoid.packedLength;var p=o[a++],f=o[a++],h=o[a++],y=o[a++],c=o[a++],g=o[a];return e.defined(n)?(n._positions=l,n._ellipsoid=r.Ellipsoid.clone(u,n._ellipsoid),n._width=p,n._height=f,n._extrudedHeight=h,n._cornerType=y,n._granularity=c,n._offsetAttribute=-1===g?void 0:g,n):(V.positions=l,V.width=p,V.height=f,V.extrudedHeight=h,V.cornerType=y,V.granularity=c,V.offsetAttribute=-1===g?void 0:g,new x(V))},x.createGeometry=function(t){var r=t._positions,a=t._width,n=t._ellipsoid;r=k(r,n);var s=b.arrayRemoveDuplicates(r,i.Cartesian3.equalsEpsilon);if(!(s.length<2||a<=0)){var l,f=t._height,h=t._extrudedHeight,y=!i.CesiumMath.equalsEpsilon(f,h,0,i.CesiumMath.EPSILON2),c={ellipsoid:n,positions:s,width:a,cornerType:t._cornerType,granularity:t._granularity,saveAttributes:!1};if(y)c.height=f,c.extrudedHeight=h,c.offsetAttribute=t._offsetAttribute,l=O(c);else{var v=T.CorridorGeometryLibrary.computePositions(c);if(l=D(v,c.cornerType),l.attributes.position.values=_.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,f,n),e.defined(t._offsetAttribute)){var m=l.attributes.position.values.length,A=new Uint8Array(m/3),C=t._offsetAttribute===g.GeometryOffsetAttribute.NONE?0:1;g.arrayFill(A,C),l.attributes.applyOffset=new u.GeometryAttribute({componentDatatype:d.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:A})}}var E=l.attributes,G=o.BoundingSphere.fromVertices(E.position.values,void 0,3);return new u.Geometry({attributes:E,indices:l.indices,primitiveType:p.PrimitiveType.LINES,boundingSphere:G,offsetAttribute:t._offsetAttribute})}},H}));