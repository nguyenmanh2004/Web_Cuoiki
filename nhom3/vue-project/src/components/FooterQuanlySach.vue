<template>
  <footer class="footer">
    <p>&copy; 2024 Thư Viện Sách. Tất cả các quyền được bảo lưu.</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.footer {
  background-color: #6200ea; /* Màu nền */
  color: white; /* Màu chữ */
  text-align: center; /* Canh giữa nội dung */
  padding: 10px 0; /* Khoảng cách trên và dưới */
  position: fixed; /* Đưa footer xuống dưới */
  bottom: 0; /* Canh dưới */
  
  width: 100%;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* Hiệu ứng đổ bóng */
  z-index: 10; /* Đảm bảo footer nổi lên trên nội dung khác */
}

</style>