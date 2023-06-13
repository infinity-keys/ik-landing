# README

Welcome to [RedwoodJS](https://redwoodjs.com)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
cd my-redwood-project
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910 where you'll see the Welcome Page, which links out to a ton of great resources.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command!
> From dev to deploy, the CLI is with you the whole way.
> And there's quite a few commands at your disposal:
>
> ```
> yarn redwood --help
> ```
>
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

## Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood g scaffold post
```

Navigate to http://localhost:8910/posts/new, fill in the title and body, and click "Save":

Did we just create a post in the database? Yup! With `yarn rw g scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

## Frontend first with Storybook

Don't know what your data models look like?
That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data.
Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
```

Before you start, see if the CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

## Testing with Jest

It'd be hard to scale from side project to startup without a few tests.
Redwood fully integrates Jest with the front and the backends and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing.md#scenarios) and [GraphQL mocking](https://redwoodjs.com/docs/testing.md#mocking-graphql-calls).

## Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth!
Lock down your front and backends with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third party auth providers:

```
yarn rw setup auth --help
```

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)

# IK Team Notes

Download [Docker Desktop](https://www.docker.com/products/docker-desktop/) and get the latest `.env` file from an IK team member.

# Local Env (Windows)

## Installing Linux on Windows with WSL2

Follow [these instructions](https://learn.microsoft.com/en-us/windows/wsl/install) in PowerShell to install WSL2.

**NOTE: your user account must be an administrator on your machine** -you cannot run PowerShell _'as an administrator'_ from a non admin user account because doing so will prevent installs. To install WSL2, run:

`$ wsl --install`

Use version 2:

`$ wsl --set-default-version 2`

## Installing Ubuntu on WSL2

In PowerShell run:

`$ wsl --install -d Ubuntu`

(If the command above is failing, you may not have admin privileges)

Update to the latest version:

`$ wsl --update`

## Using Windows Terminal

Go to the Windows App store and install Terminal to access Ubuntu.

Fetch the latest version of the package list from your distro's software repository.

`$ sudo apt update`

Download and install updates for each outdated package and dependency on your system.

`$ sudo apt upgrade`

Install Node Version Manager, ask Bloom why we use v18? (latest?)

`$ nvm install v18`

## Installing Yarn

Follow these instruction [here](https://yarnpkg.com/getting-started/install).

Enable `corepack`, a zero-runtime-dependency Node script that acts a bridge between Node projects and package managers like Yarn. It is included with Node.js:

`$ corepack enable`

Updating the global Yarn version

`$ corepack prepare yarn@stable --activate`

Ensure you have yarn v.3 and not v.4; Redwood.js will not run on v.4:

`$ yarn --version`

## Connecting to GitHub

Follow [these instructions](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/GitHub-SSH-Key-Setup-Config-Ubuntu-Linux) after an IK team member has authorized you access to the KI repo.

# IK Instructions

## Local db

### Setting up db for the first time

1. Install Docker for Mac/Windows
2. Run:

```bash
docker-compose up -d
```

3. Ensure root `.env` contains the line:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?connection_limit=1"
```

4. Install [Beekeeper Studio Community Edition](https://github.com/beekeeper-studio/beekeeper-studio/releases)
5. Within Beekeeper Studio, connect to this database with the following settings:

```
Connection type: Postgres
Connection mode: Host and Port
Host: localhost
Port: 5432
Enable SSL: disabled
User: postgres
Password: postgres
Default Database: postgres
SSH Tunnel: disabled
```

6. Click "Connect" and note there are no tables yet.

### Daily db interaction

Turn off the db by running:

```bash
docker-compose down
```

Turn on the db by running:

```bash
docker-compose up -d
```

Migrate all database tables and columns (but NOT actual data):

```bash

yarn rw prisma migrate dev
```

Migrate all database tables and clumns WITH data pulled from v1.0 IK:

```bash
yarn rw prisma migrate reset --force
```

## Local dev

Builds all custom workspaces packages and start Redwood dev. (You'll use this daily!)

```bash
yarn build && yarn rw dev
```

## Publish a Package

```bash
npm version patch
```

```bash
yarn npm publish --access public
```

## Tests

`yarn rw test api <filename>`

### For Mac Users

`homebrew install watchman`

There can be a permissions error that happens in MacOS if project is in Documents. [Fix is here.](https://github.com/facebook/watchman/issues/977#issuecomment-1189903929)

`watch-del-all`
`watchman shutdown-server`

## Contract Addresses

avax: 0xB40fD6825a366081192d890d2760113C066761Ef
ethereum: 0x54b743D6055e3BBBF13eb2C748A3783516156e5B
polygon: 0x7e8E97A66A935061B2f5a8576226175c4fdE0ff9
optimism: 0x54b743D6055e3BBBF13eb2C748A3783516156e5B

## Discord Bots (Mint and Vote-Alert)

A customizable discord bot to display alerts when users mints NFTs and votes are casted on blockchain

You can follow the instructions [here](https://docs.moralis.io/example-dapps/evm/blockchain-discord-bot) to use as a template to create.

Both bots use discord.js `EmbedBuilder` feature found [here](https://discordjs.guide/popular-topics/embeds.html#embed-preview) to style the posts/alerts.

Note: Make sure you navigate to `api/src/functions` to make any changes/updates to the bots.

### How to Run Local from a Test Discord Server

Note: You need to have `ngrok` installed and running in order to test locally. You can follow the setup instructions [here](https://dashboard.ngrok.com/get-started/setup)

if you need to create a test server and test bot:

Follow the instructions [here](https://support.discord.com/hc/en-us/articles/204849977-How-do-I-create-a-server-) to create your own server and [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) to create your test bot.

Note: Make sure you have Docker installed on your machine.

to initially create the database:
You can follow the instruction [here](https://medium.com/@szpytfire/setting-up-mongodb-within-a-docker-container-for-local-development-327e32a2b68d)

and then follow the instructions below:

1. update `.env` with the correct values (api key, bot token, discord channel id, etc.)
2. run `yarn` to install/update packages
3. run `docker compose up -d` then run your local dev server `yarn dev`
4. run `ngrok http [port-number]` to boot up your server
5. copy the webhook url starting with `https` from the ngrok startup screen
6. login into [moralis.io](http://www.moralis.io) to update the webhook url to the Moralis stream by selecting `Edit Stream`
7. make sure moralis stream is set to `Activate Stream` to start receiving post to the discord channel

** Once testing is complete, make sure to update all .env variables to point to the production Discord server and the webhook url in Moralis to the appropiate api url i.e.: `http:"//api.infinitykeys.io/[name of discord bot file]` **

## Adding a New Step Type

### Schema and Types

1. Add the new step type model to `api/db/schema.prisma`

```prisma
model StepTest {
  id String @id @default(cuid())

  step   Step   @relation(fields: [stepId], references: [id])
  stepId String @unique

  // unique data here
  customText String
}
```

2. Add this new model to the step model

```prisma
model Step {
  // Step types
  stepTest     StepTest?
}
```

3. Add a corresponding entry to the StepType enum

```prisma
enum StepType {
  /// corresponds to the StepTest model
  TEST
}
```

4. `yarn rw prisma migrate dev`

5. `yarn rw g sdl StepTest`

6. Add the new types to the `steps.sdl.ts` file

```graphql
type Step {
  stepTest: StepTest
}

enum StepType {
  TEST
}
```

7. Add the new types to the `rewardables.sdl.ts` file

```graphql
input StepTypeData {
  stepTest: UpdateStepTestInput
}
```

### Services

1. In `api/src/lib/makeAttempt.ts` we need to add a few things.

Add the new step type to the `getStep` function's db query

```ts
return db.step.findUnique({
  where: { id },
  select: {
    type: true,
  }
  stepTest: {
    select: {
      customText: true,
    },
  },
  // ...
})
```

**Optional:** If the info your step sends from the front end differs from what we already have in place, you will have to add the zod type and a check in the `getAttempt` function:

```ts
const NewThingData = z.object({
  type: z.literal('new-thing'),
  newThing: z.string(),
})

export const getAttempt = (solutionData: SolutionDataType) => {
  if ('newThing' in solutionData) return solutionData.newThing
  // ...
}
```

2. Create the lib function that checks whether or not the user has completed this step type. This function should return `success?: boolean` and `errors?: string[]`

`api/src/lib/checkTest.ts`

```ts
import { logger } from 'src/lib/logger'

export const checkTest = async ({
  account,
  customText,
}: {
  account: string
  customText: string
}) => {
  try {
    const success = account.includes(customText)
    return { success }
  } catch {
    logger.error(`Failed Test check for ${account}`)
    return { errors: ['Error checking Test.'] }
  }
}
```

3. In the `api/src/services/ik/attempts/attempts.ts` add a new check for this step type, add call your custom lib function in there.

```ts
if (step.type === 'TEST') {
  if (!step.stepTest) {
    throw new Error('Cannot create attempt - missing data for "stepTest"')
  }

  const { id: attemptId } = await createAttempt(stepId)

  // Your custom function goes here
  const { success, errors } = await checkTest({
    account: userAttempt,
    customText: step.stepTest.customText,
  })

  const response = await createResponse({
    success,
    attemptId,
    finalStep,
    errors,
    rewardable: step.puzzle.rewardable,
  })

  return response
} // end of TEST
```

### React

**Note**: If you are only sending a wallet address to the backend, you can skip ahead to step 3

1. Create a new component for the step type

`yarn rw g component StepTest`

2. Call `makeAttempt` from the `useMakeAttempt` hook with whatever data you need.

```tsx
const { loading, failedAttempt, errorMessage, makeAttempt } = useMakeAttempt()

const handleClick = async () => {
  await makeAttempt({
    stepId: step.id,
    puzzleId,
    reqBody: {
      type: 'account-check',
      account: address,
    },
  })
}
```

**Note:** If you had to add an option zod type in step one of the Services section above, the data in the makeAttempt function will have to match:

The type in `api/src/lib/makeAttempt.ts`

```ts
const NewThingData = z.object({
  type: z.literal('new-thing'),
  newThing: z.string(),
})
```

The function in your step component:

```tsx
const handleClick = async () => {
  await makeAttempt({
    stepId: step.id,
    puzzleId,
    reqBody: {
      type: 'new-thing',
      newThing: 'some-string',
    },
  })
}
```

3. Add the new component to the `web/src/components/StepsLayout/StepsLayout.tsx` file:

For step using the existing `AccountCheckButton` component

```tsx
{(
  // ...
  step.type === 'TOKEN_ID_RANGE' ||
  step.type === 'TEST') && (
  <div className="pt-8">
    <AccountCheckButton step={step} puzzleId={puzzle.id} />
  </div>
)}
```

**Note**: If your new step needed a new component, it will need to be lazy loaded instead.

```tsx
const StepTest = lazy(
  () => import('src/components/StepTest/StepTest')
)

const StepsLayout = ({
  //...
}: StepsLayoutProps) => {
  //...

  return (
    <div>
      // ...
      {step.type === 'TEST' && (
        <div className="pt-8">
          <StepTest step={step} puzzleId={puzzle.id} />
        </div>
      )}
    </div>
  )
}
```

## Custom Markdown

### Embeds

For the markdown fields (ie, Step Challenge, Puzzle Explanation) we can embed an iframe using a link and aspect ratio:

```md
[optional alt text | 16/9](https://embedabble.link)
```

### Pagination

Fields that use the Collapsible Markdown component (ie, Challenge, Hint) can be paginated using `===`

```md
This will be the first page===This will be the second
```
