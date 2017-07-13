import localStore from '../../common/store.min.js';

const state = {
  data:"",
  isLogin:false
}

// mutations
const mutations = {
  /***
   * 保存已登录状态的信息
   * @param state 登录状态state
   * @param data 用户信息bean
     */
  SET_LOGIN (state, { data }) {
    // 传的空数据，直接放弃登录
    if (!data.userId) {
      return;
    }
    state.data =  {
      userId: data.userId,
      skey: data.skey,
      userName: data.userName,
      tel:data.tel,
    };
    state.isLogin = true;
  },
  /**
   * 退出清空信息
   * @param state
   * @param result
     */
  EXIT_LOGIN (state, { result }) {
    state.data = {};
    state.isLogin = false;
    localStore.set("user", {});
  }
}

const actions = {
  /***
   * 初始化登录信息
   * @param commit
   * @param data
     */
  initializeState: ({commit}, {data})=> {
    commit("SET_LOGIN", {data:data})
  },
  /***
   * 退出
   * @param commit
   * @param data
     */
  EXIT_LOGIN: ({commit}, {data})=> {
    commit("EXIT_LOGIN", {data:""})
  }
}

export default {
  state,
  actions,
  mutations
}
