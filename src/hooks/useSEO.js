import { useEffect } from 'react';

const BASE_ORIGIN = 'https://dten.deesu.org';

/**
 * Custom hook to dynamically manage SEO tags (title, meta description, keywords, Open Graph, Twitter, Canonical, Schema)
 */
export const useSEO = ({
  title,
  description,
  keywords,
  ogType = 'website',
  ogImage = '/logo.png',
  canonicalUrl,
  schema = null
}) => {
  useEffect(() => {
    // 1. Update Document Title
    if (title) {
      document.title = title.includes('D.TEN Academy') ? title : `${title} | D.TEN Academy`;
    }

    // Helper to update or create meta tag
    const setMetaTag = (selector, attributeName, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Meta Description
    if (description) {
      setMetaTag('meta[name="description"]', 'name', 'description', description);
      setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
      setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    }

    // 3. Meta Keywords
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // 4. Open Graph Tags
    if (title) {
      setMetaTag('meta[property="og:title"]', 'property', 'og:title', document.title);
      setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', document.title);
    }
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'D.TEN Academy');

    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_ORIGIN}${ogImage}`;
      setMetaTag('meta[property="og:image"]', 'property', 'og:image', fullImageUrl);
      setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', fullImageUrl);
    }

    // 5. Canonical URL
    const pathname = window.location.pathname;
    const url = canonicalUrl || `${BASE_ORIGIN}${pathname === '/' ? '' : pathname}`;
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', url);
    setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', url);

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', url);

    // 6. Dynamic JSON-LD Structured Data Schema
    let schemaEl = document.getElementById('dynamic-seo-schema');
    if (schema) {
      if (!schemaEl) {
        schemaEl = document.createElement('script');
        schemaEl.id = 'dynamic-seo-schema';
        schemaEl.type = 'application/ld+json';
        document.head.appendChild(schemaEl);
      }
      schemaEl.textContent = JSON.stringify(schema);
    } else if (schemaEl) {
      schemaEl.remove();
    }

    return () => {
      // Clean up dynamic schema when leaving the page
      const currentSchemaEl = document.getElementById('dynamic-seo-schema');
      if (currentSchemaEl) {
        currentSchemaEl.remove();
      }
    };
  }, [title, description, keywords, ogType, ogImage, canonicalUrl, schema]);
};
