import {Playlists} from '../../model/playlists'
import {Music} from '../../model/music'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        playlist: {
            tags: '',
            name: '',
            description: '',
            coverImgUrl: '',
            subscribedCount: '',
            subscribed: '',
            shareCount: '',
            playCount: ''
        },
        songs: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const eventChannel = this.getOpenerEventChannel()
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('getPlaylistId', async data => {
            const playlistId = data.playlistId
            const playlistDetail = await Playlists.getPlaylistDetail(playlistId)
            /*不完整的歌单音乐*/
            // const tracks = playlistDetail.data.playlist.tracks;
            /*完整的歌单音乐的 ID*/
            const trackIds = playlistDetail.data.playlist.trackIds;
            /*完整的歌单音乐详情*/
            const tracks = await this._getSongDetail(trackIds)
            /*专辑标签*/
            const tags = playlistDetail.data.playlist.tags;
            /*专辑名称*/
            const name = playlistDetail.data.playlist.name;
            /*专辑描述*/
            const description = playlistDetail.data.playlist.description.slice(0, 40) + '...';
            /*专辑图片封面*/
            const coverImgUrl = playlistDetail.data.playlist.coverImgUrl;
            /*专辑订阅者人数*/
            const subscribedCount = playlistDetail.data.playlist.subscribedCount;
            /*当前账号是否已经订阅*/
            const subscribed = playlistDetail.data.playlist.subscribed;
            /*分享次数*/
            const shareCount = playlistDetail.data.playlist.shareCount;
            /*播放次数*/
            const playCount = playlistDetail.data.playlist.playCount;
            this.setData({
                playlist: {
                    tags,
                    name,
                    description,
                    coverImgUrl,
                    subscribedCount,
                    subscribed,
                    shareCount,
                    playCount
                },
                songs: tracks
            })

        })
    },

    async _getSongDetail(trackIds) {
        let tracks = []
        for (const trackId of trackIds) {
            //歌曲详情
            const trackDetails = await Music.getSongDetailBySongId(trackId.id)
            const song = trackDetails.data.songs[0];
            tracks.push(song)
        }
        console.log(tracks)
        return tracks
    },
    goToSong(e) {
        const songId = e.currentTarget.dataset.songId;
        this._goToSongPlayer(songId)
    },

    async _goToSongPlayer(songId) {
        const canUse = await Music.checkMusic(songId)
        if (canUse.data.success) {
            wx.navigateTo({
                url: "/pages/song/song",
                success: (res) => {
                    // 通过eventChannel向被打开页面传送数据
                    res.eventChannel.emit('getSongId', {
                            songId: songId
                        }
                    )
                }
            })
        } else {
            wx.lin.showMessage({
                content: canUse.data.message
            })
        }
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