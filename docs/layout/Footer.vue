<template>
  <div class="footer_container">
      <VPTeamMembers :members="members" />
  </div>
</template>

<script setup>
import { VPTeamMembers } from 'vitepress/theme'
const members = [
  {
    avatar: 'assets/logo.jpg',
    name: 'Xiao Liu',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
]
</script>

<style scoped>
  .footer_container {
    text-align: center;
  }
</style>