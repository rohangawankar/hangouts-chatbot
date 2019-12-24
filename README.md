# AutoBot

AutoBot is a basic google hangouts chat bot template, which can be modified as per  one's needs.

The current project is developed under the concept of 'Gamification' for taking inputs from the users and saving them in 'Google Sheets'.

Gamification, to simply put, is implementing game principles in non-gaming environment to motivate participation, engagement, and loyalty. Please notice that the bot is not a Machine Learning bot. It is a simple bot mainly used for taking inputs and sending push notifications to the people who added the bot.

# Google Apps Script

The project is written in GAS/JavaScript, can be found in Code.gs. There is a json mannifest file, appsscript.json, associated with Code.js. 

# Google Sheets API for the Apps Script project
You'll need to enable the Sheets API on the Apps Script project from the Google API Console:

In the Script Editor's menu, select Resources > Advanced Google services. If the appsscript.json file was updated correctly as mentioned in this project, you should only see the Google Sheets API switched on in the list.

On the bottom of the Advanced Google Services pop-up, click the blue link to go to the Google API Console for this project. This should take you to the API Dashboard for this Apps Script project.

At the top of the Dashboard, click the blue link to Enable APIs and Services

Search for Sheets and click the Google Sheets API to open it.

Click the blue Enable button to enable the Sheets API for your Apps Script project. You should be taken back to the API Dashboard once enabled.

You can close this tab and ignore the "you may need credentials" warning on top of the page as they are not needed for this project.

# Hangouts Chat API
1) Open the Developer's Console.
2) Select the blue link to Enable APIs and Services.
3) Search for Hangouts Chat API, then click the Hangouts Chat API from the search results to open.
4) Click the blue Enable button to enable the API for your project.

You should now be taken to the dashboard with the Hangouts Chat API focused.

# Deploy from manifest
1) Open the Code.gs file.
2) Select Publish > Deploy from manifest... from the Script Editor menu.
3) Click the red Create button.
. Enter a useful name in the Deployment name field. If you'd like to enter a description for the deployment version, you can do so but it is not necessary.
4) Click the blue Save button to deploy your project. You will be returned to the Deployments list.
5) Next to your new deployment, click the Get ID link.
6) Copy the full Deployment ID shown to your clipboard and switch back to the Hangouts Chat API configuration page in the Developer's Console.
7) Finalize Hangouts Chat configuration

# Configuring Hangouts Chat API
1) Open the API Dashboard for your project and click on Hangouts Chat API from the list.
2) Enter a name for your bot in the Bot name field.
3) Enter a URL for your bot's avatar.
4) Enter a description for your bot.
5) Check the boxes under Functionality where you want your bot to be available:
 i) Bot works in rooms
 ii) Bot works in direct messages
6) Select "Apps Script Project" from Connection Settings
7) Paste your Deployment ID in the field below the selection.
. Choose Who can install according to your preferences. This will determine who can add the bot to Spaces within Google Chat or send it Direct Messages. You can limit it to yourself for testing.
8) Click the blue Save changes button.
9) You will then be able to choose your bot status from the following options: * LIVE - available to all users (recommended/default) * DISABLED

# Wroking of bot
1) Open hangouts and search for AutoBot
2) Add bot to your hangouts
3) Start texting
