// pages/my/hezuo/hezuo.js
var util = require('../../../utils/util.js')
//获取应用实例
var app = getApp()
var page = 0    //列表页码计数，暂未使用，后续扩展使用
var vm = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HeZuoInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    // vm.getHeZuo()//根据类型获取合作细则
    vm.tw_getByType()//根据类型获取合作细则
  },

  // 根据id获取用户首页相关信息
  tw_getByType: function () {
    var param = {
      type: 1,
    }
    util.tw_getByType(param, function (res) {
      if (res.data.result) {
        var HeZuoInfo = res.data.ret
        console.log("根据id获取用户首页相关信息" + JSON.stringify(HeZuoInfo))
        vm.setData({ HeZuoInfo: HeZuoInfo })
      }
    })
  },

  //根据图文类型获取获取合作细则
  getHeZuo: function () {
    var param = {
      type: 1
    }
    util.getTWByType(param, function (ret) {
      console.log("getTWByType", JSON.stringify(ret))
      var HeZuoInfo = ret.data.ret.steps
      if (ret.data.code == '200') {
        vm.setData({
          HeZuoInfo: HeZuoInfo
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