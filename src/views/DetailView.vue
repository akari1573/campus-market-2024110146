<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useMarketStore } from '@/stores/market'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const store = useMarketStore()
const id = Number(route.params.id)
const detail = computed(() => store.getProductById(id))
if (detail.value) store.incrementViews(id)

const related = computed(() => store.products.filter(p => p.id !== id).slice(0, 4))

function contactSeller() { if (detail.value) ElMessage.success(`已向卖家 ${detail.value.seller} 发送消息（联系方式：${detail.value.contact}）`) }
function addFavorite() { ElMessage.success('⭐ 已加入收藏') }
</script>

<template>
  <div class="page">
    <div class="breadcrumb">
      <router-link to="/">首页</router-link><span class="sep">/</span>
      <router-link to="/trade">二手交易</router-link><span class="sep">/</span>
      <span class="current">{{ detail?.title || '商品详情' }}</span>
    </div>

    <div v-if="!detail" class="not-found">
      <el-empty description="商品未找到"><el-button type="primary" @click="router.push('/list')">返回列表</el-button></el-empty>
    </div>

    <template v-else>
      <div class="detail-grid">
        <div>
          <div class="main-card">
            <div class="img-main"><img :src="detail.image" :alt="detail.title" /></div>
            <div class="main-body">
              <h1 class="dt-title">{{ detail.title }}</h1>
              <div class="dt-price">¥{{ detail.price }} <span class="orig">原价 ¥{{ Math.round(detail.price * 1.4) }}</span></div>
              <div class="dt-tags">
                <el-tag type="primary">{{ detail.category }}</el-tag>
                <el-tag>{{ detail.tag }}</el-tag>
                <span class="views">👁 {{ detail.views }}次 · 🕐 {{ detail.publishTime }}</span>
              </div>
              <div class="dt-meta">
                <div class="meta-item"><span class="lbl">📍 交易地点：</span><span class="val">{{ detail.location }}</span></div>
                <div class="meta-item"><span class="lbl">📱 联系方式：</span><span class="val">{{ detail.contact }}</span></div>
                <div class="meta-item"><span class="lbl">💳 交易方式：</span><span class="val">当面交易 / 可小刀</span></div>
                <div class="meta-item"><span class="lbl">🆔 编号：</span><span class="val">SH00{{ detail.id }}</span></div>
              </div>
              <div class="dt-body"><h3>📝 商品描述</h3><p>{{ detail.content }}</p></div>
              <div class="dt-actions">
                <el-button type="primary" size="large" @click="contactSeller">💬 联系卖家</el-button>
                <el-button size="large" @click="addFavorite">⭐ 收藏</el-button>
                <div style="flex:1;" />
                <el-button size="large" type="danger" plain>🚩 举报</el-button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="side-card">
            <h3>👤 卖家信息</h3>
            <div class="seller-row">
              <div class="seller-avt"><img :src="store.userInfo.avatar" alt="" /></div>
              <div><div class="seller-name">{{ detail.seller }}</div><div class="seller-badge">✅ 已实名 · 信用良好</div></div>
            </div>
            <el-button type="primary" style="width:100%;margin-bottom:8px;" @click="contactSeller">💬 联系卖家</el-button>
            <el-button style="width:100%;" @click="router.push('/profile')">👀 查看TA的资料</el-button>
          </div>
          <div class="side-card">
            <h3>🎯 相关推荐</h3>
            <router-link v-for="r in related" :key="r.id" :to="`/detail/${r.id}`" class="rec-row">
              <div class="rec-thumb"><img :src="r.image" alt="" /></div>
              <div class="rec-mid"><div class="rec-name">{{ r.title }}</div><div class="rec-views">{{ r.views }}次浏览</div></div>
              <div class="rec-price">¥{{ r.price }}</div>
            </router-link>
          </div>
          <div class="safety-box">
            <strong>⚠️ 交易安全提醒</strong><br>
            · 建议校内公共场所当面交易<br>· 贵重物品当场验货<br>· 谨防提前转账诈骗
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.page { max-width: 1240px; margin: 0 auto; }
.breadcrumb { margin-bottom: 20px; font-size: 13px; color: #64748b; display: flex; gap: 6px; align-items: center; }
.breadcrumb a { color: #3b82f6; text-decoration: none; }
.sep { color: #cbd5e1; }
.current { color: #1e293b; font-weight: 500; }
.not-found { text-align: center; padding: 80px; }
.detail-grid { display: grid; grid-template-columns: 1fr 380px; gap: 24px; }
.main-card { background: #fff; border-radius: 18px; overflow: hidden; box-shadow: 0 1px 8px rgba(0,0,0,0.04); border: 1px solid #f1f5f9; }
.img-main { height: 460px; background: #f8fafc; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.img-main img { width: 100%; height: 100%; object-fit: contain; }
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
.rec-row { display: flex; gap: 10px; padding: 11px 0; border-bottom: 1px solid #f8fafc; text-decoration: none; color: inherit; transition: color 0.2s; }
.rec-row:last-child { border-bottom: none; }
.rec-row:hover { color: #3b82f6; }
.rec-thumb { width: 56px; height: 56px; border-radius: 10px; overflow: hidden; background: #e2e8f0; flex-shrink: 0; }
.rec-thumb img { width: 100%; height: 100%; object-fit: cover; }
.rec-mid { flex: 1; min-width: 0; }
.rec-name { font-size: 13px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rec-views { font-size: 11px; color: #94a3b8; }
.rec-price { font-size: 14px; font-weight: 700; color: #ef4444; white-space: nowrap; }
.safety-box { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; padding: 16px; font-size: 13px; color: #9a3412; line-height: 1.9; }
</style>
