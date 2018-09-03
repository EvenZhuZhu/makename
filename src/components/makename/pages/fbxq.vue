<template>
  <div id="fabuxiangqing">
    <div class="joinheader">
      <div class="top">
        <span class="fl" @click="back()"></span>
        <span class="fr"><a onclick="openZoosUrl('chatwin');return false;" target="_blank">立即注册</a></span>
        <span class="center">发布详情</span>
      </div>
      <div class="bottom">
        <h2>{{obj.title}}</h2>
        <p>商标类别：<span>{{obj.type}}{{obj.type_name}}</span></p>
        <p>字数限制：<span>{{word.replace(/,/g,'/')}}个字</span></p>
        <p>名额总数：<span>{{obj.places}}</span></p>
        <p class="last">还剩：<span>{{days}}</span>天<span>{{hours}}</span>时<span>{{minutes}}</span>分</p>
        <canvas id="canvas"></canvas>
      </div>
    </div>
    <ul class="outer">
      <li>
        <h2>成功率大于50%的名称</h2>
        <span>{{content['50']}}</span>
      </li>
      <li>
        <h2 class="second">成功率41%~50%的名称</h2>
        <span>{{content['41-50']}}</span>
      </li>
      <li>
        <h2>成功率31%~40%的名称</h2>
        <span>{{content['31-40']}}</span>
      </li>
      <li>
        <h2 class="fourth">成功率21%~30%的名称</h2>
        <span>{{content['21-30']}}</span>
      </li>
      <li>
        <h2 class="fifth">成功率小于20%的名称</h2>
        <span>{{content['20']}}</span>
      </li>
    </ul>
  </div>
</template>


