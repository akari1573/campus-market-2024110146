<script setup lang="ts">
const categories = ['数码/电器', '书籍/资料', '生活用品', '文体/娱乐', '服饰/鞋包', '美妆/个护', '食品/饮料', '其他']
</script>

<template>
  <div class="trade-page">
    <div class="page-header">
      <h2>🛒 二手交易</h2>
      <p class="page-subtitle">发现校园好物，淘到心动宝贝</p>
    </div>

    <div class="category-bar">
      <span
        v-for="cat in categories"
        :key="cat"
        class="category-tag"
      >{{ cat }}</span>
    </div>

    <div class="empty-hint">
      <span class="empty-icon">📦</span>
      <p>商品列表将在后续开发中接入数据</p>
    </div>
  </div>
</template>

<style scoped>
.trade-page {
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

.category-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.category-tag {
  padding: 8px 18px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-size: 13px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}

.category-tag:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #eff6ff;
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
