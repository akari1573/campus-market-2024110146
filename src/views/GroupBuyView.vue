<template>
  <section class="page">
    <div class="page-header">
      <h1>拼单搭子</h1>
      <p>找人一起拼、一起玩、一起学。</p>
    </div>

    <div class="list">
      <div
        v-for="item in groupBuys"
        :key="item.id"
        class="list-item"
        @click="router.push(`/detail/${item.id}?type=groupBuy`)"
      >
        <ItemCard
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
            <button class="favorite-btn" @click.stop="handleToggleFavorite(item)">
              {{ favoriteStore.isFavorite('groupBuy', item.id) ? '已收藏' : '收藏' }}
            </button>
            <button
              v-if="item.status === 'open' && item.currentCount < item.targetCount && !isJoined(item.id)"
              class="join-btn"
              @click.stop="joinGroup(item)"
            >
              🤝 加入拼单
            </button>
            <span v-else-if="isJoined(item.id)" class="joined-label">✅ 已加入</span>
          </template>
        </ItemCard>
      </div>
    </div>

    <EmptyState
      v-if="groupBuys.length === 0"
      text="暂无拼单信息"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getGroupBuys, updateGroupBuy, type GroupBuyItem } from '../api/groupBuy'
import { createFavorite, deleteFavorite, getFavorites } from '../api/favorite'
import { useFavoriteStore } from '../stores/favorite'

const router = useRouter()
const favoriteStore = useFavoriteStore()
const groupBuys = ref<GroupBuyItem[]>([])
const userId = 'user_001'

async function handleToggleFavorite(item: GroupBuyItem) {
  if (favoriteStore.isFavorite('groupBuy', item.id)) {
    const recordId = favoriteStore.getApiRecordId('groupBuy', item.id)
    if (recordId) {
      try { await deleteFavorite(recordId) } catch { /* ignore */ }
    }
    favoriteStore.removeFavorite('groupBuy', item.id)
  } else {
    try {
      const res = await createFavorite({ itemType: 'groupBuy', itemId: item.id, userId })
      const recordId = res.data.id as string
      favoriteStore.addFavorite({
        id: item.id, type: 'groupBuy',
        title: item.title, description: item.description, location: item.location,
        apiRecordId: recordId,
      })
    } catch {
      favoriteStore.addFavorite({
        id: item.id, type: 'groupBuy',
        title: item.title, description: item.description, location: item.location,
      })
    }
  }
}
const joinedIds = ref<(number | string)[]>(loadJoinedIds())

function loadJoinedIds(): (number | string)[] {
  try {
    return JSON.parse(localStorage.getItem('cm_orders_groupbuys') || '[]')
  } catch {
    return []
  }
}

function saveJoinedIds() {
  localStorage.setItem('cm_orders_groupbuys', JSON.stringify(joinedIds.value))
}

function isJoined(id: number | string) {
  return joinedIds.value.includes(id)
}

onMounted(async () => {
  const res = await getGroupBuys()
  groupBuys.value = res.data

  try {
    const favRes = await getFavorites({ itemType: 'groupBuy', userId })
    for (const fav of favRes.data) {
      const gb = groupBuys.value.find((x) => String(x.id) === String(fav.itemId))
      if (gb && !favoriteStore.isFavorite('groupBuy', gb.id)) {
        favoriteStore.addFavorite({
          id: gb.id, type: 'groupBuy',
          title: gb.title, description: gb.description, location: gb.location,
          apiRecordId: fav.id,
        })
      }
    }
  } catch { /* ignore */ }
})

async function joinGroup(item: GroupBuyItem) {
  const newCount = item.currentCount + 1
  await updateGroupBuy(item.id, { currentCount: newCount })
  item.currentCount = newCount
  joinedIds.value.push(item.id)
  saveJoinedIds()
  ElMessage.success('🎉 你已成功加入拼单！')
}
</script>

<style scoped>
.page { display: flex; flex-direction: column; gap: 20px; }
.page-header { padding: 24px; border-radius: 16px; background: #fff; }
.page-header h1 { margin: 0 0 8px; }
.page-header p { margin: 0; color: #6b7280; }
.list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.list-item { cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
.list-item:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
.progress-text { font-size: 13px; color: #059669; font-weight: 600; }
.status-tag { margin-left: 8px; padding: 2px 10px; border-radius: 999px; font-size: 12px; }
.status-tag.open { background: #dcfce7; color: #16a34a; }
.status-tag.closed { background: #f3f4f6; color: #9ca3af; }
.join-btn { margin-left: 12px; padding: 4px 14px; background: linear-gradient(135deg, #10b981, #059669); color: #fff; border: none; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; }
.join-btn:hover { transform: translateY(-1px); }
.joined-label { margin-left: 12px; font-size: 12px; color: #16a34a; font-weight: 600; }
.favorite-btn {
  margin-left: 12px;
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  background: #f3f4f6;
  color: #374151;
}
</style>
