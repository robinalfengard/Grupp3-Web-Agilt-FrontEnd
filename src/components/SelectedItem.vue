<template>
  <div class="container">
    <h1>Selected Item</h1>
    <div v-if="product">
      <img :src="product.image" alt="Product image" class="img-fluid" />
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <p>Price: {{ product.price }} USD</p>
      <p>Category: {{ product.category.name }}</p>
      <p>Size: {{ product.size.name }}</p>
    </div>
    <div v-else>
      <p>Loading product details...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],  
  data() {
    return {
      product: null
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    fetchProduct() {
      axios.get(`http://localhost:8080/product/${this.id}`)
        .then(response => {
          this.product = response.data;
        })
        .catch(error => {
          console.error("Error fetching product:", error);
        });
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
}
.img-fluid {
  max-width: 50%;
  height: auto;
}
</style>

