<script setup lang="ts">
import AppNav from './AppNav.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <header class="header">
    <div class="logo" @click="router.push('/')">
      <span class="logo-icon">🏫</span> <span class="logo-text">校园轻集市</span>
    </div>
    <AppNav />
    <div class="actions">
      <el-button size="default" type="primary" @click="router.push('/publish')">发布信息</el-button>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex; align-items: center; padding: 0 28px; height: 64px;
  background: #fff; position: sticky; top: 0; z-index: 100;
  border-bottom: 1px solid #e2e8f0; box-shadow: 0 1px 12px rgba(0,0,0,0.03);
}
.logo {
  cursor: pointer; display: flex; align-items: center; gap: 6px; margin-right: auto; user-select: none;
}
.logo-icon { font-size: 26px; }
.logo-text {
  font-size: 20px; font-weight: 800;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.actions { margin-left: 18px; }
</style>
