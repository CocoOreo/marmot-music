<template>
<div class="singer">
  <index-list :data="singerList" v-loading="!singerList.length"></index-list>
</div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list.vue'
export default {
  name: 'singer',
  data () {
    return {
      singerList: []
    }
  },
  async created () {
    const res = await getSingerList()
    this.singerList = res.singers
    console.log(res)
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
