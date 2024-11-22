<template>
  <div class="login-container">
    <!-- Image added here -->
    <img src="https://i.pinimg.com/enabled_lo_mid/474x/39/4d/00/394d00e713d6b3a4a928651deaccdfc0.jpg" alt="Pointer Character" class="pointer-image" />
    
    <h1>Đăng Nhập</h1>
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

      <!-- Thêm trường mã số người dùng -->
      <input
        type="text"
        placeholder="Nhập mã số nhà trường cấp"
        v-model="userCode"
        required
        :class="{'input-error': userCodeError}"
      />
      <p v-if="userCodeError" class="error-text">Mã số không hợp lệ.</p>

     

      <div class="button-container">
        <button type="submit" class="confirm-button">Xác nhận </button>
        <button type="button" @click="goToSignUp" class="signup-button">Đăng Kí</button>
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
      userCode: "",
      emailError: false,
      passwordError: false,
      userCodeError: false,
      loginError: false, // To show or hide the login error message
    };
  },
  methods: {
    validateForm() {
      this.emailError = !/\S+@\S+\.\S+/.test(this.email); // Kiểm tra email hợp lệ
      this.passwordError = this.password.length < 8; // Kiểm tra mật khẩu ít nhất 8 ký tự
      this.userCodeError = this.userCode.trim() === ""; // Kiểm tra mã số người dùng (không để trống)

      return !this.emailError && !this.passwordError && !this.userCodeError;
    },
    handleLogin() {
      // Clear login error before validating again
      this.loginError = false;

      if (!this.validateForm()) return; // Prevent login if form is invalid

      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
      const storedUserCode = localStorage.getItem("manguoidung");
      console.log('Stored User Code:', storedUserCode);

      // Kiểm tra xem email, mật khẩu và mã số có khớp không
      if (storedEmail === this.email && storedPassword === this.password) {
        if (storedUserCode === this.userCode) {
          alert("Đăng nhập thành công!");
          this.$router.push('/Trangquanlisach'); // Chuyển đến trang sau khi đăng nhập thành công
        } else {
          this.loginError = true; // Mã số không đúng
          alert("Đăng nhập ko thành công!");
        }
      } else {
        this.loginError = true; // Thông tin đăng nhập không đúng
      }
    },
    goToSignUp() {
      this.$router.push({ name: "SignUp" }); // Chuyển đến trang đăng ký
    },
  },
  created() {
   
  },
};
</script>

<style scoped>
.pointer-image {
  width: 100px;          /* Adjust size as needed */
  height: 100px;
  border-radius: 50%;    /* Makes the image circular */
  object-fit: cover;  
  margin-bottom: 10px; 
}

/* Container chính của form */
.login-container {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  width: 90%;
  max-width: 400px;
  margin: 70px auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: #f9f9f9;
}

/* Tiêu đề */
.login-container h1 {
  font-weight: bold;
  margin-bottom: 20px;   
  font-size: 20px;       
}

/* Input fields */
.login-container input {
  width: 100%;
  padding: 8px;           
  margin: 8px 0;          
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;        
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

/* Error panel for login failure */
.error-panel {
  background-color: #f8d7da;
  color: #721c24;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  margin: 10px 0;
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

.login-container button:hover {
  background-color: #eb120e;
}

/* Button container */
.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
}

.confirm-button {
  flex: 1;
  background-color: #007bff;
  margin-right: 5px;
  color: white;
}

.signup-button {
  flex: 1;
  background-color: #28a745;
  margin-left: 5px;
  color: white;
}

.confirm-button:hover {
  background-color: #0056b3;
}

.signup-button:hover {
  background-color: #218838;
}
</style>
