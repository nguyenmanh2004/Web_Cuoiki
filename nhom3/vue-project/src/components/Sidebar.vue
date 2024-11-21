<template>
  <aside class="sidebar">
    <h2>Quản lý sách</h2>

    <!-- Only show to admin and librarian -->
    <button v-if="isAdminOrLibrarian" @click="showAddForm">
      <i class="fas fa-plus-circle"></i> Thêm Sách
    </button>
    <button v-if="isAdminOrLibrarian" @click="showEditForm">
      <i class="fas fa-edit"></i> Sửa Sách
    </button>
    <button v-if="isAdminOrLibrarian" @click="deleteBook">
      <i class="fas fa-trash-alt"></i> Xóa Sách
    </button>

    <!-- Only show to readers -->
    <button v-if="isReader" @click="borrowBook" >
      <i class="fa-regular fa-book" ></i> Mượn sách
    </button>

    <!-- Visible to all users -->
    <button @click="toggleFilterOptions">
      <i class="fas fa-list"></i> Phân Loại Sách
      <i :class="isFilterVisible ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
    </button>
    
    <ul v-if="isFilterVisible" class="filter-options">
      <li @click="filterBooks('all')">Tất cả</li>
      <li @click="filterBooks('new')">Còn sách</li>
      <li @click="filterBooks('borrowed')">Đã mượn</li>
      <li @click="filterBooks('damaged')">Hư hỏng</li>
    </ul>
    
    <div v-if="!isFilterVisible" class="sidebar-image">
      <img src="https://i.pinimg.com/originals/3b/d2/3d/3bd23d0f44f4a573328bcd7db920d77d.gif" alt="Library Image" />
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      isFilterVisible: false, // To toggle the filter options
      role: null, // User role to determine permissions
    };
  },
  computed: {
    // Computed properties to check user role
    isAdminOrLibrarian() {
      return this.role === "admin" || this.role === "librarian";
    },
    isReader() {
      return this.role === "reader";
    },
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
    borrowBook() {
      this.$emit("borrowBook");
    },
    toggleFilterOptions() {
      this.isFilterVisible = !this.isFilterVisible;
    },
    filterBooks(status) {
      this.$emit("filterBooks", status);
    },
  },
  mounted() {
    // Retrieve role from local storage
    this.role = localStorage.getItem("role");
  },
};
</script>



<style>
.sidebar {
  width: 240px; /* Increased width for comfort */
  background: #30618C;
  color: white; /* White text for contrast */
  padding: 20px;
  border-right: 1px solid #cded8e;
  transition: all 0.3s ease-in-out;
  height: 100%;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Shadow for depth */
  height:485px;
  position:absolute;
  
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.sidebar h2 {
  margin-bottom: 20px;
  font-size: 22px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 2px solid rgb(250, 0, 0); /* Underline */
  padding-bottom: 10px;
}

.sidebar button {
    transform: scale(1.05);  /* Phóng to nhẹ */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0; /* Giảm khoảng cách giữa các nút */
  width: 100%;
  padding: 8px 12px; /* Giảm padding để nút có chiều cao nhỏ hơn */
  cursor: pointer;
  font-size: 14px; /* Giảm kích thước font chữ */
  color: #fff;
  background: #531061; /* Dark purple background */
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.sidebar button i {
  margin-right: 8px; /* Space between icon and text */
}

.sidebar button:hover {
  background: #004080; /* Hover color */
  transform: scale(1.05);
}

.sidebar button:active {
  transform: scale(0.98); /* Shrink slightly when clicked */
}

.sidebar button:focus {
  outline: none;
  box-shadow: 0 0 5px 2px #80d4ff; /* Highlight when focused */
}

.filter-options {
  list-style: none;
  padding: 5px 0;
  margin: 0;
  text-align: center; /* Căn giữa văn bản */
}

.filter-options li {
  background: #e8f4fc;
  color: #004080;
  padding: 1px;
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
  transform: scale(0.98); /* Shrink on click */
}

/* Image section at the bottom */
.sidebar-image {
  margin-top: auto; /* Push the image to the bottom */
  text-align: center;
  padding-top: 15px; /* Space between the filter section and image */
}

.sidebar-image img {
  width: 80%; /* Image width */
  max-width: 150px;
  height: auto;
  border-radius: 8px;
}
.sidebar button::after {
  content: "";
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.6s linear;
  opacity: 0;
  pointer-events: none;
}
.sidebar button:active::after {
  opacity: 1;
  transform: scale(4);
}
</style>
