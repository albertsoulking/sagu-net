import { create } from 'zustand'
import type { AppSettings } from '@/types'
import { mockApi } from '@/services/mock/api'
import { defaultSettings } from '@/services/mock/data'

interface SettingsState extends AppSettings {
  isLoading: boolean
  fetch: () => Promise<void>
  update: (partial: Partial<AppSettings>) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  ...defaultSettings,
  isLoading: false,

  fetch: async () => {
    set({ isLoading: true })
    const settings = await mockApi.getSettings()
    set({ ...settings, isLoading: false })
  },

  update: (partial) => set((s) => ({ ...s, ...partial })),
}))
