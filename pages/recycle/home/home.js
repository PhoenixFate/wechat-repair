var e = require("../../../comm/script/fetch"), t = (require("../../../comm/script/config"), 
getApp());

Page({
    data: {
        deviceInfo: null,
        hotRecycleData: [],
        myModelName: "",
        nearbyRepaircenter: null,
        isGlocation: !1
    },
    onLoad: function(e) {
        wx.showLoading(), wx.showNavigationBarLoading();
        var a = t.globalData.wxDeviceInfo;
        console.log("deviceInfo____"), console.log(a);
        var n, o, i;
        n = a.brand, o = a.model, i = t.handleModel(n, o), console.log("newModel++++++"), 
        console.log(i), "unknown" == i && o.match(/<(\S*)>/)[1], this.setData({
            myModelName: i
        }), this.getMyDevicePrice(i), this.getHotRecycle();
        var r = this;
        wx.getLocation({
            type: "wgs84",
            success: function(e) {
                var t = e.latitude, a = {
                    lng: e.longitude,
                    lat: t
                };
                r.setData({
                    isGlocation: !0
                }), r.getRepairCenter(a);
            },
            fail: function(e) {
                var t = {
                    lng: 121.457189,
                    lat: 31.243703
                };
                r.setData({
                    isGlocation: !1
                }), r.getRepairCenter(t);
            }
        });
    },
    getRepairCenter: function(t) {
        var a = this;
        e.getNearbyRepaircenter(t, function(e) {
            e.distance < 100 && e.distance ? e.nearDistance = e.distance.toFixed(1) + "米" : e.nearDistance = (e.distance / 1e3).toFixed(1) + "公里", 
            a.setData({
                nearbyRepaircenter: e
            });
        }, function(e) {
            console.log("err"), console.log(e);
        });
    },
    getHotRecycle: function() {
        var t = this;
        e.getHotRecycle(function(e) {
            t.setData({
                hotRecycleData: e
            });
        });
    },
    getMyDevicePrice: function(t) {
        var a = this, n = {
            model_name: t
        };
        e.getMyDevicePrice(n, function(e) {
            a.setData({
                deviceInfo: e
            }), wx.hideLoading(), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, function(e) {
            console.log("err"), console.log(e), a.setData({
                deviceInfo: null
            }), wx.hideLoading(), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.getMyDevicePrice(this.data.myModelName);
    },
    changeModel: function() {
        wx.navigateTo({
            url: "../phonelist/phonelist"
        });
    },
    getPrice: function(e) {
        var t = e.currentTarget.dataset.mid, a = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: "../faultprice/faultprice?mid=" + t + "&name=" + a
        });
    },
    goNavTab: function(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.set
        });
    },
    goTab: function(e) {
        wx.switchTab({
            url: e.currentTarget.dataset.set
        });
    },
    openLocation: function(e) {
        wx.openLocation({
            latitude: Number(e.currentTarget.dataset.lat),
            longitude: Number(e.currentTarget.dataset.lng),
            scale: 18
        });
    },
    goOtherRepaircenter: function() {
        wx.navigateTo({
            url: "../../storeAddress/storeAddress"
        });
    },
    goGujia: function(e) {
        var t = e.currentTarget.dataset.mid, a = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: "../faultprice/faultprice?mid=" + t + "&name=" + a
        });
    },
    goSearchPage: function() {
        wx.navigateTo({
            url: "../searchmodel/searchmodel"
        });
    }
});