"use strict";
var v = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var Se = v((vf, wt) => {
  "use strict";
  var X = (e) => e && typeof e.message == "string",
    we = (e) => {
      if (!e) return;
      let t = e.cause;
      if (typeof t == "function") {
        let r = e.cause();
        return X(r) ? r : void 0;
      } else return X(t) ? t : void 0;
    },
    pt = (e, t) => {
      if (!X(e)) return "";
      let r = e.stack || "";
      if (t.has(e))
        return (
          r +
          `
causes have become circular...`
        );
      let n = we(e);
      return n
        ? (t.add(e),
          r +
            `
caused by: ` +
            pt(n, t))
        : r;
    },
    Rn = (e) => pt(e, new Set()),
    bt = (e, t, r) => {
      if (!X(e)) return "";
      let n = r ? "" : e.message || "";
      if (t.has(e)) return n + ": ...";
      let i = we(e);
      if (i) {
        t.add(e);
        let o = typeof e.cause == "function";
        return n + (o ? "" : ": ") + bt(i, t, o);
      } else return n;
    },
    kn = (e) => bt(e, new Set());
  wt.exports = { isErrorLike: X, getErrorCause: we, stackWithCauses: Rn, messageWithCauses: kn };
});
var _e = v((Lf, _t) => {
  "use strict";
  var Bn = Symbol("circular-ref-tag"),
    Z = Symbol("pino-raw-err-ref"),
    St = Object.create(
      {},
      {
        type: { enumerable: !0, writable: !0, value: void 0 },
        message: { enumerable: !0, writable: !0, value: void 0 },
        stack: { enumerable: !0, writable: !0, value: void 0 },
        aggregateErrors: { enumerable: !0, writable: !0, value: void 0 },
        raw: {
          enumerable: !1,
          get: function () {
            return this[Z];
          },
          set: function (e) {
            this[Z] = e;
          },
        },
      },
    );
  Object.defineProperty(St, Z, { writable: !0, value: {} });
  _t.exports = { pinoErrProto: St, pinoErrorSymbols: { seen: Bn, rawSymbol: Z } };
});
var xt = v(($f, Ot) => {
  "use strict";
  Ot.exports = Oe;
  var { messageWithCauses: qn, stackWithCauses: Cn, isErrorLike: Et } = Se(),
    { pinoErrProto: In, pinoErrorSymbols: Nn } = _e(),
    { seen: Ee } = Nn,
    { toString: Dn } = Object.prototype;
  function Oe(e) {
    if (!Et(e)) return e;
    e[Ee] = void 0;
    let t = Object.create(In);
    (t.type = Dn.call(e.constructor) === "[object Function]" ? e.constructor.name : e.name),
      (t.message = qn(e)),
      (t.stack = Cn(e)),
      Array.isArray(e.errors) && (t.aggregateErrors = e.errors.map((r) => Oe(r)));
    for (let r in e)
      if (t[r] === void 0) {
        let n = e[r];
        Et(n)
          ? r !== "cause" && !Object.prototype.hasOwnProperty.call(n, Ee) && (t[r] = Oe(n))
          : (t[r] = n);
      }
    return delete e[Ee], (t.raw = e), t;
  }
});
var Lt = v((Af, vt) => {
  "use strict";
  vt.exports = te;
  var { isErrorLike: xe } = Se(),
    { pinoErrProto: Pn, pinoErrorSymbols: zn } = _e(),
    { seen: ee } = zn,
    { toString: Mn } = Object.prototype;
  function te(e) {
    if (!xe(e)) return e;
    e[ee] = void 0;
    let t = Object.create(Pn);
    (t.type = Mn.call(e.constructor) === "[object Function]" ? e.constructor.name : e.name),
      (t.message = e.message),
      (t.stack = e.stack),
      Array.isArray(e.errors) && (t.aggregateErrors = e.errors.map((r) => te(r))),
      xe(e.cause) && !Object.prototype.hasOwnProperty.call(e.cause, ee) && (t.cause = te(e.cause));
    for (let r in e)
      if (t[r] === void 0) {
        let n = e[r];
        xe(n) ? Object.prototype.hasOwnProperty.call(n, ee) || (t[r] = te(n)) : (t[r] = n);
      }
    return delete e[ee], (t.raw = e), t;
  }
});
var Tt = v((jf, jt) => {
  "use strict";
  jt.exports = { mapHttpRequest: Wn, reqSerializer: At };
  var ve = Symbol("pino-raw-req-ref"),
    $t = Object.create(
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
            return this[ve];
          },
          set: function (e) {
            this[ve] = e;
          },
        },
      },
    );
  Object.defineProperty($t, ve, { writable: !0, value: {} });
  function At(e) {
    let t = e.info || e.socket,
      r = Object.create($t);
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
  function Wn(e) {
    return { req: At(e) };
  }
});
var qt = v((Tf, Bt) => {
  "use strict";
  Bt.exports = { mapHttpResponse: Vn, resSerializer: kt };
  var Le = Symbol("pino-raw-res-ref"),
    Rt = Object.create(
      {},
      {
        statusCode: { enumerable: !0, writable: !0, value: 0 },
        headers: { enumerable: !0, writable: !0, value: "" },
        raw: {
          enumerable: !1,
          get: function () {
            return this[Le];
          },
          set: function (e) {
            this[Le] = e;
          },
        },
      },
    );
  Object.defineProperty(Rt, Le, { writable: !0, value: {} });
  function kt(e) {
    let t = Object.create(Rt);
    return (
      (t.statusCode = e.headersSent ? e.statusCode : null),
      (t.headers = e.getHeaders ? e.getHeaders() : e._headers),
      (t.raw = e),
      t
    );
  }
  function Vn(e) {
    return { res: kt(e) };
  }
});
var Ae = v((Rf, Ct) => {
  "use strict";
  var $e = xt(),
    Fn = Lt(),
    re = Tt(),
    ne = qt();
  Ct.exports = {
    err: $e,
    errWithCause: Fn,
    mapHttpRequest: re.mapHttpRequest,
    mapHttpResponse: ne.mapHttpResponse,
    req: re.reqSerializer,
    res: ne.resSerializer,
    wrapErrorSerializer: function (t) {
      return t === $e
        ? t
        : function (n) {
            return t($e(n));
          };
    },
    wrapRequestSerializer: function (t) {
      return t === re.reqSerializer
        ? t
        : function (n) {
            return t(re.reqSerializer(n));
          };
    },
    wrapResponseSerializer: function (t) {
      return t === ne.resSerializer
        ? t
        : function (n) {
            return t(ne.resSerializer(n));
          };
    },
  };
});
var je = v((kf, It) => {
  "use strict";
  function Kn(e, t) {
    return t;
  }
  It.exports = function () {
    let t = Error.prepareStackTrace;
    Error.prepareStackTrace = Kn;
    let r = new Error().stack;
    if (((Error.prepareStackTrace = t), !Array.isArray(r))) return;
    let n = r.slice(2),
      i = [];
    for (let o of n) o && i.push(o.getFileName());
    return i;
  };
});
var Dt = v((Bf, Nt) => {
  "use strict";
  Nt.exports = Jn;
  function Jn(e = {}) {
    let {
      ERR_PATHS_MUST_BE_STRINGS: t = () => "fast-redact - Paths must be (non-empty) strings",
      ERR_INVALID_PATH: r = (n) => `fast-redact \u2013 Invalid path (${n})`,
    } = e;
    return function ({ paths: i }) {
      i.forEach((o) => {
        if (typeof o != "string") throw Error(t());
        try {
          if (/〇/.test(o)) throw Error();
          let f =
            (o[0] === "[" ? "" : ".") +
            o
              .replace(/^\*/, "\u3007")
              .replace(/\.\*/g, ".\u3007")
              .replace(/\[\*\]/g, "[\u3007]");
          if (/\n|\r|;/.test(f) || /\/\*/.test(f)) throw Error();
          Function(`
            'use strict'
            const o = new Proxy({}, { get: () => o, set: () => { throw Error() } });
            const \u3007 = null;
            o${f}
            if ([o${f}].length !== 1) throw Error()`)();
        } catch {
          throw Error(r(o));
        }
      });
    };
  }
});
var ie = v((qf, Pt) => {
  "use strict";
  Pt.exports = /[^.[\]]+|\[((?:.)*?)\]/g;
});
var Mt = v((Cf, zt) => {
  "use strict";
  var Un = ie();
  zt.exports = Gn;
  function Gn({ paths: e }) {
    let t = [];
    var r = 0;
    let n = e.reduce(function (i, o, f) {
      var h = o.match(Un).map((u) => u.replace(/'|"|`/g, ""));
      let d = o[0] === "[";
      h = h.map((u) => (u[0] === "[" ? u.substr(1, u.length - 2) : u));
      let g = h.indexOf("*");
      if (g > -1) {
        let u = h.slice(0, g),
          c = u.join("."),
          y = h.slice(g + 1, h.length),
          s = y.length > 0;
        r++, t.push({ before: u, beforeStr: c, after: y, nested: s });
      } else
        i[o] = {
          path: h,
          val: void 0,
          precensored: !1,
          circle: "",
          escPath: JSON.stringify(o),
          leadingBracket: d,
        };
      return i;
    }, {});
    return { wildcards: t, wcLen: r, secret: n };
  }
});
var Vt = v((If, Wt) => {
  "use strict";
  var Hn = ie();
  Wt.exports = Xn;
  function Xn(
    { secret: e, serialize: t, wcLen: r, strict: n, isCensorFct: i, censorFctTakesPath: o },
    f,
  ) {
    let h = Function(
      "o",
      `
    if (typeof o !== 'object' || o == null) {
      ${ei(n, t)}
    }
    const { censor, secret } = this
    const originalSecret = {}
    const secretKeys = Object.keys(secret)
    for (var i = 0; i < secretKeys.length; i++) {
      originalSecret[secretKeys[i]] = secret[secretKeys[i]]
    }

    ${Yn(e, i, o)}
    this.compileRestore()
    ${Qn(r > 0, i, o)}
    this.secret = originalSecret
    ${Zn(t)}
  `,
    ).bind(f);
    return (h.state = f), t === !1 && (h.restore = (d) => f.restore(d)), h;
  }
  function Yn(e, t, r) {
    return Object.keys(e).map((n) => {
      let { escPath: i, leadingBracket: o, path: f } = e[n],
        h = o ? 1 : 0,
        d = o ? "" : ".",
        g = [];
      for (var u; (u = Hn.exec(n)) !== null; ) {
        let [, l] = u,
          { index: b, input: p } = u;
        b > h && g.push(p.substring(0, b - (l ? 0 : 1)));
      }
      var c = g.map((l) => `o${d}${l}`).join(" && ");
      c.length === 0 ? (c += `o${d}${n} != null`) : (c += ` && o${d}${n} != null`);
      let y = `
      switch (true) {
        ${g.reverse().map(
          (l) => `
          case o${d}${l} === censor:
            secret[${i}].circle = ${JSON.stringify(l)}
            break
        `,
        ).join(`
`)}
      }
    `,
        s = r ? `val, ${JSON.stringify(f)}` : "val";
      return `
      if (${c}) {
        const val = o${d}${n}
        if (val === censor) {
          secret[${i}].precensored = true
        } else {
          secret[${i}].val = val
          o${d}${n} = ${t ? `censor(${s})` : "censor"}
          ${y}
        }
      }
    `;
    }).join(`
`);
  }
  function Qn(e, t, r) {
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
  function Zn(e) {
    return e === !1
      ? "return o"
      : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `;
  }
  function ei(e, t) {
    return e === !0
      ? "throw Error('fast-redact: primitives cannot be redacted')"
      : t === !1
        ? "return o"
        : "return this.serialize(o)";
  }
});
var Re = v((Nf, Jt) => {
  "use strict";
  Jt.exports = { groupRedact: ri, groupRestore: ti, nestedRedact: ii, nestedRestore: ni };
  function ti({ keys: e, values: t, target: r }) {
    if (r == null || typeof r == "string") return;
    let n = e.length;
    for (var i = 0; i < n; i++) {
      let o = e[i];
      r[o] = t[i];
    }
  }
  function ri(e, t, r, n, i) {
    let o = Ft(e, t);
    if (o == null || typeof o == "string") return { keys: null, values: null, target: o, flat: !0 };
    let f = Object.keys(o),
      h = f.length,
      d = t.length,
      g = i ? [...t] : void 0,
      u = new Array(h);
    for (var c = 0; c < h; c++) {
      let y = f[c];
      (u[c] = o[y]), i ? ((g[d] = y), (o[y] = r(o[y], g))) : n ? (o[y] = r(o[y])) : (o[y] = r);
    }
    return { keys: f, values: u, target: o, flat: !0 };
  }
  function ni(e) {
    for (let t = 0; t < e.length; t++) {
      let { target: r, path: n, value: i } = e[t],
        o = r;
      for (let f = n.length - 1; f > 0; f--) o = o[n[f]];
      o[n[0]] = i;
    }
  }
  function ii(e, t, r, n, i, o, f) {
    let h = Ft(t, r);
    if (h == null) return;
    let d = Object.keys(h),
      g = d.length;
    for (var u = 0; u < g; u++) {
      let c = d[u];
      si(e, h, c, r, n, i, o, f);
    }
    return e;
  }
  function Te(e, t) {
    return e != null
      ? "hasOwn" in Object
        ? Object.hasOwn(e, t)
        : Object.prototype.hasOwnProperty.call(e, t)
      : !1;
  }
  function si(e, t, r, n, i, o, f, h) {
    let d = i.length,
      g = d - 1,
      u = r;
    var c = -1,
      y,
      s,
      l,
      b = null,
      p = null,
      w,
      m,
      S = !1,
      _ = 0,
      E = 0,
      O = oi();
    if (((l = y = t[r]), typeof y == "object")) {
      for (
        ;
        y != null &&
        ++c < d &&
        ((E += 1), (r = i[c]), (b = l), !(r !== "*" && !p && !(typeof y == "object" && r in y)));

      )
        if (!(r === "*" && (p === "*" && (S = !0), (p = r), c !== g))) {
          if (p) {
            let x = Object.keys(y);
            for (var $ = 0; $ < x.length; $++) {
              let L = x[$];
              if (((m = y[L]), (w = r === "*"), S))
                (O = z(O, L, E)),
                  (_ = c),
                  (l = Kt(m, _ - 1, r, n, i, o, f, h, u, y, s, l, w, L, c, g, O, e, t[u], E + 1));
              else if (w || (typeof m == "object" && m !== null && r in m)) {
                if (
                  (w ? (l = m) : (l = m[r]),
                  (s = c !== g ? l : f ? (h ? o(l, [...n, u, ...i]) : o(l)) : o),
                  w)
                ) {
                  let j = Y(z(O, L, E), l, t[u]);
                  e.push(j), (y[L] = s);
                } else if (m[r] !== s)
                  if ((s === void 0 && o !== void 0) || (Te(m, r) && s === l)) O = z(O, L, E);
                  else {
                    O = z(O, L, E);
                    let j = Y(z(O, r, E + 1), l, t[u]);
                    e.push(j), (m[r] = s);
                  }
              }
            }
            p = null;
          } else {
            if (
              ((l = y[r]),
              (O = z(O, r, E)),
              (s = c !== g ? l : f ? (h ? o(l, [...n, u, ...i]) : o(l)) : o),
              !((Te(y, r) && s === l) || (s === void 0 && o !== void 0)))
            ) {
              let x = Y(O, l, t[u]);
              e.push(x), (y[r] = s);
            }
            y = y[r];
          }
          if (typeof y != "object") break;
        }
    }
  }
  function Ft(e, t) {
    for (var r = -1, n = t.length, i = e; i != null && ++r < n; ) i = i[t[r]];
    return i;
  }
  function Kt(e, t, r, n, i, o, f, h, d, g, u, c, y, s, l, b, p, w, m, S) {
    if (t === 0 && (y || (typeof e == "object" && e !== null && r in e))) {
      if (
        (y ? (c = e) : (c = e[r]),
        (u = l !== b ? c : f ? (h ? o(c, [...n, d, ...i]) : o(c)) : o),
        y)
      ) {
        let _ = Y(p, c, m);
        w.push(_), (g[s] = u);
      } else if (e[r] !== u) {
        if (!((u === void 0 && o !== void 0) || (Te(e, r) && u === c))) {
          let _ = Y(z(p, r, S + 1), c, m);
          w.push(_), (e[r] = u);
        }
      }
    }
    for (let _ in e)
      typeof e[_] == "object" &&
        ((p = z(p, _, S)),
        Kt(e[_], t - 1, r, n, i, o, f, h, d, g, u, c, y, s, l, b, p, w, m, S + 1));
  }
  function oi() {
    return { parent: null, key: null, children: [], depth: 0 };
  }
  function z(e, t, r) {
    if (e.depth === r) return z(e.parent, t, r);
    var n = { parent: e, key: t, depth: r, children: [] };
    return e.children.push(n), n;
  }
  function Y(e, t, r) {
    let n = e,
      i = [];
    do i.push(n.key), (n = n.parent);
    while (n.parent != null);
    return { path: i, value: t, target: r };
  }
});
var Gt = v((Df, Ut) => {
  "use strict";
  var { groupRestore: li, nestedRestore: fi } = Re();
  Ut.exports = ci;
  function ci() {
    return function () {
      if (this.restore) {
        this.restore.state.secret = this.secret;
        return;
      }
      let { secret: t, wcLen: r } = this,
        n = Object.keys(t),
        i = ui(t, n),
        o = r > 0,
        f = o ? { secret: t, groupRestore: li, nestedRestore: fi } : { secret: t };
      (this.restore = Function("o", ai(i, n, o)).bind(f)), (this.restore.state = f);
    };
  }
  function ui(e, t) {
    return t
      .map((r) => {
        let { circle: n, escPath: i, leadingBracket: o } = e[r],
          h = n ? `o.${n} = secret[${i}].val` : `o${o ? "" : "."}${r} = secret[${i}].val`,
          d = `secret[${i}].val = undefined`;
        return `
      if (secret[${i}].val !== undefined) {
        try { ${h} } catch (e) {}
        ${d}
      }
    `;
      })
      .join("");
  }
  function ai(e, t, r) {
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
var Xt = v((Pf, Ht) => {
  "use strict";
  Ht.exports = hi;
  function hi(e) {
    let {
        secret: t,
        censor: r,
        compileRestore: n,
        serialize: i,
        groupRedact: o,
        nestedRedact: f,
        wildcards: h,
        wcLen: d,
      } = e,
      g = [{ secret: t, censor: r, compileRestore: n }];
    return (
      i !== !1 && g.push({ serialize: i }),
      d > 0 && g.push({ groupRedact: o, nestedRedact: f, wildcards: h, wcLen: d }),
      Object.assign(...g)
    );
  }
});
var Zt = v((zf, Qt) => {
  "use strict";
  var Yt = Dt(),
    di = Mt(),
    yi = Vt(),
    gi = Gt(),
    { groupRedact: mi, nestedRedact: pi } = Re(),
    bi = Xt(),
    wi = ie(),
    Si = Yt(),
    ke = (e) => e;
  ke.restore = ke;
  var _i = "[REDACTED]";
  Be.rx = wi;
  Be.validator = Yt;
  Qt.exports = Be;
  function Be(e = {}) {
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
    let i = n === !0 ? void 0 : "censor" in e ? e.censor : _i,
      o = typeof i == "function",
      f = o && i.length > 1;
    if (t.length === 0) return r || ke;
    Si({ paths: t, serialize: r, censor: i });
    let { wildcards: h, wcLen: d, secret: g } = di({ paths: t, censor: i }),
      u = gi(),
      c = "strict" in e ? e.strict : !0;
    return yi(
      { secret: g, wcLen: d, serialize: r, strict: c, isCensorFct: o, censorFctTakesPath: f },
      bi({
        secret: g,
        censor: i,
        compileRestore: u,
        serialize: r,
        groupRedact: mi,
        nestedRedact: pi,
        wildcards: h,
        wcLen: d,
      }),
    );
  }
});
var U = v((Mf, er) => {
  "use strict";
  var Ei = Symbol("pino.setLevel"),
    Oi = Symbol("pino.getLevel"),
    xi = Symbol("pino.levelVal"),
    vi = Symbol("pino.levelComp"),
    Li = Symbol("pino.useLevelLabels"),
    $i = Symbol("pino.useOnlyCustomLevels"),
    Ai = Symbol("pino.mixin"),
    ji = Symbol("pino.lsCache"),
    Ti = Symbol("pino.chindings"),
    Ri = Symbol("pino.asJson"),
    ki = Symbol("pino.write"),
    Bi = Symbol("pino.redactFmt"),
    qi = Symbol("pino.time"),
    Ci = Symbol("pino.timeSliceIndex"),
    Ii = Symbol("pino.stream"),
    Ni = Symbol("pino.stringify"),
    Di = Symbol("pino.stringifySafe"),
    Pi = Symbol("pino.stringifiers"),
    zi = Symbol("pino.end"),
    Mi = Symbol("pino.formatOpts"),
    Wi = Symbol("pino.messageKey"),
    Vi = Symbol("pino.errorKey"),
    Fi = Symbol("pino.nestedKey"),
    Ki = Symbol("pino.nestedKeyStr"),
    Ji = Symbol("pino.mixinMergeStrategy"),
    Ui = Symbol("pino.msgPrefix"),
    Gi = Symbol("pino.wildcardFirst"),
    Hi = Symbol.for("pino.serializers"),
    Xi = Symbol.for("pino.formatters"),
    Yi = Symbol.for("pino.hooks"),
    Qi = Symbol.for("pino.metadata");
  er.exports = {
    setLevelSym: Ei,
    getLevelSym: Oi,
    levelValSym: xi,
    levelCompSym: vi,
    useLevelLabelsSym: Li,
    mixinSym: Ai,
    lsCacheSym: ji,
    chindingsSym: Ti,
    asJsonSym: Ri,
    writeSym: ki,
    serializersSym: Hi,
    redactFmtSym: Bi,
    timeSym: qi,
    timeSliceIndexSym: Ci,
    streamSym: Ii,
    stringifySym: Ni,
    stringifySafeSym: Di,
    stringifiersSym: Pi,
    endSym: zi,
    formatOptsSym: Mi,
    messageKeySym: Wi,
    errorKeySym: Vi,
    nestedKeySym: Fi,
    wildcardFirstSym: Gi,
    needsMetadataGsym: Qi,
    useOnlyCustomLevelsSym: $i,
    formattersSym: Xi,
    hooksSym: Yi,
    nestedKeyStrSym: Ki,
    mixinMergeStrategySym: Ji,
    msgPrefixSym: Ui,
  };
});
var Ie = v((Wf, ir) => {
  "use strict";
  var Ce = Zt(),
    { redactFmtSym: Zi, wildcardFirstSym: se } = U(),
    { rx: qe, validator: es } = Ce,
    tr = es({
      ERR_PATHS_MUST_BE_STRINGS: () => "pino \u2013 redacted paths must be strings",
      ERR_INVALID_PATH: (e) => `pino \u2013 redact paths array contains an invalid path (${e})`,
    }),
    rr = "[Redacted]",
    nr = !1;
  function ts(e, t) {
    let { paths: r, censor: n } = rs(e),
      i = r.reduce((h, d) => {
        qe.lastIndex = 0;
        let g = qe.exec(d),
          u = qe.exec(d),
          c = g[1] !== void 0 ? g[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, "$1") : g[0];
        if ((c === "*" && (c = se), u === null)) return (h[c] = null), h;
        if (h[c] === null) return h;
        let { index: y } = u,
          s = `${d.substr(y, d.length - 1)}`;
        return (
          (h[c] = h[c] || []),
          c !== se && h[c].length === 0 && h[c].push(...(h[se] || [])),
          c === se &&
            Object.keys(h).forEach(function (l) {
              h[l] && h[l].push(s);
            }),
          h[c].push(s),
          h
        );
      }, {}),
      o = { [Zi]: Ce({ paths: r, censor: n, serialize: t, strict: nr }) },
      f = (...h) => t(typeof n == "function" ? n(...h) : n);
    return [...Object.keys(i), ...Object.getOwnPropertySymbols(i)].reduce((h, d) => {
      if (i[d] === null) h[d] = (g) => f(g, [d]);
      else {
        let g = typeof n == "function" ? (u, c) => n(u, [d, ...c]) : n;
        h[d] = Ce({ paths: i[d], censor: g, serialize: t, strict: nr });
      }
      return h;
    }, o);
  }
  function rs(e) {
    if (Array.isArray(e)) return (e = { paths: e, censor: rr }), tr(e), e;
    let { paths: t, censor: r = rr, remove: n } = e;
    if (Array.isArray(t) === !1) throw Error("pino \u2013 redact must contain an array of strings");
    return n === !0 && (r = void 0), tr({ paths: t, censor: r }), { paths: t, censor: r };
  }
  ir.exports = ts;
});
var or = v((Vf, sr) => {
  "use strict";
  var ns = () => "",
    is = () => `,"time":${Date.now()}`,
    ss = () => `,"time":${Math.round(Date.now() / 1e3)}`,
    os = () => `,"time":"${new Date(Date.now()).toISOString()}"`;
  sr.exports = { nullTime: ns, epochTime: is, unixTime: ss, isoTime: os };
});
var fr = v((Ff, lr) => {
  "use strict";
  function ls(e) {
    try {
      return JSON.stringify(e);
    } catch {
      return '"[Circular]"';
    }
  }
  lr.exports = fs;
  function fs(e, t, r) {
    var n = (r && r.stringify) || ls,
      i = 1;
    if (typeof e == "object" && e !== null) {
      var o = t.length + i;
      if (o === 1) return e;
      var f = new Array(o);
      f[0] = n(e);
      for (var h = 1; h < o; h++) f[h] = n(t[h]);
      return f.join(" ");
    }
    if (typeof e != "string") return e;
    var d = t.length;
    if (d === 0) return e;
    for (var g = "", u = 1 - i, c = -1, y = (e && e.length) || 0, s = 0; s < y; ) {
      if (e.charCodeAt(s) === 37 && s + 1 < y) {
        switch (((c = c > -1 ? c : 0), e.charCodeAt(s + 1))) {
          case 100:
          case 102:
            if (u >= d || t[u] == null) break;
            c < s && (g += e.slice(c, s)), (g += Number(t[u])), (c = s + 2), s++;
            break;
          case 105:
            if (u >= d || t[u] == null) break;
            c < s && (g += e.slice(c, s)), (g += Math.floor(Number(t[u]))), (c = s + 2), s++;
            break;
          case 79:
          case 111:
          case 106:
            if (u >= d || t[u] === void 0) break;
            c < s && (g += e.slice(c, s));
            var l = typeof t[u];
            if (l === "string") {
              (g += "'" + t[u] + "'"), (c = s + 2), s++;
              break;
            }
            if (l === "function") {
              (g += t[u].name || "<anonymous>"), (c = s + 2), s++;
              break;
            }
            (g += n(t[u])), (c = s + 2), s++;
            break;
          case 115:
            if (u >= d) break;
            c < s && (g += e.slice(c, s)), (g += String(t[u])), (c = s + 2), s++;
            break;
          case 37:
            c < s && (g += e.slice(c, s)), (g += "%"), (c = s + 2), s++, u--;
            break;
        }
        ++u;
      }
      ++s;
    }
    return c === -1 ? e : (c < y && (g += e.slice(c)), g);
  }
});
var De = v((Kf, Ne) => {
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
    Ne.exports = t;
  } else {
    let e = function (t) {
      if ((t > 0 && t < 1 / 0) === !1)
        throw typeof t != "number" && typeof t != "bigint"
          ? TypeError("sleep: ms must be a number")
          : RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
      let n = Date.now() + Number(t);
      for (; n > Date.now(); );
    };
    Ne.exports = e;
  }
});
var mr = v((Jf, gr) => {
  "use strict";
  var A = require("fs"),
    cs = require("events"),
    us = require("util").inherits,
    cr = require("path"),
    ze = De(),
    oe = 100,
    le = Buffer.allocUnsafe(0),
    as = 16 * 1024,
    ur = "buffer",
    ar = "utf8";
  function hr(e, t) {
    (t._opening = !0), (t._writing = !0), (t._asyncDrainScheduled = !1);
    function r(o, f) {
      if (o) {
        (t._reopening = !1),
          (t._writing = !1),
          (t._opening = !1),
          t.sync
            ? process.nextTick(() => {
                t.listenerCount("error") > 0 && t.emit("error", o);
              })
            : t.emit("error", o);
        return;
      }
      let h = t._reopening;
      (t.fd = f),
        (t.file = e),
        (t._reopening = !1),
        (t._opening = !1),
        (t._writing = !1),
        t.sync ? process.nextTick(() => t.emit("ready")) : t.emit("ready"),
        !t.destroyed &&
          ((!t._writing && t._len > t.minLength) || t._flushPending
            ? t._actualWrite()
            : h && process.nextTick(() => t.emit("drain")));
    }
    let n = t.append ? "a" : "w",
      i = t.mode;
    if (t.sync)
      try {
        t.mkdir && A.mkdirSync(cr.dirname(e), { recursive: !0 });
        let o = A.openSync(e, n, i);
        r(null, o);
      } catch (o) {
        throw (r(o), o);
      }
    else
      t.mkdir
        ? A.mkdir(cr.dirname(e), { recursive: !0 }, (o) => {
            if (o) return r(o);
            A.open(e, n, i, r);
          })
        : A.open(e, n, i, r);
  }
  function C(e) {
    if (!(this instanceof C)) return new C(e);
    let {
      fd: t,
      dest: r,
      minLength: n,
      maxLength: i,
      maxWrite: o,
      sync: f,
      append: h = !0,
      mkdir: d,
      retryEAGAIN: g,
      fsync: u,
      contentMode: c,
      mode: y,
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
      (this.maxWrite = o || as),
      (this.sync = f || !1),
      (this.writable = !0),
      (this._fsync = u || !1),
      (this.append = h || !1),
      (this.mode = y),
      (this.retryEAGAIN = g || (() => !0)),
      (this.mkdir = d || !1);
    let s, l;
    if (c === ur)
      (this._writingBuf = le),
        (this.write = ys),
        (this.flush = ms),
        (this.flushSync = bs),
        (this._actualWrite = Ss),
        (s = () => A.writeSync(this.fd, this._writingBuf)),
        (l = () => A.write(this.fd, this._writingBuf, this.release));
    else if (c === void 0 || c === ar)
      (this._writingBuf = ""),
        (this.write = ds),
        (this.flush = gs),
        (this.flushSync = ps),
        (this._actualWrite = ws),
        (s = () => A.writeSync(this.fd, this._writingBuf, "utf8")),
        (l = () => A.write(this.fd, this._writingBuf, "utf8", this.release));
    else throw new Error(`SonicBoom supports "${ar}" and "${ur}", but passed ${c}`);
    if (typeof t == "number") (this.fd = t), process.nextTick(() => this.emit("ready"));
    else if (typeof t == "string") hr(t, this);
    else throw new Error("SonicBoom supports only file descriptors and files");
    if (this.minLength >= this.maxWrite)
      throw new Error(`minLength should be smaller than maxWrite (${this.maxWrite})`);
    (this.release = (b, p) => {
      if (b) {
        if (
          (b.code === "EAGAIN" || b.code === "EBUSY") &&
          this.retryEAGAIN(b, this._writingBuf.length, this._len - this._writingBuf.length)
        )
          if (this.sync)
            try {
              ze(oe), this.release(void 0, 0);
            } catch (S) {
              this.release(S);
            }
          else setTimeout(l, oe);
        else (this._writing = !1), this.emit("error", b);
        return;
      }
      this.emit("write", p);
      let w = Pe(this._writingBuf, this._len, p);
      if (((this._len = w.len), (this._writingBuf = w.writingBuf), this._writingBuf.length)) {
        if (!this.sync) {
          l();
          return;
        }
        try {
          do {
            let S = s(),
              _ = Pe(this._writingBuf, this._len, S);
            (this._len = _.len), (this._writingBuf = _.writingBuf);
          } while (this._writingBuf.length);
        } catch (S) {
          this.release(S);
          return;
        }
      }
      this._fsync && A.fsyncSync(this.fd);
      let m = this._len;
      this._reopening
        ? ((this._writing = !1), (this._reopening = !1), this.reopen())
        : m > this.minLength
          ? this._actualWrite()
          : this._ending
            ? m > 0
              ? this._actualWrite()
              : ((this._writing = !1), fe(this))
            : ((this._writing = !1),
              this.sync
                ? this._asyncDrainScheduled ||
                  ((this._asyncDrainScheduled = !0), process.nextTick(hs, this))
                : this.emit("drain"));
    }),
      this.on("newListener", function (b) {
        b === "drain" && (this._asyncDrainScheduled = !1);
      });
  }
  function Pe(e, t, r) {
    return (
      typeof e == "string" &&
        Buffer.byteLength(e) !== r &&
        (r = Buffer.from(e).subarray(0, r).toString().length),
      (t = Math.max(t - r, 0)),
      (e = e.slice(r)),
      { writingBuf: e, len: t }
    );
  }
  function hs(e) {
    e.listenerCount("drain") > 0 && ((e._asyncDrainScheduled = !1), e.emit("drain"));
  }
  us(C, cs);
  function dr(e, t) {
    return e.length === 0 ? le : e.length === 1 ? e[0] : Buffer.concat(e, t);
  }
  function ds(e) {
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
  function ys(e) {
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
  function yr(e) {
    this._flushPending = !0;
    let t = () => {
        this._fsync
          ? ((this._flushPending = !1), e())
          : A.fsync(this.fd, (n) => {
              (this._flushPending = !1), e(n);
            }),
          this.off("error", r);
      },
      r = (n) => {
        (this._flushPending = !1), e(n), this.off("drain", t);
      };
    this.once("drain", t), this.once("error", r);
  }
  function gs(e) {
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
    e && yr.call(this, e),
      !this._writing && (this._bufs.length === 0 && this._bufs.push(""), this._actualWrite());
  }
  function ms(e) {
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
    e && yr.call(this, e),
      !this._writing &&
        (this._bufs.length === 0 && (this._bufs.push([]), this._lens.push(0)), this._actualWrite());
  }
  C.prototype.reopen = function (e) {
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
        A.close(t, (r) => {
          if (r) return this.emit("error", r);
        });
    }),
      hr(this.file, this);
  };
  C.prototype.end = function () {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this._opening) {
      this.once("ready", () => {
        this.end();
      });
      return;
    }
    this._ending ||
      ((this._ending = !0),
      !this._writing && (this._len > 0 && this.fd >= 0 ? this._actualWrite() : fe(this)));
  };
  function ps() {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this.fd < 0) throw new Error("sonic boom is not ready yet");
    !this._writing &&
      this._writingBuf.length > 0 &&
      (this._bufs.unshift(this._writingBuf), (this._writingBuf = ""));
    let e = "";
    for (; this._bufs.length || e; ) {
      e.length <= 0 && (e = this._bufs[0]);
      try {
        let t = A.writeSync(this.fd, e, "utf8"),
          r = Pe(e, this._len, t);
        (e = r.writingBuf), (this._len = r.len), e.length <= 0 && this._bufs.shift();
      } catch (t) {
        if (
          (t.code === "EAGAIN" || t.code === "EBUSY") &&
          !this.retryEAGAIN(t, e.length, this._len - e.length)
        )
          throw t;
        ze(oe);
      }
    }
    try {
      A.fsyncSync(this.fd);
    } catch {}
  }
  function bs() {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this.fd < 0) throw new Error("sonic boom is not ready yet");
    !this._writing &&
      this._writingBuf.length > 0 &&
      (this._bufs.unshift([this._writingBuf]), (this._writingBuf = le));
    let e = le;
    for (; this._bufs.length || e.length; ) {
      e.length <= 0 && (e = dr(this._bufs[0], this._lens[0]));
      try {
        let t = A.writeSync(this.fd, e);
        (e = e.subarray(t)),
          (this._len = Math.max(this._len - t, 0)),
          e.length <= 0 && (this._bufs.shift(), this._lens.shift());
      } catch (t) {
        if (
          (t.code === "EAGAIN" || t.code === "EBUSY") &&
          !this.retryEAGAIN(t, e.length, this._len - e.length)
        )
          throw t;
        ze(oe);
      }
    }
  }
  C.prototype.destroy = function () {
    this.destroyed || fe(this);
  };
  function ws() {
    let e = this.release;
    if (
      ((this._writing = !0),
      (this._writingBuf = this._writingBuf || this._bufs.shift() || ""),
      this.sync)
    )
      try {
        let t = A.writeSync(this.fd, this._writingBuf, "utf8");
        e(null, t);
      } catch (t) {
        e(t);
      }
    else A.write(this.fd, this._writingBuf, "utf8", e);
  }
  function Ss() {
    let e = this.release;
    if (
      ((this._writing = !0),
      (this._writingBuf = this._writingBuf.length
        ? this._writingBuf
        : dr(this._bufs.shift(), this._lens.shift())),
      this.sync)
    )
      try {
        let t = A.writeSync(this.fd, this._writingBuf);
        e(null, t);
      } catch (t) {
        e(t);
      }
    else A.write(this.fd, this._writingBuf, e);
  }
  function fe(e) {
    if (e.fd === -1) {
      e.once("ready", fe.bind(null, e));
      return;
    }
    (e.destroyed = !0), (e._bufs = []), (e._lens = []), A.fsync(e.fd, t);
    function t() {
      e.fd !== 1 && e.fd !== 2 ? A.close(e.fd, r) : r();
    }
    function r(n) {
      if (n) {
        e.emit("error", n);
        return;
      }
      e._ending && !e._writing && e.emit("finish"), e.emit("close");
    }
  }
  C.SonicBoom = C;
  C.default = C;
  gr.exports = C;
});
var Me = v((Uf, _r) => {
  "use strict";
  var I = { exit: [], beforeExit: [] },
    pr = { exit: Os, beforeExit: xs },
    G;
  function _s() {
    G === void 0 && (G = new FinalizationRegistry(vs));
  }
  function Es(e) {
    I[e].length > 0 || process.on(e, pr[e]);
  }
  function br(e) {
    I[e].length > 0 ||
      (process.removeListener(e, pr[e]),
      I.exit.length === 0 && I.beforeExit.length === 0 && (G = void 0));
  }
  function Os() {
    wr("exit");
  }
  function xs() {
    wr("beforeExit");
  }
  function wr(e) {
    for (let t of I[e]) {
      let r = t.deref(),
        n = t.fn;
      r !== void 0 && n(r, e);
    }
    I[e] = [];
  }
  function vs(e) {
    for (let t of ["exit", "beforeExit"]) {
      let r = I[t].indexOf(e);
      I[t].splice(r, r + 1), br(t);
    }
  }
  function Sr(e, t, r) {
    if (t === void 0) throw new Error("the object can't be undefined");
    Es(e);
    let n = new WeakRef(t);
    (n.fn = r), _s(), G.register(t, n), I[e].push(n);
  }
  function Ls(e, t) {
    Sr("exit", e, t);
  }
  function $s(e, t) {
    Sr("beforeExit", e, t);
  }
  function As(e) {
    if (G !== void 0) {
      G.unregister(e);
      for (let t of ["exit", "beforeExit"])
        (I[t] = I[t].filter((r) => {
          let n = r.deref();
          return n && n !== e;
        })),
          br(t);
    }
  }
  _r.exports = { register: Ls, registerBeforeExit: $s, unregister: As };
});
var Er = v((Gf, js) => {
  js.exports = {
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
var xr = v((Hf, Or) => {
  "use strict";
  function Ts(e, t, r, n, i) {
    let o = Date.now() + n,
      f = Atomics.load(e, t);
    if (f === r) {
      i(null, "ok");
      return;
    }
    let h = f,
      d = (g) => {
        Date.now() > o
          ? i(null, "timed-out")
          : setTimeout(() => {
              (h = f),
                (f = Atomics.load(e, t)),
                f === h
                  ? d(g >= 1e3 ? 1e3 : g * 2)
                  : f === r
                    ? i(null, "ok")
                    : i(null, "not-equal");
            }, g);
      };
    d(1);
  }
  function Rs(e, t, r, n, i) {
    let o = Date.now() + n,
      f = Atomics.load(e, t);
    if (f !== r) {
      i(null, "ok");
      return;
    }
    let h = (d) => {
      Date.now() > o
        ? i(null, "timed-out")
        : setTimeout(() => {
            (f = Atomics.load(e, t)), f !== r ? i(null, "ok") : h(d >= 1e3 ? 1e3 : d * 2);
          }, d);
    };
    h(1);
  }
  Or.exports = { wait: Ts, waitDiff: Rs };
});
var Lr = v((Xf, vr) => {
  "use strict";
  vr.exports = { WRITE_INDEX: 4, READ_INDEX: 8 };
});
var Rr = v((Yf, Tr) => {
  "use strict";
  var { version: ks } = Er(),
    { EventEmitter: Bs } = require("events"),
    { Worker: qs } = require("worker_threads"),
    { join: Cs } = require("path"),
    { pathToFileURL: Is } = require("url"),
    { wait: Ns } = xr(),
    { WRITE_INDEX: k, READ_INDEX: N } = Lr(),
    Ds = require("buffer"),
    Ps = require("assert"),
    a = Symbol("kImpl"),
    zs = Ds.constants.MAX_STRING_LENGTH,
    Q = class {
      constructor(t) {
        this._value = t;
      }
      deref() {
        return this._value;
      }
    },
    ue = class {
      register() {}
      unregister() {}
    },
    Ms = process.env.NODE_V8_COVERAGE ? ue : global.FinalizationRegistry || ue,
    Ws = process.env.NODE_V8_COVERAGE ? Q : global.WeakRef || Q,
    $r = new Ms((e) => {
      e.exited || e.terminate();
    });
  function Vs(e, t) {
    let { filename: r, workerData: n } = t,
      o =
        ("__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {})[
          "thread-stream-worker"
        ] || Cs(__dirname, "lib", "worker.js"),
      f = new qs(o, {
        ...t.workerOpts,
        trackUnmanagedFds: !1,
        workerData: {
          filename: r.indexOf("file://") === 0 ? r : Is(r).href,
          dataBuf: e[a].dataBuf,
          stateBuf: e[a].stateBuf,
          workerData: { $context: { threadStreamVersion: ks }, ...n },
        },
      });
    return (f.stream = new Q(e)), f.on("message", Fs), f.on("exit", jr), $r.register(e, f), f;
  }
  function Ar(e) {
    Ps(!e[a].sync), e[a].needDrain && ((e[a].needDrain = !1), e.emit("drain"));
  }
  function ce(e) {
    let t = Atomics.load(e[a].state, k),
      r = e[a].data.length - t;
    if (r > 0) {
      if (e[a].buf.length === 0) {
        (e[a].flushing = !1), e[a].ending ? Je(e) : e[a].needDrain && process.nextTick(Ar, e);
        return;
      }
      let n = e[a].buf.slice(0, r),
        i = Buffer.byteLength(n);
      i <= r
        ? ((e[a].buf = e[a].buf.slice(r)), ae(e, n, ce.bind(null, e)))
        : e.flush(() => {
            if (!e.destroyed) {
              for (
                Atomics.store(e[a].state, N, 0), Atomics.store(e[a].state, k, 0);
                i > e[a].data.length;

              )
                (r = r / 2), (n = e[a].buf.slice(0, r)), (i = Buffer.byteLength(n));
              (e[a].buf = e[a].buf.slice(r)), ae(e, n, ce.bind(null, e));
            }
          });
    } else if (r === 0) {
      if (t === 0 && e[a].buf.length === 0) return;
      e.flush(() => {
        Atomics.store(e[a].state, N, 0), Atomics.store(e[a].state, k, 0), ce(e);
      });
    } else D(e, new Error("overwritten"));
  }
  function Fs(e) {
    let t = this.stream.deref();
    if (t === void 0) {
      (this.exited = !0), this.terminate();
      return;
    }
    switch (e.code) {
      case "READY":
        (this.stream = new Ws(t)),
          t.flush(() => {
            (t[a].ready = !0), t.emit("ready");
          });
        break;
      case "ERROR":
        D(t, e.err);
        break;
      case "EVENT":
        Array.isArray(e.args) ? t.emit(e.name, ...e.args) : t.emit(e.name, e.args);
        break;
      case "WARNING":
        process.emitWarning(e.err);
        break;
      default:
        D(t, new Error("this should not happen: " + e.code));
    }
  }
  function jr(e) {
    let t = this.stream.deref();
    t !== void 0 &&
      ($r.unregister(t),
      (t.worker.exited = !0),
      t.worker.off("exit", jr),
      D(t, e !== 0 ? new Error("the worker thread exited") : null));
  }
  var Ve = class extends Bs {
    constructor(t = {}) {
      if ((super(), t.bufferSize < 4))
        throw new Error("bufferSize must at least fit a 4-byte utf-8 char");
      (this[a] = {}),
        (this[a].stateBuf = new SharedArrayBuffer(128)),
        (this[a].state = new Int32Array(this[a].stateBuf)),
        (this[a].dataBuf = new SharedArrayBuffer(t.bufferSize || 4 * 1024 * 1024)),
        (this[a].data = Buffer.from(this[a].dataBuf)),
        (this[a].sync = t.sync || !1),
        (this[a].ending = !1),
        (this[a].ended = !1),
        (this[a].needDrain = !1),
        (this[a].destroyed = !1),
        (this[a].flushing = !1),
        (this[a].ready = !1),
        (this[a].finished = !1),
        (this[a].errored = null),
        (this[a].closed = !1),
        (this[a].buf = ""),
        (this.worker = Vs(this, t)),
        this.on("message", (r, n) => {
          this.worker.postMessage(r, n);
        });
    }
    write(t) {
      if (this[a].destroyed) return Fe(this, new Error("the worker has exited")), !1;
      if (this[a].ending) return Fe(this, new Error("the worker is ending")), !1;
      if (this[a].flushing && this[a].buf.length + t.length >= zs)
        try {
          We(this), (this[a].flushing = !0);
        } catch (r) {
          return D(this, r), !1;
        }
      if (((this[a].buf += t), this[a].sync))
        try {
          return We(this), !0;
        } catch (r) {
          return D(this, r), !1;
        }
      return (
        this[a].flushing || ((this[a].flushing = !0), setImmediate(ce, this)),
        (this[a].needDrain =
          this[a].data.length - this[a].buf.length - Atomics.load(this[a].state, k) <= 0),
        !this[a].needDrain
      );
    }
    end() {
      this[a].destroyed || ((this[a].ending = !0), Je(this));
    }
    flush(t) {
      if (this[a].destroyed) {
        typeof t == "function" && process.nextTick(t, new Error("the worker has exited"));
        return;
      }
      let r = Atomics.load(this[a].state, k);
      Ns(this[a].state, N, r, 1 / 0, (n, i) => {
        if (n) {
          D(this, n), process.nextTick(t, n);
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
      this[a].destroyed || (We(this), Ke(this));
    }
    unref() {
      this.worker.unref();
    }
    ref() {
      this.worker.ref();
    }
    get ready() {
      return this[a].ready;
    }
    get destroyed() {
      return this[a].destroyed;
    }
    get closed() {
      return this[a].closed;
    }
    get writable() {
      return !this[a].destroyed && !this[a].ending;
    }
    get writableEnded() {
      return this[a].ending;
    }
    get writableFinished() {
      return this[a].finished;
    }
    get writableNeedDrain() {
      return this[a].needDrain;
    }
    get writableObjectMode() {
      return !1;
    }
    get writableErrored() {
      return this[a].errored;
    }
  };
  function Fe(e, t) {
    setImmediate(() => {
      e.emit("error", t);
    });
  }
  function D(e, t) {
    e[a].destroyed ||
      ((e[a].destroyed = !0),
      t && ((e[a].errored = t), Fe(e, t)),
      e.worker.exited
        ? setImmediate(() => {
            (e[a].closed = !0), e.emit("close");
          })
        : e.worker
            .terminate()
            .catch(() => {})
            .then(() => {
              (e[a].closed = !0), e.emit("close");
            }));
  }
  function ae(e, t, r) {
    let n = Atomics.load(e[a].state, k),
      i = Buffer.byteLength(t);
    return (
      e[a].data.write(t, n),
      Atomics.store(e[a].state, k, n + i),
      Atomics.notify(e[a].state, k),
      r(),
      !0
    );
  }
  function Je(e) {
    if (!(e[a].ended || !e[a].ending || e[a].flushing)) {
      e[a].ended = !0;
      try {
        e.flushSync();
        let t = Atomics.load(e[a].state, N);
        Atomics.store(e[a].state, k, -1), Atomics.notify(e[a].state, k);
        let r = 0;
        for (; t !== -1; ) {
          if ((Atomics.wait(e[a].state, N, t, 1e3), (t = Atomics.load(e[a].state, N)), t === -2)) {
            D(e, new Error("end() failed"));
            return;
          }
          if (++r === 10) {
            D(e, new Error("end() took too long (10s)"));
            return;
          }
        }
        process.nextTick(() => {
          (e[a].finished = !0), e.emit("finish");
        });
      } catch (t) {
        D(e, t);
      }
    }
  }
  function We(e) {
    let t = () => {
      e[a].ending ? Je(e) : e[a].needDrain && process.nextTick(Ar, e);
    };
    for (e[a].flushing = !1; e[a].buf.length !== 0; ) {
      let r = Atomics.load(e[a].state, k),
        n = e[a].data.length - r;
      if (n === 0) {
        Ke(e), Atomics.store(e[a].state, N, 0), Atomics.store(e[a].state, k, 0);
        continue;
      } else if (n < 0) throw new Error("overwritten");
      let i = e[a].buf.slice(0, n),
        o = Buffer.byteLength(i);
      if (o <= n) (e[a].buf = e[a].buf.slice(n)), ae(e, i, t);
      else {
        for (
          Ke(e), Atomics.store(e[a].state, N, 0), Atomics.store(e[a].state, k, 0);
          o > e[a].buf.length;

        )
          (n = n / 2), (i = e[a].buf.slice(0, n)), (o = Buffer.byteLength(i));
        (e[a].buf = e[a].buf.slice(n)), ae(e, i, t);
      }
    }
  }
  function Ke(e) {
    if (e[a].flushing) throw new Error("unable to flush while flushing");
    let t = Atomics.load(e[a].state, k),
      r = 0;
    for (;;) {
      let n = Atomics.load(e[a].state, N);
      if (n === -2) throw Error("_flushSync failed");
      if (n !== t) Atomics.wait(e[a].state, N, n, 1e3);
      else break;
      if (++r === 10) throw new Error("_flushSync took too long (10s)");
    }
  }
  Tr.exports = Ve;
});
var He = v((Qf, kr) => {
  "use strict";
  var { createRequire: Ks } = require("module"),
    Js = je(),
    { join: Ue, isAbsolute: Us, sep: Gs } = require("path"),
    Hs = De(),
    Ge = Me(),
    Xs = Rr();
  function Ys(e) {
    Ge.register(e, Zs),
      Ge.registerBeforeExit(e, eo),
      e.on("close", function () {
        Ge.unregister(e);
      });
  }
  function Qs(e, t, r) {
    let n = new Xs({ filename: e, workerData: t, workerOpts: r });
    n.on("ready", i),
      n.on("close", function () {
        process.removeListener("exit", o);
      }),
      process.on("exit", o);
    function i() {
      process.removeListener("exit", o), n.unref(), r.autoEnd !== !1 && Ys(n);
    }
    function o() {
      n.closed || (n.flushSync(), Hs(100), n.end());
    }
    return n;
  }
  function Zs(e) {
    e.ref(),
      e.flushSync(),
      e.end(),
      e.once("close", function () {
        e.unref();
      });
  }
  function eo(e) {
    e.flushSync();
  }
  function to(e) {
    let { pipeline: t, targets: r, levels: n, dedupe: i, worker: o = {}, caller: f = Js() } = e,
      h = { ...e.options },
      d = typeof f == "string" ? [f] : f,
      g = "__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {},
      u = e.target;
    if (u && r) throw new Error("only one of target or targets can be specified");
    return (
      r
        ? ((u = g["pino-worker"] || Ue(__dirname, "worker.js")),
          (h.targets = r.filter((y) => y.target).map((y) => ({ ...y, target: c(y.target) }))),
          (h.pipelines = r
            .filter((y) => y.pipeline)
            .map((y) => y.pipeline.map((s) => ({ ...s, level: y.level, target: c(s.target) })))))
        : t &&
          ((u = g["pino-worker"] || Ue(__dirname, "worker.js")),
          (h.pipelines = [t.map((y) => ({ ...y, target: c(y.target) }))])),
      n && (h.levels = n),
      i && (h.dedupe = i),
      (h.pinoWillSendConfig = !0),
      Qs(c(u), h, o)
    );
    function c(y) {
      if (((y = g[y] || y), Us(y) || y.indexOf("file://") === 0)) return y;
      if (y === "pino/file") return Ue(__dirname, "..", "file.js");
      let s;
      for (let l of d)
        try {
          let b = l === "node:repl" ? process.cwd() + Gs : l;
          s = Ks(b).resolve(y);
          break;
        } catch {
          continue;
        }
      if (!s) throw new Error(`unable to determine transport target for "${y}"`);
      return s;
    }
  }
  kr.exports = to;
});
var ye = v((Zf, Vr) => {
  "use strict";
  var Br = fr(),
    { mapHttpRequest: ro, mapHttpResponse: no } = Ae(),
    Ye = mr(),
    qr = Me(),
    {
      lsCacheSym: io,
      chindingsSym: Nr,
      writeSym: Cr,
      serializersSym: Dr,
      formatOptsSym: Ir,
      endSym: so,
      stringifiersSym: Pr,
      stringifySym: zr,
      stringifySafeSym: Qe,
      wildcardFirstSym: Mr,
      nestedKeySym: oo,
      formattersSym: Wr,
      messageKeySym: lo,
      errorKeySym: fo,
      nestedKeyStrSym: co,
      msgPrefixSym: he,
    } = U(),
    { isMainThread: uo } = require("worker_threads"),
    ao = He();
  function H() {}
  function ho(e, t) {
    if (!t) return r;
    return function (...i) {
      t.call(this, i, r, e);
    };
    function r(n, ...i) {
      if (typeof n == "object") {
        let o = n;
        n !== null &&
          (n.method && n.headers && n.socket
            ? (n = ro(n))
            : typeof n.setHeader == "function" && (n = no(n)));
        let f;
        o === null && i.length === 0 ? (f = [null]) : ((o = i.shift()), (f = i)),
          typeof this[he] == "string" && o !== void 0 && o !== null && (o = this[he] + o),
          this[Cr](n, Br(o, f, this[Ir]), e);
      } else {
        let o = n === void 0 ? i.shift() : n;
        typeof this[he] == "string" && o !== void 0 && o !== null && (o = this[he] + o),
          this[Cr](null, Br(o, i, this[Ir]), e);
      }
    }
  }
  function Xe(e) {
    let t = "",
      r = 0,
      n = !1,
      i = 255,
      o = e.length;
    if (o > 100) return JSON.stringify(e);
    for (var f = 0; f < o && i >= 32; f++)
      (i = e.charCodeAt(f)),
        (i === 34 || i === 92) && ((t += e.slice(r, f) + "\\"), (r = f), (n = !0));
    return n ? (t += e.slice(r)) : (t = e), i < 32 ? JSON.stringify(e) : '"' + t + '"';
  }
  function yo(e, t, r, n) {
    let i = this[zr],
      o = this[Qe],
      f = this[Pr],
      h = this[so],
      d = this[Nr],
      g = this[Dr],
      u = this[Wr],
      c = this[lo],
      y = this[fo],
      s = this[io][r] + n;
    s = s + d;
    let l;
    u.log && (e = u.log(e));
    let b = f[Mr],
      p = "";
    for (let m in e)
      if (((l = e[m]), Object.prototype.hasOwnProperty.call(e, m) && l !== void 0)) {
        g[m] ? (l = g[m](l)) : m === y && g.err && (l = g.err(l));
        let S = f[m] || b;
        switch (typeof l) {
          case "undefined":
          case "function":
            continue;
          case "number":
            Number.isFinite(l) === !1 && (l = null);
          case "boolean":
            S && (l = S(l));
            break;
          case "string":
            l = (S || Xe)(l);
            break;
          default:
            l = (S || i)(l, o);
        }
        if (l === void 0) continue;
        let _ = Xe(m);
        p += "," + _ + ":" + l;
      }
    let w = "";
    if (t !== void 0) {
      l = g[c] ? g[c](t) : t;
      let m = f[c] || b;
      switch (typeof l) {
        case "function":
          break;
        case "number":
          Number.isFinite(l) === !1 && (l = null);
        case "boolean":
          m && (l = m(l)), (w = ',"' + c + '":' + l);
          break;
        case "string":
          (l = (m || Xe)(l)), (w = ',"' + c + '":' + l);
          break;
        default:
          (l = (m || i)(l, o)), (w = ',"' + c + '":' + l);
      }
    }
    return this[oo] && p ? s + this[co] + p.slice(1) + "}" + w + h : s + p + w + h;
  }
  function go(e, t) {
    let r,
      n = e[Nr],
      i = e[zr],
      o = e[Qe],
      f = e[Pr],
      h = f[Mr],
      d = e[Dr],
      g = e[Wr].bindings;
    t = g(t);
    for (let u in t)
      if (
        ((r = t[u]),
        (u !== "level" &&
          u !== "serializers" &&
          u !== "formatters" &&
          u !== "customLevels" &&
          t.hasOwnProperty(u) &&
          r !== void 0) === !0)
      ) {
        if (((r = d[u] ? d[u](r) : r), (r = (f[u] || h || i)(r, o)), r === void 0)) continue;
        n += ',"' + u + '":' + r;
      }
    return n;
  }
  function mo(e) {
    return e.write !== e.constructor.prototype.write;
  }
  var po = process.env.NODE_V8_COVERAGE || process.env.V8_COVERAGE;
  function de(e) {
    let t = new Ye(e);
    return (
      t.on("error", r),
      !po &&
        !e.sync &&
        uo &&
        (qr.register(t, bo),
        t.on("close", function () {
          qr.unregister(t);
        })),
      t
    );
    function r(n) {
      if (n.code === "EPIPE") {
        (t.write = H), (t.end = H), (t.flushSync = H), (t.destroy = H);
        return;
      }
      t.removeListener("error", r), t.emit("error", n);
    }
  }
  function bo(e, t) {
    e.destroyed ||
      (t === "beforeExit"
        ? (e.flush(),
          e.on("drain", function () {
            e.end();
          }))
        : e.flushSync());
  }
  function wo(e) {
    return function (r, n, i = {}, o) {
      if (typeof i == "string") (o = de({ dest: i })), (i = {});
      else if (typeof o == "string") {
        if (i && i.transport)
          throw Error("only one of option.transport or stream can be specified");
        o = de({ dest: o });
      } else if (i instanceof Ye || i.writable || i._writableState) (o = i), (i = {});
      else if (i.transport) {
        if (i.transport instanceof Ye || i.transport.writable || i.transport._writableState)
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
        let d;
        i.customLevels &&
          (d = i.useOnlyCustomLevels
            ? i.customLevels
            : Object.assign({}, i.levels, i.customLevels)),
          (o = ao({ caller: n, ...i.transport, levels: d }));
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
      let { enabled: f, onChild: h } = i;
      return (
        f === !1 && (i.level = "silent"),
        h || (i.onChild = H),
        o || (mo(process.stdout) ? (o = process.stdout) : (o = de({ fd: process.stdout.fd || 1 }))),
        { opts: i, stream: o }
      );
    };
  }
  function So(e, t) {
    try {
      return JSON.stringify(e);
    } catch {
      try {
        return (t || this[Qe])(e);
      } catch {
        return '"[unable to serialize, circular reference is too complex to analyze]"';
      }
    }
  }
  function _o(e, t, r) {
    return { level: e, bindings: t, log: r };
  }
  function Eo(e) {
    let t = Number(e);
    return typeof e == "string" && Number.isFinite(t) ? t : e === void 0 ? 1 : e;
  }
  Vr.exports = {
    noop: H,
    buildSafeSonicBoom: de,
    asChindings: go,
    asJson: yo,
    genLog: ho,
    createArgsNormalizer: wo,
    stringify: So,
    buildFormatters: _o,
    normalizeDestFileDescriptor: Eo,
  };
});
var ge = v((ec, Fr) => {
  var Oo = { trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60 },
    xo = { ASC: "ASC", DESC: "DESC" };
  Fr.exports = { DEFAULT_LEVELS: Oo, SORTING_ORDER: xo };
});
var tt = v((tc, Gr) => {
  "use strict";
  var {
      lsCacheSym: vo,
      levelValSym: Ze,
      useOnlyCustomLevelsSym: Lo,
      streamSym: $o,
      formattersSym: Ao,
      hooksSym: jo,
      levelCompSym: Kr,
    } = U(),
    { noop: To, genLog: W } = ye(),
    { DEFAULT_LEVELS: P, SORTING_ORDER: Jr } = ge(),
    Ur = {
      fatal: (e) => {
        let t = W(P.fatal, e);
        return function (...r) {
          let n = this[$o];
          if ((t.call(this, ...r), typeof n.flushSync == "function"))
            try {
              n.flushSync();
            } catch {}
        };
      },
      error: (e) => W(P.error, e),
      warn: (e) => W(P.warn, e),
      info: (e) => W(P.info, e),
      debug: (e) => W(P.debug, e),
      trace: (e) => W(P.trace, e),
    },
    et = Object.keys(P).reduce((e, t) => ((e[P[t]] = t), e), {}),
    Ro = Object.keys(et).reduce((e, t) => ((e[t] = '{"level":' + Number(t)), e), {});
  function ko(e) {
    let t = e[Ao].level,
      { labels: r } = e.levels,
      n = {};
    for (let i in r) {
      let o = t(r[i], Number(i));
      n[i] = JSON.stringify(o).slice(0, -1);
    }
    return (e[vo] = n), e;
  }
  function Bo(e, t) {
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
  function qo(e) {
    let { labels: t, values: r } = this.levels;
    if (typeof e == "number") {
      if (t[e] === void 0) throw Error("unknown level value" + e);
      e = t[e];
    }
    if (r[e] === void 0) throw Error("unknown level " + e);
    let n = this[Ze],
      i = (this[Ze] = r[e]),
      o = this[Lo],
      f = this[Kr],
      h = this[jo].logMethod;
    for (let d in r) {
      if (f(r[d], i) === !1) {
        this[d] = To;
        continue;
      }
      this[d] = Bo(d, o) ? Ur[d](h) : W(r[d], h);
    }
    this.emit("level-change", e, i, t[n], n, this);
  }
  function Co(e) {
    let { levels: t, levelVal: r } = this;
    return t && t.labels ? t.labels[r] : "";
  }
  function Io(e) {
    let { values: t } = this.levels,
      r = t[e];
    return r !== void 0 && this[Kr](r, this[Ze]);
  }
  function No(e, t, r) {
    return e === Jr.DESC ? t <= r : t >= r;
  }
  function Do(e) {
    return typeof e == "string" ? No.bind(null, e) : e;
  }
  function Po(e = null, t = !1) {
    let r = e ? Object.keys(e).reduce((o, f) => ((o[e[f]] = f), o), {}) : null,
      n = Object.assign(
        Object.create(Object.prototype, { Infinity: { value: "silent" } }),
        t ? null : et,
        r,
      ),
      i = Object.assign(
        Object.create(Object.prototype, { silent: { value: 1 / 0 } }),
        t ? null : P,
        e,
      );
    return { labels: n, values: i };
  }
  function zo(e, t, r) {
    if (typeof e == "number") {
      if (
        ![]
          .concat(
            Object.keys(t || {}).map((o) => t[o]),
            r ? [] : Object.keys(et).map((o) => +o),
            1 / 0,
          )
          .includes(e)
      )
        throw Error(`default level:${e} must be included in custom levels`);
      return;
    }
    let n = Object.assign(
      Object.create(Object.prototype, { silent: { value: 1 / 0 } }),
      r ? null : P,
      t,
    );
    if (!(e in n)) throw Error(`default level:${e} must be included in custom levels`);
  }
  function Mo(e, t) {
    let { labels: r, values: n } = e;
    for (let i in t) {
      if (i in n) throw Error("levels cannot be overridden");
      if (t[i] in r) throw Error("pre-existing level values cannot be used for new levels");
    }
  }
  function Wo(e) {
    if (typeof e != "function" && !(typeof e == "string" && Object.values(Jr).includes(e)))
      throw new Error('Levels comparison should be one of "ASC", "DESC" or "function" type');
  }
  Gr.exports = {
    initialLsCache: Ro,
    genLsCache: ko,
    levelMethods: Ur,
    getLevel: Co,
    setLevel: qo,
    isLevelEnabled: Io,
    mappings: Po,
    assertNoLevelCollisions: Mo,
    assertDefaultLevelFound: zo,
    genLevelComparison: Do,
    assertLevelComparison: Wo,
  };
});
var rt = v((rc, Hr) => {
  "use strict";
  Hr.exports = { version: "9.2.0" };
});
var ln = v((ic, on) => {
  "use strict";
  var { EventEmitter: Vo } = require("events"),
    {
      lsCacheSym: Fo,
      levelValSym: Ko,
      setLevelSym: it,
      getLevelSym: Xr,
      chindingsSym: st,
      parsedChindingsSym: Jo,
      mixinSym: Uo,
      asJsonSym: tn,
      writeSym: Go,
      mixinMergeStrategySym: Ho,
      timeSym: Xo,
      timeSliceIndexSym: Yo,
      streamSym: rn,
      serializersSym: V,
      formattersSym: nt,
      errorKeySym: Qo,
      messageKeySym: Zo,
      useOnlyCustomLevelsSym: el,
      needsMetadataGsym: tl,
      redactFmtSym: rl,
      stringifySym: nl,
      formatOptsSym: il,
      stringifiersSym: sl,
      msgPrefixSym: Yr,
    } = U(),
    {
      getLevel: ol,
      setLevel: ll,
      isLevelEnabled: fl,
      mappings: cl,
      initialLsCache: ul,
      genLsCache: al,
      assertNoLevelCollisions: hl,
    } = tt(),
    { asChindings: nn, asJson: dl, buildFormatters: Qr, stringify: Zr } = ye(),
    { version: yl } = rt(),
    gl = Ie(),
    ml = class {},
    sn = {
      constructor: ml,
      child: pl,
      bindings: bl,
      setBindings: wl,
      flush: Ol,
      isLevelEnabled: fl,
      version: yl,
      get level() {
        return this[Xr]();
      },
      set level(e) {
        this[it](e);
      },
      get levelVal() {
        return this[Ko];
      },
      set levelVal(e) {
        throw Error("levelVal is read-only");
      },
      [Fo]: ul,
      [Go]: _l,
      [tn]: dl,
      [Xr]: ol,
      [it]: ll,
    };
  Object.setPrototypeOf(sn, Vo.prototype);
  on.exports = function () {
    return Object.create(sn);
  };
  var en = (e) => e;
  function pl(e, t) {
    if (!e) throw Error("missing bindings for child Pino");
    t = t || {};
    let r = this[V],
      n = this[nt],
      i = Object.create(this);
    if (t.hasOwnProperty("serializers") === !0) {
      i[V] = Object.create(null);
      for (let u in r) i[V][u] = r[u];
      let d = Object.getOwnPropertySymbols(r);
      for (var o = 0; o < d.length; o++) {
        let u = d[o];
        i[V][u] = r[u];
      }
      for (let u in t.serializers) i[V][u] = t.serializers[u];
      let g = Object.getOwnPropertySymbols(t.serializers);
      for (var f = 0; f < g.length; f++) {
        let u = g[f];
        i[V][u] = t.serializers[u];
      }
    } else i[V] = r;
    if (t.hasOwnProperty("formatters")) {
      let { level: d, bindings: g, log: u } = t.formatters;
      i[nt] = Qr(d || n.level, g || en, u || n.log);
    } else i[nt] = Qr(n.level, en, n.log);
    if (
      (t.hasOwnProperty("customLevels") === !0 &&
        (hl(this.levels, t.customLevels), (i.levels = cl(t.customLevels, i[el])), al(i)),
      (typeof t.redact == "object" && t.redact !== null) || Array.isArray(t.redact))
    ) {
      i.redact = t.redact;
      let d = gl(i.redact, Zr),
        g = { stringify: d[rl] };
      (i[nl] = Zr), (i[sl] = d), (i[il] = g);
    }
    typeof t.msgPrefix == "string" && (i[Yr] = (this[Yr] || "") + t.msgPrefix), (i[st] = nn(i, e));
    let h = t.level || this.level;
    return i[it](h), this.onChild(i), i;
  }
  function bl() {
    let t = `{${this[st].substr(1)}}`,
      r = JSON.parse(t);
    return delete r.pid, delete r.hostname, r;
  }
  function wl(e) {
    let t = nn(this, e);
    (this[st] = t), delete this[Jo];
  }
  function Sl(e, t) {
    return Object.assign(t, e);
  }
  function _l(e, t, r) {
    let n = this[Xo](),
      i = this[Uo],
      o = this[Qo],
      f = this[Zo],
      h = this[Ho] || Sl,
      d;
    e == null
      ? (d = {})
      : e instanceof Error
        ? ((d = { [o]: e }), t === void 0 && (t = e.message))
        : ((d = e), t === void 0 && e[f] === void 0 && e[o] && (t = e[o].message)),
      i && (d = h(d, i(d, r, this)));
    let g = this[tn](d, t, r, n),
      u = this[rn];
    u[tl] === !0 &&
      ((u.lastLevel = r),
      (u.lastObj = d),
      (u.lastMsg = t),
      (u.lastTime = n.slice(this[Yo])),
      (u.lastLogger = this)),
      u.write(g);
  }
  function El() {}
  function Ol(e) {
    if (e != null && typeof e != "function") throw Error("callback must be a function");
    let t = this[rn];
    typeof t.flush == "function" ? t.flush(e || El) : e && e();
  }
});
var hn = v((ct, an) => {
  "use strict";
  var { hasOwnProperty: me } = Object.prototype,
    K = ft();
  K.configure = ft;
  K.stringify = K;
  K.default = K;
  ct.stringify = K;
  ct.configure = ft;
  an.exports = K;
  var xl =
    /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
  function M(e) {
    return e.length < 5e3 && !xl.test(e) ? `"${e}"` : JSON.stringify(e);
  }
  function ot(e) {
    if (e.length > 200) return e.sort();
    for (let t = 1; t < e.length; t++) {
      let r = e[t],
        n = t;
      for (; n !== 0 && e[n - 1] > r; ) (e[n] = e[n - 1]), n--;
      e[n] = r;
    }
    return e;
  }
  var vl = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(Object.getPrototypeOf(new Int8Array())),
    Symbol.toStringTag,
  ).get;
  function lt(e) {
    return vl.call(e) !== void 0 && e.length !== 0;
  }
  function fn(e, t, r) {
    e.length < r && (r = e.length);
    let n = t === "," ? "" : " ",
      i = `"0":${n}${e[0]}`;
    for (let o = 1; o < r; o++) i += `${t}"${o}":${n}${e[o]}`;
    return i;
  }
  function Ll(e) {
    if (me.call(e, "circularValue")) {
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
  function cn(e, t) {
    let r;
    if (me.call(e, t) && ((r = e[t]), typeof r != "boolean"))
      throw new TypeError(`The "${t}" argument must be of type boolean`);
    return r === void 0 ? !0 : r;
  }
  function un(e, t) {
    let r;
    if (me.call(e, t)) {
      if (((r = e[t]), typeof r != "number"))
        throw new TypeError(`The "${t}" argument must be of type number`);
      if (!Number.isInteger(r)) throw new TypeError(`The "${t}" argument must be an integer`);
      if (r < 1) throw new RangeError(`The "${t}" argument must be >= 1`);
    }
    return r === void 0 ? 1 / 0 : r;
  }
  function F(e) {
    return e === 1 ? "1 item" : `${e} items`;
  }
  function $l(e) {
    let t = new Set();
    for (let r of e) (typeof r == "string" || typeof r == "number") && t.add(String(r));
    return t;
  }
  function Al(e) {
    if (me.call(e, "strict")) {
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
  function ft(e) {
    e = { ...e };
    let t = Al(e);
    t &&
      (e.bigint === void 0 && (e.bigint = !1), "circularValue" in e || (e.circularValue = Error));
    let r = Ll(e),
      n = cn(e, "bigint"),
      i = cn(e, "deterministic"),
      o = un(e, "maximumDepth"),
      f = un(e, "maximumBreadth");
    function h(y, s, l, b, p, w) {
      let m = s[y];
      switch (
        (typeof m == "object" && m !== null && typeof m.toJSON == "function" && (m = m.toJSON(y)),
        (m = b.call(s, y, m)),
        typeof m)
      ) {
        case "string":
          return M(m);
        case "object": {
          if (m === null) return "null";
          if (l.indexOf(m) !== -1) return r;
          let S = "",
            _ = ",",
            E = w;
          if (Array.isArray(m)) {
            if (m.length === 0) return "[]";
            if (o < l.length + 1) return '"[Array]"';
            l.push(m),
              p !== "" &&
                ((w += p),
                (S += `
${w}`),
                (_ = `,
${w}`));
            let T = Math.min(m.length, f),
              R = 0;
            for (; R < T - 1; R++) {
              let J = h(String(R), m, l, b, p, w);
              (S += J !== void 0 ? J : "null"), (S += _);
            }
            let B = h(String(R), m, l, b, p, w);
            if (((S += B !== void 0 ? B : "null"), m.length - 1 > f)) {
              let J = m.length - f - 1;
              S += `${_}"... ${F(J)} not stringified"`;
            }
            return (
              p !== "" &&
                (S += `
${E}`),
              l.pop(),
              `[${S}]`
            );
          }
          let O = Object.keys(m),
            $ = O.length;
          if ($ === 0) return "{}";
          if (o < l.length + 1) return '"[Object]"';
          let x = "",
            L = "";
          p !== "" &&
            ((w += p),
            (_ = `,
${w}`),
            (x = " "));
          let j = Math.min($, f);
          i && !lt(m) && (O = ot(O)), l.push(m);
          for (let T = 0; T < j; T++) {
            let R = O[T],
              B = h(R, m, l, b, p, w);
            B !== void 0 && ((S += `${L}${M(R)}:${x}${B}`), (L = _));
          }
          if ($ > f) {
            let T = $ - f;
            (S += `${L}"...":${x}"${F(T)} not stringified"`), (L = _);
          }
          return (
            p !== "" &&
              L.length > 1 &&
              (S = `
${w}${S}
${E}`),
            l.pop(),
            `{${S}}`
          );
        }
        case "number":
          return isFinite(m) ? String(m) : t ? t(m) : "null";
        case "boolean":
          return m === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (n) return String(m);
        default:
          return t ? t(m) : void 0;
      }
    }
    function d(y, s, l, b, p, w) {
      switch (
        (typeof s == "object" && s !== null && typeof s.toJSON == "function" && (s = s.toJSON(y)),
        typeof s)
      ) {
        case "string":
          return M(s);
        case "object": {
          if (s === null) return "null";
          if (l.indexOf(s) !== -1) return r;
          let m = w,
            S = "",
            _ = ",";
          if (Array.isArray(s)) {
            if (s.length === 0) return "[]";
            if (o < l.length + 1) return '"[Array]"';
            l.push(s),
              p !== "" &&
                ((w += p),
                (S += `
${w}`),
                (_ = `,
${w}`));
            let $ = Math.min(s.length, f),
              x = 0;
            for (; x < $ - 1; x++) {
              let j = d(String(x), s[x], l, b, p, w);
              (S += j !== void 0 ? j : "null"), (S += _);
            }
            let L = d(String(x), s[x], l, b, p, w);
            if (((S += L !== void 0 ? L : "null"), s.length - 1 > f)) {
              let j = s.length - f - 1;
              S += `${_}"... ${F(j)} not stringified"`;
            }
            return (
              p !== "" &&
                (S += `
${m}`),
              l.pop(),
              `[${S}]`
            );
          }
          l.push(s);
          let E = "";
          p !== "" &&
            ((w += p),
            (_ = `,
${w}`),
            (E = " "));
          let O = "";
          for (let $ of b) {
            let x = d($, s[$], l, b, p, w);
            x !== void 0 && ((S += `${O}${M($)}:${E}${x}`), (O = _));
          }
          return (
            p !== "" &&
              O.length > 1 &&
              (S = `
${w}${S}
${m}`),
            l.pop(),
            `{${S}}`
          );
        }
        case "number":
          return isFinite(s) ? String(s) : t ? t(s) : "null";
        case "boolean":
          return s === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (n) return String(s);
        default:
          return t ? t(s) : void 0;
      }
    }
    function g(y, s, l, b, p) {
      switch (typeof s) {
        case "string":
          return M(s);
        case "object": {
          if (s === null) return "null";
          if (typeof s.toJSON == "function") {
            if (((s = s.toJSON(y)), typeof s != "object")) return g(y, s, l, b, p);
            if (s === null) return "null";
          }
          if (l.indexOf(s) !== -1) return r;
          let w = p;
          if (Array.isArray(s)) {
            if (s.length === 0) return "[]";
            if (o < l.length + 1) return '"[Array]"';
            l.push(s), (p += b);
            let x = `
${p}`,
              L = `,
${p}`,
              j = Math.min(s.length, f),
              T = 0;
            for (; T < j - 1; T++) {
              let B = g(String(T), s[T], l, b, p);
              (x += B !== void 0 ? B : "null"), (x += L);
            }
            let R = g(String(T), s[T], l, b, p);
            if (((x += R !== void 0 ? R : "null"), s.length - 1 > f)) {
              let B = s.length - f - 1;
              x += `${L}"... ${F(B)} not stringified"`;
            }
            return (
              (x += `
${w}`),
              l.pop(),
              `[${x}]`
            );
          }
          let m = Object.keys(s),
            S = m.length;
          if (S === 0) return "{}";
          if (o < l.length + 1) return '"[Object]"';
          p += b;
          let _ = `,
${p}`,
            E = "",
            O = "",
            $ = Math.min(S, f);
          lt(s) && ((E += fn(s, _, f)), (m = m.slice(s.length)), ($ -= s.length), (O = _)),
            i && (m = ot(m)),
            l.push(s);
          for (let x = 0; x < $; x++) {
            let L = m[x],
              j = g(L, s[L], l, b, p);
            j !== void 0 && ((E += `${O}${M(L)}: ${j}`), (O = _));
          }
          if (S > f) {
            let x = S - f;
            (E += `${O}"...": "${F(x)} not stringified"`), (O = _);
          }
          return (
            O !== "" &&
              (E = `
${p}${E}
${w}`),
            l.pop(),
            `{${E}}`
          );
        }
        case "number":
          return isFinite(s) ? String(s) : t ? t(s) : "null";
        case "boolean":
          return s === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (n) return String(s);
        default:
          return t ? t(s) : void 0;
      }
    }
    function u(y, s, l) {
      switch (typeof s) {
        case "string":
          return M(s);
        case "object": {
          if (s === null) return "null";
          if (typeof s.toJSON == "function") {
            if (((s = s.toJSON(y)), typeof s != "object")) return u(y, s, l);
            if (s === null) return "null";
          }
          if (l.indexOf(s) !== -1) return r;
          let b = "";
          if (Array.isArray(s)) {
            if (s.length === 0) return "[]";
            if (o < l.length + 1) return '"[Array]"';
            l.push(s);
            let _ = Math.min(s.length, f),
              E = 0;
            for (; E < _ - 1; E++) {
              let $ = u(String(E), s[E], l);
              (b += $ !== void 0 ? $ : "null"), (b += ",");
            }
            let O = u(String(E), s[E], l);
            if (((b += O !== void 0 ? O : "null"), s.length - 1 > f)) {
              let $ = s.length - f - 1;
              b += `,"... ${F($)} not stringified"`;
            }
            return l.pop(), `[${b}]`;
          }
          let p = Object.keys(s),
            w = p.length;
          if (w === 0) return "{}";
          if (o < l.length + 1) return '"[Object]"';
          let m = "",
            S = Math.min(w, f);
          lt(s) && ((b += fn(s, ",", f)), (p = p.slice(s.length)), (S -= s.length), (m = ",")),
            i && (p = ot(p)),
            l.push(s);
          for (let _ = 0; _ < S; _++) {
            let E = p[_],
              O = u(E, s[E], l);
            O !== void 0 && ((b += `${m}${M(E)}:${O}`), (m = ","));
          }
          if (w > f) {
            let _ = w - f;
            b += `${m}"...":"${F(_)} not stringified"`;
          }
          return l.pop(), `{${b}}`;
        }
        case "number":
          return isFinite(s) ? String(s) : t ? t(s) : "null";
        case "boolean":
          return s === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (n) return String(s);
        default:
          return t ? t(s) : void 0;
      }
    }
    function c(y, s, l) {
      if (arguments.length > 1) {
        let b = "";
        if (
          (typeof l == "number"
            ? (b = " ".repeat(Math.min(l, 10)))
            : typeof l == "string" && (b = l.slice(0, 10)),
          s != null)
        ) {
          if (typeof s == "function") return h("", { "": y }, [], s, b, "");
          if (Array.isArray(s)) return d("", y, [], $l(s), b, "");
        }
        if (b.length !== 0) return g("", y, [], b, "");
      }
      return u("", y, []);
    }
    return c;
  }
});
var gn = v((sc, yn) => {
  "use strict";
  var ut = Symbol.for("pino.metadata"),
    { DEFAULT_LEVELS: dn } = ge(),
    jl = dn.info;
  function Tl(e, t) {
    let r = 0;
    (e = e || []), (t = t || { dedupe: !1 });
    let n = Object.create(dn);
    (n.silent = 1 / 0),
      t.levels &&
        typeof t.levels == "object" &&
        Object.keys(t.levels).forEach((c) => {
          n[c] = t.levels[c];
        });
    let i = {
      write: o,
      add: d,
      emit: f,
      flushSync: h,
      end: g,
      minLevel: 0,
      streams: [],
      clone: u,
      [ut]: !0,
      streamLevels: n,
    };
    return Array.isArray(e) ? e.forEach(d, i) : d.call(i, e), (e = null), i;
    function o(c) {
      let y,
        s = this.lastLevel,
        { streams: l } = this,
        b = 0,
        p;
      for (let w = kl(l.length, t.dedupe); ql(w, l.length, t.dedupe); w = Bl(w, t.dedupe))
        if (((y = l[w]), y.level <= s)) {
          if (b !== 0 && b !== y.level) break;
          if (((p = y.stream), p[ut])) {
            let { lastTime: m, lastMsg: S, lastObj: _, lastLogger: E } = this;
            (p.lastLevel = s),
              (p.lastTime = m),
              (p.lastMsg = S),
              (p.lastObj = _),
              (p.lastLogger = E);
          }
          p.write(c), t.dedupe && (b = y.level);
        } else if (!t.dedupe) break;
    }
    function f(...c) {
      for (let { stream: y } of this.streams) typeof y.emit == "function" && y.emit(...c);
    }
    function h() {
      for (let { stream: c } of this.streams) typeof c.flushSync == "function" && c.flushSync();
    }
    function d(c) {
      if (!c) return i;
      let y = typeof c.write == "function" || c.stream,
        s = c.write ? c : c.stream;
      if (!y)
        throw Error(
          "stream object needs to implement either StreamEntry or DestinationStream interface",
        );
      let { streams: l, streamLevels: b } = this,
        p;
      typeof c.levelVal == "number"
        ? (p = c.levelVal)
        : typeof c.level == "string"
          ? (p = b[c.level])
          : typeof c.level == "number"
            ? (p = c.level)
            : (p = jl);
      let w = { stream: s, level: p, levelVal: void 0, id: r++ };
      return l.unshift(w), l.sort(Rl), (this.minLevel = l[0].level), i;
    }
    function g() {
      for (let { stream: c } of this.streams)
        typeof c.flushSync == "function" && c.flushSync(), c.end();
    }
    function u(c) {
      let y = new Array(this.streams.length);
      for (let s = 0; s < y.length; s++) y[s] = { level: c, stream: this.streams[s].stream };
      return {
        write: o,
        add: d,
        minLevel: c,
        streams: y,
        clone: u,
        emit: f,
        flushSync: h,
        [ut]: !0,
      };
    }
  }
  function Rl(e, t) {
    return e.level - t.level;
  }
  function kl(e, t) {
    return t ? e - 1 : 0;
  }
  function Bl(e, t) {
    return t ? e - 1 : e + 1;
  }
  function ql(e, t, r) {
    return r ? e >= 0 : e < t;
  }
  yn.exports = Tl;
});
var An = v((oc, q) => {
  function pe(e) {
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
    "thread-stream-worker": pe("./thread-stream-worker.js"),
    "pino-worker": pe("./pino-worker.js"),
    "pino/file": pe("./pino-file.js"),
    "pino-pretty": pe("./pino-pretty.js"),
  };
  var Cl = require("os"),
    On = Ae(),
    Il = je(),
    Nl = Ie(),
    xn = or(),
    Dl = ln(),
    vn = U(),
    { configure: Pl } = hn(),
    {
      assertDefaultLevelFound: zl,
      mappings: Ln,
      genLsCache: Ml,
      genLevelComparison: Wl,
      assertLevelComparison: Vl,
    } = tt(),
    { DEFAULT_LEVELS: Fl, SORTING_ORDER: Kl } = ge(),
    {
      createArgsNormalizer: Jl,
      asChindings: Ul,
      buildSafeSonicBoom: mn,
      buildFormatters: Gl,
      stringify: at,
      normalizeDestFileDescriptor: pn,
      noop: Hl,
    } = ye(),
    { version: Xl } = rt(),
    {
      chindingsSym: bn,
      redactFmtSym: Yl,
      serializersSym: wn,
      timeSym: Ql,
      timeSliceIndexSym: Zl,
      streamSym: ef,
      stringifySym: Sn,
      stringifySafeSym: ht,
      stringifiersSym: _n,
      setLevelSym: tf,
      endSym: rf,
      formatOptsSym: nf,
      messageKeySym: sf,
      errorKeySym: of,
      nestedKeySym: lf,
      mixinSym: ff,
      levelCompSym: cf,
      useOnlyCustomLevelsSym: uf,
      formattersSym: En,
      hooksSym: af,
      nestedKeyStrSym: hf,
      mixinMergeStrategySym: df,
      msgPrefixSym: yf,
    } = vn,
    { epochTime: $n, nullTime: gf } = xn,
    { pid: mf } = process,
    pf = Cl.hostname(),
    bf = On.err,
    wf = {
      level: "info",
      levelComparison: Kl.ASC,
      levels: Fl,
      messageKey: "msg",
      errorKey: "err",
      nestedKey: null,
      enabled: !0,
      base: { pid: mf, hostname: pf },
      serializers: Object.assign(Object.create(null), { err: bf }),
      formatters: Object.assign(Object.create(null), {
        bindings(e) {
          return e;
        },
        level(e, t) {
          return { level: t };
        },
      }),
      hooks: { logMethod: void 0 },
      timestamp: $n,
      name: void 0,
      redact: null,
      customLevels: null,
      useOnlyCustomLevels: !1,
      depthLimit: 5,
      edgeLimit: 100,
    },
    Sf = Jl(wf),
    _f = Object.assign(Object.create(null), On);
  function dt(...e) {
    let t = {},
      { opts: r, stream: n } = Sf(t, Il(), ...e),
      {
        redact: i,
        crlf: o,
        serializers: f,
        timestamp: h,
        messageKey: d,
        errorKey: g,
        nestedKey: u,
        base: c,
        name: y,
        level: s,
        customLevels: l,
        levelComparison: b,
        mixin: p,
        mixinMergeStrategy: w,
        useOnlyCustomLevels: m,
        formatters: S,
        hooks: _,
        depthLimit: E,
        edgeLimit: O,
        onChild: $,
        msgPrefix: x,
      } = r,
      L = Pl({ maximumDepth: E, maximumBreadth: O }),
      j = Gl(S.level, S.bindings, S.log),
      T = at.bind({ [ht]: L }),
      R = i ? Nl(i, T) : {},
      B = i ? { stringify: R[Yl] } : { stringify: T },
      J =
        "}" +
        (o
          ? `\r
`
          : `
`),
      yt = Ul.bind(null, { [bn]: "", [wn]: f, [_n]: R, [Sn]: at, [ht]: L, [En]: j }),
      be = "";
    c !== null && (y === void 0 ? (be = yt(c)) : (be = yt(Object.assign({}, c, { name: y }))));
    let gt = h instanceof Function ? h : h ? $n : gf,
      jn = gt().indexOf(":") + 1;
    if (m && !l) throw Error("customLevels is required if useOnlyCustomLevels is set true");
    if (p && typeof p != "function")
      throw Error(`Unknown mixin type "${typeof p}" - expected "function"`);
    if (x && typeof x != "string")
      throw Error(`Unknown msgPrefix type "${typeof x}" - expected "string"`);
    zl(s, l, m);
    let mt = Ln(l, m);
    typeof n.emit == "function" &&
      n.emit("message", {
        code: "PINO_CONFIG",
        config: { levels: mt, messageKey: d, errorKey: g },
      }),
      Vl(b);
    let Tn = Wl(b);
    return (
      Object.assign(t, {
        levels: mt,
        [cf]: Tn,
        [uf]: m,
        [ef]: n,
        [Ql]: gt,
        [Zl]: jn,
        [Sn]: at,
        [ht]: L,
        [_n]: R,
        [rf]: J,
        [nf]: B,
        [sf]: d,
        [of]: g,
        [lf]: u,
        [hf]: u ? `,${JSON.stringify(u)}:{` : "",
        [wn]: f,
        [ff]: p,
        [df]: w,
        [bn]: be,
        [En]: j,
        [af]: _,
        silent: Hl,
        onChild: $,
        [yf]: x,
      }),
      Object.setPrototypeOf(t, Dl()),
      Ml(t),
      t[tf](s),
      t
    );
  }
  q.exports = dt;
  q.exports.destination = (e = process.stdout.fd) =>
    typeof e == "object"
      ? ((e.dest = pn(e.dest || process.stdout.fd)), mn(e))
      : mn({ dest: pn(e), minLength: 0 });
  q.exports.transport = He();
  q.exports.multistream = gn();
  q.exports.levels = Ln();
  q.exports.stdSerializers = _f;
  q.exports.stdTimeFunctions = Object.assign({}, xn);
  q.exports.symbols = vn;
  q.exports.version = Xl;
  q.exports.default = dt;
  q.exports.pino = dt;
});
var Ef = An(),
  { once: Of } = require("events");
module.exports = async function (e = {}) {
  let t = Object.assign({}, e, { dest: e.destination || 1, sync: !1 });
  delete t.destination;
  let r = Ef.destination(t);
  return await Of(r, "ready"), r;
};
//# sourceMappingURL=pino-file.js.map
