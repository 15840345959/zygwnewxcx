var util = require('../../../utils/util.js')
var vm = null
Page({
  data: {
    inputLoanTime: "",//贷款年限
    inputTotalMoney: "",//贷款总额
    inputHouseTotal: "",//房屋总价
    chooseLoanType: [
      { name: '商业贷款', value: '0', checked: true },
      { name: '公积金贷款', value: '1' },
      // { name: '组合贷款', value: '2' },
    ],//贷款类型
    chooseCountWay: [
      { name: '按房屋总价', value: '0' },
      { name: '按贷款总额', value: '1', checked: true },

    ],//计算方式

    chooseInterestRate: [
      { name: '0.7', value: '0', checked: true },
      { name: '0.85', value: '1', },
      { name: '基准利率', value: '3' },
      { name: '1.1', value: '4' },
      { name: '1.2', value: '5' },
    ],//贷款年利率倍数

  },
 
  // 贷款类型
  setLoanType: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var chooseLoanType = this.data.chooseLoanType;
    var len = chooseLoanType.length
    for (var i = 0; i < len; ++i) {
      chooseLoanType[i].checked = (chooseLoanType[i].value == e.detail.value);

    }

    this.setData({
      chooseLoanType: chooseLoanType
    });
  },



  // 计算方式
  setCountWay: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var chooseCountWay = this.data.chooseCountWay;
    for (var i = 0, len = chooseCountWay.length; i < len; ++i) {
      chooseCountWay[i].checked = chooseCountWay[i].value == e.detail.value;
    }

    this.setData({
      chooseCountWay: chooseCountWay,

    });
  },

  //输入贷款年限
  getYear: function (e) {
    console.log("输入框的文字" + e.detail.value)
    var inputLoanTime = e.detail.value
    this.setData({
      inputLoanTime: inputLoanTime
    })

  },
  //输入贷款总额
  getTotal: function (e) {
    console.log("输入框的文字" + e.detail.value)
    var inputTotalMoney = e.detail.value
    this.setData({
      inputTotalMoney: inputTotalMoney
    })

  },
