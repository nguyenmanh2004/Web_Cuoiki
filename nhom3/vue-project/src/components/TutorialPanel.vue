<template>
  <div v-if="isTutorialVisible" class="tutorial-overlay">
    <div class="tutorial-box">
      <!-- Character Image -->
      <div class="character-image">
        <img src="../assets/anime.jpg" alt="Character" />
      </div>
      
      <!-- Chatbox -->
      <div class="chat-box">
        <div class="chat-message">
          <p>Chào mừng bạn đến với thư viện sách ! Đây là nơi bạn có thể xem và mượn nhiều loại sách hay.</p>
          <p>Nhấn vào nút dưới để bắt đầu.</p>
        </div>
      </div>
      
      <!-- Close Button -->
      <button @click="startUsingApp" class="btn-start">Bắt đầu</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TutorialPanel",
  props: {
    isTutorialVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    // Start using the app (close tutorial)
    startUsingApp() {
      this.$emit("start-using-app");
    },
  },
};
</script>

<style scoped>
/* Tutorial Panel Styles */
.tutorial-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.5s forwards; /* Add fade-in animation */
}

.tutorial-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: scale(0.8);
  animation: scaleUp 0.6s ease-out forwards; /* Add scale-up animation */
}

.character-image img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
  animation: bounce 1s infinite alternate; /* Bounce animation for character image */
}

.chat-box {
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  animation: fadeInChat 1s ease-in; /* Fade-in effect for chatbox */
}

.chat-message p {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.btn-start {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-start:hover {
  background-color: #0056b3;
}

/* Keyframes for Animations */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes scaleUp {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

@keyframes fadeInChat {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .tutorial-box {
    width: 90%; /* Make tutorial box smaller on mobile */
    padding: 15px;
  }

  .character-image img {
    width: 80px; /* Reduce image size for mobile */
    height: 80px;
  }

  .chat-message p {
    font-size: 14px; /* Adjust font size for mobile */
  }

  .btn-start {
    width: 100%; /* Make button full width on mobile */
    padding: 12px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .tutorial-overlay {
    padding: 10px; /* Reduce padding for smaller screens */
  }

  .tutorial-box {
    width: 100%; /* Full width for very small screens */
    border-radius: 0;
    padding: 10px;
  }

  .character-image img {
    width: 70px;
    height: 70px; /* Further reduce image size */
  }

  .chat-message p {
    font-size: 12px; /* Further reduce font size */
  }

  .btn-start {
    font-size: 14px; /* Smaller button font size */
    padding: 10px;
  }
}
</style>
