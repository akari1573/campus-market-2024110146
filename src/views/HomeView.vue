<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMarketStore } from '@/stores/market'

const router = useRouter()
const store = useMarketStore()
const searchText = ref('')

const feedItems = computed(() => [
  ...store.products.slice(0, 4).map(p => ({ ...p, link: `/detail/${p.id}`, time: p.publishTime, priceStr: '¥' + p.price })),
  ...store.groupBuys.slice(0, 2).map(g => ({ ...g, link: `/group-buy`, time: g.publishTime, priceStr: g.price, desc: g.desc, location: g.location, tag: '拼单', tagType: 'success' })),
  ...store.errandTasks.slice(0, 1).map(e => ({ ...e, link: `/errand`, time: e.publishTime, priceStr: '酬谢¥' + e.reward, tag: '跑腿', tagType: 'warning', location: e.toAddr })),
  ...store.lostFounds.slice(0, 1).map(l => ({ ...l, link: `/lost-found`, time: l.publishTime, priceStr: l.reward || '-', tag: l.type === 'lost' ? '失物' : '招领', tagType: l.type === 'lost' ? 'danger' : 'info' })),
])

const hotItems = computed(() => store.products.slice(0, 6).map(p => ({ ...p, priceStr: '¥' + p.price })))
const stats = computed(() => ({ total: store.products.length + store.lostFounds.length + store.groupBuys.length + store.errandTasks.length, users: 1256, deals: 89, today: 48 }))

function doSearch() { if (searchText.value) router.push(`/list?q=${encodeURIComponent(searchText.value)}`) }
</script>

<template>
  <div class="home">
    <div class="container">
      <!-- Hero -->
      <div class="hero">
        <h1>🎓 你的校园好物交易平台</h1>
        <p>二手交易 · 失物招领 · 拼单搭子 · 跑腿委托 — 让校园生活更便捷、更有温度</p>
        <div class="hero-search">
          <input type="text" v-model="searchText" placeholder="搜一搜：二手书、拼车、代取快递..." @keyup.enter="doSearch" />
          <button @click="doSearch">🔍 搜索</button>
        </div>
      </div>

      <!-- Category Chips -->
      <div class="cat-bar">
        <router-link to="/list" class="cat-chip active">📦 全部</router-link>
        <router-link to="/trade" class="cat-chip">🛒 二手交易</router-link>
        <router-link to="/lost-found" class="cat-chip">🔍 失物招领</router-link>
        <router-link to="/group-buy" class="cat-chip">🤝 拼单搭子</router-link>
        <router-link to="/errand" class="cat-chip">🏃 跑腿委托</router-link>
      </div>

      <div class="main-grid">
        <div>
          <div v-for="item in feedItems" :key="item.id" class="feed-card" @click="router.push(item.link)">
            <div class="feed-img"><img :src="item.image" :alt="item.title" /></div>
            <div class="feed-body">
              <div class="feed-title">{{ item.title }}</div>
              <div class="feed-desc">{{ item.desc }}</div>
              <div class="feed-footer">
                <span class="feed-price">{{ item.priceStr }}</span>
                <span class="feed-meta">
                  <el-tag size="small" :type="item.tagType">{{ item.tag }}</el-tag>
                  <span v-if="item.location">📍 {{ item.location }}</span>
                  <span>{{ item.time }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="side-card">
            <h3>🔥 热门推荐</h3>
            <router-link v-for="(h, i) in hotItems" :key="h.id" :to="`/detail/${h.id}`" class="hot-row">
              <span :class="['hot-rank', `r${i + 1}`]">{{ i + 1 }}</span>
              <span class="hot-info"><div class="hot-name">{{ h.title }}</div><div class="hot-views">{{ h.views }} 次浏览</div></span>
              <span class="hot-price">{{ h.priceStr }}</span>
            </router-link>
          </div>
          <div class="side-card">
            <h3>📊 平台数据</h3>
            <div class="stats-mini">
              <div class="box"><div class="val" style="color:#3b82f6;">{{ stats.total }}</div><div class="lbl">总信息数</div></div>
              <div class="box"><div class="val" style="color:#10b981;">{{ stats.users }}</div><div class="lbl">活跃用户</div></div>
              <div class="box"><div class="val" style="color:#f59e0b;">{{ stats.deals }}</div><div class="lbl">今日成交</div></div>
              <div class="box"><div class="val" style="color:#ef4444;">{{ stats.today }}</div><div class="lbl">今日上新</div></div>
            </div>
          </div>
          <router-link to="/publish" class="publish-cta">🚀 立即发布信息</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

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
