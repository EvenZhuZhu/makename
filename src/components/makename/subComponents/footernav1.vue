<template>
  <div id="footernav">
    <router-link to="/makename/" tag="span" class="w33 fl" :class="{active:0==qwerqwre}"
                 @click="addClassFun(0)">悬赏池
    </router-link>
    <span class="w33 fl" :class="{active:1==qwerqwre}"
          @click="login()">我的
    </span>
    
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
</template>

<script type='text/ecmascript-6'>
  export default {
    data() {
      return {
        message: this.$wx(),
        hrefs:this.$href(),
        qwerqwre: 1,
        show1: false,
        show: false,
        token: localStorage.getItem('shanbiao'),
      }
    },
    created(){
      if (!this.token) {
        this.$router.push({
          path: '/makename/register',
          query:{'wd':'istrue'}
        })
        return
      } else {
        this.$router.push({
          path: '/makename/wd',
        })
      }
    },
    created(){
      console.log(this.token);
    },
    methods: {
      login() {
        if (!this.token) {
          this.$router.push({
            path: '/makename/register',
            query:{'wd':'istrue'}
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
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  
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
