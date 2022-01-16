function _() {}
function R(t, n) {
  for (const e in n) t[e] = n[e];
  return t;
}
function A(t) {
  return t();
}
function z() {
  return Object.create(null);
}
function h(t) {
  t.forEach(A);
}
function O(t) {
  return typeof t == 'function';
}
function P(t, n) {
  return t != t
    ? n == n
    : t !== n || (t && typeof t == 'object') || typeof t == 'function';
}
function B(t) {
  return Object.keys(t).length === 0;
}
function U(t, n) {
  t.appendChild(n);
}
function V(t, n, e) {
  t.insertBefore(n, e || null);
}
function D(t) {
  t.parentNode.removeChild(t);
}
function W(t, n) {
  for (let e = 0; e < t.length; e += 1) t[e] && t[e].d(n);
}
function X(t) {
  return document.createElement(t);
}
function Y(t) {
  return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function F(t) {
  return document.createTextNode(t);
}
function Z() {
  return F(' ');
}
function tt(t, n, e, s) {
  return t.addEventListener(n, e, s), () => t.removeEventListener(n, e, s);
}
function nt(t, n, e) {
  e == null
    ? t.removeAttribute(n)
    : t.getAttribute(n) !== e && t.setAttribute(n, e);
}
function M(t) {
  return Array.from(t.childNodes);
}
function et(t, n) {
  (n = '' + n), t.wholeText !== n && (t.data = n);
}
function ot(t, n) {
  t.value = n ?? '';
}
function st(t, n, e, s) {
  e === null
    ? t.style.removeProperty(n)
    : t.style.setProperty(n, e, s ? 'important' : '');
}
function rt(t, n, e) {
  t.classList[e ? 'add' : 'remove'](n);
}
let p;
function g(t) {
  p = t;
}
function C() {
  if (!p) throw new Error('Function called outside component initialization');
  return p;
}
function it(t) {
  C().$$.on_mount.push(t);
}
function ct(t) {
  C().$$.on_destroy.push(t);
}
const m = [],
  N = [],
  y = [],
  q = [],
  T = Promise.resolve();
let w = !1;
function G() {
  w || ((w = !0), T.then(L));
}
function x(t) {
  y.push(t);
}
const k = new Set();
let $ = 0;
function L() {
  const t = p;
  do {
    for (; $ < m.length; ) {
      const n = m[$];
      $++, g(n), H(n.$$);
    }
    for (g(null), m.length = 0, $ = 0; N.length; ) N.pop()();
    for (let n = 0; n < y.length; n += 1) {
      const e = y[n];
      k.has(e) || (k.add(e), e());
    }
    y.length = 0;
  } while (m.length);
  for (; q.length; ) q.pop()();
  (w = !1), k.clear(), g(t);
}
function H(t) {
  if (t.fragment !== null) {
    t.update(), h(t.before_update);
    const n = t.dirty;
    (t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, n),
      t.after_update.forEach(x);
  }
}
const b = new Set();
let l;
function ut() {
  l = { r: 0, c: [], p: l };
}
function ft() {
  l.r || h(l.c), (l = l.p);
}
function I(t, n) {
  t && t.i && (b.delete(t), t.i(n));
}
function at(t, n, e, s) {
  if (t && t.o) {
    if (b.has(t)) return;
    b.add(t),
      l.c.push(() => {
        b.delete(t), s && (e && t.d(1), s());
      }),
      t.o(n);
  }
}
function lt(t, n) {
  const e = {},
    s = {},
    c = { $$scope: 1 };
  let f = t.length;
  for (; f--; ) {
    const u = t[f],
      i = n[f];
    if (i) {
      for (const r in u) r in i || (s[r] = 1);
      for (const r in i) c[r] || ((e[r] = i[r]), (c[r] = 1));
      t[f] = i;
    } else for (const r in u) c[r] = 1;
  }
  for (const u in s) u in e || (e[u] = void 0);
  return e;
}
function dt(t) {
  return typeof t == 'object' && t !== null ? t : {};
}
function _t(t) {
  t && t.c();
}
function J(t, n, e, s) {
  const { fragment: c, on_mount: f, on_destroy: u, after_update: i } = t.$$;
  c && c.m(n, e),
    s ||
      x(() => {
        const r = f.map(A).filter(O);
        u ? u.push(...r) : h(r), (t.$$.on_mount = []);
      }),
    i.forEach(x);
}
function K(t, n) {
  const e = t.$$;
  e.fragment !== null &&
    (h(e.on_destroy),
    e.fragment && e.fragment.d(n),
    (e.on_destroy = e.fragment = null),
    (e.ctx = []));
}
function Q(t, n) {
  t.$$.dirty[0] === -1 && (m.push(t), G(), t.$$.dirty.fill(0)),
    (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function ht(t, n, e, s, c, f, u, i = [-1]) {
  const r = p;
  g(t);
  const o = (t.$$ = {
    fragment: null,
    ctx: null,
    props: f,
    update: _,
    not_equal: c,
    bound: z(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(n.context || (r ? r.$$.context : [])),
    callbacks: z(),
    dirty: i,
    skip_bound: !1,
    root: n.target || r.$$.root,
  });
  u && u(o.root);
  let E = !1;
  if (
    ((o.ctx = e
      ? e(t, n.props || {}, (a, j, ...S) => {
          const v = S.length ? S[0] : j;
          return (
            o.ctx &&
              c(o.ctx[a], (o.ctx[a] = v)) &&
              (!o.skip_bound && o.bound[a] && o.bound[a](v), E && Q(t, a)),
            j
          );
        })
      : []),
    o.update(),
    (E = !0),
    h(o.before_update),
    (o.fragment = s ? s(o.ctx) : !1),
    n.target)
  ) {
    if (n.hydrate) {
      const a = M(n.target);
      o.fragment && o.fragment.l(a), a.forEach(D);
    } else o.fragment && o.fragment.c();
    n.intro && I(t.$$.fragment), J(t, n.target, n.anchor, n.customElement), L();
  }
  g(r);
}
class pt {
  $destroy() {
    K(this, 1), (this.$destroy = _);
  }
  $on(n, e) {
    const s = this.$$.callbacks[n] || (this.$$.callbacks[n] = []);
    return (
      s.push(e),
      () => {
        const c = s.indexOf(e);
        c !== -1 && s.splice(c, 1);
      }
    );
  }
  $set(n) {
    this.$$set &&
      !B(n) &&
      ((this.$$.skip_bound = !0), this.$$set(n), (this.$$.skip_bound = !1));
  }
}
const d = [];
function gt(t, n = _) {
  let e;
  const s = new Set();
  function c(i) {
    if (P(t, i) && ((t = i), e)) {
      const r = !d.length;
      for (const o of s) o[1](), d.push(o, t);
      if (r) {
        for (let o = 0; o < d.length; o += 2) d[o][0](d[o + 1]);
        d.length = 0;
      }
    }
  }
  function f(i) {
    c(i(t));
  }
  function u(i, r = _) {
    const o = [i, r];
    return (
      s.add(o),
      s.size === 1 && (e = n(c) || _),
      i(t),
      () => {
        s.delete(o), s.size === 0 && (e(), (e = null));
      }
    );
  }
  return { set: c, update: f, subscribe: u };
}
export {
  rt as A,
  ut as B,
  ft as C,
  R as D,
  it as E,
  ct as F,
  pt as S,
  Z as a,
  nt as b,
  st as c,
  V as d,
  X as e,
  U as f,
  et as g,
  D as h,
  ht as i,
  Y as j,
  W as k,
  tt as l,
  ot as m,
  _ as n,
  O as o,
  _t as p,
  J as q,
  h as r,
  P as s,
  F as t,
  lt as u,
  dt as v,
  gt as w,
  I as x,
  at as y,
  K as z,
};
