<template>
    <div class="hy-header hy-flex hy-ac">
        <div class="head-left">
            <slot name="leftBtn"></slot>
            <div v-show="showBack" @click="goBack">
                <van-icon name="arrow-left" />
            </div>
        </div>

        <div class="head-title">
            <slot name="headTitle">{{title}}</slot>
        </div>
        <div></div>

    </div>
</template>

<script>

export default {
    name: 'HyHeader',
    props: {
        showBack: {
            type: Boolean,
            default: true
        },
        isOverwriteBack: {
            type: Boolean,
            default: false
        },
        title:{
            type:String,
            default:''
        }
    },
    components: {},
    data() {

        return {

        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},

    methods: {
        goBack() {

        }

    }
</script>
<style scoped lang="less"></style>