<template lang="html">
  <div>首页</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { getLogonOut, getMenus, getUserInfo, getPublishedFlowTemplateList } from '@/request/api'
import { oneDimensionalToTree } from '@/utility'
import CONFIG from '../../public/config'
export default {
  data () {
    return {

    }
  },
  computed: {
    // ...mapState([
    //   'flowTemplateList'
    // ])
  },
  // 监听,当路由发生变化的时候执行
  watch: {

  },
  mounted: function () {

  },
  methods: {
    // ...mapMutations([
    //   'updateFlowTemplateList'
    // ]),
  }
}
</script>

<style>
</style>
