define(["./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./BoundingSphere-37359cf8","./Transforms-6b57162d","./Matrix4-ed224189","./RuntimeError-86da6af2","./WebGLConstants-3660bc8f","./ComponentDatatype-86703c58","./GeometryAttribute-b1ed7c2e","./PrimitiveType-30fa6f85","./GeometryAttributes-9d45f9e2","./AttributeCompression-6e02a904","./GeometryPipeline-256cdc45","./EncodedCartesian3-ceea15a0","./IndexDatatype-cb635cbc","./IntersectionTests-a310845d","./Plane-87957166","./VertexFormat-a00562ee","./arrayRemoveDuplicates-8b568181","./BoundingRectangle-9114b2ad","./AxisAlignedBoundingBox-804b7aeb","./EllipsoidTangentPlane-37f60f7a","./EllipsoidRhumbLine-de5cdc57","./PolygonPipeline-b585c3c1","./PolylineVolumeGeometryLibrary-faab6a71","./EllipsoidGeodesic-96429ebd","./PolylinePipeline-8d76037d"],(function(e,t,r,i,n,o,a,l,d,s,p,u,c,g,y,h,m,f,v,b,E,w,P,x,_,k,C,V,D){"use strict";var L={};function F(r,i){if(!e.defined(r))throw new t.DeveloperError("identifier is required.");e.defined(L[r])||(L[r]=!0,console.warn(e.defaultValue(i,r)))}function T(e,t,r,i){var o=new c.GeometryAttributes;i.position&&(o.position=new p.GeometryAttribute({componentDatatype:s.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e}));var a,l,d,g,h,f,v=t.length,b=e.length/3,E=(b-2*v)/(2*v),w=k.PolygonPipeline.triangulate(t),P=(E-1)*v*6+2*w.length,x=m.IndexDatatype.createTypedArray(b,P),_=2*v,C=0;for(a=0;a<E-1;a++){for(l=0;l<v-1;l++)d=2*l+a*v*2,f=d+_,g=d+1,h=g+_,x[C++]=g,x[C++]=d,x[C++]=h,x[C++]=h,x[C++]=d,x[C++]=f;d=2*v-2+a*v*2,g=d+1,h=g+_,f=d+_,x[C++]=g,x[C++]=d,x[C++]=h,x[C++]=h,x[C++]=d,x[C++]=f}if(i.st||i.tangent||i.bitangent){var V,D,L=new Float32Array(2*b),T=1/(E-1),A=1/r.height,G=r.height/2,R=0;for(a=0;a<E;a++){for(V=a*T,D=A*(t[0].y+G),L[R++]=V,L[R++]=D,l=1;l<v;l++)D=A*(t[l].y+G),L[R++]=V,L[R++]=D,L[R++]=V,L[R++]=D;D=A*(t[0].y+G),L[R++]=V,L[R++]=D}for(l=0;l<v;l++)V=0,D=A*(t[l].y+G),L[R++]=V,L[R++]=D;for(l=0;l<v;l++)V=(E-1)*T,D=A*(t[l].y+G),L[R++]=V,L[R++]=D;o.st=new p.GeometryAttribute({componentDatatype:s.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:new Float32Array(L)})}var B=b-2*v;for(a=0;a<w.length;a+=3){var I=w[a]+B,O=w[a+1]+B,S=w[a+2]+B;x[C++]=I,x[C++]=O,x[C++]=S,x[C++]=S+v,x[C++]=O+v,x[C++]=I+v}var q=new p.Geometry({attributes:o,indices:x,boundingSphere:n.BoundingSphere.fromVertices(e),primitiveType:u.PrimitiveType.TRIANGLES});if(i.normal&&(q=y.GeometryPipeline.computeNormal(q)),i.tangent||i.bitangent){try{q=y.GeometryPipeline.computeTangentAndBitangent(q)}catch(H){F("polyline-volume-tangent-bitangent","Unable to compute tangents and bitangents for polyline volume geometry")}i.tangent||(q.attributes.tangent=void 0),i.bitangent||(q.attributes.bitangent=void 0),i.st||(q.attributes.st=void 0)}return q}function A(n){n=e.defaultValue(n,e.defaultValue.EMPTY_OBJECT);var o=n.polylinePositions,a=n.shapePositions;if(!e.defined(o))throw new t.DeveloperError("options.polylinePositions is required.");if(!e.defined(a))throw new t.DeveloperError("options.shapePositions is required.");this._positions=o,this._shape=a,this._ellipsoid=i.Ellipsoid.clone(e.defaultValue(n.ellipsoid,i.Ellipsoid.WGS84)),this._cornerType=e.defaultValue(n.cornerType,C.CornerType.ROUNDED),this._vertexFormat=b.VertexFormat.clone(e.defaultValue(n.vertexFormat,b.VertexFormat.DEFAULT)),this._granularity=e.defaultValue(n.granularity,r.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeGeometry";var l=1+o.length*r.Cartesian3.packedLength;l+=1+a.length*i.Cartesian2.packedLength,this.packedLength=l+i.Ellipsoid.packedLength+b.VertexFormat.packedLength+2}F.geometryOutlines="Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.",F.geometryZIndex="Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored",F.geometryHeightReference="Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored",F.geometryExtrudedHeightReference="Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored",A.pack=function(n,o,a){if(!e.defined(n))throw new t.DeveloperError("value is required");if(!e.defined(o))throw new t.DeveloperError("array is required");var l;a=e.defaultValue(a,0);var d=n._positions,s=d.length;for(o[a++]=s,l=0;l<s;++l,a+=r.Cartesian3.packedLength)r.Cartesian3.pack(d[l],o,a);var p=n._shape;for(s=p.length,o[a++]=s,l=0;l<s;++l,a+=i.Cartesian2.packedLength)i.Cartesian2.pack(p[l],o,a);return i.Ellipsoid.pack(n._ellipsoid,o,a),a+=i.Ellipsoid.packedLength,b.VertexFormat.pack(n._vertexFormat,o,a),a+=b.VertexFormat.packedLength,o[a++]=n._cornerType,o[a]=n._granularity,o};var G=i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),R=new b.VertexFormat,B={polylinePositions:void 0,shapePositions:void 0,ellipsoid:G,vertexFormat:R,cornerType:void 0,granularity:void 0};A.unpack=function(n,o,a){if(!e.defined(n))throw new t.DeveloperError("array is required");var l;o=e.defaultValue(o,0);var d=n[o++],s=new Array(d);for(l=0;l<d;++l,o+=r.Cartesian3.packedLength)s[l]=r.Cartesian3.unpack(n,o);d=n[o++];var p=new Array(d);for(l=0;l<d;++l,o+=i.Cartesian2.packedLength)p[l]=i.Cartesian2.unpack(n,o);var u=i.Ellipsoid.unpack(n,o,G);o+=i.Ellipsoid.packedLength;var c=b.VertexFormat.unpack(n,o,R);o+=b.VertexFormat.packedLength;var g=n[o++],y=n[o];return e.defined(a)?(a._positions=s,a._shape=p,a._ellipsoid=i.Ellipsoid.clone(u,a._ellipsoid),a._vertexFormat=b.VertexFormat.clone(c,a._vertexFormat),a._cornerType=g,a._granularity=y,a):(B.polylinePositions=s,B.shapePositions=p,B.cornerType=g,B.granularity=y,new A(B))};var I=new w.BoundingRectangle;function O(t,r){return e.defined(r)&&(t=A.unpack(t,r)),t._ellipsoid=i.Ellipsoid.clone(t._ellipsoid),A.createGeometry(t)}return A.createGeometry=function(e){var t=e._positions,i=E.arrayRemoveDuplicates(t,r.Cartesian3.equalsEpsilon),n=e._shape;if(n=C.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(n),!(i.length<2||n.length<3)){k.PolygonPipeline.computeWindingOrder2D(n)===k.WindingOrder.CLOCKWISE&&n.reverse();var o=w.BoundingRectangle.fromPoints(n,I),a=C.PolylineVolumeGeometryLibrary.computePositions(i,n,o,e,!0);return T(a,n,o,e._vertexFormat)}},O}));