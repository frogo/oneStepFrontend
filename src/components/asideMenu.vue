<template>
  <el-aside width="180px">
    <dl>
      <template v-for="item in menu">
        <dt>{{ item.name }}</dt>
        <dd v-for="c_item in item.children">
          <i :class="c_item.icon" />
          <router-link :to="c_item.link" class="menu-link">
            {{ c_item.name }}
          </router-link>
        </dd>
      </template>
    </dl>
  </el-aside>
</template>

<script>
export default {
  name: 'AsideMenu',
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menu: [
        {
          name: '培训项目',
          children: [
            { name: '在线培训项目', link: '/project', icon: 'el-icon-monitor' }
          ]
        },
        {
          name: '考试管理',
          children: [
            { name: '题库管理', link: '/questionLib', icon: 'el-icon-edit-outline' },
            { name: '试卷管理', link: '/paper', icon: 'el-icon-document' }
          ]
        },
        {
          name: '数据统计',
          children: [
            { name: '培训统计', link: '/trainStatistics', icon: 'el-icon-s-data' },
            { name: '课程排行', link: '/courseRanking', icon: 'el-icon-full-screen' }
          ]
        },
        {
          name: '人员管理',
          children: [
            { name: '特殊学员', link: '/specialStudent', icon: 'el-icon-coordinate' }
          ]
        }
      ]
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
