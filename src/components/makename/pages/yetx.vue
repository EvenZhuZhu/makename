<template>
  <div id="yetx">
    <div>
      <h1 class="top">
        <span @click="back()" class="back fl"></span>
        <span>余额提现</span>
      </h1>
      <div class="gap"></div>
      <div class="txfs  clearfix">
        <p>提现方式：</p>
        <router-link to="/makename/sztxzh" class="sz" tag="span" v-show="szrwm">点击上传收款二维码</router-link>
        <span v-show="szrwm1" class="sz">收款二维码审核中</span>
        <ul v-show="szrwm2">
          <li v-show="alipayshow">
            <input type="radio" name="danxuan" v-model='fk' value="alipay">
            <label for="zfb" name="danxuan"><span class="zfb">支付宝</span></label>
          </li>
          <li v-show="wechatshow">
            <input type="radio" name="danxuan" v-model='fk' value="wechat">
            <label for="wx" name="danxuan"><span class="wx">微信</span></label>
          </li>
        </ul>
      
      </div>
      <div class="gap"></div>
      <div class="txje">
        <p class="tx">提现金额：</p>
        <p class="je">￥<input type="number" v-model="inputPrice"><span class="fr" @click="addPrice()">全部提现</span>
        </p>
      </div>
      <div class="sqtx" @click="apply()">申请提现</div>
      <div class="daozhang">
        <p>当前余额：￥<span>{{price}}</span>，提现金额必须≥10元</p>
        <p>*提现后预计3个工作日到账</p>
      </div>
      <div class="ts" v-show="isshow">
        <p>{{msg}}</p>
      </div>
    </div>
    <div class="mask" v-show="show">
      <div class="pay-tool">
        <div class="pay-tool-title border-bottom">
          <strong>请输入交易密码</strong><span class="icon icon-back" @click="close"></span>
        </div>
        
        <div class="pay-tool-inputs clearfix">
          <div class="item" v-for="i in items"><span class="icon_dot" v-if="password[i]"></span></div>
        </div>
        
        <div class="ts1" v-show="tsshow">密码错误，请重新输入</div>
        
        <div class="pay-tool-keyboard">
          <ul>
            <li @click="keyUpHandle($event)" v-for="val in keys">
              {{ val }}
            </li>
            <li class="del" @click="delHandle"><span class="icon-del"><</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script type='text/ecmascript-6'>
  import http from '../../../config/http'
  import qs from 'qs'
  
  const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
  
  export default {
    name: 'yetx',
    data() {
      return {
        token: localStorage.getItem('shanbiao').replace("\"", "").replace("\"", "") || '',
        inputPrice: '',
        price: '',
        fk: '',
        isshow: false,
        show: false,
        password: [],
        pwd: '',
        tsshow: false,
        items: [0, 1, 2, 3, 4, 5],
        keys: keys(),
        msg: '',
        confirmpwd: '',
        szrwm: false,
        szrwm1: false,
        szrwm2: false,
        paytype: '',
        alipayshow: false,
        wechatshow: false,
        alipay: '',
        wechat: ''
      }
    },
    created() {
      
      // 我的提现二维码
      http({
          url: '/withdrawalsqrcode?accessToken=' + this.token,
          method: 'get',
        },
      ).then((result) => {
        this.alipay = result.data.data.alipay.url
        this.wechat = result.data.data.wechat.url
        //提现申请(数据)
        http({
          url: '/getwithdrawalsapply?accessToken=' + this.token,
          method: 'get',
        }).then((result) => {
          if (result.data.data.account.length == 0 && this.alipay == '' && this.wechat == '') {
            this.szrwm = true
            this.szrwm1 = false
            this.szrwm2 = false
          } else if (result.data.data.account.length == 0 && (this.alipay || this.wechat)) {
            this.szrwm1 = true
            this.szrwm = false
            this.szrwm2 = false
          } else {
            this.szrwm2 = true
            this.szrwm = false
            this.szrwm1 = false
            this.paytype = result.data.data.account
            for (var value of this.paytype) {
              if (value.type == 'wechat') {
                this.wechatshow = true
              } else if (value.type == 'alipay') {
                this.alipayshow = true
              }
            }
          }
          this.price = result.data.data.balance
          this.confirmpwd = result.data.data.password
        }).catch((error) => {
          console.log(error);
        })
        
      }).catch((error) => {
        console.log(error);
      })
      
      
      //我的余额
      // http({
      //   url: '/usercenter?accessToken=' + this.token,
      //   method: 'get',
      // }).then((result) => {
      //   this.price = result.data.data.balance
      // })
    },
    methods: {
      back() {
        this.$router.back()
      },
      addPrice() {
        this.inputPrice = this.price
      },
      close() {
        this.password = []
        this.show = false
      },
      apply() {
        if (!this.szrwm && !this.fk) {
          this.isshow = true
          this.msg = '请选择提现方式'
          setTimeout(() => {
            this.isshow = false
            this.msg = ''
          }, 2000)
          return
        }
        
        if (this.inputPrice < 10) {
          this.isshow = true
          this.msg = '提现金额必须≥10元'
          this.inputPrice = ''
          setTimeout(() => {
            this.isshow = false
            this.msg = ''
          }, 2000)
          return
        }
        
        if ((Number(this.inputPrice) > Number(this.price))) {
          this.isshow = true
          this.msg = '提现金额超出当前余额'
          this.inputPrice = ''
          setTimeout(() => {
            this.isshow = false
            this.msg = ''
          }, 2000)
          return
        }
        
        if (this.inputPrice.substring(this.inputPrice.indexOf('.') + 1).length > 2) {
          this.isshow = true
          this.msg = '只能有两位小数'
          this.inputPrice = ''
          setTimeout(() => {
            this.isshow = false
            this.msg = ''
          }, 2000)
          return
        }
        
        if (!this.szrwm) {
          if (this.confirmpwd == 0) {
            this.isshow = true
            this.msg = '请设置交易密码'
            this.inputPrice = ''
            setTimeout(() => {
              this.isshow = false
              this.msg = ''
              this.$router.push({
                path: '/makename/szjymm',
              })
            }, 2000)
            return
          } else if (this.confirmpwd == 1) {
            //提交提现申请
            this.show = true
          }
        } else {
          this.isshow = true
          this.msg = '请上传收二维码，如已上传，请等待审核'
          this.inputPrice = ''
          setTimeout(() => {
            this.isshow = false
            this.msg = ''
            this.$router.push({
              path: '/makename/sztxzh',
            })
          }, 2000)
          return
        }
      },
      keyUpHandle(e) {
        let text = e.currentTarget.innerText
        let len = this.password.length
        if (!text || len >= 6) return
        this.password.push(text)
        this.ajaxData()
      },
      delHandle() {
        if (this.password.length <= 0) return false
        this.password.shift()
      },
      ajaxData() {
        if (this.password.length >= 6) {
          this.pwd = parseInt(this.password.join(' ').replace(/\s/g, ''))
          http({
            url: '/setwithdrawalsapply?accessToken=' + this.token,
            method: 'post',
            data: qs.stringify({
              money: this.inputPrice,
              type: this.fk,
              password: this.pwd,
            })
          }).then((result) => {
            if (result.status == 200) {
              this.$router.push({
                path: '/makename/yetxcg',
                query: {apply_time: result.data.data.apply_time, final_time: result.data.data.final_time}
              })
            }
          }).catch((error) => {
            console.log(error);
            this.tsshow = true
            setTimeout(() => {
              this.tsshow = false
              this.password = []
            }, 1000)
          })
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  
  .gap {
    height: 0.2rem;
    background-color: $bordercolor;
  }
  
  .top {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    /*padding-top: 0.4rem;*/
    font-weight: normal;
    font-size: 0.38rem;
    text-indent: -2em;
    border-bottom: 1px solid $borcolor;
    .back {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background: url(../../../assets/images/makename/back1.png) no-repeat 0.24rem center;
      background-size: 0.42rem 0.4rem;
    }
  }
  
  .txfs {
    border-top: 1px solid $borcolor;
    border-bottom: 1px solid $borcolor;
    p {
      font-size: 0.3rem;
      display: inline-block;
      width: 1.7rem;
      height: 1.6rem;
      line-height: 1.6rem;
      float: left;
      margin-left: 0.24rem;
    }
    span.sz {
      display: inline-block;
      line-height: 1.6rem;;
    }
    ul {
      width: 5.56rem;
      float: right;
      li {
        height: 0.76rem;
        position: relative;
        float: left;
        margin: 0.4rem 0.4rem 0 0;
        color: $fontcolor;
        input[type="radio"] {
          width: 1.96rem;
          height: 0.76rem;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        }
        label {
          display: inline-block;
          width: 1.96rem;
          height: 0.76rem;
          line-height: 0.76rem;
          border: 1px solid $bordercolor;
          text-indent: 0.8rem;
          border-radius: 0.08rem;
          span {
            float: left;
            display: inline-block;
            width: 1.96rem;
            height: 0.76rem;
            line-height: 0.76rem;
            background: url(../../../assets/images/makename/zfb.png) no-repeat 0.24rem center;
            background-size: 0.47rem 0.38rem;
          }
          span.wx {
            background: url(../../../assets/images/makename/wx.png) no-repeat 0.3rem center;
            background-size: 0.4rem 0.4rem;
          }
        }
        input[type="radio"]:checked + label {
          color: $actcolor;
          background: url(../../../assets/images/makename/radio1.png) no-repeat center center;
          background-size: 2rem 0.8rem;
        }
      }
    }
  }
  
  .txje {
    height: 2rem;
    border-top: 1px solid $borcolor;
    border-bottom: 1px solid $borcolor;
    padding: 0.2rem 0.24rem;
    box-sizing: border-box;
    p.tx {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.3rem;
    }
    p.je {
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.66rem;
      color: $fontcolor;
      input {
        width: 50%;
        height: 100%;
        line-height: 0.8rem;
        padding-left: 4%;
        font-size: 0.6rem;
        color: $fontcolor;
        vertical-align: top;
      }
      span {
        display: inline-block;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.3rem;
      }
    }
  }
  
  .sqtx {
    width: 5.9rem;
    height: 0.9rem;
    line-height: 0.9rem;
    border-radius: 0.45rem;
    background-color: $actcolor;
    color: #fff;
    margin: 0.5rem auto;
    text-align: center;
    font-size: 0.3rem;
  }
  
  .daozhang {
    color: $fzcolor;
    text-align: center;
    font-size: 0.28rem;
  }
  
  .wxts {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    .center {
      height: 8rem;
      width: 100%;
      position: fixed;
      bottom: 0;
      padding: 0 0.35rem;
      box-sizing: border-box;
      background-color: #fff;
      p {
        height: 1.8rem;
        line-height: 1.8rem;
        text-align: center;
        font-size: 0.38rem;
        position: relative;
        span {
          display: inline-block;
          width: 0.34rem;
          height: 0.35rem;
          background: url(../../../assets/images/makename/close.png) no-repeat center center;
          background-size: 0.34rem 0.35rem;
          position: absolute;
          top: 0.3rem;
          right: 0;
        }
      }
      input {
        box-sizing: border-box;
        border: 1px solid $fzcolor;
        width: 16.66%;
        height: 1.08rem;
        line-height: 1.08rem;
        float: left;
        border-right: none;
        text-align: center;
        font-size: 0.28rem;
        border-radius: 0;
        -webkit-appearance: none;
        -webkit-text-security: circle;
        text-security: circle; /*使用指定形状代替文字显示 circle圆圈 disc 圆形 square 正方形*/
      }
      input.last {
        border-right: 1px solid $fzcolor;
      }
    }
  }
  
  .ts {
    position: fixed;
    z-index: 888;
    width: 80%;
    height: 3rem;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    font-size: .28rem;
    color: #fff;
    text-align: center;
    p {
      background: rgba(0, 0, 0, .7);
      padding: .3rem;
      line-height: .5rem;
      border-radius: .1rem;
      display: inline-block;
    }
  }
  
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    .pay-tool {
      width: 100%;
      height: 9rem;
      position: fixed;
      bottom: 0;
      background-color: #fff;
      .pay-tool-title {
        width: 100%;
        height: 1.84rem;
        line-height: 1.84rem;
        text-align: center;
        position: relative;
        .icon {
          display: inline-block;
          width: 0.34rem;
          height: 0.35rem;
          background: url(../../../assets/images/makename/close.png) no-repeat center center;
          background-size: 0.34rem 0.35rem;
          position: absolute;
          top: 0.3rem;
          right: 0.3rem;
        }
        strong {
          font-size: 0.38rem;
        }
      }
      
      .pay-tool-inputs {
        width: 100%;
        height: 1.1rem;
        padding: 0 0.35rem;
        box-sizing: border-box;
        .item {
          width: 16.66%;
          height: 100%;
          float: left;
          border: 1px solid #c0c3cc;
          border-right: none;
          box-sizing: border-box;
          position: relative;
          .icon_dot {
            display: inline-block;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 0.28rem;
            height: 0.28rem;
            background: url("../../../assets/images/makename/icon_dot.png") no-repeat;
            background-size: cover;
          }
        }
        .item:last-child {
          border-right: 1px solid #c0c3cc;
        }
      }
      
      .ts1 {
        width: 3rem;
        margin: 0.3rem auto 0;
        text-align: center;
        color: #fff;
        background-color: #cccfd4;
        font-size: 0.28rem;
        border-radius: 0.08rem;
      }
      
      .pay-tool-keyboard {
        position: absolute;
        width: 100%;
        bottom: 0;
        ul {
          width: 100%;
          li {
            width: 33.33%;
            height: 1.2rem;
            line-height: 1.2rem;
            text-align: center;
            float: left;
            border-right: 1px solid #c0c3cc;
            border-bottom: 1px solid #c0c3cc;
            font-size: 0.5rem;
            font-weight: bold;
            box-sizing: border-box;
            &:nth-child(1), &:nth-child(2), &:nth-child(3) {
              border-top: 1px solid #c0c3cc;
            }
            &:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
              border-right: none;
            }
            &:nth-child(10), &:nth-child(11), &:nth-child(12) {
              border-bottom: none;
            }
            &:nth-child(10), &:nth-child(12), &:active {
              background-color: #d1d4dd;
            }
            &:nth-child(12):active {
              background-color: #fff;
            }
          }
        }
      }
    }
  }

</style>
