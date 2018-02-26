const util = require('../../../../utils/util.js')

var vm = null

var ijifen;   //我的积分值，来自页面传参
var jifen;    //商品积分值，来自接口获取数据
var userid;//用户id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: "",    //商品详情
    ijifen:"",    //我的积分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    console.log("数据" + JSON.stringify(options))
    userid = options.id
     ijifen = options.ijifen
    vm.setData({
      ijifen: ijifen
    })
    //获取商品信息
    var param = {
      id: userid,
    }
    util.getGoodsById(param, function (res) {
      console.log("商品信息信息" + JSON.stringify(res.data.ret))

      var data = res.data.ret
      jifen = data.jifen
      if (data.desc == null){
        data.desc = '暂无商品描述'
      }
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
if (ijifen < jifen) {
      util.showModal('', '积分不足');
      return;
    }
    util.showModal('', '确定兑换', vm.duihuan, '');

  },

//点击确定兑换
  duihuan: function () {
    var param = {
      goods_id: userid,
    }
    util.exchange(param, function (res) {
      console.log("兑换" + JSON.stringify(res))
      if (res.data.code == 200) {
 //退回上个页面
        wx.navigateBack({
          delta: 1
        })
      } else {
        util.showToast('操作失败');
      }
    }, null)
  }

})