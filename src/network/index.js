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