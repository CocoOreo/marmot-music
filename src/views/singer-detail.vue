<template>
<div></div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
export default {
  name: 'singer-detail',
  props: {
    singer: {
      type: Object
    }
  },
  data () {
    return {

    }
  },
  async created () {
    const res = await getSingerDetail(this.singer)
    const songs = await processSongs(res.songs)
    console.log(songs)
  }
}
</script>

<style>

</style>
