define(["exports","./Cartesian3-eab74dc0","./Transforms-6b57162d","./Matrix4-ed224189"],(function(a,r,e,i){"use strict";var t={},n=new r.Cartesian3,s=new r.Cartesian3,o=new e.Quaternion,l=new i.Matrix3;function C(a,t,C,y,u,m,c,h,x,M){var z=a+t;r.Cartesian3.multiplyByScalar(y,Math.cos(z),n),r.Cartesian3.multiplyByScalar(C,Math.sin(z),s),r.Cartesian3.add(n,s,n);var d=Math.cos(a);d*=d;var f=Math.sin(a);f*=f;var _=m/Math.sqrt(c*d+u*f),v=_/h;return e.Quaternion.fromAxisAngle(n,v,o),i.Matrix3.fromQuaternion(o,l),i.Matrix3.multiplyByVector(l,x,M),r.Cartesian3.normalize(M,M),r.Cartesian3.multiplyByScalar(M,h,M),M}var y=new r.Cartesian3,u=new r.Cartesian3,m=new r.Cartesian3,c=new r.Cartesian3;t.raisePositionsToHeight=function(a,e,i){for(var t=e.ellipsoid,n=e.height,s=e.extrudedHeight,o=i?a.length/3*2:a.length/3,l=new Float64Array(3*o),C=a.length,h=i?C:0,x=0;x<C;x+=3){var M=x+1,z=x+2,d=r.Cartesian3.fromArray(a,x,y);t.scaleToGeodeticSurface(d,d);var f=r.Cartesian3.clone(d,u),_=t.geodeticSurfaceNormal(d,c),v=r.Cartesian3.multiplyByScalar(_,n,m);r.Cartesian3.add(d,v,d),i&&(r.Cartesian3.multiplyByScalar(_,s,v),r.Cartesian3.add(f,v,f),l[x+h]=f.x,l[M+h]=f.y,l[z+h]=f.z),l[x]=d.x,l[M]=d.y,l[z]=d.z}return l};var h=new r.Cartesian3,x=new r.Cartesian3,M=new r.Cartesian3;t.computeEllipsePositions=function(a,e,i){var t=a.semiMinorAxis,n=a.semiMajorAxis,s=a.rotation,o=a.center,l=8*a.granularity,c=t*t,z=n*n,d=n*t,f=r.Cartesian3.magnitude(o),_=r.Cartesian3.normalize(o,h),v=r.Cartesian3.cross(r.Cartesian3.UNIT_Z,o,x);v=r.Cartesian3.normalize(v,v);var O=r.Cartesian3.cross(_,v,M),p=1+Math.ceil(r.CesiumMath.PI_OVER_TWO/l),w=r.CesiumMath.PI_OVER_TWO/(p-1),P=r.CesiumMath.PI_OVER_TWO-p*w;P<0&&(p-=Math.ceil(Math.abs(P)/w));var T,I,g,E,V,A=p*(p+2)*2,R=e?new Array(3*A):void 0,W=0,S=y,B=u,b=4*p*3,Q=b-1,G=0,H=i?new Array(b):void 0;for(P=r.CesiumMath.PI_OVER_TWO,S=C(P,s,O,v,c,d,z,f,_,S),e&&(R[W++]=S.x,R[W++]=S.y,R[W++]=S.z),i&&(H[Q--]=S.z,H[Q--]=S.y,H[Q--]=S.x),P=r.CesiumMath.PI_OVER_TWO-w,T=1;T<p+1;++T){if(S=C(P,s,O,v,c,d,z,f,_,S),B=C(Math.PI-P,s,O,v,c,d,z,f,_,B),e){for(R[W++]=S.x,R[W++]=S.y,R[W++]=S.z,g=2*T+2,I=1;I<g-1;++I)E=I/(g-1),V=r.Cartesian3.lerp(S,B,E,m),R[W++]=V.x,R[W++]=V.y,R[W++]=V.z;R[W++]=B.x,R[W++]=B.y,R[W++]=B.z}i&&(H[Q--]=S.z,H[Q--]=S.y,H[Q--]=S.x,H[G++]=B.x,H[G++]=B.y,H[G++]=B.z),P=r.CesiumMath.PI_OVER_TWO-(T+1)*w}for(T=p;T>1;--T){if(P=r.CesiumMath.PI_OVER_TWO-(T-1)*w,S=C(-P,s,O,v,c,d,z,f,_,S),B=C(P+Math.PI,s,O,v,c,d,z,f,_,B),e){for(R[W++]=S.x,R[W++]=S.y,R[W++]=S.z,g=2*(T-1)+2,I=1;I<g-1;++I)E=I/(g-1),V=r.Cartesian3.lerp(S,B,E,m),R[W++]=V.x,R[W++]=V.y,R[W++]=V.z;R[W++]=B.x,R[W++]=B.y,R[W++]=B.z}i&&(H[Q--]=S.z,H[Q--]=S.y,H[Q--]=S.x,H[G++]=B.x,H[G++]=B.y,H[G++]=B.z)}P=r.CesiumMath.PI_OVER_TWO,S=C(-P,s,O,v,c,d,z,f,_,S);var N={};return e&&(R[W++]=S.x,R[W++]=S.y,R[W++]=S.z,N.positions=R,N.numPts=p),i&&(H[Q--]=S.z,H[Q--]=S.y,H[Q--]=S.x,N.outerPositions=H),N},a.EllipseGeometryLibrary=t}));