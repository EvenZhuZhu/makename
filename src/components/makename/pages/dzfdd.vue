<template>
  <div id="dzfdd">
    <div class="msgheader">
      <div class="top">
        <span class="fl" @click="back()"></span>
        <span class="center fr">待支付订单</span>
      </div>
    </div>
    <div class="gap"></div>
    <ul>
      <li v-for="(item,index) in list" :key="index"
          :class="{'disabled':arr.indexOf(index)!=-1}" ref="color" @click="link(index)">
        <p class="top">
          {{item.title}}
          <span @click.stop="del(index)"></span>
        </p>
        <p class="bottom">共<span>{{item.places}}</span>个名额，完成<span>{{item.completion_progress}}%</span>
          <span class="fr"
                v-show="item.timeobj.show==='true'">距离订单失效：<em>{{item.timeobj.hours}}</em>:<em>{{item.timeobj.minutes}}</em>:<em>{{item.timeobj.seconds}}</em>
          </span>
          <span class="fr" v-show="item.timeobj.show==='false'">订单已失效</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script type='text/ecmascript-6'>
  import http from '../../../config/http'
  import qs from 'qs'
  
  export default {
    name: 'dzfdd',
    data() {
      return {
        list: '',
        id: '',
        arr: [],
        token: localStorage.getItem('shanbiao') || '',
        timer: '',
      }
    },
    created() {
      this.timer = setInterval(() => {
        //我发布的起名列表，未支付
        http({
          url: 'mynamed?accessToken=' + this.token.replace("\"", "").replace("\"", "") + '&page=1&paystatus=unpay',
          method: 'get',
        }).then((result) => {
          if (result.data.message == "无数据") {
            clearInterval(this.timer);
          } else {
            this.list = result.data.data.results
            var arr = result.data.data.results
            for (var value of arr) {
              var obj = {}
              //计算截止时间
              var endTime = new Date(value.created_at.replace(/\-/g, "/"))
              var leftTime = endTime.getTime() - new Date().getTime() + 7200000
              // obj.days = Math.floor(leftTime / 1000 / 60 / 60 / 24)
              obj.hours = this.addNumber(parseInt(leftTime / 1000 / 60 / 60 % 24))
              obj.minutes = this.addNumber(parseInt(leftTime / 1000 / 60 % 60))
              obj.seconds = this.addNumber(parseInt(leftTime / 1000 % 60))
              obj.show = 'true'
              if (leftTime <= 0) {
                obj.show = 'false'
              }
              value.timeobj = obj
            }
          }
        }).catch((error) => {
          console.log(error);
        })
      }, 1000)
    },
    methods: {
      //加零
      addNumber(num) {
        var num = (num > 9) ? num : ('0' + num);
        return num;
      },
      back() {
        this.$router.back()
      },
      link(index) {
        if (this.list[index].timeobj.show === 'false') {
          return false
        } else {
          this.$router.push({
            path: '/makename/zhifu',
            query: {
              content: this.list[index].title,
              sqrzchs: this.list[index].type,
              type_name: this.list[index].type_name,
              num: this.list[index].word_limit,
              minge: this.list[index].places,
              id: this.list[index].id
            }
          })
        }
      },
      del(index) {
        // this.arr = this.arr.concat([index]);
        this.arr = [...new Set(this.arr)];
        //删除起名
        http({
          url: '/deletenamed',
          method: 'get',
          params: {
            id: this.list[index].id,
            accessToken: this.token.replace("\"", "").replace("\"", ""),
          }
        }).then((result) => {
          console.log(result);
        }).catch((error) => {
          console.log(error);
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  
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
  }
  
  ul {
    li {
      height: 1.56rem;
      border-bottom: 0.1rem solid $bordercolor;
      padding: 0.26rem 0.24rem;
      box-sizing: border-box;
      p.top {
        height: 0.54rem;
        line-height: 0.54rem;
        font-size: 0.28rem;
        span {
          float: right;
          display: inline-block;
          height: 100%;
          width: 0.37rem;
          background: url(../../../assets/images/makename/delete.png) no-repeat center center;
          background-size: 0.37rem 0.4rem;
        }
      }
      p.bottom {
        font-size: 0.26rem;
        color: $fontcolor;
        span.fr {
          color: $highlight;
          em {
            font-style: normal;
          }
        }
        
      }
    }
    li:first-child {
      border-top: 1px solid $borcolor;
    }
    
    li.disabled {
      display: none;
    }
    
    li.disabled1 {
      color: #c0c3cc;
      p {
        color: #c0c3cc;
        span.fr {
          color: #c0c3cc;
        }
      }
      
    }
  }
</style>
