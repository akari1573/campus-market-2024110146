<script setup lang="ts"></script>

<template>
  <div class="app">
    <header class="header">
      <h1 class="logo">校园轻集市</h1>
      <nav class="nav">
        <router-link class="nav-item" to="/home">首页</router-link>
        <router-link class="nav-item" to="/list">列表</router-link>
        <router-link class="nav-item" to="/publish">发布</router-link>
        <router-link class="nav-item" to="/message">消息</router-link>
        <router-link class="nav-item" to="/profile">我的</router-link>
        <router-link class="nav-item" to="/board">看板</router-link>
      </nav>
    </header>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #f5f7fa;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 20px;
  color: #409eff;
  margin: 0;
}

.nav {
  display: flex;
  gap: 8px;
}

.nav-item {
  padding: 8px 16px;
  border-radius: 6px;
  color: #606266;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
}

.nav-item:hover {
  color: #409eff;
  background: #ecf5ff;
}

.nav-item.router-link-exact-active {
  color: #409eff;
  background: #ecf5ff;
  font-weight: 600;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
</style>