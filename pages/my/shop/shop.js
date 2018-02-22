const util = require('../../../utils/util.js')

var vm = null
var page = 0;
var code;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    code: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    console.log("数据" + JSON.stringify(options))

    var param = {
      page: page,
    }

    util.getGoodsList(param, function (res) {
      console.log("商品信息" + JSON.stringify(res.data.ret.data))
      code = res.data.code
      var data = res.data.ret.data
      vm.setData({
        datalist: data,
        code: code
      })
    }, null)
  },

  jumpJf: function (e) {
    console.log("111" + JSON.stringify(e))
    var id = e.currentTarget.dataset.id
    var jifen = e.currentTarget.dataset.jifen

    if (code < jifen) {
      wx.showToast({
        title: '积分不足',
        icon: 'loading',
        duration: 1000
      });
      vm.setData({
        show: true
      })
      return;
    }

    wx.showModal({
      title: ' ',
      icon: 'loading',
      content: '请确认是否兑换',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击确定')


          var param = {
            goods_id: id,
          }

          util.exchange(param, function (res) {


            if (res) {
              wx.showToast({
                title: res.data.message,
                icon: 'loading',
                duration: 2000
              });
            }
          }, null)



        } else {
          console.log('用户点击取消')
        }
      }
    });





    wx.navigateTo({
      //  url: '/pages/product/product?officeid=' + officeid,
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

  },
  clickJl: function () {
    wx.navigateTo({
      url: '/pages/my/shop/jl/jl'
    })
  },
})