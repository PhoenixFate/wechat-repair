var e = require("comm/script/config"), t = require("comm/script/fetch"), o = require("util/util");

require("./util/mtj-wx-sdk.js");

App({
    globalData: {
        wxUserInfo: null,
        wxDeviceInfo: null,
        hwxUserInfo: null,
        hwxDeviceInfo: null,
        timeDifference: "0",
        configLists: {},
        code: "",
        encryptedData: "",
        iv: "",
        openid: "",
        isFullSucreen: !1,
        platform: "IOS"
    },
    onLaunch: function(e) {
        this.initStorage(), console.log(e), this.getWxDeviceInfo(), 1044 == e.scene && (console.log(e.shareTicket), 
        wx.showToast({
            image: "https://pic.hiweixiu.com/images/miniprogram/tip.png",
            title: e.shareTicket
        })), this.checkFullSucreen(), wx.setStorageSync("createOrder", !0);
    },
    checkFullSucreen: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                console.log(t), t.screenHeight - t.windowHeight - t.statusBarHeight - 32 > 72 && (e.globalData.isFullSucreen = !0);
            }
        });
    },
    getWxDeviceInfo: function(e) {
        try {
            var t = wx.getSystemInfoSync();
            this.globalData.wxDeviceInfo = t, console.log("res+++"), console.log(t), this.globalData.winRate = t.windowWidth / 750, 
            "function" == typeof e && e(this.globalData.wxDeviceInfo), "devtools" == t.platform ? this.setData({
                platform: "pc"
            }) : "ios" == t.platform ? this.setData({
                platform: "IOS"
            }) : "android" == t.platform && this.setData({
                platform: "android"
            });
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    },
    setHwxUserInfo: function(t, o) {
        var i = {};
        i.token = t, i.phone = o, this.globalData.hwxUserInfo = i, wx.setStorage({
            key: e.storageKeys.currentUser,
            data: i
        });
    },
    setHiDeviceInfo: function(t) {
        this.globalData.hwxDeviceInfo = t, wx.setStorage({
            key: e.storageKeys.currentDevice,
            data: t
        });
    },
    setTimeDifference: function(t) {
        this.globalData.timeDifference = t, wx.setStorage({
            key: e.storageKeys.timeDifference,
            data: t
        });
    },
    initStorage: function() {
        var t = this;
        wx.getStorage({
            key: e.storageKeys.currentDevice,
            success: function(e) {
                t.globalData.hwxDeviceInfo = e.data;
            }
        });
        try {
            var i = wx.getStorageSync(e.storageKeys.currentUser);
            if (o.isExist(i)) t.globalData.hwxUserInfo = i; else {
                var n = {};
                n.token = "", n.phone = "", t.globalData.hwxUserInfo = n;
            }
        } catch (e) {
            console.log(JSON.stringify(e));
        }
        try {
            var a = wx.getStorageSync(e.storageKeys.timeDifference);
            o.isBlank(a) ? t.globalData.timeDifference = a : t.globalData.timeDifference = 0;
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    },
    checkIsLogin: function(o, i) {
        var n = wx.getStorageSync(e.storageKeys.currentUser).token;
        t.getIsLogin(n, function(e) {
            console.log(e), "1" == e.is_login ? o.setData({
                isLogin: !0
            }) : o.setData({
                isLogin: !1
            }), i && "1" != e.is_login && wx.navigateTo({
                url: "/pages/personal/chooseLogin/chooseLogin"
            });
        }, function(e) {
            console.log("err6666"), console.log(e), o.setData({
                isLogin: !1
            });
        });
    },
    handleModel: function(e, t) {
        var o = e.toUpperCase();
        if ("DEVTOOLS" == o) return t;
        if ("IPHONE" == o) {
            var i = t.indexOf("<"), n = (f = t.slice(0, i)).indexOf("("), a = f.indexOf("China");
            if (n > 0) {
                s = f.slice(0, n - 1);
                console.log(s);
            } else if (a > 0) {
                s = f.slice(0, a - 1);
                console.log("newkeyvalue"), console.log(s);
            } else var s = f;
            return s;
        }
        if ("HUAWEI" == o) {
            var r = t.toUpperCase(), c = r.lastIndexOf("-");
            return f = r.slice(c - 3, c);
        }
        if ("HONOR" == o) {
            var l = t.toUpperCase(), c = l.lastIndexOf("-");
            return f = l.slice(c - 3, c);
        }
        if ("SMARTISAN" == o) {
            var g = t.toUpperCase(), f = g.slice(g.length - 5, g.length);
            return f;
        }
        return t.toUpperCase();
    },
    getParams: function(e) {
        var t = "";
        for (var o in e) t += o + "=" + e[o] + "&";
        return "?" + t;
    }
});