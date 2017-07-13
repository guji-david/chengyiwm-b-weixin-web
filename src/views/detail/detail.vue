<template name="fade">
    <div class="detail">
        <cyheader :headTitle="prodName"></cyheader>
        <div class="detail_main" style="margin-bottom: 60px;">
            <ul v-for="item in prodList" class="infoGroup">
                <li v-for="el in item.list">
                  <!--type==2 认证 收益 返佣 -->
                  <div class="info_head" v-if="el.type==2||el.title=='基本信息'">
                    <div class="info_item"v-for="(unit,index) in el.list">
                      <div class="text-l">
                        <span v-text="unit.key"></span>
                      </div>
                      <div class="text-r ":class="{'text-r-noborder':index==2}" v-for="el in str2List(unit.value)">

                        <div  class="column_noLogin" v-show="el=='登录可见'" @click.stop.prevent="goLogin()">
                          <span v-text="el"></span>
                        </div>
                        <div  class="column_noLogin" v-show="el!='登录可见'">
                          <span v-text="el"></span>
                        </div>
                      </div>
                    </div>
                    <div style="clear: both;"></div>
                  </div>
                  <!--产品亮点 评论-->
                    <div class="info_comment" v-if="el.type==4"  style="margin-bottom: 10px;" >
                        <div class="info_item">
                            <div class="item_title">产品亮点</div>
                            <div class="item_text" v-text="investmentHightlights"></div>
                        </div>
                        <div class="info_item" >
                            <div class="item_title">产品评价</div>
                            <div class="item_text" v-text="el.value"></div>
                        </div>


                    </div>

                    <!--产品详情 附件 相关产品-->
                    <div class="info_body"v-if="el.type==11||el.type==7||el.type==5||el.type==1">
                        <div class="body_nav" v-if="el.type==11||el.title=='产品要素'">
                            <div class="body_head">
                                <div class="body_unit"v-for="unit in navlist" @click="shiftTab(unit.id)">
                                        <span v-text="unit.navName"class="body_text"  :class="[{body_active:currentIndex==unit.id}]"></span>
                                </div>
                                <div style="clear: both;"></div>
                            </div>

                        </div>

                        <div v-show="currentIndex==0">
                            <div class="body_detail">
                                <div v-if="el.type==1&&el.title=='产品要素'" class="body_item_lr" v-for="item in el.list" >
                                    <div class="item_title" v-text="item.key"></div>
                                    <div class="item_text" v-text="item.value"></div>
                                </div>
                            </div>

                            <div class="body_detail">
                              <div v-show="el.type==1&&el.title=='募集账户'" >
                                <div class="body_item_ud">
                                  <div class="item_title" @click="shiftFold(el)" >
                                    <div class="title_text" v-text="el.title"></div>
                                    <div class="title_arrow">
                                      <img src="../../assets/img/down_arrow.png":class="[{info_img:el.fold!=true},{info_img1:el.fold==true}]" >
                                    </div>
                                  </div>
                                  <div class="item_text" v-show="el.fold!=true">
                                    <ul >
                                      <li v-for="item in el.list">
                                        <div class="item_title1" v-text="item.key"></div>
                                        <div class="item_text1" v-text="item.value"></div>
                                      </li>
                                    </ul>

                                  </div>
                                </div>




                              </div>
                                <div v-show="el.type==5">
                                    <div class="body_item_ud">
                                        <div class="item_title" @click="shiftFold(el)" >
                                            <div class="title_text" v-text="el.title"></div>
                                            <div class="title_arrow">
                                                <img src="../../assets/img/down_arrow.png":class="[{info_img:el.fold!=true},{info_img1:el.fold==true}]" >
                                            </div>
                                        </div>
                                        <div class="item_text" v-text="el.value" v-show="el.fold!=true" style="padding-left: 30px">
                                        </div>
                                    </div>

                                </div>

                            </div>


                        </div>

                        <div   v-show="currentIndex==1" >
                            <div v-if="el.title=='产品要素'"class="body_item body_pdf">
                              <div style="padding-top: 20px;background: #fff;" v-if="docProduct.length >0">
                                <ul>
                                  <li v-for="unit in docProduct" class="pdf_item">
                                    <div class="pdf_key">
                                      {{unit.fileName |truncatePdfName}}
                                    </div>
                                    <div class="pdf_value">
                                      <span @click="goDocPreview(unit)">预览</span> |
                                      <span @click="goDocDoading(unit)">下载</span>
                                    </div>

                                  </li>
                                </ul>
                              </div>
                              <div v-else="docProduct.length==0" class="cy_prod_null">
                                <img src="../../assets/img/null.png" style=" width: 200px;margin: 0 auto; ">
                              </div>

                            </div>
                        </div>

                        <div   v-show="currentIndex==2">
                            <div v-if="el.title=='产品要素'" class="body_item_lr body_relative">
                              <div v-if="relatedProduct.length>0" style="margin-bottom: 60px;">
                                <item v-for="item in relatedProduct" :item="item"></item>
                              </div>
                              <div v-else="productList.length==0" class="cy_prod_null">
                                <img src="../../assets/img/null.png" style=" width: 200px;margin: 0 auto; ">
                              </div>
                            </div>
                        </div>




                    </div>
                </li>
            </ul>
        </div>
      <!--底部咨询预约-->
      <div  class="detail_consult" @click="popConsult(0)">咨询预约</div>

      <div  class="detail_pop" v-show="popupVisible">
        <div class="cy_modal" @click="popConsult(1)"></div>
        <div class="fade-bc">
          <div class="fade-bc-top">
            <img src="../../assets/img/logo.png" >
          </div>
          <div class="fade-bc-mid">
            <span>您可以通过以下方式免费获得咨询及预约产品</span>
          </div>
          <div class="fade-bc-btom">

              <a style='color: #fff'href='tel:4006-222-500' >
                <div class="fade-bc-btom-left">
                <span>客服</span>
                <img src="../../assets/img/contact_icon.png" >
                </div>
              </a>


            <div class="fade-bc-btom-right">
              <input  placeholder="输入手机号码" v-model="tel" maxlength="11"/>
              <div @click="goTel()">给我回电</div>
            </div>
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
  import item from '../../components/listItem/item.vue'

  import { Toast,Popup } from 'mint-ui'

  Vue.component(Popup.name, Popup);

    export default {
        components:{
            cyheader,
            item
        },
        data() { //属性
            return {
              prodList: [],
//                typeValueList:[],//对认证 收益 返佣比列做特殊处理 type==2
              prodName: "",
              investmentHihtlights: "",
              navlist:[{id:0,navName:"产品详情"},{id:1,navName:"产品附件"},{id:2,navName:"相关产品"}],
              currentIndex:0,
              productId:0,
              docProduct:[],
              relatedProduct:[],
              popupVisible:false,

              tel:""//反馈电话

            }
        },
        /**
         * 初始化工作
         */
        mounted() {
          this.prodId = this.$route.params.productId;
          API.$getProductDetail( this.prodId,res=> {
            this.prodName = res.body.prodName;
            this.investmentHightlights = res.body.investmentHightlights;
            document.title = this.prodName;
            this.prodList = res.body.data;
            for(var i=0;i<this.prodList.length;i++){
              var list=this.prodList[i].list;
              for(var j=0;j<list.length;j++){
                var e=list[j];
              }

            }


          });

        },
      filters:{
        /*截取字符串*/
        truncatePdfName:function (value) {

          if(value.indexOf("（")>-1){//小括号所在的位置
            return value.substring(0,value.indexOf("（"));
          }else if(value.indexOf("-")>-1){//-所在的位置
            return value.substring(0,value.indexOf("-"));
          }else{
            return value.substring(0,10);
          }

        }
      },
        /**
         *  方法
         */
        methods: {
          /*去登录*/
          goLogin:function () {
            this.$router.push({name: 'login'});
          },
            /*切换不同tab*/
            shiftTab:function (id) {
                this.currentIndex=id;
              if(this.currentIndex==1){
                this.getProductDocument();
              }else if(this.currentIndex==2){
                this.getRelatedProduct();
              }
            },
          /*切换属性值是否隐藏*/
            shiftFold:function (el) {
              el.fold=!el.fold;
                return el.fold;
            },



            /*将返回的字符串转换成数组*/
            str2List: function(key) {
                key = key.replace(/\"/g, "");
                key = key.substring(1, key.length - 1);
                var list = key.split(",");
                return list;
            },

          /*文档预览*/
          goDocPreview:function (unit) {
            this.$router.push({name: 'docPreview', params: {'fileName':unit.fileName,'fromUrl':unit.downUrl}});
          },
          /*文档下载*/
          goDocDoading:function (unit) {
            this.$router.push({name: 'docDoading', params: {'prodId': this.prodId,'fileName':unit.fileName}});
          },


          /*获取相关产品*/
          getRelatedProduct:function () {
            API.$getRelatedProduct( this.prodId,res=> {
              console.log(res);
              this.relatedProduct=res.body.productList;

            });

          },

          /*获取文档下载列表*/
          getProductDocument:function () {
            API.$getProductDocument( this.prodId,res=> {
              console.log(JSON.stringify(res));
              this.docProduct=res.body.list;

            });

          },


          /*切换弹出咨询*/
          popConsult:function (type) {
            if(type==0){
              this.popupVisible=true;
            }else{
              this.popupVisible=false;
            }

          },
          /*给我回电*/
          goTel:function () {
            if(!UTIlS.checkTel(this.tel)){
              Toast({
                message: '请输入正确的电话号码',
                duration: 1000
              });
              return ;
            }
            API.$feedback(this.prodName,"",this.tel,res =>{
             if(res.head.ret==0){
               Toast({
                 message: '我们会尽快和你联系，请稍后',
                 duration: 1000
               });
               this.popupVisible=false;
             }else{
               Toast({
                 message: '反馈失败',
                 duration: 1000
               });
             }
            })
          }

    }

    }
</script>
<style lang="less">
    @import './detail.less';
</style>
