
<template>
    <div class="hy-flex">

        <van-button type="primary" @click="openCamera">打开相机</van-button>
    </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'vant';

Vue.use(Button);
export default {
    name: 'index',
    components: {
    },
    data() {
        return {
            openCamera() {
                console.log(navigator)
                navigator.camera.getPicture((success) => {}, (err) => {}, {
                    quality: 50,
                    destinationType: 1,
                    encodingType: 0,
                    allowEdit: true,
                    sourceType: 1
                })
            }
        }
    }
}
</script>
