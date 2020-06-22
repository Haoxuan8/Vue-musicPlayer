import config from '@/config'

export const getMenuShowSp = state => {
  return state.menuShowSp
}

export const getLyricShowSp = state => {
  return state.lyricShowSp
}

export const getAlertShow = state => {
  return state.alertShow
}

export const getPlaying = state => {
  return state.playing
}

export const getAlertMessage = state => {
  return state.alertMessage
}

export const getCurrMusic = state => {
  return state.playList[state.currMusicIndex]
}

export const getCurrMusicAlImg = state => {
  const music = getCurrMusic(state)
  return music ? music.al.picUrl : config.playerCoverImg
}

export const getCurrPlayList = state => {
  return state.playList
}

export const getLoading = state => {
  return state.loading
}

export const getPercent = state => {
  if(state.playList.length > 0)
    return state.currTime / state.playList[state.currMusicIndex].dt
  else
    return 0
}

export const getHistoryList = state => {
  return state.historyList
}

export const getUserList = state => {
  const { uid, userPlayList } = state
  if(userPlayList.length == 0) return []

  const retMenus = []
  const userCreateList = []
  const userCollectList = []

  userPlayList.forEach(list => {
    if(list.userId == uid) {
      userCreateList.push(list)
    }
    else{
      userCollectList.push(list)
    }
  })
  
  const genPlayListChildren = playlist => {
    return playlist.map(({id,name}) => ({
      path: `/playlist/${id}`,
      meta: {
        title: name,
        icon: 'icon-play-list'
      }
    }))
  }

  if(userCreateList.length) {
    retMenus.push({
      title: "创建的歌单",
      sublist: genPlayListChildren(userCreateList)
    })
  }

  if(userCollectList.length) {
    retMenus.push({
      title: "收藏的歌单",
      sublist: genPlayListChildren(userCollectList)
    })
  } 
  
  return retMenus
}