//输入已还款月数
  getMonth: function (e) {
    console.log("输入框的文字" + e.detail.value)
    var inputHaveGiveMonth = e.detail.value
    this.setData({
      inputHaveGiveMonth: inputHaveGiveMonth
    })

  },
  //房屋总价
  getValue: function (e) {
    console.log("输入框的文字" + e.detail.value)
    var inputHouseTotal = e.detail.value
    this.setData({
      inputHouseTotal: inputHouseTotal
    })

  },

  // 计算
  jumpJisuan: function (e) {
    var inputLoanTime = this.data.inputLoanTime
    var inputLoanMonth = inputLoanTime * 12   //按照月数 年*12
    var inputTotalMoney = this.data.inputTotalMoney
    var inputHouseTotal = this.data.inputHouseTotal
    var inputHaveGiveMonth = this.data.inputHaveGiveMonth
    //商业贷款的年利率倍数
    var month = 0.0343 / 12 //根据选择不同的年利率倍数所对应的年利率然后再换算成月利率
    var month1 = 0.04165 / 12
    var month2 = 0.049 / 12
    var month3 = 0.05390000000000001 / 12
    var month4 = 0.0588 / 12
    // 公积金贷款的年利率倍数
    var month5 = 0.02275 / 12
    var month6 = 0.027624999999999997 / 12
    var month7 = 0.0325 / 12
    var month8 = 0.03575 / 12
    var month9 = 0.039 / 12
    //商业贷款类型的等额本息月供

    var oneStep = inputTotalMoney * month//贷款本金*月利率
    var oneStep1 = inputTotalMoney * month1
    var oneStep2 = inputTotalMoney * month2
    var oneStep3 = inputTotalMoney * month3
    var oneStep4 = inputTotalMoney * month4
    var twoStep = Math.pow((1 + month), inputLoanMonth)//（1+月利率）^还款月数
    var twoStep1 = Math.pow((1 + month1), inputLoanMonth)
    var twoStep2 = Math.pow((1 + month2), inputLoanMonth)
    var twoStep3 = Math.pow((1 + month3), inputLoanMonth)
    var twoStep4 = Math.pow((1 + month4), inputLoanMonth)
    // var twoStep3 = Math.pow((1 + month3), inputLoanMonth)
    // var twoStep4 = Math.pow((1 + month4), inputLoanMonth)
    var oneCountMonthlyPayment = ((oneStep * twoStep) / (twoStep - 1)).toFixed(2)//商业贷款等额本息月供
   
    var twoCountMonthlyPayment = ((oneStep1 * twoStep1) / (twoStep1 - 1)).toFixed(2)
    var threeCountMonthlyPayment = ((oneStep2 * twoStep2) / (twoStep2 - 1)).toFixed(2)
    var fourCountMonthlyPayment = ((oneStep3 * twoStep3) / (twoStep3 - 1)).toFixed(2)
    var fiveCountMonthlyPayment = ((oneStep4 * twoStep4) / (twoStep4 - 1)).toFixed(2)

    //商业贷款的等额本金月供
    //每月应还本金
    var benjin = inputTotalMoney / inputLoanMonth//每月应还本金=贷款本金/还款月数
    var zbenjin = benjin * inputHaveGiveMonth //每月应还本金*以还款月数

    var oneCountBenjinMonthlyPayment = ((inputTotalMoney / inputLoanMonth) + (parseInt(inputTotalMoney) - parseInt(zbenjin)) * month).toFixed(2)   //商业贷款等额本金每月月供额
    var twoCountBenjinMonthlyPayment = ((inputTotalMoney / inputLoanMonth) + (parseInt(inputTotalMoney) - parseInt(zbenjin)) * month1).toFixed(2)
    var threeCountBenjinMonthlyPayment = ((inputTotalMoney / inputLoanMonth) + (parseInt(inputTotalMoney) - parseInt(zbenjin)) * month2).toFixed(2)
    var fourCountBenjinMonthlyPayment = ((inputTotalMoney / inputLoanMonth) + (parseInt(inputTotalMoney) - parseInt(zbenjin)) * month3).toFixed(2)
    var fiveCountBenjinMonthlyPayment = ((inputTotalMoney / inputLoanMonth) + (parseInt(inputTotalMoney) - parseInt(zbenjin)) * month4).toFixed(2)


    //公积金类型的等额本金月供
    var oneGongjijinBenjinMonthlyPayment = ((inputTotalMoney / inputLoanMonth) + (parseInt(inputTotalMoney) - parseInt(zbenjin)) * month5).toFixed(2)  //公积金等额本金每月月供额
    var twoGongjijinBenjinMonthlyPayment = ((inputTotalMoney / inputLoanMonth) + (parseInt(inputTotalMoney) - parseInt(zbenjin)) * month6).toFixed
    var threeGongjijinBenjinMonthlyPayment = ((inputTotalMoney / inputLoanMonth) + (parseInt(inputTotalMoney) - parseInt(zbenjin)) * month7).toFixed(2)
    var fourGongjijinBenjinMonthlyPayment = ((inputTotalMoney / inputLoanMonth) + (parseInt(inputTotalMoney) - parseInt(zbenjin)) * month8).toFixed(2)
    var fiveGongjijinBenjinMonthlyPayment = ((inputTotalMoney / inputLoanMonth) + (parseInt(inputTotalMoney) - parseInt(zbenjin)) * month9).toFixed(2)
    // 公积金类型的等额本息年利率倍数的月供

    var aa = inputTotalMoney * month5
    var aa1 = inputTotalMoney * month6
    var aa2 = inputTotalMoney * month7
    var aa3 = inputTotalMoney * month8
    var aa4 = inputTotalMoney * month9
    var aaa = Math.pow((1 + month5), inputLoanMonth)
    var aaa1 = Math.pow((1 + month6), inputLoanMonth)
    var aaa2 = Math.pow((1 + month7), inputLoanMonth)
    var aaa3 = Math.pow((1 + month8), inputLoanMonth)
    var aaa4 = Math.pow((1 + month9), inputLoanMonth)


    var inputValg = ((aa * aaa) / (aaa - 1)).toFixed(2)
    // console.log('7', JSON.stringify(inputValg))
    var inputValgg = ((aa1 * aaa1) / (aaa1 - 1)).toFixed(2)
    var inputValggg = ((aa2 * aaa) / (aaa2 - 1)).toFixed(2)
    var inputValgggg = ((aa3 * aaa) / (aaa3 - 1)).toFixed(2)
    var inputValggggg = ((aa4 * aaa) / (aaa4 - 1)).toFixed(2)
    var inputYue = inputLoanTime * 12
    // 商业贷款类型
    var inputLixi = (inputYue * oneCountMonthlyPayment - inputTotalMoney).toFixed(2)
    var inputLixi1 = (inputYue * twoCountMonthlyPayment - inputTotalMoney).toFixed(2)
    var inputLixi2 = (inputYue * threeCountMonthlyPayment - inputTotalMoney).toFixed(2)
    var inputLixi3 = (inputYue * fourCountMonthlyPayment - inputTotalMoney).toFixed(2)
    var inputLixi4 = (inputYue * fiveCountMonthlyPayment - inputTotalMoney).toFixed(2)
    //  公积金贷款类型总利息
    var inputLixig = (inputYue * inputValg - parseInt(inputTotalMoney)).toFixed(2)
    console.log('666', JSON.stringify(inputLixig));
    var inputLixigg = (inputYue * inputValgg - inputTotalMoney).toFixed(2)
    var inputLixiggg = (inputYue * inputValggg - inputTotalMoney).toFixed(2)
    var inputLixigggg = (inputYue * inputValgggg - inputTotalMoney).toFixed(2)
    var inputLixiggggg = (inputYue * inputValggggg - inputTotalMoney).toFixed(2)
    //商业等额本金每月递减
    var inputVal55 = (benjin * month).toFixed(2)
    var inputVal555 = (benjin * month1).toFixed(2)
    var inputVal5555 = (benjin * month2).toFixed(2)
    var inputVal55555 = (benjin * month3).toFixed(2)
    var inputVal555555 = (benjin * month4).toFixed(2)
    //公积金本金每月递减
    var inputValgd = (benjin * month5).toFixed(2)
    var inputValgdd = (benjin * month6).toFixed(2)
    var inputValgddd = (benjin * month7).toFixed(2)
    var inputValgdddd = (benjin * month8).toFixed(2)
    var inputValgddddd = (benjin * month9).toFixed(2)
    // 商业贷款等额本金总利息
    var z = inputTotalMoney * month
    var z1 = inputTotalMoney * month1
    var z2 = inputTotalMoney * month2
    var z3 = inputTotalMoney * month3
    var z4 = inputTotalMoney * month4
    //公积金等额本金总利息
    var zg = inputTotalMoney * month5
    var z1g = inputTotalMoney * month6
    var z2g = inputTotalMoney * month7
    var z3g = inputTotalMoney * month8
    var z4g = inputTotalMoney * month9
    // 商业
    var zz = parseInt(benjin) + parseInt(z)
    var zz1 = parseInt(benjin) + parseInt(z1)
    var zz2 = parseInt(benjin) + parseInt(z2)
    var zz3 = parseInt(benjin) + parseInt(z3)
    var zz4 = parseInt(benjin) + parseInt(z4)
    // 公积金
    var zzg = parseInt(benjin) + parseInt(zg)
    var zz1g = parseInt(benjin) + parseInt(z1g)
    var zz2g = parseInt(benjin) + parseInt(z2g)
    var zz3g = parseInt(benjin) + parseInt(z3g)
    var zz4g = parseInt(benjin) + parseInt(z4g)
    //商业
    var zzz = parseInt(1) + parseInt(month)
    var zzz1 = parseInt(1) + parseInt(month1)
    var zzz2 = parseInt(1) + parseInt(month2)
    var zzz3 = parseInt(1) + parseInt(month3)
    var zzz4 = parseInt(1) + parseInt(month4)
    //公积金
    var zzzg = parseInt(1) + parseInt(month5)
    var zzz1g = parseInt(1) + parseInt(month6)
    var zzz2g = parseInt(1) + parseInt(month7)
    var zzz3g = parseInt(1) + parseInt(month8)
    var zzz4g = parseInt(1) + parseInt(month9)
    console.log('1111111', JSON.stringify(benjin));
    console.log('33333', JSON.stringify(zz));
    console.log('44444', JSON.stringify(zzz));
    var inputVal7 = ((zz + parseInt(benjin) * zzz) / 2 * parseInt(inputLoanMonth) - parseInt(inputTotalMoney)).toFixed(2)
    var inputVal77 = ((zz1 + parseInt(benjin) * zzz1) / 2 * parseInt(inputLoanMonth) - parseInt(inputTotalMoney)).toFixed(2)
    var inputVal777 = ((zz2 + parseInt(benjin) * zzz2) / 2 * parseInt(inputLoanMonth) - parseInt(inputTotalMoney)).toFixed(2)
    var inputVal7777 = ((zz3 + parseInt(benjin) * zzz3) / 2 * parseInt(inputLoanMonth) - parseInt(inputTotalMoney)).toFixed(2)
    var inputVal77777 = ((zz4 + parseInt(benjin) * zzz4) / 2 * parseInt(inputLoanMonth) - parseInt(inputTotalMoney)).toFixed(2)

    //公积金
    var inputVal8 = ((zzg + parseInt(benjin) * zzzg) / 2 * parseInt(inputLoanMonth) - parseInt(inputTotalMoney)).toFixed(2)
    var inputVal88 = ((zz1g + parseInt(benjin) * zzz1g) / 2 * parseInt(inputLoanMonth) - parseInt(inputTotalMoney)).toFixed(2)
    var inputVal888 = ((zz2g + parseInt(benjin) * zzz2g) / 2 * parseInt(inputLoanMonth) - parseInt(inputTotalMoney)).toFixed(2)
    var inputVal8888 = ((zz3g + parseInt(benjin) * zzz3g) / 2 * parseInt(inputLoanMonth) - parseInt(inputTotalMoney)).toFixed(2)
    var inputVal88888 = ((zz4g + parseInt(benjin) * zzz4g) / 2 * parseInt(inputLoanMonth) - parseInt(inputTotalMoney)).toFixed(2)
    // 商业本金本息合计
    var inputValshj = parseInt(inputTotalMoney) + parseInt(inputVal7)
    var inputValshj1 = parseInt(inputTotalMoney) + parseInt(inputVal77)
    var inputValshj2 = parseInt(inputTotalMoney) + parseInt(inputVal777)
    var inputValshj3 = parseInt(inputTotalMoney) + parseInt(inputVal7777)
    var inputValshj4 = parseInt(inputTotalMoney) + parseInt(inputVal77777)
    //公积金本金本息合计
    var inputValghj = parseInt(inputTotalMoney) + parseInt(inputVal8)
    var inputValghj1 = parseInt(inputTotalMoney) + parseInt(inputVal88)
    var inputValghj2 = parseInt(inputTotalMoney) + parseInt(inputVal888)
    var inputValghj3 = parseInt(inputTotalMoney) + parseInt(inputVal8888)
    var inputValghj4 = parseInt(inputTotalMoney) + parseInt(inputVal88888)
    // var inputVal7 =[parseInt(inputTVal % inputYYVal + inputTVal * month) + parseInt(inputTVal % inputYYVal * (1 + month))] % 2 * inputYYVal - parseInt(inputTVal)
    // 商业贷款类型本息合计
    var inputVal3 = parseInt(inputTotalMoney) + parseInt(inputLixi)
    var inputVal33 = parseInt(inputTotalMoney) + parseInt(inputLixi1)
    var inputVal333 = parseInt(inputTotalMoney) + parseInt(inputLixi2)
    var inputVal3333 = parseInt(inputTotalMoney) + parseInt(inputLixi3)
    var inputVal33333 = parseInt(inputTotalMoney) + parseInt(inputLixi4)
    // 公积金类型本息合计
    var inputValh = parseInt(inputTotalMoney) + parseInt(inputLixig)
    var inputValhh = parseInt(inputTotalMoney) + parseInt(inputLixigg)
    var inputValhhh = parseInt(inputTotalMoney) + parseInt(inputLixiggg)
    var inputValhhhh = parseInt(inputTotalMoney) + parseInt(inputLixigggg)
    var inputValhhhhh = parseInt(inputTotalMoney) + parseInt(inputLixiggggg)
    // var inputTVal = e.detail.value
    console.log('2222', JSON.stringify(parseInt(inputTotalMoney) + parseInt(inputLixi4)));
    this.setData({
      inputLoanTime: inputLoanTime,
      inputTotalMoney: inputTotalMoney,
      inputHouseTotal: inputHouseTotal,
      oneCountMonthlyPayment: oneCountMonthlyPayment,
      twoCountMonthlyPayment: twoCountMonthlyPayment,
      threeCountMonthlyPayment: threeCountMonthlyPayment,
      fourCountMonthlyPayment: fourCountMonthlyPayment,
      fiveCountMonthlyPayment: fiveCountMonthlyPayment,
      inputValg: inputValg,
      inputValgg: inputValgg,
      inputValggg: inputValggg,
      inputValgggg: inputValgggg,
      inputValggggg: inputValggggg,
      inputVal7: inputVal7,
      inputVal77: inputVal77,
      inputVal777: inputVal777,
      inputVal7777: inputVal7777,
      inputVal77777: inputVal77777,
      inputVal8: inputVal8,
      inputVal88: inputVal88,
      inputVal888: inputVal888,
      inputVal8888: inputVal8888,
      inputVal88888: inputVal88888,
      inputValshj: inputValshj,
      inputValshj1: inputValshj1,
      inputValshj2: inputValshj2,
      inputValshj3: inputValshj3,
      inputValshj4: inputValshj4,
      inputValghj: inputValghj,
      inputValghj1: inputValghj1,
      inputValghj2: inputValghj2,
      inputValghj3: inputValghj3,
      inputValghj4: inputValghj4,
      inputLixig: inputLixig,
      inputLixigg: inputLixigg,
      inputLixiggg: inputLixiggg,
      inputLixigggg: inputLixigggg,
      inputLixiggggg: inputLixiggggg,
      inputValh: inputValh,
      inputValhh: inputValhh,
      inputValhhh: inputValhhh,
      inputValhhhh: inputValhhhh,
      inputValhhhhh: inputValhhhhh,
      inputYue: inputYue,
      inputLixi: inputLixi,
      inputLixi1: inputLixi1,
      inputLixi2: inputLixi2,
      inputLixi3: inputLixi3,
      inputLixi4: inputLixi4,
      inputVal3: inputVal3,
      inputVal33: inputVal33,
      inputVal333: inputVal333,
      inputVal3333: inputVal3333,
      inputVal33333: inputVal33333,
      //inputTVal: inputTVal
      oneCountBenjinMonthlyPayment: oneCountBenjinMonthlyPayment,
      twoCountBenjinMonthlyPayment: twoCountBenjinMonthlyPayment,
      threeCountBenjinMonthlyPayment: threeCountBenjinMonthlyPayment,
      fourCountBenjinMonthlyPayment: fourCountBenjinMonthlyPayment,
      fiveCountBenjinMonthlyPayment: fiveCountBenjinMonthlyPayment,
      inputVal55: inputVal55,
      inputVal555: inputVal555,
      inputVal5555: inputVal5555,
      inputVal55555: inputVal55555,
      inputVal555555: inputVal555555,
      oneGongjijinBenjinMonthlyPayment: oneGongjijinBenjinMonthlyPayment,
      twoGongjijinBenjinMonthlyPayment: twoGongjijinBenjinMonthlyPayment,
      threeGongjijinBenjinMonthlyPayment: threeGongjijinBenjinMonthlyPayment,
      fourGongjijinBenjinMonthlyPayment: fourGongjijinBenjinMonthlyPayment,
      fiveGongjijinBenjinMonthlyPayment: fiveGongjijinBenjinMonthlyPayment,
      inputValgd: inputValgd,
      inputValgdd: inputValgdd,
      inputValgddd: inputValgddd,
      inputValgdddd: inputValgdddd,
      inputValgddddd: inputValgddddd

    })

    if (inputLoanTime == '') {
      wx.showModal({
        content: '请输入贷款期限',
        showCancel: false,
        confirmText: "确定",
        success: function (res) {
          console.log('1111', JSON.stringify(res));
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
    if (inputHouseTotal == '') {
      wx.showModal({
        content: '请输入房屋总价',
        showCancel: false,
        confirmText: "确定",
        success: function (res) {
          console.log('1111', JSON.stringify(res));
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
    if (inputTotalMoney == '') {
      wx.showModal({
        content: '请输入贷款总额',
        showCancel: false,
        confirmText: "确定",
        success: function (res) {
          console.log('1111', JSON.stringify(res));
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }

  },


  //  贷款比例
  slider3change: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var pageData = {}
    for (var i = 1; i < 8; i++) {
      (function (index) {
        pageData['slider' + index + 'change'] = function (e) {
          console.log('slider' + 'index' + '发生 change 事件，携带值为', e.detail.value)
        }
      })(i)
    }
    Page(pageData)
  },

  // 贷款年利率倍数

  setMoneyRate: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var chooseInterestRate = this.data.chooseInterestRate;
    for (var i = 0, len = chooseInterestRate.length; i < len; ++i) {
      chooseInterestRate[i].checked = chooseInterestRate[i].value == e.detail.value;
    }

    this.setData({
      chooseInterestRate: chooseInterestRate
    });
  },

  getClear: function (e) {
    this.setData({
      inputLoanTime: "",
      inputTotalMoney: "",
      inputHouseTotal: "",
      oneCountMonthlyPayment: "",
      twoCountMonthlyPayment: "",
      threeCountMonthlyPayment: "",
      fourCountMonthlyPayment: "",
      fiveCountMonthlyPayment: "",
      inputValg: "",
      inputValgg: "",
      inputValggg: "",
      inputValgggg: "",
      inputValggggg: "",
      inputVal7: "",
      inputVal77: "",
      inputVal777: "",
      inputVal7777: "",
      inputVal77777: "",
      inputVal8: "",
      inputVal88: "",
      inputVal888: "",
      inputVal8888: "",
      inputVal88888: "",
      inputValshj: "",
      inputValshj1: "",
      inputValshj2: "",
      inputValshj3: "",
      inputValshj4: "",
      inputValghj: "",
      inputValghj1: "",
      inputValghj2: "",
      inputValghj3: "",
      inputValghj4: "",
      inputLixig: "",
      inputLixigg: "",
      inputLixiggg: "",
      inputLixigggg: "",
      inputLixiggggg: "",
      inputValh: "",
      inputValhh: "",
      inputValhhh: "",
      inputValhhhh: "",
      inputValhhhhh: "",
      inputYue: "",
      inputLixi: "",
      inputLixi1: "",
      inputLixi2: "",
      inputLixi3: "",
      inputLixi4: "",
      inputVal3: "",
      inputVal33: "",
      inputVal333: "",
      inputVal3333: "",
      inputVal33333: "",
      oneCountBenjinMonthlyPayment: "",
      twoCountBenjinMonthlyPayment: "",
      threeCountBenjinMonthlyPayment: "",
      fourCountBenjinMonthlyPayment: "",
      fiveCountBenjinMonthlyPayment: "",
      inputVal55: "",
      inputVal555: "",
      inputVal5555: "",
      inputVal55555: "",
      inputVal555555: "",
      oneGongjijinBenjinMonthlyPayment: "",
      twoGongjijinBenjinMonthlyPayment: "",
      threeGongjijinBenjinMonthlyPayment: "",
      fourGongjijinBenjinMonthlyPayment: "",
      fiveGongjijinBenjinMonthlyPayment: "",
      inputValgd: "",
      inputValgdd: "",
      inputValgddd: "",
      inputValgdddd: "",
      inputValgddddd: ""


    })

  },

  
});