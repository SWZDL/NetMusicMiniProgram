// pages/login/login.js
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

  doLogin(event) {
    //显示加载状态
    this.setData({
      loadingLoginBtn: true
    })
    const {
      detail
    } = event
    console.log(detail)
    /*
      detail 返回三个参数
      1、values: 各表单项的value值
      2、errors: 各表单项验证后的返回的错误信息数组
      3、isValidate: 表单是否验证通过的boolean值
      具体格式示例：
      detail = {
         values: {
             studentName: "",
             studentAge: "",
             studentAddress: ""
         },
         errors: {
             studentName: [],
             studentAge: [],
             studentAddress: []
         },
         isValidate: true
      }
    */
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