<template>
  <div class="docPreview">
    <cyheader :headTitle="fileName"></cyheader>
    <!--<div class="hd">
      <span class="prev"><img src="http://7xqgu5.com1.z0.glb.clouddn.com/prev.png"></span>
      <span class="next"><img src="http://7xqgu5.com1.z0.glb.clouddn.com/next.png"></span>
      <em  v-text="pageDesc"></em>
    </div>-->
    <div class="swipe">
      <mt-swipe :auto="4000" :show-indicators="false">
        <mt-swipe-item v-for="item in listPDF"><img class="swipe_img" :src="item" alt="" ></mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import * as API from '../../store/api.js'
  import cyheader from '../../components/Cyheader/Cyheader.vue'

  import { Swipe, SwipeItem ,MessageBox } from 'mint-ui';

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);

    export default{
      components:{
        cyheader
      },
        data(){
            return{
//              prodName:"文档预览",
              listPDF:[],
              pageDesc:"",
              fromUrl:"",
              fileName:""
            }
        },
      /**
       * 初始化工作
       */
      mounted() {
        document.title ="文档预览_诚壹财富顾问";
        this.fromUrl = this.$route.params.fromUrl;
        console.log(this.fromUrl);
        this.fileName =this.truncatePdfName(this.$route.params.fileName);
        console.log(this.fileName);
        API.$listByPdfToImg(this.fromUrl,res=>{
          this.listPDF=res.body.list;
          console.log(res);
        });




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

        }
      }
    }
</script>
<style lang="less">
  @import './docPreview.less';
</style>
