<!--
 * @Description: 首页
 * @Author: amos
 * @Date: 2022-07-26 23:46:18
 * @LastEditTime: 2022-12-17 22:36:07
-->

<template>
  <div class="hy-w-100">
    <van-swipe :autoplay="3000" :height="100" >
        <!-- v-for="(image, index) in images" -->
      <van-swipe-item  style="" v-for="(item,index) in 10" :key="index">
        <div style="width:100%;height:50px">{{item}}</div>
        <!-- <img style="height:100px;width:100%" v-lazy="image" /> -->
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
// import { Swipe, SwipeItem ,Lazyload} from "vant";
// import Vue from 'vue';
// Vue.use(Swipe);
// Vue.use(SwipeItem)
// Vue.use(Lazyload);
export default {
  name: "index",
  components: {
  },
  data() {
    return {
        images:[
        //  require("../../assets/img/tpHealthInsurancePlan_bg.jpg"),
        //  require("../../assets/img/tpHealthInsurancePlan_bg2.jpg")
        ]
    };
  },
  mounted(){
    console.log(4444)
    console.log(this.images)
  }
};
</script>
