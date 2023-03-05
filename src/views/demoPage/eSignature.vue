<template>
  <div class="page">
    <hy-header :title="'电子签名'"></hy-header>
    <ElesignCode ref="signCode" :datas="datas" :pen="pen"></ElesignCode>
    <div class="operate-btns">
      <div @click="clearFn">清空</div>
      <div @click="redoFn">撤销</div>
      <div @click="savePng">保存</div>
    </div>
    <van-popup v-model="showPopup" closeable position="bottom" :style="{ height: '100%' }">
      <img style="width:100%;height:150px" :src="signPng" alt="">
    </van-popup>
  </div>
</template>

<script>
// import vueEsign from "vue-esign";
import ElesignCode from "elesigncode/lib/core/elesigncode.vue"
// 导入我们内置的vue组件
export default {
  components: {
    // vueEsign,
    ElesignCode
  },
  data() {
    return {
      lineWidth: 6,
      datas: {
        "data": [],
        "color": "#333", "lineWidth": 4, "bgColor": "-1", "pen": "default", "writingMaxLine": 20, "writingMinLine": 10
      },
      pen: 'writing',
      showPopup:false,
      signPng:""

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  mounted() {

  },

  methods: {
    savePng(){
      let png = this.$refs.signCode.toPng()
      console.log(png)
      this.showPopup = true
      this.signPng = png
    },
    redoFn(){
      this.$refs.signCode.undo()
    },
    clearFn() {
      this.$refs.signCode.clear()
    },
    clear() {
      this.$refs.esign.reset();
    },

    save() {
      this.$refs.esign
        .generate()
        .then((res) => {
          console.log(res); // base64图片
        })
        .catch((err) => {
          alert(err); // 画布没有签字时会执行这里 'Not Signned'
        });
    },
  },

};
</script>
<style lang="less" scoped>
.sign-area {
  height: calc(100% - 3rem);
}

.footer {
  height: 60px;
  display: flex;

  button {
    flex: 1;
  }
}
.operate-btns{
  display: flex;
  justify-content: center;
  padding: 15px 30px ;
  div{
    flex:1
  }
}
</style>

