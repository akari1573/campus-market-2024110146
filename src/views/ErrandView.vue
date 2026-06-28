<script setup lang="ts">
import { useMarketStore } from '@/stores/market'
import { ElMessage } from 'element-plus'

const store = useMarketStore()

function takeTask(e: typeof store.errandTasks[0]) {
  ElMessage.success('✅ 接单成功！请及时联系发布者确认取件信息。')
}
</script>

<template>
  <div class="page">
    <div class="page-hd"><h2>🏃 跑腿委托</h2><p class="sub">发布跑腿任务，找人帮你办事</p></div>
    <div class="grid">
      <div v-for="e in store.errandTasks" :key="e.id" class="card">
        <div class="card-img"><img :src="e.image" :alt="e.title" /></div>
        <div class="card-body">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <el-tag type="warning" size="small">{{ e.type }}</el-tag>
            <el-tag size="small" :type="e.status === '待接单' ? 'warning' : 'success'">{{ e.status }}</el-tag>
          </div>
          <div class="card-title">{{ e.title }}</div>
          <div class="card-desc">{{ e.desc }}</div>
          <div class="reward-card"><div class="reward-amt">¥{{ e.reward }}.00</div><div class="reward-label">任务报酬</div></div>
          <div class="card-meta">
            <div>📍 {{ e.fromAddr }} → 🏠 {{ e.toAddr }}</div>
            <div>⏰ {{ e.deadline }}</div>
          </div>
          <el-button type="warning" style="width:100%;margin-top:12px;" @click="takeTask(e)">✋ 我要接单</el-button>
        </div>
      </div>
      <el-empty v-if="store.errandTasks.length === 0" description="暂无委托任务" />
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 1200px; margin: 0 auto; }
.page-hd { margin-bottom: 24px; }
.page-hd h2 { font-size: 24px; font-weight: 700; margin: 0 0 8px; }
.sub { font-size: 14px; color: #64748b; margin: 0; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 18px; }
.card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; transition: all 0.25s; }
.card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.card-img { height: 160px; overflow: hidden; background: #e2e8f0; }
.card-img img { width: 100%; height: 100%; object-fit: cover; }
.card-body { padding: 18px; }
.card-title { font-size: 16px; font-weight: 600; margin: 8px 0 6px; }
.card-desc { font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 10px; }
.reward-card { text-align: center; padding: 14px; background: linear-gradient(135deg,#fff7ed,#fed7aa); border-radius: 12px; margin-bottom: 10px; }
.reward-amt { font-size: 28px; font-weight: 800; color: #d97706; }
.reward-label { font-size: 12px; color: #92400e; }
.card-meta { font-size: 12px; color: #94a3b8; line-height: 1.6; }
</style>
