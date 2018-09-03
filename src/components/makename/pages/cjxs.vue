<template>
  <div id="cjxs">
    <div class="joinheader">
      <div class="top">
        <span class="fl" @click="back()"></span>
        <span class="fr" @click="hide = !hide">收入说明</span>
        <span class="center">参加悬赏</span>
      </div>
      <div class="bottom" v-show='list'>
        <h2>{{list.title}}</h2>
        <p>商标类别：<span>{{list.type}}&nbsp;{{list.type_name}}</span></p>
        <p>字数限制：<span>{{xianzhi}}个字</span></p>
      </div>
    </div>
    <div class="srjc">
      <input type="text" placeholder="请输入您所取的名称" v-model="val" @focus="onfocus()" @blur="onblur()">
      <div @click="check()">检测成功率</div>
    </div>
    <footer v-show="footershow">
      <span>成功率＞55%？自己注册可以赚得更多哦！</span>
      <a class="fr" onclick="openZoosUrl('chatwin');return false;">注册商标</a>
    </footer>
    <div class="srsm" v-on:click.self="hideFun()" v-show="hide">
      <div class="center">
        <h2>成功率与收入说明</h2>
        <p>您赐予的名字是用来注册商标的，而您获得的收入与注册成功率相关，具体如下：</p>
        <p>成功率≤20%，可获得0.1元；</p>
        <p>成功率21%~30%，可获得0.2元；</p>
        <p>成功率31%~40%，可获得0.3元；</p>
        <p>成功率41%~50%，可获得0.4元；</p>
        <p> 成功率＞50%，可获得0.5元。</p>
      </div>
    </div>
    <div class="wxts" v-show="hide1">
      <div class="center">
        <h2>温馨提示</h2>
        <p>经测算，您赐予的名字注册成功率<span>{{successrate.successrate}}%</span>，你预计可以<span>获得{{successrate.profit}}元</span>收入，是否确定提交？
        </p>
        <span class="confirm" @click="confirm()">确定</span>
        <span class="cancel" @click="hideFun1()">取消</span>
      </div>
    </div>
    <div class="ts" v-show="show">
      <p>{{msg}}</p>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import http from '../../../config/http'
  import qs from 'qs'
  
  export default {
    name: 'cjxs',
    data() {
      return {
        val: this.$route.query.makename || '',
        // cookie: this.getCookie('shanbiao'),
        token: localStorage.getItem('shanbiao') || '',
        hide: false,
        hide1: false,
        show: false,
        footershow: true,
        successrate: '',
        successid: '',
        id: this.$route.query.id,
        msg: '所取名称不能为空',
        list: '',
        xianzhi: '',
      }
    },
    created() {
      console.log(this.cookie)
      //起名详情
      http({
        url: 'https://305732904823078-intitle.alibiaojia.com/manageapi/detailed',
        method: 'get',
        params: {
          id: this.id,
        }
      }).then((result) => {
        this.list = result.data.data.base
        this.xianzhi = result.data.data.base.word_limit.replace(/,/g, '/')
      }).catch((error) => {
        console.log(error);
      })
      // $(document).ready(function () {
      //   $('#cjxs').height($(window).height())
      // })
    },
    methods: {
      getCookie(cname) {
        var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
          return (arr[2]);
        else
          return null;
      },
      back() {
        this.$router.push({
          path: '/makename'
        })
      },
      hideFun() {
        this.hide = false
      },
      hideFun1() {
        this.hide1 = false
      },
      onfocus() {
        this.footershow = false
        $('#cjxs').css({'overflow-y': 'scroll'})
      },
      onblur() {
        this.footershow = true
        $('#cjxs').css({'overflow-y': 'hidden'})
      },
      check() {
        this.onblur()
        if (!this.val.trim()) {
          this.show = true
          setTimeout(() => {
            this.show = false
          }, 1000)
          this.val = ''
          return
        }
        
        if (!localStorage.getItem('shanbiao')) {
          this.$router.push({
            path: '/makename/register',
            query: {
              id: this.id,
              headerName: this.headerName,
              leibie: this.leibie,
              xianzhi: this.xianzhi,
              makename: this.val
            }
          })
          return
        }
        
        var reg = /^[0-9a-zA-Z]+$/
        var arr = this.val.trim().split('')
        for (var value of arr) {
          if (reg.test(value)) {
            this.show = true
            this.msg = '不支持英文或者数字取名'
            setTimeout(() => {
              this.show = false
              this.msg = '所取名称不能为空'
            }, 1000)
            this.val = ''
            return
          }
        }
        
        //商标成功率检测
        http({
          url: '/successrate',
          method: 'post',
          data: qs.stringify({
            id: this.id,
            name: this.val
          })
        }).then((result) => {
          this.successrate = result.data.data
          this.successid = result.data.data.id
          this.hide1 = !this.hide1
        }).catch((error) => {
          this.hide1 = false
          this.show = true
          this.msg = error.response.data.message
          setTimeout(() => {
            this.show = false
            this.msg = '所取名称不能为空'
          }, 1000)
        })
      },
      
      confirm() {
        //提交起名投稿
        http({
          url: '/sendnamed?accessToken=' + this.token.replace("\"", "").replace("\"", ""),
          method: 'post',
          data: qs.stringify({
            id: this.successid,
          })
        }).then((result) => {
          this.hide1 = false
          this.show = true
          this.msg = '取名成功'
          setTimeout(() => {
            this.show = false
            this.val = ''
            this.$router.push({
              path: '/makename',
            })
          }, 1000)
        }).catch((error) => {
          console.log(error);
          this.hide1 = false
          this.show = true
          this.msg = error.response.data.message
          setTimeout(() => {
            this.show = false
            this.msg = '所取名称不能为空'
          }, 1000)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  
  #cjxs {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: $bordercolor;
  }
  
  .joinheader {
    color: #fff;
    height: 3.8rem;
    background: url('../../../assets/images/makename/bg.png') no-repeat top center;
    background-size: 7.5rem 3.41rem;
    padding: 0 0.24rem;
    div.top {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      span {
        display: inline-block;
        height: 100%;
        line-height: 1.5rem;
        text-align: center;
      }
      span.fl {
        width: 1.56rem;
        background: url('../../../assets/images/makename/back.png') no-repeat left center;
        background-size: 0.42rem 0.4rem;
      }
      span.fr {
        width: 1.56rem;
        font-size: 0.34rem;
        text-align: end;
      }
      span.center {
        width: 3.9rem;
        font-size: 0.38rem;
      }
    }
    div.bottom {
      width: 100%;
      background-color: #fff;
      border-radius: 0.06rem;
      padding: 0.3rem 0.4rem;
      box-sizing: border-box;
      color: #000;
      h2 {
        word-break: keep-all; /* 不换行 */
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis; /* 溢出时显示省略标记...；需与overflow:hidden;一起使用*/
        line-height: 0.6rem;
        font-size: 0.34rem;
      }
      p {
        height: 0.54rem;
        line-height: 0.54rem;
        font-size: 0.3rem;
        color: $fontcolor;
        span {
          color: #000;
        }
      }
    }
  }
  
  .srjc {
    padding: 0 0.24rem;
    input {
      width: 100%;
      height: 1.1rem;
      border-radius: 0.06rem;
      margin-top: 0.4rem;
      padding-left: 0.4rem;
      box-sizing: border-box;
      background-color: #fff;
      font-size: 0.3rem;
    }
    input::placeholder {
      font-size: 0.3rem;
    }
    div {
      width: 4.4rem;
      height: 0.9rem;
      line-height: 0.9rem;
      margin: 1rem auto 4rem;
      background-color: $actcolor;
      color: #fff;
      text-align: center;
      border-radius: 0.5rem;
    }
  }
  
  footer {
    width: 100%;
    height: 1rem;
    background-color: #fff;
    font-size: 0.22rem;
    line-height: 1rem;
    padding-left: 0.24rem;
    box-sizing: border-box;
    color: $fontcolor;
    position: fixed;
    bottom: 0;
    span {
      display: inline-block;
      width: 70%;
    }
    a {
      display: inline-block;
      height: 100%;
      line-height: 1rem;
      width: 30%;
      color: #fff;
      background-color: $highlight;
      text-align: center;
      font-size: 0.3rem;
    }
  }
  
  .srsm {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
    .center {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 6.4rem;
      height: 5.4rem;
      background-color: #fff;
      border-radius: 0.08rem;
      padding: 0 0.5rem;
      box-sizing: border-box;
      h2 {
        height: 1.26rem;
        line-height: 1.26rem;
        font-size: 0.34rem;
        text-align: center;
      }
      p {
        color: $fontcolor;
        line-height: 0.46rem;
      }
    }
  }
  
  .wxts {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
    .center {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      
      width: 6.4rem;
      height: 3.7rem;
      background-color: #fff;
      border-radius: 0.08rem;
      /*margin: 4.8rem auto 0;*/
      padding: 0 0.5rem;
      box-sizing: border-box;
      h2 {
        height: 1.26rem;
        line-height: 1.26rem;
        font-size: 0.34rem;
        text-align: center;
      }
      p {
        color: $fontcolor;
        line-height: 0.46rem;
        span:nth-child(2) {
          color: red;
        }
      }
      span.confirm, span.cancel {
        color: $fontcolor;
        display: inline-block;
        height: 1rem;
        line-height: 1rem;
        float: left;
      }
      span.confirm {
        margin-left: 3.4rem;
        margin-right: 0.6rem;
        color: $actcolor;
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



