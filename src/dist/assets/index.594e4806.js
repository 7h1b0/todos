var _e = Object.defineProperty,
  be = Object.defineProperties;
var ke = Object.getOwnPropertyDescriptors;
var te = Object.getOwnPropertySymbols;
var ye = Object.prototype.hasOwnProperty,
  we = Object.prototype.propertyIsEnumerable;
var ne = (t, e, n) =>
    e in t
      ? _e(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (t[e] = n),
  ae = (t, e) => {
    for (var n in e || (e = {})) ye.call(e, n) && ne(t, n, e[n]);
    if (te) for (var n of te(e)) we.call(e, n) && ne(t, n, e[n]);
    return t;
  },
  re = (t, e) => be(t, ke(e));
import {
  w as ve,
  S as P,
  i as B,
  s as N,
  e as w,
  t as E,
  a as O,
  b as d,
  c as se,
  d as L,
  f as h,
  g as M,
  h as j,
  j as F,
  l as I,
  n as C,
  k as K,
  r as q,
  m as J,
  o as Ae,
  p as U,
  q as V,
  u as De,
  v as Ie,
  x as T,
  y as S,
  z,
  A as le,
  B as Y,
  C as Q,
  D as Te,
  E as Oe,
  F as Se,
} from './vendor.0547f6db.js';
const Ee = function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) a(l);
  new MutationObserver((l) => {
    for (const r of l)
      if (r.type === 'childList')
        for (const s of r.addedNodes)
          s.tagName === 'LINK' && s.rel === 'modulepreload' && a(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const r = {};
    return (
      l.integrity && (r.integrity = l.integrity),
      l.referrerpolicy && (r.referrerPolicy = l.referrerpolicy),
      l.crossorigin === 'use-credentials'
        ? (r.credentials = 'include')
        : l.crossorigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    );
  }
  function a(l) {
    if (l.ep) return;
    l.ep = !0;
    const r = n(l);
    fetch(l.href, r);
  }
};
Ee();
function oe(t) {
  return new Intl.DateTimeFormat().format(new Date(t));
}
function Ce(t, e) {
  return t.reduce(
    (n, a) => (
      Object.prototype.hasOwnProperty.call(a, e) &&
        (n[a[e]] = [...(n[a[e]] || []), a]),
      n
    ),
    {},
  );
}
function Le(t, e) {
  return t.updatedAt - e.updatedAt;
}
const ie = ['#bf616a', '#d08770', '#ebcb8b', '#a3be8c', '#b48ead'];
function je(t) {
  const e = t.length;
  let n = 0;
  for (let l = 0; l < e; l++) n += t.charCodeAt(l);
  const a = n % ie.length;
  return ie[a];
}
function Re(t = '') {
  return t
    .split(',')
    .filter(Boolean)
    .map((n) => n.trim());
}
const W = 'REMOVE',
  X = 'ADD',
  Z = 'UPDATE',
  x = 'ADD_ALL';
function Pe(t, e, n, a = Date.now()) {
  return {
    type: X,
    data: { id: a, title: t, categoryId: e, date: a, updatedAt: a, tags: n },
  };
}
function Be(t) {
  return { type: W, data: t };
}
function Ne(t) {
  return { type: Z, data: t };
}
function Me(t) {
  return { type: x, data: t };
}
function Fe(t, e) {
  switch (e.type) {
    case x:
    case X:
      return t.concat(e.data);
    case W:
      return t.filter(({ id: n }) => n !== e.data);
    case Z: {
      const n = t.findIndex(({ id: a }) => a === e.data.id);
      return ~n ? [...t.slice(0, n), e.data, ...t.slice(n + 1)] : t;
    }
    default:
      return t;
  }
}
const G = (t) =>
  new Promise((e, n) => {
    (t.onsuccess = e), (t.onerror = n);
  });
function ce(t = 'tasks') {
  let e;
  const n = {
    findAll: () => G(e.transaction(t).objectStore(t).getAll()),
    add: (a) => G(e.transaction(t, 'readwrite').objectStore(t).add(a)),
    addAll: (a) =>
      new Promise((l, r) => {
        const s = e.transaction(t, 'readwrite');
        a.forEach((i) => s.objectStore(t).add(i)),
          (s.oncomplete = l),
          (s.onerror = r);
      }),
    remove: (a) => G(e.transaction(t, 'readwrite').objectStore(t).delete(a)),
    edit: (a) => G(e.transaction(t, 'readwrite').objectStore(t).put(a)),
  };
  return new Promise((a, l) => {
    const r = window.indexedDB.open('Todos', 5);
    (r.onerror = l),
      (r.onsuccess = (s) => {
        (e = s.target.result), a(n);
      }),
      (r.onupgradeneeded = (s) => {
        s.target.result.createObjectStore('tasks', { keyPath: 'id' });
      });
  });
}
function qe(t) {
  return async (e) => {
    const n = await ce();
    switch (e.type) {
      case x:
        await n.addAll(e.data);
        break;
      case X:
        await n.add(e.data);
        break;
      case W:
        await n.remove(e.data);
        break;
      case Z:
        await n.edit(e.data);
        break;
    }
    t(e);
  };
}
const $ = ve([]);
async function Je(t) {
  $.update((e) => Fe(e, t));
}
var H = qe(Je);
function ue(t, e, n) {
  const a = t.slice();
  a[8] = e[n];
  const l = je(a[8]);
  return (a[9] = l), a;
}
function de(t) {
  let e,
    n = t[8] + '',
    a,
    l;
  return {
    c() {
      (e = w('li')),
        (a = E(n)),
        (l = O()),
        d(e, 'class', 'tag'),
        se(e, 'background-color', t[9], !1);
    },
    m(r, s) {
      L(r, e, s), h(e, a), h(e, l);
    },
    p(r, s) {
      s & 4 && n !== (n = r[8] + '') && M(a, n),
        s & 4 && se(e, 'background-color', r[9], !1);
    },
    d(r) {
      r && j(e);
    },
  };
}
function Ue(t) {
  let e,
    n,
    a,
    l,
    r,
    s,
    i,
    o,
    c,
    g,
    u,
    b,
    A,
    k = oe(t[3]) + '',
    m,
    R,
    p,
    _ = t[2],
    y = [];
  for (let f = 0; f < _.length; f += 1) y[f] = de(ue(t, _, f));
  return {
    c() {
      (e = w('article')),
        (n = w('h2')),
        (a = E(t[1])),
        (l = O()),
        (r = w('button')),
        (s = F('svg')),
        (i = F('path')),
        (c = O()),
        (g = w('ul'));
      for (let f = 0; f < y.length; f += 1) y[f].c();
      (u = O()),
        (b = w('p')),
        (A = E('Last update: ')),
        (m = E(k)),
        d(n, 'id', t[0]),
        d(n, 'class', 'title'),
        d(i, 'stroke-width', '2'),
        d(i, 'd', 'M6 18L18 6M6 6l12 12'),
        d(s, 'xmlns', 'http://www.w3.org/2000/svg'),
        d(s, 'viewBox', '0 0 24 24'),
        d(s, 'stroke', 'currentColor'),
        d(s, 'aria-hidden', 'true'),
        d(r, 'class', 'delete'),
        d(r, 'aria-label', (o = `Remove ${t[1]}`)),
        d(r, 'type', 'button'),
        d(g, 'class', 'tags'),
        d(b, 'class', 'caption'),
        d(e, 'class', 'task'),
        d(e, 'draggable', 'true'),
        d(e, 'aria-labelledby', t[0]);
    },
    m(f, D) {
      L(f, e, D),
        h(e, n),
        h(n, a),
        h(e, l),
        h(e, r),
        h(r, s),
        h(s, i),
        h(e, c),
        h(e, g);
      for (let v = 0; v < y.length; v += 1) y[v].m(g, null);
      h(e, u),
        h(e, b),
        h(b, A),
        h(b, m),
        R || ((p = [I(r, 'click', t[5]), I(e, 'dragstart', t[4])]), (R = !0));
    },
    p(f, [D]) {
      if (
        (D & 2 && M(a, f[1]),
        D & 1 && d(n, 'id', f[0]),
        D & 2 && o !== (o = `Remove ${f[1]}`) && d(r, 'aria-label', o),
        D & 4)
      ) {
        _ = f[2];
        let v;
        for (v = 0; v < _.length; v += 1) {
          const ee = ue(f, _, v);
          y[v] ? y[v].p(ee, D) : ((y[v] = de(ee)), y[v].c(), y[v].m(g, null));
        }
        for (; v < y.length; v += 1) y[v].d(1);
        y.length = _.length;
      }
      D & 8 && k !== (k = oe(f[3]) + '') && M(m, k),
        D & 1 && d(e, 'aria-labelledby', f[0]);
    },
    i: C,
    o: C,
    d(f) {
      f && j(e), K(y, f), (R = !1), q(p);
    },
  };
}
function Ve(t, e, n) {
  let { id: a } = e,
    { title: l } = e,
    { tags: r } = e,
    { date: s } = e,
    { updatedAt: i } = e,
    { categoryId: o } = e;
  function c(u) {
    u.dataTransfer.setData(
      'task',
      JSON.stringify({
        id: a,
        title: l,
        updatedAt: i,
        tags: r,
        date: s,
        categoryId: o,
      }),
    ),
      (u.dataTransfer.effectAllowed = 'move'),
      (u.dataTransfer.dropEffect = 'move');
  }
  function g() {
    H(Be(a));
  }
  return (
    (t.$$set = (u) => {
      'id' in u && n(0, (a = u.id)),
        'title' in u && n(1, (l = u.title)),
        'tags' in u && n(2, (r = u.tags)),
        'date' in u && n(6, (s = u.date)),
        'updatedAt' in u && n(3, (i = u.updatedAt)),
        'categoryId' in u && n(7, (o = u.categoryId));
    }),
    [a, l, r, i, c, g, s, o]
  );
}
class ze extends P {
  constructor(e) {
    super();
    B(this, e, Ve, Ue, N, {
      id: 0,
      title: 1,
      tags: 2,
      date: 6,
      updatedAt: 3,
      categoryId: 7,
    });
  }
}
function Ge(t) {
  let e, n, a, l, r, s, i, o, c, g, u;
  return {
    c() {
      (e = w('form')),
        (n = w('input')),
        (a = O()),
        (l = w('input')),
        (r = O()),
        (s = w('div')),
        (i = w('button')),
        (i.textContent = 'Cancel'),
        (o = O()),
        (c = w('button')),
        (c.textContent = 'Add task'),
        d(n, 'type', 'text'),
        d(n, 'placeholder', 'Enter task title'),
        d(n, 'aria-label', 'task title'),
        d(l, 'type', 'text'),
        d(l, 'placeholder', 'Enter tags separated by comma'),
        d(l, 'aria-label', 'tags separated by comma'),
        d(i, 'class', 'flat'),
        d(i, 'type', 'button'),
        d(c, 'class', 'raise'),
        d(s, 'class', 'buttons');
    },
    m(b, A) {
      L(b, e, A),
        h(e, n),
        J(n, t[1]),
        h(e, a),
        h(e, l),
        J(l, t[2]),
        h(e, r),
        h(e, s),
        h(s, i),
        h(s, o),
        h(s, c),
        g ||
          ((u = [
            I(n, 'input', t[5]),
            I(l, 'input', t[6]),
            I(i, 'click', function () {
              Ae(t[0]) && t[0].apply(this, arguments);
            }),
            I(e, 'submit', t[3]),
          ]),
          (g = !0));
    },
    p(b, [A]) {
      (t = b),
        A & 2 && n.value !== t[1] && J(n, t[1]),
        A & 4 && l.value !== t[2] && J(l, t[2]);
    },
    i: C,
    o: C,
    d(b) {
      b && j(e), (g = !1), q(u);
    },
  };
}
function He(t, e, n) {
  let { categoryId: a } = e,
    { onClose: l } = e,
    r = '',
    s = '';
  function i(g) {
    g.preventDefault(), l();
    const u = Re(s);
    H(Pe(r, a, u));
  }
  function o() {
    (r = this.value), n(1, r);
  }
  function c() {
    (s = this.value), n(2, s);
  }
  return (
    (t.$$set = (g) => {
      'categoryId' in g && n(4, (a = g.categoryId)),
        'onClose' in g && n(0, (l = g.onClose));
    }),
    [l, r, s, i, a, o, c]
  );
}
class Ke extends P {
  constructor(e) {
    super();
    B(this, e, He, Ge, N, { categoryId: 4, onClose: 0 });
  }
}
function fe(t, e, n) {
  const a = t.slice();
  return (a[11] = e[n]), a;
}
function Ye(t) {
  let e, n, a, l, r, s, i, o;
  return {
    c() {
      (e = w('button')),
        (n = F('svg')),
        (a = F('path')),
        (l = E(`
      Add `)),
        (r = E(t[0])),
        (s = E(' task')),
        d(
          a,
          'd',
          'M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z',
        ),
        d(n, 'xmlns', 'http://www.w3.org/2000/svg'),
        d(n, 'viewBox', '0 0 20 20'),
        d(n, 'aria-hidden', 'true'),
        d(e, 'class', 'add'),
        d(e, 'type', 'button');
    },
    m(c, g) {
      L(c, e, g),
        h(e, n),
        h(n, a),
        h(e, l),
        h(e, r),
        h(e, s),
        i || ((o = I(e, 'click', t[10])), (i = !0));
    },
    p(c, g) {
      g & 1 && M(r, c[0]);
    },
    i: C,
    o: C,
    d(c) {
      c && j(e), (i = !1), o();
    },
  };
}
function Qe(t) {
  let e, n;
  return (
    (e = new Ke({ props: { categoryId: t[1], onClose: t[9] } })),
    {
      c() {
        U(e.$$.fragment);
      },
      m(a, l) {
        V(e, a, l), (n = !0);
      },
      p(a, l) {
        const r = {};
        l & 2 && (r.categoryId = a[1]), l & 4 && (r.onClose = a[9]), e.$set(r);
      },
      i(a) {
        n || (T(e.$$.fragment, a), (n = !0));
      },
      o(a) {
        S(e.$$.fragment, a), (n = !1);
      },
      d(a) {
        z(e, a);
      },
    }
  );
}
function ge(t) {
  let e, n;
  const a = [t[11]];
  let l = {};
  for (let r = 0; r < a.length; r += 1) l = Te(l, a[r]);
  return (
    (e = new ze({ props: l })),
    {
      c() {
        U(e.$$.fragment);
      },
      m(r, s) {
        V(e, r, s), (n = !0);
      },
      p(r, s) {
        const i = s & 16 ? De(a, [Ie(r[11])]) : {};
        e.$set(i);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        S(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        z(e, r);
      },
    }
  );
}
function We(t) {
  let e, n, a, l, r, s, i, o, c, g;
  const u = [Qe, Ye],
    b = [];
  function A(p, _) {
    return p[2] ? 0 : 1;
  }
  (r = A(t)), (s = b[r] = u[r](t));
  let k = t[4],
    m = [];
  for (let p = 0; p < k.length; p += 1) m[p] = ge(fe(t, k, p));
  const R = (p) =>
    S(m[p], 1, 1, () => {
      m[p] = null;
    });
  return {
    c() {
      (e = w('section')),
        (n = w('h2')),
        (a = E(t[0])),
        (l = O()),
        s.c(),
        (i = O());
      for (let p = 0; p < m.length; p += 1) m[p].c();
      d(n, 'id', t[1]), d(e, 'aria-labelledby', t[1]), le(e, 'over', t[3]);
    },
    m(p, _) {
      L(p, e, _), h(e, n), h(n, a), h(e, l), b[r].m(e, null), h(e, i);
      for (let y = 0; y < m.length; y += 1) m[y].m(e, null);
      (o = !0),
        c ||
          ((g = [
            I(e, 'dragover', t[5]),
            I(e, 'dragleave', t[6]),
            I(e, 'drop', t[7]),
          ]),
          (c = !0));
    },
    p(p, [_]) {
      (!o || _ & 1) && M(a, p[0]), (!o || _ & 2) && d(n, 'id', p[1]);
      let y = r;
      if (
        ((r = A(p)),
        r === y
          ? b[r].p(p, _)
          : (Y(),
            S(b[y], 1, 1, () => {
              b[y] = null;
            }),
            Q(),
            (s = b[r]),
            s ? s.p(p, _) : ((s = b[r] = u[r](p)), s.c()),
            T(s, 1),
            s.m(e, i)),
        _ & 16)
      ) {
        k = p[4];
        let f;
        for (f = 0; f < k.length; f += 1) {
          const D = fe(p, k, f);
          m[f]
            ? (m[f].p(D, _), T(m[f], 1))
            : ((m[f] = ge(D)), m[f].c(), T(m[f], 1), m[f].m(e, null));
        }
        for (Y(), f = k.length; f < m.length; f += 1) R(f);
        Q();
      }
      (!o || _ & 2) && d(e, 'aria-labelledby', p[1]),
        _ & 8 && le(e, 'over', p[3]);
    },
    i(p) {
      if (!o) {
        T(s);
        for (let _ = 0; _ < k.length; _ += 1) T(m[_]);
        o = !0;
      }
    },
    o(p) {
      S(s), (m = m.filter(Boolean));
      for (let _ = 0; _ < m.length; _ += 1) S(m[_]);
      o = !1;
    },
    d(p) {
      p && j(e), b[r].d(), K(m, p), (c = !1), q(g);
    },
  };
}
function Xe(t, e, n) {
  let a,
    { label: l } = e,
    { categoryId: r } = e,
    { tasks: s } = e,
    i = !1,
    o = !1;
  function c(k) {
    k.preventDefault(), n(3, (o = !0));
  }
  function g() {
    n(3, (o = !1));
  }
  function u(k) {
    k.preventDefault(), n(3, (o = !1));
    const m = JSON.parse(k.dataTransfer.getData('task'));
    H(Ne(re(ae({}, m), { categoryId: r, updatedAt: Date.now() })));
  }
  const b = () => {
      n(2, (i = !1));
    },
    A = () => {
      n(2, (i = !0));
    };
  return (
    (t.$$set = (k) => {
      'label' in k && n(0, (l = k.label)),
        'categoryId' in k && n(1, (r = k.categoryId)),
        'tasks' in k && n(8, (s = k.tasks));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 256 && n(4, (a = s.sort(Le)));
    }),
    [l, r, i, o, a, c, g, u, s, b, A]
  );
}
class Ze extends P {
  constructor(e) {
    super();
    B(this, e, Xe, We, N, { label: 0, categoryId: 1, tasks: 8 });
  }
}
function xe(t) {
  let e, n, a, l, r, s, i, o;
  return {
    c() {
      (e = w('header')),
        (n = w('button')),
        (n.textContent = 'Export'),
        (a = O()),
        (l = w('label')),
        (r = E(`Import
    `)),
        (s = w('input')),
        d(n, 'class', 'export'),
        d(n, 'type', 'button'),
        d(s, 'class', 'hidden'),
        d(s, 'type', 'file'),
        d(l, 'class', 'export');
    },
    m(c, g) {
      L(c, e, g),
        h(e, n),
        h(e, a),
        h(e, l),
        h(l, r),
        h(l, s),
        i || ((o = [I(n, 'click', t[0]), I(s, 'input', t[1])]), (i = !0));
    },
    p: C,
    i: C,
    o: C,
    d(c) {
      c && j(e), (i = !1), q(o);
    },
  };
}
function $e(t, e, n) {
  let { tasks: a } = e;
  function l() {
    const s =
        'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(a)),
      i = document.createElement('a');
    i.setAttribute('href', s),
      i.setAttribute('download', 'tasks.json'),
      document.body.appendChild(i),
      i.click(),
      i.remove();
  }
  function r(s) {
    const i = new FileReader();
    (i.onload = (o) => {
      try {
        const c = JSON.parse(o.target.result);
        console.log('YOLO', c), H(Me(c));
      } catch (c) {
        console.error(c);
      }
    }),
      i.readAsText(s.target.files[0]);
  }
  return (
    (t.$$set = (s) => {
      'tasks' in s && n(2, (a = s.tasks));
    }),
    [l, r, a]
  );
}
class et extends P {
  constructor(e) {
    super();
    B(this, e, $e, xe, N, { tasks: 2 });
  }
}
const tt = { title: 'Todo', id: 0 },
  nt = { title: 'In Progress', id: 1 },
  at = { title: 'Done', id: 2 },
  he = [tt, nt, at];
function pe(t, e, n) {
  const a = t.slice();
  return (a[3] = e[n]), a;
}
function me(t) {
  let e, n;
  return (
    (e = new Ze({
      props: {
        label: t[3].title,
        categoryId: t[3].id,
        tasks: t[1][t[3].id] || [],
      },
    })),
    {
      c() {
        U(e.$$.fragment);
      },
      m(a, l) {
        V(e, a, l), (n = !0);
      },
      p(a, l) {
        const r = {};
        l & 2 && (r.tasks = a[1][a[3].id] || []), e.$set(r);
      },
      i(a) {
        n || (T(e.$$.fragment, a), (n = !0));
      },
      o(a) {
        S(e.$$.fragment, a), (n = !1);
      },
      d(a) {
        z(e, a);
      },
    }
  );
}
function rt(t) {
  let e, n, a, l;
  e = new et({ props: { tasks: t[0] } });
  let r = he,
    s = [];
  for (let o = 0; o < r.length; o += 1) s[o] = me(pe(t, r, o));
  const i = (o) =>
    S(s[o], 1, 1, () => {
      s[o] = null;
    });
  return {
    c() {
      U(e.$$.fragment), (n = O()), (a = w('main'));
      for (let o = 0; o < s.length; o += 1) s[o].c();
    },
    m(o, c) {
      V(e, o, c), L(o, n, c), L(o, a, c);
      for (let g = 0; g < s.length; g += 1) s[g].m(a, null);
      l = !0;
    },
    p(o, [c]) {
      const g = {};
      if ((c & 1 && (g.tasks = o[0]), e.$set(g), c & 2)) {
        r = he;
        let u;
        for (u = 0; u < r.length; u += 1) {
          const b = pe(o, r, u);
          s[u]
            ? (s[u].p(b, c), T(s[u], 1))
            : ((s[u] = me(b)), s[u].c(), T(s[u], 1), s[u].m(a, null));
        }
        for (Y(), u = r.length; u < s.length; u += 1) i(u);
        Q();
      }
    },
    i(o) {
      if (!l) {
        T(e.$$.fragment, o);
        for (let c = 0; c < r.length; c += 1) T(s[c]);
        l = !0;
      }
    },
    o(o) {
      S(e.$$.fragment, o), (s = s.filter(Boolean));
      for (let c = 0; c < s.length; c += 1) S(s[c]);
      l = !1;
    },
    d(o) {
      z(e, o), o && j(n), o && j(a), K(s, o);
    },
  };
}
function st(t, e, n) {
  let a,
    l = [];
  const r = $.subscribe((s) => {
    n(0, (l = s));
  });
  return (
    Oe(async () => {
      const i = await (await ce()).findAll();
      $.set(i.target.result);
    }),
    Se(r),
    (t.$$.update = () => {
      t.$$.dirty & 1 && n(1, (a = Ce(l, 'categoryId')));
    }),
    [l, a]
  );
}
class lt extends P {
  constructor(e) {
    super();
    B(this, e, st, rt, N, {});
  }
}
new lt({ target: document.body });
