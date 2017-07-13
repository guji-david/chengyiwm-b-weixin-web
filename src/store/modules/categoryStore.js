/**
 * @author zst@chengyiwm.com
 * @since 2016-11-22 10:33:03
 */
import Vue from 'vue'
import * as API from '../api'

/**
 * 重置筛选项
 */
function cleanFilterLists(cleanList) {
  cleanList.forEach(function(filter) {
    filter.child.forEach(function(childFilter) {
      if(childFilter.name == "全部") {
        childFilter.sel = true;
      } else {
        childFilter.sel = false;
      }
    });
  });
}


const state = {
  // 设置当前激活的产品分类id
  activeCategoryId: 1,
  // 产品分类列表
  categoryList: [{"dictId":8192,"name":"精选热销","filterList":[],"sortList":[]},{"dictId":1,"name":"集合信托","filterList":[{"name":"投资期限","sortIndex":0,"dictId":8204,"child":[{"name":"全部","sortIndex":0,"dictId":8210,"child":null},{"name":"<12个月","sortIndex":1,"dictId":8211,"child":null},{"name":"12个月","sortIndex":2,"dictId":8212,"child":null},{"name":"13-23个月","sortIndex":3,"dictId":8213,"child":null},{"name":"24个月","sortIndex":4,"dictId":8214,"child":null},{"name":">24个月","sortIndex":5,"dictId":8215,"child":null}]},{"name":"募集状态","sortIndex":1,"dictId":8205,"child":[{"name":"全部","sortIndex":0,"dictId":8216,"child":null},{"name":"预热","sortIndex":1,"dictId":8217,"child":null},{"name":"在售","sortIndex":2,"dictId":8218,"child":null},{"name":"售罄","sortIndex":3,"dictId":8219,"child":null}]},{"name":"投资起点","sortIndex":2,"dictId":8206,"child":[{"name":"全部","sortIndex":0,"dictId":8220,"child":null},{"name":"≤100万","sortIndex":1,"dictId":8221,"child":null},{"name":"101-300万","sortIndex":2,"dictId":8222,"child":null},{"name":">300万","sortIndex":3,"dictId":8223,"child":null}]},{"name":"预期收益","sortIndex":3,"dictId":8207,"child":[{"name":"全部","sortIndex":0,"dictId":8224,"child":null},{"name":"≤6%","sortIndex":1,"dictId":8225,"child":null},{"name":"6%-7%","sortIndex":2,"dictId":8226,"child":null},{"name":"7%-8%","sortIndex":3,"dictId":8227,"child":null},{"name":">8%","sortIndex":4,"dictId":8228,"child":null}]},{"name":"返佣比例","sortIndex":4,"dictId":8208,"child":[{"name":"全部","sortIndex":0,"dictId":8229,"child":null},{"name":"≤0.4%","sortIndex":1,"dictId":8230,"child":null},{"name":"0.4%-0.8%","sortIndex":2,"dictId":8231,"child":null},{"name":"0.8%-1%","sortIndex":3,"dictId":8232,"child":null},{"name":">1%","sortIndex":4,"dictId":8233,"child":null}]},{"name":"发行机构","sortIndex":5,"dictId":8209,"child":[{"name":"全部","sortIndex":0,"dictId":8234,"child":null},{"name":"中融信托","sortIndex":1,"dictId":8235,"child":null},{"name":"四川信托","sortIndex":2,"dictId":8236,"child":null},{"name":"新时代信托","sortIndex":3,"dictId":8237,"child":null},{"name":"中江信托","sortIndex":4,"dictId":8238,"child":null},{"name":"光大信托","sortIndex":6,"dictId":8240,"child":null},{"name":"国民信托","sortIndex":7,"dictId":8241,"child":null}]}],"sortList":[{"name":"返佣从高到低","sortIndex":1,"dictId":8193,"child":null},{"name":"收益从高到低","sortIndex":2,"dictId":8194,"child":null},{"name":"期限从短到长","sortIndex":3,"dictId":8195,"child":null}]},{"dictId":2,"name":"资管计划","filterList":[{"name":"募集状态","sortIndex":0,"dictId":8257,"child":[{"name":"全部","sortIndex":0,"dictId":8263,"child":null},{"name":"预热","sortIndex":1,"dictId":8264,"child":null},{"name":"在售","sortIndex":2,"dictId":8265,"child":null},{"name":"售罄","sortIndex":3,"dictId":8266,"child":null}]},{"name":"投资期限","sortIndex":1,"dictId":8258,"child":[{"name":"全部","sortIndex":0,"dictId":8267,"child":null},{"name":"<12个月","sortIndex":1,"dictId":8268,"child":null},{"name":"12个月","sortIndex":2,"dictId":8269,"child":null},{"name":"13-23个月","sortIndex":2,"dictId":8270,"child":null},{"name":"24个月","sortIndex":3,"dictId":8271,"child":null},{"name":">24个月","sortIndex":4,"dictId":8272,"child":null}]},{"name":"投资起点","sortIndex":2,"dictId":8259,"child":[{"name":"全部","sortIndex":0,"dictId":8273,"child":null},{"name":"≤100万","sortIndex":1,"dictId":8274,"child":null},{"name":"101-300万","sortIndex":2,"dictId":8275,"child":null},{"name":">300万","sortIndex":3,"dictId":8276,"child":null}]},{"name":"预期收益","sortIndex":3,"dictId":8260,"child":[{"name":"全部","sortIndex":0,"dictId":8277,"child":null},{"name":"≤6%","sortIndex":1,"dictId":8278,"child":null},{"name":"6%-7%","sortIndex":2,"dictId":8279,"child":null},{"name":"7%-8%","sortIndex":3,"dictId":8280,"child":null},{"name":">8%","sortIndex":4,"dictId":8281,"child":null}]},{"name":"返佣比例","sortIndex":4,"dictId":8261,"child":[{"name":"全部","sortIndex":0,"dictId":8288,"child":null},{"name":"≤0.4","sortIndex":1,"dictId":8289,"child":null},{"name":"0.4%-0.8%","sortIndex":2,"dictId":8290,"child":null},{"name":"0.8%-1%","sortIndex":3,"dictId":8291,"child":null},{"name":">1%","sortIndex":4,"dictId":8292,"child":null}]}],"sortList":[{"name":"返佣从高到低","sortIndex":1,"dictId":8196,"child":null},{"name":"收益从高到低","sortIndex":2,"dictId":8197,"child":null},{"name":"期限从短到长","sortIndex":3,"dictId":8198,"child":null}]},{"dictId":4,"name":"证券基金","filterList":[{"name":"募集状态","sortIndex":0,"dictId":8293,"child":[{"name":"全部","sortIndex":0,"dictId":8303,"child":null},{"name":"初始销售中","sortIndex":1,"dictId":8304,"child":null},{"name":"募集中","sortIndex":2,"dictId":8305,"child":null}]},{"name":"投资起点","sortIndex":1,"dictId":8294,"child":[{"name":"全部","sortIndex":0,"dictId":8307,"child":null},{"name":"≤100万","sortIndex":1,"dictId":8308,"child":null},{"name":"101-300万","sortIndex":2,"dictId":8309,"child":null},{"name":">300万","sortIndex":2,"dictId":8310,"child":null}]},{"name":"基金类型","sortIndex":4,"dictId":8297,"child":[{"name":"全部","sortIndex":0,"dictId":8319,"child":null},{"name":"股票策略","sortIndex":1,"dictId":8320,"child":null},{"name":"债券策略","sortIndex":2,"dictId":8321,"child":null},{"name":"复合策略","sortIndex":3,"dictId":8322,"child":null},{"name":"宏观策略","sortIndex":4,"dictId":8323,"child":null},{"name":"事件驱动","sortIndex":5,"dictId":8324,"child":null},{"name":"管理期货","sortIndex":6,"dictId":8325,"child":null},{"name":"组合基金","sortIndex":7,"dictId":8326,"child":null},{"name":"相对价值","sortIndex":8,"dictId":8327,"child":null}]},{"name":"基金经理","sortIndex":5,"dictId":8298,"child":[{"name":"全部","sortIndex":0,"dictId":8328,"child":null},{"name":"辛宇","sortIndex":1,"dictId":8387,"child":null},{"name":"张弢","sortIndex":8,"dictId":8394,"child":null},{"name":"朱南松","sortIndex":10,"dictId":8396,"child":null},{"name":"张云逸","sortIndex":11,"dictId":8397,"child":null},{"name":"刘强","sortIndex":12,"dictId":8398,"child":null},{"name":"陈家琳","sortIndex":13,"dictId":8399,"child":null},{"name":"王益聪","sortIndex":15,"dictId":8400,"child":null},{"name":"施振星","sortIndex":16,"dictId":8401,"child":null},{"name":"孔为民","sortIndex":18,"dictId":8403,"child":null},{"name":"裘国根","sortIndex":19,"dictId":8404,"child":null}]},{"name":"管理机构","sortIndex":6,"dictId":8299,"child":[{"name":"全部","sortIndex":0,"dictId":8300,"child":null},{"name":"华夏未来","sortIndex":4,"dictId":8368,"child":null},{"name":"元葵资产","sortIndex":15,"dictId":8379,"child":null},{"name":"双隆投资","sortIndex":17,"dictId":8381,"child":null},{"name":"雁丰投资","sortIndex":18,"dictId":8382,"child":null},{"name":"重阳投资","sortIndex":19,"dictId":8383,"child":null},{"name":"丰岭资本","sortIndex":21,"dictId":8385,"child":null},{"name":"涌峰投资","sortIndex":22,"dictId":8386,"child":null}]}],"sortList":[{"name":"返佣从高到低","sortIndex":1,"dictId":8199,"child":null},{"name":"累计收益从高到低","sortIndex":2,"dictId":8200,"child":null},{"name":"回撤从小到大","sortIndex":3,"dictId":8201,"child":null}]},{"dictId":16,"name":"股权基金","filterList":[{"name":"投资期限","sortIndex":0,"dictId":8330,"child":[{"name":"全部","sortIndex":0,"dictId":8334,"child":null},{"name":"<2年","sortIndex":1,"dictId":8335,"child":null},{"name":"2-4年","sortIndex":2,"dictId":8336,"child":null},{"name":">4年","sortIndex":3,"dictId":8337,"child":null}]},{"name":"投资起点","sortIndex":1,"dictId":8331,"child":[{"name":"全部","sortIndex":0,"dictId":8338,"child":null},{"name":"≤100万","sortIndex":1,"dictId":8339,"child":null},{"name":"101-300万","sortIndex":2,"dictId":8340,"child":null},{"name":">300万","sortIndex":3,"dictId":8341,"child":null}]},{"name":"基金类型","sortIndex":2,"dictId":8332,"child":[{"name":"全部","sortIndex":0,"dictId":8342,"child":null},{"name":"天使基金","sortIndex":1,"dictId":8343,"child":null},{"name":"成长基金","sortIndex":2,"dictId":8344,"child":null},{"name":"产业基金","sortIndex":3,"dictId":8345,"child":null},{"name":"创新基金","sortIndex":4,"dictId":8346,"child":null}]},{"name":"返佣比例","sortIndex":3,"dictId":8333,"child":[{"name":"全部","sortIndex":0,"dictId":8347,"child":null},{"name":"<1%","sortIndex":1,"dictId":8348,"child":null},{"name":"1%","sortIndex":2,"dictId":8349,"child":null},{"name":">1%","sortIndex":3,"dictId":8350,"child":null}]}],"sortList":[{"name":"返佣从高到低","sortIndex":1,"dictId":8202,"child":null},{"name":"存续期从短到长","sortIndex":2,"dictId":8203,"child":null}]},{"dictId":128,"name":"海外投资","filterList":[],"sortList":[]}]
}


