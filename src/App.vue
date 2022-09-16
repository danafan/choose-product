<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    created() {
      let domain = 'http://img.92nu.com/';
      this.$store.commit('setDomain',domain);
      localStorage.setItem("domain",domain);
    },
    methods: {

    },
  };
</script>