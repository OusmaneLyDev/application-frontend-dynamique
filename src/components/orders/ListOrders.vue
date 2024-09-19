<script setup>
import { ref, onMounted } from 'vue';


const orders = ref([]);

const fetchOrders = async () => {
  const response = await axios.get('/api/orders');
  orders.value = response.data;
};

onMounted(fetchOrders);
</script>

<template>
  <div>
    <h2>Liste des commandes</h2>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Client</th>
          <th>Produit</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.productName }}</td>
          <td>{{ order.date }}</td>
          <td>
            <router-link :to="`/orders/${order.id}`" class="btn btn-info">Détails</router-link>
            <button class="btn btn-warning">Modifier</button>
            <button class="btn btn-danger">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
