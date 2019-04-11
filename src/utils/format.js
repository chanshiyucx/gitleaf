import { format } from 'timeago.js'
import config from '../config'

/**
 * 格式化文章
 */
export const formatPost = post => {
  const { body, created_at } = post
  const temp = body.split('\r\n')
  const regex = /^\[(.+)\].*(http.*(?:jpg|jpeg|png|gif))/g
  const cover = regex.exec(temp[0])
  post.cover = {
    title: cover && cover[1] ? cover[1] : '',
    src: cover && cover[2] ? cover[2] : config.defaultCover
  }
  post.desc = temp[2] || temp[0]
  post.created_at = format(created_at, 'zh_CN')
  return post
}

/**
 * 格式化心情
 */
export const formatMood = moods => {
  moods.forEach(o => (o.created_at = format(o.created_at, 'zh_CN')))
  return moods
}

/**
 * 格式化书单 & 友链 & 关于
 */
export const formatPage = (data, type) => {
  if (!data.body) return
  if (type === 'about') return data

  let section = data.body.split('## ').filter(o => o.length)
  switch (type) {
    case 'book':
      section = section.map(o => {
        const content = o.split('\r\n').filter(o => o.length)
        return {
          name: content[0],
          author: content[1].split('author:')[1],
          published: content[2].split('published:')[1],
          progress: content[3].split('progress:')[1],
          rating: content[4].split('rating:')[1],
          postTitle: content[5].split('postTitle:')[1],
          postLink: content[6].split('postLink:')[1],
          cover: content[7].split('cover:')[1],
          desc: content[9].split('desc:')[1]
        }
      })
      break
    case 'friend':
      section = section.map(o => {
        const content = o.split('\r\n').filter(o => o.length)
        return {
          name: content[0],
          link: content[1].split('link:')[1],
          cover: content[2].split('cover:')[1],
          avatar: content[3].split('avatar:')[1]
        }
      })
      break
  }
  return section
}
