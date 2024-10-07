<template>
  <LandningPage />
  <LoginPage />
</template>

<script>
import LandningPage from './components/LandningPage.vue';
import LoginPage from './components/LoginPage.vue';
import NavBarForTestingRouting from './components/NavBarForTestingRouting.vue';
  
  <div>
    <NavBarForTestingRouting />
    <router-view />
  </div>
</template>

<script>


export default {
  components: {
    LandningPage, // ES6 shorthand syntax
    LoginPage,
    NavBarForTestingRouting,
  }
}
</script>

<style>
</style>

