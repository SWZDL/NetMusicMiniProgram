// pages/searchResult/searchResult.js
import {
  Http
} from "../../utils/http"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //热搜关键词列表
    searchHots: [],
    //当前热搜关键词下标
    showSearchHotIndex: null
  },
  method: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    //请求热搜关键词，展示在搜索框的占位文字
    Http.request("/search/hot", {}, res => {
      that.setData({
        searchHots: res.result.hots,
        showSearchHotIndex: Math.round(Math.random() * res.result.hots.length)
      })
      that.flushSearchKeyWord(res.result.hots.length)
    })
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