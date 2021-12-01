<template>
  <div class="recommend" v-loading="loading">
    <scroll class="recommend-content">
      <div>
        <div class="slider-container">
          <div class="slider-content">
            <slider v-if="sliders.length" :sliders="sliders"></slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="!loading">Recommend Music List</h1>
          <ul>
            <li
            v-for='item in albums'
            class="list-item"
            :key="item.id"
            @click="selectItem(item)">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.pic">
              </div>
              <div class="text">
                <p class="name">
                  {{item.username}}
                </p>
                <p class="title">
                  {{item.title}}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getRecommend } from '@/service/recommend'
import Slider from '@/components/slider/slider'
import Scroll from '@/components/scroll/scroll'
export default {
  name: 'recommend',
  data () {
    return {
      sliders: [],
      albums: []
    }
  },
  computed: {
    loading () { return !this.sliders.length || !this.albums.length }
  },
  async created () {
    const result = await getRecommend()
    const { sliders, albums } = result
    this.sliders = sliders
    this.albums = albums
  },
  components: {
    Slider,
    Scroll
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  position: absolute;
  top: 84px;
  width: 100%;
  bottom: 0px;
  overflow: scroll;
  .recommend-content{
    height: 100%;
    .recommend-list{
        .list-title{
          text-align: center;
          color: $color-theme;
          background-color:$color-background;
          font-size: $font-size-medium;
          padding: 16px;
        }
        .list-item{
          display: flex;
          align-items: center;
          padding: 0 20px 20px 20px;
          .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
          }
          .text {
            color: $color-theme;
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            font-size: $font-size-medium;
            overflow: hidden;
          }
          .title{
            color: $color-text-d;
          }
        }
      }
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
  }
}
</style>
