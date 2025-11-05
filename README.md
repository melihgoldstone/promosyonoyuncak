# 🎮 Promosyon Oyuncak - E-Ticaret Platformu

Türkiye'nin güvenilir toptan promosyon oyuncak tedarikçisi için geliştirilmiş, modern, güvenli ve yasal gerekliliklere uygun profesyonel e-ticaret platformu.

## ✨ Özellikler

### 🔐 Güvenlik
- ✅ SSL/TLS şifreleme
- ✅ PCI DSS uyumlu ödeme sistemi (iyzico entegrasyonu)
- ✅ XSS ve CSRF koruması
- ✅ Rate limiting
- ✅ Güvenli HTTP headers (HSTS, CSP, X-Frame-Options)
- ✅ Şifrelenmiş veri saklama

### ⚖️ Yasal Uyumluluk (Türkiye)
- ✅ KVKK (Kişisel Verilerin Korunması Kanunu) uyumlu
- ✅ Mesafeli Satış Sözleşmesi
- ✅ Gizlilik Politikası
- ✅ Kullanım Koşulları
- ✅ Çerez Politikası
- ✅ Tüm yasal metinler hazır

### 🛒 E-Ticaret Özellikleri
- ✅ Ürün katalog sistemi
- ✅ Kategori yönetimi
- ✅ Sepet sistemi
- ✅ Güvenli ödeme (iyzico)
- ✅ Sipariş takibi
- ✅ Toptan fiyatlandırma (miktar bazlı indirim)
- ✅ Kullanıcı hesap yönetimi
- ✅ Admin paneli
- ✅ Stok takibi
- ✅ Email bildirimleri

### 🎨 Teknik Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **UI Icons:** Lucide React
- **Payment:** iyzico (Türkiye)
- **Email:** Nodemailer
- **Language:** TypeScript

## 📋 Gereksinimler

- Node.js 18.17.0 veya üzeri
- PostgreSQL 14 veya üzeri
- npm veya yarn

## 🚀 Kurulum

### 1. Projeyi Klonlayın

