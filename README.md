# Gitleaf - A github style blog theme

[![Author](https://img.shields.io/badge/author-chanshiyucx-blue.svg?style=flat-square)](https://chanshiyu.com) [![QQ](https://img.shields.io/badge/QQ-1124590931-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes) [![Email](https://img.shields.io/badge/Emali%20me-me@chanshiyu.com-green.svg?style=flat-square)](me@chanshiyu.com)

![蝉時雨](https://i.loli.net/2019/04/14/5cb2a383d0915.png)

Gitleaf 是一个 Github Style 的单页面博客应用程序，后台数据源依托于 [Github Issues](https://developer.github.com/v3/issues/)，使用开源项目 [Gitalk](https://github.com/gitalk/gitalk) 作为博客评论系统。该主题基于 Github 全家桶，脱离服务器与数据库，关注内容本身，操作简单，免费食用。

技术栈：Github Api + Github Pages + Github Style + Gitalk

在线演示：[蝉時雨](https://chanshiyu.com/treasure/gitleaf)

## Getting Started

主题食用参考主题 Aurora，两者配置文件基本一致，**需要注意的是 Leancloud 需要新建一个表 Star 用于存放文章 star**：[食用指南](https://github.com/chanshiyucx/blog/issues/41)

### Installing

```bash
git@github.com:chanshiyucx/gitleaf.git
cd gitleaf
npm install # or yarn
```

### Configuration

修改目录 `src/config.js` 的配置文件，每个配置项都有详细说明。**注意修改 vue.config.js 的 publicPath**。

页面模板参考： [文章、关于、标签、分类、书单等模板](https://github.com/chanshiyucx/Blog/issues)，第一次食用可以直接 Fork 预览效果。

### Preview

```bash
npm start
```

浏览器打开 `http://localhost:8000` 便可访问新的博客！

### Deployment

```bash
npm run build
```

打包完毕，将 `dist` 目录下生成的静态文件发布 `Github Pages` 或 `Coding Pages` 即可。

Just enjoy it ฅ●ω●ฅ

## Timeline

- 2019/03/08 新增 Valine 匿名评论功能

## License

This project is licensed under the MIT License.
