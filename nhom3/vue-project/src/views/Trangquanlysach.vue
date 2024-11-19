<template>
  <div>
    <Header />
    <Sidebar 
      @addBook="navigateToAddBook" 
      @editBook="editBook" 
      @deleteBook="deleteBook" 
      @filterBooks="filterBooks" 
    />
    <div v-if="books.length === 0" class="no-books">
      <p>Hiện không có sách trong danh sách.</p>
    </div>
    <BookList v-else :books="books" @selectBook="selectBook" />
    <Footer />
    
    <!-- Modal Confirm -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ modalMessage }}</h3>
        <div class="modal-buttons">
          <button @click="confirmAction(true)">Yes</button>
          <button @click="confirmAction(false)">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/HeaderQuanlySach.vue";
import Footer from "../components/FooterQuanlySach.vue";
import Sidebar from "../components/Side.vue";
import BookList from "../components/Booklist.vue";
import AddBook from "../components/Addbook.vue";

export default {
  name: "MainView",
  components: { Header, Footer, Sidebar, BookList, AddBook },
  data() {
    return {
      books: [], // Danh sách sách hiện tại
      allBooks: [], // Toàn bộ danh sách sách
      selectedBookId: null, // ID sách đang chọn
      showModal: false, // Điều khiển hiển thị modal
      modalMessage: "", // Thông điệp hiển thị trong modal
      actionToConfirm: null, // Lưu hành động cần xác nhận (edit, delete)
    };
  },
  mounted() {
    // Load dữ liệu từ localStorage hoặc dữ liệu mẫu
    if (!localStorage.getItem("books")) {
      const sampleBooks = [
        { 
          id: 1, 
          title: "Sách 1", 
          author: "Tác giả A", 
          category: "Thể loại X", 
          year: 2020, 
          status: "Còn sách", 
          image: "https://via.placeholder.com/100" 
        },
        { 
          id: 2, 
          title: "Sách 2", 
          author: "Tác giả B", 
          category: "Thể loại Y", 
          year: 2021, 
          status: "Đã mượn", 
          image: "https://via.placeholder.com/100"
        },
        { 
          id: 3, 
          title: "Sách 3", 
          author: "Tác giả C", 
          category: "Thể loại Z", 
          year: 2019, 
          status: "Hư hỏng", 
          image: "https://via.placeholder.com/100"
        },
      ];
      localStorage.setItem("books", JSON.stringify(sampleBooks));
    }
    this.books = JSON.parse(localStorage.getItem("books"));
    this.allBooks = [...this.books]; // Lưu toàn bộ sách
  },
  methods: {
    navigateToAddBook() {
      window.location.href = '/trangthemsach';
    },
    editBook() {
      if (this.selectedBookId !== null) {
        this.modalMessage = "Bạn có muốn thay đổi trạng thái sách này?";
        this.actionToConfirm = this.confirmEditBook;
        this.showModal = true;
      } else {
        this.modalMessage = "Vui lòng chọn sách để sửa trạng thái.";
        this.showModal = true;
      }
    },
    deleteBook() {
      if (this.selectedBookId !== null) {
        this.modalMessage = "Bạn có chắc muốn xóa sách này không?";
        this.actionToConfirm = this.confirmDeleteBook;
        this.showModal = true;
      } else {
        this.modalMessage = "Vui lòng chọn sách để xóa.";
        this.showModal = true;
      }
    },
    confirmAction(confirm) {
      if (confirm && this.actionToConfirm) {
        this.actionToConfirm();
      }
      this.showModal = false; // Đóng modal
      this.actionToConfirm = null; // Reset hành động
    },
    confirmEditBook() {
      const bookIndex = this.books.findIndex(book => book.id === this.selectedBookId);
      if (bookIndex !== -1) {
        this.books[bookIndex].status = 
          this.books[bookIndex].status === "Còn sách" ? "Đã mượn" : "Còn sách";
        localStorage.setItem("books", JSON.stringify(this.books));
        alert("Trạng thái sách đã được cập nhật!");
      }
    },
    confirmDeleteBook() {
      this.books = this.books.filter(book => book.id !== this.selectedBookId);
      this.allBooks = [...this.books]; // Cập nhật toàn bộ danh sách
      this.selectedBookId = null;
      localStorage.setItem("books", JSON.stringify(this.books));
      alert("Sách đã được xóa!");
    },
    filterBooks(status) {
      // Lọc sách theo trạng thái
      if (status === "all") {
        this.books = [...this.allBooks]; // Hiển thị toàn bộ sách
      } else {
        this.books = this.allBooks.filter(book => {
          if (status === "new") return book.status === "Còn sách";
          if (status === "borrowed") return book.status === "Đã mượn";
          if (status === "damaged") return book.status === "Hư hỏng";
        });
      }
    },
    selectBook(bookId) {
      this.selectedBookId = bookId;
    },
    addBook(newBook) {
      const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
      newBook.id = uniqueId; // Gán ID duy nhất
      this.books.push(newBook);
      this.allBooks.push(newBook); // Cập nhật toàn bộ sách
      localStorage.setItem("books", JSON.stringify(this.books));
      alert("Sách đã được thêm!");
    },
  },
};
</script>

<style scoped>
.no-books {
  text-align: center;
  font-size: 18px;
  margin: 20px 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 300px;
}

.modal-buttons {
  margin-top: 20px;
}

.modal-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-buttons button:hover {
  background-color: #3700b3;
}

.modal-buttons button:focus {
  outline: none;
  box-shadow: 0 0 5px 2px #80d4ff;
}
</style>
