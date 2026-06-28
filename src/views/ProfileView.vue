<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMarketStore } from '@/stores/market'
import { ElMessage } from 'element-plus'

const router = useRouter()
const store = useMarketStore()

const editing = ref(false)
const editForm = ref({
  name: store.userInfo.name,
  phone: store.userInfo.phone,
  campus: store.userInfo.campus,
  dorm: store.userInfo.dorm,
  signature: store.userInfo.signature,
})

const avatarPreview = ref(store.userInfo.avatar)

function handleAvatarUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    ElMessage.warning('头像图片不能超过2MB')
    return
  }

  const reader = new FileReader()
  reader.onload = (ev) => {
    avatarPreview.value = ev.target?.result as string
  }
  reader.readAsDataURL(file)
}

function startEdit() {
  editForm.value = {
    name: store.userInfo.name,
    phone: store.userInfo.phone,
    campus: store.userInfo.campus,
    dorm: store.userInfo.dorm,
    signature: store.userInfo.signature,
  }
  editing.value = true
}

function cancelEdit() {
  editing.value = false
}

function saveProfile() {
  if (!editForm.value.name.trim()) {
    ElMessage.warning('请输入用户名')
    return
  }
  store.updateUserInfo({
    name: editForm.value.name.trim(),
    phone: editForm.value.phone.trim(),
    campus: editForm.value.campus.trim(),
    dorm: editForm.value.dorm.trim(),
    signature: editForm.value.signature.trim(),
    avatar: avatarPreview.value,
  })
  editing.value = false
  ElMessage.success('个人资料已更新')
}

