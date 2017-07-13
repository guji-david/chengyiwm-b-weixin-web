<template name="fade">
  <div>
    <cyheader :headTitle="headTitle"></cyheader>
    <div class="rebate">
      <div v-if="rebateList.length!=0">
        <div class="cell"  v-for="item in rebateList" :class="{sale_out:!!item.saleOut}">
          <div class="cell_up">
            <div class="cell_left">
              <div class="left_title" v-text="item.name"></div>
              <div class="left_time">有效期至<span v-text="item.endTime"></span> </div>
            </div>
            <div class="cell_right">
              <div style="color: #508cee;font-size: 20px;">￥<span class="right_count">{{item.amountMoney}}</span></div>
            </div>
          </div>

          <div class="cell_down" v-text="item.scope"></div>
        </div>
      </div>

      <div v-else="rebateList.length==0" class="cy_prod_null">
        <img src="../../assets/img/null.png" style=" width: 200px;margin: 0 auto; ">
      </div>
    </div>
  </div>



</template>

<script>
  import Vue from 'vue'
  import * as API from '../../store/api.js'
  import cyheader from '../../components/Cyheader/Cyheader.vue'

  export default {

    name: 'userRebate',
    components:{
      cyheader,
    },
    data() { //属性
      return {
        headTitle:"返佣礼券",
        start:0,
        pageSize:10,
        couponType:1,
        totalCount:0,
        rebateList:[
          {name:"邀请好友奖励",endTime:"2017-02-18",scope:"单笔认购额大于100万即可使用",amountMoney:100,saleOut:false},
          {name:"邀请好友奖励",endTime:"2017-02-18",scope:"单笔认购额大于100万即可使用",amountMoney:100,saleOut:true}
        ]
      }
    },
    /**
     * 初始化工作
     */
    mounted() {
      document.title ="返佣礼券_诚壹财富顾问";
      API.$getRebate(this.start,this.pageSize,this.couponType,res=> {
        if(res.head.ret==0){
          this.rebateList=res.body.list;
          this.totalCount=res.body.totalCount;
        }
        console.log(res);
      });

    },
    /**
     *  方法
     */
    methods: {



    },

  }
</script>

<style lang="less">
  @import './userRebate.less';
</style>
