define(["exports","./when-45f3d25d","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./Transforms-37754d60","./Matrix4-ed224189","./ComponentDatatype-86703c58","./GeometryAttribute-f2192ebb","./PrimitiveType-30fa6f85","./GeometryAttributes-9d45f9e2","./GeometryPipeline-a19a5354","./IndexDatatype-cb635cbc","./arrayRemoveDuplicates-8b568181","./ArcType-39be7a32","./EllipsoidRhumbLine-de5cdc57","./PolygonPipeline-91f66bb3"],(function(e,t,r,i,n,a,o,s,u,l,h,c,f,p,d,y){"use strict";function g(){this._array=[],this._offset=0,this._length=0}Object.defineProperties(g.prototype,{length:{get:function(){return this._length}}}),g.prototype.enqueue=function(e){this._array.push(e),this._length++},g.prototype.dequeue=function(){if(0!==this._length){var e=this._array,t=this._offset,r=e[t];return e[t]=void 0,t++,t>10&&2*t>e.length&&(this._array=e.slice(t),t=0),this._offset=t,this._length--,r}},g.prototype.peek=function(){if(0!==this._length)return this._array[this._offset]},g.prototype.contains=function(e){return-1!==this._array.indexOf(e)},g.prototype.clear=function(){this._array.length=this._offset=this._length=0},g.prototype.sort=function(e){this._offset>0&&(this._array=this._array.slice(this._offset),this._offset=0),this._array.sort(e)};var m={computeHierarchyPackedLength:function(e){var i=0,n=[e];while(n.length>0){var a=n.pop();if(t.defined(a)){i+=2;var o=a.positions,s=a.holes;if(t.defined(o)&&(i+=o.length*r.Cartesian3.packedLength),t.defined(s))for(var u=s.length,l=0;l<u;++l)n.push(s[l])}}return i},packPolygonHierarchy:function(e,i,n){var a=[e];while(a.length>0){var o=a.pop();if(t.defined(o)){var s=o.positions,u=o.holes;if(i[n++]=t.defined(s)?s.length:0,i[n++]=t.defined(u)?u.length:0,t.defined(s))for(var l=s.length,h=0;h<l;++h,n+=3)r.Cartesian3.pack(s[h],i,n);if(t.defined(u))for(var c=u.length,f=0;f<c;++f)a.push(u[f])}}return n},unpackPolygonHierarchy:function(e,t){for(var i=e[t++],n=e[t++],a=new Array(i),o=n>0?new Array(n):void 0,s=0;s<i;++s,t+=r.Cartesian3.packedLength)a[s]=r.Cartesian3.unpack(e,t);for(var u=0;u<n;++u)o[u]=m.unpackPolygonHierarchy(e,t),t=o[u].startingIndex,delete o[u].startingIndex;return{positions:a,holes:o,startingIndex:t}}},v=new r.Cartesian3;function C(e,t,i,n){return r.Cartesian3.subtract(t,e,v),r.Cartesian3.multiplyByScalar(v,i/n,v),r.Cartesian3.add(e,v,v),[v.x,v.y,v.z]}m.subdivideLineCount=function(e,t,i){var n=r.Cartesian3.distance(e,t),a=n/i,o=Math.max(0,Math.ceil(r.CesiumMath.log2(a)));return Math.pow(2,o)};var b=new i.Cartographic,I=new i.Cartographic,T=new i.Cartographic,w=new r.Cartesian3;m.subdivideRhumbLineCount=function(e,t,i,n){var a=e.cartesianToCartographic(t,b),o=e.cartesianToCartographic(i,I),s=new d.EllipsoidRhumbLine(a,o,e),u=s.surfaceDistance/n,l=Math.max(0,Math.ceil(r.CesiumMath.log2(u)));return Math.pow(2,l)},m.subdivideLine=function(e,i,n,a){var o=m.subdivideLineCount(e,i,n),s=r.Cartesian3.distance(e,i),u=s/o;t.defined(a)||(a=[]);var l=a;l.length=3*o;for(var h=0,c=0;c<o;c++){var f=C(e,i,c*u,s);l[h++]=f[0],l[h++]=f[1],l[h++]=f[2]}return l},m.subdivideRhumbLine=function(e,i,n,a,o){var s=e.cartesianToCartographic(i,b),u=e.cartesianToCartographic(n,I),l=new d.EllipsoidRhumbLine(s,u,e),h=l.surfaceDistance/a,c=Math.max(0,Math.ceil(r.CesiumMath.log2(h))),f=Math.pow(2,c),p=l.surfaceDistance/f;t.defined(o)||(o=[]);var y=o;y.length=3*f;for(var g=0,m=0;m<f;m++){var v=l.interpolateUsingSurfaceDistance(m*p,T),C=e.cartographicToCartesian(v,w);y[g++]=C.x,y[g++]=C.y,y[g++]=C.z}return y};var x=new r.Cartesian3,E=new r.Cartesian3,N=new r.Cartesian3,_=new r.Cartesian3;m.scaleToGeodeticHeightExtruded=function(e,n,a,o,s,u){o=t.defaultValue(o,i.Ellipsoid.WGS84);var l=x,h=E,c=N,f=_;if(t.defined(e)&&t.defined(e.attributes)&&t.defined(e.attributes.position))for(var p=e.attributes.position.values,d=p.length/2,y=0;y<d;y+=3)r.Cartesian3.fromArray(p,y,c),u?(l=r.Cartesian3.clone(r.Cartesian3.UNIT_Z,l),f=r.Cartesian3.clone(c,f),s&&(f.z=0)):(o.geodeticSurfaceNormal(c,l),f=o.scaleToGeodeticSurface(c,f)),h=r.Cartesian3.multiplyByScalar(l,a,h),h=r.Cartesian3.add(f,h,h),p[y+d]=h.x,p[y+1+d]=h.y,p[y+2+d]=h.z,s&&(f=r.Cartesian3.clone(c,f)),h=r.Cartesian3.multiplyByScalar(l,n,h),h=r.Cartesian3.add(f,h,h),p[y]=h.x,p[y+1]=h.y,p[y+2]=h.z;return e},m.polygonOutlinesFromHierarchy=function(e,i,n,a){var o,s,u,l=[],h=new g;h.enqueue(e);while(0!==h.length){var c=h.dequeue(),p=c.positions;if(i&&!a)for(u=p.length,o=0;o<u;o++)n.scaleToGeodeticSurface(p[o],p[o]);if(p=f.arrayRemoveDuplicates(p,r.Cartesian3.equalsEpsilon,!0),!(p.length<3)){var d=c.holes?c.holes.length:0;for(o=0;o<d;o++){var y=c.holes[o],m=y.positions;if(i)for(u=m.length,s=0;s<u;++s)n.scaleToGeodeticSurface(m[s],m[s]);if(m=f.arrayRemoveDuplicates(m,r.Cartesian3.equalsEpsilon,!0),!(m.length<3)){l.push(m);var v=0;for(t.defined(y.holes)&&(v=y.holes.length),s=0;s<v;s++)h.enqueue(y.holes[s])}}l.push(p)}}return l},m.polygonsFromHierarchy=function(e,i,n,a){var o=[],s=[],u=new g;u.enqueue(e);while(0!==u.length){var l,h,c,p=u.dequeue(),d=p.positions,m=p.holes;if(n&&t.defined(i))for(h=d.length,l=0;l<h;l++)a.scaleToGeodeticSurface(d[l],d[l]);if(d=f.arrayRemoveDuplicates(d,r.Cartesian3.equalsEpsilon,!0),!(d.length<3))if(c=i?i(d):[...d],t.defined(c)){var v=[],C=y.PolygonPipeline.computeWindingOrder2D(c);C===y.WindingOrder.CLOCKWISE&&(c.reverse(),d=d.slice().reverse());var b,I=d.slice(),T=t.defined(m)?m.length:0,w=[];for(l=0;l<T;l++){var x=m[l],E=x.positions;if(n)for(h=E.length,b=0;b<h;++b)a.scaleToGeodeticSurface(E[b],E[b]);if(E=f.arrayRemoveDuplicates(E,r.Cartesian3.equalsEpsilon,!0),!(E.length<3)){var N=i(E);if(t.defined(N)){C=y.PolygonPipeline.computeWindingOrder2D(N),C===y.WindingOrder.CLOCKWISE&&(N.reverse(),E=E.slice().reverse()),w.push(E),v.push(I.length),I=I.concat(E),c=c.concat(N);var _=0;for(t.defined(x.holes)&&(_=x.holes.length),b=0;b<_;b++)u.enqueue(x.holes[b])}}}o.push({outerRing:d,holes:w}),s.push({positions:I,positions2D:c,holes:v})}}return{hierarchy:o,polygons:s}};var P=new i.Cartesian2,A=new r.Cartesian3,M=new n.Quaternion,G=new a.Matrix3;m.computeBoundingRectangle=function(e,i,o,s,u){for(var l=n.Quaternion.fromAxisAngle(e,s,M),h=a.Matrix3.fromQuaternion(l,G),c=Number.POSITIVE_INFINITY,f=Number.NEGATIVE_INFINITY,p=Number.POSITIVE_INFINITY,d=Number.NEGATIVE_INFINITY,y=o.length,g=0;g<y;++g){var m=r.Cartesian3.clone(o[g],A);a.Matrix3.multiplyByVector(h,m,m);var v=i(m,P);t.defined(v)&&(c=Math.min(c,v.x),f=Math.max(f,v.x),p=Math.min(p,v.y),d=Math.max(d,v.y))}return u.x=c,u.y=p,u.width=f-c,u.height=d-p,u},m.computeBoundingRectanglePlaneMode=function(e,t){for(var r=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY,n=Number.POSITIVE_INFINITY,a=Number.NEGATIVE_INFINITY,o=e.length,s=0;s<o;++s){var u=e[s];r=Math.min(r,u.x),i=Math.max(i,u.x),n=Math.min(n,u.y),a=Math.max(a,u.y)}return t.x=r,t.y=n,t.width=i-r,t.height=a-n,t},m.createGeometryFromPositions=function(e,t,r,i,n,a,l){var c=y.PolygonPipeline.triangulate(t.positions2D,t.holes);c.length<3&&(c=[0,1,2]);var f=t.positions;if(i||l){for(var d=f.length,g=new Array(3*d),m=0,v=0;v<d;v++){var C=f[v];g[m++]=C.x,g[m++]=C.y,g[m++]=i?C.z:0}var b=new s.Geometry({attributes:{position:new s.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:g})},indices:c,primitiveType:u.PrimitiveType.TRIANGLES});return n.normal?h.GeometryPipeline.computeNormal(b):b}return a===p.ArcType.GEODESIC?y.PolygonPipeline.computeSubdivision(e,f,c,r):a===p.ArcType.RHUMB?y.PolygonPipeline.computeRhumbLineSubdivision(e,f,c,r):void 0};var L=[],S=new r.Cartesian3,D=new r.Cartesian3;m.computeWallGeometry=function(e,t,i,n,a,h){var f,d,y,g,v,C=e.length,b=0;if(h)for(d=3*C*2,f=new Array(2*d),y=0;y<C;y++)g=e[y],v=e[(y+1)%C],f[b]=f[b+d]=g.x,++b,f[b]=f[b+d]=g.y,++b,f[b]=f[b+d]=n?g.z:0,++b,f[b]=f[b+d]=v.x,++b,f[b]=f[b+d]=v.y,++b,f[b]=f[b+d]=n?v.z:0,++b;else{var I=r.CesiumMath.chordLength(i,t.maximumRadius),T=0;if(a===p.ArcType.GEODESIC)for(y=0;y<C;y++)T+=m.subdivideLineCount(e[y],e[(y+1)%C],I);else if(a===p.ArcType.RHUMB)for(y=0;y<C;y++)T+=m.subdivideRhumbLineCount(t,e[y],e[(y+1)%C],I);for(d=3*(T+C),f=new Array(2*d),y=0;y<C;y++){var w;g=e[y],v=e[(y+1)%C],a===p.ArcType.GEODESIC?w=m.subdivideLine(g,v,I,L):a===p.ArcType.RHUMB&&(w=m.subdivideRhumbLine(t,g,v,I,L));for(var x=w.length,E=0;E<x;++E,++b)f[b]=w[E],f[b+d]=w[E];f[b]=v.x,f[b+d]=v.x,++b,f[b]=v.y,f[b+d]=v.y,++b,f[b]=v.z,f[b+d]=v.z,++b}}C=f.length;var N=c.IndexDatatype.createTypedArray(C/3,C-6*e.length),_=0;for(C/=6,y=0;y<C;y++){var P=y,A=P+1,M=P+C,G=M+1;g=r.Cartesian3.fromArray(f,3*P,S),v=r.Cartesian3.fromArray(f,3*A,D),r.Cartesian3.equalsEpsilon(g,v,r.CesiumMath.EPSILON10,r.CesiumMath.EPSILON10)||(N[_++]=P,N[_++]=M,N[_++]=A,N[_++]=A,N[_++]=M,N[_++]=G)}return new s.Geometry({attributes:new l.GeometryAttributes({position:new s.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f})}),indices:N,primitiveType:u.PrimitiveType.TRIANGLES})},e.PolygonGeometryLibrary=m}));