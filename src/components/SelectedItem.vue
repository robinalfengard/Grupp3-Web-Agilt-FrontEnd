<template>
  <div class="container">
    <div v-if="product" class="product-container">
      <h1 class="text-center">{{ product.name }}</h1>
      <img :src="product.image" alt="Product Image" class="img-fluid product-image" />
      <p>{{ product.description }}</p>
      <p class="text-danger">{{ product.price }} kr</p>
      <button @click="addToCart(product)" class="btn btn-primary">Add to Cart</button>
    </div>
    <p v-else class="text-center">Loading product...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const product = ref(null);
const route = useRoute();
const productId = route.params.id;

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

onMounted(() => {
  fetchProduct();
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




