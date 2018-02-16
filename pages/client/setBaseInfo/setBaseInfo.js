// pages/client/setBaseInfo/setBaseInfo.js

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
    options: {},   //报备选项
    address: "", //住址
    size: "",  //意向面积
    remark: "", //备注
    care_index: 0,
    area_index: 0,
    purpose_index: 0,
    know_way_index: 0,
    hidden: "hidden",  //隐藏页面
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
    vm.getBaobeiOption();  //获取报备信息
  },

  //获取报备相关选项
  getBaobeiOption: function (e) {
    util.getBaobeiOption({}, function (ret) {
      console.log("getBaobeiOption ret:" + JSON.stringify(ret))
      if (ret.data.code == "200" && ret.data.result) {
        var msgObj = ret.data.ret;
        vm.setData({
          options: msgObj
        })
        console.log("options :" + JSON.stringify(vm.data.options.areas));
        //设置值
        vm.setData({
          address: baobei.address,
          size: baobei.size,
          remark: baobei.remark,
          area_index: util.getArrIndexById(vm.data.options.areas, baobei.area_id),
          purpose_index: util.getArrIndexById(vm.data.options.buy_purposes, baobei.purpose_id),
          care_index: util.getArrIndexById(vm.data.options.client_cares, baobei.care_id),
          know_way_index: util.getArrIndexById(vm.data.options.know_ways, baobei.way_id),
          hidden: "", //显示页面
        })
      }
    }, function (ret) { })
  },
  //选择区域
  setAreaOption: function (e) {
    console.log("setAreaOption e:" + JSON.stringify(e));
    vm.setData({
      area_index: e.detail.value,
    })
  },
  //选择认知途径
  setKnowWayOption: function (e) {
    console.log("setKnowWayOption e:" + JSON.stringify(e));
    vm.setData({
      know_way_index: e.detail.value,
    })
  },
  //选择购买目的
  setPurposeOption: function (e) {
    console.log("setPurposeOption e:" + JSON.stringify(e));
    vm.setData({
      purpose_index: e.detail.value,
    })
  },
  //选择关注内容
  setCareOption: function (e) {
    console.log("setCareOption e:" + JSON.stringify(e));
    vm.setData({
      care_index: e.detail.value,
    })
  },
  //设置地址
  inputAddress: function (e) {
    console.log("inputAddress e:" + JSON.stringify(e));
    this.setData({
      address: e.detail.value
    })
  },
  //设置意向面积
  inputSize: function (e) {
    console.log("inputSize e:" + JSON.stringify(e));
    this.setData({
      size: e.detail.value
    })
  },
  //设置备注
  inputRemark: function (e) {
    console.log("inputRemark e:" + JSON.stringify(e));
    this.setData({
      remark: e.detail.value
    })
  },
  //保存信息
  saveBaseInfo: function (e) {
    console.log(e);
    //配置参数
    var param = {
      id: baobei.id,
      address: vm.data.address,
      size: vm.data.size,
      remark: vm.data.remark,
      area_id: vm.data.options.areas[vm.data.area_index].id,
      way_id: vm.data.options.know_ways[vm.data.know_way_index].id,
      purpose_id: vm.data.options.buy_purposes[vm.data.purpose_index].id,
      care_id: vm.data.options.client_cares[vm.data.care_index].id,
    }
    util.setBaobeiNormalInfo(param, function (ret) {
      if (ret.data.code == "200" && ret.data.result) {
        //保存成功
        util.navigateBack(1); //返回页面
      } else {
        util.showModal("保存失败", ret.data.message, function (ret) { }, function (ret) { })
      }
    }, function (ret) { })
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