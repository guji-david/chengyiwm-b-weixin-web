<template name="fade">
  <div>
    <cyheader :headTitle="headTitle"></cyheader>
    <div class="userAuth">
      <div >
        <div  class ="auth_card" >
          <!--<div  class ="card_head">
              请上传您的工作名片照片进行认证
          </div>-->

          <div v-if="authInfo.img!=''"class="card_img">
              <div v-if="authInfo.status==0||authInfo.status==200" @click="onSelectImg()"style="max-height: 120px;">
                <img :src="authInfo.img" >
              </div>
              <div v-else style="max-height: 120px;">
                <img :src="authInfo.img" >
              </div>
          </div>
          <div v-else="authInfo.img==''"class="card_img" @click="onSelectImg()">
            <img  src="../../assets/img/cerfification_default.png"/>
          </div>
          <div class="auto_status">
            <div class="status_left">
              <img  src="../../assets/img/cerfification_status.png"/>
              <span>认证状态</span>
            </div>
            <div class="status_right" >
              <span class="authTime">{{authInfo.authTime|timestampToDate}}</span>
               <span v-text="statusText" :style="{color:activeColor}"></span>

            </div>
          </div>
        </div>
        <div  class="work_card" v-show="authInfo.status==0||authInfo.status==200">
          <div class="card_head">工作名片照片要求:</div>
          <div class="card_body">
            <div class="body_item">认证申请人需要满足一下条件:</div>
            <div class="body_item">1.为银行,卷商等<span style="color: #fd7a2b ;display: inline-block">金融行业
          </span>从业人员;</div>
            <div class="body_item">2.名片照片需确保<span style="color: #fd7a2b">信息真实,字体清新</span>;</div>
          </div>
          <div class="card_photo">
            <div class="sampleImg">
              <img  src="../../assets/img/cerfification_success.png"/>
            </div>
            <div class="sampleImg">
              <img  src="../../assets/img/cerfification_error1.png"/>
            </div>
            <div class="sampleImg">
              <img  src="../../assets/img/cerfification_error2.png"/>
            </div>
            <div class="sampleImg">
              <img  src="../../assets/img/cerfification_error3.png"/>
            </div>

          </div>
          <div class="card_confirm"><div class="confirm_btn" @click="confirmAuto()">提交认证</div></div>
        </div>

      </div>


    </div>
  </div>



</template>

<script>

  let uploader;
  /**
   * 七牛对应的bucket和url枚举
   * @type {*[]}
   */
  var QINIU_BUCKET_ENUM = {
    /**产品语音*/

    "chengyiwm-product-audio": "http://audio.chengyiwm.com/",
    /**产品文档*/
    "chengyiwm-product-documents": "http://7xudc8.com1.z0.glb.clouddn.com/",
    /**测试*/
    "chengyiwm-test": "http://7xuium.com1.z0.glb.clouddn.com/",
    /**认证名片*/
    "chengyiwm-authinfo": "http://7xujx4.com2.z0.glb.qiniucdn.com/",
    /**订单*/
    "chengyiwm-order": "http://ocnihe67r.bkt.clouddn.com/"
  };
  function getDomById(id) {
    return document.getElementById(id);
  }
  import Vue from 'vue'
  import * as API from '../../store/api.js'

//  import * as APP from './app.js'

  import cyheader from '../../components/Cyheader/Cyheader.vue'
  function fixZero(num,length){
    var str=""+num;
    var len=str.length;
    var s="";
    for(var i=length;i-->len;){
      s+="0";
    }
    return s+str;
  }
  export default {

    name: 'userRebate',
    components:{
      cyheader,
    },
    data() { //属性
      return {
        headTitle:"个人认证",
        authInfo:{},
        status:0,
        colorList:["#999999","#fd7a2b","#4eb049","#D63626"],//1.未认证0,2.审核中1,3.已认证2,4.认证失败200
        activeColor:"#999999",
        regImgUrl:"",
        chooseImgLocalIds: "",
        serverId: "",
      }
    },
    filters:{
      timestampToDate:function (dateNum) {
        if (!dateNum) return '';
        var date=new Date(dateNum*1000);
        return date.getFullYear()+"-"+fixZero(date.getMonth()+1,2)+"-"+fixZero(date.getDate(),2);
      }
    },
    /**
     * 初始化工作
     */
    mounted() {
      document.title ="个人认证_诚壹财富顾问";
        this.getAuthInfo();
    },
    computed:{
      statusText:function () {
        var _this=this;
        if(_this.status==0){
          _this.activeColor=_this.colorList[0];
          return "未认证";
        }else if(_this.status==1){
          _this.activeColor=_this.colorList[1];
          return "审核中";
        } else if(_this.status==2){
          _this.activeColor=_this.colorList[2];
          return "已认证";
        }else if(_this.status==200){
          _this.activeColor=_this.colorList[3];
          return "认证失败'";
        }

      }
    },
    /**
     *  方法
     */
    methods: {

      onSelectImg: function () {

        var APP = require("./app.js");


        uploader= APP.$QiniuUpLoad("chengyiwm-test",function (task) {
          console.log("callback: "+JSON.stringify(task)+"  "+(typeof task));
          console.log("task[0]._result: "+task[0]._result.key);
          var regImg=getDomById("regImg");
           this.regImgUrl=QINIU_BUCKET_ENUM['chengyiwm-test']+task[0]._result.key;
          regImg.src=this.regImgUrl;


        });
        uploader.chooseFile();
      },
      /*获取认证信息*/
      getAuthInfo:function () {
        API.$getAuthInfo(res=>{
          console.log(res);
        this.authInfo=res.body.authInfo;
        this.status=this.authInfo.status;
      });
      },
      /*提交认证*/
      confirmAuto:function () {
        API.$uploadAuthInfo(this.regImgUrl,res=>{
          if(res.head.ret==0){
            this.getAuthInfo();
        }
        });
      }
    }

  }
</script>

<style lang="less">
  @import './userAuth.less';
</style>
