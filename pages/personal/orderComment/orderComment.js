function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = require("../../../comm/script/fetch"), a = require("../../../comm/script/config"), o = new getApp();

Page({
    data: {
        deviceInfo: null,
        levelList: [ 1, 2, 3, 4, 5 ],
        grade: 0,
        imgUpdateCount: 0,
        showImgList: [],
        content: null,
        order_id: null,
        order_sn: null,
        textContent: "点击笑脸，评一评您的满意程度"
    },
    onLoad: function(t) {
        var e = {
            mould: t.mould,
            color: t.color,
            src: t.src,
            category: t.category
        };
        this.setData({
            order_id: t.id,
            order_sn: t.sn,
            deviceInfo: e
        });
    },
    onReady: function() {},
    onShow: function() {},
    changeLevel: function(t) {
        var e = "";
        switch (t.currentTarget.dataset.index) {
          case 1:
            e = "非常不满意";
            break;

          case 2:
            e = "不满，比较差";
            break;

          case 3:
            e = "一般，还需改善";
            break;

          case 4:
            e = "比较满意，有待改善";
            break;

          case 5:
            e = "非常满意，无可挑剔";
        }
        this.setData({
            grade: t.currentTarget.dataset.index,
            textContent: e
        });
    },
    chooseImage: function() {
        var e;
        e = this.data.showImgList.filter(function(t) {
            return t.src;
        }), this.setData({
            showImgList: e
        });
        var s = 9 - e.length;
        if (9 != e.length) {
            var n = this, i = o.globalData.hwxUserInfo.token;
            wx.chooseImage({
                count: s,
                success: function(e) {
                    var o = n.data.showImgList, s = n.data.showImgList.length;
                    e.tempFilePaths.forEach(function(t) {
                        var e = {};
                        e.src = "https://pic.hiweixiu.com/hiweixiu-mobile/img/loadzhanwei.jpeg", e.progress = 0, 
                        o.push(e);
                    }), n.setData({
                        showImgList: o
                    }), e.tempFilePaths.forEach(function(e, o) {
                        wx.uploadFile({
                            url: a.apiList.imageUpload + "?token=" + i,
                            filePath: e,
                            name: "imgs",
                            success: function(e) {
                                if (200 == JSON.parse(e.data).code) {
                                    var a, i = "showImgList[" + (o + s) + "].src", r = JSON.parse(e.data).data[0].img_url, c = n.data.imgUpdateCount;
                                    c += 1, n.setData((a = {}, t(a, i, r), t(a, "imgUpdateCount", c), a));
                                } else {
                                    wx.showToast({
                                        title: "上传失败",
                                        image: "../../../img/wx_index/warning.png",
                                        duration: 1500
                                    });
                                    i = "showImgList[" + (o + s) + "].src";
                                    n.setData(t({}, i, ""));
                                }
                            },
                            fail: function(e) {
                                wx.showToast({
                                    title: "上传失败",
                                    image: "../../../img/wx_index/warning.png",
                                    duration: 1500
                                });
                                var a = "showImgList[" + (o + s) + "].src";
                                n.setData(t({}, a, ""));
                            },
                            complete: function() {}
                        }).onProgressUpdate(function(e) {
                            var a = "showImgList[" + (o + s) + "].progress", i = e.progress;
                            n.setData(t({}, a, i));
                        });
                    });
                }
            });
        }
    },
    compressImage: function(t) {
        console.log(t);
        var e = this;
        wx.compressImage({
            src: t,
            quality: 10,
            success: function(t) {
                console.log("压缩成功"), console.log(t), wx.getFileInfo({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        console.log("res+++"), console.log(t);
                    }
                });
                var a = e.data.showImgList;
                a.push(t.tempFilePath), e.setData({
                    showImgList: a
                });
            },
            fail: function(t) {
                console.log("err"), console.log(t);
            }
        });
    },
    previewImage: function(t) {
        wx.previewImage({
            current: this.data.showImgList[t.currentTarget.dataset.index],
            urls: this.data.showImgList
        });
    },
    inputChange: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    comfirmComment: function() {
        var t = o.globalData.hwxUserInfo.token, a = this.data, s = a.grade, n = a.content, i = a.order_id, r = a.order_sn, c = [];
        this.data.showImgList.forEach(function(t) {
            var e = {};
            t.src && (e.img = t.src, c.push(e));
        });
        var g = {
            grade: s,
            content: n || "",
            order_id: i,
            order_sn: r,
            img: JSON.stringify(c)
        };
        e.commentOrder(t, g, function(t) {
            wx.showToast({
                title: "评论成功",
                icon: "success",
                duration: 1500
            }), setTimeout(function() {
                wx.navigateBack();
            }, 1500);
        }, function(t) {
            wx.showToast({
                title: "评论失败",
                image: "../../../img/wx_index/warning.png",
                duration: 1500
            });
        });
    }
});