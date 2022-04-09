var t = __wxConfig.tabBar;

Component({
    properties: {},
    data: {
        activeIdx: -1,
        config: t,
        list: t.list.map(function(t, a) {
            var e = {};
            return e.pagePath = "/" + t.pagePath.replace(/.html$/g, ""), e.iconPath = "/" + t.iconPath, 
            e.selectedIconPath = "/" + t.selectedIconPath, e.idx = a, e.redDot = !1, e.text = t.text, 
            e;
        })
    },
    methods: {
        switchTab: function(t) {
            var a = t.currentTarget.dataset, e = a.pagePath;
            a.text;
            wx.switchTab({
                url: e
            });
        },
        handleError: function(t) {
            console.log(t);
        }
    },
    ready: function() {
        console.log(this.data.list);
    },
    pageLifetimes: {
        show: function() {
            var t = getCurrentPages(), a = t[t.length - 1].__route__, e = this.data.list.find(function(t) {
                return t.pagePath === "/" + a;
            }).idx;
            this.data.activeIdx !== e && this.setData({
                activeIdx: e
            });
        }
    }
});