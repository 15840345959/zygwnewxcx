const util = require('../../../utils/util.js')

var vm = null
var page = 1;

var loadding_flag = false;  //页面是否在获取数据中..

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
    vm.getUserQDsByUserId()
  },

  //点击签到
  clickCd: function () {
    util.userQDToday({}, function (res) {
      console.log("签到记录" + JSON.stringify(res))
      //如果成功
      if (res.data.result == true && res.data.code=="200"){
        util.showToast("签到成功");
        page = 1;
        vm.getUserQDsByUserId()
      }else{
        util.showToast(res.data.message);
      }

    }, null)
  },

  //签到明细
  getUserQDsByUserId: function () {
    //如果在加载中，则不进行数据获取
    if (loadding_flag == true) {
      return;
    }
    loadding_flag = true;   //开始加载数据

    var param = {
      page: page,
    }

    //获取签到明细
    util.getUserQDsByUserId(param, function (res) {
      console.log("签到明细" + JSON.stringify(res))
      //获取数据成功
      if (res.data.result == true && res.data.code == "200") {
        var data = res.data.ret.data
        var qd_arr = [];
        //如果page==1，代表重新获取数据
        if (page == 1) {
          if (data.length == 0) {
            vm.setData({
              no_view_hidden: ""
            })
          } else {
            qd_arr = data;
            vm.setData({
              no_view_hidden: "hidden"
            })
          }
        }
        //如果page不为1，代表加载更多
        else {
          qd_arr = vm.data.qdList;
          //增加数据
          for (var i = 0; i < data.length; i++) {
            qd_arr.push(data[i]);
          }
        }
        vm.setData({
          qdList: qd_arr,
        })
        //如果没有数据，进行toast提示
        if (data.length == 0) {
          util.showToast('没有签到数据');
        }
        loadding_flag = false;  //已经完成数据加载
        page++;
        //关闭下拉刷新
        wx.stopPullDownRefresh();
      }
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
    page = 1;
    console.log("onPullDownRefresh page:" + page + "loadding_flag" + loadding_flag + "+++++++++++++++++++++++++++");
    vm.getUserQDsByUserId();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom page:" + page + "loadding_flag" + loadding_flag + "+++++++++++++++++++++++++++");
    vm.getUserQDsByUserId()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})