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
    //判断是否需要登录
    util.isNeedNavigateToSetMyInfoPage();
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
    util.isNeedNavigateToSetMyInfoPage();
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
    util.isNeedNavigateToSetMyInfoPage();
    wx.navigateTo({
      url: '/pages/my/setMyInfo/setMyInfo?jsonStr=' + JSON.stringify(vm.data.userInfo)
    })
  },
  //编辑用户信息
  myEdit: function () {
    console.log("点击头像=")
    wx.navigateTo({
      url: './myEdit/myEdit'
    })
  },
  //升级案场负责人
  clickUserUp: function () {
    if (util.isNeedNavigateToSetMyInfoPage()) {
      util.showToast('请补充信息');
      wx.navigateTo({
        url: '/pages/my/setMyInfo/setMyInfo'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/my/userUp/userUp'
    })
  },
  //打开积分商城
  clickShop: function () {
    util.isNeedNavigateToSetMyInfoPage();
    wx.navigateTo({
      url: '/pages/my/shop/shop?jsonStr=' + JSON.stringify(vm.data.userInfo)
    })
  },
  //行业白皮书
  clickWhiteBook: function () {
    util.isNeedNavigateToSetMyInfoPage();
    wx.navigateTo({
      url: '/pages/my/whitebook/whitebook',
    })
  },
  //合作细则
  clickHeZuo: function () {
    util.isNeedNavigateToSetMyInfoPage();
    wx.navigateTo({
      url: '/pages/my/hezuo/hezuo',
    })
  },
  //签到
  clickQd: function () {
    util.isNeedNavigateToSetMyInfoPage();
    wx.navigateTo({
      url: '/pages/my/qd/qd?jsonStr=' + JSON.stringify(vm.data.userInfo)
    })
  },
  //签到
  clickFx: function () {
    util.isNeedNavigateToSetMyInfoPage();
    wx.navigateTo({
      url: '/pages/my/fx/fx?jsonStr=' + JSON.stringify(vm.data.userInfo)
    })
  },
  clickCalculator: function () {
    util.isNeedNavigateToSetMyInfoPage();
    wx.navigateTo({
      url: '/pages/my/loansCalculator/loansCalculator',

    })
  },
  //点击联系人
  clickContact: function () {
    util.isNeedNavigateToSetMyInfoPage();
    wx.navigateTo({
      url: '/pages/my/contact/contact',

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