<template>
  <div class="book-list">
    <div class="book-grid">
      <!-- Hiển thị sách theo dạng lưới -->
      <div
        v-for="(book, index) in currentBooks"
        :key="book.id"
        class="book-item"
        :class="{ 'selected': selectedBookId === book.id }"
        @click="selectBook(book.id)"
      >
        <img :src="book.image" alt="Book image" class="book-image" />
        <h3>{{ book.title }}</h3>
        <p>Tác giả: {{ book.author }}</p>
        <p>Thể loại: {{ book.category }}</p>
        <p>Năm XB: {{ book.year }}</p>
        <p>Tình trạng: {{ book.status }}</p>
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
      booksPerPage: 8, // Số lượng sách mỗi trang
      selectedBookId: null, // ID của sách được chọn
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.books.length / this.booksPerPage);
    },
    currentBooks() {
      const start = (this.currentPage - 1) * this.booksPerPage;
      const end = start + this.booksPerPage;
      return this.books.slice(start, end);
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
  },
};
</script>

<style scoped>
/* Giao diện danh sách sách */
.book-list {
  margin-left: 220px;
  padding: 20px;
  max-height: calc(100vh - 100px); /* Chiều cao tối đa để tránh kéo dài khi có ít sách */
  overflow-y: auto;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef); /* Gradient nền */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Đảm bảo rằng nội dung không bị dãn đều ra */
}


/* Grid hiển thị sách */
.book-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Số lượng cột cố định, bạn có thể thay đổi số lượng cột tùy theo màn hình */
  gap: 15px;
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
  text-align: end;
  position:sticky;
  color: white;
  border-radius: 5px;
  color:black;
  
}

/* Nút phân trang */
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

/* Văn bản phân trang */
.pagination span {
  font-weight: bold;
  margin: 0 10px;
}

</style>
