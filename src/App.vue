<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary py-3 shadow-sm">
      <div class="container-fluid">
        <div class="d-flex w-100 justify-content-start">
          <router-link
            to="/"
            class="navbar-brand d-flex align-items-center"
            :class="{ 'active-link': activeRoute === '/' }"
            @click="setActiveRoute('/')"
          >
            <font-awesome-icon :icon="['fas', 'user']" class="me-2 icon-custom" />
            <span>Customers</span>
          </router-link>
          
          <router-link
            to="/products"
            class="navbar-brand d-flex align-items-center"
            :class="{ 'active-link': activeRoute === '/products' }"
            @click="setActiveRoute('/products')"
          >
            <font-awesome-icon :icon="['fas', 'box-open']" class="me-2 icon-custom" />
            <span>Products</span>
          </router-link>

          <router-link
            to="/orders"
            class="navbar-brand d-flex align-items-center"
            :class="{ 'active-link': activeRoute === '/orders' }"
            @click="setActiveRoute('/orders')"
          >
            <font-awesome-icon :icon="['fas', 'shopping-cart']" class="me-2 icon-custom" />
            <span>Orders</span>
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const activeRoute = ref("");

const setActiveRoute = (route) => {
  activeRoute.value = route;
};

// Obtenir la route actuelle à chaque fois que le composant est monté
const route = useRoute();

onMounted(() => {
  activeRoute.value = route.path;  // Met à jour le lien actif en fonction de la route actuelle
});
</script>

<style scoped>
/* Navbar Styling */
.navbar {
  background-color: #007bff;
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
  color: #d4d4d4;
}

.icon-custom {
  font-size: 18px;
}

.active-link {
  background-color: #0056b3;
  border-radius: 5px;
  padding: 5px 10px;
  color: #ffffff !important;
}

/* Align items to the left and remove extra spacing */
.navbar-nav {
  margin-left: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar-brand {
    font-size: 10px;
    margin-right: 10px;
    padding: 0 5px;
  }

  .icon-custom {
    font-size: 15px;
  }
}
</style>
