<template>
  <section class="page">
    <div class="page-header">
      <h1>拼单搭子</h1>
      <p>找人一起拼、一起玩、一起学。</p>
    </div>

    <div class="list">
      <ItemCard
        v-for="item in groupBuys"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type"
        :location="item.location"
        :time="item.deadline"
      >
        <template #footer>
          <span class="progress-text">
            已拼 {{ item.currentCount }}/{{ item.targetCount }} 人
          </span>
          <span :class="['status-tag', item.status === 'open' ? 'open' : 'closed']">
            {{ item.status === 'open' ? '拼单中' : '已结束' }}
          </span>
        </template>
      </ItemCard>
    </div>

    <EmptyState
      v-if="groupBuys.length === 0"
      text="暂无拼单信息"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'

const groupBuys = ref<GroupBuyItem[]>([])

onMounted(async () => {
  const res = await getGroupBuys()
  groupBuys.value = res.data
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-header {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

.page-header h1 {
  margin: 0 0 8px;
}

.page-header p {
  margin: 0;
  color: #6b7280;
}

.list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.progress-text {
  font-size: 13px;
  color: #059669;
  font-weight: 600;
}

.status-tag {
  margin-left: 12px;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
}

.status-tag.open {
  background: #dcfce7;
  color: #16a34a;
}

.status-tag.closed {
  background: #f3f4f6;
  color: #9ca3af;
}
</style>
