<template>
  <div id="app" :class="backgroundClass">
    <!-- Container for the Three.js scene -->
    <div id="threejs-container"></div>

    <!-- Main Content Area: Vue Router will render the appropriate view here -->
    <router-view></router-view>
  </div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "App",
  computed: {
    // Computed property to return class based on the current route
    backgroundClass() {
      // Nếu trang là Login hoặc SignUp thì không có nền trắng, ngược lại sẽ có
      if (this.$route.name === 'Login' || this.$route.name === 'SignUp') {
        return 'login-signup-page'; // Nếu là Login hoặc SignUp thì không có nền trắng
      }
      return 'default-page'; // Nếu là các trang khác thì có nền trắng
    }
  },
  mounted() {
    // Chỉ khởi tạo Three.js khi route là đăng nhập hoặc đăng ký
    if (this.$route.name === 'Login' || this.$route.name === 'SignUp') {
      this.initThreeJS();
    }

    // Lắng nghe sự kiện thay đổi route để khởi tạo lại Three.js khi cần
    this.$router.afterEach((to) => {
      if (to.name === 'Login' || to.name === 'SignUp') {
        this.initThreeJS();
      } else {
        this.destroyThreeJS(); // Dọn dẹp Three.js khi chuyển sang các trang khác
      }
    });
  },
  methods: {
    initThreeJS() {
      // Khởi tạo Three.js
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("threejs-container").appendChild(renderer.domElement);

      // Hiệu ứng particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 5000;
      const positions = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
      }

      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        color: 0x88ccff,
        size: 0.05,
        transparent: true,
        opacity: 0.7,
      });
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
      };
      animate();

      // Resize handler
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    },

    destroyThreeJS() {
      // Dọn dẹp Three.js objects và event listeners
      const container = document.getElementById("threejs-container");
      if (container) {
        container.innerHTML = ''; // Xóa canvas
      }
      window.removeEventListener("resize", this.onWindowResize);
    },
  },
  beforeUnmount() {
    // Dọn dẹp trước khi component bị hủy
    this.destroyThreeJS();
  },
};
</script>

<style>
/* Các trang không phải Login/SignUp sẽ có nền trắng */
.default-page {
  background-color: white; /* Nền trắng cho các trang khác */
}

/* Nền cho các trang Login và SignUp */
.login-signup-page {
  background-color: transparent; /* Nền trong suốt cho Login và SignUp */
}

#app {
  width: 100%; /* Chiếm toàn bộ chiều rộng */
  Height:100vh;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;

}

#threejs-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Để Three.js ở dưới cùng */
}

.router-view {
  width: 100%; /* Chiếm toàn bộ chiều rộng */

}

</style>
