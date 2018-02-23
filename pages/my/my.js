// pages/my/my.js
var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
var page = 0    //列表页码计数
var vm = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},  //用户信息
    hidden: "hidden",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    //加载页面
    vm.getMyInfo();
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
    vm.getMyInfo()
},
  //获取用户页面相关数据
  getMyInfo: function () {
    util.getMyInfo({}, function (ret) {
      if (ret.data.code == "200" && ret.data.result == true) {
        vm.setData({
          userInfo: ret.data.ret,
          hidden: ""
        })
        //同时要更新globalData
        app.storeUserInfo(ret.data.ret);
      }
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, function (ret) { });
  },
  //签到
  clickQianDao: function () {
    console.log("clickQianDao");
    util.userQDToday({}, function (ret) {
      if (ret.data.code == "200" && ret.data.result == true) {
        util.showModal("提示信息", "签到+" + ret.data.ret.jifen + "积分", function (ret) { }, function (ret) { });
        vm.getMyInfo();
      } else {
        util.showModal('提示信息', ret.data.message, function (ret) { }, function (ret) { });
      }
    }, function (ret) { })
  },
  //设置用户资料
  clickSetZiliao: function () {
    wx.navigateTo({
      url: '/pages/my/setMyInfo/setMyInfo?jsonStr=' + JSON.stringify(vm.data.userInfo)
    })
  },
  //升级案场负责人
  clickUserUp: function () {
    wx.navigateTo({
      url: '/pages/my/userUp/userUp'
    })
  },
  //打开积分商城
  clickShop: function () {
    wx.navigateTo({
      url: '/pages/my/shop/shop?jsonStr=' + JSON.stringify(vm.data.userInfo)
    })
  },


  //签到
  clickQd: function () {
    wx.navigateTo({
      url: '/pages/my/qd/qd?jsonStr=' + JSON.stringify(vm.data.userInfo)
    })
  },

  clickCalculator:function(){
    wx.navigateTo({
      url: '/pages/my/calculator/calculator',

    })
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
    vm.getMyInfo();
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