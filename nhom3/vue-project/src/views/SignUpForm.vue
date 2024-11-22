<template>
  <div class="signup-container">
    <!-- Image added here -->
    <img src="https://i.pinimg.com/originals/ae/c0/b0/aec0b0923bfd5ac90ee73b58d8430511.gif" alt="Pointer Character" class="pointer-image" />
    
    <h1 >Sign Up</h1>

    <form @submit.prevent="handleSignUp">
      <input
        type="text"
        placeholder="Nhập tên người dùng"
        v-model="username"
        required
        :class="{'input-error': usernameError}"
      />
      <p v-if="usernameError" class="error-text">Tên người dùng không được để trống.</p>

      <input
        type="email"
        placeholder="Nhập email"
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

      <input
        type="text"
        placeholder="Nhập mã số trường cung cấp"
        v-model="roleCode"
        required
        :class="{'input-error': roleCodeError}"
      />
      <p v-if="roleCodeError" class="error-text">
  Mã số không hợp lệ. Vui lòng nhập mã do nhà trường cung cấp.
</p>

      <div class="button-container">
        <button type="submit" class="signup-button">Confirm</button>
        <button type="button" @click="goToLogin" class="login-button">Log In</button>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  name: "SignUpForm",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      roleCode: "",
      usernameError: false,
      emailError: false,
      passwordError: false,
      roleCodeError: false,
    
      errorMessage: "",
    };
  },
  methods: {
    validateForm() {
      this.usernameError = !this.username.trim();
      this.emailError = !/\S+@\S+\.\S+/.test(this.email);
      this.passwordError = this.password.length < 8;
      this.roleCodeError = !/^(RE|LI|AD)-\d{4}$/.test(this.roleCode.trim());

      if (this.roleCodeError) {
        this.showErrorPanel = true;
        this.errorMessage = "Mã số không hợp lệ. Hãy thử lại!";
      } else {
        this.showErrorPanel = false;
      }

      return !this.usernameError && !this.emailError && !this.passwordError && !this.roleCodeError;
    },
    handleSignUp() {
      if (!this.validateForm()) return;

      const rolePrefix = this.roleCode.slice(0, 2).toUpperCase();
      const roleMap = { RE: "reader", LI: "librarian", AD: "admin" };
      const selectedRole = roleMap[rolePrefix];

      localStorage.setItem("username", this.username);
      localStorage.setItem("email", this.email);
      localStorage.setItem("password", this.password);
      localStorage.setItem("role", selectedRole);
      localStorage.setItem("manguoidung", this.roleCode); // Assuming 'manguoidung' is the username
      alert(`Đăng ký thành công! Xin chào, ${this.username} (${selectedRole}).`);
      this.$router.push("/login");
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.pointer-image {
  width: 100px;          /* Adjust size as needed */
  height: 100px;
  border-radius: 50%;    /* Makes the image circular */
  object-fit: cover;     /* Ensures the image maintains aspect ratio */
  margin-bottom: 10px;   /* Space between image and heading */
}

.signup-container {
  width: 90%;
  max-width: 400px;
  margin: 50px auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
  text-align: center;
}
.signup-container h1 {
  font-weight: bold;
  margin-bottom: 20px;   /* Khoảng cách giữa tiêu đề và form */
  font-size: 20px;       /* Kích thước chữ tiêu đề giống form đăng ký */
}
.signup-container input {
  width: 100%;
  padding: 8px; /* Giảm padding */
  margin: 8px 0; /* Giảm margin */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px; /* Giảm kích thước font */
}



.error-text {
  color: red;
  font-size: 12px;
  margin: 4px 0;
  text-align: left;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px; /* Giảm khoảng cách trên */
}

.signup-button,
.login-button {
  flex: 1;
  padding: 10px; /* Giảm padding */
  font-size: 14px; /* Giảm kích thước font */
  margin: 0 5px; /* Thêm một chút khoảng cách giữa các nút */
}

.signup-button {
  background-color: #007bff;
}

.login-button {
  background-color: #28a745;
}

.signup-button:hover,
.login-button:hover {
  background-color: #dc3545; /* Màu đỏ khi hover */
}

.error-panel {
  background-color: #f8d7da;
  color: #721c24;
  padding: 8px; /* Giảm padding */
  font-size: 14px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  margin: 10px 0; /* Giảm khoảng cách */
}

</style>
