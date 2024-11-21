<template>
    <div >
       <Header />
      <info />
     <Footer />
    </div>
  </template>
  
  <script>
  
  import info from "../components/info.vue"
  import Header from "../components/HeaderQuanlySach.vue";
  import Footer from "../components/FooterQuanlySach.vue";
  

  export default {
    name: 'thongtincanhan',
    components: {
      info,
      Header,
      Footer,
    }
  };
  </script>
  