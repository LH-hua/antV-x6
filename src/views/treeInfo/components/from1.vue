<template>
  <div>
    <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="工艺名称">
        <a-input v-model="from1.name"></a-input>
      </a-form-model-item>
    </a-form-model>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        确定
      </a-button>
      <a-button style="margin-left: 10px;" @click="cancel">
        取消
      </a-button>
    </a-form-model-item>
  </div>
</template>

<script>
export default {
  name: 'my-from',
  props: {
    from: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      from1: { ...this.from }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.from1)
    },
    cancel() {
      this.$emit('cancel', false)
    }
  }
}
</script>

<style></style>
