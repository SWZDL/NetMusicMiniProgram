import {
  Http
} from "../utils/http"

/**
 * @Description: 根据不同参数请求音乐
 * @author: 盛文增
 * @date: 2020/10/8 13:08
 */
class Music {
  /**
   * 检查音乐是否可用（版权）
   * @param songId
   * @returns {Promise<*>}
   */
  static async checkMusic(songId) {
    return await Http.request({
      url: "/check/music",
      data: {
        id: songId
      }
    })
  }

  /**
   * 获取音乐URL
   * @param songId
   * @returns {Promise<*>}
   */
  static async getSongBySongId(songId) {
    return await Http.request({
      url: '/song/url',
      data: {
        id: songId
      }
    })
  }

  /**
   * 获取音乐详情
   * @param songId
   * @returns {Promise<void>}
   */
  static async getSongDetailBySongId(songId) {
    return await Http.request({
      url: "/song/detail",
      data: {
        ids: songId
      }
    })
  }

  /**
   * 获取歌词接口
   * @param songId
   * @returns {Promise<*>}
   */
  static async getSongLyrics(songId) {
    return await Http.request({
      url: "/lyric",
      data: {
        id: songId
      }
    })
  }

  /**
   * 搜索音乐
   * @param value
   * @returns {Promise<*>}
   */
  static async searchMusic(value) {
    return await Http.request({
      url: '/search',
      data: {
        keywords: value
      }
    })
  }
}


export {
  Music
}
