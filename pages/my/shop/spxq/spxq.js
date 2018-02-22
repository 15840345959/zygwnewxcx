const util = require('../../../../utils/util.js')

var vm = null
var ijifen;
var jifen;
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:"",    //商品详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    console.log("数据" + JSON.stringify(options))
     id = options.id
     ijifen = options.ijifen
    vm.setData({
      ijifen: ijifen
    })
    //获取商品信息
    var param = {
      id: id,
    }
    util.getGoodsById(param, function (res) {
      console.log("商品信息" + JSON.stringify(res.data.ret))
    
      var data = res.data.ret
      jifen = data.jifen
      vm.setData({
       goodsList: data,
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  //点击兑换
  clickdh: function () {
   if(ijifen<jifen){
     util.showToast('积分不足');
    // util.showModal('积分不足',);
     return;
   }
   var param = {
     goods_id: id,
   }
   util.exchange(param, function (res) {
     console.log("兑换" + JSON.stringify(res))
    if(res.data.code == 200){
     util.showToast('兑换成功');
    }
    }, null)
   wx.navigateBack({
     delta: 1
   })

  },
})