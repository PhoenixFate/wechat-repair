require("../../../util/util");

var e = require("../../../comm/script/fetch"), o = (require("../../../comm/script/config"), 
getApp());

Page({
    data: {},
    getPhoneNumber: function(n) {
        var t = encodeURIComponent(n.detail.iv), c = encodeURIComponent(n.detail.encryptedData), i = this;
        wx.login({
            success: function(n) {
                console.log("res++++"), console.log(n), console.log("code:", n.code), e.getWxLogin(encodeURIComponent(n.code), c, t, function(e) {
                    o.setHwxUserInfo(e.token, e.phone_number);
                    var n = getCurrentPages();
                    n[n.length - 2].setData({
                        isLogin: !0
                    }), wx.navigateBack({
                        delta: 1
                    });
                }, function(e) {
                    console.log("err6666"), console.log(e), i.goToLogin();
                });
            }
        });
    },
    goToLogin: function() {
        wx.redirectTo({
            url: "../login/login"
        });
    }
});