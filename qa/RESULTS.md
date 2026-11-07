# Verifikasi eljab.id

## Tindak lanjut warna tombol — 7 November 2026

- Laporan screenshot customer: Paris Legend / Beet Red menampilkan tombol abu-abu krem (`#bbb19e`), sementara kain pada foto merah tua. Foto dan nama pilihan sudah sesuai, tetapi audit sebelumnya belum memvalidasi warna tombol dari foto yang dipertahankan.
- Akar masalah: `Variant.hex` lama memakai kotak sampel yang sama pada komposisi foto berbeda, sehingga pada sebagian varian mengenai latar; pilihan lain memakai warna perkiraan. UI sekarang tidak memakai fallback ke nilai hex tersebut.
- **268 area kain** pada foto varian diperiksa melalui lembar kontak dengan kotak sampel dan perbandingan warna. Sampel yang mengenai latar, wajah model, tulisan atau bayangan lipatan terlalu gelap dipindahkan sebelum disetujui. **200 pilihan aktif** dan **21 pilihan lama** tanpa sampel warna tunggal yang sesuai memakai pola netral. Foto yang terverifikasi tetap tersedia meskipun motif/gradasinya tidak diberi satu warna perkiraan.
- Beet Red memakai sampel kain **`#771830`**. Contoh lain yang dikoreksi: Soft Pink, Abalone, Gana Biscuit dan Gana Baby Pink. Kartu katalog dan detail memakai komponen `VariantSwatch` yang sama; hero memakai helper `variantSwatch()` yang sama. Nama, foto dan harga produk tetap utuh.
- **27/27 tes otomatis lulus**: termasuk regresi Beet Red, warna kuat lain, 489 keputusan swatch aktif/legacy, hash sumber dan pencegahan pemakaian hex lama atau warna perkiraan untuk motif/gradasi.
- `scripts/verify-swatches.py` lulus: **268 sampel** dihitung ulang dari piksel foto asli, dimensi, koordinat dan SHA-256. Tidak ada perubahan warna pada aset foto.
- Browser pada build lokal: **468 pilihan dropdown**, **48 klik swatch**, **21 tautan lama**, **489 baris tas**, **19 kartu hasil filter/pencarian**, serta **30 pemeriksaan layout** pada 360, 390, 768, 1366 dan 1920 px lulus. Nilai warna tombol aktual dicek untuk setiap pilihan; pola netral dicek saat sampel tidak tersedia.
- Browser mendekode foto sumber lewat canvas dan membandingkan **268 median piksel kain** dengan warna tombol: seluruhnya sesuai, perbedaan kanal maksimum **1/255**. Ini menambah pemeriksaan independen dari nilai JSON atau label nama saja.
- **8 interaksi mobile lulus**, termasuk warna indikator hero, pilihan ke detail, foto/tautan tas, jumlah pada draft WhatsApp, dan varian tanpa foto. Tidak ada pesan dikirim dan tidak ada error runtime.
- Build final lulus: TypeScript, Vite, prarender **33 halaman**, dan verifikasi **201 aset/tautan lokal**. Screenshot mobile tombol terpilih Beet Red beserta fotonya ditinjau. Laporan rinci: `catalog/SWATCH-AUDIT.md` dan `swatch-audit.json`.
- Semua pemeriksaan dilakukan secara lokal sebelum push; sesuai instruksi pengguna, tidak dilakukan verifikasi deploy.

## Perbaikan kecocokan warna — 7 November 2026

