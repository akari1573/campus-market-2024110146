import http from './http'

export interface ErrandItem {
  id: number | string
  title: string
  taskType: string
  reward: number
  from: string
  to: string
  deadline: string
  publisher: string
  status: string
  description: string
}

export function getErrands(params?: Record<string, string | number>) {
  return http.get<ErrandItem[]>('/errands', { params })
}

export function getErrandById(id: number | string) {
  return http.get<ErrandItem>(`/errands/${id}`)
}

export function createErrand(data: Omit<ErrandItem, 'id'>) {
  return http.post<ErrandItem>('/errands', data)
}

export function updateErrand(id: number | string, data: Partial<ErrandItem>) {
  return http.patch<ErrandItem>(`/errands/${id}`, data)
}

export function deleteErrand(id: number | string) {
  return http.delete(`/errands/${id}`)
}
