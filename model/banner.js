import {
  Http
} from "../utils/http"

class Banner {
  /**
   * 调用此接口, 可获取 banner(轮播图) 数据
   * type: 资源类型, 对应以下类型, 默认为 0 即PC
   * 0: pc
   * 1: android
   * 2: iphone
   * 3: ipad
   */
  static async getBanner() {
    const banner = await Http.request({
      url: '/banner?type=2'
    })
    //返回 song 不为空的 banner
    return banner.data.banners.filter(item => item.song != null)
  }
}

export {
  Banner
}
