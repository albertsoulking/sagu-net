import { api } from './api'

export const uploadsService = {
  async upload(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const res = await api.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  },
}
