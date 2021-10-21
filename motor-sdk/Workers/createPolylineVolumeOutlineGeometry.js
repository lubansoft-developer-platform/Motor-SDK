define(["./when-45f3d25d","./Check-34538dad","./Cartesian3-e69091b9","./Cartesian2-7a44370a","./BoundingSphere-bacc5cb6","./Matrix4-c65e6a1b","./RuntimeError-86da6af2","./Rectangle-c7d55cfa","./WebGLConstants-3660bc8f","./ComponentDatatype-86703c58","./GeometryAttribute-70b679fd","./PrimitiveType-30fa6f85","./Transforms-7d49a8ab","./GeometryAttributes-9d45f9e2","./IndexDatatype-e52361bd","./IntersectionTests-8855da40","./Plane-1875afb4","./arrayRemoveDuplicates-24a803e7","./BoundingRectangle-c7afec11","./EllipsoidTangentPlane-3e14dd4d","./EllipsoidRhumbLine-4bc7760a","./PolygonPipeline-d22f3330","./PolylineVolumeGeometryLibrary-3867ede1","./EllipsoidGeodesic-1d7258d7","./PolylinePipeline-5cc41d8c"],(function(e,i,r,n,a,t,o,l,s,p,d,u,c,y,f,h,g,v,m,E,P,_,b,C,k){"use strict";function D(e,i){var r=new y.GeometryAttributes;r.position=new d.GeometryAttribute({componentDatatype:p.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e});var n,t,o=i.length,l=r.position.values.length/3,s=e.length/3,c=s/o,h=f.IndexDatatype.createTypedArray(l,2*o*(c+1)),g=0;n=0;var v=n*o;for(t=0;t<o-1;t++)h[g++]=t+v,h[g++]=t+v+1;for(h[g++]=o-1+v,h[g++]=v,n=c-1,v=n*o,t=0;t<o-1;t++)h[g++]=t+v,h[g++]=t+v+1;for(h[g++]=o-1+v,h[g++]=v,n=0;n<c-1;n++){var m=o*n,E=m+o;for(t=0;t<o;t++)h[g++]=t+m,h[g++]=t+E}var P=new d.Geometry({attributes:r,indices:f.IndexDatatype.createTypedArray(l,h),boundingSphere:a.BoundingSphere.fromVertices(e),primitiveType:u.PrimitiveType.LINES});return P}function w(a){a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT);var t=a.polylinePositions,o=a.shapePositions;if(!e.defined(t))throw new i.DeveloperError("options.polylinePositions is required.");if(!e.defined(o))throw new i.DeveloperError("options.shapePositions is required.");this._positions=t,this._shape=o,this._ellipsoid=n.Ellipsoid.clone(e.defaultValue(a.ellipsoid,n.Ellipsoid.WGS84)),this._cornerType=e.defaultValue(a.cornerType,b.CornerType.ROUNDED),this._granularity=e.defaultValue(a.granularity,r.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeOutlineGeometry";var l=1+t.length*r.Cartesian3.packedLength;l+=1+o.length*n.Cartesian2.packedLength,this.packedLength=l+n.Ellipsoid.packedLength+2}w.pack=function(a,t,o){if(!e.defined(a))throw new i.DeveloperError("value is required");if(!e.defined(t))throw new i.DeveloperError("array is required");var l;o=e.defaultValue(o,0);var s=a._positions,p=s.length;for(t[o++]=p,l=0;l<p;++l,o+=r.Cartesian3.packedLength)r.Cartesian3.pack(s[l],t,o);var d=a._shape;for(p=d.length,t[o++]=p,l=0;l<p;++l,o+=n.Cartesian2.packedLength)n.Cartesian2.pack(d[l],t,o);return n.Ellipsoid.pack(a._ellipsoid,t,o),o+=n.Ellipsoid.packedLength,t[o++]=a._cornerType,t[o]=a._granularity,t};var L=n.Ellipsoid.clone(n.Ellipsoid.UNIT_SPHERE),T={polylinePositions:void 0,shapePositions:void 0,ellipsoid:L,height:void 0,cornerType:void 0,granularity:void 0};w.unpack=function(a,t,o){if(!e.defined(a))throw new i.DeveloperError("array is required");var l;t=e.defaultValue(t,0);var s=a[t++],p=new Array(s);for(l=0;l<s;++l,t+=r.Cartesian3.packedLength)p[l]=r.Cartesian3.unpack(a,t);s=a[t++];var d=new Array(s);for(l=0;l<s;++l,t+=n.Cartesian2.packedLength)d[l]=n.Cartesian2.unpack(a,t);var u=n.Ellipsoid.unpack(a,t,L);t+=n.Ellipsoid.packedLength;var c=a[t++],y=a[t];return e.defined(o)?(o._positions=p,o._shape=d,o._ellipsoid=n.Ellipsoid.clone(u,o._ellipsoid),o._cornerType=c,o._granularity=y,o):(T.polylinePositions=p,T.shapePositions=d,T.cornerType=c,T.granularity=y,new w(T))};var G=new m.BoundingRectangle;function R(i,r){return e.defined(r)&&(i=w.unpack(i,r)),i._ellipsoid=n.Ellipsoid.clone(i._ellipsoid),w.createGeometry(i)}return w.createGeometry=function(e){var i=e._positions,n=v.arrayRemoveDuplicates(i,r.Cartesian3.equalsEpsilon),a=e._shape;if(a=b.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(a),!(n.length<2||a.length<3)){_.PolygonPipeline.computeWindingOrder2D(a)===_.WindingOrder.CLOCKWISE&&a.reverse();var t=m.BoundingRectangle.fromPoints(a,G),o=b.PolylineVolumeGeometryLibrary.computePositions(n,a,t,e,!1);return D(o,a)}},R}));