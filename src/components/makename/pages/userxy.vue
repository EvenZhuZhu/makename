<template>
  <div>
    <div class="logheader">
      <div class="return" @click="backHandle"></div>
      <span>用户服务协议</span>
    </div>
    <div class="userfont" v-html="text">
    </div>
  </div>

</template>

<script>
  import http from '../../../config/http'
  
  import qs from 'qs'
  
  export default {
    data() {
      return {
        text: ''
      }
    },
    methods: {
      //后退
      backHandle() {
        this.$router.back();
      },
    },
    created() {
      http.get('https://bn04w9vt4w9b93725823659-member.alibiaojia.com/api/public/reg-agreement').then((res) => {
        this.text = res.data.data.reg_content;
      }).catch((error) => {
        console.log(error);
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  
  .logheader {
    width: 100%;
    height: 1rem;
    background: #fff;
    border-bottom: 1px solid $borcolor;
    position: relative;
    text-align: center;
    line-height: 1rem;
    font-size: .38rem;
    color: $decolor;
    .return {
      @include whs(.5rem);
      background-image: url(../../../assets/images/makename/back1.png);
      background-repeat: no-repeat;
      background-size: .48rem .48rem;
      position: absolute;
      top: 0;
      left: .25rem;
      bottom: 0;
      margin: auto;
    }
  }
  
  .userfont {
    padding: 0.25rem;
    box-sizing: border-box;
    font-size: .28rem;
    color: #62686f;
    text-indent: 2em;
  }
</style>
