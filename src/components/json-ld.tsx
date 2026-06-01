/**
 * JSON-LD Structured Data component
 * Drop <JsonLd data={schema} /> into any page's JSX to inject schema.org markup.
 * Next.js App Router renders this as a <script type="application/ld+json"> tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}

/* ─── Reusable schema builders ─────────────────────────────────────── */

const SITE_URL = "https://www.thescene.co.in";
const SITE_NAME = "The Scene Co.";
const LOGO_URL = `${SITE_URL}/brand-logo.png`;

/** Organisation + WebSite + LocalBusiness — used on the homepage */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: LOGO_URL,
        width: 1024,
        height: 1024,
        caption: SITE_NAME,
      },
      sameAs: [
        "https://www.instagram.com/thescene.co.in/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-98457-14699",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Kannada", "Hindi"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "Custom websites, e-commerce stores, and POS systems — built from scratch with full-stack expertise. 1 year free hosting included.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: LOGO_URL,
      image: LOGO_URL,
      description:
        "Premium web development agency in Bangalore, India. We build custom websites, e-commerce stores, and POS systems — full-stack, with built-in CMS and 1 year free hosting.",
      priceRange: "₹₹₹",
      telephone: "+91-98457-14699",
      email: "hello@thescene.co.in",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        postalCode: "560001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.9716,
        longitude: 77.5946,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Bangalore" },
        { "@type": "City", name: "Mumbai" },
        { "@type": "City", name: "Delhi" },
        { "@type": "City", name: "Hyderabad" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Website Development",
              description: "Fully custom Next.js websites built from scratch — no templates, no page builders.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "E-Commerce Store Development",
              description: "Full e-commerce stores with Razorpay, Stripe, and UPI integration.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "POS System Development",
              description: "Web-based POS systems for restaurants, cafes, and retail businesses.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "SaaS Dashboard Development",
              description: "Custom SaaS products and web application dashboards.",
            },
          },
        ],
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#professionalservice`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: LOGO_URL,
      image: LOGO_URL,
      description:
        "Leading professional web development company in Bangalore, India. High-quality custom web design, e-commerce, and software development services.",
      priceRange: "₹₹₹",
      telephone: "+91-98457-14699",
      email: "hello@thescene.co.in",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        postalCode: "560001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.9716,
        longitude: 77.5946,
      },
    },
    {
      "@type": "Corporation",
      "@id": `${SITE_URL}/#corporation`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: LOGO_URL,
      description:
        "The Scene Co. is a leading custom software and web development company based in Bangalore, India, delivering premium digital experiences.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
  ],
};

/** WebPage schema — used on all inner pages */
export function webPageSchema({
  name,
  description,
  url,
  breadcrumbs,
}: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}) {
  const fullUrl = `${SITE_URL}${url}`;
  const crumbs = [{ name: "Home", url: SITE_URL }, ...(breadcrumbs ?? [])];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${fullUrl}/#webpage`,
        url: fullUrl,
        name,
        description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "en-IN",
        breadcrumb: { "@id": `${fullUrl}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${fullUrl}/#breadcrumb`,
        itemListElement: crumbs.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      },
    ],
  };
}

/** FAQPage schema */
export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** Service schema */
export function serviceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
    serviceType: "Web Development",
  };
}

/** BlogPost / BlogPosting Schema */
export function blogPostSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  const fullUrl = `${SITE_URL}${url}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    "headline": title,
    "description": description,
    "image": imageUrl || LOGO_URL,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Organization",
      "name": authorName || SITE_NAME,
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": LOGO_URL,
      },
    },
  };
}

