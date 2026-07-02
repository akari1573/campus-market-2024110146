<template>
  <section class="page">
    <div class="page-header">
      <h1>跑腿委托</h1>
      <p>发布跑腿任务，找人帮你办事。</p>
    </div>

    <SearchBar
      v-model="keyword"
      placeholder="搜索任务标题、类型、地点或描述"
    />

    <LoadingState
      v-if="loading"
      text="正在加载跑腿委托信息..."
    />

    <ErrorState
      v-else-if="error"
      message="跑腿委托数据加载失败，请检查 Mock 服务是否正常运行。"
      show-retry
      @retry="loadErrands"
    />

    <EmptyState
      v-else-if="filteredErrands.length === 0"
      text="暂无符合条件的委托任务"
    />

    <div v-else class="list">
      <div
        v-for="item in filteredErrands"
        :key="item.id"
        class="list-item"
        @click="router.push(`/detail/${item.id}?type=errand`)"
      >
        <ItemCard
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
              class="favorite-btn"
              :class="{ active: favoriteStore.isFavorite('errand', item.id) }"
              @click.stop="handleToggleFavorite(item)"
            >
              {{ favoriteStore.isFavorite('errand', item.id) ? '已收藏' : '收藏' }}
            </button>
            <button
              v-if="item.status === 'open' && !isTaken(item.id)"
              class="take-btn"
              @click.stop="takeTask(item)"
            >
              我要接单
            </button>
            <span v-else-if="isTaken(item.id)" class="taken-label">已接单</span>
          </template>
        </ItemCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import ErrorState from '../components/ErrorState.vue'
import LoadingState from '../components/LoadingState.vue'
import SearchBar from '../components/SearchBar.vue'
import { getErrands, updateErrand, type ErrandItem } from '../api/errand'
import { createFavorite, deleteFavorite, getFavorites } from '../api/favorite'
import { useFavoriteStore } from '../stores/favorite'

const router = useRouter()
const favoriteStore = useFavoriteStore()
const errands = ref<ErrandItem[]>([])
const loading = ref(false)
const error = ref(false)
const userId = 'user_001'

const keyword = ref('')

const filteredErrands = computed(() => {
  const value = keyword.value.trim()

  if (!value) {
    return errands.value
  }

  return errands.value.filter((item) => {
    return (
      item.title.includes(value) ||
      item.taskType.includes(value) ||
      item.from.includes(value) ||
      item.to.includes(value) ||
      item.description.includes(value)
    )
  })
})

async function loadErrands() {
  loading.value = true
  error.value = false

  try {
    const res = await getErrands()
    errands.value = res.data

    try {
      const favRes = await getFavorites({ itemType: 'errand', userId })
      for (const fav of favRes.data) {
        const e = errands.value.find((x) => String(x.id) === String(fav.itemId))
        if (e && !favoriteStore.isFavorite('errand', e.id)) {
          favoriteStore.addFavorite({
            id: e.id, type: 'errand',
            title: e.title, description: e.description,
            location: `${e.from} → ${e.to}`,
            apiRecordId: fav.id,
          })
        }
      }
    } catch { /* ignore */ }
  } catch (err) {
    console.error(err)
    error.value = true
  } finally {
    loading.value = false
  }
}

async function handleToggleFavorite(item: ErrandItem) {
  if (favoriteStore.isFavorite('errand', item.id)) {
    const recordId = favoriteStore.getApiRecordId('errand', item.id)
    if (recordId) {
      try { await deleteFavorite(recordId) } catch { /* ignore */ }
    }
    favoriteStore.removeFavorite('errand', item.id)
  } else {
    try {
      const res = await createFavorite({ itemType: 'errand', itemId: item.id, userId })
      const recordId = res.data.id as string
      favoriteStore.addFavorite({
        id: item.id, type: 'errand',
        title: item.title, description: item.description,
        location: `${item.from} → ${item.to}`,
        apiRecordId: recordId,
      })
    } catch {
      favoriteStore.addFavorite({
        id: item.id, type: 'errand',
        title: item.title, description: item.description,
        location: `${item.from} → ${item.to}`,
      })
    }
  }
}

const takenIds = ref<(number | string)[]>(loadTakenIds())

function loadTakenIds(): (number | string)[] {
  try {
    return JSON.parse(localStorage.getItem('cm_orders_errands') || '[]')
  } catch {
    return []
  }
}

function saveTakenIds() {
  localStorage.setItem('cm_orders_errands', JSON.stringify(takenIds.value))
}

function isTaken(id: number | string) {
  return takenIds.value.includes(id)
}

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
  takenIds.value.push(item.id)
  saveTakenIds()
  ElMessage.success('接单成功！请及时联系发布者确认取件信息。')
}

onMounted(() => {
  loadErrands()
})
</script>

<style scoped>
.page { display: flex; flex-direction: column; gap: 20px; }
.page-header { padding: 24px; border-radius: 16px; background: #fff; }
.page-header h1 { margin: 0 0 8px; }
.page-header p { margin: 0; color: #6b7280; }
.list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.list-item { cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
.list-item:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
.reward { color: #ef4444; font-size: 18px; }
.status-tag { margin-left: 12px; padding: 2px 10px; border-radius: 999px; font-size: 12px; }
.status-tag.open { background: #fef3c7; color: #d97706; }
.status-tag.taken { background: #dbeafe; color: #2563eb; }
.status-tag.done { background: #f3f4f6; color: #9ca3af; }
.take-btn { margin-left: 12px; padding: 4px 14px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; border: none; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; }
.take-btn:hover { transform: translateY(-1px); }
.taken-label { margin-left: 12px; font-size: 12px; color: #2563eb; font-weight: 600; }
.favorite-btn {
  margin-left: 12px;
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  background: #f3f4f6;
  color: #374151;
}
.favorite-btn.active {
  background: #dbeafe;
  color: #2563eb;
}
</style>
