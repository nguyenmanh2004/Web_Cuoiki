<template>
    <div class="panel-help " v-if="isVisible">
      <div class="panel animate__animated animate__backInDown">
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
            title: "Bước 2: Mượn sách",
            description: "Click vào 1 ô sách , lúc nó sáng viền rồi bấm vào mượn sách.",
          },
          {
            title: "Bước 3: Hoàn mượn sách",
            description: "nhấn OK để hoàn tất mượn sách ",

          },
          {
            title: "Lưu ý ",
            description: "Bạn có 7 ngày để mượn sách , tuyệt đối đừng làm mất hay làm hỏng tránh mất tiền nhé !",
            
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
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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
    color:black;
    
  }
  
  .panel {
    background: linear-gradient(135deg, #ffffff, #e6f7ff);
    border-radius: 8px;
    width: 400px;
    padding: 20px;
    text-align: center;
    border: 2px solid #4a90e2; /* Viền màu xanh */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3); /* Tăng cường bóng đổ */

    
  
  }
  
 
  
  .panel-image {
    width: 100%; /* 100% width of the container */
    max-height: 200px; /* Limit height */
    object-fit: cover; /* Maintain image aspect ratio */
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
   
    background: linear-gradient(90deg, #007bff, #0056b3); /* Gradient nút */

  }
  
  .panel-buttons button:hover {
   
    background: linear-gradient(90deg, #0056b3, #004085); /* Đậm hơn khi hover */
  transform: translateY(-2px); /* Hiệu ứng nâng nhẹ */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Bóng đổ khi hover */
  }
  
  .ok-button {
  background: linear-gradient(90deg, #28a745, #218838); /* Gradient xanh lá */
}

.ok-button:hover {
  background: linear-gradient(90deg, #218838, #1e7e34); /* Đậm hơn khi hover */
}
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .panel {
      width: 90%; /* Make panel take up 90% of screen width on smaller devices */
      padding: 15px; /* Reduce padding */
    }
  
    .panel-content h2 {
      font-size: 1.2rem; /* Smaller heading size */
    }
  
    .panel-content p {
      font-size: 0.9rem; /* Smaller paragraph size */
    }
  
    .panel-buttons {
      flex-direction: column;
      align-items: center;
    }
  
    .panel-buttons button {
      margin: 5px 0; /* Add margin between buttons */
      width: 100%; /* Make buttons fill width */
    }
  
    .panel-image {
      max-height: 150px; /* Limit image height on small screens */
    }
  }
  
  @media (max-width: 480px) {
    .panel {
      width: 95%; /* Panel width to be 95% on very small screens */
    }
  
    .panel-image {
      max-height: 120px; /* Reduce image height further */
    }
  
    .panel-content h2 {
      font-size: 1.1rem; /* Further reduce heading size */
    }
  
    .panel-content p {
      font-size: 0.8rem; /* Smaller paragraph font size */
    }
  }
  </style>
  