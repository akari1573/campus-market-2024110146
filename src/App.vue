<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeIndex = computed(() => route.path)
</script>

<template>
  <div class="app">
    <header class="header">
      <h1 class="logo">校园轻集市</h1>
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        router
        class="nav-menu"
      >
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/list">列表</el-menu-item>
        <el-menu-item index="/publish">发布</el-menu-item>
        <el-menu-item index="/message">消息</el-menu-item>
        <el-menu-item index="/profile">我的</el-menu-item>
        <el-menu-item index="/board">看板</el-menu-item>
      </el-menu>
    </header>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #f8fafc;
}

.header {
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #f1f5f9;
}

.logo {
  font-size: 20px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  white-space: nowrap;
  font-weight: 800;
}

.nav-menu {
  flex: 1;
  justify-content: flex-end;
  border-bottom: none !important;
}

.nav-menu .el-menu-item {
  height: 60px;
  line-height: 60px;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
</style>