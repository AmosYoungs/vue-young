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
  openNative(){
    console.log(window)
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