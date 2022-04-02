define(["exports","./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./BoundingSphere-9db3442e","./GeometryAttribute-98a8cf59"],(function(t,n,a,r,e,o,s){"use strict";var i=Math.cos,h=Math.sin,g=Math.sqrt,u={computePosition:function(t,a,r,e,o,s,u){var C=a.radiiSquared,c=t.nwCorner,l=t.boundingRectangle,d=c.latitude-t.granYCos*e+o*t.granXSin,S=i(d),w=h(d),M=C.z*w,m=c.longitude+e*t.granYSin+o*t.granXCos,X=S*i(m),Y=S*h(m),f=C.x*X,p=C.y*Y,v=g(f*X+p*Y+M*w);if(s.x=f/v,s.y=p/v,s.z=M/v,r){var O=t.stNwCorner;n.defined(O)?(d=O.latitude-t.stGranYCos*e+o*t.stGranXSin,m=O.longitude+e*t.stGranYSin+o*t.stGranXCos,u.x=(m-t.stWest)*t.lonScalar,u.y=(d-t.stSouth)*t.latScalar):(u.x=(m-l.west)*t.lonScalar,u.y=(d-l.south)*t.latScalar)}}},C=new s.Matrix2,c=new r.Cartesian3,l=new e.Cartographic,d=new r.Cartesian3,S=new o.GeographicProjection;function w(t,n,a,e,o,i,h){var g=Math.cos(n),u=e*g,l=a*g,w=Math.sin(n),M=e*w,m=a*w;c=S.project(t,c),c=r.Cartesian3.subtract(c,d,c);var X=s.Matrix2.fromRotation(n,C);c=s.Matrix2.multiplyByVector(X,c,c),c=r.Cartesian3.add(c,d,c),t=S.unproject(c,t),i-=1,h-=1;var Y=t.latitude,f=Y+i*m,p=Y-u*h,v=Y-u*h+i*m,O=Math.max(Y,f,p,v),R=Math.min(Y,f,p,v),_=t.longitude,G=_+i*l,x=_+h*M,P=_+h*M+i*l,W=Math.max(_,G,x,P),y=Math.min(_,G,x,P);return{north:O,south:R,east:W,west:y,granYCos:u,granYSin:M,granXCos:l,granXSin:m,nwCorner:t}}u.computeOptions=function(t,n,o,s,i,h,g){var u,C,c,M,m,X=t.east,Y=t.west,f=t.north,p=t.south,v=!1,O=!1;f===r.CesiumMath.PI_OVER_TWO&&(v=!0),p===-r.CesiumMath.PI_OVER_TWO&&(O=!0);var R=f-p;m=Y>X?r.CesiumMath.TWO_PI-Y+X:X-Y,u=Math.ceil(m/n)+1,C=Math.ceil(R/n)+1,c=m/(u-1),M=R/(C-1);var _=e.Rectangle.northwest(t,h),G=e.Rectangle.center(t,l);0===o&&0===s||(G.longitude<_.longitude&&(G.longitude+=r.CesiumMath.TWO_PI),d=S.project(G,d));var x=M,P=c,W=0,y=0,I=e.Rectangle.clone(t,i),T={granYCos:x,granYSin:W,granXCos:P,granXSin:y,nwCorner:_,boundingRectangle:I,width:u,height:C,northCap:v,southCap:O};if(0!==o){var b=w(_,o,c,M,G,u,C);if(f=b.north,p=b.south,X=b.east,Y=b.west,f<-r.CesiumMath.PI_OVER_TWO||f>r.CesiumMath.PI_OVER_TWO||p<-r.CesiumMath.PI_OVER_TWO||p>r.CesiumMath.PI_OVER_TWO)throw new a.DeveloperError("Rotated rectangle is invalid.  It crosses over either the north or south pole.");T.granYCos=b.granYCos,T.granYSin=b.granYSin,T.granXCos=b.granXCos,T.granXSin=b.granXSin,I.north=f,I.south=p,I.east=X,I.west=Y}if(0!==s){o-=s;var E=e.Rectangle.northwest(I,g),V=w(E,o,c,M,G,u,C);T.stGranYCos=V.granYCos,T.stGranXCos=V.granXCos,T.stGranYSin=V.granYSin,T.stGranXSin=V.granXSin,T.stNwCorner=E,T.stWest=V.west,T.stSouth=V.south}return T},t.RectangleGeometryLibrary=u}));