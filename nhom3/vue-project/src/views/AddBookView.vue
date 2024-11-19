<template>
    <div>
      <Header />
      <AddBook @addBook="handleAddBook" />
     
    </div>
  </template>
  
  <script>
  import Header from "../components/HeaderQuanlySach.vue";
  
  import AddBook from "../components/Addbook.vue";
  
  export default {
    name: "AddBookView",
    components: { Header, AddBook },
    methods: {
      handleAddBook(newBook) {
        // Lấy danh sách sách từ localStorage, nếu có
        let books = JSON.parse(localStorage.getItem("books")) || [];
  
        // Thêm sách mới vào danh sách
        books.push(newBook);
  
        // Lưu lại danh sách sách đã cập nhật vào localStorage
        localStorage.setItem("books", JSON.stringify(books));
  
        // Điều hướng về trang quản lý sách
        window.location.href = '/Trangquanlisach';
      },
    },
  };
  </script>
  
  <style>
  .add-book {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    overflow-y: auto; /* Đảm bảo nội dung dài có thể cuộn */
    max-height: 80vh; /* Giới hạn chiều cao */
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input,
  select,
  button {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    margin-top: 5px;
  }
  
  button {
    background-color: #6200ea;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #4500b0;
  }
  
  .image-preview {
    margin-top: 10px;
    text-align: center;
  }
  
  .image-preview img {
    max-width: 100%;
    max-height: 200px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  </style>
  