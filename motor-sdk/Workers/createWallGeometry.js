define(["./when-52cea266","./Check-ee5dd8a8","./Cartesian2-7c55a82d","./Rectangle-88e14f21","./BoundingSphere-f5553fb7","./Transforms-d0762529","./Matrix4-da50dd55","./RuntimeError-02840484","./WebGLConstants-52779751","./ComponentDatatype-fc6a16e1","./GeometryAttribute-60495dd3","./PrimitiveType-875d1f73","./GeometryAttributes-769ca2c2","./IndexDatatype-f9231b69","./IntersectionTests-ca78fc8a","./Plane-fdd70b9e","./VertexFormat-2c3e8a0a","./AxisAlignedBoundingBox-08b0db17","./EllipsoidTangentPlane-64b84590","./EllipsoidRhumbLine-90d09904","./PolygonPipeline-fe89e8c5","./EllipsoidGeodesic-69201d63","./PolylinePipeline-6fde5179","./WallGeometryLibrary-0e3e972b"],(function(e,t,i,r,a,n,o,s,l,m,d,p,u,f,c,h,g,y,v,C,w,x,A,E){"use strict";var b=new i.Cartesian3,_=new i.Cartesian3,F=new i.Cartesian3,D=new i.Cartesian3,L=new i.Cartesian3,H=new i.Cartesian3,P=new i.Cartesian3,k=new i.Cartesian3;function G(a){a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT);var n=a.positions,o=a.maximumHeights,s=a.minimumHeights;if(!e.defined(n))throw new t.DeveloperError("options.positions is required.");if(e.defined(o)&&o.length!==n.length)throw new t.DeveloperError("options.positions and options.maximumHeights must have the same length.");if(e.defined(s)&&s.length!==n.length)throw new t.DeveloperError("options.positions and options.minimumHeights must have the same length.");var l=e.defaultValue(a.vertexFormat,g.VertexFormat.DEFAULT),m=e.defaultValue(a.granularity,i.CesiumMath.RADIANS_PER_DEGREE),d=e.defaultValue(a.ellipsoid,r.Ellipsoid.WGS84);this._positions=n,this._minimumHeights=s,this._maximumHeights=o,this._vertexFormat=g.VertexFormat.clone(l),this._granularity=m,this._ellipsoid=r.Ellipsoid.clone(d),this._workerName="createWallGeometry";var p=1+n.length*i.Cartesian3.packedLength+2;e.defined(s)&&(p+=s.length),e.defined(o)&&(p+=o.length),this.packedLength=p+r.Ellipsoid.packedLength+g.VertexFormat.packedLength+1}G.pack=function(a,n,o){if(!e.defined(a))throw new t.DeveloperError("value is required");if(!e.defined(n))throw new t.DeveloperError("array is required");var s;o=e.defaultValue(o,0);var l=a._positions,m=l.length;for(n[o++]=m,s=0;s<m;++s,o+=i.Cartesian3.packedLength)i.Cartesian3.pack(l[s],n,o);var d=a._minimumHeights;if(m=e.defined(d)?d.length:0,n[o++]=m,e.defined(d))for(s=0;s<m;++s)n[o++]=d[s];var p=a._maximumHeights;if(m=e.defined(p)?p.length:0,n[o++]=m,e.defined(p))for(s=0;s<m;++s)n[o++]=p[s];return r.Ellipsoid.pack(a._ellipsoid,n,o),o+=r.Ellipsoid.packedLength,g.VertexFormat.pack(a._vertexFormat,n,o),o+=g.VertexFormat.packedLength,n[o]=a._granularity,n};var T=r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),V=new g.VertexFormat,z={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:T,vertexFormat:V,granularity:void 0};function S(t,i){return e.defined(i)&&(t=G.unpack(t,i)),t._ellipsoid=r.Ellipsoid.clone(t._ellipsoid),G.createGeometry(t)}return G.unpack=function(a,n,o){if(!e.defined(a))throw new t.DeveloperError("array is required");var s;n=e.defaultValue(n,0);var l,m,d=a[n++],p=new Array(d);for(s=0;s<d;++s,n+=i.Cartesian3.packedLength)p[s]=i.Cartesian3.unpack(a,n);if(d=a[n++],d>0)for(l=new Array(d),s=0;s<d;++s)l[s]=a[n++];if(d=a[n++],d>0)for(m=new Array(d),s=0;s<d;++s)m[s]=a[n++];var u=r.Ellipsoid.unpack(a,n,T);n+=r.Ellipsoid.packedLength;var f=g.VertexFormat.unpack(a,n,V);n+=g.VertexFormat.packedLength;var c=a[n];return e.defined(o)?(o._positions=p,o._minimumHeights=l,o._maximumHeights=m,o._ellipsoid=r.Ellipsoid.clone(u,o._ellipsoid),o._vertexFormat=g.VertexFormat.clone(f,o._vertexFormat),o._granularity=c,o):(z.positions=p,z.minimumHeights=l,z.maximumHeights=m,z.granularity=c,new G(z))},G.fromConstantHeights=function(i){i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT);var r,a,n=i.positions;if(!e.defined(n))throw new t.DeveloperError("options.positions is required.");var o=i.minimumHeight,s=i.maximumHeight,l=e.defined(o),m=e.defined(s);if(l||m){var d=n.length;r=l?new Array(d):void 0,a=m?new Array(d):void 0;for(var p=0;p<d;++p)l&&(r[p]=o),m&&(a[p]=s)}var u={positions:n,maximumHeights:a,minimumHeights:r,ellipsoid:i.ellipsoid,vertexFormat:i.vertexFormat};return new G(u)},G.createGeometry=function(t){var r=t._positions,n=t._minimumHeights,o=t._maximumHeights,s=t._vertexFormat,l=t._granularity,c=t._ellipsoid,h=E.WallGeometryLibrary.computePositions(c,r,o,n,l,!0);if(e.defined(h)){var g,y=h.bottomPositions,v=h.topPositions,C=h.numCorners,w=v.length,x=2*w,A=s.position?new Float64Array(x):void 0,G=s.normal?new Float32Array(x):void 0,T=s.tangent?new Float32Array(x):void 0,V=s.bitangent?new Float32Array(x):void 0,z=s.st?new Float32Array(x/3*2):void 0,S=0,O=0,R=0,I=0,q=0,B=k,M=P,N=H,W=!0;w/=3;var U=0,J=1/(w-r.length+1);for(g=0;g<w;++g){var Y=3*g,Z=i.Cartesian3.fromArray(v,Y,b),j=i.Cartesian3.fromArray(y,Y,_);if(s.position&&(A[S++]=j.x,A[S++]=j.y,A[S++]=j.z,A[S++]=Z.x,A[S++]=Z.y,A[S++]=Z.z),s.st&&(z[q++]=U,z[q++]=0,z[q++]=U,z[q++]=1),s.normal||s.tangent||s.bitangent){var K,Q=i.Cartesian3.clone(i.Cartesian3.ZERO,L),X=c.scaleToGeodeticSurface(i.Cartesian3.fromArray(v,Y,_),_);if(g+1<w&&(K=c.scaleToGeodeticSurface(i.Cartesian3.fromArray(v,Y+3,F),F),Q=i.Cartesian3.fromArray(v,Y+3,L)),W){var $=i.Cartesian3.subtract(Q,Z,D),ee=i.Cartesian3.subtract(X,Z,b);B=i.Cartesian3.normalize(i.Cartesian3.cross(ee,$,B),B),W=!1}i.Cartesian3.equalsEpsilon(K,X,i.CesiumMath.EPSILON10)?W=!0:(U+=J,s.tangent&&(M=i.Cartesian3.normalize(i.Cartesian3.subtract(K,X,M),M)),s.bitangent&&(N=i.Cartesian3.normalize(i.Cartesian3.cross(B,M,N),N))),s.normal&&(G[O++]=B.x,G[O++]=B.y,G[O++]=B.z,G[O++]=B.x,G[O++]=B.y,G[O++]=B.z),s.tangent&&(T[I++]=M.x,T[I++]=M.y,T[I++]=M.z,T[I++]=M.x,T[I++]=M.y,T[I++]=M.z),s.bitangent&&(V[R++]=N.x,V[R++]=N.y,V[R++]=N.z,V[R++]=N.x,V[R++]=N.y,V[R++]=N.z)}}var te=new u.GeometryAttributes;s.position&&(te.position=new d.GeometryAttribute({componentDatatype:m.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:A})),s.normal&&(te.normal=new d.GeometryAttribute({componentDatatype:m.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:G})),s.tangent&&(te.tangent=new d.GeometryAttribute({componentDatatype:m.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:T})),s.bitangent&&(te.bitangent=new d.GeometryAttribute({componentDatatype:m.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:V})),s.st&&(te.st=new d.GeometryAttribute({componentDatatype:m.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:z}));var ie=x/3;x-=6*(C+1);var re=f.IndexDatatype.createTypedArray(ie,x),ae=0;for(g=0;g<ie-2;g+=2){var ne=g,oe=g+2,se=i.Cartesian3.fromArray(A,3*ne,b),le=i.Cartesian3.fromArray(A,3*oe,_);if(!i.Cartesian3.equalsEpsilon(se,le,i.CesiumMath.EPSILON10)){var me=g+1,de=g+3;re[ae++]=me,re[ae++]=ne,re[ae++]=de,re[ae++]=de,re[ae++]=ne,re[ae++]=oe}}return new d.Geometry({attributes:te,indices:re,primitiveType:p.PrimitiveType.TRIANGLES,boundingSphere:new a.BoundingSphere.fromVertices(A)})}},S}));