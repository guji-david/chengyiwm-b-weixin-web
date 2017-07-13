/**
 * @author zst@chengyiwm.com
 * @since 2016-11-22 10:33:03
 */
import Vue from 'vue'
import store from './../index.js'
import * as API from './../api'

const state = {
	activeCacheKey: '', // 当前显示的产品分类
	productLists: { /* [category: number]: Item */ },
}


// 产品缓存的前缀
const PRODUCT_CACHE_PREFIX = 'FETCH_PRODUCT_LIST - ';
/**
 * 根据各种查询属性生成产品列表的缓存key
 */
function getCacheKey(start, pageSize, sortId, categoryId, filterId, query) {
	return PRODUCT_CACHE_PREFIX + start + pageSize + sortId + categoryId + filterId + query + store.getters.isLogin
}

const actions = {

	/**
	 * 获取产品列表
	 *
	 * 有缓存直接输出，
	 * 没缓存调用api请求，并加入缓存
	 */
	FETCH_PRODUCT_LIST: ({commit,dispatch,state}, {start, pageSize, sortId, categoryId, filterId, query}) => {
		// var cacheKey = getCacheKey(start, pageSize, sortId, categoryId, filterId, query);
		// commit('SET_ACTIVE_CACHEKEY', {cacheKey});
		const {activeCacheKey, productLists} = state;
		console.log("activeCacheKey = " + activeCacheKey);

    API.$getProduct(start, pageSize, sortId, categoryId, filterId, query,function (res) {
      commit('SET_PRODUCT_LIST', {
        // cacheKey:cacheKey,
        res:res.body.productList
      })
      // console.log(JSON.stringify(res));
    })
      /*.then(function(res) {

        console.log(res);
      }).catch(error => console.log(error));*/

		/*if(productLists[cacheKey]) {
			return Promise.resolve(productLists[cacheKey]);
		} else {
			return API.$getProduct(start, pageSize, sortId, categoryId, filterId, query)
				.then(function(res) {
					commit('SET_PRODUCT_LIST', {
						cacheKey:cacheKey,
						res:res
					})
				})
				.catch(error => console.log(error));
		}*/

	}
}

const mutations = {
	/**
	 * 设置当前激活的产品id
	 */
	SET_ACTIVE_CACHEKEY: (state, {cacheKey}) => {
		state.activeCacheKey = cacheKey
	},
	/**
	 * 缓存产品列表
	 */
	SET_PRODUCT_LIST: (state, {cacheKey, res}) => {
    // console.log("11111111"+JSON.stringify(state.productLists));
		Vue.set(state.productLists, cacheKey, res)
    // console.log("2222222"+JSON.stringify(state.productLists));
	}
}
const getters = {
	/**
	 * 获取当前缓存的产品列表
 	 */
	activeProductList(state, getters) {
		const {productLists} = state;
    console.log("productLists---------->"+JSON.stringify(state.productLists));
    return state.productLists;
	/*	if(activeCacheKey && productLists[activeCacheKey] && productLists[activeCacheKey].body) {
			return productLists[activeCacheKey];
		} else {
			return {
				"head": {
					"ret": 0,
					"msg": "ok",
					"cmd": "getAppInfo"
				},
				"body": {
					list:[]
				}
			}
		}*/
	}
}



export default {
  state,
  actions,
  mutations,
  getters
}
