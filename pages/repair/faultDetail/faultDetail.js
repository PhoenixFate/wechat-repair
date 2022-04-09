require("../../../comm/script/config");

var t = require("../../../comm/script/fetch"), e = (require("../../../util/util"), 
getApp());

Page({
    data: {
        isFullSucreen: !!e.globalData.isFullSucreen,
        pageLoading: !0,
        isLogin: !1,
        colorIschoose: !1,
        colorOpen: !1,
        colorIndex: 0,
        colorVal: [ 1 ],
        currentColorId: "",
        selectedColor: "",
        isWarranty: !1,
        warrantyTxt: "保修外",
        isWarrantyIndex: 0,
        childOpenIndex: -1,
        selectedFault: [],
        faultIndex: 0,
        repairTypeIndex: 0
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "获取数据中",
            mask: !0
        }), wx.showNavigationBarLoading(), this.colorAnimation = wx.createAnimation({
            duration: 300
        });
        var e = t.info.toLowerCase();
        this.setData({
            info: JSON.parse(e)
        }), this.getRepairMsg();
    },
    onShow: function() {
        var o = e.globalData.hwxUserInfo.phone, a = e.globalData.hwxUserInfo.token, i = this;
        o && a && t.getIsLogin(a, function(t) {
            "1" == t.is_login ? i.setData({
                isLogin: !0
            }) : i.setData({
                isLogin: !1
            });
        }, function(t) {
            i.setData({
                isLogin: !1
            });
        });
    },
    getRepairMsg: function() {
        var e = this;
        t.getMouldDetail(e.data.info.mouldid || e.data.info.id, function(t) {
            e.setData({
                phoneAttr: t
            }), e.getMouldAttr(e.data.info.color_id || t.mould.colors[0].id), e.setData({
                currentColorId: t.mould.colors[0].id,
                colorChoosedTxt: t.mould.colors[0].name
            }), e.data.info.color_id ? (console.log("颜色ID"), t.mould.colors.forEach(function(t, o, a) {
                if (t.id == e.data.info.color_id) {
                    var i = [];
                    i.push(o), e.setData({
                        currentColorId: t.id,
                        colorChoosedTxt: t.name,
                        colorIndex: o,
                        colorVal: i,
                        colorIschoose: !0,
                        faultModalShow: !1
                    });
                }
            })) : e.dialogUpShow();
        }, function(t) {
            console.log("err6666"), console.log(t), wx.showToast({
                title: t,
                icon: "none",
                duration: 1e3
            }), wx.hideLoading(), wx.hideNavigationBarLoading();
        });
    },
    getMouldAttr: function(e) {
        var o = this;
        t.getMouldAttr(o.data.info.mouldid || o.data.info.id, e, function(t) {
            wx.hideLoading(), wx.hideNavigationBarLoading();
            var e = t;
            e.forEach(function(t) {
                t.selected = !1, t.selected_num = 0;
            });
            for (var a = 0; a < e.length; a++) !function(t) {
                e[t].faulttype_details.forEach(function(a) {
                    if (a.selected = !1, a.rp_id == o.data.info.rp_id) {
                        a.selected = !0, e[t].selected_num = 1;
                        var i = a, n = {};
                        n.fault_id = i.fault_id, n.rp_id = i.rp_id, n.name = i.name, n.price = i.price, 
                        n.honai_price = i.honai_price, n.repair_descr = i.repair_descr, n.selected_src = i.selected_src;
                        var r = o.data.selectedFault;
                        r.unshift(n);
                        var l = o.data.faultAttr, s = o.data.repairTypeList;
                        o.setData({
                            repairTypeList: s,
                            selectedFault: r,
                            faultAttr: l
                        }), o.getTotalPrice(r);
                    }
                });
            }(a);
            o.setData({
                faultAttr: e,
                pageLoading: !1
            });
        }, function(t) {
            wx.showToast({
                title: t,
                icon: "none",
                duration: 1e3
            }), o.setData({
                pageLoading: !1
            }), wx.hideLoading(), wx.hideNavigationBarLoading();
        });
    },
    getTotalPrice: function(t) {
        for (var e = t, o = 0, a = 0; a < e.length; a++) this.data.isWarranty ? o += 1 * e[a].honai_price : o += 1 * e[a].price;
        this.setData({
            allAttrTotalPrice: o.toFixed(2)
        });
    },
    childOpen: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset;
        e.index == this.data.childOpenIndex ? this.setData({
            childOpenIndex: -1
        }) : this.setData({
            childOpenIndex: e.index
        });
    },
    chooseChildItem: function(t) {
        var e = this;
        if (console.log(t), 0 == t.currentTarget.dataset.selected) {
            var o = {};
            o = n = t.currentTarget.dataset;
            var a = (i = this).data.selectedFault;
            a.unshift(o), (r = i.data.faultAttr)[n.index].faulttype_details[n.child_index].selected = !0, 
            r[n.index].selected_num = r[n.index].selected_num + 1, this.setData({
                selectedFault: a,
                faultAttr: r
            }), this.getTotalPrice(a);
        } else {
            var i = this, n = t.currentTarget.dataset, r = i.data.faultAttr;
            r[n.index].faulttype_details[n.child_index].selected = !1, r[n.index].selected_num = r[n.index].selected_num - 1, 
            this.setData({
                faultAttr: r
            }), this.data.selectedFault.forEach(function(t, o, a) {
                if (t.rp_id == n.rp_id) {
                    var r = a;
                    a.splice(o, 1), i.setData({
                        selectedFault: r
                    }), e.getTotalPrice(r);
                }
            });
        }
    },
    dialogUpShow: function() {
        this.colorAnimation.translateY(0).step(), this.setData({
            colorAnimation: this.colorAnimation.export(),
            isModelShow: !0
        });
    },
    dialogDownHidden: function() {
        this.colorAnimation.translateY("100%").step(), this.setData({
            colorAnimation: this.colorAnimation.export(),
            isModelShow: !1
        });
    },
    chooseColor: function(t) {
        console.log(t);
        var e = t.detail.value;
        this.setData({
            colorChoosedTxt: this.data.phoneAttr.mould.colors[e[0]].name,
            colorIschoose: !0,
            currentColorId: this.data.phoneAttr.mould.colors[e[0]].id,
            colorIndex: e[0]
        }), wx.removeStorageSync("selectedFault"), this.setData({
            selectedFault: [],
            allAttrTotalPrice: ""
        }), this.getMouldAttr(this.data.phoneAttr.mould.colors[e[0]].id);
    },
    colorSure: function() {
        this.data.colorIschoose || (wx.removeStorageSync("selectedFault"), this.setData({
            selectedFault: [],
            allAttrTotalPrice: ""
        }), this.setData({
            colorChoosedTxt: this.data.phoneAttr.mould.colors[0].name,
            colorIschoose: !0,
            currentColorId: this.data.phoneAttr.mould.colors[0].id,
            colorIndex: 0
        }), this.getMouldAttr(this.data.phoneAttr.mould.colors[0].id)), this.dialogDownHidden();
    },
    selectWarranty: function(t) {
        t.detail.value ? this.setData({
            warrantyTxt: "保修内",
            isWarrantyIndex: 1,
            isWarranty: !0
        }) : this.setData({
            warrantyTxt: "保修外",
            isWarrantyIndex: 0,
            isWarranty: !1
        }), this.getTotalPrice(this.data.selectedFault);
    },
    getPhoneNumber: function(o) {
        var a = encodeURIComponent(o.detail.iv), i = encodeURIComponent(o.detail.encryptedData), n = this;
        wx.login({
            success: function(o) {
                console.log("code:", o.code), console.log("ivObj:", a), console.log("telObj:", i), 
                t.getWxLogin(encodeURIComponent(o.code), i, a, function(t) {
                    console.log(t), e.setHwxUserInfo(t.token, t.phone_number), n.setData({
                        isLogin: !0
                    }), n.next();
                }, function(t) {
                    console.log("err6666"), console.log(t), wx.showToast({
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
    next: function() {
        var t = this;
        if (!t.data.colorIschoose && t.data.phoneAttr.mould.colors.length > 1) return wx.showToast({
            title: "请选择机型颜色",
            icon: "none"
        }), void this.dialogUpShow();
        0 != t.data.selectedFault.length ? this.goToCreateOrder() : wx.showToast({
            title: "请选择故障类型",
            icon: "none"
        });
    },
    goToCreateOrder: function() {
        for (var t = [], e = 0; e < this.data.selectedFault.length; e++) t.push(this.data.selectedFault[e].rp_id);
        wx.setStorageSync("selectedFault", this.data.selectedFault), wx.navigateTo({
            url: "../createOrder/createOrder?mouldId=" + (this.data.phoneAttr.mould.id || this.data.info.id) + "&mouldName=" + this.data.phoneAttr.mould.name + "&color=" + this.data.currentColorId + "&colorName=" + this.data.phoneAttr.mould.colors[this.data.colorIndex].name + "&is_warrantable=" + this.data.isWarrantyIndex + "&rp_id=" + t.join(",")
        });
    },
    goToChooseDevice: function() {
        wx.redirectTo({
            url: "../chooseDevice/chooseDevice?faultInfo=" + JSON.stringify(this.data.info)
        });
    },
    goToFaultDes: function() {
        wx.navigateTo({
            url: "../repairDesWeb/repairDesWeb?model_id=" + this.data.phoneAttr.mould.id
        });
    }
});