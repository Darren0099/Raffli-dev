/** Published Instagram work supplied by the portfolio owner.
 * These are selected publication URLs, not an automatically scraped account feed.
 * No thumbnails, dates, authorship captions or imagery are fabricated.
 */
export type PublishedPost = { shortcode: string; kind: 'p' | 'reel' };
export type DesignCollection = {
  id: string;
  name: string;
  handle: string;
  profileUrl: string;
  descriptionId: string;
  descriptionEn: string;
  posts: PublishedPost[];
};
const fromCodes = (codes: string): PublishedPost[] =>
  codes.trim().split(/\s+/).map((shortcode) => ({ shortcode, kind: shortcode === 'DOQAr5oibN9' ? 'reel' as const : 'p' as const }));
export const designCollections: DesignCollection[] = [
  {
    id: 'regional',
    name: 'Youth Ranger Sumsel',
    handle: '@youthranger.sumsel',
    profileUrl: 'https://www.instagram.com/youthranger.sumsel/',
    descriptionId: 'Arsip unggahan Instagram YRI Sumsel yang kamu pilih sebagai bagian dari portofolio desain.',
    descriptionEn: 'Curated published Instagram posts from Youth Ranger Sumsel, selected for the design portfolio.',
    posts: fromCodes(`Ddytbpqmn21 DU9qQ59CWFN DUenhOYk2mv DUeeuCXk1OG DUcHpeCEyl1 DUZq5MRCYCf DUXHqojCVzb DUMwFQcCa4N DUKGVOlkyUM DTmBAFPkzKk DTklYlzCals DTkTvV1CSG5 DTjWEXQkz90 DTDSRmQCRda DTAnmSUibyQ DS706QXiYpq DSezhl9iVIG DRwih5WCRjD DRkEGvLCQXB DRkCk4xCbz_ DRRyjp9iYB6 DRFH1mACdTf DRD3x2pCYLj DRD3FMuCT4l DQy97JhCc4x DQwJAO7CVAV DPx3dnViQOt DPkiResiSmN DPh8WoiifPx DPfbqGxiTO8 DPctRGREy4a DPaYpGUCSH- DPRUcwIiWHP DPDDAYjE5rd DOyV87QiQNA DOc5lhgiVkl DOc5IMiCe97 DOZ0rKPkzxX DOXfuf-iev- DOQAr5oibN9 DOBhgeICbDK DOBYRWUCQ-1 DN2p8yL0vZj DNmoJXTJUT0 DNmjEfsJBPo DNhWWu8pMhI DNb3qB8TOtp DM5gRNapjm1 DM4Axr1TdId DLRmHzBpny3 DKio0UfzIA1 DKQ_vO5pPLL DI0cGNUpRsq DHyLfx7z8_B DEtN5AUTQyP DDs5Ahrz8Lz DDnw8hcTiwF DDKHoX4vHLF DC_c6LWTxj9 DCqIMEJzUsO DCf1JWtzMJA DCNv5c8v9pZ DCL-UBLvpCi DB5A3TgzZFs DBa9LlPz4q9 DBa4zfmTa5E DBFuPBWT2hV DBFtUUCTBKs DA93mhSzRJ9 DAKc9joTdkA C_amL4gv7kH C-1SbMgysrN C-eZ2EMJDLS C7DEWSjyGKy C653WIPJYVI C7GU0mdplNi C7mAzvwpjji C7vGQ1RPtpL C7Sxi8UPb_1 C6gr7cNJUN9`)
  },
  {
    id: 'summit',
    name: 'Summit of Stars I & II',
    handle: 'YRI / Summit of Stars',
    profileUrl: 'https://www.instagram.com/youthranger.sumsel/',
    descriptionId: 'Logo dan unggahan terkait dua edisi awal Summit of Stars. Impactify (edisi ketiga) tidak diklaim sebagai karya.',
    descriptionEn: 'Logo and posts related to the first two Summit of Stars editions. The third edition, Impactify, is not claimed as work.',
    posts: fromCodes('DMom29_yTzQ DOc5IMiCe97')
  },
  {
    id: 'fest',
    name: 'YRI Fest × Expo',
    handle: '@youthranger.sumsel',
    profileUrl: 'https://www.instagram.com/youthranger.sumsel/',
    descriptionId: 'Visual acara YRI Fest × Expo yang sudah memiliki tautan publikasi.',
    descriptionEn: 'Published visual references for the YRI Fest × Expo event.',
    posts: fromCodes('C9qxES0SP80')
  },
  {
    id: 'kingdom',
    name: 'International Kingdom',
    handle: '@internationalkingdom.indonesia',
    profileUrl: 'https://www.instagram.com/internationalkingdom.indonesia/',
    descriptionId: 'Tiga desain feed pernah dikerjakan; satu tautan unggahan tersedia untuk ditampilkan saat ini.',
    descriptionEn: 'Three feed designs were created; one original publication link is currently available.',
    posts: fromCodes('DeHJDk_FKkt')
  },
  {
    id: 'youthopia',
    name: 'Youthopia Symposium',
    handle: '@youthopiasymposium',
    profileUrl: 'https://www.instagram.com/youthopiasymposium/',
    descriptionId: 'Visual event Youthopia Symposium dari tautan unggahan yang sudah didokumentasikan.',
    descriptionEn: 'Published visual work for the Youthopia Symposium event.',
    posts: fromCodes('DN-IlgoABI3')
  },
  {
    id: 'duta',
    name: 'Duta Potensi Indonesia',
    handle: '@dutapotensi.id',
    profileUrl: 'https://www.instagram.com/dutapotensi.id/',
    descriptionId: 'Referensi desain terpublikasi untuk Duta Potensi Pemuda Indonesia.',
    descriptionEn: 'Published design reference for Duta Potensi Pemuda Indonesia.',
    posts: fromCodes('DPvGQa4E2Pq')
  },
  {
    id: 'kawan',
    name: 'Kawan YRI · Operation',
    handle: '@kawan.yri',
    profileUrl: 'https://www.instagram.com/kawan.yri/',
    descriptionId: 'Karya media sosial untuk Divisi Operation di Youth Ranger Indonesia Pusat.',
    descriptionEn: 'Social media design work for Youth Ranger Indonesia central Operation division.',
    posts: fromCodes('DdLFtHrmtml')
  }
];
export const getPostUrl = (post: PublishedPost) => `https://www.instagram.com/${post.kind}/${post.shortcode}/`;
