export default {
  /**
   * ========================================
   *               站点功能【必需】
   * ========================================
   **/

  /**
   * 站点标题
   */
  title: '蝉时雨',
  subtitle: '蝉鸣如雨 花宵道中',

  /**
   * Github Issues 配置【文章、说说、书单、友链】
   * Github Issues api: https://developer.github.com/v3/issues/
   **/
  username: 'chanshiyucx', // github 用户名
  repository: 'blog', // 仓库地址
  // token 从中间任意位置拆开成两部分，避免 github 代码检测失效
  token: ['0ad1a0539c5b96fd18fa', 'aaafba9c7d1362a5746c'],

  /**
   * leancloud 配置 【文章浏览次数】
   */
  leancloud: {
    appId: 'b6DWxsCOWuhurfp4YqbD5cDE-gzGzoHsz',
    appKey: 'h564RR5uVuJV5uSeP7oFTBye'
  },

  /**
   * Gittalk 配置【评论功能】，详细文档参见：https://github.com/gitalk/gitalk
   */
  gitalk: {
    clientID: '864b1c2cbc4e4aad9ed8',
    clientSecret: '6ca16373efa03347e11a96ff92e355c5cea189bb',
    repo: 'Comment',
    owner: 'chanshiyucx',
    admin: ['chanshiyucx'],
    distractionFreeMode: false // 是否开始无干扰模式【背景遮罩】
  },

  /**
   * 顶部导航
   */
  links: [
    {
      name: 'Blog',
      url: 'https://chanshiyu.com/'
    },
    {
      name: 'Github',
      url: 'https://github.com/chanshiyucx'
    },
    {
      name: 'Aurora',
      url: 'https://github.com/chanshiyucx/aurora'
    },
    {
      name: 'HeartBeat',
      url: 'https://github.com/chanshiyucx/heart-beat'
    },
    {
      name: 'Gitlife',
      url: 'https://github.com/chanshiyucx/gitlife'
    }
  ],

  /**
   * 个人信息页面
   */
  personal: {
    avatar: 'https://i.loli.net/2018/12/09/5c0cc2b4e0195.png',
    username: 'chanshiyu',
    nickname: '蝉時雨',
    description: 'Write the code, Change the world',
    location: 'Shenzhen, China',
    email: 'me@chanshiyu.com',
    site: 'https://chanshiyu.com',
    social: [
      {
        icon: 'https://i.loli.net/2019/01/25/5c4b2982b5687.png',
        link: 'https://github.com/chanshiyucx'
      },
      {
        icon: 'https://i.loli.net/2018/12/09/5c0cc518dc4f4.png',
        link: 'https://www.zhihu.com/people/ichanshiyu/activities'
      },
      {
        icon: 'https://i.loli.net/2018/12/09/5c0cc51ae4f0c.png',
        link: 'https://music.163.com/#/user/home?id=103060582'
      },
      {
        icon: 'https://i.loli.net/2019/01/25/5c4b2a7558ad7.png',
        link: 'http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=tNnR9Nfc1drH3N3NwZrX29k'
      }
    ]
  },

  /**
   * 评论功能是否启用
   */
  comment: {
    post: true,
    mood: true,
    friend: true,
    about: true
  }
}
