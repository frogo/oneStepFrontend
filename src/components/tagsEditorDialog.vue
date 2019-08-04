<template>
  <el-dialog
    :visible.sync="dialogTagsEditorVisible"
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
    dialogTagsEditorVisible: Boolean
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
  methods: {
    handleTagClose (tags, tag) {
      let tagList = this.tags[tags]['list']
      tagList.splice(tagList.indexOf(tag), 1)
    },
    handleTagClick (tags, tag) {
      let tagList = this.tags[tags]['list']
      let selected = this.tags[tags].selected

      selected.map(item => {
        if (item.name === tag) {
          alert('')
        } else {
          selected.push(tag)
          tagList.map(item => {
            if (item.name === tag.name) {
              item.active = true
            }
            return item
          })
        }
      })
      console.log(tagList)
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
        this.tags[type].list.push({ name: inputValue, parent_id: '', id: '' })
      }
      this.tags[type].inputVisible = false
      this.tags[type].inputValue = ''
    },
    handleDialogCancel () {
      this.$emit('closeDialog')
    },
    handleDialogConfirm () {
      this.$emit('closeDialog')
    }
  }
}
</script>
