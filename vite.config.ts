import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, type ManifestOptions } from "vite-plugin-pwa"
 import tailwindcss from '@tailwindcss/vite'
import path from "node:path";


const manifest : Partial<ManifestOptions>  = {"theme_color":"#e06152","background_color":"#efe7e1","icons":[{"purpose":"maskable","sizes":"512x512","src":"icon512_maskable.png","type":"image/png"},{"purpose":"any","sizes":"512x512","src":"icon512_rounded.png","type":"image/png"}],"orientation":"portrait","display":"standalone","lang":"en-US","name":"Икетель","short_name":"Икетель"}


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType : "autoUpdate",
    workbox : {
      globPatterns: ["**/*.{html,css,js,ico,png,jpg,svg}"]
    },
    manifest : manifest
  })],

  resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},

	server: {
    host: "0.0.0.0", 
    port: 3100
  }


  // server: {
	// 	host: "0.0.0.0", 
	// 	port: 3100, 
	// 	allowedHosts: ["iketel.ru", "iketel.game.ru"],
	// 	proxy: {
	// 		"/api": {
	// 			target: "https://iketel.ru",
	// 			changeOrigin: true,
	// 			rewrite: (path) => path.replace(/^\/api/, ""),
	// 		},
	// 		"/sio": {
	// 			target: "https://iketel.ru",
	// 			changeOrigin: true,
	// 			ws: true,
	// 		},
	// 	},
	// },
})
