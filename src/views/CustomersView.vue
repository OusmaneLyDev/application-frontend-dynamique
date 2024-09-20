<template>
  <div class="container mt-4">
    <h1 class="mb-4 title text-center">List of Customers</h1>
    <div class="d-flex justify-content-between mb-3">
      <div></div> <!-- Empty div for spacing -->
      <button class="btn btn-primary" @click="openModal">
        <font-awesome-icon :icon="['fas', 'plus']" />
        Add New Customer
      </button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover text-center table-transparent">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.id }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.address }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>
              <button class="btn btn-info me-2" @click="viewDetails(customer)">
                <font-awesome-icon :icon="['fas', 'eye']" class="me-2 icon-custom" />
              </button>
              <button class="btn btn-warning me-2" @click="openModal(customer)">
                <font-awesome-icon :icon="['fas', 'pen']" class="me-2 icon-custom" />
              </button>
              <button class="btn btn-danger" @click="confirmDelete(customer.id)">
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
            <h5 class="modal-title">{{ isEditMode ? 'Edit Customer' : 'Add Customer' }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="customerName" class="form-label">Name</label>
                <input type="text" id="customerName" class="form-control" v-model="formData.name" required />
              </div>
              <div class="mb-3">
                <label for="customerAddress" class="form-label">Address</label>
                <input type="text" id="customerAddress" class="form-control" v-model="formData.address" required />
              </div>
              <div class="mb-3">
                <label for="customerEmail" class="form-label">Email</label>
                <input type="email" id="customerEmail" class="form-control" v-model="formData.email" required />
              </div>
              <div class="mb-3">
                <label for="customerPhone" class="form-label">Phone</label>
                <input type="tel" id="customerPhone" class="form-control" v-model="formData.phone" required />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="submit" class="btn btn-primary" @click="handleSubmit">
              {{ isEditMode ? 'Confirm' : 'Add' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for viewing details -->
    <div v-if="showDetailsModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Customer Details</h5>
            <button type="button" class="btn-close" @click="closeDetailsModal"></button>
          </div>
          <div class="modal-body">
            <p><strong>Name:</strong> {{ selectedCustomer.name }}</p>
            <p><strong>Address:</strong> {{ selectedCustomer.address }}</p>
            <p><strong>Email:</strong> {{ selectedCustomer.email }}</p>
            <p><strong>Phone:</strong> {{ selectedCustomer.phone }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDetailsModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const customers = ref([
  { id: 1, name: 'Customer 1', address: '123 Example Street', email: 'customer1@example.com', phone: '0123456789' },
  { id: 2, name: 'Customer 2', address: '456 Example Avenue', email: 'customer2@example.com', phone: '0987654321' },
  { id: 3, name: 'Customer 3', address: '789 Main Street', email: 'customer3@example.com', phone: '1234567890' },
  { id: 4, name: 'Customer 4', address: '321 Oak Street', email: 'customer4@example.com', phone: '2345678901' },
  { id: 5, name: 'Customer 5', address: '654 Maple Avenue', email: 'customer5@example.com', phone: '3456789012' },
  { id: 6, name: 'Customer 6', address: '987 Birch Avenue', email: 'customer6@example.com', phone: '4567890123' },
  { id: 7, name: 'Customer 7', address: '543 Elm Street', email: 'customer7@example.com', phone: '5678901234' }
]);

const showModal = ref(false);
const showDetailsModal = ref(false);
const isEditMode = ref(false);
const formData = ref({ name: '', address: '', email: '', phone: '' });
const selectedCustomer = ref(null);

const openModal = (customer = null) => {
  isEditMode.value = !!customer;
  showModal.value = true;
  if (customer) {
    formData.value = { ...customer };
    selectedCustomer.value = customer;
  } else {
    formData.value = { name: '', address: '', email: '', phone: '' };
  }
};

const handleSubmit = () => {
  if (isEditMode.value) {
    const index = customers.value.findIndex(c => c.id === selectedCustomer.value.id);
    if (index !== -1) {
      customers.value[index] = { id: selectedCustomer.value.id, ...formData.value };
    }
  } else {
    const newCustomerId = customers.value.length + 1;
    customers.value.push({ id: newCustomerId, ...formData.value });
  }
  closeModal();
};

const closeModal = () => {
  showModal.value = false;
};

const viewDetails = (customer) => {
  selectedCustomer.value = customer;
  showDetailsModal.value = true;
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
};

const confirmDelete = (id) => {
  if (confirm('Are you sure you want to delete this customer?')) {
    deleteCustomer(id);
  }
};

const deleteCustomer = (id) => {
  customers.value = customers.value.filter(c => c.id !== id);
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

/* Modal Custom Styling */
.modal-dialog {
  max-width: 600px;
}

.modal-header .btn-close {
  background: transparent;
  border: none;
}

.modal-header .modal-title {
  font-family: 'Arial', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
}

.modal-body p {
  font-size: 1rem;
  line-height: 1.5;
}

.table th, .table td {
  font-family: 'Arial', sans-serif;
  font-size: 1rem;
}
</style>
