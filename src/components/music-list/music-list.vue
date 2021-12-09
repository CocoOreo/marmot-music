<template>
  <div class="music-list">
        <div class="back">
        </div>
        <h1 class="title">{{title}}</h1>
        <div
        class="bg-image"
        :style="bgImageStyle"
        ref="bgImage">
        </div>
        <scroll
          class="list"
          :style="scrollStyle">
            <div class="song-list-container">
              <song-list :songs="songs"></song-list>
            </div>
        </scroll>
  </div>
</template>

<script>
import scroll from '../scroll/scroll.vue'
import SongList from '../song-list/song-list.vue'
export default {
  components: { scroll, SongList },
  props: {
    title: String,
    pic: String,
    rank: Boolean,
    songs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      imageHeight: 0
    }
  },
  computed: {
    bgImageStyle () {
      return {
        backgroundImage: `url(${this.pic})`
      }
    },
    scrollStyle () {
      return {
        top: `${this.imageHeight}px`
      }
    }
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight
  }
}
</script>

<style lang="scss" scoped>
  .music-list {
    position: relative;
    height: 100%;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 20;
      transform: translateZ(2px);
      .icon-back {
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      z-index: 20;
      transform: translateZ(2px);
      text-align: center;
      line-height: 40px;
      font-size: $font-size-large;
      color: $color-theme;
    }
    .bg-image {
      position: relative;
      width: 100%;
      transform-origin: top;
      background-size: cover;
      padding-top: 70%;
      .play-btn-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
        .play-btn {
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;
        }
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .list {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 0;
      .song-list-container {
        padding: 20px 30px;
        background: $color-background;
      }
    }
  }
</style>
