// pages/setMyInfo/setMyInfo.js
const util = require('../../../utils/util.js')

var vm = null

//获取应用实例
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    phonenum: "",
    real_name: "",
    cardID: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    vm = this;
    console.log(JSON.stringify(e));
    var jsonStr = e.jsonStr;
    //如果入参不为空
    if (!util.judgeIsAnyNullStr(jsonStr)) {
      var obj = JSON.parse(e.jsonStr);
      //姓名
      if (!util.judgeIsAnyNullStr(obj.real_name)) {
        vm.setData({
          real_name: obj.real_name
        })
      }
      //电话
      if (!util.judgeIsAnyNullStr(obj.phonenum)) {
        vm.setData({
          phonenum: obj.phonenum
        })
      }
      //身份证
      if (!util.judgeIsAnyNullStr(obj.cardID)) {
        vm.setData({
          cardID: obj.cardID
        })
      }
    }
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
  //输入手机号
  inputPhonenum: function (e) {
    console.log("inputPhonenum e:" + JSON.stringify(e));
    this.setData({
      phonenum: e.detail.value
    })
  },
  //输入真实姓名
  inputRealName: function (e) {
    console.log("inputRealName e:" + JSON.stringify(e));
    this.setData({
      real_name: e.detail.value
    })
  },
  //输入真实姓名
  inputCardId: function (e) {
    console.log("inputCardId e:" + JSON.stringify(e));
    this.setData({
      cardID: e.detail.value
    })
  },

  //点击绑定
  clickBangDing: function (e) {
    var phonenum = vm.data.phonenum;
    var real_name = vm.data.real_name;
    var cardID = vm.data.cardID;
    console.log("clickBangDing phonenum:" + phonenum + " real_name:" + real_name + " cardID:" + cardID);
    //如果有为空的情况
    if (util.judgeIsAnyNullStr(phonenum) || util.judgeIsAnyNullStr(real_name) || util.judgeIsAnyNullStr(cardID)) {
      util.showModal('提示信息', '请填写相关信息', function (ret) { }, function (ret) { });
      return;
    }
    //手机号校验不通过
    if (!util.isPoneAvailable(phonenum)) {
      util.showModal('提示信息', '请输入正确的手机号码', function (ret) { }, function (ret) { });
      return;
    }
    var param = {
      phonenum: phonenum,
      real_name: real_name,
      cardID: cardID
    }
    util.updateUserInfo(param, function (ret) {
      if (ret.data.code == "200" && ret.data.result == true) {
        app.storeUserInfo(ret.data.ret);  //重新保存信息
        util.showToast('保存成功');
        util.navigateBack(-1);
      } else {
        util.showModal("提示信息", ret.data.message, null, null);
      }
    }, function (err) {
      console.log('updateUserInfo err is : ' + JSON.stringify(err))
    });
  },
})