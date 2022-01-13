<template>
  <div>
    <Header />
    <Tab />
    <router-view></router-view>
    <player></player>
  </div>
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player.vue'
export default {
  components: {
    Header,
    Tab,
    Player
  }
}
</script>

<style lang="scss">

</style>
