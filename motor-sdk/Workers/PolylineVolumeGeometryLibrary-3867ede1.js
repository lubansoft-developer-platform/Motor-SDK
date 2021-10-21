define(["exports","./Cartesian3-e69091b9","./Cartesian2-7a44370a","./Matrix4-c65e6a1b","./Transforms-7d49a8ab","./EllipsoidTangentPlane-3e14dd4d","./PolylinePipeline-5cc41d8c"],(function(a,e,r,n,t,i,s){"use strict";var o={ROUNDED:0,MITERED:1,BEVELED:2},l=Object.freeze(o),C=[new e.Cartesian3,new e.Cartesian3],c=new e.Cartesian3,u=new e.Cartesian3,y=new e.Cartesian3,d=new e.Cartesian3,m=new e.Cartesian3,f=new e.Cartesian3,p=new e.Cartesian3,g=new e.Cartesian3,w=new e.Cartesian3,v=new e.Cartesian3,h=new e.Cartesian3,x={},P=new r.Cartographic;function E(a,e){for(var r=new Array(a.length),n=0;n<a.length;n++){var t=a[n];P=e.cartesianToCartographic(t,P),r[n]=P.height,a[n]=e.scaleToGeodeticSurface(t,t)}return r}function M(a,r,n,t){var i,s=a[0],o=a[1],l=e.Cartesian3.angleBetween(s,o),C=Math.ceil(l/t),c=new Array(C);if(r===n){for(i=0;i<C;i++)c[i]=r;return c.push(n),c}var u=n-r,y=u/C;for(i=1;i<C;i++){var d=r+i*y;c[i]=d}return c[0]=r,c.push(n),c}var T=new e.Cartesian3,B=new e.Cartesian3;function z(a,n,t,s){var o=new i.EllipsoidTangentPlane(t,s),l=o.projectPointOntoPlane(e.Cartesian3.add(t,a,T),T),C=o.projectPointOntoPlane(e.Cartesian3.add(t,n,B),B),c=r.Cartesian2.angleBetween(l,C);return C.x*l.y-C.y*l.x>=0?-c:c}var S=new e.Cartesian3(-1,0,0),b=new n.Matrix4,A=new n.Matrix4,D=new n.Matrix3,O=n.Matrix3.IDENTITY.clone(),N=new e.Cartesian3,V=new n.Cartesian4,G=new e.Cartesian3;function R(a,r,i,s,o,l,C,c){var u=N,y=V;b=t.Transforms.eastNorthUpToFixedFrame(a,o,b),u=n.Matrix4.multiplyByPointAsVector(b,S,u),u=e.Cartesian3.normalize(u,u);var d=z(u,r,a,o);D=n.Matrix3.fromRotationZ(d,D),G.z=l,b=n.Matrix4.multiplyTransformation(b,n.Matrix4.fromRotationTranslation(D,G,A),b);var m=O;m[0]=C;for(var f=0;f<c;f++)for(var p=0;p<i.length;p+=3)y=e.Cartesian3.fromArray(i,p,y),y=n.Matrix3.multiplyByVector(m,y,y),y=n.Matrix4.multiplyByPoint(b,y,y),s.push(y.x,y.y,y.z);return s}var I=new e.Cartesian3;function L(a,r,n,t,i,s,o){for(var l=0;l<a.length;l+=3){var C=e.Cartesian3.fromArray(a,l,I);t=R(C,r,n,t,i,s[l/3],o,1)}return t}function j(a,e){var r=a.length,n=new Array(6*r),t=0,i=e.x+e.width/2,s=e.y+e.height/2,o=a[0];n[t++]=o.x-i,n[t++]=0,n[t++]=o.y-s;for(var l=1;l<r;l++){o=a[l];var C=o.x-i,c=o.y-s;n[t++]=C,n[t++]=0,n[t++]=c,n[t++]=C,n[t++]=0,n[t++]=c}return o=a[0],n[t++]=o.x-i,n[t++]=0,n[t++]=o.y-s,n}function Q(a,e){for(var r=a.length,n=new Array(3*r),t=0,i=e.x+e.width/2,s=e.y+e.height/2,o=0;o<r;o++)n[t++]=a[o].x-i,n[t++]=0,n[t++]=a[o].y-s;return n}var F=new t.Quaternion,U=new e.Cartesian3,_=new n.Matrix3;function q(a,r,i,s,o,C,c,u,y,d){var m,f,p,g=e.Cartesian3.angleBetween(e.Cartesian3.subtract(r,a,v),e.Cartesian3.subtract(i,a,h)),w=s===l.BEVELED?0:Math.ceil(g/e.CesiumMath.toRadians(5));if(m=o?n.Matrix3.fromQuaternion(t.Quaternion.fromAxisAngle(e.Cartesian3.negate(a,v),g/(w+1),F),_):n.Matrix3.fromQuaternion(t.Quaternion.fromAxisAngle(a,g/(w+1),F),_),r=e.Cartesian3.clone(r,U),w>0)for(var x=d?2:1,P=0;P<w;P++)r=n.Matrix3.multiplyByVector(m,r,r),f=e.Cartesian3.subtract(r,a,v),f=e.Cartesian3.normalize(f,f),o||(f=e.Cartesian3.negate(f,f)),p=C.scaleToGeodeticSurface(r,h),c=R(p,f,u,c,C,y,1,x);else f=e.Cartesian3.subtract(r,a,v),f=e.Cartesian3.normalize(f,f),o||(f=e.Cartesian3.negate(f,f)),p=C.scaleToGeodeticSurface(r,h),c=R(p,f,u,c,C,y,1,1),i=e.Cartesian3.clone(i,U),f=e.Cartesian3.subtract(i,a,v),f=e.Cartesian3.normalize(f,f),o||(f=e.Cartesian3.negate(f,f)),p=C.scaleToGeodeticSurface(i,h),c=R(p,f,u,c,C,y,1,1);return c}x.removeDuplicatesFromShape=function(a){for(var e=a.length,n=[],t=e-1,i=0;i<e;t=i++){var s=a[t],o=a[i];r.Cartesian2.equals(s,o)||n.push(o)}return n},x.angleIsGreaterThanPi=function(a,r,n,t){var s=new i.EllipsoidTangentPlane(n,t),o=s.projectPointOntoPlane(e.Cartesian3.add(n,a,T),T),l=s.projectPointOntoPlane(e.Cartesian3.add(n,r,B),B);return l.x*o.y-l.y*o.x>=0};var Y=new e.Cartesian3,Z=new e.Cartesian3;x.computePositions=function(a,r,n,t,i){var o=t._ellipsoid,h=E(a,o),P=t._granularity,T=t._cornerType,B=i?j(r,n):Q(r,n),z=i?Q(r,n):void 0,S=n.height/2,b=n.width/2,A=a.length,D=[],O=i?[]:void 0,N=c,V=u,G=y,I=d,F=m,U=f,_=p,k=g,H=w,J=a[0],K=a[1];I=o.geodeticSurfaceNormal(J,I),N=e.Cartesian3.subtract(K,J,N),N=e.Cartesian3.normalize(N,N),k=e.Cartesian3.cross(I,N,k),k=e.Cartesian3.normalize(k,k);var W,X,$=h[0],aa=h[1];i&&(O=R(J,k,z,O,o,$+S,1,1)),H=e.Cartesian3.clone(J,H),J=K,V=e.Cartesian3.negate(N,V);for(var ea=1;ea<A-1;ea++){var ra=i?2:1;K=a[ea+1],N=e.Cartesian3.subtract(K,J,N),N=e.Cartesian3.normalize(N,N),G=e.Cartesian3.add(N,V,G),G=e.Cartesian3.normalize(G,G),I=o.geodeticSurfaceNormal(J,I);var na=e.Cartesian3.multiplyByScalar(I,e.Cartesian3.dot(N,I),Y);e.Cartesian3.subtract(N,na,na),e.Cartesian3.normalize(na,na);var ta=e.Cartesian3.multiplyByScalar(I,e.Cartesian3.dot(V,I),Z);e.Cartesian3.subtract(V,ta,ta),e.Cartesian3.normalize(ta,ta);var ia=!e.CesiumMath.equalsEpsilon(Math.abs(e.Cartesian3.dot(na,ta)),1,e.CesiumMath.EPSILON7);if(ia){G=e.Cartesian3.cross(G,I,G),G=e.Cartesian3.cross(I,G,G),G=e.Cartesian3.normalize(G,G);var sa=1/Math.max(.25,e.Cartesian3.magnitude(e.Cartesian3.cross(G,V,v))),oa=x.angleIsGreaterThanPi(N,V,J,o);oa?(F=e.Cartesian3.add(J,e.Cartesian3.multiplyByScalar(G,sa*b,G),F),U=e.Cartesian3.add(F,e.Cartesian3.multiplyByScalar(k,b,U),U),C[0]=e.Cartesian3.clone(H,C[0]),C[1]=e.Cartesian3.clone(U,C[1]),W=M(C,$+S,aa+S,P),X=s.PolylinePipeline.generateArc({positions:C,granularity:P,ellipsoid:o}),D=L(X,k,B,D,o,W,1),k=e.Cartesian3.cross(I,N,k),k=e.Cartesian3.normalize(k,k),_=e.Cartesian3.add(F,e.Cartesian3.multiplyByScalar(k,b,_),_),T===l.ROUNDED||T===l.BEVELED?q(F,U,_,T,oa,o,D,B,aa+S,i):(G=e.Cartesian3.negate(G,G),D=R(J,G,B,D,o,aa+S,sa,ra)),H=e.Cartesian3.clone(_,H)):(F=e.Cartesian3.add(J,e.Cartesian3.multiplyByScalar(G,sa*b,G),F),U=e.Cartesian3.add(F,e.Cartesian3.multiplyByScalar(k,-b,U),U),C[0]=e.Cartesian3.clone(H,C[0]),C[1]=e.Cartesian3.clone(U,C[1]),W=M(C,$+S,aa+S,P),X=s.PolylinePipeline.generateArc({positions:C,granularity:P,ellipsoid:o}),D=L(X,k,B,D,o,W,1),k=e.Cartesian3.cross(I,N,k),k=e.Cartesian3.normalize(k,k),_=e.Cartesian3.add(F,e.Cartesian3.multiplyByScalar(k,-b,_),_),T===l.ROUNDED||T===l.BEVELED?q(F,U,_,T,oa,o,D,B,aa+S,i):D=R(J,G,B,D,o,aa+S,sa,ra),H=e.Cartesian3.clone(_,H)),V=e.Cartesian3.negate(N,V)}else D=R(H,k,B,D,o,$+S,1,1),H=J;$=aa,aa=h[ea+1],J=K}C[0]=e.Cartesian3.clone(H,C[0]),C[1]=e.Cartesian3.clone(J,C[1]),W=M(C,$+S,aa+S,P),X=s.PolylinePipeline.generateArc({positions:C,granularity:P,ellipsoid:o}),D=L(X,k,B,D,o,W,1),i&&(O=R(J,k,z,O,o,aa+S,1,1)),A=D.length;var la=i?A+O.length:A,Ca=new Float64Array(la);return Ca.set(D),i&&Ca.set(O,A),Ca},a.CornerType=l,a.PolylineVolumeGeometryLibrary=x}));