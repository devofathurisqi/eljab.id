# eljab.id

Storefront paket 150. Tanpa dashboard, database, akun pelanggan, atau payment gateway.

## Menjalankan

Node.js 22.18+ (teruji dengan 24.11.1).

```powershell
npm ci
npm run dev
```

Preview: http://127.0.0.1:4187. Validasi: `npm test`, `npm run typecheck`, `npm run build`. Build statis di `dist/`; `npm run preview` untuk memeriksanya.

## Data dan fitur

Katalog, seluruh 27 produk, harga, foto asli, 468 varian terverifikasi dan pilihan legacy disalin dari Sugarshawl lokal pada 3 November 2026, mengikuti permintaan pengguna. Sumber kebenaran: `src/data/products.json`, `prices.json`, `retail-prices.json`; audit warna di `catalog/color-coverage.json`. Audit kecocokan foto 7 November 2026 di `catalog/VARIANT-PHOTO-AUDIT.md`: foto varian hanya ditampilkan melalui daftar yang sudah diperiksa (`src/data/variant-photos.json`); foto gabungan, label bertentangan, dan kecocokan meragukan disembunyikan. Jumlah varian aktual dicatat dalam QA. Tidak ada produk tambahan. Enam entri dengan harga belum terkonfirmasi tetap “Tanya Harga”. Tiga entri tanpa foto tetap memakai alur tanya foto/warna; tidak diberi foto atau warna rekaan.

Pencarian, filter kategori/warna/harga, urutan, galeri/zoom, semua varian, favorit, keranjang, jumlah, penghapusan, subtotal, catatan/data pembeli opsional, persistensi browser, dan draft checkout WhatsApp tersedia. WhatsApp: **+62 822-4118-3864**. Tujuan dan penyimpanan terpisah di `src/config.ts`. Stok, ongkir, total akhir, dan pembayaran dikonfirmasi penjual. Tidak ada pesan WhatsApp yang dikirim otomatis.

## Brand dan produksi

Logo asli yang diberikan pengguna: `public/assets/brand/official-logo.jpeg`. Navbar mengikuti warna latar logo. Revisi 6 November 2026 menambahkan tiga ilustrasi botani SVG asli: rangkaian mawar, tangkai bunga, dan ornamen memanjang dalam nuansa dusty rose, ivory, dan sage. Arahan desain dan prompt kerja: `docs/DESIGN-BRIEF.md`. Catatan validasi: `qa/RESULTS.md`.

Repository: https://github.com/devofathurisqi/eljab.id.git — branch `prod`. Vercel: preset Vite, root repository, build `npm run build`, output `dist`. Set `SITE_URL` ke origin domain produksi yang benar untuk canonical dan sitemap; domain tidak ditebak. Halaman produk diprarender ke direktori statis, termasuk `404.html`.
