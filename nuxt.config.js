export default {
  // Desabilita server-side rendering (SSR)
  ssr: false,

  // Define o target como estático (Static Site Generation - SSG)
  target: 'static',

  // Configurações globais de metadados e HTML
  head: {
    title: 'interactive-player',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Player interativo de conteúdos diversos' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Arquivos CSS globais
  css: [
    '~/assets/css/tailwind.css'
  ],

  // Plugins a serem carregados antes da renderização da página
  plugins: [],

  // Importação automática de componentes
  components: true,

  // Módulos de build e desenvolvimento
  buildModules: [
    '@nuxtjs/composition-api/module'
  ],

  // Módulos do Nuxt.js
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss'
  ],

  // Configuração do Apollo GraphQL
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:3000/graphql',
        httpLinkOptions: {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMThjMzdjZTItY2QzNC00MzA1LTljYTQtYzE1ZmM3MzZiZWFjIn0.pqWRiyQuvWRVQgIzKvQ85RrBwSF5KxeGZrkFvKt2CG8',
          },
        },
      },
    },
  },

  // Configuração do Tailwind CSS
  tailwindcss: {
    viewer: false
  },

  // Configuração do processo de build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  }
}
