<template>
  <header class="header">
    <div class="main">
      <div class="pull-left">
        <router-link class="home-link" to="/">
          <svg-icon icon-class="github" />
        </router-link>
        <div class="search">
          <input
            v-model="keyword"
            type="text"
            placeholder="Search or jump to..."
            @focus="showSearch = true"
            @blur="searchBlur"
          />
          <svg-icon v-show="!showSearch" icon-class="slash" />
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
      <ul v-show="searchPost.length && showSearch" class="search-result">
        <li v-for="item in searchPost" :key="item.id">
          <router-link :to="{ name: 'post', params: { number: item.number } }">
            <div class="title">
              <svg-icon icon-class="repo" />
              <span>{{ item.title }}</span>
            </div>
            <span class="jump">Jump to ↵</span>
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      links: this.$config.links,
      personal: this.$config.personal,
      keyword: '',
      loading: false,
      showSearch: false
    }
  },
  computed: {
    ...mapGetters(['searchPost'])
  },
  watch: {
    keyword(val) {
      this.handleSearchPost(val)
    }
  },
  methods: {
    async handleSearchPost(keyword) {
      if (this.loading || !keyword) return
      this.loading = true
      // 2s 后解除 loading
      this.timer = setTimeout(() => {
        this.loading = false
      }, 2000)
      await this.$store.dispatch('searchPost', { keyword })
    },
    searchBlur() {
      setTimeout(() => {
        this.showSearch = false
      }, 100)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  font-size: 14px;
  background-color: #24292e;
  .search-result {
    position: absolute;
    top: 46px;
    width: 300px;
    transform: translateX(48px);
    background-color: #fff;
    border: 1px solid #e1e4e8;
    border-radius: 0 0 2px 2px;
    transition: all 0.2s ease-in-out;
    li {
      cursor: pointer;
      padding: 0 10px;
      color: #1b1f23;
      height: 46px;
      line-height: 46px;
      border-bottom: 1px solid #e1e4e8;
      transition: all 0.2s ease-in-out;
      &:last-child {
        border-block-end: none;
      }
      &:hover {
        color: #fff;
        background-color: #0366d6;
        a,
        svg {
          color: #fff;
        }
      }
      svg {
        margin-right: 10px;
        font-size: 16px;
        color: #666;
        transform: translateY(1px);
      }
      a {
        color: #1b1f23;
        text-decoration: none;
        display: inline-block;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:hover {
          .jump {
            display: block;
          }
        }
        .title {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 200px;
          span {
            height: 46px;
            line-height: 46px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
        .jump {
          display: none;
          padding: 0 4px;
          font-size: 12px;
          color: #6a737d;
          line-height: 22px;
          border: 1px solid #e1e4e8;
          border-radius: 3px;
          background-color: #f6f8fa;
        }
      }
    }
  }
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 0 16px;
    max-width: 1012px;
    height: 64px;
    line-height: 64px;
    color: #fff;
    .pull-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .home-link {
        margin-right: 16px;
        font-size: 32px;
        color: #fff;
        transform: translateY(-2px);
      }

      .search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        margin-right: 16px;
        width: 300px;
        border-radius: 3px;
        overflow: hidden;
        background-color: hsla(0, 0%, 100%, 0.125);

        input {
          flex: 1;
          padding: 0 34px 0 8px;
          line-height: 28px;
          color: #fff;
          border: none;
          outline: none;
          background-color: transparent;
          &:focus {
            line-height: 32px;
            color: #24292e;
            background-color: rgb(250, 251, 252);
          }
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
