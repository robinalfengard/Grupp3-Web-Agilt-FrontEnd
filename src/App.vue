<template>
  <LandningPage />
  <div>
    <NavBarForTestingRouting />
    <router-view />
  </div>
</template>

<script>
import NavBarForTestingRouting from './components/NavBarForTestingRouting.vue';
import LandningPage from './components/LandningPage.vue';

export default {
  components: {
    NavBarForTestingRouting
    LandningPage, // ES6 shorthand syntax
  }
}
</script>

<style>
</style>
