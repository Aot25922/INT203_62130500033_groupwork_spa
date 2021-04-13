<template>
  <div id="nav" class="bg-gray-200">
    <router-link to="/">Home</router-link> |
    <router-link to="/add">Add Card</router-link>
    <router-link to="/creator">Creator Info</router-link>
  </div>
  <router-view />
</template>

<script>

export default {
  name: "App",
  provide(){
    return{
     url:this.url
    }
  },
  data(){
    return{
      url: "http://localhost:5000/cardLists"
    }
  },
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
</style>
