export default {
  defaultVolume: 0.75,
  maxSong: 500,

  headerTitle: 'Vue-musicPlayer',
  commentLimit: 20,

  playMode: [
    {
      icon: 'icon-order',
      name: '列表循环',
      id: 0
    },
    {
      icon: 'icon-random',
      name: '随机播放',
      id: 1
    },
    {
      icon: 'icon-loop',
      name: '单曲循环',
      id: 2
    }
  ],

  loadingImg: 'https://cdn.jsdelivr.net/gh/soragoto134/picGo_imgs/imgs/loading.gif',
  playerCoverImg: 'https://cdn.jsdelivr.net/gh/soragoto134/picGo_imgs/imgs/default_album.png'
}