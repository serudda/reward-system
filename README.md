# Reward System

<!-- <img width="1758" alt="turbo2" src="https://user-images.githubusercontent.com/51714798/213819392-33e50db9-3e38-4c51-9a22-03abe5e48f3d.png">
 -->

Introducing the perfect companion for your Discord community! 💻🚀 This reward calculation bot is the ultimate tool for those seeking recognition for their contributions. From small code tweaks to large collaborative projects, this bot is equipped to calculate and display the rewards deserved for each contribution. ⚙️💰 With its precision and speed, this bot will make your creators feel valued and motivated to keep working in the community. Don't wait any longer to add it to your Discord server and give your members the gratification they deserve! 💯💪

```
.github
  └─ workflows
        └─ CI (GitHub Actions) with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ bot
  |   ├─ Node
  |   ├─ Discord JS
  |   ├─ tRPC Client
  |   └─ TypeScript
  └─ nextjs
      ├─ Next.js 13
      ├─ React 18
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition
 ├─ auth
 |    └─ authentication using next-auth. **NOTE: Only with Discord**
 ├─ config
 |    ├─ eslint
 |    |     └─ Eslint global configuration
 |    └─ tailwind
 |          └─ Tailwind global configuration **NOTE: Currently only for apps/nextjs**
 └─ db
     └─ typesafe db-calls using Prisma
```

# Run Project

As the project uses Turborepo, you could run the following commands on the root, and it will run every inner same command.

## Run the Main Project

### Setup .env file

```dotenv
DATABASE_URL=""

NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
DISCORD_BOT_TOKEN=""
```


### For development mode
Install Dependencies
`pnpm install`

Sync the app with your database (if it is a new database and has not been previously synchronized)
`pnpm run db:push --filter=@acme/db`

Run the app locally
`pnpm dev`

### For production
Install Dependencies
`pnpm install`

Build the app
`pnpm build`
(turbo repo internally run
`pnpm run db:push --filter=@acme/db`)

Run the app locally
`pnpm start`

## Run the Bot

Install Dependencies (if this is the first time you run this command)
`pnpm install`

Sync the app with your database (if it is a new database and has not been previously synchronized)
`pnpm run db:push --filter=@acme/db`

Run the bot
`pnpm run dev --filter=@acme/bot`
or
`pnpm run start --filter=@acme/bot`

**NOTE: The --filter argument allows us to execute a command or script from a specific workspace, in this case, the name of the workspace is defined in the package.json of the workspace**

