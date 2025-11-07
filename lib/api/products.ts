import apiClient from './client'

export interface Product {
  id: string
  name: string
  description: string
  sku: string
  price: number
  compareAtPrice?: number
  stock: number
  images: string[]
  categoryId: string
  category?: {
    id: string
    name: string
    slug: string
  }
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ProductFilters {
  page?: number
  limit?: number
  categoryId?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  isActive?: boolean
  isFeatured?: boolean
  sortBy?: 'createdAt' | 'price' | 'name'
  sortOrder?: 'asc' | 'desc'
}

export const productApi = {
  // Get all products with filters
  getProducts: async (filters?: ProductFilters): Promise<ProductListResponse> => {
    const params = new URLSearchParams()

    if (filters?.page) params.append('page', filters.page.toString())
    if (filters?.limit) params.append('limit', filters.limit.toString())
    if (filters?.categoryId) params.append('categoryId', filters.categoryId)
    if (filters?.search) params.append('search', filters.search)
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString())
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
    if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString())
    if (filters?.isFeatured !== undefined) params.append('isFeatured', filters.isFeatured.toString())
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)

    const { data } = await apiClient.get(`/products?${params.toString()}`)
    return data
  },

  // Get single product by ID
  getProductById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get(`/products/${id}`)
    return data
  },

  // Get featured products
  getFeaturedProducts: async (limit = 15): Promise<Product[]> => {
    const { data } = await apiClient.get(`/products?isFeatured=true&limit=${limit}`)
    return data.products
  },

  // Get best sellers (mock for now - can be replaced with real endpoint)
  getBestSellers: async (limit = 15): Promise<Product[]> => {
    const { data } = await apiClient.get(`/products?sortBy=createdAt&sortOrder=desc&limit=${limit}`)
    return data.products
  },

  // Get discounted products
  getDiscountedProducts: async (limit = 15): Promise<Product[]> => {
    const { data } = await apiClient.get(`/products?limit=${limit}`)
    // Filter products that have compareAtPrice (discounted)
    return data.products.filter((p: Product) => p.compareAtPrice && p.compareAtPrice > p.price)
  },
}

export default productApi
