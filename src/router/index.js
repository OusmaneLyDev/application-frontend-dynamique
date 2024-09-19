import { createRouter, createWebHistory } from 'vue-router';
import CustomersView from '@/views/CustomersView.vue';
import OrdersView from '@/views/OrdersView.vue';
import ProductsView from '@/views/ProductsView.vue';

const routes = [
  {
    path: '/',
    name: 'Customers',
    component: CustomersView
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrdersView
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
