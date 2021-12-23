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
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
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
    if (!this.computedSinger) {
      const path = this.$route.matched[0].path
      this.$router.push({ path })
      return
    }
    const res = await getSingerDetail(this.computedSinger)
    const songs = await processSongs(res.songs)
    this.songs = songs
    this.loading = false
  },
  computed: {
    computedSinger () {
      let res = null
      const singer = this.singer
      if (singer) {
        res = singer
      } else {
        const cachedSinger = storage.session.get(SINGER_KEY)
        if (cachedSinger && cachedSinger.mid === this.$route.params.id) {
          res = cachedSinger
        }
      }
      return res
    },
    pic () {
      const singer = this.computedSinger
      return singer && singer.pic
    },
    title () {
      const singer = this.computedSinger
      return singer && singer.name
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
