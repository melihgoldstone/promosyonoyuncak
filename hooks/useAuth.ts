import { useState, useEffect } from 'react'
import { authApi, User, LoginRequest, RegisterRequest } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      const userData = await authApi.getCurrentUser()
      setUser(userData)
    } catch (err) {
      console.error('Auth check failed:', err)
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials: LoginRequest) => {
    try {
      setError(null)
      setLoading(true)
      const data = await authApi.login(credentials)
      setUser(data.user)
      router.push('/')
      return data
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Giriş yapılamadı'
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterRequest) => {
    try {
      setError(null)
      setLoading(true)
      const data = await authApi.register(userData)
      setUser(data.user)
      router.push('/')
      return data
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Kayıt olunamadı'
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    authApi.logout()
    setUser(null)
    router.push('/giris')
  }

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
  }
}
