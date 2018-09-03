<template>
  <div id="szjl">
    <div class="msgheader">
      <div class="top">
        <span class="fl" @click="back()"></span>
        <span class="center">收支记录</span>
      </div>
    </div>
    <table cellspacing=0>
      <tr>
        <th>时间</th>
        <th>事件</th>
        <th>需求名称</th>
        <th>收支变动</th>
        <th>余额</th>
      </tr>
      <tr v-for="(item,index) in list" :key="index">
        <td>{{item.created_at}}</td>
        <td>{{item.description.substring(0,15)+'...'}}</td>
        <td>{{item.title.substring(0,10)+'...'}}</td>
        <td class="price" ref="color">{{item.value_symbol}}</td>
        <td>{{item.now_balance}}</td>
      </tr>
    </table>
  </div>
</template>

<script type='text/ecmascript-6'>
  import http from '../../../config/http'
  import qs from 'qs'
  
  export default {
    name: 'szjl',
    data() {
      return {
        price: '',
        list: '',
        token: localStorage.getItem('shanbiao').replace("\"","").replace("\"","") || '',
      }
    },
    created() {
      //交易记录
      http({
        url: '/mytraderrecord?page=1&accessToken=' + this.token,
        method: 'post',
      }).then((result) => {
        this.list = result.data.data.data
        this.$nextTick(() => {
          for (var value of this.$refs.color) {
            if (value.innerHTML < 0) {
              value.classList.add('active')
            }
          }
        })
      }).catch((error)=>{
        console.log(error);
      })
    },
    methods: {
      back() {
        this.$router.back()
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
  
  table {
    width: 100%;
    text-align: left;
    font-weight: normal;
    tr {
      width:100%;
      th {
        height: 0.9rem;
        background-color: $bordercolor;
        border-bottom: 1px solid $borcolor;
        box-sizing: border-box;
        font-size: 0.28rem;
        text-align: center;
      }
      td {
        box-sizing: border-box;
        padding: 0.4rem 0.1rem;
        color: $fontcolor;
        font-size: 0.24rem;
        border-bottom: 1px solid $borcolor;
      }
      td:nth-child(1) {
        width: 32%;
      }
      td:nth-child(2) {
        width: 8%;
      }
      td:nth-child(3) {
        width: 22%;
      }
      td:nth-child(4) {
        text-align: center;
        width: 22%;
      }
      td:nth-child(5) {
        width: 16%;
      }
      td.price {
        color: #33ab2a;
      }
      td.price.active {
        color: #e82121;
      }
    }
  }
</style>
