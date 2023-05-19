# discord-dust-game-bot a.k.a Archivist Nebo

A discord bot built using the tutorial from [discord.js](https://discordjs.guide/#before-you-begin) and the [discord-ecomomy-super](https://des-docs.js.org/#/) package and documentaion.

Note: Make sure you navigate to `/packages/discord-dust-game-bot` to make any changes/updates to the bot.

## How to Run Local from a Test Discord Server

if you need to create a test server and test bot:

Follow the instructions [here](https://support.discord.com/hc/en-us/articles/204849977-How-do-I-create-a-server-) to create your own server and [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) to create your test bot.

and then follow the instructions below:

1. copy `.env.default` variables to `.env` file
2. update `.env` with the correct values (tokens, clientId, guildId, mongo url)
3. run `yarn` to install/update packages
4. run `node deploy-commands.js` to register commands to server (if editing slash commands)
   otherwise
5. run `node .` to start

## How to Add a New/Update Slash Command(s):

to create new command:

1. create new file in commands folder
2. run `node deploy-commands.js` to register command(s) on server

to update existing command(s):

1. open command file that you want to edit
2. run `node deploy-commands.js` to update command(s) on server

## Deploy to Production:

Please go through this checklist before you push/deploy to production branch:

1. verify that `.env` variables are in the environment for production on Render and point to production Discord server
2. verify that the `render.yaml` file is set for the bot and database to point to associated services on Render
3. verify that dockerfile has lastest version of mongodb

## How to Create Local Database with MongoDB

Note: Make sure you have Docker installed on your machine.

to initially create the database:
You can follow the instruction [here](https://medium.com/@szpytfire/setting-up-mongodb-within-a-docker-container-for-local-development-327e32a2b68d)

if you have an existing set-up:

1. start up Docker Dektop
2. navigate to `docker-compose.yml` file and uncomment the `mongodb_container` section so the database will boot
3. run `docker compose up -d` in your terminal
4. run `docker ps` to list running databases
5. run `docker exec -it [name_of_your_mongodb_container] bash` to boot up mongo
6. run `mongosh -u root -p rootpassword` to connect
