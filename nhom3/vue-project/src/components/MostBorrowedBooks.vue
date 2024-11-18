<template>
  <div class="container my-4">
    <h2 class="mb-4">Các Sách Được Mượn Nhiều Nhất</h2>
    <div class="row">
      <div class="col-md-3" v-for="book in books" :key="book.id">
        <div class="card">
          <img :src="book.image" class="card-img-top" alt="Book Cover">
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">by {{ book.author }}</p>
            <p>Số lượt mượn: {{ book.borrowed }}</p>
            <button class="btn" :class="book.available ? 'btn-success' : 'btn-danger'">
              {{ book.available ? 'Còn Sách' : 'Hết Sách' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [
        { id: 1, title: 'Sống Với Đam Mê', author: 'Nguyễn Nhật Ánh', borrowed: 250, available: true, image: 'path/to/image1.jpg' },
        { id: 2, title: 'Chuyến Tàu Cuối Cùng', author: 'Haruki Murakami', borrowed: 315, available: false, image: 'path/to/image2.jpg' },
        // Thêm sách khác...
      ],
    };
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>
