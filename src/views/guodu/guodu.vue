<template name="fade">
  <div class="guodu">
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="item in list">{{ item }}</li>
    </ul>
  </div>

</template>

<script>
  var appconfig = {
    "htmlhost":"http://ydjr.dev.chengyiwm.com",
    "host": "http://ydjr.dev.chengyiwm.com",
    "appId":"wxb3591d1255bd7cdf",
    "apihost":"http://ydjr.dev.chengyiwm.com/goldman-api"
  }


  import * as API from '../../store/api.js'
  import * as UTIlS from '../../common/utils'

  import { InfiniteScroll } from 'mint-ui';

  import Vue from 'vue'
  Vue.use(InfiniteScroll);

  export default {
    data() {
      return {
        loading:false,
        list:[1]
      };
    },
    /**
     * 初始化工作
     */
    mounted() {
      this.weixinDeal();
    },
    methods: {

      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
        }, 2500);
      },

      // 来自微信做相应授权处理
      /**
       * 1.1 ：获取code
       * @param
       */
      weixinDeal: function () {
        alert("getOpenId()---encodeURI-->"+UTIlS.getOpenId());
        if (!UTIlS.getOpenId()) {
          var code = this.$route.params.code;
          alert("code111----->"+code);
          if (!code) {
            var weixinUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appconfig.appId;
            var encodeURIStr =encodeURI(appconfig.htmlhost);
            var drawAwardUrl = weixinUrl + "&redirect_uri=" + encodeURIStr+ "&response_type=code&scope=snsapi_userinfo#wechat_redirect";
            alert("drawAwardUrl----->"+drawAwardUrl);
            window.location.href = drawAwardUrl;
          } else {
            alert("code222----->"+code);
            // 通过code获取openId和userid
            API.$getOpenIdByCode(code,res=>{
              alert(res);
            })

          }
        } else {
          alert("code333----->"+code);
        }
      },
    },
  };
</script>

<style lang="less">


</style>
