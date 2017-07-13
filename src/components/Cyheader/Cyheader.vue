<template name="fade">
    <div class="head_nav">
        <div @click="goBack()">
            <img class="nav_arrow"src="../../assets/img/back.png" >
        </div>
        <div class="nav_text" v-text="headTitle"></div>
    </div>
</template>

<script>
    export default {
        name: 'head',
        props: ['headTitle'],
        data() { //属性
            return {
            }
        },
        /**
         * 初始化工作
         */
        mounted() {

        },
        /**
         *  方法
         */
        methods: {
            goBack:function () {
                this.$router.go(-1);
            },

        }

        /*computed: mapGetters({
            isLogin:"isLogin",
            getCurentTel:"getCurentTel"
        })*/
    }
</script>

<style lang="less">
    @import 'Cyheader.less';
</style>
