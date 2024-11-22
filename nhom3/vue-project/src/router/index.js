import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',  // Route cho trang đăng ký
      name: 'Trangquanlysach1',
      component: () => import('../views/Trangquanlysach.vue'),  // Lazy load component SignUpForm
    },
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
      path: '/Trangquanlisach',  // Route cho trang "About"
      name: 'Trangquanlysach',
      component: () => import('../views/Trangquanlysach.vue'),  // Lazy load component AboutView
    },
    {
      path: '/sachcuatoi',  // Route cho trang "About"
      name: 'sachcuatoi',
      component: () => import('../views/sachcuatoi.vue'),  // Lazy load component AboutView
    },
    {
      path: '/thongke',  // Route cho trang "About"
      name: 'thongke',
      component: () => import('../views/thongke.vue'),  // Lazy load component AboutView
    },
    {
      path: '/info',  // Route cho trang "About"
      name: 'info',
      component: () => import('../views/thongtincanhan.vue'),  // Lazy load component AboutView
    },
  ],
})

export default router;
