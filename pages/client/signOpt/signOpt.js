// pages/client/signOpt/signOpt.js
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
    sign_date: util.getToday(),
    sign_time: util.getCurrentTime(),
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
  setSignDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      sign_date: e.detail.value
    })
  },
  //设置到访时间
  setSignTime: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      sign_time: e.detail.value
    })
  },

  //设置可结算状态
  saveOpt: function (e) {
    console.log("saveOpt e:" + JSON.stringify(e))
    var param = {
      id: baobei.id,
      sign_time: vm.data.sign_date + " " + vm.data.sign_time,
    }
    util.setBaobeiSign(param, function (ret) {
      //返回成功
      if (ret.data.code == "200" && ret.data.result) {
        util.showToast("设置成功");
        util.navigateBack(1);
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