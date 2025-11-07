"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import {
  Search,
  Filter,
  Eye,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  itemCount: number;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data - replace with actual API call
    setTimeout(() => {
      const mockOrders: Order[] = [
        {
          id: "1",
          orderNumber: "ORD-1001",
          customerName: "Ahmet Yılmaz",
          customerEmail: "ahmet@example.com",
          totalAmount: 1250,
          status: "PENDING",
          itemCount: 3,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          orderNumber: "ORD-1002",
          customerName: "Ayşe Demir",
          customerEmail: "ayse@example.com",
          totalAmount: 2450,
          status: "CONFIRMED",
          itemCount: 5,
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          orderNumber: "ORD-1003",
          customerName: "Mehmet Kaya",
          customerEmail: "mehmet@example.com",
          totalAmount: 890,
          status: "SHIPPED",
          itemCount: 2,
          createdAt: new Date().toISOString(),
        },
        {
          id: "4",
          orderNumber: "ORD-1004",
          customerName: "Fatma Çelik",
          customerEmail: "fatma@example.com",
          totalAmount: 3200,
          status: "DELIVERED",
          itemCount: 8,
          createdAt: new Date().toISOString(),
        },
        {
          id: "5",
          orderNumber: "ORD-1005",
          customerName: "Ali Özkan",
          customerEmail: "ali@example.com",
          totalAmount: 650,
          status: "CANCELLED",
          itemCount: 1,
          createdAt: new Date().toISOString(),
        },
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusConfig = (status: Order["status"]) => {
    const configs = {
      PENDING: {
        label: "Beklemede",
        icon: Clock,
        className: "bg-yellow-100 text-yellow-800",
      },
      CONFIRMED: {
        label: "Onaylandı",
        icon: CheckCircle,
        className: "bg-blue-100 text-blue-800",
      },
      SHIPPED: {
        label: "Kargoda",
        icon: Truck,
        className: "bg-purple-100 text-purple-800",
      },
      DELIVERED: {
        label: "Teslim Edildi",
        icon: Package,
        className: "bg-green-100 text-green-800",
      },
      CANCELLED: {
        label: "İptal",
        icon: XCircle,
        className: "bg-red-100 text-red-800",
      },
    };
    return configs[status];
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sipariş Yönetimi</h1>
        <p className="text-gray-600 mt-2">
          Toplam {filteredOrders.length} sipariş
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Sipariş numarası, müşteri adı veya e-posta ile ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          >
            <option value="ALL">Tüm Durumlar</option>
            <option value="PENDING">Beklemede</option>
            <option value="CONFIRMED">Onaylandı</option>
            <option value="SHIPPED">Kargoda</option>
            <option value="DELIVERED">Teslim Edildi</option>
            <option value="CANCELLED">İptal</option>
          </select>
        </div>
      </div>

      {/* Orders Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {orders.filter((o) => o.status === "PENDING").length}
          </p>
          <p className="text-sm text-gray-600">Beklemede</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {orders.filter((o) => o.status === "CONFIRMED").length}
          </p>
          <p className="text-sm text-gray-600">Onaylandı</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">
            {orders.filter((o) => o.status === "SHIPPED").length}
          </p>
          <p className="text-sm text-gray-600">Kargoda</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {orders.filter((o) => o.status === "DELIVERED").length}
          </p>
          <p className="text-sm text-gray-600">Teslim Edildi</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-red-600">
            {orders.filter((o) => o.status === "CANCELLED").length}
          </p>
          <p className="text-sm text-gray-600">İptal</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Sipariş No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Müşteri
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Ürün Sayısı
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Toplam
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Durum
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Tarih
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        {order.orderNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.customerName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.customerEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{order.itemCount} ürün</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.className}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <button
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded transition"
                          title="Görüntüle"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Sipariş bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}