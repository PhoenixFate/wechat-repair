require("../../../comm/script/config");

var e = require("../../../comm/script/fetch"), t = (require("../../../util/util"), 
getApp());

Page({
    data: {
        pageLoading: !0,
        origin: "",
        createOrderTabIndex: "",
        delIndex: -1,
        items: []
    },
    onLoad: function(e) {
        console.log("onLoad");
        if (e.origin) this.setData({
            origin: e.origin
        }), console.log("内存升级跳转"), wx.setStorageSync("origin", e.origin); else {
            console.log(2222);
            var t = wx.getStorageSync("origin");
            console.log(t), this.setData({
                origin: t
            });
        }
        e.createOrderTabIndex && this.setData({
            createOrderTabIndex: e.createOrderTabIndex
        });
    },
    onShow: function() {
        var a = this;
        wx.showLoading({
            title: "地址信息加载中",
            mask: !0
        });
        var r = t.globalData.hwxUserInfo.token;
        console.log(r), e.getAddressList.call(a, r, function(e) {
            console.log(e), a.setData({
                items: e,
                pageLoading: !1
            }), wx.hideLoading();
        }, function(e) {
            a.setData({
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
        var t = this, a = e.currentTarget.dataset.index, r = t.data.delIndex, o = t.data.startX, n = t.data.startY, s = e.changedTouches[0].clientX, d = e.changedTouches[0].clientY, i = t.angle({
            X: o,
            Y: n
        }, {
            X: s,
            Y: d
        });
        Math.abs(i) > 30 || (r = s > o ? -1 : a, t.setData({
            delIndex: r
        }));
    },
    angle: function(e, t) {
        var a = t.X - e.X, r = t.Y - e.Y;
        return 360 * Math.atan(r / a) / (2 * Math.PI);
    },
    del: function(e) {
        var t = this;
        wx.showModal({
            title: "温馨提示",
            content: "确定要删除该地址吗？",
            confirmColor: "#FF7A00",
            success: function(a) {
                a.confirm ? (console.log("用户点击确定"), t.getDelateAddress(e)) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    getDelateAddress: function(a) {
        var r = this, o = t.globalData.hwxUserInfo.token;
        wx.showLoading({
            title: "删除中"
        }), e.getDelateAddress(o, a.currentTarget.dataset.id, function(e) {
            r.data.items.splice(a.currentTarget.dataset.index, 1), r.setData({
                items: r.data.items
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
            url: "../../personal/addAddress/addAddress?origin=addressList"
        });
    },
    editAddress: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.info;
        console.log(t), console.log("../../personal/addAddress/addAddress?info=" + JSON.stringify(t)), 
        wx.redirectTo({
            url: "../../personal/addAddress/addAddress?info=" + JSON.stringify(t) + "&origin=addressList"
        });
    },
    chooseAddress: function(e) {
        console.log(e.currentTarget.dataset.address);
        var t = e.currentTarget.dataset.address;
        wx.setStorageSync("address", t), "memory" == this.data.origin ? wx.redirectTo({
            url: "../../repair/memoryUp-createOrder/memoryUp-createOrder?origin=addressList"
        }) : wx.redirectTo({
            url: "../../repair/createOrder/createOrder?origin=addressList&createOrderTabIndex=" + this.data.createOrderTabIndex
        });
    }
});