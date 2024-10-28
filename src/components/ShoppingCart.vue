<template>
  <div class="container mt-5">
    <h1 v-if="!user.id" class="text-center">You must be logged in to view your cart.</h1>
    <div v-else>
      <p v-if="loading" class="text-center">Loading your cart...</p>
      <p v-if="(cart.length === 0 && !loading) || total == 0" class="text-center">Your cart is empty</p>
      <table v-if="cart.length && total > 0" class="table table-striped table-bordered table-hover cart-table mx-auto">
        <thead class="thead-dark">
        <tr>
          <th>Product Name</th>
          <th>Size</th>
          <th>Price (kr)</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in cart.filter(item => item.paymentStatus === 'PENDING')" :key="item.id">
          <td>{{ item.product.name }}</td>
          <td>{{ item.size ? item.size.name : 'N/A' }}</td>
          <td>{{ item.product.price }} kr</td>
          <td>
            <button @click="removeFromCart(item)" class="btn btn-danger btn-sm">Remove</button>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="2" class="text-right"><strong>Total:</strong></td>
          <td colspan="2">{{ total }} kr</td>
        </tr>
        </tfoot>
      </table>
      <div v-if="cart.length > 0 && total > 0" class="text-center mt-4">
        <h2>At checkout, the discount for this item will be applied</h2>
        <button @click="checkout" class="btn btn-primary btn-lg">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user')) || {};
const cart = ref([]);
const loading = ref(false);
const total = ref(0);

const removeFromCart = async (item) => {
  try {
    await axios.delete(`http://localhost:8080/soldProduct/${user.id}/${item.product.id}`);

    cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id);

    total.value = cart.value
        .filter(item => item.paymentStatus === "PENDING")
        .reduce((acc, item) => acc + item.product.price, 0)
        .toFixed(2);
    alert(`${item.product.name} has been removed from your cart.`);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    alert("Failed to remove the item. Please try again.");
  }
};

const checkout = () => {
  if (cart.value.length === 0) {
    alert("Your cart is empty. Add items before checking out.");
    return;
  }

  alert("Proceeding to checkout!");
  window.location.href = "/checkout";
};

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
      if (cart.value.length === 0 || total.value == 0) {
        alert("Your cart is empty");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      loading.value = false;
    }
  }
});
</script>

<style scoped>
.cart-table {
  width: 80%;
  margin: 0 auto;
}

.thead-dark {
  background-color: #343a40;
  color: white;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}
</style>
