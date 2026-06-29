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
        :time="`截止 ${item.deadline}`"
      >
        <template #footer>
          <strong class="reward">￥{{ item.reward }}</strong>
          <span :class="['status-tag', getStatusClass(item.status)]">
            {{ getStatusText(item.status) }}
          </span>
          <button
            v-if="item.status === 'open'"
            class="take-btn"
            @click="takeTask(item)"
          >
            ✋ 我要接单
          </button>
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
import { ElMessage } from 'element-plus'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getErrands, updateErrand, type ErrandItem } from '../api/errand'

const errands = ref<ErrandItem[]>([])

onMounted(async () => {
  const res = await getErrands()
  errands.value = res.data
})

function getStatusText(status: string) {
  if (status === 'open') return '待接单'
  if (status === 'done') return '已完成'
  return '已接单'
}

function getStatusClass(status: string) {
  if (status === 'open') return 'open'
  if (status === 'done') return 'done'
  return 'taken'
}

async function takeTask(item: ErrandItem) {
  await updateErrand(item.id, { status: 'taken' })
  item.status = 'taken'
  ElMessage.success('✅ 接单成功！请及时联系发布者确认取件信息。')
}
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

.status-tag.taken {
  background: #dbeafe;
  color: #2563eb;
}

.status-tag.done {
  background: #f3f4f6;
  color: #9ca3af;
}

.take-btn {
  margin-left: 12px;
  padding: 4px 14px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.take-btn:hover {
  transform: translateY(-1px);
}
</style>
