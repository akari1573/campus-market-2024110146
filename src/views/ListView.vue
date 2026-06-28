<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMarketStore } from '@/stores/market'

const router = useRouter()
const store = useMarketStore()
const searchText = ref('')
const filterCat = ref('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const pageSize = ref(8)

const categories = ['all', '数码/电器', '书籍/资料', '生活用品', '文体/娱乐', '服饰/鞋包', '其他']

const filtered = computed(() => {
  let items = [...store.products]
  if (searchText.value) { const q = searchText.value.toLowerCase(); items = items.filter(i => i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)) }
  if (filterCat.value !== 'all') items = items.filter(i => i.category === filterCat.value)
  if (sortBy.value === 'newest') items.sort((a, b) => b.id - a.id)
  if (sortBy.value === 'price_asc') items.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price_desc') items.sort((a, b) => b.price - a.price)
  if (sortBy.value === 'views') items.sort((a, b) => b.views - a.views)
  return items
})

const paged = computed(() => filtered.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value))

function goDetail(id: number) { router.push(`/detail/${id}`) }
</script>

<template>
  <div class="page">
    <div class="page-hd"><h2>🛍️ 全部商品</h2><span class="total">共 {{ filtered.length }} 件</span></div>
    <div class="filter-card">
      <el-input v-model="searchText" placeholder="搜索商品..." clearable size="default" style="width:260px;"><template #prefix>🔍</template></el-input>
      <el-select v-model="filterCat" size="default" style="width:150px;">
        <el-option label="全部分类" value="all" />
        <el-option v-for="c in categories.filter(x => x !== 'all')" :key="c" :label="c" :value="c" />
      </el-select>
      <el-select v-model="sortBy" size="default" style="width:150px;">
        <el-option label="最新发布" value="newest" />
        <el-option label="价格低到高" value="price_asc" />
        <el-option label="价格高到低" value="price_desc" />
        <el-option label="最多浏览" value="views" />
      </el-select>
    </div>
    <div class="product-grid">
      <div v-for="p in paged" :key="p.id" class="product-card" @click="goDetail(p.id)">
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
      <el-empty v-if="filtered.length === 0" description="没有找到匹配的商品" />
    </div>
    <div class="pagination" v-if="filtered.length > pageSize">
      <el-pagination background layout="prev, pager, next" :total="filtered.length" :page-size="pageSize" v-model:current-page="currentPage" />
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 1200px; margin: 0 auto; }
.page-hd { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-hd h2 { font-size: 24px; font-weight: 700; margin: 0; }
.total { font-size: 13px; color: #64748b; }
.filter-card { display: flex; gap: 14px; align-items: center; margin-bottom: 20px; padding: 16px 20px; background: #fff; border-radius: 14px; box-shadow: 0 1px 6px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
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
.pagination { display: flex; justify-content: center; margin-top: 28px; }
</style>
