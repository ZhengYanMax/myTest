import router from './index'
import store from '../store/index'
router.beforeEach((to, from, next) => {
    // console.log('to', to);
    // console.log('from', from);
    if (to.matched.some(item => item.meta.isLogin)) {
      const token =store.state.loginModule.userinfo.token;
      // console.log('仓库的token数据',token);
      if (token) {
        next();
      } else {
        next('/login')
      }
    } else {
      console.log('不需要登录');
      next()
    }
  })