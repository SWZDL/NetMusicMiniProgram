import {
    Music
} from '../../model/music'
import {
    Comment
} from '../../model/comment'

const config = {
    pauseImageUrl: "data:image/png;base64,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",
    playImageUrl: "data:image/png;base64,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",
    commentLimit: 50
}
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        //当前播放状态，1 表示正在播放 0 表示暂停
        currentlyPlayingStatus: 1,
        //当前显示播放按钮还是暂停按钮的图片URL
        currentlyPlayingControl: config.pauseImageUrl,
        //音乐详情
        songDetail: null,
        //当前播放百分比
        currentTimePercent: 0,
        //当前播放秒数
        currentTime: 0.0,
        //是否正在拖动进度条
        isMoving: false,
        //是否进入显示歌词界面
        showLyrics: false,
        //歌词时间：内容
        songLyricMap: null,
        //当前时间的歌词内容
        currentLyric: "",
        //音乐评论
        songComment: null
    },

    /**
     * 用户点击进度条
     * @param e
     */
    changeCurrentTimePercent(e) {
        /*为了解决抖动问题*/
        this.setData({
            isMoving: false
        })
        const targetTimePercent = e.detail.value
        this.setData({
            currentTimePercent: targetTimePercent
        })
        backgroundAudioManager.seek(backgroundAudioManager.duration * targetTimePercent * 0.01)
    },

    /**
     * 用户滑动进度条
     * @param e
     */
    changingCurrentTimePercent(e) {
        /*为了解决抖动问题*/
        this.setData({
            isMoving: true
        })
        console.log(e.detail.value)
    },

    /**
     * 播放或者暂停
     */
    play_or_pause() {
        if (backgroundAudioManager.paused) {
            backgroundAudioManager.play()
            this.setData({
                currentlyPlayingStatus: 1,
                currentlyPlayingControl: config.pauseImageUrl
            })
        } else {
            backgroundAudioManager.pause()
            this.setData({
                currentlyPlayingStatus: 0,
                currentlyPlayingControl: config.playImageUrl
            })
        }
        console.log(this.data.currentTimePercent)
    },

    /**
     * 切换歌词显示状态
     */
    switchShowLyrics() {
        this.setData({
            showLyrics: !this.data.showLyrics
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        backgroundAudioManager.stop()
        const eventChannel = this.getOpenerEventChannel()
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('getSongId', async data => {
            const songId = data.songId
            //如果 songId 是 -1 ，意思是只展示后台正在播放的音乐，而不播放新的音乐
            if (songId === '-1') {

            } else {
                //请忽略此变量，后面没有用到，仅用来从里面取音乐URL
                const songUrlDetails = await Music.getSongBySongId(songId);
                //音乐URL
                const songUrl = songUrlDetails.data.data[0].url
                //歌曲详情
                const songDetails = await Music.getSongDetailBySongId(songId)
                //歌曲评论
                const comment = await Comment.getSongComment(songId, config.commentLimit, 0);
                this.setData({
                    songDetail: songDetails.data.songs[0],
                    songComment: comment.comments
                })

                //歌词
                const songLyrics = await Music.getSongLyrics(songId)
                const reg_1 = /\[\d{2}\:\d{2}\.\d+\]/
                const reg_2 = /\d{2}\:\d{2}\.\d{3}/

                /*转换时间字符串为秒数*/
                function changeTime(timestamp_str) {
                    /*去除外面的中括号*/
                    const temp = timestamp_str[0]
                    const timestamp = reg_2.exec(temp);
                    const pending_str = timestamp[0]
                    const a_str = pending_str.split(":")[0]
                    const a = parseInt(a_str) * 60;
                    const timestamp_str_temp = pending_str.replace(a_str + ":", "");
                    const b = parseInt(timestamp_str_temp.split(".")[0])
                    const c = parseInt(timestamp_str_temp.split(".")[1]) / 1000
                    return a + b + c
                }

                const songLyricsList = songLyrics.data.lrc.lyric.split("\n");
                const songLyricMap = new Map();
                for (const songLyric of songLyricsList) {
                    if (reg_1.test(songLyric)) {
                        /*提取待处理时间字段*/
                        const timestamp_str = reg_1.exec(songLyric);
                        /*时间*/
                        const lyricTime = changeTime(timestamp_str)
                        /*歌词*/
                        const lyricContent = songLyric.replace(timestamp_str[0], "")

                        if (songLyricMap.has(Math.round(lyricTime))) {
                            const lyricContent_new = songLyricMap.get(Math.round(lyricTime)) + "\n" + lyricContent;
                            songLyricMap.set(Math.round(lyricTime), lyricContent_new);
                        } else {
                            songLyricMap.set(Math.round(lyricTime), lyricContent);
                        }
                    }
                }
                this.setData({
                    songLyricMap
                })
                backgroundAudioManager.startTime = 0
                backgroundAudioManager.title = this.data.songDetail.name
                backgroundAudioManager.epname = this.data.songDetail.al.name
                backgroundAudioManager.singer = this.data.songDetail.ar[0].name
                backgroundAudioManager.coverImgUrl = this.data.songDetail.al.picUrl
                backgroundAudioManager.loop = true
                backgroundAudioManager.src = songUrl
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        backgroundAudioManager.onWaiting(() => {
            wx.lin.showMessage({
                content: '加载中，请耐心等待'
            })
        })
        /**
         * 监听自然播放结束时间
         */
        backgroundAudioManager.onEnded(() => {
            this.setData({
                currentlyPlayingStatus: 0,
                currentlyPlayingControl: config.playImageUrl,
                currentTimePercent: 100
            })
        })

        /**
         * 监听正在播放事件
         */
        backgroundAudioManager.onTimeUpdate(() => {
            let currentTime = backgroundAudioManager.currentTime
            let currentTimePercent = Math.round(currentTime / backgroundAudioManager.duration * 100)
            /*展示歌词，需要更快的更新速率，因此没有放到下面*/
            if (this.data.songLyricMap.has(Math.round(currentTime))) {
                const currentLyric = this.data.songLyricMap.get(Math.round(currentTime));
                this.setData({
                    currentLyric
                })
            }
            /*this.data.isMoving 是为了解决抖动问题*/
            if (currentTimePercent > this.data.currentTimePercent && !this.data.isMoving) {
                this.setData({
                    currentTimePercent,
                    currentTime,
                })
                console.log(this.data.currentLyric)
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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
