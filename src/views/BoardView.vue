<script setup lang="ts">
const stats = [
  { label: '今日上新', value: 48 },
  { label: '活跃用户', value: 1256 },
  { label: '成交订单', value: 89 },
  { label: '总商品数', value: 3420 },
]
</script>

<template>
  <div>
    <h2>看板概览</h2>
    <div class="stats-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <span class="stat-value">{{ s.value }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin: 0 0 20px;
  color: #303133;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: #409eff;
}

.stat-label {
  margin-top: 8px;
  font-size: 14px;
  color: #909399;
}
</style>
