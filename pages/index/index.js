// 获取应用实例
// import {
//   Playlists
// } from "../../model/playlists"
import {
  Homepage
} from "../../model/homepage"
import {
  HotSearch
} from "../../model/hotSearch"
import {
  Banner
} from "../../model/banner"

Component({
  data: {
    isFirstLoad: null,
    //热搜关键词列表
    searchHots: [],
    //当前热搜关键词下标
    showSearchHotIndex: null,
    playlistRec: [],
    songRec: [],
    // banner 数据
    banner: []
  },
  pageLifetimes: {
    async show() {
      const that = this
      if (typeof that.getTabBar === 'function' &&
        that.getTabBar()) {
        that.getTabBar().setData({
          selected: 0
        })
      }

      // 如果本地保存有用户信息，说明用户已经登陆过
      if (wx.getStorageInfoSync().keys.indexOf('userDetail') !== -1) {
        that.setData({
          isLogin: true
        })
      }

      /**
       * 加载播放列表
       */
      if (that.data.playlistRec.length === 0) {
        // 获取播放列表
        // const playlists = await Playlists.getPlayLists()
        const homePageBlocks = await Homepage.getHomePageBlockPage()

        that.setData({
          //推荐歌单
          playlistRec: homePageBlocks.data.data.blocks.find(items => items.blockCode === 'HOMEPAGE_BLOCK_PLAYLIST_RCMD').creatives,
          //推荐歌曲
          songRec: homePageBlocks.data.data.blocks.find(items => items.blockCode === 'HOMEPAGE_BLOCK_STYLE_RCMD').creatives
        })
        console.log(that.data.playlistRec)
        console.log(that.data.songRec)
      }

      /**
       * 加载热搜关键词
       */
      let searchHotLength = 0
      //从本地缓存获取searchHots，如果本地缓存没有或者已经过期，那就向服务器请求
      try {
        const searchHotsStorage = wx.getStorageSync('searchHots')
        //过期时间为 60*60*1000毫秒，即10分钟
        if (searchHotsStorage && (new Date().getTime() - searchHotsStorage.setStorageTime < 60 * 60 * 1000)) {
          that.setData({
            searchHots: searchHotsStorage.searchHots,
            showSearchHotIndex: Math.round(Math.random() * searchHotLength)
          })
        } else {
          throw new Error("本地缓存已过期/本地缓存未找到")
        }
      } catch (e) {
        //请求热搜关键词，展示在搜索框的占位文字
        const searchHots = await HotSearch.getHotSearch()
        //设置过期时间
        const searchHotsStorage = {
          searchHots: searchHots.data.result.hots,
          setStorageTime: new Date().getTime()
        }
        //将热搜存储到本地缓存
        wx.setStorage({
          key: "searchHots",
          data: searchHotsStorage
        })

        //设置热搜关键词的长度，以供下面计算 showSearchHotIndex，即决定展示哪一个热搜关键词
        searchHotLength = searchHots.data.result.hots.length
        that.setData({
          searchHots: searchHots.data.result.hots,
          showSearchHotIndex: Math.round(Math.random() * searchHotLength)
        })
      }

      /**
       * 加载 banner
       */
      const banner = await Banner.getBanner()
      that.setData({
        banner: banner
      })
      // console.log(banner)
    }
  },

  lifetimes: {
    attached() {
      // 判断是否为首次加载
      let isFirstLoad = true
      wx.getStorageInfo({
        success(res) {
          for (const key of res.keys) {
            // 如果找到notFirstTimeLoad
            if (key === 'notFirstTimeLoad') {
              isFirstLoad = false
              break
            }
          }
          // 如果是首次加载,跳转到开屏页面。在开屏页面会给本地设置缓存，这样下次判断是否为首次加载如果找到缓存就不会进入开屏界面
          if (isFirstLoad) {
            wx.navigateTo({
              url: '../openScreen/openScreen'
            })
          }
        }
      })
    }
  },
  methods: {
    /**
     * 点击音乐搜索框，跳转到音乐搜索页面
     */
    clickSearchMusic() {
      wx.navigateTo({
        url: '/pages/searchResult/searchResult'
      })
    },
    /**
     * 点击立即登录，跳转到登录页面
     */
    goToLogin() {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    },
    /**
     * 点击 banner，跳转到音乐播放界面
     */
    goBannerDetail(e) {
      //获取到音乐ID，进行获取音乐URL并播放操作
      console.log(e.currentTarget.dataset.songId)
    }
  }
})
