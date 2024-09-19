<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const customers = ref([]);

const fetchCustomers = async () => {
  const response = await axios.get('/api/customers');
  customers.value = response.data;
};

onMounted(fetchCustomers);
</script>

<template>
  <div>
    <h2>Liste des clients</h2>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>
            <router-link :to="`/customers/${customer.id}`" class="btn btn-info">Détails</router-link>
            <button class="btn btn-warning">Modifier</button>
            <button class="btn btn-danger">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
