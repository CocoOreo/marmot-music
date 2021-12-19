<template>
<div class="singer">
  <index-list @select="handleSelect" :data="singerList" v-loading="!singerList.length"></index-list>
  <router-view :singer="selectedSinger"></router-view>
</div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
export default {
  name: 'singer',
  data () {
    return {
      singerList: [],
      selectedSinger: null
    }
  },
  async created () {
    const res = await getSingerList()
    this.singerList = res.singers
  },
  methods: {
    handleSelect (singer) {
      this.selectedSinger = singer
      this.cacheSinger(singer)
      this.$router.push(
        {
          path: `/singer/${singer.mid}`
        }
      )
    },
    cacheSinger (singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  },
  components: { IndexList }
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  top: 84px;
  bottom: 0px;
  width: 100%;
  background-color: $color-background;
}
</style>
