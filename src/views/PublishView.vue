<template>
  <div class="publish-page">
    <div class="publish-card">
      <div class="publish-header">
        <h2>📝 发布商品</h2>
        <p class="publish-subtitle">填写商品信息，让更多人看到你的好物</p>
      </div>

      <div class="form-row">
        <label class="form-label">商品图片</label>
        <div class="image-upload">
          <div v-if="imagePreview" class="image-preview-box">
            <img :src="imagePreview" class="preview-img" />
            <button class="remove-img" @click="removeImage">✕</button>
          </div>
          <label v-else class="upload-trigger">
            <input
              type="file"
              accept="image/*"
              class="upload-input"
              @change="handleImageUpload"
            />
            <span class="upload-icon">📷</span>
            <span class="upload-text">{{ uploading ? '上传中...' : '点击上传商品图片' }}</span>
          </label>
        </div>
      </div>

      <div class="form-row">
        <label class="form-label">商品标题 <span class="required">*</span></label>
        <input
          v-model="form.title"
          type="text"
          class="form-input"
          placeholder="例如：九成新 iPhone 14 Pro 256G"
          maxlength="50"
        />
      </div>

      <div class="form-row form-row-2col">
        <div class="form-col">
          <label class="form-label">价格 (¥) <span class="required">*</span></label>
          <input
            v-model.number="form.price"
            type="number"
            class="form-input"
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>
        <div class="form-col">
          <label class="form-label">分类 <span class="required">*</span></label>
          <select v-model="form.category" class="form-input form-select">
            <option value="" disabled>请选择分类</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
      </div>

      <div class="form-row form-row-2col">
        <div class="form-col">
          <label class="form-label">成色 <span class="required">*</span></label>
          <select v-model="form.condition" class="form-input form-select">
            <option value="" disabled>请选择成色</option>
            <option value="全新">全新</option>
            <option value="九成新">九成新</option>
            <option value="八成新">八成新</option>
            <option value="七成新">七成新</option>
            <option value="六成新及以下">六成新及以下</option>
          </select>
        </div>
        <div class="form-col">
          <label class="form-label">交易地点 <span class="required">*</span></label>
          <input
            v-model="form.location"
            type="text"
            class="form-input"
            placeholder="例如：校本部 3 号楼"
          />
        </div>
      </div>

      <div class="form-row">
        <label class="form-label">商品简介 <span class="required">*</span></label>
        <input
          v-model="form.description"
          type="text"
          class="form-input"
          placeholder="一句话描述商品的亮点（将显示在列表卡片中）"
          maxlength="100"
        />
      </div>

      <div class="form-row form-row-2col">
        <div class="form-col">
          <label class="form-label">发布人</label>
          <input
            v-model="form.publisher"
            type="text"
            class="form-input"
            placeholder="你的昵称"
          />
        </div>
        <div class="form-col">
          <label class="form-label">发布时间</label>
          <input
            v-model="form.publishTime"
            type="text"
            class="form-input"
            disabled
          />
        </div>
      </div>

      <div class="form-actions">
        <button class="btn-submit" :disabled="submitting" @click="submitPublish">
          {{ submitting ? '发布中...' : '🚀 立即发布' }}
        </button>
        <button class="btn-cancel" @click="router.back()">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { createTrade } from '../api/trade'

const router = useRouter()
const submitting = ref(false)

const now = new Date()
const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

const form = reactive({
  title: '',
  price: 0,
  category: '',
  condition: '',
  location: '',
  description: '',
  image: '',
  publisher: '张三同学',
  publishTime: todayStr,
  status: 'open',
})

const imagePreview = ref('')
const uploading = ref(false)
const categories = ['数码/电器', '书籍/资料', '生活用品', '文体/娱乐', '服饰/鞋包', '其他']

function handleImageUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    ElMessage.warning('图片大小不能超过5MB')
    return
  }

  uploading.value = true
  const reader = new FileReader()
  reader.onload = (ev) => {
    const base64 = ev.target?.result as string
    form.image = base64
    imagePreview.value = base64
    uploading.value = false
  }
  reader.readAsDataURL(file)
}

function removeImage() {
  form.image = ''
  imagePreview.value = ''
}

async function submitPublish() {
  if (!form.title.trim()) { ElMessage.warning('请输入商品标题'); return }
  if (form.price <= 0) { ElMessage.warning('请输入有效价格'); return }
  if (!form.category) { ElMessage.warning('请选择商品分类'); return }
  if (!form.condition) { ElMessage.warning('请选择成色'); return }
  if (!form.location.trim()) { ElMessage.warning('请输入交易地点'); return }
  if (!form.description.trim()) { ElMessage.warning('请输入商品简介'); return }

  submitting.value = true
  try {
    await createTrade({
      title: form.title.trim(),
      price: form.price,
      category: form.category,
      condition: form.condition,
      location: form.location.trim(),
      description: form.description.trim(),
      image: form.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      publisher: form.publisher.trim() || '匿名用户',
      publishTime: form.publishTime,
      status: 'open',
    })
    ElMessage.success('🎉 商品发布成功！')
    router.push('/trade')
  } catch {
    ElMessage.error('发布失败，请确认 JSON Server 已启动')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.publish-page {
  max-width: 700px;
  margin: 0 auto;
}

.publish-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  padding: 36px;
}

.publish-header {
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f1f5f9;
}

.publish-header h2 {
  font-size: 26px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px;
}

.publish-subtitle {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

.form-row {
  margin-bottom: 24px;
}

.form-row-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.required {
  color: #ef4444;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #1e293b;
  background: #fff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
}

.form-input:disabled {
  background: #f8fafc;
  color: #94a3b8;
}

.form-select {
  appearance: none;
  cursor: pointer;
}

.image-upload {
  display: flex;
  align-items: center;
}

.image-preview-box {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-img {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: background 0.2s;
}

.remove-img:hover {
  background: #ef4444;
}

.upload-trigger {
  width: 200px;
  height: 200px;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.upload-trigger:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}

.upload-input {
  display: none;
}

.upload-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.upload-text {
  font-size: 13px;
  color: #64748b;
}

.form-actions {
  display: flex;
  gap: 14px;
  padding-top: 24px;
  border-top: 1px solid #f1f5f9;
}

.btn-submit {
  flex: 1;
  padding: 14px 0;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(16,185,129,0.35);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  padding: 14px 32px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  color: #475569;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  color: #3b82f6;
  border-color: #3b82f6;
}

@media (max-width: 768px) {
  .publish-card { padding: 24px 16px; }
  .form-row-2col { grid-template-columns: 1fr; }
}
</style>
