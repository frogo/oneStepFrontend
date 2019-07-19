<template lang="html">
  <el-main class="page-course">
    <div class="filter-box">
      <el-form ref="filterForm" :model="filterForm" label-width="80px" size="mini">
        <el-form-item label="" class="keyword-input">
          <el-input
            v-model="filterForm.keyword"
            placeholder="请输入内容"
            size="medium "
          >
            <i slot="suffix" class="el-input__icon el-icon-search" />
          </el-input>
        </el-form-item>

        <el-form-item label="来源：">
          <el-radio-group v-model="filterForm.from">
            <el-radio :label="item" v-for="item in tags.from" border />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio-group v-model="filterForm.status">
            <el-radio :label="item" v-for="item in tags.status" border />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="系列：">
          <el-radio-group v-model="filterForm.series">
            <el-radio :label="item" v-for="item in tags.series" border />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="层级：">
          <el-checkbox-group v-model="filterForm.level">
            <el-checkbox-button :label="item" v-for="item in tags.level" :key="item" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="职能：">
          <el-checkbox-group v-model="filterForm.department">
            <el-checkbox-button :label="item" v-for="item in tags.department" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="自定：">
          <el-checkbox-group v-model="filterForm.custom">
            <el-checkbox-button :label="item" v-for="item in tags.custom" name="type" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
// import { getStatus, getTodo } from '@/request/api'
export default {
  data () {
    return {
      filterForm: {
        keyword: '',
        from: '外部',
        status: '',
        series: '',
        level: [''],
        department: [''],
        custom: ['']
      },
      tags: {
        from: ['外部', '内部'],
        status: ['状态1', '状态2', '状态3'],
        series: [ '系列1', '系列2', '系列3' ],
        level: ['层级1', '层级2', '层级3'],
        department: ['职能1', '职能2', '职能3'],
        custom: ['职能1', '职能2', '职能3']
      }
    }
  },
  computed: {
  },
  watch: {
  },
  mounted: function () {
  },
  methods: {
  }
}
</script>
