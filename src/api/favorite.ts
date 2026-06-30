import http from './http'

export interface FavoriteItem {
  id?: string
  itemType: 'trade' | 'lostFound' | 'groupBuy' | 'errand'
  itemId: number | string
  userId: string
}

export function getFavorites(params?: Record<string, string | number>) {
  return http.get<FavoriteItem[]>('/favorites', { params })
}

export function createFavorite(data: Omit<FavoriteItem, 'id'>) {
  return http.post<FavoriteItem>('/favorites', data)
}

export function deleteFavorite(id: string) {
  return http.delete(`/favorites/${id}`)
}
