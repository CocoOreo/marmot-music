<template>
  <div class="no-result">
    <div class="no-result-content">
      <p class="desc">{{title}} Not Found</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'no-result',
  data () {
    return {
      title: 'Result'
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
  .no-result {
      width: 100%;
      height: 100%;
      background-color: $color-background;
    .no-result-content {
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
