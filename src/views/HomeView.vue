<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMarketStore } from '@/stores/market'
import { computed } from 'vue'

const router = useRouter()
const store = useMarketStore()

const stats = computed(() => [
  { label: '商品总数', value: store.products.length, icon: '📦', color: '#3b82f6' },
  { label: '今日上新', value: store.products.filter(p => p.publishTime === new Date().toISOString().slice(0, 10)).length || 48, icon: '🆕', color: '#10b981' },
  { label: '活跃用户', value: 1256, icon: '👥', color: '#f59e0b' },
  { label: '未读消息', value: store.unreadCount, icon: '💬', color: '#ef4444' },
])

const features = [
  { icon: '🛒', title: '海量好物', desc: '二手书籍、数码产品、生活用品，应有尽有' },
  { icon: '💰', title: '超值价格', desc: '学长学姐毕业甩卖，价格实惠，物超所值' },
  { icon: '📍', title: '同校交易', desc: '无需快递，校内当面交易，安全便捷' },
  { icon: '🔒', title: '实名认证', desc: '校园身份认证，买卖双方真实可信' },
]

function goToList() {
  router.push('/list')
}
function goToPublish() {
  router.push('/publish')
}
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-circle c1"></div>
        <div class="hero-circle c2"></div>
        <div class="hero-circle c3"></div>
        <div class="hero-circle c4"></div>
        <div class="hero-dot d1"></div>
        <div class="hero-dot d2"></div>
        <div class="hero-dot d3"></div>
        <div class="hero-dot d4"></div>
        <div class="hero-dot d5"></div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">🏫 校园专属交易平台</div>
        <h1 class="hero-title">校园轻集市</h1>
        <p class="hero-subtitle">
          你的校园二手好物交易平台<br />
          买卖更简单，生活更美好
        </p>
        <div class="hero-actions">
          <button class="btn-primary" @click="goToList">🚀 立即淘好物</button>
          <button class="btn-outline" @click="goToPublish">📝 发布商品</button>
        </div>
      </div>
    </section>

    <section class="stats-section">
      <div v-for="s in stats" :key="s.label" class="stat-item">
        <span class="stat-icon">{{ s.icon }}</span>
        <span class="stat-num" :style="{ color: s.color }">{{ s.value }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </section>

    <section class="features-section">
      <h2 class="section-title">为什么选择校园轻集市？</h2>
      <div class="features-grid">
        <div v-for="f in features" :key="f.title" class="feature-card">
          <span class="feature-icon">{{ f.icon }}</span>
          <h3 class="feature-title">{{ f.title }}</h3>
          <p class="feature-desc">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <section class="hot-section">
      <h2 class="section-title">🔥 热门推荐</h2>
      <div class="hot-grid">
        <div
          v-for="p in store.products.slice(0, 4)"
          :key="p.id"
          class="hot-card"
          @click="router.push(`/detail/${p.id}`)"
        >
          <div class="hot-img-box">
            <img v-if="p.image" :src="p.image" class="hot-img" />
            <span v-else class="hot-placeholder">{{ p.title.slice(0, 2) }}</span>
          </div>
          <div class="hot-info">
            <span class="hot-title">{{ p.title }}</span>
            <span class="hot-price">¥{{ p.price }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  border-radius: 20px;
  padding: 60px 48px;
  margin-bottom: 32px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
  background: #fff;
}

.c1 { width: 300px; height: 300px; top: -80px; right: -60px; }
.c2 { width: 200px; height: 200px; bottom: -40px; left: -40px; }
.c3 { width: 120px; height: 120px; top: 40px; left: 50%; }
.c4 { width: 80px; height: 80px; bottom: 60px; right: 40%; }

.hero-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
}

.d1 { top: 60px; left: 100px; }
.d2 { top: 100px; right: 200px; }
.d3 { bottom: 80px; left: 300px; }
.d4 { bottom: 40px; right: 120px; }
.d5 { top: 50%; left: 40px; }

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-block;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(8px);
  color: #fff;
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 52px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 16px;
  letter-spacing: 4px;
  text-shadow: 0 2px 12px rgba(0,0,0,0.15);
}

.hero-subtitle {
  font-size: 18px;
  color: rgba(255,255,255,0.9);
  margin: 0 0 32px;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 16px;
}

.btn-primary {
  padding: 14px 32px;
  background: #fff;
  color: #2563eb;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.btn-outline {
  padding: 14px 32px;
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255,255,255,0.5);
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}

.btn-outline:hover {
  background: rgba(255,255,255,0.12);
  border-color: #fff;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  transition: transform 0.2s, box-shadow 0.2s;
  border-top: 3px solid transparent;
}

.stat-item:nth-child(1) { border-top-color: #3b82f6; }
.stat-item:nth-child(2) { border-top-color: #10b981; }
.stat-item:nth-child(3) { border-top-color: #f59e0b; }
.stat-item:nth-child(4) { border-top-color: #ef4444; }

.stat-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

.stat-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.stat-num {
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 24px;
  text-align: center;
}

.features-section {
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.feature-card {
  text-align: center;
  padding: 32px 20px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  transition: transform 0.2s, box-shadow 0.2s;
  border-bottom: 3px solid transparent;
}

.feature-card:nth-child(1):hover { border-bottom-color: #3b82f6; }
.feature-card:nth-child(2):hover { border-bottom-color: #10b981; }
.feature-card:nth-child(3):hover { border-bottom-color: #f59e0b; }
.feature-card:nth-child(4):hover { border-bottom-color: #ef4444; }

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 44px;
  display: block;
  margin-bottom: 12px;
}

.feature-title {
  font-size: 17px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px;
}

.feature-desc {
  font-size: 13px;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.hot-section {
  padding-bottom: 40px;
}

.hot-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.hot-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.hot-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.hot-img-box {
  height: 160px;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hot-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hot-placeholder {
  font-size: 36px;
  color: #94a3b8;
  font-weight: 700;
}

.hot-info {
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hot-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  margin-right: 8px;
}

.hot-price {
  font-size: 16px;
  font-weight: 700;
  color: #ef4444;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .hero { padding: 40px 24px; }
  .hero-title { font-size: 32px; }
  .stats-section { grid-template-columns: repeat(2, 1fr); }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .hot-grid { grid-template-columns: repeat(2, 1fr); }
  .hero-actions { flex-direction: column; }
}
</style>
