<template>
  <div>Home</div>
</template>

<script>
export default {
  name: "homeView",

  mounted() {
    console.log("Usuário atual:", this.$store.getters.currentUser);
  },
};
</script>
