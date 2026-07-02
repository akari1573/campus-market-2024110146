<template>
  <div class="page">
    <div class="page-header">
      <h1>个人中心</h1>
      <p>管理你的个人资料、收藏和已发布的商品信息。</p>
    </div>
    <div class="profile-card">
      <div class="banner" />
      <div class="profile-info">
        <div class="avt-wrap"><img :src="profile.avatar" alt="" /></div>
        <div class="user-text">
          <div class="user-name">{{ profile.name }} <el-tag size="small" type="success">✅ 已认证</el-tag></div>
          <div class="user-sign">{{ profile.signature }} · {{ profile.college }}</div>
          <div class="user-detail">
            <span>📱 {{ profile.phone }}</span><span>🏫 {{ profile.campus }}</span><span>🏠 {{ profile.dorm }}</span>
          </div>
        </div>
        <el-button @click="showEditDialog = true">✏️ 编辑资料</el-button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <div class="stat-num" :style="{ color: s.color }">{{ s.value }}</div>
        <div class="stat-label">{{ s.label }}</div>
      </div>
    </div>

    <!-- My Orders -->
    <div v-if="orderItems.length > 0" class="section-card">
      <h3>📦 我的订单</h3>
      <div class="order-list">
        <div v-for="o in orderItems" :key="o._key" class="order-item" @click="goToOrder(o)">
          <span class="order-type">{{ o._typeLabel }}</span>
          <span class="order-title">{{ o.title || o._title }}</span>
          <span class="order-price">{{ o._price }}</span>
          <span class="order-status">{{ o._status }}</span>
        </div>
      </div>
    </div>

    <!-- Menu -->
    <div class="menu-grid">
      <div class="menu-item" @click="showMyPublished = !showMyPublished">
        <span class="menu-icon">📋</span><span class="menu-label">我的发布</span>
        <span class="menu-count">{{ myPublished.length }}件</span>
      </div>
      <div class="menu-item" @click="showFavorites = !showFavorites">
        <span class="menu-icon">⭐</span><span class="menu-label">我的收藏</span>
        <span class="menu-count">{{ favoriteItems.length }}件</span>
      </div>
      <div class="menu-item" @click="router.push('/message')">
        <span class="menu-icon">💬</span><span class="menu-label">我的消息</span>
      </div>
      <div class="menu-item" @click="showEditDialog = true">
        <span class="menu-icon">⚙️</span><span class="menu-label">账号设置</span>
      </div>
    </div>

    <!-- My Published List -->
    <div v-if="showMyPublished" class="section-card">
      <h3>📋 我的发布 <button class="section-close" @click="showMyPublished = false">✕</button></h3>
      <div v-if="myPublished.length === 0" class="section-empty">暂无发布</div>
      <div v-for="p in myPublished" :key="p._key" class="list-row" @click="goToDetail(p._type, (p as any).id ?? p.id)">
        <span class="list-title">{{ p.title || (p as any)._title }}</span>
        <span class="list-meta">{{ p._meta }}</span>
        <span :class="['list-status', (p as any).status]">{{ p._status }}</span>
        <button class="list-action" @click.stop="markItemSold(p)">标记已售</button>
        <button class="list-action danger" @click.stop="deleteMyItem(p)">删除</button>
      </div>
    </div>

    <!-- Favorites -->
    <div v-if="showFavorites" class="section-card">
      <h3>⭐ 我的收藏 <button class="section-close" @click="showFavorites = false">✕</button></h3>
      <div v-if="favoriteItems.length === 0" class="section-empty">
        暂无收藏，去 <router-link to="/trade">二手交易</router-link> 逛逛吧
      </div>
      <div v-for="f in favoriteItems" :key="f._key" class="list-row" @click="goToDetail(f._type, f.id)">
        <span class="list-title">{{ f.title }}</span>
        <span class="list-meta">{{ f._meta }}</span>
        <button class="list-action" @click.stop="goToDetail(f._type, f.id)">查看</button>
        <button class="list-action danger" @click.stop="removeFavorite(f._type, f.id)">取消收藏</button>
      </div>
    </div>

    <!-- Account Settings Dialog -->
    <el-dialog v-model="showEditDialog" title="编辑资料" width="480px">
      <div class="edit-form">
        <label>头像</label>
        <div class="avatar-edit">
          <div class="avatar-preview">
            <img :src="editForm.avatar" alt="头像预览" />
          </div>
          <label class="avatar-upload-btn">
            <input type="file" accept="image/*" class="avatar-upload-input" @change="handleAvatarUpload" />
            {{ avatarUploading ? '上传中...' : '更换头像' }}
          </label>
          <button v-if="editForm.avatar !== profile.avatar && editForm.avatar !== defaultAvatar" type="button" class="avatar-reset-btn" @click="editForm.avatar = profile.avatar">还原</button>
        </div>
        <label>昵称</label>
        <input v-model="editForm.name" class="form-input" />
        <label>手机号</label>
        <input v-model="editForm.phone" class="form-input" />
        <label>校区</label>
        <input v-model="editForm.campus" class="form-input" />
        <label>宿舍</label>
        <input v-model="editForm.dorm" class="form-input" />
        <label>学院</label>
        <input v-model="editForm.college" class="form-input" />
        <label>个性签名</label>
        <input v-model="editForm.signature" class="form-input" />
      </div>
      <template #footer>
        <el-button @click="showEditDialog = false">取消</el-button>
        <el-button type="primary" @click="saveProfile">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getTrades, updateTrade, deleteTrade, type TradeItem } from '../api/trade'
