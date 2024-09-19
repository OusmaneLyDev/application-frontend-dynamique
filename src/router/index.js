import { createRouter, createWebHistory } from 'vue-router';
import CustomersView from '@/views/CustomersView.vue';
import OrdersView from '@/views/OrdersView.vue';
import ProductsView from '@/views/ProductsView.vue';
import AddOrder from '../components/orders/AddOrder.vue';
import ListOrders from '../components/orders/ListOrders.vue';




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
    path: '/ListOrders',
    name: 'ListOrders',
    component: ListOrders
  },

  {
    path: '/products',
    name: 'Products',
    component: ProductsView
  },

  {
    path: '/AddOrder',
    name: 'AddOrder',
    component: AddOrder
},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
