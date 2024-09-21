<template>
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
              <button class="btn btn-info me-2" @click="viewOrder(order)">
                <font-awesome-icon :icon="['fas', 'eye']" />
              </button>
              <button class="btn btn-warning me-2" @click="openModal(order)">
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

    <!-- Modal for adding/editing order -->
    <div v-if="showModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditMode ? 'Edit' : 'Add' }} Order</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="orderDate" class="form-label">Date</label>
                <input type="date" id="orderDate" class="form-control" v-model="formData.date" required />
              </div>
              <div class="mb-3">
                <label for="orderCustomer" class="form-label">Customer</label>
                <input type="text" id="orderCustomer" class="form-control" v-model="formData.customer" required />
              </div>
              <div class="mb-3">
                <label for="orderAddress" class="form-label">Delivery Address</label>
                <input type="text" id="orderAddress" class="form-control" v-model="formData.deliveryAddress" required />
              </div>
              <div class="mb-3">
                <label for="orderTrackNumber" class="form-label">Track Number</label>
                <input type="text" id="orderTrackNumber" class="form-control" v-model="formData.trackNumber" required />
              </div>
              <div class="mb-3">
                <label for="orderStatus" class="form-label">Status</label>
                <select id="orderStatus" class="form-select" v-model="formData.status" required>
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <!-- Order Details Section -->
              <div class="mb-3">
                <label class="form-label">Order Details</label>
                <div
                  v-for="(detail, index) in formData.details"
                  :key="index"
                  class="detail-container d-flex mb-2 align-items-center"
                >
                  <input
                    type="text"
                    class="form-control me-2 flex-fill"
                    v-model="detail.product"
                    placeholder="Product"
                    required
                  />
                  <input
                    type="number"
                    class="form-control me-2 flex-fill"
                    v-model.number="detail.quantity"
                    placeholder="Quantity"
                    min="1"
                    required
                  />
                  <input
                    type="number"
                    class="form-control me-2 flex-fill"
                    v-model.number="detail.price"
                    placeholder="Price"
                    min="0"
                    step="0.01"
                    required
                  />
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="removeDetail(index)"
                  >
                    <font-awesome-icon :icon="['fas', 'trash']" />
                  </button>
                </div>
                <button type="button" class="btn btn-success" @click="addDetail">Add Detail</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="submit" class="btn btn-success" @click="handleSubmit">
              {{ isEditMode ? 'Update' : 'Add' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Alert Modal for viewing order details -->
    <div v-if="showAlert" class="modal d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Order Details</h5>
            <button type="button" class="btn-close" @click="closeAlert"></button>
          </div>
          <div class="modal-body">
            <p><strong>Date:</strong> {{ selectedOrder?.date }}</p>
            <p><strong>Customer:</strong> {{ selectedOrder?.customer }}</p>
            <p><strong>Delivery Address:</strong> {{ selectedOrder?.deliveryAddress }}</p>
            <p><strong>Track Number:</strong> {{ selectedOrder?.trackNumber }}</p>
            <p><strong>Status:</strong> {{ selectedOrder?.status }}</p>
            <h6>Order Details:</h6>
            <ul>
              <li v-for="(detail, index) in selectedOrder?.details" :key="index">
                {{ detail.product }} - Quantity: {{ detail.quantity }}, Price: {{ detail.price }}
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeAlert">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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

const showModal = ref(false);
const showAlert = ref(false);
const isEditMode = ref(false);
const formData = ref({
  date: '',
  customer: '',
  deliveryAddress: '',
  trackNumber: '',
  status: '',
  details: []
});
const selectedOrder = ref(null);

const openModal = (order = null) => {
  isEditMode.value = !!order;
  showModal.value = true;
  if (order) {
    formData.value = { ...order };
  } else {
    formData.value = {
      date: '',
      customer: '',
      deliveryAddress: '',
      trackNumber: '',
      status: '',
      details: []
    };
  }
};

const handleSubmit = () => {
  if (isEditMode.value) {
    const index = orders.value.findIndex(o => o.id === formData.value.id);
    if (index !== -1) orders.value[index] = { ...formData.value };
  } else {
    formData.value.id = Date.now(); // For simplicity, using current timestamp as ID
    orders.value.push({ ...formData.value });
  }
  closeModal();
};

const closeModal = () => {
  showModal.value = false;
};

const viewOrder = (order) => {
  selectedOrder.value = order;
  showAlert.value = true;
};

const closeAlert = () => {
  showAlert.value = false;
};

const confirmDelete = (id) => {
  const confirmed = confirm('Are you sure you want to delete this order?');
  if (confirmed) {
    orders.value = orders.value.filter(order => order.id !== id);
  }
};

const addDetail = () => {
  formData.value.details.push({ product: '', quantity: 1, price: 0 });
};

const removeDetail = (index) => {
  formData.value.details.splice(index, 1);
};
</script>

<style scoped>
.table-transparent {
  background-color: rgba(255, 255, 255, 0.9);
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
