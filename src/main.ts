import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import FontAwesomeIcon from './plugins/fontawesome.js';

const app = createApp(App);

// app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');




