<template>
  <div class="player-container bg-gray-800 rounded-lg shadow-xl p-6">
    <div v-if="loading" class="text-center">
      <svg
        class="animate-spin h-10 w-10 text-blue-500 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p class="text-xl">Ocorreu um erro ao carregar o conteúdo.</p>
      <p class="mt-2 text-sm text-zinc-400">{{ error.message }}</p>
    </div>
    <div v-else-if="contentDetail" class="space-y-6">
      <h2 class="text-xl md:text-3xl font-bold text-white">
        {{ contentDetail.title }}
      </h2>
      <div
        class="content-player bg-gray-900 rounded-lg overflow-hidden shadow-inner"
      >
        <template v-if="contentType === 'video'">
          <video controls class="w-full max-h-96">
            <source :src="contentDetail.url" type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </template>
        <template v-else-if="contentType === 'image'">
          <img
            :src="contentDetail.url"
            alt="Conteúdo de imagem"
            class="w-full object-contain max-h-96"
          />
        </template>
        <template v-else-if="contentType === 'pdf'">
          <iframe
            :src="contentDetail.url"
            class="w-full h-screen"
            frameborder="0"
          ></iframe>
        </template>
        <template v-else-if="contentType === 'link'">
          <a
            :href="contentDetail.url"
            target="_blank"
            class="block text-center py-4 px-6 bg-gradient-to-r from-blue-400 to-purple-600 hover:animate-pulse rounded-lg text-white font-semibold"
          >
            Acessar link externo
          </a>
        </template>
        <template v-else-if="contentType === 'text'">
          <div
            class="bg-gray-900 text-white p-6 rounded-lg max-h-96 overflow-y-auto"
          >
            <p class="whitespace-pre-wrap">{{ contentDetail.text_content }}</p>
          </div>
        </template>
        <template v-else>
          <p class="text-center py-4 text-gray-400">
            Tipo de conteúdo não suportado.
          </p>
        </template>
      </div>
      <p class="mt-4 text-gray-300">{{ contentDetail.description }}</p>
    </div>
    <div v-else>
      <p class="text-center text-gray-400">
        Selecione um conteúdo para visualizar.
      </p>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Player",
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      contentDetail: null,
      loading: false,
      error: null,
    };
  },
  computed: {
    contentType() {
      if (this.contentDetail && this.contentDetail.type) {
        return this.contentDetail.type;
      } else if (this.content && this.content.type) {
        return this.content.type;
      }
      return null;
    },
  },
  watch: {
    content: {
      immediate: true,
      handler(newContent) {
        if (newContent && newContent.id) {
          this.fetchContentDetail(newContent.id);
        } else {
          this.contentDetail = null;
        }
      },
    },
  },
  methods: {
    async fetchContentDetail(contentId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$apollo.query({
          query: gql`
            query GetContentDetail($content_id: String!) {
              provision(content_id: $content_id) {
                id
                title
                description
                url
                text_content
                created_at
                allow_download
                is_embeddable
                format
                type
                bytes
                metadata
              }
            }
          `,
          variables: {
            content_id: contentId,
          },
        });

        this.contentDetail = response.data.provision;
      } catch (err) {
        console.error(err);
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
