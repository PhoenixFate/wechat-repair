require("../../../util/util");

var e = require("../../../comm/script/fetch"), t = require("../../../comm/script/config"), a = getApp();

Page({
    data: {
        isShow: !1,
        pageName: "home",
        indicatorDots: !1,
        vertical: !1,
        autoplay: !0,
        interval: 3e3,
        duration: 500,
        active_color: "#ffffff",
        userInfo: {},
        bannerList: [],
        hotFixList: {},
        selectedDevice: {},
        showRefresher: !1,
        goToChooseDevice: !0,
        minePhoneOk: !1,
        hotFixOk: !1,
        bannerActive: 0,
        latitude: "",
        longitude: "",
        repairCenter: "",
        actionSheetHidden: !0,
        menu: "",
        isLogin: !1,
        selfModelShow: !0,
        hotMouldData: [],
        selectIndex: 0,
        giftShow: !1,
        activityInfoData: "",
        navArr: [],
        activityArr: [],
        couponArr: []
    },
    openPhoneLocation: function(e) {
        wx.openLocation({
            latitude: Number(e.currentTarget.dataset.lat),
            longitude: Number(e.currentTarget.dataset.lng),
            scale: 18
        });
    },
    onReady: function(t) {
        var a = this;
        wx.getLocation({
            type: "wgs84",
            success: function(t) {
                var i = t.latitude, o = t.longitude;
                a.setData({
                    latitude: i,
                    longitude: o
                }), e.getRepairCenter.call(a, t.latitude, t.longitude, function(e) {
                    e.distance < 100 && e.distance ? e.nearDistance = e.distance.toFixed(1) + "米" : e.nearDistance = (e.distance / 1e3).toFixed(1) + "公里", 
                    console.log(e), a.setData({
                        repairCenter: e
                    });
                }, function(e) {
                    a.showRefresher();
                });
            },
            fail: function() {
                e.getRepairCenter.call(a, 31.22352, 121.45591, function(e) {
                    a.setData({
                        repairCenter: e
                    });
                }, function(e) {
                    a.showRefresher();
                });
            }
        }), this.setData({
            giftShow: !0
        }), this.getDialogInfo();
    },
    onLoad: function(t) {
        var a = t.weixinadinfo;
        t.goHiYouxuan;
        if (wx.removeStorageSync("weixinadinfoaid"), a) {
            a.split(".");
            wx.setStorageSync("weixinadinfoaid", t), e.postWeixinAid.call(i, t, function(e) {}, function(e) {
                i.showRefresher();
            });
        }
        var i = this;
        i.setData({
            showRefresher: !1
        }), wx.startAccelerometer(function(e) {}, function(e) {}), wx.showLoading || wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法正常使用小程序，请升级到最新微信版本后重试。",
            complete: function() {
                wx.navigateBack();
            }
        }), wx.showNavigationBarLoading(), wx.showLoading({
            title: "加载中",
            mask: !0
        }), i.ifShowPage(), i.getNowTime();
    },
    getPhoneNumber: function(t) {
        var i = t.currentTarget.dataset.origin, o = encodeURIComponent(t.detail.iv), n = encodeURIComponent(t.detail.encryptedData), r = this;
        wx.login({
            success: function(t) {
                e.getWxLogin(encodeURIComponent(t.code), n, o, function(e) {
                    a.setHwxUserInfo(e.token, e.phone_number), r.setData({
                        isLogin: !0
                    }), "goToOneKeyOrder" == i ? r.goToOneKeyOrder() : "new" == i ? r.goToGift("new") : "dialog" == i && r.dialogTo();
                }, function(e) {
                    wx.showToast({
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
    onShow: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userLocation"] ? t.setData({
                    mapOpen: !0
                }) : t.setData({
                    mapOpen: !1
                });
            }
        });
        var i = a.globalData.hwxUserInfo.phone, o = a.globalData.hwxUserInfo.token;
        i && o && e.getIsLogin(o, function(e) {
            "1" == e.is_login ? t.setData({
                isLogin: !0
            }) : t.setData({
                isLogin: !1
            });
        }, function(e) {
            t.setData({
                isLogin: !1
            });
        });
    },
    onPullDownRefresh: function() {
        var e = this;
        wx.showNavigationBarLoading(), e.getNowTime();
    },
    onShareAppMessage: function(e) {
        return {
            title: "小马维修手机上门维修回收平台",
            path: "/pages/repair/home/home",
            success: function(e) {},
            fail: function(e) {}
        };
    },
    getNowTime: function() {
        var t = this;
        e.getNowtime.call(t, function(e) {
            var i = parseInt(new Date().getTime() / 1e3), o = e.now_time, n = Number(o) - Number(i);
            a.setTimeDifference(n), t.getBannerList(), t.getHwxDeviceInfo(), t.getIndexPageNav();
        }, function(e) {
            t.showRefresher();
        });
    },
    getIndexPageNav: function() {
        var t = this, a = [], i = [], o = [];
        e.getIndexPageNav(function(e) {
            e.forEach(function(e, t) {
                console.log("------------e-----------")
                console.log(e)
                console.log("------------t-----------")
                console.log(t)
                if(t==0){
                    e["name"]="修电脑"
                }
                t < 4 ? a.push(e) : t >= 4 && t < 7 ? i.push(e) : o.push(e);
            }), t.setData({
                navArr: a,
                activityArr: i,
                couponArr: o
            }), console.log("res-----------------------"), console.log(t.data.navArr), console.log(t.data.activityArr), 
            console.log(t.data.couponArr);
        }, function(e) {});
    },
    getHwxDeviceInfo: function() {
        var t, i, o, n, r = this, c = a.globalData.wxDeviceInfo;
        t = c.brand, i = c.model, n = "", "unknown" == (o = a.handleModel(t, i)) && (n = i.match(/<(\S*)>/)[1]), 
        e.getMouldMine(t, encodeURIComponent(o), n, function(e) {
            r.setData({
                selectedDevice: e,
                minePhoneOk: !0
            }), e.price_range ? r.setData({
                goToChooseDevice: !1
            }) : r.setData({
                goToChooseDevice: !0
            }), r.ifShowPage(), a.setHiDeviceInfo(e), r.setSelectedDeviceInfo();
        }, function(e) {
            r.setData({
                selfModelShow: !1,
                minePhoneOk: !0
            }), r.ifShowPage();
        }), e.getHotMould(t, encodeURIComponent(o), function(e) {
            r.setData({
                hotMouldData: e,
                hotFixOk: !0
            }), r.ifShowPage();
        }, function(e) {
            r.setData({
                hotFixOk: !0
            }), r.ifShowPage();
        });
    },
    getBannerList: function() {
        var t = this;
        e.getBannerList.call(t, function(e) {
            t.setData({
                bannerList: e
            }), e.length > 1 && t.setData({
                indicatorDots: !0
            });
        }, function(e) {
            t.showRefresher();
        });
    },
    bindIcon: function(e) {
        var t = e.currentTarget.dataset;
        this.data.selectedDevice.faultid = t.faultid, this.data.selectedDevice.name = t.name, 
        this.data.selectedDevice.id = t.id || this.data.selectedDevice.id, this.data.selectedDevice.color_id = t.color_id, 
        this.data.selectedDevice.rp_id = t.rp_id;
        var a = JSON.stringify(this.data.selectedDevice);
        this.goToFaultDetail(a);
    },
    goToFaultDetail: function(e) {
        if (e.currentTarget) t = JSON.stringify(e.currentTarget.dataset); else var t = e;
        wx.navigateTo({
            url: "../faultDetail/faultDetail?info=" + t
        });
    },
    goToChooseDevice: function(e) {
        var t = e.currentTarget.dataset;
        t.mouldid = t.id, wx.navigateTo({
            url: "../chooseDevice/chooseDevice?faultInfo=" + JSON.stringify(t)
        });
    },
    goToOneKeyOrder: function() {
        wx.navigateTo({
            url: "../oneKeyOrder/oneKeyOrder"
        });
    },
    goToTestHome: function() {
        wx.navigateTo({
            url: "../../testPages/testHome/testHome"
        });
    },
    goToMemoryUp: function() {
        wx.navigateTo({
            url: "../memoryUp/memoryUp"
        });
    },
    goToAboutus: function() {
        wx.navigateTo({
            url: "../aboutusWeb/aboutusWeb"
        });
    },
    goToServiceFlow: function() {
        wx.navigateTo({
            url: "../serviceFlowWeb/serviceFlowWeb"
        });
    },
    goToUserAgreement: function() {
        wx.navigateTo({
            url: "../userAgreementWeb/userAgreementWeb"
        });
    },
    goToRecycle: function() {
        wx.switchTab({
            url: "../../recycle/homeWeb208/homeWeb208"
        });
    },
    goToSelectFault: function(e) {
        var t = e.currentTarget.dataset, a = "";
        switch (t.name) {
          case "换屏幕":
            a = "screen";
            break;

          case "内存升级":
            a = "memory";
            break;

          case "换电池":
            a = "dc";
        }
        a ? wx.navigateTo({
            url: "../activityWeb190925/activityWeb190925?type=" + a
        }) : "一键下单" == t.name ? wx.navigateTo({
            url: "../oneKeyOrder/oneKeyOrder"
        }) : wx.navigateTo({
            url: "../chooseDevice/chooseDevice?tyleIndex=" + t.index
        });
    },
    activityJump: function(e) {
        var t = e.currentTarget.dataset;
        wx.navigateTo({
            url: "../activityWeb190925/activityWeb190925?type=" + t.type
        });
    },
    goToStoreAddress: function() {
        wx.navigateTo({
            url: "../../storeAddress/storeAddress"
        });
    },
    setSelectedDeviceInfo: function() {
        try {
            wx.setStorageSync(t.storageKeys.selectedDevice, a.globalData.hwxDeviceInfo);
        } catch (e) {}
    },
    ifShowPage: function() {
        this.data.minePhoneOk && this.data.hotFixOk && (wx.hideLoading(), wx.stopPullDownRefresh(), 
        this.hideRefresher());
    },
    showRefresher: function() {
        this.setData({
            isShow: !1,
            showRefresher: !0
        }), wx.hideLoading(), wx.hideNavigationBarLoading();
    },
    hideRefresher: function() {
        this.setData({
            isShow: !0,
            showRefresher: !1
        }), wx.hideLoading(), wx.hideNavigationBarLoading();
    },
    toJichuandijia: function() {
        wx.navigateTo({
            url: "../../bannerLink/jichuandijia/jichuandijia"
        });
    },
    actionSheetTap: function() {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        });
    },
    actionSheetbindchange: function() {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        });
    },
    bindMenu1: function() {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        }), wx.makePhoneCall({
            phoneNumber: "4000171010"
        });
    },
    bindMenu2: function() {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        });
    },
    intoMap: function() {
        var e = this;
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                t.latitude, t.longitude;
                wx.openLocation({
                    latitude: Number(e.data.repairCenter.lat),
                    longitude: Number(e.data.repairCenter.lng),
                    name: e.data.repairCenter.name,
                    address: e.data.repairCenter.address,
                    scale: 28
                });
            }
        });
    },
    bannerJump: function(e) {
        var t = e.target.dataset;
        "" != t.jump && ("https://api.hiweixiu.com/era/v1/test/test" == t.jump ? wx.navigateToMiniProgram({
            appId: "wx05173ac0eee13384",
            path: "pages/home/feature/index?alias=Syc7OVQHlR",
            extraData: {
                foo: "bar"
            },
            success: function(e) {}
        }) : "hiyouxuan" == t.jump ? wx.navigateToMiniProgram({
            appId: "wx05173ac0eee13384",
            path: "pages/common/blank-page/index?weappSharePath=pages/home/dashboard/index?kdt_id=40983300",
            extraData: {
                foo: "bar"
            },
            success: function(e) {}
        }) : wx.navigateTo({
            url: "../bannerWeb/bannerWeb?info=" + encodeURIComponent(t.jump)
        }));
    },
    selectHot: function(e) {
        var t = e.currentTarget.dataset;
        this.setData({
            selectIndex: t.index
        });
    },
    callCenter: function(e) {
        var t = e.currentTarget.dataset;
        wx.makePhoneCall({
            phoneNumber: t.phone
        });
    },
    stopTouchMove: function() {},
    stopTap: function() {},
    closeDialog: function() {
        this.setData({
            giftShow: !1
        });
    },
    goToGift: function(e) {
        wx.navigateTo({
            url: "../homeGiftWeb/homeGiftWeb"
        }), this.setData({
            giftShow: !1
        });
    },
    getDialogInfo: function() {
        var t = this;
        e.getactivityInfo.call(t, "home", function(e) {
            t.setData({
                activityInfoData: e
            });
        }, function(e) {
            t.setData({
                activityInfoData: "",
                giftShow: !1
            });
        });
    },
    dialogTo: function() {
        if (1 == this.data.activityInfoData.switch) switch (this.data.activityInfoData.link_type) {
          case "1":
            this.goToLocalPath();
            break;

          case "2":
            this.goToMiniProgram();
            break;

          case "3":
            this.goToWebView();
            break;

          default:
            console.log(this.data.activityInfoData.link_type);
        }
    },
    goToWebView: function() {
        wx.navigateTo({
            url: "../homeGiftWeb/homeGiftWeb?href=" + this.data.activityInfoData.link_url
        });
    },
    goToLocalPath: function() {
        wx.navigateTo({
            url: this.data.activityInfoData.link_url
        });
    },
    goToMiniProgram: function() {
        wx.navigateToMiniProgram({
            appId: this.data.activityInfoData.appid,
            path: this.data.activityInfoData.link_url,
            extarData: {
                open: "auth"
            },
            success: function(e) {}
        });
    },
    navigatoTo: function(e) {
        "一元拍手机" == e.currentTarget.dataset.name ? wx.showToast({
            title: "敬请期待",
            icon: "none",
            image: "",
            duration: 1500
        }) : wx.navigateTo({
            url: "../fulishe/fulishe"
        });
    }
});