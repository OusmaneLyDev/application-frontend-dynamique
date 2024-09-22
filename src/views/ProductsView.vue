<template>
  <div class="container mt-4">
    <h1 class="mb-4 title text-center">List of Products</h1>
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary" @click="openModal">
        <font-awesome-icon :icon="['fas', 'plus']" />
        Add New Product
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
              <button class="btn btn-danger" @click="confirmDelete(product.id)">
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
              <div class="row">
                <div class="col-md-12 mb-3">
                  <label for="productName" class="form-label">Product Name</label>
                  <input type="text" id="productName" class="form-control w-100" v-model="formData.name" required />
                </div>
                <div class="col-md-12 mb-3">
                  <label for="productDescription" class="form-label">Description</label>
                  <textarea id="productDescription" class="form-control w-100" v-model="formData.description" required></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="productPrice" class="form-label">Price</label>
                  <input type="number" id="productPrice" class="form-control w-100" v-model.number="formData.price" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="productStock" class="form-label">Stock</label>
                  <input type="number" id="productStock" class="form-control w-100" v-model.number="formData.stock" required />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="productCategory" class="form-label">Category</label>
                  <input type="text" id="productCategory" class="form-control w-100" v-model="formData.category" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="productBarcode" class="form-label">Barcode</label>
                  <input type="text" id="productBarcode" class="form-control w-100" v-model="formData.barcode" required />
                </div>
              </div>
              <div class="mb-3">
                <label for="productStatus" class="form-label">Status</label>
                <select id="productStatus" class="form-control w-100" v-model="formData.status" required>
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
            <button type="submit" class="btn btn-primary" @click="handleSubmit">
              {{ isEditMode ? 'Confirm' : 'Add' }}
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

    <!-- Modal for delete confirmation -->
    <div v-if="showDeleteModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.8);">
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content rounded-4 shadow-lg">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Delete Confirmation</h5>
            <button type="button" class="btn-close" @click="closeDeleteModal"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this product?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">Delete</button>
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
  { id: 3, name: 'Product 3', description: 'Description 3', price: 9.99, stock: 0, category: 'Category 3', barcode: '1122334455', status: 'Discontinued' },
]);

const showModal = ref(false);
const showDeleteModal = ref(false);
const showDetailsModal = ref(false);
const isEditMode = ref(false);
const selectedProduct = ref(null);
const productToDelete = ref(null);
const formData = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  barcode: '',
  status: '',
});

const openModal = (product = null) => {
  showModal.value = true;
  if (product) {
    isEditMode.value = true;
    formData.value = { ...product };
  } else {
    isEditMode.value = false;
    resetForm();
  }
};

const closeModal = () => {
  showModal.value = false;
};

const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  productToDelete.value = null;
};

const resetForm = () => {
  formData.value = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    barcode: '',
    status: '',
  };
};

const handleSubmit = () => {
  if (isEditMode.value) {
    // Update product
    const index = products.value.findIndex(p => p.id === formData.value.id);
    if (index !== -1) {
      products.value.splice(index, 1, { ...formData.value });
    }
  } else {
    // Add new product
    formData.value.id = products.value.length + 1;
    products.value.push({ ...formData.value });
  }
  closeModal();
};

const confirmDelete = (id) => {
  if (confirm('Are you sure you want to delete this customer?')) {
    deleteCustomer(id);
  }
};

const deleteProduct = () => {
  products.value = products.value.filter(p => p.id !== productToDelete.value);
  closeDeleteModal();
};

const viewProduct = (product) => {
  selectedProduct.value = product;
  showDetailsModal.value = true;
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedProduct.value = null;
};
</script>

<style>
.title {
  font-family: 'Arial', sans-serif;
  color: #333;
  font-size: 2rem;
  font-weight: 600;
}
</style>
