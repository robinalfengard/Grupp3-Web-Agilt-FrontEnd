<template>
  <div class="container mt-5">
    <!-- Cart Section -->
    <h1 v-if="!user.id" class="text-center">You must be logged in to view your cart.</h1>
    <div v-else>
      <p v-if="loading" class="text-center">Loading your cart...</p>
      <p v-if="cart.length === 0 && !loading" class="text-center">Your cart is empty</p>

      <table v-if="cart.length" class="table table-striped table-bordered table-hover cart-table mx-auto">
        <thead class="thead-dark">
        <tr>
          <th>Product Name</th>
          <th>Size</th>
          <th>Price (kr)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in cart.filter(item => item.paymentStatus === 'PENDING')" :key="item.id">
          <td>{{ item.product.name }}</td>
          <td>{{ item.product.size.name }}</td>
          <td>{{ item.product.price }} kr</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="2" class="text-right" style="color: orangered; font-weight: bold"><strong>Total:</strong></td>
          <td colspan="2" style="color: orangered; font-weight: bold">{{ total }} kr</td>
        </tr>
        </tfoot>
      </table>
    </div>
  </div>

  <!-- Shipping and Payment Details -->
  <div class="container mt-5">
    <div>
      <h2>Shipping address</h2>
      {{ user.address }}, {{ user.city }}<br>
      {{ user.firstName }} {{ user.lastName }}<br>
    </div>

    <!-- Post Type -->
    <div>
      <h3>Post type</h3>
      <div>
        <label><input type="radio" v-model="selectedPostType" value="STANDARD"> STANDARD</label><br>
        <label><input type="radio" v-model="selectedPostType" value="POSTNORD"> POSTNORD</label><br>
        <label><input type="radio" v-model="selectedPostType" value="EXPRESS"> EXPRESS</label><br>
        <label><input type="radio" v-model="selectedPostType" value="DHL"> DHL</label><br>
      </div>
    </div>

    <!-- Payment Type -->
    <div>
      <h3>Payment type</h3>
      <div>
        <label><input type="radio" v-model="selectedPaymentType" value="CREDIT_CARD"> Credit Card</label><br>
        <label><input type="radio" v-model="selectedPaymentType" value="FACTOR"> Factor</label><br>
        <label><input type="radio" v-model="selectedPaymentType" value="BANK_TRANSFER"> Bank Transfer</label><br>
      </div>
    </div>
  </div>

  <!-- Payment Button -->
  <div class="text-center mt-4">
    <button @click="processPayment" class="btn btn-primary btn-lg">Proceed to Payment</button>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';

// Initialize variables
const user = JSON.parse(localStorage.getItem('user')) || {};
const cart = ref([]);
const loading = ref(false);
const total = ref(0);
const selectedPostType = ref('STANDARD');
const selectedPaymentType = ref('CREDIT_CARD');

// Fetch cart data when component is mounted
onMounted(async () => {
  if (user && user.id) {
    loading.value = true;
    try {
      const response = await axios.get(`http://localhost:8080/soldProduct/${user.id}`);
      cart.value = response.data.length ? response.data : [];
      total.value = cart.value
          .filter(item => item.paymentStatus === 'PENDING')
          .reduce((acc, item) => acc + item.product.price, 0)
          .toFixed(2);
      if (cart.value.length === 0) {
        alert("Your cart is empty");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      loading.value = false;
    }
  }
});

// Handle payment processing
const processPayment = async () => {
  try {
    // Send the payment data to the backend
    await axios.put(`http://localhost:8080/soldProduct/checkout/${user.id}`, {
      paymentType: selectedPaymentType.value,
      postType: selectedPostType.value,
      paymentStatus:"COMPLETED"
    });

    window.location.href = '/';
  } catch (error) {
    console.error("Error processing payment:", error);
    alert('Payment failed. Please try again.');
  }
};
</script>

<style scoped>

</style>