- Audit visual seluruh 468 varian dari 27 produk: **359 foto tunggal sesuai**, **109 foto disembunyikan** (106 poster gabungan dan 3 kasus meragukan/bertentangan). Foto pada **21 pilihan lama** juga disembunyikan. Temuan khusus: Paris Legend White tampak ungu; Paris Japan Granola bertuliskan Charcoal; Zoya Black bertuliskan Smoke.
- Satu daftar foto terverifikasi dipakai oleh hero yang memilih warna, kartu dengan pilihan/filter warna, detail, zoom dan tas. Tidak ada penggantian ke foto model umum, poster atau warna pertama ketika foto pilihan tidak tersedia. Gambar yang gagal dimuat menampilkan keterangan foto belum tersedia.
- Swatch tanpa foto terverifikasi memakai pola netral; swatch White yang sebelumnya ungu tidak lagi menyesatkan. Pilihan tetap bisa dipilih melalui nama pada selector, serta disimpan dan dipesan dengan nama yang sama.
- Detail produk menginisialisasi pilihan secara langsung dari tautan; pergantian produk/tautan tidak mempertahankan foto pilihan sebelumnya. ID varian yang tidak dikenal menampilkan pilihan kosong sampai customer memilih warna. Tautan tas membawa ID varian yang sama kembali ke detail.
- Filter warna dan pencarian harus cocok pada varian yang sama; hasil yang bertentangan tidak memakai foto dari salah satu filter saja.
- **23/23 tes otomatis lulus**: seluruh keputusan foto aktif/legacy, SHA-256 sumber, keberadaan turunan responsif, penolakan pemetaan baru/berubah, konflik filter, harga dan pesanan. Snapshot katalog/harga asli tetap identik.
- **1.077 perbandingan gambar responsif lulus** terhadap 359 foto utama. Selisih rata-rata kanal maksimum 0,791/255; tidak ditemukan turunan yang tertukar.
- Browser lokal pada build produksi: **468 pilihan dropdown**, **48 klik swatch**, **21 tautan legacy**, **489 baris tas dalam batch maksimal 100**, **19 kartu hasil filter/pencarian**, serta **25 pemeriksaan layout** pada 360, 390, 768, 1366 dan 1920 px. Tidak ada error runtime atau overflow horizontal. Semua foto aktif yang dipertahankan berhasil didekode.
- Pengujian tambahan: zoom Red sesuai pilihan; berpindah ke White menghapus foto/zoom; ID varian tidak dikenal tidak memakai warna pertama; permintaan gambar yang sengaja digagalkan menampilkan keterangan lalu pulih saat warna diganti; klik swatch kartu membawa varian yang sama ke detail.
- **8 pemeriksaan interaksi mobile lulus** pada build final: hero Baby Pink ke detail, foto pilihan di tas, tautan kembali ke varian, jumlah pesanan pada draft WhatsApp, foto White disembunyikan di tas/detail, swatch netral untuk pilihan tanpa foto, dan swatch warna untuk foto terverifikasi. Tidak ada pesan WhatsApp dikirim.
- TypeScript dan build produksi final lulus: **33 halaman** diprarender dan **201 aset/tautan lokal** diverifikasi. Screenshot lokal untuk foto sesuai, foto tidak tersedia, poster yang disembunyikan, katalog, serta swatch netral ditinjau.
- Rincian keputusan: `catalog/VARIANT-PHOTO-AUDIT.md` dan `catalog/variant-photo-audit.json`. Hasil browser lokal: `qa/color-ui/results.json` dan `interactions.json` (diabaikan Git). Sesuai instruksi pengguna, seluruh verifikasi dilakukan sebelum push; tidak ada verifikasi deploy.

## Revisi klien — 6 November 2026

- Tiga ilustrasi botani SVG asli (10.647 byte total): rangkaian mawar, tangkai bunga kecil, dan ornamen memanjang. Nuansa dusty rose, ivory, dan sage mengikuti palet krem/emas dan bentuk bunga pada logo. Diterapkan pada hero, bingkai identitas melengkung, katalog/tersimpan, kontak, dan footer.
- Seluruh tujuan WhatsApp dan nomor yang ditampilkan diperbarui menjadi **6282241183864 / +62 822-4118-3864**, termasuk kontak, order langsung produk, dan checkout tas.
- `npm test`: **21/21 lulus**. Assertion tujuan WhatsApp memakai nomor literal terbaru; snapshot 27 produk dan 468 varian tetap sesuai.
- `npm run build`: TypeScript, Vite, prarender **33 halaman**, serta pemeriksaan **182 aset/tautan lokal** lulus.
- Browser lokal: **35 kombinasi halaman/viewport** pada 360, 390, 768, 1366, dan 1920 px. Halaman beranda, katalog, cerita, detail Gana Instan, panduan, tersimpan, dan tas tidak mengalami overflow horizontal atau gambar rusak. Semua tautan WhatsApp menuju nomor baru. Ilustrasi dekoratif memiliki alt kosong, aria-hidden, dan pointer-events none.
- Enam pemeriksaan interaksi lulus: pilihan Baby Pink di hero, menu mobile, pencarian katalog, tautan order langsung, penambahan ke tas, serta nomor tujuan dan varian Baby Pink pada draft checkout WhatsApp. Tidak ada error console/runtime atau pesan yang dikirim.
- Tampilan desktop dan ponsel ditinjau melalui screenshot lokal, termasuk detail hero, bingkai identitas, kontak, dan footer. Seluruh validasi dilakukan sebelum push. Sesuai instruksi pengguna, pekerjaan berhenti setelah push berhasil tanpa pemeriksaan deploy.

