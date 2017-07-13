import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import createLogger from '../plugins/logger'

import  loading from 'src/store/modules/loading'
import productListStore from './modules/productListStore'
import loginStore from './modules/loginStore'
import categoryStore from './modules/categoryStore'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 1;



export default new Vuex.Store({
  actions,
  getters,
  modules: {
    loading,
    productListStore,
    loginStore,
    categoryStore,
  },
  /*strict: debug,*/
  plugins: debug ? [createLogger()] : []
})
