import axios from 'axios'
import config from '@/config'

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

export function getMusicUrl(id) {
  return axios.get('/song/url', {
    params: {
      id
    }
  })
}

export function getLyric(id) {
  return axios.get('/lyric', {
    params: {
      id
    }
  })
}

export function getPlaylistComment(id, page) {
  return axios.get('/comment/playlist', {
    params: {
      id,
      limit: config.commentLimit,
      offset: page*config.commentLimit
    }
  })
}