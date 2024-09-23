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
  <div class="btn-right-action mt-4 mb-4 d-flex justify-content-end">
          <RouterLink
            type="button"
            class="btn btn-secondary mx-4"
            :to="{ name: 'Orders' }"
          >
            Return to Order
          </RouterLink>
          
          <button type="button" class="btn btn-primary">Submit</button>
        </div>

        
        <div class="col-md-6">
          <label for="date" class="form-label">Date</label>
          <input type="date" class="form-control" id="date" />
        </div>
  <div>
    <h2>Order List</h2>
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
