// pages/houseInfo/huxing/huxing.js
var util = require('../../../utils/util.js')

//获取应用实例
var app = getApp()
var page = 0    //列表页码计数
var vm = null

//户型id
var huxing_id = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    huxing: null,    //户型信息
    no_view_hidden: "hidden" //默认为真
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    console.log("huxing_id", JSON.stringify(options))
    huxing_id = options.huxing_id    //获取户型id
    // huxing_id = 32; //测试用

    console.log("huxing_id", JSON.stringify(huxing_id))
    vm.getHuxingById()//获取楼盘下的户型
  },

  //根据户型id获取户型信息
  getHuxingById: function (e) {
    var param = {
      id: huxing_id
    }
    util.house_huxing_getById(param, function (ret) {
      console.log("house_huxing_getById", JSON.stringify(ret))
      var msgObj = ret.data.ret
      if (ret.data.code == "200") {
        vm.setData({
          huxing: msgObj
        })
        if (msgObj.styles.length == 0) {
          vm.setData({
            no_view_hidden: ""
          })
        }
        console.log("data", JSON.stringify(vm.data.huxing))
      }

    }, null)
  },

  //点击户型样式
  clickHuxingStyle: function (e) {
    console.log("clickHuxingStyle e:" + JSON.stringify(e))
    var index = e.currentTarget.dataset.index;
    var huxingStyles = vm.data.huxing.styles;

    var current = huxingStyles[index].image
    var urls = [current]

    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
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
    vm.getHouseHuXings()//获取楼盘下的户型
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