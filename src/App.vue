<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary py-3 shadow-sm">
      <div class="container-fluid">
        <div class="d-flex w-100 justify-content-start">
          <router-link to="/" class="navbar-brand d-flex align-items-center">
            <font-awesome-icon :icon="['fas', 'user']" class="me-2 icon-custom" />
            <span>Customers</span>
          </router-link>
          <router-link to="/orders" class="navbar-brand d-flex align-items-center">
            <font-awesome-icon :icon="['fas', 'shopping-cart']" class="me-2 icon-custom" />
            <span>Orders</span>
          </router-link>
          <router-link to="/products" class="navbar-brand d-flex align-items-center">
            <font-awesome-icon :icon="['fas', 'box-open']" class="me-2 icon-custom" />
            <span>Products</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Page content -->
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Navbar Styling */
.navbar {
  background-color: #007bff; /* Primary blue color */
}

.navbar-brand {
  color: #ffffff; 
  font-weight: 300;
  margin-right: 15px; 
  padding: 0 10px;
}

.navbar-brand:last-child {
  margin-right: 0; 
}

.navbar-brand:hover {
  color: #d4d4d4; /* Lighter color on hover */
}

.icon-custom {
  font-size: 18px;
}

/* Align items to the left and remove extra spacing */
.navbar-nav {
  margin-left: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar-brand {
    font-size: 10px;
    margin-right: 10px; /* Smaller margin on mobile */
    padding: 0 5px; /* Smaller padding on mobile */
  }

  .icon-custom {
    font-size: 15px;
  }
}
</style>
