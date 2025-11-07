import apiClient from './client'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: 'USER' | 'ADMIN'
  createdAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export interface AuthResponse {
  user: User
  token: string
}

export const authApi = {
  // Login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/login', credentials)

    // Save token to localStorage
    if (data.token) {
      localStorage.setItem('token', data.token)
    }

    return data
  },

  // Register
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/register', userData)

    // Save token to localStorage
    if (data.token) {
      localStorage.setItem('token', data.token)
    }

    return data
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token')
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const { data } = await apiClient.get('/auth/me')
    return data
  },
}

export default authApi
