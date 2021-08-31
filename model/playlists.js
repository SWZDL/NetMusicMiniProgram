import {
    Http
} from "../utils/http"

/**
 * @Description: 歌单类
 * @author: 盛文增
 * @date: 2020/10/8 13:06
 */
class Playlists {
    /**
     * 加载歌单(网友精选碟)
     * 参数说明:
     * order: 可选值为 'new' 和 'hot', 分别对应最新和最热, 默认为 'hot'
     * cat: tag, 比如 " 华语 "、 " 古风 "、 " 欧美 "、 " 流行 ", 默认为 "全部", 可从歌单分类接口获取(/playlist/catlist)
     * limit: 取出歌单数量, 默认为 50
     * offset: 偏移数量, 用于分页, 如: (评论页数 - 1) * 50, 其中 50 为 limit 的值
     * @returns {Promise<*>}
     */
    static async getPlayLists() {
        const playlists = await Http.request({
            url: '/top/playlist',
            data: {
                limit: 20,
                offset: 0
            }
        })
        return playlists
    }

    /**
     * 获取歌单详情
     * @param playlistId
     * @returns {Promise<*>}
     */
    static async getPlaylistDetail(playlistId) {
        const playlistsDetail = await Http.request({
            url: '/playlist/detail',
            data: {
                id: playlistId
            }
        })
        return playlistsDetail
    }
}


export {
    Playlists
}