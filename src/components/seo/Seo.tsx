import { Helmet } from "react-helmet-async";
import { siteConfig } from "../../config/site";

interface SeoProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
}

export function Seo({
  title,
  description,
  url = siteConfig.url,
  image = `${siteConfig.url}${siteConfig.ogImage}`,
  type = "website",
}: SeoProps) {
  const fullTitle = `${title} | ${siteConfig.name}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / WhatsApp / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteConfig.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
}
