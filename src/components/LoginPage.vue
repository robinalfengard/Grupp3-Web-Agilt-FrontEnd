<template>
  <div class="login-container container mt-5">
    <h2 class="text-center mb-4">Sign in</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" v-model="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" v-model="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
    <p class="mt-3 text-center">
      Don't have an account?
      <router-link to="/signup" class="text-primary fw-bold">Sign up here</router-link>
    </p>
    <p v-if="errorMessage" class="text-danger mt-3 text-center">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {

  
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },

  created() {
    this.router = useRouter();
  },
  methods: {
    async handleSubmit() {
      if (this.email === '' || this.password === '') {
        this.errorMessage = 'Please fill in all fields';
        return;
      }
      const userData = {
        email: this.email,
        password: this.password
      };
      

      try {
        const response = await axios.post('http://localhost:8080/user/login', userData);
        console.log('Login successful');
        localStorage.clear()
        localStorage.setItem('user', JSON.stringify(response.data));
        const redirectPath =  '/';
        this.router.push(redirectPath);
      } catch (error) {
        console.error('Login failed:', error);
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Invalid credentials. Please try again.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>



