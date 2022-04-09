var e = require("../../../comm/script/fetch"), t = (require("../../../comm/script/config"), 
new getApp());

t.getParams;

Page({
    data: {
        deviceInfo: {},
        index: null,
        expressCompany: [],
        expressNumber: "",
        expressRemark: ""
    },
    onLoad: function(e) {
        this.getExpressList(), this.setData({
            deviceInfo: JSON.parse(e.device)
        }), console.log(this.data.deviceInfo);
    },
    getExpressList: function() {
        var s = this, a = t.globalData.hwxUserInfo.token;
        e.getExpressList(a, function(e) {
            s.setData({
                expressCompany: e
            });
        });
    },
    getExpressNumber: function(e) {
        this.setData({
            expressNumber: e.detail.value
        });
    },
    getExpressRemark: function(e) {
        this.setData({
            expressRemark: e.detail.value
        });
    },
    onReady: function() {},
    selectExpressCompany: function(e) {
        this.setData({
            index: e.detail.value
        });
    },
    confirmCommit: function() {
        var s = t.globalData.hwxUserInfo.token, a = this.data.index ? this.data.expressCompany[this.data.index].id : "", i = {
            number: this.data.expressNumber,
            company_id: a,
            remark: this.data.expressRemark,
            order_id: this.data.deviceInfo.orderid,
            order_sn: this.data.deviceInfo.ordersn
        };
        this.data.expressNumber ? a ? e.postDevice(s, i, function(e) {
            console.log("res"), console.log(e), wx.showToast({
                title: "填写成功",
                duration: 2e3
            }), setTimeout(function() {
                wx.navigateBack();
            }, 2e3);
        }, function(e) {
            console.log("err"), console.log(e), wx.showToast({
                title: "信息填写错误",
                image: "../../../img/wx_index/warning.png",
                duration: 2e3
            });
        }) : wx.showToast({
            title: "请填写快递公司",
            image: "../../../img/wx_index/warning.png",
            duration: 2e3
        }) : wx.showToast({
            title: "请填写物流单号",
            image: "../../../img/wx_index/warning.png",
            duration: 2e3
        });
    }
});