define(["exports","./when-45f3d25d","./Cartesian3-e69091b9","./Matrix4-c65e6a1b","./Transforms-7d49a8ab","./PolylineVolumeGeometryLibrary-3867ede1","./PolylinePipeline-5cc41d8c"],(function(a,e,r,n,t,i,s){"use strict";var o={},C=new r.Cartesian3,l=new r.Cartesian3,y=new r.Cartesian3,u=new r.Cartesian3,c=[new r.Cartesian3,new r.Cartesian3],d=new r.Cartesian3,p=new r.Cartesian3,m=new r.Cartesian3,g=new r.Cartesian3,h=new r.Cartesian3,f=new r.Cartesian3,w=new r.Cartesian3,x=new r.Cartesian3,z=new r.Cartesian3,v=new r.Cartesian3,P=new t.Quaternion,A=new n.Matrix3;function B(a,e,s,o,y){var u,c=r.Cartesian3.angleBetween(r.Cartesian3.subtract(e,a,C),r.Cartesian3.subtract(s,a,l)),d=o===i.CornerType.BEVELED?1:Math.ceil(c/r.CesiumMath.toRadians(5))+1,p=3*d,m=new Array(p);m[p-3]=s.x,m[p-2]=s.y,m[p-1]=s.z,u=y?n.Matrix3.fromQuaternion(t.Quaternion.fromAxisAngle(r.Cartesian3.negate(a,C),c/d,P),A):n.Matrix3.fromQuaternion(t.Quaternion.fromAxisAngle(a,c/d,P),A);var g=0;e=r.Cartesian3.clone(e,C);for(var h=0;h<d;h++)e=n.Matrix3.multiplyByVector(u,e,e),m[g++]=e.x,m[g++]=e.y,m[g++]=e.z;return m}function E(a){var e=d,n=p,t=m,s=a[1];n=r.Cartesian3.fromArray(a[1],s.length-3,n),t=r.Cartesian3.fromArray(a[0],0,t),e=r.Cartesian3.midpoint(n,t,e);var o=B(e,n,t,i.CornerType.ROUNDED,!1),C=a.length-1,l=a[C-1];s=a[C],n=r.Cartesian3.fromArray(l,l.length-3,n),t=r.Cartesian3.fromArray(s,0,t),e=r.Cartesian3.midpoint(n,t,e);var y=B(e,n,t,i.CornerType.ROUNDED,!1);return[o,y]}function S(a,e,n,t){var i=C;return t||(e=r.Cartesian3.negate(e,e)),i=r.Cartesian3.add(a,e,i),[i.x,i.y,i.z,n.x,n.y,n.z]}function b(a,e,n,t){for(var i=new Array(a.length),s=new Array(a.length),o=r.Cartesian3.multiplyByScalar(e,n,C),c=r.Cartesian3.negate(o,l),d=0,p=a.length-1,m=0;m<a.length;m+=3){var g=r.Cartesian3.fromArray(a,m,y),h=r.Cartesian3.add(g,c,u);i[d++]=h.x,i[d++]=h.y,i[d++]=h.z;var f=r.Cartesian3.add(g,o,u);s[p--]=f.z,s[p--]=f.y,s[p--]=f.x}return t.push(i,s),t}o.addAttribute=function(a,r,n,t){var i=r.x,s=r.y,o=r.z;e.defined(n)&&(a[n]=i,a[n+1]=s,a[n+2]=o),e.defined(t)&&(a[t]=o,a[t-1]=s,a[t-2]=i)};var D=new r.Cartesian3,M=new r.Cartesian3;o.computePositions=function(a){var e,n=a.granularity,t=a.positions,o=a.ellipsoid,l=a.width/2,y=a.cornerType,u=a.saveAttributes,P=d,A=p,T=m,N=g,L=h,O=f,R=w,V=x,Q=z,U=v,G=[],I=u?[]:void 0,q=u?[]:void 0,j=t[0],k=t[1];A=r.Cartesian3.normalize(r.Cartesian3.subtract(k,j,A),A),P=o.geodeticSurfaceNormal(j,P),N=r.Cartesian3.normalize(r.Cartesian3.cross(P,A,N),N),u&&(I.push(N.x,N.y,N.z),q.push(P.x,P.y,P.z)),R=r.Cartesian3.clone(j,R),j=k,T=r.Cartesian3.negate(A,T);var F,H,J=[],K=t.length;for(F=1;F<K-1;F++){P=o.geodeticSurfaceNormal(j,P),k=t[F+1],A=r.Cartesian3.normalize(r.Cartesian3.subtract(k,j,A),A),L=r.Cartesian3.normalize(r.Cartesian3.add(A,T,L),L);var W=r.Cartesian3.multiplyByScalar(P,r.Cartesian3.dot(A,P),D);r.Cartesian3.subtract(A,W,W),r.Cartesian3.normalize(W,W);var X=r.Cartesian3.multiplyByScalar(P,r.Cartesian3.dot(T,P),M);r.Cartesian3.subtract(T,X,X),r.Cartesian3.normalize(X,X);var Y=!r.CesiumMath.equalsEpsilon(Math.abs(r.Cartesian3.dot(W,X)),1,r.CesiumMath.EPSILON7);if(Y){L=r.Cartesian3.cross(L,P,L),L=r.Cartesian3.cross(P,L,L),L=r.Cartesian3.normalize(L,L);var Z=l/Math.max(.25,r.Cartesian3.magnitude(r.Cartesian3.cross(L,T,C))),$=i.PolylineVolumeGeometryLibrary.angleIsGreaterThanPi(A,T,j,o);L=r.Cartesian3.multiplyByScalar(L,Z,L),$?(V=r.Cartesian3.add(j,L,V),U=r.Cartesian3.add(V,r.Cartesian3.multiplyByScalar(N,l,U),U),Q=r.Cartesian3.add(V,r.Cartesian3.multiplyByScalar(N,2*l,Q),Q),c[0]=r.Cartesian3.clone(R,c[0]),c[1]=r.Cartesian3.clone(U,c[1]),e=s.PolylinePipeline.generateArc({positions:c,granularity:n,ellipsoid:o}),G=b(e,N,l,G),u&&(I.push(N.x,N.y,N.z),q.push(P.x,P.y,P.z)),O=r.Cartesian3.clone(Q,O),N=r.Cartesian3.normalize(r.Cartesian3.cross(P,A,N),N),Q=r.Cartesian3.add(V,r.Cartesian3.multiplyByScalar(N,2*l,Q),Q),R=r.Cartesian3.add(V,r.Cartesian3.multiplyByScalar(N,l,R),R),y===i.CornerType.ROUNDED||y===i.CornerType.BEVELED?J.push({leftPositions:B(V,O,Q,y,$)}):J.push({leftPositions:S(j,r.Cartesian3.negate(L,L),Q,$)})):(Q=r.Cartesian3.add(j,L,Q),U=r.Cartesian3.add(Q,r.Cartesian3.negate(r.Cartesian3.multiplyByScalar(N,l,U),U),U),V=r.Cartesian3.add(Q,r.Cartesian3.negate(r.Cartesian3.multiplyByScalar(N,2*l,V),V),V),c[0]=r.Cartesian3.clone(R,c[0]),c[1]=r.Cartesian3.clone(U,c[1]),e=s.PolylinePipeline.generateArc({positions:c,granularity:n,ellipsoid:o}),G=b(e,N,l,G),u&&(I.push(N.x,N.y,N.z),q.push(P.x,P.y,P.z)),O=r.Cartesian3.clone(V,O),N=r.Cartesian3.normalize(r.Cartesian3.cross(P,A,N),N),V=r.Cartesian3.add(Q,r.Cartesian3.negate(r.Cartesian3.multiplyByScalar(N,2*l,V),V),V),R=r.Cartesian3.add(Q,r.Cartesian3.negate(r.Cartesian3.multiplyByScalar(N,l,R),R),R),y===i.CornerType.ROUNDED||y===i.CornerType.BEVELED?J.push({rightPositions:B(Q,O,V,y,$)}):J.push({rightPositions:S(j,L,V,$)})),T=r.Cartesian3.negate(A,T)}j=k}return P=o.geodeticSurfaceNormal(j,P),c[0]=r.Cartesian3.clone(R,c[0]),c[1]=r.Cartesian3.clone(j,c[1]),e=s.PolylinePipeline.generateArc({positions:c,granularity:n,ellipsoid:o}),G=b(e,N,l,G),u&&(I.push(N.x,N.y,N.z),q.push(P.x,P.y,P.z)),y===i.CornerType.ROUNDED&&(H=E(G)),{positions:G,corners:J,lefts:I,normals:q,endPositions:H}},a.CorridorGeometryLibrary=o}));