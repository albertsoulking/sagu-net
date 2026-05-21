import { create } from 'zustand'
import { settingsService } from '@/services/settings.service'

interface SettingsState {
  settings: Record<string, string>
  isLoading: boolean
  fetch: () => Promise<void>
  update: (key: string, value: string) => Promise<void>
  bulkUpdate: (data: Record<string, string>) => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {},
  isLoading: false,

  fetch: async () => {
    set({ isLoading: true })
    try {
      const { data } = await settingsService.findAll()
      set({ settings: data, isLoading: false })
    } catch {
      set({ isLoading: false })
    }
  },

  update: async (key, value) => {
    await settingsService.update(key, value)
    set((state) => ({ settings: { ...state.settings, [key]: value } }))
  },

  bulkUpdate: async (data) => {
    const { data: updated } = await settingsService.bulkUpdate(data)
    set({ settings: updated })
  },
}))
