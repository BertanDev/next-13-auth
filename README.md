# 🔐 Next 13 Auth 🔐

Aplicação criada Utilizando o NextJS em sua [versão 13](https://nextjs.org/blog/next-13), e api criada com Nodejs

## 🧪 Funcionalidades gerais da aplicação

- [x] Criar conta e confirmar com email

  > Usuário pode criar uma conta informando seu username, email e senha. Após a confirmação e todas verificação desses dados, um link é enviado por email para que seja confirmado a existencia, e acesso ao email cadastrado.
  
- [x] Logar na aplicação

  > O login é feito com email e senha, após as verificações necessárias, caso esteja tudo de acordo, um JWT é retornado da api para que seja feito a segurança das rotas privadas da aplicação, junto da criação de um cookie válido durante a sessão do usuário.
  
- [x] Remember me no Login

  > Se preenchido o checkbox de "remember me" na tela do login, será criado um UUID nos cookies do usuário e no banco de dados. No próximo acesso do usuário, é verificado a procedência desse cookie de acordo com os dados do banco, se acurado, o usuário é logado automaticamente e é criada uma nova sessão com um token JWT

- [x] Redefinir senha

  > Caso o usuário esqueça sua senha, terá a oportunidade de altera-lá caso tenha acesso ao email cadastrado na aplicação, após informar tal email, será enviado para ele um código de 6 dígitos, que deverá ser informado na aplicação para permitir a redefinição da senha.
  
Para testar ou utilizar a aplicação, veja a documentação do [front end](./webapp) e também da [api](./server)
