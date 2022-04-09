var e = require("../../../comm/script/fetch"), n = (require("../../../comm/script/config"), 
new getApp());

Page({
    data: {
        expressInfo: [],
        repairCenter: {
            address: "上海市浦东新区东方路1381号蓝村大厦26楼E室",
            name: "上海市浦东维修中心",
            tel: "021-61760911"
        },
        showMoreExpressBtn: !1,
        searchData: null
    },
    onLoad: function(e) {
        console.log(JSON.parse(e.data)), this.setData({
            searchData: JSON.parse(e.data)
        }), this.getExpressInfo(this.data.searchData.brandid, this.data.searchData.expressnumber);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onPageScroll: function() {},
    onTabItemTap: function(e) {},
    makePhonecall: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.tel
        });
    },
    getExpressInfo: function(o, a) {
        var t = this, s = n.globalData.hwxUserInfo.token;
        e.getExpressInfo(s, o, a, function(e) {
            t.setData({
                expressInfo: e
            });
        }, function(e) {
            console.log("err"), console.log(e), t.setData({
                expressInfo: []
            });
        });
    }
});