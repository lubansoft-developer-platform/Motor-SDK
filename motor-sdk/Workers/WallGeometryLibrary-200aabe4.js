define(["exports","./when-45f3d25d","./Cartesian3-e69091b9","./Cartesian2-7a44370a","./EllipsoidTangentPlane-c9b5e9c5","./PolygonPipeline-d8c5b0db","./PolylinePipeline-8d0912d9"],(function(e,i,t,n,r,o,a){"use strict";var l={};function s(e,i){return t.CesiumMath.equalsEpsilon(e.latitude,i.latitude,t.CesiumMath.EPSILON14)&&t.CesiumMath.equalsEpsilon(e.longitude,i.longitude,t.CesiumMath.EPSILON14)}var h=new n.Cartographic,g=new n.Cartographic;function d(e,t,r,o){var a=t.length;if(!(a<2)){var l=i.defined(o),d=i.defined(r),p=!0,P=new Array(a),u=new Array(a),c=new Array(a),v=t[0];P[0]=v;var y=e.cartesianToCartographic(v,h);d&&(y.height=r[0]),p=p&&y.height<=0,u[0]=y.height,c[0]=l?o[0]:0;for(var f=1,m=1;m<a;++m){var C=t[m],A=e.cartesianToCartographic(C,g);d&&(A.height=r[m]),p=p&&A.height<=0,s(y,A)?y.height<A.height&&(u[f-1]=A.height):(P[f]=C,u[f]=A.height,c[f]=l?o[m]:0,n.Cartographic.clone(A,y),++f)}if(!(p||f<2))return P.length=f,u.length=f,c.length=f,{positions:P,topHeights:u,bottomHeights:c}}}var p=new Array(2),P=new Array(2),u={positions:void 0,height:void 0,granularity:void 0,ellipsoid:void 0};l.computePositions=function(e,n,l,s,h,g){var c=d(e,n,l,s);if(i.defined(c)){if(n=c.positions,l=c.topHeights,s=c.bottomHeights,n.length>=3){var v=r.EllipsoidTangentPlane.fromPoints(n,e),y=v.projectPointsOntoPlane(n);o.PolygonPipeline.computeWindingOrder2D(y)===o.WindingOrder.CLOCKWISE&&(n.reverse(),l.reverse(),s.reverse())}var f,m,C=n.length,A=C-2,w=t.CesiumMath.chordLength(h,e.maximumRadius),b=u;if(b.minDistance=w,b.ellipsoid=e,g){var E,O=0;for(E=0;E<C-1;E++)O+=a.PolylinePipeline.numberOfPoints(n[E],n[E+1],w)+1;f=new Float64Array(3*O),m=new Float64Array(3*O);var L=p,M=P;b.positions=L,b.height=M;var F=0;for(E=0;E<C-1;E++){L[0]=n[E],L[1]=n[E+1],M[0]=l[E],M[1]=l[E+1];var H=a.PolylinePipeline.generateArc(b);f.set(H,F),M[0]=s[E],M[1]=s[E+1],m.set(a.PolylinePipeline.generateArc(b),F),F+=H.length}}else b.positions=n,b.height=l,f=new Float64Array(a.PolylinePipeline.generateArc(b)),b.height=s,m=new Float64Array(a.PolylinePipeline.generateArc(b));return{bottomPositions:m,topPositions:f,numCorners:A}}},e.WallGeometryLibrary=l}));