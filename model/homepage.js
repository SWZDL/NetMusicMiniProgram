import {Http} from '../utils/http'

class Homepage {
  /**
   * 获取首页数据
   * 目前展示了三个模块：
   * 针对用户推荐的歌单
   * 针对用户推荐的单曲
   * 官方推荐的歌单
   * @returns {*}
   */
  static async getHomePageBlockPage() {
    return await Http.request({
      url: '/homepage/block/page',
      data: {}
    })
  }
}

export {
  Homepage
}

