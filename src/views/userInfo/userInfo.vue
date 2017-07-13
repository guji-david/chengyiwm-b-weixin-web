<template name="fade">
  <div>
    <cyheader :headTitle="headTitle"></cyheader>
    <div class="userInfo">
      <div class="user_header">

        <div class="header_img">
          <div style="width: 86%">
            <span v-show="userInfo.icon!=''">
              <img :src="userInfo.icon">
            </span>
            <span v-show="userInfo.icon==''">
              <img src="../../assets/img/person.png">
            </span>
          </div>

          <div class="logout" @click="logout()">退出</div>
        </div>

        <div class="header_up" >
          <div class="yield_title">可提佣金(元)</div>
          <div class="yield_value">{{userInfo.availableCash}}</div>
        </div>

        <div class = "header_bottom">
          <div class="bottom_item bottom_left">
            <div class="item_title">已结佣金 (元)</div>
            <div class="item_value">{{userInfo.closeCommission}}</div>
          </div>
          <div class="bottom_item">
            <div class="item_title">待结佣金 (元)</div>
            <div class="item_value">{{userInfo.openCommission}}</div>

          </div>
        </div>
      </div>
      <div class="user_body">
        <div class="body_item" @click="goAuth()">
          <img  class="item_leftImg" src="../../assets/img/pc_user_icon.png">
          <div class="item_name">我的认证</div>
          <img  class="item_rightImg"src="../../assets/img/arrowright.png">
        </div>
        <div class="body_item" @click="goRebate()">
          <img  class="item_leftImg"src="../../assets/img/pc_rebate_icon.png">
          <div class="item_name">返佣礼券</div>
          <img  class="item_rightImg"src="../../assets/img/arrowright.png">
        </div>
        <div class="body_item" @click="goApp()">
          <img  class="item_leftImg"src="../../assets/img/pc_introduct_icon.png">
          <div class="item_name">APP功能介绍</div>
          <img  class="item_rightImg"src="../../assets/img/arrowright.png">
        </div>
      </div>
    </div>
  </div>



</template>

<script>
  import Vue from 'vue'

  import * as API from '../../store/api.js'
  import * as UTIlS from '../../common/utils'

  import cyheader from '../../components/Cyheader/Cyheader.vue'

  export default {

    name: 'userInfo',
    components:{
      cyheader,
    },
    data() { //属性
      return {
        headTitle:"个人中心",
        userInfo:{},
      }
    },
    /**
     * 初始化工作
     */
    mounted() {
      document.title ="个人中心_诚壹财富顾问";
      API.$getUserInfo(res=> {
        console.log(res);
        this.userInfo=res.body;

      });

    },
    /**
     *  方法
     */
    methods: {

      /*跳转到我的认证*/
      goAuth:function () {
        this.$router.push({name: 'userAuth'});
      },
      /*跳转到返佣礼券*/
      goRebate:function () {
        this.$router.push({name: 'userRebate'});
      },
      /*跳转到app功能介绍*/
      goApp:function () {
        this.$router.push({name: 'introduce'});
      },
      logout:function () {
        UTIlS.clearUserData(function (){});
        this.$router.push({name: 'home'});
      }

    },

  }
</script>

<style lang="less">
  @import './userInfo.less';
</style>
