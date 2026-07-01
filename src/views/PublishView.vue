<template>
  <div class="publish-page">
    <div class="publish-card">
      <div class="publish-header">
        <h2>📝 发布信息</h2>
        <p class="publish-subtitle">选择发布类型，填写必要信息，让校园需求更快被看见。</p>
      </div>

      <form class="publish-form" @submit.prevent="handleSubmit">
        <FormField label="发布类型" required>
          <select v-model="publishType" class="form-input form-select">
            <option value="trade">二手交易</option>
            <option value="lostFound">失物招领</option>
            <option value="groupBuy">拼单搭子</option>
            <option value="errand">跑腿委托</option>
          </select>
        </FormField>

        <FormField v-if="publishType === 'trade'" label="商品图片">
          <div class="image-upload">
            <div v-if="imagePreview" class="image-preview-box">
              <img :src="imagePreview" class="preview-img" alt="预览" />
              <button type="button" class="remove-img" @click="removeImage">✕</button>
            </div>
            <label v-else class="upload-trigger">
              <input type="file" accept="image/*" class="upload-input" @change="handleImageUpload" />
              <span class="upload-icon">📷</span>
              <span class="upload-text">{{ uploading ? '上传中...' : '点击上传商品图片' }}</span>
            </label>
          </div>
        </FormField>

        <FormField label="标题" required :error="errors.title">
          <input v-model.trim="form.title" type="text" class="form-input" placeholder="请输入标题" />
        </FormField>

        <FormField label="地点" required :error="errors.location">
          <input v-model.trim="form.location" type="text" class="form-input" placeholder="请输入地点" />
        </FormField>

        <FormField label="描述" required :error="errors.description">
          <textarea v-model.trim="form.description" class="form-input form-textarea" rows="4" placeholder="请简要描述具体情况"></textarea>
        </FormField>

        <template v-if="publishType === 'trade'">
          <FormField label="商品分类" required :error="errors.category">
            <select v-model="form.category" class="form-input form-select">
              <option value="" disabled>请选择分类</option>
              <option v-for="c in tradeCategories" :key="c" :value="c">{{ c }}</option>
            </select>
          </FormField>

          <FormField label="价格" required :error="errors.price">
            <input v-model.number="form.tradePrice" type="number" class="form-input" min="0" placeholder="请输入价格" />
          </FormField>

          <FormField label="成色" required :error="errors.condition">
            <select v-model="form.condition" class="form-input form-select">
              <option value="" disabled>请选择成色</option>
              <option value="全新">全新</option>
              <option value="九成新">九成新</option>
              <option value="八成新">八成新</option>
              <option value="正常使用痕迹">正常使用痕迹</option>
            </select>
          </FormField>
        </template>

        <template v-if="publishType === 'lostFound'">
          <FormField label="信息类型" required>
            <select v-model="form.lostFoundType" class="form-input form-select">
              <option value="lost">寻物</option>
              <option value="found">招领</option>
            </select>
          </FormField>

          <FormField label="物品名称" required :error="errors.itemName">
            <input v-model.trim="form.itemName" type="text" class="form-input" placeholder="请输入物品名称" />
          </FormField>

          <FormField label="发生时间" required :error="errors.eventTime">
            <input v-model="form.eventTime" type="datetime-local" class="form-input" />
          </FormField>
        </template>

        <template v-if="publishType === 'groupBuy'">
          <FormField label="拼单类型" required :error="errors.groupType">
            <input v-model.trim="form.groupType" type="text" class="form-input" placeholder="如：拼餐、资料团购、运动搭子" />
          </FormField>

          <FormField label="目标人数" required :error="errors.targetCount">
            <input v-model.number="form.targetCount" type="number" class="form-input" min="2" placeholder="请输入目标人数" />
          </FormField>

          <FormField label="截止时间" required :error="errors.deadline">
            <input v-model="form.deadline" type="datetime-local" class="form-input" />
          </FormField>
        </template>

        <template v-if="publishType === 'errand'">
          <FormField label="任务类型" required :error="errors.taskType">
            <input v-model.trim="form.taskType" type="text" class="form-input" placeholder="如：取快递、代买、代送" />
          </FormField>

          <FormField label="酬劳" required :error="errors.reward">
            <input v-model.number="form.reward" type="number" class="form-input" min="0" placeholder="请输入酬劳" />
          </FormField>

          <FormField label="取件地点" required :error="errors.from">
            <input v-model.trim="form.from" type="text" class="form-input" placeholder="请输入取件地点" />
          </FormField>

          <FormField label="送达地点" required :error="errors.to">
            <input v-model.trim="form.to" type="text" class="form-input" placeholder="请输入送达地点" />
          </FormField>

          <FormField label="截止时间" required :error="errors.deadline">
            <input v-model="form.deadline" type="datetime-local" class="form-input" />
          </FormField>
        </template>

        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="resetForm">重置</button>
          <button type="submit" class="btn-submit" :disabled="submitting">
            {{ submitting ? '提交中...' : '发布' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import FormField from '../components/FormField.vue'
import { createTrade } from '../api/trade'
import { createLostFound } from '../api/lostFound'
import { createGroupBuy } from '../api/groupBuy'
import { createErrand } from '../api/errand'
import { useUserStore } from '../stores/user'

type PublishType = 'trade' | 'lostFound' | 'groupBuy' | 'errand'

const router = useRouter()
const userStore = useUserStore()
const publishType = ref<PublishType>('trade')
const submitting = ref(false)
const imagePreview = ref('')
const uploading = ref(false)

const tradeCategories = ['数码/电器', '书籍/资料', '生活用品', '文体/娱乐', '服饰/鞋包', '其他']

const form = reactive({
  title: '',
  location: '',
  description: '',
  image: '',
  category: '',
  tradePrice: 0,
  condition: '',
  lostFoundType: 'lost' as 'lost' | 'found',
  itemName: '',
  eventTime: '',
  groupType: '',
  targetCount: 2,
  deadline: '',
  taskType: '',
  reward: 0,
  from: '',
  to: '',
})

const errors = reactive<Record<string, string>>({})

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

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
}

function validateForm(): boolean {
  clearErrors()

  if (!form.title) {
    errors.title = '请输入标题'
  }
  if (!form.location) {
    errors.location = '请输入地点'
  }
  if (!form.description) {
    errors.description = '请输入描述'
  }

  if (publishType.value === 'trade') {
    if (!form.category) {
      errors.category = '请选择商品分类'
    }
    if (form.tradePrice <= 0) {
      errors.price = '价格应大于 0'
    }
    if (!form.condition) {
      errors.condition = '请选择商品成色'
    }
  }

  if (publishType.value === 'lostFound') {
    if (!form.itemName) {
      errors.itemName = '请输入物品名称'
    }
    if (!form.eventTime) {
      errors.eventTime = '请选择发生时间'
    }
  }

  if (publishType.value === 'groupBuy') {
    if (!form.groupType) {
      errors.groupType = '请输入拼单类型'
    }
    if (form.targetCount < 2) {
      errors.targetCount = '目标人数不能少于 2 人'
    }
    if (!form.deadline) {
      errors.deadline = '请选择截止时间'
    }
  }

  if (publishType.value === 'errand') {
    if (!form.taskType) {
      errors.taskType = '请输入任务类型'
    }
    if (form.reward < 0) {
      errors.reward = '酬劳不能为负数'
    }
    if (!form.from) {
      errors.from = '请输入取件地点'
    }
    if (!form.to) {
      errors.to = '请输入送达地点'
    }
    if (!form.deadline) {
      errors.deadline = '请选择截止时间'
    }
  }

  return Object.values(errors).every((message) => !message)
}

function getCurrentTime() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  submitting.value = true

  try {
    if (publishType.value === 'trade') {
      await createTrade({
        title: form.title,
        category: form.category,
        price: form.tradePrice,
        condition: form.condition,
        location: form.location,
        publisher: userStore.displayName,
        publishTime: getCurrentTime(),
        image: form.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
        status: 'open',
        description: form.description,
      })
      ElMessage.success('二手商品发布成功')
      router.push('/trade')
    }

    if (publishType.value === 'lostFound') {
      await createLostFound({
        title: form.title,
        type: form.lostFoundType,
        itemName: form.itemName,
        location: form.location,
        eventTime: form.eventTime,
        contact: '站内消息联系',
        status: 'open',
        description: form.description,
      })
      ElMessage.success('失物招领信息发布成功')
      router.push('/lost-found')
    }

    if (publishType.value === 'groupBuy') {
      await createGroupBuy({
        title: form.title,
        type: form.groupType,
        targetCount: form.targetCount,
        currentCount: 1,
        deadline: form.deadline,
        location: form.location,
        publisher: userStore.displayName,
        status: 'open',
        description: form.description,
      })
      ElMessage.success('拼单搭子信息发布成功')
      router.push('/group-buy')
    }

    if (publishType.value === 'errand') {
      await createErrand({
        title: form.title,
        taskType: form.taskType,
        reward: form.reward,
        from: form.from,
        to: form.to,
        deadline: form.deadline,
        publisher: userStore.displayName,
        status: 'open',
        description: form.description,
      })
      ElMessage.success('跑腿委托发布成功')
      router.push('/errand')
    }
  } catch (error) {
    console.error(error)
    ElMessage.error('发布失败，请检查 Mock 服务是否正常运行')
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  form.title = ''
  form.location = ''
  form.description = ''
  form.image = ''
  form.category = ''
  form.tradePrice = 0
  form.condition = ''
  form.lostFoundType = 'lost'
  form.itemName = ''
  form.eventTime = ''
  form.groupType = ''
  form.targetCount = 2
  form.deadline = ''
  form.taskType = ''
  form.reward = 0
  form.from = ''
  form.to = ''
  imagePreview.value = ''
  uploading.value = false
  clearErrors()
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
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
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

.publish-form {
  display: grid;
  gap: 20px;
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
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-select {
  appearance: none;
  cursor: pointer;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
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
  background: rgba(0, 0, 0, 0.5);
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
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #f1f5f9;
}

.btn-submit {
  padding: 12px 28px;
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
  box-shadow: 0 6px 18px rgba(16, 185, 129, 0.35);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  padding: 12px 28px;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #e5e7eb;
}
</style>
