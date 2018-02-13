var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
var page = 0    //列表页码计数
var vm = null

var reload_flag = true;  //重新加载楼盘数组标志

//价格选项
var price_option = [
  {
    "id": 0,
    "name": "全部"
  },
  {
    "id": 1,
    "name": "5000元/m²以下",
    "price_min": 0,
    "price_max": 5000
  },
  {
    "id": 2,
    "name": "5000-6000元/m²",
    "price_min": 5000,
    "price_max": 6000
  },
  {
    "id": 3,
    "name": "6000-7000元/m²",
    "price_min": 6000,
    "price_max": 7000
  },
  {
    "id": 4,
    "name": "7000-8000元/m²",
    "price_min": 7000,
    "price_max": 8000
  },
  {
    "id": 5,
    "name": "8000-9000元/m²",
    "price_min": 8000,
    "price_max": 9000
  },
  {
    "id": 6,
    "name": "9000-10000元/m²",
    "price_min": 9000,
    "price_max": 10000
  },
  {
    "id": 7,
    "name": "10000元/m²以上",
    "price_min": 10000,

  },


];

//搜索接口调用参数
var search_param = {
  page: page
}

Page({
  data: {
    ads: [],    //轮播图
    systemInfo: {}, //系统信息
    houses: [],   //楼盘列表信息
    index: 0,
    area_text: "全部区域",
    type_text: "全部类型",
    label_text: "全部标签",
    no_view_hidden: "hidden"
  },
  //页面加载
  onLoad: function (options) {
    vm = this
  },
  //展示
  onShow: function () {
    console.log('onLoad')
    vm = this
    //初始化sysInfo
    app.getSystemInfo(function (res) {
      console.log("getSystemInfo:" + JSON.stringify(res));
      vm.setData({
        systemInfo: res
      })
    })
    util.showLoading('加载中...');
    vm.setADSwiper();   //获取轮播图
    vm.getHouseList(); //搜索楼盘
    vm.getSearchOptions();  //获取搜索楼盘选项
  },
  //获取广告图片
  setADSwiper: function () {
    util.getADs({}, function (ret) {
      // console.log("getADs:" + JSON.stringify(ret));
      if (ret.data.code == "200") {
        var msgObj = ret.data.ret;
        vm.setData({
          ads: msgObj
        });
      }
    }, null);
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
        price_option: price_option,
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
  //首页按照类型搜索
  getHouseoptionLabel: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var id = e.detail.value;
    var label_option = vm.data.labels
    var name = label_option[id]
    console.log("11111" + JSON.stringify(label_option))
    var param = {
      label_ids: label_option[id].id,
      name: label_option[id].name,

    }
    util.showLoading('页面加载中...');
    util.searchByCon(param, function (ret) {
      console.log("输出：" + JSON.stringify(ret))
      if (ret.data.code == "200") {
        var banli = ret.data.ret
        vm.setData({
          banli: ret.data.ret,
        })
        console.log("输出a：" + JSON.stringify(banli))
      }
    })

  },

  // 根据房源id获取房源信息
  clickHouse: function (e) {
    console.log("clickHouse e:" + JSON.stringify(e))
    var house_id = JSON.stringify(e.currentTarget.dataset.house_id)
    wx.navigateTo({
      url: '/pages/houseInfo/houseInfo?house_id=' + house_id
    })
  },
  //点击广告跳转到咨询页面
  jumpZixun: function (e) {
    console.log("jumpZixun e:" + JSON.stringify(e))
  },
  //点击搜索，跳转到搜索页面
  clickSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})
