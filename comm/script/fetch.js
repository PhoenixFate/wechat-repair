function e(e, r, a, o, s, c, d, p) {
    var u = {}, f = wx.getStorageSync("weixinadinfoaid");
    if (u = f ? {
        "x-hi-marketing-user-actions": JSON.stringify(f)
    } : {}, c && !t.isEmpty(r)) {
        r.clientType = i.clientType, r.version = i.version;
        var l = "";
        Object.keys(r).forEach(function(e, i, t) {
            l += "" + e + r[e];
        }), l = n.hexMD5(l);
        var g = n.hexMD5(l + i.recycleKey);
        r.sign = g;
    } else r.clientType = i.clientType, r.version = i.version;
    wx.request({
        url: e,
        data: r,
        method: a,
        header: u,
        success: function(e) {
            if (p && o(e.data), e.data.code == i.apiCode.success) d ? "function" == typeof o && o(e.data) : "function" == typeof o && o(e.data.data ? e.data.data : e.data); else if (e.data.code == i.apiCode.unauthorized) "function" == typeof s && s(e.data.mes), 
            wx.navigateTo({
                url: "/pages/personal/chooseLogin/chooseLogin",
                success: function(e) {},
                fail: function() {},
                complete: function() {}
            }); else if ("function" == typeof s) {
                if (e.data.mes) return void s(e.data.mes);
                if (e.data.message) return void s(e.data.message);
                s(e.data.msg);
            }
        },
        fail: function(e) {
            "function" == typeof s && s(i.strings.requestFail);
        },
        complete: function() {}
    });
}

var i = require("./config.js"), t = require("../../util/util"), n = require("../../util/md5");

