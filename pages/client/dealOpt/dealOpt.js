// pages/client/dealOpt/dealOpt.js
var util = require('../../../utils/util.js')

//获取应用实例
var app = getApp()
var page = 0    //列表页码计数
var vm = null

//报备信息
var baobei = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: "hidden",
    baobei: {},
    huxings: [],   //楼盘下的户型
    options: {},   //报备选项
    pay_way_index: 0,  //付款方式索引
    deal_date: util.getToday(),
    deal_time: util.getCurrentTime(),
    deal_size: 0,
    deal_price: 0,
    deal_room: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    console.log(JSON.stringify(options));
    var jsonStr = options.jsonStr;
    var obj = JSON.parse(options.jsonStr);
    console.log("obj:" + JSON.stringify(obj))
    baobei = obj;
    vm.setData({
      baobei: baobei
    })

    //获取楼盘下的户型
    vm.getHuxingsByHouseId(baobei.house_id);
    //获取报备状态-成交方式
    vm.getBaobeiOption();  //获取报备信息
  },
  //获取报备相关选项
  getBaobeiOption: function (e) {
    util.getBaobeiOption({}, function (ret) {
      console.log("getBaobeiOption ret:" + JSON.stringify(ret))
      if (ret.data.code == "200" && ret.data.result) {
        var msgObj = ret.data.ret;
        vm.setData({
          options: msgObj
        })
        console.log("options :" + JSON.stringify(vm.data.options.areas));
      }
    }, function (ret) { })
  },

  //根据楼盘id获取户型列表
  getHuxingsByHouseId: function (house_id) {
    util.getHuxingsByHouseId({ house_id: house_id }, function (ret) {
      console.log("getHuxingsByHouseId ret:" + JSON.stringify(ret));
      if (ret.data.code == "200" && ret.data.result) {
        var msgObj = ret.data.ret;
        if(msgObj.length==0){
          return;
        }
        msgObj[0].checked = true;
        vm.setData({
          huxings: msgObj,
          hidden: ""
        });
      }
    }, null)
  },
  //选择户型
  selHuxing: function (e) {
    console.log("selHuxing e:" + JSON.stringify(e));
    var index = e.detail.value;
    var huxings = vm.data.huxings;
    vm.clearHuxingsChecked();
    huxings[index].checked = true;
    vm.setData({
      huxings: huxings
    })
    console.log("huxings:" + JSON.stringify(huxings));
  },
  //清空huxing选择
  clearHuxingsChecked: function (e) {
    var huxings = vm.data.huxings;
    for (var i = 0; i < huxings.length; i++) {
      huxings[i].checked = false;
    }
    vm.setData({
      huxings: huxings
    })
  },
  //获取选中的户型index
  getSelHuxingIndex: function (e) {
    var huxings = vm.data.huxings;
    for (var i = 0; i < huxings.length; i++) {
      if (huxings[i].checked == true)
        return i;
    }
    return 0;
  },
  //设置付款方式
  setPayWayOption: function (e) {
    console.log("setPayWayOption e:" + JSON.stringify(e));
    vm.setData({
      pay_way_index: e.detail.value,
    })
  },
  //输入成交金额
  inputDealPrice: function (e) {
    console.log("inputDealPrice e:" + JSON.stringify(e));
    this.setData({
      deal_price: e.detail.value
    })
  },
  //输入成交面积
  inputDealSize: function (e) {
    console.log("inputDealSize e:" + JSON.stringify(e));
    this.setData({
      deal_size: e.detail.value
    })
  },
  //输入成交房号
  inputDealRoom: function (e) {
    console.log("inputDealRoom e:" + JSON.stringify(e));
    this.setData({
      deal_room: e.detail.value
    })
  },
  //设置成交日期
  setDealDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      deal_date: e.detail.value
    })
  },
  //设置成交时间
  setDealTime: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      deal_time: e.detail.value
    })
  },
  //点击保存
  saveOpt: function (e) {
    console.log("saveOpt e:" + JSON.stringify(e))
    console.log("pay_way_id:" + vm.data.options.pay_ways[vm.data.pay_way_index].id);
    console.log("huxing_id:" + vm.data.huxings[vm.getSelHuxingIndex()].id);
    //录入成交信息
    if (util.judgeIsAnyNullStr(vm.data.deal_size, vm.data.deal_price, vm.data.deal_room)) {
      util.showModal("保存失败", "请录入相关成交信息", null, null);
      return;
    }
    var param = {
      id: baobei.id,
      deal_size: vm.data.deal_size,
      deal_price: vm.data.deal_price,
      deal_room: vm.data.deal_room,
      deal_time: vm.data.deal_date + " " + vm.data.deal_time,
      pay_way_id: vm.data.options.pay_ways[vm.data.pay_way_index].id,
      deal_huxing_id: vm.data.huxings[vm.getSelHuxingIndex()].id
    }

    util.setBaobeiDeal(param, function (ret) {
      //返回成功
      if (ret.data.code == "200" && ret.data.result) {
        util.showToast("报备成功");
        util.navigateBack(1);
      }
    }, null);

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

  }
})