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
      <div v-if="filteredBooks.length === 0" class="no-results">
        Không tìm thấy sách nào
      </div>
      <div v-for="(book, index) in currentBooks" :key="book.id" class="book-item animate__animated animate__fadeInRight"
        :class="{ 'selected': selectedBookId === book.id }" @click="selectBook(book.id)">
        <img :src="book.image" alt="Book image" class="book-image" />
        <h3>{{ book.title }}</h3>
        <p>Tác giả: {{ book.author }}</p>
        <p>Thể loại: {{ book.category }}</p>
        <p>Năm XB: {{ book.year }}</p>
        <p class="status-box" :class="getStatusClass(book.status)">{{ book.status }}</p>
      </div>
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
      currentPage: 1, // Trang hiện tại
      booksPerPage: 10, // Số lượng sách mỗi trang
      selectedBookId: null, // ID của sách được chọn
      searchQuery: {
        title: "",
        author: "",
        category: "",
      },
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
      return this.books.filter((book) => {
        const titleMatch = book.title.toLowerCase().includes(this.searchQuery.title.toLowerCase());
        const authorMatch = book.author.toLowerCase().includes(this.searchQuery.author.toLowerCase());
        const categoryMatch = book.category.toLowerCase().includes(this.searchQuery.category.toLowerCase());
        return titleMatch && authorMatch && categoryMatch;
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
      this.selectedBookId = bookId; // Đặt ID của sách được chọn
      this.$emit("selectBook", bookId); // Truyền sự kiện lên component cha
    },
    filterBooks() {
      this.currentPage = 1; // Reset trang khi có thay đổi tìm kiếm
    },
    getStatusClass(status) {
      switch (status) {
        case 'Đã mượn':
          return 'status-borrowed';
       
          
        case 'Hư hỏng':
          return 'status-damaged';
        case 'Còn sách':
          return 'status-available';
        default:
        return 'status-borrowed-by-me';
      }
    },
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
  background-color: #e9f7ef; /* Màu nền nhẹ khi có nội dung */
}

/* Đảm bảo các ô tìm kiếm đều có cùng chiều cao */
.search-filter input {
  height: 45px;
}

/* Giao diện danh sách sách */
.book-list {
  background: linear-gradient(to bottom, #f3f4f6, #e0f2fe);
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
  grid-template-columns: repeat(4, 1fr);
  /* Số lượng cột cố định, bạn có thể thay đổi số lượng cột tùy theo màn hình */
  gap: 10px;
  flex-grow: 1;
}

/* Từng mục sách */
.book-item {
  margin: 15px;
  background-color: #fff;
  border: 2px solid #ddd;
  padding: 15px;
  text-align: center;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Hiệu ứng hover */
.book-item:hover {
  transform: translateY(-5px);
  border-color: #007bff;
 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Khi được chọn */
.book-item.selected {
  border-color: #6f42c1;
  border-width: 3px;
}

/* Hình ảnh sách */
.book-image {
  width: 120px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Giao diện phân trang */
.pagination {
  position: absolute;
  bottom: 50px;
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

