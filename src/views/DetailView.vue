<template>
  <div class="page">
    <div class="breadcrumb">
      <router-link to="/">首页</router-link><span class="sep">/</span>
      <router-link :to="listLink">{{ listLabel }}</router-link><span class="sep">/</span>
      <span class="current">{{ detail?.title || '详情' }}</span>
    </div>

    <div v-if="loading" class="loading-state">加载中...</div>

    <div v-else-if="!detail" class="not-found">
      <el-empty description="信息未找到"><el-button type="primary" @click="router.push('/')">返回首页</el-button></el-empty>
    </div>

    <!-- Trade Detail -->
    <template v-else-if="itemType === 'trade'">
      <div class="detail-grid">
        <div>
          <div class="main-card">
            <div class="img-main"><img :src="(detail as TradeItem).image" :alt="(detail as TradeItem).title" /></div>
            <div class="main-body">
              <h1 class="dt-title">{{ (detail as TradeItem).title }}</h1>
              <div class="dt-price">¥{{ (detail as TradeItem).price }} <span class="orig">原价 ¥{{ Math.round((detail as TradeItem).price * 1.4) }}</span></div>
              <div class="dt-tags">
                <el-tag type="primary">{{ (detail as TradeItem).category }}</el-tag>
                <el-tag :type="(detail as TradeItem).status === 'open' ? 'success' : 'info'">{{ (detail as TradeItem).status === 'open' ? '在售' : '已售出' }}</el-tag>
                <span class="views">🕐 {{ (detail as TradeItem).publishTime }}</span>
              </div>
              <div class="dt-meta">
                <div class="meta-item"><span class="lbl">📍 交易地点：</span><span class="val">{{ (detail as TradeItem).location }}</span></div>
                <div class="meta-item"><span class="lbl">👤 发布人：</span><span class="val">{{ (detail as TradeItem).publisher }}</span></div>
                <div class="meta-item"><span class="lbl">📦 成色：</span><span class="val">{{ (detail as TradeItem).condition }}</span></div>
                <div class="meta-item"><span class="lbl">🆔 编号：</span><span class="val">SH00{{ (detail as TradeItem).id }}</span></div>
              </div>
              <div class="dt-body"><h3>📝 商品描述</h3><p>{{ (detail as TradeItem).description }}</p></div>
              <div class="dt-actions">
                <el-button type="primary" size="large" @click="contactItem">💬 联系发布者</el-button>
                <el-button size="large" @click="toggleFavorite">{{ isFavorited ? '⭐ 已收藏' : '⭐ 收藏' }}</el-button>
                <div style="flex:1;" />
                <el-button v-if="(detail as TradeItem).status === 'open'" size="large" type="success" @click="markAsSold">✅ 标记已售</el-button>
                <el-button size="large" type="danger" plain @click="removeItem">🗑️ 删除</el-button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="side-card">
            <h3>👤 卖家信息</h3>
            <div class="seller-row">
              <div class="seller-avt"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=220&h=220&fit=crop" alt="" /></div>
              <div><div class="seller-name">{{ (detail as TradeItem).publisher }}</div><div class="seller-badge">✅ 已实名 · 信用良好</div></div>
            </div>
            <el-button type="primary" style="width:100%;margin-bottom:8px;" @click="contactItem">💬 联系发布者</el-button>
          </div>
          <div class="safety-box">
            <strong>⚠️ 交易安全提醒</strong><br>
            · 建议校内公共场所当面交易<br>· 贵重物品当场验货<br>· 谨防提前转账诈骗
          </div>
        </div>
      </div>
    </template>

    <!-- LostFound Detail -->
    <template v-else-if="itemType === 'lostFound'">
      <div class="detail-grid">
        <div>
          <div class="main-card">
            <div class="img-main img-placeholder">{{ (detail as LostFoundItem).type === 'lost' ? '🔍' : '📦' }}</div>
            <div class="main-body">
              <h1 class="dt-title">{{ (detail as LostFoundItem).title }}</h1>
              <div class="dt-price">{{ (detail as LostFoundItem).type === 'lost' ? '寻物启事' : '招领启事' }}</div>
              <div class="dt-tags">
                <el-tag :type="(detail as LostFoundItem).type === 'lost' ? 'danger' : 'success'">{{ (detail as LostFoundItem).type === 'lost' ? '寻物' : '招领' }}</el-tag>
                <el-tag :type="(detail as LostFoundItem).status === 'open' ? 'warning' : 'info'">{{ (detail as LostFoundItem).status === 'open' ? '寻找中' : '已找到' }}</el-tag>
                <span class="views">🕐 {{ (detail as LostFoundItem).eventTime }}</span>
              </div>
              <div class="dt-meta">
                <div class="meta-item"><span class="lbl">📦 物品名称：</span><span class="val">{{ (detail as LostFoundItem).itemName }}</span></div>
                <div class="meta-item"><span class="lbl">📍 地点：</span><span class="val">{{ (detail as LostFoundItem).location }}</span></div>
                <div class="meta-item"><span class="lbl">📞 联系方式：</span><span class="val">{{ (detail as LostFoundItem).contact }}</span></div>
              </div>
              <div class="dt-body"><h3>📝 详细描述</h3><p>{{ (detail as LostFoundItem).description }}</p></div>
              <div class="dt-actions">
                <el-button type="primary" size="large" @click="contactItem">💬 联系发布者</el-button>
                <el-button size="large" @click="toggleFavorite">{{ isFavorited ? '⭐ 已收藏' : '⭐ 收藏' }}</el-button>
                <div style="flex:1;" />
                <el-button size="large" type="danger" plain @click="removeItem">🗑️ 删除</el-button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="side-card">
            <h3>📋 信息说明</h3>
            <p style="color:#64748b;font-size:13px;line-height:1.8;">此信息发布于校园轻集市失物招领板块。如有线索请通过站内消息联系发布者。</p>
          </div>
          <div class="safety-box">
            <strong>💡 温馨提示</strong><br>
            · 认领物品时请核实对方身份<br>· 贵重物品建议在公共场所交接<br>· 谨防冒领和诈骗
          </div>
        </div>
      </div>
    </template>

    <!-- GroupBuy Detail -->
    <template v-else-if="itemType === 'groupBuy'">
      <div class="detail-grid">
        <div>
          <div class="main-card">
            <div class="img-main img-placeholder">🤝</div>
            <div class="main-body">
              <h1 class="dt-title">{{ (detail as GroupBuyItem).title }}</h1>
              <div class="dt-price">{{ (detail as GroupBuyItem).currentCount }}/{{ (detail as GroupBuyItem).targetCount }}人 <span class="orig">目标{{ (detail as GroupBuyItem).targetCount }}人</span></div>
              <div class="dt-tags">
                <el-tag type="primary">{{ (detail as GroupBuyItem).type }}</el-tag>
                <el-tag :type="(detail as GroupBuyItem).status === 'open' ? 'success' : 'info'">{{ (detail as GroupBuyItem).status === 'open' ? '招募中' : '已结束' }}</el-tag>
                <span class="views">⏰ 截止：{{ (detail as GroupBuyItem).deadline }}</span>
              </div>
              <div class="dt-meta">
                <div class="meta-item"><span class="lbl">📍 地点：</span><span class="val">{{ (detail as GroupBuyItem).location }}</span></div>
                <div class="meta-item"><span class="lbl">👤 发起人：</span><span class="val">{{ (detail as GroupBuyItem).publisher }}</span></div>
                <div class="meta-item"><span class="lbl">👥 当前人数：</span><span class="val">{{ (detail as GroupBuyItem).currentCount }} 人已加入</span></div>
              </div>
              <div class="dt-body"><h3>📝 拼单说明</h3><p>{{ (detail as GroupBuyItem).description }}</p></div>
              <div class="dt-actions">
                <el-button type="primary" size="large" @click="contactItem">💬 联系发起人</el-button>
                <el-button size="large" @click="toggleFavorite">{{ isFavorited ? '⭐ 已收藏' : '⭐ 收藏' }}</el-button>
                <div style="flex:1;" />
                <el-button size="large" type="danger" plain @click="removeItem">🗑️ 删除</el-button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="side-card">
            <h3>👤 发起人信息</h3>
            <div class="seller-row">
              <div class="seller-avt"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=220&h=220&fit=crop" alt="" /></div>
              <div><div class="seller-name">{{ (detail as GroupBuyItem).publisher }}</div><div class="seller-badge">✅ 已实名</div></div>
            </div>
          </div>
          <div class="safety-box">
            <strong>💡 拼单提醒</strong><br>
            · 请在截止时间前加入拼单<br>· 拼单成功后请注意查收消息<br>· 如有疑问请联系发起人
          </div>
        </div>
      </div>
    </template>

    <!-- Errand Detail -->
    <template v-else-if="itemType === 'errand'">
      <div class="detail-grid">
        <div>
          <div class="main-card">
            <div class="img-main img-placeholder">🏃</div>
            <div class="main-body">
              <h1 class="dt-title">{{ (detail as ErrandItem).title }}</h1>
              <div class="dt-price">酬劳 ¥{{ (detail as ErrandItem).reward }}</div>
              <div class="dt-tags">
                <el-tag type="warning">{{ (detail as ErrandItem).taskType }}</el-tag>
                <el-tag :type="(detail as ErrandItem).status === 'open' ? 'success' : (detail as ErrandItem).status === 'taken' ? 'warning' : 'info'">{{ (detail as ErrandItem).status === 'open' ? '待接单' : (detail as ErrandItem).status === 'taken' ? '已接单' : '已完成' }}</el-tag>
                <span class="views">⏰ 截止：{{ (detail as ErrandItem).deadline }}</span>
              </div>
              <div class="dt-meta">
                <div class="meta-item"><span class="lbl">📍 取件地点：</span><span class="val">{{ (detail as ErrandItem).from }}</span></div>
                <div class="meta-item"><span class="lbl">🏁 送达地点：</span><span class="val">{{ (detail as ErrandItem).to }}</span></div>
                <div class="meta-item"><span class="lbl">👤 委托人：</span><span class="val">{{ (detail as ErrandItem).publisher }}</span></div>
              </div>
              <div class="dt-body"><h3>📝 任务说明</h3><p>{{ (detail as ErrandItem).description }}</p></div>
              <div class="dt-actions">
                <el-button type="primary" size="large" @click="contactItem">💬 联系委托人</el-button>
                <el-button size="large" @click="toggleFavorite">{{ isFavorited ? '⭐ 已收藏' : '⭐ 收藏' }}</el-button>
                <div style="flex:1;" />
                <el-button size="large" type="danger" plain @click="removeItem">🗑️ 删除</el-button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="side-card">
            <h3>👤 委托人信息</h3>
            <div class="seller-row">
              <div class="seller-avt"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=220&h=220&fit=crop" alt="" /></div>
              <div><div class="seller-name">{{ (detail as ErrandItem).publisher }}</div><div class="seller-badge">✅ 已实名</div></div>
            </div>
          </div>
          <div class="safety-box">
            <strong>💡 跑腿提醒</strong><br>
            · 接单前请确认任务内容和酬劳<br>· 请在截止时间前完成任务<br>· 如遇问题请及时联系委托人
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getTradeById, updateTrade, deleteTrade, type TradeItem } from '../api/trade'
import { getLostFoundById, updateLostFound, deleteLostFound, type LostFoundItem } from '../api/lostFound'
import { getGroupBuyById, updateGroupBuy, deleteGroupBuy, type GroupBuyItem } from '../api/groupBuy'
import { getErrandById, updateErrand, deleteErrand, type ErrandItem } from '../api/errand'
import { getFavorites, createFavorite, deleteFavorite, type FavoriteItem } from '../api/favorite'
import { useFavoriteStore } from '../stores/favorite'

