
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