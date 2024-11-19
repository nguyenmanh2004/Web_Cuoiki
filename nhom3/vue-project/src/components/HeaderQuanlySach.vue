<template>
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <i class="fas fa-book"></i> <!-- Icon sách -->
          <h1>Thư Viện Sách</h1>
        </div>
        <nav class="header-nav">
          <button class="nav-item">
            <i class="fas fa-home"></i> Trang Chủ
          </button>
          <button class="nav-item">
            <i class="fas fa-search"></i> Tìm Kiếm
          </button>
          <button class="nav-item">
            <i class="fas fa-user"></i> Tài Khoản
          </button>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: "Header",
  };
  </script>
  
  <style scoped>
  .header {
    background: linear-gradient(45deg, #6200ea, #bb86fc); /* Gradient màu đẹp */
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
    justify-content: space-between; /* Chia hai phần logo và nav */
    align-items: center; /* Canh giữa theo chiều dọc */
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 10px; /* Khoảng cách giữa biểu tượng và chữ */
  }
  
  .logo h1 {
    font-size: 1.5rem; /* Nhỏ hơn để gọn */
    margin: 0;
    font-weight: 600;
  }
  
  .logo i {
    font-size: 1.8rem; /* Kích thước icon */
  }
  
  .header-nav {
    display: flex;
    gap: 15px; /* Khoảng cách giữa các nút */
  }
  
  .nav-item {
    background: transparent;
    border: none;
    color: white;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  .nav-item i {
    font-size: 1.2rem; /* Kích thước icon nhỏ hơn */
  }
  
  .nav-item:hover {
    color: #ffeb3b; /* Đổi màu khi hover */
  }
  </style>
  