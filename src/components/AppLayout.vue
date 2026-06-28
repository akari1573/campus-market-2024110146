<script setup lang="ts">
import AppHeader from './AppHeader.vue'
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    <main class="main"><RouterView /></main>
    <footer class="footer-bar">
      <p>© 2026 校园轻集市 · 为校园生活而生</p>
      <p><RouterLink to="/">首页</RouterLink> · <RouterLink to="/publish">发布信息</RouterLink> · <RouterLink to="/board">数据看板</RouterLink></p>
    </footer>
  </div>
</template>

<style scoped>
.app-layout { min-height: 100vh; background: #f1f5f9; }
.main { max-width: 1240px; margin: 0 auto; padding: 24px; }
.footer-bar { background: #fff; border-top: 1px solid #e2e8f0; margin-top: 40px; padding: 24px; text-align: center; }
.footer-bar p { font-size: 12px; color: #94a3b8; line-height: 1.8; margin: 0; }
.footer-bar a { color: #3b82f6; text-decoration: none; margin: 0 8px; }
</style>
