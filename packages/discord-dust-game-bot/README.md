# discord-dust-game-bot a.k.a Archivist Nebo

A discord bot built using the tutorial from [discord.js](https://discordjs.guide/#before-you-begin) and the [discord-ecomomy-super](https://des-docs.js.org/#/) package.

Note: Make sure you navigate to `/packages/discord-dust-game-bot` to make any changes/updates to the bot

## How to Run Local from a Test Discord Server

if you need to create test server:

```shell
Follow the instructions [here] to create your own server
```

otherwise

1. copy `.env.default` values to `.env` file
2. update `.env` with the correct secrets (tokens, guildIDs, etc.)
3. run `yarn` to install/update packages
4. run `node deploy-commands.js` to register (if editing slash commands)
5. run `node .` to start

## how to add a new/update commands:

-to create new command
create new file in commands folder
run deploy commands script locally to update commands on server

- to update existing commands
  open command file that you want to edit
  run run deploy commands script locally to update commands on server

when deploying to productions:

1. verify that env variables are in the production and point to prod discord server/channel
2. verify that render yaml is set up for start up and connected to database
3. verify that dockerfile has lastest version of mongodb

to backup database

how to create local database with mongo
