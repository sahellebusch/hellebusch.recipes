function _typeof(t) {
  return (_typeof =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function(t) {
          return typeof t;
        }
      : function(t) {
          return t &&
            typeof Symbol === 'function' &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? 'symbol'
            : typeof t;
        })(t);
}
function filterList() {
  for (
    var t = [], e = [], n = [], r = [], i = 0;
    i < checkCategory.length;
    i += 1
  ) {
    if (checkCategory[i].checked) {
      const a = checkCategory[i].value;
      t.push(a);
    }
  }
  for (let s = 0; s < checkDuration.length; s += 1) {
    if (checkDuration[s].checked) {
      const o = checkDuration[s].value;
      e.push(o);
    }
  }
  for (let l = 0; l < checkMeat.length; l += 1) {
    if (checkMeat[l].checked) {
      const u = checkMeat[l].value;
      n.push(u);
    }
  }
  for (let c = 0; c < checkOrigin.length; c += 1) {
    if (checkOrigin[c].checked) {
      const f = checkOrigin[c].value;
      r.push(f);
    }
  }
  t.length + e.length + n.length + r.length > 0
    ? recipeList.filter(i => {
        const a = t.length === 0 || t.indexOf(i.values().category) > -1;

        const s = e.length === 0 || e >= i.values().duration;

        const o =
          n.length === 0 ||
          n.filter(
            t =>
              i
                .values()
                .tags.split(', ')
                .indexOf(t) !== -1
          ).length > 0;

        const l =
          r.length === 0 ||
          r.filter(
            t =>
              i
                .values()
                .tags.split(', ')
                .indexOf(t) !== -1
          ).length > 0;
        return !!(a && s && o && l);
      })
    : recipeList.filter();
}
!(function(t, e) {
  typeof define === 'function' && define.amd
    ? define([], () => e(t))
    : (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) ===
      'object'
    ? (module.exports = e(t))
    : (t.SmoothScroll = e(t));
})(
  typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined'
    ? window
    : void 0,
  t => {
    const e = {
      ignore: '[data-scroll-ignore]',
      header: null,
      topOnEmptyHash: !0,
      speed: 500,
      speedAsDuration: !1,
      durationMax: null,
      durationMin: null,
      clip: !0,
      offset: 0,
      easing: 'easeInOutCubic',
      customEasing: null,
      updateURL: !0,
      popstate: !0,
      emitEvents: !0
    };

    const n = function() {
      return (
        'querySelector' in document &&
        'addEventListener' in t &&
        'requestAnimationFrame' in t &&
        'closest' in t.Element.prototype
      );
    };

    const r = function() {
      const t = {};
      return (
        Array.prototype.forEach.call(arguments, e => {
          for (const n in e) {
            if (!e.hasOwnProperty(n)) {
              return;
            }
            t[n] = e[n];
          }
        }),
        t
      );
    };

    const i = function(e) {
      return !!(
        'matchMedia' in t && t.matchMedia('(prefers-reduced-motion)').matches
      );
    };

    const a = function(e) {
      return parseInt(t.getComputedStyle(e).height, 10);
    };

    const s = function(t) {
      t.charAt(0) === '#' && (t = t.substr(1));
      for (
        var e, n = String(t), r = n.length, i = -1, a = '', s = n.charCodeAt(0);
        ++i < r;

      ) {
        if ((e = n.charCodeAt(i)) === 0) {
          throw new InvalidCharacterError(
            'Invalid character: the input contains U+0000.'
          );
        }
        (e >= 1 && e <= 31) ||
        e == 127 ||
        (i === 0 && e >= 48 && e <= 57) ||
        (i === 1 && e >= 48 && e <= 57 && s === 45)
          ? (a += `\\${e.toString(16)} `)
          : (a +=
              e >= 128 ||
              e === 45 ||
              e === 95 ||
              (e >= 48 && e <= 57) ||
              (e >= 65 && e <= 90) ||
              (e >= 97 && e <= 122)
                ? n.charAt(i)
                : `\\${n.charAt(i)}`);
      }
      return `#${a}`;
    };

    const o = function(t, e) {
      let n;
      return (
        t.easing === 'easeInQuad' && (n = e * e),
        t.easing === 'easeOutQuad' && (n = e * (2 - e)),
        t.easing === 'easeInOutQuad' &&
          (n = e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1),
        t.easing === 'easeInCubic' && (n = e * e * e),
        t.easing === 'easeOutCubic' && (n = --e * e * e + 1),
        t.easing === 'easeInOutCubic' &&
          (n =
            e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1),
        t.easing === 'easeInQuart' && (n = e * e * e * e),
        t.easing === 'easeOutQuart' && (n = 1 - --e * e * e * e),
        t.easing === 'easeInOutQuart' &&
          (n = e < 0.5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e),
        t.easing === 'easeInQuint' && (n = e * e * e * e * e),
        t.easing === 'easeOutQuint' && (n = 1 + --e * e * e * e * e),
        t.easing === 'easeInOutQuint' &&
          (n = e < 0.5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e),
        t.customEasing && (n = t.customEasing(e)),
        n || e
      );
    };

    const l = function() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
    };

    const u = function(e, n, r, i) {
      let a = 0;
      if (e.offsetParent) {
        do {
          (a += e.offsetTop), (e = e.offsetParent);
        } while (e);
      }
      return (
        (a = Math.max(a - n - r, 0)),
        i && (a = Math.min(a, l() - t.innerHeight)),
        a
      );
    };

    const c = function(t) {
      return t ? a(t) + t.offsetTop : 0;
    };

    const f = function(t, e) {
      const n = e.speedAsDuration ? e.speed : Math.abs((t / 1e3) * e.speed);
      return e.durationMax && n > e.durationMax
        ? e.durationMax
        : e.durationMin && n < e.durationMin
        ? e.durationMin
        : parseInt(n, 10);
    };

    const d = function(e) {
      if (history.replaceState && e.updateURL && !history.state) {
        let n = t.location.hash;
        (n = n || t.pageYOffset),
          history.replaceState(
            { smoothScroll: JSON.stringify(e), anchor: n || t.pageYOffset },
            document.title,
            n || t.location.href
          );
      }
    };

    const h = function(t, e, n) {
      e ||
        (history.pushState &&
          n.updateURL &&
          history.pushState(
            { smoothScroll: JSON.stringify(n), anchor: t.id },
            document.title,
            t === document.documentElement ? '#top' : `#${t.id}`
          ));
    };

    const m = function(e, n, r) {
      e === 0 && document.body.focus(),
        r ||
          (e.focus(),
          document.activeElement !== e &&
            (e.setAttribute('tabindex', '-1'),
            e.focus(),
            (e.style.outline = 'none')),
          t.scrollTo(0, n));
    };

    const v = function(e, n, r, i) {
      if (n.emitEvents && typeof t.CustomEvent === 'function') {
        const a = new CustomEvent(e, {
          bubbles: !0,
          detail: { anchor: r, toggle: i }
        });
        document.dispatchEvent(a);
      }
    };
    return function(a, g) {
      let p;

      let y;

      let b;

      let C;

      let S;

      let E;

      const O = {};
      (O.cancelScroll = function(t) {
        cancelAnimationFrame(E), (E = null), t || v('scrollCancel', p);
      }),
        (O.animateScroll = function(n, i, a) {
          O.cancelScroll();
          const s = r(p || e, a || {});

          const d = Object.prototype.toString.call(n) === '[object Number]';

          const g = d || !n.tagName ? null : n;
          if (d || g) {
            const y = t.pageYOffset;
            s.header && !C && (C = document.querySelector(s.header));
            let b;

            let S;

            let x;

            const w = c(C);

            const A = d
              ? n
              : u(
                  g,
                  w,
                  parseInt(
                    typeof s.offset === 'function' ? s.offset(n, i) : s.offset,
                    10
                  ),
                  s.clip
                );

            const N = A - y;

            const I = l();

            let L = 0;

            const k = f(N, s);

            const M = function(e, r) {
              const a = t.pageYOffset;
              if (e == r || a == r || (y < r && t.innerHeight + a) >= I) {
                return (
                  O.cancelScroll(!0),
                  m(n, r, d),
                  v('scrollStop', s, n, i),
                  (b = null),
                  (E = null),
                  !0
                );
              }
            };

            const B = function e(n) {
              b || (b = n),
                (L += n - b),
                (S = k === 0 ? 0 : L / k),
                (S = S > 1 ? 1 : S),
                (x = y + N * o(s, S)),
                t.scrollTo(0, Math.floor(x)),
                M(x, A) || ((E = t.requestAnimationFrame(e)), (b = n));
            };
            t.pageYOffset === 0 && t.scrollTo(0, 0),
              h(n, d, s),
              v('scrollStart', s, n, i),
              O.cancelScroll(!0),
              t.requestAnimationFrame(B);
          }
        });
      const x = function(e) {
        if (
          !i() &&
          e.button === 0 &&
          !e.metaKey &&
          !e.ctrlKey &&
          'closest' in e.target &&
          (b = e.target.closest(a)) &&
          b.tagName.toLowerCase() === 'a' &&
          !e.target.closest(p.ignore) &&
          b.hostname === t.location.hostname &&
          b.pathname === t.location.pathname &&
          /#/.test(b.href)
        ) {
          const n = s(b.hash);

          let r =
            p.topOnEmptyHash && n === '#'
              ? document.documentElement
              : document.querySelector(n);
          (r = r || n !== '#top' ? r : document.documentElement),
            r && (e.preventDefault(), d(p), O.animateScroll(r, b));
        }
      };

      const w = function(t) {
        if (
          history.state !== null &&
          history.state.smoothScroll &&
          history.state.smoothScroll === JSON.stringify(p)
        ) {
          let e = history.state.anchor;
          (e &&
            e !== 0 &&
            !(e = document.querySelector(s(history.state.anchor)))) ||
            O.animateScroll(e, null, { updateURL: !1 });
        }
      };
      return (
        (O.destroy = function() {
          p &&
            (document.removeEventListener('click', x, !1),
            t.removeEventListener('popstate', w, !1),
            O.cancelScroll(),
            (p = null),
            (y = null),
            (b = null),
            (C = null),
            (S = null),
            (E = null));
        }),
        (O.init = function(i) {
          if (!n()) {
            throw 'Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.';
          }
          O.destroy(),
            (p = r(e, i || {})),
            (C = p.header ? document.querySelector(p.header) : null),
            document.addEventListener('click', x, !1),
            p.updateURL && p.popstate && t.addEventListener('popstate', w, !1);
        }),
        O.init(g),
        O
      );
    };
  }
);
const scroll = new SmoothScroll('a[href*="#"]', {
  easing: 'easeInOutCubic',
  offset: 64
});
const menuOpen = document.getElementById('js-navOpen');
const menuClose = document.getElementById('js-navClose');
const metabarNav = document.getElementById('js-metabarNav');
menuOpen.addEventListener('click', () => {
  metabarNav.classList.add('open');
}),
  menuClose.addEventListener('click', () => {
    metabarNav.classList.remove('open');
  });