import { getLostFounds, deleteLostFound, type LostFoundItem } from '../api/lostFound'
import { getGroupBuys, updateGroupBuy, deleteGroupBuy, type GroupBuyItem } from '../api/groupBuy'
import { getErrands, updateErrand, deleteErrand, type ErrandItem } from '../api/errand'
import { getFavorites, deleteFavorite, type FavoriteItem as ApiFavoriteItem } from '../api/favorite'
import { useUserStore } from '../stores/user'
import { useFavoriteStore } from '../stores/favorite'

const router = useRouter()
const userStore = useUserStore()
const favoriteStore = useFavoriteStore()

function syncProfileToStore() {
  userStore.updateProfile({
    name: profile.name,
    college: profile.college,
    avatar: profile.avatar,
    bio: profile.signature,
  })
}

// Profile
const profile = reactive({
  name: userStore.displayName,
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=220&h=220&fit=crop',
  phone: '138xxxx1234',
  campus: '校本部',
  dorm: '3号楼 502',
  college: '计算机学院 大三',
  signature: '热爱生活，喜欢分享',
})

const defaultAvatar = profile.avatar

const showEditDialog = ref(false)
const editForm = reactive({ ...profile })
const avatarUploading = ref(false)

watch(showEditDialog, (opening) => {
  if (opening) {
    Object.assign(editForm, { ...profile })
  }
})

function handleAvatarUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    ElMessage.warning('头像大小不能超过5MB')
    return
  }

  avatarUploading.value = true
  const reader = new FileReader()
  reader.onload = (ev) => {
    const base64 = ev.target?.result as string
    editForm.avatar = base64
    avatarUploading.value = false
  }
  reader.readAsDataURL(file)
}

async function saveProfile() {
  const oldName = profile.name
  const nameChanged = editForm.name !== oldName && editForm.name.trim() !== ''

  Object.assign(profile, { ...editForm })
  localStorage.setItem('cm_user_profile', JSON.stringify({ ...profile }))
  syncProfileToStore()
  showEditDialog.value = false
  ElMessage.success('资料已更新')

  if (nameChanged) {
    const newName = editForm.name.trim()
    try {
      await syncPublisherName(oldName, newName)
      ElMessage.success(`已同步 ${newName} 的发布信息`)
    } catch {
      ElMessage.warning('发布信息同步可能未完全成功，请刷新页面确认')
    }
  }
}

async function syncPublisherName(oldName: string, newName: string) {
  const updates: Promise<unknown>[] = []

  for (const t of allTrades.value) {
    if (t.publisher === oldName) {
      updates.push(updateTrade(t.id, { publisher: newName }))
      t.publisher = newName
    }
  }
  for (const g of allGroupBuys.value) {
    if (g.publisher === oldName) {
      updates.push(updateGroupBuy(g.id, { publisher: newName }))
      g.publisher = newName
    }
  }
  for (const e of allErrands.value) {
    if (e.publisher === oldName) {
      updates.push(updateErrand(e.id, { publisher: newName }))
      e.publisher = newName
    }
  }

  if (updates.length > 0) {
    await Promise.all(updates)
  }
}

function loadProfile() {
  try {
    const saved = localStorage.getItem('cm_user_profile')
    if (saved) Object.assign(profile, JSON.parse(saved))
  } catch { /* ignore */ }
  syncProfileToStore()
}

// Published - all types
const allTrades = ref<TradeItem[]>([])
const allLostFounds = ref<LostFoundItem[]>([])
const allGroupBuys = ref<GroupBuyItem[]>([])
const allErrands = ref<ErrandItem[]>([])
const showMyPublished = ref(false)

