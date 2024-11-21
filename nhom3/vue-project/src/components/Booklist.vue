<template>
  <div class="book-list">
    <!-- Bộ lọc tìm kiếm -->
    <div class="search-filter">
      <input type="text" v-model="searchQuery.title" placeholder="Tìm theo tên sách" @input="filterBooks" />
      <input type="text" v-model="searchQuery.author" placeholder="Tìm theo tác giả" @input="filterBooks" />
      <input type="text" v-model="searchQuery.category" placeholder="Tìm theo thể loại" @input="filterBooks" />
    </div>
    
    <!-- Hiển thị sách theo dạng lưới -->
    <div class="book-grid">
      <div v-for="(book, index) in currentBooks" :key="book.id" class="book-item animate__animated animate__fadeInRight"
        :class="{ 'selected': selectedBookId === book.id }" @click="selectBook(book.id)">
        <img :src="book.image" alt="Book image" class="book-image" />
        <h3>{{ book.title }}</h3>
        <p><b>Tác giả:</b> {{ book.author }}</p>
        <p><b>Thể loại:</b> {{ book.category }}</p>
        <p><b> Năm Xuất Bản:</b> {{ book.year }}</p>
        <p class="status-box" :class="getStatusClass(book.status)">{{ book.status }}</p>
      </div>
    </div>

    <div v-if="filteredBooks.length === 0" class="no-results">
      <h1>Không tìm thấy sách</h1>
      
      <img src="../assets/anime.gif" width="300px" class="center-image" />
    </div>

    <!-- Điều khiển phân trang -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Trước</button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Tiếp</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookList",
  props: {
    books: Array,
  },
  data() {
    return {
      currentPage: 1,
      booksPerPage: 12,
      selectedBookId: null,
      searchQuery: {
        title: "",
        author: "",
        category: "",
      },
      role: null, // User role from localStorage
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.booksPerPage);
    },
    currentBooks() {
      const start = (this.currentPage - 1) * this.booksPerPage;
      const end = start + this.booksPerPage;
      return this.filteredBooks.slice(start, end);
    },
    filteredBooks() {
      // Filter books by search query and role
      return this.books.filter((book) => {
        const titleMatch = book.title.toLowerCase().includes(this.searchQuery.title.toLowerCase());
        const authorMatch = book.author.toLowerCase().includes(this.searchQuery.author.toLowerCase());
        const categoryMatch = book.category.toLowerCase().includes(this.searchQuery.category.toLowerCase());

        const roleMatch = this.role === "reader" || ["Đã mượn", "Hư hỏng", "Còn sách"].includes(book.status);

        return titleMatch && authorMatch && categoryMatch && roleMatch;
      });
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    selectBook(bookId) {
      this.selectedBookId = bookId;
      this.$emit("selectBook", bookId);
    },
    filterBooks() {
      this.currentPage = 1;
    },
    getStatusClass(status) {
      switch (status) {
        case "Đã mượn":
          return "status-borrowed";
        case "Hư hỏng":
          return "status-damaged";
        case "Còn sách":
          return "status-available";
        default:
          return "status-borrowed-by-me";
      }
    },
  },
  mounted() {
    // Retrieve role from localStorage
    this.role = localStorage.getItem("role");
  },
};
</script>



<style scoped>
/* Giao diện tìm kiếm */
.search-filter {
  margin-top: 20px;
  display: flex;
  justify-content: space-between; /* Căn đều các ô tìm kiếm */
  gap: 10px;
  
  margin-bottom: 30px;
  padding: 0 20px; /* Thêm padding để tránh dính vào mép */
}

/* Các ô tìm kiếm */
.search-filter input {
  padding: 12px 15px;
  background: linear-gradient(135deg, #e3f2fd, #f3f8fd); /* Gradient nền xanh nhạt */

  border: 2px solid #ddd;
  border-radius: 12px;
  width: 250px; /* Mở rộng chiều rộng của input */
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #f9f9f9; /* Màu nền nhạt giúp dễ nhìn */
  color: #333; /* Màu chữ tối để dễ đọc */
}

/* Hiệu ứng khi hover hoặc focus vào ô tìm kiếm */
.search-filter input:hover,
.search-filter input:focus {
  border-color: #4CAF50; /* Màu xanh lá khi focus */
  background-color: #fff; /* Màu nền trắng khi focus */
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.4); /* Ánh sáng xanh lá khi focus */
  outline: none; /* Xóa outline mặc định khi focus */
}

