import store from '../store/index'
let userinfo=localStorage.getItem('userinfo');
if (userinfo) {
  userinfo = JSON.parse(userinfo)
  store.commit('loginModule/setUser',userinfo)
}