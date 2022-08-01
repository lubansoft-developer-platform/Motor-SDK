define(["exports","./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./BoundingSphere-f4be5efa","./Matrix4-ed224189","./Plane-87957166"],(function(e,r,t,a,i,n,o,s){"use strict";var u={};function d(e,r,t){var i=e+r;return a.CesiumMath.sign(e)!==a.CesiumMath.sign(r)&&Math.abs(i/Math.max(Math.abs(e),Math.abs(r)))<t?0:i}u.computeDiscriminant=function(e,r,a){if("number"!==typeof e)throw new t.DeveloperError("a is a required number.");if("number"!==typeof r)throw new t.DeveloperError("b is a required number.");if("number"!==typeof a)throw new t.DeveloperError("c is a required number.");var i=r*r-4*e*a;return i},u.computeRealRoots=function(e,r,i){if("number"!==typeof e)throw new t.DeveloperError("a is a required number.");if("number"!==typeof r)throw new t.DeveloperError("b is a required number.");if("number"!==typeof i)throw new t.DeveloperError("c is a required number.");var n;if(0===e)return 0===r?[]:[-i/r];if(0===r){if(0===i)return[0,0];var o=Math.abs(i),s=Math.abs(e);if(o<s&&o/s<a.CesiumMath.EPSILON14)return[0,0];if(o>s&&s/o<a.CesiumMath.EPSILON14)return[];if(n=-i/e,n<0)return[];var u=Math.sqrt(n);return[-u,u]}if(0===i)return n=-r/e,n<0?[n,0]:[0,n];var f=r*r,l=4*e*i,h=d(f,-l,a.CesiumMath.EPSILON14);if(h<0)return[];var m=-.5*d(r,a.CesiumMath.sign(r)*Math.sqrt(h),a.CesiumMath.EPSILON14);return r>0?[m/e,i/m]:[i/m,m/e]};var f={};function l(e,r,t,a){var i,n,o=e,s=r/3,u=t/3,d=a,f=o*u,l=s*d,h=s*s,m=u*u,c=o*u-h,C=o*d-s*u,p=s*d-m,w=4*c*p-C*C;if(w<0){var v,M,b;h*l>=f*m?(v=o,M=c,b=-2*s*c+o*C):(v=d,M=p,b=-d*C+2*u*p);var g=b<0?-1:1,q=-g*Math.abs(v)*Math.sqrt(-w);n=-b+q;var y=n/2,E=y<0?-Math.pow(-y,1/3):Math.pow(y,1/3),D=n===q?-E:-M/E;return i=M<=0?E+D:-b/(E*E+D*D+M),h*l>=f*m?[(i-s)/o]:[-d/(i+u)]}var S=c,R=-2*s*c+o*C,O=p,P=-d*C+2*u*p,x=Math.sqrt(w),N=Math.sqrt(3)/2,I=Math.abs(Math.atan2(o*x,-R)/3);i=2*Math.sqrt(-S);var L=Math.cos(I);n=i*L;var z=i*(-L/2-N*Math.sin(I)),W=n+z>2*s?n-s:z-s,B=o,T=W/B;I=Math.abs(Math.atan2(d*x,-P)/3),i=2*Math.sqrt(-O),L=Math.cos(I),n=i*L,z=i*(-L/2-N*Math.sin(I));var U=-d,V=n+z<2*u?n+u:z+u,A=U/V,Z=B*V,k=-W*V-B*U,j=W*U,F=(u*k-s*j)/(-s*k+u*Z);return T<=F?T<=A?F<=A?[T,F,A]:[T,A,F]:[A,T,F]:T<=A?[F,T,A]:F<=A?[F,A,T]:[A,F,T]}f.computeDiscriminant=function(e,r,a,i){if("number"!==typeof e)throw new t.DeveloperError("a is a required number.");if("number"!==typeof r)throw new t.DeveloperError("b is a required number.");if("number"!==typeof a)throw new t.DeveloperError("c is a required number.");if("number"!==typeof i)throw new t.DeveloperError("d is a required number.");var n=e*e,o=r*r,s=a*a,u=i*i,d=18*e*r*a*i+o*s-27*n*u-4*(e*s*a+o*r*i);return d},f.computeRealRoots=function(e,r,a,i){if("number"!==typeof e)throw new t.DeveloperError("a is a required number.");if("number"!==typeof r)throw new t.DeveloperError("b is a required number.");if("number"!==typeof a)throw new t.DeveloperError("c is a required number.");if("number"!==typeof i)throw new t.DeveloperError("d is a required number.");var n,o;if(0===e)return u.computeRealRoots(r,a,i);if(0===r){if(0===a){if(0===i)return[0,0,0];o=-i/e;var s=o<0?-Math.pow(-o,1/3):Math.pow(o,1/3);return[s,s,s]}return 0===i?(n=u.computeRealRoots(e,0,a),0===n.Length?[0]:[n[0],0,n[1]]):l(e,0,a,i)}return 0===a?0===i?(o=-r/e,o<0?[o,0,0]:[0,0,o]):l(e,r,0,i):0===i?(n=u.computeRealRoots(e,r,a),0===n.length?[0]:n[1]<=0?[n[0],n[1],0]:n[0]>=0?[0,n[0],n[1]]:[n[0],0,n[1]]):l(e,r,a,i)};var h={};function m(e,r,t,i){var n=e*e,o=r-3*n/8,s=t-r*e/2+n*e/8,d=i-t*e/4+r*n/16-3*n*n/256,l=f.computeRealRoots(1,2*o,o*o-4*d,-s*s);if(l.length>0){var h=-e/4,m=l[l.length-1];if(Math.abs(m)<a.CesiumMath.EPSILON14){var c=u.computeRealRoots(1,o,d);if(2===c.length){var C,p=c[0],w=c[1];if(p>=0&&w>=0){var v=Math.sqrt(p),M=Math.sqrt(w);return[h-M,h-v,h+v,h+M]}if(p>=0&&w<0)return C=Math.sqrt(p),[h-C,h+C];if(p<0&&w>=0)return C=Math.sqrt(w),[h-C,h+C]}return[]}if(m>0){var b=Math.sqrt(m),g=(o+m-s/b)/2,q=(o+m+s/b)/2,y=u.computeRealRoots(1,b,g),E=u.computeRealRoots(1,-b,q);return 0!==y.length?(y[0]+=h,y[1]+=h,0!==E.length?(E[0]+=h,E[1]+=h,y[1]<=E[0]?[y[0],y[1],E[0],E[1]]:E[1]<=y[0]?[E[0],E[1],y[0],y[1]]:y[0]>=E[0]&&y[1]<=E[1]?[E[0],y[0],y[1],E[1]]:E[0]>=y[0]&&E[1]<=y[1]?[y[0],E[0],E[1],y[1]]:y[0]>E[0]&&y[0]<E[1]?[E[0],y[0],E[1],y[1]]:[y[0],E[0],y[1],E[1]]):y):0!==E.length?(E[0]+=h,E[1]+=h,E):[]}}return[]}function c(e,r,t,i){var n=t*t,o=r*r,s=e*e,d=-2*r,l=t*e+o-4*i,h=s*i-t*r*e+n,m=f.computeRealRoots(1,d,l,h);if(m.length>0){var c,C,p,w,v,M,b=m[0],g=r-b,q=g*g,y=e/2,E=g/2,D=q-4*i,S=q+4*Math.abs(i),R=s-4*b,O=s+4*Math.abs(b);if(b<0||D*O<R*S){var P=Math.sqrt(R);c=P/2,C=0===P?0:(e*E-t)/P}else{var x=Math.sqrt(D);c=0===x?0:(e*E-t)/x,C=x/2}0===y&&0===c?(p=0,w=0):a.CesiumMath.sign(y)===a.CesiumMath.sign(c)?(p=y+c,w=b/p):(w=y-c,p=b/w),0===E&&0===C?(v=0,M=0):a.CesiumMath.sign(E)===a.CesiumMath.sign(C)?(v=E+C,M=i/v):(M=E-C,v=i/M);var N=u.computeRealRoots(1,p,v),I=u.computeRealRoots(1,w,M);if(0!==N.length)return 0!==I.length?N[1]<=I[0]?[N[0],N[1],I[0],I[1]]:I[1]<=N[0]?[I[0],I[1],N[0],N[1]]:N[0]>=I[0]&&N[1]<=I[1]?[I[0],N[0],N[1],I[1]]:I[0]>=N[0]&&I[1]<=N[1]?[N[0],I[0],I[1],N[1]]:N[0]>I[0]&&N[0]<I[1]?[I[0],N[0],I[1],N[1]]:[N[0],I[0],N[1],I[1]]:N;if(0!==I.length)return I}return[]}function C(e,t){t=a.Cartesian3.clone(r.defaultValue(t,a.Cartesian3.ZERO)),a.Cartesian3.equals(t,a.Cartesian3.ZERO)||a.Cartesian3.normalize(t,t),this.origin=a.Cartesian3.clone(r.defaultValue(e,a.Cartesian3.ZERO)),this.direction=t}h.computeDiscriminant=function(e,r,a,i,n){if("number"!==typeof e)throw new t.DeveloperError("a is a required number.");if("number"!==typeof r)throw new t.DeveloperError("b is a required number.");if("number"!==typeof a)throw new t.DeveloperError("c is a required number.");if("number"!==typeof i)throw new t.DeveloperError("d is a required number.");if("number"!==typeof n)throw new t.DeveloperError("e is a required number.");var o=e*e,s=o*e,u=r*r,d=u*r,f=a*a,l=f*a,h=i*i,m=h*i,c=n*n,C=c*n,p=u*f*h-4*d*m-4*e*l*h+18*e*r*a*m-27*o*h*h+256*s*C+n*(18*d*a*i-4*u*l+16*e*f*f-80*e*r*f*i-6*e*u*h+144*o*a*h)+c*(144*e*u*a-27*u*u-128*o*f-192*o*r*i);return p},h.computeRealRoots=function(e,r,i,n,o){if("number"!==typeof e)throw new t.DeveloperError("a is a required number.");if("number"!==typeof r)throw new t.DeveloperError("b is a required number.");if("number"!==typeof i)throw new t.DeveloperError("c is a required number.");if("number"!==typeof n)throw new t.DeveloperError("d is a required number.");if("number"!==typeof o)throw new t.DeveloperError("e is a required number.");if(Math.abs(e)<a.CesiumMath.EPSILON15)return f.computeRealRoots(r,i,n,o);var s=r/e,u=i/e,d=n/e,l=o/e,h=s<0?1:0;switch(h+=u<0?h+1:h,h+=d<0?h+1:h,h+=l<0?h+1:h,h){case 0:return m(s,u,d,l);case 1:return c(s,u,d,l);case 2:return c(s,u,d,l);case 3:return m(s,u,d,l);case 4:return m(s,u,d,l);case 5:return c(s,u,d,l);case 6:return m(s,u,d,l);case 7:return m(s,u,d,l);case 8:return c(s,u,d,l);case 9:return m(s,u,d,l);case 10:return m(s,u,d,l);case 11:return c(s,u,d,l);case 12:return m(s,u,d,l);case 13:return m(s,u,d,l);case 14:return m(s,u,d,l);case 15:return m(s,u,d,l);default:return}},C.getIntersectWidthPlane=function(e,r){let t=a.Cartesian3.multiplyByScalar(r.normal,-r.distance,new a.Cartesian3);return C.getIntersectWidthPlaneNormalAndPosition(e,r.normal,t)},C.getIntersectWidthPlaneNormalAndPosition=function(e,r,t){let i=Math.abs(a.Cartesian3.dot(r,e.direction)),n=a.Cartesian3.magnitude(r),o=a.Cartesian3.magnitude(e.direction);if(i<n*o*1e-6)return!1;let s=a.Cartesian3.subtract(t,e.origin,new a.Cartesian3),u=a.Cartesian3.dot(s,e.direction),d=a.Cartesian3.multiplyByScalar(e.direction,u,new a.Cartesian3);return a.Cartesian3.add(d,e.origin,d),d},C.clone=function(e,t){if(r.defined(e))return r.defined(t)?(t.origin=a.Cartesian3.clone(e.origin),t.direction=a.Cartesian3.clone(e.direction),t):new C(e.origin,e.direction)},C.getPoint=function(e,i,n){return t.Check.typeOf.object("ray",e),t.Check.typeOf.number("t",i),r.defined(n)||(n=new a.Cartesian3),n=a.Cartesian3.multiplyByScalar(e.direction,i,n),a.Cartesian3.add(e.origin,n,n)};var p={rayPlane:function(e,i,n){if(!r.defined(e))throw new t.DeveloperError("ray is required.");if(!r.defined(i))throw new t.DeveloperError("plane is required.");r.defined(n)||(n=new a.Cartesian3);var o=e.origin,s=e.direction,u=i.normal,d=a.Cartesian3.dot(u,s);if(!(Math.abs(d)<a.CesiumMath.EPSILON15)){var f=(-i.distance-a.Cartesian3.dot(u,o))/d;if(!(f<0))return n=a.Cartesian3.multiplyByScalar(s,f,n),a.Cartesian3.add(o,n,n)}}},w=new a.Cartesian3,v=new a.Cartesian3,M=new a.Cartesian3,b=new a.Cartesian3,g=new a.Cartesian3;p.rayTriangleParametric=function(e,i,n,o,s){if(!r.defined(e))throw new t.DeveloperError("ray is required.");if(!r.defined(i))throw new t.DeveloperError("p0 is required.");if(!r.defined(n))throw new t.DeveloperError("p1 is required.");if(!r.defined(o))throw new t.DeveloperError("p2 is required.");s=r.defaultValue(s,!1);var u,d,f,l,h,m=e.origin,c=e.direction,C=a.Cartesian3.subtract(n,i,w),p=a.Cartesian3.subtract(o,i,v),q=a.Cartesian3.cross(c,p,M),y=a.Cartesian3.dot(C,q);if(s){if(y<a.CesiumMath.EPSILON6)return;if(u=a.Cartesian3.subtract(m,i,b),f=a.Cartesian3.dot(u,q),f<0||f>y)return;if(d=a.Cartesian3.cross(u,C,g),l=a.Cartesian3.dot(c,d),l<0||f+l>y)return;h=a.Cartesian3.dot(p,d)/y}else{if(Math.abs(y)<a.CesiumMath.EPSILON6)return;var E=1/y;if(u=a.Cartesian3.subtract(m,i,b),f=a.Cartesian3.dot(u,q)*E,f<0||f>1)return;if(d=a.Cartesian3.cross(u,C,g),l=a.Cartesian3.dot(c,d)*E,l<0||f+l>1)return;h=a.Cartesian3.dot(p,d)*E}return h},p.rayTriangle=function(e,t,i,n,o,s){var u=p.rayTriangleParametric(e,t,i,n,o);if(r.defined(u)&&!(u<0))return r.defined(s)||(s=new a.Cartesian3),a.Cartesian3.multiplyByScalar(e.direction,u,s),a.Cartesian3.add(e.origin,s,s)};var q=new C;function y(e,r,t,a){var i=r*r-4*e*t;if(!(i<0)){if(i>0){var n=1/(2*e),o=Math.sqrt(i),s=(-r+o)*n,u=(-r-o)*n;return s<u?(a.root0=s,a.root1=u):(a.root0=u,a.root1=s),a}var d=-r/(2*e);if(0!==d)return a.root0=a.root1=d,a}}p.lineSegmentTriangle=function(e,i,n,o,s,u,d){if(!r.defined(e))throw new t.DeveloperError("v0 is required.");if(!r.defined(i))throw new t.DeveloperError("v1 is required.");if(!r.defined(n))throw new t.DeveloperError("p0 is required.");if(!r.defined(o))throw new t.DeveloperError("p1 is required.");if(!r.defined(s))throw new t.DeveloperError("p2 is required.");var f=q;a.Cartesian3.clone(e,f.origin),a.Cartesian3.subtract(i,e,f.direction),a.Cartesian3.normalize(f.direction,f.direction);var l=p.rayTriangleParametric(f,n,o,s,u);if(!(!r.defined(l)||l<0||l>a.Cartesian3.distance(e,i)))return r.defined(d)||(d=new a.Cartesian3),a.Cartesian3.multiplyByScalar(f.direction,l,d),a.Cartesian3.add(f.origin,d,d)};var E={root0:0,root1:0};function D(e,t,i){r.defined(i)||(i=new n.Interval);var o=e.origin,s=e.direction,u=t.center,d=t.radius*t.radius,f=a.Cartesian3.subtract(o,u,M),l=a.Cartesian3.dot(s,s),h=2*a.Cartesian3.dot(s,f),m=a.Cartesian3.magnitudeSquared(f)-d,c=y(l,h,m,E);if(r.defined(c))return i.start=c.root0,i.stop=c.root1,i}p.raySphere=function(e,a,i){if(!r.defined(e))throw new t.DeveloperError("ray is required.");if(!r.defined(a))throw new t.DeveloperError("sphere is required.");if(i=D(e,a,i),r.defined(i)&&!(i.stop<0))return i.start=Math.max(i.start,0),i};var S=new C;p.lineSegmentSphere=function(e,i,n,o){if(!r.defined(e))throw new t.DeveloperError("p0 is required.");if(!r.defined(i))throw new t.DeveloperError("p1 is required.");if(!r.defined(n))throw new t.DeveloperError("sphere is required.");var s=S;a.Cartesian3.clone(e,s.origin);var u=a.Cartesian3.subtract(i,e,s.direction),d=a.Cartesian3.magnitude(u);if(a.Cartesian3.normalize(u,u),o=D(s,n,o),!(!r.defined(o)||o.stop<0||o.start>d))return o.start=Math.max(o.start,0),o.stop=Math.min(o.stop,d),o};var R=new a.Cartesian3,O=new a.Cartesian3;function P(e,r,t){var i=e+r;return a.CesiumMath.sign(e)!==a.CesiumMath.sign(r)&&Math.abs(i/Math.max(Math.abs(e),Math.abs(r)))<t?0:i}function x(e,r,t,i,n){var s,d=i*i,f=n*n,l=(e[o.Matrix3.COLUMN1ROW1]-e[o.Matrix3.COLUMN2ROW2])*f,m=n*(i*P(e[o.Matrix3.COLUMN1ROW0],e[o.Matrix3.COLUMN0ROW1],a.CesiumMath.EPSILON15)+r.y),c=e[o.Matrix3.COLUMN0ROW0]*d+e[o.Matrix3.COLUMN2ROW2]*f+i*r.x+t,C=f*P(e[o.Matrix3.COLUMN2ROW1],e[o.Matrix3.COLUMN1ROW2],a.CesiumMath.EPSILON15),p=n*(i*P(e[o.Matrix3.COLUMN2ROW0],e[o.Matrix3.COLUMN0ROW2])+r.z),w=[];if(0===p&&0===C){if(s=u.computeRealRoots(l,m,c),0===s.length)return w;var v=s[0],M=Math.sqrt(Math.max(1-v*v,0));if(w.push(new a.Cartesian3(i,n*v,n*-M)),w.push(new a.Cartesian3(i,n*v,n*M)),2===s.length){var b=s[1],g=Math.sqrt(Math.max(1-b*b,0));w.push(new a.Cartesian3(i,n*b,n*-g)),w.push(new a.Cartesian3(i,n*b,n*g))}return w}var q=p*p,y=C*C,E=l*l,D=p*C,S=E+y,R=2*(m*l+D),O=2*c*l+m*m-y+q,x=2*(c*m-D),N=c*c-q;if(0===S&&0===R&&0===O&&0===x)return w;s=h.computeRealRoots(S,R,O,x,N);var I=s.length;if(0===I)return w;for(var L=0;L<I;++L){var z,W=s[L],B=W*W,T=Math.max(1-B,0),U=Math.sqrt(T);z=a.CesiumMath.sign(l)===a.CesiumMath.sign(c)?P(l*B+c,m*W,a.CesiumMath.EPSILON12):a.CesiumMath.sign(c)===a.CesiumMath.sign(m*W)?P(l*B,m*W+c,a.CesiumMath.EPSILON12):P(l*B+m*W,c,a.CesiumMath.EPSILON12);var V=P(C*W,p,a.CesiumMath.EPSILON15),A=z*V;A<0?w.push(new a.Cartesian3(i,n*W,n*U)):A>0?w.push(new a.Cartesian3(i,n*W,n*-U)):0!==U?(w.push(new a.Cartesian3(i,n*W,n*-U)),w.push(new a.Cartesian3(i,n*W,n*U)),++L):w.push(new a.Cartesian3(i,n*W,n*U))}return w}p.rayEllipsoid=function(e,i){if(!r.defined(e))throw new t.DeveloperError("ray is required.");if(!r.defined(i))throw new t.DeveloperError("ellipsoid is required.");var o,s,u,d,f,l=i.oneOverRadii,h=a.Cartesian3.multiplyComponents(l,e.origin,R),m=a.Cartesian3.multiplyComponents(l,e.direction,O),c=a.Cartesian3.magnitudeSquared(h),C=a.Cartesian3.dot(h,m);if(c>1){if(C>=0)return;var p=C*C;if(o=c-1,s=a.Cartesian3.magnitudeSquared(m),u=s*o,p<u)return;if(p>u){d=C*C-u,f=-C+Math.sqrt(d);var w=f/s,v=o/f;return w<v?new n.Interval(w,v):{start:v,stop:w}}var M=Math.sqrt(o/s);return new n.Interval(M,M)}return c<1?(o=c-1,s=a.Cartesian3.magnitudeSquared(m),u=s*o,d=C*C-u,f=-C+Math.sqrt(d),new n.Interval(0,f/s)):C<0?(s=a.Cartesian3.magnitudeSquared(m),new n.Interval(0,-C/s)):void 0};var N=new a.Cartesian3,I=new a.Cartesian3,L=new a.Cartesian3,z=new a.Cartesian3,W=new a.Cartesian3,B=new o.Matrix3,T=new o.Matrix3,U=new o.Matrix3,V=new o.Matrix3,A=new o.Matrix3,Z=new o.Matrix3,k=new o.Matrix3,j=new a.Cartesian3,F=new a.Cartesian3,G=new i.Cartographic;p.grazingAltitudeLocation=function(e,i){if(!r.defined(e))throw new t.DeveloperError("ray is required.");if(!r.defined(i))throw new t.DeveloperError("ellipsoid is required.");var n=e.origin,s=e.direction;if(!a.Cartesian3.equals(n,a.Cartesian3.ZERO)){var u=i.geodeticSurfaceNormal(n,N);if(a.Cartesian3.dot(s,u)>=0)return n}var d=r.defined(this.rayEllipsoid(e,i)),f=i.transformPositionToScaledSpace(s,N),l=a.Cartesian3.normalize(f,f),h=a.Cartesian3.mostOrthogonalAxis(f,z),m=a.Cartesian3.normalize(a.Cartesian3.cross(h,l,I),I),c=a.Cartesian3.normalize(a.Cartesian3.cross(l,m,L),L),C=B;C[0]=l.x,C[1]=l.y,C[2]=l.z,C[3]=m.x,C[4]=m.y,C[5]=m.z,C[6]=c.x,C[7]=c.y,C[8]=c.z;var p=o.Matrix3.transpose(C,T),w=o.Matrix3.fromScale(i.radii,U),v=o.Matrix3.fromScale(i.oneOverRadii,V),M=A;M[0]=0,M[1]=-s.z,M[2]=s.y,M[3]=s.z,M[4]=0,M[5]=-s.x,M[6]=-s.y,M[7]=s.x,M[8]=0;var b,g,q=o.Matrix3.multiply(o.Matrix3.multiply(p,v,Z),M,Z),y=o.Matrix3.multiply(o.Matrix3.multiply(q,w,k),C,k),E=o.Matrix3.multiplyByVector(q,n,W),D=x(y,a.Cartesian3.negate(E,N),0,0,1),S=D.length;if(S>0){for(var R=a.Cartesian3.clone(a.Cartesian3.ZERO,F),O=Number.NEGATIVE_INFINITY,P=0;P<S;++P){b=o.Matrix3.multiplyByVector(w,o.Matrix3.multiplyByVector(C,D[P],j),j);var Y=a.Cartesian3.normalize(a.Cartesian3.subtract(b,n,z),z),_=a.Cartesian3.dot(Y,s);_>O&&(O=_,R=a.Cartesian3.clone(b,R))}var H=i.cartesianToCartographic(R,G);return O=a.CesiumMath.clamp(O,0,1),g=a.Cartesian3.magnitude(a.Cartesian3.subtract(R,n,z))*Math.sqrt(1-O*O),g=d?-g:g,H.height=g,i.cartographicToCartesian(H,new a.Cartesian3)}};var Y=new a.Cartesian3;p.lineSegmentPlane=function(e,i,n,o){if(!r.defined(e))throw new t.DeveloperError("endPoint0 is required.");if(!r.defined(i))throw new t.DeveloperError("endPoint1 is required.");if(!r.defined(n))throw new t.DeveloperError("plane is required.");r.defined(o)||(o=new a.Cartesian3);var s=a.Cartesian3.subtract(i,e,Y),u=n.normal,d=a.Cartesian3.dot(u,s);if(!(Math.abs(d)<a.CesiumMath.EPSILON6)){var f=a.Cartesian3.dot(u,e),l=-(n.distance+f)/d;if(!(l<0||l>1))return a.Cartesian3.multiplyByScalar(s,l,o),a.Cartesian3.add(e,o,o),o}},p.trianglePlaneIntersection=function(e,i,n,o){if(!r.defined(e)||!r.defined(i)||!r.defined(n)||!r.defined(o))throw new t.DeveloperError("p0, p1, p2, and plane are required.");var s,u,d=o.normal,f=o.distance,l=a.Cartesian3.dot(d,e)+f<0,h=a.Cartesian3.dot(d,i)+f<0,m=a.Cartesian3.dot(d,n)+f<0,c=0;if(c+=l?1:0,c+=h?1:0,c+=m?1:0,1!==c&&2!==c||(s=new a.Cartesian3,u=new a.Cartesian3),1===c){if(l)return p.lineSegmentPlane(e,i,o,s),p.lineSegmentPlane(e,n,o,u),{positions:[e,i,n,s,u],indices:[0,3,4,1,2,4,1,4,3]};if(h)return p.lineSegmentPlane(i,n,o,s),p.lineSegmentPlane(i,e,o,u),{positions:[e,i,n,s,u],indices:[1,3,4,2,0,4,2,4,3]};if(m)return p.lineSegmentPlane(n,e,o,s),p.lineSegmentPlane(n,i,o,u),{positions:[e,i,n,s,u],indices:[2,3,4,0,1,4,0,4,3]}}else if(2===c){if(!l)return p.lineSegmentPlane(i,e,o,s),p.lineSegmentPlane(n,e,o,u),{positions:[e,i,n,s,u],indices:[1,2,4,1,4,3,0,3,4]};if(!h)return p.lineSegmentPlane(n,i,o,s),p.lineSegmentPlane(e,i,o,u),{positions:[e,i,n,s,u],indices:[2,0,4,2,4,3,1,3,4]};if(!m)return p.lineSegmentPlane(e,n,o,s),p.lineSegmentPlane(i,n,o,u),{positions:[e,i,n,s,u],indices:[0,1,4,0,4,3,2,3,4]}}},e.IntersectionTests=p,e.Ray=C}));