for (
  let embeds = document.getElementsByClassName('embedly-card'), i = 0;
  i < embeds.length;
  i += 1
) {
  embeds[i].setAttribute('data-card-controls', '0'),
    embeds[i].setAttribute('data-card-align', 'left'),
    embeds[i].setAttribute('data-card-recommend', '0'),
    embeds[i].setAttribute('data-card-chrome', '0');
}
const List = (function(t) {
  function e(r) {
    if (n[r]) {
      return n[r].exports;
    }
    const i = (n[r] = { i: r, l: !1, exports: {} });
    return t[r].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
  }
  var n = {};
  return (
    (e.m = t),
    (e.c = n),
    (e.i = function(t) {
      return t;
    }),
    (e.d = function(t, n, r) {
      e.o(t, n) ||
        Object.defineProperty(t, n, {
          configurable: !1,
          enumerable: !0,
          get: r
        });
    }),
    (e.n = function(t) {
      const n =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return e.d(n, 'a', n), n;
    }),
    (e.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (e.p = ''),
    e((e.s = 11))
  );
})([
  function(t, e, n) {
    function r(t) {
      if (!t || !t.nodeType) {
        throw new Error('A DOM element reference is required');
      }
      (this.el = t), (this.list = t.classList);
    }
    const i = n(4);
    const a = /\s+/;
    Object.prototype.toString,
      (t.exports = function(t) {
        return new r(t);
      }),
      (r.prototype.add = function(t) {
        if (this.list) {
          return this.list.add(t), this;
        }
        const e = this.array();
        return ~i(e, t) || e.push(t), (this.el.className = e.join(' ')), this;
      }),
      (r.prototype.remove = function(t) {
        if (this.list) {
          return this.list.remove(t), this;
        }
        const e = this.array();
        const n = i(e, t);
        return ~n && e.splice(n, 1), (this.el.className = e.join(' ')), this;
      }),
      (r.prototype.toggle = function(t, e) {
        return this.list
          ? (void 0 !== e
              ? e !== this.list.toggle(t, e) && this.list.toggle(t)
              : this.list.toggle(t),
            this)
          : (void 0 !== e
              ? e
                ? this.add(t)
                : this.remove(t)
              : this.has(t)
              ? this.remove(t)
              : this.add(t),
            this);
      }),
      (r.prototype.array = function() {
        const t = this.el.getAttribute('class') || '';
        const e = t.replace(/^\s+|\s+$/g, '');
        const n = e.split(a);
        returnn[0] === '' && n.shift(), n;
      }),
      (r.prototype.has = r.prototype.contains = function(t) {
        return this.list ? this.list.contains(t) : !!~i(this.array(), t);
      });
  },
  function(t, e, n) {
    const r = window.addEventListener ? 'addEventListener' : 'attachEvent';
    const i = window.removeEventListener
      ? 'removeEventListener'
      : 'detachEvent';
    const a = r !== 'addEventListener' ? 'on' : '';
    const s = n(5);
    (e.bind = function(t, e, n, i) {
      t = s(t);
      for (let o = 0; o < t.length; o++) {
        t[o][r](a + e, n, i || !1);
      }
    }),
      (e.unbind = function(t, e, n, r) {
        t = s(t);
        for (let o = 0; o < t.length; o++) {
          t[o][i](a + e, n, r || !1);
        }
      });
  },
  function(t, e) {
    t.exports = function(t) {
      return function(e, n, r) {
        const i = this;
        (this._values = {}), (this.found = !1), (this.filtered = !1);
        (this.values = function(e, n) {
          if (void 0 === e) {
            return i._values;
          }
          for (const r in e) {
            i._values[r] = e[r];
          }
          !0 !== n && t.templater.set(i, i.values());
        }),
          (this.show = function() {
            t.templater.show(i);
          }),
          (this.hide = function() {
            t.templater.hide(i);
          }),
          (this.matching = function() {
            return (
              (t.filtered && t.searched && i.found && i.filtered) ||
              (t.filtered && !t.searched && i.filtered) ||
              (!t.filtered && t.searched && i.found) ||
              (!t.filtered && !t.searched)
            );
          }),
          (this.visible = function() {
            return !(!i.elm || i.elm.parentNode != t.list);
          }),
          (function(e, n, r) {
            if (void 0 === n) {
              r ? i.values(e, r) : i.values(e);
            } else {
              i.elm = n;
              const a = t.templater.get(i, e);
              i.values(a);
            }
          })(e, n, r);
      };
    };
  },
  function(t, e) {
    const n = function(t, e, n) {
      return n ? t.getElementsByClassName(e)[0] : t.getElementsByClassName(e);
    };
    const r = function(t, e, n) {
      return (e = `.${e}`), n ? t.querySelector(e) : t.querySelectorAll(e);
    };
    const i = function(t, e, n) {
      for (
        var r = [],
          i = t.getElementsByTagName('*'),
          a = i.length,
          s = new RegExp(`(^|\\s)${e}(\\s|$)`),
          o = 0,
          l = 0;
        o < a;
        o++
      ) {
        if (s.test(i[o].className)) {
          if (n) {
            return i[o];
          }
          (r[l] = i[o]), l++;
        }
      }
      return r;
    };
    t.exports = (function() {
      return function(t, e, a, s) {
        return (
          (s = s || {}),
          (s.test && s.getElementsByClassName) ||
          (!s.test && document.getElementsByClassName)
            ? n(t, e, a)
            : (s.test && s.querySelector) || (!s.test && document.querySelector)
            ? r(t, e, a)
            : i(t, e, a)
        );
      };
    })();
  },
  function(t, e) {
    const n = [].indexOf;
    t.exports = function(t, e) {
      if (n) {
        return t.indexOf(e);
      }
      for (let r = 0; r < t.length; ++r) {
        if (t[r] === e) {
          return r;
        }
      }
      return -1;
    };
  },
  function(t, e) {
    function n(t) {
      returnObject.prototype.toString.call(t) === '[object Array]';
    }
    t.exports = function(t) {
      if (void 0 === t) {
        return [];
      }
      if (t === null) {
        return [null];
      }
      if (t === window) {
        return [window];
      }
      if (typeof t === 'string') {
        return [t];
      }
      if (n(t)) {
        return t;
      }
      if (typeof t.length !== 'number') {
        return [t];
      }
      if (typeof t === 'function' && t instanceof Function) {
        return [t];
      }
      for (var e = [], r = 0; r < t.length; r++) {
        (Object.prototype.hasOwnProperty.call(t, r) || r in t) && e.push(t[r]);
      }
      return e.length ? e : [];
    };
  },
  function(t, e) {
    t.exports = function(t) {
      return (
        (t = void 0 === t ? '' : t),
        (t = t === null ? '' : t),
        (t = t.toString())
      );
    };
  },
  function(t, e) {
    t.exports = function(t) {
      for (
        var e, n = Array.prototype.slice.call(arguments, 1), r = 0;
        (e = n[r]);
        r++
      ) {
        if (e) {
          for (const i in e) {
            t[i] = e[i];
          }
        }
      }
      return t;
    };
  },
  function(t, e) {
    t.exports = function(t) {
      return function e(n, r, i) {
        const a = n.splice(0, 50);
        (i = i || []),
          (i = i.concat(t.add(a))),
          n.length > 0
            ? setTimeout(() => {
                e(n, r, i);
              }, 1)
            : (t.update(), r(i));
      };
    };
  },
  function(t, e) {
    t.exports = function(t) {
      return (
        (t.handlers.filterStart = t.handlers.filterStart || []),
        (t.handlers.filterComplete = t.handlers.filterComplete || []),
        function(e) {
          if (
            (t.trigger('filterStart'),
            (t.i = 1),
            t.reset.filter(),
            void 0 === e)
          ) {
            t.filtered = !1;
          } else {
            t.filtered = !0;
            for (let n = t.items, r = 0, i = n.length; r < i; r++) {
              const a = n[r];
              e(a) ? (a.filtered = !0) : (a.filtered = !1);
            }
          }
          return t.update(), t.trigger('filterComplete'), t.visibleItems;
        }
      );
    };
  },
  function(t, e, n) {
    const r = (n(0), n(1));
    const i = n(7);
    const a = n(6);
    const s = n(3);
    const o = n(19);
    t.exports = function(t, e) {
      (e = e || {}),
        (e = i(
          {
            location: 0,
            distance: 100,
            threshold: 0.4,
            multiSearch: !0,
            searchClass: 'fuzzy-search'
          },
          e
        ));
      var n = {
        search(r, i) {
          for (
            let a = e.multiSearch ? r.replace(/ +$/, '').split(/ +/) : [r],
              s = 0,
              o = t.items.length;
            s < o;
            s++
          ) {
            n.item(t.items[s], i, a);
          }
        },
        item(t, e, r) {
          for (var i = !0, a = 0; a < r.length; a++) {
            for (var s = !1, o = 0, l = e.length; o < l; o++) {
              n.values(t.values(), e[o], r[a]) && (s = !0);
            }
            s || (i = !1);
          }
          t.found = i;
        },
        values(t, n, r) {
          if (t.hasOwnProperty(n)) {
            const i = a(t[n]).toLowerCase();
            if (o(i, r, e)) {
              return !0;
            }
          }
          return !1;
        }
      };
      return (
        r.bind(s(t.listContainer, e.searchClass), 'keyup', e => {
          const r = e.target || e.srcElement;
          t.search(r.value, n.search);
        }),
        function(e, r) {
          t.search(e, r, n.search);
        }
      );
    };
  },
  function(t, e, n) {
    const r = n(18);
    const i = n(3);
    const a = n(7);
    const s = n(4);
    const o = n(1);
    const l = n(6);
    const u = n(0);
    const c = n(17);
    const f = n(5);
    t.exports = function(t, e, d) {
      let h;
      const m = this;
      const v = n(2)(m);
      const g = n(8)(m);
      const p = n(12)(m);
      (h = {
        start() {
          (m.listClass = 'list'),
            (m.searchClass = 'search'),
            (m.sortClass = 'sort'),
            (m.page = 1e4),
            (m.i = 1),
            (m.items = []),
            (m.visibleItems = []),
            (m.matchingItems = []),
            (m.searched = !1),
            (m.filtered = !1),
            (m.searchColumns = void 0),
            (m.handlers = { updated: [] }),
            (m.valueNames = []),
            (m.utils = {
              getByClass: i,
              extend: a,
              indexOf: s,
              events: o,
              toString: l,
              naturalSort: r,
              classes: u,
              getAttribute: c,
              toArray: f
            }),
            m.utils.extend(m, e),
            (m.listContainer =
              typeof t === 'string' ? document.getElementById(t) : t),
            m.listContainer &&
              ((m.list = i(m.listContainer, m.listClass, !0)),
              (m.parse = n(13)(m)),
              (m.templater = n(16)(m)),
              (m.search = n(14)(m)),
              (m.filter = n(9)(m)),
              (m.sort = n(15)(m)),
              (m.fuzzySearch = n(10)(m, e.fuzzySearch)),
              this.handlers(),
              this.items(),
              this.pagination(),
              m.update());
        },
        handlers() {
          for (const t in m.handlers) {
            m[t] && m.on(t, m[t]);
          }
        },
        items() {
          m.parse(m.list), void 0 !== d && m.add(d);
        },
        pagination() {
          if (void 0 !== e.pagination) {
            !0 === e.pagination && (e.pagination = [{}]),
              void 0 === e.pagination[0] && (e.pagination = [e.pagination]);
            for (let t = 0, n = e.pagination.length; t < n; t++) {
              p(e.pagination[t]);
            }
          }
        }
      }),
        (this.reIndex = function() {
          (m.items = []),
            (m.visibleItems = []),
            (m.matchingItems = []),
            (m.searched = !1),
            (m.filtered = !1),
            m.parse(m.list);
        }),
        (this.toJSON = function() {
          for (var t = [], e = 0, n = m.items.length; e < n; e++) {
            t.push(m.items[e].values());
          }
          return t;
        }),
        (this.add = function(t, e) {
          if (t.length !== 0) {
            if (e) {
              return void g(t, e);
            }
            const n = [];
            let r = !1;
            void 0 === t[0] && (t = [t]);
            for (let i = 0, a = t.length; i < a; i++) {
              let s = null;
              (r = m.items.length > m.page),
                (s = new v(t[i], void 0, r)),
                m.items.push(s),
                n.push(s);
            }
            return m.update(), n;
          }
        }),
        (this.show = function(t, e) {
          return (this.i = t), (this.page = e), m.update(), m;
        }),
        (this.remove = function(t, e, n) {
          for (var r = 0, i = 0, a = m.items.length; i < a; i++) {
            m.items[i].values()[t] == e &&
              (m.templater.remove(m.items[i], n),
              m.items.splice(i, 1),
              a--,
              i--,
              r++);
          }
          return m.update(), r;
        }),
        (this.get = function(t, e) {
          for (var n = [], r = 0, i = m.items.length; r < i; r++) {
            const a = m.items[r];
            a.values()[t] == e && n.push(a);
          }
          return n;
        }),
        (this.size = function() {
          return m.items.length;
        }),
        (this.clear = function() {
          return m.templater.clear(), (m.items = []), m;
        }),
        (this.on = function(t, e) {
          return m.handlers[t].push(e), m;
        }),
        (this.off = function(t, e) {
          const n = m.handlers[t];
          const r = s(n, e);
          return r > -1 && n.splice(r, 1), m;
        }),
        (this.trigger = function(t) {
          for (let e = m.handlers[t].length; e--; ) {
            m.handlers[t][e](m);
          }
          return m;
        }),
        (this.reset = {
          filter() {
            for (let t = m.items, e = t.length; e--; ) {
              t[e].filtered = !1;
            }
            return m;
          },
          search() {
            for (let t = m.items, e = t.length; e--; ) {
              t[e].found = !1;
            }
            return m;
          }
        }),
        (this.update = function() {
          const t = m.items;
          const e = t.length;
          (m.visibleItems = []), (m.matchingItems = []), m.templater.clear();
          for (let n = 0; n < e; n++) {
            t[n].matching() &&
            m.matchingItems.length + 1 >= m.i &&
            m.visibleItems.length < m.page
              ? (t[n].show(),
                m.visibleItems.push(t[n]),
                m.matchingItems.push(t[n]))
              : t[n].matching()
              ? (m.matchingItems.push(t[n]), t[n].hide())
              : t[n].hide();
          }
          return m.trigger('updated'), m;
        }),
        h.start();
    };
  },
  function(t, e, n) {
    const r = n(0);
    const i = n(1);
    const a = n(11);
    t.exports = function(t) {
      const e = function(e, i) {
        let a;
        const o = t.matchingItems.length;
        const l = t.i;
        const u = t.page;
        const c = Math.ceil(o / u);
        const f = Math.ceil(l / u);
        const d = i.innerWindow || 2;
        const h = i.left || i.outerWindow || 0;
        let m = i.right || i.outerWindow || 0;
        (m = c - m), e.clear();
        for (let v = 1; v <= c; v++) {
          const g = f === v ? 'active' : '';
          n.number(v, h, m, f, d)
            ? ((a = e.add({ page: v, dotted: !1 })[0]),
              g && r(a.elm).add(g),
              s(a.elm, v, u))
            : n.dotted(e, v, h, m, f, d, e.size()) &&
              ((a = e.add({ page: '...', dotted: !0 })[0]),
              r(a.elm).add('disabled'));
        }
      };
      var n = {
        number(t, e, n, r, i) {
          return (
            this.left(t, e) || this.right(t, n) || this.innerWindow(t, r, i)
          );
        },
        left(t, e) {
          return t <= e;
        },
        right(t, e) {
          return t > e;
        },
        innerWindow(t, e, n) {
          return t >= e - n && t <= e + n;
        },
        dotted(t, e, n, r, i, a, s) {
          return (
            this.dottedLeft(t, e, n, r, i, a) ||
            this.dottedRight(t, e, n, r, i, a, s)
          );
        },
        dottedLeft(t, e, n, r, i, a) {
          return e == n + 1 && !this.innerWindow(e, i, a) && !this.right(e, r);
        },
        dottedRight(t, e, n, r, i, a, s) {
          return (
            !t.items[s - 1].values().dotted &&
            e == r &&
            !this.innerWindow(e, i, a) &&
            !this.right(e, r)
          );
        }
      };
      var s = function(e, n, r) {
        i.bind(e, 'click', () => {
          t.show((n - 1) * r + 1, r);
        });
      };
      return function(n) {
        const r = new a(t.listContainer.id, {
          listClass: n.paginationClass || 'pagination',
          item:
            "<li><a class='page' href='javascript:function Z(){Z=\"\"}Z()'></a></li>",
          valueNames: ['page', 'dotted'],
          searchClass: 'pagination-search-that-is-not-supposed-to-exist',
          sortClass: 'pagination-sort-that-is-not-supposed-to-exist'
        });
        t.on('updated', () => {
          e(r, n);
        }),
          e(r, n);
      };
    };
  },
  function(t, e, n) {
    t.exports = function(t) {
      const e = n(2)(t);
      const r = function(t) {
        for (var e = t.childNodes, n = [], r = 0, i = e.length; r < i; r++) {
          void 0 === e[r].data && n.push(e[r]);
        }
        return n;
      };
      const i = function(n, r) {
        for (let i = 0, a = n.length; i < a; i++) {
          t.items.push(new e(r, n[i]));
        }
      };
      const a = function e(n, r) {
        const a = n.splice(0, 50);
        i(a, r),
          n.length > 0
            ? setTimeout(() => {
                e(n, r);
              }, 1)
            : (t.update(), t.trigger('parseComplete'));
      };
      return (
        (t.handlers.parseComplete = t.handlers.parseComplete || []),
        function() {
          const e = r(t.list);
          const n = t.valueNames;
          t.indexAsync ? a(e, n) : i(e, n);
        }
      );
    };
  },
  function(t, e) {
    t.exports = function(t) {
      let e;
      let n;
      let r;
      let i;
      var a = {
        resetList() {
          (t.i = 1), t.templater.clear(), (i = void 0);
        },
        setOptions(t) {
          t.length == 2 && t[1] instanceof Array
            ? (n = t[1])
            : t.length == 2 && typeof t[1] === 'function'
            ? ((n = void 0), (i = t[1]))
            : t.length == 3
            ? ((n = t[1]), (i = t[2]))
            : (n = void 0);
        },
        setColumns() {
          t.items.length !== 0 &&
            void 0 === n &&
            (n =
              void 0 === t.searchColumns
                ? a.toArray(t.items[0].values())
                : t.searchColumns);
        },
        setSearchString(e) {
          (e = t.utils.toString(e).toLowerCase()),
            (e = e.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')),
            (r = e);
        },
        toArray(t) {
          const e = [];
          for (const n in t) {
            e.push(n);
          }
          return e;
        }
      };
      var s = {
        list() {
          for (let e = 0, n = t.items.length; e < n; e++) {
            s.item(t.items[e]);
          }
        },
        item(t) {
          t.found = !1;
          for (let e = 0, r = n.length; e < r; e++) {
            if (s.values(t.values(), n[e])) {
              return void (t.found = !0);
            }
          }
        },
        values(n, i) {
          return !!(
            n.hasOwnProperty(i) &&
            ((e = t.utils.toString(n[i]).toLowerCase()),
            r !== '' && e.search(r) > -1)
          );
        },
        reset() {
          t.reset.search(), (t.searched = !1);
        }
      };
      const o = function(e) {
        return (
          t.trigger('searchStart'),
          a.resetList(),
          a.setSearchString(e),
          a.setOptions(arguments),
          a.setColumns(),
          r === '' ? s.reset() : ((t.searched = !0), i ? i(r, n) : s.list()),
          t.update(),
          t.trigger('searchComplete'),
          t.visibleItems
        );
      };
      return (
        (t.handlers.searchStart = t.handlers.searchStart || []),
        (t.handlers.searchComplete = t.handlers.searchComplete || []),
        t.utils.events.bind(
          t.utils.getByClass(t.listContainer, t.searchClass),
          'keyup',
          e => {
            const n = e.target || e.srcElement;
            (n.value === '' && !t.searched) || o(n.value);
          }
        ),
        t.utils.events.bind(
          t.utils.getByClass(t.listContainer, t.searchClass),
          'input',
          t => {
            (t.target || t.srcElement).value === '' && o('');
          }
        ),
        o
      );
    };
  },
  function(t, e) {
    t.exports = function(t) {
      var e = {
        els: void 0,
        clear() {
          for (let n = 0, r = e.els.length; n < r; n++) {
            t.utils.classes(e.els[n]).remove('asc'),
              t.utils.classes(e.els[n]).remove('desc');
          }
        },
        getOrder(e) {
          const n = t.utils.getAttribute(e, 'data-order');
          return n == 'asc' || n == 'desc'
            ? n
            : t.utils.classes(e).has('desc')
            ? 'asc'
            : t.utils.classes(e).has('asc')
            ? 'desc'
            : 'asc';
        },
        getInSensitive(e, n) {
          const r = t.utils.getAttribute(e, 'data-insensitive');
          n.insensitive = r !== 'false';
        },
        setOrder(n) {
          for (let r = 0, i = e.els.length; r < i; r++) {
            const a = e.els[r];
            if (t.utils.getAttribute(a, 'data-sort') === n.valueName) {
              const s = t.utils.getAttribute(a, 'data-order');
              s == 'asc' || s == 'desc'
                ? s == n.order && t.utils.classes(a).add(n.order)
                : t.utils.classes(a).add(n.order);
            }
          }
        }
      };
      const n = function() {
        t.trigger('sortStart');
        let n = {};
        const r =
          arguments[0].currentTarget || arguments[0].srcElement || void 0;
        r
          ? ((n.valueName = t.utils.getAttribute(r, 'data-sort')),
            e.getInSensitive(r, n),
            (n.order = e.getOrder(r)))
          : ((n = arguments[1] || n),
            (n.valueName = arguments[0]),
            (n.order = n.order || 'asc'),
            (n.insensitive = void 0 === n.insensitive || n.insensitive)),
          e.clear(),
          e.setOrder(n);
        let i;
        const a = n.sortFunction || t.sortFunction || null;
        const s = n.order === 'desc' ? -1 : 1;
        (i = a
          ? function(t, e) {
              return a(t, e, n) * s;
            }
          : function(e, r) {
              let i = t.utils.naturalSort;
              return (
                (i.alphabet = t.alphabet || n.alphabet || void 0),
                !i.alphabet &&
                  n.insensitive &&
                  (i = t.utils.naturalSort.caseInsensitive),
                i(e.values()[n.valueName], r.values()[n.valueName]) * s
              );
            }),
          t.items.sort(i),
          t.update(),
          t.trigger('sortComplete');
      };
      return (
        (t.handlers.sortStart = t.handlers.sortStart || []),
        (t.handlers.sortComplete = t.handlers.sortComplete || []),
        (e.els = t.utils.getByClass(t.listContainer, t.sortClass)),
        t.utils.events.bind(e.els, 'click', n),
        t.on('searchStart', e.clear),
        t.on('filterStart', e.clear),
        n
      );
    };
  },
  function(t, e) {
    const n = function(t) {
      let e;
      const n = this;
      (this.clearSourceItem = function(e, n) {
        for (let r = 0, i = n.length; r < i; r++) {
          var a;
          if (n[r].data) {
            for (let s = 0, o = n[r].data.length; s < o; s++) {
              e.setAttribute(`data-${n[r].data[s]}`, '');
            }
          } else {
            n[r].attr && n[r].name
              ? (a = t.utils.getByClass(e, n[r].name, !0)) &&
                a.setAttribute(n[r].attr, '')
              : (a = t.utils.getByClass(e, n[r], !0)) && (a.innerHTML = '');
          }
          a = void 0;
        }
        return e;
      }),
        (this.getItemSource = function(e) {
          if (void 0 === e) {
            for (let n = t.list.childNodes, r = 0, i = n.length; r < i; r++) {
              if (void 0 === n[r].data) {
                return n[r].cloneNode(!0);
              }
            }
          } else {
            if (/<tr[\s>]/g.exec(e)) {
              const a = document.createElement('tbody');
              return (a.innerHTML = e), a.firstChild;
            }
            if (e.indexOf('<') !== -1) {
              const s = document.createElement('div');
              return (s.innerHTML = e), s.firstChild;
            }
            const o = document.getElementById(t.item);
            if (o) {
              return o;
            }
          }
        }),
        (this.get = function(e, r) {
          n.create(e);
          for (var i = {}, a = 0, s = r.length; a < s; a++) {
            var o;
            if (r[a].data) {
              for (let l = 0, u = r[a].data.length; l < u; l++) {
                i[r[a].data[l]] = t.utils.getAttribute(
                  e.elm,
                  `data-${r[a].data[l]}`
                );
              }
            } else {
              r[a].attr && r[a].name
                ? ((o = t.utils.getByClass(e.elm, r[a].name, !0)),
                  (i[r[a].name] = o ? t.utils.getAttribute(o, r[a].attr) : ''))
                : ((o = t.utils.getByClass(e.elm, r[a], !0)),
                  (i[r[a]] = o ? o.innerHTML : ''));
            }
            o = void 0;
          }
          return i;
        }),
        (this.set = function(e, r) {
          const i = function(e) {
            for (let n = 0, r = t.valueNames.length; n < r; n++) {
              if (t.valueNames[n].data) {
                for (
                  let i = t.valueNames[n].data, a = 0, s = i.length;
                  a < s;
                  a++
                ) {
                  if (i[a] === e) {
                    return { data: e };
                  }
                }
              } else {
                if (
                  t.valueNames[n].attr &&
                  t.valueNames[n].name &&
                  t.valueNames[n].name == e
                ) {
                  return t.valueNames[n];
                }
                if (t.valueNames[n] === e) {
                  return e;
                }
              }
            }
          };
          if (!n.create(e)) {
            for (const a in r) {
              r.hasOwnProperty(a) &&
                (function(n, r) {
                  let a;

                  const s = i(n);
                  s &&
                    (s.data
                      ? e.elm.setAttribute(`data-${s.data}`, r)
                      : s.attr && s.name
                      ? ((a = t.utils.getByClass(e.elm, s.name, !0)),
                        a && a.setAttribute(s.attr, r))
                      : ((a = t.utils.getByClass(e.elm, s, !0)),
                        a && (a.innerHTML = r)),
                    (a = void 0));
                })(a, r[a]);
            }
          }
        }),
        (this.create = function(t) {
          if (void 0 !== t.elm) {
            return !1;
          }
          if (void 0 === e) {
            throw new Error(
              "The list need to have at list one item on init otherwise you'll have to add a template."
            );
          }
          const r = e.cloneNode(!0);
          return r.removeAttribute('id'), (t.elm = r), n.set(t, t.values()), !0;
        }),
        (this.remove = function(e) {
          e.elm.parentNode === t.list && t.list.removeChild(e.elm);
        }),
        (this.show = function(e) {
          n.create(e), t.list.appendChild(e.elm);
        }),
        (this.hide = function(e) {
          void 0 !== e.elm &&
            e.elm.parentNode === t.list &&
            t.list.removeChild(e.elm);
        }),
        (this.clear = function() {
          if (t.list.hasChildNodes()) {
            for (; t.list.childNodes.length >= 1; ) {
              t.list.removeChild(t.list.firstChild);
            }
          }
        }),
        (function() {
          (e = n.getItemSource(t.item)) &&
            (e = n.clearSourceItem(e, t.valueNames));
        })();
    };
    t.exports = function(t) {
      return new n(t);
    };
  },
  function(t, e) {
    t.exports = function(t, e) {
      let n = (t.getAttribute && t.getAttribute(e)) || null;
      if (!n) {
        for (let r = t.attributes, i = r.length, a = 0; a < i; a++) {
          void 0 !== e[a] && e[a].nodeName === e && (n = e[a].nodeValue);
        }
      }
      return n;
    };
  },
  function(t, e, n) {
    function r(t) {
      return t >= 48 && t <= 57;
    }
    function i(t, e) {
      for (
        var n = (t += '').length, i = (e += '').length, a = 0, l = 0;
        a < n && l < i;

      ) {
        let u = t.charCodeAt(a);
        let c = e.charCodeAt(l);
        if (r(u)) {
          if (!r(c)) {
            return u - c;
          }
          for (var f = a, d = l; u === 48 && ++f < n; ) {
            u = t.charCodeAt(f);
          }
          for (; c === 48 && ++d < i; ) {
            c = e.charCodeAt(d);
          }
          for (var h = f, m = d; h < n && r(t.charCodeAt(h)); ) {
            ++h;
          }
          for (; m < i && r(e.charCodeAt(m)); ) {
            ++m;
          }
          let v = h - f - m + d;
          if (v) {
            return v;
          }
          for (; f < h; ) {
            if ((v = t.charCodeAt(f++) - e.charCodeAt(d++))) {
              return v;
            }
          }
          (a = h), (l = m);
        } else {
          if (u !== c) {
            return u < o && c < o && s[u] !== -1 && s[c] !== -1
              ? s[u] - s[c]
              : u - c;
          }
          ++a, ++l;
        }
      }
      return n - i;
    }
    let a;
    let s;
    var o = 0;
    (i.caseInsensitive = i.i = function(t, e) {
      return i(`${t}`.toLowerCase(), `${e}`.toLowerCase());
    }),
      Object.defineProperties(i, {
        alphabet: {
          get() {
            return a;
          },
          set(t) {
            (a = t), (s = []);
            let e = 0;
            if (a) {
              for (; e < a.length; e++) {
                s[a.charCodeAt(e)] = e;
              }
            }
            for (o = s.length, e = 0; e < o; e++) {
              void 0 === s[e] && (s[e] = -1);
            }
          }
        }
      }),
      (t.exports = i);
  },
  function(t, e) {
    t.exports = function(t, e, n) {
      function r(t, n) {
        const r = t / e.length;
        const i = Math.abs(o - n);
        return a ? r + i / a : i ? 1 : r;
      }
      const i = n.location || 0;
      var a = n.distance || 100;
      const s = n.threshold || 0.4;
      if (e === t) {
        return !0;
      }
      if (e.length > 32) {
        return !1;
      }
      var o = i;
      const l = (function() {
        let t;

        const n = {};
        for (t = 0; t < e.length; t++) {
          n[e.charAt(t)] = 0;
        }
        for (t = 0; t < e.length; t++) {
          n[e.charAt(t)] |= 1 << (e.length - t - 1);
        }
        return n;
      })();
      let u = s;
      let c = t.indexOf(e, o);
      c != -1 &&
        ((u = Math.min(r(0, c), u)),
        (c = t.lastIndexOf(e, o + e.length)) != -1 &&
          (u = Math.min(r(0, c), u)));
      const f = 1 << (e.length - 1);
      c = -1;
      for (var d, h, m, v = e.length + t.length, g = 0; g < e.length; g++) {
        for (d = 0, h = v; d < h; ) {
          r(g, o + h) <= u ? (d = h) : (v = h),
            (h = Math.floor((v - d) / 2 + d));
        }
        v = h;
        let p = Math.max(1, o - h + 1);
        const y = Math.min(o + h, t.length) + e.length;
        const b = Array(y + 2);
        b[y + 1] = (1 << g) - 1;
        for (let C = y; C >= p; C--) {
          const S = l[t.charAt(C - 1)];
          if (
            ((b[C] =
              g === 0
                ? ((b[C + 1] << 1) | 1) & S
                : (((b[C + 1] << 1) | 1) & S) |
                  ((m[C + 1] | m[C]) << 1) |
                  1 |
                  m[C + 1]),
            b[C] & f)
          ) {
            const E = r(g, C - 1);
            if (E <= u) {
              if (((u = E), !((c = C - 1) > o))) {
                break;
              }
              p = Math.max(1, 2 * o - c);
            }
          }
        }
        if (r(g + 1, o) > u) {
          break;
        }
        m = b;
      }
      return !(c < 0);
    };
  }
]);
const searchOptions = {
  valueNames: [
    'title',
    'category',
    'tags',
    'duration',
    { name: 'ingredients', attr: 'data-ingredients' }
  ],
  fuzzySearch: {
    searchClass: 'search',
    location: 0,
    distance: 20,
    threshold: 0.4,
    multiSearch: !0
  }
};
var recipeList = new List('js-list', searchOptions);
var checkCategory = document.getElementsByClassName('js-category');
var checkDuration = document.getElementsByClassName('js-duration');
var checkMeat = document.getElementsByClassName('js-meat');
var checkOrigin = document.getElementsByClassName('js-origin');
const checkBoxes = document.getElementsByClassName('searchbar-checkbox');
if (checkBoxes) {
  for (let k = 0; k < checkBoxes.length; k += 1) {
    checkBoxes[k].addEventListener('change', filterList);
  }
}
// # sourceMappingURL=scripts.js.map