<script type='text/ecmascript-6'>
  import http from '../../../config/http'
  
  export default {
    name: 'fabuxiangqing',
    data() {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        percent: Number(this.$route.query.completion_progress),
        id: this.$route.query.id,
        obj: '',
        word: '',
        content: '',
        token: localStorage.getItem('shanbiao').replace("\"", "").replace("\"", "") || '',
        timer: null
      }
    },
    mounted() {
      var canvas = document.getElementById('canvas') //获取canvas元素
      var clientWidth = document.documentElement.clientWidth //获取屏幕的宽度
      var context = canvas.getContext('2d')//获取画图环境，指明为2d
      //根据设计图中的canvas画布的占比进行设置
      var canvasWidth = Math.floor(clientWidth * 340 / 750)
      canvas.setAttribute('width', canvasWidth)
      canvas.setAttribute('height', canvasWidth)
      $('canvas').css('width', canvasWidth / 2 + 'px');
      $('canvas').css('height', canvasWidth / 2 + 'px');
      var _percent = this.percent
      var centerX = canvas.width / 2 //Canvas中心点x轴坐标
      var centerY = canvas.height / 2 //Canvas中心点y轴坐标
      var rad = Math.PI * 2 / 100//将360度分成100份，那么每一份就是rad度
      var speed = 0//加载的快慢就靠它了
      
      //绘制8像素宽的运动外圈
      function blueCircle(n) {
        context.save();
        context.strokeStyle = "#ffaf30"; //设置描边样式
        context.lineWidth = clientWidth * 16 / 750; //设置线宽
        context.beginPath(); //路径开始
        context.arc(centerX, centerY, clientWidth * 162 / 750, -Math.PI / 2, -Math.PI / 2 + n * rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke(); //绘制
        context.closePath(); //路径结束
        context.restore();
      }
      
      //绘制灰色外圈
      function whiteCircle() {
        context.save();
        context.beginPath();
        context.lineWidth = clientWidth * 16 / 750;
        context.strokeStyle = "#f0f3f6";
        context.arc(centerX, centerY, clientWidth * 162 / 750, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
        context.restore();
      }
      
      //百分比文字绘制
      function text(n) {
        context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        context.beginPath();
        context.strokeStyle = "#62686f"; //设置描边样式
        context.font = clientWidth * 88 / 750 + 'px Adobe 黑体 Std'; //设置字体大小和字体
        context.fillStyle = "#ffaf30";
        //绘制字体，并且指定位置
        if(n<10){
          context.fillText(n.toFixed(0) + "%", centerX-30, centerY);
        }else if(n<100){
          context.fillText(n.toFixed(0) + "%", centerX-38, centerY);
        }else {
          context.fillText(n.toFixed(0) + "%", centerX-50, centerY);
        }
        
        context.stroke(); //执行绘制
        context.restore();
      }
      
      function textt() {
        context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        context.beginPath();
        context.fillStyle = '#62686f';   // 文字填充颜色
        context.font = clientWidth * 40 / 750 + 'px Adobe 黑体 Std'; //设置字体大小和字体
        context.fillText('完成度', centerX - 28, centerY + 40);
        context.stroke();
        context.restore();
      }
      
      //动画循环
      (function drawFrame() {
        window.requestAnimationFrame(drawFrame);
        context.clearRect(0, 0, canvas.width, canvas.height);
        whiteCircle();
        text(speed);
        blueCircle(speed);
        textt();
        speed += 0.5;
        if (speed >= _percent) speed = _percent;
      }());
    },
    created() {
      //我的起名详情
      http({
        url: '/mydetailed?id=' + this.id + '&accessToken=' + this.token,
        method: 'get',
      }).then((result) => {
        this.obj = result.data.data.base
        this.content = result.data.data.statistics
        this.word = this.obj.word_limit.replace(',', '/')
        // this.timer = setInterval(() => {
        //计算截止时间
        var endTime = new Date(this.obj.expiry_time.replace(/\-/g, "/"))
        var leftTime = endTime - (new Date().getTime())
        this.days = Math.floor(leftTime / 1000 / 60 / 60 / 24)
        this.hours = this.addNumber(Math.floor(leftTime / 1000 / 60 / 60 % 24))
        this.minutes = this.addNumber(Math.ceil(leftTime / 1000 / 60 % 60))
        if (new Date().getTime() >= endTime) {
          clearInterval(this.timer);
          this.days = 0
          this.hours = 0
          this.minutes = 0
        }
        // },1000)
      }).catch((error)=>{
        console.log(error);
      })
    },
    methods: {
      addNumber(num) {
        var num = (num > 9) ? num : ('0' + num);
        return num;
      },
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/mixin";
  
  #fabuxiangqing {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: $bordercolor;
    overflow-x: auto;
  }
  
  .joinheader {
    color: #fff;
    background: url(../../../assets/images/makename/bg.png) no-repeat top center;
    background-size: 7.5rem 3.41rem;
    padding: 0 0.24rem;
    div.top {
      width: 100%;
      height: 1.9rem;
      line-height: 1.9rem;
      span {
        display: inline-block;
        height: 100%;
        line-height: 1.9rem;
        text-align: center;
      }
      span.fl {
        width: 1.56rem;
        background: url(../../../assets/images/makename/back.png) no-repeat left center;
        background-size: 0.42rem 0.4rem;
      }
      span.fr {
        width: 1.56rem;
        font-size: 0.34rem;
        text-align: end;
      }
      span.fr a {
        color: #fff;
      }
      span.center {
        width: 3.9rem;
        font-size: 0.38rem;
      }
    }
    div.bottom {
      width: 100%;
      background-color: #fff;
      border-radius: 0.08rem;
      padding: 0.3rem 0.4rem;
      box-sizing: border-box;
      color: #000;
      position: relative;
      h2 {
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.34rem;
      }
      p {
        height: 0.54rem;
        line-height: 0.54rem;
        font-size: 0.3rem;
        color: $fontcolor;
      }
      p.last {
        color: $highlight;
      }
    }
  }
  
  .outer {
    padding: 0.1rem 0.24rem 0.3rem;
    li {
      margin-top: 0.2rem;
      background-color: #fff;
      border-radius: 0.08rem;
      padding: 0.2rem 0.5rem;
      h2 {
        height: 0.7rem;
        line-height: 0.7rem;
        font-size: 0.3rem;
        color: #48b281;
        position: relative;
      }
      h2::before {
        content: '';
        display: inline-block;
        width: 0.18rem;
        height: 0.18rem;
        background-color: #48b281;
        position: absolute;
        left: -0.5rem;
        top: 0.24rem;
      }
      h2.second {
        color: $actcolor;
      }
      h2.second::before {
        background-color: $actcolor;
      }
      h2.fourth {
        color: #398ba3;
      }
      h2.fourth::before {
        background-color: #398ba3;
      }
      h2.fourth {
        color: #398ba3;
      }
      h2.fourth::before {
        background-color: #398ba3;
      }
      h2.fifth {
        color: #ea534a;
      }
      h2.fifth::before {
        background-color: #ea534a;
      }
      
      span {
        display: inline-block;
        height: 0.44rem;
        line-height: 0.44rem;
        font-size: 0.3rem;
        color: $fontcolor;
      }
    }
  }
  
  canvas {
    position: absolute;
    top: 1.26rem;
    right: 0.4rem;
  }

</style>
