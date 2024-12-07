<template>
  <div class="container text-center my-5">
    <h1 class="display-4 text-white p-3" style="background-color: red; border-radius: 10px;">
      20% discount on products that are on sale!
    </h1>
  </div>
  <div class="container">
    <p v-if="loading" class="text-center">Loading products...</p>
    <p v-if="error" class="text-center text-danger">{{ error }}</p>
    <div v-if="products.length && !loading" class="row">
      <div v-for="product in products" :key="product.id" class="col-12 col-md-6 col-lg-3 mb-4">
        <div class="card h-100">
          <RouterLink :to="{ name: 'SelectedItem', params: { id: product.id } }">
            <img :src="product.image" alt="Product Image" class="card-img-top product-image">
          </RouterLink>
          <div class="card-body">
            <RouterLink :to="{ name: 'SelectedItem', params: { id: product.id } }" class="text-decoration-none">
              <h2 class="card-title text-center mb-2">{{ product.name }}</h2>
            </RouterLink>
            <h5 v-if="product.onSale" class="text-danger text-center">ON SALE</h5>
            <p class="text-center mt-3 mb-1">{{ product.price }} kr</p>
            <p class="card-text text-center product-description">{{ product.description }}</p>
            <button v-if="isLoggedIn" @click="addToCart(product)" class="btn btn-primary w-100 mt-3">Add to cart</button>
            <button v-if="isLoggedIn" @click="addToFavorites(product)" class="btn btn-outline-danger mt-2 w-100">♥ Add to Favorites</button>
          </div>
        </div>
      </div>
    </div>
    <p v-if="!products.length && !loading" class="text-center">No products available.</p>
    <GlobalModal ref="modalRef" />
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from "axios";
import GlobalModal from "@/components/GlobalModal.vue";

const products = ref([]);
const loading = ref(false);
const error = ref(null);
const user = JSON.parse(localStorage.getItem('user')) || {};
const isLoggedIn = ref(false);
const modalRef = ref(null); // Reference to the GlobalModal component

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

const addToFavorites = async (product) => {
  if (!user.id) {
    showModal("You need to log in to add favorites!");
    return;
  }

  try {
    await axios.post('http://localhost:8080/favoriteItem/add', {
      product: {id: product.id},
      user: {id: user.id},
    });
    showModal(`${product.name} has been added to your favorites!`);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    showModal("Failed to add product to favorites. Please try again.");
  }
};

const addToCart = (product) => {
  axios.post('http://localhost:8080/soldProduct', {
    product: {id: product.id},
    user: {id: user.id},
    dateWhenSold: new Date().toISOString().split('T')[0], // Today's date in format 'YYYY-MM-DD'
  })
      .then(response => {
        console.log('Product successfully added to sold products:', response.data);
        showModal("Product added to cart!");
      })
      .catch(error => {
        console.error('There was an error adding the product to sold products:', error);
      });
};

const checkIfLoggedIn = () => {
  const token = localStorage.getItem("user");
  isLoggedIn.value = !!token; // Set isLoggedIn to true if token exists
};

const showModal = (message) => {
  modalRef.value.showModal(message); // Call the showModal method of the GlobalModal component
};

onMounted(() => {
  checkIfLoggedIn();
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

.text-decoration-none {
  text-decoration: none;
}

.product-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
