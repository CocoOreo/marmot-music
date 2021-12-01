<template>
  <div class="loading">
    <div class="loading-content">
      <img width="24" height="24" src="./loading.gif">
      <p class="desc">{{title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {
      title: 'Loading...'
    }
  },
  methods: {
    setTitle (title) {
      this.title = title
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading {
      width: 100%;
      height: 100%;
      background-color: rgba(255,255,255,1);
    .loading-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        text-align: center;
      .desc {
        line-height: 20px;
        font-size: $font-size-small;
        color: $color-theme;
      }
    }
  }
</style>
