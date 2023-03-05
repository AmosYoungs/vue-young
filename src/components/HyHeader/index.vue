<template>
    <div class="hy-header hy-flex hy-ac">
        <div class="head-left">
            <slot name="leftBtn">
                <div v-show="showBack" @click="goBack">
                <van-icon name="arrow-left" />
            </div>
            </slot>
            
        </div>

        <div class="head-title flex-1">
            <slot name="headTitle">{{title}}</slot>
        </div>
        <div>
            <slot name="rightBtn"></slot>
        </div>

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
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>

</style>
