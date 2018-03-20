// pages/index/zixun/zixun.js
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
    zixun:[],
    zixunsteps: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this
    vm.setData({
      id:options.id
    })
    vm.getZiXunInfo()//获取轮播图下的资讯   
   
  },
  getZiXunInfo:function(){
    var param={
      id:vm.data.id
    }
    util.getADById(param,function(ret){
      console.log("getADById",JSON.stringify(ret))
      var zixun =ret.data.ret
      var zixunsteps=ret.data.ret.steps
      console.log("zixunsteps", JSON.stringify(zixunsteps))
      if(ret.data.code=='200'){
        vm.setData({
          zixun: zixun,
          zixunsteps: zixunsteps
        })
       
        wx.getImageInfo({
          src: '{{item.img}}',
          success: function (res) {
            console.log(res.width)
            console.log(res.height)
          }
        })
        console.log("data",JSON.stringify(vm.data.zixun))
      }
    })
  },
  // getImageInfo:function(e){

  //   wx.previewImage({
  //     current: zixunsteps.img[0],     //当前图片地址
  //     urls: imgArr,               //所有要预览的图片的地址集合 数组形式
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })

  // },

 


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