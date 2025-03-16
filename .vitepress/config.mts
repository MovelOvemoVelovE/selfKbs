import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端开发笔记手册",
  description: "前端自学的一些笔记，一些着重点记录。以便学习、复习、参考",
  outDir: 'public',
  base: '/selfKbs/',
  themeConfig: {
    nav: [
      { text: 'javascript', link: '/docs/' },
      { text: '框架', link: '/docs/' },
      { text: '数据库', link: '/docs/markdown-examples' },
      { text: '常用配置文件', link: '/docs/markdown-examples' },
      { text: '常用工具', link: '/docs/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/docs/markdown-examples' },
          { text: 'Runtime API Examples', link: '/docs/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'gitee', ariaLabel: 'gitee address', link: 'https://gitee.com/xiaoshao0614' }
    ]
  },
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
})
