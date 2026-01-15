<template>
  <div id="app">
    <keep-alive>
      <router-view class="Router hy-Page"></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  methods: {
    serializeWithFunctions(obj){
      return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'function') {
      return value.toString();
    }
    return value;
  });
    }
  },
  mounted() {
    console.log('mounted')
    window.HarmonyEvent = (state) => {
      console.log('App state changed:', state);
      if (state === 'start') {
        // 应用启动处理
        console.log('start')
      } else if (state === 'resume') {
        // 应用后台唤醒的处理
        console.log('resume');
      }
    };
    let params = this.serializeWithFunctions({
      callback: function (res){
        console.log('getAppVersion',res)
      }
    })
    window.TpHarmonyNative.getAppVersion(params)
  },
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.Router {
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
