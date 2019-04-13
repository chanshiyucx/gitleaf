<template>
  <footer class="footer">
    <div class="wrapper">
      <ul>
        <li>© 2019 Chanshiyu.</li>
        <li v-for="item in $config.personal.footer" :key="item.name">
          <a :href="item.link">{{ item.name }}</a>
        </li>
      </ul>
      <a href="#">
        <svg-icon class="icon-github" icon-class="github" />
      </a>
      <div>
        Theme
        <a class="theme" href="https://github.com/chanshiyucx/gitlife">Gitlife</a> by
        <a class="author" href="https://chanshiyu.com">Chanshiyu</a>
        <span>❤</span> Powered by Github
      </div>
    </div>
  </footer>
</template>

<style lang="less" scoped>
.footer {
  margin: 0 auto;
  padding: 0 16px;
  max-width: 1012px;
  font-size: 12px;
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    padding-top: 40px;
    padding-bottom: 48px;
    border-top: 1px solid #e1e4e8;
    a {
      color: #0366d6;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        margin-right: 16px;
      }
    }
    svg {
      font-size: 24px;
      color: #c6cbd1;
    }
  }
  .theme,
  .author {
    margin: 0 4px;
  }
}
</style>
