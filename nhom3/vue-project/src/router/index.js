import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/SignUp',  // Route cho trang đăng ký
      name: 'SignUp',
      component: () => import('../views/SignUpForm.vue'),  // Lazy load component SignUpForm
    },

    {
      path: '/login',  // Route cho trang đăng nhập
      name: 'Login',
      component: () => import('../views/LoginForms.vue'),  // Lazy load component LoginForm
    },
    {
      path: '/about',  // Route cho trang "About"
      name: 'about',
      component: () => import('../views/AboutView.vue'),  // Lazy load component AboutView
    },
    {
      path: '/Trangchu',  // Route cho trang "About"
      name: 'Trangchu',
      component: () => import('../views/Home.vue'),  // Lazy load component AboutView
    },
    {
      path: '/TrangchuSach',  // Route cho trang "About"
      name: 'TrangchuSach',
      component: () => import('../views/TrangchuSach.vue'),  // Lazy load component AboutView
    },
    {
      path: '/Trangquanlisach',  // Route cho trang "About"
      name: 'Trangquanlysach',
      component: () => import('../views/Trangquanlysach.vue'),  // Lazy load component AboutView
    },
    {
      path: '/Trangthemsach',  // Route cho trang "About"
      name: 'Trangsach',
      component: () => import('../views/AddBookView.vue'),  // Lazy load component AboutView
    },
  ],
})

export default router;
