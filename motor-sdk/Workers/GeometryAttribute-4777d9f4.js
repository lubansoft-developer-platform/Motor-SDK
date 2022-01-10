define(["exports","./when-45f3d25d","./Check-34538dad","./Cartesian3-e69091b9","./Cartesian2-7a44370a","./Matrix4-c65e6a1b","./Rectangle-c7d55cfa","./PrimitiveType-30fa6f85","./Transforms-68229cf3"],(function(e,t,r,n,a,i,o,u,c){"use strict";var s={NONE:0,TRIANGLES:1,LINES:2,POLYLINES:3},f=Object.freeze(s);function l(e,r,n,a){this[0]=t.defaultValue(e,0),this[1]=t.defaultValue(n,0),this[2]=t.defaultValue(r,0),this[3]=t.defaultValue(a,0)}l.packedLength=4,l.pack=function(e,n,a){return r.Check.typeOf.object("value",e),r.Check.defined("array",n),a=t.defaultValue(a,0),n[a++]=e[0],n[a++]=e[1],n[a++]=e[2],n[a++]=e[3],n},l.unpack=function(e,n,a){return r.Check.defined("array",e),n=t.defaultValue(n,0),t.defined(a)||(a=new l),a[0]=e[n++],a[1]=e[n++],a[2]=e[n++],a[3]=e[n++],a},l.clone=function(e,r){if(t.defined(e))return t.defined(r)?(r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=e[3],r):new l(e[0],e[2],e[1],e[3])},l.fromArray=function(e,n,a){return r.Check.defined("array",e),n=t.defaultValue(n,0),t.defined(a)||(a=new l),a[0]=e[n],a[1]=e[n+1],a[2]=e[n+2],a[3]=e[n+3],a},l.fromColumnMajorArray=function(e,t){return r.Check.defined("values",e),l.clone(e,t)},l.fromRowMajorArray=function(e,n){return r.Check.defined("values",e),t.defined(n)?(n[0]=e[0],n[1]=e[2],n[2]=e[1],n[3]=e[3],n):new l(e[0],e[1],e[2],e[3])},l.fromScale=function(e,n){return r.Check.typeOf.object("scale",e),t.defined(n)?(n[0]=e.x,n[1]=0,n[2]=0,n[3]=e.y,n):new l(e.x,0,0,e.y)},l.fromUniformScale=function(e,n){return r.Check.typeOf.number("scale",e),t.defined(n)?(n[0]=e,n[1]=0,n[2]=0,n[3]=e,n):new l(e,0,0,e)},l.fromRotation=function(e,n){r.Check.typeOf.number("angle",e);var a=Math.cos(e),i=Math.sin(e);return t.defined(n)?(n[0]=a,n[1]=i,n[2]=-i,n[3]=a,n):new l(a,-i,i,a)},l.toArray=function(e,n){return r.Check.typeOf.object("matrix",e),t.defined(n)?(n[0]=e[0],n[1]=e[1],n[2]=e[2],n[3]=e[3],n):[e[0],e[1],e[2],e[3]]},l.getElementIndex=function(e,t){return r.Check.typeOf.number.greaterThanOrEquals("row",t,0),r.Check.typeOf.number.lessThanOrEquals("row",t,1),r.Check.typeOf.number.greaterThanOrEquals("column",e,0),r.Check.typeOf.number.lessThanOrEquals("column",e,1),2*e+t},l.getColumn=function(e,t,n){r.Check.typeOf.object("matrix",e),r.Check.typeOf.number.greaterThanOrEquals("index",t,0),r.Check.typeOf.number.lessThanOrEquals("index",t,1),r.Check.typeOf.object("result",n);var a=2*t,i=e[a],o=e[a+1];return n.x=i,n.y=o,n},l.setColumn=function(e,t,n,a){r.Check.typeOf.object("matrix",e),r.Check.typeOf.number.greaterThanOrEquals("index",t,0),r.Check.typeOf.number.lessThanOrEquals("index",t,1),r.Check.typeOf.object("cartesian",n),r.Check.typeOf.object("result",a),a=l.clone(e,a);var i=2*t;return a[i]=n.x,a[i+1]=n.y,a},l.getRow=function(e,t,n){r.Check.typeOf.object("matrix",e),r.Check.typeOf.number.greaterThanOrEquals("index",t,0),r.Check.typeOf.number.lessThanOrEquals("index",t,1),r.Check.typeOf.object("result",n);var a=e[t],i=e[t+2];return n.x=a,n.y=i,n},l.setRow=function(e,t,n,a){return r.Check.typeOf.object("matrix",e),r.Check.typeOf.number.greaterThanOrEquals("index",t,0),r.Check.typeOf.number.lessThanOrEquals("index",t,1),r.Check.typeOf.object("cartesian",n),r.Check.typeOf.object("result",a),a=l.clone(e,a),a[t]=n.x,a[t+2]=n.y,a};var h=new a.Cartesian2;l.getScale=function(e,t){return r.Check.typeOf.object("matrix",e),r.Check.typeOf.object("result",t),t.x=a.Cartesian2.magnitude(a.Cartesian2.fromElements(e[0],e[1],h)),t.y=a.Cartesian2.magnitude(a.Cartesian2.fromElements(e[2],e[3],h)),t};var p=new a.Cartesian2;function y(e){e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT),r.Check.typeOf.object("options.attributes",e.attributes),this.attributes=e.attributes,this.indices=e.indices,this.primitiveType=t.defaultValue(e.primitiveType,u.PrimitiveType.TRIANGLES),this.boundingSphere=e.boundingSphere,this.geometryType=t.defaultValue(e.geometryType,f.NONE),this.boundingSphereCV=e.boundingSphereCV,this.offsetAttribute=e.offsetAttribute}l.getMaximumScale=function(e){return l.getScale(e,p),a.Cartesian2.maximumComponent(p)},l.multiply=function(e,t,n){r.Check.typeOf.object("left",e),r.Check.typeOf.object("right",t),r.Check.typeOf.object("result",n);var a=e[0]*t[0]+e[2]*t[1],i=e[0]*t[2]+e[2]*t[3],o=e[1]*t[0]+e[3]*t[1],u=e[1]*t[2]+e[3]*t[3];return n[0]=a,n[1]=o,n[2]=i,n[3]=u,n},l.add=function(e,t,n){return r.Check.typeOf.object("left",e),r.Check.typeOf.object("right",t),r.Check.typeOf.object("result",n),n[0]=e[0]+t[0],n[1]=e[1]+t[1],n[2]=e[2]+t[2],n[3]=e[3]+t[3],n},l.subtract=function(e,t,n){return r.Check.typeOf.object("left",e),r.Check.typeOf.object("right",t),r.Check.typeOf.object("result",n),n[0]=e[0]-t[0],n[1]=e[1]-t[1],n[2]=e[2]-t[2],n[3]=e[3]-t[3],n},l.multiplyByVector=function(e,t,n){r.Check.typeOf.object("matrix",e),r.Check.typeOf.object("cartesian",t),r.Check.typeOf.object("result",n);var a=e[0]*t.x+e[2]*t.y,i=e[1]*t.x+e[3]*t.y;return n.x=a,n.y=i,n},l.multiplyByScalar=function(e,t,n){return r.Check.typeOf.object("matrix",e),r.Check.typeOf.number("scalar",t),r.Check.typeOf.object("result",n),n[0]=e[0]*t,n[1]=e[1]*t,n[2]=e[2]*t,n[3]=e[3]*t,n},l.multiplyByScale=function(e,t,n){return r.Check.typeOf.object("matrix",e),r.Check.typeOf.object("scale",t),r.Check.typeOf.object("result",n),n[0]=e[0]*t.x,n[1]=e[1]*t.x,n[2]=e[2]*t.y,n[3]=e[3]*t.y,n},l.negate=function(e,t){return r.Check.typeOf.object("matrix",e),r.Check.typeOf.object("result",t),t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=-e[3],t},l.transpose=function(e,t){r.Check.typeOf.object("matrix",e),r.Check.typeOf.object("result",t);var n=e[0],a=e[2],i=e[1],o=e[3];return t[0]=n,t[1]=a,t[2]=i,t[3]=o,t},l.abs=function(e,t){return r.Check.typeOf.object("matrix",e),r.Check.typeOf.object("result",t),t[0]=Math.abs(e[0]),t[1]=Math.abs(e[1]),t[2]=Math.abs(e[2]),t[3]=Math.abs(e[3]),t},l.equals=function(e,r){return e===r||t.defined(e)&&t.defined(r)&&e[0]===r[0]&&e[1]===r[1]&&e[2]===r[2]&&e[3]===r[3]},l.equalsArray=function(e,t,r){return e[0]===t[r]&&e[1]===t[r+1]&&e[2]===t[r+2]&&e[3]===t[r+3]},l.equalsEpsilon=function(e,r,n){return n=t.defaultValue(n,0),e===r||t.defined(e)&&t.defined(r)&&Math.abs(e[0]-r[0])<=n&&Math.abs(e[1]-r[1])<=n&&Math.abs(e[2]-r[2])<=n&&Math.abs(e[3]-r[3])<=n},l.IDENTITY=Object.freeze(new l(1,0,0,1)),l.ZERO=Object.freeze(new l(0,0,0,0)),l.COLUMN0ROW0=0,l.COLUMN0ROW1=1,l.COLUMN1ROW0=2,l.COLUMN1ROW1=3,Object.defineProperties(l.prototype,{length:{get:function(){return l.packedLength}}}),l.prototype.clone=function(e){return l.clone(this,e)},l.prototype.equals=function(e){return l.equals(this,e)},l.prototype.equalsEpsilon=function(e,t){return l.equalsEpsilon(this,e,t)},l.prototype.toString=function(){return"("+this[0]+", "+this[2]+")\n("+this[1]+", "+this[3]+")"},y.computeNumberOfVertices=function(e){r.Check.typeOf.object("geometry",e);var n=-1;for(var a in e.attributes)if(e.attributes.hasOwnProperty(a)&&t.defined(e.attributes[a])&&t.defined(e.attributes[a].values)){var i=e.attributes[a],o=i.values.length/i.componentsPerAttribute;if(n!==o&&-1!==n)throw new r.DeveloperError("All attribute lists must have the same number of attributes.");n=o}return n};var b=new a.Cartographic,m=new n.Cartesian3,C=new i.Matrix4,d=[new a.Cartographic,new a.Cartographic,new a.Cartographic],O=[new a.Cartesian2,new a.Cartesian2,new a.Cartesian2],k=[new a.Cartesian2,new a.Cartesian2,new a.Cartesian2],x=new n.Cartesian3,w=new c.Quaternion,j=new i.Matrix4,g=new l;function v(e){if(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT),!t.defined(e.componentDatatype))throw new r.DeveloperError("options.componentDatatype is required.");if(!t.defined(e.componentsPerAttribute))throw new r.DeveloperError("options.componentsPerAttribute is required.");if(e.componentsPerAttribute<1||e.componentsPerAttribute>4)throw new r.DeveloperError("options.componentsPerAttribute must be between 1 and 4.");if(!t.defined(e.values))throw new r.DeveloperError("options.values is required.");this.componentDatatype=e.componentDatatype,this.componentsPerAttribute=e.componentsPerAttribute,this.normalize=t.defaultValue(e.normalize,!1),this.values=e.values}y._textureCoordinateRotationPoints=function(e,t,r,u){var s,f=o.Rectangle.center(u,b),h=a.Cartographic.toCartesian(f,r,m),p=c.Transforms.eastNorthUpToFixedFrame(h,r,C),y=i.Matrix4.inverse(p,C),v=O,E=d;E[0].longitude=u.west,E[0].latitude=u.south,E[1].longitude=u.west,E[1].latitude=u.north,E[2].longitude=u.east,E[2].latitude=u.south;var T=x;for(s=0;s<3;s++)a.Cartographic.toCartesian(E[s],r,T),T=i.Matrix4.multiplyByPointAsVector(y,T,T),v[s].x=T.x,v[s].y=T.y;var M=c.Quaternion.fromAxisAngle(n.Cartesian3.UNIT_Z,-t,w),N=i.Matrix3.fromQuaternion(M,j),V=e.length,A=Number.POSITIVE_INFINITY,I=Number.POSITIVE_INFINITY,q=Number.NEGATIVE_INFINITY,P=Number.NEGATIVE_INFINITY;for(s=0;s<V;s++)T=i.Matrix4.multiplyByPointAsVector(y,e[s],T),T=i.Matrix3.multiplyByVector(N,T,T),A=Math.min(A,T.x),I=Math.min(I,T.y),q=Math.max(q,T.x),P=Math.max(P,T.y);var S=l.fromRotation(t,g),R=k;R[0].x=A,R[0].y=I,R[1].x=A,R[1].y=P,R[2].x=q,R[2].y=I;var L=v[0],D=v[2].x-L.x,B=v[1].y-L.y;for(s=0;s<3;s++){var Y=R[s];l.multiplyByVector(S,Y,Y),Y.x=(Y.x-L.x)/D,Y.y=(Y.y-L.y)/B}var _=R[0],G=R[1],U=R[2],F=new Array(6);return a.Cartesian2.pack(_,F),a.Cartesian2.pack(G,F,2),a.Cartesian2.pack(U,F,4),F},e.Geometry=y,e.GeometryAttribute=v,e.GeometryType=f,e.Matrix2=l}));