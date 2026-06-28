<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('lost')
</script>

<template>
  <div class="lostfound-page">
    <div class="page-header">
      <h2>🔍 失物招领</h2>
      <p class="page-subtitle">丢了东西别着急，捡到东西来这里</p>
    </div>

    <div class="tab-bar">
      <button
        :class="['tab-btn', { active: activeTab === 'lost' }]"
        @click="activeTab = 'lost'"
      >
        😢 失物信息
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'found' }]"
        @click="activeTab = 'found'"
      >
        🙌 招领信息
      </button>
    </div>

    <div class="empty-hint">
      <span class="empty-icon">{{ activeTab === 'lost' ? '🔑' : '🎒' }}</span>
      <p>{{ activeTab === 'lost' ? '暂无失物信息，数据将在后续开发中接入' : '暂无招领信息，数据将在后续开发中接入' }}</p>
    </div>
  </div>
</template>

<style scoped>
.lostfound-page {
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

.tab-bar {
  display: flex;
  gap: 0;
  margin-bottom: 32px;
  background: #f1f5f9;
  border-radius: 10px;
  padding: 4px;
  width: fit-content;
}

.tab-btn {
  padding: 10px 24px;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}

.tab-btn.active {
  background: #fff;
  color: #3b82f6;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.tab-btn:hover:not(.active) {
  color: #1e293b;
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
</style>
