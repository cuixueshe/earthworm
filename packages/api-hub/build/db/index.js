"use strict";
var dh = Object.create;
var qr = Object.defineProperty;
var mh = Object.getOwnPropertyDescriptor;
var ph = Object.getOwnPropertyNames;
var yh = Object.getPrototypeOf,
  gh = Object.prototype.hasOwnProperty;
var K = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  wh = (e, t) => {
    for (var r in t) qr(e, r, { get: t[r], enumerable: !0 });
  },
  mo = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let i of ph(t))
        !gh.call(e, i) &&
          i !== r &&
          qr(e, i, { get: () => t[i], enumerable: !(n = mh(t, i)) || n.enumerable });
    return e;
  };
var ot = (e, t, r) => (
    (r = e != null ? dh(yh(e)) : {}),
    mo(t || !e || !e.__esModule ? qr(r, "default", { value: e, enumerable: !0 }) : r, e)
  ),
  bh = (e) => mo(qr({}, "__esModule", { value: !0 }), e);
var Ri = K((_e) => {
  "use strict";
  Object.defineProperty(_e, "__esModule", { value: !0 });
  _e.output = _e.exists = _e.hash = _e.bytes = _e.bool = _e.number = _e.isBytes = void 0;
  function gn(e) {
    if (!Number.isSafeInteger(e) || e < 0) throw new Error(`positive integer expected, not ${e}`);
  }
  _e.number = gn;
  function Fa(e) {
    if (typeof e != "boolean") throw new Error(`boolean expected, not ${e}`);
  }
  _e.bool = Fa;
  function Qa(e) {
    return (
      e instanceof Uint8Array ||
      (e != null && typeof e == "object" && e.constructor.name === "Uint8Array")
    );
  }
  _e.isBytes = Qa;
  function qi(e, ...t) {
    if (!Qa(e)) throw new Error("Uint8Array expected");
    if (t.length > 0 && !t.includes(e.length))
      throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`);
  }
  _e.bytes = qi;
  function ka(e) {
    if (typeof e != "function" || typeof e.create != "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    gn(e.outputLen), gn(e.blockLen);
  }
  _e.hash = ka;
  function Ua(e, t = !0) {
    if (e.destroyed) throw new Error("Hash instance has been destroyed");
    if (t && e.finished) throw new Error("Hash#digest() has already been called");
  }
  _e.exists = Ua;
  function Ka(e, t) {
    qi(e);
    let r = t.outputLen;
    if (e.length < r) throw new Error(`digestInto() expects output buffer of length at least ${r}`);
  }
  _e.output = Ka;
  var sd = { number: gn, bool: Fa, bytes: qi, hash: ka, exists: Ua, output: Ka };
  _e.default = sd;
});
var hl = K((U) => {
  "use strict";
  Object.defineProperty(U, "__esModule", { value: !0 });
  U.add5L =
    U.add5H =
    U.add4H =
    U.add4L =
    U.add3H =
    U.add3L =
    U.add =
    U.rotlBL =
    U.rotlBH =
    U.rotlSL =
    U.rotlSH =
    U.rotr32L =
    U.rotr32H =
    U.rotrBL =
    U.rotrBH =
    U.rotrSL =
    U.rotrSH =
    U.shrSL =
    U.shrSH =
    U.toBig =
    U.split =
    U.fromBig =
      void 0;
  var wn = BigInt(2 ** 32 - 1),
    Fi = BigInt(32);
  function Qi(e, t = !1) {
    return t
      ? { h: Number(e & wn), l: Number((e >> Fi) & wn) }
      : { h: Number((e >> Fi) & wn) | 0, l: Number(e & wn) | 0 };
  }
  U.fromBig = Qi;
  function Ma(e, t = !1) {
    let r = new Uint32Array(e.length),
      n = new Uint32Array(e.length);
    for (let i = 0; i < e.length; i++) {
      let { h: s, l: o } = Qi(e[i], t);
      [r[i], n[i]] = [s, o];
    }
    return [r, n];
  }
  U.split = Ma;
  var Va = (e, t) => (BigInt(e >>> 0) << Fi) | BigInt(t >>> 0);
  U.toBig = Va;
  var Wa = (e, t, r) => e >>> r;
  U.shrSH = Wa;
  var Ha = (e, t, r) => (e << (32 - r)) | (t >>> r);
  U.shrSL = Ha;
  var Ja = (e, t, r) => (e >>> r) | (t << (32 - r));
  U.rotrSH = Ja;
  var Ga = (e, t, r) => (e << (32 - r)) | (t >>> r);
  U.rotrSL = Ga;
  var Xa = (e, t, r) => (e << (64 - r)) | (t >>> (r - 32));
  U.rotrBH = Xa;
  var Ya = (e, t, r) => (e >>> (r - 32)) | (t << (64 - r));
  U.rotrBL = Ya;
  var Za = (e, t) => t;
  U.rotr32H = Za;
  var el = (e, t) => e;
  U.rotr32L = el;
  var tl = (e, t, r) => (e << r) | (t >>> (32 - r));
  U.rotlSH = tl;
  var rl = (e, t, r) => (t << r) | (e >>> (32 - r));
  U.rotlSL = rl;
  var nl = (e, t, r) => (t << (r - 32)) | (e >>> (64 - r));
  U.rotlBH = nl;
  var il = (e, t, r) => (e << (r - 32)) | (t >>> (64 - r));
  U.rotlBL = il;
  function sl(e, t, r, n) {
    let i = (t >>> 0) + (n >>> 0);
    return { h: (e + r + ((i / 2 ** 32) | 0)) | 0, l: i | 0 };
  }
  U.add = sl;
  var ol = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0);
  U.add3L = ol;
  var al = (e, t, r, n) => (t + r + n + ((e / 2 ** 32) | 0)) | 0;
  U.add3H = al;
  var ll = (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0);
  U.add4L = ll;
  var ul = (e, t, r, n, i) => (t + r + n + i + ((e / 2 ** 32) | 0)) | 0;
  U.add4H = ul;
  var cl = (e, t, r, n, i) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0);
  U.add5L = cl;
  var fl = (e, t, r, n, i, s) => (t + r + n + i + s + ((e / 2 ** 32) | 0)) | 0;
  U.add5H = fl;
  var od = {
    fromBig: Qi,
    split: Ma,
    toBig: Va,
    shrSH: Wa,
    shrSL: Ha,
    rotrSH: Ja,
    rotrSL: Ga,
    rotrBH: Xa,
    rotrBL: Ya,
    rotr32H: Za,
    rotr32L: el,
    rotlSH: tl,
    rotlSL: rl,
    rotlBH: nl,
    rotlBL: il,
    add: sl,
    add3L: ol,
    add3H: al,
    add4L: ll,
    add4H: ul,
    add5H: fl,
    add5L: cl,
  };
  U.default = od;
});
var dl = K((Sn) => {
  "use strict";
  Object.defineProperty(Sn, "__esModule", { value: !0 });
  Sn.crypto = void 0;
  var bn = require("node:crypto");
  Sn.crypto = bn && typeof bn == "object" && "webcrypto" in bn ? bn.webcrypto : void 0;
});
var yl = K((F) => {
  "use strict";
  Object.defineProperty(F, "__esModule", { value: !0 });
  F.randomBytes =
    F.wrapXOFConstructorWithOpts =
    F.wrapConstructorWithOpts =
    F.wrapConstructor =
    F.checkOpts =
    F.Hash =
    F.concatBytes =
    F.toBytes =
    F.utf8ToBytes =
    F.asyncLoop =
    F.nextTick =
    F.hexToBytes =
    F.bytesToHex =
    F.byteSwap32 =
    F.byteSwapIfBE =
    F.byteSwap =
    F.isLE =
    F.rotl =
    F.rotr =
    F.createView =
    F.u32 =
    F.u8 =
    F.isBytes =
      void 0;
  var ki = dl(),
    Ki = Ri();
  function ad(e) {
    return (
      e instanceof Uint8Array ||
      (e != null && typeof e == "object" && e.constructor.name === "Uint8Array")
    );
  }
  F.isBytes = ad;
  var ld = (e) => new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
  F.u8 = ld;
  var ud = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
  F.u32 = ud;
  var cd = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength);
  F.createView = cd;
  var fd = (e, t) => (e << (32 - t)) | (e >>> t);
  F.rotr = fd;
  var hd = (e, t) => (e << t) | ((e >>> (32 - t)) >>> 0);
  F.rotl = hd;
  F.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  var dd = (e) =>
    ((e << 24) & 4278190080) | ((e << 8) & 16711680) | ((e >>> 8) & 65280) | ((e >>> 24) & 255);
  F.byteSwap = dd;
  F.byteSwapIfBE = F.isLE ? (e) => e : (e) => (0, F.byteSwap)(e);
  function md(e) {
    for (let t = 0; t < e.length; t++) e[t] = (0, F.byteSwap)(e[t]);
  }
  F.byteSwap32 = md;
  var pd = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
  function yd(e) {
    (0, Ki.bytes)(e);
    let t = "";
    for (let r = 0; r < e.length; r++) t += pd[e[r]];
    return t;
  }
  F.bytesToHex = yd;
  var at = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
  function ml(e) {
    if (e >= at._0 && e <= at._9) return e - at._0;
    if (e >= at._A && e <= at._F) return e - (at._A - 10);
    if (e >= at._a && e <= at._f) return e - (at._a - 10);
  }
  function gd(e) {
    if (typeof e != "string") throw new Error("hex string expected, got " + typeof e);
    let t = e.length,
      r = t / 2;
    if (t % 2) throw new Error("padded hex string expected, got unpadded hex of length " + t);
    let n = new Uint8Array(r);
    for (let i = 0, s = 0; i < r; i++, s += 2) {
      let o = ml(e.charCodeAt(s)),
        a = ml(e.charCodeAt(s + 1));
      if (o === void 0 || a === void 0) {
        let u = e[s] + e[s + 1];
        throw new Error('hex string expected, got non-hex character "' + u + '" at index ' + s);
      }
      n[i] = o * 16 + a;
    }
    return n;
  }
  F.hexToBytes = gd;
  var wd = async () => {};
  F.nextTick = wd;
  async function bd(e, t, r) {
    let n = Date.now();
    for (let i = 0; i < e; i++) {
      r(i);
      let s = Date.now() - n;
      (s >= 0 && s < t) || (await (0, F.nextTick)(), (n += s));
    }
  }
  F.asyncLoop = bd;
  function pl(e) {
    if (typeof e != "string") throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
    return new Uint8Array(new TextEncoder().encode(e));
  }
  F.utf8ToBytes = pl;
  function vn(e) {
    return typeof e == "string" && (e = pl(e)), (0, Ki.bytes)(e), e;
  }
  F.toBytes = vn;
  function Sd(...e) {
    let t = 0;
    for (let n = 0; n < e.length; n++) {
      let i = e[n];
      (0, Ki.bytes)(i), (t += i.length);
    }
    let r = new Uint8Array(t);
    for (let n = 0, i = 0; n < e.length; n++) {
      let s = e[n];
      r.set(s, i), (i += s.length);
    }
    return r;
  }
  F.concatBytes = Sd;
  var Ui = class {
    clone() {
      return this._cloneInto();
    }
  };
  F.Hash = Ui;
  var vd = {}.toString;
  function _d(e, t) {
    if (t !== void 0 && vd.call(t) !== "[object Object]")
      throw new Error("Options should be object or undefined");
    return Object.assign(e, t);
  }
  F.checkOpts = _d;
  function Od(e) {
    let t = (n) => e().update(vn(n)).digest(),
      r = e();
    return (t.outputLen = r.outputLen), (t.blockLen = r.blockLen), (t.create = () => e()), t;
  }
  F.wrapConstructor = Od;
  function Td(e) {
    let t = (n, i) => e(i).update(vn(n)).digest(),
      r = e({});
    return (t.outputLen = r.outputLen), (t.blockLen = r.blockLen), (t.create = (n) => e(n)), t;
  }
  F.wrapConstructorWithOpts = Td;
  function Ed(e) {
    let t = (n, i) => e(i).update(vn(n)).digest(),
      r = e({});
    return (t.outputLen = r.outputLen), (t.blockLen = r.blockLen), (t.create = (n) => e(n)), t;
  }
  F.wrapXOFConstructorWithOpts = Ed;
  function Nd(e = 32) {
    if (ki.crypto && typeof ki.crypto.getRandomValues == "function")
      return ki.crypto.getRandomValues(new Uint8Array(e));
    throw new Error("crypto.getRandomValues must be defined");
  }
  F.randomBytes = Nd;
});
var Tl = K((ie) => {
  "use strict";
  Object.defineProperty(ie, "__esModule", { value: !0 });
  ie.shake256 =
    ie.shake128 =
    ie.keccak_512 =
    ie.keccak_384 =
    ie.keccak_256 =
    ie.keccak_224 =
    ie.sha3_512 =
    ie.sha3_384 =
    ie.sha3_256 =
    ie.sha3_224 =
    ie.Keccak =
    ie.keccakP =
      void 0;
  var Vt = Ri(),
    Nr = hl(),
    lt = yl(),
    bl = [],
    Sl = [],
    vl = [],
    $d = BigInt(0),
    Er = BigInt(1),
    Pd = BigInt(2),
    Ad = BigInt(7),
    xd = BigInt(256),
    Ld = BigInt(113);
  for (let e = 0, t = Er, r = 1, n = 0; e < 24; e++) {
    ([r, n] = [n, (2 * r + 3 * n) % 5]),
      bl.push(2 * (5 * n + r)),
      Sl.push((((e + 1) * (e + 2)) / 2) % 64);
    let i = $d;
    for (let s = 0; s < 7; s++)
      (t = ((t << Er) ^ ((t >> Ad) * Ld)) % xd), t & Pd && (i ^= Er << ((Er << BigInt(s)) - Er));
    vl.push(i);
  }
  var [Cd, Bd] = (0, Nr.split)(vl, !0),
    gl = (e, t, r) => (r > 32 ? (0, Nr.rotlBH)(e, t, r) : (0, Nr.rotlSH)(e, t, r)),
    wl = (e, t, r) => (r > 32 ? (0, Nr.rotlBL)(e, t, r) : (0, Nr.rotlSL)(e, t, r));
  function _l(e, t = 24) {
    let r = new Uint32Array(10);
    for (let n = 24 - t; n < 24; n++) {
      for (let o = 0; o < 10; o++) r[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
      for (let o = 0; o < 10; o += 2) {
        let a = (o + 8) % 10,
          u = (o + 2) % 10,
          l = r[u],
          c = r[u + 1],
          d = gl(l, c, 1) ^ r[a],
          p = wl(l, c, 1) ^ r[a + 1];
        for (let f = 0; f < 50; f += 10) (e[o + f] ^= d), (e[o + f + 1] ^= p);
      }
      let i = e[2],
        s = e[3];
      for (let o = 0; o < 24; o++) {
        let a = Sl[o],
          u = gl(i, s, a),
          l = wl(i, s, a),
          c = bl[o];
        (i = e[c]), (s = e[c + 1]), (e[c] = u), (e[c + 1] = l);
      }
      for (let o = 0; o < 50; o += 10) {
        for (let a = 0; a < 10; a++) r[a] = e[o + a];
        for (let a = 0; a < 10; a++) e[o + a] ^= ~r[(a + 2) % 10] & r[(a + 4) % 10];
      }
      (e[0] ^= Cd[n]), (e[1] ^= Bd[n]);
    }
    r.fill(0);
  }
  ie.keccakP = _l;
  var $r = class e extends lt.Hash {
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
        (0, Vt.number)(n),
        0 >= this.blockLen || this.blockLen >= 200)
      )
        throw new Error("Sha3 supports only keccak-f1600 function");
      (this.state = new Uint8Array(200)), (this.state32 = (0, lt.u32)(this.state));
    }
    keccak() {
      lt.isLE || (0, lt.byteSwap32)(this.state32),
        _l(this.state32, this.rounds),
        lt.isLE || (0, lt.byteSwap32)(this.state32),
        (this.posOut = 0),
        (this.pos = 0);
    }
    update(t) {
      (0, Vt.exists)(this);
      let { blockLen: r, state: n } = this;
      t = (0, lt.toBytes)(t);
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
      (0, Vt.exists)(this, !1), (0, Vt.bytes)(t), this.finish();
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
      return (0, Vt.number)(t), this.xofInto(new Uint8Array(t));
    }
    digestInto(t) {
      if (((0, Vt.output)(t, this), this.finished)) throw new Error("digest() was already called");
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
  ie.Keccak = $r;
  var yt = (e, t, r) => (0, lt.wrapConstructor)(() => new $r(t, e, r));
  ie.sha3_224 = yt(6, 144, 224 / 8);
  ie.sha3_256 = yt(6, 136, 256 / 8);
  ie.sha3_384 = yt(6, 104, 384 / 8);
  ie.sha3_512 = yt(6, 72, 512 / 8);
  ie.keccak_224 = yt(1, 144, 224 / 8);
  ie.keccak_256 = yt(1, 136, 256 / 8);
  ie.keccak_384 = yt(1, 104, 384 / 8);
  ie.keccak_512 = yt(1, 72, 512 / 8);
  var Ol = (e, t, r) =>
    (0, lt.wrapXOFConstructorWithOpts)(
      (n = {}) => new $r(t, e, n.dkLen === void 0 ? r : n.dkLen, !0),
    );
  ie.shake128 = Ol(31, 168, 128 / 8);
  ie.shake256 = Ol(31, 136, 256 / 8);
});
var Cl = K((aO, gt) => {
  var { sha3_512: jd } = Tl(),
    Nl = 24,
    Pr = 32,
    Mi = (e = 4, t = Math.random) => {
      let r = "";
      for (; r.length < e; ) r = r + Math.floor(t() * 36).toString(36);
      return r;
    };
  function $l(e) {
    let t = 8n,
      r = 0n;
    for (let n of e.values()) {
      let i = BigInt(n);
      r = (r << t) + i;
    }
    return r;
  }
  var Pl = (e = "") => $l(jd(e)).toString(36).slice(1),
    El = Array.from({ length: 26 }, (e, t) => String.fromCharCode(t + 97)),
    Dd = (e) => El[Math.floor(e() * El.length)],
    Al = ({
      globalObj: e = typeof global < "u" ? global : typeof window < "u" ? window : {},
      random: t = Math.random,
    } = {}) => {
      let r = Object.keys(e).toString(),
        n = r.length ? r + Mi(Pr, t) : Mi(Pr, t);
      return Pl(n).substring(0, Pr);
    },
    xl = (e) => () => e++,
    zd = 476782367,
    Ll = ({
      random: e = Math.random,
      counter: t = xl(Math.floor(e() * zd)),
      length: r = Nl,
      fingerprint: n = Al({ random: e }),
    } = {}) =>
      function () {
        let s = Dd(e),
          o = Date.now().toString(36),
          a = t().toString(36),
          u = Mi(r, e),
          l = `${o + u + a + n}`;
        return `${s + Pl(l).substring(1, r)}`;
      },
    Id = Ll(),
    qd = (e, { minLength: t = 2, maxLength: r = Pr } = {}) => {
      let n = e.length,
        i = /^[0-9a-z]+$/;
      try {
        if (typeof e == "string" && n >= t && n <= r && i.test(e)) return !0;
      } finally {
      }
      return !1;
    };
  gt.exports.getConstants = () => ({ defaultLength: Nl, bigLength: Pr });
  gt.exports.init = Ll;
  gt.exports.createId = Id;
  gt.exports.bufToBigInt = $l;
  gt.exports.createCounter = xl;
  gt.exports.createFingerprint = Al;
  gt.exports.isCuid = qd;
});
var wt = K((lO, Ar) => {
  var { createId: Rd, init: Fd, getConstants: Qd, isCuid: kd } = Cl();
  Ar.exports.createId = Rd;
  Ar.exports.init = Fd;
  Ar.exports.getConstants = Qd;
  Ar.exports.isCuid = kd;
});
var ou = K((yO, su) => {
  "use strict";
  var ts = Object.defineProperty,
    Ud = Object.getOwnPropertyDescriptor,
    Kd = Object.getOwnPropertyNames,
    Md = Object.prototype.hasOwnProperty,
    Vd = (e, t) => {
      for (var r in t) ts(e, r, { get: t[r], enumerable: !0 });
    },
    Wd = (e, t, r, n) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of Kd(t))
          !Md.call(e, i) &&
            i !== r &&
            ts(e, i, { get: () => t[i], enumerable: !(n = Ud(t, i)) || n.enumerable });
      return e;
    },
    Hd = (e) => Wd(ts({}, "__esModule", { value: !0 }), e),
    ql = {};
  Vd(ql, {
    course: () => bt,
    courseHistory: () => tu,
    coursePack: () => Wt,
    coursePackRelations: () => Yl,
    courseRelations: () => eu,
    membership: () => ru,
    schemas: () => Rm,
    statement: () => Cr,
    statementRelations: () => Zl,
    userCourseProgress: () => nu,
    userLearnRecord: () => iu,
  });
  su.exports = Hd(ql);
  var Jd = wt(),
    Q = Symbol.for("drizzle:entityKind"),
    uO = Symbol.for("drizzle:hasOwnEntityKind");
  function Ue(e, t) {
    if (!e || typeof e != "object") return !1;
    if (e instanceof t) return !0;
    if (!Object.prototype.hasOwnProperty.call(t, Q))
      throw new Error(
        `Class "${t.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`,
      );
    let r = e.constructor;
    if (r)
      for (; r; ) {
        if (Q in r && r[Q] === t[Q]) return !0;
        r = Object.getPrototypeOf(r);
      }
    return !1;
  }
  var rs = class {
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
      static [Q] = "Column";
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
    Gd = class {
      static [Q] = "ColumnBuilder";
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
    Vi = Symbol.for("drizzle:Name"),
    Wi = Symbol.for("drizzle:Schema"),
    Bl = Symbol.for("drizzle:Columns"),
    Hi = Symbol.for("drizzle:OriginalName"),
    Ji = Symbol.for("drizzle:BaseName"),
    jl = Symbol.for("drizzle:IsAlias"),
    Dl = Symbol.for("drizzle:ExtraConfigBuilder"),
    Xd = Symbol.for("drizzle:IsDrizzleTable"),
    tt = class {
      static [Q] = "Table";
      static Symbol = {
        Name: Vi,
        Schema: Wi,
        OriginalName: Hi,
        Columns: Bl,
        BaseName: Ji,
        IsAlias: jl,
        ExtraConfigBuilder: Dl,
      };
      [Vi];
      [Hi];
      [Wi];
      [Bl];
      [Ji];
      [jl] = !1;
      [Dl] = void 0;
      [Xd] = !0;
      constructor(e, t, r) {
        (this[Vi] = this[Hi] = e), (this[Wi] = t), (this[Ji] = r);
      }
    },
    Yi = Symbol.for("drizzle:PgInlineForeignKeys"),
    Lr = class extends tt {
      static [Q] = "PgTable";
      static Symbol = Object.assign({}, tt.Symbol, { InlineForeignKeys: Yi });
      [Yi] = [];
      [tt.Symbol.ExtraConfigBuilder] = void 0;
    };
  function Yd(e, t, r, n, i = e) {
    let s = new Lr(e, n, i),
      o = Object.fromEntries(
        Object.entries(t).map(([u, l]) => {
          let c = l,
            d = c.build(s);
          return s[Yi].push(...c.buildForeignKeys(d, s)), [u, d];
        }),
      ),
      a = Object.assign(s, o);
    return (a[tt.Symbol.Columns] = o), r && (a[Lr.Symbol.ExtraConfigBuilder] = r), a;
  }
  var $t = (e, t, r) => Yd(e, t, r, void 0),
    Zd = class {
      static [Q] = "PgForeignKeyBuilder";
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
        return new em(e, this);
      }
    },
    em = class {
      constructor(e, t) {
        (this.table = e),
          (this.reference = t.reference),
          (this.onUpdate = t._onUpdate),
          (this.onDelete = t._onDelete);
      }
      static [Q] = "PgForeignKey";
      reference;
      onUpdate;
      onDelete;
      getName() {
        let { name: e, columns: t, foreignColumns: r } = this.reference(),
          n = t.map((o) => o.name),
          i = r.map((o) => o.name),
          s = [this.table[Lr.Symbol.Name], ...n, r[0].table[Lr.Symbol.Name], ...i];
        return e ?? `${s.join("_")}_fk`;
      }
    };
  function Rl(e, ...t) {
    return e(...t);
  }
  function ns(e) {
    return new rm(e);
  }
  function Fl(e, t) {
    return `${e[Lr.Symbol.Name]}_${t.join("_")}_unique`;
  }
  var tm = class {
      constructor(e, t) {
        (this.name = t), (this.columns = e);
      }
      static [Q] = "PgUniqueConstraintBuilder";
      columns;
      nullsNotDistinctConfig = !1;
      nullsNotDistinct() {
        return (this.nullsNotDistinctConfig = !0), this;
      }
      build(e) {
        return new nm(e, this.columns, this.nullsNotDistinctConfig, this.name);
      }
    },
    rm = class {
      static [Q] = "PgUniqueOnConstraintBuilder";
      name;
      constructor(e) {
        this.name = e;
      }
      on(...e) {
        return new tm(e, this.name);
      }
    },
    nm = class {
      constructor(e, t, r, n) {
        (this.table = e),
          (this.columns = t),
          (this.name =
            n ??
            Fl(
              this.table,
              this.columns.map((i) => i.name),
            )),
          (this.nullsNotDistinct = r);
      }
      static [Q] = "PgUniqueConstraint";
      columns;
      name;
      nullsNotDistinct = !1;
      getName() {
        return this.name;
      }
    };
  function zl(e, t, r) {
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
  function Ql(e, t = 0) {
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
        let [u, l] = zl(e, n + 1, !0);
        r.push(u), (n = l);
        continue;
      }
      if (s === "}") return [r, n + 1];
      if (s === "{") {
        let [u, l] = Ql(e, n + 1);
        r.push(u), (n = l);
        continue;
      }
      let [o, a] = zl(e, n, !1);
      r.push(o), (n = a);
    }
    return [r, n];
  }
  function im(e) {
    let [t] = Ql(e, 1);
    return t;
  }
  function kl(e) {
    return `{${e.map((t) => (Array.isArray(t) ? kl(t) : typeof t == "string" ? `"${t.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"` : `${t}`)).join(",")}}`;
  }
  var Pt = class extends Gd {
      foreignKeyConfigs = [];
      static [Q] = "PgColumnBuilder";
      array(e) {
        return new sm(this.config.name, this, e);
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
          Rl(
            (i, s) => {
              let o = new Zd(() => {
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
    rt = class extends rs {
      constructor(e, t) {
        t.uniqueName || (t.uniqueName = Fl(e, [t.name])), super(e, t), (this.table = e);
      }
      static [Q] = "PgColumn";
    },
    sm = class extends Pt {
      static [Q] = "PgArrayBuilder";
      constructor(e, t, r) {
        super(e, "array", "PgArray"), (this.config.baseBuilder = t), (this.config.size = r);
      }
      build(e) {
        let t = this.config.baseBuilder.build(e);
        return new om(e, this.config, t);
      }
    },
    om = class Ul extends rt {
      constructor(t, r, n, i) {
        super(t, r), (this.baseColumn = n), (this.range = i), (this.size = r.size);
      }
      size;
      static [Q] = "PgArray";
      getSQLType() {
        return `${this.baseColumn.getSQLType()}[${typeof this.size == "number" ? this.size : ""}]`;
      }
      mapFromDriverValue(t) {
        return (
          typeof t == "string" && (t = im(t)), t.map((r) => this.baseColumn.mapFromDriverValue(r))
        );
      }
      mapToDriverValue(t, r = !1) {
        let n = t.map((i) =>
          i === null
            ? null
            : Ue(this.baseColumn, Ul)
              ? this.baseColumn.mapToDriverValue(i, !0)
              : this.baseColumn.mapToDriverValue(i),
        );
        return r ? n : kl(n);
      }
    },
    Il = Symbol.for("drizzle:isPgEnum");
  function am(e) {
    return !!e && typeof e == "function" && Il in e && e[Il] === !0;
  }
  var cO = class extends Pt {
      static [Q] = "PgEnumColumnBuilder";
      constructor(e, t) {
        super(e, "string", "PgEnumColumn"), (this.config.enum = t);
      }
      build(e) {
        return new lm(e, this.config);
      }
    },
    lm = class extends rt {
      static [Q] = "PgEnumColumn";
      enum = this.config.enum;
      enumValues = this.config.enum.enumValues;
      constructor(e, t) {
        super(e, t), (this.enum = t.enum);
      }
      getSQLType() {
        return this.enum.enumName;
      }
    },
    is = class {
      static [Q] = "Subquery";
      constructor(e, t, r, n = !1) {
        this._ = { brand: "Subquery", sql: e, selectedFields: t, alias: r, isWith: n };
      }
    },
    fO = class extends is {
      static [Q] = "WithSubquery";
    },
    um = "0.30.10",
    Gi,
    Xi,
    cm = {
      startActiveSpan(e, t) {
        return Gi
          ? (Xi || (Xi = Gi.trace.getTracer("drizzle-orm", um)),
            Rl(
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
              Gi,
              Xi,
            ))
          : t();
      },
    },
    _n = Symbol.for("drizzle:ViewBaseConfig"),
    hO = class {
      static [Q] = "FakePrimitiveParam";
    };
  function fm(e) {
    return e != null && typeof e.getSQL == "function";
  }
  function hm(e) {
    let t = { sql: "", params: [] };
    for (let r of e)
      (t.sql += r.sql),
        t.params.push(...r.params),
        r.typings?.length && (t.typings || (t.typings = []), t.typings.push(...r.typings));
    return t;
  }
  var He = class {
      static [Q] = "StringChunk";
      value;
      constructor(e) {
        this.value = Array.isArray(e) ? e : [e];
      }
      getSQL() {
        return new De([this]);
      }
    },
    De = class xr {
      constructor(t) {
        this.queryChunks = t;
      }
      static [Q] = "SQL";
      decoder = Kl;
      shouldInlineParams = !1;
      append(t) {
        return this.queryChunks.push(...t.queryChunks), this;
      }
      toQuery(t) {
        return cm.startActiveSpan("drizzle.buildSQL", (r) => {
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
            paramStartIndex: u,
          } = n;
        return hm(
          t.map((l) => {
            if (Ue(l, He)) return { sql: l.value.join(""), params: [] };
            if (Ue(l, Zi)) return { sql: i(l.value), params: [] };
            if (l === void 0) return { sql: "", params: [] };
            if (Array.isArray(l)) {
              let c = [new He("(")];
              for (let [d, p] of l.entries()) c.push(p), d < l.length - 1 && c.push(new He(", "));
              return c.push(new He(")")), this.buildQueryFromSourceParams(c, n);
            }
            if (Ue(l, xr))
              return this.buildQueryFromSourceParams(l.queryChunks, {
                ...n,
                inlineParams: a || l.shouldInlineParams,
              });
            if (Ue(l, tt)) {
              let c = l[tt.Symbol.Schema],
                d = l[tt.Symbol.Name];
              return { sql: c === void 0 ? i(d) : i(c) + "." + i(d), params: [] };
            }
            if (Ue(l, rs)) return { sql: i(l.table[tt.Symbol.Name]) + "." + i(l.name), params: [] };
            if (Ue(l, dm)) {
              let c = l[_n].schema,
                d = l[_n].name;
              return { sql: c === void 0 ? i(d) : i(c) + "." + i(d), params: [] };
            }
            if (Ue(l, Vl)) {
              let c = l.value === null ? null : l.encoder.mapToDriverValue(l.value);
              if (Ue(c, xr)) return this.buildQueryFromSourceParams([c], n);
              if (a) return { sql: this.mapInlineParam(c, n), params: [] };
              let d;
              return (
                o !== void 0 && (d = [o(l.encoder)]),
                { sql: s(u.value++, c), params: [c], typings: d }
              );
            }
            return Ue(l, Wl)
              ? { sql: s(u.value++, l), params: [l] }
              : Ue(l, xr.Aliased) && l.fieldAlias !== void 0
                ? { sql: i(l.fieldAlias), params: [] }
                : Ue(l, is)
                  ? l._.isWith
                    ? { sql: i(l._.alias), params: [] }
                    : this.buildQueryFromSourceParams(
                        [new He("("), l._.sql, new He(") "), new Zi(l._.alias)],
                        n,
                      )
                  : am(l)
                    ? l.schema
                      ? { sql: i(l.schema) + "." + i(l.enumName), params: [] }
                      : { sql: i(l.enumName), params: [] }
                    : fm(l)
                      ? this.buildQueryFromSourceParams([new He("("), l.getSQL(), new He(")")], n)
                      : a
                        ? { sql: this.mapInlineParam(l, n), params: [] }
                        : { sql: s(u.value++, l), params: [l] };
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
        return t === void 0 ? this : new xr.Aliased(this, t);
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
    Zi = class {
      constructor(e) {
        this.value = e;
      }
      static [Q] = "Name";
      brand;
      getSQL() {
        return new De([this]);
      }
    },
    Kl = { mapFromDriverValue: (e) => e },
    Ml = { mapToDriverValue: (e) => e },
    dO = { ...Kl, ...Ml },
    Vl = class {
      constructor(e, t = Ml) {
        (this.value = e), (this.encoder = t);
      }
      static [Q] = "Param";
      brand;
      getSQL() {
        return new De([this]);
      }
    };
  function es(e, ...t) {
    let r = [];
    (t.length > 0 || (e.length > 0 && e[0] !== "")) && r.push(new He(e[0]));
    for (let [n, i] of t.entries()) r.push(i, new He(e[n + 1]));
    return new De(r);
  }
  ((e) => {
    function t() {
      return new De([]);
    }
    e.empty = t;
    function r(u) {
      return new De(u);
    }
    e.fromList = r;
    function n(u) {
      return new De([new He(u)]);
    }
    e.raw = n;
    function i(u, l) {
      let c = [];
      for (let [d, p] of u.entries()) d > 0 && l !== void 0 && c.push(l), c.push(p);
      return new De(c);
    }
    e.join = i;
    function s(u) {
      return new Zi(u);
    }
    e.identifier = s;
    function o(u) {
      return new Wl(u);
    }
    e.placeholder = o;
    function a(u, l) {
      return new Vl(u, l);
    }
    e.param = a;
  })(es || (es = {}));
  ((e) => {
    class t {
      constructor(n, i) {
        (this.sql = n), (this.fieldAlias = i);
      }
      static [Q] = "SQL.Aliased";
      isSelectionField = !1;
      getSQL() {
        return this.sql;
      }
      clone() {
        return new t(this.sql, this.fieldAlias);
      }
    }
    e.Aliased = t;
  })(De || (De = {}));
  var Wl = class {
      constructor(e) {
        this.name = e;
      }
      static [Q] = "Placeholder";
      getSQL() {
        return new De([this]);
      }
    },
    dm = class {
      static [Q] = "View";
      [_n];
      constructor({ name: e, schema: t, selectedFields: r, query: n }) {
        this[_n] = {
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
        return new De([this]);
      }
    };
  rs.prototype.getSQL = function () {
    return new De([this]);
  };
  tt.prototype.getSQL = function () {
    return new De([this]);
  };
  is.prototype.getSQL = function () {
    return new De([this]);
  };
  var Hl = class {
      constructor(e, t, r) {
        (this.sourceTable = e),
          (this.referencedTable = t),
          (this.relationName = r),
          (this.referencedTableName = t[tt.Symbol.Name]);
      }
      static [Q] = "Relation";
      referencedTableName;
      fieldName;
    },
    mm = class {
      constructor(e, t) {
        (this.table = e), (this.config = t);
      }
      static [Q] = "Relations";
    },
    mO = class Jl extends Hl {
      constructor(t, r, n, i) {
        super(t, r, n?.relationName), (this.config = n), (this.isNullable = i);
      }
      static [Q] = "One";
      withFieldName(t) {
        let r = new Jl(this.sourceTable, this.referencedTable, this.config, this.isNullable);
        return (r.fieldName = t), r;
      }
    },
    pO = class Gl extends Hl {
      constructor(t, r, n) {
        super(t, r, n?.relationName), (this.config = n);
      }
      static [Q] = "Many";
      withFieldName(t) {
        let r = new Gl(this.sourceTable, this.referencedTable, this.config);
        return (r.fieldName = t), r;
      }
    };
  function ss(e, t) {
    return new mm(e, (r) =>
      Object.fromEntries(Object.entries(t(r)).map(([n, i]) => [n, i.withFieldName(n)])),
    );
  }
  var pm = class extends Pt {
      static [Q] = "PgBooleanBuilder";
      constructor(e) {
        super(e, "boolean", "PgBoolean");
      }
      build(e) {
        return new ym(e, this.config);
      }
    },
    ym = class extends rt {
      static [Q] = "PgBoolean";
      getSQLType() {
        return "boolean";
      }
    };
  function Xl(e) {
    return new pm(e);
  }
  var On = class extends Pt {
      static [Q] = "PgDateColumnBaseBuilder";
      defaultNow() {
        return this.default(es`now()`);
      }
    },
    gm = class extends On {
      static [Q] = "PgDateBuilder";
      constructor(e) {
        super(e, "date", "PgDate");
      }
      build(e) {
        return new wm(e, this.config);
      }
    },
    wm = class extends rt {
      static [Q] = "PgDate";
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
    bm = class extends On {
      static [Q] = "PgDateStringBuilder";
      constructor(e) {
        super(e, "string", "PgDateString");
      }
      build(e) {
        return new Sm(e, this.config);
      }
    },
    Sm = class extends rt {
      static [Q] = "PgDateString";
      getSQLType() {
        return "date";
      }
    };
  function vm(e, t) {
    return t?.mode === "date" ? new gm(e) : new bm(e);
  }
  var _m = class extends Pt {
      static [Q] = "PgIntegerBuilder";
      constructor(e) {
        super(e, "number", "PgInteger");
      }
      build(e) {
        return new Om(e, this.config);
      }
    },
    Om = class extends rt {
      static [Q] = "PgInteger";
      getSQLType() {
        return "integer";
      }
      mapFromDriverValue(e) {
        return typeof e == "string" ? Number.parseInt(e) : e;
      }
    };
  function Ht(e) {
    return new _m(e);
  }
  var Tm = class extends Pt {
      static [Q] = "PgTextBuilder";
      constructor(e, t) {
        super(e, "string", "PgText"), (this.config.enumValues = t.enum);
      }
      build(e) {
        return new Em(e, this.config);
      }
    },
    Em = class extends rt {
      static [Q] = "PgText";
      enumValues = this.config.enumValues;
      getSQLType() {
        return "text";
      }
    };
  function ue(e, t = {}) {
    return new Tm(e, t);
  }
  var Nm = class extends On {
      static [Q] = "PgTimestampBuilder";
      constructor(e, t, r) {
        super(e, "date", "PgTimestamp"),
          (this.config.withTimezone = t),
          (this.config.precision = r);
      }
      build(e) {
        return new $m(e, this.config);
      }
    },
    $m = class extends rt {
      static [Q] = "PgTimestamp";
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
    Pm = class extends On {
      static [Q] = "PgTimestampStringBuilder";
      constructor(e, t, r) {
        super(e, "string", "PgTimestampString"),
          (this.config.withTimezone = t),
          (this.config.precision = r);
      }
      build(e) {
        return new Am(e, this.config);
      }
    },
    Am = class extends rt {
      static [Q] = "PgTimestampString";
      withTimezone;
      precision;
      constructor(e, t) {
        super(e, t), (this.withTimezone = t.withTimezone), (this.precision = t.precision);
      }
      getSQLType() {
        return `timestamp${this.precision === void 0 ? "" : `(${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
      }
    };
  function xe(e, t = {}) {
    return t.mode === "string"
      ? new Pm(e, t.withTimezone ?? !1, t.precision)
      : new Nm(e, t.withTimezone ?? !1, t.precision);
  }
  var xm = class extends Pt {
      static [Q] = "PgVarcharBuilder";
      constructor(e, t) {
        super(e, "string", "PgVarchar"),
          (this.config.length = t.length),
          (this.config.enumValues = t.enum);
      }
      build(e) {
        return new Lm(e, this.config);
      }
    },
    Lm = class extends rt {
      static [Q] = "PgVarchar";
      length = this.config.length;
      enumValues = this.config.enumValues;
      getSQLType() {
        return this.length === void 0 ? "varchar" : `varchar(${this.length})`;
      }
    };
  function Cm(e, t = {}) {
    return new xm(e, t);
  }
  var Bm = wt(),
    Wt = $t("course_packs", {
      id: ue("id")
        .primaryKey()
        .$defaultFn(() => (0, Bm.createId)()),
      order: Ht("order").notNull(),
      title: ue("title").notNull(),
      description: ue("description").default(""),
      isFree: Xl("is_free"),
      cover: ue("cover"),
      createdAt: xe("created_at").notNull().defaultNow(),
      updatedAt: xe("updated_at").$onUpdateFn(() => new Date()),
    }),
    Yl = ss(Wt, ({ many: e }) => ({ courses: e(bt) })),
    jm = wt(),
    Cr = $t("statements", {
      id: ue("id")
        .primaryKey()
        .$defaultFn(() => (0, jm.createId)()),
      order: Ht("order").notNull(),
      chinese: ue("chinese").notNull(),
      english: ue("english").notNull(),
      soundmark: ue("soundmark").notNull(),
      courseId: ue("course_id")
        .notNull()
        .references(() => bt.id),
      createdAt: xe("created_at").notNull().defaultNow(),
      updatedAt: xe("updated_at").$onUpdateFn(() => new Date()),
    }),
    Zl = ss(Cr, ({ one: e }) => ({
      course: e(bt, { fields: [Cr.courseId], references: [bt.id] }),
    })),
    bt = $t("courses", {
      id: ue("id")
        .primaryKey()
        .$defaultFn(() => (0, Jd.createId)()),
      title: Cm("title", { length: 256 }).notNull(),
      description: ue("description").default(""),
      video: ue("video").default(""),
      order: Ht("order").notNull(),
      coursePackId: ue("course_pack_id")
        .notNull()
        .references(() => Wt.id),
      createdAt: xe("created_at").notNull().defaultNow(),
      updatedAt: xe("updated_at").$onUpdateFn(() => new Date()),
    }),
    eu = ss(bt, ({ one: e, many: t }) => ({
      statements: t(Cr),
      coursePack: e(Wt, { fields: [bt.coursePackId], references: [Wt.id] }),
    })),
    Dm = wt(),
    tu = $t(
      "course_history",
      {
        id: ue("id")
          .primaryKey()
          .$defaultFn(() => (0, Dm.createId)()),
        userId: ue("user_id").notNull(),
        courseId: ue("course_id").notNull(),
        coursePackId: ue("course_pack_id").notNull(),
        completionCount: Ht("completion_count").notNull(),
        createdAt: xe("created_at").notNull().defaultNow(),
        updatedAt: xe("updated_at").$onUpdateFn(() => new Date()),
      },
      (e) => ({ unq: ns().on(e.userId, e.courseId, e.coursePackId) }),
    ),
    zm = wt(),
    ru = $t("memberships", {
      id: ue("id")
        .primaryKey()
        .$defaultFn(() => (0, zm.createId)()),
      userId: ue("user_id").notNull(),
      start_date: xe("start_date").notNull(),
      end_date: xe("end_date").notNull(),
      isActive: Xl("isActive"),
      createdAt: xe("created_at").notNull().defaultNow(),
      updatedAt: xe("updated_at").$onUpdateFn(() => new Date()),
    }),
    Im = wt(),
    nu = $t(
      "user_course_progress",
      {
        id: ue("id")
          .primaryKey()
          .$defaultFn(() => (0, Im.createId)()),
        userId: ue("user_id").notNull(),
        coursePackId: ue("course_pack_id").notNull(),
        courseId: ue("course_id").notNull(),
        statementIndex: Ht("statement_index").notNull(),
        createdAt: xe("created_at").notNull().defaultNow(),
        updatedAt: xe("updated_at").$onUpdateFn(() => new Date()),
      },
      (e) => ({ unq: ns().on(e.userId, e.coursePackId) }),
    ),
    qm = wt(),
    iu = $t(
      "user_learn_record",
      {
        id: ue("id")
          .primaryKey()
          .$defaultFn(() => (0, qm.createId)()),
        userId: ue("user_id").notNull(),
        count: Ht("count").notNull().default(0),
        day: vm("day").notNull(),
        createdAt: xe("created_at").notNull().defaultNow(),
        updatedAt: xe("updated_at").$onUpdateFn(() => new Date()),
      },
      (e) => ({ unq: ns().on(e.userId, e.day) }),
    ),
    Rm = {
      course: bt,
      statement: Cr,
      statementRelations: Zl,
      membership: ru,
      userCourseProgress: nu,
      courseHistory: tu,
      userLearnRecord: iu,
      coursePack: Wt,
      courseRelations: eu,
      coursePackRelations: Yl,
    };
});
var as = K((iT, uu) => {
  "use strict";
  var Br = (e) => e && typeof e.message == "string",
    os = (e) => {
      if (!e) return;
      let t = e.cause;
      if (typeof t == "function") {
        let r = e.cause();
        return Br(r) ? r : void 0;
      } else return Br(t) ? t : void 0;
    },
    au = (e, t) => {
      if (!Br(e)) return "";
      let r = e.stack || "";
      if (t.has(e))
        return (
          r +
          `
causes have become circular...`
        );
      let n = os(e);
      return n
        ? (t.add(e),
          r +
            `
caused by: ` +
            au(n, t))
        : r;
    },
    Fm = (e) => au(e, new Set()),
    lu = (e, t, r) => {
      if (!Br(e)) return "";
      let n = r ? "" : e.message || "";
      if (t.has(e)) return n + ": ...";
      let i = os(e);
      if (i) {
        t.add(e);
        let s = typeof e.cause == "function";
        return n + (s ? "" : ": ") + lu(i, t, s);
      } else return n;
    },
    Qm = (e) => lu(e, new Set());
  uu.exports = { isErrorLike: Br, getErrorCause: os, stackWithCauses: Fm, messageWithCauses: Qm };
});
var ls = K((sT, fu) => {
  "use strict";
  var km = Symbol("circular-ref-tag"),
    Tn = Symbol("pino-raw-err-ref"),
    cu = Object.create(
      {},
      {
        type: { enumerable: !0, writable: !0, value: void 0 },
        message: { enumerable: !0, writable: !0, value: void 0 },
        stack: { enumerable: !0, writable: !0, value: void 0 },
        aggregateErrors: { enumerable: !0, writable: !0, value: void 0 },
        raw: {
          enumerable: !1,
          get: function () {
            return this[Tn];
          },
          set: function (e) {
            this[Tn] = e;
          },
        },
      },
    );
  Object.defineProperty(cu, Tn, { writable: !0, value: {} });
  fu.exports = { pinoErrProto: cu, pinoErrorSymbols: { seen: km, rawSymbol: Tn } };
});
var mu = K((oT, du) => {
  "use strict";
  du.exports = cs;
  var { messageWithCauses: Um, stackWithCauses: Km, isErrorLike: hu } = as(),
    { pinoErrProto: Mm, pinoErrorSymbols: Vm } = ls(),
    { seen: us } = Vm,
    { toString: Wm } = Object.prototype;
  function cs(e) {
    if (!hu(e)) return e;
    e[us] = void 0;
    let t = Object.create(Mm);
    (t.type = Wm.call(e.constructor) === "[object Function]" ? e.constructor.name : e.name),
      (t.message = Um(e)),
      (t.stack = Km(e)),
      Array.isArray(e.errors) && (t.aggregateErrors = e.errors.map((r) => cs(r)));
    for (let r in e)
      if (t[r] === void 0) {
        let n = e[r];
        hu(n)
          ? r !== "cause" && !Object.prototype.hasOwnProperty.call(n, us) && (t[r] = cs(n))
          : (t[r] = n);
      }
    return delete e[us], (t.raw = e), t;
  }
});
var yu = K((aT, pu) => {
  "use strict";
  pu.exports = Nn;
  var { isErrorLike: fs } = as(),
    { pinoErrProto: Hm, pinoErrorSymbols: Jm } = ls(),
    { seen: En } = Jm,
    { toString: Gm } = Object.prototype;
  function Nn(e) {
    if (!fs(e)) return e;
    e[En] = void 0;
    let t = Object.create(Hm);
    (t.type = Gm.call(e.constructor) === "[object Function]" ? e.constructor.name : e.name),
      (t.message = e.message),
      (t.stack = e.stack),
      Array.isArray(e.errors) && (t.aggregateErrors = e.errors.map((r) => Nn(r))),
      fs(e.cause) && !Object.prototype.hasOwnProperty.call(e.cause, En) && (t.cause = Nn(e.cause));
    for (let r in e)
      if (t[r] === void 0) {
        let n = e[r];
        fs(n) ? Object.prototype.hasOwnProperty.call(n, En) || (t[r] = Nn(n)) : (t[r] = n);
      }
    return delete e[En], (t.raw = e), t;
  }
});
var Su = K((lT, bu) => {
  "use strict";
  bu.exports = { mapHttpRequest: Xm, reqSerializer: wu };
  var hs = Symbol("pino-raw-req-ref"),
    gu = Object.create(
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
            return this[hs];
          },
          set: function (e) {
            this[hs] = e;
          },
        },
      },
    );
  Object.defineProperty(gu, hs, { writable: !0, value: {} });
  function wu(e) {
    let t = e.info || e.socket,
      r = Object.create(gu);
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
  function Xm(e) {
    return { req: wu(e) };
  }
});
var Tu = K((uT, Ou) => {
  "use strict";
  Ou.exports = { mapHttpResponse: Ym, resSerializer: _u };
  var ds = Symbol("pino-raw-res-ref"),
    vu = Object.create(
      {},
      {
        statusCode: { enumerable: !0, writable: !0, value: 0 },
        headers: { enumerable: !0, writable: !0, value: "" },
        raw: {
          enumerable: !1,
          get: function () {
            return this[ds];
          },
          set: function (e) {
            this[ds] = e;
          },
        },
      },
    );
  Object.defineProperty(vu, ds, { writable: !0, value: {} });
  function _u(e) {
    let t = Object.create(vu);
    return (
      (t.statusCode = e.headersSent ? e.statusCode : null),
      (t.headers = e.getHeaders ? e.getHeaders() : e._headers),
      (t.raw = e),
      t
    );
  }
  function Ym(e) {
    return { res: _u(e) };
  }
});
var ps = K((cT, Eu) => {
  "use strict";
  var ms = mu(),
    Zm = yu(),
    $n = Su(),
    Pn = Tu();
  Eu.exports = {
    err: ms,
    errWithCause: Zm,
    mapHttpRequest: $n.mapHttpRequest,
    mapHttpResponse: Pn.mapHttpResponse,
    req: $n.reqSerializer,
    res: Pn.resSerializer,
    wrapErrorSerializer: function (t) {
      return t === ms
        ? t
        : function (n) {
            return t(ms(n));
          };
    },
    wrapRequestSerializer: function (t) {
      return t === $n.reqSerializer
        ? t
        : function (n) {
            return t($n.reqSerializer(n));
          };
    },
    wrapResponseSerializer: function (t) {
      return t === Pn.resSerializer
        ? t
        : function (n) {
            return t(Pn.resSerializer(n));
          };
    },
  };
});
var ys = K((fT, Nu) => {
  "use strict";
  function ep(e, t) {
    return t;
  }
  Nu.exports = function () {
    let t = Error.prepareStackTrace;
    Error.prepareStackTrace = ep;
    let r = new Error().stack;
    if (((Error.prepareStackTrace = t), !Array.isArray(r))) return;
    let n = r.slice(2),
      i = [];
    for (let s of n) s && i.push(s.getFileName());
    return i;
  };
});
var Pu = K((hT, $u) => {
  "use strict";
  $u.exports = tp;
  function tp(e = {}) {
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
var An = K((dT, Au) => {
  "use strict";
  Au.exports = /[^.[\]]+|\[((?:.)*?)\]/g;
});
var Lu = K((mT, xu) => {
  "use strict";
  var rp = An();
  xu.exports = np;
  function np({ paths: e }) {
    let t = [];
    var r = 0;
    let n = e.reduce(function (i, s, o) {
      var a = s.match(rp).map((c) => c.replace(/'|"|`/g, ""));
      let u = s[0] === "[";
      a = a.map((c) => (c[0] === "[" ? c.substr(1, c.length - 2) : c));
      let l = a.indexOf("*");
      if (l > -1) {
        let c = a.slice(0, l),
          d = c.join("."),
          p = a.slice(l + 1, a.length),
          f = p.length > 0;
        r++, t.push({ before: c, beforeStr: d, after: p, nested: f });
      } else
        i[s] = {
          path: a,
          val: void 0,
          precensored: !1,
          circle: "",
          escPath: JSON.stringify(s),
          leadingBracket: u,
        };
      return i;
    }, {});
    return { wildcards: t, wcLen: r, secret: n };
  }
});
var Bu = K((pT, Cu) => {
  "use strict";
  var ip = An();
  Cu.exports = sp;
  function sp(
    { secret: e, serialize: t, wcLen: r, strict: n, isCensorFct: i, censorFctTakesPath: s },
    o,
  ) {
    let a = Function(
      "o",
      `
    if (typeof o !== 'object' || o == null) {
      ${up(n, t)}
    }
    const { censor, secret } = this
    const originalSecret = {}
    const secretKeys = Object.keys(secret)
    for (var i = 0; i < secretKeys.length; i++) {
      originalSecret[secretKeys[i]] = secret[secretKeys[i]]
    }

    ${op(e, i, s)}
    this.compileRestore()
    ${ap(r > 0, i, s)}
    this.secret = originalSecret
    ${lp(t)}
  `,
    ).bind(o);
    return (a.state = o), t === !1 && (a.restore = (u) => o.restore(u)), a;
  }
  function op(e, t, r) {
    return Object.keys(e).map((n) => {
      let { escPath: i, leadingBracket: s, path: o } = e[n],
        a = s ? 1 : 0,
        u = s ? "" : ".",
        l = [];
      for (var c; (c = ip.exec(n)) !== null; ) {
        let [, m] = c,
          { index: w, input: S } = c;
        w > a && l.push(S.substring(0, w - (m ? 0 : 1)));
      }
      var d = l.map((m) => `o${u}${m}`).join(" && ");
      d.length === 0 ? (d += `o${u}${n} != null`) : (d += ` && o${u}${n} != null`);
      let p = `
      switch (true) {
        ${l.reverse().map(
          (m) => `
          case o${u}${m} === censor:
            secret[${i}].circle = ${JSON.stringify(m)}
            break
        `,
        ).join(`
`)}
      }
    `,
        f = r ? `val, ${JSON.stringify(o)}` : "val";
      return `
      if (${d}) {
        const val = o${u}${n}
        if (val === censor) {
          secret[${i}].precensored = true
        } else {
          secret[${i}].val = val
          o${u}${n} = ${t ? `censor(${f})` : "censor"}
          ${p}
        }
      }
    `;
    }).join(`
`);
  }
  function ap(e, t, r) {
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
  function lp(e) {
    return e === !1
      ? "return o"
      : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `;
  }
  function up(e, t) {
    return e === !0
      ? "throw Error('fast-redact: primitives cannot be redacted')"
      : t === !1
        ? "return o"
        : "return this.serialize(o)";
  }
});
var ws = K((yT, zu) => {
  "use strict";
  zu.exports = { groupRedact: fp, groupRestore: cp, nestedRedact: dp, nestedRestore: hp };
  function cp({ keys: e, values: t, target: r }) {
    if (r == null || typeof r == "string") return;
    let n = e.length;
    for (var i = 0; i < n; i++) {
      let s = e[i];
      r[s] = t[i];
    }
  }
  function fp(e, t, r, n, i) {
    let s = ju(e, t);
    if (s == null || typeof s == "string") return { keys: null, values: null, target: s, flat: !0 };
    let o = Object.keys(s),
      a = o.length,
      u = t.length,
      l = i ? [...t] : void 0,
      c = new Array(a);
    for (var d = 0; d < a; d++) {
      let p = o[d];
      (c[d] = s[p]), i ? ((l[u] = p), (s[p] = r(s[p], l))) : n ? (s[p] = r(s[p])) : (s[p] = r);
    }
    return { keys: o, values: c, target: s, flat: !0 };
  }
  function hp(e) {
    for (let t = 0; t < e.length; t++) {
      let { target: r, path: n, value: i } = e[t],
        s = r;
      for (let o = n.length - 1; o > 0; o--) s = s[n[o]];
      s[n[0]] = i;
    }
  }
  function dp(e, t, r, n, i, s, o) {
    let a = ju(t, r);
    if (a == null) return;
    let u = Object.keys(a),
      l = u.length;
    for (var c = 0; c < l; c++) {
      let d = u[c];
      mp(e, a, d, r, n, i, s, o);
    }
    return e;
  }
  function gs(e, t) {
    return e != null
      ? "hasOwn" in Object
        ? Object.hasOwn(e, t)
        : Object.prototype.hasOwnProperty.call(e, t)
      : !1;
  }
  function mp(e, t, r, n, i, s, o, a) {
    let u = i.length,
      l = u - 1,
      c = r;
    var d = -1,
      p,
      f,
      m,
      w = null,
      S = null,
      O,
      v,
      P = !1,
      $ = 0,
      x = 0,
      j = pp();
    if (((m = p = t[r]), typeof p == "object")) {
      for (
        ;
        p != null &&
        ++d < u &&
        ((x += 1), (r = i[d]), (w = m), !(r !== "*" && !S && !(typeof p == "object" && r in p)));

      )
        if (!(r === "*" && (S === "*" && (P = !0), (S = r), d !== l))) {
          if (S) {
            let L = Object.keys(p);
            for (var C = 0; C < L.length; C++) {
              let k = L[C];
              if (((v = p[k]), (O = r === "*"), P))
                (j = ut(j, k, x)),
                  ($ = d),
                  (m = Du(v, $ - 1, r, n, i, s, o, a, c, p, f, m, O, k, d, l, j, e, t[c], x + 1));
              else if (O || (typeof v == "object" && v !== null && r in v)) {
                if (
                  (O ? (m = v) : (m = v[r]),
                  (f = d !== l ? m : o ? (a ? s(m, [...n, c, ...i]) : s(m)) : s),
                  O)
                ) {
                  let T = jr(ut(j, k, x), m, t[c]);
                  e.push(T), (p[k] = f);
                } else if (v[r] !== f)
                  if ((f === void 0 && s !== void 0) || (gs(v, r) && f === m)) j = ut(j, k, x);
                  else {
                    j = ut(j, k, x);
                    let T = jr(ut(j, r, x + 1), m, t[c]);
                    e.push(T), (v[r] = f);
                  }
              }
            }
            S = null;
          } else {
            if (
              ((m = p[r]),
              (j = ut(j, r, x)),
              (f = d !== l ? m : o ? (a ? s(m, [...n, c, ...i]) : s(m)) : s),
              !((gs(p, r) && f === m) || (f === void 0 && s !== void 0)))
            ) {
              let L = jr(j, m, t[c]);
              e.push(L), (p[r] = f);
            }
            p = p[r];
          }
          if (typeof p != "object") break;
        }
    }
  }
  function ju(e, t) {
    for (var r = -1, n = t.length, i = e; i != null && ++r < n; ) i = i[t[r]];
    return i;
  }
  function Du(e, t, r, n, i, s, o, a, u, l, c, d, p, f, m, w, S, O, v, P) {
    if (t === 0 && (p || (typeof e == "object" && e !== null && r in e))) {
      if (
        (p ? (d = e) : (d = e[r]),
        (c = m !== w ? d : o ? (a ? s(d, [...n, u, ...i]) : s(d)) : s),
        p)
      ) {
        let $ = jr(S, d, v);
        O.push($), (l[f] = c);
      } else if (e[r] !== c) {
        if (!((c === void 0 && s !== void 0) || (gs(e, r) && c === d))) {
          let $ = jr(ut(S, r, P + 1), d, v);
          O.push($), (e[r] = c);
        }
      }
    }
    for (let $ in e)
      typeof e[$] == "object" &&
        ((S = ut(S, $, P)),
        Du(e[$], t - 1, r, n, i, s, o, a, u, l, c, d, p, f, m, w, S, O, v, P + 1));
  }
  function pp() {
    return { parent: null, key: null, children: [], depth: 0 };
  }
  function ut(e, t, r) {
    if (e.depth === r) return ut(e.parent, t, r);
    var n = { parent: e, key: t, depth: r, children: [] };
    return e.children.push(n), n;
  }
  function jr(e, t, r) {
    let n = e,
      i = [];
    do i.push(n.key), (n = n.parent);
    while (n.parent != null);
    return { path: i, value: t, target: r };
  }
});
var qu = K((gT, Iu) => {
  "use strict";
  var { groupRestore: yp, nestedRestore: gp } = ws();
  Iu.exports = wp;
  function wp() {
    return function () {
      if (this.restore) {
        this.restore.state.secret = this.secret;
        return;
      }
      let { secret: t, wcLen: r } = this,
        n = Object.keys(t),
        i = bp(t, n),
        s = r > 0,
        o = s ? { secret: t, groupRestore: yp, nestedRestore: gp } : { secret: t };
      (this.restore = Function("o", Sp(i, n, s)).bind(o)), (this.restore.state = o);
    };
  }
  function bp(e, t) {
    return t
      .map((r) => {
        let { circle: n, escPath: i, leadingBracket: s } = e[r],
          a = n ? `o.${n} = secret[${i}].val` : `o${s ? "" : "."}${r} = secret[${i}].val`,
          u = `secret[${i}].val = undefined`;
        return `
      if (secret[${i}].val !== undefined) {
        try { ${a} } catch (e) {}
        ${u}
      }
    `;
      })
      .join("");
  }
  function Sp(e, t, r) {
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
var Fu = K((wT, Ru) => {
  "use strict";
  Ru.exports = vp;
  function vp(e) {
    let {
        secret: t,
        censor: r,
        compileRestore: n,
        serialize: i,
        groupRedact: s,
        nestedRedact: o,
        wildcards: a,
        wcLen: u,
      } = e,
      l = [{ secret: t, censor: r, compileRestore: n }];
    return (
      i !== !1 && l.push({ serialize: i }),
      u > 0 && l.push({ groupRedact: s, nestedRedact: o, wildcards: a, wcLen: u }),
      Object.assign(...l)
    );
  }
});
var Uu = K((bT, ku) => {
  "use strict";
  var Qu = Pu(),
    _p = Lu(),
    Op = Bu(),
    Tp = qu(),
    { groupRedact: Ep, nestedRedact: Np } = ws(),
    $p = Fu(),
    Pp = An(),
    Ap = Qu(),
    bs = (e) => e;
  bs.restore = bs;
  var xp = "[REDACTED]";
  Ss.rx = Pp;
  Ss.validator = Qu;
  ku.exports = Ss;
  function Ss(e = {}) {
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
    let i = n === !0 ? void 0 : "censor" in e ? e.censor : xp,
      s = typeof i == "function",
      o = s && i.length > 1;
    if (t.length === 0) return r || bs;
    Ap({ paths: t, serialize: r, censor: i });
    let { wildcards: a, wcLen: u, secret: l } = _p({ paths: t, censor: i }),
      c = Tp(),
      d = "strict" in e ? e.strict : !0;
    return Op(
      { secret: l, wcLen: u, serialize: r, strict: d, isCensorFct: s, censorFctTakesPath: o },
      $p({
        secret: l,
        censor: i,
        compileRestore: c,
        serialize: r,
        groupRedact: Ep,
        nestedRedact: Np,
        wildcards: a,
        wcLen: u,
      }),
    );
  }
});
var Jt = K((ST, Ku) => {
  "use strict";
  var Lp = Symbol("pino.setLevel"),
    Cp = Symbol("pino.getLevel"),
    Bp = Symbol("pino.levelVal"),
    jp = Symbol("pino.levelComp"),
    Dp = Symbol("pino.useLevelLabels"),
    zp = Symbol("pino.useOnlyCustomLevels"),
    Ip = Symbol("pino.mixin"),
    qp = Symbol("pino.lsCache"),
    Rp = Symbol("pino.chindings"),
    Fp = Symbol("pino.asJson"),
    Qp = Symbol("pino.write"),
    kp = Symbol("pino.redactFmt"),
    Up = Symbol("pino.time"),
    Kp = Symbol("pino.timeSliceIndex"),
    Mp = Symbol("pino.stream"),
    Vp = Symbol("pino.stringify"),
    Wp = Symbol("pino.stringifySafe"),
    Hp = Symbol("pino.stringifiers"),
    Jp = Symbol("pino.end"),
    Gp = Symbol("pino.formatOpts"),
    Xp = Symbol("pino.messageKey"),
    Yp = Symbol("pino.errorKey"),
    Zp = Symbol("pino.nestedKey"),
    ey = Symbol("pino.nestedKeyStr"),
    ty = Symbol("pino.mixinMergeStrategy"),
    ry = Symbol("pino.msgPrefix"),
    ny = Symbol("pino.wildcardFirst"),
    iy = Symbol.for("pino.serializers"),
    sy = Symbol.for("pino.formatters"),
    oy = Symbol.for("pino.hooks"),
    ay = Symbol.for("pino.metadata");
  Ku.exports = {
    setLevelSym: Lp,
    getLevelSym: Cp,
    levelValSym: Bp,
    levelCompSym: jp,
    useLevelLabelsSym: Dp,
    mixinSym: Ip,
    lsCacheSym: qp,
    chindingsSym: Rp,
    asJsonSym: Fp,
    writeSym: Qp,
    serializersSym: iy,
    redactFmtSym: kp,
    timeSym: Up,
    timeSliceIndexSym: Kp,
    streamSym: Mp,
    stringifySym: Vp,
    stringifySafeSym: Wp,
    stringifiersSym: Hp,
    endSym: Jp,
    formatOptsSym: Gp,
    messageKeySym: Xp,
    errorKeySym: Yp,
    nestedKeySym: Zp,
    wildcardFirstSym: ny,
    needsMetadataGsym: ay,
    useOnlyCustomLevelsSym: zp,
    formattersSym: sy,
    hooksSym: oy,
    nestedKeyStrSym: ey,
    mixinMergeStrategySym: ty,
    msgPrefixSym: ry,
  };
});
var Os = K((vT, Hu) => {
  "use strict";
  var _s = Uu(),
    { redactFmtSym: ly, wildcardFirstSym: xn } = Jt(),
    { rx: vs, validator: uy } = _s,
    Mu = uy({
      ERR_PATHS_MUST_BE_STRINGS: () => "pino \u2013 redacted paths must be strings",
      ERR_INVALID_PATH: (e) => `pino \u2013 redact paths array contains an invalid path (${e})`,
    }),
    Vu = "[Redacted]",
    Wu = !1;
  function cy(e, t) {
    let { paths: r, censor: n } = fy(e),
      i = r.reduce((a, u) => {
        vs.lastIndex = 0;
        let l = vs.exec(u),
          c = vs.exec(u),
          d = l[1] !== void 0 ? l[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, "$1") : l[0];
        if ((d === "*" && (d = xn), c === null)) return (a[d] = null), a;
        if (a[d] === null) return a;
        let { index: p } = c,
          f = `${u.substr(p, u.length - 1)}`;
        return (
          (a[d] = a[d] || []),
          d !== xn && a[d].length === 0 && a[d].push(...(a[xn] || [])),
          d === xn &&
            Object.keys(a).forEach(function (m) {
              a[m] && a[m].push(f);
            }),
          a[d].push(f),
          a
        );
      }, {}),
      s = { [ly]: _s({ paths: r, censor: n, serialize: t, strict: Wu }) },
      o = (...a) => t(typeof n == "function" ? n(...a) : n);
    return [...Object.keys(i), ...Object.getOwnPropertySymbols(i)].reduce((a, u) => {
      if (i[u] === null) a[u] = (l) => o(l, [u]);
      else {
        let l = typeof n == "function" ? (c, d) => n(c, [u, ...d]) : n;
        a[u] = _s({ paths: i[u], censor: l, serialize: t, strict: Wu });
      }
      return a;
    }, s);
  }
  function fy(e) {
    if (Array.isArray(e)) return (e = { paths: e, censor: Vu }), Mu(e), e;
    let { paths: t, censor: r = Vu, remove: n } = e;
    if (Array.isArray(t) === !1) throw Error("pino \u2013 redact must contain an array of strings");
    return n === !0 && (r = void 0), Mu({ paths: t, censor: r }), { paths: t, censor: r };
  }
  Hu.exports = cy;
});
var Gu = K((_T, Ju) => {
  "use strict";
  var hy = () => "",
    dy = () => `,"time":${Date.now()}`,
    my = () => `,"time":${Math.round(Date.now() / 1e3)}`,
    py = () => `,"time":"${new Date(Date.now()).toISOString()}"`;
  Ju.exports = { nullTime: hy, epochTime: dy, unixTime: my, isoTime: py };
});
var Yu = K((OT, Xu) => {
  "use strict";
  function yy(e) {
    try {
      return JSON.stringify(e);
    } catch {
      return '"[Circular]"';
    }
  }
  Xu.exports = gy;
  function gy(e, t, r) {
    var n = (r && r.stringify) || yy,
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
    var u = t.length;
    if (u === 0) return e;
    for (var l = "", c = 1 - i, d = -1, p = (e && e.length) || 0, f = 0; f < p; ) {
      if (e.charCodeAt(f) === 37 && f + 1 < p) {
        switch (((d = d > -1 ? d : 0), e.charCodeAt(f + 1))) {
          case 100:
          case 102:
            if (c >= u || t[c] == null) break;
            d < f && (l += e.slice(d, f)), (l += Number(t[c])), (d = f + 2), f++;
            break;
          case 105:
            if (c >= u || t[c] == null) break;
            d < f && (l += e.slice(d, f)), (l += Math.floor(Number(t[c]))), (d = f + 2), f++;
            break;
          case 79:
          case 111:
          case 106:
            if (c >= u || t[c] === void 0) break;
            d < f && (l += e.slice(d, f));
            var m = typeof t[c];
            if (m === "string") {
              (l += "'" + t[c] + "'"), (d = f + 2), f++;
              break;
            }
            if (m === "function") {
              (l += t[c].name || "<anonymous>"), (d = f + 2), f++;
              break;
            }
            (l += n(t[c])), (d = f + 2), f++;
            break;
          case 115:
            if (c >= u) break;
            d < f && (l += e.slice(d, f)), (l += String(t[c])), (d = f + 2), f++;
            break;
          case 37:
            d < f && (l += e.slice(d, f)), (l += "%"), (d = f + 2), f++, c--;
            break;
        }
        ++c;
      }
      ++f;
    }
    return d === -1 ? e : (d < p && (l += e.slice(d)), l);
  }
});
var Es = K((TT, Ts) => {
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
    Ts.exports = t;
  } else {
    let e = function (t) {
      if ((t > 0 && t < 1 / 0) === !1)
        throw typeof t != "number" && typeof t != "bigint"
          ? TypeError("sleep: ms must be a number")
          : RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
      let n = Date.now() + Number(t);
      for (; n > Date.now(); );
    };
    Ts.exports = e;
  }
});
var oc = K((ET, sc) => {
  "use strict";
  var me = require("fs"),
    wy = require("events"),
    by = require("util").inherits,
    Zu = require("path"),
    $s = Es(),
    Ln = 100,
    Cn = Buffer.allocUnsafe(0),
    Sy = 16 * 1024,
    ec = "buffer",
    tc = "utf8";
  function rc(e, t) {
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
        t.mkdir && me.mkdirSync(Zu.dirname(e), { recursive: !0 });
        let s = me.openSync(e, n, i);
        r(null, s);
      } catch (s) {
        throw (r(s), s);
      }
    else
      t.mkdir
        ? me.mkdir(Zu.dirname(e), { recursive: !0 }, (s) => {
            if (s) return r(s);
            me.open(e, n, i, r);
          })
        : me.open(e, n, i, r);
  }
  function Je(e) {
    if (!(this instanceof Je)) return new Je(e);
    let {
      fd: t,
      dest: r,
      minLength: n,
      maxLength: i,
      maxWrite: s,
      sync: o,
      append: a = !0,
      mkdir: u,
      retryEAGAIN: l,
      fsync: c,
      contentMode: d,
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
      (this.maxWrite = s || Sy),
      (this.sync = o || !1),
      (this.writable = !0),
      (this._fsync = c || !1),
      (this.append = a || !1),
      (this.mode = p),
      (this.retryEAGAIN = l || (() => !0)),
      (this.mkdir = u || !1);
    let f, m;
    if (d === ec)
      (this._writingBuf = Cn),
        (this.write = Oy),
        (this.flush = Ey),
        (this.flushSync = $y),
        (this._actualWrite = Ay),
        (f = () => me.writeSync(this.fd, this._writingBuf)),
        (m = () => me.write(this.fd, this._writingBuf, this.release));
    else if (d === void 0 || d === tc)
      (this._writingBuf = ""),
        (this.write = _y),
        (this.flush = Ty),
        (this.flushSync = Ny),
        (this._actualWrite = Py),
        (f = () => me.writeSync(this.fd, this._writingBuf, "utf8")),
        (m = () => me.write(this.fd, this._writingBuf, "utf8", this.release));
    else throw new Error(`SonicBoom supports "${tc}" and "${ec}", but passed ${d}`);
    if (typeof t == "number") (this.fd = t), process.nextTick(() => this.emit("ready"));
    else if (typeof t == "string") rc(t, this);
    else throw new Error("SonicBoom supports only file descriptors and files");
    if (this.minLength >= this.maxWrite)
      throw new Error(`minLength should be smaller than maxWrite (${this.maxWrite})`);
    (this.release = (w, S) => {
      if (w) {
        if (
          (w.code === "EAGAIN" || w.code === "EBUSY") &&
          this.retryEAGAIN(w, this._writingBuf.length, this._len - this._writingBuf.length)
        )
          if (this.sync)
            try {
              $s(Ln), this.release(void 0, 0);
            } catch (P) {
              this.release(P);
            }
          else setTimeout(m, Ln);
        else (this._writing = !1), this.emit("error", w);
        return;
      }
      this.emit("write", S);
      let O = Ns(this._writingBuf, this._len, S);
      if (((this._len = O.len), (this._writingBuf = O.writingBuf), this._writingBuf.length)) {
        if (!this.sync) {
          m();
          return;
        }
        try {
          do {
            let P = f(),
              $ = Ns(this._writingBuf, this._len, P);
            (this._len = $.len), (this._writingBuf = $.writingBuf);
          } while (this._writingBuf.length);
        } catch (P) {
          this.release(P);
          return;
        }
      }
      this._fsync && me.fsyncSync(this.fd);
      let v = this._len;
      this._reopening
        ? ((this._writing = !1), (this._reopening = !1), this.reopen())
        : v > this.minLength
          ? this._actualWrite()
          : this._ending
            ? v > 0
              ? this._actualWrite()
              : ((this._writing = !1), Bn(this))
            : ((this._writing = !1),
              this.sync
                ? this._asyncDrainScheduled ||
                  ((this._asyncDrainScheduled = !0), process.nextTick(vy, this))
                : this.emit("drain"));
    }),
      this.on("newListener", function (w) {
        w === "drain" && (this._asyncDrainScheduled = !1);
      });
  }
  function Ns(e, t, r) {
    return (
      typeof e == "string" &&
        Buffer.byteLength(e) !== r &&
        (r = Buffer.from(e).subarray(0, r).toString().length),
      (t = Math.max(t - r, 0)),
      (e = e.slice(r)),
      { writingBuf: e, len: t }
    );
  }
  function vy(e) {
    e.listenerCount("drain") > 0 && ((e._asyncDrainScheduled = !1), e.emit("drain"));
  }
  by(Je, wy);
  function nc(e, t) {
    return e.length === 0 ? Cn : e.length === 1 ? e[0] : Buffer.concat(e, t);
  }
  function _y(e) {
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
  function Oy(e) {
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
  function ic(e) {
    this._flushPending = !0;
    let t = () => {
        this._fsync
          ? ((this._flushPending = !1), e())
          : me.fsync(this.fd, (n) => {
              (this._flushPending = !1), e(n);
            }),
          this.off("error", r);
      },
      r = (n) => {
        (this._flushPending = !1), e(n), this.off("drain", t);
      };
    this.once("drain", t), this.once("error", r);
  }
  function Ty(e) {
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
    e && ic.call(this, e),
      !this._writing && (this._bufs.length === 0 && this._bufs.push(""), this._actualWrite());
  }
  function Ey(e) {
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
    e && ic.call(this, e),
      !this._writing &&
        (this._bufs.length === 0 && (this._bufs.push([]), this._lens.push(0)), this._actualWrite());
  }
  Je.prototype.reopen = function (e) {
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
        me.close(t, (r) => {
          if (r) return this.emit("error", r);
        });
    }),
      rc(this.file, this);
  };
  Je.prototype.end = function () {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this._opening) {
      this.once("ready", () => {
        this.end();
      });
      return;
    }
    this._ending ||
      ((this._ending = !0),
      !this._writing && (this._len > 0 && this.fd >= 0 ? this._actualWrite() : Bn(this)));
  };
  function Ny() {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this.fd < 0) throw new Error("sonic boom is not ready yet");
    !this._writing &&
      this._writingBuf.length > 0 &&
      (this._bufs.unshift(this._writingBuf), (this._writingBuf = ""));
    let e = "";
    for (; this._bufs.length || e; ) {
      e.length <= 0 && (e = this._bufs[0]);
      try {
        let t = me.writeSync(this.fd, e, "utf8"),
          r = Ns(e, this._len, t);
        (e = r.writingBuf), (this._len = r.len), e.length <= 0 && this._bufs.shift();
      } catch (t) {
        if (
          (t.code === "EAGAIN" || t.code === "EBUSY") &&
          !this.retryEAGAIN(t, e.length, this._len - e.length)
        )
          throw t;
        $s(Ln);
      }
    }
    try {
      me.fsyncSync(this.fd);
    } catch {}
  }
  function $y() {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this.fd < 0) throw new Error("sonic boom is not ready yet");
    !this._writing &&
      this._writingBuf.length > 0 &&
      (this._bufs.unshift([this._writingBuf]), (this._writingBuf = Cn));
    let e = Cn;
    for (; this._bufs.length || e.length; ) {
      e.length <= 0 && (e = nc(this._bufs[0], this._lens[0]));
      try {
        let t = me.writeSync(this.fd, e);
        (e = e.subarray(t)),
          (this._len = Math.max(this._len - t, 0)),
          e.length <= 0 && (this._bufs.shift(), this._lens.shift());
      } catch (t) {
        if (
          (t.code === "EAGAIN" || t.code === "EBUSY") &&
          !this.retryEAGAIN(t, e.length, this._len - e.length)
        )
          throw t;
        $s(Ln);
      }
    }
  }
  Je.prototype.destroy = function () {
    this.destroyed || Bn(this);
  };
  function Py() {
    let e = this.release;
    if (
      ((this._writing = !0),
      (this._writingBuf = this._writingBuf || this._bufs.shift() || ""),
      this.sync)
    )
      try {
        let t = me.writeSync(this.fd, this._writingBuf, "utf8");
        e(null, t);
      } catch (t) {
        e(t);
      }
    else me.write(this.fd, this._writingBuf, "utf8", e);
  }
  function Ay() {
    let e = this.release;
    if (
      ((this._writing = !0),
      (this._writingBuf = this._writingBuf.length
        ? this._writingBuf
        : nc(this._bufs.shift(), this._lens.shift())),
      this.sync)
    )
      try {
        let t = me.writeSync(this.fd, this._writingBuf);
        e(null, t);
      } catch (t) {
        e(t);
      }
    else me.write(this.fd, this._writingBuf, e);
  }
  function Bn(e) {
    if (e.fd === -1) {
      e.once("ready", Bn.bind(null, e));
      return;
    }
    (e.destroyed = !0), (e._bufs = []), (e._lens = []), me.fsync(e.fd, t);
    function t() {
      e.fd !== 1 && e.fd !== 2 ? me.close(e.fd, r) : r();
    }
    function r(n) {
      if (n) {
        e.emit("error", n);
        return;
      }
      e._ending && !e._writing && e.emit("finish"), e.emit("close");
    }
  }
  Je.SonicBoom = Je;
  Je.default = Je;
  sc.exports = Je;
});
var Ps = K((NT, fc) => {
  "use strict";
  var Ge = { exit: [], beforeExit: [] },
    ac = { exit: Cy, beforeExit: By },
    Gt;
  function xy() {
    Gt === void 0 && (Gt = new FinalizationRegistry(jy));
  }
  function Ly(e) {
    Ge[e].length > 0 || process.on(e, ac[e]);
  }
  function lc(e) {
    Ge[e].length > 0 ||
      (process.removeListener(e, ac[e]),
      Ge.exit.length === 0 && Ge.beforeExit.length === 0 && (Gt = void 0));
  }
  function Cy() {
    uc("exit");
  }
  function By() {
    uc("beforeExit");
  }
  function uc(e) {
    for (let t of Ge[e]) {
      let r = t.deref(),
        n = t.fn;
      r !== void 0 && n(r, e);
    }
    Ge[e] = [];
  }
  function jy(e) {
    for (let t of ["exit", "beforeExit"]) {
      let r = Ge[t].indexOf(e);
      Ge[t].splice(r, r + 1), lc(t);
    }
  }
  function cc(e, t, r) {
    if (t === void 0) throw new Error("the object can't be undefined");
    Ly(e);
    let n = new WeakRef(t);
    (n.fn = r), xy(), Gt.register(t, n), Ge[e].push(n);
  }
  function Dy(e, t) {
    cc("exit", e, t);
  }
  function zy(e, t) {
    cc("beforeExit", e, t);
  }
  function Iy(e) {
    if (Gt !== void 0) {
      Gt.unregister(e);
      for (let t of ["exit", "beforeExit"])
        (Ge[t] = Ge[t].filter((r) => {
          let n = r.deref();
          return n && n !== e;
        })),
          lc(t);
    }
  }
  fc.exports = { register: Dy, registerBeforeExit: zy, unregister: Iy };
});
var hc = K(($T, qy) => {
  qy.exports = {
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
var mc = K((PT, dc) => {
  "use strict";
  function Ry(e, t, r, n, i) {
    let s = Date.now() + n,
      o = Atomics.load(e, t);
    if (o === r) {
      i(null, "ok");
      return;
    }
    let a = o,
      u = (l) => {
        Date.now() > s
          ? i(null, "timed-out")
          : setTimeout(() => {
              (a = o),
                (o = Atomics.load(e, t)),
                o === a
                  ? u(l >= 1e3 ? 1e3 : l * 2)
                  : o === r
                    ? i(null, "ok")
                    : i(null, "not-equal");
            }, l);
      };
    u(1);
  }
  function Fy(e, t, r, n, i) {
    let s = Date.now() + n,
      o = Atomics.load(e, t);
    if (o !== r) {
      i(null, "ok");
      return;
    }
    let a = (u) => {
      Date.now() > s
        ? i(null, "timed-out")
        : setTimeout(() => {
            (o = Atomics.load(e, t)), o !== r ? i(null, "ok") : a(u >= 1e3 ? 1e3 : u * 2);
          }, u);
    };
    a(1);
  }
  dc.exports = { wait: Ry, waitDiff: Fy };
});
var yc = K((AT, pc) => {
  "use strict";
  pc.exports = { WRITE_INDEX: 4, READ_INDEX: 8 };
});
var vc = K((xT, Sc) => {
  "use strict";
  var { version: Qy } = hc(),
    { EventEmitter: ky } = require("events"),
    { Worker: Uy } = require("worker_threads"),
    { join: Ky } = require("path"),
    { pathToFileURL: My } = require("url"),
    { wait: Vy } = mc(),
    { WRITE_INDEX: qe, READ_INDEX: nt } = yc(),
    Wy = require("buffer"),
    Hy = require("assert"),
    _ = Symbol("kImpl"),
    Jy = Wy.constants.MAX_STRING_LENGTH,
    Dr = class {
      constructor(t) {
        this._value = t;
      }
      deref() {
        return this._value;
      }
    },
    Dn = class {
      register() {}
      unregister() {}
    },
    Gy = process.env.NODE_V8_COVERAGE ? Dn : global.FinalizationRegistry || Dn,
    Xy = process.env.NODE_V8_COVERAGE ? Dr : global.WeakRef || Dr,
    gc = new Gy((e) => {
      e.exited || e.terminate();
    });
  function Yy(e, t) {
    let { filename: r, workerData: n } = t,
      s =
        ("__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {})[
          "thread-stream-worker"
        ] || Ky(__dirname, "lib", "worker.js"),
      o = new Uy(s, {
        ...t.workerOpts,
        trackUnmanagedFds: !1,
        workerData: {
          filename: r.indexOf("file://") === 0 ? r : My(r).href,
          dataBuf: e[_].dataBuf,
          stateBuf: e[_].stateBuf,
          workerData: { $context: { threadStreamVersion: Qy }, ...n },
        },
      });
    return (o.stream = new Dr(e)), o.on("message", Zy), o.on("exit", bc), gc.register(e, o), o;
  }
  function wc(e) {
    Hy(!e[_].sync), e[_].needDrain && ((e[_].needDrain = !1), e.emit("drain"));
  }
  function jn(e) {
    let t = Atomics.load(e[_].state, qe),
      r = e[_].data.length - t;
    if (r > 0) {
      if (e[_].buf.length === 0) {
        (e[_].flushing = !1), e[_].ending ? Bs(e) : e[_].needDrain && process.nextTick(wc, e);
        return;
      }
      let n = e[_].buf.slice(0, r),
        i = Buffer.byteLength(n);
      i <= r
        ? ((e[_].buf = e[_].buf.slice(r)), zn(e, n, jn.bind(null, e)))
        : e.flush(() => {
            if (!e.destroyed) {
              for (
                Atomics.store(e[_].state, nt, 0), Atomics.store(e[_].state, qe, 0);
                i > e[_].data.length;

              )
                (r = r / 2), (n = e[_].buf.slice(0, r)), (i = Buffer.byteLength(n));
              (e[_].buf = e[_].buf.slice(r)), zn(e, n, jn.bind(null, e));
            }
          });
    } else if (r === 0) {
      if (t === 0 && e[_].buf.length === 0) return;
      e.flush(() => {
        Atomics.store(e[_].state, nt, 0), Atomics.store(e[_].state, qe, 0), jn(e);
      });
    } else it(e, new Error("overwritten"));
  }
  function Zy(e) {
    let t = this.stream.deref();
    if (t === void 0) {
      (this.exited = !0), this.terminate();
      return;
    }
    switch (e.code) {
      case "READY":
        (this.stream = new Xy(t)),
          t.flush(() => {
            (t[_].ready = !0), t.emit("ready");
          });
        break;
      case "ERROR":
        it(t, e.err);
        break;
      case "EVENT":
        Array.isArray(e.args) ? t.emit(e.name, ...e.args) : t.emit(e.name, e.args);
        break;
      case "WARNING":
        process.emitWarning(e.err);
        break;
      default:
        it(t, new Error("this should not happen: " + e.code));
    }
  }
  function bc(e) {
    let t = this.stream.deref();
    t !== void 0 &&
      (gc.unregister(t),
      (t.worker.exited = !0),
      t.worker.off("exit", bc),
      it(t, e !== 0 ? new Error("the worker thread exited") : null));
  }
  var xs = class extends ky {
    constructor(t = {}) {
      if ((super(), t.bufferSize < 4))
        throw new Error("bufferSize must at least fit a 4-byte utf-8 char");
      (this[_] = {}),
        (this[_].stateBuf = new SharedArrayBuffer(128)),
        (this[_].state = new Int32Array(this[_].stateBuf)),
        (this[_].dataBuf = new SharedArrayBuffer(t.bufferSize || 4 * 1024 * 1024)),
        (this[_].data = Buffer.from(this[_].dataBuf)),
        (this[_].sync = t.sync || !1),
        (this[_].ending = !1),
        (this[_].ended = !1),
        (this[_].needDrain = !1),
        (this[_].destroyed = !1),
        (this[_].flushing = !1),
        (this[_].ready = !1),
        (this[_].finished = !1),
        (this[_].errored = null),
        (this[_].closed = !1),
        (this[_].buf = ""),
        (this.worker = Yy(this, t)),
        this.on("message", (r, n) => {
          this.worker.postMessage(r, n);
        });
    }
    write(t) {
      if (this[_].destroyed) return Ls(this, new Error("the worker has exited")), !1;
      if (this[_].ending) return Ls(this, new Error("the worker is ending")), !1;
      if (this[_].flushing && this[_].buf.length + t.length >= Jy)
        try {
          As(this), (this[_].flushing = !0);
        } catch (r) {
          return it(this, r), !1;
        }
      if (((this[_].buf += t), this[_].sync))
        try {
          return As(this), !0;
        } catch (r) {
          return it(this, r), !1;
        }
      return (
        this[_].flushing || ((this[_].flushing = !0), setImmediate(jn, this)),
        (this[_].needDrain =
          this[_].data.length - this[_].buf.length - Atomics.load(this[_].state, qe) <= 0),
        !this[_].needDrain
      );
    }
    end() {
      this[_].destroyed || ((this[_].ending = !0), Bs(this));
    }
    flush(t) {
      if (this[_].destroyed) {
        typeof t == "function" && process.nextTick(t, new Error("the worker has exited"));
        return;
      }
      let r = Atomics.load(this[_].state, qe);
      Vy(this[_].state, nt, r, 1 / 0, (n, i) => {
        if (n) {
          it(this, n), process.nextTick(t, n);
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
      this[_].destroyed || (As(this), Cs(this));
    }
    unref() {
      this.worker.unref();
    }
    ref() {
      this.worker.ref();
    }
    get ready() {
      return this[_].ready;
    }
    get destroyed() {
      return this[_].destroyed;
    }
    get closed() {
      return this[_].closed;
    }
    get writable() {
      return !this[_].destroyed && !this[_].ending;
    }
    get writableEnded() {
      return this[_].ending;
    }
    get writableFinished() {
      return this[_].finished;
    }
    get writableNeedDrain() {
      return this[_].needDrain;
    }
    get writableObjectMode() {
      return !1;
    }
    get writableErrored() {
      return this[_].errored;
    }
  };
  function Ls(e, t) {
    setImmediate(() => {
      e.emit("error", t);
    });
  }
  function it(e, t) {
    e[_].destroyed ||
      ((e[_].destroyed = !0),
      t && ((e[_].errored = t), Ls(e, t)),
      e.worker.exited
        ? setImmediate(() => {
            (e[_].closed = !0), e.emit("close");
          })
        : e.worker
            .terminate()
            .catch(() => {})
            .then(() => {
              (e[_].closed = !0), e.emit("close");
            }));
  }
  function zn(e, t, r) {
    let n = Atomics.load(e[_].state, qe),
      i = Buffer.byteLength(t);
    return (
      e[_].data.write(t, n),
      Atomics.store(e[_].state, qe, n + i),
      Atomics.notify(e[_].state, qe),
      r(),
      !0
    );
  }
  function Bs(e) {
    if (!(e[_].ended || !e[_].ending || e[_].flushing)) {
      e[_].ended = !0;
      try {
        e.flushSync();
        let t = Atomics.load(e[_].state, nt);
        Atomics.store(e[_].state, qe, -1), Atomics.notify(e[_].state, qe);
        let r = 0;
        for (; t !== -1; ) {
          if (
            (Atomics.wait(e[_].state, nt, t, 1e3), (t = Atomics.load(e[_].state, nt)), t === -2)
          ) {
            it(e, new Error("end() failed"));
            return;
          }
          if (++r === 10) {
            it(e, new Error("end() took too long (10s)"));
            return;
          }
        }
        process.nextTick(() => {
          (e[_].finished = !0), e.emit("finish");
        });
      } catch (t) {
        it(e, t);
      }
    }
  }
  function As(e) {
    let t = () => {
      e[_].ending ? Bs(e) : e[_].needDrain && process.nextTick(wc, e);
    };
    for (e[_].flushing = !1; e[_].buf.length !== 0; ) {
      let r = Atomics.load(e[_].state, qe),
        n = e[_].data.length - r;
      if (n === 0) {
        Cs(e), Atomics.store(e[_].state, nt, 0), Atomics.store(e[_].state, qe, 0);
        continue;
      } else if (n < 0) throw new Error("overwritten");
      let i = e[_].buf.slice(0, n),
        s = Buffer.byteLength(i);
      if (s <= n) (e[_].buf = e[_].buf.slice(n)), zn(e, i, t);
      else {
        for (
          Cs(e), Atomics.store(e[_].state, nt, 0), Atomics.store(e[_].state, qe, 0);
          s > e[_].buf.length;

        )
          (n = n / 2), (i = e[_].buf.slice(0, n)), (s = Buffer.byteLength(i));
        (e[_].buf = e[_].buf.slice(n)), zn(e, i, t);
      }
    }
  }
  function Cs(e) {
    if (e[_].flushing) throw new Error("unable to flush while flushing");
    let t = Atomics.load(e[_].state, qe),
      r = 0;
    for (;;) {
      let n = Atomics.load(e[_].state, nt);
      if (n === -2) throw Error("_flushSync failed");
      if (n !== t) Atomics.wait(e[_].state, nt, n, 1e3);
      else break;
      if (++r === 10) throw new Error("_flushSync took too long (10s)");
    }
  }
  Sc.exports = xs;
});
var zs = K((LT, _c) => {
  "use strict";
  var { createRequire: eg } = require("module"),
    tg = ys(),
    { join: js, isAbsolute: rg, sep: ng } = require("path"),
    ig = Es(),
    Ds = Ps(),
    sg = vc();
  function og(e) {
    Ds.register(e, lg),
      Ds.registerBeforeExit(e, ug),
      e.on("close", function () {
        Ds.unregister(e);
      });
  }
  function ag(e, t, r) {
    let n = new sg({ filename: e, workerData: t, workerOpts: r });
    n.on("ready", i),
      n.on("close", function () {
        process.removeListener("exit", s);
      }),
      process.on("exit", s);
    function i() {
      process.removeListener("exit", s), n.unref(), r.autoEnd !== !1 && og(n);
    }
    function s() {
      n.closed || (n.flushSync(), ig(100), n.end());
    }
    return n;
  }
  function lg(e) {
    e.ref(),
      e.flushSync(),
      e.end(),
      e.once("close", function () {
        e.unref();
      });
  }
  function ug(e) {
    e.flushSync();
  }
  function cg(e) {
    let { pipeline: t, targets: r, levels: n, dedupe: i, worker: s = {}, caller: o = tg() } = e,
      a = { ...e.options },
      u = typeof o == "string" ? [o] : o,
      l = "__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {},
      c = e.target;
    if (c && r) throw new Error("only one of target or targets can be specified");
    return (
      r
        ? ((c = l["pino-worker"] || js(__dirname, "worker.js")),
          (a.targets = r.filter((p) => p.target).map((p) => ({ ...p, target: d(p.target) }))),
          (a.pipelines = r
            .filter((p) => p.pipeline)
            .map((p) => p.pipeline.map((f) => ({ ...f, level: p.level, target: d(f.target) })))))
        : t &&
          ((c = l["pino-worker"] || js(__dirname, "worker.js")),
          (a.pipelines = [t.map((p) => ({ ...p, target: d(p.target) }))])),
      n && (a.levels = n),
      i && (a.dedupe = i),
      (a.pinoWillSendConfig = !0),
      ag(d(c), a, s)
    );
    function d(p) {
      if (((p = l[p] || p), rg(p) || p.indexOf("file://") === 0)) return p;
      if (p === "pino/file") return js(__dirname, "..", "file.js");
      let f;
      for (let m of u)
        try {
          let w = m === "node:repl" ? process.cwd() + ng : m;
          f = eg(w).resolve(p);
          break;
        } catch {
          continue;
        }
      if (!f) throw new Error(`unable to determine transport target for "${p}"`);
      return f;
    }
  }
  _c.exports = cg;
});
var Rn = K((CT, Bc) => {
  "use strict";
  var Oc = Yu(),
    { mapHttpRequest: fg, mapHttpResponse: hg } = ps(),
    qs = oc(),
    Tc = Ps(),
    {
      lsCacheSym: dg,
      chindingsSym: $c,
      writeSym: Ec,
      serializersSym: Pc,
      formatOptsSym: Nc,
      endSym: mg,
      stringifiersSym: Ac,
      stringifySym: xc,
      stringifySafeSym: Rs,
      wildcardFirstSym: Lc,
      nestedKeySym: pg,
      formattersSym: Cc,
      messageKeySym: yg,
      errorKeySym: gg,
      nestedKeyStrSym: wg,
      msgPrefixSym: In,
    } = Jt(),
    { isMainThread: bg } = require("worker_threads"),
    Sg = zs();
  function Xt() {}
  function vg(e, t) {
    if (!t) return r;
    return function (...i) {
      t.call(this, i, r, e);
    };
    function r(n, ...i) {
      if (typeof n == "object") {
        let s = n;
        n !== null &&
          (n.method && n.headers && n.socket
            ? (n = fg(n))
            : typeof n.setHeader == "function" && (n = hg(n)));
        let o;
        s === null && i.length === 0 ? (o = [null]) : ((s = i.shift()), (o = i)),
          typeof this[In] == "string" && s !== void 0 && s !== null && (s = this[In] + s),
          this[Ec](n, Oc(s, o, this[Nc]), e);
      } else {
        let s = n === void 0 ? i.shift() : n;
        typeof this[In] == "string" && s !== void 0 && s !== null && (s = this[In] + s),
          this[Ec](null, Oc(s, i, this[Nc]), e);
      }
    }
  }
  function Is(e) {
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
  function _g(e, t, r, n) {
    let i = this[xc],
      s = this[Rs],
      o = this[Ac],
      a = this[mg],
      u = this[$c],
      l = this[Pc],
      c = this[Cc],
      d = this[yg],
      p = this[gg],
      f = this[dg][r] + n;
    f = f + u;
    let m;
    c.log && (e = c.log(e));
    let w = o[Lc],
      S = "";
    for (let v in e)
      if (((m = e[v]), Object.prototype.hasOwnProperty.call(e, v) && m !== void 0)) {
        l[v] ? (m = l[v](m)) : v === p && l.err && (m = l.err(m));
        let P = o[v] || w;
        switch (typeof m) {
          case "undefined":
          case "function":
            continue;
          case "number":
            Number.isFinite(m) === !1 && (m = null);
          case "boolean":
            P && (m = P(m));
            break;
          case "string":
            m = (P || Is)(m);
            break;
          default:
            m = (P || i)(m, s);
        }
        if (m === void 0) continue;
        let $ = Is(v);
        S += "," + $ + ":" + m;
      }
    let O = "";
    if (t !== void 0) {
      m = l[d] ? l[d](t) : t;
      let v = o[d] || w;
      switch (typeof m) {
        case "function":
          break;
        case "number":
          Number.isFinite(m) === !1 && (m = null);
        case "boolean":
          v && (m = v(m)), (O = ',"' + d + '":' + m);
          break;
        case "string":
          (m = (v || Is)(m)), (O = ',"' + d + '":' + m);
          break;
        default:
          (m = (v || i)(m, s)), (O = ',"' + d + '":' + m);
      }
    }
    return this[pg] && S ? f + this[wg] + S.slice(1) + "}" + O + a : f + S + O + a;
  }
  function Og(e, t) {
    let r,
      n = e[$c],
      i = e[xc],
      s = e[Rs],
      o = e[Ac],
      a = o[Lc],
      u = e[Pc],
      l = e[Cc].bindings;
    t = l(t);
    for (let c in t)
      if (
        ((r = t[c]),
        (c !== "level" &&
          c !== "serializers" &&
          c !== "formatters" &&
          c !== "customLevels" &&
          t.hasOwnProperty(c) &&
          r !== void 0) === !0)
      ) {
        if (((r = u[c] ? u[c](r) : r), (r = (o[c] || a || i)(r, s)), r === void 0)) continue;
        n += ',"' + c + '":' + r;
      }
    return n;
  }
  function Tg(e) {
    return e.write !== e.constructor.prototype.write;
  }
  var Eg = process.env.NODE_V8_COVERAGE || process.env.V8_COVERAGE;
  function qn(e) {
    let t = new qs(e);
    return (
      t.on("error", r),
      !Eg &&
        !e.sync &&
        bg &&
        (Tc.register(t, Ng),
        t.on("close", function () {
          Tc.unregister(t);
        })),
      t
    );
    function r(n) {
      if (n.code === "EPIPE") {
        (t.write = Xt), (t.end = Xt), (t.flushSync = Xt), (t.destroy = Xt);
        return;
      }
      t.removeListener("error", r), t.emit("error", n);
    }
  }
  function Ng(e, t) {
    e.destroyed ||
      (t === "beforeExit"
        ? (e.flush(),
          e.on("drain", function () {
            e.end();
          }))
        : e.flushSync());
  }
  function $g(e) {
    return function (r, n, i = {}, s) {
      if (typeof i == "string") (s = qn({ dest: i })), (i = {});
      else if (typeof s == "string") {
        if (i && i.transport)
          throw Error("only one of option.transport or stream can be specified");
        s = qn({ dest: s });
      } else if (i instanceof qs || i.writable || i._writableState) (s = i), (i = {});
      else if (i.transport) {
        if (i.transport instanceof qs || i.transport.writable || i.transport._writableState)
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
        let u;
        i.customLevels &&
          (u = i.useOnlyCustomLevels
            ? i.customLevels
            : Object.assign({}, i.levels, i.customLevels)),
          (s = Sg({ caller: n, ...i.transport, levels: u }));
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
        a || (i.onChild = Xt),
        s || (Tg(process.stdout) ? (s = process.stdout) : (s = qn({ fd: process.stdout.fd || 1 }))),
        { opts: i, stream: s }
      );
    };
  }
  function Pg(e, t) {
    try {
      return JSON.stringify(e);
    } catch {
      try {
        return (t || this[Rs])(e);
      } catch {
        return '"[unable to serialize, circular reference is too complex to analyze]"';
      }
    }
  }
  function Ag(e, t, r) {
    return { level: e, bindings: t, log: r };
  }
  function xg(e) {
    let t = Number(e);
    return typeof e == "string" && Number.isFinite(t) ? t : e === void 0 ? 1 : e;
  }
  Bc.exports = {
    noop: Xt,
    buildSafeSonicBoom: qn,
    asChindings: Og,
    asJson: _g,
    genLog: vg,
    createArgsNormalizer: $g,
    stringify: Pg,
    buildFormatters: Ag,
    normalizeDestFileDescriptor: xg,
  };
});
var Fn = K((BT, jc) => {
  var Lg = { trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60 },
    Cg = { ASC: "ASC", DESC: "DESC" };
  jc.exports = { DEFAULT_LEVELS: Lg, SORTING_ORDER: Cg };
});
var ks = K((jT, qc) => {
  "use strict";
  var {
      lsCacheSym: Bg,
      levelValSym: Fs,
      useOnlyCustomLevelsSym: jg,
      streamSym: Dg,
      formattersSym: zg,
      hooksSym: Ig,
      levelCompSym: Dc,
    } = Jt(),
    { noop: qg, genLog: At } = Rn(),
    { DEFAULT_LEVELS: st, SORTING_ORDER: zc } = Fn(),
    Ic = {
      fatal: (e) => {
        let t = At(st.fatal, e);
        return function (...r) {
          let n = this[Dg];
          if ((t.call(this, ...r), typeof n.flushSync == "function"))
            try {
              n.flushSync();
            } catch {}
        };
      },
      error: (e) => At(st.error, e),
      warn: (e) => At(st.warn, e),
      info: (e) => At(st.info, e),
      debug: (e) => At(st.debug, e),
      trace: (e) => At(st.trace, e),
    },
    Qs = Object.keys(st).reduce((e, t) => ((e[st[t]] = t), e), {}),
    Rg = Object.keys(Qs).reduce((e, t) => ((e[t] = '{"level":' + Number(t)), e), {});
  function Fg(e) {
    let t = e[zg].level,
      { labels: r } = e.levels,
      n = {};
    for (let i in r) {
      let s = t(r[i], Number(i));
      n[i] = JSON.stringify(s).slice(0, -1);
    }
    return (e[Bg] = n), e;
  }
  function Qg(e, t) {
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
  function kg(e) {
    let { labels: t, values: r } = this.levels;
    if (typeof e == "number") {
      if (t[e] === void 0) throw Error("unknown level value" + e);
      e = t[e];
    }
    if (r[e] === void 0) throw Error("unknown level " + e);
    let n = this[Fs],
      i = (this[Fs] = r[e]),
      s = this[jg],
      o = this[Dc],
      a = this[Ig].logMethod;
    for (let u in r) {
      if (o(r[u], i) === !1) {
        this[u] = qg;
        continue;
      }
      this[u] = Qg(u, s) ? Ic[u](a) : At(r[u], a);
    }
    this.emit("level-change", e, i, t[n], n, this);
  }
  function Ug(e) {
    let { levels: t, levelVal: r } = this;
    return t && t.labels ? t.labels[r] : "";
  }
  function Kg(e) {
    let { values: t } = this.levels,
      r = t[e];
    return r !== void 0 && this[Dc](r, this[Fs]);
  }
  function Mg(e, t, r) {
    return e === zc.DESC ? t <= r : t >= r;
  }
  function Vg(e) {
    return typeof e == "string" ? Mg.bind(null, e) : e;
  }
  function Wg(e = null, t = !1) {
    let r = e ? Object.keys(e).reduce((s, o) => ((s[e[o]] = o), s), {}) : null,
      n = Object.assign(
        Object.create(Object.prototype, { Infinity: { value: "silent" } }),
        t ? null : Qs,
        r,
      ),
      i = Object.assign(
        Object.create(Object.prototype, { silent: { value: 1 / 0 } }),
        t ? null : st,
        e,
      );
    return { labels: n, values: i };
  }
  function Hg(e, t, r) {
    if (typeof e == "number") {
      if (
        ![]
          .concat(
            Object.keys(t || {}).map((s) => t[s]),
            r ? [] : Object.keys(Qs).map((s) => +s),
            1 / 0,
          )
          .includes(e)
      )
        throw Error(`default level:${e} must be included in custom levels`);
      return;
    }
    let n = Object.assign(
      Object.create(Object.prototype, { silent: { value: 1 / 0 } }),
      r ? null : st,
      t,
    );
    if (!(e in n)) throw Error(`default level:${e} must be included in custom levels`);
  }
  function Jg(e, t) {
    let { labels: r, values: n } = e;
    for (let i in t) {
      if (i in n) throw Error("levels cannot be overridden");
      if (t[i] in r) throw Error("pre-existing level values cannot be used for new levels");
    }
  }
  function Gg(e) {
    if (typeof e != "function" && !(typeof e == "string" && Object.values(zc).includes(e)))
      throw new Error('Levels comparison should be one of "ASC", "DESC" or "function" type');
  }
  qc.exports = {
    initialLsCache: Rg,
    genLsCache: Fg,
    levelMethods: Ic,
    getLevel: Ug,
    setLevel: kg,
    isLevelEnabled: Kg,
    mappings: Wg,
    assertNoLevelCollisions: Jg,
    assertDefaultLevelFound: Hg,
    genLevelComparison: Vg,
    assertLevelComparison: Gg,
  };
});
var Us = K((DT, Rc) => {
  "use strict";
  Rc.exports = { version: "9.2.0" };
});
var Gc = K((IT, Jc) => {
  "use strict";
  var { EventEmitter: Xg } = require("events"),
    {
      lsCacheSym: Yg,
      levelValSym: Zg,
      setLevelSym: Ms,
      getLevelSym: Fc,
      chindingsSym: Vs,
      parsedChindingsSym: ew,
      mixinSym: tw,
      asJsonSym: Mc,
      writeSym: rw,
      mixinMergeStrategySym: nw,
      timeSym: iw,
      timeSliceIndexSym: sw,
      streamSym: Vc,
      serializersSym: xt,
      formattersSym: Ks,
      errorKeySym: ow,
      messageKeySym: aw,
      useOnlyCustomLevelsSym: lw,
      needsMetadataGsym: uw,
      redactFmtSym: cw,
      stringifySym: fw,
      formatOptsSym: hw,
      stringifiersSym: dw,
      msgPrefixSym: Qc,
    } = Jt(),
    {
      getLevel: mw,
      setLevel: pw,
      isLevelEnabled: yw,
      mappings: gw,
      initialLsCache: ww,
      genLsCache: bw,
      assertNoLevelCollisions: Sw,
    } = ks(),
    { asChindings: Wc, asJson: vw, buildFormatters: kc, stringify: Uc } = Rn(),
    { version: _w } = Us(),
    Ow = Os(),
    Tw = class {},
    Hc = {
      constructor: Tw,
      child: Ew,
      bindings: Nw,
      setBindings: $w,
      flush: Lw,
      isLevelEnabled: yw,
      version: _w,
      get level() {
        return this[Fc]();
      },
      set level(e) {
        this[Ms](e);
      },
      get levelVal() {
        return this[Zg];
      },
      set levelVal(e) {
        throw Error("levelVal is read-only");
      },
      [Yg]: ww,
      [rw]: Aw,
      [Mc]: vw,
      [Fc]: mw,
      [Ms]: pw,
    };
  Object.setPrototypeOf(Hc, Xg.prototype);
  Jc.exports = function () {
    return Object.create(Hc);
  };
  var Kc = (e) => e;
  function Ew(e, t) {
    if (!e) throw Error("missing bindings for child Pino");
    t = t || {};
    let r = this[xt],
      n = this[Ks],
      i = Object.create(this);
    if (t.hasOwnProperty("serializers") === !0) {
      i[xt] = Object.create(null);
      for (let c in r) i[xt][c] = r[c];
      let u = Object.getOwnPropertySymbols(r);
      for (var s = 0; s < u.length; s++) {
        let c = u[s];
        i[xt][c] = r[c];
      }
      for (let c in t.serializers) i[xt][c] = t.serializers[c];
      let l = Object.getOwnPropertySymbols(t.serializers);
      for (var o = 0; o < l.length; o++) {
        let c = l[o];
        i[xt][c] = t.serializers[c];
      }
    } else i[xt] = r;
    if (t.hasOwnProperty("formatters")) {
      let { level: u, bindings: l, log: c } = t.formatters;
      i[Ks] = kc(u || n.level, l || Kc, c || n.log);
    } else i[Ks] = kc(n.level, Kc, n.log);
    if (
      (t.hasOwnProperty("customLevels") === !0 &&
        (Sw(this.levels, t.customLevels), (i.levels = gw(t.customLevels, i[lw])), bw(i)),
      (typeof t.redact == "object" && t.redact !== null) || Array.isArray(t.redact))
    ) {
      i.redact = t.redact;
      let u = Ow(i.redact, Uc),
        l = { stringify: u[cw] };
      (i[fw] = Uc), (i[dw] = u), (i[hw] = l);
    }
    typeof t.msgPrefix == "string" && (i[Qc] = (this[Qc] || "") + t.msgPrefix), (i[Vs] = Wc(i, e));
    let a = t.level || this.level;
    return i[Ms](a), this.onChild(i), i;
  }
  function Nw() {
    let t = `{${this[Vs].substr(1)}}`,
      r = JSON.parse(t);
    return delete r.pid, delete r.hostname, r;
  }
  function $w(e) {
    let t = Wc(this, e);
    (this[Vs] = t), delete this[ew];
  }
  function Pw(e, t) {
    return Object.assign(t, e);
  }
  function Aw(e, t, r) {
    let n = this[iw](),
      i = this[tw],
      s = this[ow],
      o = this[aw],
      a = this[nw] || Pw,
      u;
    e == null
      ? (u = {})
      : e instanceof Error
        ? ((u = { [s]: e }), t === void 0 && (t = e.message))
        : ((u = e), t === void 0 && e[o] === void 0 && e[s] && (t = e[s].message)),
      i && (u = a(u, i(u, r, this)));
    let l = this[Mc](u, t, r, n),
      c = this[Vc];
    c[uw] === !0 &&
      ((c.lastLevel = r),
      (c.lastObj = u),
      (c.lastMsg = t),
      (c.lastTime = n.slice(this[sw])),
      (c.lastLogger = this)),
      c.write(l);
  }
  function xw() {}
  function Lw(e) {
    if (e != null && typeof e != "function") throw Error("callback must be a function");
    let t = this[Vc];
    typeof t.flush == "function" ? t.flush(e || xw) : e && e();
  }
});
var tf = K((Gs, ef) => {
  "use strict";
  var { hasOwnProperty: Qn } = Object.prototype,
    Ct = Js();
  Ct.configure = Js;
  Ct.stringify = Ct;
  Ct.default = Ct;
  Gs.stringify = Ct;
  Gs.configure = Js;
  ef.exports = Ct;
  var Cw =
    /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
  function St(e) {
    return e.length < 5e3 && !Cw.test(e) ? `"${e}"` : JSON.stringify(e);
  }
  function Ws(e) {
    if (e.length > 200) return e.sort();
    for (let t = 1; t < e.length; t++) {
      let r = e[t],
        n = t;
      for (; n !== 0 && e[n - 1] > r; ) (e[n] = e[n - 1]), n--;
      e[n] = r;
    }
    return e;
  }
  var Bw = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(Object.getPrototypeOf(new Int8Array())),
    Symbol.toStringTag,
  ).get;
  function Hs(e) {
    return Bw.call(e) !== void 0 && e.length !== 0;
  }
  function Xc(e, t, r) {
    e.length < r && (r = e.length);
    let n = t === "," ? "" : " ",
      i = `"0":${n}${e[0]}`;
    for (let s = 1; s < r; s++) i += `${t}"${s}":${n}${e[s]}`;
    return i;
  }
  function jw(e) {
    if (Qn.call(e, "circularValue")) {
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
  function Yc(e, t) {
    let r;
    if (Qn.call(e, t) && ((r = e[t]), typeof r != "boolean"))
      throw new TypeError(`The "${t}" argument must be of type boolean`);
    return r === void 0 ? !0 : r;
  }
  function Zc(e, t) {
    let r;
    if (Qn.call(e, t)) {
      if (((r = e[t]), typeof r != "number"))
        throw new TypeError(`The "${t}" argument must be of type number`);
      if (!Number.isInteger(r)) throw new TypeError(`The "${t}" argument must be an integer`);
      if (r < 1) throw new RangeError(`The "${t}" argument must be >= 1`);
    }
    return r === void 0 ? 1 / 0 : r;
  }
  function Lt(e) {
    return e === 1 ? "1 item" : `${e} items`;
  }
  function Dw(e) {
    let t = new Set();
    for (let r of e) (typeof r == "string" || typeof r == "number") && t.add(String(r));
    return t;
  }
  function zw(e) {
    if (Qn.call(e, "strict")) {
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
  function Js(e) {
    e = { ...e };
    let t = zw(e);
    t &&
      (e.bigint === void 0 && (e.bigint = !1), "circularValue" in e || (e.circularValue = Error));
    let r = jw(e),
      n = Yc(e, "bigint"),
      i = Yc(e, "deterministic"),
      s = Zc(e, "maximumDepth"),
      o = Zc(e, "maximumBreadth");
    function a(p, f, m, w, S, O) {
      let v = f[p];
      switch (
        (typeof v == "object" && v !== null && typeof v.toJSON == "function" && (v = v.toJSON(p)),
        (v = w.call(f, p, v)),
        typeof v)
      ) {
        case "string":
          return St(v);
        case "object": {
          if (v === null) return "null";
          if (m.indexOf(v) !== -1) return r;
          let P = "",
            $ = ",",
            x = O;
          if (Array.isArray(v)) {
            if (v.length === 0) return "[]";
            if (s < m.length + 1) return '"[Array]"';
            m.push(v),
              S !== "" &&
                ((O += S),
                (P += `
${O}`),
                ($ = `,
${O}`));
            let M = Math.min(v.length, o),
              z = 0;
            for (; z < M - 1; z++) {
              let we = a(String(z), v, m, w, S, O);
              (P += we !== void 0 ? we : "null"), (P += $);
            }
            let V = a(String(z), v, m, w, S, O);
            if (((P += V !== void 0 ? V : "null"), v.length - 1 > o)) {
              let we = v.length - o - 1;
              P += `${$}"... ${Lt(we)} not stringified"`;
            }
            return (
              S !== "" &&
                (P += `
${x}`),
              m.pop(),
              `[${P}]`
            );
          }
          let j = Object.keys(v),
            C = j.length;
          if (C === 0) return "{}";
          if (s < m.length + 1) return '"[Object]"';
          let L = "",
            k = "";
          S !== "" &&
            ((O += S),
            ($ = `,
${O}`),
            (L = " "));
          let T = Math.min(C, o);
          i && !Hs(v) && (j = Ws(j)), m.push(v);
          for (let M = 0; M < T; M++) {
            let z = j[M],
              V = a(z, v, m, w, S, O);
            V !== void 0 && ((P += `${k}${St(z)}:${L}${V}`), (k = $));
          }
          if (C > o) {
            let M = C - o;
            (P += `${k}"...":${L}"${Lt(M)} not stringified"`), (k = $);
          }
          return (
            S !== "" &&
              k.length > 1 &&
              (P = `
${O}${P}
${x}`),
            m.pop(),
            `{${P}}`
          );
        }
        case "number":
          return isFinite(v) ? String(v) : t ? t(v) : "null";
        case "boolean":
          return v === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (n) return String(v);
        default:
          return t ? t(v) : void 0;
      }
    }
    function u(p, f, m, w, S, O) {
      switch (
        (typeof f == "object" && f !== null && typeof f.toJSON == "function" && (f = f.toJSON(p)),
        typeof f)
      ) {
        case "string":
          return St(f);
        case "object": {
          if (f === null) return "null";
          if (m.indexOf(f) !== -1) return r;
          let v = O,
            P = "",
            $ = ",";
          if (Array.isArray(f)) {
            if (f.length === 0) return "[]";
            if (s < m.length + 1) return '"[Array]"';
            m.push(f),
              S !== "" &&
                ((O += S),
                (P += `
${O}`),
                ($ = `,
${O}`));
            let C = Math.min(f.length, o),
              L = 0;
            for (; L < C - 1; L++) {
              let T = u(String(L), f[L], m, w, S, O);
              (P += T !== void 0 ? T : "null"), (P += $);
            }
            let k = u(String(L), f[L], m, w, S, O);
            if (((P += k !== void 0 ? k : "null"), f.length - 1 > o)) {
              let T = f.length - o - 1;
              P += `${$}"... ${Lt(T)} not stringified"`;
            }
            return (
              S !== "" &&
                (P += `
${v}`),
              m.pop(),
              `[${P}]`
            );
          }
          m.push(f);
          let x = "";
          S !== "" &&
            ((O += S),
            ($ = `,
${O}`),
            (x = " "));
          let j = "";
          for (let C of w) {
            let L = u(C, f[C], m, w, S, O);
            L !== void 0 && ((P += `${j}${St(C)}:${x}${L}`), (j = $));
          }
          return (
            S !== "" &&
              j.length > 1 &&
              (P = `
${O}${P}
${v}`),
            m.pop(),
            `{${P}}`
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
    function l(p, f, m, w, S) {
      switch (typeof f) {
        case "string":
          return St(f);
        case "object": {
          if (f === null) return "null";
          if (typeof f.toJSON == "function") {
            if (((f = f.toJSON(p)), typeof f != "object")) return l(p, f, m, w, S);
            if (f === null) return "null";
          }
          if (m.indexOf(f) !== -1) return r;
          let O = S;
          if (Array.isArray(f)) {
            if (f.length === 0) return "[]";
            if (s < m.length + 1) return '"[Array]"';
            m.push(f), (S += w);
            let L = `
${S}`,
              k = `,
${S}`,
              T = Math.min(f.length, o),
              M = 0;
            for (; M < T - 1; M++) {
              let V = l(String(M), f[M], m, w, S);
              (L += V !== void 0 ? V : "null"), (L += k);
            }
            let z = l(String(M), f[M], m, w, S);
            if (((L += z !== void 0 ? z : "null"), f.length - 1 > o)) {
              let V = f.length - o - 1;
              L += `${k}"... ${Lt(V)} not stringified"`;
            }
            return (
              (L += `
${O}`),
              m.pop(),
              `[${L}]`
            );
          }
          let v = Object.keys(f),
            P = v.length;
          if (P === 0) return "{}";
          if (s < m.length + 1) return '"[Object]"';
          S += w;
          let $ = `,
${S}`,
            x = "",
            j = "",
            C = Math.min(P, o);
          Hs(f) && ((x += Xc(f, $, o)), (v = v.slice(f.length)), (C -= f.length), (j = $)),
            i && (v = Ws(v)),
            m.push(f);
          for (let L = 0; L < C; L++) {
            let k = v[L],
              T = l(k, f[k], m, w, S);
            T !== void 0 && ((x += `${j}${St(k)}: ${T}`), (j = $));
          }
          if (P > o) {
            let L = P - o;
            (x += `${j}"...": "${Lt(L)} not stringified"`), (j = $);
          }
          return (
            j !== "" &&
              (x = `
${S}${x}
${O}`),
            m.pop(),
            `{${x}}`
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
    function c(p, f, m) {
      switch (typeof f) {
        case "string":
          return St(f);
        case "object": {
          if (f === null) return "null";
          if (typeof f.toJSON == "function") {
            if (((f = f.toJSON(p)), typeof f != "object")) return c(p, f, m);
            if (f === null) return "null";
          }
          if (m.indexOf(f) !== -1) return r;
          let w = "";
          if (Array.isArray(f)) {
            if (f.length === 0) return "[]";
            if (s < m.length + 1) return '"[Array]"';
            m.push(f);
            let $ = Math.min(f.length, o),
              x = 0;
            for (; x < $ - 1; x++) {
              let C = c(String(x), f[x], m);
              (w += C !== void 0 ? C : "null"), (w += ",");
            }
            let j = c(String(x), f[x], m);
            if (((w += j !== void 0 ? j : "null"), f.length - 1 > o)) {
              let C = f.length - o - 1;
              w += `,"... ${Lt(C)} not stringified"`;
            }
            return m.pop(), `[${w}]`;
          }
          let S = Object.keys(f),
            O = S.length;
          if (O === 0) return "{}";
          if (s < m.length + 1) return '"[Object]"';
          let v = "",
            P = Math.min(O, o);
          Hs(f) && ((w += Xc(f, ",", o)), (S = S.slice(f.length)), (P -= f.length), (v = ",")),
            i && (S = Ws(S)),
            m.push(f);
          for (let $ = 0; $ < P; $++) {
            let x = S[$],
              j = c(x, f[x], m);
            j !== void 0 && ((w += `${v}${St(x)}:${j}`), (v = ","));
          }
          if (O > o) {
            let $ = O - o;
            w += `${v}"...":"${Lt($)} not stringified"`;
          }
          return m.pop(), `{${w}}`;
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
      if (arguments.length > 1) {
        let w = "";
        if (
          (typeof m == "number"
            ? (w = " ".repeat(Math.min(m, 10)))
            : typeof m == "string" && (w = m.slice(0, 10)),
          f != null)
        ) {
          if (typeof f == "function") return a("", { "": p }, [], f, w, "");
          if (Array.isArray(f)) return u("", p, [], Dw(f), w, "");
        }
        if (w.length !== 0) return l("", p, [], w, "");
      }
      return c("", p, []);
    }
    return d;
  }
});
var sf = K((qT, nf) => {
  "use strict";
  var Xs = Symbol.for("pino.metadata"),
    { DEFAULT_LEVELS: rf } = Fn(),
    Iw = rf.info;
  function qw(e, t) {
    let r = 0;
    (e = e || []), (t = t || { dedupe: !1 });
    let n = Object.create(rf);
    (n.silent = 1 / 0),
      t.levels &&
        typeof t.levels == "object" &&
        Object.keys(t.levels).forEach((d) => {
          n[d] = t.levels[d];
        });
    let i = {
      write: s,
      add: u,
      emit: o,
      flushSync: a,
      end: l,
      minLevel: 0,
      streams: [],
      clone: c,
      [Xs]: !0,
      streamLevels: n,
    };
    return Array.isArray(e) ? e.forEach(u, i) : u.call(i, e), (e = null), i;
    function s(d) {
      let p,
        f = this.lastLevel,
        { streams: m } = this,
        w = 0,
        S;
      for (let O = Fw(m.length, t.dedupe); kw(O, m.length, t.dedupe); O = Qw(O, t.dedupe))
        if (((p = m[O]), p.level <= f)) {
          if (w !== 0 && w !== p.level) break;
          if (((S = p.stream), S[Xs])) {
            let { lastTime: v, lastMsg: P, lastObj: $, lastLogger: x } = this;
            (S.lastLevel = f),
              (S.lastTime = v),
              (S.lastMsg = P),
              (S.lastObj = $),
              (S.lastLogger = x);
          }
          S.write(d), t.dedupe && (w = p.level);
        } else if (!t.dedupe) break;
    }
    function o(...d) {
      for (let { stream: p } of this.streams) typeof p.emit == "function" && p.emit(...d);
    }
    function a() {
      for (let { stream: d } of this.streams) typeof d.flushSync == "function" && d.flushSync();
    }
    function u(d) {
      if (!d) return i;
      let p = typeof d.write == "function" || d.stream,
        f = d.write ? d : d.stream;
      if (!p)
        throw Error(
          "stream object needs to implement either StreamEntry or DestinationStream interface",
        );
      let { streams: m, streamLevels: w } = this,
        S;
      typeof d.levelVal == "number"
        ? (S = d.levelVal)
        : typeof d.level == "string"
          ? (S = w[d.level])
          : typeof d.level == "number"
            ? (S = d.level)
            : (S = Iw);
      let O = { stream: f, level: S, levelVal: void 0, id: r++ };
      return m.unshift(O), m.sort(Rw), (this.minLevel = m[0].level), i;
    }
    function l() {
      for (let { stream: d } of this.streams)
        typeof d.flushSync == "function" && d.flushSync(), d.end();
    }
    function c(d) {
      let p = new Array(this.streams.length);
      for (let f = 0; f < p.length; f++) p[f] = { level: d, stream: this.streams[f].stream };
      return {
        write: s,
        add: u,
        minLevel: d,
        streams: p,
        clone: c,
        emit: o,
        flushSync: a,
        [Xs]: !0,
      };
    }
  }
  function Rw(e, t) {
    return e.level - t.level;
  }
  function Fw(e, t) {
    return t ? e - 1 : 0;
  }
  function Qw(e, t) {
    return t ? e - 1 : e + 1;
  }
  function kw(e, t, r) {
    return r ? e >= 0 : e < t;
  }
  nf.exports = qw;
});
var wf = K((RT, Ke) => {
  function kn(e) {
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
    "thread-stream-worker": kn("./thread-stream-worker.js"),
    "pino-worker": kn("./pino-worker.js"),
    "pino/file": kn("./pino-file.js"),
    "pino-pretty": kn("./pino-pretty.js"),
  };
  var Uw = require("os"),
    df = ps(),
    Kw = ys(),
    Mw = Os(),
    mf = Gu(),
    Vw = Gc(),
    pf = Jt(),
    { configure: Ww } = tf(),
    {
      assertDefaultLevelFound: Hw,
      mappings: yf,
      genLsCache: Jw,
      genLevelComparison: Gw,
      assertLevelComparison: Xw,
    } = ks(),
    { DEFAULT_LEVELS: Yw, SORTING_ORDER: Zw } = Fn(),
    {
      createArgsNormalizer: eb,
      asChindings: tb,
      buildSafeSonicBoom: of,
      buildFormatters: rb,
      stringify: Ys,
      normalizeDestFileDescriptor: af,
      noop: nb,
    } = Rn(),
    { version: ib } = Us(),
    {
      chindingsSym: lf,
      redactFmtSym: sb,
      serializersSym: uf,
      timeSym: ob,
      timeSliceIndexSym: ab,
      streamSym: lb,
      stringifySym: cf,
      stringifySafeSym: Zs,
      stringifiersSym: ff,
      setLevelSym: ub,
      endSym: cb,
      formatOptsSym: fb,
      messageKeySym: hb,
      errorKeySym: db,
      nestedKeySym: mb,
      mixinSym: pb,
      levelCompSym: yb,
      useOnlyCustomLevelsSym: gb,
      formattersSym: hf,
      hooksSym: wb,
      nestedKeyStrSym: bb,
      mixinMergeStrategySym: Sb,
      msgPrefixSym: vb,
    } = pf,
    { epochTime: gf, nullTime: _b } = mf,
    { pid: Ob } = process,
    Tb = Uw.hostname(),
    Eb = df.err,
    Nb = {
      level: "info",
      levelComparison: Zw.ASC,
      levels: Yw,
      messageKey: "msg",
      errorKey: "err",
      nestedKey: null,
      enabled: !0,
      base: { pid: Ob, hostname: Tb },
      serializers: Object.assign(Object.create(null), { err: Eb }),
      formatters: Object.assign(Object.create(null), {
        bindings(e) {
          return e;
        },
        level(e, t) {
          return { level: t };
        },
      }),
      hooks: { logMethod: void 0 },
      timestamp: gf,
      name: void 0,
      redact: null,
      customLevels: null,
      useOnlyCustomLevels: !1,
      depthLimit: 5,
      edgeLimit: 100,
    },
    $b = eb(Nb),
    Pb = Object.assign(Object.create(null), df);
  function eo(...e) {
    let t = {},
      { opts: r, stream: n } = $b(t, Kw(), ...e),
      {
        redact: i,
        crlf: s,
        serializers: o,
        timestamp: a,
        messageKey: u,
        errorKey: l,
        nestedKey: c,
        base: d,
        name: p,
        level: f,
        customLevels: m,
        levelComparison: w,
        mixin: S,
        mixinMergeStrategy: O,
        useOnlyCustomLevels: v,
        formatters: P,
        hooks: $,
        depthLimit: x,
        edgeLimit: j,
        onChild: C,
        msgPrefix: L,
      } = r,
      k = Ww({ maximumDepth: x, maximumBreadth: j }),
      T = rb(P.level, P.bindings, P.log),
      M = Ys.bind({ [Zs]: k }),
      z = i ? Mw(i, M) : {},
      V = i ? { stringify: z[sb] } : { stringify: M },
      we =
        "}" +
        (s
          ? `\r
`
          : `
`),
      J = tb.bind(null, { [lf]: "", [uf]: o, [ff]: z, [cf]: Ys, [Zs]: k, [hf]: T }),
      G = "";
    d !== null && (p === void 0 ? (G = J(d)) : (G = J(Object.assign({}, d, { name: p }))));
    let de = a instanceof Function ? a : a ? gf : _b,
      N = de().indexOf(":") + 1;
    if (v && !m) throw Error("customLevels is required if useOnlyCustomLevels is set true");
    if (S && typeof S != "function")
      throw Error(`Unknown mixin type "${typeof S}" - expected "function"`);
    if (L && typeof L != "string")
      throw Error(`Unknown msgPrefix type "${typeof L}" - expected "string"`);
    Hw(f, m, v);
    let D = yf(m, v);
    typeof n.emit == "function" &&
      n.emit("message", { code: "PINO_CONFIG", config: { levels: D, messageKey: u, errorKey: l } }),
      Xw(w);
    let H = Gw(w);
    return (
      Object.assign(t, {
        levels: D,
        [yb]: H,
        [gb]: v,
        [lb]: n,
        [ob]: de,
        [ab]: N,
        [cf]: Ys,
        [Zs]: k,
        [ff]: z,
        [cb]: we,
        [fb]: V,
        [hb]: u,
        [db]: l,
        [mb]: c,
        [bb]: c ? `,${JSON.stringify(c)}:{` : "",
        [uf]: o,
        [pb]: S,
        [Sb]: O,
        [lf]: G,
        [hf]: T,
        [wb]: $,
        silent: nb,
        onChild: C,
        [vb]: L,
      }),
      Object.setPrototypeOf(t, Vw()),
      Jw(t),
      t[ub](f),
      t
    );
  }
  Ke.exports = eo;
  Ke.exports.destination = (e = process.stdout.fd) =>
    typeof e == "object"
      ? ((e.dest = af(e.dest || process.stdout.fd)), of(e))
      : of({ dest: af(e), minLength: 0 });
  Ke.exports.transport = zs();
  Ke.exports.multistream = sf();
  Ke.exports.levels = yf();
  Ke.exports.stdSerializers = Pb;
  Ke.exports.stdTimeFunctions = Object.assign({}, mf);
  Ke.exports.symbols = pf;
  Ke.exports.version = ib;
  Ke.exports.default = eo;
  Ke.exports.pino = eo;
});
var xb = {};
wh(xb, { db: () => ro, initDb: () => Ab });
module.exports = bh(xb);
var b = Symbol.for("drizzle:entityKind"),
  Cb = Symbol.for("drizzle:hasOwnEntityKind");
function E(e, t) {
  if (!e || typeof e != "object") return !1;
  if (e instanceof t) return !0;
  if (!Object.prototype.hasOwnProperty.call(t, b))
    throw new Error(
      `Class "${t.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`,
    );
  let r = e.constructor;
  if (r)
    for (; r; ) {
      if (b in r && r[b] === t[b]) return !0;
      r = Object.getPrototypeOf(r);
    }
  return !1;
}
var ee = class {
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
  static [b] = "Column";
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
var Rr = class {
  static [b] = "ColumnBuilder";
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
var Fr = Symbol.for("drizzle:Name"),
  Vn = Symbol.for("drizzle:Schema"),
  po = Symbol.for("drizzle:Columns"),
  Wn = Symbol.for("drizzle:OriginalName"),
  Hn = Symbol.for("drizzle:BaseName"),
  yo = Symbol.for("drizzle:IsAlias"),
  go = Symbol.for("drizzle:ExtraConfigBuilder"),
  wo = Symbol.for("drizzle:IsDrizzleTable"),
  B = class {
    static [b] = "Table";
    static Symbol = {
      Name: Fr,
      Schema: Vn,
      OriginalName: Wn,
      Columns: po,
      BaseName: Hn,
      IsAlias: yo,
      ExtraConfigBuilder: go,
    };
    [Fr];
    [Wn];
    [Vn];
    [po];
    [Hn];
    [yo] = !1;
    [go] = void 0;
    [wo] = !0;
    constructor(t, r, n) {
      (this[Fr] = this[Wn] = t), (this[Vn] = r), (this[Hn] = n);
    }
  };
function bo(e) {
  return typeof e == "object" && e !== null && wo in e;
}
function ht(e) {
  return e[Fr];
}
var So = Symbol.for("drizzle:PgInlineForeignKeys"),
  Ce = class extends B {
    static [b] = "PgTable";
    static Symbol = Object.assign({}, B.Symbol, { InlineForeignKeys: So });
    [So] = [];
    [B.Symbol.ExtraConfigBuilder] = void 0;
  };
var Qr = class {
    static [b] = "PgForeignKeyBuilder";
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
      return new Jn(t, this);
    }
  },
  Jn = class {
    constructor(t, r) {
      (this.table = t),
        (this.reference = r.reference),
        (this.onUpdate = r._onUpdate),
        (this.onDelete = r._onDelete);
    }
    static [b] = "PgForeignKey";
    reference;
    onUpdate;
    onDelete;
    getName() {
      let { name: t, columns: r, foreignColumns: n } = this.reference(),
        i = r.map((a) => a.name),
        s = n.map((a) => a.name),
        o = [this.table[Ce.Symbol.Name], ...i, n[0].table[Ce.Symbol.Name], ...s];
      return t ?? `${o.join("_")}_fk`;
    }
  };
function kr(e, ...t) {
  return e(...t);
}
function Yn(e, t) {
  return `${e[Ce.Symbol.Name]}_${t.join("_")}_unique`;
}
var Gn = class {
    constructor(t, r) {
      (this.name = r), (this.columns = t);
    }
    static [b] = "PgUniqueConstraintBuilder";
    columns;
    nullsNotDistinctConfig = !1;
    nullsNotDistinct() {
      return (this.nullsNotDistinctConfig = !0), this;
    }
    build(t) {
      return new Xn(t, this.columns, this.nullsNotDistinctConfig, this.name);
    }
  },
  vo = class {
    static [b] = "PgUniqueOnConstraintBuilder";
    name;
    constructor(t) {
      this.name = t;
    }
    on(...t) {
      return new Gn(t, this.name);
    }
  },
  Xn = class {
    constructor(t, r, n, i) {
      (this.table = t),
        (this.columns = r),
        (this.name =
          i ??
          Yn(
            this.table,
            this.columns.map((s) => s.name),
          )),
        (this.nullsNotDistinct = n);
    }
    static [b] = "PgUniqueConstraint";
    columns;
    name;
    nullsNotDistinct = !1;
    getName() {
      return this.name;
    }
  };
function _o(e, t, r) {
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
function Oo(e, t = 0) {
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
      let [u, l] = _o(e, n + 1, !0);
      r.push(u), (n = l);
      continue;
    }
    if (s === "}") return [r, n + 1];
    if (s === "{") {
      let [u, l] = Oo(e, n + 1);
      r.push(u), (n = l);
      continue;
    }
    let [o, a] = _o(e, n, !1);
    r.push(o), (n = a);
  }
  return [r, n];
}
function To(e) {
  let [t] = Oo(e, 1);
  return t;
}
function Zn(e) {
  return `{${e.map((t) => (Array.isArray(t) ? Zn(t) : typeof t == "string" ? `"${t.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"` : `${t}`)).join(",")}}`;
}
var Be = class extends Rr {
    foreignKeyConfigs = [];
    static [b] = "PgColumnBuilder";
    array(t) {
      return new ei(this.config.name, this, t);
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
        kr(
          (s, o) => {
            let a = new Qr(() => {
              let u = s();
              return { columns: [t], foreignColumns: [u] };
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
  le = class extends ee {
    constructor(t, r) {
      r.uniqueName || (r.uniqueName = Yn(t, [r.name])), super(t, r), (this.table = t);
    }
    static [b] = "PgColumn";
  },
  ei = class extends Be {
    static [b] = "PgArrayBuilder";
    constructor(t, r, n) {
      super(t, "array", "PgArray"), (this.config.baseBuilder = r), (this.config.size = n);
    }
    build(t) {
      let r = this.config.baseBuilder.build(t);
      return new ti(t, this.config, r);
    }
  },
  ti = class e extends le {
    constructor(t, r, n, i) {
      super(t, r), (this.baseColumn = n), (this.range = i), (this.size = r.size);
    }
    size;
    static [b] = "PgArray";
    getSQLType() {
      return `${this.baseColumn.getSQLType()}[${typeof this.size == "number" ? this.size : ""}]`;
    }
    mapFromDriverValue(t) {
      return (
        typeof t == "string" && (t = To(t)), t.map((r) => this.baseColumn.mapFromDriverValue(r))
      );
    }
    mapToDriverValue(t, r = !1) {
      let n = t.map((i) =>
        i === null
          ? null
          : E(this.baseColumn, e)
            ? this.baseColumn.mapToDriverValue(i, !0)
            : this.baseColumn.mapToDriverValue(i),
      );
      return r ? n : Zn(n);
    }
  };
var Eo = Symbol.for("drizzle:isPgEnum");
function $o(e) {
  return !!e && typeof e == "function" && Eo in e && e[Eo] === !0;
}
var No = class extends Be {
    static [b] = "PgEnumColumnBuilder";
    constructor(t, r) {
      super(t, "string", "PgEnumColumn"), (this.config.enum = r);
    }
    build(t) {
      return new ri(t, this.config);
    }
  },
  ri = class extends le {
    static [b] = "PgEnumColumn";
    enum = this.config.enum;
    enumValues = this.config.enum.enumValues;
    constructor(t, r) {
      super(t, r), (this.enum = r.enum);
    }
    getSQLType() {
      return this.enum.enumName;
    }
  };
var Se = class {
    static [b] = "Subquery";
    constructor(t, r, n, i = !1) {
      this._ = { brand: "Subquery", sql: t, selectedFields: r, alias: n, isWith: i };
    }
  },
  Dt = class extends Se {
    static [b] = "WithSubquery";
  };
var Po = "0.30.10";
var ni,
  ii,
  te = {
    startActiveSpan(e, t) {
      return ni
        ? (ii || (ii = ni.trace.getTracer("drizzle-orm", Po)),
          kr(
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
            ni,
            ii,
          ))
        : t();
    },
  };
var fe = Symbol.for("drizzle:ViewBaseConfig");
var Ao = class {
  static [b] = "FakePrimitiveParam";
};
function si(e) {
  return e != null && typeof e.getSQL == "function";
}
function Sh(e) {
  let t = { sql: "", params: [] };
  for (let r of e)
    (t.sql += r.sql),
      t.params.push(...r.params),
      r.typings?.length && (t.typings || (t.typings = []), t.typings.push(...r.typings));
  return t;
}
var ye = class {
    static [b] = "StringChunk";
    value;
    constructor(t) {
      this.value = Array.isArray(t) ? t : [t];
    }
    getSQL() {
      return new I([this]);
    }
  },
  I = class e {
    constructor(t) {
      this.queryChunks = t;
    }
    static [b] = "SQL";
    decoder = Lo;
    shouldInlineParams = !1;
    append(t) {
      return this.queryChunks.push(...t.queryChunks), this;
    }
    toQuery(t) {
      return te.startActiveSpan("drizzle.buildSQL", (r) => {
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
          paramStartIndex: u,
        } = n;
      return Sh(
        t.map((l) => {
          if (E(l, ye)) return { sql: l.value.join(""), params: [] };
          if (E(l, tr)) return { sql: i(l.value), params: [] };
          if (l === void 0) return { sql: "", params: [] };
          if (Array.isArray(l)) {
            let c = [new ye("(")];
            for (let [d, p] of l.entries()) c.push(p), d < l.length - 1 && c.push(new ye(", "));
            return c.push(new ye(")")), this.buildQueryFromSourceParams(c, n);
          }
          if (E(l, e))
            return this.buildQueryFromSourceParams(l.queryChunks, {
              ...n,
              inlineParams: a || l.shouldInlineParams,
            });
          if (E(l, B)) {
            let c = l[B.Symbol.Schema],
              d = l[B.Symbol.Name];
            return { sql: c === void 0 ? i(d) : i(c) + "." + i(d), params: [] };
          }
          if (E(l, ee)) return { sql: i(l.table[B.Symbol.Name]) + "." + i(l.name), params: [] };
          if (E(l, je)) {
            let c = l[fe].schema,
              d = l[fe].name;
            return { sql: c === void 0 ? i(d) : i(c) + "." + i(d), params: [] };
          }
          if (E(l, Re)) {
            let c = l.value === null ? null : l.encoder.mapToDriverValue(l.value);
            if (E(c, e)) return this.buildQueryFromSourceParams([c], n);
            if (a) return { sql: this.mapInlineParam(c, n), params: [] };
            let d;
            return (
              o !== void 0 && (d = [o(l.encoder)]),
              { sql: s(u.value++, c), params: [c], typings: d }
            );
          }
          return E(l, vt)
            ? { sql: s(u.value++, l), params: [l] }
            : E(l, e.Aliased) && l.fieldAlias !== void 0
              ? { sql: i(l.fieldAlias), params: [] }
              : E(l, Se)
                ? l._.isWith
                  ? { sql: i(l._.alias), params: [] }
                  : this.buildQueryFromSourceParams(
                      [new ye("("), l._.sql, new ye(") "), new tr(l._.alias)],
                      n,
                    )
                : $o(l)
                  ? l.schema
                    ? { sql: i(l.schema) + "." + i(l.enumName), params: [] }
                    : { sql: i(l.enumName), params: [] }
                  : si(l)
                    ? this.buildQueryFromSourceParams([new ye("("), l.getSQL(), new ye(")")], n)
                    : a
                      ? { sql: this.mapInlineParam(l, n), params: [] }
                      : { sql: s(u.value++, l), params: [l] };
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
  tr = class {
    constructor(t) {
      this.value = t;
    }
    static [b] = "Name";
    brand;
    getSQL() {
      return new I([this]);
    }
  };
function xo(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    "mapToDriverValue" in e &&
    typeof e.mapToDriverValue == "function"
  );
}
var Lo = { mapFromDriverValue: (e) => e },
  Co = { mapToDriverValue: (e) => e },
  _S = { ...Lo, ...Co },
  Re = class {
    constructor(t, r = Co) {
      (this.value = t), (this.encoder = r);
    }
    static [b] = "Param";
    brand;
    getSQL() {
      return new I([this]);
    }
  };
function y(e, ...t) {
  let r = [];
  (t.length > 0 || (e.length > 0 && e[0] !== "")) && r.push(new ye(e[0]));
  for (let [n, i] of t.entries()) r.push(i, new ye(e[n + 1]));
  return new I(r);
}
((e) => {
  function t() {
    return new I([]);
  }
  e.empty = t;
  function r(u) {
    return new I(u);
  }
  e.fromList = r;
  function n(u) {
    return new I([new ye(u)]);
  }
  e.raw = n;
  function i(u, l) {
    let c = [];
    for (let [d, p] of u.entries()) d > 0 && l !== void 0 && c.push(l), c.push(p);
    return new I(c);
  }
  e.join = i;
  function s(u) {
    return new tr(u);
  }
  e.identifier = s;
  function o(u) {
    return new vt(u);
  }
  e.placeholder = o;
  function a(u, l) {
    return new Re(u, l);
  }
  e.param = a;
})(y || (y = {}));
((e) => {
  class t {
    constructor(n, i) {
      (this.sql = n), (this.fieldAlias = i);
    }
    static [b] = "SQL.Aliased";
    isSelectionField = !1;
    getSQL() {
      return this.sql;
    }
    clone() {
      return new t(this.sql, this.fieldAlias);
    }
  }
  e.Aliased = t;
})(I || (I = {}));
var vt = class {
  constructor(t) {
    this.name = t;
  }
  static [b] = "Placeholder";
  getSQL() {
    return new I([this]);
  }
};
function oi(e, t) {
  return e.map((r) => {
    if (E(r, vt)) {
      if (!(r.name in t)) throw new Error(`No value for placeholder "${r.name}" was provided`);
      return t[r.name];
    }
    return r;
  });
}
var je = class {
  static [b] = "View";
  [fe];
  constructor({ name: t, schema: r, selectedFields: n, query: i }) {
    this[fe] = {
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
    return new I([this]);
  }
};
ee.prototype.getSQL = function () {
  return new I([this]);
};
B.prototype.getSQL = function () {
  return new I([this]);
};
Se.prototype.getSQL = function () {
  return new I([this]);
};
var _t = class {
    constructor(t) {
      this.table = t;
    }
    static [b] = "ColumnAliasProxyHandler";
    get(t, r) {
      return r === "table" ? this.table : t[r];
    }
  },
  zt = class {
    constructor(t, r) {
      (this.alias = t), (this.replaceOriginalName = r);
    }
    static [b] = "TableAliasProxyHandler";
    get(t, r) {
      if (r === B.Symbol.IsAlias) return !0;
      if (r === B.Symbol.Name) return this.alias;
      if (this.replaceOriginalName && r === B.Symbol.OriginalName) return this.alias;
      if (r === fe) return { ...t[fe], name: this.alias, isAlias: !0 };
      if (r === B.Symbol.Columns) {
        let i = t[B.Symbol.Columns];
        if (!i) return i;
        let s = {};
        return (
          Object.keys(i).map((o) => {
            s[o] = new Proxy(i[o], new _t(new Proxy(t, this)));
          }),
          s
        );
      }
      let n = t[r];
      return E(n, ee) ? new Proxy(n, new _t(new Proxy(t, this))) : n;
    }
  },
  Bo = class {
    constructor(t) {
      this.alias = t;
    }
    static [b] = "RelationTableAliasProxyHandler";
    get(t, r) {
      return r === "sourceTable" ? rr(t.sourceTable, this.alias) : t[r];
    }
  };
function rr(e, t) {
  return new Proxy(e, new zt(t, !1));
}
function Ze(e, t) {
  return new Proxy(e, new _t(new Proxy(e.table, new zt(t, !1))));
}
function ai(e, t) {
  return new I.Aliased(nr(e.sql, t), e.fieldAlias);
}
function nr(e, t) {
  return y.join(
    e.queryChunks.map((r) =>
      E(r, ee) ? Ze(r, t) : E(r, I) ? nr(r, t) : E(r, I.Aliased) ? ai(r, t) : r,
    ),
  );
}
var ir = class extends Error {
    static [b] = "DrizzleError";
    constructor({ message: t, cause: r }) {
      super(t), (this.name = "DrizzleError"), (this.cause = r);
    }
  },
  Ur = class extends ir {
    static [b] = "TransactionRollbackError";
    constructor() {
      super({ message: "Rollback" });
    }
  };
function ze(e, t) {
  return xo(t) && !si(e) && !E(e, Re) && !E(e, vt) && !E(e, ee) && !E(e, B) && !E(e, je)
    ? new Re(e, t)
    : e;
}
var Kr = (e, t) => y`${e} = ${ze(t, e)}`,
  jo = (e, t) => y`${e} <> ${ze(t, e)}`;
function sr(...e) {
  let t = e.filter((r) => r !== void 0);
  if (t.length !== 0)
    return t.length === 1
      ? new I(t)
      : new I([new ye("("), y.join(t, new ye(" and ")), new ye(")")]);
}
function Do(...e) {
  let t = e.filter((r) => r !== void 0);
  if (t.length !== 0)
    return t.length === 1 ? new I(t) : new I([new ye("("), y.join(t, new ye(" or ")), new ye(")")]);
}
function zo(e) {
  return y`not ${e}`;
}
var Io = (e, t) => y`${e} > ${ze(t, e)}`,
  qo = (e, t) => y`${e} >= ${ze(t, e)}`,
  Ro = (e, t) => y`${e} < ${ze(t, e)}`,
  Fo = (e, t) => y`${e} <= ${ze(t, e)}`;
function Qo(e, t) {
  if (Array.isArray(t)) {
    if (t.length === 0) throw new Error("inArray requires at least one value");
    return y`${e} in ${t.map((r) => ze(r, e))}`;
  }
  return y`${e} in ${ze(t, e)}`;
}
function ko(e, t) {
  if (Array.isArray(t)) {
    if (t.length === 0) throw new Error("notInArray requires at least one value");
    return y`${e} not in ${t.map((r) => ze(r, e))}`;
  }
  return y`${e} not in ${ze(t, e)}`;
}
function Uo(e) {
  return y`${e} is null`;
}
function Ko(e) {
  return y`${e} is not null`;
}
function Mo(e) {
  return y`exists ${e}`;
}
function Vo(e) {
  return y`not exists ${e}`;
}
function Wo(e, t, r) {
  return y`${e} between ${ze(t, e)} and ${ze(r, e)}`;
}
function Ho(e, t, r) {
  return y`${e} not between ${ze(t, e)} and ${ze(r, e)}`;
}
function Jo(e, t) {
  return y`${e} like ${t}`;
}
function Go(e, t) {
  return y`${e} not like ${t}`;
}
function Xo(e, t) {
  return y`${e} ilike ${t}`;
}
function Yo(e, t) {
  return y`${e} not ilike ${t}`;
}
function Zo(e) {
  return y`${e} asc`;
}
function ea(e) {
  return y`${e} desc`;
}
var li = class {
    static [b] = "ConsoleLogWriter";
    write(t) {
      console.log(t);
    }
  },
  It = class {
    static [b] = "DefaultLogger";
    writer;
    constructor(t) {
      this.writer = t?.writer ?? new li();
    }
    logQuery(t, r) {
      let n = r.map((s) => {
          try {
            return JSON.stringify(s);
          } catch {
            return String(s);
          }
        }),
        i = n.length ? ` -- params: [${n.join(", ")}]` : "";
      this.writer.write(`Query: ${t}${i}`);
    }
  },
  Mr = class {
    static [b] = "NoopLogger";
    logQuery() {}
  };
var $e = class {
  static [b] = "QueryPromise";
  [Symbol.toStringTag] = "QueryPromise";
  catch(t) {
    return this.then(void 0, t);
  }
  finally(t) {
    return this.then(
      (r) => (t?.(), r),
      (r) => {
        throw (t?.(), r);
      },
    );
  }
  then(t, r) {
    return this.execute().then(t, r);
  }
};
var Vr = class {
    static [b] = "PgPrimaryKeyBuilder";
    columns;
    name;
    constructor(t, r) {
      (this.columns = t), (this.name = r);
    }
    build(t) {
      return new ui(t, this.columns, this.name);
    }
  },
  ui = class {
    constructor(t, r, n) {
      (this.table = t), (this.columns = r), (this.name = n);
    }
    static [b] = "PgPrimaryKey";
    columns;
    name;
    getName() {
      return (
        this.name ?? `${this.table[Ce.Symbol.Name]}_${this.columns.map((t) => t.name).join("_")}_pk`
      );
    }
  };
var Wr = class {
    constructor(t, r, n) {
      (this.sourceTable = t),
        (this.referencedTable = r),
        (this.relationName = n),
        (this.referencedTableName = r[B.Symbol.Name]);
    }
    static [b] = "Relation";
    referencedTableName;
    fieldName;
  },
  ci = class {
    constructor(t, r) {
      (this.table = t), (this.config = r);
    }
    static [b] = "Relations";
  },
  dt = class e extends Wr {
    constructor(t, r, n, i) {
      super(t, r, n?.relationName), (this.config = n), (this.isNullable = i);
    }
    static [b] = "One";
    withFieldName(t) {
      let r = new e(this.sourceTable, this.referencedTable, this.config, this.isNullable);
      return (r.fieldName = t), r;
    }
  },
  or = class e extends Wr {
    constructor(t, r, n) {
      super(t, r, n?.relationName), (this.config = n);
    }
    static [b] = "Many";
    withFieldName(t) {
      let r = new e(this.sourceTable, this.referencedTable, this.config);
      return (r.fieldName = t), r;
    }
  };
function ta() {
  return {
    and: sr,
    between: Wo,
    eq: Kr,
    exists: Mo,
    gt: Io,
    gte: qo,
    ilike: Xo,
    inArray: Qo,
    isNull: Uo,
    isNotNull: Ko,
    like: Jo,
    lt: Ro,
    lte: Fo,
    ne: jo,
    not: zo,
    notBetween: Ho,
    notExists: Vo,
    notLike: Go,
    notIlike: Yo,
    notInArray: ko,
    or: Do,
    sql: y,
  };
}
function ra() {
  return { sql: y, asc: Zo, desc: ea };
}
function na(e, t) {
  Object.keys(e).length === 1 && "default" in e && !E(e.default, B) && (e = e.default);
  let r = {},
    n = {},
    i = {};
  for (let [s, o] of Object.entries(e))
    if (bo(o)) {
      let a = o[B.Symbol.Name],
        u = n[a];
      (r[a] = s),
        (i[s] = {
          tsName: s,
          dbName: o[B.Symbol.Name],
          schema: o[B.Symbol.Schema],
          columns: o[B.Symbol.Columns],
          relations: u?.relations ?? {},
          primaryKey: u?.primaryKey ?? [],
        });
      for (let c of Object.values(o[B.Symbol.Columns])) c.primary && i[s].primaryKey.push(c);
      let l = o[B.Symbol.ExtraConfigBuilder]?.(o);
      if (l) for (let c of Object.values(l)) E(c, Vr) && i[s].primaryKey.push(...c.columns);
    } else if (E(o, ci)) {
      let a = o.table[B.Symbol.Name],
        u = r[a],
        l = o.config(t(o.table)),
        c;
      for (let [d, p] of Object.entries(l))
        if (u) {
          let f = i[u];
          (f.relations[d] = p), c && f.primaryKey.push(...c);
        } else a in n || (n[a] = { relations: {}, primaryKey: c }), (n[a].relations[d] = p);
    }
  return { tables: i, tableNamesMap: r };
}
function vh(e) {
  return function (r, n) {
    return new dt(e, r, n, n?.fields.reduce((i, s) => i && s.notNull, !0) ?? !1);
  };
}
function _h(e) {
  return function (r, n) {
    return new or(e, r, n);
  };
}
function ia(e, t, r) {
  if (E(r, dt) && r.config) return { fields: r.config.fields, references: r.config.references };
  let n = t[r.referencedTable[B.Symbol.Name]];
  if (!n) throw new Error(`Table "${r.referencedTable[B.Symbol.Name]}" not found in schema`);
  let i = e[n];
  if (!i) throw new Error(`Table "${n}" not found in schema`);
  let s = r.sourceTable,
    o = t[s[B.Symbol.Name]];
  if (!o) throw new Error(`Table "${s[B.Symbol.Name]}" not found in schema`);
  let a = [];
  for (let u of Object.values(i.relations))
    ((r.relationName && r !== u && u.relationName === r.relationName) ||
      (!r.relationName && u.referencedTable === r.sourceTable)) &&
      a.push(u);
  if (a.length > 1)
    throw r.relationName
      ? new Error(`There are multiple relations with name "${r.relationName}" in table "${n}"`)
      : new Error(
          `There are multiple relations between "${n}" and "${r.sourceTable[B.Symbol.Name]}". Please specify relation name`,
        );
  if (a[0] && E(a[0], dt) && a[0].config)
    return { fields: a[0].config.references, references: a[0].config.fields };
  throw new Error(`There is not enough information to infer relation "${o}.${r.fieldName}"`);
}
function sa(e) {
  return { one: vh(e), many: _h(e) };
}
function Hr(e, t, r, n, i = (s) => s) {
  let s = {};
  for (let [o, a] of n.entries())
    if (a.isJson) {
      let u = t.relations[a.tsKey],
        l = r[o],
        c = typeof l == "string" ? JSON.parse(l) : l;
      s[a.tsKey] = E(u, dt)
        ? c && Hr(e, e[a.relationTableTsKey], c, a.selection, i)
        : c.map((d) => Hr(e, e[a.relationTableTsKey], d, a.selection, i));
    } else {
      let u = i(r[o]),
        l = a.field,
        c;
      E(l, ee) ? (c = l) : E(l, I) ? (c = l.decoder) : (c = l.sql.decoder),
        (s[a.tsKey] = u === null ? null : c.mapFromDriverValue(u));
    }
  return s;
}
function oa(e, t, r) {
  let n = {},
    i = e.reduce((s, { path: o, field: a }, u) => {
      let l;
      E(a, ee) ? (l = a) : E(a, I) ? (l = a.decoder) : (l = a.sql.decoder);
      let c = s;
      for (let [d, p] of o.entries())
        if (d < o.length - 1) p in c || (c[p] = {}), (c = c[p]);
        else {
          let f = t[u],
            m = (c[p] = f === null ? null : l.mapFromDriverValue(f));
          if (r && E(a, ee) && o.length === 2) {
            let w = o[0];
            w in n
              ? typeof n[w] == "string" && n[w] !== ht(a.table) && (n[w] = !1)
              : (n[w] = m === null ? ht(a.table) : !1);
          }
        }
      return s;
    }, {});
  if (r && Object.keys(n).length > 0)
    for (let [s, o] of Object.entries(n)) typeof o == "string" && !r[o] && (i[s] = null);
  return i;
}
function ke(e, t) {
  return Object.entries(e).reduce((r, [n, i]) => {
    if (typeof n != "string") return r;
    let s = t ? [...t, n] : [n];
    return (
      E(i, ee) || E(i, I) || E(i, I.Aliased)
        ? r.push({ path: s, field: i })
        : E(i, B)
          ? r.push(...ke(i[B.Symbol.Columns], s))
          : r.push(...ke(i, s)),
      r
    );
  }, []);
}
function fi(e, t) {
  let r = Object.keys(e),
    n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (let [i, s] of r.entries()) if (s !== n[i]) return !1;
  return !0;
}
function Jr(e, t) {
  let r = Object.entries(t)
    .filter(([, n]) => n !== void 0)
    .map(([n, i]) => (E(i, I) ? [n, i] : [n, new Re(i, e[B.Symbol.Columns][n])]));
  if (r.length === 0) throw new Error("No values to set");
  return Object.fromEntries(r);
}
function aa(e, t) {
  for (let r of t)
    for (let n of Object.getOwnPropertyNames(r.prototype))
      n !== "constructor" &&
        Object.defineProperty(
          e.prototype,
          n,
          Object.getOwnPropertyDescriptor(r.prototype, n) || Object.create(null),
        );
}
function la(e) {
  return e[B.Symbol.Columns];
}
function hi(e) {
  return E(e, Se)
    ? e._.alias
    : E(e, je)
      ? e[fe].name
      : E(e, I)
        ? void 0
        : e[B.Symbol.IsAlias]
          ? e[B.Symbol.Name]
          : e[B.Symbol.BaseName];
}
var ar = class extends $e {
  constructor(t, r, n, i) {
    super(), (this.session = r), (this.dialect = n), (this.config = { table: t, withList: i });
  }
  static [b] = "PgDelete";
  config;
  where(t) {
    return (this.config.where = t), this;
  }
  returning(t = this.config.table[B.Symbol.Columns]) {
    return (this.config.returning = ke(t)), this;
  }
  getSQL() {
    return this.dialect.buildDeleteQuery(this.config);
  }
  toSQL() {
    let { typings: t, ...r } = this.dialect.sqlToQuery(this.getSQL());
    return r;
  }
  _prepare(t) {
    return te.startActiveSpan("drizzle.prepareQuery", () =>
      this.session.prepareQuery(
        this.dialect.sqlToQuery(this.getSQL()),
        this.config.returning,
        t,
        !0,
      ),
    );
  }
  prepare(t) {
    return this._prepare(t);
  }
  execute = (t) => te.startActiveSpan("drizzle.operation", () => this._prepare().execute(t));
  $dynamic() {
    return this;
  }
};
var lr = class {
    constructor(t, r, n, i) {
      (this.table = t), (this.session = r), (this.dialect = n), (this.withList = i);
    }
    static [b] = "PgInsertBuilder";
    values(t) {
      if (((t = Array.isArray(t) ? t : [t]), t.length === 0))
        throw new Error("values() must be called with at least one value");
      let r = t.map((n) => {
        let i = {},
          s = this.table[B.Symbol.Columns];
        for (let o of Object.keys(n)) {
          let a = n[o];
          i[o] = E(a, I) ? a : new Re(a, s[o]);
        }
        return i;
      });
      return new di(this.table, r, this.session, this.dialect, this.withList);
    }
  },
  di = class extends $e {
    constructor(t, r, n, i, s) {
      super(),
        (this.session = n),
        (this.dialect = i),
        (this.config = { table: t, values: r, withList: s });
    }
    static [b] = "PgInsert";
    config;
    returning(t = this.config.table[B.Symbol.Columns]) {
      return (this.config.returning = ke(t)), this;
    }
    onConflictDoNothing(t = {}) {
      if (t.target === void 0) this.config.onConflict = y`do nothing`;
      else {
        let r = "";
        r = Array.isArray(t.target)
          ? t.target.map((i) => this.dialect.escapeName(i.name)).join(",")
          : this.dialect.escapeName(t.target.name);
        let n = t.where ? y` where ${t.where}` : void 0;
        this.config.onConflict = y`(${y.raw(r)})${n} do nothing`;
      }
      return this;
    }
    onConflictDoUpdate(t) {
      if (t.where && (t.targetWhere || t.setWhere))
        throw new Error(
          'You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.',
        );
      let r = t.where ? y` where ${t.where}` : void 0,
        n = t.targetWhere ? y` where ${t.targetWhere}` : void 0,
        i = t.setWhere ? y` where ${t.setWhere}` : void 0,
        s = this.dialect.buildUpdateSet(this.config.table, Jr(this.config.table, t.set)),
        o = "";
      return (
        (o = Array.isArray(t.target)
          ? t.target.map((a) => this.dialect.escapeName(a.name)).join(",")
          : this.dialect.escapeName(t.target.name)),
        (this.config.onConflict = y`(${y.raw(o)})${n} do update set ${s}${r}${i}`),
        this
      );
    }
    getSQL() {
      return this.dialect.buildInsertQuery(this.config);
    }
    toSQL() {
      let { typings: t, ...r } = this.dialect.sqlToQuery(this.getSQL());
      return r;
    }
    _prepare(t) {
      return te.startActiveSpan("drizzle.prepareQuery", () =>
        this.session.prepareQuery(
          this.dialect.sqlToQuery(this.getSQL()),
          this.config.returning,
          t,
          !0,
        ),
      );
    }
    prepare(t) {
      return this._prepare(t);
    }
    execute = (t) => te.startActiveSpan("drizzle.operation", () => this._prepare().execute(t));
    $dynamic() {
      return this;
    }
  };
var et = class extends Be {
  static [b] = "PgDateColumnBaseBuilder";
  defaultNow() {
    return this.default(y`now()`);
  }
};
var ua = class extends et {
    static [b] = "PgDateBuilder";
    constructor(t) {
      super(t, "date", "PgDate");
    }
    build(t) {
      return new ur(t, this.config);
    }
  },
  ur = class extends le {
    static [b] = "PgDate";
    getSQLType() {
      return "date";
    }
    mapFromDriverValue(t) {
      return new Date(t);
    }
    mapToDriverValue(t) {
      return t.toISOString();
    }
  },
  ca = class extends et {
    static [b] = "PgDateStringBuilder";
    constructor(t) {
      super(t, "string", "PgDateString");
    }
    build(t) {
      return new cr(t, this.config);
    }
  },
  cr = class extends le {
    static [b] = "PgDateString";
    getSQLType() {
      return "date";
    }
  };
var fa = class extends Be {
    static [b] = "PgJsonBuilder";
    constructor(t) {
      super(t, "json", "PgJson");
    }
    build(t) {
      return new fr(t, this.config);
    }
  },
  fr = class extends le {
    static [b] = "PgJson";
    constructor(t, r) {
      super(t, r);
    }
    getSQLType() {
      return "json";
    }
    mapToDriverValue(t) {
      return JSON.stringify(t);
    }
    mapFromDriverValue(t) {
      if (typeof t == "string")
        try {
          return JSON.parse(t);
        } catch {
          return t;
        }
      return t;
    }
  };
var ha = class extends Be {
    static [b] = "PgJsonbBuilder";
    constructor(t) {
      super(t, "json", "PgJsonb");
    }
    build(t) {
      return new hr(t, this.config);
    }
  },
  hr = class extends le {
    static [b] = "PgJsonb";
    constructor(t, r) {
      super(t, r);
    }
    getSQLType() {
      return "jsonb";
    }
    mapToDriverValue(t) {
      return JSON.stringify(t);
    }
    mapFromDriverValue(t) {
      if (typeof t == "string")
        try {
          return JSON.parse(t);
        } catch {
          return t;
        }
      return t;
    }
  };
var da = class extends Be {
    static [b] = "PgNumericBuilder";
    constructor(t, r, n) {
      super(t, "string", "PgNumeric"), (this.config.precision = r), (this.config.scale = n);
    }
    build(t) {
      return new dr(t, this.config);
    }
  },
  dr = class extends le {
    static [b] = "PgNumeric";
    precision;
    scale;
    constructor(t, r) {
      super(t, r), (this.precision = r.precision), (this.scale = r.scale);
    }
    getSQLType() {
      return this.precision !== void 0 && this.scale !== void 0
        ? `numeric(${this.precision}, ${this.scale})`
        : this.precision === void 0
          ? "numeric"
          : `numeric(${this.precision})`;
    }
  };
var ma = class extends et {
    constructor(t, r, n) {
      super(t, "string", "PgTime"),
        (this.withTimezone = r),
        (this.precision = n),
        (this.config.withTimezone = r),
        (this.config.precision = n);
    }
    static [b] = "PgTimeBuilder";
    build(t) {
      return new mr(t, this.config);
    }
  },
  mr = class extends le {
    static [b] = "PgTime";
    withTimezone;
    precision;
    constructor(t, r) {
      super(t, r), (this.withTimezone = r.withTimezone), (this.precision = r.precision);
    }
    getSQLType() {
      return `time${this.precision === void 0 ? "" : `(${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
    }
  };
var pa = class extends et {
    static [b] = "PgTimestampBuilder";
    constructor(t, r, n) {
      super(t, "date", "PgTimestamp"), (this.config.withTimezone = r), (this.config.precision = n);
    }
    build(t) {
      return new pr(t, this.config);
    }
  },
  pr = class extends le {
    static [b] = "PgTimestamp";
    withTimezone;
    precision;
    constructor(t, r) {
      super(t, r), (this.withTimezone = r.withTimezone), (this.precision = r.precision);
    }
    getSQLType() {
      return `timestamp${this.precision === void 0 ? "" : ` (${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
    }
    mapFromDriverValue = (t) => new Date(this.withTimezone ? t : t + "+0000");
    mapToDriverValue = (t) => t.toISOString();
  },
  ya = class extends et {
    static [b] = "PgTimestampStringBuilder";
    constructor(t, r, n) {
      super(t, "string", "PgTimestampString"),
        (this.config.withTimezone = r),
        (this.config.precision = n);
    }
    build(t) {
      return new yr(t, this.config);
    }
  },
  yr = class extends le {
    static [b] = "PgTimestampString";
    withTimezone;
    precision;
    constructor(t, r) {
      super(t, r), (this.withTimezone = r.withTimezone), (this.precision = r.precision);
    }
    getSQLType() {
      return `timestamp${this.precision === void 0 ? "" : `(${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
    }
  };
var ga = class extends Be {
    static [b] = "PgUUIDBuilder";
    constructor(t) {
      super(t, "string", "PgUUID");
    }
    defaultRandom() {
      return this.default(y`gen_random_uuid()`);
    }
    build(t) {
      return new gr(t, this.config);
    }
  },
  gr = class extends le {
    static [b] = "PgUUID";
    getSQLType() {
      return "uuid";
    }
  };
var qt = class extends je {
  static [b] = "PgViewBase";
};
var Rt = class {
  static [b] = "PgDialect";
  async migrate(t, r, n) {
    let i =
        typeof n == "string" ? "__drizzle_migrations" : n.migrationsTable ?? "__drizzle_migrations",
      s = typeof n == "string" ? "drizzle" : n.migrationsSchema ?? "drizzle",
      o = y`
			CREATE TABLE IF NOT EXISTS ${y.identifier(s)}.${y.identifier(i)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at bigint
			)
		`;
    await r.execute(y`CREATE SCHEMA IF NOT EXISTS ${y.identifier(s)}`), await r.execute(o);
    let u = (
      await r.all(
        y`select id, hash, created_at from ${y.identifier(s)}.${y.identifier(i)} order by created_at desc limit 1`,
      )
    )[0];
    await r.transaction(async (l) => {
      for await (let c of t)
        if (!u || Number(u.created_at) < c.folderMillis) {
          for (let d of c.sql) await l.execute(y.raw(d));
          await l.execute(
            y`insert into ${y.identifier(s)}.${y.identifier(i)} ("hash", "created_at") values(${c.hash}, ${c.folderMillis})`,
          );
        }
    });
  }
  escapeName(t) {
    return `"${t}"`;
  }
  escapeParam(t) {
    return `$${t + 1}`;
  }
  escapeString(t) {
    return `'${t.replace(/'/g, "''")}'`;
  }
  buildWithCTE(t) {
    if (!t?.length) return;
    let r = [y`with `];
    for (let [n, i] of t.entries())
      r.push(y`${y.identifier(i._.alias)} as (${i._.sql})`), n < t.length - 1 && r.push(y`, `);
    return r.push(y` `), y.join(r);
  }
  buildDeleteQuery({ table: t, where: r, returning: n, withList: i }) {
    let s = this.buildWithCTE(i),
      o = n ? y` returning ${this.buildSelection(n, { isSingleTable: !0 })}` : void 0,
      a = r ? y` where ${r}` : void 0;
    return y`${s}delete from ${t}${a}${o}`;
  }
  buildUpdateSet(t, r) {
    let n = t[B.Symbol.Columns],
      i = Object.keys(n).filter((o) => r[o] !== void 0 || n[o]?.onUpdateFn !== void 0),
      s = i.length;
    return y.join(
      i.flatMap((o, a) => {
        let u = n[o],
          l = r[o] ?? y.param(u.onUpdateFn(), u),
          c = y`${y.identifier(u.name)} = ${l}`;
        return a < s - 1 ? [c, y.raw(", ")] : [c];
      }),
    );
  }
  buildUpdateQuery({ table: t, set: r, where: n, returning: i, withList: s }) {
    let o = this.buildWithCTE(s),
      a = this.buildUpdateSet(t, r),
      u = i ? y` returning ${this.buildSelection(i, { isSingleTable: !0 })}` : void 0,
      l = n ? y` where ${n}` : void 0;
    return y`${o}update ${t} set ${a}${l}${u}`;
  }
  buildSelection(t, { isSingleTable: r = !1 } = {}) {
    let n = t.length,
      i = t.flatMap(({ field: s }, o) => {
        let a = [];
        if (E(s, I.Aliased) && s.isSelectionField) a.push(y.identifier(s.fieldAlias));
        else if (E(s, I.Aliased) || E(s, I)) {
          let u = E(s, I.Aliased) ? s.sql : s;
          r
            ? a.push(new I(u.queryChunks.map((l) => (E(l, le) ? y.identifier(l.name) : l))))
            : a.push(u),
            E(s, I.Aliased) && a.push(y` as ${y.identifier(s.fieldAlias)}`);
        } else E(s, ee) && (r ? a.push(y.identifier(s.name)) : a.push(s));
        return o < n - 1 && a.push(y`, `), a;
      });
    return y.join(i);
  }
  buildSelectQuery({
    withList: t,
    fields: r,
    fieldsFlat: n,
    where: i,
    having: s,
    table: o,
    joins: a,
    orderBy: u,
    groupBy: l,
    limit: c,
    offset: d,
    lockingClause: p,
    distinct: f,
    setOperators: m,
  }) {
    let w = n ?? ke(r);
    for (let J of w)
      if (
        E(J.field, ee) &&
        ht(J.field.table) !==
          (E(o, Se) ? o._.alias : E(o, qt) ? o[fe].name : E(o, I) ? void 0 : ht(o)) &&
        !((G) =>
          a?.some(({ alias: de }) => de === (G[B.Symbol.IsAlias] ? ht(G) : G[B.Symbol.BaseName])))(
          J.field.table,
        )
      ) {
        let G = ht(J.field.table);
        throw new Error(
          `Your "${J.path.join("->")}" field references a column "${G}"."${J.field.name}", but the table "${G}" is not part of the query! Did you forget to join it?`,
        );
      }
    let S = !a || a.length === 0,
      O = this.buildWithCTE(t),
      v;
    f && (v = f === !0 ? y` distinct` : y` distinct on (${y.join(f.on, y`, `)})`);
    let P = this.buildSelection(w, { isSingleTable: S }),
      $ = (() => {
        if (E(o, B) && o[B.Symbol.OriginalName] !== o[B.Symbol.Name]) {
          let J = y`${y.identifier(o[B.Symbol.OriginalName])}`;
          return (
            o[B.Symbol.Schema] && (J = y`${y.identifier(o[B.Symbol.Schema])}.${J}`),
            y`${J} ${y.identifier(o[B.Symbol.Name])}`
          );
        }
        return o;
      })(),
      x = [];
    if (a)
      for (let [J, G] of a.entries()) {
        J === 0 && x.push(y` `);
        let de = G.table,
          N = G.lateral ? y` lateral` : void 0;
        if (E(de, Ce)) {
          let D = de[Ce.Symbol.Name],
            H = de[Ce.Symbol.Schema],
            Y = de[Ce.Symbol.OriginalName],
            se = D === Y ? void 0 : G.alias;
          x.push(
            y`${y.raw(G.joinType)} join${N} ${H ? y`${y.identifier(H)}.` : void 0}${y.identifier(Y)}${se && y` ${y.identifier(se)}`} on ${G.on}`,
          );
        } else if (E(de, je)) {
          let D = de[fe].name,
            H = de[fe].schema,
            Y = de[fe].originalName,
            se = D === Y ? void 0 : G.alias;
          x.push(
            y`${y.raw(G.joinType)} join${N} ${H ? y`${y.identifier(H)}.` : void 0}${y.identifier(Y)}${se && y` ${y.identifier(se)}`} on ${G.on}`,
          );
        } else x.push(y`${y.raw(G.joinType)} join${N} ${de} on ${G.on}`);
        J < a.length - 1 && x.push(y` `);
      }
    let j = y.join(x),
      C = i ? y` where ${i}` : void 0,
      L = s ? y` having ${s}` : void 0,
      k;
    u && u.length > 0 && (k = y` order by ${y.join(u, y`, `)}`);
    let T;
    l && l.length > 0 && (T = y` group by ${y.join(l, y`, `)}`);
    let M = c ? y` limit ${c}` : void 0,
      z = d ? y` offset ${d}` : void 0,
      V = y.empty();
    if (p) {
      let J = y` for ${y.raw(p.strength)}`;
      p.config.of &&
        J.append(y` of ${y.join(Array.isArray(p.config.of) ? p.config.of : [p.config.of], y`, `)}`),
        p.config.noWait ? J.append(y` no wait`) : p.config.skipLocked && J.append(y` skip locked`),
        V.append(J);
    }
    let we = y`${O}select${v} ${P} from ${$}${j}${C}${T}${L}${k}${M}${z}${V}`;
    return m.length > 0 ? this.buildSetOperations(we, m) : we;
  }
  buildSetOperations(t, r) {
    let [n, ...i] = r;
    if (!n) throw new Error("Cannot pass undefined values to any set operator");
    return i.length === 0
      ? this.buildSetOperationQuery({ leftSelect: t, setOperator: n })
      : this.buildSetOperations(this.buildSetOperationQuery({ leftSelect: t, setOperator: n }), i);
  }
  buildSetOperationQuery({
    leftSelect: t,
    setOperator: { type: r, isAll: n, rightSelect: i, limit: s, orderBy: o, offset: a },
  }) {
    let u = y`(${t.getSQL()}) `,
      l = y`(${i.getSQL()})`,
      c;
    if (o && o.length > 0) {
      let m = [];
      for (let w of o)
        if (E(w, le)) m.push(y.identifier(w.name));
        else if (E(w, I)) {
          for (let S = 0; S < w.queryChunks.length; S++) {
            let O = w.queryChunks[S];
            E(O, le) && (w.queryChunks[S] = y.identifier(O.name));
          }
          m.push(y`${w}`);
        } else m.push(y`${w}`);
      c = y` order by ${y.join(m, y`, `)} `;
    }
    let d = s ? y` limit ${s}` : void 0,
      p = y.raw(`${r} ${n ? "all " : ""}`),
      f = a ? y` offset ${a}` : void 0;
    return y`${u}${p}${l}${c}${d}${f}`;
  }
  buildInsertQuery({ table: t, values: r, onConflict: n, returning: i, withList: s }) {
    let o = [],
      a = t[B.Symbol.Columns],
      u = Object.entries(a),
      l = u.map(([, m]) => y.identifier(m.name));
    for (let [m, w] of r.entries()) {
      let S = [];
      for (let [O, v] of u) {
        let P = w[O];
        if (P === void 0 || (E(P, Re) && P.value === void 0))
          if (v.defaultFn !== void 0) {
            let $ = v.defaultFn(),
              x = E($, I) ? $ : y.param($, v);
            S.push(x);
          } else if (!v.default && v.onUpdateFn !== void 0) {
            let $ = v.onUpdateFn(),
              x = E($, I) ? $ : y.param($, v);
            S.push(x);
          } else S.push(y`default`);
        else S.push(P);
      }
      o.push(S), m < r.length - 1 && o.push(y`, `);
    }
    let c = this.buildWithCTE(s),
      d = y.join(o),
      p = i ? y` returning ${this.buildSelection(i, { isSingleTable: !0 })}` : void 0,
      f = n ? y` on conflict ${n}` : void 0;
    return y`${c}insert into ${t} ${l} values ${d}${f}${p}`;
  }
  buildRefreshMaterializedViewQuery({ view: t, concurrently: r, withNoData: n }) {
    let i = r ? y` concurrently` : void 0,
      s = n ? y` with no data` : void 0;
    return y`refresh materialized view${i} ${t}${s}`;
  }
  prepareTyping(t) {
    return E(t, hr) || E(t, fr)
      ? "json"
      : E(t, dr)
        ? "decimal"
        : E(t, mr)
          ? "time"
          : E(t, pr) || E(t, yr)
            ? "timestamp"
            : E(t, ur) || E(t, cr)
              ? "date"
              : E(t, gr)
                ? "uuid"
                : "none";
  }
  sqlToQuery(t) {
    return t.toQuery({
      escapeName: this.escapeName,
      escapeParam: this.escapeParam,
      escapeString: this.escapeString,
      prepareTyping: this.prepareTyping,
    });
  }
  buildRelationalQueryWithoutPK({
    fullSchema: t,
    schema: r,
    tableNamesMap: n,
    table: i,
    tableConfig: s,
    queryConfig: o,
    tableAlias: a,
    nestedQueryRelation: u,
    joinOn: l,
  }) {
    let c = [],
      d,
      p,
      f = [],
      m,
      w = [];
    if (o === !0)
      c = Object.entries(s.columns).map(([v, P]) => ({
        dbKey: P.name,
        tsKey: v,
        field: Ze(P, a),
        relationTableTsKey: void 0,
        isJson: !1,
        selection: [],
      }));
    else {
      let O = Object.fromEntries(Object.entries(s.columns).map(([C, L]) => [C, Ze(L, a)]));
      if (o.where) {
        let C = typeof o.where == "function" ? o.where(O, ta()) : o.where;
        m = C && nr(C, a);
      }
      let v = [],
        P = [];
      if (o.columns) {
        let C = !1;
        for (let [L, k] of Object.entries(o.columns))
          k !== void 0 && L in s.columns && (!C && k === !0 && (C = !0), P.push(L));
        P.length > 0 &&
          (P = C
            ? P.filter((L) => o.columns?.[L] === !0)
            : Object.keys(s.columns).filter((L) => !P.includes(L)));
      } else P = Object.keys(s.columns);
      for (let C of P) {
        let L = s.columns[C];
        v.push({ tsKey: C, value: L });
      }
      let $ = [];
      o.with &&
        ($ = Object.entries(o.with)
          .filter((C) => !!C[1])
          .map(([C, L]) => ({ tsKey: C, queryConfig: L, relation: s.relations[C] })));
      let x;
      if (o.extras) {
        x = typeof o.extras == "function" ? o.extras(O, { sql: y }) : o.extras;
        for (let [C, L] of Object.entries(x)) v.push({ tsKey: C, value: ai(L, a) });
      }
      for (let { tsKey: C, value: L } of v)
        c.push({
          dbKey: E(L, I.Aliased) ? L.fieldAlias : s.columns[C].name,
          tsKey: C,
          field: E(L, ee) ? Ze(L, a) : L,
          relationTableTsKey: void 0,
          isJson: !1,
          selection: [],
        });
      let j = typeof o.orderBy == "function" ? o.orderBy(O, ra()) : o.orderBy ?? [];
      Array.isArray(j) || (j = [j]),
        (f = j.map((C) => (E(C, ee) ? Ze(C, a) : nr(C, a)))),
        (d = o.limit),
        (p = o.offset);
      for (let { tsKey: C, queryConfig: L, relation: k } of $) {
        let T = ia(r, n, k),
          M = k.referencedTable[B.Symbol.Name],
          z = n[M],
          V = `${a}_${C}`,
          we = sr(...T.fields.map((de, N) => Kr(Ze(T.references[N], V), Ze(de, a)))),
          J = this.buildRelationalQueryWithoutPK({
            fullSchema: t,
            schema: r,
            tableNamesMap: n,
            table: t[z],
            tableConfig: r[z],
            queryConfig: E(k, dt) ? (L === !0 ? { limit: 1 } : { ...L, limit: 1 }) : L,
            tableAlias: V,
            joinOn: we,
            nestedQueryRelation: k,
          }),
          G = y`${y.identifier(V)}.${y.identifier("data")}`.as(C);
        w.push({
          on: y`true`,
          table: new Se(J.sql, {}, V),
          alias: V,
          joinType: "left",
          lateral: !0,
        }),
          c.push({
            dbKey: C,
            tsKey: C,
            field: G,
            relationTableTsKey: z,
            isJson: !0,
            selection: J.selection,
          });
      }
    }
    if (c.length === 0)
      throw new ir({ message: `No fields selected for table "${s.tsName}" ("${a}")` });
    let S;
    if (((m = sr(l, m)), u)) {
      let O = y`json_build_array(${y.join(
        c.map(({ field: $, tsKey: x, isJson: j }) =>
          j ? y`${y.identifier(`${a}_${x}`)}.${y.identifier("data")}` : E($, I.Aliased) ? $.sql : $,
        ),
        y`, `,
      )})`;
      E(u, or) &&
        (O = y`coalesce(json_agg(${O}${f.length > 0 ? y` order by ${y.join(f, y`, `)}` : void 0}), '[]'::json)`);
      let v = [
        {
          dbKey: "data",
          tsKey: "data",
          field: O.as("data"),
          isJson: !0,
          relationTableTsKey: s.tsName,
          selection: c,
        },
      ];
      d !== void 0 || p !== void 0 || f.length > 0
        ? ((S = this.buildSelectQuery({
            table: rr(i, a),
            fields: {},
            fieldsFlat: [{ path: [], field: y.raw("*") }],
            where: m,
            limit: d,
            offset: p,
            orderBy: f,
            setOperators: [],
          })),
          (m = void 0),
          (d = void 0),
          (p = void 0),
          (f = []))
        : (S = rr(i, a)),
        (S = this.buildSelectQuery({
          table: E(S, Ce) ? S : new Se(S, {}, a),
          fields: {},
          fieldsFlat: v.map(({ field: $ }) => ({ path: [], field: E($, ee) ? Ze($, a) : $ })),
          joins: w,
          where: m,
          limit: d,
          offset: p,
          orderBy: f,
          setOperators: [],
        }));
    } else
      S = this.buildSelectQuery({
        table: rr(i, a),
        fields: {},
        fieldsFlat: c.map(({ field: O }) => ({ path: [], field: E(O, ee) ? Ze(O, a) : O })),
        joins: w,
        where: m,
        limit: d,
        offset: p,
        orderBy: f,
        setOperators: [],
      });
    return { tableTsKey: s.tsName, sql: S, selection: c };
  }
};
var Ie = class e {
  static [b] = "SelectionProxyHandler";
  config;
  constructor(t) {
    this.config = { ...t };
  }
  get(t, r) {
    if (r === "_") return { ...t._, selectedFields: new Proxy(t._.selectedFields, this) };
    if (r === fe) return { ...t[fe], selectedFields: new Proxy(t[fe].selectedFields, this) };
    if (typeof r == "symbol") return t[r];
    let i = (E(t, Se) ? t._.selectedFields : E(t, je) ? t[fe].selectedFields : t)[r];
    if (E(i, I.Aliased)) {
      if (this.config.sqlAliasedBehavior === "sql" && !i.isSelectionField) return i.sql;
      let s = i.clone();
      return (s.isSelectionField = !0), s;
    }
    if (E(i, I)) {
      if (this.config.sqlBehavior === "sql") return i;
      throw new Error(
        `You tried to reference "${r}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`,
      );
    }
    return E(i, ee)
      ? this.config.alias
        ? new Proxy(
            i,
            new _t(
              new Proxy(i.table, new zt(this.config.alias, this.config.replaceOriginalName ?? !1)),
            ),
          )
        : i
      : typeof i != "object" || i === null
        ? i
        : new Proxy(i, new e(this.config));
  }
};
var Gr = class {
  static [b] = "TypedQueryBuilder";
  getSelectedFields() {
    return this._.selectedFields;
  }
};
var Pe = class {
    static [b] = "PgSelectBuilder";
    fields;
    session;
    dialect;
    withList = [];
    distinct;
    constructor(t) {
      (this.fields = t.fields),
        (this.session = t.session),
        (this.dialect = t.dialect),
        t.withList && (this.withList = t.withList),
        (this.distinct = t.distinct);
    }
    from(t) {
      let r = !!this.fields,
        n;
      return (
        this.fields
          ? (n = this.fields)
          : E(t, Se)
            ? (n = Object.fromEntries(Object.keys(t._.selectedFields).map((i) => [i, t[i]])))
            : E(t, qt)
              ? (n = t[fe].selectedFields)
              : E(t, I)
                ? (n = {})
                : (n = la(t)),
        new Xr({
          table: t,
          fields: n,
          isPartialSelect: r,
          session: this.session,
          dialect: this.dialect,
          withList: this.withList,
          distinct: this.distinct,
        })
      );
    }
  },
  mi = class extends Gr {
    static [b] = "PgSelectQueryBuilder";
    _;
    config;
    joinsNotNullableMap;
    tableName;
    isPartialSelect;
    session;
    dialect;
    constructor({
      table: t,
      fields: r,
      isPartialSelect: n,
      session: i,
      dialect: s,
      withList: o,
      distinct: a,
    }) {
      super(),
        (this.config = { withList: o, table: t, fields: { ...r }, distinct: a, setOperators: [] }),
        (this.isPartialSelect = n),
        (this.session = i),
        (this.dialect = s),
        (this._ = { selectedFields: r }),
        (this.tableName = hi(t)),
        (this.joinsNotNullableMap =
          typeof this.tableName == "string" ? { [this.tableName]: !0 } : {});
    }
    createJoin(t) {
      return (r, n) => {
        let i = this.tableName,
          s = hi(r);
        if (typeof s == "string" && this.config.joins?.some((o) => o.alias === s))
          throw new Error(`Alias "${s}" is already used in this query`);
        if (
          !this.isPartialSelect &&
          (Object.keys(this.joinsNotNullableMap).length === 1 &&
            typeof i == "string" &&
            (this.config.fields = { [i]: this.config.fields }),
          typeof s == "string" && !E(r, I))
        ) {
          let o = E(r, Se)
            ? r._.selectedFields
            : E(r, je)
              ? r[fe].selectedFields
              : r[B.Symbol.Columns];
          this.config.fields[s] = o;
        }
        if (
          (typeof n == "function" &&
            (n = n(
              new Proxy(
                this.config.fields,
                new Ie({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
              ),
            )),
          this.config.joins || (this.config.joins = []),
          this.config.joins.push({ on: n, table: r, joinType: t, alias: s }),
          typeof s == "string")
        )
          switch (t) {
            case "left": {
              this.joinsNotNullableMap[s] = !1;
              break;
            }
            case "right": {
              (this.joinsNotNullableMap = Object.fromEntries(
                Object.entries(this.joinsNotNullableMap).map(([o]) => [o, !1]),
              )),
                (this.joinsNotNullableMap[s] = !0);
              break;
            }
            case "inner": {
              this.joinsNotNullableMap[s] = !0;
              break;
            }
            case "full": {
              (this.joinsNotNullableMap = Object.fromEntries(
                Object.entries(this.joinsNotNullableMap).map(([o]) => [o, !1]),
              )),
                (this.joinsNotNullableMap[s] = !1);
              break;
            }
          }
        return this;
      };
    }
    leftJoin = this.createJoin("left");
    rightJoin = this.createJoin("right");
    innerJoin = this.createJoin("inner");
    fullJoin = this.createJoin("full");
    createSetOperator(t, r) {
      return (n) => {
        let i = typeof n == "function" ? n(Oh()) : n;
        if (!fi(this.getSelectedFields(), i.getSelectedFields()))
          throw new Error(
            "Set operator error (union / intersect / except): selected fields are not the same or are in a different order",
          );
        return this.config.setOperators.push({ type: t, isAll: r, rightSelect: i }), this;
      };
    }
    union = this.createSetOperator("union", !1);
    unionAll = this.createSetOperator("union", !0);
    intersect = this.createSetOperator("intersect", !1);
    intersectAll = this.createSetOperator("intersect", !0);
    except = this.createSetOperator("except", !1);
    exceptAll = this.createSetOperator("except", !0);
    addSetOperators(t) {
      return this.config.setOperators.push(...t), this;
    }
    where(t) {
      return (
        typeof t == "function" &&
          (t = t(
            new Proxy(
              this.config.fields,
              new Ie({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
            ),
          )),
        (this.config.where = t),
        this
      );
    }
    having(t) {
      return (
        typeof t == "function" &&
          (t = t(
            new Proxy(
              this.config.fields,
              new Ie({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
            ),
          )),
        (this.config.having = t),
        this
      );
    }
    groupBy(...t) {
      if (typeof t[0] == "function") {
        let r = t[0](
          new Proxy(
            this.config.fields,
            new Ie({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" }),
          ),
        );
        this.config.groupBy = Array.isArray(r) ? r : [r];
      } else this.config.groupBy = t;
      return this;
    }
    orderBy(...t) {
      if (typeof t[0] == "function") {
        let r = t[0](
            new Proxy(
              this.config.fields,
              new Ie({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" }),
            ),
          ),
          n = Array.isArray(r) ? r : [r];
        this.config.setOperators.length > 0
          ? (this.config.setOperators.at(-1).orderBy = n)
          : (this.config.orderBy = n);
      } else {
        let r = t;
        this.config.setOperators.length > 0
          ? (this.config.setOperators.at(-1).orderBy = r)
          : (this.config.orderBy = r);
      }
      return this;
    }
    limit(t) {
      return (
        this.config.setOperators.length > 0
          ? (this.config.setOperators.at(-1).limit = t)
          : (this.config.limit = t),
        this
      );
    }
    offset(t) {
      return (
        this.config.setOperators.length > 0
          ? (this.config.setOperators.at(-1).offset = t)
          : (this.config.offset = t),
        this
      );
    }
    for(t, r = {}) {
      return (this.config.lockingClause = { strength: t, config: r }), this;
    }
    getSQL() {
      return this.dialect.buildSelectQuery(this.config);
    }
    toSQL() {
      let { typings: t, ...r } = this.dialect.sqlToQuery(this.getSQL());
      return r;
    }
    as(t) {
      return new Proxy(
        new Se(this.getSQL(), this.config.fields, t),
        new Ie({ alias: t, sqlAliasedBehavior: "alias", sqlBehavior: "error" }),
      );
    }
    getSelectedFields() {
      return new Proxy(
        this.config.fields,
        new Ie({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" }),
      );
    }
    $dynamic() {
      return this;
    }
  },
  Xr = class extends mi {
    static [b] = "PgSelect";
    _prepare(t) {
      let { session: r, config: n, dialect: i, joinsNotNullableMap: s } = this;
      if (!r)
        throw new Error(
          "Cannot execute a query on a query builder. Please use a database instance instead.",
        );
      return te.startActiveSpan("drizzle.prepareQuery", () => {
        let o = ke(n.fields),
          a = r.prepareQuery(i.sqlToQuery(this.getSQL()), o, t, !0);
        return (a.joinsNotNullableMap = s), a;
      });
    }
    prepare(t) {
      return this._prepare(t);
    }
    execute = (t) => te.startActiveSpan("drizzle.operation", () => this._prepare().execute(t));
  };
aa(Xr, [$e]);
function Ft(e, t) {
  return (r, n, ...i) => {
    let s = [n, ...i].map((o) => ({ type: e, isAll: t, rightSelect: o }));
    for (let o of s)
      if (!fi(r.getSelectedFields(), o.rightSelect.getSelectedFields()))
        throw new Error(
          "Set operator error (union / intersect / except): selected fields are not the same or are in a different order",
        );
    return r.addSetOperators(s);
  };
}
var Oh = () => ({
    union: Th,
    unionAll: Eh,
    intersect: Nh,
    intersectAll: $h,
    except: Ph,
    exceptAll: Ah,
  }),
  Th = Ft("union", !1),
  Eh = Ft("union", !0),
  Nh = Ft("intersect", !1),
  $h = Ft("intersect", !0),
  Ph = Ft("except", !1),
  Ah = Ft("except", !0);
var Yr = class {
  static [b] = "PgQueryBuilder";
  dialect;
  $with(t) {
    let r = this;
    return {
      as(n) {
        return (
          typeof n == "function" && (n = n(r)),
          new Proxy(
            new Dt(n.getSQL(), n.getSelectedFields(), t, !0),
            new Ie({ alias: t, sqlAliasedBehavior: "alias", sqlBehavior: "error" }),
          )
        );
      },
    };
  }
  with(...t) {
    let r = this;
    function n(o) {
      return new Pe({ fields: o ?? void 0, session: void 0, dialect: r.getDialect(), withList: t });
    }
    function i(o) {
      return new Pe({
        fields: o ?? void 0,
        session: void 0,
        dialect: r.getDialect(),
        distinct: !0,
      });
    }
    function s(o, a) {
      return new Pe({
        fields: a ?? void 0,
        session: void 0,
        dialect: r.getDialect(),
        distinct: { on: o },
      });
    }
    return { select: n, selectDistinct: i, selectDistinctOn: s };
  }
  select(t) {
    return new Pe({ fields: t ?? void 0, session: void 0, dialect: this.getDialect() });
  }
  selectDistinct(t) {
    return new Pe({
      fields: t ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: !0,
    });
  }
  selectDistinctOn(t, r) {
    return new Pe({
      fields: r ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: { on: t },
    });
  }
  getDialect() {
    return this.dialect || (this.dialect = new Rt()), this.dialect;
  }
};
var Zr = class extends $e {
  constructor(t, r, n) {
    super(), (this.session = r), (this.dialect = n), (this.config = { view: t });
  }
  static [b] = "PgRefreshMaterializedView";
  config;
  concurrently() {
    if (this.config.withNoData !== void 0)
      throw new Error("Cannot use concurrently and withNoData together");
    return (this.config.concurrently = !0), this;
  }
  withNoData() {
    if (this.config.concurrently !== void 0)
      throw new Error("Cannot use concurrently and withNoData together");
    return (this.config.withNoData = !0), this;
  }
  getSQL() {
    return this.dialect.buildRefreshMaterializedViewQuery(this.config);
  }
  toSQL() {
    let { typings: t, ...r } = this.dialect.sqlToQuery(this.getSQL());
    return r;
  }
  _prepare(t) {
    return te.startActiveSpan("drizzle.prepareQuery", () =>
      this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), void 0, t, !0),
    );
  }
  prepare(t) {
    return this._prepare(t);
  }
  execute = (t) => te.startActiveSpan("drizzle.operation", () => this._prepare().execute(t));
};
var wr = class {
    constructor(t, r, n, i) {
      (this.table = t), (this.session = r), (this.dialect = n), (this.withList = i);
    }
    static [b] = "PgUpdateBuilder";
    set(t) {
      return new pi(this.table, Jr(this.table, t), this.session, this.dialect, this.withList);
    }
  },
  pi = class extends $e {
    constructor(t, r, n, i, s) {
      super(),
        (this.session = n),
        (this.dialect = i),
        (this.config = { set: r, table: t, withList: s });
    }
    static [b] = "PgUpdate";
    config;
    where(t) {
      return (this.config.where = t), this;
    }
    returning(t = this.config.table[B.Symbol.Columns]) {
      return (this.config.returning = ke(t)), this;
    }
    getSQL() {
      return this.dialect.buildUpdateQuery(this.config);
    }
    toSQL() {
      let { typings: t, ...r } = this.dialect.sqlToQuery(this.getSQL());
      return r;
    }
    _prepare(t) {
      return this.session.prepareQuery(
        this.dialect.sqlToQuery(this.getSQL()),
        this.config.returning,
        t,
        !0,
      );
    }
    prepare(t) {
      return this._prepare(t);
    }
    execute = (t) => this._prepare().execute(t);
    $dynamic() {
      return this;
    }
  };
var en = class {
    constructor(t, r, n, i, s, o, a) {
      (this.fullSchema = t),
        (this.schema = r),
        (this.tableNamesMap = n),
        (this.table = i),
        (this.tableConfig = s),
        (this.dialect = o),
        (this.session = a);
    }
    static [b] = "PgRelationalQueryBuilder";
    findMany(t) {
      return new tn(
        this.fullSchema,
        this.schema,
        this.tableNamesMap,
        this.table,
        this.tableConfig,
        this.dialect,
        this.session,
        t || {},
        "many",
      );
    }
    findFirst(t) {
      return new tn(
        this.fullSchema,
        this.schema,
        this.tableNamesMap,
        this.table,
        this.tableConfig,
        this.dialect,
        this.session,
        t ? { ...t, limit: 1 } : { limit: 1 },
        "first",
      );
    }
  },
  tn = class extends $e {
    constructor(t, r, n, i, s, o, a, u, l) {
      super(),
        (this.fullSchema = t),
        (this.schema = r),
        (this.tableNamesMap = n),
        (this.table = i),
        (this.tableConfig = s),
        (this.dialect = o),
        (this.session = a),
        (this.config = u),
        (this.mode = l);
    }
    static [b] = "PgRelationalQuery";
    _prepare(t) {
      return te.startActiveSpan("drizzle.prepareQuery", () => {
        let { query: r, builtQuery: n } = this._toSQL();
        return this.session.prepareQuery(n, void 0, t, !0, (i, s) => {
          let o = i.map((a) => Hr(this.schema, this.tableConfig, a, r.selection, s));
          return this.mode === "first" ? o[0] : o;
        });
      });
    }
    prepare(t) {
      return this._prepare(t);
    }
    _getQuery() {
      return this.dialect.buildRelationalQueryWithoutPK({
        fullSchema: this.fullSchema,
        schema: this.schema,
        tableNamesMap: this.tableNamesMap,
        table: this.table,
        tableConfig: this.tableConfig,
        queryConfig: this.config,
        tableAlias: this.tableConfig.tsName,
      });
    }
    getSQL() {
      return this._getQuery().sql;
    }
    _toSQL() {
      let t = this._getQuery(),
        r = this.dialect.sqlToQuery(t.sql);
      return { query: t, builtQuery: r };
    }
    toSQL() {
      return this._toSQL().builtQuery;
    }
    execute() {
      return te.startActiveSpan("drizzle.operation", () => this._prepare().execute());
    }
  };
var rn = class extends $e {
  constructor(t, r, n, i) {
    super(), (this.execute = t), (this.sql = r), (this.query = n), (this.mapBatchResult = i);
  }
  static [b] = "PgRaw";
  getSQL() {
    return this.sql;
  }
  getQuery() {
    return this.query;
  }
  mapResult(t, r) {
    return r ? this.mapBatchResult(t) : t;
  }
  _prepare() {
    return this;
  }
  isResponseInArrayMode() {
    return !1;
  }
};
var Qt = class {
  constructor(t, r, n) {
    if (
      ((this.dialect = t),
      (this.session = r),
      (this._ = n
        ? { schema: n.schema, fullSchema: n.fullSchema, tableNamesMap: n.tableNamesMap, session: r }
        : { schema: void 0, fullSchema: {}, tableNamesMap: {}, session: r }),
      (this.query = {}),
      this._.schema)
    )
      for (let [i, s] of Object.entries(this._.schema))
        this.query[i] = new en(
          n.fullSchema,
          this._.schema,
          this._.tableNamesMap,
          n.fullSchema[i],
          s,
          t,
          r,
        );
  }
  static [b] = "PgDatabase";
  query;
  $with(t) {
    return {
      as(r) {
        return (
          typeof r == "function" && (r = r(new Yr())),
          new Proxy(
            new Dt(r.getSQL(), r.getSelectedFields(), t, !0),
            new Ie({ alias: t, sqlAliasedBehavior: "alias", sqlBehavior: "error" }),
          )
        );
      },
    };
  }
  with(...t) {
    let r = this;
    function n(l) {
      return new Pe({ fields: l ?? void 0, session: r.session, dialect: r.dialect, withList: t });
    }
    function i(l) {
      return new Pe({
        fields: l ?? void 0,
        session: r.session,
        dialect: r.dialect,
        withList: t,
        distinct: !0,
      });
    }
    function s(l, c) {
      return new Pe({
        fields: c ?? void 0,
        session: r.session,
        dialect: r.dialect,
        withList: t,
        distinct: { on: l },
      });
    }
    function o(l) {
      return new wr(l, r.session, r.dialect, t);
    }
    function a(l) {
      return new lr(l, r.session, r.dialect, t);
    }
    function u(l) {
      return new ar(l, r.session, r.dialect, t);
    }
    return { select: n, selectDistinct: i, selectDistinctOn: s, update: o, insert: a, delete: u };
  }
  select(t) {
    return new Pe({ fields: t ?? void 0, session: this.session, dialect: this.dialect });
  }
  selectDistinct(t) {
    return new Pe({
      fields: t ?? void 0,
      session: this.session,
      dialect: this.dialect,
      distinct: !0,
    });
  }
  selectDistinctOn(t, r) {
    return new Pe({
      fields: r ?? void 0,
      session: this.session,
      dialect: this.dialect,
      distinct: { on: t },
    });
  }
  update(t) {
    return new wr(t, this.session, this.dialect);
  }
  insert(t) {
    return new lr(t, this.session, this.dialect);
  }
  delete(t) {
    return new ar(t, this.session, this.dialect);
  }
  refreshMaterializedView(t) {
    return new Zr(t, this.session, this.dialect);
  }
  execute(t) {
    let r = t.getSQL(),
      n = this.dialect.sqlToQuery(r),
      i = this.session.prepareQuery(n, void 0, void 0, !1);
    return new rn(
      () => i.execute(),
      r,
      n,
      (s) => i.mapResult(s, !0),
    );
  }
  transaction(t, r) {
    return this.session.transaction(t, r);
  }
};
var nn = class {
    constructor(t) {
      this.query = t;
    }
    getQuery() {
      return this.query;
    }
    mapResult(t, r) {
      return t;
    }
    static [b] = "PgPreparedQuery";
    joinsNotNullableMap;
  },
  sn = class {
    constructor(t) {
      this.dialect = t;
    }
    static [b] = "PgSession";
    execute(t) {
      return te.startActiveSpan("drizzle.operation", () =>
        te
          .startActiveSpan("drizzle.prepareQuery", () =>
            this.prepareQuery(this.dialect.sqlToQuery(t), void 0, void 0, !1),
          )
          .execute(),
      );
    }
    all(t) {
      return this.prepareQuery(this.dialect.sqlToQuery(t), void 0, void 0, !1).all();
    }
  },
  on = class extends Qt {
    constructor(t, r, n, i = 0) {
      super(t, r, n), (this.schema = n), (this.nestedIndex = i);
    }
    static [b] = "PgTransaction";
    rollback() {
      throw new Ur();
    }
    getTransactionConfigSQL(t) {
      let r = [];
      return (
        t.isolationLevel && r.push(`isolation level ${t.isolationLevel}`),
        t.accessMode && r.push(t.accessMode),
        typeof t.deferrable == "boolean" && r.push(t.deferrable ? "deferrable" : "not deferrable"),
        y.raw(r.join(" "))
      );
    }
    setTransaction(t) {
      return this.session.execute(y`set transaction ${this.getTransactionConfigSQL(t)}`);
    }
  };
var yi = class extends nn {
    constructor(t, r, n, i, s, o, a) {
      super({ sql: r, params: n }),
        (this.client = t),
        (this.queryString = r),
        (this.params = n),
        (this.logger = i),
        (this.fields = s),
        (this._isResponseInArrayMode = o),
        (this.customResultMapper = a);
    }
    static [b] = "PostgresJsPreparedQuery";
    async execute(t = {}) {
      return te.startActiveSpan("drizzle.execute", async (r) => {
        let n = oi(this.params, t);
        r?.setAttributes({
          "drizzle.query.text": this.queryString,
          "drizzle.query.params": JSON.stringify(n),
        }),
          this.logger.logQuery(this.queryString, n);
        let {
          fields: i,
          queryString: s,
          client: o,
          joinsNotNullableMap: a,
          customResultMapper: u,
        } = this;
        if (!i && !u) return te.startActiveSpan("drizzle.driver.execute", () => o.unsafe(s, n));
        let l = await te.startActiveSpan(
          "drizzle.driver.execute",
          () => (
            r?.setAttributes({
              "drizzle.query.text": s,
              "drizzle.query.params": JSON.stringify(n),
            }),
            o.unsafe(s, n).values()
          ),
        );
        return te.startActiveSpan("drizzle.mapResponse", () =>
          u ? u(l) : l.map((c) => oa(i, c, a)),
        );
      });
    }
    all(t = {}) {
      return te.startActiveSpan("drizzle.execute", async (r) => {
        let n = oi(this.params, t);
        return (
          r?.setAttributes({
            "drizzle.query.text": this.queryString,
            "drizzle.query.params": JSON.stringify(n),
          }),
          this.logger.logQuery(this.queryString, n),
          te.startActiveSpan(
            "drizzle.driver.execute",
            () => (
              r?.setAttributes({
                "drizzle.query.text": this.queryString,
                "drizzle.query.params": JSON.stringify(n),
              }),
              this.client.unsafe(this.queryString, n)
            ),
          )
        );
      });
    }
    isResponseInArrayMode() {
      return this._isResponseInArrayMode;
    }
  },
  br = class e extends sn {
    constructor(t, r, n, i = {}) {
      super(r),
        (this.client = t),
        (this.schema = n),
        (this.options = i),
        (this.logger = i.logger ?? new Mr());
    }
    static [b] = "PostgresJsSession";
    logger;
    prepareQuery(t, r, n, i, s) {
      return new yi(this.client, t.sql, t.params, this.logger, r, i, s);
    }
    query(t, r) {
      return this.logger.logQuery(t, r), this.client.unsafe(t, r).values();
    }
    queryObjects(t, r) {
      return this.client.unsafe(t, r);
    }
    transaction(t, r) {
      return this.client.begin(async (n) => {
        let i = new e(n, this.dialect, this.schema, this.options),
          s = new gi(this.dialect, i, this.schema);
        return r && (await s.setTransaction(r)), t(s);
      });
    }
  },
  gi = class e extends on {
    constructor(t, r, n, i = 0) {
      super(t, r, n, i), (this.session = r);
    }
    static [b] = "PostgresJsTransaction";
    transaction(t) {
      return this.session.client.savepoint((r) => {
        let n = new br(r, this.dialect, this.schema, this.session.options),
          i = new e(this.dialect, n, this.schema);
        return t(i);
      });
    }
  };
function wa(e, t = {}) {
  let r = (a) => a;
  for (let a of ["1184", "1082", "1083", "1114"])
    (e.options.parsers[a] = r), (e.options.serializers[a] = r);
  let n = new Rt(),
    i;
  t.logger === !0 ? (i = new It()) : t.logger !== !1 && (i = t.logger);
  let s;
  if (t.schema) {
    let a = na(t.schema, sa);
    s = { fullSchema: t.schema, schema: a.tables, tableNamesMap: a.tableNamesMap };
  }
  let o = new br(e, n, s, { logger: i });
  return new Qt(n, o, s);
}
var Ia = ot(require("os"), 1),
  qa = ot(require("fs"), 1);
var an = new Map(),
  wi = new Map(),
  bi = Symbol("OriginError"),
  kt = {},
  Fe = class extends Promise {
    constructor(t, r, n, i, s = {}) {
      let o, a;
      super((u, l) => {
        (o = u), (a = l);
      }),
        (this.tagged = Array.isArray(t.raw)),
        (this.strings = t),
        (this.args = r),
        (this.handler = n),
        (this.canceller = i),
        (this.options = s),
        (this.state = null),
        (this.statement = null),
        (this.resolve = (u) => ((this.active = !1), o(u))),
        (this.reject = (u) => ((this.active = !1), a(u))),
        (this.active = !1),
        (this.cancelled = null),
        (this.executed = !1),
        (this.signature = ""),
        (this[bi] = this.handler.debug ? new Error() : this.tagged && xh(this.strings));
    }
    get origin() {
      return (
        (this.handler.debug
          ? this[bi].stack
          : this.tagged && wi.has(this.strings)
            ? wi.get(this.strings)
            : wi.set(this.strings, this[bi].stack).get(this.strings)) || ""
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
              (this.cursorFn = (a) => (s({ value: a, done: !1 }), new Promise((u) => (n = u)))),
                (this.resolve = () => ((this.active = !1), s({ done: !0 }))),
                (this.reject = (a) => ((this.active = !1), o(a)));
            });
            return this.execute(), i;
          },
          return() {
            return n && n(kt), { done: !0 };
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
function xh(e) {
  if (an.has(e)) return an.get(e);
  let t = Error.stackTraceLimit;
  return (
    (Error.stackTraceLimit = 4), an.set(e, new Error()), (Error.stackTraceLimit = t), an.get(e)
  );
}
var Ot = class extends Error {
    constructor(t) {
      super(t.message), (this.name = this.constructor.name), Object.assign(this, t);
    }
  },
  ge = { connection: ba, postgres: Sa, generic: va, notSupported: _a };
function ba(e, t, r) {
  let { host: n, port: i } = r || t,
    s = Object.assign(
      new Error("write " + e + " " + (t.path || n + ":" + i)),
      { code: e, errno: e, address: t.path || n },
      t.path ? {} : { port: i },
    );
  return Error.captureStackTrace(s, ba), s;
}
function Sa(e) {
  let t = new Ot(e);
  return Error.captureStackTrace(t, Sa), t;
}
function va(e, t) {
  let r = Object.assign(new Error(e + ": " + t), { code: e });
  return Error.captureStackTrace(r, va), r;
}
function _a(e) {
  let t = Object.assign(new Error(e + " (B) is not supported"), {
    code: "MESSAGE_NOT_SUPPORTED",
    name: e,
  });
  return Error.captureStackTrace(t, _a), t;
}
var Lh = {
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
  Sr = class {
    then() {
      Si();
    }
    catch() {
      Si();
    }
    finally() {
      Si();
    }
  },
  Ut = class extends Sr {
    constructor(t) {
      super(), (this.value = fn(t));
    }
  },
  We = class extends Sr {
    constructor(t, r, n) {
      super(), (this.value = t), (this.type = r), (this.array = n);
    }
  },
  vr = class extends Sr {
    constructor(t, r) {
      super(), (this.first = t), (this.rest = r);
    }
    build(t, r, n, i) {
      let s = Ch.map(([o, a]) => ({ fn: a, i: t.search(o) }))
        .sort((o, a) => o.i - a.i)
        .pop();
      return s.i === -1 ? Ei(this.first, i) : s.fn(this.first, this.rest, r, n, i);
    }
  };
function cn(e, t, r, n) {
  let i = e instanceof We ? e.value : e;
  if (
    i === void 0 &&
    (e instanceof We ? (e.value = n.transform.undefined) : (i = e = n.transform.undefined),
    i === void 0)
  )
    throw ge.generic("UNDEFINED_VALUE", "Undefined values are not allowed");
  return (
    "$" +
    r.push(
      e instanceof We
        ? (t.push(e.value),
          e.array ? e.array[e.type || un(e.value)] || e.type || Na(e.value) : e.type)
        : (t.push(e), un(e)),
    )
  );
}
var Ta = Pa(Lh);
function Oi(e, t, r, n, i, s) {
  for (let o = 1; o < e.strings.length; o++)
    (t += Ti(t, r, n, i, s) + e.strings[o]), (r = e.args[o]);
  return t;
}
function Ti(e, t, r, n, i) {
  return t instanceof vr
    ? t.build(e, r, n, i)
    : t instanceof Fe
      ? _i(t, r, n, i)
      : t instanceof Ut
        ? t.value
        : t && t[0] instanceof Fe
          ? t.reduce((s, o) => s + " " + _i(o, r, n, i), "")
          : cn(t, r, n, i);
}
function _i(e, t, r, n) {
  return (e.fragment = !0), Oi(e, e.strings[0], e.args[0], t, r, n);
}
function Ea(e, t, r, n, i) {
  return e.map((s) => "(" + n.map((o) => Ti("values", s[o], t, r, i)).join(",") + ")").join(",");
}
function Oa(e, t, r, n, i) {
  let s = Array.isArray(e[0]),
    o = t.length ? t.flat() : Object.keys(s ? e[0] : e);
  return Ea(s ? e : [e], r, n, o, i);
}
function ln(e, t, r, n, i) {
  if ((typeof e == "string" && (e = [e].concat(t)), Array.isArray(e))) return Ei(e, i);
  let s;
  return (t.length ? t.flat() : Object.keys(e))
    .map(
      (a) => (
        (s = e[a]),
        (s instanceof Fe ? _i(s, r, n, i) : s instanceof Ut ? s.value : cn(s, r, n, i)) +
          " as " +
          fn(i.transform.column.to ? i.transform.column.to(a) : a)
      ),
    )
    .join(",");
}
var Ch = Object.entries({
  values: Oa,
  in: (...e) => {
    let t = Oa(...e);
    return t === "()" ? "(null)" : t;
  },
  select: ln,
  as: ln,
  returning: ln,
  "\\(": ln,
  update(e, t, r, n, i) {
    return (t.length ? t.flat() : Object.keys(e)).map(
      (s) =>
        fn(i.transform.column.to ? i.transform.column.to(s) : s) +
        "=" +
        Ti("values", e[s], r, n, i),
    );
  },
  insert(e, t, r, n, i) {
    let s = t.length ? t.flat() : Object.keys(Array.isArray(e) ? e[0] : e);
    return "(" + Ei(s, i) + ")values" + Ea(Array.isArray(e) ? e : [e], r, n, s, i);
  },
}).map(([e, t]) => [new RegExp("((?:^|[\\s(])" + e + "(?:$|[\\s(]))(?![\\s\\S]*\\1)", "i"), t]);
function Si() {
  throw ge.generic("NOT_TAGGED_CALL", "Query not called as a tagged template literal");
}
var Bh = Ta.serializers,
  jh = Ta.parsers;
function Na(e) {
  return Array.isArray(e) ? Na(e[0]) : typeof e == "string" ? 1009 : 0;
}
var $a = function (e) {
  let t = Pa(e || {});
  return {
    serializers: Object.assign({}, Bh, t.serializers),
    parsers: Object.assign({}, jh, t.parsers),
  };
};
function Pa(e) {
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
function Ei(e, { transform: { column: t } }) {
  return e.map((r) => fn(t.to ? t.to(r) : r)).join(",");
}
var fn = function (t) {
    return '"' + t.replace(/"/g, '""').replace(/\./g, '"."') + '"';
  },
  un = function e(t) {
    return t instanceof We
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
  Dh = /\\/g,
  zh = /"/g;
function Ih(e) {
  return e.replace(Dh, "\\\\").replace(zh, '\\"');
}
var Aa = function e(t, r, n, i) {
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
                throw ge.generic("UNDEFINED_VALUE", "Undefined values are not allowed");
              return a === null ? "null" : '"' + Ih(r ? r(a.type ? a.value : a) : "" + a) + '"';
            })
            .join(o) +
          "}";
  },
  vi = { i: 0, char: null, str: "", quoted: !1, last: 0 },
  xa = function (t, r, n) {
    return (vi.i = vi.last = 0), La(vi, t, r, n);
  };
function La(e, t, r, n) {
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
    else if (e.char === "{") (e.last = ++e.i), i.push(La(e, t, r, n));
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
var Tt = (e) => {
    let t = e[0];
    for (let r = 1; r < e.length; r++) t += e[r] === "_" ? e[++r].toUpperCase() : e[r];
    return t;
  },
  Et = (e) => {
    let t = e[0].toUpperCase();
    for (let r = 1; r < e.length; r++) t += e[r] === "_" ? e[++r].toUpperCase() : e[r];
    return t;
  },
  Nt = (e) => e.replace(/_/g, "-"),
  _r = (e) => e.replace(/([A-Z])/g, "_$1").toLowerCase(),
  Or = (e) => (e.slice(0, 1) + e.slice(1).replace(/([A-Z])/g, "_$1")).toLowerCase(),
  Tr = (e) => e.replace(/-/g, "_");
function Ni(e) {
  return function t(r, n) {
    return typeof r == "object" && r !== null && (n.type === 114 || n.type === 3802)
      ? Array.isArray(r)
        ? r.map((i) => t(i, n))
        : Object.entries(r).reduce((i, [s, o]) => Object.assign(i, { [e(s)]: t(o, n) }), {})
      : r;
  };
}
Tt.column = { from: Tt };
Tt.value = { from: Ni(Tt) };
_r.column = { to: _r };
var $i = { ...Tt };
$i.column.to = _r;
Et.column = { from: Et };
Et.value = { from: Ni(Et) };
Or.column = { to: Or };
var Pi = { ...Et };
Pi.column.to = Or;
Nt.column = { from: Nt };
Nt.value = { from: Ni(Nt) };
Tr.column = { to: Tr };
var Ai = { ...Nt };
Ai.column.to = Tr;
var Ci = ot(require("net"), 1),
  ja = ot(require("tls"), 1),
  Mt = ot(require("crypto"), 1),
  mn = ot(require("stream"), 1),
  Bi = require("perf_hooks");
var mt = class extends Array {
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
var Qe = qh;
function qh(e = []) {
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
var Ae = Buffer.allocUnsafe(256),
  Rh = "BCcDdEFfHPpQSX".split("").reduce((e, t) => {
    let r = t.charCodeAt(0);
    return (e[t] = () => ((Ae[0] = r), (Z.i = 5), Z)), e;
  }, {}),
  Z = Object.assign(Fh, Rh, {
    N: "\0",
    i: 0,
    inc(e) {
      return (Z.i += e), Z;
    },
    str(e) {
      let t = Buffer.byteLength(e);
      return hn(t), (Z.i += Ae.write(e, Z.i, t, "utf8")), Z;
    },
    i16(e) {
      return hn(2), Ae.writeUInt16BE(e, Z.i), (Z.i += 2), Z;
    },
    i32(e, t) {
      return t || t === 0
        ? (Ae.writeUInt32BE(e, t), Z)
        : (hn(4), Ae.writeUInt32BE(e, Z.i), (Z.i += 4), Z);
    },
    z(e) {
      return hn(e), Ae.fill(0, Z.i, Z.i + e), (Z.i += e), Z;
    },
    raw(e) {
      return (Ae = Buffer.concat([Ae.subarray(0, Z.i), e])), (Z.i = Ae.length), Z;
    },
    end(e = 1) {
      Ae.writeUInt32BE(Z.i - e, e);
      let t = Ae.subarray(0, Z.i);
      return (Z.i = 0), (Ae = Buffer.allocUnsafe(256)), t;
    },
  }),
  q = Z;
function hn(e) {
  if (Ae.length - Z.i < e) {
    let t = Ae,
      r = t.length;
    (Ae = Buffer.allocUnsafe(r + (r >> 1) + e)), t.copy(Ae);
  }
}
function Fh() {
  return (Z.i = 0), Z;
}
var ji = Da,
  Qh = 1,
  pt = q().S().end(),
  Ca = q().H().end(),
  kh = q().i32(8).i32(80877103).end(8),
  Uh = Buffer.concat([q().E().str(q.N).i32(0).end(), pt]),
  Kh = q().D().str("S").str(q.N).end(),
  Kt = () => {},
  Mh = new Set(["FetchPreparedStatement", "RevalidateCachedQuery", "transformAssignedExpr"]),
  Vh = {
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
function Da(e, t = {}, { onopen: r = Kt, onend: n = Kt, onclose: i = Kt } = {}) {
  let {
      ssl: s,
      max: o,
      user: a,
      host: u,
      port: l,
      database: c,
      parsers: d,
      transform: p,
      onnotice: f,
      onnotify: m,
      onparameter: w,
      max_pipeline: S,
      keep_alive: O,
      backoff: v,
      target_session_attrs: P,
    } = e,
    $ = Qe(),
    x = Qh++,
    j = { pid: null, secret: null },
    C = Li(Kn, e.idle_timeout),
    L = Li(Kn, e.max_lifetime),
    k = Li(Nf, e.connect_timeout),
    T = null,
    M,
    z = new mt(),
    V = Buffer.alloc(0),
    we = e.fetch_types,
    J = {},
    G = {},
    de = Math.random().toString(36).slice(2),
    N = 1,
    D = 0,
    H = 0,
    Y = 0,
    se = 0,
    W = 0,
    re = 0,
    pe = 0,
    ce = null,
    oe = null,
    Oe = !1,
    ne = null,
    Me = null,
    Te = null,
    ct = null,
    be = null,
    ae = null,
    Ve = null,
    Xe = null,
    A = null,
    Yt = null,
    Ee = {
      queue: t.closed,
      idleTimer: C,
      connect(h) {
        (Te = h || !0), lo();
      },
      terminate: er,
      execute: Zt,
      cancel: _f,
      end: Kn,
      count: 0,
      id: x,
    };
  return t.closed && t.closed.push(Ee), Ee;
  async function vf() {
    let h;
    try {
      h = e.socket ? await Promise.resolve(e.socket(e)) : new Ci.default.Socket();
    } catch (g) {
      jt(g);
      return;
    }
    return h.on("error", jt), h.on("close", uo), h.on("drain", oo), h;
  }
  async function _f({ pid: h, secret: g }, R, X) {
    try {
      (M = q().i32(16).i32(80877102).i32(h).i32(g).end(16)),
        await ao(),
        T.once("error", X),
        T.once("close", R);
    } catch (he) {
      X(he);
    }
  }
  function Zt(h) {
    if (Oe) return Ir(h, ge.connection("CONNECTION_DESTROYED", e));
    if (!h.cancelled)
      try {
        return (
          (h.state = j),
          A ? $.push(h) : ((A = h), (A.active = !0)),
          Ef(h),
          ve(Of(h)) &&
            !h.describeFirst &&
            !h.cursorFn &&
            $.length < S &&
            (!h.options.onexecute || h.options.onexecute(Ee))
        );
      } catch (g) {
        return $.length === 0 && ve(pt), Ye(g), !0;
      }
  }
  function Of(h) {
    if (h.parameters.length >= 65534)
      throw ge.generic("MAX_PARAMETERS_EXCEEDED", "Max number of parameters (65534) exceeded");
    return h.options.simple
      ? q()
          .Q()
          .str(h.statement.string + q.N)
          .end()
      : h.describeFirst
        ? Buffer.concat([no(h), Ca])
        : h.prepare
          ? h.prepared
            ? zr(h)
            : Buffer.concat([no(h), zr(h)])
          : Tf(h);
  }
  function no(h) {
    return Buffer.concat([
      fo(h.statement.string, h.parameters, h.statement.types, h.statement.name),
      ch("S", h.statement.name),
    ]);
  }
  function zr(h) {
    return Buffer.concat([
      uh(h.parameters, h.statement.types, h.statement.name, h.cursorName),
      h.cursorFn ? ho("", h.cursorRows) : Uh,
    ]);
  }
  function Tf(h) {
    return Buffer.concat([fo(h.statement.string, h.parameters, h.statement.types), Kh, zr(h)]);
  }
  function Ef(h) {
    let g = [],
      R = [],
      X = Oi(h, h.strings[0], h.args[0], g, R, e);
    !h.tagged && h.args.forEach((he) => cn(he, g, R, e)),
      (h.prepare = e.prepare && ("prepare" in h.options ? h.options.prepare : !0)),
      (h.string = X),
      (h.signature = h.prepare && R + X),
      h.onlyDescribe && delete G[h.signature],
      (h.parameters = h.parameters || g),
      (h.prepared = h.prepare && h.signature in G),
      (h.describeFirst = h.onlyDescribe || (g.length && !h.prepared)),
      (h.statement = h.prepared
        ? G[h.signature]
        : { string: X, types: R, name: h.prepare ? de + N++ : "" }),
      typeof e.debug == "function" && e.debug(x, X, g, R);
  }
  function ve(h, g) {
    return (
      (ae = ae ? Buffer.concat([ae, h]) : Buffer.from(h)),
      g || ae.length >= 1024 ? io(g) : (oe === null && (oe = setImmediate(io)), !0)
    );
  }
  function io(h) {
    let g = T.write(ae, h);
    return oe !== null && clearImmediate(oe), (ae = oe = null), g;
  }
  function Nf() {
    Ye(ge.connection("CONNECT_TIMEOUT", e, T)), T.destroy();
  }
  async function so() {
    if (
      (ve(kh), !(await new Promise((g) => T.once("data", (R) => g(R[0] === 83)))) && s === "prefer")
    )
      return Bt();
    T.removeAllListeners(),
      (T = ja.default.connect({
        socket: T,
        servername: Ci.default.isIP(T.host) ? void 0 : T.host,
        ...(s === "require" || s === "allow" || s === "prefer"
          ? { rejectUnauthorized: !1 }
          : s === "verify-full"
            ? {}
            : typeof s == "object"
              ? s
              : {}),
      })),
      T.on("secureConnect", Bt),
      T.on("error", jt),
      T.on("close", uo),
      T.on("drain", oo);
  }
  function oo() {
    !A && r(Ee);
  }
  function Un(h) {
    if (!(ne && (ne.push(h), (H -= h.length), H >= 0)))
      for (
        V = ne
          ? Buffer.concat(ne, W - H)
          : V.length === 0
            ? h
            : Buffer.concat([V, h], V.length + h.length);
        V.length > 4;

      ) {
        if (((W = V.readUInt32BE(1)), W >= V.length)) {
          (H = W - V.length), (ne = [V]);
          break;
        }
        try {
          $f(V.subarray(0, W + 1));
        } catch (g) {
          A && (A.cursorFn || A.describeFirst) && ve(pt), Ye(g);
        }
        (V = V.subarray(W + 1)), (H = 0), (ne = null);
      }
  }
  async function ao() {
    if (((Oe = !1), (J = {}), T || (T = await vf()), !!T)) {
      if ((k.start(), e.socket)) return s ? so() : Bt();
      if ((T.on("connect", s ? so : Bt), e.path)) return T.connect(e.path);
      (T.ssl = s),
        T.connect(l[Y], u[Y]),
        (T.host = u[Y]),
        (T.port = l[Y]),
        (Y = (Y + 1) % l.length);
    }
  }
  function lo() {
    setTimeout(ao, D ? D + re - Bi.performance.now() : 0);
  }
  function Bt() {
    try {
      (G = {}),
        (we = e.fetch_types),
        (de = Math.random().toString(36).slice(2)),
        (N = 1),
        L.start(),
        T.on("data", Un),
        O && T.setKeepAlive && T.setKeepAlive(!0, 1e3 * O);
      let h = hh();
      ve(h);
    } catch (h) {
      jt(h);
    }
  }
  function jt(h) {
    if (!(Ee.queue === t.connecting && e.host[se + 1])) for (Ye(h); $.length; ) Ir($.shift(), h);
  }
  function Ye(h) {
    be && (be.destroy(h), (be = null)), A && Ir(A, h), Te && (Ir(Te, h), (Te = null));
  }
  function Ir(h, g) {
    Object.defineProperties(g, {
      stack: {
        value:
          g.stack +
          h.origin.replace(
            /.*\n/,
            `
`,
          ),
        enumerable: e.debug,
      },
      query: { value: h.string, enumerable: e.debug },
      parameters: { value: h.parameters, enumerable: e.debug },
      args: { value: h.args, enumerable: e.debug },
      types: { value: h.statement && h.statement.types, enumerable: e.debug },
    }),
      h.reject(g);
  }
  function Kn() {
    return (
      ct ||
      (!Ee.reserved && n(Ee),
      !Ee.reserved && !Te && !A && $.length === 0
        ? (er(), new Promise((h) => (T && T.readyState !== "closed" ? T.once("close", h) : h())))
        : (ct = new Promise((h) => (Ve = h))))
    );
  }
  function er() {
    (Oe = !0),
      (be || A || Te || $.length) && jt(ge.connection("CONNECTION_DESTROYED", e)),
      clearImmediate(oe),
      T &&
        (T.removeListener("data", Un),
        T.removeListener("connect", Bt),
        T.readyState === "open" && T.end(q().X().end())),
      Ve && (Ve(), (ct = Ve = null));
  }
  async function uo(h) {
    if (
      ((V = Buffer.alloc(0)),
      (H = 0),
      (ne = null),
      clearImmediate(oe),
      T.removeListener("data", Un),
      T.removeListener("connect", Bt),
      C.cancel(),
      L.cancel(),
      k.cancel(),
      T.removeAllListeners(),
      (T = null),
      Te)
    )
      return lo();
    !h && (A || $.length) && jt(ge.connection("CONNECTION_CLOSED", e, T)),
      (D = Bi.performance.now()),
      h && e.shared.retries++,
      (re = (typeof v == "function" ? v(e.shared.retries) : v) * 1e3),
      i(Ee, ge.connection("CONNECTION_CLOSED", e, T));
  }
  function $f(h, g = h[0]) {
    (g === 68
      ? Pf
      : g === 100
        ? th
        : g === 65
          ? Jf
          : g === 83
            ? Af
            : g === 90
              ? xf
              : g === 67
                ? Lf
                : g === 50
                  ? co
                  : g === 49
                    ? Cf
                    : g === 116
                      ? Bf
                      : g === 84
                        ? jf
                        : g === 82
                          ? Df
                          : g === 110
                            ? Qf
                            : g === 75
                              ? kf
                              : g === 69
                                ? Wf
                                : g === 115
                                  ? Gf
                                  : g === 51
                                    ? Xf
                                    : g === 71
                                      ? Yf
                                      : g === 78
                                        ? nh
                                        : g === 72
                                          ? Zf
                                          : g === 99
                                            ? rh
                                            : g === 73
                                              ? ih
                                              : g === 86
                                                ? sh
                                                : g === 118
                                                  ? oh
                                                  : g === 87
                                                    ? eh
                                                    : ah)(h);
  }
  function Pf(h) {
    let g = 7,
      R,
      X,
      he,
      Ne = A.isRaw ? new Array(A.statement.columns.length) : {};
    for (let Le = 0; Le < A.statement.columns.length; Le++)
      (X = A.statement.columns[Le]),
        (R = h.readInt32BE(g)),
        (g += 4),
        (he =
          R === -1
            ? null
            : A.isRaw === !0
              ? h.subarray(g, (g += R))
              : X.parser === void 0
                ? h.toString("utf8", g, (g += R))
                : X.parser.array === !0
                  ? X.parser(h.toString("utf8", g + 1, (g += R)))
                  : X.parser(h.toString("utf8", g, (g += R)))),
        A.isRaw
          ? (Ne[Le] = A.isRaw === !0 ? he : p.value.from ? p.value.from(he, X) : he)
          : (Ne[X.name] = p.value.from ? p.value.from(he, X) : he);
    A.forEachFn
      ? A.forEachFn(p.row.from ? p.row.from(Ne) : Ne, z)
      : (z[pe++] = p.row.from ? p.row.from(Ne) : Ne);
  }
  function Af(h) {
    let [g, R] = h.toString("utf8", 5, h.length - 1).split(q.N);
    (J[g] = R), e.parameters[g] !== R && ((e.parameters[g] = R), w && w(g, R));
  }
  function xf(h) {
    if (
      (A && A.options.simple && A.resolve(Me || z), (A = Me = null), (z = new mt()), k.cancel(), Te)
    ) {
      if (P) {
        if (!J.in_hot_standby || !J.default_transaction_read_only) return Vf();
        if (Mf(P, J)) return er();
      }
      if (we) return Te === !0 && (Te = null), Uf();
      Te !== !0 && Zt(Te), (e.shared.retries = se = 0), (Te = null);
      return;
    }
    for (; $.length && (A = $.shift()) && ((A.active = !0), A.cancelled); )
      Da(e).cancel(A.state, A.cancelled.resolve, A.cancelled.reject);
    A ||
      (Ee.reserved
        ? !Ee.reserved.release && h[5] === 73
          ? ct
            ? er()
            : ((Ee.reserved = null), r(Ee))
          : Ee.reserved()
        : ct
          ? er()
          : r(Ee));
  }
  function Lf(h) {
    pe = 0;
    for (let g = h.length - 1; g > 0; g--)
      if (
        (h[g] === 32 &&
          h[g + 1] < 58 &&
          z.count === null &&
          (z.count = +h.toString("utf8", g + 1, h.length - 1)),
        h[g - 1] >= 65)
      ) {
        (z.command = h.toString("utf8", 5, g)), (z.state = j);
        break;
      }
    if ((Yt && (Yt(), (Yt = null)), z.command === "BEGIN" && o !== 1 && !Ee.reserved))
      return Ye(ge.generic("UNSAFE_TRANSACTION", "Only use sql.begin, sql.reserved or max: 1"));
    if (A.options.simple) return co();
    A.cursorFn && (z.count && A.cursorFn(z), ve(pt)), A.resolve(z);
  }
  function Cf() {
    A.parsing = !1;
  }
  function co() {
    !z.statement && (z.statement = A.statement), (z.columns = A.statement.columns);
  }
  function Bf(h) {
    let g = h.readUInt16BE(5);
    for (let R = 0; R < g; ++R)
      !A.statement.types[R] && (A.statement.types[R] = h.readUInt32BE(7 + R * 4));
    A.prepare && (G[A.signature] = A.statement),
      A.describeFirst && !A.onlyDescribe && (ve(zr(A)), (A.describeFirst = !1));
  }
  function jf(h) {
    z.command &&
      ((Me = Me || [z]), Me.push((z = new mt())), (z.count = null), (A.statement.columns = null));
    let g = h.readUInt16BE(5),
      R = 7,
      X;
    A.statement.columns = Array(g);
    for (let he = 0; he < g; ++he) {
      for (X = R; h[R++] !== 0; );
      let Ne = h.readUInt32BE(R),
        Le = h.readUInt16BE(R + 4),
        ft = h.readUInt32BE(R + 6);
      (A.statement.columns[he] = {
        name: p.column.from
          ? p.column.from(h.toString("utf8", X, R - 1))
          : h.toString("utf8", X, R - 1),
        parser: d[ft],
        table: Ne,
        number: Le,
        type: ft,
      }),
        (R += 18);
    }
    if (((z.statement = A.statement), A.onlyDescribe)) return A.resolve(A.statement), ve(pt);
  }
  async function Df(h, g = h.readUInt32BE(5)) {
    (g === 3
      ? zf
      : g === 5
        ? If
        : g === 10
          ? qf
          : g === 11
            ? Rf
            : g === 12
              ? Ff
              : g !== 0
                ? lh
                : Kt)(h, g);
  }
  async function zf() {
    let h = await Mn();
    ve(q().p().str(h).z(1).end());
  }
  async function If(h) {
    let g =
      "md5" + (await Ba(Buffer.concat([Buffer.from(await Ba((await Mn()) + a)), h.subarray(9)])));
    ve(q().p().str(g).z(1).end());
  }
  async function qf() {
    (Xe = (await Mt.default.randomBytes(18)).toString("base64")),
      q()
        .p()
        .str("SCRAM-SHA-256" + q.N);
    let h = q.i;
    ve(
      q
        .inc(4)
        .str("n,,n=*,r=" + Xe)
        .i32(q.i - h - 4, h)
        .end(),
    );
  }
  async function Rf(h) {
    let g = h
        .toString("utf8", 9)
        .split(",")
        .reduce((Le, ft) => ((Le[ft[0]] = ft.slice(2)), Le), {}),
      R = await Mt.default.pbkdf2Sync(
        await Mn(),
        Buffer.from(g.s, "base64"),
        parseInt(g.i),
        32,
        "sha256",
      ),
      X = await dn(R, "Client Key"),
      he = "n=*,r=" + Xe + ",r=" + g.r + ",s=" + g.s + ",i=" + g.i + ",c=biws,r=" + g.r;
    ce = (await dn(await dn(R, "Server Key"), he)).toString("base64");
    let Ne =
      "c=biws,r=" + g.r + ",p=" + Hh(X, Buffer.from(await dn(await Wh(X), he))).toString("base64");
    ve(q().p().str(Ne).end());
  }
  function Ff(h) {
    h.toString("utf8", 9).split(q.N, 1)[0].slice(2) !== ce &&
      (Ye(ge.generic("SASL_SIGNATURE_MISMATCH", "The server did not return the correct signature")),
      T.destroy());
  }
  function Mn() {
    return Promise.resolve(typeof e.pass == "function" ? e.pass() : e.pass);
  }
  function Qf() {
    if (((z.statement = A.statement), (z.statement.columns = []), A.onlyDescribe))
      return A.resolve(A.statement), ve(pt);
  }
  function kf(h) {
    (j.pid = h.readUInt32BE(5)), (j.secret = h.readUInt32BE(9));
  }
  async function Uf() {
    (we = !1),
      (
        await new Fe(
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
          Zt,
        )
      ).forEach(({ oid: g, typarray: R }) => Kf(g, R));
  }
  function Kf(h, g) {
    if (e.parsers[g] && e.serializers[g]) return;
    let R = e.parsers[h];
    (e.shared.typeArrayMap[h] = g),
      (e.parsers[g] = (X) => xa(X, R, g)),
      (e.parsers[g].array = !0),
      (e.serializers[g] = (X) => Aa(X, e.serializers[h], e, g));
  }
  function Mf(h, g) {
    return (
      (h === "read-write" && g.default_transaction_read_only === "on") ||
      (h === "read-only" && g.default_transaction_read_only === "off") ||
      (h === "primary" && g.in_hot_standby === "on") ||
      (h === "standby" && g.in_hot_standby === "off") ||
      (h === "prefer-standby" && g.in_hot_standby === "off" && e.host[se])
    );
  }
  function Vf() {
    let h = new Fe(
      [
        `
      show transaction_read_only;
      select pg_catalog.pg_is_in_recovery()
    `,
      ],
      [],
      Zt,
      null,
      { simple: !0 },
    );
    (h.resolve = ([[g], [R]]) => {
      (J.default_transaction_read_only = g.transaction_read_only),
        (J.in_hot_standby = R.pg_is_in_recovery ? "on" : "off");
    }),
      h.execute();
  }
  function Wf(h) {
    A && (A.cursorFn || A.describeFirst) && ve(pt);
    let g = ge.postgres(xi(h));
    A && A.retried ? Ye(A.retried) : A && A.prepared && Mh.has(g.routine) ? Hf(A, g) : Ye(g);
  }
  function Hf(h, g) {
    delete G[h.signature], (h.retried = g), Zt(h);
  }
  function Jf(h) {
    if (!m) return;
    let g = 9;
    for (; h[g++] !== 0; );
    m(h.toString("utf8", 9, g - 1), h.toString("utf8", g, h.length - 1));
  }
  async function Gf() {
    try {
      let h = await Promise.resolve(A.cursorFn(z));
      (pe = 0), h === kt ? ve(fh(A.portal)) : ((z = new mt()), ve(ho("", A.cursorRows)));
    } catch (h) {
      ve(pt), A.reject(h);
    }
  }
  function Xf() {
    z.count && A.cursorFn(z), A.resolve(z);
  }
  function Yf() {
    (be = new mn.default.Writable({
      autoDestroy: !0,
      write(h, g, R) {
        T.write(q().d().raw(h).end(), R);
      },
      destroy(h, g) {
        g(h),
          T.write(
            q()
              .f()
              .str(h + q.N)
              .end(),
          ),
          (be = null);
      },
      final(h) {
        T.write(q().c().end()), (Yt = h);
      },
    })),
      A.resolve(be);
  }
  function Zf() {
    (be = new mn.default.Readable({
      read() {
        T.resume();
      },
    })),
      A.resolve(be);
  }
  function eh() {
    (be = new mn.default.Duplex({
      autoDestroy: !0,
      read() {
        T.resume();
      },
      write(h, g, R) {
        T.write(q().d().raw(h).end(), R);
      },
      destroy(h, g) {
        g(h),
          T.write(
            q()
              .f()
              .str(h + q.N)
              .end(),
          ),
          (be = null);
      },
      final(h) {
        T.write(q().c().end()), (Yt = h);
      },
    })),
      A.resolve(be);
  }
  function th(h) {
    be && (be.push(h.subarray(5)) || T.pause());
  }
  function rh() {
    be && be.push(null), (be = null);
  }
  function nh(h) {
    f ? f(xi(h)) : console.log(xi(h));
  }
  function ih() {}
  function sh() {
    Ye(ge.notSupported("FunctionCallResponse"));
  }
  function oh() {
    Ye(ge.notSupported("NegotiateProtocolVersion"));
  }
  function ah(h) {
    console.error("Postgres.js : Unknown Message:", h[0]);
  }
  function lh(h, g) {
    console.error("Postgres.js : Unknown Auth:", g);
  }
  function uh(h, g, R = "", X = "") {
    let he, Ne;
    return (
      q()
        .B()
        .str(X + q.N)
        .str(R + q.N)
        .i16(0)
        .i16(h.length),
      h.forEach((Le, ft) => {
        if (Le === null) return q.i32(4294967295);
        (Ne = g[ft]),
          (h[ft] = Le = Ne in e.serializers ? e.serializers[Ne](Le) : "" + Le),
          (he = q.i),
          q
            .inc(4)
            .str(Le)
            .i32(q.i - he - 4, he);
      }),
      q.i16(0),
      q.end()
    );
  }
  function fo(h, g, R, X = "") {
    return (
      q()
        .P()
        .str(X + q.N)
        .str(h + q.N)
        .i16(g.length),
      g.forEach((he, Ne) => q.i32(R[Ne] || 0)),
      q.end()
    );
  }
  function ch(h, g = "") {
    return q()
      .D()
      .str(h)
      .str(g + q.N)
      .end();
  }
  function ho(h = "", g = 0) {
    return Buffer.concat([
      q()
        .E()
        .str(h + q.N)
        .i32(g)
        .end(),
      Ca,
    ]);
  }
  function fh(h = "") {
    return Buffer.concat([
      q()
        .C()
        .str("P")
        .str(h + q.N)
        .end(),
      q().S().end(),
    ]);
  }
  function hh() {
    return (
      M ||
      q()
        .inc(4)
        .i16(3)
        .z(2)
        .str(
          Object.entries(
            Object.assign({ user: a, database: c, client_encoding: "UTF8" }, e.connection),
          )
            .filter(([, h]) => h)
            .map(([h, g]) => h + q.N + g)
            .join(q.N),
        )
        .z(2)
        .end(0)
    );
  }
}
function xi(e) {
  let t = {},
    r = 5;
  for (let n = 5; n < e.length - 1; n++)
    e[n] === 0 && ((t[Vh[e[r]]] = e.toString("utf8", r + 1, n)), (r = n + 1));
  return t;
}
function Ba(e) {
  return Mt.default.createHash("md5").update(e).digest("hex");
}
function dn(e, t) {
  return Mt.default.createHmac("sha256", e).update(t).digest();
}
function Wh(e) {
  return Mt.default.createHash("sha256").update(e).digest();
}
function Hh(e, t) {
  let r = Math.max(e.length, t.length),
    n = Buffer.allocUnsafe(r);
  for (let i = 0; i < r; i++) n[i] = e[i] ^ t[i];
  return n;
}
function Li(e, t) {
  if (((t = typeof t == "function" ? t() : t), !t)) return { cancel: Kt, start: Kt };
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
var za = () => {};
function Di(e, t) {
  let r = new Map(),
    n = "postgresjs_" + Math.random().toString(36).slice(2),
    i = {},
    s,
    o,
    a = !1,
    u = (d.sql = e({
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
          p(await f(u, n, t.publications)),
          r.forEach((w) => w.forEach(({ onsubscribe: S }) => S())));
      },
      no_subscribe: !0,
    })),
    l = u.end,
    c = u.close;
  return (
    (u.end = async () => (
      (a = !0), o && (await new Promise((w) => (o.once("close", w), o.end()))), l()
    )),
    (u.close = async () => (o && (await new Promise((w) => (o.once("close", w), o.end()))), c())),
    d
  );
  async function d(w, S, O = za, v = za) {
    (w = Xh(w)), s || (s = f(u, n, t.publications));
    let P = { fn: S, onsubscribe: O },
      $ = r.has(w) ? r.get(w).add(P) : r.set(w, new Set([P])).get(w),
      x = () => {
        $.delete(P), $.size === 0 && r.delete(w);
      };
    return s.then((j) => (p(j), O(), o && o.on("error", v), { unsubscribe: x, state: i, sql: u }));
  }
  function p(w) {
    (o = w.stream), (i.pid = w.state.pid), (i.secret = w.state.secret);
  }
  async function f(w, S, O) {
    if (!O) throw new Error("Missing publication names");
    let v = await w.unsafe(
        `CREATE_REPLICATION_SLOT ${S} TEMPORARY LOGICAL pgoutput NOEXPORT_SNAPSHOT`,
      ),
      [P] = v,
      $ = await w
        .unsafe(
          `START_REPLICATION SLOT ${S} LOGICAL ${P.consistent_point} (proto_version '1', publication_names '${O}')`,
        )
        .writable(),
      x = {
        lsn: Buffer.concat(
          P.consistent_point.split("/").map((T) => Buffer.from(("00000000" + T).slice(-8), "hex")),
        ),
      };
    return $.on("data", C), $.on("error", j), $.on("close", w.close), { stream: $, state: v.state };
    function j(T) {
      console.error("Unexpected error during logical streaming - reconnecting", T);
    }
    function C(T) {
      T[0] === 119
        ? Gh(T.subarray(25), x, w.options.parsers, L, t.transform)
        : T[0] === 107 && T[17] && ((x.lsn = T.subarray(1, 9)), k());
    }
    function L(T, M) {
      let z = M.relation.schema + "." + M.relation.table;
      m("*", T, M),
        m("*:" + z, T, M),
        M.relation.keys.length && m("*:" + z + "=" + M.relation.keys.map((V) => T[V.name]), T, M),
        m(M.command, T, M),
        m(M.command + ":" + z, T, M),
        M.relation.keys.length &&
          m(M.command + ":" + z + "=" + M.relation.keys.map((V) => T[V.name]), T, M);
    }
    function k() {
      let T = Buffer.alloc(34);
      (T[0] = 114),
        T.fill(x.lsn, 1),
        T.writeBigInt64BE(BigInt(Date.now() - Date.UTC(2e3, 0, 1)) * BigInt(1e3), 25),
        $.write(T);
    }
  }
  function m(w, S, O) {
    r.has(w) && r.get(w).forEach(({ fn: v }) => v(S, O, w));
  }
}
function Jh(e) {
  return new Date(Date.UTC(2e3, 0, 1) + Number(e / BigInt(1e3)));
}
function Gh(e, t, r, n, i) {
  let s = (o, [a, u]) => ((o[a.charCodeAt(0)] = u), o);
  Object.entries({
    R: (o) => {
      let a = 1,
        u = (t[o.readUInt32BE(a)] = {
          schema: o.toString("utf8", (a += 4), (a = o.indexOf(0, a))) || "pg_catalog",
          table: o.toString("utf8", a + 1, (a = o.indexOf(0, a + 1))),
          columns: Array(o.readUInt16BE((a += 2))),
          keys: [],
        });
      a += 2;
      let l = 0,
        c;
      for (; a < o.length; )
        (c = u.columns[l++] =
          {
            key: o[a++],
            name: i.column.from
              ? i.column.from(o.toString("utf8", a, (a = o.indexOf(0, a))))
              : o.toString("utf8", a, (a = o.indexOf(0, a))),
            type: o.readUInt32BE((a += 1)),
            parser: r[o.readUInt32BE(a)],
            atttypmod: o.readUInt32BE((a += 4)),
          }),
          c.key && u.keys.push(c),
          (a += 4);
    },
    Y: () => {},
    O: () => {},
    B: (o) => {
      (t.date = Jh(o.readBigInt64BE(9))), (t.lsn = o.subarray(1, 9));
    },
    I: (o) => {
      let a = 1,
        u = t[o.readUInt32BE(a)],
        { row: l } = pn(o, u.columns, (a += 7), i);
      n(l, { command: "insert", relation: u });
    },
    D: (o) => {
      let a = 1,
        u = t[o.readUInt32BE(a)];
      a += 4;
      let l = o[a] === 75;
      n(l || o[a] === 79 ? pn(o, u.columns, (a += 3), i).row : null, {
        command: "delete",
        relation: u,
        key: l,
      });
    },
    U: (o) => {
      let a = 1,
        u = t[o.readUInt32BE(a)];
      a += 4;
      let l = o[a] === 75,
        c = l || o[a] === 79 ? pn(o, u.columns, (a += 3), i) : null;
      c && (a = c.i);
      let { row: d } = pn(o, u.columns, a + 3, i);
      n(d, { command: "update", relation: u, key: l, old: c && c.row });
    },
    T: () => {},
    C: () => {},
  })
    .reduce(s, {})
    [e[0]](e);
}
function pn(e, t, r, n) {
  let i,
    s,
    o,
    a = n.raw ? new Array(t.length) : {};
  for (let u = 0; u < t.length; u++)
    (i = e[r++]),
      (s = t[u]),
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
        ? (a[u] = n.raw === !0 ? o : n.value.from ? n.value.from(o, s) : o)
        : (a[s.name] = n.value.from ? n.value.from(o, s) : o);
  return { i: r, row: n.row.from ? n.row.from(a) : a };
}
function Xh(e) {
  let t = e.match(/^(\*|insert|update|delete)?:?([^.]+?\.?[^=]+)?=?(.+)?/i) || [];
  if (!t) throw new Error("Malformed subscribe pattern: " + e);
  let [, r, n, i] = t;
  return (
    (r || "*") + (n ? ":" + (n.indexOf(".") === -1 ? "public." + n : n) : "") + (i ? "=" + i : "")
  );
}
var zi = ot(require("stream"), 1);
function Ii(e, t, r = 393216) {
  return new Promise(async (n, i) => {
    await e
      .begin(async (s) => {
        let o;
        !t && ([{ oid: t }] = await s`select lo_creat(-1) as oid`);
        let [{ fd: a }] = await s`select lo_open(${t}, ${r}) as fd`,
          u = {
            writable: c,
            readable: l,
            close: () => s`select lo_close(${a})`.then(o),
            tell: () => s`select lo_tell64(${a})`,
            read: (d) => s`select loread(${a}, ${d}) as data`,
            write: (d) => s`select lowrite(${a}, ${d})`,
            truncate: (d) => s`select lo_truncate64(${a}, ${d})`,
            seek: (d, p = 0) => s`select lo_lseek64(${a}, ${d}, ${p})`,
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
        return n(u), new Promise(async (d) => (o = d));
        async function l({ highWaterMark: d = 2048 * 8, start: p = 0, end: f = 1 / 0 } = {}) {
          let m = f - p;
          return (
            p && (await u.seek(p)),
            new zi.default.Readable({
              highWaterMark: d,
              async read(w) {
                let S = w > m ? w - m : w;
                m -= w;
                let [{ data: O }] = await u.read(S);
                this.push(O), O.length < w && this.push(null);
              },
            })
          );
        }
        async function c({ highWaterMark: d = 2048 * 8, start: p = 0 } = {}) {
          return (
            p && (await u.seek(p)),
            new zi.default.Writable({
              highWaterMark: d,
              write(f, m, w) {
                u.write(f).then(() => w(), w);
              },
            })
          );
        }
      })
      .catch(i);
  });
}
Object.assign(yn, {
  PostgresError: Ot,
  toPascal: Et,
  pascal: Pi,
  toCamel: Tt,
  camel: $i,
  toKebab: Nt,
  kebab: Ai,
  fromPascal: Or,
  fromCamel: _r,
  fromKebab: Tr,
  BigInt: { to: 20, from: [20], parse: (e) => BigInt(e), serialize: (e) => e.toString() },
});
var Ra = yn;
function yn(e, t) {
  let r = Yh(e, t),
    n = r.no_subscribe || Di(yn, { ...r }),
    i = !1,
    s = Qe(),
    o = Qe(),
    a = Qe(),
    u = Qe(),
    l = Qe(),
    c = Qe(),
    d = Qe(),
    p = Qe(),
    f = { connecting: o, reserved: a, closed: u, ended: l, open: c, busy: d, full: p },
    m = [...Array(r.max)].map(() => ji(r, f, { onopen: G, onend: J, onclose: de })),
    w = S(L);
  return (
    Object.assign(w, {
      get parameters() {
        return r.parameters;
      },
      largeObject: Ii.bind(null, w),
      subscribe: n,
      CLOSE: kt,
      END: kt,
      PostgresError: Ot,
      options: r,
      reserve: P,
      listen: O,
      begin: $,
      close: z,
      end: M,
    }),
    w
  );
  function S(N) {
    return (
      (N.debug = r.debug),
      Object.entries(r.types).reduce((W, [re, pe]) => ((W[re] = (ce) => new We(ce, pe.to)), W), D),
      Object.assign(H, { types: D, typed: D, unsafe: Y, notify: v, array: C, json: j, file: se }),
      H
    );
    function D(W, re) {
      return new We(W, re);
    }
    function H(W, ...re) {
      return W && Array.isArray(W.raw)
        ? new Fe(W, re, N, T)
        : typeof W == "string" && !re.length
          ? new Ut(r.transform.column.to ? r.transform.column.to(W) : W)
          : new vr(W, re);
    }
    function Y(W, re = [], pe = {}) {
      return (
        arguments.length === 2 && !Array.isArray(re) && ((pe = re), (re = [])),
        new Fe([W], re, N, T, {
          prepare: !1,
          ...pe,
          simple: "simple" in pe ? pe.simple : re.length === 0,
        })
      );
    }
    function se(W, re = [], pe = {}) {
      return (
        arguments.length === 2 && !Array.isArray(re) && ((pe = re), (re = [])),
        new Fe(
          [],
          re,
          (oe) => {
            qa.default.readFile(W, "utf8", (Oe, ne) => {
              if (Oe) return oe.reject(Oe);
              (oe.strings = [ne]), N(oe);
            });
          },
          T,
          { ...pe, simple: "simple" in pe ? pe.simple : re.length === 0 },
        )
      );
    }
  }
  async function O(N, D, H) {
    let Y = { fn: D, onlisten: H },
      se =
        O.sql ||
        (O.sql = yn({
          ...r,
          max: 1,
          idle_timeout: null,
          max_lifetime: null,
          fetch_types: !1,
          onclose() {
            Object.entries(O.channels).forEach(([oe, { listeners: Oe }]) => {
              delete O.channels[oe],
                Promise.all(Oe.map((ne) => O(oe, ne.fn, ne.onlisten).catch(() => {})));
            });
          },
          onnotify(oe, Oe) {
            oe in O.channels && O.channels[oe].listeners.forEach((ne) => ne.fn(Oe));
          },
        })),
      W = O.channels || (O.channels = {});
    if (N in W) {
      W[N].listeners.push(Y);
      let oe = await W[N].result;
      return Y.onlisten && Y.onlisten(), { state: oe.state, unlisten: ce };
    }
    W[N] = { result: se`listen ${se.unsafe('"' + N.replace(/"/g, '""') + '"')}`, listeners: [Y] };
    let pe = await W[N].result;
    return Y.onlisten && Y.onlisten(), { state: pe.state, unlisten: ce };
    async function ce() {
      if (
        N in W &&
        ((W[N].listeners = W[N].listeners.filter((oe) => oe !== Y)), !W[N].listeners.length)
      )
        return delete W[N], se`unlisten ${se.unsafe('"' + N.replace(/"/g, '""') + '"')}`;
    }
  }
  async function v(N, D) {
    return await w`select pg_notify(${N}, ${"" + D})`;
  }
  async function P() {
    let N = Qe(),
      D = c.length
        ? c.shift()
        : await new Promise((se) => {
            s.push({ reserve: se }), u.length && we(u.shift());
          });
    x(D, a),
      (D.reserved = () => (N.length ? D.execute(N.shift()) : x(D, a))),
      (D.reserved.release = !0);
    let H = S(Y);
    return (
      (H.release = () => {
        (D.reserved = null), G(D);
      }),
      H
    );
    function Y(se) {
      D.queue === p ? N.push(se) : D.execute(se) || x(D, p);
    }
  }
  async function $(N, D) {
    !D && ((D = N), (N = ""));
    let H = Qe(),
      Y = 0,
      se,
      W = null;
    try {
      return (
        await w.unsafe("begin " + N.replace(/[^a-z ]/gi, ""), [], { onexecute: pe }).execute(),
        await Promise.race([re(se, D), new Promise((ce, oe) => (se.onclose = oe))])
      );
    } catch (ce) {
      throw ce;
    }
    async function re(ce, oe, Oe) {
      let ne = S(be);
      (ne.savepoint = ct), (ne.prepare = (ae) => (W = ae.replace(/[^a-z0-9$-_. ]/gi)));
      let Me, Te;
      Oe && (await ne`savepoint ${ne(Oe)}`);
      try {
        if (
          ((Te = await new Promise((ae, Ve) => {
            let Xe = oe(ne);
            Promise.resolve(Array.isArray(Xe) ? Promise.all(Xe) : Xe).then(ae, Ve);
          })),
          Me)
        )
          throw Me;
      } catch (ae) {
        throw (
          (await (Oe ? ne`rollback to ${ne(Oe)}` : ne`rollback`),
          (ae instanceof Ot && ae.code === "25P02" && Me) || ae)
        );
      }
      return Oe || (W ? await ne`prepare transaction '${ne.unsafe(W)}'` : await ne`commit`), Te;
      function ct(ae, Ve) {
        return ae && Array.isArray(ae.raw)
          ? ct((Xe) => Xe.apply(Xe, arguments))
          : (arguments.length === 1 && ((Ve = ae), (ae = null)),
            re(ce, Ve, "s" + Y++ + (ae ? "_" + ae : "")));
      }
      function be(ae) {
        ae.catch((Ve) => Me || (Me = Ve)), ce.queue === p ? H.push(ae) : ce.execute(ae) || x(ce, p);
      }
    }
    function pe(ce) {
      (se = ce), x(ce, a), (ce.reserved = () => (H.length ? ce.execute(H.shift()) : x(ce, a)));
    }
  }
  function x(N, D) {
    return (
      N.queue.remove(N),
      D.push(N),
      (N.queue = D),
      D === c ? N.idleTimer.start() : N.idleTimer.cancel(),
      N
    );
  }
  function j(N) {
    return new We(N, 3802);
  }
  function C(N, D) {
    return Array.isArray(N)
      ? new We(N, D || (N.length ? un(N) || 25 : 0), r.shared.typeArrayMap)
      : C(Array.from(arguments));
  }
  function L(N) {
    if (i) return N.reject(ge.connection("CONNECTION_ENDED", r, r));
    if (c.length) return k(c.shift(), N);
    if (u.length) return we(u.shift(), N);
    d.length ? k(d.shift(), N) : s.push(N);
  }
  function k(N, D) {
    return N.execute(D) ? x(N, d) : x(N, p);
  }
  function T(N) {
    return new Promise((D, H) => {
      N.state
        ? N.active
          ? ji(r).cancel(N.state, D, H)
          : (N.cancelled = { resolve: D, reject: H })
        : (s.remove(N),
          (N.cancelled = !0),
          N.reject(ge.generic("57014", "canceling statement due to user request")),
          D());
    });
  }
  async function M({ timeout: N = null } = {}) {
    if (i) return i;
    await 1;
    let D;
    return (i = Promise.race([
      new Promise((H) => N !== null && (D = setTimeout(V, N * 1e3, H))),
      Promise.all(
        m
          .map((H) => H.end())
          .concat(O.sql ? O.sql.end({ timeout: 0 }) : [], n.sql ? n.sql.end({ timeout: 0 }) : []),
      ),
    ]).then(() => clearTimeout(D)));
  }
  async function z() {
    await Promise.all(m.map((N) => N.end()));
  }
  async function V(N) {
    for (await Promise.all(m.map((D) => D.terminate())); s.length; )
      s.shift().reject(ge.connection("CONNECTION_DESTROYED", r));
    N();
  }
  function we(N, D) {
    return x(N, o), N.connect(D), N;
  }
  function J(N) {
    x(N, l);
  }
  function G(N) {
    if (s.length === 0) return x(N, c);
    let D = Math.ceil(s.length / (o.length + 1)),
      H = !0;
    for (; H && s.length && D-- > 0; ) {
      let Y = s.shift();
      if (Y.reserve) return Y.reserve(N);
      H = N.execute(Y);
    }
    H ? x(N, d) : x(N, p);
  }
  function de(N, D) {
    x(N, u),
      (N.reserved = null),
      N.onclose && (N.onclose(D), (N.onclose = null)),
      r.onclose && r.onclose(N.id),
      s.length && we(N, s.shift());
  }
}
function Yh(e, t) {
  if (e && e.shared) return e;
  let r = process.env,
    n = (!e || typeof e == "string" ? t : e) || {},
    { url: i, multihost: s } = nd(e),
    o = [...i.searchParams].reduce((p, [f, m]) => ((p[f] = m), p), {}),
    a = n.hostname || n.host || s || i.hostname || r.PGHOST || "localhost",
    u = n.port || i.port || r.PGPORT || 5432,
    l = n.user || n.username || i.username || r.PGUSERNAME || r.PGUSER || id();
  n.no_prepare && (n.prepare = !1),
    o.sslmode && ((o.ssl = o.sslmode), delete o.sslmode),
    "timeout" in n &&
      (console.log("The timeout option is deprecated, use idle_timeout instead"),
      (n.idle_timeout = n.timeout)),
    o.sslrootcert === "system" && (o.ssl = "verify-full");
  let c = [
      "idle_timeout",
      "connect_timeout",
      "max_lifetime",
      "max_pipeline",
      "backoff",
      "keep_alive",
    ],
    d = {
      max: 10,
      ssl: !1,
      idle_timeout: null,
      connect_timeout: 30,
      max_lifetime: td,
      max_pipeline: 100,
      backoff: ed,
      keep_alive: 60,
      prepare: !0,
      debug: !1,
      fetch_types: !0,
      publications: "alltables",
      target_session_attrs: null,
    };
  return {
    host: Array.isArray(a) ? a : a.split(",").map((p) => p.split(":")[0]),
    port: Array.isArray(u) ? u : a.split(",").map((p) => parseInt(p.split(":")[1] || u)),
    path: n.path || (a.indexOf("/") > -1 && a + "/.s.PGSQL." + u),
    database: n.database || n.db || (i.pathname || "").slice(1) || r.PGDATABASE || l,
    user: l,
    pass: n.pass || n.password || i.password || r.PGPASSWORD || "",
    ...Object.entries(d).reduce((p, [f, m]) => {
      let w =
        f in n
          ? n[f]
          : f in o
            ? o[f] === "disable" || o[f] === "false"
              ? !1
              : o[f]
            : r["PG" + f.toUpperCase()] || m;
      return (p[f] = typeof w == "string" && c.includes(f) ? +w : w), p;
    }, {}),
    connection: {
      application_name: "postgres.js",
      ...n.connection,
      ...Object.entries(o).reduce((p, [f, m]) => (f in d || (p[f] = m), p), {}),
    },
    types: n.types || {},
    target_session_attrs: Zh(n, i, r),
    onnotice: n.onnotice,
    onnotify: n.onnotify,
    onclose: n.onclose,
    onparameter: n.onparameter,
    socket: n.socket,
    transform: rd(n.transform || { undefined: void 0 }),
    parameters: {},
    shared: { retries: 0, typeArrayMap: {} },
    ...$a(n.types),
  };
}
function Zh(e, t, r) {
  let n =
    e.target_session_attrs || t.searchParams.get("target_session_attrs") || r.PGTARGETSESSIONATTRS;
  if (!n || ["read-write", "read-only", "primary", "standby", "prefer-standby"].includes(n))
    return n;
  throw new Error("target_session_attrs " + n + " is not supported");
}
function ed(e) {
  return (0.5 + Math.random() / 2) * Math.min(3 ** e / 100, 20);
}
function td() {
  return 60 * (30 + Math.random() * 30);
}
function rd(e) {
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
function nd(e) {
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
function id() {
  try {
    return Ia.default.userInfo().username;
  } catch {
    return process.env.USERNAME || process.env.USER || process.env.LOGNAME;
  }
}
var Sf = ot(ou());
var bf = ot(wf()),
  to = (0, bf.default)({ transport: { target: "pino-pretty" } });
var ro,
  Ab = async () => {
    let e = Ra(process.env.DATABASE_URL || "");
    to.info(`DB_URL: ${process.env.DATABASE_URL}`);
    class t {
      write(n) {
        to.debug(n);
      }
    }
    return (ro = wa(e, { schema: Sf.schemas, logger: new It({ writer: new t() }) })), ro;
  };
0 && (module.exports = { db, initDb });
/*! Bundled license information:

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=index.js.map
