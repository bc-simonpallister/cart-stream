# BigCommerce Cart Stream

View and change the contents of customer's carts in realtime using webhooks & sockets

## Setup

App is in two parts:

- Server - listens to webhooks, emits over socket and acts as API for updates
- Client - React based client

### Server

Credentials are currently hard coded:

Add `STORE_ID` & `AUTH_TOKEN` to .env.template & rename to .env (see Local Tunnel below for running locally)

    cd server
    npm run dev


### Client

Credentials are currently hard coded:

Add `STORE_ID` & `STORE_ID` to .env.template & rename to .env

    cd client
    npm run start

### Local Tunnel

For developing locallly, there is a script that will create a local tunnel (using [localtunnel](https://github.com/localtunnel/localtunnel)) to creates a webhook on the specified server using credentials

    cd server
    npm run tunnel

---
## TODO

A *lot*, but including:

### Server
- better manage auth

### Client
- create login process
- remove hard coded auth
- make client scalable for holding events
- better search
- more cart info, more editing capabilities
- view customer info

