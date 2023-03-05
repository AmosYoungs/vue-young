<template>
  <div id="app">
    <keep-alive>
    <router-view class="Router hy-Page"></router-view >
    </keep-alive>
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
.hy-Page {
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
    flex-direction: column;
}
</style>
