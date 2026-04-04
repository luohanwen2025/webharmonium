import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'
import { readdirSync, writeFileSync } from 'fs'

const SITE_URL = 'https://webharmonium.site'

function generateSitemap() {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      const blogDir = resolve(__dirname, 'src/blog')
      const blogFiles = readdirSync(blogDir).filter((f) => f.endsWith('.md'))
      const slugs = blogFiles.map((f) => f.replace(/\.md$/, ''))

      const today = new Date().toISOString().split('T')[0]

      const urls = [
        { loc: '/', priority: '1.0', changefreq: 'monthly' },
        { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
        ...slugs.map((slug) => ({
          loc: `/blog/${slug}`,
          priority: '0.6',
          changefreq: 'monthly' as const,
        })),
      ]

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

      const distDir = resolve(__dirname, 'dist')
      writeFileSync(resolve(distDir, 'sitemap.xml'), xml)
      console.log(`Generated sitemap.xml with ${urls.length} URLs`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'webharmonium.png'],
      manifest: {
        name: 'Web Harmonium',
        short_name: 'Harmonium',
        description: 'Play Harmonium using your computer keyboard or connect a MIDI keyboard to play.',
        theme_color: '#1976d2',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/images/icons/webharmonium_072.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/images/icons/webharmonium_096.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/images/icons/webharmonium_128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '/images/icons/webharmonium_144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/images/icons/webharmonium_152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/images/icons/webharmonium_192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/icons/webharmonium_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,wav}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB for wav files
      },
    }),
    generateSitemap(),
  ],
})
