"use strict";
var dc = Object.create;
var Yt = Object.defineProperty;
var hc = Object.getOwnPropertyDescriptor;
var mc = Object.getOwnPropertyNames;
var pc = Object.getPrototypeOf,
  gc = Object.prototype.hasOwnProperty;
var j = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  yc = (e, t) => {
    for (var r in t) Yt(e, r, { get: t[r], enumerable: !0 });
  },
  ts = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let i of mc(t))
        !gc.call(e, i) &&
          i !== r &&
          Yt(e, i, { get: () => t[i], enumerable: !(n = hc(t, i)) || n.enumerable });
    return e;
  };
var ze = (e, t, r) => (
    (r = e != null ? dc(pc(e)) : {}),
    ts(t || !e || !e.__esModule ? Yt(r, "default", { value: e, enumerable: !0 }) : r, e)
  ),
  bc = (e) => ts(Yt({}, "__esModule", { value: !0 }), e);
var on = j((le) => {
  "use strict";
  Object.defineProperty(le, "__esModule", { value: !0 });
  le.output = le.exists = le.hash = le.bytes = le.bool = le.number = le.isBytes = void 0;
  function sr(e) {
    if (!Number.isSafeInteger(e) || e < 0) throw new Error(`positive integer expected, not ${e}`);
  }
  le.number = sr;
  function Ss(e) {
    if (typeof e != "boolean") throw new Error(`boolean expected, not ${e}`);
  }
  le.bool = Ss;
  function _s(e) {
    return (
      e instanceof Uint8Array ||
      (e != null && typeof e == "object" && e.constructor.name === "Uint8Array")
    );
  }
  le.isBytes = _s;
  function sn(e, ...t) {
    if (!_s(e)) throw new Error("Uint8Array expected");
    if (t.length > 0 && !t.includes(e.length))
      throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`);
  }
  le.bytes = sn;
  function vs(e) {
    if (typeof e != "function" || typeof e.create != "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    sr(e.outputLen), sr(e.blockLen);
  }
  le.hash = vs;
  function Es(e, t = !0) {
    if (e.destroyed) throw new Error("Hash instance has been destroyed");
    if (t && e.finished) throw new Error("Hash#digest() has already been called");
  }
  le.exists = Es;
  function Os(e, t) {
    sn(e);
    let r = t.outputLen;
    if (e.length < r) throw new Error(`digestInto() expects output buffer of length at least ${r}`);
  }
  le.output = Os;
  var vc = { number: sr, bool: Ss, bytes: sn, hash: vs, exists: Es, output: Os };
  le.default = vc;
});
var Ws = j(($) => {
  "use strict";
  Object.defineProperty($, "__esModule", { value: !0 });
  $.add5L =
    $.add5H =
    $.add4H =
    $.add4L =
    $.add3H =
    $.add3L =
    $.add =
    $.rotlBL =
    $.rotlBH =
    $.rotlSL =
    $.rotlSH =
    $.rotr32L =
    $.rotr32H =
    $.rotrBL =
    $.rotrBH =
    $.rotrSL =
    $.rotrSH =
    $.shrSL =
    $.shrSH =
    $.toBig =
    $.split =
    $.fromBig =
      void 0;
  var or = BigInt(2 ** 32 - 1),
    an = BigInt(32);
  function un(e, t = !1) {
    return t
      ? { h: Number(e & or), l: Number((e >> an) & or) }
      : { h: Number((e >> an) & or) | 0, l: Number(e & or) | 0 };
  }
  $.fromBig = un;
  function As(e, t = !1) {
    let r = new Uint32Array(e.length),
      n = new Uint32Array(e.length);
    for (let i = 0; i < e.length; i++) {
      let { h: s, l: o } = un(e[i], t);
      [r[i], n[i]] = [s, o];
    }
    return [r, n];
  }
  $.split = As;
  var Ps = (e, t) => (BigInt(e >>> 0) << an) | BigInt(t >>> 0);
  $.toBig = Ps;
  var Ts = (e, t, r) => e >>> r;
  $.shrSH = Ts;
  var Ls = (e, t, r) => (e << (32 - r)) | (t >>> r);
  $.shrSL = Ls;
  var Ns = (e, t, r) => (e >>> r) | (t << (32 - r));
  $.rotrSH = Ns;
  var Bs = (e, t, r) => (e << (32 - r)) | (t >>> r);
  $.rotrSL = Bs;
  var Cs = (e, t, r) => (e << (64 - r)) | (t >>> (r - 32));
  $.rotrBH = Cs;
  var xs = (e, t, r) => (e >>> (r - 32)) | (t << (64 - r));
  $.rotrBL = xs;
  var Is = (e, t) => t;
  $.rotr32H = Is;
  var Ds = (e, t) => e;
  $.rotr32L = Ds;
  var $s = (e, t, r) => (e << r) | (t >>> (32 - r));
  $.rotlSH = $s;
  var js = (e, t, r) => (t << r) | (e >>> (32 - r));
  $.rotlSL = js;
  var zs = (e, t, r) => (t << (r - 32)) | (e >>> (64 - r));
  $.rotlBH = zs;
  var Rs = (e, t, r) => (e << (r - 32)) | (t >>> (64 - r));
  $.rotlBL = Rs;
  function Fs(e, t, r, n) {
    let i = (t >>> 0) + (n >>> 0);
    return { h: (e + r + ((i / 2 ** 32) | 0)) | 0, l: i | 0 };
  }
  $.add = Fs;
  var Us = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0);
  $.add3L = Us;
  var ks = (e, t, r, n) => (t + r + n + ((e / 2 ** 32) | 0)) | 0;
  $.add3H = ks;
  var qs = (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0);
  $.add4L = qs;
  var Vs = (e, t, r, n, i) => (t + r + n + i + ((e / 2 ** 32) | 0)) | 0;
  $.add4H = Vs;
  var Ms = (e, t, r, n, i) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0);
  $.add5L = Ms;
  var Ks = (e, t, r, n, i, s) => (t + r + n + i + s + ((e / 2 ** 32) | 0)) | 0;
  $.add5H = Ks;
  var Ec = {
    fromBig: un,
    split: As,
    toBig: Ps,
    shrSH: Ts,
    shrSL: Ls,
    rotrSH: Ns,
    rotrSL: Bs,
    rotrBH: Cs,
    rotrBL: xs,
    rotr32H: Is,
    rotr32L: Ds,
    rotlSH: $s,
    rotlSL: js,
    rotlBH: zs,
    rotlBL: Rs,
    add: Fs,
    add3L: Us,
    add3H: ks,
    add4L: qs,
    add4H: Vs,
    add5H: Ks,
    add5L: Ms,
  };
  $.default = Ec;
});
var Qs = j((ur) => {
  "use strict";
  Object.defineProperty(ur, "__esModule", { value: !0 });
  ur.crypto = void 0;
  var ar = require("node:crypto");
  ur.crypto = ar && typeof ar == "object" && "webcrypto" in ar ? ar.webcrypto : void 0;
});
var Js = j((C) => {
  "use strict";
  Object.defineProperty(C, "__esModule", { value: !0 });
  C.randomBytes =
    C.wrapXOFConstructorWithOpts =
    C.wrapConstructorWithOpts =
    C.wrapConstructor =
    C.checkOpts =
    C.Hash =
    C.concatBytes =
    C.toBytes =
    C.utf8ToBytes =
    C.asyncLoop =
    C.nextTick =
    C.hexToBytes =
    C.bytesToHex =
    C.byteSwap32 =
    C.byteSwapIfBE =
    C.byteSwap =
    C.isLE =
    C.rotl =
    C.rotr =
    C.createView =
    C.u32 =
    C.u8 =
    C.isBytes =
      void 0;
  var ln = Qs(),
    fn = on();
  function Oc(e) {
    return (
      e instanceof Uint8Array ||
      (e != null && typeof e == "object" && e.constructor.name === "Uint8Array")
    );
  }
  C.isBytes = Oc;
  var Ac = (e) => new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
  C.u8 = Ac;
  var Pc = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
  C.u32 = Pc;
  var Tc = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength);
  C.createView = Tc;
  var Lc = (e, t) => (e << (32 - t)) | (e >>> t);
  C.rotr = Lc;
  var Nc = (e, t) => (e << t) | ((e >>> (32 - t)) >>> 0);
  C.rotl = Nc;
  C.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  var Bc = (e) =>
    ((e << 24) & 4278190080) | ((e << 8) & 16711680) | ((e >>> 8) & 65280) | ((e >>> 24) & 255);
  C.byteSwap = Bc;
  C.byteSwapIfBE = C.isLE ? (e) => e : (e) => (0, C.byteSwap)(e);
  function Cc(e) {
    for (let t = 0; t < e.length; t++) e[t] = (0, C.byteSwap)(e[t]);
  }
  C.byteSwap32 = Cc;
  var xc = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
  function Ic(e) {
    (0, fn.bytes)(e);
    let t = "";
    for (let r = 0; r < e.length; r++) t += xc[e[r]];
    return t;
  }
  C.bytesToHex = Ic;
  var Ve = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
  function Hs(e) {
    if (e >= Ve._0 && e <= Ve._9) return e - Ve._0;
    if (e >= Ve._A && e <= Ve._F) return e - (Ve._A - 10);
    if (e >= Ve._a && e <= Ve._f) return e - (Ve._a - 10);
  }
  function Dc(e) {
    if (typeof e != "string") throw new Error("hex string expected, got " + typeof e);
    let t = e.length,
      r = t / 2;
    if (t % 2) throw new Error("padded hex string expected, got unpadded hex of length " + t);
    let n = new Uint8Array(r);
    for (let i = 0, s = 0; i < r; i++, s += 2) {
      let o = Hs(e.charCodeAt(s)),
        a = Hs(e.charCodeAt(s + 1));
      if (o === void 0 || a === void 0) {
        let c = e[s] + e[s + 1];
        throw new Error('hex string expected, got non-hex character "' + c + '" at index ' + s);
      }
      n[i] = o * 16 + a;
    }
    return n;
  }
  C.hexToBytes = Dc;
  var $c = async () => {};
  C.nextTick = $c;
  async function jc(e, t, r) {
    let n = Date.now();
    for (let i = 0; i < e; i++) {
      r(i);
      let s = Date.now() - n;
      (s >= 0 && s < t) || (await (0, C.nextTick)(), (n += s));
    }
  }
  C.asyncLoop = jc;
  function Gs(e) {
    if (typeof e != "string") throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
    return new Uint8Array(new TextEncoder().encode(e));
  }
  C.utf8ToBytes = Gs;
  function lr(e) {
    return typeof e == "string" && (e = Gs(e)), (0, fn.bytes)(e), e;
  }
  C.toBytes = lr;
  function zc(...e) {
    let t = 0;
    for (let n = 0; n < e.length; n++) {
      let i = e[n];
      (0, fn.bytes)(i), (t += i.length);
    }
    let r = new Uint8Array(t);
    for (let n = 0, i = 0; n < e.length; n++) {
      let s = e[n];
      r.set(s, i), (i += s.length);
    }
    return r;
  }
  C.concatBytes = zc;
  var cn = class {
    clone() {
      return this._cloneInto();
    }
  };
  C.Hash = cn;
  var Rc = {}.toString;
  function Fc(e, t) {
    if (t !== void 0 && Rc.call(t) !== "[object Object]")
      throw new Error("Options should be object or undefined");
    return Object.assign(e, t);
  }
  C.checkOpts = Fc;
  function Uc(e) {
    let t = (n) => e().update(lr(n)).digest(),
      r = e();
    return (t.outputLen = r.outputLen), (t.blockLen = r.blockLen), (t.create = () => e()), t;
  }
  C.wrapConstructor = Uc;
  function kc(e) {
    let t = (n, i) => e(i).update(lr(n)).digest(),
      r = e({});
    return (t.outputLen = r.outputLen), (t.blockLen = r.blockLen), (t.create = (n) => e(n)), t;
  }
  C.wrapConstructorWithOpts = kc;
  function qc(e) {
    let t = (n, i) => e(i).update(lr(n)).digest(),
      r = e({});
    return (t.outputLen = r.outputLen), (t.blockLen = r.blockLen), (t.create = (n) => e(n)), t;
  }
  C.wrapXOFConstructorWithOpts = qc;
  function Vc(e = 32) {
    if (ln.crypto && typeof ln.crypto.getRandomValues == "function")
      return ln.crypto.getRandomValues(new Uint8Array(e));
    throw new Error("crypto.getRandomValues must be defined");
  }
  C.randomBytes = Vc;
});
var io = j((G) => {
  "use strict";
  Object.defineProperty(G, "__esModule", { value: !0 });
  G.shake256 =
    G.shake128 =
    G.keccak_512 =
    G.keccak_384 =
    G.keccak_256 =
    G.keccak_224 =
    G.sha3_512 =
    G.sha3_384 =
    G.sha3_256 =
    G.sha3_224 =
    G.Keccak =
    G.keccakP =
      void 0;
  var yt = on(),
    $t = Ws(),
    Me = Js(),
    Zs = [],
    eo = [],
    to = [],
    Mc = BigInt(0),
    Dt = BigInt(1),
    Kc = BigInt(2),
    Wc = BigInt(7),
    Qc = BigInt(256),
    Hc = BigInt(113);
  for (let e = 0, t = Dt, r = 1, n = 0; e < 24; e++) {
    ([r, n] = [n, (2 * r + 3 * n) % 5]),
      Zs.push(2 * (5 * n + r)),
      eo.push((((e + 1) * (e + 2)) / 2) % 64);
    let i = Mc;
    for (let s = 0; s < 7; s++)
      (t = ((t << Dt) ^ ((t >> Wc) * Hc)) % Qc), t & Kc && (i ^= Dt << ((Dt << BigInt(s)) - Dt));
    to.push(i);
  }
  var [Gc, Jc] = (0, $t.split)(to, !0),
    Xs = (e, t, r) => (r > 32 ? (0, $t.rotlBH)(e, t, r) : (0, $t.rotlSH)(e, t, r)),
    Ys = (e, t, r) => (r > 32 ? (0, $t.rotlBL)(e, t, r) : (0, $t.rotlSL)(e, t, r));
  function ro(e, t = 24) {
    let r = new Uint32Array(10);
    for (let n = 24 - t; n < 24; n++) {
      for (let o = 0; o < 10; o++) r[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
      for (let o = 0; o < 10; o += 2) {
        let a = (o + 8) % 10,
          c = (o + 2) % 10,
          u = r[c],
          d = r[c + 1],
          h = Xs(u, d, 1) ^ r[a],
          p = Ys(u, d, 1) ^ r[a + 1];
        for (let f = 0; f < 50; f += 10) (e[o + f] ^= h), (e[o + f + 1] ^= p);
      }
      let i = e[2],
        s = e[3];
      for (let o = 0; o < 24; o++) {
        let a = eo[o],
          c = Xs(i, s, a),
          u = Ys(i, s, a),
          d = Zs[o];
        (i = e[d]), (s = e[d + 1]), (e[d] = c), (e[d + 1] = u);
      }
      for (let o = 0; o < 50; o += 10) {
        for (let a = 0; a < 10; a++) r[a] = e[o + a];
        for (let a = 0; a < 10; a++) e[o + a] ^= ~r[(a + 2) % 10] & r[(a + 4) % 10];
      }
      (e[0] ^= Gc[n]), (e[1] ^= Jc[n]);
    }
    r.fill(0);
  }
  G.keccakP = ro;
  var jt = class e extends Me.Hash {
    constructor(t, r, n, i = !1, s = 24) {
      if (
        (super(),
        (this.blockLen = t),
        (this.suffix = r),
        (this.outputLen = n),
        (this.enableXOF = i),
        (this.rounds = s),
        (this.pos = 0),
        (this.posOut = 0),
        (this.finished = !1),
        (this.destroyed = !1),
        (0, yt.number)(n),
        0 >= this.blockLen || this.blockLen >= 200)
      )
        throw new Error("Sha3 supports only keccak-f1600 function");
      (this.state = new Uint8Array(200)), (this.state32 = (0, Me.u32)(this.state));
    }
    keccak() {
      Me.isLE || (0, Me.byteSwap32)(this.state32),
        ro(this.state32, this.rounds),
        Me.isLE || (0, Me.byteSwap32)(this.state32),
        (this.posOut = 0),
        (this.pos = 0);
    }
    update(t) {
      (0, yt.exists)(this);
      let { blockLen: r, state: n } = this;
      t = (0, Me.toBytes)(t);
      let i = t.length;
      for (let s = 0; s < i; ) {
        let o = Math.min(r - this.pos, i - s);
        for (let a = 0; a < o; a++) n[this.pos++] ^= t[s++];
        this.pos === r && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished) return;
      this.finished = !0;
      let { state: t, suffix: r, pos: n, blockLen: i } = this;
      (t[n] ^= r), r & 128 && n === i - 1 && this.keccak(), (t[i - 1] ^= 128), this.keccak();
    }
    writeInto(t) {
      (0, yt.exists)(this, !1), (0, yt.bytes)(t), this.finish();
      let r = this.state,
        { blockLen: n } = this;
      for (let i = 0, s = t.length; i < s; ) {
        this.posOut >= n && this.keccak();
        let o = Math.min(n - this.posOut, s - i);
        t.set(r.subarray(this.posOut, this.posOut + o), i), (this.posOut += o), (i += o);
      }
      return t;
    }
    xofInto(t) {
      if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
      return this.writeInto(t);
    }
    xof(t) {
      return (0, yt.number)(t), this.xofInto(new Uint8Array(t));
    }
    digestInto(t) {
      if (((0, yt.output)(t, this), this.finished)) throw new Error("digest() was already called");
      return this.writeInto(t), this.destroy(), t;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      (this.destroyed = !0), this.state.fill(0);
    }
    _cloneInto(t) {
      let { blockLen: r, suffix: n, outputLen: i, rounds: s, enableXOF: o } = this;
      return (
        t || (t = new e(r, n, i, o, s)),
        t.state32.set(this.state32),
        (t.pos = this.pos),
        (t.posOut = this.posOut),
        (t.finished = this.finished),
        (t.rounds = s),
        (t.suffix = n),
        (t.outputLen = i),
        (t.enableXOF = o),
        (t.destroyed = this.destroyed),
        t
      );
    }
  };
  G.Keccak = jt;
  var He = (e, t, r) => (0, Me.wrapConstructor)(() => new jt(t, e, r));
  G.sha3_224 = He(6, 144, 224 / 8);
  G.sha3_256 = He(6, 136, 256 / 8);
  G.sha3_384 = He(6, 104, 384 / 8);
  G.sha3_512 = He(6, 72, 512 / 8);
  G.keccak_224 = He(1, 144, 224 / 8);
  G.keccak_256 = He(1, 136, 256 / 8);
  G.keccak_384 = He(1, 104, 384 / 8);
  G.keccak_512 = He(1, 72, 512 / 8);
  var no = (e, t, r) =>
    (0, Me.wrapXOFConstructorWithOpts)(
      (n = {}) => new jt(t, e, n.dkLen === void 0 ? r : n.dkLen, !0),
    );
  G.shake128 = no(31, 168, 128 / 8);
  G.shake256 = no(31, 136, 256 / 8);
});
var ho = j((Tb, Ge) => {
  var { sha3_512: Xc } = io(),
    oo = 24,
    zt = 32,
    dn = (e = 4, t = Math.random) => {
      let r = "";
      for (; r.length < e; ) r = r + Math.floor(t() * 36).toString(36);
      return r;
    };
  function ao(e) {
    let t = 8n,
      r = 0n;
    for (let n of e.values()) {
      let i = BigInt(n);
      r = (r << t) + i;
    }
    return r;
  }
  var uo = (e = "") => ao(Xc(e)).toString(36).slice(1),
    so = Array.from({ length: 26 }, (e, t) => String.fromCharCode(t + 97)),
    Yc = (e) => so[Math.floor(e() * so.length)],
    lo = ({
      globalObj: e = typeof global < "u" ? global : typeof window < "u" ? window : {},
      random: t = Math.random,
    } = {}) => {
      let r = Object.keys(e).toString(),
        n = r.length ? r + dn(zt, t) : dn(zt, t);
      return uo(n).substring(0, zt);
    },
    co = (e) => () => e++,
    Zc = 476782367,
    fo = ({
      random: e = Math.random,
      counter: t = co(Math.floor(e() * Zc)),
      length: r = oo,
      fingerprint: n = lo({ random: e }),
    } = {}) =>
      function () {
        let s = Yc(e),
          o = Date.now().toString(36),
          a = t().toString(36),
          c = dn(r, e),
          u = `${o + c + a + n}`;
        return `${s + uo(u).substring(1, r)}`;
      },
    ef = fo(),
    tf = (e, { minLength: t = 2, maxLength: r = zt } = {}) => {
      let n = e.length,
        i = /^[0-9a-z]+$/;
      try {
        if (typeof e == "string" && n >= t && n <= r && i.test(e)) return !0;
      } finally {
      }
      return !1;
    };
  Ge.exports.getConstants = () => ({ defaultLength: oo, bigLength: zt });
  Ge.exports.init = fo;
  Ge.exports.createId = ef;
  Ge.exports.bufToBigInt = ao;
  Ge.exports.createCounter = co;
  Ge.exports.createFingerprint = lo;
  Ge.exports.isCuid = tf;
});
var Je = j((Lb, Rt) => {
  var { createId: rf, init: nf, getConstants: sf, isCuid: of } = ho();
  Rt.exports.createId = rf;
  Rt.exports.init = nf;
  Rt.exports.getConstants = sf;
  Rt.exports.isCuid = of;
});
var Tn = j((jb, Uo) => {
  "use strict";
  var vn = Object.defineProperty,
    af = Object.getOwnPropertyDescriptor,
    uf = Object.getOwnPropertyNames,
    lf = Object.prototype.hasOwnProperty,
    cf = (e, t) => {
      for (var r in t) vn(e, r, { get: t[r], enumerable: !0 });
    },
    ff = (e, t, r, n) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of uf(t))
          !lf.call(e, i) &&
            i !== r &&
            vn(e, i, { get: () => t[i], enumerable: !(n = af(t, i)) || n.enumerable });
      return e;
    },
    df = (e) => ff(vn({}, "__esModule", { value: !0 }), e),
    wo = {};
  cf(wo, {
    course: () => Xe,
    courseHistory: () => jo,
    coursePack: () => bt,
    coursePackRelations: () => Io,
    courseRelations: () => $o,
    membership: () => zo,
    schemas: () => nd,
    statement: () => kt,
    statementRelations: () => Do,
    userCourseProgress: () => Ro,
    userLearnRecord: () => Fo,
  });
  Uo.exports = df(wo);
  var hf = Je(),
    x = Symbol.for("drizzle:entityKind"),
    Nb = Symbol.for("drizzle:hasOwnEntityKind");
  function Te(e, t) {
    if (!e || typeof e != "object") return !1;
    if (e instanceof t) return !0;
    if (!Object.prototype.hasOwnProperty.call(t, x))
      throw new Error(
        `Class "${t.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`,
      );
    let r = e.constructor;
    if (r)
      for (; r; ) {
        if (x in r && r[x] === t[x]) return !0;
        r = Object.getPrototypeOf(r);
      }
    return !1;
  }
  var En = class {
      constructor(e, t) {
        (this.table = e),
          (this.config = t),
          (this.name = t.name),
          (this.notNull = t.notNull),
          (this.default = t.default),
          (this.defaultFn = t.defaultFn),
          (this.onUpdateFn = t.onUpdateFn),
          (this.hasDefault = t.hasDefault),
          (this.primary = t.primaryKey),
          (this.isUnique = t.isUnique),
          (this.uniqueName = t.uniqueName),
          (this.uniqueType = t.uniqueType),
          (this.dataType = t.dataType),
          (this.columnType = t.columnType);
      }
      static [x] = "Column";
      name;
      primary;
      notNull;
      default;
      defaultFn;
      onUpdateFn;
      hasDefault;
      isUnique;
      uniqueName;
      uniqueType;
      dataType;
      columnType;
      enumValues = void 0;
      config;
      mapFromDriverValue(e) {
        return e;
      }
      mapToDriverValue(e) {
        return e;
      }
    },
    mf = class {
      static [x] = "ColumnBuilder";
      config;
      constructor(e, t, r) {
        this.config = {
          name: e,
          notNull: !1,
          default: void 0,
          hasDefault: !1,
          primaryKey: !1,
          isUnique: !1,
          uniqueName: void 0,
          uniqueType: void 0,
          dataType: t,
          columnType: r,
        };
      }
      $type() {
        return this;
      }
      notNull() {
        return (this.config.notNull = !0), this;
      }
      default(e) {
        return (this.config.default = e), (this.config.hasDefault = !0), this;
      }
      $defaultFn(e) {
        return (this.config.defaultFn = e), (this.config.hasDefault = !0), this;
      }
      $default = this.$defaultFn;
      $onUpdateFn(e) {
        return (this.config.onUpdateFn = e), (this.config.hasDefault = !0), this;
      }
      $onUpdate = this.$onUpdateFn;
      primaryKey() {
        return (this.config.primaryKey = !0), (this.config.notNull = !0), this;
      }
    },
    hn = Symbol.for("drizzle:Name"),
    mn = Symbol.for("drizzle:Schema"),
    mo = Symbol.for("drizzle:Columns"),
    pn = Symbol.for("drizzle:OriginalName"),
    gn = Symbol.for("drizzle:BaseName"),
    po = Symbol.for("drizzle:IsAlias"),
    go = Symbol.for("drizzle:ExtraConfigBuilder"),
    pf = Symbol.for("drizzle:IsDrizzleTable"),
    Re = class {
      static [x] = "Table";
      static Symbol = {
        Name: hn,
        Schema: mn,
        OriginalName: pn,
        Columns: mo,
        BaseName: gn,
        IsAlias: po,
        ExtraConfigBuilder: go,
      };
      [hn];
      [pn];
      [mn];
      [mo];
      [gn];
      [po] = !1;
      [go] = void 0;
      [pf] = !0;
      constructor(e, t, r) {
        (this[hn] = this[pn] = e), (this[mn] = t), (this[gn] = r);
      }
    },
    wn = Symbol.for("drizzle:PgInlineForeignKeys"),
    Ut = class extends Re {
      static [x] = "PgTable";
      static Symbol = Object.assign({}, Re.Symbol, { InlineForeignKeys: wn });
      [wn] = [];
      [Re.Symbol.ExtraConfigBuilder] = void 0;
    };
  function gf(e, t, r, n, i = e) {
    let s = new Ut(e, n, i),
      o = Object.fromEntries(
        Object.entries(t).map(([c, u]) => {
          let d = u,
            h = d.build(s);
          return s[wn].push(...d.buildForeignKeys(h, s)), [c, h];
        }),
      ),
      a = Object.assign(s, o);
    return (a[Re.Symbol.Columns] = o), r && (a[Ut.Symbol.ExtraConfigBuilder] = r), a;
  }
  var it = (e, t, r) => gf(e, t, r, void 0),
    yf = class {
      static [x] = "PgForeignKeyBuilder";
      reference;
      _onUpdate = "no action";
      _onDelete = "no action";
      constructor(e, t) {
        (this.reference = () => {
          let { name: r, columns: n, foreignColumns: i } = e();
          return { name: r, columns: n, foreignTable: i[0].table, foreignColumns: i };
        }),
          t && ((this._onUpdate = t.onUpdate), (this._onDelete = t.onDelete));
      }
      onUpdate(e) {
        return (this._onUpdate = e === void 0 ? "no action" : e), this;
      }
      onDelete(e) {
        return (this._onDelete = e === void 0 ? "no action" : e), this;
      }
      build(e) {
        return new bf(e, this);
      }
    },
    bf = class {
      constructor(e, t) {
        (this.table = e),
          (this.reference = t.reference),
          (this.onUpdate = t._onUpdate),
          (this.onDelete = t._onDelete);
      }
      static [x] = "PgForeignKey";
      reference;
      onUpdate;
      onDelete;
      getName() {
        let { name: e, columns: t, foreignColumns: r } = this.reference(),
          n = t.map((o) => o.name),
          i = r.map((o) => o.name),
          s = [this.table[Ut.Symbol.Name], ...n, r[0].table[Ut.Symbol.Name], ...i];
        return e ?? `${s.join("_")}_fk`;
      }
    };
  function So(e, ...t) {
    return e(...t);
  }
  function On(e) {
    return new Sf(e);
  }
  function _o(e, t) {
    return `${e[Ut.Symbol.Name]}_${t.join("_")}_unique`;
  }
  var wf = class {
      constructor(e, t) {
        (this.name = t), (this.columns = e);
      }
      static [x] = "PgUniqueConstraintBuilder";
      columns;
      nullsNotDistinctConfig = !1;
      nullsNotDistinct() {
        return (this.nullsNotDistinctConfig = !0), this;
      }
      build(e) {
        return new _f(e, this.columns, this.nullsNotDistinctConfig, this.name);
      }
    },
    Sf = class {
      static [x] = "PgUniqueOnConstraintBuilder";
      name;
      constructor(e) {
        this.name = e;
      }
      on(...e) {
        return new wf(e, this.name);
      }
    },
    _f = class {
      constructor(e, t, r, n) {
        (this.table = e),
          (this.columns = t),
          (this.name =
            n ??
            _o(
              this.table,
              this.columns.map((i) => i.name),
            )),
          (this.nullsNotDistinct = r);
      }
      static [x] = "PgUniqueConstraint";
      columns;
      name;
      nullsNotDistinct = !1;
      getName() {
        return this.name;
      }
    };
  function yo(e, t, r) {
    for (let n = t; n < e.length; n++) {
      let i = e[n];
      if (i === "\\") {
        n++;
        continue;
      }
      if (i === '"') return [e.slice(t, n).replace(/\\/g, ""), n + 1];
      if (!r && (i === "," || i === "}")) return [e.slice(t, n).replace(/\\/g, ""), n];
    }
    return [e.slice(t).replace(/\\/g, ""), e.length];
  }
  function vo(e, t = 0) {
    let r = [],
      n = t,
      i = !1;
    for (; n < e.length; ) {
      let s = e[n];
      if (s === ",") {
        (i || n === t) && r.push(""), (i = !0), n++;
        continue;
      }
      if (((i = !1), s === "\\")) {
        n += 2;
        continue;
      }
      if (s === '"') {
        let [c, u] = yo(e, n + 1, !0);
        r.push(c), (n = u);
        continue;
      }
      if (s === "}") return [r, n + 1];
      if (s === "{") {
        let [c, u] = vo(e, n + 1);
        r.push(c), (n = u);
        continue;
      }
      let [o, a] = yo(e, n, !1);
      r.push(o), (n = a);
    }
    return [r, n];
  }
  function vf(e) {
    let [t] = vo(e, 1);
    return t;
  }
  function Eo(e) {
    return `{${e.map((t) => (Array.isArray(t) ? Eo(t) : typeof t == "string" ? `"${t.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"` : `${t}`)).join(",")}}`;
  }
  var st = class extends mf {
      foreignKeyConfigs = [];
      static [x] = "PgColumnBuilder";
      array(e) {
        return new Ef(this.config.name, this, e);
      }
      references(e, t = {}) {
        return this.foreignKeyConfigs.push({ ref: e, actions: t }), this;
      }
      unique(e, t) {
        return (
          (this.config.isUnique = !0),
          (this.config.uniqueName = e),
          (this.config.uniqueType = t?.nulls),
          this
        );
      }
      buildForeignKeys(e, t) {
        return this.foreignKeyConfigs.map(({ ref: r, actions: n }) =>
          So(
            (i, s) => {
              let o = new yf(() => {
                let a = i();
                return { columns: [e], foreignColumns: [a] };
              });
              return (
                s.onUpdate && o.onUpdate(s.onUpdate),
                s.onDelete && o.onDelete(s.onDelete),
                o.build(t)
              );
            },
            r,
            n,
          ),
        );
      }
    },
    Fe = class extends En {
      constructor(e, t) {
        t.uniqueName || (t.uniqueName = _o(e, [t.name])), super(e, t), (this.table = e);
      }
      static [x] = "PgColumn";
    },
    Ef = class extends st {
      static [x] = "PgArrayBuilder";
      constructor(e, t, r) {
        super(e, "array", "PgArray"), (this.config.baseBuilder = t), (this.config.size = r);
      }
      build(e) {
        let t = this.config.baseBuilder.build(e);
        return new Of(e, this.config, t);
      }
    },
    Of = class Oo extends Fe {
      constructor(t, r, n, i) {
        super(t, r), (this.baseColumn = n), (this.range = i), (this.size = r.size);
      }
      size;
      static [x] = "PgArray";
      getSQLType() {
        return `${this.baseColumn.getSQLType()}[${typeof this.size == "number" ? this.size : ""}]`;
      }
      mapFromDriverValue(t) {
        return (
          typeof t == "string" && (t = vf(t)), t.map((r) => this.baseColumn.mapFromDriverValue(r))
        );
      }
      mapToDriverValue(t, r = !1) {
        let n = t.map((i) =>
          i === null
            ? null
            : Te(this.baseColumn, Oo)
              ? this.baseColumn.mapToDriverValue(i, !0)
              : this.baseColumn.mapToDriverValue(i),
        );
        return r ? n : Eo(n);
      }
    },
    bo = Symbol.for("drizzle:isPgEnum");
  function Af(e) {
    return !!e && typeof e == "function" && bo in e && e[bo] === !0;
  }
  var Bb = class extends st {
      static [x] = "PgEnumColumnBuilder";
      constructor(e, t) {
        super(e, "string", "PgEnumColumn"), (this.config.enum = t);
      }
      build(e) {
        return new Pf(e, this.config);
      }
    },
    Pf = class extends Fe {
      static [x] = "PgEnumColumn";
      enum = this.config.enum;
      enumValues = this.config.enum.enumValues;
      constructor(e, t) {
        super(e, t), (this.enum = t.enum);
      }
      getSQLType() {
        return this.enum.enumName;
      }
    },
    An = class {
      static [x] = "Subquery";
      constructor(e, t, r, n = !1) {
        this._ = { brand: "Subquery", sql: e, selectedFields: t, alias: r, isWith: n };
      }
    },
    Cb = class extends An {
      static [x] = "WithSubquery";
    },
    Tf = "0.30.10",
    yn,
    bn,
    Lf = {
      startActiveSpan(e, t) {
        return yn
          ? (bn || (bn = yn.trace.getTracer("drizzle-orm", Tf)),
            So(
              (r, n) =>
                n.startActiveSpan(e, (i) => {
                  try {
                    return t(i);
                  } catch (s) {
                    throw (
                      (i.setStatus({
                        code: r.SpanStatusCode.ERROR,
                        message: s instanceof Error ? s.message : "Unknown error",
                      }),
                      s)
                    );
                  } finally {
                    i.end();
                  }
                }),
              yn,
              bn,
            ))
          : t();
      },
    },
    cr = Symbol.for("drizzle:ViewBaseConfig"),
    xb = class {
      static [x] = "FakePrimitiveParam";
    };
  function Nf(e) {
    return e != null && typeof e.getSQL == "function";
  }
  function Bf(e) {
    let t = { sql: "", params: [] };
    for (let r of e)
      (t.sql += r.sql),
        t.params.push(...r.params),
        r.typings?.length && (t.typings || (t.typings = []), t.typings.push(...r.typings));
    return t;
  }
  var Ce = class {
      static [x] = "StringChunk";
      value;
      constructor(e) {
        this.value = Array.isArray(e) ? e : [e];
      }
      getSQL() {
        return new ye([this]);
      }
    },
    ye = class Ft {
      constructor(t) {
        this.queryChunks = t;
      }
      static [x] = "SQL";
      decoder = Ao;
      shouldInlineParams = !1;
      append(t) {
        return this.queryChunks.push(...t.queryChunks), this;
      }
      toQuery(t) {
        return Lf.startActiveSpan("drizzle.buildSQL", (r) => {
          let n = this.buildQueryFromSourceParams(this.queryChunks, t);
          return (
            r?.setAttributes({
              "drizzle.query.text": n.sql,
              "drizzle.query.params": JSON.stringify(n.params),
            }),
            n
          );
        });
      }
      buildQueryFromSourceParams(t, r) {
        let n = Object.assign({}, r, {
            inlineParams: r.inlineParams || this.shouldInlineParams,
            paramStartIndex: r.paramStartIndex || { value: 0 },
          }),
          {
            escapeName: i,
            escapeParam: s,
            prepareTyping: o,
            inlineParams: a,
            paramStartIndex: c,
          } = n;
        return Bf(
          t.map((u) => {
            if (Te(u, Ce)) return { sql: u.value.join(""), params: [] };
            if (Te(u, Sn)) return { sql: i(u.value), params: [] };
            if (u === void 0) return { sql: "", params: [] };
            if (Array.isArray(u)) {
              let d = [new Ce("(")];
              for (let [h, p] of u.entries()) d.push(p), h < u.length - 1 && d.push(new Ce(", "));
              return d.push(new Ce(")")), this.buildQueryFromSourceParams(d, n);
            }
            if (Te(u, Ft))
              return this.buildQueryFromSourceParams(u.queryChunks, {
                ...n,
                inlineParams: a || u.shouldInlineParams,
              });
            if (Te(u, Re)) {
              let d = u[Re.Symbol.Schema],
                h = u[Re.Symbol.Name];
              return { sql: d === void 0 ? i(h) : i(d) + "." + i(h), params: [] };
            }
            if (Te(u, En)) return { sql: i(u.table[Re.Symbol.Name]) + "." + i(u.name), params: [] };
            if (Te(u, Cf)) {
              let d = u[cr].schema,
                h = u[cr].name;
              return { sql: d === void 0 ? i(h) : i(d) + "." + i(h), params: [] };
            }
            if (Te(u, To)) {
              let d = u.value === null ? null : u.encoder.mapToDriverValue(u.value);
              if (Te(d, Ft)) return this.buildQueryFromSourceParams([d], n);
              if (a) return { sql: this.mapInlineParam(d, n), params: [] };
              let h;
              return (
                o !== void 0 && (h = [o(u.encoder)]),
                { sql: s(c.value++, d), params: [d], typings: h }
              );
            }
            return Te(u, Lo)
              ? { sql: s(c.value++, u), params: [u] }
              : Te(u, Ft.Aliased) && u.fieldAlias !== void 0
                ? { sql: i(u.fieldAlias), params: [] }
                : Te(u, An)
                  ? u._.isWith
                    ? { sql: i(u._.alias), params: [] }
                    : this.buildQueryFromSourceParams(
                        [new Ce("("), u._.sql, new Ce(") "), new Sn(u._.alias)],
                        n,
                      )
                  : Af(u)
                    ? u.schema
                      ? { sql: i(u.schema) + "." + i(u.enumName), params: [] }
                      : { sql: i(u.enumName), params: [] }
                    : Nf(u)
                      ? this.buildQueryFromSourceParams([new Ce("("), u.getSQL(), new Ce(")")], n)
                      : a
                        ? { sql: this.mapInlineParam(u, n), params: [] }
                        : { sql: s(c.value++, u), params: [u] };
          }),
        );
      }
      mapInlineParam(t, { escapeString: r }) {
        if (t === null) return "null";
        if (typeof t == "number" || typeof t == "boolean") return t.toString();
        if (typeof t == "string") return r(t);
        if (typeof t == "object") {
          let n = t.toString();
          return r(n === "[object Object]" ? JSON.stringify(t) : n);
        }
        throw new Error("Unexpected param value: " + t);
      }
      getSQL() {
        return this;
      }
      as(t) {
        return t === void 0 ? this : new Ft.Aliased(this, t);
      }
      mapWith(t) {
        return (this.decoder = typeof t == "function" ? { mapFromDriverValue: t } : t), this;
      }
      inlineParams() {
        return (this.shouldInlineParams = !0), this;
      }
      if(t) {
        return t ? this : void 0;
      }
    },
    Sn = class {
      constructor(e) {
        this.value = e;
      }
      static [x] = "Name";
      brand;
      getSQL() {
        return new ye([this]);
      }
    },
    Ao = { mapFromDriverValue: (e) => e },
    Po = { mapToDriverValue: (e) => e },
    Ib = { ...Ao, ...Po },
    To = class {
      constructor(e, t = Po) {
        (this.value = e), (this.encoder = t);
      }
      static [x] = "Param";
      brand;
      getSQL() {
        return new ye([this]);
      }
    };
  function _n(e, ...t) {
    let r = [];
    (t.length > 0 || (e.length > 0 && e[0] !== "")) && r.push(new Ce(e[0]));
    for (let [n, i] of t.entries()) r.push(i, new Ce(e[n + 1]));
    return new ye(r);
  }
  ((e) => {
    function t() {
      return new ye([]);
    }
    e.empty = t;
    function r(c) {
      return new ye(c);
    }
    e.fromList = r;
    function n(c) {
      return new ye([new Ce(c)]);
    }
    e.raw = n;
    function i(c, u) {
      let d = [];
      for (let [h, p] of c.entries()) h > 0 && u !== void 0 && d.push(u), d.push(p);
      return new ye(d);
    }
    e.join = i;
    function s(c) {
      return new Sn(c);
    }
    e.identifier = s;
    function o(c) {
      return new Lo(c);
    }
    e.placeholder = o;
    function a(c, u) {
      return new To(c, u);
    }
    e.param = a;
  })(_n || (_n = {}));
  ((e) => {
    class t {
      constructor(n, i) {
        (this.sql = n), (this.fieldAlias = i);
      }
      static [x] = "SQL.Aliased";
      isSelectionField = !1;
      getSQL() {
        return this.sql;
      }
      clone() {
        return new t(this.sql, this.fieldAlias);
      }
    }
    e.Aliased = t;
  })(ye || (ye = {}));
  var Lo = class {
      constructor(e) {
        this.name = e;
      }
      static [x] = "Placeholder";
      getSQL() {
        return new ye([this]);
      }
    },
    Cf = class {
      static [x] = "View";
      [cr];
      constructor({ name: e, schema: t, selectedFields: r, query: n }) {
        this[cr] = {
          name: e,
          originalName: e,
          schema: t,
          selectedFields: r,
          query: n,
          isExisting: !n,
          isAlias: !1,
        };
      }
      getSQL() {
        return new ye([this]);
      }
    };
  En.prototype.getSQL = function () {
    return new ye([this]);
  };
  Re.prototype.getSQL = function () {
    return new ye([this]);
  };
  An.prototype.getSQL = function () {
    return new ye([this]);
  };
  var No = class {
      constructor(e, t, r) {
        (this.sourceTable = e),
          (this.referencedTable = t),
          (this.relationName = r),
          (this.referencedTableName = t[Re.Symbol.Name]);
      }
      static [x] = "Relation";
      referencedTableName;
      fieldName;
    },
    xf = class {
      constructor(e, t) {
        (this.table = e), (this.config = t);
      }
      static [x] = "Relations";
    },
    Db = class Bo extends No {
      constructor(t, r, n, i) {
        super(t, r, n?.relationName), (this.config = n), (this.isNullable = i);
      }
      static [x] = "One";
      withFieldName(t) {
        let r = new Bo(this.sourceTable, this.referencedTable, this.config, this.isNullable);
        return (r.fieldName = t), r;
      }
    },
    $b = class Co extends No {
      constructor(t, r, n) {
        super(t, r, n?.relationName), (this.config = n);
      }
      static [x] = "Many";
      withFieldName(t) {
        let r = new Co(this.sourceTable, this.referencedTable, this.config);
        return (r.fieldName = t), r;
      }
    };
  function Pn(e, t) {
    return new xf(e, (r) =>
      Object.fromEntries(Object.entries(t(r)).map(([n, i]) => [n, i.withFieldName(n)])),
    );
  }
  var If = class extends st {
      static [x] = "PgBooleanBuilder";
      constructor(e) {
        super(e, "boolean", "PgBoolean");
      }
      build(e) {
        return new Df(e, this.config);
      }
    },
    Df = class extends Fe {
      static [x] = "PgBoolean";
      getSQLType() {
        return "boolean";
      }
    };
  function xo(e) {
    return new If(e);
  }
  var fr = class extends st {
      static [x] = "PgDateColumnBaseBuilder";
      defaultNow() {
        return this.default(_n`now()`);
      }
    },
    $f = class extends fr {
      static [x] = "PgDateBuilder";
      constructor(e) {
        super(e, "date", "PgDate");
      }
      build(e) {
        return new jf(e, this.config);
      }
    },
    jf = class extends Fe {
      static [x] = "PgDate";
      getSQLType() {
        return "date";
      }
      mapFromDriverValue(e) {
        return new Date(e);
      }
      mapToDriverValue(e) {
        return e.toISOString();
      }
    },
    zf = class extends fr {
      static [x] = "PgDateStringBuilder";
      constructor(e) {
        super(e, "string", "PgDateString");
      }
      build(e) {
        return new Rf(e, this.config);
      }
    },
    Rf = class extends Fe {
      static [x] = "PgDateString";
      getSQLType() {
        return "date";
      }
    };
  function Ff(e, t) {
    return t?.mode === "date" ? new $f(e) : new zf(e);
  }
  var Uf = class extends st {
      static [x] = "PgIntegerBuilder";
      constructor(e) {
        super(e, "number", "PgInteger");
      }
      build(e) {
        return new kf(e, this.config);
      }
    },
    kf = class extends Fe {
      static [x] = "PgInteger";
      getSQLType() {
        return "integer";
      }
      mapFromDriverValue(e) {
        return typeof e == "string" ? Number.parseInt(e) : e;
      }
    };
  function wt(e) {
    return new Uf(e);
  }
  var qf = class extends st {
      static [x] = "PgTextBuilder";
      constructor(e, t) {
        super(e, "string", "PgText"), (this.config.enumValues = t.enum);
      }
      build(e) {
        return new Vf(e, this.config);
      }
    },
    Vf = class extends Fe {
      static [x] = "PgText";
      enumValues = this.config.enumValues;
      getSQLType() {
        return "text";
      }
    };
  function Y(e, t = {}) {
    return new qf(e, t);
  }
  var Mf = class extends fr {
      static [x] = "PgTimestampBuilder";
      constructor(e, t, r) {
        super(e, "date", "PgTimestamp"),
          (this.config.withTimezone = t),
          (this.config.precision = r);
      }
      build(e) {
        return new Kf(e, this.config);
      }
    },
    Kf = class extends Fe {
      static [x] = "PgTimestamp";
      withTimezone;
      precision;
      constructor(e, t) {
        super(e, t), (this.withTimezone = t.withTimezone), (this.precision = t.precision);
      }
      getSQLType() {
        return `timestamp${this.precision === void 0 ? "" : ` (${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
      }
      mapFromDriverValue = (e) => new Date(this.withTimezone ? e : e + "+0000");
      mapToDriverValue = (e) => e.toISOString();
    },
    Wf = class extends fr {
      static [x] = "PgTimestampStringBuilder";
      constructor(e, t, r) {
        super(e, "string", "PgTimestampString"),
          (this.config.withTimezone = t),
          (this.config.precision = r);
      }
      build(e) {
        return new Qf(e, this.config);
      }
    },
    Qf = class extends Fe {
      static [x] = "PgTimestampString";
      withTimezone;
      precision;
      constructor(e, t) {
        super(e, t), (this.withTimezone = t.withTimezone), (this.precision = t.precision);
      }
      getSQLType() {
        return `timestamp${this.precision === void 0 ? "" : `(${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
      }
    };
  function me(e, t = {}) {
    return t.mode === "string"
      ? new Wf(e, t.withTimezone ?? !1, t.precision)
      : new Mf(e, t.withTimezone ?? !1, t.precision);
  }
  var Hf = class extends st {
      static [x] = "PgVarcharBuilder";
      constructor(e, t) {
        super(e, "string", "PgVarchar"),
          (this.config.length = t.length),
          (this.config.enumValues = t.enum);
      }
      build(e) {
        return new Gf(e, this.config);
      }
    },
    Gf = class extends Fe {
      static [x] = "PgVarchar";
      length = this.config.length;
      enumValues = this.config.enumValues;
      getSQLType() {
        return this.length === void 0 ? "varchar" : `varchar(${this.length})`;
      }
    };
  function Jf(e, t = {}) {
    return new Hf(e, t);
  }
  var Xf = Je(),
    bt = it("course_packs", {
      id: Y("id")
        .primaryKey()
        .$defaultFn(() => (0, Xf.createId)()),
      order: wt("order").notNull(),
      title: Y("title").notNull(),
      description: Y("description").default(""),
      isFree: xo("is_free"),
      cover: Y("cover"),
      createdAt: me("created_at").notNull().defaultNow(),
      updatedAt: me("updated_at").$onUpdateFn(() => new Date()),
    }),
    Io = Pn(bt, ({ many: e }) => ({ courses: e(Xe) })),
    Yf = Je(),
    kt = it("statements", {
      id: Y("id")
        .primaryKey()
        .$defaultFn(() => (0, Yf.createId)()),
      order: wt("order").notNull(),
      chinese: Y("chinese").notNull(),
      english: Y("english").notNull(),
      soundmark: Y("soundmark").notNull(),
      courseId: Y("course_id")
        .notNull()
        .references(() => Xe.id),
      createdAt: me("created_at").notNull().defaultNow(),
      updatedAt: me("updated_at").$onUpdateFn(() => new Date()),
    }),
    Do = Pn(kt, ({ one: e }) => ({
      course: e(Xe, { fields: [kt.courseId], references: [Xe.id] }),
    })),
    Xe = it("courses", {
      id: Y("id")
        .primaryKey()
        .$defaultFn(() => (0, hf.createId)()),
      title: Jf("title", { length: 256 }).notNull(),
      description: Y("description").default(""),
      video: Y("video").default(""),
      order: wt("order").notNull(),
      coursePackId: Y("course_pack_id")
        .notNull()
        .references(() => bt.id),
      createdAt: me("created_at").notNull().defaultNow(),
      updatedAt: me("updated_at").$onUpdateFn(() => new Date()),
    }),
    $o = Pn(Xe, ({ one: e, many: t }) => ({
      statements: t(kt),
      coursePack: e(bt, { fields: [Xe.coursePackId], references: [bt.id] }),
    })),
    Zf = Je(),
    jo = it(
      "course_history",
      {
        id: Y("id")
          .primaryKey()
          .$defaultFn(() => (0, Zf.createId)()),
        userId: Y("user_id").notNull(),
        courseId: Y("course_id").notNull(),
        coursePackId: Y("course_pack_id").notNull(),
        completionCount: wt("completion_count").notNull(),
        createdAt: me("created_at").notNull().defaultNow(),
        updatedAt: me("updated_at").$onUpdateFn(() => new Date()),
      },
      (e) => ({ unq: On().on(e.userId, e.courseId, e.coursePackId) }),
    ),
    ed = Je(),
    zo = it("memberships", {
      id: Y("id")
        .primaryKey()
        .$defaultFn(() => (0, ed.createId)()),
      userId: Y("user_id").notNull(),
      start_date: me("start_date").notNull(),
      end_date: me("end_date").notNull(),
      isActive: xo("isActive"),
      createdAt: me("created_at").notNull().defaultNow(),
      updatedAt: me("updated_at").$onUpdateFn(() => new Date()),
    }),
    td = Je(),
    Ro = it(
      "user_course_progress",
      {
        id: Y("id")
          .primaryKey()
          .$defaultFn(() => (0, td.createId)()),
        userId: Y("user_id").notNull(),
        coursePackId: Y("course_pack_id").notNull(),
        courseId: Y("course_id").notNull(),
        statementIndex: wt("statement_index").notNull(),
        createdAt: me("created_at").notNull().defaultNow(),
        updatedAt: me("updated_at").$onUpdateFn(() => new Date()),
      },
      (e) => ({ unq: On().on(e.userId, e.coursePackId) }),
    ),
    rd = Je(),
    Fo = it(
      "user_learn_record",
      {
        id: Y("id")
          .primaryKey()
          .$defaultFn(() => (0, rd.createId)()),
        userId: Y("user_id").notNull(),
        count: wt("count").notNull().default(0),
        day: Ff("day").notNull(),
        createdAt: me("created_at").notNull().defaultNow(),
        updatedAt: me("updated_at").$onUpdateFn(() => new Date()),
      },
      (e) => ({ unq: On().on(e.userId, e.day) }),
    ),
    nd = {
      course: Xe,
      statement: kt,
      statementRelations: Do,
      membership: zo,
      userCourseProgress: Ro,
      courseHistory: jo,
      userLearnRecord: Fo,
      coursePack: bt,
      courseRelations: $o,
      coursePackRelations: Io,
    };
});
var Jn = j((Gw, la) => {
  "use strict";
  var Qt = (e) => e && typeof e.message == "string",
    Gn = (e) => {
      if (!e) return;
      let t = e.cause;
      if (typeof t == "function") {
        let r = e.cause();
        return Qt(r) ? r : void 0;
      } else return Qt(t) ? t : void 0;
    },
    aa = (e, t) => {
      if (!Qt(e)) return "";
      let r = e.stack || "";
      if (t.has(e))
        return (
          r +
          `
causes have become circular...`
        );
      let n = Gn(e);
      return n
        ? (t.add(e),
          r +
            `
caused by: ` +
            aa(n, t))
        : r;
    },
    Id = (e) => aa(e, new Set()),
    ua = (e, t, r) => {
      if (!Qt(e)) return "";
      let n = r ? "" : e.message || "";
      if (t.has(e)) return n + ": ...";
      let i = Gn(e);
      if (i) {
        t.add(e);
        let s = typeof e.cause == "function";
        return n + (s ? "" : ": ") + ua(i, t, s);
      } else return n;
    },
    Dd = (e) => ua(e, new Set());
  la.exports = { isErrorLike: Qt, getErrorCause: Gn, stackWithCauses: Id, messageWithCauses: Dd };
});
var Xn = j((Jw, fa) => {
  "use strict";
  var $d = Symbol("circular-ref-tag"),
    _r = Symbol("pino-raw-err-ref"),
    ca = Object.create(
      {},
      {
        type: { enumerable: !0, writable: !0, value: void 0 },
        message: { enumerable: !0, writable: !0, value: void 0 },
        stack: { enumerable: !0, writable: !0, value: void 0 },
        aggregateErrors: { enumerable: !0, writable: !0, value: void 0 },
        raw: {
          enumerable: !1,
          get: function () {
            return this[_r];
          },
          set: function (e) {
            this[_r] = e;
          },
        },
      },
    );
  Object.defineProperty(ca, _r, { writable: !0, value: {} });
  fa.exports = { pinoErrProto: ca, pinoErrorSymbols: { seen: $d, rawSymbol: _r } };
});
var ma = j((Xw, ha) => {
  "use strict";
  ha.exports = Zn;
  var { messageWithCauses: jd, stackWithCauses: zd, isErrorLike: da } = Jn(),
    { pinoErrProto: Rd, pinoErrorSymbols: Fd } = Xn(),
    { seen: Yn } = Fd,
    { toString: Ud } = Object.prototype;
  function Zn(e) {
    if (!da(e)) return e;
    e[Yn] = void 0;
    let t = Object.create(Rd);
    (t.type = Ud.call(e.constructor) === "[object Function]" ? e.constructor.name : e.name),
      (t.message = jd(e)),
      (t.stack = zd(e)),
      Array.isArray(e.errors) && (t.aggregateErrors = e.errors.map((r) => Zn(r)));
    for (let r in e)
      if (t[r] === void 0) {
        let n = e[r];
        da(n)
          ? r !== "cause" && !Object.prototype.hasOwnProperty.call(n, Yn) && (t[r] = Zn(n))
          : (t[r] = n);
      }
    return delete e[Yn], (t.raw = e), t;
  }
});
var ga = j((Yw, pa) => {
  "use strict";
  pa.exports = Er;
  var { isErrorLike: ei } = Jn(),
    { pinoErrProto: kd, pinoErrorSymbols: qd } = Xn(),
    { seen: vr } = qd,
    { toString: Vd } = Object.prototype;
  function Er(e) {
    if (!ei(e)) return e;
    e[vr] = void 0;
    let t = Object.create(kd);
    (t.type = Vd.call(e.constructor) === "[object Function]" ? e.constructor.name : e.name),
      (t.message = e.message),
      (t.stack = e.stack),
      Array.isArray(e.errors) && (t.aggregateErrors = e.errors.map((r) => Er(r))),
      ei(e.cause) && !Object.prototype.hasOwnProperty.call(e.cause, vr) && (t.cause = Er(e.cause));
    for (let r in e)
      if (t[r] === void 0) {
        let n = e[r];
        ei(n) ? Object.prototype.hasOwnProperty.call(n, vr) || (t[r] = Er(n)) : (t[r] = n);
      }
    return delete e[vr], (t.raw = e), t;
  }
});
var Sa = j((Zw, wa) => {
  "use strict";
  wa.exports = { mapHttpRequest: Md, reqSerializer: ba };
  var ti = Symbol("pino-raw-req-ref"),
    ya = Object.create(
      {},
      {
        id: { enumerable: !0, writable: !0, value: "" },
        method: { enumerable: !0, writable: !0, value: "" },
        url: { enumerable: !0, writable: !0, value: "" },
        query: { enumerable: !0, writable: !0, value: "" },
        params: { enumerable: !0, writable: !0, value: "" },
        headers: { enumerable: !0, writable: !0, value: {} },
        remoteAddress: { enumerable: !0, writable: !0, value: "" },
        remotePort: { enumerable: !0, writable: !0, value: "" },
        raw: {
          enumerable: !1,
          get: function () {
            return this[ti];
          },
          set: function (e) {
            this[ti] = e;
          },
        },
      },
    );
  Object.defineProperty(ya, ti, { writable: !0, value: {} });
  function ba(e) {
    let t = e.info || e.socket,
      r = Object.create(ya);
    if (
      ((r.id = typeof e.id == "function" ? e.id() : e.id || (e.info ? e.info.id : void 0)),
      (r.method = e.method),
      e.originalUrl)
    )
      r.url = e.originalUrl;
    else {
      let n = e.path;
      r.url = typeof n == "string" ? n : e.url ? e.url.path || e.url : void 0;
    }
    return (
      e.query && (r.query = e.query),
      e.params && (r.params = e.params),
      (r.headers = e.headers),
      (r.remoteAddress = t && t.remoteAddress),
      (r.remotePort = t && t.remotePort),
      (r.raw = e.raw || e),
      r
    );
  }
  function Md(e) {
    return { req: ba(e) };
  }
});
var Oa = j((eS, Ea) => {
  "use strict";
  Ea.exports = { mapHttpResponse: Kd, resSerializer: va };
  var ri = Symbol("pino-raw-res-ref"),
    _a = Object.create(
      {},
      {
        statusCode: { enumerable: !0, writable: !0, value: 0 },
        headers: { enumerable: !0, writable: !0, value: "" },
        raw: {
          enumerable: !1,
          get: function () {
            return this[ri];
          },
          set: function (e) {
            this[ri] = e;
          },
        },
      },
    );
  Object.defineProperty(_a, ri, { writable: !0, value: {} });
  function va(e) {
    let t = Object.create(_a);
    return (
      (t.statusCode = e.headersSent ? e.statusCode : null),
      (t.headers = e.getHeaders ? e.getHeaders() : e._headers),
      (t.raw = e),
      t
    );
  }
  function Kd(e) {
    return { res: va(e) };
  }
});
var ii = j((tS, Aa) => {
  "use strict";
  var ni = ma(),
    Wd = ga(),
    Or = Sa(),
    Ar = Oa();
  Aa.exports = {
    err: ni,
    errWithCause: Wd,
    mapHttpRequest: Or.mapHttpRequest,
    mapHttpResponse: Ar.mapHttpResponse,
    req: Or.reqSerializer,
    res: Ar.resSerializer,
    wrapErrorSerializer: function (t) {
      return t === ni
        ? t
        : function (n) {
            return t(ni(n));
          };
    },
    wrapRequestSerializer: function (t) {
      return t === Or.reqSerializer
        ? t
        : function (n) {
            return t(Or.reqSerializer(n));
          };
    },
    wrapResponseSerializer: function (t) {
      return t === Ar.resSerializer
        ? t
        : function (n) {
            return t(Ar.resSerializer(n));
          };
    },
  };
});
var si = j((rS, Pa) => {
  "use strict";
  function Qd(e, t) {
    return t;
  }
  Pa.exports = function () {
    let t = Error.prepareStackTrace;
    Error.prepareStackTrace = Qd;
    let r = new Error().stack;
    if (((Error.prepareStackTrace = t), !Array.isArray(r))) return;
    let n = r.slice(2),
      i = [];
    for (let s of n) s && i.push(s.getFileName());
    return i;
  };
});
var La = j((nS, Ta) => {
  "use strict";
  Ta.exports = Hd;
  function Hd(e = {}) {
    let {
      ERR_PATHS_MUST_BE_STRINGS: t = () => "fast-redact - Paths must be (non-empty) strings",
      ERR_INVALID_PATH: r = (n) => `fast-redact \u2013 Invalid path (${n})`,
    } = e;
    return function ({ paths: i }) {
      i.forEach((s) => {
        if (typeof s != "string") throw Error(t());
        try {
          if (/〇/.test(s)) throw Error();
          let o =
            (s[0] === "[" ? "" : ".") +
            s
              .replace(/^\*/, "\u3007")
              .replace(/\.\*/g, ".\u3007")
              .replace(/\[\*\]/g, "[\u3007]");
          if (/\n|\r|;/.test(o) || /\/\*/.test(o)) throw Error();
          Function(`
            'use strict'
            const o = new Proxy({}, { get: () => o, set: () => { throw Error() } });
            const \u3007 = null;
            o${o}
            if ([o${o}].length !== 1) throw Error()`)();
        } catch {
          throw Error(r(s));
        }
      });
    };
  }
});
var Pr = j((iS, Na) => {
  "use strict";
  Na.exports = /[^.[\]]+|\[((?:.)*?)\]/g;
});
var Ca = j((sS, Ba) => {
  "use strict";
  var Gd = Pr();
  Ba.exports = Jd;
  function Jd({ paths: e }) {
    let t = [];
    var r = 0;
    let n = e.reduce(function (i, s, o) {
      var a = s.match(Gd).map((d) => d.replace(/'|"|`/g, ""));
      let c = s[0] === "[";
      a = a.map((d) => (d[0] === "[" ? d.substr(1, d.length - 2) : d));
      let u = a.indexOf("*");
      if (u > -1) {
        let d = a.slice(0, u),
          h = d.join("."),
          p = a.slice(u + 1, a.length),
          f = p.length > 0;
        r++, t.push({ before: d, beforeStr: h, after: p, nested: f });
      } else
        i[s] = {
          path: a,
          val: void 0,
          precensored: !1,
          circle: "",
          escPath: JSON.stringify(s),
          leadingBracket: c,
        };
      return i;
    }, {});
    return { wildcards: t, wcLen: r, secret: n };
  }
});
var Ia = j((oS, xa) => {
  "use strict";
  var Xd = Pr();
  xa.exports = Yd;
  function Yd(
    { secret: e, serialize: t, wcLen: r, strict: n, isCensorFct: i, censorFctTakesPath: s },
    o,
  ) {
    let a = Function(
      "o",
      `
    if (typeof o !== 'object' || o == null) {
      ${rh(n, t)}
    }
    const { censor, secret } = this
    const originalSecret = {}
    const secretKeys = Object.keys(secret)
    for (var i = 0; i < secretKeys.length; i++) {
      originalSecret[secretKeys[i]] = secret[secretKeys[i]]
    }

    ${Zd(e, i, s)}
    this.compileRestore()
    ${eh(r > 0, i, s)}
    this.secret = originalSecret
    ${th(t)}
  `,
    ).bind(o);
    return (a.state = o), t === !1 && (a.restore = (c) => o.restore(c)), a;
  }
  function Zd(e, t, r) {
    return Object.keys(e).map((n) => {
      let { escPath: i, leadingBracket: s, path: o } = e[n],
        a = s ? 1 : 0,
        c = s ? "" : ".",
        u = [];
      for (var d; (d = Xd.exec(n)) !== null; ) {
        let [, m] = d,
          { index: y, input: S } = d;
        y > a && u.push(S.substring(0, y - (m ? 0 : 1)));
      }
      var h = u.map((m) => `o${c}${m}`).join(" && ");
      h.length === 0 ? (h += `o${c}${n} != null`) : (h += ` && o${c}${n} != null`);
      let p = `
      switch (true) {
        ${u.reverse().map(
          (m) => `
          case o${c}${m} === censor:
            secret[${i}].circle = ${JSON.stringify(m)}
            break
        `,
        ).join(`
`)}
      }
    `,
        f = r ? `val, ${JSON.stringify(o)}` : "val";
      return `
      if (${h}) {
        const val = o${c}${n}
        if (val === censor) {
          secret[${i}].precensored = true
        } else {
          secret[${i}].val = val
          o${c}${n} = ${t ? `censor(${f})` : "censor"}
          ${p}
        }
      }
    `;
    }).join(`
`);
  }
  function eh(e, t, r) {
    return e === !0
      ? `
    {
      const { wildcards, wcLen, groupRedact, nestedRedact } = this
      for (var i = 0; i < wcLen; i++) {
        const { before, beforeStr, after, nested } = wildcards[i]
        if (nested === true) {
          secret[beforeStr] = secret[beforeStr] || []
          nestedRedact(secret[beforeStr], o, before, after, censor, ${t}, ${r})
        } else secret[beforeStr] = groupRedact(o, before, censor, ${t}, ${r})
      }
    }
  `
      : "";
  }
  function th(e) {
    return e === !1
      ? "return o"
      : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `;
  }
  function rh(e, t) {
    return e === !0
      ? "throw Error('fast-redact: primitives cannot be redacted')"
      : t === !1
        ? "return o"
        : "return this.serialize(o)";
  }
});
var ai = j((aS, ja) => {
  "use strict";
  ja.exports = { groupRedact: ih, groupRestore: nh, nestedRedact: oh, nestedRestore: sh };
  function nh({ keys: e, values: t, target: r }) {
    if (r == null || typeof r == "string") return;
    let n = e.length;
    for (var i = 0; i < n; i++) {
      let s = e[i];
      r[s] = t[i];
    }
  }
  function ih(e, t, r, n, i) {
    let s = Da(e, t);
    if (s == null || typeof s == "string") return { keys: null, values: null, target: s, flat: !0 };
    let o = Object.keys(s),
      a = o.length,
      c = t.length,
      u = i ? [...t] : void 0,
      d = new Array(a);
    for (var h = 0; h < a; h++) {
      let p = o[h];
      (d[h] = s[p]), i ? ((u[c] = p), (s[p] = r(s[p], u))) : n ? (s[p] = r(s[p])) : (s[p] = r);
    }
    return { keys: o, values: d, target: s, flat: !0 };
  }
  function sh(e) {
    for (let t = 0; t < e.length; t++) {
      let { target: r, path: n, value: i } = e[t],
        s = r;
      for (let o = n.length - 1; o > 0; o--) s = s[n[o]];
      s[n[0]] = i;
    }
  }
  function oh(e, t, r, n, i, s, o) {
    let a = Da(t, r);
    if (a == null) return;
    let c = Object.keys(a),
      u = c.length;
    for (var d = 0; d < u; d++) {
      let h = c[d];
      ah(e, a, h, r, n, i, s, o);
    }
    return e;
  }
  function oi(e, t) {
    return e != null
      ? "hasOwn" in Object
        ? Object.hasOwn(e, t)
        : Object.prototype.hasOwnProperty.call(e, t)
      : !1;
  }
  function ah(e, t, r, n, i, s, o, a) {
    let c = i.length,
      u = c - 1,
      d = r;
    var h = -1,
      p,
      f,
      m,
      y = null,
      S = null,
      E,
      _,
      A = !1,
      P = 0,
      T = 0,
      D = uh();
    if (((m = p = t[r]), typeof p == "object")) {
      for (
        ;
        p != null &&
        ++h < c &&
        ((T += 1), (r = i[h]), (y = m), !(r !== "*" && !S && !(typeof p == "object" && r in p)));

      )
        if (!(r === "*" && (S === "*" && (A = !0), (S = r), h !== u))) {
          if (S) {
            let z = Object.keys(p);
            for (var q = 0; q < z.length; q++) {
              let k = z[q];
              if (((_ = p[k]), (E = r === "*"), A))
                (D = Ke(D, k, T)),
                  (P = h),
                  (m = $a(_, P - 1, r, n, i, s, o, a, d, p, f, m, E, k, h, u, D, e, t[d], T + 1));
              else if (E || (typeof _ == "object" && _ !== null && r in _)) {
                if (
                  (E ? (m = _) : (m = _[r]),
                  (f = h !== u ? m : o ? (a ? s(m, [...n, d, ...i]) : s(m)) : s),
                  E)
                ) {
                  let w = Ht(Ke(D, k, T), m, t[d]);
                  e.push(w), (p[k] = f);
                } else if (_[r] !== f)
                  if ((f === void 0 && s !== void 0) || (oi(_, r) && f === m)) D = Ke(D, k, T);
                  else {
                    D = Ke(D, k, T);
                    let w = Ht(Ke(D, r, T + 1), m, t[d]);
                    e.push(w), (_[r] = f);
                  }
              }
            }
            S = null;
          } else {
            if (
              ((m = p[r]),
              (D = Ke(D, r, T)),
              (f = h !== u ? m : o ? (a ? s(m, [...n, d, ...i]) : s(m)) : s),
              !((oi(p, r) && f === m) || (f === void 0 && s !== void 0)))
            ) {
              let z = Ht(D, m, t[d]);
              e.push(z), (p[r] = f);
            }
            p = p[r];
          }
          if (typeof p != "object") break;
        }
    }
  }
  function Da(e, t) {
    for (var r = -1, n = t.length, i = e; i != null && ++r < n; ) i = i[t[r]];
    return i;
  }
  function $a(e, t, r, n, i, s, o, a, c, u, d, h, p, f, m, y, S, E, _, A) {
    if (t === 0 && (p || (typeof e == "object" && e !== null && r in e))) {
      if (
        (p ? (h = e) : (h = e[r]),
        (d = m !== y ? h : o ? (a ? s(h, [...n, c, ...i]) : s(h)) : s),
        p)
      ) {
        let P = Ht(S, h, _);
        E.push(P), (u[f] = d);
      } else if (e[r] !== d) {
        if (!((d === void 0 && s !== void 0) || (oi(e, r) && d === h))) {
          let P = Ht(Ke(S, r, A + 1), h, _);
          E.push(P), (e[r] = d);
        }
      }
    }
    for (let P in e)
      typeof e[P] == "object" &&
        ((S = Ke(S, P, A)),
        $a(e[P], t - 1, r, n, i, s, o, a, c, u, d, h, p, f, m, y, S, E, _, A + 1));
  }
  function uh() {
    return { parent: null, key: null, children: [], depth: 0 };
  }
  function Ke(e, t, r) {
    if (e.depth === r) return Ke(e.parent, t, r);
    var n = { parent: e, key: t, depth: r, children: [] };
    return e.children.push(n), n;
  }
  function Ht(e, t, r) {
    let n = e,
      i = [];
    do i.push(n.key), (n = n.parent);
    while (n.parent != null);
    return { path: i, value: t, target: r };
  }
});
var Ra = j((uS, za) => {
  "use strict";
  var { groupRestore: lh, nestedRestore: ch } = ai();
  za.exports = fh;
  function fh() {
    return function () {
      if (this.restore) {
        this.restore.state.secret = this.secret;
        return;
      }
      let { secret: t, wcLen: r } = this,
        n = Object.keys(t),
        i = dh(t, n),
        s = r > 0,
        o = s ? { secret: t, groupRestore: lh, nestedRestore: ch } : { secret: t };
      (this.restore = Function("o", hh(i, n, s)).bind(o)), (this.restore.state = o);
    };
  }
  function dh(e, t) {
    return t
      .map((r) => {
        let { circle: n, escPath: i, leadingBracket: s } = e[r],
          a = n ? `o.${n} = secret[${i}].val` : `o${s ? "" : "."}${r} = secret[${i}].val`,
          c = `secret[${i}].val = undefined`;
        return `
      if (secret[${i}].val !== undefined) {
        try { ${a} } catch (e) {}
        ${c}
      }
    `;
      })
      .join("");
  }
  function hh(e, t, r) {
    return `
    const secret = this.secret
    ${
      r === !0
        ? `
    const keys = Object.keys(secret)
    const len = keys.length
    for (var i = len - 1; i >= ${t.length}; i--) {
      const k = keys[i]
      const o = secret[k]
      if (o) {
        if (o.flat === true) this.groupRestore(o)
        else this.nestedRestore(o)
        secret[k] = null
      }
    }
  `
        : ""
    }
    ${e}
    return o
  `;
  }
});
var Ua = j((lS, Fa) => {
  "use strict";
  Fa.exports = mh;
  function mh(e) {
    let {
        secret: t,
        censor: r,
        compileRestore: n,
        serialize: i,
        groupRedact: s,
        nestedRedact: o,
        wildcards: a,
        wcLen: c,
      } = e,
      u = [{ secret: t, censor: r, compileRestore: n }];
    return (
      i !== !1 && u.push({ serialize: i }),
      c > 0 && u.push({ groupRedact: s, nestedRedact: o, wildcards: a, wcLen: c }),
      Object.assign(...u)
    );
  }
});
var Va = j((cS, qa) => {
  "use strict";
  var ka = La(),
    ph = Ca(),
    gh = Ia(),
    yh = Ra(),
    { groupRedact: bh, nestedRedact: wh } = ai(),
    Sh = Ua(),
    _h = Pr(),
    vh = ka(),
    ui = (e) => e;
  ui.restore = ui;
  var Eh = "[REDACTED]";
  li.rx = _h;
  li.validator = ka;
  qa.exports = li;
  function li(e = {}) {
    let t = Array.from(new Set(e.paths || [])),
      r =
        "serialize" in e && (e.serialize === !1 || typeof e.serialize == "function")
          ? e.serialize
          : JSON.stringify,
      n = e.remove;
    if (n === !0 && r !== JSON.stringify)
      throw Error(
        "fast-redact \u2013 remove option may only be set when serializer is JSON.stringify",
      );
    let i = n === !0 ? void 0 : "censor" in e ? e.censor : Eh,
      s = typeof i == "function",
      o = s && i.length > 1;
    if (t.length === 0) return r || ui;
    vh({ paths: t, serialize: r, censor: i });
    let { wildcards: a, wcLen: c, secret: u } = ph({ paths: t, censor: i }),
      d = yh(),
      h = "strict" in e ? e.strict : !0;
    return gh(
      { secret: u, wcLen: c, serialize: r, strict: h, isCensorFct: s, censorFctTakesPath: o },
      Sh({
        secret: u,
        censor: i,
        compileRestore: d,
        serialize: r,
        groupRedact: bh,
        nestedRedact: wh,
        wildcards: a,
        wcLen: c,
      }),
    );
  }
});
var Ot = j((fS, Ma) => {
  "use strict";
  var Oh = Symbol("pino.setLevel"),
    Ah = Symbol("pino.getLevel"),
    Ph = Symbol("pino.levelVal"),
    Th = Symbol("pino.levelComp"),
    Lh = Symbol("pino.useLevelLabels"),
    Nh = Symbol("pino.useOnlyCustomLevels"),
    Bh = Symbol("pino.mixin"),
    Ch = Symbol("pino.lsCache"),
    xh = Symbol("pino.chindings"),
    Ih = Symbol("pino.asJson"),
    Dh = Symbol("pino.write"),
    $h = Symbol("pino.redactFmt"),
    jh = Symbol("pino.time"),
    zh = Symbol("pino.timeSliceIndex"),
    Rh = Symbol("pino.stream"),
    Fh = Symbol("pino.stringify"),
    Uh = Symbol("pino.stringifySafe"),
    kh = Symbol("pino.stringifiers"),
    qh = Symbol("pino.end"),
    Vh = Symbol("pino.formatOpts"),
    Mh = Symbol("pino.messageKey"),
    Kh = Symbol("pino.errorKey"),
    Wh = Symbol("pino.nestedKey"),
    Qh = Symbol("pino.nestedKeyStr"),
    Hh = Symbol("pino.mixinMergeStrategy"),
    Gh = Symbol("pino.msgPrefix"),
    Jh = Symbol("pino.wildcardFirst"),
    Xh = Symbol.for("pino.serializers"),
    Yh = Symbol.for("pino.formatters"),
    Zh = Symbol.for("pino.hooks"),
    em = Symbol.for("pino.metadata");
  Ma.exports = {
    setLevelSym: Oh,
    getLevelSym: Ah,
    levelValSym: Ph,
    levelCompSym: Th,
    useLevelLabelsSym: Lh,
    mixinSym: Bh,
    lsCacheSym: Ch,
    chindingsSym: xh,
    asJsonSym: Ih,
    writeSym: Dh,
    serializersSym: Xh,
    redactFmtSym: $h,
    timeSym: jh,
    timeSliceIndexSym: zh,
    streamSym: Rh,
    stringifySym: Fh,
    stringifySafeSym: Uh,
    stringifiersSym: kh,
    endSym: qh,
    formatOptsSym: Vh,
    messageKeySym: Mh,
    errorKeySym: Kh,
    nestedKeySym: Wh,
    wildcardFirstSym: Jh,
    needsMetadataGsym: em,
    useOnlyCustomLevelsSym: Nh,
    formattersSym: Yh,
    hooksSym: Zh,
    nestedKeyStrSym: Qh,
    mixinMergeStrategySym: Hh,
    msgPrefixSym: Gh,
  };
});
var di = j((dS, Ha) => {
  "use strict";
  var fi = Va(),
    { redactFmtSym: tm, wildcardFirstSym: Tr } = Ot(),
    { rx: ci, validator: rm } = fi,
    Ka = rm({
      ERR_PATHS_MUST_BE_STRINGS: () => "pino \u2013 redacted paths must be strings",
      ERR_INVALID_PATH: (e) => `pino \u2013 redact paths array contains an invalid path (${e})`,
    }),
    Wa = "[Redacted]",
    Qa = !1;
  function nm(e, t) {
    let { paths: r, censor: n } = im(e),
      i = r.reduce((a, c) => {
        ci.lastIndex = 0;
        let u = ci.exec(c),
          d = ci.exec(c),
          h = u[1] !== void 0 ? u[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, "$1") : u[0];
        if ((h === "*" && (h = Tr), d === null)) return (a[h] = null), a;
        if (a[h] === null) return a;
        let { index: p } = d,
          f = `${c.substr(p, c.length - 1)}`;
        return (
          (a[h] = a[h] || []),
          h !== Tr && a[h].length === 0 && a[h].push(...(a[Tr] || [])),
          h === Tr &&
            Object.keys(a).forEach(function (m) {
              a[m] && a[m].push(f);
            }),
          a[h].push(f),
          a
        );
      }, {}),
      s = { [tm]: fi({ paths: r, censor: n, serialize: t, strict: Qa }) },
      o = (...a) => t(typeof n == "function" ? n(...a) : n);
    return [...Object.keys(i), ...Object.getOwnPropertySymbols(i)].reduce((a, c) => {
      if (i[c] === null) a[c] = (u) => o(u, [c]);
      else {
        let u = typeof n == "function" ? (d, h) => n(d, [c, ...h]) : n;
        a[c] = fi({ paths: i[c], censor: u, serialize: t, strict: Qa });
      }
      return a;
    }, s);
  }
  function im(e) {
    if (Array.isArray(e)) return (e = { paths: e, censor: Wa }), Ka(e), e;
    let { paths: t, censor: r = Wa, remove: n } = e;
    if (Array.isArray(t) === !1) throw Error("pino \u2013 redact must contain an array of strings");
    return n === !0 && (r = void 0), Ka({ paths: t, censor: r }), { paths: t, censor: r };
  }
  Ha.exports = nm;
});
var Ja = j((hS, Ga) => {
  "use strict";
  var sm = () => "",
    om = () => `,"time":${Date.now()}`,
    am = () => `,"time":${Math.round(Date.now() / 1e3)}`,
    um = () => `,"time":"${new Date(Date.now()).toISOString()}"`;
  Ga.exports = { nullTime: sm, epochTime: om, unixTime: am, isoTime: um };
});
var Ya = j((mS, Xa) => {
  "use strict";
  function lm(e) {
    try {
      return JSON.stringify(e);
    } catch {
      return '"[Circular]"';
    }
  }
  Xa.exports = cm;
  function cm(e, t, r) {
    var n = (r && r.stringify) || lm,
      i = 1;
    if (typeof e == "object" && e !== null) {
      var s = t.length + i;
      if (s === 1) return e;
      var o = new Array(s);
      o[0] = n(e);
      for (var a = 1; a < s; a++) o[a] = n(t[a]);
      return o.join(" ");
    }
    if (typeof e != "string") return e;
    var c = t.length;
    if (c === 0) return e;
    for (var u = "", d = 1 - i, h = -1, p = (e && e.length) || 0, f = 0; f < p; ) {
      if (e.charCodeAt(f) === 37 && f + 1 < p) {
        switch (((h = h > -1 ? h : 0), e.charCodeAt(f + 1))) {
          case 100:
          case 102:
            if (d >= c || t[d] == null) break;
            h < f && (u += e.slice(h, f)), (u += Number(t[d])), (h = f + 2), f++;
            break;
          case 105:
            if (d >= c || t[d] == null) break;
            h < f && (u += e.slice(h, f)), (u += Math.floor(Number(t[d]))), (h = f + 2), f++;
            break;
          case 79:
          case 111:
          case 106:
            if (d >= c || t[d] === void 0) break;
            h < f && (u += e.slice(h, f));
            var m = typeof t[d];
            if (m === "string") {
              (u += "'" + t[d] + "'"), (h = f + 2), f++;
              break;
            }
            if (m === "function") {
              (u += t[d].name || "<anonymous>"), (h = f + 2), f++;
              break;
            }
            (u += n(t[d])), (h = f + 2), f++;
            break;
          case 115:
            if (d >= c) break;
            h < f && (u += e.slice(h, f)), (u += String(t[d])), (h = f + 2), f++;
            break;
          case 37:
            h < f && (u += e.slice(h, f)), (u += "%"), (h = f + 2), f++, d--;
            break;
        }
        ++d;
      }
      ++f;
    }
    return h === -1 ? e : (h < p && (u += e.slice(h)), u);
  }
});
var mi = j((pS, hi) => {
  "use strict";
  if (typeof SharedArrayBuffer < "u" && typeof Atomics < "u") {
    let t = function (r) {
        if ((r > 0 && r < 1 / 0) === !1)
          throw typeof r != "number" && typeof r != "bigint"
            ? TypeError("sleep: ms must be a number")
            : RangeError(
                "sleep: ms must be a number that is greater than 0 but less than Infinity",
              );
        Atomics.wait(e, 0, 0, Number(r));
      },
      e = new Int32Array(new SharedArrayBuffer(4));
    hi.exports = t;
  } else {
    let e = function (t) {
      if ((t > 0 && t < 1 / 0) === !1)
        throw typeof t != "number" && typeof t != "bigint"
          ? TypeError("sleep: ms must be a number")
          : RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
      let n = Date.now() + Number(t);
      for (; n > Date.now(); );
    };
    hi.exports = e;
  }
});
var ou = j((gS, su) => {
  "use strict";
  var re = require("fs"),
    fm = require("events"),
    dm = require("util").inherits,
    Za = require("path"),
    gi = mi(),
    Lr = 100,
    Nr = Buffer.allocUnsafe(0),
    hm = 16 * 1024,
    eu = "buffer",
    tu = "utf8";
  function ru(e, t) {
    (t._opening = !0), (t._writing = !0), (t._asyncDrainScheduled = !1);
    function r(s, o) {
      if (s) {
        (t._reopening = !1),
          (t._writing = !1),
          (t._opening = !1),
          t.sync
            ? process.nextTick(() => {
                t.listenerCount("error") > 0 && t.emit("error", s);
              })
            : t.emit("error", s);
        return;
      }
      let a = t._reopening;
      (t.fd = o),
        (t.file = e),
        (t._reopening = !1),
        (t._opening = !1),
        (t._writing = !1),
        t.sync ? process.nextTick(() => t.emit("ready")) : t.emit("ready"),
        !t.destroyed &&
          ((!t._writing && t._len > t.minLength) || t._flushPending
            ? t._actualWrite()
            : a && process.nextTick(() => t.emit("drain")));
    }
    let n = t.append ? "a" : "w",
      i = t.mode;
    if (t.sync)
      try {
        t.mkdir && re.mkdirSync(Za.dirname(e), { recursive: !0 });
        let s = re.openSync(e, n, i);
        r(null, s);
      } catch (s) {
        throw (r(s), s);
      }
    else
      t.mkdir
        ? re.mkdir(Za.dirname(e), { recursive: !0 }, (s) => {
            if (s) return r(s);
            re.open(e, n, i, r);
          })
        : re.open(e, n, i, r);
  }
  function Ie(e) {
    if (!(this instanceof Ie)) return new Ie(e);
    let {
      fd: t,
      dest: r,
      minLength: n,
      maxLength: i,
      maxWrite: s,
      sync: o,
      append: a = !0,
      mkdir: c,
      retryEAGAIN: u,
      fsync: d,
      contentMode: h,
      mode: p,
    } = e || {};
    (t = t || r),
      (this._len = 0),
      (this.fd = -1),
      (this._bufs = []),
      (this._lens = []),
      (this._writing = !1),
      (this._ending = !1),
      (this._reopening = !1),
      (this._asyncDrainScheduled = !1),
      (this._flushPending = !1),
      (this._hwm = Math.max(n || 0, 16387)),
      (this.file = null),
      (this.destroyed = !1),
      (this.minLength = n || 0),
      (this.maxLength = i || 0),
      (this.maxWrite = s || hm),
      (this.sync = o || !1),
      (this.writable = !0),
      (this._fsync = d || !1),
      (this.append = a || !1),
      (this.mode = p),
      (this.retryEAGAIN = u || (() => !0)),
      (this.mkdir = c || !1);
    let f, m;
    if (h === eu)
      (this._writingBuf = Nr),
        (this.write = gm),
        (this.flush = bm),
        (this.flushSync = Sm),
        (this._actualWrite = vm),
        (f = () => re.writeSync(this.fd, this._writingBuf)),
        (m = () => re.write(this.fd, this._writingBuf, this.release));
    else if (h === void 0 || h === tu)
      (this._writingBuf = ""),
        (this.write = pm),
        (this.flush = ym),
        (this.flushSync = wm),
        (this._actualWrite = _m),
        (f = () => re.writeSync(this.fd, this._writingBuf, "utf8")),
        (m = () => re.write(this.fd, this._writingBuf, "utf8", this.release));
    else throw new Error(`SonicBoom supports "${tu}" and "${eu}", but passed ${h}`);
    if (typeof t == "number") (this.fd = t), process.nextTick(() => this.emit("ready"));
    else if (typeof t == "string") ru(t, this);
    else throw new Error("SonicBoom supports only file descriptors and files");
    if (this.minLength >= this.maxWrite)
      throw new Error(`minLength should be smaller than maxWrite (${this.maxWrite})`);
    (this.release = (y, S) => {
      if (y) {
        if (
          (y.code === "EAGAIN" || y.code === "EBUSY") &&
          this.retryEAGAIN(y, this._writingBuf.length, this._len - this._writingBuf.length)
        )
          if (this.sync)
            try {
              gi(Lr), this.release(void 0, 0);
            } catch (A) {
              this.release(A);
            }
          else setTimeout(m, Lr);
        else (this._writing = !1), this.emit("error", y);
        return;
      }
      this.emit("write", S);
      let E = pi(this._writingBuf, this._len, S);
      if (((this._len = E.len), (this._writingBuf = E.writingBuf), this._writingBuf.length)) {
        if (!this.sync) {
          m();
          return;
        }
        try {
          do {
            let A = f(),
              P = pi(this._writingBuf, this._len, A);
            (this._len = P.len), (this._writingBuf = P.writingBuf);
          } while (this._writingBuf.length);
        } catch (A) {
          this.release(A);
          return;
        }
      }
      this._fsync && re.fsyncSync(this.fd);
      let _ = this._len;
      this._reopening
        ? ((this._writing = !1), (this._reopening = !1), this.reopen())
        : _ > this.minLength
          ? this._actualWrite()
          : this._ending
            ? _ > 0
              ? this._actualWrite()
              : ((this._writing = !1), Br(this))
            : ((this._writing = !1),
              this.sync
                ? this._asyncDrainScheduled ||
                  ((this._asyncDrainScheduled = !0), process.nextTick(mm, this))
                : this.emit("drain"));
    }),
      this.on("newListener", function (y) {
        y === "drain" && (this._asyncDrainScheduled = !1);
      });
  }
  function pi(e, t, r) {
    return (
      typeof e == "string" &&
        Buffer.byteLength(e) !== r &&
        (r = Buffer.from(e).subarray(0, r).toString().length),
      (t = Math.max(t - r, 0)),
      (e = e.slice(r)),
      { writingBuf: e, len: t }
    );
  }
  function mm(e) {
    e.listenerCount("drain") > 0 && ((e._asyncDrainScheduled = !1), e.emit("drain"));
  }
  dm(Ie, fm);
  function nu(e, t) {
    return e.length === 0 ? Nr : e.length === 1 ? e[0] : Buffer.concat(e, t);
  }
  function pm(e) {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    let t = this._len + e.length,
      r = this._bufs;
    return this.maxLength && t > this.maxLength
      ? (this.emit("drop", e), this._len < this._hwm)
      : (r.length === 0 || r[r.length - 1].length + e.length > this.maxWrite
          ? r.push("" + e)
          : (r[r.length - 1] += e),
        (this._len = t),
        !this._writing && this._len >= this.minLength && this._actualWrite(),
        this._len < this._hwm);
  }
  function gm(e) {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    let t = this._len + e.length,
      r = this._bufs,
      n = this._lens;
    return this.maxLength && t > this.maxLength
      ? (this.emit("drop", e), this._len < this._hwm)
      : (r.length === 0 || n[n.length - 1] + e.length > this.maxWrite
          ? (r.push([e]), n.push(e.length))
          : (r[r.length - 1].push(e), (n[n.length - 1] += e.length)),
        (this._len = t),
        !this._writing && this._len >= this.minLength && this._actualWrite(),
        this._len < this._hwm);
  }
  function iu(e) {
    this._flushPending = !0;
    let t = () => {
        this._fsync
          ? ((this._flushPending = !1), e())
          : re.fsync(this.fd, (n) => {
              (this._flushPending = !1), e(n);
            }),
          this.off("error", r);
      },
      r = (n) => {
        (this._flushPending = !1), e(n), this.off("drain", t);
      };
    this.once("drain", t), this.once("error", r);
  }
  function ym(e) {
    if (e != null && typeof e != "function") throw new Error("flush cb must be a function");
    if (this.destroyed) {
      let t = new Error("SonicBoom destroyed");
      if (e) {
        e(t);
        return;
      }
      throw t;
    }
    if (this.minLength <= 0) {
      e?.();
      return;
    }
    e && iu.call(this, e),
      !this._writing && (this._bufs.length === 0 && this._bufs.push(""), this._actualWrite());
  }
  function bm(e) {
    if (e != null && typeof e != "function") throw new Error("flush cb must be a function");
    if (this.destroyed) {
      let t = new Error("SonicBoom destroyed");
      if (e) {
        e(t);
        return;
      }
      throw t;
    }
    if (this.minLength <= 0) {
      e?.();
      return;
    }
    e && iu.call(this, e),
      !this._writing &&
        (this._bufs.length === 0 && (this._bufs.push([]), this._lens.push(0)), this._actualWrite());
  }
  Ie.prototype.reopen = function (e) {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this._opening) {
      this.once("ready", () => {
        this.reopen(e);
      });
      return;
    }
    if (this._ending) return;
    if (!this.file)
      throw new Error("Unable to reopen a file descriptor, you must pass a file to SonicBoom");
    if ((e && (this.file = e), (this._reopening = !0), this._writing)) return;
    let t = this.fd;
    this.once("ready", () => {
      t !== this.fd &&
        re.close(t, (r) => {
          if (r) return this.emit("error", r);
        });
    }),
      ru(this.file, this);
  };
  Ie.prototype.end = function () {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this._opening) {
      this.once("ready", () => {
        this.end();
      });
      return;
    }
    this._ending ||
      ((this._ending = !0),
      !this._writing && (this._len > 0 && this.fd >= 0 ? this._actualWrite() : Br(this)));
  };
  function wm() {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this.fd < 0) throw new Error("sonic boom is not ready yet");
    !this._writing &&
      this._writingBuf.length > 0 &&
      (this._bufs.unshift(this._writingBuf), (this._writingBuf = ""));
    let e = "";
    for (; this._bufs.length || e; ) {
      e.length <= 0 && (e = this._bufs[0]);
      try {
        let t = re.writeSync(this.fd, e, "utf8"),
          r = pi(e, this._len, t);
        (e = r.writingBuf), (this._len = r.len), e.length <= 0 && this._bufs.shift();
      } catch (t) {
        if (
          (t.code === "EAGAIN" || t.code === "EBUSY") &&
          !this.retryEAGAIN(t, e.length, this._len - e.length)
        )
          throw t;
        gi(Lr);
      }
    }
    try {
      re.fsyncSync(this.fd);
    } catch {}
  }
  function Sm() {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this.fd < 0) throw new Error("sonic boom is not ready yet");
    !this._writing &&
      this._writingBuf.length > 0 &&
      (this._bufs.unshift([this._writingBuf]), (this._writingBuf = Nr));
    let e = Nr;
    for (; this._bufs.length || e.length; ) {
      e.length <= 0 && (e = nu(this._bufs[0], this._lens[0]));
      try {
        let t = re.writeSync(this.fd, e);
        (e = e.subarray(t)),
          (this._len = Math.max(this._len - t, 0)),
          e.length <= 0 && (this._bufs.shift(), this._lens.shift());
      } catch (t) {
        if (
          (t.code === "EAGAIN" || t.code === "EBUSY") &&
          !this.retryEAGAIN(t, e.length, this._len - e.length)
        )
          throw t;
        gi(Lr);
      }
    }
  }
  Ie.prototype.destroy = function () {
    this.destroyed || Br(this);
  };
  function _m() {
    let e = this.release;
    if (
      ((this._writing = !0),
      (this._writingBuf = this._writingBuf || this._bufs.shift() || ""),
      this.sync)
    )
      try {
        let t = re.writeSync(this.fd, this._writingBuf, "utf8");
        e(null, t);
      } catch (t) {
        e(t);
      }
    else re.write(this.fd, this._writingBuf, "utf8", e);
  }
  function vm() {
    let e = this.release;
    if (
      ((this._writing = !0),
      (this._writingBuf = this._writingBuf.length
        ? this._writingBuf
        : nu(this._bufs.shift(), this._lens.shift())),
      this.sync)
    )
      try {
        let t = re.writeSync(this.fd, this._writingBuf);
        e(null, t);
      } catch (t) {
        e(t);
      }
    else re.write(this.fd, this._writingBuf, e);
  }
  function Br(e) {
    if (e.fd === -1) {
      e.once("ready", Br.bind(null, e));
      return;
    }
    (e.destroyed = !0), (e._bufs = []), (e._lens = []), re.fsync(e.fd, t);
    function t() {
      e.fd !== 1 && e.fd !== 2 ? re.close(e.fd, r) : r();
    }
    function r(n) {
      if (n) {
        e.emit("error", n);
        return;
      }
      e._ending && !e._writing && e.emit("finish"), e.emit("close");
    }
  }
  Ie.SonicBoom = Ie;
  Ie.default = Ie;
  su.exports = Ie;
});
var yi = j((yS, fu) => {
  "use strict";
  var De = { exit: [], beforeExit: [] },
    au = { exit: Am, beforeExit: Pm },
    At;
  function Em() {
    At === void 0 && (At = new FinalizationRegistry(Tm));
  }
  function Om(e) {
    De[e].length > 0 || process.on(e, au[e]);
  }
  function uu(e) {
    De[e].length > 0 ||
      (process.removeListener(e, au[e]),
      De.exit.length === 0 && De.beforeExit.length === 0 && (At = void 0));
  }
  function Am() {
    lu("exit");
  }
  function Pm() {
    lu("beforeExit");
  }
  function lu(e) {
    for (let t of De[e]) {
      let r = t.deref(),
        n = t.fn;
      r !== void 0 && n(r, e);
    }
    De[e] = [];
  }
  function Tm(e) {
    for (let t of ["exit", "beforeExit"]) {
      let r = De[t].indexOf(e);
      De[t].splice(r, r + 1), uu(t);
    }
  }
  function cu(e, t, r) {
    if (t === void 0) throw new Error("the object can't be undefined");
    Om(e);
    let n = new WeakRef(t);
    (n.fn = r), Em(), At.register(t, n), De[e].push(n);
  }
  function Lm(e, t) {
    cu("exit", e, t);
  }
  function Nm(e, t) {
    cu("beforeExit", e, t);
  }
  function Bm(e) {
    if (At !== void 0) {
      At.unregister(e);
      for (let t of ["exit", "beforeExit"])
        (De[t] = De[t].filter((r) => {
          let n = r.deref();
          return n && n !== e;
        })),
          uu(t);
    }
  }
  fu.exports = { register: Lm, registerBeforeExit: Nm, unregister: Bm };
});
var du = j((bS, Cm) => {
  Cm.exports = {
    name: "thread-stream",
    version: "3.1.0",
    description: "A streaming way to send data to a Node.js Worker Thread",
    main: "index.js",
    types: "index.d.ts",
    dependencies: { "real-require": "^0.2.0" },
    devDependencies: {
      "@types/node": "^20.1.0",
      "@types/tap": "^15.0.0",
      "@yao-pkg/pkg": "^5.11.5",
      desm: "^1.3.0",
      fastbench: "^1.0.1",
      husky: "^9.0.6",
      "pino-elasticsearch": "^8.0.0",
      "sonic-boom": "^4.0.1",
      standard: "^17.0.0",
      tap: "^16.2.0",
      "ts-node": "^10.8.0",
      typescript: "^5.3.2",
      "why-is-node-running": "^2.2.2",
    },
    scripts: {
      build: "tsc --noEmit",
      test: 'standard && npm run build && npm run transpile && tap "test/**/*.test.*js" && tap --ts test/*.test.*ts',
      "test:ci": "standard && npm run transpile && npm run test:ci:js && npm run test:ci:ts",
      "test:ci:js":
        'tap --no-check-coverage --timeout=120 --coverage-report=lcovonly "test/**/*.test.*js"',
      "test:ci:ts": 'tap --ts --no-check-coverage --coverage-report=lcovonly "test/**/*.test.*ts"',
      "test:yarn": 'npm run transpile && tap "test/**/*.test.js" --no-check-coverage',
      transpile: "sh ./test/ts/transpile.sh",
      prepare: "husky install",
    },
    standard: { ignore: ["test/ts/**/*", "test/syntax-error.mjs"] },
    repository: { type: "git", url: "git+https://github.com/mcollina/thread-stream.git" },
    keywords: ["worker", "thread", "threads", "stream"],
    author: "Matteo Collina <hello@matteocollina.com>",
    license: "MIT",
    bugs: { url: "https://github.com/mcollina/thread-stream/issues" },
    homepage: "https://github.com/mcollina/thread-stream#readme",
  };
});
var mu = j((wS, hu) => {
  "use strict";
  function xm(e, t, r, n, i) {
    let s = Date.now() + n,
      o = Atomics.load(e, t);
    if (o === r) {
      i(null, "ok");
      return;
    }
    let a = o,
      c = (u) => {
        Date.now() > s
          ? i(null, "timed-out")
          : setTimeout(() => {
              (a = o),
                (o = Atomics.load(e, t)),
                o === a
                  ? c(u >= 1e3 ? 1e3 : u * 2)
                  : o === r
                    ? i(null, "ok")
                    : i(null, "not-equal");
            }, u);
      };
    c(1);
  }
  function Im(e, t, r, n, i) {
    let s = Date.now() + n,
      o = Atomics.load(e, t);
    if (o !== r) {
      i(null, "ok");
      return;
    }
    let a = (c) => {
      Date.now() > s
        ? i(null, "timed-out")
        : setTimeout(() => {
            (o = Atomics.load(e, t)), o !== r ? i(null, "ok") : a(c >= 1e3 ? 1e3 : c * 2);
          }, c);
    };
    a(1);
  }
  hu.exports = { wait: xm, waitDiff: Im };
});
var gu = j((SS, pu) => {
  "use strict";
  pu.exports = { WRITE_INDEX: 4, READ_INDEX: 8 };
});
var _u = j((_S, Su) => {
  "use strict";
  var { version: Dm } = du(),
    { EventEmitter: $m } = require("events"),
    { Worker: jm } = require("worker_threads"),
    { join: zm } = require("path"),
    { pathToFileURL: Rm } = require("url"),
    { wait: Fm } = mu(),
    { WRITE_INDEX: Se, READ_INDEX: Ue } = gu(),
    Um = require("buffer"),
    km = require("assert"),
    b = Symbol("kImpl"),
    qm = Um.constants.MAX_STRING_LENGTH,
    Gt = class {
      constructor(t) {
        this._value = t;
      }
      deref() {
        return this._value;
      }
    },
    xr = class {
      register() {}
      unregister() {}
    },
    Vm = process.env.NODE_V8_COVERAGE ? xr : global.FinalizationRegistry || xr,
    Mm = process.env.NODE_V8_COVERAGE ? Gt : global.WeakRef || Gt,
    yu = new Vm((e) => {
      e.exited || e.terminate();
    });
  function Km(e, t) {
    let { filename: r, workerData: n } = t,
      s =
        ("__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {})[
          "thread-stream-worker"
        ] || zm(__dirname, "lib", "worker.js"),
      o = new jm(s, {
        ...t.workerOpts,
        trackUnmanagedFds: !1,
        workerData: {
          filename: r.indexOf("file://") === 0 ? r : Rm(r).href,
          dataBuf: e[b].dataBuf,
          stateBuf: e[b].stateBuf,
          workerData: { $context: { threadStreamVersion: Dm }, ...n },
        },
      });
    return (o.stream = new Gt(e)), o.on("message", Wm), o.on("exit", wu), yu.register(e, o), o;
  }
  function bu(e) {
    km(!e[b].sync), e[b].needDrain && ((e[b].needDrain = !1), e.emit("drain"));
  }
  function Cr(e) {
    let t = Atomics.load(e[b].state, Se),
      r = e[b].data.length - t;
    if (r > 0) {
      if (e[b].buf.length === 0) {
        (e[b].flushing = !1), e[b].ending ? vi(e) : e[b].needDrain && process.nextTick(bu, e);
        return;
      }
      let n = e[b].buf.slice(0, r),
        i = Buffer.byteLength(n);
      i <= r
        ? ((e[b].buf = e[b].buf.slice(r)), Ir(e, n, Cr.bind(null, e)))
        : e.flush(() => {
            if (!e.destroyed) {
              for (
                Atomics.store(e[b].state, Ue, 0), Atomics.store(e[b].state, Se, 0);
                i > e[b].data.length;

              )
                (r = r / 2), (n = e[b].buf.slice(0, r)), (i = Buffer.byteLength(n));
              (e[b].buf = e[b].buf.slice(r)), Ir(e, n, Cr.bind(null, e));
            }
          });
    } else if (r === 0) {
      if (t === 0 && e[b].buf.length === 0) return;
      e.flush(() => {
        Atomics.store(e[b].state, Ue, 0), Atomics.store(e[b].state, Se, 0), Cr(e);
      });
    } else ke(e, new Error("overwritten"));
  }
  function Wm(e) {
    let t = this.stream.deref();
    if (t === void 0) {
      (this.exited = !0), this.terminate();
      return;
    }
    switch (e.code) {
      case "READY":
        (this.stream = new Mm(t)),
          t.flush(() => {
            (t[b].ready = !0), t.emit("ready");
          });
        break;
      case "ERROR":
        ke(t, e.err);
        break;
      case "EVENT":
        Array.isArray(e.args) ? t.emit(e.name, ...e.args) : t.emit(e.name, e.args);
        break;
      case "WARNING":
        process.emitWarning(e.err);
        break;
      default:
        ke(t, new Error("this should not happen: " + e.code));
    }
  }
  function wu(e) {
    let t = this.stream.deref();
    t !== void 0 &&
      (yu.unregister(t),
      (t.worker.exited = !0),
      t.worker.off("exit", wu),
      ke(t, e !== 0 ? new Error("the worker thread exited") : null));
  }
  var wi = class extends $m {
    constructor(t = {}) {
      if ((super(), t.bufferSize < 4))
        throw new Error("bufferSize must at least fit a 4-byte utf-8 char");
      (this[b] = {}),
        (this[b].stateBuf = new SharedArrayBuffer(128)),
        (this[b].state = new Int32Array(this[b].stateBuf)),
        (this[b].dataBuf = new SharedArrayBuffer(t.bufferSize || 4 * 1024 * 1024)),
        (this[b].data = Buffer.from(this[b].dataBuf)),
        (this[b].sync = t.sync || !1),
        (this[b].ending = !1),
        (this[b].ended = !1),
        (this[b].needDrain = !1),
        (this[b].destroyed = !1),
        (this[b].flushing = !1),
        (this[b].ready = !1),
        (this[b].finished = !1),
        (this[b].errored = null),
        (this[b].closed = !1),
        (this[b].buf = ""),
        (this.worker = Km(this, t)),
        this.on("message", (r, n) => {
          this.worker.postMessage(r, n);
        });
    }
    write(t) {
      if (this[b].destroyed) return Si(this, new Error("the worker has exited")), !1;
      if (this[b].ending) return Si(this, new Error("the worker is ending")), !1;
      if (this[b].flushing && this[b].buf.length + t.length >= qm)
        try {
          bi(this), (this[b].flushing = !0);
        } catch (r) {
          return ke(this, r), !1;
        }
      if (((this[b].buf += t), this[b].sync))
        try {
          return bi(this), !0;
        } catch (r) {
          return ke(this, r), !1;
        }
      return (
        this[b].flushing || ((this[b].flushing = !0), setImmediate(Cr, this)),
        (this[b].needDrain =
          this[b].data.length - this[b].buf.length - Atomics.load(this[b].state, Se) <= 0),
        !this[b].needDrain
      );
    }
    end() {
      this[b].destroyed || ((this[b].ending = !0), vi(this));
    }
    flush(t) {
      if (this[b].destroyed) {
        typeof t == "function" && process.nextTick(t, new Error("the worker has exited"));
        return;
      }
      let r = Atomics.load(this[b].state, Se);
      Fm(this[b].state, Ue, r, 1 / 0, (n, i) => {
        if (n) {
          ke(this, n), process.nextTick(t, n);
          return;
        }
        if (i === "not-equal") {
          this.flush(t);
          return;
        }
        process.nextTick(t);
      });
    }
    flushSync() {
      this[b].destroyed || (bi(this), _i(this));
    }
    unref() {
      this.worker.unref();
    }
    ref() {
      this.worker.ref();
    }
    get ready() {
      return this[b].ready;
    }
    get destroyed() {
      return this[b].destroyed;
    }
    get closed() {
      return this[b].closed;
    }
    get writable() {
      return !this[b].destroyed && !this[b].ending;
    }
    get writableEnded() {
      return this[b].ending;
    }
    get writableFinished() {
      return this[b].finished;
    }
    get writableNeedDrain() {
      return this[b].needDrain;
    }
    get writableObjectMode() {
      return !1;
    }
    get writableErrored() {
      return this[b].errored;
    }
  };
  function Si(e, t) {
    setImmediate(() => {
      e.emit("error", t);
    });
  }
  function ke(e, t) {
    e[b].destroyed ||
      ((e[b].destroyed = !0),
      t && ((e[b].errored = t), Si(e, t)),
      e.worker.exited
        ? setImmediate(() => {
            (e[b].closed = !0), e.emit("close");
          })
        : e.worker
            .terminate()
            .catch(() => {})
            .then(() => {
              (e[b].closed = !0), e.emit("close");
            }));
  }
  function Ir(e, t, r) {
    let n = Atomics.load(e[b].state, Se),
      i = Buffer.byteLength(t);
    return (
      e[b].data.write(t, n),
      Atomics.store(e[b].state, Se, n + i),
      Atomics.notify(e[b].state, Se),
      r(),
      !0
    );
  }
  function vi(e) {
    if (!(e[b].ended || !e[b].ending || e[b].flushing)) {
      e[b].ended = !0;
      try {
        e.flushSync();
        let t = Atomics.load(e[b].state, Ue);
        Atomics.store(e[b].state, Se, -1), Atomics.notify(e[b].state, Se);
        let r = 0;
        for (; t !== -1; ) {
          if (
            (Atomics.wait(e[b].state, Ue, t, 1e3), (t = Atomics.load(e[b].state, Ue)), t === -2)
          ) {
            ke(e, new Error("end() failed"));
            return;
          }
          if (++r === 10) {
            ke(e, new Error("end() took too long (10s)"));
            return;
          }
        }
        process.nextTick(() => {
          (e[b].finished = !0), e.emit("finish");
        });
      } catch (t) {
        ke(e, t);
      }
    }
  }
  function bi(e) {
    let t = () => {
      e[b].ending ? vi(e) : e[b].needDrain && process.nextTick(bu, e);
    };
    for (e[b].flushing = !1; e[b].buf.length !== 0; ) {
      let r = Atomics.load(e[b].state, Se),
        n = e[b].data.length - r;
      if (n === 0) {
        _i(e), Atomics.store(e[b].state, Ue, 0), Atomics.store(e[b].state, Se, 0);
        continue;
      } else if (n < 0) throw new Error("overwritten");
      let i = e[b].buf.slice(0, n),
        s = Buffer.byteLength(i);
      if (s <= n) (e[b].buf = e[b].buf.slice(n)), Ir(e, i, t);
      else {
        for (
          _i(e), Atomics.store(e[b].state, Ue, 0), Atomics.store(e[b].state, Se, 0);
          s > e[b].buf.length;

        )
          (n = n / 2), (i = e[b].buf.slice(0, n)), (s = Buffer.byteLength(i));
        (e[b].buf = e[b].buf.slice(n)), Ir(e, i, t);
      }
    }
  }
  function _i(e) {
    if (e[b].flushing) throw new Error("unable to flush while flushing");
    let t = Atomics.load(e[b].state, Se),
      r = 0;
    for (;;) {
      let n = Atomics.load(e[b].state, Ue);
      if (n === -2) throw Error("_flushSync failed");
      if (n !== t) Atomics.wait(e[b].state, Ue, n, 1e3);
      else break;
      if (++r === 10) throw new Error("_flushSync took too long (10s)");
    }
  }
  Su.exports = wi;
});
var Ai = j((vS, vu) => {
  "use strict";
  var { createRequire: Qm } = require("module"),
    Hm = si(),
    { join: Ei, isAbsolute: Gm, sep: Jm } = require("path"),
    Xm = mi(),
    Oi = yi(),
    Ym = _u();
  function Zm(e) {
    Oi.register(e, tp),
      Oi.registerBeforeExit(e, rp),
      e.on("close", function () {
        Oi.unregister(e);
      });
  }
  function ep(e, t, r) {
    let n = new Ym({ filename: e, workerData: t, workerOpts: r });
    n.on("ready", i),
      n.on("close", function () {
        process.removeListener("exit", s);
      }),
      process.on("exit", s);
    function i() {
      process.removeListener("exit", s), n.unref(), r.autoEnd !== !1 && Zm(n);
    }
    function s() {
      n.closed || (n.flushSync(), Xm(100), n.end());
    }
    return n;
  }
  function tp(e) {
    e.ref(),
      e.flushSync(),
      e.end(),
      e.once("close", function () {
        e.unref();
      });
  }
  function rp(e) {
    e.flushSync();
  }
  function np(e) {
    let { pipeline: t, targets: r, levels: n, dedupe: i, worker: s = {}, caller: o = Hm() } = e,
      a = { ...e.options },
      c = typeof o == "string" ? [o] : o,
      u = "__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {},
      d = e.target;
    if (d && r) throw new Error("only one of target or targets can be specified");
    return (
      r
        ? ((d = u["pino-worker"] || Ei(__dirname, "worker.js")),
          (a.targets = r.filter((p) => p.target).map((p) => ({ ...p, target: h(p.target) }))),
          (a.pipelines = r
            .filter((p) => p.pipeline)
            .map((p) => p.pipeline.map((f) => ({ ...f, level: p.level, target: h(f.target) })))))
        : t &&
          ((d = u["pino-worker"] || Ei(__dirname, "worker.js")),
          (a.pipelines = [t.map((p) => ({ ...p, target: h(p.target) }))])),
      n && (a.levels = n),
      i && (a.dedupe = i),
      (a.pinoWillSendConfig = !0),
      ep(h(d), a, s)
    );
    function h(p) {
      if (((p = u[p] || p), Gm(p) || p.indexOf("file://") === 0)) return p;
      if (p === "pino/file") return Ei(__dirname, "..", "file.js");
      let f;
      for (let m of c)
        try {
          let y = m === "node:repl" ? process.cwd() + Jm : m;
          f = Qm(y).resolve(p);
          break;
        } catch {
          continue;
        }
      if (!f) throw new Error(`unable to determine transport target for "${p}"`);
      return f;
    }
  }
  vu.exports = np;
});
var jr = j((ES, Iu) => {
  "use strict";
  var Eu = Ya(),
    { mapHttpRequest: ip, mapHttpResponse: sp } = ii(),
    Ti = ou(),
    Ou = yi(),
    {
      lsCacheSym: op,
      chindingsSym: Tu,
      writeSym: Au,
      serializersSym: Lu,
      formatOptsSym: Pu,
      endSym: ap,
      stringifiersSym: Nu,
      stringifySym: Bu,
      stringifySafeSym: Li,
      wildcardFirstSym: Cu,
      nestedKeySym: up,
      formattersSym: xu,
      messageKeySym: lp,
      errorKeySym: cp,
      nestedKeyStrSym: fp,
      msgPrefixSym: Dr,
    } = Ot(),
    { isMainThread: dp } = require("worker_threads"),
    hp = Ai();
  function Pt() {}
  function mp(e, t) {
    if (!t) return r;
    return function (...i) {
      t.call(this, i, r, e);
    };
    function r(n, ...i) {
      if (typeof n == "object") {
        let s = n;
        n !== null &&
          (n.method && n.headers && n.socket
            ? (n = ip(n))
            : typeof n.setHeader == "function" && (n = sp(n)));
        let o;
        s === null && i.length === 0 ? (o = [null]) : ((s = i.shift()), (o = i)),
          typeof this[Dr] == "string" && s !== void 0 && s !== null && (s = this[Dr] + s),
          this[Au](n, Eu(s, o, this[Pu]), e);
      } else {
        let s = n === void 0 ? i.shift() : n;
        typeof this[Dr] == "string" && s !== void 0 && s !== null && (s = this[Dr] + s),
          this[Au](null, Eu(s, i, this[Pu]), e);
      }
    }
  }
  function Pi(e) {
    let t = "",
      r = 0,
      n = !1,
      i = 255,
      s = e.length;
    if (s > 100) return JSON.stringify(e);
    for (var o = 0; o < s && i >= 32; o++)
      (i = e.charCodeAt(o)),
        (i === 34 || i === 92) && ((t += e.slice(r, o) + "\\"), (r = o), (n = !0));
    return n ? (t += e.slice(r)) : (t = e), i < 32 ? JSON.stringify(e) : '"' + t + '"';
  }
  function pp(e, t, r, n) {
    let i = this[Bu],
      s = this[Li],
      o = this[Nu],
      a = this[ap],
      c = this[Tu],
      u = this[Lu],
      d = this[xu],
      h = this[lp],
      p = this[cp],
      f = this[op][r] + n;
    f = f + c;
    let m;
    d.log && (e = d.log(e));
    let y = o[Cu],
      S = "";
    for (let _ in e)
      if (((m = e[_]), Object.prototype.hasOwnProperty.call(e, _) && m !== void 0)) {
        u[_] ? (m = u[_](m)) : _ === p && u.err && (m = u.err(m));
        let A = o[_] || y;
        switch (typeof m) {
          case "undefined":
          case "function":
            continue;
          case "number":
            Number.isFinite(m) === !1 && (m = null);
          case "boolean":
            A && (m = A(m));
            break;
          case "string":
            m = (A || Pi)(m);
            break;
          default:
            m = (A || i)(m, s);
        }
        if (m === void 0) continue;
        let P = Pi(_);
        S += "," + P + ":" + m;
      }
    let E = "";
    if (t !== void 0) {
      m = u[h] ? u[h](t) : t;
      let _ = o[h] || y;
      switch (typeof m) {
        case "function":
          break;
        case "number":
          Number.isFinite(m) === !1 && (m = null);
        case "boolean":
          _ && (m = _(m)), (E = ',"' + h + '":' + m);
          break;
        case "string":
          (m = (_ || Pi)(m)), (E = ',"' + h + '":' + m);
          break;
        default:
          (m = (_ || i)(m, s)), (E = ',"' + h + '":' + m);
      }
    }
    return this[up] && S ? f + this[fp] + S.slice(1) + "}" + E + a : f + S + E + a;
  }
  function gp(e, t) {
    let r,
      n = e[Tu],
      i = e[Bu],
      s = e[Li],
      o = e[Nu],
      a = o[Cu],
      c = e[Lu],
      u = e[xu].bindings;
    t = u(t);
    for (let d in t)
      if (
        ((r = t[d]),
        (d !== "level" &&
          d !== "serializers" &&
          d !== "formatters" &&
          d !== "customLevels" &&
          t.hasOwnProperty(d) &&
          r !== void 0) === !0)
      ) {
        if (((r = c[d] ? c[d](r) : r), (r = (o[d] || a || i)(r, s)), r === void 0)) continue;
        n += ',"' + d + '":' + r;
      }
    return n;
  }
  function yp(e) {
    return e.write !== e.constructor.prototype.write;
  }
  var bp = process.env.NODE_V8_COVERAGE || process.env.V8_COVERAGE;
  function $r(e) {
    let t = new Ti(e);
    return (
      t.on("error", r),
      !bp &&
        !e.sync &&
        dp &&
        (Ou.register(t, wp),
        t.on("close", function () {
          Ou.unregister(t);
        })),
      t
    );
    function r(n) {
      if (n.code === "EPIPE") {
        (t.write = Pt), (t.end = Pt), (t.flushSync = Pt), (t.destroy = Pt);
        return;
      }
      t.removeListener("error", r), t.emit("error", n);
    }
  }
  function wp(e, t) {
    e.destroyed ||
      (t === "beforeExit"
        ? (e.flush(),
          e.on("drain", function () {
            e.end();
          }))
        : e.flushSync());
  }
  function Sp(e) {
    return function (r, n, i = {}, s) {
      if (typeof i == "string") (s = $r({ dest: i })), (i = {});
      else if (typeof s == "string") {
        if (i && i.transport)
          throw Error("only one of option.transport or stream can be specified");
        s = $r({ dest: s });
      } else if (i instanceof Ti || i.writable || i._writableState) (s = i), (i = {});
      else if (i.transport) {
        if (i.transport instanceof Ti || i.transport.writable || i.transport._writableState)
          throw Error(
            "option.transport do not allow stream, please pass to option directly. e.g. pino(transport)",
          );
        if (
          i.transport.targets &&
          i.transport.targets.length &&
          i.formatters &&
          typeof i.formatters.level == "function"
        )
          throw Error("option.transport.targets do not allow custom level formatters");
        let c;
        i.customLevels &&
          (c = i.useOnlyCustomLevels
            ? i.customLevels
            : Object.assign({}, i.levels, i.customLevels)),
          (s = hp({ caller: n, ...i.transport, levels: c }));
      }
      if (
        ((i = Object.assign({}, e, i)),
        (i.serializers = Object.assign({}, e.serializers, i.serializers)),
        (i.formatters = Object.assign({}, e.formatters, i.formatters)),
        i.prettyPrint)
      )
        throw new Error(
          "prettyPrint option is no longer supported, see the pino-pretty package (https://github.com/pinojs/pino-pretty)",
        );
      let { enabled: o, onChild: a } = i;
      return (
        o === !1 && (i.level = "silent"),
        a || (i.onChild = Pt),
        s || (yp(process.stdout) ? (s = process.stdout) : (s = $r({ fd: process.stdout.fd || 1 }))),
        { opts: i, stream: s }
      );
    };
  }
  function _p(e, t) {
    try {
      return JSON.stringify(e);
    } catch {
      try {
        return (t || this[Li])(e);
      } catch {
        return '"[unable to serialize, circular reference is too complex to analyze]"';
      }
    }
  }
  function vp(e, t, r) {
    return { level: e, bindings: t, log: r };
  }
  function Ep(e) {
    let t = Number(e);
    return typeof e == "string" && Number.isFinite(t) ? t : e === void 0 ? 1 : e;
  }
  Iu.exports = {
    noop: Pt,
    buildSafeSonicBoom: $r,
    asChindings: gp,
    asJson: pp,
    genLog: mp,
    createArgsNormalizer: Sp,
    stringify: _p,
    buildFormatters: vp,
    normalizeDestFileDescriptor: Ep,
  };
});
var zr = j((OS, Du) => {
  var Op = { trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60 },
    Ap = { ASC: "ASC", DESC: "DESC" };
  Du.exports = { DEFAULT_LEVELS: Op, SORTING_ORDER: Ap };
});
var Ci = j((AS, Ru) => {
  "use strict";
  var {
      lsCacheSym: Pp,
      levelValSym: Ni,
      useOnlyCustomLevelsSym: Tp,
      streamSym: Lp,
      formattersSym: Np,
      hooksSym: Bp,
      levelCompSym: $u,
    } = Ot(),
    { noop: Cp, genLog: ct } = jr(),
    { DEFAULT_LEVELS: qe, SORTING_ORDER: ju } = zr(),
    zu = {
      fatal: (e) => {
        let t = ct(qe.fatal, e);
        return function (...r) {
          let n = this[Lp];
          if ((t.call(this, ...r), typeof n.flushSync == "function"))
            try {
              n.flushSync();
            } catch {}
        };
      },
      error: (e) => ct(qe.error, e),
      warn: (e) => ct(qe.warn, e),
      info: (e) => ct(qe.info, e),
      debug: (e) => ct(qe.debug, e),
      trace: (e) => ct(qe.trace, e),
    },
    Bi = Object.keys(qe).reduce((e, t) => ((e[qe[t]] = t), e), {}),
    xp = Object.keys(Bi).reduce((e, t) => ((e[t] = '{"level":' + Number(t)), e), {});
  function Ip(e) {
    let t = e[Np].level,
      { labels: r } = e.levels,
      n = {};
    for (let i in r) {
      let s = t(r[i], Number(i));
      n[i] = JSON.stringify(s).slice(0, -1);
    }
    return (e[Pp] = n), e;
  }
  function Dp(e, t) {
    if (t) return !1;
    switch (e) {
      case "fatal":
      case "error":
      case "warn":
      case "info":
      case "debug":
      case "trace":
        return !0;
      default:
        return !1;
    }
  }
  function $p(e) {
    let { labels: t, values: r } = this.levels;
    if (typeof e == "number") {
      if (t[e] === void 0) throw Error("unknown level value" + e);
      e = t[e];
    }
    if (r[e] === void 0) throw Error("unknown level " + e);
    let n = this[Ni],
      i = (this[Ni] = r[e]),
      s = this[Tp],
      o = this[$u],
      a = this[Bp].logMethod;
    for (let c in r) {
      if (o(r[c], i) === !1) {
        this[c] = Cp;
        continue;
      }
      this[c] = Dp(c, s) ? zu[c](a) : ct(r[c], a);
    }
    this.emit("level-change", e, i, t[n], n, this);
  }
  function jp(e) {
    let { levels: t, levelVal: r } = this;
    return t && t.labels ? t.labels[r] : "";
  }
  function zp(e) {
    let { values: t } = this.levels,
      r = t[e];
    return r !== void 0 && this[$u](r, this[Ni]);
  }
  function Rp(e, t, r) {
    return e === ju.DESC ? t <= r : t >= r;
  }
  function Fp(e) {
    return typeof e == "string" ? Rp.bind(null, e) : e;
  }
  function Up(e = null, t = !1) {
    let r = e ? Object.keys(e).reduce((s, o) => ((s[e[o]] = o), s), {}) : null,
      n = Object.assign(
        Object.create(Object.prototype, { Infinity: { value: "silent" } }),
        t ? null : Bi,
        r,
      ),
      i = Object.assign(
        Object.create(Object.prototype, { silent: { value: 1 / 0 } }),
        t ? null : qe,
        e,
      );
    return { labels: n, values: i };
  }
  function kp(e, t, r) {
    if (typeof e == "number") {
      if (
        ![]
          .concat(
            Object.keys(t || {}).map((s) => t[s]),
            r ? [] : Object.keys(Bi).map((s) => +s),
            1 / 0,
          )
          .includes(e)
      )
        throw Error(`default level:${e} must be included in custom levels`);
      return;
    }
    let n = Object.assign(
      Object.create(Object.prototype, { silent: { value: 1 / 0 } }),
      r ? null : qe,
      t,
    );
    if (!(e in n)) throw Error(`default level:${e} must be included in custom levels`);
  }
  function qp(e, t) {
    let { labels: r, values: n } = e;
    for (let i in t) {
      if (i in n) throw Error("levels cannot be overridden");
      if (t[i] in r) throw Error("pre-existing level values cannot be used for new levels");
    }
  }
  function Vp(e) {
    if (typeof e != "function" && !(typeof e == "string" && Object.values(ju).includes(e)))
      throw new Error('Levels comparison should be one of "ASC", "DESC" or "function" type');
  }
  Ru.exports = {
    initialLsCache: xp,
    genLsCache: Ip,
    levelMethods: zu,
    getLevel: jp,
    setLevel: $p,
    isLevelEnabled: zp,
    mappings: Up,
    assertNoLevelCollisions: qp,
    assertDefaultLevelFound: kp,
    genLevelComparison: Fp,
    assertLevelComparison: Vp,
  };
});
var xi = j((PS, Fu) => {
  "use strict";
  Fu.exports = { version: "9.2.0" };
});
var Ju = j((LS, Gu) => {
  "use strict";
  var { EventEmitter: Mp } = require("events"),
    {
      lsCacheSym: Kp,
      levelValSym: Wp,
      setLevelSym: Di,
      getLevelSym: Uu,
      chindingsSym: $i,
      parsedChindingsSym: Qp,
      mixinSym: Hp,
      asJsonSym: Ku,
      writeSym: Gp,
      mixinMergeStrategySym: Jp,
      timeSym: Xp,
      timeSliceIndexSym: Yp,
      streamSym: Wu,
      serializersSym: ft,
      formattersSym: Ii,
      errorKeySym: Zp,
      messageKeySym: eg,
      useOnlyCustomLevelsSym: tg,
      needsMetadataGsym: rg,
      redactFmtSym: ng,
      stringifySym: ig,
      formatOptsSym: sg,
      stringifiersSym: og,
      msgPrefixSym: ku,
    } = Ot(),
    {
      getLevel: ag,
      setLevel: ug,
      isLevelEnabled: lg,
      mappings: cg,
      initialLsCache: fg,
      genLsCache: dg,
      assertNoLevelCollisions: hg,
    } = Ci(),
    { asChindings: Qu, asJson: mg, buildFormatters: qu, stringify: Vu } = jr(),
    { version: pg } = xi(),
    gg = di(),
    yg = class {},
    Hu = {
      constructor: yg,
      child: bg,
      bindings: wg,
      setBindings: Sg,
      flush: Og,
      isLevelEnabled: lg,
      version: pg,
      get level() {
        return this[Uu]();
      },
      set level(e) {
        this[Di](e);
      },
      get levelVal() {
        return this[Wp];
      },
      set levelVal(e) {
        throw Error("levelVal is read-only");
      },
      [Kp]: fg,
      [Gp]: vg,
      [Ku]: mg,
      [Uu]: ag,
      [Di]: ug,
    };
  Object.setPrototypeOf(Hu, Mp.prototype);
  Gu.exports = function () {
    return Object.create(Hu);
  };
  var Mu = (e) => e;
  function bg(e, t) {
    if (!e) throw Error("missing bindings for child Pino");
    t = t || {};
    let r = this[ft],
      n = this[Ii],
      i = Object.create(this);
    if (t.hasOwnProperty("serializers") === !0) {
      i[ft] = Object.create(null);
      for (let d in r) i[ft][d] = r[d];
      let c = Object.getOwnPropertySymbols(r);
      for (var s = 0; s < c.length; s++) {
        let d = c[s];
        i[ft][d] = r[d];
      }
      for (let d in t.serializers) i[ft][d] = t.serializers[d];
      let u = Object.getOwnPropertySymbols(t.serializers);
      for (var o = 0; o < u.length; o++) {
        let d = u[o];
        i[ft][d] = t.serializers[d];
      }
    } else i[ft] = r;
    if (t.hasOwnProperty("formatters")) {
      let { level: c, bindings: u, log: d } = t.formatters;
      i[Ii] = qu(c || n.level, u || Mu, d || n.log);
    } else i[Ii] = qu(n.level, Mu, n.log);
    if (
      (t.hasOwnProperty("customLevels") === !0 &&
        (hg(this.levels, t.customLevels), (i.levels = cg(t.customLevels, i[tg])), dg(i)),
      (typeof t.redact == "object" && t.redact !== null) || Array.isArray(t.redact))
    ) {
      i.redact = t.redact;
      let c = gg(i.redact, Vu),
        u = { stringify: c[ng] };
      (i[ig] = Vu), (i[og] = c), (i[sg] = u);
    }
    typeof t.msgPrefix == "string" && (i[ku] = (this[ku] || "") + t.msgPrefix), (i[$i] = Qu(i, e));
    let a = t.level || this.level;
    return i[Di](a), this.onChild(i), i;
  }
  function wg() {
    let t = `{${this[$i].substr(1)}}`,
      r = JSON.parse(t);
    return delete r.pid, delete r.hostname, r;
  }
  function Sg(e) {
    let t = Qu(this, e);
    (this[$i] = t), delete this[Qp];
  }
  function _g(e, t) {
    return Object.assign(t, e);
  }
  function vg(e, t, r) {
    let n = this[Xp](),
      i = this[Hp],
      s = this[Zp],
      o = this[eg],
      a = this[Jp] || _g,
      c;
    e == null
      ? (c = {})
      : e instanceof Error
        ? ((c = { [s]: e }), t === void 0 && (t = e.message))
        : ((c = e), t === void 0 && e[o] === void 0 && e[s] && (t = e[s].message)),
      i && (c = a(c, i(c, r, this)));
    let u = this[Ku](c, t, r, n),
      d = this[Wu];
    d[rg] === !0 &&
      ((d.lastLevel = r),
      (d.lastObj = c),
      (d.lastMsg = t),
      (d.lastTime = n.slice(this[Yp])),
      (d.lastLogger = this)),
      d.write(u);
  }
  function Eg() {}
  function Og(e) {
    if (e != null && typeof e != "function") throw Error("callback must be a function");
    let t = this[Wu];
    typeof t.flush == "function" ? t.flush(e || Eg) : e && e();
  }
});
var tl = j((Fi, el) => {
  "use strict";
  var { hasOwnProperty: Rr } = Object.prototype,
    ht = Ri();
  ht.configure = Ri;
  ht.stringify = ht;
  ht.default = ht;
  Fi.stringify = ht;
  Fi.configure = Ri;
  el.exports = ht;
  var Ag =
    /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
  function et(e) {
    return e.length < 5e3 && !Ag.test(e) ? `"${e}"` : JSON.stringify(e);
  }
  function ji(e) {
    if (e.length > 200) return e.sort();
    for (let t = 1; t < e.length; t++) {
      let r = e[t],
        n = t;
      for (; n !== 0 && e[n - 1] > r; ) (e[n] = e[n - 1]), n--;
      e[n] = r;
    }
    return e;
  }
  var Pg = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(Object.getPrototypeOf(new Int8Array())),
    Symbol.toStringTag,
  ).get;
  function zi(e) {
    return Pg.call(e) !== void 0 && e.length !== 0;
  }
  function Xu(e, t, r) {
    e.length < r && (r = e.length);
    let n = t === "," ? "" : " ",
      i = `"0":${n}${e[0]}`;
    for (let s = 1; s < r; s++) i += `${t}"${s}":${n}${e[s]}`;
    return i;
  }
  function Tg(e) {
    if (Rr.call(e, "circularValue")) {
      let t = e.circularValue;
      if (typeof t == "string") return `"${t}"`;
      if (t == null) return t;
      if (t === Error || t === TypeError)
        return {
          toString() {
            throw new TypeError("Converting circular structure to JSON");
          },
        };
      throw new TypeError(
        'The "circularValue" argument must be of type string or the value null or undefined',
      );
    }
    return '"[Circular]"';
  }
  function Yu(e, t) {
    let r;
    if (Rr.call(e, t) && ((r = e[t]), typeof r != "boolean"))
      throw new TypeError(`The "${t}" argument must be of type boolean`);
    return r === void 0 ? !0 : r;
  }
  function Zu(e, t) {
    let r;
    if (Rr.call(e, t)) {
      if (((r = e[t]), typeof r != "number"))
        throw new TypeError(`The "${t}" argument must be of type number`);
      if (!Number.isInteger(r)) throw new TypeError(`The "${t}" argument must be an integer`);
      if (r < 1) throw new RangeError(`The "${t}" argument must be >= 1`);
    }
    return r === void 0 ? 1 / 0 : r;
  }
  function dt(e) {
    return e === 1 ? "1 item" : `${e} items`;
  }
  function Lg(e) {
    let t = new Set();
    for (let r of e) (typeof r == "string" || typeof r == "number") && t.add(String(r));
    return t;
  }
  function Ng(e) {
    if (Rr.call(e, "strict")) {
      let t = e.strict;
      if (typeof t != "boolean")
        throw new TypeError('The "strict" argument must be of type boolean');
      if (t)
        return (r) => {
          let n = `Object can not safely be stringified. Received type ${typeof r}`;
          throw (typeof r != "function" && (n += ` (${r.toString()})`), new Error(n));
        };
    }
  }
  function Ri(e) {
    e = { ...e };
    let t = Ng(e);
    t &&
      (e.bigint === void 0 && (e.bigint = !1), "circularValue" in e || (e.circularValue = Error));
    let r = Tg(e),
      n = Yu(e, "bigint"),
      i = Yu(e, "deterministic"),
      s = Zu(e, "maximumDepth"),
      o = Zu(e, "maximumBreadth");
    function a(p, f, m, y, S, E) {
      let _ = f[p];
      switch (
        (typeof _ == "object" && _ !== null && typeof _.toJSON == "function" && (_ = _.toJSON(p)),
        (_ = y.call(f, p, _)),
        typeof _)
      ) {
        case "string":
          return et(_);
        case "object": {
          if (_ === null) return "null";
          if (m.indexOf(_) !== -1) return r;
          let A = "",
            P = ",",
            T = E;
          if (Array.isArray(_)) {
            if (_.length === 0) return "[]";
            if (s < m.length + 1) return '"[Array]"';
            m.push(_),
              S !== "" &&
                ((E += S),
                (A += `
${E}`),
                (P = `,
${E}`));
            let F = Math.min(_.length, o),
              I = 0;
            for (; I < F - 1; I++) {
              let be = a(String(I), _, m, y, S, E);
              (A += be !== void 0 ? be : "null"), (A += P);
            }
            let V = a(String(I), _, m, y, S, E);
            if (((A += V !== void 0 ? V : "null"), _.length - 1 > o)) {
              let be = _.length - o - 1;
              A += `${P}"... ${dt(be)} not stringified"`;
            }
            return (
              S !== "" &&
                (A += `
${T}`),
              m.pop(),
              `[${A}]`
            );
          }
          let D = Object.keys(_),
            q = D.length;
          if (q === 0) return "{}";
          if (s < m.length + 1) return '"[Object]"';
          let z = "",
            k = "";
          S !== "" &&
            ((E += S),
            (P = `,
${E}`),
            (z = " "));
          let w = Math.min(q, o);
          i && !zi(_) && (D = ji(D)), m.push(_);
          for (let F = 0; F < w; F++) {
            let I = D[F],
              V = a(I, _, m, y, S, E);
            V !== void 0 && ((A += `${k}${et(I)}:${z}${V}`), (k = P));
          }
          if (q > o) {
            let F = q - o;
            (A += `${k}"...":${z}"${dt(F)} not stringified"`), (k = P);
          }
          return (
            S !== "" &&
              k.length > 1 &&
              (A = `
${E}${A}
${T}`),
            m.pop(),
            `{${A}}`
          );
        }
        case "number":
          return isFinite(_) ? String(_) : t ? t(_) : "null";
        case "boolean":
          return _ === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (n) return String(_);
        default:
          return t ? t(_) : void 0;
      }
    }
    function c(p, f, m, y, S, E) {
      switch (
        (typeof f == "object" && f !== null && typeof f.toJSON == "function" && (f = f.toJSON(p)),
        typeof f)
      ) {
        case "string":
          return et(f);
        case "object": {
          if (f === null) return "null";
          if (m.indexOf(f) !== -1) return r;
          let _ = E,
            A = "",
            P = ",";
          if (Array.isArray(f)) {
            if (f.length === 0) return "[]";
            if (s < m.length + 1) return '"[Array]"';
            m.push(f),
              S !== "" &&
                ((E += S),
                (A += `
${E}`),
                (P = `,
${E}`));
            let q = Math.min(f.length, o),
              z = 0;
            for (; z < q - 1; z++) {
              let w = c(String(z), f[z], m, y, S, E);
              (A += w !== void 0 ? w : "null"), (A += P);
            }
            let k = c(String(z), f[z], m, y, S, E);
            if (((A += k !== void 0 ? k : "null"), f.length - 1 > o)) {
              let w = f.length - o - 1;
              A += `${P}"... ${dt(w)} not stringified"`;
            }
            return (
              S !== "" &&
                (A += `
${_}`),
              m.pop(),
              `[${A}]`
            );
          }
          m.push(f);
          let T = "";
          S !== "" &&
            ((E += S),
            (P = `,
${E}`),
            (T = " "));
          let D = "";
          for (let q of y) {
            let z = c(q, f[q], m, y, S, E);
            z !== void 0 && ((A += `${D}${et(q)}:${T}${z}`), (D = P));
          }
          return (
            S !== "" &&
              D.length > 1 &&
              (A = `
${E}${A}
${_}`),
            m.pop(),
            `{${A}}`
          );
        }
        case "number":
          return isFinite(f) ? String(f) : t ? t(f) : "null";
        case "boolean":
          return f === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (n) return String(f);
        default:
          return t ? t(f) : void 0;
      }
    }
    function u(p, f, m, y, S) {
      switch (typeof f) {
        case "string":
          return et(f);
        case "object": {
          if (f === null) return "null";
          if (typeof f.toJSON == "function") {
            if (((f = f.toJSON(p)), typeof f != "object")) return u(p, f, m, y, S);
            if (f === null) return "null";
          }
          if (m.indexOf(f) !== -1) return r;
          let E = S;
          if (Array.isArray(f)) {
            if (f.length === 0) return "[]";
            if (s < m.length + 1) return '"[Array]"';
            m.push(f), (S += y);
            let z = `
${S}`,
              k = `,
${S}`,
              w = Math.min(f.length, o),
              F = 0;
            for (; F < w - 1; F++) {
              let V = u(String(F), f[F], m, y, S);
              (z += V !== void 0 ? V : "null"), (z += k);
            }
            let I = u(String(F), f[F], m, y, S);
            if (((z += I !== void 0 ? I : "null"), f.length - 1 > o)) {
              let V = f.length - o - 1;
              z += `${k}"... ${dt(V)} not stringified"`;
            }
            return (
              (z += `
${E}`),
              m.pop(),
              `[${z}]`
            );
          }
          let _ = Object.keys(f),
            A = _.length;
          if (A === 0) return "{}";
          if (s < m.length + 1) return '"[Object]"';
          S += y;
          let P = `,
${S}`,
            T = "",
            D = "",
            q = Math.min(A, o);
          zi(f) && ((T += Xu(f, P, o)), (_ = _.slice(f.length)), (q -= f.length), (D = P)),
            i && (_ = ji(_)),
            m.push(f);
          for (let z = 0; z < q; z++) {
            let k = _[z],
              w = u(k, f[k], m, y, S);
            w !== void 0 && ((T += `${D}${et(k)}: ${w}`), (D = P));
          }
          if (A > o) {
            let z = A - o;
            (T += `${D}"...": "${dt(z)} not stringified"`), (D = P);
          }
          return (
            D !== "" &&
              (T = `
${S}${T}
${E}`),
            m.pop(),
            `{${T}}`
          );
        }
        case "number":
          return isFinite(f) ? String(f) : t ? t(f) : "null";
        case "boolean":
          return f === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (n) return String(f);
        default:
          return t ? t(f) : void 0;
      }
    }
    function d(p, f, m) {
      switch (typeof f) {
        case "string":
          return et(f);
        case "object": {
          if (f === null) return "null";
          if (typeof f.toJSON == "function") {
            if (((f = f.toJSON(p)), typeof f != "object")) return d(p, f, m);
            if (f === null) return "null";
          }
          if (m.indexOf(f) !== -1) return r;
          let y = "";
          if (Array.isArray(f)) {
            if (f.length === 0) return "[]";
            if (s < m.length + 1) return '"[Array]"';
            m.push(f);
            let P = Math.min(f.length, o),
              T = 0;
            for (; T < P - 1; T++) {
              let q = d(String(T), f[T], m);
              (y += q !== void 0 ? q : "null"), (y += ",");
            }
            let D = d(String(T), f[T], m);
            if (((y += D !== void 0 ? D : "null"), f.length - 1 > o)) {
              let q = f.length - o - 1;
              y += `,"... ${dt(q)} not stringified"`;
            }
            return m.pop(), `[${y}]`;
          }
          let S = Object.keys(f),
            E = S.length;
          if (E === 0) return "{}";
          if (s < m.length + 1) return '"[Object]"';
          let _ = "",
            A = Math.min(E, o);
          zi(f) && ((y += Xu(f, ",", o)), (S = S.slice(f.length)), (A -= f.length), (_ = ",")),
            i && (S = ji(S)),
            m.push(f);
          for (let P = 0; P < A; P++) {
            let T = S[P],
              D = d(T, f[T], m);
            D !== void 0 && ((y += `${_}${et(T)}:${D}`), (_ = ","));
          }
          if (E > o) {
            let P = E - o;
            y += `${_}"...":"${dt(P)} not stringified"`;
          }
          return m.pop(), `{${y}}`;
        }
        case "number":
          return isFinite(f) ? String(f) : t ? t(f) : "null";
        case "boolean":
          return f === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (n) return String(f);
        default:
          return t ? t(f) : void 0;
      }
    }
    function h(p, f, m) {
      if (arguments.length > 1) {
        let y = "";
        if (
          (typeof m == "number"
            ? (y = " ".repeat(Math.min(m, 10)))
            : typeof m == "string" && (y = m.slice(0, 10)),
          f != null)
        ) {
          if (typeof f == "function") return a("", { "": p }, [], f, y, "");
          if (Array.isArray(f)) return c("", p, [], Lg(f), y, "");
        }
        if (y.length !== 0) return u("", p, [], y, "");
      }
      return d("", p, []);
    }
    return h;
  }
});
var il = j((NS, nl) => {
  "use strict";
  var Ui = Symbol.for("pino.metadata"),
    { DEFAULT_LEVELS: rl } = zr(),
    Bg = rl.info;
  function Cg(e, t) {
    let r = 0;
    (e = e || []), (t = t || { dedupe: !1 });
    let n = Object.create(rl);
    (n.silent = 1 / 0),
      t.levels &&
        typeof t.levels == "object" &&
        Object.keys(t.levels).forEach((h) => {
          n[h] = t.levels[h];
        });
    let i = {
      write: s,
      add: c,
      emit: o,
      flushSync: a,
      end: u,
      minLevel: 0,
      streams: [],
      clone: d,
      [Ui]: !0,
      streamLevels: n,
    };
    return Array.isArray(e) ? e.forEach(c, i) : c.call(i, e), (e = null), i;
    function s(h) {
      let p,
        f = this.lastLevel,
        { streams: m } = this,
        y = 0,
        S;
      for (let E = Ig(m.length, t.dedupe); $g(E, m.length, t.dedupe); E = Dg(E, t.dedupe))
        if (((p = m[E]), p.level <= f)) {
          if (y !== 0 && y !== p.level) break;
          if (((S = p.stream), S[Ui])) {
            let { lastTime: _, lastMsg: A, lastObj: P, lastLogger: T } = this;
            (S.lastLevel = f),
              (S.lastTime = _),
              (S.lastMsg = A),
              (S.lastObj = P),
              (S.lastLogger = T);
          }
          S.write(h), t.dedupe && (y = p.level);
        } else if (!t.dedupe) break;
    }
    function o(...h) {
      for (let { stream: p } of this.streams) typeof p.emit == "function" && p.emit(...h);
    }
    function a() {
      for (let { stream: h } of this.streams) typeof h.flushSync == "function" && h.flushSync();
    }
    function c(h) {
      if (!h) return i;
      let p = typeof h.write == "function" || h.stream,
        f = h.write ? h : h.stream;
      if (!p)
        throw Error(
          "stream object needs to implement either StreamEntry or DestinationStream interface",
        );
      let { streams: m, streamLevels: y } = this,
        S;
      typeof h.levelVal == "number"
        ? (S = h.levelVal)
        : typeof h.level == "string"
          ? (S = y[h.level])
          : typeof h.level == "number"
            ? (S = h.level)
            : (S = Bg);
      let E = { stream: f, level: S, levelVal: void 0, id: r++ };
      return m.unshift(E), m.sort(xg), (this.minLevel = m[0].level), i;
    }
    function u() {
      for (let { stream: h } of this.streams)
        typeof h.flushSync == "function" && h.flushSync(), h.end();
    }
    function d(h) {
      let p = new Array(this.streams.length);
      for (let f = 0; f < p.length; f++) p[f] = { level: h, stream: this.streams[f].stream };
      return {
        write: s,
        add: c,
        minLevel: h,
        streams: p,
        clone: d,
        emit: o,
        flushSync: a,
        [Ui]: !0,
      };
    }
  }
  function xg(e, t) {
    return e.level - t.level;
  }
  function Ig(e, t) {
    return t ? e - 1 : 0;
  }
  function Dg(e, t) {
    return t ? e - 1 : e + 1;
  }
  function $g(e, t, r) {
    return r ? e >= 0 : e < t;
  }
  nl.exports = Cg;
});
var yl = j((BS, Le) => {
  function Fr(e) {
    try {
      return require("path").join(
        `${process.cwd()}${require("path").sep}build`.replace(/\\/g, "/"),
        e,
      );
    } catch {
      return new Function("p", "return new URL(p, import.meta.url).pathname")(e);
    }
  }
  globalThis.__bundlerPathsOverrides = {
    ...(globalThis.__bundlerPathsOverrides || {}),
    "thread-stream-worker": Fr("./thread-stream-worker.js"),
    "pino-worker": Fr("./pino-worker.js"),
    "pino/file": Fr("./pino-file.js"),
    "pino-pretty": Fr("./pino-pretty.js"),
  };
  var jg = require("os"),
    dl = ii(),
    zg = si(),
    Rg = di(),
    hl = Ja(),
    Fg = Ju(),
    ml = Ot(),
    { configure: Ug } = tl(),
    {
      assertDefaultLevelFound: kg,
      mappings: pl,
      genLsCache: qg,
      genLevelComparison: Vg,
      assertLevelComparison: Mg,
    } = Ci(),
    { DEFAULT_LEVELS: Kg, SORTING_ORDER: Wg } = zr(),
    {
      createArgsNormalizer: Qg,
      asChindings: Hg,
      buildSafeSonicBoom: sl,
      buildFormatters: Gg,
      stringify: ki,
      normalizeDestFileDescriptor: ol,
      noop: Jg,
    } = jr(),
    { version: Xg } = xi(),
    {
      chindingsSym: al,
      redactFmtSym: Yg,
      serializersSym: ul,
      timeSym: Zg,
      timeSliceIndexSym: ey,
      streamSym: ty,
      stringifySym: ll,
      stringifySafeSym: qi,
      stringifiersSym: cl,
      setLevelSym: ry,
      endSym: ny,
      formatOptsSym: iy,
      messageKeySym: sy,
      errorKeySym: oy,
      nestedKeySym: ay,
      mixinSym: uy,
      levelCompSym: ly,
      useOnlyCustomLevelsSym: cy,
      formattersSym: fl,
      hooksSym: fy,
      nestedKeyStrSym: dy,
      mixinMergeStrategySym: hy,
      msgPrefixSym: my,
    } = ml,
    { epochTime: gl, nullTime: py } = hl,
    { pid: gy } = process,
    yy = jg.hostname(),
    by = dl.err,
    wy = {
      level: "info",
      levelComparison: Wg.ASC,
      levels: Kg,
      messageKey: "msg",
      errorKey: "err",
      nestedKey: null,
      enabled: !0,
      base: { pid: gy, hostname: yy },
      serializers: Object.assign(Object.create(null), { err: by }),
      formatters: Object.assign(Object.create(null), {
        bindings(e) {
          return e;
        },
        level(e, t) {
          return { level: t };
        },
      }),
      hooks: { logMethod: void 0 },
      timestamp: gl,
      name: void 0,
      redact: null,
      customLevels: null,
      useOnlyCustomLevels: !1,
      depthLimit: 5,
      edgeLimit: 100,
    },
    Sy = Qg(wy),
    _y = Object.assign(Object.create(null), dl);
  function Vi(...e) {
    let t = {},
      { opts: r, stream: n } = Sy(t, zg(), ...e),
      {
        redact: i,
        crlf: s,
        serializers: o,
        timestamp: a,
        messageKey: c,
        errorKey: u,
        nestedKey: d,
        base: h,
        name: p,
        level: f,
        customLevels: m,
        levelComparison: y,
        mixin: S,
        mixinMergeStrategy: E,
        useOnlyCustomLevels: _,
        formatters: A,
        hooks: P,
        depthLimit: T,
        edgeLimit: D,
        onChild: q,
        msgPrefix: z,
      } = r,
      k = Ug({ maximumDepth: T, maximumBreadth: D }),
      w = Gg(A.level, A.bindings, A.log),
      F = ki.bind({ [qi]: k }),
      I = i ? Rg(i, F) : {},
      V = i ? { stringify: I[Yg] } : { stringify: F },
      be =
        "}" +
        (s
          ? `\r
`
          : `
`),
      Ae = Hg.bind(null, { [al]: "", [ul]: o, [cl]: I, [ll]: ki, [qi]: k, [fl]: w }),
      _e = "";
    h !== null && (p === void 0 ? (_e = Ae(h)) : (_e = Ae(Object.assign({}, h, { name: p }))));
    let tt = a instanceof Function ? a : a ? gl : py,
      v = tt().indexOf(":") + 1;
    if (_ && !m) throw Error("customLevels is required if useOnlyCustomLevels is set true");
    if (S && typeof S != "function")
      throw Error(`Unknown mixin type "${typeof S}" - expected "function"`);
    if (z && typeof z != "string")
      throw Error(`Unknown msgPrefix type "${typeof z}" - expected "string"`);
    kg(f, m, _);
    let B = pl(m, _);
    typeof n.emit == "function" &&
      n.emit("message", { code: "PINO_CONFIG", config: { levels: B, messageKey: c, errorKey: u } }),
      Mg(y);
    let M = Vg(y);
    return (
      Object.assign(t, {
        levels: B,
        [ly]: M,
        [cy]: _,
        [ty]: n,
        [Zg]: tt,
        [ey]: v,
        [ll]: ki,
        [qi]: k,
        [cl]: I,
        [ny]: be,
        [iy]: V,
        [sy]: c,
        [oy]: u,
        [ay]: d,
        [dy]: d ? `,${JSON.stringify(d)}:{` : "",
        [ul]: o,
        [uy]: S,
        [hy]: E,
        [al]: _e,
        [fl]: w,
        [fy]: P,
        silent: Jg,
        onChild: q,
        [my]: z,
      }),
      Object.setPrototypeOf(t, Fg()),
      qg(t),
      t[ry](f),
      t
    );
  }
  Le.exports = Vi;
  Le.exports.destination = (e = process.stdout.fd) =>
    typeof e == "object"
      ? ((e.dest = ol(e.dest || process.stdout.fd)), sl(e))
      : sl({ dest: ol(e), minLength: 0 });
  Le.exports.transport = Ai();
  Le.exports.multistream = il();
  Le.exports.levels = pl();
  Le.exports.stdSerializers = _y;
  Le.exports.stdTimeFunctions = Object.assign({}, hl);
  Le.exports.symbols = ml;
  Le.exports.version = Xg;
  Le.exports.default = Vi;
  Le.exports.pino = Vi;
});
var Py = {};
yc(Py, { default: () => Ay });
module.exports = bc(Py);
var R = Symbol.for("drizzle:entityKind"),
  Ly = Symbol.for("drizzle:hasOwnEntityKind");
function we(e, t) {
  if (!e || typeof e != "object") return !1;
  if (e instanceof t) return !0;
  if (!Object.prototype.hasOwnProperty.call(t, R))
    throw new Error(
      `Class "${t.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`,
    );
  let r = e.constructor;
  if (r)
    for (; r; ) {
      if (R in r && r[R] === t[R]) return !0;
      r = Object.getPrototypeOf(r);
    }
  return !1;
}
var rt = class {
  constructor(t, r) {
    (this.table = t),
      (this.config = r),
      (this.name = r.name),
      (this.notNull = r.notNull),
      (this.default = r.default),
      (this.defaultFn = r.defaultFn),
      (this.onUpdateFn = r.onUpdateFn),
      (this.hasDefault = r.hasDefault),
      (this.primary = r.primaryKey),
      (this.isUnique = r.isUnique),
      (this.uniqueName = r.uniqueName),
      (this.uniqueType = r.uniqueType),
      (this.dataType = r.dataType),
      (this.columnType = r.columnType);
  }
  static [R] = "Column";
  name;
  primary;
  notNull;
  default;
  defaultFn;
  onUpdateFn;
  hasDefault;
  isUnique;
  uniqueName;
  uniqueType;
  dataType;
  columnType;
  enumValues = void 0;
  config;
  mapFromDriverValue(t) {
    return t;
  }
  mapToDriverValue(t) {
    return t;
  }
};
var Zt = class {
  static [R] = "ColumnBuilder";
  config;
  constructor(t, r, n) {
    this.config = {
      name: t,
      notNull: !1,
      default: void 0,
      hasDefault: !1,
      primaryKey: !1,
      isUnique: !1,
      uniqueName: void 0,
      uniqueType: void 0,
      dataType: r,
      columnType: n,
    };
  }
  $type() {
    return this;
  }
  notNull() {
    return (this.config.notNull = !0), this;
  }
  default(t) {
    return (this.config.default = t), (this.config.hasDefault = !0), this;
  }
  $defaultFn(t) {
    return (this.config.defaultFn = t), (this.config.hasDefault = !0), this;
  }
  $default = this.$defaultFn;
  $onUpdateFn(t) {
    return (this.config.onUpdateFn = t), (this.config.hasDefault = !0), this;
  }
  $onUpdate = this.$onUpdateFn;
  primaryKey() {
    return (this.config.primaryKey = !0), (this.config.notNull = !0), this;
  }
};
var Vr = Symbol.for("drizzle:Name"),
  Mr = Symbol.for("drizzle:Schema"),
  rs = Symbol.for("drizzle:Columns"),
  Kr = Symbol.for("drizzle:OriginalName"),
  Wr = Symbol.for("drizzle:BaseName"),
  ns = Symbol.for("drizzle:IsAlias"),
  is = Symbol.for("drizzle:ExtraConfigBuilder"),
  wc = Symbol.for("drizzle:IsDrizzleTable"),
  Pe = class {
    static [R] = "Table";
    static Symbol = {
      Name: Vr,
      Schema: Mr,
      OriginalName: Kr,
      Columns: rs,
      BaseName: Wr,
      IsAlias: ns,
      ExtraConfigBuilder: is,
    };
    [Vr];
    [Kr];
    [Mr];
    [rs];
    [Wr];
    [ns] = !1;
    [is] = void 0;
    [wc] = !0;
    constructor(t, r, n) {
      (this[Vr] = this[Kr] = t), (this[Mr] = r), (this[Wr] = n);
    }
  };
var ss = Symbol.for("drizzle:PgInlineForeignKeys"),
  nt = class extends Pe {
    static [R] = "PgTable";
    static Symbol = Object.assign({}, Pe.Symbol, { InlineForeignKeys: ss });
    [ss] = [];
    [Pe.Symbol.ExtraConfigBuilder] = void 0;
  };
var er = class {
    static [R] = "PgForeignKeyBuilder";
    reference;
    _onUpdate = "no action";
    _onDelete = "no action";
    constructor(t, r) {
      (this.reference = () => {
        let { name: n, columns: i, foreignColumns: s } = t();
        return { name: n, columns: i, foreignTable: s[0].table, foreignColumns: s };
      }),
        r && ((this._onUpdate = r.onUpdate), (this._onDelete = r.onDelete));
    }
    onUpdate(t) {
      return (this._onUpdate = t === void 0 ? "no action" : t), this;
    }
    onDelete(t) {
      return (this._onDelete = t === void 0 ? "no action" : t), this;
    }
    build(t) {
      return new Qr(t, this);
    }
  },
  Qr = class {
    constructor(t, r) {
      (this.table = t),
        (this.reference = r.reference),
        (this.onUpdate = r._onUpdate),
        (this.onDelete = r._onDelete);
    }
    static [R] = "PgForeignKey";
    reference;
    onUpdate;
    onDelete;
    getName() {
      let { name: t, columns: r, foreignColumns: n } = this.reference(),
        i = r.map((a) => a.name),
        s = n.map((a) => a.name),
        o = [this.table[nt.Symbol.Name], ...i, n[0].table[nt.Symbol.Name], ...s];
      return t ?? `${o.join("_")}_fk`;
    }
  };
function tr(e, ...t) {
  return e(...t);
}
function Jr(e, t) {
  return `${e[nt.Symbol.Name]}_${t.join("_")}_unique`;
}
var Hr = class {
    constructor(t, r) {
      (this.name = r), (this.columns = t);
    }
    static [R] = "PgUniqueConstraintBuilder";
    columns;
    nullsNotDistinctConfig = !1;
    nullsNotDistinct() {
      return (this.nullsNotDistinctConfig = !0), this;
    }
    build(t) {
      return new Gr(t, this.columns, this.nullsNotDistinctConfig, this.name);
    }
  },
  os = class {
    static [R] = "PgUniqueOnConstraintBuilder";
    name;
    constructor(t) {
      this.name = t;
    }
    on(...t) {
      return new Hr(t, this.name);
    }
  },
  Gr = class {
    constructor(t, r, n, i) {
      (this.table = t),
        (this.columns = r),
        (this.name =
          i ??
          Jr(
            this.table,
            this.columns.map((s) => s.name),
          )),
        (this.nullsNotDistinct = n);
    }
    static [R] = "PgUniqueConstraint";
    columns;
    name;
    nullsNotDistinct = !1;
    getName() {
      return this.name;
    }
  };
function as(e, t, r) {
  for (let n = t; n < e.length; n++) {
    let i = e[n];
    if (i === "\\") {
      n++;
      continue;
    }
    if (i === '"') return [e.slice(t, n).replace(/\\/g, ""), n + 1];
    if (!r && (i === "," || i === "}")) return [e.slice(t, n).replace(/\\/g, ""), n];
  }
  return [e.slice(t).replace(/\\/g, ""), e.length];
}
function us(e, t = 0) {
  let r = [],
    n = t,
    i = !1;
  for (; n < e.length; ) {
    let s = e[n];
    if (s === ",") {
      (i || n === t) && r.push(""), (i = !0), n++;
      continue;
    }
    if (((i = !1), s === "\\")) {
      n += 2;
      continue;
    }
    if (s === '"') {
      let [c, u] = as(e, n + 1, !0);
      r.push(c), (n = u);
      continue;
    }
    if (s === "}") return [r, n + 1];
    if (s === "{") {
      let [c, u] = us(e, n + 1);
      r.push(c), (n = u);
      continue;
    }
    let [o, a] = as(e, n, !1);
    r.push(o), (n = a);
  }
  return [r, n];
}
function ls(e) {
  let [t] = us(e, 1);
  return t;
}
function Xr(e) {
  return `{${e.map((t) => (Array.isArray(t) ? Xr(t) : typeof t == "string" ? `"${t.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"` : `${t}`)).join(",")}}`;
}
var Bt = class extends Zt {
    foreignKeyConfigs = [];
    static [R] = "PgColumnBuilder";
    array(t) {
      return new Yr(this.config.name, this, t);
    }
    references(t, r = {}) {
      return this.foreignKeyConfigs.push({ ref: t, actions: r }), this;
    }
    unique(t, r) {
      return (
        (this.config.isUnique = !0),
        (this.config.uniqueName = t),
        (this.config.uniqueType = r?.nulls),
        this
      );
    }
    buildForeignKeys(t, r) {
      return this.foreignKeyConfigs.map(({ ref: n, actions: i }) =>
        tr(
          (s, o) => {
            let a = new er(() => {
              let c = s();
              return { columns: [t], foreignColumns: [c] };
            });
            return (
              o.onUpdate && a.onUpdate(o.onUpdate), o.onDelete && a.onDelete(o.onDelete), a.build(r)
            );
          },
          n,
          i,
        ),
      );
    }
  },
  Ct = class extends rt {
    constructor(t, r) {
      r.uniqueName || (r.uniqueName = Jr(t, [r.name])), super(t, r), (this.table = t);
    }
    static [R] = "PgColumn";
  },
  Yr = class extends Bt {
    static [R] = "PgArrayBuilder";
    constructor(t, r, n) {
      super(t, "array", "PgArray"), (this.config.baseBuilder = r), (this.config.size = n);
    }
    build(t) {
      let r = this.config.baseBuilder.build(t);
      return new Zr(t, this.config, r);
    }
  },
  Zr = class e extends Ct {
    constructor(t, r, n, i) {
      super(t, r), (this.baseColumn = n), (this.range = i), (this.size = r.size);
    }
    size;
    static [R] = "PgArray";
    getSQLType() {
      return `${this.baseColumn.getSQLType()}[${typeof this.size == "number" ? this.size : ""}]`;
    }
    mapFromDriverValue(t) {
      return (
        typeof t == "string" && (t = ls(t)), t.map((r) => this.baseColumn.mapFromDriverValue(r))
      );
    }
    mapToDriverValue(t, r = !1) {
      let n = t.map((i) =>
        i === null
          ? null
          : we(this.baseColumn, e)
            ? this.baseColumn.mapToDriverValue(i, !0)
            : this.baseColumn.mapToDriverValue(i),
      );
      return r ? n : Xr(n);
    }
  };
var cs = Symbol.for("drizzle:isPgEnum");
function ds(e) {
  return !!e && typeof e == "function" && cs in e && e[cs] === !0;
}
var fs = class extends Bt {
    static [R] = "PgEnumColumnBuilder";
    constructor(t, r) {
      super(t, "string", "PgEnumColumn"), (this.config.enum = r);
    }
    build(t) {
      return new en(t, this.config);
    }
  },
  en = class extends Ct {
    static [R] = "PgEnumColumn";
    enum = this.config.enum;
    enumValues = this.config.enum.enumValues;
    constructor(t, r) {
      super(t, r), (this.enum = r.enum);
    }
    getSQLType() {
      return this.enum.enumName;
    }
  };
var gt = class {
    static [R] = "Subquery";
    constructor(t, r, n, i = !1) {
      this._ = { brand: "Subquery", sql: t, selectedFields: r, alias: n, isWith: i };
    }
  },
  hs = class extends gt {
    static [R] = "WithSubquery";
  };
var ms = "0.30.10";
var tn,
  rn,
  ps = {
    startActiveSpan(e, t) {
      return tn
        ? (rn || (rn = tn.trace.getTracer("drizzle-orm", ms)),
          tr(
            (r, n) =>
              n.startActiveSpan(e, (i) => {
                try {
                  return t(i);
                } catch (s) {
                  throw (
                    (i.setStatus({
                      code: r.SpanStatusCode.ERROR,
                      message: s instanceof Error ? s.message : "Unknown error",
                    }),
                    s)
                  );
                } finally {
                  i.end();
                }
              }),
            tn,
            rn,
          ))
        : t();
    },
  };
var xt = Symbol.for("drizzle:ViewBaseConfig");
var gs = class {
  static [R] = "FakePrimitiveParam";
};
function Sc(e) {
  return e != null && typeof e.getSQL == "function";
}
function _c(e) {
  let t = { sql: "", params: [] };
  for (let r of e)
    (t.sql += r.sql),
      t.params.push(...r.params),
      r.typings?.length && (t.typings || (t.typings = []), t.typings.push(...r.typings));
  return t;
}
var ve = class {
    static [R] = "StringChunk";
    value;
    constructor(t) {
      this.value = Array.isArray(t) ? t : [t];
    }
    getSQL() {
      return new ue([this]);
    }
  },
  ue = class e {
    constructor(t) {
      this.queryChunks = t;
    }
    static [R] = "SQL";
    decoder = ys;
    shouldInlineParams = !1;
    append(t) {
      return this.queryChunks.push(...t.queryChunks), this;
    }
    toQuery(t) {
      return ps.startActiveSpan("drizzle.buildSQL", (r) => {
        let n = this.buildQueryFromSourceParams(this.queryChunks, t);
        return (
          r?.setAttributes({
            "drizzle.query.text": n.sql,
            "drizzle.query.params": JSON.stringify(n.params),
          }),
          n
        );
      });
    }
    buildQueryFromSourceParams(t, r) {
      let n = Object.assign({}, r, {
          inlineParams: r.inlineParams || this.shouldInlineParams,
          paramStartIndex: r.paramStartIndex || { value: 0 },
        }),
        {
          escapeName: i,
          escapeParam: s,
          prepareTyping: o,
          inlineParams: a,
          paramStartIndex: c,
        } = n;
      return _c(
        t.map((u) => {
          if (we(u, ve)) return { sql: u.value.join(""), params: [] };
          if (we(u, It)) return { sql: i(u.value), params: [] };
          if (u === void 0) return { sql: "", params: [] };
          if (Array.isArray(u)) {
            let d = [new ve("(")];
            for (let [h, p] of u.entries()) d.push(p), h < u.length - 1 && d.push(new ve(", "));
            return d.push(new ve(")")), this.buildQueryFromSourceParams(d, n);
          }
          if (we(u, e))
            return this.buildQueryFromSourceParams(u.queryChunks, {
              ...n,
              inlineParams: a || u.shouldInlineParams,
            });
          if (we(u, Pe)) {
            let d = u[Pe.Symbol.Schema],
              h = u[Pe.Symbol.Name];
            return { sql: d === void 0 ? i(h) : i(d) + "." + i(h), params: [] };
          }
          if (we(u, rt)) return { sql: i(u.table[Pe.Symbol.Name]) + "." + i(u.name), params: [] };
          if (we(u, nn)) {
            let d = u[xt].schema,
              h = u[xt].name;
            return { sql: d === void 0 ? i(h) : i(d) + "." + i(h), params: [] };
          }
          if (we(u, rr)) {
            let d = u.value === null ? null : u.encoder.mapToDriverValue(u.value);
            if (we(d, e)) return this.buildQueryFromSourceParams([d], n);
            if (a) return { sql: this.mapInlineParam(d, n), params: [] };
            let h;
            return (
              o !== void 0 && (h = [o(u.encoder)]),
              { sql: s(c.value++, d), params: [d], typings: h }
            );
          }
          return we(u, ir)
            ? { sql: s(c.value++, u), params: [u] }
            : we(u, e.Aliased) && u.fieldAlias !== void 0
              ? { sql: i(u.fieldAlias), params: [] }
              : we(u, gt)
                ? u._.isWith
                  ? { sql: i(u._.alias), params: [] }
                  : this.buildQueryFromSourceParams(
                      [new ve("("), u._.sql, new ve(") "), new It(u._.alias)],
                      n,
                    )
                : ds(u)
                  ? u.schema
                    ? { sql: i(u.schema) + "." + i(u.enumName), params: [] }
                    : { sql: i(u.enumName), params: [] }
                  : Sc(u)
                    ? this.buildQueryFromSourceParams([new ve("("), u.getSQL(), new ve(")")], n)
                    : a
                      ? { sql: this.mapInlineParam(u, n), params: [] }
                      : { sql: s(c.value++, u), params: [u] };
        }),
      );
    }
    mapInlineParam(t, { escapeString: r }) {
      if (t === null) return "null";
      if (typeof t == "number" || typeof t == "boolean") return t.toString();
      if (typeof t == "string") return r(t);
      if (typeof t == "object") {
        let n = t.toString();
        return r(n === "[object Object]" ? JSON.stringify(t) : n);
      }
      throw new Error("Unexpected param value: " + t);
    }
    getSQL() {
      return this;
    }
    as(t) {
      return t === void 0 ? this : new e.Aliased(this, t);
    }
    mapWith(t) {
      return (this.decoder = typeof t == "function" ? { mapFromDriverValue: t } : t), this;
    }
    inlineParams() {
      return (this.shouldInlineParams = !0), this;
    }
    if(t) {
      return t ? this : void 0;
    }
  },
  It = class {
    constructor(t) {
      this.value = t;
    }
    static [R] = "Name";
    brand;
    getSQL() {
      return new ue([this]);
    }
  };
var ys = { mapFromDriverValue: (e) => e },
  bs = { mapToDriverValue: (e) => e },
  bb = { ...ys, ...bs },
  rr = class {
    constructor(t, r = bs) {
      (this.value = t), (this.encoder = r);
    }
    static [R] = "Param";
    brand;
    getSQL() {
      return new ue([this]);
    }
  };
function nr(e, ...t) {
  let r = [];
  (t.length > 0 || (e.length > 0 && e[0] !== "")) && r.push(new ve(e[0]));
  for (let [n, i] of t.entries()) r.push(i, new ve(e[n + 1]));
  return new ue(r);
}
((e) => {
  function t() {
    return new ue([]);
  }
  e.empty = t;
  function r(c) {
    return new ue(c);
  }
  e.fromList = r;
  function n(c) {
    return new ue([new ve(c)]);
  }
  e.raw = n;
  function i(c, u) {
    let d = [];
    for (let [h, p] of c.entries()) h > 0 && u !== void 0 && d.push(u), d.push(p);
    return new ue(d);
  }
  e.join = i;
  function s(c) {
    return new It(c);
  }
  e.identifier = s;
  function o(c) {
    return new ir(c);
  }
  e.placeholder = o;
  function a(c, u) {
    return new rr(c, u);
  }
  e.param = a;
})(nr || (nr = {}));
((e) => {
  class t {
    constructor(n, i) {
      (this.sql = n), (this.fieldAlias = i);
    }
    static [R] = "SQL.Aliased";
    isSelectionField = !1;
    getSQL() {
      return this.sql;
    }
    clone() {
      return new t(this.sql, this.fieldAlias);
    }
  }
  e.Aliased = t;
})(ue || (ue = {}));
var ir = class {
  constructor(t) {
    this.name = t;
  }
  static [R] = "Placeholder";
  getSQL() {
    return new ue([this]);
  }
};
var nn = class {
  static [R] = "View";
  [xt];
  constructor({ name: t, schema: r, selectedFields: n, query: i }) {
    this[xt] = {
      name: t,
      originalName: t,
      schema: r,
      selectedFields: n,
      query: i,
      isExisting: !i,
      isAlias: !1,
    };
  }
  getSQL() {
    return new ue([this]);
  }
};
rt.prototype.getSQL = function () {
  return new ue([this]);
};
Pe.prototype.getSQL = function () {
  return new ue([this]);
};
gt.prototype.getSQL = function () {
  return new ue([this]);
};
function ws(e) {
  return nr`${e} asc`;
}
var wl = ze(Tn());
var sa = ze(require("os"), 1),
  oa = ze(require("fs"), 1);
var dr = new Map(),
  Ln = new Map(),
  Nn = Symbol("OriginError"),
  St = {},
  Ee = class extends Promise {
    constructor(t, r, n, i, s = {}) {
      let o, a;
      super((c, u) => {
        (o = c), (a = u);
      }),
        (this.tagged = Array.isArray(t.raw)),
        (this.strings = t),
        (this.args = r),
        (this.handler = n),
        (this.canceller = i),
        (this.options = s),
        (this.state = null),
        (this.statement = null),
        (this.resolve = (c) => ((this.active = !1), o(c))),
        (this.reject = (c) => ((this.active = !1), a(c))),
        (this.active = !1),
        (this.cancelled = null),
        (this.executed = !1),
        (this.signature = ""),
        (this[Nn] = this.handler.debug ? new Error() : this.tagged && id(this.strings));
    }
    get origin() {
      return (
        (this.handler.debug
          ? this[Nn].stack
          : this.tagged && Ln.has(this.strings)
            ? Ln.get(this.strings)
            : Ln.set(this.strings, this[Nn].stack).get(this.strings)) || ""
      );
    }
    static get [Symbol.species]() {
      return Promise;
    }
    cancel() {
      return this.canceller && (this.canceller(this), (this.canceller = null));
    }
    simple() {
      return (this.options.simple = !0), (this.options.prepare = !1), this;
    }
    async readable() {
      return this.simple(), (this.streaming = !0), this;
    }
    async writable() {
      return this.simple(), (this.streaming = !0), this;
    }
    cursor(t = 1, r) {
      if (
        ((this.options.simple = !1),
        typeof t == "function" && ((r = t), (t = 1)),
        (this.cursorRows = t),
        typeof r == "function")
      )
        return (this.cursorFn = r), this;
      let n;
      return {
        [Symbol.asyncIterator]: () => ({
          next: () => {
            if (this.executed && !this.active) return { done: !0 };
            n && n();
            let i = new Promise((s, o) => {
              (this.cursorFn = (a) => (s({ value: a, done: !1 }), new Promise((c) => (n = c)))),
                (this.resolve = () => ((this.active = !1), s({ done: !0 }))),
                (this.reject = (a) => ((this.active = !1), o(a)));
            });
            return this.execute(), i;
          },
          return() {
            return n && n(St), { done: !0 };
          },
        }),
      };
    }
    describe() {
      return (this.options.simple = !1), (this.onlyDescribe = this.options.prepare = !0), this;
    }
    stream() {
      throw new Error(".stream has been renamed to .forEach");
    }
    forEach(t) {
      return (this.forEachFn = t), this.handle(), this;
    }
    raw() {
      return (this.isRaw = !0), this;
    }
    values() {
      return (this.isRaw = "values"), this;
    }
    async handle() {
      !this.executed && (this.executed = !0) && (await 1) && this.handler(this);
    }
    execute() {
      return this.handle(), this;
    }
    then() {
      return this.handle(), super.then.apply(this, arguments);
    }
    catch() {
      return this.handle(), super.catch.apply(this, arguments);
    }
    finally() {
      return this.handle(), super.finally.apply(this, arguments);
    }
  };
function id(e) {
  if (dr.has(e)) return dr.get(e);
  let t = Error.stackTraceLimit;
  return (
    (Error.stackTraceLimit = 4), dr.set(e, new Error()), (Error.stackTraceLimit = t), dr.get(e)
  );
}
var ot = class extends Error {
    constructor(t) {
      super(t.message), (this.name = this.constructor.name), Object.assign(this, t);
    }
  },
  ie = { connection: ko, postgres: qo, generic: Vo, notSupported: Mo };
function ko(e, t, r) {
  let { host: n, port: i } = r || t,
    s = Object.assign(
      new Error("write " + e + " " + (t.path || n + ":" + i)),
      { code: e, errno: e, address: t.path || n },
      t.path ? {} : { port: i },
    );
  return Error.captureStackTrace(s, ko), s;
}
function qo(e) {
  let t = new ot(e);
  return Error.captureStackTrace(t, qo), t;
}
function Vo(e, t) {
  let r = Object.assign(new Error(e + ": " + t), { code: e });
  return Error.captureStackTrace(r, Vo), r;
}
function Mo(e) {
  let t = Object.assign(new Error(e + " (B) is not supported"), {
    code: "MESSAGE_NOT_SUPPORTED",
    name: e,
  });
  return Error.captureStackTrace(t, Mo), t;
}
var sd = {
    string: { to: 25, from: null, serialize: (e) => "" + e },
    number: { to: 0, from: [21, 23, 26, 700, 701], serialize: (e) => "" + e, parse: (e) => +e },
    json: {
      to: 114,
      from: [114, 3802],
      serialize: (e) => JSON.stringify(e),
      parse: (e) => JSON.parse(e),
    },
    boolean: {
      to: 16,
      from: 16,
      serialize: (e) => (e === !0 ? "t" : "f"),
      parse: (e) => e === "t",
    },
    date: {
      to: 1184,
      from: [1082, 1114, 1184],
      serialize: (e) => (e instanceof Date ? e : new Date(e)).toISOString(),
      parse: (e) => new Date(e),
    },
    bytea: {
      to: 17,
      from: 17,
      serialize: (e) => "\\x" + Buffer.from(e).toString("hex"),
      parse: (e) => Buffer.from(e.slice(2), "hex"),
    },
  },
  qt = class {
    then() {
      Bn();
    }
    catch() {
      Bn();
    }
    finally() {
      Bn();
    }
  },
  _t = class extends qt {
    constructor(t) {
      super(), (this.value = gr(t));
    }
  },
  xe = class extends qt {
    constructor(t, r, n) {
      super(), (this.value = t), (this.type = r), (this.array = n);
    }
  },
  Vt = class extends qt {
    constructor(t, r) {
      super(), (this.first = t), (this.rest = r);
    }
    build(t, r, n, i) {
      let s = od
        .map(([o, a]) => ({ fn: a, i: t.search(o) }))
        .sort((o, a) => o.i - a.i)
        .pop();
      return s.i === -1 ? $n(this.first, i) : s.fn(this.first, this.rest, r, n, i);
    }
  };
function pr(e, t, r, n) {
  let i = e instanceof xe ? e.value : e;
  if (
    i === void 0 &&
    (e instanceof xe ? (e.value = n.transform.undefined) : (i = e = n.transform.undefined),
    i === void 0)
  )
    throw ie.generic("UNDEFINED_VALUE", "Undefined values are not allowed");
  return (
    "$" +
    r.push(
      e instanceof xe
        ? (t.push(e.value),
          e.array ? e.array[e.type || mr(e.value)] || e.type || Ho(e.value) : e.type)
        : (t.push(e), mr(e)),
    )
  );
}
var Wo = Jo(sd);
function In(e, t, r, n, i, s) {
  for (let o = 1; o < e.strings.length; o++)
    (t += Dn(t, r, n, i, s) + e.strings[o]), (r = e.args[o]);
  return t;
}
function Dn(e, t, r, n, i) {
  return t instanceof Vt
    ? t.build(e, r, n, i)
    : t instanceof Ee
      ? xn(t, r, n, i)
      : t instanceof _t
        ? t.value
        : t && t[0] instanceof Ee
          ? t.reduce((s, o) => s + " " + xn(o, r, n, i), "")
          : pr(t, r, n, i);
}
function xn(e, t, r, n) {
  return (e.fragment = !0), In(e, e.strings[0], e.args[0], t, r, n);
}
function Qo(e, t, r, n, i) {
  return e.map((s) => "(" + n.map((o) => Dn("values", s[o], t, r, i)).join(",") + ")").join(",");
}
function Ko(e, t, r, n, i) {
  let s = Array.isArray(e[0]),
    o = t.length ? t.flat() : Object.keys(s ? e[0] : e);
  return Qo(s ? e : [e], r, n, o, i);
}
function hr(e, t, r, n, i) {
  if ((typeof e == "string" && (e = [e].concat(t)), Array.isArray(e))) return $n(e, i);
  let s;
  return (t.length ? t.flat() : Object.keys(e))
    .map(
      (a) => (
        (s = e[a]),
        (s instanceof Ee ? xn(s, r, n, i) : s instanceof _t ? s.value : pr(s, r, n, i)) +
          " as " +
          gr(i.transform.column.to ? i.transform.column.to(a) : a)
      ),
    )
    .join(",");
}
var od = Object.entries({
  values: Ko,
  in: (...e) => {
    let t = Ko(...e);
    return t === "()" ? "(null)" : t;
  },
  select: hr,
  as: hr,
  returning: hr,
  "\\(": hr,
  update(e, t, r, n, i) {
    return (t.length ? t.flat() : Object.keys(e)).map(
      (s) =>
        gr(i.transform.column.to ? i.transform.column.to(s) : s) +
        "=" +
        Dn("values", e[s], r, n, i),
    );
  },
  insert(e, t, r, n, i) {
    let s = t.length ? t.flat() : Object.keys(Array.isArray(e) ? e[0] : e);
    return "(" + $n(s, i) + ")values" + Qo(Array.isArray(e) ? e : [e], r, n, s, i);
  },
}).map(([e, t]) => [new RegExp("((?:^|[\\s(])" + e + "(?:$|[\\s(]))(?![\\s\\S]*\\1)", "i"), t]);
function Bn() {
  throw ie.generic("NOT_TAGGED_CALL", "Query not called as a tagged template literal");
}
var ad = Wo.serializers,
  ud = Wo.parsers;
function Ho(e) {
  return Array.isArray(e) ? Ho(e[0]) : typeof e == "string" ? 1009 : 0;
}
var Go = function (e) {
  let t = Jo(e || {});
  return {
    serializers: Object.assign({}, ad, t.serializers),
    parsers: Object.assign({}, ud, t.parsers),
  };
};
function Jo(e) {
  return Object.keys(e).reduce(
    (t, r) => (
      e[r].from && [].concat(e[r].from).forEach((n) => (t.parsers[n] = e[r].parse)),
      e[r].serialize &&
        ((t.serializers[e[r].to] = e[r].serialize),
        e[r].from && [].concat(e[r].from).forEach((n) => (t.serializers[n] = e[r].serialize))),
      t
    ),
    { parsers: {}, serializers: {} },
  );
}
function $n(e, { transform: { column: t } }) {
  return e.map((r) => gr(t.to ? t.to(r) : r)).join(",");
}
var gr = function (t) {
    return '"' + t.replace(/"/g, '""').replace(/\./g, '"."') + '"';
  },
  mr = function e(t) {
    return t instanceof xe
      ? t.type
      : t instanceof Date
        ? 1184
        : t instanceof Uint8Array
          ? 17
          : t === !0 || t === !1
            ? 16
            : typeof t == "bigint"
              ? 20
              : Array.isArray(t)
                ? e(t[0])
                : 0;
  },
  ld = /\\/g,
  cd = /"/g;
function fd(e) {
  return e.replace(ld, "\\\\").replace(cd, '\\"');
}
var Xo = function e(t, r, n, i) {
    if (Array.isArray(t) === !1) return t;
    if (!t.length) return "{}";
    let s = t[0],
      o = i === 1020 ? ";" : ",";
    return Array.isArray(s) && !s.type
      ? "{" + t.map((a) => e(a, r, n, i)).join(o) + "}"
      : "{" +
          t
            .map((a) => {
              if (a === void 0 && ((a = n.transform.undefined), a === void 0))
                throw ie.generic("UNDEFINED_VALUE", "Undefined values are not allowed");
              return a === null ? "null" : '"' + fd(r ? r(a.type ? a.value : a) : "" + a) + '"';
            })
            .join(o) +
          "}";
  },
  Cn = { i: 0, char: null, str: "", quoted: !1, last: 0 },
  Yo = function (t, r, n) {
    return (Cn.i = Cn.last = 0), Zo(Cn, t, r, n);
  };
function Zo(e, t, r, n) {
  let i = [],
    s = n === 1020 ? ";" : ",";
  for (; e.i < t.length; e.i++) {
    if (((e.char = t[e.i]), e.quoted))
      e.char === "\\"
        ? (e.str += t[++e.i])
        : e.char === '"'
          ? (i.push(r ? r(e.str) : e.str),
            (e.str = ""),
            (e.quoted = t[e.i + 1] === '"'),
            (e.last = e.i + 2))
          : (e.str += e.char);
    else if (e.char === '"') e.quoted = !0;
    else if (e.char === "{") (e.last = ++e.i), i.push(Zo(e, t, r, n));
    else if (e.char === "}") {
      (e.quoted = !1),
        e.last < e.i && i.push(r ? r(t.slice(e.last, e.i)) : t.slice(e.last, e.i)),
        (e.last = e.i + 1);
      break;
    } else
      e.char === s &&
        e.p !== "}" &&
        e.p !== '"' &&
        (i.push(r ? r(t.slice(e.last, e.i)) : t.slice(e.last, e.i)), (e.last = e.i + 1));
    e.p = e.char;
  }
  return e.last < e.i && i.push(r ? r(t.slice(e.last, e.i + 1)) : t.slice(e.last, e.i + 1)), i;
}
var at = (e) => {
    let t = e[0];
    for (let r = 1; r < e.length; r++) t += e[r] === "_" ? e[++r].toUpperCase() : e[r];
    return t;
  },
  ut = (e) => {
    let t = e[0].toUpperCase();
    for (let r = 1; r < e.length; r++) t += e[r] === "_" ? e[++r].toUpperCase() : e[r];
    return t;
  },
  lt = (e) => e.replace(/_/g, "-"),
  Mt = (e) => e.replace(/([A-Z])/g, "_$1").toLowerCase(),
  Kt = (e) => (e.slice(0, 1) + e.slice(1).replace(/([A-Z])/g, "_$1")).toLowerCase(),
  Wt = (e) => e.replace(/-/g, "_");
function jn(e) {
  return function t(r, n) {
    return typeof r == "object" && r !== null && (n.type === 114 || n.type === 3802)
      ? Array.isArray(r)
        ? r.map((i) => t(i, n))
        : Object.entries(r).reduce((i, [s, o]) => Object.assign(i, { [e(s)]: t(o, n) }), {})
      : r;
  };
}
at.column = { from: at };
at.value = { from: jn(at) };
Mt.column = { to: Mt };
var zn = { ...at };
zn.column.to = Mt;
ut.column = { from: ut };
ut.value = { from: jn(ut) };
Kt.column = { to: Kt };
var Rn = { ...ut };
Rn.column.to = Kt;
lt.column = { from: lt };
lt.value = { from: jn(lt) };
Wt.column = { to: Wt };
var Fn = { ...lt };
Fn.column.to = Wt;
var qn = ze(require("net"), 1),
  ra = ze(require("tls"), 1),
  Et = ze(require("crypto"), 1),
  wr = ze(require("stream"), 1),
  Vn = require("perf_hooks");
var Ye = class extends Array {
  constructor() {
    super(),
      Object.defineProperties(this, {
        count: { value: null, writable: !0 },
        state: { value: null, writable: !0 },
        command: { value: null, writable: !0 },
        columns: { value: null, writable: !0 },
        statement: { value: null, writable: !0 },
      });
  }
  static get [Symbol.species]() {
    return Array;
  }
};
var Oe = dd;
function dd(e = []) {
  let t = e.slice(),
    r = 0;
  return {
    get length() {
      return t.length - r;
    },
    remove: (n) => {
      let i = t.indexOf(n);
      return i === -1 ? null : (t.splice(i, 1), n);
    },
    push: (n) => (t.push(n), n),
    shift: () => {
      let n = t[r++];
      return r === t.length ? ((r = 0), (t = [])) : (t[r - 1] = void 0), n;
    },
  };
}
var pe = Buffer.allocUnsafe(256),
  hd = "BCcDdEFfHPpQSX".split("").reduce((e, t) => {
    let r = t.charCodeAt(0);
    return (e[t] = () => ((pe[0] = r), (W.i = 5), W)), e;
  }, {}),
  W = Object.assign(md, hd, {
    N: "\0",
    i: 0,
    inc(e) {
      return (W.i += e), W;
    },
    str(e) {
      let t = Buffer.byteLength(e);
      return yr(t), (W.i += pe.write(e, W.i, t, "utf8")), W;
    },
    i16(e) {
      return yr(2), pe.writeUInt16BE(e, W.i), (W.i += 2), W;
    },
    i32(e, t) {
      return t || t === 0
        ? (pe.writeUInt32BE(e, t), W)
        : (yr(4), pe.writeUInt32BE(e, W.i), (W.i += 4), W);
    },
    z(e) {
      return yr(e), pe.fill(0, W.i, W.i + e), (W.i += e), W;
    },
    raw(e) {
      return (pe = Buffer.concat([pe.subarray(0, W.i), e])), (W.i = pe.length), W;
    },
    end(e = 1) {
      pe.writeUInt32BE(W.i - e, e);
      let t = pe.subarray(0, W.i);
      return (W.i = 0), (pe = Buffer.allocUnsafe(256)), t;
    },
  }),
  L = W;
function yr(e) {
  if (pe.length - W.i < e) {
    let t = pe,
      r = t.length;
    (pe = Buffer.allocUnsafe(r + (r >> 1) + e)), t.copy(pe);
  }
}
function md() {
  return (W.i = 0), W;
}
var Mn = na,
  pd = 1,
  Ze = L().S().end(),
  ea = L().H().end(),
  gd = L().i32(8).i32(80877103).end(8),
  yd = Buffer.concat([L().E().str(L.N).i32(0).end(), Ze]),
  bd = L().D().str("S").str(L.N).end(),
  vt = () => {},
  wd = new Set(["FetchPreparedStatement", "RevalidateCachedQuery", "transformAssignedExpr"]),
  Sd = {
    83: "severity_local",
    86: "severity",
    67: "code",
    77: "message",
    68: "detail",
    72: "hint",
    80: "position",
    112: "internal_position",
    113: "internal_query",
    87: "where",
    115: "schema_name",
    116: "table_name",
    99: "column_name",
    100: "data type_name",
    110: "constraint_name",
    70: "file",
    76: "line",
    82: "routine",
  };
function na(e, t = {}, { onopen: r = vt, onend: n = vt, onclose: i = vt } = {}) {
  let {
      ssl: s,
      max: o,
      user: a,
      host: c,
      port: u,
      database: d,
      parsers: h,
      transform: p,
      onnotice: f,
      onnotify: m,
      onparameter: y,
      max_pipeline: S,
      keep_alive: E,
      backoff: _,
      target_session_attrs: A,
    } = e,
    P = Oe(),
    T = pd++,
    D = { pid: null, secret: null },
    q = kn(kr, e.idle_timeout),
    z = kn(kr, e.max_lifetime),
    k = kn(Al, e.connect_timeout),
    w = null,
    F,
    I = new Ye(),
    V = Buffer.alloc(0),
    be = e.fetch_types,
    Ae = {},
    _e = {},
    tt = Math.random().toString(36).slice(2),
    v = 1,
    B = 0,
    M = 0,
    Z = 0,
    se = 0,
    U = 0,
    Q = 0,
    ne = 0,
    ee = null,
    J = null,
    ce = !1,
    H = null,
    Ne = null,
    fe = null,
    We = null,
    oe = null,
    X = null,
    Be = null,
    $e = null,
    O = null,
    Tt = null,
    de = {
      queue: t.closed,
      idleTimer: q,
      connect(l) {
        (fe = l || !0), Ji();
      },
      terminate: Nt,
      execute: Lt,
      cancel: _l,
      end: kr,
      count: 0,
      id: T,
    };
  return t.closed && t.closed.push(de), de;
  async function Sl() {
    let l;
    try {
      l = e.socket ? await Promise.resolve(e.socket(e)) : new qn.default.Socket();
    } catch (g) {
      pt(g);
      return;
    }
    return l.on("error", pt), l.on("close", Xi), l.on("drain", Hi), l;
  }
  async function _l({ pid: l, secret: g }, N, K) {
    try {
      (F = L().i32(16).i32(80877102).i32(l).i32(g).end(16)),
        await Gi(),
        w.once("error", K),
        w.once("close", N);
    } catch (te) {
      K(te);
    }
  }
  function Lt(l) {
    if (ce) return Xt(l, ie.connection("CONNECTION_DESTROYED", e));
    if (!l.cancelled)
      try {
        return (
          (l.state = D),
          O ? P.push(l) : ((O = l), (O.active = !0)),
          Ol(l),
          ae(vl(l)) &&
            !l.describeFirst &&
            !l.cursorFn &&
            P.length < S &&
            (!l.options.onexecute || l.options.onexecute(de))
        );
      } catch (g) {
        return P.length === 0 && ae(Ze), je(g), !0;
      }
  }
  function vl(l) {
    if (l.parameters.length >= 65534)
      throw ie.generic("MAX_PARAMETERS_EXCEEDED", "Max number of parameters (65534) exceeded");
    return l.options.simple
      ? L()
          .Q()
          .str(l.statement.string + L.N)
          .end()
      : l.describeFirst
        ? Buffer.concat([Ki(l), ea])
        : l.prepare
          ? l.prepared
            ? Jt(l)
            : Buffer.concat([Ki(l), Jt(l)])
          : El(l);
  }
  function Ki(l) {
    return Buffer.concat([
      Zi(l.statement.string, l.parameters, l.statement.types, l.statement.name),
      lc("S", l.statement.name),
    ]);
  }
  function Jt(l) {
    return Buffer.concat([
      uc(l.parameters, l.statement.types, l.statement.name, l.cursorName),
      l.cursorFn ? es("", l.cursorRows) : yd,
    ]);
  }
  function El(l) {
    return Buffer.concat([Zi(l.statement.string, l.parameters, l.statement.types), bd, Jt(l)]);
  }
  function Ol(l) {
    let g = [],
      N = [],
      K = In(l, l.strings[0], l.args[0], g, N, e);
    !l.tagged && l.args.forEach((te) => pr(te, g, N, e)),
      (l.prepare = e.prepare && ("prepare" in l.options ? l.options.prepare : !0)),
      (l.string = K),
      (l.signature = l.prepare && N + K),
      l.onlyDescribe && delete _e[l.signature],
      (l.parameters = l.parameters || g),
      (l.prepared = l.prepare && l.signature in _e),
      (l.describeFirst = l.onlyDescribe || (g.length && !l.prepared)),
      (l.statement = l.prepared
        ? _e[l.signature]
        : { string: K, types: N, name: l.prepare ? tt + v++ : "" }),
      typeof e.debug == "function" && e.debug(T, K, g, N);
  }
  function ae(l, g) {
    return (
      (X = X ? Buffer.concat([X, l]) : Buffer.from(l)),
      g || X.length >= 1024 ? Wi(g) : (J === null && (J = setImmediate(Wi)), !0)
    );
  }
  function Wi(l) {
    let g = w.write(X, l);
    return J !== null && clearImmediate(J), (X = J = null), g;
  }
  function Al() {
    je(ie.connection("CONNECT_TIMEOUT", e, w)), w.destroy();
  }
  async function Qi() {
    if (
      (ae(gd), !(await new Promise((g) => w.once("data", (N) => g(N[0] === 83)))) && s === "prefer")
    )
      return mt();
    w.removeAllListeners(),
      (w = ra.default.connect({
        socket: w,
        servername: qn.default.isIP(w.host) ? void 0 : w.host,
        ...(s === "require" || s === "allow" || s === "prefer"
          ? { rejectUnauthorized: !1 }
          : s === "verify-full"
            ? {}
            : typeof s == "object"
              ? s
              : {}),
      })),
      w.on("secureConnect", mt),
      w.on("error", pt),
      w.on("close", Xi),
      w.on("drain", Hi);
  }
  function Hi() {
    !O && r(de);
  }
  function Ur(l) {
    if (!(H && (H.push(l), (M -= l.length), M >= 0)))
      for (
        V = H
          ? Buffer.concat(H, U - M)
          : V.length === 0
            ? l
            : Buffer.concat([V, l], V.length + l.length);
        V.length > 4;

      ) {
        if (((U = V.readUInt32BE(1)), U >= V.length)) {
          (M = U - V.length), (H = [V]);
          break;
        }
        try {
          Pl(V.subarray(0, U + 1));
        } catch (g) {
          O && (O.cursorFn || O.describeFirst) && ae(Ze), je(g);
        }
        (V = V.subarray(U + 1)), (M = 0), (H = null);
      }
  }
  async function Gi() {
    if (((ce = !1), (Ae = {}), w || (w = await Sl()), !!w)) {
      if ((k.start(), e.socket)) return s ? Qi() : mt();
      if ((w.on("connect", s ? Qi : mt), e.path)) return w.connect(e.path);
      (w.ssl = s),
        w.connect(u[Z], c[Z]),
        (w.host = c[Z]),
        (w.port = u[Z]),
        (Z = (Z + 1) % u.length);
    }
  }
  function Ji() {
    setTimeout(Gi, B ? B + Q - Vn.performance.now() : 0);
  }
  function mt() {
    try {
      (_e = {}),
        (be = e.fetch_types),
        (tt = Math.random().toString(36).slice(2)),
        (v = 1),
        z.start(),
        w.on("data", Ur),
        E && w.setKeepAlive && w.setKeepAlive(!0, 1e3 * E);
      let l = fc();
      ae(l);
    } catch (l) {
      pt(l);
    }
  }
  function pt(l) {
    if (!(de.queue === t.connecting && e.host[se + 1])) for (je(l); P.length; ) Xt(P.shift(), l);
  }
  function je(l) {
    oe && (oe.destroy(l), (oe = null)), O && Xt(O, l), fe && (Xt(fe, l), (fe = null));
  }
  function Xt(l, g) {
    Object.defineProperties(g, {
      stack: {
        value:
          g.stack +
          l.origin.replace(
            /.*\n/,
            `
`,
          ),
        enumerable: e.debug,
      },
      query: { value: l.string, enumerable: e.debug },
      parameters: { value: l.parameters, enumerable: e.debug },
      args: { value: l.args, enumerable: e.debug },
      types: { value: l.statement && l.statement.types, enumerable: e.debug },
    }),
      l.reject(g);
  }
  function kr() {
    return (
      We ||
      (!de.reserved && n(de),
      !de.reserved && !fe && !O && P.length === 0
        ? (Nt(), new Promise((l) => (w && w.readyState !== "closed" ? w.once("close", l) : l())))
        : (We = new Promise((l) => (Be = l))))
    );
  }
  function Nt() {
    (ce = !0),
      (oe || O || fe || P.length) && pt(ie.connection("CONNECTION_DESTROYED", e)),
      clearImmediate(J),
      w &&
        (w.removeListener("data", Ur),
        w.removeListener("connect", mt),
        w.readyState === "open" && w.end(L().X().end())),
      Be && (Be(), (We = Be = null));
  }
  async function Xi(l) {
    if (
      ((V = Buffer.alloc(0)),
      (M = 0),
      (H = null),
      clearImmediate(J),
      w.removeListener("data", Ur),
      w.removeListener("connect", mt),
      q.cancel(),
      z.cancel(),
      k.cancel(),
      w.removeAllListeners(),
      (w = null),
      fe)
    )
      return Ji();
    !l && (O || P.length) && pt(ie.connection("CONNECTION_CLOSED", e, w)),
      (B = Vn.performance.now()),
      l && e.shared.retries++,
      (Q = (typeof _ == "function" ? _(e.shared.retries) : _) * 1e3),
      i(de, ie.connection("CONNECTION_CLOSED", e, w));
  }
  function Pl(l, g = l[0]) {
    (g === 68
      ? Tl
      : g === 100
        ? ec
        : g === 65
          ? Hl
          : g === 83
            ? Ll
            : g === 90
              ? Nl
              : g === 67
                ? Bl
                : g === 50
                  ? Yi
                  : g === 49
                    ? Cl
                    : g === 116
                      ? xl
                      : g === 84
                        ? Il
                        : g === 82
                          ? Dl
                          : g === 110
                            ? Ul
                            : g === 75
                              ? kl
                              : g === 69
                                ? Wl
                                : g === 115
                                  ? Gl
                                  : g === 51
                                    ? Jl
                                    : g === 71
                                      ? Xl
                                      : g === 78
                                        ? rc
                                        : g === 72
                                          ? Yl
                                          : g === 99
                                            ? tc
                                            : g === 73
                                              ? nc
                                              : g === 86
                                                ? ic
                                                : g === 118
                                                  ? sc
                                                  : g === 87
                                                    ? Zl
                                                    : oc)(l);
  }
  function Tl(l) {
    let g = 7,
      N,
      K,
      te,
      he = O.isRaw ? new Array(O.statement.columns.length) : {};
    for (let ge = 0; ge < O.statement.columns.length; ge++)
      (K = O.statement.columns[ge]),
        (N = l.readInt32BE(g)),
        (g += 4),
        (te =
          N === -1
            ? null
            : O.isRaw === !0
              ? l.subarray(g, (g += N))
              : K.parser === void 0
                ? l.toString("utf8", g, (g += N))
                : K.parser.array === !0
                  ? K.parser(l.toString("utf8", g + 1, (g += N)))
                  : K.parser(l.toString("utf8", g, (g += N)))),
        O.isRaw
          ? (he[ge] = O.isRaw === !0 ? te : p.value.from ? p.value.from(te, K) : te)
          : (he[K.name] = p.value.from ? p.value.from(te, K) : te);
    O.forEachFn
      ? O.forEachFn(p.row.from ? p.row.from(he) : he, I)
      : (I[ne++] = p.row.from ? p.row.from(he) : he);
  }
  function Ll(l) {
    let [g, N] = l.toString("utf8", 5, l.length - 1).split(L.N);
    (Ae[g] = N), e.parameters[g] !== N && ((e.parameters[g] = N), y && y(g, N));
  }
  function Nl(l) {
    if (
      (O && O.options.simple && O.resolve(Ne || I), (O = Ne = null), (I = new Ye()), k.cancel(), fe)
    ) {
      if (A) {
        if (!Ae.in_hot_standby || !Ae.default_transaction_read_only) return Kl();
        if (Ml(A, Ae)) return Nt();
      }
      if (be) return fe === !0 && (fe = null), ql();
      fe !== !0 && Lt(fe), (e.shared.retries = se = 0), (fe = null);
      return;
    }
    for (; P.length && (O = P.shift()) && ((O.active = !0), O.cancelled); )
      na(e).cancel(O.state, O.cancelled.resolve, O.cancelled.reject);
    O ||
      (de.reserved
        ? !de.reserved.release && l[5] === 73
          ? We
            ? Nt()
            : ((de.reserved = null), r(de))
          : de.reserved()
        : We
          ? Nt()
          : r(de));
  }
  function Bl(l) {
    ne = 0;
    for (let g = l.length - 1; g > 0; g--)
      if (
        (l[g] === 32 &&
          l[g + 1] < 58 &&
          I.count === null &&
          (I.count = +l.toString("utf8", g + 1, l.length - 1)),
        l[g - 1] >= 65)
      ) {
        (I.command = l.toString("utf8", 5, g)), (I.state = D);
        break;
      }
    if ((Tt && (Tt(), (Tt = null)), I.command === "BEGIN" && o !== 1 && !de.reserved))
      return je(ie.generic("UNSAFE_TRANSACTION", "Only use sql.begin, sql.reserved or max: 1"));
    if (O.options.simple) return Yi();
    O.cursorFn && (I.count && O.cursorFn(I), ae(Ze)), O.resolve(I);
  }
  function Cl() {
    O.parsing = !1;
  }
  function Yi() {
    !I.statement && (I.statement = O.statement), (I.columns = O.statement.columns);
  }
  function xl(l) {
    let g = l.readUInt16BE(5);
    for (let N = 0; N < g; ++N)
      !O.statement.types[N] && (O.statement.types[N] = l.readUInt32BE(7 + N * 4));
    O.prepare && (_e[O.signature] = O.statement),
      O.describeFirst && !O.onlyDescribe && (ae(Jt(O)), (O.describeFirst = !1));
  }
  function Il(l) {
    I.command &&
      ((Ne = Ne || [I]), Ne.push((I = new Ye())), (I.count = null), (O.statement.columns = null));
    let g = l.readUInt16BE(5),
      N = 7,
      K;
    O.statement.columns = Array(g);
    for (let te = 0; te < g; ++te) {
      for (K = N; l[N++] !== 0; );
      let he = l.readUInt32BE(N),
        ge = l.readUInt16BE(N + 4),
        Qe = l.readUInt32BE(N + 6);
      (O.statement.columns[te] = {
        name: p.column.from
          ? p.column.from(l.toString("utf8", K, N - 1))
          : l.toString("utf8", K, N - 1),
        parser: h[Qe],
        table: he,
        number: ge,
        type: Qe,
      }),
        (N += 18);
    }
    if (((I.statement = O.statement), O.onlyDescribe)) return O.resolve(O.statement), ae(Ze);
  }
  async function Dl(l, g = l.readUInt32BE(5)) {
    (g === 3
      ? $l
      : g === 5
        ? jl
        : g === 10
          ? zl
          : g === 11
            ? Rl
            : g === 12
              ? Fl
              : g !== 0
                ? ac
                : vt)(l, g);
  }
  async function $l() {
    let l = await qr();
    ae(L().p().str(l).z(1).end());
  }
  async function jl(l) {
    let g =
      "md5" + (await ta(Buffer.concat([Buffer.from(await ta((await qr()) + a)), l.subarray(9)])));
    ae(L().p().str(g).z(1).end());
  }
  async function zl() {
    ($e = (await Et.default.randomBytes(18)).toString("base64")),
      L()
        .p()
        .str("SCRAM-SHA-256" + L.N);
    let l = L.i;
    ae(
      L.inc(4)
        .str("n,,n=*,r=" + $e)
        .i32(L.i - l - 4, l)
        .end(),
    );
  }
  async function Rl(l) {
    let g = l
        .toString("utf8", 9)
        .split(",")
        .reduce((ge, Qe) => ((ge[Qe[0]] = Qe.slice(2)), ge), {}),
      N = await Et.default.pbkdf2Sync(
        await qr(),
        Buffer.from(g.s, "base64"),
        parseInt(g.i),
        32,
        "sha256",
      ),
      K = await br(N, "Client Key"),
      te = "n=*,r=" + $e + ",r=" + g.r + ",s=" + g.s + ",i=" + g.i + ",c=biws,r=" + g.r;
    ee = (await br(await br(N, "Server Key"), te)).toString("base64");
    let he =
      "c=biws,r=" + g.r + ",p=" + vd(K, Buffer.from(await br(await _d(K), te))).toString("base64");
    ae(L().p().str(he).end());
  }
  function Fl(l) {
    l.toString("utf8", 9).split(L.N, 1)[0].slice(2) !== ee &&
      (je(ie.generic("SASL_SIGNATURE_MISMATCH", "The server did not return the correct signature")),
      w.destroy());
  }
  function qr() {
    return Promise.resolve(typeof e.pass == "function" ? e.pass() : e.pass);
  }
  function Ul() {
    if (((I.statement = O.statement), (I.statement.columns = []), O.onlyDescribe))
      return O.resolve(O.statement), ae(Ze);
  }
  function kl(l) {
    (D.pid = l.readUInt32BE(5)), (D.secret = l.readUInt32BE(9));
  }
  async function ql() {
    (be = !1),
      (
        await new Ee(
          [
            `
      select b.oid, b.typarray
      from pg_catalog.pg_type a
      left join pg_catalog.pg_type b on b.oid = a.typelem
      where a.typcategory = 'A'
      group by b.oid, b.typarray
      order by b.oid
    `,
          ],
          [],
          Lt,
        )
      ).forEach(({ oid: g, typarray: N }) => Vl(g, N));
  }
  function Vl(l, g) {
    if (e.parsers[g] && e.serializers[g]) return;
    let N = e.parsers[l];
    (e.shared.typeArrayMap[l] = g),
      (e.parsers[g] = (K) => Yo(K, N, g)),
      (e.parsers[g].array = !0),
      (e.serializers[g] = (K) => Xo(K, e.serializers[l], e, g));
  }
  function Ml(l, g) {
    return (
      (l === "read-write" && g.default_transaction_read_only === "on") ||
      (l === "read-only" && g.default_transaction_read_only === "off") ||
      (l === "primary" && g.in_hot_standby === "on") ||
      (l === "standby" && g.in_hot_standby === "off") ||
      (l === "prefer-standby" && g.in_hot_standby === "off" && e.host[se])
    );
  }
  function Kl() {
    let l = new Ee(
      [
        `
      show transaction_read_only;
      select pg_catalog.pg_is_in_recovery()
    `,
      ],
      [],
      Lt,
      null,
      { simple: !0 },
    );
    (l.resolve = ([[g], [N]]) => {
      (Ae.default_transaction_read_only = g.transaction_read_only),
        (Ae.in_hot_standby = N.pg_is_in_recovery ? "on" : "off");
    }),
      l.execute();
  }
  function Wl(l) {
    O && (O.cursorFn || O.describeFirst) && ae(Ze);
    let g = ie.postgres(Un(l));
    O && O.retried ? je(O.retried) : O && O.prepared && wd.has(g.routine) ? Ql(O, g) : je(g);
  }
  function Ql(l, g) {
    delete _e[l.signature], (l.retried = g), Lt(l);
  }
  function Hl(l) {
    if (!m) return;
    let g = 9;
    for (; l[g++] !== 0; );
    m(l.toString("utf8", 9, g - 1), l.toString("utf8", g, l.length - 1));
  }
  async function Gl() {
    try {
      let l = await Promise.resolve(O.cursorFn(I));
      (ne = 0), l === St ? ae(cc(O.portal)) : ((I = new Ye()), ae(es("", O.cursorRows)));
    } catch (l) {
      ae(Ze), O.reject(l);
    }
  }
  function Jl() {
    I.count && O.cursorFn(I), O.resolve(I);
  }
  function Xl() {
    (oe = new wr.default.Writable({
      autoDestroy: !0,
      write(l, g, N) {
        w.write(L().d().raw(l).end(), N);
      },
      destroy(l, g) {
        g(l),
          w.write(
            L()
              .f()
              .str(l + L.N)
              .end(),
          ),
          (oe = null);
      },
      final(l) {
        w.write(L().c().end()), (Tt = l);
      },
    })),
      O.resolve(oe);
  }
  function Yl() {
    (oe = new wr.default.Readable({
      read() {
        w.resume();
      },
    })),
      O.resolve(oe);
  }
  function Zl() {
    (oe = new wr.default.Duplex({
      autoDestroy: !0,
      read() {
        w.resume();
      },
      write(l, g, N) {
        w.write(L().d().raw(l).end(), N);
      },
      destroy(l, g) {
        g(l),
          w.write(
            L()
              .f()
              .str(l + L.N)
              .end(),
          ),
          (oe = null);
      },
      final(l) {
        w.write(L().c().end()), (Tt = l);
      },
    })),
      O.resolve(oe);
  }
  function ec(l) {
    oe && (oe.push(l.subarray(5)) || w.pause());
  }
  function tc() {
    oe && oe.push(null), (oe = null);
  }
  function rc(l) {
    f ? f(Un(l)) : console.log(Un(l));
  }
  function nc() {}
  function ic() {
    je(ie.notSupported("FunctionCallResponse"));
  }
  function sc() {
    je(ie.notSupported("NegotiateProtocolVersion"));
  }
  function oc(l) {
    console.error("Postgres.js : Unknown Message:", l[0]);
  }
  function ac(l, g) {
    console.error("Postgres.js : Unknown Auth:", g);
  }
  function uc(l, g, N = "", K = "") {
    let te, he;
    return (
      L()
        .B()
        .str(K + L.N)
        .str(N + L.N)
        .i16(0)
        .i16(l.length),
      l.forEach((ge, Qe) => {
        if (ge === null) return L.i32(4294967295);
        (he = g[Qe]),
          (l[Qe] = ge = he in e.serializers ? e.serializers[he](ge) : "" + ge),
          (te = L.i),
          L.inc(4)
            .str(ge)
            .i32(L.i - te - 4, te);
      }),
      L.i16(0),
      L.end()
    );
  }
  function Zi(l, g, N, K = "") {
    return (
      L()
        .P()
        .str(K + L.N)
        .str(l + L.N)
        .i16(g.length),
      g.forEach((te, he) => L.i32(N[he] || 0)),
      L.end()
    );
  }
  function lc(l, g = "") {
    return L()
      .D()
      .str(l)
      .str(g + L.N)
      .end();
  }
  function es(l = "", g = 0) {
    return Buffer.concat([
      L()
        .E()
        .str(l + L.N)
        .i32(g)
        .end(),
      ea,
    ]);
  }
  function cc(l = "") {
    return Buffer.concat([
      L()
        .C()
        .str("P")
        .str(l + L.N)
        .end(),
      L().S().end(),
    ]);
  }
  function fc() {
    return (
      F ||
      L()
        .inc(4)
        .i16(3)
        .z(2)
        .str(
          Object.entries(
            Object.assign({ user: a, database: d, client_encoding: "UTF8" }, e.connection),
          )
            .filter(([, l]) => l)
            .map(([l, g]) => l + L.N + g)
            .join(L.N),
        )
        .z(2)
        .end(0)
    );
  }
}
function Un(e) {
  let t = {},
    r = 5;
  for (let n = 5; n < e.length - 1; n++)
    e[n] === 0 && ((t[Sd[e[r]]] = e.toString("utf8", r + 1, n)), (r = n + 1));
  return t;
}
function ta(e) {
  return Et.default.createHash("md5").update(e).digest("hex");
}
function br(e, t) {
  return Et.default.createHmac("sha256", e).update(t).digest();
}
function _d(e) {
  return Et.default.createHash("sha256").update(e).digest();
}
function vd(e, t) {
  let r = Math.max(e.length, t.length),
    n = Buffer.allocUnsafe(r);
  for (let i = 0; i < r; i++) n[i] = e[i] ^ t[i];
  return n;
}
function kn(e, t) {
  if (((t = typeof t == "function" ? t() : t), !t)) return { cancel: vt, start: vt };
  let r;
  return {
    cancel() {
      r && (clearTimeout(r), (r = null));
    },
    start() {
      r && clearTimeout(r), (r = setTimeout(n, t * 1e3, arguments));
    },
  };
  function n(i) {
    e.apply(null, i), (r = null);
  }
}
var ia = () => {};
function Kn(e, t) {
  let r = new Map(),
    n = "postgresjs_" + Math.random().toString(36).slice(2),
    i = {},
    s,
    o,
    a = !1,
    c = (h.sql = e({
      ...t,
      transform: { column: {}, value: {}, row: {} },
      max: 1,
      fetch_types: !1,
      idle_timeout: null,
      max_lifetime: null,
      connection: { ...t.connection, replication: "database" },
      onclose: async function () {
        a ||
          ((o = null),
          (i.pid = i.secret = void 0),
          p(await f(c, n, t.publications)),
          r.forEach((y) => y.forEach(({ onsubscribe: S }) => S())));
      },
      no_subscribe: !0,
    })),
    u = c.end,
    d = c.close;
  return (
    (c.end = async () => (
      (a = !0), o && (await new Promise((y) => (o.once("close", y), o.end()))), u()
    )),
    (c.close = async () => (o && (await new Promise((y) => (o.once("close", y), o.end()))), d())),
    h
  );
  async function h(y, S, E = ia, _ = ia) {
    (y = Ad(y)), s || (s = f(c, n, t.publications));
    let A = { fn: S, onsubscribe: E },
      P = r.has(y) ? r.get(y).add(A) : r.set(y, new Set([A])).get(y),
      T = () => {
        P.delete(A), P.size === 0 && r.delete(y);
      };
    return s.then((D) => (p(D), E(), o && o.on("error", _), { unsubscribe: T, state: i, sql: c }));
  }
  function p(y) {
    (o = y.stream), (i.pid = y.state.pid), (i.secret = y.state.secret);
  }
  async function f(y, S, E) {
    if (!E) throw new Error("Missing publication names");
    let _ = await y.unsafe(
        `CREATE_REPLICATION_SLOT ${S} TEMPORARY LOGICAL pgoutput NOEXPORT_SNAPSHOT`,
      ),
      [A] = _,
      P = await y
        .unsafe(
          `START_REPLICATION SLOT ${S} LOGICAL ${A.consistent_point} (proto_version '1', publication_names '${E}')`,
        )
        .writable(),
      T = {
        lsn: Buffer.concat(
          A.consistent_point.split("/").map((w) => Buffer.from(("00000000" + w).slice(-8), "hex")),
        ),
      };
    return P.on("data", q), P.on("error", D), P.on("close", y.close), { stream: P, state: _.state };
    function D(w) {
      console.error("Unexpected error during logical streaming - reconnecting", w);
    }
    function q(w) {
      w[0] === 119
        ? Od(w.subarray(25), T, y.options.parsers, z, t.transform)
        : w[0] === 107 && w[17] && ((T.lsn = w.subarray(1, 9)), k());
    }
    function z(w, F) {
      let I = F.relation.schema + "." + F.relation.table;
      m("*", w, F),
        m("*:" + I, w, F),
        F.relation.keys.length && m("*:" + I + "=" + F.relation.keys.map((V) => w[V.name]), w, F),
        m(F.command, w, F),
        m(F.command + ":" + I, w, F),
        F.relation.keys.length &&
          m(F.command + ":" + I + "=" + F.relation.keys.map((V) => w[V.name]), w, F);
    }
    function k() {
      let w = Buffer.alloc(34);
      (w[0] = 114),
        w.fill(T.lsn, 1),
        w.writeBigInt64BE(BigInt(Date.now() - Date.UTC(2e3, 0, 1)) * BigInt(1e3), 25),
        P.write(w);
    }
  }
  function m(y, S, E) {
    r.has(y) && r.get(y).forEach(({ fn: _ }) => _(S, E, y));
  }
}
function Ed(e) {
  return new Date(Date.UTC(2e3, 0, 1) + Number(e / BigInt(1e3)));
}
function Od(e, t, r, n, i) {
  let s = (o, [a, c]) => ((o[a.charCodeAt(0)] = c), o);
  Object.entries({
    R: (o) => {
      let a = 1,
        c = (t[o.readUInt32BE(a)] = {
          schema: o.toString("utf8", (a += 4), (a = o.indexOf(0, a))) || "pg_catalog",
          table: o.toString("utf8", a + 1, (a = o.indexOf(0, a + 1))),
          columns: Array(o.readUInt16BE((a += 2))),
          keys: [],
        });
      a += 2;
      let u = 0,
        d;
      for (; a < o.length; )
        (d = c.columns[u++] =
          {
            key: o[a++],
            name: i.column.from
              ? i.column.from(o.toString("utf8", a, (a = o.indexOf(0, a))))
              : o.toString("utf8", a, (a = o.indexOf(0, a))),
            type: o.readUInt32BE((a += 1)),
            parser: r[o.readUInt32BE(a)],
            atttypmod: o.readUInt32BE((a += 4)),
          }),
          d.key && c.keys.push(d),
          (a += 4);
    },
    Y: () => {},
    O: () => {},
    B: (o) => {
      (t.date = Ed(o.readBigInt64BE(9))), (t.lsn = o.subarray(1, 9));
    },
    I: (o) => {
      let a = 1,
        c = t[o.readUInt32BE(a)],
        { row: u } = Sr(o, c.columns, (a += 7), i);
      n(u, { command: "insert", relation: c });
    },
    D: (o) => {
      let a = 1,
        c = t[o.readUInt32BE(a)];
      a += 4;
      let u = o[a] === 75;
      n(u || o[a] === 79 ? Sr(o, c.columns, (a += 3), i).row : null, {
        command: "delete",
        relation: c,
        key: u,
      });
    },
    U: (o) => {
      let a = 1,
        c = t[o.readUInt32BE(a)];
      a += 4;
      let u = o[a] === 75,
        d = u || o[a] === 79 ? Sr(o, c.columns, (a += 3), i) : null;
      d && (a = d.i);
      let { row: h } = Sr(o, c.columns, a + 3, i);
      n(h, { command: "update", relation: c, key: u, old: d && d.row });
    },
    T: () => {},
    C: () => {},
  })
    .reduce(s, {})
    [e[0]](e);
}
function Sr(e, t, r, n) {
  let i,
    s,
    o,
    a = n.raw ? new Array(t.length) : {};
  for (let c = 0; c < t.length; c++)
    (i = e[r++]),
      (s = t[c]),
      (o =
        i === 110
          ? null
          : i === 117
            ? void 0
            : s.parser === void 0
              ? e.toString("utf8", r + 4, (r += 4 + e.readUInt32BE(r)))
              : s.parser.array === !0
                ? s.parser(e.toString("utf8", r + 5, (r += 4 + e.readUInt32BE(r))))
                : s.parser(e.toString("utf8", r + 4, (r += 4 + e.readUInt32BE(r))))),
      n.raw
        ? (a[c] = n.raw === !0 ? o : n.value.from ? n.value.from(o, s) : o)
        : (a[s.name] = n.value.from ? n.value.from(o, s) : o);
  return { i: r, row: n.row.from ? n.row.from(a) : a };
}
function Ad(e) {
  let t = e.match(/^(\*|insert|update|delete)?:?([^.]+?\.?[^=]+)?=?(.+)?/i) || [];
  if (!t) throw new Error("Malformed subscribe pattern: " + e);
  let [, r, n, i] = t;
  return (
    (r || "*") + (n ? ":" + (n.indexOf(".") === -1 ? "public." + n : n) : "") + (i ? "=" + i : "")
  );
}
var Wn = ze(require("stream"), 1);
function Qn(e, t, r = 393216) {
  return new Promise(async (n, i) => {
    await e
      .begin(async (s) => {
        let o;
        !t && ([{ oid: t }] = await s`select lo_creat(-1) as oid`);
        let [{ fd: a }] = await s`select lo_open(${t}, ${r}) as fd`,
          c = {
            writable: d,
            readable: u,
            close: () => s`select lo_close(${a})`.then(o),
            tell: () => s`select lo_tell64(${a})`,
            read: (h) => s`select loread(${a}, ${h}) as data`,
            write: (h) => s`select lowrite(${a}, ${h})`,
            truncate: (h) => s`select lo_truncate64(${a}, ${h})`,
            seek: (h, p = 0) => s`select lo_lseek64(${a}, ${h}, ${p})`,
            size: () => s`
          select
            lo_lseek64(${a}, location, 0) as position,
            seek.size
          from (
            select
              lo_lseek64($1, 0, 2) as size,
              tell.location
            from (select lo_tell64($1) as location) tell
          ) seek
        `,
          };
        return n(c), new Promise(async (h) => (o = h));
        async function u({ highWaterMark: h = 2048 * 8, start: p = 0, end: f = 1 / 0 } = {}) {
          let m = f - p;
          return (
            p && (await c.seek(p)),
            new Wn.default.Readable({
              highWaterMark: h,
              async read(y) {
                let S = y > m ? y - m : y;
                m -= y;
                let [{ data: E }] = await c.read(S);
                this.push(E), E.length < y && this.push(null);
              },
            })
          );
        }
        async function d({ highWaterMark: h = 2048 * 8, start: p = 0 } = {}) {
          return (
            p && (await c.seek(p)),
            new Wn.default.Writable({
              highWaterMark: h,
              write(f, m, y) {
                c.write(f).then(() => y(), y);
              },
            })
          );
        }
      })
      .catch(i);
  });
}
Object.assign(Hn, {
  PostgresError: ot,
  toPascal: ut,
  pascal: Rn,
  toCamel: at,
  camel: zn,
  toKebab: lt,
  kebab: Fn,
  fromPascal: Kt,
  fromCamel: Mt,
  fromKebab: Wt,
  BigInt: { to: 20, from: [20], parse: (e) => BigInt(e), serialize: (e) => e.toString() },
});
function Hn(e, t) {
  let r = Pd(e, t),
    n = r.no_subscribe || Kn(Hn, { ...r }),
    i = !1,
    s = Oe(),
    o = Oe(),
    a = Oe(),
    c = Oe(),
    u = Oe(),
    d = Oe(),
    h = Oe(),
    p = Oe(),
    f = { connecting: o, reserved: a, closed: c, ended: u, open: d, busy: h, full: p },
    m = [...Array(r.max)].map(() => Mn(r, f, { onopen: _e, onend: Ae, onclose: tt })),
    y = S(z);
  return (
    Object.assign(y, {
      get parameters() {
        return r.parameters;
      },
      largeObject: Qn.bind(null, y),
      subscribe: n,
      CLOSE: St,
      END: St,
      PostgresError: ot,
      options: r,
      reserve: A,
      listen: E,
      begin: P,
      close: I,
      end: F,
    }),
    y
  );
  function S(v) {
    return (
      (v.debug = r.debug),
      Object.entries(r.types).reduce((U, [Q, ne]) => ((U[Q] = (ee) => new xe(ee, ne.to)), U), B),
      Object.assign(M, { types: B, typed: B, unsafe: Z, notify: _, array: q, json: D, file: se }),
      M
    );
    function B(U, Q) {
      return new xe(U, Q);
    }
    function M(U, ...Q) {
      return U && Array.isArray(U.raw)
        ? new Ee(U, Q, v, w)
        : typeof U == "string" && !Q.length
          ? new _t(r.transform.column.to ? r.transform.column.to(U) : U)
          : new Vt(U, Q);
    }
    function Z(U, Q = [], ne = {}) {
      return (
        arguments.length === 2 && !Array.isArray(Q) && ((ne = Q), (Q = [])),
        new Ee([U], Q, v, w, {
          prepare: !1,
          ...ne,
          simple: "simple" in ne ? ne.simple : Q.length === 0,
        })
      );
    }
    function se(U, Q = [], ne = {}) {
      return (
        arguments.length === 2 && !Array.isArray(Q) && ((ne = Q), (Q = [])),
        new Ee(
          [],
          Q,
          (J) => {
            oa.default.readFile(U, "utf8", (ce, H) => {
              if (ce) return J.reject(ce);
              (J.strings = [H]), v(J);
            });
          },
          w,
          { ...ne, simple: "simple" in ne ? ne.simple : Q.length === 0 },
        )
      );
    }
  }
  async function E(v, B, M) {
    let Z = { fn: B, onlisten: M },
      se =
        E.sql ||
        (E.sql = Hn({
          ...r,
          max: 1,
          idle_timeout: null,
          max_lifetime: null,
          fetch_types: !1,
          onclose() {
            Object.entries(E.channels).forEach(([J, { listeners: ce }]) => {
              delete E.channels[J],
                Promise.all(ce.map((H) => E(J, H.fn, H.onlisten).catch(() => {})));
            });
          },
          onnotify(J, ce) {
            J in E.channels && E.channels[J].listeners.forEach((H) => H.fn(ce));
          },
        })),
      U = E.channels || (E.channels = {});
    if (v in U) {
      U[v].listeners.push(Z);
      let J = await U[v].result;
      return Z.onlisten && Z.onlisten(), { state: J.state, unlisten: ee };
    }
    U[v] = { result: se`listen ${se.unsafe('"' + v.replace(/"/g, '""') + '"')}`, listeners: [Z] };
    let ne = await U[v].result;
    return Z.onlisten && Z.onlisten(), { state: ne.state, unlisten: ee };
    async function ee() {
      if (
        v in U &&
        ((U[v].listeners = U[v].listeners.filter((J) => J !== Z)), !U[v].listeners.length)
      )
        return delete U[v], se`unlisten ${se.unsafe('"' + v.replace(/"/g, '""') + '"')}`;
    }
  }
  async function _(v, B) {
    return await y`select pg_notify(${v}, ${"" + B})`;
  }
  async function A() {
    let v = Oe(),
      B = d.length
        ? d.shift()
        : await new Promise((se) => {
            s.push({ reserve: se }), c.length && be(c.shift());
          });
    T(B, a),
      (B.reserved = () => (v.length ? B.execute(v.shift()) : T(B, a))),
      (B.reserved.release = !0);
    let M = S(Z);
    return (
      (M.release = () => {
        (B.reserved = null), _e(B);
      }),
      M
    );
    function Z(se) {
      B.queue === p ? v.push(se) : B.execute(se) || T(B, p);
    }
  }
  async function P(v, B) {
    !B && ((B = v), (v = ""));
    let M = Oe(),
      Z = 0,
      se,
      U = null;
    try {
      return (
        await y.unsafe("begin " + v.replace(/[^a-z ]/gi, ""), [], { onexecute: ne }).execute(),
        await Promise.race([Q(se, B), new Promise((ee, J) => (se.onclose = J))])
      );
    } catch (ee) {
      throw ee;
    }
    async function Q(ee, J, ce) {
      let H = S(oe);
      (H.savepoint = We), (H.prepare = (X) => (U = X.replace(/[^a-z0-9$-_. ]/gi)));
      let Ne, fe;
      ce && (await H`savepoint ${H(ce)}`);
      try {
        if (
          ((fe = await new Promise((X, Be) => {
            let $e = J(H);
            Promise.resolve(Array.isArray($e) ? Promise.all($e) : $e).then(X, Be);
          })),
          Ne)
        )
          throw Ne;
      } catch (X) {
        throw (
          (await (ce ? H`rollback to ${H(ce)}` : H`rollback`),
          (X instanceof ot && X.code === "25P02" && Ne) || X)
        );
      }
      return ce || (U ? await H`prepare transaction '${H.unsafe(U)}'` : await H`commit`), fe;
      function We(X, Be) {
        return X && Array.isArray(X.raw)
          ? We(($e) => $e.apply($e, arguments))
          : (arguments.length === 1 && ((Be = X), (X = null)),
            Q(ee, Be, "s" + Z++ + (X ? "_" + X : "")));
      }
      function oe(X) {
        X.catch((Be) => Ne || (Ne = Be)), ee.queue === p ? M.push(X) : ee.execute(X) || T(ee, p);
      }
    }
    function ne(ee) {
      (se = ee), T(ee, a), (ee.reserved = () => (M.length ? ee.execute(M.shift()) : T(ee, a)));
    }
  }
  function T(v, B) {
    return (
      v.queue.remove(v),
      B.push(v),
      (v.queue = B),
      B === d ? v.idleTimer.start() : v.idleTimer.cancel(),
      v
    );
  }
  function D(v) {
    return new xe(v, 3802);
  }
  function q(v, B) {
    return Array.isArray(v)
      ? new xe(v, B || (v.length ? mr(v) || 25 : 0), r.shared.typeArrayMap)
      : q(Array.from(arguments));
  }
  function z(v) {
    if (i) return v.reject(ie.connection("CONNECTION_ENDED", r, r));
    if (d.length) return k(d.shift(), v);
    if (c.length) return be(c.shift(), v);
    h.length ? k(h.shift(), v) : s.push(v);
  }
  function k(v, B) {
    return v.execute(B) ? T(v, h) : T(v, p);
  }
  function w(v) {
    return new Promise((B, M) => {
      v.state
        ? v.active
          ? Mn(r).cancel(v.state, B, M)
          : (v.cancelled = { resolve: B, reject: M })
        : (s.remove(v),
          (v.cancelled = !0),
          v.reject(ie.generic("57014", "canceling statement due to user request")),
          B());
    });
  }
  async function F({ timeout: v = null } = {}) {
    if (i) return i;
    await 1;
    let B;
    return (i = Promise.race([
      new Promise((M) => v !== null && (B = setTimeout(V, v * 1e3, M))),
      Promise.all(
        m
          .map((M) => M.end())
          .concat(E.sql ? E.sql.end({ timeout: 0 }) : [], n.sql ? n.sql.end({ timeout: 0 }) : []),
      ),
    ]).then(() => clearTimeout(B)));
  }
  async function I() {
    await Promise.all(m.map((v) => v.end()));
  }
  async function V(v) {
    for (await Promise.all(m.map((B) => B.terminate())); s.length; )
      s.shift().reject(ie.connection("CONNECTION_DESTROYED", r));
    v();
  }
  function be(v, B) {
    return T(v, o), v.connect(B), v;
  }
  function Ae(v) {
    T(v, u);
  }
  function _e(v) {
    if (s.length === 0) return T(v, d);
    let B = Math.ceil(s.length / (o.length + 1)),
      M = !0;
    for (; M && s.length && B-- > 0; ) {
      let Z = s.shift();
      if (Z.reserve) return Z.reserve(v);
      M = v.execute(Z);
    }
    M ? T(v, h) : T(v, p);
  }
  function tt(v, B) {
    T(v, c),
      (v.reserved = null),
      v.onclose && (v.onclose(B), (v.onclose = null)),
      r.onclose && r.onclose(v.id),
      s.length && be(v, s.shift());
  }
}
function Pd(e, t) {
  if (e && e.shared) return e;
  let r = process.env,
    n = (!e || typeof e == "string" ? t : e) || {},
    { url: i, multihost: s } = Cd(e),
    o = [...i.searchParams].reduce((p, [f, m]) => ((p[f] = m), p), {}),
    a = n.hostname || n.host || s || i.hostname || r.PGHOST || "localhost",
    c = n.port || i.port || r.PGPORT || 5432,
    u = n.user || n.username || i.username || r.PGUSERNAME || r.PGUSER || xd();
  n.no_prepare && (n.prepare = !1),
    o.sslmode && ((o.ssl = o.sslmode), delete o.sslmode),
    "timeout" in n &&
      (console.log("The timeout option is deprecated, use idle_timeout instead"),
      (n.idle_timeout = n.timeout)),
    o.sslrootcert === "system" && (o.ssl = "verify-full");
  let d = [
      "idle_timeout",
      "connect_timeout",
      "max_lifetime",
      "max_pipeline",
      "backoff",
      "keep_alive",
    ],
    h = {
      max: 10,
      ssl: !1,
      idle_timeout: null,
      connect_timeout: 30,
      max_lifetime: Nd,
      max_pipeline: 100,
      backoff: Ld,
      keep_alive: 60,
      prepare: !0,
      debug: !1,
      fetch_types: !0,
      publications: "alltables",
      target_session_attrs: null,
    };
  return {
    host: Array.isArray(a) ? a : a.split(",").map((p) => p.split(":")[0]),
    port: Array.isArray(c) ? c : a.split(",").map((p) => parseInt(p.split(":")[1] || c)),
    path: n.path || (a.indexOf("/") > -1 && a + "/.s.PGSQL." + c),
    database: n.database || n.db || (i.pathname || "").slice(1) || r.PGDATABASE || u,
    user: u,
    pass: n.pass || n.password || i.password || r.PGPASSWORD || "",
    ...Object.entries(h).reduce((p, [f, m]) => {
      let y =
        f in n
          ? n[f]
          : f in o
            ? o[f] === "disable" || o[f] === "false"
              ? !1
              : o[f]
            : r["PG" + f.toUpperCase()] || m;
      return (p[f] = typeof y == "string" && d.includes(f) ? +y : y), p;
    }, {}),
    connection: {
      application_name: "postgres.js",
      ...n.connection,
      ...Object.entries(o).reduce((p, [f, m]) => (f in h || (p[f] = m), p), {}),
    },
    types: n.types || {},
    target_session_attrs: Td(n, i, r),
    onnotice: n.onnotice,
    onnotify: n.onnotify,
    onclose: n.onclose,
    onparameter: n.onparameter,
    socket: n.socket,
    transform: Bd(n.transform || { undefined: void 0 }),
    parameters: {},
    shared: { retries: 0, typeArrayMap: {} },
    ...Go(n.types),
  };
}
function Td(e, t, r) {
  let n =
    e.target_session_attrs || t.searchParams.get("target_session_attrs") || r.PGTARGETSESSIONATTRS;
  if (!n || ["read-write", "read-only", "primary", "standby", "prefer-standby"].includes(n))
    return n;
  throw new Error("target_session_attrs " + n + " is not supported");
}
function Ld(e) {
  return (0.5 + Math.random() / 2) * Math.min(3 ** e / 100, 20);
}
function Nd() {
  return 60 * (30 + Math.random() * 30);
}
function Bd(e) {
  return {
    undefined: e.undefined,
    column: {
      from: typeof e.column == "function" ? e.column : e.column && e.column.from,
      to: e.column && e.column.to,
    },
    value: {
      from: typeof e.value == "function" ? e.value : e.value && e.value.from,
      to: e.value && e.value.to,
    },
    row: { from: typeof e.row == "function" ? e.row : e.row && e.row.from, to: e.row && e.row.to },
  };
}
function Cd(e) {
  if (!e || typeof e != "string") return { url: { searchParams: new Map() } };
  let t = e;
  (t = t.slice(t.indexOf("://") + 3).split(/[?/]/)[0]),
    (t = decodeURIComponent(t.slice(t.indexOf("@") + 1)));
  let r = new URL(e.replace(t, t.split(",")[0]));
  return {
    url: {
      username: decodeURIComponent(r.username),
      password: decodeURIComponent(r.password),
      host: r.host,
      hostname: r.hostname,
      port: r.port,
      pathname: r.pathname,
      searchParams: r.searchParams,
    },
    multihost: t.indexOf(",") > -1 && t,
  };
}
function xd() {
  try {
    return sa.default.userInfo().username;
  } catch {
    return process.env.USERNAME || process.env.USER || process.env.LOGNAME;
  }
}
var Ey = ze(Tn());
var bl = ze(yl()),
  vy = (0, bl.default)({ transport: { target: "pino-pretty" } });
var Mi;
var Oy = async (e) => {
    e.get("/", async function () {
      return (
        console.log(Mi), await Mi.query.coursePack.findMany({ orderBy: ws(wl.coursePack.order) })
      );
    });
  },
  Ay = Oy;
/*! Bundled license information:

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=index.js.map
