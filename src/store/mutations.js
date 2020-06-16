import {
  setUserId
} from '@/utlis/storage'

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
  togglePlaying (state) {
    state.playing = !state.playing
  },
  setLoading(state, loading) {
    state.loading = loading
  }
}

export default mutations