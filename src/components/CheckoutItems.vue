<template>
  <!-- Cart Section -->
  <div class="container mt-5">
    <div v-if="!user.id" class="alert alert-warning text-center" role="alert">
      <h1>You must be logged in to view your cart.</h1>
    </div>

    <div v-else>
      <p v-if="loading" class="text-center text-muted">Loading your cart...</p>
      <div v-if="cart.length === 0 && !loading" class="alert alert-info text-center">
        <p>Your cart is empty</p>
      </div>

      <!-- Cart Table -->
      <div v-if="cart.length">
        <table class="table table-striped table-bordered table-hover cart-table">
          <thead class="thead-dark">
          <tr>
            <th>Product Name</th>
            <th>Size</th>
            <th>Price</th>
            <th>Sale</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in cart.filter(item => item.paymentStatus === 'PENDING')" :key="item.id">
            <td>{{ item.product.name }}</td>
            <td>{{ item.size ? item.size.name : 'N/A' }}</td>
            <td v-if="item.product.onSale">{{ (item.product.price * 0.8).toFixed(2) }} </td>
            <td v-if="!item.product.onSale">{{ item.product.price }} </td>
            <td v-if="item.product.onSale" style="color: red">{{ (item.product.price * 0.2).toFixed(2) }} </td>
            <td v-if="!item.product.onSale" style="color: red">0.00</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colspan="2" class="text-end"><strong>Total:</strong></td>
            <td style="color: orangered; font-weight: bold">{{ total }} kr</td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>

  <!-- Shipping and Payment Details -->
  <div class="container mt-5">
    <div class="row">
      <!-- Shipping Details -->
      <div class="col-md-6">
        <h2 class="mb-3">Shipping Address</h2>
        <p>
          <strong>{{ user.firstName }} {{ user.lastName }}</strong><br>
          {{ user.address }}<br> {{ user.city }}
        </p>
      </div>

      <!-- Post Type -->
      <div class="col-md-6">
        <h3 class="mb-3">Post Type</h3>
        <div class="form-check">
          <input type="radio" class="form-check-input" v-model="selectedPostType" value="STANDARD">
          <label class="form-check-label">STANDARD</label>
        </div>
        <div class="form-check">
          <input type="radio" class="form-check-input" v-model="selectedPostType" value="POSTNORD">
          <label class="form-check-label">POSTNORD</label>
        </div>
        <div class="form-check">
          <input type="radio" class="form-check-input" v-model="selectedPostType" value="EXPRESS">
          <label class="form-check-label">EXPRESS</label>
        </div>
        <div class="form-check">
          <input type="radio" class="form-check-input" v-model="selectedPostType" value="DHL">
          <label class="form-check-label">DHL</label>
        </div>
      </div>
    </div>

    <!-- Payment Type -->
    <div class="row mt-4">
      <div class="col-md-6">
        <h3 class="mb-3">Payment Type</h3>
        <div class="form-check">
          <input type="radio" class="form-check-input" v-model="selectedPaymentType" value="CREDIT_CARD">
          <label class="form-check-label">Credit Card</label>
        </div>
        <div class="form-check">
          <input type="radio" class="form-check-input" v-model="selectedPaymentType" value="FACTOR">
          <label class="form-check-label">Factor</label>
        </div>
        <div class="form-check">
          <input type="radio" class="form-check-input" v-model="selectedPaymentType" value="BANK_TRANSFER">
          <label class="form-check-label">Bank Transfer</label>
        </div>
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
const isProcessingPayment = ref(false);

// Fetch cart data when component is mounted
onMounted(async () => {
  if (user && user.id) {
    loading.value = true;
    try {
      const response = await axios.get(`http://localhost:8080/soldProduct/${user.id}`);
      cart.value = response.data.length ? response.data : [];
      total.value = cart.value
          .filter(item => item.paymentStatus === 'PENDING')
          .reduce((acc, item) => {
            const discountedPrice = item.product.onSale ? item.product.price * 0.8 : item.product.price;
            return acc + discountedPrice;
          }, 0)
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
  if (isProcessingPayment.value) return;
  isProcessingPayment.value = true;

  try {
    // Send the payment data to the backend
    await axios.put(`http://localhost:8080/soldProduct/checkout/${user.id}`, {
      paymentType: selectedPaymentType.value,
      postType: selectedPostType.value,
      paymentStatus: "COMPLETED"
    });

    window.location.href = '/confirmationPage';
  } catch (error) {
    console.error("Error processing payment:", error);
    alert('Payment failed. Please try again.');
  } finally {
    isProcessingPayment.value = false;
  }
};
</script>

<style scoped>
.cart-table {
  width: 100%;
  margin: 0 auto;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

thead.thead-dark {
  background-color: #343a40;
  color: white;
}

.container {
  max-width: 800px;
}

.text-end {
  text-align: end;
}
</style>
