// pages/my/whitebook/whitebook.js
var util = require('../../../utils/util.js')
var wxParse = require('../../../utils/wxParse/wxParse.js');

//获取应用实例
var app = getApp()
var vm = null

Page({

  data: {
    article: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    vm.tw_getByType() //根据类型获取白皮书等
  },

  // 根据id获取用户首页相关信息
  tw_getByType: function () {
    var param = {
      type: 1,
    }
    util.tw_getByType(param, function (res) {
      console.log("res:" + JSON.stringify(res));
      if (res.data.result) {
        var msgObj = res.data.ret
        if (res.data.code == '200') {
          var article = res.data.ret.content_html;
          wxParse.wxParse('article', 'html', article, vm, 5);
        }
      }
    })
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