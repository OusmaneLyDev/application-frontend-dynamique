<template>
    <div>
      <h2>Product List</h2>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - ${{ product.price }}
          <button @click="editProduct(product)">Edit</button>
          <button @click="deleteProduct(product.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          { id: 1, name: 'Product 1', price: 100 },
          { id: 2, name: 'Product 2', price: 150 }
        ]
      };
    },
    methods: {
      editProduct(product) {
        console.log('Editing product:', product);
      },
      deleteProduct(id) {
        console.log('Product deleted with ID:', id);
        this.products = this.products.filter(product => product.id !== id);
      }
    }
  };
  </script>
  

 