type ItemType = 'trade' | 'lostFound' | 'groupBuy' | 'errand'

const route = useRoute()
const router = useRouter()
const favoriteStore = useFavoriteStore()
const id = route.params.id as string
const itemType = (route.query.type as ItemType) || 'trade'
const detail = ref<TradeItem | LostFoundItem | GroupBuyItem | ErrandItem | null>(null)
const loading = ref(true)
const userId = 'user_001'

const isFavorited = ref(false)
const favoriteRecordId = ref<string | null>(null)

const listLink = computed(() => {
  const map: Record<ItemType, string> = {
    trade: '/trade',
    lostFound: '/lost-found',
    groupBuy: '/group-buy',
    errand: '/errand',
  }
  return map[itemType] || '/trade'
})

const listLabel = computed(() => {
  const map: Record<ItemType, string> = {
    trade: '二手交易',
    lostFound: '失物招领',
    groupBuy: '拼单搭子',
    errand: '跑腿委托',
  }
  return map[itemType] || '二手交易'
})

onMounted(async () => {
  try {
    if (itemType === 'trade') {
      const res = await getTradeById(id)
      detail.value = res.data
    } else if (itemType === 'lostFound') {
      const res = await getLostFoundById(id)
      detail.value = res.data
    } else if (itemType === 'groupBuy') {
      const res = await getGroupBuyById(id)
      detail.value = res.data
    } else if (itemType === 'errand') {
      const res = await getErrandById(id)
      detail.value = res.data
    }
  } catch {
    detail.value = null
  } finally {
    loading.value = false
  }

  try {
    const res = await getFavorites({ itemType, itemId: id, userId })
    const first = res.data[0]
    if (first && first.id) {
      isFavorited.value = true
      favoriteRecordId.value = first.id
      const info = getDetailInfo()
      if (!favoriteStore.isFavorite(itemType, id)) {
      favoriteStore.addFavorite({
        id,
        type: itemType,
        title: info.title,
        description: info.description,
        location: info.location || undefined,
        apiRecordId: first.id,
      })
      }
    }
  } catch { /* ignore */ }
})

