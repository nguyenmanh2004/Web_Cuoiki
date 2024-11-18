<template>
  <div class="container my-4">
    <h2 class="mb-4">Sách Được Đánh Giá Cao Nhất</h2>
    <div class="row">
      <div class="col-md-3" v-for="book in books" :key="book.id">
        <div class="card">
          <img :src="book.image" class="card-img-top" alt="Book Cover">
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">Tác giả: {{ book.author }}</p>
            <p>Đánh giá: <span class="text-warning">★</span> {{ book.rating }}</p>
            <button class="btn" :class="book.available ? 'btn-success' : 'btn-danger'">
              {{ book.available ? 'Mượn Sách' : 'Hết Sách' }}
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
        { id: 1, title: 'Bí Mật Của Các Vùng Nhiệt Đới', author: 'Becky Albertalli', rating: 4.8, available: true, image: 'path/to/image1.jpg' },
        { id: 2, title: 'Cuộc Sống Dưới Biển', author: 'Jordan B. Peterson', rating: 4.7, available: false, image: 'path/to/image2.jpg' },
        // Thêm sách khác...
      ],
    };
  },
};
</script>
