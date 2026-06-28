<script setup lang="ts">
const errandTypes = [
  { icon: '📦', label: '代取快递', desc: '没空取快递？找人代拿' },
  { icon: '🍱', label: '代买饭菜', desc: '不想出门？帮忙带饭' },
  { icon: '📋', label: '代办事务', desc: '打印文件、交材料等' },
  { icon: '🏃', label: '校园跑腿', desc: '教学楼、宿舍楼之间速递' },
]
</script>

<template>
  <div class="errand-page">
    <div class="page-header">
      <h2>🏃 跑腿委托</h2>
      <p class="page-subtitle">发布跑腿任务，找人帮你办事</p>
    </div>

    <div class="type-grid">
      <div v-for="t in errandTypes" :key="t.label" class="type-card">
        <span class="type-icon">{{ t.icon }}</span>
        <h3 class="type-label">{{ t.label }}</h3>
        <p class="type-desc">{{ t.desc }}</p>
      </div>
    </div>

    <div class="empty-hint">
      <span class="empty-icon">🚀</span>
      <p>跑腿任务列表将在后续开发中接入数据</p>
    </div>
  </div>
</template>

<style scoped>
.errand-page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px;
}

.page-subtitle {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.type-card {
  text-align: center;
  padding: 28px 16px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}

.type-card:nth-child(1):hover { border-bottom-color: #f59e0b; }
.type-card:nth-child(2):hover { border-bottom-color: #ef4444; }
.type-card:nth-child(3):hover { border-bottom-color: #8b5cf6; }
.type-card:nth-child(4):hover { border-bottom-color: #3b82f6; }

.type-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

.type-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 12px;
}

.type-label {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 6px;
}

.type-desc {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}

.empty-hint {
  text-align: center;
  padding: 80px 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
}

.empty-icon {
  font-size: 64px;
  display: block;
  margin-bottom: 16px;
}

.empty-hint p {
  font-size: 15px;
  color: #64748b;
  margin: 0;
}

@media (max-width: 768px) {
  .type-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
