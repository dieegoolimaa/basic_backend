# Basic Backend

Backend NestJS da plataforma Basic Studio para cursos de nail art.

## 🚀 Tecnologias

- NestJS 10
- MongoDB / Mongoose
- JWT Authentication
- Passport

## 📦 Instalação

```bash
npm install
```

## 🔧 Desenvolvimento

```bash
# Iniciar MongoDB local (se não estiver usando Docker)
mongod

# Iniciar o servidor
npm run start:dev
```

A API estará disponível em `http://localhost:3000/api`

## 🏗️ Build

```bash
npm run build
npm run start:prod
```

## 🔌 Configuração

Copie o arquivo `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

Variáveis disponíveis:
- `PORT` - Porta do servidor (default: 3000)
- `MONGODB_URI` - URI de conexão MongoDB
- `JWT_SECRET` - Chave secreta para tokens JWT
- `JWT_EXPIRES_IN` - Tempo de expiração do token

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Registro de novo usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/validate-invite` - Validar código de convite

### Users
- `GET /api/users/me` - Perfil do usuário
- `GET /api/users/me/courses` - Cursos matriculados
- `GET /api/users/me/progress` - Progresso do usuário
- `GET /api/users/students` - Listar alunos (admin)
- `PUT /api/users/:id/courses` - Atualizar cursos (admin)
- `PUT /api/users/:id/active` - Ativar/desativar (admin)

### Courses
- `GET /api/courses` - Listar cursos ativos
- `GET /api/courses/with-ratings` - Cursos com avaliações
- `GET /api/courses/:id` - Detalhes do curso
- `POST /api/courses` - Criar curso (admin)
- `PUT /api/courses/:id` - Atualizar curso (admin)
- `DELETE /api/courses/:id` - Deletar curso (admin)

### Reviews
- `POST /api/reviews` - Criar avaliação
- `PUT /api/reviews/:id` - Atualizar avaliação
- `DELETE /api/reviews/:id` - Deletar avaliação
- `GET /api/reviews/course/:courseId` - Avaliações do curso
- `GET /api/reviews/course/:courseId/stats` - Estatísticas do curso

### Invites
- `POST /api/invites` - Criar convite (admin)
- `GET /api/invites` - Listar convites (admin)
- `GET /api/invites/pending` - Convites pendentes (admin)
- `DELETE /api/invites/:code` - Cancelar convite (admin)
- `POST /api/invites/:code/resend` - Reenviar convite (admin)

## 👤 Admin Inicial

Ao iniciar o servidor, um usuário admin é criado automaticamente:
- **Email:** admin@basic.com
- **Senha:** admin123
