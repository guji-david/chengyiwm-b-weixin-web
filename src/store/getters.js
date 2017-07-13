
/**
 * 获取终端设备类型
 * @param state
 */
// export const getDeviceStatus = state => state.common.device;

/**
 * 获得全局加载状态
 * @param state
 */
export const getLoading = state => state.loading.loading;

export const isLogin = state => state.loginStore.isLogin;

export const getUserName = state=> state.loginStore.data.userName;

export const getUserId = state=>state.loginStore.data.userId;

export const getSkey= state=> state.loginStore.data.skey;

/***
 * 获取当前的产品分类id
 * @param state State
 */
export const getActiveCategoryId = state=>{
  return state.categoryStore.activeCategoryId;
}

/***
 * ajax请求的通用头部信息
 * @param state
 * @returns {{userId: (*|string), skey: *, platform: string, imei: string, appVersion: string, cityId: string, platformVersion: string, deviceId: string, channel: string, protoVersion: number, isPreview: number}}
 */
export const getAjaxHeader = state =>{
  const userId = state.loginStore.data.userId
  const skey = state.loginStore.data.skey;
  const header = {
    userId: userId,
    skey: skey,
    platform: "pcweb",
    imei: "",
    appVersion: "",
    cityId: "",
    platformVersion: "",
    deviceId: "",
    channel: "",
    protoVersion: 1,
    isPreview: 2
  };
  return header;
}
