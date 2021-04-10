<p style="display: flex; align-items: center; justify-content: center; font-size: 48px; font-weight: bold">
    Boxial Dashboard
    <img src="readme/boxial.png" style="width: 80px; margin-left: 25px; border-radius: 8px" />
</p>

A virtual machine dashboard manager using React, Express and NodeJS

![](readme/login.png)

![](readme/machines.png)

![](readme/host.png)

## Setup

### Install dependencies

Install the dependencies for the client and server.

```bash
# in one terminal window
cd server && npm i
# in another terminal window
cd client && npm i
```

### Start server

An Express server is exposes an API for accessing virtual machine data and host data. Configure MySQL credentials on `server/env/db-credentials.js`, dump the `server/auth/boxial_starter.sql` to create database structure containing the admin credentials.

```bash
# in /server
npm start
```

> Server is running on `localhost:8000`.

### Start client

A React server for the front end.

```bash
# in /client
npm start
```

> Client dev server is running on `localhost:3000`.

You can view the app at `localhost:3000`. Log in with `admin` user and  password `admin`

### Production build

Run `npm run build` on `client` and `server`.