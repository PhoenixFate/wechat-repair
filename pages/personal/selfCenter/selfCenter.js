require("../../../util/util");

var o = require("../../../comm/script/fetch"), e = (require("../../../comm/script/config"), 
getApp());

Page({
    data: {
        message: {},
        hwxUserInfo: {},
        isLogin: !1,
        holderName: "点击登录",
        coupons_count: 0,
        orders_count: 0
    },
    onLoad: function() {},
    onShow: function() {
        this.setData({
            coupons_count: 0,
            orders_count: 0
        }), this.checkLogin();
    },
    checkLogin: function() {
        var n = this, t = e.globalData.hwxUserInfo.phone, i = e.globalData.hwxUserInfo.token;
        t && i && o.getIsLogin(i, function(o) {
            "1" == o.is_login ? (n.setData({
                isLogin: !0,
                holderName: t
            }), n.getUserDataList(i), n.getMyCoupon(i)) : n.setData({
                isLogin: !1,
                holderName: "请登录"
            });
        }, function(o) {
            console.log("err6666"), console.log(o), n.setData({
                isLogin: !1,
                holderName: "点击登录"
            });
        });
    },
    goToLogin: function() {
        this.data.isLogin || wx.navigateTo({
            url: "../chooseLogin/chooseLogin"
        });
    },
    getUserDataList: function(e) {
        var n = this;
        o.getUserDataList.call(n, e, function(o) {
            console.log(o), n.setData({
                orders_count: o.orders_count
            }), wx.hideLoading();
        }, function(o) {
            wx.hideLoading(), console.log(o);
        });
    },
    getMyCoupon: function(e) {
        var n = this;
        o.getMyCoupon.call(n, e, 1, function(o) {
            console.log(o), n.setData({
                coupons_count: o.length
            }), wx.hideLoading();
        }, function(o) {
            wx.hideLoading(), console.log(o);
        });
    },
    myOrder: function(o) {
        this.data.isLogin ? wx.navigateTo({
            url: "../myOrderList/myOrderList"
        }) : wx.showToast({
            title: "请先登录",
            icon: "none"
        });
    },
    myCoupon: function(o) {
        this.data.isLogin ? wx.navigateTo({
            url: "../myCouponListWeb/myCouponListWeb?token=" + e.globalData.hwxUserInfo.token
        }) : wx.showToast({
            title: "请先登录",
            icon: "none"
        });
    },
    myFeedback: function(o) {
        this.data.isLogin ? wx.navigateTo({
            url: "../myFeedBackWeb/myFeedBackWeb?token=" + e.globalData.hwxUserInfo.token
        }) : wx.showToast({
            title: "请先登录",
            icon: "none"
        });
    },
    myHelpCenter: function(o) {
        wx.navigateTo({
            url: "../../repair/serviceFlowWeb/serviceFlowWeb"
        });
    },
    aboutUs: function(o) {
        wx.navigateTo({
            url: "../../repair/aboutusWeb/aboutusWeb"
        });
    },
    callPhone: function(o) {
        wx.makePhoneCall({
            phoneNumber: "4000171010"
        });
    },
    goToStoreAddress: function() {
        wx.navigateTo({
            url: "../../storeAddress/storeAddress"
        });
    },
    stopTouchMove: function() {},
    stopTap: function() {}
});