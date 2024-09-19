<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const order = ref({});
const route = useRoute();

const fetchOrder = async () => {
  const response = await axios.get(`/api/orders/${route.params.id}`);
  order.value = response.data;
};

onMounted(fetchOrder);
</script>

<template>
  <div>
    <h2>Détails de la commande</h2>
    <p><strong>ID Client:</strong> {{ order.customerId }}</p>
    <p><strong>ID Produit:</strong> {{ order.productId }}</p>
    <p><strong>Date:</strong> {{ order.date }}</p>
    <router-link to="/orders" class="btn btn-secondary">Retour à la liste</router-link>
  </div>
</template>


<template>
  <div>
    <h2>Add Order Details</h2>
    <!-- Formulaire pour ajouter les détails de la commande -->
    <table>
      <!-- Table avec les produits, quantité, etc. -->
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Détails des produits, quantités, prix
    };
  }
};
</script>

