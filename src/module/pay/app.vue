<style lang="less">
body {
    margin: 0;
    background-color: #eee;
}
.content {
    padding-bottom: 44px;
}
.submit-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background-color: rgb(226,226,226);
}
.active {
    background-color: #ff9736 !important;
}
.tip {
    color: #ec5835;
    font-size: 12px;
    font-size: 10px;
    padding-left: 15px;
    margin-top: 10px;
}
.orders {
    .order {
        background-color: #fff;
        font-size: 16px;
        color: #393939;
        position: relative;
        height: auto;
        width: 100%;
        margin-bottom: 10px;
        .store {
            width: calc(~"100% - 15px");
            height: 44px;
            line-height: 44px;
            margin-left: 15px;
            border-bottom: 1px solid #eee;
        }
        .amount {
            width: calc(~"100% - 15px");
            height: 44px;
            line-height: 44px;
            margin-left: 15px;
            color: #ec5835;
        }
    }
}
.vux-flexbox-item {
  color: #ff9736 !important;
}
</style>

<template>
<div class="content">
  <div class="orders">
    <div class="order" v-for="order in orders">
      <div class="store">{{order.name}}</div>
      <div class="amount">{{order.amount|currency "￥" 0}}</div>
    </div>
  </div>
  <group>
    <j-radio :options="payments" @on-change="selectPay"></j-radio>
  </group>
  <div class="tip">注：您选择信用卡支付后，将由专人与您联系，进行刷卡操作</div>
  <j-tel style="margin-top:30px"></j-tel>
  <div class="submit-btn" v-bind:class="{'active':payMethod!=0}" v-tap="payMethod!=0?pay():return">确认</div>
</div>
<loading :show="showLoading" text="请稍后.."></loading>

<confirm :show.sync="showLoan" title="" confirm-text="办理分期" cancel-text="其他支付方式" @on-confirm="goto('./instalment.html')">
  <p style="text-align:center;">您尚未办理分期，是否办理分期？</p>
</confirm>
<popup-picker title="银行" :data="tempBankList" :columns="1" :show-cell="false" :show.sync="showSelectBank" :value.sync="tempAddBank" @on-hide="onSelectedBank" show-name></popup-picker>
</template>
<script>
import pingpp from 'pingpp-js'
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import JRadio from 'common/components/j-radio'
import Confirm from 'vux-components/confirm'
import Loading from 'vux-components/loading'
import wxImg from './wx.png'
import qkImg from './qk.png'
import fqImg from './fq.png'
import ylImg from './yl.png'
import axios from 'axios'
import JTel from 'components/j-tel'
import PopupPicker from 'vux-components/popup-picker'
Lib.M.auth(axios)

