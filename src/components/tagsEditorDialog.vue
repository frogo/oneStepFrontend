<template>
  <el-dialog
    :visible.sync="dialogTagsEditorVisible"
    :before-close="handleDialogClose"
    :title="editMode? '编辑标签' : '选择标签'"
    width="60%"
    custom-class="tagsEditor"
  >
    <div v-for="(item, index) in tags" :key="item.id + index" class="tags-box">
      <span>{{ item.name }}:</span>
      <el-tag
        :key="tag.name"
        v-for="tag in item.child"
        :disable-transitions="false"
        @click="editMode ? '' : handleTagClick(tag)"
        @close="editMode ? handleTagClose(tag) : ''"
        :effect="tag.active ? 'dark' : 'plain'"
        :closable="editMode ? true : false"
      >
        {{ tag.name }}
      </el-tag>
      <span v-if="editMode">
        <el-input
          :ref="`saveTagInput_${index}`"
          v-if="item.inputVisible"
          v-model="item.inputValue"
          @keyup.enter.native="handleInputConfirm(index, item.id)"
          @blur="handleInputConfirm(index, item.id)"
          class="input-new-tag"
          size="small"
        />
        <el-button v-else @click="showInput(item, index)" class="button-new-tag" size="small">
          + 新增
        </el-button>
      </span>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleDialogCancel">取消</el-button>
      <el-button @click="handleDialogConfirm" type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getTagList, deleteTag, addTag } from '@/request/api'
export default {
  name: 'TagsEditorDialog',
  props: {
    dialogTagsEditorVisible: {
      type: Boolean,
      default: false
    },
    editMode: {
      type: Boolean,
      default: false
    },
    getSelectedTags: {
      type: Function,
      default: () => {
        // eslint-disable-next-line no-console
        console.log('获取已选择标签')
      }
    },
    tagsSelectedFromParent: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tags: [],
      tagsSelected: []
      // selectedTagsFromParent: []
    }
  },
  watch: {
    editMode (val) {
      // if (val) {
      //   this.selectedTagsFromParent = []
      //   console.log(this.selectedTags)
    }
    //   if (val) {
    //     this.selectedTagsFromParent = []
    //     console.log(this.selectedTags)
    //   } else {
    //     console.log(this.selectedTags)
    //     this.selectedTagsFromParent = this.selectedTags
    //   }
    //   this.getRemoteTags()
    // }
  },
  mounted () {
    // this.selectedTagsFromParent = this.tagsSelected
    this.getRemoteTags()
  },
  methods: {
    getRemoteTags () {
      // this.tagsSelected = []
      getTagList().then(res => {
        this.tags = res.data.tag.map(item => { // 拿到远程数据，改造成view需要的数据
          item.inputVisible = false
          item.inputValue = ''
          item.selected = []
          let _this = this
          item.child.map(tag => {
            if (_this.tagsSelectedFromParent.length > 0 && _this.tagsSelectedFromParent.indexOf(tag.id) > -1) {
              tag.active = true
              this.tagsSelected.push(tag)
            } else {
              tag.active = false
            }
            // if (this.tagsSelected.length > 0 && this.getTagIndex(this.tagsSelected, tag) > -1) {
            //   tag.active = true
            //   // this.tagsSelected.push(tag)
            // } else {
            //   tag.active = false
            // }
            return tag
          })
          return item
        })
      })
    },
    handleTagClose (tag) {
      if (tag.active) {
        this.$message.error('该标签已被选择，无法删除！')
        return false
      }
      deleteTag({ id: tag.id }).then(res => {
        this.$message.success(res.message)
        this.getRemoteTags()
      })
    },
    getTagIndex (tags, tag) { // 获取index
      let tagIndex = -1
      tags.map((item, index, array) => {
        if (item.id === tag.id) {
          tagIndex = index
        }
      })
      return tagIndex
    },
    handleTagClick (tag) {
      let index = this.getTagIndex(this.tagsSelected, tag)
      if (index > -1) {
        this.tagsSelected.splice(index, 1)
        tag.active = false
      } else {
        this.tagsSelected.push(tag)
        tag.active = true
      }
    },
    showInput (item, index) {
      item.inputVisible = true
      this.$nextTick(_ => {
        this.$refs['saveTagInput_' + index][0].$refs.input.focus()
      })
    },

    handleInputConfirm (index, pid) {
      let inputValue = this.tags[index].inputValue.replace(/ /g, '')
      if (inputValue) {
        addTag({ parent_id: pid, name: inputValue }).then(res => {
          this.$message.success(res.message)
          this.getRemoteTags()
        })
        // this.tags[index].child.push({ name: inputValue, parent_id: pid, id: '', active: false })
      }
      this.tags[index].inputVisible = false
      this.tags[index].inputValue = ''
    },
    handleDialogCancel () {
      this.$emit('closeDialog')
    },
    handleDialogConfirm () {
      this.$emit('closeDialog')
      this.$emit('getSelectedTags', this.tagsSelected)
    },
    handleDialogClose () {
      this.$emit('closeDialog')
    }
  }
}
</script>
