<template>
    <div class="player">
        <div
            class="normal-player"
            v-show="fullScreen"
        >
            <template v-if="currentSong">
                <div class="background">
                    <img :src="currentSong.pic" />
                </div>
                <div class="top">
                    <div class="back">
                        <div
                        @click="goBack"
                        class="icon-back"
                        ></div>
                    </div>
                    <h1 class="title">{{currentSong.name}}</h1>
                    <h2 class="subtitle">{{currentSong.singer}}</h2>
                </div>
            </template>
        </div>
    </div>
    <audio
      ref="audioRef"
    ></audio>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'player',
  setup () {
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)
    const audioRef = ref(null)
    const goBack = () => {
      store.commit('setFullScreen', false)
    }

    watch(currentSong, (newSong) => {
      if (!newSong.id || !newSong.url) {
        return
      }
      const audioEl = audioRef.value
      audioEl.src = newSong.url
      audioEl.play()
    })
    return {
      fullScreen,
      currentSong,
      audioRef,
      goBack
    }
  }
}
</script>

<style lang='scss' scoped>
  .player {
    .normal-player {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 150;
      background: $color-background;
      .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);

        img {
          width: 100%;
          height: 100%;
        }
      }
      .top {
        position: relative;
        margin-bottom: 25px;
        .back {
            position: absolute;
            top: 0;
            left: 6px;
            z-index: 20;
            display: flex;
            flex: 0 0 20px;
            align-items: center;
            transform: translateZ(2px);
            padding: 10px;
            .icon-back {
                @include bg-image('back');
                width: 20px;
                height: 20px;
                background-size: cover;
            }
        }
        .title {
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          @include no-wrap();
          font-size: $font-size-large;
          color: $color-text;
        }
        .subtitle {
          line-height: 20px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-text;
        }
      }
    }
  }
</style>
