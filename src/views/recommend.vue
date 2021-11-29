<template>
  <div class="recommend">
    <div class="slider-container">
      <div class="slider-content">
        <slider v-if="sliders.length" :sliders="sliders"></slider>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommend } from '@/service/recommend'
import Slider from '@/components/slider/slider'
export default {
  name: 'recommend',
  data () {
    return {
      sliders: []
    }
  },
  async created () {
    const result = await getRecommend()
    const { sliders } = result
    this.sliders = sliders
  },
  components: {
    Slider
  }
}
</script>

<style lang="scss" scoped>
.slider-container {
  position: relative;
  widows: 100%;
  height: 0;
  padding-top: 40%;
  overflow: hidden;
  .slider-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
