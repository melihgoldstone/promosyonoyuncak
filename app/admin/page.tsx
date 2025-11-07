"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  DollarSign,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
  recentOrders: any[];
  topProducts: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data - replace with actual API call
    setTimeout(() => {
      setStats({
        totalOrders: 156,
        totalRevenue: 45680,
        totalProducts: 234,
        totalUsers: 89,
        recentOrders: [],
        topProducts: [],
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Toplam Sipariş",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: "bg-blue-500",
      change: "+12%",
      isPositive: true,
    },
    {
      title: "Toplam Gelir",
      value: formatPrice(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: "bg-green-500",
      change: "+8%",
      isPositive: true,
    },
    {
      title: "Toplam Ürün",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "bg-purple-500",
      change: "+5%",
      isPositive: true,
    },
    {
      title: "Toplam Kullanıcı",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-orange-500",
      change: "+15%",
      isPositive: true,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Hoş geldiniz! İşte genel bakış.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.isPositive ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              {stat.title}
            </h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Son Siparişler</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium">Sipariş #{1000 + item}</p>
                  <p className="text-sm text-gray-600">Müşteri {item}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary-600">
                    {formatPrice(Math.random() * 5000 + 1000)}
                  </p>
                  <p className="text-xs text-gray-500">2 saat önce</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">En Çok Satan Ürünler</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <p className="font-medium">Ürün {item}</p>
                    <p className="text-sm text-gray-600">{item * 45} satış</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary-600">
                    {formatPrice(Math.random() * 500 + 100)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition font-semibold">
            Yeni Ürün Ekle
          </button>
          <button className="p-4 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition font-semibold">
            Siparişleri Görüntüle
          </button>
          <button className="p-4 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition font-semibold">
            Raporları İncele
          </button>
        </div>
      </div>
    </div>
  );
}