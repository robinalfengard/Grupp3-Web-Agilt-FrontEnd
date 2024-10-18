<template>
  <h1>CONFIRMATION</h1>
  <h2>Thank you for your order, {{ user.firstname }}!</h2>
  <p>Your order number is: {{ numberOrder }}</p>
  <p>Your order will be shipped to: {{ user.address }}, {{ user.city }}</p>
  <p>Date of order: {{ dateofOrder }}</p>
  <p>Thank you for shopping with us!</p>
</template>

<script setup>
const user = JSON.parse(localStorage.getItem('user')) || {};

const numberOrder = user.id ? user.id * 426853 : 'Unknown';

const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const dateofOrder = addDays(new Date(), 3).toLocaleDateString();
</script>

<style scoped>
</style>
