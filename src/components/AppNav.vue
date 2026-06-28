<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeIndex = computed(() => route.path)

const navItems = [
  { path: '/', label: '首页' },
  { path: '/trade', label: '二手交易' },
  { path: '/lost-found', label: '失物招领' },
  { path: '/group-buy', label: '拼单搭子' },
  { path: '/errand', label: '跑腿委托' },
  { path: '/publish', label: '发布' },
  { path: '/message', label: '消息' },
  { path: '/user', label: '我的' },
]
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    :ellipsis="false"
    router
    class="nav-menu"
  >
    <el-menu-item
      v-for="item in navItems"
      :key="item.path"
      :index="item.path"
    >
      {{ item.label }}
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.nav-menu {
  flex: 1;
  justify-content: flex-end;
  border-bottom: none !important;
}

.nav-menu .el-menu-item {
  height: 60px;
  line-height: 60px;
}
</style>
