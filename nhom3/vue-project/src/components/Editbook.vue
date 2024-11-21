<template>
    <div class="edit-book">
      <h2><i class="fas fa-edit"></i> Sửa Sách</h2>
      <form @submit.prevent="saveChanges">
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
          <button type="submit"><i class="fas fa-save"></i> Lưu Thay Đổi</button>
          <button type="button" @click="cancelEdit"><i class="fas fa-arrow-left"></i> Quay Lại</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "EditBook",
    props: ['book'], // Nhận sách cần sửa từ cha
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
      saveChanges() {
        // Gửi lại thay đổi về cho cha thông qua sự kiện
        this.$emit('saveEdit', this.book);
      },
      cancelEdit() {
        this.$emit('closeEdit');
      }
    }
  }
  </script>
  
  <style scoped>
.edit-book {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  max-width: 800px; /* Giảm chiều rộng giống AddBook */
  margin: 50px auto;
  padding: 20px; /* Padding giống AddBook */
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://www.example.com/your-background-image.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 10;
  overflow-y: auto; /* Cho phép cuộn nếu nội dung quá dài */
  max-height: 90vh; /* Giới hạn chiều cao như AddBook */
}

.edit-book h2 {
  text-align: center;
  font-size: 24px; /* Kích thước font giống AddBook */
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
}

.form-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
}

.form-group {
  width: 48%; /* Hai cột bằng nhau */
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
  width: 100%;
  padding: 10px; /* Giảm padding giống AddBook */
  border: none;
  border-radius: 4px;
  font-size: 14px; /* Giảm font-size như AddBook */
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
  max-width: 80px; /* Kích thước ảnh xem trước nhỏ hơn */
  max-height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.form-actions button {
  width: 48%;
}

@media (max-width: 768px) {
  .edit-book {
    padding: 15px; /* Giảm padding cho màn hình nhỏ */
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

  .edit-book {
    overflow-y: auto;
    max-height: 90vh; /* Cho phép cuộn khi nội dung quá dài */
  }
}

  </style>
  