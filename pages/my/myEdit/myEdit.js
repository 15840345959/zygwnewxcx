const util = require('../../../utils/util.js')
const qiniuUploader = require("../../../utils/qiniuUploader");

//获取应用实例
var app = getApp()
var page = 0 //列表页码计数
var vm = null

// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: 'ECN', // 华东区
    uptoken: qnToken
  };
  qiniuUploader.init(options);
}

var qnToken = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qnToken: "", //七牛token
    userInfo: {}, //用户信息
    array: ['保密', '男', '女']
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    vm = this
    vm.getMyInfo()
    vm.getQiniuToken()

  },

  //获取用户信息
  getMyInfo: function() {
    util.getMyInfo({}, function(ret) {
      console.log("user=" + JSON.stringify(ret))
      if (ret.data.code == "200" && ret.data.result == true) {
        if (ret.data.ret.phonenum == null) {
          ret.data.ret.phonenum = '--'
        }
        vm.setData({
          userInfo: ret.data.ret,
        })
      }
    }, function(ret) {});
  },
  //获取七牛token
  getQiniuToken: function() {
    util.getQiniuToken({}, function(ret) {
      console.log("七牛token= "+ JSON.stringify(ret))
      if (ret.data.code = "200" && ret.data.result) {
        qnToken = ret.data.ret;
        //初始化七牛
        initQiniu();
      }
    })
  },
//上传头像
  chooseImage: function (e) {
    var param = {
      count: 1,
      sourceType: ['album', 'camera']
    }
    util.chooseImage(param, function (ret) {
      console.log("chooseImage ret:" + JSON.stringify(ret))
      var file_path = ret.tempFilePaths[0]; //获取图片
      //进行七牛上传
      qiniuUploader.upload(file_path, (res) => {
        console.log("qiniuUploader upload res:" + JSON.stringify(res));
        var img_qn_url = util.getImgRealUrl(res.key);
        var info = vm.data.userInfo
        info.avatar = img_qn_url
        vm.setData({
          userInfo: info
        })
      }, (error) => {
        console.error('error: ' + JSON.stringify(error));
      });
    }, null, null);
  },

  //输入昵称
  editName: function(e) {
    console.log("昵称=" + JSON.stringify(e))
    var info = vm.data.userInfo
    info.nick_name = e.detail.value
    console.log("22222=" + JSON.stringify(info))
    vm.setData({
      userInfo: info
    })
  },
  //输入手机号
  editPhone: function(e) {
    console.log("手机号=" + JSON.stringify(e))
    var info = vm.data.userInfo
    info.phonenum = e.detail.value
    console.log("22222=" + JSON.stringify(info))
    vm.setData({
      userInfo: info
    })
  },
  //选择性别
  genderEdit: function(e) {
    console.log("33=" + JSON.stringify(e))
    var info = vm.data.userInfo
    info.gender = e.detail.value
    vm.setData({
      userInfo: info
    })
  },
  //提交更新用户信息
  submit: function() {
    var nick_name = vm.data.userInfo.nick_name
    var avatar = vm.data.userInfo.avatar
    var phonenum = vm.data.userInfo.phonenum
    var gender = vm.data.userInfo.gender
    util.updateUserInfo({
      nick_name,
      avatar,
      phonenum,
      gender
    }, function(ret) {
      console.log("提交=" + JSON.stringify(ret))
      if (ret.data.code == 200 && ret.data.result == true) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
        })
      } else {
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 2000,
        })
      }
    })
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
    // vm.getMyInfo()
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
    page = 1
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    page = 1;
    console.log("onPullDownRefresh page:" + page + "loadding_flag" + loadding_flag + "+++++++++++++++++++++++++++");
    vm.getUserQDsByUserId();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("onReachBottom page:" + page + "loadding_flag" + loadding_flag + "+++++++++++++++++++++++++++");
    vm.getUserQDsByUserId()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})