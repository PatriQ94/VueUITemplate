<template>
  <div id="app">
      <ul class="nav">
            <li><router-link :to="{ name : 'home'}">Home</router-link></li>
            <li><router-link :to="{ name : 'about'}">About</router-link></li>
            <li><router-link :to="{ name : 'login'}">Login</router-link></li>
            <li><router-link :to="{ name : 'register'}">Register</router-link></li>
      </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 24px;
  color: #2c3e50;
  height: 100vh;
}

.flex-center {
    display: flex;
    justify-content: center;
}

.nav {
    display: flex;
    list-style: none;
    padding: 10px 0;
    margin: 0;
    justify-content: flex-end;
    background: #f5f8fa;
    border-bottom: 1px solid lightgray;
    margin-bottom: 24px;
}

.nav a {
    color: #636B6F;
    padding: 0 25px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: .1rem;
    text-decoration: none;
    text-transform: uppercase;
}

</style>