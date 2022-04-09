function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var e, i = require("../../../comm/script/fetch"), a = (require("../../../comm/script/config"), 
getApp());

Page({
    data: (e = {
        isFullSucreen: a.globalData.isFullSucreen,
        orderTime: "",
        isAddress: !1,
        defaultAddress: null,
        dateList: [],
        periods: [],
        isModelShow: !1
    }, t(e, "periods", ""), t(e, "reserve_time", ""), t(e, "reserve_time2", ""), t(e, "timeValues", [ 0, 0 ]), 
    t(e, "timeval", [ 0, 0 ]), t(e, "faultPrice", null), t(e, "isShowAddminiapp", !1), 
    t(e, "zengzhiquanCount", 0), t(e, "voucherInfo", null), t(e, "totalPrice", 0), t(e, "payUsername", ""), 
    t(e, "payPhone", ""), t(e, "remark", ""), e),
    onLoad: function(t) {
        this.timeAnimation = wx.createAnimation({
            duration: 300
        }), this.resultAnimation = wx.createAnimation({
            duration: 200
        });
        var e = t.faultprice ? JSON.parse(t.faultprice) : wx.getStorageSync("FAULTPRICE");
        this.setData({
            faultPrice: e,
            totalPrice: e.recycle_info.price
        }), this.getMyCouponList();
    },
    onShow: function() {
        console.log(wx.getStorageSync("VOUCHER")), this.getDefaultAddress(), this.getCoupon(), 
        wx.getStorageSync("VOUCHER") ? this.setData({
            voucherInfo: wx.getStorageSync("VOUCHER"),
            totalPrice: Number(this.data.faultPrice.recycle_info.price) + Number(wx.getStorageSync("VOUCHER").add_price)
        }) : this.setData({
            voucherInfo: null,
            totalPrice: Number(this.data.faultPrice.recycle_info.price)
        });
    },
    getDefaultAddress: function() {
        var t = this, e = a.globalData.hwxUserInfo.token;
        i.getDefaultAddress(e, function(e) {
            var i = wx.getStorageSync("recycleAddress") ? wx.getStorageSync("recycleAddress") : e;
            t.setData({
                isAddress: !0,
                defaultAddress: i
            }), t.getReserveTime(e.city_id, e.district_id);
        }, function(e) {
            t.setData({
                isAddress: !1
            });
        });
    },
    timeUp: function() {
        this.data.defaultAddress.city_id || this.data.defaultAddress.district_id ? (this.timeAnimation.translateY(0).step(), 
        this.setData({
            timeAnimation: this.timeAnimation.export(),
            isModelShow: !0
        })) : wx.showToast({
            title: "请先添加地址",
            image: "../../../img/wx_index/warning.png",
            duration: 2e3,
            mask: !0
        });
    },
    showResult: function() {
        this.resultAnimation.translateY(0).step(), this.setData({
            resultAnimation: this.resultAnimation.export(),
            isModelShow: !0
        });
    },
    closeResult: function() {
        this.resultAnimation.translateY("100%").step(), this.setData({
            resultAnimation: this.resultAnimation.export(),
            isModelShow: !1
        });
    },
    getReserveTime: function(t, e) {
        var a = this;
        i.getRepairTime.call(a, t, e, function(t) {
            a.setData({
                dateList: t,
                periods: t[0].periods
            });
        }, function(t) {
            wx.showToast({
                title: t,
                icon: "none",
                duration: 1e3
            });
        });
    },
    timeChange: function(t) {
        var e = t.detail.value, i = this.data.timeValues;
        this.setData({
            periods: this.data.dateList[e[0]].periods,
            timeval: [ e[0], e[1] != i[1] && e[0] == i[0] ? e[1] : 0 ],
            timeValues: e
        });
    },
    confirmTime: function() {
        var t = this.data.timeval, e = this.data.dateList[t[0]].date + " " + this.data.dateList[t[0]].periods[t[1]].start_time + "~" + this.data.dateList[t[0]].periods[t[1]].next_time;
        this.setData({
            orderTime: e,
            reserve_time: this.data.dateList[t[0]].periods[t[1]].start_datetime,
            reserve_time2: this.data.dateList[t[0]].periods[t[1]].next_datetime
        }), this.popDown();
    },
    popDown: function() {
        this.timeAnimation.translateY("100%").step(), this.resultAnimation.translateY("100%").step(), 
        this.setData({
            timeAnimation: this.timeAnimation.export(),
            resultAnimation: this.resultAnimation.export(),
            isModelShow: !1
        });
    },
    goAddaddress: function() {
        wx.navigateTo({
            url: "../addAddress/addAddress"
        });
    },
    goSelectAddress: function() {
        wx.navigateTo({
            url: "../addressList/addressList"
        });
    },
    rePrice: function() {
        wx.redirectTo({
            url: "../faultprice/faultprice?mid=" + this.data.faultPrice.model_info.id + "&name=" + this.data.faultPrice.model_info.name
        });
    },
    nearbyCenter: function() {
        wx.navigateTo({
            url: "../../storeAddress/storeAddress"
        });
    },
    showMiniapp: function(t) {
        wx.redirectTo({
            url: "../faultprice/faultprice?mid=" + this.data.faultPrice.model_info.id + "&name=" + this.data.faultPrice.model_info.name
        });
    },
    getMyCouponList: function() {
        wx.setStorageSync("VOUCHER", ""), this.getCoupon();
    },
    getCoupon: function() {
        var t = a.globalData.hwxUserInfo.token, e = this, s = {
            evaluated_price: this.data.faultPrice.recycle_info.price ? this.data.faultPrice.recycle_info.price : 0
        };
        i.getRecycleVoucher(t, s, function(t) {
            e.setData({
                zengzhiquanCount: t.length
            });
        }, function(t) {
            console.log("mes+++"), console.log(t);
        });
    },
    goZengzhiquan: function() {
        if (this.data.zengzhiquanCount) {
            var t = this.data.voucherInfo ? this.data.voucherInfo.index : null;
            wx.navigateTo({
                url: "../voucher/voucher?index=" + t + "&price=" + this.data.faultPrice.recycle_info.price
            });
        } else wx.showToast({
            title: "暂无券可用",
            icon: "none",
            duration: 1500,
            mask: !0
        });
    },
    userNameInput: function(t) {
        this.setData({
            payUsername: t.detail.value
        });
    },
    phoneNameInput: function(t) {
        this.setData({
            payPhone: t.detail.value
        });
    },
    remarkNameInput: function(t) {
        this.setData({
            remark: t.detail.value
        });
    },
    commitOrder: function() {
        var t = [];
        this.data.faultPrice.model_fault_attrs.forEach(function(e) {
            t.push(e.descr_id);
        });
        var e = this.data.faultPrice.recycle_info.price, s = this.data.faultPrice.model_info.id, o = this.data.faultPrice.recycle_info.recycler_id;
        console.log(this.data.defaultAddress);
        var r = this.data.defaultAddress.user_name, n = this.data.defaultAddress.mobile, d = this.data.defaultAddress.city_id, c = this.data.defaultAddress.district_id, l = this.data.defaultAddress.address, u = this.data.payUsername, h = this.data.payPhone, m = this.data.orderTime, f = this.data.remark, p = [ {
            coupon_code: this.data.voucherInfo ? this.data.voucherInfo.code : ""
        } ];
        if (d) if (m) if (u) if (h) {
            wx.showLoading({
                title: "正在下单中",
                mask: !0
            });
            var g = {
                model_attrs: t,
                model_price: e,
                model_id: s,
                recycler_id: o,
                user_name: r,
                user_phone: n,
                city: d,
                district: c,
                address: l,
                payment_method: "1",
                payment_username: u,
                payment_account: h,
                reserved_at: m,
                remark: f,
                coupons: p,
                type: 1
            };
            console.log(g);
            var w = a.globalData.hwxUserInfo.token;
            i.createRecycleOrder(w, g, function(t) {
                console.log(t), wx.showToast({
                    title: "创建成功",
                    duration: 1500,
                    mask: !0
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "../ordersuccess/ordersuccess?order_sn=" + t.order_sn + "&type=" + t.category_type + "&order_id=" + t.orders_data[0].order_id
                    }), wx.hideToast(), wx.hideLoading();
                }, 1e3);
            }, function(t) {
                wx.hideLoading(), wx.showToast({
                    title: t,
                    icon: "none",
                    image: "",
                    duration: 1500,
                    mask: !0
                });
            });
        } else wx.showToast({
            title: "请输入收款账号",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "请输入收款姓名",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "请选择上门时间",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "请选择上门地址",
            icon: "none",
            duration: 1500
        });
    }
});