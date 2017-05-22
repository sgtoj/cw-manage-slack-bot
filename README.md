# Simple ConnectWise Manage Slack Bot

Slack bot that parse sent messages for embedded ConnectWise ticket numbers and post a
message of said ticket number. ConnectWise ticket numbers must begin with a `#` symbol.

![](./resources/example.png)

## Setup Instructions

### Slack

- Create a new [Slack App](https://api.slack.com/apps)
  - Give it a name and assign it desired team.
- Turn on Event Subscription
  - Can *not* assign **Request URL** yet.
- Subscribe to Team Events:
  - `message.channels`
  - `message.groups`
- Add Permissions:
  - `chat:write:bot`
- Install App
- Complete the **Application** Instructions
- Add **Request URL** for Event Subscriptions
  - This only has to be done once.

### Application

- Open Terminal or Command Prompt
- Clone Repository
  - `git clone https://github.com/sgtoj/cw-manage-slack-bot.git`
- Change Directory to Project's Root Directory
  - `cd ./cw-manage-slack-bot/`
- Install NPM Packages
  - `npm install`
- Run Compile
  - `npm run compile`
- Config Settings via Config File or Environment Variables
  - See the respective section below.
- Start App
  - `npm start`

#### Config File

The config file is one way to configure the application.

- Copy `appconfig.template.json` to `appconfig.json`
  - `cp ./appconfig.template.json ./appconfig.json`
  - Git will ignore the `appconfig.json` file.
- Fill in the blank values in the `appconfig.json` file.

#### Environment Variabels

These enviroment variables can be used to override any settings that is
defined by default or defined the in the `appconfig.json` (explained above).

- `APP_PORT`: Server port listening for incoming Slack webhook events.
  - Default: 80
- `SLACK_TOKEN`: Slack OAuth Access Token for the app.
  - Example: `xoxp-xxx-xxx-xxx-xxx`
- `CWMANAGE_COMPANYID`: ConnectWise company name.
  - Example: `abctech`
- `CWMANAGE_COMPANYURL`: Authorized Slack token for the server.
  - Default: `api-na.myconnectwise.net`
- `CWMANAGE_PUBLICKEY`: Authorized Slack token for the server.
  - Example: `a1B2c3`
- `CWMANAGE_PRIVATEKEY`: Authorized Slack token for the server.
  - Example: `a1B2c3`