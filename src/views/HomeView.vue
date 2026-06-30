<template>
  <div class="home">
    <div class="container">
      <div class="hero">
        <h1>🎓 你的校园好物交易平台</h1>
        <p>二手交易 · 失物招领 · 拼单搭子 · 跑腿委托 — 让校园生活更便捷、更有温度</p>
        <div class="hero-search">
          <input type="text" v-model="searchQuery" placeholder="搜一搜：二手书、拼车、代取快递..." @input="doSearch" />
          <button @click="clearSearch">✕ 清除</button>
        </div>
      </div>

      <div class="cat-bar">
        <span :class="['cat-chip', { active: activeCat === '' }]" @click="filterByCat('')">📦 全部</span>
        <span v-for="c in tradeCategories" :key="c" :class="['cat-chip', { active: activeCat === c }]" @click="filterByCat(c)">{{ c }}</span>
      </div>

      <div v-if="activeCat" class="search-info">
        正在浏览分类「{{ activeCat }}」的商品，共 {{ displayItems.length }} 件
        <button class="clear-filter-btn" @click="filterByCat('')">清除筛选</button>
      </div>

      <div v-if="searchQuery" class="search-info">
        搜索「{{ searchQuery }}」找到 {{ displayItems.length }} 条结果
        <button class="clear-filter-btn" @click="searchQuery = ''">清除搜索</button>
      </div>

      <div v-if="displayItems.length === 0 && (searchQuery || activeCat)" class="empty-result">
        没有找到匹配的内容
      </div>

      <div class="main-grid">
        <div>
          <div v-for="item in displayItems" :key="item._key" class="feed-card" @click="navigateTo(item)">
            <div class="feed-img"><img :src="item.image" :alt="item.title" /></div>
            <div class="feed-body">
              <div class="feed-title">{{ item.title }}</div>
              <div class="feed-desc">{{ item.description }}</div>
              <div class="feed-footer">
                <span class="feed-price">{{ item._priceStr }}</span>
                <span class="feed-meta">
                  <el-tag size="small" :type="item._tagType">{{ item._tag }}</el-tag>
                  <span v-if="item.location">📍 {{ item.location }}</span>
                  <span>{{ item._time }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="side-card">
            <h3>🔥 热门推荐</h3>
            <router-link v-for="(t, i) in tradesHot" :key="t.id" :to="`/detail/${t.id}?type=trade`" class="hot-row">
              <span :class="['hot-rank', `r${i + 1}`]">{{ i + 1 }}</span>
              <span class="hot-info"><div class="hot-name">{{ t.title }}</div><div class="hot-views">¥{{ t.price }}</div></span>
              <span class="hot-price">{{ t.condition }}</span>
            </router-link>
          </div>
          <div class="side-card">
            <h3>📊 平台数据</h3>
            <div class="stats-mini">
              <div class="box"><div class="val" style="color:#3b82f6;">{{ stats.total }}</div><div class="lbl">总信息数</div></div>
              <div class="box"><div class="val" style="color:#10b981;">1256</div><div class="lbl">活跃用户</div></div>
              <div class="box"><div class="val" style="color:#f59e0b;">89</div><div class="lbl">今日成交</div></div>
              <div class="box"><div class="val" style="color:#ef4444;">48</div><div class="lbl">今日上新</div></div>
            </div>
          </div>
          <router-link to="/publish" class="publish-cta">🚀 立即发布信息</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTrades, type TradeItem } from '../api/trade'
import { getLostFounds, type LostFoundItem } from '../api/lostFound'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'
import { getErrands, type ErrandItem } from '../api/errand'

const router = useRouter()
const searchQuery = ref('')
const activeCat = ref('')
const trades = ref<TradeItem[]>([])
const lostFounds = ref<LostFoundItem[]>([])
const groupBuys = ref<GroupBuyItem[]>([])
const errands = ref<ErrandItem[]>([])

