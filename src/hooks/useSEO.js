import { useEffect } from 'react';

/**
 * Custom hook to dynamically manage SEO tags (title, meta description, keywords, Open Graph, Twitter)
 */
export const useSEO = ({
  title,
  description,
  keywords,
  ogType = 'website',
  ogImage = '/logo.png',
  canonicalUrl
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

    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`;
      setMetaTag('meta[property="og:image"]', 'property', 'og:image', fullImageUrl);
      setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', fullImageUrl);
    }

    // 5. Canonical URL
    const url = canonicalUrl || window.location.href;
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', url);

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', url);

  }, [title, description, keywords, ogType, ogImage, canonicalUrl]);
};
