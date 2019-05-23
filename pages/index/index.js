var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
var vm = null

var reload_flag = true; //重新加载楼盘数组标志

//价格选项
var price_option = [{
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
  page: 1,
  level: '0'
}

Page({
  data: {
    ads: [], //轮播图
    systemInfo: {}, //系统信息
    houses: [], //楼盘列表信息
    index: 0,
    area_text: "全部区域",
    type_text: "全部类型",
    label_text: "全部标签",
    no_view_hidden: "hidden", //未检索到数据的提示页面
    search_word: "",
    hidden: "hidden" //hidden来控制页面显示，待页面数据加载完毕再展现
  },
  //页面加载
  onLoad: function(options) {
    vm = this
    search_param.page = 1;
    //初始化sysInfo
    app.getSystemInfo(function(res) {
      console.log("getSystemInfo:" + JSON.stringify(res));
      vm.setData({
        systemInfo: res
      })
    })
    //获取首页需要的信息
    util.showLoading('加载中...');
    vm.setADSwiper(); //获取轮播图
    vm.getSearchOptions(); //获取搜索楼盘选项
    vm.getHouseList(); //搜索楼盘
    util.refreshLocalUserInfo();
  },
  //展示
  onShow: function() {
    console.log('onShow')
    //判断是否需要登录
    util.isNeedNavigateToSetMyInfoPage()
  },
  //获取广告图片
  setADSwiper: function() {
    util.getADs({}, function(ret) {
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
  getHouseList: function() {
    util.house_getListByCon(search_param, function(res) {
      console.log("getHouseList res:" + JSON.stringify(res))
      var houses_arr = [];
      if (!reload_flag) { //如果不是重新加载，设置houses_arr为现有的vm.data.houses
        houses_arr = vm.data.houses;
      }
      reload_flag = false;
      //处理将hidden设置为空，使页面展示
      vm.setData({
        hidden: ""
      })
      var msgObj = res.data.ret.data;
      console.log("msgObj.length length:" + msgObj.length);
      for (var i = 0; i < msgObj.length; i++) {
        houses_arr.push(msgObj[i]);
      }
      vm.setData({
        houses: houses_arr
      });
      //是否展示未找到楼盘的提示
      if (vm.data.houses.length == 0) {
        vm.setData({
          no_view_hidden: ""
        })
      } else {
        vm.setData({
          no_view_hidden: "hidden"
        })
      }
      search_param.page = search_param.page + 1; //页面增加
      wx.stopPullDownRefresh();
    })
  },
  //获取楼盘搜索选项
  getSearchOptions: function() {
    util.getHouseOptions({}, function(ret) {
      // console.log("getSearchOptions" + JSON.stringify(ret))
      var area_option = ret.data.ret.area
      var type_option = ret.data.ret.type
      var label_option = ret.data.ret.label
      area_option.unshift({
        name: "全部区域"
      })
      type_option.unshift({
        name: "全部类型"
      })
      label_option.unshift({
        name: "全部标签"
      })
      vm.setData({
        area_option: area_option,
        type_option: type_option,
        label_option: label_option,
        price_option: price_option,
      })
    })
  },
  //根据区域搜索
  setAreaOption: function(e) {
    reload_flag = true;
    search_param.page = 1;
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
    vm.getHouseList();
  },
  //根据类型搜索
  setTypeOption: function(e) {
    reload_flag = true;
    search_param.page = 1;
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
    vm.getHouseList();
  },
  //根据价格进行搜索
  setPriceOption: function(e) {
    reload_flag = true;
    search_param.page = 1;
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
    vm.getHouseList();
  },

  //根据标签搜索
  setLabelOption: function(e) {
    reload_flag = true;
    search_param.page = 1;
    console.log('setLabelOption e:', e.detail.value)
    var id = e.detail.value;
    var label_option = vm.data.label_option
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
    vm.getHouseList();
  },

  // 点击楼盘跳转到详情页面
  clickHouse: function(e) {
    console.log("clickHouse e:" + JSON.stringify(e))
    //判断是否需要登录
    util.isNeedNavigateToSetMyInfoPage();
    //util.showModal("提示信息","该功能由月月负责迁移代码",null,null);
    var id = JSON.stringify(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/houseInfo/houseInfo?id=' + id
    })
  },
  //点击广告跳转到咨询页面
  jumpZixun: function(e) {
    console.log("jumpZixun e:" + JSON.stringify(e))
    // util.showModal("提示信息", "该功能由月月负责迁移代码", null, null);
    var index = e.currentTarget.dataset.index;
    console.log("ad:" + JSON.stringify(vm.data.ads[index]));
    if (vm.data.ads[index].type == "1") {
      wx.navigateTo({
        url: '/pages/index/zixun/zixun?id=' + vm.data.ads[index].id,
      })
    }
  },
  //输入楼盘名称
  inputSearchWord: function(e) {
    console.log("inputRealName e:" + JSON.stringify(e));
    this.setData({
      search_word: e.detail.value
    })
  },
  //点击报备用户
  clickBaobeiBtn: function(e) {
    console.log("clickBaobeiBtn e:" + JSON.stringify(e))
    //判断是否需要登录
    util.isNeedNavigateToSetMyInfoPage();
    var house_id = JSON.stringify(e.currentTarget.dataset.house_id)
    wx.navigateTo({
      url: '/pages/baobei/baobei?house_id=' + house_id
    });

  },
  //点击搜索，跳转到搜索页面
  clickSearch: function() {
    //点击搜索，则配置search_word和page即可
    search_param.search_word = vm.data.search_word;
    search_param.page = 1;

    reload_flag = true;
    vm.getHouseList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    vm.clearParam();
    vm.setADSwiper(); //获取轮播图
    vm.getHouseList(); //搜索楼盘
    util.refreshLocalUserInfo();    //刷新用户缓存
  },

  //清空参数
  clearParam: function() {
    reload_flag = true;
    search_param = {
      page: 1,
      level: "0"
    }
    vm.setData({
      search_word: "",
      area_text: "全部区域",
      type_text: "全部类型",
      label_text: "全部标签",
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("onReachBottom page:" + search_param.page);
    vm.getHouseList(); //搜索楼盘
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})