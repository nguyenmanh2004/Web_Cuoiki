<template>
    <div >
        <Header/>
      <StatisticsChart />
     
    </div>
  </template>
  
  <script>
  import StatisticsChart from "../components/StatisticChart.vue"
  import Header from "../components/HeaderQuanlySach.vue";
  export default {
    name: 'thongke',
    components: {
      StatisticsChart,
      Header,
    }
  };
  </script>
  