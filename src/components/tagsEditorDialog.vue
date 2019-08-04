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
        :key="tag"
        v-for="tag in levelTags"
        :disable-transitions="false"
        @click="handleTagClick(levelTags, tag)"
        @close="handleTagClose(levelTags, tag)"
        effect="plain"
        closable
      >
        {{ tag }}
      </el-tag>
      <el-input
        ref="saveTagInput"
        v-if="inputVisible"
        v-model="inputValue"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
        class="input-new-tag"
        size="small"
      />
      <el-button v-else @click="showInput" class="button-new-tag" size="small">
        + New Tag
      </el-button>
    </div>
    <div class="tags-box function">
      <span>职能:</span>
      <el-tag
        :key="tag"
        v-for="tag in functionTags"
        :disable-transitions="false"
        @click="handleTagClick(tag)"
        @close="handleTagClose(tag)"
        effect="plain"
        closable
      >
        {{ tag }}
      </el-tag>
      <el-input
        ref="saveTagInput"
        v-if="inputVisible"
        v-model="inputValue"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
        class="input-new-tag"
        size="small"
      />
      <el-button v-else @click="showInput" class="button-new-tag" size="small">
        + New Tag
      </el-button>
    </div>
    <div class="tags-box custom">
      <span>自定:</span>
      <el-tag
        :key="tag"
        v-for="(tag) in customTags"
        :disable-transitions="false"
        @click="handleTagClick(tag)"
        @close="handleTagClose(tag)"
        effect="plain"
        closable
      >
        {{ tag }}
      </el-tag>
      <el-input
        ref="saveTagInput"
        v-if="inputVisible"
        v-model="inputValue"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
        class="input-new-tag"
        size="small"
      />
      <el-button v-else @click="showInput" class="button-new-tag" size="small">
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
      levelTags: ['标签一', '标签二', '标签三'],
      functionTags: ['标签一', '标签二', '标签三'],
      customTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleTagClose (tags, tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    handleTagClick (tags, tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        // this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
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
