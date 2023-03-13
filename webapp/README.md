# Next 13 Auth Web

Front end criado utilizando [NextJS](https://nextjs.org/) versão 13 junto ao Typescript

> Toda a aplicação foi preparada para lidar com qualquer decisão do usuário, para que sempre haja um feedback compreensível e não ocorra erros inesperados

## ▶️ Testando a aplicação a aplicação 

Antes de rodar a aplicação Next, deves iniciar a [api](../server)

com a aplicação em sua máquina e a api em funcionamento, rode na raíz: 

```
npm install
```

em seguida:

```
npm run dev
```

O Next.js por padrão executa na port ```3000```, para mais informações da ferramenta, consulte a [documentação](https://nextjs.org/)
> **Warning**            
> Caso altere a url onde a aplicação irá executar, modifique no arquivo .env a seguinte variável:
```WEB_BASE_URL="http://localhost:3000"```

## 💠 Funcionalidades da aplicação 

- Criar uma conta na aplicação
- Logar na aplicação e ter acesso as rotas privadas
- Entrar com sua conta de forma automática marcando a opção "remember me"
- Redefenir sua senha caso esqueça

## 🔱 Ferramentas utilizadas

- ReactJS com NextJS
- Typescript
- Eslint
- Babel
- Styled Components
- Zod
- JS-cookie
- Phosphor react
- Axios
- Font-face

### Tela de login
![Login](https://user-images.githubusercontent.com/72395637/224585815-29835bd9-9ad4-46d9-8481-514fde799600.jpg)

### Tela de cadastro | register 1/3
![Register](https://user-images.githubusercontent.com/72395637/224585974-12191c7d-e47d-4b08-8819-794d942f21cf.png)

### Tela de aviso para confirmação de email | register 2/3
![Screenshot_1](https://user-images.githubusercontent.com/72395637/224586225-a8637f59-529d-4db4-9bfd-3ca3bd0c6a55.png)

### Tela após confirmação da conta pelo email | register 3/3
![Screenshot_2](https://user-images.githubusercontent.com/72395637/224586393-40487b28-7785-4ccd-9d26-b02df5e69366.png)

### Tela para informar email | forgot password 1/3
![fg2](https://user-images.githubusercontent.com/72395637/224586648-bf30a9c2-dfaf-43ba-8703-8b8127c1ff6b.png)

### Tela para informar o código enviado por email | forgot password 2/3
![fg3](https://user-images.githubusercontent.com/72395637/224586735-ca12f328-f248-431f-a80b-576e30cc2340.png)

### Tela para redefinir senha | forgot password 3/3
![fg4](https://user-images.githubusercontent.com/72395637/224586854-0ed5b99d-26a6-474b-88ac-870b5d22c710.png)

