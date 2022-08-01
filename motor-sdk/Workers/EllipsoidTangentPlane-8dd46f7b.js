define(["exports","./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./Transforms-37754d60","./Matrix4-ed224189","./IntersectionTests-bcbcfcb9","./Plane-87957166","./AxisAlignedBoundingBox-5231ffa2"],(function(e,n,t,i,r,a,o,s,d,c){"use strict";var l=new o.Cartesian4;function f(e,s){if(t.Check.defined("origin",e),s=n.defaultValue(s,r.Ellipsoid.WGS84),e=s.scaleToGeodeticSurface(e),!n.defined(e))throw new t.DeveloperError("origin must not be at the center of the ellipsoid.");var c=a.Transforms.eastNorthUpToFixedFrame(e,s);this._ellipsoid=s,this._origin=e,this._xAxis=i.Cartesian3.fromCartesian4(o.Matrix4.getColumn(c,0,l)),this._yAxis=i.Cartesian3.fromCartesian4(o.Matrix4.getColumn(c,1,l));var f=i.Cartesian3.fromCartesian4(o.Matrix4.getColumn(c,2,l));this._plane=d.Plane.fromPointNormal(e,f)}Object.defineProperties(f.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},origin:{get:function(){return this._origin}},plane:{get:function(){return this._plane}},xAxis:{get:function(){return this._xAxis}},yAxis:{get:function(){return this._yAxis}},zAxis:{get:function(){return this._plane.normal}}});var h=new c.AxisAlignedBoundingBox;f.fromPoints=function(e,n){t.Check.defined("cartesians",e);var i=c.AxisAlignedBoundingBox.fromPoints(e,h);return new f(i.center,n)};var p=new s.Ray,u=new i.Cartesian3;f.prototype.projectPointOntoPlane=function(e,a){t.Check.defined("cartesian",e);var o=p;o.origin=e,i.Cartesian3.normalize(e,o.direction);var d=s.IntersectionTests.rayPlane(o,this._plane,u);if(n.defined(d)||(i.Cartesian3.negate(o.direction,o.direction),d=s.IntersectionTests.rayPlane(o,this._plane,u)),n.defined(d)){var c=i.Cartesian3.subtract(d,this._origin,d),l=i.Cartesian3.dot(this._xAxis,c),f=i.Cartesian3.dot(this._yAxis,c);return n.defined(a)?(a.x=l,a.y=f,a):new r.Cartesian2(l,f)}},f.prototype.projectPointsOntoPlane=function(e,i){t.Check.defined("cartesians",e),n.defined(i)||(i=[]);for(var r=0,a=e.length,o=0;o<a;o++){var s=this.projectPointOntoPlane(e[o],i[r]);n.defined(s)&&(i[r]=s,r++)}return i.length=r,i},f.prototype.projectPointToNearestOnPlane=function(e,a){t.Check.defined("cartesian",e),n.defined(a)||(a=new r.Cartesian2);var o=p;o.origin=e,i.Cartesian3.clone(this._plane.normal,o.direction);var d=s.IntersectionTests.rayPlane(o,this._plane,u);n.defined(d)||(i.Cartesian3.negate(o.direction,o.direction),d=s.IntersectionTests.rayPlane(o,this._plane,u));var c=i.Cartesian3.subtract(d,this._origin,d),l=i.Cartesian3.dot(this._xAxis,c),f=i.Cartesian3.dot(this._yAxis,c);return a.x=l,a.y=f,a},f.prototype.projectPointsToNearestOnPlane=function(e,i){t.Check.defined("cartesians",e),n.defined(i)||(i=[]);var r=e.length;i.length=r;for(var a=0;a<r;a++)i[a]=this.projectPointToNearestOnPlane(e[a],i[a]);return i};var C=new i.Cartesian3;f.prototype.projectPointOntoEllipsoid=function(e,r){t.Check.defined("cartesian",e),n.defined(r)||(r=new i.Cartesian3);var a=this._ellipsoid,o=this._origin,s=this._xAxis,d=this._yAxis,c=C;return i.Cartesian3.multiplyByScalar(s,e.x,c),r=i.Cartesian3.add(o,c,r),i.Cartesian3.multiplyByScalar(d,e.y,c),i.Cartesian3.add(r,c,r),a.scaleToGeocentricSurface(r,r),r},f.prototype.projectPointsOntoEllipsoid=function(e,i){t.Check.defined("cartesians",e);var r=e.length;n.defined(i)?i.length=r:i=new Array(r);for(var a=0;a<r;++a)i[a]=this.projectPointOntoEllipsoid(e[a],i[a]);return i},e.EllipsoidTangentPlane=f}));