<template>
  <div class="container">
    <div v-if="product" class="product-container">
      <h1 class="text-center">{{ product.name }}</h1>
      <img :src="product.image" alt="Product Image" class="img-fluid product-image" />
      <p>{{ product.description }}</p>
      <p class="text-danger">{{ product.price }} kr</p>
      <button @click="handleAddToCart(product)" class="btn btn-primary">Add to Cart</button>
    </div>
    <p v-else class="text-center">Loading product...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

// Product-related data
const product = ref(null);
const route = useRoute();
const productId = route.params.id;


const user = JSON.parse(localStorage.getItem('user')) || {};
const isLoggedIn = ref(false);


const checkIfLoggedIn = () => {
  const token = localStorage.getItem("user");
  isLoggedIn.value = !!token;
};


const fetchProduct = async () => {
  try {
    const response = await fetch(`http://localhost:8080/product/${productId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    product.value = await response.json();
  } catch (err) {
    console.error("Error fetching product:", err);
  }
};

// Function to add product to the shopping cart
const addToCart = async (product) => {
  if (!isLoggedIn.value) {
    alert("You must be logged in to add items to the cart.");
    return;
  }

  try {
    await axios.post('http://localhost:8080/soldProduct', {
      product: {
        id: product.id,
      },
      user: {
        id: user.id
      },
      dateWhenSold: new Date().toISOString().split('T')[0]  // Format 'YYYY-MM-DD'
    });

    alert("Product added to cart!");
  } catch (error) {
    console.error('There was an error adding the product to sold products:', error);
    alert("Failed to add item to cart. Please try again.");
  }
};

// Wrapper function to handle adding product to cart
const handleAddToCart = (product) => {
  checkIfLoggedIn();  // Check if the user is logged in before adding to cart
  addToCart(product); // Add product to cart if logged in
};

// Run fetchProduct on mount
onMounted(() => {
  fetchProduct();
  checkIfLoggedIn();  // Check if user is logged in when component is mounted
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.product-container {
  text-align: center;
  max-width: 500px;
}

.product-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: cover;
  margin-bottom: 20px;
}

.text-center {
  text-align: center;
}
</style>






