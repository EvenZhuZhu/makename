<template>
  <div></div>
</template>
<script>
  import http from '../../../config/http'
  
  export default {
    data() {
      return{
        token: localStorage.getItem('shanbiao')
      }
    },
    created() {
      http.get('https://305732904823078-intitle.alibiaojia.com/order/get', {
        params: {
          order_num: this.$route.query.order_num
        }
      })
        .then((res) => {
          if (res.data.code == 200) {
            console.log(res);
            console.log(res.data.data.name_id);
            this.$router.push({
              path: '/makename/czts',
              query: {id: res.data.data.name_id}
            })
          }
        })
        .catch((error) => {
          console.log(error);
          this.$router.push({
            path: '/makename',
            // query: {order_num: this.$route.query.order_num, accessToken: this.token.replace("\"", "").replace("\"", "")}
          })
        })
    },
  }
</script>

