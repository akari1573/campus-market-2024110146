<script setup lang="ts">
import { useMarketStore } from '@/stores/market'
import { ElMessage } from 'element-plus'

const store = useMarketStore()

function joinGroup(g: typeof store.groupBuys[0]) {
  ElMessage.success('🎉 你已成功加入拼单！请准时到达集合地点。')
}
</script>

<template>
  <div class="page">
    <div class="page-hd"><h2>🤝 拼单搭子</h2><p class="sub">找人一起拼、一起玩、一起学</p></div>
    <div class="grid">
      <div v-for="g in store.groupBuys" :key="g.id" class="card">
        <div class="card-img"><img :src="g.image" :alt="g.title" /></div>
        <div class="card-body">
          <el-tag type="success" size="small">{{ g.type }}</el-tag>
          <div class="card-title">{{ g.title }}</div>
          <div class="card-desc">{{ g.desc }}</div>
          <div class="progress-box">
            <div class="progress-hd"><span>拼单进度</span><span style="color:#059669;">{{ g.current }}/{{ g.total }} 人</span></div>
            <el-progress :percentage="Math.round(g.current / g.total * 100)" :stroke-width="8" color="#10b981" />
          </div>
          <div class="card-meta">💰 {{ g.price }} · ⏰ 截止 {{ g.deadline }} · 📍 {{ g.location }}</div>
          <el-button type="success" style="width:100%;margin-top:12px;" @click="joinGroup(g)">🤝 加入拼单</el-button>
        </div>
      </div>
      <el-empty v-if="store.groupBuys.length === 0" description="暂无拼单信息" />
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 1200px; margin: 0 auto; }
.page-hd { margin-bottom: 24px; }
.page-hd h2 { font-size: 24px; font-weight: 700; margin: 0 0 8px; }
.sub { font-size: 14px; color: #64748b; margin: 0; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 18px; }
.card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; transition: all 0.25s; }
.card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.card-img { height: 180px; overflow: hidden; background: #e2e8f0; }
.card-img img { width: 100%; height: 100%; object-fit: cover; }
.card-body { padding: 18px; }
.card-title { font-size: 16px; font-weight: 600; margin: 8px 0 6px; }
.card-desc { font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 12px; }
.progress-box { margin-bottom: 10px; padding: 14px; background: #f0fdf4; border-radius: 12px; }
.progress-hd { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; font-weight: 600; }
.card-meta { font-size: 12px; color: #94a3b8; margin-bottom: 4px; }
</style>
