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
    id: 1,
    slug: "yri-sumsel",
    title: "Youthfull Profile Organization Website for Youth Ranger Indonesia Sumsel",
    client: "Youth Ranger Indonesia Sumsel",
    category: "Youth Organization",
    image: "/img/ca3.png",
    link: "https://youthrangerindonesiasumateraselatan.vercel.app/",
    tools: ["React JS", "Responsive UI", "Tailwind CSS", "e-Government"],
    buildTime: "YRI SUMSEL",
    isExternalLink: true,
    services: {
      pills: ["Design", "Development", "Branding"],
      list: ["UI/UX Design", "React Frontend", "Responsive Layout", "Community Portal"]
    },
    heroImage: "/img/ya (1).png",
    summaryQuote: "Empowering South Sumatra youth through an engaging digital presence and unified platform.",
    descriptionParagraphs: [
      "In today's fast-moving youth community landscape, having an accessible and inspiring platform is crucial. Youth Ranger Indonesia Sumsel needed a home that reflects their energetic identity.",
      "We created a vibrant, modern profile website that streamlines event announcements, volunteer registrations, and showcases ongoing social programs effectively."
    ],
    galleryImages: ["/img/yaa (1).png", "/img/yaa (5).png"],
    section1Title: "Showcasing youth empowerment in an engaging way",
    section1Text1: "The website incorporates lively UI elements, intuitive navigation, and optimized media assets to keep young visitors engaged.",
    section1Text2: "Every section was crafted to highlight community impact, event schedules, and active volunteer achievements.",
    largeBannerImage: "/img/ya (2).png",
    section2Title: "Collaboration fueled by community spirit",
    section2Text1: "We worked closely with regional leads to translate organizational needs into a seamless digital journey.",
    section2Text2: "The platform reduces administrative overhead and makes joining initiatives easier than ever.",
    gridThumbnails: ["/img/yaa (1).png", "/img/yaa (2).png", "/img/yaa (3).png", "/img/yaa(4).png"],
    bottomGalleryImages: ["/img/yaa (1).png", "/img/yaa (2).png", "/img/yaa (4).png", "/img/yaa (3).png"],
    outcomeTitle: "The Outcome",
    outcomeText: "A high-performance web platform that increased volunteer sign-ups and project visibility across South Sumatra.",
    outcomeStats: [
      { label: "Community Engagement", value: "+150%" },
      { label: "Page Load Time", value: "< 1.2s" }
    ],
    outcomeGallery: ["/img/ca3.png", "/img/ca1.png"]
  },
  {
    id: 2,
    slug: "asakita-protection",
    title: "Next-gen e-Government platform for digital child & women protection",
    client: "AsaKita Protection",
    category: "e-Government",
    image: "/img/ca2.png",
    link: "https://km-7.vercel.app/",
    tools: ["React JS", "Responsive UI", "Tailwind CSS", "e-Government"],
    buildTime: "KMIPN VII",
    isExternalLink: true,
    services: {
      pills: ["Design", "Build", "Security"],
      list: ["Encrypted Reporting Forms", "Emergency Assistance UI", "Legal Guides Portal"]
    },
    heroImage: "/img/ca2.png",
    summaryQuote: "A safe, accessible digital space providing legal education and rapid incident reporting.",
    descriptionParagraphs: [
      "AsaKita was developed to tackle public welfare challenges by providing accessible legal counseling and emergency assistance.",
      "Designed specifically for KMIPN VII, the system ensures victim privacy, rapid reporting mechanisms, and public educational resources."
    ],
    galleryImages: ["/img/ca2.png", "/img/ca3.png"],
    section1Title: "Accessible reporting with privacy first",
    section1Text1: "Building user trust was paramount. The UI provides quick-exit safety options and encrypted reporting forms.",
    section1Text2: "Clear visual hierarchies allow users in distress to find immediate contact numbers and emergency help.",
    largeBannerImage: "/img/ca2.png",
    section2Title: "Empowering communities through education",
    section2Text1: "Beyond incident reporting, AsaKita offers structured legal guides and victim support channels.",
    section2Text2: "Interactive modules guide users through legal procedures in plain, empathetic language.",
    gridThumbnails: ["/img/ca2.png", "/img/ca4.png", "/img/ca5.png", "/img/ca1.png"],
    bottomGalleryImages: ["/img/ca2.png", "/img/ca3.png", "/img/ca4.png", "/img/ca5.png"],
    outcomeTitle: "The Outcome",
    outcomeText: "Recognized at national polytechnic competitions for its real-world social impact and robust architecture.",
    outcomeStats: [
      { label: "Incident Response UI", value: "3 Clicks" },
      { label: "Accessibility Score", value: "98/100" }
    ],
    outcomeGallery: ["/img/ca2.png", "/img/ca3.png"]
  },
 {
  id: 3,
  slug: "global-retailer-analytics",
  title: "Segmentasi RFM & wawasan profitabilitas dari 11 ribu+ pelanggan",
  client: "Global Retailer Analytics",
  category: "Data Analytics",
  image: "/img/ca5.png",
  link: "https://github.com/Darren0099/global-electronics-retailer-analysis",
  tools: ["Python", "Pandas", "Matplotlib", "RFM Analysis"],
  buildTime: "Repository",
  isExternalLink: true,
  services: {
    pills: ["Analisis", "Otomatisasi", "Visualisasi"],
    list: ["Pipeline Konversi Multi-Mata Uang", "Segmentasi Pelanggan RFM", "Analisis Profitabilitas & Toko"]
  },
  heroImage: "/img/ga (3).png",
  summaryQuote: "Mengubah 62.000+ transaksi mentah menjadi wawasan pelanggan dan laba yang jelas.",
  descriptionParagraphs: [
    "Sebuah retailer elektronik global menjual dalam lima mata uang di 66 toko fisik dan satu toko online, tetapi data pesanan mentahnya menyulitkan untuk melihat pelanggan dan lini produk mana yang benar-benar menghasilkan laba.",
    "Proyek Python end-to-end ini menggabungkan lima tabel (penjualan, produk, pelanggan, toko, dan kurs harian), menyeragamkan setiap pesanan ke USD, lalu menganalisis profit margin, segmen pelanggan RFM, dan efisiensi toko, semuanya dapat dijalankan dengan satu perintah."
  ],
  galleryImages: ["/img/ga (4).png", "/img/ga (1).png"],
  section1Title: "Segmentasi pelanggan berbasis data",
  section1Text1: "Skor RFM membagi 11.887 pelanggan ke dalam enam segmen. Champions dan Loyal Customers hanya 27% dari pembeli, tetapi menyumbang 47,8% revenue, sedangkan segmen Need Attention rata-rata bernilai $7.209 per pelanggan dan sudah sekitar 795 hari tidak membeli.",
  section1Text2: "Laba kotor $32,7 juta (margin 58,6%) dievaluasi per kategori, brand, mata uang, dan toko. Computers memimpin dengan revenue $19,3 juta, sementara Cell phones terjual dalam volume besar tetapi bermargin di bawah rata-rata (56,6%).",
  largeBannerImage: "/img/ga (2).png",
  section2Title: "Visualisasi yang bercerita",
  section2Text1: "Grafik menampilkan revenue dan laba per tahun, margin per kategori, dan kontribusi revenue tiap segmen pelanggan. Penjualan memuncak di $18,3 juta pada 2019, dan toko online sendiri menyumbang 20,5% revenue.",
  section2Text2: "Pipeline yang modular dan dapat direproduksi (data loader, currency converter, modul metrik) membangun ulang seluruh laporan dan grafik dari file CSV mentah, sekaligus memperbaiki dua kesalahan hitung pada versi pertama: arah kurs dan skor frekuensi.",
  gridThumbnails: ["/img/ca5.png", "/img/ca2.png", "/img/ca3.png", "/img/ca1.png"],
  bottomGalleryImages: ["/img/ga (1).png", "/img/ga (2).png", "/img/ga (3).png", "/img/ga (4).png"],
  outcomeTitle: "Hasil Akhir",
  outcomeText: "Berhasil mengidentifikasi pelanggan yang menopang bisnis dan pelanggan bernilai tinggi yang berisiko berhenti membeli, disertai langkah yang jelas: pertahankan Champions, aktifkan kembali pembeli Need Attention, dan tinjau harga pada kategori bermargin rendah.",
  outcomeStats: [
    { label: "Transaksi Dianalisis", value: "62.884" },
    { label: "Pelanggan Tersegmentasi", value: "11.887" },
    { label: "Segmen RFM", value: "6 Tingkat" },
    { label: "Profit Margin", value: "58,6%" }
  ],
  outcomeGallery: ["/img/ca5.png", "/img/ca4.png"]
},
  {
    id: 4,
    slug: "pln-iconnet-portal",
    title: "Custom dynamic CMS portal powering state-owned enterprise news",
    client: "PLN Iconnet Portal",
    category: "Fullstack CMS",
    image: "/img/ca4.png",
    link: "https://plniconnetbangkabelitung.ct.ws/",
    tools: ["PHP", "MySQL", "CMS Dashboard"],
    buildTime: "Production",
    isExternalLink: true,
    services: {
      pills: ["Fullstack", "CMS", "Database"],
      list: ["Custom PHP Backend", "MySQL Database Design", "Admin Dashboard", "Article Publisher"]
    },
    heroImage: "/img/ca4.png",
    summaryQuote: "A streamlined news publishing portal built for speed, security, and administrative ease.",
    descriptionParagraphs: [
      "PLN Iconnet Bangka Belitung required a dedicated news management portal to broadcast regional corporate announcements.",
      "The custom PHP/MySQL backend allows non-technical administrators to draft, edit, categorize, and publish articles seamlessly."
    ],
    galleryImages: ["/img/ca4.png", "/img/ca5.png"],
    section1Title: "Intuitive editorial control",
    section1Text1: "The admin dashboard features role-based access control, rich text editing, and image upload management.",
    section1Text2: "Frontend readers enjoy lightweight, fast-loading article views optimized for mobile browsing.",
    largeBannerImage: "/img/ca4.png",
    section2Title: "Enterprise reliability",
    section2Text1: "Configured with secure database queries and responsive layout templates tailored for corporate branding.",
    section2Text2: "Reduces news publishing turnaround time from hours to minutes.",
    gridThumbnails: ["/img/ca4.png", "/img/ca3.png", "/img/ca2.png", "/img/ca1.png"],
    bottomGalleryImages: ["/img/ca4.png", "/img/ca5.png", "/img/ca3.png", "/img/ca2.png"],
    outcomeTitle: "The Outcome",
    outcomeText: "Successfully deployed in production, servicing internal communications and public PR updates.",
    outcomeStats: [
      { label: "Publishing Speed", value: "< 2 Mins" },
      { label: "Uptime", value: "99.9%" }
    ],
    outcomeGallery: ["/img/ca4.png", "/img/ca3.png"]
  },
  {
    id: 5,
    slug: "youth-visual-identity",
    title: "Cohesive visual identity & digital branding for national youth organization",
    client: "Youth Ranger Indonesia Sumsel",
    category: "Organization Profile Branding",
    image: "/img/ca1.png",
    link: "https://www.instagram.com/youthranger.sumsel",
    tools: ["Canva", "Brand Identity", "Social Media Feed"],
    buildTime: "Branding",
    isExternalLink: true,
    services: {
      pills: ["Branding", "Social Media", "Design"],
      list: ["Brand Identity Systems", "Social Media Templates", "Poster Layouts"]
    },
    heroImage: "/img/ca1.png",
    summaryQuote: "Defining bold, memorable visual guidelines across digital channels.",
    descriptionParagraphs: [
      "Consistent branding builds instant recognition. This project established typography, color schemes, and social media templates.",
      "Designed for high visual impact across Instagram feeds, event posters, and promotional merchandise."
    ],
    galleryImages: ["/img/ca1.png", "/img/ca3.png"],
    section1Title: "Consistent brand aesthetics",
    section1Text1: "Unified color palettes and typography rules were applied across all digital marketing collaterals.",
    section1Text2: "Custom templates allowed volunteer design teams to maintain quality and brand coherence.",
    largeBannerImage: "/img/ca1.png",
    section2Title: "Social media reach",
    section2Text1: "Designed social carousels and story layouts that maximize reader retention and interaction.",
    section2Text2: "Elevated organizational professionalism during major regional campaigns.",
    gridThumbnails: ["/img/ca1.png", "/img/ca3.png", "/img/ca2.png", "/img/ca5.png"],
    bottomGalleryImages: ["/img/ca1.png", "/img/ca3.png", "/img/ca2.png", "/img/ca5.png"],
    outcomeTitle: "The Outcome",
    outcomeText: "Established a unified visual identity recognized by thousands of followers across South Sumatra.",
    outcomeStats: [
      { label: "Templates Created", value: "30+" },
      { label: "Social Impressions", value: "10K+" }
    ],
    outcomeGallery: ["/img/ca1.png", "/img/ca3.png"]
  },{
  id: 6,
  slug: "tokopedia-sentiment-analysis",
  title: "Analisis sentimen & performa kategori dari 6 juta+ item terjual di Tokopedia",
  client: "Tokopedia Marketplace Analytics",
  category: "Data Analytics",
  image: "/img/ca (5).png",
  link: "https://github.com/Darren0099/tokopedia-sentiment-analysis",
  tools: ["Python", "Pandas", "Seaborn", "Exploratory Data Analysis"],
  buildTime: "Repository",
  isExternalLink: true,
  services: {
    pills: ["Analisis", "Pembersihan Data", "Visualisasi"],
    list: ["Pipeline Pembersihan Data", "Klasifikasi Sentimen Berbasis Rating", "Analisis Performa Kategori"]
  },
  heroImage: "/img/ta (2).png",
  summaryQuote: "Membaca jutaan transaksi marketplace untuk melihat kategori mana yang laris dan mana yang berisiko.",
  descriptionParagraphs: [
    "Manajemen dan penjual di marketplace perlu tahu kategori produk mana yang mendominasi transaksi, dan seberapa besar ulasan negatif mengancam penjualan.",
    "Proyek ini menganalisis 3.664 produk dari 158 toko di lima kategori (Elektronik, Fashion, Handphone, Olahraga, Pertukangan) dengan Python, Pandas, dan Seaborn: membersihkan data, mengklasifikasikan sentimen berdasarkan rating, lalu membandingkan performa tiap kategori."
  ],
  galleryImages: ["/img/ta (4).png", "/img/ta (3).png"],
  section1Title: "Performa penjualan per kategori",
  section1Text1: "Dari total 6.173.830 item terjual dengan rata-rata rating 4,64 dari 5, kategori Olahraga paling laris dengan 1.719.090 item pada produk ber-rating tinggi, disusul Elektronik (1.506.329) dan Fashion (1.359.710).",
  section1Text2: "Produk dengan rating 4 ke atas menyumbang 93,6% dari seluruh item terjual, sehingga kepuasan pelanggan terlihat kuat di hampir semua kategori.",
  largeBannerImage: "/img/ta (2).png",
  section2Title: "Sentimen dan area risiko",
  section2Text1: "Sentimen diklasifikasikan dari rating: Positive (4 ke atas), Neutral (3), dan Negative (2 ke bawah). Kategori Handphone memiliki item ber-sentimen negatif terbanyak, yaitu 47.457 item dengan rata-rata rating 1,38, atau sekitar 5,2% dari penjualan kategorinya.",
  section2Text2: "Angka itu jauh di atas kategori lain (sekitar 0,9% sampai 1,6%) dan mengindikasikan isu kualitas produk atau layanan pascabeli yang perlu ditinjau.",
  gridThumbnails: [
    "/img/ta (1).png",
    "/img/tokopedia-sentiment-distribution.png",
    "/img/tokopedia-rating-vs-sold.png",
    "/img/tokopedia-sales-by-category.png"
  ],
  bottomGalleryImages: [
    "/img/ta (1).png",
    "/img/ta (2).png",
    "/img/ta (3).png",
    "/img/ta (4).png"
  ],
  outcomeTitle: "Hasil Akhir",
  outcomeText: "Menghasilkan rekomendasi bisnis yang jelas: alokasikan anggaran promosi dan stok lebih besar ke Olahraga, Elektronik, dan Fashion, serta lakukan evaluasi quality control khusus pada seller dan produk Handphone.",
  outcomeStats: [
    { label: "Item Terjual Dianalisis", value: "6,17 Juta" },
    { label: "Produk dari 158 Toko", value: "3.664" },
    { label: "Kategori", value: "5" },
    { label: "Rata-rata Rating", value: "4,64" }
  ],
  outcomeGallery: ["/img/tokopedia-sales-by-category.png", "/img/tokopedia-sentiment-distribution.png"]
}
];