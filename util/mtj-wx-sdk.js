!function(e) {
    var t, n, r, o = {
        logServerUrl: "https://hmma.baidu.com/mini.gif",
        circleServerUrl: "https://hmma.baidu.com/mini.gif?circle=1",
        maxRequestRetryCount: 5,
        requestRetryFirstDelay: 1e3,
        requestRetryMultiple: 4,
        maxRequestDataLength: 204800,
        maxUserPropertyCount: 100,
        maxUserPropertyKeyValueLength: 256,
        maxUint8: 255,
        maxUint32: 4294967295,
        enabledEvents: {
            app: [ "onShow", "onHide", "onError" ],
            page: [ "onShow", "onHide" ],
            share: [ "onShareAppMessage" ],
            behavior: [ "tap" ]
        },
        storageKeys: {
            uuid: "mtj_uuid",
            userInfo: "mtj_user",
            userProperty: "mtj_user_property",
            shareCount: "mtj_scnt"
        }
    }, a = {
        type: 1
    }, i = {
        aso: {}
    }, c = {}, s = function() {
        return "undefined" != typeof crypto && crypto.getRandomValues ? crypto.getRandomValues(new Uint32Array(1))[0] : Math.floor(Math.random() * o.maxUint32);
    }, u = function(e, t) {
        return "[object " + t + "]" === {}.toString.call(e);
    }, f = function e(t) {
        return (u(t, "Object") || u(t, "Array")) && Object.keys(t).forEach(function(n) {
            var r = t[n];
            u(r, "Object") || u(r, "Array") ? t[n] = e(r) : t[n] = "" + r;
        }), t;
    }, l = function(e) {
        return u(e, "String") && /^\d{11}$/.test(e);
    }, g = function(e) {
        return u(e, "String") && 28 === e.length;
    }, p = 0, h = function(e) {
        return new Promise(function(n, r) {
            if (e.data = e.data || {}, e.data.v = "1.9.1", e.data.rqc = ++p, a = e.data, !(JSON.stringify(a).length <= o.maxRequestDataLength)) return p--, 
            r(new Error("invalid data"));
            var a;
            e.success = function(e) {
                return n(e);
            }, e.fail = function(e) {
                return r(e);
            }, function e(n) {
                var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : o.requestRetryFirstDelay;
                return t.request({
                    url: n.url,
                    data: n.data,
                    header: Object.assign({
                        "content-type": "application/json"
                    }, n.header),
                    method: n.method || "POST",
                    dataType: n.dataType || "json",
                    success: function(e) {
                        delete n.data.rtc, n.success && n.success(e);
                    },
                    fail: function(t) {
                        n.data.rtc = (n.data.rtc || 0) + 1, n.data.rtc <= o.maxRequestRetryCount ? setTimeout(function() {
                            return e(n, r * o.requestRetryMultiple);
                        }, r) : (delete n.data.rtc, n.fail && n.fail(t));
                    }
                });
            }(e);
        });
    }, d = function(e, t) {
        var n = u(t, "Object") ? JSON.stringify(t) : "" + t;
        h({
            url: o.logServerUrl,
            dataType: "string",
            data: Object.assign({}, a, {
                et: "error",
                en: e,
                ep: {
                    ex: n
                },
                rid: s()
            })
        });
    }, y = function(e) {
        e.rid = s(), e.aso = e.aso || {};
        var t = {
            url: o.logServerUrl,
            dataType: "string",
            data: Object.assign({}, a, e)
        };
        h(t), (c.circleToken || c.circleByThreeFingers) && ("page" === e.et && "show" === e.en || "behavior" === e.et && "tap" === e.en) && (t.url = o.circleServerUrl, 
        t.data.token = c.circleToken, h(t).catch(function(e) {
            return console.error(e);
        }));
    }, m = function(e) {
        try {
            return t.getStorageSync(e);
        } catch (e) {
            d("getStorageSync", e);
        }
    }, v = function(e, n) {
        try {
            t.setStorageSync(e, n);
        } catch (e) {
            d("setStorageSync", e);
        }
    }, b = function() {
        return Promise.resolve().then(function() {
            var e = m(o.storageKeys.uuid);
            return u(e, "String") && 32 === e.length || (e = ([ 1e7 ] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, function(e) {
                return (e ^ ("undefined" != typeof crypto && crypto.getRandomValues ? crypto.getRandomValues(new Uint8Array(1))[0] : Math.floor(Math.random() * o.maxUint8)) & 15 >> e / 4).toString(16);
            }), v(o.storageKeys.uuid, e)), e;
        });
    }, j = function() {
        return n || (a.sid = s(), a.rqc = 0, n = Promise.all([ b(), new Promise(function(e) {
            t.getSystemInfo({
                success: function(t) {
                    delete t.errMsg, e(t);
                },
                fail: function() {
                    e({});
                }
            });
        }), new Promise(function(e) {
            t.getNetworkType({
                success: function(t) {
                    delete t.errMsg, e(t);
                },
                fail: function() {
                    e({});
                }
            });
        }), Promise.resolve().then(function() {
            var e = m(o.storageKeys.userInfo), n = u(e, "Object") ? e : {};
            return new Promise(function(e) {
                t.getSetting({
                    success: function(r) {
                        r.authSetting && r.authSetting["scope.userInfo"] ? t.getUserInfo({
                            success: function(t) {
                                delete t.userInfo.errMsg, e(Object.assign(n, t.userInfo));
                            },
                            fail: function() {
                                e(n);
                            }
                        }) : e(n);
                    },
                    fail: function() {
                        e(n);
                    }
                });
            });
        }), new Promise(function(e) {
            if (!o.getLocation) return e({});
            t.getLocation({
                type: "wgs84",
                success: function(t) {
                    delete t.errMsg, e(t);
                },
                fail: function() {
                    e({});
                }
            });
        }), Promise.resolve().then(function() {
            var e = m(o.storageKeys.userProperty);
            return u(e, "Object") ? e : {};
        }) ]).then(function(e) {
            a.uuid = e[0], i.system = f(e[1]), i.network = f(e[2]), 0 < Object.keys(e[3]).length && (i.user = f(e[3])), 
            0 < Object.keys(e[4]).length && (i.location = f(e[4])), 0 < Object.keys(e[5]).length && (i.userProperty = JSON.stringify(e[5])), 
            i.system.platform;
        }));
    }, S = function() {
        return r || (r = new Promise(function(e) {
            t.getClipboardData({
                success: function(t) {
                    e(t.data);
                },
                fail: function() {
                    e();
                }
            });
        }).then(function(e) {
            if (!o.disableCircling && 36 === e.length) {
                var n, r = e.match(/^mtj_(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})$/);
                return r ? (c.circleToken = "".concat(r[1], "-").concat(r[2], "-").concat(r[3], "-").concat(r[4], "-").concat(r[5]), 
                n = "", new Promise(function(e) {
                    t.setClipboardData({
                        data: n,
                        complete: function() {
                            e();
                        }
                    });
                })) : void 0;
            }
        }));
    }, O = {
        onLaunch: function() {
            y({
                et: "app",
                en: "launch"
            });
        },
        onShow: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            return i.aso.scene = "" + (e.scene || ""), e.referrerInfo && e.referrerInfo.appId ? i.aso.referrerInfo = e.referrerInfo : delete i.aso.referrerInfo, 
            i.aso.path = e.path || "", i.aso.query = Object.keys(e.query || {}).map(function(t) {
                return {
                    key: t,
                    value: e.query[t]
                };
            }), j().then(function() {
                return n = e.shareTicket, new Promise(function(e) {
                    if (!n) return e();
                    t.getShareInfo({
                        shareTicket: n,
                        success: function(t) {
                            delete t.errMsg, e(t);
                        },
                        fail: function() {
                            e({});
                        }
                    });
                });
                var n;
            }).then(function(e) {
                e ? i.aso.shareInfo = e : delete i.aso.shareInfo, y(Object.assign({
                    et: "app",
                    en: "show"
                }, i));
            }).catch(function(e) {
                d("app.onShow", e);
            });
        },
        onHide: function() {
            r = null, y({
                et: "app",
                en: "hide"
            });
        },
        onError: function(e) {
            var t = u(e, "Object") ? JSON.stringify(f(e)) : "" + e;
            y({
                et: "app",
                en: "error",
                ep: {
                    ex: t
                }
            });
        }
    }, P = -1, k = -1, w = 0, I = {
        onShow: function() {
            var e = getCurrentPages(), t = e[e.length - 1];
            return a.path = t.route, a.query = Object.keys(t.options).map(function(e) {
                return {
                    key: e,
                    value: t.options[e]
                };
            }).filter(function(e) {
                return "mtj_qrid" !== e.key && "mtj_lkid" !== e.key && "mtj_shuuid" !== e.key;
            }), S().then(j).then(function() {
                y(Object.assign({
                    et: "page",
                    en: "show"
                }, i));
            }).catch(function(e) {
                d("page.onShow", e);
            });
        },
        onHide: function() {
            y({
                et: "page",
                en: "hide",
                ep: void 0
            });
        },
        onShareAppMessage: function(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = m(o.storageKeys.shareCount);
            n = (Number.isInteger(n) ? n : 0) + 1, v(o.storageKeys.shareCount, n);
            var r = {
                cnt: n,
                from: e.from,
                path: t.path
            };
            if (!r.path) {
                var c = a.query.map(function(e) {
                    return e.key + "=" + e.value;
                }).join("&");
                r.path = a.path + (c ? "?" + c : "");
            }
            t.title && (r.title = "" + t.title), e.target && (r.target = JSON.stringify(e.target)), 
            y(Object.assign({
                et: "share",
                en: "action",
                ep: r
            }, i));
            var s = i.aso.query.filter(function(e) {
                return "mtj_shuuid" === e.key;
            }), u = s[0] ? s[0].value.split("_") : [];
            a.uuid !== u[u.length - 1] && u.push(a.uuid);
            var f, l, g, p, h = u.slice(Math.max(0, u.length - 3)).join("_");
            return t.path = (f = r.path, l = "mtj_shuuid", g = h, p = 0 < (f = f.replace(new RegExp(l + "=[^&]*", "g"), "").replace(/(\?|&)&/g, "$1").replace(/(\?|&)$/g, "")).indexOf("?") ? "&" : "?", 
            f + p + l + "=" + encodeURIComponent(g)), t;
        },
        onAction: function(e, t) {
            if (e && e.type && e.currentTarget) if ("tap" !== e.type) {
                if ("touchmove" === e.type && e.touches instanceof Array) {
                    if (-1 !== P) return;
                    if (3 === e.touches.length) {
                        if (w += 1, clearTimeout(k), 3 === w) return c.circleByThreeFingers = !0, c.circleToken = void 0, 
                        void y(Object.assign({
                            et: "page",
                            en: "show"
                        }, i));
                        P = setTimeout(function() {
                            P = -1, k = setTimeout(function() {
                                w = 0;
                            }, 500);
                        }, 1e3);
                    }
                }
            } else {
                var n = [ {
                    key: "xpath",
                    value: "#" + (e.currentTarget.id || t)
                } ];
                y(Object.assign({
                    et: "behavior",
                    en: "tap",
                    ep: {
                        data: n
                    }
                }, i));
            }
        }
    }, x = {
        trackEvent: function(e) {
            var t, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            if (!u(t = e, "String") || !/^[a-z][a-z0-9_]{0,31}$/.test(t)) return Promise.reject(new Error("事件名称不合法"));
            var r = Object.keys(n).filter(function(e) {
                return u(r = e, "String") && /^[a-z0-9_]{1,32}$/.test(r) && (t = n[e], u(t, "String") || u(t, "Number"));
                var t, r;
            }).map(function(e) {
                return {
                    key: "" + e,
                    value: "" + n[e],
                    type: u(n[e], "String") ? "string" : "number"
                };
            });
            return j().then(function() {
                y(Object.assign({
                    et: "event",
                    en: "" + e,
                    ep: {
                        data: r
                    }
                }, i));
            }).catch(function(e) {
                d("trackEvent", e);
            });
        },
        setUserInfo: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.tel, n = e.openId;
            return j().then(function() {
                var e = m(o.storageKeys.userInfo), r = u(e, "Object") ? e : {};
                l(t) && (r.tel = i.user.tel = t.substr(t.length - 11)), g(n) && (r.openId = i.user.openId = n), 
                (r.tel || r.openId) && v(o.storageKeys.userInfo, r), u(t, "Undefined") || l(t) || console.error("手机号 ".concat(t, " 不合法")), 
                u(n, "Undefined") || g(n) || console.error("openid ".concat(n, " 不合法"));
            }).catch(function(e) {
                d("setUserInfo", e);
            });
        },
        setUserId: function(e) {
            return Promise.resolve().then(function() {
                if (!(u(e, "String") || u(e, "Number") && Number.isFinite(e))) return Promise.reject(new Error("userId只能是字符串或数字"));
                var t = "" + e, n = m(o.storageKeys.userProperty), r = u(n, "Object") ? n : {};
                if (!r.uid_ || r.uid_[0] !== t) {
                    r.uid_ = [ t, "1" ], v(o.storageKeys.userProperty, r), i.userProperty = JSON.stringify(r);
                    var a = [ {
                        key: "uid",
                        value: t
                    } ];
                    return j().then(function() {
                        y(Object.assign({
                            et: "api",
                            en: "setUserId",
                            ep: {
                                data: a
                            }
                        }, i));
                    }).catch(function(e) {
                        d("setUserId", e);
                    });
                }
            });
        },
        setUserProperty: function(e) {
            return Promise.resolve().then(function() {
                var t = m(o.storageKeys.userProperty), n = u(t, "Object") ? t : {};
                if (u(e, "Null")) Object.keys(n).forEach(function(e) {
                    "_" !== e.charAt(0) && "_" !== e.charAt(e.length - 1) && delete n[e];
                }); else if (!u(e, "Object")) return Promise.reject(new Error("userProperty必须是对象"));
                var r = Object.keys(n).filter(function(e) {
                    return "_" !== e.charAt(0) && "_" !== e.charAt(e.length - 1);
                }).length;
                Object.keys(e || {}).forEach(function(t) {
                    var a = e[t];
                    "" !== t && "_" !== t.charAt(0) && "_" !== t.charAt(t.length - 1) && (u(a, "Null") ? n[t] && (delete n[t], 
                    r--) : !(u(a, "String") || u(a, "Number") && Number.isFinite(a)) || t.length > o.maxUserPropertyKeyValueLength || ("" + a).length > o.maxUserPropertyKeyValueLength || !n[t] && r >= o.maxUserPropertyCount || (n[t] || r++, 
                    n[t] = [ a, "1" ]));
                }), v(o.storageKeys.userProperty, n), i.userProperty = JSON.stringify(n);
            });
        }
    }, U = App, _ = Page, E = function(e, t, n) {
        var r = t[e];
        t[e] = function(t) {
            if (n.call(this, t, e), r) return r.apply(this, arguments);
        };
    }, T = function(e) {
        o.enabledEvents.app.forEach(function(t) {
            E(t, e, O[t]);
        }), e.mtj = x, U(e);
    }, q = function(e) {
        o.enabledEvents.page.forEach(function(t) {
            E(t, e, I[t]);
        }), o.enabledEvents.share.forEach(function(t) {
            var n, r, o, a;
            o = I[n = t], a = (r = e)[n], r[n] = function(e) {
                var t = a && a.apply(this, arguments);
                return o.call(this, e, t);
            };
        }), Object.keys(e).forEach(function(t) {
            "function" == typeof e[t] && -1 === o.enabledEvents.page.indexOf(t) && -1 === o.enabledEvents.share.indexOf(t) && E(t, e, I.onAction);
        }), _(e);
    }, K = function() {
        var e, n;
        e = wx, t = e;
        try {
            n = require("./mtj-wx-sdk.config");
        } catch (e) {
            return void console.error("请把mtj-wx-sdk.config.js文件拷贝到utils目录中");
        }
        n && n.appKey ? (a.key = n.appKey, o.getLocation = n.getLocation || !1, o.disableCircling = n.disableCircling || !1, 
        n.hasPlugin ? module.exports = {
            App: T,
            Page: q
        } : (App = T, Page = q)) : console.error("请设置mtj-wx-sdk.config.js文件中的appKey字段");
    };
    K(), e.init = K;
}({});