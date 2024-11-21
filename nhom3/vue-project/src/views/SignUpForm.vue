<template>
  <div class="signup-container">
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignUp">
      <!-- Trường nhập tên người dùng -->
      <input
        type="text"
        placeholder="Nhập tên người dùng"
        v-model="username"
        required
        :class="{'input-error': usernameError}"
      />
      <p v-if="usernameError" class="error-text">Tên người dùng không được để trống.</p>

      <!-- Trường nhập email -->
      <input
        type="email"
        placeholder="Nhập đúng email"
        v-model="email"
        required
        :class="{'input-error': emailError}"
      />
      <p v-if="emailError" class="error-text">Vui lòng nhập email hợp lệ.</p>

      <!-- Trường nhập mật khẩu -->
      <input
        type="password"
        placeholder="Mật khẩu từ 8 ký tự"
        v-model="password"
        required
        :class="{'input-error': passwordError}"
      />
      <p v-if="passwordError" class="error-text">Mật khẩu phải có ít nhất 8 ký tự.</p>

      <!-- Trường chọn quyền -->
      <select v-model="role" required class="role-select">
        <option value="reader">Reader</option>
        <option value="admin">Admin</option>
        <option value="librarian">Thủ thư</option>
      </select>

      <!-- Button container -->
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
      role: "reader", // Default role
      usernameError: false,
      emailError: false,
      passwordError: false,
    };
  },
  methods: {
    validateForm() {
      this.usernameError = this.username.trim() === ""; // Kiểm tra tên người dùng
      this.emailError = !/\S+@\S+\.\S+/.test(this.email); // Kiểm tra định dạng email
      this.passwordError = this.password.length < 8; // Kiểm tra độ dài mật khẩu
      return !this.usernameError && !this.emailError && !this.passwordError;
    },
    handleSignUp() {
      if (!this.validateForm()) return;

      // Lưu thông tin vào localStorage
      localStorage.setItem("username", this.username);
      localStorage.setItem("email", this.email);
      localStorage.setItem("password", this.password);
      localStorage.setItem("role", this.role);

      alert(
        `Đăng ký thành công! Xin chào, ${this.username} (${this.role === "admin" ? "Quản Trị Viên" : this.role === "librarian" ? "Thủ thư" : "Reader"}).`
      );

      // Chuyển hướng đến trang login
      this.$router.push("/login");
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.signup-container {
  width: 90%;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  max-width: 400px;
  margin: 70px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: #f9f9f9;
}

.signup-container h1 {
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}

.signup-container input,
.signup-container select {
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.signup-container .input-error {
  border-color: red;
}

.error-text {
  color: red;
  font-size: 12px;
  margin: 0;
  padding: 0;
  text-align: left;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}

.signup-button {
  flex: 1;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button {
  flex: 1;
  background-color: #28a745;
  border: none;
  color: white;
  font-size: 16px;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.signup-button:hover {
  background-color: red; /* Changed to red for hover effect */
}

.login-button:hover {
  background-color: red; /* Changed to red for hover effect */
}

/* Style riêng cho menu thả xuống */
.role-select {
  cursor: pointer;
  background-color: #fff;
  color: #333;
  font-size: 16px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 12px 0;
}

/* Responsive thiết bị nhỏ */
@media (max-width: 576px) {
  .button-container {
    flex-direction: column;
  }

  .signup-button,
  .login-button {
    margin: 5px 0;
  }
}
</style>
