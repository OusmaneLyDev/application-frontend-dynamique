<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const product = ref({});
const route = useRoute();

const fetchProduct = async () => {
  const response = await axios.get(`/api/products/${route.params.id}`);
  product.value = response.data;
};

onMounted(fetchProduct);
</script>

<template>
  <div>
    <h2>Détails du produit</h2>
    <p><strong>Nom:</strong> {{ product.name }}</p>
    <p><strong>Prix:</strong> {{ product.price }} €</p>
    <p><strong>Description:</strong> {{ product.description }}</p>
    <router-link to="/products" class="btn btn-secondary">Retour à la liste</router-link>
  </div>
</template>
