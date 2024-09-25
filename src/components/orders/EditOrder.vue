<template>
  <div class="container">
    <h2 class="mb-4 mt-4">Edit Orders</h2>
      <form class="row g-3">
        <div class="btn-right-action mt-4 mb-4 d-flex justify-content-end">
          <RouterLink
            type="button"
            class="btn btn-secondary mx-4"
            :to="{ name: 'ListOrders' }"
          >
            Orders list
          </RouterLink>
          
          <button type="button" class="btn btn-primary">Submit</button>
        </div>
        <div class="col-md-6">
          <label for="date" class="form-label">Date</label>
          <input type="date" class="form-control" id="date" />
        </div>
        <div class="col-md-6">
          <label for="address" class="form-label">Delivery Address</label>
          <input type="text" class="form-control" id="address" />
        </div>
        <div class="col-md-6">
          <label for="name" class="form-label">Customer Name</label>
          <input type="text" class="form-control" id="name" />
        </div>
        <div class="col-md-6">
          <label for="trackNumer" class="form-label">Track Number</label>
          <input type="text" class="form-control" id="trackNumer" />
        </div>
        <div class="col-md-6 offset-6">
          <label for="status" class="form-label">Order Status</label>
          <select class="form-select" aria-label="Default select example">
            <option selected></option>
            <option value="1">Processing</option>
            <option value="2">Shipped</option>
            <option value="3">Delivered</option>
          </select>
        </div>
      </form>
    <!-- </div> -->
    <RouterView />

    <div class="row mt-5 mx-1">
      <h2 class="mx-0">Order Details</h2>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in orderDetail" :key="index">
            <td>
              <select
                class="form-select"
                v-model="product"
                aria-label="Default select example"
              >
                <option selected>{{ detail.product }}</option>
                <option value="1">Processing</option>
                <option value="2">Shipped</option>
                <option value="3">Delivered</option>
              </select>
            </td>
            <td>
              <input type="number" class="form-control" v-model="quantity" />
            </td>
            <td>
              <input type="number" class="form-control" v-model="price" />
            </td>
            <td>
              <button @click="removeDetail(index)" class="btn btn-danger">
                Remove
              </button>
            </td>
          </tr>

          <tr>
            <td colspan="4">
              <button @click="addDetail" class="btn btn-success">
                Add New Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
const product = ref("");
const quantity = ref(1);
const price = ref(0);

const orderDetail = ref([{ product: "Product 1", quantity: 2, price: 25.0 }]);

function addDetail() {
  orderDetail.value.push({
    product: product.value,
    quantity: quantity.value,
    price: price.value,
  });
}

function removeDetail(index) {
  if (orderDetail.value.length > 1) {
    orderDetail.value.splice(index, 1);
  } else {
    alert("You cannot delete the last remaining detail.");
  }
}
</script>

<style scoped></style>
