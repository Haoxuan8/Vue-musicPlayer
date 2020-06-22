import { getUserId, getHistoryPlaylist } from "utlis/storage"

const state = {
  uid: getUserId() || null,
  playing: false,
  loading: false,
  userPlayList: [], //用户歌单
  playList: [], //播放列表
  currMusicIndex: -1, //歌曲索引
  currTime: 0,
  alertMessage: "",
  alertShow: false,
  menuShowSp: false,
  lyricShowSp: false,
  historyList: getHistoryPlaylist()
}

export default state