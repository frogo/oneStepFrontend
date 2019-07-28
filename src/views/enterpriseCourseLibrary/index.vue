<template lang="html">
  <el-main class="page-course">
    <div class="filter-box">
      <el-button type="primary" class="add-button">
        创建课程
      </el-button>
      <div class="keyword-input">
        <el-input
          v-model="keyword"
          placeholder="请输入内容"
          size="medium "
        >
          <i slot="suffix" class="el-input__icon el-icon-search" />
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
      },
      courseList: [],
      getCourseListParam: {
        keyword: '',
        tag_id: [],
        offset: 0,
        limit: 10
      }
    }
  },
  computed: {
    // getCourseListParam:function () {
    //
    // }
  },
  watch: {
    filterForm: {
      handler (newVal, oldVal) {
        this.getCourseListParam.keyword = newVal.keyword
        this.getCourseListParam.tag_id = newVal.level.concat(newVal.department, newVal.custom).push(newVal.from, newVal.status, newVal.series)
        console.log(newVal)
        this.getCourseList(this.getCourseListParam)
      },
      deep: true
    }
  },
  mounted: function () {
    this.getCourseList(this.getCourseListParam)
  },
  methods: {
    getCourseList () {
      getCourseList().then(res => {
        this.courseList = res.data.list
      }, error => {
        error && this.$message.error(error)
      })
    }
    // handleSearch (){
    //
    // }
  }
}
</script>
