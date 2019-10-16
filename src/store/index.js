import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization')
      ? localStorage.getItem('Authorization')
      : '',
    UserId: localStorage.getItem('UserId') ? localStorage.getItem('UserId') : ''
  },
  /* actions: {
   changeLogin(ctx,Authorization){
     ctx.commit('changeLogin',Authorization);
   }
 },*/
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      state.Authorization = user.Authorization
      state.UserId = user.UserId
      console.log(user.UserId)
      console.log('store/index.js---到这里了!')
      localStorage.setItem('Authorization', user.Authorization)
      localStorage.setItem('UserId', user.UserId)
    }
  }
})
