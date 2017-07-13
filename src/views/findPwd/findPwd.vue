<template name="fade">
  <div class="findPwd_bg">
    <cyheader :headTitle="findPwdTitle"></cyheader>
    <div class="findPwd">

      <div class="findPwd_main" v-show="currentIndex==0">

        <div class="main_item ">
          <img src="../../assets/img/tel_icon.png">
          <input  type="text"placeholder="请输入您的手机号"v-model="findPwdObj.tel" maxlength="11"/>
        </div>
        <button  @click="next()"class="findPwdBtn">下一步,验证手机号</button>
      </div>
      <div class="findPwd_main" v-show="currentIndex==1">
        <div class="tips">
          <span>已成功发送验证码到<em v-text="telSub"></em>手机号了，请注意查看</span>
        </div>
        <div class="main_item">

          <img src="../../assets/img/verification_icon.png">
          <input  type="text"maxlength="6"placeholder="请输入验证码"v-model="findPwdObj.verifyCode"/>
          <button class="again_send" @click="sendCode()"v-text="getVerifyCodeText" :disabled="getVerifyCodeDisabled"> </button>
        </div>
        <button  @click="next()"class="findPwdBtn">下一步,设置密码</button>
      </div>
      <div class="findPwd_main" v-show="currentIndex==2">

        <div class="main_item ">
          <img src="../../assets/img/password_icon.png">
          <input  type="password"placeholder="请输入您的手机号"v-model="findPwdObj.pwd"/>
        </div>
        <button  @click="findPwdSubmit()"
                 class="findPwdBtn"
                 v-text="findPwdName"
                 :disabled="findPwdDisabled"
                 :style="{background:findPwdBackGround}"
        ></button>
      </div>
    </div>

  </div>

</template>

<script>
  import * as API from '../../store/api'
  import * as UTIlS from '../../common/utils'
  import {hex_md5} from '../../assets/js/md5'
  import cyheader from '../../components/Cyheader/Cyheader.vue'

  let intervalId;
  export default {
    components:{
      cyheader
    },
    data() { //属性
      return {
        currentIndex:0,
        findPwdTitle: "找回密码1/3",
        findPwdObj:{
          tel:'',
          verifyCode:'',
          pwd:'',
        },
        findPwdName:"找回密码并登录",
        findPwdDisabled:false,
        findPwdBackGround :"#508cee",
        getVerifyCodeDisabled: false,
        count: 60,
        getVerifyCodeText: "重新发送",

      }
    },
    /**
     * 初始化工作
     */
    mounted() {
      document.title ="找回密码_诚壹财富顾问";
    },
    computed: {
      telSub: function () {
        return this.findPwdObj.tel.slice(0,3)+"XXXXXXXX";
      }
    },
    /**
     *  方法
     */
    methods: {
      //下一步,验证手机号
      next:function () {
        if(this.currentIndex==0){
          if(!UTIlS.checkTel(this.findPwdObj.tel)){
            alert('请输入正确的电话号码');
            return false;
          }
          this.currentIndex++;
          this.findPwdTitle="找回密码2/3";
        }else if(this.currentIndex==1){
          if(!UTIlS.checkVerifyCode(this.findPwdObj.verifyCode)){
            alert('请输入6位验证码');
            return false;
          }
          this.currentIndex++;
          this.findPwdTitle = "找回密码3/3";
        }

      },
      numInterval:function() {
        this.getVerifyCodeText = this.count + '秒后重发';
        this.count--;
        if (this.count <= 0) {
          clearInterval(intervalId);
          this.getVerifyCodeText = '获取验证码';
          this.getVerifyCodeDisabled = false;
          this.count=60;
        }
      },
      countDown: function() { // 倒计时
        var _this = this;
        intervalId = setInterval(function () {
          _this.numInterval();
        },1000);

      },
      sendCode:function () {//发送验证码
        API.$downVerifyCode(2,this.findPwdObj.tel, res=> {
          if(res.head.ret==0){
            this.getVerifyCodeDisabled = true;
            this.countDown();
          }

        });

      },
      findPwdSubmit:function () {
        if(!UTIlS.checkPwd(this.findPwdObj.pwd)){
          alert('请输入正确的密码');
          return false;
        }
        this.postData();
      },
      // 找回密码请求
      postData: function() {
        this.findPwdName = "跳转中..";
        this.findPwdDisabled = true;
        this.findPwdBackGround = "#ddd";
        var pwd= hex_md5(this.findPwdObj.pwd).toUpperCase();
        API.$findPwd(this.findPwdObj.tel,this.findPwdObj.verifyCode,pwd,res =>{
          console.log(res);
          if (res.head.ret == 0) {
            console.log(res);
            this.findPwdDisabled = false;
            UTIlS.setUserId(res.body.userId);
            UTIlS.setSkey(res.body.skey);
//            UTIlS.setUserName(res.body.nickName);
            this.$router.push({name: 'home'});
          }else if(res.head.ret=='-10017'){
            alert(res.head.msg);
            this.findPwdName = "找回密码并登录";
            this.findPwdDisabled = false;
            this.findPwdBackGround = "#508cee";
            this.currentIndex=1;
            this.findPwdTitle = "找回密码2/3";
          }

        });

      }

    }
  }
</script>
<style lang="less">
  @import './findPwd.less';
</style>