const tradeCategories = ['数码配件', '教材资料', '生活用品', '出行工具']

onMounted(async () => {
  const [t, lf, gb, e] = await Promise.all([
    getTrades(),
    getLostFounds(),
    getGroupBuys(),
    getErrands(),
  ])
  trades.value = t.data
  lostFounds.value = lf.data
  groupBuys.value = gb.data
  errands.value = e.data
})

function filterByCat(cat: string) {
  activeCat.value = cat
}

const allFeedItems = computed(() => [
  ...trades.value.map((t) => ({
    _key: `trade-${t.id}`,
    title: t.title,
    description: t.description,
    image: t.image,
    location: t.location,
    _time: t.publishTime,
    _priceStr: `¥${t.price}`,
    _tag: t.category,
    _tagType: 'primary' as 'primary' | 'success' | 'warning' | 'danger' | 'info',
    _link: `/detail/${t.id}?type=trade`,
    _cat: t.category,
  })),
  ...groupBuys.value.map((g) => ({
    _key: `gb-${g.id}`,
    title: g.title,
    description: g.description,
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600&h=400&fit=crop',
    location: g.location,
    _time: g.deadline,
    _priceStr: `${g.currentCount}/${g.targetCount}人`,
    _tag: '拼单',
    _tagType: 'success' as 'primary' | 'success' | 'warning' | 'danger' | 'info',
    _link: `/detail/${g.id}?type=groupBuy`,
    _cat: '',
  })),
  ...errands.value.map((e) => ({
    _key: `er-${e.id}`,
    title: e.title,
    description: e.description,
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&h=400&fit=crop',
    location: `${e.from} → ${e.to}`,
    _time: e.deadline,
    _priceStr: `酬谢¥${e.reward}`,
    _tag: '跑腿',
    _tagType: 'warning' as 'primary' | 'success' | 'warning' | 'danger' | 'info',
    _link: `/detail/${e.id}?type=errand`,
    _cat: '',
  })),
  ...lostFounds.value.map((lf) => ({
    _key: `lf-${lf.id}`,
    title: lf.title,
    description: lf.description,
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07afc?w=600&h=400&fit=crop',
    location: lf.location,
    _time: lf.eventTime,
    _priceStr: lf.type === 'lost' ? '失物' : '招领',
    _tag: lf.type === 'lost' ? '失物' : '招领',
    _tagType: (lf.type === 'lost' ? 'danger' : 'info') as 'primary' | 'success' | 'warning' | 'danger' | 'info',
    _link: `/detail/${lf.id}?type=lostFound`,
    _cat: '',
  })),
])

const displayItems = computed(() => {
  let items = allFeedItems.value

  if (activeCat.value) {
    items = items.filter((i) => i._cat === activeCat.value)
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    items = items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q),
    )
  }

  return items
})

const tradesHot = computed(() => trades.value.slice(0, 6))
const stats = computed(() => ({
  total: trades.value.length + lostFounds.value.length + groupBuys.value.length + errands.value.length,
}))

function doSearch() {
  // inline filtering via computed, no action needed
}

function clearSearch() {
  searchQuery.value = ''
}

function navigateTo(item: { _link?: string }) {
  if (item._link) router.push(item._link)
}
</script>

