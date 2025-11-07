import apiClient from './client'

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const categoryApi = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get('/categories')
    return data
  },

  // Get single category by slug
  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const { data } = await apiClient.get(`/categories/slug/${slug}`)
    return data
  },

  // Get category by ID
  getCategoryById: async (id: string): Promise<Category> => {
    const { data } = await apiClient.get(`/categories/${id}`)
    return data
  },
}

export default categoryApi
