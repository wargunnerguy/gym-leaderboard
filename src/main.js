import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Import Pinia
import App from './App.vue';

// Import Bootstrap and global styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/styles.css'; // Import the global styles

// Create Pinia instance
const pinia = createPinia();

// Create Vue app and use Pinia
const app = createApp(App);
app.use(pinia); // Use Pinia as a plugin
app.mount('#app');
