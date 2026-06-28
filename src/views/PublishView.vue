<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMarketStore } from '@/stores/market'
import { ElMessage } from 'element-plus'

const router = useRouter()
const store = useMarketStore()

const form = ref({
  title: '',
  price: 0,
  desc: '',
  content: '',
  category: '',
  location: '',
  contact: '',
  image: '',
})

const imagePreview = ref('')
const uploading = ref(false)

const categories = ['数码/电器', '书籍/资料', '生活用品', '文体/娱乐', '服饰/鞋包', '美妆/个护', '食品/饮料', '其他']

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
    form.value.image = base64
    imagePreview.value = base64
    uploading.value = false
  }
  reader.readAsDataURL(file)
}

function removeImage() {
  form.value.image = ''
  imagePreview.value = ''
}

function submitPublish() {
  if (!form.value.title.trim()) {
    ElMessage.warning('请输入商品标题')
    return
  }
  if (form.value.price <= 0) {
    ElMessage.warning('请输入有效价格')
    return
  }
  if (!form.value.desc.trim()) {
    ElMessage.warning('请输入商品简述')
    return
  }
  if (!form.value.category) {
    ElMessage.warning('请选择商品分类')
    return
  }
  if (!form.value.location.trim()) {
    ElMessage.warning('请输入交易地点')
    return
  }
  if (!form.value.contact.trim()) {
    ElMessage.warning('请输入联系方式')
    return
  }

  store.addProduct({
    title: form.value.title.trim(),
    price: form.value.price,
    desc: form.value.desc.trim(),
    content: form.value.content.trim() || form.value.desc.trim(),
    category: form.value.category,
    location: form.value.location.trim(),
    seller: store.userInfo.name,
    contact: form.value.contact.trim(),
    image: form.value.image,
    publisherId: store.currentUserId,
  })

  ElMessage.success('🎉 商品发布成功！')
  router.push('/list')
}
</script>

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

      <div class="form-row">
        <label class="form-label">商品简述 <span class="required">*</span></label>
        <input
          v-model="form.desc"
          type="text"
          class="form-input"
          placeholder="一句话描述商品的亮点（将显示在列表卡片中）"
          maxlength="100"
        />
      </div>

      <div class="form-row">
        <label class="form-label">详细描述</label>
        <textarea
          v-model="form.content"
          class="form-textarea"
          placeholder="详细描述商品的状态、使用时长、有无瑕疵、配件等信息..."
          rows="5"
          maxlength="500"
        ></textarea>
      </div>

      <div class="form-row form-row-2col">
        <div class="form-col">
          <label class="form-label">交易地点 <span class="required">*</span></label>
          <input
            v-model="form.location"
            type="text"
            class="form-input"
            placeholder="例如：校本部 3 号楼"
          />
        </div>
        <div class="form-col">
          <label class="form-label">联系方式 <span class="required">*</span></label>
          <input
            v-model="form.contact"
            type="text"
            class="form-input"
            placeholder="手机号 / QQ / 微信"
          />
        </div>
      </div>

      <div class="form-actions">
        <button class="btn-submit" @click="submitPublish">🚀 立即发布</button>
        <button class="btn-cancel" @click="router.back()">取消</button>
      </div>
    </div>
  </div>
</template>

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

.form-select {
  appearance: none;
  cursor: pointer;
}

.form-textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #1e293b;
  background: #fff;
  outline: none;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form-textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
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

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(16,185,129,0.35);
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
