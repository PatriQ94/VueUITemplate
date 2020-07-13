<template>
  <v-container></v-container>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("logout").then(response => {
      this.$router.push({ name: "login" });
      return response;
    });
  }
};
</script>