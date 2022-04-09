module.exports = {
    formatTime: function(t) {
        if ("number" != typeof t || t < 0) return t;
        var e = parseInt(t / 3600);
        return t %= 3600, [ e, parseInt(t / 60), t %= 60 ].map(function(t) {
            return (t = t.toString())[1] ? t : "0" + t;
        }).join(":");
    },
    formatDate: function(t) {
        return t.getYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
    },
    getLocalTime: function(t) {
        return new Date(1e3 * parseInt(t)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    },
    getDate: function() {
        var t = new Date(), e = t.getFullYear(), n = t.getMonth();
        n = n < 10 ? "0" + n : n;
        var r = t.getDay();
        return r = r < 10 ? "0" + r : r, [ e, n, r ].join("-");
    },
    getTime: function() {
        var t = new Date(), e = t.getHours();
        e = e < 10 ? "0" + e : e;
        var n = t.getMinutes();
        n = n < 10 ? "0" + n : n;
        var r = t.getSeconds();
        return r = r < 10 ? "0" + r : r, [ e, n, r ].join(":");
    },
    isBlank: function(t) {
        return !t || /^\s*$/.test(t);
    },
    isPhoneNum: function(t) {
        return /^1[0-9]{10}$/.test(t);
    },
    isExist: function(t) {
        return void 0 !== t && t;
    },
    formatDate_imprecise: function(t) {
        var e = new Date(1e3 * parseInt(t));
        return e.getFullYear() + "-" + (e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "-" + (e.getDate() < 10 ? "0" + e.getDate() : e.getDate());
    },
    getHour: function(t) {
        var e = new Date(1e3 * parseInt(t));
        return (e.getHours() < 10 ? "0" + e.getHours() : e.getHours()) + ":" + (e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes()) + ":" + (e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds());
    },
    isEmpty: function(t) {
        for (var e in t) return !1;
        return !0;
    },
    getTime_noSecond: function(t) {
        var e = new Date(1e3 * parseInt(t));
        return (e.getHours() < 10 ? "0" + e.getHours() : e.getHours()) + ":" + (e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes());
    },
    buttonClicked: function(t) {
        t.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            t.setData({
                buttonClicked: !1
            });
        }, 500);
    }
};