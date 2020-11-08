import {
  User
} from '../../model/user'
import {
  Http
} from '../../utils/http'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginForm: {
      phoneNumber: '',
      password: '',
      phoneNumberRules: [{
        validator(rule, value, callback, source) {
          if (value) {
            if (/^1[3-9]\d{9}$/.test(value)) {
              callback()
            } else {
              callback(false)
            }
          } else {
            callback(false)
          }
        },
        message: '你真的输入正确的手机号了吗',
        // trigger: 'change'
        trigger: 'blur',
        required: true
      }],
      passwordRules: [{
        validator(rule, value, callback, source) {
          if (value) {
            if (/^\s+$/.test(value)) {
              callback(false)
            } else {
              callback()
            }
          } else {
            callback(false)
          }
        },
        message: '不会吧不会还有人不知道登陆是要密码的吧？不会吧不会吧不会吧',
        // trigger: 'change'
        trigger: 'blur',
        required: true
      }]
    },
    loadingLoginBtn: false
  },

  async doLogin(event) {
    const {
      detail
    } = event

    // 显示加载状态
    this.setData({
      loadingLoginBtn: true
    })

    if (detail.errors.phoneNumber.length === 0 && detail.errors.password.length === 0) {
      // 刷新登陆状态
      const refreshLoginStatus = await Http.request({
        url: '/login/refresh'
      })
      // 获取登陆状态
      const loginStatus = await Http.request({
        url: '/login/status'
      })
      // 如果是未登录状态
      if (refreshLoginStatus.data.code == 301 && loginStatus.data.code == 301) {
        const userDetail = await User.login(detail.values.phoneNumber, detail.values.password)
        // 把用户信息存在本地
        wx.setStorageSync('userDetail', userDetail)
      }

      // 停止动画加载
      this.setData({
        loadingLoginBtn: false
      })
      // 跳转到个人中心页面
      wx.switchTab({
        url: '/pages/person/person'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.lin.initValidateForm(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})