<template>
  <div class="home">
    <div class="container">
      <div class="hero">
        <h1>🎓 你的校园好物交易平台</h1>
        <p>二手交易 · 失物招领 · 拼单搭子 · 跑腿委托 — 让校园生活更便捷、更有温度</p>
        <div class="hero-search">
          <input type="text" v-model="searchText" placeholder="搜一搜：二手书、拼车、代取快递..." @keyup.enter="doSearch" />
          <button @click="doSearch">🔍 搜索</button>
        </div>
      </div>

      <div class="cat-bar">
        <router-link to="/list" class="cat-chip active">📦 全部</router-link>
        <router-link to="/trade" class="cat-chip">🛒 二手交易</router-link>
        <router-link to="/lost-found" class="cat-chip">🔍 失物招领</router-link>
        <router-link to="/group-buy" class="cat-chip">🤝 拼单搭子</router-link>
        <router-link to="/errand" class="cat-chip">🏃 跑腿委托</router-link>
      </div>

      <div class="main-grid">
        <div>
          <div v-for="item in feedItems" :key="item._key" class="feed-card" @click="navigateTo(item)">
            <div class="feed-img"><img :src="item.image" :alt="item.title" /></div>
            <div class="feed-body">
              <div class="feed-title">{{ item.title }}</div>
              <div class="feed-desc">{{ item.description || item.desc || '' }}</div>
              <div class="feed-footer">
                <span class="feed-price">{{ item._priceStr }}</span>
                <span class="feed-meta">
                  <el-tag size="small" :type="item._tagType">{{ item._tag }}</el-tag>
                  <span v-if="item.location">📍 {{ item.location }}</span>
                  <span>{{ item.publishTime || item.eventTime }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="side-card">
            <h3>🔥 热门推荐</h3>
            <router-link v-for="(t, i) in trades.slice(0, 6)" :key="t.id" :to="`/detail/${t.id}`" class="hot-row">
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
const searchText = ref('')
const trades = ref<TradeItem[]>([])
const lostFounds = ref<LostFoundItem[]>([])
const groupBuys = ref<GroupBuyItem[]>([])
const errands = ref<ErrandItem[]>([])

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

const stats = computed(() => ({
  total: trades.value.length + lostFounds.value.length + groupBuys.value.length + errands.value.length,
}))

interface FeedItem {
  _key: string
  title: string
  description?: string
  desc?: string
  image: string
  location?: string
  publishTime?: string
  eventTime?: string
  _priceStr: string
  _tag: string
  _tagType: string
}

const feedItems = computed<FeedItem[]>(() => [
  ...trades.value.slice(0, 4).map((t) => ({
    _key: `trade-${t.id}`,
    ...t,
    _priceStr: `¥${t.price}`,
    _tag: t.category,
    _tagType: 'primary',
    _link: `/detail/${t.id}`,
  })),
  ...groupBuys.value.slice(0, 2).map((g) => ({
    _key: `gb-${g.id}`,
    title: g.title,
    description: g.description,
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600&h=400&fit=crop',
    location: g.location,
    publishTime: g.deadline,
    _priceStr: `${g.currentCount}/${g.targetCount}人`,
    _tag: '拼单',
    _tagType: 'success',
    _link: '/group-buy',
  })),
  ...errands.value.slice(0, 1).map((e) => ({
    _key: `er-${e.id}`,
    title: e.title,
    description: e.description,
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&h=400&fit=crop',
    location: `${e.from} → ${e.to}`,
    publishTime: e.deadline,
    _priceStr: `酬谢¥${e.reward}`,
    _tag: '跑腿',
    _tagType: 'warning',
    _link: '/errand',
  })),
  ...lostFounds.value.slice(0, 1).map((lf) => ({
    _key: `lf-${lf.id}`,
    title: lf.title,
    description: lf.description,
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07afc?w=600&h=400&fit=crop',
    location: lf.location,
    eventTime: lf.eventTime,
    _priceStr: lf.type === 'lost' ? '失物' : '招领',
    _tag: lf.type === 'lost' ? '失物' : '招领',
    _tagType: lf.type === 'lost' ? 'danger' : 'info',
    _link: '/lost-found',
  })),
])

function navigateTo(item: FeedItem & { _link?: string }) {
  if (item._link) router.push(item._link)
}

function doSearch() {
  if (searchText.value) router.push(`/list?q=${encodeURIComponent(searchText.value)}`)
}
</script>

<style scoped>
.home { max-width: 1200px; margin: 0 auto; }
.container { max-width: 1240px; margin: 0 auto; }
.hero {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #0ea5e9 100%);
  border-radius: 20px; padding: 56px 52px; margin-bottom: 28px; position: relative; overflow: hidden;
}
.hero h1 { font-size: 38px; font-weight: 800; color: #fff; margin: 0 0 10px; }
.hero p { font-size: 15px; color: rgba(255,255,255,0.82); margin: 0 0 28px; }
.hero-search { display: flex; gap: 10px; max-width: 580px; }
.hero-search input { flex: 1; padding: 15px 22px; border: none; border-radius: 14px; font-size: 15px; outline: none; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
.hero-search button { padding: 15px 32px; background: #fff; color: #2563eb; border: none; border-radius: 14px; font-size: 15px; font-weight: 700; cursor: pointer; }

.cat-bar { display: flex; gap: 10px; margin-bottom: 26px; flex-wrap: wrap; }
.cat-chip {
  display: flex; align-items: center; gap: 7px; padding: 10px 22px; background: #fff; border-radius: 26px; cursor: pointer;
  font-size: 14px; font-weight: 500; color: #475569; text-decoration: none; box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: all 0.2s; border: 1.5px solid transparent;
}
.cat-chip:hover, .cat-chip.active { border-color: #93c5fd; color: #2563eb; background: #eff6ff; }

.main-grid { display: grid; grid-template-columns: 1fr 330px; gap: 24px; }

.feed-card {
  background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,0.03);
  transition: all 0.25s; cursor: pointer; margin-bottom: 16px; display: flex; border: 1px solid #f1f5f9;
}
.feed-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.08); border-color: #dbeafe; }
.feed-img { width: 220px; min-height: 175px; background: #e2e8f0; flex-shrink: 0; overflow: hidden; }
.feed-img img { width: 100%; height: 100%; object-fit: cover; }
.feed-body { padding: 18px 22px; flex: 1; display: flex; flex-direction: column; }
.feed-title { font-size: 17px; font-weight: 600; color: #1e293b; margin-bottom: 6px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
.feed-desc { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 12px; flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.feed-footer { display: flex; justify-content: space-between; align-items: center; }
.feed-price { font-size: 22px; font-weight: 800; color: #ef4444; }
.feed-meta { font-size: 12px; color: #94a3b8; display: flex; align-items: center; gap: 14px; }

.side-card { background: #fff; border-radius: 16px; padding: 22px; box-shadow: 0 1px 6px rgba(0,0,0,0.03); margin-bottom: 16px; border: 1px solid #f1f5f9; }
.side-card h3 { font-size: 16px; font-weight: 700; color: #1e293b; margin: 0 0 16px; display: flex; align-items: center; gap: 6px; }
.hot-row { display: flex; align-items: center; gap: 10px; padding: 11px 0; border-bottom: 1px solid #f8fafc; text-decoration: none; color: inherit; transition: color 0.2s; }
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

.publish-cta {
  display: block; text-align: center; padding: 18px; background: linear-gradient(135deg, #10b981, #059669);
  color: #fff; border-radius: 14px; font-size: 15px; font-weight: 700; text-decoration: none;
  transition: all 0.2s;
}
.publish-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(16,185,129,0.3); }
</style>
