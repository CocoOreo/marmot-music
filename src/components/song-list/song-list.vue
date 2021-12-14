<template>
  <div class="song-list">
    <ul>
      <li
        class="item"
        v-for="(song, index) in songs"
        :key="song.id"
        @click="selectItem(song, index)"
      >
      <div class="rank" v-if="rank">
        <span :class="getRankCls(index)">{{ getRankText(index) }}</span>
      </div>
        <div class="content">
          <h2 class="name">{{ song.name }}</h2>
          <p class="desc">{{ getDesc(song) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default () {
        return []
      }
    },
    rank: {
      type: Boolean,
      default () {
        return false
      }
    }

  },
  emits: ['select'],
  methods: {
    selectItem (song, index) {
      this.$emit('select', { song, index })
    },
    getDesc (song) {
      return `${song.singer}·${song.album}`
    },
    getRankCls (index) {
      if (index <= 2) {
        return `icon icon${index}`
      } else {
        return 'text'
      }
    },
    getRankText (index) {
      if (index > 2) {
        return index + 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.song-list {
  position: relative;
  width: 100%;
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
  }
  .rank{
    display: flex;
    flex: 0 0 18px;
    margin-right: 16px;
    align-items: center;
    .icon {
      display: inline-block;
      width: 18px;
      height: 16px;
      background-size: 18px 16px;
            &.icon0 {
              @include bg-image('first');
            }
            &.icon1 {
              @include bg-image('second');
            }
            &.icon2 {
              @include bg-image('third');
            }
    }
    .text {
            color: $color-theme;
            font-size: $font-size-large;
    }
   }
  }
  .content {
    flex: 1;
    line-height: 20px;
    /* overflow: hidden; */
    .name {
      @include no-wrap();
      color: $color-theme;
    }
    .desc {
      @include no-wrap();
      margin-top: 4px;
      color: $color-text-d;
  }
}
</style>
