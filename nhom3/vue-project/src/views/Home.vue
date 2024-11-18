<template>
  <div>

    <MostBorrowedBooks />
    <TopRatedBooks />
    <BlogSection />
    <FooterMain/>

  </div>
</template>
 
<script>
import MostBorrowedBooks from '../components/MostBorrowedBooks.vue';
import TopRatedBooks from '../components/TopRatedBooks.vue';
import BlogSection from '../components/BlogSection.vue';
import FooterMain from '../components/FooterMain.vue';

export default {
  components: {
    MostBorrowedBooks,
    TopRatedBooks,
    BlogSection,
    FooterMain,
  },
};
</script>
