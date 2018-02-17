// pages/client/baobeiOpt/baobeiOpt.js

var util = require('../../../utils/util.js')

//获取应用实例
var app = getApp()
var page = 0    //列表页码计数
var vm = null

var baobei_id = ""; //报备id信息

Page({

  /**
   * 页面的初始数据
   */
  data: {
    button_text: "",    //操作按钮名称
    baobei: {},    //报备信息
    set_role: "0",   //默认是中介角色
    hidden: "hidden"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    vm = this;
    console.log(JSON.stringify(options));
    var jsonStr = options.jsonStr;
    var obj = JSON.parse(options.jsonStr);
    baobei_id = obj.id;
    vm.setData({
      set_role: obj.set_role
    })
    //根据报备id获取信息
    vm.getBaobeiInfoById(baobei_id);
  },

  //根据id获取报备详情信息
  getBaobeiInfoById: function (baobei_id) {
    console.log("getBaobeiinfoById e:" + baobei_id);
    var param = {
      id: baobei_id
    }
    util.getBaobeiInfoById(param, function (ret) {
      console.log("getBaobeiInfoById ret:" + JSON.stringify(ret));
      if (ret.data.code == "200" && ret.data.result) {
        var msgObj = ret.data.ret;
        vm.setData({
          baobei: util.setBaobeiInfo(msgObj)
        })
        //如果是中介且状态变更为1以上，则不允许后续操作，需要退回
        if (vm.data.set_role == "0" && vm.data.baobei.baobei_status_int >= 1) {
          util.navigateBack(1);
        }
        //根据状态不同，设置不同的操作按钮
        vm.setButtonText(msgObj.baobei_status);
        //显示页面
        vm.setData({
          hidden: ""
        })
      }
    }, function (ret) { })
  },

  //设置按钮文字
  setButtonText: function (baobei_status) {
    var button_text = "";
    switch (baobei_status) {
      case "0":
        button_text = "客户到访操作";
        break;
      case "1":
        button_text = "客户成交操作";
        break;
      case "2":
        button_text = "客户签约操作";
        break;
      case "3":
        button_text = "全款到账操作";
        break;
    }
    vm.setData({
      button_text: button_text
    })
  },

  //编辑客户资料
  setClientInfo: function (e) {
    console.log("setClientInfo e:" + JSON.stringify(e));
    wx.navigateTo({
      url: '/pages/client/setBaseInfo/setBaseInfo?jsonStr=' + JSON.stringify(vm.data.baobei)
    })
  },
  //展示报备图片
  showImage: function (e) {
    console.log("showImage e:" + JSON.stringify(e))
    var currentUrl = e.currentTarget.dataset.img;
    var img_arr = [currentUrl];
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: img_arr // 需要预览的图片http链接列表
    })
  },


  //设置报备相关操作，根据报备status不同，跳转至不同页面
  setBaobeiOpt: function (e) {
    console.log("setBaobeiOpt e:" + JSON.stringify(e));
    var baobei_status = e.currentTarget.dataset.baobeistatus;
    switch (baobei_status) {
      case "0":
        wx.navigateTo({
          url: '/pages/client/daofangOpt/daofangOpt?jsonStr=' + JSON.stringify(vm.data.baobei)
        })
        break;
      case "1":
        wx.navigateTo({
          url: '/pages/client/dealOpt/dealOpt?jsonStr=' + JSON.stringify(vm.data.baobei)
        })
        break;
      case "2":
        wx.navigateTo({
          url: '/pages/client/signOpt/signOpt?jsonStr=' + JSON.stringify(vm.data.baobei)
        })
        break;
      case "3":
        wx.navigateTo({
          url: '/pages/client/qkdzOpt/qkdzOpt?jsonStr=' + JSON.stringify(vm.data.baobei)
        })
        break;
    }
  },

  //设置可结算状态
  setCanJiesuanStatus: function (e) {
    console.log("setCanJiesuanStatus e:" + JSON.stringify(e));
    var can_jiesuan_status = e.currentTarget.dataset.canjiesuanstatus;
    if (can_jiesuan_status == "0") {
      wx.navigateTo({
        url: '/pages/client/canjiesuanOpt/canjiesuanOpt?jsonStr=' + JSON.stringify(vm.data.baobei)
      })
    } else {
      util.showModal("提示信息", "已经为可结算状态", null, null);
    }
  },

  //设置顾问
  setGuwen: function (e) {
    console.log("setGuwen e:" + JSON.stringify(e));
    wx.navigateTo({
      url: '/pages/client/setGuwenOpt/setGuwenOpt?jsonStr=' + JSON.stringify(vm.data.baobei)
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
    vm.getBaobeiInfoById(baobei_id);  //每次展示重新加载数据

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