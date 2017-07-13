<template>
  <div class="item"  @click="goDetail(item.productId)">
    <div class="item_top" v-text="item.prodName">
    </div>
    <div class="item_middle">

      <div v-for="el in item.tag">
        <div class="item-middle-mark"><span v-text="el.word"></span></div>
      </div>

    </div>
    <div class="item_bottom">
      <div class="bottom_column">
        <div class="column_value" v-text="item.yield">
        </div>
        <div class="column_key" v-text="item.yieldName">
        </div>
      </div>
      <div class="bottom_column">
        <div class="column_value" v-text="item.period">
        </div>
        <div class="column_key" v-text="item.periodName">
        </div>
      </div>
      <div  class="bottom_column">
        <div>
          <div  class="column_noLogin" v-show="item.rebate.word=='登录可见'" @click.stop.prevent="goLogin()" v-text="item.rebate.word">
          </div>
          <div  class="column_value" v-show="item.rebate.word!='登录可见'" v-text="item.rebate.word">
          </div>
        </div>

        <div class="column_key" v-text="item.rebateName">
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  @import './item.less';
</style>
<script>
    export default{
      props: ['item'],
        data(){
            return{
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

        /*去详情页*/
        goDetail:function (id) {
          this.$router.push({name: 'detail', params: {'productId':id}});
        }

      }


    }
</script>
