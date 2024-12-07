<template>
  <div class="container">
    <div class="d-flex justify-content-end mb-4 mt-2">
      <input 
        type="text"
        class="form-control me-2"
        placeholder="Search"
        v-model="searchQuery"
      />
      <div class="dropdown">
        <button
          class="btn btn-light dropdown-toggle fw-bold"
          type="button"
          id="sortByDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort By <i class="bi bi-chevron-down"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="sortByDropdown">
          <li><a class="dropdown-item" @click.prevent="changeSort('lowest')" href="#">Lowest Price First</a></li>
          <li><a class="dropdown-item" @click.prevent="changeSort('highest')" href="#">Highest Price First</a></li>
        </ul>
      </div>
    </div>
    
    <p v-if="loading" class="text-center">Loading products...</p>
    <p v-if="error" class="text-center text-danger">{{ error }}</p>
    <div v-if="products.length && !loading" class="row">
      <div v-for="product in filteredProducts" :key="product.id" class="col-12 col-md-6 col-lg-3 mb-4">
        <router-link :to="{ name: 'SelectedItem', params: { id: product.id } }" class="card h-100">
          <div class="card h-100">
            <img :src="product.image" alt="Product Image" class="card-img-top product-image">
            <div class="card-body">
              <h2 class="card-title text-center">{{ product.name }}</h2>
              <h5 v-if="product.onSale" class="text-danger text-center">ON SALE</h5>
              <h5 v-if="!product.onSale"><br></h5>
              <p class="text-center">{{ product.price }} kr</p>
              <p class="card-text product-description">{{ product.description }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <p v-else class="text-center">No products available.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const products = ref([]);
const route = useRoute();
const categoryId = route.params.id;
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const isLoggedIn = ref(false);

const checkIfLoggedIn = () => {
  const token = localStorage.getItem("user");
  console.log(isLoggedIn.value);
  if (token) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
}





const fetchProducts = async () => {
  try {
    const response = await fetch(`http://localhost:8080/product/category/${categoryId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    products.value = data;
  } catch (err) {
    error.value = `Failed to load products: ${err.message}`;
    console.error("Error fetching products:", err);
  } finally {
    loading.value = false;
  }
};

const changeSort = (criteria) => {
  if (criteria === 'lowest') {
    products.value.sort((a, b) => a.price - b.price);
  } else {
    products.value.sort((a, b) => b.price - a.price);
  }
};

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  fetchProducts();
  checkIfLoggedIn();
});
</script>

<style scoped>
.product-image {
  height: auto;
  object-fit: cover;
}
.card {
  transition: transform 0.2s ease-in-out;
  overflow: hidden;
}
.card:hover {
  transform: scale(1.05);
}
.product-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>


