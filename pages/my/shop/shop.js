const util = require('../../../utils/util.js')

var vm = null
var page = 0;

var sliderWidth = 200;

var ijifen;
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //顶部切换
    tabs: ["商品列表", "兑换记录"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    myOrderList: [], //我的订单
    goodsList: [], //商品列表 
    userInfo: "", //用户基本信息
    ijifen: "",
  },

  //页面加载
  onLoad: function() {
    var vm = this;
    wx.getSystemInfo({
      success: function(res) {
        vm.setData({
          sliderLeft: (res.windowWidth / vm.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / vm.data.tabs.length * vm.data.activeIndex
        });
      }
    });
  },

  //顶部切换
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this
    console.log("数据" + JSON.stringify(options))
    util.showLoading("加载中...");
    var obj = JSON.parse(options.jsonStr);

    id = obj.id

    //设置用户基本信息
    vm.setData({
      userInfo: obj
    })
    //顶部切换
    wx.getSystemInfo({
      success: function(res) {
        vm.setData({
          sliderLeft: (res.windowWidth / vm.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / vm.data.tabs.length * vm.data.activeIndex
        });
      }
    });
    vm.getGoodsList();    //获取商品列表
    vm.getExchangeListByUserId()
    vm.getUserInfoByIdWithToken() //获取我的积分
  },
  //获取商品列表
  getGoodsList: function() {
    //获取商品列表
    var param = {
      page: page,
    }
    util.getGoodsList(param, function(res) {
      console.log("商品信息" + JSON.stringify(res))
      var msgObj = res.data.ret
      vm.setData({
        goodsList: msgObj,
      })
    }, null)
  },
  //获取我的订单
  getExchangeListByUserId: function() {
    var param = {}
    util.getExchangeListByUserId(param, function(res) {
      console.log("我的订单" + JSON.stringify(res))
      var msgObj = res.data.ret
      console.log("我的订单" + JSON.stringify(msgObj))
      vm.setData({
        myOrderList: msgObj
      })
    }, null)
  },

  //获取我的积分
  getUserInfoByIdWithToken: function() {
    var param = {
      id: id
    }
    util.getUserInfoByIdWithToken(param, function(res) {
      console.log("我的积分" + JSON.stringify(res.data.ret.jifen))
      ijifen = res.data.ret.jifen
      vm.setData({
        ijifen: ijifen
      })

    }, null)
  },
  //跳转商品详细页面
  jumpJf: function(e) {
    console.log("jumpJf信息" + JSON.stringify(e))
    var id = e.currentTarget.dataset.id
    var jifen = e.currentTarget.dataset.jifen
    wx.navigateTo({
      url: '/pages/my/shop/spxq/spxq?&id=' + id + '&ijifen=' + ijifen,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    vm.getExchangeListByUserId()
    vm.getUserInfoByIdWithToken()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})