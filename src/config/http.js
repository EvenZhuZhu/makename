import axios from 'axios'

let token = window.localStorage.getItem('shanbiao');

if (token == null) {
  token = ''
} else {
  token = token.replace("\"", "").replace("\"", "")
}

var HTTP = axios.create({
  baseURL: 'https://305732904823078-intitle.alibiaojia.com/api',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'accessToken': token
  }
})

export default HTTP;
