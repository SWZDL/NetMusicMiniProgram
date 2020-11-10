// 获取应用实例
import {
  Music
} from "../../model/music"
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
    PLAYLIST_RCMD: [],
    STYLE_RCMD: [],
    OFFICIAL_PLAYLIST: [],
    // banner 数据
    banner: []
  },
  //组件所在页面的生命周期
  pageLifetimes: {
    async show() {
      const that = this
      if (typeof that.getTabBar === 'function' &&
        that.getTabBar()) {
        that.getTabBar().setData({
          selected: 0
        })
      }

      this._userLoginService()
      await this._bannerService()
      await this._indexContentService(false)
      await this._hotSearchService()
    }
  },

  lifetimes: {
    attached() {
      this._loadingWelcomePageService()
    }
  },
  methods: {
    /**
     * 下拉刷新
     */
    async onPullDownRefresh() {
      this._userLoginService()
      await this._bannerService()
      await this._indexContentService(true)
      await this._hotSearchService()
    },

    /**
     * 跳转开屏界面服务
     * @private
     */
    _loadingWelcomePageService() {
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
    },

    /**
     * 加载用户登录服务
     * 判断是否已经登陆过
     * @private
     */
    _userLoginService() {
      // 如果本地保存有用户信息，说明用户已经登陆过
      if (wx.getStorageInfoSync().keys.indexOf('userDetail') !== -1) {
        this.setData({
          isLogin: true
        })
      }
    },

    /**
     * 加载首页 banner 内容
     * @returns {Promise<void>}
     * @private
     */
    async _bannerService() {
      /**
       * 加载 banner
       */
      const banner = await Banner.getBanner()
      this.setData({
        banner: banner
      })
    },

    /**
     * 加载首页内容服务
     * @returns {Promise<void>}
     * @private
     */
    async _indexContentService(coldLoad) {
      /**
       * 加载推荐歌单、推荐单曲、官方歌单
       */
      if (coldLoad || this.data.PLAYLIST_RCMD.length === 0) {
        // 获取播放列表
        // const playlists = await Playlists.getPlayLists()
        const homePageBlocks = await Homepage.getHomePageBlockPage()
        this.setData({
          //推荐歌单
          PLAYLIST_RCMD: homePageBlocks.data.data.blocks.find(items => items.blockCode === 'HOMEPAGE_BLOCK_PLAYLIST_RCMD').creatives,
          //推荐歌曲
          STYLE_RCMD: homePageBlocks.data.data.blocks.find(items => items.blockCode === 'HOMEPAGE_BLOCK_STYLE_RCMD').creatives,
          //推荐歌单
          OFFICIAL_PLAYLIST: homePageBlocks.data.data.blocks.find(items => items.blockCode === 'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST').creatives
        })
        console.log("===========PLAYLIST_RCMD==============")
        console.log(this.data.PLAYLIST_RCMD)
        console.log("===========STYLE_RCMD==============")
        console.log(this.data.STYLE_RCMD)
        console.log("===========OFFICIAL_PLAYLIST==============")
        console.log("=========================")
      }
    },

    /**
     * 加载热搜关键词服务
     * @private
     */
    async _hotSearchService() {
      /**
       * 加载热搜关键词
       */
      let searchHotLength = 0
      //从本地缓存获取searchHots，如果本地缓存没有或者已经过期，那就向服务器请求
      try {
        const searchHotsStorage = wx.getStorageSync('searchHots')
        //过期时间为 60*60*1000毫秒，即10分钟
        if (searchHotsStorage && (new Date().getTime() - searchHotsStorage.setStorageTime < 60 * 60 * 1000)) {
          this.setData({
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
        this.setData({
          searchHots: searchHots.data.result.hots,
          showSearchHotIndex: Math.round(Math.random() * searchHotLength)
        })
      }
    },

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
      const songId = e.currentTarget.dataset.songId
      this._goToSongPlayer(songId)
    },

    /**
     * 获取针对用户推荐的歌单详情
     * @param e
     */
    goPlaylistRcmdDetail(e) {
      console.log(e.currentTarget.dataset.playlistid)
    },

    /**
     * 获取针对用户推荐的单曲详情
     * @param e
     */
    goStyleRcmdDetail(e) {
      const songId = e.currentTarget.dataset.styleid
      this._goToSongPlayer(songId)
    },

    /**
     * 获取官方推荐歌单详情
     * @param e
     */
    goOfficialPlaylistDetails(e) {
      console.log(e.currentTarget.dataset.playlistid)
    },

    async _goToSongPlayer(songId) {
      const canUse = await Music.checkMusic(songId)
      if (canUse.data.success) {
        wx.navigateTo({
          url: "/pages/song/song",
          success: (res) => {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('getSongId', {
                songId: songId
              }
            )
          }
        })
      } else {
        console.log(canUse.data.message)
      }
    }
  }
})
