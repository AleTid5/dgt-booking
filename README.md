
# DGT Automated Service
![Node](https://img.shields.io/badge/-Node-333?logo=node.js&style=for-the-badge)
![Nestjs](https://img.shields.io/badge/-Nestjs-E0234E?logo=nestjs&style=for-the-badge)
![Typescript](https://img.shields.io/badge/-Typescript-2c3b5a?logo=typescript&style=for-the-badge)
![Docker](https://img.shields.io/badge/-Docker-031f30?logo=Docker&style=for-the-badge)
![PM2](https://img.shields.io/badge/-PM2-2c3b5a?logo=pm2&style=for-the-badge)

## 💻 Install and run (simple)
```cmd
$ npm ci
$ npm start
```

## 💻 Install and run (with PM2) [Recommended]
> This way will run the application in the background.

```cmd
$ npm ci
$ npm run start:pm2
```

> Note: To run this service automatically after system reboot, use this command (Maybe you need to install **PM2** globally *npm i -g pm2*)

```cmd
$ pm2 startup systemd
$ pm2 save
```

## 🐳 Install and run (with Docker)
> [Docker](https://docs.docker.com/desktop/windows/install) should be installed.

```docker
$ docker run -d --name capitole-automated-checkin -p 4004:4004 --env-file .env aletid5/capitole-automated-checkin
```
> Notes: Will run the server in detached mode

## 👻 LICENCE
[WTFPL](http://www.wtfpl.net/about/)
