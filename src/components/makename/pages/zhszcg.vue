<template>
  <div id="zhszcg">
    <div class="msgheader">
      <div class="top">
        <span class="fl" @click="back()"></span>
        <span class="center fr">设置提现账户</span>
      </div>
    </div>
    <div class="fbcg">
      <p>恭喜您，成功设置账户，快去提现吧！</p>
      <router-link to="/makename/wd" class="down" tag="div">完成</router-link>
      <router-link to="/makename/yetx" class="tixian" tag="div">去提现</router-link>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    name: 'zhszcg',
    data() {
      return {}
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
  
  #zhszcg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: $bordercolor;
    overflow-x: auto;
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
  
  .fbcg {
    margin-top: 0.2rem;
    background: #fff url(../../../assets/images/makename/y.png) no-repeat center 0.96rem;
    background-size: 1.2rem 1.2rem;
    text-align: center;
    padding: 2.34rem 0.7rem 0.5rem;
    border-top: 1px solid $borcolor;
    p {
      color: $fontcolor;
      height: 0.74rem;
      line-height: 0.74rem;
      font-size: 0.32rem;
    }
    .down, .tixian {
      width: 4.4rem;
      height: 0.8rem;
      line-height: 0.8rem;
      margin: 0.4rem auto 0;
      border-radius: 0.4rem;
      text-align: center;
      font-size: 0.3rem;
      color: #fff;
      background-color: $actcolor;
      border: 1px solid $actcolor;
    }
    .tixian {
      color: $highlight;
      background-color: #fff;
      border: 1px solid $highlight;
    }
  }

</style>
