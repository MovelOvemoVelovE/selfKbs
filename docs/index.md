---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "卡卡筑基"
  text: "人生的意义在于人本身"
  tagline: 人活到100岁，影像的大小是46,195.3125 TB
  image: 
    src: /vitepress-logo-large.webp
    alt: webLogo
  actions:
    - theme: brand
      text: 数据逻辑
      link: /markdowns/jtips/dataSource
    - theme: brand
      text: Echarts入门、实战与进阶
      link: /markdowns/books/echarts/index
    - theme: alt
      text: 🚀学无止境
      link: /markdowns/pupu/index

features:
  - title: 聚合
    icon: 🧩
    details: 书写笔记要聚合零散、最少知识点的原则
  - title: 高效
    icon: ⚡
    details: 不断积累的代码及思路，可以快速的实现一些功能，甚至是复制一些功能
  - title: 示例
    icon: 🎨
    details: 代码示例完整、注释及描述完善，不必将生命浪费在一次次的重复思考
  - title: 意义
    icon: 🏆
    details: 只有在"折腾"中，才能"被动地"学习到一些东西
  - title: AI
    icon: 🚀
    details: 利用AI工具! 不仅仅是辅助工作，还可以辅助学习
  - title: 坚持
    icon: 💪
    details: 坚持才是王道，只有坚持才能看到希望的曙光
---

<script setup>
import Footer from './layout/Footer.vue'
</script>

<Footer />

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}
</style>