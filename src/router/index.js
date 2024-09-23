import { createRouter, createWebHistory } from 'vue-router';
import CustomersView from '@/views/CustomersView.vue';
import ProductsView from '@/views/ProductsView.vue';
import AddOrder from '../components/orders/AddOrder.vue';
import ViewOrder from '../components/orders/ViewOrder.vue';
import EditOrder from '../components/orders/EditOrder.vue';
import ListOrder from '../components/orders/ListOrder.vue';




const routes = [
  {
    path: '/',
    name: 'Customers',
    component: CustomersView
  },
  { path: '/orders', name: 'ListOrders', component: ListOrder },
  {
    path: '/order-view/:id',
    name: 'order-view',
    component: ViewOrder,
  },
  
  {
    path: '/order-edit/:id',
    name: 'order-edit',
    component: EditOrder,
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
