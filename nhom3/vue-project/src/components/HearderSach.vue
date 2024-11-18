<template>
    <header class="header-container">
      <!-- Top Banner -->
      <div class="top-banner">
        <img
          src="https://via.placeholder.com/150x50"
          alt="Banner"
          class="banner-image"
        />
        <div class="banner-text">GAME HAY GIẢM ĐẬM - CHẬM CHÂN LÀ HẾT</div>
        <button class="buy-now">MUA NGAY</button>
      </div>
  
      <!-- Main Header -->
      <div class="main-header">
        <!-- Logo -->
        <div class="logo">
          <img
            src="https://via.placeholder.com/150x50?text=Fahasa.com"
            alt="Fahasa Logo"
          />
        </div>
  
        <!-- Search Bar -->
        <div class="search-bar">
          <input
            type="text"
            placeholder="Con đường chuyển hóa - Thích Pháp Hòa"
          />
          <button class="search-btn">
            <i class="fas fa-search"></i>
          </button>
        </div>
  
        <!-- User Actions -->
        <div class="user-actions">
          <div class="action">
            <i class="fas fa-bell"></i>
            <span>Thông Báo</span>
          </div>
          <div class="action">
            <i class="fas fa-shopping-cart"></i>
            <span>Giỏ Hàng</span>
          </div>
          <div class="action">
            <i class="fas fa-user"></i>
            <span>Tài khoản</span>
          </div>
          <div class="action flag">
            <img
              src="https://via.placeholder.com/20x15?text=VN"
              alt="Vietnam Flag"
            />
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  /* Header Container */
  .header-container {
    font-family: Arial, sans-serif;
  }
  
  /* Top Banner */
  .top-banner {
    background-color: #d0021b;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
  }
  
  .banner-image {
    height: 50px;
  }
  
  .banner-text {
    font-size: 1.2rem;
    font-weight: bold;
    flex: 1;
    text-align: center;
  }
  
  .buy-now {
    background-color: #fff;
    color: #d0021b;
    padding: 8px 15px;
    border: none;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .buy-now:hover {
    background-color: #f5f5f5;
  }
  
  /* Main Header */
  .main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Logo */
  .logo img {
    height: 50px;
  }
  
  /* Search Bar */
  .search-bar {
    display: flex;
    flex: 1;
    margin: 0 20px;
  }
  
  .search-bar input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px 0 0 5px;
  }
  
  .search-bar .search-btn {
    background-color: #d0021b;
    color: white;
    padding: 0 15px;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
  }
  
  .search-bar .search-btn i {
    font-size: 1.2rem;
  }
  
  /* User Actions */
  .user-actions {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  
  .action {
    text-align: center;
    color: #555;
    font-size: 0.9rem;
    cursor: pointer;
  }
  
  .action i {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 5px;
  }
  
  .action:hover {
    color: #d0021b;
  }
  
  .flag img {
    display: inline-block;
    height: 15px;
    margin-right: 5px;
  }
  
  .flag i {
    font-size: 0.8rem;
  }
  </style>
  