<template>
  <section class="page">
    <div class="page-header">
      <h1>失物招领</h1>
      <p>丢了东西别着急，捡到东西来这里。</p>
    </div>

    <div class="tab-bar">
      <button :class="['tab-btn', { active: tab === 'lost' }]" @click="tab = 'lost'">失物信息</button>
      <button :class="['tab-btn', { active: tab === 'found' }]" @click="tab = 'found'">招领信息</button>
    </div>

    <div class="list">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="list-item"
        @click="router.push(`/detail/${item.id}?type=lostFound`)"
      >
        <ItemCard
          :title="item.title"
          :description="item.description"
          :tag="item.type === 'lost' ? '失物' : '招领'"
          :location="item.location"
          :time="item.eventTime"
        >
          <template #footer>
            <span class="item-name">{{ item.itemName }}</span>
            <span class="contact">{{ item.contact }}</span>
            <button class="favorite-btn" @click.stop="favoriteStore.toggleFavorite({
              id: item.id,
              type: 'lostFound',
              title: item.title,
              description: item.description,
              location: item.location
            })">
              {{ favoriteStore.isFavorite('lostFound', item.id) ? '已收藏' : '收藏' }}
            </button>
          </template>
        </ItemCard>
      </div>
    </div>

    <EmptyState
      v-if="filteredItems.length === 0"
      :text="tab === 'lost' ? '暂无失物信息' : '暂无招领信息'"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getLostFounds, type LostFoundItem } from '../api/lostFound'
import { useFavoriteStore } from '../stores/favorite'

const router = useRouter()
const favoriteStore = useFavoriteStore()
const lostFounds = ref<LostFoundItem[]>([])
const tab = ref<'lost' | 'found'>('lost')

const filteredItems = computed(() =>
  lostFounds.value.filter((item) => item.type === tab.value)
)

onMounted(async () => {
  const res = await getLostFounds()
  lostFounds.value = res.data
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

.tab-bar {
  display: flex;
  gap: 0;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 4px;
  width: fit-content;
}

.tab-btn {
  padding: 10px 24px;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 9px;
  transition: all 0.2s;
}

.tab-btn.active {
  background: #fff;
  color: #dc2626;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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

.item-name {
  font-size: 13px;
  color: #374151;
}

.contact {
  margin-left: 16px;
  font-size: 12px;
  color: #9ca3af;
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
