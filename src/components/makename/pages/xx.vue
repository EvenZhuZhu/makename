<template>
  <div id="xx">
    <div class="msgheader">
      <div class="top">
        <span class="fl" @click="back()"></span>
        <span class="fr" @click="clear">一键清空</span>
        <span class="center">消息</span>
      </div>
    </div>
    <div class="gap"></div>
    <ul>
      <li v-for="(item,index) in list" :key="index" :class="{'disabled':arr.indexOf(index)!=-1,'dis':item.is_read=='1'}"
          @click.once="addClass(index,item.id)" ref="color">
        <p class="top"><span>{{item.body.title}}</span>&nbsp;&nbsp;&nbsp;<span>金额：{{item.body.value}}</span><span
          class="fr">提现到{{item.body.type}}</span>
        </p>
        <p class="bottom">申请时间：<span>{{item.body.apply_time}}</span>&nbsp;&nbsp;&nbsp;到账时间：<span>{{item.body.final_time}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script type='text/ecmascript-6'>
  import http from '../../../config/http'
  import qs from 'qs'
  
  export default {
    name: 'msg',
    data() {
      return {
        list: [],
        arr: [],
        token: localStorage.getItem('shanbiao').replace("\"","").replace("\"","") || '',
      }
    },
    created() {
      //提现申请日志
      http({
        url: '/getwithdrawalslog?page=1&accessToken=' + this.token,
        method: 'get'
      }).then((result) => {
        if (result.data.data.data === []) {
          return
        } else {
          this.list = result.data.data.data
        }
      }).catch((error)=>{
        console.log(error);
      })
    },
    methods: {
      back() {
        this.$router.back()
      },
      clear() {
        http({
          url: '/delwithdrawalslog?accessToken=' + this.token,
          method: 'post',
        }).then((result) => {
          if (result.status == 200) {
            location.reload()
          }
        }).catch((error)=>{
          console.log(error);
        })
      },
      addClass(index, id) {
        this.arr = this.arr.concat([index]);
        this.arr = [...new Set(this.arr)];
        http({
          url: '/setwithdrawalslogread?accessToken=' + this.token,
          method: 'post',
          data: qs.stringify({
            id: id,
          })
        }).then((result) => {
        }).catch((error)=>{
          console.log(error);
        })
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
      
      border-bottom: 1px solid $borcolor;
      padding: 0.26rem 0.24rem;
      box-sizing: border-box;
      p.top {
        height: 0.54rem;
        line-height: 0.54rem;
        font-size: 0.28rem;
        span.fr {
          border: 1px solid #95affa;
          border-radius: 0.27rem;
          padding: 0 0.16rem;
          color: #95affa;
        }
      }
      p.bottom {
        font-size: 0.22rem;
        color: $fontcolor;
      }
    }
    li:first-child {
      border-top: 1px solid $borcolor;
    }
    li.disabled, li.dis {
      color: #c0c3cc;
      p.top {
        span.fr {
          color: #c0c3cc;
          border: 1px solid #c0c3cc;
        }
      }
      p.bottom {
        color: #c0c3cc;
      }
    }
  }
</style>
