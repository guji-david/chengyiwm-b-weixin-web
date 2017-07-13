<template name="fade">

    <div class="login_bg">
        <cyheader :headTitle="loginTitle"></cyheader>
        <div class="login">
            <div class="login_main">

                <div class="main_item">
                    <img src="../../assets/img/tel_icon.png">
                    <input  type="text"placeholder="请输入您的手机号"maxlength="11"v-model="loginObj.tel"/>
                </div>

                <div class="main_item">
                    <img style=" width: 16px;padding: 0 2px;" src="../../assets/img/password_icon.png">
                    <input type="password" placeholder="请输入您的密码"v-model="loginObj.pwd" />
                </div>
                <div>

                </div>
                <button
                  @click="loginSubmit()"
                  class="loginBtn"
                  v-text="loginName"
                  :disabled="loginDisabled"
                  :style="{background:loginBackGround}"
                ></button>
                <div class="regAndPwd">
                    <div @click ="goReg()" class="new-user">新用户注册</div>
                    <div  @click="goFindPwd()" class="find-pwd">忘记密码?</div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
    import * as API from '../../store/api'
    import * as UTIlS from '../../common/utils'
    import {hex_md5} from '../../assets/js/md5'
    import { Toast, MessageBox } from 'mint-ui';

    import cyheader from '../../components/Cyheader/Cyheader.vue'

    export default {
        components:{
            cyheader
        },
        data() { //属性
            return {
                loginTitle: "登录",
                loginName:"登录",
                loginBackGround:"#508cee",
                loginDisabled:false,
                loginObj:{
                    tel:'',
                    pwd:'',
                }
            }
        },
        /**
         * 初始化工作
         */
        mounted() {
          document.title ="登录_诚壹财富顾问";
        },
        /**
         *  方法
         */
        methods: {

            /*检查输入内容是否为空 是否合法*/
            isPass:function(){
                if(!UTIlS.checkTel(this.loginObj.tel)){
                  Toast({
                    message: '请输入正确的电话号码',
                    duration: 1000
                  });
                  return false;
                }
                if(!UTIlS.checkPwd(this.loginObj.pwd)){
                  Toast({
                    message: '请输入正确的密码',
                    duration: 1000
                  });
                  return false;
                }
                return true;
            },
            /*登录提交*/
            loginSubmit:function () {
              if(this.isPass()){
                this.postData();
              }

            },
          // 登录请求
          postData: function() {
            this.loginName = "登录中..";
            this.loginDisabled = true;
            this.loginBackGround = "#ddd";
            var pwd= hex_md5(this.loginObj.pwd).toUpperCase();
            API.$login(this.loginObj.tel,pwd,res=>{
              if(res.head.ret == 0) {
                this.loginVisable=false;
                UTIlS.setUserId(res.body.userId);
                UTIlS.setSkey(res.body.skey);
                UTIlS.setUserName(res.body.nickName);
                this.$router.push({name: 'home'});
              } else  {
                this.loginVisable=false;
                alert(res.head.msg);
              }
              this.loginName = "登 录";
              this.loginDisabled = false;
              this.loginBackGround = "#508cee";
            });

          },
            /*跳到注册*/
            goReg:function () {
                this.$router.push({name: 'reg'});
            },
            /*跳到找回密码*/
            goFindPwd:function () {
                this.$router.push({name: 'findPwd'});
            },
        }
    }
</script>
<style lang="less">
    @import './login.less';
</style>
