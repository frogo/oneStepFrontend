// https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项
// state.obj = Object.assign({}, state.obj, { name: 1, age: 2 })
// Vue.set(state.obj, 'newProp', 123)
// state.obj = { ...state.obj, newProp: 123 }

export default {
  login_success (state, user) {
    state.loginStatus = true
    state.user = user
  },
  login_error (state) {
    state.loginStatus = false
  }
  // updateUser (state, payload) {
  //   state.templateList = Object.assign({}, state.templateList, payload.data)
  // }
}
