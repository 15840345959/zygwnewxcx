const util = require('../../../utils/util.js')

var vm = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},  //用户信息
    userlist: [], //推荐人列表
    no_view_hidden: "hidden",   //未检索到数据的提示页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    var obj = JSON.parse(options.jsonStr);
    console.log("obj:" + JSON.stringify(obj));
    vm.setData({
      userInfo: obj,
    })
    console.log("userInfo:" + JSON.stringify(vm.data.userInfo));
    vm.getListByReUserId()
  },
  //获取分享列表
  getListByReUserId: function () {
    util.recomm_getListByCon({}, function (res) {
      console.log("分享列表" + JSON.stringify(res.data.ret))
      var data = res.data.ret
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
        userlist: data,
      })
    }, null)

  },

  //跳转商品详细页面
  jumpTj: function (e) {
    console.log("jumpTj" + JSON.stringify(e))
    var id = e.currentTarget.dataset.id
    var jifen = e.currentTarget.dataset.jifen
    wx.navigateTo({
      url: '/pages/my/fx/tj/tj?&userid=' + vm.data.userInfo.id,
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
    vm.getListByReUserId()
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