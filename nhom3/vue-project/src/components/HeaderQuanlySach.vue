<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo -->
      <div class="logo">
        <i class="fas fa-book"></i>
        <h1>BookHavent</h1>
      </div>

      <!-- Navigation -->
      <nav class="header-nav">
        <button class="nav-item" @click="goHome">
          <i class="fas fa-home"></i> Trang Chủ
        </button>

        <!-- Nút "Hướng Dẫn" chỉ hiển thị cho role 'reader' -->
        <button v-if="userRole === 'reader'" class="nav-item" @click="toggleHelpPanel">
          <i class="fas fa-info-circle"></i> Hướng Dẫn
        </button>

        <!-- Nút "Sách của tôi" chỉ hiển thị cho role 'reader' -->
        <button v-if="userRole === 'reader'" class="nav-item" @click="viewMyBooks">
          <i class="fas fa-bookmark"></i> Sách của tôi
        </button>

        <!-- Nút "Thống Kê" chỉ hiển thị cho role 'admin' và 'librarian' -->
        <button v-if="userRole === 'admin' || userRole === 'librarian'" class="nav-item" @click="thongke">
          <i class="fas fa-chart-line"></i> Thống Kê
        </button>

        <!-- Hiển thị ảnh đại diện người dùng -->
        <img v-if="profileImage" :src="profileImage" alt="Profile Image" class="profile-image"/>

        <!-- Dropdown menu -->
        <div class="dropdown-container">
          <button @click="toggleDropdown">
            {{ loggedInUsername ? loggedInUsername : 'Người dùng' }}
          </button>
          <div v-show="dropdownVisible" class="custom-dropdown">
            <button v-if="loggedInUsername" @click="goProfile">Thông Tin Cá Nhân</button>
            <button v-if="loggedInUsername" @click="logout">Đăng Xuất</button>
            <button v-else @click="goLogin">Đăng Nhập</button>
          </div>
        </div>
      </nav>
    </div>

    <!-- Hướng dẫn Panel -->
    <PanelHelp v-if="isHelpPanelVisible" @close="closeHelpPanel" :isVisible="isHelpPanelVisible" />
  </header>
</template>
<script>
import PanelHelp from "./PanelHelp.vue";

export default {
  components: {
    PanelHelp,
  },
  data() {
    return {
      isHelpPanelVisible: false,  // Ẩn/hiển thị panel hướng dẫn
      dropdownVisible: false,     // Ẩn/hiển thị dropdown
      loggedInUsername: localStorage.getItem("username"),  // Lấy tên người dùng
      loggedInEmail: localStorage.getItem("email"),      // Lấy email người dùng
      profileImage: localStorage.getItem("profileImage") || 'https://file.lhu.edu.vn/me/avatar/1220013830.jpg', // Lấy hình đại diện người dùng
      userRole: localStorage.getItem("role"), // Lấy vai trò người dùng từ localStorage
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;  // Chuyển trạng thái hiển thị dropdown
    },
    toggleHelpPanel() {
      this.isHelpPanelVisible = !this.isHelpPanelVisible;  // Mở/đóng panel hướng dẫn
    },
    closeHelpPanel() {
      this.isHelpPanelVisible = false;  // Đóng panel khi người dùng hoàn tất hướng dẫn
    },
    logout() {
      // Thực hiện đăng xuất
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("profileImage");
      localStorage.removeItem("role"); // Xóa vai trò khỏi localStorage
     
      alert("Bạn đã đăng xuất thành công!");
      window.location.href = '/';
     
    },
    goProfile() {
      // Chuyển hướng đến trang thông tin cá nhân
      this.$router.push({ path: "/info" });
    },
    goHome() {
      // Chuyển hướng đến trang chủ
      this.$router.push({ path: "/Trangquanlisach" });
    },
    viewMyBooks() {
      // Chuyển hướng đến trang sách của tôi
      this.$router.push({ path: "/sachcuatoi" });
    },
    thongke() {
      // Chuyển hướng đến trang thống kê (dành cho admin và librarian)
      this.$router.push({ path: "/thongke" });
    },
    goLogin() {
      // Chuyển hướng đến trang đăng nhập nếu chưa có username trong localStorage
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style scoped>
/* Container Header */
.header {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-color: #30618C;
  color: white;
  padding: 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  position: sticky;
  top: 0;
  z-index: 1000;
}
.profile-image:hover {
  transform: rotate(360deg);
  transition: transform 0.6s ease-in-out;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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

/* Button styles */
.nav-item {
  background: #ff4081;
  border: none;
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.3s;
  padding: 8px 15px;
  border-radius: 25px;
  background: linear-gradient(135deg, #eb759c 0%, #f50057 100%);
  box-shadow: 0 4px 15px rgba(255, 64, 129, 0.4);
}


.nav-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  background-color: #f50057;
}

/* Profile Image */
.profile-image {
  width: 40px;   /* Adjust size of the image */
  height: 40px;  /* Adjust size of the image */
  border-radius: 50%;
  margin-left: 8px;
}

/* Dropdown styles */
.dropdown-container {
  
  border-radius: 10px;
 
  margin: 10px;
 
}

.custom-dropdown {
  position: absolute;
  top: 100%;
  width: 180px;
  background: rgb(241, 247, 247);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center; /* Căn giữa tên nếu nó ngắn */
  right:20px;

}

.custom-dropdown button {
  
  padding: 10px 15px;
  color: #1f1e1e;
  

  
  
}
.dropdown-container button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);

}

.custom-dropdown a:hover {
  background: #f5f5f5;
}

/* Dropdown animation */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .header {
    padding: 10px 15px;
  }

  .logo h1 {
    font-size: 1.3rem;
  }

  .header-nav {
    gap: 10px;
  }

  .nav-item {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
  
  .nav-item i {
    font-size: 1rem;
  }

  .custom-dropdown {
    width: 100%;
  }

  .dropdown-container {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .logo h1 {
    font-size: 1.1rem;
  }

  .header-nav {
    gap: 8px;
  }

  .nav-item {
    font-size: 0.8rem;
    padding: 5px 10px;
  }

  .nav-item i {
    font-size: 0.9rem;
  }
}
</style>
