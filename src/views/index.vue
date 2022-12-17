<template>
    <div class="tp-flex">
        <component :is="currentCom"></component>
        <van-tabbar v-model="active">
            <van-tabbar-item  @click="currentCom='home'" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item @click="currentCom='demo'" icon="search">示例</van-tabbar-item>
            <van-tabbar-item icon="friends-o">vant</van-tabbar-item>
            <van-tabbar-item icon="setting-o">我</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
import Vue from 'vue'
import home from '@/views/index/ home.vue'
import demo from '@/views/index/demo.vue';
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);

export default {
    name: 'index',
    components: {
        home,demo
    },
    data() {
        return {
            active: 0,
            currentCom:'home'
        }
    }
}
</script>