interface PublishedItem {
  _key: string
  id: number | string
  _type: string
  title: string
  _meta: string
  _status: string
  status?: string
  _origData: TradeItem | LostFoundItem | GroupBuyItem | ErrandItem
}

const myPublished = computed<PublishedItem[]>(() => [
  ...allTrades.value
    .filter((t) => t.publisher === profile.name)
    .map((t) => ({
      _key: `trade-${t.id}`,
      id: t.id,
      _type: 'trade',
      title: t.title,
      _meta: `¥${t.price} · ${t.condition}`,
      _status: t.status === 'open' ? '在售' : '已售',
      status: t.status,
      _origData: t,
    })),
  ...allLostFounds.value
    .filter((lf) => lf.contact === '站内消息联系' || lf.status === 'open')
    .map((lf) => ({
      _key: 'lf-' + lf.id,
      id: lf.id,
      _type: 'lostFound',
      title: lf.title,
      _meta: lf.type === 'lost' ? '寻物' : '招领',
      _status: lf.status === 'open' ? '寻找中' : '已找到',
      status: lf.status,
      _origData: lf,
    })),
  ...allGroupBuys.value
    .filter((g) => g.publisher === profile.name)
    .map((g) => ({
      _key: 'gb-' + g.id,
      id: g.id,
      _type: 'groupBuy',
      title: g.title,
      _meta: `${g.currentCount}/${g.targetCount}人 · ${g.type}`,
      _status: g.status === 'open' ? '招募中' : '已结束',
      status: g.status,
      _origData: g,
    })),
  ...allErrands.value
    .filter((e) => e.publisher === profile.name)
    .map((e) => ({
      _key: 'er-' + e.id,
      id: e.id,
      _type: 'errand',
      title: e.title,
      _meta: `¥${e.reward} · ${e.taskType}`,
      _status: e.status === 'open' ? '待接单' : e.status === 'taken' ? '已接单' : '已完成',
      status: e.status,
      _origData: e,
    })),
])

function goToDetail(type: string, id: number | string) {
  router.push(`/detail/${id}?type=${type}`)
}

async function markItemSold(item: PublishedItem) {
  if (item._type === 'trade') {
    const t = item._origData as TradeItem
    await updateTrade(t.id, { status: 'closed' })
    t.status = 'closed'
    ElMessage.success('已标记为已售')
  } else {
    ElMessage.info('仅二手交易支持标记已售')
  }
}

async function deleteMyItem(item: PublishedItem) {
  try {
    await ElMessageBox.confirm('确定删除？', '确认', { type: 'warning' })
    if (item._type === 'trade') {
      await deleteTrade((item._origData as TradeItem).id)
      allTrades.value = allTrades.value.filter((t) => t.id !== item.id)
    } else if (item._type === 'groupBuy') {
      await deleteGroupBuy((item._origData as GroupBuyItem).id)
      allGroupBuys.value = allGroupBuys.value.filter((g) => g.id !== item.id)
    } else if (item._type === 'errand') {
      await deleteErrand((item._origData as ErrandItem).id)
      allErrands.value = allErrands.value.filter((e) => e.id !== item.id)
    } else if (item._type === 'lostFound') {
      await deleteLostFound((item._origData as LostFoundItem).id)
      allLostFounds.value = allLostFounds.value.filter((lf) => lf.id !== item.id)
    }
    ElMessage.success('已删除')
  } catch { /* cancelled */ }
}

const allFavorites = ref<ApiFavoriteItem[]>([])

// Sync favorites from server into Pinia store
function syncServerFavoritesToStore() {
  for (const fav of allFavorites.value) {
    const type = fav.itemType
    const id = fav.itemId

    let title = ''
    let desc = ''
    let location: string | undefined

    if (type === 'trade') {
      const t = allTrades.value.find((x) => String(x.id) === String(id))
      if (t) { title = t.title; desc = t.description; location = t.location }
    } else if (type === 'groupBuy') {
      const g = allGroupBuys.value.find((x) => String(x.id) === String(id))
      if (g) { title = g.title; desc = g.description; location = g.location }
    } else if (type === 'errand') {
      const e = allErrands.value.find((x) => String(x.id) === String(id))
      if (e) { title = e.title; desc = e.description; location = `${e.from} → ${e.to}` }
    } else if (type === 'lostFound') {
      const lf = allLostFounds.value.find((x) => String(x.id) === String(id))
      if (lf) { title = lf.title; desc = lf.description; location = lf.location }
    }

    if (title && !favoriteStore.isFavorite(type, id)) {
      favoriteStore.addFavorite({ id, type, title, description: desc, location })
    }
  }
}
// Favorites
const showFavorites = ref(false)

