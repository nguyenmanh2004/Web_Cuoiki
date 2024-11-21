<template>
  <div class="add-book">
    <h2><i class="fas fa-book"></i> Thêm Sách Mới</h2>
    <form @submit.prevent="submitBook">
      <div class="form-row">
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
      </div>

      <div class="form-row">
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
      </div>

      <div class="form-row">
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
      </div>
      
      <!-- Trường ID ẩn -->
      <input type="hidden" v-model="book.id" />
      <div class="form-actions">
        <button type="submit"><i class="fas fa-plus-circle"></i> Thêm Sách</button>
        <button type="button" @click="cancelAdd"><i class="fas fa-arrow-left"></i> Quay Lại</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddBook",
  data() {
    return {
      book: {
        id: null, 
        title: "",
        author: "",
        category: "",
        year: null,
        status: "Còn sách",
        image: null, 
      },
    };
  },
  methods: {
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.book.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    submitBook() {
      this.book.id = Date.now();
      this.$emit("addBook", { ...this.book });

      this.resetForm();
    },
    cancelAdd() {
      this.$emit("closePanel"); // Emit to close the panel
      this.resetForm();
    },
    resetForm() {
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
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  max-width: 800px; /* Reduced width to make the form slightly smaller */
  margin: 50px auto;
  padding: 20px; /* Reduced padding for smaller form size */
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://i.pinimg.com/474x/77/0e/4d/770e4df0683263bd8782eba3c8b70e73.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 10;
  overflow-y: auto; /* Enables scrolling if content exceeds available space */
  max-height: 90vh; /* Limit form height to fit in viewport */
}

.add-book h2 {
  text-align: center;
  font-size: 24px; /* Slightly smaller font size */
  color: #333;
  margin-bottom: 15px; /* Reduced margin */
  font-weight: 600;
}

.form-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px; /* Reduced margin */
}

.form-group {
  width: 48%; /* Two columns with equal width */
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
  transition: transform 0.3s;
}
.input-wrapper input:focus + i, .input-wrapper select:focus + i {
  transform: rotate(360deg);}
input,
select,
button {
  width: 100%;
  padding: 10px; /* Reduced padding for smaller inputs */
  border: none;
  border-radius: 4px;
  font-size: 14px; /* Reduced font size */
  margin-top: 5px;
  box-sizing: border-box;
}

button {
  background-color: #6200ea;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3700b3;
}

button:focus {
  outline: none;
}

.image-preview {
  margin-top: 10px;
  text-align: center;
}

.image-preview img {
  max-width: 80px; /* Smaller preview image */
  max-height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

/* Style for action buttons */
.form-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.form-actions button {
  width: 48%;
}
.input-wrapper input:focus, .input-wrapper select:focus {
  border: 1px solid #ec125a; /* Màu viền khi focus */
  box-shadow: 0 0 8px rgba(255, 128, 171, 0.5); /* Hiệu ứng ánh sáng */
}
@media (max-width: 768px) {
  .add-book {
    padding: 15px; /* Reduced padding for smaller screens */
    max-width: 100%;
    overflow-y: auto;
    height: auto;
  }

  .form-row {
    flex-direction: column;
  }

  .form-group {
    width: 100%;
    margin-bottom: 15px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions button {
    width: 100%;
    margin-bottom: 10px;
  }
  
  /* Added scroll view for responsive layout */
  .add-book {
    overflow-y: auto;
    max-height: 90vh; /* Allow the form to scroll when content is too long */
  }
}


</style>
