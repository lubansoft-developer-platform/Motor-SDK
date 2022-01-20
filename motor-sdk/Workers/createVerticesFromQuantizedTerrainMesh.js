define(["./when-45f3d25d","./Check-34538dad","./Cartesian3-e69091b9","./Cartesian2-7a44370a","./BoundingSphere-bacc5cb6","./Matrix4-c65e6a1b","./RuntimeError-86da6af2","./Rectangle-c7d55cfa","./WebGLConstants-3660bc8f","./ComponentDatatype-86703c58","./GeometryAttribute-4777d9f4","./PrimitiveType-30fa6f85","./Transforms-68229cf3","./AttributeCompression-1e177d5e","./IndexDatatype-e52361bd","./IntersectionTests-e782669d","./Plane-18e7e6e4","./WebMercatorProjection-c32b7757","./createTaskProcessorWorker","./EllipsoidTangentPlane-c9b5e9c5","./OrientedBoundingBox-1e79d8b2","./EllipsoidRhumbLine-4bc7760a","./PolygonPipeline-d8c5b0db","./CreatePhysicalArray-d462d0a0","./materem-f017d2c3","./EmWrapperManager-a482472d","./TerrainEncoding-eef38e10","./TerrainProvider-00be0263","./EmLBDeal-6bed9fb9"],(function(e,t,r,n,i,a,o,s,d,l,h,u,c,g,m,p,f,y,I,x,M,T,A,C,b,P,v,N,_){"use strict";class w{constructor(){this._modelMatrix=a.Matrix4.IDENTITY.clone(),this._pt2DAry=[],this._under=0,this._height=0}static clone(e){const t=a.Matrix4.fromArray(e._modelMatrix),r=e._under,i=e._height,o=[];e._pt2DAry.forEach((e=>{o.push(new n.Cartesian2(e.x,e.y))}));const s=new w;return s._under=r,s._height=i,s._pt2DAry=o,s._modelMatrix=t,s}getBoundingbox(){const e=[];return this.getPtAry(!0,e),this.getPtAry(!1,e),x.AxisAlignedBoundingBox.fromPoints(e)}createTriangle(e,t){let r=e.length;this.getPtAry(!0,e);let n=e.length-r;this.getPtAry(!1,e);let i=0;for(let o=0;o<n;o++)i=o===n-1?0:o+1,t.push(r+o),t.push(r+i),t.push(r+n+i),t.push(r+o),t.push(r+n+i),t.push(r+n+o);const a=A.PolygonPipeline.triangulate(this._pt2DAry);t.push(...a.map((e=>r+n+e))),t.push(...a.reverse().map((e=>r+e)))}set modelMatrix(e){this._modelMatrix=e.clone()}get modelMatrix(){return this._modelMatrix}set pt2DAry(t){this._pt2DAry=e.defaultValue(t,[]),this._pt2DAry.length>2&&A.PolygonPipeline.computeWindingOrder2D(this._pt2DAry)===A.WindingOrder.CLOCKWISE&&this._pt2DAry.reverse()}get pt2DAry(){return this._pt2DAry}set under(e){this._under=e}get under(){return this._under}set height(e){this._height=e}get height(){return this._height}getPtAry(e,t){this._pt2DAry.forEach((n=>{let i=new r.Cartesian3(n.x,n.y,this._under);e||(i.z+=this._height),a.Matrix4.multiplyByPoint(this._modelMatrix,i,i),t.push(i)}))}}var E,S=32767,B=new r.Cartesian3,D=new r.Cartesian3,F=new r.Cartesian3,V=new n.Cartographic,W=new n.Cartesian2,L=new r.Cartesian3,O=new a.Matrix4,Y=new a.Matrix4;function k(t,o){var d=t.quantizedVertices,l=d.length/3;if(l<3)return{holeAllData:!0};var h,u=t.octEncodedNormals,p=t.westIndices.length+t.eastIndices.length+t.southIndices.length+t.northIndices.length,f=t.includeWebMercatorT,I=t.holeAry,T=e.defined(I)&&I.length>0,A=(t.tileInfo,s.Rectangle.clone(t.rectangle)),b=A.west,k=A.south,j=A.east,H=A.north,R=n.Ellipsoid.clone(t.ellipsoid),U=t.exaggeration,q=t.minimumHeight*U,K=t.maximumHeight*U,X=t.relativeToCenter;h=t.isPlaneMode?a.Matrix4.fromTranslation(X):c.Transforms.eastNorthUpToFixedFrame(X,R);var Z,J,Q=a.Matrix4.inverseTransformation(h,new a.Matrix4);f&&(Z=y.WebMercatorProjection.geodeticLatitudeToMercatorAngle(k),J=1/(y.WebMercatorProjection.geodeticLatitudeToMercatorAngle(H)-Z));var $,ee=d.subarray(0,l),te=d.subarray(l,2*l),re=d.subarray(2*l,3*l),ne=e.defined(u),ie=new Array(l),ae=new Array(l),oe=new Array(l),se=f?new Array(l):[];ne&&($=[...u]);var de=[...t.indices],le=D;le.x=Number.POSITIVE_INFINITY,le.y=Number.POSITIVE_INFINITY,le.z=Number.POSITIVE_INFINITY;var he=F;he.x=Number.NEGATIVE_INFINITY,he.y=Number.NEGATIVE_INFINITY,he.z=Number.NEGATIVE_INFINITY;var ue,ce=Number.POSITIVE_INFINITY,ge=Number.NEGATIVE_INFINITY,me=Number.POSITIVE_INFINITY,pe=Number.NEGATIVE_INFINITY,fe=!1;if(t.isPlaneMode){var ye=t.projectionString,Ie=t.dCenX,xe=t.dCenY,Me=t.dCenZ;ue=new _.EmLBDeal;var Te=ue.init(ye,new r.Cartesian3(Ie,xe,Me));Te||(ue.destroy(),ue=void 0),fe=t.isDefaultTer}for(var Ae=0;Ae<l;++Ae){var Ce=ee[Ae],be=te[Ae],Pe=Ce/S,ve=be/S,Ne=r.CesiumMath.lerp(q,K,re[Ae]/S);V.longitude=r.CesiumMath.lerp(b,j,Pe),V.latitude=r.CesiumMath.lerp(k,H,ve),V.height=Ne,ce=Math.min(V.longitude,ce),ge=Math.max(V.longitude,ge),me=Math.min(V.latitude,me),pe=Math.max(V.latitude,pe);var _e=R.cartographicToCartesian(V);e.defined(ue)&&(_e=ue.computeCartesianToProj(_e),fe&&(_e.z=0)),ie[Ae]=new n.Cartesian2(Pe,ve),ae[Ae]=Ne,oe[Ae]=_e,f&&(se[Ae]=(y.WebMercatorProjection.geodeticLatitudeToMercatorAngle(V.latitude)-Z)*J),a.Matrix4.multiplyByPoint(Q,_e,B),r.Cartesian3.minimumByComponent(B,le,le),r.Cartesian3.maximumByComponent(B,he,he)}var we=G(t.westIndices,(function(e,t){return ie[e].y-ie[t].y})),Ee=G(t.eastIndices,(function(e,t){return ie[t].y-ie[e].y})),Se=G(t.southIndices,(function(e,t){return ie[t].x-ie[e].x})),Be=G(t.northIndices,(function(e,t){return ie[e].x-ie[t].x})),De=1e-4,Fe=(ge-ce)*De,Ve=(pe-me)*De,We=-Fe,Le=0,Oe=Fe,Ye=0,ke=0,ze=Ve,Ge=0,je=-Ve,He=oe.length,Re=q;Re=Math.min(Re,z(we,oe,ae,ie,$,se,R,A,t.westSkirtHeight,We,Le,ue)),Re=Math.min(Re,z(Se,oe,ae,ie,$,se,R,A,t.southSkirtHeight,Ge,je,ue)),Re=Math.min(Re,z(Ee,oe,ae,ie,$,se,R,A,t.eastSkirtHeight,Oe,Ye,ue)),Re=Math.min(Re,z(Be,oe,ae,ie,$,se,R,A,t.northSkirtHeight,ke,ze,ue));for(var Ue,qe,Ke,Xe=de.length,Ze=3*Math.max(0,2*(p-4)),Je=0;Je<Ze;Je++)de.push(0);if(N.TerrainProvider.addSkirtIndices(we,Se,Ee,Be,l,de,Xe),1!==U&&(qe=i.BoundingSphere.fromPoints(oe),Ue=M.OrientedBoundingBox.fromRectangle(A,q,K,R)),1!==U||q<0){var Qe=new v.EllipsoidalOccluder(R);Ke=Qe.computeHorizonCullingPointPossiblyUnderEllipsoid(X,oe,q)}const $e=[];var et=(t,r,n)=>{let i=e.defaultValue(n,0),a=new P.emMod.LBSpaTriangle;a.SetPtNum(t.length,!1,!1);for(let e=0;e<t.length;e++){const r=t[e];a.SetPtVal(e,r.x,r.y,r.z)}a.SetIndexNum(r.length);for(let e=0;e<r.length;e++)a.SetIndexVal(e,r[e]);let o=new P.emMod.LBSpaBody;return o.Init(a,i),P.emMod.destroy(a),o},tt=t=>{oe.length=0,de.length=0,ie.length=0,ae.length=0,f&&(se.length=0),ne&&($.length=0,ne=!1);let i=new P.emMod.LBSpaTriangle,a=new P.emMod.LBSpaSkirtInfo;t.GetTriangle(i,a);let o=i.GetPtNum(),s=i.GetIndexNum();if(o<3||s<3)return P.emMod.destroy(i),void P.emMod.destroy(a);He=a.iPtSectIndex,Xe=a.iIndexSectIndex;for(let d=0;d<o;d++){let t=i.GetPt(d),a=new r.Cartesian3(t.x,t.y,t.z);oe.push(a),e.defined(ue)?(ue.computeProjToDegree(a,!0,B),n.Cartographic.fromDegrees(B.x,B.y,B.z,V)):R.cartesianToCartographic(a,V);let o=new n.Cartesian2((V.longitude-b)/(j-b),(V.latitude-k)/(H-k));ie.push(o),ae.push(V.height),f&&se.push((y.WebMercatorProjection.geodeticLatitudeToMercatorAngle(V.latitude)-Z)*J)}for(let e=0;e<s;e++)de.push(i.GetIndex(e));P.emMod.destroy(i),P.emMod.destroy(a)},rt=()=>{let e,t=!1;const r=x.AxisAlignedBoundingBox.fromPoints(oe);for(let n=0;n<I.length;n++){const i=w.clone(I[n]);let a=[],o=[];i.createTriangle(a,o);const s=x.AxisAlignedBoundingBox.fromPoints(a);if(!r.isOverlap(s))continue;void 0===e&&(e=et(oe,de,Xe));let d=et(a,o);e.CheckReference(d)?e.ComputeDifference(d)?(P.emMod.destroy(d),t=!0):P.emMod.destroy(d):P.emMod.destroy(d)}return t&&tt(e),void 0!==e&&P.emMod.destroy(e),t};let nt=!1;if(T&&(nt=rt(),oe.length<3))return{holeAllData:!0};for(var it=new x.AxisAlignedBoundingBox(le,he,X),at=new v.TerrainEncoding(it,Re,K,h,ne,f),ot=at.getStride(),st=oe.length*ot,dt=new Float32Array(st),lt=0,ht=0;ht<oe.length;++ht){if(ne){var ut=2*ht;if(W.x=$[ut],W.y=$[ut+1],1!==U){var ct=g.AttributeCompression.octDecode(W.x,W.y,L),gt=c.Transforms.eastNorthUpToFixedFrame(oe[ht],R,Y),mt=a.Matrix4.inverseTransformation(gt,O);a.Matrix4.multiplyByPointAsVector(mt,ct,ct),ct.z*=U,r.Cartesian3.normalize(ct,ct),a.Matrix4.multiplyByPointAsVector(gt,ct,ct),r.Cartesian3.normalize(ct,ct),g.AttributeCompression.octEncode(ct,W)}}lt=at.encode(dt,lt,oe[ht],ie[ht],ae[ht],W,se[ht])}var pt=m.IndexDatatype.createTypedArray(oe.length,de.length);pt.set(de,0);var ft=C.CreatePhysicalArray.createPhysicalArrayFromTerrain(P.emMod,E,t.relativeToCenter,oe,de);return o.push(dt.buffer,pt.buffer,ft.buffer),e.defined(ue)&&ue.destroy(),{vertices:dt.buffer,indices:pt.buffer,vertexStride:ot,center:X,minimumHeight:q,maximumHeight:K,boundingSphere:qe,orientedBoundingBox:Ue,occludeePointInScaledSpace:Ke,encoding:at,indexCountWithoutSkirts:Xe,vertexCountWithoutSkirts:He,vertexCount:oe.length,physicalArray:ft,downloadAry:$e,haveDiff:nt}}function z(t,n,i,a,o,s,d,l,h,u,c,g){var m=e.defined(o),p=s.length>0,f=Number.POSITIVE_INFINITY,y=l.north,I=l.south,x=l.east,M=l.west;x<M&&(x+=r.CesiumMath.TWO_PI);for(var T=t.length,A=0;A<T;++A){var C=t[A],b=i[C],P=a[C];V.longitude=r.CesiumMath.lerp(M,x,P.x)+u,V.latitude=r.CesiumMath.lerp(I,y,P.y)+c,V.height=b-h;var v=d.cartographicToCartesian(V,B);if(e.defined(g)&&(v=g.computeCartesianToProj(v)),n.push(v),a.push(P),i.push(V.height),m){var N=2*C;o.push(o[N]),o.push(o[N+1])}if(p){var _=s[C];s.push(_)}f=Math.min(f,V.height)}return f}function G(t,r){var n;return"function"===typeof t.slice&&(n=t.slice(),"function"!==typeof n.sort&&(n=void 0)),e.defined(n)||(n=Array.prototype.slice.call(t)),n.sort(r),n}function j(t){var r=t.data,n=r.webAssemblyConfig;e.defined(n)&&P.EmWrapperManager.initWebAssembly(n.wasmBinaryFileES6).then((function(){E=new P.emMod.LBSpaMgr,self.onmessage=I(k),self.postMessage(!0)}))}return j}));