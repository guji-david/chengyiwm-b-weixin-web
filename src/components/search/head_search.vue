<template name="fade">
  <div class="common">
    <div class="common_head">
      <div class="common_back" @click="goBack()" v-show="isBack">
        <img class="common_img"src="../../assets/img/back.png" >
      </div>
      <div class="common_search">
        <img class="search_img" src="../../assets/img/common_search.png" alt="">
        <input
          class="search_input"
          type="text"
          placeholder="请输入您想搜索的产品名称"
          v-model="cyQuery"
          @click="goSearch()">
      </div>
      <div class="common_user" @click="goUserInfo()" >
        <img class="common_person" src="../../assets/img/common_person.png" alt="">
      </div>
    </div>


  </div>
</template>

<script>

  import * as UTIlS from '../../common/utils'
  export default {
    name: 'head_search',
    props: ['isBack','cyQuery'],
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
      /*跳转个人中心*/
      goUserInfo:function () {
        if(UTIlS.getUserId()!='') {
          this.$router.push({name: 'userInfo'});
        }else {
          this.$router.push({name: 'login'});
        }

      },

      /*跳转到搜索*/
      goSearch:function () {
        this.$router.push({name: 'search'});
      }
    }

  }
</script>

<style lang="less">
  @import './head_search.less';
</style>
