<template>
  <div id="zifu">
    <h1 class="top">
      <span @click="back()" class="back fl"></span>
      <span>支付</span>
    </h1>
    <div class="gap"></div>
    <div class="title">
      悬赏主题：<span>{{content}}</span>
    </div>
    <div class="leibie">
      商标类别： <span>{{sqrzchs}}</span>
    </div>
    <div class="xzzs">
      限制字数：<span>{{num}}</span>
    </div>
    <div class="minge">
      设置名额： <span>{{minge}}个</span>
    </div>
    <div class="gap"></div>
    <div class="ts">
      <p>提示：一个名额可以收到一个名字，一个名额价值1元。</p>
      <p>7天内如果收到名字不足，将退回差额。</p>
    </div>
    <div class="ddxx clearfix">
      <span class="fir fl"></span>
      <span>订单信息</span>
      <span class="thir fr"></span>
      <p>共<i>{{minge}}</i>个名额, <i class="last">金额<em>{{minge}}</em>元</i></p>
      <!--<router-link to="/makename/czts" tag="div" class="next wx">微信支付</router-link>-->
      <!--<router-link to="/makename/czts" tag="div" class="next zfb">支付宝支付</router-link>-->
      <!--<router-link to="/makename/czts" tag="div" class="next ye">余额支付(￥<i>{{yue}}</i>)</router-link>-->
      <!--<div class="next wx">微信支付</div>-->
      <!--<div class="next zfb">支付宝支付</div>-->
      <!--<div class="next ye" @click="pay()">余额支付(￥<i>{{yue}}</i>)</div>-->
      <div class="next ye" @click="pay()">支付</div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import http from '../../../config/http'
  
  export default {
    name: 'zhifu',
    data() {
      return {
        content: this.$route.query.content,
        sqrzchs: this.$route.query.sqrzchs,
        num: this.$route.query.num,
        minge: this.$route.query.minge,
        id: this.$route.query.id,
        token: localStorage.getItem('shanbiao').replace("\"","").replace("\"","") || '',
        yue: '',
        payurl: ''
      }
    },
    created() {
      if (this.num) {
        this.num = this.num.replace(/,/g, '个、') + '个';
      }
      //我的余额
      http({
        url: '/usercenter?accessToken=' + this.token,
        method: 'get',
      }).then((result) => {
        this.yue = result.data.data.balance
      }).catch((error)=>{
        console.log(error);
      })
      
      //创建起名悬赏
      http({
        url: '/payurl?accessToken=' + this.token,
        method: 'get',
        params: {
          named_id: this.id
        }
      }).then((result) => {
        this.payurl = result.data.data.pay_url +'&accessToken='+this.token
      }).catch((error)=>{
        console.log(error);
      })
    },
    methods: {
      back() {
        this.$router.back()
      },
      pay() {
        window.location.href = this.payurl
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  
  #fabuxuqiu {
    font-size: 0.3rem;
  }
  
  .gap {
    height: 0.2rem;
    background-color: $bordercolor;
  }
  
  .top {
    font-weight: normal;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    /*padding-top: 0.4rem;*/
    font-size: 0.38rem;
    text-indent: -2em;
    border-bottom: 1px solid $borcolor;
    background-color: #fff;
    .back {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background: url(../../../assets/images/makename/back1.png) no-repeat 0.24rem center;
      background-size: 0.42rem 0.4rem;
    }
  }
  
  .title {
    border-top: 1px solid $borcolor;
  }
  
  .title, .leibie, .xzzs, .minge {
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid $borcolor;
    padding: 0 0.24rem;
    box-sizing: border-box;
    position: relative;
    span {
      display: inline-block;
      height: 1rem;
      line-height: 1rem;
      position: absolute;
      right: 0.24rem;
      color: $fontcolor;
    }
  }
  
  .ts {
    padding: 0.24rem;
    background-color: #fffcf0;
    color: $highlight;
    font-size: 0.28rem;
    text-align: center;
    border-top: 1px solid $borcolor;
    border-bottom: 1px solid $borcolor;
  }
  
  .ddxx {
    padding: 0 0.7rem;
    span {
      display: inline-block;
      width: 33%;
      text-align: center;
      font-size: 0.34rem;
      vertical-align: middle;
      margin-top: 0.5rem;
    }
    span.fir, span.thir {
      height: 0.02rem;
      background-color: $borcolor;
      margin-top: 0.7rem;
    }
    p {
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      color: $fontcolor;
      i {
        font-style: normal;
      }
      em {
        font-style: normal;
      }
      i.last {
        color: red;
      }
      
    }
  }
  
  .next {
    width: 5.9rem;
    height: 0.9rem;
    line-height: 0.9rem;
    color: #fff;
    margin: 0.2rem auto;
    text-align: center;
    text-indent: 1em;
    border-radius: 0.45rem;
    i {
      font-style: normal;
    }
  }
  
  .wx {
    background: #33ab2a url(../../../assets/images/makename/wx1.png) no-repeat 2rem center;
    background-size: 0.4rem 0.4rem;
  }
  
  .zfb {
    text-indent: 2em;
    background: #01a7f1 url(../../../assets/images/makename/zfb1.png) no-repeat 1.9rem center;
    background-size: 0.47rem 0.38rem;
  }
  
  .ye {
    background-color: $actcolor;
  }
</style>
