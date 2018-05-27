// pages/my/loansCalculator/loansCalculator.js
var vm = null
Page({

  data: {
    select: false,

    countries: ["商业贷款", "公积金贷款", "组合贷款"],
    countryIndex: 0,                  //贷款类型索引   

    loansMoneyValue: '',               //贷款金额
    accumulationFundValue: '',         //公积金贷款金额

    loansMoney: ["5", "10", "15", "20", "25", "30"],
    loansMoneyIndex: 0,               //期限索引   

    interestRate: ["基准利率", "7折利率", "8折利率", "8.3折利率", "8.5折利率", "8.8折利率", "9折利率", "9.5折利率", "1.05折利率", "1.1折利率", "1.2折利率", "1.3折利率"],
    //4.9基本利率
    interestRateNumOne: ["4.90", "3.43", "3.92", "4.07", "4.17", "4.31", "4.41", "4.66", "5.15", "5.39", "5.88", "6.37"],
    //4.75基本利率
    interestRateNumTwo: ["4.75", "3.32", "3.80", "3.94", "4.04", "4.18", "4.28", "4.51", "4.99", "5.23", "5.70", "6.17"],
    interestRateIndex: 0,                         //商贷利率索引   


    interestRateTwo: ["基准利率", "1.1倍利率"],
    //3.25基本利率
    interestRateOneNumTwo: ["3.25", "3.58"],
    //2.75基本利率
    interestRateTwoNumTwo: ["2.75", "3.03"],
    accumulation_fundIndex: 0,                         //公积金利率索引   


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
    //公积金贷款金额
    var accumulationFundValue = vm.data.accumulationFundValue * 10000
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
    } else if (vm.data.countryIndex == 2) {

      //5年以上利率
      if (vm.data.loansMoneyIndex != 0) {
        //
        var interestRate = parseFloat(vm.data.interestRateNumOne[vm.data.interestRateIndex] / 100 / 12)
        var accumulation_fundInterestRate = parseFloat(vm.data.interestRateOneNumTwo[vm.data.accumulation_fundIndex] / 100 / 12)

        console.log('商贷利率1', JSON.stringify(vm.data.interestRateNumOne[vm.data.interestRateIndex]));

        console.log('公积金利率1', JSON.stringify(vm.data.interestRateOneNumTwo[vm.data.accumulation_fundIndex]));
        //5年利率
      } else if (vm.data.loansMoneyIndex == 0) {
        var interestRate = parseFloat(vm.data.interestRateNumTwo[vm.data.interestRateIndex] / 100 / 12)
        var accumulation_fundInterestRate = parseFloat(vm.data.interestRateTwoNumTwo[vm.data.accumulation_fundIndex] / 100 / 12)

        console.log('商贷利率2', JSON.stringify(vm.data.interestRateNumTwo[vm.data.interestRateIndex]));

        console.log('公积金利率2', JSON.stringify(vm.data.interestRateTwoNumTwo[vm.data.accumulation_fundIndex]));
      }

    }

    //本息
    if (vm.data.select == false) {
      //月供结果一
      var result_one = loansMoneyValue * interestRate * Math.pow((1 + interestRate), month)

      //月供结果二
      var result_two = Math.pow((1 + interestRate), month) - 1

      //月供
      var monthly_installment_payment = (result_one / result_two).toFixed(2)

      // 总利息 = 还款月数×每月月供额 - 贷款本金
      var interest = (month * monthly_installment_payment - loansMoneyValue).toFixed(2)

      console.log('商贷月供', JSON.stringify(monthly_installment_payment));


      if (vm.data.countryIndex == 2) {
        //公积金
        //月供结果一
        var accumulation_fund_one = accumulationFundValue * accumulation_fundInterestRate * Math.pow((1 + accumulation_fundInterestRate), month)

        //月供结果二
        var accumulation_fund_two = Math.pow((1 + accumulation_fundInterestRate), month) - 1
        //月供
        var accumulation_fund_monthly_installment_payment = (accumulation_fund_one / accumulation_fund_two).toFixed(2)

        console.log('公积金月供', JSON.stringify(accumulation_fund_monthly_installment_payment));

        // 总利息 = 还款月数×每月月供额 - 贷款本金
        var accumulation_fund_interest = (month * accumulation_fund_monthly_installment_payment - accumulationFundValue).toFixed(2)

        monthly_installment_payment = (parseFloat(monthly_installment_payment) + parseFloat(accumulation_fund_monthly_installment_payment)).toFixed(2)
        interest = (parseFloat(interest) + parseFloat(accumulation_fund_interest)).toFixed(2)
      }
      //本金
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

      if (vm.data.countryIndex == 2) {
        //本金月供：(贷款本金÷还款月数)+ (贷款本金 - 已归还本金累计额) ×月利率
        //月供结果一
        var accumulationFund_one = (accumulationFundValue / month).toFixed(2)
        //月供结果二
        var accumulationFund_two = (accumulationFundValue * accumulation_fundInterestRate).toFixed(2)
        //月供
        var accumulationFund_monthly_installment_payment = (parseFloat(accumulationFund_one) + parseFloat(accumulationFund_two)).toFixed(2)

        monthly_installment_payment = (parseFloat(monthly_installment_payment) + parseFloat(accumulationFund_monthly_installment_payment)).toFixed(2)

        console.log('本金组合月供', JSON.stringify(monthly_installment_payment));

        //总利息 =〔(总贷款额÷还款月数 + 总贷款额×月利率)+ 总贷款额÷还款月数×(1 + 月利率) 〕÷2×还款月数 - 总贷款额    
        var accumulationFund_one = accumulationFundValue / month + accumulationFundValue * accumulation_fundInterestRate
        var accumulationFund_two = accumulationFundValue / month * (1 + accumulation_fundInterestRate)

        var accumulationFund_interest = (accumulationFund_one + accumulationFund_two) / 2 * month - accumulationFundValue
        accumulationFund_interest = accumulationFund_interest.toFixed(2)

        interest = (parseFloat(interest) + parseFloat(accumulationFund_interest)).toFixed(2)

        // 每月月供递减额 = 每月应还本金×月利率 = 贷款本金÷还款月数×月利率   
        var accumulationFund_decrease_progressively = accumulationFundValue / month * accumulation_fundInterestRate
        accumulationFund_decrease_progressively = accumulationFund_decrease_progressively.toFixed(2)

        decrease_progressively = (parseFloat(decrease_progressively) + parseFloat(accumulationFund_decrease_progressively)).toFixed(2)

        vm.setData({ decrease_progressively: decrease_progressively })

      }
    }

    // 还款总额 = 总利息 + 贷款本金
    if (vm.data.countryIndex != 2) {
      var repaymentMoney = (parseFloat(interest) + parseFloat(loansMoneyValue)).toFixed(2)
    } else {
      var repaymentMoney = (parseFloat(interest) + parseFloat(loansMoneyValue) + parseFloat(accumulationFundValue)).toFixed(2)
    }

    vm.setData({ monthly_installment_payment: monthly_installment_payment, interest: interest, repaymentMoney: repaymentMoney })
  },

  bindCountryChange: function (e) {
    console.log('类型', e.detail.value);
    this.setData({
      countryIndex: e.detail.value,   //贷款类型索引        
      loansMoneyIndex: 0,             //期限索引          
      interestRateIndex: 0,           //商贷利率索引      
      accumulation_fundIndex: 0,      //公积金利率索引  
      loansMoneyValue: '',               //贷款金额
      accumulationFundValue: '',         //公积金贷款金额         
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

  accumulationFundInput: function (e) {
    console.log('公积金贷款金额', e.detail.value);
    this.setData({
      accumulationFundValue: e.detail.value
    })
    vm.calculator()
  },


  bindLoansMoney: function (e) {
    console.log('期限', e.detail.value);
    this.setData({
      loansMoneyIndex: e.detail.value,
      interestRateIndex: 0,           //商贷利率索引      
      accumulation_fundIndex: 0,      //公积金利率索引    
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

  bindAccumulationFundInterestRate: function (e) {
    console.log('公积金贷款利率', e.detail.value);
    this.setData({
      accumulation_fundIndex: e.detail.value
    })
    vm.calculator()
  },

  //等额本息 等额本金切换
  select: function () {
    var select = vm.data.select
    vm.setData({
      select: !select,
      // loansMoneyIndex: 0,             //期限索引          
      // interestRateIndex: 0,           //商贷利率索引      
      // accumulation_fundIndex: 0,      //公积金利率索引  
      // loansMoneyValue: '',               //贷款金额
      // accumulationFundValue: '',         //公积金贷款金额   
    })
    vm.calculator()             //计算数据
  },

  //跳转到详情页
  jumpDetail: function () {
    wx.navigateTo({
      url: '/pages/my/loansCalculatorDetail/loansCalculatorDetail',
    })
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