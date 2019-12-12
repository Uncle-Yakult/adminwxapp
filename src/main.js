import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Cookies from 'js-cookie'


//调用弹框插件，绑定在全局
import { AlertPlugin, LoadingPlugin, WechatPlugin,ToastPlugin} from 'vux';
Vue.use(AlertPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(WechatPlugin);

import vuexI18n from 'vuex-i18n';
Vue.use(vuexI18n.plugin,store);

// 引用 自定义JS文件
import $app from './app/app';
// 将自定义js方法绑定到全局
// 原型不变，在全局this下console不出来，但是this.$app有效
Vue.prototype.$app = $app;
// import VConsole from 'vconsole'; //import vconsole
// let vConsole = new VConsole()

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
    // let admin_id = $app.getCookie("admin_id");//第二套
    // if($app.judageData(admin_id)&&!$app.judageData(sessionStorage.getItem("admin_id"))){
    //      $app.ajax("common/login/autoLogin",{admin_id},(res)=>{
    //          if(res.errorCode == 1){
    //              next("/login")
    //          }else{
    //              next();
    //          }
    //      })
    // }else{
    //     if(to.path =="/login"){
    //         if($app.judageData(admin_id)){
    //             $app.ajax("common/login/autoLogin",{admin_id},(res)=>{
    //                 if(res.errorCode == 1){
    //                     next()
    //                 }else{
    //                     next("/home");
    //                 }
    //             })
    //         }else{
    //             next();
    //         }
    //     }else{
    //         next();
    //     }
    // }
    // if(to.path !== "/login"){//第一套
    //     console.log("tologin")
    //         let admin_id = $app.getCookie("admin_id");
    //         if($app.judageData(admin_id)){
    //             console.log("cookie-have")
    //             $app.ajax("common/login/autoLogin",{admin_id},(res)=>{
    //                 $app.toast(res.msg)
    //                 $app.setSettings(parseInt(res.data),"admin-id");//本地设置
    //                 if (res.errorCode == 1) {
    //                     next("/login")
    //                 }else{
    //                     next("/home")
    //                 }
    //             })
    //         }else{
    //             console.log("cookie-null")
    //             next("/login")
    //      }
    // }
    // else{
    //     let token = sessionStorage.getItem('admin-id');
    //     if(token == null){
    //         next("/login")
    //     }else{
    //         next();
    //     }
    // }
})
