<template>
  <div id="czts">
    <h1 class="top">
      <span @click="back()" class="back fl"></span>
      <span>操作提示</span>
    </h1>
    <div class="gap"></div>
    <div class="fbcg">
      <h2>发布成功</h2>
      <p>我需要一些商标名字来注册，你可以帮我想一些名字吗？</p>
      <p>每提交一个名字你都可以获得红包奖励哦。</p>
    </div>
    <div class="ewm">
      <qrcode :value="qrcodeUrl"
              :options="{ size: size}"
              ref='qr'>
        >
      </qrcode>
      <img src="" alt="" id="img">
      <p>微信二维码扫描后进入H5页面</p>
      <p>长按图片保存</p>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import http from '../../../config/http'
  import VueQrcode from '@xkeshi/vue-qrcode'
  
  export default {
    name: 'czts',
    data() {
      return {
        qrcodeUrl: '',
        size: '',
        show: true,
        id: this.$route.query.id,
      }
    },
    created() {
      var clientWidth = document.documentElement.clientWidth //获取屏幕的宽度
      this.size = Math.floor(clientWidth * 280 / 750)
      console.log(this.id);
      this.qrcodeUrl = 'http://m.alibiaojia.com/makename/cjxs?id=' + this.id
      console.log(this.qrcodeUrl);
    },
    mounted() {
      var imgsrc = this.$refs.qr.$el.toDataURL('image/jpg')
      $('#img').attr('src', imgsrc).prev('canvas').hide()
    },
    methods: {
      back() {
        this.$router.push({
          path: '/makename/',
        })
      },
    },
    components: {
      'qrcode': VueQrcode
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  
  .top {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    /*padding-top: 0.4rem;*/
    font-size: 0.38rem;
    font-weight: normal;
    text-indent: -2em;
    border-bottom: 1px solid $borcolor;
    .back {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background: url(../../../assets/images/makename/back1.png) no-repeat 0.24rem center;
      background-size: 0.42rem 0.4rem;
    }
  }
  
  .gap {
    height: 0.2rem;
    background-color: $bordercolor;
  }
  
  .fbcg {
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
    border-top: 0.2rem solid $bordercolor;
    padding-top: 1rem;
    text-align: center;
    p {
      color: $fontcolor;
      font-size: 0.28rem;
    }
  }

</style>
