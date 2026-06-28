<script setup lang="ts">
import { useMarketStore } from '@/stores/market'
import { useRouter } from 'vue-router'

const store = useMarketStore()
const router = useRouter()

function goDetail(id: number) {
  router.push(`/detail/${id}`)
}
</script>

<template>
  <div class="list-page">
    <div class="list-header">
      <h2 class="list-title">🛍️ 商品列表</h2>
      <span class="list-count">共 {{ store.products.length }} 件商品</span>
    </div>

    <div class="list-grid">
      <div
        v-for="item in store.products"
        :key="item.id"
        class="product-card"
        @click="goDetail(item.id)"
      >
        <div class="card-img-box">
          <img v-if="item.image" :src="item.image" class="card-img" />
          <span v-else class="card-img-placeholder">
            <span class="img-icon">📸</span>
          </span>
          <span class="card-category">{{ item.category }}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-desc">{{ item.desc }}</p>
          <div class="card-footer">
            <span class="card-price">¥{{ item.price }}</span>
            <span class="card-meta">
              <span class="meta-seller">{{ item.seller }}</span>
              <span class="meta-views">{{ item.views }}次浏览</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-page {
  max-width: 1200px;
  margin: 0 auto;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.list-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.list-count {
  font-size: 14px;
  color: #64748b;
  background: #f1f5f9;
  padding: 4px 14px;
  border-radius: 12px;
}

.list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.product-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.card-img-box {
  position: relative;
  height: 180px;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-icon {
  font-size: 48px;
  opacity: 0.35;
}

.card-category {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  color: #fff;
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 8px;
}

.card-body {
  padding: 16px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-desc {
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-price {
  font-size: 20px;
  font-weight: 800;
  color: #ef4444;
}

.card-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.meta-seller {
  font-size: 12px;
  color: #475569;
}

.meta-views {
  font-size: 11px;
  color: #94a3b8;
}
</style>
