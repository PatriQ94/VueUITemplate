<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png" class="logo"/>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  box-sizing: border-box;
}

.container{
max-width: 600px;
margin : 0 auto;
}

.logo{
display:block;
margin: 20px auto;
height: 75px;
}

</style>
