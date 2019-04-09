<template>
  <footer class="footer">
    <div class="wrapper">
      <ul>
        <li>© 2019 Chanshiyu.</li>
        <li><a href="#">Home</a></li>
        <li><a href="">Github</a></li>
        <li><a href="">Zhihu</a></li>
      </ul>
      <a href="#"><svg-icon class="icon-github" icon-class="github"/></a>
      <div>Theme Gitlife by Chanshiyu <span>❤</span> Powered by Github</div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'Footer'
}
</script>

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
}
</style>
