<template>
  <section class="page">
    <div class="page-header">
      <h1>二手交易</h1>
      <p>浏览同学发布的闲置物品，发现校园内的实用好物。</p>
    </div>

    <div class="list">
      <div
        v-for="item in trades"
        :key="item.id"
        class="list-item"
        @click="router.push(`/detail/${item.id}?type=trade`)"
      >
        <ItemCard
          :title="item.title"
          :description="item.description"
          :tag="item.category"
          :location="item.location"
          :time="item.publishTime"
        >
          <template #footer>
            <strong>￥{{ item.price }}</strong>
            <span class="condition">{{ item.condition }}</span>
            <button class="favorite-btn" @click.stop="handleToggleFavorite(item)">
              {{ favoriteStore.isFavorite('trade', item.id) ? '已收藏' : '收藏' }}
            </button>
          </template>
        </ItemCard>
      </div>
    </div>

    <EmptyState
      v-if="trades.length === 0"
      text="暂无二手交易信息"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getTrades, type TradeItem } from '../api/trade'
import { createFavorite, deleteFavorite, getFavorites } from '../api/favorite'
import { useFavoriteStore } from '../stores/favorite'

const router = useRouter()
const favoriteStore = useFavoriteStore()
const trades = ref<TradeItem[]>([])
const userId = 'user_001'

async function handleToggleFavorite(item: TradeItem) {
  if (favoriteStore.isFavorite('trade', item.id)) {
    const recordId = favoriteStore.getApiRecordId('trade', item.id)
    if (recordId) {
      try { await deleteFavorite(recordId) } catch { /* ignore */ }
    }
    favoriteStore.removeFavorite('trade', item.id)
  } else {
    try {
      const res = await createFavorite({ itemType: 'trade', itemId: item.id, userId })
      const recordId = res.data.id as string
      favoriteStore.addFavorite({
        id: item.id, type: 'trade',
        title: item.title, description: item.description, location: item.location,
        apiRecordId: recordId,
      })
    } catch {
      favoriteStore.addFavorite({
        id: item.id, type: 'trade',
        title: item.title, description: item.description, location: item.location,
      })
    }
  }
}

onMounted(async () => {
  const res = await getTrades()
  trades.value = res.data

  try {
    const favRes = await getFavorites({ itemType: 'trade', userId })
    for (const fav of favRes.data) {
      const t = trades.value.find((x) => String(x.id) === String(fav.itemId))
      if (t && !favoriteStore.isFavorite('trade', t.id)) {
        favoriteStore.addFavorite({
          id: t.id, type: 'trade',
          title: t.title, description: t.description, location: t.location,
          apiRecordId: fav.id,
        })
      }
    }
  } catch { /* ignore */ }
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

.list-item {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.list-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.condition {
  margin-left: 12px;
  color: #6b7280;
}

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
