# Player de Conteúdo

Player de Conteúdo é um desafio da Learning Rocks. O projeto foi construído com **Nuxt 2** e **Vue 2**, utilizando diversas tecnologias para criar um player funcional e dinâmico.

## 🎯 Decisões Técnicas e Abordagem

Apesar de ser um código relativamente simples, busquei seguir as melhores práticas atuais durante o desenvolvimento. Tenho menos experiência com Vue, mas aproveitei o projeto como uma oportunidade de aprendizado e consegui evoluir bastante no uso da tecnologia.

Inicialmente, encontrei alguns desafios ao integrar o GraphQL com Apollo. O servidor apresentava erros genéricos com status 400, dificultando a depuração. O problema estava relacionado a restrições de CORS no backend. A solução foi adicionar configurações adequadas de CORS no servidor e habilitar logs mais detalhados para identificar e resolver os erros mais rapidamente.

Támbem ao escrever os testes para o componente Player, tive dificuldades porque o watcher da prop content disparava automaticamente o método fetchContentDetail (devido ao immediate: true), sobrescrevendo os valores definidos manualmente nos testes e impedindo a renderização dos elementos esperados. A solução foi sobrescrever fetchContentDetail com um jest.fn() nos testes que não precisavam da chamada real, garantindo que os estados simulados permanecessem intactos.

## 🚀 Começando

Estas instruções permitirão que você obtenha uma cópia do projeto em execução em sua máquina local para desenvolvimento e testes.

### 📋 Pré-requisitos

Antes de rodar o projeto, verifique se possui os seguintes itens instalados:

- [Node.js](https://nodejs.org/) (versão recomendada: 14 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## 🔗 Integração com o Backend

Antes de iniciar o projeto, é necessário configurar a integração com o backend:

1. Clone o repositório do backend:
   ```sh
   git clone https://github.com/skore-io/challenge.git
   ```
2. Siga as instruções do repositório para configurar e rodar o backend na sua máquina.

## 🔧 Instalação

Para instalar o projeto, siga os passos abaixo:

1. Clone o repositório do Player de Conteúdo:
   ```sh
   git clone https://github.com/Borgeta-code/Learning-Rocks-Challenge-Frontend.git
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd Learning-Rocks-Challenge-Frontend
   ```
3. Instale as dependências:
   ```sh
   npm install
   # ou
   yarn install
   ```

## 🚀 Executando o projeto

Você pode rodar o projeto em três modos: **desenvolvimento**, **testes** ou **produção**.

### 🔨 Modo de Desenvolvimento

Para rodar o projeto em modo de desenvolvimento, execute:

```sh
npm run dev
# ou
yarn dev
```

O projeto será executado em `http://localhost:3000`.

### 🧪 Rodando Testes

Foram criados testes utilizando o **Jest** para garantir a qualidade do código. Para executar os testes, utilize o seguinte comando:

```sh
npm run test
# ou
yarn test
```

Os testes cobrem as funcionalidades principais do projeto e auxiliam na prevenção de regressões durante o desenvolvimento.

### 🚀 Modo de Produção

Para gerar uma versão otimizada e executar o projeto em produção, siga os passos:

1. Construa a aplicação:
   ```sh
   npm run build
   # ou
   yarn build
   ```
2. Inicie o servidor:
   ```sh
   npm run start
   # ou
   yarn start
   ```

A aplicação estará rodando em `http://localhost:3000`.

## 🛠️ Construído com

- [Nuxt.js 2](https://nuxtjs.org/)
- [Vue.js 2](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Jest](https://jestjs.io/) (para testes automatizados)

## ✒️ Autores

- **Matheus Borges** - [LinkedIn](https://www.linkedin.com/in/matheus-borges-4a7469239/)

⌨️ com ❤️ por [BorgesCode](https://github.com/Borgeta-code) 😊
