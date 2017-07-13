
import axios from 'axios'
import store from './index.js'
import * as UTIlS from '../common/utils'

//下面是测试环境配置
const API_HOST = "http://ydjr.dev.chengyiwm.com/goldman-api/";
const HOST = "http://ydjr.dev.chengyiwm.com/goldman-weixin/";
// 正式環境地質
// const HOST = "http://api.chengyiwm.com/api/";

function getAjaxHeader() {
	return {
		userId: UTIlS.getUserId(),
		skey: UTIlS.getSkey(),
		platform: "h5",
		imei: "",
		appVersion: "",
		cityId: "",
		platformVersion: "",
		deviceId: "",
		channel: "",
		protoVersion: 1,
		isPreview: 2
	};
};

/**
 * 发送网络请求 host为API_HOST
 */
export function postRequest(action, obj, successFun, errorFun) {

  var commonData = {
    head : getAjaxHeader(),//store.getters.getAjaxHeader
    body : obj
  };
	axios.post(API_HOST+ action, commonData)
	  .then(function (response) {
	    successFun(response.data);
	  })
	  .catch(function (error) {
	      console.log(error);
	    errorFun(error);
	   });
}

/**
 * 发送网络请求 host为API_HOST
 */
export function postRequestWeixin(action, obj, successFun, errorFun) {

  var commonData = {
    body : obj
  };
  axios.post(HOST+ action, commonData)
    .then(function (response) {
      successFun(response.data);
    })
    .catch(function (error) {
      console.log(error);
      errorFun(error);
    });
}


/*******************************************************************************
 * 微信获取code获取openId
 *
 * @param code
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $getOpenIdByCode(code,souceFun, errorFun) {
  postRequestWeixin("openUser/create", {
    "code":code,
  }, souceFun, errorFun);
};
/*******************************************************************************
 * 获取微信配置信息
 *
 * @param code
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $getWxConfig(url,souceFun, errorFun) {
  postRequestWeixin("tool/api/getWxConfig.do", {
    "url":url,
  }, souceFun, errorFun);
};


// -------------------------------------------一些常量
/** 产品的分类 */
export const CATEGORY_TYPE = [{dictId:1,name:"集合信托"},{dictId:2,name:"资管计划"},{dictId:4,name:"证券基金"},{dictId:16,name:"股权基金"},{dictId:128,name:"海外投资"}];//{dictId:8192,name:"精选产品"},

/*******************************************************************************
 * 用户登录
 *
 * @param tel
 *            电话号码
 * @param pwd
 *            密码
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $login(tel,pwd,souceFun, errorFun) {
    postRequest("login", {
        "mobile":tel,
        'pwd':pwd
    }, souceFun, errorFun);
};
/*******************************************************************************
 * 短信验证码下发
 *
 * @param tel
 *            电话号码
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $downVerifyCode(channel,tel,souceFun, errorFun) {
    postRequest("downVerifyCode", {
        'channel':channel,
        "mobile":tel
    }, souceFun, errorFun);
};

/*******************************************************************************
 * 用户注册
 *
 * @param tel
 *            电话号码
 * @param verifyCode
 *            验证码
 * @param pwd
 *            密码
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $register(nickName,tel,verifyCode,pwd,souceFun, errorFun) {
    postRequest("register", {
        "nickName":nickName,
        "mobile":tel,
        'verifyCode':verifyCode,
        'pwd':pwd
    }, souceFun, errorFun);
};
/********************************接口分装***********************************************
 * 用户找回密码
 *
 * @param tel
 *            电话号码
 * @param verifyCode
 *            验证码
 * @param pwd
 *            密码
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $findPwd(tel,verifyCode,pwd,souceFun, errorFun) {
    postRequest("findPwd", {
        "mobile":tel,
        'verifyCode':verifyCode,
        'pwd':pwd
    }, souceFun, errorFun);
};

/**
 * 获取产品产品-搜索建议词
 *
 * @param souceFun 成功回调
 * @param errorFun 失败回调
 */
export function $getSearchSug(query, souceFun, errorFun) {
	postRequest("getSearchSug", {
		'categoryId': "",
		'query': query
	}, souceFun, errorFun);
};
/*******************************************************************************
 * 获取产品列表信息
 *
 * @param souceFun 成功回调
 * @param errorFun 失败回调
 */
