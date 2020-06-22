
const _storage = window.localStorage
const storage = {
  get(key, data = []) {
    if (_storage) {
      return _storage.getItem(key)
        ? Array.isArray(data)
          ? JSON.parse(_storage.getItem(key))
          : _storage.getItem(key)
        : data
    }
  },
  set(key, val) {
    if (_storage) {
      _storage.setItem(key, val)
    }
  },
  clear(key) {
    if (_storage) {
      _storage.removeItem(key)
    }
  }
}


//网易云uid
const USERID_KEY = '__userId__'

export function getUserId() {
  return Number(storage.get(USERID_KEY, null))
}

export function setUserId(uid) {
  storage.set(USERID_KEY, uid)
  return uid
}

//Volume
const VOLUME_KEY = '__volumeVal__'

export function getVolumeVal(val) {
  return Number(storage.get(VOLUME_KEY, val))
}

export function setVolumeVal(val) {
  storage.set(VOLUME_KEY, val)
  return val
}

//PlayMode order:0, random:1, loop:2
const MODE_KEY = '__playMode__'

export function getMode() {
  return Number(storage.get(MODE_KEY, 0))
}

export function setMode(num) {
  storage.set(MODE_KEY, num)
  return num
}


//history 
const HISTORY_PLAYLIST_KEY = '__historyPlaylist__'
const HistoryListMax = 200

export function getHistoryPlaylist() {
  return JSON.parse(storage.get(HISTORY_PLAYLIST_KEY, '[]'))
}

export function addHistoryPlaylist(music) {
  let playlist = getHistoryPlaylist()
  const index = playlist.findIndex(item => {
    return item.id == music.id
  })
  if(index == 0)
    return playlist
  if(index > 0) 
    playlist.splice(index,1)
  
  playlist.unshift(music)
  if(HistoryListMax && playlist.length == HistoryListMax) 
    playlist.pop()
  
  storage.set(HISTORY_PLAYLIST_KEY, JSON.stringify(playlist))
  return playlist
}

export function setHistoryPlaylist(list) {
  storage.set(HISTORY_PLAYLIST_KEY, JSON.stringify(list))
}