<template>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid"> 
      <a class="navbar-brand" href="#">Clothing Store</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
            <router-link to="/">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" h>Home</a>
          </li>
        </router-link>
        <router-link to="/signup">
          <li class="nav-item">
            <a class="nav-link">Sign Up</a>
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