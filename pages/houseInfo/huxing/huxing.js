// pages/houseInfo/huxing/huxing.js
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
  HuXingInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this
    console.log("house_id", JSON.stringify(options))    
    vm.setData({
      house_id:options.house_id
    })
    console.log("house_id", JSON.stringify(vm.data.house_id))
    vm.getHouseHuXings()//获取楼盘下的户型
  },

  getHouseHuXings:function(e){
    var param={
      house_id:vm.data.house_id
    }
    util.getHuxingsByHouseId(param,function(ret){
      console.log("getHuxingsByHouseId",JSON.stringify(ret))
      var HuXingInfo=ret.data.ret
      // var HuXingType=ret.data.ret.type
      // console.log("HuXingType", JSON.stringify(HuXingType))
      if(ret.data.code=="200"){
        vm.setData({
          HuXingInfo:HuXingInfo,
        })
        console.log("data",JSON.stringify(vm.data.HuXingInfo))
      }

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