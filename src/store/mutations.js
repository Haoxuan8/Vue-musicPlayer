import {
  setUserId,
  addHistoryPlaylist,
  setHistoryPlaylist
} from 'utlis/storage'

const mutations = {
  setUid (state, uid) {
    state.uid = uid
    setUserId(uid)
  },
  setUserPlayList (state,list) {
    state.userPlayList = list
  },
  setAlertMessage (state, message) {
    state.alertMessage = message
    state.alertShow = true
  },
  toggleAlertShow (state) {
    state.alertShow = !state.alertShow
  },
  toggleMenuShowSp (state) {
    state.menuShowSp =  !state.menuShowSp
  },
  setMenuShowSp (state, menuShow) {
    state.menuShowSp =  menuShow
  },
  setLyricShowSp (state, lyricShow) {
    state.lyricShowSp =  lyricShow
  },
  toggleLyricShowSp (state) {
    state.lyricShowSp =  !state.lyricShowSp
  },
  setPlaying (state, playing) {
    state.playing = playing
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setPlayList(state, playlist) {
    state.playList = playlist
  },
  clearPlayList(state) {
    state.playList = []
    state.currMusicIndex = -1
  },
  setCurrMusicIndex(state, index) {
    state.currMusicIndex = index
  },
  nextIndex(state, mode) {
    if(state.playList.length > 0) {
      switch(mode) {
        case 0:
          state.currMusicIndex = (state.currMusicIndex + 1) % state.playList.length
          break
        case 1:
          state.currMusicIndex = Math.round(Math.random() * state.playList.length)
          break
        case 2:
          state.currTime = 0
          break
      }
    }
  },
  prevIndex(state) {
    if(state.playList.length > 0) {
      state.currMusicIndex -= 1
      if(state.currMusicIndex == -1)
      state.currMusicIndex = state.playList.length - 1
    }
  },
  setCurrTime(state, time) {
    state.currTime = time * 1000
  },
  addHistoryList(state, music) {
    state.historyList = addHistoryPlaylist(music)
  },
  clearHistoryList(state) {
    state.historyList = []
    setHistoryPlaylist([])
  }
}

export default mutations