define(["./when-52cea266","./Check-ee5dd8a8","./Cartesian2-7c55a82d","./Rectangle-88e14f21","./BoundingSphere-f5553fb7","./Transforms-d0762529","./Matrix4-da50dd55","./RuntimeError-02840484","./WebGLConstants-52779751","./ComponentDatatype-fc6a16e1","./GeometryAttribute-60495dd3","./PrimitiveType-875d1f73","./GeometryAttributes-769ca2c2","./IndexDatatype-f9231b69","./IntersectionTests-ca78fc8a","./Plane-fdd70b9e","./AxisAlignedBoundingBox-08b0db17","./EllipsoidTangentPlane-64b84590","./EllipsoidRhumbLine-90d09904","./PolygonPipeline-fe89e8c5","./EllipsoidGeodesic-69201d63","./PolylinePipeline-6fde5179","./WallGeometryLibrary-0e3e972b"],(function(e,i,t,r,n,a,o,s,l,d,m,p,u,f,h,g,c,v,y,E,w,_,C){"use strict";var H=new t.Cartesian3,A=new t.Cartesian3;function b(n){n=e.defaultValue(n,e.defaultValue.EMPTY_OBJECT);var a=n.positions,o=n.maximumHeights,s=n.minimumHeights;if(!e.defined(a))throw new i.DeveloperError("options.positions is required.");if(e.defined(o)&&o.length!==a.length)throw new i.DeveloperError("options.positions and options.maximumHeights must have the same length.");if(e.defined(s)&&s.length!==a.length)throw new i.DeveloperError("options.positions and options.minimumHeights must have the same length.");var l=e.defaultValue(n.granularity,t.CesiumMath.RADIANS_PER_DEGREE),d=e.defaultValue(n.ellipsoid,r.Ellipsoid.WGS84);this._positions=a,this._minimumHeights=s,this._maximumHeights=o,this._granularity=l,this._ellipsoid=r.Ellipsoid.clone(d),this._workerName="createWallOutlineGeometry";var m=1+a.length*t.Cartesian3.packedLength+2;e.defined(s)&&(m+=s.length),e.defined(o)&&(m+=o.length),this.packedLength=m+r.Ellipsoid.packedLength+1}b.pack=function(n,a,o){if(!e.defined(n))throw new i.DeveloperError("value is required");if(!e.defined(a))throw new i.DeveloperError("array is required");var s;o=e.defaultValue(o,0);var l=n._positions,d=l.length;for(a[o++]=d,s=0;s<d;++s,o+=t.Cartesian3.packedLength)t.Cartesian3.pack(l[s],a,o);var m=n._minimumHeights;if(d=e.defined(m)?m.length:0,a[o++]=d,e.defined(m))for(s=0;s<d;++s)a[o++]=m[s];var p=n._maximumHeights;if(d=e.defined(p)?p.length:0,a[o++]=d,e.defined(p))for(s=0;s<d;++s)a[o++]=p[s];return r.Ellipsoid.pack(n._ellipsoid,a,o),o+=r.Ellipsoid.packedLength,a[o]=n._granularity,a};var x=r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),P={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:x,granularity:void 0};function k(i,t){return e.defined(t)&&(i=b.unpack(i,t)),i._ellipsoid=r.Ellipsoid.clone(i._ellipsoid),b.createGeometry(i)}return b.unpack=function(n,a,o){if(!e.defined(n))throw new i.DeveloperError("array is required");var s;a=e.defaultValue(a,0);var l,d,m=n[a++],p=new Array(m);for(s=0;s<m;++s,a+=t.Cartesian3.packedLength)p[s]=t.Cartesian3.unpack(n,a);if(m=n[a++],m>0)for(l=new Array(m),s=0;s<m;++s)l[s]=n[a++];if(m=n[a++],m>0)for(d=new Array(m),s=0;s<m;++s)d[s]=n[a++];var u=r.Ellipsoid.unpack(n,a,x);a+=r.Ellipsoid.packedLength;var f=n[a];return e.defined(o)?(o._positions=p,o._minimumHeights=l,o._maximumHeights=d,o._ellipsoid=r.Ellipsoid.clone(u,o._ellipsoid),o._granularity=f,o):(P.positions=p,P.minimumHeights=l,P.maximumHeights=d,P.granularity=f,new b(P))},b.fromConstantHeights=function(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);var r,n,a=t.positions;if(!e.defined(a))throw new i.DeveloperError("options.positions is required.");var o=t.minimumHeight,s=t.maximumHeight,l=e.defined(o),d=e.defined(s);if(l||d){var m=a.length;r=l?new Array(m):void 0,n=d?new Array(m):void 0;for(var p=0;p<m;++p)l&&(r[p]=o),d&&(n[p]=s)}var u={positions:a,maximumHeights:n,minimumHeights:r,ellipsoid:t.ellipsoid};return new b(u)},b.createGeometry=function(i){var r=i._positions,a=i._minimumHeights,o=i._maximumHeights,s=i._granularity,l=i._ellipsoid,h=C.WallGeometryLibrary.computePositions(l,r,o,a,s,!1);if(e.defined(h)){var g,c=h.bottomPositions,v=h.topPositions,y=v.length,E=2*y,w=new Float64Array(E),_=0;for(y/=3,g=0;g<y;++g){var b=3*g,x=t.Cartesian3.fromArray(v,b,H),P=t.Cartesian3.fromArray(c,b,A);w[_++]=P.x,w[_++]=P.y,w[_++]=P.z,w[_++]=x.x,w[_++]=x.y,w[_++]=x.z}var k=new u.GeometryAttributes({position:new m.GeometryAttribute({componentDatatype:d.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:w})}),D=E/3;E=2*D-4+D;var G=f.IndexDatatype.createTypedArray(D,E),L=0;for(g=0;g<D-2;g+=2){var T=g,V=g+2,S=t.Cartesian3.fromArray(w,3*T,H),B=t.Cartesian3.fromArray(w,3*V,A);if(!t.Cartesian3.equalsEpsilon(S,B,t.CesiumMath.EPSILON10)){var I=g+1,R=g+3;G[L++]=I,G[L++]=T,G[L++]=I,G[L++]=R,G[L++]=T,G[L++]=V}}return G[L++]=D-2,G[L++]=D-1,new m.Geometry({attributes:k,indices:G,primitiveType:p.PrimitiveType.LINES,boundingSphere:new n.BoundingSphere.fromVertices(w)})}},k}));