function contactItem() {
  if (detail.value) {
    const item = detail.value as { title?: string; publisher?: string }
    ElMessage.success(`已向发布者 ${item.publisher || '用户'} 发送消息`)
  }
}

function getDetailInfo() {
  if (!detail.value) return { title: '', description: '', location: '' }
  const d = detail.value as Record<string, unknown>
  let location = ''
  if (itemType === 'errand') {
    location = `${d.from || ''} → ${d.to || ''}`
  } else {
    location = (d.location as string) || ''
  }
  return {
    title: (d.title as string) || '',
    description: (d.description as string) || '',
    location,
  }
}

async function toggleFavorite() {
  const info = getDetailInfo()
  if (isFavorited.value && favoriteRecordId.value) {
    try {
      await deleteFavorite(favoriteRecordId.value)
      isFavorited.value = false
      favoriteRecordId.value = null
      favoriteStore.removeFavorite(itemType, id)
      ElMessage.success('已取消收藏')
    } catch {
      ElMessage.error('取消收藏失败')
    }
  } else {
    try {
      const res = await createFavorite({
        itemType,
        itemId: id,
        userId,
      })
      isFavorited.value = true
      favoriteRecordId.value = res.data.id as string
      favoriteStore.addFavorite({
        id,
        type: itemType,
        title: info.title,
        description: info.description,
        location: info.location || undefined,
        apiRecordId: res.data.id as string,
      })
      ElMessage.success('⭐ 已加入收藏')
    } catch {
      ElMessage.error('收藏失败，请检查 Mock 服务')
    }
  }
}