const favoriteItems = computed(() => {
  return favoriteStore.favorites.map((f) => ({
    _key: `${f.type}-${f.id}`,
    _type: f.type,
    _meta: f.location || '',
    id: f.id,
    title: f.title,
  }))
})

async function loadFavoritesFromServer() {
  try {
    const res = await getFavorites({ userId: 'user_001' })
    allFavorites.value = res.data
  } catch { /* ignore */ }
}

async function removeFavorite(type: string, id: number | string) {
  favoriteStore.removeFavorite(type as 'trade' | 'lostFound' | 'groupBuy' | 'errand', id)
  const fav = allFavorites.value.find((f) => f.itemType === type && String(f.itemId) === String(id))
  if (!fav || !fav.id) return
  try {
    await deleteFavorite(fav.id)
    allFavorites.value = allFavorites.value.filter((f) => f.id !== fav.id)
    ElMessage.success('已取消收藏')
  } catch {
    ElMessage.warning('已从本地移除，服务器同步可能需要刷新')
  }
}

// My Orders
const joinedBuyIds = ref<(number | string)[]>(loadIds('cm_orders_groupbuys'))
const takenErrandIds = ref<(number | string)[]>(loadIds('cm_orders_errands'))

function loadIds(key: string): (number | string)[] {
  try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
}

interface OrderItem {
  _key: string
  title?: string
  _title: string
  _price: string
  _status: string
  _typeLabel: string
  _link: string
}

const orderItems = computed<OrderItem[]>(() => {
  const directDeleteImports = [
    ...allGroupBuys.value
      .filter((g) => joinedBuyIds.value.includes(g.id))
      .map((g) => ({
        _key: `gb-${g.id}`,
        title: g.title,
        _title: g.title,
        _price: `${g.currentCount}/${g.targetCount}人`,
        _status: g.status === 'open' ? '进行中' : '已结束',
        _typeLabel: '拼单',
        _link: `/detail/${g.id}?type=groupBuy`,
      })),
    ...allErrands.value
      .filter((e) => takenErrandIds.value.includes(e.id))
      .map((e) => ({
        _key: `er-${e.id}`,
        title: e.title,
        _title: e.title,
        _price: `¥${e.reward}`,
        _status: e.status === 'open' ? '待完成' : e.status === 'taken' ? '进行中' : '已完成',
        _typeLabel: '跑腿',
        _link: `/detail/${e.id}?type=errand`,
      })),
    ...allTrades.value
      .filter((t) => t.status === 'closed' && t.publisher === profile.name)
      .map((t) => ({
        _key: `td-${t.id}`,
        title: t.title,
        _title: t.title,
        _price: `¥${t.price}`,
        _status: '已售出',
        _typeLabel: '交易',
        _link: `/detail/${t.id}?type=trade`,
      })),
  ]
  return directDeleteImports
})

function goToOrder(o: OrderItem) {
  router.push(o._link)
}

// Stats
const stats = computed(() => [
  { label: '我的发布', value: myPublished.value.length, color: '#3b82f6' },
  { label: '我的收藏', value: favoriteItems.value.length, color: '#10b981' },
  { label: '我的订单', value: orderItems.value.length, color: '#f59e0b' },
  { label: '已成交', value: allTrades.value.filter((t) => t.publisher === profile.name && t.status === 'closed').length, color: '#ef4444' },
])

onMounted(async () => {
  loadProfile()
  const [t, lf, gb, e] = await Promise.all([
    getTrades(),
    getLostFounds(),
    getGroupBuys(),
    getErrands(),
  ])
  allTrades.value = t.data
  allLostFounds.value = lf.data
  allGroupBuys.value = gb.data
  allErrands.value = e.data
  await loadFavoritesFromServer()
  syncServerFavoritesToStore()
})
</script>

<style scoped>
.page { max-width: 1040px; margin: 0 auto; }

