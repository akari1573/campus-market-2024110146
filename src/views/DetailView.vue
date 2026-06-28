<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)

const detail = {
  title: '二手自行车',
  price: 200,
  category: '数码/电器',
  location: '校本部 3 号楼',
  seller: '张三',
  contact: '138xxxx1234',
  publishTime: '2026-06-20',
  views: 328,
  content: '九成新凤凰牌山地车，买了半年没怎么骑，变速正常，刹车灵敏。因毕业离校低价转让，送车锁一把。',
}
</script>

<template>
  <div>
    <button class="back-btn" @click="router.back()">← 返回</button>

    <div class="detail-card">
      <div class="detail-header">
        <h2>{{ detail.title }}</h2>
        <span class="detail-price">¥{{ detail.price }}</span>
      </div>

      <div class="detail-meta">
        <span>分类：{{ detail.category }}</span>
        <span>发布者：{{ detail.seller }}</span>
        <span>联系方式：{{ detail.contact }}</span>
        <span>发布时间：{{ detail.publishTime }}</span>
        <span>浏览次数：{{ detail.views }}</span>
        <span class="detail-id">商品 ID：{{ id }}</span>
      </div>

      <div class="detail-body">
        <h3>商品描述</h3>
        <p>{{ detail.content }}</p>
      </div>

      <div class="detail-actions">
        <button class="btn-contact">联系卖家</button>
        <button class="btn-fav">收藏</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-btn {
  padding: 6px 16px;
  margin-bottom: 16px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
}

.back-btn:hover {
  color: #409eff;
  border-color: #409eff;
}

.detail-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
}

.detail-header h2 {
  margin: 0;
  font-size: 22px;
  color: #303133;
}

.detail-price {
  font-size: 24px;
  color: #f56c6c;
  font-weight: 700;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  color: #909399;
}

.detail-id {
  color: #409eff;
  font-weight: 600;
}

.detail-body {
  margin-bottom: 24px;
}

.detail-body h3 {
  margin: 0 0 8px;
  font-size: 16px;
  color: #303133;
}

.detail-body p {
  margin: 0;
  color: #606266;
  line-height: 1.8;
  font-size: 14px;
}

.detail-actions {
  display: flex;
  gap: 12px;
}

.btn-contact {
  padding: 10px 28px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.btn-contact:hover {
  background: #66b1ff;
}

.btn-fav {
  padding: 10px 28px;
  background: #fff;
  color: #606266;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.btn-fav:hover {
  color: #409eff;
  border-color: #409eff;
}
</style>
