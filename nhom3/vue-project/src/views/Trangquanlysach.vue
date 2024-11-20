<template>
  <div>
    <!-- Tutorial Panel -->
    <div v-if="isTutorialVisible" class="tutorial-overlay">
      <div class="tutorial-box">
        <!-- Character Image -->
        <div class="character-image">
          <img src="../assets/anime.gif" alt="Character" />
        </div>

        <!-- Chatbox -->
        <div class="chat-box">
          <div class="chat-message">
            <p>Chào mừng bạn đến với hệ thống quản lý sách! Đây là nơi bạn có thể thêm, sửa và xóa sách.</p>
            <p>Nhấn vào nút dưới để bắt đầu.</p>
          </div>
        </div>

        <!-- Close Button -->
        <button @click="startUsingApp" class="btn-start">Bắt đầu</button>
      </div>
    </div>

    <!-- Main Content -->
    <Header />
    <Sidebar @addBook="showAddBookPanel" @editBook="editBook" @deleteBook="deleteBook" @borrowBook="borrowBook" @filterBooks="filterBooks" />

    <!-- No Books Message -->
    <div v-if="books.length === 0" class="no-books">
      <p>Hiện không có sách trong danh sách.</p>
    </div>

    <!-- Book List -->
    <BookList v-else :books="books" @selectBook="selectBook" />

    <!-- Add Book Panel -->
    <div v-if="isAddBookPanelVisible" class="overlay">
      <AddBook @addBook="addBook" @closePanel="closeAddBookPanel" />
    </div>

    <!-- Edit Book Panel -->
    <div v-if="isEditBookPanelVisible" class="overlay">
      <EditBook :book="selectedBook" @saveEdit="saveEditBook" @closeEdit="closeEditBookPanel" />
    </div>

    <Footer />

    <!-- Modal Confirm -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div v-if="modalMessage === 'Vui lòng chọn sách để sửa.' || modalMessage === 'Vui lòng chọn sách để xóa.' || modalMessage === 'Vui lòng chọn sách để mượn.'" class="modal-image">
          <img src="../assets/noti.gif" alt="Alert Image" />
        </div>
        <h3>{{ modalMessage }}</h3>
        <div class="modal-buttons">
          <button @click="confirmAction">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/HeaderQuanlySach.vue";
import Footer from "../components/FooterQuanlySach.vue";
import Sidebar from "../components/Sidebar.vue";
import BookList from "../components/Booklist.vue";
import AddBook from "../components/AddBook.vue";
import EditBook from "../components/Editbook.vue";

export default {
  name: "MainView",
  components: { Header, Footer, Sidebar, BookList, AddBook, EditBook },
  data() {
    return {
      books: [],
      allBooks: [],
      selectedBookId: null,
      showModal: false,
      modalMessage: "",
      actionToConfirm: null,
      isAddBookPanelVisible: false,
      isEditBookPanelVisible: false,
      selectedBook: null,
      isTutorialVisible: true,
    };
  },
  mounted() {
    if (!localStorage.getItem("books")) {
      const sampleBooks = [
        { id: 1, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 2, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 3, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
      ];
      localStorage.setItem("books", JSON.stringify(sampleBooks));
    }
    this.books = JSON.parse(localStorage.getItem("books"));
    this.allBooks = [...this.books];
  },
  methods: {
    showAddBookPanel() {
      this.isAddBookPanelVisible = true;
    },
    closeAddBookPanel() {
      this.isAddBookPanelVisible = false;
    },
    editBook() {
      if (this.selectedBookId !== null) {
        const book = this.books.find(b => b.id === this.selectedBookId);
        if (book) {
          this.selectedBook = { ...book };
          this.isEditBookPanelVisible = true;
        }
      } else {
        this.modalMessage = "Vui lòng chọn sách để sửa.";
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
    borrowBook() {
      if (this.selectedBookId !== null) {
        const book = this.books.find(b => b.id === this.selectedBookId);
        if (book && book.status !== "Đã mượn") {
          const currentDate = new Date().toLocaleDateString(); // Lấy ngày hiện tại
          this.modalMessage = `Bạn có chắc muốn mượn sách này? Ngày mượn: ${currentDate}`;
          this.actionToConfirm = this.confirmBorrowBook;
          this.showModal = true;
        } else {
          this.modalMessage = "Sách đã được mượn hoặc không có trong kho.";
          this.showModal = true;
        }
      } else {
        this.modalMessage = "Vui lòng chọn sách để mượn.";
        this.showModal = true;
      }
    },
    saveEditBook(updatedBook) {
      const bookIndex = this.books.findIndex(book => book.id === updatedBook.id);
      if (bookIndex !== -1) {
        this.books[bookIndex] = updatedBook;
        localStorage.setItem("books", JSON.stringify(this.books));
        alert("Sách đã được sửa!");
        this.isEditBookPanelVisible = false;
      }
    },
    confirmDeleteBook() {
      this.books = this.books.filter(book => book.id !== this.selectedBookId);
      this.allBooks = [...this.books];
      this.selectedBookId = null;
      localStorage.setItem("books", JSON.stringify(this.books));
      alert("Sách đã được xóa!");
    },
    confirmBorrowBook() {
  const bookIndex = this.books.findIndex(book => book.id === this.selectedBookId);
  if (bookIndex !== -1) {
    const currentDate = new Date(); // Lấy ngày hiện tại dưới dạng đối tượng Date

    // Lưu ngày đăng ký vào thuộc tính mới của sách
    this.books[bookIndex].status = `Tôi đã mượn ngày: ${currentDate.toLocaleDateString()}`;
    this.books[bookIndex].registerDate = currentDate; // Thêm ngày đăng ký vào sách

    // Lưu lại vào localStorage
    localStorage.setItem("books", JSON.stringify(this.books));

    alert("Sách đã được mượn!");
  }

  // Deselect book after confirming
  this.selectedBookId = null;
},
    filterBooks(status) {
      if (status === "all") {
        this.books = [...this.allBooks];
      } else {
        this.books = this.allBooks.filter(book => book.status === status);
      }
    },
    selectBook(bookId) {
      this.selectedBookId = bookId;
    },
    addBook(newBook) {
      const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
      newBook.id = uniqueId;
      this.books.push(newBook);
      this.allBooks.push(newBook);
      localStorage.setItem("books", JSON.stringify(this.books));
      alert("Sách đã được thêm!");
      this.closeAddBookPanel();
    },
    startUsingApp() {
      this.isTutorialVisible = false;
    },
    confirmAction() {
      if (this.actionToConfirm) {
        this.actionToConfirm();
      }
      this.showModal = false;
    }
  },
};
</script>



<style scoped>
/* Styles for various components */

/* Tutorial Panel */
.tutorial-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.tutorial-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.character-image img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.chat-box {
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.chat-message p {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.btn-start {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-start:hover {
  background-color: #0056b3;
}

/* Modal */
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
  max-width: 90%;
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

.no-books {
  text-align: center;
  font-size: 18px;
  margin: 20px 0;
}

/* Overlay for Add Book Panel */
.overlay {
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
.modal-image img {
  max-width: 150px;  /* Set max width */
  height: auto;      /* Maintain aspect ratio */
  margin-bottom: 20px; /* Space between image and text */
}

</style>
