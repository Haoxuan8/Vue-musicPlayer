<template>
  <div id="app">
    <Header/>
    <PlayerContent/>
    <MusicPlayer/>
  </div>
</template>

<script>
import Header from 'components/Header'
import PlayerContent from 'components/PlayerContent'
import MusicPlayer from 'components/MusicPlayer'

export default {
  name: 'App',
  components: {
    Header,
    PlayerContent,
    MusicPlayer
  },
  data() {
    return {
    }
  }
}
</script>

<style>
</style>
