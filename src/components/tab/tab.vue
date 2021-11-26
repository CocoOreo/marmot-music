<template>
  <div class="tab">
    <router-link
      class="tab-item"
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
    >
      <span class="tab-link">
        {{tab.name}}
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      tabs: [
        {
          name: 'Recommend',
          path: '/recommend'
        },
        {
          name: 'Singer',
          path: '/singer'
        },
        {
          name: 'Top',
          path: '/top-list'
        },
        {
          name: 'Search',
          path: '/search'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab {
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: $font-size-medium;
    background-color: darken($color-background, 6%);
    .tab-item {
      flex: 1;
      text-align: center;

      .tab-link {
        padding-bottom: 5px;
        color: $color-text-l;
      }

      &.router-link-active {
        .tab-link {
          color: $color-theme;
          border-bottom: 2px solid $color-theme;
        }
      }
    }
  }
</style>
