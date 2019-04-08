<template>
  <header class="Header">
    <div class="main">
      <div class="pull-left">
        <svg-icon class="icon-github" icon-class="github" />
        <div class="search">
          <input type="text" placeholder="Search or jump to..." />
          <svg-icon icon-class="slash" />
        </div>
        <div class="nav">
          <router-link to="archives">Archives</router-link>
          <router-link to="categories">Categories</router-link>
          <router-link to="tags">Tags</router-link>
        </div>
      </div>
      <div class="pull-right"></div>
    </div>
  </header>
</template>

<style lang="less" scoped>
.Header {
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
          color: #fff;
          margin-right: 16px;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
