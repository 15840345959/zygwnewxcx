// pages/getUserInfoPage/getUserInfoPage.js

var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
var vm = null

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
  },

  //点击获取用户信息接口返回信息
  getUserInfo: function (e) {
    wx.login({
      success: function (res) {
        console.log("wx.login:" + JSON.stringify(res))
        //成功获取code
        if (res.code) {
          var code = res.code
          console.log('login code is : ' + JSON.stringify(code))
          wx.getUserInfo({
            success: function (res) {
              console.log('getUserInfo res is : ' + JSON.stringify(res))
              var encryptedData = util.baseEncode(res.encryptedData)
              var iv = util.baseEncode(res.iv)
              var param = {
                code: code,
                encryptedData: encryptedData,
                iv: iv,
              }
              console.log("param:" + JSON.stringify(param));
              util.loginServer(param, function (ret) {
                app.storeUserInfo(ret.data.ret)   //将userInfo缓存在本地
                console.log("登录成功，设置本地缓存 userInfo:" + JSON.stringify(util.getLocalUserInfo()));
                util.navigateBack(-1);
              }, null, "登录中...");
            }
          });
        }
      }
    });
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