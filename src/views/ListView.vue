<script setup lang="ts">
const items = [
  { id: 1, title: '二手自行车', price: 200, desc: '九成新，买了半年没怎么骑' },
  { id: 2, title: '考研数学资料', price: 35, desc: '几乎全新，做了几页笔记' },
  { id: 3, title: '机械键盘 Cherry 轴', price: 150, desc: '青轴，手感极佳，毕业出' },
  { id: 4, title: '床上折叠桌', price: 25, desc: '懒人必备，可调节高度' },
  { id: 5, title: 'Kindle Paperwhite 4', price: 400, desc: '国行，带背光，轻微划痕' },
]
</script>

<template>
  <div>
    <h2>商品列表</h2>
    <div class="list">
      <router-link
        v-for="item in items"
        :key="item.id"
        :to="`/detail/${item.id}`"
        class="card"
      >
        <div class="card-header">
          <span class="card-title">{{ item.title }}</span>
          <span class="card-price">¥{{ item.price }}</span>
        </div>
        <p class="card-desc">{{ item.desc }}</p>
        <span class="card-link">查看详情 →</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin: 0 0 20px;
  color: #303133;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s, transform 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.card-price {
  font-size: 18px;
  color: #f56c6c;
  font-weight: 700;
}

.card-desc {
  margin: 0 0 12px;
  color: #909399;
  font-size: 13px;
  line-height: 1.5;
}

.card-link {
  margin-top: auto;
  font-size: 13px;
  color: #409eff;
}
</style>
