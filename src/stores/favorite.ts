import { defineStore } from 'pinia'

export interface FavoriteItem {
  id: number | string
  type: 'trade' | 'lostFound' | 'groupBuy' | 'errand'
  title: string
  description: string
  location?: string
  apiRecordId?: string | null
}

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: [] as FavoriteItem[],
  }),

  getters: {
    favoriteCount: (state) => state.favorites.length,
  },

  actions: {
    isFavorite(type: FavoriteItem['type'], id: number | string) {
      return this.favorites.some((item) => item.type === type && String(item.id) === String(id))
    },

    addFavorite(item: FavoriteItem) {
      const exists = this.isFavorite(item.type, item.id)

      if (!exists) {
        this.favorites.push(item)
      }
    },

    removeFavorite(type: FavoriteItem['type'], id: number | string) {
      this.favorites = this.favorites.filter((item) => {
        return !(item.type === type && String(item.id) === String(id))
      })
    },

    toggleFavorite(item: FavoriteItem) {
      if (this.isFavorite(item.type, item.id)) {
        this.removeFavorite(item.type, item.id)
      } else {
        this.addFavorite(item)
      }
    },

    setApiRecordId(type: FavoriteItem['type'], id: number | string, recordId: string) {
      const item = this.favorites.find(
        (f) => f.type === type && String(f.id) === String(id),
      )
      if (item) {
        item.apiRecordId = recordId
      }
    },

    getApiRecordId(type: FavoriteItem['type'], id: number | string): string | null | undefined {
      const item = this.favorites.find(
        (f) => f.type === type && String(f.id) === String(id),
      )
      return item?.apiRecordId
    },
  },
})
