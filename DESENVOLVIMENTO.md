# Desenvolvimento — Resume Registration

## 1. Visão geral

O projeto foi desenvolvido para atender ao desafio de cadastro e gerenciamento de candidatos, contemplando duas formas de entrada de dados:

1. Cadastro manual através de formulário.
2. Importação opcional de currículo em PDF para preenchimento automático de alguns campos.

O usuário pode revisar e corrigir os dados extraídos do PDF antes de efetivar o cadastro.

A aplicação foi dividida em frontend e backend, com persistência dos dados em SQL Server.

---

## 2. Organização do projeto

A estrutura principal foi organizada da seguinte forma:

```text
resume-registration/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── routes/
│   │   └── test/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── lib/
│   │   └── test/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   └── package.json
│
├── README.md
├── DESENVOLVIMENTO.md
└── .gitignore
```

A separação foi feita para manter responsabilidades específicas em cada camada e facilitar manutenção e evolução.

---

## 3. Tecnologias utilizadas

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS
- Vitest
- Testing Library
- jsdom

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- SQL Server
- `@prisma/adapter-mssql`
- Multer
- `pdf-parse`
- Vitest

---

## 4. Principais decisões técnicas

### 4.1 React + TypeScript

Foi utilizado React com TypeScript para desenvolver a interface e garantir tipagem durante a implementação.

A tipagem dos dados de candidato foi centralizada em:

```text
frontend/src/types/candidate.ts
```

Foram utilizados tipos diferentes para representar:

- candidato retornado pela API;
- dados necessários para criação e atualização.

Essa separação evita que campos pertencentes ao banco, como `id`, `createdAt` e `updatedAt`, sejam tratados como dados de formulário.

---

### 4.2 Componentização do formulário

O `CandidateForm` foi criado como componente reutilizável.

O mesmo componente é utilizado para:

- cadastro;
- edição;
- preenchimento através da importação de PDF.

Na edição ou importação, o componente recebe `initialData`.

Isso evita duplicação de formulário e mantém as mesmas regras de preenchimento nos diferentes fluxos.

---

### 4.3 Centralização das chamadas HTTP

As requisições da API foram centralizadas em:

```text
frontend/src/services/candidateService.ts
```

Entre as funções estão:

```text
getCandidates()
getCandidateById()
createCandidate()
updateCandidate()
deleteCandidate()
parseCandidatePdf()
```

A decisão foi tomada para evitar que páginas diferentes implementassem diretamente chamadas `fetch` para os mesmos recursos.

---

### 4.4 Node.js + Express

O backend foi desenvolvido com Express e organizado em:

```text
routes
controllers
services
utils
middlewares
```

As rotas definem os endpoints, os controllers tratam as requisições HTTP e os services concentram as operações relacionadas aos dados.

---

### 4.5 Prisma + SQL Server

Foi utilizado Prisma para comunicação com o SQL Server.

O banco possui a entidade `Candidate`, contendo:

```text
id
fullName
email
phone
desiredArea
professionalSummary
createdAt
updatedAt
```

As alterações do banco são controladas por migrations.

A conexão com o banco utiliza variáveis de ambiente para evitar armazenamento de credenciais diretamente no código-fonte.

---

### 4.6 Upload de PDF em memória

O upload utiliza Multer com `memoryStorage`.

O PDF não é gravado no servidor.

Essa abordagem foi escolhida porque o PDF é utilizado apenas como fonte temporária para preenchimento do formulário.

---

### 4.7 Limite e validação do PDF

O upload possui limite máximo de 5 MB.

Também são realizadas verificações para aceitar somente arquivos PDF.

A validação existe tanto no frontend quanto no backend.

---

### 4.8 Extração de dados do currículo

A extração foi dividida em duas responsabilidades:

```text
pdfParser.ts
```

responsável por transformar o PDF em texto.

```text
candidateExtractor.ts
```

responsável por tentar identificar:

- nome;
- e-mail;
- telefone.

O e-mail e telefone utilizam padrões de identificação.

O nome utiliza uma estratégia baseada nas linhas do texto, pois currículos podem possuir estruturas diferentes.

Os dados extraídos não são considerados definitivos. Eles são enviados ao formulário para revisão manual.

---

## 5. Tratamento de falhas de extração

A importação do PDF foi projetada para não bloquear o cadastro manual.

