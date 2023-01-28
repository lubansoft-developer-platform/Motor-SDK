define(["./when-52cea266","./Check-ee5dd8a8","./Cartesian2-7c55a82d","./Rectangle-88e14f21","./BoundingSphere-f5553fb7","./Transforms-d0762529","./Matrix4-da50dd55","./RuntimeError-02840484","./WebGLConstants-52779751","./AttributeCompression-7f134dfc","./IndexDatatype-f9231b69","./IntersectionTests-ca78fc8a","./Plane-fdd70b9e","./createTaskProcessorWorker","./AxisAlignedBoundingBox-08b0db17","./EllipsoidTangentPlane-64b84590","./OrientedBoundingBox-c329d289","./Color-83f284c7"],(function(e,a,n,r,t,i,o,s,d,f,c,u,h,l,g,p,b,v){"use strict";var C=new n.Cartesian3,y=new r.Ellipsoid,I=new r.Rectangle,m={min:void 0,max:void 0,indexBytesPerElement:void 0};function w(e){var a=new Float64Array(e),t=0;m.indexBytesPerElement=a[t++],m.min=a[t++],m.max=a[t++],n.Cartesian3.unpack(a,t,C),t+=n.Cartesian3.packedLength,r.Ellipsoid.unpack(a,t,y),t+=r.Ellipsoid.packedLength,r.Rectangle.unpack(a,t,I)}function x(e){for(var a=e.length,n=0,r=0;r<a;++r)n+=v.Color.packedLength+3+e[r].batchIds.length;return n}function A(e,a,n){var r=a.length,t=2+r*b.OrientedBoundingBox.packedLength+1+x(n),i=new Float64Array(t),o=0;i[o++]=e,i[o++]=r;for(var s=0;s<r;++s)b.OrientedBoundingBox.pack(a[s],i,o),o+=b.OrientedBoundingBox.packedLength;var d=n.length;i[o++]=d;for(var f=0;f<d;++f){var c=n[f];v.Color.pack(c.color,i,o),o+=v.Color.packedLength,i[o++]=c.offset,i[o++]=c.count;var u=c.batchIds,h=u.length;i[o++]=h;for(var l=0;l<h;++l)i[o++]=u[l]}return i}var B=32767,E=new n.Cartesian3,N=new n.Cartesian3,T=new n.Cartesian3,k=new n.Cartesian3,L=new n.Cartesian3,O=new r.Cartographic,U=new r.Rectangle;function P(a,t){var i;w(a.packedBuffer);var o=m.indexBytesPerElement;i=2===o?new Uint16Array(a.indices):new Uint32Array(a.indices);var s,d,u,h=new Uint16Array(a.positions),l=new Uint32Array(a.counts),g=new Uint32Array(a.indexCounts),p=new Uint32Array(a.batchIds),x=new Uint32Array(a.batchTableColors),P=new Array(l.length),S=C,F=y,R=I,D=m.min,M=m.max,_=a.minimumHeights,G=a.maximumHeights;e.defined(_)&&e.defined(G)&&(_=new Float32Array(_),G=new Float32Array(G));var Y=h.length/2,V=h.subarray(0,Y),H=h.subarray(Y,2*Y);f.AttributeCompression.zigZagDeltaDecode(V,H);var W=new Float64Array(3*Y);for(s=0;s<Y;++s){var z=V[s],Z=H[s],j=n.CesiumMath.lerp(R.west,R.east,z/B),q=n.CesiumMath.lerp(R.south,R.north,Z/B),J=r.Cartographic.fromRadians(j,q,0,O),K=F.cartographicToCartesian(J,E);n.Cartesian3.pack(K,W,3*s)}var Q=l.length,X=new Array(Q),$=new Array(Q),ee=0,ae=0;for(s=0;s<Q;++s)X[s]=ee,$[s]=ae,ee+=l[s],ae+=g[s];var ne,re=new Float32Array(3*Y*2),te=new Uint16Array(2*Y),ie=new Uint32Array($.length),oe=new Uint32Array(g.length),se=[],de={};for(s=0;s<Q;++s)u=x[s],e.defined(de[u])?(de[u].positionLength+=l[s],de[u].indexLength+=g[s],de[u].batchIds.push(s)):de[u]={positionLength:l[s],indexLength:g[s],offset:0,indexOffset:0,batchIds:[s]};var fe=0,ce=0;for(u in de)if(de.hasOwnProperty(u)){ne=de[u],ne.offset=fe,ne.indexOffset=ce;var ue=2*ne.positionLength,he=2*ne.indexLength+6*ne.positionLength;fe+=ue,ce+=he,ne.indexLength=he}var le=[];for(u in de)de.hasOwnProperty(u)&&(ne=de[u],le.push({color:v.Color.fromRgba(parseInt(u)),offset:ne.indexOffset,count:ne.indexLength,batchIds:ne.batchIds}));for(s=0;s<Q;++s){u=x[s],ne=de[u];var ge=ne.offset,pe=3*ge,be=ge,ve=X[s],Ce=l[s],ye=p[s],Ie=D,me=M;e.defined(_)&&e.defined(G)&&(Ie=_[s],me=G[s]);var we=Number.POSITIVE_INFINITY,xe=Number.NEGATIVE_INFINITY,Ae=Number.POSITIVE_INFINITY,Be=Number.NEGATIVE_INFINITY;for(d=0;d<Ce;++d){var Ee=n.Cartesian3.unpack(W,3*ve+3*d,E);F.scaleToGeodeticSurface(Ee,Ee);var Ne=F.cartesianToCartographic(Ee,O),Te=Ne.latitude,ke=Ne.longitude;we=Math.min(Te,we),xe=Math.max(Te,xe),Ae=Math.min(ke,Ae),Be=Math.max(ke,Be);var Le=F.geodeticSurfaceNormal(Ee,N),Oe=n.Cartesian3.multiplyByScalar(Le,Ie,T),Ue=n.Cartesian3.add(Ee,Oe,k);Oe=n.Cartesian3.multiplyByScalar(Le,me,Oe);var Pe=n.Cartesian3.add(Ee,Oe,L);n.Cartesian3.subtract(Pe,S,Pe),n.Cartesian3.subtract(Ue,S,Ue),n.Cartesian3.pack(Pe,re,pe),n.Cartesian3.pack(Ue,re,pe+3),te[be]=ye,te[be+1]=ye,pe+=6,be+=2}R=U,R.west=Ae,R.east=Be,R.south=we,R.north=xe,P[s]=b.OrientedBoundingBox.fromRectangle(R,D,M,F);var Se=ne.indexOffset,Fe=$[s],Re=g[s];for(ie[s]=Se,d=0;d<Re;d+=3){var De=i[Fe+d]-ve,Me=i[Fe+d+1]-ve,_e=i[Fe+d+2]-ve;se[Se++]=2*De+ge,se[Se++]=2*Me+ge,se[Se++]=2*_e+ge,se[Se++]=2*_e+1+ge,se[Se++]=2*Me+1+ge,se[Se++]=2*De+1+ge}for(d=0;d<Ce;++d){var Ge=d,Ye=(d+1)%Ce;se[Se++]=2*Ge+1+ge,se[Se++]=2*Ye+ge,se[Se++]=2*Ge+ge,se[Se++]=2*Ge+1+ge,se[Se++]=2*Ye+1+ge,se[Se++]=2*Ye+ge}ne.offset+=2*Ce,ne.indexOffset=Se,oe[s]=Se-ie[s]}se=c.IndexDatatype.createTypedArray(re.length/3,se);for(var Ve=le.length,He=0;He<Ve;++He){for(var We=le[He].batchIds,ze=0,Ze=We.length,je=0;je<Ze;++je)ze+=oe[We[je]];le[He].count=ze}var qe=2===se.BYTES_PER_ELEMENT?c.IndexDatatype.UNSIGNED_SHORT:c.IndexDatatype.UNSIGNED_INT,Je=A(qe,P,le);return t.push(re.buffer,se.buffer,ie.buffer,oe.buffer,te.buffer,Je.buffer),{positions:re.buffer,indices:se.buffer,indexOffsets:ie.buffer,indexCounts:oe.buffer,batchIds:te.buffer,packedBuffer:Je.buffer}}var S=l(P);return S}));