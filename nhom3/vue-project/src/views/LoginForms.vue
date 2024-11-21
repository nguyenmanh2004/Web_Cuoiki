<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input
        type="email"
        placeholder="Nhập đúng email"
        v-model="email"
        required
        :class="{'input-error': emailError}"
      />
      <p v-if="emailError" class="error-text">Vui lòng nhập email hợp lệ.</p>

      <input
        type="password"
        placeholder="Mật khẩu từ 8 ký tự"
        v-model="password"
        required
        :class="{'input-error': passwordError}"
      />
      <p v-if="passwordError" class="error-text">Mật khẩu phải có ít nhất 8 ký tự.</p>

      <div class="role-selection">
        <label for="role">Phân quyền người dùng:</label>
        <select v-model="role" id="role" required>
          <option value="reader">Độc giả</option>
          <option value="librarian">Thủ thư</option>
          <option value="admin">Quản trị viên</option>
        </select>
      </div>

      <div class="button-container">
        <button type="submit" class="confirm-button">Confirm</button>
        <button type="button" @click="goToSignUp" class="signup-button">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      role: "reader", // Default role
      emailError: false,
      passwordError: false,
    };
  },
  methods: {
    validateForm() {
      this.emailError = !/\S+@\S+\.\S+/.test(this.email); // Check email validity
      this.passwordError = this.password.length < 8; // Check password length
      return !this.emailError && !this.passwordError;
    },
    handleLogin() {
      if (!this.validateForm()) return;

      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
      const storedRole = localStorage.getItem("role");

      // Check if email, password, and role match
      if (storedEmail === this.email && storedPassword === this.password) {
        if (storedRole === this.role) {
          alert(`Đăng nhập thành công với vai trò ${this.getRoleName(storedRole)}!`);
          this.$router.push('/Trangquanlisach'); // Redirect to the "About" page
        } else {
          alert("Bạn đã nhập đúng thông tin nhưng không có quyền phù hợp.");
        }
      } else {
        alert("Thông tin đăng nhập không chính xác. Vui lòng thử lại.");
      }
    },
    getRoleName(role) {
      switch (role) {
        case "admin":
          return "Quản trị viên";
        case "librarian":
          return "Thủ thư";
        case "reader":
        default:
          return "Độc giả";
      }
    },
    goToSignUp() {
      this.$router.push({ name: "SignUp" }); // Redirect to the Sign Up page
    },
  },
  created() {
    // Save sample data only if it doesn't already exist in localStorage
    if (!localStorage.getItem("email")) {
      localStorage.setItem("email", "admin@example.com");
      localStorage.setItem("password", "password123");
      localStorage.setItem("role", "admin");
      console.log("Dữ liệu mẫu đã được lưu trữ:");
      console.log({
        email: "admin@example.com",
        password: "password123",
        role: "admin",
      });
    } else {
      console.log("Dữ liệu mẫu đã tồn tại trong localStorage.");
    }
  },
};
</script>



<style scoped>
/* Container chính của form */
.login-container {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  width: 70%; /* Đảm bảo form hiển thị tốt trên màn hình nhỏ */
  max-width: 400px; /* Giới hạn tối đa kích thước */
  margin: 70px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: #f9f9f9;
}

/* Tiêu đề */
.login-container h1 {
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}

/* Input fields */
.login-container input {
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.login-container .input-error {
  border-color: red;
}

/* Error messages */
.error-text {
  color: red;
  font-size: 12px;
  margin: 0;
  padding: 0;
  text-align: left;
}

/* Buttons */
.login-container button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 15px;
}

/* Button hover effects */
.login-container button:hover {
  background-color: #eb120e;
}

/* Vai trò người dùng (Role selection) */
.role-selection {
  margin-top: 20px;
  text-align: left;
  color: black;
}

.role-selection select {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Button container */
.button-container {
  display: flex;
  flex-wrap: wrap; /* Đảm bảo nút không bị tràn */
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
}

.confirm-button {
  flex: 1; /* Các nút chia đều khoảng trống */
  background-color: #007bff; /* Màu xanh cho nút xác nhận */
  margin-right: 5px;
  color:white;
}

.signup-button {
  flex: 1; /* Các nút chia đều khoảng trống */
  background-color: #28a745; /* Màu xanh lá cho Sign Up */
  margin-left: 5px;
  color: white;
}

.confirm-button:hover {
  background-color: #0056b3;
}

.signup-button:hover {
  background-color: #218838;
}

/* Media queries cho thiết bị nhỏ */
@media (max-width: 576px) {
  .button-container {
    flex-direction: column; /* Đưa các nút xuống hàng trên màn hình nhỏ */
  }

  .confirm-button,
  .signup-button {
    margin: 5px 0; /* Tạo khoảng cách giữa các nút */
  }
}

@media (min-width: 1024px) {
  .login-container {
    max-width: 500px; /* Kích thước lớn hơn cho màn hình lớn */
    padding: 30px;
  }
}
</style>

