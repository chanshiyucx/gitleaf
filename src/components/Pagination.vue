<template>
  <div class="pagination">
    <div class="btn-group">
      <span :class="isDisabledPrev && 'disabled'" @click="handleClick('prev')">Previous</span>
      <span :class="isDisabledNext && 'disabled'" @click="handleClick('next')">Next</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['isDisabledPrev', 'isDisabledNext'],
  methods: {
    handleClick(type) {
      this.$emit('handleClick', type)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  margin-bottom: 15px;
  margin-top: 20px;
  text-align: center;
  .btn-group {
    span {
      cursor: pointer;
      display: inline-block;
      padding: 6px 12px;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      user-select: none;
      vertical-align: middle;
      color: #0366d6;
      background-color: #fff;
      border: 1px solid rgba(27, 31, 35, 0.2);
      &:hover {
        background-color: #0366d6;
        border-color: #0366d6;
        color: #fff;
      }
      &:first-child {
        border-bottom-left-radius: 3px;
        border-right-width: 0;
        border-top-left-radius: 3px;
      }
      &:last-child {
        border-bottom-right-radius: 3px;
        border-right-width: 1px;
        border-top-right-radius: 3px;
      }
      &.disabled {
        background-color: #fff;
        border-color: rgba(27, 31, 35, 0.15);
        box-shadow: none;
        color: rgba(27, 31, 35, 0.3);
      }
    }
  }
}
</style>
