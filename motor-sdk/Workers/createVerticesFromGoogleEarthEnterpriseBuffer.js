define(["./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./BoundingSphere-37359cf8","./Transforms-6b57162d","./Matrix4-ed224189","./RuntimeError-86da6af2","./WebGLConstants-3660bc8f","./ComponentDatatype-86703c58","./AttributeCompression-6e02a904","./IntersectionTests-a310845d","./Plane-87957166","./WebMercatorProjection-2349e1e4","./createTaskProcessorWorker","./AxisAlignedBoundingBox-804b7aeb","./EllipsoidTangentPlane-37f60f7a","./OrientedBoundingBox-f9a274cd","./TerrainEncoding-2d0e3daf"],(function(e,t,i,a,n,r,o,s,u,h,d,c,g,l,m,p,v,I,f){"use strict";var E=Uint16Array.BYTES_PER_ELEMENT,T=Int32Array.BYTES_PER_ELEMENT,C=Uint32Array.BYTES_PER_ELEMENT,M=Float32Array.BYTES_PER_ELEMENT,x=Float64Array.BYTES_PER_ELEMENT;function N(t,a,n){n=e.defaultValue(n,i.CesiumMath);for(var r=t.length,o=0;o<r;++o)if(n.equalsEpsilon(t[o],a,i.CesiumMath.EPSILON12))return o;return-1}function b(e,t){e.ellipsoid=a.Ellipsoid.clone(e.ellipsoid),e.rectangle=a.Rectangle.clone(e.rectangle);var i=y(e.buffer,e.relativeToCenter,e.ellipsoid,e.rectangle,e.nativeRectangle,e.exaggeration,e.skirtHeight,e.includeWebMercatorT,e.negativeAltitudeExponentBias,e.negativeElevationThreshold),n=i.vertices;t.push(n.buffer);var r=i.indices;return t.push(r.buffer),{vertices:n.buffer,indices:r.buffer,numberOfAttributes:i.encoding.getStride(),minimumHeight:i.minimumHeight,maximumHeight:i.maximumHeight,boundingSphere3D:i.boundingSphere3D,orientedBoundingBox:i.orientedBoundingBox,occludeePointInScaledSpace:i.occludeePointInScaledSpace,encoding:i.encoding,vertexCountWithoutSkirts:i.vertexCountWithoutSkirts,indexCountWithoutSkirts:i.indexCountWithoutSkirts,westIndicesSouthToNorth:i.westIndicesSouthToNorth,southIndicesEastToWest:i.southIndicesEastToWest,eastIndicesNorthToSouth:i.eastIndicesNorthToSouth,northIndicesWestToEast:i.northIndicesWestToEast}}var S=new a.Cartographic,B=new i.Cartesian3,w=new i.Cartesian3,P=new i.Cartesian3,A=new o.Matrix4;function y(t,u,h,d,c,g,m,v,b,y){var _,W,F,O,Y,k;e.defined(d)?(_=d.west,W=d.south,F=d.east,O=d.north,Y=d.width,k=d.height):(_=i.CesiumMath.toRadians(c.west),W=i.CesiumMath.toRadians(c.south),F=i.CesiumMath.toRadians(c.east),O=i.CesiumMath.toRadians(c.north),Y=i.CesiumMath.toRadians(d.width),k=i.CesiumMath.toRadians(d.height));var U,V,H=[W,O],L=[_,F],D=r.Transforms.eastNorthUpToFixedFrame(u,h),G=o.Matrix4.inverseTransformation(D,A);v&&(U=l.WebMercatorProjection.geodeticLatitudeToMercatorAngle(W),V=1/(l.WebMercatorProjection.geodeticLatitudeToMercatorAngle(O)-U));var j=new DataView(t),z=Number.POSITIVE_INFINITY,q=Number.NEGATIVE_INFINITY,J=w;J.x=Number.POSITIVE_INFINITY,J.y=Number.POSITIVE_INFINITY,J.z=Number.POSITIVE_INFINITY;var K=P;K.x=Number.NEGATIVE_INFINITY,K.y=Number.NEGATIVE_INFINITY,K.z=Number.NEGATIVE_INFINITY;var Q,X,Z=0,$=0,ee=0;for(X=0;X<4;++X){var te=Z;Q=j.getUint32(te,!0),te+=C;var ie=i.CesiumMath.toRadians(180*j.getFloat64(te,!0));te+=x,-1===N(L,ie)&&L.push(ie);var ae=i.CesiumMath.toRadians(180*j.getFloat64(te,!0));te+=x,-1===N(H,ae)&&H.push(ae),te+=2*x;var ne=j.getInt32(te,!0);te+=T,$+=ne,ne=j.getInt32(te,!0),ee+=3*ne,Z+=Q+C}var re=[],oe=[],se=new Array($),ue=new Array($),he=new Array($),de=v?new Array($):[],ce=new Array(ee),ge=[],le=[],me=[],pe=[],ve=0,Ie=0;for(Z=0,X=0;X<4;++X){Q=j.getUint32(Z,!0),Z+=C;var fe=Z,Ee=i.CesiumMath.toRadians(180*j.getFloat64(Z,!0));Z+=x;var Te=i.CesiumMath.toRadians(180*j.getFloat64(Z,!0));Z+=x;var Ce=i.CesiumMath.toRadians(180*j.getFloat64(Z,!0)),Me=.5*Ce;Z+=x;var xe=i.CesiumMath.toRadians(180*j.getFloat64(Z,!0)),Ne=.5*xe;Z+=x;var be=j.getInt32(Z,!0);Z+=T;var Se=j.getInt32(Z,!0);Z+=T,Z+=T;for(var Be=new Array(be),we=0;we<be;++we){var Pe=Ee+j.getUint8(Z++)*Ce;S.longitude=Pe;var Ae=Te+j.getUint8(Z++)*xe;S.latitude=Ae;var ye=j.getFloat32(Z,!0);if(Z+=M,0!==ye&&ye<y&&(ye*=-Math.pow(2,b)),ye*=6371010*g,S.height=ye,-1!==N(L,Pe)||-1!==N(H,Ae)){var Re=N(re,S,a.Cartographic);if(-1!==Re){Be[we]=oe[Re];continue}re.push(a.Cartographic.clone(S)),oe.push(ve)}Be[we]=ve,Math.abs(Pe-_)<Me?ge.push({index:ve,cartographic:a.Cartographic.clone(S)}):Math.abs(Pe-F)<Me?me.push({index:ve,cartographic:a.Cartographic.clone(S)}):Math.abs(Ae-W)<Ne?le.push({index:ve,cartographic:a.Cartographic.clone(S)}):Math.abs(Ae-O)<Ne&&pe.push({index:ve,cartographic:a.Cartographic.clone(S)}),z=Math.min(ye,z),q=Math.max(ye,q),he[ve]=ye;var _e=h.cartographicToCartesian(S);se[ve]=_e,v&&(de[ve]=(l.WebMercatorProjection.geodeticLatitudeToMercatorAngle(Ae)-U)*V),o.Matrix4.multiplyByPoint(G,_e,B),i.Cartesian3.minimumByComponent(B,J,J),i.Cartesian3.maximumByComponent(B,K,K);var We=(Pe-_)/(F-_);We=i.CesiumMath.clamp(We,0,1);var Fe=(Ae-W)/(O-W);Fe=i.CesiumMath.clamp(Fe,0,1),ue[ve]=new a.Cartesian2(We,Fe),++ve}for(var Oe=3*Se,Ye=0;Ye<Oe;++Ye,++Ie)ce[Ie]=Be[j.getUint16(Z,!0)],Z+=E;if(Q!==Z-fe)throw new s.RuntimeError("Invalid terrain tile.")}se.length=ve,ue.length=ve,he.length=ve,v&&(de.length=ve);var ke=ve,Ue=Ie,Ve={hMin:z,lastBorderPoint:void 0,skirtHeight:m,toENU:G,ellipsoid:h,minimum:J,maximum:K};ge.sort((function(e,t){return t.cartographic.latitude-e.cartographic.latitude})),le.sort((function(e,t){return e.cartographic.longitude-t.cartographic.longitude})),me.sort((function(e,t){return e.cartographic.latitude-t.cartographic.latitude})),pe.sort((function(e,t){return t.cartographic.longitude-e.cartographic.longitude}));var He=1e-5;if(R(se,he,ue,de,ce,Ve,ge,-He*Y,!0,-He*k),R(se,he,ue,de,ce,Ve,le,-He*k,!1),R(se,he,ue,de,ce,Ve,me,He*Y,!0,He*k),R(se,he,ue,de,ce,Ve,pe,He*k,!1),ge.length>0&&pe.length>0){var Le=ge[0].index,De=ke,Ge=pe[pe.length-1].index,je=se.length-1;ce.push(Ge,je,De,De,Le,Ge)}$=se.length;var ze,qe=n.BoundingSphere.fromPoints(se);e.defined(d)&&(ze=I.OrientedBoundingBox.fromRectangle(d,z,q,h));for(var Je=new f.EllipsoidalOccluder(h),Ke=Je.computeHorizonCullingPointPossiblyUnderEllipsoid(u,se,z),Qe=new p.AxisAlignedBoundingBox(J,K,u),Xe=new f.TerrainEncoding(Qe,Ve.hMin,q,D,!1,v),Ze=new Float32Array($*Xe.getStride()),$e=0,et=0;et<$;++et)$e=Xe.encode(Ze,$e,se[et],ue[et],he[et],void 0,de[et]);var tt=ge.map((function(e){return e.index})).reverse(),it=le.map((function(e){return e.index})).reverse(),at=me.map((function(e){return e.index})).reverse(),nt=pe.map((function(e){return e.index})).reverse();return it.unshift(at[at.length-1]),it.push(tt[0]),nt.unshift(tt[tt.length-1]),nt.push(at[0]),{vertices:Ze,indices:new Uint16Array(ce),maximumHeight:q,minimumHeight:z,encoding:Xe,boundingSphere3D:qe,orientedBoundingBox:ze,occludeePointInScaledSpace:Ke,vertexCountWithoutSkirts:ke,indexCountWithoutSkirts:Ue,westIndicesSouthToNorth:tt,southIndicesEastToWest:it,eastIndicesNorthToSouth:at,northIndicesWestToEast:nt}}function R(t,n,r,s,u,h,d,c,g,l){for(var m=d.length,p=0;p<m;++p){var v=d[p],I=v.cartographic,f=v.index,E=t.length,T=I.longitude,C=I.latitude;C=i.CesiumMath.clamp(C,-i.CesiumMath.PI_OVER_TWO,i.CesiumMath.PI_OVER_TWO);var M=I.height-h.skirtHeight;h.hMin=Math.min(h.hMin,M),a.Cartographic.fromRadians(T,C,M,S),g&&(S.longitude+=c),g?p===m-1?S.latitude+=l:0===p&&(S.latitude-=l):S.latitude+=c;var x=h.ellipsoid.cartographicToCartesian(S);t.push(x),n.push(M),r.push(a.Cartesian2.clone(r[f])),s.length>0&&s.push(s[f]),o.Matrix4.multiplyByPoint(h.toENU,x,B);var N=h.minimum,b=h.maximum;i.Cartesian3.minimumByComponent(B,N,N),i.Cartesian3.maximumByComponent(B,b,b);var w=h.lastBorderPoint;if(e.defined(w)){var P=w.index;u.push(P,E-1,E,E,f,P)}h.lastBorderPoint=v}}var _=m(b);return _}));