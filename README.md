# 🎨 Job Application Tracker - Frontend

Este repositório contém o front-end da aplicação Job Application Tracker, desenvolvido com Vue.js 3. Ele é responsável pela interface gráfica, tratativa de arquivos CSV e interação com a API do back-end.

## 🎯 Objetivo

Prover uma interface limpa, interativa e responsiva para gerenciar candidatos, vagas e candidaturas, com funcionalidades de upload de CSV, feedback visual e atualização em tempo real de status.

## 🔍 Funcionalidades Principais

- 📄 **Upload de Arquivo CSV**: Envio de arquivos para o back-end contendo dados dos candidatos.
- 📋 **Lista de Aplicações**: Visualização das candidaturas com seus respectivos status.
- 📡 **Comunicação Pai-Filho**: Exemplo: `CreateVacancies.vue` (pai) e `JobVacancy.vue` (filho), usando `props`, emit e reactive updates para manter a interface sincronizada.
- 🔃 **Atualização em Tempo Real**: Atualização do status de candidaturas usando polling.
- 🌐 **Integração com API**: Comunicação com o back-end via Axios para CRUD, uploads e geração de feedback.

## 🎨 Tecnologias

- Vue.js 3
- Axios
- Bootstrap


# vue-job-tracker

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
