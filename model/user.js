import {
  Http
} from "../utils/http"

class User {

  /**
   * 用户手机号登陆
   * @param {*} phoneNumber
   * @param {*} Password
   */
  static async login(phoneNumber, Password) {
    // 19927457507
    // QACxetLviNTVH8e
    const userDetails = await Http.request({
      url: '/login/cellphone',
      data: {
        phone: phoneNumber,
        password: Password
      },
      method: 'GET'
    })
    return userDetails
  }

  static async getLevel() {
    const level = await Http.request({
      url: '/user/level'
    })
  }
}

export {
  User
}
