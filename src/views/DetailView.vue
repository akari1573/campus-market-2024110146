<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useMarketStore } from '@/stores/market'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const store = useMarketStore()

const id = Number(route.params.id)
const detail = computed(() => store.getProductById(id))

store.incrementViews(id)

function contactSeller() {
  if (!detail.value) return
  ElMessage.success(`已向卖家 ${detail.value.seller} 发送消息（联系方式：${detail.value.contact}）`)
}

function addFavorite() {
  ElMessage.success('已加入收藏夹')
}
</script>

<template>
  <div class="detail-page">
    <button class="back-btn" @click="router.back()">← 返回列表</button>

    <div v-if="!detail" class="not-found">
      <span class="nf-icon">🔍</span>
      <h2>商品未找到</h2>
      <p>该商品可能已被删除或下架</p>
      <button class="nf-btn" @click="router.push('/list')">返回商品列表</button>
    </div>

    <template v-else>
      <div class="detail-card">
        <div class="detail-img-section">
          <img v-if="detail.image" :src="detail.image" class="detail-img" />
          <div v-else class="detail-img-placeholder">
            <span class="placeholder-icon">📸</span>
            <span class="placeholder-text">暂无商品图片</span>
          </div>
        </div>

        <div class="detail-info">
          <div class="detail-header">
            <h2 class="detail-title">{{ detail.title }}</h2>
            <span class="detail-price">¥{{ detail.price }}</span>
          </div>

          <div class="detail-tags">
            <span class="tag-category">{{ detail.category }}</span>
            <span class="tag-views">👁 {{ detail.views }} 次浏览</span>
            <span class="tag-time">📅 {{ detail.publishTime }}</span>
          </div>

          <div class="detail-meta">
            <div class="meta-row">
              <span class="meta-label">👤 卖家</span>
              <span class="meta-value">{{ detail.seller }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">📍 位置</span>
              <span class="meta-value">{{ detail.location }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">📱 联系方式</span>
              <span class="meta-value">{{ detail.contact }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">🆔 商品 ID</span>
              <span class="meta-value id-value">{{ detail.id }}</span>
            </div>
          </div>

          <div class="detail-body">
            <h3>📝 商品描述</h3>
            <p>{{ detail.content }}</p>
          </div>

          <div class="detail-actions">
            <button class="btn-contact" @click="contactSeller">💬 联系卖家</button>
            <button class="btn-fav" @click="addFavorite">⭐ 收藏</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.detail-page {
  max-width: 1000px;
  margin: 0 auto;
}

.back-btn {
  padding: 8px 18px;
  margin-bottom: 20px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #475569;
  transition: all 0.2s;
}

.back-btn:hover {
  color: #3b82f6;
  border-color: #3b82f6;
}

.not-found {
  text-align: center;
  padding: 80px 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
}

.nf-icon { font-size: 64px; display: block; margin-bottom: 16px; }

.not-found h2 {
  font-size: 22px;
  color: #1e293b;
  margin: 0 0 8px;
}

.not-found p {
  color: #64748b;
  margin: 0 0 20px;
}

.nf-btn {
  padding: 10px 28px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.nf-btn:hover {
  background: #2563eb;
}

.detail-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  overflow: hidden;
}

.detail-img-section {
  height: 360px;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.detail-img-placeholder {
  text-align: center;
}

.placeholder-icon {
  font-size: 72px;
  display: block;
  margin-bottom: 8px;
  opacity: 0.35;
}

.placeholder-text {
  font-size: 14px;
  color: #94a3b8;
}

.detail-info {
  padding: 28px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.detail-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.detail-price {
  font-size: 28px;
  font-weight: 800;
  color: #ef4444;
}

.detail-tags {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tag-category {
  background: #eff6ff;
  color: #3b82f6;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
}

.tag-views,
.tag-time {
  color: #64748b;
  font-size: 13px;
  line-height: 28px;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 10px;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  padding: 6px 0;
}

.meta-label {
  font-size: 13px;
  color: #64748b;
  white-space: nowrap;
}

.meta-value {
  font-size: 14px;
  color: #1e293b;
  font-weight: 500;
}

.id-value {
  color: #3b82f6;
  font-weight: 700;
}

.detail-body {
  margin-bottom: 24px;
}

.detail-body h3 {
  font-size: 17px;
  color: #1e293b;
  margin: 0 0 12px;
}

.detail-body p {
  font-size: 14px;
  color: #475569;
  line-height: 1.9;
  margin: 0;
}

.detail-actions {
  display: flex;
  gap: 14px;
}

.btn-contact {
  flex: 1;
  padding: 14px 0;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-contact:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(59,130,246,0.35);
}

.btn-fav {
  padding: 14px 32px;
  background: #fff;
  border: 2px solid #fbbf24;
  color: #d97706;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-fav:hover {
  background: #fffbeb;
  border-color: #f59e0b;
}

@media (max-width: 768px) {
  .detail-img-section { height: 240px; }
  .detail-header { flex-direction: column; align-items: flex-start; gap: 8px; }
}
</style>
