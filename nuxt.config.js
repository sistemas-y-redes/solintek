import pkg from './package.json'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

   /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
   ssr: false,
   /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
   //target: "server",
   
  head: {
    title: 'Proyecto 2023',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
      { rel:'apple-touch-icon', type:'image/png', href: `${process.env.MODE == 'desarrollo' ? 'http://192.168.200.125:3000/' : 'https://proyecto2023.aplicacionesinteligentes.es/'}apple-touch-icon.png` }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    './assets/fonts/poppins.css',
    '~/assets/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
  ],
  serverMiddleware: [
    '~/api/index.js'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
    '@nuxtjs/pwa',
  ],

  // https://nuxtjs.org/guide/runtime-config
  publicRuntimeConfig: {
    clientVersion: pkg.version
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  // Bootstrap Vue icons
  bootstrapVue: {
    icons: true
  },
  fontawesome: {
    component: 'fa',
    icons: {
      solid: true,
      brands: true
    }
  },
  env: {
    base_url: process.env.MODE == 'desarrollo' ? 'http://192.168.200.125:3000/' : 'https://proyecto2023.aplicacionesinteligentes.es/',
  },
  axios: {
    baseURL: process.env.MODE == 'desarrollo' ? 'http://192.168.200.125:3000/' : 'https://proyecto2023.aplicacionesinteligentes.es/',
    proxy: true
  },
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  pwa: {
    meta: {
      title: 'Proyecto 2023',
      author: 'Sistemas y Redes',
    },
    manifest: {
      name: 'Proyecto 2023',
      short_name: 'SYR',
      lang: 'es',
    },
    icon: {
      source:'/icon.png',
      fileName: 'icon.png',
    }
  },
}
/* https://stackoverflow.com/questions/59460657/cannot-show-apple-touch-icon-in-bookmarks-with-nuxt-js-app/64959404#64959404 */