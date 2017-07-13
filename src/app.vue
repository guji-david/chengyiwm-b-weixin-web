/*
* @Author: henry yan
* @Date:   2016-10-19 16:47:00
* @Last Modified by:   henry yan
* @Last Modified time: 2016-10-19 16:47:00
* @describe
* 根组件，主要用于引入全局的css和js
*/
<template>
  <div style="overflow-x: hidden">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <cloading v-show='getLoading'></cloading>
  </div>
</template>

<script>
  import {mapGetters, mapActions } from 'vuex';
//  import attachFastclick from 'fastclick';
  import cloading from 'components/loading/index.js'

  export default {
    components: {
      cloading
    },
    created () {
      /*this.$store.dispatch('getDevicetype');*/
      this.updateLoading(false);
    },
    mounted () {
//      attachFastclick.attach(window.document.body);
    },
    computed: mapGetters([
      'getLoading'
    ]),
    methods: mapActions([
      'updateLoading'
    ]),

  }

</script>
<style>
  @import './assets/css/global.less';
</style>


