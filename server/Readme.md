# 🔐 Next 13 Auth Server

Api criada com NodeJS junto ao framework Fastify para gerenciamento do sistema de login, fazendo a comunicação entre front-end, database, e serviço de email do usuário

## Rotas da aplicação
 
- GET ```/content-auth/confirm-email/:id``` 
- POST ```/content-auth/register-new-account```
- POST ```/content-auth/login-session``` 
- POST ```/content-auth/user-verify-auth-token``` 
- POST ```/content-auth/recover-password-email``` 
- POST ```/content-auth/recover-password-code``` 
- POST ```/content-auth/recover-password-new``` 


## ▶️ Iniciar Api

com a aplicação em sua máquina e a api em funcionamento, rode na raíz:

```
npm install
```

criar o banco de dados:

```
npx prisma migrate dev --name init
```

em seguida:

```
npm run dev
```

A porta na qual a aplicação ira subir pode ser alterada no arquivo ```src/server.ts```

## 🔱 Ferramentas utilizadas

- NodeJS com TypeScript
- Fastify
- Fastify/cookie
- Prisma ORM
- Bcrypt
- Jsonwebtoken
- Zod
- Eslint
- Nodemailer
