<template>
  <section class="page">
    <div class="page-header">
      <h1>跑腿委托</h1>
      <p>发布跑腿任务，找人帮你办事。</p>
    </div>

    <div class="list">
      <ItemCard
        v-for="item in errands"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.taskType"
        :location="`${item.from} → ${item.to}`"
        :time="item.deadline"
      >
        <template #footer>
          <strong class="reward">￥{{ item.reward }}</strong>
          <span :class="['status-tag', item.status === 'open' ? 'open' : 'done']">
            {{ item.status === 'open' ? '待接单' : item.status === 'done' ? '已完成' : '已接单' }}
          </span>
        </template>
      </ItemCard>
    </div>

    <EmptyState
      v-if="errands.length === 0"
      text="暂无委托任务"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getErrands, type ErrandItem } from '../api/errand'

const errands = ref<ErrandItem[]>([])

onMounted(async () => {
  const res = await getErrands()
  errands.value = res.data
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

.reward {
  color: #ef4444;
  font-size: 18px;
}

.status-tag {
  margin-left: 12px;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
}

.status-tag.open {
  background: #fef3c7;
  color: #d97706;
}

.status-tag.done {
  background: #f3f4f6;
  color: #9ca3af;
}
</style>
