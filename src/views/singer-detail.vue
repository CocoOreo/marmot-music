<template>
<div></div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
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
    const res = getSingerDetail(this.singer)
    console.log(res)
  }
}
</script>

<style>

</style>
