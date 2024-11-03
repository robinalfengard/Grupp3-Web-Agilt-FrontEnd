<template>
  <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
  />
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid navbar-expand">
      <router-link to="/" class="navbar-brand">
        <img src="/g3.jpg" alt="logo" class="logo">
      </router-link>
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="isLoggedIn">
            <router-link to="/mypage" class="nav-link active" aria-current="page">
              <i class="bi bi-person-circle custom-icon"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" @click="logout">
              <i v-if="isLoggedIn" class="bi bi-box-arrow-right custom-icon"></i>
              <i v-else class="bi bi-person custom-icon"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link active" aria-current="page">
              <i class="bi bi-cart4 custom-icon"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBarForTestingRouting",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  watch: {
    $route() {
      this.checkLogin();
    },
  },
  methods: {
    checkLogin() {
      const token = localStorage.getItem("user");
      this.isLoggedIn = !!token; // true if token exists
    },
    logout() {
      localStorage.removeItem("user");
      this.isLoggedIn = false;
    },
  },
};
</script>

<style scoped>
.logo {
  width: 2.2rem;
  border-radius: 4px;
}
.custom-icon {
  font-size: 2rem;
  color: #007bff;
}

.nav-link:hover .custom-icon {
  color: #d22ead; /* Darker color on hover */
}
</style>
