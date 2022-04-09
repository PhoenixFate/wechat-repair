require("../../../util/util");

var e = require("../../../comm/script/fetch"), t = (require("../../../comm/script/config"), 
getApp());

Page({
    data: {
        isFullSucreen: t.globalData.isFullSucreen,
        selectedIndex: 0,
        bannerInfo: {},
        couponList: [],
        isLogin: !1,
        number: null,
        scrollViewHeight: 0
    },
    onLoad: function(n) {
        this.getFuliBanner(), this.getFulicouponList(), this.calculateScrollViewHeight();
        var o = this, i = t.globalData.hwxUserInfo.phone, a = t.globalData.hwxUserInfo.token;
        i && a && e.getIsLogin(a, function(e) {
            "1" == e.is_login ? o.setData({
                isLogin: !0
            }) : o.setData({
                isLogin: !1
            });
        }, function(e) {
            o.setData({
                isLogin: !1
            });
        });
    },
    calculateScrollViewHeight: function() {
        var e = this;
        wx.createSelectorQuery().select(".fulishe_title").boundingClientRect(function(t) {
            wx.createSelectorQuery().select(".type_wrap").boundingClientRect(function(n) {
                e.setData({
                    scrollViewHeight: wx.getSystemInfoSync().windowHeight - t.height - n.height + "px"
                });
            }).exec();
        }).exec();
    },
    getFuliBanner: function() {
        var n = this, o = t.globalData.hwxUserInfo.token;
        e.getFuliBanner(o, function(e) {
            console.log(e), n.setData({
                bannerInfo: e
            });
        }, function(e) {});
    },
    changeType: function(e) {
        var t = e.currentTarget.dataset.index;
        3 != t ? (this.setData({
            selectedIndex: t
        }), this.getFulicouponList()) : wx.navigateToMiniProgram({
            appId: "wx05173ac0eee13384",
            path: this.data.bannerInfo.page_path
        });
    },
    getFulicouponList: function() {
        var n = this;
        wx.showLoading();
        var o = t.globalData.hwxUserInfo.token, i = {
            type: this.data.selectedIndex
        };
        e.getFulicouponList(o, i, function(e) {
            n.setData({
                couponList: e
            }), wx.hideLoading();
        }, function(e) {
            wx.hideLoading();
        });
    },
    getPhoneNumber: function(n) {
        n.currentTarget.dataset.origin;
        var o = encodeURIComponent(n.detail.iv), i = encodeURIComponent(n.detail.encryptedData), a = this;
        this.setData({
            number: n.currentTarget.dataset.number
        }), wx.login({
            success: function(n) {
                e.getWxLogin(encodeURIComponent(n.code), i, o, function(e) {
                    t.setHwxUserInfo(e.token, e.phone_number), a.setData({
                        isLogin: !0
                    }), a.getFulicouponList();
                }, function(e) {
                    wx.showToast({
                        title: "微信授权登录失败",
                        icon: "none",
                        duration: 1e3,
                        complete: function() {
                            wx.navigateTo({
                                url: "../../personal/login/login"
                            });
                        }
                    });
                });
            }
        });
    },
    lingquNow: function(e) {
        var n = t.globalData.hwxUserInfo.token, o = e.currentTarget.dataset.number;
        "0" == e.currentTarget.dataset.shr ? this.repairCouponget(n, o) : this.recycleCouponget(n, o);
    },
    repairCouponget: function(n, o) {
        var i = this, a = {
            batch_number: o,
            phone_number: t.globalData.hwxUserInfo.phone
        };
        e.getFulishecoupon(n, a, function(e) {
            wx.showToast({
                title: "领取成功",
                duration: 1500,
                mask: !1
            }), i.setData({
                number: null
            }), setTimeout(function() {
                i.getFulicouponList();
            }, 1500);
        }, function(e) {
            wx.showToast({
                title: e,
                icon: "none",
                image: "",
                duration: 1500
            }), i.setData({
                number: null
            }), setTimeout(function() {
                i.getFulicouponList();
            }, 1500);
        });
    },
    recycleCouponget: function(t, n) {
        var o = this, i = {
            coupon_batch_number: n
        };
        e.getRecyclecoupon(t, i, function(e) {
            wx.showToast({
                title: "领取成功",
                duration: 1500,
                mask: !1
            }), o.setData({
                number: null
            }), setTimeout(function() {
                o.getFulicouponList();
            }, 1500);
        }, function(e) {
            wx.showToast({
                title: e,
                icon: "none",
                image: "",
                duration: 1500
            }), o.setData({
                number: null
            }), setTimeout(function() {
                o.getFulicouponList();
            }, 1500);
        });
    },
    useNow: function(e) {
        0 != e.currentTarget.dataset.shr ? wx.navigateTo({
            url: "../../recycle/phonelist/phonelist"
        }) : wx.navigateTo({
            url: "../chooseDevice/chooseDevice?tyleIndex=0"
        });
    }
});