const actions = {

  /**
   * 获取产品分类列表
   *
   * 有缓存直接输出，
   * 没缓存调用api请求，并加入缓存
   */
  FETCH_CATEGORY_LIST: ({commit,dispatch,state}) => {
    const {categoryList} = state
    API.$getAppInfo()
      .then(function(res) {
        let categoryList = res.body.categoryList;
        commit('SET_CATEGORY_LIST', {
          categoryList: categoryList
        })
      })


  },

  /**
   * 缓存产品分类列表
   */
  SET_CATEGORY_ID:({commit}, {data}) => {
    // console.log("SET_ACTIVE_CATEGORYID = " + data);
    commit("SET_ACTIVE_CATEGORYID", {data:data})
  }
}

const mutations = {
  /**
   * 缓存产品分类列表
   */
  SET_CATEGORY_LIST: (state, {categoryList}) => {
    state.categoryList = categoryList;
  },


  SET_ACTIVE_CATEGORYID (state, { data }) {
    state.activeCategoryId = data;
  }
}

const getters = {
  // 获取当前缓存的产品列表
  categoryList(state, getters) {
    const {activeCategoryId, categoryList} = state
    return categoryList;
  },

  /**
   *  获取具体某一个产品分类的排序列表
   */
  categorySortList(state, getters) {
    const {activeCategoryId, categoryList} = state

    if(categoryList.length != 0) {
      var list = categoryList;
      for(var i = 0, length = list.length; i < length; i++) {
        if(list[i].dictId == activeCategoryId) {
          return list[i].sortList;
        }
      }
    }
    return [];
  },
  /**
   * 获取具体某一个产品分类的筛选列表
   */
  categoryFilterList(state, getters) {
    const {activeCategoryId, categoryList} = state;
    if(categoryList && categoryList.length != 0) {
      var list = categoryList;
      for(var i = 0, length = list.length; i < length; i++) {
        if(list[i].dictId == activeCategoryId) {
          cleanFilterLists(list[i].filterList)
          return list[i].filterList;
        }
      }
    }
    // return [];
  },

  /**
   * 获取具体某一个产品分类的名称
   */
  categoryName(state, getters) {
    const {activeCategoryId, categoryList} = state
    if(categoryList.length != 0) {
      var list = categoryList;
      for(var i = 0, length = list.length; i < length; i++) {
        if(list[i].dictId == activeCategoryId) {
          return list[i].name;
        }
      }
    }
    return [];
  }
}


export default {
  state,
  actions,
  mutations,
  getters
}
