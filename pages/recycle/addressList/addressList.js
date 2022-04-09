require("../../../comm/script/config");

var e = require("../../../comm/script/fetch"), t = (require("../../../util/util"), 
getApp());

Page({
    data: {
        pageLoading: !0,
        origin: "",
        delIndex: -1,
        items: []
    },
    onLoad: function(e) {
        console.log("onLoad");
        console.log(2222);
        var t = wx.getStorageSync("origin");
        console.log(t), this.setData({
            origin: t
        });
    },
    onShow: function() {
        var o = this;
        wx.showLoading({
            title: "地址信息加载中",
            mask: !0
        });
        var a = t.globalData.hwxUserInfo.token;
        console.log(a), e.getAddressList.call(o, a, function(e) {
            console.log(e), o.setData({
                items: e,
                pageLoading: !1
            }), wx.hideLoading();
        }, function(e) {
            o.setData({
                pageLoading: !1
            }), console.log("err6666"), console.log(e), wx.showToast({
                title: e,
                icon: "none",
                duration: 1e3
            });
        });
    },
    touchStart: function(e) {
        this.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
            delIndex: -1
        });
    },
    touchMove: function(e) {
        var t = this, o = e.currentTarget.dataset.index, a = t.data.delIndex, n = t.data.startX, s = t.data.startY, d = e.changedTouches[0].clientX, r = e.changedTouches[0].clientY, i = t.angle({
            X: n,
            Y: s
        }, {
            X: d,
            Y: r
        });
        Math.abs(i) > 30 || (a = d > n ? -1 : o, t.setData({
            delIndex: a
        }));
    },
    angle: function(e, t) {
        var o = t.X - e.X, a = t.Y - e.Y;
        return 360 * Math.atan(a / o) / (2 * Math.PI);
    },
    del: function(e) {
        var t = this;
        wx.showModal({
            title: "温馨提示",
            content: "确定要删除该地址吗？",
            confirmColor: "#FF7A00",
            success: function(o) {
                o.confirm ? (console.log("用户点击确定"), t.getDelateAddress(e)) : o.cancel && console.log("用户点击取消");
            }
        });
    },
    getDelateAddress: function(o) {
        var a = this, n = t.globalData.hwxUserInfo.token;
        wx.showLoading({
            title: "删除中"
        }), e.getDelateAddress(n, o.currentTarget.dataset.id, function(e) {
            a.data.items.splice(o.currentTarget.dataset.index, 1), a.setData({
                items: a.data.items
            }), wx.hideLoading();
        }, function(e) {
            wx.hideLoading(), wx.showToast({
                title: e,
                icon: "none",
                duration: 1e3
            });
        });
    },
    addNewAddress: function(e) {
        wx.redirectTo({
            url: "../addAddress/addAddress?origin=addressList"
        });
    },
    editAddress: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.info;
        wx.redirectTo({
            url: "../../personal/addAddress/addAddress?info=" + JSON.stringify(t)
        });
    },
    chooseAddress: function(e) {
        console.log(e.currentTarget.dataset.address);
        var t = e.currentTarget.dataset.address;
        wx.setStorageSync("recycleAddress", t), wx.redirectTo({
            url: "../commitorder/commitorder"
        });
    }
});