<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMarketStore } from '@/stores/market'

const route = useRoute()
const store = useMarketStore()
const activeIndex = computed(() => route.path)

const navItems = [
  { path: '/', label: '首页' },
  { path: '/trade', label: '二手交易' },
  { path: '/lost-found', label: '失物招领' },
  { path: '/group-buy', label: '拼单搭子' },
  { path: '/errand', label: '跑腿委托' },
  { path: '/list', label: '全部商品' },
  { path: '/message', label: '消息' },
  { path: '/user', label: '我的' },
]
</script>

<template>
  <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" router class="nav-menu">
    <el-menu-item v-for="item in navItems" :key="item.path" :index="item.path">
      {{ item.label }}
      <span v-if="item.path === '/message' && store.unreadCount > 0" class="badge">{{ store.unreadCount }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.nav-menu { flex: 1; justify-content: flex-end; border-bottom: none !important; }
.nav-menu .el-menu-item { height: 64px; line-height: 64px; }
.badge {
  background: #ef4444; color: #fff; border-radius: 10px; padding: 1px 7px; font-size: 11px;
  margin-left: 5px; line-height: 18px; display: inline-block; min-width: 18px; text-align: center;
}
</style>
