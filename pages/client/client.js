// pages/client/client.js

var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
var page = 0    //列表页码计数
var vm = null

//中介的navbar样式
var zj_navbar = [{ value: "zj0", name: "我的报备" }, { value: "zj1", name: "已报备" }, { value: "zj2", name: "已到访" }, { value: "zj3", name: "已成交" }, { value: "zj4", name: "已签约" }, { value: "zj5", name: "全款到账" }, { value: "zj6", name: "可结算" }, { value: "zj7", name: "已结算" }];
//案场负责人的navbar样式
var ac_navbar = [{ value: "ac0", name: "待接收" }, { value: "ac1", name: "待到访" }, { value: "ac2", name: "待成交" }, { value: "ac3", name: "待签约" }, { value: "ac4", name: "待全款到账" }, { value: "ac5", name: "全款已到账" }, { value: "ac6", name: "待结算" }, { value: "ac7", name: "已结算" }];


//搜索接口调用参数
var search_param = {
  page: page
}

var reload_flag = true;  //重新加载楼盘数组标志

var set_role = null; //角色设定

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //当前点击的tab选项
    userInfo: {},  //用户缓存信息
    navbar: [],    //顶部导航
    hidden: "",    //页面隐藏
    no_view_hidden: "hidden",   //未检索到数据的提示页面
    baobeis: [],   //报备列表
    houses: [],  //全部楼盘列表，用于选项值
    house: "",    //选定的楼盘
    start_time: "", //开始日期
    end_time: "" //结束日期
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    //加载全部楼盘
    vm.getHouseList(); //搜索楼盘
    vm.reloadPage();    //刷新页面
  },
  //设置头部导航条
  setNavTab: function (e) {
    //中介
    if (set_role == "0") {
      vm.setData({
        navbar: zj_navbar
      });
    }
    //置业顾问
    if (set_role == "1") {
      vm.setData({
        navbar: ac_navbar
      });
    }
  },
  //进行后台数据获取
  getDatasFromSrv: function (e) {
    //中介
    if (set_role == "0") {
      vm.getListForZJByStatus();
    }
    //置业顾问
    if (set_role == "1") {
      vm.getListForACByStatus();
    }
  },
  //获取中介维度的报备列表
  getListForZJByStatus: function (e) {
    util.getListForZJByStatus(search_param, function (res) {
      console.log("getListForZJByStatus res:" + JSON.stringify(res))
      var msgObj = res.data.ret
      console.log("msgObj.length length:" + msgObj.length);
      for (var i = 0; i < msgObj.length; i++) {
        msgObj[i] = util.setBaobeiInfo(msgObj[i]);
      }
      console.log("after set msgObj:" + JSON.stringify(msgObj));
      vm.setData({
        baobeis: msgObj
      });
      //是否展示未找到楼盘的提示
      if (msgObj.length == 0) {
        vm.setData({
          no_view_hidden: ""
        })
      } else {
        vm.setData({
          no_view_hidden: "hidden"
        })
      }
      wx.stopPullDownRefresh();
    }, function (res) { })
  },
  //获取案场负责人维度的报备列表
  getListForACByStatus: function (e) {
    util.getListForACByStatus(search_param, function (res) {
      console.log("getListForACByStatus res:" + JSON.stringify(res))
      var msgObj = res.data.ret
      console.log("msgObj.length length:" + msgObj.length);
      for (var i = 0; i < msgObj.length; i++) {
        msgObj[i] = util.setBaobeiInfo(msgObj[i]);
      }
      console.log("after set msgObj:" + JSON.stringify(msgObj));
      vm.setData({
        baobeis: msgObj
      });
      //是否展示未找到楼盘的提示
      if (msgObj.length == 0) {
        vm.setData({
          no_view_hidden: ""
        })
      } else {
        vm.setData({
          no_view_hidden: "hidden"
        })
      }
      wx.stopPullDownRefresh();
    }, function (res) { })
  },

  //获取楼盘列表
  getHouseList: function () {
    util.searchHouseByCon({ level: "0" }, function (res) {
      console.log("getHouseList res:" + JSON.stringify(res))
      var msgObj = res.data.ret
      console.log("msgObj.length length:" + msgObj.length);
      vm.setData({
        houses: msgObj
      });
    })
  },

  //选择楼盘
  setHouseOption: function (e) {
    console.log("setHouseOption e:" + JSON.stringify(e))
    var id = e.detail.value;
    var houses = vm.data.houses
    vm.setData({
      house: houses[id]
    })
    //进行报备信息检索
    search_param.house_id = vm.data.house.id;
    vm.getDatasFromSrv();
  },
  //选择开始时间
  setStartTime: function (e) {
    console.log("setStartTime e:" + JSON.stringify(e))
    vm.setData({
      start_time: e.detail.value
    })
    search_param.start_time = vm.data.start_time;
    vm.getDatasFromSrv();
  },
  //选择结束时间
  setEndTime: function (e) {
    console.log("setEndTime e:" + JSON.stringify(e))
    vm.setData({
      end_time: e.detail.value
    })
    search_param.end_time = vm.data.end_time;
    vm.getDatasFromSrv();
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

  // 点击标题切换当前页时改变样式
  switchNav: function (e) {
    console.log('switchNav e:' + JSON.stringify(e));
    var cur = e.currentTarget.dataset.current;
    if (vm.data.current_tab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
      //中介
      if (set_role == "0") {
        switch (cur) {
          case 0:
            delete search_param.baobei_status;
            delete search_param.can_jiesuan_status;
            delete search_param.pay_zhongjie_status;
            break;
          case 1:
            search_param.baobei_status = "0";
            delete search_param.can_jiesuan_status;
            delete search_param.pay_zhongjie_status;
            break;
          case 2:
            search_param.baobei_status = "1";
            delete search_param.can_jiesuan_status;
            delete search_param.pay_zhongjie_status;
            break;
          case 3:
            search_param.baobei_status = "2";
            delete search_param.can_jiesuan_status;
            delete search_param.pay_zhongjie_status;
            break;
          case 4:
            search_param.baobei_status = "3";
            delete search_param.can_jiesuan_status;
            delete search_param.pay_zhongjie_status;
            break;
          case 5:
            search_param.baobei_status = "4";
            delete search_param.can_jiesuan_status;
            delete search_param.pay_zhongjie_status;
            break;
          case 6:
            search_param.can_jiesuan_status = "0";
            delete search_param.baobei_status;
            delete search_param.pay_zhongjie_status;
            break;
          case 7:
            search_param.pay_zhongjie_status = "1";
            delete search_param.baobei_status;
            delete search_param.can_jiesuan_status;
            break;
        }
      }
      //案场负责人
      if (set_role == "1") {
        switch (cur) {
          case 0:
            delete search_param.baobei_status;
            delete search_param.can_jiesuan_status;
            delete search_param.pay_zhongjie_status;
            break;
          case 1:
            search_param.baobei_status = "0";
            delete search_param.can_jiesuan_status;
            delete search_param.pay_zhongjie_status;
            break;
          case 2:
            search_param.baobei_status = "1";
            delete search_param.can_jiesuan_status;
            delete search_param.pay_zhongjie_status;
            break;
          case 3:
            search_param.baobei_status = "2";
            delete search_param.can_jiesuan_status;
            delete search_param.pay_zhongjie_status;
            break;
          case 4:
            search_param.baobei_status = "3";
            delete search_param.can_jiesuan_status;
            delete search_param.pay_zhongjie_status;
            break;
          case 5:
            search_param.baobei_status = "4";
            delete search_param.can_jiesuan_status;
            delete search_param.pay_zhongjie_status;
            break;
          case 6:
            search_param.pay_zhongjie_status = "0";
            delete search_param.baobei_status;
            delete search_param.can_jiesuan_status;
            break;
          case 7:
            search_param.pay_zhongjie_status = "1";
            delete search_param.baobei_status;
            delete search_param.can_jiesuan_status;
            break;
        }
      }
      vm.getDatasFromSrv();
    }
  },

  //点击进行报备操作
  clickBaobeiOpt: function (e) {
    console.log("clickBaobeiOpt e:" + JSON.stringify(e));
    var id = e.currentTarget.dataset.id;
    var baobei_status = e.currentTarget.dataset.baobeistatus;
    //中介只允许操作到访前的状态
    if (set_role == "0" && baobei_status != "0") {
      util.showModal("提示信息", "中介只允许操作已报备状态的记录", function (ret) { }, function (ret) { });
      return;
    }
    var param = {
      id: id,
      set_role: set_role
    }
    wx.navigateTo({
      url: '/pages/client/baobeiOpt/baobeiOpt?jsonStr=' + JSON.stringify(param),
    })
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
    // set_role = null;
    vm.reloadPage();
  },
  //重新加载数据和页面-用于页面onLoad和下拉刷新的场景
  reloadPage: function (e) {
    vm.setData({
      house: "",    //选定的楼盘
      start_time: "", //开始日期
      end_time: "", //结束日期
      currentTab: 0,  //设置当前的tab为第一个
      userInfo: util.getLocalUserInfo() //设置用户缓存
    })
    //兼容案场负责人切换身份，set_role初始化为null，这样首次加载等场景即初始化set_role
    if (util.judgeIsAnyNullStr(set_role)) {
      set_role = vm.data.userInfo.role;   //设定用户角色
    }
    vm.setNavTab(); //设置导航tab
    page = 0; //目前page没有意义
    search_param = {
      page: page
    }
    vm.getDatasFromSrv();
  },

  //案场负责人切换角色
  clickSwitchRole: function (e) {
    console.log("clickSwitchRole e:" + JSON.stringify(e));
    //如果set_role为1，则切换为0
    if (set_role == "0") {
      util.showModal("切换身份", "切换为案场负责人", function (ret) {
        set_role = "1";
        vm.reloadPage();
      }, null)
    } else {
      util.showModal("切换身份", "切换为中介", function (ret) {
        set_role = "0";
        vm.reloadPage();
      }, null)
    }

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