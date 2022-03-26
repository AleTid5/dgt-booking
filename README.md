# Capitole Automated Checkin/Checkout
![Node](https://img.shields.io/badge/-Node-333?logo=node.js&style=for-the-badge)
![Nestjs](https://img.shields.io/badge/-Nestjs-E0234E?logo=nestjs&style=for-the-badge)
![Typescript](https://img.shields.io/badge/-Typescript-2c3b5a?logo=typescript&style=for-the-badge)
![Docker](https://img.shields.io/badge/-Docker-031f30?logo=Docker&style=for-the-badge)

## 🤖 The automation
It has been developed using Puppeteer and NestJs. Just create an `.env` file with the
following structure

```bash
CAPITOLE_EMAIL=your.enterprise.email@capitole-consulting.com
CAPITOLE_PASSWORD=Y0uRL0g1nP4s5w0rD
```

## 💻 Install and run (simple)
> Node [v16.13.2](https://nodejs.org/download/release/v16.13.2) was used to develop the app (npm v8.5.3).

```cmd
# Running the server
$ npm ci
$ npm start
```

## 🐳 Install and run (with Docker)
> [Docker](https://docs.docker.com/desktop/windows/install) is needed to run!

```docker
# Running the server
$ docker run -d --name capitole-automated-checkin -p 4004:4004 aletid5/capitole-automated-checkin
```

## 🔥 Features
- Automated login/logout
- Simple custom configuration

## 👻 LICENCE
[WTFPL](http://www.wtfpl.net/about/)
