<template>
  <div id="fbxq">
    <p v-if="!isShow" class="fbxq" id="p2" ref="moveDiv" @click="link()"
       @mousedown="down" @touchstart="down"
       @mousemove="move" @touchmove="move"
       @mouseup="end" @touchend="end">
      发布需求</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flags: false,
        isShow: false,
        position: {
          x: 0,
          y: 0
        },
        nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
      }
    },
    methods: {
      link() {
        this.$router.push({
          path: '/makename/fabuxuqiu'
        })
      },
      // 实现移动端拖拽
      down() {
        this.flags = true;
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.dx = this.$refs.moveDiv.offsetLeft;
        this.dy = this.$refs.moveDiv.offsetTop;
      },
      move() {
        if (this.flags) {
          var touch;
          if (event.touches) {
            touch = event.touches[0];
          } else {
            touch = event;
          }
          this.nx = touch.clientX
            - this.position.x;
          this.ny = touch.clientY - this.position.y;
          this.xPum = this.dx + this.nx;
          this.yPum = this.dy + this.ny;
          
          this.$refs.moveDiv.style.left = this.xPum + "px";
          this.$refs.moveDiv.style.top = this.yPum + "px";
          //阻止页面的滑动默认事件
          document.addEventListener("touchmove", function () {
            event.preventDefault();
          }, { passive: false });
        }
      },
      //鼠标释放时候的函数
      end() {
        this.flags = false;
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  .fbxq {
    width: 1.2rem;
    height: 1.2rem;
    background-color: $actcolor;
    color: #fff;
    position: fixed;
    right: 0.32rem;
    bottom: 4rem;
    border-radius: 50%;
    font-size: 0.28rem;
    box-sizing: border-box;
    padding: 0.2rem;
    text-align: center;
  }
</style>

