<template name="fade">
   <div class="prod">
     <div class="head_head">
       <!--搜索-->
       <search :isBack="isBack" :cyQuery="query"></search>

     </div>

     <!--数据列表-->

       <scroll :refresh='refresh' :offsetH='10' :bottomRefresh='bottomRefresh'>

         <!--类型选择-->
         <div class="prod_nav">
           <div class="type-select">

             <div class="sl-col" @click="shiftCategory(1)">
               <img class="type-img" src="../../assets/img/trust_icon.png"/>
               <span :class="{'hight-text-1':currentIndex==1}">集合信托</span>
             </div>
             <div class="sl-col" @click="shiftCategory(2)">
               <img class="type-img" src="../../assets/img/capital_icon.png"/>
               <span :class="{'hight-text-2':currentIndex==2}">资管计划</span>
             </div>
             <div class="sl-col" @click="shiftCategory(4)">
               <img class="type-img" src="../../assets/img/fund_icon.png"/>
               <span :class="{'hight-text-4':currentIndex==4}">证券基金</span>
             </div>
             <div class="sl-col" @click="shiftCategory(16)">
               <img class="type-img" src="../../assets/img/equity_icon.png"/>
               <span :class="{'hight-text-16':currentIndex==16}">股权基金</span>
             </div>
             <div class="sl-col" @click="shiftCategory(128)">
               <img class="type-img" src="../../assets/img/overseas_icon.png"/>
               <span :class="{'hight-text-128':currentIndex==128}">海外投资</span>
             </div>
           </div>
         </div>
         <div v-if="productList.length>0" style="margin-bottom: 60px;">

         <item v-for="item in productList" :item="item"></item>

         </div>
         <div v-else="productList.length==0" class="cy_prod_null">
           <img src="../../assets/img/null.png" style=" width: 200px;margin: 0 auto; ">
         </div>
       </scroll>










     <!--底部功能按钮-->
     <div class="pro_bottom">

       <div class="bottom_colom" @click="shiftPop(1)">
         <img src="../../assets/img/select_icon.png" class="colom_img">
         <div class="colom_text">筛选</div>
       </div>
       <div class="bottom_colom" @click="shiftPop(2)">
         <img src="../../assets/img/invest_icon.png" class="colom_img">
         <div class="colom_text">投资方案</div>
       </div>
       <div class="bottom_colom" @click="shiftPop(3)">
         <img src="../../assets/img/sort_icon.png" class="colom_img">
         <div class="colom_text">排序</div>
       </div>


     </div>
     <div class="pro_pop" v-show="popVisable">
       <div class="cy_modal" @click="popClosed()"></div>
       <div class="pop_select" v-show="popVisable&&(currentIndex_pop==1)">
         <div class="select_head">
           <div  class="head_item"@click="canelAll(1)">取消</div>
           <div class="head_item head_clear"> <div class="clear_text" @click="clearFilter(1)">清空筛选</div></div>
           <div class="head_item head_confirm" @click="confirmAll(1)">确定</div>
         </div>
         <div class="select_body" >
           <div class="body_item" v-for="(el,index) in filterList_select">
             <div class ="body_left">
               <div class="left_item " :class="[{item_active:selectActiveIndex==index}]" v-text="el.name" @click="shiftSelectActiveIndex(index)"></div>
             </div>
             <div class ="body_right" v-if="selectActiveIndex==index">
               <ul >
                 <li class="right_item"  v-for="item in el.child">
                   <div @click="toggleSelectItem(el,item,1)">
                     <span :class="[{select_active:item.sel!=''}]" v-text="item.name"></span>
                     <div class="item_img">
                       <div v-if="item.sel!=''">
                         <img src="../../assets/img/select_active_icon.png">
                       </div>
                       <div v-else>
                         <img src="../../assets/img/select_default_icon.png">

                       </div>


                     </div>
                   </div>
                 </li>
               </ul>

             </div>
           </div>

         </div>
       </div>

       <div class="pop_invest" v-show="popVisable&&(currentIndex_pop==2)">
         <div class="invest_head">
           <div  class="head_item"@click="canelAll(2)">取消</div>
           <div class="head_item head_clear"> <div class="clear_text" @click="clearFilter(2)">清空筛选</div></div>
           <div class="head_item head_confirm" @click="confirmAll(2)">确定</div>
         </div>
         <div class="invest_body" >
           <div class="body_item" v-for="el in filterList_invest">
             <div class ="body_up">
               <div class="up_item "v-text="el.name"></div>
               <div class="up_img" v-show="el.child.length>6" @click="loadMore(el.child)">
                 <img src="../../assets/img/down_arrow.png" :class="[{more_img:loadMoreShift},{more_img1:!loadMoreShift}]">
               </div>
             </div>
             <div class ="body_down">
               <ul>
                 <li v-for="(item,index) in el.child" v-show="index<investMax">
                    <div  class="down_item" :class="{'invest_active':item.sel!=''}" @click="toggleSelectItem(el,item,2)" v-text="item.name">
											</div>
                 </li>
               </ul>
             </div>
           </div>

         </div>

       </div>

       <div class="pop_sort" v-show="popVisable&&(currentIndex_pop==3)">
         <ul>
           <li class="pop_item" @click="productSort(0)">
             <span :class="{'pop_sort_active':currentIndex_sort==0}">默认</span>
             <span class="sort_select" v-show="currentIndex_sort==0">
               <img src="../../assets/img/sort_select_icon.png" alt="">
             </span>
           </li>
           <li class="pop_item" v-for="el in defaultSortList" @click="productSort(el.sortIndex)">
             <span v-text="el.name" :class="{'pop_sort_active':currentIndex_sort==el.sortIndex}"></span>
             <span class="sort_select" v-show="currentIndex_sort==el.sortIndex">
               <img src="../../assets/img/sort_select_icon.png" alt="">
             </span>
           </li>
         </ul>

       </div>
     </div>

   </div>