export default {
  components: {
    JRadio,
    Group,
    Loading,
    Confirm,
    JTel,
    PopupPicker
  },
  ready() {
    this.showLoading = true
    axios.get(`${Lib.C.mOrderApi}materialAppts/${this.apptNo}/`).then((res) => {
      res.data.data.groups.map((group) => {
        group.orders.map((order) => {
        if (findStoreIdIndex(order.storeId, this.orders) == -1) {
          this.orders.push({
            storeId: order.storeId,
            name: order.storeName,
            amount: order.totalAmount - order.predepositAmount
          })
        } else {
          this.orders[findStoreIdIndex(order.storeId, this.orders)].amount += Number(order.totalAmount)
        }
      })
      })
      this.showLoading = false
    }).catch((err) => {
      this.showLoading = false
      alert("获取订单失败，请稍后再试")
      throw err //error
    }),
    this.getLoanApplication()
  },
  methods: {
    pay() {
      this.showLoading = true
      if (this.payMethod == 3 || this.payMethod == 4) {
        axios.post(`${Lib.C.mOrderApi}materialAppts/${this.apptNo}/pay`, {
          payMethod: this.payMethod
        }).then((res) => {
          let paymentId = res.data.data.paymentId
          let payData = new FormData()
          payData.append('notifyUrl', Lib.C.notifyUrl)
          if (this.payMethod == 3) {
            axios.get(`${Lib.C.userApi}wechatOpenIds/${JSON.parse(localStorage.user).userId}`).then((res) => {
              let openId = res.data.data.openId
              payData.append('openid', openId)
              axios.post(`${Lib.C.payApi}pay/${paymentId}`, payData).then((res) => {
                pingpp.createPayment(res.data.data, (result, err) => {
                  if (result === 'success') {
                    // axios.post(`${Lib.C.mOrderApi}materialAppts/${this.apptNo}/waitPayment`).then((res) => {
                    //   location.href = './pay-success.html?type=3'
                    // }).catch((err) => {
                    //   throw err
                    // })
                    location.href = './pay-success.html?type=3'
                  } else if (result === 'fail') {
                    alert('支付失败')
                    location.href = './zc-order-list.html?type=5'
                  } else if (result === 'cancel') {
                    alert('支付失败')
                    location.href = './zc-order-list.html?type=5'
                  }
                })
              }).catch((err) => {
                this.showLoading = false
                alert("网络连接中断，请稍候再试")
                throw err
              })
            }).catch((err) => {
              this.showLoading = false
              alert("网络连接中断，请稍候再试")
              throw err
            })
          } else {
            axios.post(`${Lib.C.payApi}pay/${paymentId}`, payData).then((res) => {
              pingpp.createPayment(res.data.data, (result, err) => {
                if (result === 'success') {
                  axios.post(`${Lib.C.mOrderApi}materialAppts/${this.apptNo}/waitPayment`).then((res) => {
                    location.href = './pay-success.html?type=4'
                  }).catch((err) => {
                    throw err
                  })
                } else if (result === 'fail') {
                  alert('支付失败')
                  location.href = './zc-order-list.html?type=5'
                } else if (result === 'cancel') {
                  alert('支付失败')
                  location.href = './zc-order-list.html?type=5'
                }
              })
            }).catch((err) => {
              this.showLoading = false
              alert("网络连接中断，请稍候再试")
              throw err
            })
          }
        }).catch((err) => {
          this.showLoading = false
          alert("网络连接中断，请稍候再试")
          throw err
        })
      } else {
        let postBody = {}
        postBody.payMethod = this.payMethod
        if (this.payMethod == 2) {
          postBody.bankBranchPeriodId = this.bankBranchPeriodId
        }
        axios.post(`${Lib.C.mOrderApi}materialAppts/${this.apptNo}/pay`, postBody).then((res)=>{
          location.href = `./pay-success.html?type=${this.payMethod}`
        }).catch((err)=>{
          if(err.response){
            if(err.response.data.code == 40303){
              this.showLoading = false
              this.showLoan = true
            } else if (err.response.data.code == 40311) {
              this.showLoading = false
              alert('后台未确定分期方案，请联系客服为您选择')
            }else{
              throw err
            }
          }else{
            throw err
          }
        })
      }
    },
    selectPay(e) {
      this.payMethod = Number(e)
      if (e == 2 && this.tempBankList.length >1) {
        document.activeElement.blur();
        this.showSelectBank = true
      }
    },
    goto(url){
      location.href = url
    },
    getLoanApplication() {
      axios.get(`${Lib.C.loanApi}loan-applications?filter=userId:${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {
        console.log('分期方案', res.data.data)
        let result = res.data.data
        if (result.length > 0) {


          result.map((e) => {
            if (e.bankBranchPeriod !== null&&e.bankBranch !== null&&e.statusEnum == 3) {
              this.tempBankList.push({
                name: `${e.bankBranch.name}${e.bankBranchPeriod.name}`,
                value: String(e.bankBranchPeriod.id)
              })
            }
          })
          if (this.tempBankList.length == 1) {
            this.bankBranchPeriodId = Number(this.tempBankList[0].value)
            this.payments[1].description = this.tempBankList[0].name
          }
        }
      }).catch((err) => {
        throw err
      })
    },
    onSelectedBank() {
      this.bankBranchPeriodId = Number(this.tempAddBank[0])
      this.bankSelected = findValue(this.tempAddBank[0], this.tempBankList)
      this.payments[1].description = this.bankSelected
      console.log(this.tempBankList, this.tempAddBank, this.bankSelected)
      this.tempAddBank = []
      this.showSelectBank = false
    }
  },
  data() {
    return {
      showLoading: false,
      wxImg,
      qkImg,
      fqImg,
      ylImg,
      apptNo: Lib.M.GetRequest().apptNo,
      payments: [{
        key: '1',
        value: '全款购买',
        icon: qkImg,
        description: '支付方式:现金或刷卡'
      }, {
        key: '2',
        value: '分期购买',
        icon: fqImg,
        description: ''
      }, {
        key: '3',
        value: '微信支付',
        icon: wxImg
      }],
      // , {
      //   key: '4',
      //   value: '银联支付',
      //   icon: ylImg
      // }],
      showLoan:false,
      payMethod: 0,
      orders: [],
      tempBankList: [],
      showSelectBank: false,
      tempAddBank: [],
      bankBranchPeriodId: null,
      bankSelected: ''
    }
  }
}

function findStoreIdIndex(id, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].storeId == id) return i
  }
  return -1
}
function findValue(val, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (val == arr[i].value) {
      return arr[i].name
    }
  }
}
</script>
