<template>
  <div class="singer-detail">
    <music-list
    :songs="songs"
    :title="this.title"
    :pic="pic"
    :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/music-list.vue'
export default {
  components: { MusicList },
  name: 'singer-detail',
  props: {
    singer: {
      type: Object
    }
  },
  data () {
    return {
      songs: [],
      loading: true
    }
  },
  async created () {
    const res = await getSingerDetail(this.singer)
    const songs = await processSongs(res.songs)
    this.songs = songs
    this.loading = false
  },
  computed: {
    pic () {
      return this.singer && this.singer.pic
    },
    title () {
      return this.singer && this.singer.name
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: $color-background;
}
</style>
