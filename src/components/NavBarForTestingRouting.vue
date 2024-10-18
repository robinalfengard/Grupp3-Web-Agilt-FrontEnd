<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Clothing Store</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="isLoggedIn">
            <router-link to="/mypage" class="nav-link active" aria-current="page">My Page</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" @click="logout()">{{ isLoggedIn ? 'Logout' : 'Login' }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link active" aria-current="page">Shopping Cart</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBarForTestingRouting',
  data() {
    return {
      isLoggedIn: false
    }
  },
  mounted() {
    this.checkLogin();
  },
  watch: {
    $route() {
      this.checkLogin();
    }
  },
  methods: {
    checkLogin() {
      const token = localStorage.getItem('user');
      this.isLoggedIn = !!token; // true if token exists
    },
    logout() {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
    }
  }
}
</script>
