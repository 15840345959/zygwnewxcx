const util = require('../../../utils/util.js')

var vm = null
var page_count = 1;

var reload_flag = true; //重新加载数据标识

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qdList: [], //签到明细
    no_view_hidden: "hidden", //未检索到签到信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this
    vm.getUserQDsByUserId()
  },

  //点击签到
  clickCd: function() {
    util.userQDToday({}, function(res) {
      console.log("签到记录" + JSON.stringify(res))
      //如果成功
      if (res.data.result == true && res.data.code == "200") {
        util.showToast("签到成功");
        page_count = 1;
        reload_flag = true;
        vm.getUserQDsByUserId()
      } else {
        util.showToast(res.data.message);
      }

    }, null)
  },

  //签到明细
  getUserQDsByUserId: function() {
    //如果在加载中，则不进行数据获取
    var param = {
      page: page_count,
    }
    //获取签到明细
    util.getUserQDsByUserId(param, function(res) {
      console.log("签到明细" + JSON.stringify(res))
      //获取数据成功
      if (res.data.result == true && res.data.code == "200") {
        var msgObj = res.data.ret.data
        var qdList = [];
        if (!reload_flag) { //如果不是重新加载，设置houses_arr为现有的vm.data.houses
          qdList = vm.data.qdList;
        }
        for (var i = 0; i < msgObj.length; i++) {
          qdList.push(msgObj[i]);
        }
        vm.setData({
          qdList: qdList
        });

        //是否展示未找到楼盘的提示
        if (vm.data.qdList.length == 0) {
          vm.setData({
            no_view_hidden: ""
          })
        } else {
          vm.setData({
            no_view_hidden: "hidden"
          })
        }
        page_count++;
        //关闭下拉刷新
        wx.stopPullDownRefresh();
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
    page_count = 1
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    reload_flag = true;
    page_count = 1;
    console.log("onPullDownRefresh page_count:" + page_count + "reload_flag" + reload_flag + "+++++++++++++++++++++++++++");
    vm.getUserQDsByUserId();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("onReachBottom page_count:" + page_count + "reload_flag" + reload_flag + "+++++++++++++++++++++++++++");
    vm.getUserQDsByUserId()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})