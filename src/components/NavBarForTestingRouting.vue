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
            <li class="nav-item">
              <a class="nav-link active" aria-current="page">MyPage</a>
            </li>
          </router-link>
          <router-link to="/login">
            <li class="nav-item">
              <a class="nav-link">Login</a>
            </li>
          </router-link>
          <router-link to="/cart">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page">Shopping Cart</a>
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

}
</script>