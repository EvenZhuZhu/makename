<template>
  <div id="wd">
    <header>
      <div class="msg" @click="link()"></div>
      <div class="msgdot" v-show='show'></div>
      <p class="top">我的余额</p>
      <p class="price">{{yue}}</p>
      <p>
        <router-link :to="{path:'/makename/yetx',query:{yuee:yue}}" tag="span">去提现</router-link>
      </p>
    </header>
    <router-link to="/makename/wdfabu" class="wdfb" tag="p">我的发布</router-link>
    <div class="gap"></div>
    <div class="nav">
      <ul class="clearfix">
        <router-link to="/makename/sztxzh" tag="li">提现账户</router-link>
        <router-link to="/makename/szjymm" tag="li">交易密码</router-link>
        <router-link to="/makename/szjl" tag="li">收支记录</router-link>
      </ul>
    </div>
    <fbxq></fbxq>
    <div id="footernav">
      <router-link to="/makename" tag="span" class="w33 fl">悬赏池</router-link>
      <span class="w33 fl" :class="{active:qwerqwre==1}">我的
    </span>
      
      <span class="w33 fr" @click="follow()">关注我们</span>
      <ul class="footlist" v-show="show1">
        <li>
          <input type="text" v-model="message">
          <div class="wx"
               v-clipboard:copy="message"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError">微信公众号
          </div>
        </li>
        <li><a :href="hrefs">下载APP</a></li>
      </ul>
      <div class="ts" v-show="show2">
        <p>公众号已复制，请前往微信搜索关注</p>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import qmfooter from '../subComponents/footernav'
  import fbxq from './drag'
  import http from '../../../config/http'

  export default {
    name: 'wd',
    data() {
      return {
        show: '',
        yue: '',
        cookie : this.getCookie('shanbiao'),
        token: localStorage.getItem('shanbiao') || this.cookie,
        message: this.$wx(),
        hrefs: this.$href(),
        qwerqwre: 1,
        show1: false,
        show2: false,
        token: localStorage.getItem('shanbiao'),
      }
    },
    created() {
      //我的余额
      http({
        url: '/usercenter?accessToken=' + this.token.replace("\"", "").replace("\"", ""),
        method: 'get',
      }).then((result) => {
        this.yue = result.data.data.balance
      }).catch((error) => {
        console.log(error);
      })
      
      //提现申请日志
      http({
        url: '/getwithdrawalslog?page=1&accessToken=' + this.token.replace("\"", "").replace("\"", ""),
        method: 'get'
      }).then((result) => {
        if (result.data.data.data === []) {
          this.show = false
        } else {
          this.list = result.data.data.data
          var arr = []
          for (var value of this.list) {
            if (value.is_read == 0) {
              arr.push(value)
            }
          }
          if (arr.length != 0) {
            this.show = true
          }
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    methods: {
      link() {
        this.$router.push({
          path: '/makename/xx'
        })
      },
      getCookie(cname) {
        var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
          return (arr[2]);
        else
          return null;
      },
      follow() {
        this.show1 = !this.show1
      },
      onCopy(e) {
        this.show2 = true
        setTimeout(() => {
          this.show2 = false
        }, 2000)
      },
      onError(e) {
        alert('复制失败，请手动复制')
      }
    },
    components: {
      fbxq
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  
  #wd {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: $bordercolor;
    overflow-x: auto;
  }
  
  .gap {
    height: 0.2rem;
    background-color: $bordercolor;
  }
  
  header {
    border-top: 1px solid $actcolor;
    height: 3.6rem;
    background-color: $actcolor;
    color: #fff;
    position: relative;
    div.msg {
      position: absolute;
      right: 0.36rem;
      top: 0.25rem;
      width: 0.42rem;
      height: 0.48rem;
      background: url(../../../assets/images/makename/msg.png) no-repeat left center;
      background-size: 0.42rem 0.48rem;
    }
    div.msgdot {
      position: absolute;
      right: 0.22rem;
      top: 0.25rem;
      width: 0.12rem;
      height: 0.12rem;
      background: url(../../../assets/images/makename/msgdot.png) no-repeat left center;
      background-size: 0.12rem 0.12rem;
    }
    p {
      text-align: center;
      span {
        display: inline-block;
        height: 0.66rem;
        line-height: 0.66rem;
        width: 1.96rem;
        border: 1px solid #fff;
        border-radius: 0.4rem;
      }
    }
    p.top {
      margin-top: 0.9rem;
      font-size: 0.28rem;
    }
    p.price {
      font-size: 0.8rem;
      font-family: "宋体";
    }
  }
  
  .wdfb {
    height: 1rem;
    line-height: 1rem;
    font-size: 0.32rem;
    padding: 0 .24rem;
    font-weight: bold;
    border-bottom: 1px solid $borcolor;
    background: url(../../../assets/images/makename/go.png) no-repeat 7.1rem center;
    background-size: 0.17rem 0.28rem;
    background-color: #fff;
  }
  
  .nav {
    ul {
      background-color: #fff;
      border-top: 1px solid $borcolor;
      border-bottom: 1px solid $borcolor;
      color: $fontcolor;
      li {
        text-align: center;
        float: left;
        width: 33.33%;
        height: 1.86rem;
        padding-top: 1.2rem;
        box-sizing: border-box;
      }
      li:nth-child(1) {
        background: url(../../../assets/images/makename/zh.png) no-repeat center 0.4rem;
        background-size: 0.6rem 0.6rem;
      }
      li:nth-child(2) {
        background: url(../../../assets/images/makename/mm.png) no-repeat center 0.4rem;
        background-size: 0.51rem 0.6rem;
      }
      li:nth-child(3) {
        background: url(../../../assets/images/makename/jl.png) no-repeat center 0.4rem;
        background-size: 0.6rem 0.6rem;
      }
    }
  }
  
  .fbxq {
    width: 1.2rem;
    height: 1.2rem;
    background-color: $actcolor;
    color: #fff;
    position: fixed;
    right: 0.32rem;
    bottom: 4rem;
    border-radius: 50%;
    font-size: 0.28rem;
    box-sizing: border-box;
    padding: 0.2rem;
    text-align: center;
  }

  #footernav {
    background-color: #fff;
    width: 100%;
    height: 1rem;
    position: fixed;
    bottom: 0;
    border-top: 1px solid $borcolor;
    span {
      display: inline-block;
      text-align: center;
      font-size: 0.24rem;
      padding-top: 0.54rem;
    }
  }

  #footernav span:nth-child(1) {
    background: url("../../../assets/images/makename/rewardpool.png") no-repeat center 0.14rem;
    background-size: 0.39rem 0.4rem;
  }

  #footernav span:nth-child(2) {
    background: url("../../../assets/images/makename/my.png") no-repeat center 0.14rem;
    background-size: 0.4rem 0.4rem;
  }

  #footernav span:nth-child(3) {
    background: url("../../../assets/images/makename/followus.png") no-repeat center 0.14rem;
    background-size: 0.35rem 0.4rem;
  }

  #footernav span:nth-child(1).active {
    color: $actcolor;
    background: url("../../../assets/images/makename/rewardpool1.png") no-repeat center 0.14rem;
    background-size: 0.39rem 0.4rem;;
  }

  #footernav span:nth-child(2).active {
    color: $actcolor;
    background: url("../../../assets/images/makename/my1.png") no-repeat center 0.14rem;
    background-size: 0.4rem 0.4rem;
  }

  .footlist {
    width: 3.6rem;
    background: #fff;
    position: fixed;
    bottom: 1rem;
    right: 0;
    margin: auto;
    box-shadow: 0 0 10px #969696;
    li {
      width: 100%;
      height: .92rem;
      border-bottom: 1px solid #e9ebee;
      font-size: .28rem;
      color: #5a5a5a;
      line-height: .92rem;
      padding-left: .6rem;
      box-sizing: border-box;
      input[type="text"] {
        position: absolute;
        right: -4rem;
        top: -0.92rem;
      }
      .wx {
        text-indent: 0.6rem;
        line-height: .92rem;
        width: 100%;
        height: 50%;
        position: absolute;
        left: 0;
        top: 0;
      }
      a {
        display: block;
        line-height: .92rem;
        width: 100%;
        height: 100%;
        color: #5a5a5a;
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

</style>
