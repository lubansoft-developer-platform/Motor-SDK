define(["exports","./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Transforms-37754d60","./Matrix4-ed224189"],(function(i,m,t,n,e,a){"use strict";function r(i,t,e){this.minimum=n.Cartesian3.clone(m.defaultValue(i,n.Cartesian3.ZERO)),this.maximum=n.Cartesian3.clone(m.defaultValue(t,n.Cartesian3.ZERO)),e=m.defined(e)?n.Cartesian3.clone(e):n.Cartesian3.midpoint(this.minimum,this.maximum,new n.Cartesian3),this.center=e}r.fromPoints=function(i,t){if(m.defined(t)||(t=new r),!m.defined(i)||0===i.length)return t.minimum=n.Cartesian3.clone(n.Cartesian3.ZERO,t.minimum),t.maximum=n.Cartesian3.clone(n.Cartesian3.ZERO,t.maximum),t.center=n.Cartesian3.clone(n.Cartesian3.ZERO,t.center),t;for(var e=i[0].x,a=i[0].y,s=i[0].z,u=i[0].x,o=i[0].y,c=i[0].z,h=i.length,x=1;x<h;x++){var f=i[x],l=f.x,d=f.y,y=f.z;e=Math.min(l,e),u=Math.max(l,u),a=Math.min(d,a),o=Math.max(d,o),s=Math.min(y,s),c=Math.max(y,c)}var C=t.minimum;C.x=e,C.y=a,C.z=s;var p=t.maximum;return p.x=u,p.y=o,p.z=c,t.center=n.Cartesian3.midpoint(C,p,t.center),t},r.clone=function(i,t){if(m.defined(i))return m.defined(t)?(t.minimum=n.Cartesian3.clone(i.minimum,t.minimum),t.maximum=n.Cartesian3.clone(i.maximum,t.maximum),t.center=n.Cartesian3.clone(i.center,t.center),t):new r(i.minimum,i.maximum,i.center)},r.equals=function(i,t){return i===t||m.defined(i)&&m.defined(t)&&n.Cartesian3.equals(i.center,t.center)&&n.Cartesian3.equals(i.minimum,t.minimum)&&n.Cartesian3.equals(i.maximum,t.maximum)};var s=new n.Cartesian3;r.intersectPlane=function(i,m){t.Check.defined("box",i),t.Check.defined("plane",m),s=n.Cartesian3.subtract(i.maximum,i.minimum,s);var a=n.Cartesian3.multiplyByScalar(s,.5,s),r=m.normal,u=a.x*Math.abs(r.x)+a.y*Math.abs(r.y)+a.z*Math.abs(r.z),o=n.Cartesian3.dot(i.center,r)+m.distance;return o-u>0?e.Intersect.INSIDE:o+u<0?e.Intersect.OUTSIDE:e.Intersect.INTERSECTING},r.prototype.clone=function(i){return r.clone(this,i)},r.prototype.intersectPlane=function(i){return r.intersectPlane(this,i)},r.prototype.equals=function(i){return r.equals(this,i)},r.prototype.transformBy=function(i){const m=this.getCornerAry();return m.forEach((m=>{a.Matrix4.multiplyByPoint(i,m,m)})),r.fromPoints(m,this),this},r.prototype.getLength=function(){const i=(this.maximum.x-this.minimum.x)*(this.maximum.x-this.minimum.x),m=(this.maximum.y-this.minimum.y)*(this.maximum.y-this.minimum.y);return Math.sqrt(i+m)},r.prototype.getCornerAry=function(){const i=[];for(let m=0;m<2;++m)for(let t=0;t<2;++t)for(let e=0;e<2;++e){const a=0!==m?this.maximum.x:this.minimum.x,r=0!==t?this.maximum.y:this.minimum.y,s=0!==e?this.maximum.z:this.minimum.z,u=new n.Cartesian3(a,r,s);i.push(u)}return i},r.prototype.addBox=function(i){const m=[this.minimum,this.maximum,i.minimum,i.maximum];r.fromPoints(m,this)},r.prototype.addPt=function(i){const m=[this.minimum,this.maximum,i];r.fromPoints(m,this)},r.prototype.isOverlap=function(i){return!(i.minimum.x-this.maximum.x>1e-6||this.minimum.x-i.maximum.x>1e-6)&&(!(i.minimum.y-this.maximum.y>1e-6||this.minimum.y-i.maximum.y>1e-6)&&!(i.minimum.z-this.maximum.z>1e-6||this.minimum.z-i.maximum.z>1e-6))},r.fromBoundingSphere=function(i,m){let t=new n.Cartesian3(i.x-m,i.y-m,i.z-m),e=new n.Cartesian3(i.x+m,i.y+m,i.z+m);return new r(t,e)},i.AxisAlignedBoundingBox=r}));