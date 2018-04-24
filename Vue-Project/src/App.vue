<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ul>
      <li>my name is list</li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
        .router-link-active{
            color:orange;
            font-size: 20px;
        }
</style>
