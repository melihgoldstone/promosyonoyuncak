import apiClient from './client'

export interface OrderItem {
  productId: string
  quantity: number
  price: number
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
  district: string
  zipCode: string
}

export interface CreateOrderRequest {
  items: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: 'CREDIT_CARD' | 'BANK_TRANSFER'
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  shippingAddress: ShippingAddress
  createdAt: string
  updatedAt: string
}

export const orderApi = {
  // Create new order
  createOrder: async (orderData: CreateOrderRequest): Promise<Order> => {
    const { data } = await apiClient.post('/orders', orderData)
    return data
  },

  // Get user orders
  getMyOrders: async (): Promise<Order[]> => {
    const { data } = await apiClient.get('/orders/my')
    return data
  },

  // Get order by ID
  getOrderById: async (id: string): Promise<Order> => {
    const { data } = await apiClient.get(`/orders/${id}`)
    return data
  },
}

export default orderApi
