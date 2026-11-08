// Curated from the user's uploaded CV, public GitHub READMEs, portfolio and LinkedIn headline.
// Numeric statements describe documented project scope, never fabricated commercial impact.
export type CVLang = 'id' | 'en';
export type CVRole = 'general' | 'web' | 'data' | 'design' | 'hr';
export type CVPages = 1 | 2;
export type DualText = { id: string; en: string };
export type CVEntry = {
  title: DualText;
  organization: string;
  period: string;
  bullets: DualText[];
  url?: string;
};
export type CVSkill = { label: DualText; value: string | DualText };
export type CVProfile = {
  label: DualText;
  headline: DualText;
  summary: DualText;
  experience: CVEntry[];
  projects: CVEntry[];
  skills: CVSkill[];
  certificates: string[];
  highlights: DualText[];
};
export const cvText = (id: string, en: string): DualText => ({ id, en });
const t = cvText;
const entry = (title: DualText, organization: string, period: string, bullets: DualText[], url?: string): CVEntry => ({ title, organization, period, bullets, url });
const skill = (label: DualText, value: string | DualText): CVSkill => ({ label, value });

export const cvRoles: CVRole[] = ['general', 'web', 'data', 'design', 'hr'];

export const cvProfiles: Record<CVRole, CVProfile> = {
  general: {
    label: t('Umum / General', 'General / All-round'),
    headline: t('Lulusan D3 Teknik Komputer | Administrasi, Operasional & Digital', 'Computer Engineering Graduate | Operations, Administration & Digital'),
    summary: t(
      'Lulusan D3 Teknik Komputer Politeknik Negeri Sriwijaya (IPK 3,66) dengan pengalaman lintas bidang: pengembangan aplikasi web, pengelolaan konten dan komunikasi perusahaan, kepemimpinan HR, serta analisis data. Terbiasa bekerja dengan tim lintas fungsi, mengelola dokumentasi dan alur kerja, serta menerjemahkan kebutuhan menjadi solusi digital yang dapat digunakan.',
      'Diploma III Computer Engineering graduate from Sriwijaya State Polytechnic (GPA 3.66/4.00) with cross-functional experience in web development, corporate content administration, HR leadership, and data analysis. Experienced in team coordination, structured documentation, and converting operational needs into usable digital solutions.'
    ),
    experience: [
      entry(t("Ketua Human Resources — Distrik Sumatera 2", "Head of Human Resources — Sumatera 2 District"), "Youth Ranger Indonesia", "Jun 2025 – Jan 2026", [
        t("Mengoordinasikan 7 program kerja SDM, antara lain Talent System, HR Connect, Cultural Check-In, Weekly Division Pulse, Individual Performance Log, Regional Development Camp, dan HR Reward.", "Coordinated 7 people-development programs, including Talent System, HR Connect, Cultural Check-In, Weekly Division Pulse, Individual Performance Log, Regional Development Camp, and HR Reward."),
        t("Menangani alur rekrutmen dari penyusunan proses dan seleksi kandidat hingga koordinasi lintas divisi bersama pengurus regional dan distrik.", "Supported end-to-end recruitment workflows, from process design and candidate screening to cross-division coordination with regional and district leads."),
        t("Mengembangkan praktik pemetaan talenta, pencatatan kinerja, dan evaluasi anggota untuk menindaklanjuti pengembangan individu secara terstruktur.", "Structured talent mapping, performance tracking, and member evaluations to inform organized development follow-ups."),
        t("Menyusun jadwal kerja lintas tim selama 1 bulan dengan unsur project management, media, dan public relations sebagai bagian dari program organisasi.", "Coordinated a one-month cross-functional work plan spanning project management, media, and public relations.")
      ]),
      entry(t("Web Developer Intern — Divisi Humas", "Web Developer Intern — Corporate Communications"), "PLN Icon Plus SBU Sumbagsel", "Jul – Sep 2025", [
        t("Mengembangkan portal artikel wilayah Bangka Belitung berbasis PHP/MySQL untuk mendukung publikasi informasi, berita kegiatan, dan kebutuhan komunikasi digital perusahaan.", "Built a PHP/MySQL article portal for the Bangka Belitung region to support information publishing, activity news, and digital communications."),
        t("Menerapkan pengelolaan artikel melalui panel CMS admin, termasuk penambahan, pembaruan, penghapusan konten, serta pengelolaan gambar pendukung.", "Implemented article administration through a CMS with create, update, delete, and media management workflows."),
        t("Menyusun navigasi kategori, pencarian, filter, dan halaman responsif untuk memperjelas akses pembaca terhadap konten yang tersedia.", "Created categories, search, filters, and responsive pages to improve content discovery for readers."),
        t("Mendukung penulisan dan publikasi artikel, serta pengelolaan platform web sebagai bagian dari aktivitas humas dan branding digital.", "Supported article drafting and publishing, and managed website content as part of corporate communications and digital branding.")
      ], "https://github.com/Darren0099/plniconnetbangkabelitung"),
      entry(t("Graphic Designer & Koordinasi Acara", "Graphic Designer & Event Coordination"), "Duta Potensi Pemuda Indonesia — Youthopia Symposium", "Apr 2025 – Mar 2026", [
        t("Menyusun materi komunikasi visual dan identitas acara untuk kebutuhan publikasi, promosi, serta penyampaian informasi kepada peserta dan pemangku kepentingan.", "Produced visual communications and event identity assets for promotion and information delivery to participants and stakeholders."),
        t("Menjaga konsistensi tipografi, elemen grafis, serta tata letak agar materi acara terlihat selaras pada berbagai kanal komunikasi.", "Maintained consistent typography, visual elements, and layouts across event communication channels."),
        t("Berkolaborasi dengan tim acara dan komunikasi serta membantu koordinasi peserta sebagai Liaison Officer sementara dalam rangkaian kunjungan kelembagaan.", "Collaborated with event and communications teams, including temporary liaison coordination during institutional visits."),
        t("Mengelola penyesuaian desain terhadap brief dan kebutuhan publikasi yang berubah selama persiapan pelaksanaan acara.", "Adapted creative materials to evolving briefs and communication needs during event preparation.")
      ]),
    ],
    projects: [
      entry(t("Palembang Go Vacation — Finalis KMIPN VI, E-Government", "Palembang Go Vacation — KMIPN VI E-Government Finalist"), "KMIPN VI · Politeknik Negeri Jakarta (Depok) · Next.js / TypeScript", "Jul 2024", [
        t("Memimpin kontribusi pengembangan portal e-tourism bersama tim Politeknik Negeri Sriwijaya untuk ajang final KMIPN VI di Politeknik Negeri Jakarta.", "Led development contributions to an e-tourism portal with the Sriwijaya State Polytechnic team for the KMIPN VI finals hosted by Politeknik Negeri Jakarta."),
        t("Menyusun katalog 94 destinasi dalam 4 kategori wisata, lengkap dengan halaman detail dinamis dan navigasi berbasis kategori.", "Organized 94 destinations into 4 categories, with dynamic detail pages and category-based navigation."),
        t("Mengintegrasikan galeri, tautan peta, dan 14 sumber tur virtual 3D/360° yang tersedia untuk membantu eksplorasi informasi wisata.", "Integrated galleries, map links, and 14 available 3D/360° virtual-tour resources for destination exploration."),
        t("Membangun tampilan informasi yang menyatukan sejarah kota, rekomendasi wisata, serta konten destinasi dari sumber yang disediakan tim.", "Created unified pages for city history, tourism recommendations, and destination content curated by the team.")
      ], "https://github.com/Darren0099/KMIPN6-EGOVERNEMNT"),
      entry(t("AsaKita — Proyek KMIPN VII, Platform Edukasi Interaktif", "AsaKita — KMIPN VII Interactive Learning Platform"), "KMIPN VII · Politeknik Negeri Padang · Next.js / React", "Feb – Sep 2025", [
        t("Berkontribusi sebagai lead frontend pada proyek edukasi pencegahan pernikahan dini dan kekerasan terhadap perempuan, yang dikembangkan untuk KMIPN VII (tanpa klaim finalis).", "Contributed as lead frontend developer to an early-marriage and violence-prevention learning project developed for KMIPN VII (no finalist claim)."),
        t("Membangun dashboard 6 modul progresif dengan kuis, XP, level, lencana, dan sertifikat PDF yang dapat dicetak dari browser.", "Built a 6-module learning dashboard with quizzes, XP, levels, badges, and browser-printable certificates."),
        t("Mengimplementasikan fitur aksesibilitas seperti pengaturan teks, kontras, font, pengurangan animasi, dan pembacaan halaman.", "Implemented accessibility controls for text size, contrast, fonts, reduced motion, and page reading."),
        t("Menyediakan direktori bantuan dan navigasi peta ke lembaga terkait; prototipe memakai penyimpanan lokal dan tautan bantuan eksternal, bukan pelaporan backend langsung.", "Added help directories and mapping to support organizations; the prototype uses local storage and external help links, not direct backend case reporting.")
      ], "https://github.com/Darren0099/KM7"),
      entry(t("YRI HRD — Dashboard Evaluasi Kandidat", "YRI HRD — Candidate Evaluation Dashboard"), "Next.js / PostgreSQL / Drizzle ORM · Prototipe", "2026", [
        t("Mengembangkan prototipe dashboard kandidat yang menyatukan data pelamar, catatan wawancara, dan formulir penilaian dalam satu alur.", "Developed a prototype centralizing applicant records, interview notes, and scoring forms."),
        t("Menerapkan 5 aspek evaluasi, pemeringkatan kandidat, dan tampilan hasil per regional atau divisi sesuai konfigurasi aplikasi.", "Implemented 5 assessment dimensions, candidate rankings, and region/division summaries based on app configuration."),
        t("Menyusun keluaran laporan Excel dan PDF untuk memudahkan peninjauan serta dokumentasi hasil penilaian.", "Built Excel and PDF report exports for reviewing and documenting assessment results."),
        t("Memisahkan konfigurasi skor dan kuota pada kode; aturan contoh belum divalidasi sebagai kebijakan rekrutmen resmi.", "Separated scoring and quota configuration in code; example rules are not validated as official recruitment policy.")
      ], "https://github.com/Darren0099/YRIHRD"),
    ],
    skills: [
      skill(t('Administrasi & operasional', 'Administration & operations'),t('Dokumentasi, koordinasi tim, pelaporan, evaluasi','Documentation, team coordination, reporting, evaluation')),
      skill(t('Digital & pengembangan web', 'Digital & web development'),'HTML, CSS, JavaScript, React, Next.js, PHP, MySQL'),
      skill(t('Analisis & pengolahan data', 'Data analysis & processing'),'Excel, Python, SQL, Dashboard, Data Cleaning'),
      skill(t('Komunikasi & desain', 'Communications & design'),t('Figma, Canva, konten digital, komunikasi organisasi','Figma, Canva, digital content, organizational communication'))
    ],
    certificates: ['Data Analytics Essentials — Cisco Networking Academy','CSS Essentials — Cisco Networking Academy','IT Customer Support Basics — Cisco Networking Academy'],
    highlights: [
      t('IPK 3,66/4,00 — D3 Teknik Komputer, Politeknik Negeri Sriwijaya.', 'GPA 3.66/4.00 — Diploma III Computer Engineering, Sriwijaya State Polytechnic.'),
      t('Finalis KMIPN VI kategori e-Government (2024).','Finalist, KMIPN VI e-Government category (2024).')
    ]
  },
  web: {
    label: t('Frontend / Web Developer','Frontend / Web Developer'),
    headline: t('Frontend / Web Developer', 'Frontend / Web Developer'),
    summary: t('Lulusan D3 Teknik Komputer yang berfokus pada pengembangan website responsif, sistem pengelolaan konten, dan aplikasi web berbasis data. Memiliki pengalaman mengembangkan antarmuka dengan React, Next.js, SvelteKit, serta integrasi PHP/MySQL dan API. Mengutamakan antarmuka yang mudah digunakan dan alur kerja yang terstruktur.','Computer Engineering graduate focused on responsive websites, content management systems, and data-driven web apps. Hands-on with React, Next.js, SvelteKit, PHP/MySQL, and API integrations, prioritizing usable interfaces and reliable workflows.'),
    experience: [
      entry(t("Web Developer Intern (Fullstack) — Divisi Humas", "Web Developer Intern (Fullstack) — Corporate Communications"), "PLN Icon Plus SBU Sumbagsel", "Jul – Sep 2025", [
        t("Membangun portal informasi dan berita PLN Iconnet Bangka Belitung menggunakan PHP, MySQL, HTML, CSS, dan JavaScript, dengan pemisahan halaman publik dan administrasi.", "Developed a PHP, MySQL, HTML, CSS, and JavaScript news portal for PLN Iconnet Bangka Belitung with separate public and admin views."),
        t("Mengembangkan CMS untuk membuat, mengubah, dan menghapus artikel beserta pengelolaan gambar agar tim pengelola tidak perlu menyunting halaman secara manual.", "Implemented an article CMS with create, edit, delete, and media workflows so editors did not need to modify web pages manually."),
        t("Menerapkan pencarian artikel, kategori konten, navigasi, dan layout responsif untuk memudahkan pembaca menemukan publikasi.", "Added article search, content categorization, navigation, and responsive layouts to improve discovery."),
        t("Berkolaborasi dengan Divisi Humas dalam penyusunan dan pengelolaan materi publikasi, sembari memastikan struktur serta tampilan artikel tetap konsisten.", "Worked with the Communications Division on publishing workflows while maintaining consistent content structure and presentation.")
      ], "https://github.com/Darren0099/plniconnetbangkabelitung"),
      entry(t("Junior Full Stack Developer — Website Organisasi", "Junior Full Stack Developer — Organization Website"), "Youth Ranger Indonesia Sumatera Selatan", "Jan 2024 – Sep 2025", [
        t("Mengembangkan website organisasi sebagai pusat informasi visi, misi, program, kegiatan, berita, dan galeri dengan pendekatan antarmuka responsif.", "Built an organization website centralizing its mission, programs, activities, news, and gallery in a responsive UI."),
        t("Mengembangkan versi aplikasi berbasis Next.js, React, dan TypeScript dengan halaman detail artikel dinamis, pencarian, filter, dan pengalaman navigasi yang konsisten.", "Developed a Next.js, React, and TypeScript iteration with dynamic articles, search, filtering, and consistent navigation."),
        t("Mengimplementasikan CMS berbasis GitHub API untuk alur penambahan, penyuntingan, penghapusan artikel dan manajemen gambar; operasi publikasi memerlukan izin token.", "Integrated a GitHub API-backed CMS for adding, editing, deleting articles and handling images; publishing depends on token permissions."),
        t("Menyelaraskan kebutuhan publikasi tim organisasi dengan struktur informasi serta komponen antarmuka yang dapat diperbarui.", "Translated the organization's publishing requirements into maintainable information architecture and interface components.")
      ], "https://github.com/Darren0099/YOUTHRANGERINDONESIASUMATERASELATAN"),
      entry(t("Research Assistant — Pengembangan E-Commerce UMKM", "Research Assistant — SME E-Commerce Development"), "Politeknik Negeri Sriwijaya", "Mei – Jul 2025", [
        t("Mengembangkan website e-commerce Dapur Ummi Kyana berbasis PHP/MySQL dengan halaman katalog menu, akun pengguna, keranjang, dan alur pemesanan.", "Contributed to a PHP/MySQL e-commerce website for Dapur Ummi Kyana with menu catalog, user accounts, cart, and ordering workflows."),
        t("Menyusun modul administrasi pesanan dan transaksi yang menampilkan ringkasan pengguna, pemasukan, pembayaran, serta status pengiriman pada dashboard admin.", "Built order and transaction administration views showing users, revenue summaries, payments, and delivery status in an admin dashboard."),
        t("Mengerjakan alur pembayaran dan struk pada kode aplikasi; integrasi pembayaran tidak diklaim telah tersertifikasi atau siap transaksi produksi.", "Implemented payment and receipt flows in source code without claiming certified production-ready payment integration."),
        t("Berkontribusi pada kegiatan pengabdian dosen terkait adopsi platform digital oleh UMKM serta pendampingan penggunaan website.", "Supported a lecturer-led community project to help an SME adopt and use a digital platform.")
      ], "https://github.com/Darren0099/DapurUmmikyanaPalembang"),
    ],
    projects: [
      entry(t("Palembang Go Vacation — Finalis KMIPN VI, E-Government", "Palembang Go Vacation — KMIPN VI E-Government Finalist"), "KMIPN VI · Politeknik Negeri Jakarta (Depok) · Next.js / TypeScript", "Jul 2024", [
        t("Memimpin kontribusi pengembangan portal e-tourism bersama tim Politeknik Negeri Sriwijaya untuk ajang final KMIPN VI di Politeknik Negeri Jakarta.", "Led development contributions to an e-tourism portal with the Sriwijaya State Polytechnic team for the KMIPN VI finals hosted by Politeknik Negeri Jakarta."),
        t("Menyusun katalog 94 destinasi dalam 4 kategori wisata, lengkap dengan halaman detail dinamis dan navigasi berbasis kategori.", "Organized 94 destinations into 4 categories, with dynamic detail pages and category-based navigation."),
        t("Mengintegrasikan galeri, tautan peta, dan 14 sumber tur virtual 3D/360° yang tersedia untuk membantu eksplorasi informasi wisata.", "Integrated galleries, map links, and 14 available 3D/360° virtual-tour resources for destination exploration."),
        t("Membangun tampilan informasi yang menyatukan sejarah kota, rekomendasi wisata, serta konten destinasi dari sumber yang disediakan tim.", "Created unified pages for city history, tourism recommendations, and destination content curated by the team.")
      ], "https://github.com/Darren0099/KMIPN6-EGOVERNEMNT"),
      entry(t("AsaKita — Proyek KMIPN VII, Platform Edukasi Interaktif", "AsaKita — KMIPN VII Interactive Learning Platform"), "KMIPN VII · Politeknik Negeri Padang · Next.js / React", "Feb – Sep 2025", [
        t("Berkontribusi sebagai lead frontend pada proyek edukasi pencegahan pernikahan dini dan kekerasan terhadap perempuan, yang dikembangkan untuk KMIPN VII (tanpa klaim finalis).", "Contributed as lead frontend developer to an early-marriage and violence-prevention learning project developed for KMIPN VII (no finalist claim)."),
        t("Membangun dashboard 6 modul progresif dengan kuis, XP, level, lencana, dan sertifikat PDF yang dapat dicetak dari browser.", "Built a 6-module learning dashboard with quizzes, XP, levels, badges, and browser-printable certificates."),
        t("Mengimplementasikan fitur aksesibilitas seperti pengaturan teks, kontras, font, pengurangan animasi, dan pembacaan halaman.", "Implemented accessibility controls for text size, contrast, fonts, reduced motion, and page reading."),
        t("Menyediakan direktori bantuan dan navigasi peta ke lembaga terkait; prototipe memakai penyimpanan lokal dan tautan bantuan eksternal, bukan pelaporan backend langsung.", "Added help directories and mapping to support organizations; the prototype uses local storage and external help links, not direct backend case reporting.")
      ], "https://github.com/Darren0099/KM7"),
      entry(t("Dapur Ummi Kyana — Website E-Commerce UMKM", "Dapur Ummi Kyana — SME E-Commerce Website"), "PHP / MySQL / JavaScript · Pengabdian Masyarakat", "Mei – Jul 2025", [
        t("Mengembangkan alur e-commerce berbasis PHP/MySQL untuk menampilkan katalog kuliner, registrasi, login, keranjang, dan pembuatan pesanan.", "Implemented PHP/MySQL e-commerce flows for culinary catalog, registration, login, cart, and order creation."),
        t("Menyusun modul admin dengan ringkasan jumlah pengguna, pesanan, pemasukan, transaksi terkini, dan status pembayaran/pengiriman.", "Built an admin dashboard summarizing users, orders, revenue, recent transactions, and payment/delivery status."),
        t("Mengembangkan halaman pembayaran dan struk serta struktur pengelolaan data transaksi; implementasi gateway tidak diklaim siap produksi.", "Developed payment and receipt pages and transaction-management structure without claiming production-ready gateway integrations."),
        t("Berkolaborasi dalam proyek pengabdian dosen untuk mendukung digitalisasi pengelolaan katalog dan pemesanan UMKM lokal.", "Contributed to a lecturer-led community project supporting digital ordering and product management for a local SME.")
      ], "https://github.com/Darren0099/DapurUmmikyanaPalembang"),
    ],
    skills: [
      skill(t('Bahasa & antarmuka','Languages & frontend'),'HTML, CSS, JavaScript, TypeScript, React, Next.js, SvelteKit'),
      skill(t('Backend & data','Backend & data'),'PHP, MySQL, PostgreSQL, Drizzle ORM, REST API, GitHub API'),
      skill(t('Peralatan','Tools'),'Git, GitHub, Vercel, VS Code, Figma'),
      skill(t('Praktik','Practices'),'Responsive Design, CMS, UI/UX, Web Accessibility')
    ],
    certificates:['CSS Essentials — Cisco Networking Academy','Belajar Back-End Pemula dengan JavaScript — Dicoding','Belajar Dasar Pemrograman JavaScript — Dicoding'],
    highlights:[
      t('Finalis IT Fest — Web Design (2024).','IT Fest Web Design Finalist (2024).'),
      t('Finalis KMIPN VI — e-Government (2024).','KMIPN VI e-Government Finalist (2024).')
    ]
  },
  data: {
    label: t('Data Analyst', 'Data Analyst'),
    headline: t('Data Analyst | Python, SQL & Dashboard', 'Data Analyst | Python, SQL & Dashboards'),
    summary: t('Lulusan D3 Teknik Komputer dengan portofolio analisis data berbasis Python, SQL, Excel, dan visualisasi. Berpengalaman memvalidasi kualitas data, menggabungkan beberapa tabel, mengukur performa historis, serta menyajikan hasil yang dapat ditelusuri melalui notebook dan dashboard.','Computer Engineering graduate with Python, SQL, Excel, and visualization projects. Experienced in data validation, multi-table joins, historical performance analysis, and communicating reproducible insights through notebooks and dashboards.'),
    experience: [
      entry(t('Pengembang Analitik Independen — KleinData', 'Independent Analytics Developer — KleinData'),'KleinData · Proyek mandiri','2026',[
        t('Membangun workspace analitik dengan SvelteKit dan DuckDB-Wasm yang mendukung 5 format impor dataset.','Developed a SvelteKit and DuckDB-Wasm analytics workspace supporting 5 dataset import formats.'),
        t('Mengembangkan 30 resep insight SQL untuk ringkasan, segmen, penjualan, tren, pelanggan, dan kualitas data.','Built 30 SQL insight recipes covering summaries, segments, sales, trends, customers, and data quality.'),
        t('Menerapkan pemetaan kolom otomatis, pemeriksaan data kosong/duplikat, dan ekspor hasil yang dapat diverifikasi.','Added column mapping, missing-value and duplicate checks, and traceable exports.')
      ],'https://github.com/Darren0099/DataForge'),
      entry(t('Analis Data — Proyek Portofolio', 'Data Analyst — Independent Portfolio Projects'),'GitHub · Python / Pandas / Jupyter','2026',[
        t('Melakukan pembersihan data dan penggabungan multi-tabel untuk analisis penjualan, laba kotor, dan pelanggan.','Cleaned and joined multi-table datasets to analyze sales, gross profit, and customers.'),
        t('Menetapkan definisi metrik dan batasan data, seperti perbedaan laba kotor dengan laba bersih.','Defined metrics and documented caveats such as gross profit versus net profit.'),
        t('Menyusun notebook, visualisasi, dan laporan sehingga perhitungan dapat diulangi dari dataset sumber.','Prepared notebooks, visualizations, and reports for reproducible source-to-result analysis.')
      ],'https://github.com/Darren0099/global-electronics-retailer-analysis'),
      entry(t('Koordinator Pelaporan Kinerja Anggota', 'Member Performance Reporting Coordinator'),'Youth Ranger Indonesia · Human Resources','Jun 2025 – Jan 2026',[
        t('Mengorganisasi pencatatan evaluasi anggota melalui Individual Performance Log dan Weekly Division Pulse.','Organized individual evaluation records through Individual Performance Log and Weekly Division Pulse.'),
        t('Mendukung pemetaan talenta dan laporan perkembangan anggota sebagai bagian dari 7 program HR.','Supported talent mapping and member development reports within 7 HR programs.'),
        t('Menyusun informasi terstruktur agar tim lintas regional dapat meninjau tindak lanjut pengembangan.','Structured records so cross-regional teams could review development follow-up.')
      ])
    ],
    projects: [
      entry(t('Global Electronics Retailer — Analisis Multi-tabel', 'Global Electronics Retailer — Multi-table Analysis'),'Python · Pandas · RFM','2026',[
        t('Menggabungkan transaksi dengan data produk, pelanggan, toko, dan kurs harian sebagai dasar analisis.','Joined sales, product, customer, store, and daily exchange-rate datasets.'),
        t('Menganalisis 11.887 pelanggan dengan segmentasi RFM dan performa pada 67 toko fisik/online.','Analyzed 11,887 customers with RFM segmentation and performance across 67 physical/online stores.'),
        t('Menghasilkan metrik pendapatan, biaya, laba kotor, dan margin dengan mencatat keterbatasan dataset.','Produced revenue, cost, gross-profit, and margin metrics with explicit dataset limitations.')
      ],'https://github.com/Darren0099/global-electronics-retailer-analysis'),
      entry(t('Walmart — Analisis Penjualan Mingguan', 'Walmart — Weekly Sales Analysis'),'Python · Jupyter · Google Sheets','2026',[
        t('Mengaudit 6.435 catatan penjualan mingguan dari 45 toko dan 143 minggu historis.','Audited 6,435 weekly sales records from 45 stores across 143 historical weeks.'),
        t('Membandingkan tren bulanan dan periode setara serta memeriksa data kosong, duplikat, dan tanggal.','Compared monthly trends and like-for-like periods while checking missing records, duplicates, and dates.'),
        t('Membuat notebook, grafik, dan laporan untuk menunjukkan temuan serta keterbatasan analisis.','Prepared notebooks, charts, and reports communicating findings and analytical limitations.')
      ],'https://github.com/Darren0099/Analisis-Dataset-Walmart'),
      entry(t('Annyeongbap — Analisis Penjualan Restoran', 'Annyeongbap — Restaurant Sales Analysis'),'Python · Excel · Data Validation','2026',[
        t('Mengolah 20.000 baris item pesanan dan memetakan transaksi ke kategori menu serta metode pembayaran.','Processed 20,000 line items and mapped orders to menu categories and payment methods.'),
        t('Memvalidasi 7.184 transaksi unik dan menghitung penjualan setelah diskon, bukan hanya subtotal.','Validated 7,184 unique transactions and calculated post-discount sales instead of subtotals.'),
        t('Menyajikan kontribusi kategori, Average Order Value, dan tren penjualan bulanan dalam laporan.','Reported category contributions, average order value, and monthly sales trends.')
      ],'https://github.com/Darren0099/annyeongbap-sales-analysis')
    ],
    skills: [
      skill(t('Pemrograman data','Data programming'),'Python, pandas, numpy, Jupyter Notebook'),
      skill(t('Query & basis data','Query & database'),'SQL, DuckDB, MySQL, PostgreSQL'),
      skill(t('Analisis','Analysis'),'Data Cleaning, EDA, RFM, Time Series, Data Quality'),
      skill(t('Visualisasi','Visualization'),'Excel, Google Sheets, Chart.js, matplotlib')
    ],
    certificates:['Data Analytics Essentials — Cisco Networking Academy','Bootcamp Data Analyst — KarirNex (2026)','Data Science in Marketing: Customer Segmentation — DQLab'],
    highlights:[
      t('Analisis Walmart mencakup 45 toko dan 6.435 catatan mingguan historis.','Walmart project covers 45 stores and 6,435 historical weekly records.'),
      t('KleinData memiliki 30 resep analisis SQL dan 5 format impor.','KleinData supports 30 SQL analysis recipes and 5 import formats.')
    ]
  },
  design: {
    label: t('Graphic Designer','Graphic Designer'),
    headline: t('Graphic Designer | Visual Communication & Brand Content', 'Graphic Designer | Visual Communication & Brand Content'),
    summary: t('Desainer grafis dengan pengalaman merancang materi publikasi komunitas, komunikasi acara, dan konten editorial media sosial. Terbiasa berkolaborasi lintas divisi, menjaga konsistensi identitas visual, dan menerjemahkan pesan organisasi ke dalam desain yang jelas dan mudah dipahami.','Graphic designer experienced in community publications, event communication, and social-media editorial content. Comfortable working across teams, maintaining visual consistency, and translating organizational messages into clear, usable design.'),
    experience: [
      entry(t("Graphic Designer — Youthopia Symposium", "Graphic Designer — Youthopia Symposium"), "Duta Potensi Pemuda Indonesia", "Apr 2025 – Mar 2026", [
        t("Merancang materi desain acara nasional Youthopia Symposium, meliputi aset komunikasi, materi branding, dan publikasi digital sesuai kebutuhan penyelenggara.", "Created event communications, branding assets, and digital publications for the national Youthopia Symposium."),
        t("Menerapkan konsistensi warna, tipografi, komposisi, dan hierarki informasi untuk mempermudah komunikasi panitia kepada peserta serta mitra kegiatan.", "Applied consistent color, typography, composition, and visual hierarchy for committee-to-participant and stakeholder communication."),
        t("Berkolaborasi dengan tim konten dan acara dalam penyusunan maupun penyesuaian aset visual berdasarkan brief yang diterima.", "Collaborated with content and event teams to create and revise visual deliverables from briefs."),
        t("Turut mendukung koordinasi peserta sebagai Liaison Officer sementara pada rangkaian agenda kunjungan kelembagaan.", "Also supported event participant coordination as a temporary Liaison Officer during institutional visits.")
      ]),
      entry(t("Head of Design — YRI FEST × EXPO 2024", "Head of Design — YRI FEST × EXPO 2024"), "Youth Ranger Indonesia", "Jul – Agu 2024", [
        t("Memimpin kebutuhan produksi visual untuk acara kompetisi pemuda, mulai dari perencanaan materi hingga kesiapan publikasi.", "Led event visual production needs from planning through publication readiness."),
        t("Mengembangkan konten komunikasi bagi peserta dan audiens, termasuk pengemasan informasi lomba ke dalam materi desain yang mudah dipahami.", "Developed audience-facing design materials that presented competition information clearly."),
        t("Membagi pekerjaan dan mengoordinasikan relawan kreatif serta tim lain untuk menjaga keselarasan publikasi acara.", "Delegated creative work and coordinated volunteers and partner teams to align event communications."),
        t("Menjaga konsistensi identitas visual dan ketepatan informasi pada kanal digital selama rangkaian kegiatan.", "Maintained visual identity consistency and accuracy across digital channels throughout the event.")
      ]),
      entry(t("Graphic Designer — Operasional Konten", "Graphic Designer — Operations Content"), "Kawan YRI · Youth Ranger Indonesia Pusat", "2026", [
        t("Mengembangkan konten feed Instagram untuk menyampaikan kegiatan dan pesan divisi Operation secara ringkas dan konsisten.", "Developed Instagram feed content conveying Operations Division updates clearly and consistently."),
        t("Mengolah brief menjadi judul, visual pendukung, hierarki informasi, dan ajakan bertindak yang mudah dipindai audiens.", "Translated briefs into headlines, supporting graphics, information hierarchy, and scannable calls to action."),
        t("Menerapkan prinsip tata letak dan keterbacaan untuk menyesuaikan desain terhadap kebutuhan publikasi media sosial.", "Applied layout and readability principles to adapt designs for social media publishing."),
        t("Berkolaborasi dalam proses revisi materi ketika informasi, template, atau kebutuhan komunikasi berubah.", "Collaborated on content revisions as information, templates, and communication needs changed.")
      ], "https://www.instagram.com/kawan.yri/"),
    ],
    projects: [
      entry(t("AsaKita — UI Interaktif & Aksesibilitas (KMIPN VII)", "AsaKita — Interactive UI & Accessibility (KMIPN VII)"), "Frontend UI · Next.js / TypeScript · KMIPN VII", "Feb – Sep 2025", [
        t("Merancang antarmuka pembelajaran responsif untuk dashboard 6 modul edukasi yang ditujukan bagi penggunaan desktop maupun mobile.", "Designed responsive interfaces for a 6-module learning dashboard on desktop and mobile."),
        t("Mengembangkan interaksi kuis, progres, kartu misi, lencana, dan sertifikat untuk membentuk pengalaman belajar yang bertahap.", "Developed quiz, progress, mission-card, badge, and certificate interactions for a staged learning experience."),
        t("Mengimplementasikan kontrol aksesibilitas seperti ukuran teks, kontras tinggi, font ramah disleksia, dan pengurangan animasi.", "Implemented accessibility controls including text sizing, high contrast, dyslexia-friendly fonts, and reduced motion."),
        t("Menerapkan navigasi yang jelas ke sumber bantuan eksternal; aplikasi merupakan prototipe edukasi, bukan layanan darurat atau konseling produksi.", "Designed clear paths to external support sources; the app is an educational prototype, not a production emergency or counseling service.")
      ], "https://github.com/Darren0099/KM7"),
      entry(t("YRI Sumsel — Sistem Visual Publikasi Komunitas", "YRI South Sumatra — Community Publication Visuals"), "Media Sosial / Acara / Identitas Komunitas", "2023 – 2025", [
        t("Membuat seri materi visual regional berupa poster, banner, sertifikat, konten edukasi, serta sampul proposal untuk kegiatan organisasi.", "Created regional event posters, banners, certificates, educational social posts, and proposal-cover assets."),
        t("Menyelaraskan tipografi, warna, komposisi, dan elemen identitas agar desain tetap konsisten dalam format cetak maupun digital.", "Aligned typography, colors, composition, and visual identity across print and digital formats."),
        t("Mengoordinasikan kebutuhan publikasi bersama tim konten, dokumentasi, dan kegiatan untuk menjaga kesesuaian pesan desain.", "Coordinated publication requests across content, documentation, and event teams."),
        t("Mendukung kampanye acara dan literasi melalui visual yang menekankan keterbacaan serta kemudahan distribusi media sosial.", "Supported event and literacy campaigns with readable, shareable visuals.")
      ]),
      entry(t("Kawan YRI — Konten Editorial Divisi Operation", "Kawan YRI — Operations Editorial Content"), "Instagram · Komunikasi Visual / Desain Konten", "2026", [
        t("Mengembangkan layout feed untuk memperkenalkan kegiatan dan proses kerja divisi Operation dalam bentuk konten yang lebih mudah dipahami.", "Created feed layouts explaining the Operations Division's activities in accessible formats."),
        t("Mengemas judul, informasi inti, ilustrasi, dan call-to-action menjadi susunan visual yang konsisten dengan identitas organisasi.", "Structured headlines, core information, illustrations, and calls to action in consistent branded layouts."),
        t("Menyesuaikan materi editorial terhadap kebutuhan brief, termasuk perubahan detail informasi dan struktur narasi unggahan.", "Adapted editorial design to evolving briefs, details, and post narratives."),
        t("Berkolaborasi dengan tim penyusun konten untuk memastikan pesan dapat dibaca dengan jelas di layar ponsel.", "Worked with content creators to ensure readability on mobile screens.")
      ], "https://www.instagram.com/kawan.yri/"),
    ],
    skills: [
      skill(t('Desain visual','Visual design'),'Figma, Canva, Layout, Typography'),
      skill(t('Komunikasi brand','Brand communication'),'Visual Identity, Social Media, Editorial Design'),
      skill(t('Produksi aset','Asset production'),'Event Collateral, Posters, Certificates, Proposals'),
      skill(t('Antarmuka','Interface design'),'Wireframing, UI/UX, Responsive Design, HTML, CSS')
    ],
    certificates:['Graphic Design: Brand Identity — MySkill','UI/UX Design: Design System & Wireframing — MySkill','CSS Essentials — Cisco Networking Academy'],
    highlights:[
      t('Pengalaman sebagai koordinator desain regional Youth Ranger Indonesia.','Led regional graphic design coordination at Youth Ranger Indonesia.'),
      t('Finalis IT Fest Web Design (2024).','IT Fest Web Design Finalist (2024).')
    ]
  },
  hr: {
    label: t('Human Resources','Human Resources'),
    headline: t('Human Resources | Recruitment & People Operations', 'Human Resources | Recruitment & People Operations'),
    summary: t('Berpengalaman memimpin koordinasi sumber daya manusia dan program pengembangan anggota di organisasi pemuda lintas regional. Menguasai administrasi rekrutmen, pemetaan talenta, evaluasi kinerja anggota, dan komunikasi lintas tim; didukung kemampuan membangun aplikasi pencatatan HR.','Experienced in coordinating people programs and member development across a multi-regional youth organization. Skilled in recruitment administration, talent mapping, performance documentation, and cross-team communication, supported by hands-on HR application development.'),
    experience: [
      entry(t("Ketua Human Resources — Distrik Sumatera 2", "Head of Human Resources — Sumatera 2 District"), "Youth Ranger Indonesia", "Jun 2025 – Jan 2026", [
        t("Memimpin koordinasi 7 program HR, mencakup HR Connect, Talent System, Cultural Check-In, Weekly Pulse, Individual Performance Log, Regional Development Camp, dan HR Reward.", "Led coordination of 7 HR initiatives, including HR Connect, Talent System, Cultural Check-In, Weekly Pulse, Individual Performance Log, Regional Development Camp, and HR Reward."),
        t("Mengelola alur open recruitment, penyaringan kandidat, dan komunikasi kebutuhan antar divisi dengan pimpinan distrik dan regional.", "Coordinated open recruitment, applicant screening, and cross-division needs with district and regional leadership."),
        t("Mengembangkan pencatatan evaluasi individu, pemetaan talenta, serta rencana rotasi untuk membantu tindak lanjut pengembangan anggota.", "Organized individual evaluations, talent mapping, and rotation planning to support member development decisions."),
        t("Menyusun rencana kerja terpadu selama 1 bulan bersama tim Project Management, Media, dan Public Relations; berkoordinasi pada 2 regional yang tercantum di LinkedIn.", "Planned a one-month integrated work calendar with Project Management, Media, and Public Relations across 2 regions documented on LinkedIn.")
      ]),
      entry(t("Ketua Divisi Pengembangan Diri & Desain — YRI FEST × EXPO", "Head of Self-Development & Design — YRI FEST × EXPO"), "Youth Ranger Indonesia", "Jul – Agu 2024", [
        t("Mengkoordinasikan tim desain dan pengembangan diri dalam penyelenggaraan acara kompetisi serta kegiatan pemuda YRI FEST × EXPO.", "Coordinated design and self-development teams for the YRI FEST × EXPO youth competition event."),
        t("Membagi kebutuhan materi informasi dan konten agar pesan acara tersampaikan secara konsisten kepada peserta dan audiens.", "Distributed communication deliverables to ensure consistent event information reached participants and audiences."),
        t("Bekerja sama dengan relawan dan divisi kegiatan untuk menyesuaikan materi promosi dengan kebutuhan pelaksanaan acara.", "Worked with volunteers and event divisions to align promotional materials with program requirements."),
        t("Mengawasi konsistensi materi visual serta menyatukan masukan beberapa tim sebelum konten dipublikasikan.", "Reviewed visual consistency and reconciled feedback from different teams before publication.")
      ]),
      entry(t("Koordinator Graphic Design — YRI Sumatera Selatan", "Graphic Design Coordinator — YRI South Sumatra"), "Youth Ranger Indonesia Sumatera Selatan", "Jan 2023 – Jan 2024", [
        t("Mengoordinasikan produksi konten dan dokumentasi, membagi kebutuhan desain kepada anggota, dan mengelola tenggat publikasi kegiatan.", "Coordinated content and documentation production, distributed design requests, and managed publication deadlines."),
        t("Membuat poster acara, banner, sertifikat, konten edukasi Instagram, dan sampul proposal sesuai kebutuhan internal dan eksternal.", "Designed event posters, banners, certificates, Instagram content, and proposal covers for internal and external needs."),
        t("Berkolaborasi dengan divisi publikasi serta panitia kegiatan agar visual mendukung pesan, tujuan, dan audiens acara.", "Partnered with publications teams and event organizers to align visual assets with event objectives and audiences."),
        t("Membantu menjaga identitas visual regional tetap seragam pada materi digital maupun cetak.", "Maintained consistent regional visual identity across digital and print materials.")
      ]),
    ],
    projects: [
      entry(t("YRI HRD — Dashboard Penilaian Rekrutmen", "YRI HRD — Recruitment Assessment Dashboard"), "Next.js / PostgreSQL / Drizzle ORM · Prototipe", "2026", [
        t("Menyusun antarmuka pencatatan data kandidat dan formulir penilaian wawancara yang terpusat sebagai studi kasus digitalisasi proses rekrutmen.", "Built central candidate record and interview-scoring interfaces as a recruitment-digitization case study."),
        t("Mengembangkan penilaian 5 aspek: komunikasi, kepemimpinan, komitmen, motivasi, dan kerja sama tim.", "Implemented 5 assessment dimensions: communication, leadership, commitment, motivation, and teamwork."),
        t("Membuat ringkasan pemeringkatan kandidat berdasarkan regional/divisi serta kemampuan ekspor hasil evaluasi ke Excel dan PDF.", "Created regional/division ranking summaries and Excel/PDF assessment exports."),
        t("Mengelompokkan konfigurasi kuota dan bobot pada prototipe; parameter tersebut belum dianggap sebagai kebijakan rekrutmen resmi.", "Separated quota and weighting settings in the prototype; these parameters are not asserted as official recruitment policy.")
      ], "https://github.com/Darren0099/YRIHRD"),
      entry(t("HR Connect & Talent System — Pengembangan SDM", "HR Connect & Talent System — People Development"), "Youth Ranger Indonesia · Human Resources", "Jun 2025 – Jan 2026", [
        t("Mengkoordinasikan HR Connect sebagai forum komunikasi lintas tim untuk menyelaraskan kebutuhan operasional serta tindak lanjut anggota.", "Coordinated HR Connect as a cross-team forum for operational alignment and member follow-up."),
        t("Menggunakan Talent System untuk pemetaan potensi dan kebutuhan pengembangan individu sesuai konteks organisasi.", "Used Talent System workflows to map member potential and development needs."),
        t("Mengorganisasi Weekly Division Pulse serta Individual Performance Log untuk mencatat kegiatan, evaluasi, dan informasi perkembangan.", "Organized Weekly Division Pulse and Individual Performance Log for activity recording, evaluation, and progress tracking."),
        t("Mendukung Cultural Check-In dan HR Reward sebagai bagian dari upaya menjaga komunikasi serta apresiasi terhadap anggota.", "Supported Cultural Check-In and HR Reward as part of member communication and recognition.")
      ]),
      entry(t("YRI Sumsel — Website Informasi & CMS Organisasi", "YRI South Sumatra — Organization Website & CMS"), "Next.js / React / TypeScript · Administrasi Konten", "Jan 2024 – Sep 2025", [
        t("Mengembangkan website organisasi yang memusatkan profil, program, berita, dan galeri sehingga informasi dapat diakses dari satu platform.", "Developed an organization website centralizing its profile, programs, news, and gallery in one platform."),
        t("Membuat halaman informasi publik dengan navigasi, pencarian berita, filter kategori, serta detail artikel untuk kebutuhan komunikasi organisasi.", "Built public pages with navigation, news search, category filtering, and article details for organizational communications."),
        t("Menyediakan CMS admin untuk menambah, mengedit, dan menghapus berita menggunakan GitHub API sebagai penyimpanan konten.", "Created a CMS admin workflow to add, edit, and delete news via GitHub API-backed storage."),
        t("Menghubungkan kebutuhan publikasi pengurus dengan struktur dan alur kerja digital yang dapat diperbarui tanpa mengubah halaman manual.", "Translated publication requirements into editable digital workflows rather than manually maintained pages.")
      ], "https://github.com/Darren0099/YOUTHRANGERINDONESIASUMATERASELATAN"),
    ],
    skills: [
      skill(t('Administrasi HR','HR administration'),'Recruitment, Candidate Evaluation, Performance Reporting'),
      skill(t('Pengembangan SDM','People development'),'Talent Mapping, Engagement, Member Development'),
      skill(t('Koordinasi','Coordination'),'Team Leadership, Stakeholder Communication, Planning'),
      skill(t('Tools','Tools'),'Excel, Google Sheets, Next.js, HR Dashboard')
    ],
    certificates:['Human Resource at YRI District 2 Batch II — YRI','HR Value Chain — MySkill x Deloitte','IT Customer Support Basics — Cisco Networking Academy'],
    highlights:[
      t('Mengoordinasikan 7 program HR Distrik Sumatera 2.','Coordinated 7 HR programs across Sumatera 2 District.'),
      t('Mengembangkan prototipe sistem evaluasi dengan 5 dimensi penilaian.','Built a prototype evaluation system with 5 assessment dimensions.')
    ]
  }
};

export const cvEducation = {
  institution: t('Politeknik Negeri Sriwijaya','Sriwijaya State Polytechnic'),
  degree: t('Diploma III Teknik Komputer','Diploma III in Computer Engineering'),
  period: '2023 – 2026',
  gpa: '3,66 / 4,00',
  courses: t('Pemrograman Web, Basis Data, Pemrograman Berorientasi Objek, Jaringan Komputer','Web Programming, Databases, Object-Oriented Programming, Computer Networks')
};
