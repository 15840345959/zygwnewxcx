const util = require('../../../../utils/util.js')

var vm = ''
var userid //用户id
var token
Page({

  /**
   * 页面的初始数据
   */
  data: {
    re_user_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //获取推荐用户id
  inputReUserId: function(e) {
    console.log("inputReUserId re_user_id:" + JSON.stringify(e.detail.value))
    vm.setData({
      re_user_id: e.detail.value
    })
  },

  //点击确定
  clickdh: function(e) {
    if (vm.data.re_user_id.length < 5) {
      util.showToast('邀请码格式不正确');
      return;
    }
    console.log("before re_user_id" + JSON.stringify(vm.data.re_user_id))
    var re_user_id = vm.data.re_user_id.substring(5)
    console.log("after re_user_id" + JSON.stringify(re_user_id))

    var param = {
      re_user_id: re_user_id,
    }
    util.recommUser(param, function(res) {
      console.log("点击确定" + JSON.stringify(res))
      if (res.data.code == 200) {
        util.showToast('提交成功');
        wx.navigateBack({
          delta: 1
        })
      } else {
        util.showModal("", res.data.message);
      }


    }, null)
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
    vm = this
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

  }
})