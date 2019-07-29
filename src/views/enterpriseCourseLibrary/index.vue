<template lang="html">
  <el-main class="page-course">
    <div class="filter-box">
      <el-button @click="gotoCreate" type="primary" class="add-button">
        创建课程
      </el-button>
      <div class="keyword-input">
        <el-input
          v-model="keyword"
          @keyup.enter.native="handleSearch"
          placeholder="请输入内容"
          size="medium "
        >
          <i slot="suffix" @click="handleSearch" class="el-input__icon el-icon-search" />
        </el-input>
      </div>
      <el-form ref="filterForm" :model="filterForm" label-width="60px" size="mini">
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

    <div class="course-list">
      <el-row>
        <el-col :span="4" v-for="(item, index) in courseList" :key="`lesson_${index}`" :offset="index%5 ==0 ? 0 : 1">
          <el-card class="course-card">
            <div class="img-area">
              <div class="mask">
                <div class="operate">
                  <div class="item">
                    <p class="icon">
                      <i class="el-icon-edit" />
                    </p>
                    <p class="text">
                      编辑标签
                    </p>
                  </div>
                  <div class="item">
                    <p class="icon">
                      <i class="el-icon-download" />
                    </p>
                    <p class="text">
                      课程下线
                    </p>
                  </div>
                  <div class="item">
                    <p class="icon">
                      <i class="el-icon-delete" />
                    </p>
                    <p class="text">
                      课程删除
                    </p>
                  </div>
                </div>
                <div class="statistics">
                  <span>课时：{{ item.minutes }}分钟</span>
                  <span>学分：{{ item.credit }}</span>
                </div>
              </div>
              <span v-if="item.status === '0'" class="status-block bg-gray">下线</span>
              <span v-else-if="item.status === '2'" class="status-block bg-blue">草稿</span>
              <span v-else />
              <img :src="item.cover" class="image">
            </div>
            <div class="text-area">
              <span class="title">{{ item.name }}</span>
              <div class="bottom clearFix">
                <span class="up-num"><i class="el-icon-user" /> 158</span>
                <span class="teacher">{{ item.teacher_info.name }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30, 40, 50]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
  </el-main>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
import { getCourseList } from '@/request/api'
export default {
  data () {
    return {
      keyword: '',
      filterForm: {
        from: '全部',
        status: '全部',
        series: '全部',
        level: [],
        department: [],
        custom: []
      },
      tags: {
        from: ['全部', '外部', '内部'],
        status: ['全部', '状态1', '状态2', '状态3'],
        series: ['全部', '系列1', '系列2', '系列3'],
        level: ['层级1', '层级2', '层级3'],
        department: ['职能1', '职能2', '职能3'],
        custom: ['职能1', '职能2', '职能3']
      },
      courseList: [],
      currentPage: 1,
      pageSize: 20,
      total: 0
    }
  },
  computed: {
    getCourseListParam: function () {
      let tags = this.filterForm.level.concat(this.filterForm.department, this.filterForm.custom)
      tags.push(this.filterForm.from, this.filterForm.series, this.filterForm.status)
      return {
        keyword: this.keyword,
        tag_id: tags,
        offset: this.currentPage,
        limit: this.pageSize
      }
    }
  },
  watch: {
    filterForm: {
      handler (newVal, oldVal) {
        this.getCourseList()
      },
      deep: true
    }
  },
  mounted: function () {
    this.getCourseList()
  },
  methods: {
    getCourseList () {
      let param = this.getCourseListParam
      console.log(param)
      getCourseList(param).then(res => {
        this.courseList = res.data.list
        this.total = res.data.total
      }, error => {
        error && this.$message.error(error.message)
      })
    },
    handleSearch () {
      this.getCourseList()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getCourseList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getCourseList()
    },
    gotoCreate () {
      this.$router.push({ path: '/enterpriseCourseLibrary/create' })
    }
  }
}
</script>
