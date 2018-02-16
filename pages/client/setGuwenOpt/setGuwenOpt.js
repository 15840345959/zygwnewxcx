// pages/client/setGuwenOpt/setGuwenOpt.js
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
    hidden: "hidden",
    baobei: {},
    guwens: [],
    guwen_index: 0,
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
    vm.getZYGWsByHouseId(baobei.house_id);
  },

  //根据楼盘id获取置业顾问列表
  getZYGWsByHouseId: function (house_id) {
    var param = {
      house_id: house_id
    }
    util.getZYGWsByHouseId(param, function (ret) {
      if (ret.data.code == "200" && ret.data.result) {
        var msgObj = ret.data.ret;
        vm.setData({
          guwens: msgObj,
          hidden: ""
        });
      }
    }, null);
  },

  //设置置业顾问
  setGuwenOption: function (e) {
    console.log("setGuwenOption e:" + JSON.stringify(e));
    vm.setData({
      guwen_index: e.detail.value,
    })
  },

  //点击保存
  saveOpt: function (e) {
    console.log("saveOpt e:" + JSON.stringify(e))
    var param = {
      id: baobei.id,
      guwen_id: vm.data.guwens[vm.data.guwen_index].id
    }
    util.setZYGW(param, function (ret) {
      //返回成功
      if (ret.data.code == "200" && ret.data.result) {
        util.showToast("报备成功");
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