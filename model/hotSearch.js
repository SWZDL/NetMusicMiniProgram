import {
  Http
} from "../utils/http"

/**
 * @Description: 热搜关键词类
 * @author: 盛文增
 * @date: 2020/10/8 13:09
 */
class HotSearch {
  /**
   * 请求热搜关键词，展示在搜索框的占位文字
   * @returns {Promise<*>}
   */
  static async getHotSearch() {
    return await Http.request({
      url: '/search/hot',
      data: {}
    })
  }
}

export {
  HotSearch
}