export function $getAppInfo(souceFun, errorFun){
    postRequest("getAppInfo", {}, souceFun, errorFun);
};
/*******************************************************************************
 * 获取产品列表
 *
 * @param start
 *            初始位置
 * @param pageSize
 *             页面个数
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $getProduct(start, pageSize,categoryId, sortId,filterId, query, souceFun, errorFun) {
    postRequest("getProduct", {
        'start' : start,
        'pageSize' : pageSize,
       'categoryId':categoryId,
       'sortId' : sortId,
        'filterId' : filterId,
        'query' : query
    }, souceFun, errorFun);
};
/*******************************************************************************
 * 获取首页banner列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $getAD( souceFun, errorFun) {
    postRequest("getAD", {}, souceFun, errorFun);
};
/*******************************************************************************
 * 获取搜索热词列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $getConfig( souceFun, errorFun) {
    postRequest("getConfig", {
      'configName':"searchHotWords"
    }, souceFun, errorFun);
};
/*******************************************************************************
 * 获取产品列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $getChoiceProduct( souceFun, errorFun) {
    postRequest("getChoiceProduct", {}, souceFun, errorFun);
};

/*******************************************************************************
 * 获取产品详情
 *
 * @param prodId
 *            产品id
 * @param platform
 *             产品平台
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $getProductDetail(prodId, souceFun, errorFun) {
    postRequest("getProductDetail", {
        'prodId' : prodId

    }, souceFun, errorFun);
};
/*******************************************************************************
 * 将文档转换成图片
 *
 * @param fromUrl
 *            文档的青牛地址
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $listByPdfToImg(fromUrl, souceFun, errorFun) {
    postRequest("listByPdfToImg", {
        'fromUrl' : fromUrl

    }, souceFun, errorFun);
};
/*******************************************************************************
 * 获取相关产品推荐
 * @param prodId
 *            产品id
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $getRelatedProduct(prodId, souceFun, errorFun) {
    postRequest("getRelatedProduct", {
        'prodId' : prodId,
    }, souceFun, errorFun);
};
/*******************************************************************************
 * 获取文档下载列表
 * @param prodId
 *            产品id
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $getProductDocument(prodId, souceFun, errorFun) {
    postRequest("getProductDocument", {
        'prodId' : prodId,
    }, souceFun, errorFun);
};
/*******************************************************************************
 * 产品资料发送到邮箱
 * @param prodId
 *            产品id
 * @param email
 *            邮箱
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $sendProductDocument(prodId,email, souceFun, errorFun) {
    postRequest("sendProductDocument", {
        'prodId' : prodId,
        'email' : email,
    }, souceFun, errorFun);
};
/*******************************************************************************
/**
 * 获取比较的产品列表
 */
export function $getCompareProductList(souceFun, errorFun){
    postRequest("getCompareProductList", {
    }, souceFun, errorFun);
}
/*******************************************************************************
/**
 * 获取对比的产品信息
 * @param prodId 产品id
 */
export function $getCompareProductData(prodId,souceFun, errorFun){
    postRequest("getCompareProductData", {
        "prodId":prodId
    }, souceFun, errorFun);
}
/*******************************************************************************
/**
 * 邮件分享
 * @param prodId 产品id
 * @param email 反馈邮箱
 */
