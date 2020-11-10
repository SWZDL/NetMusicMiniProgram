// pages/song/song.js
import {Music} from '../../model/music'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前播放状态，1 表示正在播放 0 表示暂停
    currentlyPlayingStatus: 1,
    src: ''
  },
  methods: {
    PlayOrPause() {
      if (this.data.currentlyPlayingStatus === 1) {
        this.audioCtx.pause()
        this.setData({
          currentlyPlayingStatus: 0
        })
      } else {
        this.audioCtx.play()
        this.setData({
          currentlyPlayingStatus: 0
        })
      }
    },
    audioStart() {
      this.audioCtx.seek(0)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('getSongId', async data => {
      const songId = data.songId
      const songDetails = await Music.getSongBySongId(songId)
      const songUrl = songDetails.data.data[0].url
      this.audioCtx = wx.createAudioContext('currentlyPlaying')
      this.audioCtx.setSrc(songUrl)
      this.audioCtx.play()
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
