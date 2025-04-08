import { defineConfig } from "vitepress";
import generateSidebar from "./vitepress/config/helper/sidebar.js";
import mdConfig from "./vitepress/config/mdConfig.mjs";

export default defineConfig({
  title: "前端知识库、笔记的技术分享",
  description: "一个前端代码、组件库、踩坑记录及工具集的一个静态站点",
  base: "/selfKbs/",
  appearance: {
    initOnMounted: false,
    initialValue: "dark",
  },
  // srcDir: 'docs',
  // head标签配置
  head: [
    [
      "link",
      { rel: "icon", type: "jpg", href: "/selfKbs/vitepress-logo-large.webp" },
    ],
  ],
  // 最后更新事件
  lastUpdated: true,
  // url取消.html后缀
  cleanUrls: true,
  // 页面布局配置
  themeConfig: {
    // 大纲渲染的层级
    outline: [1, 4], // number [number, number] 'deep'
    // 站点logo
    logo: {
      // src: '/imgs/logo.jpg',
    },
    // 站点标题
    siteTitle: "不断充实的知识库",
    // 主题配置
    // 搜索
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {},
              },
            },
          },
        },
      },
    },
    // 导航栏配置
    nav: [
      {
        text: "🧬量子纠缠",
        items: [
          //     { text: "查询索引", link: "/markdowns/jtips/dataSource" },
          { text: "🙆‍♀️噗", link: "/markdowns/pupu/index" },
        ],
      },
      {
        text: "🌈框架",
        items: [
          { text: "React", link: "/markdowns/architect_trip/react/index" },
          { text: "vue", link: "/markdowns/architect_trip/vue/vue" },
          {
            text: "jest",
            link: "/markdowns/architect_trip/testJs/jest/jest",
          },
        ],
      },
      {
        text: "🔨工具集",
        items: [
          {
            text: "工具函数",
            link: "/markdowns/architect_trip/tools/functions",
          },
          { text: "webpack", link: "/markdowns/architect_trip/webpack/basics" },
          { text: "vite", link: "/markdowns/architect_trip/webpack/basics" },
          { text: "Git", link: "/markdowns/architect_trip/tools/git" },
          {
            text: "git提取日报、周报",
            link: "/markdowns/architect_trip/tools/gitDaily.md",
          },
          { text: "📝配置文件集", link: "/markdowns/configJs/index" },
        ],
      },
      {
        text: "🤑技多不压身",
        items: [
          { text: "nodejs", link: "/markdowns/architect_trip/nodejs/nodejs" },
          {
            text: "MySql",
            link: "/markdowns/architect_trip/database/mysqlBasics",
          },
          { text: "express", link: "/markdowns/architect_trip/express/index" },
          { text: 'http', link: '/markdowns/architect_trip/http/http' },
          // {
          //   text: "cypress交互测试",
          //   link: "/markdowns/architect_trip/testJs/cypress",
          // },
          // {
          //   text: "Playwright",
          //   link: "/404",
          // },
          {
            text: "关于Javascript的故事",
            link: "/markdowns/architect_trip/js/javascript",
          },
        ],
      },
      {
        text: "🌩知识碎片",
        items: [
          { text: "踩坑碎片", link: "/markdowns/damnHole/index" },
          { text: "js零散", link: "/markdowns/damnHole/js" },
        ],
      },
      {
        text: '🔖读书让人成长',
        items: [
          { text: '《持续交付-发布可靠软件的系统方法》', link: '/markdowns/books/continuousDelivery/1index' },
          { text: '《你不知道的Javascript》', link: '/markdowns/books/javascriptStory/4jsYDK' },
          { text: '《Javascript的数据结构与算法》', link: '/markdowns/books/javascriptStory/1dataStructure' },
          { text: '《JavaScript设计模式》', link: '/markdowns/books/javascriptStory/2designMode' },
          { text: '《WEB响应式设计》', link: '/markdowns/books/javascriptStory/3responsiveDesign' },
        ]
      }
    ],
    // 侧边栏配置
    sidebar: {
      "/markdowns/jbs-components": [
        {
          text: "基础组件",
          // collapsed: true,
          items: [{ text: "Table 表格", link: "/markdowns/jcomponents/Table" }],
        },
      ],
      "/markdowns/jbs-tips": [
        {
          text: "系统代码逻辑",
          // collapsed: true,
          items: [
            { text: "数据逻辑", link: "/markdowns/jtips/dataSource" },
            { text: "函数方法", link: "/markdowns/jtips/methods" },
          ],
        },
        {
          text: "审批代码逻辑",
          items: [
            { text: "审批逻辑", link: "/markdowns/jtips/workFlow" },
            { text: "函数方法", link: "/markdowns/jtips/flowMethods" },
          ],
        },
      ],
      "/markdowns/architect_trip/react": [
        {
          text: "React",
          items: [
            {
              text: "速通React官网",
              link: "/markdowns/architect_trip/react/officialDocument",
            },
            {
              text: "样式私有化方案",
              link: "/markdowns/architect_trip/react/stylePrivate",
            },
            {
              text: "fetch请求",
              link: "/markdowns/architect_trip/react/fetch",
            },
            {
              text: "hook索引",
              link: "/markdowns/architect_trip/react/hooksIndex",
            },
            {
              text: "react-router-dom(路由)",
              link: "/markdowns/architect_trip/react/reactRouterDom",
            },
            {
              text: "react-redux状态管理",
              link: "/markdowns/architect_trip/react/redux",
            },
            {
              text: "redux-saga(redux中间件)",
              link: "/markdowns/architect_trip/react/reduxSaga",
            },
            {
              text: "源码原理",
              link: "/markdowns/architect_trip/react/sourceCode",
            },
            { text: "补漏", link: "/markdowns/architect_trip/react/fill" },
            {
              text: "React生态列表",
              link: "/markdowns/architect_trip/react/ecology",
            },
          ],
        },
      ],
      "/markdowns/architect_trip/tools/webpack": [
        {
          text: "webpack",
          items: [
            {
              text: "webpack基础配置",
              link: "/markdowns/architect_trip/tools/webpack/basics",
            },
            {
              text: "webpack-loader",
              link: "/markdowns/architect_trip/tools/webpack/loader",
            },
            {
              text: "webpack-plugin",
              link: "/markdowns/architect_trip/tools/webpack/plugin",
            },
          ],
        },
      ],
      ...generateSidebar("/markdowns/architect_trip/testJs/jest"),
      ...generateSidebar("/markdowns/architect_trip/nodejs"),
      ...generateSidebar("/markdowns/architect_trip/express"),
      ...generateSidebar("/markdowns/architect_trip/js"),
      ...generateSidebar("/markdowns/architect_trip/http"),
    },
    // 社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/movelovemovelove" },
      { icon: "yahoo", link: "https://movelovemovelove@yahoo.com" },
      { icon: "vite", link: "https://vuejs.org" },
    ],
  },
  // markdown config options
  markdown: {
    // markdown extendion plugin use
    config: (md) => mdConfig(md),
  },
});
