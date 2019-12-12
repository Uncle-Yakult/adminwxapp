import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
        isShow:true
        // ID:null,
        // showPercent:null
  },
  mutations: {
        setIsShow(state,str){
            state.isShow=str
        }
        // setShowPercent(state,str){
        //     state.showPercent = str;
        // },
        // setStorage(state,str){//设置本地存储
        //     state.ID = str;
        //     localStorage.setItem(key,JSON.stringify(str))
        // },
        // removeStorage(state){
        //     state.ID = null;
        //     localStorage.removeItem(key)
        // }
  },
  getters: {
      getIsShow(state){
             return state.isShow
        }
      // getShowPercent(state){
      //       return state.showPercent
      // }
  },
    actions:{

    },
    modules: {
        i18n: vuexI18n.store
    }
})
