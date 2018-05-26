// pages/my/loansCalculator/loansCalculator.js
var vm = null
Page({

  data: {
    select: false,

    countries: ["商业贷款", "公积金贷款", "组合贷款"],
    countryIndex: 0,

    loansMoneyValue: 0,               //贷款金额

    loansMoney: ["5", "10", "15", "20", "25", "30"],
    loansMoneyIndex: 0,

    interestRate: ["基准利率", "7折利率", "8折利率", "8.3折利率", "8.5折利率", "8.8折利率", "9折利率", "9.5折利率", "1.05折利率", "1.1折利率", "1.2折利率", "1.3折利率"],
    //4.9基本利率
    interestRateNumOne: ["4.90", "3.43", "3.92", "4.07", "4.17", "4.31", "4.41", "4.66", "5.15", "5.39", "5.88", "6.37"],
    //4.75基本利率
    interestRateNumTwo: ["4.75", "3.32", "3.80", "3.94", "4.04", "4.18", "4.28", "4.51", "4.99", "5.23", "5.70", "6.17"],


    interestRateTwo: ["基准利率", "1.1倍利率"],
    //3.25基本利率
    interestRateOneNumTwo: ["3.25", "3.58"],
    //2.75基本利率
    interestRateTwoNumTwo: ["2.75", "3.03"],
    interestRateIndex: 0,

    monthly_installment_payment: "0.00",     //月供
    interest: '0.00',                        //总利息
    repaymentMoney: '0.00',                  //还款总额
    decrease_progressively: '0.00',          //本金递减
  },

  onLoad: function (options) {
    vm = this
    vm.calculator()             //计算数据
  },


  //计算数据
  calculator: function () {
    //本息月供：[贷款本金×月利率×（1 + 月利率）^还款月数]÷[（1 + 月利率）^还款月数－1]
    //还款月数
    var month = parseFloat(vm.data.loansMoney[vm.data.loansMoneyIndex] * 12)

    //贷款金额
    var loansMoneyValue = vm.data.loansMoneyValue * 10000

    //月利率
    //商业贷款
    if (vm.data.countryIndex == 0) {
      //4.75基本利率
      if (vm.data.loansMoneyIndex != 0) {
        var interestRate = parseFloat(vm.data.interestRateNumOne[vm.data.interestRateIndex] / 100 / 12)
        //4.9基本利率
      } else if (vm.data.loansMoneyIndex == 0) {
        var interestRate = parseFloat(vm.data.interestRateNumTwo[vm.data.interestRateIndex] / 100 / 12)
      }
      //3.25基本利率
    } else if (vm.data.countryIndex == 1) {
      if (vm.data.loansMoneyIndex != 0) {
        var interestRate = parseFloat(vm.data.interestRateOneNumTwo[vm.data.interestRateIndex] / 100 / 12)
        //2.75基本利率
      } else if (vm.data.loansMoneyIndex == 0) {
        var interestRate = parseFloat(vm.data.interestRateTwoNumTwo[vm.data.interestRateIndex] / 100 / 12)
      }
    }

    if (vm.data.select == false) {
      //月供结果一
      var result_one = loansMoneyValue * interestRate * Math.pow((1 + interestRate), month)

      //月供结果二
      var result_two = Math.pow((1 + interestRate), month) - 1

      //月供
      var monthly_installment_payment = (result_one / result_two).toFixed(2)

      // 总利息 = 还款月数×每月月供额 - 贷款本金
      var interest = (month * monthly_installment_payment - loansMoneyValue).toFixed(2)
    } else {
      //本金月供：(贷款本金÷还款月数)+ (贷款本金 - 已归还本金累计额) ×月利率
      //月供结果一
      var result_one = (loansMoneyValue / month).toFixed(2)
      //月供结果二
      var result_two = (loansMoneyValue * interestRate).toFixed(2)
      //月供
      var monthly_installment_payment = (parseFloat(result_one) + parseFloat(result_two)).toFixed(2)

      //总利息 =〔(总贷款额÷还款月数 + 总贷款额×月利率)+ 总贷款额÷还款月数×(1 + 月利率) 〕÷2×还款月数 - 总贷款额    
      var interest_one = loansMoneyValue / month + loansMoneyValue * interestRate
      var interest_two = loansMoneyValue / month * (1 + interestRate)

      var interest = (interest_one + interest_two) / 2 * month - loansMoneyValue
      interest = interest.toFixed(2)

      // 每月月供递减额 = 每月应还本金×月利率 = 贷款本金÷还款月数×月利率   
      var decrease_progressively = loansMoneyValue / month * interestRate
      decrease_progressively = decrease_progressively.toFixed(2)

      vm.setData({ decrease_progressively: decrease_progressively })

      console.log('result_one', JSON.stringify(decrease_progressively))
    }

    // 还款总额 = 总利息 + 贷款本金
    var repaymentMoney = (parseFloat(interest) + parseFloat(loansMoneyValue)).toFixed(2)


    vm.setData({ monthly_installment_payment: monthly_installment_payment, interest: interest, repaymentMoney: repaymentMoney })
  },

  bindCountryChange: function (e) {
    console.log('类型', e.detail.value);
    this.setData({
      countryIndex: e.detail.value,
      loansMoneyIndex: 0,
      interestRateIndex: 0
    })
    vm.calculator()
  },

  loansMoneyInput: function (e) {
    console.log('金额', e.detail.value);
    this.setData({
      loansMoneyValue: e.detail.value
    })
    vm.calculator()
  },

  bindLoansMoney: function (e) {
    console.log('期限', e.detail.value);
    this.setData({
      loansMoneyIndex: e.detail.value,
      interestRateIndex: 0
    })
    vm.calculator()
  },

  bindInterestRate: function (e) {
    console.log('利率', e.detail.value);
    this.setData({
      interestRateIndex: e.detail.value
    })
    vm.calculator()
  },



  //等额本息 等额本金切换
  select: function () {
    var select = vm.data.select
    vm.setData({ select: !select })
    vm.calculator()             //计算数据
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