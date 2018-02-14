// pages/baobei/selHouse/selHouse.js
var util = require('../../../utils/util.js')

var app = getApp()
var page = 0    //列表页码计数
var vm = null

//搜索接口调用参数
var search_param = {
  level: "1",
  page: page
}

var reload_flag = true;  //重新加载楼盘数组标志

Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: {}, //系统信息
    houses: [],   //楼盘列表信息
    area_text: "全部区域",
    type_text: "全部类型",
    label_text: "全部标签",
    no_view_hidden: "hidden",
    search_word: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
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
    vm = this
    //初始化sysInfo
    app.getSystemInfo(function (res) {
      console.log("getSystemInfo:" + JSON.stringify(res));
      vm.setData({
        systemInfo: res
      })
    })
    util.showLoading('加载中...');
    vm.getHouseList(); //搜索楼盘
    vm.getSearchOptions();  //获取搜索楼盘选项
  },

  //获取楼盘列表
  getHouseList: function () {
    util.searchHouseByCon(search_param, function (res) {
      console.log("getHouseList res:" + JSON.stringify(res))
      var houses_arr = [];
      if (!reload_flag) {
        var houses_arr = vm.data.houses;
      }
      reload_flag = false;
      var msgObj = res.data.ret
      console.log("msgObj.length length:" + msgObj.length);
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
      for (var i = 0; i < msgObj.length; i++) {
        houses_arr.push(msgObj[i]);
      }
      vm.setData({
        houses: houses_arr
      });
      page++; //页面增加
    })
  },
  //获取楼盘搜索选项
  getSearchOptions: function () {
    util.getHouseOptions({}, function (ret) {
      // console.log("getSearchOptions" + JSON.stringify(ret))
      var area_option = ret.data.ret.area
      var type_option = ret.data.ret.type
      var label_option = ret.data.ret.label
      area_option.unshift({ name: "全部区域" })
      type_option.unshift({ name: "全部类型" })
      label_option.unshift({ name: "全部标签" })
      vm.setData({
        area_option: area_option,
        type_option: type_option,
        label_option: label_option,
      })
    })
  },
  //根据区域搜索
  setAreaOption: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var id = e.detail.value;
    var area_option = vm.data.area_option
    if (id == 0) {
      delete search_param.area_id;
    } else {
      search_param.area_id = area_option[id].id;
    }
    vm.setData({
      area_text: area_option[id].name
    })
    console.log("search_param:" + JSON.stringify(search_param));
    util.showLoading('加载中...');
    page = 0;  //page重新计数
    reload_flag = true;   //需要重新加载
    vm.getHouseList();
  },
  //根据类型搜索
  setTypeOption: function (e) {
    console.log('setTypeOption e:', e.detail.value)
    var id = e.detail.value;
    var type_option = vm.data.type_option

    if (id == 0) {
      delete search_param.type_id;
    } else {
      search_param.type_id = type_option[id].id;
    }
    vm.setData({
      type_text: type_option[id].name
    })
    console.log("search_param:" + JSON.stringify(search_param));
    util.showLoading('加载中...');
    page = 0;  //page重新计数
    reload_flag = true;   //需要重新加载
    vm.getHouseList();
  },
  //根据价格进行搜索
  setPriceOption: function (e) {
    console.log('setPriceOption e:', e.detail.value)
    var id = e.detail.value;
    var price_option = vm.data.price_option
    if (id == 0) {
      delete search_param.price_min;
      delete search_param.price_max;
    } else {
      search_param.price_min = price_option[id].price_min;
      search_param.price_max = price_option[id].price_max;
    }
    console.log("search_param:" + JSON.stringify(search_param));
    util.showLoading('加载中...');
    page = 0;  //page重新计数
    reload_flag = true;   //需要重新加载
    vm.getHouseList();
  },

  //根据标签搜索
  setLabelOption: function (e) {
    console.log('setLabelOption e:', e.detail.value)
    var id = e.detail.value;
    var label_option = vm.data.label_option
    var id = e.detail.value;
    if (id == 0) {
      delete search_param.label_id;
    } else {
      search_param.label_id = label_option[id].id;
    }
    vm.setData({
      label_text: label_option[id].name
    })
    console.log("search_param:" + JSON.stringify(search_param));
    util.showLoading('加载中...');
    page = 0;  //page重新计数
    reload_flag = true;   //需要重新加载
    vm.getHouseList();
  },

  // 根据房源id获取房源信息
  clickHouse: function (e) {
    console.log("clickHouse e:" + JSON.stringify(e))
    if (util.isNeedNavigateToSetMyInfoPage()) {
      wx.navigateTo({
        url: '/pages/setMyInfo/setMyInfo?jsonStr=null'
      })
    } else {
      var house_id = JSON.stringify(e.currentTarget.dataset.house_id)
      wx.navigateTo({
        url: '/pages/baobei/baobei?house_id=' + house_id
      })
    }

  },
  //输入楼盘名称
  inputSearchWord: function (e) {
    console.log("inputRealName e:" + JSON.stringify(e));
    this.setData({
      search_word: e.detail.value
    })
  },
  //点击搜索，跳转到搜索页面
  clickSearch: function () {
    var param = {
      search_word: vm.data.search_word,
      level: "1"
    }
    reload_flag = true;
    util.searchHouseByName(param, function (res) {
      console.log("searchHouseByName res:" + JSON.stringify(res))
      var houses_arr = [];
      if (!reload_flag) {
        var houses_arr = vm.data.houses;
      }
      reload_flag = false;
      var msgObj = res.data.ret
      console.log("msgObj.length length:" + msgObj.length);
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
      for (var i = 0; i < msgObj.length; i++) {
        houses_arr.push(msgObj[i]);
      }
      vm.setData({
        houses: houses_arr
      });
      page++; //页面增加
    }, null);
  },
  //选中楼盘
  selHouse: function (e) {
    console.log("selHouse e:" + JSON.stringify(e))
    var house = {
      title: e.currentTarget.dataset.housename,
      id: e.currentTarget.dataset.houseid,
    }
    var pages = getCurrentPages()
    var prePage = pages[pages.length - 2]
    prePage.setData({
      house: house
    })
    util.navigateBack(1);
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