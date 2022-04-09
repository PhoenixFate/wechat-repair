require("../../util/util");

var t = require("../../comm/script/fetch");

require("../../comm/script/config"), getApp();

Page({
    data: {
        storeAdd: [],
        TabCur: 0,
        MainCur: 0,
        VerticalNavTop: 0,
        isShow: !1
    },
    onLoad: function(e) {
        var a = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), t.getStoreList(function(t) {
            a.setData({
                isShow: !0,
                storeAdd: t
            }), wx.hideLoading();
        }, function(t) {});
    },
    provinceSelect: function(t) {
        console.log(t), this.setData({
            TabCur: t.currentTarget.dataset.id,
            MainCur: t.currentTarget.dataset.id,
            VerticalNavTop: 50 * (t.currentTarget.dataset.id - 1)
        });
    },
    VerticalMain: function(t) {
        console.log("121221"), console.log(t);
        for (var e = this, a = this.data.storeAdd, r = 0, o = 0; o < a.length; o++) !function(t) {
            wx.createSelectorQuery().select("#main-" + t).fields({
                size: !0
            }, function(e) {
                a[t].top = r, r += e.height, a[t].bottom = r;
            }).exec();
        }(o);
        for (var i = t.detail.scrollTop + 20, o = 0; o < a.length; o++) if (i > a[o].top && i < a[o].bottom) return e.setData({
            VerticalNavTop: 50 * (o - 1),
            TabCur: o
        }), !1;
    },
    intoMap: function(t) {
        var e = t.currentTarget.dataset;
        wx.openLocation({
            latitude: Number(e.lat),
            longitude: Number(e.lng),
            name: e.name,
            address: e.address,
            scale: 28
        });
    },
    callphone: function(t) {
        var e = t.currentTarget.dataset;
        wx.makePhoneCall({
            phoneNumber: e.phone
        });
    }
});