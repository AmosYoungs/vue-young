<template>
    <div>
        <div class="sign-area">
             <ElesignCode ref="signCode"  :pen="pen"/>  
        </div>
        <div class="footer">
            <button @click="clear">清空</button>
             <button @click="undo">撤销</button>
              <button @click="save">保存</button>
        </div>
    </div>
</template>

<script>

import ElesignCode from  "elesigncode/lib/core/elesigncode.vue"    
export default {
    
    components: {
        ElesignCode
    },
    data() {
        
        return {
            pen:'default'
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    
    methods: {
        clear(){
            this.$refs.signCode.clear();
        },
        undo(){
            this.$refs.signCode.undo();
        },
        save(){
           let img =  this.$refs.signCode.toPng();
           console.log(img)
        }
        
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        
    },
    beforeRouteEnter(to, from, next) {
        next(vm=>{
            console.log('e-signature')
        })
    }, 
    }
</script>
<style lang="less" scoped>
.sign-area{
    height: calc(100% - 3rem);
}
    .footer{
        height: 3rem;
        display: flex;
        button { 
            flex:1
        }
    }
</style>