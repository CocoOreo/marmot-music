<template>
  <div>
    <Header />
    <Tab />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
export default {
  components: {
    Header,
    Tab
  }
}
</script>

<style lang="scss">

</style>
