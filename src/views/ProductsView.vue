<template>
  <div class="container mt-4">
    <h1 class="mb-4 title">Product Management</h1>
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary" @click="openModal">
        <font-awesome-icon :icon="['fas', 'plus']" />
        Add Product
      </button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover text-center">
        <thead class="table-dark">
          <tr>
            <th>Product Name</th>
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
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price.toFixed(2) }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.barcode }}</td>
            <td>{{ product.status }}</td>
            <td>
              <button class="btn btn-info me-2" @click="viewProduct(product)">
                <font-awesome-icon :icon="['fas', 'eye']" />
              </button>
              <button class="btn btn-warning me-2" @click="openModal(product)">
                <font-awesome-icon :icon="['fas', 'pen']" />
              </button>
              <button class="btn btn-danger" @click="deleteProduct(product.id)">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for adding/editing -->
    <div v-if="showModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.8);">
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content rounded-4 shadow-lg">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">{{ isEditMode ? 'Edit' : 'Add' }} Product</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="productName" class="form-label">Product Name</label>
                <input type="text" id="productName" class="form-control" v-model="formData.name" required />
              </div>
              <div class="mb-3">
                <label for="productDescription" class="form-label">Description</label>
                <textarea id="productDescription" class="form-control" v-model="formData.description" required></textarea>
              </div>
              <div class="mb-3">
                <label for="productPrice" class="form-label">Price</label>
                <input type="number" id="productPrice" class="form-control" v-model.number="formData.price" required />
              </div>
              <div class="mb-3">
                <label for="productStock" class="form-label">Stock</label>
                <input type="number" id="productStock" class="form-control" v-model.number="formData.stock" required />
              </div>
              <div class="mb-3">
                <label for="productCategory" class="form-label">Category</label>
                <input type="text" id="productCategory" class="form-control" v-model="formData.category" required />
              </div>
              <div class="mb-3">
                <label for="productBarcode" class="form-label">Barcode</label>
                <input type="text" id="productBarcode" class="form-control" v-model="formData.barcode" required />
              </div>
              <div class="mb-3">
                <label for="productStatus" class="form-label">Status</label>
                <select id="productStatus" class="form-control" v-model="formData.status" required>
                  <option value="" disabled>Select Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Discontinued">Discontinued</option>
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

    <!-- Modal for viewing details -->
    <div v-if="showDetailsModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.8);">
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content rounded-4 shadow-lg">
          <div class="modal-header bg-info text-white">
            <h5 class="modal-title">Product Details</h5>
            <button type="button" class="btn-close" @click="closeDetailsModal"></button>
          </div>
          <div class="modal-body">
            <p><strong>Product Name:</strong> {{ selectedProduct.name }}</p>
            <p><strong>Description:</strong> {{ selectedProduct.description }}</p>
            <p><strong>Price:</strong> ${{ selectedProduct.price.toFixed(2) }}</p>
            <p><strong>Stock:</strong> {{ selectedProduct.stock }}</p>
            <p><strong>Category:</strong> {{ selectedProduct.category }}</p>
            <p><strong>Barcode:</strong> {{ selectedProduct.barcode }}</p>
            <p><strong>Status:</strong> {{ selectedProduct.status }}</p>
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const products = ref([
  { id: 1, name: 'Product 1', description: 'Description 1', price: 19.99, stock: 10, category: 'Category 1', barcode: '1234567890', status: 'In Stock' },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 29.99, stock: 5, category: 'Category 2', barcode: '0987654321', status: 'Out of Stock' },
  { id: 3, name: 'Product 3', description: 'Description 3', price: 15.49, stock: 7, category: 'Category 3', barcode: '1122334455', status: 'In Stock' },
  { id: 4, name: 'Product 4', description: 'Description 4', price: 22.99, stock: 0, category: 'Category 4', barcode: '2233445566', status: 'Out of Stock' },
  { id: 5, name: 'Product 5', description: 'Description 5', price: 40.00, stock: 12, category: 'Category 5', barcode: '3344556677', status: 'In Stock' },
  { id: 6, name: 'Product 6', description: 'Description 6', price: 11.99, stock: 9, category: 'Category 6', barcode: '4455667788', status: 'Discontinued' }
]);

const showModal = ref(false);
const showDetailsModal = ref(false);
const isEditMode = ref(false);
const formData = ref({ name: '', description: '', price: 0, stock: 0, category: '', barcode: '', status: '' });
const selectedProduct = ref(null);

const openModal = (product = null) => {
  isEditMode.value = !!product;
  showModal.value = true;
  if (product) {
    formData.value = { ...product };
    selectedProduct.value = product;
  } else {
    formData.value = { name: '', description: '', price: 0, stock: 0, category: '', barcode: '', status: '' };
  }
};

const handleSubmit = () => {
  if (isEditMode.value) {
    const index = products.value.findIndex(p => p.id === formData.value.id);
    if (index !== -1) products.value[index] = { ...formData.value };
  } else {
    formData.value.id = products.value.length + 1;
    products.value.push({ ...formData.value });
  }
  showModal.value = false;
};

const deleteProduct = id => {
  products.value = products.value.filter(product => product.id !== id);
};

const closeModal = () => {
  showModal.value = false;
};

const viewProduct = product => {
  selectedProduct.value = product;
  showDetailsModal.value = true;
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
};
</script>

<style scoped>
.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
}
.modal-md {
  max-width: 600px;
}
.modal-content {
  border-radius: 1rem;
  padding: 1rem;
}
.modal-header {
  border-bottom: none;
}
.modal-footer {
  border-top: none;
  justify-content: space-between;
}
</style>
