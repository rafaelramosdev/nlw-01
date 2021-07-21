<h1 align="center">
  <img alt="Ecoleta" title="Ecoleta" src=".github/logo.svg" width="160px"/>
</h1>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=NLW&message=01&color=8257E5&labelColor=000000" alt="NLW Together 01"/>

  <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000" alt="License">
</p>

<br>

<p align="center">
  <img alt="Ecoleta" src=".github/cover.png" width="100%">
</p>

<br>

## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org)
- [Node.js](https://nodejs.org/en/)
- [Knex](https://knexjs.org/)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)
- [TypeScript](https://www.typescriptlang.org/)

## 💻 Projeto

O Ecoleta é um marketplace que ajuda pessoas a encontrarem pontos de coleta de resíduos de forma eficiente.

O Ecoleta foi desenvolvido com base na semana internacional do meio ambiente e tem o objetivo de conectar pessoas com empresas que coletam resíduos específicos como lâmpadas, pilhas, óleo de cozinha etc.

Este é um projeto desenvolvido durante a **[Next Level Week Together](https://nextlevelweek.com/)**, apresentada nos dias 01 a 07 de Junho de 2020.

## 🔖 Layout

Você pode visualizar o layout do projeto através do link abaixo:

- [Layout Web e Mobile](https://www.figma.com/file/9TlOcj6l7D05fZhU12xWT3/Ecoleta-Booster/duplicate)

É necessário ter uma conta no [Figma](http://figma.com/) para acessá-lo.

## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/rafaelramosdev/nlw-01-omnistack
$ cd nlw-01-omnistack
```

A aplicação é dividida em três partes: web, mobile e backend, a versão web e o aplicativo mobile precisam que o backend esteja sendo executado para funcionar. Para iniciar a aplicação, siga os passos abaixo:

## Rodando a versão backend

```bash
# Entra na pasta da versão backend
$ cd backend

# Instala as dependências
$ npm install

# Cria as migrates (tabelas do banco de dados)
$ npm run knex:migrate

# Insere as seeds (informações nas tabelas do banco de dados)
$ npm run knex:seed

# Inicia o server
$ npm run dev

# O servidor estará ouvindo a porta 3333 e estará disponível no endereço http://localhost:3333
```

## Rodando a versão web

```bash
# Entra na pasta da versão web
$ cd web

# Instala as dependências
$ npm install

# Inicia a versão web
$ npm run start
```

O website estará disponível no seu navegador pelo endereço [`http://localhost:3000`](http://localhost:3000).

## Rodando a versão mobile

```bash
# Entra na pasta da versão mobile
$ cd mobile

# Instala as dependências
$ npm install

# Inicia o aplicativo
$ expo start

# Se tiver algum problema com as fontes, execute o comando:
$ expo install expo-font @expo-google-fonts/ubuntu @expo-google-fonts/roboto
```

Com seu smartphone, escaneie o QRCode que aparecerá no terminal ou na página que abrir utilizando o aplicativo Expo.

É necessário ter o aplicativo Expo Go instalado no seu celular.

- [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [App Store](https://apps.apple.com/br/app/expo-go/id982107779)

## 📄 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Fique ligado nas próximas edições do [Next Level Week](https://nextlevelweek.com/), é um evento gratuito que você não pode deixar passar, recomendo muito!

Feito by [Rafael Ramos](https://rafaelramos.dev/) 🙋🏻‍♂️
