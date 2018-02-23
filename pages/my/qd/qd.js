const util = require('../../../utils/util.js')

var vm = null
var page = 0;
var obj;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qdList: [],//签到明细
    no_view_hidden: "hidden",   //未检索到签到信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    console.log("数据" + JSON.stringify(options))
    obj = JSON.parse(options.jsonStr);
    vm.getUserQDsByUserId()
  },

  //点击签到
  clickCd: function () {
    var param = {
      token: obj.token,
      user_id: obj.id
    }
    util.userQDToday(param, function (res) {
      console.log("签到记录" + JSON.stringify(res))
      util.showToast(res.data.message)
      if (res.data.message == '今日已经签到') {
      } else {
        vm.getUserQDsByUserId()
      }

    }, null)
  },

  //签到明细
  getUserQDsByUserId: function () {
    var param = {
      page: page,
      token: obj.token,
      user_id: obj.id
    }
    util.getUserQDsByUserId(param, function (res) {
      console.log("签到明细" + JSON.stringify(res))
      var data = res.data.ret.data
      if (data.length == 0) {
        vm.setData({
          no_view_hidden: ""
        })
      } else {
        vm.setData({
          no_view_hidden: "hidden"
        })
      }
      vm.setData({
        qdList: data,
      })
    }, null)
  },

  //下拉刷新签到明细
  getUserQDsByUserIdNew: function () {
    var param = {
      page: page,
      token: obj.token,
      user_id: obj.id
    }
    util.getUserQDsByUserId(param, function (res) {
      console.log("签到明细" + JSON.stringify(res))
      var data = res.data.ret.data
      if (data.length == 0) {
        page = 0
        vm.getUserQDsByUserId()
      }
      vm.setData({
        qdList: data,
      })
    }, null)
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
    page++ ,
      vm.getUserQDsByUserIdNew()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})