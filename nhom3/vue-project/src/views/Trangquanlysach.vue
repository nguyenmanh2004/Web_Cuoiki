<template>
  <div>
    <!-- Tutorial Panel -->
    <div v-if="isTutorialVisible" class="tutorial-overlay animate__animated animate__fadeIn">
      <div class="tutorial-box animate__animated animate__bounceIn">
        <!-- Character Image -->
        <div class="character-image">
          <img src="../assets/anime.gif" alt="Character" />
        </div>

        <!-- Chatbox -->
        <div class="chat-box">
          <div class="chat-message">
            <p>Chào mừng bạn đến với thư viện sách ! Đây là nơi bạn có thể xem và mượn nhiều loại sách hay.</p>
          <p>Nhấn vào nút dưới để bắt đầu.</p>
          </div>
        </div>

        <!-- Close Button -->
        <button @click="startUsingApp" class="btn-start animate__animated animate__pulse">Bắt đầu</button>
      </div>
    </div>

    <!-- Main Content -->
    <Header />
    <button class="toggle-sidebar-btn" @click="toggleSidebar">
      <i :class="isSidebarVisible ? 'fas fa-times' : 'fas fa-bars'"></i> 
      {{ isSidebarVisible ? 'Đóng Sidebar' : 'Mở Sidebar' }}
    </button>
    <Sidebar 
      v-if="isSidebarVisible" 
      @addBook="showAddBookPanel" 
      @editBook="editBook" 
      @deleteBook="deleteBook" 
      @borrowBook="borrowBook" 
      @filterBooks="filterBooks" 
    />
    <div v-if="!isSidebarVisible" class="sidebar-placeholder"></div>

    <!-- No Books Message -->
    <div v-if="books.length === 0" class="no-books">
      <p>Hiện không có sách trong danh sách.</p>
      <img src="https://i.pinimg.com/originals/fb/77/1c/fb771c77975d0914afd5c382595d6ea6.gif " width="300px">
    </div>

    <!-- Book List -->
    <BookList v-else :books="books" @selectBook="selectBook" />

    <!-- Add Book Panel -->
    <div v-if="isAddBookPanelVisible" class="overlay animate__animated animate__fadeIn">
      <AddBook @addBook="addBook" @closePanel="closeAddBookPanel" />
    </div>

    <!-- Edit Book Panel -->
    <div v-if="isEditBookPanelVisible" class="overlay animate__animated animate__fadeIn">
      <EditBook :book="selectedBook" @saveEdit="saveEditBook" @closeEdit="closeEditBookPanel" />
    </div>

    <Footer />

    <!-- Modal Confirm -->
    <div v-if="showModal" class="modal-overlay animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <div v-if="modalMessage === 'Vui lòng chọn sách để sửa.' || modalMessage === 'Vui lòng chọn sách để xóa.' || modalMessage === 'Vui lòng chọn sách để mượn.'" class="modal-image">
          <img src="../assets/noti.gif" alt="Alert Image" />
        </div>
        <h3>{{ modalMessage }}</h3>
        <div class="modal-buttons">
          <button @click="confirmAction">OK</button>
        </div>
      </div>
    </div>

    <!-- Success Panel -->
    <div v-if="showSuccessPanel" class="modal-overlay animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3>{{ successMessage }}</h3>
        <div class="modal-buttons">
          <button @click="closeSuccessPanel">OK</button>
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
      isSidebarVisible: true,
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
      showSuccessPanel: false,  // New property to show success panel
      successMessage: "",       // Message for success panel
    };
  },
  mounted() {
    if (!localStorage.getItem("books")) {
      const sampleBooks = [
        { id: 1, title: "Doremon tập 3", author: "FuJIKO F FuJIO ", category: "Truyện tranh", year: 2022, status: "Còn sách", image: "https://i.pinimg.com/474x/87/2e/26/872e26dd3703cf629c656720b8695868.jpg" },
        { id: 2, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://i.pinimg.com/474x/22/fc/4c/22fc4c72895d331f392bd02427893b8f.jpg" },
        { id: 3, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
        { id: 4, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 5, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 6, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
        { id: 7, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 8, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 9, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
        { id: 10, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 11, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 12, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
        { id: 13, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 14, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 15, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
        { id: 16, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 17, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 18, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
        { id: 19, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 10, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 11, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
        { id: 12, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 13, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 14, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
        { id: 15, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 16, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 17, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
        { id: 18, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 19, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 20, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
        { id: 21, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 22, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 23, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
        { id: 24, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 25, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 26, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
        { id: 27, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 28, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 29, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
        { id: 30, title: "Sách 1", author: "Tác giả A", category: "Thể loại X", year: 2020, status: "Còn sách", image: "https://via.placeholder.com/100" },
        { id: 31, title: "Sách 2", author: "Tác giả B", category: "Thể loại Y", year: 2021, status: "Đã mượn", image: "https://via.placeholder.com/100" },
        { id: 32, title: "Sách 3", author: "Tác giả C", category: "Thể loại Z", year: 2019, status: "Hư hỏng", image: "https://via.placeholder.com/100" },
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
    closeEditBookPanel() {
      this.isEditBookPanelVisible = false;
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
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
    addBook(newBook) {
      const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
      newBook.id = uniqueId;
      this.books.push(newBook);
      this.allBooks.push(newBook);
      localStorage.setItem("books", JSON.stringify(this.books));
     
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
        if (book && book.status === "Còn sách" ) {
          const currentDate = new Date().toLocaleDateString();
          this.modalMessage = `Bạn có chắc muốn mượn sách này? Ngày mượn: ${currentDate}`;
          this.actionToConfirm = this.confirmBorrowBook;
          this.showModal = true;
        } else {
          this.modalMessage = "Sách đã được mượn hoặc bị hỏng vui lòng chọn sách khác.";
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
        const currentDate = new Date();
        this.books[bookIndex].status = `Tôi đã mượn ngày: ${currentDate.toLocaleDateString()}`;
        this.books[bookIndex].registerDate = currentDate;
        localStorage.setItem("books", JSON.stringify(this.books));

        // Show the success panel with message
        this.successMessage = "Cảm ơn bạn đã mượn sách! Chúc bạn một ngày vui vẻ.";
        this.showSuccessPanel = true;
      }
      this.selectedBookId = null;
    },
    filterBooks(status) {
      if (status === "all") {
        this.books = [...this.allBooks];
      } else {
        this.books = this.allBooks.filter(book => {
          if (status === "new") return book.status === "Còn sách";
          if (status === "borrowed") return book.status === "Đã mượn";
          return book.status === "Hư hỏng";
        });
      }
    },
    selectBook(bookId) {
      this.selectedBookId = bookId;
    },
    closeSuccessPanel() {
      this.showSuccessPanel = false;
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
  }
};
</script>



<style scoped>
/* Styles for various components */

/* Tutorial Panel */
/* Tutorial Overlay */
.tutorial-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75); /* Darker background overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px; /* Add padding for mobile devices */
}

/* Tutorial Box */
.tutorial-box {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Softer shadow */
 
  position: relative; /* For positioning of child elements */
}

/* Character Image */
.character-image {
  margin-bottom: 20px;
}

.character-image img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Chatbox */
.chat-box {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05); /* Inner shadow for depth */
  margin-bottom: 25px;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

.chat-message p {
  margin: 10px 0;
  color: #444; /* Slightly darker text */
}

/* Start Button */
.btn-start {
  padding: 10px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  
}

.btn-start:hover {
  background-color: #0056b3;
}

/* Fade-in Animation */



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
