import {
  HotSearch
} from "../../model/hotSearch"
import {
  User
} from "../../model/user"

Component({
  data: {
    //热搜关键词列表
    searchHots: [],
    //当前热搜关键词下标
    showSearchHotIndex: null,
    isLogin: false,
    userDetail: null
  },
  pageLifetimes: {
    async show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }

      const that = this
      /**
       * 加载热搜关键词
       */
      let searchHotLength = 0
      if (that.data.searchHots.length === 0) {
        //请求热搜关键词，展示在搜索框的占位文字
        const searchHots = await HotSearch.getHotSearch()
        //设置热搜关键词的长度，以供下面计算 showSearchHotIndex，即决定展示哪一个热搜关键词
        searchHotLength = searchHots.data.result.hots.length
        that.setData({
          searchHots: searchHots.data.result.hots,
          showSearchHotIndex: Math.round(Math.random() * searchHotLength)
        })
      } else {
        //如果热搜关键词已经获取过，那么就直接修改随机展示的关键词
        searchHotLength = that.data.searchHots.length
        that.setData({
          showSearchHotIndex: Math.round(Math.random() * searchHotLength)
        })
      }
      // 如果本地保存有用户信息，说明用户已经登陆过
      if (wx.getStorageInfoSync().keys.indexOf('userDetail') !== -1) {
        //获取用户等级
        const level = User.getLevel()
        console.log(level);
        that.setData({
          isLogin: true,
          userDetail: wx.getStorageSync('userDetail')
        })
      }
    }
  },
  methods: {
    /**
     * 点击搜索音乐框，然后跳转到搜索界面
     */
    clickSearchMusic() {
      wx.navigateTo({
        url: '/pages/searchResult/searchResult'
      })
    },
    /**
     * 点击登录按钮，跳转到登录界面
     */
    goToLogin() {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  }
})
