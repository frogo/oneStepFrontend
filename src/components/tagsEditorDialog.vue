<template>
  <el-dialog
    :visible.sync="dialogTagsEditorVisible"
    :before-close="handleDialogClose"
    title="编辑标签"
    width="60%"
    custom-class="tagsEditor"
  >
    <div class="tags-box level">
      <span>层级:</span>
      <el-tag
        :key="tag.name"
        v-for="tag in tags.level.list"
        :disable-transitions="false"
        @click="handleTagClick('level', tag)"
        @close="handleTagClose('level', tag)"
        :effect="tag.active ? 'dark' : 'plain'"
        closable
      >
        {{ tag.name }}
      </el-tag>
      <el-input
        ref="level_saveTagInput"
        v-if="tags.level.inputVisible"
        v-model="tags.level.inputValue"
        @keyup.enter.native="handleInputConfirm('level')"
        @blur="handleInputConfirm('level')"
        class="input-new-tag"
        size="small"
      />
      <el-button v-else @click="showInput('level')" class="button-new-tag" size="small">
        + New Tag
      </el-button>
    </div>
    <div class="tags-box function">
      <span>职能:</span>
      <el-tag
        :key="tag.name"
        v-for="tag in tags.function.list"
        :disable-transitions="false"
        @click="handleTagClick('function', tag)"
        @close="handleTagClose('function', tag)"
        :effect="tag.active ? 'dark' : 'plain'"
        closable
      >
        {{ tag.name }}
      </el-tag>
      <el-input
        ref="function_saveTagInput"
        v-if="tags.function.inputVisible"
        v-model="tags.function.inputValue"
        @keyup.enter.native="handleInputConfirm('function')"
        @blur="handleInputConfirm('function')"
        class="input-new-tag"
        size="small"
      />
      <el-button v-else @click="showInput('function')" class="button-new-tag" size="small">
        + New Tag
      </el-button>
    </div>
    <div class="tags-box custom">
      <span>自定:</span>
      <el-tag
        :key="tag.name"
        v-for="tag in tags.custom.list"
        :disable-transitions="false"
        @click="handleTagClick('custom', tag)"
        @close="handleTagClose('custom', tag)"
        :effect="tag.active ? 'dark' : 'plain'"
        closable
      >
        {{ tag.name }}
      </el-tag>
      <el-input
        ref="custom_saveTagInput"
        v-if="tags.custom.inputVisible"
        v-model="tags.custom.inputValue"
        @keyup.enter.native="handleInputConfirm('custom')"
        @blur="handleInputConfirm('custom')"
        class="input-new-tag"
        size="small"
      />
      <el-button v-else @click="showInput('custom')" class="button-new-tag" size="small">
        + New Tag
      </el-button>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleDialogCancel">取 消</el-button>
      <el-button @click="handleDialogConfirm" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'TagsEditorDialog',
  props: {
    dialogTagsEditorVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tags: {
        level: {
          list: [
            {
              name: '标签一',
              id: '',
              active: false
            }
          ],
          selected: [],
          inputVisible: false,
          inputValue: ''
        },
        function: {
          list: [
            {
              name: '标签一',
              id: '',
              active: false
            }
          ],
          selected: [],
          inputVisible: false,
          inputValue: ''
        },
        custom: {
          list: [
            {
              name: '标签一',
              id: '',
              active: false
            }
          ],
          selected: [],
          inputVisible: false,
          inputValue: ''
        }
      }
    }
  },
  mounted () {

  },
  methods: {
    handleTagClose (type, tag) {
      let tagList = this.tags[type]['list']
      let selected = this.tags[type].selected
      if (this.getTagIndex(tagList, tag) !== -1) {
        tagList.splice(this.getTagIndex(tagList, tag), 1)
      }
      if (this.getTagIndex(selected, tag) !== -1) {
        selected.splice(this.getTagIndex(selected, tag), 1)
      }
    },
    getTagIndex (tags, tag) { // 获取index
      let tagIndex = -1
      tags.map((item, index, array) => {
        if (item.name === tag.name) {
          tagIndex = index
        }
      })
      return tagIndex
    },
    handleTagClick (type, tag) {
      let tagList = this.tags[type]['list']
      let selected = this.tags[type]['selected']
      if (selected.length > 0) {
        if (this.getTagIndex(selected, tag) === -1) {
          selected.push(tag)
          tagList[this.getTagIndex(tagList, tag)].active = true
        } else {
          selected.splice(this.getTagIndex(selected, tag), 1)
          tagList[this.getTagIndex(tagList, tag)].active = false
        }
      } else {
        selected.push(tag)
        tagList[this.getTagIndex(tagList, tag)].active = true
      }
    },
    showInput (type) {
      this.tags[type].inputVisible = true
      this.$nextTick(_ => {
        this.$refs[type + '_saveTagInput'].$refs.input.focus()
      })
    },

    handleInputConfirm (type) {
      let inputValue = this.tags[type].inputValue
      if (inputValue) {
        this.tags[type].list.push({ name: inputValue, parent_id: '', id: '', active: false })
      }
      this.tags[type].inputVisible = false
      this.tags[type].inputValue = ''
    },
    handleDialogCancel () {
      this.$emit('closeDialog')
    },
    handleDialogConfirm () {
      this.$emit('closeDialog')
    },
    handleDialogClose () {
      this.$emit('closeDialog')
    }
  }
}
</script>
