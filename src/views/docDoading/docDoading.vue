<template>
  <div class="docDoading">
    <cyheader :headTitle="fileName"></cyheader>
    <div class="sendEmail">
      <div class="send_file">
        <input  placeholder="发送到邮箱" v-model="email"/>
        <div @click="sendFile()" :disabled="sendDisabled"class="send_btn":class="{'send_disabled':sendDisabled}">发送</div>
      </div>
    </div>





  </div>
</template>

<script>

  import Vue from 'vue'
  import * as API from '../../store/api.js'
  import * as UTIlS from '../../common/utils'

  import { Toast, MessageBox } from 'mint-ui';

  import cyheader from '../../components/Cyheader/Cyheader.vue'

    export default{
      components:{
        cyheader
      },
        data(){
            return{
              prodId:"",
              fileName:"",
              email:"",
              sendDisabled:false
            }
        },
      /**
       * 初始化工作
       */
      mounted() {
        document.title ="资料下载_诚壹财富顾问";
        this.prodId = this.$route.params.prodId;
        console.log(this.prodId);
        this.fileName =this.truncatePdfName(this.$route.params.fileName);
        console.log(this.fileName);
      },
      methods:{
        truncatePdfName:function (value) {
          if(value.indexOf("（")>-1){//小括号所在的位置
            return value.substring(0,value.indexOf("（"));
          }else if(value.indexOf("-")>-1){//-所在的位置
            return value.substring(0,value.indexOf("-"));
          }else{
            return value.substring(0,10);
          }

        },
        sendFile:function () {
          if(!UTIlS.checkEmail(this.email)){
            Toast({
              message: '请输入正确的邮箱',
              duration: 1000
            });
            return false;
          }
          API.$sendProductDocument(this.prodId,this.email,res=>{
            if(res.head.ret==0){
              this.sendDisabled=true;
              Toast({
                message: '已发送到邮箱，请查收！',
                duration: 2000
              });
            }
          })
        }
      }
    }
</script>
<style lang="less">
  @import './docDoading.less';
</style>
