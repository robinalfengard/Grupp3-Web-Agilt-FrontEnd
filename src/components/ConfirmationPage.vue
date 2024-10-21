<template>
  <div class="container mt-5">
    <div class="card shadow-lg p-4">
      <div class="card-body text-center">
        <h1 class="card-title text-success mb-4">Order Confirmation</h1>
        <h2 class="card-subtitle mb-3">Thank you for your order,<strong> {{ user.firstName }} </strong>!</h2>

        <p class="lead mb-3">Your order number is: <strong>#{{ numberOrder }}</strong></p>

        <p class="mb-3">
          Your order will be shipped to:<br>
          <strong>{{ user.address }}</strong>,<br> {{ user.city }}
        </p>

        <p class="mb-3">
          Date of order: <strong>{{ dateofOrder }}</strong>
        </p>

        <div class="alert alert-success mt-4" role="alert">
          Thank you for shopping with us!
        </div>

        <a href="/" class="btn btn-primary mt-3">Back to Shop</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = JSON.parse(localStorage.getItem('user')) || {};

// Generate a unique order number based on user ID
const numberOrder = user.id ? user.id * 426853 : 'Unknown';

// Function to add days to the current date (e.g., for estimated delivery date)
const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Date of order, 3 days from now
const dateofOrder = addDays(new Date(), 3).toLocaleDateString();
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: 0 auto;
}

.card-title {
  font-size: 2rem;
  color: #28a745;
}

.lead {
  font-size: 1.25rem;
}

.alert {
  font-size: 1.1rem;
}
</style>
