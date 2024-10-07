<template>
  <div>
    <NavBarForTestingRouting />
    <router-view />
  </div>
</template>

<script>
import NavBarForTestingRouting from './components/NavBarForTestingRouting.vue';

export default {
  components: {
    NavBarForTestingRouting
  }
}
</script>