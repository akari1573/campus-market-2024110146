<script setup lang="ts">
const stats = [
  { label: '今日上新', value: 48, icon: '🆕', detail: '较昨日 +12' },
  { label: '活跃用户', value: 1256, icon: '👥', detail: '较上周 +8%' },
  { label: '成交订单', value: 89, icon: '📦', detail: '较昨日 +5' },
  { label: '总商品数', value: 3420, icon: '🛍️', detail: '累计在售' },
]
</script>

<template>
  <div class="board-page">
    <div class="board-header">
      <h2>📊 看板概览</h2>
      <p class="board-subtitle">实时数据一览，掌握平台动态</p>
    </div>
    <div class="stats-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <span class="stat-icon">{{ s.icon }}</span>
        <span class="stat-value">{{ s.value.toLocaleString() }}</span>
        <span class="stat-label">{{ s.label }}</span>
        <span class="stat-detail">{{ s.detail }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-page {
  max-width: 1200px;
  margin: 0 auto;
}

.board-header {
  margin-bottom: 24px;
}

.board-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.board-subtitle {
  font-size: 14px;
  color: #64748b;
  margin-top: 4px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 20px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  transition: transform 0.2s, box-shadow 0.2s;
  border-top: 4px solid transparent;
}

.stat-card:nth-child(1) { border-top-color: #3b82f6; }
.stat-card:nth-child(2) { border-top-color: #10b981; }
.stat-card:nth-child(3) { border-top-color: #f59e0b; }
.stat-card:nth-child(4) { border-top-color: #ef4444; }

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

.stat-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 38px;
  font-weight: 800;
  margin-bottom: 4px;
}

.stat-card:nth-child(1) .stat-value { color: #3b82f6; }
.stat-card:nth-child(2) .stat-value { color: #10b981; }
.stat-card:nth-child(3) .stat-value { color: #f59e0b; }
.stat-card:nth-child(4) .stat-value { color: #ef4444; }

.stat-label {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.stat-detail {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 8px;
}
</style>