<style scoped>
.home { max-width: 1200px; margin: 0 auto; }
.container { max-width: 1240px; margin: 0 auto; }
.hero {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #0ea5e9 100%);
  border-radius: 20px; padding: 56px 52px; margin-bottom: 28px;
}
.hero h1 { font-size: 38px; font-weight: 800; color: #fff; margin: 0 0 10px; }
.hero p { font-size: 15px; color: rgba(255,255,255,0.82); margin: 0 0 28px; }
.hero-search { display: flex; gap: 10px; max-width: 580px; }
.hero-search input { flex: 1; padding: 15px 22px; border: none; border-radius: 14px; font-size: 15px; outline: none; }
.hero-search button { padding: 15px 24px; background: rgba(255,255,255,0.2); color: #fff; border: 1px solid rgba(255,255,255,0.3); border-radius: 14px; font-size: 14px; cursor: pointer; }

.cat-bar { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
.cat-chip {
  display: flex; align-items: center; gap: 7px; padding: 10px 22px; background: #fff; border-radius: 26px; cursor: pointer;
  font-size: 14px; font-weight: 500; color: #475569; box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: all 0.2s; border: 1.5px solid transparent; user-select: none;
}
.cat-chip:hover, .cat-chip.active { border-color: #93c5fd; color: #2563eb; background: #eff6ff; }

.search-info {
  padding: 10px 18px; background: #eff6ff; border-radius: 10px; margin-bottom: 16px;
  font-size: 13px; color: #2563eb; display: flex; align-items: center; gap: 12px;
}
.clear-filter-btn { font-size: 12px; color: #2563eb; background: transparent; border: 1px solid #93c5fd; border-radius: 6px; padding: 2px 10px; cursor: pointer; }

.empty-result { text-align: center; padding: 60px; color: #94a3b8; font-size: 15px; }

.main-grid { display: grid; grid-template-columns: 1fr 330px; gap: 24px; }

.feed-card {
  background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,0.03);
  transition: all 0.25s; cursor: pointer; margin-bottom: 16px; display: flex; border: 1px solid #f1f5f9;
}
.feed-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.08); border-color: #dbeafe; }
.feed-img { width: 220px; min-height: 175px; background: #e2e8f0; flex-shrink: 0; overflow: hidden; }
.feed-img img { width: 100%; height: 100%; object-fit: cover; }
.feed-body { padding: 18px 22px; flex: 1; display: flex; flex-direction: column; }
.feed-title { font-size: 17px; font-weight: 600; color: #1e293b; margin-bottom: 6px; }
.feed-desc { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 12px; flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.feed-footer { display: flex; justify-content: space-between; align-items: center; }
.feed-price { font-size: 22px; font-weight: 800; color: #ef4444; }
.feed-meta { font-size: 12px; color: #94a3b8; display: flex; align-items: center; gap: 14px; }

.side-card { background: #fff; border-radius: 16px; padding: 22px; box-shadow: 0 1px 6px rgba(0,0,0,0.03); margin-bottom: 16px; border: 1px solid #f1f5f9; }
.side-card h3 { font-size: 16px; font-weight: 700; color: #1e293b; margin: 0 0 16px; }
.hot-row { display: flex; align-items: center; gap: 10px; padding: 11px 0; border-bottom: 1px solid #f8fafc; text-decoration: none; color: inherit; }
.hot-row:last-child { border-bottom: none; }
.hot-row:hover { color: #3b82f6; }
.hot-rank { font-size: 18px; font-weight: 800; width: 26px; flex-shrink: 0; }
.hot-rank.r1 { color: #ef4444; } .hot-rank.r2 { color: #f59e0b; } .hot-rank.r3 { color: #3b82f6; }
.hot-info { flex: 1; min-width: 0; }
.hot-name { font-size: 13px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hot-views { font-size: 11px; color: #94a3b8; }
.hot-price { font-size: 15px; font-weight: 700; color: #ef4444; white-space: nowrap; }

.stats-mini { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.stats-mini .box { text-align: center; padding: 14px 10px; background: #f8fafc; border-radius: 12px; }
.stats-mini .box .val { font-size: 22px; font-weight: 800; }
.stats-mini .box .lbl { font-size: 11px; color: #64748b; margin-top: 2px; }

.publish-cta { display: block; text-align: center; padding: 18px; background: linear-gradient(135deg, #10b981, #059669); color: #fff; border-radius: 14px; font-size: 15px; font-weight: 700; text-decoration: none; }
.publish-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(16,185,129,0.3); }
</style>
