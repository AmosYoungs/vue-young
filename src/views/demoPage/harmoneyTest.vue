<template>
  <div class="page">
    <hy-header :title="'鸿蒙测试'"></hy-header>
    <div @click="openNative">
      nativeApi调用
    </div>
  </div>
</template>

<script>
export default {
name:'',
components:{},
data(){
return {

};
},

methods:{
   serializeWithFunctions(obj){
      return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'function') {
      return value.toString();
    }
    return value;
    });
    },
  openNative(){
    let params = this.serializeWithFunctions({
      param:{
        url:'https://element-plus.org/zh-CN/component/table'
      }
    })
    window.TpHarmonyNative.openBrowser(params)
  }
},

created(){

},

mounted(){

},

}

</script>
<style lang='less' scoped>
</style>