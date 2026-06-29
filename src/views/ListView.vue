<template>
  <div class="page">
    <div class="page-hd"><h2>🛍️ 全部商品</h2><span class="total">共 {{ total }} 件</span></div>
    <div class="filter-card">
      <el-input v-model="searchText" placeholder="搜索商品..." clearable size="default" style="width:260px;" @clear="fetchData" @keyup.enter="fetchData"><template #prefix>🔍</template></el-input>
      <el-select v-model="filterCat" size="default" style="width:150px;" @change="fetchData">
        <el-option label="全部分类" value="" />
        <el-option v-for="c in categories" :key="c" :label="c" :value="c" />
      </el-select>
      <el-select v-model="sortKey" size="default" style="width:150px;" @change="fetchData">
        <el-option label="最新发布" value="id" />
        <el-option label="价格低到高" value="price" />
        <el-option label="价格高到低" value="price_desc" />
      </el-select>
    </div>
    <div class="product-grid">
      <div v-for="p in items" :key="p.id" class="product-card" @click="goDetail(p.id)">
        <div class="card-img"><img :src="p.image" :alt="p.title" /></div>
        <div class="card-body">
          <div class="card-title">{{ p.title }}</div>
          <div class="card-desc">{{ p.description }}</div>
          <div class="card-footer">
            <span class="card-price">¥{{ p.price }}</span>
            <span class="card-meta"><el-tag size="small" type="primary">{{ p.category }}</el-tag> 📍 {{ p.location }}</span>
          </div>
        </div>
      </div>
      <el-empty v-if="items.length === 0" description="没有找到匹配的商品" />
    </div>
    <div class="pagination" v-if="total > pageSize">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" v-model:current-page="currentPage" @current-change="fetchData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTrades, type TradeItem } from '../api/trade'

const router = useRouter()
const items = ref<TradeItem[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = 8
const searchText = ref('')
const filterCat = ref('')
const sortKey = ref('id')

const categories = ['数码/电器', '书籍/资料', '生活用品', '文体/娱乐', '服饰/鞋包', '其他']

async function fetchData() {
  const params: Record<string, string | number> = {
    _page: currentPage.value,
    _limit: pageSize,
  }

  if (searchText.value) {
    params.q = searchText.value
  }
  if (filterCat.value) {
    params.category = filterCat.value
  }
  if (sortKey.value === 'price') {
    params._sort = 'price'
    params._order = 'asc'
  } else if (sortKey.value === 'price_desc') {
    params._sort = 'price'
    params._order = 'desc'
  } else {
    params._sort = 'id'
    params._order = 'desc'
  }

  const res = await getTrades(params)
  items.value = res.data
  total.value = Number(res.headers['x-total-count'] || res.data.length)
}

function goDetail(id: number) {
  router.push(`/detail/${id}`)
}

onMounted(() => fetchData())
</script>

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
