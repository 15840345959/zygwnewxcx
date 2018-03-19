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
    houseInfo:[],//楼盘信息
    HuXingInfo: []//楼盘下的户型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    vm.setData({
      id: options.id,
     house_id: options.house_id
    });
   
    vm.getHouseInfoById()//根据楼盘id获取楼盘的详细信息
    vm.getHouseHuXings()//获取楼盘下的户型
  },
//获取楼盘的详细信息
  getHouseInfoById:function(e){
    var param={
      id:vm.data.id
    }
    util.getHouseById(param,function(ret){
      console.log("getHouseById", JSON.stringify(ret.data.ret))
      var houseInfo=ret.data.ret
      var houseType =ret.data.ret.types
      console.log("houseType", JSON.stringify(houseType))
      if(ret.data.code=="200"){
        vm.setData({
           houseInfo:houseInfo,
           houseType: houseType
        })
        console.log('data', JSON.stringify(vm.data.houseType))
      }

    },null)

  },
//获取楼盘下的户型
  getHouseHuXings: function (e) {
    var param = {
      house_id: vm.data.house_id
    }
    util.getHuxingsByHouseId(param, function (ret) {
      console.log("getHuxingsByHouseId", JSON.stringify(ret))
      var HuXingInfo = ret.data.ret
      if (ret.data.code == "200") {
        vm.setData({
          HuXingInfo: HuXingInfo,
        })
        console.log("data", JSON.stringify(vm.data.HuXingInfo))
      }

    }, null)
  },
//点击跳到户型页面
  clickHuXings:function(e){
    console.log('clickHuXings e',JSON.stringify(e))
    var house_id = e.currentTarget.dataset.houseid
    wx.navigateTo({
      url: '/pages/houseInfo/huxing/huxing?house_id='+house_id,
    })

  },
  //点击跳到楼盘参数页
  clickHouseDetail:function(e){
    console.log("clickHuXings",JSON.stringify(e))
    var house_id = e.currentTarget.dataset.houseid
    wx.navigateTo({
      url: '/pages/houseInfo/detail/detail?house_id='+house_id,
    })
  },
//点击跳到报备页面
  jumpBaobei:function(e){
    var house_id = e.currentTarget.dataset.houseid
    var title = e.currentTarget.dataset.housename
    console.log("house_id", JSON.stringify(e))
    console.log("title", JSON.stringify(title))
    wx.navigateTo({
      url: '/pages/baobei/baobei?house_id='+house_id+'&title='+title,
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})