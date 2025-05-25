// frontend/store/definitionsStore.js
import { create } from 'zustand'
import { getDefinitions } from '../modules/Definitions/services/definitionsService'

export const useDefinitionsStore = create((set) => ({
  definitions: [],
  loading: false,

  fetchDefinitions: async () => {
    set({ loading: true })
    try {
      const res = await getDefinitions()
      set({ definitions: res.data })
    } catch (err) {
      console.error('Tanımlar alınamadı:', err)
    } finally {
      set({ loading: false })
    }
  }
}))
