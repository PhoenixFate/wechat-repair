var e = require("../../../comm/script/fetch"), t = (require("../../../comm/script/config"), 
getApp());

Page({
    data: {
        couponList: [],
        selectedIndex: null,
        price: 0
    },
    onLoad: function(e) {
        this.setData({
            selectedIndex: Number(e.index) || 0 == Number(e.index) ? Number(e.index) : null,
            price: e.price
        }), this.getMineCoupon();
    },
    getMineCoupon: function() {
        wx.showLoading();
        var i = t.globalData.hwxUserInfo.token, a = this, n = {
            evaluated_price: this.data.price ? this.data.price : 0
        };
        e.getRecycleVoucher(i, n, function(e) {
            e.forEach(function(e) {
                e.add_price = Number(e.add_price), e.min_price = Number(e.min_price);
            }), a.setData({
                couponList: e
            }), wx.hideLoading();
        }, function(e) {
            wx.hideLoading(), console.log("mes+++"), console.log(e);
        });
    },
    selectVoucher: function(e) {
        if (e.currentTarget.dataset.price > this.data.price) wx.showToast({
            title: "不满足使用条件",
            icon: "none",
            image: "",
            duration: 1500
        }); else {
            this.setData({
                selectedIndex: e.currentTarget.dataset.index
            });
            var t = e.currentTarget.dataset.item;
            t.index = e.currentTarget.dataset.index, wx.setStorageSync("VOUCHER", t), wx.navigateBack({
                delta: 1
            });
        }
    },
    noUseVoucher: function() {
        wx.setStorageSync("VOUCHER", ""), wx.navigateBack({
            delta: 1
        });
    }
});