

<template>

    <div class="page">
         <hy-header :showBack="false" :title="'Code工厂'"></hy-header>
        <hy-scroll >
            <div v-for="(item,index) in demoList" :key="index" @click="goToPage(item)">{{item.name}}</div>
            <div @click="testHarmoneyApi">鸿蒙测试</div>
        </hy-scroll>
        
    </div>
</template>

<script>
import Vue from 'vue';
import { List,Cell} from 'vant';

Vue.use(List);
Vue.use(Cell);

export default {
    name: 'index',
    components: {

    },
    data() {
        return {
            demoList:[{
                name:'拍照测试',
                routerName:'showCamera'
            },
            {
                name:'电子签名',
                routerName:'eSignature'
            },
            {
                name:'图片旋转',
                routerName:'rotateImg'
            },
            {
                name:'HaiBaChiOrder',
                routerName:'HaiBaChiOrder'
            },
            {
                name:'鸿蒙测试',
                routerName:'harmoneyTest'
            }
            
            ]
        }
    },
    methods:{
        goToPage(item){
            console.log(item)
            this.$router.push({name:item.routerName})
        },
        testHarmoneyApi(){
            console.log(window)
            console.log(window.cordova)
        }
    },
    mounted(){
       
    }
}
</script>
