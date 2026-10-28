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
    "id": 8,
    "slug": "kleindata",
    "title": "KleinData — Smart Insight Studio & Data Analytics Workspace",
    "client": "Independent Project",
    "category": "Web Development",
    "image": "/img/kleindata-landscape-studio.jpg",
    "heroImage": "/img/kleindata-landscape-desk.jpg",
    "link": "https://kleindata-darren-0099s-projects.vercel.app/",
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
      "/img/kleindata-portrait-phone.jpg",
      "/img/kleindata-landscape-studio.jpg"
    ],
    "section1Title": "Dari dataset mentah menjadi pertanyaan yang dapat dijawab",
    "section1Text1": "Setelah file dimuat, aplikasi mendeteksi struktur kolom dan menghitung ringkasan awal. Pengguna memilih kategori insight yang sesuai, lalu melihat hasil utama, perbandingan, tabel pendukung, dan SQL yang digunakan.",
    "section1Text2": "Sebagai contoh, analisis penurunan penjualan mengelompokkan pendapatan per bulan dan membandingkan periode yang berurutan. Jika dataset tidak memiliki kolom tanggal atau pendapatan yang sesuai, analisis tersebut ditandai membutuhkan pemetaan kolom, bukan menampilkan angka buatan.",
    "largeBannerImage": "/img/kleindata-landscape-studio.jpg",
    "section2Title": "Analitik yang transparan dan berjalan di browser",
    "section2Text1": "DuckDB-Wasm memproses CSV, XLSX, JSON, TSV, dan Parquet secara lokal. Chart.js menyediakan grafik bar, line, dan donut; GSAP menghaluskan transisi tampilan. Hono digunakan pada endpoint API kesehatan aplikasi, sedangkan Vercel menyediakan deployment gratis.",
    "section2Text2": "Pengguna tetap dapat menulis SQL langsung, memeriksa kelengkapan data, menghapus record duplikat, serta mengunduh hasil. Perhitungan profit adalah estimasi selisih pendapatan dan biaya yang tersedia, bukan klaim laba bersih atau penjelasan kausal.",
    "gridThumbnails": [
      "/img/kleindata-landscape-desk.jpg",
      "/img/kleindata-portrait-phone.jpg",
      "/img/kleindata-landscape-studio.jpg",
      "/img/kleindata-portrait-tablet.jpg"
    ],
    "bottomGalleryImages": [
      "/img/kleindata-portrait-tablet.jpg",
      "/img/kleindata-landscape-studio.jpg",
      "/img/kleindata-portrait-phone.jpg",
      "/img/kleindata-landscape-desk.jpg"
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
      "/img/kleindata-landscape-desk.jpg",
      "/img/kleindata-portrait-tablet.jpg"
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
    "id": 5,
    "slug": "youth-visual-identity",
    "title": "Identitas Visual dan Konten Media Sosial Youth Ranger Sumsel",
    "client": "Youth Ranger Indonesia Sumsel",
    "category": "Graphic Design",
    "image": "/img/ca1.png",
    "heroImage": "/img/ca1.png",
    "link": "https://www.instagram.com/youthranger.sumsel",
    "tools": [
      "Canva",
      "Graphic Design",
      "Branding",
      "Social Media Design"
    ],
    "buildTime": "Desain komunikasi organisasi",
    "isExternalLink": true,
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
    "summaryQuote": "Menyatukan tampilan informasi kegiatan agar identitas organisasi mudah dikenali di berbagai materi publikasi.",
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
    "image": "/img/pa (1).png",
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
