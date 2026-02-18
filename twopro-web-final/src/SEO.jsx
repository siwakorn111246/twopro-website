import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// Base SEO Configuration
const BASE_URL = import.meta.env?.VITE_BASE_URL ?? window.location.origin;
const DEFAULT_TITLE = 'ทูโปร ซัพพลาย แอนด์ เอ็นจิเนียริ่ง | TwoPro Supply & Engineering';
const DEFAULT_DESCRIPTION = 'ทูโปร ซัพพลาย แอนด์ เอ็นจิเนียริ่ง — ยกระดับธุรกิจด้วยโซลูชันวิศวกรรมระบบและซอฟต์แวร์อัจฉริยะ ที่ออกแบบมาเพื่อการเติบโตที่ยั่งยืน';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;

// Local Business Structured Data
const LOCAL_BUSINESS_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ทูโปร ซัพพลาย แอนด์ เอ็นจิเนียริ่ง",
    "alternateName": "TwoPro Supply & Engineering",
    "image": DEFAULT_IMAGE,
    "telephone": "02-123-4567",
    "email": "contact@twopro.com",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "99/888 อาคารทูโปรทาวเวอร์ ชั้น 15 ถนนรัชดาภิเษก",
        "addressLocality": "แขวงดินแดง เขตดินแดง",
        "addressRegion": "กรุงเทพมหานคร",
        "postalCode": "10400",
        "addressCountry": "TH"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "13.7756",
        "longitude": "100.5621"
    },
    "url": BASE_URL,
    "openingHours": ["Mo-Fr 08:30-17:30"],
    "priceRange": "$$"
};

// SEO Head Component
export const SEOHead = ({
    title,
    description,
    image = DEFAULT_IMAGE,
    noIndex = false,
    schema = LOCAL_BUSINESS_SCHEMA,
    canonical
}) => {
    const location = useLocation();
    const canonicalUrl = canonical || `${BASE_URL}${location.pathname}`;
    const fullTitle = title ? `${title} | TwoPro` : DEFAULT_TITLE;
    const fullDescription = description || DEFAULT_DESCRIPTION;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={fullDescription} />
            <link rel="canonical" href={canonicalUrl} />
            {noIndex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={fullDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="TwoPro" />
            <meta property="og:locale" content="th_TH" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={fullDescription} />
            <meta name="twitter:image" content={image} />

            {/* Additional Meta Tags */}
            <meta name="keywords" content="TwoPro, ทูโปร, วิศวกรรม, ระบบไฟฟ้า, Network, Software, CCTV, Solar, บริษัทวิศวกรรม, บริษัทซอฟต์แวร์" />
            <meta name="author" content="TwoPro" />
            <meta name="theme-color" content="#059669" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

// Page-specific SEO configurations
export const SEO_CONFIG = {
    landing: {
        title: 'หน้าแรก',
        description: DEFAULT_DESCRIPTION,
        schema: LOCAL_BUSINESS_SCHEMA
    },
    'project-detail': {
        title: 'รายละเอียดโปรเจค',
        description: 'ดูรายละเอียดโปรเจคและผลงานของ TwoPro Supply & Engineering'
    },
    'all-projects': {
        title: 'โปรเจคทั้งหมด',
        description: 'ดูโปรเจคทั้งหมดของ TwoPro Supply & Engineering ในด้านวิศวกรรมและซอฟต์แวร์'
    },
    'all-partners': {
        title: 'คู่ค้าทั้งหมด',
        description: 'ดูคู่ค้าและพันธมิตรของ TwoPro Supply & Engineering'
    },
    admin: {
        title: 'ระบบจัดการ',
        description: 'ระบบจัดการเว็บไซต์ TwoPro Supply & Engineering',
        noIndex: true
    },
    login: {
        title: 'เข้าสู่ระบบ',
        description: 'เข้าสู่ระบบจัดการเว็บไซต์ TwoPro Supply & Engineering',
        noIndex: true
    }
};

export default SEOHead;