## Riwayat verifikasi awal

3 November 2026, Asia/Jakarta.

## Hasil

- 21/21 tes unit lulus. Meliputi 468 varian, seluruh aset foto/responsive derivative, harga brand/retail/konfirmasi, sanitasi keranjang, alias produk, legacy varian, penggabungan warna sama, pemisahan warna berbeda, batas jumlah, subtotal, pesan WhatsApp, dan kecocokan snapshot katalog. Nomor tujuan dan namespace penyimpanan diuji terhadap nilai literal yang diberikan pengguna.
- TypeScript dan build produksi lulus; 33 halaman diprarender. Verifier memeriksa aset lokal, route, schema Product, brand, tujuan WhatsApp, 404, serta tidak adanya dokumen atau field harga internal.
- Pengujian browser melalui in-app browser: home, katalog dan detail Gana pada 360, 390, 768, 1366, 1920 px. 15 kombinasi per toko, 45 total; tidak ada overflow horizontal atau gambar rusak yang terdeteksi.
- Interaksi mobile 390 px: pencarian Zea menghasilkan satu koleksi; kategori Hijab Instan lima koleksi; filter Pink / maksimum Rp75.000 dan urutan harga terendah; pencarian navbar Paris Japan; menu mobile menuju cerita brand.
- Galeri: memilih Black, membuka contoh pemakaian, memastikan warna pesanan tetap Black, membuka/menutup zoom. Inner Tali mempertahankan alur konfirmasi foto tanpa varian rekaan.
- Keranjang browser: Baby Pink 2 pcs = Rp112.000; naik ke 3 pcs = Rp168.000; tambah Black 1 pcs = dua baris varian / 4 pcs / Rp224.000. Pilihan tetap setelah reload. Draft WhatsApp berisi varian, jumlah, subtotal, catatan dengan karakter & yang ter-encode, dan tujuan **6281336697504**. Tidak ada pesan dikirim. Item pengujian dihapus melalui UI setelah tes.
- Favorit Gana disimpan dan muncul di halaman tersimpan.

## Desain dan performa

Logo asli digunakan. Navbar #e0dcd1; ARMIÉ mempertahankan É. eljab.id memakai penyaringan alpha SVG atas gambar asli untuk menghilangkan latar bertekstur pada logo kecil tanpa menggambar ulang bentuknya. Komposisi halaman utama setiap brand berbeda. Perbaikan hasil QA mencakup judul ARMIÉ mobile dan batas selector foto/caption.

Font Cormorant Garamond dan DM Sans lokal dalam WOFF2: unduhan awal sekitar 75 KB, turun dari sekitar 339 KB TTF. Gambar WebP responsif, lazy loading di bawah fold, dan thumbnail kecil dipakai pada galeri/tas. Entry JS sekitar 113 KB gzip, CSS sekitar 8–9 KB gzip. Angka ini ukuran build, bukan skor Lighthouse atau pengukuran jaringan produksi.

## Batas data dan hosting

27 produk dan semua harga persis mengikuti snapshot Sugarshawl lokal. Enam produk tetap memerlukan konfirmasi harga; tiga memerlukan foto/warna. Stok, ongkir, total akhir dan pembayaran dikonfirmasi penjual. Paket 150 tidak memiliki dashboard.

Target GitHub: https://github.com/devofathurisqi/eljab.id/tree/prod. Domain hosting belum ditentukan. Set SITE_URL di hosting yang benar untuk canonical/sitemap; tidak ada domain rekaan.