export function $shareProductbyMail(prodId,email,souceFun, errorFun){
    postRequest("shareProductbyMail", {
        "prodId":prodId,
        "email":email
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 收藏
 * @param prodId 产品id
 */
export function $setBookmark(prodId,souceFun, errorFun){
    postRequest("setBookmark", {
        "prodId":prodId
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 取消收藏
 * @param prodId 产品id
 */
export function $clearBookmark(prodId,souceFun, errorFun){
    postRequest("clearBookmark", {
        "prodId":prodId
    }, souceFun, errorFun);
}

/*******************************************************************************
 /**
 * 获取收藏列表
 */
export function $getBookmarkProduct(start,souceFun, errorFun) {
    postRequest("getBookmarkProduct", {
        "start": start
    }, souceFun, errorFun);
}

/*******************************************************************************
 /**
 * 获取订单列表
 * @param start 起始位置
 * @param pageSize 页面个数
 * @param orderStatus 订单状态
 */
export function $searchOrder(start,pageSize,orderStatus,prodId,souceFun, errorFun) {
    postRequest("searchOrder", {
        "start": start,
        "pageSize": pageSize,
        "query": "",
        "order": {
            "orderStatus": orderStatus,
            "prodId": prodId,
        }
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 用户-获取信息
 */
export function $getUserInfo(souceFun, errorFun) {
    postRequest("getUserInfo", {}, souceFun, errorFun);
}

/*******************************************************************************
 /**
 * 用户-优惠券列表
 */
export function $getRebate(start,pageSize,couponType,souceFun, errorFun) {
    postRequest("coupon/list", {
      "start":start,
      "pageSize":pageSize,
      "couponType":couponType
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 用户-修改信息
 */
export function $modifyUserInfo(nickName,sex,email,souceFun, errorFun) {
    postRequest("modifyUserInfo", {
        "nickName":nickName,
        "sex":sex,
        "email":email,
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 用户-修改密码
 */
export function $modifyPwd(oldpwd,pwd,souceFun, errorFun) {
    postRequest("modifyPwd", {
        "oldpwd":oldpwd,
        "pwd":pwd
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 订单-获取交易记录列表
 */
export function $getOrderedProd(start,pageSize,opType,souceFun, errorFun) {
    postRequest("getOrderedProd", {
        start:start,
        "pageSize": pageSize,
        "opType": opType,
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 帐单-获取账单记录列表
 */
export function $getAccountDetailList(start,pageSize,beginTime,endTime,opType,souceFun, errorFun) {
    postRequest("getAccountDetailList", {
        "start":start,
        "pageSize": pageSize,
        "opType": opType,
        "beginTime": beginTime,
        "endTime": endTime,
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 *订单-删除
 * @param listOrderId 订单id
 *
 */
export function $deleteOrder(listOrderId,souceFun, errorFun) {
    postRequest("deleteOrder", {
        "listOrderId":[listOrderId]
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 地址-获取列表
 *
 */
export function $listAddress(souceFun, errorFun) {
    postRequest("listAddress", {}, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 地址-增加
 * @param address对象
 */
export function $addAddress(address,souceFun, errorFun) {
    postRequest("addAddress", {
        "address":address
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 地址-修改
 * @param address对象
 */
export function $updateAddress(address,souceFun, errorFun) {
    postRequest("updateAddress", {
        "address":address
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 地址-删除
 * @param addressId 地址id
 */
export function $deleteAddress(addressId,souceFun, errorFun) {
    postRequest("deleteAddress", {
        "address": {
            "addressId": addressId
        }
    }, souceFun, errorFun);
}



/*******************************************************************************
/**
 * 银行卡-获取列表
 */
export function $listBankCard(souceFun, errorFun) {
    postRequest("listBankCard", {}, souceFun, errorFun);
}
/*******************************************************************************
/**
 * 银行卡-设置默认
 * @param 银行卡id
 */
export function $setBankCardDefault(bankCardId,souceFun, errorFun) {
    postRequest("setBankCardDefault", {
        "bankCard": {
            "bankCardId": bankCardId
        }
    }, souceFun, errorFun);
}
/*******************************************************************************
/**
 * 银行卡-添加
 * @param 银行卡对象
 */
export function $addBankCard(bankCard,souceFun, errorFun) {
    postRequest("addBankCard", {
        "bankCard": bankCard
    }, souceFun, errorFun);
}
/*******************************************************************************
/**
 * 银行卡-删除
 * @param 银行卡id
 */
export function $deleteBankCard(bankCardId,souceFun, errorFun) {
    postRequest("deleteBankCard", {
        "bankCard": {
            "bankCardId":bankCardId
        }
    }, souceFun, errorFun);
}

/*******************************************************************************
 /**
 * 分享-获取分享列表
 */
export function $getProductShareList(souceFun, errorFun) {
    postRequest("getProductShareList", {}, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 分享-获取分享列表详情
 */
export function $getProductShareDetail(prodId,souceFun, errorFun) {
    postRequest("getProductShareDetail", {
        prodId:prodId
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 认证-获取信息
 */
export function $getAuthInfo(souceFun, errorFun) {
    postRequest("getAuthInfo", {}, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 认证-取消信息
 */
export function $cancelAuthInfo(souceFun, errorFun) {
    postRequest("cancelAuthInfo", {}, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 认证-上传信息
 * @param 上传对象
 */
export function $uploadAuthInfo(img,souceFun, errorFun) {
    postRequest("uploadAuthInfo", {
      "img": img,
      "industry": "",
      "remark": ""
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 用户反馈
 *@param feedbackobj 反馈信息对象
 */
export function $feedback(feedback,pic,contact,souceFun, errorFun) {
    postRequest("feedback", {
        "feedback": {
            "feedback": feedback,
            "pic": pic,
            "contact": contact
        },

    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 用户退出
 */
export function $logout(souceFun, errorFun) {
    postRequest("logout", {}, souceFun, errorFun);
}
/*******************************************************************************
 * 获取上传uptoken
 *
 * @param bucketName 存储在不同地方的bucket资源
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $getUploadFileSign (bucketName, souceFun, errorFun) {
    postRequest("/getUploadFileSign", {
        'bucketName' : bucketName,
        "uploadPlatform" : 1
    }, souceFun, errorFun);
};

//--------------------------------------------------------------------window.localStorage 保存对象 用户ID 昵称

export function pushObj(key,value){
    if(typeof value =="object"){
        window.localStorage.setItem(key,JSON.stringify(value));
        return ;
    }
    throw new error("value type is not object ");
}

export function fetchObj(key){
    var value = window.localStorage.getItem(key);
    if(!value){
        return [];
    }
    try{
        return JSON.parse(value);
    }catch(e){
        return [];
    }
}



export function setUserId(userId) {
    if(process.BROWSER) {
        window.localStorage.setItem("userId",userId);
        store.commit('SET_USER_ID', {userId})
    } else {
        store.commit('SET_USER_ID', {userId})
    }
}

// 获取当前用户登录的 userid
export function getUserId() {
   /* if(process.BROWSER) {
        return localStorage.getItem("userId")?localStorage.getItem("userId"):"";
    } else {
        return store.getters.getUserId;
    }*/
    if(store.state.login.data.userId==""){
        return "";
    }
    return store.state.login.data.userId;
}
/***set
   * 保存当前用户登录的 userName
   * @param type userName
   */
export function setUserName(userName) {
    /*if(process.BROWSER) {
        window.localStorage.setItem("userName",userName);
        store.commit('SET_USER_NAME', {userName})
    } else {
        store.commit('SET_USER_NAME', {userName})
    }*/
    if(store.state.login.data.userName==""){
        return "";
    }
    return store.state.login.data.userName;
}

// 获取当前用户登录的 userName
export function getUserName() {
    if(process.BROWSER) {
        return localStorage.getItem("userName")?localStorage.getItem("userName"):"";
    } else {
        return store.getters.getUserName;
    }
}
/***set
   * 保存当前用户登录的 skey
   * @param type skey
   */
export function setSkey(skey) {
    if(process.BROWSER) {
        window.localStorage.setItem("skey",skey);
        store.commit('SET_SKEY', {skey})
    } else {
        store.commit('SET_SKEY', {skey})
    }
}

// 获取当前用户登录的 Skey
export function getSkey() {
    if(process.BROWSER) {
        return localStorage.getItem("skey")?localStorage.getItem("skey"):"";
    } else {
        return store.getters.getSkey;
    }
}


export function clearUserData(callback){
    setUserId("");
    setSkey("");
    setUserName("");

    callback();




}
/**
 * 触发下载文件
 * @param fileName 文件名
 * @param url url
 */
export function downloadFile(fileName, url) {
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = fileName;
    aLink.click();


};
// -----------------------------------常用动画

// -----------------------------------合法性验证
//检查电话号new
export function checkTel(tel) {
    var reg = /^[1][3,4,5,8,7][0-9]{9}$/;
    return tel&& reg.test(tel);
}
export function checkTelAndPhone(tel) {
    var reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
    console.log(reg.test(tel));
    return tel&& reg.test(tel);
}

//检查密码new
export function checkPwd(pwd) {
    var reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[0-9A-Za-z]).{6,18}$/;
    return pwd&& reg.test(pwd);
}

//检查银行卡号
export function checkBankCard(bankcard) {
    var reg = /^(\d{16}|\d{19})$/;
    return bankcard&& reg.test(bankcard);
}

// 检查邮箱
export function checkEmail(email) {

    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]{2,4})+/;
   return email&&reg.test(email);
}

//检查验证码
export function checkVerifyCode(verifyCode) {
    var reg = /^\d{6}$/;

    return verifyCode&&reg.test(verifyCode);
}
//-----------公共方法--------------------------------
export function getDomById(id) {
    return document.getElementById(id);
}