Caso o PDF seja válido, mas os dados não possam ser identificados, o formulário continua disponível para preenchimento.

Essa abordagem atende ao requisito de que uma falha de extração não deve impedir o cadastro.

---

## 6. Validação do formulário

Os campos obrigatórios são:

- nome completo;
- e-mail.

Também é validado o formato do e-mail.

A validação foi implementada no frontend para feedback imediato e repetida no backend antes da persistência.

---

## 7. Uso de React Router

O React Router foi utilizado para separar os principais fluxos da aplicação:

```text
/candidates
/candidates/new
/candidates/:id
/candidates/:id/edit
```

O `BrowserRouter` foi mantido no nível superior da aplicação para que componentes como a navegação também tenham acesso ao contexto do Router.

Durante o desenvolvimento foi identificado um problema causado pela utilização do `Navigation` fora do contexto do Router.

A estrutura foi então corrigida para:

```text
BrowserRouter
├── Navigation
└── AppRoutes
```

---

## 8. Uso de variáveis de ambiente

No frontend:

```text
VITE_API_URL
```

é utilizado para definir a URL da API.

No backend, os parâmetros de conexão do SQL Server são obtidos através de variáveis de ambiente.

Os arquivos `.env` não devem ser versionados.

Foi criado também um `.env.example` para documentar as variáveis necessárias para configuração do ambiente.

---

## 9. Uso de IA durante o desenvolvimento

Ferramentas de IA foram utilizadas como apoio durante o desenvolvimento do projeto.

Os principais usos foram:

- planejamento da arquitetura inicial;
- esclarecimento de conceitos técnicos;
- apoio na configuração do Prisma;
- orientação para integração com SQL Server;
- apoio na implementação da leitura e extração de dados de PDF;
- criação e revisão de testes automatizados;
- revisão da estrutura e documentação do projeto.

## 10. Testes e verificação

Foram implementados testes automatizados no backend e frontend.

### Backend

Os testes cobrem a leitura e extração dos dados:

- extração de nome, e-mail e telefone;
- ausência de dados;
- diferentes formatos de telefone;
- leitura de PDF.

Resultado validado durante o desenvolvimento:

```text
Test Files  2 passed
Tests       4 passed
```

### Frontend

Os testes do formulário cobrem:

- nome obrigatório;
- e-mail obrigatório;
- e-mail inválido;
- envio com dados válidos;
- preenchimento através de `initialData`.

Os testes foram executados utilizando Vitest e Testing Library.

Também foi validada a persistência dos registros no SQL Server.

---

## 11. Correções e abordagens descartadas

Durante o desenvolvimento algumas abordagens foram alteradas após testes.

### Router

Inicialmente o `BrowserRouter` estava localizado de forma que a navegação ficava fora do contexto do Router.

A estrutura foi reorganizada para deixar o Router no nível superior da aplicação.

### Chamadas HTTP nas páginas

Inicialmente algumas páginas faziam `fetch` diretamente.

Essa abordagem foi posteriormente refatorada para centralizar as operações em:

```text
candidateService.ts
```

### Configuração de banco

As credenciais inicialmente utilizadas durante a configuração local foram retiradas do código-fonte e movidas para variáveis de ambiente.

## 12. Limitações conhecidas

A extração de dados do PDF depende da estrutura do documento.

PDFs com texto selecionável são mais adequados para a abordagem utilizada.

PDFs compostos exclusivamente por imagens podem não fornecer texto para o parser, tornando necessária outra tecnologia para uma solução mais abrangente.

A identificação do nome também pode apresentar resultados diferentes em currículos com estruturas muito incomuns.

Por esse motivo, a aplicação permite revisão e correção manual antes do cadastro final.

---

## 13. Possíveis melhorias futuras

Como evoluções futuras, poderiam ser implementados:

- autenticação e autorização;
- paginação da lista de candidatos;
- busca e filtros;
- armazenamento opcional do currículo original;
- extração de outros campos do currículo;
- melhorias de acessibilidade;
- deploy automatizado com CI/CD;
- ambiente separado de desenvolvimento e produção.

---

## 14. Tempo de desenvolvimento

Tempo total de desenvolvimento:

```text
Em torno de 6 horas
```

O tempo inclui implementação, configuração de ambiente, correções, testes e documentação.
