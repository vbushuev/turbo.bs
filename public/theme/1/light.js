﻿function InitPostSimpleFormAsync(t, e) {
    function n(t, e) {
        var n = i(t, e);
        u.errorPlacement ? u.errorPlacement(t, n) : t.parent().append(n)
    }

    function i(t, e) {
        var n = t.attr("name");
        return $('<span class="field-validation-error" data-valmsg-for="' + n + '">' + e + "</span>")
    }

    function r(e) {
        var n = '<div class="form-validation-error"><span class = "field-validation-error">' + e + "</span></div>";
        if (u.formErrorPlacement) return void u.formErrorPlacement(t, n, e);
        u.errorAfterForm ? t.append(n) : t.prepend(n)
    }

    function a(t) {
        void 0 === u.clearTextInputs ? PostSimpleFormClearTextInputs(t) : u.clearTextInputs(t)
    }

    function o(t) {
        void 0 === u.removeErrors ? PostSimpleFormRemoveErrors(t) : u.removeErrors(t)
    }

    function s(t, e) {
        return PostSimpleFormShowSuccessMessage(t, e)
    }
    var l = {
            serverErrorMessage: "Сервер временно недоступен",
            notAuthtorizedMessage: "Ошибка доступа. Попробуйте обновить страницу",
            timeout: 1e4
        },
        u = $.extend({}, l, e);
    o(t),
        function(t, e) {
            PostSimpleFormShowFormChildren(t, e)
        }(t, u);
    var c = !1;
    t.unbind("submits"), t.bind("submits", function() {
        if (c) return !1;
        if (u.beforeSendCallback && u.beforeSendCallback(t), c = !0, o(t), t.find("input[type=submits], button[type=submits]").attr("disabled", "disabled"), u.validate && !u.validate(t)) return t.find("input[type=submits], button[type=submits]").removeAttr("disabled"), c = !1, !1;
        var e = u.dataProvider ? u.dataProvider() : t.serializeArray(),
            i = u.url;
        i || (i = t.attr("action"));
        return u.ajaxOnsubmitsCallback && u.ajaxOnsubmitsCallback(), $.ajax({
            type: "POST",
            url: i,
            data: e,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            timeout: u.timeout,
            success: function(e) {
                o(t);
                var l = !1;
                if (e.Errors) {
                    for (var c in e.Errors) {
                        l = !0;
                        var d = t.find('[name="' + c + '"]');
                        0 == d.length && (d = t.find("#" + c.replace(/\./gi, "_"))), d.addClass("input-validation-error");
                        var h = "";
                        $.each(e.Errors[c], function(t, e) {
                            h += " " + e
                        }), n(d.last(), h)
                    }
                    e.Errors.Form && r(e.Errors.Form[0])
                }
                if (l)(null == u.focusFirstErrorInput || u.focusFirstErrorInput) && t.find(".input-validation-error:first").focus(), u.errorsShowedCallback && u.errorsShowedCallback(t, e);
                else {
                    if (!u.preventDefaultEvents) {
                        var f = i.replace(/^(?:\/\/|[^\/]+)*\//, "");
                        $(window).trigger("pageEvent", "event-" + (t.data("event") || t.data("event-name") || f) + "-send")
                    }!1 !== u.useDefaultSuccessMessageShowing && s(u.successMessage || e.Message, t), !1 !== u.clearTextInputsOnSuccess && a(t), u.successCallback && u.successCallback(e, t)
                }
            },
            complete: function(e, n) {
                u.beforeCompleteCallback && !1 === u.beforeCompleteCallback(e, n) || (t.find("input[type=submits], button[type=submits]").removeAttr("disabled"), c = !1, u.completeCallback && u.completeCallback(e, n))
            },
            error: function(n) {
                var i = 401 === n.status;
                i && u.notAuthtorizedMessage && r(u.notAuthtorizedMessage), !i && u.serverErrorMessage && r(u.serverErrorMessage), u.errorCallback && u.errorCallback(e, t)
            }
        }), u.afterSendCallback && u.afterSendCallback(t), !1
    }), $(function() {
        var e = t.data("validators");
        if (e) {
            var i = e.settings,
                r = i.errorPlacement;
            i.errorPlacement = function(e, i) {
                var a = i.attr("name");
                $('[data-valmsg-for="' + a + '"]').remove(), n(i, e.html()), r.call(t, e, i)
            }
        }
    })
}

function PostSimpleFormShowSuccessMessage(t, e) {
    var n = PostSimpleFormGetMessageContainer(e);
    e.children().hide(), n.find("p").remove(), t && n.html(t), n.show()
}

function PostSimpleFormClearTextInputs(t) {
    t.find("input[type=text], input[type=tel], input[type=email], textarea").each(PostSimpleFormClearInput)
}

function PostSimpleFormClearInput() {
    var t = this,
        e = $(t);
    e.val(e.attr("data-default-value"))
}

function PostSimpleFormRemoveErrors(t) {
    t.find(":input").removeClass("input-validation-error"), t.find(".field-validation-error").remove(), t.find(".form-validation-error").remove(), t.find("input[type=submits], button[type=submits]").removeAttr("disabled")
}

function PostSimpleFormShowFormChildren(t, e) {
    if (t.children().show(), e = e || {}, !1 !== e.useDefaultSuccessMessageShowing) {
        PostSimpleFormGetMessageContainer(t).hide()
    }
}

function PostSimpleFormGetMessageContainer(t) {
    var e = t.find(".js-successMessage");
    if (0 == e.length) throw new Error("Ожидалось, что лайтбокс имеет класс js-successMessage");
    return e
}! function(t, e) {
    function n(t) {
        var e = pt[t] = {};
        return Z.each(t.split(et), function(t, n) {
            e[n] = !0
        }), e
    }

    function i(t, n, i) {
        if (i === e && 1 === t.nodeType) {
            var r = "data-" + n.replace(gt, "-$1").toLowerCase();
            if ("string" == typeof(i = t.getAttribute(r))) {
                try {
                    i = "true" === i || "false" !== i && ("null" === i ? null : +i + "" === i ? +i : mt.test(i) ? Z.parseJSON(i) : i)
                } catch (t) {}
                Z.data(t, n, i)
            } else i = e
        }
        return i
    }

    function r(t) {
        var e;
        for (e in t)
            if (("data" !== e || !Z.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
        return !0
    }

    function a() {
        return !1
    }

    function o() {
        return !0
    }

    function s(t) {
        return !t || !t.parentNode || 11 === t.parentNode.nodeType
    }

    function l(t, e) {
        do {
            t = t[e]
        } while (t && 1 !== t.nodeType);
        return t
    }

    function u(t, e, n) {
        if (e = e || 0, Z.isFunction(e)) return Z.grep(t, function(t, i) {
            return !!e.call(t, i, t) === n
        });
        if (e.nodeType) return Z.grep(t, function(t, i) {
            return t === e === n
        });
        if ("string" == typeof e) {
            var i = Z.grep(t, function(t) {
                return 1 === t.nodeType
            });
            if (jt.test(e)) return Z.filter(e, i, !n);
            e = Z.filter(e, i)
        }
        return Z.grep(t, function(t, i) {
            return Z.inArray(t, e) >= 0 === n
        })
    }

    function c(t) {
        var e = Rt.split("|"),
            n = t.createDocumentFragment();
        if (n.createElement)
            for (; e.length;) n.createElement(e.pop());
        return n
    }

    function d(t, e) {
        return t.getElementsByTagName(e)[0] || t.appendChild(t.ownerDocument.createElement(e))
    }

    function h(t, e) {
        if (1 === e.nodeType && Z.hasData(t)) {
            var n, i, r, a = Z._data(t),
                o = Z._data(e, a),
                s = a.events;
            if (s) {
                delete o.handle, o.events = {};
                for (n in s)
                    for (i = 0, r = s[n].length; i < r; i++) Z.event.add(e, n, s[n][i])
            }
            o.data && (o.data = Z.extend({}, o.data))
        }
    }

    function f(t, e) {
        var n;
        1 === e.nodeType && (e.clearAttributes && e.clearAttributes(), e.mergeAttributes && e.mergeAttributes(t), n = e.nodeName.toLowerCase(), "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML), Z.support.html5Clone && t.innerHTML && !Z.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && Kt.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === n ? e.selected = t.defaultSelected : "input" === n || "textarea" === n ? e.defaultValue = t.defaultValue : "script" === n && e.text !== t.text && (e.text = t.text), e.removeAttribute(Z.expando))
    }

    function p(t) {
        return void 0 !== t.getElementsByTagName ? t.getElementsByTagName("*") : void 0 !== t.querySelectorAll ? t.querySelectorAll("*") : []
    }

    function m(t) {
        Kt.test(t.type) && (t.defaultChecked = t.checked)
    }

    function g(t, e) {
        if (e in t) return e;
        for (var n = e.charAt(0).toUpperCase() + e.slice(1), i = e, r = ve.length; r--;)
            if ((e = ve[r] + n) in t) return e;
        return i
    }

    function v(t, e) {
        return t = e || t, "none" === Z.css(t, "display") || !Z.contains(t.ownerDocument, t)
    }

    function y(t, e) {
        for (var n, i, r = [], a = 0, o = t.length; a < o; a++) n = t[a], n.style && (r[a] = Z._data(n, "olddisplay"), e ? (!r[a] && "none" === n.style.display && (n.style.display = ""), "" === n.style.display && v(n) && (r[a] = Z._data(n, "olddisplay", x(n.nodeName)))) : (i = ne(n, "display"), !r[a] && "none" !== i && Z._data(n, "olddisplay", i)));
        for (a = 0; a < o; a++) n = t[a], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? r[a] || "" : "none"));
        return t
    }

    function b(t, e, n) {
        var i = ce.exec(e);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e
    }

    function k(t, e, n, i) {
        for (var r = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, a = 0; r < 4; r += 2) "margin" === n && (a += Z.css(t, n + ge[r], !0)), i ? ("content" === n && (a -= parseFloat(ne(t, "padding" + ge[r])) || 0), "margin" !== n && (a -= parseFloat(ne(t, "border" + ge[r] + "Width")) || 0)) : (a += parseFloat(ne(t, "padding" + ge[r])) || 0, "padding" !== n && (a += parseFloat(ne(t, "border" + ge[r] + "Width")) || 0));
        return a
    }

    function w(t, e, n) {
        var i = "width" === e ? t.offsetWidth : t.offsetHeight,
            r = !0,
            a = Z.support.boxSizing && "border-box" === Z.css(t, "boxSizing");
        if (i <= 0 || null == i) {
            if (i = ne(t, e), (i < 0 || null == i) && (i = t.style[e]), de.test(i)) return i;
            r = a && (Z.support.boxSizingReliable || i === t.style[e]), i = parseFloat(i) || 0
        }
        return i + k(t, e, n || (a ? "border" : "content"), r) + "px"
    }

    function x(t) {
        if (fe[t]) return fe[t];
        var e = Z("<" + t + ">").appendTo(W.body),
            n = e.css("display");
        return e.remove(), "none" !== n && "" !== n || (ie = W.body.appendChild(ie || Z.extend(W.createElement("iframe"), {
            frameBorder: 0,
            width: 0,
            height: 0
        })), re && ie.createElement || (re = (ie.contentWindow || ie.contentDocument).document, re.write("<!doctype html><html><body>"), re.close()), e = re.body.appendChild(re.createElement(t)), n = ne(e, "display"), W.body.removeChild(ie)), fe[t] = n, n
    }

    function _(t, e, n, i) {
        var r;
        if (Z.isArray(e)) Z.each(e, function(e, r) {
            n || ke.test(t) ? i(t, r) : _(t + "[" + ("object" == typeof r ? e : "") + "]", r, n, i)
        });
        else if (n || "object" !== Z.type(e)) i(t, e);
        else
            for (r in e) _(t + "[" + r + "]", e[r], n, i)
    }

    function C(t) {
        return function(e, n) {
            "string" != typeof e && (n = e, e = "*");
            var i, r, a, o = e.toLowerCase().split(et),
                s = 0,
                l = o.length;
            if (Z.isFunction(n))
                for (; s < l; s++) i = o[s], a = /^\+/.test(i), a && (i = i.substr(1) || "*"), r = t[i] = t[i] || [], r[a ? "unshift" : "push"](n)
        }
    }

    function S(t, n, i, r, a, o) {
        a = a || n.dataTypes[0], o = o || {}, o[a] = !0;
        for (var s, l = t[a], u = 0, c = l ? l.length : 0, d = t === je; u < c && (d || !s); u++) "string" == typeof(s = l[u](n, i, r)) && (!d || o[s] ? s = e : (n.dataTypes.unshift(s), s = S(t, n, i, r, s, o)));
        return (d || !s) && !o["*"] && (s = S(t, n, i, r, "*", o)), s
    }

    function D(t, n) {
        var i, r, a = Z.ajaxSettings.flatOptions || {};
        for (i in n) n[i] !== e && ((a[i] ? t : r || (r = {}))[i] = n[i]);
        r && Z.extend(!0, t, r)
    }

    function T(t, n, i) {
        var r, a, o, s, l = t.contents,
            u = t.dataTypes,
            c = t.responseFields;
        for (a in c) a in i && (n[c[a]] = i[a]);
        for (;
            "*" === u[0];) u.shift(), r === e && (r = t.mimeType || n.getResponseHeader("content-type"));
        if (r)
            for (a in l)
                if (l[a] && l[a].test(r)) {
                    u.unshift(a);
                    break
                }
        if (u[0] in i) o = u[0];
        else {
            for (a in i) {
                if (!u[0] || t.converters[a + " " + u[0]]) {
                    o = a;
                    break
                }
                s || (s = a)
            }
            o = o || s
        }
        if (o) return o !== u[0] && u.unshift(o), i[o]
    }

    function F(t, e) {
        var n, i, r, a, o = t.dataTypes.slice(),
            s = o[0],
            l = {},
            u = 0;
        if (t.dataFilter && (e = t.dataFilter(e, t.dataType)), o[1])
            for (n in t.converters) l[n.toLowerCase()] = t.converters[n];
        for (; r = o[++u];)
            if ("*" !== r) {
                if ("*" !== s && s !== r) {
                    if (!(n = l[s + " " + r] || l["* " + r]))
                        for (i in l)
                            if (a = i.split(" "), a[1] === r && (n = l[s + " " + a[0]] || l["* " + a[0]])) {
                                !0 === n ? n = l[i] : !0 !== l[i] && (r = a[0], o.splice(u--, 0, r));
                                break
                            }
                    if (!0 !== n)
                        if (n && t.throws) e = n(e);
                        else try {
                            e = n(e)
                        } catch (t) {
                            return {
                                state: "parsererror",
                                error: n ? t : "No conversion from " + s + " to " + r
                            }
                        }
                }
                s = r
            }
        return {
            state: "success",
            data: e
        }
    }

    function M() {
        try {
            return new t.XMLHttpRequest
        } catch (t) {}
    }

    function E() {
        try {
            return new t.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function P() {
        return setTimeout(function() {
            qe = e
        }, 0), qe = Z.now()
    }

    function O(t, e) {
        Z.each(e, function(e, n) {
            for (var i = (Ze[e] || []).concat(Ze["*"]), r = 0, a = i.length; r < a; r++)
                if (i[r].call(t, e, n)) return
        })
    }

    function A(t, e, n) {
        var i, r = 0,
            a = Xe.length,
            o = Z.Deferred().always(function() {
                delete s.elem
            }),
            s = function() {
                for (var e = qe || P(), n = Math.max(0, l.startTime + l.duration - e), i = n / l.duration || 0, r = 1 - i, a = 0, s = l.tweens.length; a < s; a++) l.tweens[a].run(r);
                return o.notifyWith(t, [l, r, n]), r < 1 && s ? n : (o.resolveWith(t, [l]), !1)
            },
            l = o.promise({
                elem: t,
                props: Z.extend({}, e),
                opts: Z.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: e,
                originalOptions: n,
                startTime: qe || P(),
                duration: n.duration,
                tweens: [],
                createTween: function(e, n, i) {
                    var r = Z.Tween(t, l.opts, e, n, l.opts.specialEasing[e] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function(e) {
                    for (var n = 0, i = e ? l.tweens.length : 0; n < i; n++) l.tweens[n].run(1);
                    return e ? o.resolveWith(t, [l, e]) : o.rejectWith(t, [l, e]), this
                }
            }),
            u = l.props;
        for (L(u, l.opts.specialEasing); r < a; r++)
            if (i = Xe[r].call(l, t, u, l.opts)) return i;
        return O(l, u), Z.isFunction(l.opts.start) && l.opts.start.call(t, l), Z.fx.timer(Z.extend(s, {
            anim: l,
            queue: l.opts.queue,
            elem: t
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function L(t, e) {
        var n, i, r, a, o;
        for (n in t)
            if (i = Z.camelCase(n), r = e[i], a = t[n], Z.isArray(a) && (r = a[1], a = t[n] = a[0]), n !== i && (t[i] = a, delete t[n]), o = Z.cssHooks[i], o && "expand" in o) {
                a = o.expand(a), delete t[i];
                for (n in a) n in t || (t[n] = a[n], e[n] = r)
            } else e[i] = r
    }

    function N(t, e, n) {
        var i, r, a, o, s, l, u, c, d, h = this,
            f = t.style,
            p = {},
            m = [],
            g = t.nodeType && v(t);
        n.queue || (c = Z._queueHooks(t, "fx"), null == c.unqueued && (c.unqueued = 0, d = c.empty.fire, c.empty.fire = function() {
            c.unqueued || d()
        }), c.unqueued++, h.always(function() {
            h.always(function() {
                c.unqueued--, Z.queue(t, "fx").length || c.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], "inline" === Z.css(t, "display") && "none" === Z.css(t, "float") && (Z.support.inlineBlockNeedsLayout && "inline" !== x(t.nodeName) ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", Z.support.shrinkWrapBlocks || h.done(function() {
            f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
        }));
        for (i in e)
            if (a = e[i], Ue.exec(a)) {
                if (delete e[i], l = l || "toggle" === a, a === (g ? "hide" : "show")) continue;
                m.push(i)
            }
        if (o = m.length) {
            s = Z._data(t, "fxshow") || Z._data(t, "fxshow", {}), "hidden" in s && (g = s.hidden), l && (s.hidden = !g), g ? Z(t).show() : h.done(function() {
                Z(t).hide()
            }), h.done(function() {
                var e;
                Z.removeData(t, "fxshow", !0);
                for (e in p) Z.style(t, e, p[e])
            });
            for (i = 0; i < o; i++) r = m[i], u = h.createTween(r, g ? s[r] : 0), p[r] = s[r] || Z.style(t, r), r in s || (s[r] = u.start, g && (u.end = u.start, u.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function j(t, e, n, i, r) {
        return new j.prototype.init(t, e, n, i, r)
    }

    function I(t, e) {
        var n, i = {
                height: t
            },
            r = 0;
        for (e = e ? 1 : 0; r < 4; r += 2 - e) n = ge[r], i["margin" + n] = i["padding" + n] = t;
        return e && (i.opacity = i.width = t), i
    }

    function H(t) {
        return Z.isWindow(t) ? t : 9 === t.nodeType && (t.defaultView || t.parentWindow)
    }
    var R, Y, W = t.document,
        B = t.location,
        $ = t.navigator,
        V = t.jQuery,
        G = t.$,
        q = Array.prototype.push,
        z = Array.prototype.slice,
        U = Array.prototype.indexOf,
        K = Object.prototype.toString,
        Q = Object.prototype.hasOwnProperty,
        X = String.prototype.trim,
        Z = function(t, e) {
            return new Z.fn.init(t, e, R)
        },
        J = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        tt = /\S/,
        et = /\s+/,
        nt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        it = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        rt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        at = /^[\],:{}\s]*$/,
        ot = /(?:^|:|,)(?:\s*\[)+/g,
        st = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        lt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        ut = /^-ms-/,
        ct = /-([\da-z])/gi,
        dt = function(t, e) {
            return (e + "").toUpperCase()
        },
        ht = function() {
            W.addEventListener ? (W.removeEventListener("DOMContentLoaded", ht, !1), Z.ready()) : "complete" === W.readyState && (W.detachEvent("onreadystatechange", ht), Z.ready())
        },
        ft = {};
    Z.fn = Z.prototype = {
        constructor: Z,
        init: function(t, n, i) {
            var r, a, o;
            if (!t) return this;
            if (t.nodeType) return this.context = this[0] = t, this.length = 1, this;
            if ("string" == typeof t) {
                if ((r = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : it.exec(t)) && (r[1] || !n)) {
                    if (r[1]) return n = n instanceof Z ? n[0] : n, o = n && n.nodeType ? n.ownerDocument || n : W, t = Z.parseHTML(r[1], o, !0), rt.test(r[1]) && Z.isPlainObject(n) && this.attr.call(t, n, !0), Z.merge(this, t);
                    if ((a = W.getElementById(r[2])) && a.parentNode) {
                        if (a.id !== r[2]) return i.find(t);
                        this.length = 1, this[0] = a
                    }
                    return this.context = W, this.selector = t, this
                }
                return !n || n.jquery ? (n || i).find(t) : this.constructor(n).find(t)
            }
            return Z.isFunction(t) ? i.ready(t) : (t.selector !== e && (this.selector = t.selector, this.context = t.context), Z.makeArray(t, this))
        },
        selector: "",
        jquery: "1.8.3",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return z.call(this)
        },
        get: function(t) {
            return null == t ? this.toArray() : t < 0 ? this[this.length + t] : this[t]
        },
        pushStack: function(t, e, n) {
            var i = Z.merge(this.constructor(), t);
            return i.prevObject = this, i.context = this.context, "find" === e ? i.selector = this.selector + (this.selector ? " " : "") + n : e && (i.selector = this.selector + "." + e + "(" + n + ")"), i
        },
        each: function(t, e) {
            return Z.each(this, t, e)
        },
        ready: function(t) {
            return Z.ready.promise().done(t), this
        },
        eq: function(t) {
            return t = +t, -1 === t ? this.slice(t) : this.slice(t, t + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(z.apply(this, arguments), "slice", z.call(arguments).join(","))
        },
        map: function(t) {
            return this.pushStack(Z.map(this, function(e, n) {
                return t.call(e, n, e)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: q,
        sort: [].sort,
        splice: [].splice
    }, Z.fn.init.prototype = Z.fn, Z.extend = Z.fn.extend = function() {
        var t, n, i, r, a, o, s = arguments[0] || {},
            l = 1,
            u = arguments.length,
            c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" != typeof s && !Z.isFunction(s) && (s = {}), u === l && (s = this, --l); l < u; l++)
            if (null != (t = arguments[l]))
                for (n in t) i = s[n], r = t[n], s !== r && (c && r && (Z.isPlainObject(r) || (a = Z.isArray(r))) ? (a ? (a = !1, o = i && Z.isArray(i) ? i : []) : o = i && Z.isPlainObject(i) ? i : {}, s[n] = Z.extend(c, o, r)) : r !== e && (s[n] = r));
        return s
    }, Z.extend({
        noConflict: function(e) {
            return t.$ === Z && (t.$ = G), e && t.jQuery === Z && (t.jQuery = V), Z
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(t) {
            t ? Z.readyWait++ : Z.ready(!0)
        },
        ready: function(t) {
            if (!0 === t ? !--Z.readyWait : !Z.isReady) {
                if (!W.body) return setTimeout(Z.ready, 1);
                Z.isReady = !0, !0 !== t && --Z.readyWait > 0 || (Y.resolveWith(W, [Z]), Z.fn.trigger && Z(W).trigger("ready").off("ready"))
            }
        },
        isFunction: function(t) {
            return "function" === Z.type(t)
        },
        isArray: Array.isArray || function(t) {
            return "array" === Z.type(t)
        },
        isWindow: function(t) {
            return null != t && t == t.window
        },
        isNumeric: function(t) {
            return !isNaN(parseFloat(t)) && isFinite(t)
        },
        type: function(t) {
            return null == t ? String(t) : ft[K.call(t)] || "object"
        },
        isPlainObject: function(t) {
            if (!t || "object" !== Z.type(t) || t.nodeType || Z.isWindow(t)) return !1;
            try {
                if (t.constructor && !Q.call(t, "constructor") && !Q.call(t.constructor.prototype, "isPrototypeOf")) return !1
            } catch (t) {
                return !1
            }
            var n;
            for (n in t);
            return n === e || Q.call(t, n)
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t) return !1;
            return !0
        },
        error: function(t) {
            throw new Error(t)
        },
        parseHTML: function(t, e, n) {
            var i;
            return t && "string" == typeof t ? ("boolean" == typeof e && (n = e, e = 0), e = e || W, (i = rt.exec(t)) ? [e.createElement(i[1])] : (i = Z.buildFragment([t], e, n ? null : []), Z.merge([], (i.cacheable ? Z.clone(i.fragment) : i.fragment).childNodes))) : null
        },
        parseJSON: function(e) {
            return e && "string" == typeof e ? (e = Z.trim(e), t.JSON && t.JSON.parse ? t.JSON.parse(e) : at.test(e.replace(st, "@").replace(lt, "]").replace(ot, "")) ? new Function("return " + e)() : void Z.error("Invalid JSON: " + e)) : null
        },
        parseXML: function(n) {
            var i, r;
            if (!n || "string" != typeof n) return null;
            try {
                t.DOMParser ? (r = new DOMParser, i = r.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(n))
            } catch (t) {
                i = e
            }
            return (!i || !i.documentElement || i.getElementsByTagName("parsererror").length) && Z.error("Invalid XML: " + n), i
        },
        noop: function() {},
        globalEval: function(e) {
            e && tt.test(e) && (t.execScript || function(e) {
                t.eval.call(t, e)
            })(e)
        },
        camelCase: function(t) {
            return t.replace(ut, "ms-").replace(ct, dt)
        },
        nodeName: function(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        },
        each: function(t, n, i) {
            var r, a = 0,
                o = t.length,
                s = o === e || Z.isFunction(t);
            if (i)
                if (s) {
                    for (r in t)
                        if (!1 === n.apply(t[r], i)) break
                } else
                    for (; a < o && !1 !== n.apply(t[a++], i););
            else if (s) {
                for (r in t)
                    if (!1 === n.call(t[r], r, t[r])) break
            } else
                for (; a < o && !1 !== n.call(t[a], a, t[a++]););
            return t
        },
        trim: X && !X.call("\ufeff ") ? function(t) {
            return null == t ? "" : X.call(t)
        } : function(t) {
            return null == t ? "" : (t + "").replace(nt, "")
        },
        makeArray: function(t, e) {
            var n, i = e || [];
            return null != t && (n = Z.type(t), null == t.length || "string" === n || "function" === n || "regexp" === n || Z.isWindow(t) ? q.call(i, t) : Z.merge(i, t)), i
        },
        inArray: function(t, e, n) {
            var i;
            if (e) {
                if (U) return U.call(e, t, n);
                for (i = e.length, n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++)
                    if (n in e && e[n] === t) return n
            }
            return -1
        },
        merge: function(t, n) {
            var i = n.length,
                r = t.length,
                a = 0;
            if ("number" == typeof i)
                for (; a < i; a++) t[r++] = n[a];
            else
                for (; n[a] !== e;) t[r++] = n[a++];
            return t.length = r, t
        },
        grep: function(t, e, n) {
            var i, r = [],
                a = 0,
                o = t.length;
            for (n = !!n; a < o; a++) i = !!e(t[a], a), n !== i && r.push(t[a]);
            return r
        },
        map: function(t, n, i) {
            var r, a, o = [],
                s = 0,
                l = t.length;
            if (t instanceof Z || l !== e && "number" == typeof l && (l > 0 && t[0] && t[l - 1] || 0 === l || Z.isArray(t)))
                for (; s < l; s++) null != (r = n(t[s], s, i)) && (o[o.length] = r);
            else
                for (a in t) null != (r = n(t[a], a, i)) && (o[o.length] = r);
            return o.concat.apply([], o)
        },
        guid: 1,
        proxy: function(t, n) {
            var i, r, a;
            return "string" == typeof n && (i = t[n], n = t, t = i), Z.isFunction(t) ? (r = z.call(arguments, 2), a = function() {
                return t.apply(n, r.concat(z.call(arguments)))
            }, a.guid = t.guid = t.guid || Z.guid++, a) : e
        },
        access: function(t, n, i, r, a, o, s) {
            var l, u = null == i,
                c = 0,
                d = t.length;
            if (i && "object" == typeof i) {
                for (c in i) Z.access(t, n, c, i[c], 1, o, r);
                a = 1
            } else if (r !== e) {
                if (l = s === e && Z.isFunction(r), u && (l ? (l = n, n = function(t, e, n) {
                        return l.call(Z(t), n)
                    }) : (n.call(t, r), n = null)), n)
                    for (; c < d; c++) n(t[c], i, l ? r.call(t[c], c, n(t[c], i)) : r, s);
                a = 1
            }
            return a ? t : u ? n.call(t) : d ? n(t[0], i) : o
        },
        now: function() {
            return (new Date).getTime()
        }
    }), Z.ready.promise = function(e) {
        if (!Y)
            if (Y = Z.Deferred(), "complete" === W.readyState) setTimeout(Z.ready, 1);
            else if (W.addEventListener) W.addEventListener("DOMContentLoaded", ht, !1), t.addEventListener("load", Z.ready, !1);
        else {
            W.attachEvent("onreadystatechange", ht), t.attachEvent("onload", Z.ready);
            var n = !1;
            try {
                n = null == t.frameElement && W.documentElement
            } catch (t) {}
            n && n.doScroll && function t() {
                if (!Z.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(t, 50)
                    }
                    Z.ready()
                }
            }()
        }
        return Y.promise(e)
    }, Z.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(t, e) {
        ft["[object " + e + "]"] = e.toLowerCase()
    }), R = Z(W);
    var pt = {};
    Z.Callbacks = function(t) {
        t = "string" == typeof t ? pt[t] || n(t) : Z.extend({}, t);
        var i, r, a, o, s, l, u = [],
            c = !t.once && [],
            d = function(e) {
                for (i = t.memory && e, r = !0, l = o || 0, o = 0, s = u.length, a = !0; u && l < s; l++)
                    if (!1 === u[l].apply(e[0], e[1]) && t.stopOnFalse) {
                        i = !1;
                        break
                    }
                a = !1, u && (c ? c.length && d(c.shift()) : i ? u = [] : h.disable())
            },
            h = {
                add: function() {
                    if (u) {
                        var e = u.length;
                        (function e(n) {
                            Z.each(n, function(n, i) {
                                var r = Z.type(i);
                                "function" === r ? (!t.unique || !h.has(i)) && u.push(i) : i && i.length && "string" !== r && e(i)
                            })
                        })(arguments), a ? s = u.length : i && (o = e, d(i))
                    }
                    return this
                },
                remove: function() {
                    return u && Z.each(arguments, function(t, e) {
                        for (var n;
                            (n = Z.inArray(e, u, n)) > -1;) u.splice(n, 1), a && (n <= s && s--, n <= l && l--)
                    }), this
                },
                has: function(t) {
                    return Z.inArray(t, u) > -1
                },
                empty: function() {
                    return u = [], this
                },
                disable: function() {
                    return u = c = i = e, this
                },
                disabled: function() {
                    return !u
                },
                lock: function() {
                    return c = e, i || h.disable(), this
                },
                locked: function() {
                    return !c
                },
                fireWith: function(t, e) {
                    return e = e || [], e = [t, e.slice ? e.slice() : e], u && (!r || c) && (a ? c.push(e) : d(e)), this
                },
                fire: function() {
                    return h.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return h
    }, Z.extend({
        Deferred: function(t) {
            var e = [
                    ["resolve", "done", Z.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", Z.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", Z.Callbacks("memory")]
                ],
                n = "pending",
                i = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return r.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var t = arguments;
                        return Z.Deferred(function(n) {
                            Z.each(e, function(e, i) {
                                var a = i[0],
                                    o = t[e];
                                r[i[1]](Z.isFunction(o) ? function() {
                                    var t = o.apply(this, arguments);
                                    t && Z.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n : this, [t])
                                } : n[a])
                            }), t = null
                        }).promise()
                    },
                    promise: function(t) {
                        return null != t ? Z.extend(t, i) : i
                    }
                },
                r = {};
            return i.pipe = i.then, Z.each(e, function(t, a) {
                var o = a[2],
                    s = a[3];
                i[a[1]] = o.add, s && o.add(function() {
                    n = s
                }, e[1 ^ t][2].disable, e[2][2].lock), r[a[0]] = o.fire, r[a[0] + "With"] = o.fireWith
            }), i.promise(r), t && t.call(r, r), r
        },
        when: function(t) {
            var e, n, i, r = 0,
                a = z.call(arguments),
                o = a.length,
                s = 1 !== o || t && Z.isFunction(t.promise) ? o : 0,
                l = 1 === s ? t : Z.Deferred(),
                u = function(t, n, i) {
                    return function(r) {
                        n[t] = this, i[t] = arguments.length > 1 ? z.call(arguments) : r, i === e ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                    }
                };
            if (o > 1)
                for (e = new Array(o), n = new Array(o), i = new Array(o); r < o; r++) a[r] && Z.isFunction(a[r].promise) ? a[r].promise().done(u(r, i, a)).fail(l.reject).progress(u(r, n, e)) : --s;
            return s || l.resolveWith(i, a), l.promise()
        }
    }), Z.support = function() {
        var e, n, i, r, a, o, s, l, u, c, d, h = W.createElement("div");
        if (h.setAttribute("className", "t"), h.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = h.getElementsByTagName("*"), i = h.getElementsByTagName("a")[0], !n || !i || !n.length) return {};
        r = W.createElement("select"), a = r.appendChild(W.createElement("option")), o = h.getElementsByTagName("input")[0], i.style.cssText = "top:1px;float:left;opacity:.5", e = {
            leadingWhitespace: 3 === h.firstChild.nodeType,
            tbody: !h.getElementsByTagName("tbody").length,
            htmlSerialize: !!h.getElementsByTagName("link").length,
            style: /top/.test(i.getAttribute("style")),
            hrefNormalized: "/a" === i.getAttribute("href"),
            opacity: /^0.5/.test(i.style.opacity),
            cssFloat: !!i.style.cssFloat,
            checkOn: "on" === o.value,
            optSelected: a.selected,
            getSetAttribute: "t" !== h.className,
            enctype: !!W.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== W.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === W.compatMode,
            submitsBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, o.checked = !0, e.noCloneChecked = o.cloneNode(!0).checked, r.disabled = !0, e.optDisabled = !a.disabled;
        try {
            delete h.test
        } catch (t) {
            e.deleteExpando = !1
        }
        if (!h.addEventListener && h.attachEvent && h.fireEvent && (h.attachEvent("onclick", d = function() {
                e.noCloneEvent = !1
            }), h.cloneNode(!0).fireEvent("onclick"), h.detachEvent("onclick", d)), o = W.createElement("input"), o.value = "t", o.setAttribute("type", "radio"), e.radioValue = "t" === o.value, o.setAttribute("checked", "checked"), o.setAttribute("name", "t"), h.appendChild(o), s = W.createDocumentFragment(), s.appendChild(h.lastChild), e.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked, e.appendChecked = o.checked, s.removeChild(o), s.appendChild(h), h.attachEvent)
            for (u in {
                    submits: !0,
                    change: !0,
                    focusin: !0
                }) l = "on" + u, c = l in h, c || (h.setAttribute(l, "return;"), c = "function" == typeof h[l]), e[u + "Bubbles"] = c;
        return Z(function() {
            var n, i, r, a, o = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                s = W.getElementsByTagName("body")[0];
            s && (n = W.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", s.insertBefore(n, s.firstChild), i = W.createElement("div"), n.appendChild(i), i.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = i.getElementsByTagName("td"), r[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === r[0].offsetHeight, r[0].style.display = "", r[1].style.display = "none", e.reliableHiddenOffsets = c && 0 === r[0].offsetHeight, i.innerHTML = "", i.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", e.boxSizing = 4 === i.offsetWidth, e.doesNotIncludeMarginInBodyOffset = 1 !== s.offsetTop, t.getComputedStyle && (e.pixelPosition = "1%" !== (t.getComputedStyle(i, null) || {}).top, e.boxSizingReliable = "4px" === (t.getComputedStyle(i, null) || {
                width: "4px"
            }).width, a = W.createElement("div"), a.style.cssText = i.style.cssText = o, a.style.marginRight = a.style.width = "0", i.style.width = "1px", i.appendChild(a), e.reliableMarginRight = !parseFloat((t.getComputedStyle(a, null) || {}).marginRight)), void 0 !== i.style.zoom && (i.innerHTML = "", i.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", e.inlineBlockNeedsLayout = 3 === i.offsetWidth, i.style.display = "block", i.style.overflow = "visible", i.innerHTML = "<div></div>", i.firstChild.style.width = "5px", e.shrinkWrapBlocks = 3 !== i.offsetWidth, n.style.zoom = 1), s.removeChild(n), n = i = r = a = null)
        }), s.removeChild(h), n = i = r = a = o = s = h = null, e
    }();
    var mt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        gt = /([A-Z])/g;
    Z.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (Z.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(t) {
            return !!(t = t.nodeType ? Z.cache[t[Z.expando]] : t[Z.expando]) && !r(t)
        },
        data: function(t, n, i, r) {
            if (Z.acceptData(t)) {
                var a, o, s = Z.expando,
                    l = "string" == typeof n,
                    u = t.nodeType,
                    c = u ? Z.cache : t,
                    d = u ? t[s] : t[s] && s;
                if (d && c[d] && (r || c[d].data) || !l || i !== e) return d || (u ? t[s] = d = Z.deletedIds.pop() || Z.guid++ : d = s), c[d] || (c[d] = {}, u || (c[d].toJSON = Z.noop)), "object" != typeof n && "function" != typeof n || (r ? c[d] = Z.extend(c[d], n) : c[d].data = Z.extend(c[d].data, n)), a = c[d], r || (a.data || (a.data = {}), a = a.data), i !== e && (a[Z.camelCase(n)] = i), l ? null == (o = a[n]) && (o = a[Z.camelCase(n)]) : o = a, o
            }
        },
        removeData: function(t, e, n) {
            if (Z.acceptData(t)) {
                var i, a, o, s = t.nodeType,
                    l = s ? Z.cache : t,
                    u = s ? t[Z.expando] : Z.expando;
                if (l[u]) {
                    if (e && (i = n ? l[u] : l[u].data)) {
                        Z.isArray(e) || (e in i ? e = [e] : (e = Z.camelCase(e), e = e in i ? [e] : e.split(" ")));
                        for (a = 0, o = e.length; a < o; a++) delete i[e[a]];
                        if (!(n ? r : Z.isEmptyObject)(i)) return
                    }(n || (delete l[u].data, r(l[u]))) && (s ? Z.cleanData([t], !0) : Z.support.deleteExpando || l != l.window ? delete l[u] : l[u] = null)
                }
            }
        },
        _data: function(t, e, n) {
            return Z.data(t, e, n, !0)
        },
        acceptData: function(t) {
            var e = t.nodeName && Z.noData[t.nodeName.toLowerCase()];
            return !e || !0 !== e && t.getAttribute("classid") === e
        }
    }), Z.fn.extend({
        data: function(t, n) {
            var r, a, o, s, l, u = this[0],
                c = 0,
                d = null;
            if (t === e) {
                if (this.length && (d = Z.data(u), 1 === u.nodeType && !Z._data(u, "parsedAttrs"))) {
                    for (o = u.attributes, l = o.length; c < l; c++) s = o[c].name, s.indexOf("data-") || (s = Z.camelCase(s.substring(5)), i(u, s, d[s]));
                    Z._data(u, "parsedAttrs", !0)
                }
                return d
            }
            return "object" == typeof t ? this.each(function() {
                Z.data(this, t)
            }) : (r = t.split(".", 2), r[1] = r[1] ? "." + r[1] : "", a = r[1] + "!", Z.access(this, function(n) {
                if (n === e) return d = this.triggerHandler("getData" + a, [r[0]]), d === e && u && (d = Z.data(u, t), d = i(u, t, d)), d === e && r[1] ? this.data(r[0]) : d;
                r[1] = n, this.each(function() {
                    var e = Z(this);
                    e.triggerHandler("setData" + a, r), Z.data(this, t, n), e.triggerHandler("changeData" + a, r)
                })
            }, null, n, arguments.length > 1, null, !1))
        },
        removeData: function(t) {
            return this.each(function() {
                Z.removeData(this, t)
            })
        }
    }), Z.extend({
        queue: function(t, e, n) {
            var i;
            if (t) return e = (e || "fx") + "queue", i = Z._data(t, e), n && (!i || Z.isArray(n) ? i = Z._data(t, e, Z.makeArray(n)) : i.push(n)), i || []
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var n = Z.queue(t, e),
                i = n.length,
                r = n.shift(),
                a = Z._queueHooks(t, e),
                o = function() {
                    Z.dequeue(t, e)
                };
            "inprogress" === r && (r = n.shift(), i--), r && ("fx" === e && n.unshift("inprogress"), delete a.stop, r.call(t, o, a)), !i && a && a.empty.fire()
        },
        _queueHooks: function(t, e) {
            var n = e + "queueHooks";
            return Z._data(t, n) || Z._data(t, n, {
                empty: Z.Callbacks("once memory").add(function() {
                    Z.removeData(t, e + "queue", !0), Z.removeData(t, n, !0)
                })
            })
        }
    }), Z.fn.extend({
        queue: function(t, n) {
            var i = 2;
            return "string" != typeof t && (n = t, t = "fx", i--), arguments.length < i ? Z.queue(this[0], t) : n === e ? this : this.each(function() {
                var e = Z.queue(this, t, n);
                Z._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && Z.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                Z.dequeue(this, t)
            })
        },
        delay: function(t, e) {
            return t = Z.fx ? Z.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, n) {
                var i = setTimeout(e, t);
                n.stop = function() {
                    clearTimeout(i)
                }
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, n) {
            var i, r = 1,
                a = Z.Deferred(),
                o = this,
                s = this.length,
                l = function() {
                    --r || a.resolveWith(o, [o])
                };
            for ("string" != typeof t && (n = t, t = e), t = t || "fx"; s--;)(i = Z._data(o[s], t + "queueHooks")) && i.empty && (r++, i.empty.add(l));
            return l(), a.promise(n)
        }
    });
    var vt, yt, bt, kt = /[\t\r\n]/g,
        wt = /\r/g,
        xt = /^(?:button|input)$/i,
        _t = /^(?:button|input|object|select|textarea)$/i,
        Ct = /^a(?:rea|)$/i,
        St = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|requireds|scoped|selected)$/i,
        Dt = Z.support.getSetAttribute;
    Z.fn.extend({
        attr: function(t, e) {
            return Z.access(this, Z.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                Z.removeAttr(this, t)
            })
        },
        prop: function(t, e) {
            return Z.access(this, Z.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return t = Z.propFix[t] || t, this.each(function() {
                try {
                    this[t] = e, delete this[t]
                } catch (t) {}
            })
        },
        addClass: function(t) {
            var e, n, i, r, a, o, s;
            if (Z.isFunction(t)) return this.each(function(e) {
                Z(this).addClass(t.call(this, e, this.className))
            });
            if (t && "string" == typeof t)
                for (e = t.split(et), n = 0, i = this.length; n < i; n++)
                    if (r = this[n], 1 === r.nodeType)
                        if (r.className || 1 !== e.length) {
                            for (a = " " + r.className + " ", o = 0, s = e.length; o < s; o++) a.indexOf(" " + e[o] + " ") < 0 && (a += e[o] + " ");
                            r.className = Z.trim(a)
                        } else r.className = t;
            return this
        },
        removeClass: function(t) {
            var n, i, r, a, o, s, l;
            if (Z.isFunction(t)) return this.each(function(e) {
                Z(this).removeClass(t.call(this, e, this.className))
            });
            if (t && "string" == typeof t || t === e)
                for (n = (t || "").split(et), s = 0, l = this.length; s < l; s++)
                    if (r = this[s], 1 === r.nodeType && r.className) {
                        for (i = (" " + r.className + " ").replace(kt, " "), a = 0, o = n.length; a < o; a++)
                            for (; i.indexOf(" " + n[a] + " ") >= 0;) i = i.replace(" " + n[a] + " ", " ");
                        r.className = t ? Z.trim(i) : ""
                    }
            return this
        },
        toggleClass: function(t, e) {
            var n = typeof t,
                i = "boolean" == typeof e;
            return Z.isFunction(t) ? this.each(function(n) {
                Z(this).toggleClass(t.call(this, n, this.className, e), e)
            }) : this.each(function() {
                if ("string" === n)
                    for (var r, a = 0, o = Z(this), s = e, l = t.split(et); r = l[a++];) s = i ? s : !o.hasClass(r),
                        o[s ? "addClass" : "removeClass"](r);
                else "undefined" !== n && "boolean" !== n || (this.className && Z._data(this, "__className__", this.className), this.className = this.className || !1 === t ? "" : Z._data(this, "__className__") || "")
            })
        },
        hasClass: function(t) {
            for (var e = " " + t + " ", n = 0, i = this.length; n < i; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(kt, " ").indexOf(e) >= 0) return !0;
            return !1
        },
        val: function(t) {
            var n, i, r, a = this[0]; {
                if (arguments.length) return r = Z.isFunction(t), this.each(function(i) {
                    var a, o = Z(this);
                    1 === this.nodeType && (a = r ? t.call(this, i, o.val()) : t, null == a ? a = "" : "number" == typeof a ? a += "" : Z.isArray(a) && (a = Z.map(a, function(t) {
                        return null == t ? "" : t + ""
                    })), n = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, a, "value") !== e || (this.value = a))
                });
                if (a) return n = Z.valHooks[a.type] || Z.valHooks[a.nodeName.toLowerCase()], n && "get" in n && (i = n.get(a, "value")) !== e ? i : (i = a.value, "string" == typeof i ? i.replace(wt, "") : null == i ? "" : i)
            }
        }
    }), Z.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = t.attributes.value;
                    return !e || e.specified ? t.value : t.text
                }
            },
            select: {
                get: function(t) {
                    for (var e, n, i = t.options, r = t.selectedIndex, a = "select-one" === t.type || r < 0, o = a ? null : [], s = a ? r + 1 : i.length, l = r < 0 ? s : a ? r : 0; l < s; l++)
                        if (n = i[l], (n.selected || l === r) && (Z.support.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !Z.nodeName(n.parentNode, "optgroup"))) {
                            if (e = Z(n).val(), a) return e;
                            o.push(e)
                        }
                    return o
                },
                set: function(t, e) {
                    var n = Z.makeArray(e);
                    return Z(t).find("option").each(function() {
                        this.selected = Z.inArray(Z(this).val(), n) >= 0
                    }), n.length || (t.selectedIndex = -1), n
                }
            }
        },
        attrFn: {},
        attr: function(t, n, i, r) {
            var a, o, s, l = t.nodeType;
            if (t && 3 !== l && 8 !== l && 2 !== l) return r && Z.isFunction(Z.fn[n]) ? Z(t)[n](i) : void 0 === t.getAttribute ? Z.prop(t, n, i) : ((s = 1 !== l || !Z.isXMLDoc(t)) && (n = n.toLowerCase(), o = Z.attrHooks[n] || (St.test(n) ? yt : vt)), i !== e ? null === i ? void Z.removeAttr(t, n) : o && "set" in o && s && (a = o.set(t, i, n)) !== e ? a : (t.setAttribute(n, i + ""), i) : o && "get" in o && s && null !== (a = o.get(t, n)) ? a : (a = t.getAttribute(n), null === a ? e : a))
        },
        removeAttr: function(t, e) {
            var n, i, r, a, o = 0;
            if (e && 1 === t.nodeType)
                for (i = e.split(et); o < i.length; o++)(r = i[o]) && (n = Z.propFix[r] || r, a = St.test(r), a || Z.attr(t, r, ""), t.removeAttribute(Dt ? r : n), a && n in t && (t[n] = !1))
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (xt.test(t.nodeName) && t.parentNode) Z.error("type property can't be changed");
                    else if (!Z.support.radioValue && "radio" === e && Z.nodeName(t, "input")) {
                        var n = t.value;
                        return t.setAttribute("type", e), n && (t.value = n), e
                    }
                }
            },
            value: {
                get: function(t, e) {
                    return vt && Z.nodeName(t, "button") ? vt.get(t, e) : e in t ? t.value : null
                },
                set: function(t, e, n) {
                    if (vt && Z.nodeName(t, "button")) return vt.set(t, e, n);
                    t.value = e
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            for: "htmlFor",
            class: "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(t, n, i) {
            var r, a, o, s = t.nodeType;
            if (t && 3 !== s && 8 !== s && 2 !== s) return o = 1 !== s || !Z.isXMLDoc(t), o && (n = Z.propFix[n] || n, a = Z.propHooks[n]), i !== e ? a && "set" in a && (r = a.set(t, i, n)) !== e ? r : t[n] = i : a && "get" in a && null !== (r = a.get(t, n)) ? r : t[n]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var n = t.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : _t.test(t.nodeName) || Ct.test(t.nodeName) && t.href ? 0 : e
                }
            }
        }
    }), yt = {
        get: function(t, n) {
            var i, r = Z.prop(t, n);
            return !0 === r || "boolean" != typeof r && (i = t.getAttributeNode(n)) && !1 !== i.nodeValue ? n.toLowerCase() : e
        },
        set: function(t, e, n) {
            var i;
            return !1 === e ? Z.removeAttr(t, n) : (i = Z.propFix[n] || n, i in t && (t[i] = !0), t.setAttribute(n, n.toLowerCase())), n
        }
    }, Dt || (bt = {
        name: !0,
        id: !0,
        coords: !0
    }, vt = Z.valHooks.button = {
        get: function(t, n) {
            var i;
            return i = t.getAttributeNode(n), i && (bt[n] ? "" !== i.value : i.specified) ? i.value : e
        },
        set: function(t, e, n) {
            var i = t.getAttributeNode(n);
            return i || (i = W.createAttribute(n), t.setAttributeNode(i)), i.value = e + ""
        }
    }, Z.each(["width", "height"], function(t, e) {
        Z.attrHooks[e] = Z.extend(Z.attrHooks[e], {
            set: function(t, n) {
                if ("" === n) return t.setAttribute(e, "auto"), n
            }
        })
    }), Z.attrHooks.contenteditable = {
        get: vt.get,
        set: function(t, e, n) {
            "" === e && (e = "false"), vt.set(t, e, n)
        }
    }), Z.support.hrefNormalized || Z.each(["href", "src", "width", "height"], function(t, n) {
        Z.attrHooks[n] = Z.extend(Z.attrHooks[n], {
            get: function(t) {
                var i = t.getAttribute(n, 2);
                return null === i ? e : i
            }
        })
    }), Z.support.style || (Z.attrHooks.style = {
        get: function(t) {
            return t.style.cssText.toLowerCase() || e
        },
        set: function(t, e) {
            return t.style.cssText = e + ""
        }
    }), Z.support.optSelected || (Z.propHooks.selected = Z.extend(Z.propHooks.selected, {
        get: function(t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }
    })), Z.support.enctype || (Z.propFix.enctype = "encoding"), Z.support.checkOn || Z.each(["radio", "checkbox"], function() {
        Z.valHooks[this] = {
            get: function(t) {
                return null === t.getAttribute("value") ? "on" : t.value
            }
        }
    }), Z.each(["radio", "checkbox"], function() {
        Z.valHooks[this] = Z.extend(Z.valHooks[this], {
            set: function(t, e) {
                if (Z.isArray(e)) return t.checked = Z.inArray(Z(t).val(), e) >= 0
            }
        })
    });
    var Tt = /^(?:textarea|input|select)$/i,
        Ft = /^([^\.]*|)(?:\.(.+)|)$/,
        Mt = /(?:^|\s)hover(\.\S+|)\b/,
        Et = /^key/,
        Pt = /^(?:mouse|contextmenu)|click/,
        Ot = /^(?:focusinfocus|focusoutblur)$/,
        At = function(t) {
            return Z.event.special.hover ? t : t.replace(Mt, "mouseenter$1 mouseleave$1")
        };
    Z.event = {
            add: function(t, n, i, r, a) {
                var o, s, l, u, c, d, h, f, p, m, g;
                if (3 !== t.nodeType && 8 !== t.nodeType && n && i && (o = Z._data(t))) {
                    for (i.handler && (p = i, i = p.handler, a = p.selector), i.guid || (i.guid = Z.guid++), l = o.events, l || (o.events = l = {}), s = o.handle, s || (o.handle = s = function(t) {
                            return void 0 === Z || t && Z.event.triggered === t.type ? e : Z.event.dispatch.apply(s.elem, arguments)
                        }, s.elem = t), n = Z.trim(At(n)).split(" "), u = 0; u < n.length; u++) c = Ft.exec(n[u]) || [], d = c[1], h = (c[2] || "").split(".").sort(), g = Z.event.special[d] || {}, d = (a ? g.delegateType : g.bindType) || d, g = Z.event.special[d] || {}, f = Z.extend({
                        type: d,
                        origType: c[1],
                        data: r,
                        handler: i,
                        guid: i.guid,
                        selector: a,
                        needsContext: a && Z.expr.match.needsContext.test(a),
                        namespace: h.join(".")
                    }, p), m = l[d], m || (m = l[d] = [], m.delegateCount = 0, g.setup && !1 !== g.setup.call(t, r, h, s) || (t.addEventListener ? t.addEventListener(d, s, !1) : t.attachEvent && t.attachEvent("on" + d, s))), g.add && (g.add.call(t, f), f.handler.guid || (f.handler.guid = i.guid)), a ? m.splice(m.delegateCount++, 0, f) : m.push(f), Z.event.global[d] = !0;
                    t = null
                }
            },
            global: {},
            remove: function(t, e, n, i, r) {
                var a, o, s, l, u, c, d, h, f, p, m, g = Z.hasData(t) && Z._data(t);
                if (g && (h = g.events)) {
                    for (e = Z.trim(At(e || "")).split(" "), a = 0; a < e.length; a++)
                        if (o = Ft.exec(e[a]) || [], s = l = o[1], u = o[2], s) {
                            for (f = Z.event.special[s] || {}, s = (i ? f.delegateType : f.bindType) || s, p = h[s] || [], c = p.length, u = u ? new RegExp("(^|\\.)" + u.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, d = 0; d < p.length; d++) m = p[d], (r || l === m.origType) && (!n || n.guid === m.guid) && (!u || u.test(m.namespace)) && (!i || i === m.selector || "**" === i && m.selector) && (p.splice(d--, 1), m.selector && p.delegateCount--, f.remove && f.remove.call(t, m));
                            0 === p.length && c !== p.length && ((!f.teardown || !1 === f.teardown.call(t, u, g.handle)) && Z.removeEvent(t, s, g.handle), delete h[s])
                        } else
                            for (s in h) Z.event.remove(t, s + e[a], n, i, !0);
                    Z.isEmptyObject(h) && (delete g.handle, Z.removeData(t, "events", !0))
                }
            },
            customEvent: {
                getData: !0,
                setData: !0,
                changeData: !0
            },
            trigger: function(n, i, r, a) {
                if (!r || 3 !== r.nodeType && 8 !== r.nodeType) {
                    var o, s, l, u, c, d, h, f, p, m, g = n.type || n,
                        v = [];
                    if (Ot.test(g + Z.event.triggered)) return;
                    if (g.indexOf("!") >= 0 && (g = g.slice(0, -1), s = !0), g.indexOf(".") >= 0 && (v = g.split("."), g = v.shift(), v.sort()), (!r || Z.event.customEvent[g]) && !Z.event.global[g]) return;
                    if (n = "object" == typeof n ? n[Z.expando] ? n : new Z.Event(g, n) : new Z.Event(g), n.type = g, n.isTrigger = !0, n.exclusive = s, n.namespace = v.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, d = g.indexOf(":") < 0 ? "on" + g : "", !r) {
                        o = Z.cache;
                        for (l in o) o[l].events && o[l].events[g] && Z.event.trigger(n, i, o[l].handle.elem, !0);
                        return
                    }
                    if (n.result = e, n.target || (n.target = r), i = null != i ? Z.makeArray(i) : [], i.unshift(n), h = Z.event.special[g] || {}, h.trigger && !1 === h.trigger.apply(r, i)) return;
                    if (p = [
                            [r, h.bindType || g]
                        ], !a && !h.noBubble && !Z.isWindow(r)) {
                        for (m = h.delegateType || g, u = Ot.test(m + g) ? r : r.parentNode, c = r; u; u = u.parentNode) p.push([u, m]), c = u;
                        c === (r.ownerDocument || W) && p.push([c.defaultView || c.parentWindow || t, m])
                    }
                    for (l = 0; l < p.length && !n.isPropagationStopped(); l++) u = p[l][0], n.type = p[l][1], f = (Z._data(u, "events") || {})[n.type] && Z._data(u, "handle"), f && f.apply(u, i), (f = d && u[d]) && Z.acceptData(u) && f.apply && !1 === f.apply(u, i) && n.preventDefault();
                    return n.type = g, !a && !n.isDefaultPrevented() && (!h._default || !1 === h._default.apply(r.ownerDocument, i)) && ("click" !== g || !Z.nodeName(r, "a")) && Z.acceptData(r) && d && r[g] && ("focus" !== g && "blur" !== g || 0 !== n.target.offsetWidth) && !Z.isWindow(r) && (c = r[d], c && (r[d] = null), Z.event.triggered = g, r[g](), Z.event.triggered = e, c && (r[d] = c)), n.result
                }
            },
            dispatch: function(n) {
                n = Z.event.fix(n || t.event);
                var i, r, a, o, s, l, u, c, d, h = (Z._data(this, "events") || {})[n.type] || [],
                    f = h.delegateCount,
                    p = z.call(arguments),
                    m = !n.exclusive && !n.namespace,
                    g = Z.event.special[n.type] || {},
                    v = [];
                if (p[0] = n, n.delegateTarget = this, !g.preDispatch || !1 !== g.preDispatch.call(this, n)) {
                    if (f && (!n.button || "click" !== n.type))
                        for (a = n.target; a != this; a = a.parentNode || this)
                            if (!0 !== a.disabled || "click" !== n.type) {
                                for (s = {}, u = [], i = 0; i < f; i++) c = h[i], d = c.selector, s[d] === e && (s[d] = c.needsContext ? Z(d, this).index(a) >= 0 : Z.find(d, this, null, [a]).length), s[d] && u.push(c);
                                u.length && v.push({
                                    elem: a,
                                    matches: u
                                })
                            }
                    for (h.length > f && v.push({
                            elem: this,
                            matches: h.slice(f)
                        }), i = 0; i < v.length && !n.isPropagationStopped(); i++)
                        for (l = v[i], n.currentTarget = l.elem, r = 0; r < l.matches.length && !n.isImmediatePropagationStopped(); r++) c = l.matches[r], (m || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) && (n.data = c.data, n.handleObj = c, (o = ((Z.event.special[c.origType] || {}).handle || c.handler).apply(l.elem, p)) !== e && (n.result = o, !1 === o && (n.preventDefault(), n.stopPropagation())));
                    return g.postDispatch && g.postDispatch.call(this, n), n.result
                }
            },
            props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(t, e) {
                    return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(t, n) {
                    var i, r, a, o = n.button,
                        s = n.fromElement;
                    return null == t.pageX && null != n.clientX && (i = t.target.ownerDocument || W, r = i.documentElement, a = i.body, t.pageX = n.clientX + (r && r.scrollLeft || a && a.scrollLeft || 0) - (r && r.clientLeft || a && a.clientLeft || 0), t.pageY = n.clientY + (r && r.scrollTop || a && a.scrollTop || 0) - (r && r.clientTop || a && a.clientTop || 0)), !t.relatedTarget && s && (t.relatedTarget = s === t.target ? n.toElement : s), !t.which && o !== e && (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
                }
            },
            fix: function(t) {
                if (t[Z.expando]) return t;
                var e, n, i = t,
                    r = Z.event.fixHooks[t.type] || {},
                    a = r.props ? this.props.concat(r.props) : this.props;
                for (t = Z.Event(i), e = a.length; e;) n = a[--e], t[n] = i[n];
                return t.target || (t.target = i.srcElement || W), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, r.filter ? r.filter(t, i) : t
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    delegateType: "focusin"
                },
                blur: {
                    delegateType: "focusout"
                },
                beforeunload: {
                    setup: function(t, e, n) {
                        Z.isWindow(this) && (this.onbeforeunload = n)
                    },
                    teardown: function(t, e) {
                        this.onbeforeunload === e && (this.onbeforeunload = null)
                    }
                }
            },
            simulate: function(t, e, n, i) {
                var r = Z.extend(new Z.Event, n, {
                    type: t,
                    isSimulated: !0,
                    originalEvent: {}
                });
                i ? Z.event.trigger(r, null, e) : Z.event.dispatch.call(e, r), r.isDefaultPrevented() && n.preventDefault()
            }
        }, Z.event.handle = Z.event.dispatch, Z.removeEvent = W.removeEventListener ? function(t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n, !1)
        } : function(t, e, n) {
            var i = "on" + e;
            t.detachEvent && (void 0 === t[i] && (t[i] = null), t.detachEvent(i, n))
        }, Z.Event = function(t, e) {
            if (!(this instanceof Z.Event)) return new Z.Event(t, e);
            t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || !1 === t.returnValue || t.getPreventDefault && t.getPreventDefault() ? o : a) : this.type = t, e && Z.extend(this, e), this.timeStamp = t && t.timeStamp || Z.now(), this[Z.expando] = !0
        }, Z.Event.prototype = {
            preventDefault: function() {
                this.isDefaultPrevented = o;
                var t = this.originalEvent;
                t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
            },
            stopPropagation: function() {
                this.isPropagationStopped = o;
                var t = this.originalEvent;
                t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = o, this.stopPropagation()
            },
            isDefaultPrevented: a,
            isPropagationStopped: a,
            isImmediatePropagationStopped: a
        }, Z.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(t, e) {
            Z.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function(t) {
                    var n, i = this,
                        r = t.relatedTarget,
                        a = t.handleObj;
                    a.selector;
                    return r && (r === i || Z.contains(i, r)) || (t.type = a.origType, n = a.handler.apply(this, arguments), t.type = e), n
                }
            }
        }), Z.support.submitsBubbles || (Z.event.special.submits = {
            setup: function() {
                if (Z.nodeName(this, "form")) return !1;
                Z.event.add(this, "click._submits keypress._submits", function(t) {
                    var n = t.target,
                        i = Z.nodeName(n, "input") || Z.nodeName(n, "button") ? n.form : e;
                    i && !Z._data(i, "_submits_attached") && (Z.event.add(i, "submits._submits", function(t) {
                        t._submits_bubble = !0
                    }), Z._data(i, "_submits_attached", !0))
                })
            },
            postDispatch: function(t) {
                t._submits_bubble && (delete t._submits_bubble, this.parentNode && !t.isTrigger && Z.event.simulate("submits", this.parentNode, t, !0))
            },
            teardown: function() {
                if (Z.nodeName(this, "form")) return !1;
                Z.event.remove(this, "._submits")
            }
        }), Z.support.changeBubbles || (Z.event.special.change = {
            setup: function() {
                if (Tt.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (Z.event.add(this, "propertychange._change", function(t) {
                    "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
                }), Z.event.add(this, "click._change", function(t) {
                    this._just_changed && !t.isTrigger && (this._just_changed = !1), Z.event.simulate("change", this, t, !0)
                })), !1;
                Z.event.add(this, "beforeactivate._change", function(t) {
                    var e = t.target;
                    Tt.test(e.nodeName) && !Z._data(e, "_change_attached") && (Z.event.add(e, "change._change", function(t) {
                        this.parentNode && !t.isSimulated && !t.isTrigger && Z.event.simulate("change", this.parentNode, t, !0)
                    }), Z._data(e, "_change_attached", !0))
                })
            },
            handle: function(t) {
                var e = t.target;
                if (this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type) return t.handleObj.handler.apply(this, arguments)
            },
            teardown: function() {
                return Z.event.remove(this, "._change"), !Tt.test(this.nodeName)
            }
        }), Z.support.focusinBubbles || Z.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, e) {
            var n = 0,
                i = function(t) {
                    Z.event.simulate(e, t.target, Z.event.fix(t), !0)
                };
            Z.event.special[e] = {
                setup: function() {
                    0 == n++ && W.addEventListener(t, i, !0)
                },
                teardown: function() {
                    0 == --n && W.removeEventListener(t, i, !0)
                }
            }
        }), Z.fn.extend({
            on: function(t, n, i, r, o) {
                var s, l;
                if ("object" == typeof t) {
                    "string" != typeof n && (i = i || n, n = e);
                    for (l in t) this.on(l, n, i, t[l], o);
                    return this
                }
                if (null == i && null == r ? (r = n, i = n = e) : null == r && ("string" == typeof n ? (r = i, i = e) : (r = i, i = n, n = e)), !1 === r) r = a;
                else if (!r) return this;
                return 1 === o && (s = r, r = function(t) {
                    return Z().off(t), s.apply(this, arguments)
                }, r.guid = s.guid || (s.guid = Z.guid++)), this.each(function() {
                    Z.event.add(this, t, r, i, n)
                })
            },
            one: function(t, e, n, i) {
                return this.on(t, e, n, i, 1)
            },
            off: function(t, n, i) {
                var r, o;
                if (t && t.preventDefault && t.handleObj) return r = t.handleObj, Z(t.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" == typeof t) {
                    for (o in t) this.off(o, n, t[o]);
                    return this
                }
                return !1 !== n && "function" != typeof n || (i = n, n = e), !1 === i && (i = a), this.each(function() {
                    Z.event.remove(this, t, i, n)
                })
            },
            bind: function(t, e, n) {
                return this.on(t, null, e, n)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            live: function(t, e, n) {
                return Z(this.context).on(t, this.selector, e, n), this
            },
            die: function(t, e) {
                return Z(this.context).off(t, this.selector || "**", e), this
            },
            delegate: function(t, e, n, i) {
                return this.on(e, t, n, i)
            },
            undelegate: function(t, e, n) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
            },
            trigger: function(t, e) {
                return this.each(function() {
                    Z.event.trigger(t, e, this)
                })
            },
            triggerHandler: function(t, e) {
                if (this[0]) return Z.event.trigger(t, e, this[0], !0)
            },
            toggle: function(t) {
                var e = arguments,
                    n = t.guid || Z.guid++,
                    i = 0,
                    r = function(n) {
                        var r = (Z._data(this, "lastToggle" + t.guid) || 0) % i;
                        return Z._data(this, "lastToggle" + t.guid, r + 1), n.preventDefault(), e[r].apply(this, arguments) || !1
                    };
                for (r.guid = n; i < e.length;) e[i++].guid = n;
                return this.click(r)
            },
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            }
        }), Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submits keydown keypress keyup error contextmenu".split(" "), function(t, e) {
            Z.fn[e] = function(t, n) {
                return null == n && (n = t, t = null), arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
            }, Et.test(e) && (Z.event.fixHooks[e] = Z.event.keyHooks), Pt.test(e) && (Z.event.fixHooks[e] = Z.event.mouseHooks)
        }),
        function(t, e) {
            function n(t, e, n, i) {
                n = n || [], e = e || P;
                var r, a, o, s, l = e.nodeType;
                if (!t || "string" != typeof t) return n;
                if (1 !== l && 9 !== l) return [];
                if (!(o = w(e)) && !i && (r = et.exec(t)))
                    if (s = r[1]) {
                        if (9 === l) {
                            if (!(a = e.getElementById(s)) || !a.parentNode) return n;
                            if (a.id === s) return n.push(a), n
                        } else if (e.ownerDocument && (a = e.ownerDocument.getElementById(s)) && x(e, a) && a.id === s) return n.push(a), n
                    } else {
                        if (r[2]) return j.apply(n, I.call(e.getElementsByTagName(t), 0)), n;
                        if ((s = r[3]) && dt && e.getElementsByClassName) return j.apply(n, I.call(e.getElementsByClassName(s), 0)), n
                    }
                return m(t.replace(Q, "$1"), e, n, i, o)
            }

            function i(t) {
                return function(e) {
                    return "input" === e.nodeName.toLowerCase() && e.type === t
                }
            }

            function r(t) {
                return function(e) {
                    var n = e.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && e.type === t
                }
            }

            function a(t) {
                return R(function(e) {
                    return e = +e, R(function(n, i) {
                        for (var r, a = t([], n.length, e), o = a.length; o--;) n[r = a[o]] && (n[r] = !(i[r] = n[r]))
                    })
                })
            }

            function o(t, e, n) {
                if (t === e) return n;
                for (var i = t.nextSibling; i;) {
                    if (i === e) return -1;
                    i = i.nextSibling
                }
                return 1
            }

            function s(t, e) {
                var i, r, a, o, s, l, u, c = B[M][t + " "];
                if (c) return e ? 0 : c.slice(0);
                for (s = t, l = [], u = b.preFilter; s;) {
                    i && !(r = X.exec(s)) || (r && (s = s.slice(r[0].length) || s), l.push(a = [])), i = !1, (r = J.exec(s)) && (a.push(i = new E(r.shift())), s = s.slice(i.length), i.type = r[0].replace(Q, " "));
                    for (o in b.filter)(r = ot[o].exec(s)) && (!u[o] || (r = u[o](r))) && (a.push(i = new E(r.shift())), s = s.slice(i.length), i.type = o, i.matches = r);
                    if (!i) break
                }
                return e ? s.length : s ? n.error(t) : B(t, l).slice(0)
            }

            function l(t, e, n) {
                var i = e.dir,
                    r = n && "parentNode" === e.dir,
                    a = L++;
                return e.first ? function(e, n, a) {
                    for (; e = e[i];)
                        if (r || 1 === e.nodeType) return t(e, n, a)
                } : function(e, n, o) {
                    if (o) {
                        for (; e = e[i];)
                            if ((r || 1 === e.nodeType) && t(e, n, o)) return e
                    } else
                        for (var s, l = A + " " + a + " ", u = l + v; e = e[i];)
                            if (r || 1 === e.nodeType) {
                                if ((s = e[M]) === u) return e.sizset;
                                if ("string" == typeof s && 0 === s.indexOf(l)) {
                                    if (e.sizset) return e
                                } else {
                                    if (e[M] = u, t(e, n, o)) return e.sizset = !0, e;
                                    e.sizset = !1
                                }
                            }
                }
            }

            function u(t) {
                return t.length > 1 ? function(e, n, i) {
                    for (var r = t.length; r--;)
                        if (!t[r](e, n, i)) return !1;
                    return !0
                } : t[0]
            }

            function c(t, e, n, i, r) {
                for (var a, o = [], s = 0, l = t.length, u = null != e; s < l; s++)(a = t[s]) && (n && !n(a, i, r) || (o.push(a), u && e.push(s)));
                return o
            }

            function d(t, e, n, i, r, a) {
                return i && !i[M] && (i = d(i)), r && !r[M] && (r = d(r, a)), R(function(a, o, s, l) {
                    var u, d, h, f = [],
                        m = [],
                        g = o.length,
                        v = a || p(e || "*", s.nodeType ? [s] : s, []),
                        y = !t || !a && e ? v : c(v, f, t, s, l),
                        b = n ? r || (a ? t : g || i) ? [] : o : y;
                    if (n && n(y, b, s, l), i)
                        for (u = c(b, m), i(u, [], s, l), d = u.length; d--;)(h = u[d]) && (b[m[d]] = !(y[m[d]] = h));
                    if (a) {
                        if (r || t) {
                            if (r) {
                                for (u = [], d = b.length; d--;)(h = b[d]) && u.push(y[d] = h);
                                r(null, b = [], u, l)
                            }
                            for (d = b.length; d--;)(h = b[d]) && (u = r ? H.call(a, h) : f[d]) > -1 && (a[u] = !(o[u] = h))
                        }
                    } else b = c(b === o ? b.splice(g, b.length) : b), r ? r(null, o, b, l) : j.apply(o, b)
                })
            }

            function h(t) {
                for (var e, n, i, r = t.length, a = b.relative[t[0].type], o = a || b.relative[" "], s = a ? 1 : 0, c = l(function(t) {
                        return t === e
                    }, o, !0), f = l(function(t) {
                        return H.call(e, t) > -1
                    }, o, !0), p = [function(t, n, i) {
                        return !a && (i || n !== D) || ((e = n).nodeType ? c(t, n, i) : f(t, n, i))
                    }]; s < r; s++)
                    if (n = b.relative[t[s].type]) p = [l(u(p), n)];
                    else {
                        if (n = b.filter[t[s].type].apply(null, t[s].matches), n[M]) {
                            for (i = ++s; i < r && !b.relative[t[i].type]; i++);
                            return d(s > 1 && u(p), s > 1 && t.slice(0, s - 1).join("").replace(Q, "$1"), n, s < i && h(t.slice(s, i)), i < r && h(t = t.slice(i)), i < r && t.join(""))
                        }
                        p.push(n)
                    }
                return u(p)
            }

            function f(t, e) {
                var i = e.length > 0,
                    r = t.length > 0,
                    a = function(o, s, l, u, d) {
                        var h, f, p, m = [],
                            g = 0,
                            y = "0",
                            k = o && [],
                            w = null != d,
                            x = D,
                            _ = o || r && b.find.TAG("*", d && s.parentNode || s),
                            C = A += null == x ? 1 : Math.E;
                        for (w && (D = s !== P && s, v = a.el); null != (h = _[y]); y++) {
                            if (r && h) {
                                for (f = 0; p = t[f]; f++)
                                    if (p(h, s, l)) {
                                        u.push(h);
                                        break
                                    }
                                w && (A = C, v = ++a.el)
                            }
                            i && ((h = !p && h) && g--, o && k.push(h))
                        }
                        if (g += y, i && y !== g) {
                            for (f = 0; p = e[f]; f++) p(k, m, s, l);
                            if (o) {
                                if (g > 0)
                                    for (; y--;) !k[y] && !m[y] && (m[y] = N.call(u));
                                m = c(m)
                            }
                            j.apply(u, m), w && !o && m.length > 0 && g + e.length > 1 && n.uniqueSort(u)
                        }
                        return w && (A = C, D = x), k
                    };
                return a.el = 0, i ? R(a) : a
            }

            function p(t, e, i) {
                for (var r = 0, a = e.length; r < a; r++) n(t, e[r], i);
                return i
            }

            function m(t, e, n, i, r) {
                var a, o, l, u, c, d = s(t);
                d.length;
                if (!i && 1 === d.length) {
                    if (o = d[0] = d[0].slice(0), o.length > 2 && "ID" === (l = o[0]).type && 9 === e.nodeType && !r && b.relative[o[1].type]) {
                        if (!(e = b.find.ID(l.matches[0].replace(at, ""), e, r)[0])) return n;
                        t = t.slice(o.shift().length)
                    }
                    for (a = ot.POS.test(t) ? -1 : o.length - 1; a >= 0 && (l = o[a], !b.relative[u = l.type]); a--)
                        if ((c = b.find[u]) && (i = c(l.matches[0].replace(at, ""), nt.test(o[0].type) && e.parentNode || e, r))) {
                            if (o.splice(a, 1), !(t = i.length && o.join(""))) return j.apply(n, I.call(i, 0)), n;
                            break
                        }
                }
                return _(t, d)(i, e, r, n, nt.test(t)), n
            }

            function g() {}
            var v, y, b, k, w, x, _, C, S, D, T = !0,
                F = "undefined",
                M = ("sizcache" + Math.random()).replace(".", ""),
                E = String,
                P = t.document,
                O = P.documentElement,
                A = 0,
                L = 0,
                N = [].pop,
                j = [].push,
                I = [].slice,
                H = [].indexOf || function(t) {
                    for (var e = 0, n = this.length; e < n; e++)
                        if (this[e] === t) return e;
                    return -1
                },
                R = function(t, e) {
                    return t[M] = null == e || e, t
                },
                Y = function() {
                    var t = {},
                        e = [];
                    return R(function(n, i) {
                        return e.push(n) > b.cacheLength && delete t[e.shift()], t[n + " "] = i
                    }, t)
                },
                W = Y(),
                B = Y(),
                $ = Y(),
                V = "[\\x20\\t\\r\\n\\f]",
                G = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
                q = G.replace("w", "w#"),
                z = "\\[" + V + "*(" + G + ")" + V + "*(?:([*^$|!~]?=)" + V + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + q + ")|)|)" + V + "*\\]",
                U = ":(" + G + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + z + ")|[^:]|\\\\.)*|.*))\\)|)",
                K = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + V + "*((?:-\\d)?\\d*)" + V + "*\\)|)(?=[^-]|$)",
                Q = new RegExp("^" + V + "+|((?:^|[^\\\\])(?:\\\\.)*)" + V + "+$", "g"),
                X = new RegExp("^" + V + "*," + V + "*"),
                J = new RegExp("^" + V + "*([\\x20\\t\\r\\n\\f>+~])" + V + "*"),
                tt = new RegExp(U),
                et = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
                nt = /[\x20\t\r\n\f]*[+~]/,
                it = /h\d/i,
                rt = /input|select|textarea|button/i,
                at = /\\(?!\\)/g,
                ot = {
                    ID: new RegExp("^#(" + G + ")"),
                    CLASS: new RegExp("^\\.(" + G + ")"),
                    NAME: new RegExp("^\\[name=['\"]?(" + G + ")['\"]?\\]"),
                    TAG: new RegExp("^(" + G.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + z),
                    PSEUDO: new RegExp("^" + U),
                    POS: new RegExp(K, "i"),
                    CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + V + "*(even|odd|(([+-]|)(\\d*)n|)" + V + "*(?:([+-]|)" + V + "*(\\d+)|))" + V + "*\\)|)", "i"),
                    needsContext: new RegExp("^" + V + "*[>+~]|" + K, "i")
                },
                st = function(t) {
                    var e = P.createElement("div");
                    try {
                        return t(e)
                    } catch (t) {
                        return !1
                    } finally {
                        e = null
                    }
                },
                lt = st(function(t) {
                    return t.appendChild(P.createComment("")), !t.getElementsByTagName("*").length
                }),
                ut = st(function(t) {
                    return t.innerHTML = "<a href='#'></a>", t.firstChild && typeof t.firstChild.getAttribute !== F && "#" === t.firstChild.getAttribute("href")
                }),
                ct = st(function(t) {
                    t.innerHTML = "<select></select>";
                    var e = typeof t.lastChild.getAttribute("multiple");
                    return "boolean" !== e && "string" !== e
                }),
                dt = st(function(t) {
                    return t.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !(!t.getElementsByClassName || !t.getElementsByClassName("e").length) && (t.lastChild.className = "e", 2 === t.getElementsByClassName("e").length)
                }),
                ht = st(function(t) {
                    t.id = M + 0, t.innerHTML = "<a name='" + M + "'></a><div name='" + M + "'></div>", O.insertBefore(t, O.firstChild);
                    var e = P.getElementsByName && P.getElementsByName(M).length === 2 + P.getElementsByName(M + 0).length;
                    return y = !P.getElementById(M), O.removeChild(t), e
                });
            try {
                I.call(O.childNodes, 0)[0].nodeType
            } catch (t) {
                I = function(t) {
                    for (var e, n = []; e = this[t]; t++) n.push(e);
                    return n
                }
            }
            n.matches = function(t, e) {
                return n(t, null, null, e)
            }, n.matchesSelector = function(t, e) {
                return n(e, null, null, [t]).length > 0
            }, k = n.getText = function(t) {
                var e, n = "",
                    i = 0,
                    r = t.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) n += k(t)
                    } else if (3 === r || 4 === r) return t.nodeValue
                } else
                    for (; e = t[i]; i++) n += k(e);
                return n
            }, w = n.isXML = function(t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return !!e && "HTML" !== e.nodeName
            }, x = n.contains = O.contains ? function(t, e) {
                var n = 9 === t.nodeType ? t.documentElement : t,
                    i = e && e.parentNode;
                return t === i || !!(i && 1 === i.nodeType && n.contains && n.contains(i))
            } : O.compareDocumentPosition ? function(t, e) {
                return e && !!(16 & t.compareDocumentPosition(e))
            } : function(t, e) {
                for (; e = e.parentNode;)
                    if (e === t) return !0;
                return !1
            }, n.attr = function(t, e) {
                var n, i = w(t);
                return i || (e = e.toLowerCase()), (n = b.attrHandle[e]) ? n(t) : i || ct ? t.getAttribute(e) : (n = t.getAttributeNode(e), n ? "boolean" == typeof t[e] ? t[e] ? e : null : n.specified ? n.value : null : null)
            }, b = n.selectors = {
                cacheLength: 50,
                createPseudo: R,
                match: ot,
                attrHandle: ut ? {} : {
                    href: function(t) {
                        return t.getAttribute("href", 2)
                    },
                    type: function(t) {
                        return t.getAttribute("type")
                    }
                },
                find: {
                    ID: y ? function(t, e, n) {
                        if (typeof e.getElementById !== F && !n) {
                            var i = e.getElementById(t);
                            return i && i.parentNode ? [i] : []
                        }
                    } : function(t, e, n) {
                        if (typeof e.getElementById !== F && !n) {
                            var i = e.getElementById(t);
                            return i ? i.id === t || typeof i.getAttributeNode !== F && i.getAttributeNode("id").value === t ? [i] : void 0 : []
                        }
                    },
                    TAG: lt ? function(t, e) {
                        if (typeof e.getElementsByTagName !== F) return e.getElementsByTagName(t)
                    } : function(t, e) {
                        var n = e.getElementsByTagName(t);
                        if ("*" === t) {
                            for (var i, r = [], a = 0; i = n[a]; a++) 1 === i.nodeType && r.push(i);
                            return r
                        }
                        return n
                    },
                    NAME: ht && function(t, e) {
                        if (typeof e.getElementsByName !== F) return e.getElementsByName(name)
                    },
                    CLASS: dt && function(t, e, n) {
                        if (typeof e.getElementsByClassName !== F && !n) return e.getElementsByClassName(t)
                    }
                },
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(t) {
                        return t[1] = t[1].replace(at, ""), t[3] = (t[4] || t[5] || "").replace(at, ""), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    },
                    CHILD: function(t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1] ? (t[2] || n.error(t[0]), t[3] = +(t[3] ? t[4] + (t[5] || 1) : 2 * ("even" === t[2] || "odd" === t[2])), t[4] = +(t[6] + t[7] || "odd" === t[2])) : t[2] && n.error(t[0]), t
                    },
                    PSEUDO: function(t) {
                        var e, n;
                        return ot.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[3] : (e = t[4]) && (tt.test(e) && (n = s(e, !0)) && (n = e.indexOf(")", e.length - n) - e.length) && (e = e.slice(0, n), t[0] = t[0].slice(0, n)), t[2] = e), t.slice(0, 3))
                    }
                },
                filter: {
                    ID: y ? function(t) {
                        return t = t.replace(at, ""),
                            function(e) {
                                return e.getAttribute("id") === t
                            }
                    } : function(t) {
                        return t = t.replace(at, ""),
                            function(e) {
                                var n = typeof e.getAttributeNode !== F && e.getAttributeNode("id");
                                return n && n.value === t
                            }
                    },
                    TAG: function(t) {
                        return "*" === t ? function() {
                            return !0
                        } : (t = t.replace(at, "").toLowerCase(), function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        })
                    },
                    CLASS: function(t) {
                        var e = W[M][t + " "];
                        return e || (e = new RegExp("(^|" + V + ")" + t + "(" + V + "|$)")) && W(t, function(t) {
                            return e.test(t.className || typeof t.getAttribute !== F && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, e, i) {
                        return function(r, a) {
                            var o = n.attr(r, t);
                            return null == o ? "!=" === e : !e || (o += "", "=" === e ? o === i : "!=" === e ? o !== i : "^=" === e ? i && 0 === o.indexOf(i) : "*=" === e ? i && o.indexOf(i) > -1 : "$=" === e ? i && o.substr(o.length - i.length) === i : "~=" === e ? (" " + o + " ").indexOf(i) > -1 : "|=" === e && (o === i || o.substr(0, i.length + 1) === i + "-"))
                        }
                    },
                    CHILD: function(t, e, n, i) {
                        return "nth" === t ? function(t) {
                            var e, r, a = t.parentNode;
                            if (1 === n && 0 === i) return !0;
                            if (a)
                                for (r = 0, e = a.firstChild; e && (1 !== e.nodeType || (r++, t !== e)); e = e.nextSibling);
                            return (r -= i) === n || r % n == 0 && r / n >= 0
                        } : function(e) {
                            var n = e;
                            switch (t) {
                                case "only":
                                case "first":
                                    for (; n = n.previousSibling;)
                                        if (1 === n.nodeType) return !1;
                                    if ("first" === t) return !0;
                                    n = e;
                                case "last":
                                    for (; n = n.nextSibling;)
                                        if (1 === n.nodeType) return !1;
                                    return !0
                            }
                        }
                    },
                    PSEUDO: function(t, e) {
                        var i, r = b.pseudos[t] || b.setFilters[t.toLowerCase()] || n.error("unsupported pseudo: " + t);
                        return r[M] ? r(e) : r.length > 1 ? (i = [t, t, "", e], b.setFilters.hasOwnProperty(t.toLowerCase()) ? R(function(t, n) {
                            for (var i, a = r(t, e), o = a.length; o--;) i = H.call(t, a[o]), t[i] = !(n[i] = a[o])
                        }) : function(t) {
                            return r(t, 0, i)
                        }) : r
                    }
                },
                pseudos: {
                    not: R(function(t) {
                        var e = [],
                            n = [],
                            i = _(t.replace(Q, "$1"));
                        return i[M] ? R(function(t, e, n, r) {
                            for (var a, o = i(t, null, r, []), s = t.length; s--;)(a = o[s]) && (t[s] = !(e[s] = a))
                        }) : function(t, r, a) {
                            return e[0] = t, i(e, null, a, n), !n.pop()
                        }
                    }),
                    has: R(function(t) {
                        return function(e) {
                            return n(t, e).length > 0
                        }
                    }),
                    contains: R(function(t) {
                        return function(e) {
                            return (e.textContent || e.innerText || k(e)).indexOf(t) > -1
                        }
                    }),
                    enabled: function(t) {
                        return !1 === t.disabled
                    },
                    disabled: function(t) {
                        return !0 === t.disabled
                    },
                    checked: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    },
                    selected: function(t) {
                        return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                    },
                    parent: function(t) {
                        return !b.pseudos.empty(t)
                    },
                    empty: function(t) {
                        var e;
                        for (t = t.firstChild; t;) {
                            if (t.nodeName > "@" || 3 === (e = t.nodeType) || 4 === e) return !1;
                            t = t.nextSibling
                        }
                        return !0
                    },
                    header: function(t) {
                        return it.test(t.nodeName)
                    },
                    text: function(t) {
                        var e, n;
                        return "input" === t.nodeName.toLowerCase() && "text" === (e = t.type) && (null == (n = t.getAttribute("type")) || n.toLowerCase() === e)
                    },
                    radio: i("radio"),
                    checkbox: i("checkbox"),
                    file: i("file"),
                    password: i("password"),
                    image: i("image"),
                    submits: r("submits"),
                    reset: r("reset"),
                    button: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    },
                    input: function(t) {
                        return rt.test(t.nodeName)
                    },
                    focus: function(t) {
                        var e = t.ownerDocument;
                        return t === e.activeElement && (!e.hasFocus || e.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    },
                    active: function(t) {
                        return t === t.ownerDocument.activeElement
                    },
                    first: a(function() {
                        return [0]
                    }),
                    last: a(function(t, e) {
                        return [e - 1]
                    }),
                    eq: a(function(t, e, n) {
                        return [n < 0 ? n + e : n]
                    }),
                    even: a(function(t, e) {
                        for (var n = 0; n < e; n += 2) t.push(n);
                        return t
                    }),
                    odd: a(function(t, e) {
                        for (var n = 1; n < e; n += 2) t.push(n);
                        return t
                    }),
                    lt: a(function(t, e, n) {
                        for (var i = n < 0 ? n + e : n; --i >= 0;) t.push(i);
                        return t
                    }),
                    gt: a(function(t, e, n) {
                        for (var i = n < 0 ? n + e : n; ++i < e;) t.push(i);
                        return t
                    })
                }
            }, C = O.compareDocumentPosition ? function(t, e) {
                return t === e ? (S = !0, 0) : (t.compareDocumentPosition && e.compareDocumentPosition ? 4 & t.compareDocumentPosition(e) : t.compareDocumentPosition) ? -1 : 1
            } : function(t, e) {
                if (t === e) return S = !0, 0;
                if (t.sourceIndex && e.sourceIndex) return t.sourceIndex - e.sourceIndex;
                var n, i, r = [],
                    a = [],
                    s = t.parentNode,
                    l = e.parentNode,
                    u = s;
                if (s === l) return o(t, e);
                if (!s) return -1;
                if (!l) return 1;
                for (; u;) r.unshift(u), u = u.parentNode;
                for (u = l; u;) a.unshift(u), u = u.parentNode;
                n = r.length, i = a.length;
                for (var c = 0; c < n && c < i; c++)
                    if (r[c] !== a[c]) return o(r[c], a[c]);
                return c === n ? o(t, a[c], -1) : o(r[c], e, 1)
            }, [0, 0].sort(C), T = !S, n.uniqueSort = function(t) {
                var e, n = [],
                    i = 1,
                    r = 0;
                if (S = T, t.sort(C), S) {
                    for (; e = t[i]; i++) e === t[i - 1] && (r = n.push(i));
                    for (; r--;) t.splice(n[r], 1)
                }
                return t
            }, n.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, _ = n.compile = function(t, e) {
                var n, i = [],
                    r = [],
                    a = $[M][t + " "];
                if (!a) {
                    for (e || (e = s(t)), n = e.length; n--;) a = h(e[n]), a[M] ? i.push(a) : r.push(a);
                    a = $(t, f(r, i))
                }
                return a
            }, P.querySelectorAll && function() {
                var t, e = m,
                    i = /'|\\/g,
                    r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                    a = [":focus"],
                    o = [":active"],
                    l = O.matchesSelector || O.mozMatchesSelector || O.webkitMatchesSelector || O.oMatchesSelector || O.msMatchesSelector;
                st(function(t) {
                    t.innerHTML = "<select><option selected=''></option></select>", t.querySelectorAll("[selected]").length || a.push("\\[" + V + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), t.querySelectorAll(":checked").length || a.push(":checked")
                }), st(function(t) {
                    t.innerHTML = "<p test=''></p>", t.querySelectorAll("[test^='']").length && a.push("[*^$]=" + V + "*(?:\"\"|'')"), t.innerHTML = "<input type='hidden'/>", t.querySelectorAll(":enabled").length || a.push(":enabled", ":disabled")
                }), a = new RegExp(a.join("|")), m = function(t, n, r, o, l) {
                    if (!o && !l && !a.test(t)) {
                        var u, c, d = !0,
                            h = M,
                            f = n,
                            p = 9 === n.nodeType && t;
                        if (1 === n.nodeType && "object" !== n.nodeName.toLowerCase()) {
                            for (u = s(t), (d = n.getAttribute("id")) ? h = d.replace(i, "\\$&") : n.setAttribute("id", h), h = "[id='" + h + "'] ",
                                c = u.length; c--;) u[c] = h + u[c].join("");
                            f = nt.test(t) && n.parentNode || n, p = u.join(",")
                        }
                        if (p) try {
                            return j.apply(r, I.call(f.querySelectorAll(p), 0)), r
                        } catch (t) {} finally {
                            d || n.removeAttribute("id")
                        }
                    }
                    return e(t, n, r, o, l)
                }, l && (st(function(e) {
                    t = l.call(e, "div");
                    try {
                        l.call(e, "[test!='']:sizzle"), o.push("!=", U)
                    } catch (t) {}
                }), o = new RegExp(o.join("|")), n.matchesSelector = function(e, i) {
                    if (i = i.replace(r, "='$1']"), !w(e) && !o.test(i) && !a.test(i)) try {
                        var s = l.call(e, i);
                        if (s || t || e.document && 11 !== e.document.nodeType) return s
                    } catch (t) {}
                    return n(i, null, null, [e]).length > 0
                })
            }(), b.pseudos.nth = b.pseudos.eq, b.filters = g.prototype = b.pseudos, b.setFilters = new g, n.attr = Z.attr, Z.find = n, Z.expr = n.selectors, Z.expr[":"] = Z.expr.pseudos, Z.unique = n.uniqueSort, Z.text = n.getText, Z.isXMLDoc = n.isXML, Z.contains = n.contains
        }(t);
    var Lt = /Until$/,
        Nt = /^(?:parents|prev(?:Until|All))/,
        jt = /^.[^:#\[\.,]*$/,
        It = Z.expr.match.needsContext,
        Ht = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    Z.fn.extend({
        find: function(t) {
            var e, n, i, r, a, o, s = this;
            if ("string" != typeof t) return Z(t).filter(function() {
                for (e = 0, n = s.length; e < n; e++)
                    if (Z.contains(s[e], this)) return !0
            });
            for (o = this.pushStack("", "find", t), e = 0, n = this.length; e < n; e++)
                if (i = o.length, Z.find(t, this[e], o), e > 0)
                    for (r = i; r < o.length; r++)
                        for (a = 0; a < i; a++)
                            if (o[a] === o[r]) {
                                o.splice(r--, 1);
                                break
                            }
            return o
        },
        has: function(t) {
            var e, n = Z(t, this),
                i = n.length;
            return this.filter(function() {
                for (e = 0; e < i; e++)
                    if (Z.contains(this, n[e])) return !0
            })
        },
        not: function(t) {
            return this.pushStack(u(this, t, !1), "not", t)
        },
        filter: function(t) {
            return this.pushStack(u(this, t, !0), "filter", t)
        },
        is: function(t) {
            return !!t && ("string" == typeof t ? It.test(t) ? Z(t, this.context).index(this[0]) >= 0 : Z.filter(t, this).length > 0 : this.filter(t).length > 0)
        },
        closest: function(t, e) {
            for (var n, i = 0, r = this.length, a = [], o = It.test(t) || "string" != typeof t ? Z(t, e || this.context) : 0; i < r; i++)
                for (n = this[i]; n && n.ownerDocument && n !== e && 11 !== n.nodeType;) {
                    if (o ? o.index(n) > -1 : Z.find.matchesSelector(n, t)) {
                        a.push(n);
                        break
                    }
                    n = n.parentNode
                }
            return a = a.length > 1 ? Z.unique(a) : a, this.pushStack(a, "closest", t)
        },
        index: function(t) {
            return t ? "string" == typeof t ? Z.inArray(this[0], Z(t)) : Z.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(t, e) {
            var n = "string" == typeof t ? Z(t, e) : Z.makeArray(t && t.nodeType ? [t] : t),
                i = Z.merge(this.get(), n);
            return this.pushStack(s(n[0]) || s(i[0]) ? i : Z.unique(i))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), Z.fn.andSelf = Z.fn.addBack, Z.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return Z.dir(t, "parentNode")
        },
        parentsUntil: function(t, e, n) {
            return Z.dir(t, "parentNode", n)
        },
        next: function(t) {
            return l(t, "nextSibling")
        },
        prev: function(t) {
            return l(t, "previousSibling")
        },
        nextAll: function(t) {
            return Z.dir(t, "nextSibling")
        },
        prevAll: function(t) {
            return Z.dir(t, "previousSibling")
        },
        nextUntil: function(t, e, n) {
            return Z.dir(t, "nextSibling", n)
        },
        prevUntil: function(t, e, n) {
            return Z.dir(t, "previousSibling", n)
        },
        siblings: function(t) {
            return Z.sibling((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return Z.sibling(t.firstChild)
        },
        contents: function(t) {
            return Z.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : Z.merge([], t.childNodes)
        }
    }, function(t, e) {
        Z.fn[t] = function(n, i) {
            var r = Z.map(this, e, n);
            return Lt.test(t) || (i = n), i && "string" == typeof i && (r = Z.filter(i, r)), r = this.length > 1 && !Ht[t] ? Z.unique(r) : r, this.length > 1 && Nt.test(t) && (r = r.reverse()), this.pushStack(r, t, z.call(arguments).join(","))
        }
    }), Z.extend({
        filter: function(t, e, n) {
            return n && (t = ":not(" + t + ")"), 1 === e.length ? Z.find.matchesSelector(e[0], t) ? [e[0]] : [] : Z.find.matches(t, e)
        },
        dir: function(t, n, i) {
            for (var r = [], a = t[n]; a && 9 !== a.nodeType && (i === e || 1 !== a.nodeType || !Z(a).is(i));) 1 === a.nodeType && r.push(a), a = a[n];
            return r
        },
        sibling: function(t, e) {
            for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
            return n
        }
    });
    var Rt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Yt = / jQuery\d+="(?:null|\d+)"/g,
        Wt = /^\s+/,
        Bt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        $t = /<([\w:]+)/,
        Vt = /<tbody/i,
        Gt = /<|&#?\w+;/,
        qt = /<(?:script|style|link)/i,
        zt = /<(?:script|object|embed|option|style)/i,
        Ut = new RegExp("<(?:" + Rt + ")[\\s/>]", "i"),
        Kt = /^(?:checkbox|radio)$/,
        Qt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Xt = /\/(java|ecma)script/i,
        Zt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        Jt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        te = c(W),
        ee = te.appendChild(W.createElement("div"));
    Jt.optgroup = Jt.option, Jt.tbody = Jt.tfoot = Jt.colgroup = Jt.caption = Jt.thead, Jt.th = Jt.td, Z.support.htmlSerialize || (Jt._default = [1, "X<div>", "</div>"]), Z.fn.extend({
            text: function(t) {
                return Z.access(this, function(t) {
                    return t === e ? Z.text(this) : this.empty().append((this[0] && this[0].ownerDocument || W).createTextNode(t))
                }, null, t, arguments.length)
            },
            wrapAll: function(t) {
                if (Z.isFunction(t)) return this.each(function(e) {
                    Z(this).wrapAll(t.call(this, e))
                });
                if (this[0]) {
                    var e = Z(t, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                        for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                        return t
                    }).append(this)
                }
                return this
            },
            wrapInner: function(t) {
                return Z.isFunction(t) ? this.each(function(e) {
                    Z(this).wrapInner(t.call(this, e))
                }) : this.each(function() {
                    var e = Z(this),
                        n = e.contents();
                    n.length ? n.wrapAll(t) : e.append(t)
                })
            },
            wrap: function(t) {
                var e = Z.isFunction(t);
                return this.each(function(n) {
                    Z(this).wrapAll(e ? t.call(this, n) : t)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes)
                }).end()
            },
            append: function() {
                return this.domManip(arguments, !0, function(t) {
                    (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(t)
                })
            },
            prepend: function() {
                return this.domManip(arguments, !0, function(t) {
                    (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(t, this.firstChild)
                })
            },
            before: function() {
                if (!s(this[0])) return this.domManip(arguments, !1, function(t) {
                    this.parentNode.insertBefore(t, this)
                });
                if (arguments.length) {
                    var t = Z.clean(arguments);
                    return this.pushStack(Z.merge(t, this), "before", this.selector)
                }
            },
            after: function() {
                if (!s(this[0])) return this.domManip(arguments, !1, function(t) {
                    this.parentNode.insertBefore(t, this.nextSibling)
                });
                if (arguments.length) {
                    var t = Z.clean(arguments);
                    return this.pushStack(Z.merge(this, t), "after", this.selector)
                }
            },
            remove: function(t, e) {
                for (var n, i = 0; null != (n = this[i]); i++) t && !Z.filter(t, [n]).length || (!e && 1 === n.nodeType && (Z.cleanData(n.getElementsByTagName("*")), Z.cleanData([n])), n.parentNode && n.parentNode.removeChild(n));
                return this
            },
            empty: function() {
                for (var t, e = 0; null != (t = this[e]); e++)
                    for (1 === t.nodeType && Z.cleanData(t.getElementsByTagName("*")); t.firstChild;) t.removeChild(t.firstChild);
                return this
            },
            clone: function(t, e) {
                return t = null != t && t, e = null == e ? t : e, this.map(function() {
                    return Z.clone(this, t, e)
                })
            },
            html: function(t) {
                return Z.access(this, function(t) {
                    var n = this[0] || {},
                        i = 0,
                        r = this.length;
                    if (t === e) return 1 === n.nodeType ? n.innerHTML.replace(Yt, "") : e;
                    if ("string" == typeof t && !qt.test(t) && (Z.support.htmlSerialize || !Ut.test(t)) && (Z.support.leadingWhitespace || !Wt.test(t)) && !Jt[($t.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = t.replace(Bt, "<$1></$2>");
                        try {
                            for (; i < r; i++) n = this[i] || {}, 1 === n.nodeType && (Z.cleanData(n.getElementsByTagName("*")), n.innerHTML = t);
                            n = 0
                        } catch (t) {}
                    }
                    n && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function(t) {
                return s(this[0]) ? this.length ? this.pushStack(Z(Z.isFunction(t) ? t() : t), "replaceWith", t) : this : Z.isFunction(t) ? this.each(function(e) {
                    var n = Z(this),
                        i = n.html();
                    n.replaceWith(t.call(this, e, i))
                }) : ("string" != typeof t && (t = Z(t).detach()), this.each(function() {
                    var e = this.nextSibling,
                        n = this.parentNode;
                    Z(this).remove(), e ? Z(e).before(t) : Z(n).append(t)
                }))
            },
            detach: function(t) {
                return this.remove(t, !0)
            },
            domManip: function(t, n, i) {
                t = [].concat.apply([], t);
                var r, a, o, s, l = 0,
                    u = t[0],
                    c = [],
                    h = this.length;
                if (!Z.support.checkClone && h > 1 && "string" == typeof u && Qt.test(u)) return this.each(function() {
                    Z(this).domManip(t, n, i)
                });
                if (Z.isFunction(u)) return this.each(function(r) {
                    var a = Z(this);
                    t[0] = u.call(this, r, n ? a.html() : e), a.domManip(t, n, i)
                });
                if (this[0]) {
                    if (r = Z.buildFragment(t, this, c), o = r.fragment, a = o.firstChild, 1 === o.childNodes.length && (o = a), a)
                        for (n = n && Z.nodeName(a, "tr"), s = r.cacheable || h - 1; l < h; l++) i.call(n && Z.nodeName(this[l], "table") ? d(this[l], "tbody") : this[l], l === s ? o : Z.clone(o, !0, !0));
                    o = a = null, c.length && Z.each(c, function(t, e) {
                        e.src ? Z.ajax ? Z.ajax({
                            url: e.src,
                            type: "GET",
                            dataType: "script",
                            async: !1,
                            global: !1,
                            throws: !0
                        }) : Z.error("no ajax") : Z.globalEval((e.text || e.textContent || e.innerHTML || "").replace(Zt, "")), e.parentNode && e.parentNode.removeChild(e)
                    })
                }
                return this
            }
        }), Z.buildFragment = function(t, n, i) {
            var r, a, o, s = t[0];
            return n = n || W, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, 1 === t.length && "string" == typeof s && s.length < 512 && n === W && "<" === s.charAt(0) && !zt.test(s) && (Z.support.checkClone || !Qt.test(s)) && (Z.support.html5Clone || !Ut.test(s)) && (a = !0, r = Z.fragments[s], o = r !== e), r || (r = n.createDocumentFragment(), Z.clean(t, n, r, i), a && (Z.fragments[s] = o && r)), {
                fragment: r,
                cacheable: a
            }
        }, Z.fragments = {}, Z.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, e) {
            Z.fn[t] = function(n) {
                var i, r = 0,
                    a = [],
                    o = Z(n),
                    s = o.length,
                    l = 1 === this.length && this[0].parentNode;
                if ((null == l || l && 11 === l.nodeType && 1 === l.childNodes.length) && 1 === s) return o[e](this[0]), this;
                for (; r < s; r++) i = (r > 0 ? this.clone(!0) : this).get(), Z(o[r])[e](i), a = a.concat(i);
                return this.pushStack(a, t, o.selector)
            }
        }), Z.extend({
            clone: function(t, e, n) {
                var i, r, a, o;
                if (Z.support.html5Clone || Z.isXMLDoc(t) || !Ut.test("<" + t.nodeName + ">") ? o = t.cloneNode(!0) : (ee.innerHTML = t.outerHTML, ee.removeChild(o = ee.firstChild)), !(Z.support.noCloneEvent && Z.support.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || Z.isXMLDoc(t)))
                    for (f(t, o), i = p(t), r = p(o), a = 0; i[a]; ++a) r[a] && f(i[a], r[a]);
                if (e && (h(t, o), n))
                    for (i = p(t), r = p(o), a = 0; i[a]; ++a) h(i[a], r[a]);
                return i = r = null, o
            },
            clean: function(t, e, n, i) {
                var r, a, o, s, l, u, d, h, f, p, g, v = e === W && te,
                    y = [];
                for (e && void 0 !== e.createDocumentFragment || (e = W), r = 0; null != (o = t[r]); r++)
                    if ("number" == typeof o && (o += ""), o) {
                        if ("string" == typeof o)
                            if (Gt.test(o)) {
                                for (v = v || c(e), d = e.createElement("div"), v.appendChild(d), o = o.replace(Bt, "<$1></$2>"), s = ($t.exec(o) || ["", ""])[1].toLowerCase(), l = Jt[s] || Jt._default, u = l[0], d.innerHTML = l[1] + o + l[2]; u--;) d = d.lastChild;
                                if (!Z.support.tbody)
                                    for (h = Vt.test(o), f = "table" !== s || h ? "<table>" !== l[1] || h ? [] : d.childNodes : d.firstChild && d.firstChild.childNodes, a = f.length - 1; a >= 0; --a) Z.nodeName(f[a], "tbody") && !f[a].childNodes.length && f[a].parentNode.removeChild(f[a]);
                                !Z.support.leadingWhitespace && Wt.test(o) && d.insertBefore(e.createTextNode(Wt.exec(o)[0]), d.firstChild), o = d.childNodes, d.parentNode.removeChild(d)
                            } else o = e.createTextNode(o);
                        o.nodeType ? y.push(o) : Z.merge(y, o)
                    }
                if (d && (o = d = v = null), !Z.support.appendChecked)
                    for (r = 0; null != (o = y[r]); r++) Z.nodeName(o, "input") ? m(o) : void 0 !== o.getElementsByTagName && Z.grep(o.getElementsByTagName("input"), m);
                if (n)
                    for (p = function(t) {
                            if (!t.type || Xt.test(t.type)) return i ? i.push(t.parentNode ? t.parentNode.removeChild(t) : t) : n.appendChild(t)
                        }, r = 0; null != (o = y[r]); r++) Z.nodeName(o, "script") && p(o) || (n.appendChild(o), void 0 !== o.getElementsByTagName && (g = Z.grep(Z.merge([], o.getElementsByTagName("script")), p), y.splice.apply(y, [r + 1, 0].concat(g)), r += g.length));
                return y
            },
            cleanData: function(t, e) {
                for (var n, i, r, a, o = 0, s = Z.expando, l = Z.cache, u = Z.support.deleteExpando, c = Z.event.special; null != (r = t[o]); o++)
                    if ((e || Z.acceptData(r)) && (i = r[s], n = i && l[i])) {
                        if (n.events)
                            for (a in n.events) c[a] ? Z.event.remove(r, a) : Z.removeEvent(r, a, n.handle);
                        l[i] && (delete l[i], u ? delete r[s] : r.removeAttribute ? r.removeAttribute(s) : r[s] = null, Z.deletedIds.push(i))
                    }
            }
        }),
        function() {
            var t, e;
            Z.uaMatch = function(t) {
                t = t.toLowerCase();
                var e = /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
                return {
                    browser: e[1] || "",
                    version: e[2] || "0"
                }
            }, t = Z.uaMatch($.userAgent), e = {}, t.browser && (e[t.browser] = !0, e.version = t.version), e.chrome ? e.webkit = !0 : e.webkit && (e.safari = !0), Z.browser = e, Z.sub = function() {
                function t(e, n) {
                    return new t.fn.init(e, n)
                }
                Z.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function(n, i) {
                    return i && i instanceof Z && !(i instanceof t) && (i = t(i)), Z.fn.init.call(this, n, i, e)
                }, t.fn.init.prototype = t.fn;
                var e = t(W);
                return t
            }
        }();
    var ne, ie, re, ae = /alpha\([^)]*\)/i,
        oe = /opacity=([^)]*)/,
        se = /^(top|right|bottom|left)$/,
        le = /^(none|table(?!-c[ea]).+)/,
        ue = /^margin/,
        ce = new RegExp("^(" + J + ")(.*)$", "i"),
        de = new RegExp("^(" + J + ")(?!px)[a-z%]+$", "i"),
        he = new RegExp("^([-+])=(" + J + ")", "i"),
        fe = {
            BODY: "block"
        },
        pe = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        me = {
            letterSpacing: 0,
            fontWeight: 400
        },
        ge = ["Top", "Right", "Bottom", "Left"],
        ve = ["Webkit", "O", "Moz", "ms"],
        ye = Z.fn.toggle;
    Z.fn.extend({
        css: function(t, n) {
            return Z.access(this, function(t, n, i) {
                return i !== e ? Z.style(t, n, i) : Z.css(t, n)
            }, t, n, arguments.length > 1)
        },
        show: function() {
            return y(this, !0)
        },
        hide: function() {
            return y(this)
        },
        toggle: function(t, e) {
            var n = "boolean" == typeof t;
            return Z.isFunction(t) && Z.isFunction(e) ? ye.apply(this, arguments) : this.each(function() {
                (n ? t : v(this)) ? Z(this).show(): Z(this).hide()
            })
        }
    }), Z.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var n = ne(t, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: Z.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(t, n, i, r) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var a, o, s, l = Z.camelCase(n),
                    u = t.style;
                if (n = Z.cssProps[l] || (Z.cssProps[l] = g(u, l)), s = Z.cssHooks[n] || Z.cssHooks[l], i === e) return s && "get" in s && (a = s.get(t, !1, r)) !== e ? a : u[n];
                if ("string" === (o = typeof i) && (a = he.exec(i)) && (i = (a[1] + 1) * a[2] + parseFloat(Z.css(t, n)), o = "number"), !(null == i || "number" === o && isNaN(i) || ("number" === o && !Z.cssNumber[l] && (i += "px"), s && "set" in s && (i = s.set(t, i, r)) === e))) try {
                    u[n] = i
                } catch (t) {}
            }
        },
        css: function(t, n, i, r) {
            var a, o, s, l = Z.camelCase(n);
            return n = Z.cssProps[l] || (Z.cssProps[l] = g(t.style, l)), s = Z.cssHooks[n] || Z.cssHooks[l], s && "get" in s && (a = s.get(t, !0, r)), a === e && (a = ne(t, n)), "normal" === a && n in me && (a = me[n]), i || r !== e ? (o = parseFloat(a), i || Z.isNumeric(o) ? o || 0 : a) : a
        },
        swap: function(t, e, n) {
            var i, r, a = {};
            for (r in e) a[r] = t.style[r], t.style[r] = e[r];
            i = n.call(t);
            for (r in e) t.style[r] = a[r];
            return i
        }
    }), t.getComputedStyle ? ne = function(e, n) {
        var i, r, a, o, s = t.getComputedStyle(e, null),
            l = e.style;
        return s && (i = s.getPropertyValue(n) || s[n], "" === i && !Z.contains(e.ownerDocument, e) && (i = Z.style(e, n)), de.test(i) && ue.test(n) && (r = l.width, a = l.minWidth, o = l.maxWidth, l.minWidth = l.maxWidth = l.width = i, i = s.width, l.width = r, l.minWidth = a, l.maxWidth = o)), i
    } : W.documentElement.currentStyle && (ne = function(t, e) {
        var n, i, r = t.currentStyle && t.currentStyle[e],
            a = t.style;
        return null == r && a && a[e] && (r = a[e]), de.test(r) && !se.test(e) && (n = a.left, i = t.runtimeStyle && t.runtimeStyle.left, i && (t.runtimeStyle.left = t.currentStyle.left), a.left = "fontSize" === e ? "1em" : r, r = a.pixelLeft + "px", a.left = n, i && (t.runtimeStyle.left = i)), "" === r ? "auto" : r
    }), Z.each(["height", "width"], function(t, e) {
        Z.cssHooks[e] = {
            get: function(t, n, i) {
                if (n) return 0 === t.offsetWidth && le.test(ne(t, "display")) ? Z.swap(t, pe, function() {
                    return w(t, e, i)
                }) : w(t, e, i)
            },
            set: function(t, n, i) {
                return b(t, n, i ? k(t, e, i, Z.support.boxSizing && "border-box" === Z.css(t, "boxSizing")) : 0)
            }
        }
    }), Z.support.opacity || (Z.cssHooks.opacity = {
        get: function(t, e) {
            return oe.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        },
        set: function(t, e) {
            var n = t.style,
                i = t.currentStyle,
                r = Z.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                a = i && i.filter || n.filter || "";
            n.zoom = 1, e >= 1 && "" === Z.trim(a.replace(ae, "")) && n.removeAttribute && (n.removeAttribute("filter"), i && !i.filter) || (n.filter = ae.test(a) ? a.replace(ae, r) : a + " " + r)
        }
    }), Z(function() {
        Z.support.reliableMarginRight || (Z.cssHooks.marginRight = {
            get: function(t, e) {
                return Z.swap(t, {
                    display: "inline-block"
                }, function() {
                    if (e) return ne(t, "marginRight")
                })
            }
        }), !Z.support.pixelPosition && Z.fn.position && Z.each(["top", "left"], function(t, e) {
            Z.cssHooks[e] = {
                get: function(t, n) {
                    if (n) {
                        var i = ne(t, e);
                        return de.test(i) ? Z(t).position()[e] + "px" : i
                    }
                }
            }
        })
    }), Z.expr && Z.expr.filters && (Z.expr.filters.hidden = function(t) {
        return 0 === t.offsetWidth && 0 === t.offsetHeight || !Z.support.reliableHiddenOffsets && "none" === (t.style && t.style.display || ne(t, "display"))
    }, Z.expr.filters.visible = function(t) {
        return !Z.expr.filters.hidden(t)
    }), Z.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        Z.cssHooks[t + e] = {
            expand: function(n) {
                var i, r = "string" == typeof n ? n.split(" ") : [n],
                    a = {};
                for (i = 0; i < 4; i++) a[t + ge[i] + e] = r[i] || r[i - 2] || r[0];
                return a
            }
        }, ue.test(t) || (Z.cssHooks[t + e].set = b)
    });
    var be = /%20/g,
        ke = /\[\]$/,
        we = /\r?\n/g,
        xe = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        _e = /^(?:select|textarea)/i;
    Z.fn.extend({
        serialize: function() {
            return Z.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? Z.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || _e.test(this.nodeName) || xe.test(this.type))
            }).map(function(t, e) {
                var n = Z(this).val();
                return null == n ? null : Z.isArray(n) ? Z.map(n, function(t, n) {
                    return {
                        name: e.name,
                        value: t.replace(we, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: n.replace(we, "\r\n")
                }
            }).get()
        }
    }), Z.param = function(t, n) {
        var i, r = [],
            a = function(t, e) {
                e = Z.isFunction(e) ? e() : null == e ? "" : e, r[r.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
            };
        if (n === e && (n = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(t) || t.jquery && !Z.isPlainObject(t)) Z.each(t, function() {
            a(this.name, this.value)
        });
        else
            for (i in t) _(i, t[i], n, a);
        return r.join("&").replace(be, "+")
    };
    var Ce, Se, De = /#.*$/,
        Te = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Fe = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        Me = /^(?:GET|HEAD)$/,
        Ee = /^\/\//,
        Pe = /\?/,
        Oe = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        Ae = /([?&])_=[^&]*/,
        Le = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        Ne = Z.fn.load,
        je = {},
        Ie = {},
        He = ["*/"] + ["*"];
    try {
        Se = B.href
    } catch (t) {
        Se = W.createElement("a"), Se.href = "", Se = Se.href
    }
    Ce = Le.exec(Se.toLowerCase()) || [], Z.fn.load = function(t, n, i) {
        if ("string" != typeof t && Ne) return Ne.apply(this, arguments);
        if (!this.length) return this;
        var r, a, o, s = this,
            l = t.indexOf(" ");
        return l >= 0 && (r = t.slice(l, t.length), t = t.slice(0, l)), Z.isFunction(n) ? (i = n, n = e) : n && "object" == typeof n && (a = "POST"), Z.ajax({
            url: t,
            type: a,
            dataType: "html",
            data: n,
            complete: function(t, e) {
                i && s.each(i, o || [t.responseText, e, t])
            }
        }).done(function(t) {
            o = arguments, s.html(r ? Z("<div>").append(t.replace(Oe, "")).find(r) : t)
        }), this
    }, Z.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(t, e) {
        Z.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), Z.each(["get", "post"], function(t, n) {
        Z[n] = function(t, i, r, a) {
            return Z.isFunction(i) && (a = a || r, r = i, i = e), Z.ajax({
                type: n,
                url: t,
                data: i,
                success: r,
                dataType: a
            })
        }
    }), Z.extend({
        getScript: function(t, n) {
            return Z.get(t, e, n, "script")
        },
        getJSON: function(t, e, n) {
            return Z.get(t, e, n, "json")
        },
        ajaxSetup: function(t, e) {
            return e ? D(t, Z.ajaxSettings) : (e = t, t = Z.ajaxSettings), D(t, e), t
        },
        ajaxSettings: {
            url: Se,
            isLocal: Fe.test(Ce[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": He
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": t.String,
                "text html": !0,
                "text json": Z.parseJSON,
                "text xml": Z.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: C(je),
        ajaxTransport: C(Ie),
        ajax: function(t, n) {
            function i(t, n, i, o) {
                var u, d, y, b, w, _ = n;
                2 !== k && (k = 2, l && clearTimeout(l), s = e, a = o || "", x.readyState = t > 0 ? 4 : 0, i && (b = T(h, x, i)), t >= 200 && t < 300 || 304 === t ? (h.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (Z.lastModified[r] = w), (w = x.getResponseHeader("Etag")) && (Z.etag[r] = w)), 304 === t ? (_ = "notmodified", u = !0) : (u = F(h, b), _ = u.state, d = u.data, y = u.error, u = !y)) : (y = _, _ && !t || (_ = "error", t < 0 && (t = 0))), x.status = t, x.statusText = (n || _) + "", u ? m.resolveWith(f, [d, _, x]) : m.rejectWith(f, [x, _, y]), x.statusCode(v), v = e, c && p.trigger("ajax" + (u ? "Success" : "Error"), [x, h, u ? d : y]), g.fireWith(f, [x, _]), c && (p.trigger("ajaxComplete", [x, h]), --Z.active || Z.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t, t = e), n = n || {};
            var r, a, o, s, l, u, c, d, h = Z.ajaxSetup({}, n),
                f = h.context || h,
                p = f !== h && (f.nodeType || f instanceof Z) ? Z(f) : Z.event,
                m = Z.Deferred(),
                g = Z.Callbacks("once memory"),
                v = h.statusCode || {},
                y = {},
                b = {},
                k = 0,
                w = "canceled",
                x = {
                    readyState: 0,
                    setRequestHeader: function(t, e) {
                        if (!k) {
                            var n = t.toLowerCase();
                            t = b[n] = b[n] || t, y[t] = e
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return 2 === k ? a : null
                    },
                    getResponseHeader: function(t) {
                        var n;
                        if (2 === k) {
                            if (!o)
                                for (o = {}; n = Te.exec(a);) o[n[1].toLowerCase()] = n[2];
                            n = o[t.toLowerCase()]
                        }
                        return n === e ? null : n
                    },
                    overrideMimeType: function(t) {
                        return k || (h.mimeType = t), this
                    },
                    abort: function(t) {
                        return t = t || w, s && s.abort(t), i(0, t), this
                    }
                };
            if (m.promise(x), x.success = x.done, x.error = x.fail, x.complete = g.add, x.statusCode = function(t) {
                    if (t) {
                        var e;
                        if (k < 2)
                            for (e in t) v[e] = [v[e], t[e]];
                        else e = t[x.status], x.always(e)
                    }
                    return this
                }, h.url = ((t || h.url) + "").replace(De, "").replace(Ee, Ce[1] + "//"), h.dataTypes = Z.trim(h.dataType || "*").toLowerCase().split(et), null == h.crossDomain && (u = Le.exec(h.url.toLowerCase()), h.crossDomain = !(!u || u[1] === Ce[1] && u[2] === Ce[2] && (u[3] || ("http:" === u[1] ? 80 : 443)) == (Ce[3] || ("http:" === Ce[1] ? 80 : 443)))), h.data && h.processData && "string" != typeof h.data && (h.data = Z.param(h.data, h.traditional)), S(je, h, n, x), 2 === k) return x;
            if (c = h.global, h.type = h.type.toUpperCase(), h.hasContent = !Me.test(h.type), c && 0 == Z.active++ && Z.event.trigger("ajaxStart"), !h.hasContent && (h.data && (h.url += (Pe.test(h.url) ? "&" : "?") + h.data, delete h.data), r = h.url, !1 === h.cache)) {
                var _ = Z.now(),
                    C = h.url.replace(Ae, "$1_=" + _);
                h.url = C + (C === h.url ? (Pe.test(h.url) ? "&" : "?") + "_=" + _ : "")
            }(h.data && h.hasContent && !1 !== h.contentType || n.contentType) && x.setRequestHeader("Content-Type", h.contentType), h.ifModified && (r = r || h.url, Z.lastModified[r] && x.setRequestHeader("If-Modified-Since", Z.lastModified[r]), Z.etag[r] && x.setRequestHeader("If-None-Match", Z.etag[r])), x.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + He + "; q=0.01" : "") : h.accepts["*"]);
            for (d in h.headers) x.setRequestHeader(d, h.headers[d]);
            if (!h.beforeSend || !1 !== h.beforeSend.call(f, x, h) && 2 !== k) {
                w = "abort";
                for (d in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) x[d](h[d]);
                if (s = S(Ie, h, n, x)) {
                    x.readyState = 1, c && p.trigger("ajaxSend", [x, h]), h.async && h.timeout > 0 && (l = setTimeout(function() {
                        x.abort("timeout")
                    }, h.timeout));
                    try {
                        k = 1, s.send(y, i)
                    } catch (t) {
                        if (!(k < 2)) throw t;
                        i(-1, t)
                    }
                } else i(-1, "No Transport");
                return x
            }
            return x.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var Re = [],
        Ye = /\?/,
        We = /(=)\?(?=&|$)|\?\?/,
        Be = Z.now();
    Z.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = Re.pop() || Z.expando + "_" + Be++;
            return this[t] = !0, t
        }
    }), Z.ajaxPrefilter("json jsonp", function(n, i, r) {
        var a, o, s, l = n.data,
            u = n.url,
            c = !1 !== n.jsonp,
            d = c && We.test(u),
            h = c && !d && "string" == typeof l && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && We.test(l);
        if ("jsonp" === n.dataTypes[0] || d || h) return a = n.jsonpCallback = Z.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, o = t[a], d ? n.url = u.replace(We, "$1" + a) : h ? n.data = l.replace(We, "$1" + a) : c && (n.url += (Ye.test(u) ? "&" : "?") + n.jsonp + "=" + a), n.converters["script json"] = function() {
            return s || Z.error(a + " was not called"), s[0]
        }, n.dataTypes[0] = "json", t[a] = function() {
            s = arguments
        }, r.always(function() {
            t[a] = o, n[a] && (n.jsonpCallback = i.jsonpCallback, Re.push(a)), s && Z.isFunction(o) && o(s[0]), s = o = e
        }), "script"
    }), Z.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(t) {
                return Z.globalEval(t), t
            }
        }
    }), Z.ajaxPrefilter("script", function(t) {
        t.cache === e && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), Z.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var n, i = W.head || W.getElementsByTagName("head")[0] || W.documentElement;
            return {
                send: function(r, a) {
                    n = W.createElement("script"), n.async = "async", t.scriptCharset && (n.charset = t.scriptCharset), n.src = t.url, n.onload = n.onreadystatechange = function(t, r) {
                        (r || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, i && n.parentNode && i.removeChild(n), n = e, r || a(200, "success"))
                    }, i.insertBefore(n, i.firstChild)
                },
                abort: function() {
                    n && n.onload(0, 1)
                }
            }
        }
    });
    var $e, Ve = !!t.ActiveXObject && function() {
            for (var t in $e) $e[t](0, 1)
        },
        Ge = 0;
    Z.ajaxSettings.xhr = t.ActiveXObject ? function() {
            return !this.isLocal && M() || E()
        } : M,
        function(t) {
            Z.extend(Z.support, {
                ajax: !!t,
                cors: !!t && "withCredentials" in t
            })
        }(Z.ajaxSettings.xhr()), Z.support.ajax && Z.ajaxTransport(function(n) {
            if (!n.crossDomain || Z.support.cors) {
                var i;
                return {
                    send: function(r, a) {
                        var o, s, l = n.xhr();
                        if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields)
                            for (s in n.xhrFields) l[s] = n.xhrFields[s];
                        n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), !n.crossDomain && !r["X-Requested-With"] && (r["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (s in r) l.setRequestHeader(s, r[s])
                        } catch (t) {}
                        l.send(n.hasContent && n.data || null), i = function(t, r) {
                            var s, u, c, d, h;
                            try {
                                if (i && (r || 4 === l.readyState))
                                    if (i = e, o && (l.onreadystatechange = Z.noop, Ve && delete $e[o]), r) 4 !== l.readyState && l.abort();
                                    else {
                                        s = l.status, c = l.getAllResponseHeaders(), d = {}, (h = l.responseXML) && h.documentElement && (d.xml = h);
                                        try {
                                            d.text = l.responseText
                                        } catch (t) {}
                                        try {
                                            u = l.statusText
                                        } catch (t) {
                                            u = ""
                                        }
                                        s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = d.text ? 200 : 404
                                    }
                            } catch (t) {
                                r || a(-1, t)
                            }
                            d && a(s, u, d, c)
                        }, n.async ? 4 === l.readyState ? setTimeout(i, 0) : (o = ++Ge, Ve && ($e || ($e = {}, Z(t).unload(Ve)), $e[o] = i), l.onreadystatechange = i) : i()
                    },
                    abort: function() {
                        i && i(0, 1)
                    }
                }
            }
        });
    var qe, ze, Ue = /^(?:toggle|show|hide)$/,
        Ke = new RegExp("^(?:([-+])=|)(" + J + ")([a-z%]*)$", "i"),
        Qe = /queueHooks$/,
        Xe = [N],
        Ze = {
            "*": [function(t, e) {
                var n, i, r = this.createTween(t, e),
                    a = Ke.exec(e),
                    o = r.cur(),
                    s = +o || 0,
                    l = 1,
                    u = 20;
                if (a) {
                    if (n = +a[2], "px" !== (i = a[3] || (Z.cssNumber[t] ? "" : "px")) && s) {
                        s = Z.css(r.elem, t, !0) || n || 1;
                        do {
                            l = l || ".5", s /= l, Z.style(r.elem, t, s + i)
                        } while (l !== (l = r.cur() / o) && 1 !== l && --u)
                    }
                    r.unit = i, r.start = s, r.end = a[1] ? s + (a[1] + 1) * n : n
                }
                return r
            }]
        };
    Z.Animation = Z.extend(A, {
        tweener: function(t, e) {
            Z.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
            for (var n, i = 0, r = t.length; i < r; i++) n = t[i], Ze[n] = Ze[n] || [], Ze[n].unshift(e)
        },
        prefilter: function(t, e) {
            e ? Xe.unshift(t) : Xe.push(t)
        }
    }), Z.Tween = j, j.prototype = {
        constructor: j,
        init: function(t, e, n, i, r, a) {
            this.elem = t, this.prop = n, this.easing = r || "swing", this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = a || (Z.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var t = j.propHooks[this.prop];
            return t && t.get ? t.get(this) : j.propHooks._default.get(this)
        },
        run: function(t) {
            var e, n = j.propHooks[this.prop];
            return this.options.duration ? this.pos = e = Z.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : j.propHooks._default.set(this), this
        }
    }, j.prototype.init.prototype = j.prototype, j.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = Z.css(t.elem, t.prop, !1, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
            },
            set: function(t) {
                Z.fx.step[t.prop] ? Z.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[Z.cssProps[t.prop]] || Z.cssHooks[t.prop]) ? Z.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
            }
        }
    }, j.propHooks.scrollTop = j.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, Z.each(["toggle", "show", "hide"], function(t, e) {
        var n = Z.fn[e];
        Z.fn[e] = function(i, r, a) {
            return null == i || "boolean" == typeof i || !t && Z.isFunction(i) && Z.isFunction(r) ? n.apply(this, arguments) : this.animate(I(e, !0), i, r, a)
        }
    }), Z.fn.extend({
        fadeTo: function(t, e, n, i) {
            return this.filter(v).css("opacity", 0).show().end().animate({
                opacity: e
            }, t, n, i)
        },
        animate: function(t, e, n, i) {
            var r = Z.isEmptyObject(t),
                a = Z.speed(e, n, i),
                o = function() {
                    var e = A(this, Z.extend({}, t), a);
                    r && e.stop(!0)
                };
            return r || !1 === a.queue ? this.each(o) : this.queue(a.queue, o)
        },
        stop: function(t, n, i) {
            var r = function(t) {
                var e = t.stop;
                delete t.stop, e(i)
            };
            return "string" != typeof t && (i = n, n = t, t = e), n && !1 !== t && this.queue(t || "fx", []), this.each(function() {
                var e = !0,
                    n = null != t && t + "queueHooks",
                    a = Z.timers,
                    o = Z._data(this);
                if (n) o[n] && o[n].stop && r(o[n]);
                else
                    for (n in o) o[n] && o[n].stop && Qe.test(n) && r(o[n]);
                for (n = a.length; n--;) a[n].elem === this && (null == t || a[n].queue === t) && (a[n].anim.stop(i), e = !1, a.splice(n, 1));
                (e || !i) && Z.dequeue(this, t)
            })
        }
    }), Z.each({
        slideDown: I("show"),
        slideUp: I("hide"),
        slideToggle: I("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(t, e) {
        Z.fn[t] = function(t, n, i) {
            return this.animate(e, t, n, i)
        }
    }), Z.speed = function(t, e, n) {
        var i = t && "object" == typeof t ? Z.extend({}, t) : {
            complete: n || !n && e || Z.isFunction(t) && t,
            duration: t,
            easing: n && e || e && !Z.isFunction(e) && e
        };
        return i.duration = Z.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in Z.fx.speeds ? Z.fx.speeds[i.duration] : Z.fx.speeds._default, null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
            Z.isFunction(i.old) && i.old.call(this), i.queue && Z.dequeue(this, i.queue)
        }, i
    }, Z.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }
    }, Z.timers = [], Z.fx = j.prototype.init, Z.fx.tick = function() {
        var t, n = Z.timers,
            i = 0;
        for (qe = Z.now(); i < n.length; i++) !(t = n[i])() && n[i] === t && n.splice(i--, 1);
        n.length || Z.fx.stop(), qe = e
    }, Z.fx.timer = function(t) {
        t() && Z.timers.push(t) && !ze && (ze = setInterval(Z.fx.tick, Z.fx.interval))
    }, Z.fx.interval = 13, Z.fx.stop = function() {
        clearInterval(ze), ze = null
    }, Z.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, Z.fx.step = {}, Z.expr && Z.expr.filters && (Z.expr.filters.animated = function(t) {
        return Z.grep(Z.timers, function(e) {
            return t === e.elem
        }).length
    });
    var Je = /^(?:body|html)$/i;
    Z.fn.offset = function(t) {
        if (arguments.length) return t === e ? this : this.each(function(e) {
            Z.offset.setOffset(this, t, e)
        });
        var n, i, r, a, o, s, l, u = {
                top: 0,
                left: 0
            },
            c = this[0],
            d = c && c.ownerDocument;
        if (d) return (i = d.body) === c ? Z.offset.bodyOffset(c) : (n = d.documentElement, Z.contains(n, c) ? (void 0 !== c.getBoundingClientRect && (u = c.getBoundingClientRect()), r = H(d), a = n.clientTop || i.clientTop || 0, o = n.clientLeft || i.clientLeft || 0, s = r.pageYOffset || n.scrollTop, l = r.pageXOffset || n.scrollLeft, {
            top: u.top + s - a,
            left: u.left + l - o
        }) : u)
    }, Z.offset = {
        bodyOffset: function(t) {
            var e = t.offsetTop,
                n = t.offsetLeft;
            return Z.support.doesNotIncludeMarginInBodyOffset && (e += parseFloat(Z.css(t, "marginTop")) || 0, n += parseFloat(Z.css(t, "marginLeft")) || 0), {
                top: e,
                left: n
            }
        },
        setOffset: function(t, e, n) {
            var i = Z.css(t, "position");
            "static" === i && (t.style.position = "relative");
            var r, a, o = Z(t),
                s = o.offset(),
                l = Z.css(t, "top"),
                u = Z.css(t, "left"),
                c = ("absolute" === i || "fixed" === i) && Z.inArray("auto", [l, u]) > -1,
                d = {},
                h = {};
            c ? (h = o.position(), r = h.top, a = h.left) : (r = parseFloat(l) || 0, a = parseFloat(u) || 0), Z.isFunction(e) && (e = e.call(t, n, s)), null != e.top && (d.top = e.top - s.top + r), null != e.left && (d.left = e.left - s.left + a), "using" in e ? e.using.call(t, d) : o.css(d)
        }
    }, Z.fn.extend({
        position: function() {
            if (this[0]) {
                var t = this[0],
                    e = this.offsetParent(),
                    n = this.offset(),
                    i = Je.test(e[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : e.offset();
                return n.top -= parseFloat(Z.css(t, "marginTop")) || 0, n.left -= parseFloat(Z.css(t, "marginLeft")) || 0, i.top += parseFloat(Z.css(e[0], "borderTopWidth")) || 0, i.left += parseFloat(Z.css(e[0], "borderLeftWidth")) || 0, {
                    top: n.top - i.top,
                    left: n.left - i.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || W.body; t && !Je.test(t.nodeName) && "static" === Z.css(t, "position");) t = t.offsetParent;
                return t || W.body
            })
        }
    }), Z.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, n) {
        var i = /Y/.test(n);
        Z.fn[t] = function(r) {
            return Z.access(this, function(t, r, a) {
                var o = H(t);
                if (a === e) return o ? n in o ? o[n] : o.document.documentElement[r] : t[r];
                o ? o.scrollTo(i ? Z(o).scrollLeft() : a, i ? a : Z(o).scrollTop()) : t[r] = a
            }, t, r, arguments.length, null)
        }
    }), Z.each({
        Height: "height",
        Width: "width"
    }, function(t, n) {
        Z.each({
            padding: "inner" + t,
            content: n,
            "": "outer" + t
        }, function(i, r) {
            Z.fn[r] = function(r, a) {
                var o = arguments.length && (i || "boolean" != typeof r),
                    s = i || (!0 === r || !0 === a ? "margin" : "border");
                return Z.access(this, function(n, i, r) {
                    var a;
                    return Z.isWindow(n) ? n.document.documentElement["client" + t] : 9 === n.nodeType ? (a = n.documentElement, Math.max(n.body["scroll" + t], a["scroll" + t], n.body["offset" + t], a["offset" + t], a["client" + t])) : r === e ? Z.css(n, i, r, s) : Z.style(n, i, r, s)
                }, n, o ? r : e, o, null)
            }
        })
    }), t.jQuery = t.$ = Z, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return Z
    })
}(window);
var Kontur = Kontur || {};
! function() {
    function t(t, e, n) {
        return this.namespace = t, this.waitingFor = [], this.func = e, this.args = n || [], this.module = null, this
    }

    function e(e, s, l) {
        var u = new t(e, s, l);
        if (n(u), u.getrequiredsDeferredModules().length > 0) return a.push(u), o("[D] Module: " + e + " - инциализация отложена"), u;
        var c = i(e, !0),
            d = s.apply(c, u.args);
        return o("[v] Module: " + e + " - модуль инициализирован"), r(c, e), d
    }

    function n(t) {
        for (var e = 0; e < t.args.length; ++e) {
            var n = t.args[e];
            if (n) {
                var r;
                if (n.optional) r = n.optional;
                else {
                    if ("string" != typeof n) continue;
                    r = n
                }
                var a = i(r, !1);
                a ? t.args[e] = a : t.waitingFor.push({
                    namespace: r,
                    optional: n.optional,
                    id: e
                })
            } else s("[!] Module: Аргумент #" + e + " оказался пустым")
        }
    }

    function i(t, e) {
        for (var n, i = t.split("."), r = window; n = i.shift();) {
            var a = r[n];
            if (!a) {
                if (!e) return null;
                a = r[n] = {}
            }
            r = a
        }
        return r
    }

    function r(t, e) {
        var n = a.map(function(n) {
            n.waitingFor = n.waitingFor.filter(function(i) {
                var r = i.namespace == e;
                return r && (n.args[i.id] = t), !r
            });
            var r = n.getrequiredsDeferredModules() < 1,
                a = !!n.namespace;
            return r && (a && (n.module = i(n.namespace, !0)), n.func.apply(n.module, n.args || []), o("[v] Module: " + (n.namespace || "<anonymous function>") + " - модуль инциализирован (отложенная инициализация)")), {
                deferredModule: n,
                isModuleLoaded: r,
                isNamedModule: a
            }
        });
        a = n.filter(function(t) {
            return !t.isModuleLoaded
        }).map(function(t) {
            return t.deferredModule
        }), n.filter(function(t) {
            return t.isModuleLoaded && t.isNamedModule
        }).map(function(t) {
            r(t.deferredModule.module, t.deferredModule.namespace)
        })
    }
    var a = [],
        o = Kontur.Debug ? console.info : function(t) {},
        s = Kontur.Debug ? console.warn : o;
    t.prototype = {
        constructor: t,
        getrequiredsDeferredModules: function() {
            return this.waitingFor.filter(function(t) {
                return !t.optional
            })
        }
    }, Kontur.Module = e, Kontur.Deferred = function(e, i) {
        var r = new t(void 0, e, i);
        return n(r), r.getrequiredsDeferredModules().length > 0 ? (a.push(r), s("[D] Deferred: <anonymous-function> - исполнение отложено"), r) : (s("[D] Deferred: <anonymous-function> - исполнена на месте"), e.apply(e, r.args))
    }
}(), Kontur.Module("Kontur.Global", function() {
        this.get = function() {
            return function() {
                return this
            }()
        }
    }), Kontur.Module("Kontur.ScrollWidth", function() {
        this.get = function() {
            var t = document.createElement("div");
            t.style.visibility = "hidden", t.style.width = "100px", t.style.msOverflowStyle = "scrollbar", document.body.appendChild(t);
            var e = t.offsetWidth;
            t.style.overflow = "scroll";
            var n = document.createElement("div");
            n.style.width = "100%", t.appendChild(n);
            var i = n.offsetWidth;
            return t.parentNode.removeChild(t), e - i
        }
    }),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var i = t(this),
                    r = i.data("bs.tooltip"),
                    a = "object" == typeof e && e;
                !r && /destroy|hide/.test(e) || (r || i.data("bs.tooltip", r = new n(this, a)), "string" == typeof e && r[e]())
            })
        }
        var n = function(t, e) {
            this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
        };
        n.VERSION = "3.3.7", n.TRANSITION_DURATION = 150, n.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1,
            viewport: {
                selector: "body",
                padding: 0
            }
        }, n.prototype.init = function(e, n, i) {
            if (this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(i), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                    click: !1,
                    hover: !1,
                    focus: !1
                }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
            for (var r = this.options.trigger.split(" "), a = r.length; a--;) {
                var o = r[a];
                if ("click" == o) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
                else if ("manual" != o) {
                    var s = "hover" == o ? "mouseenter" : "focusin",
                        l = "hover" == o ? "mouseleave" : "focusout";
                    this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, n.prototype.getDefaults = function() {
            return n.DEFAULTS
        }, n.prototype.getOptions = function(e) {
            return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), e
        }, n.prototype.getDelegateOptions = function() {
            var e = {},
                n = this.getDefaults();
            return this._options && t.each(this._options, function(t, i) {
                n[t] != i && (e[t] = i)
            }), e
        }, n.prototype.enter = function(e) {
            var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
            return n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusin" == e.type ? "focus" : "hover"] = !0), n.tip().hasClass("in") || "in" == n.hoverState ? void(n.hoverState = "in") : (clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? void(n.timeout = setTimeout(function() {
                "in" == n.hoverState && n.show()
            }, n.options.delay.show)) : n.show())
        }, n.prototype.isInStateTrue = function() {
            for (var t in this.inState)
                if (this.inState[t]) return !0;
            return !1
        }, n.prototype.leave = function(e) {
            var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
            if (n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusout" == e.type ? "focus" : "hover"] = !1), !n.isInStateTrue()) {
                if (clearTimeout(n.timeout), n.hoverState = "out", !n.options.delay || !n.options.delay.hide) return n.hide();
                n.timeout = setTimeout(function() {
                    "out" == n.hoverState && n.hide()
                }, n.options.delay.hide)
            }
        }, n.prototype.show = function() {
            var e = t.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(e);
                var i = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (e.isDefaultPrevented() || !i) return;
                var r = this,
                    a = this.tip(),
                    o = this.getUID(this.type);
                this.setContent(), a.attr("id", o), this.$element.attr("aria-describedby", o), this.options.animation && a.addClass("fade");
                var s = "function" == typeof this.options.placement ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement,
                    l = /\s?auto?\s?/i,
                    u = l.test(s);
                u && (s = s.replace(l, "") || "top"), a.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(s).data("bs." + this.type, this), this.options.container ? a.appendTo(this.options.container) : a.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
                var c = this.getPosition(),
                    d = a[0].offsetWidth,
                    h = a[0].offsetHeight;
                if (u) {
                    var f = s,
                        p = this.getPosition(this.$viewport);
                    s = "bottom" == s && c.bottom + h > p.bottom ? "top" : "top" == s && c.top - h < p.top ? "bottom" : "right" == s && c.right + d > p.width ? "left" : "left" == s && c.left - d < p.left ? "right" : s, a.removeClass(f).addClass(s)
                }
                var m = this.getCalculatedOffset(s, c, d, h);
                this.applyPlacement(m, s);
                var g = function() {
                    var t = r.hoverState;
                    r.$element.trigger("shown.bs." + r.type), r.hoverState = null, "out" == t && r.leave(r)
                };
                t.support.transition && this.$tip.hasClass("fade") ? a.one("bsTransitionEnd", g).emulateTransitionEnd(n.TRANSITION_DURATION) : g()
            }
        }, n.prototype.applyPlacement = function(e, n) {
            var i = this.tip(),
                r = i[0].offsetWidth,
                a = i[0].offsetHeight,
                o = parseInt(i.css("margin-top"), 10),
                s = parseInt(i.css("margin-left"), 10);
            isNaN(o) && (o = 0), isNaN(s) && (s = 0), e.top += o, e.left += s, t.offset.setOffset(i[0], t.extend({
                using: function(t) {
                    i.css({
                        top: Math.round(t.top),
                        left: Math.round(t.left)
                    })
                }
            }, e), 0), i.addClass("in");
            var l = i[0].offsetWidth,
                u = i[0].offsetHeight;
            "top" == n && u != a && (e.top = e.top + a - u);
            var c = this.getViewportAdjustedDelta(n, e, l, u);
            c.left ? i.width(i.width() + c.left) : i.height(i.height() + c.top);
            var d = /top|bottom/.test(n),
                h = d ? 2 * c.left - r + l : 2 * c.top - a + u,
                f = d ? "offsetWidth" : "offsetHeight";
            i.offset(e), this.replaceArrow(h, i[0][f], d)
        }, n.prototype.replaceArrow = function(t, e, n) {
            this.arrow().css(n ? "left" : "top", 50 * (1 - t / e) + "%").css(n ? "top" : "left", "")
        }, n.prototype.setContent = function() {
            var t = this.tip(),
                e = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
        }, n.prototype.hide = function(e) {
            function i() {
                "in" != r.hoverState && a.detach(), r.$element && r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type), e && e()
            }
            var r = this,
                a = t(this.$tip),
                o = t.Event("hide.bs." + this.type);
            if (this.$element.trigger(o), !o.isDefaultPrevented()) return a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i(), this.hoverState = null, this
        }, n.prototype.fixTitle = function() {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        }, n.prototype.hasContent = function() {
            return this.getTitle()
        }, n.prototype.getPosition = function(e) {
            e = e || this.$element;
            var n = e[0],
                i = "BODY" == n.tagName,
                r = n.getBoundingClientRect();
            null == r.width && (r = t.extend({}, r, {
                width: r.right - r.left,
                height: r.bottom - r.top
            }));
            var a = window.SVGElement && n instanceof window.SVGElement,
                o = i ? {
                    top: 0,
                    left: 0
                } : a ? null : e.offset(),
                s = {
                    scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
                },
                l = i ? {
                    width: t(window).width(),
                    height: t(window).height()
                } : null;
            return t.extend({}, r, s, l, o)
        }, n.prototype.getCalculatedOffset = function(t, e, n, i) {
            return "bottom" == t ? {
                top: e.top + e.height,
                left: e.left + e.width / 2 - n / 2
            } : "top" == t ? {
                top: e.top - i,
                left: e.left + e.width / 2 - n / 2
            } : "left" == t ? {
                top: e.top + e.height / 2 - i / 2,
                left: e.left - n
            } : {
                top: e.top + e.height / 2 - i / 2,
                left: e.left + e.width
            }
        }, n.prototype.getViewportAdjustedDelta = function(t, e, n, i) {
            var r = {
                top: 0,
                left: 0
            };
            if (!this.$viewport) return r;
            var a = this.options.viewport && this.options.viewport.padding || 0,
                o = this.getPosition(this.$viewport);
            if (/top|bottom/.test(t)) {
                var s = e.top - a - o.scroll,
                    l = e.top + a - o.scroll + i;
                s < o.top ? r.top = o.top - s : l > o.top + o.height && (r.top = o.top + o.height - l)
            } else {
                var u = e.left - a,
                    c = e.left + a + n;
                u < o.left ? r.left = o.left - u : c > o.right && (r.left = o.left + o.width - c)
            }
            return r
        }, n.prototype.getTitle = function() {
            var t = this.$element,
                e = this.options;
            return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
        }, n.prototype.getUID = function(t) {
            do {
                t += ~~(1e6 * Math.random())
            } while (document.getElementById(t));
            return t
        }, n.prototype.tip = function() {
            if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
            return this.$tip
        }, n.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, n.prototype.enable = function() {
            this.enabled = !0
        }, n.prototype.disable = function() {
            this.enabled = !1
        }, n.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled
        }, n.prototype.toggle = function(e) {
            var n = this;
            e && ((n = t(e.currentTarget).data("bs." + this.type)) || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n))), e ? (n.inState.click = !n.inState.click, n.isInStateTrue() ? n.enter(n) : n.leave(n)) : n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
        }, n.prototype.destroy = function() {
            var t = this;
            clearTimeout(this.timeout), this.hide(function() {
                t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
            })
        };
        var i = t.fn.tooltip;
        t.fn.tooltip = e, t.fn.tooltip.Constructor = n, t.fn.tooltip.noConflict = function() {
            return t.fn.tooltip = i, this
        }
    }(jQuery),
    function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.moment = e()
    }(this, function() {
        "use strict";

        function t() {
            return Se.apply(null, arguments)
        }

        function e(t) {
            return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t)
        }

        function n(t) {
            return null != t && "[object Object]" === Object.prototype.toString.call(t)
        }

        function i(t) {
            if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(t).length;
            var e;
            for (e in t)
                if (t.hasOwnProperty(e)) return !1;
            return !0
        }

        function r(t) {
            return void 0 === t
        }

        function a(t) {
            return "number" == typeof t || "[object Number]" === Object.prototype.toString.call(t)
        }

        function o(t) {
            return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t)
        }

        function s(t, e) {
            var n, i = [];
            for (n = 0; n < t.length; ++n) i.push(e(t[n], n));
            return i
        }

        function l(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }

        function u(t, e) {
            for (var n in e) l(e, n) && (t[n] = e[n]);
            return l(e, "toString") && (t.toString = e.toString), l(e, "valueOf") && (t.valueOf = e.valueOf), t
        }

        function c(t, e, n, i) {
            return Wt(t, e, n, i, !0).utc()
        }

        function d() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1,
                parsedDateParts: [],
                meridiem: null,
                rfc2822: !1,
                weekdayMismatch: !1
            }
        }

        function h(t) {
            return null == t._pf && (t._pf = d()), t._pf
        }

        function f(t) {
            if (null == t._isValid) {
                var e = h(t),
                    n = De.call(e.parsedDateParts, function(t) {
                        return null != t
                    }),
                    i = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.invalidWeekday && !e.weekdayMismatch && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && n);
                if (t._strict && (i = i && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour), null != Object.isFrozen && Object.isFrozen(t)) return i;
                t._isValid = i
            }
            return t._isValid
        }

        function p(t) {
            var e = c(NaN);
            return null != t ? u(h(e), t) : h(e).userInvalidated = !0, e
        }

        function m(t, e) {
            var n, i, a;
            if (r(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), r(e._i) || (t._i = e._i), r(e._f) || (t._f = e._f), r(e._l) || (t._l = e._l), r(e._strict) || (t._strict = e._strict), r(e._tzm) || (t._tzm = e._tzm), r(e._isUTC) || (t._isUTC = e._isUTC), r(e._offset) || (t._offset = e._offset), r(e._pf) || (t._pf = h(e)), r(e._locale) || (t._locale = e._locale), Te.length > 0)
                for (n = 0; n < Te.length; n++) r(a = e[i = Te[n]]) || (t[i] = a);
            return t
        }

        function g(e) {
            m(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === Fe && (Fe = !0, t.updateOffset(this), Fe = !1)
        }

        function v(t) {
            return t instanceof g || null != t && null != t._isAMomentObject
        }

        function y(t) {
            return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
        }

        function b(t) {
            var e = +t,
                n = 0;
            return 0 !== e && isFinite(e) && (n = y(e)), n
        }

        function k(t, e, n) {
            var i, r = Math.min(t.length, e.length),
                a = Math.abs(t.length - e.length),
                o = 0;
            for (i = 0; i < r; i++)(n && t[i] !== e[i] || !n && b(t[i]) !== b(e[i])) && o++;
            return o + a
        }

        function w(e) {
            !1 === t.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
        }

        function x(e, n) {
            var i = !0;
            return u(function() {
                if (null != t.deprecationHandler && t.deprecationHandler(null, e), i) {
                    for (var r, a = [], o = 0; o < arguments.length; o++) {
                        if (r = "", "object" == typeof arguments[o]) {
                            r += "\n[" + o + "] ";
                            for (var s in arguments[0]) r += s + ": " + arguments[0][s] + ", ";
                            r = r.slice(0, -2)
                        } else r = arguments[o];
                        a.push(r)
                    }
                    w(e + "\nArguments: " + Array.prototype.slice.call(a).join("") + "\n" + (new Error).stack), i = !1
                }
                return n.apply(this, arguments)
            }, n)
        }

        function _(e, n) {
            null != t.deprecationHandler && t.deprecationHandler(e, n), Me[e] || (w(n), Me[e] = !0)
        }

        function C(t) {
            return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t)
        }

        function S(t, e) {
            var i, r = u({}, t);
            for (i in e) l(e, i) && (n(t[i]) && n(e[i]) ? (r[i] = {}, u(r[i], t[i]), u(r[i], e[i])) : null != e[i] ? r[i] = e[i] : delete r[i]);
            for (i in t) l(t, i) && !l(e, i) && n(t[i]) && (r[i] = u({}, r[i]));
            return r
        }

        function D(t) {
            null != t && this.set(t)
        }

        function T(t, e) {
            var n = t.toLowerCase();
            Ne[n] = Ne[n + "s"] = Ne[e] = t
        }

        function F(t) {
            return "string" == typeof t ? Ne[t] || Ne[t.toLowerCase()] : void 0
        }

        function M(t) {
            var e, n, i = {};
            for (n in t) l(t, n) && (e = F(n)) && (i[e] = t[n]);
            return i
        }

        function E(t, e) {
            je[t] = e
        }

        function P(t) {
            var e = [];
            for (var n in t) e.push({
                unit: n,
                priority: je[n]
            });
            return e.sort(function(t, e) {
                return t.priority - e.priority
            }), e
        }

        function O(t, e, n) {
            var i = "" + Math.abs(t),
                r = e - i.length;
            return (t >= 0 ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + i
        }

        function A(t, e, n, i) {
            var r = i;
            "string" == typeof i && (r = function() {
                return this[i]()
            }), t && (Ye[t] = r), e && (Ye[e[0]] = function() {
                return O(r.apply(this, arguments), e[1], e[2])
            }), n && (Ye[n] = function() {
                return this.localeData().ordinal(r.apply(this, arguments), t)
            })
        }

        function L(t) {
            return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
        }

        function N(t) {
            var e, n, i = t.match(Ie);
            for (e = 0, n = i.length; e < n; e++) Ye[i[e]] ? i[e] = Ye[i[e]] : i[e] = L(i[e]);
            return function(e) {
                var r, a = "";
                for (r = 0; r < n; r++) a += C(i[r]) ? i[r].call(e, t) : i[r];
                return a
            }
        }

        function j(t, e) {
            return t.isValid() ? (e = I(e, t.localeData()), Re[e] = Re[e] || N(e), Re[e](t)) : t.localeData().invalidDate()
        }

        function I(t, e) {
            var n = 5;
            for (He.lastIndex = 0; n >= 0 && He.test(t);) t = t.replace(He, function(t) {
                return e.longDateFormat(t) || t
            }), He.lastIndex = 0, n -= 1;
            return t
        }

        function H(t, e, n) {
            an[t] = C(e) ? e : function(t, i) {
                return t && n ? n : e
            }
        }

        function R(t, e) {
            return l(an, t) ? an[t](e._strict, e._locale) : new RegExp(Y(t))
        }

        function Y(t) {
            return W(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(t, e, n, i, r) {
                return e || n || i || r
            }))
        }

        function W(t) {
            return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }

        function B(t, e) {
            var n, i = e;
            for ("string" == typeof t && (t = [t]), a(e) && (i = function(t, n) {
                    n[e] = b(t)
                }), n = 0; n < t.length; n++) on[t[n]] = i
        }

        function $(t, e) {
            B(t, function(t, n, i, r) {
                i._w = i._w || {}, e(t, i._w, i, r)
            })
        }

        function V(t, e, n) {
            null != e && l(on, t) && on[t](e, n._a, n, t)
        }

        function G(t) {
            return q(t) ? 366 : 365
        }

        function q(t) {
            return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
        }

        function z(e, n) {
            return function(i) {
                return null != i ? (K(this, e, i), t.updateOffset(this, n), this) : U(this, e)
            }
        }

        function U(t, e) {
            return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN
        }

        function K(t, e, n) {
            t.isValid() && !isNaN(n) && ("FullYear" === e && q(t.year()) ? t._d["set" + (t._isUTC ? "UTC" : "") + e](n, t.month(), X(n, t.month())) : t._d["set" + (t._isUTC ? "UTC" : "") + e](n))
        }

        function Q(t, e) {
            return (t % e + e) % e
        }

        function X(t, e) {
            if (isNaN(t) || isNaN(e)) return NaN;
            var n = Q(e, 12);
            return t += (e - n) / 12, 1 === n ? q(t) ? 29 : 28 : 31 - n % 7 % 2
        }

        function Z(t, e, n) {
            var i, r, a, o = t.toLocaleLowerCase();
            if (!this._monthsParse)
                for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], i = 0; i < 12; ++i) a = c([2e3, i]), this._shortMonthsParse[i] = this.monthsShort(a, "").toLocaleLowerCase(), this._longMonthsParse[i] = this.months(a, "").toLocaleLowerCase();
            return n ? "MMM" === e ? -1 !== (r = gn.call(this._shortMonthsParse, o)) ? r : null : -1 !== (r = gn.call(this._longMonthsParse, o)) ? r : null : "MMM" === e ? -1 !== (r = gn.call(this._shortMonthsParse, o)) ? r : -1 !== (r = gn.call(this._longMonthsParse, o)) ? r : null : -1 !== (r = gn.call(this._longMonthsParse, o)) ? r : -1 !== (r = gn.call(this._shortMonthsParse, o)) ? r : null
        }

        function J(t, e) {
            var n;
            if (!t.isValid()) return t;
            if ("string" == typeof e)
                if (/^\d+$/.test(e)) e = b(e);
                else if (e = t.localeData().monthsParse(e), !a(e)) return t;
            return n = Math.min(t.date(), X(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, n), t
        }

        function tt(e) {
            return null != e ? (J(this, e), t.updateOffset(this, !0), this) : U(this, "Month")
        }

        function et() {
            function t(t, e) {
                return e.length - t.length
            }
            var e, n, i = [],
                r = [],
                a = [];
            for (e = 0; e < 12; e++) n = c([2e3, e]), i.push(this.monthsShort(n, "")), r.push(this.months(n, "")), a.push(this.months(n, "")), a.push(this.monthsShort(n, ""));
            for (i.sort(t), r.sort(t), a.sort(t), e = 0; e < 12; e++) i[e] = W(i[e]), r[e] = W(r[e]);
            for (e = 0; e < 24; e++) a[e] = W(a[e]);
            this._monthsRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i")
        }

        function nt(t, e, n, i, r, a, o) {
            var s = new Date(t, e, n, i, r, a, o);
            return t < 100 && t >= 0 && isFinite(s.getFullYear()) && s.setFullYear(t), s
        }

        function it(t) {
            var e = new Date(Date.UTC.apply(null, arguments));
            return t < 100 && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t), e
        }

        function rt(t, e, n) {
            var i = 7 + e - n;
            return -(7 + it(t, 0, i).getUTCDay() - e) % 7 + i - 1
        }

        function at(t, e, n, i, r) {
            var a, o, s = 1 + 7 * (e - 1) + (7 + n - i) % 7 + rt(t, i, r);
            return s <= 0 ? o = G(a = t - 1) + s : s > G(t) ? (a = t + 1, o = s - G(t)) : (a = t, o = s), {
                year: a,
                dayOfYear: o
            }
        }

        function ot(t, e, n) {
            var i, r, a = rt(t.year(), e, n),
                o = Math.floor((t.dayOfYear() - a - 1) / 7) + 1;
            return o < 1 ? i = o + st(r = t.year() - 1, e, n) : o > st(t.year(), e, n) ? (i = o - st(t.year(), e, n), r = t.year() + 1) : (r = t.year(), i = o), {
                week: i,
                year: r
            }
        }

        function st(t, e, n) {
            var i = rt(t, e, n),
                r = rt(t + 1, e, n);
            return (G(t) - i + r) / 7
        }

        function lt(t, e) {
            return "string" != typeof t ? t : isNaN(t) ? "number" == typeof(t = e.weekdaysParse(t)) ? t : null : parseInt(t, 10)
        }

        function ut(t, e) {
            return "string" == typeof t ? e.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t
        }

        function ct(t, e, n) {
            var i, r, a, o = t.toLocaleLowerCase();
            if (!this._weekdaysParse)
                for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], i = 0; i < 7; ++i) a = c([2e3, 1]).day(i), this._minWeekdaysParse[i] = this.weekdaysMin(a, "").toLocaleLowerCase(), this._shortWeekdaysParse[i] = this.weekdaysShort(a, "").toLocaleLowerCase(), this._weekdaysParse[i] = this.weekdays(a, "").toLocaleLowerCase();
            return n ? "dddd" === e ? -1 !== (r = gn.call(this._weekdaysParse, o)) ? r : null : "ddd" === e ? -1 !== (r = gn.call(this._shortWeekdaysParse, o)) ? r : null : -1 !== (r = gn.call(this._minWeekdaysParse, o)) ? r : null : "dddd" === e ? -1 !== (r = gn.call(this._weekdaysParse, o)) ? r : -1 !== (r = gn.call(this._shortWeekdaysParse, o)) ? r : -1 !== (r = gn.call(this._minWeekdaysParse, o)) ? r : null : "ddd" === e ? -1 !== (r = gn.call(this._shortWeekdaysParse, o)) ? r : -1 !== (r = gn.call(this._weekdaysParse, o)) ? r : -1 !== (r = gn.call(this._minWeekdaysParse, o)) ? r : null : -1 !== (r = gn.call(this._minWeekdaysParse, o)) ? r : -1 !== (r = gn.call(this._weekdaysParse, o)) ? r : -1 !== (r = gn.call(this._shortWeekdaysParse, o)) ? r : null
        }

        function dt() {
            function t(t, e) {
                return e.length - t.length
            }
            var e, n, i, r, a, o = [],
                s = [],
                l = [],
                u = [];
            for (e = 0; e < 7; e++) n = c([2e3, 1]).day(e), i = this.weekdaysMin(n, ""), r = this.weekdaysShort(n, ""), a = this.weekdays(n, ""), o.push(i), s.push(r), l.push(a), u.push(i), u.push(r), u.push(a);
            for (o.sort(t), s.sort(t), l.sort(t), u.sort(t), e = 0; e < 7; e++) s[e] = W(s[e]), l[e] = W(l[e]), u[e] = W(u[e]);
            this._weekdaysRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + o.join("|") + ")", "i")
        }

        function ht() {
            return this.hours() % 12 || 12
        }

        function ft(t, e) {
            A(t, 0, 0, function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), e)
            })
        }

        function pt(t, e) {
            return e._meridiemParse
        }

        function mt(t) {
            return t ? t.toLowerCase().replace("_", "-") : t
        }

        function gt(t) {
            for (var e, n, i, r, a = 0; a < t.length;) {
                for (e = (r = mt(t[a]).split("-")).length, n = (n = mt(t[a + 1])) ? n.split("-") : null; e > 0;) {
                    if (i = vt(r.slice(0, e).join("-"))) return i;
                    if (n && n.length >= e && k(r, n, !0) >= e - 1) break;
                    e--
                }
                a++
            }
            return null
        }

        function vt(t) {
            var e = null;
            if (!Ln[t] && "undefined" != typeof module && module && module.exports) try {
                e = En._abbr, require("./locale/" + t), yt(e)
            } catch (t) {}
            return Ln[t]
        }

        function yt(t, e) {
            var n;
            return t && (n = r(e) ? kt(t) : bt(t, e)) && (En = n), En._abbr
        }

        function bt(t, e) {
            if (null !== e) {
                var n = An;
                if (e.abbr = t, null != Ln[t]) _("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), n = Ln[t]._config;
                else if (null != e.parentLocale) {
                    if (null == Ln[e.parentLocale]) return Nn[e.parentLocale] || (Nn[e.parentLocale] = []), Nn[e.parentLocale].push({
                        name: t,
                        config: e
                    }), null;
                    n = Ln[e.parentLocale]._config
                }
                return Ln[t] = new D(S(n, e)), Nn[t] && Nn[t].forEach(function(t) {
                    bt(t.name, t.config)
                }), yt(t), Ln[t]
            }
            return delete Ln[t], null
        }

        function kt(t) {
            var n;
            if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return En;
            if (!e(t)) {
                if (n = vt(t)) return n;
                t = [t]
            }
            return gt(t)
        }

        function wt(t) {
            var e, n = t._a;
            return n && -2 === h(t).overflow && (e = n[ln] < 0 || n[ln] > 11 ? ln : n[un] < 1 || n[un] > X(n[sn], n[ln]) ? un : n[cn] < 0 || n[cn] > 24 || 24 === n[cn] && (0 !== n[dn] || 0 !== n[hn] || 0 !== n[fn]) ? cn : n[dn] < 0 || n[dn] > 59 ? dn : n[hn] < 0 || n[hn] > 59 ? hn : n[fn] < 0 || n[fn] > 999 ? fn : -1, h(t)._overflowDayOfYear && (e < sn || e > un) && (e = un), h(t)._overflowWeeks && -1 === e && (e = pn), h(t)._overflowWeekday && -1 === e && (e = mn), h(t).overflow = e), t
        }

        function xt(t, e, n) {
            return null != t ? t : null != e ? e : n
        }

        function _t(e) {
            var n = new Date(t.now());
            return e._useUTC ? [n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()] : [n.getFullYear(), n.getMonth(), n.getDate()]
        }

        function Ct(t) {
            var e, n, i, r, a = [];
            if (!t._d) {
                for (i = _t(t), t._w && null == t._a[un] && null == t._a[ln] && St(t), null != t._dayOfYear && (r = xt(t._a[sn], i[sn]), (t._dayOfYear > G(r) || 0 === t._dayOfYear) && (h(t)._overflowDayOfYear = !0), n = it(r, 0, t._dayOfYear), t._a[ln] = n.getUTCMonth(), t._a[un] = n.getUTCDate()), e = 0; e < 3 && null == t._a[e]; ++e) t._a[e] = a[e] = i[e];
                for (; e < 7; e++) t._a[e] = a[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
                24 === t._a[cn] && 0 === t._a[dn] && 0 === t._a[hn] && 0 === t._a[fn] && (t._nextDay = !0, t._a[cn] = 0), t._d = (t._useUTC ? it : nt).apply(null, a), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[cn] = 24), t._w && void 0 !== t._w.d && t._w.d !== t._d.getDay() && (h(t).weekdayMismatch = !0)
            }
        }

        function St(t) {
            var e, n, i, r, a, o, s, l;
            if (null != (e = t._w).GG || null != e.W || null != e.E) a = 1, o = 4, n = xt(e.GG, t._a[sn], ot(Bt(), 1, 4).year), i = xt(e.W, 1), ((r = xt(e.E, 1)) < 1 || r > 7) && (l = !0);
            else {
                a = t._locale._week.dow, o = t._locale._week.doy;
                var u = ot(Bt(), a, o);
                n = xt(e.gg, t._a[sn], u.year), i = xt(e.w, u.week), null != e.d ? ((r = e.d) < 0 || r > 6) && (l = !0) : null != e.e ? (r = e.e + a, (e.e < 0 || e.e > 6) && (l = !0)) : r = a
            }
            i < 1 || i > st(n, a, o) ? h(t)._overflowWeeks = !0 : null != l ? h(t)._overflowWeekday = !0 : (s = at(n, i, r, a, o), t._a[sn] = s.year, t._dayOfYear = s.dayOfYear)
        }

        function Dt(t) {
            var e, n, i, r, a, o, s = t._i,
                l = jn.exec(s) || In.exec(s);
            if (l) {
                for (h(t).iso = !0, e = 0, n = Rn.length; e < n; e++)
                    if (Rn[e][1].exec(l[1])) {
                        r = Rn[e][0], i = !1 !== Rn[e][2];
                        break
                    }
                if (null == r) return void(t._isValid = !1);
                if (l[3]) {
                    for (e = 0, n = Yn.length; e < n; e++)
                        if (Yn[e][1].exec(l[3])) {
                            a = (l[2] || " ") + Yn[e][0];
                            break
                        }
                    if (null == a) return void(t._isValid = !1)
                }
                if (!i && null != a) return void(t._isValid = !1);
                if (l[4]) {
                    if (!Hn.exec(l[4])) return void(t._isValid = !1);
                    o = "Z"
                }
                t._f = r + (a || "") + (o || ""), Lt(t)
            } else t._isValid = !1
        }

        function Tt(t, e, n, i, r, a) {
            var o = [Ft(t), kn.indexOf(e), parseInt(n, 10), parseInt(i, 10), parseInt(r, 10)];
            return a && o.push(parseInt(a, 10)), o
        }

        function Ft(t) {
            var e = parseInt(t, 10);
            return e <= 49 ? 2e3 + e : e <= 999 ? 1900 + e : e
        }

        function Mt(t) {
            return t.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim()
        }

        function Et(t, e, n) {
            return !t || Sn.indexOf(t) === new Date(e[0], e[1], e[2]).getDay() || (h(n).weekdayMismatch = !0, n._isValid = !1, !1)
        }

        function Pt(t, e, n) {
            if (t) return $n[t];
            if (e) return 0;
            var i = parseInt(n, 10),
                r = i % 100;
            return (i - r) / 100 * 60 + r
        }

        function Ot(t) {
            var e = Bn.exec(Mt(t._i));
            if (e) {
                var n = Tt(e[4], e[3], e[2], e[5], e[6], e[7]);
                if (!Et(e[1], n, t)) return;
                t._a = n, t._tzm = Pt(e[8], e[9], e[10]), t._d = it.apply(null, t._a), t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), h(t).rfc2822 = !0
            } else t._isValid = !1
        }

        function At(e) {
            var n = Wn.exec(e._i);
            null === n ? (Dt(e), !1 === e._isValid && (delete e._isValid, Ot(e), !1 === e._isValid && (delete e._isValid, t.createFromInputFallback(e)))) : e._d = new Date(+n[1])
        }

        function Lt(e) {
            if (e._f !== t.ISO_8601)
                if (e._f !== t.RFC_2822) {
                    e._a = [], h(e).empty = !0;
                    var n, i, r, a, o, s = "" + e._i,
                        l = s.length,
                        u = 0;
                    for (r = I(e._f, e._locale).match(Ie) || [], n = 0; n < r.length; n++) a = r[n], (i = (s.match(R(a, e)) || [])[0]) && ((o = s.substr(0, s.indexOf(i))).length > 0 && h(e).unusedInput.push(o), s = s.slice(s.indexOf(i) + i.length), u += i.length), Ye[a] ? (i ? h(e).empty = !1 : h(e).unusedTokens.push(a), V(a, i, e)) : e._strict && !i && h(e).unusedTokens.push(a);
                    h(e).charsLeftOver = l - u, s.length > 0 && h(e).unusedInput.push(s), e._a[cn] <= 12 && !0 === h(e).bigHour && e._a[cn] > 0 && (h(e).bigHour = void 0), h(e).parsedDateParts = e._a.slice(0), h(e).meridiem = e._meridiem, e._a[cn] = Nt(e._locale, e._a[cn], e._meridiem), Ct(e), wt(e)
                } else Ot(e);
            else Dt(e)
        }

        function Nt(t, e, n) {
            var i;
            return null == n ? e : null != t.meridiemHour ? t.meridiemHour(e, n) : null != t.isPM ? ((i = t.isPM(n)) && e < 12 && (e += 12), i || 12 !== e || (e = 0), e) : e
        }

        function jt(t) {
            var e, n, i, r, a;
            if (0 === t._f.length) return h(t).invalidFormat = !0, void(t._d = new Date(NaN));
            for (r = 0; r < t._f.length; r++) a = 0, e = m({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[r], Lt(e), f(e) && (a += h(e).charsLeftOver, a += 10 * h(e).unusedTokens.length, h(e).score = a, (null == i || a < i) && (i = a, n = e));
            u(t, n || e)
        }

        function It(t) {
            if (!t._d) {
                var e = M(t._i);
                t._a = s([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], function(t) {
                    return t && parseInt(t, 10)
                }), Ct(t)
            }
        }

        function Ht(t) {
            var e = new g(wt(Rt(t)));
            return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e
        }

        function Rt(t) {
            var n = t._i,
                i = t._f;
            return t._locale = t._locale || kt(t._l), null === n || void 0 === i && "" === n ? p({
                nullInput: !0
            }) : ("string" == typeof n && (t._i = n = t._locale.preparse(n)), v(n) ? new g(wt(n)) : (o(n) ? t._d = n : e(i) ? jt(t) : i ? Lt(t) : Yt(t), f(t) || (t._d = null), t))
        }

        function Yt(i) {
            var l = i._i;
            r(l) ? i._d = new Date(t.now()) : o(l) ? i._d = new Date(l.valueOf()) : "string" == typeof l ? At(i) : e(l) ? (i._a = s(l.slice(0), function(t) {
                return parseInt(t, 10)
            }), Ct(i)) : n(l) ? It(i) : a(l) ? i._d = new Date(l) : t.createFromInputFallback(i)
        }

        function Wt(t, r, a, o, s) {
            var l = {};
            return !0 !== a && !1 !== a || (o = a, a = void 0), (n(t) && i(t) || e(t) && 0 === t.length) && (t = void 0), l._isAMomentObject = !0, l._useUTC = l._isUTC = s, l._l = a, l._i = t, l._f = r, l._strict = o, Ht(l)
        }

        function Bt(t, e, n, i) {
            return Wt(t, e, n, i, !1)
        }

        function $t(t, n) {
            var i, r;
            if (1 === n.length && e(n[0]) && (n = n[0]), !n.length) return Bt();
            for (i = n[0], r = 1; r < n.length; ++r) n[r].isValid() && !n[r][t](i) || (i = n[r]);
            return i
        }

        function Vt(t) {
            for (var e in t)
                if (-1 === gn.call(qn, e) || null != t[e] && isNaN(t[e])) return !1;
            for (var n = !1, i = 0; i < qn.length; ++i)
                if (t[qn[i]]) {
                    if (n) return !1;
                    parseFloat(t[qn[i]]) !== b(t[qn[i]]) && (n = !0)
                }
            return !0
        }

        function Gt(t) {
            var e = M(t),
                n = e.year || 0,
                i = e.quarter || 0,
                r = e.month || 0,
                a = e.week || 0,
                o = e.day || 0,
                s = e.hour || 0,
                l = e.minute || 0,
                u = e.second || 0,
                c = e.millisecond || 0;
            this._isValid = Vt(e), this._milliseconds = +c + 1e3 * u + 6e4 * l + 1e3 * s * 60 * 60, this._days = +o + 7 * a, this._months = +r + 3 * i + 12 * n, this._data = {}, this._locale = kt(), this._bubble()
        }

        function qt(t) {
            return t instanceof Gt
        }

        function zt(t) {
            return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t)
        }

        function Ut(t, e) {
            A(t, 0, 0, function() {
                var t = this.utcOffset(),
                    n = "+";
                return t < 0 && (t = -t, n = "-"), n + O(~~(t / 60), 2) + e + O(~~t % 60, 2)
            })
        }

        function Kt(t, e) {
            var n = (e || "").match(t);
            if (null === n) return null;
            var i = ((n[n.length - 1] || []) + "").match(zn) || ["-", 0, 0],
                r = 60 * i[1] + b(i[2]);
            return 0 === r ? 0 : "+" === i[0] ? r : -r
        }

        function Qt(e, n) {
            var i, r;
            return n._isUTC ? (i = n.clone(), r = (v(e) || o(e) ? e.valueOf() : Bt(e).valueOf()) - i.valueOf(), i._d.setTime(i._d.valueOf() + r), t.updateOffset(i, !1), i) : Bt(e).local()
        }

        function Xt(t) {
            return 15 * -Math.round(t._d.getTimezoneOffset() / 15)
        }

        function Zt() {
            return !!this.isValid() && this._isUTC && 0 === this._offset
        }

        function Jt(t, e) {
            var n, i, r, o = t,
                s = null;
            return qt(t) ? o = {
                ms: t._milliseconds,
                d: t._days,
                M: t._months
            } : a(t) ? (o = {}, e ? o[e] = t : o.milliseconds = t) : (s = Un.exec(t)) ? (n = "-" === s[1] ? -1 : 1, o = {
                y: 0,
                d: b(s[un]) * n,
                h: b(s[cn]) * n,
                m: b(s[dn]) * n,
                s: b(s[hn]) * n,
                ms: b(zt(1e3 * s[fn])) * n
            }) : (s = Kn.exec(t)) ? (n = "-" === s[1] ? -1 : (s[1], 1), o = {
                y: te(s[2], n),
                M: te(s[3], n),
                w: te(s[4], n),
                d: te(s[5], n),
                h: te(s[6], n),
                m: te(s[7], n),
                s: te(s[8], n)
            }) : null == o ? o = {} : "object" == typeof o && ("from" in o || "to" in o) && (r = ne(Bt(o.from), Bt(o.to)), (o = {}).ms = r.milliseconds, o.M = r.months), i = new Gt(o), qt(t) && l(t, "_locale") && (i._locale = t._locale), i
        }

        function te(t, e) {
            var n = t && parseFloat(t.replace(",", "."));
            return (isNaN(n) ? 0 : n) * e
        }

        function ee(t, e) {
            var n = {
                milliseconds: 0,
                months: 0
            };
            return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months, n.milliseconds = +e - +t.clone().add(n.months, "M"), n
        }

        function ne(t, e) {
            var n;
            return t.isValid() && e.isValid() ? (e = Qt(e, t), t.isBefore(e) ? n = ee(t, e) : ((n = ee(e, t)).milliseconds = -n.milliseconds, n.months = -n.months), n) : {
                milliseconds: 0,
                months: 0
            }
        }

        function ie(t, e) {
            return function(n, i) {
                var r, a;
                return null === i || isNaN(+i) || (_(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), a = n, n = i, i = a), n = "string" == typeof n ? +n : n, r = Jt(n, i), re(this, r, t), this
            }
        }

        function re(e, n, i, r) {
            var a = n._milliseconds,
                o = zt(n._days),
                s = zt(n._months);
            e.isValid() && (r = null == r || r, s && J(e, U(e, "Month") + s * i), o && K(e, "Date", U(e, "Date") + o * i), a && e._d.setTime(e._d.valueOf() + a * i), r && t.updateOffset(e, o || s))
        }

        function ae(t, e) {
            var n, i = 12 * (e.year() - t.year()) + (e.month() - t.month()),
                r = t.clone().add(i, "months");
            return n = e - r < 0 ? (e - r) / (r - t.clone().add(i - 1, "months")) : (e - r) / (t.clone().add(i + 1, "months") - r), -(i + n) || 0
        }

        function oe(t) {
            var e;
            return void 0 === t ? this._locale._abbr : (null != (e = kt(t)) && (this._locale = e), this)
        }

        function se() {
            return this._locale
        }

        function le(t, e) {
            A(0, [t, t.length], 0, e)
        }

        function ue(t, e, n, i, r) {
            var a;
            return null == t ? ot(this, i, r).year : (a = st(t, i, r), e > a && (e = a), ce.call(this, t, e, n, i, r))
        }

        function ce(t, e, n, i, r) {
            var a = at(t, e, n, i, r),
                o = it(a.year, 0, a.dayOfYear);
            return this.year(o.getUTCFullYear()), this.month(o.getUTCMonth()), this.date(o.getUTCDate()), this
        }

        function de(t) {
            return t
        }

        function he(t, e, n, i) {
            var r = kt(),
                a = c().set(i, e);
            return r[n](a, t)
        }

        function fe(t, e, n) {
            if (a(t) && (e = t, t = void 0), t = t || "", null != e) return he(t, e, n, "month");
            var i, r = [];
            for (i = 0; i < 12; i++) r[i] = he(t, i, n, "month");
            return r
        }

        function pe(t, e, n, i) {
            "boolean" == typeof t ? (a(e) && (n = e, e = void 0), e = e || "") : (n = e = t, t = !1, a(e) && (n = e, e = void 0), e = e || "");
            var r = kt(),
                o = t ? r._week.dow : 0;
            if (null != n) return he(e, (n + o) % 7, i, "day");
            var s, l = [];
            for (s = 0; s < 7; s++) l[s] = he(e, (s + o) % 7, i, "day");
            return l
        }

        function me(t, e, n, i) {
            var r = Jt(e, n);
            return t._milliseconds += i * r._milliseconds, t._days += i * r._days, t._months += i * r._months, t._bubble()
        }

        function ge(t) {
            return t < 0 ? Math.floor(t) : Math.ceil(t)
        }

        function ve(t) {
            return 4800 * t / 146097
        }

        function ye(t) {
            return 146097 * t / 4800
        }

        function be(t) {
            return function() {
                return this.as(t)
            }
        }

        function ke(t) {
            return function() {
                return this.isValid() ? this._data[t] : NaN
            }
        }

        function we(t, e, n, i, r) {
            return r.relativeTime(e || 1, !!n, t, i)
        }

        function xe(t, e, n) {
            var i = Jt(t).abs(),
                r = xi(i.as("s")),
                a = xi(i.as("m")),
                o = xi(i.as("h")),
                s = xi(i.as("d")),
                l = xi(i.as("M")),
                u = xi(i.as("y")),
                c = r <= _i.ss && ["s", r] || r < _i.s && ["ss", r] || a <= 1 && ["m"] || a < _i.m && ["mm", a] || o <= 1 && ["h"] || o < _i.h && ["hh", o] || s <= 1 && ["d"] || s < _i.d && ["dd", s] || l <= 1 && ["M"] || l < _i.M && ["MM", l] || u <= 1 && ["y"] || ["yy", u];
            return c[2] = e, c[3] = +t > 0, c[4] = n, we.apply(null, c)
        }

        function _e(t) {
            return (t > 0) - (t < 0) || +t
        }

        function Ce() {
            if (!this.isValid()) return this.localeData().invalidDate();
            var t, e, n, i = Ci(this._milliseconds) / 1e3,
                r = Ci(this._days),
                a = Ci(this._months);
            e = y((t = y(i / 60)) / 60), i %= 60, t %= 60;
            var o = n = y(a / 12),
                s = a %= 12,
                l = r,
                u = e,
                c = t,
                d = i ? i.toFixed(3).replace(/\.?0+$/, "") : "",
                h = this.asSeconds();
            if (!h) return "P0D";
            var f = h < 0 ? "-" : "",
                p = _e(this._months) !== _e(h) ? "-" : "",
                m = _e(this._days) !== _e(h) ? "-" : "",
                g = _e(this._milliseconds) !== _e(h) ? "-" : "";
            return f + "P" + (o ? p + o + "Y" : "") + (s ? p + s + "M" : "") + (l ? m + l + "D" : "") + (u || c || d ? "T" : "") + (u ? g + u + "H" : "") + (c ? g + c + "M" : "") + (d ? g + d + "S" : "")
        }
        var Se, De;
        De = Array.prototype.some ? Array.prototype.some : function(t) {
            for (var e = Object(this), n = e.length >>> 0, i = 0; i < n; i++)
                if (i in e && t.call(this, e[i], i, e)) return !0;
            return !1
        };
        var Te = t.momentProperties = [],
            Fe = !1,
            Me = {};
        t.suppressDeprecationWarnings = !1, t.deprecationHandler = null;
        var Ee;
        Ee = Object.keys ? Object.keys : function(t) {
            var e, n = [];
            for (e in t) l(t, e) && n.push(e);
            return n
        };
        var Pe = {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            Oe = {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY h:mm A",
                LLLL: "dddd, MMMM D, YYYY h:mm A"
            },
            Ae = /\d{1,2}/,
            Le = {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            Ne = {},
            je = {},
            Ie = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
            He = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            Re = {},
            Ye = {},
            We = /\d/,
            Be = /\d\d/,
            $e = /\d{3}/,
            Ve = /\d{4}/,
            Ge = /[+-]?\d{6}/,
            qe = /\d\d?/,
            ze = /\d\d\d\d?/,
            Ue = /\d\d\d\d\d\d?/,
            Ke = /\d{1,3}/,
            Qe = /\d{1,4}/,
            Xe = /[+-]?\d{1,6}/,
            Ze = /\d+/,
            Je = /[+-]?\d+/,
            tn = /Z|[+-]\d\d:?\d\d/gi,
            en = /Z|[+-]\d\d(?::?\d\d)?/gi,
            nn = /[+-]?\d+(\.\d{1,3})?/,
            rn = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
            an = {},
            on = {},
            sn = 0,
            ln = 1,
            un = 2,
            cn = 3,
            dn = 4,
            hn = 5,
            fn = 6,
            pn = 7,
            mn = 8;
        A("Y", 0, 0, function() {
            var t = this.year();
            return t <= 9999 ? "" + t : "+" + t
        }), A(0, ["YY", 2], 0, function() {
            return this.year() % 100
        }), A(0, ["YYYY", 4], 0, "year"), A(0, ["YYYYY", 5], 0, "year"), A(0, ["YYYYYY", 6, !0], 0, "year"), T("year", "y"), E("year", 1), H("Y", Je), H("YY", qe, Be), H("YYYY", Qe, Ve), H("YYYYY", Xe, Ge), H("YYYYYY", Xe, Ge), B(["YYYYY", "YYYYYY"], sn), B("YYYY", function(e, n) {
            n[sn] = 2 === e.length ? t.parseTwoDigitYear(e) : b(e)
        }), B("YY", function(e, n) {
            n[sn] = t.parseTwoDigitYear(e)
        }), B("Y", function(t, e) {
            e[sn] = parseInt(t, 10)
        }), t.parseTwoDigitYear = function(t) {
            return b(t) + (b(t) > 68 ? 1900 : 2e3)
        };
        var gn, vn = z("FullYear", !0);
        gn = Array.prototype.indexOf ? Array.prototype.indexOf : function(t) {
            var e;
            for (e = 0; e < this.length; ++e)
                if (this[e] === t) return e;
            return -1
        }, A("M", ["MM", 2], "Mo", function() {
            return this.month() + 1
        }), A("MMM", 0, 0, function(t) {
            return this.localeData().monthsShort(this, t)
        }), A("MMMM", 0, 0, function(t) {
            return this.localeData().months(this, t)
        }), T("month", "M"), E("month", 8), H("M", qe), H("MM", qe, Be), H("MMM", function(t, e) {
            return e.monthsShortRegex(t)
        }), H("MMMM", function(t, e) {
            return e.monthsRegex(t)
        }), B(["M", "MM"], function(t, e) {
            e[ln] = b(t) - 1
        }), B(["MMM", "MMMM"], function(t, e, n, i) {
            var r = n._locale.monthsParse(t, i, n._strict);
            null != r ? e[ln] = r : h(n).invalidMonth = t
        });
        var yn = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
            bn = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            kn = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            wn = rn,
            xn = rn;
        A("w", ["ww", 2], "wo", "week"), A("W", ["WW", 2], "Wo", "isoWeek"), T("week", "w"), T("isoWeek", "W"), E("week", 5), E("isoWeek", 5), H("w", qe), H("ww", qe, Be), H("W", qe), H("WW", qe, Be), $(["w", "ww", "W", "WW"], function(t, e, n, i) {
            e[i.substr(0, 1)] = b(t)
        });
        var _n = {
            dow: 0,
            doy: 6
        };
        A("d", 0, "do", "day"), A("dd", 0, 0, function(t) {
            return this.localeData().weekdaysMin(this, t)
        }), A("ddd", 0, 0, function(t) {
            return this.localeData().weekdaysShort(this, t)
        }), A("dddd", 0, 0, function(t) {
            return this.localeData().weekdays(this, t)
        }), A("e", 0, 0, "weekday"), A("E", 0, 0, "isoWeekday"), T("day", "d"), T("weekday", "e"), T("isoWeekday", "E"), E("day", 11), E("weekday", 11), E("isoWeekday", 11), H("d", qe), H("e", qe), H("E", qe), H("dd", function(t, e) {
            return e.weekdaysMinRegex(t)
        }), H("ddd", function(t, e) {
            return e.weekdaysShortRegex(t)
        }), H("dddd", function(t, e) {
            return e.weekdaysRegex(t)
        }), $(["dd", "ddd", "dddd"], function(t, e, n, i) {
            var r = n._locale.weekdaysParse(t, i, n._strict);
            null != r ? e.d = r : h(n).invalidWeekday = t
        }), $(["d", "e", "E"], function(t, e, n, i) {
            e[i] = b(t)
        });
        var Cn = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            Sn = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            Dn = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            Tn = rn,
            Fn = rn,
            Mn = rn;
        A("H", ["HH", 2], 0, "hour"), A("h", ["hh", 2], 0, ht), A("k", ["kk", 2], 0, function() {
            return this.hours() || 24
        }), A("hmm", 0, 0, function() {
            return "" + ht.apply(this) + O(this.minutes(), 2)
        }), A("hmmss", 0, 0, function() {
            return "" + ht.apply(this) + O(this.minutes(), 2) + O(this.seconds(), 2)
        }), A("Hmm", 0, 0, function() {
            return "" + this.hours() + O(this.minutes(), 2)
        }), A("Hmmss", 0, 0, function() {
            return "" + this.hours() + O(this.minutes(), 2) + O(this.seconds(), 2)
        }), ft("a", !0), ft("A", !1), T("hour", "h"), E("hour", 13), H("a", pt), H("A", pt), H("H", qe), H("h", qe), H("k", qe), H("HH", qe, Be), H("hh", qe, Be), H("kk", qe, Be), H("hmm", ze), H("hmmss", Ue), H("Hmm", ze), H("Hmmss", Ue), B(["H", "HH"], cn), B(["k", "kk"], function(t, e, n) {
            var i = b(t);
            e[cn] = 24 === i ? 0 : i
        }), B(["a", "A"], function(t, e, n) {
            n._isPm = n._locale.isPM(t), n._meridiem = t
        }), B(["h", "hh"], function(t, e, n) {
            e[cn] = b(t), h(n).bigHour = !0
        }), B("hmm", function(t, e, n) {
            var i = t.length - 2;
            e[cn] = b(t.substr(0, i)), e[dn] = b(t.substr(i)), h(n).bigHour = !0
        }), B("hmmss", function(t, e, n) {
            var i = t.length - 4,
                r = t.length - 2;
            e[cn] = b(t.substr(0, i)), e[dn] = b(t.substr(i, 2)), e[hn] = b(t.substr(r)), h(n).bigHour = !0
        }), B("Hmm", function(t, e, n) {
            var i = t.length - 2;
            e[cn] = b(t.substr(0, i)), e[dn] = b(t.substr(i))
        }), B("Hmmss", function(t, e, n) {
            var i = t.length - 4,
                r = t.length - 2;
            e[cn] = b(t.substr(0, i)), e[dn] = b(t.substr(i, 2)), e[hn] = b(t.substr(r))
        });
        var En, Pn = /[ap]\.?m?\.?/i,
            On = z("Hours", !0),
            An = {
                calendar: Pe,
                longDateFormat: Oe,
                invalidDate: "Invalid date",
                ordinal: "%d",
                dayOfMonthOrdinalParse: Ae,
                relativeTime: Le,
                months: bn,
                monthsShort: kn,
                week: _n,
                weekdays: Cn,
                weekdaysMin: Dn,
                weekdaysShort: Sn,
                meridiemParse: Pn
            },
            Ln = {},
            Nn = {},
            jn = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            In = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            Hn = /Z|[+-]\d\d(?::?\d\d)?/,
            Rn = [
                ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
                ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
                ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
                ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
                ["YYYY-DDD", /\d{4}-\d{3}/],
                ["YYYY-MM", /\d{4}-\d\d/, !1],
                ["YYYYYYMMDD", /[+-]\d{10}/],
                ["YYYYMMDD", /\d{8}/],
                ["GGGG[W]WWE", /\d{4}W\d{3}/],
                ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
                ["YYYYDDD", /\d{7}/]
            ],
            Yn = [
                ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
                ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
                ["HH:mm:ss", /\d\d:\d\d:\d\d/],
                ["HH:mm", /\d\d:\d\d/],
                ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
                ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
                ["HHmmss", /\d\d\d\d\d\d/],
                ["HHmm", /\d\d\d\d/],
                ["HH", /\d\d/]
            ],
            Wn = /^\/?Date\((\-?\d+)/i,
            Bn = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
            $n = {
                UT: 0,
                GMT: 0,
                EDT: -240,
                EST: -300,
                CDT: -300,
                CST: -360,
                MDT: -360,
                MST: -420,
                PDT: -420,
                PST: -480
            };
        t.createFromInputFallback = x("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(t) {
            t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
        }), t.ISO_8601 = function() {}, t.RFC_2822 = function() {};
        var Vn = x("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
                var t = Bt.apply(null, arguments);
                return this.isValid() && t.isValid() ? t < this ? this : t : p()
            }),
            Gn = x("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
                var t = Bt.apply(null, arguments);
                return this.isValid() && t.isValid() ? t > this ? this : t : p()
            }),
            qn = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
        Ut("Z", ":"), Ut("ZZ", ""), H("Z", en), H("ZZ", en), B(["Z", "ZZ"], function(t, e, n) {
            n._useUTC = !0, n._tzm = Kt(en, t)
        });
        var zn = /([\+\-]|\d\d)/gi;
        t.updateOffset = function() {};
        var Un = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
            Kn = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
        Jt.fn = Gt.prototype, Jt.invalid = function() {
            return Jt(NaN)
        };
        var Qn = ie(1, "add"),
            Xn = ie(-1, "subtract");
        t.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", t.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
        var Zn = x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(t) {
            return void 0 === t ? this.localeData() : this.locale(t)
        });
        A(0, ["gg", 2], 0, function() {
            return this.weekYear() % 100
        }), A(0, ["GG", 2], 0, function() {
            return this.isoWeekYear() % 100
        }), le("gggg", "weekYear"), le("ggggg", "weekYear"), le("GGGG", "isoWeekYear"), le("GGGGG", "isoWeekYear"), T("weekYear", "gg"), T("isoWeekYear", "GG"), E("weekYear", 1), E("isoWeekYear", 1), H("G", Je), H("g", Je), H("GG", qe, Be), H("gg", qe, Be), H("GGGG", Qe, Ve), H("gggg", Qe, Ve), H("GGGGG", Xe, Ge), H("ggggg", Xe, Ge), $(["gggg", "ggggg", "GGGG", "GGGGG"], function(t, e, n, i) {
            e[i.substr(0, 2)] = b(t)
        }), $(["gg", "GG"], function(e, n, i, r) {
            n[r] = t.parseTwoDigitYear(e)
        }), A("Q", 0, "Qo", "quarter"), T("quarter", "Q"), E("quarter", 7), H("Q", We), B("Q", function(t, e) {
            e[ln] = 3 * (b(t) - 1)
        }), A("D", ["DD", 2], "Do", "date"), T("date", "D"), E("date", 9), H("D", qe), H("DD", qe, Be), H("Do", function(t, e) {
            return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient
        }), B(["D", "DD"], un), B("Do", function(t, e) {
            e[un] = b(t.match(qe)[0], 10)
        });
        var Jn = z("Date", !0);
        A("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), T("dayOfYear", "DDD"), E("dayOfYear", 4), H("DDD", Ke), H("DDDD", $e), B(["DDD", "DDDD"], function(t, e, n) {
            n._dayOfYear = b(t)
        }), A("m", ["mm", 2], 0, "minute"), T("minute", "m"), E("minute", 14), H("m", qe), H("mm", qe, Be), B(["m", "mm"], dn);
        var ti = z("Minutes", !1);
        A("s", ["ss", 2], 0, "second"), T("second", "s"), E("second", 15), H("s", qe), H("ss", qe, Be), B(["s", "ss"], hn);
        var ei = z("Seconds", !1);
        A("S", 0, 0, function() {
            return ~~(this.millisecond() / 100)
        }), A(0, ["SS", 2], 0, function() {
            return ~~(this.millisecond() / 10)
        }), A(0, ["SSS", 3], 0, "millisecond"), A(0, ["SSSS", 4], 0, function() {
            return 10 * this.millisecond()
        }), A(0, ["SSSSS", 5], 0, function() {
            return 100 * this.millisecond()
        }), A(0, ["SSSSSS", 6], 0, function() {
            return 1e3 * this.millisecond()
        }), A(0, ["SSSSSSS", 7], 0, function() {
            return 1e4 * this.millisecond()
        }), A(0, ["SSSSSSSS", 8], 0, function() {
            return 1e5 * this.millisecond()
        }), A(0, ["SSSSSSSSS", 9], 0, function() {
            return 1e6 * this.millisecond()
        }), T("millisecond", "ms"), E("millisecond", 16), H("S", Ke, We), H("SS", Ke, Be), H("SSS", Ke, $e);
        var ni;
        for (ni = "SSSS"; ni.length <= 9; ni += "S") H(ni, Ze);
        for (ni = "S"; ni.length <= 9; ni += "S") B(ni, function(t, e) {
            e[fn] = b(1e3 * ("0." + t))
        });
        var ii = z("Milliseconds", !1);
        A("z", 0, 0, "zoneAbbr"), A("zz", 0, 0, "zoneName");
        var ri = g.prototype;
        ri.add = Qn, ri.calendar = function(e, n) {
            var i = e || Bt(),
                r = Qt(i, this).startOf("day"),
                a = t.calendarFormat(this, r) || "sameElse",
                o = n && (C(n[a]) ? n[a].call(this, i) : n[a]);
            return this.format(o || this.localeData().calendar(a, this, Bt(i)))
        }, ri.clone = function() {
            return new g(this)
        }, ri.diff = function(t, e, n) {
            var i, r, a;
            if (!this.isValid()) return NaN;
            if (!(i = Qt(t, this)).isValid()) return NaN;
            switch (r = 6e4 * (i.utcOffset() - this.utcOffset()), e = F(e)) {
                case "year":
                    a = ae(this, i) / 12;
                    break;
                case "month":
                    a = ae(this, i);
                    break;
                case "quarter":
                    a = ae(this, i) / 3;
                    break;
                case "second":
                    a = (this - i) / 1e3;
                    break;
                case "minute":
                    a = (this - i) / 6e4;
                    break;
                case "hour":
                    a = (this - i) / 36e5;
                    break;
                case "day":
                    a = (this - i - r) / 864e5;
                    break;
                case "week":
                    a = (this - i - r) / 6048e5;
                    break;
                default:
                    a = this - i
            }
            return n ? a : y(a)
        }, ri.endOf = function(t) {
            return void 0 === (t = F(t)) || "millisecond" === t ? this : ("date" === t && (t = "day"), this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms"))
        }, ri.format = function(e) {
            e || (e = this.isUtc() ? t.defaultFormatUtc : t.defaultFormat);
            var n = j(this, e);
            return this.localeData().postformat(n)
        }, ri.from = function(t, e) {
            return this.isValid() && (v(t) && t.isValid() || Bt(t).isValid()) ? Jt({
                to: this,
                from: t
            }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
        }, ri.fromNow = function(t) {
            return this.from(Bt(), t)
        }, ri.to = function(t, e) {
            return this.isValid() && (v(t) && t.isValid() || Bt(t).isValid()) ? Jt({
                from: this,
                to: t
            }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
        }, ri.toNow = function(t) {
            return this.to(Bt(), t)
        }, ri.get = function(t) {
            return t = F(t), C(this[t]) ? this[t]() : this
        }, ri.invalidAt = function() {
            return h(this).overflow
        }, ri.isAfter = function(t, e) {
            var n = v(t) ? t : Bt(t);
            return !(!this.isValid() || !n.isValid()) && ("millisecond" === (e = F(r(e) ? "millisecond" : e)) ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(e).valueOf())
        }, ri.isBefore = function(t, e) {
            var n = v(t) ? t : Bt(t);
            return !(!this.isValid() || !n.isValid()) && ("millisecond" === (e = F(r(e) ? "millisecond" : e)) ? this.valueOf() < n.valueOf() : this.clone().endOf(e).valueOf() < n.valueOf())
        }, ri.isBetween = function(t, e, n, i) {
            return ("(" === (i = i || "()")[0] ? this.isAfter(t, n) : !this.isBefore(t, n)) && (")" === i[1] ? this.isBefore(e, n) : !this.isAfter(e, n))
        }, ri.isSame = function(t, e) {
            var n, i = v(t) ? t : Bt(t);
            return !(!this.isValid() || !i.isValid()) && ("millisecond" === (e = F(e || "millisecond")) ? this.valueOf() === i.valueOf() : (n = i.valueOf(), this.clone().startOf(e).valueOf() <= n && n <= this.clone().endOf(e).valueOf()))
        }, ri.isSameOrAfter = function(t, e) {
            return this.isSame(t, e) || this.isAfter(t, e)
        }, ri.isSameOrBefore = function(t, e) {
            return this.isSame(t, e) || this.isBefore(t, e)
        }, ri.isValid = function() {
            return f(this)
        }, ri.lang = Zn, ri.locale = oe, ri.localeData = se, ri.max = Gn, ri.min = Vn, ri.parsingFlags = function() {
            return u({}, h(this))
        }, ri.set = function(t, e) {
            if ("object" == typeof t)
                for (var n = P(t = M(t)), i = 0; i < n.length; i++) this[n[i].unit](t[n[i].unit]);
            else if (t = F(t), C(this[t])) return this[t](e);
            return this
        }, ri.startOf = function(t) {
            switch (t = F(t)) {
                case "year":
                    this.month(0);
                case "quarter":
                case "month":
                    this.date(1);
                case "week":
                case "isoWeek":
                case "day":
                case "date":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
            }
            return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
        }, ri.subtract = Xn, ri.toArray = function() {
            var t = this;
            return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()]
        }, ri.toObject = function() {
            var t = this;
            return {
                years: t.year(),
                months: t.month(),
                date: t.date(),
                hours: t.hours(),
                minutes: t.minutes(),
                seconds: t.seconds(),
                milliseconds: t.milliseconds()
            }
        }, ri.toDate = function() {
            return new Date(this.valueOf())
        }, ri.toISOString = function() {
            if (!this.isValid()) return null;
            var t = this.clone().utc();
            return t.year() < 0 || t.year() > 9999 ? j(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : C(Date.prototype.toISOString) ? this.toDate().toISOString() : j(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        }, ri.inspect = function() {
            if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
            var t = "moment",
                e = "";
            this.isLocal() || (t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", e = "Z");
            var n = "[" + t + '("]',
                i = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
                r = e + '[")]';
            return this.format(n + i + "-MM-DD[T]HH:mm:ss.SSS" + r)
        }, ri.toJSON = function() {
            return this.isValid() ? this.toISOString() : null
        }, ri.toString = function() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        }, ri.unix = function() {
            return Math.floor(this.valueOf() / 1e3)
        }, ri.valueOf = function() {
            return this._d.valueOf() - 6e4 * (this._offset || 0)
        }, ri.creationData = function() {
            return {
                input: this._i,
                format: this._f,
                locale: this._locale,
                isUTC: this._isUTC,
                strict: this._strict
            }
        }, ri.year = vn, ri.isLeapYear = function() {
            return q(this.year())
        }, ri.weekYear = function(t) {
            return ue.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
        }, ri.isoWeekYear = function(t) {
            return ue.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4)
        }, ri.quarter = ri.quarters = function(t) {
            return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
        }, ri.month = tt, ri.daysInMonth = function() {
            return X(this.year(), this.month())
        }, ri.week = ri.weeks = function(t) {
            var e = this.localeData().week(this);
            return null == t ? e : this.add(7 * (t - e), "d")
        }, ri.isoWeek = ri.isoWeeks = function(t) {
            var e = ot(this, 1, 4).week;
            return null == t ? e : this.add(7 * (t - e), "d")
        }, ri.weeksInYear = function() {
            var t = this.localeData()._week;
            return st(this.year(), t.dow, t.doy)
        }, ri.isoWeeksInYear = function() {
            return st(this.year(), 1, 4)
        }, ri.date = Jn, ri.day = ri.days = function(t) {
            if (!this.isValid()) return null != t ? this : NaN;
            var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != t ? (t = lt(t, this.localeData()), this.add(t - e, "d")) : e
        }, ri.weekday = function(t) {
            if (!this.isValid()) return null != t ? this : NaN;
            var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == t ? e : this.add(t - e, "d")
        }, ri.isoWeekday = function(t) {
            if (!this.isValid()) return null != t ? this : NaN;
            if (null != t) {
                var e = ut(t, this.localeData());
                return this.day(this.day() % 7 ? e : e - 7)
            }
            return this.day() || 7
        }, ri.dayOfYear = function(t) {
            var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
            return null == t ? e : this.add(t - e, "d")
        }, ri.hour = ri.hours = On, ri.minute = ri.minutes = ti, ri.second = ri.seconds = ei, ri.millisecond = ri.milliseconds = ii, ri.utcOffset = function(e, n, i) {
            var r, a = this._offset || 0;
            if (!this.isValid()) return null != e ? this : NaN;
            if (null != e) {
                if ("string" == typeof e) {
                    if (null === (e = Kt(en, e))) return this
                } else Math.abs(e) < 16 && !i && (e *= 60);
                return !this._isUTC && n && (r = Xt(this)), this._offset = e, this._isUTC = !0, null != r && this.add(r, "m"), a !== e && (!n || this._changeInProgress ? re(this, Jt(e - a, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, t.updateOffset(this, !0), this._changeInProgress = null)), this
            }
            return this._isUTC ? a : Xt(this)
        }, ri.utc = function(t) {
            return this.utcOffset(0, t)
        }, ri.local = function(t) {
            return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Xt(this), "m")), this
        }, ri.parseZone = function() {
            if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
            else if ("string" == typeof this._i) {
                var t = Kt(tn, this._i);
                null != t ? this.utcOffset(t) : this.utcOffset(0, !0)
            }
            return this
        }, ri.hasAlignedHourOffset = function(t) {
            return !!this.isValid() && (t = t ? Bt(t).utcOffset() : 0, (this.utcOffset() - t) % 60 == 0)
        }, ri.isDST = function() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
        }, ri.isLocal = function() {
            return !!this.isValid() && !this._isUTC
        }, ri.isUtcOffset = function() {
            return !!this.isValid() && this._isUTC
        }, ri.isUtc = Zt, ri.isUTC = Zt, ri.zoneAbbr = function() {
            return this._isUTC ? "UTC" : ""
        }, ri.zoneName = function() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        }, ri.dates = x("dates accessor is deprecated. Use date instead.", Jn), ri.months = x("months accessor is deprecated. Use month instead", tt), ri.years = x("years accessor is deprecated. Use year instead", vn), ri.zone = x("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(t, e) {
            return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset()
        }), ri.isDSTShifted = x("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
            if (!r(this._isDSTShifted)) return this._isDSTShifted;
            var t = {};
            if (m(t, this), (t = Rt(t))._a) {
                var e = t._isUTC ? c(t._a) : Bt(t._a);
                this._isDSTShifted = this.isValid() && k(t._a, e.toArray()) > 0
            } else this._isDSTShifted = !1;
            return this._isDSTShifted
        });
        var ai = D.prototype;
        ai.calendar = function(t, e, n) {
            var i = this._calendar[t] || this._calendar.sameElse;
            return C(i) ? i.call(e, n) : i
        }, ai.longDateFormat = function(t) {
            var e = this._longDateFormat[t],
                n = this._longDateFormat[t.toUpperCase()];
            return e || !n ? e : (this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, function(t) {
                return t.slice(1)
            }), this._longDateFormat[t])
        }, ai.invalidDate = function() {
            return this._invalidDate
        }, ai.ordinal = function(t) {
            return this._ordinal.replace("%d", t)
        }, ai.preparse = de, ai.postformat = de, ai.relativeTime = function(t, e, n, i) {
            var r = this._relativeTime[n];
            return C(r) ? r(t, e, n, i) : r.replace(/%d/i, t)
        }, ai.pastFuture = function(t, e) {
            var n = this._relativeTime[t > 0 ? "future" : "past"];
            return C(n) ? n(e) : n.replace(/%s/i, e)
        }, ai.set = function(t) {
            var e, n;
            for (n in t) C(e = t[n]) ? this[n] = e : this["_" + n] = e;
            this._config = t, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
        }, ai.months = function(t, n) {
            return t ? e(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || yn).test(n) ? "format" : "standalone"][t.month()] : e(this._months) ? this._months : this._months.standalone
        }, ai.monthsShort = function(t, n) {
            return t ? e(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[yn.test(n) ? "format" : "standalone"][t.month()] : e(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
        }, ai.monthsParse = function(t, e, n) {
            var i, r, a;
            if (this._monthsParseExact) return Z.call(this, t, e, n);
            for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; i < 12; i++) {
                if (r = c([2e3, i]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), n || this._monthsParse[i] || (a = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[i] = new RegExp(a.replace(".", ""), "i")), n && "MMMM" === e && this._longMonthsParse[i].test(t)) return i;
                if (n && "MMM" === e && this._shortMonthsParse[i].test(t)) return i;
                if (!n && this._monthsParse[i].test(t)) return i
            }
        }, ai.monthsRegex = function(t) {
            return this._monthsParseExact ? (l(this, "_monthsRegex") || et.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : (l(this, "_monthsRegex") || (this._monthsRegex = xn), this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex)
        }, ai.monthsShortRegex = function(t) {
            return this._monthsParseExact ? (l(this, "_monthsRegex") || et.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (l(this, "_monthsShortRegex") || (this._monthsShortRegex = wn), this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex)
        }, ai.week = function(t) {
            return ot(t, this._week.dow, this._week.doy).week
        }, ai.firstDayOfYear = function() {
            return this._week.doy
        }, ai.firstDayOfWeek = function() {
            return this._week.dow
        }, ai.weekdays = function(t, n) {
            return t ? e(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(n) ? "format" : "standalone"][t.day()] : e(this._weekdays) ? this._weekdays : this._weekdays.standalone
        }, ai.weekdaysMin = function(t) {
            return t ? this._weekdaysMin[t.day()] : this._weekdaysMin
        }, ai.weekdaysShort = function(t) {
            return t ? this._weekdaysShort[t.day()] : this._weekdaysShort
        }, ai.weekdaysParse = function(t, e, n) {
            var i, r, a;
            if (this._weekdaysParseExact) return ct.call(this, t, e, n);
            for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; i < 7; i++) {
                if (r = c([2e3, 1]).day(i), n && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(r, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[i] || (a = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[i] = new RegExp(a.replace(".", ""), "i")), n && "dddd" === e && this._fullWeekdaysParse[i].test(t)) return i;
                if (n && "ddd" === e && this._shortWeekdaysParse[i].test(t)) return i;
                if (n && "dd" === e && this._minWeekdaysParse[i].test(t)) return i;
                if (!n && this._weekdaysParse[i].test(t)) return i
            }
        }, ai.weekdaysRegex = function(t) {
            return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || dt.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (l(this, "_weekdaysRegex") || (this._weekdaysRegex = Tn), this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex)
        }, ai.weekdaysShortRegex = function(t) {
            return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || dt.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (l(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Fn), this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
        }, ai.weekdaysMinRegex = function(t) {
            return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || dt.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (l(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Mn), this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
        }, ai.isPM = function(t) {
            return "p" === (t + "").toLowerCase().charAt(0)
        }, ai.meridiem = function(t, e, n) {
            return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
        }, yt("en", {
            dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function(t) {
                var e = t % 10;
                return t + (1 === b(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th")
            }
        }), t.lang = x("moment.lang is deprecated. Use moment.locale instead.", yt), t.langData = x("moment.langData is deprecated. Use moment.localeData instead.", kt);
        var oi = Math.abs,
            si = be("ms"),
            li = be("s"),
            ui = be("m"),
            ci = be("h"),
            di = be("d"),
            hi = be("w"),
            fi = be("M"),
            pi = be("y"),
            mi = ke("milliseconds"),
            gi = ke("seconds"),
            vi = ke("minutes"),
            yi = ke("hours"),
            bi = ke("days"),
            ki = ke("months"),
            wi = ke("years"),
            xi = Math.round,
            _i = {
                ss: 44,
                s: 45,
                m: 45,
                h: 22,
                d: 26,
                M: 11
            },
            Ci = Math.abs,
            Si = Gt.prototype;
        return Si.isValid = function() {
                return this._isValid
            }, Si.abs = function() {
                var t = this._data;
                return this._milliseconds = oi(this._milliseconds), this._days = oi(this._days), this._months = oi(this._months), t.milliseconds = oi(t.milliseconds), t.seconds = oi(t.seconds), t.minutes = oi(t.minutes), t.hours = oi(t.hours), t.months = oi(t.months), t.years = oi(t.years), this
            }, Si.add = function(t, e) {
                return me(this, t, e, 1)
            }, Si.subtract = function(t, e) {
                return me(this, t, e, -1)
            }, Si.as = function(t) {
                if (!this.isValid()) return NaN;
                var e, n, i = this._milliseconds;
                if ("month" === (t = F(t)) || "year" === t) return e = this._days + i / 864e5, n = this._months + ve(e), "month" === t ? n : n / 12;
                switch (e = this._days + Math.round(ye(this._months)), t) {
                    case "week":
                        return e / 7 + i / 6048e5;
                    case "day":
                        return e + i / 864e5;
                    case "hour":
                        return 24 * e + i / 36e5;
                    case "minute":
                        return 1440 * e + i / 6e4;
                    case "second":
                        return 86400 * e + i / 1e3;
                    case "millisecond":
                        return Math.floor(864e5 * e) + i;
                    default:
                        throw new Error("Unknown unit " + t)
                }
            }, Si.asMilliseconds = si, Si.asSeconds = li, Si.asMinutes = ui, Si.asHours = ci, Si.asDays = di, Si.asWeeks = hi, Si.asMonths = fi, Si.asYears = pi, Si.valueOf = function() {
                return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * b(this._months / 12) : NaN
            }, Si._bubble = function() {
                var t, e, n, i, r, a = this._milliseconds,
                    o = this._days,
                    s = this._months,
                    l = this._data;
                return a >= 0 && o >= 0 && s >= 0 || a <= 0 && o <= 0 && s <= 0 || (a += 864e5 * ge(ye(s) + o), o = 0, s = 0), l.milliseconds = a % 1e3, t = y(a / 1e3), l.seconds = t % 60, e = y(t / 60), l.minutes = e % 60, n = y(e / 60), l.hours = n % 24, o += y(n / 24), r = y(ve(o)), s += r, o -= ge(ye(r)), i = y(s / 12), s %= 12, l.days = o, l.months = s, l.years = i, this
            }, Si.clone = function() {
                return Jt(this)
            }, Si.get = function(t) {
                return t = F(t), this.isValid() ? this[t + "s"]() : NaN
            }, Si.milliseconds = mi, Si.seconds = gi, Si.minutes = vi, Si.hours = yi, Si.days = bi, Si.weeks = function() {
                return y(this.days() / 7)
            }, Si.months = ki, Si.years = wi, Si.humanize = function(t) {
                if (!this.isValid()) return this.localeData().invalidDate();
                var e = this.localeData(),
                    n = xe(this, !t, e);
                return t && (n = e.pastFuture(+this, n)), e.postformat(n)
            }, Si.toISOString = Ce, Si.toString = Ce, Si.toJSON = Ce, Si.locale = oe, Si.localeData = se, Si.toIsoString = x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Ce), Si.lang = Zn, A("X", 0, 0, "unix"), A("x", 0, 0, "valueOf"), H("x", Je), H("X", nn), B("X", function(t, e, n) {
                n._d = new Date(1e3 * parseFloat(t, 10))
            }), B("x", function(t, e, n) {
                n._d = new Date(b(t))
            }), t.version = "2.19.1",
            function(t) {
                Se = t
            }(Bt), t.fn = ri, t.min = function() {
                return $t("isBefore", [].slice.call(arguments, 0))
            }, t.max = function() {
                return $t("isAfter", [].slice.call(arguments, 0))
            }, t.now = function() {
                return Date.now ? Date.now() : +new Date
            }, t.utc = c, t.unix = function(t) {
                return Bt(1e3 * t)
            }, t.months = function(t, e) {
                return fe(t, e, "months")
            }, t.isDate = o, t.locale = yt, t.invalid = p, t.duration = Jt, t.isMoment = v, t.weekdays = function(t, e, n) {
                return pe(t, e, n, "weekdays")
            }, t.parseZone = function() {
                return Bt.apply(null, arguments).parseZone()
            }, t.localeData = kt, t.isDuration = qt, t.monthsShort = function(t, e) {
                return fe(t, e, "monthsShort")
            }, t.weekdaysMin = function(t, e, n) {
                return pe(t, e, n, "weekdaysMin")
            }, t.defineLocale = bt, t.updateLocale = function(t, e) {
                if (null != e) {
                    var n, i = An;
                    null != Ln[t] && (i = Ln[t]._config), (n = new D(e = S(i, e))).parentLocale = Ln[t], Ln[t] = n, yt(t)
                } else null != Ln[t] && (null != Ln[t].parentLocale ? Ln[t] = Ln[t].parentLocale : null != Ln[t] && delete Ln[t]);
                return Ln[t]
            }, t.locales = function() {
                return Ee(Ln)
            }, t.weekdaysShort = function(t, e, n) {
                return pe(t, e, n, "weekdaysShort")
            }, t.normalizeUnits = F, t.relativeTimeRounding = function(t) {
                return void 0 === t ? xi : "function" == typeof t && (xi = t, !0)
            }, t.relativeTimeThreshold = function(t, e) {
                return void 0 !== _i[t] && (void 0 === e ? _i[t] : (_i[t] = e, "s" === t && (_i.ss = e - 1), !0))
            }, t.calendarFormat = function(t, e) {
                var n = t.diff(e, "days", !0);
                return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse"
            }, t.prototype = ri, t
    }),
    function(t, e) {
        "object" == typeof exports && "undefined" != typeof module && "function" == typeof require ? e(require("../moment")) : "function" == typeof define && define.amd ? define(["../moment"], e) : e(t.moment)
    }(this, function(t) {
        "use strict";

        function e(t, e) {
            var n = t.split("_");
            return e % 10 == 1 && e % 100 != 11 ? n[0] : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? n[1] : n[2]
        }

        function n(t, n, i) {
            var r = {
                mm: n ? "минута_минуты_минут" : "минуту_минуты_минут",
                hh: "час_часа_часов",
                dd: "день_дня_дней",
                MM: "месяц_месяца_месяцев",
                yy: "год_года_лет"
            };
            return "m" === i ? n ? "минута" : "минуту" : t + " " + e(r[i], +t)
        }
        var i = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];
        return t.defineLocale("ru", {
            months: {
                format: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),
                standalone: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_")
            },
            monthsShort: {
                format: "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),
                standalone: "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_")
            },
            weekdays: {
                standalone: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
                format: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_"),
                isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
            },
            weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"),
            weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
            monthsParse: i,
            longMonthsParse: i,
            shortMonthsParse: i,
            monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
            monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
            monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
            monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
            longDateFormat: {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY г.",
                LLL: "D MMMM YYYY г., HH:mm",
                LLLL: "dddd, D MMMM YYYY г., HH:mm"
            },
            calendar: {
                sameDay: "[Сегодня в] LT",
                nextDay: "[Завтра в] LT",
                lastDay: "[Вчера в] LT",
                nextWeek: function(t) {
                    if (t.week() === this.week()) return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
                    switch (this.day()) {
                        case 0:
                            return "[В следующее] dddd [в] LT";
                        case 1:
                        case 2:
                        case 4:
                            return "[В следующий] dddd [в] LT";
                        case 3:
                        case 5:
                        case 6:
                            return "[В следующую] dddd [в] LT"
                    }
                },
                lastWeek: function(t) {
                    if (t.week() === this.week()) return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
                    switch (this.day()) {
                        case 0:
                            return "[В прошлое] dddd [в] LT";
                        case 1:
                        case 2:
                        case 4:
                            return "[В прошлый] dddd [в] LT";
                        case 3:
                        case 5:
                        case 6:
                            return "[В прошлую] dddd [в] LT"
                    }
                },
                sameElse: "L"
            },
            relativeTime: {
                future: "через %s",
                past: "%s назад",
                s: "несколько секунд",
                m: n,
                mm: n,
                h: "час",
                hh: n,
                d: "день",
                dd: n,
                M: "месяц",
                MM: n,
                y: "год",
                yy: n
            },
            meridiemParse: /ночи|утра|дня|вечера/i,
            isPM: function(t) {
                return /^(дня|вечера)$/.test(t)
            },
            meridiem: function(t, e, n) {
                return 4 > t ? "ночи" : 12 > t ? "утра" : 17 > t ? "дня" : "вечера"
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
            ordinal: function(t, e) {
                switch (e) {
                    case "M":
                    case "d":
                    case "DDD":
                        return t + "-й";
                    case "D":
                        return t + "-го";
                    case "w":
                    case "W":
                        return t + "-я";
                    default:
                        return t
                }
            },
            week: {
                dow: 1,
                doy: 4
            }
        })
    }), Kontur.Module("Kontur.Counters.GoogleTagManager", function(t) {
        var e = t.get();
        this.sendEvent = function(t) {
            (e.dataLayer || []).push({
                event: t
            })
        }
    }, [Kontur.Global]), Kontur.Module("Kontur.Counters.GoogleAnalytics", function(t, e, n) {
        function i() {
            return o._gaq = o._gaq || []
        }

        function r(t, e, n, i) {
            var r = n || s,
                a = ["_trackEvent", r, t];
            return i && a.push(i), e && a.push(e), a
        }

        function a(t, e, n, i) {
            var r = n || s,
                a = {
                    hitType: "event",
                    eventCategory: r
                };
            return t && (a.eventAction = t), e && (a.eventValue = parseInt(e) || 0), i && (a.eventLabel = i), a
        }
        var o = e.get(),
            s = "events";
        this.sendEvent = function(t, e, n, s) {
            var l = r(t, e, n, s);
            if (i().push(l), "function" == typeof o.ga) {
                var u = a(t, e, n, s);
                o.ga("send", u)
            }
        }, this.sendPageView = function(t) {
            if ("function" == typeof o.ga) o.ga("set", "page", t), o.ga("send", "pageview");
            else {
                i().push(["_trackPageview", t])
            }
        }, this.setParameter = function(e, i) {
            if (n && "function" == typeof n.getDimensions) {
                var r = t.inArray(e, n.getDimensions());
                if (-1 != r) {
                    (o.ga || function() {
                        o.console && o.console.log && o.console.log(arguments)
                    })("set", "dimension" + (r + 1), i)
                }
            }
        }
    }, [jQuery, Kontur.Global, {
        optional: "Kontur.GaDimensions"
    }]), Kontur.Module("Kontur.Counters.YandexMetrika", function(t) {
        function e() {
            var t = null;
            for (var n in i)
                if (0 == n.indexOf("yaCounter")) {
                    t = n;
                    break
                }
            return t ? (e = function() {
                return i[t]
            })() : null
        }

        function n(t, e, n, i) {
            var a = n || r,
                o = {
                    hitType: "event",
                    eventCategory: a
                };
            return t && (o.eventAction = t), e && (o.eventValue = parseInt(e) || 0), i && (o.eventLabel = i), o
        }
        var i = t.get(),
            r = "events";
        this.sendEvent = function(t, r, a, o) {
            var s = n(null, r, a, o),
                l = e();
            l ? l.reachGoal(t, s) : (i.pageEvents = i.pageEvents || [], i.pageEvents.push(t))
        }, this.sendPageView = function(t) {
            var n = e();
            n && n.hit(t)
        }, this.getYandexCounter = e
    }, [Kontur.Global]), Kontur.Module("Kontur.Counters.LiveInternet", function(t, e) {
        function n() {
            return t('[src^="//counter.yadro.ru"]')[0]
        }

        function i(t) {
            return t.src.match(/(\/\/counter.yadro.ru\/hit\?.*?)r/)[1]
        }

        function r(t, e) {
            var n = o.location.origin,
                i = o.screen,
                r = o.document;
            return "r" + o.escape(e || r.referrer) + (void 0 !== i ? ";s" + i.width + "*" + i.height + "*" + (i.colorDepth ? i.colorDepth : i.pixelDepth) : "") + ";u" + o.escape(n + t) + ";" + o.Math.random()
        }

        function a(t) {
            o.document.createElement("img").src = t
        }
        var o = e.get();
        this.sendPageView = function(t, e) {
            var o = n();
            o && a(i(o) + r(t, e))
        }
    }, [jQuery, Kontur.Global]), Kontur.Module("Kontur.Counters", function(t, e, n, i, r, a, o) {
        function s(t) {
            var e = t.replace(/[&=?#]/g, "").replace(/(\/|-)+/g, "-").replace(/^-+|-+$/g, "");
            return null != d ? d(e) : e
        }
        var l = this,
            u = !1,
            c = e.get(),
            d = null;
        l.registerPageView = function(e, n) {
            t(function() {
                r.sendPageView(e), a.sendPageView(e), o.sendPageView(e, n), c.console && c.console.info("page view was registered: " + e + " (referrer: " + n + ")")
            })
        }, l.setCustomParameter = function(t, e) {
            r.setParameter(t, e)
        }, l.registerPageEvent = function(e, n, o, l) {
            function u() {
                var t = s(e);
                c.Kontur && c.Kontur.GoogleTagManagerStrictMode ? i.sendEvent(t) : (r.sendEvent(t, n, o, l), a.sendEvent(t, n, o, l)), c.console && c.console.info("event was registred: " + t)
            }
            "complete" === document.readyState ? u() : t(c).on("load", function() {
                u()
            })
        }, l.setEventNameDecorator = function(t) {
            "function" == typeof t && (d = t)
        }, l.initialize = function() {
            u || (c.loadScriptAsync = function(t) {
                var e = document.createElement("script");
                e.type = "text/javascript", e.async = !0, e.src = t;
                var n = document.getElementsByTagName("script")[0];
                n.parentNode.insertBefore(e, n)
            }, c.RegisterPageEvent = l.registerPageEvent, u = !0)
        }
    }, [jQuery, Kontur.Global, {
        optional: "Kontur.GaDimensions"
    }, Kontur.Counters.GoogleTagManager, Kontur.Counters.GoogleAnalytics, Kontur.Counters.YandexMetrika, Kontur.Counters.LiveInternet]), Kontur.Module("Kontur.PageEvents", function(t, e, n) {
        var i = !1;
        this.initialize = function() {
            var r = e.get();
            i || (t(r).on("pageEvent", function(t, e) {
                n.registerPageEvent(e)
            }), r.Kontur && r.Kontur.GoogleTagManagerStrictMode || (t(r.document).on("click", "[data-event-name]:not(form)", function(e) {
                var i = t(e.currentTarget),
                    r = i.data("event-name"),
                    a = i.data("event-value"),
                    o = i.data("event-category"),
                    s = i.data("event-label");
                n.registerPageEvent(r, a, o, s)
            }), t(r.document).on("submits", "form", function() {
                var e = t(this),
                    i = e.data("event") || e.data("event-name") || e.attr("action"),
                    r = e.data("event-value"),
                    a = e.data("event-category"),
                    o = e.data("event-label");
                n.registerPageEvent("event-" + i + "-submits", r, a, o)
            })), i = !0)
        }
    }, [jQuery, Kontur.Global, Kontur.Counters]), Kontur.Counters.initialize(), Kontur.PageEvents.initialize();
var Kontur = Kontur || {};
Kontur.ExternalWindow = function(t, e, n) {
    "use strict";

    function i(t) {
        return (t.split("://").slice(-1).pop() || "").split(".").slice(-2).join(".")
    }
    var r, a, o, s, l = {
            parse: function(t) {
                return n.parseJSON(t)
            }
        },
        u = {
            selector: ".externalWindow",
            scrolling: "no",
            frameborder: 0,
            allowTransparency: "true",
            height: "auto",
            width: "100%",
            methods: {},
            messageParser: l,
            allowedOrigins: []
        },
        c = function() {
            r.apply(this, arguments)
        },
        d = [];
    return r = function(e) {
        var i = this.options = n.extend({}, u, e);
        this.$iframe = n(i.selector), a.call(this), e.disableHash || (t.location.hash = "_")
    }, a = function() {
        function r(t) {
            if (l.href = t, l.href = l.href, l.origin) return l.origin;
            var e = l.protocol + "//" + l.hostname;
            return "https:" === l.protocol && "443" === l.port || "http:" === l.protocol && "80" === l.port ? e : e + ":" + l.port
        }
        var a = n.proxy(o, this);
        t.addEventListener ? t.addEventListener("message", a, !1) : t.attachEvent && t.attachEvent("onmessage", a);
        var l = e.createElement("a"),
            u = this;
        this.$iframe.each(function(t, e) {
            var a = n(e),
                o = a.attr("src"),
                l = i(r(o));
            u.options.allowedOrigins.push(l), d.push(e.contentWindow), a.on("load", function() {
                s(a)
            })
        }), this.$iframe.attr("scrolling", this.options.scrolling).attr("frameborder", this.options.frameborder).attr("allowtransparency", this.options.allowTransparency).attr("height", this.options.height).attr("width", this.options.width)
    }, o = function(e) {
        var r = void 0 !== t.console,
            a = t.console;
        if (r && c.debugMode && a.log("receive: " + e.data), n.inArray(e.source, d) < 0) return void(r && c.debugMode && a.warn("Attempt to process message from unexpected source"));
        var o = i(e.origin);
        if (n.inArray(o, this.options.allowedOrigins) < 0) return void(r && c.debugMode && a.warn("Attempt to process message from unexpected origin " + e.origin));
        try {
            var s = "string" == typeof e.data ? this.options.messageParser.parse(e.data) : e.data;
            this.handleMessage(e.source, s)
        } catch (t) {
            r && a.log("notice: postMessage handling failed: " + t.message)
        }
    }, s = function(t) {
        t.show()
    }, c.prototype = {
        debugMode: !1,
        showFrame: function(t) {
            s.call(this, t)
        },
        setHeight: function(t, e) {
            t.css("height", e)
        },
        scrollTop: function(t, e) {
            var i = n(t).offset().top,
                r = i + e;
            n("html, body").animate({
                scrollTop: r
            }, 500)
        },
        scrollBottom: function(e, i) {
            var r = n(e),
                a = r.offset().top,
                o = (r.outerHeight(), n(t).height()),
                s = a + i - o;
            n("html, body").stop().animate({
                scrollTop: s
            }, 500)
        },
        redirectParent: function(e, n) {
            t.location.href = n
        },
        handleMessage: function(t, e) {
            var i, r, a;
            for (i = 0, r = this.$iframe.length; i < r; i++) this.$iframe[i].contentWindow === t && (a = n(this.$iframe[i]));
            for (var o in e) "url" !== o && this.handleCommand(a || this.$iframe, o, e[o])
        },
        handleCommand: function(t, e, n) {
            "function" == typeof this.options.methods[e] ? this.options.methods[e].call(this, t, n) : "function" == typeof this[e] && this[e](t, n)
        }
    }, c
}(window, document, jQuery), Kontur.Module("Kontur.Counter", function(t) {
    function e() {
        if (i.start > r) var e = setInterval(function() {
            r++, i.start <= r && (n(), clearInterval(e))
        }, 1e3);
        else n();
        t(i.wrapper).on("click", function(t) {
            t.preventDefault()
        })
    }

    function n() {
        var e = i.finish - r;
        e = e <= 0 ? 0 : e, t(i.wrapper).show().removeClass("hide"), t(i.counter).FlipClock(e, {
            clockFace: "DailyCounter",
            autoStart: !0,
            countdown: !0,
            language: "ru"
        }), e / 86400 > 99 && t(i.counter).addClass("flip-clock-wrapper_day-three-value")
    }
    var i, r = t("body").data("kontur-counter");
    this.init = function(t) {
        t.start = t.start ? moment(t.start, "DD.MM.YYYY, hh:mm").utc(3).format("X") : r, t.finish = moment(t.finish, "DD.MM.YYYY, hh:mm").utc(3).format("X"), i = t, e()
    }
}, [jQuery]);
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    },
    Base = function() {};
Base.extend = function(t, e) {
    "use strict";
    var n = Base.prototype.extend;
    Base._prototyping = !0;
    var i = new this;
    n.call(i, t), i.base = function() {}, delete Base._prototyping;
    var r = i.constructor,
        a = i.constructor = function() {
            if (!Base._prototyping)
                if (this._constructing || this.constructor == a) this._constructing = !0, r.apply(this, arguments), delete this._constructing;
                else if (null !== arguments[0]) return (arguments[0].extend || n).call(arguments[0], i)
        };
    return a.ancestor = this, a.extend = this.extend, a.forEach = this.forEach, a.implement = this.implement, a.prototype = i, a.toString = this.toString, a.valueOf = function(t) {
        return "object" == t ? a : r.valueOf()
    }, n.call(a, e), "function" == typeof a.init && a.init(), a
}, Base.prototype = {
    extend: function(t, e) {
        if (arguments.length > 1) {
            var n = this[t];
            if (n && "function" == typeof e && (!n.valueOf || n.valueOf() != e.valueOf()) && /\bbase\b/.test(e)) {
                var i = e.valueOf();
                e = function() {
                    var t = this.base || Base.prototype.base;
                    this.base = n;
                    var e = i.apply(this, arguments);
                    return this.base = t, e
                }, e.valueOf = function(t) {
                    return "object" == t ? e : i
                }, e.toString = Base.toString
            }
            this[t] = e
        } else if (t) {
            var r = Base.prototype.extend;
            Base._prototyping || "function" == typeof this || (r = this.extend || r);
            for (var a = {
                    toSource: null
                }, o = ["constructor", "toString", "valueOf"], s = Base._prototyping ? 0 : 1; l = o[s++];) t[l] != a[l] && r.call(this, l, t[l]);
            for (var l in t) a[l] || r.call(this, l, t[l])
        }
        return this
    }
}, Base = Base.extend({
    constructor: function() {
        this.extend(arguments[0])
    }
}, {
    ancestor: Object,
    version: "1.1",
    forEach: function(t, e, n) {
        for (var i in t) void 0 === this.prototype[i] && e.call(n, t[i], i, t)
    },
    implement: function() {
        for (var t = 0; t < arguments.length; t++) "function" == typeof arguments[t] ? arguments[t](this.prototype) : this.prototype.extend(arguments[t]);
        return this
    },
    toString: function() {
        return String(this.valueOf())
    }
});
var _FlipClock;
! function(t) {
    "use strict";
    _FlipClock = function(t, e, n) {
        return e instanceof Object && e instanceof Date == !1 && (n = e, e = 0), new _FlipClock.Factory(t, e, n)
    }, _FlipClock.Lang = {}, _FlipClock.Base = Base.extend({
        buildDate: "2014-12-12",
        version: "0.7.7",
        constructor: function(e, n) {
            "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), "object" !== (void 0 === n ? "undefined" : _typeof(n)) && (n = {}), this.setOptions(t.extend(!0, {}, e, n))
        },
        callback: function(t) {
            if ("function" == typeof t) {
                for (var e = [], n = 1; n <= arguments.length; n++) arguments[n] && e.push(arguments[n]);
                t.apply(this, e)
            }
        },
        log: function(t) {
            window.console && console.log && console.log(t)
        },
        getOption: function(t) {
            return !!this[t] && this[t]
        },
        getOptions: function() {
            return this
        },
        setOption: function(t, e) {
            this[t] = e
        },
        setOptions: function(t) {
            for (var e in t) void 0 !== t[e] && this.setOption(e, t[e])
        }
    })
}(jQuery),
function(t) {
    "use strict";
    _FlipClock.Face = _FlipClock.Base.extend({
        autoStart: !0,
        dividers: [],
        factory: !1,
        lists: [],
        constructor: function(t, e) {
            this.dividers = [], this.lists = [], this.base(e), this.factory = t
        },
        build: function() {
            this.autoStart && this.start()
        },
        createDivider: function(e, n, i) {
            "boolean" != typeof n && n || (i = n, n = e);
            var r = ['<span class="' + this.factory.classes.dot + ' top"></span>', '<span class="' + this.factory.classes.dot + ' bottom"></span>'].join("");
            i && (r = ""), e = this.factory.localize(e);
            var a = ['<span class="' + this.factory.classes.divider + " " + (n || "").toLowerCase() + '">', '<span class="' + this.factory.classes.label + '">' + (e || "") + "</span>", r, "</span>"],
                o = t(a.join(""));
            return this.dividers.push(o), o
        },
        createList: function(t, e) {
            "object" === (void 0 === t ? "undefined" : _typeof(t)) && (e = t, t = 0);
            var n = new _FlipClock.List(this.factory, t, e);
            return this.lists.push(n), n
        },
        reset: function() {
            this.factory.time = new _FlipClock.Time(this.factory, this.factory.original ? Math.round(this.factory.original) : 0, {
                minimumDigits: this.factory.minimumDigits
            }), this.flip(this.factory.original, !1)
        },
        appendDigitToClock: function(t) {
            t.$el.append(!1)
        },
        addDigit: function(t) {
            var e = this.createList(t, {
                classes: {
                    active: this.factory.classes.active,
                    before: this.factory.classes.before,
                    flip: this.factory.classes.flip
                }
            });
            this.appendDigitToClock(e)
        },
        start: function() {},
        stop: function() {},
        autoIncrement: function() {
            this.factory.countdown ? this.decrement() : this.increment()
        },
        increment: function() {
            this.factory.time.addSecond()
        },
        decrement: function() {
            0 == this.factory.time.getTimeSeconds() ? this.factory.stop() : this.factory.time.subSecond()
        },
        flip: function(e, n) {
            var i = this;
            t.each(e, function(t, e) {
                var r = i.lists[t];
                r ? (n || e == r.digit || r.play(), r.select(e)) : i.addDigit(e)
            })
        }
    })
}(jQuery),
function(t) {
    "use strict";
    _FlipClock.Factory = _FlipClock.Base.extend({
        animationRate: 1e3,
        autoStart: !0,
        callbacks: {
            destroy: !1,
            create: !1,
            init: !1,
            interval: !1,
            start: !1,
            stop: !1,
            reset: !1
        },
        classes: {
            active: "flip-clock-active",
            before: "flip-clock-before",
            divider: "flip-clock-divider",
            dot: "flip-clock-dot",
            label: "flip-clock-label",
            flip: "flip",
            play: "play",
            wrapper: "flip-clock-wrapper"
        },
        clockFace: "HourlyCounter",
        countdown: !1,
        defaultClockFace: "HourlyCounter",
        defaultLanguage: "english",
        $el: !1,
        face: !0,
        lang: !1,
        language: "english",
        minimumDigits: 0,
        original: !1,
        running: !1,
        time: !1,
        timer: !1,
        $wrapper: !1,
        constructor: function(e, n, i) {
            i || (i = {}), this.lists = [], this.running = !1, this.base(i), this.$el = t(e).addClass(this.classes.wrapper), this.$wrapper = this.$el, this.original = n instanceof Date ? n : n ? Math.round(n) : 0, this.time = new _FlipClock.Time(this, this.original, {
                minimumDigits: this.minimumDigits,
                animationRate: this.animationRate
            }), this.timer = new _FlipClock.Timer(this, i), this.loadLanguage(this.language), this.loadClockFace(this.clockFace, i), this.autoStart && this.start()
        },
        loadClockFace: function(t, e) {
            var n, i = !1;
            return t = t.ucfirst() + "Face", this.face.stop && (this.stop(), i = !0), this.$el.html(""), this.time.minimumDigits = this.minimumDigits, n = _FlipClock[t] ? new _FlipClock[t](this, e) : new _FlipClock[this.defaultClockFace + "Face"](this, e), n.build(), this.face = n, i && this.start(), this.face
        },
        loadLanguage: function(t) {
            var e;
            return e = _FlipClock.Lang[t.ucfirst()] ? _FlipClock.Lang[t.ucfirst()] : _FlipClock.Lang[t] ? _FlipClock.Lang[t] : _FlipClock.Lang[this.defaultLanguage], this.lang = e
        },
        localize: function(t, e) {
            var n = this.lang;
            if (!t) return null;
            var i = t.toLowerCase();
            return "object" == (void 0 === e ? "undefined" : _typeof(e)) && (n = e), n && n[i] ? n[i] : t
        },
        start: function(t) {
            var e = this;
            e.running || e.countdown && !(e.countdown && e.time.time > 0) ? e.log("Trying to start timer when countdown already at 0") : (e.face.start(e.time), e.timer.start(function() {
                e.flip(), "function" == typeof t && t()
            }))
        },
        stop: function(t) {
            this.face.stop(), this.timer.stop(t);
            for (var e in this.lists) this.lists.hasOwnProperty(e) && this.lists[e].stop()
        },
        reset: function(t) {
            this.timer.reset(t), this.face.reset()
        },
        setTime: function(t) {
            this.time.time = t, this.flip(!0)
        },
        getTime: function(t) {
            return this.time
        },
        setCountdown: function(t) {
            var e = this.running;
            this.countdown = !!t, e && (this.stop(), this.start())
        },
        flip: function(t) {
            this.face.flip(!1, t)
        }
    })
}(jQuery),
function(t) {
    "use strict";
    _FlipClock.List = _FlipClock.Base.extend({
        digit: 0,
        classes: {
            active: "flip-clock-active",
            before: "flip-clock-before",
            flip: "flip"
        },
        factory: !1,
        $el: !1,
        $obj: !1,
        items: [],
        lastDigit: 0,
        constructor: function(t, e, n) {
            this.factory = t, this.digit = e, this.lastDigit = e, this.$el = this.createList(), this.$obj = this.$el, e > 0 && this.select(e), this.factory.$el.append(this.$el)
        },
        select: function(t) {
            if (void 0 === t ? t = this.digit : this.digit = t, this.digit != this.lastDigit) {
                var e = this.$el.find("." + this.classes.before).removeClass(this.classes.before);
                this.$el.find("." + this.classes.active).removeClass(this.classes.active).addClass(this.classes.before), this.appendListItem(this.classes.active, this.digit), e.remove(), this.lastDigit = this.digit
            }
        },
        play: function() {
            this.$el.addClass(this.factory.classes.play)
        },
        stop: function() {
            var t = this;
            setTimeout(function() {
                t.$el.removeClass(t.factory.classes.play)
            }, this.factory.timer.interval)
        },
        createListItem: function(t, e) {
            return ['<li class="' + (t || "") + '">', '<a href="#">', '<div class="up">', '<div class="shadow"></div>', '<div class="inn">' + (e || "") + "</div>", "</div>", '<div class="down">', '<div class="shadow"></div>', '<div class="inn">' + (e || "") + "</div>", "</div>", "</a>", "</li>"].join("")
        },
        appendListItem: function(t, e) {
            var n = this.createListItem(t, e);
            this.$el.append(n)
        },
        createList: function() {
            var e = this.getPrevDigit() ? this.getPrevDigit() : this.digit;
            return t(['<ul class="' + this.classes.flip + " " + (this.factory.running ? this.factory.classes.play : "") + '">', this.createListItem(this.classes.before, e), this.createListItem(this.classes.active, this.digit), "</ul>"].join(""))
        },
        getNextDigit: function() {
            return 9 == this.digit ? 0 : this.digit + 1
        },
        getPrevDigit: function() {
            return 0 == this.digit ? 9 : this.digit - 1
        }
    })
}(jQuery),
function(t) {
    "use strict";
    String.prototype.ucfirst = function() {
        return this.substr(0, 1).toUpperCase() + this.substr(1)
    }, t.fn.FlipClock = function(e, n) {
        return new _FlipClock(t(this), e, n)
    }, t.fn.flipClock = function(e, n) {
        return t.fn.FlipClock(e, n)
    }
}(jQuery),
function(t) {
    "use strict";
    _FlipClock.Time = _FlipClock.Base.extend({
        time: 0,
        factory: !1,
        minimumDigits: 0,
        constructor: function(t, e, n) {
            "object" != (void 0 === n ? "undefined" : _typeof(n)) && (n = {}), n.minimumDigits || (n.minimumDigits = t.minimumDigits), this.base(n), this.factory = t, e && (this.time = e)
        },
        convertDigitsToArray: function(t) {
            var e = [];
            t = t.toString();
            for (var n = 0; n < t.length; n++) t[n].match(/^\d*$/g) && e.push(t[n]);
            return e
        },
        digit: function(t) {
            var e = this.toString(),
                n = e.length;
            return !!e[n - t] && e[n - t]
        },
        digitize: function(e) {
            var n = [];
            if (t.each(e, function(t, e) {
                    e = e.toString(), 1 == e.length && (e = "0" + e);
                    for (var i = 0; i < e.length; i++) n.push(e.charAt(i))
                }), n.length > this.minimumDigits && (this.minimumDigits = n.length), this.minimumDigits > n.length)
                for (var i = n.length; i < this.minimumDigits; i++) n.unshift("0");
            return n
        },
        getDateObject: function() {
            return this.time instanceof Date ? this.time : new Date((new Date).getTime() + 1e3 * this.getTimeSeconds())
        },
        getDayCounter: function(t) {
            var e = [this.getDays(), this.getHours(!0), this.getMinutes(!0)];
            return t && e.push(this.getSeconds(!0)), this.digitize(e)
        },
        getDays: function(t) {
            var e = this.getTimeSeconds() / 60 / 60 / 24;
            return t && (e %= 7), Math.floor(e)
        },
        getHourCounter: function() {
            return this.digitize([this.getHours(), this.getMinutes(!0), this.getSeconds(!0)])
        },
        getHourly: function() {
            return this.getHourCounter()
        },
        getHours: function(t) {
            var e = this.getTimeSeconds() / 60 / 60;
            return t && (e %= 24), Math.floor(e)
        },
        getMilitaryTime: function(t, e) {
            void 0 === e && (e = !0), t || (t = this.getDateObject());
            var n = [t.getHours(), t.getMinutes()];
            return !0 === e && n.push(t.getSeconds()), this.digitize(n)
        },
        getMinutes: function(t) {
            var e = this.getTimeSeconds() / 60;
            return t && (e %= 60), Math.floor(e)
        },
        getMinuteCounter: function() {
            return this.digitize([this.getMinutes(), this.getSeconds(!0)])
        },
        getTimeSeconds: function(t) {
            return t || (t = new Date), this.time instanceof Date ? this.factory.countdown ? Math.max(this.time.getTime() / 1e3 - t.getTime() / 1e3, 0) : t.getTime() / 1e3 - this.time.getTime() / 1e3 : this.time
        },
        getTime: function(t, e) {
            void 0 === e && (e = !0), t || (t = this.getDateObject()), console.log(t);
            var n = t.getHours(),
                i = [n > 12 ? n - 12 : 0 === n ? 12 : n, t.getMinutes()];
            return !0 === e && i.push(t.getSeconds()), this.digitize(i)
        },
        getSeconds: function(t) {
            var e = this.getTimeSeconds();
            return t && (60 == e ? e = 0 : e %= 60), Math.ceil(e)
        },
        getWeeks: function(t) {
            var e = this.getTimeSeconds() / 60 / 60 / 24 / 7;
            return t && (e %= 52), Math.floor(e)
        },
        removeLeadingZeros: function(e, n) {
            var i = 0,
                r = [];
            return t.each(n, function(t, a) {
                t < e ? i += parseInt(n[t], 10) : r.push(n[t])
            }), 0 === i ? r : n
        },
        addSeconds: function(t) {
            this.time instanceof Date ? this.time.setSeconds(this.time.getSeconds() + t) : this.time += t
        },
        addSecond: function() {
            this.addSeconds(1)
        },
        subSeconds: function(t) {
            this.time instanceof Date ? this.time.setSeconds(this.time.getSeconds() - t) : this.time -= t
        },
        subSecond: function() {
            this.subSeconds(1)
        },
        toString: function() {
            return this.getTimeSeconds().toString()
        }
    })
}(jQuery),
function(t) {
    "use strict";
    _FlipClock.Timer = _FlipClock.Base.extend({
        callbacks: {
            destroy: !1,
            create: !1,
            init: !1,
            interval: !1,
            start: !1,
            stop: !1,
            reset: !1
        },
        count: 0,
        factory: !1,
        interval: 1e3,
        animationRate: 1e3,
        constructor: function(t, e) {
            this.base(e), this.factory = t, this.callback(this.callbacks.init), this.callback(this.callbacks.create)
        },
        getElapsed: function() {
            return this.count * this.interval
        },
        getElapsedTime: function() {
            return new Date(this.time + this.getElapsed())
        },
        reset: function(t) {
            clearInterval(this.timer), this.count = 0, this._setInterval(t), this.callback(this.callbacks.reset)
        },
        start: function(t) {
            this.factory.running = !0, this._createTimer(t), this.callback(this.callbacks.start)
        },
        stop: function(t) {
            this.factory.running = !1, this._clearInterval(t), this.callback(this.callbacks.stop), this.callback(t)
        },
        _clearInterval: function() {
            clearInterval(this.timer)
        },
        _createTimer: function(t) {
            this._setInterval(t)
        },
        _destroyTimer: function(t) {
            this._clearInterval(), this.timer = !1, this.callback(t), this.callback(this.callbacks.destroy)
        },
        _interval: function(t) {
            this.callback(this.callbacks.interval), this.callback(t), this.count++
        },
        _setInterval: function(t) {
            var e = this;
            e._interval(t), e.timer = setInterval(function() {
                e._interval(t)
            }, this.interval)
        }
    })
}(jQuery),
function(t) {
    _FlipClock.TwentyFourHourClockFace = _FlipClock.Face.extend({
        constructor: function(t, e) {
            this.base(t, e)
        },
        build: function(e) {
            var n = this,
                i = this.factory.$el.find("ul");
            this.factory.time.time || (this.factory.original = new Date, this.factory.time = new _FlipClock.Time(this.factory, this.factory.original));
            var e = e || this.factory.time.getMilitaryTime(!1, this.showSeconds);
            e.length > i.length && t.each(e, function(t, e) {
                n.createList(e)
            }), this.createDivider(), this.createDivider(), t(this.dividers[0]).insertBefore(this.lists[this.lists.length - 2].$el), t(this.dividers[1]).insertBefore(this.lists[this.lists.length - 4].$el), this.base()
        },
        flip: function(t, e) {
            this.autoIncrement(), t = t || this.factory.time.getMilitaryTime(!1, this.showSeconds), this.base(t, e)
        }
    })
}(jQuery),
function(t) {
    _FlipClock.CounterFace = _FlipClock.Face.extend({
        shouldAutoIncrement: !1,
        constructor: function(t, e) {
            "object" != (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), t.autoStart = !!e.autoStart, e.autoStart && (this.shouldAutoIncrement = !0), t.increment = function() {
                t.countdown = !1, t.setTime(t.getTime().getTimeSeconds() + 1)
            }, t.decrement = function() {
                t.countdown = !0;
                var e = t.getTime().getTimeSeconds();
                e > 0 && t.setTime(e - 1)
            }, t.setValue = function(e) {
                t.setTime(e)
            }, t.setCounter = function(e) {
                t.setTime(e)
            }, this.base(t, e)
        },
        build: function() {
            var e = this,
                n = this.factory.$el.find("ul"),
                i = this.factory.getTime().digitize([this.factory.getTime().time]);
            i.length > n.length && t.each(i, function(t, n) {
                e.createList(n).select(n)
            }), t.each(this.lists, function(t, e) {
                e.play()
            }), this.base()
        },
        flip: function(t, e) {
            this.shouldAutoIncrement && this.autoIncrement(), t || (t = this.factory.getTime().digitize([this.factory.getTime().time])), this.base(t, e)
        },
        reset: function() {
            this.factory.time = new _FlipClock.Time(this.factory, this.factory.original ? Math.round(this.factory.original) : 0), this.flip()
        }
    })
}(jQuery),
function(t) {
    _FlipClock.DailyCounterFace = _FlipClock.Face.extend({
        showSeconds: !0,
        constructor: function(t, e) {
            this.base(t, e)
        },
        build: function(e) {
            var n = this,
                i = this.factory.$el.find("ul"),
                r = 0;
            e = e || this.factory.time.getDayCounter(this.showSeconds), e.length > i.length && t.each(e, function(t, e) {
                n.createList(e)
            }), this.showSeconds ? t(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length - 2].$el) : r = 2, t(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length - 4 + r].$el), t(this.createDivider("Hours")).insertBefore(this.lists[this.lists.length - 6 + r].$el), t(this.createDivider("Days", !0)).insertBefore(this.lists[0].$el), this.base()
        },
        flip: function(t, e) {
            t || (t = this.factory.time.getDayCounter(this.showSeconds)), this.autoIncrement(), this.base(t, e)
        }
    })
}(jQuery),
function(t) {
    _FlipClock.HourlyCounterFace = _FlipClock.Face.extend({
        constructor: function(t, e) {
            this.base(t, e)
        },
        build: function(e, n) {
            var i = this,
                r = this.factory.$el.find("ul");
            n = n || this.factory.time.getHourCounter(), n.length > r.length && t.each(n, function(t, e) {
                i.createList(e)
            }), t(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length - 2].$el), t(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length - 4].$el), e || t(this.createDivider("Hours", !0)).insertBefore(this.lists[0].$el), this.base()
        },
        flip: function(t, e) {
            t || (t = this.factory.time.getHourCounter()), this.autoIncrement(), this.base(t, e)
        },
        appendDigitToClock: function(t) {
            this.base(t), this.dividers[0].insertAfter(this.dividers[0].next())
        }
    })
}(jQuery),
function(t) {
    _FlipClock.MinuteCounterFace = _FlipClock.HourlyCounterFace.extend({
        clearExcessDigits: !1,
        constructor: function(t, e) {
            this.base(t, e)
        },
        build: function() {
            this.base(!0, this.factory.time.getMinuteCounter())
        },
        flip: function(t, e) {
            t || (t = this.factory.time.getMinuteCounter()), this.base(t, e)
        }
    })
}(jQuery),
function(t) {
    _FlipClock.TwelveHourClockFace = _FlipClock.TwentyFourHourClockFace.extend({
        meridium: !1,
        meridiumText: "AM",
        build: function() {
            var e = this.factory.time.getTime(!1, this.showSeconds);
            this.base(e), this.meridiumText = this.getMeridium(), this.meridium = t(['<ul class="flip-clock-meridium">', "<li>", '<a href="#">' + this.meridiumText + "</a>", "</li>", "</ul>"].join("")), this.meridium.insertAfter(this.lists[this.lists.length - 1].$el)
        },
        flip: function(t, e) {
            this.meridiumText != this.getMeridium() && (this.meridiumText = this.getMeridium(), this.meridium.find("a").html(this.meridiumText)), this.base(this.factory.time.getTime(!1, this.showSeconds), e)
        },
        getMeridium: function() {
            return (new Date).getHours() >= 12 ? "PM" : "AM"
        },
        isPM: function() {
            return "PM" == this.getMeridium()
        },
        isAM: function() {
            return "AM" == this.getMeridium()
        }
    })
}(jQuery),
function(t) {
    _FlipClock.Lang.Russian = {
        years: "лет",
        months: "месяцев",
        days: "дней",
        hours: "часов",
        minutes: "минут",
        seconds: "секунд"
    }, _FlipClock.Lang.ru = _FlipClock.Lang.Russian, _FlipClock.Lang["ru-ru"] = _FlipClock.Lang.Russian, _FlipClock.Lang.russian = _FlipClock.Lang.Russian
}(jQuery),
function(t) {
    function e() {
        var e = t('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
            n = e.children(),
            i = n.innerWidth() - n.height(99).innerWidth();
        return e.remove(), i
    }

    function n() {
        if (g = t("#pageWrapper"), 0 == g.size()) {
            var e = t("body > :visible");
            1 == e.size() ? e.attr("id", "pageWrapper") : t("body").wrapInner('<div id="pageWrapper" style="height: ' + k + 'px"></div>'), g = t("#pageWrapper")
        }
        0 == v.size() && (v = t("<div>").attr({
            id: "lightbox-veil"
        }), t("body").append(v))
    }

    function i() {
        var e = this;
        n();
        var i = t(this.data("template"));
        if (this.data("content", i.find(".lightbox-content")), this.data("root", i.filter(".lightbox2")), this.data("wrapper", i.find(".lightbox-wrapper")), m++, this.data("returnableDOM") && (this.data("flagID", "lightboxFlag" + m), this.after('<input type="hidden" id="' + this.data("flagID") + '" />')), this.data("bottomPanelVisibility"))
            if (this.data("bottomPanel", t('<div class="lb-bottom"><div class="lb-clr"></div></div>')), this.data("content").after(this.data("bottomPanel")), e.data("panelHtml")) e.data("bottomPanel").append(t(e.data("panelHtml")).clone(!0));
            else {
                var a = this.data("buttons");
                if (a) {
                    var o = t('<span class="lb-closeLink">' + this.data("closeText") + "</span>");
                    o.click(function() {
                        return u(e), !1
                    }), "object" !== t.type(a) || t.isEmptyObject(a) ? t.isArray(a) && a.length > 0 ? (e.data("bottomPanel").prepend(o), t.each(a, function(n, i) {
                        var r = t(e.data("buttonTemplate"));
                        t.each(i, function(n, a) {
                            "text" == n ? r.text(i.text) : "click" == n ? r.click(function() {
                                i.click.apply(e, arguments)
                            }) : "template" == n ? r = t(a) : r.attr(n, a)
                        }), r.append('<span class="button_orange-right"></span>'), e.data("bottomPanel").prepend(r)
                    })) : t.error("Buttons incorrect format or empty object") : (this.data("bottomPanel").prepend(o), t.each(a, function(n, i) {
                        var r = t(e.data("buttonTemplate"));
                        r.text(n), r.append('<span class="button_orange-right"></span>'), e.data("bottomPanel").prepend(r), r.data("id", n), r.click(function() {
                            i.apply(e, arguments)
                        })
                    }))
                } else r(e)
            }
        this.appendTo(e.data("content")), this.data("wrapperStyle") && this.data("wrapper").css(this.data("wrapperStyle")), this.data("contentStyle") && this.data("content").css(this.data("contentStyle")), this.data("lightboxClass") && i.addClass(this.data("lightboxClass")), i.find(".lightbox2-close").click(function() {
            u(e)
        }), t("body").append(i), e.data({
            isCreated: !0,
            lightbox: i
        }), p.push(e), t.isFunction(e.data("create")) && e.data("create").apply(e, arguments)
    }

    function r(e) {
        var n = t('<span class="lb-button js-lb-closeLink" value="">' + e.data("closeText") + "</span>");
        n.append('<span class="button_orange-right"></span>'), e.data("bottomPanel").html('<div class="lb-clr"></div>').prepend(n), n.click(function() {
            u(e)
        })
    }

    function a(t) {
        k = y.height(), v.height(k), g.height(k), t.data("lightbox").height(k)
    }

    function o() {
        var t = this,
            e = t.data("wrapper"),
            n = t.data("bottomPanel"),
            i = n ? n.outerHeight() : 0;
        this.data("content").height(function() {
            return y.height() - 40 - parseInt(e.css("padding-top")) - parseInt(e.css("padding-bottom")) - i - parseInt(t.data("content").css("margin-bottom")) - parseInt(t.data("content").css("margin-top"))
        })
    }

    function s(n) {
        n.data("veilClickFade") ? n.data("lightbox").bind("mousedown.fadeLightbox", function(i) {
            var r = i.pageX < n.data("wrapper").offset().left,
                a = i.pageX > n.data("wrapper").offset().left + n.data("wrapper").outerWidth() && i.pageX < n.data("lightbox").width() - e(),
                o = i.pageY < n.data("wrapper").offset().top,
                s = i.pageY > n.data("wrapper").offset().top + n.data("wrapper").outerHeight() && i.pageY < n.data("lightbox").height() - e(),
                l = 0 == t(i.target).parents(".lightbox-wrapper").size() && !t(i.target).hasClass("lightbox-wrapper"),
                c = void 0 !== t(i.target).context;
            (r || a || o || s) && l && c && (u(n), n.data("lightbox").unbind("mousedown.fadeLightbox"))
        }) : n.data("lightbox").unbind("mousedown.fadeLightbox")
    }

    function l(e) {
        t(window).trigger("lightboxOpen"), t(".spw").length && t(window).trigger("swpClosed");
        try {
            h = t(document).scrollTop()
        } catch (t) {}
        g.addClass("lb-open"), t("html, body").addClass("lb-on"), y.bind("resize.lightbox", function() {
            e.data("isOpen") && a(e)
        }), e.data("esc") && b.bind("keyup.lightbox", function(t) {
            27 == t.keyCode && u(e)
        }), e.data("veilClass") && v.addClass(e.data("veilClass")), s(e), t.each(p, function(t, e) {
            e.lightbox("isOpen") && c(e)
        }), e.data("returnableDOM") && e.appendTo(e.data("content")), t(document).on("click.closeLightbox", ".js-closeLightbox", function() {
            e.lightbox("close")
        }), t.isFunction(e.data("beforeOpen")) && e.data("beforeOpen").apply(e, arguments), e.data("fullWindowWrapper") && (e.data("root").addClass("fullWindow"), o.apply(e, arguments), y.bind("resize.updateLbHeight", function() {
            o.apply(e, arguments)
        })), a(e), v.css("top", 0);
        try {
            e.data("lightbox").css("top", 0)
        } catch (t) {}
        v.fadeIn("fast"), e.data("lightbox").height(y.height()).show(), e.data("lightbox").fadeIn("fast", function() {
            g.scrollTop(h), e.data("isOpen", !0), t.isFunction(e.data("open")) && e.data("open").apply(e, arguments), e.data("preventDefaultEvents") || (e.data("event") ? y.trigger("pageEvent", "event-" + e.data("event") + "-lightbox") : y.trigger("pageEvent", d.call(e)))
        }), e.data("fullWindowWrapper") && o.apply(e, arguments)
    }

    function u(e) {
        if (t(document).off("click.closeLightbox"), t.isFunction(e.data("beforeClose"))) {
            if (!1 === e.data("beforeClose").apply(e, arguments)) return
        }
        e.data("fullWindowWrapper") && (y.unbind("resize.updateLbHeight"), e.data("root").removeClass("fullWindow")), y.unbind("resize.lightbox"), b.unbind("keyup.lightbox"), e.data("lightbox").unbind("click.fadeLightbox"), v.fadeOut("fast", function() {
            v.removeClass(e.data("veilClass"))
        }), e.data("lightbox").fadeOut("fast", function() {
            t("html, body").removeClass("lb-on"), e.data("isOpen", !1), t.isFunction(e.data("close")) && e.data("close").apply(e, arguments), t(window).trigger("lightboxClose"), e.data("returnableDOM") && e.insertBefore(t("#" + e.data("flagID"))), g.removeClass("lb-open").removeAttr("style"), t(document).scrollTop(h), t.isFunction(e.data("afterClose")) && e.data("afterClose").apply(e, arguments)
        })
    }

    function c(e) {
        if (t.isFunction(e.data("beforeClose"))) {
            if (!1 === e.data("beforeClose").apply(e, arguments)) return
        }
        e.data("fullWindowWrapper") && (y.unbind("resize.updateLbHeight"), e.data("root").removeClass("fullWindow")), e.data("lightbox").unbind("click.fadeLightbox"), e.data("lightbox").hide().data("isOpen", !1), t.isFunction(e.data("close")) && e.data("close").apply(e, arguments), h = g.scrollTop(), t(document).scrollTop(h), t.isFunction(e.data("afterClose")) && e.data("afterClose").apply(e, arguments)
    }

    function d() {
        return "event-" + (this.data("event") || this.data("event-name") || this.attr("action") || this.attr("id") || this.selector) + "-lightbox"
    }
    var h, f = {
            closeIcon: null,
            height: "auto",
            skin: "default/lightbox_new.css",
            template: '<div class="lightbox2">             <table class="centring">                <tbody><tr><td class="lightbox-cell">                    <div class="lightbox-wrapper">                        <div class="lightbox-loader"></div>                        <span class="lightbox2-close" title="Закрыть"><span class="lightbox-closeText">Закрыть</span> <span class="lb-cross">&times;</span></span>                        <div class="lightbox-content"></div>                   </div>               </tr></td></tbody>            </table>            </div>',
            wrapperStyle: !1,
            contentStyle: !1,
            lightboxClass: !1,
            closeText: "Закрыть",
            autoOpen: !0,
            bottomPanelVisibility: !0,
            buttons: !1,
            buttonTemplate: '<span class="lb-button" />',
            veilClass: !1,
            veilClickFade: !0,
            panelHtml: !1,
            esc: !0,
            fullWindowWrapper: !1,
            returnableDOM: !1,
            preventDefaultEvents: !1
        },
        p = [],
        m = 0,
        g = t("#pageWrapper"),
        v = t("#lightbox-veil"),
        y = t(window),
        b = t(document),
        k = y.height(),
        w = {
            init: function(e) {
                if (this.data("isCreated")) this.data("autoOpen") && l(this);
                else if (1 == this.size()) {
                    var n = t.extend({}, f, e);
                    this.data(n), i.apply(this, arguments), this.data("autoOpen") && l(this)
                } else 0 == this.size() ? t.error('content for lightbox not finded content selector: "' + this.selector + '"') : this.size() > 1 && t.error("to many blocks for lightbox on page. (size > 1. Must be only one)");
                return this
            },
            open: function() {
                l(this)
            },
            close: function() {
                u(this)
            },
            destroy: function() {
                this.data("lightbox").remove(), this.data("isCreated", !1), this.remove(), v.hide()
            },
            isOpen: function() {
                return !!this.data("isOpen")
            },
            saveState: function() {
                this.data("state", this.html())
            },
            loadState: function() {
                this.html(this.data("state"))
            },
            option: function(e, n) {
                var i = this;
                switch (e) {
                    case "disabled":
                        return "boolean" === t.type(n) ? (this.data("disabled", n), this) : this.data("disabled");
                    case "autoOpen":
                        return "boolean" === t.type(n) ? (this.data("autoOpen", n), this) : this.data("autoOpen");
                    case "buttons":
                        var a;
                        return n && "object" === t.type(n) && !t.isEmptyObject(n) ? (t.each(n, function(e, n) {
                            var r = t(i.data("buttonTemplate"));
                            r.text(e), r.append('<span class="button_orange-right"></span>'), i.data("bottomPanel").prepend(r), r.data("id", e), r.click(function() {
                                n.apply(i, arguments)
                            })
                        }), a = t('<span class="lb-closeLink">Закрыть</span>'), a.click(function() {
                            u(i)
                        }), this.data("bottomPanel").find(".lb-closeLink").replaceWith(a), this) : t.isArray(n) && n.length > 0 ? (t.each(n, function(e, n) {
                            var r = t(i.data("buttonTemplate"));
                            t.each(n, function(e, a) {
                                "text" == e ? r.text(n.text) : "click" == e ? r.click(function() {
                                    n.click.apply(i, arguments)
                                }) : "template" == e ? r = t(a) : r.attr(e, a)
                            }), r.append('<span class="button_orange-right"></span>'), i.data("bottomPanel").prepend(r)
                        }), a = t('<span class="lb-closeLink">Закрыть</span>'), a.click(function() {
                            u(i)
                        }), this.data("bottomPanel").find(".js-lb-closeLink").replaceWith(a), this) : (t.error("Неверный формат данных для кнопки"), this);
                    case "bottomPanelVisibility":
                        if ("boolean" === t.type(n)) return !0 === n ? !1 === this.data("bottomPanelVisibility") ? (this.data("bottomPanel", t('<div class="lb-bottom"></div>')), this.data("bottomPanel").hide(), this.data("content").after(this.data("bottomPanel")), this.data("bottomPanelVisibility", !0), this.data("bottomPanel").show(), r(this)) : t.error("bottomPanel already exist") : !0 === this.data("bottomPanelVisibility") ? (this.data("bottomPanel").remove(), this.data("bottomPanelVisibility", !1)) : t.error("bottomPanel not exist"), this;
                        if ("default" !== n) return this.data("bottomPanelVisibility");
                        this.data("bottomPanelVisibility", !0), r(this);
                        break;
                    case "closeText":
                        if ("string" !== t.type(n)) return this.data("closeText");
                        this.data("closeText", n);
                        var l = this.data("bottomPanel").find(".lb-closeLink");
                        l.is(":input") ? l.val(n) : l.text(n);
                        break;
                    case "wrapperStyle":
                        n && "object" === t.type(n) && !t.isEmptyObject(n) ? (this.data("wrapperStyle", n), this.data("wrapper").css(n)) : t.error('Неверный формат стилей. Пример правильного использования — {width: "500px", padding: 0}');
                        break;
                    case "contentStyle":
                        n && "object" === t.type(n) && !t.isEmptyObject(n) ? (this.data("contentStyle", n), this.data("content").css(n)) : t.error('Неверный формат стилей. Пример правильного использования — {width: "500px", padding: 0}');
                        break;
                    case "lightboxClass":
                        "string" === t.type(n) && n.length > 0 && this.data("lightbox").addClass(n);
                        break;
                    case "fullWindowWrapper":
                        "boolean" === t.type(n) && (this.data("root").addClass("fullWindow"), o.apply(this, arguments), y.bind("resize.updateLbHeight", function() {
                            o.apply(this, arguments)
                        }));
                        break;
                    case "veilClass":
                        return "string" === t.type(n) && n.length > 0 && (this.data("veilClass", n), v.addClass(n)), this;
                    case "veilClickFade":
                        return "boolean" === t.type(n) ? (this.data("veilClickFade", n), s(this), this) : this.data("veilClickFade");
                    case "open":
                        t.isFunction(n) && this.data("open", n);
                        break;
                    case "beforeOpen":
                        t.isFunction(n) && this.data("beforeOpen", n);
                        break;
                    case "afterClose":
                        t.isFunction(n) && this.data("afterClose", n);
                        break;
                    case "close":
                        t.isFunction(n) && this.data("close", n);
                        break;
                    case "beforeClose":
                        t.isFunction(n) && this.data("beforeClose", n);
                        break;
                    case "esc":
                        return "boolean" === t.type(n) ? (this.data("esc", n), this) : this.data("esc");
                    case "panelHtml":
                        return this.data("panelHtml", n), this.data("bottomPanel").html("").append(t(n).clone(!0)), this;
                    default:
                        t.error('Опция "' + e + '" не найдена в плагине jQuery.lightbox')
                }
                return this
            }
        };
    t.fn.lightbox = function(e) {
        return w[e] ? w[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error('Метод "' + e + '" не найден в плагине jQuery.lightbox') : w.init.apply(this, arguments)
    }
}(jQuery), Kontur.Module("Kontur.Tooltip", function(t) {
        t(function() {
            t("[data-toggle=tooltip]").tooltip({
                container: "body"
            }).on("inserted.bs.tooltip", function() {
                var e = t(this),
                    n = t("#" + e.attr("aria-describedby")),
                    i = e.data("toggle-class");
                i && n.addClass(i)
            })
        })
    }, [jQuery]),
    function(t) {
        t.extend(t.fn, {
            validate: function(e) {
                if (!this.length) return void(e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
                var n = t.data(this[0], "validators");
                return n || (this.attr("novalidate", "novalidate"), n = new t.validators(e, this[0]), t.data(this[0], "validators", n), n.settings.onsubmits && (this.validateDelegate(":submits", "click", function(e) {
                    n.settings.submitsHandler && (n.submitsButton = e.target), t(e.target).hasClass("cancel") && (n.cancelsubmits = !0), void 0 !== t(e.target).attr("formnovalidate") && (n.cancelsubmits = !0)
                }), this.submits(function(e) {
                    function i() {
                        var i;
                        return !n.settings.submitsHandler || (n.submitsButton && (i = t("<input type='hidden'/>").attr("name", n.submitsButton.name).val(t(n.submitsButton).val()).appendTo(n.currentForm)), n.settings.submitsHandler.call(n, n.currentForm, e), n.submitsButton && i.remove(), !1)
                    }
                    return n.settings.debug && e.preventDefault(), n.cancelsubmits ? (n.cancelsubmits = !1, i()) : n.form() ? n.pendingRequest ? (n.formsubmitsted = !0, !1) : i() : (n.focusInvalid(), !1)
                })), n)
            },
            valid: function() {
                if (t(this[0]).is("form")) return this.validate().form();
                var e = !0,
                    n = t(this[0].form).validate();
                return this.each(function() {
                    e = e && n.element(this)
                }), e
            },
            removeAttrs: function(e) {
                var n = {},
                    i = this;
                return t.each(e.split(/\s/), function(t, e) {
                    n[e] = i.attr(e), i.removeAttr(e)
                }), n
            },
            rules: function(e, n) {
                var i = this[0];
                if (e) {
                    var r = t.data(i.form, "validators").settings,
                        a = r.rules,
                        o = t.validators.staticRules(i);
                    switch (e) {
                        case "add":
                            t.extend(o, t.validators.normalizeRule(n)), delete o.messages, a[i.name] = o, n.messages && (r.messages[i.name] = t.extend(r.messages[i.name], n.messages));
                            break;
                        case "remove":
                            if (!n) return delete a[i.name], o;
                            var s = {};
                            return t.each(n.split(/\s/), function(t, e) {
                                s[e] = o[e], delete o[e]
                            }), s
                    }
                }
                var l = t.validators.normalizeRules(t.extend({}, t.validators.classRules(i), t.validators.attributeRules(i), t.validators.dataRules(i), t.validators.staticRules(i)), i);
                if (l.requireds) {
                    var u = l.requireds;
                    delete l.requireds, l = t.extend({
                        requireds: u
                    }, l)
                }
                return l
            }
        }), t.extend(t.expr[":"], {
            blank: function(e) {
                return !t.trim("" + t(e).val())
            },
            filled: function(e) {
                return !!t.trim("" + t(e).val())
            },
            unchecked: function(e) {
                return !t(e).prop("checked")
            }
        }), t.validators = function(e, n) {
            this.settings = t.extend(!0, {}, t.validators.defaults, e), this.currentForm = n, this.init()
        }, t.validators.format = function(e, n) {
            return 1 === arguments.length ? function() {
                var n = t.makeArray(arguments);
                return n.unshift(e), t.validators.format.apply(this, n)
            } : (arguments.length > 2 && n.constructor !== Array && (n = t.makeArray(arguments).slice(1)), n.constructor !== Array && (n = [n]), t.each(n, function(t, n) {
                e = e.replace(RegExp("\\{" + t + "\\}", "g"), function() {
                    return n
                })
            }), e)
        }, t.extend(t.validators, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "label",
                focusInvalid: !0,
                errorContainer: t([]),
                errorLabelContainer: t([]),
                onsubmits: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function(t) {
                    this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
                },
                onfocusout: function(t) {
                    this.checkable(t) || !(t.name in this.submitsted) && this.optional(t) || this.element(t)
                },
                onkeyup: function(t, e) {
                    (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitsted || t === this.lastElement) && this.element(t)
                },
                onclick: function(t) {
                    t.name in this.submitsted ? this.element(t) : t.parentNode.name in this.submitsted && this.element(t.parentNode)
                },
                highlight: function(e, n, i) {
                    "radio" === e.type ? this.findByName(e.name).addClass(n).removeClass(i) : t(e).addClass(n).removeClass(i)
                },
                unhighlight: function(e, n, i) {
                    "radio" === e.type ? this.findByName(e.name).removeClass(n).addClass(i) : t(e).removeClass(n).addClass(i)
                }
            },
            setDefaults: function(e) {
                t.extend(t.validators.defaults, e)
            },
            messages: {
                requireds: "This field is requireds.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                maxlength: t.validators.format("Please enter no more than {0} characters."),
                minlength: t.validators.format("Please enter at least {0} characters."),
                rangelength: t.validators.format("Please enter a value between {0} and {1} characters long."),
                range: t.validators.format("Please enter a value between {0} and {1}."),
                max: t.validators.format("Please enter a value less than or equal to {0}."),
                min: t.validators.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function() {
                    function e(e) {
                        var n = t.data(this[0].form, "validators"),
                            i = "on" + e.type.replace(/^validate/, "");
                        n.settings[i] && n.settings[i].call(n, this[0], e)
                    }
                    this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitsted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var n = this.groups = {};
                    t.each(this.settings.groups, function(e, i) {
                        "string" == typeof i && (i = i.split(/\s/)), t.each(i, function(t, i) {
                            n[i] = e
                        })
                    });
                    var i = this.settings.rules;
                    t.each(i, function(e, n) {
                        i[e] = t.validators.normalizeRule(n)
                    }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                },
                form: function() {
                    return this.checkForm(), t.extend(this.submitsted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function() {
                    this.prepareForm();
                    for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                    return this.valid()
                },
                element: function(e) {
                    e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
                    var n = !1 !== this.check(e);
                    return n ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), n
                },
                showErrors: function(e) {
                    if (e) {
                        t.extend(this.errorMap, e), this.errorList = [];
                        for (var n in e) this.errorList.push({
                            message: e[n],
                            element: this.findByName(n)[0]
                        });
                        this.successList = t.grep(this.successList, function(t) {
                            return !(t.name in e)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function() {
                    t.fn.resetForm && t(this.currentForm).resetForm(), this.submitsted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
                },
                numberOfInvalids: function() {
                    return this.objectLength(this.invalid)
                },
                objectLength: function(t) {
                    var e = 0;
                    for (var n in t) e++;
                    return e
                },
                hideErrors: function() {
                    this.addWrapper(this.toHide).hide()
                },
                valid: function() {
                    return 0 === this.size()
                },
                size: function() {
                    return this.errorList.length
                },
                focusInvalid: function() {
                    if (this.settings.focusInvalid) try {
                        t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (t) {}
                },
                findLastActive: function() {
                    var e = this.lastActive;
                    return e && 1 === t.grep(this.errorList, function(t) {
                        return t.element.name === e.name
                    }).length && e
                },
                elements: function() {
                    var e = this,
                        n = {};
                    return t(this.currentForm).find("input, select, textarea").not(":submits, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                        return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), !(this.name in n || !e.objectLength(t(this).rules())) && (n[this.name] = !0, !0)
                    })
                },
                clean: function(e) {
                    return t(e)[0]
                },
                errors: function() {
                    var e = this.settings.errorClass.replace(" ", ".");
                    return t(this.settings.errorElement + "." + e, this.errorContext)
                },
                reset: function() {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
                },
                prepareForm: function() {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function(t) {
                    this.reset(), this.toHide = this.errorsFor(t)
                },
                elementValue: function(e) {
                    var n = t(e).attr("type"),
                        i = t(e).val();
                    return "radio" === n || "checkbox" === n ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof i ? i.replace(/\r/g, "") : i
                },
                check: function(e) {
                    e = this.validationTargetFor(this.clean(e));
                    var n, i = t(e).rules(),
                        r = !1,
                        a = this.elementValue(e);
                    for (var o in i) {
                        var s = {
                            method: o,
                            parameters: i[o]
                        };
                        try {
                            if ("dependency-mismatch" === (n = t.validators.methods[o].call(this, a, e, s.parameters))) {
                                r = !0;
                                continue
                            }
                            if (r = !1, "pending" === n) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                            if (!n) return this.formatAndAdd(e, s), !1
                        } catch (t) {
                            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + s.method + "' method.", t), t
                        }
                    }
                    return r ? void 0 : (this.objectLength(i) && this.successList.push(e), !0)
                },
                customDataMessage: function(e, n) {
                    return t(e).data("msg-" + n.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + n.toLowerCase())
                },
                customMessage: function(t, e) {
                    var n = this.settings.messages[t];
                    return n && (n.constructor === String ? n : n[e])
                },
                findDefined: function() {
                    for (var t = 0; arguments.length > t; t++)
                        if (void 0 !== arguments[t]) return arguments[t]
                },
                defaultMessage: function(e, n) {
                    return this.findDefined(this.customMessage(e.name, n), this.customDataMessage(e, n), !this.settings.ignoreTitle && e.title || void 0, t.validators.messages[n], "<strong>Warning: No message defined for " + e.name + "</strong>")
                },
                formatAndAdd: function(e, n) {
                    var i = this.defaultMessage(e, n.method),
                        r = /\$?\{(\d+)\}/g;
                    "function" == typeof i ? i = i.call(this, n.parameters, e) : r.test(i) && (i = t.validators.format(i.replace(r, "{$1}"), n.parameters)), this.errorList.push({
                        message: i,
                        element: e
                    }), this.errorMap[e.name] = i, this.submitsted[e.name] = i
                },
                addWrapper: function(t) {
                    return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
                },
                defaultShowErrors: function() {
                    var t, e;
                    for (t = 0; this.errorList[t]; t++) {
                        var n = this.errorList[t];
                        this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass), this.showLabel(n.element, n.message)
                    }
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                        for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                    if (this.settings.unhighlight)
                        for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                },
                validElements: function() {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function() {
                    return t(this.errorList).map(function() {
                        return this.element
                    })
                },
                showLabel: function(e, n) {
                    var i = this.errorsFor(e);
                    i.length ? (i.removeClass(this.settings.validClass).addClass(this.settings.errorClass), i.html(n)) : (i = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(n || ""), this.settings.wrapper && (i = i.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(i).length || (this.settings.errorPlacement ? this.settings.errorPlacement(i, t(e)) : i.insertAfter(e))), !n && this.settings.success && (i.text(""), "string" == typeof this.settings.success ? i.addClass(this.settings.success) : this.settings.success(i, e)), this.toShow = this.toShow.add(i)
                },
                errorsFor: function(e) {
                    var n = this.idOrName(e);
                    return this.errors().filter(function() {
                        return t(this).attr("for") === n
                    })
                },
                idOrName: function(t) {
                    return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
                },
                validationTargetFor: function(t) {
                    return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
                },
                checkable: function(t) {
                    return /radio|checkbox/i.test(t.type)
                },
                findByName: function(e) {
                    return t(this.currentForm).find("[name='" + e + "']")
                },
                getLength: function(e, n) {
                    switch (n.nodeName.toLowerCase()) {
                        case "select":
                            return t("option:selected", n).length;
                        case "input":
                            if (this.checkable(n)) return this.findByName(n.name).filter(":checked").length
                    }
                    return e.length
                },
                depend: function(t, e) {
                    return !this.dependTypes[typeof t] || this.dependTypes[typeof t](t, e)
                },
                dependTypes: {
                    boolean: function(t) {
                        return t
                    },
                    string: function(e, n) {
                        return !!t(e, n.form).length
                    },
                    function: function(t, e) {
                        return t(e)
                    }
                },
                optional: function(e) {
                    var n = this.elementValue(e);
                    return !t.validators.methods.requireds.call(this, n, e) && "dependency-mismatch"
                },
                startRequest: function(t) {
                    this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
                },
                stopRequest: function(e, n) {
                    this.pendingRequest--, 0 > this.pendingRequest && (this.pendingRequest = 0), delete this.pending[e.name], n && 0 === this.pendingRequest && this.formsubmitsted && this.form() ? (t(this.currentForm).submits(), this.formsubmitsted = !1) : !n && 0 === this.pendingRequest && this.formsubmitsted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formsubmitsted = !1)
                },
                previousValue: function(e) {
                    return t.data(e, "previousValue") || t.data(e, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(e, "remote")
                    })
                }
            },
            classRuleSettings: {
                requireds: {
                    requireds: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                number: {
                    number: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function(e, n) {
                e.constructor === String ? this.classRuleSettings[e] = n : t.extend(this.classRuleSettings, e)
            },
            classRules: function(e) {
                var n = {},
                    i = t(e).attr("class");
                return i && t.each(i.split(" "), function() {
                    this in t.validators.classRuleSettings && t.extend(n, t.validators.classRuleSettings[this])
                }), n
            },
            attributeRules: function(e) {
                var n = {},
                    i = t(e),
                    r = i[0].getAttribute("type");
                for (var a in t.validators.methods) {
                    var o;
                    "requireds" === a ? (o = i.get(0).getAttribute(a), "" === o && (o = !0), o = !!o) : o = i.attr(a), /min|max/.test(a) && (null === r || /number|range|text/.test(r)) && (o = Number(o)), o ? n[a] = o : r === a && "range" !== r && (n[a] = !0)
                }
                return n.maxlength && /-1|2147483647|524288/.test(n.maxlength) && delete n.maxlength, n
            },
            dataRules: function(e) {
                var n, i, r = {},
                    a = t(e);
                for (n in t.validators.methods) void 0 !== (i = a.data("rule-" + n.toLowerCase())) && (r[n] = i);
                return r
            },
            staticRules: function(e) {
                var n = {},
                    i = t.data(e.form, "validators");
                return i.settings.rules && (n = t.validators.normalizeRule(i.settings.rules[e.name]) || {}), n
            },
            normalizeRules: function(e, n) {
                return t.each(e, function(i, r) {
                    if (!1 === r) return void delete e[i];
                    if (r.param || r.depends) {
                        var a = !0;
                        switch (typeof r.depends) {
                            case "string":
                                a = !!t(r.depends, n.form).length;
                                break;
                            case "function":
                                a = r.depends.call(n, n)
                        }
                        a ? e[i] = void 0 === r.param || r.param : delete e[i]
                    }
                }), t.each(e, function(i, r) {
                    e[i] = t.isFunction(r) ? r(n) : r
                }), t.each(["minlength", "maxlength"], function() {
                    e[this] && (e[this] = Number(e[this]))
                }), t.each(["rangelength", "range"], function() {
                    var n;
                    e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (n = e[this].split(/[\s,]+/), e[this] = [Number(n[0]), Number(n[1])]))
                }), t.validators.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
            },
            normalizeRule: function(e) {
                if ("string" == typeof e) {
                    var n = {};
                    t.each(e.split(/\s/), function() {
                        n[this] = !0
                    }), e = n
                }
                return e
            },
            addMethod: function(e, n, i) {
                t.validators.methods[e] = n, t.validators.messages[e] = void 0 !== i ? i : t.validators.messages[e], 3 > n.length && t.validators.addClassRules(e, t.validators.normalizeRule(e))
            },
            methods: {
                requireds: function(e, n, i) {
                    if (!this.depend(i, n)) return "dependency-mismatch";
                    if ("select" === n.nodeName.toLowerCase()) {
                        var r = t(n).val();
                        return r && r.length > 0
                    }
                    return this.checkable(n) ? this.getLength(e, n) > 0 : t.trim(e).length > 0
                },
                email: function(t, e) {
                    return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
                },
                url: function(t, e) {
                    return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
                },
                date: function(t, e) {
                    return this.optional(e) || !/Invalid|NaN/.test("" + new Date(t))
                },
                dateISO: function(t, e) {
                    return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
                },
                number: function(t, e) {
                    return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
                },
                digits: function(t, e) {
                    return this.optional(e) || /^\d+$/.test(t)
                },
                creditcard: function(t, e) {
                    if (this.optional(e)) return "dependency-mismatch";
                    if (/[^0-9 \-]+/.test(t)) return !1;
                    var n = 0,
                        i = 0,
                        r = !1;
                    t = t.replace(/\D/g, "");
                    for (var a = t.length - 1; a >= 0; a--) {
                        var o = t.charAt(a);
                        i = parseInt(o, 10), r && (i *= 2) > 9 && (i -= 9), n += i, r = !r
                    }
                    return 0 == n % 10
                },
                minlength: function(e, n, i) {
                    var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), n);
                    return this.optional(n) || r >= i
                },
                maxlength: function(e, n, i) {
                    var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), n);
                    return this.optional(n) || i >= r
                },
                rangelength: function(e, n, i) {
                    var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), n);
                    return this.optional(n) || r >= i[0] && i[1] >= r
                },
                min: function(t, e, n) {
                    return this.optional(e) || t >= n
                },
                max: function(t, e, n) {
                    return this.optional(e) || n >= t
                },
                range: function(t, e, n) {
                    return this.optional(e) || t >= n[0] && n[1] >= t
                },
                equalTo: function(e, n, i) {
                    var r = t(i);
                    return this.settings.onfocusout && r.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                        t(n).valid()
                    }), e === r.val()
                },
                remote: function(e, n, i) {
                    if (this.optional(n)) return "dependency-mismatch";
                    var r = this.previousValue(n);
                    if (this.settings.messages[n.name] || (this.settings.messages[n.name] = {}), r.originalMessage = this.settings.messages[n.name].remote, this.settings.messages[n.name].remote = r.message, i = "string" == typeof i && {
                            url: i
                        } || i, r.old === e) return r.valid;
                    r.old = e;
                    var a = this;
                    this.startRequest(n);
                    var o = {};
                    return o[n.name] = e, t.ajax(t.extend(!0, {
                        url: i,
                        mode: "abort",
                        port: "validate" + n.name,
                        dataType: "json",
                        data: o,
                        success: function(i) {
                            a.settings.messages[n.name].remote = r.originalMessage;
                            var o = !0 === i || "true" === i;
                            if (o) {
                                var s = a.formsubmitsted;
                                a.prepareElement(n), a.formsubmitsted = s, a.successList.push(n), delete a.invalid[n.name], a.showErrors()
                            } else {
                                var l = {},
                                    u = i || a.defaultMessage(n, "remote");
                                l[n.name] = r.message = t.isFunction(u) ? u(e) : u, a.invalid[n.name] = !0, a.showErrors(l)
                            }
                            r.valid = o, a.stopRequest(n, o)
                        }
                    }, i)), "pending"
                }
            }
        }), t.format = t.validators.format
    }(jQuery),
    function(t) {
        var e = {};
        if (t.ajaxPrefilter) t.ajaxPrefilter(function(t, n, i) {
            var r = t.port;
            "abort" === t.mode && (e[r] && e[r].abort(), e[r] = i)
        });
        else {
            var n = t.ajax;
            t.ajax = function(i) {
                var r = ("mode" in i ? i : t.ajaxSettings).mode,
                    a = ("port" in i ? i : t.ajaxSettings).port;
                return "abort" === r ? (e[a] && e[a].abort(), e[a] = n.apply(this, arguments), e[a]) : n.apply(this, arguments)
            }
        }
    }(jQuery),
    function(t) {
        t.extend(t.fn, {
            validateDelegate: function(e, n, i) {
                return this.bind(n, function(n) {
                    var r = t(n.target);
                    return r.is(e) ? i.apply(r, arguments) : void 0
                })
            }
        })
    }(jQuery),
    function(t) {
        function e(t, e) {
            return t.replace(/(([^\.]+\.)*)[^\.]+/, "$1" + e)
        }
        t.extend(t.validators.messages, {
            requireds: "Заполните поле",
            email: "Некорректный электронный адрес",
            russianName: "Поле должно быть заполнено на русском языке",
            phone: "Телефон должен состоять из 10 цифр",
            mobilePhone: "Необходимо указать номер мобильного телефона",
            maxlength: jQuery.validators.format("Длина не должна превышать {0} символов"),
            minlength: jQuery.validators.format("Длина не должна быть меньше {0} символов"),
            digits: "Неверное значение поля",
            number: "Неверное значение поля",
            unknown: "Неверное значение поля"
        }), t.validators.addMethod("requiredslocalized", function(e, n, i) {
            return t.validators.methods.requireds.apply(this, arguments)
        }), t.validators.addMethod("emaillocalized", function(t, e) {
            return "" == t || Kontur.validatorss.checkEmail(t)
        }, t.validators.messages.email), t.validators.addMethod("canonicalphone", function(t, e, n) {
            return "" == t || Kontur.validatorss.checkPhone(t)
        }, t.validators.messages.phone), t.validators.addMethod("internationalphone", function(t, e, n) {
            return Kontur.validatorss.checkInternationalPhone(t)
        }), t.validators.addMethod("mobilephone", function(t, e, n) {
            return Kontur.validatorss.checkMobilePhone(t)
        }, t.validators.messages.mobilePhone), t.validators.addMethod("date", function(t, e) {
            return "" == t || Kontur.validatorss.checkDate(t)
        }, t.validators.messages.unknown), t.validators.addMethod("time", function(t, e) {
            return "" == t || Kontur.validatorss.checkTime(t)
        }, t.validators.messages.unknown), t.validators.addMethod("kpp", function(e, n, i) {
            if (void 0 != i.suppressValidation && i.suppressValidation(e, n)) return !0;
            var r = n.name,
                a = {},
                o = t(n).closest("form").find('[name="' + i.innFieldName + '"]').val();
            return !(o && o.length > 0 && 12 !== o.length && ("" == e ? a[r] = t.validators.messages.requireds : Kontur.validatorss.checkKpp(e) || (a[r] = t.validators.messages.unknown), a[r])) || (i.errors = a, !1)
        }, function(t, e) {
            return t.errors[e.name]
        }), t.validators.addMethod("inn", function(e, n, i) {
            return "" == e || (!t(n).data("for-physical") || 12 == e.length) && Kontur.validatorss.checkInnSum(e)
        }, t.validators.messages.unknown), t.validators.addMethod("innorg", function(t) {
            return Kontur.validatorss.checkInnOrg(t)
        }, t.validators.messages.unknown), t.validators.addMethod("innip", function(t) {
            return Kontur.validatorss.checkInnIp(t)
        }, t.validators.messages.unknown), t.validators.addMethod("bik", function(t) {
            return Kontur.validatorss.checkBik(t)
        }, t.validators.messages.unknown), t.validators.addMethod("rs", function(t) {
            return Kontur.validatorss.checkRs(t)
        }, t.validators.messages.unknown), t.validators.addMethod("rsbik", function(n, i, r) {
            var a = t(i).attr("data-val-rsbik-bikpropertyname"),
                o = e(t(i).attr("name"), a),
                s = t(i).closest("form").find('[name="' + o + '"]').val();
            return Kontur.validatorss.checkRsBik(n, s)
        }, t.validators.messages.unknown), t.validators.addMethod("grouped-checkbox", function(e, n, i) {
            var r = t(n).closest("[data-val-checkbox-group]"),
                a = r.data("val-min-options"),
                o = r.data("val-max-options"),
                s = r.find("[data-val-grouped-checkbox]:checked").length,
                l = {};
            return void 0 !== a && s < a ? (l[n.name] = 1 == a ? t.validators.messages.requireds : t.validators.format("Нужно выбрать не менее {0} вариантов")(a), i.errors = l, !1) : !(void 0 !== o && s > o) || (l[n.name] = 1 == o ? "Нужно выбрать только один вариант" : t.validators.format("Нужно выбрать не более {0} вариантов")(o), i.errors = l, !1)
        }, function(t, e) {
            return t.errors ? t.errors[e.name] : null
        })
    }(jQuery),
    function(t) {
        function e(t, e) {
            for (var r = 0, a = n(e) + t, o = 0; o < a.length; o++) r += a[o] * s[o];
            return r % 10 == 0 || i(t, e)
        }

        function n(t) {
            var e = t.substring(t.length - 3);
            return "000" === e || "001" === e ? "0" + t[4] + t[5] : e
        }

        function i(t, e) {
            return "40702810702650242256" === t && "044552272" === e
        }

        function r(t) {
            return t.replace(/[()+\-\s]/g, "")
        }

        function a(t) {
            return t ? t.replace(/^\s+|\s+$/g, "") : t
        }
        Kontur = window.Kontur || {};
        var o = Kontur.validatorss = Kontur.validatorss || {};
        o.checkEmail = function(t) {
            return /^([a-zA-Z0-9]+[-._+\\&]+)*[a-zA-Z0-9_]+@([0-9a-zA-Z]+([-][0-9a-zA-Z]+)*[.])+[a-zA-Z]{2,}$/.test(a(t))
        }, o.checkDate = function(t) {
            var e = a(t).match(/([0-9]+)/gi);
            if (!e) return !1;
            var n = e[1] + "/" + e[0] + "/" + e[2];
            return !/Invalid|NaN/.test(new Date(n))
        }, o.checkTime = function(t) {
            var t = a(t);
            if (!t) return !1;
            var e = t.split(":");
            return 2 === e.length && (e[0] < 24 && e[1] < 60)
        }, o.checkKpp = function(t) {
            return /^\d{9}$/.test(a(t))
        }, o.checkPhone = function(t) {
            return /^(7|8)?\d{10}$/.test(r(a(t)))
        }, o.checkMobilePhone = function(t) {
            return /^(7|8)?9\d{9}$/.test(r(a(t)))
        }, o.checkInternationalPhone = function(t) {
            if (a(t)) {
                var e = t.replace(/[()\-]|\s+/, "");
                return 0 === e.indexOf("+") ? /^\+\d{5,13}$/.test(e) : /^8\d{10}$/.test(e)
            }
            return !1
        }, o.checkInnSum = function(t) {
            var e = a(t);
            return o.checkInnIp(e) || o.checkInnOrg(e)
        }, o.checkInnOrg = function(t) {
            var e = a(t);
            if (10 == e.length && /^\d{10}$/.test(e)) {
                var n = 0;
                return n += 2 * parseInt(t.substring(0, 1)), n += 4 * parseInt(t.substring(1, 2)), n += 10 * parseInt(t.substring(2, 3)), n += 3 * parseInt(t.substring(3, 4)), n += 5 * parseInt(t.substring(4, 5)), n += 9 * parseInt(t.substring(5, 6)), n += 4 * parseInt(t.substring(6, 7)), n += 6 * parseInt(t.substring(7, 8)), n += 8 * parseInt(t.substring(8, 9)), n = n % 11 % 10, parseInt(t.substring(9, 10)) === n
            }
            return !1
        }, o.checkInnIp = function(t) {
            var e = a(t);
            if (12 == e.length && /^\d{12}$/.test(e)) {
                var n = 0,
                    i = 0;
                return n += 7 * parseInt(e.substring(0, 1)), n += 2 * parseInt(e.substring(1, 2)), n += 4 * parseInt(e.substring(2, 3)), n += 10 * parseInt(e.substring(3, 4)), n += 3 * parseInt(e.substring(4, 5)), n += 5 * parseInt(e.substring(5, 6)), n += 9 * parseInt(e.substring(6, 7)), n += 4 * parseInt(e.substring(7, 8)), n += 6 * parseInt(e.substring(8, 9)), n += 8 * parseInt(e.substring(9, 10)), n = n % 11 % 10, i += 3 * parseInt(e.substring(0, 1)), i += 7 * parseInt(e.substring(1, 2)), i += 2 * parseInt(e.substring(2, 3)), i += 4 * parseInt(e.substring(3, 4)), i += 10 * parseInt(e.substring(4, 5)), i += 3 * parseInt(e.substring(5, 6)), i += 5 * parseInt(e.substring(6, 7)), i += 9 * parseInt(e.substring(7, 8)), i += 4 * parseInt(e.substring(8, 9)), i += 6 * parseInt(e.substring(9, 10)), i += 8 * n, i = i % 11 % 10, n === parseInt(e.substring(10, 11)) && i === parseInt(e.substring(11, 12))
            }
            return !1
        }, o.checkBik = function(t) {
            return /^\d{9}$/.test(a(t))
        }, o.checkRs = function(t) {
            return /^\d{20}$/.test(a(t))
        }, o.checkRsBik = function(t, n) {
            var i = a(t),
                r = a(n);
            return o.checkRs(i) && (!o.checkBik(r) || e(i, r))
        };
        var s = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1]
    }(jQuery),
    function(t) {
        function e(t, e, n) {
            t.rules[e] = n, t.message && (t.messages[e] = t.message)
        }

        function n(t) {
            return t.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g)
        }

        function i(t) {
            return t.replace(/([!"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~])/g, "\\$1")
        }

        function r(t) {
            return t.substr(0, t.lastIndexOf(".") + 1)
        }

        function a(t, e) {
            return 0 === t.indexOf("*.") && (t = t.replace("*.", e)), t
        }

        function o(e, n) {
            var r = t(this).find("[data-valmsg-for='" + i(n[0].name) + "']"),
                a = r.attr("data-valmsg-replace"),
                o = a ? !1 !== t.parseJSON(a) : null;
            r.removeClass("field-validation-valid").addClass("field-validation-error"), e.data("unobtrusiveContainer", r), o ? (r.empty(), e.removeClass("input-validation-error").appendTo(r)) : e.hide()
        }

        function s(e, n) {
            var i = t(this).find("[data-valmsg-summary=true]"),
                r = i.find("ul");
            r && r.length && n.errorList.length && (r.empty(), i.addClass("validation-summary-errors").removeClass("validation-summary-valid"), t.each(n.errorList, function() {
                t("<li />").html(this.message).appendTo(r)
            }))
        }

        function l(e) {
            var n = e.data("unobtrusiveContainer"),
                i = n.attr("data-valmsg-replace"),
                r = i ? t.parseJSON(i) : null;
            n && (n.addClass("field-validation-valid").removeClass("field-validation-error"), e.removeData("unobtrusiveContainer"), r && n.empty())
        }

        function u() {
            var e = t(this);
            e.data("validators").resetForm(), e.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors"), e.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")
        }

        function c(e) {
            var n = t(e),
                i = n.data(f),
                r = t.proxy(u, e);
            return i || (i = {
                options: {
                    errorClass: "input-validation-error",
                    errorElement: "span",
                    errorPlacement: t.proxy(o, e),
                    invalidHandler: t.proxy(s, e),
                    messages: {},
                    rules: {},
                    success: t.proxy(l, e)
                },
                attachValidation: function() {
                    n.unbind("reset." + f, r).bind("reset." + f, r).validate(this.options)
                },
                validate: function() {
                    return n.validate(), n.valid()
                }
            }, n.data(f, i)), i
        }
        var d, h = t.validators,
            f = "unobtrusiveValidation";
        h.unobtrusive = {
            adapters: [],
            parseElement: function(e, n) {
                var i, r, a, o = t(e),
                    s = o.parents("form")[0];
                s && (i = c(s), i.options.rules[e.name] = r = {}, i.options.messages[e.name] = a = {}, t.each(this.adapters, function() {
                    var n = "data-val-" + this.name,
                        i = o.attr(n),
                        l = {};
                    void 0 !== i && (n += "-", t.each(this.params, function() {
                        l[this] = o.attr(n + this)
                    }), this.adapt({
                        element: e,
                        form: s,
                        message: i,
                        params: l,
                        rules: r,
                        messages: a
                    }))
                }), t.extend(r, {
                    __dummy__: !0
                }), !n && i.attachValidation())
            },
            parse: function(e) {
                var n = t(e).parents("form").andSelf().add(t(e).find("form")).filter("form");
                t(e).find(":input[data-val=true]").each(function() {
                    h.unobtrusive.parseElement(this, !0)
                }), n.each(function() {
                    var t = c(this);
                    t && t.attachValidation()
                })
            }
        }, d = h.unobtrusive.adapters, d.add = function(t, e, n) {
            return n || (n = e, e = []), this.push({
                name: t,
                params: e,
                adapt: n
            }), this
        }, d.addBool = function(t, n) {
            return this.add(t, function(i) {
                e(i, n || t, !0)
            })
        }, d.addMinMax = function(t, n, i, r, a, o) {
            return this.add(t, [a || "min", o || "max"], function(t) {
                var a = t.params.min,
                    o = t.params.max;
                a && o ? e(t, r, [a, o]) : a ? e(t, n, a) : o && e(t, i, o)
            })
        }, d.addSingleVal = function(t, n, i) {
            return this.add(t, [n || "val"], function(r) {
                e(r, i || t, r.params[n])
            })
        }, h.addMethod("__dummy__", function() {
            return !0
        }), h.addMethod("regex", function(t, e, n) {
            var i;
            return !!this.optional(e) || (i = new RegExp(n).exec(t)) && 0 === i.index && i[0].length === t.length
        }), h.addMethod("nonalphamin", function(t, e, n) {
            var i;
            return n && (i = t.match(/\W/g), i = i && i.length >= n), i
        }), d.addSingleVal("accept", "exts").addSingleVal("regex", "pattern"), d.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url"), d.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range"), d.add("equalto", ["other"], function(n) {
            var o = r(n.element.name),
                s = n.params.other,
                l = a(s, o);
            e(n, "equalTo", t(n.form).find(":input[name='" + i(l) + "']")[0])
        }), d.add("requireds", function(t) {
            ("INPUT" !== t.element.tagName.toUpperCase() || "CHECKBOX" !== t.element.type.toUpperCase()) && e(t, "requireds", !0)
        }), d.add("remote", ["url", "type", "additionalfields"], function(o) {
            var s = {
                    url: o.params.url,
                    type: o.params.type || "GET",
                    data: {}
                },
                l = r(o.element.name);
            t.each(n(o.params.additionalfields || o.element.name), function(e, n) {
                var r = a(n, l);
                s.data[r] = function() {
                    return t(o.form).find(":input[name='" + i(r) + "']").val()
                }
            }), e(o, "remote", s)
        }), d.add("password", ["min", "nonalphamin", "regex"], function(t) {
            t.params.min && e(t, "minlength", t.params.min), t.params.nonalphamin && e(t, "nonalphamin", t.params.nonalphamin), t.params.regex && e(t, "regex", t.params.regex)
        }), t(function() {
            h.unobtrusive.parse(document)
        })
    }(jQuery),
    function(t) {
        function e(e) {
            return t(e).hasClass("js-datepicker-input") && 0 !== t(".datepicker:visible").length
        }
        t.validators.setDefaults({
            onfocusout: function(t) {
                this.checkable(t) || e(t) || this.element(t)
            },
            ignore: ":hidden",
            onkeyup: null,
            highlight: function(e, n, i) {
                "radio" === e.type || e.hasAttribute("data-val-grouped-checkbox") ? this.findByName(e.name).addClass(n).removeClass(i) : t(e).addClass(n).removeClass(i)
            },
            unhighlight: function(e, n, i) {
                "radio" === e.type || e.hasAttribute("data-val-grouped-checkbox") ? this.findByName(e.name).removeClass(n).addClass(i) : t(e).removeClass(n).addClass(i)
            },
            errorPlacement: function(e, n) {
                var i = t(n).data("error-container");
                i ? t(i).append(e) : e.insertAfter(n)
            }
        });
        var n = t.fn.mask;
        n && (t.fn.mask = function(i, r) {
            n.call(this, i, r).bind("blur", function() {
                e(this) || t(this).valid()
            })
        })
    }(jQuery),
    function(t) {
        t.validators.unobtrusive.adapters.addBool("requiredslocalized"), t.validators.unobtrusive.adapters.addBool("emaillocalized"), t.validators.unobtrusive.adapters.addBool("canonicalphone"), t.validators.unobtrusive.adapters.addBool("internationalphone"), t.validators.unobtrusive.adapters.addBool("mobilephone"), t.validators.unobtrusive.adapters.addBool("inn"), t.validators.unobtrusive.adapters.addBool("innorg"), t.validators.unobtrusive.adapters.addBool("innip"), t.validators.unobtrusive.adapters.addBool("time"), t.validators.unobtrusive.adapters.add("kpp", function(e) {
            e.rules.kpp = {
                innFieldName: t(e.form).find("[data-val-inn]").attr("name")
            }
        }), t.validators.unobtrusive.adapters.addBool("bik"), t.validators.unobtrusive.adapters.addBool("rs"), t.validators.unobtrusive.adapters.addBool("rsbik"), t.validators.unobtrusive.adapters.add("stringminimumlengthlocalized", function(e) {
            e.rules.minlength = t(e.element).attr("data-val-stringminimumlengthlocalized-min")
        }), t.validators.unobtrusive.adapters.add("grouped-checkbox", function(t) {
            t.rules["grouped-checkbox"] = t.element.hasAttribute("data-val-grouped-checkbox") ? {} : null
        }), t(function() {
            t(".js-datepicker-input").on("changeDate", function(e) {
                t(this).valid()
            })
        })
    }(jQuery), Kontur.Module("Kontur.Registration", function(t) {
        function e() {
            var t = "&p=" + encodeURIComponent(n()),
                e = "&returnUrl=" + encodeURIComponent(o + t),
                r = s + t + e;
            i.attr("action", r)
        }

        function n() {
            if (0 === r.length) return a;
            var t = r.val().toString().replace(/[^а-яА-Яa-zA-Z0-9\-_]/g, "");
            return r.val(t), "" === t ? a : t
        }
        var i, r, a, o, s, l = this;
        t(".js-registration-promocode-checkbox").on("click", function() {
            t(this).hide(), t(".js-registration-promocode").removeClass("hide")
        }), l.init = function(n) {
            a = n.defaultPromocode, o = n.defaultReturnUrl, s = n.defaultFormUrl, i = t(n.formSelectior), r = t(n.promocodeInputSelector), r.on("input", e), e()
        }
    }, [jQuery]), Kontur.Module("Kontur.VideoPlayer", function(t) {
        function e(t) {
            var e = t.find("[data-video-container]"),
                r = t.data("video-code"),
                o = n(r);
            e.html(i(o)), t.removeClass(a)
        }

        function n(t) {
            return "//www.youtube.com/embed/" + t + "?rel=0&autoplay=1"
        }

        function i(t) {
            return '<iframe frameborder="0" allowfullscreen="1" title="YouTube video player" width="100%" height="100%" src="' + t + '"></iframe>'
        }

        function r() {
            t("[data-video-player]").one("click", function() {
                e(t(this))
            })
        }
        var a = "video-player_preview";
        t(function() {
            r()
        })
    }, [jQuery]), Kontur.Module("Kontur.CollapseText", function(t) {
        function e(e) {
            this.text = e, this.$text = t(e), this.$readMoreLink = t(this.template.readMoreLink), this.lineHeight = this.getLineHeight(), this.height = this.$text.height(), this.maxHeight = this.lineHeight * this.maxLineCount, this.isCollapsed = !1, this.isNeedCollapse() && (this.collapsed(), this.bindEvents())
        }
        this.init = function(n) {
            t(n).each(function() {
                new e(this)
            })
        }, e.prototype.maxLineCount = 9, e.prototype.template = {
            readMoreLink: '<a href="#" class="text-collapse-link link-icon"><span class="link">Еще</span><span class="konturIconic konturIconic-arrow-chevron-up"></span><span class="konturIconic konturIconic-arrow-chevron-down"></span></a>',
            gradientOverflow: '<div class="text-collapse-overflow">',
            collapseClass: "text-collapsed"
        }, e.prototype.isNeedCollapse = function() {
            return this.$text.height() > this.maxHeight
        }, e.prototype.getLineHeight = function() {
            var e = t("<div>").css({
                    position: "absolute",
                    left: -1e3,
                    whiteSpace: "nowrap"
                }),
                n = this.$text.text(),
                i = null;
            return e.text(n), t("body").append(e), i = e.height(), e.remove(), i
        }, e.prototype.bindEvents = function() {
            var t = this;
            this.$readMoreLink.on("click", function(e) {
                e.preventDefault(), t.$text.height(t.isCollapsed ? t.height : t.maxHeight).toggleClass(t.template.collapseClass), t.$readMoreLink.toggleClass(t.template.collapseClass), t.isCollapsed = !t.isCollapsed
            })
        }, e.prototype.collapsed = function() {
            var e = t(this.template.gradientOverflow).height(this.lineHeight);
            this.$text.height(this.maxHeight).addClass(this.template.collapseClass).append(e).after(this.$readMoreLink), this.isCollapsed = !0
        }
    }, [jQuery]),
    function(t) {
        "function" == typeof define && define.amd ? define(["./dependencyLibs/inputmask.dependencyLib", "./global/window", "./global/document"], t) : "object" == typeof exports ? module.exports = t(require("./dependencyLibs/inputmask.dependencyLib"), require("./global/window"), require("./global/document")) : window.Inputmask = t(window.dependencyLib || jQuery, window, document)
    }(function(t, e, n, i) {
        function r(e, n, o) {
            if (!(this instanceof r)) return new r(e, n, o);
            this.el = i, this.events = {}, this.maskset = i, this.refreshValue = !1, !0 !== o && (t.isPlainObject(e) ? n = e : (n = n || {}, n.alias = e), this.opts = t.extend(!0, {}, this.defaults, n), this.noMasksCache = n && n.definitions !== i, this.userOptions = n || {}, this.isRTL = this.opts.numericInput, a(this.opts.alias, n, this.opts))
        }

        function a(e, n, o) {
            var s = r.prototype.aliases[e];
            return s ? (s.alias && a(s.alias, i, o), t.extend(!0, o, s), t.extend(!0, o, n), !0) : (null === o.mask && (o.mask = e), !1)
        }

        function o(e, n) {
            function a(e, a, o) {
                var s = !1;
                if (null !== e && "" !== e || (s = null !== o.regex, s ? (e = o.regex, e = e.replace(/^(\^)(.*)(\$)$/, "$2")) : e = "*{*}"), 1 === e.length && !1 === o.greedy && 0 !== o.repeat && (o.placeholder = ""), o.repeat > 0 || "*" === o.repeat || "+" === o.repeat) {
                    var l = "*" === o.repeat ? 0 : "+" === o.repeat ? 1 : o.repeat;
                    e = o.groupmarker.start + e + o.groupmarker.end + o.quantifiermarker.start + l + "," + o.repeat + o.quantifiermarker.end
                }
                var u, c = s ? "regex_" + o.regex : o.numericInput ? e.split("").reverse().join("") : e;
                return r.prototype.masksCache[c] === i || !0 === n ? (u = {
                    mask: e,
                    maskToken: r.prototype.analyseMask(e, s, o),
                    validPositions: {},
                    _buffer: i,
                    buffer: i,
                    tests: {},
                    metadata: a,
                    maskLength: i
                }, !0 !== n && (r.prototype.masksCache[c] = u, u = t.extend(!0, {}, r.prototype.masksCache[c]))) : u = t.extend(!0, {}, r.prototype.masksCache[c]), u
            }
            if (t.isFunction(e.mask) && (e.mask = e.mask(e)), t.isArray(e.mask)) {
                if (e.mask.length > 1) {
                    e.keepStatic = null === e.keepStatic || e.keepStatic;
                    var o = e.groupmarker.start;
                    return t.each(e.numericInput ? e.mask.reverse() : e.mask, function(n, r) {
                        o.length > 1 && (o += e.groupmarker.end + e.alternatormarker + e.groupmarker.start), r.mask === i || t.isFunction(r.mask) ? o += r : o += r.mask
                    }), o += e.groupmarker.end, a(o, e.mask, e)
                }
                e.mask = e.mask.pop()
            }
            return e.mask && e.mask.mask !== i && !t.isFunction(e.mask.mask) ? a(e.mask.mask, e.mask, e) : a(e.mask, e.mask, e)
        }

        function s(a, o, l) {
            function f(t, e, n) {
                e = e || 0;
                var r, a, o, s = [],
                    u = 0,
                    c = g(); - 1 === (q = K !== i ? K.maxLength : i) && (q = i);
                do {
                    !0 === t && p().validPositions[u] ? (o = p().validPositions[u], a = o.match, r = o.locator.slice(), s.push(!0 === n ? o.input : !1 === n ? a.nativeDef : L(u, a))) : (o = b(u, r, u - 1), a = o.match, r = o.locator.slice(), (!1 === l.jitMasking || u < c || "number" == typeof l.jitMasking && isFinite(l.jitMasking) && l.jitMasking > u) && s.push(!1 === n ? a.nativeDef : L(u, a))), u++
                } while ((q === i || u < q) && (null !== a.fn || "" !== a.def) || e > u);
                return "" === s[s.length - 1] && s.pop(), p().maskLength = u + 1, s
            }

            function p() {
                return o
            }

            function m(t) {
                var e = p();
                e.buffer = i, !0 !== t && (e.validPositions = {}, e.p = 0)
            }

            function g(t, e, n) {
                var r = -1,
                    a = -1,
                    o = n || p().validPositions;
                t === i && (t = -1);
                for (var s in o) {
                    var l = parseInt(s);
                    o[l] && (e || !0 !== o[l].generatedInput) && (l <= t && (r = l), l >= t && (a = l))
                }
                return -1 !== r && t - r > 1 || a < t ? r : a
            }

            function v(e, n, r, a) {
                var o, s = e,
                    u = t.extend(!0, {}, p().validPositions),
                    c = !1;
                for (p().p = e, o = n - 1; o >= s; o--) p().validPositions[o] !== i && (!0 !== r && (!p().validPositions[o].match.optionality && function(t) {
                    var e = p().validPositions[t];
                    if (e !== i && null === e.match.fn) {
                        var n = p().validPositions[t - 1],
                            r = p().validPositions[t + 1];
                        return n !== i && r !== i
                    }
                    return !1
                }(o) || !1 === l.canClearPosition(p(), o, g(), a, l)) || delete p().validPositions[o]);
                for (m(!0), o = s + 1; o <= g();) {
                    for (; p().validPositions[s] !== i;) s++;
                    if (o < s && (o = s + 1), p().validPositions[o] === i && M(o)) o++;
                    else {
                        var d = b(o);
                        !1 === c && u[s] && u[s].match.def === d.match.def ? (p().validPositions[s] = t.extend(!0, {}, u[s]), p().validPositions[s].input = d.input, delete p().validPositions[o], o++) : w(s, d.match.def) ? !1 !== F(s, d.input || L(o), !0) && (delete p().validPositions[o], o++, c = !0) : M(o) || (o++, s--), s++
                    }
                }
                m(!0)
            }

            function y(t, e) {
                for (var n, r = t, a = g(), o = p().validPositions[a] || x(0)[0], s = o.alternation !== i ? o.locator[o.alternation].toString().split(",") : [], u = 0; u < r.length && (n = r[u], !(n.match && (l.greedy && !0 !== n.match.optionalQuantifier || (!1 === n.match.optionality || !1 === n.match.newBlockMarker) && !0 !== n.match.optionalQuantifier) && (o.alternation === i || o.alternation !== n.alternation || n.locator[o.alternation] !== i && T(n.locator[o.alternation].toString().split(","), s))) || !0 === e && (null !== n.match.fn || /[0-9a-bA-Z]/.test(n.match.def))); u++);
                return n
            }

            function b(t, e, n) {
                return p().validPositions[t] || y(x(t, e ? e.slice() : e, n))
            }

            function k(t) {
                return p().validPositions[t] ? p().validPositions[t] : x(t)[0]
            }

            function w(t, e) {
                for (var n = !1, i = x(t), r = 0; r < i.length; r++)
                    if (i[r].match && i[r].match.def === e) {
                        n = !0;
                        break
                    }
                return n
            }

            function x(e, n, r) {
                function a(n, r, o, u) {
                    function d(o, u, g) {
                        function v(e, n) {
                            var i = 0 === t.inArray(e, n.matches);
                            return i || t.each(n.matches, function(t, r) {
                                if (!0 === r.isQuantifier && (i = v(e, n.matches[t - 1]))) return !1
                            }), i
                        }

                        function y(e, n, r) {
                            var a, o;
                            if (p().validPositions[e - 1] && r && p().tests[e])
                                for (var s = p().validPositions[e - 1].locator, l = p().tests[e][0].locator, u = 0; u < r; u++)
                                    if (s[u] !== l[u]) return s[r];
                            return (p().tests[e] || p().validPositions[e]) && t.each(p().tests[e] || [p().validPositions[e]], function(t, e) {
                                var s = r !== i ? r : e.alternation,
                                    l = e.locator[s] !== i ? e.locator[s].toString().indexOf(n) : -1;
                                (o === i || l < o) && -1 !== l && (a = e, o = l)
                            }), a ? a.locator.slice((r !== i ? r : a.alternation) + 1) : r !== i ? y(e, n) : i
                        }
                        if (c > 1e4) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + p().mask;
                        if (c === e && o.matches === i) return h.push({
                            match: o,
                            locator: u.reverse(),
                            cd: m
                        }), !0;
                        if (o.matches !== i) {
                            if (o.isGroup && g !== o) {
                                if (o = d(n.matches[t.inArray(o, n.matches) + 1], u)) return !0
                            } else if (o.isOptional) {
                                var b = o;
                                if (o = a(o, r, u, g)) {
                                    if (s = h[h.length - 1].match, !v(s, b)) return !0;
                                    f = !0, c = e
                                }
                            } else if (o.isAlternator) {
                                var k, w = o,
                                    x = [],
                                    _ = h.slice(),
                                    C = u.length,
                                    S = r.length > 0 ? r.shift() : -1;
                                if (-1 === S || "string" == typeof S) {
                                    var D, T = c,
                                        F = r.slice(),
                                        M = [];
                                    if ("string" == typeof S) M = S.split(",");
                                    else
                                        for (D = 0; D < w.matches.length; D++) M.push(D);
                                    for (var E = 0; E < M.length; E++) {
                                        if (D = parseInt(M[E]), h = [], r = y(c, D, C) || F.slice(), !0 !== (o = d(w.matches[D] || n.matches[D], [D].concat(u), g) || o) && o !== i && M[M.length - 1] < w.matches.length) {
                                            var P = t.inArray(o, n.matches) + 1;
                                            n.matches.length > P && (o = d(n.matches[P], [P].concat(u.slice(1, u.length)), g)) && (M.push(P.toString()), t.each(h, function(t, e) {
                                                e.alternation = u.length - 1
                                            }))
                                        }
                                        k = h.slice(), c = T, h = [];
                                        for (var O = 0; O < k.length; O++) {
                                            var A = k[O],
                                                L = !1;
                                            A.alternation = A.alternation || C;
                                            for (var N = 0; N < x.length; N++) {
                                                var j = x[N];
                                                if ("string" != typeof S || -1 !== t.inArray(A.locator[A.alternation].toString(), M)) {
                                                    if (function(t, e) {
                                                            return t.match.nativeDef === e.match.nativeDef || t.match.def === e.match.nativeDef || t.match.nativeDef === e.match.def
                                                        }(A, j)) {
                                                        L = !0, A.alternation == j.alternation && -1 === j.locator[j.alternation].toString().indexOf(A.locator[A.alternation]) && (j.locator[j.alternation] = j.locator[j.alternation] + "," + A.locator[A.alternation], j.alternation = A.alternation), A.match.nativeDef === j.match.def && (A.locator[A.alternation] = j.locator[j.alternation], x.splice(x.indexOf(j), 1, A));
                                                        break
                                                    }
                                                    if (A.match.def === j.match.def) {
                                                        L = !1;
                                                        break
                                                    }
                                                    if (function(t, n) {
                                                            return null === t.match.fn && null !== n.match.fn && n.match.fn.test(t.match.def, p(), e, !1, l, !1)
                                                        }(A, j) || function(t, n) {
                                                            return null !== t.match.fn && null !== n.match.fn && n.match.fn.test(t.match.def.replace(/[\[\]]/g, ""), p(), e, !1, l, !1)
                                                        }(A, j)) {
                                                        A.alternation == j.alternation && -1 === A.locator[A.alternation].toString().indexOf(j.locator[j.alternation].toString().split("")[0]) && (A.na = A.na || A.locator[A.alternation].toString(), -1 === A.na.indexOf(A.locator[A.alternation].toString().split("")[0]) && (A.na = A.na + "," + A.locator[j.alternation].toString().split("")[0]), L = !0, A.locator[A.alternation] = j.locator[j.alternation].toString().split("")[0] + "," + A.locator[A.alternation], x.splice(x.indexOf(j), 0, A));
                                                        break
                                                    }
                                                }
                                            }
                                            L || x.push(A)
                                        }
                                    }
                                    "string" == typeof S && (x = t.map(x, function(e, n) {
                                        if (isFinite(n)) {
                                            var r = e.alternation,
                                                a = e.locator[r].toString().split(",");
                                            e.locator[r] = i, e.alternation = i;
                                            for (var o = 0; o < a.length; o++) - 1 !== t.inArray(a[o], M) && (e.locator[r] !== i ? (e.locator[r] += ",", e.locator[r] += a[o]) : e.locator[r] = parseInt(a[o]), e.alternation = r);
                                            if (e.locator[r] !== i) return e
                                        }
                                    })), h = _.concat(x), c = e, f = h.length > 0, o = x.length > 0, r = F.slice()
                                } else o = d(w.matches[S] || n.matches[S], [S].concat(u), g);
                                if (o) return !0
                            } else if (o.isQuantifier && g !== n.matches[t.inArray(o, n.matches) - 1])
                                for (var I = o, H = r.length > 0 ? r.shift() : 0; H < (isNaN(I.quantifier.max) ? H + 1 : I.quantifier.max) && c <= e; H++) {
                                    var R = n.matches[t.inArray(I, n.matches) - 1];
                                    if (o = d(R, [H].concat(u), R)) {
                                        if (s = h[h.length - 1].match, s.optionalQuantifier = H > I.quantifier.min - 1, v(s, R)) {
                                            if (H > I.quantifier.min - 1) {
                                                f = !0, c = e;
                                                break
                                            }
                                            return !0
                                        }
                                        return !0
                                    }
                                } else if (o = a(o, r, u, g)) return !0
                        } else c++
                    }
                    for (var g = r.length > 0 ? r.shift() : 0; g < n.matches.length; g++)
                        if (!0 !== n.matches[g].isQuantifier) {
                            var v = d(n.matches[g], [g].concat(o), u);
                            if (v && c === e) return v;
                            if (c > e) break
                        }
                }

                function o(t) {
                    return l.keepStatic && e > 0 && t.length > 1 + ("" === t[t.length - 1].match.def ? 1 : 0) && !0 !== t[0].match.optionality && !0 !== t[0].match.optionalQuantifier && null === t[0].match.fn && !/[0-9a-bA-Z]/.test(t[0].match.def) ? [y(t)] : t
                }
                var s, u = p().maskToken,
                    c = n ? r : 0,
                    d = n ? n.slice() : [0],
                    h = [],
                    f = !1,
                    m = n ? n.join("") : "";
                if (e > -1) {
                    if (n === i) {
                        for (var g, v = e - 1;
                            (g = p().validPositions[v] || p().tests[v]) === i && v > -1;) v--;
                        g !== i && v > -1 && (d = function(e) {
                            var n = [];
                            return t.isArray(e) || (e = [e]), e.length > 0 && (e[0].alternation === i ? (n = y(e.slice()).locator.slice(), 0 === n.length && (n = e[0].locator.slice())) : t.each(e, function(t, e) {
                                if ("" !== e.def)
                                    if (0 === n.length) n = e.locator.slice();
                                    else
                                        for (var i = 0; i < n.length; i++) e.locator[i] && -1 === n[i].toString().indexOf(e.locator[i]) && (n[i] += "," + e.locator[i])
                            })), n
                        }(g), m = d.join(""), c = v)
                    }
                    if (p().tests[e] && p().tests[e][0].cd === m) return o(p().tests[e]);
                    for (var b = d.shift(); b < u.length; b++) {
                        if (a(u[b], d, [b]) && c === e || c > e) break
                    }
                }
                return (0 === h.length || f) && h.push({
                    match: {
                        fn: null,
                        cardinality: 0,
                        optionality: !0,
                        casing: null,
                        def: "",
                        placeholder: ""
                    },
                    locator: [],
                    cd: m
                }), n !== i && p().tests[e] ? o(t.extend(!0, [], h)) : (p().tests[e] = t.extend(!0, [], h), o(p().tests[e]))
            }

            function _() {
                return p()._buffer === i && (p()._buffer = f(!1, 1), p().buffer === i && (p().buffer = p()._buffer.slice())), p()._buffer
            }

            function C(t) {
                return p().buffer !== i && !0 !== t || (p().buffer = f(!0, g(), !0)), p().buffer
            }

            function S(t, e, n) {
                var r, a;
                if (!0 === t) m(), t = 0, e = n.length;
                else
                    for (r = t; r < e; r++) delete p().validPositions[r];
                for (a = t, r = t; r < e; r++)
                    if (m(!0), n[r] !== l.skipOptionalPartCharacter) {
                        var o = F(a, n[r], !0, !0);
                        !1 !== o && (m(!0), a = o.caret !== i ? o.caret : o.pos + 1)
                    }
            }

            function D(t, e, n) {
                switch (l.casing || e.casing) {
                    case "upper":
                        t = t.toUpperCase();
                        break;
                    case "lower":
                        t = t.toLowerCase();
                        break;
                    case "title":
                        var i = p().validPositions[n - 1];
                        t = 0 === n || i && i.input === String.fromCharCode(r.keyCode.SPACE) ? t.toUpperCase() : t.toLowerCase()
                }
                return t
            }

            function T(e, n, r) {
                for (var a, o = l.greedy ? n : n.slice(0, 1), s = !1, u = r !== i ? r.split(",") : [], c = 0; c < u.length; c++) - 1 !== (a = e.indexOf(u[c])) && e.splice(a, 1);
                for (var d = 0; d < e.length; d++)
                    if (-1 !== t.inArray(e[d], o)) {
                        s = !0;
                        break
                    }
                return s
            }

            function F(e, n, a, o, s) {
                function u(t) {
                    var e = Q ? t.begin - t.end > 1 || t.begin - t.end == 1 : t.end - t.begin > 1 || t.end - t.begin == 1;
                    return e && 0 === t.begin && t.end === p().maskLength ? "full" : e
                }

                function c(n, r, a) {
                    var s = !1;
                    return t.each(x(n), function(c, h) {
                        for (var f = h.match, y = r ? 1 : 0, b = "", k = f.cardinality; k > y; k--) b += O(n - (k - 1));
                        if (r && (b += r), C(!0), !1 !== (s = null != f.fn ? f.fn.test(b, p(), n, a, l, u(e)) : (r === f.def || r === l.skipOptionalPartCharacter) && "" !== f.def && {
                                c: L(n, f, !0) || f.def,
                                pos: n
                            })) {
                            var w = s.c !== i ? s.c : r;
                            w = w === l.skipOptionalPartCharacter && null === f.fn ? L(n, f, !0) || f.def : w;
                            var x = n,
                                _ = C();
                            if (s.remove !== i && (t.isArray(s.remove) || (s.remove = [s.remove]), t.each(s.remove.sort(function(t, e) {
                                    return e - t
                                }), function(t, e) {
                                    v(e, e + 1, !0)
                                })), s.insert !== i && (t.isArray(s.insert) || (s.insert = [s.insert]), t.each(s.insert.sort(function(t, e) {
                                    return t - e
                                }), function(t, e) {
                                    F(e.pos, e.c, !0, o)
                                })), s.refreshFromBuffer) {
                                var T = s.refreshFromBuffer;
                                if (S(!0 === T ? T : T.start, T.end, _), s.pos === i && s.c === i) return s.pos = g(), !1;
                                if ((x = s.pos !== i ? s.pos : n) !== n) return s = t.extend(s, F(x, w, !0, o)), !1
                            } else if (!0 !== s && s.pos !== i && s.pos !== n && (x = s.pos, S(n, x, C().slice()), x !== n)) return s = t.extend(s, F(x, w, !0)), !1;
                            return (!0 === s || s.pos !== i || s.c !== i) && (c > 0 && m(!0), d(x, t.extend({}, h, {
                                input: D(w, f, x)
                            }), o, u(e)) || (s = !1), !1)
                        }
                    }), s
                }

                function d(e, n, r, a) {
                    if (a || l.insertMode && p().validPositions[e] !== i && r === i) {
                        var o, s = t.extend(!0, {}, p().validPositions),
                            u = g(i, !0);
                        for (o = e; o <= u; o++) delete p().validPositions[o];
                        p().validPositions[e] = t.extend(!0, {}, n);
                        var c, d = !0,
                            f = p().validPositions,
                            v = !1,
                            y = p().maskLength;
                        for (o = c = e; o <= u; o++) {
                            var b = s[o];
                            if (b !== i)
                                for (var k = c; k < p().maskLength && (null === b.match.fn && f[o] && (!0 === f[o].match.optionalQuantifier || !0 === f[o].match.optionality) || null != b.match.fn);) {
                                    if (k++, !1 === v && s[k] && s[k].match.def === b.match.def) p().validPositions[k] = t.extend(!0, {}, s[k]), p().validPositions[k].input = b.input, h(k), c = k, d = !0;
                                    else if (w(k, b.match.def)) {
                                        var x = F(k, b.input, !0, !0);
                                        d = !1 !== x, c = x.caret || x.insert ? g() : k, v = !0
                                    } else if (!(d = !0 === b.generatedInput) && k >= p().maskLength - 1) break;
                                    if (p().maskLength < y && (p().maskLength = y), d) break
                                }
                            if (!d) break
                        }
                        if (!d) return p().validPositions = t.extend(!0, {}, s), m(!0), !1
                    } else p().validPositions[e] = t.extend(!0, {}, n);
                    return m(!0), !0
                }

                function h(e) {
                    for (var n = e - 1; n > -1 && !p().validPositions[n]; n--);
                    var r, a;
                    for (n++; n < e; n++) p().validPositions[n] === i && (!1 === l.jitMasking || l.jitMasking > n) && (a = x(n, b(n - 1).locator, n - 1).slice(), "" === a[a.length - 1].match.def && a.pop(), (r = y(a)) && (r.match.def === l.radixPointDefinitionSymbol || !M(n, !0) || t.inArray(l.radixPoint, C()) < n && r.match.fn && r.match.fn.test(L(n), p(), n, !1, l)) && !1 !== (k = c(n, L(n, r.match, !0) || (null == r.match.fn ? r.match.def : "" !== L(n) ? L(n) : C()[n]), !0)) && (p().validPositions[k.pos || n].generatedInput = !0))
                }
                a = !0 === a;
                var f = e;
                e.begin !== i && (f = Q && !u(e) ? e.end : e.begin);
                var k = !0,
                    _ = t.extend(!0, {}, p().validPositions);
                if (t.isFunction(l.preValidation) && !a && !0 !== o && (k = l.preValidation(C(), f, n, u(e), l)), !0 === k) {
                    if (h(f), u(e) && (W(i, r.keyCode.DELETE, e), f = p().p), f < p().maskLength && (q === i || f < q) && (k = c(f, n, a), (!a || !0 === o) && !1 === k)) {
                        var P = p().validPositions[f];
                        if (!P || null !== P.match.fn || P.match.def !== n && n !== l.skipOptionalPartCharacter) {
                            if ((l.insertMode || p().validPositions[E(f)] === i) && !M(f, !0))
                                for (var A = f + 1, N = E(f); A <= N; A++)
                                    if (!1 !== (k = c(A, n, a))) {
                                        ! function(e, n) {
                                            var r = p().validPositions[n];
                                            if (r)
                                                for (var a = r.locator, o = a.length, s = e; s < n; s++)
                                                    if (p().validPositions[s] === i && !M(s, !0)) {
                                                        var l = x(s).slice(),
                                                            u = y(l, !0),
                                                            h = -1;
                                                        "" === l[l.length - 1].match.def && l.pop(), t.each(l, function(t, e) {
                                                            for (var n = 0; n < o; n++) {
                                                                if (e.locator[n] === i || !T(e.locator[n].toString().split(","), a[n].toString().split(","), e.na)) {
                                                                    var r = a[n],
                                                                        s = u.locator[n],
                                                                        l = e.locator[n];
                                                                    r - s > Math.abs(r - l) && (u = e);
                                                                    break
                                                                }
                                                                h < n && (h = n, u = e)
                                                            }
                                                        }), u = t.extend({}, u, {
                                                            input: L(s, u.match, !0) || u.match.def
                                                        }), u.generatedInput = !0, d(s, u, !0), p().validPositions[n] = i, c(n, r.input, !0)
                                                    }
                                        }(f, k.pos !== i ? k.pos : A), f = A;
                                        break
                                    }
                        } else k = {
                            caret: E(f)
                        }
                    }!1 === k && l.keepStatic && !a && !0 !== s && (k = function(e, n, r) {
                        var a, s, u, c, d, h, f, v, y = t.extend(!0, {}, p().validPositions),
                            b = !1,
                            k = g();
                        for (c = p().validPositions[k]; k >= 0; k--)
                            if ((u = p().validPositions[k]) && u.alternation !== i) {
                                if (a = k, s = p().validPositions[a].alternation, c.locator[u.alternation] !== u.locator[u.alternation]) break;
                                c = u
                            }
                        if (s !== i) {
                            v = parseInt(a);
                            var w = c.locator[c.alternation || s] !== i ? c.locator[c.alternation || s] : f[0];
                            w.length > 0 && (w = w.split(",")[0]);
                            var _ = p().validPositions[v],
                                C = p().validPositions[v - 1];
                            t.each(x(v, C ? C.locator : i, v - 1), function(a, u) {
                                f = u.locator[s] ? u.locator[s].toString().split(",") : [];
                                for (var c = 0; c < f.length; c++) {
                                    var k = [],
                                        x = 0,
                                        C = 0,
                                        S = !1;
                                    if (w < f[c] && (u.na === i || -1 === t.inArray(f[c], u.na.split(",")) || -1 === t.inArray(w.toString(), f))) {
                                        p().validPositions[v] = t.extend(!0, {}, u);
                                        var D = p().validPositions[v].locator;
                                        for (p().validPositions[v].locator[s] = parseInt(f[c]), null == u.match.fn ? (_.input !== u.match.def && (S = !0, !0 !== _.generatedInput && k.push(_.input)), C++, p().validPositions[v].generatedInput = !/[0-9a-bA-Z]/.test(u.match.def), p().validPositions[v].input = u.match.def) : p().validPositions[v].input = _.input, d = v + 1; d < g(i, !0) + 1; d++) h = p().validPositions[d], h && !0 !== h.generatedInput && /[0-9a-bA-Z]/.test(h.input) ? k.push(h.input) : d < e && x++, delete p().validPositions[d];
                                        for (S && k[0] === u.match.def && k.shift(), m(!0), b = !0; k.length > 0;) {
                                            var T = k.shift();
                                            if (T !== l.skipOptionalPartCharacter && !(b = F(g(i, !0) + 1, T, !1, o, !0))) break
                                        }
                                        if (b) {
                                            p().validPositions[v].locator = D;
                                            var M = g(e) + 1;
                                            for (d = v + 1; d < g() + 1; d++)((h = p().validPositions[d]) === i || null == h.match.fn) && d < e + (C - x) && C++;
                                            e += C - x, b = F(e > M ? M : e, n, r, o, !0)
                                        }
                                        if (b) return !1;
                                        m(), p().validPositions = t.extend(!0, {}, y)
                                    }
                                }
                            })
                        }
                        return b
                    }(f, n, a)), !0 === k && (k = {
                        pos: f
                    })
                }
                if (t.isFunction(l.postValidation) && !1 !== k && !a && !0 !== o) {
                    var j = l.postValidation(C(!0), k, l);
                    if (j.refreshFromBuffer && j.buffer) {
                        var I = j.refreshFromBuffer;
                        S(!0 === I ? I : I.start, I.end, j.buffer)
                    }
                    k = !0 === j ? k : j
                }
                return k.pos === i && (k.pos = f), !1 === k && (m(!0), p().validPositions = t.extend(!0, {}, _)), k
            }

            function M(t, e) {
                var n = b(t).match;
                if ("" === n.def && (n = k(t).match), null != n.fn) return n.fn;
                if (!0 !== e && t > -1) {
                    var i = x(t);
                    return i.length > 1 + ("" === i[i.length - 1].match.def ? 1 : 0)
                }
                return !1
            }

            function E(t, e) {
                var n = p().maskLength;
                if (t >= n) return n;
                var i = t;
                for (x(n + 1).length > 1 && (f(!0, n + 1, !0), n = p().maskLength); ++i < n && (!0 === e && (!0 !== k(i).match.newBlockMarker || !M(i)) || !0 !== e && !M(i)););
                return i
            }

            function P(t, e) {
                var n, i = t;
                if (i <= 0) return 0;
                for (; --i > 0 && (!0 === e && !0 !== k(i).match.newBlockMarker || !0 !== e && !M(i) && (n = x(i), n.length < 2 || 2 === n.length && "" === n[1].match.def)););
                return i
            }

            function O(t) {
                return p().validPositions[t] === i ? L(t) : p().validPositions[t].input
            }

            function A(e, n, r, a, o) {
                if (a && t.isFunction(l.onBeforeWrite)) {
                    var s = l.onBeforeWrite(a, n, r, l);
                    if (s) {
                        if (s.refreshFromBuffer) {
                            var u = s.refreshFromBuffer;
                            S(!0 === u ? u : u.start, u.end, s.buffer || n), n = C(!0)
                        }
                        r !== i && (r = s.caret !== i ? s.caret : r)
                    }
                }
                e !== i && (e.inputmask._valueSet(n.join("")), r === i || a !== i && "blur" === a.type ? $(e, n, r) : h && "input" === a.type ? setTimeout(function() {
                    I(e, r)
                }, 0) : I(e, r), !0 === o && (Z = !0, t(e).trigger("input")))
            }

            function L(e, n, r) {
                if (n = n || k(e).match, n.placeholder !== i || !0 === r) return t.isFunction(n.placeholder) ? n.placeholder(l) : n.placeholder;
                if (null === n.fn) {
                    if (e > -1 && p().validPositions[e] === i) {
                        var a, o = x(e),
                            s = [];
                        if (o.length > 1 + ("" === o[o.length - 1].match.def ? 1 : 0))
                            for (var u = 0; u < o.length; u++)
                                if (!0 !== o[u].match.optionality && !0 !== o[u].match.optionalQuantifier && (null === o[u].match.fn || a === i || !1 !== o[u].match.fn.test(a.match.def, p(), e, !0, l)) && (s.push(o[u]), null === o[u].match.fn && (a = o[u]), s.length > 1 && /[0-9a-bA-Z]/.test(s[0].match.def))) return l.placeholder.charAt(e % l.placeholder.length)
                    }
                    return n.def
                }
                return l.placeholder.charAt(e % l.placeholder.length)
            }

            function N(e, a, o, s, u) {
                function c(t, e) {
                    return -1 !== _().slice(t, E(t)).join("").indexOf(e) && !M(t) && k(t).match.nativeDef === e.charAt(e.length - 1)
                }
                var d = s.slice(),
                    h = "",
                    f = 0,
                    v = i;
                if (m(), p().p = E(-1), !o)
                    if (!0 !== l.autoUnmask) {
                        var y = _().slice(0, E(-1)).join(""),
                            w = d.join("").match(new RegExp("^" + r.escapeRegex(y), "g"));
                        w && w.length > 0 && (d.splice(0, w.length * y.length), f = E(f))
                    } else f = E(f);
                if (t.each(d, function(n, r) {
                        if (r !== i) {
                            var a = new t.Event("_checkval");
                            a.which = r.charCodeAt(0), h += r;
                            var s = g(i, !0),
                                u = p().validPositions[s],
                                d = b(s + 1, u ? u.locator.slice() : i, s);
                            if (!c(f, h) || o || l.autoUnmask) {
                                var y = o ? n : null == d.match.fn && d.match.optionality && s + 1 < p().p ? s + 1 : p().p;
                                v = nt.keypressEvent.call(e, a, !0, !1, o, y), f = y + 1, h = ""
                            } else v = nt.keypressEvent.call(e, a, !0, !1, !0, s + 1);
                            if (!o && t.isFunction(l.onBeforeWrite)) {
                                var k = v.forwardPosition;
                                if (v = l.onBeforeWrite(a, C(), v.forwardPosition, l), v.forwardPosition = k, v && v.refreshFromBuffer) {
                                    var w = v.refreshFromBuffer;
                                    S(!0 === w ? w : w.start, w.end, v.buffer), m(!0), v.caret && (p().p = v.caret, v.forwardPosition = v.caret)
                                }
                            }
                        }
                    }), a) {
                    var x = i;
                    n.activeElement === e && v && (x = l.numericInput ? P(v.forwardPosition) : v.forwardPosition), A(e, C(), x, u || new t.Event("checkval"), u && "input" === u.type)
                }
            }

            function j(e) {
                if (e) {
                    if (e.inputmask === i) return e.value;
                    e.inputmask && e.inputmask.refreshValue && nt.setValueEvent.call(e)
                }
                var n = [],
                    r = p().validPositions;
                for (var a in r) r[a].match && null != r[a].match.fn && n.push(r[a].input);
                var o = 0 === n.length ? "" : (Q ? n.reverse() : n).join("");
                if (t.isFunction(l.onUnMask)) {
                    var s = (Q ? C().slice().reverse() : C()).join("");
                    o = l.onUnMask(s, o, l)
                }
                return o
            }

            function I(t, r, a, o) {
                function s(t) {
                    if (!0 !== o && Q && "number" == typeof t && (!l.greedy || "" !== l.placeholder)) {
                        t = C().join("").length - t
                    }
                    return t
                }
                var c;
                if (r === i) return t.setSelectionRange ? (r = t.selectionStart, a = t.selectionEnd) : e.getSelection ? (c = e.getSelection().getRangeAt(0), c.commonAncestorContainer.parentNode !== t && c.commonAncestorContainer !== t || (r = c.startOffset, a = c.endOffset)) : n.selection && n.selection.createRange && (c = n.selection.createRange(), r = 0 - c.duplicate().moveStart("character", -t.inputmask._valueGet().length), a = r + c.text.length), {
                    begin: s(r),
                    end: s(a)
                };
                if (r.begin !== i && (a = r.end, r = r.begin), "number" == typeof r) {
                    r = s(r), a = s(a), a = "number" == typeof a ? a : r;
                    var d = parseInt(((t.ownerDocument.defaultView || e).getComputedStyle ? (t.ownerDocument.defaultView || e).getComputedStyle(t, null) : t.currentStyle).fontSize) * a;
                    if (t.scrollLeft = d > t.scrollWidth ? d : 0, u || !1 !== l.insertMode || r !== a || a++, t.setSelectionRange) t.selectionStart = r, t.selectionEnd = a;
                    else if (e.getSelection) {
                        if (c = n.createRange(), t.firstChild === i || null === t.firstChild) {
                            var h = n.createTextNode("");
                            t.appendChild(h)
                        }
                        c.setStart(t.firstChild, r < t.inputmask._valueGet().length ? r : t.inputmask._valueGet().length), c.setEnd(t.firstChild, a < t.inputmask._valueGet().length ? a : t.inputmask._valueGet().length), c.collapse(!0);
                        var f = e.getSelection();
                        f.removeAllRanges(), f.addRange(c)
                    } else t.createTextRange && (c = t.createTextRange(), c.collapse(!0), c.moveEnd("character", a), c.moveStart("character", r), c.select());
                    $(t, i, {
                        begin: r,
                        end: a
                    })
                }
            }

            function H(e) {
                var n, r, a = C(),
                    o = a.length,
                    s = g(),
                    l = {},
                    u = p().validPositions[s],
                    c = u !== i ? u.locator.slice() : i;
                for (n = s + 1; n < a.length; n++) r = b(n, c, n - 1), c = r.locator.slice(), l[n] = t.extend(!0, {}, r);
                var d = u && u.alternation !== i ? u.locator[u.alternation] : i;
                for (n = o - 1; n > s && (r = l[n], (r.match.optionality || r.match.optionalQuantifier && r.match.newBlockMarker || d && (d !== l[n].locator[u.alternation] && null != r.match.fn || null === r.match.fn && r.locator[u.alternation] && T(r.locator[u.alternation].toString().split(","), d.toString().split(",")) && "" !== x(n)[0].def)) && a[n] === L(n, r.match)); n--) o--;
                return e ? {
                    l: o,
                    def: l[o] ? l[o].match : i
                } : o
            }

            function R(t) {
                for (var e, n = H(), r = t.length, a = p().validPositions[g()]; n < r && !M(n, !0) && (e = a !== i ? b(n, a.locator.slice(""), a) : k(n)) && !0 !== e.match.optionality && (!0 !== e.match.optionalQuantifier && !0 !== e.match.newBlockMarker || n + 1 === r && "" === (a !== i ? b(n + 1, a.locator.slice(""), a) : k(n + 1)).match.def);) n++;
                for (;
                    (e = p().validPositions[n - 1]) && e && e.match.optionality && e.input === l.skipOptionalPartCharacter;) n--;
                return t.splice(n), t
            }

            function Y(e) {
                if (t.isFunction(l.isComplete)) return l.isComplete(e, l);
                if ("*" === l.repeat) return i;
                var n = !1,
                    r = H(!0),
                    a = P(r.l);
                if (r.def === i || r.def.newBlockMarker || r.def.optionality || r.def.optionalQuantifier) {
                    n = !0;
                    for (var o = 0; o <= a; o++) {
                        var s = b(o).match;
                        if (null !== s.fn && p().validPositions[o] === i && !0 !== s.optionality && !0 !== s.optionalQuantifier || null === s.fn && e[o] !== L(o, s)) {
                            n = !1;
                            break
                        }
                    }
                }
                return n
            }

            function W(e, n, a, o) {
                if ((l.numericInput || Q) && (n === r.keyCode.BACKSPACE ? n = r.keyCode.DELETE : n === r.keyCode.DELETE && (n = r.keyCode.BACKSPACE), Q)) {
                    var s = a.end;
                    a.end = a.begin, a.begin = s
                }
                n === r.keyCode.BACKSPACE && (a.end - a.begin < 1 || !1 === l.insertMode) ? (a.begin = P(a.begin), p().validPositions[a.begin] === i || p().validPositions[a.begin].input !== l.groupSeparator && p().validPositions[a.begin].input !== l.radixPoint || a.begin--) : n === r.keyCode.DELETE && a.begin === a.end && (a.end = M(a.end, !0) ? a.end + 1 : E(a.end) + 1, p().validPositions[a.begin] === i || p().validPositions[a.begin].input !== l.groupSeparator && p().validPositions[a.begin].input !== l.radixPoint || a.end++), v(a.begin, a.end, !1, o), !0 !== o && function() {
                    if (l.keepStatic) {
                        for (var n = [], r = g(-1, !0), a = t.extend(!0, {}, p().validPositions), o = p().validPositions[r]; r >= 0; r--) {
                            var s = p().validPositions[r];
                            if (s) {
                                if (!0 !== s.generatedInput && /[0-9a-bA-Z]/.test(s.input) && n.push(s.input), delete p().validPositions[r], s.alternation !== i && s.locator[s.alternation] !== o.locator[s.alternation]) break;
                                o = s
                            }
                        }
                        if (r > -1)
                            for (p().p = E(g(-1, !0)); n.length > 0;) {
                                var u = new t.Event("keypress");
                                u.which = n.pop().charCodeAt(0), nt.keypressEvent.call(e, u, !0, !1, !1, p().p)
                            } else p().validPositions = t.extend(!0, {}, a)
                    }
                }();
                var u = g(a.begin, !0);
                u < a.begin ? p().p = E(u) : !0 !== o && (p().p = a.begin)
            }

            function B(i) {
                function r(t) {
                    var e, r = n.createElement("span");
                    for (var a in s) isNaN(a) && -1 !== a.indexOf("font") && (r.style[a] = s[a]);
                    r.style.textTransform = s.textTransform, r.style.letterSpacing = s.letterSpacing, r.style.position = "absolute", r.style.height = "auto", r.style.width = "auto", r.style.visibility = "hidden", r.style.whiteSpace = "nowrap", n.body.appendChild(r);
                    var o, l = i.inputmask._valueGet(),
                        u = 0;
                    for (e = 0, o = l.length; e <= o; e++) {
                        if (r.innerHTML += l.charAt(e) || "_", r.offsetWidth >= t) {
                            var c = t - u,
                                d = r.offsetWidth - t;
                            r.innerHTML = l.charAt(e), c -= r.offsetWidth / 3, e = c < d ? e - 1 : e;
                            break
                        }
                        u = r.offsetWidth
                    }
                    return n.body.removeChild(r), e
                }

                function a() {
                    z.style.position = "absolute", z.style.top = o.top + "px", z.style.left = o.left + "px", z.style.width = parseInt(i.offsetWidth) - parseInt(s.paddingLeft) - parseInt(s.paddingRight) - parseInt(s.borderLeftWidth) - parseInt(s.borderRightWidth) + "px", z.style.height = parseInt(i.offsetHeight) - parseInt(s.paddingTop) - parseInt(s.paddingBottom) - parseInt(s.borderTopWidth) - parseInt(s.borderBottomWidth) + "px", z.style.lineHeight = z.style.height, z.style.zIndex = isNaN(s.zIndex) ? -1 : s.zIndex - 1, z.style.webkitAppearance = "textfield", z.style.mozAppearance = "textfield", z.style.Appearance = "textfield"
                }
                var o = t(i).position(),
                    s = (i.ownerDocument.defaultView || e).getComputedStyle(i, null);
                i.parentNode;
                z = n.createElement("div"), n.body.appendChild(z);
                for (var u in s) s.hasOwnProperty(u) && isNaN(u) && "cssText" !== u && -1 == u.indexOf("webkit") && (z.style[u] = s[u]);
                i.style.backgroundColor = "transparent", i.style.color = "transparent", i.style.webkitAppearance = "caret", i.style.mozAppearance = "caret", i.style.Appearance = "caret", a(), t(e).on("resize", function(n) {
                    o = t(i).position(), s = (i.ownerDocument.defaultView || e).getComputedStyle(i, null), a()
                }), t(i).on("click", function(t) {
                    return I(i, r(t.clientX)), nt.clickEvent.call(this, [t])
                }), t(i).on("keydown", function(t) {
                    t.shiftKey || !1 === l.insertMode || setTimeout(function() {
                        $(i)
                    }, 0)
                })
            }

            function $(t, e, r) {
                function a() {
                    s || null !== c.fn && d.input !== i ? s && null !== c.fn && d.input !== i && (s = !1, o += "</span>") : (s = !0, o += "<span class='im-static''>")
                }
                if (z !== i) {
                    e = e || C(), r === i ? r = I(t) : r.begin === i && (r = {
                        begin: r,
                        end: r
                    });
                    var o = "",
                        s = !1;
                    if ("" != e) {
                        var u, c, d, h = 0,
                            f = g();
                        do {
                            h === r.begin && n.activeElement === t && (o += "<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>"), p().validPositions[h] ? (d = p().validPositions[h], c = d.match, u = d.locator.slice(), a(), o += d.input) : (d = b(h, u, h - 1), c = d.match, u = d.locator.slice(), (!1 === l.jitMasking || h < f || "number" == typeof l.jitMasking && isFinite(l.jitMasking) && l.jitMasking > h) && (a(), o += L(h, c))), h++
                        } while ((q === i || h < q) && (null !== c.fn || "" !== c.def) || f > h)
                    }
                    z.innerHTML = o
                }
            }
            o = o || this.maskset, l = l || this.opts;
            var V, G, q, z, U, K = this.el,
                Q = this.isRTL,
                X = !1,
                Z = !1,
                J = !1,
                tt = !1,
                et = {
                    on: function(e, n, a) {
                        var o = function(e) {
                            if (this.inputmask === i && "FORM" !== this.nodeName) {
                                var n = t.data(this, "_inputmask_opts");
                                n ? new r(n).mask(this) : et.off(this)
                            } else {
                                if ("setvalue" === e.type || "FORM" === this.nodeName || !(this.disabled || this.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === l.tabThrough && e.keyCode === r.keyCode.TAB))) {
                                    switch (e.type) {
                                        case "input":
                                            if (!0 === Z) return Z = !1, e.preventDefault();
                                            break;
                                        case "keydown":
                                            X = !1, Z = !1;
                                            break;
                                        case "keypress":
                                            if (!0 === X) return e.preventDefault();
                                            X = !0;
                                            break;
                                        case "click":
                                            if (c || d) {
                                                var o = this,
                                                    s = arguments;
                                                return setTimeout(function() {
                                                    a.apply(o, s)
                                                }, 0), !1
                                            }
                                    }
                                    var u = a.apply(this, arguments);
                                    return !1 === u && (e.preventDefault(), e.stopPropagation()), u
                                }
                                e.preventDefault()
                            }
                        };
                        e.inputmask.events[n] = e.inputmask.events[n] || [], e.inputmask.events[n].push(o), -1 !== t.inArray(n, ["submits", "reset"]) ? null != e.form && t(e.form).on(n, o) : t(e).on(n, o)
                    },
                    off: function(e, n) {
                        if (e.inputmask && e.inputmask.events) {
                            var i;
                            n ? (i = [], i[n] = e.inputmask.events[n]) : i = e.inputmask.events, t.each(i, function(n, i) {
                                for (; i.length > 0;) {
                                    var r = i.pop(); - 1 !== t.inArray(n, ["submits", "reset"]) ? null != e.form && t(e.form).off(n, r) : t(e).off(n, r)
                                }
                                delete e.inputmask.events[n]
                            })
                        }
                    }
                },
                nt = {
                    keydownEvent: function(e) {
                        var i = this,
                            a = t(i),
                            o = e.keyCode,
                            s = I(i);
                        if (o === r.keyCode.BACKSPACE || o === r.keyCode.DELETE || d && o === r.keyCode.BACKSPACE_SAFARI || e.ctrlKey && o === r.keyCode.X && ! function(t) {
                                var e = n.createElement("input"),
                                    i = "on" + t,
                                    r = i in e;
                                return r || (e.setAttribute(i, "return;"), r = "function" == typeof e[i]), e = null, r
                            }("cut")) e.preventDefault(), W(i, o, s), A(i, C(!0), p().p, e, i.inputmask._valueGet() !== C().join("")), i.inputmask._valueGet() === _().join("") ? a.trigger("cleared") : !0 === Y(C()) && a.trigger("complete");
                        else if (o === r.keyCode.END || o === r.keyCode.PAGE_DOWN) {
                            e.preventDefault();
                            var u = E(g());
                            l.insertMode || u !== p().maskLength || e.shiftKey || u--, I(i, e.shiftKey ? s.begin : u, u, !0)
                        } else o === r.keyCode.HOME && !e.shiftKey || o === r.keyCode.PAGE_UP ? (e.preventDefault(), I(i, 0, e.shiftKey ? s.begin : 0, !0)) : (l.undoOnEscape && o === r.keyCode.ESCAPE || 90 === o && e.ctrlKey) && !0 !== e.altKey ? (N(i, !0, !1, V.split("")), a.trigger("click")) : o !== r.keyCode.INSERT || e.shiftKey || e.ctrlKey ? !0 === l.tabThrough && o === r.keyCode.TAB ? (!0 === e.shiftKey ? (null === k(s.begin).match.fn && (s.begin = E(s.begin)), s.end = P(s.begin, !0), s.begin = P(s.end, !0)) : (s.begin = E(s.begin, !0), s.end = E(s.begin, !0), s.end < p().maskLength && s.end--), s.begin < p().maskLength && (e.preventDefault(), I(i, s.begin, s.end))) : e.shiftKey || !1 === l.insertMode && (o === r.keyCode.RIGHT ? setTimeout(function() {
                            var t = I(i);
                            I(i, t.begin)
                        }, 0) : o === r.keyCode.LEFT && setTimeout(function() {
                            var t = I(i);
                            I(i, Q ? t.begin + 1 : t.begin - 1)
                        }, 0)) : (l.insertMode = !l.insertMode, I(i, l.insertMode || s.begin !== p().maskLength ? s.begin : s.begin - 1));
                        l.onKeyDown.call(this, e, C(), I(i).begin, l), J = -1 !== t.inArray(o, l.ignorables)
                    },
                    keypressEvent: function(e, n, a, o, s) {
                        var u = this,
                            c = t(u),
                            d = e.which || e.charCode || e.keyCode;
                        if (!(!0 === n || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || J)) return d === r.keyCode.ENTER && V !== C().join("") && (V = C().join(""), setTimeout(function() {
                            c.trigger("change")
                        }, 0)), !0;
                        if (d) {
                            46 === d && !1 === e.shiftKey && "" !== l.radixPoint && (d = l.radixPoint.charCodeAt(0));
                            var h, f = n ? {
                                    begin: s,
                                    end: s
                                } : I(u),
                                g = String.fromCharCode(d);
                            p().writeOutBuffer = !0;
                            var v = F(f, g, o);
                            if (!1 !== v && (m(!0), h = v.caret !== i ? v.caret : n ? v.pos + 1 : E(v.pos), p().p = h), !1 !== a && (setTimeout(function() {
                                    l.onKeyValidation.call(u, d, v, l)
                                }, 0), p().writeOutBuffer && !1 !== v)) {
                                var y = C();
                                A(u, y, l.numericInput && v.caret === i ? P(h) : h, e, !0 !== n), !0 !== n && setTimeout(function() {
                                    !0 === Y(y) && c.trigger("complete")
                                }, 0)
                            }
                            if (e.preventDefault(), n) return v.forwardPosition = h, v
                        }
                    },
                    pasteEvent: function(n) {
                        var i, r = this,
                            a = n.originalEvent || n,
                            o = t(r),
                            s = r.inputmask._valueGet(!0),
                            u = I(r);
                        Q && (i = u.end, u.end = u.begin, u.begin = i);
                        var c = s.substr(0, u.begin),
                            d = s.substr(u.end, s.length);
                        if (c === (Q ? _().reverse() : _()).slice(0, u.begin).join("") && (c = ""), d === (Q ? _().reverse() : _()).slice(u.end).join("") && (d = ""), Q && (i = c, c = d, d = i), e.clipboardData && e.clipboardData.getData) s = c + e.clipboardData.getData("Text") + d;
                        else {
                            if (!a.clipboardData || !a.clipboardData.getData) return !0;
                            s = c + a.clipboardData.getData("text/plain") + d
                        }
                        var h = s;
                        if (t.isFunction(l.onBeforePaste)) {
                            if (!1 === (h = l.onBeforePaste(s, l))) return n.preventDefault();
                            h || (h = s)
                        }
                        return N(r, !1, !1, Q ? h.split("").reverse() : h.toString().split("")), A(r, C(), E(g()), n, V !== C().join("")), !0 === Y(C()) && o.trigger("complete"), n.preventDefault()
                    },
                    inputFallBackEvent: function(e) {
                        var n = this,
                            i = n.inputmask._valueGet();
                        if (C().join("") !== i) {
                            var a = I(n);
                            if ("." === i.charAt(a.begin - 1) && "" !== l.radixPoint && (i = i.split(""), i[a.begin - 1] = l.radixPoint.charAt(0), i = i.join("")), i.charAt(a.begin - 1) === l.radixPoint && i.length > C().length) {
                                var o = new t.Event("keypress");
                                return o.which = l.radixPoint.charCodeAt(0), nt.keypressEvent.call(n, o, !0, !0, !1, a.begin), !1
                            }
                            if (i = i.replace(new RegExp("(" + r.escapeRegex(_().join("")) + ")*"), ""), c) {
                                var s = i.replace(C().join(""), "");
                                if (1 === s.length) {
                                    var o = new t.Event("keypress");
                                    return o.which = s.charCodeAt(0), nt.keypressEvent.call(n, o, !0, !0, !1, p().validPositions[a.begin - 1] ? a.begin : a.begin - 1), !1
                                }
                            }
                            if (a.begin > i.length && (I(n, i.length), a = I(n)), C().length - i.length != 1 || i.charAt(a.begin) === C()[a.begin] || i.charAt(a.begin + 1) === C()[a.begin] || M(a.begin)) {
                                var u = [],
                                    d = f(!0, 1).join("");
                                for (u.push(i.substr(0, a.begin)), u.push(i.substr(a.begin)); null === i.match(r.escapeRegex(d) + "$");) d = d.slice(1);
                                i = i.replace(d, ""), t.isFunction(l.onBeforeMask) && (i = l.onBeforeMask(i, l) || i), N(n, !0, !1, i.split(""), e);
                                var m = I(n).begin,
                                    g = n.inputmask._valueGet(),
                                    v = g.indexOf(u[0]);
                                if (0 === v && m !== u[0].length) I(n, u[0].length), h && setTimeout(function() {
                                    I(n, u[0].length)
                                }, 0);
                                else {
                                    for (; null === g.match(r.escapeRegex(u[1]) + "$");) u[1] = u[1].substr(1);
                                    var y = g.indexOf(u[1]); - 1 !== y && "" !== u[1] && m > y && y > v && (I(n, y), h && setTimeout(function() {
                                        I(n, y)
                                    }, 0))
                                }!0 === Y(C()) && t(n).trigger("complete")
                            } else e.keyCode = r.keyCode.BACKSPACE, nt.keydownEvent.call(n, e);
                            e.preventDefault()
                        }
                    },
                    setValueEvent: function(e) {
                        this.inputmask.refreshValue = !1;
                        var n = this,
                            i = n.inputmask._valueGet(!0);
                        t.isFunction(l.onBeforeMask) && (i = l.onBeforeMask(i, l) || i), i = i.split(""), N(n, !0, !1, Q ? i.reverse() : i), V = C().join(""), (l.clearMaskOnLostFocus || l.clearIncomplete) && n.inputmask._valueGet() === _().join("") && n.inputmask._valueSet("")
                    },
                    focusEvent: function(t) {
                        var e = this,
                            n = e.inputmask._valueGet();
                        l.showMaskOnFocus && (!l.showMaskOnHover || l.showMaskOnHover && "" === n) && (e.inputmask._valueGet() !== C().join("") ? A(e, C(), E(g())) : !1 === tt && I(e, E(g()))), !0 === l.positionCaretOnTab && !1 === tt && (A(e, C(), I(e)), nt.clickEvent.apply(e, [t, !0])), V = C().join("")
                    },
                    mouseleaveEvent: function(t) {
                        var e = this;
                        if (tt = !1, l.clearMaskOnLostFocus && n.activeElement !== e) {
                            var i = C().slice(),
                                r = e.inputmask._valueGet();
                            r !== e.getAttribute("placeholder") && "" !== r && (-1 === g() && r === _().join("") ? i = [] : R(i), A(e, i))
                        }
                    },
                    clickEvent: function(e, r) {
                        function a(e) {
                            if ("" !== l.radixPoint) {
                                var n = p().validPositions;
                                if (n[e] === i || n[e].input === L(e)) {
                                    if (e < E(-1)) return !0;
                                    var r = t.inArray(l.radixPoint, C());
                                    if (-1 !== r) {
                                        for (var a in n)
                                            if (r < a && n[a].input !== L(a)) return !1;
                                        return !0
                                    }
                                }
                            }
                            return !1
                        }
                        var o = this;
                        setTimeout(function() {
                            if (n.activeElement === o) {
                                var t = I(o);
                                if (r && (Q ? t.end = t.begin : t.begin = t.end), t.begin === t.end) switch (l.positionCaretOnClick) {
                                    case "none":
                                        break;
                                    case "radixFocus":
                                        if (a(t.begin)) {
                                            var e = C().join("").indexOf(l.radixPoint);
                                            I(o, l.numericInput ? E(e) : e);
                                            break
                                        }
                                    default:
                                        var i = t.begin,
                                            s = g(i, !0),
                                            u = E(s);
                                        if (i < u) I(o, M(i) || M(i - 1) ? i : E(i));
                                        else {
                                            var c = L(u);
                                            ("" !== c && C()[u] !== c && !0 !== k(u).match.optionalQuantifier || !M(u) && k(u).match.def === c) && (u = E(u)), I(o, u)
                                        }
                                }
                            }
                        }, 0)
                    },
                    dblclickEvent: function(t) {
                        var e = this;
                        setTimeout(function() {
                            I(e, 0, E(g()))
                        }, 0)
                    },
                    cutEvent: function(i) {
                        var a = this,
                            o = t(a),
                            s = I(a),
                            l = i.originalEvent || i,
                            u = e.clipboardData || l.clipboardData,
                            c = Q ? C().slice(s.end, s.begin) : C().slice(s.begin, s.end);
                        u.setData("text", Q ? c.reverse().join("") : c.join("")), n.execCommand && n.execCommand("copy"), W(a, r.keyCode.DELETE, s), A(a, C(), p().p, i, V !== C().join("")), a.inputmask._valueGet() === _().join("") && o.trigger("cleared")
                    },
                    blurEvent: function(e) {
                        var n = t(this),
                            r = this;
                        if (r.inputmask) {
                            var a = r.inputmask._valueGet(),
                                o = C().slice();
                            V !== o.join("") && setTimeout(function() {
                                n.trigger("change"), V = o.join("")
                            }, 0), "" !== a && (l.clearMaskOnLostFocus && (-1 === g() && a === _().join("") ? o = [] : R(o)), !1 === Y(o) && (setTimeout(function() {
                                n.trigger("incomplete")
                            }, 0), l.clearIncomplete && (m(), o = l.clearMaskOnLostFocus ? [] : _().slice())), A(r, o, i, e))
                        }
                    },
                    mouseenterEvent: function(t) {
                        var e = this;
                        tt = !0, n.activeElement !== e && l.showMaskOnHover && e.inputmask._valueGet() !== C().join("") && A(e, C())
                    },
                    submitsEvent: function(t) {
                        V !== C().join("") && G.trigger("change"), l.clearMaskOnLostFocus && -1 === g() && K.inputmask._valueGet && K.inputmask._valueGet() === _().join("") && K.inputmask._valueSet(""), l.removeMaskOnsubmits && (K.inputmask._valueSet(K.inputmask.unmaskedvalue(), !0), setTimeout(function() {
                            A(K, C())
                        }, 0))
                    },
                    resetEvent: function(t) {
                        K.inputmask.refreshValue = !0, setTimeout(function() {
                            G.trigger("setvalue")
                        }, 0)
                    }
                };
            if (a !== i) switch (a.action) {
                case "isComplete":
                    return K = a.el, Y(C());
                case "unmaskedvalue":
                    return K !== i && a.value === i || (U = a.value, U = (t.isFunction(l.onBeforeMask) ? l.onBeforeMask(U, l) || U : U).split(""), N(i, !1, !1, Q ? U.reverse() : U), t.isFunction(l.onBeforeWrite) && l.onBeforeWrite(i, C(), 0, l)), j(K);
                case "mask":
                    ! function(e) {
                        et.off(e);
                        var r = function(e, r) {
                            var a = e.getAttribute("type"),
                                o = "INPUT" === e.tagName && -1 !== t.inArray(a, r.supportsInputType) || e.isContentEditable || "TEXTAREA" === e.tagName;
                            if (!o)
                                if ("INPUT" === e.tagName) {
                                    var s = n.createElement("input");
                                    s.setAttribute("type", a), o = "text" === s.type, s = null
                                } else o = "partial";
                            return !1 !== o && function(e) {
                                function a() {
                                    return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== g() || !0 !== r.nullable ? n.activeElement === this && r.clearMaskOnLostFocus ? (Q ? R(C().slice()).reverse() : R(C().slice())).join("") : s.call(this) : "" : s.call(this)
                                }

                                function o(e) {
                                    l.call(this, e), this.inputmask && t(this).trigger("setvalue")
                                }
                                var s, l;
                                if (!e.inputmask.__valueGet) {
                                    if (!0 !== r.noValuePatching) {
                                        if (Object.getOwnPropertyDescriptor) {
                                            "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" == typeof "test".__proto__ ? function(t) {
                                                return t.__proto__
                                            } : function(t) {
                                                return t.constructor.prototype
                                            });
                                            var u = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e), "value") : i;
                                            u && u.get && u.set ? (s = u.get, l = u.set, Object.defineProperty(e, "value", {
                                                get: a,
                                                set: o,
                                                configurable: !0
                                            })) : "INPUT" !== e.tagName && (s = function() {
                                                return this.textContent
                                            }, l = function(t) {
                                                this.textContent = t
                                            }, Object.defineProperty(e, "value", {
                                                get: a,
                                                set: o,
                                                configurable: !0
                                            }))
                                        } else n.__lookupGetter__ && e.__lookupGetter__("value") && (s = e.__lookupGetter__("value"), l = e.__lookupSetter__("value"), e.__defineGetter__("value", a), e.__defineSetter__("value", o));
                                        e.inputmask.__valueGet = s, e.inputmask.__valueSet = l
                                    }
                                    e.inputmask._valueGet = function(t) {
                                        return Q && !0 !== t ? s.call(this.el).split("").reverse().join("") : s.call(this.el)
                                    }, e.inputmask._valueSet = function(t, e) {
                                        l.call(this.el, null === t || t === i ? "" : !0 !== e && Q ? t.split("").reverse().join("") : t)
                                    }, s === i && (s = function() {
                                        return this.value
                                    }, l = function(t) {
                                        this.value = t
                                    }, function(e) {
                                        if (t.valHooks && (t.valHooks[e] === i || !0 !== t.valHooks[e].inputmaskpatch)) {
                                            var n = t.valHooks[e] && t.valHooks[e].get ? t.valHooks[e].get : function(t) {
                                                    return t.value
                                                },
                                                a = t.valHooks[e] && t.valHooks[e].set ? t.valHooks[e].set : function(t, e) {
                                                    return t.value = e, t
                                                };
                                            t.valHooks[e] = {
                                                get: function(t) {
                                                    if (t.inputmask) {
                                                        if (t.inputmask.opts.autoUnmask) return t.inputmask.unmaskedvalue();
                                                        var e = n(t);
                                                        return -1 !== g(i, i, t.inputmask.maskset.validPositions) || !0 !== r.nullable ? e : ""
                                                    }
                                                    return n(t)
                                                },
                                                set: function(e, n) {
                                                    var i, r = t(e);
                                                    return i = a(e, n), e.inputmask && r.trigger("setvalue"), i
                                                },
                                                inputmaskpatch: !0
                                            }
                                        }
                                    }(e.type), function(e) {
                                        et.on(e, "mouseenter", function(e) {
                                            var n = t(this);
                                            this.inputmask._valueGet() !== C().join("") && n.trigger("setvalue")
                                        })
                                    }(e))
                                }
                            }(e), o
                        }(e, l);
                        if (!1 !== r && (K = e, G = t(K), !0 === l.colorMask && B(K), h && (K.hasOwnProperty("inputmode") && (K.inputmode = l.inputmode, K.setAttribute("inputmode", l.inputmode)), "rtfm" === l.androidHack && (!0 !== l.colorMask && B(K), K.type = "password")), !0 === r && (et.on(K, "submits", nt.submitsEvent), et.on(K, "reset", nt.resetEvent), et.on(K, "mouseenter", nt.mouseenterEvent), et.on(K, "blur", nt.blurEvent), et.on(K, "focus", nt.focusEvent), et.on(K, "mouseleave", nt.mouseleaveEvent), !0 !== l.colorMask && et.on(K, "click", nt.clickEvent), et.on(K, "dblclick", nt.dblclickEvent), et.on(K, "paste", nt.pasteEvent), et.on(K, "dragdrop", nt.pasteEvent), et.on(K, "drop", nt.pasteEvent), et.on(K, "cut", nt.cutEvent), et.on(K, "complete", l.oncomplete), et.on(K, "incomplete", l.onincomplete), et.on(K, "cleared", l.oncleared), h || !0 === l.inputEventOnly || (et.on(K, "keydown", nt.keydownEvent), et.on(K, "keypress", nt.keypressEvent)), et.on(K, "compositionstart", t.noop), et.on(K, "compositionupdate", t.noop), et.on(K, "compositionend", t.noop), et.on(K, "keyup", t.noop), et.on(K, "input", nt.inputFallBackEvent), et.on(K, "beforeinput", t.noop)), et.on(K, "setvalue", nt.setValueEvent), V = _().join(""), "" !== K.inputmask._valueGet(!0) || !1 === l.clearMaskOnLostFocus || n.activeElement === K)) {
                            var a = t.isFunction(l.onBeforeMask) ? l.onBeforeMask(K.inputmask._valueGet(!0), l) || K.inputmask._valueGet(!0) : K.inputmask._valueGet(!0);
                            "" !== a && N(K, !0, !1, Q ? a.split("").reverse() : a.split(""));
                            var o = C().slice();
                            !1 === Y(o) && l.clearIncomplete && m(), l.clearMaskOnLostFocus && n.activeElement !== K && (-1 === g() ? o = [] : R(o)), A(K, o), n.activeElement === K && I(K, E(g()))
                        }
                    }(K);
                    break;
                case "format":
                    return U = (t.isFunction(l.onBeforeMask) ? l.onBeforeMask(a.value, l) || a.value : a.value).split(""), N(i, !0, !1, Q ? U.reverse() : U), a.metadata ? {
                        value: Q ? C().slice().reverse().join("") : C().join(""),
                        metadata: s.call(this, {
                            action: "getmetadata"
                        }, o, l)
                    } : Q ? C().slice().reverse().join("") : C().join("");
                case "isValid":
                    a.value ? (U = a.value.split(""), N(i, !0, !0, Q ? U.reverse() : U)) : a.value = C().join("");
                    for (var it = C(), rt = H(), at = it.length - 1; at > rt && !M(at); at--);
                    return it.splice(rt, at + 1 - rt), Y(it) && a.value === C().join("");
                case "getemptymask":
                    return _().join("");
                case "remove":
                    if (K && K.inputmask) {
                        G = t(K), K.inputmask._valueSet(l.autoUnmask ? j(K) : K.inputmask._valueGet(!0)), et.off(K);
                        Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(K), "value") && K.inputmask.__valueGet && Object.defineProperty(K, "value", {
                            get: K.inputmask.__valueGet,
                            set: K.inputmask.__valueSet,
                            configurable: !0
                        }) : n.__lookupGetter__ && K.__lookupGetter__("value") && K.inputmask.__valueGet && (K.__defineGetter__("value", K.inputmask.__valueGet), K.__defineSetter__("value", K.inputmask.__valueSet)), K.inputmask = i
                    }
                    return K;
                case "getmetadata":
                    if (t.isArray(o.metadata)) {
                        var ot = f(!0, 0, !1).join("");
                        return t.each(o.metadata, function(t, e) {
                            if (e.mask === ot) return ot = e, !1
                        }), ot
                    }
                    return o.metadata
            }
        }
        var l = navigator.userAgent,
            u = /mobile/i.test(l),
            c = /iemobile/i.test(l),
            d = /iphone/i.test(l) && !c,
            h = /android/i.test(l) && !c;
        return r.prototype = {
            dataAttribute: "data-inputmask",
            defaults: {
                placeholder: "_",
                optionalmarker: {
                    start: "[",
                    end: "]"
                },
                quantifiermarker: {
                    start: "{",
                    end: "}"
                },
                groupmarker: {
                    start: "(",
                    end: ")"
                },
                alternatormarker: "|",
                escapeChar: "\\",
                mask: null,
                regex: null,
                oncomplete: t.noop,
                onincomplete: t.noop,
                oncleared: t.noop,
                repeat: 0,
                greedy: !0,
                autoUnmask: !1,
                removeMaskOnsubmits: !1,
                clearMaskOnLostFocus: !0,
                insertMode: !0,
                clearIncomplete: !1,
                alias: null,
                onKeyDown: t.noop,
                onBeforeMask: null,
                onBeforePaste: function(e, n) {
                    return t.isFunction(n.onBeforeMask) ? n.onBeforeMask(e, n) : e
                },
                onBeforeWrite: null,
                onUnMask: null,
                showMaskOnFocus: !0,
                showMaskOnHover: !0,
                onKeyValidation: t.noop,
                skipOptionalPartCharacter: " ",
                numericInput: !1,
                rightAlign: !1,
                undoOnEscape: !0,
                radixPoint: "",
                radixPointDefinitionSymbol: i,
                groupSeparator: "",
                keepStatic: null,
                positionCaretOnTab: !0,
                tabThrough: !1,
                supportsInputType: ["text", "tel", "password"],
                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
                isComplete: null,
                canClearPosition: t.noop,
                preValidation: null,
                postValidation: null,
                staticDefinitionSymbol: i,
                jitMasking: !1,
                nullable: !0,
                inputEventOnly: !1,
                noValuePatching: !1,
                positionCaretOnClick: "lvp",
                casing: null,
                inputmode: "verbatim",
                colorMask: !1,
                androidHack: !1
            },
            definitions: {
                9: {
                    validators: "[0-9]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                a: {
                    validators: "[A-Za-zА-яЁёÀ-ÿµ]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                "*": {
                    validators: function() {
                        return !0
                    },
                    cardinality: 1
                }
            },
            aliases: {},
            masksCache: {},
            mask: function(l) {
                function u(n, r, o, s) {
                    function l(t, r) {
                        null !== (r = r !== i ? r : n.getAttribute(s + "-" + t)) && ("string" == typeof r && (0 === t.indexOf("on") ? r = e[r] : "false" === r ? r = !1 : "true" === r && (r = !0)), o[t] = r)
                    }("rtl" === n.dir || r.rightAlign) && (n.style.textAlign = "right"), ("rtl" === n.dir || r.numericInput) && (n.dir = "ltr", n.removeAttribute("dir"), r.isRTL = !0);
                    var u, c, d, h, f = n.getAttribute(s);
                    if (f && "" !== f && (f = f.replace(new RegExp("'", "g"), '"'), c = JSON.parse("{" + f + "}")), c) {
                        d = i;
                        for (h in c)
                            if ("alias" === h.toLowerCase()) {
                                d = c[h];
                                break
                            }
                    }
                    l("alias", d), o.alias && a(o.alias, o, r);
                    for (u in r) {
                        if (c) {
                            d = i;
                            for (h in c)
                                if (h.toLowerCase() === u.toLowerCase()) {
                                    d = c[h];
                                    break
                                }
                        }
                        l(u, d)
                    }
                    return t.extend(!0, r, o), r
                }
                var c = this;
                return "string" == typeof l && (l = n.getElementById(l) || n.querySelectorAll(l)), l = l.nodeName ? [l] : l, t.each(l, function(e, n) {
                    var a = t.extend(!0, {}, c.opts);
                    u(n, a, t.extend(!0, {}, c.userOptions), c.dataAttribute);
                    var l = o(a, c.noMasksCache);
                    l !== i && (n.inputmask !== i && n.inputmask.remove(), n.inputmask = new r(i, i, !0), n.inputmask.opts = a, n.inputmask.noMasksCache = c.noMasksCache, n.inputmask.userOptions = t.extend(!0, {}, c.userOptions), n.inputmask.isRTL = a.isRTL, n.inputmask.el = n, n.inputmask.maskset = l, t.data(n, "_inputmask_opts", a), s.call(n.inputmask, {
                        action: "mask"
                    }))
                }), l && l[0] ? l[0].inputmask || this : this
            },
            option: function(e, n) {
                return "string" == typeof e ? this.opts[e] : "object" == typeof e ? (t.extend(this.userOptions, e), this.el && !0 !== n && this.mask(this.el), this) : void 0
            },
            unmaskedvalue: function(t) {
                return this.maskset = this.maskset || o(this.opts, this.noMasksCache), s.call(this, {
                    action: "unmaskedvalue",
                    value: t
                })
            },
            remove: function() {
                return s.call(this, {
                    action: "remove"
                })
            },
            getemptymask: function() {
                return this.maskset = this.maskset || o(this.opts, this.noMasksCache), s.call(this, {
                    action: "getemptymask"
                })
            },
            hasMaskedValue: function() {
                return !this.opts.autoUnmask
            },
            isComplete: function() {
                return this.maskset = this.maskset || o(this.opts, this.noMasksCache), s.call(this, {
                    action: "isComplete"
                })
            },
            getmetadata: function() {
                return this.maskset = this.maskset || o(this.opts, this.noMasksCache), s.call(this, {
                    action: "getmetadata"
                })
            },
            isValid: function(t) {
                return this.maskset = this.maskset || o(this.opts, this.noMasksCache), s.call(this, {
                    action: "isValid",
                    value: t
                })
            },
            format: function(t, e) {
                return this.maskset = this.maskset || o(this.opts, this.noMasksCache), s.call(this, {
                    action: "format",
                    value: t,
                    metadata: e
                })
            },
            analyseMask: function(e, n, a) {
                function o(t, e, n, i) {
                    this.matches = [], this.openGroup = t || !1, this.alternatorGroup = !1, this.isGroup = t || !1, this.isOptional = e || !1, this.isQuantifier = n || !1, this.isAlternator = i || !1, this.quantifier = {
                        min: 1,
                        max: 1
                    }
                }

                function s(e, o, s) {
                    s = s !== i ? s : e.matches.length;
                    var l = e.matches[s - 1];
                    if (n) 0 === o.indexOf("[") || k ? e.matches.splice(s++, 0, {
                        fn: new RegExp(o, a.casing ? "i" : ""),
                        cardinality: 1,
                        optionality: e.isOptional,
                        newBlockMarker: l === i || l.def !== o,
                        casing: null,
                        def: o,
                        placeholder: i,
                        nativeDef: o
                    }) : t.each(o.split(""), function(t, n) {
                        l = e.matches[s - 1], e.matches.splice(s++, 0, {
                            fn: null,
                            cardinality: 0,
                            optionality: e.isOptional,
                            newBlockMarker: l === i || l.def !== n && null !== l.fn,
                            casing: null,
                            def: a.staticDefinitionSymbol || n,
                            placeholder: a.staticDefinitionSymbol !== i ? n : i,
                            nativeDef: n
                        })
                    }), k = !1;
                    else {
                        var u = (a.definitions ? a.definitions[o] : i) || r.prototype.definitions[o];
                        if (u && !k) {
                            for (var c = u.prevalidators, d = c ? c.length : 0, h = 1; h < u.cardinality; h++) {
                                var f = d >= h ? c[h - 1] : [],
                                    p = f.validators,
                                    m = f.cardinality;
                                e.matches.splice(s++, 0, {
                                    fn: p ? "string" == typeof p ? new RegExp(p, a.casing ? "i" : "") : new function() {
                                        this.test = p
                                    } : new RegExp("."),
                                    cardinality: m || 1,
                                    optionality: e.isOptional,
                                    newBlockMarker: l === i || l.def !== (u.definitionSymbol || o),
                                    casing: u.casing,
                                    def: u.definitionSymbol || o,
                                    placeholder: u.placeholder,
                                    nativeDef: o
                                }), l = e.matches[s - 1]
                            }
                            e.matches.splice(s++, 0, {
                                fn: u.validators ? "string" == typeof u.validators ? new RegExp(u.validators, a.casing ? "i" : "") : new function() {
                                    this.test = u.validators
                                } : new RegExp("."),
                                cardinality: u.cardinality,
                                optionality: e.isOptional,
                                newBlockMarker: l === i || l.def !== (u.definitionSymbol || o),
                                casing: u.casing,
                                def: u.definitionSymbol || o,
                                placeholder: u.placeholder,
                                nativeDef: o
                            })
                        } else e.matches.splice(s++, 0, {
                            fn: null,
                            cardinality: 0,
                            optionality: e.isOptional,
                            newBlockMarker: l === i || l.def !== o && null !== l.fn,
                            casing: null,
                            def: a.staticDefinitionSymbol || o,
                            placeholder: a.staticDefinitionSymbol !== i ? o : i,
                            nativeDef: o
                        }), k = !1
                    }
                }

                function l(e) {
                    e && e.matches && t.each(e.matches, function(t, r) {
                        var o = e.matches[t + 1];
                        (o === i || o.matches === i || !1 === o.isQuantifier) && r && r.isGroup && (r.isGroup = !1, n || (s(r, a.groupmarker.start, 0), !0 !== r.openGroup && s(r, a.groupmarker.end))), l(r)
                    })
                }

                function u() {
                    if (x.length > 0) {
                        if (p = x[x.length - 1], s(p, h), p.isAlternator) {
                            m = x.pop();
                            for (var t = 0; t < m.matches.length; t++) m.matches[t].isGroup = !1;
                            x.length > 0 ? (p = x[x.length - 1], p.matches.push(m)) : w.matches.push(m)
                        }
                    } else s(w, h)
                }

                function c(t) {
                    t.matches = t.matches.reverse();
                    for (var e in t.matches)
                        if (t.matches.hasOwnProperty(e)) {
                            var n = parseInt(e);
                            if (t.matches[e].isQuantifier && t.matches[n + 1] && t.matches[n + 1].isGroup) {
                                var r = t.matches[e];
                                t.matches.splice(e, 1), t.matches.splice(n + 1, 0, r)
                            }
                            t.matches[e].matches !== i ? t.matches[e] = c(t.matches[e]) : t.matches[e] = function(t) {
                                return t === a.optionalmarker.start ? t = a.optionalmarker.end : t === a.optionalmarker.end ? t = a.optionalmarker.start : t === a.groupmarker.start ? t = a.groupmarker.end : t === a.groupmarker.end && (t = a.groupmarker.start), t
                            }(t.matches[e])
                        }
                    return t
                }
                var d, h, f, p, m, g, v, y = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                    b = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                    k = !1,
                    w = new o,
                    x = [],
                    _ = [];
                for (n && (a.optionalmarker.start = i, a.optionalmarker.end = i); d = n ? b.exec(e) : y.exec(e);) {
                    if (h = d[0], n) switch (h.charAt(0)) {
                        case "?":
                            h = "{0,1}";
                            break;
                        case "+":
                        case "*":
                            h = "{" + h + "}"
                    }
                    if (k) u();
                    else switch (h.charAt(0)) {
                        case a.escapeChar:
                            k = !0, n && u();
                            break;
                        case a.optionalmarker.end:
                        case a.groupmarker.end:
                            if (f = x.pop(), f.openGroup = !1, f !== i)
                                if (x.length > 0) {
                                    if (p = x[x.length - 1], p.matches.push(f), p.isAlternator) {
                                        m = x.pop();
                                        for (var C = 0; C < m.matches.length; C++) m.matches[C].isGroup = !1, m.matches[C].alternatorGroup = !1;
                                        x.length > 0 ? (p = x[x.length - 1], p.matches.push(m)) : w.matches.push(m)
                                    }
                                } else w.matches.push(f);
                            else u();
                            break;
                        case a.optionalmarker.start:
                            x.push(new o(!1, !0));
                            break;
                        case a.groupmarker.start:
                            x.push(new o(!0));
                            break;
                        case a.quantifiermarker.start:
                            var S = new o(!1, !1, !0);
                            h = h.replace(/[{}]/g, "");
                            var D = h.split(","),
                                T = isNaN(D[0]) ? D[0] : parseInt(D[0]),
                                F = 1 === D.length ? T : isNaN(D[1]) ? D[1] : parseInt(D[1]);
                            if ("*" !== F && "+" !== F || (T = "*" === F ? 0 : 1), S.quantifier = {
                                    min: T,
                                    max: F
                                }, x.length > 0) {
                                var M = x[x.length - 1].matches;
                                d = M.pop(), d.isGroup || (v = new o(!0), v.matches.push(d), d = v), M.push(d), M.push(S)
                            } else d = w.matches.pop(), d.isGroup || (v = new o(!0), v.matches.push(d), d = v), w.matches.push(d), w.matches.push(S);
                            break;
                        case a.alternatormarker:
                            if (x.length > 0) {
                                p = x[x.length - 1];
                                var E = p.matches[p.matches.length - 1];
                                g = p.openGroup && (E.matches === i || !1 === E.isGroup && !1 === E.isAlternator) ? x.pop() : p.matches.pop()
                            } else g = w.matches.pop();
                            if (g.isAlternator) x.push(g);
                            else if (g.alternatorGroup ? (m = x.pop(), g.alternatorGroup = !1) : m = new o(!1, !1, !1, !0), m.matches.push(g), x.push(m), g.openGroup) {
                                g.openGroup = !1;
                                var P = new o(!0);
                                P.alternatorGroup = !0, x.push(P)
                            }
                            break;
                        default:
                            u()
                    }
                }
                for (; x.length > 0;) f = x.pop(), w.matches.push(f);
                return w.matches.length > 0 && (l(w), _.push(w)), (a.numericInput || a.isRTL) && c(_[0]), _
            }
        }, r.extendDefaults = function(e) {
            t.extend(!0, r.prototype.defaults, e)
        }, r.extendDefinitions = function(e) {
            t.extend(!0, r.prototype.definitions, e)
        }, r.extendAliases = function(e) {
            t.extend(!0, r.prototype.aliases, e)
        }, r.format = function(t, e, n) {
            return r(e).format(t, n)
        }, r.unmask = function(t, e) {
            return r(e).unmaskedvalue(t)
        }, r.isValid = function(t, e) {
            return r(e).isValid(t)
        }, r.remove = function(e) {
            t.each(e, function(t, e) {
                e.inputmask && e.inputmask.remove()
            })
        }, r.escapeRegex = function(t) {
            var e = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"];
            return t.replace(new RegExp("(\\" + e.join("|\\") + ")", "gim"), "\\$1")
        }, r.keyCode = {
            ALT: 18,
            BACKSPACE: 8,
            BACKSPACE_SAFARI: 127,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91,
            X: 88
        }, r
    }),
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery", "./inputmask"], t) : "object" == typeof exports ? module.exports = t(require("jquery"), require("./inputmask")) : t(jQuery, window.Inputmask)
    }(function(t, e) {
        return void 0 === t.fn.inputmask && (t.fn.inputmask = function(n, i) {
            var r, a = this[0];
            if (void 0 === i && (i = {}), "string" == typeof n) switch (n) {
                case "unmaskedvalue":
                    return a && a.inputmask ? a.inputmask.unmaskedvalue() : t(a).val();
                case "remove":
                    return this.each(function() {
                        this.inputmask && this.inputmask.remove()
                    });
                case "getemptymask":
                    return a && a.inputmask ? a.inputmask.getemptymask() : "";
                case "hasMaskedValue":
                    return !(!a || !a.inputmask) && a.inputmask.hasMaskedValue();
                case "isComplete":
                    return !a || !a.inputmask || a.inputmask.isComplete();
                case "getmetadata":
                    return a && a.inputmask ? a.inputmask.getmetadata() : void 0;
                case "setvalue":
                    t(a).val(i),
                        a && void 0 === a.inputmask && t(a).triggerHandler("setvalue");
                    break;
                case "option":
                    if ("string" != typeof i) return this.each(function() {
                        if (void 0 !== this.inputmask) return this.inputmask.option(i)
                    });
                    if (a && void 0 !== a.inputmask) return a.inputmask.option(i);
                    break;
                default:
                    return i.alias = n, r = new e(i), this.each(function() {
                        r.mask(this)
                    })
            } else {
                if ("object" == typeof n) return r = new e(n), void 0 === n.mask && void 0 === n.alias ? this.each(function() {
                    if (void 0 !== this.inputmask) return this.inputmask.option(n);
                    r.mask(this)
                }) : this.each(function() {
                    r.mask(this)
                });
                if (void 0 === n) return this.each(function() {
                    r = new e(i), r.mask(this)
                })
            }
        }), t.fn.inputmask
    });
var Kontur = Kontur || {};
$(function() {
    function t(t) {
        var e = $("[data-gallery = " + t + "]"),
            n = 0;
        e.each(function() {
            $(this).attr("data-title-id", n), n++
        }).click(function() {
            var t = $(this);
            return $.gallery.open(e, {
                index: t.data("title-id")
            }), !1
        })
    }
    var e = [];
    $("[data-gallery]").each(function() {
        var n = $(this),
            i = n.data("gallery");
        n.attr("title") || n.attr("title", ""), n.attr("rel", i), $.inArray(i, e) < 0 && (t(i), e.push(i))
    })
}), $(function() {
    $(document).on("click", "[data-free30days-button]", function() {
        var t = $(".lightboxFreeDay");
        return 0 !== t.length && (t.unbind().removeData().lightbox({
            bottomPanelVisibility: !1
        }), !1)
    })
}), Kontur.PlaceLightboxOverBtn = function(t) {
    "use strict";
    var e, n, i, r, a, o, s, l, u, c, d, h, f, p, m, g = {
            widget: "[data-free30days]",
            lightboxOpenLink: "[data-free30days-link]",
            btnInWidget: "[data-free30days-btn]"
        },
        v = function() {};
    return h = function() {
        e.on("click", n, function(e) {
            o = t(e.target), c = t(window).scrollTop(), l = t(this).find(i).offset().top, o.is(n) && (setTimeout(f, 100), e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        })
    }, f = function(e) {
        var n = t(".lightboxFreeDay");
        if (0 === n.length) return !1;
        n.unbind().removeData().lightbox({
            bottomPanelVisibility: !1,
            open: function() {
                s = this, s.css("margin-left", -m()), u = s.find(".btn-lg").offset().top + c, 0 != (d = l > u ? c + (l - u) : c - (u - l)) && p(d)
            },
            close: function() {
                setTimeout(function() {
                    a.scrollTop(d)
                }, 0)
            }
        })
    }, m = function() {
        var e = t("<div>").css({
                visibility: "hidden",
                width: 100,
                overflow: "scroll"
            }).appendTo("body"),
            n = t("<div>").css({
                width: "100%"
            }).appendTo(e).outerWidth();
        return e.remove(), 100 - n
    }, p = function() {
        r.animate({
            scrollTop: d
        }, {
            queue: !0,
            duration: 1500
        })
    }, v.init = function(o) {
        o = t.extend(g, o), e = t(o.widget), n = t(o.lightboxOpenLink), i = t(o.btnInWidget), r = t("#pageWrapper"), a = t("html, body"), h()
    }, v
}(jQuery), $(function() {
    Kontur.PlaceLightboxOverBtn.init({
        widget: "[data-free30days]"
    })
}), Kontur.Module("Kontur.Form.submitsOnEnter", function(t) {
    function e() {
        t("form").each(function(e, n) {
            var i = t(n);
            i.find('input[type="submits"]').length > 0 || i.find("input").keypress(function(e) {
                10 != e.which && 13 != e.which || t(this).closest("form").submits()
            })
        })
    }
    t(e)
}, [jQuery]), Kontur.Module("Kontur.Landing", function(t, e) {
    function n() {
        var n = t("[data-loadmore-container]"),
            i = n.find("[data-loadmore-item]").slice(1);
        e.init(".js-text-collapse"), i.length && (i.hide(), n.append('<div class="m-t-sm text-center"><a href="#" class="loadmore">Показать больше</a></div>').on("click", ".loadmore", function(e) {
            e.preventDefault(), t(e.delegateTarget).find("[data-loadmore-item]").removeClass("hide").show(), t(e.target).hide()
        }))
    }
    t(function() {
        n()
    })
}, [jQuery, Kontur.CollapseText]);
//# sourceMappingURL=maps/landing.js.map
;