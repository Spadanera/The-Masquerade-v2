# Vampire The Masquerade - Role Playing Game - Web App

Web app to help story-teller to manage his chronicle, players, characters and so on. Also players could access the portal to handle their characters.

## Run the application

To run the application it is necessary docker installed on your machine. 

First of all, clone this repository. After that run the following command in the root folder:

```
npm run install
```

```
npm start
```

After that you can access the application at:

http://localhost

## Docker structure

There are 4 services defined in docker compose:

1. client: carbon image that hosts the client of the application based on VUE.js
2. server: carbon image that hosts the API served via express.js
3. server-database: mangoDb image
4. proxy: nginx image that works as proxy between client and server