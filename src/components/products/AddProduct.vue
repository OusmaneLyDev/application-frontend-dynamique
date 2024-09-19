<template>
    <div>
      <h2>Add Product</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Product Name</label>
          <input type="text" id="name" v-model="product.name" />
        </div>
        <div>
          <label for="price">Price</label>
          <input type="number" id="price" v-model="product.price" />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          name: '',
          price: 0
        }
      };
    },
    methods: {
      submitForm() {
        // Logique à ajouter pour envoyer les données au serveur
        console.log('Product added:', this.product);
      }
    }
  };
  </script>
  