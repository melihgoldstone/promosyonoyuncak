"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, MapPin, CreditCard, ArrowLeft, Home } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { orderApi } from "@/lib/api/orders";

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await orderApi.getOrderById(orderId);
        setOrder(orderData);
      } catch (err: any) {
        setError(err.response?.data?.error || "Sipariş bilgileri alınamadı");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-red-900 mb-2">Sipariş Bulunamadı</h1>
            <p className="text-red-700 mb-6">{error || "Bu siparişe erişim yetkiniz yok."}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              <Home className="w-5 h-5" />
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusInfo = (status: string) => {
    const statuses: any = {
      PENDING: { label: "Beklemede", color: "bg-yellow-100 text-yellow-800" },
      CONFIRMED: { label: "Onaylandı", color: "bg-blue-100 text-blue-800" },
      SHIPPED: { label: "Kargoda", color: "bg-purple-100 text-purple-800" },
      DELIVERED: { label: "Teslim Edildi", color: "bg-green-100 text-green-800" },
      CANCELLED: { label: "İptal Edildi", color: "bg-red-100 text-red-800" },
    };
    return statuses[status] || statuses.PENDING;
  };

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Promosyon Oyuncak
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-6 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Siparişiniz Alındı!
            </h1>
            <p className="text-gray-600 mb-4">
              Sipariş numaranız: <span className="font-semibold text-primary-600">#{order.id}</span>
            </p>
            <p className="text-gray-600">
              Siparişiniz başarıyla oluşturuldu. En kısa sürede işleme alınacaktır.
            </p>

            <div className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-medium ${statusInfo.color}`}>
              {statusInfo.label}
            </div>
          </div>

          {/* Order Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-bold">Teslimat Adresi</h2>
              </div>
              <div className="text-gray-700 space-y-1">
                <p className="font-medium">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.phone}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.district}, {order.shippingAddress.city}
                </p>
                <p>{order.shippingAddress.zipCode}</p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-bold">Ödeme Bilgileri</h2>
              </div>
              <div className="text-gray-700 space-y-2">
                <div className="flex justify-between">
                  <span>Ödeme Yöntemi:</span>
                  <span className="font-medium">
                    {order.paymentMethod === "CREDIT_CARD" ? "Kredi Kartı" : "Havale/EFT"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Toplam Tutar:</span>
                  <span className="font-bold text-primary-600 text-lg">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
                <div className="text-sm text-gray-500 pt-2 border-t">
                  Sipariş Tarihi: {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-bold">Sipariş Detayları</h2>
            </div>
            <div className="space-y-4">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-4 py-3 border-b last:border-b-0">
                  <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">Görsel</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.productId}</h3>
                    <p className="text-sm text-gray-600">Adet: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatPrice(item.price)} / adet
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 border-t-2">
                <span className="text-lg font-bold">Genel Toplam</span>
                <span className="text-2xl font-bold text-primary-600">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              <Home className="w-5 h-5" />
              Ana Sayfaya Dön
            </Link>
            <Link
              href="/urunler"
              className="flex items-center justify-center gap-2 border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition font-semibold"
            >
              <Package className="w-5 h-5" />
              Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}