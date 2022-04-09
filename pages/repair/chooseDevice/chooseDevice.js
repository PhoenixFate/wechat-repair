var t = require("../../../comm/script/fetch"), a = (require("../../../comm/script/config"), 
require("../../../util/util")), e = getApp();

Page({
    data: {
        isShow: !1,
        scrollTop: 0,
        windowHeight: 0,
        rate: 0,
        onlyPhone: !1,
        scrollHeight: 0,
        myMouldInfo: {},
        type: 1,
        brandList: [],
        typeLIst: [],
        padList: [],
        selectedBrand: {},
        tyleIndex: 0,
        faultInfo: [],
        animate: !1,
        phoneList: [],
        scrollWidth: 0
    },
    imgLoad: function() {
        this.setData({
            animate: !0
        });
    },
    onLoad: function(t) {
        var a = this;
        t.tyleIndex && this.setData({
            tyleIndex: t.tyleIndex
        }), a.setData({
            myMouldInfo: e.globalData.hwxDeviceInfo
        }), this.loadBrandList(), wx.getSystemInfo({
            success: function(t) {
                var e = t.windowWidth / 750, i = t.windowHeight - 210 * e;
                a.setData({
                    windowHeight: t.windowHeight,
                    rate: e,
                    scrollHeight: i + "px"
                });
            }
        });
    },
    imageError: function(t) {
        var a = this, e = t.currentTarget.dataset.phoneindex, i = a.data.typeLIst[a.data.tyleIndex].devices;
        for (var n in i) n == e && (i[n].src = "../../../img/wx_repair/default.png");
        a.data.typeLIst[a.data.tyleIndex].devices = i, a.setData({
            typeLIst: a.data.typeLIst
        });
    },
    loadBrandList: function() {
        var a = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), a.setData({
            maskHidden: !1
        }), t.getBrands.call(a, function(t) {
            a.setData({
                brandList: t
            }), a.data.brandList.length > 0 && (a.setData({
                selectedBrand: a.data.brandList[0]
            }), a.loadMouldList());
        }, function(t) {
            wx.hideLoading(), wx.showToast({
                title: t,
                icon: "none",
                duration: 1e3
            });
        });
    },
    loadMouldList: function() {
        var e = this;
        t.getDevices.call(e, e.data.selectedBrand.brand_id, function(t) {
            console.log("data++++"), console.log(t), e.setData({
                scrollTop: 0,
                typeLIst: t
            }), console.log(255 * i + "rpx");
            var i = t.length;
            if (t.length > 1 && e.setData({
                scrollWidth: 150 * i + 40 + "rpx"
            }), a.isExist(e.data.myMouldInfo)) if (e.data.onlyPhone) {
                var n = e.data.windowHeight - 88 * e.data.rate;
                e.setData({
                    scrollHeight: n + "px"
                });
            } else {
                var o = e.data.windowHeight - 210 * e.data.rate;
                e.setData({
                    scrollHeight: o + "px"
                });
            } else if (e.data.onlyPhone) {
                var d = e.data.windowHeight;
                e.setData({
                    scrollHeight: d + "px"
                });
            } else {
                var s = e.data.windowHeight - 120 * e.data.rate;
                e.setData({
                    scrollHeight: s + "px"
                });
            }
            e.setData({
                isShow: !0,
                maskHidden: !0
            }), wx.hideLoading();
        }, function(t) {
            wx.hideLoading(), wx.showToast({
                title: t,
                icon: "none",
                duration: 1e3
            });
        });
    },
    selectType: function(t) {
        if (t.currentTarget) {
            var a = t.currentTarget.dataset;
            this.setData({
                tyleIndex: a.index
            });
        }
    },
    selectBrand: function(t) {
        var a = this, e = t.currentTarget.dataset.idx;
        if (t.currentTarget.dataset.id != a.data.selectedBrand.Id) {
            var i = a.data.brandList[e];
            a.setData({
                selectedBrand: i,
                tyleIndex: 0,
                animate: !1
            }), a.loadMouldList();
        }
    },
    goToSearch: function() {
        wx.navigateTo({
            url: "../searchDevice/searchDevice"
        });
    },
    selectPhone: function(t) {
        var a = t.currentTarget.dataset;
        a.id = a.mouldid;
        var e = JSON.stringify(a);
        wx.redirectTo({
            url: "../faultDetail/faultDetail?info=" + e
        });
    },
    stopTouchMove: function() {},
    stopTap: function() {}
});