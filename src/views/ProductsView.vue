<template>
  <div class="container mt-4">
    <h1 class="mb-4 title text-center">List of Products</h1>
    <div class="d-flex justify-content-between mb-3">
      <div></div> <!-- Empty div for spacing -->
      <button class="btn btn-primary" @click="openModal('create')">
        <font-awesome-icon :icon="['fas', 'plus']" />
        Add New Product
      </button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Barcode</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.barcode }}</td>
            <td>{{ product.status }}</td>
            <td class="actions">
              <button class="btn btn-link text-info me-2" @click="openModal('view', product)">
                <font-awesome-icon icon="eye" class="text-info me-2" />
              </button>
              <button class="btn btn-link text-warning me-2" @click="openModal('edit', product)">
                <font-awesome-icon icon="edit" class="text-warning me-2" />
              </button>
              <font-awesome-icon icon="trash" class="text-danger cursor-pointer" @click="confirmDelete(order)" />
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
              <div class="row mb-3">
                <div class="col">
                  <label for="productName" class="form-label">Product Name</label>
                  <input type="text" id="productName" class="form-control" v-model="formData.name" :disabled="modalType === 'view'" required />
                </div>
                <div class="col">
                  <label for="productDescription" class="form-label">Description</label>
                  <input type="text" id="productDescription" class="form-control" v-model="formData.description" :disabled="modalType === 'view'" required />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col">
                  <label for="productPrice" class="form-label">Price</label>
                  <input type="number" id="productPrice" class="form-control" v-model="formData.price" :disabled="modalType === 'view'" required />
                </div>
                <div class="col">
                  <label for="productStock" class="form-label">Stock</label>
                  <input type="number" id="productStock" class="form-control" v-model="formData.stock" :disabled="modalType === 'view'" required />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col">
                  <label for="productCategory" class="form-label">Category</label>
                  <input type="text" id="productCategory" class="form-control" v-model="formData.category" :disabled="modalType === 'view'" required />
                </div>
                <div class="col">
                  <label for="productBarcode" class="form-label">Barcode</label>
                  <input type="text" id="productBarcode" class="form-control" v-model="formData.barcode" :disabled="modalType === 'view'" required />
                </div>
              </div>
              <div class="mb-3">
                <label for="productStatus" class="form-label">Status</label>
                <select id="productStatus" class="form-select" v-model="formData.status" :disabled="modalType === 'view'" required>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </form>

            <!-- Read-only view for "view" mode -->
            <div v-if="modalType === 'view'">
              <p><strong>Name:</strong> {{ formData.name }}</p>
              <p><strong>Description:</strong> {{ formData.description }}</p>
              <p><strong>Price:</strong> {{ formData.price }}</p>
              <p><strong>Stock:</strong> {{ formData.stock }}</p>
              <p><strong>Category:</strong> {{ formData.category }}</p>
              <p><strong>Barcode:</strong> {{ formData.barcode }}</p>
              <p><strong>Status:</strong> {{ formData.status }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button v-if="modalType !== 'view'" type="submit" class="btn btn-primary" @click="handleSubmit">
              {{ modalType === 'create' ? 'Add' : 'Confirm' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Sample data for products
const products = ref([
  { id: 1, name: 'Product 1', description: 'Description for product 1', price: 100, stock: 50, category: 'Electronics', barcode: '1234567890123', status: 'active' },
  { id: 2, name: 'Product 2', description: 'Description for product 2', price: 200, stock: 30, category: 'Clothing', barcode: '1234567890124', status: 'active' },
  { id: 3, name: 'Product 3', description: 'Description for product 3', price: 150, stock: 20, category: 'Home', barcode: '1234567890125', status: 'inactive' },
  { id: 4, name: 'Product 4', description: 'Description for product 4', price: 300, stock: 10, category: 'Beauty', barcode: '1234567890126', status: 'active' },
  { id: 5, name: 'Product 5', description: 'Description for product 5', price: 250, stock: 5, category: 'Sports', barcode: '1234567890127', status: 'inactive' },
]);

// Modal and form control
const showModal = ref(false);
const formData = ref({ name: '', description: '', price: '', stock: '', category: '', barcode: '', status: 'active' });
const modalTitle = ref('');
const modalType = ref(''); // To track whether it's create/edit/view
const selectedProduct = ref(null);

// Open modal for create/edit/view
const openModal = (type, product = null) => {
  modalType.value = type;
  showModal.value = true;

  if (type === 'create') {
    modalTitle.value = 'Create New Product';
    formData.value = { name: '', description: '', price: '', stock: '', category: '', barcode: '', status: 'active' };
  } else if (type === 'edit') {
    modalTitle.value = 'Edit Product';
    formData.value = { ...product };
    selectedProduct.value = product;
  } else if (type === 'view') {
    modalTitle.value = 'View Product';
    formData.value = { ...product };
  }
};

// Handle form submission for create/edit
const handleSubmit = () => {
  if (modalType.value === 'create') {
    // Add new product
    const newProductId = products.value.length + 1;
    products.value.push({ id: newProductId, ...formData.value });
  } else if (modalType.value === 'edit') {
    // Update existing product
    const index = products.value.findIndex(p => p.id === selectedProduct.value.id);
    if (index !== -1) {
      products.value[index] = { id: selectedProduct.value.id, ...formData.value };
    }
  }
  closeModal();
};

// Confirm deletion
const confirmDelete = (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    products.value = products.value.filter(product => product.id !== id);
  }
};

// Close modal
const closeModal = () => {
  showModal.value = false;
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
</style>
