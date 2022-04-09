require("../../../util/util"), require("../../../comm/script/fetch"), require("../../../comm/script/config");

var e = getApp();

Page({
    data: {
        webUrl: "",
        userToken: "haha",
        phone: ""
    },
    onLoad: function(t) {
        wx.getSystemInfo({
            success: function(e) {
                Number(e.SDKVersion.replace(/\./g, "")) < 164 && wx.showModal({
                    title: "小提示",
                    content: "当前微信版本过低，无法正常查看，请升级到最新微信版本后重试。",
                    complete: function() {
                        wx.navigateBack();
                    }
                });
            }
        }), e.globalData.hwxUserInfo.token && this.setData({
            userToken: e.globalData.hwxUserInfo.token,
            phone: e.globalData.hwxUserInfo.phone
        });
    },
    onShow: function() {
        this.onLoad();
        var e = Date.parse(new Date()), t = "https://m.hiweixiu.com/?hiweixiu_weapp=" + this.data.userToken + "&phone=" + this.data.phone + "&time=" + e + "#/recycle";
        this.setData({
            webUrl: t
        });
    },
    getMsg: function(e) {
        console.log("e.data+++"), console.log(e.data);
    }
});