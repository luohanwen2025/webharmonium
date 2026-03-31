import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

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
  ],
})
