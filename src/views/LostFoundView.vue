<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMarketStore } from '@/stores/market'

const store = useMarketStore()
const tab = ref<'lost'|'found'>('lost')
const items = computed(() => store.lostFounds.filter(l => l.type === tab.value))
</script>

<template>
  <div class="page">
    <div class="page-hd"><h2>🔍 失物招领</h2><p class="sub">丢了东西别着急，捡到东西来这里</p></div>
    <div class="tab-bar">
      <button :class="['tab-btn', { active: tab === 'lost' }]" @click="tab = 'lost'">😢 失物信息</button>
      <button :class="['tab-btn', { active: tab === 'found' }]" @click="tab = 'found'">🙌 招领信息</button>
    </div>
    <div class="grid">
      <div v-for="l in items" :key="l.id" class="card">
        <div class="card-img"><img :src="l.image" :alt="l.title" /></div>
        <div class="card-body">
          <el-tag :type="l.type === 'lost' ? 'danger' : 'info'" size="small">{{ l.type === 'lost' ? '失物' : '招领' }}</el-tag>
          <div class="card-title">{{ l.title }}</div>
          <div class="card-desc">{{ l.desc }}</div>
          <div class="card-meta">📍 {{ l.location }} · 🕐 {{ l.publishTime }} · 👁 {{ l.views }}</div>
        </div>
      </div>
      <el-empty v-if="items.length === 0" description="暂无信息" />
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 1200px; margin: 0 auto; }
.page-hd { margin-bottom: 24px; }
.page-hd h2 { font-size: 24px; font-weight: 700; margin: 0 0 8px; }
.sub { font-size: 14px; color: #64748b; margin: 0; }
.tab-bar { display: flex; gap: 0; margin-bottom: 24px; background: #f1f5f9; border-radius: 12px; padding: 4px; width: fit-content; }
.tab-btn { padding: 10px 24px; border: none; background: transparent; color: #64748b; font-size: 14px; font-weight: 600; cursor: pointer; border-radius: 9px; transition: all 0.2s; }
.tab-btn.active { background: #fff; color: #dc2626; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.tab-btn.active:nth-child(2) { color: #059669; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
.card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; transition: all 0.25s; cursor: pointer; }
.card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.card-img { height: 180px; overflow: hidden; background: #e2e8f0; }
.card-img img { width: 100%; height: 100%; object-fit: cover; }
.card-body { padding: 16px; }
.card-title { font-size: 15px; font-weight: 600; margin: 8px 0 6px; }
.card-desc { font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 8px; }
.card-meta { font-size: 12px; color: #94a3b8; }
</style>
