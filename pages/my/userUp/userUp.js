// pages/my/userUp/userUp.js
const util = require('../../../utils/util.js')

//获取应用实例
var app = getApp()
var page = 0 //列表页码计数
var vm = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    houses: [], //楼盘列表
    house: "", //选中的楼盘
    userUps: [], //申请记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this
  },

  //获取楼盘列表
  getHouseList: function() {
    util.house_getListByCon({
      "page_size": 100
    }, function(res) {
      console.log("getHouseList res:" + JSON.stringify(res))
      var msgObj = res.data.ret.data;
      console.log("msgObj.length length:" + msgObj.length);
      vm.setData({
        houses: msgObj
      });
    })
  },
  //获取申请记录
  getUserUpsList: function() {
    util.getUserUpListByUserId({}, function(res) {
      console.log("getUserUpListByUserId res:" + JSON.stringify(res))
      var msgObj = res.data.ret;
      console.log("msgObj.length length:" + msgObj.length);
      vm.setData({
        userUps: msgObj
      });
      //关闭下拉刷新
      wx.stopPullDownRefresh();
    })
  },
  //选择楼盘
  setHouseOption: function(e) {
    console.log('setHouseOption e:', e.detail.value)
    var id = e.detail.value;
    vm.setData({
      house: vm.data.houses[id]
    })
  },
  //提交申请
  baobeiClient: function(e) {
    console.log('setHouseOption e:', e.detail.value)
    if (util.judgeIsAnyNullStr(vm.data.house)) {
      util.showModal("提示信息", "请选择申请楼盘", function(ret) {}, function(ret) {});
      return;
    }
    var param = {
      house_id: vm.data.house.id
    }
    util.userApplyUp(param, function(ret) {
      if (ret.data.code == "200" && ret.data.result == true) {
        vm.getUserUpsList();
      } else {
        util.showModal("提示信息", ret.data.message, function(ret) {}, function(ret) {});
      }
    }, function(ret) {

    });

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
    vm.getHouseList()
    vm.getUserUpsList()
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
    vm.getUserUpsList();

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

  }
})