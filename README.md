# README

Welcome to Infinity Keys on [RedwoodJS](https://redwoodjs.com)! The first part of this readme is the documentation straight from a new RedwoodJS project. The second part is features specific to Infinity Keys.

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>= 18) and [Yarn](https://yarnpkg.com/) (>=1.15)
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

Your browser should automatically open to http://localhost:8910. NOTE: the IK landing pages does not require a database connection, so make sure you read the Docker instructions below to spin up a local Postgres DB before navigating further!

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

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and notice the `Rewardable` model:

```
model Rewardable {
  id        Int      @id @default(cuid())
  createdAt      DateTime            @default(now())
  updatedAt      DateTime            @updatedAt
  trashedAt      DateTime?
  // ...
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free. See the [RedwoodJS documentation on Migrations](https://docs.redwoodjs.com/docs/data-migrations/).

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

Note: not all Infinity Keys components work in Storybook. Storybook needs some work.

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

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)

# IK Team Notes

What follows are notes specifically about Infinity Keys and this project's architecture.

## Docker

Download [Docker Desktop](https://www.docker.com/products/docker-desktop/) and get the latest `.env` file from an IK team member.

## Installing Yarn

Follow these instruction [here](https://yarnpkg.com/getting-started/install).

Enable `corepack`, a zero-runtime-dependency Node script that acts a bridge between Node projects and package managers like Yarn. It is included with Node.js:

`$ corepack enable`

Updating the global Yarn version

`$ corepack prepare yarn@stable --activate`

Ensure you have yarn v.3 and not v.4; Redwood.js will not run on v.4:

`$ yarn --version`

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

Migrate all database tables and columns WITH data pulled from v1.0 IK:

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

## Contract Addresses

- avax: 0xB40fD6825a366081192d890d2760113C066761Ef
- ethereum: 0x54b743D6055e3BBBF13eb2C748A3783516156e5B
- polygon: 0x7e8E97A66A935061B2f5a8576226175c4fdE0ff9
- optimism: 0x54b743D6055e3BBBF13eb2C748A3783516156e5B

## Adding a New Step Type

Infinity Keys works under a system of "Rewardables" which have "Steps". A Rewardable is anything that rewards the user with something. Each Rewardable has 1 or more Steps. Each Step can have different ways of playing (StepType).

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

## IK Puzzle Form

### User Interface

Click on the Create button or navigate to `/puzzle/create` in order to create a new puzzle. Each puzzle has one or more steps, this is where you ask the user a question and define the answer that the user must provide in order to complete the step. Fields also exist for images & hints you can provide for a more enriched experience.

The summary section allows a user to _list publicly_ which makes the puzzle available to anyone visiting the site. The option to _not_ list publicly enables a creator to restrict access to those who share the same `OrgId` as the creator.

The current configuration does not allow users to assign NFT's to puzzles or interact with blockchains, however, several frontend components and backend services are partially implemented to support this functionality.

### Design Architecture

RedwoodJS helper components are used wherever possible per the [docs](https://docs.redwoodjs.com/docs/forms/) but many of these helpers do not work well in nested or conditional forms. The `react-hook-form` library is used to manage the form state and validation.

The form is located here:
`web/src/components/PuzzleForm/PuzzleForm.tsx`
...other forms in this repo may be outdated.

The `type` definitions for each component are under the import statements, at the top of file. These include the straightforward `type PuzzleFormType` as well as the more contrived `type CreateAllStepTypesInput` that must handle each type of step that can be created.

The parent function is the `PuzzleForm` which is the exported function. The `PuzzleForm` has 1 or more instances of a child `StepForm` which in turn is one of several `stepType` variations. Currently, only the `SIMPLE_TEXT` step type is fully functional.

These steps are stored in an array called `stepsArrayName`, with each step having properties like stepSortWeight to determine its order and `stepGuideType` to guide users through the process. The form supports various step types, including `SIMPLE_TEXT`, `NFT_CHECK`, `FUNCTION_CALL`, `COMETH_API`, and `TOKEN_ID_RANGE`. However, only the `SIMPLE_TEXT` type is currently fully functional.

Most styling is done with TailwindCSS, but we plan to implement Block, Element Modifiers (BEM) for the various elements in the form. This work can be found at: `web/src/index.css`
