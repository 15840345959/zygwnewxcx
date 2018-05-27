// pages/my/loansCalculatorDetail/loansCalculatorDetail.js
var vm = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    loansMoney: ["5", "10", "15", "20", "25", "30"],
    //4.9基本利率
    interestRateNumOne: ["4.90", "3.43", "3.92", "4.07", "4.17", "4.31", "4.41", "4.66", "5.15", "5.39", "5.88", "6.37"],
    //4.75基本利率
    interestRateNumTwo: ["4.75", "3.32", "3.80", "3.94", "4.04", "4.18", "4.28", "4.51", "4.99", "5.23", "5.70", "6.17"],
    //3.25基本利率
    interestRateOneNumTwo: ["3.25", "3.58"],
    //2.75基本利率
    interestRateTwoNumTwo: ["2.75", "3.03"],

    monthly_installment_payment: "0.00",     //月供
    interest: '0.00',                        //总利息
    repaymentMoney: '0.00',                  //还款总额
    decrease_progressively: '0.00',          //本金递减
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    vm = this
    vm.getCurrentPages()
  },

  //获取上一个页面
  getCurrentPages: function () {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    var select = prevPage.data.select           //本息本金索引      
    var countryIndex = prevPage.data.countryIndex           //贷款类型索引   
    var loansMoneyValue = prevPage.data.loansMoneyValue     //贷款金额
    var accumulationFundValue = prevPage.data.accumulationFundValue //公积金贷款金额
    var loansMoneyIndex = prevPage.data.loansMoneyIndex    //期限索引  
    var interestRateIndex = prevPage.data.interestRateIndex     //商贷利率索引   
    var accumulation_fundIndex = prevPage.data.accumulation_fundIndex  //公积金利率索引
    vm.setData({
      countryIndex: countryIndex,
      loansMoneyValue: loansMoneyValue,
      accumulationFundValue: accumulationFundValue,
      loansMoneyIndex: loansMoneyIndex,
      interestRateIndex: interestRateIndex,
      accumulation_fundIndex: accumulation_fundIndex
    })
    console.log("一条交易信息" + JSON.stringify(loansMoneyIndex))
    vm.calculator()
  },
  //等额本息 等额本金切换
  select: function () {
    var select = vm.data.select
    vm.setData({
      select: !select,
    })
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
      //4.9基本利率
      if (vm.data.loansMoneyIndex != 0) {
        var interestRate = parseFloat(vm.data.interestRateNumOne[vm.data.interestRateIndex] / 100 / 12)
        var interestRate_one = vm.data.interestRateNumOne[vm.data.interestRateIndex] / 100 / 12
        //4.75基本利率
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

      // console.log('商贷月供', JSON.stringify(monthly_installment_payment));

      if (vm.data.countryIndex == 2) {
        //公积金
        //月供结果一
        var accumulation_fund_one = accumulationFundValue * accumulation_fundInterestRate * Math.pow((1 + accumulation_fundInterestRate), month)

        //月供结果二
        var accumulation_fund_two = Math.pow((1 + accumulation_fundInterestRate), month) - 1
        //月供
        var accumulation_fund_monthly_installment_payment = (accumulation_fund_one / accumulation_fund_two).toFixed(2)

        // console.log('公积金月供', JSON.stringify(accumulation_fund_monthly_installment_payment));

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


    //总还款额
    var residue = repaymentMoney
    if (vm.data.select == false) {
      // 每月应还本金 = 贷款本金×月利率×(1 + 月利率) ^ (还款月序号 - 1) ÷〔(1 + 月利率) ^ 还款月数 - 1〕
      var total_loans = (parseFloat(loansMoneyValue)).toFixed(2)
      var yearDataList = []
      var dataList = []
      for (var i = 0; i < month; i++) {
        var month_principal_one = total_loans * interestRate
        var month_principal_two = Math.pow((1 + interestRate), i)
        var month_principal_three = parseFloat(Math.pow((1 + interestRate), month)) - 1
        //月供本金
        var month_principal = (parseFloat(month_principal_one) * parseFloat(month_principal_two) / parseFloat(month_principal_three)).toFixed(2)

        // 每月应还利息 = 贷款本金×月利率×〔(1 + 月利率) ^ 还款月数 - (1 + 月利率) ^ (还款月序号 - 1) 〕÷〔(1 + 月利率) ^ 还款月数 - 1〕
        var month_interest_one = total_loans * interestRate
        var month_interest_two = Math.pow((1 + interestRate), month)
        var month_interest_three = parseFloat(Math.pow((1 + interestRate), i))
        var month_interest_four = parseFloat(Math.pow((1 + interestRate), month)) - 1
        var month_interest_five = month_interest_two - month_interest_three
        var month_interest = (month_interest_one * month_interest_five / month_interest_four).toFixed(2)
        // console.log('本月应还利息', JSON.stringify(month_interest));

        var monthindex = i % 12 + 1
        var dataListIndex = { monthindex: monthindex, month_principal, month_principal, month_interest: month_interest }
        if (vm.data.countryIndex != 2) {
          residue = (residue - month_principal - month_interest).toFixed(2)
          var dataListIndex = { monthindex: monthindex, month_principal, month_principal, month_interest: month_interest, residue: residue }
        }

        dataList.push(dataListIndex)

        //如果到了一年 就push到yearDataList中
        if (monthindex / 12 == 1) {
          yearDataList.push({ dataList })
          dataList = []
        }
      }


      if (vm.data.countryIndex == 2) {
        // 每月应还本金 = 贷款本金×月利率×(1 + 月利率) ^ (还款月序号 - 1) ÷〔(1 + 月利率) ^ 还款月数 - 1〕accumulation_fundInterestRate
        var total_loans = (parseFloat(accumulationFundValue)).toFixed(2)

        var yearDataList_one = []
        var dataList = []
        for (var i = 0; i < month; i++) {

          var month_principal_one = total_loans * accumulation_fundInterestRate
          var month_principal_two = Math.pow((1 + accumulation_fundInterestRate), i)
          var month_principal_three = parseFloat(Math.pow((1 + accumulation_fundInterestRate), month)) - 1
          //月供本金
          var monthUpIndex = i % 12
          if (i == 0) {
            var yearIndex = 0
          } else {
            var yearIndex = Math.ceil(i / 12) - 1      //第几年
          }

          // console.log('-------', JSON.stringify(yearDataList[yearIndex]))
          var up_month_principal = yearDataList[yearIndex].dataList[monthUpIndex].month_principal

          month_principal = ((parseFloat(month_principal_one) * parseFloat(month_principal_two) / parseFloat(month_principal_three)) + parseFloat(up_month_principal)).toFixed(2)
          // 每月应还利息 = 贷款本金×月利率×〔(1 + 月利率) ^ 还款月数 - (1 + 月利率) ^ (还款月序号 - 1) 〕÷〔(1 + 月利率) ^ 还款月数 - 1〕
          var month_interest_one = total_loans * accumulation_fundInterestRate
          var month_interest_two = Math.pow((1 + accumulation_fundInterestRate), month)
          var month_interest_three = parseFloat(Math.pow((1 + accumulation_fundInterestRate), i))
          var month_interest_four = parseFloat(Math.pow((1 + accumulation_fundInterestRate), month)) - 1
          var month_interest_five = month_interest_two - month_interest_three
          var up_month_interest = yearDataList[yearIndex].dataList[monthUpIndex].month_interest
          // 每月应还利息 = 贷款本金×月利率×〔(1 + 月利率) ^ 还款月数 - (1 + 月利率) ^ (还款月序号 - 1) 〕÷〔(1 + 月利率) ^ 还款月数 - 1〕
          month_interest = (month_interest_one * month_interest_five / month_interest_four).toFixed(2)

          month_interest = (parseFloat(month_interest) + parseFloat(up_month_interest)).toFixed(2)

          console.log('应还利息', JSON.stringify(month_interest))

          var monthindex = i % 12 + 1
          residue = (residue - month_principal - month_interest).toFixed(2)

          var dataListIndex = { monthindex: monthindex, month_principal, month_principal, month_interest: month_interest, residue: residue }
          dataList.push(dataListIndex)

          //如果到了一年 就push到yearDataList中
          if (monthindex / 12 == 1) {
            yearDataList_one.push({ dataList })
            dataList = []
          }
        }
        yearDataList = yearDataList_one
      }
      vm.setData({ yearDataList: yearDataList })
      //本金
    } else {
      //总贷款额
      // var total_loans = (parseFloat(loansMoneyValue) + parseFloat(accumulationFundValue)).toFixed(2)
      var total_loans = (parseFloat(loansMoneyValue)).toFixed(2)
      var yearDataList = []
      var dataList = []

      for (var i = 0; i < month; i++) {
        // 每月应还本金 = 贷款本金÷还款月数
        // 不省略
        var month_principal_all = total_loans / month
        // 省略
        var month_principal = (total_loans / month).toFixed(2)
        // 每月应还利息 = 剩余本金×月利率 = (贷款本金 - 已归还本金累计额) ×月利率
        var month_interest = ((total_loans - i * month_principal_all) * interestRate).toFixed(2)

        if (vm.data.countryIndex == 2) {
          var total_loans = parseFloat(accumulationFundValue).toFixed(2)
          // 每月应还本金 = 贷款本金 ÷ 还款月数
          var month_principal_noadd = total_loans / month     //公积金每月应还本金
          month_principal = (parseFloat(total_loans / month) + parseFloat(month_principal_all)).toFixed(2)
          var month_interest_save = month_interest
          // 每月应还利息 = 剩余本金×月利率 = (贷款本金 - 已归还本金累计额) ×月利率
          var month_interest = ((total_loans - i * month_principal_noadd) * accumulation_fundInterestRate).toFixed(2)
          month_interest = (parseFloat(month_interest_save) + parseFloat(month_interest)).toFixed(2)
        }

        residue = (residue - month_principal - month_interest).toFixed(2)

        var monthindex = i % 12 + 1
        var dataListIndex = { monthindex: monthindex, month_principal, month_principal, month_interest: month_interest, residue: residue }
        dataList.push(dataListIndex)

        //如果到了一年 就push到yearDataList中
        if (monthindex / 12 == 1) {
          // console.log('本月应还本金', JSON.stringify(dataList))
          yearDataList.push({ dataList })
          dataList = []
        }
      }

      vm.setData({ yearDataList: yearDataList })
    }

    //总还款 以万为单位
    repaymentMoney = (repaymentMoney / 10000).toFixed(2)
    //总利息 以万为单位
    interest = (interest / 10000).toFixed(2)
    //总贷款额 以万为单位
    var total_loans = ((parseFloat(loansMoneyValue) + parseFloat(accumulationFundValue)) / 10000).toFixed(2)
    // console.log('-----------', JSON.stringify(total_loans))
    var loans_month = month

    vm.setData({ total_loans: total_loans, loans_month, loans_month })

    vm.setData({ monthly_installment_payment: monthly_installment_payment, interest: interest, repaymentMoney: repaymentMoney })
  },

  /**
   * 生命周期函数监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数监听页面显示
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