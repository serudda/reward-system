# Reward System

<!-- <img width="1758" alt="turbo2" src="https://user-images.githubusercontent.com/51714798/213819392-33e50db9-3e38-4c51-9a22-03abe5e48f3d.png">
 -->

Introducing the perfect companion for your Discord community! 💻🚀 This reward calculation bot is the ultimate tool for those seeking recognition for their contributions. From small code tweaks to large collaborative projects, this bot is equipped to calculate and display the rewards deserved for each contribution. ⚙️💰 With its precision and speed, this bot will make your creators feel valued and motivated to keep working in the community. Don't wait any longer to add it to your Discord server and give your members the gratification they deserve! 💯💪

```
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ bot
  |   ├─ Node
  |   ├─ Discord JS
  |   ├─ tRPC Client
  |   └─ TypeScript
  └─ next.js
      ├─ Next.js 13
      ├─ React 18
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition
 ├─ auth
     └─ authentication using next-auth. **NOTE: Only with Discord**
 └─ db
     └─ typesafe db-calls using Prisma
```

# Run Project

As the project uses Turborepo, you could run the following commands on the root, and it will run every inner same command.

## Run the Main Project

Install Dependencies
`pnpm install`

Prepare Husky
`pnpm prepare`

Build the app
`pnpm build`

Run the app locally
`pnpm dev`

## Run the Bot

Install Dependencies (if this is the first time you run this command)
`pnpm install`

Run the bot
`pnpm start`

# How can I contribute ?

It is an open-source project, check the issues and join our discord to be part of this community.

## Quick Start

To get it running, follow the steps below:

### Setup .ENV

```
DATABASE_URL=""

NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
DISCORD_BOT_TOKEN=""
```

### Configure DB (SUPABASE)

Create a new project in Supabase, go to settings / database / Connection string(URI).
[more details here](https://supabase.com/docs/guides/integrations/prisma)

### Configure NEXT AUTH

`NEXTAUTH_URL` Your localhost.

### Configure DISCORD BOT

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

Test the Github GraphQL schema here:
https://studio.apollographql.com/public/github/explorer?variant=current

-----

<h2 id="contributors">Contributors</h2>

<a href="https://github.com/serudda/reward-system/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=serudda/reward-system" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