function goDetail(id: number) {
  router.push(`/detail/${id}`)
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-card">
      <div class="profile-banner"></div>
      <div class="profile-info">
        <div class="avatar-section">
          <div v-if="editing" class="avatar-edit">
            <img
              v-if="avatarPreview"
              :src="avatarPreview"
              class="avatar-img"
            />
            <span v-else class="avatar-placeholder">{{ store.userInfo.name.slice(0, 1) }}</span>
            <label class="avatar-upload-label">
              <input
                type="file"
                accept="image/*"
                class="avatar-upload-input"
                @change="handleAvatarUpload"
              />
              更换头像
            </label>
          </div>
          <div v-else class="avatar-static">
            <img
              v-if="store.userInfo.avatar"
              :src="store.userInfo.avatar"
              class="avatar-img"
            />
            <span v-else class="avatar-placeholder">{{ store.userInfo.name.slice(0, 1) }}</span>
          </div>

          <div v-if="!editing" class="profile-name-row">
            <h2 class="profile-name">{{ store.userInfo.name }}</h2>
            <span class="profile-signature">{{ store.userInfo.signature || '这个人很懒，什么都没写~' }}</span>
          </div>
        </div>

        <div class="profile-details">
          <template v-if="editing">
            <div class="edit-fields">
              <div class="edit-field">
                <label>用户名</label>
                <input v-model="editForm.name" type="text" class="edit-input" placeholder="你的名字" />
              </div>
              <div class="edit-field">
                <label>手机号</label>
                <input v-model="editForm.phone" type="text" class="edit-input" placeholder="手机号码" />
              </div>
              <div class="edit-field">
                <label>校区</label>
                <input v-model="editForm.campus" type="text" class="edit-input" placeholder="所在校区" />
              </div>
              <div class="edit-field">
                <label>宿舍</label>
                <input v-model="editForm.dorm" type="text" class="edit-input" placeholder="宿舍楼号" />
              </div>
              <div class="edit-field">
                <label>个性签名</label>
                <input
                  v-model="editForm.signature"
                  type="text"
                  class="edit-input"
                  placeholder="写一句话介绍自己"
                  maxlength="30"
                />
              </div>
            </div>
            <div class="edit-actions">
              <button class="btn-save" @click="saveProfile">保存</button>
              <button class="btn-cancel-edit" @click="cancelEdit">取消</button>
            </div>
          </template>
          <template v-else>
            <div class="detail-items">
              <div class="detail-item">
                <span class="detail-icon">📱</span>
                <span class="detail-label">手机</span>
                <span class="detail-value">{{ store.userInfo.phone }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-icon">🏫</span>
                <span class="detail-label">校区</span>
                <span class="detail-value">{{ store.userInfo.campus }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-icon">🏠</span>
                <span class="detail-label">宿舍</span>
                <span class="detail-value">{{ store.userInfo.dorm }}</span>
              </div>
            </div>
            <button class="btn-edit" @click="startEdit">✏️ 编辑资料</button>
          </template>
        </div>
      </div>
    </div>

    <div class="my-products-section">
      <div class="section-header">
        <h3>📦 我发布的商品</h3>
        <span class="product-count">共 {{ store.myProducts.length }} 件</span>
      </div>

      <div v-if="store.myProducts.length === 0" class="no-products">
        <span class="no-icon">📭</span>
        <p>你还没有发布任何商品</p>
        <button class="go-publish-btn" @click="router.push('/publish')">去发布</button>
      </div>

      <div v-else class="my-products-grid">
        <div
          v-for="p in store.myProducts"
          :key="p.id"
          class="my-product-card"
          @click="goDetail(p.id)"
        >
          <div class="mp-img-box">
            <img v-if="p.image" :src="p.image" class="mp-img" />
            <span v-else class="mp-placeholder">📸</span>
          </div>
          <div class="mp-info">
            <span class="mp-title">{{ p.title }}</span>
            <span class="mp-price">¥{{ p.price }}</span>
            <div class="mp-meta">
              <span>{{ p.category }}</span>
              <span>{{ p.views }}次浏览</span>
              <span>{{ p.publishTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 900px;
  margin: 0 auto;
}

.profile-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  overflow: hidden;
  margin-bottom: 28px;
}

.profile-banner {
  height: 120px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.profile-info {
  padding: 0 28px 28px;
  margin-top: -60px;
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  width: 140px;
}

.avatar-static,
.avatar-edit {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  font-size: 42px;
  font-weight: 700;
  color: #f97316;
}

.avatar-edit {
  flex-direction: column;
  gap: 0;
  width: auto;
  height: auto;
  border-radius: 16px;
  padding: 16px;
  border: none;
  background: #f8fafc;
}

.avatar-edit .avatar-img,
.avatar-edit .avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.avatar-upload-label {
  font-size: 12px;
  color: #3b82f6;
  cursor: pointer;
  font-weight: 600;
}

.avatar-upload-input {
  display: none;
}

.profile-name-row {
  text-align: center;
}

.profile-name {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px;
}

.profile-signature {
  font-size: 13px;
  color: #64748b;
}

.profile-details {
  flex: 1;
  padding-top: 60px;
}

.detail-items {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f8fafc;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
}

.detail-icon {
  font-size: 16px;
}

.detail-label {
  color: #64748b;
}

.detail-value {
  color: #1e293b;
  font-weight: 500;
}

.btn-edit {
  padding: 8px 20px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #475569;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-edit:hover {
  color: #3b82f6;
  border-color: #3b82f6;
}

.edit-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 16px;
}

.edit-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.edit-field label {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
}

.edit-input {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.edit-input:focus {
  border-color: #3b82f6;
}

.edit-actions {
  display: flex;
  gap: 10px;
}

.btn-save {
  padding: 8px 24px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-save:hover {
  background: #2563eb;
}

.btn-cancel-edit {
  padding: 8px 24px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #475569;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.my-products-section {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  padding: 24px 28px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  font-size: 19px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.product-count {
  font-size: 13px;
  color: #64748b;
  background: #f1f5f9;
  padding: 4px 14px;
  border-radius: 12px;
}

.no-products {
  text-align: center;
  padding: 48px 20px;
}

.no-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.no-products p {
  color: #64748b;
  margin: 0 0 16px;
}

.go-publish-btn {
  padding: 10px 28px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.go-publish-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16,185,129,0.35);
}

.my-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.my-product-card {
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #f1f5f9;
}

.my-product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
}

.mp-img-box {
  height: 140px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mp-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mp-placeholder {
  font-size: 40px;
  opacity: 0.35;
}

.mp-info {
  padding: 12px;
}

.mp-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  display: block;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mp-price {
  font-size: 18px;
  font-weight: 800;
  color: #ef4444;
  display: block;
  margin-bottom: 8px;
}

.mp-meta {
  display: flex;
  gap: 8px;
  font-size: 11px;
  color: #64748b;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .profile-info {
    flex-direction: column;
    align-items: center;
  }
  .profile-details {
    padding-top: 0;
    width: 100%;
  }
  .detail-items {
    justify-content: center;
  }
  .avatar-section {
    width: 100%;
  }
  .edit-fields {
    grid-template-columns: 1fr;
  }
}
</style>
