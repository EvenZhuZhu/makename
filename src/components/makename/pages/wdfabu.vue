<template>
  <div id="wdfabu">
    <div class="msgheader">
      <div class="top">
        <span class="fl" @click="back()"></span>
        <router-link to="/makename/dzfdd" tag="span" class="fr">待支付</router-link>
        <span class="center">我的发布</span>
      </div>
    </div>
    <div class="gap"></div>
    <scroller
      class="my-scroller"
      ref="myScroller"
      :on-refresh="refresh"
      :on-infinite="infinite"
      snappingHeight="60"
      v-show="scrisShow"
      style="position:fixed;top:1.2rem;"
    >
      <ul>
        <router-link tag="li" v-for="(item,index) in list" :key="index"
                     :to="{path:'/makename/fbxq',query:{id:item.id,completion_progress:item.completion_progress}}">
          <p class="top">{{item.title}}</p>
          <p class="bottom">共<span>{{item.places}}</span>个名额，完成<span>{{item.completion_progress}}%</span></p>
        </router-link>
      </ul>
    </scroller>
    <div class="null" v-show="!scrisShow">
      <img src="../../../assets/images/makename/null.png" alt="">
      暂无相关数据
    </div>
    <div class="pages" v-show="show">{{pages}}/{{count}}</div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import http from '../../../config/http'
  
  let firstLoaded = false;
  
  export default {
    name: 'wdfabu',
    data() {
      return {
        list: '',
        scrisShow: true,
        pages: 1,
        show:true,
        count: '',
        token: localStorage.getItem('shanbiao').replace("\"", "").replace("\"", "") || '',
      }
    },
    created() {
      this.firstHttp()
    },
    methods: {
      back() {
        this.$router.back()
      },
      firstHttp() {
        //我发布的起名列表，已经支付，第一页
        this.pages = 1
        http({
          url: 'mynamed?accessToken=' + this.token + '&page=' + this.pages + '&paystatus=success',
          method: 'get',
        }).then((result) => {
          console.log(result);
          if (result.data.message == '无数据') {
            this.show = false
            this.scrisShow = false
          } else {
            this.show = true
            this.count = result.data.data.page.pagecount
            this.list = result.data.data.results
            this.pages = result.data.data.page.page
            this.$refs.myScroller.finishPullToRefresh();
            firstLoaded = true;
          }
        }).catch((error)=>{
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
  
        this.pages += 1;
        
        http({
          url: 'mynamed?accessToken=' + this.token + '&page=' + this.pages + '&paystatus=success',
          method: 'get',
        }).then((result) => {
          this.count = result.data.data.page.pagecount
          this.pages = result.data.data.page.page
          this.list = this.list.concat(result.data.data.results)
          this.$refs.myScroller.finishPullToRefresh()
          this.$refs.myScroller.finishInfinite()
        })
      },
      //下拉刷新
      refresh() {
        this.firstHttp()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  
  .gap {
    height: 0.2rem;
    background-color: $bordercolor;
  }
  
  .msgheader {
    height: 1rem;
    /*padding-top: 0.4rem;*/
    border-bottom: 1px solid $borcolor;
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
        width: 1.56rem;
        background: url(../../../assets/images/makename/back1.png) no-repeat 0.24rem center;
        background-size: 0.42rem 0.4rem;
      }
      span.fr {
        width: 1.56rem;
        font-size: 0.34rem;
        text-align: end;
        padding-right: 0.24rem;
        color: $actcolor;
      }
      span.center {
        width: 3.9rem;
        font-size: 0.38rem;
      }
    }
  }
  
  ul {
    li {
      height: 1.56rem;
      border-bottom: 1px solid $borcolor;
      padding: 0.26rem 0.24rem;
      box-sizing: border-box;
      background: url(../../../assets/images/makename/go.png) no-repeat 96% center;
      background-size: 0.17rem 0.28rem;
      p.top {
        height: 0.54rem;
        line-height: 0.54rem;
        font-size: 0.28rem;
      }
      p.bottom {
        font-size: 0.26rem;
        color: $fontcolor;
      }
    }
    li:first-child {
      border-top: 1px solid $borcolor;
    }
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
      width: 2.11rem;
      display: block;
      margin: 0 auto;
      margin-top: 2rem;
      margin-bottom: 0.3rem;
    }
  }
  
  .my-scroller {
    position: fixed;
    top: 1rem;
  }
  
  .pages {
    position: fixed;
    bottom: 0.3rem;
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


</style>
