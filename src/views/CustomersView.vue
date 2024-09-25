<template>
  <div class="container mt-4">
    <h2 class="mb-4 mt-4">List of Customers</h2>
    <div class="d-flex justify-content-between mb-3">
      <div></div> <!-- Empty div for spacing -->
      <button class="btn btn-primary" @click="openModal('create')">
        Add New Customer
      </button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
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
            <td class="actions">
              <button class="btn btn-link text-info me-2" @click="openModal('view', customer)">
                <font-awesome-icon :icon="['fas', 'eye']" />
              </button>
              <button class="btn btn-link text-warning me-2" @click="openModal('edit', customer)">
                <font-awesome-icon icon="edit" class="text-warning me-2" />
              </button>
              <font-awesome-icon icon="trash" class="text-danger cursor-pointer" @click="confirmDelete(customer.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for create/edit/view -->
    <div v-if="showModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form v-if="modalType !== 'view'" @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="customerName" class="form-label">Customer Name</label>
                <input type="text" id="customerName" class="form-control" v-model="formData.name" :disabled="modalType === 'view'" required />
              </div>
              <div class="mb-3">
                <label for="customerAddress" class="form-label">Address</label>
                <textarea id="customerAddress" class="form-control" v-model="formData.address" :disabled="modalType === 'view'" required></textarea>
              </div>
              <div class="mb-3">
                <label for="customerEmail" class="form-label">Email</label>
                <input type="email" id="customerEmail" class="form-control" v-model="formData.email" :disabled="modalType === 'view'" required />
              </div>
              <div class="mb-3">
                <label for="customerPhone" class="form-label">Phone</label>
                <input type="tel" id="customerPhone" class="form-control" v-model="formData.phone" :disabled="modalType === 'view'" required />
              </div>
            </form>

            <!-- Read-only view for "view" mode -->
            <div v-if="modalType === 'view'">
              <div class="mb-3">
                <label class="form-label"><strong>Name</strong></label>
                <input type="text" id="customerName" class="form-control" v-model="formData.name" :disabled="modalType === 'view'" required />

              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Address</strong></label>
                <textarea id="customerAddress" class="form-control" v-model="formData.address" :disabled="modalType === 'view'" required></textarea>

              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Email</strong></label>
                <input type="email" id="customerEmail" class="form-control" v-model="formData.email" :disabled="modalType === 'view'" required />
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Phone</strong></label>
                <input type="tel" id="customerPhone" class="form-control" v-model="formData.phone" :disabled="modalType === 'view'" required />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button v-if="modalType !== 'view'" type="submit" class="btn btn-primary" @click="handleSubmit">
              {{ modalType === 'create' ? 'Confirm' : 'confirm' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue';

// Sample data for customers
const customers = ref([
  { id: 1, name: 'Customer 1', address: '123 Example Street', email: 'customer1@example.com', phone: '0123456789' },
  { id: 2, name: 'Customer 2', address: '456 Example Avenue', email: 'customer2@example.com', phone: '0987654321' },
  { id: 3, name: 'Customer 3', address: '789 Main Street', email: 'customer3@example.com', phone: '1234567890' },
  { id: 4, name: 'Customer 4', address: '321 Oak Street', email: 'customer4@example.com', phone: '2345678901' },
  { id: 5, name: 'Customer 5', address: '654 Maple Avenue', email: 'customer5@example.com', phone: '3456789012' },
  { id: 6, name: 'Customer 6', address: '987 Birch Avenue', email: 'customer6@example.com', phone: '4567890123' },
  { id: 7, name: 'Customer 7', address: '543 Elm Street', email: 'customer7@example.com', phone: '5678901234' }
]);

// Modal and form control
const showModal = ref(false);
const formData = ref({ name: '', address: '', email: '', phone: '' });
const modalTitle = ref('');
const modalType = ref(''); // To track whether it's create/edit/view
const selectedCustomer = ref(null);

// Open modal for create/edit/view
const openModal = (type, customer = null) => {
  modalType.value = type;
  showModal.value = true;

  if (type === 'create') {
    modalTitle.value = 'Create New Customer';
    formData.value = { name: '', address: '', email: '', phone: '' };
  } else if (type === 'edit') {
    modalTitle.value = 'Edit Customer';
    formData.value = { ...customer };
    selectedCustomer.value = customer;
  } else if (type === 'view') {
    modalTitle.value = 'View Customer';
    formData.value = { ...customer };
  }
};

// Handle form submission for create/edit
const handleSubmit = () => {
  if (modalType.value === 'create') {
    // Add new customer
    const newCustomerId = customers.value.length + 1;
    customers.value.push({ id: newCustomerId, ...formData.value });
  } else if (modalType.value === 'edit') {
    // Update existing customer
    const index = customers.value.findIndex(c => c.id === selectedCustomer.value.id);
    if (index !== -1) {
      customers.value[index] = { id: selectedCustomer.value.id, ...formData.value };
    }
  }
  closeModal();
};

// Close modal
const closeModal = () => {
  showModal.value = false;
};

// Confirm before deleting customer
const confirmDelete = (id) => {
  if (confirm('Are you sure you want to delete this customer?')) {
    deleteCustomer(id);
  }
};

// Delete customer
const deleteCustomer = (id) => {
  customers.value = customers.value.filter(c => c.id !== id);
};
</script>


<style scoped>
.table-transparent {
  background-color: rgba(255, 255, 255, 0.8);
}
.table-transparent th, .table-transparent td {
  border: none;
}
.title {
  color: #007bff;
}
.cursor-pointer {
  cursor: pointer;
}
.modal-body {
  padding: 20px;
}

.form-control-plaintext {
  border: none;
  padding-left: 0;
}

textarea[disabled] {
  resize: none;
}

</style>
