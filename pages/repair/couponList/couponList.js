var o = require("../../../comm/script/fetch"), t = (require("../../../comm/script/config"), 
require("../../../util/util"), getApp());

Page({
    data: {
        isFullSucreen: !!t.globalData.isFullSucreen,
        couponList: "",
        couponChoose: !1,
        couponIndex: "",
        inputCode: ""
    },
    onLoad: function(o) {
        var e = t.globalData.hwxUserInfo.token, n = JSON.parse(o.info);
        this.setData({
            info: n
        }), wx.showLoading({
            title: "加载中"
        }), this.getCouponUseable(e, n.rp_id, n.city);
    },
    getCouponUseable: function(t, e, n) {
        var a = this;
        o.getCouponUseable.call(a, t, e, n, function(o) {
            console.log(o), a.setData({
                couponList: o
            }), wx.hideLoading();
        }, function(o) {
            wx.hideLoading(), console.log(o);
        });
    },
    setCouponCode: function(o) {
        this.setData({
            inputCode: o.detail.value
        });
    },
    useBtn: function() {
        wx.showLoading({
            title: "加载中"
        }), this.couponUse(this.data.inputCode);
    },
    chooseCoupon: function(o) {
        console.log(o);
        var t = o.currentTarget.dataset;
        "1" == t.useable ? (this.setData({
            couponChoose: !0,
            couponIndex: t.index
        }), wx.showLoading({
            title: "正在使用"
        }), this.couponUse(t.couponcode)) : wx.showToast({
            title: "当前优惠券不可用",
            icon: "none",
            duration: 1500
        });
    },
    couponUse: function(e) {
        var n = {};
        n.coupon_code = e, n.city = this.data.info.city, n.district = this.data.info.district, 
        n.plan_id = this.data.info.rp_id, n.plan_id2 = this.data.info.rp_id2, n.is_warrantable = this.data.info.is_warrantable, 
        n.category = this.data.info.category, n.reserve_time = this.data.info.reserve_time, 
        n.reserve_time2 = this.data.info.reserve_time2;
        var a = this, i = t.globalData.hwxUserInfo.token;
        o.getUseCoupon.call(a, i, n, function(o) {
            console.log(o);
            var t = getCurrentPages();
            t[t.length - 2].setData({
                couponData: o,
                couponIsChoose: !0,
                coupon_code: o.coupon_code
            }), wx.navigateBack({
                delta: 1
            }), wx.hideLoading();
        }, function(o) {
            wx.hideLoading(), console.log(o), wx.showToast({
                title: o,
                icon: "none",
                duration: 2e3
            });
        });
    },
    noUseCoupon: function() {
        var o = getCurrentPages();
        o[o.length - 2].setData({
            couponData: "",
            couponIsChoose: !1,
            coupon_code: ""
        }), wx.navigateBack({
            delta: 1
        });
    },
    onShow: function() {}
});