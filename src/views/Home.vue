<template>
  <div id="home">
    <h2>Recent post</h2>
    <ul>
      <li v-for="item in recentPost" :key="item.id">
        <div class="title">
          <svg-icon icon-class="repo" />
          <router-link :to="{ name: 'post', params: { number: item.number } }">{{ item.title }}</router-link>
        </div>
        <MarkDown :content="item.desc" />
        <div class="footer">
          <span>
            <svg-icon icon-class="calendar" />
            {{ item.created_at }}
          </span>
          <span>
            <svg-icon icon-class="inbox" />
            {{ item.milestone ? item.milestone.title : '未分类' }}
          </span>
          <span>
            <svg-icon icon-class="tag" />
            <span v-for="label in item.labels.slice(0, 2)" :key="label.id">{{ label.name }}</span>
          </span>
          <span>
            <svg-icon icon-class="eye" />
            {{ item.times || 1 }}℃
          </span>
        </div>
      </li>
    </ul>
    <div class="ghchart">
      <h2>Contributions in the last year</h2>
      <div class="graph">
        <img src="http://ghchart.rshah.org/chanshiyucx" alt="chanshiyucx's Github chart" />
        <div class="contrib-footer">
          <a href="#">Learn how we count contributions.</a>
          <div class="contrib-legend">
            <span>Less</span>
            <ul class="legend">
              <li class="legend-lable-1"></li>
              <li class="legend-lable-2"></li>
              <li class="legend-lable-3"></li>
              <li class="legend-lable-4"></li>
              <li class="legend-lable-5"></li>
            </ul>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MarkDown from '@/components/MarkDown'

export default {
  name: 'Home',
  components: {
    MarkDown
  },
  computed: {
    ...mapGetters(['recentPost'])
  }
}
</script>
<style lang="less" scoped>
#home {
  margin-top: 24px;
  h2 {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 400;
  }
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 24px;
    li {
      margin-bottom: 16px;
      padding: 16px;
      width: 359px;
      height: 110px;
      border: 1px solid #d1d5da;
      border-radius: 3px;
      font-size: 12px;
      color: #586069;
      .title {
        svg {
          margin-right: 8px;
          font-size: 16px;
          transform: translate(-2px, 2px);
        }
        a {
          font-size: 13px;
          color: #0366d6;
          letter-spacing: 0.4px;
          text-decoration: none;
        }
      }
      /deep/.markdown-body {
        margin: 12px 0 16px;
        overflow: hidden;
        font-size: 12px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .footer {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        svg {
          margin-right: 2px;
          font-size: 14px;
        }
        & > span {
          margin-right: 12px;
          span {
            margin-right: 6px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  .ghchart {
    .graph {
      padding: 12px 0 8px;
      border: 1px solid #d1d5da;
      border-radius: 3px;
      text-align: center;
      .contrib-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 16px 0;
        padding: 0 16px 4px;
        font-size: 12px;
        a {
          color: #0366d6;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
        .contrib-legend,
        .legend {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .legend {
          margin-bottom: 0;
          padding-left: 5px;
          li {
            margin: 0;
            padding: 0;
            margin-right: 5px;
            width: 10px;
            height: 10px;
            border-radius: 0;
            border: none;
          }
          .legend-lable-1 {
            background-color: #ebedf0;
          }
          .legend-lable-2 {
            background-color: #c6e48b;
          }
          .legend-lable-3 {
            background-color: #7bc96f;
          }
          .legend-lable-4 {
            background-color: #239a3b;
          }
          .legend-lable-5 {
            background-color: #196127;
          }
        }
      }
    }
  }

  @media (max-width: 1012px) {
    margin-top: 0;
    h2 {
      display: none;
    }
    ul {
      justify-content: center;
    }
    .ghchart {
      .graph {
        padding: 8px 0 4px;
        img {
          width: 96%;
        }
        .contrib-footer {
          margin: 6px 10px 0;
          padding: 0 0 4px;
        }
      }
    }
  }
}
</style>