async function markAsSold() {
  if (!detail.value || itemType !== 'trade') return
  const t = detail.value as TradeItem
  await updateTrade(t.id, { status: 'closed' })
  detail.value = { ...t, status: 'closed' }
  ElMessage.success('已标记为已售出')
}

async function removeItem() {
  if (!detail.value) return
  try {
    await ElMessageBox.confirm('确定要删除该信息吗？此操作不可撤销。', '确认删除', { type: 'warning' })
    if (itemType === 'trade') {
      await deleteTrade((detail.value as TradeItem).id)
    } else if (itemType === 'lostFound') {
      await deleteLostFound((detail.value as LostFoundItem).id)
    } else if (itemType === 'groupBuy') {
      await deleteGroupBuy((detail.value as GroupBuyItem).id)
    } else if (itemType === 'errand') {
      await deleteErrand((detail.value as ErrandItem).id)
    }
    ElMessage.success('信息已删除')
    router.push(listLink.value)
  } catch {
    // 用户取消
  }
}
</script>

<style scoped>
.page { max-width: 1240px; margin: 0 auto; }
.breadcrumb { margin-bottom: 20px; font-size: 13px; color: #64748b; display: flex; gap: 6px; align-items: center; }
.breadcrumb a { color: #3b82f6; text-decoration: none; }
.sep { color: #cbd5e1; }
.current { color: #1e293b; font-weight: 500; }
.loading-state { text-align: center; padding: 80px; color: #64748b; font-size: 16px; }
.not-found { text-align: center; padding: 80px; }
.detail-grid { display: grid; grid-template-columns: 1fr 380px; gap: 24px; }
.main-card { background: #fff; border-radius: 18px; overflow: hidden; box-shadow: 0 1px 8px rgba(0,0,0,0.04); border: 1px solid #f1f5f9; }
.img-main { height: 460px; background: #f8fafc; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.img-main img { width: 100%; height: 100%; object-fit: contain; }
.img-placeholder { font-size: 100px; color: #d1d5db; }
.main-body { padding: 0 24px 24px; }
.dt-title { font-size: 24px; font-weight: 700; color: #1e293b; margin: 16px 0 6px; }
.dt-price { font-size: 34px; font-weight: 800; color: #ef4444; margin-bottom: 16px; display: flex; align-items: baseline; gap: 10px; }
.orig { font-size: 14px; font-weight: 400; color: #94a3b8; text-decoration: line-through; }
.dt-tags { display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; align-items: center; }
.views { font-size: 12px; color: #94a3b8; margin-left: 8px; }
.dt-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 22px; padding: 18px; background: #f8fafc; border-radius: 12px; }
.meta-item { font-size: 13px; display: flex; gap: 4px; }
.lbl { color: #64748b; white-space: nowrap; }
.val { color: #1e293b; font-weight: 500; }
.dt-body { margin-bottom: 24px; padding-top: 18px; border-top: 1px solid #f1f5f9; }
.dt-body h3 { font-size: 17px; font-weight: 600; margin-bottom: 12px; }
.dt-body p { font-size: 14px; color: #475569; line-height: 2; }
.dt-actions { display: flex; gap: 12px; padding-top: 18px; border-top: 1px solid #f1f5f9; flex-wrap: wrap; }
.side-card { background: #fff; border-radius: 16px; padding: 22px; box-shadow: 0 1px 8px rgba(0,0,0,0.04); margin-bottom: 16px; border: 1px solid #f1f5f9; }
.side-card h3 { font-size: 16px; font-weight: 700; margin: 0 0 16px; }
.seller-row { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
.seller-avt { width: 52px; height: 52px; border-radius: 50%; overflow: hidden; background: #e2e8f0; }
.seller-avt img { width: 100%; height: 100%; object-fit: cover; }
.seller-name { font-size: 16px; font-weight: 600; }
.seller-badge { font-size: 12px; color: #10b981; }
.safety-box { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; padding: 16px; font-size: 13px; color: #9a3412; line-height: 1.9; }
</style>
