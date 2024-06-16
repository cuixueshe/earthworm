"use strict";
var E = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var _r = E((E_, Ii) => {
  "use strict";
  var et = (e) => e && typeof e.message == "string",
    mr = (e) => {
      if (!e) return;
      let t = e.cause;
      if (typeof t == "function") {
        let r = e.cause();
        return et(r) ? r : void 0;
      } else return et(t) ? t : void 0;
    },
    Li = (e, t) => {
      if (!et(e)) return "";
      let r = e.stack || "";
      if (t.has(e))
        return (
          r +
          `
causes have become circular...`
        );
      let n = mr(e);
      return n
        ? (t.add(e),
          r +
            `
caused by: ` +
            Li(n, t))
        : r;
    },
    oa = (e) => Li(e, new Set()),
    ki = (e, t, r) => {
      if (!et(e)) return "";
      let n = r ? "" : e.message || "";
      if (t.has(e)) return n + ": ...";
      let i = mr(e);
      if (i) {
        t.add(e);
        let o = typeof e.cause == "function";
        return n + (o ? "" : ": ") + ki(i, t, o);
      } else return n;
    },
    sa = (e) => ki(e, new Set());
  Ii.exports = { isErrorLike: et, getErrorCause: mr, stackWithCauses: oa, messageWithCauses: sa };
});
var Sr = E((R_, Pi) => {
  "use strict";
  var la = Symbol("circular-ref-tag"),
    _t = Symbol("pino-raw-err-ref"),
    Di = Object.create(
      {},
      {
        type: { enumerable: !0, writable: !0, value: void 0 },
        message: { enumerable: !0, writable: !0, value: void 0 },
        stack: { enumerable: !0, writable: !0, value: void 0 },
        aggregateErrors: { enumerable: !0, writable: !0, value: void 0 },
        raw: {
          enumerable: !1,
          get: function () {
            return this[_t];
          },
          set: function (e) {
            this[_t] = e;
          },
        },
      },
    );
  Object.defineProperty(Di, _t, { writable: !0, value: {} });
  Pi.exports = { pinoErrProto: Di, pinoErrorSymbols: { seen: la, rawSymbol: _t } };
});
var Ni = E((A_, ji) => {
  "use strict";
  ji.exports = Rr;
  var { messageWithCauses: fa, stackWithCauses: ua, isErrorLike: qi } = _r(),
    { pinoErrProto: aa, pinoErrorSymbols: ca } = Sr(),
    { seen: Er } = ca,
    { toString: da } = Object.prototype;
  function Rr(e) {
    if (!qi(e)) return e;
    e[Er] = void 0;
    let t = Object.create(aa);
    (t.type = da.call(e.constructor) === "[object Function]" ? e.constructor.name : e.name),
      (t.message = fa(e)),
      (t.stack = ua(e)),
      Array.isArray(e.errors) && (t.aggregateErrors = e.errors.map((r) => Rr(r)));
    for (let r in e)
      if (t[r] === void 0) {
        let n = e[r];
        qi(n)
          ? r !== "cause" && !Object.prototype.hasOwnProperty.call(n, Er) && (t[r] = Rr(n))
          : (t[r] = n);
      }
    return delete e[Er], (t.raw = e), t;
  }
});
var $i = E((x_, Mi) => {
  "use strict";
  Mi.exports = Et;
  var { isErrorLike: Ar } = _r(),
    { pinoErrProto: ha, pinoErrorSymbols: pa } = Sr(),
    { seen: St } = pa,
    { toString: ya } = Object.prototype;
  function Et(e) {
    if (!Ar(e)) return e;
    e[St] = void 0;
    let t = Object.create(ha);
    (t.type = ya.call(e.constructor) === "[object Function]" ? e.constructor.name : e.name),
      (t.message = e.message),
      (t.stack = e.stack),
      Array.isArray(e.errors) && (t.aggregateErrors = e.errors.map((r) => Et(r))),
      Ar(e.cause) && !Object.prototype.hasOwnProperty.call(e.cause, St) && (t.cause = Et(e.cause));
    for (let r in e)
      if (t[r] === void 0) {
        let n = e[r];
        Ar(n) ? Object.prototype.hasOwnProperty.call(n, St) || (t[r] = Et(n)) : (t[r] = n);
      }
    return delete e[St], (t.raw = e), t;
  }
});
var Fi = E((T_, Bi) => {
  "use strict";
  Bi.exports = { mapHttpRequest: ba, reqSerializer: Wi };
  var xr = Symbol("pino-raw-req-ref"),
    Ci = Object.create(
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
            return this[xr];
          },
          set: function (e) {
            this[xr] = e;
          },
        },
      },
    );
  Object.defineProperty(Ci, xr, { writable: !0, value: {} });
  function Wi(e) {
    let t = e.info || e.socket,
      r = Object.create(Ci);
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
  function ba(e) {
    return { req: Wi(e) };
  }
});
var zi = E((O_, Gi) => {
  "use strict";
  Gi.exports = { mapHttpResponse: ga, resSerializer: Vi };
  var Tr = Symbol("pino-raw-res-ref"),
    Ui = Object.create(
      {},
      {
        statusCode: { enumerable: !0, writable: !0, value: 0 },
        headers: { enumerable: !0, writable: !0, value: "" },
        raw: {
          enumerable: !1,
          get: function () {
            return this[Tr];
          },
          set: function (e) {
            this[Tr] = e;
          },
        },
      },
    );
  Object.defineProperty(Ui, Tr, { writable: !0, value: {} });
  function Vi(e) {
    let t = Object.create(Ui);
    return (
      (t.statusCode = e.headersSent ? e.statusCode : null),
      (t.headers = e.getHeaders ? e.getHeaders() : e._headers),
      (t.raw = e),
      t
    );
  }
  function ga(e) {
    return { res: Vi(e) };
  }
});
var vr = E((v_, Hi) => {
  "use strict";
  var Or = Ni(),
    wa = $i(),
    Rt = Fi(),
    At = zi();
  Hi.exports = {
    err: Or,
    errWithCause: wa,
    mapHttpRequest: Rt.mapHttpRequest,
    mapHttpResponse: At.mapHttpResponse,
    req: Rt.reqSerializer,
    res: At.resSerializer,
    wrapErrorSerializer: function (t) {
      return t === Or
        ? t
        : function (n) {
            return t(Or(n));
          };
    },
    wrapRequestSerializer: function (t) {
      return t === Rt.reqSerializer
        ? t
        : function (n) {
            return t(Rt.reqSerializer(n));
          };
    },
    wrapResponseSerializer: function (t) {
      return t === At.resSerializer
        ? t
        : function (n) {
            return t(At.resSerializer(n));
          };
    },
  };
});
var Lr = E((L_, Ki) => {
  "use strict";
  function ma(e, t) {
    return t;
  }
  Ki.exports = function () {
    let t = Error.prepareStackTrace;
    Error.prepareStackTrace = ma;
    let r = new Error().stack;
    if (((Error.prepareStackTrace = t), !Array.isArray(r))) return;
    let n = r.slice(2),
      i = [];
    for (let o of n) o && i.push(o.getFileName());
    return i;
  };
});
var Yi = E((k_, Ji) => {
  "use strict";
  Ji.exports = _a;
  function _a(e = {}) {
    let {
      ERR_PATHS_MUST_BE_STRINGS: t = () => "fast-redact - Paths must be (non-empty) strings",
      ERR_INVALID_PATH: r = (n) => `fast-redact \u2013 Invalid path (${n})`,
    } = e;
    return function ({ paths: i }) {
      i.forEach((o) => {
        if (typeof o != "string") throw Error(t());
        try {
          if (/〇/.test(o)) throw Error();
          let s =
            (o[0] === "[" ? "" : ".") +
            o
              .replace(/^\*/, "\u3007")
              .replace(/\.\*/g, ".\u3007")
              .replace(/\[\*\]/g, "[\u3007]");
          if (/\n|\r|;/.test(s) || /\/\*/.test(s)) throw Error();
          Function(`
            'use strict'
            const o = new Proxy({}, { get: () => o, set: () => { throw Error() } });
            const \u3007 = null;
            o${s}
            if ([o${s}].length !== 1) throw Error()`)();
        } catch {
          throw Error(r(o));
        }
      });
    };
  }
});
var xt = E((I_, Xi) => {
  "use strict";
  Xi.exports = /[^.[\]]+|\[((?:.)*?)\]/g;
});
var Zi = E((D_, Qi) => {
  "use strict";
  var Sa = xt();
  Qi.exports = Ea;
  function Ea({ paths: e }) {
    let t = [];
    var r = 0;
    let n = e.reduce(function (i, o, s) {
      var f = o.match(Sa).map((a) => a.replace(/'|"|`/g, ""));
      let c = o[0] === "[";
      f = f.map((a) => (a[0] === "[" ? a.substr(1, a.length - 2) : a));
      let u = f.indexOf("*");
      if (u > -1) {
        let a = f.slice(0, u),
          d = a.join("."),
          p = f.slice(u + 1, f.length),
          l = p.length > 0;
        r++, t.push({ before: a, beforeStr: d, after: p, nested: l });
      } else
        i[o] = {
          path: f,
          val: void 0,
          precensored: !1,
          circle: "",
          escPath: JSON.stringify(o),
          leadingBracket: c,
        };
      return i;
    }, {});
    return { wildcards: t, wcLen: r, secret: n };
  }
});
var to = E((P_, eo) => {
  "use strict";
  var Ra = xt();
  eo.exports = Aa;
  function Aa(
    { secret: e, serialize: t, wcLen: r, strict: n, isCensorFct: i, censorFctTakesPath: o },
    s,
  ) {
    let f = Function(
      "o",
      `
    if (typeof o !== 'object' || o == null) {
      ${va(n, t)}
    }
    const { censor, secret } = this
    const originalSecret = {}
    const secretKeys = Object.keys(secret)
    for (var i = 0; i < secretKeys.length; i++) {
      originalSecret[secretKeys[i]] = secret[secretKeys[i]]
    }

    ${xa(e, i, o)}
    this.compileRestore()
    ${Ta(r > 0, i, o)}
    this.secret = originalSecret
    ${Oa(t)}
  `,
    ).bind(s);
    return (f.state = s), t === !1 && (f.restore = (c) => s.restore(c)), f;
  }
  function xa(e, t, r) {
    return Object.keys(e).map((n) => {
      let { escPath: i, leadingBracket: o, path: s } = e[n],
        f = o ? 1 : 0,
        c = o ? "" : ".",
        u = [];
      for (var a; (a = Ra.exec(n)) !== null; ) {
        let [, h] = a,
          { index: y, input: w } = a;
        y > f && u.push(w.substring(0, y - (h ? 0 : 1)));
      }
      var d = u.map((h) => `o${c}${h}`).join(" && ");
      d.length === 0 ? (d += `o${c}${n} != null`) : (d += ` && o${c}${n} != null`);
      let p = `
      switch (true) {
        ${u.reverse().map(
          (h) => `
          case o${c}${h} === censor:
            secret[${i}].circle = ${JSON.stringify(h)}
            break
        `,
        ).join(`
`)}
      }
    `,
        l = r ? `val, ${JSON.stringify(s)}` : "val";
      return `
      if (${d}) {
        const val = o${c}${n}
        if (val === censor) {
          secret[${i}].precensored = true
        } else {
          secret[${i}].val = val
          o${c}${n} = ${t ? `censor(${l})` : "censor"}
          ${p}
        }
      }
    `;
    }).join(`
`);
  }
  function Ta(e, t, r) {
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
  function Oa(e) {
    return e === !1
      ? "return o"
      : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `;
  }
  function va(e, t) {
    return e === !0
      ? "throw Error('fast-redact: primitives cannot be redacted')"
      : t === !1
        ? "return o"
        : "return this.serialize(o)";
  }
});
var Ir = E((q_, io) => {
  "use strict";
  io.exports = { groupRedact: ka, groupRestore: La, nestedRedact: Da, nestedRestore: Ia };
  function La({ keys: e, values: t, target: r }) {
    if (r == null || typeof r == "string") return;
    let n = e.length;
    for (var i = 0; i < n; i++) {
      let o = e[i];
      r[o] = t[i];
    }
  }
  function ka(e, t, r, n, i) {
    let o = ro(e, t);
    if (o == null || typeof o == "string") return { keys: null, values: null, target: o, flat: !0 };
    let s = Object.keys(o),
      f = s.length,
      c = t.length,
      u = i ? [...t] : void 0,
      a = new Array(f);
    for (var d = 0; d < f; d++) {
      let p = s[d];
      (a[d] = o[p]), i ? ((u[c] = p), (o[p] = r(o[p], u))) : n ? (o[p] = r(o[p])) : (o[p] = r);
    }
    return { keys: s, values: a, target: o, flat: !0 };
  }
  function Ia(e) {
    for (let t = 0; t < e.length; t++) {
      let { target: r, path: n, value: i } = e[t],
        o = r;
      for (let s = n.length - 1; s > 0; s--) o = o[n[s]];
      o[n[0]] = i;
    }
  }
  function Da(e, t, r, n, i, o, s) {
    let f = ro(t, r);
    if (f == null) return;
    let c = Object.keys(f),
      u = c.length;
    for (var a = 0; a < u; a++) {
      let d = c[a];
      Pa(e, f, d, r, n, i, o, s);
    }
    return e;
  }
  function kr(e, t) {
    return e != null
      ? "hasOwn" in Object
        ? Object.hasOwn(e, t)
        : Object.prototype.hasOwnProperty.call(e, t)
      : !1;
  }
  function Pa(e, t, r, n, i, o, s, f) {
    let c = i.length,
      u = c - 1,
      a = r;
    var d = -1,
      p,
      l,
      h,
      y = null,
      w = null,
      m,
      g,
      S = !1,
      _ = 0,
      R = 0,
      A = qa();
    if (((h = p = t[r]), typeof p == "object")) {
      for (
        ;
        p != null &&
        ++d < c &&
        ((R += 1), (r = i[d]), (y = h), !(r !== "*" && !w && !(typeof p == "object" && r in p)));

      )
        if (!(r === "*" && (w === "*" && (S = !0), (w = r), d !== u))) {
          if (w) {
            let x = Object.keys(p);
            for (var v = 0; v < x.length; v++) {
              let T = x[v];
              if (((g = p[T]), (m = r === "*"), S))
                (A = ue(A, T, R)),
                  (_ = d),
                  (h = no(g, _ - 1, r, n, i, o, s, f, a, p, l, h, m, T, d, u, A, e, t[a], R + 1));
              else if (m || (typeof g == "object" && g !== null && r in g)) {
                if (
                  (m ? (h = g) : (h = g[r]),
                  (l = d !== u ? h : s ? (f ? o(h, [...n, a, ...i]) : o(h)) : o),
                  m)
                ) {
                  let I = tt(ue(A, T, R), h, t[a]);
                  e.push(I), (p[T] = l);
                } else if (g[r] !== l)
                  if ((l === void 0 && o !== void 0) || (kr(g, r) && l === h)) A = ue(A, T, R);
                  else {
                    A = ue(A, T, R);
                    let I = tt(ue(A, r, R + 1), h, t[a]);
                    e.push(I), (g[r] = l);
                  }
              }
            }
            w = null;
          } else {
            if (
              ((h = p[r]),
              (A = ue(A, r, R)),
              (l = d !== u ? h : s ? (f ? o(h, [...n, a, ...i]) : o(h)) : o),
              !((kr(p, r) && l === h) || (l === void 0 && o !== void 0)))
            ) {
              let x = tt(A, h, t[a]);
              e.push(x), (p[r] = l);
            }
            p = p[r];
          }
          if (typeof p != "object") break;
        }
    }
  }
  function ro(e, t) {
    for (var r = -1, n = t.length, i = e; i != null && ++r < n; ) i = i[t[r]];
    return i;
  }
  function no(e, t, r, n, i, o, s, f, c, u, a, d, p, l, h, y, w, m, g, S) {
    if (t === 0 && (p || (typeof e == "object" && e !== null && r in e))) {
      if (
        (p ? (d = e) : (d = e[r]),
        (a = h !== y ? d : s ? (f ? o(d, [...n, c, ...i]) : o(d)) : o),
        p)
      ) {
        let _ = tt(w, d, g);
        m.push(_), (u[l] = a);
      } else if (e[r] !== a) {
        if (!((a === void 0 && o !== void 0) || (kr(e, r) && a === d))) {
          let _ = tt(ue(w, r, S + 1), d, g);
          m.push(_), (e[r] = a);
        }
      }
    }
    for (let _ in e)
      typeof e[_] == "object" &&
        ((w = ue(w, _, S)),
        no(e[_], t - 1, r, n, i, o, s, f, c, u, a, d, p, l, h, y, w, m, g, S + 1));
  }
  function qa() {
    return { parent: null, key: null, children: [], depth: 0 };
  }
  function ue(e, t, r) {
    if (e.depth === r) return ue(e.parent, t, r);
    var n = { parent: e, key: t, depth: r, children: [] };
    return e.children.push(n), n;
  }
  function tt(e, t, r) {
    let n = e,
      i = [];
    do i.push(n.key), (n = n.parent);
    while (n.parent != null);
    return { path: i, value: t, target: r };
  }
});
var so = E((j_, oo) => {
  "use strict";
  var { groupRestore: ja, nestedRestore: Na } = Ir();
  oo.exports = Ma;
  function Ma() {
    return function () {
      if (this.restore) {
        this.restore.state.secret = this.secret;
        return;
      }
      let { secret: t, wcLen: r } = this,
        n = Object.keys(t),
        i = $a(t, n),
        o = r > 0,
        s = o ? { secret: t, groupRestore: ja, nestedRestore: Na } : { secret: t };
      (this.restore = Function("o", Ca(i, n, o)).bind(s)), (this.restore.state = s);
    };
  }
  function $a(e, t) {
    return t
      .map((r) => {
        let { circle: n, escPath: i, leadingBracket: o } = e[r],
          f = n ? `o.${n} = secret[${i}].val` : `o${o ? "" : "."}${r} = secret[${i}].val`,
          c = `secret[${i}].val = undefined`;
        return `
      if (secret[${i}].val !== undefined) {
        try { ${f} } catch (e) {}
        ${c}
      }
    `;
      })
      .join("");
  }
  function Ca(e, t, r) {
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
var fo = E((N_, lo) => {
  "use strict";
  lo.exports = Wa;
  function Wa(e) {
    let {
        secret: t,
        censor: r,
        compileRestore: n,
        serialize: i,
        groupRedact: o,
        nestedRedact: s,
        wildcards: f,
        wcLen: c,
      } = e,
      u = [{ secret: t, censor: r, compileRestore: n }];
    return (
      i !== !1 && u.push({ serialize: i }),
      c > 0 && u.push({ groupRedact: o, nestedRedact: s, wildcards: f, wcLen: c }),
      Object.assign(...u)
    );
  }
});
var co = E((M_, ao) => {
  "use strict";
  var uo = Yi(),
    Ba = Zi(),
    Fa = to(),
    Ua = so(),
    { groupRedact: Va, nestedRedact: Ga } = Ir(),
    za = fo(),
    Ha = xt(),
    Ka = uo(),
    Dr = (e) => e;
  Dr.restore = Dr;
  var Ja = "[REDACTED]";
  Pr.rx = Ha;
  Pr.validator = uo;
  ao.exports = Pr;
  function Pr(e = {}) {
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
    let i = n === !0 ? void 0 : "censor" in e ? e.censor : Ja,
      o = typeof i == "function",
      s = o && i.length > 1;
    if (t.length === 0) return r || Dr;
    Ka({ paths: t, serialize: r, censor: i });
    let { wildcards: f, wcLen: c, secret: u } = Ba({ paths: t, censor: i }),
      a = Ua(),
      d = "strict" in e ? e.strict : !0;
    return Fa(
      { secret: u, wcLen: c, serialize: r, strict: d, isCensorFct: o, censorFctTakesPath: s },
      za({
        secret: u,
        censor: i,
        compileRestore: a,
        serialize: r,
        groupRedact: Va,
        nestedRedact: Ga,
        wildcards: f,
        wcLen: c,
      }),
    );
  }
});
var Me = E(($_, ho) => {
  "use strict";
  var Ya = Symbol("pino.setLevel"),
    Xa = Symbol("pino.getLevel"),
    Qa = Symbol("pino.levelVal"),
    Za = Symbol("pino.levelComp"),
    ec = Symbol("pino.useLevelLabels"),
    tc = Symbol("pino.useOnlyCustomLevels"),
    rc = Symbol("pino.mixin"),
    nc = Symbol("pino.lsCache"),
    ic = Symbol("pino.chindings"),
    oc = Symbol("pino.asJson"),
    sc = Symbol("pino.write"),
    lc = Symbol("pino.redactFmt"),
    fc = Symbol("pino.time"),
    uc = Symbol("pino.timeSliceIndex"),
    ac = Symbol("pino.stream"),
    cc = Symbol("pino.stringify"),
    dc = Symbol("pino.stringifySafe"),
    hc = Symbol("pino.stringifiers"),
    pc = Symbol("pino.end"),
    yc = Symbol("pino.formatOpts"),
    bc = Symbol("pino.messageKey"),
    gc = Symbol("pino.errorKey"),
    wc = Symbol("pino.nestedKey"),
    mc = Symbol("pino.nestedKeyStr"),
    _c = Symbol("pino.mixinMergeStrategy"),
    Sc = Symbol("pino.msgPrefix"),
    Ec = Symbol("pino.wildcardFirst"),
    Rc = Symbol.for("pino.serializers"),
    Ac = Symbol.for("pino.formatters"),
    xc = Symbol.for("pino.hooks"),
    Tc = Symbol.for("pino.metadata");
  ho.exports = {
    setLevelSym: Ya,
    getLevelSym: Xa,
    levelValSym: Qa,
    levelCompSym: Za,
    useLevelLabelsSym: ec,
    mixinSym: rc,
    lsCacheSym: nc,
    chindingsSym: ic,
    asJsonSym: oc,
    writeSym: sc,
    serializersSym: Rc,
    redactFmtSym: lc,
    timeSym: fc,
    timeSliceIndexSym: uc,
    streamSym: ac,
    stringifySym: cc,
    stringifySafeSym: dc,
    stringifiersSym: hc,
    endSym: pc,
    formatOptsSym: yc,
    messageKeySym: bc,
    errorKeySym: gc,
    nestedKeySym: wc,
    wildcardFirstSym: Ec,
    needsMetadataGsym: Tc,
    useOnlyCustomLevelsSym: tc,
    formattersSym: Ac,
    hooksSym: xc,
    nestedKeyStrSym: mc,
    mixinMergeStrategySym: _c,
    msgPrefixSym: Sc,
  };
});
var Nr = E((C_, go) => {
  "use strict";
  var jr = co(),
    { redactFmtSym: Oc, wildcardFirstSym: Tt } = Me(),
    { rx: qr, validator: vc } = jr,
    po = vc({
      ERR_PATHS_MUST_BE_STRINGS: () => "pino \u2013 redacted paths must be strings",
      ERR_INVALID_PATH: (e) => `pino \u2013 redact paths array contains an invalid path (${e})`,
    }),
    yo = "[Redacted]",
    bo = !1;
  function Lc(e, t) {
    let { paths: r, censor: n } = kc(e),
      i = r.reduce((f, c) => {
        qr.lastIndex = 0;
        let u = qr.exec(c),
          a = qr.exec(c),
          d = u[1] !== void 0 ? u[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, "$1") : u[0];
        if ((d === "*" && (d = Tt), a === null)) return (f[d] = null), f;
        if (f[d] === null) return f;
        let { index: p } = a,
          l = `${c.substr(p, c.length - 1)}`;
        return (
          (f[d] = f[d] || []),
          d !== Tt && f[d].length === 0 && f[d].push(...(f[Tt] || [])),
          d === Tt &&
            Object.keys(f).forEach(function (h) {
              f[h] && f[h].push(l);
            }),
          f[d].push(l),
          f
        );
      }, {}),
      o = { [Oc]: jr({ paths: r, censor: n, serialize: t, strict: bo }) },
      s = (...f) => t(typeof n == "function" ? n(...f) : n);
    return [...Object.keys(i), ...Object.getOwnPropertySymbols(i)].reduce((f, c) => {
      if (i[c] === null) f[c] = (u) => s(u, [c]);
      else {
        let u = typeof n == "function" ? (a, d) => n(a, [c, ...d]) : n;
        f[c] = jr({ paths: i[c], censor: u, serialize: t, strict: bo });
      }
      return f;
    }, o);
  }
  function kc(e) {
    if (Array.isArray(e)) return (e = { paths: e, censor: yo }), po(e), e;
    let { paths: t, censor: r = yo, remove: n } = e;
    if (Array.isArray(t) === !1) throw Error("pino \u2013 redact must contain an array of strings");
    return n === !0 && (r = void 0), po({ paths: t, censor: r }), { paths: t, censor: r };
  }
  go.exports = Lc;
});
var mo = E((W_, wo) => {
  "use strict";
  var Ic = () => "",
    Dc = () => `,"time":${Date.now()}`,
    Pc = () => `,"time":${Math.round(Date.now() / 1e3)}`,
    qc = () => `,"time":"${new Date(Date.now()).toISOString()}"`;
  wo.exports = { nullTime: Ic, epochTime: Dc, unixTime: Pc, isoTime: qc };
});
var So = E((B_, _o) => {
  "use strict";
  function jc(e) {
    try {
      return JSON.stringify(e);
    } catch {
      return '"[Circular]"';
    }
  }
  _o.exports = Nc;
  function Nc(e, t, r) {
    var n = (r && r.stringify) || jc,
      i = 1;
    if (typeof e == "object" && e !== null) {
      var o = t.length + i;
      if (o === 1) return e;
      var s = new Array(o);
      s[0] = n(e);
      for (var f = 1; f < o; f++) s[f] = n(t[f]);
      return s.join(" ");
    }
    if (typeof e != "string") return e;
    var c = t.length;
    if (c === 0) return e;
    for (var u = "", a = 1 - i, d = -1, p = (e && e.length) || 0, l = 0; l < p; ) {
      if (e.charCodeAt(l) === 37 && l + 1 < p) {
        switch (((d = d > -1 ? d : 0), e.charCodeAt(l + 1))) {
          case 100:
          case 102:
            if (a >= c || t[a] == null) break;
            d < l && (u += e.slice(d, l)), (u += Number(t[a])), (d = l + 2), l++;
            break;
          case 105:
            if (a >= c || t[a] == null) break;
            d < l && (u += e.slice(d, l)), (u += Math.floor(Number(t[a]))), (d = l + 2), l++;
            break;
          case 79:
          case 111:
          case 106:
            if (a >= c || t[a] === void 0) break;
            d < l && (u += e.slice(d, l));
            var h = typeof t[a];
            if (h === "string") {
              (u += "'" + t[a] + "'"), (d = l + 2), l++;
              break;
            }
            if (h === "function") {
              (u += t[a].name || "<anonymous>"), (d = l + 2), l++;
              break;
            }
            (u += n(t[a])), (d = l + 2), l++;
            break;
          case 115:
            if (a >= c) break;
            d < l && (u += e.slice(d, l)), (u += String(t[a])), (d = l + 2), l++;
            break;
          case 37:
            d < l && (u += e.slice(d, l)), (u += "%"), (d = l + 2), l++, a--;
            break;
        }
        ++a;
      }
      ++l;
    }
    return d === -1 ? e : (d < p && (u += e.slice(d)), u);
  }
});
var $r = E((F_, Mr) => {
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
    Mr.exports = t;
  } else {
    let e = function (t) {
      if ((t > 0 && t < 1 / 0) === !1)
        throw typeof t != "number" && typeof t != "bigint"
          ? TypeError("sleep: ms must be a number")
          : RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
      let n = Date.now() + Number(t);
      for (; n > Date.now(); );
    };
    Mr.exports = e;
  }
});
var Lo = E((U_, vo) => {
  "use strict";
  var $ = require("fs"),
    Mc = require("events"),
    $c = require("util").inherits,
    Eo = require("path"),
    Wr = $r(),
    Ot = 100,
    vt = Buffer.allocUnsafe(0),
    Cc = 16 * 1024,
    Ro = "buffer",
    Ao = "utf8";
  function xo(e, t) {
    (t._opening = !0), (t._writing = !0), (t._asyncDrainScheduled = !1);
    function r(o, s) {
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
      let f = t._reopening;
      (t.fd = s),
        (t.file = e),
        (t._reopening = !1),
        (t._opening = !1),
        (t._writing = !1),
        t.sync ? process.nextTick(() => t.emit("ready")) : t.emit("ready"),
        !t.destroyed &&
          ((!t._writing && t._len > t.minLength) || t._flushPending
            ? t._actualWrite()
            : f && process.nextTick(() => t.emit("drain")));
    }
    let n = t.append ? "a" : "w",
      i = t.mode;
    if (t.sync)
      try {
        t.mkdir && $.mkdirSync(Eo.dirname(e), { recursive: !0 });
        let o = $.openSync(e, n, i);
        r(null, o);
      } catch (o) {
        throw (r(o), o);
      }
    else
      t.mkdir
        ? $.mkdir(Eo.dirname(e), { recursive: !0 }, (o) => {
            if (o) return r(o);
            $.open(e, n, i, r);
          })
        : $.open(e, n, i, r);
  }
  function Y(e) {
    if (!(this instanceof Y)) return new Y(e);
    let {
      fd: t,
      dest: r,
      minLength: n,
      maxLength: i,
      maxWrite: o,
      sync: s,
      append: f = !0,
      mkdir: c,
      retryEAGAIN: u,
      fsync: a,
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
      (this.maxWrite = o || Cc),
      (this.sync = s || !1),
      (this.writable = !0),
      (this._fsync = a || !1),
      (this.append = f || !1),
      (this.mode = p),
      (this.retryEAGAIN = u || (() => !0)),
      (this.mkdir = c || !1);
    let l, h;
    if (d === Ro)
      (this._writingBuf = vt),
        (this.write = Fc),
        (this.flush = Vc),
        (this.flushSync = zc),
        (this._actualWrite = Kc),
        (l = () => $.writeSync(this.fd, this._writingBuf)),
        (h = () => $.write(this.fd, this._writingBuf, this.release));
    else if (d === void 0 || d === Ao)
      (this._writingBuf = ""),
        (this.write = Bc),
        (this.flush = Uc),
        (this.flushSync = Gc),
        (this._actualWrite = Hc),
        (l = () => $.writeSync(this.fd, this._writingBuf, "utf8")),
        (h = () => $.write(this.fd, this._writingBuf, "utf8", this.release));
    else throw new Error(`SonicBoom supports "${Ao}" and "${Ro}", but passed ${d}`);
    if (typeof t == "number") (this.fd = t), process.nextTick(() => this.emit("ready"));
    else if (typeof t == "string") xo(t, this);
    else throw new Error("SonicBoom supports only file descriptors and files");
    if (this.minLength >= this.maxWrite)
      throw new Error(`minLength should be smaller than maxWrite (${this.maxWrite})`);
    (this.release = (y, w) => {
      if (y) {
        if (
          (y.code === "EAGAIN" || y.code === "EBUSY") &&
          this.retryEAGAIN(y, this._writingBuf.length, this._len - this._writingBuf.length)
        )
          if (this.sync)
            try {
              Wr(Ot), this.release(void 0, 0);
            } catch (S) {
              this.release(S);
            }
          else setTimeout(h, Ot);
        else (this._writing = !1), this.emit("error", y);
        return;
      }
      this.emit("write", w);
      let m = Cr(this._writingBuf, this._len, w);
      if (((this._len = m.len), (this._writingBuf = m.writingBuf), this._writingBuf.length)) {
        if (!this.sync) {
          h();
          return;
        }
        try {
          do {
            let S = l(),
              _ = Cr(this._writingBuf, this._len, S);
            (this._len = _.len), (this._writingBuf = _.writingBuf);
          } while (this._writingBuf.length);
        } catch (S) {
          this.release(S);
          return;
        }
      }
      this._fsync && $.fsyncSync(this.fd);
      let g = this._len;
      this._reopening
        ? ((this._writing = !1), (this._reopening = !1), this.reopen())
        : g > this.minLength
          ? this._actualWrite()
          : this._ending
            ? g > 0
              ? this._actualWrite()
              : ((this._writing = !1), Lt(this))
            : ((this._writing = !1),
              this.sync
                ? this._asyncDrainScheduled ||
                  ((this._asyncDrainScheduled = !0), process.nextTick(Wc, this))
                : this.emit("drain"));
    }),
      this.on("newListener", function (y) {
        y === "drain" && (this._asyncDrainScheduled = !1);
      });
  }
  function Cr(e, t, r) {
    return (
      typeof e == "string" &&
        Buffer.byteLength(e) !== r &&
        (r = Buffer.from(e).subarray(0, r).toString().length),
      (t = Math.max(t - r, 0)),
      (e = e.slice(r)),
      { writingBuf: e, len: t }
    );
  }
  function Wc(e) {
    e.listenerCount("drain") > 0 && ((e._asyncDrainScheduled = !1), e.emit("drain"));
  }
  $c(Y, Mc);
  function To(e, t) {
    return e.length === 0 ? vt : e.length === 1 ? e[0] : Buffer.concat(e, t);
  }
  function Bc(e) {
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
  function Fc(e) {
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
  function Oo(e) {
    this._flushPending = !0;
    let t = () => {
        this._fsync
          ? ((this._flushPending = !1), e())
          : $.fsync(this.fd, (n) => {
              (this._flushPending = !1), e(n);
            }),
          this.off("error", r);
      },
      r = (n) => {
        (this._flushPending = !1), e(n), this.off("drain", t);
      };
    this.once("drain", t), this.once("error", r);
  }
  function Uc(e) {
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
    e && Oo.call(this, e),
      !this._writing && (this._bufs.length === 0 && this._bufs.push(""), this._actualWrite());
  }
  function Vc(e) {
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
    e && Oo.call(this, e),
      !this._writing &&
        (this._bufs.length === 0 && (this._bufs.push([]), this._lens.push(0)), this._actualWrite());
  }
  Y.prototype.reopen = function (e) {
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
        $.close(t, (r) => {
          if (r) return this.emit("error", r);
        });
    }),
      xo(this.file, this);
  };
  Y.prototype.end = function () {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this._opening) {
      this.once("ready", () => {
        this.end();
      });
      return;
    }
    this._ending ||
      ((this._ending = !0),
      !this._writing && (this._len > 0 && this.fd >= 0 ? this._actualWrite() : Lt(this)));
  };
  function Gc() {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this.fd < 0) throw new Error("sonic boom is not ready yet");
    !this._writing &&
      this._writingBuf.length > 0 &&
      (this._bufs.unshift(this._writingBuf), (this._writingBuf = ""));
    let e = "";
    for (; this._bufs.length || e; ) {
      e.length <= 0 && (e = this._bufs[0]);
      try {
        let t = $.writeSync(this.fd, e, "utf8"),
          r = Cr(e, this._len, t);
        (e = r.writingBuf), (this._len = r.len), e.length <= 0 && this._bufs.shift();
      } catch (t) {
        if (
          (t.code === "EAGAIN" || t.code === "EBUSY") &&
          !this.retryEAGAIN(t, e.length, this._len - e.length)
        )
          throw t;
        Wr(Ot);
      }
    }
    try {
      $.fsyncSync(this.fd);
    } catch {}
  }
  function zc() {
    if (this.destroyed) throw new Error("SonicBoom destroyed");
    if (this.fd < 0) throw new Error("sonic boom is not ready yet");
    !this._writing &&
      this._writingBuf.length > 0 &&
      (this._bufs.unshift([this._writingBuf]), (this._writingBuf = vt));
    let e = vt;
    for (; this._bufs.length || e.length; ) {
      e.length <= 0 && (e = To(this._bufs[0], this._lens[0]));
      try {
        let t = $.writeSync(this.fd, e);
        (e = e.subarray(t)),
          (this._len = Math.max(this._len - t, 0)),
          e.length <= 0 && (this._bufs.shift(), this._lens.shift());
      } catch (t) {
        if (
          (t.code === "EAGAIN" || t.code === "EBUSY") &&
          !this.retryEAGAIN(t, e.length, this._len - e.length)
        )
          throw t;
        Wr(Ot);
      }
    }
  }
  Y.prototype.destroy = function () {
    this.destroyed || Lt(this);
  };
  function Hc() {
    let e = this.release;
    if (
      ((this._writing = !0),
      (this._writingBuf = this._writingBuf || this._bufs.shift() || ""),
      this.sync)
    )
      try {
        let t = $.writeSync(this.fd, this._writingBuf, "utf8");
        e(null, t);
      } catch (t) {
        e(t);
      }
    else $.write(this.fd, this._writingBuf, "utf8", e);
  }
  function Kc() {
    let e = this.release;
    if (
      ((this._writing = !0),
      (this._writingBuf = this._writingBuf.length
        ? this._writingBuf
        : To(this._bufs.shift(), this._lens.shift())),
      this.sync)
    )
      try {
        let t = $.writeSync(this.fd, this._writingBuf);
        e(null, t);
      } catch (t) {
        e(t);
      }
    else $.write(this.fd, this._writingBuf, e);
  }
  function Lt(e) {
    if (e.fd === -1) {
      e.once("ready", Lt.bind(null, e));
      return;
    }
    (e.destroyed = !0), (e._bufs = []), (e._lens = []), $.fsync(e.fd, t);
    function t() {
      e.fd !== 1 && e.fd !== 2 ? $.close(e.fd, r) : r();
    }
    function r(n) {
      if (n) {
        e.emit("error", n);
        return;
      }
      e._ending && !e._writing && e.emit("finish"), e.emit("close");
    }
  }
  Y.SonicBoom = Y;
  Y.default = Y;
  vo.exports = Y;
});
var Br = E((V_, qo) => {
  "use strict";
  var X = { exit: [], beforeExit: [] },
    ko = { exit: Xc, beforeExit: Qc },
    $e;
  function Jc() {
    $e === void 0 && ($e = new FinalizationRegistry(Zc));
  }
  function Yc(e) {
    X[e].length > 0 || process.on(e, ko[e]);
  }
  function Io(e) {
    X[e].length > 0 ||
      (process.removeListener(e, ko[e]),
      X.exit.length === 0 && X.beforeExit.length === 0 && ($e = void 0));
  }
  function Xc() {
    Do("exit");
  }
  function Qc() {
    Do("beforeExit");
  }
  function Do(e) {
    for (let t of X[e]) {
      let r = t.deref(),
        n = t.fn;
      r !== void 0 && n(r, e);
    }
    X[e] = [];
  }
  function Zc(e) {
    for (let t of ["exit", "beforeExit"]) {
      let r = X[t].indexOf(e);
      X[t].splice(r, r + 1), Io(t);
    }
  }
  function Po(e, t, r) {
    if (t === void 0) throw new Error("the object can't be undefined");
    Yc(e);
    let n = new WeakRef(t);
    (n.fn = r), Jc(), $e.register(t, n), X[e].push(n);
  }
  function ed(e, t) {
    Po("exit", e, t);
  }
  function td(e, t) {
    Po("beforeExit", e, t);
  }
  function rd(e) {
    if ($e !== void 0) {
      $e.unregister(e);
      for (let t of ["exit", "beforeExit"])
        (X[t] = X[t].filter((r) => {
          let n = r.deref();
          return n && n !== e;
        })),
          Io(t);
    }
  }
  qo.exports = { register: ed, registerBeforeExit: td, unregister: rd };
});
var jo = E((G_, nd) => {
  nd.exports = {
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
var Mo = E((z_, No) => {
  "use strict";
  function id(e, t, r, n, i) {
    let o = Date.now() + n,
      s = Atomics.load(e, t);
    if (s === r) {
      i(null, "ok");
      return;
    }
    let f = s,
      c = (u) => {
        Date.now() > o
          ? i(null, "timed-out")
          : setTimeout(() => {
              (f = s),
                (s = Atomics.load(e, t)),
                s === f
                  ? c(u >= 1e3 ? 1e3 : u * 2)
                  : s === r
                    ? i(null, "ok")
                    : i(null, "not-equal");
            }, u);
      };
    c(1);
  }
  function od(e, t, r, n, i) {
    let o = Date.now() + n,
      s = Atomics.load(e, t);
    if (s !== r) {
      i(null, "ok");
      return;
    }
    let f = (c) => {
      Date.now() > o
        ? i(null, "timed-out")
        : setTimeout(() => {
            (s = Atomics.load(e, t)), s !== r ? i(null, "ok") : f(c >= 1e3 ? 1e3 : c * 2);
          }, c);
    };
    f(1);
  }
  No.exports = { wait: id, waitDiff: od };
});
var Co = E((H_, $o) => {
  "use strict";
  $o.exports = { WRITE_INDEX: 4, READ_INDEX: 8 };
});
var Vo = E((K_, Uo) => {
  "use strict";
  var { version: sd } = jo(),
    { EventEmitter: ld } = require("events"),
    { Worker: fd } = require("worker_threads"),
    { join: ud } = require("path"),
    { pathToFileURL: ad } = require("url"),
    { wait: cd } = Mo(),
    { WRITE_INDEX: z, READ_INDEX: te } = Co(),
    dd = require("buffer"),
    hd = require("assert"),
    b = Symbol("kImpl"),
    pd = dd.constants.MAX_STRING_LENGTH,
    rt = class {
      constructor(t) {
        this._value = t;
      }
      deref() {
        return this._value;
      }
    },
    It = class {
      register() {}
      unregister() {}
    },
    yd = process.env.NODE_V8_COVERAGE ? It : global.FinalizationRegistry || It,
    bd = process.env.NODE_V8_COVERAGE ? rt : global.WeakRef || rt,
    Wo = new yd((e) => {
      e.exited || e.terminate();
    });
  function gd(e, t) {
    let { filename: r, workerData: n } = t,
      o =
        ("__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {})[
          "thread-stream-worker"
        ] || ud(__dirname, "lib", "worker.js"),
      s = new fd(o, {
        ...t.workerOpts,
        trackUnmanagedFds: !1,
        workerData: {
          filename: r.indexOf("file://") === 0 ? r : ad(r).href,
          dataBuf: e[b].dataBuf,
          stateBuf: e[b].stateBuf,
          workerData: { $context: { threadStreamVersion: sd }, ...n },
        },
      });
    return (s.stream = new rt(e)), s.on("message", wd), s.on("exit", Fo), Wo.register(e, s), s;
  }
  function Bo(e) {
    hd(!e[b].sync), e[b].needDrain && ((e[b].needDrain = !1), e.emit("drain"));
  }
  function kt(e) {
    let t = Atomics.load(e[b].state, z),
      r = e[b].data.length - t;
    if (r > 0) {
      if (e[b].buf.length === 0) {
        (e[b].flushing = !1), e[b].ending ? zr(e) : e[b].needDrain && process.nextTick(Bo, e);
        return;
      }
      let n = e[b].buf.slice(0, r),
        i = Buffer.byteLength(n);
      i <= r
        ? ((e[b].buf = e[b].buf.slice(r)), Dt(e, n, kt.bind(null, e)))
        : e.flush(() => {
            if (!e.destroyed) {
              for (
                Atomics.store(e[b].state, te, 0), Atomics.store(e[b].state, z, 0);
                i > e[b].data.length;

              )
                (r = r / 2), (n = e[b].buf.slice(0, r)), (i = Buffer.byteLength(n));
              (e[b].buf = e[b].buf.slice(r)), Dt(e, n, kt.bind(null, e));
            }
          });
    } else if (r === 0) {
      if (t === 0 && e[b].buf.length === 0) return;
      e.flush(() => {
        Atomics.store(e[b].state, te, 0), Atomics.store(e[b].state, z, 0), kt(e);
      });
    } else re(e, new Error("overwritten"));
  }
  function wd(e) {
    let t = this.stream.deref();
    if (t === void 0) {
      (this.exited = !0), this.terminate();
      return;
    }
    switch (e.code) {
      case "READY":
        (this.stream = new bd(t)),
          t.flush(() => {
            (t[b].ready = !0), t.emit("ready");
          });
        break;
      case "ERROR":
        re(t, e.err);
        break;
      case "EVENT":
        Array.isArray(e.args) ? t.emit(e.name, ...e.args) : t.emit(e.name, e.args);
        break;
      case "WARNING":
        process.emitWarning(e.err);
        break;
      default:
        re(t, new Error("this should not happen: " + e.code));
    }
  }
  function Fo(e) {
    let t = this.stream.deref();
    t !== void 0 &&
      (Wo.unregister(t),
      (t.worker.exited = !0),
      t.worker.off("exit", Fo),
      re(t, e !== 0 ? new Error("the worker thread exited") : null));
  }
  var Ur = class extends ld {
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
        (this.worker = gd(this, t)),
        this.on("message", (r, n) => {
          this.worker.postMessage(r, n);
        });
    }
    write(t) {
      if (this[b].destroyed) return Vr(this, new Error("the worker has exited")), !1;
      if (this[b].ending) return Vr(this, new Error("the worker is ending")), !1;
      if (this[b].flushing && this[b].buf.length + t.length >= pd)
        try {
          Fr(this), (this[b].flushing = !0);
        } catch (r) {
          return re(this, r), !1;
        }
      if (((this[b].buf += t), this[b].sync))
        try {
          return Fr(this), !0;
        } catch (r) {
          return re(this, r), !1;
        }
      return (
        this[b].flushing || ((this[b].flushing = !0), setImmediate(kt, this)),
        (this[b].needDrain =
          this[b].data.length - this[b].buf.length - Atomics.load(this[b].state, z) <= 0),
        !this[b].needDrain
      );
    }
    end() {
      this[b].destroyed || ((this[b].ending = !0), zr(this));
    }
    flush(t) {
      if (this[b].destroyed) {
        typeof t == "function" && process.nextTick(t, new Error("the worker has exited"));
        return;
      }
      let r = Atomics.load(this[b].state, z);
      cd(this[b].state, te, r, 1 / 0, (n, i) => {
        if (n) {
          re(this, n), process.nextTick(t, n);
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
      this[b].destroyed || (Fr(this), Gr(this));
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
  function Vr(e, t) {
    setImmediate(() => {
      e.emit("error", t);
    });
  }
  function re(e, t) {
    e[b].destroyed ||
      ((e[b].destroyed = !0),
      t && ((e[b].errored = t), Vr(e, t)),
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
  function Dt(e, t, r) {
    let n = Atomics.load(e[b].state, z),
      i = Buffer.byteLength(t);
    return (
      e[b].data.write(t, n),
      Atomics.store(e[b].state, z, n + i),
      Atomics.notify(e[b].state, z),
      r(),
      !0
    );
  }
  function zr(e) {
    if (!(e[b].ended || !e[b].ending || e[b].flushing)) {
      e[b].ended = !0;
      try {
        e.flushSync();
        let t = Atomics.load(e[b].state, te);
        Atomics.store(e[b].state, z, -1), Atomics.notify(e[b].state, z);
        let r = 0;
        for (; t !== -1; ) {
          if (
            (Atomics.wait(e[b].state, te, t, 1e3), (t = Atomics.load(e[b].state, te)), t === -2)
          ) {
            re(e, new Error("end() failed"));
            return;
          }
          if (++r === 10) {
            re(e, new Error("end() took too long (10s)"));
            return;
          }
        }
        process.nextTick(() => {
          (e[b].finished = !0), e.emit("finish");
        });
      } catch (t) {
        re(e, t);
      }
    }
  }
  function Fr(e) {
    let t = () => {
      e[b].ending ? zr(e) : e[b].needDrain && process.nextTick(Bo, e);
    };
    for (e[b].flushing = !1; e[b].buf.length !== 0; ) {
      let r = Atomics.load(e[b].state, z),
        n = e[b].data.length - r;
      if (n === 0) {
        Gr(e), Atomics.store(e[b].state, te, 0), Atomics.store(e[b].state, z, 0);
        continue;
      } else if (n < 0) throw new Error("overwritten");
      let i = e[b].buf.slice(0, n),
        o = Buffer.byteLength(i);
      if (o <= n) (e[b].buf = e[b].buf.slice(n)), Dt(e, i, t);
      else {
        for (
          Gr(e), Atomics.store(e[b].state, te, 0), Atomics.store(e[b].state, z, 0);
          o > e[b].buf.length;

        )
          (n = n / 2), (i = e[b].buf.slice(0, n)), (o = Buffer.byteLength(i));
        (e[b].buf = e[b].buf.slice(n)), Dt(e, i, t);
      }
    }
  }
  function Gr(e) {
    if (e[b].flushing) throw new Error("unable to flush while flushing");
    let t = Atomics.load(e[b].state, z),
      r = 0;
    for (;;) {
      let n = Atomics.load(e[b].state, te);
      if (n === -2) throw Error("_flushSync failed");
      if (n !== t) Atomics.wait(e[b].state, te, n, 1e3);
      else break;
      if (++r === 10) throw new Error("_flushSync took too long (10s)");
    }
  }
  Uo.exports = Ur;
});
var Jr = E((J_, Go) => {
  "use strict";
  var { createRequire: md } = require("module"),
    _d = Lr(),
    { join: Hr, isAbsolute: Sd, sep: Ed } = require("path"),
    Rd = $r(),
    Kr = Br(),
    Ad = Vo();
  function xd(e) {
    Kr.register(e, Od),
      Kr.registerBeforeExit(e, vd),
      e.on("close", function () {
        Kr.unregister(e);
      });
  }
  function Td(e, t, r) {
    let n = new Ad({ filename: e, workerData: t, workerOpts: r });
    n.on("ready", i),
      n.on("close", function () {
        process.removeListener("exit", o);
      }),
      process.on("exit", o);
    function i() {
      process.removeListener("exit", o), n.unref(), r.autoEnd !== !1 && xd(n);
    }
    function o() {
      n.closed || (n.flushSync(), Rd(100), n.end());
    }
    return n;
  }
  function Od(e) {
    e.ref(),
      e.flushSync(),
      e.end(),
      e.once("close", function () {
        e.unref();
      });
  }
  function vd(e) {
    e.flushSync();
  }
  function Ld(e) {
    let { pipeline: t, targets: r, levels: n, dedupe: i, worker: o = {}, caller: s = _d() } = e,
      f = { ...e.options },
      c = typeof s == "string" ? [s] : s,
      u = "__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {},
      a = e.target;
    if (a && r) throw new Error("only one of target or targets can be specified");
    return (
      r
        ? ((a = u["pino-worker"] || Hr(__dirname, "worker.js")),
          (f.targets = r.filter((p) => p.target).map((p) => ({ ...p, target: d(p.target) }))),
          (f.pipelines = r
            .filter((p) => p.pipeline)
            .map((p) => p.pipeline.map((l) => ({ ...l, level: p.level, target: d(l.target) })))))
        : t &&
          ((a = u["pino-worker"] || Hr(__dirname, "worker.js")),
          (f.pipelines = [t.map((p) => ({ ...p, target: d(p.target) }))])),
      n && (f.levels = n),
      i && (f.dedupe = i),
      (f.pinoWillSendConfig = !0),
      Td(d(a), f, o)
    );
    function d(p) {
      if (((p = u[p] || p), Sd(p) || p.indexOf("file://") === 0)) return p;
      if (p === "pino/file") return Hr(__dirname, "..", "file.js");
      let l;
      for (let h of c)
        try {
          let y = h === "node:repl" ? process.cwd() + Ed : h;
          l = md(y).resolve(p);
          break;
        } catch {
          continue;
        }
      if (!l) throw new Error(`unable to determine transport target for "${p}"`);
      return l;
    }
  }
  Go.exports = Ld;
});
var jt = E((Y_, rs) => {
  "use strict";
  var zo = So(),
    { mapHttpRequest: kd, mapHttpResponse: Id } = vr(),
    Xr = Lo(),
    Ho = Br(),
    {
      lsCacheSym: Dd,
      chindingsSym: Yo,
      writeSym: Ko,
      serializersSym: Xo,
      formatOptsSym: Jo,
      endSym: Pd,
      stringifiersSym: Qo,
      stringifySym: Zo,
      stringifySafeSym: Qr,
      wildcardFirstSym: es,
      nestedKeySym: qd,
      formattersSym: ts,
      messageKeySym: jd,
      errorKeySym: Nd,
      nestedKeyStrSym: Md,
      msgPrefixSym: Pt,
    } = Me(),
    { isMainThread: $d } = require("worker_threads"),
    Cd = Jr();
  function Ce() {}
  function Wd(e, t) {
    if (!t) return r;
    return function (...i) {
      t.call(this, i, r, e);
    };
    function r(n, ...i) {
      if (typeof n == "object") {
        let o = n;
        n !== null &&
          (n.method && n.headers && n.socket
            ? (n = kd(n))
            : typeof n.setHeader == "function" && (n = Id(n)));
        let s;
        o === null && i.length === 0 ? (s = [null]) : ((o = i.shift()), (s = i)),
          typeof this[Pt] == "string" && o !== void 0 && o !== null && (o = this[Pt] + o),
          this[Ko](n, zo(o, s, this[Jo]), e);
      } else {
        let o = n === void 0 ? i.shift() : n;
        typeof this[Pt] == "string" && o !== void 0 && o !== null && (o = this[Pt] + o),
          this[Ko](null, zo(o, i, this[Jo]), e);
      }
    }
  }
  function Yr(e) {
    let t = "",
      r = 0,
      n = !1,
      i = 255,
      o = e.length;
    if (o > 100) return JSON.stringify(e);
    for (var s = 0; s < o && i >= 32; s++)
      (i = e.charCodeAt(s)),
        (i === 34 || i === 92) && ((t += e.slice(r, s) + "\\"), (r = s), (n = !0));
    return n ? (t += e.slice(r)) : (t = e), i < 32 ? JSON.stringify(e) : '"' + t + '"';
  }
  function Bd(e, t, r, n) {
    let i = this[Zo],
      o = this[Qr],
      s = this[Qo],
      f = this[Pd],
      c = this[Yo],
      u = this[Xo],
      a = this[ts],
      d = this[jd],
      p = this[Nd],
      l = this[Dd][r] + n;
    l = l + c;
    let h;
    a.log && (e = a.log(e));
    let y = s[es],
      w = "";
    for (let g in e)
      if (((h = e[g]), Object.prototype.hasOwnProperty.call(e, g) && h !== void 0)) {
        u[g] ? (h = u[g](h)) : g === p && u.err && (h = u.err(h));
        let S = s[g] || y;
        switch (typeof h) {
          case "undefined":
          case "function":
            continue;
          case "number":
            Number.isFinite(h) === !1 && (h = null);
          case "boolean":
            S && (h = S(h));
            break;
          case "string":
            h = (S || Yr)(h);
            break;
          default:
            h = (S || i)(h, o);
        }
        if (h === void 0) continue;
        let _ = Yr(g);
        w += "," + _ + ":" + h;
      }
    let m = "";
    if (t !== void 0) {
      h = u[d] ? u[d](t) : t;
      let g = s[d] || y;
      switch (typeof h) {
        case "function":
          break;
        case "number":
          Number.isFinite(h) === !1 && (h = null);
        case "boolean":
          g && (h = g(h)), (m = ',"' + d + '":' + h);
          break;
        case "string":
          (h = (g || Yr)(h)), (m = ',"' + d + '":' + h);
          break;
        default:
          (h = (g || i)(h, o)), (m = ',"' + d + '":' + h);
      }
    }
    return this[qd] && w ? l + this[Md] + w.slice(1) + "}" + m + f : l + w + m + f;
  }
  function Fd(e, t) {
    let r,
      n = e[Yo],
      i = e[Zo],
      o = e[Qr],
      s = e[Qo],
      f = s[es],
      c = e[Xo],
      u = e[ts].bindings;
    t = u(t);
    for (let a in t)
      if (
        ((r = t[a]),
        (a !== "level" &&
          a !== "serializers" &&
          a !== "formatters" &&
          a !== "customLevels" &&
          t.hasOwnProperty(a) &&
          r !== void 0) === !0)
      ) {
        if (((r = c[a] ? c[a](r) : r), (r = (s[a] || f || i)(r, o)), r === void 0)) continue;
        n += ',"' + a + '":' + r;
      }
    return n;
  }
  function Ud(e) {
    return e.write !== e.constructor.prototype.write;
  }
  var Vd = process.env.NODE_V8_COVERAGE || process.env.V8_COVERAGE;
  function qt(e) {
    let t = new Xr(e);
    return (
      t.on("error", r),
      !Vd &&
        !e.sync &&
        $d &&
        (Ho.register(t, Gd),
        t.on("close", function () {
          Ho.unregister(t);
        })),
      t
    );
    function r(n) {
      if (n.code === "EPIPE") {
        (t.write = Ce), (t.end = Ce), (t.flushSync = Ce), (t.destroy = Ce);
        return;
      }
      t.removeListener("error", r), t.emit("error", n);
    }
  }
  function Gd(e, t) {
    e.destroyed ||
      (t === "beforeExit"
        ? (e.flush(),
          e.on("drain", function () {
            e.end();
          }))
        : e.flushSync());
  }
  function zd(e) {
    return function (r, n, i = {}, o) {
      if (typeof i == "string") (o = qt({ dest: i })), (i = {});
      else if (typeof o == "string") {
        if (i && i.transport)
          throw Error("only one of option.transport or stream can be specified");
        o = qt({ dest: o });
      } else if (i instanceof Xr || i.writable || i._writableState) (o = i), (i = {});
      else if (i.transport) {
        if (i.transport instanceof Xr || i.transport.writable || i.transport._writableState)
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
          (o = Cd({ caller: n, ...i.transport, levels: c }));
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
      let { enabled: s, onChild: f } = i;
      return (
        s === !1 && (i.level = "silent"),
        f || (i.onChild = Ce),
        o || (Ud(process.stdout) ? (o = process.stdout) : (o = qt({ fd: process.stdout.fd || 1 }))),
        { opts: i, stream: o }
      );
    };
  }
  function Hd(e, t) {
    try {
      return JSON.stringify(e);
    } catch {
      try {
        return (t || this[Qr])(e);
      } catch {
        return '"[unable to serialize, circular reference is too complex to analyze]"';
      }
    }
  }
  function Kd(e, t, r) {
    return { level: e, bindings: t, log: r };
  }
  function Jd(e) {
    let t = Number(e);
    return typeof e == "string" && Number.isFinite(t) ? t : e === void 0 ? 1 : e;
  }
  rs.exports = {
    noop: Ce,
    buildSafeSonicBoom: qt,
    asChindings: Fd,
    asJson: Bd,
    genLog: Wd,
    createArgsNormalizer: zd,
    stringify: Hd,
    buildFormatters: Kd,
    normalizeDestFileDescriptor: Jd,
  };
});
var Nt = E((X_, ns) => {
  var Yd = { trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60 },
    Xd = { ASC: "ASC", DESC: "DESC" };
  ns.exports = { DEFAULT_LEVELS: Yd, SORTING_ORDER: Xd };
});
var tn = E((Q_, ls) => {
  "use strict";
  var {
      lsCacheSym: Qd,
      levelValSym: Zr,
      useOnlyCustomLevelsSym: Zd,
      streamSym: eh,
      formattersSym: th,
      hooksSym: rh,
      levelCompSym: is,
    } = Me(),
    { noop: nh, genLog: Ee } = jt(),
    { DEFAULT_LEVELS: ne, SORTING_ORDER: os } = Nt(),
    ss = {
      fatal: (e) => {
        let t = Ee(ne.fatal, e);
        return function (...r) {
          let n = this[eh];
          if ((t.call(this, ...r), typeof n.flushSync == "function"))
            try {
              n.flushSync();
            } catch {}
        };
      },
      error: (e) => Ee(ne.error, e),
      warn: (e) => Ee(ne.warn, e),
      info: (e) => Ee(ne.info, e),
      debug: (e) => Ee(ne.debug, e),
      trace: (e) => Ee(ne.trace, e),
    },
    en = Object.keys(ne).reduce((e, t) => ((e[ne[t]] = t), e), {}),
    ih = Object.keys(en).reduce((e, t) => ((e[t] = '{"level":' + Number(t)), e), {});
  function oh(e) {
    let t = e[th].level,
      { labels: r } = e.levels,
      n = {};
    for (let i in r) {
      let o = t(r[i], Number(i));
      n[i] = JSON.stringify(o).slice(0, -1);
    }
    return (e[Qd] = n), e;
  }
  function sh(e, t) {
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
  function lh(e) {
    let { labels: t, values: r } = this.levels;
    if (typeof e == "number") {
      if (t[e] === void 0) throw Error("unknown level value" + e);
      e = t[e];
    }
    if (r[e] === void 0) throw Error("unknown level " + e);
    let n = this[Zr],
      i = (this[Zr] = r[e]),
      o = this[Zd],
      s = this[is],
      f = this[rh].logMethod;
    for (let c in r) {
      if (s(r[c], i) === !1) {
        this[c] = nh;
        continue;
      }
      this[c] = sh(c, o) ? ss[c](f) : Ee(r[c], f);
    }
    this.emit("level-change", e, i, t[n], n, this);
  }
  function fh(e) {
    let { levels: t, levelVal: r } = this;
    return t && t.labels ? t.labels[r] : "";
  }
  function uh(e) {
    let { values: t } = this.levels,
      r = t[e];
    return r !== void 0 && this[is](r, this[Zr]);
  }
  function ah(e, t, r) {
    return e === os.DESC ? t <= r : t >= r;
  }
  function ch(e) {
    return typeof e == "string" ? ah.bind(null, e) : e;
  }
  function dh(e = null, t = !1) {
    let r = e ? Object.keys(e).reduce((o, s) => ((o[e[s]] = s), o), {}) : null,
      n = Object.assign(
        Object.create(Object.prototype, { Infinity: { value: "silent" } }),
        t ? null : en,
        r,
      ),
      i = Object.assign(
        Object.create(Object.prototype, { silent: { value: 1 / 0 } }),
        t ? null : ne,
        e,
      );
    return { labels: n, values: i };
  }
  function hh(e, t, r) {
    if (typeof e == "number") {
      if (
        ![]
          .concat(
            Object.keys(t || {}).map((o) => t[o]),
            r ? [] : Object.keys(en).map((o) => +o),
            1 / 0,
          )
          .includes(e)
      )
        throw Error(`default level:${e} must be included in custom levels`);
      return;
    }
    let n = Object.assign(
      Object.create(Object.prototype, { silent: { value: 1 / 0 } }),
      r ? null : ne,
      t,
    );
    if (!(e in n)) throw Error(`default level:${e} must be included in custom levels`);
  }
  function ph(e, t) {
    let { labels: r, values: n } = e;
    for (let i in t) {
      if (i in n) throw Error("levels cannot be overridden");
      if (t[i] in r) throw Error("pre-existing level values cannot be used for new levels");
    }
  }
  function yh(e) {
    if (typeof e != "function" && !(typeof e == "string" && Object.values(os).includes(e)))
      throw new Error('Levels comparison should be one of "ASC", "DESC" or "function" type');
  }
  ls.exports = {
    initialLsCache: ih,
    genLsCache: oh,
    levelMethods: ss,
    getLevel: fh,
    setLevel: lh,
    isLevelEnabled: uh,
    mappings: dh,
    assertNoLevelCollisions: ph,
    assertDefaultLevelFound: hh,
    genLevelComparison: ch,
    assertLevelComparison: yh,
  };
});
var rn = E((Z_, fs) => {
  "use strict";
  fs.exports = { version: "9.2.0" };
});
var ms = E((tS, ws) => {
  "use strict";
  var { EventEmitter: bh } = require("events"),
    {
      lsCacheSym: gh,
      levelValSym: wh,
      setLevelSym: on,
      getLevelSym: us,
      chindingsSym: sn,
      parsedChindingsSym: mh,
      mixinSym: _h,
      asJsonSym: ps,
      writeSym: Sh,
      mixinMergeStrategySym: Eh,
      timeSym: Rh,
      timeSliceIndexSym: Ah,
      streamSym: ys,
      serializersSym: Re,
      formattersSym: nn,
      errorKeySym: xh,
      messageKeySym: Th,
      useOnlyCustomLevelsSym: Oh,
      needsMetadataGsym: vh,
      redactFmtSym: Lh,
      stringifySym: kh,
      formatOptsSym: Ih,
      stringifiersSym: Dh,
      msgPrefixSym: as,
    } = Me(),
    {
      getLevel: Ph,
      setLevel: qh,
      isLevelEnabled: jh,
      mappings: Nh,
      initialLsCache: Mh,
      genLsCache: $h,
      assertNoLevelCollisions: Ch,
    } = tn(),
    { asChindings: bs, asJson: Wh, buildFormatters: cs, stringify: ds } = jt(),
    { version: Bh } = rn(),
    Fh = Nr(),
    Uh = class {},
    gs = {
      constructor: Uh,
      child: Vh,
      bindings: Gh,
      setBindings: zh,
      flush: Yh,
      isLevelEnabled: jh,
      version: Bh,
      get level() {
        return this[us]();
      },
      set level(e) {
        this[on](e);
      },
      get levelVal() {
        return this[wh];
      },
      set levelVal(e) {
        throw Error("levelVal is read-only");
      },
      [gh]: Mh,
      [Sh]: Kh,
      [ps]: Wh,
      [us]: Ph,
      [on]: qh,
    };
  Object.setPrototypeOf(gs, bh.prototype);
  ws.exports = function () {
    return Object.create(gs);
  };
  var hs = (e) => e;
  function Vh(e, t) {
    if (!e) throw Error("missing bindings for child Pino");
    t = t || {};
    let r = this[Re],
      n = this[nn],
      i = Object.create(this);
    if (t.hasOwnProperty("serializers") === !0) {
      i[Re] = Object.create(null);
      for (let a in r) i[Re][a] = r[a];
      let c = Object.getOwnPropertySymbols(r);
      for (var o = 0; o < c.length; o++) {
        let a = c[o];
        i[Re][a] = r[a];
      }
      for (let a in t.serializers) i[Re][a] = t.serializers[a];
      let u = Object.getOwnPropertySymbols(t.serializers);
      for (var s = 0; s < u.length; s++) {
        let a = u[s];
        i[Re][a] = t.serializers[a];
      }
    } else i[Re] = r;
    if (t.hasOwnProperty("formatters")) {
      let { level: c, bindings: u, log: a } = t.formatters;
      i[nn] = cs(c || n.level, u || hs, a || n.log);
    } else i[nn] = cs(n.level, hs, n.log);
    if (
      (t.hasOwnProperty("customLevels") === !0 &&
        (Ch(this.levels, t.customLevels), (i.levels = Nh(t.customLevels, i[Oh])), $h(i)),
      (typeof t.redact == "object" && t.redact !== null) || Array.isArray(t.redact))
    ) {
      i.redact = t.redact;
      let c = Fh(i.redact, ds),
        u = { stringify: c[Lh] };
      (i[kh] = ds), (i[Dh] = c), (i[Ih] = u);
    }
    typeof t.msgPrefix == "string" && (i[as] = (this[as] || "") + t.msgPrefix), (i[sn] = bs(i, e));
    let f = t.level || this.level;
    return i[on](f), this.onChild(i), i;
  }
  function Gh() {
    let t = `{${this[sn].substr(1)}}`,
      r = JSON.parse(t);
    return delete r.pid, delete r.hostname, r;
  }
  function zh(e) {
    let t = bs(this, e);
    (this[sn] = t), delete this[mh];
  }
  function Hh(e, t) {
    return Object.assign(t, e);
  }
  function Kh(e, t, r) {
    let n = this[Rh](),
      i = this[_h],
      o = this[xh],
      s = this[Th],
      f = this[Eh] || Hh,
      c;
    e == null
      ? (c = {})
      : e instanceof Error
        ? ((c = { [o]: e }), t === void 0 && (t = e.message))
        : ((c = e), t === void 0 && e[s] === void 0 && e[o] && (t = e[o].message)),
      i && (c = f(c, i(c, r, this)));
    let u = this[ps](c, t, r, n),
      a = this[ys];
    a[vh] === !0 &&
      ((a.lastLevel = r),
      (a.lastObj = c),
      (a.lastMsg = t),
      (a.lastTime = n.slice(this[Ah])),
      (a.lastLogger = this)),
      a.write(u);
  }
  function Jh() {}
  function Yh(e) {
    if (e != null && typeof e != "function") throw Error("callback must be a function");
    let t = this[ys];
    typeof t.flush == "function" ? t.flush(e || Jh) : e && e();
  }
});
var As = E((an, Rs) => {
  "use strict";
  var { hasOwnProperty: Mt } = Object.prototype,
    xe = un();
  xe.configure = un;
  xe.stringify = xe;
  xe.default = xe;
  an.stringify = xe;
  an.configure = un;
  Rs.exports = xe;
  var Xh =
    /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
  function pe(e) {
    return e.length < 5e3 && !Xh.test(e) ? `"${e}"` : JSON.stringify(e);
  }
  function ln(e) {
    if (e.length > 200) return e.sort();
    for (let t = 1; t < e.length; t++) {
      let r = e[t],
        n = t;
      for (; n !== 0 && e[n - 1] > r; ) (e[n] = e[n - 1]), n--;
      e[n] = r;
    }
    return e;
  }
  var Qh = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(Object.getPrototypeOf(new Int8Array())),
    Symbol.toStringTag,
  ).get;
  function fn(e) {
    return Qh.call(e) !== void 0 && e.length !== 0;
  }
  function _s(e, t, r) {
    e.length < r && (r = e.length);
    let n = t === "," ? "" : " ",
      i = `"0":${n}${e[0]}`;
    for (let o = 1; o < r; o++) i += `${t}"${o}":${n}${e[o]}`;
    return i;
  }
  function Zh(e) {
    if (Mt.call(e, "circularValue")) {
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
  function Ss(e, t) {
    let r;
    if (Mt.call(e, t) && ((r = e[t]), typeof r != "boolean"))
      throw new TypeError(`The "${t}" argument must be of type boolean`);
    return r === void 0 ? !0 : r;
  }
  function Es(e, t) {
    let r;
    if (Mt.call(e, t)) {
      if (((r = e[t]), typeof r != "number"))
        throw new TypeError(`The "${t}" argument must be of type number`);
      if (!Number.isInteger(r)) throw new TypeError(`The "${t}" argument must be an integer`);
      if (r < 1) throw new RangeError(`The "${t}" argument must be >= 1`);
    }
    return r === void 0 ? 1 / 0 : r;
  }
  function Ae(e) {
    return e === 1 ? "1 item" : `${e} items`;
  }
  function ep(e) {
    let t = new Set();
    for (let r of e) (typeof r == "string" || typeof r == "number") && t.add(String(r));
    return t;
  }
  function tp(e) {
    if (Mt.call(e, "strict")) {
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
  function un(e) {
    e = { ...e };
    let t = tp(e);
    t &&
      (e.bigint === void 0 && (e.bigint = !1), "circularValue" in e || (e.circularValue = Error));
    let r = Zh(e),
      n = Ss(e, "bigint"),
      i = Ss(e, "deterministic"),
      o = Es(e, "maximumDepth"),
      s = Es(e, "maximumBreadth");
    function f(p, l, h, y, w, m) {
      let g = l[p];
      switch (
        (typeof g == "object" && g !== null && typeof g.toJSON == "function" && (g = g.toJSON(p)),
        (g = y.call(l, p, g)),
        typeof g)
      ) {
        case "string":
          return pe(g);
        case "object": {
          if (g === null) return "null";
          if (h.indexOf(g) !== -1) return r;
          let S = "",
            _ = ",",
            R = m;
          if (Array.isArray(g)) {
            if (g.length === 0) return "[]";
            if (o < h.length + 1) return '"[Array]"';
            h.push(g),
              w !== "" &&
                ((m += w),
                (S += `
${m}`),
                (_ = `,
${m}`));
            let N = Math.min(g.length, s),
              F = 0;
            for (; F < N - 1; F++) {
              let Ne = f(String(F), g, h, y, w, m);
              (S += Ne !== void 0 ? Ne : "null"), (S += _);
            }
            let M = f(String(F), g, h, y, w, m);
            if (((S += M !== void 0 ? M : "null"), g.length - 1 > s)) {
              let Ne = g.length - s - 1;
              S += `${_}"... ${Ae(Ne)} not stringified"`;
            }
            return (
              w !== "" &&
                (S += `
${R}`),
              h.pop(),
              `[${S}]`
            );
          }
          let A = Object.keys(g),
            v = A.length;
          if (v === 0) return "{}";
          if (o < h.length + 1) return '"[Object]"';
          let x = "",
            T = "";
          w !== "" &&
            ((m += w),
            (_ = `,
${m}`),
            (x = " "));
          let I = Math.min(v, s);
          i && !fn(g) && (A = ln(A)), h.push(g);
          for (let N = 0; N < I; N++) {
            let F = A[N],
              M = f(F, g, h, y, w, m);
            M !== void 0 && ((S += `${T}${pe(F)}:${x}${M}`), (T = _));
          }
          if (v > s) {
            let N = v - s;
            (S += `${T}"...":${x}"${Ae(N)} not stringified"`), (T = _);
          }
          return (
            w !== "" &&
              T.length > 1 &&
              (S = `
${m}${S}
${R}`),
            h.pop(),
            `{${S}}`
          );
        }
        case "number":
          return isFinite(g) ? String(g) : t ? t(g) : "null";
        case "boolean":
          return g === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (n) return String(g);
        default:
          return t ? t(g) : void 0;
      }
    }
    function c(p, l, h, y, w, m) {
      switch (
        (typeof l == "object" && l !== null && typeof l.toJSON == "function" && (l = l.toJSON(p)),
        typeof l)
      ) {
        case "string":
          return pe(l);
        case "object": {
          if (l === null) return "null";
          if (h.indexOf(l) !== -1) return r;
          let g = m,
            S = "",
            _ = ",";
          if (Array.isArray(l)) {
            if (l.length === 0) return "[]";
            if (o < h.length + 1) return '"[Array]"';
            h.push(l),
              w !== "" &&
                ((m += w),
                (S += `
${m}`),
                (_ = `,
${m}`));
            let v = Math.min(l.length, s),
              x = 0;
            for (; x < v - 1; x++) {
              let I = c(String(x), l[x], h, y, w, m);
              (S += I !== void 0 ? I : "null"), (S += _);
            }
            let T = c(String(x), l[x], h, y, w, m);
            if (((S += T !== void 0 ? T : "null"), l.length - 1 > s)) {
              let I = l.length - s - 1;
              S += `${_}"... ${Ae(I)} not stringified"`;
            }
            return (
              w !== "" &&
                (S += `
${g}`),
              h.pop(),
              `[${S}]`
            );
          }
          h.push(l);
          let R = "";
          w !== "" &&
            ((m += w),
            (_ = `,
${m}`),
            (R = " "));
          let A = "";
          for (let v of y) {
            let x = c(v, l[v], h, y, w, m);
            x !== void 0 && ((S += `${A}${pe(v)}:${R}${x}`), (A = _));
          }
          return (
            w !== "" &&
              A.length > 1 &&
              (S = `
${m}${S}
${g}`),
            h.pop(),
            `{${S}}`
          );
        }
        case "number":
          return isFinite(l) ? String(l) : t ? t(l) : "null";
        case "boolean":
          return l === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (n) return String(l);
        default:
          return t ? t(l) : void 0;
      }
    }
    function u(p, l, h, y, w) {
      switch (typeof l) {
        case "string":
          return pe(l);
        case "object": {
          if (l === null) return "null";
          if (typeof l.toJSON == "function") {
            if (((l = l.toJSON(p)), typeof l != "object")) return u(p, l, h, y, w);
            if (l === null) return "null";
          }
          if (h.indexOf(l) !== -1) return r;
          let m = w;
          if (Array.isArray(l)) {
            if (l.length === 0) return "[]";
            if (o < h.length + 1) return '"[Array]"';
            h.push(l), (w += y);
            let x = `
${w}`,
              T = `,
${w}`,
              I = Math.min(l.length, s),
              N = 0;
            for (; N < I - 1; N++) {
              let M = u(String(N), l[N], h, y, w);
              (x += M !== void 0 ? M : "null"), (x += T);
            }
            let F = u(String(N), l[N], h, y, w);
            if (((x += F !== void 0 ? F : "null"), l.length - 1 > s)) {
              let M = l.length - s - 1;
              x += `${T}"... ${Ae(M)} not stringified"`;
            }
            return (
              (x += `
${m}`),
              h.pop(),
              `[${x}]`
            );
          }
          let g = Object.keys(l),
            S = g.length;
          if (S === 0) return "{}";
          if (o < h.length + 1) return '"[Object]"';
          w += y;
          let _ = `,
${w}`,
            R = "",
            A = "",
            v = Math.min(S, s);
          fn(l) && ((R += _s(l, _, s)), (g = g.slice(l.length)), (v -= l.length), (A = _)),
            i && (g = ln(g)),
            h.push(l);
          for (let x = 0; x < v; x++) {
            let T = g[x],
              I = u(T, l[T], h, y, w);
            I !== void 0 && ((R += `${A}${pe(T)}: ${I}`), (A = _));
          }
          if (S > s) {
            let x = S - s;
            (R += `${A}"...": "${Ae(x)} not stringified"`), (A = _);
          }
          return (
            A !== "" &&
              (R = `
${w}${R}
${m}`),
            h.pop(),
            `{${R}}`
          );
        }
        case "number":
          return isFinite(l) ? String(l) : t ? t(l) : "null";
        case "boolean":
          return l === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (n) return String(l);
        default:
          return t ? t(l) : void 0;
      }
    }
    function a(p, l, h) {
      switch (typeof l) {
        case "string":
          return pe(l);
        case "object": {
          if (l === null) return "null";
          if (typeof l.toJSON == "function") {
            if (((l = l.toJSON(p)), typeof l != "object")) return a(p, l, h);
            if (l === null) return "null";
          }
          if (h.indexOf(l) !== -1) return r;
          let y = "";
          if (Array.isArray(l)) {
            if (l.length === 0) return "[]";
            if (o < h.length + 1) return '"[Array]"';
            h.push(l);
            let _ = Math.min(l.length, s),
              R = 0;
            for (; R < _ - 1; R++) {
              let v = a(String(R), l[R], h);
              (y += v !== void 0 ? v : "null"), (y += ",");
            }
            let A = a(String(R), l[R], h);
            if (((y += A !== void 0 ? A : "null"), l.length - 1 > s)) {
              let v = l.length - s - 1;
              y += `,"... ${Ae(v)} not stringified"`;
            }
            return h.pop(), `[${y}]`;
          }
          let w = Object.keys(l),
            m = w.length;
          if (m === 0) return "{}";
          if (o < h.length + 1) return '"[Object]"';
          let g = "",
            S = Math.min(m, s);
          fn(l) && ((y += _s(l, ",", s)), (w = w.slice(l.length)), (S -= l.length), (g = ",")),
            i && (w = ln(w)),
            h.push(l);
          for (let _ = 0; _ < S; _++) {
            let R = w[_],
              A = a(R, l[R], h);
            A !== void 0 && ((y += `${g}${pe(R)}:${A}`), (g = ","));
          }
          if (m > s) {
            let _ = m - s;
            y += `${g}"...":"${Ae(_)} not stringified"`;
          }
          return h.pop(), `{${y}}`;
        }
        case "number":
          return isFinite(l) ? String(l) : t ? t(l) : "null";
        case "boolean":
          return l === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (n) return String(l);
        default:
          return t ? t(l) : void 0;
      }
    }
    function d(p, l, h) {
      if (arguments.length > 1) {
        let y = "";
        if (
          (typeof h == "number"
            ? (y = " ".repeat(Math.min(h, 10)))
            : typeof h == "string" && (y = h.slice(0, 10)),
          l != null)
        ) {
          if (typeof l == "function") return f("", { "": p }, [], l, y, "");
          if (Array.isArray(l)) return c("", p, [], ep(l), y, "");
        }
        if (y.length !== 0) return u("", p, [], y, "");
      }
      return a("", p, []);
    }
    return d;
  }
});
var Os = E((rS, Ts) => {
  "use strict";
  var cn = Symbol.for("pino.metadata"),
    { DEFAULT_LEVELS: xs } = Nt(),
    rp = xs.info;
  function np(e, t) {
    let r = 0;
    (e = e || []), (t = t || { dedupe: !1 });
    let n = Object.create(xs);
    (n.silent = 1 / 0),
      t.levels &&
        typeof t.levels == "object" &&
        Object.keys(t.levels).forEach((d) => {
          n[d] = t.levels[d];
        });
    let i = {
      write: o,
      add: c,
      emit: s,
      flushSync: f,
      end: u,
      minLevel: 0,
      streams: [],
      clone: a,
      [cn]: !0,
      streamLevels: n,
    };
    return Array.isArray(e) ? e.forEach(c, i) : c.call(i, e), (e = null), i;
    function o(d) {
      let p,
        l = this.lastLevel,
        { streams: h } = this,
        y = 0,
        w;
      for (let m = op(h.length, t.dedupe); lp(m, h.length, t.dedupe); m = sp(m, t.dedupe))
        if (((p = h[m]), p.level <= l)) {
          if (y !== 0 && y !== p.level) break;
          if (((w = p.stream), w[cn])) {
            let { lastTime: g, lastMsg: S, lastObj: _, lastLogger: R } = this;
            (w.lastLevel = l),
              (w.lastTime = g),
              (w.lastMsg = S),
              (w.lastObj = _),
              (w.lastLogger = R);
          }
          w.write(d), t.dedupe && (y = p.level);
        } else if (!t.dedupe) break;
    }
    function s(...d) {
      for (let { stream: p } of this.streams) typeof p.emit == "function" && p.emit(...d);
    }
    function f() {
      for (let { stream: d } of this.streams) typeof d.flushSync == "function" && d.flushSync();
    }
    function c(d) {
      if (!d) return i;
      let p = typeof d.write == "function" || d.stream,
        l = d.write ? d : d.stream;
      if (!p)
        throw Error(
          "stream object needs to implement either StreamEntry or DestinationStream interface",
        );
      let { streams: h, streamLevels: y } = this,
        w;
      typeof d.levelVal == "number"
        ? (w = d.levelVal)
        : typeof d.level == "string"
          ? (w = y[d.level])
          : typeof d.level == "number"
            ? (w = d.level)
            : (w = rp);
      let m = { stream: l, level: w, levelVal: void 0, id: r++ };
      return h.unshift(m), h.sort(ip), (this.minLevel = h[0].level), i;
    }
    function u() {
      for (let { stream: d } of this.streams)
        typeof d.flushSync == "function" && d.flushSync(), d.end();
    }
    function a(d) {
      let p = new Array(this.streams.length);
      for (let l = 0; l < p.length; l++) p[l] = { level: d, stream: this.streams[l].stream };
      return {
        write: o,
        add: c,
        minLevel: d,
        streams: p,
        clone: a,
        emit: s,
        flushSync: f,
        [cn]: !0,
      };
    }
  }
  function ip(e, t) {
    return e.level - t.level;
  }
  function op(e, t) {
    return t ? e - 1 : 0;
  }
  function sp(e, t) {
    return t ? e - 1 : e + 1;
  }
  function lp(e, t, r) {
    return r ? e >= 0 : e < t;
  }
  Ts.exports = np;
});
var Ws = E((nS, H) => {
  function $t(e) {
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
    "thread-stream-worker": $t("./thread-stream-worker.js"),
    "pino-worker": $t("./pino-worker.js"),
    "pino/file": $t("./pino-file.js"),
    "pino-pretty": $t("./pino-pretty.js"),
  };
  var fp = require("os"),
    js = vr(),
    up = Lr(),
    ap = Nr(),
    Ns = mo(),
    cp = ms(),
    Ms = Me(),
    { configure: dp } = As(),
    {
      assertDefaultLevelFound: hp,
      mappings: $s,
      genLsCache: pp,
      genLevelComparison: yp,
      assertLevelComparison: bp,
    } = tn(),
    { DEFAULT_LEVELS: gp, SORTING_ORDER: wp } = Nt(),
    {
      createArgsNormalizer: mp,
      asChindings: _p,
      buildSafeSonicBoom: vs,
      buildFormatters: Sp,
      stringify: dn,
      normalizeDestFileDescriptor: Ls,
      noop: Ep,
    } = jt(),
    { version: Rp } = rn(),
    {
      chindingsSym: ks,
      redactFmtSym: Ap,
      serializersSym: Is,
      timeSym: xp,
      timeSliceIndexSym: Tp,
      streamSym: Op,
      stringifySym: Ds,
      stringifySafeSym: hn,
      stringifiersSym: Ps,
      setLevelSym: vp,
      endSym: Lp,
      formatOptsSym: kp,
      messageKeySym: Ip,
      errorKeySym: Dp,
      nestedKeySym: Pp,
      mixinSym: qp,
      levelCompSym: jp,
      useOnlyCustomLevelsSym: Np,
      formattersSym: qs,
      hooksSym: Mp,
      nestedKeyStrSym: $p,
      mixinMergeStrategySym: Cp,
      msgPrefixSym: Wp,
    } = Ms,
    { epochTime: Cs, nullTime: Bp } = Ns,
    { pid: Fp } = process,
    Up = fp.hostname(),
    Vp = js.err,
    Gp = {
      level: "info",
      levelComparison: wp.ASC,
      levels: gp,
      messageKey: "msg",
      errorKey: "err",
      nestedKey: null,
      enabled: !0,
      base: { pid: Fp, hostname: Up },
      serializers: Object.assign(Object.create(null), { err: Vp }),
      formatters: Object.assign(Object.create(null), {
        bindings(e) {
          return e;
        },
        level(e, t) {
          return { level: t };
        },
      }),
      hooks: { logMethod: void 0 },
      timestamp: Cs,
      name: void 0,
      redact: null,
      customLevels: null,
      useOnlyCustomLevels: !1,
      depthLimit: 5,
      edgeLimit: 100,
    },
    zp = mp(Gp),
    Hp = Object.assign(Object.create(null), js);
  function pn(...e) {
    let t = {},
      { opts: r, stream: n } = zp(t, up(), ...e),
      {
        redact: i,
        crlf: o,
        serializers: s,
        timestamp: f,
        messageKey: c,
        errorKey: u,
        nestedKey: a,
        base: d,
        name: p,
        level: l,
        customLevels: h,
        levelComparison: y,
        mixin: w,
        mixinMergeStrategy: m,
        useOnlyCustomLevels: g,
        formatters: S,
        hooks: _,
        depthLimit: R,
        edgeLimit: A,
        onChild: v,
        msgPrefix: x,
      } = r,
      T = dp({ maximumDepth: R, maximumBreadth: A }),
      I = Sp(S.level, S.bindings, S.log),
      N = dn.bind({ [hn]: T }),
      F = i ? ap(i, N) : {},
      M = i ? { stringify: F[Ap] } : { stringify: N },
      Ne =
        "}" +
        (o
          ? `\r
`
          : `
`),
      Ti = _p.bind(null, { [ks]: "", [Is]: s, [Ps]: F, [Ds]: dn, [hn]: T, [qs]: I }),
      wr = "";
    d !== null && (p === void 0 ? (wr = Ti(d)) : (wr = Ti(Object.assign({}, d, { name: p }))));
    let Oi = f instanceof Function ? f : f ? Cs : Bp,
      na = Oi().indexOf(":") + 1;
    if (g && !h) throw Error("customLevels is required if useOnlyCustomLevels is set true");
    if (w && typeof w != "function")
      throw Error(`Unknown mixin type "${typeof w}" - expected "function"`);
    if (x && typeof x != "string")
      throw Error(`Unknown msgPrefix type "${typeof x}" - expected "string"`);
    hp(l, h, g);
    let vi = $s(h, g);
    typeof n.emit == "function" &&
      n.emit("message", {
        code: "PINO_CONFIG",
        config: { levels: vi, messageKey: c, errorKey: u },
      }),
      bp(y);
    let ia = yp(y);
    return (
      Object.assign(t, {
        levels: vi,
        [jp]: ia,
        [Np]: g,
        [Op]: n,
        [xp]: Oi,
        [Tp]: na,
        [Ds]: dn,
        [hn]: T,
        [Ps]: F,
        [Lp]: Ne,
        [kp]: M,
        [Ip]: c,
        [Dp]: u,
        [Pp]: a,
        [$p]: a ? `,${JSON.stringify(a)}:{` : "",
        [Is]: s,
        [qp]: w,
        [Cp]: m,
        [ks]: wr,
        [qs]: I,
        [Mp]: _,
        silent: Ep,
        onChild: v,
        [Wp]: x,
      }),
      Object.setPrototypeOf(t, cp()),
      pp(t),
      t[vp](l),
      t
    );
  }
  H.exports = pn;
  H.exports.destination = (e = process.stdout.fd) =>
    typeof e == "object"
      ? ((e.dest = Ls(e.dest || process.stdout.fd)), vs(e))
      : vs({ dest: Ls(e), minLength: 0 });
  H.exports.transport = Jr();
  H.exports.multistream = Os();
  H.exports.levels = $s();
  H.exports.stdSerializers = Hp;
  H.exports.stdTimeFunctions = Object.assign({}, Ns);
  H.exports.symbols = Ms;
  H.exports.version = Rp;
  H.exports.default = pn;
  H.exports.pino = pn;
});
var Vs = E((iS, Us) => {
  "use strict";
  var { Transform: Kp } = require("stream"),
    { StringDecoder: Jp } = require("string_decoder"),
    ye = Symbol("last"),
    Ct = Symbol("decoder");
  function Yp(e, t, r) {
    let n;
    if (this.overflow) {
      if (((n = this[Ct].write(e).split(this.matcher)), n.length === 1)) return r();
      n.shift(), (this.overflow = !1);
    } else (this[ye] += this[Ct].write(e)), (n = this[ye].split(this.matcher));
    this[ye] = n.pop();
    for (let i = 0; i < n.length; i++)
      try {
        Fs(this, this.mapper(n[i]));
      } catch (o) {
        return r(o);
      }
    if (((this.overflow = this[ye].length > this.maxLength), this.overflow && !this.skipOverflow)) {
      r(new Error("maximum buffer reached"));
      return;
    }
    r();
  }
  function Xp(e) {
    if (((this[ye] += this[Ct].end()), this[ye]))
      try {
        Fs(this, this.mapper(this[ye]));
      } catch (t) {
        return e(t);
      }
    e();
  }
  function Fs(e, t) {
    t !== void 0 && e.push(t);
  }
  function Bs(e) {
    return e;
  }
  function Qp(e, t, r) {
    switch (((e = e || /\r?\n/), (t = t || Bs), (r = r || {}), arguments.length)) {
      case 1:
        typeof e == "function"
          ? ((t = e), (e = /\r?\n/))
          : typeof e == "object" &&
            !(e instanceof RegExp) &&
            !e[Symbol.split] &&
            ((r = e), (e = /\r?\n/));
        break;
      case 2:
        typeof e == "function"
          ? ((r = t), (t = e), (e = /\r?\n/))
          : typeof t == "object" && ((r = t), (t = Bs));
    }
    (r = Object.assign({}, r)),
      (r.autoDestroy = !0),
      (r.transform = Yp),
      (r.flush = Xp),
      (r.readableObjectMode = !0);
    let n = new Kp(r);
    return (
      (n[ye] = ""),
      (n[Ct] = new Jp("utf8")),
      (n.matcher = e),
      (n.mapper = t),
      (n.maxLength = r.maxLength),
      (n.skipOverflow = r.skipOverflow || !1),
      (n.overflow = !1),
      (n._destroy = function (i, o) {
        (this._writableState.errorEmitted = !1), o(i);
      }),
      n
    );
  }
  Us.exports = Qp;
});
var q = E((oS, Gs) => {
  "use strict";
  Gs.exports = {
    ArrayIsArray(e) {
      return Array.isArray(e);
    },
    ArrayPrototypeIncludes(e, t) {
      return e.includes(t);
    },
    ArrayPrototypeIndexOf(e, t) {
      return e.indexOf(t);
    },
    ArrayPrototypeJoin(e, t) {
      return e.join(t);
    },
    ArrayPrototypeMap(e, t) {
      return e.map(t);
    },
    ArrayPrototypePop(e, t) {
      return e.pop(t);
    },
    ArrayPrototypePush(e, t) {
      return e.push(t);
    },
    ArrayPrototypeSlice(e, t, r) {
      return e.slice(t, r);
    },
    Error,
    FunctionPrototypeCall(e, t, ...r) {
      return e.call(t, ...r);
    },
    FunctionPrototypeSymbolHasInstance(e, t) {
      return Function.prototype[Symbol.hasInstance].call(e, t);
    },
    MathFloor: Math.floor,
    Number,
    NumberIsInteger: Number.isInteger,
    NumberIsNaN: Number.isNaN,
    NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
    NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
    NumberParseInt: Number.parseInt,
    ObjectDefineProperties(e, t) {
      return Object.defineProperties(e, t);
    },
    ObjectDefineProperty(e, t, r) {
      return Object.defineProperty(e, t, r);
    },
    ObjectGetOwnPropertyDescriptor(e, t) {
      return Object.getOwnPropertyDescriptor(e, t);
    },
    ObjectKeys(e) {
      return Object.keys(e);
    },
    ObjectSetPrototypeOf(e, t) {
      return Object.setPrototypeOf(e, t);
    },
    Promise,
    PromisePrototypeCatch(e, t) {
      return e.catch(t);
    },
    PromisePrototypeThen(e, t, r) {
      return e.then(t, r);
    },
    PromiseReject(e) {
      return Promise.reject(e);
    },
    PromiseResolve(e) {
      return Promise.resolve(e);
    },
    ReflectApply: Reflect.apply,
    RegExpPrototypeTest(e, t) {
      return e.test(t);
    },
    SafeSet: Set,
    String,
    StringPrototypeSlice(e, t, r) {
      return e.slice(t, r);
    },
    StringPrototypeToLowerCase(e) {
      return e.toLowerCase();
    },
    StringPrototypeToUpperCase(e) {
      return e.toUpperCase();
    },
    StringPrototypeTrim(e) {
      return e.trim();
    },
    Symbol,
    SymbolFor: Symbol.for,
    SymbolAsyncIterator: Symbol.asyncIterator,
    SymbolHasInstance: Symbol.hasInstance,
    SymbolIterator: Symbol.iterator,
    SymbolDispose: Symbol.dispose || Symbol("Symbol.dispose"),
    SymbolAsyncDispose: Symbol.asyncDispose || Symbol("Symbol.asyncDispose"),
    TypedArrayPrototypeSet(e, t, r) {
      return e.set(t, r);
    },
    Boolean,
    Uint8Array,
  };
});
var tl = E((ot, it) => {
  "use strict";
  Object.defineProperty(ot, "__esModule", { value: !0 });
  var Xs = new WeakMap(),
    yn = new WeakMap();
  function D(e) {
    let t = Xs.get(e);
    return console.assert(t != null, "'this' is expected an Event object, but got", e), t;
  }
  function zs(e) {
    if (e.passiveListener != null) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(
          "Unable to preventDefault inside passive event listener invocation.",
          e.passiveListener,
        );
      return;
    }
    e.event.cancelable &&
      ((e.canceled = !0), typeof e.event.preventDefault == "function" && e.event.preventDefault());
  }
  function We(e, t) {
    Xs.set(this, {
      eventTarget: e,
      event: t,
      eventPhase: 2,
      currentTarget: e,
      canceled: !1,
      stopped: !1,
      immediateStopped: !1,
      passiveListener: null,
      timeStamp: t.timeStamp || Date.now(),
    }),
      Object.defineProperty(this, "isTrusted", { value: !1, enumerable: !0 });
    let r = Object.keys(t);
    for (let n = 0; n < r.length; ++n) {
      let i = r[n];
      i in this || Object.defineProperty(this, i, Qs(i));
    }
  }
  We.prototype = {
    get type() {
      return D(this).event.type;
    },
    get target() {
      return D(this).eventTarget;
    },
    get currentTarget() {
      return D(this).currentTarget;
    },
    composedPath() {
      let e = D(this).currentTarget;
      return e == null ? [] : [e];
    },
    get NONE() {
      return 0;
    },
    get CAPTURING_PHASE() {
      return 1;
    },
    get AT_TARGET() {
      return 2;
    },
    get BUBBLING_PHASE() {
      return 3;
    },
    get eventPhase() {
      return D(this).eventPhase;
    },
    stopPropagation() {
      let e = D(this);
      (e.stopped = !0), typeof e.event.stopPropagation == "function" && e.event.stopPropagation();
    },
    stopImmediatePropagation() {
      let e = D(this);
      (e.stopped = !0),
        (e.immediateStopped = !0),
        typeof e.event.stopImmediatePropagation == "function" && e.event.stopImmediatePropagation();
    },
    get bubbles() {
      return !!D(this).event.bubbles;
    },
    get cancelable() {
      return !!D(this).event.cancelable;
    },
    preventDefault() {
      zs(D(this));
    },
    get defaultPrevented() {
      return D(this).canceled;
    },
    get composed() {
      return !!D(this).event.composed;
    },
    get timeStamp() {
      return D(this).timeStamp;
    },
    get srcElement() {
      return D(this).eventTarget;
    },
    get cancelBubble() {
      return D(this).stopped;
    },
    set cancelBubble(e) {
      if (!e) return;
      let t = D(this);
      (t.stopped = !0), typeof t.event.cancelBubble == "boolean" && (t.event.cancelBubble = !0);
    },
    get returnValue() {
      return !D(this).canceled;
    },
    set returnValue(e) {
      e || zs(D(this));
    },
    initEvent() {},
  };
  Object.defineProperty(We.prototype, "constructor", { value: We, configurable: !0, writable: !0 });
  typeof window < "u" &&
    typeof window.Event < "u" &&
    (Object.setPrototypeOf(We.prototype, window.Event.prototype),
    yn.set(window.Event.prototype, We));
  function Qs(e) {
    return {
      get() {
        return D(this).event[e];
      },
      set(t) {
        D(this).event[e] = t;
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  function Zp(e) {
    return {
      value() {
        let t = D(this).event;
        return t[e].apply(t, arguments);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  function ey(e, t) {
    let r = Object.keys(t);
    if (r.length === 0) return e;
    function n(i, o) {
      e.call(this, i, o);
    }
    n.prototype = Object.create(e.prototype, {
      constructor: { value: n, configurable: !0, writable: !0 },
    });
    for (let i = 0; i < r.length; ++i) {
      let o = r[i];
      if (!(o in e.prototype)) {
        let f = typeof Object.getOwnPropertyDescriptor(t, o).value == "function";
        Object.defineProperty(n.prototype, o, f ? Zp(o) : Qs(o));
      }
    }
    return n;
  }
  function Zs(e) {
    if (e == null || e === Object.prototype) return We;
    let t = yn.get(e);
    return t == null && ((t = ey(Zs(Object.getPrototypeOf(e)), e)), yn.set(e, t)), t;
  }
  function ty(e, t) {
    let r = Zs(Object.getPrototypeOf(t));
    return new r(e, t);
  }
  function ry(e) {
    return D(e).immediateStopped;
  }
  function ny(e, t) {
    D(e).eventPhase = t;
  }
  function iy(e, t) {
    D(e).currentTarget = t;
  }
  function Hs(e, t) {
    D(e).passiveListener = t;
  }
  var el = new WeakMap(),
    Ks = 1,
    Js = 2,
    Wt = 3;
  function Bt(e) {
    return e !== null && typeof e == "object";
  }
  function nt(e) {
    let t = el.get(e);
    if (t == null)
      throw new TypeError("'this' is expected an EventTarget object, but got another value.");
    return t;
  }
  function oy(e) {
    return {
      get() {
        let r = nt(this).get(e);
        for (; r != null; ) {
          if (r.listenerType === Wt) return r.listener;
          r = r.next;
        }
        return null;
      },
      set(t) {
        typeof t != "function" && !Bt(t) && (t = null);
        let r = nt(this),
          n = null,
          i = r.get(e);
        for (; i != null; )
          i.listenerType === Wt
            ? n !== null
              ? (n.next = i.next)
              : i.next !== null
                ? r.set(e, i.next)
                : r.delete(e)
            : (n = i),
            (i = i.next);
        if (t !== null) {
          let o = { listener: t, listenerType: Wt, passive: !1, once: !1, next: null };
          n === null ? r.set(e, o) : (n.next = o);
        }
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  function bn(e, t) {
    Object.defineProperty(e, `on${t}`, oy(t));
  }
  function Ys(e) {
    function t() {
      Q.call(this);
    }
    t.prototype = Object.create(Q.prototype, {
      constructor: { value: t, configurable: !0, writable: !0 },
    });
    for (let r = 0; r < e.length; ++r) bn(t.prototype, e[r]);
    return t;
  }
  function Q() {
    if (this instanceof Q) {
      el.set(this, new Map());
      return;
    }
    if (arguments.length === 1 && Array.isArray(arguments[0])) return Ys(arguments[0]);
    if (arguments.length > 0) {
      let e = new Array(arguments.length);
      for (let t = 0; t < arguments.length; ++t) e[t] = arguments[t];
      return Ys(e);
    }
    throw new TypeError("Cannot call a class as a function");
  }
  Q.prototype = {
    addEventListener(e, t, r) {
      if (t == null) return;
      if (typeof t != "function" && !Bt(t))
        throw new TypeError("'listener' should be a function or an object.");
      let n = nt(this),
        i = Bt(r),
        s = (i ? !!r.capture : !!r) ? Ks : Js,
        f = {
          listener: t,
          listenerType: s,
          passive: i && !!r.passive,
          once: i && !!r.once,
          next: null,
        },
        c = n.get(e);
      if (c === void 0) {
        n.set(e, f);
        return;
      }
      let u = null;
      for (; c != null; ) {
        if (c.listener === t && c.listenerType === s) return;
        (u = c), (c = c.next);
      }
      u.next = f;
    },
    removeEventListener(e, t, r) {
      if (t == null) return;
      let n = nt(this),
        o = (Bt(r) ? !!r.capture : !!r) ? Ks : Js,
        s = null,
        f = n.get(e);
      for (; f != null; ) {
        if (f.listener === t && f.listenerType === o) {
          s !== null ? (s.next = f.next) : f.next !== null ? n.set(e, f.next) : n.delete(e);
          return;
        }
        (s = f), (f = f.next);
      }
    },
    dispatchEvent(e) {
      if (e == null || typeof e.type != "string")
        throw new TypeError('"event.type" should be a string.');
      let t = nt(this),
        r = e.type,
        n = t.get(r);
      if (n == null) return !0;
      let i = ty(this, e),
        o = null;
      for (; n != null; ) {
        if (
          (n.once
            ? o !== null
              ? (o.next = n.next)
              : n.next !== null
                ? t.set(r, n.next)
                : t.delete(r)
            : (o = n),
          Hs(i, n.passive ? n.listener : null),
          typeof n.listener == "function")
        )
          try {
            n.listener.call(this, i);
          } catch (s) {
            typeof console < "u" && typeof console.error == "function" && console.error(s);
          }
        else
          n.listenerType !== Wt &&
            typeof n.listener.handleEvent == "function" &&
            n.listener.handleEvent(i);
        if (ry(i)) break;
        n = n.next;
      }
      return Hs(i, null), ny(i, 0), iy(i, null), !i.defaultPrevented;
    },
  };
  Object.defineProperty(Q.prototype, "constructor", { value: Q, configurable: !0, writable: !0 });
  typeof window < "u" &&
    typeof window.EventTarget < "u" &&
    Object.setPrototypeOf(Q.prototype, window.EventTarget.prototype);
  ot.defineEventAttribute = bn;
  ot.EventTarget = Q;
  ot.default = Q;
  it.exports = Q;
  it.exports.EventTarget = it.exports.default = Q;
  it.exports.defineEventAttribute = bn;
});
var Be = E((lt, st) => {
  "use strict";
  Object.defineProperty(lt, "__esModule", { value: !0 });
  var gn = tl(),
    be = class extends gn.EventTarget {
      constructor() {
        throw (super(), new TypeError("AbortSignal cannot be constructed directly"));
      }
      get aborted() {
        let t = Ft.get(this);
        if (typeof t != "boolean")
          throw new TypeError(
            `Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`,
          );
        return t;
      }
    };
  gn.defineEventAttribute(be.prototype, "abort");
  function sy() {
    let e = Object.create(be.prototype);
    return gn.EventTarget.call(e), Ft.set(e, !1), e;
  }
  function ly(e) {
    Ft.get(e) === !1 && (Ft.set(e, !0), e.dispatchEvent({ type: "abort" }));
  }
  var Ft = new WeakMap();
  Object.defineProperties(be.prototype, { aborted: { enumerable: !0 } });
  typeof Symbol == "function" &&
    typeof Symbol.toStringTag == "symbol" &&
    Object.defineProperty(be.prototype, Symbol.toStringTag, {
      configurable: !0,
      value: "AbortSignal",
    });
  var ge = class {
      constructor() {
        nl.set(this, sy());
      }
      get signal() {
        return rl(this);
      }
      abort() {
        ly(rl(this));
      }
    },
    nl = new WeakMap();
  function rl(e) {
    let t = nl.get(e);
    if (t == null)
      throw new TypeError(
        `Expected 'this' to be an 'AbortController' object, but got ${e === null ? "null" : typeof e}`,
      );
    return t;
  }
  Object.defineProperties(ge.prototype, { signal: { enumerable: !0 }, abort: { enumerable: !0 } });
  typeof Symbol == "function" &&
    typeof Symbol.toStringTag == "symbol" &&
    Object.defineProperty(ge.prototype, Symbol.toStringTag, {
      configurable: !0,
      value: "AbortController",
    });
  lt.AbortController = ge;
  lt.AbortSignal = be;
  lt.default = ge;
  st.exports = ge;
  st.exports.AbortController = st.exports.default = ge;
  st.exports.AbortSignal = be;
});
var U = E((sS, mn) => {
  "use strict";
  var fy = require("buffer"),
    { kResistStopPropagation: uy, SymbolDispose: ay } = q(),
    cy = globalThis.AbortSignal || Be().AbortSignal,
    dy = globalThis.AbortController || Be().AbortController,
    hy = Object.getPrototypeOf(async function () {}).constructor,
    il = globalThis.Blob || fy.Blob,
    py =
      typeof il < "u"
        ? function (t) {
            return t instanceof il;
          }
        : function (t) {
            return !1;
          },
    ol = (e, t) => {
      if (e !== void 0 && (e === null || typeof e != "object" || !("aborted" in e)))
        throw new ERR_INVALID_ARG_TYPE(t, "AbortSignal", e);
    },
    yy = (e, t) => {
      if (typeof e != "function") throw new ERR_INVALID_ARG_TYPE(t, "Function", e);
    },
    wn = class extends Error {
      constructor(t) {
        if (!Array.isArray(t))
          throw new TypeError(`Expected input to be an Array, got ${typeof t}`);
        let r = "";
        for (let n = 0; n < t.length; n++)
          r += `    ${t[n].stack}
`;
        super(r), (this.name = "AggregateError"), (this.errors = t);
      }
    };
  mn.exports = {
    AggregateError: wn,
    kEmptyObject: Object.freeze({}),
    once(e) {
      let t = !1;
      return function (...r) {
        t || ((t = !0), e.apply(this, r));
      };
    },
    createDeferredPromise: function () {
      let e, t;
      return {
        promise: new Promise((n, i) => {
          (e = n), (t = i);
        }),
        resolve: e,
        reject: t,
      };
    },
    promisify(e) {
      return new Promise((t, r) => {
        e((n, ...i) => (n ? r(n) : t(...i)));
      });
    },
    debuglog() {
      return function () {};
    },
    format(e, ...t) {
      return e.replace(/%([sdifj])/g, function (...[r, n]) {
        let i = t.shift();
        return n === "f"
          ? i.toFixed(6)
          : n === "j"
            ? JSON.stringify(i)
            : n === "s" && typeof i == "object"
              ? `${i.constructor !== Object ? i.constructor.name : ""} {}`.trim()
              : i.toString();
      });
    },
    inspect(e) {
      switch (typeof e) {
        case "string":
          if (e.includes("'"))
            if (e.includes('"')) {
              if (!e.includes("`") && !e.includes("${")) return `\`${e}\``;
            } else return `"${e}"`;
          return `'${e}'`;
        case "number":
          return isNaN(e) ? "NaN" : Object.is(e, -0) ? String(e) : e;
        case "bigint":
          return `${String(e)}n`;
        case "boolean":
        case "undefined":
          return String(e);
        case "object":
          return "{}";
      }
    },
    types: {
      isAsyncFunction(e) {
        return e instanceof hy;
      },
      isArrayBufferView(e) {
        return ArrayBuffer.isView(e);
      },
    },
    isBlob: py,
    deprecate(e, t) {
      return e;
    },
    addAbortListener:
      require("events").addAbortListener ||
      function (t, r) {
        if (t === void 0) throw new ERR_INVALID_ARG_TYPE("signal", "AbortSignal", t);
        ol(t, "signal"), yy(r, "listener");
        let n;
        return (
          t.aborted
            ? queueMicrotask(() => r())
            : (t.addEventListener("abort", r, { __proto__: null, once: !0, [uy]: !0 }),
              (n = () => {
                t.removeEventListener("abort", r);
              })),
          {
            __proto__: null,
            [ay]() {
              var i;
              (i = n) === null || i === void 0 || i();
            },
          }
        );
      },
    AbortSignalAny:
      cy.any ||
      function (t) {
        if (t.length === 1) return t[0];
        let r = new dy(),
          n = () => r.abort();
        return (
          t.forEach((i) => {
            ol(i, "signals"), i.addEventListener("abort", n, { once: !0 });
          }),
          r.signal.addEventListener(
            "abort",
            () => {
              t.forEach((i) => i.removeEventListener("abort", n));
            },
            { once: !0 },
          ),
          r.signal
        );
      },
  };
  mn.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom");
});
var G = E((lS, fl) => {
  "use strict";
  var { format: by, inspect: Ut, AggregateError: gy } = U(),
    wy = globalThis.AggregateError || gy,
    my = Symbol("kIsNodeError"),
    _y = [
      "string",
      "function",
      "number",
      "object",
      "Function",
      "Object",
      "boolean",
      "bigint",
      "symbol",
    ],
    Sy = /^([A-Z][a-z0-9]*)+$/,
    Ey = "__node_internal_",
    Vt = {};
  function Te(e, t) {
    if (!e) throw new Vt.ERR_INTERNAL_ASSERTION(t);
  }
  function sl(e) {
    let t = "",
      r = e.length,
      n = e[0] === "-" ? 1 : 0;
    for (; r >= n + 4; r -= 3) t = `_${e.slice(r - 3, r)}${t}`;
    return `${e.slice(0, r)}${t}`;
  }
  function Ry(e, t, r) {
    if (typeof t == "function")
      return (
        Te(
          t.length <= r.length,
          `Code: ${e}; The provided arguments length (${r.length}) does not match the required ones (${t.length}).`,
        ),
        t(...r)
      );
    let n = (t.match(/%[dfijoOs]/g) || []).length;
    return (
      Te(
        n === r.length,
        `Code: ${e}; The provided arguments length (${r.length}) does not match the required ones (${n}).`,
      ),
      r.length === 0 ? t : by(t, ...r)
    );
  }
  function B(e, t, r) {
    r || (r = Error);
    class n extends r {
      constructor(...o) {
        super(Ry(e, t, o));
      }
      toString() {
        return `${this.name} [${e}]: ${this.message}`;
      }
    }
    Object.defineProperties(n.prototype, {
      name: { value: r.name, writable: !0, enumerable: !1, configurable: !0 },
      toString: {
        value() {
          return `${this.name} [${e}]: ${this.message}`;
        },
        writable: !0,
        enumerable: !1,
        configurable: !0,
      },
    }),
      (n.prototype.code = e),
      (n.prototype[my] = !0),
      (Vt[e] = n);
  }
  function ll(e) {
    let t = Ey + e.name;
    return Object.defineProperty(e, "name", { value: t }), e;
  }
  function Ay(e, t) {
    if (e && t && e !== t) {
      if (Array.isArray(t.errors)) return t.errors.push(e), t;
      let r = new wy([t, e], t.message);
      return (r.code = t.code), r;
    }
    return e || t;
  }
  var _n = class extends Error {
    constructor(t = "The operation was aborted", r = void 0) {
      if (r !== void 0 && typeof r != "object")
        throw new Vt.ERR_INVALID_ARG_TYPE("options", "Object", r);
      super(t, r), (this.code = "ABORT_ERR"), (this.name = "AbortError");
    }
  };
  B("ERR_ASSERTION", "%s", Error);
  B(
    "ERR_INVALID_ARG_TYPE",
    (e, t, r) => {
      Te(typeof e == "string", "'name' must be a string"), Array.isArray(t) || (t = [t]);
      let n = "The ";
      e.endsWith(" argument")
        ? (n += `${e} `)
        : (n += `"${e}" ${e.includes(".") ? "property" : "argument"} `),
        (n += "must be ");
      let i = [],
        o = [],
        s = [];
      for (let c of t)
        Te(typeof c == "string", "All expected entries have to be of type string"),
          _y.includes(c)
            ? i.push(c.toLowerCase())
            : Sy.test(c)
              ? o.push(c)
              : (Te(c !== "object", 'The value "object" should be written as "Object"'), s.push(c));
      if (o.length > 0) {
        let c = i.indexOf("object");
        c !== -1 && (i.splice(i, c, 1), o.push("Object"));
      }
      if (i.length > 0) {
        switch (i.length) {
          case 1:
            n += `of type ${i[0]}`;
            break;
          case 2:
            n += `one of type ${i[0]} or ${i[1]}`;
            break;
          default: {
            let c = i.pop();
            n += `one of type ${i.join(", ")}, or ${c}`;
          }
        }
        (o.length > 0 || s.length > 0) && (n += " or ");
      }
      if (o.length > 0) {
        switch (o.length) {
          case 1:
            n += `an instance of ${o[0]}`;
            break;
          case 2:
            n += `an instance of ${o[0]} or ${o[1]}`;
            break;
          default: {
            let c = o.pop();
            n += `an instance of ${o.join(", ")}, or ${c}`;
          }
        }
        s.length > 0 && (n += " or ");
      }
      switch (s.length) {
        case 0:
          break;
        case 1:
          s[0].toLowerCase() !== s[0] && (n += "an "), (n += `${s[0]}`);
          break;
        case 2:
          n += `one of ${s[0]} or ${s[1]}`;
          break;
        default: {
          let c = s.pop();
          n += `one of ${s.join(", ")}, or ${c}`;
        }
      }
      if (r == null) n += `. Received ${r}`;
      else if (typeof r == "function" && r.name) n += `. Received function ${r.name}`;
      else if (typeof r == "object") {
        var f;
        if ((f = r.constructor) !== null && f !== void 0 && f.name)
          n += `. Received an instance of ${r.constructor.name}`;
        else {
          let c = Ut(r, { depth: -1 });
          n += `. Received ${c}`;
        }
      } else {
        let c = Ut(r, { colors: !1 });
        c.length > 25 && (c = `${c.slice(0, 25)}...`), (n += `. Received type ${typeof r} (${c})`);
      }
      return n;
    },
    TypeError,
  );
  B(
    "ERR_INVALID_ARG_VALUE",
    (e, t, r = "is invalid") => {
      let n = Ut(t);
      return (
        n.length > 128 && (n = n.slice(0, 128) + "..."),
        `The ${e.includes(".") ? "property" : "argument"} '${e}' ${r}. Received ${n}`
      );
    },
    TypeError,
  );
  B(
    "ERR_INVALID_RETURN_VALUE",
    (e, t, r) => {
      var n;
      let i =
        r != null && (n = r.constructor) !== null && n !== void 0 && n.name
          ? `instance of ${r.constructor.name}`
          : `type ${typeof r}`;
      return `Expected ${e} to be returned from the "${t}" function but got ${i}.`;
    },
    TypeError,
  );
  B(
    "ERR_MISSING_ARGS",
    (...e) => {
      Te(e.length > 0, "At least one arg needs to be specified");
      let t,
        r = e.length;
      switch (((e = (Array.isArray(e) ? e : [e]).map((n) => `"${n}"`).join(" or ")), r)) {
        case 1:
          t += `The ${e[0]} argument`;
          break;
        case 2:
          t += `The ${e[0]} and ${e[1]} arguments`;
          break;
        default:
          {
            let n = e.pop();
            t += `The ${e.join(", ")}, and ${n} arguments`;
          }
          break;
      }
      return `${t} must be specified`;
    },
    TypeError,
  );
  B(
    "ERR_OUT_OF_RANGE",
    (e, t, r) => {
      Te(t, 'Missing "range" argument');
      let n;
      return (
        Number.isInteger(r) && Math.abs(r) > 2 ** 32
          ? (n = sl(String(r)))
          : typeof r == "bigint"
            ? ((n = String(r)), (r > 2n ** 32n || r < -(2n ** 32n)) && (n = sl(n)), (n += "n"))
            : (n = Ut(r)),
        `The value of "${e}" is out of range. It must be ${t}. Received ${n}`
      );
    },
    RangeError,
  );
  B("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
  B("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
  B("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error);
  B("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
  B("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
  B("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
  B("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
  B("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
  B("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error);
  B("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
  B("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
  fl.exports = { AbortError: _n, aggregateTwoErrors: ll(Ay), hideStackFrames: ll, codes: Vt };
});
var Ue = E((fS, wl) => {
  "use strict";
  var {
      ArrayIsArray: En,
      ArrayPrototypeIncludes: dl,
      ArrayPrototypeJoin: hl,
      ArrayPrototypeMap: xy,
      NumberIsInteger: Rn,
      NumberIsNaN: Ty,
      NumberMAX_SAFE_INTEGER: Oy,
      NumberMIN_SAFE_INTEGER: vy,
      NumberParseInt: Ly,
      ObjectPrototypeHasOwnProperty: ky,
      RegExpPrototypeExec: pl,
      String: Iy,
      StringPrototypeToUpperCase: Dy,
      StringPrototypeTrim: Py,
    } = q(),
    {
      hideStackFrames: K,
      codes: {
        ERR_SOCKET_BAD_PORT: qy,
        ERR_INVALID_ARG_TYPE: V,
        ERR_INVALID_ARG_VALUE: Fe,
        ERR_OUT_OF_RANGE: Oe,
        ERR_UNKNOWN_SIGNAL: ul,
      },
    } = G(),
    { normalizeEncoding: jy } = U(),
    { isAsyncFunction: Ny, isArrayBufferView: My } = U().types,
    al = {};
  function $y(e) {
    return e === (e | 0);
  }
  function Cy(e) {
    return e === e >>> 0;
  }
  var Wy = /^[0-7]+$/,
    By = "must be a 32-bit unsigned integer or an octal string";
  function Fy(e, t, r) {
    if ((typeof e > "u" && (e = r), typeof e == "string")) {
      if (pl(Wy, e) === null) throw new Fe(t, e, By);
      e = Ly(e, 8);
    }
    return yl(e, t), e;
  }
  var Uy = K((e, t, r = vy, n = Oy) => {
      if (typeof e != "number") throw new V(t, "number", e);
      if (!Rn(e)) throw new Oe(t, "an integer", e);
      if (e < r || e > n) throw new Oe(t, `>= ${r} && <= ${n}`, e);
    }),
    Vy = K((e, t, r = -2147483648, n = 2147483647) => {
      if (typeof e != "number") throw new V(t, "number", e);
      if (!Rn(e)) throw new Oe(t, "an integer", e);
      if (e < r || e > n) throw new Oe(t, `>= ${r} && <= ${n}`, e);
    }),
    yl = K((e, t, r = !1) => {
      if (typeof e != "number") throw new V(t, "number", e);
      if (!Rn(e)) throw new Oe(t, "an integer", e);
      let n = r ? 1 : 0,
        i = 4294967295;
      if (e < n || e > i) throw new Oe(t, `>= ${n} && <= ${i}`, e);
    });
  function An(e, t) {
    if (typeof e != "string") throw new V(t, "string", e);
  }
  function Gy(e, t, r = void 0, n) {
    if (typeof e != "number") throw new V(t, "number", e);
    if ((r != null && e < r) || (n != null && e > n) || ((r != null || n != null) && Ty(e)))
      throw new Oe(
        t,
        `${r != null ? `>= ${r}` : ""}${r != null && n != null ? " && " : ""}${n != null ? `<= ${n}` : ""}`,
        e,
      );
  }
  var zy = K((e, t, r) => {
    if (!dl(r, e)) {
      let i =
        "must be one of: " +
        hl(
          xy(r, (o) => (typeof o == "string" ? `'${o}'` : Iy(o))),
          ", ",
        );
      throw new Fe(t, e, i);
    }
  });
  function bl(e, t) {
    if (typeof e != "boolean") throw new V(t, "boolean", e);
  }
  function Sn(e, t, r) {
    return e == null || !ky(e, t) ? r : e[t];
  }
  var Hy = K((e, t, r = null) => {
      let n = Sn(r, "allowArray", !1),
        i = Sn(r, "allowFunction", !1);
      if (
        (!Sn(r, "nullable", !1) && e === null) ||
        (!n && En(e)) ||
        (typeof e != "object" && (!i || typeof e != "function"))
      )
        throw new V(t, "Object", e);
    }),
    Ky = K((e, t) => {
      if (e != null && typeof e != "object" && typeof e != "function")
        throw new V(t, "a dictionary", e);
    }),
    Gt = K((e, t, r = 0) => {
      if (!En(e)) throw new V(t, "Array", e);
      if (e.length < r) {
        let n = `must be longer than ${r}`;
        throw new Fe(t, e, n);
      }
    });
  function Jy(e, t) {
    Gt(e, t);
    for (let r = 0; r < e.length; r++) An(e[r], `${t}[${r}]`);
  }
  function Yy(e, t) {
    Gt(e, t);
    for (let r = 0; r < e.length; r++) bl(e[r], `${t}[${r}]`);
  }
  function Xy(e, t) {
    Gt(e, t);
    for (let r = 0; r < e.length; r++) {
      let n = e[r],
        i = `${t}[${r}]`;
      if (n == null) throw new V(i, "AbortSignal", n);
      gl(n, i);
    }
  }
  function Qy(e, t = "signal") {
    if ((An(e, t), al[e] === void 0))
      throw al[Dy(e)] !== void 0
        ? new ul(e + " (signals must use all capital letters)")
        : new ul(e);
  }
  var Zy = K((e, t = "buffer") => {
    if (!My(e)) throw new V(t, ["Buffer", "TypedArray", "DataView"], e);
  });
  function eb(e, t) {
    let r = jy(t),
      n = e.length;
    if (r === "hex" && n % 2 !== 0)
      throw new Fe("encoding", t, `is invalid for data of length ${n}`);
  }
  function tb(e, t = "Port", r = !0) {
    if (
      (typeof e != "number" && typeof e != "string") ||
      (typeof e == "string" && Py(e).length === 0) ||
      +e !== +e >>> 0 ||
      e > 65535 ||
      (e === 0 && !r)
    )
      throw new qy(t, e, r);
    return e | 0;
  }
  var gl = K((e, t) => {
      if (e !== void 0 && (e === null || typeof e != "object" || !("aborted" in e)))
        throw new V(t, "AbortSignal", e);
    }),
    rb = K((e, t) => {
      if (typeof e != "function") throw new V(t, "Function", e);
    }),
    nb = K((e, t) => {
      if (typeof e != "function" || Ny(e)) throw new V(t, "Function", e);
    }),
    ib = K((e, t) => {
      if (e !== void 0) throw new V(t, "undefined", e);
    });
  function ob(e, t, r) {
    if (!dl(r, e)) throw new V(t, `('${hl(r, "|")}')`, e);
  }
  var sb = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
  function cl(e, t) {
    if (typeof e > "u" || !pl(sb, e))
      throw new Fe(
        t,
        e,
        'must be an array or string of format "</styles.css>; rel=preload; as=style"',
      );
  }
  function lb(e) {
    if (typeof e == "string") return cl(e, "hints"), e;
    if (En(e)) {
      let t = e.length,
        r = "";
      if (t === 0) return r;
      for (let n = 0; n < t; n++) {
        let i = e[n];
        cl(i, "hints"), (r += i), n !== t - 1 && (r += ", ");
      }
      return r;
    }
    throw new Fe(
      "hints",
      e,
      'must be an array or string of format "</styles.css>; rel=preload; as=style"',
    );
  }
  wl.exports = {
    isInt32: $y,
    isUint32: Cy,
    parseFileMode: Fy,
    validateArray: Gt,
    validateStringArray: Jy,
    validateBooleanArray: Yy,
    validateAbortSignalArray: Xy,
    validateBoolean: bl,
    validateBuffer: Zy,
    validateDictionary: Ky,
    validateEncoding: eb,
    validateFunction: rb,
    validateInt32: Vy,
    validateInteger: Uy,
    validateNumber: Gy,
    validateObject: Hy,
    validateOneOf: zy,
    validatePlainFunction: nb,
    validatePort: tb,
    validateSignalName: Qy,
    validateString: An,
    validateUint32: yl,
    validateUndefined: ib,
    validateUnion: ob,
    validateAbortSignal: gl,
    validateLinkHeaderValue: lb,
  };
});
var we = E((uS, ml) => {
  ml.exports = global.process;
});
var oe = E((aS, ql) => {
  "use strict";
  var { SymbolAsyncIterator: _l, SymbolIterator: Sl, SymbolFor: ve } = q(),
    El = ve("nodejs.stream.destroyed"),
    Rl = ve("nodejs.stream.errored"),
    xn = ve("nodejs.stream.readable"),
    Tn = ve("nodejs.stream.writable"),
    Al = ve("nodejs.stream.disturbed"),
    fb = ve("nodejs.webstream.isClosedPromise"),
    ub = ve("nodejs.webstream.controllerErrorFunction");
  function zt(e, t = !1) {
    var r;
    return !!(
      e &&
      typeof e.pipe == "function" &&
      typeof e.on == "function" &&
      (!t || (typeof e.pause == "function" && typeof e.resume == "function")) &&
      (!e._writableState ||
        ((r = e._readableState) === null || r === void 0 ? void 0 : r.readable) !== !1) &&
      (!e._writableState || e._readableState)
    );
  }
  function Ht(e) {
    var t;
    return !!(
      e &&
      typeof e.write == "function" &&
      typeof e.on == "function" &&
      (!e._readableState ||
        ((t = e._writableState) === null || t === void 0 ? void 0 : t.writable) !== !1)
    );
  }
  function ab(e) {
    return !!(
      e &&
      typeof e.pipe == "function" &&
      e._readableState &&
      typeof e.on == "function" &&
      typeof e.write == "function"
    );
  }
  function ie(e) {
    return (
      e &&
      (e._readableState ||
        e._writableState ||
        (typeof e.write == "function" && typeof e.on == "function") ||
        (typeof e.pipe == "function" && typeof e.on == "function"))
    );
  }
  function xl(e) {
    return !!(
      e &&
      !ie(e) &&
      typeof e.pipeThrough == "function" &&
      typeof e.getReader == "function" &&
      typeof e.cancel == "function"
    );
  }
  function Tl(e) {
    return !!(e && !ie(e) && typeof e.getWriter == "function" && typeof e.abort == "function");
  }
  function Ol(e) {
    return !!(e && !ie(e) && typeof e.readable == "object" && typeof e.writable == "object");
  }
  function cb(e) {
    return xl(e) || Tl(e) || Ol(e);
  }
  function db(e, t) {
    return e == null
      ? !1
      : t === !0
        ? typeof e[_l] == "function"
        : t === !1
          ? typeof e[Sl] == "function"
          : typeof e[_l] == "function" || typeof e[Sl] == "function";
  }
  function Kt(e) {
    if (!ie(e)) return null;
    let t = e._writableState,
      r = e._readableState,
      n = t || r;
    return !!(e.destroyed || e[El] || (n != null && n.destroyed));
  }
  function vl(e) {
    if (!Ht(e)) return null;
    if (e.writableEnded === !0) return !0;
    let t = e._writableState;
    return t != null && t.errored ? !1 : typeof t?.ended != "boolean" ? null : t.ended;
  }
  function hb(e, t) {
    if (!Ht(e)) return null;
    if (e.writableFinished === !0) return !0;
    let r = e._writableState;
    return r != null && r.errored
      ? !1
      : typeof r?.finished != "boolean"
        ? null
        : !!(r.finished || (t === !1 && r.ended === !0 && r.length === 0));
  }
  function pb(e) {
    if (!zt(e)) return null;
    if (e.readableEnded === !0) return !0;
    let t = e._readableState;
    return !t || t.errored ? !1 : typeof t?.ended != "boolean" ? null : t.ended;
  }
  function Ll(e, t) {
    if (!zt(e)) return null;
    let r = e._readableState;
    return r != null && r.errored
      ? !1
      : typeof r?.endEmitted != "boolean"
        ? null
        : !!(r.endEmitted || (t === !1 && r.ended === !0 && r.length === 0));
  }
  function kl(e) {
    return e && e[xn] != null
      ? e[xn]
      : typeof e?.readable != "boolean"
        ? null
        : Kt(e)
          ? !1
          : zt(e) && e.readable && !Ll(e);
  }
  function Il(e) {
    return e && e[Tn] != null
      ? e[Tn]
      : typeof e?.writable != "boolean"
        ? null
        : Kt(e)
          ? !1
          : Ht(e) && e.writable && !vl(e);
  }
  function yb(e, t) {
    return ie(e)
      ? Kt(e)
        ? !0
        : !((t?.readable !== !1 && kl(e)) || (t?.writable !== !1 && Il(e)))
      : null;
  }
  function bb(e) {
    var t, r;
    return ie(e)
      ? e.writableErrored
        ? e.writableErrored
        : (t = (r = e._writableState) === null || r === void 0 ? void 0 : r.errored) !== null &&
            t !== void 0
          ? t
          : null
      : null;
  }
  function gb(e) {
    var t, r;
    return ie(e)
      ? e.readableErrored
        ? e.readableErrored
        : (t = (r = e._readableState) === null || r === void 0 ? void 0 : r.errored) !== null &&
            t !== void 0
          ? t
          : null
      : null;
  }
  function wb(e) {
    if (!ie(e)) return null;
    if (typeof e.closed == "boolean") return e.closed;
    let t = e._writableState,
      r = e._readableState;
    return typeof t?.closed == "boolean" || typeof r?.closed == "boolean"
      ? t?.closed || r?.closed
      : typeof e._closed == "boolean" && Dl(e)
        ? e._closed
        : null;
  }
  function Dl(e) {
    return (
      typeof e._closed == "boolean" &&
      typeof e._defaultKeepAlive == "boolean" &&
      typeof e._removedConnection == "boolean" &&
      typeof e._removedContLen == "boolean"
    );
  }
  function Pl(e) {
    return typeof e._sent100 == "boolean" && Dl(e);
  }
  function mb(e) {
    var t;
    return (
      typeof e._consuming == "boolean" &&
      typeof e._dumped == "boolean" &&
      ((t = e.req) === null || t === void 0 ? void 0 : t.upgradeOrConnect) === void 0
    );
  }
  function _b(e) {
    if (!ie(e)) return null;
    let t = e._writableState,
      r = e._readableState,
      n = t || r;
    return (!n && Pl(e)) || !!(n && n.autoDestroy && n.emitClose && n.closed === !1);
  }
  function Sb(e) {
    var t;
    return !!(
      e && ((t = e[Al]) !== null && t !== void 0 ? t : e.readableDidRead || e.readableAborted)
    );
  }
  function Eb(e) {
    var t, r, n, i, o, s, f, c, u, a;
    return !!(
      e &&
      ((t =
        (r =
          (n =
            (i =
              (o = (s = e[Rl]) !== null && s !== void 0 ? s : e.readableErrored) !== null &&
              o !== void 0
                ? o
                : e.writableErrored) !== null && i !== void 0
              ? i
              : (f = e._readableState) === null || f === void 0
                ? void 0
                : f.errorEmitted) !== null && n !== void 0
            ? n
            : (c = e._writableState) === null || c === void 0
              ? void 0
              : c.errorEmitted) !== null && r !== void 0
          ? r
          : (u = e._readableState) === null || u === void 0
            ? void 0
            : u.errored) !== null && t !== void 0
        ? t
        : !((a = e._writableState) === null || a === void 0) && a.errored)
    );
  }
  ql.exports = {
    isDestroyed: Kt,
    kIsDestroyed: El,
    isDisturbed: Sb,
    kIsDisturbed: Al,
    isErrored: Eb,
    kIsErrored: Rl,
    isReadable: kl,
    kIsReadable: xn,
    kIsClosedPromise: fb,
    kControllerErrorFunction: ub,
    kIsWritable: Tn,
    isClosed: wb,
    isDuplexNodeStream: ab,
    isFinished: yb,
    isIterable: db,
    isReadableNodeStream: zt,
    isReadableStream: xl,
    isReadableEnded: pb,
    isReadableFinished: Ll,
    isReadableErrored: gb,
    isNodeStream: ie,
    isWebStream: cb,
    isWritable: Il,
    isWritableNodeStream: Ht,
    isWritableStream: Tl,
    isWritableEnded: vl,
    isWritableFinished: hb,
    isWritableErrored: bb,
    isServerRequest: mb,
    isServerResponse: Pl,
    willEmitClose: _b,
    isTransformStream: Ol,
  };
});
var ae = E((cS, In) => {
  var me = we(),
    { AbortError: Ul, codes: Rb } = G(),
    { ERR_INVALID_ARG_TYPE: Ab, ERR_STREAM_PREMATURE_CLOSE: jl } = Rb,
    { kEmptyObject: vn, once: Ln } = U(),
    {
      validateAbortSignal: xb,
      validateFunction: Tb,
      validateObject: Ob,
      validateBoolean: vb,
    } = Ue(),
    { Promise: Lb, PromisePrototypeThen: kb, SymbolDispose: Vl } = q(),
    {
      isClosed: Ib,
      isReadable: Nl,
      isReadableNodeStream: On,
      isReadableStream: Db,
      isReadableFinished: Ml,
      isReadableErrored: $l,
      isWritable: Cl,
      isWritableNodeStream: Wl,
      isWritableStream: Pb,
      isWritableFinished: Bl,
      isWritableErrored: Fl,
      isNodeStream: qb,
      willEmitClose: jb,
      kIsClosedPromise: Nb,
    } = oe(),
    Ve;
  function Mb(e) {
    return e.setHeader && typeof e.abort == "function";
  }
  var kn = () => {};
  function Gl(e, t, r) {
    var n, i;
    if (
      (arguments.length === 2 ? ((r = t), (t = vn)) : t == null ? (t = vn) : Ob(t, "options"),
      Tb(r, "callback"),
      xb(t.signal, "options.signal"),
      (r = Ln(r)),
      Db(e) || Pb(e))
    )
      return $b(e, t, r);
    if (!qb(e)) throw new Ab("stream", ["ReadableStream", "WritableStream", "Stream"], e);
    let o = (n = t.readable) !== null && n !== void 0 ? n : On(e),
      s = (i = t.writable) !== null && i !== void 0 ? i : Wl(e),
      f = e._writableState,
      c = e._readableState,
      u = () => {
        e.writable || p();
      },
      a = jb(e) && On(e) === o && Wl(e) === s,
      d = Bl(e, !1),
      p = () => {
        (d = !0), e.destroyed && (a = !1), !(a && (!e.readable || o)) && (!o || l) && r.call(e);
      },
      l = Ml(e, !1),
      h = () => {
        (l = !0), e.destroyed && (a = !1), !(a && (!e.writable || s)) && (!s || d) && r.call(e);
      },
      y = (R) => {
        r.call(e, R);
      },
      w = Ib(e),
      m = () => {
        w = !0;
        let R = Fl(e) || $l(e);
        if (R && typeof R != "boolean") return r.call(e, R);
        if (o && !l && On(e, !0) && !Ml(e, !1)) return r.call(e, new jl());
        if (s && !d && !Bl(e, !1)) return r.call(e, new jl());
        r.call(e);
      },
      g = () => {
        w = !0;
        let R = Fl(e) || $l(e);
        if (R && typeof R != "boolean") return r.call(e, R);
        r.call(e);
      },
      S = () => {
        e.req.on("finish", p);
      };
    Mb(e)
      ? (e.on("complete", p), a || e.on("abort", m), e.req ? S() : e.on("request", S))
      : s && !f && (e.on("end", u), e.on("close", u)),
      !a && typeof e.aborted == "boolean" && e.on("aborted", m),
      e.on("end", h),
      e.on("finish", p),
      t.error !== !1 && e.on("error", y),
      e.on("close", m),
      w
        ? me.nextTick(m)
        : (f != null && f.errorEmitted) || (c != null && c.errorEmitted)
          ? a || me.nextTick(g)
          : ((!o && (!a || Nl(e)) && (d || Cl(e) === !1)) ||
              (!s && (!a || Cl(e)) && (l || Nl(e) === !1)) ||
              (c && e.req && e.aborted)) &&
            me.nextTick(g);
    let _ = () => {
      (r = kn),
        e.removeListener("aborted", m),
        e.removeListener("complete", p),
        e.removeListener("abort", m),
        e.removeListener("request", S),
        e.req && e.req.removeListener("finish", p),
        e.removeListener("end", u),
        e.removeListener("close", u),
        e.removeListener("finish", p),
        e.removeListener("end", h),
        e.removeListener("error", y),
        e.removeListener("close", m);
    };
    if (t.signal && !w) {
      let R = () => {
        let A = r;
        _(), A.call(e, new Ul(void 0, { cause: t.signal.reason }));
      };
      if (t.signal.aborted) me.nextTick(R);
      else {
        Ve = Ve || U().addAbortListener;
        let A = Ve(t.signal, R),
          v = r;
        r = Ln((...x) => {
          A[Vl](), v.apply(e, x);
        });
      }
    }
    return _;
  }
  function $b(e, t, r) {
    let n = !1,
      i = kn;
    if (t.signal)
      if (
        ((i = () => {
          (n = !0), r.call(e, new Ul(void 0, { cause: t.signal.reason }));
        }),
        t.signal.aborted)
      )
        me.nextTick(i);
      else {
        Ve = Ve || U().addAbortListener;
        let s = Ve(t.signal, i),
          f = r;
        r = Ln((...c) => {
          s[Vl](), f.apply(e, c);
        });
      }
    let o = (...s) => {
      n || me.nextTick(() => r.apply(e, s));
    };
    return kb(e[Nb].promise, o, o), kn;
  }
  function Cb(e, t) {
    var r;
    let n = !1;
    return (
      t === null && (t = vn),
      (r = t) !== null && r !== void 0 && r.cleanup && (vb(t.cleanup, "cleanup"), (n = t.cleanup)),
      new Lb((i, o) => {
        let s = Gl(e, t, (f) => {
          n && s(), f ? o(f) : i();
        });
      })
    );
  }
  In.exports = Gl;
  In.exports.finished = Cb;
});
var Le = E((dS, Zl) => {
  "use strict";
  var se = we(),
    {
      aggregateTwoErrors: Wb,
      codes: { ERR_MULTIPLE_CALLBACK: Bb },
      AbortError: Fb,
    } = G(),
    { Symbol: Kl } = q(),
    { kIsDestroyed: Ub, isDestroyed: Vb, isFinished: Gb, isServerRequest: zb } = oe(),
    Jl = Kl("kDestroy"),
    Dn = Kl("kConstruct");
  function Yl(e, t, r) {
    e && (e.stack, t && !t.errored && (t.errored = e), r && !r.errored && (r.errored = e));
  }
  function Hb(e, t) {
    let r = this._readableState,
      n = this._writableState,
      i = n || r;
    return (n != null && n.destroyed) || (r != null && r.destroyed)
      ? (typeof t == "function" && t(), this)
      : (Yl(e, n, r),
        n && (n.destroyed = !0),
        r && (r.destroyed = !0),
        i.constructed
          ? zl(this, e, t)
          : this.once(Jl, function (o) {
              zl(this, Wb(o, e), t);
            }),
        this);
  }
  function zl(e, t, r) {
    let n = !1;
    function i(o) {
      if (n) return;
      n = !0;
      let s = e._readableState,
        f = e._writableState;
      Yl(o, f, s),
        f && (f.closed = !0),
        s && (s.closed = !0),
        typeof r == "function" && r(o),
        o ? se.nextTick(Kb, e, o) : se.nextTick(Xl, e);
    }
    try {
      e._destroy(t || null, i);
    } catch (o) {
      i(o);
    }
  }
  function Kb(e, t) {
    Pn(e, t), Xl(e);
  }
  function Xl(e) {
    let t = e._readableState,
      r = e._writableState;
    r && (r.closeEmitted = !0),
      t && (t.closeEmitted = !0),
      ((r != null && r.emitClose) || (t != null && t.emitClose)) && e.emit("close");
  }
  function Pn(e, t) {
    let r = e._readableState,
      n = e._writableState;
    (n != null && n.errorEmitted) ||
      (r != null && r.errorEmitted) ||
      (n && (n.errorEmitted = !0), r && (r.errorEmitted = !0), e.emit("error", t));
  }
  function Jb() {
    let e = this._readableState,
      t = this._writableState;
    e &&
      ((e.constructed = !0),
      (e.closed = !1),
      (e.closeEmitted = !1),
      (e.destroyed = !1),
      (e.errored = null),
      (e.errorEmitted = !1),
      (e.reading = !1),
      (e.ended = e.readable === !1),
      (e.endEmitted = e.readable === !1)),
      t &&
        ((t.constructed = !0),
        (t.destroyed = !1),
        (t.closed = !1),
        (t.closeEmitted = !1),
        (t.errored = null),
        (t.errorEmitted = !1),
        (t.finalCalled = !1),
        (t.prefinished = !1),
        (t.ended = t.writable === !1),
        (t.ending = t.writable === !1),
        (t.finished = t.writable === !1));
  }
  function qn(e, t, r) {
    let n = e._readableState,
      i = e._writableState;
    if ((i != null && i.destroyed) || (n != null && n.destroyed)) return this;
    (n != null && n.autoDestroy) || (i != null && i.autoDestroy)
      ? e.destroy(t)
      : t &&
        (t.stack,
        i && !i.errored && (i.errored = t),
        n && !n.errored && (n.errored = t),
        r ? se.nextTick(Pn, e, t) : Pn(e, t));
  }
  function Yb(e, t) {
    if (typeof e._construct != "function") return;
    let r = e._readableState,
      n = e._writableState;
    r && (r.constructed = !1),
      n && (n.constructed = !1),
      e.once(Dn, t),
      !(e.listenerCount(Dn) > 1) && se.nextTick(Xb, e);
  }
  function Xb(e) {
    let t = !1;
    function r(n) {
      if (t) {
        qn(e, n ?? new Bb());
        return;
      }
      t = !0;
      let i = e._readableState,
        o = e._writableState,
        s = o || i;
      i && (i.constructed = !0),
        o && (o.constructed = !0),
        s.destroyed ? e.emit(Jl, n) : n ? qn(e, n, !0) : se.nextTick(Qb, e);
    }
    try {
      e._construct((n) => {
        se.nextTick(r, n);
      });
    } catch (n) {
      se.nextTick(r, n);
    }
  }
  function Qb(e) {
    e.emit(Dn);
  }
  function Hl(e) {
    return e?.setHeader && typeof e.abort == "function";
  }
  function Ql(e) {
    e.emit("close");
  }
  function Zb(e, t) {
    e.emit("error", t), se.nextTick(Ql, e);
  }
  function eg(e, t) {
    !e ||
      Vb(e) ||
      (!t && !Gb(e) && (t = new Fb()),
      zb(e)
        ? ((e.socket = null), e.destroy(t))
        : Hl(e)
          ? e.abort()
          : Hl(e.req)
            ? e.req.abort()
            : typeof e.destroy == "function"
              ? e.destroy(t)
              : typeof e.close == "function"
                ? e.close()
                : t
                  ? se.nextTick(Zb, e, t)
                  : se.nextTick(Ql, e),
      e.destroyed || (e[Ub] = !0));
  }
  Zl.exports = { construct: Yb, destroyer: eg, destroy: Hb, undestroy: Jb, errorOrDestroy: qn };
});
var Xt = E((hS, tf) => {
  "use strict";
  var { ArrayIsArray: tg, ObjectSetPrototypeOf: ef } = q(),
    { EventEmitter: Jt } = require("events");
  function Yt(e) {
    Jt.call(this, e);
  }
  ef(Yt.prototype, Jt.prototype);
  ef(Yt, Jt);
  Yt.prototype.pipe = function (e, t) {
    let r = this;
    function n(a) {
      e.writable && e.write(a) === !1 && r.pause && r.pause();
    }
    r.on("data", n);
    function i() {
      r.readable && r.resume && r.resume();
    }
    e.on("drain", i), !e._isStdio && (!t || t.end !== !1) && (r.on("end", s), r.on("close", f));
    let o = !1;
    function s() {
      o || ((o = !0), e.end());
    }
    function f() {
      o || ((o = !0), typeof e.destroy == "function" && e.destroy());
    }
    function c(a) {
      u(), Jt.listenerCount(this, "error") === 0 && this.emit("error", a);
    }
    jn(r, "error", c), jn(e, "error", c);
    function u() {
      r.removeListener("data", n),
        e.removeListener("drain", i),
        r.removeListener("end", s),
        r.removeListener("close", f),
        r.removeListener("error", c),
        e.removeListener("error", c),
        r.removeListener("end", u),
        r.removeListener("close", u),
        e.removeListener("close", u);
    }
    return r.on("end", u), r.on("close", u), e.on("close", u), e.emit("pipe", r), e;
  };
  function jn(e, t, r) {
    if (typeof e.prependListener == "function") return e.prependListener(t, r);
    !e._events || !e._events[t]
      ? e.on(t, r)
      : tg(e._events[t])
        ? e._events[t].unshift(r)
        : (e._events[t] = [r, e._events[t]]);
  }
  tf.exports = { Stream: Yt, prependListener: jn };
});
var ft = E((pS, Qt) => {
  "use strict";
  var { SymbolDispose: rg } = q(),
    { AbortError: rf, codes: ng } = G(),
    { isNodeStream: nf, isWebStream: ig, kControllerErrorFunction: og } = oe(),
    sg = ae(),
    { ERR_INVALID_ARG_TYPE: of } = ng,
    Nn,
    lg = (e, t) => {
      if (typeof e != "object" || !("aborted" in e)) throw new of(t, "AbortSignal", e);
    };
  Qt.exports.addAbortSignal = function (t, r) {
    if ((lg(t, "signal"), !nf(r) && !ig(r)))
      throw new of("stream", ["ReadableStream", "WritableStream", "Stream"], r);
    return Qt.exports.addAbortSignalNoValidate(t, r);
  };
  Qt.exports.addAbortSignalNoValidate = function (e, t) {
    if (typeof e != "object" || !("aborted" in e)) return t;
    let r = nf(t)
      ? () => {
          t.destroy(new rf(void 0, { cause: e.reason }));
        }
      : () => {
          t[og](new rf(void 0, { cause: e.reason }));
        };
    if (e.aborted) r();
    else {
      Nn = Nn || U().addAbortListener;
      let n = Nn(e, r);
      sg(t, n[rg]);
    }
    return t;
  };
});
var ff = E((bS, lf) => {
  "use strict";
  var {
      StringPrototypeSlice: sf,
      SymbolIterator: fg,
      TypedArrayPrototypeSet: Zt,
      Uint8Array: ug,
    } = q(),
    { Buffer: Mn } = require("buffer"),
    { inspect: ag } = U();
  lf.exports = class {
    constructor() {
      (this.head = null), (this.tail = null), (this.length = 0);
    }
    push(t) {
      let r = { data: t, next: null };
      this.length > 0 ? (this.tail.next = r) : (this.head = r), (this.tail = r), ++this.length;
    }
    unshift(t) {
      let r = { data: t, next: this.head };
      this.length === 0 && (this.tail = r), (this.head = r), ++this.length;
    }
    shift() {
      if (this.length === 0) return;
      let t = this.head.data;
      return (
        this.length === 1 ? (this.head = this.tail = null) : (this.head = this.head.next),
        --this.length,
        t
      );
    }
    clear() {
      (this.head = this.tail = null), (this.length = 0);
    }
    join(t) {
      if (this.length === 0) return "";
      let r = this.head,
        n = "" + r.data;
      for (; (r = r.next) !== null; ) n += t + r.data;
      return n;
    }
    concat(t) {
      if (this.length === 0) return Mn.alloc(0);
      let r = Mn.allocUnsafe(t >>> 0),
        n = this.head,
        i = 0;
      for (; n; ) Zt(r, n.data, i), (i += n.data.length), (n = n.next);
      return r;
    }
    consume(t, r) {
      let n = this.head.data;
      if (t < n.length) {
        let i = n.slice(0, t);
        return (this.head.data = n.slice(t)), i;
      }
      return t === n.length ? this.shift() : r ? this._getString(t) : this._getBuffer(t);
    }
    first() {
      return this.head.data;
    }
    *[fg]() {
      for (let t = this.head; t; t = t.next) yield t.data;
    }
    _getString(t) {
      let r = "",
        n = this.head,
        i = 0;
      do {
        let o = n.data;
        if (t > o.length) (r += o), (t -= o.length);
        else {
          t === o.length
            ? ((r += o), ++i, n.next ? (this.head = n.next) : (this.head = this.tail = null))
            : ((r += sf(o, 0, t)), (this.head = n), (n.data = sf(o, t)));
          break;
        }
        ++i;
      } while ((n = n.next) !== null);
      return (this.length -= i), r;
    }
    _getBuffer(t) {
      let r = Mn.allocUnsafe(t),
        n = t,
        i = this.head,
        o = 0;
      do {
        let s = i.data;
        if (t > s.length) Zt(r, s, n - t), (t -= s.length);
        else {
          t === s.length
            ? (Zt(r, s, n - t), ++o, i.next ? (this.head = i.next) : (this.head = this.tail = null))
            : (Zt(r, new ug(s.buffer, s.byteOffset, t), n - t),
              (this.head = i),
              (i.data = s.slice(t)));
          break;
        }
        ++o;
      } while ((i = i.next) !== null);
      return (this.length -= o), r;
    }
    [Symbol.for("nodejs.util.inspect.custom")](t, r) {
      return ag(this, { ...r, depth: 0, customInspect: !1 });
    }
  };
});
var ut = E((gS, df) => {
  "use strict";
  var { MathFloor: cg, NumberIsInteger: dg } = q(),
    { validateInteger: hg } = Ue(),
    { ERR_INVALID_ARG_VALUE: pg } = G().codes,
    uf = 16 * 1024,
    af = 16;
  function yg(e, t, r) {
    return e.highWaterMark != null ? e.highWaterMark : t ? e[r] : null;
  }
  function cf(e) {
    return e ? af : uf;
  }
  function bg(e, t) {
    hg(t, "value", 0), e ? (af = t) : (uf = t);
  }
  function gg(e, t, r, n) {
    let i = yg(t, n, r);
    if (i != null) {
      if (!dg(i) || i < 0) {
        let o = n ? `options.${r}` : "options.highWaterMark";
        throw new pg(o, i);
      }
      return cg(i);
    }
    return cf(e.objectMode);
  }
  df.exports = { getHighWaterMark: gg, getDefaultHighWaterMark: cf, setDefaultHighWaterMark: bg };
});
var $n = E((wS, bf) => {
  "use strict";
  var hf = we(),
    { PromisePrototypeThen: wg, SymbolAsyncIterator: pf, SymbolIterator: yf } = q(),
    { Buffer: mg } = require("buffer"),
    { ERR_INVALID_ARG_TYPE: _g, ERR_STREAM_NULL_VALUES: Sg } = G().codes;
  function Eg(e, t, r) {
    let n;
    if (typeof t == "string" || t instanceof mg)
      return new e({
        objectMode: !0,
        ...r,
        read() {
          this.push(t), this.push(null);
        },
      });
    let i;
    if (t && t[pf]) (i = !0), (n = t[pf]());
    else if (t && t[yf]) (i = !1), (n = t[yf]());
    else throw new _g("iterable", ["Iterable"], t);
    let o = new e({ objectMode: !0, highWaterMark: 1, ...r }),
      s = !1;
    (o._read = function () {
      s || ((s = !0), c());
    }),
      (o._destroy = function (u, a) {
        wg(
          f(u),
          () => hf.nextTick(a, u),
          (d) => hf.nextTick(a, d || u),
        );
      });
    async function f(u) {
      let a = u != null,
        d = typeof n.throw == "function";
      if (a && d) {
        let { value: p, done: l } = await n.throw(u);
        if ((await p, l)) return;
      }
      if (typeof n.return == "function") {
        let { value: p } = await n.return();
        await p;
      }
    }
    async function c() {
      for (;;) {
        try {
          let { value: u, done: a } = i ? await n.next() : n.next();
          if (a) o.push(null);
          else {
            let d = u && typeof u.then == "function" ? await u : u;
            if (d === null) throw ((s = !1), new Sg());
            if (o.push(d)) continue;
            s = !1;
          }
        } catch (u) {
          o.destroy(u);
        }
        break;
      }
    }
    return o;
  }
  bf.exports = Eg;
});
var ct = E((mS, qf) => {
  var Z = we(),
    {
      ArrayPrototypeIndexOf: Rg,
      NumberIsInteger: Ag,
      NumberIsNaN: xg,
      NumberParseInt: Tg,
      ObjectDefineProperties: zn,
      ObjectKeys: Og,
      ObjectSetPrototypeOf: mf,
      Promise: _f,
      SafeSet: vg,
      SymbolAsyncDispose: Lg,
      SymbolAsyncIterator: kg,
      Symbol: Ig,
    } = q();
  qf.exports = O;
  O.ReadableState = nr;
  var { EventEmitter: Dg } = require("events"),
    { Stream: _e, prependListener: Pg } = Xt(),
    { Buffer: Cn } = require("buffer"),
    { addAbortSignal: qg } = ft(),
    Sf = ae(),
    k = U().debuglog("stream", (e) => {
      k = e;
    }),
    jg = ff(),
    He = Le(),
    { getHighWaterMark: Ng, getDefaultHighWaterMark: Mg } = ut(),
    {
      aggregateTwoErrors: gf,
      codes: {
        ERR_INVALID_ARG_TYPE: $g,
        ERR_METHOD_NOT_IMPLEMENTED: Cg,
        ERR_OUT_OF_RANGE: Wg,
        ERR_STREAM_PUSH_AFTER_EOF: Bg,
        ERR_STREAM_UNSHIFT_AFTER_END_EVENT: Fg,
      },
      AbortError: Ug,
    } = G(),
    { validateObject: Vg } = Ue(),
    ke = Ig("kPaused"),
    { StringDecoder: Ef } = require("string_decoder"),
    Gg = $n();
  mf(O.prototype, _e.prototype);
  mf(O, _e);
  var Wn = () => {},
    { errorOrDestroy: Ge } = He,
    ze = 1,
    zg = 2,
    Rf = 4,
    at = 8,
    Af = 16,
    er = 32,
    tr = 64,
    xf = 128,
    Hg = 256,
    Kg = 512,
    Jg = 1024,
    Vn = 2048,
    Gn = 4096,
    Yg = 8192,
    Xg = 16384,
    Qg = 32768,
    Tf = 65536,
    Zg = 1 << 17,
    ew = 1 << 18;
  function C(e) {
    return {
      enumerable: !1,
      get() {
        return (this.state & e) !== 0;
      },
      set(t) {
        t ? (this.state |= e) : (this.state &= ~e);
      },
    };
  }
  zn(nr.prototype, {
    objectMode: C(ze),
    ended: C(zg),
    endEmitted: C(Rf),
    reading: C(at),
    constructed: C(Af),
    sync: C(er),
    needReadable: C(tr),
    emittedReadable: C(xf),
    readableListening: C(Hg),
    resumeScheduled: C(Kg),
    errorEmitted: C(Jg),
    emitClose: C(Vn),
    autoDestroy: C(Gn),
    destroyed: C(Yg),
    closed: C(Xg),
    closeEmitted: C(Qg),
    multiAwaitDrain: C(Tf),
    readingMore: C(Zg),
    dataEmitted: C(ew),
  });
  function nr(e, t, r) {
    typeof r != "boolean" && (r = t instanceof le()),
      (this.state = Vn | Gn | Af | er),
      e && e.objectMode && (this.state |= ze),
      r && e && e.readableObjectMode && (this.state |= ze),
      (this.highWaterMark = e ? Ng(this, e, "readableHighWaterMark", r) : Mg(!1)),
      (this.buffer = new jg()),
      (this.length = 0),
      (this.pipes = []),
      (this.flowing = null),
      (this[ke] = null),
      e && e.emitClose === !1 && (this.state &= ~Vn),
      e && e.autoDestroy === !1 && (this.state &= ~Gn),
      (this.errored = null),
      (this.defaultEncoding = (e && e.defaultEncoding) || "utf8"),
      (this.awaitDrainWriters = null),
      (this.decoder = null),
      (this.encoding = null),
      e && e.encoding && ((this.decoder = new Ef(e.encoding)), (this.encoding = e.encoding));
  }
  function O(e) {
    if (!(this instanceof O)) return new O(e);
    let t = this instanceof le();
    (this._readableState = new nr(e, this, t)),
      e &&
        (typeof e.read == "function" && (this._read = e.read),
        typeof e.destroy == "function" && (this._destroy = e.destroy),
        typeof e.construct == "function" && (this._construct = e.construct),
        e.signal && !t && qg(e.signal, this)),
      _e.call(this, e),
      He.construct(this, () => {
        this._readableState.needReadable && rr(this, this._readableState);
      });
  }
  O.prototype.destroy = He.destroy;
  O.prototype._undestroy = He.undestroy;
  O.prototype._destroy = function (e, t) {
    t(e);
  };
  O.prototype[Dg.captureRejectionSymbol] = function (e) {
    this.destroy(e);
  };
  O.prototype[Lg] = function () {
    let e;
    return (
      this.destroyed || ((e = this.readableEnded ? null : new Ug()), this.destroy(e)),
      new _f((t, r) => Sf(this, (n) => (n && n !== e ? r(n) : t(null))))
    );
  };
  O.prototype.push = function (e, t) {
    return Of(this, e, t, !1);
  };
  O.prototype.unshift = function (e, t) {
    return Of(this, e, t, !0);
  };
  function Of(e, t, r, n) {
    k("readableAddChunk", t);
    let i = e._readableState,
      o;
    if (
      (i.state & ze ||
        (typeof t == "string"
          ? ((r = r || i.defaultEncoding),
            i.encoding !== r &&
              (n && i.encoding
                ? (t = Cn.from(t, r).toString(i.encoding))
                : ((t = Cn.from(t, r)), (r = ""))))
          : t instanceof Cn
            ? (r = "")
            : _e._isUint8Array(t)
              ? ((t = _e._uint8ArrayToBuffer(t)), (r = ""))
              : t != null && (o = new $g("chunk", ["string", "Buffer", "Uint8Array"], t))),
      o)
    )
      Ge(e, o);
    else if (t === null) (i.state &= ~at), nw(e, i);
    else if (i.state & ze || (t && t.length > 0))
      if (n)
        if (i.state & Rf) Ge(e, new Fg());
        else {
          if (i.destroyed || i.errored) return !1;
          Bn(e, i, t, !0);
        }
      else if (i.ended) Ge(e, new Bg());
      else {
        if (i.destroyed || i.errored) return !1;
        (i.state &= ~at),
          i.decoder && !r
            ? ((t = i.decoder.write(t)),
              i.objectMode || t.length !== 0 ? Bn(e, i, t, !1) : rr(e, i))
            : Bn(e, i, t, !1);
      }
    else n || ((i.state &= ~at), rr(e, i));
    return !i.ended && (i.length < i.highWaterMark || i.length === 0);
  }
  function Bn(e, t, r, n) {
    t.flowing && t.length === 0 && !t.sync && e.listenerCount("data") > 0
      ? (t.state & Tf ? t.awaitDrainWriters.clear() : (t.awaitDrainWriters = null),
        (t.dataEmitted = !0),
        e.emit("data", r))
      : ((t.length += t.objectMode ? 1 : r.length),
        n ? t.buffer.unshift(r) : t.buffer.push(r),
        t.state & tr && ir(e)),
      rr(e, t);
  }
  O.prototype.isPaused = function () {
    let e = this._readableState;
    return e[ke] === !0 || e.flowing === !1;
  };
  O.prototype.setEncoding = function (e) {
    let t = new Ef(e);
    (this._readableState.decoder = t),
      (this._readableState.encoding = this._readableState.decoder.encoding);
    let r = this._readableState.buffer,
      n = "";
    for (let i of r) n += t.write(i);
    return r.clear(), n !== "" && r.push(n), (this._readableState.length = n.length), this;
  };
  var tw = 1073741824;
  function rw(e) {
    if (e > tw) throw new Wg("size", "<= 1GiB", e);
    return (
      e--, (e |= e >>> 1), (e |= e >>> 2), (e |= e >>> 4), (e |= e >>> 8), (e |= e >>> 16), e++, e
    );
  }
  function wf(e, t) {
    return e <= 0 || (t.length === 0 && t.ended)
      ? 0
      : t.state & ze
        ? 1
        : xg(e)
          ? t.flowing && t.length
            ? t.buffer.first().length
            : t.length
          : e <= t.length
            ? e
            : t.ended
              ? t.length
              : 0;
  }
  O.prototype.read = function (e) {
    k("read", e), e === void 0 ? (e = NaN) : Ag(e) || (e = Tg(e, 10));
    let t = this._readableState,
      r = e;
    if (
      (e > t.highWaterMark && (t.highWaterMark = rw(e)),
      e !== 0 && (t.state &= ~xf),
      e === 0 &&
        t.needReadable &&
        ((t.highWaterMark !== 0 ? t.length >= t.highWaterMark : t.length > 0) || t.ended))
    )
      return (
        k("read: emitReadable", t.length, t.ended),
        t.length === 0 && t.ended ? Fn(this) : ir(this),
        null
      );
    if (((e = wf(e, t)), e === 0 && t.ended)) return t.length === 0 && Fn(this), null;
    let n = (t.state & tr) !== 0;
    if (
      (k("need readable", n),
      (t.length === 0 || t.length - e < t.highWaterMark) &&
        ((n = !0), k("length less than watermark", n)),
      t.ended || t.reading || t.destroyed || t.errored || !t.constructed)
    )
      (n = !1), k("reading, ended or constructing", n);
    else if (n) {
      k("do read"), (t.state |= at | er), t.length === 0 && (t.state |= tr);
      try {
        this._read(t.highWaterMark);
      } catch (o) {
        Ge(this, o);
      }
      (t.state &= ~er), t.reading || (e = wf(r, t));
    }
    let i;
    return (
      e > 0 ? (i = Df(e, t)) : (i = null),
      i === null
        ? ((t.needReadable = t.length <= t.highWaterMark), (e = 0))
        : ((t.length -= e),
          t.multiAwaitDrain ? t.awaitDrainWriters.clear() : (t.awaitDrainWriters = null)),
      t.length === 0 && (t.ended || (t.needReadable = !0), r !== e && t.ended && Fn(this)),
      i !== null &&
        !t.errorEmitted &&
        !t.closeEmitted &&
        ((t.dataEmitted = !0), this.emit("data", i)),
      i
    );
  };
  function nw(e, t) {
    if ((k("onEofChunk"), !t.ended)) {
      if (t.decoder) {
        let r = t.decoder.end();
        r && r.length && (t.buffer.push(r), (t.length += t.objectMode ? 1 : r.length));
      }
      (t.ended = !0), t.sync ? ir(e) : ((t.needReadable = !1), (t.emittedReadable = !0), vf(e));
    }
  }
  function ir(e) {
    let t = e._readableState;
    k("emitReadable", t.needReadable, t.emittedReadable),
      (t.needReadable = !1),
      t.emittedReadable ||
        (k("emitReadable", t.flowing), (t.emittedReadable = !0), Z.nextTick(vf, e));
  }
  function vf(e) {
    let t = e._readableState;
    k("emitReadable_", t.destroyed, t.length, t.ended),
      !t.destroyed &&
        !t.errored &&
        (t.length || t.ended) &&
        (e.emit("readable"), (t.emittedReadable = !1)),
      (t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark),
      kf(e);
  }
  function rr(e, t) {
    !t.readingMore && t.constructed && ((t.readingMore = !0), Z.nextTick(iw, e, t));
  }
  function iw(e, t) {
    for (
      ;
      !t.reading && !t.ended && (t.length < t.highWaterMark || (t.flowing && t.length === 0));

    ) {
      let r = t.length;
      if ((k("maybeReadMore read 0"), e.read(0), r === t.length)) break;
    }
    t.readingMore = !1;
  }
  O.prototype._read = function (e) {
    throw new Cg("_read()");
  };
  O.prototype.pipe = function (e, t) {
    let r = this,
      n = this._readableState;
    n.pipes.length === 1 &&
      (n.multiAwaitDrain ||
        ((n.multiAwaitDrain = !0),
        (n.awaitDrainWriters = new vg(n.awaitDrainWriters ? [n.awaitDrainWriters] : [])))),
      n.pipes.push(e),
      k("pipe count=%d opts=%j", n.pipes.length, t);
    let o = (!t || t.end !== !1) && e !== Z.stdout && e !== Z.stderr ? f : w;
    n.endEmitted ? Z.nextTick(o) : r.once("end", o), e.on("unpipe", s);
    function s(m, g) {
      k("onunpipe"), m === r && g && g.hasUnpiped === !1 && ((g.hasUnpiped = !0), a());
    }
    function f() {
      k("onend"), e.end();
    }
    let c,
      u = !1;
    function a() {
      k("cleanup"),
        e.removeListener("close", h),
        e.removeListener("finish", y),
        c && e.removeListener("drain", c),
        e.removeListener("error", l),
        e.removeListener("unpipe", s),
        r.removeListener("end", f),
        r.removeListener("end", w),
        r.removeListener("data", p),
        (u = !0),
        c && n.awaitDrainWriters && (!e._writableState || e._writableState.needDrain) && c();
    }
    function d() {
      u ||
        (n.pipes.length === 1 && n.pipes[0] === e
          ? (k("false write response, pause", 0),
            (n.awaitDrainWriters = e),
            (n.multiAwaitDrain = !1))
          : n.pipes.length > 1 &&
            n.pipes.includes(e) &&
            (k("false write response, pause", n.awaitDrainWriters.size),
            n.awaitDrainWriters.add(e)),
        r.pause()),
        c || ((c = ow(r, e)), e.on("drain", c));
    }
    r.on("data", p);
    function p(m) {
      k("ondata");
      let g = e.write(m);
      k("dest.write", g), g === !1 && d();
    }
    function l(m) {
      if ((k("onerror", m), w(), e.removeListener("error", l), e.listenerCount("error") === 0)) {
        let g = e._writableState || e._readableState;
        g && !g.errorEmitted ? Ge(e, m) : e.emit("error", m);
      }
    }
    Pg(e, "error", l);
    function h() {
      e.removeListener("finish", y), w();
    }
    e.once("close", h);
    function y() {
      k("onfinish"), e.removeListener("close", h), w();
    }
    e.once("finish", y);
    function w() {
      k("unpipe"), r.unpipe(e);
    }
    return (
      e.emit("pipe", r),
      e.writableNeedDrain === !0 ? d() : n.flowing || (k("pipe resume"), r.resume()),
      e
    );
  };
  function ow(e, t) {
    return function () {
      let n = e._readableState;
      n.awaitDrainWriters === t
        ? (k("pipeOnDrain", 1), (n.awaitDrainWriters = null))
        : n.multiAwaitDrain &&
          (k("pipeOnDrain", n.awaitDrainWriters.size), n.awaitDrainWriters.delete(t)),
        (!n.awaitDrainWriters || n.awaitDrainWriters.size === 0) &&
          e.listenerCount("data") &&
          e.resume();
    };
  }
  O.prototype.unpipe = function (e) {
    let t = this._readableState,
      r = { hasUnpiped: !1 };
    if (t.pipes.length === 0) return this;
    if (!e) {
      let i = t.pipes;
      (t.pipes = []), this.pause();
      for (let o = 0; o < i.length; o++) i[o].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    let n = Rg(t.pipes, e);
    return n === -1
      ? this
      : (t.pipes.splice(n, 1),
        t.pipes.length === 0 && this.pause(),
        e.emit("unpipe", this, r),
        this);
  };
  O.prototype.on = function (e, t) {
    let r = _e.prototype.on.call(this, e, t),
      n = this._readableState;
    return (
      e === "data"
        ? ((n.readableListening = this.listenerCount("readable") > 0),
          n.flowing !== !1 && this.resume())
        : e === "readable" &&
          !n.endEmitted &&
          !n.readableListening &&
          ((n.readableListening = n.needReadable = !0),
          (n.flowing = !1),
          (n.emittedReadable = !1),
          k("on readable", n.length, n.reading),
          n.length ? ir(this) : n.reading || Z.nextTick(sw, this)),
      r
    );
  };
  O.prototype.addListener = O.prototype.on;
  O.prototype.removeListener = function (e, t) {
    let r = _e.prototype.removeListener.call(this, e, t);
    return e === "readable" && Z.nextTick(Lf, this), r;
  };
  O.prototype.off = O.prototype.removeListener;
  O.prototype.removeAllListeners = function (e) {
    let t = _e.prototype.removeAllListeners.apply(this, arguments);
    return (e === "readable" || e === void 0) && Z.nextTick(Lf, this), t;
  };
  function Lf(e) {
    let t = e._readableState;
    (t.readableListening = e.listenerCount("readable") > 0),
      t.resumeScheduled && t[ke] === !1
        ? (t.flowing = !0)
        : e.listenerCount("data") > 0
          ? e.resume()
          : t.readableListening || (t.flowing = null);
  }
  function sw(e) {
    k("readable nexttick read 0"), e.read(0);
  }
  O.prototype.resume = function () {
    let e = this._readableState;
    return (
      e.flowing || (k("resume"), (e.flowing = !e.readableListening), lw(this, e)),
      (e[ke] = !1),
      this
    );
  };
  function lw(e, t) {
    t.resumeScheduled || ((t.resumeScheduled = !0), Z.nextTick(fw, e, t));
  }
  function fw(e, t) {
    k("resume", t.reading),
      t.reading || e.read(0),
      (t.resumeScheduled = !1),
      e.emit("resume"),
      kf(e),
      t.flowing && !t.reading && e.read(0);
  }
  O.prototype.pause = function () {
    return (
      k("call pause flowing=%j", this._readableState.flowing),
      this._readableState.flowing !== !1 &&
        (k("pause"), (this._readableState.flowing = !1), this.emit("pause")),
      (this._readableState[ke] = !0),
      this
    );
  };
  function kf(e) {
    let t = e._readableState;
    for (k("flow", t.flowing); t.flowing && e.read() !== null; );
  }
  O.prototype.wrap = function (e) {
    let t = !1;
    e.on("data", (n) => {
      !this.push(n) && e.pause && ((t = !0), e.pause());
    }),
      e.on("end", () => {
        this.push(null);
      }),
      e.on("error", (n) => {
        Ge(this, n);
      }),
      e.on("close", () => {
        this.destroy();
      }),
      e.on("destroy", () => {
        this.destroy();
      }),
      (this._read = () => {
        t && e.resume && ((t = !1), e.resume());
      });
    let r = Og(e);
    for (let n = 1; n < r.length; n++) {
      let i = r[n];
      this[i] === void 0 && typeof e[i] == "function" && (this[i] = e[i].bind(e));
    }
    return this;
  };
  O.prototype[kg] = function () {
    return If(this);
  };
  O.prototype.iterator = function (e) {
    return e !== void 0 && Vg(e, "options"), If(this, e);
  };
  function If(e, t) {
    typeof e.read != "function" && (e = O.wrap(e, { objectMode: !0 }));
    let r = uw(e, t);
    return (r.stream = e), r;
  }
  async function* uw(e, t) {
    let r = Wn;
    function n(s) {
      this === e ? (r(), (r = Wn)) : (r = s);
    }
    e.on("readable", n);
    let i,
      o = Sf(e, { writable: !1 }, (s) => {
        (i = s ? gf(i, s) : null), r(), (r = Wn);
      });
    try {
      for (;;) {
        let s = e.destroyed ? null : e.read();
        if (s !== null) yield s;
        else {
          if (i) throw i;
          if (i === null) return;
          await new _f(n);
        }
      }
    } catch (s) {
      throw ((i = gf(i, s)), i);
    } finally {
      (i || t?.destroyOnReturn !== !1) && (i === void 0 || e._readableState.autoDestroy)
        ? He.destroyer(e, null)
        : (e.off("readable", n), o());
    }
  }
  zn(O.prototype, {
    readable: {
      __proto__: null,
      get() {
        let e = this._readableState;
        return !!e && e.readable !== !1 && !e.destroyed && !e.errorEmitted && !e.endEmitted;
      },
      set(e) {
        this._readableState && (this._readableState.readable = !!e);
      },
    },
    readableDidRead: {
      __proto__: null,
      enumerable: !1,
      get: function () {
        return this._readableState.dataEmitted;
      },
    },
    readableAborted: {
      __proto__: null,
      enumerable: !1,
      get: function () {
        return !!(
          this._readableState.readable !== !1 &&
          (this._readableState.destroyed || this._readableState.errored) &&
          !this._readableState.endEmitted
        );
      },
    },
    readableHighWaterMark: {
      __proto__: null,
      enumerable: !1,
      get: function () {
        return this._readableState.highWaterMark;
      },
    },
    readableBuffer: {
      __proto__: null,
      enumerable: !1,
      get: function () {
        return this._readableState && this._readableState.buffer;
      },
    },
    readableFlowing: {
      __proto__: null,
      enumerable: !1,
      get: function () {
        return this._readableState.flowing;
      },
      set: function (e) {
        this._readableState && (this._readableState.flowing = e);
      },
    },
    readableLength: {
      __proto__: null,
      enumerable: !1,
      get() {
        return this._readableState.length;
      },
    },
    readableObjectMode: {
      __proto__: null,
      enumerable: !1,
      get() {
        return this._readableState ? this._readableState.objectMode : !1;
      },
    },
    readableEncoding: {
      __proto__: null,
      enumerable: !1,
      get() {
        return this._readableState ? this._readableState.encoding : null;
      },
    },
    errored: {
      __proto__: null,
      enumerable: !1,
      get() {
        return this._readableState ? this._readableState.errored : null;
      },
    },
    closed: {
      __proto__: null,
      get() {
        return this._readableState ? this._readableState.closed : !1;
      },
    },
    destroyed: {
      __proto__: null,
      enumerable: !1,
      get() {
        return this._readableState ? this._readableState.destroyed : !1;
      },
      set(e) {
        this._readableState && (this._readableState.destroyed = e);
      },
    },
    readableEnded: {
      __proto__: null,
      enumerable: !1,
      get() {
        return this._readableState ? this._readableState.endEmitted : !1;
      },
    },
  });
  zn(nr.prototype, {
    pipesCount: {
      __proto__: null,
      get() {
        return this.pipes.length;
      },
    },
    paused: {
      __proto__: null,
      get() {
        return this[ke] !== !1;
      },
      set(e) {
        this[ke] = !!e;
      },
    },
  });
  O._fromList = Df;
  function Df(e, t) {
    if (t.length === 0) return null;
    let r;
    return (
      t.objectMode
        ? (r = t.buffer.shift())
        : !e || e >= t.length
          ? (t.decoder
              ? (r = t.buffer.join(""))
              : t.buffer.length === 1
                ? (r = t.buffer.first())
                : (r = t.buffer.concat(t.length)),
            t.buffer.clear())
          : (r = t.buffer.consume(e, t.decoder)),
      r
    );
  }
  function Fn(e) {
    let t = e._readableState;
    k("endReadable", t.endEmitted), t.endEmitted || ((t.ended = !0), Z.nextTick(aw, t, e));
  }
  function aw(e, t) {
    if (
      (k("endReadableNT", e.endEmitted, e.length),
      !e.errored && !e.closeEmitted && !e.endEmitted && e.length === 0)
    ) {
      if (((e.endEmitted = !0), t.emit("end"), t.writable && t.allowHalfOpen === !1))
        Z.nextTick(cw, t);
      else if (e.autoDestroy) {
        let r = t._writableState;
        (!r || (r.autoDestroy && (r.finished || r.writable === !1))) && t.destroy();
      }
    }
  }
  function cw(e) {
    e.writable && !e.writableEnded && !e.destroyed && e.end();
  }
  O.from = function (e, t) {
    return Gg(O, e, t);
  };
  var Un;
  function Pf() {
    return Un === void 0 && (Un = {}), Un;
  }
  O.fromWeb = function (e, t) {
    return Pf().newStreamReadableFromReadableStream(e, t);
  };
  O.toWeb = function (e, t) {
    return Pf().newReadableStreamFromStreamReadable(e, t);
  };
  O.wrap = function (e, t) {
    var r, n;
    return new O({
      objectMode:
        (r = (n = e.readableObjectMode) !== null && n !== void 0 ? n : e.objectMode) !== null &&
        r !== void 0
          ? r
          : !0,
      ...t,
      destroy(i, o) {
        He.destroyer(e, i), o(i);
      },
    }).wrap(e);
  };
});
var ur = E((_S, zf) => {
  var Ie = we(),
    {
      ArrayPrototypeSlice: Mf,
      Error: dw,
      FunctionPrototypeSymbolHasInstance: $f,
      ObjectDefineProperty: Cf,
      ObjectDefineProperties: hw,
      ObjectSetPrototypeOf: Wf,
      StringPrototypeToLowerCase: pw,
      Symbol: yw,
      SymbolHasInstance: bw,
    } = q();
  zf.exports = j;
  j.WritableState = pt;
  var { EventEmitter: gw } = require("events"),
    dt = Xt().Stream,
    { Buffer: or } = require("buffer"),
    fr = Le(),
    { addAbortSignal: ww } = ft(),
    { getHighWaterMark: mw, getDefaultHighWaterMark: _w } = ut(),
    {
      ERR_INVALID_ARG_TYPE: Sw,
      ERR_METHOD_NOT_IMPLEMENTED: Ew,
      ERR_MULTIPLE_CALLBACK: Bf,
      ERR_STREAM_CANNOT_PIPE: Rw,
      ERR_STREAM_DESTROYED: ht,
      ERR_STREAM_ALREADY_FINISHED: Aw,
      ERR_STREAM_NULL_VALUES: xw,
      ERR_STREAM_WRITE_AFTER_END: Tw,
      ERR_UNKNOWN_ENCODING: Ff,
    } = G().codes,
    { errorOrDestroy: Ke } = fr;
  Wf(j.prototype, dt.prototype);
  Wf(j, dt);
  function Jn() {}
  var Je = yw("kOnFinished");
  function pt(e, t, r) {
    typeof r != "boolean" && (r = t instanceof le()),
      (this.objectMode = !!(e && e.objectMode)),
      r && (this.objectMode = this.objectMode || !!(e && e.writableObjectMode)),
      (this.highWaterMark = e ? mw(this, e, "writableHighWaterMark", r) : _w(!1)),
      (this.finalCalled = !1),
      (this.needDrain = !1),
      (this.ending = !1),
      (this.ended = !1),
      (this.finished = !1),
      (this.destroyed = !1);
    let n = !!(e && e.decodeStrings === !1);
    (this.decodeStrings = !n),
      (this.defaultEncoding = (e && e.defaultEncoding) || "utf8"),
      (this.length = 0),
      (this.writing = !1),
      (this.corked = 0),
      (this.sync = !0),
      (this.bufferProcessing = !1),
      (this.onwrite = vw.bind(void 0, t)),
      (this.writecb = null),
      (this.writelen = 0),
      (this.afterWriteTickInfo = null),
      lr(this),
      (this.pendingcb = 0),
      (this.constructed = !0),
      (this.prefinished = !1),
      (this.errorEmitted = !1),
      (this.emitClose = !e || e.emitClose !== !1),
      (this.autoDestroy = !e || e.autoDestroy !== !1),
      (this.errored = null),
      (this.closed = !1),
      (this.closeEmitted = !1),
      (this[Je] = []);
  }
  function lr(e) {
    (e.buffered = []), (e.bufferedIndex = 0), (e.allBuffers = !0), (e.allNoop = !0);
  }
  pt.prototype.getBuffer = function () {
    return Mf(this.buffered, this.bufferedIndex);
  };
  Cf(pt.prototype, "bufferedRequestCount", {
    __proto__: null,
    get() {
      return this.buffered.length - this.bufferedIndex;
    },
  });
  function j(e) {
    let t = this instanceof le();
    if (!t && !$f(j, this)) return new j(e);
    (this._writableState = new pt(e, this, t)),
      e &&
        (typeof e.write == "function" && (this._write = e.write),
        typeof e.writev == "function" && (this._writev = e.writev),
        typeof e.destroy == "function" && (this._destroy = e.destroy),
        typeof e.final == "function" && (this._final = e.final),
        typeof e.construct == "function" && (this._construct = e.construct),
        e.signal && ww(e.signal, this)),
      dt.call(this, e),
      fr.construct(this, () => {
        let r = this._writableState;
        r.writing || Xn(this, r), Qn(this, r);
      });
  }
  Cf(j, bw, {
    __proto__: null,
    value: function (e) {
      return $f(this, e) ? !0 : this !== j ? !1 : e && e._writableState instanceof pt;
    },
  });
  j.prototype.pipe = function () {
    Ke(this, new Rw());
  };
  function Uf(e, t, r, n) {
    let i = e._writableState;
    if (typeof r == "function") (n = r), (r = i.defaultEncoding);
    else {
      if (!r) r = i.defaultEncoding;
      else if (r !== "buffer" && !or.isEncoding(r)) throw new Ff(r);
      typeof n != "function" && (n = Jn);
    }
    if (t === null) throw new xw();
    if (!i.objectMode)
      if (typeof t == "string") i.decodeStrings !== !1 && ((t = or.from(t, r)), (r = "buffer"));
      else if (t instanceof or) r = "buffer";
      else if (dt._isUint8Array(t)) (t = dt._uint8ArrayToBuffer(t)), (r = "buffer");
      else throw new Sw("chunk", ["string", "Buffer", "Uint8Array"], t);
    let o;
    return (
      i.ending ? (o = new Tw()) : i.destroyed && (o = new ht("write")),
      o ? (Ie.nextTick(n, o), Ke(e, o, !0), o) : (i.pendingcb++, Ow(e, i, t, r, n))
    );
  }
  j.prototype.write = function (e, t, r) {
    return Uf(this, e, t, r) === !0;
  };
  j.prototype.cork = function () {
    this._writableState.corked++;
  };
  j.prototype.uncork = function () {
    let e = this._writableState;
    e.corked && (e.corked--, e.writing || Xn(this, e));
  };
  j.prototype.setDefaultEncoding = function (t) {
    if ((typeof t == "string" && (t = pw(t)), !or.isEncoding(t))) throw new Ff(t);
    return (this._writableState.defaultEncoding = t), this;
  };
  function Ow(e, t, r, n, i) {
    let o = t.objectMode ? 1 : r.length;
    t.length += o;
    let s = t.length < t.highWaterMark;
    return (
      s || (t.needDrain = !0),
      t.writing || t.corked || t.errored || !t.constructed
        ? (t.buffered.push({ chunk: r, encoding: n, callback: i }),
          t.allBuffers && n !== "buffer" && (t.allBuffers = !1),
          t.allNoop && i !== Jn && (t.allNoop = !1))
        : ((t.writelen = o),
          (t.writecb = i),
          (t.writing = !0),
          (t.sync = !0),
          e._write(r, n, t.onwrite),
          (t.sync = !1)),
      s && !t.errored && !t.destroyed
    );
  }
  function jf(e, t, r, n, i, o, s) {
    (t.writelen = n),
      (t.writecb = s),
      (t.writing = !0),
      (t.sync = !0),
      t.destroyed
        ? t.onwrite(new ht("write"))
        : r
          ? e._writev(i, t.onwrite)
          : e._write(i, o, t.onwrite),
      (t.sync = !1);
  }
  function Nf(e, t, r, n) {
    --t.pendingcb, n(r), Yn(t), Ke(e, r);
  }
  function vw(e, t) {
    let r = e._writableState,
      n = r.sync,
      i = r.writecb;
    if (typeof i != "function") {
      Ke(e, new Bf());
      return;
    }
    (r.writing = !1),
      (r.writecb = null),
      (r.length -= r.writelen),
      (r.writelen = 0),
      t
        ? (t.stack,
          r.errored || (r.errored = t),
          e._readableState && !e._readableState.errored && (e._readableState.errored = t),
          n ? Ie.nextTick(Nf, e, r, t, i) : Nf(e, r, t, i))
        : (r.buffered.length > r.bufferedIndex && Xn(e, r),
          n
            ? r.afterWriteTickInfo !== null && r.afterWriteTickInfo.cb === i
              ? r.afterWriteTickInfo.count++
              : ((r.afterWriteTickInfo = { count: 1, cb: i, stream: e, state: r }),
                Ie.nextTick(Lw, r.afterWriteTickInfo))
            : Vf(e, r, 1, i));
  }
  function Lw({ stream: e, state: t, count: r, cb: n }) {
    return (t.afterWriteTickInfo = null), Vf(e, t, r, n);
  }
  function Vf(e, t, r, n) {
    for (
      !t.ending &&
      !e.destroyed &&
      t.length === 0 &&
      t.needDrain &&
      ((t.needDrain = !1), e.emit("drain"));
      r-- > 0;

    )
      t.pendingcb--, n();
    t.destroyed && Yn(t), Qn(e, t);
  }
  function Yn(e) {
    if (e.writing) return;
    for (let i = e.bufferedIndex; i < e.buffered.length; ++i) {
      var t;
      let { chunk: o, callback: s } = e.buffered[i],
        f = e.objectMode ? 1 : o.length;
      (e.length -= f), s((t = e.errored) !== null && t !== void 0 ? t : new ht("write"));
    }
    let r = e[Je].splice(0);
    for (let i = 0; i < r.length; i++) {
      var n;
      r[i]((n = e.errored) !== null && n !== void 0 ? n : new ht("end"));
    }
    lr(e);
  }
  function Xn(e, t) {
    if (t.corked || t.bufferProcessing || t.destroyed || !t.constructed) return;
    let { buffered: r, bufferedIndex: n, objectMode: i } = t,
      o = r.length - n;
    if (!o) return;
    let s = n;
    if (((t.bufferProcessing = !0), o > 1 && e._writev)) {
      t.pendingcb -= o - 1;
      let f = t.allNoop
          ? Jn
          : (u) => {
              for (let a = s; a < r.length; ++a) r[a].callback(u);
            },
        c = t.allNoop && s === 0 ? r : Mf(r, s);
      (c.allBuffers = t.allBuffers), jf(e, t, !0, t.length, c, "", f), lr(t);
    } else {
      do {
        let { chunk: f, encoding: c, callback: u } = r[s];
        r[s++] = null;
        let a = i ? 1 : f.length;
        jf(e, t, !1, a, f, c, u);
      } while (s < r.length && !t.writing);
      s === r.length
        ? lr(t)
        : s > 256
          ? (r.splice(0, s), (t.bufferedIndex = 0))
          : (t.bufferedIndex = s);
    }
    t.bufferProcessing = !1;
  }
  j.prototype._write = function (e, t, r) {
    if (this._writev) this._writev([{ chunk: e, encoding: t }], r);
    else throw new Ew("_write()");
  };
  j.prototype._writev = null;
  j.prototype.end = function (e, t, r) {
    let n = this._writableState;
    typeof e == "function"
      ? ((r = e), (e = null), (t = null))
      : typeof t == "function" && ((r = t), (t = null));
    let i;
    if (e != null) {
      let o = Uf(this, e, t);
      o instanceof dw && (i = o);
    }
    return (
      n.corked && ((n.corked = 1), this.uncork()),
      i ||
        (!n.errored && !n.ending
          ? ((n.ending = !0), Qn(this, n, !0), (n.ended = !0))
          : n.finished
            ? (i = new Aw("end"))
            : n.destroyed && (i = new ht("end"))),
      typeof r == "function" && (i || n.finished ? Ie.nextTick(r, i) : n[Je].push(r)),
      this
    );
  };
  function sr(e) {
    return (
      e.ending &&
      !e.destroyed &&
      e.constructed &&
      e.length === 0 &&
      !e.errored &&
      e.buffered.length === 0 &&
      !e.finished &&
      !e.writing &&
      !e.errorEmitted &&
      !e.closeEmitted
    );
  }
  function kw(e, t) {
    let r = !1;
    function n(i) {
      if (r) {
        Ke(e, i ?? Bf());
        return;
      }
      if (((r = !0), t.pendingcb--, i)) {
        let o = t[Je].splice(0);
        for (let s = 0; s < o.length; s++) o[s](i);
        Ke(e, i, t.sync);
      } else
        sr(t) && ((t.prefinished = !0), e.emit("prefinish"), t.pendingcb++, Ie.nextTick(Kn, e, t));
    }
    (t.sync = !0), t.pendingcb++;
    try {
      e._final(n);
    } catch (i) {
      n(i);
    }
    t.sync = !1;
  }
  function Iw(e, t) {
    !t.prefinished &&
      !t.finalCalled &&
      (typeof e._final == "function" && !t.destroyed
        ? ((t.finalCalled = !0), kw(e, t))
        : ((t.prefinished = !0), e.emit("prefinish")));
  }
  function Qn(e, t, r) {
    sr(t) &&
      (Iw(e, t),
      t.pendingcb === 0 &&
        (r
          ? (t.pendingcb++,
            Ie.nextTick(
              (n, i) => {
                sr(i) ? Kn(n, i) : i.pendingcb--;
              },
              e,
              t,
            ))
          : sr(t) && (t.pendingcb++, Kn(e, t))));
  }
  function Kn(e, t) {
    t.pendingcb--, (t.finished = !0);
    let r = t[Je].splice(0);
    for (let n = 0; n < r.length; n++) r[n]();
    if ((e.emit("finish"), t.autoDestroy)) {
      let n = e._readableState;
      (!n || (n.autoDestroy && (n.endEmitted || n.readable === !1))) && e.destroy();
    }
  }
  hw(j.prototype, {
    closed: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.closed : !1;
      },
    },
    destroyed: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.destroyed : !1;
      },
      set(e) {
        this._writableState && (this._writableState.destroyed = e);
      },
    },
    writable: {
      __proto__: null,
      get() {
        let e = this._writableState;
        return !!e && e.writable !== !1 && !e.destroyed && !e.errored && !e.ending && !e.ended;
      },
      set(e) {
        this._writableState && (this._writableState.writable = !!e);
      },
    },
    writableFinished: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.finished : !1;
      },
    },
    writableObjectMode: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.objectMode : !1;
      },
    },
    writableBuffer: {
      __proto__: null,
      get() {
        return this._writableState && this._writableState.getBuffer();
      },
    },
    writableEnded: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.ending : !1;
      },
    },
    writableNeedDrain: {
      __proto__: null,
      get() {
        let e = this._writableState;
        return e ? !e.destroyed && !e.ending && e.needDrain : !1;
      },
    },
    writableHighWaterMark: {
      __proto__: null,
      get() {
        return this._writableState && this._writableState.highWaterMark;
      },
    },
    writableCorked: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.corked : 0;
      },
    },
    writableLength: {
      __proto__: null,
      get() {
        return this._writableState && this._writableState.length;
      },
    },
    errored: {
      __proto__: null,
      enumerable: !1,
      get() {
        return this._writableState ? this._writableState.errored : null;
      },
    },
    writableAborted: {
      __proto__: null,
      enumerable: !1,
      get: function () {
        return !!(
          this._writableState.writable !== !1 &&
          (this._writableState.destroyed || this._writableState.errored) &&
          !this._writableState.finished
        );
      },
    },
  });
  var Dw = fr.destroy;
  j.prototype.destroy = function (e, t) {
    let r = this._writableState;
    return (
      !r.destroyed && (r.bufferedIndex < r.buffered.length || r[Je].length) && Ie.nextTick(Yn, r),
      Dw.call(this, e, t),
      this
    );
  };
  j.prototype._undestroy = fr.undestroy;
  j.prototype._destroy = function (e, t) {
    t(e);
  };
  j.prototype[gw.captureRejectionSymbol] = function (e) {
    this.destroy(e);
  };
  var Hn;
  function Gf() {
    return Hn === void 0 && (Hn = {}), Hn;
  }
  j.fromWeb = function (e, t) {
    return Gf().newStreamWritableFromWritableStream(e, t);
  };
  j.toWeb = function (e) {
    return Gf().newWritableStreamFromStreamWritable(e);
  };
});
var lu = E((SS, su) => {
  var Zn = we(),
    Pw = require("buffer"),
    {
      isReadable: qw,
      isWritable: jw,
      isIterable: Hf,
      isNodeStream: Nw,
      isReadableNodeStream: Kf,
      isWritableNodeStream: Jf,
      isDuplexNodeStream: Mw,
      isReadableStream: Yf,
      isWritableStream: Xf,
    } = oe(),
    Qf = ae(),
    {
      AbortError: iu,
      codes: { ERR_INVALID_ARG_TYPE: $w, ERR_INVALID_RETURN_VALUE: Zf },
    } = G(),
    { destroyer: Xe } = Le(),
    Cw = le(),
    ou = ct(),
    Ww = ur(),
    { createDeferredPromise: eu } = U(),
    tu = $n(),
    ru = globalThis.Blob || Pw.Blob,
    Bw =
      typeof ru < "u"
        ? function (t) {
            return t instanceof ru;
          }
        : function (t) {
            return !1;
          },
    Fw = globalThis.AbortController || Be().AbortController,
    { FunctionPrototypeCall: nu } = q(),
    Se = class extends Cw {
      constructor(t) {
        super(t),
          t?.readable === !1 &&
            ((this._readableState.readable = !1),
            (this._readableState.ended = !0),
            (this._readableState.endEmitted = !0)),
          t?.writable === !1 &&
            ((this._writableState.writable = !1),
            (this._writableState.ending = !0),
            (this._writableState.ended = !0),
            (this._writableState.finished = !0));
      }
    };
  su.exports = function e(t, r) {
    if (Mw(t)) return t;
    if (Kf(t)) return Ye({ readable: t });
    if (Jf(t)) return Ye({ writable: t });
    if (Nw(t)) return Ye({ writable: !1, readable: !1 });
    if (Yf(t)) return Ye({ readable: ou.fromWeb(t) });
    if (Xf(t)) return Ye({ writable: Ww.fromWeb(t) });
    if (typeof t == "function") {
      let { value: i, write: o, final: s, destroy: f } = Uw(t);
      if (Hf(i)) return tu(Se, i, { objectMode: !0, write: o, final: s, destroy: f });
      let c = i?.then;
      if (typeof c == "function") {
        let u,
          a = nu(
            c,
            i,
            (d) => {
              if (d != null) throw new Zf("nully", "body", d);
            },
            (d) => {
              Xe(u, d);
            },
          );
        return (u = new Se({
          objectMode: !0,
          readable: !1,
          write: o,
          final(d) {
            s(async () => {
              try {
                await a, Zn.nextTick(d, null);
              } catch (p) {
                Zn.nextTick(d, p);
              }
            });
          },
          destroy: f,
        }));
      }
      throw new Zf("Iterable, AsyncIterable or AsyncFunction", r, i);
    }
    if (Bw(t)) return e(t.arrayBuffer());
    if (Hf(t)) return tu(Se, t, { objectMode: !0, writable: !1 });
    if (Yf(t?.readable) && Xf(t?.writable)) return Se.fromWeb(t);
    if (typeof t?.writable == "object" || typeof t?.readable == "object") {
      let i = t != null && t.readable ? (Kf(t?.readable) ? t?.readable : e(t.readable)) : void 0,
        o = t != null && t.writable ? (Jf(t?.writable) ? t?.writable : e(t.writable)) : void 0;
      return Ye({ readable: i, writable: o });
    }
    let n = t?.then;
    if (typeof n == "function") {
      let i;
      return (
        nu(
          n,
          t,
          (o) => {
            o != null && i.push(o), i.push(null);
          },
          (o) => {
            Xe(i, o);
          },
        ),
        (i = new Se({ objectMode: !0, writable: !1, read() {} }))
      );
    }
    throw new $w(
      r,
      [
        "Blob",
        "ReadableStream",
        "WritableStream",
        "Stream",
        "Iterable",
        "AsyncIterable",
        "Function",
        "{ readable, writable } pair",
        "Promise",
      ],
      t,
    );
  };
  function Uw(e) {
    let { promise: t, resolve: r } = eu(),
      n = new Fw(),
      i = n.signal;
    return {
      value: e(
        (async function* () {
          for (;;) {
            let s = t;
            t = null;
            let { chunk: f, done: c, cb: u } = await s;
            if ((Zn.nextTick(u), c)) return;
            if (i.aborted) throw new iu(void 0, { cause: i.reason });
            ({ promise: t, resolve: r } = eu()), yield f;
          }
        })(),
        { signal: i },
      ),
      write(s, f, c) {
        let u = r;
        (r = null), u({ chunk: s, done: !1, cb: c });
      },
      final(s) {
        let f = r;
        (r = null), f({ done: !0, cb: s });
      },
      destroy(s, f) {
        n.abort(), f(s);
      },
    };
  }
  function Ye(e) {
    let t = e.readable && typeof e.readable.read != "function" ? ou.wrap(e.readable) : e.readable,
      r = e.writable,
      n = !!qw(t),
      i = !!jw(r),
      o,
      s,
      f,
      c,
      u;
    function a(d) {
      let p = c;
      (c = null), p ? p(d) : d && u.destroy(d);
    }
    return (
      (u = new Se({
        readableObjectMode: !!(t != null && t.readableObjectMode),
        writableObjectMode: !!(r != null && r.writableObjectMode),
        readable: n,
        writable: i,
      })),
      i &&
        (Qf(r, (d) => {
          (i = !1), d && Xe(t, d), a(d);
        }),
        (u._write = function (d, p, l) {
          r.write(d, p) ? l() : (o = l);
        }),
        (u._final = function (d) {
          r.end(), (s = d);
        }),
        r.on("drain", function () {
          if (o) {
            let d = o;
            (o = null), d();
          }
        }),
        r.on("finish", function () {
          if (s) {
            let d = s;
            (s = null), d();
          }
        })),
      n &&
        (Qf(t, (d) => {
          (n = !1), d && Xe(t, d), a(d);
        }),
        t.on("readable", function () {
          if (f) {
            let d = f;
            (f = null), d();
          }
        }),
        t.on("end", function () {
          u.push(null);
        }),
        (u._read = function () {
          for (;;) {
            let d = t.read();
            if (d === null) {
              f = u._read;
              return;
            }
            if (!u.push(d)) return;
          }
        })),
      (u._destroy = function (d, p) {
        !d && c !== null && (d = new iu()),
          (f = null),
          (o = null),
          (s = null),
          c === null ? p(d) : ((c = p), Xe(r, d), Xe(t, d));
      }),
      u
    );
  }
});
var le = E((ES, au) => {
  "use strict";
  var {
    ObjectDefineProperties: Vw,
    ObjectGetOwnPropertyDescriptor: ce,
    ObjectKeys: Gw,
    ObjectSetPrototypeOf: fu,
  } = q();
  au.exports = ee;
  var ri = ct(),
    J = ur();
  fu(ee.prototype, ri.prototype);
  fu(ee, ri);
  {
    let e = Gw(J.prototype);
    for (let t = 0; t < e.length; t++) {
      let r = e[t];
      ee.prototype[r] || (ee.prototype[r] = J.prototype[r]);
    }
  }
  function ee(e) {
    if (!(this instanceof ee)) return new ee(e);
    ri.call(this, e),
      J.call(this, e),
      e
        ? ((this.allowHalfOpen = e.allowHalfOpen !== !1),
          e.readable === !1 &&
            ((this._readableState.readable = !1),
            (this._readableState.ended = !0),
            (this._readableState.endEmitted = !0)),
          e.writable === !1 &&
            ((this._writableState.writable = !1),
            (this._writableState.ending = !0),
            (this._writableState.ended = !0),
            (this._writableState.finished = !0)))
        : (this.allowHalfOpen = !0);
  }
  Vw(ee.prototype, {
    writable: { __proto__: null, ...ce(J.prototype, "writable") },
    writableHighWaterMark: { __proto__: null, ...ce(J.prototype, "writableHighWaterMark") },
    writableObjectMode: { __proto__: null, ...ce(J.prototype, "writableObjectMode") },
    writableBuffer: { __proto__: null, ...ce(J.prototype, "writableBuffer") },
    writableLength: { __proto__: null, ...ce(J.prototype, "writableLength") },
    writableFinished: { __proto__: null, ...ce(J.prototype, "writableFinished") },
    writableCorked: { __proto__: null, ...ce(J.prototype, "writableCorked") },
    writableEnded: { __proto__: null, ...ce(J.prototype, "writableEnded") },
    writableNeedDrain: { __proto__: null, ...ce(J.prototype, "writableNeedDrain") },
    destroyed: {
      __proto__: null,
      get() {
        return this._readableState === void 0 || this._writableState === void 0
          ? !1
          : this._readableState.destroyed && this._writableState.destroyed;
      },
      set(e) {
        this._readableState &&
          this._writableState &&
          ((this._readableState.destroyed = e), (this._writableState.destroyed = e));
      },
    },
  });
  var ei;
  function uu() {
    return ei === void 0 && (ei = {}), ei;
  }
  ee.fromWeb = function (e, t) {
    return uu().newStreamDuplexFromReadableWritablePair(e, t);
  };
  ee.toWeb = function (e) {
    return uu().newReadableWritablePairFromDuplex(e);
  };
  var ti;
  ee.from = function (e) {
    return ti || (ti = lu()), ti(e, "body");
  };
});
var oi = E((RS, du) => {
  "use strict";
  var { ObjectSetPrototypeOf: cu, Symbol: zw } = q();
  du.exports = de;
  var { ERR_METHOD_NOT_IMPLEMENTED: Hw } = G().codes,
    ii = le(),
    { getHighWaterMark: Kw } = ut();
  cu(de.prototype, ii.prototype);
  cu(de, ii);
  var yt = zw("kCallback");
  function de(e) {
    if (!(this instanceof de)) return new de(e);
    let t = e ? Kw(this, e, "readableHighWaterMark", !0) : null;
    t === 0 &&
      (e = {
        ...e,
        highWaterMark: null,
        readableHighWaterMark: t,
        writableHighWaterMark: e.writableHighWaterMark || 0,
      }),
      ii.call(this, e),
      (this._readableState.sync = !1),
      (this[yt] = null),
      e &&
        (typeof e.transform == "function" && (this._transform = e.transform),
        typeof e.flush == "function" && (this._flush = e.flush)),
      this.on("prefinish", Jw);
  }
  function ni(e) {
    typeof this._flush == "function" && !this.destroyed
      ? this._flush((t, r) => {
          if (t) {
            e ? e(t) : this.destroy(t);
            return;
          }
          r != null && this.push(r), this.push(null), e && e();
        })
      : (this.push(null), e && e());
  }
  function Jw() {
    this._final !== ni && ni.call(this);
  }
  de.prototype._final = ni;
  de.prototype._transform = function (e, t, r) {
    throw new Hw("_transform()");
  };
  de.prototype._write = function (e, t, r) {
    let n = this._readableState,
      i = this._writableState,
      o = n.length;
    this._transform(e, t, (s, f) => {
      if (s) {
        r(s);
        return;
      }
      f != null && this.push(f),
        i.ended || o === n.length || n.length < n.highWaterMark ? r() : (this[yt] = r);
    });
  };
  de.prototype._read = function () {
    if (this[yt]) {
      let e = this[yt];
      (this[yt] = null), e();
    }
  };
});
var li = E((AS, pu) => {
  "use strict";
  var { ObjectSetPrototypeOf: hu } = q();
  pu.exports = Qe;
  var si = oi();
  hu(Qe.prototype, si.prototype);
  hu(Qe, si);
  function Qe(e) {
    if (!(this instanceof Qe)) return new Qe(e);
    si.call(this, e);
  }
  Qe.prototype._transform = function (e, t, r) {
    r(null, e);
  };
});
var hr = E((xS, mu) => {
  var bt = we(),
    { ArrayIsArray: Yw, Promise: Xw, SymbolAsyncIterator: Qw, SymbolDispose: Zw } = q(),
    dr = ae(),
    { once: em } = U(),
    tm = Le(),
    yu = le(),
    {
      aggregateTwoErrors: rm,
      codes: {
        ERR_INVALID_ARG_TYPE: bi,
        ERR_INVALID_RETURN_VALUE: fi,
        ERR_MISSING_ARGS: nm,
        ERR_STREAM_DESTROYED: im,
        ERR_STREAM_PREMATURE_CLOSE: om,
      },
      AbortError: sm,
    } = G(),
    { validateFunction: lm, validateAbortSignal: fm } = Ue(),
    {
      isIterable: De,
      isReadable: ui,
      isReadableNodeStream: cr,
      isNodeStream: bu,
      isTransformStream: Ze,
      isWebStream: um,
      isReadableStream: ai,
      isReadableFinished: am,
    } = oe(),
    cm = globalThis.AbortController || Be().AbortController,
    ci,
    di,
    hi;
  function gu(e, t, r) {
    let n = !1;
    e.on("close", () => {
      n = !0;
    });
    let i = dr(e, { readable: t, writable: r }, (o) => {
      n = !o;
    });
    return {
      destroy: (o) => {
        n || ((n = !0), tm.destroyer(e, o || new im("pipe")));
      },
      cleanup: i,
    };
  }
  function dm(e) {
    return lm(e[e.length - 1], "streams[stream.length - 1]"), e.pop();
  }
  function pi(e) {
    if (De(e)) return e;
    if (cr(e)) return hm(e);
    throw new bi("val", ["Readable", "Iterable", "AsyncIterable"], e);
  }
  async function* hm(e) {
    di || (di = ct()), yield* di.prototype[Qw].call(e);
  }
  async function ar(e, t, r, { end: n }) {
    let i,
      o = null,
      s = (u) => {
        if ((u && (i = u), o)) {
          let a = o;
          (o = null), a();
        }
      },
      f = () =>
        new Xw((u, a) => {
          i
            ? a(i)
            : (o = () => {
                i ? a(i) : u();
              });
        });
    t.on("drain", s);
    let c = dr(t, { readable: !1 }, s);
    try {
      t.writableNeedDrain && (await f());
      for await (let u of e) t.write(u) || (await f());
      n && (t.end(), await f()), r();
    } catch (u) {
      r(i !== u ? rm(i, u) : u);
    } finally {
      c(), t.off("drain", s);
    }
  }
  async function yi(e, t, r, { end: n }) {
    Ze(t) && (t = t.writable);
    let i = t.getWriter();
    try {
      for await (let o of e) await i.ready, i.write(o).catch(() => {});
      await i.ready, n && (await i.close()), r();
    } catch (o) {
      try {
        await i.abort(o), r(o);
      } catch (s) {
        r(s);
      }
    }
  }
  function pm(...e) {
    return wu(e, em(dm(e)));
  }
  function wu(e, t, r) {
    if ((e.length === 1 && Yw(e[0]) && (e = e[0]), e.length < 2)) throw new nm("streams");
    let n = new cm(),
      i = n.signal,
      o = r?.signal,
      s = [];
    fm(o, "options.signal");
    function f() {
      h(new sm());
    }
    hi = hi || U().addAbortListener;
    let c;
    o && (c = hi(o, f));
    let u,
      a,
      d = [],
      p = 0;
    function l(S) {
      h(S, --p === 0);
    }
    function h(S, _) {
      var R;
      if ((S && (!u || u.code === "ERR_STREAM_PREMATURE_CLOSE") && (u = S), !(!u && !_))) {
        for (; d.length; ) d.shift()(u);
        (R = c) === null || R === void 0 || R[Zw](),
          n.abort(),
          _ && (u || s.forEach((A) => A()), bt.nextTick(t, u, a));
      }
    }
    let y;
    for (let S = 0; S < e.length; S++) {
      let _ = e[S],
        R = S < e.length - 1,
        A = S > 0,
        v = R || r?.end !== !1,
        x = S === e.length - 1;
      if (bu(_)) {
        let T = function (I) {
          I && I.name !== "AbortError" && I.code !== "ERR_STREAM_PREMATURE_CLOSE" && l(I);
        };
        var g = T;
        if (v) {
          let { destroy: I, cleanup: N } = gu(_, R, A);
          d.push(I), ui(_) && x && s.push(N);
        }
        _.on("error", T),
          ui(_) &&
            x &&
            s.push(() => {
              _.removeListener("error", T);
            });
      }
      if (S === 0)
        if (typeof _ == "function") {
          if (((y = _({ signal: i })), !De(y)))
            throw new fi("Iterable, AsyncIterable or Stream", "source", y);
        } else De(_) || cr(_) || Ze(_) ? (y = _) : (y = yu.from(_));
      else if (typeof _ == "function") {
        if (Ze(y)) {
          var w;
          y = pi((w = y) === null || w === void 0 ? void 0 : w.readable);
        } else y = pi(y);
        if (((y = _(y, { signal: i })), R)) {
          if (!De(y, !0)) throw new fi("AsyncIterable", `transform[${S - 1}]`, y);
        } else {
          var m;
          ci || (ci = li());
          let T = new ci({ objectMode: !0 }),
            I = (m = y) === null || m === void 0 ? void 0 : m.then;
          if (typeof I == "function")
            p++,
              I.call(
                y,
                (M) => {
                  (a = M), M != null && T.write(M), v && T.end(), bt.nextTick(l);
                },
                (M) => {
                  T.destroy(M), bt.nextTick(l, M);
                },
              );
          else if (De(y, !0)) p++, ar(y, T, l, { end: v });
          else if (ai(y) || Ze(y)) {
            let M = y.readable || y;
            p++, ar(M, T, l, { end: v });
          } else throw new fi("AsyncIterable or Promise", "destination", y);
          y = T;
          let { destroy: N, cleanup: F } = gu(y, !1, !0);
          d.push(N), x && s.push(F);
        }
      } else if (bu(_)) {
        if (cr(y)) {
          p += 2;
          let T = ym(y, _, l, { end: v });
          ui(_) && x && s.push(T);
        } else if (Ze(y) || ai(y)) {
          let T = y.readable || y;
          p++, ar(T, _, l, { end: v });
        } else if (De(y)) p++, ar(y, _, l, { end: v });
        else
          throw new bi(
            "val",
            ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
            y,
          );
        y = _;
      } else if (um(_)) {
        if (cr(y)) p++, yi(pi(y), _, l, { end: v });
        else if (ai(y) || De(y)) p++, yi(y, _, l, { end: v });
        else if (Ze(y)) p++, yi(y.readable, _, l, { end: v });
        else
          throw new bi(
            "val",
            ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
            y,
          );
        y = _;
      } else y = yu.from(_);
    }
    return ((i != null && i.aborted) || (o != null && o.aborted)) && bt.nextTick(f), y;
  }
  function ym(e, t, r, { end: n }) {
    let i = !1;
    if (
      (t.on("close", () => {
        i || r(new om());
      }),
      e.pipe(t, { end: !1 }),
      n)
    ) {
      let s = function () {
        (i = !0), t.end();
      };
      var o = s;
      am(e) ? bt.nextTick(s) : e.once("end", s);
    } else r();
    return (
      dr(e, { readable: !0, writable: !1 }, (s) => {
        let f = e._readableState;
        s &&
        s.code === "ERR_STREAM_PREMATURE_CLOSE" &&
        f &&
        f.ended &&
        !f.errored &&
        !f.errorEmitted
          ? e.once("end", r).once("error", r)
          : r(s);
      }),
      dr(t, { readable: !1, writable: !0 }, r)
    );
  }
  mu.exports = { pipelineImpl: wu, pipeline: pm };
});
var wi = E((TS, xu) => {
  "use strict";
  var { pipeline: bm } = hr(),
    pr = le(),
    { destroyer: gm } = Le(),
    {
      isNodeStream: yr,
      isReadable: _u,
      isWritable: Su,
      isWebStream: gi,
      isTransformStream: Pe,
      isWritableStream: Eu,
      isReadableStream: Ru,
    } = oe(),
    {
      AbortError: wm,
      codes: { ERR_INVALID_ARG_VALUE: Au, ERR_MISSING_ARGS: mm },
    } = G(),
    _m = ae();
  xu.exports = function (...t) {
    if (t.length === 0) throw new mm("streams");
    if (t.length === 1) return pr.from(t[0]);
    let r = [...t];
    if (
      (typeof t[0] == "function" && (t[0] = pr.from(t[0])), typeof t[t.length - 1] == "function")
    ) {
      let l = t.length - 1;
      t[l] = pr.from(t[l]);
    }
    for (let l = 0; l < t.length; ++l)
      if (!(!yr(t[l]) && !gi(t[l]))) {
        if (l < t.length - 1 && !(_u(t[l]) || Ru(t[l]) || Pe(t[l])))
          throw new Au(`streams[${l}]`, r[l], "must be readable");
        if (l > 0 && !(Su(t[l]) || Eu(t[l]) || Pe(t[l])))
          throw new Au(`streams[${l}]`, r[l], "must be writable");
      }
    let n, i, o, s, f;
    function c(l) {
      let h = s;
      (s = null), h ? h(l) : l ? f.destroy(l) : !p && !d && f.destroy();
    }
    let u = t[0],
      a = bm(t, c),
      d = !!(Su(u) || Eu(u) || Pe(u)),
      p = !!(_u(a) || Ru(a) || Pe(a));
    if (
      ((f = new pr({
        writableObjectMode: !!(u != null && u.writableObjectMode),
        readableObjectMode: !!(a != null && a.readableObjectMode),
        writable: d,
        readable: p,
      })),
      d)
    ) {
      if (yr(u))
        (f._write = function (h, y, w) {
          u.write(h, y) ? w() : (n = w);
        }),
          (f._final = function (h) {
            u.end(), (i = h);
          }),
          u.on("drain", function () {
            if (n) {
              let h = n;
              (n = null), h();
            }
          });
      else if (gi(u)) {
        let y = (Pe(u) ? u.writable : u).getWriter();
        (f._write = async function (w, m, g) {
          try {
            await y.ready, y.write(w).catch(() => {}), g();
          } catch (S) {
            g(S);
          }
        }),
          (f._final = async function (w) {
            try {
              await y.ready, y.close().catch(() => {}), (i = w);
            } catch (m) {
              w(m);
            }
          });
      }
      let l = Pe(a) ? a.readable : a;
      _m(l, () => {
        if (i) {
          let h = i;
          (i = null), h();
        }
      });
    }
    if (p) {
      if (yr(a))
        a.on("readable", function () {
          if (o) {
            let l = o;
            (o = null), l();
          }
        }),
          a.on("end", function () {
            f.push(null);
          }),
          (f._read = function () {
            for (;;) {
              let l = a.read();
              if (l === null) {
                o = f._read;
                return;
              }
              if (!f.push(l)) return;
            }
          });
      else if (gi(a)) {
        let h = (Pe(a) ? a.readable : a).getReader();
        f._read = async function () {
          for (;;)
            try {
              let { value: y, done: w } = await h.read();
              if (!f.push(y)) return;
              if (w) {
                f.push(null);
                return;
              }
            } catch {
              return;
            }
        };
      }
    }
    return (
      (f._destroy = function (l, h) {
        !l && s !== null && (l = new wm()),
          (o = null),
          (n = null),
          (i = null),
          s === null ? h(l) : ((s = h), yr(a) && gm(a, l));
      }),
      f
    );
  };
});
var ju = E((OS, Si) => {
  "use strict";
  var Sm = globalThis.AbortController || Be().AbortController,
    {
      codes: {
        ERR_INVALID_ARG_VALUE: Em,
        ERR_INVALID_ARG_TYPE: gt,
        ERR_MISSING_ARGS: Rm,
        ERR_OUT_OF_RANGE: Am,
      },
      AbortError: fe,
    } = G(),
    { validateAbortSignal: qe, validateInteger: Tu, validateObject: je } = Ue(),
    xm = q().Symbol("kWeak"),
    Tm = q().Symbol("kResistStopPropagation"),
    { finished: Om } = ae(),
    vm = wi(),
    { addAbortSignalNoValidate: Lm } = ft(),
    { isWritable: km, isNodeStream: Im } = oe(),
    { deprecate: Dm } = U(),
    {
      ArrayPrototypePush: Pm,
      Boolean: qm,
      MathFloor: Ou,
      Number: jm,
      NumberIsNaN: Nm,
      Promise: vu,
      PromiseReject: Lu,
      PromiseResolve: Mm,
      PromisePrototypeThen: ku,
      Symbol: Du,
    } = q(),
    br = Du("kEmpty"),
    Iu = Du("kEof");
  function $m(e, t) {
    if (
      (t != null && je(t, "options"),
      t?.signal != null && qe(t.signal, "options.signal"),
      Im(e) && !km(e))
    )
      throw new Em("stream", e, "must be writable");
    let r = vm(this, e);
    return t != null && t.signal && Lm(t.signal, r), r;
  }
  function gr(e, t) {
    if (typeof e != "function") throw new gt("fn", ["Function", "AsyncFunction"], e);
    t != null && je(t, "options"), t?.signal != null && qe(t.signal, "options.signal");
    let r = 1;
    t?.concurrency != null && (r = Ou(t.concurrency));
    let n = r - 1;
    return (
      t?.highWaterMark != null && (n = Ou(t.highWaterMark)),
      Tu(r, "options.concurrency", 1),
      Tu(n, "options.highWaterMark", 0),
      (n += r),
      async function* () {
        let o = U().AbortSignalAny([t?.signal].filter(qm)),
          s = this,
          f = [],
          c = { signal: o },
          u,
          a,
          d = !1,
          p = 0;
        function l() {
          (d = !0), h();
        }
        function h() {
          (p -= 1), y();
        }
        function y() {
          a && !d && p < r && f.length < n && (a(), (a = null));
        }
        async function w() {
          try {
            for await (let m of s) {
              if (d) return;
              if (o.aborted) throw new fe();
              try {
                if (((m = e(m, c)), m === br)) continue;
                m = Mm(m);
              } catch (g) {
                m = Lu(g);
              }
              (p += 1),
                ku(m, h, l),
                f.push(m),
                u && (u(), (u = null)),
                !d &&
                  (f.length >= n || p >= r) &&
                  (await new vu((g) => {
                    a = g;
                  }));
            }
            f.push(Iu);
          } catch (m) {
            let g = Lu(m);
            ku(g, h, l), f.push(g);
          } finally {
            (d = !0), u && (u(), (u = null));
          }
        }
        w();
        try {
          for (;;) {
            for (; f.length > 0; ) {
              let m = await f[0];
              if (m === Iu) return;
              if (o.aborted) throw new fe();
              m !== br && (yield m), f.shift(), y();
            }
            await new vu((m) => {
              u = m;
            });
          }
        } finally {
          (d = !0), a && (a(), (a = null));
        }
      }.call(this)
    );
  }
  function Cm(e = void 0) {
    return (
      e != null && je(e, "options"),
      e?.signal != null && qe(e.signal, "options.signal"),
      async function* () {
        let r = 0;
        for await (let i of this) {
          var n;
          if (e != null && (n = e.signal) !== null && n !== void 0 && n.aborted)
            throw new fe({ cause: e.signal.reason });
          yield [r++, i];
        }
      }.call(this)
    );
  }
  async function Pu(e, t = void 0) {
    for await (let r of _i.call(this, e, t)) return !0;
    return !1;
  }
  async function Wm(e, t = void 0) {
    if (typeof e != "function") throw new gt("fn", ["Function", "AsyncFunction"], e);
    return !(await Pu.call(this, async (...r) => !(await e(...r)), t));
  }
  async function Bm(e, t) {
    for await (let r of _i.call(this, e, t)) return r;
  }
  async function Fm(e, t) {
    if (typeof e != "function") throw new gt("fn", ["Function", "AsyncFunction"], e);
    async function r(n, i) {
      return await e(n, i), br;
    }
    for await (let n of gr.call(this, r, t));
  }
  function _i(e, t) {
    if (typeof e != "function") throw new gt("fn", ["Function", "AsyncFunction"], e);
    async function r(n, i) {
      return (await e(n, i)) ? n : br;
    }
    return gr.call(this, r, t);
  }
  var mi = class extends Rm {
    constructor() {
      super("reduce"), (this.message = "Reduce of an empty stream requires an initial value");
    }
  };
  async function Um(e, t, r) {
    var n;
    if (typeof e != "function") throw new gt("reducer", ["Function", "AsyncFunction"], e);
    r != null && je(r, "options"), r?.signal != null && qe(r.signal, "options.signal");
    let i = arguments.length > 1;
    if (r != null && (n = r.signal) !== null && n !== void 0 && n.aborted) {
      let u = new fe(void 0, { cause: r.signal.reason });
      throw (this.once("error", () => {}), await Om(this.destroy(u)), u);
    }
    let o = new Sm(),
      s = o.signal;
    if (r != null && r.signal) {
      let u = { once: !0, [xm]: this, [Tm]: !0 };
      r.signal.addEventListener("abort", () => o.abort(), u);
    }
    let f = !1;
    try {
      for await (let u of this) {
        var c;
        if (((f = !0), r != null && (c = r.signal) !== null && c !== void 0 && c.aborted))
          throw new fe();
        i ? (t = await e(t, u, { signal: s })) : ((t = u), (i = !0));
      }
      if (!f && !i) throw new mi();
    } finally {
      o.abort();
    }
    return t;
  }
  async function Vm(e) {
    e != null && je(e, "options"), e?.signal != null && qe(e.signal, "options.signal");
    let t = [];
    for await (let n of this) {
      var r;
      if (e != null && (r = e.signal) !== null && r !== void 0 && r.aborted)
        throw new fe(void 0, { cause: e.signal.reason });
      Pm(t, n);
    }
    return t;
  }
  function Gm(e, t) {
    let r = gr.call(this, e, t);
    return async function* () {
      for await (let i of r) yield* i;
    }.call(this);
  }
  function qu(e) {
    if (((e = jm(e)), Nm(e))) return 0;
    if (e < 0) throw new Am("number", ">= 0", e);
    return e;
  }
  function zm(e, t = void 0) {
    return (
      t != null && je(t, "options"),
      t?.signal != null && qe(t.signal, "options.signal"),
      (e = qu(e)),
      async function* () {
        var n;
        if (t != null && (n = t.signal) !== null && n !== void 0 && n.aborted) throw new fe();
        for await (let o of this) {
          var i;
          if (t != null && (i = t.signal) !== null && i !== void 0 && i.aborted) throw new fe();
          e-- <= 0 && (yield o);
        }
      }.call(this)
    );
  }
  function Hm(e, t = void 0) {
    return (
      t != null && je(t, "options"),
      t?.signal != null && qe(t.signal, "options.signal"),
      (e = qu(e)),
      async function* () {
        var n;
        if (t != null && (n = t.signal) !== null && n !== void 0 && n.aborted) throw new fe();
        for await (let o of this) {
          var i;
          if (t != null && (i = t.signal) !== null && i !== void 0 && i.aborted) throw new fe();
          if ((e-- > 0 && (yield o), e <= 0)) return;
        }
      }.call(this)
    );
  }
  Si.exports.streamReturningOperators = {
    asIndexedPairs: Dm(Cm, "readable.asIndexedPairs will be removed in a future version."),
    drop: zm,
    filter: _i,
    flatMap: Gm,
    map: gr,
    take: Hm,
    compose: $m,
  };
  Si.exports.promiseReturningOperators = {
    every: Wm,
    forEach: Fm,
    reduce: Um,
    toArray: Vm,
    some: Pu,
    find: Bm,
  };
});
var Ei = E((vS, Nu) => {
  "use strict";
  var { ArrayPrototypePop: Km, Promise: Jm } = q(),
    { isIterable: Ym, isNodeStream: Xm, isWebStream: Qm } = oe(),
    { pipelineImpl: Zm } = hr(),
    { finished: e_ } = ae();
  Ri();
  function t_(...e) {
    return new Jm((t, r) => {
      let n,
        i,
        o = e[e.length - 1];
      if (o && typeof o == "object" && !Xm(o) && !Ym(o) && !Qm(o)) {
        let s = Km(e);
        (n = s.signal), (i = s.end);
      }
      Zm(
        e,
        (s, f) => {
          s ? r(s) : t(f);
        },
        { signal: n, end: i },
      );
    });
  }
  Nu.exports = { finished: e_, pipeline: t_ };
});
var Ri = E((LS, Gu) => {
  var { Buffer: r_ } = require("buffer"),
    { ObjectDefineProperty: he, ObjectKeys: Cu, ReflectApply: Wu } = q(),
    {
      promisify: { custom: Bu },
    } = U(),
    { streamReturningOperators: Mu, promiseReturningOperators: $u } = ju(),
    {
      codes: { ERR_ILLEGAL_CONSTRUCTOR: Fu },
    } = G(),
    n_ = wi(),
    { setDefaultHighWaterMark: i_, getDefaultHighWaterMark: o_ } = ut(),
    { pipeline: Uu } = hr(),
    { destroyer: s_ } = Le(),
    Vu = ae(),
    Ai = Ei(),
    wt = oe(),
    P = (Gu.exports = Xt().Stream);
  P.isDestroyed = wt.isDestroyed;
  P.isDisturbed = wt.isDisturbed;
  P.isErrored = wt.isErrored;
  P.isReadable = wt.isReadable;
  P.isWritable = wt.isWritable;
  P.Readable = ct();
  for (let e of Cu(Mu)) {
    let r = function (...n) {
      if (new.target) throw Fu();
      return P.Readable.from(Wu(t, this, n));
    };
    xi = r;
    let t = Mu[e];
    he(r, "name", { __proto__: null, value: t.name }),
      he(r, "length", { __proto__: null, value: t.length }),
      he(P.Readable.prototype, e, {
        __proto__: null,
        value: r,
        enumerable: !1,
        configurable: !0,
        writable: !0,
      });
  }
  var xi;
  for (let e of Cu($u)) {
    let r = function (...i) {
      if (new.target) throw Fu();
      return Wu(t, this, i);
    };
    xi = r;
    let t = $u[e];
    he(r, "name", { __proto__: null, value: t.name }),
      he(r, "length", { __proto__: null, value: t.length }),
      he(P.Readable.prototype, e, {
        __proto__: null,
        value: r,
        enumerable: !1,
        configurable: !0,
        writable: !0,
      });
  }
  var xi;
  P.Writable = ur();
  P.Duplex = le();
  P.Transform = oi();
  P.PassThrough = li();
  P.pipeline = Uu;
  var { addAbortSignal: l_ } = ft();
  P.addAbortSignal = l_;
  P.finished = Vu;
  P.destroy = s_;
  P.compose = n_;
  P.setDefaultHighWaterMark = i_;
  P.getDefaultHighWaterMark = o_;
  he(P, "promises", {
    __proto__: null,
    configurable: !0,
    enumerable: !0,
    get() {
      return Ai;
    },
  });
  he(Uu, Bu, {
    __proto__: null,
    enumerable: !0,
    get() {
      return Ai.pipeline;
    },
  });
  he(Vu, Bu, {
    __proto__: null,
    enumerable: !0,
    get() {
      return Ai.finished;
    },
  });
  P.Stream = P;
  P._isUint8Array = function (t) {
    return t instanceof Uint8Array;
  };
  P._uint8ArrayToBuffer = function (t) {
    return r_.from(t.buffer, t.byteOffset, t.byteLength);
  };
});
var zu = E((kS, L) => {
  "use strict";
  var W = require("stream");
  if (W && process.env.READABLE_STREAM === "disable") {
    let e = W.promises;
    (L.exports._uint8ArrayToBuffer = W._uint8ArrayToBuffer),
      (L.exports._isUint8Array = W._isUint8Array),
      (L.exports.isDisturbed = W.isDisturbed),
      (L.exports.isErrored = W.isErrored),
      (L.exports.isReadable = W.isReadable),
      (L.exports.Readable = W.Readable),
      (L.exports.Writable = W.Writable),
      (L.exports.Duplex = W.Duplex),
      (L.exports.Transform = W.Transform),
      (L.exports.PassThrough = W.PassThrough),
      (L.exports.addAbortSignal = W.addAbortSignal),
      (L.exports.finished = W.finished),
      (L.exports.destroy = W.destroy),
      (L.exports.pipeline = W.pipeline),
      (L.exports.compose = W.compose),
      Object.defineProperty(W, "promises", {
        configurable: !0,
        enumerable: !0,
        get() {
          return e;
        },
      }),
      (L.exports.Stream = W.Stream);
  } else {
    let e = Ri(),
      t = Ei(),
      r = e.Readable.destroy;
    (L.exports = e.Readable),
      (L.exports._uint8ArrayToBuffer = e._uint8ArrayToBuffer),
      (L.exports._isUint8Array = e._isUint8Array),
      (L.exports.isDisturbed = e.isDisturbed),
      (L.exports.isErrored = e.isErrored),
      (L.exports.isReadable = e.isReadable),
      (L.exports.Readable = e.Readable),
      (L.exports.Writable = e.Writable),
      (L.exports.Duplex = e.Duplex),
      (L.exports.Transform = e.Transform),
      (L.exports.PassThrough = e.PassThrough),
      (L.exports.addAbortSignal = e.addAbortSignal),
      (L.exports.finished = e.finished),
      (L.exports.destroy = e.destroy),
      (L.exports.destroy = r),
      (L.exports.pipeline = e.pipeline),
      (L.exports.compose = e.compose),
      Object.defineProperty(e, "promises", {
        configurable: !0,
        enumerable: !0,
        get() {
          return t;
        },
      }),
      (L.exports.Stream = e.Stream);
  }
  L.exports.default = L.exports;
});
var Xu = E((IS, Yu) => {
  "use strict";
  var Hu = Symbol.for("pino.metadata"),
    f_ = Vs(),
    { Duplex: u_ } = zu(),
    { parentPort: Ku, workerData: Ju } = require("worker_threads");
  function a_() {
    let e,
      t,
      r = new Promise((n, i) => {
        (e = n), (t = i);
      });
    return (r.resolve = e), (r.reject = t), r;
  }
  Yu.exports = function (t, r = {}) {
    let n = r.expectPinoConfig === !0 && Ju?.workerData?.pinoWillSendConfig === !0,
      i = r.parse === "lines",
      o = typeof r.parseLine == "function" ? r.parseLine : JSON.parse,
      s = r.close || c_,
      f = f_(
        function (u) {
          let a;
          try {
            a = o(u);
          } catch (d) {
            this.emit("unknown", u, d);
            return;
          }
          if (a === null) {
            this.emit("unknown", u, "Null value ignored");
            return;
          }
          return (
            typeof a != "object" && (a = { data: a, time: Date.now() }),
            f[Hu] && ((f.lastTime = a.time), (f.lastLevel = a.level), (f.lastObj = a)),
            i ? u : a
          );
        },
        { autoDestroy: !0 },
      );
    if (
      ((f._destroy = function (u, a) {
        let d = s(u, a);
        d && typeof d.then == "function" && d.then(a, a);
      }),
      r.expectPinoConfig === !0 &&
        Ju?.workerData?.pinoWillSendConfig !== !0 &&
        setImmediate(() => {
          f.emit(
            "error",
            new Error(
              "This transport is not compatible with the current version of pino. Please upgrade pino to the latest version.",
            ),
          );
        }),
      r.metadata !== !1 && ((f[Hu] = !0), (f.lastTime = 0), (f.lastLevel = 0), (f.lastObj = null)),
      n)
    ) {
      let u = {},
        a = a_();
      return (
        Ku.on("message", function d(p) {
          p.code === "PINO_CONFIG" && ((u = p.config), a.resolve(), Ku.off("message", d));
        }),
        Object.defineProperties(f, {
          levels: {
            get() {
              return u.levels;
            },
          },
          messageKey: {
            get() {
              return u.messageKey;
            },
          },
          errorKey: {
            get() {
              return u.errorKey;
            },
          },
        }),
        a.then(c)
      );
    }
    return c();
    function c() {
      let u = t(f);
      if (u && typeof u.catch == "function")
        u.catch((a) => {
          f.destroy(a);
        }),
          (u = null);
      else if (r.enablePipelining && u) return u_.from({ writable: f, readable: u });
      return f;
    }
  };
  function c_(e, t) {
    process.nextTick(t, e);
  }
});
var Zu = E((DS, Qu) => {
  var d_ = new Function("modulePath", "return import(modulePath)");
  function h_(e) {
    return typeof __non_webpack__require__ == "function" ? __non_webpack__require__(e) : require(e);
  }
  Qu.exports = { realImport: d_, realRequire: h_ };
});
var ta = E((PS, ea) => {
  "use strict";
  var { realImport: p_, realRequire: mt } = Zu();
  ea.exports = y_;
  async function y_(e) {
    let t;
    try {
      let r = e.startsWith("file://") ? e : "file://" + e;
      r.endsWith(".ts") || r.endsWith(".cts")
        ? (process[Symbol.for("ts-node.register.instance")]
            ? mt("ts-node/register")
            : process.env && process.env.TS_NODE_DEV && mt("ts-node-dev"),
          (t = mt(decodeURIComponent(e))))
        : (t = await p_(r));
    } catch (r) {
      if (r.code === "ENOTDIR" || r.code === "ERR_MODULE_NOT_FOUND") t = mt(e);
      else if (r.code === void 0 || r.code === "ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING")
        t = mt(decodeURIComponent(e));
      else throw r;
    }
    if (
      (typeof t == "object" && (t = t.default),
      typeof t == "object" && (t = t.default),
      typeof t != "function")
    )
      throw Error("exported worker is not a function");
    return t;
  }
});
var b_ = require("events"),
  { pipeline: g_, PassThrough: w_ } = require("stream"),
  m_ = Ws(),
  __ = Xu(),
  ra = ta();
module.exports = async function ({ targets: e, pipelines: t, levels: r, dedupe: n }) {
  let i = [];
  if (
    (e &&
      e.length &&
      ((e = await Promise.all(
        e.map(async (f) => {
          let u = await (await ra(f.target))(f.options);
          return { level: f.level, stream: u };
        }),
      )),
      i.push(...e)),
    t &&
      t.length &&
      ((t = await Promise.all(
        t.map(async (f) => {
          let c,
            u = await Promise.all(
              f.map(async (a) => ((c = a.level), await (await ra(a.target))(a.options))),
            );
          return { level: c, stream: s(u) };
        }),
      )),
      i.push(...t)),
    i.length === 1)
  )
    return i[0].stream;
  return __(o, {
    parse: "lines",
    metadata: !0,
    close(f, c) {
      let u = 0;
      for (let d of i) u++, d.stream.on("close", a), d.stream.end();
      function a() {
        --u === 0 && c(f);
      }
    },
  });
  function o(f) {
    let c = m_.multistream(i, { levels: r, dedupe: n });
    f.on("data", function (u) {
      let { lastTime: a, lastMsg: d, lastObj: p, lastLevel: l } = this;
      (c.lastLevel = l),
        (c.lastTime = a),
        (c.lastMsg = d),
        (c.lastObj = p),
        c.write(
          u +
            `
`,
        );
    });
  }
  function s(f) {
    let c = new b_(),
      u = new w_({
        autoDestroy: !0,
        destroy(a, d) {
          c.on("error", d), c.on("closed", d);
        },
      });
    return (
      g_(u, ...f, function (a) {
        if (a && a.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          c.emit("error", a);
          return;
        }
        c.emit("closed");
      }),
      u
    );
  }
};
//# sourceMappingURL=pino-worker.js.map
