<template>
  <el-aside width="160px">
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
          name: '项目培训',
          children: [
            { name: '在线项目培训', link: '/projectManagement', icon: 'el-icon-monitor' }
          ]
        },
        {
          name: '考试管理',
          children: [
            { name: '题库管理', link: '/', icon: 'el-icon-edit-outline' },
            { name: '试卷管理', link: '/', icon: 'el-icon-document' }
          ]
        },
        {
          name: '数据统计',
          children: [
            { name: '培训统计', link: '/', icon: 'el-icon-s-data' },
            { name: '课程排行', link: '/', icon: 'el-icon-full-screen' }
          ]
        },
        {
          name: '人员管理',
          children: [
            { name: '特殊学员', link: '/', icon: 'el-icon-coordinate' }
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
