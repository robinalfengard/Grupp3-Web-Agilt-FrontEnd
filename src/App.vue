<template>
  <div class="d-flex flex-column min-vh-100">
    <NavBarForTestingRouting />
    <div class="flex-grow-1">
      <router-view />
    </div>
    <FooterComponent class="mt-auto" />
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

