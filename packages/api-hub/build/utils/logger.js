"use strict";
var Cn = Object.create;
var Z = Object.defineProperty;
var In = Object.getOwnPropertyDescriptor;
var qn = Object.getOwnPropertyNames;
var Nn = Object.getPrototypeOf,
  Dn = Object.prototype.hasOwnProperty;
var v = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  Pn = (e, t) => {
    for (var r in t) Z(e, r, { get: t[r], enumerable: !0 });
  },
  bt = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let i of qn(t))
        !Dn.call(e, i) &&
          i !== r &&
          Z(e, i, { get: () => t[i], enumerable: !(n = In(t, i)) || n.enumerable });
    return e;
  };
var zn = (e, t, r) => (
    (r = e != null ? Cn(Nn(e)) : {}),
    bt(t || !e || !e.__esModule ? Z(r, "default", { value: e, enumerable: !0 }) : r, e)
  ),
  Mn = (e) => bt(Z({}, "__esModule", { value: !0 }), e);
var _e = v((qf, _t) => {
  "use strict";
  var X = (e) => e && typeof e.message == "string",
    Se = (e) => {
      if (!e) return;
      let t = e.cause;
      if (typeof t == "function") {
        let r = e.cause();
        return X(r) ? r : void 0;
      } else return X(t) ? t : void 0;
    },
    wt = (e, t) => {
      if (!X(e)) return "";
      let r = e.stack || "";
      if (t.has(e))
        return (
          r +
          `
causes have become circular...`
        );
      let n = Se(e);
      return n
        ? (t.add(e),
          r +
            `
caused by: ` +
            wt(n, t))
        : r;
    },
    Wn = (e) => wt(e, new Set()),
    St = (e, t, r) => {
      if (!X(e)) return "";
      let n = r ? "" : e.message || "";
      if (t.has(e)) return n + ": ...";
      let i = Se(e);
      if (i) {
        t.add(e);
        let o = typeof e.cause == "function";
        return n + (o ? "" : ": ") + St(i, t, o);
      } else return n;
    },
    Vn = (e) => St(e, new Set());
  _t.exports = { isErrorLike: X, getErrorCause: Se, stackWithCauses: Wn, messageWithCauses: Vn };
});
var Ee = v((Nf, Ot) => {
  "use strict";
  var Fn = Symbol("circular-ref-tag"),
    ee = Symbol("pino-raw-err-ref"),
    Et = Object.create(
      {},
      {
        type: { enumerable: !0, writable: !0, value: void 0 },
        message: { enumerable: !0, writable: !0, value: void 0 },
        stack: { enumerable: !0, writable: !0, value: void 0 },
        aggregateErrors: { enumerable: !0, writable: !0, value: void 0 },
        raw: {
          enumerable: !1,
          get: function () {
            return this[ee];
          },
          set: function (e) {
            this[ee] = e;
          },
        },
      },
    );
  Object.defineProperty(Et, ee, { writable: !0, value: {} });
  Ot.exports = { pinoErrProto: Et, pinoErrorSymbols: { seen: Fn, rawSymbol: ee } };
});
var Lt = v((Df, vt) => {
  "use strict";
  vt.exports = xe;
  var { messageWithCauses: Kn, stackWithCauses: Jn, isErrorLike: xt } = _e(),
    { pinoErrProto: Un, pinoErrorSymbols: Gn } = Ee(),
    { seen: Oe } = Gn,
    { toString: Hn } = Object.prototype;
  function xe(e) {
    if (!xt(e)) return e;
    e[Oe] = void 0;
    let t = Object.create(Un);
    (t.type = Hn.call(e.constructor) === "[object Function]" ? e.constructor.name : e.name),
      (t.message = Kn(e)),
      (t.stack = Jn(e)),
      Array.isArray(e.errors) && (t.aggregateErrors = e.errors.map((r) => xe(r)));
    for (let r in e)
      if (t[r] === void 0) {
        let n = e[r];
        xt(n)
          ? r !== "cause" && !Object.prototype.hasOwnProperty.call(n, Oe) && (t[r] = xe(n))
          : (t[r] = n);
      }
    return delete e[Oe], (t.raw = e), t;
  }
});
var At = v((Pf, $t) => {
  "use strict";
  $t.exports = re;
  var { isErrorLike: ve } = _e(),
    { pinoErrProto: Xn, pinoErrorSymbols: Yn } = Ee(),
    { seen: te } = Yn,
    { toString: Qn } = Object.prototype;
  function re(e) {
    if (!ve(e)) return e;
    e[te] = void 0;
    let t = Object.create(Xn);
    (t.type = Qn.call(e.constructor) === "[object Function]" ? e.constructor.name : e.name),
      (t.message = e.message),
      (t.stack = e.stack),
      Array.isArray(e.errors) && (t.aggregateErrors = e.errors.map((r) => re(r))),
      ve(e.cause) && !Object.prototype.hasOwnProperty.call(e.cause, te) && (t.cause = re(e.cause));
    for (let r in e)
      if (t[r] === void 0) {
        let n = e[r];
        ve(n) ? Object.prototype.hasOwnProperty.call(n, te) || (t[r] = re(n)) : (t[r] = n);
      }
    return delete e[te], (t.raw = e), t;
  }
});
var kt = v((zf, Rt) => {
  "use strict";
  Rt.exports = { mapHttpRequest: Zn, reqSerializer: Tt };
  var Le = Symbol("pino-raw-req-ref"),
    jt = Object.create(
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
            return this[Le];
          },
          set: function (e) {
            this[Le] = e;
          },
        },
      },
    );
  Object.defineProperty(jt, Le, { writable: !0, value: {} });
  function Tt(e) {
    let t = e.info || e.socket,
      r = Object.create(jt);
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
  function Zn(e) {
    return { req: Tt(e) };
  }
});
var qt = v((Mf, It) => {
  "use strict";
  It.exports = { mapHttpResponse: ei, resSerializer: Ct };
  var $e = Symbol("pino-raw-res-ref"),
    Bt = Object.create(
      {},
      {
        statusCode: { enumerable: !0, writable: !0, value: 0 },
        headers: { enumerable: !0, writable: !0, value: "" },
        raw: {
          enumerable: !1,
          get: function () {
            return this[$e];
          },
          set: function (e) {
            this[$e] = e;
          },
        },
      },
    );
  Object.defineProperty(Bt, $e, { writable: !0, value: {} });
  function Ct(e) {
    let t = Object.create(Bt);
    return (
      (t.statusCode = e.headersSent ? e.statusCode : null),
      (t.headers = e.getHeaders ? e.getHeaders() : e._headers),
      (t.raw = e),
      t
    );
  }
  function ei(e) {
    return { res: Ct(e) };
  }
});
var je = v((Wf, Nt) => {
  "use strict";
  var Ae = Lt(),
    ti = At(),
    ne = kt(),
    ie = qt();
  Nt.exports = {
    err: Ae,
    errWithCause: ti,
    mapHttpRequest: ne.mapHttpRequest,
    mapHttpResponse: ie.mapHttpResponse,
    req: ne.reqSerializer,
    res: ie.resSerializer,
    wrapErrorSerializer: function (t) {
      return t === Ae
        ? t
        : function (n) {
            return t(Ae(n));
          };
    },
    wrapRequestSerializer: function (t) {
      return t === ne.reqSerializer
        ? t
        : function (n) {
            return t(ne.reqSerializer(n));
          };
    },
    wrapResponseSerializer: function (t) {
      return t === ie.resSerializer
        ? t
        : function (n) {
            return t(ie.resSerializer(n));
          };
    },
  };
});
var Te = v((Vf, Dt) => {
  "use strict";
  function ri(e, t) {
    return t;
  }
  Dt.exports = function () {
    let t = Error.prepareStackTrace;
    Error.prepareStackTrace = ri;
    let r = new Error().stack;
    if (((Error.prepareStackTrace = t), !Array.isArray(r))) return;
    let n = r.slice(2),
      i = [];
    for (let o of n) o && i.push(o.getFileName());
    return i;
  };
});
var zt = v((Ff, Pt) => {
  "use strict";
  Pt.exports = ni;
  function ni(e = {}) {
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
var se = v((Kf, Mt) => {
  "use strict";
  Mt.exports = /[^.[\]]+|\[((?:.)*?)\]/g;
});
var Vt = v((Jf, Wt) => {
  "use strict";
  var ii = se();
  Wt.exports = si;
  function si({ paths: e }) {
    let t = [];
    var r = 0;
    let n = e.reduce(function (i, o, f) {
      var h = o.match(ii).map((c) => c.replace(/'|"|`/g, ""));
      let d = o[0] === "[";
      h = h.map((c) => (c[0] === "[" ? c.substr(1, c.length - 2) : c));
      let g = h.indexOf("*");
      if (g > -1) {
        let c = h.slice(0, g),
          u = c.join("."),
          y = h.slice(g + 1, h.length),
          s = y.length > 0;
        r++, t.push({ before: c, beforeStr: u, after: y, nested: s });
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
var Kt = v((Uf, Ft) => {
  "use strict";
  var oi = se();
  Ft.exports = li;
  function li(
    { secret: e, serialize: t, wcLen: r, strict: n, isCensorFct: i, censorFctTakesPath: o },
    f,
  ) {
    let h = Function(
      "o",
      `
    if (typeof o !== 'object' || o == null) {
      ${ai(n, t)}
    }
    const { censor, secret } = this
    const originalSecret = {}
    const secretKeys = Object.keys(secret)
    for (var i = 0; i < secretKeys.length; i++) {
      originalSecret[secretKeys[i]] = secret[secretKeys[i]]
    }

    ${fi(e, i, o)}
    this.compileRestore()
    ${ui(r > 0, i, o)}
    this.secret = originalSecret
    ${ci(t)}
  `,
    ).bind(f);
    return (h.state = f), t === !1 && (h.restore = (d) => f.restore(d)), h;
  }
  function fi(e, t, r) {
    return Object.keys(e).map((n) => {
      let { escPath: i, leadingBracket: o, path: f } = e[n],
        h = o ? 1 : 0,
        d = o ? "" : ".",
        g = [];
      for (var c; (c = oi.exec(n)) !== null; ) {
        let [, l] = c,
          { index: b, input: p } = c;
        b > h && g.push(p.substring(0, b - (l ? 0 : 1)));
      }
      var u = g.map((l) => `o${d}${l}`).join(" && ");
      u.length === 0 ? (u += `o${d}${n} != null`) : (u += ` && o${d}${n} != null`);
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
      if (${u}) {
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
  function ui(e, t, r) {
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
  function ci(e) {
    return e === !1
      ? "return o"
      : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `;
  }
  function ai(e, t) {
    return e === !0
      ? "throw Error('fast-redact: primitives cannot be redacted')"
      : t === !1
        ? "return o"
        : "return this.serialize(o)";
  }
});
var ke = v((Gf, Gt) => {
  "use strict";
  Gt.exports = { groupRedact: di, groupRestore: hi, nestedRedact: gi, nestedRestore: yi };
  function hi({ keys: e, values: t, target: r }) {
    if (r == null || typeof r == "string") return;
    let n = e.length;
    for (var i = 0; i < n; i++) {
      let o = e[i];
      r[o] = t[i];
    }
  }
  function di(e, t, r, n, i) {
    let o = Jt(e, t);
    if (o == null || typeof o == "string") return { keys: null, values: null, target: o, flat: !0 };
    let f = Object.keys(o),
      h = f.length,
      d = t.length,
      g = i ? [...t] : void 0,
      c = new Array(h);
    for (var u = 0; u < h; u++) {
      let y = f[u];
      (c[u] = o[y]), i ? ((g[d] = y), (o[y] = r(o[y], g))) : n ? (o[y] = r(o[y])) : (o[y] = r);
    }
    return { keys: f, values: c, target: o, flat: !0 };
  }
  function yi(e) {
    for (let t = 0; t < e.length; t++) {
      let { target: r, path: n, value: i } = e[t],
        o = r;
      for (let f = n.length - 1; f > 0; f--) o = o[n[f]];
      o[n[0]] = i;
    }
  }
  function gi(e, t, r, n, i, o, f) {
    let h = Jt(t, r);
    if (h == null) return;
    let d = Object.keys(h),
      g = d.length;
    for (var c = 0; c < g; c++) {
      let u = d[c];
      mi(e, h, u, r, n, i, o, f);
    }
    return e;
  }
  function Re(e, t) {
    return e != null
      ? "hasOwn" in Object
        ? Object.hasOwn(e, t)
        : Object.prototype.hasOwnProperty.call(e, t)
      : !1;
  }
  function mi(e, t, r, n, i, o, f, h) {
    let d = i.length,
      g = d - 1,
      c = r;
    var u = -1,
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
      O = pi();
    if (((l = y = t[r]), typeof y == "object")) {
      for (
        ;
        y != null &&
        ++u < d &&
        ((E += 1), (r = i[u]), (b = l), !(r !== "*" && !p && !(typeof y == "object" && r in y)));

      )
        if (!(r === "*" && (p === "*" && (S = !0), (p = r), u !== g))) {
          if (p) {
            let x = Object.keys(y);
            for (var $ = 0; $ < x.length; $++) {
              let L = x[$];
              if (((m = y[L]), (w = r === "*"), S))
                (O = z(O, L, E)),
                  (_ = u),
                  (l = Ut(m, _ - 1, r, n, i, o, f, h, c, y, s, l, w, L, u, g, O, e, t[c], E + 1));
              else if (w || (typeof m == "object" && m !== null && r in m)) {
                if (
                  (w ? (l = m) : (l = m[r]),
                  (s = u !== g ? l : f ? (h ? o(l, [...n, c, ...i]) : o(l)) : o),
                  w)
                ) {
                  let j = Y(z(O, L, E), l, t[c]);
                  e.push(j), (y[L] = s);
                } else if (m[r] !== s)
                  if ((s === void 0 && o !== void 0) || (Re(m, r) && s === l)) O = z(O, L, E);
                  else {
                    O = z(O, L, E);
                    let j = Y(z(O, r, E + 1), l, t[c]);
                    e.push(j), (m[r] = s);
                  }
              }
            }
            p = null;
          } else {
            if (
              ((l = y[r]),
              (O = z(O, r, E)),
              (s = u !== g ? l : f ? (h ? o(l, [...n, c, ...i]) : o(l)) : o),
              !((Re(y, r) && s === l) || (s === void 0 && o !== void 0)))
            ) {
              let x = Y(O, l, t[c]);
              e.push(x), (y[r] = s);
            }
            y = y[r];
          }
          if (typeof y != "object") break;
        }
    }
  }
  function Jt(e, t) {
    for (var r = -1, n = t.length, i = e; i != null && ++r < n; ) i = i[t[r]];
    return i;
  }
  function Ut(e, t, r, n, i, o, f, h, d, g, c, u, y, s, l, b, p, w, m, S) {
    if (t === 0 && (y || (typeof e == "object" && e !== null && r in e))) {
      if (
        (y ? (u = e) : (u = e[r]),
        (c = l !== b ? u : f ? (h ? o(u, [...n, d, ...i]) : o(u)) : o),
        y)
      ) {
        let _ = Y(p, u, m);
        w.push(_), (g[s] = c);
      } else if (e[r] !== c) {
        if (!((c === void 0 && o !== void 0) || (Re(e, r) && c === u))) {
          let _ = Y(z(p, r, S + 1), u, m);
          w.push(_), (e[r] = c);
        }
      }
    }
    for (let _ in e)
      typeof e[_] == "object" &&
        ((p = z(p, _, S)),
        Ut(e[_], t - 1, r, n, i, o, f, h, d, g, c, u, y, s, l, b, p, w, m, S + 1));
  }
  function pi() {
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
var Xt = v((Hf, Ht) => {
  "use strict";
  var { groupRestore: bi, nestedRestore: wi } = ke();
  Ht.exports = Si;
  function Si() {
    return function () {
      if (this.restore) {
        this.restore.state.secret = this.secret;
        return;
      }
      let { secret: t, wcLen: r } = this,
        n = Object.keys(t),
        i = _i(t, n),
        o = r > 0,
        f = o ? { secret: t, groupRestore: bi, nestedRestore: wi } : { secret: t };
      (this.restore = Function("o", Ei(i, n, o)).bind(f)), (this.restore.state = f);
    };
  }
  function _i(e, t) {
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
  function Ei(e, t, r) {
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
var Qt = v((Xf, Yt) => {
  "use strict";
  Yt.exports = Oi;
  function Oi(e) {
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
var tr = v((Yf, er) => {
  "use strict";
  var Zt = zt(),
    xi = Vt(),
    vi = Kt(),
    Li = Xt(),
    { groupRedact: $i, nestedRedact: Ai } = ke(),
    ji = Qt(),
    Ti = se(),
    Ri = Zt(),
    Be = (e) => e;
  Be.restore = Be;
  var ki = "[REDACTED]";
  Ce.rx = Ti;
  Ce.validator = Zt;
  er.exports = Ce;
  function Ce(e = {}) {
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
    let i = n === !0 ? void 0 : "censor" in e ? e.censor : ki,
      o = typeof i == "function",
      f = o && i.length > 1;
    if (t.length === 0) return r || Be;
    Ri({ paths: t, serialize: r, censor: i });
    let { wildcards: h, wcLen: d, secret: g } = xi({ paths: t, censor: i }),
      c = Li(),
      u = "strict" in e ? e.strict : !0;
    return vi(
      { secret: g, wcLen: d, serialize: r, strict: u, isCensorFct: o, censorFctTakesPath: f },
      ji({
        secret: g,
        censor: i,
        compileRestore: c,
        serialize: r,
        groupRedact: $i,
        nestedRedact: Ai,
        wildcards: h,
        wcLen: d,
      }),
    );
  }
});
var U = v((Qf, rr) => {
  "use strict";
  var Bi = Symbol("pino.setLevel"),
    Ci = Symbol("pino.getLevel"),
    Ii = Symbol("pino.levelVal"),
    qi = Symbol("pino.levelComp"),
    Ni = Symbol("pino.useLevelLabels"),
    Di = Symbol("pino.useOnlyCustomLevels"),
    Pi = Symbol("pino.mixin"),
    zi = Symbol("pino.lsCache"),
    Mi = Symbol("pino.chindings"),
    Wi = Symbol("pino.asJson"),
    Vi = Symbol("pino.write"),
    Fi = Symbol("pino.redactFmt"),
    Ki = Symbol("pino.time"),
    Ji = Symbol("pino.timeSliceIndex"),
    Ui = Symbol("pino.stream"),
    Gi = Symbol("pino.stringify"),
    Hi = Symbol("pino.stringifySafe"),
    Xi = Symbol("pino.stringifiers"),
    Yi = Symbol("pino.end"),
    Qi = Symbol("pino.formatOpts"),
    Zi = Symbol("pino.messageKey"),
    es = Symbol("pino.errorKey"),
    ts = Symbol("pino.nestedKey"),
    rs = Symbol("pino.nestedKeyStr"),
    ns = Symbol("pino.mixinMergeStrategy"),
    is = Symbol("pino.msgPrefix"),
    ss = Symbol("pino.wildcardFirst"),
    os = Symbol.for("pino.serializers"),
    ls = Symbol.for("pino.formatters"),
    fs = Symbol.for("pino.hooks"),
    us = Symbol.for("pino.metadata");
  rr.exports = {
    setLevelSym: Bi,
    getLevelSym: Ci,
    levelValSym: Ii,
    levelCompSym: qi,
    useLevelLabelsSym: Ni,
    mixinSym: Pi,
    lsCacheSym: zi,
    chindingsSym: Mi,
    asJsonSym: Wi,
    writeSym: Vi,
    serializersSym: os,
    redactFmtSym: Fi,
    timeSym: Ki,
    timeSliceIndexSym: Ji,
    streamSym: Ui,
    stringifySym: Gi,
    stringifySafeSym: Hi,
    stringifiersSym: Xi,
    endSym: Yi,
    formatOptsSym: Qi,
    messageKeySym: Zi,
    errorKeySym: es,
    nestedKeySym: ts,
    wildcardFirstSym: ss,
    needsMetadataGsym: us,
    useOnlyCustomLevelsSym: Di,
    formattersSym: ls,
    hooksSym: fs,
    nestedKeyStrSym: rs,
    mixinMergeStrategySym: ns,
    msgPrefixSym: is,
  };
});
var Ne = v((Zf, or) => {
  "use strict";
  var qe = tr(),
    { redactFmtSym: cs, wildcardFirstSym: oe } = U(),
    { rx: Ie, validator: as } = qe,
    nr = as({
      ERR_PATHS_MUST_BE_STRINGS: () => "pino \u2013 redacted paths must be strings",
      ERR_INVALID_PATH: (e) => `pino \u2013 redact paths array contains an invalid path (${e})`,
    }),
    ir = "[Redacted]",
    sr = !1;
  function hs(e, t) {
    let { paths: r, censor: n } = ds(e),
      i = r.reduce((h, d) => {
        Ie.lastIndex = 0;
        let g = Ie.exec(d),
          c = Ie.exec(d),
          u = g[1] !== void 0 ? g[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, "$1") : g[0];
        if ((u === "*" && (u = oe), c === null)) return (h[u] = null), h;
        if (h[u] === null) return h;
        let { index: y } = c,
          s = `${d.substr(y, d.length - 1)}`;
        return (
          (h[u] = h[u] || []),
          u !== oe && h[u].length === 0 && h[u].push(...(h[oe] || [])),
          u === oe &&
            Object.keys(h).forEach(function (l) {
              h[l] && h[l].push(s);
            }),
          h[u].push(s),
          h
        );
      }, {}),
      o = { [cs]: qe({ paths: r, censor: n, serialize: t, strict: sr }) },
      f = (...h) => t(typeof n == "function" ? n(...h) : n);
    return [...Object.keys(i), ...Object.getOwnPropertySymbols(i)].reduce((h, d) => {
      if (i[d] === null) h[d] = (g) => f(g, [d]);
      else {
        let g = typeof n == "function" ? (c, u) => n(c, [d, ...u]) : n;
        h[d] = qe({ paths: i[d], censor: g, serialize: t, strict: sr });
      }
      return h;
    }, o);
  }
  function ds(e) {
    if (Array.isArray(e)) return (e = { paths: e, censor: ir }), nr(e), e;
    let { paths: t, censor: r = ir, remove: n } = e;
    if (Array.isArray(t) === !1) throw Error("pino \u2013 redact must contain an array of strings");
    return n === !0 && (r = void 0), nr({ paths: t, censor: r }), { paths: t, censor: r };
  }
  or.exports = hs;
});
var fr = v((eu, lr) => {
  "use strict";
  var ys = () => "",
    gs = () => `,"time":${Date.now()}`,
    ms = () => `,"time":${Math.round(Date.now() / 1e3)}`,
    ps = () => `,"time":"${new Date(Date.now()).toISOString()}"`;
  lr.exports = { nullTime: ys, epochTime: gs, unixTime: ms, isoTime: ps };
});
var cr = v((tu, ur) => {
  "use strict";
  function bs(e) {
    try {
      return JSON.stringify(e);
    } catch {
      return '"[Circular]"';
    }
  }
  ur.exports = ws;
  function ws(e, t, r) {
    var n = (r && r.stringify) || bs,
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
    for (var g = "", c = 1 - i, u = -1, y = (e && e.length) || 0, s = 0; s < y; ) {
      if (e.charCodeAt(s) === 37 && s + 1 < y) {
        switch (((u = u > -1 ? u : 0), e.charCodeAt(s + 1))) {
          case 100:
          case 102:
            if (c >= d || t[c] == null) break;
            u < s && (g += e.slice(u, s)), (g += Number(t[c])), (u = s + 2), s++;
            break;
          case 105:
            if (c >= d || t[c] == null) break;
            u < s && (g += e.slice(u, s)), (g += Math.floor(Number(t[c]))), (u = s + 2), s++;
            break;
          case 79:
          case 111:
          case 106:
            if (c >= d || t[c] === void 0) break;
            u < s && (g += e.slice(u, s));
            var l = typeof t[c];
            if (l === "string") {
              (g += "'" + t[c] + "'"), (u = s + 2), s++;
              break;
            }
            if (l === "function") {
              (g += t[c].name || "<anonymous>"), (u = s + 2), s++;
              break;
            }
            (g += n(t[c])), (u = s + 2), s++;
            break;
          case 115:
            if (c >= d) break;
            u < s && (g += e.slice(u, s)), (g += String(t[c])), (u = s + 2), s++;
            break;
          case 37:
            u < s && (g += e.slice(u, s)), (g += "%"), (u = s + 2), s++, c--;
            break;
        }
        ++c;
      }
      ++s;
    }
    return u === -1 ? e : (u < y && (g += e.slice(u)), g);
  }
});
var Pe = v((ru, De) => {
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
    De.exports = t;
  } else {
    let e = function (t) {
      if ((t > 0 && t < 1 / 0) === !1)
        throw typeof t != "number" && typeof t != "bigint"
          ? TypeError("sleep: ms must be a number")
          : RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
      let n = Date.now() + Number(t);
      for (; n > Date.now(); );
    };
    De.exports = e;
  }
});
var br = v((nu, pr) => {
  "use strict";
  var A = require("fs"),
    Ss = require("events"),
    _s = require("util").inherits,
    ar = require("path"),
    Me = Pe(),
    le = 100,
    fe = Buffer.allocUnsafe(0),
    Es = 16 * 1024,
    hr = "buffer",
    dr = "utf8";
  function yr(e, t) {
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
        t.mkdir && A.mkdirSync(ar.dirname(e), { recursive: !0 });
        let o = A.openSync(e, n, i);
        r(null, o);
      } catch (o) {
        throw (r(o), o);
      }
    else
      t.mkdir
        ? A.mkdir(ar.dirname(e), { recursive: !0 }, (o) => {
            if (o) return r(o);
            A.open(e, n, i, r);
          })
        : A.open(e, n, i, r);
  }
  function I(e) {
    if (!(this instanceof I)) return new I(e);
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
      fsync: c,
      contentMode: u,
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
      (this.maxWrite = o || Es),
      (this.sync = f || !1),
      (this.writable = !0),
      (this._fsync = c || !1),
      (this.append = h || !1),
      (this.mode = y),
      (this.retryEAGAIN = g || (() => !0)),
      (this.mkdir = d || !1);
    let s, l;
    if (u === hr)
      (this._writingBuf = fe),
        (this.write = vs),
        (this.flush = $s),
        (this.flushSync = js),
        (this._actualWrite = Rs),
        (s = () => A.writeSync(this.fd, this._writingBuf)),
        (l = () => A.write(this.fd, this._writingBuf, this.release));
    else if (u === void 0 || u === dr)
      (this._writingBuf = ""),
        (this.write = xs),
        (this.flush = Ls),
        (this.flushSync = As),
        (this._actualWrite = Ts),
        (s = () => A.writeSync(this.fd, this._writingBuf, "utf8")),
        (l = () => A.write(this.fd, this._writingBuf, "utf8", this.release));
    else throw new Error(`SonicBoom supports "${dr}" and "${hr}", but passed ${u}`);
    if (typeof t == "number") (this.fd = t), process.nextTick(() => this.emit("ready"));
    else if (typeof t == "string") yr(t, this);
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
              Me(le), this.release(void 0, 0);
            } catch (S) {
              this.release(S);
            }
          else setTimeout(l, le);
        else (this._writing = !1), this.emit("error", b);
        return;
      }
      this.emit("write", p);
      let w = ze(this._writingBuf, this._len, p);
      if (((this._len = w.len), (this._writingBuf = w.writingBuf), this._writingBuf.length)) {
        if (!this.sync) {
          l();
          return;
        }
        try {
          do {
            let S = s(),
              _ = ze(this._writingBuf, this._len, S);
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
              : ((this._writing = !1), ue(this))
            : ((this._writing = !1),
              this.sync
                ? this._asyncDrainScheduled ||
                  ((this._asyncDrainScheduled = !0), process.nextTick(Os, this))
                : this.emit("drain"));
    }),
      this.on("newListener", function (b) {
        b === "drain" && (this._asyncDrainScheduled = !1);
      });
  }
  function ze(e, t, r) {
    return (
      typeof e == "string" &&
        Buffer.byteLength(e) !== r &&
        (r = Buffer.from(e).subarray(0, r).toString().length),
      (t = Math.max(t - r, 0)),
      (e = e.slice(r)),
      { writingBuf: e, len: t }
    );
  }
  function Os(e) {
    e.listenerCount("drain") > 0 && ((e._asyncDrainScheduled = !1), e.emit("drain"));
  }
  _s(I, Ss);
  function gr(e, t) {
    return e.length === 0 ? fe : e.length === 1 ? e[0] : Buffer.concat(e, t);
  }
  function xs(e) {
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
  function vs(e) {
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
  function mr(e) {
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
  function Ls(e) {
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
    e && mr.call(this, e),
      !this._writing && (this._bufs.length === 0 && this._bufs.push(""), this._actualWrite());
  }
  function $s(e) {
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
    e && mr.call(this, e),
      !this._writing &&
        (this._bufs.length === 0 && (this._bufs.push([]), this._lens.push(0)), this._actualWrite());
  }
  I.prototype.reopen = function (e) {
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
      yr(this.file, this);
  };
  I.prototype.end = function () {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this._opening) {
      this.once("ready", () => {
        this.end();
      });
      return;
    }
    this._ending ||
      ((this._ending = !0),
      !this._writing && (this._len > 0 && this.fd >= 0 ? this._actualWrite() : ue(this)));
  };
  function As() {
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
          r = ze(e, this._len, t);
        (e = r.writingBuf), (this._len = r.len), e.length <= 0 && this._bufs.shift();
      } catch (t) {
        if (
          (t.code === "EAGAIN" || t.code === "EBUSY") &&
          !this.retryEAGAIN(t, e.length, this._len - e.length)
        )
          throw t;
        Me(le);
      }
    }
    try {
      A.fsyncSync(this.fd);
    } catch {}
  }
  function js() {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this.fd < 0) throw new Error("sonic boom is not ready yet");
    !this._writing &&
      this._writingBuf.length > 0 &&
      (this._bufs.unshift([this._writingBuf]), (this._writingBuf = fe));
    let e = fe;
    for (; this._bufs.length || e.length; ) {
      e.length <= 0 && (e = gr(this._bufs[0], this._lens[0]));
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
        Me(le);
      }
    }
  }
  I.prototype.destroy = function () {
    this.destroyed || ue(this);
  };
  function Ts() {
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
  function Rs() {
    let e = this.release;
    if (
      ((this._writing = !0),
      (this._writingBuf = this._writingBuf.length
        ? this._writingBuf
        : gr(this._bufs.shift(), this._lens.shift())),
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
  function ue(e) {
    if (e.fd === -1) {
      e.once("ready", ue.bind(null, e));
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
  I.SonicBoom = I;
  I.default = I;
  pr.exports = I;
});
var We = v((iu, Or) => {
  "use strict";
  var q = { exit: [], beforeExit: [] },
    wr = { exit: Cs, beforeExit: Is },
    G;
  function ks() {
    G === void 0 && (G = new FinalizationRegistry(qs));
  }
  function Bs(e) {
    q[e].length > 0 || process.on(e, wr[e]);
  }
  function Sr(e) {
    q[e].length > 0 ||
      (process.removeListener(e, wr[e]),
      q.exit.length === 0 && q.beforeExit.length === 0 && (G = void 0));
  }
  function Cs() {
    _r("exit");
  }
  function Is() {
    _r("beforeExit");
  }
  function _r(e) {
    for (let t of q[e]) {
      let r = t.deref(),
        n = t.fn;
      r !== void 0 && n(r, e);
    }
    q[e] = [];
  }
  function qs(e) {
    for (let t of ["exit", "beforeExit"]) {
      let r = q[t].indexOf(e);
      q[t].splice(r, r + 1), Sr(t);
    }
  }
  function Er(e, t, r) {
    if (t === void 0) throw new Error("the object can't be undefined");
    Bs(e);
    let n = new WeakRef(t);
    (n.fn = r), ks(), G.register(t, n), q[e].push(n);
  }
  function Ns(e, t) {
    Er("exit", e, t);
  }
  function Ds(e, t) {
    Er("beforeExit", e, t);
  }
  function Ps(e) {
    if (G !== void 0) {
      G.unregister(e);
      for (let t of ["exit", "beforeExit"])
        (q[t] = q[t].filter((r) => {
          let n = r.deref();
          return n && n !== e;
        })),
          Sr(t);
    }
  }
  Or.exports = { register: Ns, registerBeforeExit: Ds, unregister: Ps };
});
var xr = v((su, zs) => {
  zs.exports = {
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
var Lr = v((ou, vr) => {
  "use strict";
  function Ms(e, t, r, n, i) {
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
  function Ws(e, t, r, n, i) {
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
  vr.exports = { wait: Ms, waitDiff: Ws };
});
var Ar = v((lu, $r) => {
  "use strict";
  $r.exports = { WRITE_INDEX: 4, READ_INDEX: 8 };
});
var Br = v((fu, kr) => {
  "use strict";
  var { version: Vs } = xr(),
    { EventEmitter: Fs } = require("events"),
    { Worker: Ks } = require("worker_threads"),
    { join: Js } = require("path"),
    { pathToFileURL: Us } = require("url"),
    { wait: Gs } = Lr(),
    { WRITE_INDEX: k, READ_INDEX: N } = Ar(),
    Hs = require("buffer"),
    Xs = require("assert"),
    a = Symbol("kImpl"),
    Ys = Hs.constants.MAX_STRING_LENGTH,
    Q = class {
      constructor(t) {
        this._value = t;
      }
      deref() {
        return this._value;
      }
    },
    ae = class {
      register() {}
      unregister() {}
    },
    Qs = process.env.NODE_V8_COVERAGE ? ae : global.FinalizationRegistry || ae,
    Zs = process.env.NODE_V8_COVERAGE ? Q : global.WeakRef || Q,
    jr = new Qs((e) => {
      e.exited || e.terminate();
    });
  function eo(e, t) {
    let { filename: r, workerData: n } = t,
      o =
        ("__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {})[
          "thread-stream-worker"
        ] || Js(__dirname, "lib", "worker.js"),
      f = new Ks(o, {
        ...t.workerOpts,
        trackUnmanagedFds: !1,
        workerData: {
          filename: r.indexOf("file://") === 0 ? r : Us(r).href,
          dataBuf: e[a].dataBuf,
          stateBuf: e[a].stateBuf,
          workerData: { $context: { threadStreamVersion: Vs }, ...n },
        },
      });
    return (f.stream = new Q(e)), f.on("message", to), f.on("exit", Rr), jr.register(e, f), f;
  }
  function Tr(e) {
    Xs(!e[a].sync), e[a].needDrain && ((e[a].needDrain = !1), e.emit("drain"));
  }
  function ce(e) {
    let t = Atomics.load(e[a].state, k),
      r = e[a].data.length - t;
    if (r > 0) {
      if (e[a].buf.length === 0) {
        (e[a].flushing = !1), e[a].ending ? Ue(e) : e[a].needDrain && process.nextTick(Tr, e);
        return;
      }
      let n = e[a].buf.slice(0, r),
        i = Buffer.byteLength(n);
      i <= r
        ? ((e[a].buf = e[a].buf.slice(r)), he(e, n, ce.bind(null, e)))
        : e.flush(() => {
            if (!e.destroyed) {
              for (
                Atomics.store(e[a].state, N, 0), Atomics.store(e[a].state, k, 0);
                i > e[a].data.length;

              )
                (r = r / 2), (n = e[a].buf.slice(0, r)), (i = Buffer.byteLength(n));
              (e[a].buf = e[a].buf.slice(r)), he(e, n, ce.bind(null, e));
            }
          });
    } else if (r === 0) {
      if (t === 0 && e[a].buf.length === 0) return;
      e.flush(() => {
        Atomics.store(e[a].state, N, 0), Atomics.store(e[a].state, k, 0), ce(e);
      });
    } else D(e, new Error("overwritten"));
  }
  function to(e) {
    let t = this.stream.deref();
    if (t === void 0) {
      (this.exited = !0), this.terminate();
      return;
    }
    switch (e.code) {
      case "READY":
        (this.stream = new Zs(t)),
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
  function Rr(e) {
    let t = this.stream.deref();
    t !== void 0 &&
      (jr.unregister(t),
      (t.worker.exited = !0),
      t.worker.off("exit", Rr),
      D(t, e !== 0 ? new Error("the worker thread exited") : null));
  }
  var Fe = class extends Fs {
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
        (this.worker = eo(this, t)),
        this.on("message", (r, n) => {
          this.worker.postMessage(r, n);
        });
    }
    write(t) {
      if (this[a].destroyed) return Ke(this, new Error("the worker has exited")), !1;
      if (this[a].ending) return Ke(this, new Error("the worker is ending")), !1;
      if (this[a].flushing && this[a].buf.length + t.length >= Ys)
        try {
          Ve(this), (this[a].flushing = !0);
        } catch (r) {
          return D(this, r), !1;
        }
      if (((this[a].buf += t), this[a].sync))
        try {
          return Ve(this), !0;
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
      this[a].destroyed || ((this[a].ending = !0), Ue(this));
    }
    flush(t) {
      if (this[a].destroyed) {
        typeof t == "function" && process.nextTick(t, new Error("the worker has exited"));
        return;
      }
      let r = Atomics.load(this[a].state, k);
      Gs(this[a].state, N, r, 1 / 0, (n, i) => {
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
      this[a].destroyed || (Ve(this), Je(this));
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
  function Ke(e, t) {
    setImmediate(() => {
      e.emit("error", t);
    });
  }
  function D(e, t) {
    e[a].destroyed ||
      ((e[a].destroyed = !0),
      t && ((e[a].errored = t), Ke(e, t)),
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
  function he(e, t, r) {
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
  function Ue(e) {
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
  function Ve(e) {
    let t = () => {
      e[a].ending ? Ue(e) : e[a].needDrain && process.nextTick(Tr, e);
    };
    for (e[a].flushing = !1; e[a].buf.length !== 0; ) {
      let r = Atomics.load(e[a].state, k),
        n = e[a].data.length - r;
      if (n === 0) {
        Je(e), Atomics.store(e[a].state, N, 0), Atomics.store(e[a].state, k, 0);
        continue;
      } else if (n < 0) throw new Error("overwritten");
      let i = e[a].buf.slice(0, n),
        o = Buffer.byteLength(i);
      if (o <= n) (e[a].buf = e[a].buf.slice(n)), he(e, i, t);
      else {
        for (
          Je(e), Atomics.store(e[a].state, N, 0), Atomics.store(e[a].state, k, 0);
          o > e[a].buf.length;

        )
          (n = n / 2), (i = e[a].buf.slice(0, n)), (o = Buffer.byteLength(i));
        (e[a].buf = e[a].buf.slice(n)), he(e, i, t);
      }
    }
  }
  function Je(e) {
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
  kr.exports = Fe;
});
var Xe = v((uu, Cr) => {
  "use strict";
  var { createRequire: ro } = require("module"),
    no = Te(),
    { join: Ge, isAbsolute: io, sep: so } = require("path"),
    oo = Pe(),
    He = We(),
    lo = Br();
  function fo(e) {
    He.register(e, co),
      He.registerBeforeExit(e, ao),
      e.on("close", function () {
        He.unregister(e);
      });
  }
  function uo(e, t, r) {
    let n = new lo({ filename: e, workerData: t, workerOpts: r });
    n.on("ready", i),
      n.on("close", function () {
        process.removeListener("exit", o);
      }),
      process.on("exit", o);
    function i() {
      process.removeListener("exit", o), n.unref(), r.autoEnd !== !1 && fo(n);
    }
    function o() {
      n.closed || (n.flushSync(), oo(100), n.end());
    }
    return n;
  }
  function co(e) {
    e.ref(),
      e.flushSync(),
      e.end(),
      e.once("close", function () {
        e.unref();
      });
  }
  function ao(e) {
    e.flushSync();
  }
  function ho(e) {
    let { pipeline: t, targets: r, levels: n, dedupe: i, worker: o = {}, caller: f = no() } = e,
      h = { ...e.options },
      d = typeof f == "string" ? [f] : f,
      g = "__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {},
      c = e.target;
    if (c && r) throw new Error("only one of target or targets can be specified");
    return (
      r
        ? ((c = g["pino-worker"] || Ge(__dirname, "worker.js")),
          (h.targets = r.filter((y) => y.target).map((y) => ({ ...y, target: u(y.target) }))),
          (h.pipelines = r
            .filter((y) => y.pipeline)
            .map((y) => y.pipeline.map((s) => ({ ...s, level: y.level, target: u(s.target) })))))
        : t &&
          ((c = g["pino-worker"] || Ge(__dirname, "worker.js")),
          (h.pipelines = [t.map((y) => ({ ...y, target: u(y.target) }))])),
      n && (h.levels = n),
      i && (h.dedupe = i),
      (h.pinoWillSendConfig = !0),
      uo(u(c), h, o)
    );
    function u(y) {
      if (((y = g[y] || y), io(y) || y.indexOf("file://") === 0)) return y;
      if (y === "pino/file") return Ge(__dirname, "..", "file.js");
      let s;
      for (let l of d)
        try {
          let b = l === "node:repl" ? process.cwd() + so : l;
          s = ro(b).resolve(y);
          break;
        } catch {
          continue;
        }
      if (!s) throw new Error(`unable to determine transport target for "${y}"`);
      return s;
    }
  }
  Cr.exports = ho;
});
var ge = v((cu, Kr) => {
  "use strict";
  var Ir = cr(),
    { mapHttpRequest: yo, mapHttpResponse: go } = je(),
    Qe = br(),
    qr = We(),
    {
      lsCacheSym: mo,
      chindingsSym: Pr,
      writeSym: Nr,
      serializersSym: zr,
      formatOptsSym: Dr,
      endSym: po,
      stringifiersSym: Mr,
      stringifySym: Wr,
      stringifySafeSym: Ze,
      wildcardFirstSym: Vr,
      nestedKeySym: bo,
      formattersSym: Fr,
      messageKeySym: wo,
      errorKeySym: So,
      nestedKeyStrSym: _o,
      msgPrefixSym: de,
    } = U(),
    { isMainThread: Eo } = require("worker_threads"),
    Oo = Xe();
  function H() {}
  function xo(e, t) {
    if (!t) return r;
    return function (...i) {
      t.call(this, i, r, e);
    };
    function r(n, ...i) {
      if (typeof n == "object") {
        let o = n;
        n !== null &&
          (n.method && n.headers && n.socket
            ? (n = yo(n))
            : typeof n.setHeader == "function" && (n = go(n)));
        let f;
        o === null && i.length === 0 ? (f = [null]) : ((o = i.shift()), (f = i)),
          typeof this[de] == "string" && o !== void 0 && o !== null && (o = this[de] + o),
          this[Nr](n, Ir(o, f, this[Dr]), e);
      } else {
        let o = n === void 0 ? i.shift() : n;
        typeof this[de] == "string" && o !== void 0 && o !== null && (o = this[de] + o),
          this[Nr](null, Ir(o, i, this[Dr]), e);
      }
    }
  }
  function Ye(e) {
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
  function vo(e, t, r, n) {
    let i = this[Wr],
      o = this[Ze],
      f = this[Mr],
      h = this[po],
      d = this[Pr],
      g = this[zr],
      c = this[Fr],
      u = this[wo],
      y = this[So],
      s = this[mo][r] + n;
    s = s + d;
    let l;
    c.log && (e = c.log(e));
    let b = f[Vr],
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
            l = (S || Ye)(l);
            break;
          default:
            l = (S || i)(l, o);
        }
        if (l === void 0) continue;
        let _ = Ye(m);
        p += "," + _ + ":" + l;
      }
    let w = "";
    if (t !== void 0) {
      l = g[u] ? g[u](t) : t;
      let m = f[u] || b;
      switch (typeof l) {
        case "function":
          break;
        case "number":
          Number.isFinite(l) === !1 && (l = null);
        case "boolean":
          m && (l = m(l)), (w = ',"' + u + '":' + l);
          break;
        case "string":
          (l = (m || Ye)(l)), (w = ',"' + u + '":' + l);
          break;
        default:
          (l = (m || i)(l, o)), (w = ',"' + u + '":' + l);
      }
    }
    return this[bo] && p ? s + this[_o] + p.slice(1) + "}" + w + h : s + p + w + h;
  }
  function Lo(e, t) {
    let r,
      n = e[Pr],
      i = e[Wr],
      o = e[Ze],
      f = e[Mr],
      h = f[Vr],
      d = e[zr],
      g = e[Fr].bindings;
    t = g(t);
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
        if (((r = d[c] ? d[c](r) : r), (r = (f[c] || h || i)(r, o)), r === void 0)) continue;
        n += ',"' + c + '":' + r;
      }
    return n;
  }
  function $o(e) {
    return e.write !== e.constructor.prototype.write;
  }
  var Ao = process.env.NODE_V8_COVERAGE || process.env.V8_COVERAGE;
  function ye(e) {
    let t = new Qe(e);
    return (
      t.on("error", r),
      !Ao &&
        !e.sync &&
        Eo &&
        (qr.register(t, jo),
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
  function jo(e, t) {
    e.destroyed ||
      (t === "beforeExit"
        ? (e.flush(),
          e.on("drain", function () {
            e.end();
          }))
        : e.flushSync());
  }
  function To(e) {
    return function (r, n, i = {}, o) {
      if (typeof i == "string") (o = ye({ dest: i })), (i = {});
      else if (typeof o == "string") {
        if (i && i.transport)
          throw Error("only one of option.transport or stream can be specified");
        o = ye({ dest: o });
      } else if (i instanceof Qe || i.writable || i._writableState) (o = i), (i = {});
      else if (i.transport) {
        if (i.transport instanceof Qe || i.transport.writable || i.transport._writableState)
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
          (o = Oo({ caller: n, ...i.transport, levels: d }));
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
        o || ($o(process.stdout) ? (o = process.stdout) : (o = ye({ fd: process.stdout.fd || 1 }))),
        { opts: i, stream: o }
      );
    };
  }
  function Ro(e, t) {
    try {
      return JSON.stringify(e);
    } catch {
      try {
        return (t || this[Ze])(e);
      } catch {
        return '"[unable to serialize, circular reference is too complex to analyze]"';
      }
    }
  }
  function ko(e, t, r) {
    return { level: e, bindings: t, log: r };
  }
  function Bo(e) {
    let t = Number(e);
    return typeof e == "string" && Number.isFinite(t) ? t : e === void 0 ? 1 : e;
  }
  Kr.exports = {
    noop: H,
    buildSafeSonicBoom: ye,
    asChindings: Lo,
    asJson: vo,
    genLog: xo,
    createArgsNormalizer: To,
    stringify: Ro,
    buildFormatters: ko,
    normalizeDestFileDescriptor: Bo,
  };
});
var me = v((au, Jr) => {
  var Co = { trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60 },
    Io = { ASC: "ASC", DESC: "DESC" };
  Jr.exports = { DEFAULT_LEVELS: Co, SORTING_ORDER: Io };
});
var rt = v((hu, Xr) => {
  "use strict";
  var {
      lsCacheSym: qo,
      levelValSym: et,
      useOnlyCustomLevelsSym: No,
      streamSym: Do,
      formattersSym: Po,
      hooksSym: zo,
      levelCompSym: Ur,
    } = U(),
    { noop: Mo, genLog: W } = ge(),
    { DEFAULT_LEVELS: P, SORTING_ORDER: Gr } = me(),
    Hr = {
      fatal: (e) => {
        let t = W(P.fatal, e);
        return function (...r) {
          let n = this[Do];
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
    tt = Object.keys(P).reduce((e, t) => ((e[P[t]] = t), e), {}),
    Wo = Object.keys(tt).reduce((e, t) => ((e[t] = '{"level":' + Number(t)), e), {});
  function Vo(e) {
    let t = e[Po].level,
      { labels: r } = e.levels,
      n = {};
    for (let i in r) {
      let o = t(r[i], Number(i));
      n[i] = JSON.stringify(o).slice(0, -1);
    }
    return (e[qo] = n), e;
  }
  function Fo(e, t) {
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
  function Ko(e) {
    let { labels: t, values: r } = this.levels;
    if (typeof e == "number") {
      if (t[e] === void 0) throw Error("unknown level value" + e);
      e = t[e];
    }
    if (r[e] === void 0) throw Error("unknown level " + e);
    let n = this[et],
      i = (this[et] = r[e]),
      o = this[No],
      f = this[Ur],
      h = this[zo].logMethod;
    for (let d in r) {
      if (f(r[d], i) === !1) {
        this[d] = Mo;
        continue;
      }
      this[d] = Fo(d, o) ? Hr[d](h) : W(r[d], h);
    }
    this.emit("level-change", e, i, t[n], n, this);
  }
  function Jo(e) {
    let { levels: t, levelVal: r } = this;
    return t && t.labels ? t.labels[r] : "";
  }
  function Uo(e) {
    let { values: t } = this.levels,
      r = t[e];
    return r !== void 0 && this[Ur](r, this[et]);
  }
  function Go(e, t, r) {
    return e === Gr.DESC ? t <= r : t >= r;
  }
  function Ho(e) {
    return typeof e == "string" ? Go.bind(null, e) : e;
  }
  function Xo(e = null, t = !1) {
    let r = e ? Object.keys(e).reduce((o, f) => ((o[e[f]] = f), o), {}) : null,
      n = Object.assign(
        Object.create(Object.prototype, { Infinity: { value: "silent" } }),
        t ? null : tt,
        r,
      ),
      i = Object.assign(
        Object.create(Object.prototype, { silent: { value: 1 / 0 } }),
        t ? null : P,
        e,
      );
    return { labels: n, values: i };
  }
  function Yo(e, t, r) {
    if (typeof e == "number") {
      if (
        ![]
          .concat(
            Object.keys(t || {}).map((o) => t[o]),
            r ? [] : Object.keys(tt).map((o) => +o),
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
  function Qo(e, t) {
    let { labels: r, values: n } = e;
    for (let i in t) {
      if (i in n) throw Error("levels cannot be overridden");
      if (t[i] in r) throw Error("pre-existing level values cannot be used for new levels");
    }
  }
  function Zo(e) {
    if (typeof e != "function" && !(typeof e == "string" && Object.values(Gr).includes(e)))
      throw new Error('Levels comparison should be one of "ASC", "DESC" or "function" type');
  }
  Xr.exports = {
    initialLsCache: Wo,
    genLsCache: Vo,
    levelMethods: Hr,
    getLevel: Jo,
    setLevel: Ko,
    isLevelEnabled: Uo,
    mappings: Xo,
    assertNoLevelCollisions: Qo,
    assertDefaultLevelFound: Yo,
    genLevelComparison: Ho,
    assertLevelComparison: Zo,
  };
});
var nt = v((du, Yr) => {
  "use strict";
  Yr.exports = { version: "9.2.0" };
});
var un = v((gu, fn) => {
  "use strict";
  var { EventEmitter: el } = require("events"),
    {
      lsCacheSym: tl,
      levelValSym: rl,
      setLevelSym: st,
      getLevelSym: Qr,
      chindingsSym: ot,
      parsedChindingsSym: nl,
      mixinSym: il,
      asJsonSym: nn,
      writeSym: sl,
      mixinMergeStrategySym: ol,
      timeSym: ll,
      timeSliceIndexSym: fl,
      streamSym: sn,
      serializersSym: V,
      formattersSym: it,
      errorKeySym: ul,
      messageKeySym: cl,
      useOnlyCustomLevelsSym: al,
      needsMetadataGsym: hl,
      redactFmtSym: dl,
      stringifySym: yl,
      formatOptsSym: gl,
      stringifiersSym: ml,
      msgPrefixSym: Zr,
    } = U(),
    {
      getLevel: pl,
      setLevel: bl,
      isLevelEnabled: wl,
      mappings: Sl,
      initialLsCache: _l,
      genLsCache: El,
      assertNoLevelCollisions: Ol,
    } = rt(),
    { asChindings: on, asJson: xl, buildFormatters: en, stringify: tn } = ge(),
    { version: vl } = nt(),
    Ll = Ne(),
    $l = class {},
    ln = {
      constructor: $l,
      child: Al,
      bindings: jl,
      setBindings: Tl,
      flush: Cl,
      isLevelEnabled: wl,
      version: vl,
      get level() {
        return this[Qr]();
      },
      set level(e) {
        this[st](e);
      },
      get levelVal() {
        return this[rl];
      },
      set levelVal(e) {
        throw Error("levelVal is read-only");
      },
      [tl]: _l,
      [sl]: kl,
      [nn]: xl,
      [Qr]: pl,
      [st]: bl,
    };
  Object.setPrototypeOf(ln, el.prototype);
  fn.exports = function () {
    return Object.create(ln);
  };
  var rn = (e) => e;
  function Al(e, t) {
    if (!e) throw Error("missing bindings for child Pino");
    t = t || {};
    let r = this[V],
      n = this[it],
      i = Object.create(this);
    if (t.hasOwnProperty("serializers") === !0) {
      i[V] = Object.create(null);
      for (let c in r) i[V][c] = r[c];
      let d = Object.getOwnPropertySymbols(r);
      for (var o = 0; o < d.length; o++) {
        let c = d[o];
        i[V][c] = r[c];
      }
      for (let c in t.serializers) i[V][c] = t.serializers[c];
      let g = Object.getOwnPropertySymbols(t.serializers);
      for (var f = 0; f < g.length; f++) {
        let c = g[f];
        i[V][c] = t.serializers[c];
      }
    } else i[V] = r;
    if (t.hasOwnProperty("formatters")) {
      let { level: d, bindings: g, log: c } = t.formatters;
      i[it] = en(d || n.level, g || rn, c || n.log);
    } else i[it] = en(n.level, rn, n.log);
    if (
      (t.hasOwnProperty("customLevels") === !0 &&
        (Ol(this.levels, t.customLevels), (i.levels = Sl(t.customLevels, i[al])), El(i)),
      (typeof t.redact == "object" && t.redact !== null) || Array.isArray(t.redact))
    ) {
      i.redact = t.redact;
      let d = Ll(i.redact, tn),
        g = { stringify: d[dl] };
      (i[yl] = tn), (i[ml] = d), (i[gl] = g);
    }
    typeof t.msgPrefix == "string" && (i[Zr] = (this[Zr] || "") + t.msgPrefix), (i[ot] = on(i, e));
    let h = t.level || this.level;
    return i[st](h), this.onChild(i), i;
  }
  function jl() {
    let t = `{${this[ot].substr(1)}}`,
      r = JSON.parse(t);
    return delete r.pid, delete r.hostname, r;
  }
  function Tl(e) {
    let t = on(this, e);
    (this[ot] = t), delete this[nl];
  }
  function Rl(e, t) {
    return Object.assign(t, e);
  }
  function kl(e, t, r) {
    let n = this[ll](),
      i = this[il],
      o = this[ul],
      f = this[cl],
      h = this[ol] || Rl,
      d;
    e == null
      ? (d = {})
      : e instanceof Error
        ? ((d = { [o]: e }), t === void 0 && (t = e.message))
        : ((d = e), t === void 0 && e[f] === void 0 && e[o] && (t = e[o].message)),
      i && (d = h(d, i(d, r, this)));
    let g = this[nn](d, t, r, n),
      c = this[sn];
    c[hl] === !0 &&
      ((c.lastLevel = r),
      (c.lastObj = d),
      (c.lastMsg = t),
      (c.lastTime = n.slice(this[fl])),
      (c.lastLogger = this)),
      c.write(g);
  }
  function Bl() {}
  function Cl(e) {
    if (e != null && typeof e != "function") throw Error("callback must be a function");
    let t = this[sn];
    typeof t.flush == "function" ? t.flush(e || Bl) : e && e();
  }
});
var yn = v((ct, dn) => {
  "use strict";
  var { hasOwnProperty: pe } = Object.prototype,
    K = ut();
  K.configure = ut;
  K.stringify = K;
  K.default = K;
  ct.stringify = K;
  ct.configure = ut;
  dn.exports = K;
  var Il =
    /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
  function M(e) {
    return e.length < 5e3 && !Il.test(e) ? `"${e}"` : JSON.stringify(e);
  }
  function lt(e) {
    if (e.length > 200) return e.sort();
    for (let t = 1; t < e.length; t++) {
      let r = e[t],
        n = t;
      for (; n !== 0 && e[n - 1] > r; ) (e[n] = e[n - 1]), n--;
      e[n] = r;
    }
    return e;
  }
  var ql = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(Object.getPrototypeOf(new Int8Array())),
    Symbol.toStringTag,
  ).get;
  function ft(e) {
    return ql.call(e) !== void 0 && e.length !== 0;
  }
  function cn(e, t, r) {
    e.length < r && (r = e.length);
    let n = t === "," ? "" : " ",
      i = `"0":${n}${e[0]}`;
    for (let o = 1; o < r; o++) i += `${t}"${o}":${n}${e[o]}`;
    return i;
  }
  function Nl(e) {
    if (pe.call(e, "circularValue")) {
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
  function an(e, t) {
    let r;
    if (pe.call(e, t) && ((r = e[t]), typeof r != "boolean"))
      throw new TypeError(`The "${t}" argument must be of type boolean`);
    return r === void 0 ? !0 : r;
  }
  function hn(e, t) {
    let r;
    if (pe.call(e, t)) {
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
  function Dl(e) {
    let t = new Set();
    for (let r of e) (typeof r == "string" || typeof r == "number") && t.add(String(r));
    return t;
  }
  function Pl(e) {
    if (pe.call(e, "strict")) {
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
  function ut(e) {
    e = { ...e };
    let t = Pl(e);
    t &&
      (e.bigint === void 0 && (e.bigint = !1), "circularValue" in e || (e.circularValue = Error));
    let r = Nl(e),
      n = an(e, "bigint"),
      i = an(e, "deterministic"),
      o = hn(e, "maximumDepth"),
      f = hn(e, "maximumBreadth");
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
          i && !ft(m) && (O = lt(O)), l.push(m);
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
          ft(s) && ((E += cn(s, _, f)), (m = m.slice(s.length)), ($ -= s.length), (O = _)),
            i && (m = lt(m)),
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
    function c(y, s, l) {
      switch (typeof s) {
        case "string":
          return M(s);
        case "object": {
          if (s === null) return "null";
          if (typeof s.toJSON == "function") {
            if (((s = s.toJSON(y)), typeof s != "object")) return c(y, s, l);
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
              let $ = c(String(E), s[E], l);
              (b += $ !== void 0 ? $ : "null"), (b += ",");
            }
            let O = c(String(E), s[E], l);
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
          ft(s) && ((b += cn(s, ",", f)), (p = p.slice(s.length)), (S -= s.length), (m = ",")),
            i && (p = lt(p)),
            l.push(s);
          for (let _ = 0; _ < S; _++) {
            let E = p[_],
              O = c(E, s[E], l);
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
    function u(y, s, l) {
      if (arguments.length > 1) {
        let b = "";
        if (
          (typeof l == "number"
            ? (b = " ".repeat(Math.min(l, 10)))
            : typeof l == "string" && (b = l.slice(0, 10)),
          s != null)
        ) {
          if (typeof s == "function") return h("", { "": y }, [], s, b, "");
          if (Array.isArray(s)) return d("", y, [], Dl(s), b, "");
        }
        if (b.length !== 0) return g("", y, [], b, "");
      }
      return c("", y, []);
    }
    return u;
  }
});
var pn = v((mu, mn) => {
  "use strict";
  var at = Symbol.for("pino.metadata"),
    { DEFAULT_LEVELS: gn } = me(),
    zl = gn.info;
  function Ml(e, t) {
    let r = 0;
    (e = e || []), (t = t || { dedupe: !1 });
    let n = Object.create(gn);
    (n.silent = 1 / 0),
      t.levels &&
        typeof t.levels == "object" &&
        Object.keys(t.levels).forEach((u) => {
          n[u] = t.levels[u];
        });
    let i = {
      write: o,
      add: d,
      emit: f,
      flushSync: h,
      end: g,
      minLevel: 0,
      streams: [],
      clone: c,
      [at]: !0,
      streamLevels: n,
    };
    return Array.isArray(e) ? e.forEach(d, i) : d.call(i, e), (e = null), i;
    function o(u) {
      let y,
        s = this.lastLevel,
        { streams: l } = this,
        b = 0,
        p;
      for (let w = Vl(l.length, t.dedupe); Kl(w, l.length, t.dedupe); w = Fl(w, t.dedupe))
        if (((y = l[w]), y.level <= s)) {
          if (b !== 0 && b !== y.level) break;
          if (((p = y.stream), p[at])) {
            let { lastTime: m, lastMsg: S, lastObj: _, lastLogger: E } = this;
            (p.lastLevel = s),
              (p.lastTime = m),
              (p.lastMsg = S),
              (p.lastObj = _),
              (p.lastLogger = E);
          }
          p.write(u), t.dedupe && (b = y.level);
        } else if (!t.dedupe) break;
    }
    function f(...u) {
      for (let { stream: y } of this.streams) typeof y.emit == "function" && y.emit(...u);
    }
    function h() {
      for (let { stream: u } of this.streams) typeof u.flushSync == "function" && u.flushSync();
    }
    function d(u) {
      if (!u) return i;
      let y = typeof u.write == "function" || u.stream,
        s = u.write ? u : u.stream;
      if (!y)
        throw Error(
          "stream object needs to implement either StreamEntry or DestinationStream interface",
        );
      let { streams: l, streamLevels: b } = this,
        p;
      typeof u.levelVal == "number"
        ? (p = u.levelVal)
        : typeof u.level == "string"
          ? (p = b[u.level])
          : typeof u.level == "number"
            ? (p = u.level)
            : (p = zl);
      let w = { stream: s, level: p, levelVal: void 0, id: r++ };
      return l.unshift(w), l.sort(Wl), (this.minLevel = l[0].level), i;
    }
    function g() {
      for (let { stream: u } of this.streams)
        typeof u.flushSync == "function" && u.flushSync(), u.end();
    }
    function c(u) {
      let y = new Array(this.streams.length);
      for (let s = 0; s < y.length; s++) y[s] = { level: u, stream: this.streams[s].stream };
      return {
        write: o,
        add: d,
        minLevel: u,
        streams: y,
        clone: c,
        emit: f,
        flushSync: h,
        [at]: !0,
      };
    }
  }
  function Wl(e, t) {
    return e.level - t.level;
  }
  function Vl(e, t) {
    return t ? e - 1 : 0;
  }
  function Fl(e, t) {
    return t ? e - 1 : e + 1;
  }
  function Kl(e, t, r) {
    return r ? e >= 0 : e < t;
  }
  mn.exports = Ml;
});
var Tn = v((pu, C) => {
  function be(e) {
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
    "thread-stream-worker": be("./thread-stream-worker.js"),
    "pino-worker": be("./pino-worker.js"),
    "pino/file": be("./pino-file.js"),
    "pino-pretty": be("./pino-pretty.js"),
  };
  var Jl = require("os"),
    vn = je(),
    Ul = Te(),
    Gl = Ne(),
    Ln = fr(),
    Hl = un(),
    $n = U(),
    { configure: Xl } = yn(),
    {
      assertDefaultLevelFound: Yl,
      mappings: An,
      genLsCache: Ql,
      genLevelComparison: Zl,
      assertLevelComparison: ef,
    } = rt(),
    { DEFAULT_LEVELS: tf, SORTING_ORDER: rf } = me(),
    {
      createArgsNormalizer: nf,
      asChindings: sf,
      buildSafeSonicBoom: bn,
      buildFormatters: of,
      stringify: ht,
      normalizeDestFileDescriptor: wn,
      noop: lf,
    } = ge(),
    { version: ff } = nt(),
    {
      chindingsSym: Sn,
      redactFmtSym: uf,
      serializersSym: _n,
      timeSym: cf,
      timeSliceIndexSym: af,
      streamSym: hf,
      stringifySym: En,
      stringifySafeSym: dt,
      stringifiersSym: On,
      setLevelSym: df,
      endSym: yf,
      formatOptsSym: gf,
      messageKeySym: mf,
      errorKeySym: pf,
      nestedKeySym: bf,
      mixinSym: wf,
      levelCompSym: Sf,
      useOnlyCustomLevelsSym: _f,
      formattersSym: xn,
      hooksSym: Ef,
      nestedKeyStrSym: Of,
      mixinMergeStrategySym: xf,
      msgPrefixSym: vf,
    } = $n,
    { epochTime: jn, nullTime: Lf } = Ln,
    { pid: $f } = process,
    Af = Jl.hostname(),
    jf = vn.err,
    Tf = {
      level: "info",
      levelComparison: rf.ASC,
      levels: tf,
      messageKey: "msg",
      errorKey: "err",
      nestedKey: null,
      enabled: !0,
      base: { pid: $f, hostname: Af },
      serializers: Object.assign(Object.create(null), { err: jf }),
      formatters: Object.assign(Object.create(null), {
        bindings(e) {
          return e;
        },
        level(e, t) {
          return { level: t };
        },
      }),
      hooks: { logMethod: void 0 },
      timestamp: jn,
      name: void 0,
      redact: null,
      customLevels: null,
      useOnlyCustomLevels: !1,
      depthLimit: 5,
      edgeLimit: 100,
    },
    Rf = nf(Tf),
    kf = Object.assign(Object.create(null), vn);
  function yt(...e) {
    let t = {},
      { opts: r, stream: n } = Rf(t, Ul(), ...e),
      {
        redact: i,
        crlf: o,
        serializers: f,
        timestamp: h,
        messageKey: d,
        errorKey: g,
        nestedKey: c,
        base: u,
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
      L = Xl({ maximumDepth: E, maximumBreadth: O }),
      j = of(S.level, S.bindings, S.log),
      T = ht.bind({ [dt]: L }),
      R = i ? Gl(i, T) : {},
      B = i ? { stringify: R[uf] } : { stringify: T },
      J =
        "}" +
        (o
          ? `\r
`
          : `
`),
      gt = sf.bind(null, { [Sn]: "", [_n]: f, [On]: R, [En]: ht, [dt]: L, [xn]: j }),
      we = "";
    u !== null && (y === void 0 ? (we = gt(u)) : (we = gt(Object.assign({}, u, { name: y }))));
    let mt = h instanceof Function ? h : h ? jn : Lf,
      kn = mt().indexOf(":") + 1;
    if (m && !l) throw Error("customLevels is required if useOnlyCustomLevels is set true");
    if (p && typeof p != "function")
      throw Error(`Unknown mixin type "${typeof p}" - expected "function"`);
    if (x && typeof x != "string")
      throw Error(`Unknown msgPrefix type "${typeof x}" - expected "string"`);
    Yl(s, l, m);
    let pt = An(l, m);
    typeof n.emit == "function" &&
      n.emit("message", {
        code: "PINO_CONFIG",
        config: { levels: pt, messageKey: d, errorKey: g },
      }),
      ef(b);
    let Bn = Zl(b);
    return (
      Object.assign(t, {
        levels: pt,
        [Sf]: Bn,
        [_f]: m,
        [hf]: n,
        [cf]: mt,
        [af]: kn,
        [En]: ht,
        [dt]: L,
        [On]: R,
        [yf]: J,
        [gf]: B,
        [mf]: d,
        [pf]: g,
        [bf]: c,
        [Of]: c ? `,${JSON.stringify(c)}:{` : "",
        [_n]: f,
        [wf]: p,
        [xf]: w,
        [Sn]: we,
        [xn]: j,
        [Ef]: _,
        silent: lf,
        onChild: $,
        [vf]: x,
      }),
      Object.setPrototypeOf(t, Hl()),
      Ql(t),
      t[df](s),
      t
    );
  }
  C.exports = yt;
  C.exports.destination = (e = process.stdout.fd) =>
    typeof e == "object"
      ? ((e.dest = wn(e.dest || process.stdout.fd)), bn(e))
      : bn({ dest: wn(e), minLength: 0 });
  C.exports.transport = Xe();
  C.exports.multistream = pn();
  C.exports.levels = An();
  C.exports.stdSerializers = kf;
  C.exports.stdTimeFunctions = Object.assign({}, Ln);
  C.exports.symbols = $n;
  C.exports.version = ff;
  C.exports.default = yt;
  C.exports.pino = yt;
});
var Cf = {};
Pn(Cf, { logger: () => Bf });
module.exports = Mn(Cf);
var Rn = zn(Tn()),
  Bf = (0, Rn.default)({ transport: { target: "pino-pretty" } });
0 && (module.exports = { logger });
//# sourceMappingURL=logger.js.map
