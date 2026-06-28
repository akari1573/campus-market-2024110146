<script setup lang="ts">
import { useMarketStore } from '@/stores/market'
import { useRouter } from 'vue-router'

const store = useMarketStore()
const router = useRouter()

function goToPublish() {
  router.push('/publish')
}
</script>

<template>
  <div class="user-page">
    <div class="page-header">
      <h2>👤 个人中心</h2>
      <p class="page-subtitle">管理你的资料、发布和收藏</p>
    </div>

    <div class="user-card">
      <div class="user-banner"></div>
      <div class="user-info">
        <div class="user-avatar">
          <img v-if="store.userInfo.avatar" :src="store.userInfo.avatar" class="avatar-img" />
          <span v-else class="avatar-placeholder">{{ store.userInfo.name.slice(0, 1) }}</span>
        </div>
        <div class="user-details">
          <h3 class="user-name">{{ store.userInfo.name }}</h3>
          <p class="user-signature">{{ store.userInfo.signature || '这个人很懒，什么都没写~' }}</p>
        </div>
      </div>
    </div>

    <div class="menu-grid">
      <div class="menu-item" @click="goToPublish">
        <span class="menu-icon">📝</span>
        <span class="menu-label">我的发布</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">⭐</span>
        <span class="menu-label">我的收藏</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">📊</span>
        <span class="menu-label">浏览记录</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">⚙️</span>
        <span class="menu-label">账号设置</span>
      </div>
    </div>

    <div class="empty-hint">
      <span class="empty-icon">🔧</span>
      <p>个人中心功能将在后续开发中完善</p>
    </div>
  </div>
</template>

<style scoped>
.user-page {
  max-width: 900px;
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

.user-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  overflow: hidden;
  margin-bottom: 28px;
}

.user-banner {
  height: 120px;
  background: linear-gradient(135deg, #f97316, #ea580c);
}

.user-info {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  padding: 0 28px 24px;
  margin-top: -50px;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  font-size: 42px;
  font-weight: 700;
  color: #f97316;
}

.user-details {
  padding-bottom: 8px;
}

.user-name {
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px;
}

.user-signature {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px 16px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.menu-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

.menu-icon {
  font-size: 32px;
}

.menu-label {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.empty-hint {
  text-align: center;
  padding: 60px 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
}

.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.empty-hint p {
  font-size: 15px;
  color: #64748b;
  margin: 0;
}

@media (max-width: 768px) {
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
