<!-- For later
implement badges
 -->

# Reward System

<!-- <img width="1758" alt="turbo2" src="https://user-images.githubusercontent.com/51714798/213819392-33e50db9-3e38-4c51-9a22-03abe5e48f3d.png">
 -->

Introducing the perfect companion for your Discord community! 💻🚀 This reward calculation bot is the ultimate tool for those seeking recognition for their contributions. From small code tweaks to large collaborative projects, this bot is equipped to calculate and display the rewards deserved for each contribution. ⚙️💰 With its precision and speed, this bot will make your creators feel valued and motivated to keep working in the community. Don't wait any longer to add it to your Discord server and give your members the gratification they deserve! 💯💪

<!-- Add an image here if you have one that showcases the bot in action -->

## Table of Contents

- [Pre-requisites](#pre-requisites)
- [Project File Tree](#project-file-tree)
- [Installation](#installation)
  - [Run the Main Project](#run-the-main-project)
- [Usage](#usage)
  - [Setup .ENV](#setup-env)
  - [Configure DB (SUPABASE)](#configure-db-supabase)
  - [Configure DISCORD BOT](#configure-discord-bot)
  - [Configure DISCORD KEYS](#configure-discord-keys)
  - [Configure Discord WEBHOOKS](#configure-discord-webhooks)
- [How can I contribute?](#how-can-i-contribute)
  - [Support](#support)
  - [Join Our Community](#join-our-community)
  - [Read the Contribution Guidelines](#read-the-contribution-guidelines)
  - [Security](#security)
- [License](#license)
- [Contributors](#contributors)

# Getting Started

## Pre-requisites

Before you start, make sure you have the following:

- [Node.js version 16 or higher](https://nodejs.org/en)
- [pnpm package manager](https://pnpm.io/)
- [Discord account for bot development and testing](https://discord.com/)

## Project File Tree

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
     └─ authentication using next-auth. NOTE: Only with Discord
 └─ db
     └─ typesafe db-calls using Prisma
```

<div align="right">

[ [ ↑ to top ↑ ] ](#reward-system)

</div>

# Installation

As the project uses Turborepo, you could run the following commands on the root, and it will run every inner same command.

> **Note** Ensure you have set the [enviorimental variables](#setup-env) before running the project

## Run the Main Project

1. Install the project dependencies by running `pnpm install`.
2. Build the project by running `pnpm build`.
3. Start the project by running `pnpm dev`.

> **Note** `pnpm dev` will run discord and nextjs project

<details>
<summary>Example:</summary>

![installation](https://user-images.githubusercontent.com/14036522/229316191-7ad59c83-f175-47ad-8faf-1e2454fb1df8.gif)

</details>

<div align="right">

[ [ ↑ to top ↑ ] ](#reward-system)

</div>

# Usage

To get it running, follow the steps below:

## Setup .ENV

You will find a `.env.example` file in your project's root directory. Use it as a template for your own `.env`.

<details>
<summary>Explanation of Required Environment Variables for Database, Discord OAuth2 and Bot Authentication</summary>
<br/>

These are environment variables that you need to set in order to use Discord's OAuth2 API and to authenticate your bot with Discord.

<details>
<summary><code>DATABASE_URL:</code> This is the URL for your database. You need to replace it with the actual URL for your database. </summary>
<br/>

![database-url](https://user-images.githubusercontent.com/10075532/229640763-664c84f1-0cc2-4ea1-be09-dc2544a98478.gif)

</details>

<br/>

<details>
<summary><code>NEXTAUTH_SECRET:</code> This is a secret key used by NextAuth.js for secure session cookies and CSRF protection. You should generate a new secret key and replace it with the placeholder. </summary>
<br/>

![nextauth-secret](https://user-images.githubusercontent.com/10075532/229642940-287c89d9-99e3-4efd-9bf2-d41681e3e210.gif)

</details>

<br/>

<details>
<summary><code>NEXTAUTH_URL:</code> When deploying to production, set the NEXTAUTH_URL environment variable to the canonical URL of your site. if you are working locally, replace with "http://localhost:3000" </summary>
<br/>

![image](https://user-images.githubusercontent.com/10075532/229643178-e8144d10-f4a4-4eb8-879b-56450ad47fdc.png)

</details>

<br/>

<details>
<summary><code>DISCORD_CLIENT_ID:</code> This is the client ID of your Discord application. You can get it from the Discord Developer Portal. </summary>
<br/>

![Discord-client-ID](https://user-images.githubusercontent.com/10075532/229629382-bd8eab3f-fe39-4e7c-bda8-e8aa9b1f73f8.gif)

</details>

<br/>

<details>
<summary><code>DISCORD_CLIENT_SECRET:</code> This is the client secret of your Discord application. You can get it from the Discord Developer Portal. </summary>
<br/>

![discord-client-secret](https://user-images.githubusercontent.com/10075532/229640609-7ed193e5-05e6-4f28-beca-5460307ff3dc.gif)

</details>

<br/>

<details>
<summary><code>DISCORD_SERVER_ID:</code> This is the Discord server ID. You can get it from your own Discord server. </summary>
<br/>

![discord-server-id](https://user-images.githubusercontent.com/10075532/229645001-fe803ef8-cc00-46a3-b7f7-8fd8f11f0965.gif)

</details>

<br/>

<details>
<summary><code>DISCORD_BOT_TOKEN:</code> This is the bot token for your Discord bot. You need to create a bot in the Discord Developer Portal and get the token from there. </summary>
<br/>

![discord-bot-token](https://user-images.githubusercontent.com/10075532/229641003-c9f3596f-8c80-492c-9de9-c11124a3a877.gif)

</details>

<br/>

<details>
<summary><code>DISCORD_WEBHOOK_URL:</code> This is the webhook URL for your Discord server. You can create a webhook in your server settings and get the URL from there. </summary>
<br/>

![discord-webhook-url](https://user-images.githubusercontent.com/10075532/229641185-dc3ca964-e537-4bdc-8bbf-b579b85d744d.gif)

</details>

</details>

<br/>

<details>
<summary> <strong>.env example</strong> </summary>

![image](https://user-images.githubusercontent.com/10075532/229646160-790c15b0-d77e-4631-b5c7-a90d2c5d3dda.png)

</details>

Once you have set these environment variables in your `.env` file, you are ready to run the project.

## Configure DB (SUPABASE)

To use Supabase as your database provider, you'll need to create a new project in Supabase and obtain your connection string URI. Here's how:

1. Create a new project in Supabase.
2. In your project, go to Settings -> Database.
3. Under the "Connection" tab, copy the Connection string (URI).
4. In your project, create a .env.local file at the root of the project folder.
5. In the .env.local file, set the DATABASE_URL variable to your Supabase connection string URI.

For more details on setting up your Supabase database, check out the Supabase
[documentation.](https://supabase.com/docs/guides/database/overview)

## Configure DISCORD BOT

1. [Go to the Discord Developer Portal](https://discordapp.com/developers/applications/).

<details>
<summary>
2. Create a New Application.
</summary>

![Application](https://res.cloudinary.com/dwtba7bmh/image/upload/v1678755937/o1vaqzbm7f6tozark9yo.png 'Application')

</details>

<details>
<summary>
3. Your next step is to go over the menu on the left side of the screen and click “Bot”.
</summary>

![Bot](https://res.cloudinary.com/dwtba7bmh/image/upload/v1678756136/pwgtlao3pd9evqedtnxm.png 'Bot')

</details>

<details>
<summary>
4. Now you want to click the blue “Add Bot” button.
</summary>

![Add Bot](https://res.cloudinary.com/dwtba7bmh/image/upload/v1678756280/wcr0nny5wdcd8fovf768.png 'AddBot')

</details>

5. Click the “Yes, do it!” button…

<details>
<summary>
6. You’ll also see a “Token” and a blue link you can click called “Copy”.
</summary>

![Token](https://res.cloudinary.com/dwtba7bmh/image/upload/v1678756280/x3f9nk65tq5szib6jb22.png 'Token')

</details>

`DISCORD_BOT_TOKEN="YOUR_TOKEN"`

7. Add Your Bot to a Discord Server

<details>
<summary>
8. In order to add your bot to your Discord Server, you’ll need to navigate back to the “OAuth2” "URL GENERATOR" tab.
</summary>

![Token](https://res.cloudinary.com/dwtba7bmh/image/upload/v1678759651/pw1svnypnnbvbt0ceczt.png 'Token')

</details>

<details>
<summary>
9. In the “Scopes” section, you’ll want to select the “bot” checkbox.
</summary>

![Token](https://res.cloudinary.com/dwtba7bmh/image/upload/v1678759632/ntra1xoyhye5r3tixy9c.png 'Token')

</details>

10. “Bot Permissions” section. This is where you choose what permissions to give your bot, and what it can and can’t do.

11. After you’ve selected your permissions, scroll up a little bit and look at the URL that was generated.

12. Click the blue “Copy” button on the right side. This is the URL you’ll navigate to in order to add your bot to a server.

### Configure DISCORD KEYS

To configure your Discord keys and enable your application to access the Discord API, follow the steps below:

<details>
<summary>
1. Navigate to the "OAuth2" section in the  Discord Developer Portal and select your bot name.
</summary>

![firefox_mppRClcVUZ](https://user-images.githubusercontent.com/14036522/229315332-f0cf0cc2-a714-4964-b18e-20d3afd7a968.png)

</details>

```
Client ID: DISCORD_CLIENT_ID="your_client_id_here"
```

<details>
<summary>
2. Under the "CLIENT ID" section, copy the client ID.
</summary>

![firefox_LveLM7Di8L](https://user-images.githubusercontent.com/14036522/229315577-e2dca258-0f5a-4405-b7d2-fbc92481bf64.png)

</details>

```
Client Secret: DISCORD_CLIENT_SECRET="your_client_secret_here"
```

<details>
<summary>
3. Click the blue “Reset Secret” button.
</summary>

![firefox_BgpIxRB20C](https://user-images.githubusercontent.com/14036522/229315614-2881ce5c-3dc6-4681-8fb3-d59e164bef7e.png)

</details>

4. Click “YES” button.

5. You’ll also see a “Token” and a blue link you can click called “Copy”.

If you need additional help, consult the [Discord Developer Documentation](https://discord.com/developers/docs/intro).

## Configure Discord WEBHOOKS

1. Go to your Discord server where you want to add the webhook.

<details>
<summary>
2. Click on the channel where you want to send the webhook messages.
</summary>

![channel-webhook](https://user-images.githubusercontent.com/14036522/229307261-8dee4db1-37b1-49ce-a450-645e1bd25a6f.gif)

</details>

<details>
<summary>
3. Click on the settings icon and select "Integrations".
</summary>

![Discord_MkqQdiBzb7](https://user-images.githubusercontent.com/14036522/229307265-81d6071c-9bb1-4d15-a3d4-b048ed5ecf2d.gif)

</details>

<details>
<summary>
4. Click the "Create Webhook" button and enter the webhook name and select the channel you want to send messages to.
</summary>

![webook](https://user-images.githubusercontent.com/14036522/229307263-3347e9f8-9ec6-4e7d-9d90-1b271cdc0341.gif)

</details>

5. Copy the webhook URL and set it as an environment variable in your project:

6. DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/your_webhook_id/your_webhook_token"

7. Save the changes and restart your server to make the changes take effect.

<div align="right">

[ [ ↑ to top ↑ ] ](#reward-system)

</div>

# How can I contribute?

We welcome contributions from anyone who would like to help improve our project. Whether you're an experienced developer or just starting out, there are plenty of ways to get involved.

## Support

If you need help using our project, please visit our [SUPPORT.md](./docs/SUPPORT.md) file. This document provides information on how to get help from the community, how to report issues, and where to find additional resources.

## Join Our Community

Join our [Discord](https://.discord.gg/77guznJ8mZ) community to connect with other contributors and get help from the maintainers. This is a great place to ask questions, get feedback on your ideas, and collaborate with others on the project.

## Read the Contribution Guidelines

Before you start contributing, please read our [CONTRIBUTING.md](./docs/CONTRIBUTING.md) file. This outlines the contribution guidelines and provides instructions for setting up your development environment, submitting pull requests, and more.

We appreciate all contributions, big and small. Thank you for helping to make our project better!

## Security

We take the security of our project seriously. If you discover a security vulnerability, please let us know right away. We will investigate all legitimate reports and do our best to quickly address any issues.

To learn more about our security practices, please read our [SECURITY.md](./docs/SECURITY.md) file.

## License

[MIT License](./LICENSE)

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).

A [blog post](https://jumr.dev/blog/t3-turbo) where I wrote how to migrate a T3 app into this

Test the Github GraphQL schema [**here**](https://studio.apollographql.com/public/github/explorer?variant=current)

---

## Contributors

<a href="https://github.com/serudda/reward-system/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=serudda/reward-system" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

<div align="right">

[ [ ↑ to top ↑ ] ](#reward-system)

</div>

---

**Folow us at**

<a href="https://github.com/Indie-Creator-Community">
<img src="https://img.shields.io/badge/IndieCreatorsHQ-FAFF00?style=for-the-badge&logo=github&logoColor=black">
</a>
<a href="https://.discord.gg/77guznJ8mZ">
<img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
</a>
<a href="https://twitter.com/IndieCreatorsHQ">
<img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white">
</a>

---
