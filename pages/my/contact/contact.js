// pages/my/whitebook/whitebook.js
var util = require('../../../utils/util.js')
var wxParse = require('../../../utils/wxParse/wxParse.js');

//获取应用实例
var app = getApp()
var vm = null

Page({

  data: {
    contact_arr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    vm.getHouseContact() //根据条件获取楼盘联系人
  },

  // 根据id获取用户首页相关信息
  getHouseContact: function () {
    var param = {}
    util.house_contact_getListByCon(param, function (res) {
      console.log("res:" + JSON.stringify(res));
      if (res.data.result) {
        var msgObj = res.data.ret
        if (res.data.code == '200') {
          vm.setData({
            contact_arr: msgObj
          })
        }
      }
    })
  },
  //点击联系人
  clickContact: function (e) {
    console.log("clickContact e:" + JSON.stringify(e));
    var ewm_url = e.currentTarget.dataset.ewmUrl;
    wx.previewImage({
      current: ewm_url, // 当前显示图片的http链接
      urls: [ewm_url] // 需要预览的图片http链接列表
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