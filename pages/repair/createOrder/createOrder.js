function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a, i = require("../../../comm/script/fetch"), s = getApp();

Page((a = {
    data: (e = {
        createOrderShow: !1,
        pageLoading: !0,
        isFullSucreen: !!s.globalData.isFullSucreen,
        cardCur: 0,
        swiperList: [ {
            id: 11121
        }, {
            id: 22222
        } ],
        showSwiper: !0,
        rp_id2: "",
        detailBgShow: !1,
        tipsShow: !1,
        animationData: {},
        text: "苹果官方配件仅支持南京、成都、重庆、广州维修服务，其他城市请联系热线客服！",
        addTipShow: !0,
        rp_id: "",
        mouldId: "",
        mouldName: "",
        colorId: "",
        selectedFault: [],
        is_warrantable: 0,
        noDefaultAddress: !0
    }, t(e, "tipsShow", !1), t(e, "category", 1), t(e, "canGetTime", !1), t(e, "dateList", []), 
    t(e, "periods", []), t(e, "timeChoosedTxt", "请选择预约时间"), t(e, "timeIschoose", !1), 
    t(e, "reserve_time", ""), t(e, "reserve_time2", ""), t(e, "centerList", []), t(e, "center_id", ""), 
    t(e, "centerIndex", ""), t(e, "centerIschoose", !1), t(e, "centerChoosedTxt", "请选择维修中心"), 
    t(e, "imei", ""), t(e, "remark", ""), t(e, "inputShow", !1), t(e, "remark_focus", !1), 
    t(e, "defaultAddress", ""), t(e, "isModelShow", !1), t(e, "totalPrice", ""), t(e, "payPrice", ""), 
    t(e, "discount", ""), t(e, "manual_fee", ""), t(e, "night_fee", ""), t(e, "visit_fee", ""), 
    t(e, "city_coupon", null), t(e, "couponData", ""), t(e, "coupon_code", ""), t(e, "couponIsChoose", !1), 
    t(e, "wenXinTiShi", [ "1、具体维修时间以工程师预约为准；", "2、损坏零件工程师需要收回，如需自留需另补差价；", "3、该维修价格为预计金额，实际金额以工程师检测故障为准；", "4、上门通过技术调试(未涉及零件)即完成维修，则仅收取90元修复费；", "注：因城市差异价格会略有不同" ]), 
    t(e, "timeValues", [ 0, 0 ]), t(e, "timeval", [ 0, 0 ]), t(e, "ellipsis", -1), t(e, "detailFaultMore", !0), 
    e),
    onLoad: function(t) {
        console.log(wx.getStorageSync("selectedFault"));
        var e = wx.getStorageSync("selectedFault");
        if (e.forEach(function(t, e) {
            t.active = !1;
        }), wx.removeStorageSync("origin"), "addressList" == t.origin) {
            var a = wx.getStorageSync("optionsLs"), i = wx.getStorageSync("address");
            this.setData({
                mouldId: a.mouldId,
                mouldName: a.mouldName,
                colorId: a.color,
                colorName: a.colorName,
                is_warrantable: a.is_warrantable,
                rp_id: a.rp_id,
                selectedFault: e,
                defaultAddress: i,
                noDefaultAddress: !1
            });
        } else if ("createOrder" == t.origin) {
            a = wx.getStorageSync("optionsLs");
            this.setData({
                mouldId: a.mouldId,
                mouldName: a.mouldName,
                colorId: a.color,
                colorName: a.colorName,
                is_warrantable: a.is_warrantable,
                rp_id: a.rp_id,
                selectedFault: e
            }), this.getDefaultAddress(a.rp_id);
        } else wx.removeStorageSync("optionsLs"), wx.removeStorageSync("address"), this.setData({
            mouldId: t.mouldId,
            mouldName: t.mouldName,
            colorId: t.color,
            colorName: t.colorName,
            is_warrantable: t.is_warrantable,
            rp_id: t.rp_id,
            selectedFault: e
        }), wx.setStorageSync("optionsLs", t), this.getDefaultAddress(t.rp_id);
        t.createOrderTabIndex && this.setData({
            category: t.createOrderTabIndex
        }), this.getPackCouponList(), this.getCenterList(), this.getReminder(), this.detailAnimation = wx.createAnimation({
            duration: 300
        }), this.timeAnimation = wx.createAnimation({
            duration: 300
        }), this.centerAnimation = wx.createAnimation({
            duration: 300
        }), this.imeiAnimation = wx.createAnimation({
            duration: 300
        }), wx.getStorageSync("createOrder") && this.setData({
            createOrderShow: !0
        });
        var s = this;
        setTimeout(function() {
            s.setData({
                createOrderShow: !1
            }), wx.setStorageSync("createOrder", !1);
        }, 4e3);
    },
    onShow: function() {
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), this.data.defaultAddress.district_id ? this.getWayList(this.data.defaultAddress.district_id, this.data.rp_id) : wx.hideLoading(), 
        this.data.couponIsChoose ? this.setData({
            totalPrice: this.data.couponData.price,
            payPrice: this.data.couponData.payprice,
            discount: this.data.couponData.discount,
            recommend_fault_discounts_price: this.data.couponData.recommend_fault_discounts_price,
            manual_fee: this.data.couponData.manual_fee,
            night_fee: this.data.couponData.night_fee,
            visit_fee: this.data.couponData.visit_fee
        }) : this.popDown();
    },
    scrolltxt: function() {
        var t = wx.createAnimation({
            duration: 9e4,
            timingFunction: "linear"
        });
        t.translate(-Number(12 * this.data.text.length), 0).step(), this.setData({
            animationData: t.export()
        }), this.recoveraAnimation = setInterval(function() {
            t.translate(255, 0).step({
                duration: 0
            }), this.setData({
                animationData: t.export()
            });
        }.bind(this), 9e4), this.restartAnimation = setInterval(function() {
            t.translate(-Number(12 * this.data.text.length), 0).step(), this.setData({
                animationData: t.export()
            });
        }.bind(this), 90001);
    },
    getWayList: function(t, e) {
        var a = this;
        i.getWayList.call(a, t, e, function(t) {
            t[0].active ? (a.getReserveTime(a.data.defaultAddress.city_id, a.data.defaultAddress.district_id), 
            a.setData({
                canGetTime: !0
            })) : 1 == a.data.category && a.setData({
                canGetTime: !1,
                category: 2
            }), a.data.couponIsChoose || a.popDown(), wx.hideLoading(), a.setData({
                pageLoading: !1
            });
        }, function(t) {
            wx.hideLoading(), a.setData({
                pageLoading: !1
            });
        });
    },
    clearCoupon: function() {
        this.setData({
            couponData: "",
            coupon_code: "",
            couponIsChoose: !1
        });
    },
    timeUp: function() {
        this.data.defaultAddress.city_id || this.data.defaultAddress.district_id ? this.data.canGetTime && (this.timeAnimation.translateY(0).step(), 
        this.setData({
            timeAnimation: this.timeAnimation.export(),
            isModelShow: !0
        })) : wx.showToast({
            title: "请先添加地址",
            image: "../../../img/wx_index/warning.png",
            duration: 2e3
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
        var e = t.detail.value, a = this.data.timeValues;
        if (e[0] == a[0]) if (e[1] == a[1]) this.clearCoupon(); else {
            i = this.data.dateList[e[0]].date + this.data.dateList[e[0]].periods[e[1]].start_time + "~" + this.data.dateList[e[0]].periods[e[1]].next_time;
            this.setData({
                periods: this.data.dateList[e[0]].periods,
                timeChoosedTxt: i,
                timeIschoose: !0,
                reserve_time: this.data.dateList[e[0]].periods[e[1]].start_datetime,
                reserve_time2: this.data.dateList[e[0]].periods[e[1]].next_datetime,
                timeValues: e,
                timeval: e
            });
        } else {
            var i = this.data.dateList[e[0]].date + this.data.dateList[e[0]].periods[0].start_time + "~" + this.data.dateList[e[0]].periods[0].next_time;
            this.setData({
                periods: this.data.dateList[e[0]].periods,
                timeChoosedTxt: i,
                timeIschoose: !0,
                reserve_time: this.data.dateList[e[0]].periods[0].start_datetime,
                reserve_time2: this.data.dateList[e[0]].periods[0].next_datetime,
                timeValues: e,
                timeval: [ e[0], 0 ]
            });
        }
    },
    confirmTime: function() {
        if (!this.data.timeIschoose) {
            var t = this.data.dateList[0].date + " " + this.data.dateList[0].periods[0].start_time + "~" + this.data.dateList[0].periods[0].next_time;
            this.setData({
                periods: this.data.dateList[0].periods,
                timeChoosedTxt: t,
                timeIschoose: !0,
                reserve_time: this.data.dateList[0].periods[0].start_datetime,
                reserve_time2: this.data.dateList[0].periods[0].next_datetime
            });
        }
        this.popDown();
    },
    getCenterList: function() {
        var t = this;
        i.getCenterList.call(t, function(e) {
            t.setData({
                centerList: e
            });
        }, function(t) {});
    },
    getReminder: function() {
        var t = this;
        i.getReminders.call(t, function(e) {
            t.setData({
                wenXinTiShi: e.content
            });
        }, function(t) {});
    },
    centerUp: function() {
        this.centerAnimation.translateY(0).step(), this.setData({
            centerAnimation: this.centerAnimation.export(),
            isModelShow: !0
        });
    },
    imeiUp: function() {
        this.imeiAnimation.translateY(0).step(), this.setData({
            imeiAnimation: this.imeiAnimation.export(),
            isModelShow: !0
        });
    },
    centerChange: function(t) {
        var e = t.detail.value;
        this.setData({
            centerChoosedTxt: this.data.centerList[e[0]].name,
            centerIschoose: !0,
            center_id: this.data.centerList[e[0]].id,
            centerIndex: e[0]
        }), this.clearCoupon();
    },
    confirmCenter: function() {
        this.data.centerIschoose || this.setData({
            centerChoosedTxt: this.data.centerList[0].name,
            centerIschoose: !0,
            center_id: this.data.centerList[0].id,
            centerIndex: 0
        }), this.popDown();
    },
    popDown: function() {
        this.timeAnimation.translateY("100%").step(), this.centerAnimation.translateY("100%").step(), 
        this.imeiAnimation.translateY("100%").step(), this.setData({
            timeAnimation: this.timeAnimation.export(),
            centerAnimation: this.centerAnimation.export(),
            imeiAnimation: this.imeiAnimation.export(),
            isModelShow: !1
        });
        var t = {};
        t.city_id = this.data.defaultAddress.city_id, t.rp_id = this.data.rp_id, t.is_warrantable = this.data.is_warrantable, 
        t.category = this.data.category, t.district_id = this.data.defaultAddress.district_id, 
        t.reserve_time = this.data.reserve_time, t.reserve_time2 = this.data.reserve_time2, 
        t.rp_id2 = this.data.rp_id2, this.data.centerIschoose && 1 != this.data.category && (t.city_id = this.data.centerList[this.data.centerIndex].city, 
        t.district_id = this.data.centerList[this.data.centerIndex].district), this.getCityPrice(t);
    },
    setIMEI: function(t) {
        this.setData({
            imei: t.detail.value
        });
    },
    showInput: function() {
        this.setData({
            inputShow: !0,
            remark_focus: !0
        });
    },
    hideInput: function() {
        this.setData({
            inputShow: !1,
            remark_focus: !1
        });
    },
    setRemark: function(t) {
        this.setData({
            remark: t.detail.value
        });
    },
    addAddress: function(t) {
        wx.redirectTo({
            url: "../../personal/addAddress/addAddress?origin=createOrder&createOrderTabIndex=" + this.data.category
        });
    },
    selectAddress: function(t) {
        wx.redirectTo({
            url: "../../personal/addressList/addressList?createOrderTabIndex=" + this.data.category
        });
    },
    createOrder: function() {
        (this.data.canGetTime || 1 != this.data.category || this.data.noDefaultAddress) && (this.data.noDefaultAddress ? wx.showToast({
            title: "请填写地址",
            image: "../../../img/wx_index/warning.png",
            duration: 1500
        }) : 1 != this.data.category || this.data.timeIschoose ? 1 == this.data.category || this.data.centerIschoose ? 2 != this.data.category || this.data.imei ? (wx.showLoading({
            title: "正在下单中",
            mask: !0
        }), this.getCreateOrder()) : wx.showToast({
            title: "请输入imei号",
            image: "../../../img/wx_index/warning.png",
            duration: 1500
        }) : wx.showToast({
            title: "请选择维修中心",
            image: "../../../img/wx_index/warning.png",
            duration: 1500
        }) : wx.showToast({
            title: "请选择预约时间",
            image: "../../../img/wx_index/warning.png",
            duration: 1500
        }));
    },
    getCreateOrder: function() {
        var t = this, e = {};
        e.rp_id = this.data.rp_id, e.category = this.data.category, e.remark = this.data.remark, 
        e.user_address_id = this.data.defaultAddress.id, e.rp_id2 = this.data.rp_id2, e.is_warrantable = this.data.is_warrantable, 
        1 == this.data.category ? (e.reserve_time = this.data.reserve_time, e.reserve_time2 = this.data.reserve_time2) : 3 == this.data.category ? e.weixiucenter_id = this.data.center_id : 2 == this.data.category && (e.weixiucenter_id = this.data.center_id, 
        e.imei = this.data.imei), this.data.couponIsChoose ? e.coupon_code = this.data.coupon_code : e.coupon_code = "";
        var a = s.globalData.hwxUserInfo.token;
        i.getCreateOrder.call(t, a, e, function(t) {
            wx.hideLoading(), wx.navigateTo({
                url: "../orderSubmitted/orderSubmitted?data=" + JSON.stringify(t)
            });
        }, function(t) {
            wx.hideLoading(), wx.showToast({
                title: t,
                icon: "none",
                duration: 1500
            });
        });
    },
    goToCoupon: function() {
        if (this.data.noDefaultAddress) wx.showToast({
            title: "请填写地址",
            image: "../../../img/wx_index/warning.png",
            duration: 1500,
            mask: !0
        }); else if (1 != this.data.category || this.data.timeIschoose) if (1 == this.data.category || this.data.centerIschoose) {
            var t = {};
            t.rp_id = this.data.rp_id, t.rp_id2 = this.data.rp_id2, t.category = this.data.category, 
            t.is_warrantable = this.data.is_warrantable, 1 == this.data.category ? (t.reserve_time = this.data.reserve_time, 
            t.reserve_time2 = this.data.reserve_time2, t.city = this.data.defaultAddress.city_id, 
            t.district = this.data.defaultAddress.district_id) : 3 == this.data.category ? (t.city = this.data.centerList[this.data.centerIndex].city, 
            t.district = this.data.centerList[this.data.centerIndex].district) : 2 == this.data.category && (t.city = this.data.centerList[this.data.centerIndex].city, 
            t.district = this.data.centerList[this.data.centerIndex].district), wx.navigateTo({
                url: "../couponList/couponList?info=" + JSON.stringify(t)
            });
        } else wx.showToast({
            title: "请选择维修中心",
            image: "../../../img/wx_index/warning.png",
            duration: 1500,
            mask: !0
        }); else wx.showToast({
            title: "请选择预约时间",
            image: "../../../img/wx_index/warning.png",
            duration: 1500,
            mask: !0
        });
    },
    toUserAgreement: function() {
        wx.navigateTo({
            url: "../userAgreementWeb/userAgreementWeb"
        });
    },
    tipsOpen: function() {
        var t = this;
        this.setData({
            tipsShow: !t.data.tipsShow
        });
    },
    getDefaultAddress: function(t) {
        var e = this, a = s.globalData.hwxUserInfo.token;
        i.getDefaultAddress.call(e, a, function(a) {
            e.getWayList(a.district_id, t), e.setData({
                defaultAddress: a,
                noDefaultAddress: !1
            });
        }, function(t) {
            wx.hideLoading(), e.setData({
                pageLoading: !1
            }), e.setData({
                noDefaultAddress: !0
            });
        });
    },
    getCityPrice: function(t) {
        var e = this;
        i.getCityPrice.call(e, t, function(t) {
            e.setData({
                totalPrice: t.price,
                recommend_fault_discounts_price: t.recommend_fault_discounts_price,
                payPrice: t.payprice,
                discount: t.discount,
                manual_fee: t.manual_fee,
                night_fee: t.night_fee,
                visit_fee: t.visit_fee,
                city_coupon: t.city_coupon
            });
        }, function(t) {});
    },
    closeTipShow: function() {
        clearInterval(this.data.interval), this.setData({
            addTipShow: !1
        });
    },
    ellipsis: function(t) {
        var e = t.currentTarget.dataset.index;
        this.data.ellipsis == e ? this.setData({
            ellipsis: -1
        }) : this.setData({
            ellipsis: e
        });
    },
    chooseWay: function(t) {
        var e = t.currentTarget.dataset;
        this.setData({
            category: e.index
        }), this.clearCoupon(), this.popDown();
    },
    cardSwiper: function(t) {
        this.setData({
            cardCur: t.detail.current || 0
        });
    }
}, t(a, "tipsOpen", function() {
    var t = this;
    this.setData({
        tipsShow: !t.data.tipsShow
    });
}), t(a, "getPackCouponList", function() {
    var t = this;
    i.getPackCoupon.call(t, t.data.rp_id, function(e) {
        var a = e;
        0 === e.length && t.setData({
            showSwiper: !1
        }), a.forEach(function(t) {
            t.packCouponSelected = !0;
        }), t.setData({
            swiperList: a,
            swiperCurrentIndex: 0
        });
    }, function(e) {
        t.setData({
            showSwiper: !1
        });
    });
}), t(a, "addFault", function(t) {
    var e = t.currentTarget.dataset, a = this.data.swiperList;
    a.forEach(function(t, a, i) {
        t.rp_id == e.rp_id && (t.packCouponSelected = !1);
    }), this.canShowSwiper(), 1 == e.index ? this.setData({
        cardCur: 0,
        swiperCurrentIndex: 0
    }) : this.setData({
        cardCur: 1
    }), this.setData({
        swiperList: a
    });
    var i = {};
    i.price = e.reduced_price, i.original_price = e.original_price, i.repair_descr = e.repair_descr, 
    i.discount_info = e.discount_info, i.name = e.name, i.rp_id = e.rp_id, i.packCouponSelected = e.packCouponSelected;
    var s = this.data.selectedFault;
    s.push(i), this.setData({
        selectedFault: s
    }), this.clearCoupon();
}), t(a, "canShowSwiper", function() {
    this.data.swiperList.every(function(t) {
        return !1 === t.packCouponSelected;
    }) ? this.setData({
        showSwiper: !1
    }) : this.setData({
        showSwiper: !0
    }), this.getRpId2(), this.popDown();
}), t(a, "getRpId2", function() {
    var t = "", e = [];
    this.data.swiperList.forEach(function(t, a, i) {
        0 == t.packCouponSelected && e.push(t.rp_id);
    }), t = e.join(","), this.setData({
        rp_id2: t
    });
}), t(a, "deleteCouponFault", function(t) {
    var e = this, a = t.currentTarget.dataset, i = this.data.selectedFault;
    i.forEach(function(t, e, s) {
        a.rp_id == t.rp_id && i.splice(e, 1);
    }), this.setData({
        selectedFault: i
    });
    var s = this.data.swiperList;
    s.forEach(function(t, i, s) {
        a.rp_id == t.rp_id && (t.packCouponSelected = !0, e.setData({
            cardCur: 0,
            swiperCurrentIndex: 0
        }));
    }), this.setData({
        swiperList: s
    }), this.canShowSwiper(), this.clearCoupon();
}), t(a, "showDetailBg", function() {
    this.data.payPrice && (this.data.detailBgShow ? this.detailBgDown() : this.detailBgUp());
}), t(a, "detailBgUp", function() {
    this.data.isFullSucreen ? this.detailAnimation.translateY("-23%").step() : this.detailAnimation.translateY(0).step(), 
    this.setData({
        detailAnimation: this.detailAnimation.export(),
        detailBgShow: !0
    });
}), t(a, "detailBgDown", function() {
    this.detailAnimation.translateY("180%").step(), this.setData({
        detailAnimation: this.detailAnimation.export(),
        detailBgShow: !1
    });
}), t(a, "goCenter", function(t) {
    var e = t.currentTarget.dataset;
    wx.openLocation({
        latitude: Number(e.lat),
        longitude: Number(e.lng),
        name: e.name,
        address: e.address,
        scale: 28
    });
}), t(a, "callCenter", function(t) {
    var e = t.currentTarget.dataset;
    wx.makePhoneCall({
        phoneNumber: e.phone
    });
}), t(a, "showDetailMore", function() {
    this.setData({
        detailFaultMore: !this.data.detailFaultMore
    });
}), t(a, "showFaultDetail", function(e) {
    var a = e.currentTarget.dataset.active, i = "selectedFault[" + e.currentTarget.dataset.index + "].active";
    this.setData(t({}, i, !a));
}), a));