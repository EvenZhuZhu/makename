<template>
  <div id="down">
    <h1 class="top">
      <span @click="back()" class="back fl"></span>
      <span>余额提现</span>
    </h1>
    <div class="yanse">
      <div class="fbcg">
        <h2>提现申请已提交，等待人工审核</h2>
        <p>{{apply_time}}</p>
        <p>预计到账时间：<span>{{newmonth}}月{{newday}}日</span></p>
      </div>
      <div class="ewm" @click="cg()">完成</div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    name: 'down',
    data() {
      return {
        apply_time: this.$route.query.apply_time,
        newmonth: this.$route.query.final_time.split('-')[1],
        newday: this.$route.query.final_time.split('-')[2]
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      cg() {
        this.$router.push({
          path: '/makename/wd',
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  #down {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: $bordercolor;
    overflow-x: auto;
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
  
  .yanse {
    background-color: #fff;
    padding-bottom: 0.1rem;
    .fbcg {
      margin-top: 0.2rem;
      background: url(../../../assets/images/makename/submit.png) no-repeat center 0.3rem;
      background-size: 2.32rem 2.12rem;
      text-align: center;
      padding: 2.34rem 0.7rem 0.5rem;
      border-top: 1px solid $borcolor;
      h2 {
        font-size: 0.38rem;
        font-weight: normal;
        height: 0.68rem;
        line-height: 0.68rem;
      }
      p {
        color: $fontcolor;
        font-size: 0.24rem;
      }
    }
    
    .ewm {
      width: 4.4rem;
      height: 0.9rem;
      line-height: 0.9rem;
      background-color: $actcolor;
      text-align: center;
      color: #fff;
      border-radius: 0.45rem;
      font-size: 0.32rem;
      margin: 0.5rem auto;
    }
  }


</style>
