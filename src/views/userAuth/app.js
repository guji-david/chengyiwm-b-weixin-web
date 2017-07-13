import axios from 'axios'
import {UploaderBuilder} from "qiniu4js";

const HOST = "http://ydjr.dev.chengyiwm.com/goldman-api/";

function getAjaxHeader() {
  return {
    userId: 12079,
    skey: "6BD1B42461EE7D017491F993EC38E8E8",
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
};

export function postUpload(url, obj, successFun, errorFun) {
  var commonData = {
    head: getAjaxHeader(),
    body: obj
  };

  axios.post(HOST + url, commonData)
    .then(function (response) {
      successFun(response.data);
    })
    .catch(function (error) {
      console.log(error);

      // errorFun(error);
    });
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
  export function $getUploadFileSign(bucketName, souceFun, errorFun) {
    postUpload("getUploadFileSign", {
      'bucketName' : bucketName,
      "uploadPlatform" : 1
    }, souceFun, errorFun);
  };




export function $QiniuUpLoad(buketname,callBack) {
  //构建 uploader 实例
  let uploader = new UploaderBuilder()
    .debug(true)//开启 debug ，默认 false
    .retry(0)//设置重传次数，默认 0 ，不重传
    .auto(true)//选中文件后立即上传，默认 true
    .multiple(true)//是否支持多文件选中，默认 true
    .accept([])//过滤文件，默认无，详细配置见 http://www.w3schools.com/tags/att_input_accept.asp
    .tokenShare(false)//在一次上传队列中，是否分享 token,如果为 false 每上传一个文件都需要请求一次 Token ，默认 true
    .tokenFunc(function (setToken, task) {
      //token 获取函数， token 获取完成后，必须调用`setToken(token);`不然上传任务不会执行。
      setTimeout(function () {
        var fun =$getUploadFileSign(buketname, function (res) {
          var uptoken = "";
          console.table(res);
          console.log("res.body.uptoken--------->"+JSON.stringify(res.body.uptoken));
          uptoken = res.body.uptoken;
          setToken(uptoken);
        });
      }, 1000);
    }).listener({
      onReady(tasks) {
        //选择上传文件确定后,该生命周期函数会被回调。
        console.log("onReay");
      }, onStart(tasks){
        //开始上传
        console.log("onStart");

      }, onTaskGetKey(task){
        //为每一个上传的文件指定 key,如果不指定则由七牛服务器自行处理
        console.log("onTaskGetKey"+JSON.stringify(task));

        //  return "test.png";

      }, onTaskProgress: function (task) {
        //每一个任务的上传进度,通过`task.progress`获取
        console.log("onTaskProgress"+task);

      }, onTaskSuccess(task){
        //一个任务上传成功后回调
        console.log("onTaskSuccess"+JSON.stringify(task));

      }, onTaskFail(task) {
        //一个任务在经历重传后依然失败后回调此函数
        console.log("onTaskFail"+JSON.stringify(task));

      }, onTaskRetry(task) {
        //开始重传
        console.log("onTaskRetry"+task);

      }, onFinish(task){
        //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有 HTTP 上传请求响应后回调(包括重传请求)。
        console.log("onFinish");
        callBack(task);
      }
    }).build();

  return uploader;
}
