// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'vuetify-nuxt-module',
    /* '@vite-pwa/nuxt' */],
  pinia: {
    storesDirs: ["./stores/*"]
  },
  vuetify: {
    moduleOptions: {
      //module specific options
    },
    vuetifyOptions: './configs/vuetify.config.ts',
  },
  css: [
    '@/styles/globals.css',
  ],

  app: {
    head: {
      title: 'Estrellitas',
      link: [
        { rel: 'icon', href: '/icon.png' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat&display=swap',
        },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Estrellitas 😎',
        },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },
  /* pwa: {
    manifest: {
      name: 'Postman to Swagger',
      short_name: 'Postman to Swagger',
      lang: 'es',
      description: 'Postman to Swagger Description',
      background_color: '#ffffff',
      theme_color: '#ff0000',
      icons: [
        {
          src: 'icon.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'icon.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'icon.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  }, */
});
