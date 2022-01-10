define(["exports","./when-45f3d25d","./Check-34538dad","./Cartesian3-e69091b9","./Cartesian2-7a44370a","./BoundingSphere-bacc5cb6","./Matrix4-c65e6a1b","./Transforms-7d49a8ab","./IntersectionTests-6b77277e","./Plane-b4c954eb"],(function(e,i,t,n,a,r,s,o,m,u){"use strict";function c(e,t,a){this.minimum=n.Cartesian3.clone(i.defaultValue(e,n.Cartesian3.ZERO)),this.maximum=n.Cartesian3.clone(i.defaultValue(t,n.Cartesian3.ZERO)),a=i.defined(a)?n.Cartesian3.clone(a):n.Cartesian3.midpoint(this.minimum,this.maximum,new n.Cartesian3),this.center=a}c.fromPoints=function(e,t){if(i.defined(t)||(t=new c),!i.defined(e)||0===e.length)return t.minimum=n.Cartesian3.clone(n.Cartesian3.ZERO,t.minimum),t.maximum=n.Cartesian3.clone(n.Cartesian3.ZERO,t.maximum),t.center=n.Cartesian3.clone(n.Cartesian3.ZERO,t.center),t;for(var a=e[0].x,r=e[0].y,s=e[0].z,o=e[0].x,m=e[0].y,u=e[0].z,l=e.length,h=1;h<l;h++){var d=e[h],f=d.x,x=d.y,p=d.z;a=Math.min(f,a),o=Math.max(f,o),r=Math.min(x,r),m=Math.max(x,m),s=Math.min(p,s),u=Math.max(p,u)}var C=t.minimum;C.x=a,C.y=r,C.z=s;var y=t.maximum;return y.x=o,y.y=m,y.z=u,t.center=n.Cartesian3.midpoint(C,y,t.center),t},c.clone=function(e,t){if(i.defined(e))return i.defined(t)?(t.minimum=n.Cartesian3.clone(e.minimum,t.minimum),t.maximum=n.Cartesian3.clone(e.maximum,t.maximum),t.center=n.Cartesian3.clone(e.center,t.center),t):new c(e.minimum,e.maximum,e.center)},c.equals=function(e,t){return e===t||i.defined(e)&&i.defined(t)&&n.Cartesian3.equals(e.center,t.center)&&n.Cartesian3.equals(e.minimum,t.minimum)&&n.Cartesian3.equals(e.maximum,t.maximum)};var l=new n.Cartesian3;c.intersectPlane=function(e,i){t.Check.defined("box",e),t.Check.defined("plane",i),l=n.Cartesian3.subtract(e.maximum,e.minimum,l);var a=n.Cartesian3.multiplyByScalar(l,.5,l),s=i.normal,o=a.x*Math.abs(s.x)+a.y*Math.abs(s.y)+a.z*Math.abs(s.z),m=n.Cartesian3.dot(e.center,s)+i.distance;return m-o>0?r.Intersect.INSIDE:m+o<0?r.Intersect.OUTSIDE:r.Intersect.INTERSECTING},c.prototype.clone=function(e){return c.clone(this,e)},c.prototype.intersectPlane=function(e){return c.intersectPlane(this,e)},c.prototype.equals=function(e){return c.equals(this,e)},c.prototype.transformBy=function(e){const i=this.getCornerAry();return i.forEach((i=>{s.Matrix4.multiplyByPoint(e,i,i)})),c.fromPoints(i,this),this},c.prototype.getLength=function(){const e=(this.maximum.x-this.minimum.x)*(this.maximum.x-this.minimum.x),i=(this.maximum.y-this.minimum.y)*(this.maximum.y-this.minimum.y);return Math.sqrt(e+i)},c.prototype.getCornerAry=function(){const e=[];for(let i=0;i<2;++i)for(let t=0;t<2;++t)for(let a=0;a<2;++a){const r=0!==i?this.maximum.x:this.minimum.x,s=0!==t?this.maximum.y:this.minimum.y,o=0!==a?this.maximum.z:this.minimum.z,m=new n.Cartesian3(r,s,o);e.push(m)}return e},c.prototype.addBox=function(e){const i=[this.minimum,this.maximum,e.minimum,e.maximum];c.fromPoints(i,this)},c.prototype.addPt=function(e){const i=[this.minimum,this.maximum,e];c.fromPoints(i,this)},c.prototype.isOverlap=function(e){return!(e.minimum.x-this.maximum.x>1e-6||this.minimum.x-e.maximum.x>1e-6)&&(!(e.minimum.y-this.maximum.y>1e-6||this.minimum.y-e.maximum.y>1e-6)&&!(e.minimum.z-this.maximum.z>1e-6||this.minimum.z-e.maximum.z>1e-6))},c.fromBoundingSphere=function(e,i){let t=new n.Cartesian3(e.x-i,e.y-i,e.z-i),a=new n.Cartesian3(e.x+i,e.y+i,e.z+i);return new c(t,a)};var h=new s.Cartesian4;function d(e,r){if(t.Check.defined("origin",e),r=i.defaultValue(r,a.Ellipsoid.WGS84),e=r.scaleToGeodeticSurface(e),!i.defined(e))throw new t.DeveloperError("origin must not be at the center of the ellipsoid.");var m=o.Transforms.eastNorthUpToFixedFrame(e,r);this._ellipsoid=r,this._origin=e,this._xAxis=n.Cartesian3.fromCartesian4(s.Matrix4.getColumn(m,0,h)),this._yAxis=n.Cartesian3.fromCartesian4(s.Matrix4.getColumn(m,1,h));var c=n.Cartesian3.fromCartesian4(s.Matrix4.getColumn(m,2,h));this._plane=u.Plane.fromPointNormal(e,c)}Object.defineProperties(d.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},origin:{get:function(){return this._origin}},plane:{get:function(){return this._plane}},xAxis:{get:function(){return this._xAxis}},yAxis:{get:function(){return this._yAxis}},zAxis:{get:function(){return this._plane.normal}}});var f=new c;d.fromPoints=function(e,i){t.Check.defined("cartesians",e);var n=c.fromPoints(e,f);return new d(n.center,i)};var x=new m.Ray,p=new n.Cartesian3;d.prototype.projectPointOntoPlane=function(e,r){t.Check.defined("cartesian",e);var s=x;s.origin=e,n.Cartesian3.normalize(e,s.direction);var o=m.IntersectionTests.rayPlane(s,this._plane,p);if(i.defined(o)||(n.Cartesian3.negate(s.direction,s.direction),o=m.IntersectionTests.rayPlane(s,this._plane,p)),i.defined(o)){var u=n.Cartesian3.subtract(o,this._origin,o),c=n.Cartesian3.dot(this._xAxis,u),l=n.Cartesian3.dot(this._yAxis,u);return i.defined(r)?(r.x=c,r.y=l,r):new a.Cartesian2(c,l)}},d.prototype.projectPointsOntoPlane=function(e,n){t.Check.defined("cartesians",e),i.defined(n)||(n=[]);for(var a=0,r=e.length,s=0;s<r;s++){var o=this.projectPointOntoPlane(e[s],n[a]);i.defined(o)&&(n[a]=o,a++)}return n.length=a,n},d.prototype.projectPointToNearestOnPlane=function(e,r){t.Check.defined("cartesian",e),i.defined(r)||(r=new a.Cartesian2);var s=x;s.origin=e,n.Cartesian3.clone(this._plane.normal,s.direction);var o=m.IntersectionTests.rayPlane(s,this._plane,p);i.defined(o)||(n.Cartesian3.negate(s.direction,s.direction),o=m.IntersectionTests.rayPlane(s,this._plane,p));var u=n.Cartesian3.subtract(o,this._origin,o),c=n.Cartesian3.dot(this._xAxis,u),l=n.Cartesian3.dot(this._yAxis,u);return r.x=c,r.y=l,r},d.prototype.projectPointsToNearestOnPlane=function(e,n){t.Check.defined("cartesians",e),i.defined(n)||(n=[]);var a=e.length;n.length=a;for(var r=0;r<a;r++)n[r]=this.projectPointToNearestOnPlane(e[r],n[r]);return n};var C=new n.Cartesian3;d.prototype.projectPointOntoEllipsoid=function(e,a){t.Check.defined("cartesian",e),i.defined(a)||(a=new n.Cartesian3);var r=this._ellipsoid,s=this._origin,o=this._xAxis,m=this._yAxis,u=C;return n.Cartesian3.multiplyByScalar(o,e.x,u),a=n.Cartesian3.add(s,u,a),n.Cartesian3.multiplyByScalar(m,e.y,u),n.Cartesian3.add(a,u,a),r.scaleToGeocentricSurface(a,a),a},d.prototype.projectPointsOntoEllipsoid=function(e,n){t.Check.defined("cartesians",e);var a=e.length;i.defined(n)?n.length=a:n=new Array(a);for(var r=0;r<a;++r)n[r]=this.projectPointOntoEllipsoid(e[r],n[r]);return n},e.AxisAlignedBoundingBox=c,e.EllipsoidTangentPlane=d}));