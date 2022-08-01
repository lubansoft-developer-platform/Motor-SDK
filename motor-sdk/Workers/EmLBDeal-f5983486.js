define(["exports","./when-45f3d25d","./Check-34538dad","./Cartesian3-eab74dc0","./Cartesian2-174fefc1","./Transforms-37754d60","./Matrix4-ed224189","./AxisAlignedBoundingBox-5231ffa2","./PolygonPipeline-91f66bb3","./EmWrapperManager-83011cae"],(function(e,t,r,i,a,n,o,s,h,l){"use strict";class y{constructor(){this._pt2DAry=[],this._under=0,this._height=0}static clone(e){const t=e._under,r=e._height,i=[];e._pt2DAry.forEach((e=>{i.push(new a.Cartesian2(e.x,e.y))}));const n=new y;return n._under=t,n._height=r,n._pt2DAry=i,n}getBoundingbox(){const e=[];return this.getPtAry(!0,e),this.getPtAry(!1,e),s.AxisAlignedBoundingBox.fromPoints(e)}createTriangle(e,t){let r=e.length;this.getPtAry(!0,e);let i=e.length-r;this.getPtAry(!1,e);let a=0;for(let o=0;o<i;o++)a=o===i-1?0:o+1,t.push(r+o),t.push(r+a),t.push(r+i+a),t.push(r+o),t.push(r+i+a),t.push(r+i+o);const n=h.PolygonPipeline.triangulate(this._pt2DAry);t.push(...n.map((e=>r+i+e))),t.push(...n.reverse().map((e=>r+e)))}set pt2DAry(e){this._pt2DAry=t.defaultValue(e,[]),this._pt2DAry.length>2&&h.PolygonPipeline.computeWindingOrder2D(this._pt2DAry)===h.WindingOrder.CLOCKWISE&&this._pt2DAry.reverse()}get pt2DAry(){return this._pt2DAry}set under(e){this._under=e}get under(){return this._under}set height(e){this._height=e}get height(){return this._height}getPtAry(e,t){this._pt2DAry.forEach((r=>{let a=new i.Cartesian3(r.x,r.y,this._under);e||(a.z+=this._height),t.push(a)}))}transformBy(e){let t=1e9;for(let r=0;r<this._pt2DAry.length;r++){let a=this._pt2DAry[r],n=new i.Cartesian3(a.x,a.y,this._under);o.Matrix4.multiplyByPoint(e,n,n),a.x=n.x,a.y=n.y,n.z<t&&(t=n.z)}this._under=t<1e9?t:0}}const p=new i.Cartesian3,d=new i.Cartesian3,_=new o.Matrix3,m=new o.Matrix3,A=new o.Matrix4;class u{constructor(){}init(e,a){if(!t.defined(l.emMod))throw new r.DeveloperError("initWebAssembly\u521d\u59cb\u5316\u5c1a\u672a\u5b8c\u6210");return this._LBDeal=new l.emMod.LBDeal,this._LBDeal.Init(e,a.x,a.y,a.z)?(this._centerENMatrix=n.Transforms.eastNorthUpToFixedFrame(i.Cartesian3.fromDegrees(a.x,a.y,a.z)),this._matrixArray=new Float64Array(o.Matrix4.toArray(o.Matrix4.IDENTITY)),this._pMatrixAry=l.emMod._malloc(this._matrixArray.byteLength),this._oneTyped32Array=new Float32Array([0,0,0]),this._pOnePt32Ary=l.emMod._malloc(this._oneTyped32Array.byteLength),this._oneTyped64Array=new Float64Array([0,0,0]),this._pOnePt64Ary=l.emMod._malloc(this._oneTyped64Array.byteLength),this._planishAry=null,!0):(l.emMod.destroy(this._LBDeal),this._LBDeal=void 0,!1)}destroy(){t.defined(this._LBDeal)&&(l.emMod.destroy(this._LBDeal),this._LBDeal=void 0,l.emMod._free(this._pMatrixAry),l.emMod._free(this._pOnePt32Ary),l.emMod._free(this._pOnePt64Ary),t.defined(this._planishAry)&&(l.emMod.destroy(this._planishAry),this._planishAry=null))}setPlanishBorderInfoAry(e){if(Array.isArray(e)){t.defined(this._planishAry)&&l.emMod.destroy(this._planishAry),this._planishAry=new l.emMod.LBPlanishAry,this._planishAry.SetPlanishNum(e.length);for(let t=0;t<e.length;t++){const r=y.clone(e[t]);this._planishAry.SetPlanishBot(t,r.under);const i=r.pt2DAry.length;this._planishAry.SetPlanishPtNum(t,i);for(let e=0;e<i;e++)this._planishAry.SetPlanishPtVal(t,e,r.pt2DAry[e].x,r.pt2DAry[e].y)}}}computeProjToCartesianAry(e,t,r){this.computeProjToCartesianAryImp(r,e,t,!1,this._LBDeal,!1)}computeCartesianToProjAry(e,t,r){this.computeProjToCartesianAryImp(r,e,t,!0,this._LBDeal,!1)}computeProjToCartesian(e,r,a,n){r=t.defaultValue(r,!1);let o=[e.x,e.y,e.z];return this.computeProjToCartesianAryImp(a,o,r,!1,this._LBDeal,!0),t.defined(n)?(n.x=o[0],n.y=o[1],n.z=o[2],n):new i.Cartesian3(o[0],o[1],o[2])}computeCartesianToProj(e,r,a,n){r=t.defaultValue(r,!1);let o=[e.x,e.y,e.z];return this.computeProjToCartesianAryImp(a,o,r,!0,this._LBDeal,!0),t.defined(n)?(n.x=o[0],n.y=o[1],n.z=o[2],n):new i.Cartesian3(o[0],o[1],o[2])}computeDegreeToProjAry(e,t){this.computeDegreeToProjImp(e,t,!1,this._LBDeal,!1)}computeProjToDegreeAry(e,t){this.computeDegreeToProjImp(e,t,!0,this._LBDeal,!1)}computeDegreeToProj(e,r,a){let n=[e.x,e.y,e.z];return this.computeDegreeToProjImp(n,r,!1,this._LBDeal,!0),t.defined(a)?(a.x=n[0],a.y=n[1],a.z=n[2],a):new i.Cartesian3(n[0],n[1],n[2])}computeProjToDegree(e,r,a){let n=[e.x,e.y,e.z];return this.computeDegreeToProjImp(n,r,!0,this._LBDeal,!0),t.defined(a)?(a.x=n[0],a.y=n[1],a.z=n[2],a):new i.Cartesian3(n[0],n[1],n[2])}cvtRelProjMatrixToCartesianMatrix(e,r){return t.defined(r)||(r=new o.Matrix4),o.Matrix4.getTranslation(e,p),o.Matrix4.getScale(e,d),o.Matrix4.getMatrix3(e,_),o.Matrix3.getRotation(_,m),o.Matrix4.fromScale(d,r),o.Matrix4.multiplyByMatrix3(r,m,r),this.computeProjToCartesian(p,!1,void 0,p),o.Matrix4.multiplyByPoint(this._centerENMatrix,p,p),n.Transforms.eastNorthUpToFixedFrame(p,void 0,A),o.Matrix4.multiply(A,r,r),r}computeProjToCartesianAryImp(e,i,a,n,s,h){if(!t.defined(s))throw new r.DeveloperError("\u8bf7\u5148\u6267\u884c init\u8fdb\u884c\u521d\u59cb\u5316");let y,p;h?(y=this._oneTyped32Array,y.set(i),p=this._pOnePt32Ary):(y=new Float32Array(i),p=l.emMod._malloc(y.byteLength)),l.emMod.HEAPF32.set(y,p/4),e=t.defaultValue(e,o.Matrix4.IDENTITY),this._matrixArray.set(o.Matrix4.toArray(e)),l.emMod.HEAPF64.set(this._matrixArray,this._pMatrixAry/8),n?s.ComputeCartesianToProj(p,y.length,this._pMatrixAry,a,this._planishAry):s.ComputeProjToCartesian(p,y.length,this._pMatrixAry,a);for(let t=0;t<i.length;++t)i[t]=l.emMod.HEAPF32[(p>>2)+t];h||l.emMod._free(p)}computeDegreeToProjImp(e,i,a,n,o){if(!t.defined(n))throw new r.DeveloperError("\u8bf7\u5148\u6267\u884c init\u8fdb\u884c\u521d\u59cb\u5316");let s,h;o?(s=this._oneTyped64Array,s.set(e),h=this._pOnePt64Ary):(s=new Float64Array(e),h=l.emMod._malloc(s.byteLength)),l.emMod.HEAPF64.set(s,h/8),a?n.TranformProjToDegree(h,s.length,i):n.TranformDegreeToProj(h,s.length,i);for(let t=0;t<e.length;++t)e[t]=l.emMod.HEAPF64[(h>>3)+t];o||l.emMod._free(h)}}e.BorderInfo=y,e.EmLBDeal=u}));