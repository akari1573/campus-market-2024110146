import http from './http'

export interface LostFoundItem {
  id: number
  title: string
  type: 'lost' | 'found'
  itemName: string
  location: string
  eventTime: string
  contact: string
  status: string
  description: string
}

export function getLostFounds(params?: Record<string, string | number>) {
  return http.get<LostFoundItem[]>('/lostFounds', { params })
}

export function getLostFoundById(id: number) {
  return http.get<LostFoundItem>(`/lostFounds/${id}`)
}

export function createLostFound(data: Omit<LostFoundItem, 'id'>) {
  return http.post<LostFoundItem>('/lostFounds', data)
}

export function updateLostFound(id: number, data: Partial<LostFoundItem>) {
  return http.patch<LostFoundItem>(`/lostFounds/${id}`, data)
}

export function deleteLostFound(id: number) {
  return http.delete(`/lostFounds/${id}`)
}
