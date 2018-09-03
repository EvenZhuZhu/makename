<template>
  <div id="xsc">
    <h1><span class="fl" @click="back()"></span>悬赏池</h1>
    <div id="rewardpoollist">
      <scroller
        class="my-scroller"
        ref="myScroller"
        :on-refresh="refresh"
        :on-infinite="infinite"
        snappingHeight="60"
        v-show="scrisShow"
        style="position:fixed;top:1rem;"
      >
        <div style="height: 1px;"></div>
        <ul>
          <router-link tag="li" v-for="(item,index) in list" :key="index"
                       :to="{path:'/makename/cjxs',query:{id:item.id}}">
            <h2>{{item.title}}</h2>
            <p class="lb">类别：<span>{{item.type}}&nbsp;{{item.type_name}}</span>字数：<span>{{item.word_limit.replace(/,/g,'/')}}字</span>
            </p>
            <p class="timer">
              <span v-show="!item.timeout"><i>{{item.timeobj.days}}</i>天<i>{{item.timeobj.hours}}</i>时<i>{{item.timeobj.minutes}}</i>分截止</span>
              <span v-show="item.timeout">已结束</span>
              <span class="me" v-show="!(item.available_places==0)">还剩{{item.available_places}}个名额</span>
              <span class="me" v-show="item.available_places==0">已募集结束</span>
            </p>
          </router-link>
        </ul>
      </scroller>
      <div class="null" v-show="!scrisShow">
        <img src="../../../assets/images/makename/nodata.png" alt="">
        <router-link to="/makename/fabuxuqiu" class="fb" tag="div">发布需求</router-link>
      </div>
      <div class="pages" v-show="show2">{{pages}}/{{count}}</div>
    </div>
    <fbxq v-show="show3"></fbxq>
    <div id="footernav">
      <span class="w33 fl" :class="{active:qwerqwre==0}">悬赏池</span>
      <span class="w33 fl" @click="login()">我的</span>
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
      <div class="ts" v-show="show">
        <p>公众号已复制，请前往微信搜索关注</p>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import qmfooter from '../subComponents/footernav'
  import fbxq from './drag'
  import http from '../../../config/http'
  
  let firstLoaded = false;
  
  
  export default {
    name: "xsc",
    data() {
      return {
        list: '',
        scrisShow: true,
        end: '',
        pages: 1,
        timer: '',
        count: '',
        last: true,
        message: this.$wx(),
        hrefs: this.$href(),
        qwerqwre: 0,
        show1: false,
        show: false,
        show2: true,
        show3: true,
      }
    },
    components: {
      fbxq,
    },
    created() {
      // this.timer = setInterval(() => {
      this.firstHttp()
      // }, 1000)
    },
    methods: {
      back() {
        this.$router.back()
      },
      //加零
      addNumber(num) {
        var num = (num > 9) ? num : ('0' + num);
        return num;
      },
      firstHttp() {
        this.pages = 1
        //起名列表
        http({
          url: '/index',
          method: 'get',
          params: {
            page: this.pages
          }
        }).then((result) => {
          //判断是否有数据
          if (result.data.message == '无数据') {
            this.scrisShow = false
            this.show2 = false
            this.show3 = false
          } else {
            this.count = result.data.data.page.pagecount
            this.pages = result.data.data.page.page
            this.list = result.data.data.results
            this.$refs.myScroller.finishPullToRefresh();
            firstLoaded = true;
            var arr = this.list
            for (var value of arr) {
              var obj = {}
              //计算截止时间
              var endTime = new Date(value.expiry_time.replace(/\-/g, "/"))
              var leftTime = endTime - (new Date().getTime())
              obj.days = Math.floor(leftTime / 1000 / 60 / 60 / 24)
              obj.hours = this.addNumber(Math.floor(leftTime / 1000 / 60 / 60 % 24))
              obj.minutes = this.addNumber(Math.ceil(leftTime / 1000 / 60 % 60))
              if (new Date().getTime() >= endTime) {
                // clearInterval(timer);
                value.timeout = true
              }
              value.timeobj = obj
            }
          }
        }).catch((error) => {
          console.log(error);
        })
      },
      //上拉加载
      infinite() {
        if (!firstLoaded) {
          this.$refs.myScroller.finishInfinite()
          $('.loading-layer').css({'height': '160px'})
          $('.no-data-text').css({'line-height': '40px'})
          return;
        }
        
        if (this.pages == this.count) {
          this.$refs.myScroller.finishInfinite(2)
          return false
        }
        this.pages += 1
        
        http({
          url: '/index',
          method: 'get',
          params: {
            page: this.pages
          }
        }).then((result) => {
          this.count = result.data.data.page.pagecount
          this.pages = result.data.data.page.page
          this.list = this.list.concat(result.data.data.results)
          this.$refs.myScroller.finishInfinite();
          var arr = this.list
          for (var value of arr) {
            var obj = {}
            //计算截止时间
            var endTime = new Date(value.expiry_time.replace(/\-/g, "/"))
            var leftTime = endTime - (new Date().getTime())
            obj.days = Math.floor(leftTime / 1000 / 60 / 60 / 24)
            obj.hours = this.addNumber(Math.floor(leftTime / 1000 / 60 / 60 % 24))
            obj.minutes = this.addNumber(Math.ceil(leftTime / 1000 / 60 % 60))
            if (new Date().getTime() >= endTime) {
              // clearInterval(timer);
              value.timeout = true
            }
            value.timeobj = obj
          }
        }).catch((error) => {
          console.log(error);
        })
        
        
      },
      //下拉刷新
      refresh() {
        this.firstHttp()
      },
      login() {
        if (!localStorage.getItem('shanbiao')) {
          this.$router.push({
            path: '/makename/register',
            query: {'wd': 'istrue'}
          })
          return
        } else {
          this.$router.push({
            path: '/makename/wd',
          })
        }
      },
      follow() {
        this.show1 = !this.show1
      },
      onCopy(e) {
        this.show = true
        setTimeout(() => {
          this.show = false
        }, 2000)
      },
      onError(e) {
        alert('复制失败，请手动复制')
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  
  #xsc {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: $bordercolor;
    overflow-x: auto;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
  }
  
  h1 {
    /*padding-top: 0.4rem;*/
    height: 1rem;
    width: 100%;
    line-height: 1rem;
    font-size: 0.38rem;
    text-align: center;
    background-color: #fff;
    font-weight: normal;
    position: fixed;
    top: 0;
    z-index: 1;
    text-indent: -1.5rem;
    border-bottom: 1px solid $borcolor;
    span.fl {
      display: inline-block;
      width: 1.56rem;
      height: 100%;
      background: url(../../../assets/images/makename/back1.png) no-repeat 0.24rem center;
      background-size: 0.42rem 0.4rem;
    }
  }
  
  #rewardpoollist ul {
    padding: 0 .24rem;
    li {
      background: #fff;
      width: 100%;
      border-radius: 0.06rem;
      padding: 0.3rem;
      box-sizing: border-box;
      margin-top: 0.2rem;
      h2 {
        word-break: keep-all; /* 不换行 */
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis; /* 溢出时显示省略标记...；需与overflow:hidden;一起使用*/
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.34rem;
      }
      p.lb {
        height: 0.54rem;
        line-height: 0.54rem;
        font-size: 0.3rem;
        margin-top: 0.1rem;
        span {
          margin-right: 0.6rem;
        }
      }
      
      p.timer:after {
        content: "";
        display: block;
        clear: both;
      }
      p.timer {
        color: $fzcolor;
        span {
          float: left;
          padding-left: 0.5rem;
          background: url(../../../assets/images/makename/timer.png) no-repeat left center;
          background-size: 0.3rem 0.3rem;
          i {
            font-style: normal;
          }
        }
        span:nth-child(2) {
          background: url(../../../assets/images/makename/me.png) no-repeat left center;
          background-size: 0.3rem 0.3rem;
        }
        span.me {
          color: $highlight;
          margin-left: 0.5rem;
        }
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
  
  .null {
    width: 100%;
    position: fixed;
    top: 2rem;
    left: 0;
    right: 0;
    bottom: 1rem;
    margin: auto;
    font-size: .28rem;
    color: #62686f;
    text-align: center;
    img {
      width: 4.67rem;
      display: block;
      margin: 0 auto;
      margin-top: 2rem;
      margin-bottom: 0.3rem;
    }
    .fb {
      margin:0 auto;
      width: 2.26rem;
      line-height: 0.76rem;
      color: $actcolor;
      border:1px solid $actcolor;
      border-radius:0.1rem;
      text-align: center;
      margin-top:-1.1rem;
    }
  }
  
  .my-scroller {
    position: fixed;
    top: 1rem;
  }
  
  .pages {
    position: fixed;
    bottom: 1.3rem;
    left: 3.15rem;
    width: 1.2rem;
    height: 0.4rem;
    text-align: center;
    color: #fff;
    line-height: 0.4rem;
    border-radius: 0.2rem;
    background-color: rgba(0, 0, 0, .4);
    font-size: 0.24rem;
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


