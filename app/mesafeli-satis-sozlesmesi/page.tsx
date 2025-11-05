import Link from "next/link";

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            🎮 Promosyon Oyuncak
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Mesafeli Satış Sözleşmesi</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. TARAFLAR</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">SATICI BİLGİLERİ:</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                  <p><strong>Ünvan:</strong> Promosyon Oyuncak</p>
                  <p><strong>Adres:</strong> [Şirket Adresi]</p>
                  <p><strong>Telefon:</strong> +90 (XXX) XXX XX XX</p>
                  <p><strong>E-posta:</strong> info@promosyonoyuncak.com</p>
                  <p><strong>Mersis No:</strong> [Mersis Numarası]</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">ALICI BİLGİLERİ:</h3>
                <p className="text-gray-700">
                  Sipariş sırasında kayıt yaptırmış olan müşteri (Bundan sonra "ALICI" olarak anılacaktır.)
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. KONU</h2>
            <p className="text-gray-700 leading-relaxed">
              İşbu Sözleşme, ALICI'nın SATICI'ya ait promosyonoyuncak.com internet sitesinden
              elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen
              ürün/ürünlerin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicilerin Korunması
              Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak
              ve yükümlülüklerini düzenler.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. SÖZLEŞME KONUSU ÜRÜN/ÜRÜNLER</h2>
            <p className="text-gray-700 mb-3">
              Ürün/hizmetin temel özellikleri, türü, miktarı, marka/modeli, rengi, adedi, satış
              bedeli, ödeme şekli gibi ön bilgiler sipariş sırasında ALICI'ya gösterilmekte ve
              ALICI tarafından onaylanmaktadır.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-gray-700">
                <strong>Not:</strong> Listelenen fiyatlar satış fiyatıdır. İlan edilen fiyatlar ve
                vaatler güncelleme yapılana ve değiştirilene kadar geçerlidir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. GENEL HÜKÜMLER</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>
                ALICI, promosyonoyuncak.com internet sitesinde sözleşme konusu ürünün temel nitelikleri,
                satış fiyatı ve ödeme şekli ile teslimatına ilişkin ön bilgileri okuyup bilgi sahibi
                olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder.
              </li>
              <li>
                Sözleşme konusu ürün, yasal 30 günlük süreyi aşmamak koşulu ile ALICI'nın yerleşim
                yerinin uzaklığına bağlı olarak internet sitesinde ön bilgiler içinde açıklanan süre
                içinde ALICI veya gösterdiği adresteki kişi/kuruluşa teslim edilir.
              </li>
              <li>
                Sözleşme konusu ürün, ALICI'dan başka bir kişi/kuruluşa teslim edilecek ise, teslim
                edilecek kişi/kuruluşun teslimatı kabul etmemesinden SATICI sorumlu tutulamaz.
              </li>
              <li>
                SATICI, sözleşme konusu ürünün sağlam, eksiksiz, siparişte belirtilen niteliklere uygun
                ve varsa garanti belgeleri ve kullanım kılavuzları ile teslim edilmesinden sorumludur.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. CAYMA HAKKI</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                ALICI, sözleşme konusu ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa
                tesliminden itibaren <strong className="text-primary-600">14 (ondört) gün</strong> içinde,
                SATICI'ya bildirmek şartıyla hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir
                gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkını kullanabilir.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h3 className="font-semibold mb-2">Cayma Hakkının Kullanılamayacağı Haller:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>ALICI'nın isteği veya açıkça kişisel ihtiyaçları doğrultusunda hazırlanan mallar</li>
                  <li>Çabuk bozulabilen veya son kullanma tarihi geçebilecek mallar</li>
                  <li>Tesliminden sonra ambalaj, bant, mühür gibi koruyucu unsurları açılmış olan mallar</li>
                  <li>Hijyen ve sağlık açısından uygun olmayan, teslim sonrası iade edilemeyecek ürünler</li>
                  <li>Niteliği itibariyle diğer ürünlerle karışan ve ayrıştırılması mümkün olmayan mallar</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Cayma Hakkı Süreci:</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>ALICI, cayma hakkını kullanmak istediğini info@promosyonoyuncak.com adresine e-posta ile bildirir.</li>
                  <li>Ürün orijinal ambalajı ile birlikte eksiksiz ve hasarsız olarak iade edilmelidir.</li>
                  <li>İade kargo ücreti ALICI tarafından karşılanır.</li>
                  <li>İade onaylandıktan sonra ödeme 10 iş günü içerisinde ALICI'ya iade edilir.</li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. ÖDEME VE TESLİMAT</h2>
            <div className="space-y-3">
              <h3 className="font-semibold">Ödeme Yöntemleri:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Kredi Kartı (Tek çekim veya taksitli)</li>
                <li>Banka Kartı</li>
                <li>Havale/EFT</li>
              </ul>
              <h3 className="font-semibold mt-4">Teslimat:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Ürünler 1-3 iş günü içerisinde kargoya verilir.</li>
                <li>Kargo süresi 2-5 iş günüdür.</li>
                <li>Kargo ücreti sipariş tutarına göre değişkenlik gösterebilir.</li>
                <li>[X] TL üzeri alışverişlerde kargo ücretsizdir.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. TEMERRÜT VE HUKUKİ SONUÇLAR</h2>
            <p className="text-gray-700">
              ALICI, ödeme işlemlerini kredi kartı ile yaptığı durumda temerrüde düştüğü takdirde,
              kart sahibi banka ile arasındaki kredi kartı sözleşmesi çerçevesinde faiz ödeyeceğini
              ve bankaya karşı sorumlu olacağını kabul, beyan ve taahhüt eder.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. YETKİLİ MAHKEME</h2>
            <p className="text-gray-700">
              İşbu sözleşmeden doğan uyuşmazlıklarda; Sanayi ve Ticaret Bakanlığınca her yıl Aralık
              ayında belirlenen değere kadar ALICI'nın yerleşim yerindeki İl/İlçe Tüketici Hakem
              Heyetleri, söz konusu değerin üzerindeki uyuşmazlıklarda ise ALICI'nın yerleşim yerindeki
              Tüketici Mahkemeleri yetkilidir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. YÜRÜRLÜK</h2>
            <p className="text-gray-700">
              ALICI, Site üzerinden verdiği siparişe ait ödemeyi gerçekleştirdiğinde işbu sözleşmenin
              tüm şartlarını kabul etmiş sayılır. SATICI, siparişin gerçekleşmesi öncesinde işbu
              sözleşmenin sitede ALICI tarafından okunup kabul edildiğine dair onay alacak şekilde
              gerekli yazılımsal düzenlemeleri yapmakla yükümlüdür.
            </p>
          </section>

          <div className="pt-6 border-t">
            <p className="text-gray-600 mb-4">
              <strong>Sipariş Tarihi:</strong> [Otomatik olarak sipariş sırasında doldurulur]<br />
              <strong>ALICI:</strong> [Müşteri adı ve onay]<br />
              <strong>SATICI:</strong> Promosyon Oyuncak
            </p>
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
