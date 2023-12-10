<template>
  <div class="popup1">
    <a-list size="small" bordered>
      <a-list-item v-for="(item, index) in menu" :key="item.label + index" @click="onChange(item, index)">
        {{ item.label }}
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  name: 'my-popup',
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: ['基本信息', '添加排口', '添加视频监测点', '添加工艺']
    }
  },
  methods: {
    onChange(item) {
      this.$emit('onChange', item)
    }
  }
}
</script>

<style>
.popup1 {
  /* position: relative; */
  /* width: 100px; */
  /* height: 150px; */
  cursor: pointer;
  border-radius: 2px;
  /* border: 1px solid #cfcece; */
  background: #fff;
}

/* .popup1::before {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  left: -10px;
  border-top: 10px solid transparent;
  border-right: 10px solid #fff;
  border-bottom: 10px solid transparent;
} */
</style>
