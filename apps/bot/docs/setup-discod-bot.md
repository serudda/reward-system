# Setup Discord Bot

## Create Bot and Invite it to your Server

### Step 1: Create an Application on the Discord Developer Portal

1. Go to the Discord Developer Portal.
2. Log in to your Discord account.
3. Click the "New Application" button on the top-right corner of the page.
4. Enter a name for your application and click "Create."

### Step 2: Create a Bot

1. On the left sidebar, click on "Bot."
2. Click the "Add Bot" button on the right side of the page.
3. Confirm by clicking "Yes, do it!" in the pop-up window.
4. Your bot is now created.
5. Give bot the "Privileged Gateway Intents"
![image](https://user-images.githubusercontent.com/10075532/227964903-9d34e2f5-942c-47fa-8ac7-bddcd42d8522.png)
6. Assign a redirect URL.
![Screenshot 2023-03-27 at 9 11 53 AM](https://user-images.githubusercontent.com/10075532/227965674-684e000a-8748-464f-9bcf-d90a75b9a985.png)



### Step 3: Invite the Bot to Your Server

1. On the left sidebar, click on "OAuth2."
2. Scroll down to the "URL Generator" section and check the "bot" box.
3. Scroll down to the "Bot Permissions" section and select the permissions you want to grant your bot.
4. Scroll down and copy the generated link in the "Generated URL" field.
5. In the new browser window or tab, go to the url.
6. Select a server from the dropdown menu and click "Continue".
7. Confirm bot permissions and click "Authorize".
8. Complete the hCAPTCHA verification if prompted.

## Obtain all necessary variables

### "DISCORD_CLIENT_ID"

1. Go to the Discord Developer Portal.
2. Log in to your Discord account.
3. Click on previously created application.
4. On the left sidebar, click on "OAuth2."
5. On "Client Information" section, find the "CLIENT ID" field.
6. Copy the CLIENT ID.

### "DISCORD_CLIENT_SECRET"

1. Go to the Discord Developer Portal.
2. Log in to your Discord account.
3. Click on previously created application.
4. On the left sidebar, click on "OAuth2."
5. On "Client Information" section, click on "Reset Secret"
6. Confirm by clicking "Yes, do it!" in the pop-up window.
7. On the "Client Information" section, find the "CLIENT SECRET" field.
8. Copy the CLIENT SECRET.

### "DISCORD_BOT_TOKEN"

1. Go to the Discord Developer Portal.
2. Log in to your Discord account.
3. Click on previously created application.
4. On the left sidebar, click on "Bot."
5. On "Built-A-Bot" section, find the "Token" field.
6. Copy the TOKEN.
