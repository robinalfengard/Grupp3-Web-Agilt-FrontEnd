<template>
  <div class="container">
    <div v-if="product" class="product-container text-center"> 
      <h1>{{ product.name }}</h1>
      <img :src="product.image" alt="Product Image" class="img-fluid product-image mx-auto" />
      <p>{{ product.description }}</p>
      <p class="text-danger">{{ product.price }} kr</p>

      
      <button @click="addToFavorites(product)" class="btn btn-outline-danger mt-2">
        ♥ Add to Favorites
      </button>

      
      <button @click="addToCart(product)" class="btn btn-primary mt-2">Add to Cart</button>
    </div>
    <p v-else class="text-center">Loading product...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const product = ref(null);
const route = useRoute();
const productId = route.params.id;


const user = JSON.parse(localStorage.getItem('user')) || {};


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


const addToFavorites = async (product) => {
  if (!user.id) {
    alert("You need to log in to add favorites!");
    return;
  }

  try {
    await axios.post('http://localhost:8080/favoriteItem/add', {
      product: {
        id: product.id,
      },
      user: {
        id: user.id,
      }
    });
    alert(`${product.name} has been added to your favorites!`);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    alert("Failed to add product to favorites. Please try again.");
  }
};


const addToCart = async (product) => {
  if (!user.id) {
    alert("You need to log in to add items to the cart!");
    return;
  }

  try {
    await axios.post('http://localhost:8080/soldProduct', {
      product: {
        id: product.id,
      },
      user: {
        id: user.id,
      },
      dateWhenSold: new Date().toISOString().split('T')[0]  
    });
    alert(`${product.name} has been added to your cart!`);
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Failed to add product to cart. Please try again.");
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
  max-width: 600px;       
  margin: auto;           
}

.product-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: cover;
  margin-bottom: 20px;
}
</style>








