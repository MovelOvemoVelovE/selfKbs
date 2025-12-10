import { defineConfig } from "vitepress";
import generateSidebar from "./vitepress/config/helper/sidebar.js";
import mdConfig from "./vitepress/config/mdConfig.mjs";
import path from "path";

export default defineConfig({
  title: "前端知识库、笔记的技术分享",
  description: "一个前端代码、组件库、踩坑记录及工具集的一个静态站点",
  base: "/selfKbs/",
  appearance: {
    initOnMounted: false,
    initialValue: "dark",
  },
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
    outline: [1, 4],
    // 站点logo
    logo: {},
    // 站点标题
    siteTitle: "仙路尽头谁为峰 一见无始道成空",
    // 主题配置
    // 搜索
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索古籍",
                buttonAriaLabel: "搜索古籍",
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
        text: "☯ ‌阴阳道图",
        items: [
          { text: "🙆‍♀️噗", link: "/markdowns/pupu/index" },
          {
            text: "git提取日报、周报",
            link: "/markdowns/architect_trip/tools/gitDaily.md",
          },
          {
            text: "LeetCode每日一刷(刷不动版)",
            link: "/markdowns/leetCode/Easy",
          },
          {
            text: "项目结构配置构建",
            link: "/markdowns/architect_trip/project/projectConfig",
          },
        ],
      },
      {
        text: "🕋 ‌神王模板‌",
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
        text: "🔪 ‌极道帝兵",
        items: [
          {
            text: "工具函数",
            link: "/markdowns/architect_trip/tools/functions",
          },
          {
            text: "webpack",
            link: "/markdowns/architect_trip/tools/webpack/basics",
          },
          { text: "vite", link: "/markdowns/architect_trip/tools/vite/vite" },
          { text: "Git", link: "/markdowns/architect_trip/tools/git" },
          { text: "📝配置文件集", link: "/markdowns/configJs/index" },
        ],
      },
      {
        text: "🖐️ ‌禁忌遗韵",
        items: [
          { text: "nodejs", link: "/markdowns/architect_trip/nodejs/nodejs" },
          {
            text: "MySql",
            link: "/markdowns/architect_trip/database/mysqlBasics",
          },
          { text: "express", link: "/markdowns/architect_trip/express/index" },
          {
            text: "关于Javascript的故事",
            link: "/markdowns/architect_trip/js/javascript",
          },
        ],
      },
      {
        text: "🧩 ‌大道残片",
        items: [
          { text: "踩坑碎片", link: "/markdowns/damnHole/index" },
          { text: "js零散", link: "/markdowns/damnHole/js" },
        ],
      },
      {
        text: "📜仙王手札",
        items: [
          {
            text: "《深入理解计算机系统CS:APP》",
            link: "/markdowns/books/CSAPP/index",
          },
          { text: "MDN文档", link: "/markdowns/mdn/index" },
          { text: "《MDN Canvas文档》", link: "/markdowns/books/Canvas/index" },
          {
            text: "《图解HTTP》",
            link: "/markdowns/books/diagrammatizeHTTP/index",
          },
          {
            text: "《你不知道的Javascript》",
            link: "/markdowns/books/javascriptStory/4jsYDK",
          },
          {
            text: "《Javascript的数据结构与算法》",
            link: "/markdowns/books/javascriptStory/1dataStructure",
          },
          {
            text: "《JavaScript设计模式》",
            link: "/markdowns/books/javascriptStory/2designMode",
          },
          {
            text: "《持续交付-发布可靠软件的系统方法》",
            link: "/markdowns/books/continuousDelivery/1index",
          },
          {
            text: "《WEB响应式设计》",
            link: "/markdowns/books/javascriptStory/3responsiveDesign",
          },
          {
            text: "《Echarts入门、实战与进阶》",
            link: "/markdowns/books/echarts/index",
          },
          {
            text: "《HEAD FIRST JAVA》",
            link: "/markdowns/books/headFirstJava/headFirstJava",
          },
          {
            text: "《Maven 实战》",
            link: "/markdowns/books/mavenInAction/mavenInAction",
          },
          {
            text: "《On JAVA基础版》",
            link: "/markdowns/books/onJava/基础卷/index",
          },
          { text: "《MySql必知必会》", link: "/markdowns/books/mySql/index" },
          { text: "《Vuejs设计与实现》", link: "/markdowns/books/Vuejs/index" },
          { text: "《Python编程，从入门到实践》", link: "/markdowns/books/python/basic/index" },
        ],
      },
    ],
    // 侧边栏配置
    sidebar: {
      "/markdowns/books/headFirstJava": [
        {
          text: "headFirstJava",
          items: [
            {
              text: "新入道途",
              link: "/markdowns/books/headFirstJava/headFirstJava",
            },
            {
              text: "略通道行",
              link: "/markdowns/books/headFirstJava/premiumJava",
            },
            {
              text: "渐入佳境",
              link: "/markdowns/books/headFirstJava/middleTip",
            },
          ],
        },
        {
          text: "javaTips",
          items: [
            { text: "javaTips", link: "/markdowns/books/headFirstJava/tips" },
          ],
        },
      ],
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
      ...generateSidebar("/markdowns/books/echarts"),
      ...generateSidebar("/markdowns/leetCode"),
      "/markdowns/books/CSAPP": [
        {
          text: "目录总览",
          items: [
            {
              text: "深入理解计算机系统CS:APP",
              link: "/markdowns/books/CSAPP/index",
            },
          ],
        },
        {
          text: "第一部分 程序结构和执行",
          items: [
            {
              text: "第一章 计算机系统漫游",
              link: "/markdowns/books/CSAPP/part1/chapter1",
            },
            {
              text: "第二章 信息的表示与处理",
              link: "/markdowns/books/CSAPP/part1/chapter2",
            },
            {
              text: "第三章 程序的机器级表示",
              link: "/markdowns/books/CSAPP/part1/chapter3",
            },
            {
              text: "第四章 优化程序性能",
              link: "/markdowns/books/CSAPP/part1/chapter4",
            },
          ],
        },
      ],
      "/markdowns/books/Vuejs": [
        {
          text: "Vuejs设计与实现",
          items: [{ text: "前言", link: "/markdowns/books/Vuejs/index" }],
        },
        {
          text: "第一部分 框架设计概览",
          items: [
            {
              text: "第一章 权衡的艺术",
              link: "/markdowns/books/Vuejs/part1/chapter1",
            },
            {
              text: "第二章 框架设计核心要素",
              link: "/markdowns/books/Vuejs/part1/chapter2",
            },
            {
              text: "第三章 Vuejs设计思路",
              link: "/markdowns/books/Vuejs/part1/chapter3",
            },
          ],
        },
        {
          text: "第二部分 响应系统",
          items: [
            {
              text: "第四章 作用和实现",
              link: "/markdowns/books/Vuejs/part2/chapter4",
            },
          ]
        }
      ],
      "/markdowns/books/python/basic": [
        {
          text: "Python编程，从入门到实践",
          items: [{ text: "前言", link: "/markdowns/books/python/basic/index" }],
        },
        {
          text: "第一部分 Python基础知识",
          items: [
            {
              text: "第一章 安装Python",
              link: "/markdowns/books/python/basic/part1/chapter1",
            },
            {
              text: "第二章 列表/元组",
              link: "/markdowns/books/python/basic/part1/chapter2",
            },
            {
              text: "第三章 条件判断",
              link: "/markdowns/books/python/basic/part1/chapter3",
            },
            {
              text: "第四章 字典",
              link: "/markdowns/books/python/basic/part1/chapter4",
            },
            {
              text: '第五章 用户输入和while循环',
              link: "/markdowns/books/python/basic/part1/chapter5",
            },
            {
              text: '第六章 函数',
              link: "/markdowns/books/python/basic/part1/chapter6",
            }
          ]
        }
      ]
    },
    // 社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/movelovemovelove" },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 512 512"><defs><linearGradient id="meteoconsPollenTreeFill0" x1="111" x2="123" y1="2.6" y2="23.4" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".5" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><linearGradient id="meteoconsPollenTreeFill1" x1="149" x2="165" y1="39.1" y2="66.9" href="#meteoconsPollenTreeFill0"/><linearGradient id="meteoconsPollenTreeFill2" x1="69" x2="85" y1="39.1" y2="66.9" href="#meteoconsPollenTreeFill0"/><linearGradient id="meteoconsPollenTreeFill3" x1="7" x2="19" y1="50.6" y2="71.4" href="#meteoconsPollenTreeFill0"/><linearGradient id="meteoconsPollenTreeFill4" x1="215" x2="227" y1="50.6" y2="71.4" href="#meteoconsPollenTreeFill0"/><linearGradient id="meteoconsPollenTreeFill5" x1="177" x2="185" y1="14.1" y2="27.9" href="#meteoconsPollenTreeFill0"/><linearGradient id="meteoconsPollenTreeFill6" x1="49" x2="57" y1="14.1" y2="27.9" href="#meteoconsPollenTreeFill0"/><linearGradient id="meteoconsPollenTreeFill7" x1="210.9" x2="280.2" y1="282.2" y2="402.2" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#875b34"/><stop offset=".5" stop-color="#875b34"/><stop offset="1" stop-color="#624226"/></linearGradient><linearGradient id="meteoconsPollenTreeFill8" x1="272.6" x2="315.2" y1="237.5" y2="311.2" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#51cf66"/><stop offset=".5" stop-color="#51cf66"/><stop offset="1" stop-color="#37b24d"/></linearGradient><linearGradient id="meteoconsPollenTreeFill9" x1="163.9" x2="206.5" y1="218.6" y2="292.3" href="#meteoconsPollenTreeFill8"/><linearGradient id="meteoconsPollenTreeFilla" x1="273.5" x2="346" y1="127.2" y2="252.7" href="#meteoconsPollenTreeFill8"/><linearGradient id="meteoconsPollenTreeFillb" x1="187.5" x2="267.3" y1="145" y2="283.2" href="#meteoconsPollenTreeFill8"/><symbol id="meteoconsPollenTreeFillc" viewBox="0 0 234 74"><circle cx="117" cy="13" r="12" fill="url(#meteoconsPollenTreeFill0)" stroke="#f8af18" stroke-miterlimit="10" stroke-width="4"><animateTransform attributeName="transform" begin="-0.33s" calcMode="spline" dur="3s" keySplines=".42, 0, .58, 1; .42, 0, .58, 1" repeatCount="indefinite" type="translate" values="0 -30; 0 30; 0 -30"/></circle><circle cx="157" cy="53" r="16" fill="url(#meteoconsPollenTreeFill1)" stroke="#f8af18" stroke-miterlimit="10" stroke-width="4"><animateTransform attributeName="transform" begin="-1.17s" calcMode="spline" dur="3s" keySplines=".42, 0, .58, 1; .42, 0, .58, 1" repeatCount="indefinite" type="translate" values="0 -30; 0 30; 0 -30"/></circle><circle cx="77" cy="53" r="16" fill="url(#meteoconsPollenTreeFill2)" stroke="#f8af18" stroke-miterlimit="10" stroke-width="4"><animateTransform attributeName="transform" begin="-1s" calcMode="spline" dur="3s" keySplines=".42, 0, .58, 1; .42, 0, .58, 1" repeatCount="indefinite" type="translate" values="0 -30; 0 30; 0 -30"/></circle><circle cx="13" cy="61" r="12" fill="url(#meteoconsPollenTreeFill3)" stroke="#f8af18" stroke-miterlimit="10" stroke-width="4"><animateTransform attributeName="transform" begin="-.67s" calcMode="spline" dur="3s" keySplines=".42, 0, .58, 1; .42, 0, .58, 1" repeatCount="indefinite" type="translate" values="0 -30; 0 30; 0 -30"/></circle><circle cx="221" cy="61" r="12" fill="url(#meteoconsPollenTreeFill4)" stroke="#f8af18" stroke-miterlimit="10" stroke-width="4"><animateTransform attributeName="transform" begin="-1.5s" calcMode="spline" dur="3s" keySplines=".42, 0, .58, 1; .42, 0, .58, 1" repeatCount="indefinite" type="translate" values="0 -30; 0 30; 0 -30"/></circle><circle cx="181" cy="21" r="8" fill="url(#meteoconsPollenTreeFill5)" stroke="#f8af18" stroke-miterlimit="10" stroke-width="4"><animateTransform attributeName="transform" begin="-1.33s" calcMode="spline" dur="3s" keySplines=".42, 0, .58, 1; .42, 0, .58, 1" repeatCount="indefinite" type="translate" values="0 -30; 0 30; 0 -30"/></circle><circle cx="53" cy="21" r="8" fill="url(#meteoconsPollenTreeFill6)" stroke="#f8af18" stroke-miterlimit="10" stroke-width="4"><animateTransform attributeName="transform" begin="-.83s" calcMode="spline" dur="3s" keySplines=".42, 0, .58, 1; .42, 0, .58, 1" repeatCount="indefinite" type="translate" values="0 -30; 0 30; 0 -30"/></circle></symbol></defs><path fill="url(#meteoconsPollenTreeFill7)" stroke="#744e2d" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" d="m265 403.6l-4-127a12 12 0 0 0-12-11.7h-5a12 12 0 0 0-12 11.7l-4 127a12 12 0 0 0 12 12.4h13.1a12 12 0 0 0 12-12.4Z"/><ellipse cx="293.9" cy="274.4" fill="url(#meteoconsPollenTreeFill8)" stroke="#40c057" stroke-linecap="round" stroke-miterlimit="10" stroke-width="8" rx="42.7" ry="42.5"/><ellipse cx="185.2" cy="255.5" fill="url(#meteoconsPollenTreeFill9)" stroke="#40c057" stroke-linecap="round" stroke-miterlimit="10" stroke-width="8" rx="42.7" ry="42.5"/><path fill="url(#meteoconsPollenTreeFilla)" stroke="#40c057" stroke-linecap="round" stroke-miterlimit="10" stroke-width="8" d="M317.6 146.9a57.5 57.5 0 0 0-10.9 1.1a28.4 28.4 0 1 0-41.1 32.8a56.2 56.2 0 0 0-4.9 22.8a56.9 56.9 0 1 0 57-56.7Z"/><path fill="url(#meteoconsPollenTreeFillb)" stroke="#40c057" stroke-linecap="round" stroke-miterlimit="10" stroke-width="8" d="M289.2 184.7a57 57 0 0 0-106.3-28.1c-1 0-1.8-.3-2.8-.3a42.4 42.4 0 0 0-11.8 83.1a28 28 0 0 0-2.4 11.3A28.3 28.3 0 0 0 213 272a42.6 42.6 0 0 0 76.2-26a42 42 0 0 0-10.9-28.1a56.1 56.1 0 0 0 10.9-33.2Z"/><use width="234" height="74" href="#meteoconsPollenTreeFillc" transform="translate(139 89)"/></svg>',
        },
        link: "https://movelovemovelove@163.com",
      },
      {
        icon: "vite",
        link: "https://vitepress.dev/zh/guide/what-is-vitepress",
      },
    ],
  },
  // markdown config options
  markdown: {
    // markdown extendion plugin use
    config: (md) => mdConfig(md),
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "../../src"),
      },
    },
    plugins: [],
  },
});
