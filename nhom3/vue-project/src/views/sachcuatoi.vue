<template>
    <div>
      <Header />
      <!-- Add other content here -->
  
      <!-- Borrowed Books List -->
      <BooksList :books="books" />
      <Footer/>
    </div>
  </template>
  
  <script>
  import Header from "../components/HeaderQuanlySach.vue";
  import BooksList from "../components/sachdamuonlist.vue";
  import Footer from "../components/FooterQuanlySach.vue";
  export default {
    name: "MainView1",
    components: { Header, BooksList ,Footer},
    data() {
      return {
        books: []  // Khởi tạo mảng sách là rỗng
      };
    },
    mounted() {
      // Lấy dữ liệu từ localStorage và parse nó thành đối tượng JavaScript
      const storedBooks = localStorage.getItem("books");
  
      if (storedBooks) {
        // Nếu có dữ liệu trong localStorage, parse và gán vào biến books
        this.books = JSON.parse(storedBooks);
      } 
    
      
    }
  };
  </script>
  