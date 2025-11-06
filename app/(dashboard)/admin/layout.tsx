"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Settings,
  LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    router.push("/giris");
    return null;
  }

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/urunler", label: "Ürünler", icon: Package },
    { href: "/admin/kategoriler", label: "Kategoriler", icon: FolderTree },
    { href: "/admin/siparisler", label: "Siparişler", icon: ShoppingCart },
    { href: "/admin/kullanicilar", label: "Kullanıcılar", icon: Users },
    { href: "/admin/ayarlar", label: "Ayarlar", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white">
        <div className="p-6">
          <Link href="/admin" className="text-2xl font-bold">
            🎮 Admin Panel
          </Link>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-6 py-3 hover:bg-gray-800 transition ${
                  isActive ? "bg-gray-800 border-l-4 border-primary-500" : ""
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          <div className="mb-4">
            <p className="text-sm text-gray-400">Hoşgeldiniz</p>
            <p className="font-semibold">{session?.user?.name}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center text-red-400 hover:text-red-300 transition"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
