<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <i class="fas fa-book"></i>
        <h1>Thư Viện Sách</h1>
      </div>
      <nav class="header-nav">
        <!-- Trang Chủ Button -->
        <button class="nav-item" @click="goHome">
          <i class="fas fa-home"></i> Trang Chủ
        </button>
        <!-- Hướng Dẫn Button -->
        <button class="nav-item" @click="toggleHelpPanel">
          <i class="fas fa-info-circle"></i> Hướng Dẫn
        </button>
        <!-- Sách Của Tôi Button -->
        <button class="nav-item" @click="viewMyBooks">
          <i class="fas fa-bookmark"></i> Sách của tôi
        </button>
        <div class="user-menu">
          <button class="nav-item user-name" @click="toggleMenu">
            <i class="fas fa-user"></i> {{ loggedInUsername || 'Tài Khoản' }}
          </button>
          <div v-if="menuVisible" class="dropdown-menu">
            <p><strong>Tên:</strong> {{ loggedInUsername }}</p>
            <p><strong>Email:</strong> {{ loggedInEmail }}</p>
            <button @click="logout" class="logout-button">Đăng Xuất</button>
          </div>
        </div>
      </nav>
    </div>
    <!-- Passing the visibility state to the PanelHelp component -->
    <PanelHelp v-if="isHelpPanelVisible" @close="closeHelpPanel" :isVisible="isHelpPanelVisible" />
  </header>
</template>

<script>
import PanelHelp from "./PanelHelp.vue";

export default {
  name: "Header",
  components: {
    PanelHelp,
  },
  data() {
    return {
      isHelpPanelVisible: false, // Điều khiển hiển thị PanelHelp
      loggedInUsername: localStorage.getItem("username"),
      loggedInEmail: localStorage.getItem("email"),
      menuVisible: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      this.loggedInUsername = null;
      this.loggedInEmail = null;

      alert("Bạn đã đăng xuất thành công.");
      this.$router.push({ name: "Login" });
    },
    toggleHelpPanel() {
      this.isHelpPanelVisible = !this.isHelpPanelVisible;
    },
    closeHelpPanel() {
      this.isHelpPanelVisible = false; // Đóng panel khi người dùng hoàn tất hướng dẫn
    },
    // Redirect to the home page (Trang Chủ)
    goHome() {
      this.$router.push({ path: "/Trangquanlisach" }) // Redirect to Trangquanlysach.vue
    },
    // Redirect to the My Books page (Sách của tôi)
    viewMyBooks() {
      this.$router.push({ path: "/sachcuatoi" }) // Redirect to sachcuatoi.vue
    }
  },
};
</script>

<style scoped>
.header {
  background-color:#30618C;  /* Gradient xanh dương */
  color: white;
  padding: 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo h1 {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
}

.header-nav {
  display: flex;
  gap: 15px;
}

.nav-item {
  background: #ff4081; /* Set a contrasting color for the button background */
  border: none;
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  padding: 8px 15px;
  border-radius: 25px;
}

/* Floating effect on hover */
.nav-item:hover {
  transform: translateY(-5px); /* Button floats up */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); /* Add a shadow when floating */
  background-color: #f50057; /* Darken the button on hover */
  color: #ffffff; /* Keep text white */
}

.user-menu {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  color: black;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 1000;
  width: 200px;
}

.dropdown-menu p {
  margin: 0 0 10px;
  font-size: 14px;
  color: #333;
}

.logout-button {
  background-color: #e53935;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #b71c1c;
}
</style>
