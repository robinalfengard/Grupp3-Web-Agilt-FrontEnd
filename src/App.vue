<template>
  <LandningPage />
  <LoginPage />
</template>

<script>
import LandningPage from './components/LandningPage.vue';
import LoginPage from './components/LoginPage.vue';

export default {
  name: 'App',
  components: {
    LandningPage, // ES6 shorthand syntax
    LoginPage,
  }
}
</script>

<style>
</style>

