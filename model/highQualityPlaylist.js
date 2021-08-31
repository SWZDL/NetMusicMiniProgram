import {
  Http
} from "../utils/http"

class HighQualityPlaylist {
  /**
   * 获取精品歌单
   * 参数: 
   * cat: tag, 比如 " 华语 "、 " 古风 "、 " 欧美 "、 " 流行 ", 默认为 "全部", 可从精品歌单标签列表接口获取(/playlist/highquality/tags)
   * limit: 取出歌单数量, 默认为 20
   * before: 分页参数, 取上一页最后一个歌单的 updateTime 获取下一页数据
   */
  static async getPlayListsHighquality() {
    const playListsHighquality = await Http.request({
      url: '/top/playlist/highquality',
      data: {
        limit: 20,
        offset: 0
      }
    })
    return playListsHighquality
  }
}

export {
  HighQualityPlaylist
}