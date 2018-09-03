export default {
  install: function (vm) {
    //验证手机输入格式
    vm.prototype.$checkLPhone = (phone) => {
      if (phone.trim() == '') {
        this.text = '请输入手机号'
        this.show2 = true
        // alert('请输入手机号');
      } else if (phone.trim().search(/^1[0-9]{10}$/) == 0) {
        return true;
      } else {
        alert('请输入正确的手机号');
      }
    }
    
    // 失焦验证图和密码
    vm.prototype.$checkLpicma = (picLyanzhengma) => {
      if (picLyanzhengma.trim() == '') {
        alert('请输入验证码');
      } else if (picLyanzhengma.trim().length != 4) {
        alert('验证码不正确');
      } else {
        return true;
      }
    }
    
    //验证登陆密码格式
    // vm.prototype.$checkLPsd = (LUserPsd) => {
    //   if (LUserPsd == '') {
    //     alert('请输入密码');
    //   } else if (LUserPsd.search(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/) == 0) {
    //     return true;
    //   } else {
    //     alert('密码必须6-20位，包含字母与数字');
    //   }
    // }
    
    //二次验证密码
    // vm.prototype.$checkLPsdTo = (LUserPsdTo, LUserPsd) => {
    //   if (LUserPsd == '') {
    //     alert('请输入密码');
    //   } else if (LUserPsd.search(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/) == 0 && LUserPsdTo == LUserPsd) {
    //     return true;
    //   } else if (LUserPsdTo != LUserPsd) {
    //     alert('二次密码不统一');
    //   } else {
    //     alert('密码必须6-20位，包含字母与数字');
    //   }
    // }
    
    // let local = {
    //   save (key, value) {
    //     localStorage.setItem(key, JSON.stringify(value))
    //   },
    //   fetch (key) {
    //     return JSON.parse(localStorage.getItem(key)) || {}
    //   }
    // }
    // vm.prototype.$local = local
    
    //埋点
    //生成uuid
    function guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    
    //获取手机的唯一识别数
    var sbuuid;
    //设置sessionStorage
    if (!window.sessionStorage.getItem('sbuuid')) {
      window.sessionStorage.setItem('sbuuid', guid());
    }
    sbuuid = window.sessionStorage.getItem('sbuuid')
    
    //获取token
    var token;
    if (window.sessionStorage.getItem('shanbiao')) {
      token = window.sessionStorage.getItem('shanbiao')
    }
    
    //获取手机型号和系统
    var iponeModel;
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      //安卓手机
      iponeModel = 'Android'
    } else if (u.indexOf('iPhone') > -1) {
      //苹果手机
      iponeModel = 'ios'
    } else if (u.indexOf('Windows Phone') > -1) {
      //winphone手机
      iponeModel = 'winphone'
    }
    
    //设备版本
    var device_version = window.navigator.appVersion;
    
    //埋点
    vm.prototype.$buryData = (behavior, fromPage, toPage) => {
      $.post("http://apicet.shsbip.com/api/site/devicelog", {
        action: behavior,
        type: '3',
        device_id: sbuuid,
        device_name: iponeModel,
        device_version: device_version,
        token: token,
        from_page: fromPage,
        to_page: toPage,
      }, function (res) {
        console.log(res);
      });
    }
  
    //微信号
    vm.prototype.$wx = (message) =>{
      return '标架科技'
    }
  
    //下载地址
    vm.prototype.$href = (message) =>{
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        //安卓手机
        return 'https://m.alibiaojia.com/app/bj.apk';
      } else if (u.indexOf('iPhone') > -1) {
        //苹果手机
        return 'https://itunes.apple.com/cn/app/sao-huo-bang/id1365391216?mt=8';
      }
    }
    
  }
}


