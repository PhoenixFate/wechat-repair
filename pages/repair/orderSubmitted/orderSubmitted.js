require("../../../util/util"), require("../../../comm/script/fetch"), require("../../../comm/script/config"), 
getApp();

Page({
    data: {
        orderData: null
    },
    onLoad: function(r) {
        console.log("options"), console.log(r), this.setData({
            orderData: JSON.parse(r.data)
        });
    },
    goToHome: function() {
        wx.reLaunch({
            url: "/pages/repair/home/home"
        });
    },
    goToOrder: function() {
        wx.redirectTo({
            url: "../../personal/myOrderDetail/myOrderDetail?order_sn=" + (this.data.orderData.order_sn ? this.data.orderData.order_sn : "") + "&type=" + (this.data.orderData.category_type ? 1 == this.data.orderData.category_type || 2 == this.data.orderData.category_type ? 1 : 3 : "") + "&order_id=" + this.data.orderData.oid
        });
    }
});