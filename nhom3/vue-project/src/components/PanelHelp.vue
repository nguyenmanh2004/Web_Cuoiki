<template>
    <div class="panel-help" v-if="isVisible">
      <div class="panel">
        <!-- Hình ảnh hiển thị chung -->
        <img src="https://i.pinimg.com/originals/c0/aa/d5/c0aad578f9c579bc72641644bc58ba01.gif" alt="Guide Image" class="panel-image" />
        
        <!-- Nội dung từng bước -->
        <div class="panel-content">
          <h2>{{ steps[currentStep].title }}</h2>
          <p>{{ steps[currentStep].description }}</p>
        </div>
        
        <!-- Các nút điều khiển -->
        <div class="panel-buttons">
          <button v-if="currentStep > 0" @click="previousStep">◀ Trước</button>
          <button v-if="currentStep < steps.length - 1" @click="nextStep">Tiếp ▶</button>
          <button v-else @click="finishGuide" class="ok-button">OK</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PanelHelp",
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        currentStep: 0,
        steps: [
          {
            title: "Bước 1: Tìm Kiếm Sách",
            description: "Sử dụng thanh tìm kiếm để nhập tên sách hoặc tác giả.",
          },
          {
            title: "Bước 2: Quản Lý Sách",
            description: "Vào mục 'Quản lý sách' để xem và chỉnh sửa danh sách của bạn.",
          },
          {
            title: "Bước 3: Hoàn Tất",
            description: "Nhấn 'OK' để bắt đầu khám phá thư viện của bạn!",
          },
        ]
      };
    },
    methods: {
      previousStep() {
        if (this.currentStep > 0) {
          this.currentStep--;
        }
      },
      nextStep() {
        if (this.currentStep < this.steps.length - 1) {
          this.currentStep++;
        }
      },
      finishGuide() {
        this.$emit('close'); // Đóng panel khi người dùng hoàn tất
      }
    }
  };
  </script>
  
  
  <style scoped>
  .panel-help {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .panel {
    background-color: white;
    border-radius: 8px;
    width: 400px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.5s ease-out;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .panel-image {
    width: 100%; /* Chiều rộng 100% của khung chứa */
    max-height: 200px; /* Giới hạn chiều cao */
    object-fit: cover; /* Giữ tỉ lệ hình ảnh */
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .panel-content h2 {
    font-size: 1.5rem;
    margin: 10px 0;
  }
  
  .panel-content p {
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
  }
  
  .panel-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .panel-buttons button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .panel-buttons button:hover {
    background-color: #0056b3;
  }
  
  .ok-button {
    background-color: #28a745;
  }
  
  .ok-button:hover {
    background-color: #218838;
  }
  </style>
  