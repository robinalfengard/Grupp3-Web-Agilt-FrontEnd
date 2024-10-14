<template>
  <div class="card shadow-sm w-75 mx-auto mt-5 mb-5">
    <div class="row align-items-center">
      <div class="col text-center">
        <h2 class="mt-5">Hello {{ user.firstName }}</h2>
      </div>
    </div>
    <div class="row justify-content-center mt-5">
      <div class="col-sm-6 col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-center">User Details</h5>
            <p>Email: {{ user.email }}</p>
            <p>Name: {{ user.firstName }}</p>
            <p>Lastname: {{ user.lastName }}</p>
            <p>City: {{ user.city }}</p>
            <p>Address: {{ user.address }}</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-center">Favorite Items</h5>
          </div>
        </div>
      </div>
    </div>
  


  <div class="container w-100">
    <div class="row align-items-center">
      <div class="col text-center">
      </div>
    </div>
    <div class="row justify-content-center w-100 mt-5 mb-5">
      <div class="col-sm-6 col-md-4 w-75">
        <div class="card shadow-sm w-100 mx-auto">
          <div class="card-body">
            <h5 class="card-title text-center">Previously Bought Items</h5>

          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'HomeComponent',

  setup() {
    const user = JSON.parse(localStorage.getItem('user'));
    return { user };
  },
}
</script>