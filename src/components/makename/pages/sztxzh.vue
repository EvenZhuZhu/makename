<template>
  <div id="sztxzhwx">
    <div class="msgheader">
      <div class="top">
        <span class="fl" @click="back()"></span>
        <span class="center fr">设置提现账户</span>
      </div>
    </div>
    <div class="ewm">
      <span :class="{active:0==qwerqwre}" @click="addAct(0)" v-model="type">微信</span>
      <span :class="{active:1==qwerqwre}"
            @click="addAct(1)" class="fr" v-model="type">支付宝
      </span>
      <div class="ewmwximg" v-if="0==qwerqwre" ref="down"><img :src="imgUrls" ref="image0"></div>
      <div class="ewmzfbimg" v-if="1==qwerqwre" ref="down"><img :src="imgUrls" ref="image1"></div>
      <div ref="divGenres" class="list-default-img" @click.stop="addPic">
        <div class="upload">上传收款码</div>
        <input type="file" accept="image/jpg,image/png,image/jpeg,image/gif" capture="camera" @change="onFileChange"
               style="display:none;border:none;">
      </div>
      <div to="/makename/zhszcg" class="down" @click="saveImage()">完成</div>
    </div>
  
  </div>
</template>

<script type='text/ecmascript-6'>
  import http from '../../../config/http'
  import lrz from "lrz"
  import qs from 'qs'
  
  export default {
    name: 'sztxzh',
    data() {
      return {
        qwerqwre: '',
        imgUrls: '',
        type: 'wechat',
        token: localStorage.getItem('shanbiao').replace("\"", "").replace("\"", "") || '',
        id: ''
      }
    },
    mounted() {
      var img = document.querySelector('img')
      img.style.display = "none"
      
      var file = document.querySelector('input')
      if (getIos()) {
        file.removeAttribute("capture")
      }
      
      function getIos() {
        var ua = navigator.userAgent.toLowerCase()
        if (ua.match(/iPhone\sOS/i) == "iphone os") {
          return true
        } else {
          return false
        }
      }
    },
    created() {
      this.addAct(0)
    },
    methods: {
      back() {
        this.$router.push({
          path: '/makename/wd',
        })
      },
      addAct(index) {
        this.qwerqwre = index;
        // 我的提现二维码
        http({
            url: '/withdrawalsqrcode?accessToken=' + this.token,
            method: 'get',
          },
        ).then((result) => {
          
          if (index == 0) {
            this.type = 'wechat'
            if (result.data.data.wechat.url != '') {
              this.$refs.image0.style.display = 'block'
              console.log(result.data.data);
              this.imgUrls = result.data.data.wechat.url;
            } else {
              this.$refs.image0.style.display = 'none'
            }
          } else if (index == 1) {
            this.type = 'alipay'
            if (result.data.data.alipay.url != '') {
              this.$refs.image1.style.display = 'block'
              this.imgUrls = result.data.data.alipay.url;
            } else {
              this.$refs.image1.style.display = 'none'
            }
          }
        }).catch((error) => {
          console.log(error);
        })
        
      },
      addPic: function (e) {
        let els = this.$refs.divGenres.querySelectorAll('input[type=file]')
        els[0].click()
        return false
      },
      onFileChange: function (e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files, e);
        if (this.qwerqwre == 0) {
          this.$refs.image0.style.display = 'block'
        } else if (this.qwerqwre == 1) {
          this.$refs.image1.style.display = 'block'
        }
      },
      createImage: function (file, e) {
        let vm = this;
        lrz(file[0], {
          width: 480
        }).then(function (rst) {
          vm.imgUrls = rst.base64;
          return rst;
        }).always(function () {
          // 清空文件上传控件的值
          e.target.value = null;
        });
      },
      saveImage() {
        //上传图片
        this.$http({
            url: 'https://upfile.alibiaojia.com/api/index/upload-base64img',
            method: 'post',
            data: qs.stringify({
              image: this.imgUrls
            })
          },
        ).then((result) => {
          this.id = result.data.data.id;
          //设置提现二唯码
          http({
              url: '/setwithdrawalsqrcode?accessToken=' + this.token,
              method: 'post',
              data: qs.stringify({
                image_id: this.id,
                type: this.type
              })
            },
          ).then((res) => {
            if (res.status == 200) {
              this.$router.push({path: '/makename/zhszcg',})
            }
          }).catch((error) => {
            console.log(error);
          })
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  
  #sztxzhwx {
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
  
  .ewm {
    padding: 0.4rem 0.84rem 0;
    span {
      display: inline-block;
      width: 50%;
      height: 0.8rem;
      line-height: 0.8rem;
      box-sizing: border-box;
      border: 1px solid $borcolor;
      background-color: #fff;
      text-align: center;
      color: $fontcolor;
      cursor: pointer;
    }
    span:first-child {
      border-bottom-left-radius: 0.08rem;
      border-top-left-radius: 0.08rem;
      border-right: none;
    }
    span:last-child {
      border-bottom-right-radius: 0.08rem;
      border-top-right-radius: 0.08rem;
    }
    span.active {
      background-color: $fzcolor;
      border: 1px solid $fzcolor;
      color: #fff;
    }
    .ewmwximg, .ewmzfbimg {
      width: 5.8rem;
      height: 5.8rem;
      padding: 0.5rem;
      margin-top: 0.6rem;
      box-sizing: border-box;
      border-radius: 0.1rem;
      background: #fff url(../../../assets/images/makename/upload.png) no-repeat center center;
      background-size: 1.02rem 1.51rem;
      /*background: #fff url(../../assets/images/ewm.png) no-repeat center center;*/
      /*background-size: 4.8rem 4.8rem;*/
    }
    
    .ewmwximg img, .ewmzfbimg img {
      width: 4.8rem;
      height: 4.8rem;
    }
    
  }
  
  .upload, .down {
    width: 5.8rem;
    height: 0.86rem;
    line-height: 0.86rem;
    margin-top: 0.4rem;
    border-radius: 0.08rem;
    text-align: center;
    font-size: 0.3rem;
    color: $fontcolor;
    cursor: pointer;
  }
  
  .upload {
    border: 1px dashed $fzcolor;
    background: #fff url(../../../assets/images/makename/plus.png) no-repeat 1.7rem center;
    background-size: 0.29rem 0.29rem;
  }
  
  .down {
    border: 1px dashed $actcolor;
    background-color: $actcolor;
    color: #fff;
    margin-bottom: 0.4rem;
  }

</style>
