// pages/my/whitebook/whitebook.js
var util = require('../../../utils/util.js')

//获取应用实例
var app = getApp()
var page = 0    //列表页码计数，暂未使用，后续扩展使用
var vm = null
Page({

  data: {
    WhiteBookInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    // vm.getWhiteBook()      //根据类型获取行业白皮书
    vm.tw_getByType()         //根据id获取用户首页相关信息
  },

  // 根据id获取用户首页相关信息
  tw_getByType: function () {
    var param = {
      type: 2,
    }
    util.tw_getByType(param, function (res) {
      if (res.data.result) {
        var WhiteBookInfo = res.data.ret
        console.log("根据id获取用户首页相关信息" + JSON.stringify(WhiteBookInfo))
        vm.setData({ WhiteBookInfo: WhiteBookInfo })
      }
    })
  },

  //根据图文类型获取获取行业白皮书
  getWhiteBook: function () {
    var param = {
      type: 2
    }
    util.getTWByType(param, function (ret) {
      console.log("getTWByType", JSON.stringify(ret))
      var WhiteBookInfo = ret.data.ret.steps
      if (ret.data.code == '200') {
        vm.setData({
          WhiteBookInfo: WhiteBookInfo
        })
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