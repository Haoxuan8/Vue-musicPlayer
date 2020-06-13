import {
  setUserId
} from '@/utlis/storage'

const mutations = {
  setUid (state, uid) {
    state.uid = uid
    setUserId(uid)
  }
}

export default mutations