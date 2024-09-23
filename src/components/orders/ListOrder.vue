<template>
    <div class="container mt-4">
      <h2 class="mb-4 mt-4">List of Orders</h2>
      <div class="d-flex justify-content-end">
        <router-link class="btn btn-primary mb-3" to="/AddOrder">Add New Order</router-link>
      </div>
     
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Customer</th>
            <th scope="col">Delivery Address</th>
            <th scope="col">Track Number</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.trackNumber">
            <td>{{ order.date }}</td>
            <td>{{ order.customer }}</td>
            <td>{{ order.deliveryAddress }}</td>
            <td>{{ order.trackNumber }}</td>
            <td>{{ order.status }}</td>
            <td>
            <router-link :to="{ name: 'order-view', params: { id: order.trackNumber } }"><font-awesome-icon icon="eye" class="text-info me-2" />
            </router-link>
            <router-link :to="{ name: 'order-edit', params: { id: order.trackNumber } }"><font-awesome-icon icon="edit" class="text-warning me-2" />
            </router-link>
            <font-awesome-icon icon="trash" class="text-danger cursor-pointer" @click="confirmDelete(order)" />
          </td>

          </tr>
        </tbody>
      </table>
    </div>

    <router-view></router-view>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';
  
  
  // Liste des commandes
  const orders = ref([
    { date: '25/07/2024', customer: 'John Doe', deliveryAddress: '123 Main St, New York, NY', trackNumber: 'TN001', status: 'Shipped' },
    { date: '26/07/2024', customer: 'Jane Smith', deliveryAddress: '456 Oak St, Los Angeles, CA', trackNumber: 'TN002', status: 'Delivered' },
    { date: '27/07/2024', customer: 'Alice Martin', deliveryAddress: '789 Pine St, Chicago, IL', trackNumber: 'TN003', status: 'Processing' },
  ]);
  
  const editOrder = (order) => {
    console.log("Editing order:", order);
  };
  
// Fonction pour supprimer une commande après confirmation
const confirmDelete = (order) => {
  const confirmed = confirm(`Are you sure you want to delete order ${order.trackNumber}?`);
  if (confirmed) {
    deleteOrder(order);
  }
};

  const deleteOrder = (order) => {
    orders.value = orders.value.filter(o => o.trackNumber !== order.trackNumber);
    console.log("Order deleted:", order);
  };
  
  const goToEditOrder = (order) => {
  router.push({ name: 'order-edit', params: { id: order.id } });
};

const viewOrder = (id) => {
  router.push({ name: 'order-view', params: { id } });
};
  // Fonction pour naviguer vers l'ajout d'une nouvelle commande
  const goToAddOrder = () => {
    router.push({ name: 'order-add' });
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
  }
  .table th,
  .table td {
    border: 1px solid #ddd; 
    padding: 8px; 
  }
  th {
    text-align: left;
  }
  .cursor-pointer {
    cursor: pointer;
}
  </style>
  