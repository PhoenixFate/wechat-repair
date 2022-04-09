var t = require("../../../comm/script/fetch"), o = getApp();

Page({
    data: {
        phone: "",
        phoneFocus: !1,
        sms_id: "",
        smsFocus: !1,
        code: "",
        codeFocus: !1,
        second: 60,
        phoneImgUrl: "",
        codeImgUrl: "",
        getSmsCode: "获取验证码",
        getAuthCodeTextColor: "#ACA3A3",
        disabled: !0,
        hasSubmit: !1,
        imgData: "",
        img_id: "",
        img_code: ""
    },
    onLoad: function(t) {
        this.getImgCode(), this.setData({
            phoneImgUrl: "https://pic.hiweixiu.com/hiweixiu-app/weapp/img/17020409.png",
            codeImgUrl: "https://pic.hiweixiu.com/hiweixiu-app/weapp/img/17020410.png",
            getAuthCodeTextColor: "#ACA3A3",
            loginBackgroundColor: "#ACA3A3"
        });
    },
    inputPhone: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    inputPhoneFocus: function() {
        this.setData({
            phoneFocus: !0
        });
    },
    inputPhoneBlur: function() {
        this.data.phone ? this.setData({
            phoneFocus: !0
        }) : this.setData({
            phoneFocus: !1
        });
    },
    inputImgCode: function(t) {
        this.setData({
            img_code: t.detail.value
        }), t.detail.value.length < 4 && this.setData({
            disabled: !0,
            getAuthCodeTextColor: "#ACA3A3"
        }), 4 === t.detail.value.length && this.data.disabled && this.setData({
            disabled: !1,
            getAuthCodeTextColor: "#FF7A00"
        });
    },
    inputImgCodeFocus: function() {
        this.setData({
            codeFocus: !0
        });
    },
    inputImgCodeBlur: function() {
        this.data.img_code ? this.setData({
            codeFocus: !0
        }) : this.setData({
            codeFocus: !1
        });
    },
    inputCode: function(t) {
        this.setData({
            code: t.detail.value
        });
    },
    inputCodeFocus: function() {
        this.setData({
            smsFocus: !0
        });
    },
    inputCodeBlur: function() {
        this.data.code ? this.setData({
            smsFocus: !0
        }) : this.setData({
            smsFocus: !1
        });
    },
    countdown: function(t) {
        var o = t.data.second;
        if (0 === o) return t.setData({
            second: 60,
            getSmsCode: "获取验证码"
        }), void (11 === t.data.phone.length && t.data.disabled && this.setData({
            disabled: !1,
            getAuthCodeTextColor: "#FF7A00"
        }));
        setTimeout(function() {
            t.setData({
                second: o - 1,
                getSmsCode: "(" + o + ")重新发送",
                getAuthCodeTextColor: "#ACA3A3"
            }), t.countdown(t);
        }, 1e3);
    },
    sendCode: function(o) {
        var e = this;
        if (60 === e.data.second) {
            if (!e.bindCheckMobile(e.data.phone)) return;
            e.setData({
                disabled: !0,
                loginBackgroundColor: "#FF7A00"
            }), console.log(1), t.getVerifyCode.call(e, e.data.img_code, e.data.img_id, e.data.phone, e.data.sms_id, function(t) {
                console.log(t), e.countdown(e), wx.showToast({
                    title: "已发送",
                    icon: "success"
                });
            }, function(t) {
                e.getImgCode(), console.log(t), e.setData({
                    disabled: !1
                }), wx.showToast({
                    title: t,
                    icon: "none"
                });
            });
        }
    },
    submit: function(e) {
        var a = this;
        a.bindCheckMobile(a.data.phone) && (a.data.hasSubmit || (a.setData({
            hasSubmit: !0
        }), t.doLoginWithPhone.call(a, a.data.phone, a.data.code, function(t) {
            o.setHwxUserInfo(t.token, a.data.phone), console.log(t), wx.navigateBack({
                delta: 1,
                success: function(t) {},
                fail: function() {},
                complete: function() {}
            });
        }, function(t) {
            wx.showToast({
                title: t,
                icon: "none"
            }), a.setData({
                hasSubmit: !1
            });
        })));
    },
    bindCheckMobile: function(t) {
        return !!t.match(/^1[3-9][0-9]\d{8}$/) || (wx.showToast({
            title: "手机号格式不正确",
            icon: "none"
        }), !1);
    },
    getImgCode: function() {
        var o = this;
        t.getImgCode.call(o, o.data.img_id, function(t) {
            console.log(t), o.setData({
                imgData: t.data,
                img_id: t.id
            });
        });
    },
    stopTouchMove: function() {},
    stopTap: function() {}
});