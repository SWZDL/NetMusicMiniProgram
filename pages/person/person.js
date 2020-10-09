import {HotSearch} from "../../model/hotSearch"

Component({
  data: {
    //热搜关键词列表
    searchHots: [],
    //当前热搜关键词下标
    showSearchHotIndex: null
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

    }
  },
  methods: {
    clickSearchMusic() {
      wx.navigateTo({
        url: '/pages/searchResult/searchResult'
      })
    },
    goToLogin() {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  }
})
