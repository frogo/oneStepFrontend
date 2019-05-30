<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    // ...mapState([
    //   'user'
    // ])
  },
  methods: {
    // ...mapMutations([
    //   'updateUser'
    // ]),
    // setUser () {
    //   this.updateUser({
    //     data: {
    //       name: 'zhangsan'
    //     }
    //   })
    // }
  }
}
</script>
