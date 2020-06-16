import { getUserId } from "@/utlis/storage";

const state = {
  uid: getUserId() || null,
  playing: false,
  loading: false,
  userPlayList: [], //用户歌单
  playList: [], //播放列表
  currMusicIndex: -1, //歌曲索引
  alertMessage: "",
  alertShow: false,
  menuShowSp: false
}

export default state