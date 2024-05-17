var e = Object.defineProperty,
    t = Object.defineProperties,
    s = Object.getOwnPropertyDescriptors,
    i = Object.getOwnPropertySymbols,
    r = Object.prototype.hasOwnProperty,
    n = Object.prototype.propertyIsEnumerable,
    a = (t, s, i) => s in t ? e(t, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: i
    }) : t[s] = i,
    o = (e, t) => {
        for (var s in t || (t = {})) r.call(t, s) && a(e, s, t[s]);
        if (i)
            for (var s of i(t)) n.call(t, s) && a(e, s, t[s]);
        return e
    },
    l = (e, i) => t(e, s(i));

function d(e) {
    return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
}

function h(e, t) {
    void 0 === e && (e = {}), void 0 === t && (t = {}), Object.keys(t).forEach((s => {
        void 0 === e[s] ? e[s] = t[s] : d(t[s]) && d(e[s]) && Object.keys(t[s]).length > 0 && h(e[s], t[s])
    }))
}
const c = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
        blur() {},
        nodeName: ""
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({
        initEvent() {}
    }),
    createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => []
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    }
};

function u() {
    const e = "undefined" != typeof document ? document : {};
    return h(e, c), e
}
const p = {
    document: c,
    navigator: {
        userAgent: ""
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    },
    history: {
        replaceState() {},
        pushState() {},
        go() {},
        back() {}
    },
    CustomEvent: function() {
        return this
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({
        getPropertyValue: () => ""
    }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e)
    }
};

function m() {
    const e = "undefined" != typeof window ? window : {};
    return h(e, p), e
}

function f(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t)
}

function g() {
    return Date.now()
}

function v(e, t) {
    void 0 === t && (t = "x");
    const s = m();
    let i, r, n;
    const a = function(e) {
        const t = m();
        let s;
        return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s
    }(e);
    return s.WebKitCSSMatrix ? (r = a.transform || a.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map((e => e.replace(",", "."))).join(", ")), n = new s.WebKitCSSMatrix("none" === r ? "" : r)) : (n = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = n.toString().split(",")), "x" === t && (r = s.WebKitCSSMatrix ? n.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (r = s.WebKitCSSMatrix ? n.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), r || 0
}

function w(e) {
    return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
}

function x(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType)
}

function b() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
        t = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < arguments.length; s += 1) {
        const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
        if (null != i && !x(i)) {
            const s = Object.keys(Object(i)).filter((e => t.indexOf(e) < 0));
            for (let t = 0, r = s.length; t < r; t += 1) {
                const r = s[t],
                    n = Object.getOwnPropertyDescriptor(i, r);
                void 0 !== n && n.enumerable && (w(e[r]) && w(i[r]) ? i[r].__swiper__ ? e[r] = i[r] : b(e[r], i[r]) : !w(e[r]) && w(i[r]) ? (e[r] = {}, i[r].__swiper__ ? e[r] = i[r] : b(e[r], i[r])) : e[r] = i[r])
            }
        }
    }
    return e
}

function E(e, t, s) {
    e.style.setProperty(t, s)
}

function T(e) {
    let {
        swiper: t,
        targetPosition: s,
        side: i
    } = e;
    const r = m(),
        n = -t.translate;
    let a, o = null;
    const l = t.params.speed;
    t.wrapperEl.style.scrollSnapType = "none", r.cancelAnimationFrame(t.cssModeFrameID);
    const d = s > n ? "next" : "prev",
        h = (e, t) => "next" === d && e >= t || "prev" === d && e <= t,
        c = () => {
            a = (new Date).getTime(), null === o && (o = a);
            const e = Math.max(Math.min((a - o) / l, 1), 0),
                d = .5 - Math.cos(e * Math.PI) / 2;
            let u = n + d * (s - n);
            if (h(u, s) && (u = s), t.wrapperEl.scrollTo({
                    [i]: u
                }), h(u, s)) return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout((() => {
                t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({
                    [i]: u
                })
            })), void r.cancelAnimationFrame(t.cssModeFrameID);
            t.cssModeFrameID = r.requestAnimationFrame(c)
        };
    c()
}

function S(e, t) {
    return void 0 === t && (t = ""), [...e.children].filter((e => e.matches(t)))
}

function y(e) {
    try {
        return void console.warn(e)
    } catch (t) {}
}

function M(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return s.classList.add(...Array.isArray(t) ? t : function(e) {
        return void 0 === e && (e = ""), e.trim().split(" ").filter((e => !!e.trim()))
    }(t)), s
}

function A(e, t) {
    return m().getComputedStyle(e, null).getPropertyValue(t)
}

function C(e) {
    let t, s = e;
    if (s) {
        for (t = 0; null !== (s = s.previousSibling);) 1 === s.nodeType && (t += 1);
        return t
    }
}

function P(e, t, s) {
    const i = m();
    return s ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth
}
let _, I, L;

function O() {
    return _ || (_ = function() {
        const e = m(),
            t = u();
        return {
            smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style,
            touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
        }
    }()), _
}

function F(e) {
    return void 0 === e && (e = {}), I || (I = function(e) {
        let {
            userAgent: t
        } = void 0 === e ? {} : e;
        const s = O(),
            i = m(),
            r = i.navigator.platform,
            n = t || i.navigator.userAgent,
            a = {
                ios: !1,
                android: !1
            },
            o = i.screen.width,
            l = i.screen.height,
            d = n.match(/(Android);?[\s\/]+([\d.]+)?/);
        let h = n.match(/(iPad).*OS\s([\d_]+)/);
        const c = n.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !h && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            p = "Win32" === r;
        let f = "MacIntel" === r;
        return !h && f && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${o}x${l}`) >= 0 && (h = n.match(/(Version)\/([\d.]+)/), h || (h = [0, 1, "13_0_0"]), f = !1), d && !p && (a.os = "android", a.android = !0), (h || u || c) && (a.os = "ios", a.ios = !0), a
    }(e)), I
}

function k() {
    return L || (L = function() {
        const e = m();
        let t = !1;

        function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
        }
        if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
                const [e, i] = s.split("Version/")[1].split(" ")[0].split(".").map((e => Number(e)));
                t = e < 16 || 16 === e && i < 2
            }
        }
        return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
        }
    }()), L
}
const z = (e, t) => {
        if (!e || e.destroyed || !e.params) return;
        const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
        if (s) {
            let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
            !t && e.isElement && (s.shadowRoot ? t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame((() => {
                s.shadowRoot && (t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), t && t.remove())
            }))), t && t.remove()
        }
    },
    D = (e, t) => {
        if (!e.slides[t]) return;
        const s = e.slides[t].querySelector('[loading="lazy"]');
        s && s.removeAttribute("loading")
    },
    R = e => {
        if (!e || e.destroyed || !e.params) return;
        let t = e.params.lazyPreloadPrevNext;
        const s = e.slides.length;
        if (!s || !t || t < 0) return;
        t = Math.min(t, s);
        const i = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView),
            r = e.activeIndex;
        if (e.params.grid && e.params.grid.rows > 1) {
            const s = r,
                n = [s - t];
            return n.push(...Array.from({
                length: t
            }).map(((e, t) => s + i + t))), void e.slides.forEach(((t, s) => {
                n.includes(t.column) && D(e, s)
            }))
        }
        const n = r + i - 1;
        if (e.params.rewind || e.params.loop)
            for (let a = r - t; a <= n + t; a += 1) {
                const t = (a % s + s) % s;
                (t < r || t > n) && D(e, t)
            } else
                for (let a = Math.max(r - t, 0); a <= Math.min(n + t, s - 1); a += 1) a !== r && (a > n || a < r) && D(e, a)
    };

function G(e) {
    let {
        swiper: t,
        runCallbacks: s,
        direction: i,
        step: r
    } = e;
    const {
        activeIndex: n,
        previousIndex: a
    } = t;
    let o = i;
    if (o || (o = n > a ? "next" : n < a ? "prev" : "reset"), t.emit(`transition${r}`), s && n !== a) {
        if ("reset" === o) return void t.emit(`slideResetTransition${r}`);
        t.emit(`slideChangeTransition${r}`), "next" === o ? t.emit(`slideNextTransition${r}`) : t.emit(`slidePrevTransition${r}`)
    }
}

function B(e, t, s) {
    const i = m(),
        {
            params: r
        } = e,
        n = r.edgeSwipeDetection,
        a = r.edgeSwipeThreshold;
    return !n || !(s <= a || s >= i.innerWidth - a) || "prevent" === n && (t.preventDefault(), !0)
}

function N(e) {
    const t = this,
        s = u();
    let i = e;
    i.originalEvent && (i = i.originalEvent);
    const r = t.touchEventsData;
    if ("pointerdown" === i.type) {
        if (null !== r.pointerId && r.pointerId !== i.pointerId) return;
        r.pointerId = i.pointerId
    } else "touchstart" === i.type && 1 === i.targetTouches.length && (r.touchId = i.targetTouches[0].identifier);
    if ("touchstart" === i.type) return void B(t, i, i.targetTouches[0].pageX);
    const {
        params: n,
        touches: a,
        enabled: o
    } = t;
    if (!o) return;
    if (!n.simulateTouch && "mouse" === i.pointerType) return;
    if (t.animating && n.preventInteractionOnTransition) return;
    !t.animating && n.cssMode && n.loop && t.loopFix();
    let l = i.target;
    if ("wrapper" === n.touchEventsTarget && !t.wrapperEl.contains(l)) return;
    if ("which" in i && 3 === i.which) return;
    if ("button" in i && i.button > 0) return;
    if (r.isTouched && r.isMoved) return;
    const d = !!n.noSwipingClass && "" !== n.noSwipingClass,
        h = i.composedPath ? i.composedPath() : i.path;
    d && i.target && i.target.shadowRoot && h && (l = h[0]);
    const c = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`,
        p = !(!i.target || !i.target.shadowRoot);
    if (n.noSwiping && (p ? function(e, t) {
            return void 0 === t && (t = this),
                function t(s) {
                    if (!s || s === u() || s === m()) return null;
                    s.assignedSlot && (s = s.assignedSlot);
                    const i = s.closest(e);
                    return i || s.getRootNode ? i || t(s.getRootNode().host) : null
                }(t)
        }(c, l) : l.closest(c))) return void(t.allowClick = !0);
    if (n.swipeHandler && !l.closest(n.swipeHandler)) return;
    a.currentX = i.pageX, a.currentY = i.pageY;
    const f = a.currentX,
        v = a.currentY;
    if (!B(t, i, f)) return;
    Object.assign(r, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
    }), a.startX = f, a.startY = v, r.touchStartTime = g(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, n.threshold > 0 && (r.allowThresholdMove = !1);
    let w = !0;
    l.matches(r.focusableElements) && (w = !1, "SELECT" === l.nodeName && (r.isTouched = !1)), s.activeElement && s.activeElement.matches(r.focusableElements) && s.activeElement !== l && s.activeElement.blur();
    const x = w && t.allowTouchMove && n.touchStartPreventDefault;
    !n.touchStartForcePreventDefault && !x || l.isContentEditable || i.preventDefault(), n.freeMode && n.freeMode.enabled && t.freeMode && t.animating && !n.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", i)
}

function V(e) {
    const t = u(),
        s = this,
        i = s.touchEventsData,
        {
            params: r,
            touches: n,
            rtlTranslate: a,
            enabled: o
        } = s;
    if (!o) return;
    if (!r.simulateTouch && "mouse" === e.pointerType) return;
    let l, d = e;
    if (d.originalEvent && (d = d.originalEvent), "pointermove" === d.type) {
        if (null !== i.touchId) return;
        if (d.pointerId !== i.pointerId) return
    }
    if ("touchmove" === d.type) {
        if (l = [...d.changedTouches].filter((e => e.identifier === i.touchId))[0], !l || l.identifier !== i.touchId) return
    } else l = d;
    if (!i.isTouched) return void(i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", d));
    const h = l.pageX,
        c = l.pageY;
    if (d.preventedByNestedSwiper) return n.startX = h, void(n.startY = c);
    if (!s.allowTouchMove) return d.target.matches(i.focusableElements) || (s.allowClick = !1), void(i.isTouched && (Object.assign(n, {
        startX: h,
        startY: c,
        currentX: h,
        currentY: c
    }), i.touchStartTime = g()));
    if (r.touchReleaseOnEdges && !r.loop)
        if (s.isVertical()) {
            if (c < n.startY && s.translate <= s.maxTranslate() || c > n.startY && s.translate >= s.minTranslate()) return i.isTouched = !1, void(i.isMoved = !1)
        } else if (h < n.startX && s.translate <= s.maxTranslate() || h > n.startX && s.translate >= s.minTranslate()) return;
    if (t.activeElement && d.target === t.activeElement && d.target.matches(i.focusableElements)) return i.isMoved = !0, void(s.allowClick = !1);
    i.allowTouchCallbacks && s.emit("touchMove", d), n.previousX = n.currentX, n.previousY = n.currentY, n.currentX = h, n.currentY = c;
    const p = n.currentX - n.startX,
        m = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(p ** 2 + m ** 2) < s.params.threshold) return;
    if (void 0 === i.isScrolling) {
        let e;
        s.isHorizontal() && n.currentY === n.startY || s.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : p * p + m * m >= 25 && (e = 180 * Math.atan2(Math.abs(m), Math.abs(p)) / Math.PI, i.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
    }
    if (i.isScrolling && s.emit("touchMoveOpposite", d), void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)), i.isScrolling || s.zoom && s.params.zoom && s.params.zoom.enabled) return void(i.isTouched = !1);
    if (!i.startMoving) return;
    s.allowClick = !1, !r.cssMode && d.cancelable && d.preventDefault(), r.touchMoveStopPropagation && !r.nested && d.stopPropagation();
    let f = s.isHorizontal() ? p : m,
        v = s.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
    r.oneWayMovement && (f = Math.abs(f) * (a ? 1 : -1), v = Math.abs(v) * (a ? 1 : -1)), n.diff = f, f *= r.touchRatio, a && (f = -f, v = -v);
    const w = s.touchesDirection;
    s.swipeDirection = f > 0 ? "prev" : "next", s.touchesDirection = v > 0 ? "prev" : "next";
    const x = s.params.loop && !r.cssMode,
        b = "next" === s.touchesDirection && s.allowSlideNext || "prev" === s.touchesDirection && s.allowSlidePrev;
    if (!i.isMoved) {
        if (x && b && s.loopFix({
                direction: s.swipeDirection
            }), i.startTranslate = s.getTranslate(), s.setTransition(0), s.animating) {
            const e = new window.CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0
            });
            s.wrapperEl.dispatchEvent(e)
        }
        i.allowMomentumBounce = !1, !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0), s.emit("sliderFirstMove", d)
    }
    if ((new Date).getTime(), i.isMoved && i.allowThresholdMove && w !== s.touchesDirection && x && b && Math.abs(f) >= 1) return Object.assign(n, {
        startX: h,
        startY: c,
        currentX: h,
        currentY: c,
        startTranslate: i.currentTranslate
    }), i.loopSwapReset = !0, void(i.startTranslate = i.currentTranslate);
    s.emit("sliderMove", d), i.isMoved = !0, i.currentTranslate = f + i.startTranslate;
    let E = !0,
        T = r.resistanceRatio;
    if (r.touchReleaseOnEdges && (T = 0), f > 0 ? (x && b && i.allowThresholdMove && i.currentTranslate > (r.centeredSlides ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1] : s.minTranslate()) && s.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0
        }), i.currentTranslate > s.minTranslate() && (E = !1, r.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + f) ** T))) : f < 0 && (x && b && i.allowThresholdMove && i.currentTranslate < (r.centeredSlides ? s.maxTranslate() + s.slidesSizesGrid[s.slidesSizesGrid.length - 1] : s.maxTranslate()) && s.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex: s.slides.length - ("auto" === r.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
        }), i.currentTranslate < s.maxTranslate() && (E = !1, r.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - f) ** T))), E && (d.preventedByNestedSwiper = !0), !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate), r.threshold > 0) {
        if (!(Math.abs(f) > r.threshold || i.allowThresholdMove)) return void(i.currentTranslate = i.startTranslate);
        if (!i.allowThresholdMove) return i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, void(n.diff = s.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
    }
    r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), r.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(i.currentTranslate), s.setTranslate(i.currentTranslate))
}

function j(e) {
    const t = this,
        s = t.touchEventsData;
    let i, r = e;
    r.originalEvent && (r = r.originalEvent);
    if ("touchend" === r.type || "touchcancel" === r.type) {
        if (i = [...r.changedTouches].filter((e => e.identifier === s.touchId))[0], !i || i.identifier !== s.touchId) return
    } else {
        if (null !== s.touchId) return;
        if (r.pointerId !== s.pointerId) return;
        i = r
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(r.type)) {
        if (!(["pointercancel", "contextmenu"].includes(r.type) && (t.browser.isSafari || t.browser.isWebView))) return
    }
    s.pointerId = null, s.touchId = null;
    const {
        params: n,
        touches: a,
        rtlTranslate: o,
        slidesGrid: l,
        enabled: d
    } = t;
    if (!d) return;
    if (!n.simulateTouch && "mouse" === r.pointerType) return;
    if (s.allowTouchCallbacks && t.emit("touchEnd", r), s.allowTouchCallbacks = !1, !s.isTouched) return s.isMoved && n.grabCursor && t.setGrabCursor(!1), s.isMoved = !1, void(s.startMoving = !1);
    n.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
    const h = g(),
        c = h - s.touchStartTime;
    if (t.allowClick) {
        const e = r.path || r.composedPath && r.composedPath();
        t.updateClickedSlide(e && e[0] || r.target, e), t.emit("tap click", r), c < 300 && h - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", r)
    }
    if (s.lastClickTime = g(), f((() => {
            t.destroyed || (t.allowClick = !0)
        })), !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === a.diff && !s.loopSwapReset || s.currentTranslate === s.startTranslate && !s.loopSwapReset) return s.isTouched = !1, s.isMoved = !1, void(s.startMoving = !1);
    let u;
    if (s.isTouched = !1, s.isMoved = !1, s.startMoving = !1, u = n.followFinger ? o ? t.translate : -t.translate : -s.currentTranslate, n.cssMode) return;
    if (n.freeMode && n.freeMode.enabled) return void t.freeMode.onTouchEnd({
        currentPos: u
    });
    let p = 0,
        m = t.slidesSizesGrid[0];
    for (let f = 0; f < l.length; f += f < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup) {
        const e = f < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
        void 0 !== l[f + e] ? u >= l[f] && u < l[f + e] && (p = f, m = l[f + e] - l[f]) : u >= l[f] && (p = f, m = l[l.length - 1] - l[l.length - 2])
    }
    let v = null,
        w = null;
    n.rewind && (t.isBeginning ? w = n.virtual && n.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (v = 0));
    const x = (u - l[p]) / m,
        b = p < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    if (c > n.longSwipesMs) {
        if (!n.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection && (x >= n.longSwipesRatio ? t.slideTo(n.rewind && t.isEnd ? v : p + b) : t.slideTo(p)), "prev" === t.swipeDirection && (x > 1 - n.longSwipesRatio ? t.slideTo(p + b) : null !== w && x < 0 && Math.abs(x) > n.longSwipesRatio ? t.slideTo(w) : t.slideTo(p))
    } else {
        if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation && (r.target === t.navigation.nextEl || r.target === t.navigation.prevEl) ? r.target === t.navigation.nextEl ? t.slideTo(p + b) : t.slideTo(p) : ("next" === t.swipeDirection && t.slideTo(null !== v ? v : p + b), "prev" === t.swipeDirection && t.slideTo(null !== w ? w : p))
    }
}

function U() {
    const e = this,
        {
            params: t,
            el: s
        } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const {
        allowSlideNext: i,
        allowSlidePrev: r,
        snapGrid: n
    } = e, a = e.virtual && e.params.virtual.enabled;
    e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
    const o = a && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || o ? e.params.loop && !a ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), e.autoplay.resizeTimeout = setTimeout((() => {
        e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume()
    }), 500)), e.allowSlidePrev = r, e.allowSlideNext = i, e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow()
}

function q(e) {
    const t = this;
    t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())))
}

function X() {
    const e = this,
        {
            wrapperEl: t,
            rtlTranslate: s,
            enabled: i
        } = e;
    if (!i) return;
    let r;
    e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
    const n = e.maxTranslate() - e.minTranslate();
    r = 0 === n ? 0 : (e.translate - e.minTranslate()) / n, r !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
}

