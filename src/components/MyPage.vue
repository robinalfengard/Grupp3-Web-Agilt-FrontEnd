<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h2 class="text-center mb-4">Hello {{ user.firstName }}!</h2>
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h5 class="card-title text-center">User Details</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Email: {{ user.email }}</li>
                  <li class="list-group-item">Name: {{ user.firstName }}</li>
                  <li class="list-group-item">Lastname: {{ user.lastName }}</li>
                  <li class="list-group-item">City: {{ user.city }}</li>
                  <li class="list-group-item">Address: {{ user.address }}</li>
                </ul>
              </div>

              <div class="col-md-6">
                <h5 class="card-title text-center">Favorite Items</h5>
                <p>{{ infoTextFavoriteItems }}</p>
                <ul class="list-group list-group-flush">
                  <li v-for="item in favoriteItems" :key="item.id" class="list-group-item">
                    <div class="row">
                      <div class="col-md-4">
                        <RouterLink :to="{ name: 'SelectedItem', params: { id: item.product.id } }">
                          <img :src="item.product.image" alt="image of item" class="img-fluid">
                        </RouterLink>
                      </div>
                      <div class="col-md-8">
                        <RouterLink :to="{ name: 'SelectedItem', params: { id: item.product.id } }" class="text-decoration-none">
                          <h6>{{ item.product.name }}</h6>
                        </RouterLink>
                        <p>Pris: {{ item.product.price }} kr</p>
                        <p>Beskrivning: {{ item.product.description }}</p>
                        <button @click="removeFavoriteItem(item)" class="btn btn-danger">Remove</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mt-5">
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-center">Previously Bought Items</h5>
            <p>{{ infoTextPreviouslyBoughtItems }}</p>
            <ul class="list-group list-group-flush">
              <li v-for="item in previouslyBoughtProducts" :key="item.id" class="list-group-item">
                <div class="row">
                  <div class="col-md-4">
                    <img v-if="item.product && item.product.image" :src="item.product.image" alt="image of item" class="img-fluid">
                  </div>
                  <div class="col-md-8">
                    <h6 v-if="item.product && item.product.name">{{ item.product.name }}</h6>
                    <p v-if="item.product && item.product.description">Beskrivning: {{ item.product.description }}</p>
                    <p v-if="item.product && item.product.price">Pris:<b> {{ item.product.price }}</b></p>
                    <p v-if="item.product && item.dateWhenSold">Datum: <b>{{ item.dateWhenSold }}</b></p>
                    <p>Payment status: <b>{{ item.paymentStatus }}</b></p>
                    <p>Payment Method: <b>{{ item.paymentType }}</b></p>
                    <p>Post Type: <b>{{ item.postType }}</b></p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'HomeComponent',
  
  setup() {
    const user = JSON.parse(localStorage.getItem('user'));
    const previouslyBoughtProducts = ref([]);
    const favoriteItems = ref([]);
    var infoTextPreviouslyBoughtItems = ref('');
    var infoTextFavoriteItems = ref('');

    const fetchPreviouslyBaughtProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/soldProduct/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        previouslyBoughtProducts.value = data;
        if(previouslyBoughtProducts.value.length === 0 || previouslyBoughtProducts.value === null) {
            infoTextPreviouslyBoughtItems = "No previously bought items found"          
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchFavoriteItems = async () => {
        try {
            const response = await fetch(`http://localhost:8080/favoriteItem/${user.id}`);
            if (!response.ok) {
              infoTextFavoriteItems = "No favorite items found"
              throw new Error("Failed to fetch favorite items");
            }
            const data = await response.json();
            favoriteItems.value = data;
        } catch (err) {
            console.log(err);
        }
    };
    
    fetchPreviouslyBaughtProducts();
    fetchFavoriteItems();

    return { user, previouslyBoughtProducts, infoTextPreviouslyBoughtItems, infoTextFavoriteItems, favoriteItems };
  },

  methods: {
    removeFavoriteItem(item) {
      fetch(`http://localhost:8080/favoriteItem/delete/${item.id}`, {
        method: 'DELETE',
      })
        .then(() => {
          this.favoriteItems = this.favoriteItems.filter((i) => i.id !== item.id);
        })
        .catch((error) => {
          console.error('Error deleting favorite item:', error);
        });
      }
  }
}
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}
</style>
