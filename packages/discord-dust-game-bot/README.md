# discord-dust-game-bot a.k.a Archivist Nebo

A discord bot built using the tutorial from [discord.js](https://discordjs.guide/#before-you-begin) and the [discord-ecomomy-super](https://des-docs.js.org/#/) package.

Note: Make sure you navigate to `/packages/discord-dust-game-bot` to make any changes/updates to the bot

## How to Run Local from a Test Discord Server

if you need to create a test server and test bot:

Follow the instructions [here](https://support.discord.com/hc/en-us/articles/204849977-How-do-I-create-a-server-) to create your own server and [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) to create you test bot

then follow the instructions below:

1. copy `.env.default` variables to `.env` file
2. update `.env` with the correct values (tokens, guildIDs, etc.)
3. run `yarn` to install/update packages
4. run `node deploy-commands.js` to register (if editing slash commands)
5. run `node .` to start

## How to Add a New/Update Slash Command(s):

to create new command:

1. create new file in commands folder
2. run `node deploy-commands.js` to register command(s) on server

to update existing commands

1. open command file that you want to edit
2. run `node deploy-commands.js` to update command(s) on server

## Deploy to Production:

Please go through this checklist for a successful deployment to production branch:

1. verify that env variables are in the production and point to prod discord server/channel
2. verify that render yaml is set up for start up and connected to database
3. verify that dockerfile has lastest version of mongodb

## How to Create Local Database with MongoDB

Note: Make sure you have Docker installed on your machine.

to initially create the database:
You can follow the instruction [here](https://medium.com/@szpytfire/setting-up-mongodb-within-a-docker-container-for-local-development-327e32a2b68d)

if you have an existing set-up:

1. start up Docker Dektop
2. run `docker compose up -d` in your terminal
3. run `docker ps` to list running databases
4. run `docker exec -it [name_of_your_mongodb_container] bash` to boot up mongo
5. run `mongosh -u root -p rootpassword` to connect

## How to Run Backup to Database