![Create new project](https://res.cloudinary.com/dp0gqoxaa/image/upload/v1679091311/reward-system/007.png)

# How can I contribute ?

It is an open-source project, check the issues and join our discord to be part of this community.

## Quick Start

To get it running, follow the steps below:

### Configure DB (SUPABASE) for packages/db workspace

Create a new project in Supabase, go to settings / database / Connection string(URI).
[more details here](https://supabase.com/docs/guides/integrations/prisma)

#### Optional

If you use and have docker compose installed, you can locally use a postgrest database version 15 (which uses supabase under the hood), with the following command:

```docker
docker-compose up
```

And add the DATABASE_URL enviroment as:
```dotenv
 DATABASE_URL="postgresql://root:123456@localhost:5432/my_db?schema=public"
```

For change user, password, db name or version database modify the service postgres in the docker-compose.yml file.

**IMPORTANT: If you are working for the first time with the monorepo and you have problems with the prisma client, perhaps you should run the following command to sync with your database:**
``` npm
pnpm run db:push --filter=@acme/db
```


### Configure apps/nextjs workspace

`NEXTAUTH_URL` as localhost for dev mode.

`NEXTAUTH_SECRET` as any string with a minimum size of 1.

### Configure DISCORD BOT for apps/bot workspace

1. [Go to the Discord Developer Portal](https://discordapp.com/developers/applications/).
2. Create a New Application.
   ![Application](https://res.cloudinary.com/dwtba7bmh/image/upload/v1678755937/o1vaqzbm7f6tozark9yo.png 'Application')
3. Your next step is to go over the menu on the left side of the screen and click “Bot”.

   ![Bot](https://res.cloudinary.com/dwtba7bmh/image/upload/v1678756136/pwgtlao3pd9evqedtnxm.png 'Bot')

4. Now you want to click the blue “Add Bot” button.
   ![Add Bot](https://res.cloudinary.com/dwtba7bmh/image/upload/v1678756280/wcr0nny5wdcd8fovf768.png 'AddBot')
5. Click the “Yes, do it!” button…
6. You’ll also see a “Token” and a blue link you can click called “Copy”.
   ![Token](https://res.cloudinary.com/dwtba7bmh/image/upload/v1678756280/x3f9nk65tq5szib6jb22.png 'Token')

`DISCORD_BOT_TOKEN="YOUR_TOKEN"`

7. Add Your Bot to a Discord Server
8. In order to add your bot to your Discord Server, you’ll need to navigate back to the “OAuth2” "URL GENERATOR" tab.

   ![Token](https://res.cloudinary.com/dwtba7bmh/image/upload/v1678759651/pw1svnypnnbvbt0ceczt.png 'Token')

9. In the “Scopes” section, you’ll want to select the “bot” checkbox.
   ![Token](https://res.cloudinary.com/dwtba7bmh/image/upload/v1678759632/ntra1xoyhye5r3tixy9c.png 'Token')
10. “Bot Permissions” section. This is where you choose what permissions to give your bot, and what it can and can’t do.
11. After you’ve selected your permissions, scroll up a little bit and look at the URL that was generated.
12. Click the blue “Copy” button on the right side. This is the URL you’ll navigate to in order to add your bot to a server.

### Configure DISCORD KEYS

1. you’ll need to navigate back to the “OAuth2” "GENERAL" tab.
2. Copy "CLIENT ID"

   ![Token](https://res.cloudinary.com/dwtba7bmh/image/upload/v1678759900/qxbzfxoseuesr8eza5ic.png 'Token')

`DISCORD_CLIENT_ID="1xxxxxxxxx"`

3. Click the blue “Reset Secret” button.
4. Click “YES” button.
5. You’ll also see a “Token” and a blue link you can click called “Copy”.

`DISCORD_CLIENT_SECRET="SECRET_TOKEN"`

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).

A [blog post](https://jumr.dev/blog/t3-turbo) where I wrote how to migrate a T3 app into this.

## Railway Deployment

**Note: It is considered that you already have a fork of the repository and you have already verified your github account with Railway**

### Deploy monorepo

1. First in your dashboard, create a new project.

   ![Create new project](https://res.cloudinary.com/dp0gqoxaa/image/upload/v1679086808/reward-system/001.png)

2. Select "Deploy form GitHub repo" -> select your repository fork -> "Add variables"

   ![Create new project](https://res.cloudinary.com/dp0gqoxaa/image/upload/v1679087162/reward-system/002.png)

3. In the raw edition, add the content of the .env file

   ![Create new project](https://res.cloudinary.com/dp0gqoxaa/image/upload/v1679087448/reward-system/003.png)

4. Then go to tab settings. In the environment section, select the branch you want to deploy, (modifying this field will launch the deployment automatically, so you can leave it as the last step), and generate a domain.

   ![Create new project](https://res.cloudinary.com/dp0gqoxaa/image/upload/v1679088113/reward-system/004.png)

5. In the service/general section, make sure you have "/" as the root directory and in the service/build section you have the build command set to "pnpm run build"

   ![Create new project](https://res.cloudinary.com/dp0gqoxaa/image/upload/v1679090167/reward-system/005.png)

6. And finally you have in the service/deploy section the start command as "pnpm start"

   ![Create new project](https://res.cloudinary.com/dp0gqoxaa/image/upload/v1679090329/reward-system/006.png)


### Deploy only bot

1. Steps 1 to 4 are done in the same way.
2. In the service/general section, make sure you have "/" as the root directory and in the service/build section you have the build command field empty
3. And finally you have in the service/deploy section the start command as "pnpm start --filter=@acme/bot"