/* Placeholder đẹp hơn */
.search-filter input::placeholder {
  color: #aaa; /* Màu placeholder nhạt */
  font-style: italic;
  font-size: 14px;
}

/* Hiệu ứng khi người dùng bắt đầu nhập */
.search-filter input:not(:placeholder-shown) {
  background-color: #def6e9; /* Màu nền nhẹ khi có nội dung */
}

/* Đảm bảo các ô tìm kiếm đều có cùng chiều cao */
.search-filter input {
  height: 45px;
}

/* Giao diện danh sách sách */
.book-list {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-image: url('https://i.pinimg.com/enabled_lo_mid/736x/c8/30/17/c83017c255be137c08c568c3e284185a.jpg');
    background-size: cover; /* Đảm bảo ảnh phủ kín toàn bộ phần tử */
    background-position: center; /* Căn giữa ảnh */
    background-repeat: no-repeat; /* Không lặp lại ảnh */
 
  margin-left: 220px;
  padding-left: 30px;
  max-height: calc(100vh - 100px);
  /* Chiều cao tối đa để tránh kéo dài khi có ít sách */
  overflow-y: auto;
  padding-bottom: 50px; /* Thêm padding-bottom để đảm bảo không che mất phân trang */
  
  /* Gradient nền */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Đổ bóng nhẹ */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* Đảm bảo rằng nội dung không bị dãn đều ra */
}

.no-results {
  text-align: center;
  font-size: 18px;
  color: #999;
  margin-top: 50px;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Mặc định có 4 cột */
  gap: 10px;
  flex-grow: 1;
}

/* Media query cho màn hình nhỏ */
@media (max-width: 1024px) {
  .book-grid {
    grid-template-columns: repeat(3, 1fr); /* Nếu màn hình nhỏ hơn hoặc bằng 1024px, 3 cột */
  }
}

@media (max-width: 768px) {
  .book-grid {
    grid-template-columns: repeat(2, 1fr); /* Nếu màn hình nhỏ hơn hoặc bằng 768px, 2 cột */
  }
}

@media (max-width: 480px) {
  .book-grid {
    grid-template-columns: 1fr; /* Nếu màn hình nhỏ hơn hoặc bằng 480px, chỉ có 1 cột */
  }
}
/* Từng mục sách */
.book-item {

  margin: 10px;
  background-color: #fff;
  border: 2px solid #ddd;
  padding: 10px;
  text-align: center;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Hiệu ứng hover */
.book-item:hover {
  transform: translateY(-5px);
  border-color: #601eb0;
  background-color: #f0f8ff; /* Màu nền nhẹ khi hover */
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  
}

.book-item.selected {
    border-color: #28a745;
    background-color: #e9ffe9; /* Hiệu ứng nhẹ khi được chọn */
    box-shadow: 0 0 12px rgba(40, 167, 69, 0.5); /* Màu xanh lá nhạt */
}
/* Hình ảnh sách */
.book-image {
  
  width: 120px;
  height: 160px;
 
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Giao diện phân trang */
.pagination {
  position: absolute;
  bottom: 35px;
  /* Đảm bảo nút phân trang luôn nằm dưới cùng */
  right: 20px;
  /* Đặt nút phân trang ở góc trái */
  color: black;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.pagination button {
  background: #fff;
  color: #007bff;
  border: 1px solid #007bff;
  padding: 8px 12px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.center-image {
  align-items: center; 
  justify-content: center;
  display: flex;
  
}

.pagination button:hover {
  background: #007bff;
  color: #fff;
}

.pagination span {
  font-weight: bold;
  margin: 0 10px;
}
/* Khung trạng thái */
.status-box {
  margin-top: 10px;
  padding: 5px 10px;
  font-weight: bold;
  border-radius: 5px;
  color: white;
}

.status-borrowed {
  background-color: #f39c12;
}

.status-borrowed-by-me {
  background-color: #3498db;
}

.status-damaged {
  background-color: #e74c3c;
}

.status-available {
  background-color: #2ecc71;
}

</style>

