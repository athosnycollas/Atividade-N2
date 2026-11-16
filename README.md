# Doe Alimentos API 🥫🍞

API REST para gestão, controle de estoque e distribuição de doações de alimentos e cestas básicas, desenvolvida para suporte a entidades assistenciais e bancos de alimentos comunitários.

Este projeto segue as práticas de **Gestão de Configuração de Software (GCS)** e **Cultura DevOps**, implementando integração e entrega contínuas (CI/CD), branching model com **GitHub Flow**, revisões por pares e proteção da branch principal (`main`).

---

## 📌 O que o app faz

- **Listagem e consulta de alimentos:** Consulta itens doados com filtros por status (`disponivel`, `distribuido`) e por categoria (`graos`, `laticinios`, `cesta_basica`, etc.).
- **Cadastro de doações recebidas:** Registro de novos alimentos com validação rigorosa de campos obrigatórios (`item`, `quantidade`, `unidade`, `categoria`).
- **Distribuição para famílias:** Registro de entrega de alimentos com identificação do beneficiário e data de entrega.
- **Estatísticas gerais:** Endpoint `/api/estatisticas` com percentual de distribuição e métricas de estoque.
- **Health check:** Endpoint `/health` para monitoramento e observabilidade contínua da API (CI/CD).

---

## 🛠️ Stack Tecnológica

- **Linguagem / Runtime:** Node.js (v20+)
- **Framework Web:** Express
- **Testes Automatizados:** Node Test Runner nativo (`node:test` + `node:assert`)
- **Versionamento & CI/CD:** Git, GitHub Flow e GitHub Actions

---

## 🚀 Como instalar e rodar localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/athosnycollas/Atividade-N2.git
cd Atividade-N2
```

### 2. Configurar variáveis de ambiente
Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

### 3. Instalar as dependências
```bash
npm install
```

### 4. Executar a aplicação
```bash
npm start
```
A API estará acessível em `http://localhost:3000`. Endpoint de teste: `GET http://localhost:3000/health`.

---

## 🧪 Como rodar os testes

A suíte de testes unitários valida os endpoints da API, respostas de erro e criação de registros:

```bash
npm test
```

---

## 📋 Plano de Gestão de Configuração (PGC)

O Plano de Gestão de Configuração de Software formal do projeto está publicado como item de configuração em:  
👉 **[docs/pgc.md](docs/pgc.md)**

### Papéis e Responsabilidades (PGC Seção 2)
- **Desenvolvedor Líder / Product Owner / DevOps:** [@athosnycollas](https://github.com/athosnycollas)
- **Par de Revisão / Desenvolvedor:** [@TruckControl](https://github.com/TruckControl) (ou colega de disciplina)

---

## 🛡️ Colaboração e Políticas de Branch

- **Branch principal (`main`):** Protegida. Todo merge requer Pull Request aprovado pelo par de revisão e pipeline verde. Push direto é estritamente bloqueado.
- **Merge strategy:** Apenas *Squash and merge* com título e descrição do PR.
- **Environments:**
  - `staging`: Deploy automático após merge na `main`.
  - `production`: Requer aprovação manual obrigatória do Desenvolvedor Líder ([@athosnycollas](https://github.com/athosnycollas)).
- **Templates:**
  - Pull Requests: [Template de PR](.github/pull_request_template.md)
  - Issues: [Nova Funcionalidade](.github/ISSUE_TEMPLATE/funcionalidade.yml) | [Relatar Defeito](.github/ISSUE_TEMPLATE/defeito.yml)
