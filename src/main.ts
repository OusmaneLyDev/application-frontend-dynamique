import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import FontAwesomeIcon from './plugins/fontawesome';

const app = createApp(App);

// Register FontAwesome globally
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');




