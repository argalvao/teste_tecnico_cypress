# Automação de Testes com Cypress - Avaliação Técnica

##  Visão Geral

Este repositório contém a solução para uma avaliação técnica para a posição de Analista de Testes. O projeto consiste em uma suíte de testes automatizados para o site [Automation Testing Online](https://automationintesting.online/), utilizando **Cypress** e seus recursos nativos para validar funcionalidades de front-end e interações com API.

O objetivo principal é demonstrar a capacidade de estruturar um projeto de automação do zero, incluindo a criação de documentação, o desenvolvimento de múltiplos cenários de teste e a configuração de um ambiente de Integração Contínua (CI/CD).

## ✒️ Autor

* **Abel Ramalho Galvão**

## 🛠️ Tecnologias Utilizadas

* **Framework de Teste:** [Cypress](https://www.cypress.io/)
* **Linguagem:** JavaScript
* **Gerenciador de Pacotes:** npm
* **CI/CD:** GitHub Actions
* **Controle de Versão:** Git & GitHub

## 📂 Estrutura de Branches

Este repositório foi organizado para facilitar tanto a visualização completa do projeto quanto a execução de testes individuais:

* **`main`**: A branch principal. Contém **todos os casos de teste** implementados e a configuração completa das pipelines de CI/CD. 
* **`CT01`, `CT02`, ..., `CT06`**: Cada caso de teste possui sua própria branch individual. Ao fazer o checkout de uma dessas branches (ex: `git checkout CT01`), você terá no seu ambiente de testes **apenas o código daquele cenário específico**. Esta estrutura foi criada para permitir a análise e execução isolada de cada teste.

## ⚙️ Como Configurar o Ambiente

Siga os passos abaixo para clonar o projeto e instalar todas as dependências necessárias.

### Pré-requisitos

* **Node.js** (versão 18 ou superior)
* **Git** instalado em sua máquina.

### Passos para Instalação

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:argalvao/teste_tecnico_cypress.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd teste_tecnico_cypress
    ```

3.  **Instale as dependências do projeto:**
    Este comando irá baixar o Cypress e todas as outras dependências listadas no `package.json` e `package-lock.json`.
    ```bash
    npm install
    ```

## 🚀 Como Executar os Testes

Existem duas maneiras de executar os testes, dependendo do seu objetivo.

### 1. Executando TODOS os Testes (Recomendado)

Para rodar a suíte completa com todos os cenários, certifique-se de que você está na branch principal.

1.  **Garanta que você está na branch `main`:**
    ```bash
    git checkout main
    ```

2.  **Execute os testes via linha de comando (headless):**
    Este comando roda todos os testes em segundo plano, da mesma forma que a pipeline de CI/CD.
    ```bash
    npx cypress run
    ```

3.  **(Opcional) Execute os testes no modo interativo:**
    Este modo abre a interface do Cypress, ideal para visualizar a execução passo a passo.
    ```bash
    npx cypress open
    ```

### 2. Executando um caso de teste INDIVIDUALMENTE

Se você deseja executar apenas um cenário de teste específico (ex: `CT05`), siga estes passos:

1.  **Faça o checkout para a branch do teste desejado:**
    ```bash
    # Exemplo para executar apenas o CT05
    git checkout CT05
    ```

2.  **Execute os testes via linha de comando ou modo interativo:**
    Como a branch contém apenas um arquivo de teste, os comandos abaixo rodarão somente o `CT05`.
    ```bash
    # Modo headless
    npx cypress run

    # Modo interativo
    npx cypress open
    ```
    Para executar outro teste, basta trocar de branch (ex: `git checkout CT06`) e rodar os comandos novamente.

## 🤖 Pipelines de CI/CD

O projeto está configurado com duas pipelines de **GitHub Actions** para automação:
* **Verificação Rápida (Pull Request):** Executa um subconjunto de testes críticos a cada Pull Request para a branch `main`.
* **Regressão Completa (Main):** Executa a suíte de testes completa a cada merge na branch `main`, garantindo a estabilidade do código.
