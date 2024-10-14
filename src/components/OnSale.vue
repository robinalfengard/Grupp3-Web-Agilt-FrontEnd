<template>
  <div class="container text-center my-5">
    <h1 class="display-4 text-white p-3" style="background-color: red; border-radius: 10px;">
      20% Rabatt på Alla Deena Produkter!
    </h1>
  </div>
  <div class="container">
    <p v-if="loading" class="text-center">Loading products...</p>
    <p v-if="error" class="text-center text-danger">{{ error }}</p>
    <div v-if="products.length && !loading" class="row">
      <div v-for="product in products" :key="product.id" class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="card h-100">
          <img :src="product.image" alt="Product Image" class="card-img-top product-image">
          <div class="card-body">
            <h2 class="card-title text-center">{{ product.name }}</h2>
            <h5 v-if="product.onSale" class="text-danger text-center">ON SALE</h5>
            <h5 v-else class="text-danger text-center"><br></h5>
            <p class="text-center">{{ product.price }} kr</p>
            <p class="card-text">{{ product.description }}</p>
            <button @click="addToCart(product)" class="btn btn-primary w-100">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
    <p v-if="!products.length && !loading" class="text-center">No products available.</p>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const products = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch(`http://localhost:8080/product/onsale`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    products.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const addToCart = (product) => {
  console.log(`${product.name} has been added to the cart!`);
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.product-image {
  height: auto;
  object-fit: cover;
}

.card {
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}
</style>
