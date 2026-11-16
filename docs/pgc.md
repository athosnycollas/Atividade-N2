# Plano de Gerenciamento de Configuração (PGC)
## Enfoque DevOps - Integração e Entrega Contínuas (CI/CD)
**Versão:** 1.0  
**Data:** 16/11/2026  
**Projeto:** Doe Alimentos API - Plataforma Web/API para Gestão e Distribuição de Doações de Alimentos e Cestas Básicas  
**Repositório Oficial:** [https://github.com/athosnycollas/Atividade-N2](https://github.com/athosnycollas/Atividade-N2)

---

### Identificação do Projeto e Equipe

| Campo | Descrição |
|---|---|
| **Projeto** | Doe Alimentos API - Gestão de Alimentos e Apoio a Bancos Comunitários |
| **Gerente de Projeto / Product Owner** | Desenvolvedor Líder (@athosnycollas) |
| **Responsável de GCS / DevOps** | Desenvolvedor Líder (@athosnycollas) |
| **Par de Revisão / Desenvolvedor** | Par de Revisão com acesso de escrita (@TruckControl ou colega de disciplina) |
| **Repositório Principal** | `https://github.com/athosnycollas/Atividade-N2` (GitHub, público) |
| **Regime de Trabalho** | Remoto, assíncrono e colaborativo |

---

### Histórico de Revisões

| Data | Versão | Descrição | Autor |
|---|---|---|---|
| 16/11/2026 | 1.0 | Elaboração inicial do PGC com enfoque em práticas DevOps (CI/CD), branching GitHub Flow, proteção de branch `main` e ambientes Staging/Produção. | @athosnycollas |

---

## 1. Introdução

### 1.1 Finalidade
Este Plano de Gerenciamento de Configuração (PGC) estabelece as práticas, padrões, responsabilidades e ferramentas de Gestão de Configuração de Software (GCS) aplicadas ao projeto **Doe Alimentos API**. O foco é garantir rastreabilidade completa, reprodutibilidade de builds, proteção de código e automação de entrega por meio de pipelines de CI/CD.

### 1.2 Escopo
Aplica-se ao código-fonte da API, testes automatizados, scripts de automação, documentação técnica, arquivos de configuração e definições de infraestrutura/pipeline versionados no repositório.

### 1.3 Definições e Abreviações
- **GCS:** Gestão de Configuração de Software
- **CI / CD:** Integração Contínua / Entrega Contínua
- **IC:** Item de Configuração (artefato controlado sob gerência de configuração)
- **Baseline:** Conjunto estável e formalmente aprovado de itens de configuração (ex.: release tag)
- **CCM:** Comitê de Controle de Mudança

### 1.4 Referências
- Plano de GCS de Referência (ONGConecta / Prof. Lucas Camargo)
- Documentação Oficial do GitHub (Branch Protection, Environments, Actions)
- Convenção de Conventional Commits 1.0.0 e Semantic Versioning 2.0.0

---

## 2. Cultura DevOps e Papéis na Gerência de Configuração

Os papéis e responsabilidades são distribuídos entre os colaboradores:

| Papel | Responsável | Atribuições |
|---|---|---|
| **Desenvolvedor Líder / PO / DevOps** | @athosnycollas | Manutenção da arquitetura, pipelines de CI/CD, governança do repositório, revisão final e aprovação obrigatória de deploy para o ambiente de Produção. |
| **Desenvolvedor / Par de Revisão** | Par de Revisão | Implementação de endpoints e regras de negócio, criação de testes automatizados e revisão por pares obrigatória (Code Review) em todos os Pull Requests direcionados à `main`. |
| **Comitê de Controle de Mudança (CCM)** | @athosnycollas + Par de Revisão | Deliberação conjunta para mudanças de alto risco (ex.: quebra de contrato de API, alteração estrutural no banco de dados, dados sensíveis LGPD). |

### 2.1 Comunicação Assíncrona
As decisões técnicas e revisões ocorrem prioritariamente via GitHub (Issues e Pull Requests), registrando o histórico de discussões e justificativas técnicas diretamente atrelado ao código.

---

## 3. Ferramentas, Ambientes e Infraestrutura

### 3.1 Ferramentas Adotadas
- **Controle de Versão:** Git e GitHub (repositório público).
- **Orquestração de CI/CD:** GitHub Actions.
- **Linguagem / Runtime:** Node.js (v20+) e Express.
- **Testes:** Node Test Runner nativo (`node:test` e `node:assert`).
- **Rastreamento de Mudanças e Tarefas:** GitHub Issues e Pull Requests.
- **Gestão de Segredos:** GitHub Secrets e Environments.

### 3.2 Ambientes de Implantação

| Ambiente | Finalidade | Gatilho e Regras de Promoção |
|---|---|---|
| **Staging (Homologação)** | Validação funcional e testes de integração com artefatos estáveis gerados após merge na `main`. | Automático após merge na branch `main`. Restrito a branches protegidas (*Protected branches only*). |
| **Production (Produção)** | Ambiente estável e acessível aos usuários finais e entidades parceiras. | Promoção controlada mediante **aprovação manual obrigatória do Desenvolvedor Líder (@athosnycollas)**. Restrito a branches protegidas. |

### 3.3 Estratégia de Branching (GitHub Flow)
- **`main`:** Branch principal, sempre estável e pronta para implantação. Protegida contra commits e pushes diretos.
- **`feature/<issue>-<descricao>`:** Branches temporárias criadas a partir da `main` para implementar novas funcionalidades ou melhorias.
- **`hotfix/<descricao>`:** Branches para correções urgentes e emergenciais.
- **Histórico Linear:** Todo merge é realizado via *Squash and merge* com título e descrição do PR.

---

## 4. Itens de Configuração (ICs)

Todos os artefatos controlados residem no repositório Git:

```text
Atividade-N2/
├── .env.example                      # Modelo de variáveis de ambiente
├── .gitattributes                    # Normalização de quebras de linha (LF)
├── .github/
│   ├── CODEOWNERS                    # Atribuição de revisores automáticos
│   ├── ISSUE_TEMPLATE/               # Formulários de Issues (feat, fix)
│   ├── pull_request_template.md      # Template com checklist de qualidade
│   └── workflows/
│       ├── ci.yml                    # Pipeline de Integração Contínua
│       └── deploy.yml                # Pipeline de Entrega Contínua (Staging/Prod)
├── docs/
│   └── pgc.md                        # Este documento de PGC publicado
├── src/
│   ├── app.js                        # Rotas, controladores e regras da API
│   └── index.js                      # Inicialização do servidor HTTP
├── tests/
│   └── alimentos.test.js             # Suíte de testes automatizados
├── .gitignore                        # Regras de exclusão de arquivos
├── package.json                      # Manifesto de dependências e scripts
├── package-lock.json                 # Lockfile com versões exatas fixadas
└── README.md                         # Documentação e instruções de execução/testes
```

---

## 5. Integração Contínua (CI)

### 5.1 Pipeline de CI
Todo Pull Request aberto para a branch `main` dispara automaticamente o workflow `ci.yml`:
1. Checkout do código-fonte.
2. Configuração do ambiente Node.js 20.
3. Instalação determinística de dependências (`npm ci`).
4. Auditoria de vulnerabilidades (`npm audit --audit-level=high`).
5. Execução completa da suíte de testes unitários (`npm test`).

### 5.2 Política de Pull Request e Revisão de Código
- Pushes diretos na branch `main` são estritamente bloqueados pela política de proteção de branches do GitHub.
- É obrigatória a aprovação de pelo menos **1 revisor com acesso de escrita** antes da liberação do merge.
- O branch deve manter histórico linear (*Require linear history*).

---

## 6. Entrega Contínua (CD) e Implantação

### 6.1 Etapas do Pipeline de CD
1. **Merge na `main`:** Dispara a etapa de build e deploy automático no ambiente de **Staging**.
2. **Quality Gate Staging:** Inicialização do servidor e verificação de integridade pós-deploy (health check `/health`).
3. **Gate de Produção:** O pipeline pausa e aguarda a revisão e aprovação manual obrigatória de `@athosnycollas` no ambiente `production`.
4. **Deploy em Produção:** Execução do deploy final e validação pós-aprovação.

### 6.2 Rollback e Recuperação
Caso seja identificada anomalia crítica no ambiente de produção:
- Reversão do commit de merge na branch `main` via PR emergencial ou redeploy de release tag estável anterior.

---

## 7. Infraestrutura como Código (IaC) e Gestão de Segredos
- As configurações de execução e dependências são versionadas no código (`package.json`, `.env.example`).
- Segredos de produção, tokens e chaves privadas nunca são commitados no repositório; são armazenados de forma isolada no GitHub Secrets atrelados aos Environments respectivos.

---

## 8. Controle de Configuração e Mudança

### 8.1 Processo de Mudança Padrão
1. Abertura de Issue documentando o problema ou necessidade.
2. Criação de branch a partir da `main`.
3. Desenvolvimento local e validação com testes unitários.
4. Abertura de Pull Request preenchendo o template oficial.
5. Code Review e aprovação pelo par de revisão.
6. Squash and merge na branch `main`.

### 8.2 Comitê de Controle de Mudança (CCM)
Acionado para exceções de alto impacto, composto por @athosnycollas e o Par de Revisão.

---

## 9. Baselines e Releases
- Uma baseline formal é gerada a cada entrega promovida com sucesso para o ambiente de Produção, consolidada por uma Git Tag de versão SemVer (ex.: `v1.0.0`).
- Notas de versão (*Release Notes*) são registradas na aba Releases do GitHub.

---

## 10. Status da Configuração e Observabilidade
- **Métricas:** Taxa de sucesso de pipelines de CI/CD, tempo de execução dos testes e frequência de deploys.
- **Health Check:** O endpoint `/health` responde status HTTP 200 com timestamp para monitoramento externo de disponibilidade (uptime).

---

## 11. Marcos do Projeto
1. **Marco 1:** Estruturação inicial do repositório, governança, proteção de branches e publicação do PGC.
2. **Marco 2:** Implementação do pipeline de Integração Contínua (CI).
3. **Marco 3:** Configuração dos ambientes Staging/Produção e fluxo de Entrega Contínua (CD).
4. **Marco 4:** Auditoria de segurança e baseline formal de primeira release estável.

---

## 12. Treinamento e Recursos
- Instruções detalhadas de setup e execução local disponibilizadas no [README.md](../README.md).
- Modelos padronizados de Issues e Pull Requests em `.github/`.

---

## 13. Controle de Software de Terceiros
- Dependências externas são homologadas, fixadas e protegidas via `package-lock.json`.
- Atualizações de segurança são monitoradas e aplicadas periodicamente.

---

## 14. Quadro-Resumo do Pipeline CI/CD

| Etapa | Ação Executada | Gatilho | Responsável / Aprovador |
|---|---|---|---|
| **CI (Validação)** | Instalação (`npm ci`), auditoria e testes unitários (`npm test`) | Abertura ou atualização de PR | GitHub Actions (Automatizado) |
| **Code Review** | Análise de código e validação de checklist do PR | PR aberto | Par de Revisão (1 aprovação obrigatória) |
| **Merge** | Squash and merge linear na branch `main` | Aprovação + CI verde | @athosnycollas |
| **CD (Staging)** | Deploy no ambiente de homologação e validação de health check | Commit na `main` | Automático |
| **Gate Produção** | Avaliação e liberação de deploy em produção | Validação em staging | **@athosnycollas (Aprovador Obrigatório)** |
| **CD (Produção)** | Deploy em produção e verificação final | Aprovação do Gate | Automático pós-aprovação |
