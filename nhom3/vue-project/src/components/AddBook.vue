<template>
  <div class="add-book">
    <h2><i class="fas fa-book"></i> Thêm Sách Mới</h2>
    <form @submit.prevent="submitBook">
      <div class="form-group">
        <label for="title">Tên Sách:</label>
        <div class="input-wrapper">
          <i class="fas fa-book-open"></i>
          <input v-model="book.title" type="text" id="title" required placeholder="Nhập tên sách" />
        </div>
      </div>
      <div class="form-group">
        <label for="author">Tác Giả:</label>
        <div class="input-wrapper">
          <i class="fas fa-user"></i>
          <input v-model="book.author" type="text" id="author" required placeholder="Nhập tên tác giả" />
        </div>
      </div>
      <div class="form-group">
        <label for="category">Thể Loại:</label>
        <div class="input-wrapper">
          <i class="fas fa-tags"></i>
          <input v-model="book.category" type="text" id="category" required placeholder="Nhập thể loại sách" />
        </div>
      </div>
      <div class="form-group">
        <label for="year">Năm Xuất Bản:</label>
        <div class="input-wrapper">
          <i class="fas fa-calendar-alt"></i>
          <input v-model="book.year" type="number" id="year" min="1000" max="3000" required placeholder="Nhập năm xuất bản" />
        </div>
      </div>
      <div class="form-group">
        <label for="status">Tình Trạng:</label>
        <div class="input-wrapper">
          <i class="fas fa-info-circle"></i>
          <select v-model="book.status" id="status" required>
            <option value="Còn sách">Còn sách</option>
            <option value="Đã mượn">Đã mượn</option>
            <option value="Hư hỏng">Hư hỏng</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="image">Hình Ảnh:</label>
        <div class="input-wrapper">
          <i class="fas fa-image"></i>
          <input type="file" @change="onImageChange" id="image" />
        </div>
        <div v-if="book.image" class="image-preview">
          <img :src="book.image" alt="Preview" />
        </div>
      </div>
      <!-- Trường ID ẩn -->
      <input type="hidden" v-model="book.id" />
      <button type="submit"><i class="fas fa-plus-circle"></i> Thêm Sách</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddBook",
  data() {
    return {
      book: {
        id: null, // Trường id ẩn
        title: "",
        author: "",
        category: "",
        year: null,
        status: "Còn sách",
        image: null, // Đường dẫn hoặc Base64 của ảnh
      },
    };
  },
  methods: {
    // Xử lý khi upload ảnh
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.book.image = e.target.result; // Lưu Base64 để preview
        };
        reader.readAsDataURL(file);
      }
    },
    // Gửi sự kiện "thêm sách" về cha
    submitBook() {
      // Tạo ID duy nhất bằng cách lấy timestamp hiện tại
      this.book.id = Date.now();
      this.$emit("addBook", { ...this.book }); // Phát sự kiện với dữ liệu sách mới

      // Reset form sau khi thêm sách
      this.book = {
        id: null,
        title: "",
        author: "",
        category: "",
        year: null,
        status: "Còn sách",
        image: null,
      };
    },
  },
};
</script>

<style scoped>
.add-book {
  max-width: 600px; /* Giới hạn chiều rộng */
  margin: 50px auto; /* Canh giữa và có khoảng cách từ trên */
  padding: 30px;
  background-color: #ffffff; /* Nền sáng */
  border-radius: 8px; /* Bo góc */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Đổ bóng */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://www.example.com/your-background-image.jpg');
  background-size: cover;
  background-position: center;
}

.add-book h2 {
  text-align: center;
  font-size: 26px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

.form-group {
  width: 100%; /* Đảm bảo các trường chiếm hết chiều rộng */
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
}

.input-wrapper i {
  font-size: 18px;
  color: #6200ea;
  margin-right: 10px;
}

input,
select,
button {
  width: 100%; /* Chiếm hết chiều rộng */
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 5px;
  box-sizing: border-box;
}

input[type="file"] {
  padding: 0;
}

button {
  background-color: #6200ea;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease; /* Hiệu ứng */
  font-weight: bold;
  padding: 12px;
  border-radius: 4px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
}

button i {
  margin-right: 10px;
}

button:hover {
  background-color: #3700b3;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.98);
}

button:focus {
  outline: none;
  box-shadow: 0 0 5px 2px #80d4ff;
}

.image-preview {
  margin-top: 10px;
  text-align: center;
}

.image-preview img {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

@media (max-width: 768px) {
  .add-book {
    padding: 15px;
  }

  input,
  select,
  button {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .add-book {
    margin: 20px auto;
    max-width: 100%;
    padding: 10px;
  }
}
</style>
