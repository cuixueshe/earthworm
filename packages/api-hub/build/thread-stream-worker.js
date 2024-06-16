"use strict";
var I = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var w = I((b, R) => {
  var g = new Function("modulePath", "return import(modulePath)");
  function X(e) {
    return typeof __non_webpack__require__ == "function" ? __non_webpack__require__(e) : require(e);
  }
  R.exports = { realImport: g, realRequire: X };
});
var T = I((B, D) => {
  "use strict";
  D.exports = { WRITE_INDEX: 4, READ_INDEX: 8 };
});
var h = I((j, M) => {
  "use strict";
  function q(e, t, c, _, r) {
    let A = Date.now() + _,
      s = Atomics.load(e, t);
    if (s === c) {
      r(null, "ok");
      return;
    }
    let u = s,
      l = (E) => {
        Date.now() > A
          ? r(null, "timed-out")
          : setTimeout(() => {
              (u = s),
                (s = Atomics.load(e, t)),
                s === u
                  ? l(E >= 1e3 ? 1e3 : E * 2)
                  : s === c
                    ? r(null, "ok")
                    : r(null, "not-equal");
            }, E);
      };
    l(1);
  }
  function U(e, t, c, _, r) {
    let A = Date.now() + _,
      s = Atomics.load(e, t);
    if (s !== c) {
      r(null, "ok");
      return;
    }
    let u = (l) => {
      Date.now() > A
        ? r(null, "timed-out")
        : setTimeout(() => {
            (s = Atomics.load(e, t)), s !== c ? r(null, "ok") : u(l >= 1e3 ? 1e3 : l * 2);
          }, l);
    };
    u(1);
  }
  M.exports = { wait: q, waitDiff: U };
});
var { realImport: x, realRequire: f } = w(),
  { workerData: O, parentPort: p } = require("worker_threads"),
  { WRITE_INDEX: m, READ_INDEX: n } = T(),
  { waitDiff: y } = h(),
  { dataBuf: k, filename: a, stateBuf: W } = O,
  i,
  o = new Int32Array(W),
  N = Buffer.from(k);
async function S() {
  let e;
  try {
    a.endsWith(".ts") || a.endsWith(".cts")
      ? (process[Symbol.for("ts-node.register.instance")]
          ? process.env.TS_NODE_DEV && f("ts-node-dev")
          : f("ts-node/register"),
        (e = f(
          decodeURIComponent(a.replace(process.platform === "win32" ? "file:///" : "file://", "")),
        )))
      : (e = await x(a));
  } catch (t) {
    if ((t.code === "ENOTDIR" || t.code === "ERR_MODULE_NOT_FOUND") && a.startsWith("file://"))
      e = f(decodeURIComponent(a.replace("file://", "")));
    else if (t.code === void 0 || t.code === "ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING")
      try {
        e = f(
          decodeURIComponent(a.replace(process.platform === "win32" ? "file:///" : "file://", "")),
        );
      } catch {
        throw t;
      }
    else throw t;
  }
  typeof e == "object" && (e = e.default),
    typeof e == "object" && (e = e.default),
    (i = await e(O.workerData)),
    i.on("error", function (t) {
      Atomics.store(o, m, -2),
        Atomics.notify(o, m),
        Atomics.store(o, n, -2),
        Atomics.notify(o, n),
        p.postMessage({ code: "ERROR", err: t });
    }),
    i.on("close", function () {
      let t = Atomics.load(o, m);
      Atomics.store(o, n, t),
        Atomics.notify(o, n),
        setImmediate(() => {
          process.exit(0);
        });
    });
}
S().then(function () {
  p.postMessage({ code: "READY" }), process.nextTick(d);
});
function d() {
  let e = Atomics.load(o, n),
    t = Atomics.load(o, m);
  if (t === e) {
    t === N.length ? y(o, n, t, 1 / 0, d) : y(o, m, t, 1 / 0, d);
    return;
  }
  if (t === -1) {
    i.end();
    return;
  }
  let c = N.toString("utf8", e, t);
  i.write(c)
    ? (Atomics.store(o, n, t), Atomics.notify(o, n), setImmediate(d))
    : i.once("drain", function () {
        Atomics.store(o, n, t), Atomics.notify(o, n), d();
      });
}
process.on("unhandledRejection", function (e) {
  p.postMessage({ code: "ERROR", err: e }), process.exit(1);
});
process.on("uncaughtException", function (e) {
  p.postMessage({ code: "ERROR", err: e }), process.exit(1);
});
process.once("exit", (e) => {
  if (e !== 0) {
    process.exit(e);
    return;
  }
  i?.writableNeedDrain &&
    !i?.writableEnded &&
    p.postMessage({
      code: "WARNING",
      err: new Error(
        "ThreadStream: process exited before destination stream was drained. this may indicate that the destination stream try to write to a another missing stream",
      ),
    }),
    process.exit(0);
});
//# sourceMappingURL=thread-stream-worker.js.map
