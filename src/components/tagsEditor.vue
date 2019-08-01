<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    title="编辑标签"
    width="30%"
  >
    <div>
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        :disable-transitions="false"
        @close="handleClose(tag)"
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
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button @click="dialogVisible = false" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'TagsEditor',
  data () {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
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
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
