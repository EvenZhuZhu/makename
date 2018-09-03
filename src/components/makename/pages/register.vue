<template>
  <div id="outer">
    <div class="loginHader">
      <div class="retreat" @click="goback"></div>
      <img src="../../../assets/images/makename//head.png" alt="">
      <p>快捷登陆</p>
    </div>
    <div>
      <ul>
        <li>
          <img src="../../../assets/images/makename/logicon01.png" alt="">
          <input type="text" name="" v-model="phone" placeholder="请输入手机号" id="Phone">
        </li>
        <li class="yzm">
          <img src="../../../assets/images/makename/logicon02.png" alt="">
          <input type="text" name="" v-model="yanzhengma" placeholder="请输入验证码" id="Yanzhengma">
          <img :src="img" alt="" class="imgyzm" @click="change">
        </li>
        <li>
          <img src="../../../assets/images/makename/logicon03.png" alt="">
          <input type="text" placeholder="请输入短信验证码" v-model="msgYanzhenma">
          <input type="button" value="获取验证码" @click="getPhoneCode" v-show="show">
          <div class="daojishi" v-show="!show">{{count}}秒后重新获取</div>
        </li>
      </ul>
      <div class="user_login" @click="login">登录</div>
      <p class="xy">
        第一次登录即是注册<br>
        *我已阅读并同意
        <router-link to="/makename/userxy">《用户服务协议》</router-link>
      </p>
    </div>
    <div class="ts" v-show="show2">
      <p>{{text}}</p>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../config/http'
  import qs from 'qs'
  
  export default {
    name: 'register',
    data() {
      return {
        show1: true,
        phone: '',
        yanzhengma: '',
        uuid: 1,
        img: '',
        msgYanzhenma: '',
        timer: null,
        show: true,
        count: '',
        text: '',
        show2: false,
        content: this.$route.query.content,
        sqrzchs: this.$route.query.sqrzchs,
        num: this.$route.query.num,
        minge: this.$route.query.minge,
        id: this.$route.query.id,
        headerName: this.$route.query.headerName || '',
        leibie: this.$route.query.leibie || '',
        xianzhi: this.$route.query.xianzhi || '',
        makename: this.$route.query.makename,
        wd: this.$route.query.wd
      }
    },
    created() {
      //获取图片验证码
      this.$http.get('https://bn04w9vt4w9b93725823659-member.alibiaojia.com/api/captcha/search', {
        params: {
          uuid: this.uuid
        }
      }).then((result) => {
        this.img = result.data.data.url
      }).catch((error) => {
        console.log(error);
      })
    },
    methods: {
      goback() {
        this.$router.back()
      },
      //点击改变图片验证码
      change() {
        this.$http.get('https://bn04w9vt4w9b93725823659-member.alibiaojia.com/api/captcha/search', {
          params: {
            uuid: this.uuid
          }
        }).then((result) => {
          this.img = result.data.data.url
        }).catch((error) => {
          console.log(error);
        })
      },
      //60秒倒计时函数
      reSendCode() {
        var time = 60;
        if (!this.timer) {
          this.count = time;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= time) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      //验证手机号
      checkLPhone(phone) {
        if (phone.trim() == '') {
          this.text = '请输入手机号'
          this.show2 = true
          setTimeout(() => {
            this.show2 = false
          }, 1000)
        } else if (phone.trim().search(/^1[0-9]{10}$/) == 0) {
          return true;
        } else {
          this.text = '请输入正确的手机号'
          this.show2 = true
          setTimeout(() => {
            this.show2 = false
          }, 1000)
        }
      },
      // 失焦验证图和密码
      checkLpicma(picLyanzhengma) {
        if (picLyanzhengma.trim() == '') {
          this.text = '请输入验证码'
          this.show2 = true
          setTimeout(() => {
            this.show2 = false
          }, 1000)
        } else {
          this.$http.post('https://bn04w9vt4w9b93725823659-member.alibiaojia.com/api/public/send-sms',
            qs.stringify({
              mobile: this.phone,
              type: 'login',
              imguuid: this.uuid,
              imgcode: this.yanzhengma
            }))
            .then((result) => {
              this.reSendCode();
            })
            .catch((error) => {
              console.log(error);
              this.text = '验证码不正确'
              this.show2 = true
              setTimeout(() => {
                this.show2 = false
              }, 1000)
            })
        }
      },
      //点击获取手机验证码
      getPhoneCode() {
        if (this.checkLPhone(this.phone) && this.checkLpicma(this.yanzhengma)) {
          return true
        }
      },
      //设置cookie<存>
      setCookie(cname, cvalue, exdays) {
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = "expires=" + d.toUTCString()
        document.cookie = cname + "=" + cvalue + "; " + expires
        console.log(document.cookie);
      },
      //点击提交登陆
      login() {
        this.$http.post('https://bn04w9vt4w9b93725823659-member.alibiaojia.com/api/public/fast-login',
          qs.stringify({
            username: this.phone,
            smscode: this.msgYanzhenma,
          })).then((result) => {
          this.setCookie('shanbiao', JSON.stringify(result.data.data.access_token),7)
          localStorage.setItem('shanbiao', JSON.stringify(result.data.data.access_token))
          if (this.content) {
            this.$router.push({
              path: '/makename/fabuxuqiu',
              query: {content: this.content, sqrzchs: this.sqrzchs, num: this.num, minge: this.minge}
            })
          } else if (this.makename) {
            this.$router.push({
              path: '/makename/cjxs',
              query: {
                id: this.id,
                headerName: this.headerName,
                leibie: this.leibie,
                xianzhi: this.xianzhi,
                makename: this.makename
              }
            })
          } else if (this.wd) {
            this.$router.push({
              path: '/makename/wd'
            })
          } else {
            this.$router.back()
          }
        }).catch((error) => {
          console.log(error);
        })
      }
    }
  }


</script>
<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  
  #outer {
    overflow-y: scroll;
  }
  
  .loginHader {
    border-top: 1px solid $actcolor;
    width: 100%;
    height: 3.62rem;
    background: url("../../../assets/images/makename/logback.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    background-position: center center;
    
    .retreat {
      width: 0.48rem;
      height: 0.48rem;
      background: url("../../../assets/images/makename/icon01.png") no-repeat;
      background-size: 0.48rem 0.48rem;
      background-position: top left;
      position: absolute;
      top: 0.26rem;
      left: 0.25rem;
      margin: auto;
    }
    
    img {
      width: 1.60rem;
      height: 1.60rem;
      position: absolute;
      top: 1rem;
      left: 2.96rem;
    }
    
    p {
      color: #fff;
      font-size: 0.32rem;
      text-align: center;
      margin-top: 2.80rem;
    }
  }
  
  ul {
    padding: 0 0.25rem;
    box-sizing: border-box;
    width: 100%;
    
    li {
      line-height: 1.1rem;
      border-bottom: 1px solid $bordercolor;
      position: relative;
      img {
        width: 0.42rem;
        height: 0.42rem;
        vertical-align: middle;
      }
      
      input[type="text"] {
        width: 64%;
        height: 90%;
        font-size: 0.28rem;
        padding-left: 0.3rem;
        box-sizing: border-box;
        color: #62686f;
      }
      
      input::placeholder {
        font-size: 0.28rem;
      }
      
      input[type="button"] {
        width: 1.76rem;
        height: 0.66rem;
        background-color: $actcolor;
        color: #fff;
        border-radius: 0.33rem;
        font-size: 0.28rem;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
      
      .daojishi {
        padding: 0 0.2rem;
        height: 0.66rem;
        background-color: #ccc;
        color: #fff;
        line-height: 0.66rem;
        border-radius: 0.33rem;
        font-size: 0.28rem;
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
      
      .imgyzm {
        display: block;
        width: 1.6rem;
        height: 0.7rem;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      
    }
    
  }
  
  .user_login {
    background: $actcolor;
    width: 5rem;
    height: 0.88rem;
    border-radius: 1rem;
    text-align: center;
    line-height: 0.88rem;
    color: #fff;
    font-size: 0.32rem;
    margin: 0.5rem auto;
  }
  
  p.xy {
    text-align: center;
    color: #c0c3cc;
    font-size: 0.28rem;
    line-height: 0.5rem;
    padding-bottom:4rem;
    a {
      color: #95affa;
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
