<template>
  <div class="container my-4">
    <h2 class="mb-4">Từ Blog Của Chúng Tôi</h2>
    <div class="row">
      <div class="col-md-3" v-for="post in posts" :key="post.id">
        <div class="card">
          <img src="../assets/book.jpg" class="card-img-top" alt="Blog Image">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.excerpt }}</p>
            <a :href="post.link" class="btn btn-primary">Đọc tiếp</a>
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
      posts: [
        { id: 1, title: 'Bí Quyết Học Tiếng Anh Hiệu Quả', excerpt: 'Bạn có muốn nâng cao kỹ năng tiếng Anh...', link: '/blog/1' },
        { id: 2, title: 'Công Thức Nấu Ăn Truyền Thống Việt Nam', excerpt: 'Khám phá hương vị quê hương...', link: '/blog/2' },
        // Thêm blog khác...
      ],
    };
  },
};
</script>
