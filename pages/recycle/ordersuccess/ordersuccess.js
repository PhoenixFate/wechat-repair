Page({
    data: {
        order_sn: "",
        type: "",
        order_id: ""
    },
    onLoad: function(r) {
        this.setData({
            order_sn: r.order_sn,
            type: r.type,
            order_id: r.order_id
        });
    },
    backIndex: function() {
        wx.switchTab({
            url: "../../recycle/home/home"
        });
    },
    seeOrder: function() {
        wx.redirectTo({
            url: "../../personal/myOrderDetail/myOrderDetail?order_sn=" + this.data.order_sn + "&type=" + this.data.type + "&order_id=" + this.data.order_id
        });
    },
    goPage: function(r) {
        wx.switchTab({
            url: r.currentTarget.dataset.url
        });
    }
});