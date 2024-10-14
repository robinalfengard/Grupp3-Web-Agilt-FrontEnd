<template>
  <div class="container">
    <p v-if="loading" class="text-center">Loading categories...</p>
    <p v-if="error" class="text-center text-danger">{{ error }}</p>
    <div v-if="categories.length && !loading" class="row">
      <div v-for="category in categories" :key="category.id" class="col-6 col-md-4 col-lg-3 mb-4">
        <RouterLink :to="{ name:'productsPage', params:{id:category.id}}">
        <div class="card h-100">
          <img :src="category.image" alt="Category Image" class="card-img-top category-image">
          <div class="card-body">
            <h2 class="card-title text-center">{{ category.name }}</h2>
          </div>
        </div>
        </RouterLink>
      </div>
    </div>
    <p v-else class="text-center">No categories available.</p>
  </div>
  <OnSale/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import OnSale from "@/components/OnSale.vue";

const categories = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:8080/category/all");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    categories.value = data;
  } catch (err) {
    error.value = `Failed to load categories: ${err.message}`;
    console.error("Error fetching categories:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.category-image {
  width: 100%;
  height: auto; /* Automatisk höjd för att bibehålla proportionerna */
  object-fit: cover; /* Täcker kortets bredd utan att förvrängas */
}
</style>
