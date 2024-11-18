<template>
    <div>
      <HearderSach />
      <BodySach />
      <FooterSach />
    </div>
  </template>
  
  <script>
  import HearderSach from "@/components/HearderSach.vue";
  import FooterSach from "@/components/FooterSach.vue";
  import BodySach from "@/components/BodySach.vue";
  
  export default {
    components: {
      HearderSach,
      FooterSach,
      BodySach,
    },
  };
  </script>
  
  <style>
  /* Reset toàn bộ */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
  }
  </style>
  