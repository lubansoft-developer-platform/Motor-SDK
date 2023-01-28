define(["./when-52cea266","./Check-ee5dd8a8","./Cartesian2-7c55a82d","./Rectangle-88e14f21","./BoundingSphere-f5553fb7","./Transforms-d0762529","./Matrix4-da50dd55","./RuntimeError-02840484","./WebGLConstants-52779751","./ComponentDatatype-fc6a16e1","./GeometryAttribute-60495dd3","./PrimitiveType-875d1f73","./GeometryAttributes-769ca2c2","./AttributeCompression-7f134dfc","./GeometryPipeline-6ea6731e","./EncodedCartesian3-237542cd","./IndexDatatype-f9231b69","./IntersectionTests-ca78fc8a","./Plane-fdd70b9e","./GeometryOffsetAttribute-85385f9c","./VertexFormat-2c3e8a0a","./GeometryInstance-ed1361fd","./EllipsoidRhumbLine-90d09904","./PolygonPipeline-fe89e8c5","./RectangleGeometryLibrary-c810e123"],(function(t,e,a,r,n,o,i,s,l,u,c,d,m,p,g,y,f,h,v,b,_,A,w,x,C){"use strict";var R=new a.Cartesian3,E=new a.Cartesian3,F=new a.Cartesian3,G=new a.Cartesian3,P=new r.Rectangle,V=new a.Cartesian2,D=new n.BoundingSphere,L=new n.BoundingSphere;function M(t,e){var a=new c.Geometry({attributes:new m.GeometryAttributes,primitiveType:d.PrimitiveType.TRIANGLES});return a.attributes.position=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e.positions}),t.normal&&(a.attributes.normal=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e.normals})),t.tangent&&(a.attributes.tangent=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e.tangents})),t.bitangent&&(a.attributes.bitangent=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e.bitangents})),a}function O(t,e,r,n){var o=t.length,s=e.normal?new Float32Array(o):void 0,l=e.tangent?new Float32Array(o):void 0,u=e.bitangent?new Float32Array(o):void 0,c=0,d=G,m=F,p=E;if(e.normal||e.tangent||e.bitangent)for(var g=0;g<o;g+=3){var y=a.Cartesian3.fromArray(t,g,R),f=c+1,h=c+2;p=r.geodeticSurfaceNormal(y,p),(e.tangent||e.bitangent)&&(a.Cartesian3.cross(a.Cartesian3.UNIT_Z,p,m),i.Matrix3.multiplyByVector(n,m,m),a.Cartesian3.normalize(m,m),e.bitangent&&a.Cartesian3.normalize(a.Cartesian3.cross(p,m,d),d)),e.normal&&(s[c]=p.x,s[f]=p.y,s[h]=p.z),e.tangent&&(l[c]=m.x,l[f]=m.y,l[h]=m.z),e.bitangent&&(u[c]=d.x,u[f]=d.y,u[h]=d.z),c+=3}return M(e,{positions:t,normals:s,tangents:l,bitangents:u})}var T=new a.Cartesian3,N=new a.Cartesian3;function k(t,e,r){var n=t.length,o=e.normal?new Float32Array(n):void 0,i=e.tangent?new Float32Array(n):void 0,s=e.bitangent?new Float32Array(n):void 0,l=0,u=0,c=0,d=!0,m=G,p=F,g=E;if(e.normal||e.tangent||e.bitangent)for(var y=0;y<n;y+=6){var f=a.Cartesian3.fromArray(t,y,R),h=a.Cartesian3.fromArray(t,(y+6)%n,T);if(d){var v=a.Cartesian3.fromArray(t,(y+3)%n,N);a.Cartesian3.subtract(h,f,h),a.Cartesian3.subtract(v,f,v),g=a.Cartesian3.normalize(a.Cartesian3.cross(v,h,g),g),d=!1}a.Cartesian3.equalsEpsilon(h,f,a.CesiumMath.EPSILON10)&&(d=!0),(e.tangent||e.bitangent)&&(m=r.geodeticSurfaceNormal(f,m),e.tangent&&(p=a.Cartesian3.normalize(a.Cartesian3.cross(m,g,p),p))),e.normal&&(o[l++]=g.x,o[l++]=g.y,o[l++]=g.z,o[l++]=g.x,o[l++]=g.y,o[l++]=g.z),e.tangent&&(i[u++]=p.x,i[u++]=p.y,i[u++]=p.z,i[u++]=p.x,i[u++]=p.y,i[u++]=p.z),e.bitangent&&(s[c++]=m.x,s[c++]=m.y,s[c++]=m.z,s[c++]=m.x,s[c++]=m.y,s[c++]=m.z)}return M(e,{positions:t,normals:o,tangents:i,bitangents:s})}function S(t,e){var a=t._vertexFormat,r=t._ellipsoid,n=e.height,o=e.width,i=e.northCap,s=e.southCap,l=0,d=n,m=n,p=0;i&&(l=1,m-=1,p+=1),s&&(d-=1,m-=1,p+=1),p+=o*m;for(var g=a.position?new Float64Array(3*p):void 0,y=a.st?new Float32Array(2*p):void 0,h=0,v=0,b=R,_=V,A=Number.MAX_VALUE,w=Number.MAX_VALUE,x=-Number.MAX_VALUE,E=-Number.MAX_VALUE,F=l;F<d;++F)for(var G=0;G<o;++G)C.RectangleGeometryLibrary.computePosition(e,r,a.st,F,G,b,_),g[h++]=b.x,g[h++]=b.y,g[h++]=b.z,a.st&&(y[v++]=_.x,y[v++]=_.y,A=Math.min(A,_.x),w=Math.min(w,_.y),x=Math.max(x,_.x),E=Math.max(E,_.y));if(i&&(C.RectangleGeometryLibrary.computePosition(e,r,a.st,0,0,b,_),g[h++]=b.x,g[h++]=b.y,g[h++]=b.z,a.st&&(y[v++]=_.x,y[v++]=_.y,A=_.x,w=_.y,x=_.x,E=_.y)),s&&(C.RectangleGeometryLibrary.computePosition(e,r,a.st,n-1,0,b,_),g[h++]=b.x,g[h++]=b.y,g[h]=b.z,a.st&&(y[v++]=_.x,y[v]=_.y,A=Math.min(A,_.x),w=Math.min(w,_.y),x=Math.max(x,_.x),E=Math.max(E,_.y))),a.st&&(A<0||w<0||x>1||E>1))for(var P=0;P<y.length;P+=2)y[P]=(y[P]-A)/(x-A),y[P+1]=(y[P+1]-w)/(E-w);var D=O(g,a,r,e.tangentRotationMatrix),L=6*(o-1)*(m-1);i&&(L+=3*(o-1)),s&&(L+=3*(o-1));var M,T=f.IndexDatatype.createTypedArray(p,L),N=0,k=0;for(M=0;M<m-1;++M){for(var S=0;S<o-1;++S){var I=N,H=I+o,z=H+1,B=I+1;T[k++]=I,T[k++]=H,T[k++]=B,T[k++]=B,T[k++]=H,T[k++]=z,++N}++N}if(i||s){var U,q,Y=p-1,j=p-1;if(i&&s&&(Y=p-2),N=0,i)for(M=0;M<o-1;M++)U=N,q=U+1,T[k++]=Y,T[k++]=U,T[k++]=q,++N;if(s)for(N=(m-1)*o,M=0;M<o-1;M++)U=N,q=U+1,T[k++]=U,T[k++]=j,T[k++]=q,++N}return D.indices=T,a.st&&(D.attributes.st=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:y})),D}function I(t,e,a,r,n){return t[e++]=r[a],t[e++]=r[a+1],t[e++]=r[a+2],t[e++]=n[a],t[e++]=n[a+1],t[e]=n[a+2],t}function H(t,e,a,r){return t[e++]=r[a],t[e++]=r[a+1],t[e++]=r[a],t[e]=r[a+1],t}var z=new _.VertexFormat;function B(e,r){var n,o=e._shadowVolume,i=e._offsetAttribute,s=e._vertexFormat,l=e._extrudedHeight,d=e._surfaceHeight,m=e._ellipsoid,p=r.height,y=r.width;if(o){var h=_.VertexFormat.clone(s,z);h.normal=!0,e._vertexFormat=h}var v=S(e,r);o&&(e._vertexFormat=s);var w=x.PolygonPipeline.scaleToGeodeticHeight(v.attributes.position.values,d,m,!1);w=new Float64Array(w);var C=w.length,R=2*C,E=new Float64Array(R);E.set(w);var F=x.PolygonPipeline.scaleToGeodeticHeight(v.attributes.position.values,l,m);E.set(F,C),v.attributes.position.values=E;var G,P,V,D=s.normal?new Float32Array(R):void 0,L=s.tangent?new Float32Array(R):void 0,M=s.bitangent?new Float32Array(R):void 0,O=s.st?new Float32Array(R/3*2):void 0;if(s.normal){for(P=v.attributes.normal.values,D.set(P),n=0;n<C;n++)P[n]=-P[n];D.set(P,C),v.attributes.normal.values=D}if(o){P=v.attributes.normal.values,s.normal||(v.attributes.normal=void 0);var B=new Float32Array(R);for(n=0;n<C;n++)P[n]=-P[n];B.set(P,C),v.attributes.extrudeDirection=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:B})}var U=t.defined(i);if(U){var q=C/3*2,Y=new Uint8Array(q);i===b.GeometryOffsetAttribute.TOP?Y=b.arrayFill(Y,1,0,q/2):(V=i===b.GeometryOffsetAttribute.NONE?0:1,Y=b.arrayFill(Y,V)),v.attributes.applyOffset=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:Y})}if(s.tangent){var j=v.attributes.tangent.values;for(L.set(j),n=0;n<C;n++)j[n]=-j[n];L.set(j,C),v.attributes.tangent.values=L}if(s.bitangent){var X=v.attributes.bitangent.values;M.set(X),M.set(X,C),v.attributes.bitangent.values=M}s.st&&(G=v.attributes.st.values,O.set(G),O.set(G,C/3*2),v.attributes.st.values=O);var Q=v.indices,W=Q.length,J=C/3,Z=f.IndexDatatype.createTypedArray(R/3,2*W);for(Z.set(Q),n=0;n<W;n+=3)Z[n+W]=Q[n+2]+J,Z[n+1+W]=Q[n+1]+J,Z[n+2+W]=Q[n]+J;v.indices=Z;var K=r.northCap,$=r.southCap,tt=p,et=2,at=0,rt=4,nt=4;K&&(et-=1,tt-=1,at+=1,rt-=2,nt-=1),$&&(et-=1,tt-=1,at+=1,rt-=2,nt-=1),at+=et*y+2*tt-rt;var ot=2*(at+nt),it=new Float64Array(3*ot),st=o?new Float32Array(3*ot):void 0,lt=U?new Uint8Array(ot):void 0,ut=s.st?new Float32Array(2*ot):void 0,ct=i===b.GeometryOffsetAttribute.TOP;U&&!ct&&(V=i===b.GeometryOffsetAttribute.ALL?1:0,lt=b.arrayFill(lt,V));var dt,mt=0,pt=0,gt=0,yt=0,ft=y*tt;for(n=0;n<ft;n+=y)dt=3*n,it=I(it,mt,dt,w,F),mt+=6,s.st&&(ut=H(ut,pt,2*n,G),pt+=4),o&&(gt+=3,st[gt++]=P[dt],st[gt++]=P[dt+1],st[gt++]=P[dt+2]),ct&&(lt[yt++]=1,yt+=1);if($){var ht=K?ft+1:ft;for(dt=3*ht,n=0;n<2;n++)it=I(it,mt,dt,w,F),mt+=6,s.st&&(ut=H(ut,pt,2*ht,G),pt+=4),o&&(gt+=3,st[gt++]=P[dt],st[gt++]=P[dt+1],st[gt++]=P[dt+2]),ct&&(lt[yt++]=1,yt+=1)}else for(n=ft-y;n<ft;n++)dt=3*n,it=I(it,mt,dt,w,F),mt+=6,s.st&&(ut=H(ut,pt,2*n,G),pt+=4),o&&(gt+=3,st[gt++]=P[dt],st[gt++]=P[dt+1],st[gt++]=P[dt+2]),ct&&(lt[yt++]=1,yt+=1);for(n=ft-1;n>0;n-=y)dt=3*n,it=I(it,mt,dt,w,F),mt+=6,s.st&&(ut=H(ut,pt,2*n,G),pt+=4),o&&(gt+=3,st[gt++]=P[dt],st[gt++]=P[dt+1],st[gt++]=P[dt+2]),ct&&(lt[yt++]=1,yt+=1);if(K){var vt=ft;for(dt=3*vt,n=0;n<2;n++)it=I(it,mt,dt,w,F),mt+=6,s.st&&(ut=H(ut,pt,2*vt,G),pt+=4),o&&(gt+=3,st[gt++]=P[dt],st[gt++]=P[dt+1],st[gt++]=P[dt+2]),ct&&(lt[yt++]=1,yt+=1)}else for(n=y-1;n>=0;n--)dt=3*n,it=I(it,mt,dt,w,F),mt+=6,s.st&&(ut=H(ut,pt,2*n,G),pt+=4),o&&(gt+=3,st[gt++]=P[dt],st[gt++]=P[dt+1],st[gt++]=P[dt+2]),ct&&(lt[yt++]=1,yt+=1);var bt=k(it,s,m);s.st&&(bt.attributes.st=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:ut})),o&&(bt.attributes.extrudeDirection=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:st})),U&&(bt.attributes.applyOffset=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:lt}));var _t,At,wt,xt,Ct=f.IndexDatatype.createTypedArray(ot,6*at);C=it.length/3;var Rt=0;for(n=0;n<C-1;n+=2){_t=n,xt=(_t+2)%C;var Et=a.Cartesian3.fromArray(it,3*_t,T),Ft=a.Cartesian3.fromArray(it,3*xt,N);a.Cartesian3.equalsEpsilon(Et,Ft,a.CesiumMath.EPSILON10)||(At=(_t+1)%C,wt=(At+2)%C,Ct[Rt++]=_t,Ct[Rt++]=At,Ct[Rt++]=xt,Ct[Rt++]=xt,Ct[Rt++]=At,Ct[Rt++]=wt)}return bt.indices=Ct,bt=g.GeometryPipeline.combineInstances([new A.GeometryInstance({geometry:v}),new A.GeometryInstance({geometry:bt})]),bt[0]}var U=[new a.Cartesian3,new a.Cartesian3,new a.Cartesian3,new a.Cartesian3],q=new r.Cartographic,Y=new r.Cartographic;function j(t,e,a,n,o){if(0===a)return r.Rectangle.clone(t,o);var i=C.RectangleGeometryLibrary.computeOptions(t,e,a,0,P,q),s=i.height,l=i.width,u=U;return C.RectangleGeometryLibrary.computePosition(i,n,!1,0,0,u[0]),C.RectangleGeometryLibrary.computePosition(i,n,!1,0,l-1,u[1]),C.RectangleGeometryLibrary.computePosition(i,n,!1,s-1,0,u[2]),C.RectangleGeometryLibrary.computePosition(i,n,!1,s-1,l-1,u[3]),r.Rectangle.fromCartesianArray(u,n,o)}function X(n){n=t.defaultValue(n,t.defaultValue.EMPTY_OBJECT);var o=n.rectangle;if(e.Check.typeOf.object("rectangle",o),r.Rectangle.validate(o),o.north<o.south)throw new e.DeveloperError("options.rectangle.north must be greater than or equal to options.rectangle.south");var i=t.defaultValue(n.height,0),s=t.defaultValue(n.extrudedHeight,i);this._rectangle=r.Rectangle.clone(o),this._granularity=t.defaultValue(n.granularity,a.CesiumMath.RADIANS_PER_DEGREE),this._ellipsoid=r.Ellipsoid.clone(t.defaultValue(n.ellipsoid,r.Ellipsoid.WGS84)),this._surfaceHeight=Math.max(i,s),this._rotation=t.defaultValue(n.rotation,0),this._stRotation=t.defaultValue(n.stRotation,0),this._vertexFormat=_.VertexFormat.clone(t.defaultValue(n.vertexFormat,_.VertexFormat.DEFAULT)),this._extrudedHeight=Math.min(i,s),this._shadowVolume=t.defaultValue(n.shadowVolume,!1),this._workerName="createRectangleGeometry",this._offsetAttribute=n.offsetAttribute,this._rotatedRectangle=void 0,this._textureCoordinateRotationPoints=void 0}X.packedLength=r.Rectangle.packedLength+r.Ellipsoid.packedLength+_.VertexFormat.packedLength+7,X.pack=function(a,n,o){return e.Check.typeOf.object("value",a),e.Check.defined("array",n),o=t.defaultValue(o,0),r.Rectangle.pack(a._rectangle,n,o),o+=r.Rectangle.packedLength,r.Ellipsoid.pack(a._ellipsoid,n,o),o+=r.Ellipsoid.packedLength,_.VertexFormat.pack(a._vertexFormat,n,o),o+=_.VertexFormat.packedLength,n[o++]=a._granularity,n[o++]=a._surfaceHeight,n[o++]=a._rotation,n[o++]=a._stRotation,n[o++]=a._extrudedHeight,n[o++]=a._shadowVolume?1:0,n[o]=t.defaultValue(a._offsetAttribute,-1),n};var Q=new r.Rectangle,W=r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),J={rectangle:Q,ellipsoid:W,vertexFormat:z,granularity:void 0,height:void 0,rotation:void 0,stRotation:void 0,extrudedHeight:void 0,shadowVolume:void 0,offsetAttribute:void 0};X.unpack=function(a,n,o){e.Check.defined("array",a),n=t.defaultValue(n,0);var i=r.Rectangle.unpack(a,n,Q);n+=r.Rectangle.packedLength;var s=r.Ellipsoid.unpack(a,n,W);n+=r.Ellipsoid.packedLength;var l=_.VertexFormat.unpack(a,n,z);n+=_.VertexFormat.packedLength;var u=a[n++],c=a[n++],d=a[n++],m=a[n++],p=a[n++],g=1===a[n++],y=a[n];return t.defined(o)?(o._rectangle=r.Rectangle.clone(i,o._rectangle),o._ellipsoid=r.Ellipsoid.clone(s,o._ellipsoid),o._vertexFormat=_.VertexFormat.clone(l,o._vertexFormat),o._granularity=u,o._surfaceHeight=c,o._rotation=d,o._stRotation=m,o._extrudedHeight=p,o._shadowVolume=g,o._offsetAttribute=-1===y?void 0:y,o):(J.granularity=u,J.height=c,J.rotation=d,J.stRotation=m,J.extrudedHeight=p,J.shadowVolume=g,J.offsetAttribute=-1===y?void 0:y,new X(J))},X.computeRectangle=function(n,o){n=t.defaultValue(n,t.defaultValue.EMPTY_OBJECT);var i=n.rectangle;if(e.Check.typeOf.object("rectangle",i),r.Rectangle.validate(i),i.north<i.south)throw new e.DeveloperError("options.rectangle.north must be greater than or equal to options.rectangle.south");var s=t.defaultValue(n.granularity,a.CesiumMath.RADIANS_PER_DEGREE),l=t.defaultValue(n.ellipsoid,r.Ellipsoid.WGS84),u=t.defaultValue(n.rotation,0);return j(i,s,u,l,o)};var Z=new i.Matrix3,K=new o.Quaternion,$=new r.Cartographic;X.createGeometry=function(e){if(!a.CesiumMath.equalsEpsilon(e._rectangle.north,e._rectangle.south,a.CesiumMath.EPSILON10)&&!a.CesiumMath.equalsEpsilon(e._rectangle.east,e._rectangle.west,a.CesiumMath.EPSILON10)){var s=e._rectangle,l=e._ellipsoid,d=e._rotation,m=e._stRotation,p=e._vertexFormat,g=C.RectangleGeometryLibrary.computeOptions(s,e._granularity,d,m,P,q,Y),y=Z;if(0!==m||0!==d){var f=r.Rectangle.center(s,$),h=l.geodeticSurfaceNormalCartographic(f,T);o.Quaternion.fromAxisAngle(h,-m,K),i.Matrix3.fromQuaternion(K,y)}else i.Matrix3.clone(i.Matrix3.IDENTITY,y);var v,_,A=e._surfaceHeight,w=e._extrudedHeight,R=!a.CesiumMath.equalsEpsilon(A,w,0,a.CesiumMath.EPSILON2);if(g.lonScalar=1/e._rectangle.width,g.latScalar=1/e._rectangle.height,g.tangentRotationMatrix=y,s=e._rectangle,R){v=B(e,g);var E=n.BoundingSphere.fromRectangle3D(s,l,A,L),F=n.BoundingSphere.fromRectangle3D(s,l,w,D);_=n.BoundingSphere.union(E,F)}else{if(v=S(e,g),v.attributes.position.values=x.PolygonPipeline.scaleToGeodeticHeight(v.attributes.position.values,A,l,!1),t.defined(e._offsetAttribute)){var G=v.attributes.position.values.length,V=new Uint8Array(G/3),M=e._offsetAttribute===b.GeometryOffsetAttribute.NONE?0:1;b.arrayFill(V,M),v.attributes.applyOffset=new c.GeometryAttribute({componentDatatype:u.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:V})}_=n.BoundingSphere.fromRectangle3D(s,l,A)}return p.position||delete v.attributes.position,new c.Geometry({attributes:v.attributes,indices:v.indices,primitiveType:v.primitiveType,boundingSphere:_,offsetAttribute:e._offsetAttribute})}},X.createShadowVolume=function(t,e,a){var r=t._granularity,n=t._ellipsoid,o=e(r,n),i=a(r,n);return new X({rectangle:t._rectangle,rotation:t._rotation,ellipsoid:n,stRotation:t._stRotation,granularity:r,extrudedHeight:i,height:o,vertexFormat:_.VertexFormat.POSITION_ONLY,shadowVolume:!0})};var tt=new r.Rectangle,et=[new a.Cartesian2,new a.Cartesian2,new a.Cartesian2],at=new c.Matrix2,rt=new r.Cartographic;function nt(t){if(0===t._stRotation)return[0,0,0,1,1,0];var e=r.Rectangle.clone(t._rectangle,tt),n=t._granularity,o=t._ellipsoid,i=t._rotation-t._stRotation,s=j(e,n,i,o,tt),l=et;l[0].x=s.west,l[0].y=s.south,l[1].x=s.west,l[1].y=s.north,l[2].x=s.east,l[2].y=s.south;for(var u=t.rectangle,d=c.Matrix2.fromRotation(t._stRotation,at),m=r.Rectangle.center(u,rt),p=0;p<3;++p){var g=l[p];g.x-=m.longitude,g.y-=m.latitude,c.Matrix2.multiplyByVector(d,g,g),g.x+=m.longitude,g.y+=m.latitude,g.x=(g.x-u.west)/u.width,g.y=(g.y-u.south)/u.height}var y=l[0],f=l[1],h=l[2],v=new Array(6);return a.Cartesian2.pack(y,v),a.Cartesian2.pack(f,v,2),a.Cartesian2.pack(h,v,4),v}function ot(e,a){return t.defined(a)&&(e=X.unpack(e,a)),e._ellipsoid=r.Ellipsoid.clone(e._ellipsoid),e._rectangle=r.Rectangle.clone(e._rectangle),X.createGeometry(e)}return Object.defineProperties(X.prototype,{rectangle:{get:function(){return t.defined(this._rotatedRectangle)||(this._rotatedRectangle=j(this._rectangle,this._granularity,this._rotation,this._ellipsoid)),this._rotatedRectangle}},textureCoordinateRotationPoints:{get:function(){return t.defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=nt(this)),this._textureCoordinateRotationPoints}}}),ot}));