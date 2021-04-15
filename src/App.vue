<template>
  <div  class="bg-sage font-rubik flex justify-end divide-x-4 rounded-lg">
    <router-link to="/" class="nav">Home</router-link>
    <router-link to="/add" class="nav">Add Card</router-link>
    <router-link to="/creator" class="nav">Creator Info</router-link>
  </div>
  <router-view/>
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
