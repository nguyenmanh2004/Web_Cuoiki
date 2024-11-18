

// Import các module cần thiết từ Vue và Vuetify
import { createApp } from 'vue'           // Cung cấp hàm createApp để khởi tạo ứng dụng Vue
import App from './App.vue'               // Import file gốc App.vue của ứng dụng
import router from './router'             // Import cấu hình Vue Router để điều hướng ứng dụng
import { createVuetify } from 'vuetify'   // Import hàm tạo Vuetify, một thư viện UI cho Vue
import 'vuetify/styles'                  // Import các styles mặc định của Vuetify
import '@mdi/font/css/materialdesignicons.css'  // Import các icon từ thư viện Material Design Icons

// Tạo một thể hiện Vuetify, đây là nơi chứa các cấu hình và tiện ích của Vuetify
const vuetify = createVuetify()

// Tạo một thể hiện Vue cho ứng dụng
const app = createApp(App)  // Khởi tạo ứng dụng Vue với component gốc App.vue

// Sử dụng các plugin trong ứng dụng Vue
app.use(router)    // Kích hoạt Vue Router để quản lý các route trong ứng dụng
app.use(vuetify)   // Kích hoạt Vuetify, thư viện UI cho ứng dụng

// Gắn ứng dụng Vue vào phần tử DOM có id là "app"
app.mount('#app')  // Kế