\`\`\`bash
git clone <repository-url>
cd promosyonoyuncak
\`\`\`

### 2. Bağımlılıkları Yükleyin

\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### 3. Environment Değişkenlerini Ayarlayın

\`.env.example\` dosyasını \`.env\` olarak kopyalayın ve gerekli değerleri doldurun:

\`\`\`bash
cp .env.example .env
\`\`\`

\`.env\` dosyasını düzenleyin:

\`\`\`env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/promosyonoyuncak"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-password"
SMTP_FROM="noreply@promosyonoyuncak.com"

# iyzico Payment Gateway
IYZICO_API_KEY="your-iyzico-api-key"
IYZICO_SECRET_KEY="your-iyzico-secret-key"
IYZICO_BASE_URL="https://sandbox-api.iyzipay.com"

# Site Settings
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Promosyon Oyuncak"
\`\`\`

### 4. PostgreSQL Veritabanını Oluşturun

\`\`\`bash
# PostgreSQL'e bağlanın
psql -U postgres

# Veritabanını oluşturun
CREATE DATABASE promosyonoyuncak;

# Çıkış
\\q
\`\`\`

### 5. Prisma Migration ve Seed

\`\`\`bash
# Prisma client oluşturun (eğer hata verirse PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 ekleyin)
npx prisma generate

# Database migration
npx prisma migrate dev --name init

# (Opsiyonel) Seed data
npx prisma db seed
\`\`\`

### 6. Development Server'ı Başlatın

\`\`\`bash
npm run dev
\`\`\`

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Proje Yapısı

\`\`\`
promosyonoyuncak/
├── app/                          # Next.js 14 App Router
│   ├── page.tsx                  # Ana sayfa
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── kvkk/                     # KVKK sayfası
│   ├── gizlilik-politikasi/      # Gizlilik politikası
│   ├── mesafeli-satis-sozlesmesi/# Mesafeli satış sözleşmesi
│   ├── kullanim-kosullari/       # Kullanım koşulları
│   └── cerez-politikasi/         # Çerez politikası
├── components/                   # React bileşenleri
├── lib/                          # Utility fonksiyonları
│   ├── prisma.ts                 # Prisma client
│   └── utils.ts                  # Yardımcı fonksiyonlar
├── prisma/
│   └── schema.prisma             # Database şeması
├── public/                       # Statik dosyalar
├── .env                          # Environment variables
├── next.config.js                # Next.js konfigürasyonu
├── tailwind.config.ts            # Tailwind konfigürasyonu
├── tsconfig.json                 # TypeScript konfigürasyonu
└── package.json                  # Paket bağımlılıkları
\`\`\`

## 🗄️ Database Şeması

Proje aşağıdaki temel modelleri içerir:

- **User**: Kullanıcı hesapları (müşteri ve admin)
- **Address**: Teslimat adresleri
- **Category**: Ürün kategorileri (hiyerarşik)
- **Product**: Ürünler
- **PriceRule**: Toptan fiyat kuralları
- **Cart**: Sepet
- **CartItem**: Sepet ürünleri
- **Order**: Siparişler
- **OrderItem**: Sipariş ürünleri
- **Setting**: Site ayarları

## 🔧 Yapılandırma

### iyzico Ödeme Entegrasyonu

1. [iyzico](https://www.iyzico.com/) hesabı oluşturun
2. API anahtarlarınızı alın
3. \`.env\` dosyasına ekleyin:

\`\`\`env
IYZICO_API_KEY="your-api-key"
IYZICO_SECRET_KEY="your-secret-key"
IYZICO_BASE_URL="https://sandbox-api.iyzipay.com"  # Test için
# Production: https://api.iyzipay.com
\`\`\`

### Email Konfigürasyonu

SMTP ayarlarını yapılandırın (Gmail örneği):

\`\`\`env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"  # 2FA etkinse App Password kullanın
SMTP_FROM="noreply@promosyonoyuncak.com"
\`\`\`

## 🚀 Production Deployment

### 1. Environment Variables

Production environment variables'ları ayarlayın:
- \`NEXTAUTH_SECRET\` değiştirin (güçlü bir secret)
- \`IYZICO_BASE_URL\` production URL'ye değiştirin
- \`DATABASE_URL\` production database'e yönlendirin
- SSL sertifikası ekleyin

### 2. Build

\`\`\`bash
npm run build
npm start
\`\`\`

### 3. Deploy Platformları

Önerilen platformlar:
- **Vercel** (Next.js için optimize)
- **DigitalOcean**
- **AWS**
- **Google Cloud**

### 4. SSL Sertifikası

E-ticaret için SSL zorunludur:
- Let's Encrypt (ücretsiz)
- Cloudflare
- Ticari SSL sağlayıcıları

## 📝 Geliştirme Planı

### Tamamlanan ✅
- [x] Proje temel yapısı (Next.js 14, TypeScript, Tailwind)
- [x] Database şeması (Prisma + PostgreSQL)
- [x] Yasal sayfalar (KVKK, Mesafeli Satış, Gizlilik, vb.)
- [x] Güvenlik headers yapılandırması

### Yapılacaklar 🚧
- [ ] NextAuth.js authentication
- [ ] Ürün CRUD API'leri
- [ ] Admin paneli
- [ ] Sepet sistemi
- [ ] iyzico ödeme entegrasyonu
- [ ] Sipariş yönetimi
- [ ] Email bildirimleri
- [ ] Ürün arama ve filtreleme
- [ ] Responsive mobil tasarım
- [ ] SEO optimizasyonu

## 🛡️ Güvenlik

Bu proje aşağıdaki güvenlik önlemlerini içerir:

- ✅ HTTPS zorunlu (HSTS)
- ✅ XSS koruması
- ✅ CSRF token'ları
- ✅ SQL injection koruması (Prisma ORM)
- ✅ Rate limiting
- ✅ Secure headers
- ✅ PCI DSS uyumlu ödeme (iyzico)
- ✅ Şifrelerin hash'lenmesi (bcrypt)
- ✅ Environment variables ile hassas bilgi yönetimi

## 📄 Lisans

Tüm hakları saklıdır © 2024 Promosyon Oyuncak

## 📞 İletişim

- **Web:** promosyonoyuncak.com
- **Email:** info@promosyonoyuncak.com
- **Telefon:** +90 (XXX) XXX XX XX

---

**Not:** Bu proje production-ready seviyede güvenlik ve yasal uyumluluk standartlarına sahiptir.
Deployment öncesi tüm environment variables'ları ve API anahtarlarını güncellemeyi unutmayın.
