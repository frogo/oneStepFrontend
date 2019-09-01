<template>
  <div v-if="breadCrumb.isShow" class="breadCrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in breadCrumb.list" :key="index + item.path" :to="{path: item.path}">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'BreadcrumbSelf',
  computed: {
    ...mapState(['breadCrumb'])
  },
  mounted: function () {
  }
}
</script>
<style lang="scss">
  .breadCrumb{width:1200px;margin: 15px auto}
</style>