.page-header { padding: 24px; border-radius: 16px; background: #fff; margin-bottom: 24px; }
.page-header h1 { margin: 0 0 8px; }
.page-header p { margin: 0; color: #6b7280; }

.profile-card { background: #fff; border-radius: 18px; box-shadow: 0 1px 8px rgba(0,0,0,0.04); overflow: hidden; margin-bottom: 24px; border: 1px solid #f1f5f9; }
.banner { height: 140px; background: linear-gradient(135deg, #f97316, #ea580c); }
.profile-info { display: flex; align-items: flex-end; gap: 24px; padding: 0 30px 26px; margin-top: -60px; }
.avt-wrap { width: 104px; height: 104px; border-radius: 50%; border: 5px solid #fff; box-shadow: 0 4px 14px rgba(0,0,0,0.12); overflow: hidden; background: #e2e8f0; flex-shrink: 0; }
.avt-wrap img { width: 100%; height: 100%; object-fit: cover; }
.user-text { padding-bottom: 8px; flex: 1; }
.user-name { font-size: 24px; font-weight: 700; display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.user-sign { font-size: 13px; color: #64748b; margin-bottom: 6px; }
.user-detail { font-size: 13px; color: #475569; display: flex; gap: 18px; flex-wrap: wrap; }

.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
.stat-card { background: #fff; border-radius: 16px; padding: 22px; text-align: center; box-shadow: 0 1px 6px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
.stat-num { font-size: 30px; font-weight: 800; }
.stat-label { font-size: 12px; color: #64748b; margin-top: 4px; }

.section-card { background: #fff; border-radius: 16px; padding: 22px; box-shadow: 0 1px 6px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; margin-bottom: 20px; }
.section-card h3 { font-size: 17px; font-weight: 700; margin: 0 0 16px; display: flex; align-items: center; justify-content: space-between; }
.section-close { background: transparent; border: 1px solid #e2e8f0; border-radius: 6px; padding: 2px 10px; cursor: pointer; color: #64748b; font-size: 13px; }
.section-empty { color: #94a3b8; text-align: center; padding: 24px; font-size: 13px; }
.section-empty a { color: #3b82f6; }

.order-list { display: flex; flex-direction: column; gap: 8px; }
.order-item { display: flex; align-items: center; gap: 14px; padding: 14px; background: #f8fafc; border-radius: 10px; cursor: pointer; transition: background 0.2s; }
.order-item:hover { background: #eff6ff; }
.order-type { padding: 3px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: #eff6ff; color: #2563eb; flex-shrink: 0; }
.order-title { flex: 1; font-size: 14px; color: #1e293b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.order-price { font-size: 14px; font-weight: 600; color: #ef4444; flex-shrink: 0; }
.order-status { font-size: 12px; color: #64748b; flex-shrink: 0; }

.list-row { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
.list-row:last-child { border-bottom: none; }
.list-title { flex: 1; font-size: 14px; color: #1e293b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.list-meta { font-size: 12px; color: #64748b; flex-shrink: 0; }
.list-status { padding: 2px 8px; border-radius: 6px; font-size: 11px; flex-shrink: 0; }
.list-status.open { background: #dcfce7; color: #16a34a; }
.list-status.closed { background: #f3f4f6; color: #9ca3af; }
.list-action { padding: 4px 12px; border: 1px solid #3b82f6; border-radius: 6px; background: #fff; color: #3b82f6; font-size: 12px; cursor: pointer; flex-shrink: 0; }
.list-action.danger { border-color: #ef4444; color: #ef4444; }
.list-action:hover { background: #eff6ff; }

.menu-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.menu-item { background: #fff; border-radius: 16px; padding: 26px; text-align: center; cursor: pointer; box-shadow: 0 1px 6px rgba(0,0,0,0.03); transition: all 0.25s; border: 1px solid #f1f5f9; position: relative; }
.menu-item:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); border-color: #dbeafe; }
.menu-icon { font-size: 36px; display: block; margin-bottom: 8px; }
.menu-label { font-size: 14px; font-weight: 600; }
.menu-count { display: block; font-size: 11px; color: #3b82f6; margin-top: 4px; font-weight: 600; }

.edit-form { display: flex; flex-direction: column; gap: 12px; }
.edit-form label { font-size: 13px; font-weight: 600; color: #475569; }
.form-input { padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; outline: none; width: 100%; box-sizing: border-box; }
.form-input:focus { border-color: #3b82f6; }

.avatar-edit { display: flex; align-items: center; gap: 12px; }
.avatar-preview { width: 72px; height: 72px; border-radius: 50%; overflow: hidden; border: 3px solid #e2e8f0; flex-shrink: 0; background: #f1f5f9; }
.avatar-preview img { width: 100%; height: 100%; object-fit: cover; }
.avatar-upload-btn { padding: 8px 16px; background: #eff6ff; color: #2563eb; border: 1px solid #93c5fd; border-radius: 8px; font-size: 13px; cursor: pointer; transition: all 0.2s; }
.avatar-upload-btn:hover { background: #dbeafe; }
.avatar-upload-input { display: none; }
.avatar-reset-btn { padding: 8px 12px; background: #f3f4f6; color: #6b7280; border: 1px solid #d1d5db; border-radius: 8px; font-size: 12px; cursor: pointer; }
</style>
