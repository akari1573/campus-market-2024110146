<script setup lang="ts">
import { useMarketStore } from '@/stores/market'
import { computed } from 'vue'

const store = useMarketStore()

const stats = computed(() => [
  { label: '今日上新', value: 48, icon: '🆕', detail: '较昨日 +12', color: '#3b82f6' },
  { label: '活跃用户', value: 1256, icon: '👥', detail: '较上周 +8%', color: '#10b981' },
  { label: '成交订单', value: 89, icon: '📦', detail: '较昨日 +5', color: '#f59e0b' },
  { label: '总商品数', value: store.products.length + store.lostFounds.length + store.groupBuys.length + store.errandTasks.length, icon: '🛍️', detail: '累计在售', color: '#ef4444' },
  { label: '待审核', value: 15, icon: '⏳', detail: '需尽快处理', color: '#8b5cf6' },
  { label: '举报数量', value: 7, icon: '🚩', detail: '↑ 3 新增', color: '#f97316' },
  { label: '失物招领', value: store.lostFounds.length, icon: '🔍', detail: '本月新增', color: '#06b6d4' },
  { label: '拼单活动', value: store.groupBuys.length, icon: '🤝', detail: '进行中', color: '#10b981' },
])

const recentReviews = [
  { action: '通过', item: '二手自行车 - 张三', time: '10分钟前', type: 'success' },
  { action: '驳回', item: '代写论文广告 - 匿名', time: '25分钟前', type: 'danger' },
  { action: '通过', item: '拼奶茶 - 王同学', time: '1小时前', type: 'success' },
  { action: '通过', item: '失物招领校园卡', time: '2小时前', type: 'success' },
  { action: '待审', item: '二手显示器 - 新用户', time: '3小时前', type: 'warning' },
]
</script>

<template>
  <div class="page">
    <div class="page-hd"><h2>📊 数据看板</h2><span class="time">最后更新：2026-06-28 15:30</span></div>
    <div class="stats-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <span class="stat-icon">{{ s.icon }}</span>
        <span class="stat-value" :style="{ color: s.color }">{{ typeof s.value === 'number' ? s.value.toLocaleString() : s.value }}</span>
        <span class="stat-label">{{ s.label }}</span>
        <span class="stat-detail">{{ s.detail }}</span>
      </div>
    </div>
    <div class="panel-grid">
      <div class="panel-card">
        <h3>📋 最近审核记录</h3>
        <div v-for="r in recentReviews" :key="r.item" class="review-item">
          <el-tag size="small" :type="r.type">{{ r.action }}</el-tag>
          <span class="review-text">{{ r.item }}</span>
          <span class="review-time">{{ r.time }}</span>
        </div>
      </div>
      <div class="panel-card">
        <h3>⚡ 快捷入口</h3>
        <div class="quick-btns">
          <el-button type="primary" style="width:100%;">📋 信息审核</el-button>
          <el-button style="width:100%;">👥 用户管理</el-button>
          <el-button style="width:100%;">🚩 举报处理</el-button>
          <el-button style="width:100%;">📈 详细统计</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 1200px; margin: 0 auto; }
.page-hd { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-hd h2 { font-size: 24px; font-weight: 700; margin: 0; }
.time { font-size: 13px; color: #64748b; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 28px; }
.stat-card { background: #fff; border-radius: 16px; padding: 26px; text-align: center; box-shadow: 0 1px 6px rgba(0,0,0,0.03); transition: all 0.2s; border: 1px solid #f1f5f9; }
.stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.stat-icon { font-size: 34px; display: block; margin-bottom: 10px; }
.stat-value { font-size: 34px; font-weight: 800; display: block; margin-bottom: 4px; }
.stat-label { font-size: 13px; color: #64748b; }
.stat-detail { font-size: 12px; color: #94a3b8; display: block; margin-top: 6px; }
.panel-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.panel-card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 1px 6px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
.panel-card h3 { font-size: 17px; font-weight: 700; margin: 0 0 18px; display: flex; align-items: center; gap: 8px; }
.review-item { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid #f8fafc; font-size: 13px; }
.review-item:last-child { border-bottom: none; }
.review-text { flex: 1; }
.review-time { color: #94a3b8; font-size: 12px; }
.quick-btns { display: flex; flex-direction: column; gap: 12px; }
</style>
