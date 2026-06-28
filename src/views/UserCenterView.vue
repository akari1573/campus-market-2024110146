<script setup lang="ts">
import { useMarketStore } from '@/stores/market'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const store = useMarketStore()
const router = useRouter()

const stats = computed(() => [
  { label: '我的发布', value: store.myProducts.length, color: '#3b82f6' },
  { label: '我的收藏', value: 12, color: '#10b981' },
  { label: '总浏览量', value: store.myProducts.reduce((s, p) => s + p.views, 0), color: '#f59e0b' },
  { label: '已成交', value: 2, color: '#ef4444' },
])

const activities = [
  { text: '你发布的"二手自行车"收到一条新消息', time: '30分钟前', color: '#10b981' },
  { text: '"机械键盘"被李同学收藏', time: '2小时前', color: '#3b82f6' },
  { text: '你的"床上折叠桌"已有89次浏览', time: '5小时前', color: '#f59e0b' },
  { text: '你发布了新商品"Kindle Paperwhite 4"', time: '3天前', color: '#94a3b8' },
]
</script>

<template>
  <div class="page">
    <div class="profile-card">
      <div class="banner" />
      <div class="profile-info">
        <div class="avt-wrap"><img :src="store.userInfo.avatar" alt="" /></div>
        <div class="user-text">
          <div class="user-name">{{ store.userInfo.name }} <el-tag size="small" type="success">✅ 已认证</el-tag></div>
          <div class="user-sign">{{ store.userInfo.signature }} · {{ store.userInfo.college }}</div>
          <div class="user-detail">
            <span>📱 {{ store.userInfo.phone }}</span><span>🏫 {{ store.userInfo.campus }}</span><span>🏠 {{ store.userInfo.dorm }}</span><span>⭐ 信用良好</span>
          </div>
        </div>
        <el-button @click="router.push('/profile')">✏️ 编辑资料</el-button>
      </div>
    </div>

    <div class="stats-row">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <div class="stat-num" :style="{ color: s.color }">{{ s.value }}</div>
        <div class="stat-label">{{ s.label }}</div>
      </div>
    </div>

    <div class="menu-grid">
      <div class="menu-item" @click="router.push('/profile')"><span class="menu-icon">📋</span><span class="menu-label">我的发布</span></div>
      <div class="menu-item"><span class="menu-icon">⭐</span><span class="menu-label">我的收藏</span></div>
      <div class="menu-item" @click="router.push('/message')"><span class="menu-icon">💬</span><span class="menu-label">我的消息</span></div>
      <div class="menu-item"><span class="menu-icon">⚙️</span><span class="menu-label">账号设置</span></div>
    </div>

    <div class="activity-card">
      <h3>📌 最近动态</h3>
      <div v-for="(a, i) in activities" :key="i" class="act-item">
        <div class="act-dot" :style="{ background: a.color }" />
        <div class="act-text">{{ a.text }}</div><span class="act-time">{{ a.time }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 1040px; margin: 0 auto; }
.profile-card { background: #fff; border-radius: 18px; box-shadow: 0 1px 8px rgba(0,0,0,0.04); overflow: hidden; margin-bottom: 24px; border: 1px solid #f1f5f9; }
.banner { height: 140px; background: linear-gradient(135deg, #f97316, #ea580c); }
.profile-info { display: flex; align-items: flex-end; gap: 24px; padding: 0 30px 26px; margin-top: -60px; }
.avt-wrap { width: 104px; height: 104px; border-radius: 50%; border: 5px solid #fff; box-shadow: 0 4px 14px rgba(0,0,0,0.12); overflow: hidden; background: #e2e8f0; flex-shrink: 0; }
.avt-wrap img { width: 100%; height: 100%; object-fit: cover; }
.user-text { padding-bottom: 8px; flex: 1; }
.user-name { font-size: 24px; font-weight: 700; display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.user-sign { font-size: 13px; color: #64748b; margin-bottom: 6px; }
.user-detail { font-size: 13px; color: #475569; display: flex; gap: 18px; flex-wrap: wrap; }
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
.stat-card { background: #fff; border-radius: 16px; padding: 22px; text-align: center; box-shadow: 0 1px 6px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
.stat-num { font-size: 30px; font-weight: 800; }
.stat-label { font-size: 12px; color: #64748b; margin-top: 4px; }
.menu-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.menu-item { background: #fff; border-radius: 16px; padding: 26px; text-align: center; cursor: pointer; box-shadow: 0 1px 6px rgba(0,0,0,0.03); transition: all 0.25s; border: 1px solid #f1f5f9; }
.menu-item:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); border-color: #dbeafe; }
.menu-icon { font-size: 36px; display: block; margin-bottom: 8px; }
.menu-label { font-size: 14px; font-weight: 600; }
.activity-card { background: #fff; border-radius: 16px; padding: 22px; box-shadow: 0 1px 6px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
.activity-card h3 { font-size: 17px; font-weight: 700; margin: 0 0 16px; }
.act-item { display: flex; align-items: center; gap: 12px; padding: 13px 0; border-bottom: 1px solid #f8fafc; }
.act-item:last-child { border-bottom: none; }
.act-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.act-text { flex: 1; font-size: 13px; }
.act-time { font-size: 11px; color: #94a3b8; }
</style>
