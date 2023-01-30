<template>
  <div>
    <div class="sign-area">
      <vue-esign
        ref="esign"
        id="signCanvas"
        
        :lineWidth="lineWidth"
      />
      <!-- vue3 -->
    </div>
    <div class="footer">
      <button @click="clear">清空</button>

      <button @click="save">保存</button>
    </div>
  </div>
</template>

<script>
import vueEsign from "vue-esign";
export default {
  components: {
    vueEsign,
  },
  data() {
    return {
      lineWidth: 6,
     
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  mounted(){
  document.querySelector('#signCanvas').style.height = document.documentElement.clientHeight - 60;
console.log(document.querySelector('#signCanvas').style.height,document.documentElement.clientHeight - 60)
document.querySelector('#signCanvas').style.width = document.documentElement.clientWidth;

  },

  methods: {
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
</style>