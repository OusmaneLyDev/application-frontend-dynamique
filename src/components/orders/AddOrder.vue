<script setup>
import { ref } from 'vue';
import axios from 'axios';

const customerId = ref('');
const productId = ref('');
const date = ref('');

const addOrder = async () => {
  const order = {
    customerId: customerId.value,
    productId: productId.value,
    date: date.value,
  };
  await axios.post('/api/orders', order);
  resetForm();
};

const resetForm = () => {
  customerId.value = '';
  productId.value = '';
  date.value = '';
};
</script>

<template>
  <div>
    <h2>Ajouter une commande</h2>
    <form @submit.prevent="addOrder">
      <div class="mb-3">
        <label for="customerId" class="form-label">ID du client</label>
        <input id="customerId" class="form-control" v-model="customerId" />
      </div>
      <div class="mb-3">
        <label for="productId" class="form-label">ID du produit</label>
        <input id="productId" class="form-control" v-model="productId" />
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Date</label>
        <input id="date" type="date" class="form-control" v-model="date" />
      </div>
      <button type="submit" class="btn btn-primary">
        Ajouter
      </button>
    </form>
  </div>
</template>
