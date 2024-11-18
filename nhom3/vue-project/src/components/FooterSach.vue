<template>
    <footer class="footer">
      <div class="footer-container">
        <div class="about">
          <h3>About Molla Bookstore</h3>
          <p>Molla Bookstore - Nơi bạn có thể tìm thấy những cuốn sách hay nhất.</p>
        </div>
        <div class="links">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Product</a></li>
          </ul>
        </div>
        <div class="contact">
          <h3>Contact</h3>
          <p>Email: support@molla.com</p>
          <p>Phone: +84 123 456 789</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Molla Bookstore | Designed by YourCompany</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .footer {
    background-color: #333;
    color: white;
    padding: 20px 0;
  }
  .footer-container {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .footer-container div {
    flex: 1;
    margin: 0 15px;
  }
  .footer-container h3 {
    margin-bottom: 10px;
  }
  .footer-container ul {
    list-style: none;
    padding: 0;
  }
  .footer-container ul li {
    margin: 5px 0;
  }
  .footer-container ul li a {
    color: #ffdd57;
    text-decoration: none;
  }
  .footer-container ul li a:hover {
    color: #ffc107;
  }
  .footer-bottom {
    text-align: center;
    margin-top: 20px;
    border-top: 1px solid #555;
    padding-top: 10px;
  }
  </style>
  