function W(e) {
    const t = this;
    z(t, e.target), t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update()
}

function Y() {
    const e = this;
    e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"))
}
const $ = (e, t) => {
    const s = u(),
        {
            params: i,
            el: r,
            wrapperEl: n,
            device: a
        } = e,
        o = !!i.nested,
        l = "on" === t ? "addEventListener" : "removeEventListener",
        d = t;
    s[l]("touchstart", e.onDocumentTouchStart, {
        passive: !1,
        capture: o
    }), r[l]("touchstart", e.onTouchStart, {
        passive: !1
    }), r[l]("pointerdown", e.onTouchStart, {
        passive: !1
    }), s[l]("touchmove", e.onTouchMove, {
        passive: !1,
        capture: o
    }), s[l]("pointermove", e.onTouchMove, {
        passive: !1,
        capture: o
    }), s[l]("touchend", e.onTouchEnd, {
        passive: !0
    }), s[l]("pointerup", e.onTouchEnd, {
        passive: !0
    }), s[l]("pointercancel", e.onTouchEnd, {
        passive: !0
    }), s[l]("touchcancel", e.onTouchEnd, {
        passive: !0
    }), s[l]("pointerout", e.onTouchEnd, {
        passive: !0
    }), s[l]("pointerleave", e.onTouchEnd, {
        passive: !0
    }), s[l]("contextmenu", e.onTouchEnd, {
        passive: !0
    }), (i.preventClicks || i.preventClicksPropagation) && r[l]("click", e.onClick, !0), i.cssMode && n[l]("scroll", e.onScroll), i.updateOnWindowResize ? e[d](a.ios || a.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", U, !0) : e[d]("observerUpdate", U, !0), r[l]("load", e.onLoad, {
        capture: !0
    })
};
const H = (e, t) => e.grid && t.grid && t.grid.rows > 1;
var Z = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1
};

