import { useState, useEffect } from 'react'
import { productApi, Product, ProductFilters } from '@/lib/api/products'

export function useProducts(filters?: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productApi.getProducts(filters)
        setProducts(data.products)
        setTotal(data.total)
        setTotalPages(data.totalPages)
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch products')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [JSON.stringify(filters)])

  return { products, loading, error, total, totalPages }
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productApi.getProductById(id)
        setProduct(data)
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch product')
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product, loading, error }
}

export function useFeaturedProducts(limit = 15) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productApi.getFeaturedProducts(limit)
        setProducts(data)
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch featured products')
        console.error('Error fetching featured products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limit])

  return { products, loading, error }
}

export function useBestSellers(limit = 15) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productApi.getBestSellers(limit)
        setProducts(data)
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch best sellers')
        console.error('Error fetching best sellers:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limit])

  return { products, loading, error }
}

export function useDiscountedProducts(limit = 15) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productApi.getDiscountedProducts(limit)
        setProducts(data)
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch discounted products')
        console.error('Error fetching discounted products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limit])

  return { products, loading, error }
}
