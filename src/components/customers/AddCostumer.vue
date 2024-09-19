<script setup>
import { ref } from 'vue';
import axios from 'axios';

const name = ref('');
const email = ref('');
const phone = ref('');

const addCustomer = async () => {
  const customer = {
    name: name.value,
    email: email.value,
    phone: phone.value
  };
  await axios.post('/api/customers', customer);
  resetForm();
};

const resetForm = () => {
  name.value = '';
  email.value = '';
  phone.value = '';
};
</script>

<template>
  <div>
    <h2>Ajouter un client</h2>
    <form @submit.prevent="addCustomer">
      <div class="mb-3">
        <label for="name" class="form-label">Nom</label>
        <input id="name" class="form-control" v-model="name" />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input id="email" class="form-control" v-model="email" />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Téléphone</label>
        <input id="phone" class="form-control" v-model="phone" />
      </div>
      <button type="submit" class="btn btn-primary">
        <img src="@/assets/add-icon.svg" alt="Add Icon" width="20" />
        Ajouter
      </button>
    </form>
  </div>
</template>
