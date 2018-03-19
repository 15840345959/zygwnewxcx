// pages/baobei/baobei.js
var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
var page = 0    //列表页码计数
var vm = null

//报备方式
var visit_way_option = [{ value: "0", name: "中介带访" }, { value: "1", name: "自行到访" }];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "",    //客户姓名
    phonenum: "",  //电话
    house: "",  //意向楼盘
    plan_visit_date: "", //计划到访日期
    plan_visit_time: "", //计划到访时间
    start: "",//开始时间
    visit_way: "", //到访方式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    console.log('onLoad options:' + options.jsonStr)
    console.log('current_time:' + util.getCurrentTime())
    //如果页面传入house值
    if (!util.judgeIsAnyNullStr(options.jsonStr)) {
      console.log("set house default info");
      var house = JSON.parse(options.jsonStr);
      console.log("house:"+JSON.stringify(house))
      vm.setData({
        house: JSON.parse(options.jsonStr)
      })
      // console.log("vm.data.house:" + vm.data.house);
    }
    //初始化
    vm.setData({
      visit_way_option: visit_way_option,
      visit_way: visit_way_option[0],
      plan_visit_date: util.getToday(),
      plan_visit_time: util.getCurrentTime(),
      start: util.getCurrentTime(),
      end: '22:00'
    });
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

  //选择到访方式
  setVisitWayOption: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var id = e.detail.value;
    vm.setData({
      visit_way: visit_way_option[id]
    })
  },
  //设置到访日期
  setPlanVisitDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      plan_visit_date: e.detail.value
    })
  },
  //设置到访时间
  setPlanVisitTime: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      plan_visit_time: e.detail.value
    })
  },
  //设置客户姓名
  inputName: function (e) {
    console.log("inputName e:" + JSON.stringify(e));
    this.setData({
      name: e.detail.value
    })
  },

  //设置客户手机号
  inputPhonenum: function (e) {
    console.log("inputPhonenum e:" + JSON.stringify(e));
    this.setData({
      phonenum: e.detail.value
    })
  },
  //报备客户
  baobeiClient: function (e) {
    console.log("baobeiClient e:" + JSON.stringify(e));
    var name = vm.data.name;
    var phonenum = vm.data.phonenum;
    console.log("name:" + name + " phonenum:" + phonenum);
    //客户基本信息校验
    if (util.judgeIsAnyNullStr(name) || util.judgeIsAnyNullStr(phonenum)) {
      util.showModal('提示信息', '请填写客户相关信息', function (ret) { }, function (ret) { });
      return;
    }
    //判断手机号是否正确
    if (!util.isPoneAvailable(phonenum)) {
      util.showModal('提示信息', '请输入正确的手机号码', function (ret) { }, function (ret) { });
      return;
    }
    //是否选择楼盘
    if (util.judgeIsAnyNullStr(vm.data.house)) {
      util.showModal('提示信息', '请选择客户的意向楼盘', function (ret) { }, function (ret) { });
      return;
    }
    var house_id = vm.data.house.id;
    var plan_visit_time = vm.data.plan_visit_date + " " + vm.data.plan_visit_time;
    var visit_way = vm.data.visit_way.value;
    // var house_id = vm.data.house_id
    var param = {
      name: name,
      phonenum: phonenum,
      house_id: house_id,
      plan_visit_time: plan_visit_time,
      visit_way: visit_way
    }
    console.log("param:" + JSON.stringify(param));
    util.baobeiClient(param, function (ret) {
      console.log("baobeiClient ret:" + JSON.stringify(ret))
      if (ret.data.code == "200" && ret.data.result) {
        util.showModal("提示信息", "客户报备成功", function (ret) {
          console.log("ret:" + JSON.stringify(ret));
          //跳转至client页面
          if (ret.confirm) {
            wx.switchTab({
              url: '/pages/client/client'
            })
          }
        }, function (ret) { });
      } else {
        util.showModal("报备失败", ret.data.message, function (ret) { }, function (ret) { });
      }
    })
  },
  //选择楼盘
  setHouse: function (e) {
    wx.navigateTo({
      url: '/pages/baobei/selHouse/selHouse'
    })
  }
})