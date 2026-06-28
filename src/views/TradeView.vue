<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMarketStore } from '@/stores/market'

const router = useRouter()
const store = useMarketStore()
const searchText = ref('')
const activeCategory = ref('全部')
const categories = ['全部', '数码/电器', '书籍/资料', '生活用品', '文体/娱乐', '服饰/鞋包', '其他']

const filtered = ref([...store.products])
function filter(cat: string) { activeCategory.value = cat; filtered.value = cat === '全部' ? [...store.products] : store.products.filter(p => p.category === cat) }
function goDetail(id: number) { router.push(`/detail/${id}`) }
</script>

<template>
  <div class="trade-page">
    <div class="page-hd"><h2>🛒 二手交易</h2><span class="count">共 {{ store.products.length }} 件商品</span></div>
    <div class="filter-bar">
      <el-input v-model="searchText" placeholder="搜索你想要的..." clearable size="default" style="width:260px;"><template #prefix>🔍</template></el-input>
      <div class="cat-tags">
        <span v-for="c in categories" :key="c" :class="['cat-tag', { active: activeCategory === c }]" @click="filter(c)">{{ c }}</span>
      </div>
    </div>
    <div class="product-grid">
      <div v-for="p in filtered" :key="p.id" class="product-card" @click="goDetail(p.id)">
        <div class="card-img"><img :src="p.image" :alt="p.title" /></div>
        <div class="card-body">
          <div class="card-title">{{ p.title }}</div>
          <div class="card-desc">{{ p.desc }}</div>
          <div class="card-footer">
            <span class="card-price">¥{{ p.price }}</span>
            <span class="card-meta"><el-tag size="small" type="primary">{{ p.category }}</el-tag> 📍 {{ p.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trade-page { max-width: 1200px; margin: 0 auto; }
.page-hd { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-hd h2 { font-size: 24px; font-weight: 700; margin: 0; }
.count { font-size: 13px; color: #64748b; }
.filter-bar { display: flex; gap: 16px; align-items: center; margin-bottom: 24px; flex-wrap: wrap; }
.cat-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.cat-tag { padding: 6px 16px; background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; font-size: 13px; color: #475569; cursor: pointer; transition: all 0.2s; }
.cat-tag:hover, .cat-tag.active { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(268px, 1fr)); gap: 18px; }
.product-card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,0.03); cursor: pointer; transition: all 0.25s; border: 1px solid #f1f5f9; }
.product-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.08); border-color: #dbeafe; }
.card-img { height: 200px; overflow: hidden; background: #e2e8f0; }
.card-img img { width: 100%; height: 100%; object-fit: cover; }
.card-body { padding: 16px; }
.card-title { font-size: 15px; font-weight: 600; color: #1e293b; margin-bottom: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.card-desc { font-size: 12px; color: #64748b; line-height: 1.5; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 36px; }
.card-footer { display: flex; justify-content: space-between; align-items: center; }
.card-price { font-size: 20px; font-weight: 800; color: #ef4444; }
.card-meta { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #94a3b8; }
</style>
