import http from './http'

export interface MessageItem {
  id: number
  from: string
  to: string
  content: string
  time: string
  productTitle: string
  unread: boolean
}

export function getMessages(params?: Record<string, string | number>) {
  return http.get<MessageItem[]>('/messages', { params })
}

export function createMessage(data: Omit<MessageItem, 'id' | 'time'>) {
  return http.post<MessageItem>('/messages', {
    ...data,
    time: new Date().toLocaleString('zh-CN'),
  })
}

export function markMessageRead(id: number) {
  return http.patch<MessageItem>(`/messages/${id}`, { unread: false })
}
