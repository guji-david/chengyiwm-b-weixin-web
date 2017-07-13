<template name="fade">
   <div class="search">
      <!--搜索-->
      <div class="search_head">
         <div class="search_main">
            <img class="search_img" src="../../assets/img/common_search.png" alt="">
            <input
              class="search_input"
              type="text"
              v-model="query"
              v-on:blur="blur()"
              placeholder="请输入您想搜索的产品名称"/>
         </div>
         <div class="search_user"@click="searchCanel()" >
           取消
         </div>
      </div>

     <!--热门标签-->
     <div class="search_hot">
       <div class="hot_tag">
         <span class="hot_title">热门标签</span>
       </div>
       <div class="hot_mark">
         <div v-for="item in hotwordList">
           <div class="mark_item" v-text="item" @click="goHotSearch(item)"></div>
         </div>
       </div>
     </div>

     <!--搜索历史-->
     <div class="search_history" v-if="searchList.length !=0">
       <div class="his_tag">
         <span class="his_title">历史记录</span>
         <span  class="his_del" @click="clear_history()">清除历史</span>
       </div>
       <div class="his_record">
         <div class="record_item" v-for="(item,index) in searchList">
           <img class="item_time" src="../../assets/img/time_icon.png">
           <span class="item_text" v-text="item"></span>
           <img class="item_dele" src="../../assets/img/delete_icon.png" @click="removeItem(index)" >
         </div>

       </div>
     </div>
     <div class="search_empty" v-else="searchList.length ==0">搜索历史为空</div>


   </div>
</template>

<script>
   import Vue from 'vue'

   import * as API from '../../store/api.js'
   import * as UTIlS from '../../common/utils'


   export default {

      name: 'search',
      data() { //属性

         return {
           query:"",
           searchList:[],//历史记录列表
           hotwordList:[]//热门推荐列表
         }
      },
      /**
       * 初始化工作
       */
      mounted() {
        this.searchList = UTIlS.fetchObj("searchList");
        API.$getConfig(res=>{
          console.log(res);
          this.hotwordList=res.body.hotwords;
        })
      },
      /**
       *  方法
       */
      methods: {
        goHotSearch:function (word) {
          this.query=word;
          this.searchList.push(this.query);
          UTIlS.pushObj("searchList", this.searchList);
          this.$router.push({name: 'searchResult', params: {'query':word}});
        },
        /*搜索框失焦事件*/
        blur:function () {
          if(!!this.query){
            this.searchList.push(this.query);
            UTIlS.pushObj("searchList", this.searchList);
          }

          this.$router.push({name: 'searchResult', params: {'query':this.query}});
        },
        /*删除一个历史记录*/
        removeItem: function(index) {
          this.searchList.splice(index, 1);
          UTIlS.pushObj("searchList", this.searchList);

        },
        /*清空历史*/
        clear_history:function () {
          this.query="";
          this.searchList=[];
          UTIlS.pushObj("searchList", this.searchList);
        },
        /*取消*/
        searchCanel:function () {
          this.query="";
          this.$router.push({name: 'searchResult', params: {'query':this.query}});
        }
      }

   }
</script>

<style lang="less">
   @import './search.less';
</style>
