<template>
  <header class="header">
    <div class="main">
      <div class="pull-left">
        <svg-icon class="icon-github" icon-class="github" />
        <div class="search">
          <input type="text" placeholder="Search or jump to..." />
          <svg-icon icon-class="slash" />
        </div>
        <nav class="nav">
          <a v-for="item in links" :key="item.name" :href="item.url" target="_blank">{{ item.name }}</a>
        </nav>
      </div>
      <div class="pull-right">
        <div class="btn-group">
          <svg-icon class="icon-plus" icon-class="plus" />
          <span class="dropdown-caret"></span>
        </div>
        <div class="details">
          <img :src="personal.avatar" :alt="personal.username" />
          <span class="dropdown-caret"></span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      links: this.$config.links,
      personal: this.$config.personal
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  font-size: 14px;
  background-color: #24292e;
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 1012px;
    height: 64px;
    line-height: 64px;
    color: #fff;
    .pull-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .icon-github {
        margin-right: 16px;
        font-size: 32px;
      }

      .search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        margin-right: 16px;
        width: 300px;
        height: 28px;
        border-radius: 3px;
        background-color: hsla(0, 0%, 100%, 0.125);

        input {
          flex: 1;
          padding: 0 34px 0 8px;
          line-height: 28px;
          color: #fff;
          border: none;
          outline: none;
          background-color: transparent;
        }
        svg {
          position: absolute;
          right: 8px;
          font-size: 18px;
        }
      }
      .nav {
        a {
          margin-right: 16px;
          color: #fff;
          font-weight: 600;
          text-decoration: none;
        }
      }
    }
    .pull-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 24px;
      overflow: hidden;

      .btn-group {
        cursor: pointer;
        margin-right: 16px;
        color: #fff;
        &:hover {
          color: hsla(0, 0%, 100%, 0.7);
        }
        svg {
          margin-right: 2px;
          font-size: 17px;
          transform: translateY(1px);
        }
      }

      .details {
        img {
          margin-right: 4px;
          display: inline-block;
          border-radius: 3px;
          line-height: 1;
          width: 20px;
          height: 20px;
          overflow: hidden;
          vertical-align: middle;
        }
      }
      .dropdown-caret {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        vertical-align: middle;
        border-bottom: 0 solid transparent;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top-style: solid;
        border-top-width: 4px;
      }
    }
  }
}
</style>
