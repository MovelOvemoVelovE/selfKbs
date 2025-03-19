<template>
  <div class="footer_container">
      <VPTeamMembers :members="members" />
  </div>
</template>

<script setup>
import { VPTeamMembers } from 'vitepress/theme'
const members = [
  {
    avatar: 'imgs/logo.jpg',
    name: 'kakarotto',
    title: 'movelovemovelove@163.com',
    links: [
      { icon: 'github', link: 'https://github.com/movelovemovelove' },
    ]
  },
]
</script>

<style scoped>
  .footer_container {
    text-align: center;
  }
</style>