<template>
    <div class="container mt-4">
      <h1 class="mb-4 title text-center">Order Management</h1>
      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-primary" @click="openModal">
          <font-awesome-icon :icon="['fas', 'plus']" />
          Add Order
        </button>
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
                  <font-awesome-icon :icon="['fas', 'eye']" class="me-2 icon-custom" />
                </button>
                <button class="btn btn-warning me-2" @click="openModal(order)">
                  <font-awesome-icon :icon="['fas', 'pen']" class="me-2 icon-custom" />
                </button>
                <button class="btn btn-danger" @click="deleteOrder(order.id)">
                  <font-awesome-icon :icon="['fas', 'trash']" class="me-2 icon-custom" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal for adding/editing -->
      <div v-if="showModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5);">
        <div class="modal-dialog">
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
  
      <!-- Alert Modal -->
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
    { id: 1, date: '2024-09-01', customer: 'Customer 1', deliveryAddress: '123 Example St', trackNumber: 'TR12345', status: 'Pending' },
    { id: 2, date: '2024-09-02', customer: 'Customer 2', deliveryAddress: '456 Example Ave', trackNumber: 'TR67890', status: 'Shipped' },
    { id: 3, date: '2024-09-03', customer: 'Customer 3', deliveryAddress: '789 Example Rd', trackNumber: 'TR54321', status: 'Delivered' },
    { id: 4, date: '2024-09-04', customer: 'Customer 4', deliveryAddress: '101 Example Blvd', trackNumber: 'TR98765', status: 'Cancelled' },
    { id: 5, date: '2024-09-05', customer: 'Customer 5', deliveryAddress: '202 Example Lane', trackNumber: 'TR11223', status: 'Pending' }
  ]);
  
  const showModal = ref(false);
  const showAlert = ref(false);
  const isEditMode = ref(false);
  const formData = ref({ date: '', customer: '', deliveryAddress: '', trackNumber: '', status: '' });
  const selectedOrder = ref(null);
  
  const openModal = (order = null) => {
    isEditMode.value = !!order;
    showModal.value = true;
    if (order) {
      formData.value = { ...order };
      selectedOrder.value = order;
    } else {
      formData.value = { date: '', customer: '', deliveryAddress: '', trackNumber: '', status: '' };
    }
  };
  
  const handleSubmit = () => {
    if (isEditMode.value) {
      const index = orders.value.findIndex(o => o.id === selectedOrder.value.id);
      if (index !== -1) {
        orders.value[index] = { id: selectedOrder.value.id, ...formData.value };
      }
    } else {
      const newOrderId = orders.value.length + 1;
      orders.value.push({ id: newOrderId, ...formData.value });
    }
    closeModal();
  };
  
  const closeModal = () => {
    showModal.value = false;
  };
  
  const deleteOrder = (id) => {
    orders.value = orders.value.filter(o => o.id !== id);
  };
  
  const viewOrder = (order) => {
    selectedOrder.value = order;
    showAlert.value = true;
  };
  
  const closeAlert = () => {
    showAlert.value = false;
  };
  </script>
  
  <style scoped>
  /* Title Styling */
  .title {
    font-family: 'Arial', sans-serif;
    color: #333;
    font-size: 2rem;
    font-weight: 600;
  }
  
  /* Table Styling */
  .table-transparent {
    background-color: transparent;
    border-collapse: collapse;
  }
  
  /* Button Styling */
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    font-size: 1rem;
    font-weight: 500;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
  }
  
  .btn-info {
    background-color: #17a2b8;
    border-color: #17a2b8;
  }
  
  .btn-info:hover {
    background-color: #138496;
    border-color: #117a8b;
  }
  
  .btn-warning {
    background-color: #ffc107;
    border-color: #ffc107;
  }
  
  .btn-warning:hover {
    background-color: #e0a800;
    border-color: #d39e00;
  }
  
  .btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
  }
  
  .btn-danger:hover {
    background-color: #c82333;
    border-color: #bd2130;
  }
  
  /* Modal Styling */
  .modal-dialog {
    max-width: 600px;
    margin: 1.75rem auto;
  }
  
  .modal-content {
    border-radius: 0.5rem;
  }
  
  /* Icon Styling */
  .icon-custom {
    font-size: 1.2rem;
  }
  </style>
  