module.exports = {
    request: e,
    postWeixinAid: function(t, n, r) {
        var a = t;
        e(i.apiList.weixinAid, a, "POST", n, r);
    },
    getNowtime: function(t, n) {
        var r = {};
        e(i.apiList.nowTime, r, "GET", t, n);
    },
    getVerifyCode: function(t, n, r, a, o, s) {
        var c = {
            img_code: t,
            img_id: n,
            phone_number: r,
            sms_id: a
        };
        e(i.apiList.sendCode, c, "POST", o, s);
    },
    doLoginWithPhone: function(t, n, r, a) {
        var o = {
            phone: t,
            verification_code: n
        };
        e(i.apiList.doLogin, o, "POST", r, a);
    },
    getBrands: function(t, n) {
        var r = {};
        e(i.apiList.brandList, r, "POST", t, n);
    },
    getDevices: function(t, n, r) {
        var a = {
            brand_id: t,
            group_by: "series"
        };
        e(i.apiList.mouldList, a, "POST", n, r);
    },
    getBannerList: function(t, n) {
        wx.getStorageSync("kCurrentUser");
        var r = {};
        e(i.apiList.homeBanner, r, "GET", t, n);
    },
    getRepairCenter: function(t, n, r, a) {
        var o = {
            lat: t,
            lng: n
        };
        e(i.apiList.center, o, "POST", r, a);
    },
    getRepairMsg: function(t, n, r, a, o, s, c, d, p, u) {
        var f = {
            moudleid: t,
            faulttype: n,
            brandid: r,
            colorid: a,
            productid: o,
            type: s,
            name: c,
            repairprice_colorid: d
        };
        e(i.apiList.repairMsg, f, "GET", p, u);
    },
    getMouldMine: function(t, n, r, a, o) {
        var s = {
            mould_name: n,
            brands: t,
            device_name: r
        };
        e(i.apiList.mineMould, s, "GET", a, o);
    },
    getHotMould: function(t, n, r, a) {
        var o = {
            mould_name: n,
            brands: t
        };
        e(i.apiList.hotMould, o, "GET", r, a);
    },
    getactivityInfo: function(t, n, r) {
        var a = {
            site: "miniprogram",
            position: t
        };
        e(i.apiList.activityInfo, a, "GET", n, r);
    },
    getMouldDetail: function(t, n, r) {
        var a = {
            mould_id: t
        };
        e(i.apiList.mouldDetail, a, "GET", n, r);
    },
    getMouldAttr: function(t, n, r, a) {
        var o = {
            color_id: n,
            mould_id: t
        };
        e(i.apiList.mouldAttr, o, "POST", r, a);
    },
    getIsLogin: function(t, n, r) {
        var a = {
            token: t
        };
        e(i.apiList.isLogin, a, "GET", n, r);
    },
    getWxLogin: function(t, n, r, a, o) {
        var s = {
            code: t,
            encryptedData: n,
            iv: r
        };
        e(i.apiList.wxLogin, s, "POST", a, o);
    },
    getWayList: function(t, n, r, a) {
        var o = {
            city_id: t,
            rp_id: n
        };
        e(i.apiList.wayList, o, "GET", r, a);
    },
    getRepairTime: function(t, n, r, a) {
        var o = {
            city: t,
            district: n
        };
        e(i.apiList.repairTime, o, "POST", r, a);
    },
    getCenterList: function(t, n) {
        var r = {};
        e(i.apiList.centerList, r, "GET", t, n);
    },
    getCouponUseable: function(t, n, r, a, o) {
        var s = {
            rp_id: n,
            city: r
        };
        e(i.apiList.couponUseable + "?token=" + t, s, "POST", a, o);
    },
    getUseCoupon: function(t, n, r, a) {
        var o = {
            coupon_code: n.coupon_code,
            city: n.city,
            district: n.district,
            plan_id: n.plan_id,
            is_warrantable: n.is_warrantable,
            category: n.category,
            reserve_time: n.reserve_time,
            reserve_time2: n.reserve_time2
        };
        n.plan_id2 && (o.plan_id2 = n.plan_id2), e(i.apiList.useCoupon + "?token=" + t, o, "POST", r, a);
    },
    getMyCoupon: function(t, n, r, a) {
        var o = {
            type: n
        };
        e(i.apiList.myCoupon + "?token=" + t, o, "POST", r, a);
    },
    getUserDataList: function(t, n, r) {
        var a = {};
        e(i.apiList.userDataList + "?token=" + t, a, "GET", n, r);
    },
    getCityPrice: function(t, n, r) {
        var a = {
            city_id: t.city_id,
            rp_id: t.rp_id,
            is_warrantable: t.is_warrantable,
            category: t.category,
            district_id: t.district_id,
            reserve_time: t.reserve_time,
            reserve_time2: t.reserve_time2
        };
        t.rp_id2 && (a.rp_id2 = t.rp_id2), e(i.apiList.cityPrice, a, "POST", n, r);
    },
    getCreateOrder: function(t, n, r, a) {
        var o = "";
        wx.getStorageSync("weixinadinfoaid") && (o = "&ref=youzangg");
        var s = {
            rp_id: n.rp_id,
            coupon_code: n.coupon_code,
            imei: n.imei,
            weixiucenter_id: n.weixiucenter_id,
            category: n.category,
            is_warrantable: n.is_warrantable,
            reserve_time: n.reserve_time,
            reserve_time2: n.reserve_time2,
            remark: n.remark,
            user_address_id: n.user_address_id
        };
        n.rp_id2 && (s.rp_id2 = n.rp_id2), e(i.apiList.createOrder + "?token=" + t + o, s, "POST", r, a);
    },
    getQuickOrder: function(t, n, r, a) {
        var o = {
            user_address_id: n.user_address_id,
            user_name: n.user_name,
            phone_number: n.phone_number,
            province: n.province,
            city: n.city,
            district: n.district,
            is_default_address: n.is_default_address,
            address_detail: n.address_detail
        };
        e(i.apiList.quickOrder + "?token=" + t, o, "POST", r, a);
    },
    getDefaultAddress: function(t, n, r) {
        var a = {
            token: t
        };
        e(i.apiList.defaultAddress, a, "GET", n, r);
    },
    getPackCoupon: function(t, n, r) {
        var a = {
            rp_id: t
        };
        e(i.apiList.packCoupon, a, "GET", n, r);
    },
    getSaveAddress: function(t, n, r, a) {
        var n = {
            id: n.id,
            user_name: n.user_name,
            mobile: n.mobile,
            province_id: n.province_id,
            city_id: n.city_id,
            district_id: n.district_id,
            address: n.address,
            is_default: n.is_default
        };
        e(i.apiList.saveAddress + "?token=" + t, n, "POST", r, a);
    },
    getAllCityData: function(t, n) {
        var r = {
            type: "1"
        };
        e(i.apiList.getAllCity, r, "POST", t, n);
    },
    getAddressList: function(t, n, r) {
        var a = {
            token: t
        };
        e(i.apiList.addressList, a, "GET", n, r);
    },
    getDelateAddress: function(t, n, r, a) {
        var o = {
            id: n
        };
        e(i.apiList.delateAddress + "?token=" + t, o, "POST", r, a);
    },
    getSearchDevice: function(t, n, r) {
        var a = {
            word: t
        };
        e(i.apiList.searchDevice, a, "POST", n, r);
    },
    getAllFaults: function(t, n) {
        var r = {
            type: "2x"
        };
        e(i.apiList.faultList, r, "GET", t, n);
    },
    getStoreList: function(t, n) {
        var r = {};
        e(i.apiList.storeList, r, "GET", t, n);
    },
    getReminders: function(t, n) {
        var r = {};
        e(i.apiList.reminders, r, "POST", t, n);
    },
    getMemoryUp: function(t, n) {
        var r = {};
        e(i.apiList.memoryUp, r, "POST", t, n);
    },
    getImgCode: function(t, n, r) {
        var a = {
            img_id: t
        };
        e(i.apiList.imgCode, a, "POST", n, r);
    },
    getInvalidImgCode: function(t, n, r, a) {
        var o = {
            img_code: t,
            img_id: n
        };
        e(i.apiList.invalidImgCode, o, "POST", r, a, "", "", !0);
    },
    getPersonalOrderList: function(t, n, r, a) {
        var o = {
            type: n
        };
        e(i.apiList.personalOrderList + "?token=" + t, o, "POST", r, a);
    },
    getOrderDetail: function(t, n, r, a, o, s) {
        var c = {
            type: n,
            order_id: r,
            order_sn: a
        };
        e(i.apiList.orderDetail + "?token=" + t, c, "post", o, s);
    },
    refreshEngineerLocation: function(t, n, r, a) {
        var o = {
            number: n
        };
        e(i.apiList.engineerLocation + "?token=" + t, o, "post", r, a);
    },
    getExpressList: function(t, n, r) {
        var a = {};
        e(i.apiList.expressList + "?token=" + t, a, "post", n, r);
    },
    postDevice: function(t, n, r, a) {
        e(i.apiList.devicePost + "?token=" + t, n, "post", r, a);
    },
    getExpressInfo: function(t, n, r, a, o) {
        var s = {
            brand_id: n,
            express_code: r
        };
        e(i.apiList.expressInfo + "?token=" + t, s, "post", a, o);
    },
    getCancelReason: function(t, n, r, a) {
        var o = {
            type: n
        };
        e(i.apiList.cancelReason + "?token=" + t, o, "post", r, a);
    },
    cancelOrder: function(t, n, r, a, o, s, c, d) {
        var p = {
            order_id: n,
            order_sn: r,
            type: a,
            cancel_id: o,
            cancel: s
        };
        e(i.apiList.orderCancel + "?token=" + t, p, "post", c, d);
    },
    commentOrder: function(t, n, r, a) {
        e(i.apiList.commentOrder + "?token=" + t, n, "post", r, a);
    },
    getOpenid: function(t, n, r) {
        e(i.apiList.openid, t, "post", n, r);
    },
    getHotRecycle: function(t, n) {
        var r = {};
        e(i.apiList.hotRecycle, r, "post", t, n);
    },
    getMyDevicePrice: function(t, n, r) {
        e(i.apiList.myDevicePrice, t, "post", n, r);
    },
    getNearbyRepaircenter: function(t, n, r) {
        e(i.apiList.nearbyRepaircenter, t, "post", n, r);
    },
    getMyCouponList: function(t, n, r, a) {
        var o = {
            type: n
        };
        e(i.apiList.myCoupon + "?token=" + t, o, "POST", r, a);
    },
    searchModel: function(t, n, r) {
        e(i.apiList.modelSearch, t, "post", n, r);
    },
    getRecycleModelList: function(t, n) {
        var r = {};
        e(i.apiList.recycleModelList, r, "post", t, n);
    },
    getFaultSelect: function(t, n, r) {
        e(i.apiList.faultSelect, t, "get", n, r);
    },
    getFaultPrice: function(t, n, r) {
        e(i.apiList.faultPrice, t, "post", n, r);
    },
    getRecycleVoucher: function(t, n, r, a) {
        e(i.apiList.recycleVoucher + "?token=" + t, n || {}, "post", r, a);
    },
    phoneSheild: function(i, t, n) {
        e(i, {}, "get", t, n);
    },
    createRecycleOrder: function(t, n, r, a) {
        e(i.apiList.createRecycleOrder + "?token=" + t, n, "post", r, a);
    },
    getIndexPageNav: function(t, n) {
        var r = {};
        e(i.apiList.indexPageNav, r, "GET", t, n);
    },
    getFuliBanner: function(t, n, r) {
        var a = {};
        e(i.apiList.fuliBanner + "?token=" + t, a, "GET", n, r);
    },
    getFulicouponList: function(t, n, r, a) {
        e(i.apiList.fulicouponList + "?token=" + t, n, "POST", r, a);
    },
    getFulishecoupon: function(t, n, r, a) {
        e(i.apiList.fulishecouponget + "?token=" + t, n, "POST", r, a);
    },
    getRecyclecoupon: function(t, n, r, a) {
        e(i.apiList.recyclecouponget + "?token=" + t, n, "POST", r, a);
    }
};