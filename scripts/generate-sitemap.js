import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://dten.deesu.org';

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/courses', priority: '0.9', changefreq: 'daily' },
  { path: '/tests', priority: '0.9', changefreq: 'daily' },
  { path: '/content', priority: '0.8', changefreq: 'daily' },
  { path: '/tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/apps', priority: '0.8', changefreq: 'weekly' },
  { path: '/python-kids', priority: '0.85', changefreq: 'weekly' },
  { path: '/html-teens', priority: '0.85', changefreq: 'weekly' },
  { path: '/pricing', priority: '0.7', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' }
];

const COURSE_IDS = [
  'course-1',
  'course-2',
  'course-3',
  'course-4',
  'course-5',
  'course-6',
  'course-7',
  'course-8',
  'course-9',
  'course-10',
  'course-11',
  'course-12',
  'course-13',
  'course-html-teens-pakistan',
  'course-python-kids-pakistan',
  'course-polyglot-20-languages',
  'course-active-passive-voice'
];

const CURRICULUM_SYSTEMS = [
  { path: '/tests?system=cambridge', priority: '0.85', changefreq: 'weekly' },
  { path: '/tests?system=cbse', priority: '0.85', changefreq: 'weekly' },
  { path: '/tests?system=us-high-school', priority: '0.85', changefreq: 'weekly' },
  { path: '/tests?tab=standalone', priority: '0.85', changefreq: 'weekly' },
  { path: '/tests?category=Islamic%20Studies', priority: '0.85', changefreq: 'weekly' }
];

const CONTENT_SECTIONS = [
  { path: '/content?tab=PDFs', priority: '0.75', changefreq: 'weekly' },
  { path: '/content?tab=Worksheets', priority: '0.75', changefreq: 'weekly' },
  { path: '/content?tab=Presentations', priority: '0.8', changefreq: 'weekly' },
  { path: '/content?tab=Guides', priority: '0.75', changefreq: 'weekly' }
];

export const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0];

  const courseRoutes = COURSE_IDS.map(id => ({
    path: `/courses/${id}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  const allRoutes = [
    ...STATIC_ROUTES, 
    ...courseRoutes,
    ...CURRICULUM_SYSTEMS,
    ...CONTENT_SECTIONS
  ];

  const xmlEntries = allRoutes.map(r => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlEntries}
</urlset>
`;

  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemapXml, 'utf-8');
  console.log(`✓ sitemap.xml generated with ${allRoutes.length} URLs at ${outputPath}`);
};

generateSitemap();
