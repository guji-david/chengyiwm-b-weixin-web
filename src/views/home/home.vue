<template name="fade">
   <div class="home">
      <!--搜索-->
     <search :isBack="isBack"></search>
      <div class="home_carousel ">
        <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in listAD"><a :href="item.jumpUrl"><img class="search_img" :src="item.picUrl" alt="" ></a></mt-swipe-item>
      </mt-swipe>

      </div>
      <!--类型选择-->
      <div class="home_nav">
         <div class="type-select">
           <!-- <div class="sl-col" v-for="item in typeList">
               <img class="type-img" v-bind:src='item.imgUrl'/>
               <span>{{item.name}}</span>
            </div>-->
            <div class="sl-col" @click="goList(1)">
               <img class="type-img" src="../../assets/img/trust_icon.png"/>
               <span>集合信托</span>
            </div>
            <div class="sl-col" @click="goList(2)">
               <img class="type-img" src="../../assets/img/capital_icon.png"/>
               <span>资管计划</span>
            </div>
            <div class="sl-col" @click="goList(4)">
               <img class="type-img" src="../../assets/img/fund_icon.png"/>
               <span>证券基金</span>
            </div>
            <div class="sl-col"@click="goList(16)">
               <img class="type-img" src="../../assets/img/equity_icon.png"/>
               <span>股权基金</span>
            </div>
            <div class="sl-col" @click="goList(128)">
               <img class="type-img" src="../../assets/img/overseas_icon.png"/>
               <span>海外投资</span>
            </div>
         </div>
      </div>
      <!--推荐标签-->
      <div class="home_mark">
         <img class="mark_img" src="../../assets/img/hot_icon.png">
      </div>
      <!--数据列表-->
       <div v-for="el in dataList" >
         <item v-for="item in el.prodList" :item="item"></item>
       </div>


      <!--底部功能按钮-->
      <div class="home_bottom">

            <div class="bottom_colom"style="margin-top: 5px;" >
              <a style='color: #fff'href='tel:4006-222-500' >
                <img src="../../assets/img/home_phone_icon.png" class="colom_img"style="margin: 0 auto;">
                <div class="colom_text">电话咨询</div>
              </a>
            </div>
            <div class="bottom_colom"style="margin-top: 5px;">
                 <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.chengyiwm.yuandian">

                   <img src="../../assets/img/tel_icon.png" class="colom_img" style="margin: 0 auto;">
                   <div class="colom_text">客户端下载</div>
                 </a>

            </div>
            <div class="bottom_colom" @click="goUserInfo()">
               <img src="../../assets/img/common_person.png" class="colom_img">
               <div class="colom_text">我的</div>
            </div>


      </div>
   </div>
</template>

<script>
   import Vue from 'vue'
   import {mapGetters, mapActions} from 'vuex'

   import * as API from '../../store/api.js'
   import * as UTIlS from '../../common/utils'

   import { Swipe, SwipeItem ,MessageBox } from 'mint-ui';
   import item from '../../components/listItem/item.vue'
   import search from '../../components/search/head_search.vue'

   import { Loadmore } from 'mint-ui';

   Vue.component(Loadmore.name, Loadmore);
   Vue.component(Swipe.name, Swipe);
   Vue.component(SwipeItem.name, SwipeItem);

   export default {
     components:{
       search,
       item
     },
      name: 'Home',
      data() { //属性

         return {
           isBack:false,
            tapTarget:{},
            loading: true,
            dictId:'',
            hasMore: false,
            listAD:[],
            dataList: [],
            typeList:[
               {imgUrl:'../../img/trust_icon.png',
                  name:'集合信托',
                  dictId:'1',
               },
               {
                  imgUrl:'../../img/capital_icon.png',
                  name:'资管计划',
                  dictId:'2',
               },
               {
                  imgUrl:'../../img/fund_icon.png',
                  name:'证券基金',
                  dictId:'4',
               },
               {
                  imgUrl:'../../img/equity_icon.png',
                  name:'股权基金',
                  dictId:'16',
               },
               {
                  imgUrl:'../../img/overseas_icon.png',
                  name:'海外投资',
                  dictId:'128',
               }],
            bottomList:[
               {
                  imgUrl:'../../img/home_phone_icon.png',
                  name:'电话咨询',
                  id:'1001',
               },
               {
                  imgUrl:'../../img/tel_icon.png',
                  name:'客户端下载',
                  id:'1002',
               },
               {
                  imgUrl:'../../img/mine_icon.png',
                  name:'我的',
                  id:'1003',
               }],
            tagList:['政信类','AA国企担保'],

         }
      },
      /**
       * 初始化工作
       */
      mounted() {
        document.title ="诚壹财富顾问";
        this.getChoiceData();
      },
      /**
       *  方法
       */
      methods: {

        /*获取接口数据*/
        getChoiceData:function () {
          API.$getAD(res=> {
            console.log(res);
            this.listAD = res.body.listAD;

          });
          API.$getChoiceProduct(res=> {
            console.log(res);
            this.dataList = res.body.prodGroup;

          });
        },

         /*去列表页*/
         goList:function (id) {
            this.$router.push({name: 'product', params: {'categoryId':id}});
         },
        /*拨打电话*/
        goTel:function () {
         /* MessageBox.confirm('拨打4006-222-500?【仅为模拟】').then(action => {
            console.log(action)
          });*/
         /* MessageBox({
            title: '提示',
            message: '拨打4006-222-500?【仅为模拟】',


          });*/

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
      },
      computed: mapGetters({
      })
   }
</script>

<style lang="less">
   @import './home.less';
</style>
