<template>
   
      <!-- Product Grid -->
      <div class="product-grid">
        <div class="product-card" v-for="product in products" :key="product.id">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <div class="product-info">
            <h3 class="product-title">{{ product.name }}</h3>
            <div class="price-section">
              <span class="current-price">{{ product.currentPrice }} đ</span>
              <span class="discount">{{ product.discount }}%</span>
            </div>
            <div class="old-price">{{ product.oldPrice }} đ</div>
            <button v-if="product.status === 'available'" class="btn btn-primary">Sắp Có Hàng</button>
            <button v-else class="btn btn-danger">Sắp Hết</button>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          {
            id: 1,
            name: "The Premonition - A Pandemic Story",
            image: "https://via.placeholder.com/250x350",
            currentPrice: "333.900",
            oldPrice: "371.000",
            discount: "-10",
            status: "sold-out",
          },
          {
            id: 2,
            name: "Nước Mỹ Trong Mắt Trump",
            image: "https://via.placeholder.com/250x350",
            currentPrice: "166.320",
            oldPrice: "198.000",
            discount: "-16",
            status: "available",
          },
          {
            id: 3,
            name: "Hoa Học Trò - Số 1445",
            image: "https://via.placeholder.com/250x350",
            currentPrice: "19.000",
            oldPrice: "20.000",
            discount: "-5",
            status: "sold-out",
          },
          {
            id: 4,
            name: "Con Đường Chuyển Hóa",
            image: "https://via.placeholder.com/250x350",
            currentPrice: "144.760",
            oldPrice: "188.000",
            discount: "-23",
            status: "available",
          },
          {
            id: 5,
            name: "Con Đường Chuyển Hóa",
            image: "https://via.placeholder.com/250x350",
            currentPrice: "144.760",
            oldPrice: "188.000",
            discount: "-23",
            status: "available",
          },
          {
            id: 6,
            name: "Con Đường Chuyển Hóa",
            image: "https://via.placeholder.com/250x350",
            currentPrice: "144.760",
            oldPrice: "188.000",
            discount: "-23",
            status: "available",
          },
          {
            id: 7,
            name: "Con Đường Chuyển Hóa",
            image: "https://via.placeholder.com/250x350",
            currentPrice: "144.760",
            oldPrice: "188.000",
            discount: "-23",
            status: "available",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
/* Toàn bộ trang */
body, html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  height: 100%; /* Đảm bảo chiều cao */
  overflow-y: auto; /* Cho phép cuộn toàn bộ trang */
}

/* Header Styles */
.header {
  position: fixed; /* Cố định header */
  top: 0;
  left: 0;
  width: 100%; /* Chiều rộng full */
  height: 70px; /* Chiều cao header */
  background-color: #f9f9f9; /* Màu nền */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Hiệu ứng bóng */
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #d90000;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navigation a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
}

.navigation a:hover {
  color: #007bff;
}

/* Body Container */
.body-container {
  margin-top: 90px; /* Đảm bảo nội dung không bị header che */
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh; /* Đảm bảo chiếm chiều cao màn hình */
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

/* Product Card */
.product-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.product-info {
  padding: 20px;
}

.product-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 15px 0;
  color: #333;
}

.price-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 15px 0;
}

.current-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #d90000;
}

.discount {
  background-color: #ff4747;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1rem;
}

.old-price {
  font-size: 1rem;
  color: #777;
  text-decoration: line-through;
}

.btn {
  margin-top: 15px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}
</style>


  