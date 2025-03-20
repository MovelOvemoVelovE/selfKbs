---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Front-end docs"
  text: "日常总结随笔"
  tagline: 人生的意义在于人本身 
  image: 
    src: /vitepress-logo-large.webp
    alt: webLogo
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
  - title: 意义
    icon: 🏆
    details: 以文档养技术，技术反哺文档
  - title: AI
    icon: 🚀
    details: 利用AI工具! 可以记录AI工具都较复杂生成的算法
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