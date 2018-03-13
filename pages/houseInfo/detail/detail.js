// pages/houseInfo/detail/detail.js
var util = require('../../../utils/util.js')

//获取应用实例
var app = getApp()
var page = 0    //列表页码计数
var vm = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HouseDetail:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this
    vm.setData({
      house_id:options.house_id
    })
    vm.getHouseDetailByHouseId()//根据楼盘id获取楼盘参数
  },

  getHouseDetailByHouseId:function(e){
    var param={
      house_id:vm.data.house_id
    }
    util.getHouseDetailByHouseId(param,function(ret){
      console.log("getHouseDetailByHouseId",JSON.stringify(ret))
      var HouseDetail=ret.data.ret.data
      if(ret.data.code=="200"){
        vm.setData({
          HouseDetail:HouseDetail
        })
      }
      console.log("HouseDetail data", JSON.stringify(vm.data.HouseDetail))

    },null)
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