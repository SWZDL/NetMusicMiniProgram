Component({
    data: {
        selected: 0,
        color: "#7A7E83",
        selectedColor: "#eb5a49",
        list: [
            {
                pagePath: "/pages/index/index",
                iconPath: "/image/icon_music_not_selected.png",
                selectedIconPath: "/image/icon_music_selected.png",
                text: "音乐"
            },
            {
                pagePath: "/pages/person/person",
                iconPath: "/image/icon_config_not_selected.png",
                selectedIconPath: "/image/icon_config_selected.png",
                text: "设置"
            }
        ]
    },
    attached() {
    },
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            this.setData({
                selected: data.index
            })
            wx.switchTab({
                url
            })
        }
    }
})