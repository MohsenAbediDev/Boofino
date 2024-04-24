import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const pwaConfigs = {
	manifest: {
		name: 'Boofino',
		short_name: 'Boofino',
		background_color: '#0b0b0b',
		theme_color: '#0b0b0b',
		start_url: '/',
		scope: '/',
		display: 'standalone',
		orientation: 'portrait',
		description: 'خرید آنلاین از بوفه مدارس',
		lang: 'fa',
		icons: [
			{
				src: 'icons/icon-36x36.png',
				sizes: '36x36',
				type: 'image/png',
				purpose: 'maskable any',
			},
			{
				src: 'icons/icon-48x48.png',
				sizes: '48x48',
				type: 'image/png',
				purpose: 'maskable any',
			},
			{
				src: 'icons/icon-72x72.png',
				sizes: '72x72',
				type: 'image/png',
				purpose: 'maskable any',
			},
			{
				src: 'icons/icon-96x96.png',
				sizes: '96x96',
				type: 'image/png',
				purpose: 'maskable any',
			},
			{
				src: 'icons/icon-128x128.png',
				sizes: '128x128',
				type: 'image/png',
				purpose: 'maskable any',
			},
			{
				src: 'icons/icon-144x144.png',
				sizes: '144x144',
				type: 'image/png',
				purpose: 'maskable any',
			},
			{
				src: 'icons/icon-152x152.png',
				sizes: '152x152',
				type: 'image/png',
				purpose: 'maskable any', 
			},
			{
				src: 'icons/icon-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable any',
			},
			{
				src: 'icons/icon-384x384.png',
				sizes: '384x384',
				type: 'image/png',
				purpose: 'maskable any',
			},
			{
				src: 'icons/icon-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable any',
			},
		],
	},
}

export default defineConfig({
	plugins: [react(), VitePWA(pwaConfigs)],
})
