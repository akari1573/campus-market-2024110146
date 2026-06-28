<script setup lang="ts">
import AppNav from './AppNav.vue'
</script>

<template>
  <header class="header">
    <h1 class="logo">校园轻集市</h1>
    <AppNav />
  </header>
</template>

<style scoped>
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
</style>
