<template>
  <div id="app">
    <router-view class="Router tp-flex tp-Page"></router-view >
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.Router{
  transition: all .2s ease-in-out;
}
</style>
