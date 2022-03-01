define(["exports","./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1"],(function(t,a,i,e,n){"use strict";function s(t){var a=t._uSquared,i=t._ellipsoid.maximumRadius,e=t._ellipsoid.minimumRadius,n=(i-e)/i,s=Math.cos(t._startHeading),r=Math.sin(t._startHeading),h=(1-n)*Math.tan(t._start.latitude),d=1/Math.sqrt(1+h*h),o=d*h,c=Math.atan2(h,s),u=d*r,M=u*u,l=1-M,g=Math.sqrt(l),_=a/4,f=_*_,p=f*_,C=f*f,v=1+_-3*f/4+5*p/4-175*C/64,m=1-_+15*f/8-35*p/8,H=1-3*_+35*f/4,O=1-5*_,q=v*c-m*Math.sin(2*c)*_/2-H*Math.sin(4*c)*f/16-O*Math.sin(6*c)*p/48-5*Math.sin(8*c)*C/512,S=t._constants;S.a=i,S.b=e,S.f=n,S.cosineHeading=s,S.sineHeading=r,S.tanU=h,S.cosineU=d,S.sineU=o,S.sigma=c,S.sineAlpha=u,S.sineSquaredAlpha=M,S.cosineSquaredAlpha=l,S.cosineAlpha=g,S.u2Over4=_,S.u4Over16=f,S.u6Over64=p,S.u8Over256=C,S.a0=v,S.a1=m,S.a2=H,S.a3=O,S.distanceRatio=q}function r(t,a){return t*a*(4+t*(4-3*a))/16}function h(t,a,i,e,n,s,h){var d=r(t,i);return(1-d)*t*a*(e+d*n*(h+d*s*(2*h*h-1)))}function d(t,a,i,n,s,r,d){var o,c,u,M,l,g=(a-i)/a,_=r-n,f=Math.atan((1-g)*Math.tan(s)),p=Math.atan((1-g)*Math.tan(d)),C=Math.cos(f),v=Math.sin(f),m=Math.cos(p),H=Math.sin(p),O=C*m,q=C*H,S=v*H,b=v*m,k=_,w=e.CesiumMath.TWO_PI,U=Math.cos(k),A=Math.sin(k);do{U=Math.cos(k),A=Math.sin(k);var R,y=q-b*U;u=Math.sqrt(m*m*A*A+y*y),c=S+O*U,o=Math.atan2(u,c),0===u?(R=0,M=1):(R=O*A/u,M=1-R*R),w=k,l=c-2*S/M,isNaN(l)&&(l=0),k=_+h(g,R,M,o,u,c,l)}while(Math.abs(k-w)>e.CesiumMath.EPSILON12);var E=M*(a*a-i*i)/(i*i),P=1+E*(4096+E*(E*(320-175*E)-768))/16384,T=E*(256+E*(E*(74-47*E)-128))/1024,x=l*l,D=T*u*(l+T*(c*(2*x-1)-T*l*(4*u*u-3)*(4*x-3)/6)/4),I=i*P*(o-D),N=Math.atan2(m*A,q-b*U),z=Math.atan2(C*A,q*U-b);t._distance=I,t._startHeading=N,t._endHeading=z,t._uSquared=E}var o=new e.Cartesian3,c=new e.Cartesian3;function u(t,a,r,h){var u=e.Cartesian3.normalize(h.cartographicToCartesian(a,c),o),M=e.Cartesian3.normalize(h.cartographicToCartesian(r,c),c);i.Check.typeOf.number.greaterThanOrEquals("value",Math.abs(Math.abs(e.Cartesian3.angleBetween(u,M))-Math.PI),.0125),d(t,h.maximumRadius,h.minimumRadius,a.longitude,a.latitude,r.longitude,r.latitude),t._start=n.Cartographic.clone(a,t._start),t._end=n.Cartographic.clone(r,t._end),t._start.height=0,t._end.height=0,s(t)}function M(t,i,e){var s=a.defaultValue(e,n.Ellipsoid.WGS84);this._ellipsoid=s,this._start=new n.Cartographic,this._end=new n.Cartographic,this._constants={},this._startHeading=void 0,this._endHeading=void 0,this._distance=void 0,this._uSquared=void 0,a.defined(t)&&a.defined(i)&&u(this,t,i,s)}Object.defineProperties(M.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},surfaceDistance:{get:function(){return i.Check.defined("distance",this._distance),this._distance}},start:{get:function(){return this._start}},end:{get:function(){return this._end}},startHeading:{get:function(){return i.Check.defined("distance",this._distance),this._startHeading}},endHeading:{get:function(){return i.Check.defined("distance",this._distance),this._endHeading}}}),M.prototype.setEndPoints=function(t,a){i.Check.defined("start",t),i.Check.defined("end",a),u(this,t,a,this._ellipsoid)},M.prototype.interpolateUsingFraction=function(t,a){return this.interpolateUsingSurfaceDistance(this._distance*t,a)},M.prototype.interpolateUsingSurfaceDistance=function(t,e){i.Check.defined("distance",this._distance);var s=this._constants,r=s.distanceRatio+t/s.b,d=Math.cos(2*r),o=Math.cos(4*r),c=Math.cos(6*r),u=Math.sin(2*r),M=Math.sin(4*r),l=Math.sin(6*r),g=Math.sin(8*r),_=r*r,f=r*_,p=s.u8Over256,C=s.u2Over4,v=s.u6Over64,m=s.u4Over16,H=2*f*p*d/3+r*(1-C+7*m/4-15*v/4+579*p/64-(m-15*v/4+187*p/16)*d-(5*v/4-115*p/16)*o-29*p*c/16)+(C/2-m+71*v/32-85*p/16)*u+(5*m/16-5*v/4+383*p/96)*M-_*((v-11*p/2)*u+5*p*M/2)+(29*v/96-29*p/16)*l+539*p*g/1536,O=Math.asin(Math.sin(H)*s.cosineAlpha),q=Math.atan(s.a/s.b*Math.tan(O));H-=s.sigma;var S=Math.cos(2*s.sigma+H),b=Math.sin(H),k=Math.cos(H),w=s.cosineU*k,U=s.sineU*b,A=Math.atan2(b*s.sineHeading,w-U*s.cosineHeading),R=A-h(s.f,s.sineAlpha,s.cosineSquaredAlpha,H,b,k,S);return a.defined(e)?(e.longitude=this._start.longitude+R,e.latitude=q,e.height=0,e):new n.Cartographic(this._start.longitude+R,q,0)},t.EllipsoidGeodesic=M}));