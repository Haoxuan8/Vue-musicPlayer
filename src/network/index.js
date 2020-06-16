import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL

export function getUserDetail(uid) {
  return axios.get('/user/detail', {
    params: {
      uid
    }
  })
}

export function getUserPlaylist(uid) {
  return axios.get('/user/playlist', {
    params: {
      uid
    }
  })
}

export function getPlayList(id) {
  return axios.get('/playlist/detail', {
    params: {
      id
    }
  })
}

export function getMusicDetail(ids) {
  return axios.get('/song/detail', {
    params: {
      ids
    }
  })
}