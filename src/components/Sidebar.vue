<template>
  <div id="sidebar">
    <div class="user-wrapper">
      <img class="avatar" :src="personal.avatar" alt />
      <div class="status">
        <div class="status-icon">
          <img src="@/assets/img/octocat.png" alt />
        </div>
        <div class="status-message">Focusing</div>
      </div>
    </div>
    <div class="profile-wrapper">
      <h1>
        <span class="username">{{ personal.username }}</span>
        <span class="nickname">{{ personal.nickname }}</span>
      </h1>
      <p>{{ personal.description }}</p>
    </div>
    <ul class="details-wrapper">
      <li>
        <svg-icon icon-class="location" />
        {{ personal.location }}
      </li>
      <li>
        <svg-icon icon-class="email" />
        <a class="u-email" :href="`mailto:${personal.email}`">{{ personal.email }}</a>
      </li>
      <li>
        <svg-icon icon-class="link" />
        <a rel="nofollow me" :href="personal.site">{{ personal.site }}</a>
      </li>
    </ul>
    <div class="social-wrapper">
      <h3>Social Media</h3>
      <ul>
        <li v-for="(item, i) in personal.social" :key="i">
          <a :key="i" :href="item.link" target="_blank">
            <img alt :src="item.icon" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      personal: this.$config.personal
    }
  }
}
</script>

<style lang="less" scoped>
#sidebar {
  padding-right: 16px;
  .user-wrapper {
    border: 1px solid #e1e4e8;
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
    .avatar {
      display: inline-block;
      width: 227px;
      height: 229px;
    }
    .status {
      position: relative;
      width: 227px;
      height: 46px;
      .status-icon {
        position: absolute;
        left: 14px;
        top: -20px;
        width: 28px;
        height: 28px;
        text-align: center;
        border-radius: 50%;
        background-color: #fff;
        img {
          margin-top: 5px;
          width: 18px;
          height: 18px;
        }
      }
      .status-message {
        padding-top: 18px;
        padding-left: 12px;
        font-size: 12px;
        color: #24292e;
      }
    }
  }
  .profile-wrapper {
    h1 {
      padding: 16px 0;
      font-size: 32px;
      font-weight: 600;
      span {
        display: block;
      }
      .username {
        font-size: 26px;
        line-height: 30px;
      }
      .nickname {
        color: #666;
        font-size: 20px;
        font-style: normal;
        font-weight: 300;
        line-height: 24px;
      }
    }
    p {
      color: #24292e;
      font-size: 14px;
    }
  }
  .details-wrapper {
    margin-top: 16px;
    padding-bottom: 16px;
    font-size: 14px;
    border-bottom: 1px solid #e1e4e8;
    li {
      position: relative;
      padding-left: 22px;
      padding-top: 6px;
    }
    svg {
      position: absolute;
      left: 0;
      top: 9px;
      width: 16px;
      height: 16px;
      color: #6a737d;
    }
    a {
      color: #0366d6;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .social-wrapper {
    margin-top: 16px;
    h3 {
      padding-bottom: 10px;
      font-size: 16px;
      font-weight: 600;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      li {
        margin-right: 5px;
        margin-bottom: 10px;
        text-align: center;
        border-radius: 3px;
        background: #f0f0f0;
        a {
          display: inline-block;
          width: 35px;
          height: 35px;
          line-height: 35px;
          img {
            display: inline-block;
            margin-top: 7px;
            width: 22px;
            height: 22px;
          }
        }
      }
    }
  }
}
</style>
