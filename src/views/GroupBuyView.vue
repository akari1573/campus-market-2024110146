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
        :time="`截止 ${item.deadline}`"
      >
        <template #footer>
          <span class="progress-text">
            已拼 {{ item.currentCount }}/{{ item.targetCount }} 人
          </span>
          <span :class="['status-tag', item.status === 'open' ? 'open' : 'closed']">
            {{ item.status === 'open' ? '拼单中' : '已结束' }}
          </span>
          <button
            v-if="item.status === 'open' && item.currentCount < item.targetCount"
            class="join-btn"
            @click="joinGroup(item)"
          >
            🤝 加入拼单
          </button>
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
import { ElMessage } from 'element-plus'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getGroupBuys, updateGroupBuy, type GroupBuyItem } from '../api/groupBuy'

const groupBuys = ref<GroupBuyItem[]>([])

onMounted(async () => {
  const res = await getGroupBuys()
  groupBuys.value = res.data
})

async function joinGroup(item: GroupBuyItem) {
  const newCount = item.currentCount + 1
  await updateGroupBuy(item.id, { currentCount: newCount })
  item.currentCount = newCount
  ElMessage.success('🎉 你已成功加入拼单！请准时到达集合地点。')
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

.progress-text {
  font-size: 13px;
  color: #059669;
  font-weight: 600;
}

.status-tag {
  margin-left: 8px;
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

.join-btn {
  margin-left: 12px;
  padding: 4px 14px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.join-btn:hover {
  transform: translateY(-1px);
}
</style>
