require("../../../comm/script/config");

var t = require("../../../comm/script/fetch");

require("../../../util/util"), getApp();

Page({
    data: {
        inputShowed: !1,
        latestSearchShow: !0,
        searchResultShow: !1,
        noResultShow: !1,
        haveResultShow: !1,
        resultList: "",
        searchData: [],
        word: ""
    },
    showInput: function() {
        this.setData({
            inputShowed: !0
        });
    },
    hideInput: function() {
        this.setData({
            word: "",
            inputShowed: !1,
            latestSearchShow: !0,
            searchResultShow: !1
        }), this.searchStorge();
    },
    clearInput: function() {
        this.setData({
            word: "",
            latestSearchShow: !0,
            searchResultShow: !1
        }), this.searchStorge();
    },
    inputTyping: function(t) {
        this.setData({
            word: t.detail.value
        });
    },
    searchInputAction: function(t) {
        this.data.word = t.detail.value, this.setSearchStorage(), this.searchRequest();
    },
    searchRequest: function() {
        var e = this;
        wx.showLoading({
            title: "正在搜索",
            mask: !0
        });
        var a = e.data.word;
        t.getSearchDevice(a, function(t) {
            wx.hideLoading(), console.log(t), e.setData({
                latestSearchShow: !1,
                searchResultShow: !0,
                noResultShow: !1,
                haveResultShow: !0,
                resultList: t
            });
        }, function(t) {
            wx.hideLoading(), e.setData({
                latestSearchShow: !1,
                searchResultShow: !0,
                noResultShow: !0,
                haveResultShow: !1,
                resultList: ""
            });
        });
    },
    setSearchStorage: function() {
        if ("" != this.data.word) {
            var t = wx.getStorageSync("searchData") || [];
            t.push(this.data.word), wx.setStorageSync("searchData", t);
        }
    },
    searchLatest: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.latestword;
        this.setData({
            word: e,
            inputShowed: !0
        }), this.searchRequest();
    },
    historyDelate: function() {
        wx.clearStorageSync("searchData"), this.setData({
            searchData: []
        });
    },
    goToDevice: function(t) {
        var e = JSON.stringify(t.currentTarget.dataset);
        wx.redirectTo({
            url: "../faultDetail/faultDetail?info=" + e
        });
    },
    searchStorge: function() {
        var t = wx.getStorageSync("searchData");
        console.log(wx.getStorageSync("searchData")), "" != t ? this.setData({
            latestSearchShow: !0,
            searchData: t.reverse()
        }) : this.setData({
            latestSearchShow: !1
        });
    },
    onLoad: function() {
        this.searchStorge();
    }
});