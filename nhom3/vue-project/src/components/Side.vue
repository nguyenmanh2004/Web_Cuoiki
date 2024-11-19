<template>
  <aside class="sidebar">
    <h2>Quản lý sách</h2>
    <button @click="showAddForm">
      <i class="fas fa-plus-circle"></i> Thêm Sách
    </button>
    <button @click="showEditForm">
      <i class="fas fa-edit"></i> Sửa Sách
    </button>
    <button @click="deleteBook">
      <i class="fas fa-trash-alt"></i> Xóa Sách
    </button>
    <button @click="toggleFilterOptions">
      <i class="fas fa-list"></i> Phân Loại Sách
      <i :class="isFilterVisible ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
    </button>
    <ul v-if="isFilterVisible" class="filter-options">
      <li @click="filterBooks('all')">Tất Cả</li>
      <li @click="filterBooks('new')">Sách Mới</li>
      <li @click="filterBooks('borrowed')">Đã Mượn</li>
      <li @click="filterBooks('damaged')">Hư Hỏng</li>
    </ul>
  </aside>
</template>

  <script>
 export default {
  name: "Sidebar",
  data() {
    return {
      isFilterVisible: false, // Hiển thị/tắt tùy chọn phân loại
    };
  },
  methods: {
    showAddForm() {
      this.$emit("addBook");
    },
    showEditForm() {
      this.$emit("editBook");
    },
    deleteBook() {
      this.$emit("deleteBook");
    },
    toggleFilterOptions() {
      this.isFilterVisible = !this.isFilterVisible;
    },
    filterBooks(status) {
      this.$emit("filterBooks", status); // Gửi trạng thái lọc
    },
  },
};

  </script>
  
  <style>
  .sidebar {
  width: 240px; /* Tăng chiều rộng cho thoải mái */
  background: linear-gradient(to bottom, #01881a, #5ba8fa); /* Thêm gradient */
  color: white; /* Màu chữ */
  padding: 20px;
  border-right: 1px solid #004080;
  position: fixed;
  height: 100%;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Tạo đổ bóng */
}

.sidebar h2 {
  margin-bottom: 20px;
  font-size: 22px; /* Tăng kích thước tiêu đề */
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px; /* Khoảng cách giữa chữ */
  border-bottom: 2px solid rgb(250, 0, 0); /* Đường kẻ dưới tiêu đề */
  padding-bottom: 10px;
}

.sidebar button {
  display: block;
  margin: 10px 0;
  width: 100%;
  padding: 12px; /* Tăng padding */
  cursor: pointer;
  font-size: 16px; /* Tăng kích thước chữ */
  color: #fff;
  background: #531061; /* Màu xanh đậm */
  border: none;
  border-radius: 8px; /* Bo góc */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Hiệu ứng */
}

.sidebar button:hover {
  background: #004080; /* Màu xanh đậm hơn khi hover */
  transform: scale(1.05); /* Phóng to nhẹ khi hover */
}

.sidebar button:active {
  transform: scale(0.98); /* Nhỏ lại nhẹ khi click */
}

.sidebar button:last-child {
  margin-top: 20px; /* Thêm khoảng cách cho nút cuối cùng */
}

.sidebar button:focus {
  outline: none; /* Xoá viền mặc định khi focus */
  box-shadow: 0 0 5px 2px #80d4ff; /* Đổ sáng */
}
.filter-options {
  list-style: none;
  padding: 10px 0;
  margin: 0;
}

.filter-options li {
  background: #e8f4fc;
  color: #004080;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filter-options li:hover {
  background-color: #004080;
  color: white;
}

.filter-options li:active {
  transform: scale(0.98);
}

  </style>
  