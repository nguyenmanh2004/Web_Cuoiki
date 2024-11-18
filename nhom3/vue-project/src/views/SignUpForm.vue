<template>
  <div class="signup-container">
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignUp">
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

      <!-- Trường chọn quyền -->
      <select v-model="role" required class="role-select">
        <option value="reader">Reader</option>
        <option value="admin">Admin</option>
        <option value="librarian">Thủ thư</option> <!-- Added role -->
      </select>

      <!-- Button container for Sign Up and Log In -->
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
    handleSignUp() {
      if (!this.validateForm()) return;

      // Store user information in localStorage
      localStorage.setItem("email", this.email);
      localStorage.setItem("password", this.password);
      localStorage.setItem("role", this.role); // Store the selected role

      alert(
        `Sign Up Successful! Your role is: ${this.role === "admin" ? "Admin" : this.role === "librarian" ? "Thủ thư" : "Reader"}.`
      );

      // Redirect to Login page
      this.$router.push("/login");
    },
    goToLogin() {
      this.$router.push("/login"); // Navigate to Login page
    },
  },
};
</script>
<style scoped>
.signup-container {
  width: 90%;
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
