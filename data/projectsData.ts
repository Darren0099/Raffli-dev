export interface ProjectService {
  pills?: string[];
  list?: string[];
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  client: string;
  category: string;
  image: string;
  link: string;
  repoUrl?: string;
  tools: string[];
  buildTime: string;
  isExternalLink?: boolean;
  
  services?: ProjectService;

  logo?: string;
  heroImage?: string;
  summaryQuote?: string;
  descriptionParagraphs?: string[];
  galleryImages?: string[];
  section1Title?: string;
  section1Text1?: string;
  section1Text2?: string;
  largeBannerImage?: string;
  section2Title?: string;
  section2Text1?: string;
  section2Text2?: string;
  gridThumbnails?: string[];
  bottomGalleryImages?: string[];
  outcomeTitle?: string;
  outcomeText?: string;
  outcomeStats?: { label: string; value: string }[];
  outcomeGallery?: string[];
}

export const projectsData: Project[] = [
  {
    "id": 5,
    "slug": "youth-visual-identity",
    "title": "Graphic Design — Creative Archive & Visual Campaigns",
    "client": "YRI · International Kingdom · Duta Potensi",
    "category": "Graphic Design",
    "image": "/graphic-design/cover.svg",
    "heroImage": "/graphic-design/cover.svg",
    "link": "/graphic-design",
    "tools": [
      "Canva",
      "Graphic Design",
      "Branding",
      "Social Media Design"
    ],
    "buildTime": "Visual identity, social media & event campaigns",
    "isExternalLink": false,
    "services": {
      "pills": [
        "Branding",
        "Social Media",
        "Design"
      ],
      "list": [
        "Template komunikasi visual",
        "Poster kegiatan dan pengumuman",
        "Konten feed media sosial",
        "Konsistensi identitas organisasi"
      ]
    },
    "summaryQuote": "Arsip desain YRI Sumsel, Summit of Stars I–II, YRI Fest x Expo, International Kingdom Indonesia, dan Youthopia Symposium.",
    "descriptionParagraphs": [
      "Organisasi yang menjalankan banyak program membutuhkan cara menyajikan informasi yang tetap konsisten meski tema kegiatan berbeda.",
      "Pekerjaan desain mencakup pengaturan warna, tipografi, hirarki informasi, dan format visual untuk poster serta materi media sosial YRI Sumsel.",
      "Canva digunakan dalam perancangan materi visual. Hasil desain dipublikasikan atau didokumentasikan melalui kanal organisasi; proyek ini bukan aplikasi yang dibangun dengan framework web."
    ],
    "galleryImages": [
      "/img/ca1.png",
      "/img/ca3.png"
    ],
    "section1Title": "Sistem visual yang mudah diterapkan ulang",
    "section1Text1": "Prinsip konsistensi diterapkan melalui pilihan warna, pasangan font, proporsi judul, dan ruang baca yang cukup agar pesan kegiatan cepat dipahami.",
    "section1Text2": "Struktur template membantu desainer atau pengelola kanal sosial menyusun konten serupa untuk kebutuhan publikasi berikutnya.",
    "largeBannerImage": "/img/ca1.png",
    "section2Title": "Dampak yang dapat ditunjukkan",
    "section2Text1": "Output utamanya adalah materi visual untuk komunikasi program organisasi: poster, feed, dan aset branding yang lebih seragam.",
    "section2Text2": "Jumlah impresi, pertumbuhan pengikut, atau total template tidak dicantumkan sebagai hasil kuantitatif karena tidak tersedia bukti analitik yang dapat diverifikasi.",
    "gridThumbnails": [
      "/img/ca1.png",
      "/img/ca3.png"
    ],
    "bottomGalleryImages": [
      "/img/ca1.png",
      "/img/ca3.png"
    ],
    "outcomeTitle": "Hasil yang Diperoleh",
    "outcomeText": "Rangkaian materi visual organisasi dengan pendekatan branding konsisten dan format yang bisa digunakan kembali untuk publikasi acara berikutnya.",
    "outcomeStats": [],
    "outcomeGallery": [
      "/img/ca1.png",
      "/img/ca3.png"
    ]
  },
  {
    "id": 9,
    "slug": "mobius",
    "title": "Mobius — Desktop Island Assistant & File Studio",
    "client": "Independent Project",
    "category": "Desktop Application",
    "image": "/img/mobius-portrait.svg",
    "logo": "/img/mobius-logo.svg",
    "heroImage": "/img/mobius-cover.svg",
    "link": "https://github.com/Darren0099/Mobius",
    "repoUrl": "https://github.com/Darren0099/Mobius",
    "tools": [
      "Python",
      "PySide6",
      "Qt Widgets",
      "PyMuPDF",
      "Pillow",
      "Windows API",
      "faster-whisper"
    ],
    "buildTime": "2026 • In development (source only)",
    "isExternalLink": true,
    "services": {
      "pills": ["Desktop App", "Productivity", "UI/UX"],
      "list": [
        "Dynamic island desktop dengan animasi mata robot dan indikator status",
        "File Studio radial dengan sembilan opsi konversi dokumen dan gambar",
        "Perintah suara lokal serta kontrol media Windows",
        "Pomodoro, lirik tersinkron, dan pengingat minum"
      ]
    },
    "summaryQuote": "Satu asisten kecil di tepi layar yang menyatukan utilitas harian, konversi file, dan kontrol desktop tanpa memenuhi ruang kerja.",
    "descriptionParagraphs": [
      "Mobius adalah proyek aplikasi produktivitas Windows berbasis Python dan PySide6. Konsep utamanya adalah dynamic island minimalis di bagian atas layar: ringkas saat tidak digunakan, responsif terhadap interaksi, dan tidak menghalangi aplikasi lain.",
      "Antarmuka utamanya menampilkan mata robot ekspresif, indikator waktu atau baterai, serta akses cepat ke musik, lirik, fokus, hidrasi, dan asisten suara. File Studio menggunakan menu radial terpisah yang dapat dipanggil melalui drag-and-drop untuk mengonversi gambar, PDF, dan dokumen Word.",
      "Pengembangan saat ini berfokus pada penyempurnaan animasi, stabilitas tampilan overlay, dan alur perintah suara di Windows. Repository berisi kode sumber dan pengujian, tetapi versi EXE final sengaja belum dirilis. Cover dan logo yang ditampilkan merupakan konsep identitas visual, bukan tangkapan layar aplikasi yang sudah selesai."
    ],
    "section1Title": "Dari dynamic island menjadi ruang kerja mini",
    "section1Text1": "Mobius ditempatkan di tepi atas layar. Ketika desktop aktif, island dapat menampilkan mata robot animatif; saat aplikasi lain aktif, tampilan menyusut menjadi indikator tipis. Pengguna dapat mengarahkan kursor ke tepi layar untuk memanggilnya kembali.",
    "section1Text2": "Panel utilitas menyediakan kontrol media yang terhubung ke sesi media Windows, lirik dari berkas LRC atau pencarian opsional, timer Pomodoro, pengingat hidrasi, serta perintah suara lokal. Dukungan fitur media bergantung pada sesi pemutar yang tersedia.",
    "largeBannerImage": "/img/mobius-portrait.svg",
    "section2Title": "File Studio radial dan pemrosesan lokal",
    "section2Text1": "File Studio mengumpulkan operasi Image to PDF, PDF to Image, Word to PDF, PDF to Word, Merge, Split, Compress dan Rotate PDF, serta konversi format gambar dalam sebuah menu radial. Opsi yang tidak kompatibel dengan file dinonaktifkan.",
    "section2Text2": "Konversi dokumen ditangani oleh pustaka lokal seperti PyMuPDF, Pillow, python-docx, dan ReportLab. Aplikasi ditujukan untuk penggunaan offline; fitur opsional seperti pencarian lirik online atau instalasi model suara tetap membutuhkan jaringan. Pengujian akhir pada perangkat Windows masih berjalan.",
    "bottomGalleryImages": [
      "/img/mobius-cover.svg",
      "/img/mobius-portrait.svg",
      "/img/mobius-logo.svg"
    ],
    "outcomeTitle": "Status dan Hasil Pengembangan",
    "outcomeText": "Kode sumber Mobius memuat prototipe dynamic island, mata robot, File Studio radial, kontrol media, utilitas fokus dan hidrasi, serta komponen suara. Aset visual portofolio merupakan rancangan branding; screenshot aplikasi, dokumentasi galeri, dan rilis EXE final akan dilengkapi setelah tahap validasi UI dan pengujian di perangkat Windows selesai.",
    "outcomeStats": [
      { "label": "Operasi File Studio", "value": "9" },
      { "label": "Platform", "value": "Windows" },
      { "label": "Framework antarmuka", "value": "PySide6" },
      { "label": "Tahap", "value": "Source / Prototype" }
    ],
    "outcomeGallery": [
      "/img/mobius-logo.svg"
    ]
  },

  {
    "id": 8,
    "slug": "kleindata",
    "title": "KleinData — Smart Insight Studio & Data Analytics Workspace",
    "client": "Independent Project",
    "category": "Web Development",
    "image": "/img/m (1).png",
    "heroImage": "/img/m (2).png",
    "link": "https://dataforge-analytics-neon.vercel.app/",
    "repoUrl": "https://github.com/Darren0099/DataForge",
    "tools": [
      "SvelteKit",
      "Svelte 5",
      "TypeScript",
      "DuckDB-Wasm",
      "Chart.js",
      "GSAP",
      "Hono",
      "Vercel"
    ],
    "buildTime": "2026 • Independent project",
    "isExternalLink": true,
    "services": {
      "pills": ["Web Development", "Data Analytics", "UI/UX"],
      "list": [
        "Dashboard analitik responsif untuk CSV, Excel, JSON, TSV, dan Parquet",
        "30 pilihan insight berbasis query SQL dan pemetaan kolom otomatis",
        "SQL Playground, data profiling, dan pembersihan data",
        "Visualisasi interaktif, ekspor CSV, grafik PNG, dan laporan Markdown"
      ]
    },
    "summaryQuote": "Bukan sekadar menampilkan angka: KleinData membantu menemukan pola, membandingkan performa, dan memahami data melalui 30 jenis analisis yang dapat diperiksa query-nya.",
    "descriptionParagraphs": [
      "Banyak dataset penjualan atau operasional masih berupa tabel mentah. Sebelum memberi rekomendasi, kita perlu mengetahui isi data, kolom yang relevan, nilai yang hilang, serta perubahan performa antarperiode.",
      "Saya membangun KleinData v2 menggunakan SvelteKit, Svelte 5, dan TypeScript. DuckDB-Wasm menjalankan query analitik di browser, sehingga file tidak perlu dikirim ke database server. Antarmuka dirancang minimalis dengan warna putih, hitam, oranye, dan aksen ungu.",
      "Insight Studio menyediakan 30 analisis deskriptif, mulai dari nilai terendah dan tertinggi, kategori yang paling berkontribusi, estimasi profit, perubahan penjualan bulanan, hingga pemeriksaan duplikat. Pilihan analisis mengikuti kolom yang tersedia; pengguna juga bisa mengubah pemetaan kolom."
    ],
    "galleryImages": [
      "/img/mm (1).png",
      "/img/mm (2).png"
    ],
    "section1Title": "Dari dataset mentah menjadi pertanyaan yang dapat dijawab",
    "section1Text1": "Setelah file dimuat, aplikasi mendeteksi struktur kolom dan menghitung ringkasan awal. Pengguna memilih kategori insight yang sesuai, lalu melihat hasil utama, perbandingan, tabel pendukung, dan SQL yang digunakan.",
    "section1Text2": "Sebagai contoh, analisis penurunan penjualan mengelompokkan pendapatan per bulan dan membandingkan periode yang berurutan. Jika dataset tidak memiliki kolom tanggal atau pendapatan yang sesuai, analisis tersebut ditandai membutuhkan pemetaan kolom, bukan menampilkan angka buatan.",
    "largeBannerImage": "/img/m (2).png",
    "section2Title": "Analitik yang transparan dan berjalan di browser",
    "section2Text1": "DuckDB-Wasm memproses CSV, XLSX, JSON, TSV, dan Parquet secara lokal. Chart.js menyediakan grafik bar, line, dan donut; GSAP menghaluskan transisi tampilan. Hono digunakan pada endpoint API kesehatan aplikasi, sedangkan Vercel menyediakan deployment gratis.",
    "section2Text2": "Pengguna tetap dapat menulis SQL langsung, memeriksa kelengkapan data, menghapus record duplikat, serta mengunduh hasil. Perhitungan profit adalah estimasi selisih pendapatan dan biaya yang tersedia, bukan klaim laba bersih atau penjelasan kausal.",
    "gridThumbnails": [
      "/img/mm (3).png",
      "/img/mm (4).png",
      "/img/mm (5).png",
      "/img/mm (6).png"
    ],
    "bottomGalleryImages": [
      "/img/mm (1).png",
      "/img/mm (2).png",
      "/img/mm (5).png",
      "/img/mm (7).png"
    ],
    "outcomeTitle": "Hasil yang Diperoleh",
    "outcomeText": "KleinData v2 berhasil dirilis sebagai web analytics studio responsif dengan 30 resep analisis SQL, impor dan pemeriksaan data, grafik interaktif, serta ekspor. Build dan pengujian browser otomatis telah dijalankan; belum ada pengukuran dampak bisnis dari penggunaan aplikasi.",
    "outcomeStats": [
      { "label": "Jenis insight", "value": "30" },
      { "label": "Format impor", "value": "5" },
      { "label": "Mesin analitik", "value": "DuckDB-Wasm" },
      { "label": "Pemrosesan data", "value": "Di browser" }
    ],
    "outcomeGallery": [
      "/img/m (2).png",
      "/img/m (1).png"
    ]
  },

  {
    "id": 10,
    "slug": "savelife",
    "title": "SaveLife — Simulasi Edukasi Bencana 3D Interaktif",
    "client": "Independent Project",
    "category": "Web Development",
    "image": "/img/savelife-phone-portrait.webp",
    "logo": "/img/savelife-mark.svg",
    "heroImage": "/img/savelife-laptop-studio.webp",
    "link": "https://savelife-zeta.vercel.app/",
    "repoUrl": "https://github.com/Darren0099/savelife",
    "tools": [
      "Astro",
      "JavaScript",
      "WebGL2",
      "Canvas 2D",
      "CSS",
      "Vercel"
    ],
    "buildTime": "2026 • Interactive 3D experience",
    "isExternalLink": true,
    "services": {
      "pills": [
        "Web Development",
        "Interactive 3D",
        "Learning Experience"
      ],
      "list": [
        "Lima lingkungan bencana dengan model 3D low-poly yang dapat diputar dan diperbesar",
        "Tujuh studi kasus berbasis pilihan tindakan beserta perubahan visual",
        "Simulasi tsunami, banjir, gempa, tanah longsor, dan kebakaran hutan",
        "Antarmuka map-first dengan panel misi ringkas, progres, dan tautan referensi resmi"
      ]
    },
    "summaryQuote": "Edukasi kesiapsiagaan yang dapat dieksplorasi: lihat kondisi bencana dalam dunia 3D, pilih tindakan, lalu amati konsekuensinya secara visual.",
    "descriptionParagraphs": [
      "SaveLife adalah prototipe website edukasi interaktif yang mengubah materi mitigasi bencana menjadi pengalaman berbasis keputusan. Pengguna tidak hanya membaca teori, tetapi mengamati sebuah diorama 3D dan melihat bagaimana lingkungan berubah setelah memilih tindakan.",
      "Proyek ini menggabungkan lima tema: kebakaran hutan dan lahan gambut, tsunami di kota pesisir, banjir di permukiman tepi sungai, gempa bumi di kawasan bangunan, serta tanah longsor di lereng perbukitan. Tujuh misi menyediakan opsi respons, umpan balik edukatif, dan perubahan kondisi visual sesuai keputusan.",
      "Setiap lingkungan menggunakan ilustrasi 3D low-poly orisinal dengan kamera yang dapat diputar dan diperbesar. Antarmuka dirancang 3D-first: panel pertanyaan dapat dilipat agar simulasi tetap dominan, lalu mengecil otomatis setelah sebuah pilihan dibuat. Ini merupakan simulasi ilustratif, bukan peta bahaya atau sistem peringatan bencana secara real-time."
    ],
    "galleryImages": [
      "/img/savelife-landslide-case.webp",
      "/img/savelife-tsunami-case.webp"
    ],
    "section1Title": "Lima dunia bencana, satu pola belajar interaktif",
    "section1Text1": "Skenario terdiri dari observasi kondisi, pengambilan keputusan, dan perubahan scene 3D. Pada kasus tsunami, lingkungan memperlihatkan kota pesisir dan jalur menuju area lebih tinggi; pada banjir, muka air naik di sekitar rumah. Skenario gempa memvisualisasikan getaran bangunan, sementara longsor menunjukkan pergerakan material di lereng.",
    "section1Text2": "Setelah menjawab, panel misi menutup untuk memberi ruang pada efek visual. Pengguna tetap dapat membuka penjelasan, mencoba ulang, atau melanjutkan misi berikutnya. XP dan progres disimpan secara lokal di browser tanpa akun.",
    "largeBannerImage": "/img/savelife-laptop-desk.webp",
    "section2Title": "Renderer WebGL2 tanpa ketergantungan model 3D eksternal",
    "section2Text1": "Astro digunakan untuk struktur situs statis, sementara JavaScript dan renderer WebGL2 prosedural membangun geometri pulau, jalan, rumah, vegetasi, air, dan efek simulasi secara langsung. Canvas 2D disediakan sebagai fallback ketika WebGL2 tidak tersedia.",
    "section2Text2": "Perbaikan antarmuka mencakup kamera adaptif, kontrol drag dan zoom, panel misi responsif, serta navigasi antar-bencana. Website dideploy melalui Vercel. Konten misi menggunakan rujukan BMKG, BNPB/InaRISK, NASA FIRMS, dan WHO; visualisasi tidak mewakili prediksi maupun instruksi darurat operasional.",
    "gridThumbnails": [
      "/img/savelife-landslide-case.webp",
      "/img/savelife-tsunami-case.webp",
      "/img/savelife-laptop-desk.webp",
      "/img/savelife-phone-portrait.webp"
    ],
    "bottomGalleryImages": [
      "/img/savelife-laptop-studio.webp",
      "/img/savelife-laptop-desk.webp",
      "/img/savelife-phone-portrait.webp",
      "/img/savelife-landslide-case.webp",
      "/img/savelife-tsunami-case.webp"
    ],
    "outcomeTitle": "Hasil Pengembangan",
    "outcomeText": "SaveLife telah dipublikasikan sebagai prototipe pembelajaran berbasis lima dunia 3D dan tujuh misi. Setiap skenario memiliki respons aman/berisiko, perubahan scene, kontrol kamera, penjelasan, referensi, serta penyimpanan progres lokal. Tiga mockup laptop/HP memperlihatkan antarmuka aplikasi dari screenshot yang tersedia, sedangkan dua screenshot lainnya ditampilkan tanpa bingkai mockup. Build dan deployment Vercel berhasil; pengujian visual lintas-perangkat dan validasi materi bersama pendidik atau praktisi kebencanaan masih menjadi tahap pengembangan berikutnya.",
    "outcomeStats": [
      {
        "label": "Lingkungan 3D",
        "value": "5"
      },
      {
        "label": "Misi edukasi",
        "value": "7"
      },
      {
        "label": "Grafis",
        "value": "WebGL2"
      },
      {
        "label": "Deployment",
        "value": "Vercel"
      }
    ],
    "outcomeGallery": [
      "/img/savelife-landslide-case.webp",
      "/img/savelife-tsunami-case.webp"
    ]
  },

  {
    "id": 11,
    "slug": "dapur-ummi-kyana",
    "title": "Dapur Ummi Kyana — Food E-Commerce & Admin Dashboard",
    "client": "Dapur Ummi Kyana Palembang",
    "category": "Web Development",
    "image": "",
    "heroImage": "",
    "link": "https://dapur-ummi-kyana-steel.vercel.app/",
    "repoUrl": "https://github.com/Darren0099/DapurUmmikyanaPalembang",
    "tools": [
      "Next.js",
      "React",
      "TypeScript",
      "CSS",
      "Lucide React",
      "Vercel",
      "Supabase (planned)",
      "PHP/MySQL (legacy)"
    ],
    "buildTime": "2025–2026 · Modernisasi e-commerce",
    "isExternalLink": true,
    "services": {
      "pills": [
        "E-Commerce",
        "Frontend",
        "Dashboard Admin"
      ],
      "list": [
        "Redesign katalog kuliner responsif dengan pencarian, kategori, dan keranjang",
        "Hero carousel, kartu produk, serta animasi CSS ringan",
        "Empat halaman khusus catering, snack box, tumpeng mini, dan prasmanan",
        "Panel admin dan API yang disiapkan untuk integrasi database"
      ]
    },
    "summaryQuote": "Modernisasi website UMKM kuliner: pengalaman memilih makanan yang lebih rapi, pemesanan via WhatsApp, dan fondasi dashboard administrasi berbasis API.",
    "descriptionParagraphs": [
      "Dapur Ummi Kyana Palembang sebelumnya memakai PHP dan MySQL untuk menampilkan menu makanan, keranjang pelanggan, pembayaran, dan modul admin. Repository lama memuat beragam penawaran kuliner dan fitur operasional, tetapi kode autentikasi dan alur transaksinya perlu diperbarui sebelum digunakan kembali untuk transaksi nyata.",
      "Saya membangun ulang storefront menggunakan Next.js, React, dan TypeScript dengan tampilan editorial yang responsif. Fitur yang sudah ditampilkan mencakup carousel menu unggulan, pencarian serta filter kategori, keranjang, dan konfirmasi pesanan melalui WhatsApp. Katalog pratinjau mempertahankan 18 nama menu unik dari website lama, dengan harga historis yang perlu divalidasi.",
      "Empat layanan catering mempunyai halaman detail tersendiri: Daily Catering, Snack Box, Tumpeng Mini, serta Prasmanan & Gubukan. Kode panel admin, API pesanan, autentikasi, dan skema PostgreSQL Supabase telah disiapkan, tetapi database toko dan integrasi pembayaran otomatis Midtrans belum diaktifkan. Website yang berjalan saat ini adalah katalog/pratinjau, bukan checkout online siap transaksi."
    ],
    "galleryImages": [],
    "gridThumbnails": [],
    "bottomGalleryImages": [],
    "outcomeGallery": [],
    "largeBannerImage": "",
    "section1Title": "Mempertahankan layanan lama dalam pengalaman e-commerce baru",
    "section1Text1": "Audit repository PHP menemukan dua versi halaman utama, 20 kartu katalog dengan 18 nama produk unik, halaman keranjang, login, status pembayaran, struk, dan modul admin. Konten catering dan paket dipulihkan menjadi section serta halaman layanan yang lebih mudah ditelusuri.",
    "section1Text2": "Frontend dibangun dengan desain responsif dan animasi CSS yang ringan. Pengguna dapat mencari menu, memilih kategori, menambah produk ke keranjang, lalu mengirimkan daftar pesanan untuk dikonfirmasi melalui WhatsApp. Foto produk asli belum tersedia di repository, sehingga sistem memakai ilustrasi berlabel sebagai tampilan sementara.",
    "section2Title": "Menyiapkan sistem admin dan pembayaran yang lebih aman",
    "section2Text1": "Kode baru menyediakan dasar API pesanan dengan perhitungan harga dari sisi server, proteksi akses admin, serta rancangan skema PostgreSQL dan aturan Row Level Security. Sistem belum terhubung ke proyek Supabase khusus toko sehingga login dan penyimpanan transaksi nyata belum aktif.",
    "section2Text2": "Audit menunjukkan riwayat merchant Midtrans QRIS, tetapi tidak ditemukan integrasi Midtrans aktif dalam source aplikasi baru. Gateway dan webhook harus dihubungkan serta diuji sebelum pembayaran online dapat diaktifkan. Implementasi Laravel/Railway masih berupa rencana pengembangan lanjutan, bukan teknologi yang sudah dijalankan.",
    "outcomeTitle": "Hasil dan Status Implementasi",
    "outcomeText": "Versi frontend telah berhasil dibangun dan di-deploy melalui Vercel, mencakup katalog pratinjau 18 menu unik, keranjang, pencarian, empat halaman layanan, animasi ringan, serta dasar dashboard admin. Integrasi database produksi, foto produk asli, dan pembayaran Midtrans masih menjadi tahap berikutnya. Dokumentasi audit source lama tersedia di repository.",
    "outcomeStats": [
      {
        "label": "Menu unik dari katalog lama",
        "value": "18"
      },
      {
        "label": "Halaman layanan",
        "value": "4"
      },
      {
        "label": "Status frontend",
        "value": "Live di Vercel"
      },
      {
        "label": "Pembayaran otomatis",
        "value": "Belum aktif"
      }
    ]
  },
  {
    "id": 1,
    "slug": "yri-sumsel",
    "title": "Website Profil dan CMS Berita Youth Ranger Indonesia Sumatera Selatan",
    "client": "Youth Ranger Indonesia Sumsel",
    "category": "Web Development",
    "image": "/img/ca3.png",
    "heroImage": "/img/ya (1).png",
    "link": "https://youthrangerindonesiasumateraselatan.vercel.app/",
    "repoUrl": "https://github.com/Darren0099/YOUTHRANGERINDONESIASUMATERASELATAN",
    "tools": [
      "Next.js",
      "React",
      "TypeScript",
      "CSS Modules",
      "GitHub API",
      "Vercel"
    ],
    "buildTime": "Website organisasi & CMS",
    "isExternalLink": true,
    "services": {
      "pills": [
        "Frontend",
        "CMS",
        "UI/UX"
      ],
      "list": [
        "Website profil organisasi responsif",
        "Halaman program, berita, dan galeri",
        "Panel admin untuk tambah, edit, dan hapus artikel",
        "Penyimpanan konten berbasis commit GitHub"
      ]
    },
    "summaryQuote": "Satu platform untuk memperkenalkan program organisasi sekaligus mengelola publikasi berita tanpa mengubah kode secara manual.",
    "descriptionParagraphs": [
      "Organisasi pemuda membutuhkan satu tempat yang jelas untuk menampilkan identitas, kegiatan, berita, dan dokumentasi kepada publik.",
      "Saya mengembangkan antarmuka website profil YRI Sumsel menggunakan Next.js App Router, React, TypeScript, dan CSS Modules. Kontennya dibagi menjadi halaman utama, program, berita, detail artikel, dan galeri.",
      "Panel admin artikel terhubung ke GitHub API: penambahan, penyuntingan, penghapusan berita, dan pengelolaan gambar dicatat sebagai perubahan data repository yang kemudian digunakan dalam deployment Vercel."
    ],
    "galleryImages": [
      "/img/yaa (1).png",
      "/img/yaa (5).png"
    ],
    "section1Title": "Apa yang dibangun dan bagaimana cara kerjanya?",
    "section1Text1": "Frontend menampilkan navigasi program, daftar berita dengan filter dan pencarian, serta halaman detail artikel yang memiliki progress membaca dan informasi kegiatan.",
    "section1Text2": "Untuk kebutuhan redaksi, CMS menyediakan formulir artikel, upload gambar, autentikasi admin, dan penyimpanan perubahan ke repository. Cara ini memungkinkan pengelolaan konten meski aplikasi tidak memakai database SQL.",
    "largeBannerImage": "/img/ya (2).png",
    "section2Title": "Pelajaran teknis dari proyek ini",
    "section2Text1": "Next.js mengatur routing dan rendering halaman, React membangun komponen interaktif, TypeScript menjaga struktur data, sedangkan CSS Modules membuat styling setiap komponen lebih terisolasi.",
    "section2Text2": "Penyimpanan lewat GitHub memerlukan token dengan izin penulisan, validasi unggahan, dan penanganan error API. Ini merupakan kompromi teknis yang perlu diperhatikan dibandingkan CMS dengan database khusus.",
    "gridThumbnails": [
      "/img/yaa (1).png",
      "/img/yaa (2).png",
      "/img/yaa (3).png",
      "/img/yaa (4).png"
    ],
    "bottomGalleryImages": [
      "/img/yaa (1).png",
      "/img/yaa (2).png",
      "/img/yaa (4).png",
      "/img/yaa (3).png"
    ],
    "outcomeTitle": "Hasil yang Diperoleh",
    "outcomeText": "Website organisasi dengan halaman profil, program, daftar dan detail berita, galeri, serta alur pengelolaan artikel melalui admin. Fitur tersedia pada kode proyek; angka pertumbuhan trafik atau pendaftaran belum diukur secara terverifikasi.",
    "outcomeStats": [
      {
        "label": "Modul utama",
        "value": "Profil • Program • Berita • Galeri"
      },
      {
        "label": "Pengelolaan artikel",
        "value": "Tambah • Edit • Hapus"
      }
    ],
    "outcomeGallery": [
      "/img/ya (1).png",
      "/img/ya (2).png"
    ]
  },
  {
    "id": 7,
    "slug": "asakita-protection",
    "title": "AsaKita — Konsep Platform Digital Perlindungan Perempuan dan Anak",
    "client": "AsaKita Protection",
    "category": "e-Government",
    "image": "/img/ca2.png",
    "heroImage": "/img/as (1).png",
    "link": "https://asa-kita.vercel.app/",
    "tools": [
      "Web UI",
      "Responsive Design",
      "e-Government Prototype"
    ],
    "buildTime": "KMIPN VII",
    "isExternalLink": true,
    "services": {
      "pills": [
        "Prototype",
        "UI/UX",
        "Layanan publik"
      ],
      "list": [
        "Konsep pelaporan insiden",
        "Akses informasi bantuan",
        "Navigasi layanan perlindungan",
        "Antarmuka edukasi publik"
      ]
    },
    "summaryQuote": "Menerjemahkan kebutuhan akses informasi dan pelaporan ke rancangan layanan digital yang lebih mudah dipahami.",
    "descriptionParagraphs": [
      "Informasi bantuan bagi perempuan dan anak perlu disampaikan dengan struktur yang jelas agar pengguna memahami pilihan layanan dan langkah pelaporan.",
      "AsaKita dirancang sebagai konsep layanan e-Government untuk memudahkan penelusuran informasi perlindungan, akses dukungan, dan alur pelaporan.",
      "Materi yang tersedia di portofolio menunjukkan rancangan antarmuka. Repository sumber AsaKita belum dapat diverifikasi sehingga framework, enkripsi, dan kesiapan layanan produksi tidak diklaim."
    ],
    "galleryImages": [
      "/img/as (4).png",
      "/img/as (5).png"
    ],
    "section1Title": "Mempermudah penemuan informasi penting",
    "section1Text1": "Struktur halaman berfokus pada alur pengguna: mengenali jenis bantuan, membaca informasi yang relevan, dan menemukan jalur tindak lanjut.",
    "section1Text2": "Penekanan visual dan bahasa yang mudah dipahami menjadi prinsip penting agar navigasi tidak membingungkan pengguna.",
    "largeBannerImage": "/img/as (6).png",
    "section2Title": "Ruang pengembangan berikutnya",
    "section2Text1": "Sebelum digunakan untuk laporan nyata, platform semacam ini memerlukan audit keamanan data pribadi, autentikasi, manajemen akses, dan prosedur rujukan yang teruji.",
    "section2Text2": "Hasil yang dapat ditunjukkan saat ini adalah konsep serta tampilan produk, bukan klaim waktu respons penanganan kasus atau skor audit keamanan.",
    "gridThumbnails": [
      "/img/as (1).png",
      "/img/as (2).png",
      "/img/as (3).png",
      "/img/as (4).png"
    ],
    "bottomGalleryImages": [
      "/img/as (7).png",
      "/img/as (2).png",
      "/img/as (3).png",
      "/img/as (4).png"
    ],
    "outcomeTitle": "Hasil yang Diperoleh",
    "outcomeText": "Prototipe tampilan layanan publik yang mengorganisasikan informasi edukasi dan konsep pelaporan agar dapat dipresentasikan serta dievaluasi lebih lanjut.",
    "outcomeStats": [],
    "outcomeGallery": [
      "/img/as (1).png",
      "/img/as (6).png"
    ]
  },
  {
    "id": 3,
    "slug": "global-retailer-analytics",
    "title": "Global Electronics Retailer — Analisis Profit dan Segmentasi RFM",
    "client": "Global Electronics Retailer Dataset",
    "category": "Data Analytics",
    "image": "/img/ca5.png",
    "heroImage": "/img/ga (3).png",
    "link": "https://github.com/Darren0099/global-electronics-retailer-analysis",
    "repoUrl": "https://github.com/Darren0099/global-electronics-retailer-analysis",
    "tools": [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "RFM"
    ],
    "buildTime": "Analisis data end-to-end",
    "isExternalLink": true,
    "services": {
      "pills": [
        "Data Cleaning",
        "Data Analysis",
        "Visualisasi"
      ],
      "list": [
        "Penggabungan lima tabel CSV",
        "Normalisasi transaksi lintas mata uang",
        "Penghitungan revenue, laba, dan margin",
        "Segmentasi pelanggan RFM dan analisis toko"
      ]
    },
    "summaryQuote": "Dari 62.884 baris penjualan menjadi rekomendasi tentang pelanggan bernilai tinggi, margin produk, dan performa toko.",
    "descriptionParagraphs": [
      "Data penjualan global tersebar dalam tabel produk, penjualan, pelanggan, toko, dan kurs. Nilai transaksi lintas mata uang harus diseragamkan sebelum perbandingan performa bisa dilakukan secara adil.",
      "Saya membuat pipeline Python menggunakan Pandas dan NumPy untuk membersihkan serta menggabungkan data, mengonversi mata uang dengan kurs harian, dan menghitung revenue, biaya, laba kotor, serta margin.",
      "Hasil analisis divisualisasikan menggunakan Matplotlib dan Seaborn. Segmentasi RFM mengelompokkan pelanggan berdasarkan waktu pembelian terakhir, frekuensi belanja, dan nilai pembelian."
    ],
    "galleryImages": [
      "/img/ga (4).png",
      "/img/ga (1).png"
    ],
    "section1Title": "Temuan pelanggan yang layak diprioritaskan",
    "section1Text1": "Sebanyak 11.887 pelanggan dikelompokkan menjadi enam segmen. Champions dan Loyal Customers mencakup sekitar 27% pelanggan tetapi menyumbang 47,8% revenue.",
    "section1Text2": "Segmen Need Attention memiliki nilai rata-rata sekitar US$7.209 per pelanggan dan lama tidak membeli. Ini menjadi kandidat kampanye reaktivasi yang lebih tepat sasaran.",
    "largeBannerImage": "/img/ga (2).png",
    "section2Title": "Mengukur profitabilitas, bukan hanya omzet",
    "section2Text1": "Analisis menghasilkan revenue US$55,76 juta dan laba kotor US$32,66 juta, dengan margin kotor 58,6%. Kategori Computers memberi revenue tertinggi, sedangkan margin Cell phones berada di bawah rata-rata.",
    "section2Text2": "Laporan CSV dan grafik PNG dibuat ulang melalui run_analysis.py. Hasil berupa rekomendasi bisnis dari dataset, bukan bukti peningkatan penjualan setelah rekomendasi diterapkan.",
    "gridThumbnails": [
      "/img/ga (1).png",
      "/img/ga (2).png",
      "/img/ga (3).png",
      "/img/ga (4).png"
    ],
    "bottomGalleryImages": [
      "/img/ga (1).png",
      "/img/ga (2).png",
      "/img/ga (3).png",
      "/img/ga (4).png"
    ],
    "outcomeTitle": "Hasil yang Diperoleh",
    "outcomeText": "Pipeline analitik yang dapat diulang, laporan KPI, visualisasi, dan prioritas aksi: mempertahankan pelanggan loyal, mengaktifkan segmen berisiko churn, serta meninjau kategori bermargin rendah.",
    "outcomeStats": [
      {
        "label": "Baris penjualan",
        "value": "62.884"
      },
      {
        "label": "Pelanggan RFM",
        "value": "11.887"
      },
      {
        "label": "Revenue",
        "value": "US$55,76 juta"
      },
      {
        "label": "Margin kotor",
        "value": "58,6%"
      }
    ],
    "outcomeGallery": [
      "/img/ga (3).png",
      "/img/ga (4).png"
    ]
  },
  {
    "id": 4,
    "slug": "pln-iconnet-portal",
    "title": "Portal Artikel dan CMS PLN Iconnet Bangka Belitung",
    "client": "PLN Icon Plus Sumbagsel — Wilayah Bangka Belitung",
    "category": "Fullstack CMS",
    "image": "/img/ca4.png",
    "heroImage": "/img/ca4.png",
    "link": "https://plniconnetbangkabelitung.ct.ws/",
    "repoUrl": "https://github.com/Darren0099/plniconnetbangkabelitung",
    "tools": [
      "PHP",
      "MySQL / MariaDB",
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "buildTime": "Website berita dan CMS",
    "isExternalLink": true,
    "services": {
      "pills": [
        "Fullstack",
        "CMS",
        "Database"
      ],
      "list": [
        "Artikel dan kategori berita",
        "Pencarian dan filter konten",
        "Dashboard admin artikel",
        "Pengelolaan unggahan media"
      ]
    },
    "summaryQuote": "Membangun alur publikasi berita daerah melalui portal artikel dan dashboard pengelola konten.",
    "descriptionParagraphs": [
      "Informasi berita, edukasi layanan, dan kegiatan wilayah perlu diperbarui tanpa mengubah file halaman setiap kali artikel baru diterbitkan.",
      "Saya mengembangkan portal artikel berbasis PHP dengan database MySQL/MariaDB, HTML, CSS, dan JavaScript. Aplikasi menampilkan kategori serta pencarian berita dan dilengkapi panel admin untuk pengelolaan konten.",
      "Kegiatan ini berkaitan dengan pekerjaan pengembangan website artikel selama pengalaman magang pada PLN Icon Plus Sumbagsel."
    ],
    "galleryImages": [
      "/img/ca4.png",
      "/img/ca5.png"
    ],
    "section1Title": "Dari input admin menjadi artikel yang dapat dibaca publik",
    "section1Text1": "Admin dapat menambah, menyunting, dan menghapus data artikel beserta media pendukung, sementara pengunjung menjelajahi konten berdasarkan kategori atau kata kunci.",
    "section1Text2": "PHP mengolah permintaan server dan interaksi dengan database; frontend HTML, CSS, dan JavaScript menghadirkan tampilan artikel yang mudah diakses di berbagai ukuran layar.",
    "largeBannerImage": "/img/ca4.png",
    "section2Title": "Apa manfaat implementasinya?",
    "section2Text1": "Pemisahan antara panel admin dan tampilan publik membuat proses pembaruan konten lebih terstruktur dibandingkan mengedit kode setiap kali ada berita.",
    "section2Text2": "Repository dan aplikasi menjadi contoh implementasi CRUD artikel. Belum ada pengukuran terverifikasi atas waktu publikasi, uptime, atau trafik sehingga tidak ditampilkan klaim persentase.",
    "gridThumbnails": [
      "/img/ca4.png"
    ],
    "bottomGalleryImages": [
      "/img/ca4.png"
    ],
    "outcomeTitle": "Hasil yang Diperoleh",
    "outcomeText": "Portal artikel responsif dengan database dan fungsi administrasi berita (buat, baca, ubah, hapus), serta penelusuran berdasarkan kategori dan pencarian.",
    "outcomeStats": [],
    "outcomeGallery": [
      "/img/ca4.png"
    ]
  },
  {
    "id": 6,
    "slug": "tokopedia-sentiment-analysis",
    "title": "Tokopedia — Analisis Rating dan Kinerja Kategori Produk",
    "client": "Tokopedia Marketplace Dataset",
    "category": "Data Analytics",
    "image": "/img/ca6.png",
    "heroImage": "/img/ta (2).png",
    "link": "https://github.com/Darren0099/tokopedia-sentiment-analysis",
    "repoUrl": "https://github.com/Darren0099/tokopedia-sentiment-analysis",
    "tools": [
      "Python",
      "Pandas",
      "Jupyter Notebook",
      "Matplotlib",
      "Seaborn"
    ],
    "buildTime": "Exploratory Data Analysis",
    "isExternalLink": true,
    "services": {
      "pills": [
        "Data Cleaning",
        "EDA",
        "Visualisasi"
      ],
      "list": [
        "Pembersihan dataset produk",
        "Pengelompokan rating positif/netral/negatif",
        "Perbandingan penjualan per kategori",
        "Ekspor metrik KPI dan grafik"
      ]
    },
    "summaryQuote": "Menganalisis 3.664 produk dan 6,17 juta item terjual untuk menemukan kekuatan kategori dan risiko rating rendah.",
    "descriptionParagraphs": [
      "Data produk marketplace sering menyatukan harga, rating, dan angka penjualan dalam bentuk yang perlu dibersihkan sebelum dianalisis.",
      "Saya memakai notebook Python dengan Pandas untuk memeriksa data, menstandarkan kolom, dan menghitung kinerja lima kategori; Matplotlib dan Seaborn digunakan untuk menghasilkan grafik.",
      "Istilah sentimen pada proyek ini berarti klasifikasi berbasis nilai bintang: rating ≥4 positif, rating 3 netral, dan rating ≤2 negatif. Analisis ini bukan pemrosesan teks ulasan dengan model NLP."
    ],
    "galleryImages": [
      "/img/ta (4).png",
      "/img/ta (3).png"
    ],
    "section1Title": "Kategori dengan permintaan terbesar",
    "section1Text1": "Dataset memuat 6.173.830 item terjual dari 3.664 produk di 158 toko, dengan rata-rata rating 4,64/5.",
    "section1Text2": "Kategori Olahraga mencatat volume terbesar pada kelompok rating positif, disusul Elektronik dan Fashion. Hasil ini memberi petunjuk awal untuk prioritas inventaris dan promosi.",
    "largeBannerImage": "/img/ta (2).png",
    "section2Title": "Mendeteksi area yang perlu diselidiki",
    "section2Text1": "Kategori Handphone memiliki 47.457 item terjual pada produk ber-rating rendah. Angka ini perlu ditinjau bersama kualitas produk, ekspektasi konsumen, dan layanan penjual.",
    "section2Text2": "Output akhir berupa notebook analisis, CSV ringkasan KPI, dan grafik; hubungan rating dengan penjualan bersifat deskriptif dan tidak membuktikan hubungan sebab-akibat.",
    "gridThumbnails": [
      "/img/ta (1).png",
      "/img/ta (2).png",
      "/img/ta (3).png",
      "/img/ta (4).png"
    ],
    "bottomGalleryImages": [
      "/img/ta (1).png",
      "/img/ta (2).png",
      "/img/ta (3).png",
      "/img/ta (4).png"
    ],
    "outcomeTitle": "Hasil yang Diperoleh",
    "outcomeText": "Rangkuman performa lima kategori dan distribusi rating yang dapat dipakai untuk meninjau alokasi stok, promosi, serta kategori yang layak diperiksa kualitas layanannya.",
    "outcomeStats": [
      {
        "label": "Produk",
        "value": "3.664"
      },
      {
        "label": "Toko",
        "value": "158"
      },
      {
        "label": "Item terjual",
        "value": "6.173.830"
      },
      {
        "label": "Rata-rata rating",
        "value": "4,64 / 5"
      }
    ],
    "outcomeGallery": [
      "/img/ta (3).png",
      "/img/ta (4).png"
    ]
  },
  {
    "id": 2,
    "slug": "palembang-go-vacation",
    "title": "Palembang Go Vacation — Katalog 94 Destinasi Wisata",
    "client": "KMIPN VI — Politeknik Negeri Sriwijaya",
    "category": "Web Development",
    "image": "/img/palembang-portrait-phone.webp",
    "heroImage": "/img/pa (1).png",
    "link": "https://palembang-go-vacation.vercel.app/",
    "repoUrl": "https://github.com/Darren0099/KMIPN6-EGOVERNEMNT",
    "tools": [
      "Next.js",
      "React",
      "TypeScript",
      "CSS Modules",
      "Google Maps"
    ],
    "buildTime": "KMIPN VI • Portal wisata",
    "isExternalLink": true,
    "services": {
      "pills": [
        "Frontend",
        "Content Architecture",
        "UI/UX"
      ],
      "list": [
        "Katalog dan filter destinasi per kategori",
        "Halaman detail berbasis slug",
        "Galeri dengan lightbox",
        "Tautan peta dan tur virtual 360°"
      ]
    },
    "summaryQuote": "Membuat satu pintu untuk mengenal wisata Palembang lewat katalog, detail destinasi, galeri, dan peta.",
    "descriptionParagraphs": [
      "Informasi tempat wisata Palembang tersebar di banyak sumber sehingga pengunjung memerlukan titik awal untuk mengenal destinasi, sejarah, dan lokasi.",
      "Bersama tim, saya membangun portal wisata dengan Next.js App Router, React, TypeScript, dan CSS Modules. Informasi destinasi dikelola pada data terstruktur, bukan halaman HTML terpisah untuk masing-masing tempat.",
      "Tampilan mencakup slider unggulan, katalog yang bisa difilter, halaman detail berdasarkan slug, galeri foto, tautan Google Maps, serta tombol tur virtual 3D/360° untuk destinasi yang mendukungnya."
    ],
    "galleryImages": [
      "/img/pa (2).png",
      "/img/pa (3).png"
    ],
    "section1Title": "Satu struktur data, banyak halaman destinasi",
    "section1Text1": "Repository versi sekarang memuat 94 destinasi: 47 wisata sejarah dan budaya, 32 wisata buatan, 4 wisata alam, dan 11 wisata kuliner.",
    "section1Text2": "Satu template Next.js menangani rute /wisata/[slug]. Pengelola menambah objek data baru tanpa perlu menulis ulang tata letak halaman, dan 14 destinasi memiliki tautan tur virtual.",
    "largeBannerImage": "/img/pa (1).png",
    "section2Title": "Cara teknologi mendukung pengalaman wisatawan",
    "section2Text1": "React membangun antarmuka filter kategori, carousel, dan galeri. TypeScript menjaga tipe konten destinasi, sedangkan CSS Modules mempertahankan gaya komponen secara terpisah.",
    "section2Text2": "Hasilnya adalah portal informasi yang mudah dijelajahi. Sebagian destinasi masih menggunakan konten fallback, dan form newsletter pada repository belum terhubung ke layanan email.",
    "gridThumbnails": [
      "/img/pa (1).png",
      "/img/pa (2).png",
      "/img/pa (3).png",
      "/img/pa (4).png"
    ],
    "bottomGalleryImages": [
      "/img/pa (1).png",
      "/img/pa (2).png",
      "/img/pa (3).png",
      "/img/pa (4).png"
    ],
    "outcomeTitle": "Hasil yang Diperoleh",
    "outcomeText": "Website katalog wisata dengan halaman dinamis, navigasi kategori, galeri, peta, dan opsi tur virtual; total 94 destinasi pada data repository.",
    "outcomeStats": [
      {
        "label": "Destinasi",
        "value": "94"
      },
      {
        "label": "Halaman dengan deskripsi",
        "value": "73"
      },
      {
        "label": "Tur virtual 360°",
        "value": "14"
      },
      {
        "label": "Kategori wisata",
        "value": "4"
      }
    ],
    "outcomeGallery": [
      "/img/pa (2).png",
      "/img/pa (3).png"
    ]
  }
];
