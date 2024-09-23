<!-- <template>
  <div class="container mt-4">
    <h1 class="mb-4 title text-center">List of Orders</h1>
    <div class="d-flex justify-content-end mb-3">
      <RouterLink
        type="button"
        class="btn btn-primary"
        :to="{ name: 'AddOrder' }"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
        Add New Order
      </RouterLink>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover text-center table-transparent">
        <thead class="table-dark">
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Delivery Address</th>
            <th>Track Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.date }}</td>
            <td>{{ order.customer }}</td>
            <td>{{ order.deliveryAddress }}</td>
            <td>{{ order.trackNumber }}</td>
            <td>{{ order.status }}</td>
            <td>
              <button class="btn btn-info me-2" @click="viewOrder(order.id)">
               <font-awesome-icon :icon="['fas', 'eye']" />
              </ button>
              <button class="btn btn-warning me-2" @click="editOrder(order.id)">
                <font-awesome-icon :icon="['fas', 'pen']" />
              </button>
              <button class="btn btn-danger" @click="confirmDelete(order.id)">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importer useRouter

const router = useRouter(); // Initialiser le routeur

const orders = ref([
  {
    id: 1,
    date: '2024-09-01',
    customer: 'Customer 1',
    deliveryAddress: '123 Example St',
    trackNumber: 'TR12345',
    status: 'Pending',
    details: [{ product: 'Product A', quantity: 2, price: 19.99 }]
  },
  {
    id: 2,
    date: '2024-09-02',
    customer: 'Customer 2',
    deliveryAddress: '456 Example Ave',
    trackNumber: 'TR67890',
    status: 'Shipped',
    details: [{ product: 'Product B', quantity: 1, price: 29.99 }]
  }
]);

const viewOrder = (id) => {
  router.push({ name: 'order-view', params: { id } }); // Redirige vers ViewOrder
};

const editOrder = (id) => {
  router.push({ name: 'order-edit', params: { id } }); // Redirige vers EditOrder
};

const confirmDelete = (id) => {
  const confirmed = confirm('Are you sure you want to delete this order?');
  if (confirmed) {
    orders.value = orders.value.filter(order => order.id !== id);
  }
};
</script>

<style scoped>
.table-transparent {
  background-color: rgba(255, 255, 255, 0.9);
}
</style> -->
