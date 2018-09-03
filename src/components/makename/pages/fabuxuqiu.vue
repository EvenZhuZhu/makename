<template>
  <div id="fabuxuqiu">
    <div class="sbliebie" v-show="show">
      <div class="fwheader">
        <div class="fwclose" @click="show = !show"></div>
        <div class="fwtitle">选择商标类别</div>
      </div>
      <div class="checkbox">
        <form>
          <ul class="cheboxlist clearfix">
            <li v-for="(item,index) in bigType" :key="item.id" class="w33">
              <input type="radio" v-model="settedShangbiao" :value="item.tm_bigtype+'类'+item.tm_bigtype_name"
                     name="danxuan">
              <label for="item.tm_bigtype"
                     name="danxuan">{{item.tm_bigtype}}类&nbsp;&nbsp;{{item.tm_bigtype_name}}</label>
            </li>
          </ul>
          <div class="btn">
            <input type="button" value="确定" @click="shangbiaoSubmit">
            <input type="reset" value="重置" @click="leibieReset">
          </div>
        </form>
      </div>
    </div>
    <div class="bottom" v-show="!show">
      <div class="ts" v-show="isshow">
        <p>{{msg}}</p>
      </div>
      <h1 class="top">
        <span @click="back()" class="back fl"></span>
        <span>发布需求</span>
      </h1>
      <div class="gap"></div>
      <div class="title">
        <p>悬赏主题：</p>
        <input type="text" placeholder="请输入想要什么样的商标名字" v-model="content" :onblur="checkLength()">
      </div>
      <div class="gap"></div>
      <div class="leibie" @click="show=!show">
        <span>{{sqrzchs}}</span>
        <p>商标类别：</p>
      </div>
      <div class="gap"></div>
      <div class="xzzs  clearfix">
        <p>限制字数：</p>
        <ul>
          <li v-for="item in sblblist">
            <input type="checkbox" :value="item.count" v-model="num">
            <label :for="item.count">{{item.count}}个</label>
          </li>
        </ul>
      </div>
      <div class="gap"></div>
      <div class="minge">
        <select name="minge" id="" v-model="minge">
          <option value="请选择">请选择</option>
          <option value="1">1</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
        <p>设置名额：</p>
      </div>
      <div class="tss">
        <p>提示：一个名额可以收到一个名字，一个名额价值1元。</p>
        <p>7天内如果收到名字不足，将退回差额。</p>
      </div>
      <div class="next" @click="next()">下一步</div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import http from '../../../config/http'
  import qs from 'qs'
  
  export default {
    name: 'fabuxuqiu',
    data() {
      return {
        isshow: false,
        msg: '',
        show: false,
        content: this.$route.query.content || '',
        sqrzchs: this.$route.query.sqrzchs || '',
        id: '',
        num: [2],
        minge: this.$route.query.minge || '请选择',
        // cookie: this.getCookie('shanbiao'),
        token: localStorage.getItem('shanbiao') || '',
        bigType: [],
        settedShangbiao: [],
      }
    },
    created() {
      console.log(this.cookie)
      if (this.$route.query.content) {
        this.num = this.$route.query.num.split(',')
      } else {
        this.num = [2]
      }
      
      this.$http.get('https://549673720948957-shlef.alibiaojia.com/v1/biz/cls').then((result) => {
        this.bigType = result.data.data
      }).catch((error) => {
        console.log(error);
      })
      
      // 类别列表
      // http({
      //   url: 'http://biaojiaapi.alibiaojia.com/v1/biz/cls',
      //   method: 'get'
      // }).then((result) => {
      //   this.bigType = result.data.data
      // })
      
      this.sblblist = [
        {count: 2},
        {count: 3},
        {count: 4},
        {count: 5},
        {count: 6}
      ]
    },
    methods: {
      getCookie(cname) {
        var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
          return (arr[2]);
        else
          return null;
      },
      checkLength() {
        if (this.content.length > 12) {
          this.isshow = true
          this.msg = '悬赏主题请勿超过12个字'
          this.content = this.content.substring(0, 12)
          setTimeout(() => {
            this.isshow = false
            this.msg = ''
          }, 1000)
        }
      },
      back() {
        this.show = false
      },
      leibieReset() {
        this.settedShangbiao = []
      },
      shangbiaoSubmit() {
        this.sqrzchs = this.settedShangbiao.toString()
        this.show = false
      },
      back() {
        this.$router.back()
      },
      next() {
        if (!this.content) {
          this.isshow = true
          this.msg = '请输入悬赏主题'
          setTimeout(() => {
            this.isshow = false
            this.msg = ''
          }, 1000)
          return
        }
        
        if (!this.sqrzchs) {
          this.isshow = true
          this.msg = '请选择商标类别'
          setTimeout(() => {
            this.isshow = false
            this.msg = ''
          }, 1000)
          return
        }
        
        if (!this.num.toString()) {
          this.isshow = true
          this.msg = '请选择限制字数'
          setTimeout(() => {
            this.isshow = false
            this.msg = ''
          }, 1000)
          return
        }
        
        if (isNaN(parseInt(this.minge))) {
          this.isshow = true
          this.msg = '请选择设置名额'
          setTimeout(() => {
            this.isshow = false
            this.msg = ''
          }, 1000)
          return
        }
        
        if (!localStorage.getItem('shanbiao')) {
          this.$router.push({
            path: '/makename/register',
            query: {content: this.content, sqrzchs: this.sqrzchs, num: this.num.toString(), minge: this.minge,}
          })
          return
        }
        
        // 创建起名悬赏
        http({
          url: '/addnamed?accessToken=' + this.token.replace("\"", "").replace("\"", ""),
          method: 'post',
          data: qs.stringify({
            title: this.content,
            type: parseInt(this.sqrzchs),
            word_limit: this.num.toString(),
            places: this.minge
          })
        }).then((result) => {
          this.id = result.data.data.id
          this.$router.push({
            path: '/makename/zhifu',
            query: {
              content: this.content,
              sqrzchs: this.sqrzchs,
              num: this.num.toString(),
              minge: this.minge,
              id: this.id
            }
          })
        }).catch((error) => {
          console.log(error);
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  
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
  
  #fabuxuqiu {
    font-size: 0.3rem;
  }
  
  .gap {
    height: 0.2rem;
    background-color: $bordercolor;
  }
  
  .top {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    /*padding-top: 0.4rem;*/
    font-size: 0.38rem;
    text-indent: -2em;
    border-bottom: 1px solid $borcolor;
    background-color: #fff;
    font-weight: normal;
    .back {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background: url(../../../assets/images/makename/back1.png) no-repeat 0.24rem center;
      background-size: 0.42rem 0.4rem;
    }
  }
  
  .title {
    height: 1.5rem;
    border-top: 1px solid $borcolor;
    border-bottom: 1px solid $borcolor;
    padding: 0.26rem 0.24rem;
    box-sizing: border-box;
    background-color: #fff;
    input {
      width: 100%;
      font-size: 0.3rem;
    }
  }
  
  .leibie, .minge {
    height: 1rem;
    border-top: 1px solid $borcolor;
    border-bottom: 1px solid $borcolor;
    padding: 0 0.24rem;
    box-sizing: border-box;
    background-color: #fff;
    p {
      height: 1rem;
      line-height: 1rem;
    }
    span {
      display: inline-block;
      float: right;
      height: 1rem;
      line-height: 1rem;
      background: url(../../../assets/images/makename/go.png) no-repeat right center;
      background-size: 0.17rem 0.28rem;
      padding-right: 0.26rem;
    }
  }
  
  .xzzs {
    background-color: #fff;
    border-top: 1px solid $borcolor;
    border-bottom: 1px solid $borcolor;
    p {
      display: inline-block;
      width: 1.7rem;
      height: 1.8rem;
      float: left;
      padding-top: 0.4rem;
      margin-left: 0.24rem;
    }
    ul {
      width: 5.56rem;
      height: 2.3rem;
      float: right;
      li {
        height: 0.7rem;
        position: relative;
        float: left;
        margin: 0.3rem 0.3rem 0 0;
        color: $fontcolor;
        input[type="checkbox"] {
          width: 1.5rem;
          height: 0.7rem;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        }
        label {
          display: inline-block;
          width: 1.5rem;
          height: 0.7rem;
          line-height: 0.7rem;
          border: 1px solid $bordercolor;
          text-align: center;
          border-radius: 0.08rem;
          box-sizing: border-box;
        }
        input[type="checkbox"]:checked + label {
          color: $actcolor;
          background: url(../../../assets/images/makename/radio.png) no-repeat center center;
          background-size: 1.5rem 0.7rem;
        }
      }
    }
  }
  
  .minge select {
    padding-right:0.26rem;
    float: right;
    height: 100%;
    color: $fontcolor;
    font-size: 0.3rem;
    /*-webkit-appearance: menulist;*/
    -webkit-appearance: none;
    text-align: center;
    background: url(../../../assets/images/makename/arrow.png) no-repeat right center;
    background-size: 0.2rem 0.15rem;
    box-sizing: border-box;
  }
  
  .tss {
    padding: 0.24rem;
    background-color: #fffcf0;
    color: $highlight;
    font-size: 0.28rem;
    text-align: center;
    border-bottom: 1px solid $borcolor;
  }
  
  .next {
    width: 5.9rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background-color: $actcolor;
    color: #fff;
    margin: 0.5rem auto 0;
    text-align: center;
    border-radius: 0.45rem;
  }
  
  .sbliebie {
    .fwheader {
      height: 1rem;
      /*padding-top: 0.4rem;*/
      border-bottom: 1px solid $borcolor;
      .fwclose {
        width: 0.72rem;
        height: 100%;
        background: url('../../../assets/images/makename/back1.png') no-repeat 0.22rem center;
        background-size: 0.48rem 0.48rem;
        float: left;
      }
      .fwtitle {
        float: left;
        width: 90%;
        height: 100%;
        line-height: 1rem;;
        font-size: 0.38rem;
        text-align: center;
      }
    }
  }
  
  .checkbox .cheboxlist {
    padding: 0 0.15rem 1.8rem;
    color: $fontcolor;
  }
  
  .checkbox .cheboxlist li {
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.28rem;
    margin-top: 0.3rem;
    position: relative;
    float: left;
    padding: 0 0.1rem;
    box-sizing: border-box;
    input[type="radio"] {
      width: 100%;
      height: 100%;
      /*width: 2.16rem;*/
      /*height: 0.86rem;*/
      position: absolute;
      /*top: 0.02rem;*/
      /*left: 0.02rem;*/
      margin: auto;
      opacity: 0;
      box-sizing: border-box;
    }
    label {
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: 0.9rem;
      /*width: 2.16rem;*/
      /*height: 0.86rem;*/
      /*line-height: 0.86rem;*/
      border: 1px solid $borcolor;
      border-radius: 0.08rem;
      text-align: center;
      /*margin-left: 0.16rem;*/
      box-sizing: border-box;
    }
    input[type="radio"]:checked + label {
      border: 1px solid $actcolor;
      color: $actcolor;
    }
  }
  
  .sbliebie .checkbox .btn {
    width: 100%;
    height: 1.50rem;
    padding: 0.3rem 0.86rem;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    border-top: 1px solid $borcolor;
    background: #fff;
    input {
      width: 2.7rem;
      height: 0.8rem;
      font-size: 0.28rem;
      border-radius: 0.4rem;
    }
    input[type="button"] {
      background: $actcolor;
      color: #fff;
    }
    input[type="reset"] {
      border: 1px solid $borcolor;
      float: right;
      color: $fontcolor;
    }
  }

</style>
