<template>
  <div id="szjymm">
    <div class="msgheader">
      <div class="top">
        <span class="fl" @click="back()"></span>
        <span class="center">再次设置交易密码</span>
      </div>
    </div>
    <div class="gap"></div>
    <p>请再输入一次</p>
    <div class="pay-tool">
      <div class="pay-tool-inputs clearfix">
        <div class="item" v-for="i in items"><span class="icon_dot" v-if="password[i]"></span></div>
      </div>
    </div>
    <div class="ts" v-show="show">{{tishi}}</div>
    <div class="tss" v-show="showw">{{tishii}}</div>
    <div class="pay-tool-keyboard">
      <ul>
        <li @click="keyUpHandle($event)" v-for="val in keys">
          {{ val }}
        </li>
        <li class="del" @click="delHandle"><span class="icon-del"><</span></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import qingbaozhan from '../../../main'
  import http from '../../../config/http'
  import qs from 'qs'
  
  const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
  export default {
    name: 'szjymm',
    data() {
      return {
        items: [0, 1, 2, 3, 4, 5],
        keys: keys(),
        password: [],
        show: false,
        showw: false,
        tishi: '',
        tishii: '',
        pwd: sessionStorage.getItem('mm'),
        token: localStorage.getItem('shanbiao').replace("\"", "").replace("\"", "") || '',
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      close() {
        this.clearPasswordHandle()
        qingbaozhan.$emit("close")
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
        if (this.password.length >= 6 && this.pwd == this.password) {
          //设置交易密码
          http({
            url: '/settraderpassword?accessToken=' + this.token,
            method: 'post',
            data: qs.stringify({
              password: this.password.join(''),
            })
          }).then((result) => {
            if (result.data.code == 200) {
              this.show = true
              this.tishi = result.data.message
            }
          }).catch((error) => {
            this.showw = true
            this.tishii = error.response.data.message
          })
          setTimeout(() => {
            this.$router.push({
              path: '/makename/wd',
            })
          }, 1000)
        } else if (this.password.length >= 6 && this.pwd != this.password) {
          this.show = true
          this.tishi = '密码不一致，请重新填写'
          setTimeout(() => {
            this.show = false
            this.$router.push({
              path: '/makename/szjymm',
            })
          }, 1000)
        }
      },
      clearPasswordHandle: function () {
        this.password = []
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  
  .msgheader {
    height: 1rem;
    /*padding-top: 0.4rem;*/
    border-bottom: 1px solid $borcolor;
    background-color: #fff;
    div.top {
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      span {
        display: inline-block;
        height: 100%;
        line-height: 1rem;
        text-align: center;
      }
      span.fl {
        width: 1rem;
        background: url(../../../assets/images/makename/back1.png) no-repeat 0.24rem center;
        background-size: 0.42rem 0.4rem;
      }
      span.center {
        width: 6.5rem;
        font-size: 0.38rem;
        text-indent: -2em;
      }
    }
  }
  
  .gap {
    height: 0.2rem;
    background-color: $bordercolor;
    border-bottom: 1px solid $borcolor;
  }
  
  .pay-tool {
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
  }
  
  p {
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    font-size: 0.38rem;
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
  
  .ts {
    width: 3.4rem;
    height: 0.56rem;
    line-height: 0.56rem;
    margin: 0.5rem auto 0;
    text-align: center;
    color: #fff;
    background-color: #cccfd4;
    font-size: 0.28rem;
    border-radius: 0.08rem;
  }
  
  .tss {
    width: 5rem;
    height: 0.56rem;
    line-height: 0.56rem;
    margin: 0.5rem auto 0;
    text-align: center;
    color: #fff;
    background-color: #cccfd4;
    font-size: 0.28rem;
    border-radius: 0.08rem;
  }
</style>

