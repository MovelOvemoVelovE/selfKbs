---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "vitePress docs"
  text: "日常总结随笔"
  tagline: 你值得拥有
  image: 
    src: /selfKbs/docs/imgs/logo.jpg
    alt: jbsLogo
  actions:
    - theme: brand
      text: 数据逻辑
      link: /markdowns/jbs-tips/dataSource

features:
  - title: 高效
    icon: ⚡
    details: 一个详细、优雅的文档，可以让工作事半功倍
  - title: 示例
    icon: 🎨
    details: 代码示例完整、注释及描述完善，可以不再关注于代码逻辑而是业务逻辑
  - title: 胜利
    icon: 🏆
    details: 以文档养技术，技术反哺文档
---

<script setup>
import Footer from './layout/Footer.vue'
</script>

<Footer />

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
</style>