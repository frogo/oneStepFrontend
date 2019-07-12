import { login } from '@/request/api'

export default {
  syncLogin ({ commit }, user) {
    login(user).then(res => {
      const user = res.data.user
      localStorage.setItem('user', user)
      commit('auth_success', user)
    }, error => {
      alert(error)
      commit('auth_error')
      localStorage.removeItem('user')
    })
  },
  logout ({ commit }, user) {

  }
}
