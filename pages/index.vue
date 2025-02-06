<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white"
  >
    <header class="bg-gray-800 shadow-lg p-4 sm:p-6">
      <h1
        class="text-xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 text-center sm:text-left"
      >
        Player de Conteúdos
      </h1>
      <div class="mt-4">
        <progress-bar :progress="userProgress" />
        <p class="text-sm text-gray-400 mt-2">Progresso: {{ userProgress }}%</p>
      </div>
    </header>
    <main class="flex flex-col md:flex-row flex-1 overflow-hidden">
      <aside
        class="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-700 p-4 sm:p-6 overflow-y-auto transition-all duration-300 ease-in-out"
      >
        <content-list
          :contents="contents"
          :selected-content="selectedContent"
          @select="handleSelect"
        />
      </aside>
      <section class="w-full md:w-2/3 p-4 sm:p-6 overflow-y-auto bg-gray-900">
        <player :content="selectedContent" />
      </section>
    </main>
    <footer
      class="bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center"
    >
      <div class="flex items-center space-x-4 mb-2 sm:mb-0">
        <a
          href="https://www.linkedin.com/in/matheus-borges-guedes"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-blue-400 transition-colors"
        >
          <svg
            class="size-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>
        <a
          href="https://github.com/Borgeta-code"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-gray-400 transition-colors"
        >
          <svg
            class="size-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
      <p class="text-sm text-center sm:text-right">
        ⌨️ com ❤️ por Matheus Borges Guedes 😊
      </p>
    </footer>
  </div>
</template>

<script>
import ContentList from "~/components/ContentList.vue";
import Player from "~/components/Player.vue";
import ProgressBar from "~/components/ProgressBar.vue";

export default {
  name: "IndexPage",
  components: {
    ContentList,
    Player,
    ProgressBar,
  },
  data() {
    return {
      contents: [
        {
          id: "4372ebd1-2ee8-4501-9ed5-549df46d0eb0",
          title: "Introdução à Cultura Tech",
          description:
            "Uma imagem ilustrativa sobre a cultura de trabalho em equipe.",
          url: "http://localhost:3000/uploads/image1.jpg",
          total_likes: 0,
          type: "image",
          cover: "http://localhost:3000/uploads/image1-cover.jpg",
          company_id: "5e444e9c-66a9-4004-bde5-db5e614e5c34",
          created_at: "2025-02-03T22:41:50.798Z",
        },
        {
          id: "26a42e72-cc93-44b3-acae-01537a36322b",
          title: "Ambiente de Trabalho Moderno",
          description:
            "Uma imagem representando espaços colaborativos e inovação nas empresas de tecnologia.",
          url: "http://localhost:3000/uploads/image2.png",
          total_likes: 2,
          type: "image",
          cover: "http://localhost:3000/uploads/image2-cover.jpg",
          company_id: "5e444e9c-66a9-4004-bde5-db5e614e5c34",
          created_at: "2025-02-03T22:41:50.798Z",
        },
        {
          id: "7acff1c5-4c43-4923-a323-d22a12573041",
          title: "Guia de Boas Práticas em Desenvolvimento",
          description:
            "Um documento detalhado sobre boas práticas de programação e metodologias ágeis.",
          url: "http://localhost:3000/uploads/pdf1.pdf",
          total_likes: 4,
          type: "pdf",
          cover: "http://localhost:3000/uploads/pdf1-cover.jpg",
          company_id: "5e444e9c-66a9-4004-bde5-db5e614e5c34",
          created_at: "2025-02-03T22:41:50.798Z",
        },
        {
          id: "3a5a94aa-17da-4e9a-b493-fe7e81294631",
          title: "Manual de Arquitetura de Software",
          description:
            "Um manual técnico abordando padrões arquiteturais e boas práticas para sistemas escaláveis.",
          url: "http://localhost:3000/uploads/pdf2.pdf",
          total_likes: 6,
          type: "pdf",
          cover: "http://localhost:3000/uploads/pdf2-cover.jpg",
          company_id: "c86b4e57-23d8-48f3-9f1d-d9325e5a2ccd",
          created_at: "2025-02-03T22:41:50.798Z",
        },
        {
          id: "6969d6c7-40ea-4a3c-b635-d6546b971304",
          title: "Plataforma de Aprendizado Online",
          description:
            "Acesse este link para cursos e treinamentos voltados para tecnologia e inovação.",
          url: "https://learning.rocks",
          total_likes: 8,
          type: "link",
          cover: null,
          company_id: "5e444e9c-66a9-4004-bde5-db5e614e5c34",
          created_at: "2025-02-03T22:41:50.798Z",
        },
        {
          id: "d060ab17-c961-4de7-929f-a0d52aa3ecf4",
          title: "Inteligência artificial",
          description: null,
          url: "http://localhost:3000/uploads/video1.mp4",
          total_likes: 10,
          type: "video",
          cover: "http://localhost:3000/uploads/video1-cover.jpg",
          company_id: "5e444e9c-66a9-4004-bde5-db5e614e5c34",
          created_at: "2025-02-03T22:41:50.798Z",
        },
      ],
      selectedContent: null,
      userProgress: 70,
    };
  },
  methods: {
    handleSelect(content) {
      this.selectedContent = content;
    },
  },
  mounted() {
    if (this.contents.length > 0) {
      this.selectedContent = this.contents[0];
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");

body {
  font-family: "Inter", sans-serif;
}
</style>
