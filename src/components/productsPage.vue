<template>
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
            <p class="text-center">{{ product.price }} kr</p>
            <p class="card-text">{{ product.description }}</p>
            <button @click="addToCart(product)" class="btn btn-primary w-100">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-center">No products available.</p>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';

const products = ref([]);
const route = useRoute();
const categoryId = route.params.id;

const fetchProducts = async () => {
  const response = await fetch(`http://localhost:8080/product/category/${categoryId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  products.value = data;
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