function K(e, t) {
    return function(s) {
        void 0 === s && (s = {});
        const i = Object.keys(s)[0],
            r = s[i];
        "object" == typeof r && null !== r ? (!0 === e[i] && (e[i] = {
            enabled: !0
        }), "navigation" === i && e[i] && e[i].enabled && !e[i].prevEl && !e[i].nextEl && (e[i].auto = !0), ["pagination", "scrollbar"].indexOf(i) >= 0 && e[i] && e[i].enabled && !e[i].el && (e[i].auto = !0), i in e && "enabled" in r ? ("object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0), e[i] || (e[i] = {
            enabled: !1
        }), b(t, s)) : b(t, s)) : b(t, s)
    }
}
const Q = {
        eventsEmitter: {
            on(e, t, s) {
                const i = this;
                if (!i.eventsListeners || i.destroyed) return i;
                if ("function" != typeof t) return i;
                const r = s ? "unshift" : "push";
                return e.split(" ").forEach((e => {
                    i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][r](t)
                })), i
            },
            once(e, t, s) {
                const i = this;
                if (!i.eventsListeners || i.destroyed) return i;
                if ("function" != typeof t) return i;

                function r() {
                    i.off(e, r), r.__emitterProxy && delete r.__emitterProxy;
                    for (var s = arguments.length, n = new Array(s), a = 0; a < s; a++) n[a] = arguments[a];
                    t.apply(i, n)
                }
                return r.__emitterProxy = t, i.on(e, r, s)
            },
            onAny(e, t) {
                const s = this;
                if (!s.eventsListeners || s.destroyed) return s;
                if ("function" != typeof e) return s;
                const i = t ? "unshift" : "push";
                return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
            },
            offAny(e) {
                const t = this;
                if (!t.eventsListeners || t.destroyed) return t;
                if (!t.eventsAnyListeners) return t;
                const s = t.eventsAnyListeners.indexOf(e);
                return s >= 0 && t.eventsAnyListeners.splice(s, 1), t
            },
            off(e, t) {
                const s = this;
                return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach((e => {
                    void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(((i, r) => {
                        (i === t || i.__emitterProxy && i.__emitterProxy === t) && s.eventsListeners[e].splice(r, 1)
                    }))
                })), s) : s
            },
            emit() {
                const e = this;
                if (!e.eventsListeners || e.destroyed) return e;
                if (!e.eventsListeners) return e;
                let t, s, i;
                for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++) n[a] = arguments[a];
                "string" == typeof n[0] || Array.isArray(n[0]) ? (t = n[0], s = n.slice(1, n.length), i = e) : (t = n[0].events, s = n[0].data, i = n[0].context || e), s.unshift(i);
                return (Array.isArray(t) ? t : t.split(" ")).forEach((t => {
                    e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e => {
                        e.apply(i, [t, ...s])
                    })), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e => {
                        e.apply(i, s)
                    }))
                })), e
            }
        },
        update: {
            updateSize: function() {
                const e = this;
                let t, s;
                const i = e.el;
                t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i.clientWidth, s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i.clientHeight, 0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(A(i, "padding-left") || 0, 10) - parseInt(A(i, "padding-right") || 0, 10), s = s - parseInt(A(i, "padding-top") || 0, 10) - parseInt(A(i, "padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, {
                    width: t,
                    height: s,
                    size: e.isHorizontal() ? t : s
                }))
            },
            updateSlides: function() {
                const e = this;

                function t(t, s) {
                    return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0)
                }
                const s = e.params,
                    {
                        wrapperEl: i,
                        slidesEl: r,
                        size: n,
                        rtlTranslate: a,
                        wrongRTL: o
                    } = e,
                    l = e.virtual && s.virtual.enabled,
                    d = l ? e.virtual.slides.length : e.slides.length,
                    h = S(r, `.${e.params.slideClass}, swiper-slide`),
                    c = l ? e.virtual.slides.length : h.length;
                let u = [];
                const p = [],
                    m = [];
                let f = s.slidesOffsetBefore;
                "function" == typeof f && (f = s.slidesOffsetBefore.call(e));
                let g = s.slidesOffsetAfter;
                "function" == typeof g && (g = s.slidesOffsetAfter.call(e));
                const v = e.snapGrid.length,
                    w = e.slidesGrid.length;
                let x = s.spaceBetween,
                    b = -f,
                    T = 0,
                    y = 0;
                if (void 0 === n) return;
                "string" == typeof x && x.indexOf("%") >= 0 ? x = parseFloat(x.replace("%", "")) / 100 * n : "string" == typeof x && (x = parseFloat(x)), e.virtualSize = -x, h.forEach((e => {
                    a ? e.style.marginLeft = "" : e.style.marginRight = "", e.style.marginBottom = "", e.style.marginTop = ""
                })), s.centeredSlides && s.cssMode && (E(i, "--swiper-centered-offset-before", ""), E(i, "--swiper-centered-offset-after", ""));
                const M = s.grid && s.grid.rows > 1 && e.grid;
                let C;
                M ? e.grid.initSlides(h) : e.grid && e.grid.unsetSlides();
                const _ = "auto" === s.slidesPerView && s.breakpoints && Object.keys(s.breakpoints).filter((e => void 0 !== s.breakpoints[e].slidesPerView)).length > 0;
                for (let E = 0; E < c; E += 1) {
                    let i;
                    if (C = 0, h[E] && (i = h[E]), M && e.grid.updateSlide(E, i, h), !h[E] || "none" !== A(i, "display")) {
                        if ("auto" === s.slidesPerView) {
                            _ && (h[E].style[e.getDirectionLabel("width")] = "");
                            const r = getComputedStyle(i),
                                n = i.style.transform,
                                a = i.style.webkitTransform;
                            if (n && (i.style.transform = "none"), a && (i.style.webkitTransform = "none"), s.roundLengths) C = e.isHorizontal() ? P(i, "width", !0) : P(i, "height", !0);
                            else {
                                const e = t(r, "width"),
                                    s = t(r, "padding-left"),
                                    n = t(r, "padding-right"),
                                    a = t(r, "margin-left"),
                                    o = t(r, "margin-right"),
                                    l = r.getPropertyValue("box-sizing");
                                if (l && "border-box" === l) C = e + a + o;
                                else {
                                    const {
                                        clientWidth: t,
                                        offsetWidth: r
                                    } = i;
                                    C = e + s + n + a + o + (r - t)
                                }
                            }
                            n && (i.style.transform = n), a && (i.style.webkitTransform = a), s.roundLengths && (C = Math.floor(C))
                        } else C = (n - (s.slidesPerView - 1) * x) / s.slidesPerView, s.roundLengths && (C = Math.floor(C)), h[E] && (h[E].style[e.getDirectionLabel("width")] = `${C}px`);
                        h[E] && (h[E].swiperSlideSize = C), m.push(C), s.centeredSlides ? (b = b + C / 2 + T / 2 + x, 0 === T && 0 !== E && (b = b - n / 2 - x), 0 === E && (b = b - n / 2 - x), Math.abs(b) < .001 && (b = 0), s.roundLengths && (b = Math.floor(b)), y % s.slidesPerGroup == 0 && u.push(b), p.push(b)) : (s.roundLengths && (b = Math.floor(b)), (y - Math.min(e.params.slidesPerGroupSkip, y)) % e.params.slidesPerGroup == 0 && u.push(b), p.push(b), b = b + C + x), e.virtualSize += C + x, T = C, y += 1
                    }
                }
                if (e.virtualSize = Math.max(e.virtualSize, n) + g, a && o && ("slide" === s.effect || "coverflow" === s.effect) && (i.style.width = `${e.virtualSize+x}px`), s.setWrapperSize && (i.style[e.getDirectionLabel("width")] = `${e.virtualSize+x}px`), M && e.grid.updateWrapperSize(C, u), !s.centeredSlides) {
                    const t = [];
                    for (let i = 0; i < u.length; i += 1) {
                        let r = u[i];
                        s.roundLengths && (r = Math.floor(r)), u[i] <= e.virtualSize - n && t.push(r)
                    }
                    u = t, Math.floor(e.virtualSize - n) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - n)
                }
                if (l && s.loop) {
                    const t = m[0] + x;
                    if (s.slidesPerGroup > 1) {
                        const i = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / s.slidesPerGroup),
                            r = t * s.slidesPerGroup;
                        for (let e = 0; e < i; e += 1) u.push(u[u.length - 1] + r)
                    }
                    for (let i = 0; i < e.virtual.slidesBefore + e.virtual.slidesAfter; i += 1) 1 === s.slidesPerGroup && u.push(u[u.length - 1] + t), p.push(p[p.length - 1] + t), e.virtualSize += t
                }
                if (0 === u.length && (u = [0]), 0 !== x) {
                    const t = e.isHorizontal() && a ? "marginLeft" : e.getDirectionLabel("marginRight");
                    h.filter(((e, t) => !(s.cssMode && !s.loop) || t !== h.length - 1)).forEach((e => {
                        e.style[t] = `${x}px`
                    }))
                }
                if (s.centeredSlides && s.centeredSlidesBounds) {
                    let e = 0;
                    m.forEach((t => {
                        e += t + (x || 0)
                    })), e -= x;
                    const t = e - n;
                    u = u.map((e => e <= 0 ? -f : e > t ? t + g : e))
                }
                if (s.centerInsufficientSlides) {
                    let e = 0;
                    if (m.forEach((t => {
                            e += t + (x || 0)
                        })), e -= x, e < n) {
                        const t = (n - e) / 2;
                        u.forEach(((e, s) => {
                            u[s] = e - t
                        })), p.forEach(((e, s) => {
                            p[s] = e + t
                        }))
                    }
                }
                if (Object.assign(e, {
                        slides: h,
                        snapGrid: u,
                        slidesGrid: p,
                        slidesSizesGrid: m
                    }), s.centeredSlides && s.cssMode && !s.centeredSlidesBounds) {
                    E(i, "--swiper-centered-offset-before", -u[0] + "px"), E(i, "--swiper-centered-offset-after", e.size / 2 - m[m.length - 1] / 2 + "px");
                    const t = -e.snapGrid[0],
                        s = -e.slidesGrid[0];
                    e.snapGrid = e.snapGrid.map((e => e + t)), e.slidesGrid = e.slidesGrid.map((e => e + s))
                }
                if (c !== d && e.emit("slidesLengthChange"), u.length !== v && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), p.length !== w && e.emit("slidesGridLengthChange"), s.watchSlidesProgress && e.updateSlidesOffset(), !(l || s.cssMode || "slide" !== s.effect && "fade" !== s.effect)) {
                    const t = `${s.containerModifierClass}backface-hidden`,
                        i = e.el.classList.contains(t);
                    c <= s.maxBackfaceHiddenSlides ? i || e.el.classList.add(t) : i && e.el.classList.remove(t)
                }
            },
            updateAutoHeight: function(e) {
                const t = this,
                    s = [],
                    i = t.virtual && t.params.virtual.enabled;
                let r, n = 0;
                "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
                const a = e => i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
                if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                    if (t.params.centeredSlides)(t.visibleSlides || []).forEach((e => {
                        s.push(e)
                    }));
                    else
                        for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
                            const e = t.activeIndex + r;
                            if (e > t.slides.length && !i) break;
                            s.push(a(e))
                        } else s.push(a(t.activeIndex));
                for (r = 0; r < s.length; r += 1)
                    if (void 0 !== s[r]) {
                        const e = s[r].offsetHeight;
                        n = e > n ? e : n
                    }(n || 0 === n) && (t.wrapperEl.style.height = `${n}px`)
            },
            updateSlidesOffset: function() {
                const e = this,
                    t = e.slides,
                    s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
                for (let i = 0; i < t.length; i += 1) t[i].swiperSlideOffset = (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - s - e.cssOverflowAdjustment()
            },
            updateSlidesProgress: function(e) {
                void 0 === e && (e = this && this.translate || 0);
                const t = this,
                    s = t.params,
                    {
                        slides: i,
                        rtlTranslate: r,
                        snapGrid: n
                    } = t;
                if (0 === i.length) return;
                void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                let a = -e;
                r && (a = e), i.forEach((e => {
                    e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass)
                })), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                let o = s.spaceBetween;
                "string" == typeof o && o.indexOf("%") >= 0 ? o = parseFloat(o.replace("%", "")) / 100 * t.size : "string" == typeof o && (o = parseFloat(o));
                for (let l = 0; l < i.length; l += 1) {
                    const e = i[l];
                    let d = e.swiperSlideOffset;
                    s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
                    const h = (a + (s.centeredSlides ? t.minTranslate() : 0) - d) / (e.swiperSlideSize + o),
                        c = (a - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) / (e.swiperSlideSize + o),
                        u = -(a - d),
                        p = u + t.slidesSizesGrid[l],
                        m = u >= 0 && u <= t.size - t.slidesSizesGrid[l];
                    (u >= 0 && u < t.size - 1 || p > 1 && p <= t.size || u <= 0 && p >= t.size) && (t.visibleSlides.push(e), t.visibleSlidesIndexes.push(l), i[l].classList.add(s.slideVisibleClass)), m && i[l].classList.add(s.slideFullyVisibleClass), e.progress = r ? -h : h, e.originalProgress = r ? -c : c
                }
            },
            updateProgress: function(e) {
                const t = this;
                if (void 0 === e) {
                    const s = t.rtlTranslate ? -1 : 1;
                    e = t && t.translate && t.translate * s || 0
                }
                const s = t.params,
                    i = t.maxTranslate() - t.minTranslate();
                let {
                    progress: r,
                    isBeginning: n,
                    isEnd: a,
                    progressLoop: o
                } = t;
                const l = n,
                    d = a;
                if (0 === i) r = 0, n = !0, a = !0;
                else {
                    r = (e - t.minTranslate()) / i;
                    const s = Math.abs(e - t.minTranslate()) < 1,
                        o = Math.abs(e - t.maxTranslate()) < 1;
                    n = s || r <= 0, a = o || r >= 1, s && (r = 0), o && (r = 1)
                }
                if (s.loop) {
                    const s = t.getSlideIndexByData(0),
                        i = t.getSlideIndexByData(t.slides.length - 1),
                        r = t.slidesGrid[s],
                        n = t.slidesGrid[i],
                        a = t.slidesGrid[t.slidesGrid.length - 1],
                        l = Math.abs(e);
                    o = l >= r ? (l - r) / a : (l + a - n) / a, o > 1 && (o -= 1)
                }
                Object.assign(t, {
                    progress: r,
                    progressLoop: o,
                    isBeginning: n,
                    isEnd: a
                }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), n && !l && t.emit("reachBeginning toEdge"), a && !d && t.emit("reachEnd toEdge"), (l && !n || d && !a) && t.emit("fromEdge"), t.emit("progress", r)
            },
            updateSlidesClasses: function() {
                const e = this,
                    {
                        slides: t,
                        params: s,
                        slidesEl: i,
                        activeIndex: r
                    } = e,
                    n = e.virtual && s.virtual.enabled,
                    a = e.grid && s.grid && s.grid.rows > 1,
                    o = e => S(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
                let l, d, h;
                if (t.forEach((e => {
                        e.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass)
                    })), n)
                    if (s.loop) {
                        let t = r - e.virtual.slidesBefore;
                        t < 0 && (t = e.virtual.slides.length + t), t >= e.virtual.slides.length && (t -= e.virtual.slides.length), l = o(`[data-swiper-slide-index="${t}"]`)
                    } else l = o(`[data-swiper-slide-index="${r}"]`);
                else a ? (l = t.filter((e => e.column === r))[0], h = t.filter((e => e.column === r + 1))[0], d = t.filter((e => e.column === r - 1))[0]) : l = t[r];
                l && (l.classList.add(s.slideActiveClass), a ? (h && h.classList.add(s.slideNextClass), d && d.classList.add(s.slidePrevClass)) : (h = function(e, t) {
                    const s = [];
                    for (; e.nextElementSibling;) {
                        const i = e.nextElementSibling;
                        t ? i.matches(t) && s.push(i) : s.push(i), e = i
                    }
                    return s
                }(l, `.${s.slideClass}, swiper-slide`)[0], s.loop && !h && (h = t[0]), h && h.classList.add(s.slideNextClass), d = function(e, t) {
                    const s = [];
                    for (; e.previousElementSibling;) {
                        const i = e.previousElementSibling;
                        t ? i.matches(t) && s.push(i) : s.push(i), e = i
                    }
                    return s
                }(l, `.${s.slideClass}, swiper-slide`)[0], s.loop && 0 === !d && (d = t[t.length - 1]), d && d.classList.add(s.slidePrevClass))), e.emitSlidesClasses()
            },
            updateActiveIndex: function(e) {
                const t = this,
                    s = t.rtlTranslate ? t.translate : -t.translate,
                    {
                        snapGrid: i,
                        params: r,
                        activeIndex: n,
                        realIndex: a,
                        snapIndex: o
                    } = t;
                let l, d = e;
                const h = e => {
                    let s = e - t.virtual.slidesBefore;
                    return s < 0 && (s = t.virtual.slides.length + s), s >= t.virtual.slides.length && (s -= t.virtual.slides.length), s
                };
                if (void 0 === d && (d = function(e) {
                        const {
                            slidesGrid: t,
                            params: s
                        } = e, i = e.rtlTranslate ? e.translate : -e.translate;
                        let r;
                        for (let n = 0; n < t.length; n += 1) void 0 !== t[n + 1] ? i >= t[n] && i < t[n + 1] - (t[n + 1] - t[n]) / 2 ? r = n : i >= t[n] && i < t[n + 1] && (r = n + 1) : i >= t[n] && (r = n);
                        return s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0), r
                    }(t)), i.indexOf(s) >= 0) l = i.indexOf(s);
                else {
                    const e = Math.min(r.slidesPerGroupSkip, d);
                    l = e + Math.floor((d - e) / r.slidesPerGroup)
                }
                if (l >= i.length && (l = i.length - 1), d === n && !t.params.loop) return void(l !== o && (t.snapIndex = l, t.emit("snapIndexChange")));
                if (d === n && t.params.loop && t.virtual && t.params.virtual.enabled) return void(t.realIndex = h(d));
                const c = t.grid && r.grid && r.grid.rows > 1;
                let u;
                if (t.virtual && r.virtual.enabled && r.loop) u = h(d);
                else if (c) {
                    const e = t.slides.filter((e => e.column === d))[0];
                    let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
                    Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)), u = Math.floor(s / r.grid.rows)
                } else if (t.slides[d]) {
                    const e = t.slides[d].getAttribute("data-swiper-slide-index");
                    u = e ? parseInt(e, 10) : d
                } else u = d;
                Object.assign(t, {
                    previousSnapIndex: o,
                    snapIndex: l,
                    previousRealIndex: a,
                    realIndex: u,
                    previousIndex: n,
                    activeIndex: d
                }), t.initialized && R(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && (a !== u && t.emit("realIndexChange"), t.emit("slideChange"))
            },
            updateClickedSlide: function(e, t) {
                const s = this,
                    i = s.params;
                let r = e.closest(`.${i.slideClass}, swiper-slide`);
                !r && s.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e => {
                    !r && e.matches && e.matches(`.${i.slideClass}, swiper-slide`) && (r = e)
                }));
                let n, a = !1;
                if (r)
                    for (let o = 0; o < s.slides.length; o += 1)
                        if (s.slides[o] === r) {
                            a = !0, n = o;
                            break
                        }
                if (!r || !a) return s.clickedSlide = void 0, void(s.clickedIndex = void 0);
                s.clickedSlide = r, s.virtual && s.params.virtual.enabled ? s.clickedIndex = parseInt(r.getAttribute("data-swiper-slide-index"), 10) : s.clickedIndex = n, i.slideToClickedSlide && void 0 !== s.clickedIndex && s.clickedIndex !== s.activeIndex && s.slideToClickedSlide()
            }
        },
        translate: {
            getTranslate: function(e) {
                void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                const {
                    params: t,
                    rtlTranslate: s,
                    translate: i,
                    wrapperEl: r
                } = this;
                if (t.virtualTranslate) return s ? -i : i;
                if (t.cssMode) return i;
                let n = v(r, e);
                return n += this.cssOverflowAdjustment(), s && (n = -n), n || 0
            },
            setTranslate: function(e, t) {
                const s = this,
                    {
                        rtlTranslate: i,
                        params: r,
                        wrapperEl: n,
                        progress: a
                    } = s;
                let o, l = 0,
                    d = 0;
                s.isHorizontal() ? l = i ? -e : e : d = e, r.roundLengths && (l = Math.floor(l), d = Math.floor(d)), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? l : d, r.cssMode ? n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -l : -d : r.virtualTranslate || (s.isHorizontal() ? l -= s.cssOverflowAdjustment() : d -= s.cssOverflowAdjustment(), n.style.transform = `translate3d(${l}px, ${d}px, 0px)`);
                const h = s.maxTranslate() - s.minTranslate();
                o = 0 === h ? 0 : (e - s.minTranslate()) / h, o !== a && s.updateProgress(e), s.emit("setTranslate", s.translate, t)
            },
            minTranslate: function() {
                return -this.snapGrid[0]
            },
            maxTranslate: function() {
                return -this.snapGrid[this.snapGrid.length - 1]
            },
            translateTo: function(e, t, s, i, r) {
                void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), void 0 === i && (i = !0);
                const n = this,
                    {
                        params: a,
                        wrapperEl: o
                    } = n;
                if (n.animating && a.preventInteractionOnTransition) return !1;
                const l = n.minTranslate(),
                    d = n.maxTranslate();
                let h;
                if (h = i && e > l ? l : i && e < d ? d : e, n.updateProgress(h), a.cssMode) {
                    const e = n.isHorizontal();
                    if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -h;
                    else {
                        if (!n.support.smoothScroll) return T({
                            swiper: n,
                            targetPosition: -h,
                            side: e ? "left" : "top"
                        }), !0;
                        o.scrollTo({
                            [e ? "left" : "top"]: -h,
                            behavior: "smooth"
                        })
                    }
                    return !0
                }
                return 0 === t ? (n.setTransition(0), n.setTranslate(h), s && (n.emit("beforeTransitionStart", t, r), n.emit("transitionEnd"))) : (n.setTransition(t), n.setTranslate(h), s && (n.emit("beforeTransitionStart", t, r), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(e) {
                    n && !n.destroyed && e.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, s && n.emit("transitionEnd"))
                }), n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))), !0
            }
        },
        transition: {
            setTransition: function(e, t) {
                const s = this;
                s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`, s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : ""), s.emit("setTransition", e, t)
            },
            transitionStart: function(e, t) {
                void 0 === e && (e = !0);
                const s = this,
                    {
                        params: i
                    } = s;
                i.cssMode || (i.autoHeight && s.updateAutoHeight(), G({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "Start"
                }))
            },
            transitionEnd: function(e, t) {
                void 0 === e && (e = !0);
                const s = this,
                    {
                        params: i
                    } = s;
                s.animating = !1, i.cssMode || (s.setTransition(0), G({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "End"
                }))
            }
        },
        slide: {
            slideTo: function(e, t, s, i, r) {
                void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e && (e = parseInt(e, 10));
                const n = this;
                let a = e;
                a < 0 && (a = 0);
                const {
                    params: o,
                    snapGrid: l,
                    slidesGrid: d,
                    previousIndex: h,
                    activeIndex: c,
                    rtlTranslate: u,
                    wrapperEl: p,
                    enabled: m
                } = n;
                if (n.animating && o.preventInteractionOnTransition || !m && !i && !r) return !1;
                const f = Math.min(n.params.slidesPerGroupSkip, a);
                let g = f + Math.floor((a - f) / n.params.slidesPerGroup);
                g >= l.length && (g = l.length - 1);
                const v = -l[g];
                if (o.normalizeSlideIndex)
                    for (let x = 0; x < d.length; x += 1) {
                        const e = -Math.floor(100 * v),
                            t = Math.floor(100 * d[x]),
                            s = Math.floor(100 * d[x + 1]);
                        void 0 !== d[x + 1] ? e >= t && e < s - (s - t) / 2 ? a = x : e >= t && e < s && (a = x + 1) : e >= t && (a = x)
                    }
                if (n.initialized && a !== c) {
                    if (!n.allowSlideNext && (u ? v > n.translate && v > n.minTranslate() : v < n.translate && v < n.minTranslate())) return !1;
                    if (!n.allowSlidePrev && v > n.translate && v > n.maxTranslate() && (c || 0) !== a) return !1
                }
                let w;
                if (a !== (h || 0) && s && n.emit("beforeSlideChangeStart"), n.updateProgress(v), w = a > c ? "next" : a < c ? "prev" : "reset", u && -v === n.translate || !u && v === n.translate) return n.updateActiveIndex(a), o.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), "slide" !== o.effect && n.setTranslate(v), "reset" !== w && (n.transitionStart(s, w), n.transitionEnd(s, w)), !1;
                if (o.cssMode) {
                    const e = n.isHorizontal(),
                        s = u ? v : -v;
                    if (0 === t) {
                        const t = n.virtual && n.params.virtual.enabled;
                        t && (n.wrapperEl.style.scrollSnapType = "none", n._immediateVirtual = !0), t && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0, requestAnimationFrame((() => {
                            p[e ? "scrollLeft" : "scrollTop"] = s
                        }))) : p[e ? "scrollLeft" : "scrollTop"] = s, t && requestAnimationFrame((() => {
                            n.wrapperEl.style.scrollSnapType = "", n._immediateVirtual = !1
                        }))
                    } else {
                        if (!n.support.smoothScroll) return T({
                            swiper: n,
                            targetPosition: s,
                            side: e ? "left" : "top"
                        }), !0;
                        p.scrollTo({
                            [e ? "left" : "top"]: s,
                            behavior: "smooth"
                        })
                    }
                    return !0
                }
                return n.setTransition(t), n.setTranslate(v), n.updateActiveIndex(a), n.updateSlidesClasses(), n.emit("beforeTransitionStart", t, i), n.transitionStart(s, w), 0 === t ? n.transitionEnd(s, w) : n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(e) {
                    n && !n.destroyed && e.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(s, w))
                }), n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)), !0
            },
            slideToLoop: function(e, t, s, i) {
                if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e) {
                    e = parseInt(e, 10)
                }
                const r = this,
                    n = r.grid && r.params.grid && r.params.grid.rows > 1;
                let a = e;
                if (r.params.loop)
                    if (r.virtual && r.params.virtual.enabled) a += r.virtual.slidesBefore;
                    else {
                        let e;
                        if (n) {
                            const t = a * r.params.grid.rows;
                            e = r.slides.filter((e => 1 * e.getAttribute("data-swiper-slide-index") === t))[0].column
                        } else e = r.getSlideIndexByData(a);
                        const t = n ? Math.ceil(r.slides.length / r.params.grid.rows) : r.slides.length,
                            {
                                centeredSlides: s
                            } = r.params;
                        let i = r.params.slidesPerView;
                        "auto" === i ? i = r.slidesPerViewDynamic() : (i = Math.ceil(parseFloat(r.params.slidesPerView, 10)), s && i % 2 == 0 && (i += 1));
                        let o = t - e < i;
                        if (s && (o = o || e < Math.ceil(i / 2)), o) {
                            const i = s ? e < r.activeIndex ? "prev" : "next" : e - r.activeIndex - 1 < r.params.slidesPerView ? "next" : "prev";
                            r.loopFix({
                                direction: i,
                                slideTo: !0,
                                activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
                                slideRealIndex: "next" === i ? r.realIndex : void 0
                            })
                        }
                        if (n) {
                            const e = a * r.params.grid.rows;
                            a = r.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0].column
                        } else a = r.getSlideIndexByData(a)
                    }
                return requestAnimationFrame((() => {
                    r.slideTo(a, t, s, i)
                })), r
            },
            slideNext: function(e, t, s) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                const i = this,
                    {
                        enabled: r,
                        params: n,
                        animating: a
                    } = i;
                if (!r) return i;
                let o = n.slidesPerGroup;
                "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
                const l = i.activeIndex < n.slidesPerGroupSkip ? 1 : o,
                    d = i.virtual && n.virtual.enabled;
                if (n.loop) {
                    if (a && !d && n.loopPreventsSliding) return !1;
                    if (i.loopFix({
                            direction: "next"
                        }), i._clientLeft = i.wrapperEl.clientLeft, i.activeIndex === i.slides.length - 1 && n.cssMode) return requestAnimationFrame((() => {
                        i.slideTo(i.activeIndex + l, e, t, s)
                    })), !0
                }
                return n.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + l, e, t, s)
            },
            slidePrev: function(e, t, s) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                const i = this,
                    {
                        params: r,
                        snapGrid: n,
                        slidesGrid: a,
                        rtlTranslate: o,
                        enabled: l,
                        animating: d
                    } = i;
                if (!l) return i;
                const h = i.virtual && r.virtual.enabled;
                if (r.loop) {
                    if (d && !h && r.loopPreventsSliding) return !1;
                    i.loopFix({
                        direction: "prev"
                    }), i._clientLeft = i.wrapperEl.clientLeft
                }

                function c(e) {
                    return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                }
                const u = c(o ? i.translate : -i.translate),
                    p = n.map((e => c(e)));
                let m = n[p.indexOf(u) - 1];
                if (void 0 === m && r.cssMode) {
                    let e;
                    n.forEach(((t, s) => {
                        u >= t && (e = s)
                    })), void 0 !== e && (m = n[e > 0 ? e - 1 : e])
                }
                let f = 0;
                if (void 0 !== m && (f = a.indexOf(m), f < 0 && (f = i.activeIndex - 1), "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (f = f - i.slidesPerViewDynamic("previous", !0) + 1, f = Math.max(f, 0))), r.rewind && i.isBeginning) {
                    const r = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
                    return i.slideTo(r, e, t, s)
                }
                return r.loop && 0 === i.activeIndex && r.cssMode ? (requestAnimationFrame((() => {
                    i.slideTo(f, e, t, s)
                })), !0) : i.slideTo(f, e, t, s)
            },
            slideReset: function(e, t, s) {
                return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, s)
            },
            slideToClosest: function(e, t, s, i) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === i && (i = .5);
                const r = this;
                let n = r.activeIndex;
                const a = Math.min(r.params.slidesPerGroupSkip, n),
                    o = a + Math.floor((n - a) / r.params.slidesPerGroup),
                    l = r.rtlTranslate ? r.translate : -r.translate;
                if (l >= r.snapGrid[o]) {
                    const e = r.snapGrid[o];
                    l - e > (r.snapGrid[o + 1] - e) * i && (n += r.params.slidesPerGroup)
                } else {
                    const e = r.snapGrid[o - 1];
                    l - e <= (r.snapGrid[o] - e) * i && (n -= r.params.slidesPerGroup)
                }
                return n = Math.max(n, 0), n = Math.min(n, r.slidesGrid.length - 1), r.slideTo(n, e, t, s)
            },
            slideToClickedSlide: function() {
                const e = this,
                    {
                        params: t,
                        slidesEl: s
                    } = e,
                    i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
                let r, n = e.clickedIndex;
                const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
                if (t.loop) {
                    if (e.animating) return;
                    r = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? n < e.loopedSlides - i / 2 || n > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(), n = e.getSlideIndex(S(s, `${a}[data-swiper-slide-index="${r}"]`)[0]), f((() => {
                        e.slideTo(n)
                    }))) : e.slideTo(n) : n > e.slides.length - i ? (e.loopFix(), n = e.getSlideIndex(S(s, `${a}[data-swiper-slide-index="${r}"]`)[0]), f((() => {
                        e.slideTo(n)
                    }))) : e.slideTo(n)
                } else e.slideTo(n)
            }
        },
        loop: {
            loopCreate: function(e) {
                const t = this,
                    {
                        params: s,
                        slidesEl: i
                    } = t;
                if (!s.loop || t.virtual && t.params.virtual.enabled) return;
                const r = () => {
                        S(i, `.${s.slideClass}, swiper-slide`).forEach(((e, t) => {
                            e.setAttribute("data-swiper-slide-index", t)
                        }))
                    },
                    n = t.grid && s.grid && s.grid.rows > 1,
                    a = s.slidesPerGroup * (n ? s.grid.rows : 1),
                    o = t.slides.length % a != 0,
                    l = n && t.slides.length % s.grid.rows != 0,
                    d = e => {
                        for (let i = 0; i < e; i += 1) {
                            const e = t.isElement ? M("swiper-slide", [s.slideBlankClass]) : M("div", [s.slideClass, s.slideBlankClass]);
                            t.slidesEl.append(e)
                        }
                    };
                if (o) {
                    if (s.loopAddBlankSlides) {
                        d(a - t.slides.length % a), t.recalcSlides(), t.updateSlides()
                    } else y("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                    r()
                } else if (l) {
                    if (s.loopAddBlankSlides) {
                        d(s.grid.rows - t.slides.length % s.grid.rows), t.recalcSlides(), t.updateSlides()
                    } else y("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                    r()
                } else r();
                t.loopFix({
                    slideRealIndex: e,
                    direction: s.centeredSlides ? void 0 : "next"
                })
            },
            loopFix: function(e) {
                let {
                    slideRealIndex: t,
                    slideTo: s = !0,
                    direction: i,
                    setTranslate: r,
                    activeSlideIndex: n,
                    byController: a,
                    byMousewheel: d
                } = void 0 === e ? {} : e;
                const h = this;
                if (!h.params.loop) return;
                h.emit("beforeLoopFix");
                const {
                    slides: c,
                    allowSlidePrev: u,
                    allowSlideNext: p,
                    slidesEl: m,
                    params: f
                } = h, {
                    centeredSlides: g
                } = f;
                if (h.allowSlidePrev = !0, h.allowSlideNext = !0, h.virtual && f.virtual.enabled) return s && (f.centeredSlides || 0 !== h.snapIndex ? f.centeredSlides && h.snapIndex < f.slidesPerView ? h.slideTo(h.virtual.slides.length + h.snapIndex, 0, !1, !0) : h.snapIndex === h.snapGrid.length - 1 && h.slideTo(h.virtual.slidesBefore, 0, !1, !0) : h.slideTo(h.virtual.slides.length, 0, !1, !0)), h.allowSlidePrev = u, h.allowSlideNext = p, void h.emit("loopFix");
                let v = f.slidesPerView;
                "auto" === v ? v = h.slidesPerViewDynamic() : (v = Math.ceil(parseFloat(f.slidesPerView, 10)), g && v % 2 == 0 && (v += 1));
                const w = f.slidesPerGroupAuto ? v : f.slidesPerGroup;
                let x = w;
                x % w != 0 && (x += w - x % w), x += f.loopAdditionalSlides, h.loopedSlides = x;
                const b = h.grid && f.grid && f.grid.rows > 1;
                c.length < v + x ? y("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : b && "row" === f.grid.fill && y("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
                const E = [],
                    T = [];
                let S = h.activeIndex;
                void 0 === n ? n = h.getSlideIndex(c.filter((e => e.classList.contains(f.slideActiveClass)))[0]) : S = n;
                const M = "next" === i || !i,
                    A = "prev" === i || !i;
                let C = 0,
                    P = 0;
                const _ = b ? Math.ceil(c.length / f.grid.rows) : c.length,
                    I = (b ? c[n].column : n) + (g && void 0 === r ? -v / 2 + .5 : 0);
                if (I < x) {
                    C = Math.max(x - I, w);
                    for (let e = 0; e < x - I; e += 1) {
                        const t = e - Math.floor(e / _) * _;
                        if (b) {
                            const e = _ - t - 1;
                            for (let t = c.length - 1; t >= 0; t -= 1) c[t].column === e && E.push(t)
                        } else E.push(_ - t - 1)
                    }
                } else if (I + v > _ - x) {
                    P = Math.max(I - (_ - 2 * x), w);
                    for (let e = 0; e < P; e += 1) {
                        const t = e - Math.floor(e / _) * _;
                        b ? c.forEach(((e, s) => {
                            e.column === t && T.push(s)
                        })) : T.push(t)
                    }
                }
                if (A && E.forEach((e => {
                        c[e].swiperLoopMoveDOM = !0, m.prepend(c[e]), c[e].swiperLoopMoveDOM = !1
                    })), M && T.forEach((e => {
                        c[e].swiperLoopMoveDOM = !0, m.append(c[e]), c[e].swiperLoopMoveDOM = !1
                    })), h.recalcSlides(), "auto" === f.slidesPerView ? h.updateSlides() : b && (E.length > 0 && A || T.length > 0 && M) && h.slides.forEach(((e, t) => {
                        h.grid.updateSlide(t, e, h.slides)
                    })), f.watchSlidesProgress && h.updateSlidesOffset(), s)
                    if (E.length > 0 && A) {
                        if (void 0 === t) {
                            const e = h.slidesGrid[S],
                                t = h.slidesGrid[S + C] - e;
                            d ? h.setTranslate(h.translate - t) : (h.slideTo(S + C, 0, !1, !0), r && (h.touchEventsData.startTranslate = h.touchEventsData.startTranslate - t, h.touchEventsData.currentTranslate = h.touchEventsData.currentTranslate - t))
                        } else if (r) {
                            const e = b ? E.length / f.grid.rows : E.length;
                            h.slideTo(h.activeIndex + e, 0, !1, !0), h.touchEventsData.currentTranslate = h.translate
                        }
                    } else if (T.length > 0 && M)
                    if (void 0 === t) {
                        const e = h.slidesGrid[S],
                            t = h.slidesGrid[S - P] - e;
                        d ? h.setTranslate(h.translate - t) : (h.slideTo(S - P, 0, !1, !0), r && (h.touchEventsData.startTranslate = h.touchEventsData.startTranslate - t, h.touchEventsData.currentTranslate = h.touchEventsData.currentTranslate - t))
                    } else {
                        const e = b ? T.length / f.grid.rows : T.length;
                        h.slideTo(h.activeIndex - e, 0, !1, !0)
                    }
                if (h.allowSlidePrev = u, h.allowSlideNext = p, h.controller && h.controller.control && !a) {
                    const e = {
                        slideRealIndex: t,
                        direction: i,
                        setTranslate: r,
                        activeSlideIndex: n,
                        byController: !0
                    };
                    Array.isArray(h.controller.control) ? h.controller.control.forEach((t => {
                        !t.destroyed && t.params.loop && t.loopFix(l(o({}, e), {
                            slideTo: t.params.slidesPerView === f.slidesPerView && s
                        }))
                    })) : h.controller.control instanceof h.constructor && h.controller.control.params.loop && h.controller.control.loopFix(l(o({}, e), {
                        slideTo: h.controller.control.params.slidesPerView === f.slidesPerView && s
                    }))
                }
                h.emit("loopFix")
            },
            loopDestroy: function() {
                const e = this,
                    {
                        params: t,
                        slidesEl: s
                    } = e;
                if (!t.loop || e.virtual && e.params.virtual.enabled) return;
                e.recalcSlides();
                const i = [];
                e.slides.forEach((e => {
                    const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
                    i[t] = e
                })), e.slides.forEach((e => {
                    e.removeAttribute("data-swiper-slide-index")
                })), i.forEach((e => {
                    s.append(e)
                })), e.recalcSlides(), e.slideTo(e.realIndex, 0)
            }
        },
        grabCursor: {
            setGrabCursor: function(e) {
                const t = this;
                if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
                const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                t.isElement && (t.__preventObserver__ = !0), s.style.cursor = "move", s.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame((() => {
                    t.__preventObserver__ = !1
                }))
            },
            unsetGrabCursor: function() {
                const e = this;
                e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame((() => {
                    e.__preventObserver__ = !1
                })))
            }
        },
        events: {
            attachEvents: function() {
                const e = this,
                    {
                        params: t
                    } = e;
                e.onTouchStart = N.bind(e), e.onTouchMove = V.bind(e), e.onTouchEnd = j.bind(e), e.onDocumentTouchStart = Y.bind(e), t.cssMode && (e.onScroll = X.bind(e)), e.onClick = q.bind(e), e.onLoad = W.bind(e), $(e, "on")
            },
            detachEvents: function() {
                $(this, "off")
            }
        },
        breakpoints: {
            setBreakpoint: function() {
                const e = this,
                    {
                        realIndex: t,
                        initialized: s,
                        params: i,
                        el: r
                    } = e,
                    n = i.breakpoints;
                if (!n || n && 0 === Object.keys(n).length) return;
                const a = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
                if (!a || e.currentBreakpoint === a) return;
                const o = (a in n ? n[a] : void 0) || e.originalParams,
                    l = H(e, i),
                    d = H(e, o),
                    h = i.enabled;
                l && !d ? (r.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`), e.emitContainerClasses()) : !l && d && (r.classList.add(`${i.containerModifierClass}grid`), (o.grid.fill && "column" === o.grid.fill || !o.grid.fill && "column" === i.grid.fill) && r.classList.add(`${i.containerModifierClass}grid-column`), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach((t => {
                    if (void 0 === o[t]) return;
                    const s = i[t] && i[t].enabled,
                        r = o[t] && o[t].enabled;
                    s && !r && e[t].disable(), !s && r && e[t].enable()
                }));
                const c = o.direction && o.direction !== i.direction,
                    u = i.loop && (o.slidesPerView !== i.slidesPerView || c),
                    p = i.loop;
                c && s && e.changeDirection(), b(e.params, o);
                const m = e.params.enabled,
                    f = e.params.loop;
                Object.assign(e, {
                    allowTouchMove: e.params.allowTouchMove,
                    allowSlideNext: e.params.allowSlideNext,
                    allowSlidePrev: e.params.allowSlidePrev
                }), h && !m ? e.disable() : !h && m && e.enable(), e.currentBreakpoint = a, e.emit("_beforeBreakpoint", o), s && (u ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides()) : !p && f ? (e.loopCreate(t), e.updateSlides()) : p && !f && e.loopDestroy()), e.emit("breakpoint", o)
            },
            getBreakpoint: function(e, t, s) {
                if (void 0 === t && (t = "window"), !e || "container" === t && !s) return;
                let i = !1;
                const r = m(),
                    n = "window" === t ? r.innerHeight : s.clientHeight,
                    a = Object.keys(e).map((e => {
                        if ("string" == typeof e && 0 === e.indexOf("@")) {
                            const t = parseFloat(e.substr(1));
                            return {
                                value: n * t,
                                point: e
                            }
                        }
                        return {
                            value: e,
                            point: e
                        }
                    }));
                a.sort(((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10)));
                for (let o = 0; o < a.length; o += 1) {
                    const {
                        point: e,
                        value: n
                    } = a[o];
                    "window" === t ? r.matchMedia(`(min-width: ${n}px)`).matches && (i = e) : n <= s.clientWidth && (i = e)
                }
                return i || "max"
            }
        },
        checkOverflow: {
            checkOverflow: function() {
                const e = this,
                    {
                        isLocked: t,
                        params: s
                    } = e,
                    {
                        slidesOffsetBefore: i
                    } = s;
                if (i) {
                    const t = e.slides.length - 1,
                        s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                    e.isLocked = e.size > s
                } else e.isLocked = 1 === e.snapGrid.length;
                !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
            }
        },
        classes: {
            addClasses: function() {
                const e = this,
                    {
                        classNames: t,
                        params: s,
                        rtl: i,
                        el: r,
                        device: n
                    } = e,
                    a = function(e, t) {
                        const s = [];
                        return e.forEach((e => {
                            "object" == typeof e ? Object.keys(e).forEach((i => {
                                e[i] && s.push(t + i)
                            })) : "string" == typeof e && s.push(t + e)
                        })), s
                    }(["initialized", s.direction, {
                        "free-mode": e.params.freeMode && s.freeMode.enabled
                    }, {
                        autoheight: s.autoHeight
                    }, {
                        rtl: i
                    }, {
                        grid: s.grid && s.grid.rows > 1
                    }, {
                        "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
                    }, {
                        android: n.android
                    }, {
                        ios: n.ios
                    }, {
                        "css-mode": s.cssMode
                    }, {
                        centered: s.cssMode && s.centeredSlides
                    }, {
                        "watch-progress": s.watchSlidesProgress
                    }], s.containerModifierClass);
                t.push(...a), r.classList.add(...t), e.emitContainerClasses()
            },
            removeClasses: function() {
                const {
                    el: e,
                    classNames: t
                } = this;
                e.classList.remove(...t), this.emitContainerClasses()
            }
        }
    },
    J = {};
