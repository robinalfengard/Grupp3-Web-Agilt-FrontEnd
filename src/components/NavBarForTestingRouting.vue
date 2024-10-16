<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/">
        <a class="navbar-brand" href="#">Clothing Store</a>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <router-link to="/mypage">
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link active" aria-current="page" h>My Page</a>
            </li>
          </router-link>
          <router-link to="/login">
            <li class="nav-item">
              <a @click="logout()" class="nav-link" v-text="isLoggedIn ? 'Logout' : 'Login'"></a>
            </li>
          </router-link>
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
      if (token) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
    logout() {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
    }
  }
}
</script>