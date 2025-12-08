# 📚 Basic Studio - Backend

API RESTful para plataforma de gestão de cursos online, construída com NestJS, MongoDB e JWT Authentication.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js progressivo
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação com JSON Web Tokens
- **Swagger** - Documentação automática da API
- **TypeScript** - Superset JavaScript com tipagem estática
- **class-validator** - Validação de DTOs
- **bcrypt** - Hash de senhas

## 📋 Pré-requisitos

- Node.js >= 18.x
- MongoDB >= 6.x
- npm ou yarn

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/dieegoolimaa/basic_backend.git
cd basic_backend

# Instale as dependências
npm install
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/basic_studio

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:4200
```

### MongoDB

Certifique-se de que o MongoDB está rodando:

```bash
# macOS (com Homebrew)
brew services start mongodb-community

# Linux (systemd)
sudo systemctl start mongod

# Windows
net start MongoDB
```

## 🏃 Executando o Projeto

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod

# Watch mode
npm run start:dev
```

A API estará disponível em: `http://localhost:3000/api`

## 📖 Documentação da API

A documentação Swagger está disponível em: `http://localhost:3000/api/docs`

### Principais Endpoints

#### Autenticação (`/api/auth`)

- `POST /auth/register` - Registrar novo usuário com código de convite
- `POST /auth/login` - Login e obtenção de token JWT
- `GET /auth/validate-invite?code=XXX` - Validar código de convite

#### Cursos (`/api/courses`)

- `GET /courses` - Listar todos os cursos (público)
- `GET /courses/:id` - Detalhes de um curso
- `GET /courses/with-ratings` - Cursos com avaliações
- `GET /courses/admin` - Listar cursos (admin) 🔒
- `POST /courses` - Criar curso 🔒
- `PUT /courses/:id` - Atualizar curso 🔒
- `DELETE /courses/:id` - Deletar curso 🔒

#### Usuários (`/api/users`)

- `GET /users/me` - Perfil do usuário logado 🔒
- `GET /users/me/courses` - Cursos do usuário 🔒
- `GET /users/me/progress` - Progresso de aprendizado 🔒
- `GET /users/students` - Listar alunos (admin) 🔒
- `PUT /users/:id/courses` - Atualizar cursos do usuário (admin) 🔒
- `PUT /users/:id/active` - Ativar/desativar usuário (admin) 🔒
- `PUT /users/me/lessons/:lessonId/complete` - Marcar aula como concluída 🔒

#### Convites (`/api/invites`)

- `GET /invites` - Listar convites (admin) 🔒
- `POST /invites` - Criar convite (admin) 🔒
- `DELETE /invites/:code` - Cancelar convite (admin) 🔒
- `POST /invites/:code/resend` - Reenviar convite (admin) 🔒

#### Avaliações (`/api/reviews`)

- `GET /reviews/course/:courseId` - Avaliações de um curso
- `GET /reviews/course/:courseId/stats` - Estatísticas de avaliação
- `POST /reviews` - Criar avaliação 🔒
- `PUT /reviews/:id` - Atualizar avaliação 🔒
- `DELETE /reviews/:id` - Deletar avaliação 🔒
- `GET /reviews/me` - Minhas avaliações 🔒

🔒 = Requer autenticação JWT

## 🏗️ Estrutura do Projeto

```
src/
├── common/              # Recursos compartilhados
│   ├── decorators/      # Decorators customizados
│   ├── dto/             # DTOs compartilhados
│   ├── filters/         # Exception filters
│   ├── guards/          # Guards de autorização
│   └── interceptors/    # Interceptors HTTP
├── modules/             # Módulos da aplicação
│   ├── auth/            # Autenticação e autorização
│   │   ├── dto/         # DTOs de autenticação
│   │   ├── guards/      # JWT Auth Guard
│   │   └── strategies/  # JWT Strategy
│   ├── courses/         # Gestão de cursos
│   │   └── schemas/     # Schemas Mongoose
│   ├── invites/         # Códigos de convite
│   │   ├── dto/
│   │   └── schemas/
│   ├── reviews/         # Avaliações de cursos
│   │   ├── dto/
│   │   └── schemas/
│   └── users/           # Gestão de usuários
│       ├── schemas/
│       └── users.seeder.ts
├── app.module.ts        # Módulo raiz
└── main.ts             # Entry point
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação:

1. Faça login em `/auth/login` e receba um token
2. Inclua o token no header das requisições: `Authorization: Bearer <token>`
3. O token expira em 7 dias (configurável)

### Exemplo de Uso

```javascript
// Login
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
  }),
});
const { access_token, user } = await response.json();

// Usar token em requisições autenticadas
const courses = await fetch('http://localhost:3000/api/users/me/courses', {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});
```

## 👥 Sistema de Convites

O sistema requer códigos de convite para registro:

1. Admin cria convite com email e cursos associados
2. Convite é enviado por email (mock)
3. Usuário usa código no registro
4. Usuário obtém acesso aos cursos do convite

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📦 Build

```bash
# Build para produção
npm run build

# Arquivos gerados em /dist
```

## 🌐 Deploy

### Railway / Heroku / Render

1. Configure as variáveis de ambiente
2. Configure MongoDB Atlas ou similar
3. Execute o build
4. Inicie com `npm run start:prod`

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 🔒 Segurança

- Senhas hasheadas com bcrypt
- JWT para autenticação stateless
- CORS configurado
- Validação de dados com class-validator
- Guards para proteção de rotas
- Exception filters para tratamento de erros

## 📝 Melhorias Implementadas

✅ Documentação Swagger completa  
✅ Exception filter global  
✅ Logging interceptor  
✅ Validações robustas  
✅ Tratamento de erros padronizado  
✅ Estrutura modular e escalável

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'Adiciona nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

**Diego Lima**

- GitHub: [@dieegoolimaa](https://github.com/dieegoolimaa)

## 🆘 Suporte

Para suporte, abra uma issue no GitHub ou entre em contato.
