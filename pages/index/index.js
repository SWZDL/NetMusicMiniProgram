//获取应用实例
import {
    Http
} from "../../utils/http";
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util";


Component({
    data: {
        isFirstLoad: null,
        playlist: [],
        CapsuleBarHeight: deviceUtil.getNavigationBarHeight(),
    },

    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 0
                })
            }

            console.log(this.data.CapsuleBarHeight);

            if (this.data.playlist.length === 0) {
                // 获取播放列表
                Http.request("/top/playlist", {
                    limit: 20,
                    offset: 0
                }, res => {
                    console.log(res.playlists);
                    this.setData({
                        playlist: res.playlists
                    })
                });
            }
        }
    },

    lifetimes: {
        attached() {
            //判断
            let isFirstLoad = true;
            wx.getStorageInfo({
                success(res) {
                    for (let key of res.keys) {
                        // 如果找到notFirstTimeLoad
                        if (key === 'notFirstTimeLoad') {
                            isFirstLoad = false
                            break;
                        }
                    }

                    // 如果是首次加载
                    if (isFirstLoad) {
                        wx.navigateTo({
                            url: '../openScreen/openScreen'
                        });
                    }
                }
            })
        }
    }
    ,
    methods: {
        clickSearchMusic() {
            wx.navigateTo({})
        },
        searchMusic(value) {
            console.log(value.detail.value)
            Http.request("/search", {
                keywords: value.detail.value
            }, res => {
                if (res.code === 200) {
                    console.log(res.result.songs);
                }
            })
        }
    }
})