<template>
  <div>
    <h1>Selected Item</h1>
    <div v-if="product">
      <img :src="product.image" alt="Product Image" />
      <p><strong>Name:</strong> {{ product.name }}</p>
      <p><strong>Description:</strong> {{ product.description }}</p>
      <p><strong>Price:</strong> {{ product.price }} USD</p>
      <p><strong>Category:</strong> {{ product.category.name }}</p>
      <p><strong>Size:</strong> {{ product.size.name }}</p>
    </div>
    <div v-else>
      <p>Loading product details...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const product = ref(null);  
    const route = useRoute();    

    onMounted(() => {
      const productId = route.params.id;  

      
      axios.get(`http://localhost:8080/product/${productId}`)
        .then(response => {
          product.value = response.data;  
        })
        .catch(error => {
          console.error("Error fetching product:", error);  
        });
    });

    return {
      product
    };
  }
};
</script>

<style scoped>
  img {
    max-width: 300px;
    height: auto;
  }
</style>


