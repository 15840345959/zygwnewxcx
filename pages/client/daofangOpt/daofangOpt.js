// pages/client/daofangOpt/daofangOpt.js
var util = require('../../../utils/util.js')
const qiniuUploader = require("../../../utils/qiniuUploader");

//获取应用实例
var app = getApp()
var page = 0    //列表页码计数
var vm = null

//报备信息
var baobei = {};

//七牛上传token
// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: 'ECN', // 华东区
    uptoken: qnToken
  };
  qiniuUploader.init(options);
}

var qnToken = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baobei: {},
    visit_date: util.getToday(),
    visit_time: util.getCurrentTime(),
    start: util.getToday(),
    end: util.getToday(),
    //timestart: util.getCurrentTime(),
    //timeend: util.getCurrentTime(),
    visit_attach: "" //到访附件
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
   console.log(JSON.stringify(options));
    var jsonStr = options.jsonStr;
    var obj = JSON.parse(options.jsonStr);
    // var stringtime = plan_visit_time
    // var date =new Date(stringtime)
    // var timestamp=Data.parse(date)/1000+108000
    // var date = new Date(timestamp)
    // console.log("timestamp",date);
   console.log("obj:" + JSON.stringify(obj))
    baobei = obj;
    vm.setData({
      baobei: baobei
    })
    //获取七牛token
    util.getQiniuToken({}, function (ret) {
      if (ret.data.code = "200" && ret.data.result) {
        qnToken = ret.data.ret;
        //初始化七牛
        initQiniu();
      }
    }, function (ret) { });
  },

  //设置到访日期
  setVisitDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      visit_date: e.detail.value
    })
  },
  //设置到访时间
  setVisitTime: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      visit_time: e.detail.value
    })
  },

  //选择图片
  chooseImage: function (e) {
    var param = {
      count: 1,
      sourceType: ['album', 'camera']
    }
    util.chooseImage(param, function (ret) {
      console.log("chooseImage ret:" + JSON.stringify(ret))
      var file_path = ret.tempFilePaths[0]; //获取图片
      //进行七牛上传
      qiniuUploader.upload(file_path, (res) => {
        console.log("qiniuUploader upload res:" + JSON.stringify(res));
        var img_qn_url = util.getImgRealUrl(res.key);
        vm.setData({
          visit_attach: img_qn_url
        })
      }, (error) => {
        console.error('error: ' + JSON.stringify(error));
      });
    }, null, null);
  },
  //保存到访状态
  saveOpt: function (e) {
    console.log("saveOpt e:" + JSON.stringify(e))
    var param = {
      id: baobei.id,
      visit_time: vm.data.visit_date + " " + vm.data.visit_time,
      //visit_time: vm.data.visit_time,
      visit_attach: vm.data.visit_attach
    }
    //如果没有上传照片
    if (util.judgeIsAnyNullStr(param.visit_attach)) {
      util.showModal("保存失败", "请上传客户到访登记单", null, null);
      return;
    }
    util.setBaobeiDaofang(param, function (ret) {
      //返回成功
      if (ret.data.code == "200" && ret.data.result) {
        util.showToast("成功到访");
        util.navigateBack(1);
      } else {
        util.showModal("到访失败", ret.data.message, function (ret) { }, function (ret) { });
      }
      console.log("setBaobeiDaofang",JSON.stringify(ret))
    }, null);

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})