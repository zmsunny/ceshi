<template>
  <div id="app-home" class="page">
      <home-header></home-header>
      <homeBanner></homeBanner>
      <homeTopic></homeTopic>
      <router-view></router-view>
      <app-nav></app-nav>

  </div>
</template>

<script>
import homeHeader from './Header'
import homeBanner from './Banner'
import homeTopic from './Topic'



export default {
  name: 'AppHome',
  components: {
    homeHeader,
    homeBanner,
    homeTopic,
  }
}
</script>
<style scoped lang = "scss">

</style>
