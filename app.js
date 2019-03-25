//app.js
const util = require('./utils/util.js')

var vm = null

App({
  onLaunch: function () {
    //获取vm
    vm = this
    //获取用户缓存数据
    var userInfo = wx.getStorageSync("userInfo");
    console.log("local storage userInfo:" + JSON.stringify(userInfo));
    vm.globalData.userInfo = wx.getStorageSync("userInfo");
  },

  //监听小程序打开
  onShow: function () {

  },
  //进行本地缓存
  storeUserInfo: function (obj) {
    console.log("storeUserInfo :" + JSON.stringify(obj));
    wx.setStorage({
      key: "userInfo",
      data: obj
    });
    vm.globalData.userInfo = obj;
  },
  getUserInfo: function (cb) {
    typeof cb == "function" && cb(vm.globalData.userInfo)
  },
  getSystemInfo: function (cb) {
    if (vm.globalData.systemInfo) {
      typeof cb == "function" && cb(vm.globalData.systemInfo)
    } else {
      wx.getSystemInfo({
        success: function (res) {
          vm.globalData.systemInfo = res
          typeof cb == "function" && cb(vm.globalData.systemInfo)
        }
      })
    }
  },
  //全局变量
  globalData: {
    userInfo: null,
    systemInfo: null,
  }
})