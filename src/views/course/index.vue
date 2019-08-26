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
            <el-radio :label="0" border>
              全部
            </el-radio>
            <el-radio :label="item.value" v-for="(item, index) in tags.source" :key="item.name + index" border>
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio-group v-model="filterForm.status">
            <el-radio :label="0" border>
              全部
            </el-radio>
            <el-radio :label="item.value" v-for="(item, index) in tags.status" :key="item.name + index" border>
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!--        <el-form-item label="系列：">-->
        <!--          <el-radio-group v-model="filterForm.series">-->
        <!--            <el-radio :label="item" v-for="item in tags.series" :key="item" border />-->
        <!--          </el-radio-group>-->
        <!--        </el-form-item>-->

        <el-form-item label="层级：">
          <el-checkbox-group v-model="filterForm.level">
            <el-checkbox-button :label="item.id" v-for="(item, index) in tags.level" :key="item + index">
              {{ item.name }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="职能：">
          <el-checkbox-group v-model="filterForm.department">
            <el-checkbox-button :label="item.id" v-for="(item, index) in tags.department" :key="item + index">
              {{ item.name }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="自定：">
          <el-checkbox-group v-model="filterForm.custom">
            <el-checkbox-button :label="item.id" v-for="(item, index) in tags.custom" :key="item + index">
              {{ item.name }}
            </el-checkbox-button>
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
                  <div @click="handleTagsEdit(item)" class="item">
                    <p class="icon">
                      <i class="el-icon-edit" />
                    </p>
                    <p class="text">
                      编辑标签
                    </p>
                  </div>
                  <div @click="handleCourseOffline(item)" class="item">
                    <p class="icon">
                      <i :class="item.status === 0 ? 'el-icon-upload2' : 'el-icon-download'" />
                    </p>
                    <p class="text">
                      课程{{ item.status === 0 ? '上线' : '下线' }}
                    </p>
                  </div>
                  <div @click="handleCourseDelete(item)" class="item">
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
              <span v-if="item.status === 0 " class="status-block bg-gray">下线</span>
              <span v-else-if="item.status === 2" class="status-block bg-blue">草稿</span>
              <span v-else />
              <img :src="item.cover" class="image">
            </div>
            <div @click="gotoDetail(item.id)" class="text-area">
              <span class="title">{{ item.name }} {{ item.id }}</span>
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
import { getCourseList, deleteCourse, courseOnlineOrOffline, getTagList } from '@/request/api'
export default {
  data () {
    return {
      keyword: '',
      filterForm: {
        from: 0,
        status: 0,
        series: 0,
        level: [],
        department: [],
        custom: []
      },
      tags: {
        source: [],
        status: [],
        series: [],
        level: [],
        department: [],
        custom: []
      },
      tagList: '', // 远程获取过滤标签列表
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
    getTagList().then(res => {
      this.tags.source = res.data.source
      this.tags.status = res.data.status
      this.tags.series = res.data.series
      this.tags.level = res.data.tag[0].child
      this.tags.department = res.data.tag[1].child
      this.tags.custom = res.data.tag[2].child
    })
  },
  methods: {
    getCourseList () {
      let param = this.getCourseListParam
      // eslint-disable-next-line no-console
      console.log(param)
      getCourseList(param).then(res => {
        this.courseList = res.data.list
        this.total = res.data.total
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
      this.$router.push({ path: '/course/create' })
    },
    gotoDetail (lessonId) {
      this.$router.push({ path: '/course/details', query: { id: lessonId } })
    },
    handleCourseOffline (item) { // 课程下线上线
      let isOffline = 0
      let tipTxt = '下线'
      if (item.status === 2) {
        this.$message.error('该课程处于未完成状态！')
        return false
      } else if (item.status === 0) {
        isOffline = 1
        tipTxt = '上线'
      } else {
        isOffline = 0
        tipTxt = '下线'
      }
      this.$confirm('您确定要' + tipTxt + '该课程吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        courseOnlineOrOffline({ id: item.id, online: isOffline }).then(res => {
          this.$message.success(res.message)
          this.getCourseList()
        })
      })
    },
    handleCourseDelete (item) { // 课程删除
      this.$confirm('您确定要删除该课程吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteCourse({ id: item.id }).then(res => {
          this.$message.success(res.message)
          this.getCourseList()
        })
      })
    },
    handleTagsEdit () { // 标签编辑

    }
  }
}
</script>
