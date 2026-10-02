# Resume Registration

Aplicação web para cadastro e gerenciamento de candidatos.

A aplicação permite cadastrar candidatos manualmente ou importar um currículo em PDF. Quando um PDF é enviado, o backend tenta extrair automaticamente nome, e-mail e telefone para preencher o formulário. Os dados podem ser corrigidos pelo usuário antes do cadastro.

## Funcionalidades

- Cadastro manual de candidatos
- Importação de currículo em PDF
- Validação de arquivos PDF
- Limite de upload de 5 MB
- Extração de nome, e-mail e telefone do currículo
- Preenchimento automático do formulário
- Correção manual dos dados extraídos
- Listagem de candidatos
- Visualização dos detalhes de um candidato
- Edição de candidatos
- Exclusão de candidatos
- Validação de campos obrigatórios
- Validação de formato de e-mail
- Tratamento de erros no frontend e backend
- Persistência em SQL Server
- Migrations utilizando Prisma
- Testes automatizados

## Tecnologias

### Frontend

- React
- TypeScript
- Vite
- React Router
- Vitest
- Testing Library
- jsdom
- CSS

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- `@prisma/adapter-mssql`
- SQL Server
- Multer
- `pdf-parse`
- Vitest

## Arquitetura

O projeto está dividido entre frontend e backend:

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

## API

### Listar candidatos

```http
GET /candidates
```

### Buscar candidato por ID

```http
GET /candidates/:id
```

### Criar candidato

```http
POST /candidates
```

Exemplo:

```json
{
    "fullName": "Pedro Loureiro",
    "email": "pedro@email.com",
    "phone": "(41) 99999-9999",
    "desiredArea": "Frontend",
    "professionalSummary": "Desenvolvedor com experiência em React e TypeScript."
}
```

### Atualizar candidato

```http
PUT /candidates/:id
```

### Excluir candidato

```http
DELETE /candidates/:id
```

### Processar currículo em PDF

```http
POST /candidates/parse-pdf
```

O arquivo deve ser enviado através do campo:

```text
file
```

O endpoint retorna os dados identificados no currículo:

```json
{
    "data": {
        "fullName": "Pedro Loureiro",
        "email": "pedro@email.com",
        "phone": "(41) 99999-9999"
    }
}
```

A extração é uma etapa auxiliar. Caso não seja possível identificar os dados, o usuário continua podendo preencher o formulário manualmente.

## Banco de dados

O projeto utiliza Microsoft SQL Server com Prisma ORM.

O modelo principal é `Candidate`:

```text
Candidate
├── id
├── fullName
├── email
├── phone
├── desiredArea
├── professionalSummary
├── createdAt
└── updatedAt
```

As alterações do banco são versionadas através de migrations em:

```text
backend/prisma/migrations/
```

## Configuração do ambiente

### Backend

Crie um arquivo:

```text
backend/.env
```

Configure as variáveis necessárias para o SQL Server:

```env
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=ResumeRegistration
DB_USER=seu_usuario
DB_PASSWORD=sua_senha

DATABASE_URL=sua_connection_string
```

As credenciais reais devem permanecer somente no `.env` local.

Existe também um arquivo:

```text
backend/.env.example
```

que serve como referência para configuração do ambiente.

### Frontend

Crie:

```text
frontend/.env
```

com:

```env
VITE_API_URL=http://localhost:3000/api
```

Após alterar variáveis `VITE_*`, reinicie o servidor do Vite.

## Executando o projeto

### Backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Aplique as migrations:

```bash
npx prisma migrate deploy
```

Para desenvolvimento:

```bash
npm run dev
```

O backend ficará disponível em:

```text
http://localhost:3000
```

### Frontend

Em outro terminal:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

O frontend ficará disponível na URL apresentada pelo Vite, normalmente:

```text
http://localhost:5173
```

## Scripts

### Backend

```bash
npm run dev
npm run build
npm run start
npm test
```

### Frontend

```bash
npm run dev
npm run build
npm test
```

## Testes

O backend possui testes para:

- extração de nome, e-mail e telefone;
- ausência de dados identificáveis;
- diferentes formatos de telefone;
- leitura de arquivos PDF.

O frontend possui testes para:

- obrigatoriedade do nome;
- obrigatoriedade do e-mail;
- formato de e-mail;
- submissão com dados válidos;
- preenchimento através de `initialData`.

Os testes podem ser executados com:

```bash
npm test
```

em cada projeto.

## Limitações da extração de PDF

A extração depende do conteúdo textual disponível no arquivo.

Currículos que possuem texto selecionável tendem a funcionar melhor. PDFs compostos exclusivamente por imagens ou com layouts muito incomuns podem não permitir uma identificação confiável dos dados.

Por esse motivo, os dados extraídos sempre são apresentados no formulário antes do cadastro e podem ser corrigidos pelo usuário.

## Decisões de arquitetura

A aplicação mantém responsabilidades separadas entre páginas, componentes, services, controllers e services do backend.

O `CandidateForm` é reutilizado tanto para cadastro quanto para edição, recebendo `initialData` quando necessário.

As chamadas HTTP do frontend são centralizadas em `candidateService.ts`, evitando que cada página implemente sua própria comunicação com a API.

A leitura do PDF também foi isolada em utilitários específicos para manter a responsabilidade de extração independente das regras da API.

## Segurança e configuração

Informações sensíveis de conexão com o banco não são armazenadas no código-fonte.

Os arquivos `.env` são ignorados pelo Git e o projeto disponibiliza `.env.example` para documentar as variáveis necessárias.

A validação do frontend melhora a experiência do usuário, enquanto as validações do backend continuam sendo aplicadas antes da persistência.

## Status

Projeto funcional com:

```text
Cadastro          ✅
Listagem          ✅
Detalhes          ✅
Edição            ✅
Exclusão          ✅
Upload de PDF     ✅
Extração de dados ✅
Validação         ✅
SQL Server        ✅
Migrations        ✅
Testes            ✅
```
