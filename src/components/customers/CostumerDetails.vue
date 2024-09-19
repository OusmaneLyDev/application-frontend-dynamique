<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const customer = ref({});
const route = useRoute();

const fetchCustomer = async () => {
  const response = await axios.get(`/api/customers/${route.params.id}`);
  customer.value = response.data;
};

onMounted(fetchCustomer);
</script>

<template>
  <div>
    <h2>Détails du client</h2>
    <p><strong>Nom:</strong> {{ customer.name }}</p>
    <p><strong>Email:</strong> {{ customer.email }}</p>
    <p><strong>Téléphone:</strong> {{ customer.phone }}</p>
    <router-link to="/" class="btn btn-secondary">Retour à la liste</router-link>
  </div>
</template>
