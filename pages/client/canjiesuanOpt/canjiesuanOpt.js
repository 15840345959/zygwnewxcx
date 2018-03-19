// pages/client/canJiesuanOpt/canJiesuanOpt.js
var util = require('../../../utils/util.js')

//获取应用实例
var app = getApp()
var page = 0    //列表页码计数
var vm = null

//报备信息
var baobei = {};

Page({

  /**
  * 页面的初始数据
  */
  data: {
    baobei: {},
    canJiesuan_date: util.getToday(),
    canJiesuan_time: util.getCurrentTime(),
    start: util.getToday(),
    end: util.getToday(),
    timeend: util.getCurrentTime(),
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    vm = this;
    console.log(JSON.stringify(options));
    var jsonStr = options.jsonStr;
    var obj = JSON.parse(options.jsonStr);
    console.log("obj:" + JSON.stringify(obj))
    baobei = obj;
    vm.setData({
      baobei: baobei
    })
  },

  //设置到访日期
  setCanJiesuanDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      canJiesuan_date: e.detail.value
    })
  },
  //设置到访时间
  setCanJiesuanTime: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      canJiesuan_time: e.detail.value
    })
  },

  //设置可结算状态
  saveOpt: function (e) {
    console.log("saveOpt e:" + JSON.stringify(e))
    var param = {
      id: baobei.id,
      can_jiesuan_time: vm.data.canJiesuan_date + " " + vm.data.canJiesuan_time,
    }
    util.setBaobeiCanJiesuan(param, function (ret) {
      //返回成功
      if (ret.data.code == "200" && ret.data.result) {
        util.showToast("设置成功");
        util.navigateBack(1);
      } else {
        util.showModal("结算失败", ret.data.message, function (ret) { }, function (ret) { });
      }
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