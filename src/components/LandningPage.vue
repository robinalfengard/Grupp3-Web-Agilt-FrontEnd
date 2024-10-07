<template>
  <div>
    <p v-if="loading">Loading categories...</p>
    <p v-if="error">{{ error }}</p>
    <ul v-if="categories.length && !loading">
      <div v-for="category in categories" :key="category.id">
        <div class="category-item">
          <h2>{{ category.name }}</h2>
          <img :src="category.image || '/path/to/fallback.jpg'" alt="Category Image" class="category-image" />
        </div>
      </div>
    </ul>
    <p v-else>No categories available.</p>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

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
.category-item {
  text-align: center;
  margin: 20px;
}

.category-image {
  width: 200px;
  height: auto;
}
</style>