class ee {
    constructor() {
        let e, t;
        for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++) i[r] = arguments[r];
        1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? t = i[0] : [e, t] = i, t || (t = {}), t = b({}, t), e && !t.el && (t.el = e);
        const n = u();
        if (t.el && "string" == typeof t.el && n.querySelectorAll(t.el).length > 1) {
            const e = [];
            return n.querySelectorAll(t.el).forEach((s => {
                const i = b({}, t, {
                    el: s
                });
                e.push(new ee(i))
            })), e
        }
        const a = this;
        a.__swiper__ = !0, a.support = O(), a.device = F({
            userAgent: t.userAgent
        }), a.browser = k(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [...a.__modules__], t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
        const o = {};
        a.modules.forEach((e => {
            e({
                params: t,
                swiper: a,
                extendParams: K(t, o),
                on: a.on.bind(a),
                once: a.once.bind(a),
                off: a.off.bind(a),
                emit: a.emit.bind(a)
            })
        }));
        const l = b({}, Z, o);
        return a.params = b({}, l, J, t), a.originalParams = b({}, a.params), a.passedParams = b({}, t), a.params && a.params.on && Object.keys(a.params.on).forEach((e => {
            a.on(e, a.params.on[e])
        })), a.params && a.params.onAny && a.onAny(a.params.onAny), Object.assign(a, {
            enabled: a.params.enabled,
            el: e,
            classNames: [],
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: () => "horizontal" === a.params.direction,
            isVertical: () => "vertical" === a.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            cssOverflowAdjustment() {
                return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
            },
            allowSlideNext: a.params.allowSlideNext,
            allowSlidePrev: a.params.allowSlidePrev,
            touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: a.params.focusableElements,
                lastClickTime: 0,
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                startMoving: void 0,
                pointerId: null,
                touchId: null
            },
            allowClick: !0,
            allowTouchMove: a.params.allowTouchMove,
            touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            },
            imagesToLoad: [],
            imagesLoaded: 0
        }), a.emit("_swiper"), a.params.init && a.init(), a
    }
    getDirectionLabel(e) {
        return this.isHorizontal() ? e : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom"
        }[e]
    }
    getSlideIndex(e) {
        const {
            slidesEl: t,
            params: s
        } = this, i = C(S(t, `.${s.slideClass}, swiper-slide`)[0]);
        return C(e) - i
    }
    getSlideIndexByData(e) {
        return this.getSlideIndex(this.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0])
    }
    recalcSlides() {
        const {
            slidesEl: e,
            params: t
        } = this;
        this.slides = S(e, `.${t.slideClass}, swiper-slide`)
    }
    enable() {
        const e = this;
        e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
    }
    disable() {
        const e = this;
        e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
    }
    setProgress(e, t) {
        const s = this;
        e = Math.min(Math.max(e, 0), 1);
        const i = s.minTranslate(),
            r = (s.maxTranslate() - i) * e + i;
        s.translateTo(r, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses()
    }
    emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = e.el.className.split(" ").filter((t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass)));
        e.emit("_containerClasses", t.join(" "))
    }
    getSlideClasses(e) {
        const t = this;
        return t.destroyed ? "" : e.className.split(" ").filter((e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ")
    }
    emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = [];
        e.slides.forEach((s => {
            const i = e.getSlideClasses(s);
            t.push({
                slideEl: s,
                classNames: i
            }), e.emit("_slideClass", s, i)
        })), e.emit("_slideClasses", t)
    }
    slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"), void 0 === t && (t = !1);
        const {
            params: s,
            slides: i,
            slidesGrid: r,
            slidesSizesGrid: n,
            size: a,
            activeIndex: o
        } = this;
        let l = 1;
        if ("number" == typeof s.slidesPerView) return s.slidesPerView;
        if (s.centeredSlides) {
            let e, t = i[o] ? i[o].swiperSlideSize : 0;
            for (let s = o + 1; s < i.length; s += 1) i[s] && !e && (t += i[s].swiperSlideSize, l += 1, t > a && (e = !0));
            for (let s = o - 1; s >= 0; s -= 1) i[s] && !e && (t += i[s].swiperSlideSize, l += 1, t > a && (e = !0))
        } else if ("current" === e)
            for (let d = o + 1; d < i.length; d += 1) {
                (t ? r[d] + n[d] - r[o] < a : r[d] - r[o] < a) && (l += 1)
            } else
                for (let d = o - 1; d >= 0; d -= 1) {
                    r[o] - r[d] < a && (l += 1)
                }
        return l
    }
    update() {
        const e = this;
        if (!e || e.destroyed) return;
        const {
            snapGrid: t,
            params: s
        } = e;

        function i() {
            const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses()
        }
        let r;
        if (s.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t => {
                t.complete && z(e, t)
            })), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), s.freeMode && s.freeMode.enabled && !s.cssMode) i(), s.autoHeight && e.updateAutoHeight();
        else {
            if (("auto" === s.slidesPerView || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) {
                const t = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
                r = e.slideTo(t.length - 1, 0, !1, !0)
            } else r = e.slideTo(e.activeIndex, 0, !1, !0);
            r || i()
        }
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
    }
    changeDirection(e, t) {
        void 0 === t && (t = !0);
        const s = this,
            i = s.params.direction;
        return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove(`${s.params.containerModifierClass}${i}`), s.el.classList.add(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.forEach((t => {
            "vertical" === e ? t.style.width = "" : t.style.height = ""
        })), s.emit("changeDirection"), t && s.update()), s
    }
    changeLanguageDirection(e) {
        const t = this;
        t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update())
    }
    mount(e) {
        const t = this;
        if (t.mounted) return !0;
        let s = e || t.params.el;
        if ("string" == typeof s && (s = document.querySelector(s)), !s) return !1;
        s.swiper = t, s.parentNode && s.parentNode.host && "SWIPER-CONTAINER" === s.parentNode.host.nodeName && (t.isElement = !0);
        const i = () => `.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;
        let r = (() => {
            if (s && s.shadowRoot && s.shadowRoot.querySelector) {
                return s.shadowRoot.querySelector(i())
            }
            return S(s, i())[0]
        })();
        return !r && t.params.createElements && (r = M("div", t.params.wrapperClass), s.append(r), S(s, `.${t.params.slideClass}`).forEach((e => {
            r.append(e)
        }))), Object.assign(t, {
            el: s,
            wrapperEl: r,
            slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : r,
            hostEl: t.isElement ? s.parentNode.host : s,
            mounted: !0,
            rtl: "rtl" === s.dir.toLowerCase() || "rtl" === A(s, "direction"),
            rtlTranslate: "horizontal" === t.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === A(s, "direction")),
            wrongRTL: "-webkit-box" === A(r, "display")
        }), !0
    }
    init(e) {
        const t = this;
        if (t.initialized) return t;
        if (!1 === t.mount(e)) return t;
        t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(), t.attachEvents();
        const s = [...t.el.querySelectorAll('[loading="lazy"]')];
        return t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), s.forEach((e => {
            e.complete ? z(t, e) : e.addEventListener("load", (e => {
                z(t, e.target)
            }))
        })), R(t), t.initialized = !0, R(t), t.emit("init"), t.emit("afterInit"), t
    }
    destroy(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        const s = this,
            {
                params: i,
                el: r,
                wrapperEl: n,
                slides: a
            } = s;
        return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), i.loop && s.loopDestroy(), t && (s.removeClasses(), r.removeAttribute("style"), n.removeAttribute("style"), a && a.length && a.forEach((e => {
            e.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass), e.removeAttribute("style"), e.removeAttribute("data-swiper-slide-index")
        }))), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((e => {
            s.off(e)
        })), !1 !== e && (s.el.swiper = null, function(e) {
            const t = e;
            Object.keys(t).forEach((e => {
                try {
                    t[e] = null
                } catch (s) {}
                try {
                    delete t[e]
                } catch (s) {}
            }))
        }(s)), s.destroyed = !0), null
    }
    static extendDefaults(e) {
        b(J, e)
    }
    static get extendedDefaults() {
        return J
    }
    static get defaults() {
        return Z
    }
    static installModule(e) {
        ee.prototype.__modules__ || (ee.prototype.__modules__ = []);
        const t = ee.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
    }
    static use(e) {
        return Array.isArray(e) ? (e.forEach((e => ee.installModule(e))), ee) : (ee.installModule(e), ee)
    }
}

function te(e) {
    let {
        swiper: t,
        extendParams: s,
        on: i,
        emit: r
    } = e;
    s({
        navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled"
        }
    }), t.navigation = {
        nextEl: null,
        prevEl: null
    };
    const n = e => (Array.isArray(e) ? e : [e]).filter((e => !!e));

    function a(e) {
        let s;
        return e && "string" == typeof e && t.isElement && (s = t.el.querySelector(e), s) ? s : (e && ("string" == typeof e && (s = [...document.querySelectorAll(e)]), t.params.uniqueNavElements && "string" == typeof e && s.length > 1 && 1 === t.el.querySelectorAll(e).length && (s = t.el.querySelector(e))), e && !s ? e : s)
    }

    function o(e, s) {
        const i = t.params.navigation;
        (e = n(e)).forEach((e => {
            e && (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")), "BUTTON" === e.tagName && (e.disabled = s), t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](i.lockClass))
        }))
    }

    function l() {
        const {
            nextEl: e,
            prevEl: s
        } = t.navigation;
        if (t.params.loop) return o(s, !1), void o(e, !1);
        o(s, t.isBeginning && !t.params.rewind), o(e, t.isEnd && !t.params.rewind)
    }

    function d(e) {
        e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), r("navigationPrev"))
    }

    function h(e) {
        e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), r("navigationNext"))
    }

    function c() {
        const e = t.params.navigation;
        if (t.params.navigation = function(e, t, s, i) {
                return e.params.createElements && Object.keys(i).forEach((r => {
                    if (!s[r] && !0 === s.auto) {
                        let n = S(e.el, `.${i[r]}`)[0];
                        n || (n = M("div", i[r]), n.className = i[r], e.el.append(n)), s[r] = n, t[r] = n
                    }
                })), s
            }(t, t.originalParams.navigation, t.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            }), !e.nextEl && !e.prevEl) return;
        let s = a(e.nextEl),
            i = a(e.prevEl);
        Object.assign(t.navigation, {
            nextEl: s,
            prevEl: i
        }), s = n(s), i = n(i);
        const r = (s, i) => {
            s && s.addEventListener("click", "next" === i ? h : d), !t.enabled && s && s.classList.add(...e.lockClass.split(" "))
        };
        s.forEach((e => r(e, "next"))), i.forEach((e => r(e, "prev")))
    }

    function u() {
        let {
            nextEl: e,
            prevEl: s
        } = t.navigation;
        e = n(e), s = n(s);
        const i = (e, s) => {
            e.removeEventListener("click", "next" === s ? h : d), e.classList.remove(...t.params.navigation.disabledClass.split(" "))
        };
        e.forEach((e => i(e, "next"))), s.forEach((e => i(e, "prev")))
    }
    i("init", (() => {
        !1 === t.params.navigation.enabled ? p() : (c(), l())
    })), i("toEdge fromEdge lock unlock", (() => {
        l()
    })), i("destroy", (() => {
        u()
    })), i("enable disable", (() => {
        let {
            nextEl: e,
            prevEl: s
        } = t.navigation;
        e = n(e), s = n(s), t.enabled ? l() : [...e, ...s].filter((e => !!e)).forEach((e => e.classList.add(t.params.navigation.lockClass)))
    })), i("click", ((e, s) => {
        let {
            nextEl: i,
            prevEl: a
        } = t.navigation;
        i = n(i), a = n(a);
        const o = s.target;
        if (t.params.navigation.hideOnClick && !a.includes(o) && !i.includes(o)) {
            if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === o || t.pagination.el.contains(o))) return;
            let e;
            i.length ? e = i[0].classList.contains(t.params.navigation.hiddenClass) : a.length && (e = a[0].classList.contains(t.params.navigation.hiddenClass)), r(!0 === e ? "navigationShow" : "navigationHide"), [...i, ...a].filter((e => !!e)).forEach((e => e.classList.toggle(t.params.navigation.hiddenClass)))
        }
    }));
    const p = () => {
        t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")), u()
    };
    Object.assign(t.navigation, {
        enable: () => {
            t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")), c(), l()
        },
        disable: p,
        update: l,
        init: c,
        destroy: u
    })
}

function se(e) {
    let t = e[0],
        s = e[1],
        i = e[2];
    return Math.sqrt(t * t + s * s + i * i)
}

function ie(e, t) {
    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e
}

function re(e, t, s) {
    return e[0] = t[0] + s[0], e[1] = t[1] + s[1], e[2] = t[2] + s[2], e
}

function ne(e, t, s) {
    return e[0] = t[0] - s[0], e[1] = t[1] - s[1], e[2] = t[2] - s[2], e
}

function ae(e, t, s) {
    return e[0] = t[0] * s, e[1] = t[1] * s, e[2] = t[2] * s, e
}

function oe(e) {
    let t = e[0],
        s = e[1],
        i = e[2];
    return t * t + s * s + i * i
}

function le(e, t) {
    let s = t[0],
        i = t[1],
        r = t[2],
        n = s * s + i * i + r * r;
    return n > 0 && (n = 1 / Math.sqrt(n)), e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e
}

function de(e, t) {
    return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
}

function he(e, t, s) {
    let i = t[0],
        r = t[1],
        n = t[2],
        a = s[0],
        o = s[1],
        l = s[2];
    return e[0] = r * l - n * o, e[1] = n * a - i * l, e[2] = i * o - r * a, e
}
Object.keys(Q).forEach((e => {
    Object.keys(Q[e]).forEach((t => {
        ee.prototype[t] = Q[e][t]
    }))
})), ee.use([function(e) {
    let {
        swiper: t,
        on: s,
        emit: i
    } = e;
    const r = m();
    let n = null,
        a = null;
    const o = () => {
            t && !t.destroyed && t.initialized && (i("beforeResize"), i("resize"))
        },
        l = () => {
            t && !t.destroyed && t.initialized && i("orientationchange")
        };
    s("init", (() => {
        t.params.resizeObserver && void 0 !== r.ResizeObserver ? t && !t.destroyed && t.initialized && (n = new ResizeObserver((e => {
            a = r.requestAnimationFrame((() => {
                const {
                    width: s,
                    height: i
                } = t;
                let r = s,
                    n = i;
                e.forEach((e => {
                    let {
                        contentBoxSize: s,
                        contentRect: i,
                        target: a
                    } = e;
                    a && a !== t.el || (r = i ? i.width : (s[0] || s).inlineSize, n = i ? i.height : (s[0] || s).blockSize)
                })), r === s && n === i || o()
            }))
        })), n.observe(t.el)) : (r.addEventListener("resize", o), r.addEventListener("orientationchange", l))
    })), s("destroy", (() => {
        a && r.cancelAnimationFrame(a), n && n.unobserve && t.el && (n.unobserve(t.el), n = null), r.removeEventListener("resize", o), r.removeEventListener("orientationchange", l)
    }))
}, function(e) {
    let {
        swiper: t,
        extendParams: s,
        on: i,
        emit: r
    } = e;
    const n = [],
        a = m(),
        o = function(e, s) {
            void 0 === s && (s = {});
            const i = new(a.MutationObserver || a.WebkitMutationObserver)((e => {
                if (t.__preventObserver__) return;
                if (1 === e.length) return void r("observerUpdate", e[0]);
                const s = function() {
                    r("observerUpdate", e[0])
                };
                a.requestAnimationFrame ? a.requestAnimationFrame(s) : a.setTimeout(s, 0)
            }));
            i.observe(e, {
                attributes: void 0 === s.attributes || s.attributes,
                childList: void 0 === s.childList || s.childList,
                characterData: void 0 === s.characterData || s.characterData
            }), n.push(i)
        };
    s({
        observer: !1,
        observeParents: !1,
        observeSlideChildren: !1
    }), i("init", (() => {
        if (t.params.observer) {
            if (t.params.observeParents) {
                const e = function(e, t) {
                    const s = [];
                    let i = e.parentElement;
                    for (; i;) t ? i.matches(t) && s.push(i) : s.push(i), i = i.parentElement;
                    return s
                }(t.hostEl);
                for (let t = 0; t < e.length; t += 1) o(e[t])
            }
            o(t.hostEl, {
                childList: t.params.observeSlideChildren
            }), o(t.wrapperEl, {
                attributes: !1
            })
        }
    })), i("destroy", (() => {
        n.forEach((e => {
            e.disconnect()
        })), n.splice(0, n.length)
    }))
}]);
const ce = function() {
    const e = [0, 0, 0],
        t = [0, 0, 0];
    return function(s, i) {
        ie(e, s), ie(t, i), le(e, e), le(t, t);
        let r = de(e, t);
        return r > 1 ? 0 : r < -1 ? Math.PI : Math.acos(r)
    }
}();
class ue extends Array {
    constructor(e = 0, t = e, s = e) {
        return super(e, t, s), this
    }
    get x() {
        return this[0]
    }
    get y() {
        return this[1]
    }
    get z() {
        return this[2]
    }
    set x(e) {
        this[0] = e
    }
    set y(e) {
        this[1] = e
    }
    set z(e) {
        this[2] = e
    }
    set(e, t = e, s = e) {
        return e.length ? this.copy(e) : (function(e, t, s, i) {
            e[0] = t, e[1] = s, e[2] = i
        }(this, e, t, s), this)
    }
    copy(e) {
        return ie(this, e), this
    }
    add(e, t) {
        return t ? re(this, e, t) : re(this, this, e), this
    }
    sub(e, t) {
        return t ? ne(this, e, t) : ne(this, this, e), this
    }
    multiply(e) {
        var t, s, i;
        return e.length ? (s = this, i = e, (t = this)[0] = s[0] * i[0], t[1] = s[1] * i[1], t[2] = s[2] * i[2]) : ae(this, this, e), this
    }
    divide(e) {
        var t, s, i;
        return e.length ? (s = this, i = e, (t = this)[0] = s[0] / i[0], t[1] = s[1] / i[1], t[2] = s[2] / i[2]) : ae(this, this, 1 / e), this
    }
    inverse(e = this) {
        var t, s;
        return s = e, (t = this)[0] = 1 / s[0], t[1] = 1 / s[1], t[2] = 1 / s[2], this
    }
    len() {
        return se(this)
    }
    distance(e) {
        return e ? function(e, t) {
            let s = t[0] - e[0],
                i = t[1] - e[1],
                r = t[2] - e[2];
            return Math.sqrt(s * s + i * i + r * r)
        }(this, e) : se(this)
    }
    squaredLen() {
        return oe(this)
    }
    squaredDistance(e) {
        return e ? function(e, t) {
            let s = t[0] - e[0],
                i = t[1] - e[1],
                r = t[2] - e[2];
            return s * s + i * i + r * r
        }(this, e) : oe(this)
    }
    negate(e = this) {
        var t, s;
        return s = e, (t = this)[0] = -s[0], t[1] = -s[1], t[2] = -s[2], this
    }
    cross(e, t) {
        return t ? he(this, e, t) : he(this, this, e), this
    }
    scale(e) {
        return ae(this, this, e), this
    }
    normalize() {
        return le(this, this), this
    }
    dot(e) {
        return de(this, e)
    }
    equals(e) {
        return s = e, (t = this)[0] === s[0] && t[1] === s[1] && t[2] === s[2];
        var t, s
    }
    applyMatrix3(e) {
        return function(e, t, s) {
            let i = t[0],
                r = t[1],
                n = t[2];
            e[0] = i * s[0] + r * s[3] + n * s[6], e[1] = i * s[1] + r * s[4] + n * s[7], e[2] = i * s[2] + r * s[5] + n * s[8]
        }(this, this, e), this
    }
    applyMatrix4(e) {
        return function(e, t, s) {
            let i = t[0],
                r = t[1],
                n = t[2],
                a = s[3] * i + s[7] * r + s[11] * n + s[15];
            a = a || 1, e[0] = (s[0] * i + s[4] * r + s[8] * n + s[12]) / a, e[1] = (s[1] * i + s[5] * r + s[9] * n + s[13]) / a, e[2] = (s[2] * i + s[6] * r + s[10] * n + s[14]) / a
        }(this, this, e), this
    }
    scaleRotateMatrix4(e) {
        return function(e, t, s) {
            let i = t[0],
                r = t[1],
                n = t[2],
                a = s[3] * i + s[7] * r + s[11] * n + s[15];
            a = a || 1, e[0] = (s[0] * i + s[4] * r + s[8] * n) / a, e[1] = (s[1] * i + s[5] * r + s[9] * n) / a, e[2] = (s[2] * i + s[6] * r + s[10] * n) / a
        }(this, this, e), this
    }
    applyQuaternion(e) {
        return function(e, t, s) {
            let i = t[0],
                r = t[1],
                n = t[2],
                a = s[0],
                o = s[1],
                l = s[2],
                d = o * n - l * r,
                h = l * i - a * n,
                c = a * r - o * i,
                u = o * c - l * h,
                p = l * d - a * c,
                m = a * h - o * d,
                f = 2 * s[3];
            d *= f, h *= f, c *= f, u *= 2, p *= 2, m *= 2, e[0] = i + d + u, e[1] = r + h + p, e[2] = n + c + m
        }(this, this, e), this
    }
    angle(e) {
        return ce(this, e)
    }
    lerp(e, t) {
        return function(e, t, s, i) {
            let r = t[0],
                n = t[1],
                a = t[2];
            e[0] = r + i * (s[0] - r), e[1] = n + i * (s[1] - n), e[2] = a + i * (s[2] - a)
        }(this, this, e, t), this
    }
    clone() {
        return new ue(this[0], this[1], this[2])
    }
    fromArray(e, t = 0) {
        return this[0] = e[t], this[1] = e[t + 1], this[2] = e[t + 2], this
    }
    toArray(e = [], t = 0) {
        return e[t] = this[0], e[t + 1] = this[1], e[t + 2] = this[2], e
    }
    transformDirection(e) {
        const t = this[0],
            s = this[1],
            i = this[2];
        return this[0] = e[0] * t + e[4] * s + e[8] * i, this[1] = e[1] * t + e[5] * s + e[9] * i, this[2] = e[2] * t + e[6] * s + e[10] * i, this.normalize()
    }
}
const pe = new ue;
let me = 1,
    fe = 1,
    ge = !1;
class ve {
    constructor(e, t = {}) {
        e.canvas || console.error("gl not passed as first argument to Geometry"), this.gl = e, this.attributes = t, this.id = me++, this.VAOs = {}, this.drawRange = {
            start: 0,
            count: 0
        }, this.instancedCount = 0, this.gl.renderer.bindVertexArray(null), this.gl.renderer.currentGeometry = null, this.glState = this.gl.renderer.state;
        for (let s in t) this.addAttribute(s, t[s])
    }
    addAttribute(e, t) {
        if (this.attributes[e] = t, t.id = fe++, t.size = t.size || 1, t.type = t.type || (t.data.constructor === Float32Array ? this.gl.FLOAT : t.data.constructor === Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT), t.target = "index" === e ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER, t.normalized = t.normalized || !1, t.stride = t.stride || 0, t.offset = t.offset || 0, t.count = t.count || (t.stride ? t.data.byteLength / t.stride : t.data.length / t.size), t.divisor = t.instanced || 0, t.needsUpdate = !1, t.usage = t.usage || this.gl.STATIC_DRAW, t.buffer || this.updateAttribute(t), t.divisor) {
            if (this.isInstanced = !0, this.instancedCount && this.instancedCount !== t.count * t.divisor) return console.warn("geometry has multiple instanced buffers of different length"), this.instancedCount = Math.min(this.instancedCount, t.count * t.divisor);
            this.instancedCount = t.count * t.divisor
        } else "index" === e ? this.drawRange.count = t.count : this.attributes.index || (this.drawRange.count = Math.max(this.drawRange.count, t.count))
    }
    updateAttribute(e) {
        const t = !e.buffer;
        t && (e.buffer = this.gl.createBuffer()), this.glState.boundBuffer !== e.buffer && (this.gl.bindBuffer(e.target, e.buffer), this.glState.boundBuffer = e.buffer), t ? this.gl.bufferData(e.target, e.data, e.usage) : this.gl.bufferSubData(e.target, 0, e.data), e.needsUpdate = !1
    }
    setIndex(e) {
        this.addAttribute("index", e)
    }
    setDrawRange(e, t) {
        this.drawRange.start = e, this.drawRange.count = t
    }
    setInstancedCount(e) {
        this.instancedCount = e
    }
    createVAO(e) {
        this.VAOs[e.attributeOrder] = this.gl.renderer.createVertexArray(), this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]), this.bindAttributes(e)
    }
    bindAttributes(e) {
        e.attributeLocations.forEach(((e, {
            name: t,
            type: s
        }) => {
            if (!this.attributes[t]) return void console.warn(`active attribute ${t} not being supplied`);
            const i = this.attributes[t];
            this.gl.bindBuffer(i.target, i.buffer), this.glState.boundBuffer = i.buffer;
            let r = 1;
            35674 === s && (r = 2), 35675 === s && (r = 3), 35676 === s && (r = 4);
            const n = i.size / r,
                a = 1 === r ? 0 : r * r * r,
                o = 1 === r ? 0 : r * r;
            for (let l = 0; l < r; l++) this.gl.vertexAttribPointer(e + l, n, i.type, i.normalized, i.stride + a, i.offset + l * o), this.gl.enableVertexAttribArray(e + l), this.gl.renderer.vertexAttribDivisor(e + l, i.divisor)
        })), this.attributes.index && this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer)
    }
    draw({
        program: e,
        mode: t = this.gl.TRIANGLES
    }) {
        this.gl.renderer.currentGeometry !== `${this.id}_${e.attributeOrder}` && (this.VAOs[e.attributeOrder] || this.createVAO(e), this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]), this.gl.renderer.currentGeometry = `${this.id}_${e.attributeOrder}`), e.attributeLocations.forEach(((e, {
            name: t
        }) => {
            const s = this.attributes[t];
            s.needsUpdate && this.updateAttribute(s)
        })), this.isInstanced ? this.attributes.index ? this.gl.renderer.drawElementsInstanced(t, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + 2 * this.drawRange.start, this.instancedCount) : this.gl.renderer.drawArraysInstanced(t, this.drawRange.start, this.drawRange.count, this.instancedCount) : this.attributes.index ? this.gl.drawElements(t, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + 2 * this.drawRange.start) : this.gl.drawArrays(t, this.drawRange.start, this.drawRange.count)
    }
    getPosition() {
        const e = this.attributes.position;
        return e.data ? e : ge ? void 0 : (console.warn("No position buffer data found to compute bounds"), ge = !0)
    }
    computeBoundingBox(e) {
        e || (e = this.getPosition());
        const t = e.data,
            s = e.stride ? e.stride / t.BYTES_PER_ELEMENT : e.size;
        this.bounds || (this.bounds = {
            min: new ue,
            max: new ue,
            center: new ue,
            scale: new ue,
            radius: 1 / 0
        });
        const i = this.bounds.min,
            r = this.bounds.max,
            n = this.bounds.center,
            a = this.bounds.scale;
        i.set(1 / 0), r.set(-1 / 0);
        for (let o = 0, l = t.length; o < l; o += s) {
            const e = t[o],
                s = t[o + 1],
                n = t[o + 2];
            i.x = Math.min(e, i.x), i.y = Math.min(s, i.y), i.z = Math.min(n, i.z), r.x = Math.max(e, r.x), r.y = Math.max(s, r.y), r.z = Math.max(n, r.z)
        }
        a.sub(r, i), n.add(i, r).divide(2)
    }
    computeBoundingSphere(e) {
        e || (e = this.getPosition());
        const t = e.data,
            s = e.stride ? e.stride / t.BYTES_PER_ELEMENT : e.size;
        this.bounds || this.computeBoundingBox(e);
        let i = 0;
        for (let r = 0, n = t.length; r < n; r += s) pe.fromArray(t, r), i = Math.max(i, this.bounds.center.squaredDistance(pe));
        this.bounds.radius = Math.sqrt(i)
    }
    remove() {
        for (let e in this.VAOs) this.gl.renderer.deleteVertexArray(this.VAOs[e]), delete this.VAOs[e];
        for (let e in this.attributes) this.gl.deleteBuffer(this.attributes[e].buffer), delete this.attributes[e]
    }
}
let we = 1;
const xe = {};
class be {
    constructor(e, {
        vertex: t,
        fragment: s,
        uniforms: i = {},
        transparent: r = !1,
        cullFace: n = e.BACK,
        frontFace: a = e.CCW,
        depthTest: o = !0,
        depthWrite: l = !0,
        depthFunc: d = e.LESS
    } = {}) {
        e.canvas || console.error("gl not passed as fist argument to Program"), this.gl = e, this.uniforms = i, this.id = we++, t || console.warn("vertex shader not supplied"), s || console.warn("fragment shader not supplied"), this.transparent = r, this.cullFace = n, this.frontFace = a, this.depthTest = o, this.depthWrite = l, this.depthFunc = d, this.blendFunc = {}, this.blendEquation = {}, this.transparent && !this.blendFunc.src && (this.gl.renderer.premultipliedAlpha ? this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA) : this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA));
        const h = e.createShader(e.VERTEX_SHADER);
        e.shaderSource(h, t), e.compileShader(h), "" !== e.getShaderInfoLog(h) && console.warn(`${e.getShaderInfoLog(h)}\nVertex Shader\n${Te(t)}`);
        const c = e.createShader(e.FRAGMENT_SHADER);
        if (e.shaderSource(c, s), e.compileShader(c), "" !== e.getShaderInfoLog(c) && console.warn(`${e.getShaderInfoLog(c)}\nFragment Shader\n${Te(s)}`), this.program = e.createProgram(), e.attachShader(this.program, h), e.attachShader(this.program, c), e.linkProgram(this.program), !e.getProgramParameter(this.program, e.LINK_STATUS)) return console.warn(e.getProgramInfoLog(this.program));
        e.deleteShader(h), e.deleteShader(c), this.uniformLocations = new Map;
        let u = e.getProgramParameter(this.program, e.ACTIVE_UNIFORMS);
        for (let f = 0; f < u; f++) {
            let t = e.getActiveUniform(this.program, f);
            this.uniformLocations.set(t, e.getUniformLocation(this.program, t.name));
            const s = t.name.match(/(\w+)/g);
            t.uniformName = s[0], 3 === s.length ? (t.isStructArray = !0, t.structIndex = Number(s[1]), t.structProperty = s[2]) : 2 === s.length && isNaN(Number(s[1])) && (t.isStruct = !0, t.structProperty = s[1])
        }
        this.attributeLocations = new Map;
        const p = [],
            m = e.getProgramParameter(this.program, e.ACTIVE_ATTRIBUTES);
        for (let f = 0; f < m; f++) {
            const t = e.getActiveAttrib(this.program, f),
                s = e.getAttribLocation(this.program, t.name); - 1 !== s && (p[s] = t.name, this.attributeLocations.set(t, s))
        }
        this.attributeOrder = p.join("")
    }
    setBlendFunc(e, t, s, i) {
        this.blendFunc.src = e, this.blendFunc.dst = t, this.blendFunc.srcAlpha = s, this.blendFunc.dstAlpha = i, e && (this.transparent = !0)
    }
    setBlendEquation(e, t) {
        this.blendEquation.modeRGB = e, this.blendEquation.modeAlpha = t
    }
    applyState() {
        this.depthTest ? this.gl.renderer.enable(this.gl.DEPTH_TEST) : this.gl.renderer.disable(this.gl.DEPTH_TEST), this.cullFace ? this.gl.renderer.enable(this.gl.CULL_FACE) : this.gl.renderer.disable(this.gl.CULL_FACE), this.blendFunc.src ? this.gl.renderer.enable(this.gl.BLEND) : this.gl.renderer.disable(this.gl.BLEND), this.cullFace && this.gl.renderer.setCullFace(this.cullFace), this.gl.renderer.setFrontFace(this.frontFace), this.gl.renderer.setDepthMask(this.depthWrite), this.gl.renderer.setDepthFunc(this.depthFunc), this.blendFunc.src && this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha), this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha)
    }
    use({
        flipFaces: e = !1
    } = {}) {
        let t = -1;
        this.gl.renderer.state.currentProgram === this.id || (this.gl.useProgram(this.program), this.gl.renderer.state.currentProgram = this.id), this.uniformLocations.forEach(((e, s) => {
            let i = s.uniformName,
                r = this.uniforms[i];
            if (s.isStruct && (r = r[s.structProperty], i += `.${s.structProperty}`), s.isStructArray && (r = r[s.structIndex][s.structProperty], i += `[${s.structIndex}].${s.structProperty}`), !r) return ye(`Active uniform ${i} has not been supplied`);
            if (r && void 0 === r.value) return ye(`${i} uniform is missing a value parameter`);
            if (r.value.texture) return t += 1, r.value.update(t), Ee(this.gl, s.type, e, t);
            if (r.value.length && r.value[0].texture) {
                const i = [];
                return r.value.forEach((e => {
                    t += 1, e.update(t), i.push(t)
                })), Ee(this.gl, s.type, e, i)
            }
            Ee(this.gl, s.type, e, r.value)
        })), this.applyState(), e && this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW)
    }
    remove() {
        this.gl.deleteProgram(this.program)
    }
}

function Ee(e, t, s, i) {
    i = i.length ? function(e) {
        const t = e.length,
            s = e[0].length;
        if (void 0 === s) return e;
        const i = t * s;
        let r = xe[i];
        r || (xe[i] = r = new Float32Array(i));
        for (let n = 0; n < t; n++) r.set(e[n], n * s);
        return r
    }(i) : i;
    const r = e.renderer.state.uniformLocations.get(s);
    if (i.length)
        if (void 0 === r || r.length !== i.length) e.renderer.state.uniformLocations.set(s, i.slice(0));
        else {
            if (function(e, t) {
                    if (e.length !== t.length) return !1;
                    for (let s = 0, i = e.length; s < i; s++)
                        if (e[s] !== t[s]) return !1;
                    return !0
                }(r, i)) return;
            r.set ? r.set(i) : function(e, t) {
                for (let s = 0, i = e.length; s < i; s++) e[s] = t[s]
            }(r, i), e.renderer.state.uniformLocations.set(s, r)
        }
    else {
        if (r === i) return;
        e.renderer.state.uniformLocations.set(s, i)
    }
    switch (t) {
        case 5126:
            return i.length ? e.uniform1fv(s, i) : e.uniform1f(s, i);
        case 35664:
            return e.uniform2fv(s, i);
        case 35665:
            return e.uniform3fv(s, i);
        case 35666:
            return e.uniform4fv(s, i);
        case 35670:
        case 5124:
        case 35678:
        case 35680:
            return i.length ? e.uniform1iv(s, i) : e.uniform1i(s, i);
        case 35671:
        case 35667:
            return e.uniform2iv(s, i);
        case 35672:
        case 35668:
            return e.uniform3iv(s, i);
        case 35673:
        case 35669:
            return e.uniform4iv(s, i);
        case 35674:
            return e.uniformMatrix2fv(s, !1, i);
        case 35675:
            return e.uniformMatrix3fv(s, !1, i);
        case 35676:
            return e.uniformMatrix4fv(s, !1, i)
    }
}

function Te(e) {
    let t = e.split("\n");
    for (let s = 0; s < t.length; s++) t[s] = s + 1 + ": " + t[s];
    return t.join("\n")
}
let Se = 0;

function ye(e) {
    Se > 100 || (console.warn(e), Se++, Se > 100 && console.warn("More than 100 program warnings - stopping logs."))
}
const Me = new ue;
let Ae = 1;
class Ce {
    constructor({
        canvas: e = document.createElement("canvas"),
        width: t = 300,
        height: s = 150,
        dpr: i = 1,
        alpha: r = !1,
        depth: n = !0,
        stencil: a = !1,
        antialias: o = !1,
        premultipliedAlpha: l = !1,
        preserveDrawingBuffer: d = !1,
        powerPreference: h = "default",
        autoClear: c = !0,
        webgl: u = 2
    } = {}) {
        const p = {
            alpha: r,
            depth: n,
            stencil: a,
            antialias: o,
            premultipliedAlpha: l,
            preserveDrawingBuffer: d,
            powerPreference: h
        };
        this.dpr = i, this.alpha = r, this.color = !0, this.depth = n, this.stencil = a, this.premultipliedAlpha = l, this.autoClear = c, this.id = Ae++, 2 === u && (this.gl = e.getContext("webgl2", p)), this.isWebgl2 = !!this.gl, this.gl || (this.gl = e.getContext("webgl", p)), this.gl || console.error("unable to create webgl context"), this.gl.renderer = this, this.setSize(t, s), this.state = {}, this.state.blendFunc = {
            src: this.gl.ONE,
            dst: this.gl.ZERO
        }, this.state.blendEquation = {
            modeRGB: this.gl.FUNC_ADD
        }, this.state.cullFace = null, this.state.frontFace = this.gl.CCW, this.state.depthMask = !0, this.state.depthFunc = this.gl.LESS, this.state.premultiplyAlpha = !1, this.state.flipY = !1, this.state.unpackAlignment = 4, this.state.framebuffer = null, this.state.viewport = {
            x: 0,
            y: 0,
            width: null,
            height: null
        }, this.state.textureUnits = [], this.state.activeTextureUnit = 0, this.state.boundBuffer = null, this.state.uniformLocations = new Map, this.state.currentProgram = null, this.extensions = {}, this.isWebgl2 ? (this.getExtension("EXT_color_buffer_float"), this.getExtension("OES_texture_float_linear")) : (this.getExtension("OES_texture_float"), this.getExtension("OES_texture_float_linear"), this.getExtension("OES_texture_half_float"), this.getExtension("OES_texture_half_float_linear"), this.getExtension("OES_element_index_uint"), this.getExtension("OES_standard_derivatives"), this.getExtension("EXT_sRGB"), this.getExtension("WEBGL_depth_texture"), this.getExtension("WEBGL_draw_buffers")), this.getExtension("WEBGL_compressed_texture_astc"), this.getExtension("EXT_texture_compression_bptc"), this.getExtension("WEBGL_compressed_texture_s3tc"), this.getExtension("WEBGL_compressed_texture_etc1"), this.getExtension("WEBGL_compressed_texture_pvrtc"), this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"), this.vertexAttribDivisor = this.getExtension("ANGLE_instanced_arrays", "vertexAttribDivisor", "vertexAttribDivisorANGLE"), this.drawArraysInstanced = this.getExtension("ANGLE_instanced_arrays", "drawArraysInstanced", "drawArraysInstancedANGLE"), this.drawElementsInstanced = this.getExtension("ANGLE_instanced_arrays", "drawElementsInstanced", "drawElementsInstancedANGLE"), this.createVertexArray = this.getExtension("OES_vertex_array_object", "createVertexArray", "createVertexArrayOES"), this.bindVertexArray = this.getExtension("OES_vertex_array_object", "bindVertexArray", "bindVertexArrayOES"), this.deleteVertexArray = this.getExtension("OES_vertex_array_object", "deleteVertexArray", "deleteVertexArrayOES"), this.drawBuffers = this.getExtension("WEBGL_draw_buffers", "drawBuffers", "drawBuffersWEBGL"), this.parameters = {}, this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS), this.parameters.maxAnisotropy = this.getExtension("EXT_texture_filter_anisotropic") ? this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
    }
    setSize(e, t) {
        this.width = e, this.height = t, this.gl.canvas.width = e * this.dpr, this.gl.canvas.height = t * this.dpr, Object.assign(this.gl.canvas.style, {
            width: e + "px",
            height: t + "px"
        })
    }
    setViewport(e, t, s = 0, i = 0) {
        this.state.viewport.width === e && this.state.viewport.height === t || (this.state.viewport.width = e, this.state.viewport.height = t, this.state.viewport.x = s, this.state.viewport.y = i, this.gl.viewport(s, i, e, t))
    }
    setScissor(e, t, s = 0, i = 0) {
        this.gl.scissor(s, i, e, t)
    }
    enable(e) {
        !0 !== this.state[e] && (this.gl.enable(e), this.state[e] = !0)
    }
    disable(e) {
        !1 !== this.state[e] && (this.gl.disable(e), this.state[e] = !1)
    }
    setBlendFunc(e, t, s, i) {
        this.state.blendFunc.src === e && this.state.blendFunc.dst === t && this.state.blendFunc.srcAlpha === s && this.state.blendFunc.dstAlpha === i || (this.state.blendFunc.src = e, this.state.blendFunc.dst = t, this.state.blendFunc.srcAlpha = s, this.state.blendFunc.dstAlpha = i, void 0 !== s ? this.gl.blendFuncSeparate(e, t, s, i) : this.gl.blendFunc(e, t))
    }
    setBlendEquation(e, t) {
        e = e || this.gl.FUNC_ADD, this.state.blendEquation.modeRGB === e && this.state.blendEquation.modeAlpha === t || (this.state.blendEquation.modeRGB = e, this.state.blendEquation.modeAlpha = t, void 0 !== t ? this.gl.blendEquationSeparate(e, t) : this.gl.blendEquation(e))
    }
    setCullFace(e) {
        this.state.cullFace !== e && (this.state.cullFace = e, this.gl.cullFace(e))
    }
    setFrontFace(e) {
        this.state.frontFace !== e && (this.state.frontFace = e, this.gl.frontFace(e))
    }
    setDepthMask(e) {
        this.state.depthMask !== e && (this.state.depthMask = e, this.gl.depthMask(e))
    }
    setDepthFunc(e) {
        this.state.depthFunc !== e && (this.state.depthFunc = e, this.gl.depthFunc(e))
    }
    activeTexture(e) {
        this.state.activeTextureUnit !== e && (this.state.activeTextureUnit = e, this.gl.activeTexture(this.gl.TEXTURE0 + e))
    }
    bindFramebuffer({
        target: e = this.gl.FRAMEBUFFER,
        buffer: t = null
    } = {}) {
        this.state.framebuffer !== t && (this.state.framebuffer = t, this.gl.bindFramebuffer(e, t))
    }
    getExtension(e, t, s) {
        return t && this.gl[t] ? this.gl[t].bind(this.gl) : (this.extensions[e] || (this.extensions[e] = this.gl.getExtension(e)), t ? this.extensions[e] ? this.extensions[e][s].bind(this.extensions[e]) : null : this.extensions[e])
    }
    sortOpaque(e, t) {
        return e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.program.id !== t.program.id ? e.program.id - t.program.id : e.zDepth !== t.zDepth ? e.zDepth - t.zDepth : t.id - e.id
    }
    sortTransparent(e, t) {
        return e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.zDepth !== t.zDepth ? t.zDepth - e.zDepth : t.id - e.id
    }
    sortUI(e, t) {
        return e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.program.id !== t.program.id ? e.program.id - t.program.id : t.id - e.id
    }
    getRenderList({
        scene: e,
        camera: t,
        frustumCull: s,
        sort: i
    }) {
        let r = [];
        if (t && s && t.updateFrustum(), e.traverse((e => {
                if (!e.visible) return !0;
                e.draw && (s && e.frustumCulled && t && !t.frustumIntersectsMesh(e) || r.push(e))
            })), i) {
            const e = [],
                s = [],
                i = [];
            r.forEach((r => {
                r.program.transparent ? r.program.depthTest ? s.push(r) : i.push(r) : e.push(r), r.zDepth = 0, 0 === r.renderOrder && r.program.depthTest && t && (r.worldMatrix.getTranslation(Me), Me.applyMatrix4(t.projectionViewMatrix), r.zDepth = Me.z)
            })), e.sort(this.sortOpaque), s.sort(this.sortTransparent), i.sort(this.sortUI), r = e.concat(s, i)
        }
        return r
    }
    render({
        scene: e,
        camera: t,
        target: s = null,
        update: i = !0,
        sort: r = !0,
        frustumCull: n = !0,
        clear: a
    }) {
        null === s ? (this.bindFramebuffer(), this.setViewport(this.width * this.dpr, this.height * this.dpr)) : (this.bindFramebuffer(s), this.setViewport(s.width, s.height)), (a || this.autoClear && !1 !== a) && (!this.depth || s && !s.depth || (this.enable(this.gl.DEPTH_TEST), this.setDepthMask(!0)), this.gl.clear((this.color ? this.gl.COLOR_BUFFER_BIT : 0) | (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) | (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0))), i && e.updateMatrixWorld(), t && t.updateMatrixWorld();
        this.getRenderList({
            scene: e,
            camera: t,
            frustumCull: n,
            sort: r
        }).forEach((e => {
            e.draw({
                camera: t
            })
        }))
    }
}

function Pe(e, t) {
    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
}

function _e(e, t, s, i, r) {
    return e[0] = t, e[1] = s, e[2] = i, e[3] = r, e
}

function Ie(e, t) {
    let s = t[0],
        i = t[1],
        r = t[2],
        n = t[3],
        a = s * s + i * i + r * r + n * n;
    return a > 0 && (a = 1 / Math.sqrt(a)), e[0] = s * a, e[1] = i * a, e[2] = r * a, e[3] = n * a, e
}

function Le(e, t) {
    return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3]
}

function Oe(e, t, s) {
    let i = t[0],
        r = t[1],
        n = t[2],
        a = t[3],
        o = s[0],
        l = s[1],
        d = s[2],
        h = s[3];
    return e[0] = i * h + a * o + r * d - n * l, e[1] = r * h + a * l + n * o - i * d, e[2] = n * h + a * d + i * l - r * o, e[3] = a * h - i * o - r * l - n * d, e
}
const Fe = Pe,
    ke = _e,
    ze = Le,
    De = Ie;
class Re extends Array {
    constructor(e = 0, t = 0, s = 0, i = 1) {
        return super(e, t, s, i), this.onChange = () => {}, this
    }
    get x() {
        return this[0]
    }
    get y() {
        return this[1]
    }
    get z() {
        return this[2]
    }
    get w() {
        return this[3]
    }
    set x(e) {
        this[0] = e, this.onChange()
    }
    set y(e) {
        this[1] = e, this.onChange()
    }
    set z(e) {
        this[2] = e, this.onChange()
    }
    set w(e) {
        this[3] = e, this.onChange()
    }
    identity() {
        var e;
        return (e = this)[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, this.onChange(), this
    }
    set(e, t, s, i) {
        return e.length ? this.copy(e) : (ke(this, e, t, s, i), this.onChange(), this)
    }
    rotateX(e) {
        return function(e, t, s) {
            s *= .5;
            let i = t[0],
                r = t[1],
                n = t[2],
                a = t[3],
                o = Math.sin(s),
                l = Math.cos(s);
            e[0] = i * l + a * o, e[1] = r * l + n * o, e[2] = n * l - r * o, e[3] = a * l - i * o
        }(this, this, e), this.onChange(), this
    }
    rotateY(e) {
        return function(e, t, s) {
            s *= .5;
            let i = t[0],
                r = t[1],
                n = t[2],
                a = t[3],
                o = Math.sin(s),
                l = Math.cos(s);
            e[0] = i * l - n * o, e[1] = r * l + a * o, e[2] = n * l + i * o, e[3] = a * l - r * o
        }(this, this, e), this.onChange(), this
    }
    rotateZ(e) {
        return function(e, t, s) {
            s *= .5;
            let i = t[0],
                r = t[1],
                n = t[2],
                a = t[3],
                o = Math.sin(s),
                l = Math.cos(s);
            e[0] = i * l + r * o, e[1] = r * l - i * o, e[2] = n * l + a * o, e[3] = a * l - n * o
        }(this, this, e), this.onChange(), this
    }
    inverse(e = this) {
        return function(e, t) {
            let s = t[0],
                i = t[1],
                r = t[2],
                n = t[3],
                a = s * s + i * i + r * r + n * n,
                o = a ? 1 / a : 0;
            e[0] = -s * o, e[1] = -i * o, e[2] = -r * o, e[3] = n * o
        }(this, e), this.onChange(), this
    }
    conjugate(e = this) {
        var t, s;
        return s = e, (t = this)[0] = -s[0], t[1] = -s[1], t[2] = -s[2], t[3] = s[3], this.onChange(), this
    }
    copy(e) {
        return Fe(this, e), this.onChange(), this
    }
    normalize(e = this) {
        return De(this, e), this.onChange(), this
    }
    multiply(e, t) {
        return t ? Oe(this, e, t) : Oe(this, this, e), this.onChange(), this
    }
    dot(e) {
        return ze(this, e)
    }
    fromMatrix3(e) {
        return function(e, t) {
            let s, i = t[0] + t[4] + t[8];
            if (i > 0) s = Math.sqrt(i + 1), e[3] = .5 * s, s = .5 / s, e[0] = (t[5] - t[7]) * s, e[1] = (t[6] - t[2]) * s, e[2] = (t[1] - t[3]) * s;
            else {
                let i = 0;
                t[4] > t[0] && (i = 1), t[8] > t[3 * i + i] && (i = 2);
                let r = (i + 1) % 3,
                    n = (i + 2) % 3;
                s = Math.sqrt(t[3 * i + i] - t[3 * r + r] - t[3 * n + n] + 1), e[i] = .5 * s, s = .5 / s, e[3] = (t[3 * r + n] - t[3 * n + r]) * s, e[r] = (t[3 * r + i] + t[3 * i + r]) * s, e[n] = (t[3 * n + i] + t[3 * i + n]) * s
            }
        }(this, e), this.onChange(), this
    }
    fromEuler(e) {
        return function(e, t, s = "YXZ") {
            let i = Math.sin(.5 * t[0]),
                r = Math.cos(.5 * t[0]),
                n = Math.sin(.5 * t[1]),
                a = Math.cos(.5 * t[1]),
                o = Math.sin(.5 * t[2]),
                l = Math.cos(.5 * t[2]);
            "XYZ" === s ? (e[0] = i * a * l + r * n * o, e[1] = r * n * l - i * a * o, e[2] = r * a * o + i * n * l, e[3] = r * a * l - i * n * o) : "YXZ" === s ? (e[0] = i * a * l + r * n * o, e[1] = r * n * l - i * a * o, e[2] = r * a * o - i * n * l, e[3] = r * a * l + i * n * o) : "ZXY" === s ? (e[0] = i * a * l - r * n * o, e[1] = r * n * l + i * a * o, e[2] = r * a * o + i * n * l, e[3] = r * a * l - i * n * o) : "ZYX" === s ? (e[0] = i * a * l - r * n * o, e[1] = r * n * l + i * a * o, e[2] = r * a * o - i * n * l, e[3] = r * a * l + i * n * o) : "YZX" === s ? (e[0] = i * a * l + r * n * o, e[1] = r * n * l + i * a * o, e[2] = r * a * o - i * n * l, e[3] = r * a * l - i * n * o) : "XZY" === s && (e[0] = i * a * l - r * n * o, e[1] = r * n * l - i * a * o, e[2] = r * a * o + i * n * l, e[3] = r * a * l + i * n * o)
        }(this, e, e.order), this
    }
    fromAxisAngle(e, t) {
        return function(e, t, s) {
            s *= .5;
            let i = Math.sin(s);
            e[0] = i * t[0], e[1] = i * t[1], e[2] = i * t[2], e[3] = Math.cos(s)
        }(this, e, t), this
    }
    slerp(e, t) {
        return function(e, t, s, i) {
            let r, n, a, o, l, d = t[0],
                h = t[1],
                c = t[2],
                u = t[3],
                p = s[0],
                m = s[1],
                f = s[2],
                g = s[3];
            n = d * p + h * m + c * f + u * g, n < 0 && (n = -n, p = -p, m = -m, f = -f, g = -g), 1 - n > 1e-6 ? (r = Math.acos(n), a = Math.sin(r), o = Math.sin((1 - i) * r) / a, l = Math.sin(i * r) / a) : (o = 1 - i, l = i), e[0] = o * d + l * p, e[1] = o * h + l * m, e[2] = o * c + l * f, e[3] = o * u + l * g
        }(this, this, e, t), this
    }
    fromArray(e, t = 0) {
        return this[0] = e[t], this[1] = e[t + 1], this[2] = e[t + 2], this[3] = e[t + 3], this
    }
    toArray(e = [], t = 0) {
        return e[t] = this[0], e[t + 1] = this[1], e[t + 2] = this[2], e[t + 3] = this[3], e
    }
}

function Ge(e, t, s) {
    let i = t[0],
        r = t[1],
        n = t[2],
        a = t[3],
        o = t[4],
        l = t[5],
        d = t[6],
        h = t[7],
        c = t[8],
        u = t[9],
        p = t[10],
        m = t[11],
        f = t[12],
        g = t[13],
        v = t[14],
        w = t[15],
        x = s[0],
        b = s[1],
        E = s[2],
        T = s[3];
    return e[0] = x * i + b * o + E * c + T * f, e[1] = x * r + b * l + E * u + T * g, e[2] = x * n + b * d + E * p + T * v, e[3] = x * a + b * h + E * m + T * w, x = s[4], b = s[5], E = s[6], T = s[7], e[4] = x * i + b * o + E * c + T * f, e[5] = x * r + b * l + E * u + T * g, e[6] = x * n + b * d + E * p + T * v, e[7] = x * a + b * h + E * m + T * w, x = s[8], b = s[9], E = s[10], T = s[11], e[8] = x * i + b * o + E * c + T * f, e[9] = x * r + b * l + E * u + T * g, e[10] = x * n + b * d + E * p + T * v, e[11] = x * a + b * h + E * m + T * w, x = s[12], b = s[13], E = s[14], T = s[15], e[12] = x * i + b * o + E * c + T * f, e[13] = x * r + b * l + E * u + T * g, e[14] = x * n + b * d + E * p + T * v, e[15] = x * a + b * h + E * m + T * w, e
}

function Be(e, t) {
    let s = t[0],
        i = t[1],
        r = t[2],
        n = t[4],
        a = t[5],
        o = t[6],
        l = t[8],
        d = t[9],
        h = t[10];
    return e[0] = Math.hypot(s, i, r), e[1] = Math.hypot(n, a, o), e[2] = Math.hypot(l, d, h), e
}
const Ne = function() {
    const e = [0, 0, 0];
    return function(t, s) {
        let i = e;
        Be(i, s);
        let r = 1 / i[0],
            n = 1 / i[1],
            a = 1 / i[2],
            o = s[0] * r,
            l = s[1] * n,
            d = s[2] * a,
            h = s[4] * r,
            c = s[5] * n,
            u = s[6] * a,
            p = s[8] * r,
            m = s[9] * n,
            f = s[10] * a,
            g = o + c + f,
            v = 0;
        return g > 0 ? (v = 2 * Math.sqrt(g + 1), t[3] = .25 * v, t[0] = (u - m) / v, t[1] = (p - d) / v, t[2] = (l - h) / v) : o > c && o > f ? (v = 2 * Math.sqrt(1 + o - c - f), t[3] = (u - m) / v, t[0] = .25 * v, t[1] = (l + h) / v, t[2] = (p + d) / v) : c > f ? (v = 2 * Math.sqrt(1 + c - o - f), t[3] = (p - d) / v, t[0] = (l + h) / v, t[1] = .25 * v, t[2] = (u + m) / v) : (v = 2 * Math.sqrt(1 + f - o - c), t[3] = (l - h) / v, t[0] = (p + d) / v, t[1] = (u + m) / v, t[2] = .25 * v), t
    }
}();
class Ve extends Array {
    constructor(e = 1, t = 0, s = 0, i = 0, r = 0, n = 1, a = 0, o = 0, l = 0, d = 0, h = 1, c = 0, u = 0, p = 0, m = 0, f = 1) {
        return super(e, t, s, i, r, n, a, o, l, d, h, c, u, p, m, f), this
    }
    get x() {
        return this[12]
    }
    get y() {
        return this[13]
    }
    get z() {
        return this[14]
    }
    get w() {
        return this[15]
    }
    set x(e) {
        this[12] = e
    }
    set y(e) {
        this[13] = e
    }
    set z(e) {
        this[14] = e
    }
    set w(e) {
        this[15] = e
    }
    set(e, t, s, i, r, n, a, o, l, d, h, c, u, p, m, f) {
        return e.length ? this.copy(e) : (function(e, t, s, i, r, n, a, o, l, d, h, c, u, p, m, f, g) {
            e[0] = t, e[1] = s, e[2] = i, e[3] = r, e[4] = n, e[5] = a, e[6] = o, e[7] = l, e[8] = d, e[9] = h, e[10] = c, e[11] = u, e[12] = p, e[13] = m, e[14] = f, e[15] = g
        }(this, e, t, s, i, r, n, a, o, l, d, h, c, u, p, m, f), this)
    }
    translate(e, t = this) {
        return function(e, t, s) {
            let i, r, n, a, o, l, d, h, c, u, p, m, f = s[0],
                g = s[1],
                v = s[2];
            t === e ? (e[12] = t[0] * f + t[4] * g + t[8] * v + t[12], e[13] = t[1] * f + t[5] * g + t[9] * v + t[13], e[14] = t[2] * f + t[6] * g + t[10] * v + t[14], e[15] = t[3] * f + t[7] * g + t[11] * v + t[15]) : (i = t[0], r = t[1], n = t[2], a = t[3], o = t[4], l = t[5], d = t[6], h = t[7], c = t[8], u = t[9], p = t[10], m = t[11], e[0] = i, e[1] = r, e[2] = n, e[3] = a, e[4] = o, e[5] = l, e[6] = d, e[7] = h, e[8] = c, e[9] = u, e[10] = p, e[11] = m, e[12] = i * f + o * g + c * v + t[12], e[13] = r * f + l * g + u * v + t[13], e[14] = n * f + d * g + p * v + t[14], e[15] = a * f + h * g + m * v + t[15])
        }(this, t, e), this
    }
    rotate(e, t, s = this) {
        return function(e, t, s, i) {
            let r, n, a, o, l, d, h, c, u, p, m, f, g, v, w, x, b, E, T, S, y, M, A, C, P = i[0],
                _ = i[1],
                I = i[2],
                L = Math.hypot(P, _, I);
            Math.abs(L) < 1e-6 || (L = 1 / L, P *= L, _ *= L, I *= L, r = Math.sin(s), n = Math.cos(s), a = 1 - n, o = t[0], l = t[1], d = t[2], h = t[3], c = t[4], u = t[5], p = t[6], m = t[7], f = t[8], g = t[9], v = t[10], w = t[11], x = P * P * a + n, b = _ * P * a + I * r, E = I * P * a - _ * r, T = P * _ * a - I * r, S = _ * _ * a + n, y = I * _ * a + P * r, M = P * I * a + _ * r, A = _ * I * a - P * r, C = I * I * a + n, e[0] = o * x + c * b + f * E, e[1] = l * x + u * b + g * E, e[2] = d * x + p * b + v * E, e[3] = h * x + m * b + w * E, e[4] = o * T + c * S + f * y, e[5] = l * T + u * S + g * y, e[6] = d * T + p * S + v * y, e[7] = h * T + m * S + w * y, e[8] = o * M + c * A + f * C, e[9] = l * M + u * A + g * C, e[10] = d * M + p * A + v * C, e[11] = h * M + m * A + w * C, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]))
        }(this, s, e, t), this
    }
    scale(e, t = this) {
        return function(e, t, s) {
            let i = s[0],
                r = s[1],
                n = s[2];
            e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e[3] = t[3] * i, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * n, e[9] = t[9] * n, e[10] = t[10] * n, e[11] = t[11] * n, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]
        }(this, t, "number" == typeof e ? [e, e, e] : e), this
    }
    multiply(e, t) {
        return t ? Ge(this, e, t) : Ge(this, this, e), this
    }
    identity() {
        var e;
        return (e = this)[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
    }
    copy(e) {
        var t, s;
        return s = e, (t = this)[0] = s[0], t[1] = s[1], t[2] = s[2], t[3] = s[3], t[4] = s[4], t[5] = s[5], t[6] = s[6], t[7] = s[7], t[8] = s[8], t[9] = s[9], t[10] = s[10], t[11] = s[11], t[12] = s[12], t[13] = s[13], t[14] = s[14], t[15] = s[15], this
    }
    fromPerspective({
        fov: e,
        aspect: t,
        near: s,
        far: i
    } = {}) {
        return function(e, t, s, i, r) {
            let n = 1 / Math.tan(t / 2),
                a = 1 / (i - r);
            e[0] = n / s, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = n, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = (r + i) * a, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = 2 * r * i * a, e[15] = 0
        }(this, e, t, s, i), this
    }
    fromOrthogonal({
        left: e,
        right: t,
        bottom: s,
        top: i,
        near: r,
        far: n
    }) {
        return function(e, t, s, i, r, n, a) {
            let o = 1 / (t - s),
                l = 1 / (i - r),
                d = 1 / (n - a);
            e[0] = -2 * o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * l, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * d, e[11] = 0, e[12] = (t + s) * o, e[13] = (r + i) * l, e[14] = (a + n) * d, e[15] = 1
        }(this, e, t, s, i, r, n), this
    }
    fromQuaternion(e) {
        return function(e, t) {
            let s = t[0],
                i = t[1],
                r = t[2],
                n = t[3],
                a = s + s,
                o = i + i,
                l = r + r,
                d = s * a,
                h = i * a,
                c = i * o,
                u = r * a,
                p = r * o,
                m = r * l,
                f = n * a,
                g = n * o,
                v = n * l;
            e[0] = 1 - c - m, e[1] = h + v, e[2] = u - g, e[3] = 0, e[4] = h - v, e[5] = 1 - d - m, e[6] = p + f, e[7] = 0, e[8] = u + g, e[9] = p - f, e[10] = 1 - d - c, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1
        }(this, e), this
    }
    setPosition(e) {
        return this.x = e[0], this.y = e[1], this.z = e[2], this
    }
    inverse(e = this) {
        return function(e, t) {
            let s = t[0],
                i = t[1],
                r = t[2],
                n = t[3],
                a = t[4],
                o = t[5],
                l = t[6],
                d = t[7],
                h = t[8],
                c = t[9],
                u = t[10],
                p = t[11],
                m = t[12],
                f = t[13],
                g = t[14],
                v = t[15],
                w = s * o - i * a,
                x = s * l - r * a,
                b = s * d - n * a,
                E = i * l - r * o,
                T = i * d - n * o,
                S = r * d - n * l,
                y = h * f - c * m,
                M = h * g - u * m,
                A = h * v - p * m,
                C = c * g - u * f,
                P = c * v - p * f,
                _ = u * v - p * g,
                I = w * _ - x * P + b * C + E * A - T * M + S * y;
            I && (I = 1 / I, e[0] = (o * _ - l * P + d * C) * I, e[1] = (r * P - i * _ - n * C) * I, e[2] = (f * S - g * T + v * E) * I, e[3] = (u * T - c * S - p * E) * I, e[4] = (l * A - a * _ - d * M) * I, e[5] = (s * _ - r * A + n * M) * I, e[6] = (g * b - m * S - v * x) * I, e[7] = (h * S - u * b + p * x) * I, e[8] = (a * P - o * A + d * y) * I, e[9] = (i * A - s * P - n * y) * I, e[10] = (m * T - f * b + v * w) * I, e[11] = (c * b - h * T - p * w) * I, e[12] = (o * M - a * C - l * y) * I, e[13] = (s * C - i * M + r * y) * I, e[14] = (f * x - m * E - g * w) * I, e[15] = (h * E - c * x + u * w) * I)
        }(this, e), this
    }
    compose(e, t, s) {
        return function(e, t, s, i) {
            let r = t[0],
                n = t[1],
                a = t[2],
                o = t[3],
                l = r + r,
                d = n + n,
                h = a + a,
                c = r * l,
                u = r * d,
                p = r * h,
                m = n * d,
                f = n * h,
                g = a * h,
                v = o * l,
                w = o * d,
                x = o * h,
                b = i[0],
                E = i[1],
                T = i[2];
            e[0] = (1 - (m + g)) * b, e[1] = (u + x) * b, e[2] = (p - w) * b, e[3] = 0, e[4] = (u - x) * E, e[5] = (1 - (c + g)) * E, e[6] = (f + v) * E, e[7] = 0, e[8] = (p + w) * T, e[9] = (f - v) * T, e[10] = (1 - (c + m)) * T, e[11] = 0, e[12] = s[0], e[13] = s[1], e[14] = s[2], e[15] = 1
        }(this, e, t, s), this
    }
    getRotation(e) {
        return Ne(e, this), this
    }
    getTranslation(e) {
        var t, s;
        return s = this, (t = e)[0] = s[12], t[1] = s[13], t[2] = s[14], this
    }
    getScaling(e) {
        return Be(e, this), this
    }
    getMaxScaleOnAxis() {
        return function(e) {
            let t = e[0],
                s = e[1],
                i = e[2],
                r = e[4],
                n = e[5],
                a = e[6],
                o = e[8],
                l = e[9],
                d = e[10];
            const h = t * t + s * s + i * i,
                c = r * r + n * n + a * a,
                u = o * o + l * l + d * d;
            return Math.sqrt(Math.max(h, c, u))
        }(this)
    }
    lookAt(e, t, s) {
        return function(e, t, s, i) {
            let r = t[0],
                n = t[1],
                a = t[2],
                o = i[0],
                l = i[1],
                d = i[2],
                h = r - s[0],
                c = n - s[1],
                u = a - s[2],
                p = h * h + c * c + u * u;
            0 === p ? u = 1 : (p = 1 / Math.sqrt(p), h *= p, c *= p, u *= p);
            let m = l * u - d * c,
                f = d * h - o * u,
                g = o * c - l * h;
            p = m * m + f * f + g * g, 0 === p && (d ? o += 1e-6 : l ? d += 1e-6 : l += 1e-6, m = l * u - d * c, f = d * h - o * u, g = o * c - l * h, p = m * m + f * f + g * g), p = 1 / Math.sqrt(p), m *= p, f *= p, g *= p, e[0] = m, e[1] = f, e[2] = g, e[3] = 0, e[4] = c * g - u * f, e[5] = u * m - h * g, e[6] = h * f - c * m, e[7] = 0, e[8] = h, e[9] = c, e[10] = u, e[11] = 0, e[12] = r, e[13] = n, e[14] = a, e[15] = 1
        }(this, e, t, s), this
    }
    determinant() {
        return function(e) {
            let t = e[0],
                s = e[1],
                i = e[2],
                r = e[3],
                n = e[4],
                a = e[5],
                o = e[6],
                l = e[7],
                d = e[8],
                h = e[9],
                c = e[10],
                u = e[11],
                p = e[12],
                m = e[13],
                f = e[14],
                g = e[15];
            return (t * a - s * n) * (c * g - u * f) - (t * o - i * n) * (h * g - u * m) + (t * l - r * n) * (h * f - c * m) + (s * o - i * a) * (d * g - u * p) - (s * l - r * a) * (d * f - c * p) + (i * l - r * o) * (d * m - h * p)
        }(this)
    }
    fromArray(e, t = 0) {
        return this[0] = e[t], this[1] = e[t + 1], this[2] = e[t + 2], this[3] = e[t + 3], this[4] = e[t + 4], this[5] = e[t + 5], this[6] = e[t + 6], this[7] = e[t + 7], this[8] = e[t + 8], this[9] = e[t + 9], this[10] = e[t + 10], this[11] = e[t + 11], this[12] = e[t + 12], this[13] = e[t + 13], this[14] = e[t + 14], this[15] = e[t + 15], this
    }
    toArray(e = [], t = 0) {
        return e[t] = this[0], e[t + 1] = this[1], e[t + 2] = this[2], e[t + 3] = this[3], e[t + 4] = this[4], e[t + 5] = this[5], e[t + 6] = this[6], e[t + 7] = this[7], e[t + 8] = this[8], e[t + 9] = this[9], e[t + 10] = this[10], e[t + 11] = this[11], e[t + 12] = this[12], e[t + 13] = this[13], e[t + 14] = this[14], e[t + 15] = this[15], e
    }
}
const je = new Ve;
class Ue extends Array {
    constructor(e = 0, t = e, s = e, i = "YXZ") {
        return super(e, t, s), this.order = i, this.onChange = () => {}, this
    }
    get x() {
        return this[0]
    }
    get y() {
        return this[1]
    }
    get z() {
        return this[2]
    }
    set x(e) {
        this[0] = e, this.onChange()
    }
    set y(e) {
        this[1] = e, this.onChange()
    }
    set z(e) {
        this[2] = e, this.onChange()
    }
    set(e, t = e, s = e) {
        return e.length ? this.copy(e) : (this[0] = e, this[1] = t, this[2] = s, this.onChange(), this)
    }
    copy(e) {
        return this[0] = e[0], this[1] = e[1], this[2] = e[2], this.onChange(), this
    }
    reorder(e) {
        return this.order = e, this.onChange(), this
    }
    fromRotationMatrix(e, t = this.order) {
        return function(e, t, s = "YXZ") {
            "XYZ" === s ? (e[1] = Math.asin(Math.min(Math.max(t[8], -1), 1)), Math.abs(t[8]) < .99999 ? (e[0] = Math.atan2(-t[9], t[10]), e[2] = Math.atan2(-t[4], t[0])) : (e[0] = Math.atan2(t[6], t[5]), e[2] = 0)) : "YXZ" === s ? (e[0] = Math.asin(-Math.min(Math.max(t[9], -1), 1)), Math.abs(t[9]) < .99999 ? (e[1] = Math.atan2(t[8], t[10]), e[2] = Math.atan2(t[1], t[5])) : (e[1] = Math.atan2(-t[2], t[0]), e[2] = 0)) : "ZXY" === s ? (e[0] = Math.asin(Math.min(Math.max(t[6], -1), 1)), Math.abs(t[6]) < .99999 ? (e[1] = Math.atan2(-t[2], t[10]), e[2] = Math.atan2(-t[4], t[5])) : (e[1] = 0, e[2] = Math.atan2(t[1], t[0]))) : "ZYX" === s ? (e[1] = Math.asin(-Math.min(Math.max(t[2], -1), 1)), Math.abs(t[2]) < .99999 ? (e[0] = Math.atan2(t[6], t[10]), e[2] = Math.atan2(t[1], t[0])) : (e[0] = 0, e[2] = Math.atan2(-t[4], t[5]))) : "YZX" === s ? (e[2] = Math.asin(Math.min(Math.max(t[1], -1), 1)), Math.abs(t[1]) < .99999 ? (e[0] = Math.atan2(-t[9], t[5]), e[1] = Math.atan2(-t[2], t[0])) : (e[0] = 0, e[1] = Math.atan2(t[8], t[10]))) : "XZY" === s && (e[2] = Math.asin(-Math.min(Math.max(t[4], -1), 1)), Math.abs(t[4]) < .99999 ? (e[0] = Math.atan2(t[6], t[5]), e[1] = Math.atan2(t[8], t[0])) : (e[0] = Math.atan2(-t[9], t[10]), e[1] = 0))
        }(this, e, t), this
    }
    fromQuaternion(e, t = this.order) {
        return je.fromQuaternion(e), this.fromRotationMatrix(je, t)
    }
    toArray(e = [], t = 0) {
        return e[t] = this[0], e[t + 1] = this[1], e[t + 2] = this[2], e
    }
}
class qe {
    constructor() {
        this.parent = null, this.children = [], this.visible = !0, this.matrix = new Ve, this.worldMatrix = new Ve, this.matrixAutoUpdate = !0, this.position = new ue, this.quaternion = new Re, this.scale = new ue(1), this.rotation = new Ue, this.up = new ue(0, 1, 0), this.rotation.onChange = () => this.quaternion.fromEuler(this.rotation), this.quaternion.onChange = () => this.rotation.fromQuaternion(this.quaternion)
    }
    setParent(e, t = !0) {
        this.parent && e !== this.parent && this.parent.removeChild(this, !1), this.parent = e, t && e && e.addChild(this, !1)
    }
    addChild(e, t = !0) {
        ~this.children.indexOf(e) || this.children.push(e), t && e.setParent(this, !1)
    }
    removeChild(e, t = !0) {
        ~this.children.indexOf(e) && this.children.splice(this.children.indexOf(e), 1), t && e.setParent(null, !1)
    }
    updateMatrixWorld(e) {
        this.matrixAutoUpdate && this.updateMatrix(), (this.worldMatrixNeedsUpdate || e) && (null === this.parent ? this.worldMatrix.copy(this.matrix) : this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix), this.worldMatrixNeedsUpdate = !1, e = !0);
        for (let t = 0, s = this.children.length; t < s; t++) this.children[t].updateMatrixWorld(e)
    }
    updateMatrix() {
        this.matrix.compose(this.quaternion, this.position, this.scale), this.worldMatrixNeedsUpdate = !0
    }
    traverse(e) {
        if (!e(this))
            for (let t = 0, s = this.children.length; t < s; t++) this.children[t].traverse(e)
    }
    decompose() {
        this.matrix.getTranslation(this.position), this.matrix.getRotation(this.quaternion), this.matrix.getScaling(this.scale), this.rotation.fromQuaternion(this.quaternion)
    }
    lookAt(e, t = !1) {
        t ? this.matrix.lookAt(this.position, e, this.up) : this.matrix.lookAt(e, this.position, this.up), this.matrix.getRotation(this.quaternion), this.rotation.fromQuaternion(this.quaternion)
    }
}
const Xe = new Ve,
    We = new ue,
    Ye = new ue;
class $e extends qe {
    constructor(e, {
        near: t = .1,
        far: s = 100,
        fov: i = 45,
        aspect: r = 1,
        left: n,
        right: a,
        bottom: o,
        top: l,
        zoom: d = 1
    } = {}) {
        super(), Object.assign(this, {
            near: t,
            far: s,
            fov: i,
            aspect: r,
            left: n,
            right: a,
            bottom: o,
            top: l,
            zoom: d
        }), this.projectionMatrix = new Ve, this.viewMatrix = new Ve, this.projectionViewMatrix = new Ve, this.worldPosition = new ue, this.type = n || a ? "orthographic" : "perspective", "orthographic" === this.type ? this.orthographic() : this.perspective()
    }
    perspective({
        near: e = this.near,
        far: t = this.far,
        fov: s = this.fov,
        aspect: i = this.aspect
    } = {}) {
        return Object.assign(this, {
            near: e,
            far: t,
            fov: s,
            aspect: i
        }), this.projectionMatrix.fromPerspective({
            fov: s * (Math.PI / 180),
            aspect: i,
            near: e,
            far: t
        }), this.type = "perspective", this
    }
    orthographic({
        near: e = this.near,
        far: t = this.far,
        left: s = this.left,
        right: i = this.right,
        bottom: r = this.bottom,
        top: n = this.top,
        zoom: a = this.zoom
    } = {}) {
        return Object.assign(this, {
            near: e,
            far: t,
            left: s,
            right: i,
            bottom: r,
            top: n,
            zoom: a
        }), s /= a, i /= a, r /= a, n /= a, this.projectionMatrix.fromOrthogonal({
            left: s,
            right: i,
            bottom: r,
            top: n,
            near: e,
            far: t
        }), this.type = "orthographic", this
    }
    updateMatrixWorld() {
        return super.updateMatrixWorld(), this.viewMatrix.inverse(this.worldMatrix), this.worldMatrix.getTranslation(this.worldPosition), this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix), this
    }
    lookAt(e) {
        return super.lookAt(e, !0), this
    }
    project(e) {
        return e.applyMatrix4(this.viewMatrix), e.applyMatrix4(this.projectionMatrix), this
    }
    unproject(e) {
        return e.applyMatrix4(Xe.inverse(this.projectionMatrix)), e.applyMatrix4(this.worldMatrix), this
    }
    updateFrustum() {
        this.frustum || (this.frustum = [new ue, new ue, new ue, new ue, new ue, new ue]);
        const e = this.projectionViewMatrix;
        this.frustum[0].set(e[3] - e[0], e[7] - e[4], e[11] - e[8]).constant = e[15] - e[12], this.frustum[1].set(e[3] + e[0], e[7] + e[4], e[11] + e[8]).constant = e[15] + e[12], this.frustum[2].set(e[3] + e[1], e[7] + e[5], e[11] + e[9]).constant = e[15] + e[13], this.frustum[3].set(e[3] - e[1], e[7] - e[5], e[11] - e[9]).constant = e[15] - e[13], this.frustum[4].set(e[3] - e[2], e[7] - e[6], e[11] - e[10]).constant = e[15] - e[14], this.frustum[5].set(e[3] + e[2], e[7] + e[6], e[11] + e[10]).constant = e[15] + e[14];
        for (let t = 0; t < 6; t++) {
            const e = 1 / this.frustum[t].distance();
            this.frustum[t].multiply(e), this.frustum[t].constant *= e
        }
    }
    frustumIntersectsMesh(e) {
        if (!e.geometry.attributes.position) return !0;
        if (e.geometry.bounds && e.geometry.bounds.radius !== 1 / 0 || e.geometry.computeBoundingSphere(), !e.geometry.bounds) return !0;
        const t = We;
        t.copy(e.geometry.bounds.center), t.applyMatrix4(e.worldMatrix);
        const s = e.geometry.bounds.radius * e.worldMatrix.getMaxScaleOnAxis();
        return this.frustumIntersectsSphere(t, s)
    }
    frustumIntersectsSphere(e, t) {
        const s = Ye;
        for (let i = 0; i < 6; i++) {
            const r = this.frustum[i];
            if (s.copy(r).dot(e) + r.constant < -t) return !1
        }
        return !0
    }
}

function He(e, t, s) {
    let i = t[0],
        r = t[1],
        n = t[2],
        a = t[3],
        o = t[4],
        l = t[5],
        d = t[6],
        h = t[7],
        c = t[8],
        u = s[0],
        p = s[1],
        m = s[2],
        f = s[3],
        g = s[4],
        v = s[5],
        w = s[6],
        x = s[7],
        b = s[8];
    return e[0] = u * i + p * a + m * d, e[1] = u * r + p * o + m * h, e[2] = u * n + p * l + m * c, e[3] = f * i + g * a + v * d, e[4] = f * r + g * o + v * h, e[5] = f * n + g * l + v * c, e[6] = w * i + x * a + b * d, e[7] = w * r + x * o + b * h, e[8] = w * n + x * l + b * c, e
}
class Ze extends Array {
    constructor(e = 1, t = 0, s = 0, i = 0, r = 1, n = 0, a = 0, o = 0, l = 1) {
        return super(e, t, s, i, r, n, a, o, l), this
    }
    set(e, t, s, i, r, n, a, o, l) {
        return e.length ? this.copy(e) : (function(e, t, s, i, r, n, a, o, l, d) {
            e[0] = t, e[1] = s, e[2] = i, e[3] = r, e[4] = n, e[5] = a, e[6] = o, e[7] = l, e[8] = d
        }(this, e, t, s, i, r, n, a, o, l), this)
    }
    translate(e, t = this) {
        return function(e, t, s) {
            let i = t[0],
                r = t[1],
                n = t[2],
                a = t[3],
                o = t[4],
                l = t[5],
                d = t[6],
                h = t[7],
                c = t[8],
                u = s[0],
                p = s[1];
            e[0] = i, e[1] = r, e[2] = n, e[3] = a, e[4] = o, e[5] = l, e[6] = u * i + p * a + d, e[7] = u * r + p * o + h, e[8] = u * n + p * l + c
        }(this, t, e), this
    }
    rotate(e, t = this) {
        return function(e, t, s) {
            let i = t[0],
                r = t[1],
                n = t[2],
                a = t[3],
                o = t[4],
                l = t[5],
                d = t[6],
                h = t[7],
                c = t[8],
                u = Math.sin(s),
                p = Math.cos(s);
            e[0] = p * i + u * a, e[1] = p * r + u * o, e[2] = p * n + u * l, e[3] = p * a - u * i, e[4] = p * o - u * r, e[5] = p * l - u * n, e[6] = d, e[7] = h, e[8] = c
        }(this, t, e), this
    }
    scale(e, t = this) {
        return function(e, t, s) {
            let i = s[0],
                r = s[1];
            e[0] = i * t[0], e[1] = i * t[1], e[2] = i * t[2], e[3] = r * t[3], e[4] = r * t[4], e[5] = r * t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8]
        }(this, t, e), this
    }
    multiply(e, t) {
        return t ? He(this, e, t) : He(this, this, e), this
    }
    identity() {
        var e;
        return (e = this)[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, this
    }
    copy(e) {
        var t, s;
        return s = e, (t = this)[0] = s[0], t[1] = s[1], t[2] = s[2], t[3] = s[3], t[4] = s[4], t[5] = s[5], t[6] = s[6], t[7] = s[7], t[8] = s[8], this
    }
    fromMatrix4(e) {
        var t, s;
        return s = e, (t = this)[0] = s[0], t[1] = s[1], t[2] = s[2], t[3] = s[4], t[4] = s[5], t[5] = s[6], t[6] = s[8], t[7] = s[9], t[8] = s[10], this
    }
    fromQuaternion(e) {
        return function(e, t) {
            let s = t[0],
                i = t[1],
                r = t[2],
                n = t[3],
                a = s + s,
                o = i + i,
                l = r + r,
                d = s * a,
                h = i * a,
                c = i * o,
                u = r * a,
                p = r * o,
                m = r * l,
                f = n * a,
                g = n * o,
                v = n * l;
            e[0] = 1 - c - m, e[3] = h - v, e[6] = u + g, e[1] = h + v, e[4] = 1 - d - m, e[7] = p - f, e[2] = u - g, e[5] = p + f, e[8] = 1 - d - c
        }(this, e), this
    }
    fromBasis(e, t, s) {
        return this.set(e[0], e[1], e[2], t[0], t[1], t[2], s[0], s[1], s[2]), this
    }
    inverse(e = this) {
        return function(e, t) {
            let s = t[0],
                i = t[1],
                r = t[2],
                n = t[3],
                a = t[4],
                o = t[5],
                l = t[6],
                d = t[7],
                h = t[8],
                c = h * a - o * d,
                u = -h * n + o * l,
                p = d * n - a * l,
                m = s * c + i * u + r * p;
            m && (m = 1 / m, e[0] = c * m, e[1] = (-h * i + r * d) * m, e[2] = (o * i - r * a) * m, e[3] = u * m, e[4] = (h * s - r * l) * m, e[5] = (-o * s + r * n) * m, e[6] = p * m, e[7] = (-d * s + i * l) * m, e[8] = (a * s - i * n) * m)
        }(this, e), this
    }
    getNormalMatrix(e) {
        return function(e, t) {
            let s = t[0],
                i = t[1],
                r = t[2],
                n = t[3],
                a = t[4],
                o = t[5],
                l = t[6],
                d = t[7],
                h = t[8],
                c = t[9],
                u = t[10],
                p = t[11],
                m = t[12],
                f = t[13],
                g = t[14],
                v = t[15],
                w = s * o - i * a,
                x = s * l - r * a,
                b = s * d - n * a,
                E = i * l - r * o,
                T = i * d - n * o,
                S = r * d - n * l,
                y = h * f - c * m,
                M = h * g - u * m,
                A = h * v - p * m,
                C = c * g - u * f,
                P = c * v - p * f,
                _ = u * v - p * g,
                I = w * _ - x * P + b * C + E * A - T * M + S * y;
            I && (I = 1 / I, e[0] = (o * _ - l * P + d * C) * I, e[1] = (l * A - a * _ - d * M) * I, e[2] = (a * P - o * A + d * y) * I, e[3] = (r * P - i * _ - n * C) * I, e[4] = (s * _ - r * A + n * M) * I, e[5] = (i * A - s * P - n * y) * I, e[6] = (f * S - g * T + v * E) * I, e[7] = (g * b - m * S - v * x) * I, e[8] = (m * T - f * b + v * w) * I)
        }(this, e), this
    }
}
let Ke = 0;
class Qe extends qe {
    constructor(e, {
        geometry: t,
        program: s,
        mode: i = e.TRIANGLES,
        frustumCulled: r = !0,
        renderOrder: n = 0
    } = {}) {
        super(), e.canvas || console.error("gl not passed as first argument to Mesh"), this.gl = e, this.id = Ke++, this.geometry = t, this.program = s, this.mode = i, this.frustumCulled = r, this.renderOrder = n, this.modelViewMatrix = new Ve, this.normalMatrix = new Ze, this.beforeRenderCallbacks = [], this.afterRenderCallbacks = []
    }
    onBeforeRender(e) {
        return this.beforeRenderCallbacks.push(e), this
    }
    onAfterRender(e) {
        return this.afterRenderCallbacks.push(e), this
    }
    draw({
        camera: e
    } = {}) {
        this.beforeRenderCallbacks.forEach((t => t && t({
            mesh: this,
            camera: e
        }))), e && (this.program.uniforms.modelMatrix || Object.assign(this.program.uniforms, {
            modelMatrix: {
                value: null
            },
            viewMatrix: {
                value: null
            },
            modelViewMatrix: {
                value: null
            },
            normalMatrix: {
                value: null
            },
            projectionMatrix: {
                value: null
            },
            cameraPosition: {
                value: null
            }
        }), this.program.uniforms.projectionMatrix.value = e.projectionMatrix, this.program.uniforms.cameraPosition.value = e.worldPosition, this.program.uniforms.viewMatrix.value = e.viewMatrix, this.modelViewMatrix.multiply(e.viewMatrix, this.worldMatrix), this.normalMatrix.getNormalMatrix(this.modelViewMatrix), this.program.uniforms.modelMatrix.value = this.worldMatrix, this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix, this.program.uniforms.normalMatrix.value = this.normalMatrix);
        let t = this.program.cullFace && this.worldMatrix.determinant() < 0;
        this.program.use({
            flipFaces: t
        }), this.geometry.draw({
            mode: this.mode,
            program: this.program
        }), this.afterRenderCallbacks.forEach((t => t && t({
            mesh: this,
            camera: e
        })))
    }
}
const Je = new Uint8Array(4);

function et(e) {
    return 0 == (e & e - 1)
}
let tt = 1;
class st {
    constructor(e, {
        image: t,
        target: s = e.TEXTURE_2D,
        type: i = e.UNSIGNED_BYTE,
        format: r = e.RGBA,
        internalFormat: n = r,
        wrapS: a = e.CLAMP_TO_EDGE,
        wrapT: o = e.CLAMP_TO_EDGE,
        generateMipmaps: l = !0,
        minFilter: d = (l ? e.NEAREST_MIPMAP_LINEAR : e.LINEAR),
        magFilter: h = e.LINEAR,
        premultiplyAlpha: c = !1,
        unpackAlignment: u = 4,
        flipY: p = s == e.TEXTURE_2D,
        anisotropy: m = 0,
        level: f = 0,
        width: g,
        height: v = g
    } = {}) {
        this.gl = e, this.id = tt++, this.image = t, this.target = s, this.type = i, this.format = r, this.internalFormat = n, this.minFilter = d, this.magFilter = h, this.wrapS = a, this.wrapT = o, this.generateMipmaps = l, this.premultiplyAlpha = c, this.unpackAlignment = u, this.flipY = p, this.anisotropy = Math.min(m, this.gl.renderer.parameters.maxAnisotropy), this.level = f, this.width = g, this.height = v, this.texture = this.gl.createTexture(), this.store = {
            image: null
        }, this.glState = this.gl.renderer.state, this.state = {}, this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR, this.state.magFilter = this.gl.LINEAR, this.state.wrapS = this.gl.REPEAT, this.state.wrapT = this.gl.REPEAT, this.state.anisotropy = 0
    }
    bind() {
        this.glState.textureUnits[this.glState.activeTextureUnit] !== this.id && (this.gl.bindTexture(this.target, this.texture), this.glState.textureUnits[this.glState.activeTextureUnit] = this.id)
    }
    update(e = 0) {
        const t = !(this.image === this.store.image && !this.needsUpdate);
        if ((t || this.glState.textureUnits[e] !== this.id) && (this.gl.renderer.activeTexture(e), this.bind()), t) {
            if (this.needsUpdate = !1, this.flipY !== this.glState.flipY && (this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY), this.glState.flipY = this.flipY), this.premultiplyAlpha !== this.glState.premultiplyAlpha && (this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha), this.glState.premultiplyAlpha = this.premultiplyAlpha), this.unpackAlignment !== this.glState.unpackAlignment && (this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment), this.glState.unpackAlignment = this.unpackAlignment), this.minFilter !== this.state.minFilter && (this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter), this.state.minFilter = this.minFilter), this.magFilter !== this.state.magFilter && (this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter), this.state.magFilter = this.magFilter), this.wrapS !== this.state.wrapS && (this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS), this.state.wrapS = this.wrapS), this.wrapT !== this.state.wrapT && (this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT), this.state.wrapT = this.wrapT), this.anisotropy && this.anisotropy !== this.state.anisotropy && (this.gl.texParameterf(this.target, this.gl.renderer.getExtension("EXT_texture_filter_anisotropic").TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropy), this.state.anisotropy = this.anisotropy), this.image) {
                if (this.image.width && (this.width = this.image.width, this.height = this.image.height), this.target === this.gl.TEXTURE_CUBE_MAP)
                    for (let e = 0; e < 6; e++) this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + e, this.level, this.internalFormat, this.format, this.type, this.image[e]);
                else if (ArrayBuffer.isView(this.image)) this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image);
                else if (this.image.isCompressedTexture)
                    for (let e = 0; e < this.image.length; e++) this.gl.compressedTexImage2D(this.target, e, this.internalFormat, this.image[e].width, this.image[e].height, 0, this.image[e].data);
                else this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image);
                this.generateMipmaps && (this.gl.renderer.isWebgl2 || et(this.image.width) && et(this.image.height) ? this.gl.generateMipmap(this.target) : (this.generateMipmaps = !1, this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE, this.minFilter = this.gl.LINEAR)), this.onUpdate && this.onUpdate()
            } else if (this.target === this.gl.TEXTURE_CUBE_MAP)
                for (let e = 0; e < 6; e++) this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, Je);
            else this.width ? this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null) : this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, Je);
            this.store.image = this.image
        }
    }
}
class it extends Array {
    constructor(e = 0, t = e, s = e, i = e) {
        return super(e, t, s, i), this
    }
    get x() {
        return this[0]
    }
    get y() {
        return this[1]
    }
    get z() {
        return this[2]
    }
    get w() {
        return this[3]
    }
    set x(e) {
        this[0] = e
    }
    set y(e) {
        this[1] = e
    }
    set z(e) {
        this[2] = e
    }
    set w(e) {
        this[3] = e
    }
    set(e, t, s, i) {
        return e.length ? this.copy(e) : (_e(this, e, t, s, i), this)
    }
    copy(e) {
        return Pe(this, e), this
    }
    normalize() {
        return Ie(this, this), this
    }
    multiply(e) {
        var t, s, i;
        return s = this, i = e, (t = this)[0] = s[0] * i, t[1] = s[1] * i, t[2] = s[2] * i, t[3] = s[3] * i, this
    }
    dot(e) {
        return Le(this, e)
    }
    fromArray(e, t = 0) {
        return this[0] = e[t], this[1] = e[t + 1], this[2] = e[t + 2], this[3] = e[t + 3], this
    }
    toArray(e = [], t = 0) {
        return e[t] = this[0], e[t + 1] = this[1], e[t + 2] = this[2], e[t + 3] = this[3], e
    }
}
class rt extends ve {
    constructor(e, {
        width: t = 1,
        height: s = 1,
        widthSegments: i = 1,
        heightSegments: r = 1,
        attributes: n = {}
    } = {}) {
        const a = i,
            o = r,
            l = (a + 1) * (o + 1),
            d = a * o * 6,
            h = new Float32Array(3 * l),
            c = new Float32Array(3 * l),
            u = new Float32Array(2 * l),
            p = d > 65536 ? new Uint32Array(d) : new Uint16Array(d);
        rt.buildPlane(h, c, u, p, t, s, 0, a, o), Object.assign(n, {
            position: {
                size: 3,
                data: h
            },
            normal: {
                size: 3,
                data: c
            },
            uv: {
                size: 2,
                data: u
            },
            index: {
                data: p
            }
        }), super(e, n)
    }
    static buildPlane(e, t, s, i, r, n, a, o, l, d = 0, h = 1, c = 2, u = 1, p = -1, m = 0, f = 0) {
        const g = m,
            v = r / o,
            w = n / l;
        for (let x = 0; x <= l; x++) {
            let b = x * w - n / 2;
            for (let n = 0; n <= o; n++, m++) {
                let w = n * v - r / 2;
                if (e[3 * m + d] = w * u, e[3 * m + h] = b * p, e[3 * m + c] = a / 2, t[3 * m + d] = 0, t[3 * m + h] = 0, t[3 * m + c] = a >= 0 ? 1 : -1, s[2 * m] = n / o, s[2 * m + 1] = 1 - x / l, x === l || n === o) continue;
                let E = g + n + x * (o + 1),
                    T = g + n + (x + 1) * (o + 1),
                    S = g + n + (x + 1) * (o + 1) + 1,
                    y = g + n + x * (o + 1) + 1;
                i[6 * f] = E, i[6 * f + 1] = T, i[6 * f + 2] = y, i[6 * f + 3] = T, i[6 * f + 4] = S, i[6 * f + 5] = y, f++
            }
        }
    }
}
const nt = .5 * (Math.sqrt(3) - 1),
    at = (3 - Math.sqrt(3)) / 6,
    ot = e => 0 | Math.floor(e),
    lt = new Float64Array([1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1, 0, -1]);

function dt(e = Math.random) {
    const t = function(e) {
            const t = 512,
                s = new Uint8Array(t);
            for (let i = 0; i < t / 2; i++) s[i] = i;
            for (let i = 0; i < t / 2 - 1; i++) {
                const t = i + ~~(e() * (256 - i)),
                    r = s[i];
                s[i] = s[t], s[t] = r
            }
            for (let i = 256; i < t; i++) s[i] = s[i - 256];
            return s
        }(e),
        s = new Float64Array(t).map((e => lt[e % 12 * 2])),
        i = new Float64Array(t).map((e => lt[e % 12 * 2 + 1]));
    return function(e, r) {
        let n = 0,
            a = 0,
            o = 0;
        const l = (e + r) * nt,
            d = ot(e + l),
            h = ot(r + l),
            c = (d + h) * at,
            u = e - (d - c),
            p = r - (h - c);
        let m, f;
        u > p ? (m = 1, f = 0) : (m = 0, f = 1);
        const g = u - m + at,
            v = p - f + at,
            w = u - 1 + 2 * at,
            x = p - 1 + 2 * at,
            b = 255 & d,
            E = 255 & h;
        let T = .5 - u * u - p * p;
        if (T >= 0) {
            const e = b + t[E];
            T *= T, n = T * T * (s[e] * u + i[e] * p)
        }
        let S = .5 - g * g - v * v;
        if (S >= 0) {
            const e = b + m + t[E + f];
            S *= S, a = S * S * (s[e] * g + i[e] * v)
        }
        let y = .5 - w * w - x * x;
        if (y >= 0) {
            const e = b + 1 + t[E + 1];
            y *= y, o = y * y * (s[e] * w + i[e] * x)
        }
        return 70 * (n + a + o)
    }
}
export {
    $e as C, ve as G, Qe as M, te as N, be as P, Ce as R, ee as S, qe as T, it as V, st as a, rt as b, dt as c
};