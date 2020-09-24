const {
    promisic
} = require("../../miniprogram_npm/lin-ui/utils/util");

Page({
    data: {},
    clickPage() {
        wx.switchTab({
            url: "../index/index"
        })
    },
    onLoad() {
        // 进入此页面之后，就在本地设置一个缓存，标识不是第一次进入此页面了
        promisic(wx.setStorage)({
            key: "notFirstTimeLoad",
            data: true
        })
            .catch(err => {
                console.log(err);
            })
    },
    onShow: function () {
        // 隐藏返回主页按钮
        if (wx.canIUse('hideHomeButton')) {
            wx.hideHomeButton();
        }
        // 延时跳转到首页
        setTimeout(() => {
            wx.switchTab({
                url: "../index/index"
            })
        }, 3000)
    }
})