</template>

<script>
   import Vue from 'vue'
   import {mapGetters, mapActions} from 'vuex'

   import * as API from '../../store/api.js'
   import * as UTIL from '../../common/utils.js'

   import item from '../../components/listItem/item.vue'
   import scroll from '../../components/scroll/scroll.vue'
   import search from '../../components/search/head_search.vue'

   import { Toast, MessageBox } from 'mint-ui';


   /** 默认的排序项 */
   var DEFAULT_SORT_LIST = [{
     name: "返佣从高到低",
     sortIndex: 1
   }, {
     name: "收益从高到低",
     sortIndex: 2
   }, {
     name: "期限从短到长",
     sortIndex: 3
   }];
   export default {
     components:{
       search,
       scroll,
       item
     },

      name: 'prod',
      data() { //属性
         return {
           loading:false,
           investMax:6,
           loadMoreShift:true,
           activeCategoryId:0,
           isBack:true,
           start:0,
           pageSize:10,
           query:'',
           productList: [],
           filterIdStr:"",//总得筛选id汇总
           totalCount:0,

           offsetH:40,//加载隐藏区高度
           listAD:[],
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
           popVisable:false,
           currentIndex:0,
           currentIndex_pop:0,
           categoryList:[],//全部产品类别列表
           filterList_all: [],//筛选总列表


           selectedFilters:[],//选中的筛选项
           filterList_select: [],//筛选列表
           selectActiveIndex:0, //筛选选中的下标

           investFilters:[],//选中的投资项
           filterList_invest: [],//投资列表
           filterIdList_invest:[],
           filterId_invest:"",//投资列表筛选列表id汇总

           currentIndex_sort:0,
           defaultSortList:DEFAULT_SORT_LIST,//排序列表
         }
      },
      /**
       * 初始化工作
       */
      mounted() {
        if(!!this.$route.params.query) {
          this.query = this.$route.params.query;
          document.title ="搜索_诚壹财富顾问";
        }
        if(!!this.$route.params.categoryId) {
          this.activeCategoryId = this.$route.params.categoryId;
          this.currentIndex=this.$route.params.categoryId;
          document.title=this.getCategoryNameById(this.activeCategoryId)+"_诚壹财富顾问";
        }
        this.getProduct(this.activeCategoryId,"","",this.query);
        this.getAppInfo();

      },
      /**
       *  方法
       */
      methods: {
        /*下拉刷新监听事件*/
        refresh(cb){
          console.log(cb);
          this.pageSize=10;
          this.getProduct(this.activeCategoryId,this.sortId ,this.filterIdStr,this.query);
          cb()

        },
        /*滚动加载监听事件*/
        bottomRefresh(){
          if(this.pageSize>=this.totalCount){
            Toast({
              message: '数据加载完毕！',
              duration: 1000
            });
            return;
          }
          this.pageSize=this.pageSize+10;
          this.getProduct(this.activeCategoryId,this.sortId ,this.filterIdStr,this.query);
        },
        /*获取基本信息拉取并全局保存*/
        getAppInfo:function () {
          API.$getAppInfo(res=>{
            this.categoryList=res.body.categoryList;
            UTIL.pushObj("categoryList",this.categoryList);
            this.getFilterList();
          });
        },
        /*通过产品类别id 获取产品类别*/
        getCategoryNameById:function (id) {
          var categoryName="";
          this.typeList.forEach(function (categoryItem) {
            if (categoryItem.dictId ==id) {
              categoryName=categoryItem.name;
            }
          });
          return categoryName;
        },
        /*获取某一产品的产品筛选列表并处理*/
        getFilterList:function () {
          var list = UTIL.fetchObj("categoryList");
          var _this = this;
          _this.filterList_all=[];
          _this.filterList_select=[];
          _this.filterList_invest=[];
          console.log("_this.activeCategoryId"+_this.activeCategoryId);
          list.forEach(function (parentFilter) {
            if (parentFilter.dictId ==_this.activeCategoryId) {
              _this.filterList_all=_this.cleanFilterLists(parentFilter.filterList);

            }
          });
          _this.filterList_all.forEach(function (childFilter) {
            if (childFilter.name == "返佣比例" || childFilter.name == "募集状态" || childFilter.name == "产品来源") {
              _this.filterList_select.push(childFilter);
            }else{
              _this.filterList_invest.push(childFilter);
//              console.log(JSON.stringify(_this.filterList_invest));
            }
          })
//          _this.filterList_invest=_this.filterList_all;
        },

        /*获取产品列表*/
        getProduct:function (categoryId,sortId,filterId,query) {
          this.$route.params.categoryId=categoryId;
          API.$getProduct(this.start,this.pageSize,categoryId,sortId,filterId,query,res=> {
            this.productList = res.body.productList;
            this.totalCount=res.body.totalCount;
          });
        },

        /*-------------------------------------筛选和投资方案公用方法---------------------begin*/
        /**
         * 重置筛选项
         */
        cleanFilterLists:function(cleanList) {
          cleanList.forEach(function(filter) {
            filter.child.forEach(function(childFilter) {
              if(childFilter.name == "全部") {
                childFilter.sel = true;
              } else {
                childFilter.sel = false;
              }
            });
          });
          return cleanList;
        },

        /*切换不同产品类别*/
        shiftCategory:function (id) {
          this.$router.push({name: 'product', params: {'categoryId':id}});
          this.currentIndex=id;
          this.activeCategoryId=id;
          document.title=this.getCategoryNameById(this.activeCategoryId)+"_诚壹财富顾问";
//          this.query="";
          this.getProduct(this.activeCategoryId,this.sortId ,this.filterIdStr,this.query);
          this.getFilterList();
        },

        /*清空筛选*/
        clearFilter:function (index) {
          if(index==1){
            this.selectedFilters = [];
            this.filterList_select=this.cleanFilterLists(this.filterList_select);
          }else{
            this.investFilters = [];
            this.filterList_invest=this.cleanFilterLists(this.filterList_invest);
          }
        },

        /*将选中项dictId的转换成字符串*/
        listToStr:function (filterList) {
          var selectFilterIdStr="";
          if(filterList.length>0){
            for(var i = 0; i < filterList.length - 1; i++) {
              selectFilterIdStr += filterList[i].dictId + ",";
            }
            selectFilterIdStr += filterList[filterList.length - 1].dictId;
            return selectFilterIdStr;
          }else{
            return "";
          }

        },

        /*切换弹出不同筛选条件*/
        shiftPop:function (index) {
          this.popVisable=true;
          this.currentIndex_pop=index;
        },

        /*关闭弹窗*/
        popClosed:function () {
          this.popVisable=false;
        },
        /*取消(筛选和投资方案)*/
        canelAll:function (type) {
          this.popClosed();
          if(type==1){
            if(UTIL.fetchObj("filterList_select")!=""){
              this.filterList_select=UTIL.fetchObj("filterList_select");
            }

          }else{

            if(UTIL.fetchObj("filterList_invest")!=""){
              this.filterList_invest=UTIL.fetchObj("filterList_invest");
            }

          }
        },
        /*确定(筛选和投资方案)*/
        confirmAll:function (type) {
          this.popClosed();
          if(type==1){
            UTIL.pushObj("filterList_select",this.filterList_select);
          }else {
            UTIL.pushObj("filterList_invest",this.filterList_invest);
//            console.log('UTIL.fetchObj("filterList_invest")------------>'+JSON.stringify(UTIL.fetchObj("filterList_invest")));
          }
          var filterListAll=this.investFilters.concat(this.selectedFilters);
          this.filterIdStr = "";
          this.filterIdStr=this.listToStr(filterListAll);
          this.getProduct(this.activeCategoryId,this.sortId ,this.filterIdStr,this.query);
        },
        /**
         * 切换一个item的选中与不选中
         *
         *
         * @param parent 父节点
         * @param item 待切换item
         */
        toggleSelectItem: function(parent,item,type) {
          if(item.name == "全部") {
            // 如果选中的是“全部”，清除其他的
            parent.child.forEach(function(childFilter) {
              if(childFilter.name == "全部") {
                childFilter.sel = true;
              } else {
                childFilter.sel = false;
              }
            });
          } else {
            // 如果选中的不是“全部” ，清除“全部”
            parent.child.forEach(function(childFilter) {
              if(childFilter.name == "全部") {
                childFilter.sel = false;
              }else{
                if(childFilter.name==item.name){
                  item.sel =!item.sel;
                  console.log("name:"+item.name);
                }
              }
            });
          }
          this.getSelectedFilterItems(type);
        },

        /**动态的获取已经选中的筛选项*/
        getSelectedFilterItems: function(type) {//type1为筛选，type2为投资方案
          if(type==1){
            this.selectedFilters = [];
            this.selectedFilters=this.refreshSelectedFilterItems(this.filterList_select);
          }else{
            this.investFilters = [];
            this.investFilters=this.refreshSelectedFilterItems(this.filterList_invest);
          }


        },
        /*动态的获取已经选中的筛选项*/
        refreshSelectedFilterItems: function(selectlist) {
          var selectedFiltersList = [];
          selectlist.forEach( filter => {
            // “全部” 这一项
            var allItem = {};
            // 是否 非“全部”选中
            var isOtherSelected = false;
            // 是否 “全部” 选中
            var isAllSelected = true;
            filter.child.forEach(childFilter => {
              if(childFilter.name == "全部") {
                allItem = childFilter;
                isAllSelected = allItem.sel;
              } else if(childFilter.name != "全部") {
                if(isAllSelected) {
                  childFilter.sel = false;
                } else if(childFilter.sel == true) {
                  isOtherSelected = true;
                  selectedFiltersList.push(childFilter);
                }
              }
            });
            // 所有的都没有选中，则默认选中“全部”
            if(!isOtherSelected) {
              allItem.sel = true;
            }
          });
          return selectedFiltersList;


        },


        /*-------------------------------------筛选和投资方案公用方法---------------------end*/
        /*切换项主元素(筛选)*/
        shiftSelectActiveIndex:function (index) {
          this.selectActiveIndex=index;
          console.log("this.selectActiveIndex------"+this.selectActiveIndex);
        },


        /*显示更多(投资方案)*/
        loadMore:function (list) {
          if(this.investMax==6){
            this.loadMoreShift=false;
            this.investMax=list.length;
          }else{
            this.loadMoreShift=true;
            this.investMax=6;
          }

        },


        /**
         * 选中某一个排序项
         * @param index sortIndex
         */
        productSort: function(index) {
          this.currentIndex_sort = index;
          this.sortId = index;
          this.getProduct(this.activeCategoryId,this.sortId ,this.filterIdStr,this.query);
        },

      },

   }
</script>

<style lang="less">
   @import './product.less';
</style>
