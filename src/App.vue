<template>
   <div>
    <NavBarForTestingRouting />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from './components/FooterComponent.vue';
import NavBarForTestingRouting from './components/NavBarForTestingRouting.vue';

export default {
  components: {
       NavBarForTestingRouting,
       FooterComponent
  }
}
</script>

<style>
</style>

