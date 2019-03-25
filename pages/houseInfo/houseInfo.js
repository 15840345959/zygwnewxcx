// pages/houseInfo/houseInfo.js
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
    houseInfo: [],//楼盘信息
    huxingInfo: [],//楼盘下的户型
    hidden: "hidden",    //隐藏楼盘
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    vm.setData({
      id: options.id,
    });
    vm.getHouseInfoById()//根据楼盘id获取楼盘的详细信息
    vm.getHouseHuXings()//获取楼盘下的户型
  },
  //获取楼盘的详细信息
  getHouseInfoById: function (e) {
    var param = {
      id: vm.data.id
    }
    util.getHouseById(param, function (ret) {
      console.log("getHouseById", JSON.stringify(ret.data.ret))
      var houseInfo = ret.data.ret
      console.log("houseInfo e", JSON.stringify(ret.data.ret))
      var houseType = ret.data.ret.types
      console.log("houseType", JSON.stringify(houseType))
      if (ret.data.code == "200") {
        vm.setData({
          houseInfo: houseInfo,
          houseType: houseType
        })
        console.log('data', JSON.stringify(vm.data.houseType))
        vm.setData({
          hidden: ""
        });
      }

    }, null)

  },
  //获取楼盘下的户型
  getHouseHuXings: function (e) {
    var param = {
      house_id: vm.data.id
    }
    util.house_huxing_getListByCon(param, function (ret) {
      console.log("getHuxingsByHouseId", JSON.stringify(ret))
      var huxingInfo = ret.data.ret
      if (ret.data.code == "200") {
        vm.setData({
          huxingInfo: huxingInfo,
        })
      }
    }, null)
  },
  //点击跳到户型页面
  clickHuXings: function (e) {
    console.log('clickHuXings e', JSON.stringify(e))
    var huxing_id = e.currentTarget.dataset.huxingid

    wx.navigateTo({
      url: '/pages/houseInfo/huxing/huxing?huxing_id=' + huxing_id,
    })

  },
  //点击跳到楼盘参数页
  clickHouseDetail: function (e) {
    console.log("clickHuXings", JSON.stringify(e))
    var house_id = e.currentTarget.dataset.houseid
    wx.navigateTo({
      url: '/pages/houseInfo/detail/detail?house_id=' + house_id,
    })
  },
  //点击跳到报备页面
  jumpBaobei: function (e) {

    console.log("jumpBaobei houseInfo:" + JSON.stringify(vm.data.houseInfo));
    wx.navigateTo({
      url: '/pages/baobei/baobei?jsonStr=' + JSON.stringify(vm.data.houseInfo),
    })
  },
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          src: res.tempFilePath
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
    vm.getHouseInfoById()//根据楼盘id获取楼盘的详细信息

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    vm.getHouseInfoById()//根据楼盘id获取楼盘的详细信息
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})