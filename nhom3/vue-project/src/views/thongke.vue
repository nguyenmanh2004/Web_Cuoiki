<template>
    <div >
        <Header/>
      <StatisticsChart />
    
     <Footer/>
    </div>
  </template>
  
  <script>
  import StatisticsChart from "../components/StatisticChart.vue"
  import Header from "../components/HeaderQuanlySach.vue";
  import Footer from "../components/FooterQuanlySach.vue";
  
  export default {
    name: 'thongke',
    components: {
      StatisticsChart,
      Header,
      Footer,
      
    }
  };
  </script>
  