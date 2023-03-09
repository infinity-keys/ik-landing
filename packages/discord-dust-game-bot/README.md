# how to use this bot file:

**make sure you navigate to `/packages/discord-dust-game-bot` to make any changes

how to run locally (to test functionality)

if you need to create test server
1. how to create your own server and channel on Discord (create link)
  have instructions on how to do said above

otherwise
1. copy .env.default values to .env file
2. update .env with correct secrets
3. run `yarn` to install/update packages
4. run `node deploy-commands.js` to register ()
4. run `node .` to start

section for prod
1. verify that env variables are in the production and point to prod discord server/channel
2. verify that render yaml is set up for start up and connected to database
3. verify that dockerfile has lastest version of mongodb


how to add a new/update commands
-to create new command
  create new file in commands folder
  run deploy commands script locally to update commands on server

- to update existing commands
  open command file that you want to edit
  run run deploy commands script locally to update commands on server

to backup database

how to create local database with mongo
