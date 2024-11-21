<template>
    <div class="profile-container">
      <div class="form-container">
        <!-- Hình ảnh và phần thay đổi ảnh -->
        <div class="profile-image-section">
          <div class="image-container" @click="triggerImageUpload">
            <img :src="profileImage" alt="Avatar" class="avatar" />
          </div>
          <!-- Tên người dùng hiển thị dưới ảnh -->
          <div class="username-section">
            <span class="username">{{ username }}</span>
          </div>
          <input type="file" ref="fileInput" @change="handleProfileImageUpload" class="hidden-input" />
        </div>
  
        <!-- Chỉnh sửa thông tin -->
        <div class="personal-info">
          <div class="info-item">
            <span class="label">Tên lớp:</span>
            <input v-model="userInfo.class" :readonly="!isEditingInfo" class="input-field" />
          </div>
  
          <div class="info-item">
            <span class="label">Mã số cá nhân:</span>
            <input v-model="userInfo.id" :readonly="!isEditingInfo" class="input-field" />
          </div>
  
          <div class="info-item">
            <span class="label">Giới tính:</span>
            <input v-model="userInfo.gender" :readonly="!isEditingInfo" class="input-field" />
          </div>
  
          <div class="info-item">
            <span class="label">Ngày sinh:</span>
            <input v-model="userInfo.dob" :readonly="!isEditingInfo" type="date" class="input-field" />
          </div>
  
          <!-- Phone Number input -->
          <div class="info-item">
            <span class="label">Số điện thoại:</span>
            <input 
              v-model="userInfo.phone" 
              :readonly="!isEditingInfo" 
              class="input-field" 
              type="text" 
              :required="isEditingInfo" 
              placeholder="Nhập số điện thoại"
            />
          </div>
  
          <!-- Role display based on value -->
          <div class="info-item">
            <span class="label"> Vai trò:</span>
  <span class="input-field"> {{ getRoleName(role) }}</span>
  <!-- Directly display the role -->
  
</div>

        </div>
  
        <!-- Nút để chỉnh sửa thông tin -->
        <div class="button-container">
          <button v-if="isEditingInfo" @click="saveInfo" class="save-button">Lưu thông tin</button>
          <button v-if="isEditingInfo" @click="cancelInfoEdit" class="cancel-button">Hủy</button>
          <button v-if="!isEditingInfo" @click="startEditingInfo" class="edit-button">Chỉnh sửa thông tin</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: localStorage.getItem("email"),
        role: localStorage.getItem("role"),
        username: localStorage.getItem("username") || "Người dùng", // Default name if not available
        profileImage: localStorage.getItem("profileImage") || "https://i.pinimg.com/originals/ed/53/a0/ed53a0129c36eea6d1c650484b27b726.gif", // Default image if not available
        userInfo: {
          class: "Lớp 12A1",
          id: "123456789",
          gender: "Nam",
          dob: "2000-01-01",
          phone: "", // Add phone field
        },
        isEditingInfo: false,
      };
    },
    methods: {
      // Trigger file input when clicking on the image
      triggerImageUpload() {
        this.$refs.fileInput.click();
      },
  
      // Handle image upload
      handleProfileImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            this.profileImage = reader.result;
            localStorage.setItem("profileImage", this.profileImage);
          };
          reader.readAsDataURL(file);
        }
      },
  
      // Start editing personal info
      startEditingInfo() {
        this.isEditingInfo = true;
      },
  
      cancelInfoEdit() {
        this.isEditingInfo = false;
        this.loadUserInfoFromStorage();
      },
  
      saveInfo() {
        if (this.userInfo.phone === "") {
          alert("Số điện thoại không thể để trống.");
          return;
        }
        this.isEditingInfo = false;
        localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      },
  
      loadUserInfoFromStorage() {
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
          this.userInfo = JSON.parse(storedUserInfo);
        }
      },
  
      // Method to get the readable role name
      getRoleName(role) {
        if (role === "reader") {
          return "Độc giả";
        } else if (role === "librarian") {
          return "Thủ thư";
        } else if (role === "admin") {
          return "Quản trị viên";
        }
        return "Chưa xác định";
      },
    },
    created() {
      this.loadUserInfoFromStorage();
    },
  };
  </script>
  <style scoped>
  .profile-container {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 83vh;
}

.form-container {
  background-color: #fff;
  padding: 20px; /* Reduced padding to make it more compact */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 450px; /* Reduced width to make the form smaller */
  text-align: center;
}

.profile-image-section {
  position: relative;
  margin-bottom: 15px; /* Reduced margin */
  cursor: pointer;
}

.image-container {
  position: relative;
  display: inline-block;
  width: 100px; /* Reduced image size */
  height: 100px; /* Reduced image size */
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ddd;
}
.image-container:hover {
  border-color: #007bff; /* Viền xanh khi hover */
  transition: border-color 0.3s ease;
}


.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Hidden file input for image upload */
.hidden-input {
  display: none;
}

.username-section {
  margin-top: 10px; /* Reduced margin */
}

.username {
  font-size: 18px; /* Reduced font size */
  font-weight: bold;
  color: black;
  text-transform: uppercase;
}

/* Styling for personal info section */
.personal-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* Reduced gap between items */
  justify-content: space-between;
}

.info-item {
  display: flex;
  flex-direction: column;
  width: calc(50% - 10px); /* Two items per row with some space */
  margin-bottom: 12px; /* Reduced margin */
  align-items: flex-start;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 13px; /* Smaller label font */
  color: black;
}

.input-field {
  padding: 6px; /* Reduced padding */
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.input-field:read-only {
  background-color: #e9ecef;
}

/* Styling for buttons */
.button-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.save-button, .cancel-button, .edit-button {
  padding: 8px 16px; /* Reduced button size */
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 14px; /* Smaller font for buttons */
}

.save-button {
  background-color: #28a745;
  color: white;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
}

.edit-button {
  background-color: #007bff;
  color: white;
}
.input-field:focus {
  border-color: #007bff; /* Viền xanh khi focus */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
/* Responsive styles */
@media (max-width: 768px) {
  .personal-info {
    flex-direction: column;
    gap: 10px;
  }

  .info-item {
    width: 100%; /* Full width on small screens */
  }
}

  </style>
  