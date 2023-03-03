

<template>
    <div class="hy-flex">
        <van-list>
            <van-cell v-for="item in demoList" :key="item.name" :title="item.name" @click="goToPage(item)"> </van-cell>
        </van-list>
     
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
            }
            
            ]
        }
    },
    methods:{
        goToPage(item){
            this.$router.push({name:item.routerName})
        }
    },
    mounted(){
        console.log('333')
    }
}
</script>
