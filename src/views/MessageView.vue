<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMarketStore } from '@/stores/market'
import { ElMessage } from 'element-plus'

const store = useMarketStore()

const messages = computed(() => store.myMessages)
const unreadCount = computed(() => store.unreadCount)

const selectedMsg = ref<number | null>(null)
const replyText = ref('')

const selectedMessage = computed(() =>
  selectedMsg.value ? messages.value.find((m) => m.id === selectedMsg.value) : null
)

function selectMessage(id: number) {
  selectedMsg.value = id
  store.markAsRead(id)
}

function sendReply() {
  if (!replyText.value.trim() || !selectedMessage.value) return
  store.addMessage({
    from: 'user_001',
    to: 'system',
    content: replyText.value.trim(),
    productTitle: selectedMessage.value.productTitle,
    unread: false,
  })
  ElMessage.success('回复已发送')
  replyText.value = ''
}

function refreshMessages() {
  const newMsgs = [
    '你好，这个商品还在吗？价格能优惠些吗？',
    '我就在校本部，方便今天交易吗？',
    '请问商品有什么瑕疵吗？',
    '可以留一下具体的看货时间吗？',
  ]
  const randomMsg = newMsgs[Math.floor(Math.random() * newMsgs.length)] ?? '你好，请问这个商品还有吗？'
  store.addMessage({
    from: '买家用户',
    to: 'user_001',
    content: randomMsg,
    productTitle: '二手自行车',
    unread: true,
  })
  ElMessage.success('📩 收到一条新消息！')
}
</script>

<template>
  <div class="message-page">
    <div class="msg-header">
      <h2>💬 消息中心</h2>
      <div class="msg-header-actions">
        <span v-if="unreadCount > 0" class="unread-badge">{{ unreadCount }}条未读</span>
        <button class="refresh-btn" @click="refreshMessages">📩 模拟接收消息</button>
      </div>
    </div>

    <div class="msg-layout">
      <div class="msg-list">
        <div v-if="messages.length === 0" class="msg-empty">
          <span class="empty-icon">📭</span>
          <p>暂无消息</p>
          <p class="empty-hint">点击右上角按钮模拟接收消息</p>
        </div>
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="msg-item"
          :class="{ active: selectedMsg === msg.id, unread: msg.unread }"
          @click="selectMessage(msg.id)"
        >
          <div class="msg-item-avatar">
            {{ msg.from === '系统' ? '📢' : '👤' }}
          </div>
          <div class="msg-item-content">
            <div class="msg-item-top">
              <span class="msg-from">{{ msg.from }}</span>
              <span class="msg-time">{{ msg.time }}</span>
            </div>
            <span class="msg-subject">{{ msg.productTitle }}</span>
            <p class="msg-preview">{{ msg.content }}</p>
          </div>
          <span v-if="msg.unread" class="msg-dot"></span>
        </div>
      </div>

      <div class="msg-detail">
        <div v-if="!selectedMessage" class="msg-detail-empty">
          <span class="empty-icon">💌</span>
          <p>选择一条消息查看详情</p>
        </div>
        <template v-else>
          <div class="msg-detail-header">
            <h3>{{ selectedMessage.productTitle }}</h3>
            <span class="msg-detail-from">来自：{{ selectedMessage.from }}</span>
            <span class="msg-detail-time">{{ selectedMessage.time }}</span>
          </div>
          <div class="msg-detail-body">
            <div class="chat-bubble received">
              <p>{{ selectedMessage.content }}</p>
            </div>

            <div
              v-for="m in messages.filter(m => m.from === 'user_001' && selectedMessage && m.productTitle === selectedMessage.productTitle && m.id > selectedMessage.id)"
              :key="m.id"
              class="chat-bubble sent"
            >
              <p>{{ m.content }}</p>
            </div>
          </div>
          <div class="msg-reply-box">
            <input
              v-model="replyText"
              type="text"
              class="reply-input"
              placeholder="输入回复消息..."
              @keyup.enter="sendReply"
            />
            <button class="reply-btn" @click="sendReply">发送</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-page {
  max-width: 1000px;
  margin: 0 auto;
}

.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.msg-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.msg-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.unread-badge {
  background: #fef2f2;
  color: #ef4444;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
}

.refresh-btn {
  padding: 8px 18px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.refresh-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59,130,246,0.35);
}

.msg-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 20px;
  height: 560px;
}

.msg-list {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  overflow-y: auto;
}

.msg-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #64748b;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-hint {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 4px;
}

.msg-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.15s;
  position: relative;
}

.msg-item:hover {
  background: #f8fafc;
}

.msg-item.active {
  background: #eff6ff;
}

.msg-item.unread {
  background: #fefefe;
}

.msg-item.active.unread {
  background: #eff6ff;
}

.msg-item-avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.msg-item-content {
  flex: 1;
  min-width: 0;
}

.msg-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.msg-from {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.msg-time {
  font-size: 11px;
  color: #94a3b8;
}

.msg-subject {
  font-size: 12px;
  color: #3b82f6;
  background: #eff6ff;
  padding: 1px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 4px;
}

.msg-preview {
  font-size: 13px;
  color: #64748b;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.msg-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  flex-shrink: 0;
  position: absolute;
  right: 16px;
  top: 18px;
}

.msg-detail {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.msg-detail-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #64748b;
}

.msg-detail-header {
  padding: 20px;
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
}

.msg-detail-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 6px;
}

.msg-detail-from {
  font-size: 13px;
  color: #475569;
  display: block;
  margin-bottom: 4px;
}

.msg-detail-time {
  font-size: 12px;
  color: #94a3b8;
}

.msg-detail-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f8fafc;
}

.chat-bubble {
  max-width: 80%;
  margin-bottom: 14px;
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.6;
}

.chat-bubble p {
  margin: 0;
}

.chat-bubble.received {
  background: #fff;
  color: #1e293b;
  border-radius: 4px 14px 14px 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

.chat-bubble.sent {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  margin-left: auto;
  border-radius: 14px 4px 14px 14px;
}

.msg-reply-box {
  display: flex;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid #f1f5f9;
  background: #fff;
}

.reply-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.reply-input:focus {
  border-color: #3b82f6;
}

.reply-btn {
  padding: 10px 22px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.reply-btn:hover {
  background: #2563eb;
}

@media (max-width: 768px) {
  .msg-layout {
    grid-template-columns: 1fr;
    height: auto;
  }
  .msg-list { height: 300px; }
  .msg-detail { height: 400px; }
}
</style>
