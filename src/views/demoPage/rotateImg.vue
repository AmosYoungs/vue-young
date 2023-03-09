<template>
  <div class="page ">
    <div class="sign-image ">
      <img
        id="img"
        src="https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
        alt=""
      />
    </div>
    <div class="myCanvas">
        <canvas id="myCanvas"></canvas>
    </div>
    <div class="operate hy-flex"  > 
        <div  class="flex-1 tp-ac" @click="rotateImg">向右旋转90</div>
        <div  class="flex-1 tp-ac" @click="drawImage">获取图片</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      roDeg: 0,
      context:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},

  methods: {
    drawImage(){
        let img = document.getElementById('img')
        let _canvas = document.getElementById('myCanvas')
        if(!this.context){
            this.context = _canvas.getContext('2d')
        }
        let degree = this.getDegree(this.roDeg);
        console.log(degree)
        // this.context.clearRect(0, 0, 300, 120)
        if(degree==0){
            this.context.drawImage(img, 0, 0,300,120);
        }else if(degree==90){
             this.context.translate(150,60)
            this.context.rotate(90 * Math.PI / 180);
            // context.drawImage(img, 0, -300,120,300);
            this.context.drawImage(img,-60,-150,120,300 );
        }else if(degree==180){
           
            this.context.translate(150,60)
            this.context.rotate(180 * Math.PI / 180);
            this.context.drawImage(img,-150,-60,300,120 );
        }
        else if(degree==270){
            this.context.translate(150,60)
            this.context.rotate(270 * Math.PI / 180);
            this.context.drawImage(img, -60, -150,120,300);
        }
        setTimeout(()=>{
            console.log(_canvas.toDataURL("image/png"))
        })
        


    },
    getDegree(deg){
      let abs = Math.abs(deg);
      console.log('abs:'+abs);
      let yvshu = abs % 360;
      console.log('yvshu:'+yvshu);
      if (deg >= 0) {
        return yvshu;
      } else {
        if (yvshu == 0) {
            return 0;
        } else {
            return 360+(0-yvshu);
        }
      }
    },
    rotateImg() {
      this.roDeg += 90;
      let box = document.getElementById("img");
      box.style.transform = "rotateZ(" + this.roDeg + "deg)";
      box.style.transitionDuration = "500ms";
      box.style.transitionTimingFunction = "linear";
    },
  },
};
</script>
<style  lang="less" scoped>
.sign-image {
  width: 300px;
  height: 120px;
  margin-top: 90px;
  img {
    width: 100%;
    height: 100%;
  }
}
.myCanvas{
    width: 300px;
    height: 120px;
    margin-top: 100px;
    border: 1px solid #000;
}
.operate{
    width: 100%;
    position: absolute;
    bottom: 0;
  }
</style>