<template name="fade">
    <div class="reg_bg">
        <cyheader :headTitle="regTitle"></cyheader>
        <div class="reg">

            <div class="reg_main" v-show="currentIndex==0">

                <div class="main_item ">
                    <img src="../../assets/img/tel_icon.png">
                    <input  type="text"placeholder="请输入您的手机号"maxlength="11"v-model="regObj.tel"/>
                </div>
                <button  @click="next()"class="regBtn">下一步,验证手机号</button>
            </div>
            <div class="reg_main" v-show="currentIndex==1">
                <div class="tips">
                    <span>已成功发送验证码到<em v-text="telSub"></em>手机号了，请注意查看</span>
                </div>
                <div class="main_item">

                    <img src="../../assets/img/verification_icon.png">
                    <input  type="text"placeholder="请输入验证码"maxlength="6"v-model="regObj.verifyCode"/>
                    <button class="again_send" @click="sendCode()"v-text="getVerifyCodeText" :disabled="getVerifyCodeDisabled"> </button>
                </div>
                <button  @click="next()"class="regBtn">下一步,设置密码</button>
            </div>
            <div class="reg_main" v-show="currentIndex==2">

                <div class="main_item ">
                    <img src="../../assets/img/password_icon.png">
                    <input  type="text"placeholder="请输入您的手机号"v-model="regObj.pwd"/>
                </div>
                <button  @click="regSubmit()"
                         class="regBtn"
                         v-text="regName"
                         :disabled="regDisabled"
                         :style="{background:regBackGround}"
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
              regTitle: "注册1/3",
              regObj:{
                tel:'',
                verifyCode:'',
                pwd:'',
              },
              regName:"注册并登录",
              regDisabled:false,
              regBackGround :"#508cee",
              getVerifyCodeDisabled: false,
              count: 60,
              getVerifyCodeText: "重新发送",

            }
        },
        /**
         * 初始化工作
         */
        mounted() {
          document.title ="注册_诚壹财富顾问";
        },
      computed: {
        telSub: function () {
          return this.regObj.tel.slice(0,3)+"XXXXXXXX"
        }
      },
        /**
         *  方法
         */
        methods: {
            //下一步,验证手机号
            next:function () {
              if(this.currentIndex==0){
                if(!UTIlS.checkTel(this.regObj.tel)){
                  alert('请输入正确的电话号码');
                  return false;
                }
                this.currentIndex++;
                this.regTitle="注册2/3";
              }else if(this.currentIndex==1){
                if(!UTIlS.checkVerifyCode(this.regObj.verifyCode)){
                  alert('请输入6位验证码');
                  return false;
                }
                this.currentIndex++;
                this.regTitle = "注册3/3";
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
              API.$downVerifyCode(1,this.regObj.tel, res=> {
                if(res.head.ret==0){
                  this.getVerifyCodeDisabled = true;
                  this.countDown();
                }else if(res.head.ret=='-10013'){
                  alert("用户已经存在，请输入其他电话号码");
                  this.currentIndex=0;
                  this.regTitle = "注册1/3";
                }

              });

            },
            regSubmit:function () {
              if(!UTIlS.checkPwd(this.regObj.pwd)){
                alert('请输入正确的密码');
                return false;
              }
              this.postData();
            },
          // 注册请求
           postData: function() {
            this.regName = "跳转中..";
            this.regDisabled = true;
            this.regBackGround = "#ddd";
            var pwd= hex_md5(this.regObj.pwd).toUpperCase();
             API.$register(this.regObj.tel,this.regObj.tel,this.regObj.verifyCode,pwd,res =>{
               if (res.head.ret == 0) {
                 console.log(res);
                 this.regDisabled = false;
                 UTIlS.setUserId(res.body.userId);
                 UTIlS.setSkey(res.body.skey);
                 this.$router.push({name: 'home'});
               }

             });

          }

        }
    }
</script>
<style lang="less">
    @import './reg.less';
</style>
