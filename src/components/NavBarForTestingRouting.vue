<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/">
        <a class="navbar-brand" href="#">Clothing Store</a>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
<<<<<<< HEAD
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
=======
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
>>>>>>> main
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <router-link to="/mypage">
<<<<<<< HEAD
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link active" aria-current="page" h>My Page</a>
=======
            <li class="nav-item">
              <a class="nav-link active" aria-current="page">MyPage</a>
>>>>>>> main
            </li>
          </router-link>
          <router-link to="/login">
            <li class="nav-item">
<<<<<<< HEAD
              <a @click="logout()" class="nav-link" v-text="isLoggedIn ? 'Logout' : 'Login'"></a>
=======
              <a class="nav-link">Login</a>
            </li>
          </router-link>
          <router-link to="/cart">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page">Shopping Cart</a>
>>>>>>> main
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
<<<<<<< HEAD
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
=======

export default {
  name: 'NavBarForTestingRouting',

>>>>>>> main
}
</script>