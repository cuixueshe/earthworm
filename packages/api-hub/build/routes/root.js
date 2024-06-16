"use strict";
var s = Object.defineProperty;
var i = Object.getOwnPropertyDescriptor;
var u = Object.getOwnPropertyNames;
var y = Object.prototype.hasOwnProperty;
var a = (t, n) => {
    for (var r in n) s(t, r, { get: n[r], enumerable: !0 });
  },
  e = (t, n, r, c) => {
    if ((n && typeof n == "object") || typeof n == "function")
      for (let o of u(n))
        !y.call(t, o) &&
          o !== r &&
          s(t, o, { get: () => n[o], enumerable: !(c = i(n, o)) || c.enumerable });
    return t;
  };
var f = (t) => e(s({}, "__esModule", { value: !0 }), t);
var m = {};
a(m, { default: () => l });
module.exports = f(m);
var g = async (t) => {
    t.get("/", async function () {
      return { root: !0 };
    });
  },
  l = g;
//# sourceMappingURL=root.js.map
