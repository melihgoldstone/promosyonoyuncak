"use client";

import { useEffect, useState } from "react";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Gerçek istatistikler için API çağrısı yapılabilir
      // Şimdilik örnek veriler gösteriyoruz
      setStats({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        revenue: 0,
      });
    } catch (error) {
      console.error("Stats error:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Toplam Ürün",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Toplam Sipariş",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      title: "Toplam Kullanıcı",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Toplam Gelir",
      value: `₺${stats.revenue.toLocaleString("tr-TR")}`,
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow-md p-6 flex items-center"
            >
              <div className={`${stat.color} p-4 rounded-lg mr-4`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/urunler/yeni"
            className="bg-primary-600 text-white px-6 py-4 rounded-lg hover:bg-primary-700 transition text-center font-semibold"
          >
            + Yeni Ürün Ekle
          </a>
          <a
            href="/admin/kategoriler/yeni"
            className="bg-secondary-600 text-white px-6 py-4 rounded-lg hover:bg-secondary-700 transition text-center font-semibold"
          >
            + Yeni Kategori Ekle
          </a>
          <a
            href="/admin/siparisler"
            className="bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition text-center font-semibold"
          >
            📦 Siparişleri Görüntüle
          </a>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-2">
          Promosyon Oyuncak Admin Paneline Hoşgeldiniz! 🎮
        </h2>
        <p className="text-white/90">
          Buradan tüm e-ticaret işlemlerinizi yönetebilirsiniz. Ürünler,
          kategoriler, siparişler ve kullanıcıları kolayca yönetin.
        </p>
      </div>
    </div>
  );
}
